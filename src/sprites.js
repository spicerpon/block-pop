// ===== sprites =====
// Every block tile / gem / UI chip is pre-rendered once per size on offscreen
// canvases — crisp at any DPI, zero image downloads. Color themes swap the
// palette and the scene colors; sprites are rebuilt on theme change.

const THEMES = {
  standard: {
    colors: ['#ff5252', '#ff9838', '#ffd233', '#3edc6b', '#35c7f0', '#4d7dff', '#9b5cff', '#ff5fa2'],
    bg: ['#3a4390', '#2b3170', '#1b1f46'], board: ['#272e66', '#1e2452'], cell: 'rgba(8,10,30,0.33)',
    ink: '#ffffff', dim: 'rgba(255,255,255,0.42)', glow: false, light: false, deco: 'rgba(160,180,255,',
  },
  pink: {
    colors: ['#ff4f8b', '#ff7ab3', '#f0439a', '#ff8fc5', '#ff5c9a', '#e8307f', '#ffa3d0', '#ff6aa6'],
    bg: ['#5a2a74', '#3f1d57', '#24112f'], board: ['#3a1f55', '#2a1540'], cell: 'rgba(20,5,30,0.35)',
    ink: '#ffffff', dim: 'rgba(255,220,240,0.45)', glow: false, light: false, deco: 'rgba(255,170,220,',
  },
  lightblue: {
    colors: ['#35c7f0', '#5ad4ff', '#2fb0e8', '#7fe3ff', '#3cc0ff', '#4dd0e1', '#1f9ad8', '#9beeff'],
    bg: ['#2f4fa0', '#213b82', '#14275c'], board: ['#243c80', '#1a2d63'], cell: 'rgba(5,15,45,0.35)',
    ink: '#ffffff', dim: 'rgba(200,230,255,0.45)', glow: false, light: false, deco: 'rgba(150,210,255,',
  },
  pinkblue: {
    colors: ['#ff5fa2', '#4d7dff', '#ff7ab3', '#35c7f0', '#f0439a', '#5a8dff', '#ff9ccf', '#2fb0e8'],
    bg: ['#43337f', '#302463', '#1b1540'], board: ['#2c2460', '#1f1a4a'], cell: 'rgba(10,5,35,0.35)',
    ink: '#ffffff', dim: 'rgba(230,210,255,0.45)', glow: false, light: false, deco: 'rgba(210,170,255,',
  },
  neon: {
    colors: ['#ff2d95', '#00f0ff', '#39ff14', '#ffe600', '#ff6a00', '#b026ff', '#00a3ff', '#ff3131'],
    bg: ['#14102c', '#0b0820', '#04030e'], board: ['#120e30', '#0a0822'], cell: 'rgba(0,0,10,0.5)',
    ink: '#ffffff', dim: 'rgba(200,180,255,0.4)', glow: true, light: false, deco: 'rgba(120,80,255,',
  },
  white: {
    colors: ['#ff5f5f', '#ff9a3c', '#ffcf2e', '#3ccf63', '#22bde0', '#4a86ff', '#9b6bff', '#ff5fa0'],
    bg: ['#f6f8ff', '#e8edfb', '#d9e1f5'], board: ['#ffffff', '#edf1fb'], cell: 'rgba(60,80,140,0.10)',
    ink: '#1d2550', dim: 'rgba(29,37,80,0.45)', glow: false, light: true, deco: 'rgba(120,150,230,',
  },
};
const THEME_IDS = ['standard', 'pink', 'lightblue', 'pinkblue', 'neon', 'white'];

const PALETTE = [null];      // PALETTE[1..8] = { base, name } — filled by Theme.apply
const NCOLORS = 8;

const Theme = {
  id: 'standard', cur: THEMES.standard,
  apply(id) {
    if (!THEMES[id]) id = 'standard';
    this.id = id; this.cur = THEMES[id];
    PALETTE.length = 1;
    for (let i = 0; i < NCOLORS; i++) PALETTE.push({ base: this.cur.colors[i], name: 'c' + (i + 1) });
    document.documentElement.setAttribute('data-theme', id);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', this.cur.bg[1]);
  },
};

