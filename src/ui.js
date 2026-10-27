// ===== ui =====
// Everything DOM: HUD values, title texts, popups, toasts.
const Ui = {
  els: {}, toastTimer: 0,

  bind() {
    ['hud', 'score', 'best', 'score-wrap', 'obj-wrap', 'lvl-label', 'obj-red', 'obj-blue', 'obj-red-n', 'obj-blue-n',
      'btn-home', 'btn-rank', 'btn-menu', 'title', 'logo', 't-tagline', 'btn-play', 't-play', 'btn-adventure',
      't-adventure', 't-adv-lvl', 'btn-howto', 'btn-title-rank', 'btn-lang', 'btn-themes', 'btn-ach', 'title-best', 'popups', 'toast', 'home-link']
      .forEach(id => { this.els[id] = document.getElementById(id); });

    this.els['btn-play'].onclick = () => { Sfx.play('click'); startClassic(); };
    this.els['btn-adventure'].onclick = () => { Sfx.play('click'); this.showLevelSelect(); };
    this.els['btn-howto'].onclick = () => { Sfx.play('click'); this.showHowTo(); };
    this.els['btn-title-rank'].onclick = () => { Sfx.play('click'); this.showRanking(); };
    this.els['btn-themes'].onclick = () => { Sfx.play('click'); this.showThemes(); };
    this.els['btn-ach'].onclick = () => { Sfx.play('click'); this.showAchievements(); };
    this.els['btn-lang'].onclick = () => { Sfx.play('click'); setLang(nextLang()); Save.d.lang = lang(); Save.save(); this.applyTexts(); };
    this.els['btn-menu'].onclick = () => { Sfx.play('click'); this.showMenu(); };
    this.els['btn-rank'].onclick = () => { Sfx.play('click'); this.showRanking(); };
    this.els['btn-home'].onclick = () => {
      Sfx.play('click');
      if (G.over || G.tut) { this.goTitle(); return; }
      this.confirm(t('confirm_home'), () => this.goTitle());
    };
  },

  applyTexts() {
    const e = this.els;
    e['t-tagline'].textContent = t('tagline');
    e['t-play'].textContent = t('play');
    e['t-adventure'].textContent = t('adventure');
    e['t-adv-lvl'].textContent = t('level_n', Math.min(Save.d.advUnlocked, Levels.COUNT));
    e['btn-howto'].textContent = t('how_to');
    e['btn-title-rank'].textContent = t('ranking');
    e['btn-themes'].textContent = '🎨 ' + t('themes');
    e['btn-ach'].textContent = '🏅 ' + t('achievements');
    e['btn-lang'].textContent = '🌐 ' + LANG_NAMES[lang()];
    e['title-best'].textContent = Save.d.best > 0 ? `${t('best')} · ${Save.d.best.toLocaleString()}` : '';
    if (G.mode === 'adv' && G.adv) e['lvl-label'].textContent = t('level_n', G.adv.n);
  },

  applyTheme(id) {
    Theme.apply(id);
    Save.d.theme = Theme.id; Save.save();
    Sprites.rebuild();
    drawLogo(this.els.logo);
  },

  setScore(v) { const el = this.els.score; el.textContent = v.toLocaleString(); el.classList.remove('punch'); void el.offsetWidth; el.classList.add('punch'); },
  setBest(v) { this.els.best.textContent = v.toLocaleString(); },

  enterGame() {
    this.closeAll();
    this.els.title.hidden = true;
    this.els.hud.hidden = false;
    this.setScore(G.score); this.setBest(Save.d.best);
    const adv = G.mode === 'adv';
    this.els['score-wrap'].hidden = adv;
    this.els['obj-wrap'].hidden = !adv;
    if (adv) { this.els['lvl-label'].textContent = t('level_n', G.adv.n); this.updateObjectives(true); }
    requestAnimationFrame(() => layout());   // HUD just became visible → measure it for the board top
  },
  goTitle() {
    this.closeAll();
    if (G.mode !== 'title' && !G.tut && G.placedRun > 0) { commitTotals(); Save.save(); }
    G.mode = 'title'; G.over = false; G.tut = null; Fx.clear();
    this.els.hud.hidden = true;
    this.els.title.hidden = false;
    this.applyTexts();
  },

  updateObjectives(init) {
    if (!G.adv) return;
    const r = this.els['obj-red'], b = this.els['obj-blue'];
    if (init) { r.hidden = G.adv.red === 0; b.hidden = G.adv.blue === 0; }
    this.els['obj-red-n'].textContent = G.adv.red;
    this.els['obj-blue-n'].textContent = G.adv.blue;
    r.classList.toggle('done', G.adv.red === 0);
    b.classList.toggle('done', G.adv.blue === 0);
  },
  gemChipPos(kind) {
    const el = kind === 1 ? this.els['obj-red'] : this.els['obj-blue'];
    const cr = document.getElementById('game').getBoundingClientRect();
    const r = (el && !el.hidden ? el : this.els['obj-wrap']).getBoundingClientRect();
    return [r.left + r.width / 2 - cr.left, r.top + r.height / 2 - cr.top];
  },

  toast(msg) {
    const el = this.els.toast;
    el.textContent = msg; el.hidden = false;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { el.hidden = true; }, 1900);
  },

  // ---- popup framework ----
  open(titleText, color, opts = {}) {
    const ov = document.createElement('div'); ov.className = 'overlay';
    const card = document.createElement('div'); card.className = 'card';
    if (titleText) {
      const head = document.createElement('div'); head.className = 'card-head';
      const h = document.createElement('h2'); h.textContent = titleText;
      if (color) h.style.setProperty('--hcol', color);
      head.appendChild(h);
      if (!opts.noClose) {
        const x = document.createElement('button'); x.className = 'btn-x'; x.textContent = '✕'; x.setAttribute('aria-label', t('close'));
        x.onclick = () => { Sfx.play('back'); this.closeAll(); if (opts.onClose) opts.onClose(); };
        head.appendChild(x);
      }
      card.appendChild(head);
    }
    if (!opts.noDismiss) ov.addEventListener('pointerdown', (ev) => { if (ev.target === ov) { Sfx.play('back'); this.closeAll(); if (opts.onClose) opts.onClose(); } });
    ov.appendChild(card);
    this.els.popups.appendChild(ov);
    return card;
  },
  closeAll() { this.els.popups.innerHTML = ''; },
  el(tag, cls, html) { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; },
  btn(label, cls, fn) { const b = this.el('button', 'btn small ' + (cls || 'c-blue')); b.textContent = label; b.onclick = () => { Sfx.play('click'); fn(); }; return b; },

  confirm(msg, yes) {
    const card = this.open('', null, { noDismiss: true, noClose: true });
    card.appendChild(this.el('p', '', msg));
    const row = this.el('div', 'row');
    row.appendChild(this.btn(t('yes'), 'c-red', () => { this.closeAll(); yes(); }));
    row.appendChild(this.btn(t('no'), 'c-slate', () => this.closeAll()));
    card.appendChild(row);
  },

  // ---- menu ----
  showMenu() {
    const card = this.open(t('menu'), 'var(--cyan)');
    const sr = this.el('div', 'setting-row'); sr.appendChild(this.el('span', '', t('sound')));
    const tg = this.el('button', 'tgl' + (Save.d.sound ? ' on' : '')); tg.setAttribute('aria-label', t('sound'));
    tg.onclick = () => { Save.d.sound = !Save.d.sound; Sfx.setOn(Save.d.sound); Save.save(); tg.classList.toggle('on', Save.d.sound); Sfx.play('click'); };
    sr.appendChild(tg); card.appendChild(sr);
    const grid = this.el('div', 'menu-grid');
    grid.appendChild(this.btn('🌐 ' + LANG_NAMES[lang()], 'c-blue', () => {
      setLang(nextLang()); Save.d.lang = lang(); Save.save(); this.applyTexts(); this.closeAll(); this.showMenu();
    }));
    grid.appendChild(this.btn('🎨 ' + t('themes'), 'c-purple', () => { this.closeAll(); this.showThemes(() => this.showMenu()); }));
    grid.appendChild(this.btn('🏅 ' + t('achievements'), 'c-amber', () => { this.closeAll(); this.showAchievements(() => this.showMenu()); }));
    grid.appendChild(this.btn('❔ ' + t('how_to'), 'c-teal', () => { this.closeAll(); this.showHowTo(() => this.showMenu()); }));
    card.appendChild(grid);
    card.appendChild(this.btn(t('restart'), 'c-orange wide', () => {
      this.closeAll();
      if (G.mode === 'adv') startAdventure(G.adv.n); else startClassic();
    }));
    card.appendChild(this.btn(t('home'), 'c-slate wide', () => { this.closeAll(); if (G.over || G.tut) this.goTitle(); else this.confirm(t('confirm_home'), () => this.goTitle()); }));
    card.appendChild(this.btn(t('resume'), 'c-green wide', () => this.closeAll()));
  },

  // ---- themes ----
  showThemes(back) {
    const card = this.open(t('themes'), 'var(--purple)', { onClose: back });
    const grid = this.el('div', 'theme-grid');
    for (const id of THEME_IDS) {
      const T = THEMES[id];
      const b = this.el('button', 'theme-cell' + (id === Theme.id ? ' sel' : ''));
      b.style.setProperty('--tb0', T.bg[0]); b.style.setProperty('--tb1', T.bg[2]);
      const cv = document.createElement('canvas');
      const s = 64, dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = s * dpr; cv.height = s * dpr; cv.style.width = cv.style.height = s + 'px';
      const x = cv.getContext('2d'); x.scale(dpr, dpr);
      const cs = s / 2;
      [0, 1, 2, 3].forEach((i) => { const img = Sprites.makeTile(T.colors[[0, 3, 5, 7][i]], Math.round(cs * 2), T.glow); x.drawImage(img, (i % 2) * cs, Math.floor(i / 2) * cs, cs, cs); });
      b.appendChild(cv);
      b.appendChild(this.el('span', 'theme-name', t('th_' + id)));
      b.onclick = () => { Sfx.play('click'); this.applyTheme(id); this.closeAll(); this.showThemes(back); };
      grid.appendChild(b);
    }
    card.appendChild(grid);
    card.appendChild(this.btn(t('close'), 'c-green', () => { this.closeAll(); if (back) back(); }));
  },

  // ---- achievements ----
  showAchievements(back) {
    const card = this.open(t('achievements'), 'var(--amber)', { onClose: back });
    const names = [t('bronze'), t('silver'), t('gold')];
    const medal = ['🥉', '🥈', '🥇'];
    const wrap = this.el('div', 'list scroll');
    for (const track of ['score', 'blocks']) {
      const p = achProgress(track);
      const sec = this.el('div', 'ach-sec');
      sec.appendChild(this.el('h3', '', (track === 'score' ? '🏆 ' + t('ach_score') : '💥 ' + t('ach_blocks')) + ' · <b>' + p.v.toLocaleString() + '</b>'));
      const bar = this.el('div', 'ach-bar'); const fill = this.el('i'); fill.style.width = Math.min(100, (p.v / p.next) * 100).toFixed(1) + '%'; bar.appendChild(fill); sec.appendChild(bar);
      const row = this.el('div', 'ach-row');
      ACH[track].forEach((th, i) => {
        const on = p.v >= th;
        const m = this.el('div', 'ach-medal' + (on ? ' on' : ''));
        m.appendChild(this.el('span', 'ach-ic', medal[i]));
        m.appendChild(this.el('span', 'ach-nm', names[i]));
        m.appendChild(this.el('span', 'ach-th', th.toLocaleString()));
        row.appendChild(m);
      });
      sec.appendChild(row);
      wrap.appendChild(sec);
    }
    card.appendChild(wrap);
    card.appendChild(this.btn(t('close'), 'c-green', () => { this.closeAll(); if (back) back(); }));
  },

  // ---- how to ----
  showHowTo(back) {
    const card = this.open(t('how_to'), 'var(--yellow)', { onClose: back });
    const wrap = this.el('div', 'list scroll');
    const mk = (key, draw) => {
      const row = this.el('div', 'howto-item');
      const cv = document.createElement('canvas');
      const s = 72, dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = s * dpr; cv.height = s * dpr; cv.style.width = cv.style.height = s + 'px';
      const x = cv.getContext('2d'); x.scale(dpr, dpr); draw(x, s);
      row.appendChild(cv);
      row.appendChild(this.el('p', '', t(key)));
      wrap.appendChild(row);
    };
    const tile = (x, ci, px, py, cs) => { const img = Sprites.makeTile(PALETTE[ci].base, Math.round(cs * 2), false); x.drawImage(img, px, py, cs, cs); };
    mk('howto1', (x, s) => { const cs = s / 4;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { x.globalAlpha = 0.25; tile(x, 6, 4 + i * cs, 4 + j * cs, cs - 1); }
      x.globalAlpha = 1; tile(x, 2, 4 + 2.6 * cs, 4 + 2.2 * cs, cs); tile(x, 2, 4 + 2.6 * cs + cs, 4 + 2.2 * cs, cs);
    });
    mk('howto2', (x, s) => { const cs = s / 4.6;
      for (let i = 0; i < 4; i++) tile(x, [1, 3, 5, 7][i], 4 + i * cs, s / 2 - cs / 2, cs - 1);
      x.fillStyle = 'rgba(255,255,255,0.65)'; x.fillRect(2, s / 2 - cs / 2 - 2, 4 * cs + 4, cs + 3);
    });
    mk('howto3', (x, s) => {
      x.font = `700 ${s * 0.3}px Fredoka, sans-serif`; x.textAlign = 'center'; x.fillStyle = '#ffd24a';
      x.shadowColor = 'rgba(255,180,60,.8)'; x.shadowBlur = 10;
      x.fillText('x2', s / 2, s * 0.4); x.fillText('x3', s / 2, s * 0.78);
    });
    mk('howto4', (x, s) => { const cs = s / 3.4;
      x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 2; x.setLineDash([4, 3]);
      x.strokeRect(s / 2 - cs * 0.8, s / 2 - cs * 0.8, cs * 1.6, cs * 1.6); x.setLineDash([]);
      tile(x, 4, s / 2 - cs / 2, s / 2 - cs / 2, cs);
      drawSwapIcon(x, s * 0.2, s * 0.22, s * 0.16, '#9fe2ff');
    });
    mk('howto5', (x, s) => { const cs = s / 4;
      tile(x, 1, 6, 8, cs); tile(x, 8, 6 + cs, 8, cs); tile(x, 5, 6, 8 + cs, cs); tile(x, 6, 6 + cs, 8 + cs, cs);
      x.font = `${s * 0.42}px sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('🏅', s * 0.72, s * 0.66);
    });
    card.appendChild(wrap);
    card.appendChild(this.btn(t('close'), 'c-green', () => { this.closeAll(); if (back) back(); }));
  },

  // ---- ranking ----
  showRanking() {
    const card = this.open(t('world_ranking'), 'var(--amber)');
    card.appendChild(this.el('p', '', `${t('best')}: <b>${Save.d.best.toLocaleString()}</b>`));
    const status = this.el('p', 'note', t('rank_loading')); card.appendChild(status);
    const list = this.el('div', 'list scroll'); list.style.flex = '1'; card.appendChild(list);

    const nameRow = this.el('div', 'row');
    const field = this.el('input', 'field'); field.maxLength = Rank.MAXNAME; field.placeholder = t('name_hint');
    field.value = Save.d.name || ''; field.style.flex = '1'; field.style.minWidth = '0';
    const saveBtn = this.btn(t('save'), 'c-green', async () => {
      const n = Rank.cleanName(field.value);
      Save.d.name = n; Save.save(); field.value = n;
      if (Save.d.best > 0) { await Rank.rename(n, Save.d.best, Save.d.totDestroyed | 0, lang()); }
      this.toast('✓');
      load();
    });
    saveBtn.style.flex = '0 0 auto'; saveBtn.style.minWidth = '0';
    nameRow.appendChild(field); nameRow.appendChild(saveBtn);
    card.appendChild(this.el('h3', '', t('nickname')));
    card.appendChild(nameRow);

    const load = async () => {
      list.innerHTML = '';
      if (!Rank.enabled()) { status.textContent = t('rank_offline'); return; }
      status.textContent = t('rank_loading');
      const res = await Rank.top(Save.d.best).catch(() => null);
      if (!res) { status.textContent = t('rank_offline'); return; }
      if (!res.top.length) { status.textContent = t('rank_empty'); return; }
      status.textContent = res.me ? t('my_rank', res.me.rank + (res.me.capped ? '+' : ''), Save.d.best.toLocaleString())
        : (Save.d.best > 0 ? '' : t('rank_none'));
      res.top.forEach((r, i) => {
        const row = this.el('div', 'rank-row' + (r.uid === Rank.uid ? ' me' : ''));
        const rk = this.el('span', 'rk' + (i < 3 ? ' top' + (i + 1) : ''), i < 3 ? ['🥇', '🥈', '🥉'][i] : String(i + 1));
        row.appendChild(rk);
        const nm = this.el('span', 'nm'); nm.textContent = r.n; row.appendChild(nm);
        row.appendChild(this.el('span', 'sc', r.s.toLocaleString()));
        list.appendChild(row);
      });
    };
    load();
  },

  // ---- revive / game over / level results ----
  showRevive() {
    const card = this.open(t('game_over'), 'var(--red)', { noDismiss: true, noClose: true });
    card.appendChild(this.el('p', '', t('revive_desc')));
    card.appendChild(this.btn('❤ ' + t('revive'), 'c-green wide', () => { this.closeAll(); revive(); }));
    card.appendChild(this.btn(t('give_up'), 'c-slate wide', () => { this.closeAll(); finishRun(); }));
  },
  showGameOver(isNew) {
    const card = this.open(t('game_over'), 'var(--red)', { noDismiss: true, noClose: true });
    card.appendChild(this.el('div', 'big-score', G.score.toLocaleString() + (isNew ? ' <span class="badge-new">' + t('new_record') + '</span>' : '')));
    const st = this.el('div', 'stat-grid');
    st.appendChild(this.el('div', 'stat', `<b>${G.linesRun}</b><span>${t('lines')}</span>`));
    st.appendChild(this.el('div', 'stat', `<b>${G.poppedRun}</b><span>${t('blocks')}</span>`));
    st.appendChild(this.el('div', 'stat', `<b>x${G.maxCombo}</b><span>${t('combo_max')}</span>`));
    card.appendChild(st);
    card.appendChild(this.btn('🏆 ' + t('world_ranking'), 'c-amber wide', () => { this.closeAll(); this.showRanking(); }));
    const row = this.el('div', 'row');
    row.appendChild(this.btn(t('retry'), 'c-green', () => { this.closeAll(); startClassic(); }));
    row.appendChild(this.btn(t('home'), 'c-slate', () => this.goTitle()));
    card.appendChild(row);
  },
  showLevelClear(n) {
    const card = this.open(t('level_clear'), 'var(--green)', { noDismiss: true, noClose: true });
    card.appendChild(this.el('div', 'big-score', '⭐ ' + t('level_n', n)));
    const st = this.el('div', 'stat-grid');
    st.appendChild(this.el('div', 'stat', `<b>${G.score.toLocaleString()}</b><span>${t('score')}</span>`));
    st.appendChild(this.el('div', 'stat', `<b>${G.linesRun}</b><span>${t('lines')}</span>`));
    card.appendChild(st);
    const row = this.el('div', 'row');
    if (n < Levels.COUNT) row.appendChild(this.btn(t('next') + ' ▶', 'c-green', () => { this.closeAll(); startAdventure(n + 1); }));
    else card.appendChild(this.el('p', 'note', t('all_done')));
    row.appendChild(this.btn(t('home'), 'c-slate', () => this.goTitle()));
    card.appendChild(row);
  },
  showLevelFailed() {
    const card = this.open(t('level_failed'), 'var(--red)', { noDismiss: true, noClose: true });
    card.appendChild(this.el('p', '', t('level_goal')));
    card.appendChild(this.el('div', 'stat-grid'));
    card.lastChild.appendChild(this.el('div', 'stat', `<b>${G.adv.red + G.adv.blue}</b><span>${t('gems_left')}</span>`));
    const row = this.el('div', 'row');
    row.appendChild(this.btn(t('retry'), 'c-green', () => { this.closeAll(); startAdventure(G.adv.n); }));
    row.appendChild(this.btn(t('home'), 'c-slate', () => this.goTitle()));
    card.appendChild(row);
  },

  // ---- level select ----
  showLevelSelect() {
    const card = this.open(t('select_level'), 'var(--blue)');
    card.appendChild(this.el('p', 'note', t('level_goal')));
    const grid = this.el('div', 'lvl-grid'); grid.style.flex = '1';
    for (let n = 1; n <= Levels.COUNT; n++) {
      const b = this.el('button', 'lvl-cell');
      const done = Save.d.advDone.includes(n);
      const unlocked = n <= Save.d.advUnlocked;
      if (done) { b.classList.add('done'); b.textContent = n; }
      else if (unlocked) b.textContent = n;
      else { b.classList.add('lock'); b.textContent = '🔒'; }
      b.onclick = () => {
        if (!unlocked) { this.toast(t('locked')); return; }
        Sfx.play('click'); this.closeAll(); startAdventure(n);
      };
      grid.appendChild(b);
    }
    card.appendChild(grid);
    setTimeout(() => { const el = grid.children[Math.max(0, Save.d.advUnlocked - 1)]; if (el) el.scrollIntoView({ block: 'center' }); }, 30);
  },
};
