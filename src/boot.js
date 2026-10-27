// ===== boot =====
// Layout metrics, pointer input, the render loop, and startup.
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOutBack = (x) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
const fontStr = (px, w = 700) => `${w} ${px}px Fredoka, "Noto Sans KR", "Noto Sans JP", Nunito, sans-serif`;
const bodyFont = (px, w = 800) => `${w} ${px}px Nunito, "Noto Sans KR", "Noto Sans JP", sans-serif`;

const Metrics = {
  W: 0, H: 0, dpr: 1,
  boardX: 0, boardY: 0, B: 0, P: 0, cs: 0,
  subH: 0, bandH: 0, swapRect: [0, 0, 0, 0], holdRect: [0, 0, 0, 0], skipRect: [0, 0, 0, 0],
  trayTop: 0, trayH: 0, slotW: 0, trayScale: 0.5,
  cellCenter(gx, gy) { return [this.boardX + this.P + (gx + 0.5) * this.cs, this.boardY + this.P + (gy + 0.5) * this.cs]; },
  cellXY(gx, gy) { return [this.boardX + this.P + gx * this.cs, this.boardY + this.P + gy * this.cs]; },
  slotCenter(i) { return [this.boardX + this.slotW * (i + 0.5), this.trayTop + this.trayH * 0.52]; },
};

const stage = document.getElementById('stage');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function layout() {
  const M = Metrics;
  M.W = stage.clientWidth; M.H = stage.clientHeight;
  M.dpr = Math.min(2.5, window.devicePixelRatio || 1);
  canvas.width = Math.round(M.W * M.dpr);
  canvas.height = Math.round(M.H * M.dpr);

  const sr = stage.getBoundingClientRect();
  let hudBottom = 100;
  for (const sel of ['.topbar', '.tb-center']) {
    const el = document.querySelector(sel);
    if (el) { const r = el.getBoundingClientRect(); if (r.height > 10) hudBottom = Math.max(hudBottom, r.bottom - sr.top + 10); }
  }
  hudBottom = clamp(hudBottom, 92, 170);

  const bm = 14;
  M.bandH = G.tut ? clamp(M.W * 0.125, 40, 56) : 0;          // tutorial message band reserved above the board
  const availH = M.H - hudBottom - bm - M.bandH;
  M.B = Math.min(M.W - 22, availH / 1.52);
  M.P = M.B * 0.028;
  M.cs = (M.B - 2 * M.P) / 8;
  M.boardX = (M.W - M.B) / 2;
  M.boardY = hudBottom + M.bandH + Math.max(0, (availH - M.B * 1.52) * 0.3);
  M.subH = M.B * 0.165;

  const swW = M.cs * 2.0, swH = M.cs * 1.02;
  const subMid = M.boardY + M.B + M.subH * 0.55;
  M.swapRect = [M.boardX + M.P, subMid - swH / 2, swW, swH];
  const hs = M.cs * 1.28;
  M.holdRect = [M.boardX + M.B - M.P - hs, subMid - hs / 2, hs, hs];

  M.trayTop = M.boardY + M.B + M.subH;
  M.trayH = Math.min(M.B * 0.345, M.H - M.trayTop - bm);
  M.slotW = M.B / 3;
  M.trayScale = 0.5;
  M.skipRect = [M.boardX + M.P, M.trayTop + M.trayH * 0.72, M.cs * 2.6, M.cs * 0.8];

  Sprites.build(M.cs, M.dpr);
  layoutTray();
}

function pieceHome(p) {
  const M = Metrics;
  if (p === G.hold) {
    const [hx, hy, hw, hh] = M.holdRect;
    const s = Math.min(hw / (p.w * M.cs), hh / (p.h * M.cs)) * 0.74;
    return [hx + hw / 2, hy + hh / 2, s];
  }
  const [cx, cy] = M.slotCenter(p.slot);
  const maxW = M.slotW * 0.88, maxH = M.trayH * 0.86;
  let s = M.trayScale;
  s = Math.min(s, maxW / (p.w * M.cs), maxH / (p.h * M.cs));
  return [cx, cy, s];
}
function layoutTray() {
  for (let i = 0; i < 3; i++) { const p = G.tray[i]; if (p) { p.slot = i; if (!Drag.p || Drag.p !== p) snapHome(p); } }
  if (G.hold && Drag.p !== G.hold) snapHome(G.hold);
}
function snapHome(p) { const [x, y, s] = pieceHome(p); p.dx = x; p.dy = y; p.scale = s; }

// ---------------- input ----------------
const Drag = { p: null, from: null, px: 0, py: 0, lift: 0, gx: -1, gy: -1, valid: false, rows: [], cols: [], touch: false };