function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function shade(hex, amt) { // amt -1..1 (towards black / white)
  const [r, g, b] = hexRgb(hex);
  const f = (v) => { const t = amt < 0 ? 0 : 255, a = Math.abs(amt); return Math.round(v + (t - v) * a); };
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}
function rgba(hex, a) { const [r, g, b] = hexRgb(hex); return `rgba(${r},${g},${b},${a})`; }

function roundRectPath(x, y, w, h, r) {
  const p = new Path2D();
  r = Math.min(r, w / 2, h / 2);
  p.moveTo(x + r, y);
  p.arcTo(x + w, y, x + w, y + h, r);
  p.arcTo(x + w, y + h, x, y + h, r);
  p.arcTo(x, y + h, x, y, r);
  p.arcTo(x, y, x + w, y, r);
  p.closePath();
  return p;
}

const Sprites = {
  dpr: 1, cs: 0, themeId: '', cache: {},

  build(cs, dpr, force) {
    if (!force && cs === this.cs && dpr === this.dpr && this.themeId === Theme.id) return;
    this.cs = cs; this.dpr = dpr; this.themeId = Theme.id; this.cache = {};
    const s = Math.max(8, Math.round(cs * dpr));
    for (let i = 1; i <= NCOLORS; i++) this.cache['t' + i] = this.makeTile(PALETTE[i].base, s, Theme.cur.glow);
    this.cache.empty = this.makeEmpty(s);
    this.cache.gem1 = this.makeGem('#ff7a8f', '#ff2d55', '#9c0a2a', s);
    this.cache.gem2 = this.makeGem('#8fd8ff', '#2f8cff', '#0d3fb8', s);
    this.cache.ghost = this.makeGhost(s);
  },
  rebuild() { this.build(this.cs, this.dpr, true); },

  canvas(s) { const c = document.createElement('canvas'); c.width = s; c.height = s; return c; },

  // Chamfered glossy block — bright flat face, four bevels, soft glass sheen, crisp rim.
  makeTile(base, s, glow) {
    const c = this.canvas(s), x = c.getContext('2d');
    const m = s * (glow ? 0.07 : 0.028);           // seam between cells (bigger when glowing)
    const w = s - m * 2, r = w * 0.13, b = w * 0.2;
    x.translate(m, m);
    const outer = roundRectPath(0, 0, w, w, r);
    if (glow) { x.save(); x.shadowColor = base; x.shadowBlur = s * 0.09; x.fillStyle = base; x.fill(outer); x.restore(); }
    // dark rim
    x.fillStyle = shade(base, -0.55); x.fill(outer);
    x.save(); x.clip(outer);
    // body base
    x.fillStyle = base; x.fillRect(0, 0, w, w);
    // bevels (top / left / right / bottom)
    const bev = (pts, col) => { x.beginPath(); x.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0], pts[i][1]); x.closePath(); x.fillStyle = col; x.fill(); };
    bev([[0, 0], [w, 0], [w - b, b], [b, b]], shade(base, 0.48));
    bev([[0, 0], [b, b], [b, w - b], [0, w]], shade(base, 0.16));
    bev([[w, 0], [w, w], [w - b, w - b], [w - b, b]], shade(base, -0.24));
    bev([[0, w], [w, w], [w - b, w - b], [b, w - b]], shade(base, -0.44));
    // soft gradient over bevels so the top-left corner reads as lit
    const lg = x.createLinearGradient(0, 0, w, w);
    lg.addColorStop(0, 'rgba(255,255,255,0.14)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,0.16)');
    x.fillStyle = lg; x.fillRect(0, 0, w, w);
    // front face
    const fr = r * 0.3;
    const face = roundRectPath(b, b, w - 2 * b, w - 2 * b, fr);
    const fg = x.createLinearGradient(0, b, 0, w - b);
    fg.addColorStop(0, shade(base, 0.26)); fg.addColorStop(0.5, shade(base, 0.04)); fg.addColorStop(1, shade(base, -0.1));
    x.fillStyle = fg; x.fill(face);
    // face top highlight line
    x.save(); x.clip(face);
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(b, b, w - 2 * b, Math.max(1, s * 0.018));
    x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(b, w - b - Math.max(1, s * 0.018), w - 2 * b, Math.max(1, s * 0.018));
    x.restore();
    // glass sheen across the upper half
    const gl = x.createLinearGradient(0, 0, 0, w * 0.55);
    gl.addColorStop(0, 'rgba(255,255,255,0.30)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gl;
    x.beginPath(); x.ellipse(w * 0.5, -w * 0.18, w * 0.68, w * 0.56, 0, 0, Math.PI * 2); x.fill();
    // specular dot on the top-left bevel corner
    x.fillStyle = 'rgba(255,255,255,0.85)';
    x.beginPath(); x.ellipse(w * 0.2, w * 0.14, w * 0.075, w * 0.045, -0.6, 0, Math.PI * 2); x.fill();
    x.restore();
    // crisp outline
    x.strokeStyle = 'rgba(0,0,0,0.3)'; x.lineWidth = Math.max(1, s * 0.012); x.stroke(outer);
    return c;
  },

  makeEmpty(s) {
    const c = this.canvas(s), x = c.getContext('2d');
    const T = Theme.cur;
    const m = s * 0.045, w = s - m * 2, r = w * 0.18;
    const p = roundRectPath(m, m, w, w, r);
    x.fillStyle = T.cell; x.fill(p);
    x.strokeStyle = T.light ? 'rgba(40,60,120,0.10)' : 'rgba(255,255,255,0.05)'; x.lineWidth = Math.max(1, s * 0.015); x.stroke(p);
    x.save(); x.clip(p);
    const g = x.createLinearGradient(0, m, 0, m + w * 0.5);
    g.addColorStop(0, T.light ? 'rgba(40,60,120,0.10)' : 'rgba(0,0,0,0.26)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(m, m, w, w * 0.5);
    x.restore();
    return c;
  },

  makeGhost(s) {
    const c = this.canvas(s), x = c.getContext('2d');
    const T = Theme.cur;
    const m = s * 0.06, w = s - m * 2, r = w * 0.18;
    const p = roundRectPath(m, m, w, w, r);
    x.fillStyle = T.light ? 'rgba(40,70,160,0.22)' : 'rgba(255,255,255,0.22)'; x.fill(p);
    x.strokeStyle = T.light ? 'rgba(40,70,160,0.6)' : 'rgba(255,255,255,0.6)'; x.lineWidth = Math.max(1.5, s * 0.03); x.stroke(p);
    return c;
  },

  // Faceted diamond gem — sits on top of a block.
  makeGem(light, mid, dark, s) {
    const c = this.canvas(s), x = c.getContext('2d');
    const cx = s / 2, cy = s / 2, R = s * 0.34;
    x.translate(cx, cy);
    const dia = (rr) => { const p = new Path2D(); p.moveTo(0, -rr); p.lineTo(rr, 0); p.lineTo(0, rr); p.lineTo(-rr, 0); p.closePath(); return p; };
    // glow
    x.save(); x.shadowColor = mid; x.shadowBlur = s * 0.2; x.fillStyle = mid; x.fill(dia(R)); x.restore();
    // body gradient (lit from top-left)
    const g = x.createLinearGradient(-R, -R, R, R);
    g.addColorStop(0, light); g.addColorStop(0.5, mid); g.addColorStop(1, dark);
    x.fillStyle = g; x.fill(dia(R));
    // four outer facets
    const tri = (a, b, col) => { x.beginPath(); x.moveTo(0, 0); x.lineTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.closePath(); x.fillStyle = col; x.fill(); };
    tri([0, -R], [R, 0], 'rgba(255,255,255,0.22)');
    tri([-R, 0], [0, -R], 'rgba(255,255,255,0.42)');
    tri([R, 0], [0, R], 'rgba(0,0,0,0.22)');
    tri([0, R], [-R, 0], 'rgba(0,0,0,0.08)');
    // table (inner flat facet)
    const R2 = R * 0.52;
    const g2 = x.createLinearGradient(-R2, -R2, R2, R2);
    g2.addColorStop(0, 'rgba(255,255,255,0.9)'); g2.addColorStop(0.5, 'rgba(255,255,255,0.35)'); g2.addColorStop(1, 'rgba(255,255,255,0.08)');
    x.fillStyle = g2; x.fill(dia(R2));
    // edges
    x.strokeStyle = 'rgba(255,255,255,0.75)'; x.lineWidth = Math.max(1, s * 0.022); x.stroke(dia(R));
    x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = Math.max(1, s * 0.012); x.stroke(dia(R2));
    // sparkle (4-point star)
    const star = (px, py, r) => { x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.28 : r; x.lineTo(px + Math.cos(a) * rr, py + Math.sin(a) * rr); } x.closePath(); x.fillStyle = 'rgba(255,255,255,0.95)'; x.fill(); };
    star(-R * 0.42, -R * 0.42, s * 0.085);
    star(R * 0.3, R * 0.22, s * 0.045);
    return c;
  },

  tile(x2, colorIdx, px, py, size) {
    const img = this.cache['t' + colorIdx]; if (!img) return;
    x2.drawImage(img, px, py, size, size);
  },
  gem(x2, kind, px, py, size) {
    const img = this.cache['gem' + kind]; if (!img) return;
    x2.drawImage(img, px, py, size, size);
  },
};

