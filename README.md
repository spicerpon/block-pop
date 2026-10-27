# Block Pop

Free block-blast puzzle by **KOGAMES**, playable in the browser: https://kogames.dev/block-pop/

- Pure HTML5 Canvas + JavaScript, no framework, no server required to play.
- Classic endless mode + 60 gem-collecting Adventure levels.
- Global ranking on Firebase Realtime Database (anonymous, best score only).
- Languages: Korean, English, Japanese, Russian, Spanish, French (auto-detected, switchable in game).
- Three-board guided tutorial on first play (fill a row → row + column at once → combo chain).
- Ads: Google H5 Games Ads (AdSense Ad Placement API) — rewarded continue (up to 2 per run), rewarded level skip after repeated fails, interstitial before result cards after 25s+ of play. Fully playable with ads blocked or before approval (continue stays free once).

## Files
- `index.html`, `style.css` — page & UI
- `game.js` — bundled game (built from `src/` with `sh build.sh`)
- `src/` — readable sources (i18n, save, audio, ads, rank, shapes, levels, sprites, fx, core, ui, boot)
- `assets/` — icon & social image (rendered by the game's own tile renderer)

© KOGAMES. All rights reserved.
