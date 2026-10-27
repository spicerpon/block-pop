// ===== levels =====
// 60 Adventure levels, generated deterministically (same for every player).
// A level = 8x8 preset of colored blocks, some of them trapping a red or blue gem.
// Goal: collect every gem by clearing the line that holds its block.
const Levels = {
  COUNT: 60,

  rng(seed) { // mulberry32
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },

  // Returns { cells: [{x,y,gem:0|1|2}], red, blue, swaps }
  get(n) {
    const r = this.rng(0xB10C + n * 1013);
    const d = (n - 1) / (this.COUNT - 1);                 // 0..1 difficulty
    const g = new Array(64).fill(0);                      // 0 empty, 1 block
    const idx = (x, y) => y * 8 + x;
    const put = (x, y) => { if (x >= 0 && x < 8 && y >= 0 && y < 8) g[idx(x, y)] = 1; };
    const type = (n - 1) % 8;

    switch (type) {
      case 0: { // scattered floor
        const rows = 2 + Math.floor(d * 3);
        for (let y = 8 - rows; y < 8; y++) for (let x = 0; x < 8; x++) if (r() < 0.55 + d * 0.2) put(x, y);
        break;
      }
      case 1: { // pillars
        const k = 3 + Math.floor(d * 2);
        const cols = []; while (cols.length < k) { const c = Math.floor(r() * 8); if (!cols.includes(c)) cols.push(c); }
        for (const c of cols) { const h = 3 + Math.floor(r() * (2 + d * 3)); for (let y = 8 - h; y < 8; y++) put(c, y); }
        break;
      }
      case 2: { // side walls + floor
        const h = 4 + Math.floor(d * 3);
        for (let y = 8 - h; y < 8; y++) { put(0, y); put(1, y); put(6, y); put(7, y); }
        for (let x = 2; x < 6; x++) if (r() < 0.4 + d * 0.3) put(x, 7);
        break;
      }
      case 3: { // checker belt
        const rows = 3 + Math.floor(d * 2);
        for (let y = 8 - rows; y < 8; y++) for (let x = 0; x < 8; x++) if ((x + y) % 2 === 0 || r() < d * 0.35) put(x, y);
        break;
      }
      case 4: { // staircase
        for (let x = 0; x < 8; x++) { const h = 1 + Math.floor((x / 7) * (3 + d * 4)); for (let y = 8 - h; y < 8; y++) put(x, y); }
        if (r() < 0.5) { for (let y = 0; y < 8; y++) for (let x = 0; x < 4; x++) { const v = g[idx(x, y)]; g[idx(x, y)] = g[idx(7 - x, y)]; g[idx(7 - x, y)] = v; } }
        break;
      }
      case 5: { // two towers
        const w = 2 + (d > 0.5 ? 1 : 0);
        const h = 4 + Math.floor(d * 3);
        for (let y = 8 - h; y < 8; y++) { for (let x = 1; x < 1 + w; x++) put(x, y); for (let x = 7 - w; x < 7; x++) put(x, y); }
        for (let x = 0; x < 8; x++) if (r() < 0.5) put(x, 7);
        break;
      }
      case 6: { // diamond block in the middle
        const cx = 3.5, cy = 4.5, rad = 2 + d * 1.6;
        for (let y = 1; y < 8; y++) for (let x = 0; x < 8; x++) if (Math.abs(x - cx) + Math.abs(y - cy) <= rad) put(x, y);
        break;
      }
      default: { // dense scatter
        const dens = 0.3 + d * 0.22;
        for (let y = 3; y < 8; y++) for (let x = 0; x < 8; x++) if (r() < dens * (0.5 + (y / 7) * 0.8)) put(x, y);
        break;
      }
    }

    // never start with a full row/column (it would pop by itself)
    for (let y = 0; y < 8; y++) { let c = 0; for (let x = 0; x < 8; x++) c += g[idx(x, y)]; if (c === 8) g[idx(Math.floor(r() * 8), y)] = 0; }
    for (let x = 0; x < 8; x++) { let c = 0; for (let y = 0; y < 8; y++) c += g[idx(x, y)]; if (c === 8) g[idx(x, Math.floor(r() * 8))] = 0; }
    // keep the top two rows breathable
    for (let y = 0; y < 2; y++) for (let x = 0; x < 8; x++) g[idx(x, y)] = 0;

    // choose gem cells among placed blocks (deepest rows first feel best)
    const filled = [];
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if (g[idx(x, y)]) filled.push({ x, y, k: r() });
    filled.sort((a, b) => (b.y - a.y) || (a.k - b.k));   // deterministic: keys drawn before sorting
    const gemsWanted = Math.min(filled.length, 2 + Math.floor(d * 8) + (r() < 0.5 ? 0 : 1));
    const gems = [];
    const step = Math.max(1, Math.floor(filled.length / Math.max(1, gemsWanted)));
    for (let i = 0; i < filled.length && gems.length < gemsWanted; i += step) gems.push(filled[i]);
    let red = 0, blue = 0;
    const cells = filled.map(c => {
      const isGem = gems.includes(c);
      let gem = 0;
      if (isGem) { gem = r() < 0.5 ? 1 : 2; if (gem === 1) red++; else blue++; }
      return { x: c.x, y: c.y, gem };
    });
    // sort by position so the output never depends on sort internals
    cells.sort((a, b) => (a.y - b.y) || (a.x - b.x));
    // guarantee at least one of each when 2+ gems
    if (red === 0 && blue >= 2) { const c = cells.find(c => c.gem === 2); c.gem = 1; red++; blue--; }
    if (blue === 0 && red >= 2) { const c = cells.find(c => c.gem === 1); c.gem = 2; blue++; red--; }

    return { cells, red, blue, swaps: 2 };
  },
};
