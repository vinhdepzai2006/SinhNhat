/* ==========================================================
   script.js – Happy Birthday Hà Tâm  ❤️
   ========================================================== */

/* ──────────────────────────────────────────────────────────
   CẤU HÌNH – chỉ sửa phần này
   ────────────────────────────────────────────────────────── */
const CONFIG = {

  // 🎵 NHẠC: khai báo trong index.html (thẻ <audio>)

  // 🎂 ẢNH BÁNH: để trống = dùng placeholder emoji
  cakeImg: '',

  // =========================================================
  // 📸 ẢNH XẾP THÀNH TRÁI TIM
  // =========================================================
  photos: [
    'Anh/cpm35 2026-02-10 095249AE25E76F5CE1.jpg',
    'Anh/IMG_9912.jpg',
    'Anh/IMG_0658.jpg',
    'Anh/IMG_0800.jpg',
    'Anh/IMG_0804.jpg',
    'Anh/IMG_0809.jpg',
    'Anh/IMG_0823.jpg',
    'Anh/IMG_1014.jpg',
    'Anh/IMG_1430.jpg',
    'Anh/IMG_1578.jpg',
    'Anh/IMG_1590.jpg',
    'Anh/IMG_2360.jpg',
    'Anh/IMG_3350.jpg',
    'Anh/IMG_4878.jpg',
    'Anh/IMG_7259.jpg',
    'Anh/IMG_7631.jpg',
    'Anh/IMG_7769.jpg',
    'Anh/IMG_8480.jpg',
    'Anh/instc 2025-10-21 183220.123.jpg',
    'Anh/IMG_1518.PNG',
    'Anh/IMG_1524.PNG',
    'Anh/IMG_1525.PNG',
    'Anh/IMG_1526.PNG',
    'Anh/IMG_1527.PNG',
    'Anh/IMG_1528.PNG',
    'Anh/IMG_1530.PNG',
    'Anh/IMG_1531.PNG',
    'Anh/IMG_1532.PNG',
    'Anh/IMG_1649.PNG',
    'Anh/IMG_1926.jpg',
    'Anh/IMG_2360.jpg',
    'Anh/IMG_2892.jpg',
    'Anh/IMG_3350.jpg',
    'Anh/IMG_3351.jpg',
    'Anh/IMG_3459.jpg',
    'Anh/IMG_3686.jpg',
    'Anh/IMG_3767.jpg',
    'Anh/IMG_3937.jpg',
    'Anh/IMG_4136.jpg',
    'Anh/IMG_4574.jpg',
    'Anh/IMG_4878.jpg',
    'Anh/IMG_5218.jpg',
    'Anh/IMG_6176.jpg',
    'Anh/IMG_6547.jpg',
    'Anh/IMG_6711.jpg',
    'Anh/IMG_7193.jpg',
    'Anh/IMG_7259.jpg',
    'Anh/IMG_7631.jpg',
    'Anh/IMG_7769.jpg',
    'Anh/IMG_7907.jpg',
    'Anh/IMG_8480.jpg',
    'Anh/IMG_8808.jpg',
    'Anh/IMG_9323.jpg',
    'Anh/IMG_9398.jpg',
    'Anh/IMG_9903.jpg',
    'Anh/IMG_9912.jpg',
    'Anh/IMG_9939.jpg',
    'Anh/IMG_9985.jpg',
    'Anh/instc 2024-01-16 001629.011.jpg',
    'Anh/instc 2024-01-16 001721.202.jpg',
    'Anh/instc 2025-10-21 183220.123.jpg',
    'Anh/quality_restoration_20251007233630069.JPEG',
    'Anh/temp_image_458E1221-73EB-4BF0-BFF7-C56A0377142E.JPEG',
    // 👇 THÊM LINK ẢNH MỚI VÀO ĐÂY:
    // 'Anh/IMG_xxxx.jpg',
  ],
};

/* ==========================================================
   App – điều phối các phase
   ========================================================== */
