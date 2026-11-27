/* MAS fun layer — cute robot mascot, prisoner's-dilemma mini game,
   herding playground, dice, robot parade easter egg.
   Self-contained: injects its own styles and DOM. No external deps. */
(function () {
  'use strict';
  if (window.__masFun) return;
  window.__masFun = true;

  var QUOTES = [
    'سکوت کن تا هر دو آزاد شویم! 🤫',
    'تعادل نش: هر دو اعتراف 🥲',
    'γ کوچک = کوته‌بین! 👀',
    'من خودمختارم؛ خودم تصمیم می‌گیرم 🤖',
    'هماهنگی یعنی صبر برای خروج از در کلاس 🚪',
    'No-Op هم یک کنش آگاهانه است 😌',
    'گله را به آغل برسان! 🐄',
    'عقلانیت محدود، ولی خوش‌حال! 😄',
    'AAMAS منتظر مقالهٔ توست 📄',
    'همکاری: هر دو یک نمرهٔ خوب می‌گیریم 🤝',
  ];
  var quoteIdx = 0;

  var STYLE = document.createElement('style');
  STYLE.textContent = [
    '#masbot{position:fixed;bottom:14px;inset-inline-start:14px;z-index:9999;cursor:pointer;user-select:none;-webkit-user-select:none;filter:drop-shadow(0 6px 18px rgba(0,0,0,.35));transition:transform .25s ease}',
    '#masbot:hover{transform:translateY(-6px) scale(1.04)}',
    '#masbot.wave{animation:maswave .9s ease}',
    '@keyframes maswave{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}55%{transform:rotate(10deg)}}',
    '#masbot .masbot-line{stroke:var(--brand, #10b981)}',
    '#masbot .masbot-bulb{fill:var(--warn, #fbbf24)}',
    '#masbot .masbot-head{fill:var(--surface, #111827);stroke:var(--brand, #10b981);transition:fill .25s,stroke .25s}',
    '#masbot .masbot-eye{fill:var(--brand, #10b981)}',
    '#masbot .masbot-mouth{stroke:var(--brand, #10b981)}',
    '#masbot .masbot-body{fill:var(--surface-2, #182234);stroke:var(--brand, #10b981);transition:fill .25s,stroke .25s}',
    '#masbot .masbot-dot-1,#masbot .masbot-dot-3{fill:var(--warn, #fbbf24)}',
    '#masbot .masbot-dot-2{fill:var(--brand, #10b981)}',
    '#masbot .masbot-leg{stroke:var(--brand, #10b981)}',
    '#masbubble{position:fixed;bottom:118px;inset-inline-start:16px;z-index:9999;max-width:240px;background:var(--surface, #111827);border:1px solid var(--line-2, rgba(255,255,255,.15));color:var(--ink, #f8fafc);font-family:inherit;font-size:13.5px;line-height:1.9;padding:10px 14px;border-radius:16px;border-end-start-radius:4px;box-shadow:var(--shadow-2, 0 10px 30px rgba(0,0,0,.3));opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .25s ease,transform .25s ease,background .25s,color .25s,border-color .25s}',
    '#masbubble.show{opacity:1;transform:translateY(0)}',
    '#masbubble::after{content:"";position:absolute;bottom:-7px;inset-inline-start:18px;width:12px;height:12px;background:var(--surface, #111827);border-inline-end:1px solid var(--line-2, rgba(255,255,255,.15));border-bottom:1px solid var(--line-2, rgba(255,255,255,.15));transform:rotate(45deg);transition:background .25s,border-color .25s}',
    '#masparade{position:fixed;left:0;right:0;bottom:0;height:86px;z-index:10000;pointer-events:none;overflow:hidden}',
    '#masparade .parader{position:absolute;bottom:0;animation:masmarch 7s linear forwards}',
    '#masparade .msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--brand, #10b981);font-family:inherit;font-size:17px;font-weight:700;text-shadow:0 2px 12px rgba(0,0,0,.6);opacity:0;animation:masfade 7s ease forwards}',
    '@keyframes masmarch{0%{transform:translateX(-110%)}100%{transform:translateX(110vw)}}',
    '@keyframes masfade{0%,12%{opacity:0}20%,80%{opacity:1}100%{opacity:0}}',
    '.masfun-card{max-width:560px;margin:22px auto;background:var(--surface, #111827);border:1px solid var(--line-2, rgba(255,255,255,.12));border-radius:18px;padding:22px;color:var(--ink, #f8fafc);font-family:inherit;box-shadow:var(--shadow-2, 0 14px 40px rgba(0,0,0,.25));transition:background .25s,border-color .25s,color .25s}',
    '.masfun-card h3{margin:0 0 4px;font-size:1.15rem;color:var(--brand, #10b981);font-family:inherit;font-weight:700}',
    '.masfun-card .sub{margin:0 0 14px;font-size:12px;color:var(--muted, #94a3b8);font-family:inherit}',
    '.masfun-card .btnrow{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0}',
    '.masfun-btn{flex:1;min-width:130px;padding:10px 14px;border-radius:12px;border:1px solid var(--brand, #10b981);background:var(--brand-soft, rgba(16,185,129,.1));color:var(--ink, #f8fafc);font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:background .2s,transform .15s,border-color .2s}',
    ':root[data-theme="light"] .masfun-btn{color:var(--ink, #0f172a)}',
    '.masfun-btn:hover{background:var(--brand-soft-2, rgba(16,185,129,.22));transform:translateY(-2px)}',
    '.masfun-btn.bad{border-color:var(--bad, #ef4444);background:var(--bad-soft, rgba(239,68,68,.08));color:var(--bad, #ef4444)}',
    '.masfun-btn.bad:hover{background:rgba(239,68,68,.2)}',
    '.masfun-result{margin-top:12px;min-height:22px;font-size:14.5px;line-height:2;color:var(--ink, #f8fafc)}',
    '.masfun-result .mono{color:var(--brand, #10b981);font-weight:700}',
    '.payoff{width:100%;border-collapse:collapse;margin:12px 0;font-size:12.5px;direction:rtl}',
    '.payoff th,.payoff td{border:1px solid var(--line-2, rgba(255,255,255,.15));padding:8px 10px;text-align:center;color:var(--ink-2, #cbd5e1)}',
    ':root[data-theme="light"] .payoff th,:root[data-theme="light"] .payoff td{border-color:var(--line, #e2e8f0);color:var(--ink-2, #334155)}',
    '.payoff th{background:var(--surface-2, #182234);color:var(--brand, #10b981);font-weight:700}',
    ':root[data-theme="light"] .payoff th{background:var(--surface-2, #f1f5f9);color:var(--brand, #059669)}',
    '.payoff td.hl{background:var(--warn-soft, rgba(245,158,11,.15));color:var(--warn, #f59e0b);font-weight:700}',
    '#herdgame{position:relative;width:100%;height:320px;border-radius:16px;border:1px solid var(--line-2, rgba(255,255,255,.15));overflow:hidden;background:var(--surface-2, #182234);cursor:crosshair;touch-action:none;transition:background .25s,border-color .25s}',
    ':root[data-theme="light"] #herdgame{background:#f1f5f9;border-color:var(--line-2, #cbd5e1)}',
    ':root:not([data-theme="light"]) #herdgame{background:radial-gradient(900px 400px at 50% -20%,rgba(16,185,129,.12),transparent),radial-gradient(300px 200px at 85% 95%,rgba(245,158,11,.08),transparent),repeating-linear-gradient(45deg,rgba(255,255,255,.015) 0 14px,transparent 14px 28px),#0b0f17}',
    '#herdgame .pen{position:absolute;border:2px dashed var(--warn, #f59e0b);border-radius:12px;background:var(--warn-soft, rgba(245,158,11,.1))}',
    '#herdgame .pen::after{content:"آغل";position:absolute;inset-inline:0;bottom:3px;text-align:center;font-size:10px;font-weight:700;color:var(--warn, #f59e0b)}',
    '#herdgame .cow{position:absolute;width:17px;height:15px;margin:-8.5px 0 0 -8.5px;border-radius:48% 52% 46% 54%;background:radial-gradient(circle at 32% 30%,#fff 18%,#e2e8f0 60%,#cbd5e1 100%);box-shadow:0 2px 6px rgba(0,0,0,.25),inset -2px -2px 0 rgba(0,0,0,.15)}',
    '#herdgame .cow::before{content:"";position:absolute;top:2px;left:6px;width:5px;height:5px;border-radius:50%;background:#334155}',
    '#herdgame .rob{position:absolute;width:16px;height:16px;margin:-8px;font-size:16px;line-height:1;pointer-events:none}',
    '#herdgame .hud{position:absolute;top:10px;inset-inline-start:12px;inset-inline-end:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12.5px;color:var(--muted, #94a3b8)}',
    '#herdgame .hud .hint{opacity:.85}',
    '#herdgame .whistle{position:absolute;width:12px;height:12px;margin:-6px;border:2px solid var(--brand, #10b981);border-radius:50%;pointer-events:none;animation:whistlepop .7s ease-out forwards}',
    '@keyframes whistlepop{0%{transform:scale(.4);opacity:1}100%{transform:scale(9);opacity:0}}',
    '#herdgame .spark{position:absolute;pointer-events:none;font-size:15px;animation:sparkle 1.2s ease-in-out infinite}',
    '@keyframes sparkle{0%,100%{opacity:.25;transform:scale(.7)}50%{opacity:1;transform:scale(1.15)}}',
    '#herdgame .hud b{color:var(--brand, #10b981);font-weight:700}',
    '#herdgame .hud button{margin-inline-start:10px;background:var(--brand-soft, rgba(16,185,129,.12));border:1px solid var(--brand, #10b981);color:var(--ink, #f8fafc);border-radius:8px;padding:3px 10px;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;transition:background .2s}',
    ':root[data-theme="light"] #herdgame .hud button{color:var(--brand-2, #047857)}',
    '#herdgame .hud button:hover{background:var(--brand-soft-2, rgba(16,185,129,.25))}',
    '#herdgame .cow,#herdgame .rob{pointer-events:none}',
    '.masdice{display:inline-block;font-size:34px;line-height:1;cursor:pointer;user-select:none;transition:transform .12s}',
    '.masdice.roll{animation:masdice .5s ease}',
    '@media (max-width: 640px){#masbot{bottom:10px;inset-inline-start:10px;transform:scale(.72);transform-origin:bottom right;opacity:.9}#masbot:hover,#masbot:active{opacity:1;transform:scale(.8)}#masbubble{bottom:74px;inset-inline-start:10px;max-width:calc(100vw - 32px);font-size:12.5px;padding:8px 12px}}',
    '@media (prefers-reduced-motion: reduce){#masbot,#masparade .parader,#masparade .msg,.masdice.roll{animation:none!important;transition:none!important}}',
  ].join('\n');
  document.head.appendChild(STYLE);

  /* default theme from OS so the light/dark toggle always flips visibly */
  var rootEl = document.documentElement;
  if (!rootEl.getAttribute('data-theme')) {
    var prefDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    rootEl.setAttribute('data-theme', prefDark ? 'dark' : 'light');
  }

  /* ---------- robot mascot (عاملک) ---------- */
  var robot = document.createElement('div');
  robot.id = 'masbot';
  robot.setAttribute('aria-label', 'ربات عاملک — کلیک کنید');
  robot.innerHTML =
    '<svg width="72" height="84" viewBox="0 0 72 84" fill="none" aria-hidden="true">' +
    '<line class="masbot-line" x1="36" y1="12" x2="36" y2="4" stroke-width="2" stroke-linecap="round"/>' +
    '<circle class="masbot-bulb" cx="36" cy="3.5" r="3"/>' +
    '<rect class="masbot-head" x="12" y="12" width="48" height="38" rx="12" stroke-width="2.4"/>' +
    '<g id="masbot-eyes">' +
    '<circle class="masbot-eye" cx="27" cy="30" r="3.6"/>' +
    '<circle class="masbot-eye" cx="45" cy="30" r="3.6"/>' +
    '</g>' +
    '<path class="masbot-mouth" d="M27 42q9 6 18 0" stroke-width="2.2" stroke-linecap="round"/>' +
    '<rect class="masbot-body" x="18" y="52" width="36" height="24" rx="8" stroke-width="2.2"/>' +
    '<circle class="masbot-dot-1" cx="30" cy="64" r="2.4"/>' +
    '<circle class="masbot-dot-2" cx="36" cy="64" r="2.4"/>' +
    '<circle class="masbot-dot-3" cx="42" cy="64" r="2.4"/>' +
    '<line class="masbot-leg" x1="24" y1="80" x2="24" y2="76" stroke-width="2.4" stroke-linecap="round"/>' +
    '<line class="masbot-leg" x1="48" y1="80" x2="48" y2="76" stroke-width="2.4" stroke-linecap="round"/>' +
    '</svg>';
  document.body.appendChild(robot);

  var bubble = document.createElement('div');
  bubble.id = 'masbubble';
  bubble.setAttribute('dir', 'rtl');
  document.body.appendChild(bubble);

  function say(txt, ms) {
    bubble.textContent = txt;
    bubble.classList.add('show');
    clearTimeout(say._t);
    say._t = setTimeout(function () { bubble.classList.remove('show'); }, ms || 3400);
  }

  robot.addEventListener('click', function () {
    robot.classList.remove('wave');
    void robot.offsetWidth;
    robot.classList.add('wave');
    say(QUOTES[quoteIdx % QUOTES.length]);
    quoteIdx++;
  });

  /* blinking + eyes follow cursor */
  var blink = setInterval(function () {
    var eyes = robot.querySelectorAll('#masbot-eyes circle');
    var closed = eyes[0].getAttribute('r') === '0.8';
    eyes.forEach(function (e) { e.setAttribute('r', closed ? '3.6' : '0.8'); });
  }, 3400);
  document.addEventListener('mousemove', function (ev) {
    var r = robot.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + 30;
    var dx = (ev.clientX - cx) / 140, dy = (ev.clientY - cy) / 140;
    var mx = Math.max(-3.4, Math.min(3.4, dx)), my = Math.max(-1.6, Math.min(1.6, dy));
    var eyes = robot.querySelectorAll('#masbot-eyes circle');
    eyes[0].setAttribute('transform', 'translate(' + mx + ' ' + my + ')');
    eyes[1].setAttribute('transform', 'translate(' + mx + ' ' + my + ')');
  });

  /* ---------- prisoner's dilemma mini game ---------- */
  function buildDilemmaCard() {
    var host = document.getElementById('mas-dilemma-host');
    if (!host) return;
    var card = document.createElement('div');
    card.className = 'masfun-card';
    card.innerHTML =
      '<h3>🎲 معمای زندانیان — خودت بازی کن</h3>' +
      '<p class="sub">Prisoner’s Dilemma · جلسهٔ ۱ — تو زندانی A هستی؛ ربات، زندانی B</p>' +
      '<table class="payoff"><thead><tr><th>سال‌های زندان (A، B)</th><th>B سکوت می‌کند</th><th>B اعتراف می‌کند</th></tr></thead><tbody>' +
      '<tr><th>A سکوت می‌کند</th><td class="hl">(۱-، ۱-)</td><td>(۲۰-، ۰)</td></tr>' +
      '<tr><th>A اعتراف می‌کند</th><td>(۰، ۲۰-)</td><td class="hl">(۵-، ۵-)</td></tr>' +
      '</tbody></table>' +
      '<div class="btnrow"><button class="masfun-btn" data-move="s">🤫 سکوت</button><button class="masfun-btn bad" data-move="c">🗣️ اعتراف</button></div>' +
      '<div class="masfun-result" aria-live="polite"></div>';
    host.appendChild(card);
    var out = card.querySelector('.masfun-result');
    card.querySelectorAll('[data-move]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var me = btn.getAttribute('data-move');
        var bot = Math.random() < 0.75 ? 'c' : 's'; /* عقلانیت فردی ربات: غالباً اعتراف */
        var txt, yrs;
        if (me === 'c' && bot === 'c') { txt = 'هر دو اعتراف کردید: تعادل نش! هر کدام ۵ سال. 🤝🥲'; yrs = 5; }
        else if (me === 's' && bot === 's') { txt = 'هر دو سکوت کردید: بهینهٔ پارتو! هر کدام فقط ۱ سال. آزادی نزدیک است! 🎉'; yrs = 1; }
        else if (me === 'c') { txt = 'تو اعتراف کردی و آزاد شدی؛ ربات ۲۰ سال گرفت. اما دفعهٔ بعد جبران می‌کند… 😬'; yrs = 0; }
        else { txt = 'تو سکوت کردی و ۲۰ سال گرفتی؛ ربات آزاد شد. عقلانیت جمعی سخت است! 🥺'; yrs = 20; }
        out.innerHTML = '<b>نتیجه:</b> ' + txt + ' <span class="mono" dir="ltr">(' + yrs + ' سال برای تو)</span>';
      });
    });
  }

  /* ---------- herding playground ---------- */
  var FA_D = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  function fa(n) { return String(n).replace(/\d/g, function (d) { return FA_D[d]; }); }

  var audioCtx = null, muted = false;
  function beep(freq, dur, type, vol, delay) {
    if (muted) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (!audioCtx) return;
      var t = audioCtx.currentTime + (delay || 0);
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol || 0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + dur + 0.02);
    } catch (e) { /* صدا اختیاری است */ }
  }

  function buildHerdGame() {
    var host = document.getElementById('mas-herd-host');
    if (!host) return;
    var wrap = document.createElement('div');
    wrap.className = 'masfun-card';
    wrap.innerHTML =
      '<h3>🐄 گله را به آغل برسان!</h3>' +
      '<p class="sub">Herding Benchmark · جلسهٔ ۳ — نشانگر را پشت گله ببر تا از تو فرار کنند؛ کلیک = سوت برای جمع‌کردن گله 📯</p>' +
      '<div id="herdgame">' +
      '<div class="hud"><span>در آغل: <b id="herdscore">۰</b>/۱۴</span><span id="herdtime">⏱ ۰ ثانیه</span><span class="hint">کلیک = سوت 📯</span>' +
      '<button id="herdreset" type="button">شروع دوباره</button><button id="herdsound" type="button">🔊</button></div>' +
      '</div>';
    host.appendChild(wrap);

    var field = wrap.querySelector('#herdgame');
    var scoreEl = wrap.querySelector('#herdscore');
    var timeEl = wrap.querySelector('#herdtime');
    var resetBtn = wrap.querySelector('#herdreset');
    var soundBtn = wrap.querySelector('#herdsound');

    var TOTAL = 14;
    var W = 0, H = 320;
    var pen = { x: 0, y: 0, w: 92, h: 76 };
    var penEl = document.createElement('div');
    penEl.className = 'pen';
    field.appendChild(penEl);

    var cows = [], bots = [];
    var mouse = { x: -9999, y: -9999, on: false };
    var whistle = { x: 0, y: 0, until: 0 };
    var started = false, startTime = 0, won = false;

    function insidePen(cw) {
      return cw.x > pen.x + 8 && cw.x < pen.x + pen.w - 8 && cw.y > pen.y + 10 && cw.y < pen.y + pen.h - 6;
    }

    function layout() {
      W = field.clientWidth || 520;
      pen.x = W - 116; pen.y = H - 98;
      penEl.style.cssText = 'left:' + pen.x + 'px;top:' + pen.y + 'px;width:' + pen.w + 'px;height:' + pen.h + 'px';
    }

    function spawnCows() {
      layout();
      cows.forEach(function (c) { if (c.el.parentNode) c.el.parentNode.removeChild(c.el); });
      cows = [];
      for (var i = 0; i < TOTAL; i++) {
        var el = document.createElement('div');
        el.className = 'cow';
        field.appendChild(el);
        cows.push({ el: el, x: 20 + Math.random() * (W * 0.55), y: 22 + Math.random() * (H - 50), vx: 0, vy: 0, in: false, angle: Math.random() * 6.28 });
      }
      bots.forEach(function (b) { if (b.el.parentNode) b.el.parentNode.removeChild(b.el); });
      bots = [];
      for (var bi = 0; bi < 2; bi++) {
        var rel = document.createElement('div');
        rel.className = 'rob';
        rel.textContent = '🤖';
        field.appendChild(rel);
        bots.push({ el: rel, x: W * 0.45 + bi * 60, y: H * 0.32 + bi * 30, vx: 0, vy: 0 });
      }
      field.querySelectorAll('.spark').forEach(function (s) { s.parentNode.removeChild(s); });
      started = false; won = false;
      scoreEl.textContent = '۰';
      timeEl.textContent = '⏱ ۰ ثانیه';
    }
    spawnCows();

    resetBtn.addEventListener('click', function () { spawnCows(); });
    soundBtn.addEventListener('click', function () {
      muted = !muted;
      soundBtn.textContent = muted ? '🔇' : '🔊';
    });

    field.addEventListener('pointermove', function (e) {
      var rect = field.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; mouse.on = true;
      if (!started) { started = true; startTime = performance.now(); }
    });
    field.addEventListener('pointerleave', function () { mouse.on = false; });
    field.addEventListener('pointerdown', function (e) {
      if (e.target.closest && e.target.closest('button')) return;
      var rect = field.getBoundingClientRect();
      var wx = e.clientX - rect.left, wy = e.clientY - rect.top;
      if (wx < 0 || wx > W || wy < 0 || wy > H) return;
      whistle.x = wx; whistle.y = wy; whistle.until = performance.now() + 900;
      beep(880, 0.1, 'sine', 0.05);
      beep(1175, 0.12, 'sine', 0.04, 0.09);
      var ring = document.createElement('div');
      ring.className = 'whistle';
      ring.style.left = wx + 'px'; ring.style.top = wy + 'px';
      field.appendChild(ring);
      setTimeout(function () { if (ring.parentNode) ring.parentNode.removeChild(ring); }, 750);
      if (!started) { started = true; startTime = performance.now(); }
    });
    window.addEventListener('resize', function () {
      var oldW = W;
      layout();
      if (Math.abs(oldW - W) > 40) {
        cows.forEach(function (cw) {
          cw.x = Math.min(cw.x, W - 8);
          cw.y = Math.min(cw.y, H - 8);
        });
      }
    });

    function tick(ts) {
      var nowIn = 0;
      cows.forEach(function (cw) {
        if (cw.in) {
          /* در آغل: آرام می‌چرد و دیگر فرار نمی‌کند */
          cw.angle += (Math.random() - 0.5) * 0.3;
          cw.x += Math.cos(cw.angle) * 0.4;
          cw.y += Math.sin(cw.angle) * 0.4;
          cw.x = Math.max(pen.x + 10, Math.min(pen.x + pen.w - 10, cw.x));
          cw.y = Math.max(pen.y + 12, Math.min(pen.y + pen.h - 8, cw.y));
          cw.el.style.left = cw.x + 'px';
          cw.el.style.top = cw.y + 'px';
          nowIn++;
          return;
        }
        var fx = 0, fy = 0;
        /* گریز از نشانگر (سگ گله) */
        if (mouse.on) {
          var dx = cw.x - mouse.x, dy = cw.y - mouse.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120 && d2 > 1) {
            var d = Math.sqrt(d2);
            var f = (1 - d / 120) * 3.8;
            fx += (dx / d) * f; fy += (dy / d) * f;
          }
        }
        /* جذب به سوت */
        if (ts < whistle.until) {
          var wx = whistle.x - cw.x, wy = whistle.y - cw.y;
          var wd = Math.sqrt(wx * wx + wy * wy) || 1;
          if (wd > 14) { fx += (wx / wd) * 2.4; fy += (wy / wd) * 2.4; }
        }
        /* بویید: انسجام قوی + جدایی + هم‌راستایی تا گله یکپارچه بماند */
        var cx = 0, cy = 0, n = 0, sx = 0, sy = 0, ax = 0, ay = 0, an = 0;
        cows.forEach(function (o) {
          if (o === cw || o.in) return;
          cx += o.x; cy += o.y; n++;
          var dx = cw.x - o.x, dy = cw.y - o.y, d2 = dx * dx + dy * dy;
          if (d2 < 676 && d2 > 1) { var d = Math.sqrt(d2); sx += dx / d; sy += dy / d; }
          if (d2 < 4000) { ax += o.vx; ay += o.vy; an++; }
        });
        if (n) { fx += ((cx / n) - cw.x) * 0.045; fy += ((cy / n) - cw.y) * 0.045; }
        fx += sx * 0.8;
        if (an) { fx += (ax / an - cw.vx) * 0.05; fy += (ay / an - cw.vy) * 0.05; }
        cw.vx += fx * 0.3; cw.vy += fy * 0.3;
        cw.vx *= 0.86; cw.vy *= 0.86;
        var sp = Math.sqrt(cw.vx * cw.vx + cw.vy * cw.vy);
        if (sp > 3.4) { cw.vx = cw.vx / sp * 3.4; cw.vy = cw.vy / sp * 3.4; }
        cw.x += cw.vx; cw.y += cw.vy;
        if (cw.x < 8) { cw.x = 8; cw.vx = Math.abs(cw.vx) * 0.45; }
        if (cw.x > W - 8) { cw.x = W - 8; cw.vx = -Math.abs(cw.vx) * 0.45; }
        if (cw.y < 8) { cw.y = 8; cw.vy = Math.abs(cw.vy) * 0.45; }
        if (cw.y > H - 8) { cw.y = H - 8; cw.vy = -Math.abs(cw.vy) * 0.45; }
        if (insidePen(cw)) {
          cw.in = true;
          cw.x = Math.max(pen.x + 10, Math.min(pen.x + pen.w - 10, cw.x));
          cw.y = Math.max(pen.y + 12, Math.min(pen.y + pen.h - 8, cw.y));
          beep(520, 0.09, 'triangle', 0.06);
          nowIn++;
        }
        cw.el.style.left = cw.x + 'px';
        cw.el.style.top = cw.y + 'px';
        cw.el.style.opacity = cw.in ? '0.9' : '1';
      });

      /* چوپان‌ها فقط نزدیک آغل کمک می‌کنند؛ کار اصلی با کاربر است */
      bots.forEach(function (b, bi) {
        var tx = W * 0.5 + (bi ? 90 : -90), ty = H * 0.35;
        var best = null, bd = 1e9;
        cows.forEach(function (cw) {
          if (cw.in) return;
          var dcx = cw.x - (pen.x + pen.w / 2), dcy = cw.y - (pen.y + pen.h / 2);
          var dist = Math.sqrt(dcx * dcx + dcy * dcy);
          if (dist < 150 && dist < bd) { bd = dist; best = cw; }
        });
        if (best) {
          var ang = Math.atan2(best.y - pen.y - pen.h / 2, best.x - pen.x - pen.w / 2);
          tx = best.x + Math.cos(ang) * 42; ty = best.y + Math.sin(ang) * 42;
        }
        b.vx += (tx - b.x) * 0.035; b.vy += (ty - b.y) * 0.035;
        b.vx *= 0.88; b.vy *= 0.88;
        b.x = Math.max(8, Math.min(W - 8, b.x + b.vx));
        b.y = Math.max(8, Math.min(H - 8, b.y + b.vy));
        b.el.style.left = b.x + 'px';
        b.el.style.top = b.y + 'px';
      });

      if (started && !won) {
        timeEl.textContent = '⏱ ' + fa(Math.floor((ts - startTime) / 1000)) + ' ثانیه';
      }
      scoreEl.textContent = fa(nowIn);
      if (nowIn === TOTAL && !won) {
        won = true;
        timeEl.textContent = '⏱ ' + fa(Math.floor((ts - startTime) / 1000)) + ' ثانیه 🏆';
        beep(523, 0.12, 'triangle', 0.07);
        beep(659, 0.12, 'triangle', 0.07, 0.13);
        beep(784, 0.2, 'triangle', 0.08, 0.26);
        for (var si = 0; si < 4; si++) {
          var spEl = document.createElement('div');
          spEl.className = 'spark';
          spEl.textContent = '✨';
          spEl.style.left = (pen.x + 14 + si * 22) + 'px';
          spEl.style.top = (pen.y + 18 + (si % 2) * 26) + 'px';
          spEl.style.animationDelay = (si * 0.2) + 's';
          field.appendChild(spEl);
        }
        say('همهٔ گاوها در آغل! تو یک سیستم چندعاملهٔ واقعی هستی 🏆', 5000);
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- dice ---------- */
  function bindDice() {
    document.querySelectorAll('.masdice').forEach(function (d) {
      if (d.dataset.bound) return;
      d.dataset.bound = '1';
      d.setAttribute('role', 'button');
      d.setAttribute('tabindex', '0');
      d.setAttribute('aria-label', 'تاس بازی — بغلتان');
      var faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
      function roll() {
        d.classList.remove('roll');
        void d.offsetWidth;
        d.classList.add('roll');
        var n = Math.floor(Math.random() * 6);
        d.textContent = faces[n];
        if (n === 5) say('شیش آوردی! سودمندی انتظاری‌ات بالا رفت 🎲', 2800);
      }
      d.addEventListener('click', roll);
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); roll(); } });
    });
  }

  /* ---------- easter egg: type "mas" ---------- */
  var buf = '';
  document.addEventListener('keydown', function (e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    buf = (buf + (e.key || '')).toLowerCase().slice(-3);
    if (buf === 'mas') {
      buf = '';
      parade();
    }
  });

  function parade() {
    if (document.getElementById('masparade')) return;
    var p = document.createElement('div');
    p.id = 'masparade';
    var glyphs = ['🤖', '🤖', '🤖', '🤖', '🤖', '🤖', '🤖'];
    var html = '<div class="msg">سیستم چندعامله فعال شد: همهٔ ربات‌ها در حال حرکت‌اند! 🤖</div>';
    glyphs.forEach(function (g, i) {
      html += '<div class="parader" style="left:0;animation-delay:' + (i * 0.5) + 's;font-size:' + (26 + (i % 3) * 6) + 'px;bottom:' + (8 + (i % 4) * 18) + 'px">' + g + '</div>';
    });
    p.innerHTML = html;
    document.body.appendChild(p);
    var old = document.title;
    document.title = '🤖 همهٔ عامل‌ها فعال شدند!';
    setTimeout(function () {
      if (p.parentNode) p.parentNode.removeChild(p);
      document.title = old;
    }, 8000);
  }

  /* ---------- init ---------- */
  function init() {
    buildDilemmaCard();
    buildHerdGame();
    bindDice();
    setTimeout(function () { say('سلام! من عاملک هستم 🤖 کلیک کن تا برایت حرف بزنم', 5200); }, 2200);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
