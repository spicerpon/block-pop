// ===== ads =====
// Google H5 Games Ads (AdSense Ad Placement API) — same integration as Candy Merge.
// Placements: rewarded "revive" (classic + adventure), rewarded "skip_level" (adventure, after repeated fails),
// interstitial "run_end" before a result card (only after ≥ MIN_PLAY seconds of play — Google throttles frequency).
// Everything degrades gracefully: with an ad blocker or before AdSense approval, reward() resolves 'unavailable'
// and interstitial() resolves immediately, so the game never hangs on ads.
const ADS = { client: 'ca-pub-1318477289708440', MIN_PLAY: 25, MAX_REVIVES: 2, SKIP_AFTER_FAILS: 2 };

const Ads = {
  client: '', loaded: false, apiReady: false, testing: false, busy: false, onPause: null, onResume: null,
  init(client, { sound = true, test = false, frequencyHint = '60s' } = {}) {
    this.client = client; this.testing = test;
    if (document.querySelector('script[data-h5-ads]')) return;
    window.adsbygoogle = window.adsbygoogle || [];
    if (!window.adBreak) { window.adBreak = window.adConfig = function (o) { window.adsbygoogle.push(o); }; }
    const s = document.createElement('script');
    s.async = true; s.crossOrigin = 'anonymous'; s.dataset.h5Ads = '1';
    s.dataset.adFrequencyHint = frequencyHint;
    if (test) s.dataset.adbreakTest = 'on';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(client);
    s.onload = () => { this.loaded = true; };
    document.head.appendChild(s);
    // onReady only fires once the Ad Placement API is live for this AdSense account/site; until then every placement is skipped instantly.
    window.adConfig({ preloadAdBreaks: 'on', sound: sound ? 'on' : 'off', onReady: () => { this.loaded = true; this.apiReady = true; } });
  },
  setSound(on) { try { window.adConfig && window.adConfig({ sound: on ? 'on' : 'off' }); } catch (e) {} },
  available() { return this.apiReady && !!window.adBreak; },

  // Rewarded ad. Resolves 'viewed' | 'dismissed' | 'unavailable'.
  reward(name) {
    return new Promise((resolve) => {
      if (this.busy || !this.available()) { resolve('unavailable'); return; }
      this.busy = true; let offered = false, done = false, paused = false;
      const finish = (st) => { if (done) return; done = true; this.busy = false; clearTimeout(tm); if (paused) { paused = false; this.onResume && this.onResume(); } resolve(st); };
      const tm = setTimeout(() => { if (!offered) finish('unavailable'); }, 6000);
      try {
        window.adBreak({
          type: 'reward', name,
          beforeReward: (showAdFn) => { offered = true; clearTimeout(tm); try { showAdFn(); } catch (e) { finish('unavailable'); } },
          beforeAd: () => { paused = true; this.onPause && this.onPause(); },
          afterAd: () => { if (paused) { paused = false; this.onResume && this.onResume(); } },
          adDismissed: () => finish('dismissed'),
          adViewed: () => finish('viewed'),
          adBreakDone: (info) => { const st = info && info.breakStatus; if (!offered) finish('unavailable'); else finish(st === 'viewed' ? 'viewed' : 'dismissed'); },
        });
      } catch (e) { finish('unavailable'); }
    });
  },

  // Interstitial ("next" placement). Always resolves; frequency is managed by Google.
  interstitial(name) {
    return new Promise((resolve) => {
      if (this.busy || !this.available()) { resolve(false); return; }
      this.busy = true; let shown = false, done = false, paused = false;
      const finish = () => { if (done) return; done = true; this.busy = false; clearTimeout(tm); if (paused) { paused = false; this.onResume && this.onResume(); } resolve(shown); };
      const tm = setTimeout(finish, shown ? 60000 : 2500);
      try {
        window.adBreak({
          type: 'next', name,
          beforeAd: () => { shown = true; paused = true; clearTimeout(tm); this.onPause && this.onPause(); },
          afterAd: () => { if (paused) { paused = false; this.onResume && this.onResume(); } },
          adBreakDone: () => finish(),
        });
      } catch (e) { finish(); }
    });
  },
};
