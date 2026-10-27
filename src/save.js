// ===== save =====
// localStorage with cookie fallback (same approach as Candy Merge).
const Save = {
  KEY: 'bp_save_v1',
  d: {
    best: 0, lang: null, sound: true, name: '',
    advUnlocked: 1,            // highest unlocked adventure level (1-based)
    advDone: [],               // level numbers cleared
    totLines: 0, totBlocks: 0, games: 0,
    theme: 'standard',         // color theme id
    tutDone: false,            // first-run tutorial finished / skipped
    ach: [],                   // unlocked achievement ids ('score1'..'score3','blocks1'..'blocks3')
  },
  load() {
    let raw = null;
    try { raw = localStorage.getItem(this.KEY); } catch (e) {}
    if (!raw) { const m = document.cookie.match(new RegExp(this.KEY + '=([^;]+)')); if (m) { try { raw = decodeURIComponent(m[1]); } catch (e) {} } }
    if (raw) { try { Object.assign(this.d, JSON.parse(raw)); } catch (e) {} }
    if (!Array.isArray(this.d.advDone)) this.d.advDone = [];
    if (!Array.isArray(this.d.ach)) this.d.ach = [];
    this.d.advUnlocked = Math.max(1, this.d.advUnlocked | 0);
  },
  save() {
    const raw = JSON.stringify(this.d);
    try { localStorage.setItem(this.KEY, raw); } catch (e) {}
    try { document.cookie = this.KEY + '=' + encodeURIComponent(raw) + ';max-age=31536000;path=/;SameSite=Lax'; } catch (e) {}
  },
};