// ---- Title logo: "BLOCK" + "POP!" built from glossy letter tiles ----
function drawLogo(cv) {
  const dpr = Math.min(3, window.devicePixelRatio || 1);
  const W = 680, H = 400;
  cv.width = W * dpr; cv.height = H * dpr;
  const x = cv.getContext('2d'); x.scale(dpr, dpr);
  x.clearRect(0, 0, W, H);

  const letterTile = (size, colorIdx, ch) => {
    const s = Math.round(size * dpr);
    const t = document.createElement('canvas'); t.width = s; t.height = s;
    const tx = t.getContext('2d');
    tx.drawImage(Sprites.makeTile(PALETTE[colorIdx].base, s, false), 0, 0);
    tx.font = `700 ${s * 0.6}px Fredoka, Nunito, sans-serif`;
    tx.textAlign = 'center'; tx.textBaseline = 'middle';
    tx.lineJoin = 'round';
    tx.save(); tx.translate(s / 2, s * 0.54);
    tx.fillStyle = 'rgba(0,0,0,0.35)'; tx.fillText(ch, 0, s * 0.05);
    tx.fillStyle = '#fff'; tx.fillText(ch, 0, 0);
    tx.restore();
    return t;
  };

  const row = (word, colors, size, y, jitter) => {
    const gap = size * 0.06;
    const total = word.length * size + (word.length - 1) * gap;
    let px = (W - total) / 2;
    for (let i = 0; i < word.length; i++) {
      const rot = jitter ? (i % 2 === 0 ? -1 : 1) * (0.045 + i * 0.012) : ((i % 2) * 2 - 1) * 0.02;
      const tl = letterTile(size, colors[i % colors.length], word[i]);
      x.save();
      x.translate(px + size / 2, y + size / 2);
      x.rotate(rot);
      x.shadowColor = 'rgba(0,0,0,0.4)'; x.shadowBlur = 14; x.shadowOffsetY = 8;
      x.drawImage(tl, -size / 2, -size / 2, size, size);
      x.restore();
      px += size + gap;
    }
  };

  // burst behind POP
  x.save(); x.translate(W / 2, 262);
  const rg = x.createRadialGradient(0, 0, 10, 0, 0, 190);
  rg.addColorStop(0, 'rgba(255,220,120,0.5)'); rg.addColorStop(1, 'rgba(255,220,120,0)');
  x.fillStyle = rg;
  x.beginPath();
  const spikes = 12;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 190 : 108, a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    x[i ? 'lineTo' : 'moveTo'](Math.cos(a) * r, Math.sin(a) * r);
  }
  x.closePath(); x.fill(); x.restore();

  row('BLOCK', [6, 2, 4, 8, 7], 102, 28, false);
  row('POP!', [1, 3, 5, 2], 136, 190, true);
}
