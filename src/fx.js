// ===== fx =====
// Particles, floating texts, banners, line sweeps, screen shake, gem flights.
const Fx = {
  parts: [], floats: [], banners: [], sweeps: [], pops: [], flights: [],
  shakeT: 0, shakeAmp: 0,

  clear() { this.parts.length = this.floats.length = this.banners.length = this.sweeps.length = this.pops.length = this.flights.length = 0; this.shakeT = 0; },

  shake(amp) { this.shakeAmp = Math.max(this.shakeAmp, amp); this.shakeT = 0.42; },
  shakeOffset() {
    if (this.shakeT <= 0) return [0, 0];
    const k = this.shakeT / 0.42, a = this.shakeAmp * k * k;
    return [(Math.random() * 2 - 1) * a, (Math.random() * 2 - 1) * a];
  },

  burst(px, py, colorIdx, n, spd) {
    const base = PALETTE[colorIdx] ? PALETTE[colorIdx].base : '#ffffff';
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = spd * (0.4 + Math.random() * 0.9);
      this.parts.push({
        x: px, y: py, vx: Math.cos(a) * v, vy: Math.sin(a) * v - spd * 0.45,
        s: 3 + Math.random() * 6, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 12,
        col: Math.random() < 0.22 ? '#ffffff' : shade(base, Math.random() * 0.4 - 0.1),
        t: 0, life: 0.55 + Math.random() * 0.4,
      });
    }
  },
  confetti(W, H) {
    for (let i = 0; i < 90; i++) {
      const ci = 1 + Math.floor(Math.random() * NCOLORS);
      this.parts.push({
        x: Math.random() * W, y: -20 - Math.random() * H * 0.35,
        vx: (Math.random() - 0.5) * 60, vy: 120 + Math.random() * 180,
        s: 5 + Math.random() * 6, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 9,
        col: PALETTE[ci].base, t: 0, life: 2.2 + Math.random() * 1.2, drift: true,
      });
    }
  },

  float(px, py, txt, size, col) {
    this.floats.push({ x: px, y: py, txt, size, col: col || '#ffffff', t: 0, life: 0.95 });
  },
  banner(txt, kind) { // kind: 'combo' | 'big' | 'allclear'
    this.banners.push({ txt, kind, t: 0, life: kind === 'combo' ? 1.0 : 1.25 });
  },
  sweep(isRow, index) { this.sweeps.push({ isRow, index, t: 0, life: 0.42 }); },
  pop(gx, gy, px, py, colorIdx, delay) { this.pops.push({ gx, gy, px, py, c: colorIdx, t: -delay, life: 0.3, fired: false }); },
  fly(x0, y0, x1, y1, kind, delay, done) {
    this.flights.push({ x0, y0, x1, y1, kind, t: -delay, life: 0.55, done });
  },

  update(dt) {
    if (this.shakeT > 0) this.shakeT -= dt;
    const live = (a) => { for (let i = a.length - 1; i >= 0; i--) { a[i].t += dt; if (a[i].t >= a[i].life) a.splice(i, 1); } };
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i]; p.t += dt;
      if (p.t >= p.life) { this.parts.splice(i, 1); continue; }
      p.vy += (p.drift ? 260 : 920) * dt;
      if (p.drift) p.vx += Math.sin((p.t * 5) + p.rot) * 30 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
    }
    live(this.floats); live(this.banners); live(this.sweeps);
    for (let i = this.pops.length - 1; i >= 0; i--) {
      const p = this.pops[i]; p.t += dt;
      if (!p.fired && p.t >= 0) { p.fired = true; this.burst(p.px, p.py, p.c, 8, 230); }
      if (p.t >= p.life) this.pops.splice(i, 1);
    }
    for (let i = this.flights.length - 1; i >= 0; i--) {
      const f = this.flights[i]; f.t += dt;
      if (f.t >= f.life) { if (f.done) f.done(); this.flights.splice(i, 1); }
    }
  },
};
