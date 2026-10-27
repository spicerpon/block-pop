// ===== core =====
// Game state + rules. Rendering/layout live in boot.js, DOM in ui.js.
const G = {
  mode: 'title',            // 'title' | 'classic' | 'adv'
  grid: new Array(64).fill(null),
  tray: [null, null, null],
  hold: null,
  score: 0, combo: 0, movesNoClear: 0, maxCombo: 0,
  linesRun: 0, placedRun: 0, poppedRun: 0,
  revived: false, over: false,
  revives: 0,               // revives used this run (rewarded ad; free when ads are unavailable)
  runStart: 0,              // performance.now() at run start → interstitials only after real play time
  adPause: false,           // an ad is on screen → freeze the loop + mute
  advFails: {},             // session: level → failed attempts (unlocks "watch ad · skip level")
  adv: null,                // { n, red, blue, pending }
  tut: null,                // { board, step, steps, msg, done, t } first-run tutorial
  barT: 0,                  // "destroyed blocks" progress bar visibility timer
  setCount: 0,
  hintSwap: false,
  time: 0,
};
const idx = (x, y) => y * 8 + x;

// Achievement tiers (bronze / silver / gold), matching the original's two tracks.
const ACH = { score: [1000, 5000, 20000], blocks: [500, 2500, 10000] };

function cellFree(x, y) { return x >= 0 && x < 8 && y >= 0 && y < 8 && !G.grid[idx(x, y)]; }
function canPlaceAt(cells, gx, gy) {
  for (const [cx, cy] of cells) if (!cellFree(gx + cx, gy + cy)) return false;
  return true;
}
function anyFitPiece(p) {
  if (!p) return false;
  for (let y = 0; y <= 8 - p.h; y++) for (let x = 0; x <= 8 - p.w; x++) if (canPlaceAt(p.cells, x, y)) return true;
  return false;
}
function anyFitTray() { return G.tray.some(p => p && anyFitPiece(p)); }
function boardCount() { let n = 0; for (let i = 0; i < 64; i++) if (G.grid[i]) n++; return n; }
function totalDestroyed() { return (Save.d.totDestroyed | 0) + (G.committed ? 0 : G.poppedRun); }

// ---- pieces ----
function makePiece(sh, color) {
  return { cells: sh.cells, color, w: shapeW(sh), h: shapeH(sh), dx: 0, dy: 0, scale: 1, appearT: 0 };
}
function genPiece(mercy) {
  const t = G.mode === 'adv' ? 0.45 : Math.min(1, G.score / 3500);
  let sh = pickShape(Math.random, t);
  if (mercy) for (let i = 0; i < 12 && !anyFitPiece({ cells: sh.cells, w: shapeW(sh), h: shapeH(sh) }); i++) sh = pickShape(Math.random, t);
  return makePiece(sh, 1 + Math.floor(Math.random() * NCOLORS));
}
function newSet() {
  G.setCount++;
  G.tray[0] = genPiece(true);
  G.tray[1] = genPiece(false);
  G.tray[2] = genPiece(false);
  for (let i = 0; i < 3; i++) G.tray[i].appearT = 0.001 + i * 0.07;
  layoutTray();
}
// Skip: unlimited, swaps the whole set; the price is your combo.
function swapSet() {
  if (G.over || G.tut) return;
  for (let i = 0; i < 3; i++) if (G.tray[i]) { G.tray[i] = genPiece(i === 0); G.tray[i].appearT = 0.001 + i * 0.06; }
  if (!G.tray[0] && !G.tray[1] && !G.tray[2]) newSet();
  G.combo = 0; G.movesNoClear = 0;
  layoutTray();
  Sfx.play('swap');
  checkEnd();
}

