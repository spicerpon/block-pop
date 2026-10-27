#!/bin/sh
# Bundles src/*.js into a single classic script (no modules → works from any static host).
cd "$(dirname "$0")"
{
  echo "/* Block Pop — © KOGAMES. Built $(date -u +%Y-%m-%dT%H:%MZ). Source: src/ */"
  echo "(function(){'use strict';"
  for f in i18n.js save.js audio.js ads.js rank.js shapes.js levels.js sprites.js fx.js core.js ui.js boot.js; do
    echo "// ===== $f ====="
    sed -E 's/^export (default )?//' "src/$f"
  done
  echo "})();"
} > game.js
echo "built game.js ($(wc -c < game.js) bytes)"
