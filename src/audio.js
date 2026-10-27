// ===== audio =====
// All SFX are synthesized with WebAudio — no audio files, instant load.
const Sfx = {
  ctx: null, master: null, on: true,

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.55;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return true;
  },
  setOn(v) { this.on = !!v; },
  now() { return this.ctx.currentTime; },

  env(gainNode, t0, a, peak, d) {
    const g = gainNode.gain;
    g.setValueAtTime(0.0001, t0);
    g.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t0 + a);
    g.exponentialRampToValueAtTime(0.0001, t0 + a + d);
  },
  tone(type, f0, f1, t0, a, peak, d, bend = 'exp') {
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t0);
    if (f1 && f1 !== f0) {
      if (bend === 'exp') o.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t0 + a + d);
      else o.frequency.linearRampToValueAtTime(f1, t0 + a + d);
    }
    this.env(g, t0, a, peak, d);
    o.connect(g); g.connect(this.master);
    o.start(t0); o.stop(t0 + a + d + 0.05);
  },
  noise(t0, a, peak, d, hp = 0, lp = 0) {
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * (a + d + 0.05)));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    let node = src;
    if (hp) { const f = this.ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp; node.connect(f); node = f; }
    if (lp) { const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lp; node.connect(f); node = f; }
    const g = this.ctx.createGain(); this.env(g, t0, a, peak, d);
    node.connect(g); g.connect(this.master);
    src.start(t0); src.stop(t0 + a + d + 0.05);
  },

  play(name, opt = {}) {
    if (!this.on) return;
    if (!this.ensure()) return;
    const n = this.now() + 0.005;
    switch (name) {
      case 'click':
        this.tone('triangle', 620, 740, n, 0.004, 0.22, 0.05); break;
      case 'pick':
        this.tone('sine', 330, 520, n, 0.006, 0.22, 0.08);
        this.noise(n, 0.004, 0.06, 0.03, 2500, 0); break;
      case 'back':
        this.tone('sine', 520, 330, n, 0.006, 0.18, 0.09); break;
      case 'place':
        this.tone('sine', 190, 120, n, 0.004, 0.42, 0.09);
        this.noise(n, 0.004, 0.14, 0.05, 900, 5200); break;
      case 'bad':
        this.tone('square', 160, 120, n, 0.006, 0.12, 0.09); break;
      case 'clear': {
        const c = Math.min(opt.combo || 1, 10), lines = Math.min(opt.lines || 1, 4);
        const base = 420 * Math.pow(1.09, c - 1);
        // bright pop sweep
        this.tone('sine', base, base * 2.2, n, 0.008, 0.5, 0.16);
        this.tone('triangle', base * 1.5, base * 3.1, n + 0.015, 0.008, 0.3, 0.17);
        this.noise(n, 0.005, 0.26, 0.1, 1800, 0);
        // sparkle arp
        for (let i = 0; i < 2 + lines; i++) {
          this.tone('sine', base * (2 + i * 0.5), base * (2.4 + i * 0.5), n + 0.05 + i * 0.045, 0.006, 0.14, 0.09);
        }
        if (lines >= 2) { // deep boom underneath
          this.tone('sine', 120, 55, n, 0.01, 0.55, 0.28);
          this.noise(n, 0.01, 0.2, 0.22, 0, 420);
        }
        break;
      }
      case 'allclear': {
        const t = n;
        [523, 659, 784, 1047].forEach((f, i) => this.tone('triangle', f, f, t + i * 0.07, 0.01, 0.3, 0.3));
        this.tone('sine', 110, 55, t, 0.01, 0.5, 0.4);
        break;
      }
      case 'gem':
        this.tone('sine', 1180, 1760, n, 0.005, 0.3, 0.2);
        this.tone('sine', 1760, 2350, n + 0.06, 0.005, 0.2, 0.18); break;
      case 'swap':
        this.noise(n, 0.01, 0.2, 0.12, 700, 4000);
        this.tone('sine', 300, 600, n, 0.01, 0.16, 0.12); break;
      case 'hold':
        this.tone('triangle', 480, 390, n, 0.005, 0.22, 0.07); break;
      case 'over': {
        [392, 330, 262, 196].forEach((f, i) => this.tone('triangle', f, f * 0.97, n + i * 0.13, 0.01, 0.26, 0.16));
        break;
      }
      case 'win': {
        [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone('triangle', f, f, n + i * 0.085, 0.008, 0.3, 0.26));
        this.noise(n + 0.1, 0.01, 0.1, 0.3, 4000, 0);
        break;
      }
      case 'revive':
        this.tone('sine', 220, 880, n, 0.02, 0.3, 0.35); break;
    }
  },
};
