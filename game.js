/* Block Pop — © KOGAMES. Built 2026-10-27T06:07Z. Source: src/ */
(function(){'use strict';
// ===== i18n.js =====
// ===== i18n =====
// Order: [ko, en, ja, ru, es, fr]
const STR = {
  tagline:        ['드래그해서 줄을 채우고 — 팡! 터뜨리세요', 'Drag blocks, fill a line — and POP it away!', 'ブロックをドラッグしてラインを揃えて — ポン！と消そう', 'Тяни блоки, заполняй линию — и взрывай!', '¡Arrastra bloques, completa la línea y hazla explotar!', 'Glisse les blocs, remplis une ligne — et fais-la exploser !'],
  play:           ['플레이', 'PLAY', 'プレイ', 'ИГРАТЬ', 'JUGAR', 'JOUER'],
  adventure:      ['어드벤처', 'ADVENTURE', 'アドベンチャー', 'ПРИКЛЮЧЕНИЕ', 'AVENTURA', 'AVENTURE'],
  level_n:        ['레벨 {0}', 'Level {0}', 'レベル {0}', 'Уровень {0}', 'Nivel {0}', 'Niveau {0}'],
  how_to:         ['게임 방법', 'How to play', '遊び方', 'Как играть', 'Cómo jugar', 'Comment jouer'],
  language:       ['언어', 'Language', '言語', 'Язык', 'Idioma', 'Langue'],
  ranking:        ['랭킹', 'Ranking', 'ランキング', 'Рейтинг', 'Clasificación', 'Classement'],
  best:           ['최고 기록', 'Best', 'ベスト', 'Рекорд', 'Récord', 'Record'],
  score:          ['점수', 'Score', 'スコア', 'Очки', 'Puntos', 'Score'],
  menu:           ['메뉴', 'Menu', 'メニュー', 'Меню', 'Menú', 'Menu'],
  settings:       ['설정', 'Settings', '設定', 'Настройки', 'Ajustes', 'Réglages'],
  sound:          ['사운드', 'Sound', 'サウンド', 'Звук', 'Sonido', 'Son'],
  nickname:       ['닉네임', 'Nickname', 'ニックネーム', 'Никнейм', 'Apodo', 'Pseudo'],
  name_hint:      ['랭킹에 표시될 이름', 'Name shown on the ranking', 'ランキングに表示される名前', 'Имя в рейтинге', 'Nombre mostrado en la clasificación', 'Nom affiché au classement'],
  save:           ['저장', 'Save', '保存', 'Сохранить', 'Guardar', 'Enregistrer'],
  cancel:         ['취소', 'Cancel', 'キャンセル', 'Отмена', 'Cancelar', 'Annuler'],
  close:          ['닫기', 'Close', '閉じる', 'Закрыть', 'Cerrar', 'Fermer'],
  resume:         ['계속하기', 'Resume', '続ける', 'Продолжить', 'Continuar', 'Reprendre'],
  restart:        ['다시 시작', 'Restart', 'リスタート', 'Заново', 'Reiniciar', 'Recommencer'],
  retry:          ['다시 도전', 'Retry', 'リトライ', 'Ещё раз', 'Reintentar', 'Réessayer'],
  home:           ['홈으로', 'Home', 'ホーム', 'Домой', 'Inicio', 'Accueil'],
  next:           ['다음', 'Next', '次へ', 'Дальше', 'Siguiente', 'Suivant'],
  game_over:      ['게임 오버', 'Game Over', 'ゲームオーバー', 'Игра окончена', 'Fin del juego', 'Partie terminée'],
  new_record:     ['신기록!', 'NEW BEST!', '新記録！', 'Новый рекорд!', '¡Nuevo récord!', 'Nouveau record !'],
  revive:         ['이어하기', 'Continue', 'コンティニュー', 'Продолжить', 'Continuar', 'Continuer'],
  revive_desc:    ['보드를 비우고 한 번 더! (1회)', 'Clear the board and keep going! (once)', 'ボードを空にしてもう一度！（1回）', 'Очисти поле и играй дальше! (1 раз)', '¡Vacía el tablero y sigue jugando! (1 vez)', 'Vide le plateau et continue ! (1 fois)'],
  give_up:        ['그만하기', 'End run', '終了する', 'Завершить', 'Terminar', 'Terminer'],
  no_swaps:       ['교체 횟수를 다 썼어요', 'No swaps left', '交換はもう使えません', 'Замены закончились', 'No quedan cambios', 'Plus d\'échanges'],
  swapped:        ['새 블록으로 교체!', 'New blocks!', '新しいブロック！', 'Новые блоки!', '¡Bloques nuevos!', 'Nouveaux blocs !'],
  lines:          ['지운 줄', 'Lines', '消したライン', 'Линии', 'Líneas', 'Lignes'],
  blocks:         ['터뜨린 블록', 'Blocks popped', '消したブロック', 'Блоки', 'Bloques', 'Blocs'],
  combo_max:      ['최대 콤보', 'Max combo', '最大コンボ', 'Макс. комбо', 'Combo máx.', 'Combo max'],
  all_clear:      ['올 클리어!', 'ALL CLEAR!', 'オールクリア！', 'ВСЁ ЧИСТО!', '¡TODO LIMPIO!', 'TOUT NETTOYÉ !'],
  level_clear:    ['레벨 클리어!', 'LEVEL CLEAR!', 'レベルクリア！', 'УРОВЕНЬ ПРОЙДЕН!', '¡NIVEL SUPERADO!', 'NIVEAU TERMINÉ !'],
  level_failed:   ['실패…', 'Failed…', '失敗…', 'Неудача…', 'Fallaste…', 'Échec…'],
  level_goal:     ['갇힌 보석을 모두 모으세요!', 'Collect every trapped gem!', '閉じ込められたジェムを全部集めよう！', 'Собери все запертые самоцветы!', '¡Recoge todas las gemas atrapadas!', 'Récupère toutes les gemmes piégées !'],
  gems_left:      ['남은 보석', 'Gems left', '残りジェム', 'Осталось самоцветов', 'Gemas restantes', 'Gemmes restantes'],
  all_done:       ['모든 레벨 클리어! 새 레벨이 곧 추가됩니다.', 'All levels cleared! More coming soon.', '全レベルクリア！新レベルは近日追加。', 'Все уровни пройдены! Скоро будут новые.', '¡Todos los niveles superados! Pronto habrá más.', 'Tous les niveaux terminés ! D\'autres arrivent bientôt.'],
  locked:         ['이전 레벨을 먼저 클리어하세요', 'Clear the previous level first', '前のレベルを先にクリアしよう', 'Сначала пройди предыдущий уровень', 'Supera antes el nivel anterior', 'Termine d\'abord le niveau précédent'],
  select_level:   ['레벨 선택', 'Select level', 'レベル選択', 'Выбор уровня', 'Elegir nivel', 'Choisir un niveau'],
  world_ranking:  ['세계 랭킹', 'World ranking', '世界ランキング', 'Мировой рейтинг', 'Clasificación mundial', 'Classement mondial'],
  my_rank:        ['내 순위 {0}위 · 최고 {1}', 'Your rank #{0} · best {1}', 'あなたの順位 {0}位 · ベスト {1}', 'Твоё место #{0} · рекорд {1}', 'Tu puesto n.º {0} · récord {1}', 'Ton rang n°{0} · record {1}'],
  rank_loading:   ['랭킹 불러오는 중…', 'Loading ranking…', 'ランキング読み込み中…', 'Загрузка рейтинга…', 'Cargando clasificación…', 'Chargement du classement…'],
  rank_offline:   ['랭킹 서버에 연결할 수 없어요', 'Can\'t reach the ranking server', 'ランキングサーバーに接続できません', 'Нет связи с сервером рейтинга', 'No se puede conectar al servidor', 'Impossible de joindre le serveur'],
  rank_none:      ['한 판 끝내면 세계 랭킹에 올라가요', 'Finish a game to enter the world ranking', '1プレイ終えると世界ランキングに登録されます', 'Сыграй партию, чтобы попасть в рейтинг', 'Termina una partida para entrar en la clasificación', 'Termine une partie pour entrer au classement'],
  rank_empty:     ['아직 기록이 없어요. 첫 번째가 되어 보세요!', 'No scores yet — be the first!', 'まだ記録なし。一番乗りになろう！', 'Пока нет результатов — будь первым!', 'Aún no hay récords. ¡Sé el primero!', 'Pas encore de scores — sois le premier !'],
  howto1:         ['아래 블록을 잡아 8×8 보드 위 원하는 곳에 놓으세요. 세 개를 모두 놓으면 새 블록이 나와요.', 'Drag a block from the tray anywhere onto the 8×8 board. Place all three to get a new set.', '下のブロックを8×8ボードの好きな場所へドラッグ。3つ置くと新しいセットが登場。', 'Перетащи блок из лотка на поле 8×8. Поставь все три — получишь новый набор.', 'Arrastra un bloque de la bandeja al tablero de 8×8. Coloca los tres para recibir más.', 'Glisse un bloc du bas vers le plateau 8×8. Place les trois pour en recevoir de nouveaux.'],
  howto2:         ['가로줄이나 세로줄을 가득 채우면 팡! 하고 터져요. 여러 줄을 한 번에 터뜨리면 점수가 커져요.', 'Fill a full row or column to POP it. Blast several lines at once for bigger points.', '横や縦のラインを埋めるとポン！同時に複数ライン消すと高得点。', 'Заполни ряд или столбец — он взорвётся! Несколько линий сразу — больше очков.', 'Llena una fila o columna para hacerla explotar. ¡Varias líneas a la vez dan más puntos!', 'Remplis une ligne ou une colonne pour la faire exploser. Plusieurs d\'un coup = plus de points !'],
  howto3:         ['연속으로 줄을 지우면 콤보 배수가 올라가요. 3번 놓는 동안 못 지우면 콤보가 끝나요.', 'Keep clearing to raise your combo multiplier. Miss for 3 moves and the combo resets.', '連続で消すとコンボ倍率アップ。3手消せないとコンボ終了。', 'Убирай линии подряд — комбо-множитель растёт. 3 хода без линий — комбо сбросится.', 'Sigue limpiando líneas y tu combo subirá. Tres turnos sin limpiar y el combo se reinicia.', 'Enchaîne les lignes pour augmenter ton combo. Trois coups sans ligne et il retombe.'],
  howto4:         ['교체 버튼으로 블록 세트를 언제든 바꿀 수 있어요(콤보는 끊겨요). 보관함에 블록 하나를 아껴 둘 수도 있어요.', 'Swap the whole set any time with the swap button (it breaks your combo). Save one block for later in the side box.', '交換ボタンでいつでもセットを交換（コンボは途切れます）。横のボックスにブロックを1つ保管できます。', 'Кнопка обмена меняет весь набор в любой момент (комбо сбрасывается). Один блок можно отложить в боковую ячейку.', 'Cambia el juego de bloques cuando quieras con el botón de cambio (rompe el combo). Guarda un bloque en la casilla lateral.', 'Échange tout le lot quand tu veux avec le bouton d\'échange (le combo retombe). Garde un bloc dans la case latérale.'],
  tip_hold:       ['보관함', 'Hold', 'キープ', 'Запас', 'Reserva', 'Réserve'],
  confirm_home:   ['진행 중인 게임을 끝낼까요?', 'End the current game?', '今のゲームを終了しますか？', 'Завершить текущую игру?', '¿Terminar la partida actual?', 'Terminer la partie en cours ?'],
  yes:            ['네', 'Yes', 'はい', 'Да', 'Sí', 'Oui'],
  no:             ['아니요', 'No', 'いいえ', 'Нет', 'No', 'Non'],
  rename_title:   ['닉네임 바꾸기', 'Change nickname', 'ニックネーム変更', 'Сменить никнейм', 'Cambiar apodo', 'Changer de pseudo'],
  combo:          ['콤보', 'Combo', 'コンボ', 'Комбо', 'Combo', 'Combo'],
  themes:         ['테마', 'Themes', 'テーマ', 'Темы', 'Temas', 'Thèmes'],
  th_standard:    ['기본', 'Standard', 'スタンダード', 'Обычная', 'Estándar', 'Standard'],
  th_pink:        ['핑크', 'Pink', 'ピンク', 'Розовая', 'Rosa', 'Rose'],
  th_lightblue:   ['라이트 블루', 'Light blue', 'ライトブルー', 'Голубая', 'Azul claro', 'Bleu clair'],
  th_pinkblue:    ['핑크 & 블루', 'Pink & blue', 'ピンク＆ブルー', 'Розово-синяя', 'Rosa y azul', 'Rose & bleu'],
  th_neon:        ['네온', 'Neon', 'ネオン', 'Неон', 'Neón', 'Néon'],
  th_white:       ['화이트', 'White', 'ホワイト', 'Белая', 'Blanco', 'Blanc'],
  achievements:   ['업적', 'Achievements', '実績', 'Достижения', 'Logros', 'Succès'],
  ach_score:      ['최고 점수', 'Top score', 'ハイスコア', 'Лучший счёт', 'Mejor puntuación', 'Meilleur score'],
  ach_blocks:     ['누적 파괴 블록', 'Blocks destroyed', '累計破壊ブロック', 'Уничтожено блоков', 'Bloques destruidos', 'Blocs détruits'],
  bronze:         ['브론즈', 'Bronze', 'ブロンズ', 'Бронза', 'Bronce', 'Bronze'],
  silver:         ['실버', 'Silver', 'シルバー', 'Серебро', 'Plata', 'Argent'],
  gold:           ['골드', 'Gold', 'ゴールド', 'Золото', 'Oro', 'Or'],
  ach_unlocked:   ['업적 달성!', 'Achievement unlocked!', '実績解除！', 'Достижение получено!', '¡Logro desbloqueado!', 'Succès débloqué !'],
  destroyed:      ['파괴한 블록', 'Destroyed blocks', '破壊したブロック', 'Уничтожено блоков', 'Bloques destruidos', 'Blocs détruits'],
  tut_place:      ['블록을 놓아 보세요!', 'Place the blocks!', 'ブロックを置こう！', 'Поставь блок!', '¡Coloca los bloques!', 'Place les blocs !'],
  tut_great:      ['완벽해요!', 'Perfect!', 'パーフェクト！', 'Отлично!', '¡Perfecto!', 'Parfait !'],
  skip:           ['건너뛰기 >>', 'Skip >>', 'スキップ >>', 'Пропустить >>', 'Saltar >>', 'Passer >>'],
  unlimited:      ['무제한', 'Unlimited', '無制限', 'Без ограничений', 'Ilimitado', 'Illimité'],
  howto5:         ['테마에서 블록 색을 바꾸고, 업적에서 메달을 모아 보세요.', 'Change the block colors in Themes and collect medals in Achievements.', 'テーマでブロックの色を変え、実績でメダルを集めよう。', 'Меняй цвета блоков в темах и собирай медали в достижениях.', 'Cambia los colores en Temas y colecciona medallas en Logros.', 'Change les couleurs dans Thèmes et collectionne les médailles dans Succès.'],
};

const LANGS = ['ko', 'en', 'ja', 'ru', 'es', 'fr'];
const LANG_NAMES = { ko: '한국어', en: 'English', ja: '日本語', ru: 'Русский', es: 'Español', fr: 'Français' };
let cur = 1;

function initLang(saved) {
  if (saved && LANGS.includes(saved)) { cur = LANGS.indexOf(saved); applyLangDom(); return; }
  const nav = (navigator.languages || [navigator.language || 'en']).map(s => String(s).slice(0, 2).toLowerCase());
  for (const c of nav) { if (LANGS.includes(c)) { cur = LANGS.indexOf(c); applyLangDom(); return; } }
  cur = LANGS.indexOf('en'); applyLangDom();
}
function applyLangDom() { document.documentElement.lang = LANGS[cur]; }
function setLang(code) { cur = Math.max(0, LANGS.indexOf(code)); applyLangDom(); }
function lang() { return LANGS[cur]; }
function nextLang() { return LANGS[(cur + 1) % LANGS.length]; }
function t(key, ...args) {
  const row = STR[key]; if (!row) return key;
  let s = row[cur] != null ? row[cur] : row[1];
  for (let i = 0; i < args.length; i++) s = s.replace('{' + i + '}', args[i]);
  return s;
}
// ===== save.js =====
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
// ===== audio.js =====
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
// ===== rank.js =====
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
// ===== shapes.js =====
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
// ===== levels.js =====
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
// ===== sprites.js =====
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
// ===== fx.js =====
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
// ===== core.js =====
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
  adv: null,                // { n, red, blue, pending }
  tut: null,                // { gx, gy, done, t } first-run tutorial
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
  Fx.clear();
}
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

// First-run tutorial: a wall with one gap, a single 1x4 bar, and a guiding hand.
function startTutorial() {
  resetRun();
  G.mode = 'classic'; G.adv = null;
  G.tut = { gx: 2, gy: 3, done: false, t: 0 };
  for (let y = 0; y < 8; y++) { if (y === 3) continue; for (let x = 2; x < 6; x++) G.grid[idx(x, y)] = { c: 3, gem: 0, b: 0 }; }
  const bar = makePiece({ cells: [[0, 0], [1, 0], [2, 0], [3, 0]] }, 6);
  bar.slot = 1; bar.appearT = 0.001;
  G.tray = [null, bar, null];
  layoutTray();
  Ui.enterGame();
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

  if (G.tut && !G.tut.done) {
    G.tut.done = true;
    Save.d.tutDone = true; Save.save();
    Fx.banner(t('tut_great'), 'allclear');
    setTimeout(() => { if (G.tut) { G.tut = null; startClassic(); } }, 1400);
  }
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
    setTimeout(() => Ui.showLevelClear(n), 900);
  }
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
  if (!G.revived) { setTimeout(() => Ui.showRevive(), 650); return; }
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
    setTimeout(() => Ui.showGameOver(isNew), 300);
  } else {
    Save.save();
    setTimeout(() => Ui.showLevelFailed(), 300);
  }
}
function revive() {
  G.revived = true; G.over = false;
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
// ===== ui.js =====
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
// ===== boot.js =====
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
  subH: 0, swapRect: [0, 0, 0, 0], holdRect: [0, 0, 0, 0], skipRect: [0, 0, 0, 0],
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
  const availH = M.H - hudBottom - bm;
  M.B = Math.min(M.W - 22, availH / 1.52);
  M.P = M.B * 0.028;
  M.cs = (M.B - 2 * M.P) / 8;
  M.boardX = (M.W - M.B) / 2;
  M.boardY = hudBottom + Math.max(0, (availH - M.B * 1.52) * 0.3);
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
  if (G.tut && Drag.valid && !(gx === G.tut.gx && gy === G.tut.gy)) Drag.valid = false;
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
  // banner band above the board
  const bh = M.cs * 0.95, by = M.boardY - bh - 6;
  ctx.save();
  ctx.fillStyle = T.light ? 'rgba(40,60,140,0.85)' : 'rgba(12,14,40,0.72)';
  ctx.fillRect(0, by, M.W, bh);
  ctx.fillStyle = '#fff'; ctx.font = fontStr(bh * 0.5, 700); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(t('tut_place'), M.W / 2, by + bh / 2 + 1);
  ctx.restore();
  if (tu.done) return;
  // target ghost pulse
  const piece = G.tray[1] || Drag.p;
  if (piece && !Drag.p) {
    ctx.save(); ctx.globalAlpha = 0.5 + Math.sin(tu.t * 5) * 0.25;
    for (const [cx, cy] of piece.cells) { const [px, py] = M.cellXY(tu.gx + cx, tu.gy + cy); ctx.drawImage(Sprites.cache.ghost, px, py, M.cs, M.cs); }
    ctx.restore();
    // guiding hand loop
    const L = 2.1, k = (tu.t % L) / L;
    const [sx, sy] = M.slotCenter(1);
    const [tx0, ty0] = M.cellXY(tu.gx, tu.gy);
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
  if (location.hash === '#about' || location.hash === '#howto') setTimeout(() => Ui.showHowTo(), 300);
  else if (location.hash === '#ranking') setTimeout(() => Ui.showRanking(), 300);

  // tiny debug/testing handle (also used to render store assets from the real renderer)
  window.__bp = { G, Save, Ui, Fx, Sprites, Theme, THEMES, THEME_IDS, PALETTE, Levels, Metrics, Drag, drawLogo, startClassic, startAdventure, startTutorial, skipTutorial, layout, setLang, t, idx, ACH, achProgress };
}
boot();
})();