function pieceAtPoint(px, py) {
  const M = Metrics;
  const [hx, hy, hw, hh] = M.holdRect;
  if (G.hold && px >= hx - 8 && px <= hx + hw + 8 && py >= hy - 8 && py <= hy + hh + 8) return { p: G.hold, from: 'hold' };
  if (py >= M.trayTop - M.cs * 0.4 && py <= M.trayTop + M.trayH + 10) {
    const i = Math.floor((px - M.boardX) / M.slotW);
    if (i >= 0 && i < 3 && G.tray[i]) return { p: G.tray[i], from: i };
  }
  return null;
}
function inRect(px, py, r) { return px >= r[0] && px <= r[0] + r[2] && py >= r[1] && py <= r[1] + r[3]; }

function updateSnap() {
  const M = Metrics, p = Drag.p;
  if (!p) return;
  const tlx = Drag.tx - (p.w * M.cs) / 2, tly = Drag.ty - (p.h * M.cs) / 2;
  const gx = Math.round((tlx - M.boardX - M.P) / M.cs);
  const gy = Math.round((tly - M.boardY - M.P) / M.cs);
  Drag.gx = gx; Drag.gy = gy;
  Drag.valid = gx >= 0 && gy >= 0 && gx + p.w <= 8 && gy + p.h <= 8 && canPlaceAt(p.cells, gx, gy);
  const st = tutStep();
  if (st && Drag.valid && !(gx === st.gx && gy === st.gy)) Drag.valid = false;
  Drag.rows.length = 0; Drag.cols.length = 0;
  if (Drag.valid) {
    const ghost = new Set(p.cells.map(([cx, cy]) => idx(gx + cx, gy + cy)));
    for (let y = 0; y < 8; y++) { let full = true; for (let x = 0; x < 8; x++) { const i = idx(x, y); if (!G.grid[i] && !ghost.has(i)) { full = false; break; } } if (full) Drag.rows.push(y); }
    for (let x = 0; x < 8; x++) { let full = true; for (let y = 0; y < 8; y++) { const i = idx(x, y); if (!G.grid[i] && !ghost.has(i)) { full = false; break; } } if (full) Drag.cols.push(x); }
  }
}

function onDown(e) {
  if (G.mode === 'title' || G.over || Ui.els.popups.childElementCount) return;
  const r = canvas.getBoundingClientRect();
  const px = e.clientX - r.left, py = e.clientY - r.top;
  Sfx.ensure();

  if (G.tut) {
    if (inRect(px, py, [Metrics.skipRect[0] - 10, Metrics.skipRect[1] - 10, Metrics.skipRect[2] + 20, Metrics.skipRect[3] + 20])) { skipTutorial(); return; }
  } else if (inRect(px, py, Metrics.swapRect)) { swapSet(); return; }

  const hit = pieceAtPoint(px, py);
  if (!hit) return;
  if (G.tut) { const cur = tutPiece(); if (!cur || hit.p !== cur) { if (cur) Sfx.play('back'); return; } }   // only the guided piece moves
  canvas.setPointerCapture(e.pointerId);
  Drag.p = hit.p; Drag.from = hit.from;
  Drag.touch = e.pointerType !== 'mouse';
  Drag.lift = Drag.touch ? Metrics.cs * 1.35 + (hit.p.h * Metrics.cs) / 2 : Metrics.cs * 0.35;
  Drag.px = px; Drag.py = py;
  Drag.tx = px; Drag.ty = py - Drag.lift;
  updateSnap();
  Sfx.play('pick');
}
function onMove(e) {
  if (!Drag.p) return;
  const r = canvas.getBoundingClientRect();
  Drag.px = e.clientX - r.left; Drag.py = e.clientY - r.top;
  Drag.tx = Drag.px; Drag.ty = Drag.py - Drag.lift;
  updateSnap();
}
function onUp() {
  const p = Drag.p;
  if (!p) return;
  const M = Metrics;
  const overHold = !G.tut && inRect(Drag.px, Drag.py, [M.holdRect[0] - 10, M.holdRect[1] - 10, M.holdRect[2] + 20, M.holdRect[3] + 20]);

  if (overHold && Drag.from !== 'hold') {
    const piece = p; endDrag();
    if (!G.hold) stashPiece(piece); else swapWithHold(piece);
    layoutTray();
    return;
  }
  if (Drag.valid) {
    const gx = Drag.gx, gy = Drag.gy;
    const [cx0, cy0] = M.cellXY(gx, gy);
    p.dx = cx0 + (p.w * M.cs) / 2; p.dy = cy0 + (p.h * M.cs) / 2; // land exactly
    const fromHold = Drag.from === 'hold';
    endDrag();
    placeDraggedPiece(p, gx, gy, fromHold);
    return;
  }
  Sfx.play('back');
  endDrag();
  layoutTray();
}
function endDrag() { Drag.p = null; Drag.rows.length = 0; Drag.cols.length = 0; Drag.valid = false; }