// ---- board flow ----
function resetRun() {
  G.grid.fill(null);
  G.tray = [null, null, null]; G.hold = null;
  G.score = 0; G.combo = 0; G.movesNoClear = 0; G.maxCombo = 0;
  G.linesRun = 0; G.placedRun = 0; G.poppedRun = 0;
  G.revived = false; G.over = false; G.setCount = 0; G.tut = null; G.barT = 0; G.hintSwap = false; G.committed = false;
  G.revives = 0; G.runStart = performance.now();
  Fx.clear();
}
function playedSeconds() { return (performance.now() - G.runStart) / 1000; }
// Interstitial before a result card — only after real play time, and Google throttles the frequency itself.
function adBreakThen(name, next) {
  if (playedSeconds() < ADS.MIN_PLAY || !Ads.available()) { next(); return; }
  Ads.interstitial(name).then(next, next);
}
function maxRevives() { return Ads.available() ? ADS.MAX_REVIVES : 1; }
function startClassic() {
  if (!Save.d.tutDone) { startTutorial(); return; }
  resetRun();
  G.mode = 'classic'; G.adv = null;
  newSet();
  Ui.enterGame();
}
function startAdventure(n) {
  resetRun();
  G.mode = 'adv';
  const L = Levels.get(n);
  G.adv = { n, red: L.red, blue: L.blue, pending: 0 };
  for (const c of L.cells) {
    G.grid[idx(c.x, c.y)] = { c: 1 + Math.floor(Math.random() * NCOLORS), gem: c.gem, b: 0 };
  }
  newSet();
  Ui.enterGame();
}

// First-run tutorial — three guided boards, like the original:
//   1. drag a block to fill a row            2. pop a row and a column with one block
//   3. three placements in a row → combo     Each board only accepts the guided move.
// fill: [x0, x1, y0, y1] filled rectangles (inclusive). steps: pieces in the order the hand guides them.
const TUT_BOARDS = [
  { msg: 'tut_1', color: 3, fill: [[0, 2, 4, 4], [5, 7, 4, 4]],
    steps: [{ cells: [[0, 0], [1, 0]], color: 6, slot: 1, gx: 3, gy: 4 }] },
  { msg: 'tut_2', color: 5, fill: [[0, 3, 3, 3], [5, 7, 3, 3], [4, 4, 0, 2], [4, 4, 4, 7]],
    steps: [{ cells: [[0, 0]], color: 2, slot: 1, gx: 4, gy: 3 }] },
  { msg: 'tut_3', color: 1, fill: [[0, 4, 6, 6], [2, 7, 1, 1], [0, 5, 3, 4]],
    steps: [
      { cells: [[0, 0], [1, 0], [2, 0]], color: 6, slot: 0, gx: 5, gy: 6 },
      { cells: [[0, 0], [1, 0]], color: 4, slot: 1, gx: 0, gy: 1 },
      { cells: [[0, 0], [1, 0], [0, 1], [1, 1]], color: 7, slot: 2, gx: 6, gy: 3 },
    ] },
];
function tutStep() { const tu = G.tut; return tu && !tu.done ? tu.steps[tu.step] : null; }
function tutPiece() { const st = tutStep(); return st ? G.tray[st.slot] : null; }

function startTutorial(board = 0) {
  resetRun();
  G.mode = 'classic'; G.adv = null;
  const B = TUT_BOARDS[board];
  G.tut = { board, step: 0, steps: B.steps, msg: B.msg, done: false, t: 0 };
  for (const [x0, x1, y0, y1] of B.fill) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) G.grid[idx(x, y)] = { c: B.color, gem: 0, b: 0 };
  G.tray = [null, null, null];
  B.steps.forEach((st, i) => { const p = makePiece({ cells: st.cells }, st.color); p.slot = st.slot; p.appearT = 0.001 + i * 0.08; G.tray[st.slot] = p; });
  layoutTray();
  Ui.enterGame();
}
function tutAdvance() {
  const tu = G.tut; if (!tu || tu.done) return;
  tu.step++;
  if (tu.step < tu.steps.length) return;                   // same board, next guided piece
  tu.done = true;
  const last = tu.board >= TUT_BOARDS.length - 1;
  if (last) { tu.msg = 'tut_done'; Save.d.tutDone = true; Save.save(); }
  Fx.banner(t(last ? 'tut_great' : 'tut_nice'), 'allclear');
  if (last) Sfx.play('allclear');
  setTimeout(() => {
    if (!G.tut) return;
    if (last) { G.tut = null; startClassic(); } else startTutorial(tu.board + 1);
  }, last ? 1600 : 1250);
}
function skipTutorial() {
  Save.d.tutDone = true; Save.save();
  G.tut = null;
  Sfx.play('click');
  startClassic();
}

