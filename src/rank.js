// ===== rank =====
// Global leaderboard on Firebase Realtime Database (own project block-pop-c2857, node: scores/{uid}).
// Loaded lazily — the game is fully playable offline; ranking is a bonus layer.
// Record shape: { n: nickname, s: best score, b: blocks popped, t: server time, l: lang }
const Rank = {
  cfg: {
    apiKey: 'AIzaSyATBb4t3xVeYQlCX7bkKYmFSENK2my9-eY',
    authDomain: 'block-pop-c2857.firebaseapp.com',
    databaseURL: 'https://block-pop-c2857-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'block-pop-c2857',
    appId: '1:123594065023:web:8db1bb08ead79bfd07eb4a',
  },
  VER: '12.4.0', F: null, db: null, uid: null, _init: null, lastSent: -1, lastErr: null,
  path: 'scores', TOP: 50, MAXNAME: 14,

  enabled() { return this.cfg && this.cfg.apiKey && this.cfg.apiKey.indexOf('__') !== 0; },

  init() {
    if (!this.enabled()) return Promise.resolve(false);
    if (this._init) return this._init;
    this._init = (async () => {
      const B = `https://www.gstatic.com/firebasejs/${this.VER}/`;
      const [app, auth, dbm] = await Promise.all([import(B + 'firebase-app.js'), import(B + 'firebase-auth.js'), import(B + 'firebase-database.js')]);
      const a = app.getApps().length ? app.getApp() : app.initializeApp(this.cfg);
      const au = auth.getAuth(a);
      if (!au.currentUser) await auth.signInAnonymously(au);
      this.uid = au.currentUser.uid; this.F = dbm; this.db = dbm.getDatabase(a);
      return true;
    })().catch((e) => { this.lastErr = e; this._init = null; return false; });
    return this._init;
  },
  online() { return typeof navigator === 'undefined' || navigator.onLine !== false; },

  // Push the player's best (only when it beats what we already sent). Never throws.
  async submit(best, blocks, name, lng) {
    try {
      if (!this.online() || !(best > 0) || best <= this.lastSent) return false;
      if (!(await this.init())) return false;
      const F = this.F; const n = this.cleanName(name);
      await F.update(F.ref(this.db, `${this.path}/${this.uid}`), { n, s: best, b: blocks | 0, t: F.serverTimestamp(), l: (lng || 'en').slice(0, 2) });
      this.lastSent = best; return true;
    } catch (e) { this.lastErr = e; return false; }
  },
  async rename(name, best, blocks, lng) { this.lastSent = -1; return this.submit(best, blocks, name, lng); },

  // Top N + the caller's own rank. Returns { top: [{uid,n,s,b,t}], me: {rank, s} | null }
  async top(myBest = 0) {
    if (!(await this.init())) return null;
    const F = this.F; const base = F.ref(this.db, this.path);
    const snap = await F.get(F.query(base, F.orderByChild('s'), F.limitToLast(this.TOP)));
    const top = []; snap.forEach((c) => { const v = c.val() || {}; top.push({ uid: c.key, n: v.n || '?', s: +v.s || 0, b: v.b | 0, t: v.t || 0 }); });
    top.sort((a, b) => b.s - a.s || a.t - b.t);
    let me = null;
    const idx = top.findIndex((r) => r.uid === this.uid);
    if (idx >= 0) me = { rank: idx + 1, s: top[idx].s, inTop: true };
    else if (myBest > 0) {
      const above = await F.get(F.query(base, F.orderByChild('s'), F.startAt(myBest + 1), F.limitToFirst(1000)));
      let c = 0; above.forEach(() => { c++; }); me = { rank: c + 1, s: myBest, inTop: false, capped: c >= 1000 };
    }
    return { top, me };
  },
  cleanName(s) { s = String(s || '').replace(/[\u0000-\u001f<>]/g, '').trim(); return (s || 'Popper').slice(0, this.MAXNAME); },
  defaultName() { return 'Popper' + String(1000 + Math.floor(Math.random() * 9000)); },
};