canvas.addEventListener('pointerdown', onDown);
canvas.addEventListener('pointermove', onMove);
canvas.addEventListener('pointerup', onUp);
canvas.addEventListener('pointercancel', () => { if (Drag.p) { endDrag(); layoutTray(); } });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

// ---------------- rendering helpers ----------------
function drawSwapIcon(x, cx, cy, s, color) {
  // two opposing arrows (⇄), drawn so it looks identical on every platform
  x.save(); x.translate(cx, cy);
  x.strokeStyle = color; x.fillStyle = color; x.lineWidth = Math.max(2, s * 0.17); x.lineCap = 'round'; x.lineJoin = 'round';
  const arrow = (y, dir) => {
    x.beginPath(); x.moveTo(-s * 0.9, y); x.lineTo(s * 0.9, y); x.stroke();
    x.beginPath();
    x.moveTo(dir * s * 0.95, y); x.lineTo(dir * s * 0.45, y - s * 0.42); x.lineTo(dir * s * 0.45, y + s * 0.42); x.closePath(); x.fill();
  };
  arrow(-s * 0.46, 1); arrow(s * 0.46, -1);
  x.restore();
}
function drawHand(x, px, py, s, pressed) {
  // stylised pointer hand (index finger up, curled fist, thumb) — white with a dark outline.
  // Outline trick: draw the union path with a thick dark stroke, then fill white on top.
  x.save(); x.translate(px, py); x.scale(pressed ? 0.9 : 1, pressed ? 0.9 : 1);
  const p = new Path2D();
  const rr = (rx, ry, w, h, r) => p.addPath(roundRectPath(rx, ry, w, h, r));
  rr(-s * 0.13, -s * 0.9, s * 0.27, s * 0.95, s * 0.135);                 // index finger
  rr(-s * 0.13, -s * 0.1, s * 0.8, s * 0.74, s * 0.22);                   // fist
  [[0.3, -0.07], [0.49, -0.02], [0.66, 0.06]].forEach(([kx, ky]) => { const c = new Path2D(); c.arc(s * kx, s * ky, s * 0.125, 0, Math.PI * 2); p.addPath(c); }); // knuckles
  const th = new Path2D(); th.ellipse(-s * 0.2, s * 0.3, s * 0.14, s * 0.24, 0.35, 0, Math.PI * 2); p.addPath(th); // thumb
  x.shadowColor = 'rgba(0,0,0,0.35)'; x.shadowBlur = s * 0.3; x.shadowOffsetY = s * 0.12;
  x.fillStyle = '#3b3f75'; x.fill(p);
  x.shadowBlur = 0; x.shadowOffsetY = 0;
  x.strokeStyle = '#3b3f75'; x.lineWidth = Math.max(2, s * 0.11); x.lineJoin = 'round'; x.stroke(p);
  x.fillStyle = '#ffffff'; x.fill(p);
  // finger crease hints
  x.strokeStyle = 'rgba(59,63,117,0.3)'; x.lineWidth = Math.max(1, s * 0.035); x.lineCap = 'round';
  [[0.3, 0.1], [0.49, 0.14], [0.66, 0.2]].forEach(([kx, ky]) => { x.beginPath(); x.moveTo(s * kx, s * ky); x.lineTo(s * kx, s * (ky + 0.26)); x.stroke(); });
  x.restore();
}

// ---------------- rendering ----------------
const Deco = [];
for (let i = 0; i < 14; i++) Deco.push({ x: Math.random(), y: Math.random(), r: 0.02 + Math.random() * 0.06, s: 0.2 + Math.random() * 0.8, a: 0.03 + Math.random() * 0.05 });

function drawBackground() {
  const M = Metrics, T = Theme.cur;
  const g = ctx.createLinearGradient(0, 0, 0, M.H);
  g.addColorStop(0, T.bg[0]); g.addColorStop(0.45, T.bg[1]); g.addColorStop(1, T.bg[2]);
  ctx.fillStyle = g; ctx.fillRect(0, 0, M.W, M.H);
  for (const d of Deco) {
    const y = (d.y + G.time * 0.008 * d.s) % 1.1;
    ctx.fillStyle = T.deco + (T.light ? d.a * 1.6 : d.a) + ')';
    ctx.beginPath(); ctx.arc(d.x * M.W, y * M.H, d.r * M.W, 0, Math.PI * 2); ctx.fill();
  }
  const vg = ctx.createRadialGradient(M.W / 2, M.H * 0.42, M.W * 0.3, M.W / 2, M.H * 0.5, M.W * 0.95);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, T.light ? 'rgba(40,60,120,0.12)' : 'rgba(0,0,10,0.35)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, M.W, M.H);
}