const App = (() => {
  /**
   * Chuyển màn hình mượt mà: fade-out → swap → fade-in
   * duration: ms của mỗi pha (default 600ms)
   */
  function switchScreen(hideId, showId, cb, duration = 600) {
    const hide = document.getElementById(hideId);
    const show = document.getElementById(showId);

    // Fade out màn đang hiện
    hide.style.transition = `opacity ${duration}ms ease`;
    hide.style.opacity = '0';
    hide.style.pointerEvents = 'none';

    setTimeout(() => {
      hide.classList.remove('active');
      hide.style.cssText = ''; // reset inline styles

      // Hiện màn mới
      show.style.opacity = '0';
      show.style.transition = 'none';
      show.classList.add('active');

      // Kích hoạt reflow rồi fade-in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          show.style.transition = `opacity ${duration}ms ease`;
          show.style.opacity = '1';
          if (cb) cb();
        });
      });
    }, duration + 50);
  }

  function goHeart() {
    const btn = document.getElementById('heartBtn');
    const r = btn.getBoundingClientRect();
    Particles.burst(r.left + r.width / 2, r.top + r.height / 2);
    Particles.rain();
    setTimeout(() => {
      switchScreen('cake-screen', 'heart-screen', () => {
        HeartPhase.build();
        HeartPhase.sparkles();
      });
    }, 350);
  }

  return { switchScreen, goHeart };
})();

/* ==========================================================
   GiftPhase – màn hình hộp quà (màn hình đầu tiên)
   ========================================================== */
const GiftPhase = (() => {
  let _opened = false;

  // Tạo bong bóng bay lên
  function spawnBalloons() {
    const wrap = document.getElementById('balloonWrap');
    const emojis = ['🎈','🎀','🎊','🎁','💝','🌸','✨','🎉'];

    function spawnOne() {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      b.style.cssText = [
        `left:${Math.random() * 100}%`,
        `animation-duration:${4 + Math.random() * 4}s`,
        `animation-delay:${Math.random() * 2}s`,
        `font-size:${clamp(22, Math.random() * 30 + 22, 50)}px`,
      ].join(';');
      wrap.appendChild(b);
      setTimeout(() => b.remove(), 9000);
    }

    // Spawn ngay một lứa đầu
    for (let i = 0; i < 12; i++) {
      setTimeout(spawnOne, Math.random() * 2000);
    }
    // Tiếp tục spawn theo interval
    return setInterval(spawnOne, 700);
  }

  // Tạo pháo giấy rơi nền
  function spawnBgConfetti() {
    const wrap = document.getElementById('confettiWrap');
    const cols = ['#fff','#ffe0f0','#ffd6e8','#ffaacc','#ff69b4','#fff59d','#b3e5fc','#c8e6c9'];

    for (let i = 0; i < 40; i++) {
      const c = document.createElement('div');
      c.className = 'bg-conf';
      c.style.cssText = [
        `left:${Math.random() * 100}%`,
        `background:${cols[Math.floor(Math.random() * cols.length)]}`,
        `animation-duration:${3 + Math.random() * 4}s`,
        `animation-delay:${Math.random() * 4}s`,
        `width:${5 + Math.random() * 7}px`,
        `height:${5 + Math.random() * 7}px`,
        `border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`,
      ].join(';');
      wrap.appendChild(c);
    }
  }

  function clamp(min, val, max) {
    return Math.min(max, Math.max(min, val));
  }

  // Hiệu ứng khi ấn hộp quà: nổ pháo rồi chuyển màn
  function open() {
    if (_opened) return;
    _opened = true;

    const wrap = document.getElementById('giftBoxWrap');
    const label = document.getElementById('giftLabel');
    const title = document.getElementById('giftTitle');

    // Animate hộp quà khi ấn: bounce nhỏ → nổ ra
    wrap.style.transition = 'transform 0.1s ease';
    wrap.style.transform = 'scale(0.88)';

    setTimeout(() => {
      wrap.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
      wrap.style.transform = 'scale(1.25)';

      // Pháo nổ từ tâm hộp quà
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      Particles.burst(cx, cy, 60);
      Particles.rain();

      setTimeout(() => {
        // Nhạc bật TRƯỚC khi chuyển màn (cần gesture của user)
        document.getElementById('bgMusic').play().catch(() => {});

        // Chuyển sang màn đếm số
        App.switchScreen('gift-screen', 'countdown-screen', () => {
          CountdownPhase.init();
          CountdownPhase.run();
        }, 700);
      }, 320);
    }, 120);
  }

  function init() {
    const balloonInterval = spawnBalloons();
    spawnBgConfetti();

    // Dọn interval khi rời màn
    const giftScreen = document.getElementById('gift-screen');
    const observer = new MutationObserver(() => {
      if (!giftScreen.classList.contains('active')) {
        clearInterval(balloonInterval);
        observer.disconnect();
      }
    });
    observer.observe(giftScreen, { attributes: true, attributeFilter: ['class'] });
  }

  return { init, open };
})();