function placeDraggedPiece(p, gx, gy, fromHold) {
  for (const [cx, cy] of p.cells) G.grid[idx(gx + cx, gy + cy)] = { c: p.color, gem: 0, b: 0.0001 };
  if (fromHold) G.hold = null; else G.tray[p.slot] = null;
  G.placedRun += p.cells.length;
  Sfx.play('place');
  addScore(p.cells.length, null);

  const rows = [], cols = [];
  for (let y = 0; y < 8; y++) { let full = true; for (let x = 0; x < 8; x++) if (!G.grid[idx(x, y)]) { full = false; break; } if (full) rows.push(y); }
  for (let x = 0; x < 8; x++) { let full = true; for (let y = 0; y < 8; y++) if (!G.grid[idx(x, y)]) { full = false; break; } if (full) cols.push(x); }
  const n = rows.length + cols.length;

  if (n > 0) {
    G.combo++; G.movesNoClear = 0;
    G.maxCombo = Math.max(G.maxCombo, G.combo);
    G.linesRun += n;
    const pts = n * 10 * G.combo;
    performClear(rows, cols, gx + p.w / 2, gy + p.h / 2, pts, n);
  } else {
    G.movesNoClear++;
    if (G.movesNoClear >= 3) G.combo = 0;
    afterMove();
  }

  if (G.tut) tutAdvance();
}

function performClear(rows, cols, ox, oy, pts, n) {
  const M = Metrics;
  const cleared = []; const seen = new Set();
  const take = (x, y) => { const i = idx(x, y); if (seen.has(i) || !G.grid[i]) return; seen.add(i); cleared.push({ x, y, cell: G.grid[i] }); };
  for (const y of rows) for (let x = 0; x < 8; x++) take(x, y);
  for (const x of cols) for (let y = 0; y < 8; y++) take(x, y);

  for (const r of rows) Fx.sweep(true, r);
  for (const c of cols) Fx.sweep(false, c);

  let gemDelayBase = 0;
  for (const { x, y, cell } of cleared) {
    G.grid[idx(x, y)] = null;
    const d = (Math.abs(x - ox) + Math.abs(y - oy)) * 0.028;
    const [px, py] = M.cellCenter(x, y);
    Fx.pop(x, y, px, py, cell.c, d);
    if (cell.gem && G.adv) {
      G.adv.pending++;
      const chip = Ui.gemChipPos(cell.gem);
      Fx.fly(px, py, chip[0], chip[1], cell.gem, 0.15 + d + (gemDelayBase += 0.06), () => {
        if (cell.gem === 1) G.adv.red = Math.max(0, G.adv.red - 1);
        else G.adv.blue = Math.max(0, G.adv.blue - 1);
        G.adv.pending--;
        Sfx.play('gem');
        Ui.updateObjectives();
        maybeLevelClear();
      });
    }
  }
  G.poppedRun += cleared.length;
  G.barT = 2.2;

  addScore(pts, [ox, oy]);
  Sfx.play('clear', { combo: G.combo, lines: n });
  if (n >= 2) {
    Fx.shake(Math.min(10, 3 + n * 2.2));
    Fx.banner(n === 2 ? 'DOUBLE!' : n === 3 ? 'TRIPLE!' : 'MEGA BLAST!', 'big');
  }
  if (G.combo >= 2) Fx.banner(t('combo') + ' ' + G.combo, 'combo');

  if (boardCount() === 0 && !G.tut) {
    const bonus = 150;
    addScore(bonus, [4, 2.2]);
    Fx.banner(t('all_clear'), 'allclear');
    Sfx.play('allclear');
    Fx.confetti(Metrics.W, Metrics.H);
  }
  checkAchievements();
  afterMove();
}

function addScore(v, at) {
  G.score += v;
  Ui.setScore(G.score);
  if (at) {
    const [px, py] = Metrics.cellCenter(at[0] - 0.5, at[1] - 0.5);
    Fx.float(px, py, '+' + v, Math.min(46, 22 + v * 0.12), '#ffffff');
  }
  if (G.mode === 'classic' && !G.tut && G.score > Save.d.best) {
    Save.d.best = G.score; Ui.setBest(Save.d.best);
  }
}

function afterMove() {
  if (G.tut) return;                       // tutorial hands control back via its own timer
  if (!G.tray[0] && !G.tray[1] && !G.tray[2]) newSet();
  maybeLevelClear();
  checkEnd();
}