function drawBoardPanel() {
  const M = Metrics, T = Theme.cur, r = M.B * 0.05;
  ctx.save();
  ctx.shadowColor = T.light ? 'rgba(30,50,110,0.25)' : 'rgba(0,0,10,0.5)'; ctx.shadowBlur = 26; ctx.shadowOffsetY = 12;
  const p = roundRectPath(M.boardX, M.boardY, M.B, M.B, r);
  const g = ctx.createLinearGradient(0, M.boardY, 0, M.boardY + M.B);
  g.addColorStop(0, T.board[0]); g.addColorStop(1, T.board[1]);
  ctx.fillStyle = g; ctx.fill(p);
  ctx.restore();
  if (T.glow) { ctx.save(); ctx.shadowColor = 'rgba(140,90,255,0.8)'; ctx.shadowBlur = 18; ctx.strokeStyle = 'rgba(170,120,255,0.55)'; ctx.lineWidth = 2; ctx.stroke(roundRectPath(M.boardX + 1, M.boardY + 1, M.B - 2, M.B - 2, r)); ctx.restore(); }
  else { ctx.strokeStyle = T.light ? 'rgba(40,60,120,0.12)' : 'rgba(255,255,255,0.09)'; ctx.lineWidth = 1.5; ctx.stroke(roundRectPath(M.boardX + 1, M.boardY + 1, M.B - 2, M.B - 2, r)); }
}

function drawCells(dt) {
  const M = Metrics;
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const [px, py] = M.cellXY(x, y);
    ctx.drawImage(Sprites.cache.empty, px, py, M.cs, M.cs);
  }
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const cell = G.grid[idx(x, y)];
    if (!cell) continue;
    const [px, py] = M.cellXY(x, y);
    let s = 1;
    if (cell.b > 0) {
      cell.b += dt;
      const tt = clamp(cell.b / 0.22, 0, 1);
      s = 0.6 + 0.4 * easeOutBack(tt);
      if (tt >= 1) cell.b = -1;
    }
    const d = M.cs * s, o = (M.cs - d) / 2;
    Sprites.tile(ctx, cell.c, px + o, py + o, d);
    if (cell.gem) {
      const pulse = 1 + Math.sin(G.time * 4 + x + y) * 0.05;
      const gs = M.cs * pulse, go = (M.cs - gs) / 2;
      Sprites.gem(ctx, cell.gem, px + go, py + go, gs);
    }
  }
}

function drawGhostAndHighlights() {
  const M = Metrics, p = Drag.p, T = Theme.cur;
  if (!p || !Drag.valid) return;
  const hl = T.light ? '60,90,200' : '255,255,255';
  for (const y of Drag.rows) {
    const [px, py] = M.cellXY(0, y);
    const rp = roundRectPath(px - 2, py - 2, M.cs * 8 + 4, M.cs + 4, M.cs * 0.22);
    ctx.fillStyle = `rgba(${hl},0.22)`; ctx.fill(rp);
    ctx.strokeStyle = `rgba(${hl},${0.5 + Math.sin(G.time * 9) * 0.25})`; ctx.lineWidth = 2.5; ctx.stroke(rp);
  }
  for (const x of Drag.cols) {
    const [px, py] = M.cellXY(x, 0);
    const rp = roundRectPath(px - 2, py - 2, M.cs + 4, M.cs * 8 + 4, M.cs * 0.22);
    ctx.fillStyle = `rgba(${hl},0.22)`; ctx.fill(rp);
    ctx.strokeStyle = `rgba(${hl},${0.5 + Math.sin(G.time * 9) * 0.25})`; ctx.lineWidth = 2.5; ctx.stroke(rp);
  }
  for (const [cx, cy] of p.cells) {
    const [px, py] = M.cellXY(Drag.gx + cx, Drag.gy + cy);
    ctx.drawImage(Sprites.cache.ghost, px, py, M.cs, M.cs);
  }
}