/* ==========================================================
   Matrix – chữ li ti rơi dọc (nền)
   ========================================================== */
const Matrix = (() => {
  const CHARS = 'HAPPYBIRTHDAYHATAM'.split('');
  const FS = 13;

  function createDrops(canvas) {
    const cols = Math.floor(canvas.width / FS);
    return Array.from({ length: cols }, () => Math.floor(Math.random() * -60));
  }

  function drawFrame(ctx, canvas, drops) {
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,0.07)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = FS + 'px monospace';
    const cols = Math.floor(W / FS);
    for (let i = 0; i < cols; i++) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      const y = drops[i] * FS;
      const g = ctx.createLinearGradient(0, y - FS * 10, 0, y);
      g.addColorStop(0, 'rgba(160,0,70,0)');
      g.addColorStop(0.7, '#aa2255');
      g.addColorStop(1, '#ff4d9e');
      ctx.fillStyle = g;
      ctx.fillText(ch, i * FS, y);
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  return { CHARS, FS, createDrops, drawFrame };
})();

/* ==========================================================
   PixelFont – vẽ text lớn bằng các ký tự nhỏ li ti CỐ ĐỊNH
   ========================================================== */
const PixelFont = (() => {

  const GLYPHS = {
    '0': [[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1]],
    '1': [[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
    '2': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
    '3': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1],[0,0,1,1,1],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,1]],
    'A': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    'B': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
    'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
    'H': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    'I': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
    'M': [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    'P': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],
    'R': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
    'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    'Y': [[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    'À': [[0,0,0,1,0],[0,1,0,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    'Â': [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    'Ă': [[0,1,0,1,0],[0,0,1,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    ' ': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
  };

  const FALLBACK = [[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1]];

  function makeRand(seed) {
    let s = (seed ^ 0xdeadbeef) >>> 0;
    if (s === 0) s = 1;
    return () => {
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
      return (s >>> 0) / 4294967296;
    };
  }

  const _cache = {};

  function precompute(char, cell, miniChars) {
    const ck  = Math.round(cell);
    const key = char + '|' + ck;
    if (_cache[key]) return _cache[key];

    const map = GLYPHS[char.toUpperCase()] || FALLBACK;

    let seedVal = 0;
    for (let i = 0; i < char.length; i++) {
      seedVal += char.charCodeAt(i) * (i + 3) * 17;
    }
    seedVal += ck * 1009;
    const rand = makeRand(seedVal);

    const dotRadius = cell * 0.42;
    const grid = Array.from({ length: 7 }, (_, r) =>
      Array.from({ length: 5 }, (_, c) => {
        if (!map[r][c]) return [];
        const cx = cell * 0.5;
        const cy = cell * 0.5;
        const items = [
          { cx, cy, dotR: dotRadius, bright: true },
        ];
        const mini = Math.floor(rand() * 2) + 1;
        for (let m = 0; m < mini; m++) {
          const angle = rand() * Math.PI * 2;
          const dist  = dotRadius * (0.55 + rand() * 0.55);
          items.push({
            cx: cx + Math.cos(angle) * dist,
            cy: cy + Math.sin(angle) * dist,
            dotR: dotRadius * (0.32 + rand() * 0.28),
            bright: rand() > 0.5,
          });
        }
        return items;
      })
    );

    const result = { grid };
    _cache[key] = result;
    return result;
  }

  function measureText(text, cell, gap) {
    return text.length * (5 * cell + gap) - gap;
  }

  function drawChar(ctx, char, ox, oy, cell, alpha, miniChars) {
    if (alpha <= 0) return;
    const { grid } = precompute(char, cell, miniChars);
    ctx.save();

    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        const items = grid[r][c];
        if (!items.length) continue;
        const bx = ox + c * cell;
        const by = oy + r * cell;

        for (const { cx, cy, dotR, bright } of items) {
          const px = bx + cx;
          const py = by + cy;

          const glow = ctx.createRadialGradient(px, py, 0, px, py, dotR * 3.2);
          glow.addColorStop(0,   `rgba(255, 100, 180, ${alpha * (bright ? 0.75 : 0.4)})`);
          glow.addColorStop(1,   `rgba(255, 20, 147, 0)`);
          ctx.fillStyle   = glow;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(px, py, dotR * 3.2, 0, Math.PI * 2);
          ctx.fill();

          const grad = ctx.createRadialGradient(
            px - dotR * 0.25, py - dotR * 0.25, dotR * 0.05,
            px, py, dotR
          );
          grad.addColorStop(0,   bright ? '#ffffff' : '#ffe0f0');
          grad.addColorStop(0.25, bright ? '#ffddee' : '#ffb3d1');
          grad.addColorStop(0.7, bright ? '#ff4daa' : '#ff69b4');
          grad.addColorStop(1,   bright ? '#ff1493' : '#cc0066');

          ctx.fillStyle   = grad;
          ctx.globalAlpha = alpha * (bright ? 1 : 0.82);
          ctx.beginPath();
          ctx.arc(px, py, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  return { measureText, drawChar };
})();

/* ==========================================================
   CountdownPhase – đếm ngược 3 → 2 → 1
   ========================================================== */
const CountdownPhase = (() => {
  let canvas, ctx, drops, raf;
  let digit = '3';
  let alpha = 0;
  let _inited = false;

  function init() {
    if (_inited) return;
    _inited = true;
    canvas = document.getElementById('matrixCanvas');
    ctx    = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(loop);
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drops = Matrix.createDrops(canvas);
  }

  function loop() {
    Matrix.drawFrame(ctx, canvas, drops);
    drawDigit();
    raf = requestAnimationFrame(loop);
  }

  function drawDigit() {
    if (alpha <= 0) return;
    const W = canvas.width, H = canvas.height;

    const textCanvas = document.createElement('canvas');
    const tctx = textCanvas.getContext('2d');
    textCanvas.width  = W;
    textCanvas.height = H;

    const textScale = (digit.length === 1)
      ? Math.min(W * 0.55, H * 0.55)
      : Math.min(W * 0.35, H * 0.28);
    tctx.clearRect(0, 0, W, H);
    tctx.fillStyle = 'white';
    tctx.font = `bold ${textScale}px Arial`;
    tctx.textAlign = 'center';
    tctx.textBaseline = 'middle';
    tctx.fillText(digit, W / 2, H / 2);

    const imgData = tctx.getImageData(0, 0, W, H).data;
    const gap  = W < 480 ? 6 : 8;
    const dotR = W < 480 ? 2 : 3;

    for (let y = 0; y < H; y += gap) {
      for (let x = 0; x < W; x += gap) {
        const index = (y * W + x) * 4;
        if (imgData[index + 3] > 128) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, dotR * 3);
          glow.addColorStop(0, `rgba(255,100,180,${alpha * 0.6})`);
          glow.addColorStop(1, 'rgba(255,20,147,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, dotR * 3, 0, Math.PI * 2);
          ctx.fill();

          const grad = ctx.createRadialGradient(x - 1, y - 1, 0.5, x, y, dotR);
          grad.addColorStop(0,   '#ffffff');
          grad.addColorStop(0.3, '#ffddee');
          grad.addColorStop(0.7, '#ff4daa');
          grad.addColorStop(1,   '#ff1493');
          ctx.fillStyle   = grad;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function animIn(cb) {
    alpha = 0;
    const t0  = performance.now(), dur = 500;
    (function step(now) {
      const p = Math.min(1, (now - t0) / dur);
      alpha = p * p;
      if (p < 1) requestAnimationFrame(step);
      else { alpha = 1; cb && cb(); }
    })(t0);
  }

  function animOut(cb) {
    const t0 = performance.now(), dur = 380;
    const a0 = alpha;
    (function step(now) {
      const p = Math.min(1, (now - t0) / dur);
      alpha = a0 * (1 - p);
      if (p < 1) requestAnimationFrame(step);
      else { alpha = 0; cb && cb(); }
    })(t0);
  }

  function run() {
    digit = '3';
    animIn(() => setTimeout(() => animOut(() => {
      digit = '2';
      animIn(() => setTimeout(() => animOut(() => {
        digit = '1';
        animIn(() => setTimeout(() => animOut(() => {
          cancelAnimationFrame(raf);
          window.removeEventListener('resize', resize);
          TextPhase.start();
        }), 950));
      }), 950));
    }), 950));
  }

  return { init, run };
})();

/* ==========================================================
   TextPhase – hiện HAPPY / BIRTHDAY / HÀ TÂM từng chữ
   ========================================================== */
const TextPhase = (() => {
  const WORDS      = ['HAPPY', 'BIRTHDAY', 'HÀ TÂM'];
  const CANVAS_IDS = ['wordCanvas1', 'wordCanvas2', 'wordCanvas3'];
  let bgCanvas, bgCtx, bgDrops, bgRaf;

  const wordStates = [[], [], []];
  const wordRafs   = [null, null, null];

  function start() {
    App.switchScreen('countdown-screen', 'text-screen', () => {
      initBg();
      initAllWords();
      // Nhạc đã bật ở GiftPhase.open(), chỉ resume nếu cần
      const music = document.getElementById('bgMusic');
      if (music.paused) music.play().catch(() => {});
      scheduleWordDrops();
    }, 700);
  }

  function initBg() {
    bgCanvas = document.getElementById('textCanvas');
    bgCtx    = bgCanvas.getContext('2d');
    bgCanvas.width  = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    bgDrops  = Matrix.createDrops(bgCanvas);
    (function loop() {
      Matrix.drawFrame(bgCtx, bgCanvas, bgDrops);
      bgRaf = requestAnimationFrame(loop);
    })();
  }

  function initAllWords() {
    WORDS.forEach((word, wi) => {
      const cvs  = document.getElementById(CANVAS_IDS[wi]);
      const rowH = Math.floor(window.innerHeight / 3);
      const chars = [...word];
      const nonSpaceCount = chars.filter(c => c !== ' ').length;

      const cell = Math.max(
        Math.min(
          Math.floor(rowH * 0.55 / 7),
          Math.floor(window.innerWidth * 0.88 / (nonSpaceCount * 5.6))
        ),
        window.innerWidth < 400 ? 5 : 7
      );
      const gap  = Math.floor(cell * 0.6);

      let totalW = 0;
      chars.forEach(ch => {
        totalW += (ch === ' ' ? 3 * cell : 5 * cell) + gap;
      });
      totalW -= gap;
      const totalH = 7 * cell;

      cvs.width  = Math.min(totalW + cell * 2, window.innerWidth - 20);
      cvs.height = totalH + cell * 2;
      cvs.style.width  = cvs.width  + 'px';
      cvs.style.height = cvs.height + 'px';

      wordStates[wi] = chars.map(() => ({ alpha: 0, target: 0 }));
      startWordLoop(wi, word, cell, gap, cvs);
    });
  }

  function startWordLoop(wi, word, cell, gap, cvs) {
    const ctx   = cvs.getContext('2d');
    const W     = cvs.width;
    const H     = cvs.height;

    const tCvs  = document.createElement('canvas');
    const tCtx  = tCvs.getContext('2d');
    tCvs.width  = W;
    tCvs.height = H;

    const fontSize = Math.floor(H * 0.72);
    const dotGap   = W < 480 ? 5 : 6;

    tCtx.clearRect(0, 0, W, H);
    tCtx.fillStyle = 'white';
    tCtx.font = `bold ${fontSize}px Arial`;
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText(word, W / 2, H / 2);
    const imgData = tCtx.getImageData(0, 0, W, H).data;

    const chars = [...word];

    (function loop() {
      ctx.clearRect(0, 0, W, H);

      wordStates[wi].forEach(s => {
        s.alpha += (s.target - s.alpha) * 0.08;
      });

      const avgAlpha = wordStates[wi].reduce((s, c) => s + c.alpha, 0) / wordStates[wi].length;
      if (avgAlpha > 0.005) {
        for (let y = 0; y < H; y += dotGap) {
          for (let x = 0; x < W; x += dotGap) {
            const idx = (y * W + x) * 4;
            if (imgData[idx + 3] > 128) {
              const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
              glow.addColorStop(0, `rgba(255,100,180,${avgAlpha * 0.55})`);
              glow.addColorStop(1, 'rgba(255,20,147,0)');
              ctx.fillStyle = glow;
              ctx.beginPath();
              ctx.arc(x, y, 8, 0, Math.PI * 2);
              ctx.fill();

              const grad = ctx.createRadialGradient(x - 1, y - 1, 0.3, x, y, 2.5);
              grad.addColorStop(0,   '#ffffff');
              grad.addColorStop(0.3, '#ffddee');
              grad.addColorStop(0.7, '#ff4daa');
              grad.addColorStop(1,   '#ff1493');
              ctx.fillStyle   = grad;
              ctx.globalAlpha = avgAlpha;
              ctx.beginPath();
              ctx.arc(x, y, 2.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      wordRafs[wi] = requestAnimationFrame(loop);
    })();
  }

  function scheduleWordDrops() {
    let globalDelay = 300;

    WORDS.forEach((word, wi) => {
      [...word].forEach((ch, ci) => {
        const delay = globalDelay + ci * 160;
        setTimeout(() => {
          if (wordStates[wi][ci]) wordStates[wi][ci].target = 1;
        }, delay);
      });
      globalDelay += [...word].length * 160 + 500;
    });

    const totalDelay = globalDelay + 1200;
    setTimeout(() => {
      wordRafs.forEach(r => cancelAnimationFrame(r));
      cancelAnimationFrame(bgRaf);
      CakePhase.start();
    }, totalDelay);
  }

  return { start };
})();

/* ==========================================================
   CakePhase – màn hình bánh sinh nhật
   ========================================================== */
const CakePhase = (() => {
  function start() {
    App.switchScreen('text-screen', 'cake-screen', () => {
      const ci = document.getElementById('cakeImg');
      if (CONFIG.cakeImg) ci.src = CONFIG.cakeImg;
      ci.onerror = () => {
        ci.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='380' height='300'%3E%3Crect width='380' height='300' fill='%23ffb3d1' rx='18'/%3E%3Ctext x='190' y='150' font-size='90' text-anchor='middle' dominant-baseline='middle'%3E%F0%9F%8E%82%3C/text%3E%3Ctext x='190' y='255' font-size='18' text-anchor='middle' fill='%23c71585' font-family='sans-serif' font-weight='bold'%3EChúc mừng sinh nhật Hà Tâm%3C/text%3E%3C/svg%3E";
      };

      const sb = document.getElementById('spBg');
      for (let i = 0; i < 55; i++) {
        const s = document.createElement('div');
        s.className = 'sp';
        s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${3+Math.random()*8}px;height:${3+Math.random()*8}px;animation-delay:${Math.random()*2.5}s;`;
        sb.appendChild(s);
      }

      const fh = document.getElementById('fhWrap');
      const em = ['💗','💓','💕','💖','🩷','💝'];
      function spawnHeart() {
        const h = document.createElement('div');
        h.className = 'fheart';
        h.textContent = em[Math.floor(Math.random() * em.length)];
        h.style.cssText = `left:${Math.random()*100}%;bottom:0;font-size:${13+Math.random()*18}px;animation-delay:${Math.random()*1.5}s;animation-duration:${3+Math.random()*3}s;`;
        fh.appendChild(h);
        setTimeout(() => h.remove(), 7000);
      }
      setInterval(spawnHeart, 650);
      spawnHeart();
    }, 700);
  }

  return { start };
})();

/* ==========================================================
   HeartPhase – ảnh xếp thành hình TRÁI TIM
   ========================================================== */
const HeartPhase = (() => {

  (function injectStyles() {
    const st = document.createElement('style');
    st.textContent = `
      @keyframes hpFloat {
        0%,100% { transform: rotate(var(--hp-rot)) translateY(0px) scale(1); }
        50%      { transform: rotate(var(--hp-rot)) translateY(-5px) scale(1.03); }
      }
      @keyframes hpPulse {
        0%,100% { box-shadow: 0 4px 14px rgba(255,20,147,0.45); }
        50%      { box-shadow: 0 4px 28px rgba(255,20,147,0.9), 0 0 12px rgba(255,150,200,0.6); }
      }
      .hp-float {
        animation:
          hpFloat var(--hp-dur, 2.8s) ease-in-out var(--hp-dly, 0s) infinite,
          hpPulse  var(--hp-dur2,3.2s) ease-in-out var(--hp-dly2,0s) infinite !important;
      }
      #heart-caption {
        font-family: 'Nunito', sans-serif;
        font-weight: 900;
        font-size: clamp(14px,3.5vw,22px);
        color: #ff1493;
        text-shadow: 0 0 12px rgba(255,20,147,0.7), 2px 2px 0 #fff8;
        letter-spacing: 3px;
        margin-top: 12px;
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.8s ease, transform 0.8s ease;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
        position: relative;
      }
      #heart-caption.visible {
        opacity: 1;
        transform: translateY(0);
      }
      #heart-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 100vw;
        max-height: 100vh;
        overflow: hidden;
      }
    `;
    document.head.appendChild(st);
  })();

  function heartPt(t, cx, cy, r) {
    const x =  16 * Math.pow(Math.sin(t), 3);
    const y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
    return {
      x: cx + x / 17 * r,
      y: cy + y / 17 * r,
    };
  }

  function edgePt(vw, vh, destLeft, destTop, cellSize) {
    const side = Math.floor(Math.random() * 4);
    let ex, ey;
    switch (side) {
      case 0: ex = Math.random() * vw;  ey = -cellSize * 2;   break;
      case 1: ex = vw + cellSize * 2;   ey = Math.random() * vh; break;
      case 2: ex = Math.random() * vw;  ey = vh + cellSize * 2;  break;
      default:ex = -cellSize * 2;       ey = Math.random() * vh; break;
    }
    return {
      tx: ex - destLeft  - cellSize / 2,
      ty: ey - destTop   - cellSize / 2,
    };
  }

  function build() {
    const heartScreen = document.getElementById('heart-screen');
    const oldWrap = document.getElementById('heart-wrap');
    if (oldWrap) oldWrap.remove();

    const photos  = CONFIG.photos;
    const vw      = window.innerWidth;
    const vh      = window.innerHeight;

    const count = Math.max(20, Math.min(photos.length, 56));
    const kittyW = vw < 380 ? 0 : vw < 500 ? Math.floor(vw * 0.12) : 100;

    const cellByVw = Math.floor((vw - kittyW * 2) / 9);
    const cellByVh = Math.floor(vh / 9.5);
    const maxRadius = Math.min(
      (vw - kittyW * 2) * 0.44,
      vh * 0.40,
      vw < 480 ? 180 : 260
    );

    const approxCirc = 2 * Math.PI * maxRadius * 0.88;
    const cellByCount = Math.floor(approxCirc / count * 0.92);
    const cellSize = Math.max(
      Math.min(cellByCount, cellByVw, cellByVh, 88),
      vw < 380 ? 28 : vw < 480 ? 34 : 42
    );

    const wrap = document.createElement('div');
    wrap.id = 'heart-wrap';
    heartScreen.appendChild(wrap);

    const cont = document.createElement('div');
    cont.id = 'hc';
    cont.className = 'hc';

    const wrapW = maxRadius * 2.55;
    const wrapH = maxRadius * 2.3;
    const cx    = wrapW / 2;
    const cy    = wrapH / 2 - maxRadius * 0.04;

    cont.style.cssText = `position:relative;width:${wrapW}px;height:${wrapH}px;flex-shrink:0;`;
    wrap.appendChild(cont);

    const cap = document.createElement('div');
    cap.id = 'heart-caption';
    cap.textContent = '💗 Sinh nhật vui vẻ Hà Tâm 💗';
    wrap.appendChild(cap);

    const pts = Array.from({ length: count }, (_, i) => {
      const t = (i / count) * 2 * Math.PI - Math.PI / 2;
      return heartPt(t, cx, cy, maxRadius);
    });

    pts.forEach((pt, i) => {
      const destLeft = pt.x - cellSize / 2;
      const destTop  = pt.y - cellSize / 2;
      const rot = (Math.random() - 0.5) * 18;
      const { tx, ty } = edgePt(vw, vh, destLeft, destTop, cellSize);
      const initRot = (Math.random() - 0.5) * 540;

      const d = document.createElement('div');
      d.className = 'hp';

      d.style.cssText = [
        `left:${destLeft}px`,
        `top:${destTop}px`,
        `width:${cellSize}px`,
        `height:${cellSize}px`,
        `opacity:0`,
        `transform:translate(${tx}px,${ty}px) rotate(${initRot}deg) scale(0.35)`,
        `transition:none`,
        `--hp-rot:${rot}deg`,
        `--hp-dur:${2.2 + Math.random() * 1.6}s`,
        `--hp-dly:${(Math.random() * 2).toFixed(2)}s`,
        `--hp-dur2:${2.8 + Math.random() * 1.4}s`,
        `--hp-dly2:${(Math.random() * 2).toFixed(2)}s`,
        `will-change:transform,opacity`,
      ].join(';');

      if (i < photos.length) {
        const img = document.createElement('img');
        img.src = photos[i];
        img.alt = '';
        img.loading = 'eager';
        d.appendChild(img);
      } else {
        const colors = [
          'linear-gradient(135deg,#ff69b4,#ff1493)',
          'linear-gradient(135deg,#ffb3d1,#ff69b4)',
          'linear-gradient(135deg,#ff1493,#c71585)',
          'linear-gradient(135deg,#ffd6e8,#ffb3d1)',
        ];
        d.style.background = colors[i % colors.length];
        const em = document.createElement('div');
        em.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.6em;';
        em.textContent = ['💗','💓','💕','💖','🩷'][i % 5];
        d.appendChild(em);
      }
      cont.appendChild(d);

      const delay = 120 + i * 68 + Math.random() * 30;
      setTimeout(() => {
        d.style.transition = [
          'opacity 0.55s ease',
          'transform 0.85s cubic-bezier(0.34,1.45,0.64,1)',
        ].join(',');
        d.style.opacity   = '1';
        d.style.transform = `rotate(${rot}deg) scale(1)`;
        setTimeout(() => {
          d.style.transition = '';
          d.classList.add('hp-float');
        }, 920);
      }, delay);
    });

    const capDelay = 120 + count * 68 + 1100;
    setTimeout(() => cap.classList.add('visible'), capDelay);
  }

  function sparkles() {
    const sb2    = document.getElementById('spBg2');
    const colors = ['#fff','#ffb3d1','#ff69b4','#ffaacc','#ffd6e8'];
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('div');
      s.className = 'sp';
      s.style.cssText = [
        `left:${Math.random()*100}%`,
        `top:${Math.random()*100}%`,
        `width:${3+Math.random()*8}px`,
        `height:${3+Math.random()*8}px`,
        `animation-delay:${(Math.random()*3).toFixed(2)}s`,
        `background:${colors[Math.floor(Math.random()*colors.length)]}`,
      ].join(';');
      sb2.appendChild(s);
    }
  }

  return { build, sparkles };
})();

/* ==========================================================
   Particles – burst & confetti mưa
   ========================================================== */
const Particles = (() => {
  const COLS = ['#ff4d9e','#ff85c0','#fff','#ffb3d1','#ff1493','#ffaacc'];

  function burst(cx, cy, count = 36) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'part';
      const a = Math.random() * 2 * Math.PI;
      const d = 80 + Math.random() * 170;
      p.style.cssText = `left:${cx}px;top:${cy}px;width:${6+Math.random()*11}px;height:${6+Math.random()*11}px;background:${COLS[i%COLS.length]};--tx:${Math.cos(a)*d}px;--ty:${Math.sin(a)*d}px;animation-duration:${.5+Math.random()*.6}s;`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1300);
    }
  }

  function rain() {
    const rainCols = [...COLS, '#c71585','#ffd6e8','#fff59d'];
    for (let i = 0; i < 75; i++) {
      const c = document.createElement('div');
      c.className = 'conf';
      c.style.cssText = `left:${Math.random()*100}vw;top:-15px;background:${rainCols[i%rainCols.length]};transform:rotate(${Math.random()*360}deg);animation-delay:${Math.random()*.7}s;animation-duration:${2+Math.random()*2}s;border-radius:${Math.random()>.5?'50%':'2px'};width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  }

  return { burst, rain };
})();

/* ==========================================================
   KHỞI ĐỘNG
   ========================================================== */
window.addEventListener('load', () => {
  // Khởi động màn hộp quà (màn đầu tiên)
  GiftPhase.init();
});