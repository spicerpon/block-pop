// ===== shapes =====
// Piece catalogue. Each: cells [[x,y]...], weights [early, late] — "late" kicks in
// as the score grows (bigger pieces, like the original's dynamic difficulty).
const SHAPES = (() => {
  const S = [];
  const add = (cells, wEarly, wLate) => S.push({ cells, w0: wEarly, w1: wLate });
  const rots = (cells) => { // all 4 rotations, deduped, normalized
    const seen = new Set(); const out = [];
    let c = cells;
    for (let r = 0; r < 4; r++) {
      const minX = Math.min(...c.map(p => p[0])), minY = Math.min(...c.map(p => p[1]));
      const n = c.map(p => [p[0] - minX, p[1] - minY]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
      const key = n.map(p => p.join(',')).join(';');
      if (!seen.has(key)) { seen.add(key); out.push(n); }
      c = c.map(p => [-p[1], p[0]]);
    }
    return out;
  };
  const addR = (cells, wEarly, wLate) => { const rr = rots(cells); for (const r of rr) add(r, wEarly / rr.length, wLate / rr.length); };

  add([[0, 0]], 7, 3);                                                   // 1x1
  addR([[0, 0], [1, 0]], 10, 5);                                         // 1x2
  addR([[0, 0], [1, 0], [2, 0]], 11, 7);                                 // 1x3
  addR([[0, 0], [1, 0], [2, 0], [3, 0]], 8, 9);                          // 1x4
  addR([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], 3, 7);                  // 1x5
  add([[0, 0], [1, 0], [0, 1], [1, 1]], 10, 9);                          // 2x2
  add([[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]], 2, 6); // 3x3
  addR([[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], 5, 8);          // 2x3
  addR([[0, 0], [1, 0], [0, 1]], 9, 6);                                  // small corner (3)
  addR([[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]], 3, 7);                  // big corner (5, 3x3)
  addR([[0, 0], [0, 1], [0, 2], [1, 2]], 6, 7);                          // L tetromino
  addR([[1, 0], [1, 1], [1, 2], [0, 2]], 6, 7);                          // J tetromino
  addR([[1, 0], [2, 0], [0, 1], [1, 1]], 4, 6);                          // S
  addR([[0, 0], [1, 0], [1, 1], [2, 1]], 4, 6);                          // Z
  addR([[0, 0], [1, 0], [2, 0], [1, 1]], 5, 7);                          // T
  return S;
})();

function shapeW(sh) { return 1 + Math.max(...sh.cells.map(p => p[0])); }
function shapeH(sh) { return 1 + Math.max(...sh.cells.map(p => p[1])); }

// Weighted pick; t in [0,1] morphs early→late weights.
function pickShape(rng, t) {
  let total = 0;
  for (const s of SHAPES) total += s.w0 + (s.w1 - s.w0) * t;
  let r = rng() * total;
  for (const s of SHAPES) { r -= s.w0 + (s.w1 - s.w0) * t; if (r <= 0) return s; }
  return SHAPES[0];
}