function drawSweepsAndPops() {
  const M = Metrics;
  for (const s of Fx.sweeps) {
    const k = s.t / s.life, a = (1 - k);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = a * 0.9;
    const grow = 1 + easeOutCubic(k) * 0.7;
    if (s.isRow) {
      const [px, py] = M.cellXY(0, s.index);
      const h = M.cs * grow, yC = py + M.cs / 2;
      ctx.fillStyle = '#ffffff';
      ctx.fill(roundRectPath(px - 3, yC - h / 2, M.cs * 8 + 6, h, h * 0.3));
    } else {
      const [px] = M.cellXY(s.index, 0);
      const [, py0] = M.cellXY(0, 0);
      const w = M.cs * grow, xC = px + M.cs / 2;
      ctx.fillStyle = '#ffffff';
      ctx.fill(roundRectPath(xC - w / 2, py0 - 3, w, M.cs * 8 + 6, w * 0.3));
    }
    ctx.restore();
  }
  for (const p of Fx.pops) {
    if (p.t < 0) { // still waiting: draw the block holding in place
      const [px, py] = M.cellXY(p.gx, p.gy);
      Sprites.tile(ctx, p.c, px, py, M.cs);
      continue;
    }
    const k = p.t / p.life;
    const s = 1 + k * 0.5, a = 1 - k;
    const d = M.cs * s, [px, py] = M.cellXY(p.gx, p.gy);
    ctx.save(); ctx.globalAlpha = a;
    Sprites.tile(ctx, p.c, px + (M.cs - d) / 2, py + (M.cs - d) / 2, d);
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a * 0.6;
    ctx.fillStyle = '#ffffff';
    ctx.fill(roundRectPath(px + (M.cs - d) / 2, py + (M.cs - d) / 2, d, d, d * 0.2));
    ctx.restore();
  }
}

function drawParticles() {
  for (const p of Fx.parts) {
    const k = p.t / p.life;
    ctx.save();
    ctx.globalAlpha = 1 - k;
    ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.col;
    ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.72);
    ctx.restore();
  }
}

