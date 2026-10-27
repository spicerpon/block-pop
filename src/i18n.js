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