function maybeLevelClear() {
  if (G.mode !== 'adv' || !G.adv || G.over) return;
  if (G.adv.red + G.adv.blue === 0 && G.adv.pending === 0) {
    G.over = true;
    Sfx.play('win');
    Fx.confetti(Metrics.W, Metrics.H);
    const n = G.adv.n;
    if (!Save.d.advDone.includes(n)) Save.d.advDone.push(n);
    Save.d.advUnlocked = Math.max(Save.d.advUnlocked, Math.min(Levels.COUNT, n + 1));
    Save.save();
    setTimeout(() => adBreakThen('level_clear', () => Ui.showLevelClear(n)), 900);
  }
}
// Adventure: after repeated fails on a level the player may skip it with a rewarded ad.
function skipLevel(n) {
  if (!Save.d.advDone.includes(n)) Save.d.advDone.push(n);
  Save.d.advUnlocked = Math.max(Save.d.advUnlocked, Math.min(Levels.COUNT, n + 1));
  Save.save();
  startAdventure(Math.min(Levels.COUNT, n + 1));
}

function checkEnd() {
  if (G.over || G.tut) return;
  if (G.mode === 'adv' && G.adv && G.adv.red + G.adv.blue === 0) return; // win pending
  const fits = anyFitTray();
  const holdFits = G.hold ? anyFitPiece(G.hold) : false;
  const canStash = !G.hold && G.tray.some(p => p);
  G.hintSwap = !fits && !holdFits;                      // pulse the hold box in render
  if (fits || holdFits || canStash) return;
  gameOver();
}

function gameOver() {
  G.over = true;
  Sfx.play('over');
  if (G.revives < maxRevives()) { setTimeout(() => Ui.showRevive(), 650); return; }
  finishRun();
}
function commitTotals() {
  if (G.committed) return;
  G.committed = true;
  Save.d.games++; Save.d.totLines += G.linesRun; Save.d.totBlocks += G.placedRun;
  Save.d.totDestroyed = (Save.d.totDestroyed | 0) + G.poppedRun;
}
function finishRun() {
  commitTotals();
  if (G.mode === 'classic') {
    const isNew = G.score >= Save.d.best && G.score > 0;
    if (G.score > Save.d.best) Save.d.best = G.score;
    if (!Save.d.name) Save.d.name = Rank.defaultName();
    Save.save();
    Rank.submit(Save.d.best, Save.d.totDestroyed, Save.d.name, lang());
    setTimeout(() => adBreakThen('game_over', () => Ui.showGameOver(isNew)), 300);
  } else {
    Save.save();
    if (G.adv) G.advFails[G.adv.n] = (G.advFails[G.adv.n] | 0) + 1;
    setTimeout(() => adBreakThen('level_failed', () => Ui.showLevelFailed()), 300);
  }
}
function revive() {
  G.revived = true; G.over = false; G.revives++;
  Sfx.play('revive');
  let d = 0;
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const cell = G.grid[idx(x, y)];
    if (!cell) continue;
    if (G.mode === 'adv' && cell.gem) continue;
    G.grid[idx(x, y)] = null;
    const [px, py] = Metrics.cellCenter(x, y);
    Fx.pop(x, y, px, py, cell.c, (d += 0.012));
  }
  G.combo = 0; G.movesNoClear = 0;
  Fx.shake(8);
  checkEnd();
}

// ---- achievements ----
function achProgress(track) {
  const v = track === 'score' ? Save.d.best : totalDestroyed();
  const tiers = ACH[track];
  let next = tiers.find(x => v < x);
  return { v, next: next || tiers[tiers.length - 1], done: tiers.filter(x => v >= x).length };
}
function checkAchievements() {
  const names = [t('bronze'), t('silver'), t('gold')];
  let changed = false;
  for (const track of ['score', 'blocks']) {
    const v = track === 'score' ? Save.d.best : totalDestroyed();
    ACH[track].forEach((th, i) => {
      const id = track + (i + 1);
      if (v >= th && !Save.d.ach.includes(id)) {
        Save.d.ach.push(id); changed = true;
        const label = (track === 'score' ? t('ach_score') : t('ach_blocks')) + ' · ' + names[i];
        setTimeout(() => { Ui.toast('🏅 ' + t('ach_unlocked') + ' ' + label); Sfx.play('gem'); }, 500);
      }
    });
  }
  if (changed) Save.save();
}

// ---- hold / stash ----
function stashPiece(p) {       // from tray slot into hold box
  if (G.hold || G.tut) return false;
  G.hold = p; G.tray[p.slot] = null;
  Sfx.play('hold');
  if (!G.tray[0] && !G.tray[1] && !G.tray[2]) newSet();
  checkEnd();
  return true;
}
function swapWithHold(p) {     // drop tray piece on occupied hold → exchange
  if (G.tut) return;
  const old = G.hold;
  G.hold = p; G.tray[p.slot] = old; old.slot = p.slot;
  Sfx.play('hold');
  layoutTray();
  checkEnd();
}