function drawSwapAndHold() {
  if (G.tut) return;
  const M = Metrics, T = Theme.cur;
  const pulse = G.hintSwap ? 1 + Math.sin(G.time * 7) * 0.05 : 1;

  // swap button
  const [sx, sy, sw, sh] = M.swapRect;
  ctx.save();
  ctx.translate(sx + sw / 2, sy + sh / 2); ctx.scale(pulse, pulse);
  const bp = roundRectPath(-sw / 2, -sh / 2, sw, sh, sh * 0.34);
  ctx.shadowColor = T.light ? 'rgba(30,50,110,0.3)' : 'rgba(0,0,10,0.4)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4;
  const bg = ctx.createLinearGradient(0, -sh / 2, 0, sh / 2);
  if (T.light) { bg.addColorStop(0, '#6f8fe6'); bg.addColorStop(1, '#4a6ad0'); } else { bg.addColorStop(0, '#707aae'); bg.addColorStop(1, '#4b5488'); }
  ctx.fillStyle = bg; ctx.fill(bp);
  ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5; ctx.stroke(bp);
  // top sheen
  ctx.save(); ctx.clip(bp); ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.fillRect(-sw / 2, -sh / 2, sw, sh * 0.45); ctx.restore();
  drawSwapIcon(ctx, -sw * 0.14, 0, sh * 0.26, '#ffffff');
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = bodyFont(sh * 0.4, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('∞', sw * 0.28, 1);
  ctx.restore();

  // hold box
  const [hx, hy, hw, hh] = M.holdRect;
  ctx.save();
  const hp = roundRectPath(hx, hy, hw, hh, hw * 0.24);
  ctx.fillStyle = T.light ? 'rgba(40,60,120,0.08)' : 'rgba(8,10,30,0.4)'; ctx.fill(hp);
  const hpulse = (G.hintSwap && !G.hold) ? 0.45 + Math.sin(G.time * 7) * 0.25 : 0.2;
  ctx.strokeStyle = T.light ? `rgba(40,60,120,${hpulse + 0.1})` : `rgba(255,255,255,${hpulse})`; ctx.lineWidth = 2;
  ctx.setLineDash([hw * 0.14, hw * 0.1]);
  ctx.stroke(roundRectPath(hx + 3, hy + 3, hw - 6, hh - 6, hw * 0.2));
  ctx.setLineDash([]);
  ctx.restore();
  ctx.fillStyle = T.dim;
  ctx.font = bodyFont(Math.max(9, hh * 0.17), 800);
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.fillText(t('tip_hold'), hx + hw / 2, hy + hh + 4);
}

function drawPiece(p, alphaShadow) {
  const M = Metrics;
  const cs = M.cs * p.scale;
  const ox = p.dx - (p.w * cs) / 2, oy = p.dy - (p.h * cs) / 2;
  if (alphaShadow) {
    ctx.save(); ctx.globalAlpha = 0.28; ctx.fillStyle = '#000';
    for (const [cx, cy] of p.cells) ctx.fill(roundRectPath(ox + cx * cs + cs * 0.06, oy + cy * cs + cs * 0.2, cs * 0.9, cs * 0.9, cs * 0.2));
    ctx.restore();
  }
  for (const [cx, cy] of p.cells) Sprites.tile(ctx, p.color, ox + cx * cs, oy + cy * cs, cs);
}

function drawTray(dt) {
  for (let i = 0; i < 3; i++) {
    const p = G.tray[i];
    if (!p || p === Drag.p) continue;
    stepPieceAnim(p, dt);
    drawPiece(p, false);
  }
  if (G.hold && G.hold !== Drag.p) { stepPieceAnim(G.hold, dt); drawPiece(G.hold, false); }
}
function stepPieceAnim(p, dt) {
  if (p.appearT > 0) {
    p.appearT += dt;
    const d = clamp((p.appearT - 0.07) / 0.26, 0, 1);
    const [hx, hy, hs] = pieceHome(p);
    p.dx = hx; p.dy = hy;
    p.scale = hs * easeOutBack(d);
    if (d >= 1) { p.appearT = 0; p.scale = hs; }
    return;
  }
  const [hx, hy, hs] = pieceHome(p);
  const k = 1 - Math.pow(0.0001, dt);
  p.dx += (hx - p.dx) * k; p.dy += (hy - p.dy) * k; p.scale += (hs - p.scale) * k;
}

function drawDragPiece(dt) {
  const p = Drag.p;
  if (!p) return;
  const k = 1 - Math.pow(0.000001, dt);
  p.dx += (Drag.tx - p.dx) * k; p.dy += (Drag.ty - p.dy) * k;
  p.scale += (1 - p.scale) * k;
  drawPiece(p, true);
}

function drawComboChip() {
  if (G.combo < 2 || G.mode === 'title' || G.tut) return;
  const M = Metrics;
  const txt = '🔥 ' + t('combo') + ' x' + G.combo;
  ctx.font = fontStr(15, 700);
  const w = ctx.measureText(txt).width + 30;
  const x = M.boardX + M.B / 2, y = M.boardY - 13;
  ctx.save();
  const p = roundRectPath(x - w / 2, y - 12, w, 24, 12);
  ctx.fillStyle = 'rgba(16,18,46,0.8)'; ctx.fill(p);
  ctx.strokeStyle = 'rgba(255,170,80,0.7)'; ctx.lineWidth = 1.5; ctx.stroke(p);
  const g = ctx.createLinearGradient(0, y - 9, 0, y + 9);
  g.addColorStop(0, '#ffe9a8'); g.addColorStop(1, '#ff9f47');
  ctx.fillStyle = g; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(txt, x, y + 1);
  ctx.restore();
}

// "Destroyed blocks" progress pill (like the original) — appears briefly after a clear.
function drawDestroyedBar() {
  if (G.barT <= 0 || G.tut) return;
  const M = Metrics;
  const a = clamp(Math.min(G.barT / 0.3, (2.2 - G.barT) / 0.25), 0, 1);
  const p = achProgress('blocks');
  const w = M.B * 0.78, h = M.cs * 0.62;
  const x = M.boardX + M.B / 2, y = M.boardY + M.P + h * 0.75;
  ctx.save(); ctx.globalAlpha = a;
  const pill = roundRectPath(x - w / 2, y - h / 2, w, h, h / 2);
  ctx.fillStyle = 'rgba(10,12,34,0.82)'; ctx.fill(pill);
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1.5; ctx.stroke(pill);
  const label = t('destroyed') + ':';
  ctx.font = bodyFont(h * 0.42, 900); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff';
  const lw = Math.min(ctx.measureText(label).width, w * 0.58);
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h, w * 0.6, h * 2); ctx.clip(); ctx.fillText(label, x - w / 2 + h * 0.5, y + 1); ctx.restore();
  const bx = x - w / 2 + h * 0.5 + lw + h * 0.35, bw = x + w / 2 - h * 0.45 - bx, bh = h * 0.36;
  ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.fill(roundRectPath(bx, y - bh / 2, bw, bh, bh / 2));
  const frac = clamp(p.v / p.next, 0, 1);
  const g = ctx.createLinearGradient(bx, 0, bx + bw, 0); g.addColorStop(0, '#ffd24a'); g.addColorStop(1, '#ff8a3c');
  ctx.fillStyle = g; ctx.fill(roundRectPath(bx, y - bh / 2, Math.max(bh, bw * frac), bh, bh / 2));
  ctx.restore();
}

function drawTutorial(dt) {
  const tu = G.tut; if (!tu) return;
  const M = Metrics, T = Theme.cur;
  tu.t += dt;
  // banner band above the board: message + "board n of 3" dots
  const bh = (M.bandH || M.cs * 1.12) - 6, by = M.boardY - bh - 5;
  ctx.save();
  ctx.fillStyle = T.light ? 'rgba(40,60,140,0.85)' : 'rgba(12,14,40,0.72)';
  ctx.fillRect(0, by, M.W, bh);
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const msg = t(tu.msg); let fs = bh * 0.42; ctx.font = fontStr(fs, 700);
  while (fs > bh * 0.26 && ctx.measureText(msg).width > M.W - 32) { fs -= 1; ctx.font = fontStr(fs, 700); }   // long translations shrink to fit
  ctx.fillText(msg, M.W / 2, by + bh * 0.4 + 1);
  const nB = TUT_BOARDS.length, dr = bh * 0.07, gap = dr * 5;
  for (let i = 0; i < nB; i++) {
    const cx = M.W / 2 + (i - (nB - 1) / 2) * gap, cy = by + bh * 0.8;
    const on = i < tu.board || (i === tu.board && tu.done), cur = i === tu.board && !tu.done;
    ctx.beginPath(); ctx.arc(cx, cy, cur ? dr * 1.25 : dr, 0, Math.PI * 2);
    ctx.fillStyle = on ? '#ffd24a' : cur ? '#ffffff' : 'rgba(255,255,255,0.3)'; ctx.fill();
  }
  ctx.restore();
  if (tu.done) return;
  const st = tu.steps[tu.step];
  // target ghost pulse
  const piece = G.tray[st.slot];
  if (piece && !Drag.p) {
    ctx.save(); ctx.globalAlpha = 0.5 + Math.sin(tu.t * 5) * 0.25;
    for (const [cx, cy] of piece.cells) { const [px, py] = M.cellXY(st.gx + cx, st.gy + cy); ctx.drawImage(Sprites.cache.ghost, px, py, M.cs, M.cs); }
    ctx.restore();
    // guiding hand loop
    const L = 2.1, k = (tu.t % L) / L;
    const [sx, sy] = M.slotCenter(st.slot);
    const [tx0, ty0] = M.cellXY(st.gx, st.gy);
    const tx = tx0 + (piece.w * M.cs) / 2, ty = ty0 + (piece.h * M.cs) / 2;
    let hx = sx, hy = sy, alpha = 1, pressed = false;
    if (k < 0.15) { alpha = k / 0.15; }
    else if (k < 0.65) { const q = easeInOut((k - 0.15) / 0.5); hx = sx + (tx - sx) * q; hy = sy + (ty - sy) * q; pressed = true;
      ctx.save(); ctx.globalAlpha = 0.75; const cs = M.cs * 0.9; const ox = hx - (piece.w * cs) / 2, oy = hy - (piece.h * cs) / 2;
      for (const [cx, cy] of piece.cells) Sprites.tile(ctx, piece.color, ox + cx * cs, oy + cy * cs, cs); ctx.restore(); }
    else if (k < 0.8) { hx = tx; hy = ty; }
    else { hx = tx; hy = ty; alpha = 1 - (k - 0.8) / 0.2; }
    ctx.save(); ctx.globalAlpha = alpha; drawHand(ctx, hx + M.cs * 0.1, hy + M.cs * 0.15, M.cs * 0.9, pressed); ctx.restore();
  }
  // skip link
  const [kx, ky, kw, kh] = M.skipRect;
  ctx.save();
  ctx.fillStyle = T.light ? 'rgba(29,37,80,0.75)' : 'rgba(255,255,255,0.8)';
  ctx.font = bodyFont(kh * 0.62, 900); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText(t('skip'), kx, ky + kh / 2);
  ctx.restore();
}

function drawFloatsAndBanners() {
  const M = Metrics;
  for (const f of Fx.floats) {
    const k = f.t / f.life;
    ctx.save();
    ctx.globalAlpha = k < 0.75 ? 1 : 1 - (k - 0.75) / 0.25;
    const y = f.y - easeOutCubic(k) * M.cs * 1.5;
    const sc = k < 0.18 ? easeOutBack(k / 0.18) : 1;
    ctx.translate(f.x, y); ctx.scale(sc, sc);
    ctx.font = fontStr(f.size, 700);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = f.size * 0.16; ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(20,20,60,0.85)'; ctx.strokeText(f.txt, 0, 0);
    const g = ctx.createLinearGradient(0, -f.size / 2, 0, f.size / 2);
    g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#bcd0ff');
    ctx.fillStyle = g; ctx.fillText(f.txt, 0, 0);
    ctx.restore();
  }
  for (const b of Fx.banners) {
    const k = b.t / b.life;
    const size = b.kind === 'combo' ? M.B * 0.14 : b.kind === 'allclear' ? M.B * 0.125 : M.B * 0.12;
    const x = M.boardX + M.B / 2;
    const y = M.boardY + M.B * (b.kind === 'combo' ? 0.3 : 0.44) - easeOutCubic(k) * M.B * 0.09;
    const sc = k < 0.2 ? easeOutBack(k / 0.2) : 1;
    ctx.save();
    ctx.globalAlpha = k < 0.7 ? 1 : 1 - (k - 0.7) / 0.3;
    ctx.translate(x, y); ctx.scale(sc, sc); ctx.rotate(-0.04);
    ctx.font = fontStr(size, 700);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.shadowColor = b.kind === 'big' ? 'rgba(255,150,40,0.9)' : b.kind === 'allclear' ? 'rgba(120,255,170,0.9)' : 'rgba(170,140,255,0.95)';
    ctx.shadowBlur = size * 0.5;
    ctx.lineWidth = size * 0.17;
    ctx.strokeStyle = 'rgba(25,20,70,0.9)';
    ctx.strokeText(b.txt, 0, 0);
    ctx.shadowBlur = 0;
    const g = ctx.createLinearGradient(0, -size * 0.55, 0, size * 0.55);
    if (b.kind === 'big') { g.addColorStop(0, '#fff6d8'); g.addColorStop(0.5, '#ffd24a'); g.addColorStop(1, '#ff7a3c'); }
    else if (b.kind === 'allclear') { g.addColorStop(0, '#eafff2'); g.addColorStop(0.5, '#7dffb0'); g.addColorStop(1, '#2ec8ff'); }
    else { g.addColorStop(0, '#ffffff'); g.addColorStop(0.55, '#d9c6ff'); g.addColorStop(1, '#b06cff'); }
    ctx.fillStyle = g;
    ctx.fillText(b.txt, 0, 0);
    ctx.restore();
  }
}

function drawFlights() {
  const M = Metrics;
  for (const f of Fx.flights) {
    if (f.t < 0) {
      Sprites.gem(ctx, f.kind, f.x0 - M.cs / 2, f.y0 - M.cs / 2, M.cs);
      continue;
    }
    const k = easeOutCubic(clamp(f.t / f.life, 0, 1));
    const mx = (f.x0 + f.x1) / 2, my = Math.min(f.y0, f.y1) - M.cs * 2.2;
    const x = (1 - k) * (1 - k) * f.x0 + 2 * (1 - k) * k * mx + k * k * f.x1;
    const y = (1 - k) * (1 - k) * f.y0 + 2 * (1 - k) * k * my + k * k * f.y1;
    const s = M.cs * (1.1 - k * 0.55);
    Sprites.gem(ctx, f.kind, x - s / 2, y - s / 2, s);
  }
}

// ---------------- loop ----------------
let lastT = 0;
function frame(ts) {
  requestAnimationFrame(frame);
  if (G.adPause) { lastT = ts; return; }                  // an ad is on screen: freeze everything underneath
  const dt = clamp((ts - lastT) / 1000, 0, 0.05);
  lastT = ts;
  G.time += dt;
  if (G.barT > 0) G.barT -= dt;
  Fx.update(dt);

  const M = Metrics;
  ctx.setTransform(M.dpr, 0, 0, M.dpr, 0, 0);
  drawBackground();
  if (G.mode === 'title') { drawParticles(); return; }

  const [ox, oy] = Fx.shakeOffset();
  ctx.translate(ox, oy);
  drawBoardPanel();
  drawCells(dt);
  drawGhostAndHighlights();
  drawSweepsAndPops();
  drawSwapAndHold();
  drawTray(dt);
  drawComboChip();
  drawDestroyedBar();
  drawFlights();
  drawParticles();
  drawTutorial(dt);
  drawFloatsAndBanners();
  drawDragPiece(dt);
}

// ---------------- startup ----------------
function boot() {
  Save.load();
  initLang(Save.d.lang);
  Theme.apply(Save.d.theme);
  Sfx.setOn(Save.d.sound !== false);
  Ui.bind();
  Ui.applyTexts();
  layout();
  const logo = document.getElementById('logo');
  drawLogo(logo);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => drawLogo(logo));

  let rT = 0;
  window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(layout, 120); });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(layout, 120); });

  requestAnimationFrame((ts) => { lastT = ts; requestAnimationFrame(frame); });

  // Ads (H5 Games Ads). Test ads everywhere except the live site, or with ?adtest=1 on the live site.
  Ads.onPause = () => { G.adPause = true; Sfx.setOn(false); if (Drag.p) { endDrag(); layoutTray(); } };
  Ads.onResume = () => { G.adPause = false; Sfx.setOn(Save.d.sound !== false); };
  Ads.init(ADS.client, { sound: Save.d.sound !== false, test: location.hostname !== 'kogames.dev' || /[?&]adtest=1/.test(location.search) });

  if (location.hash === '#about' || location.hash === '#howto') setTimeout(() => Ui.showHowTo(), 300);
  else if (location.hash === '#ranking') setTimeout(() => Ui.showRanking(), 300);

  // tiny debug/testing handle (also used to render store assets from the real renderer)
  window.__bp = { G, Save, Ui, Fx, Sprites, Theme, THEMES, THEME_IDS, PALETTE, Levels, Metrics, Drag, drawLogo, startClassic, startAdventure, startTutorial, skipTutorial, skipLevel, revive, finishRun, Ads, ADS, TUT_BOARDS, tutStep, layout, setLang, t, idx, ACH, achProgress };
}
boot();
