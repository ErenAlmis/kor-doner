// Menü verisi: kurgusal Kor Döner menüsü (portföy çalışması).
const MENU = [
  { id: "doner", name: "Döner", items: [
    ["Drehspieß Tasche", "Pide ekmeğinde döner, salata ve Berliner sos", "7,00"],
    ["Drehspieß Tasche Jumbo", "Büyük boy: pide ekmeğinde döner, salata ve Berliner sos", "9,50"],
    ["Dürüm", "Lavaşta döner, salata ve Berliner sos", "8,00"],
    ["Döner Teller", "Döner, salata ve Berliner sos; yanında patates ya da pilav", "12,50"],
    ["Kor Teller", "Döner, patates kızartması, currywurst ve Berliner sos", "14,00", "evin tabağı"],
    ["Iskender Teller", "Kızarmış ekmek üzerinde döner, sarımsaklı yoğurt ve tereyağlı sos", "14,00"],
    ["Pomm-Döner", "Döner ve patates kızartması, Berliner sos", "7,50"],
    ["Drehspieß Überbacken", "Patates üzerinde döner, gouda ile fırınlanmış, hollandez sos", "13,50"],
    ["Türkische Pizza", "Lahmacun, salata ve Berliner sos", "7,00"],
    ["Türkische Pizza Spezial", "İçine döner sarılmış lahmacun, salata ve Berliner sos", "9,00"],
  ]},
  { id: "pide", name: "Pide", items: [
    ["Käse", "Kaşarlı", "8,50"],
    ["Spinat", "Ispanak, sarımsak, beyaz peynir ve gouda", "10,50"],
    ["Sucuk", "Sucuk ve kaşar", "10,50"],
    ["Salami", "Salam ve kaşar", "10,50"],
    ["Funghi", "Mantar ve kaşar", "10,50"],
    ["Vegetarisch", "Brokoli, biber, mısır ve kaşar", "11,50"],
    ["Drehspieß Pide", "Döner, soğan ve kaşar", "11,50"],
    ["Kor Pide", "Sucuk, salam, mantar, zeytin, soğan ve kaşar", "12,50", "evin pidesi"],
  ]},
  { id: "pizza", name: "Pizza", items: [
    ["Margherita", "Kaşar ve domates sos, 28 cm", "8,50"],
    ["Tonno", "Ton balığı, soğan, kaşar ve domates sos, 28 cm", "10,50"],
    ["Spinat", "Ispanak, sarımsak, beyaz peynir, gouda, 28 cm", "10,50"],
    ["Funghi", "Mantar, kaşar ve domates sos, 28 cm", "10,50"],
    ["Sucuk", "Sucuk, kaşar ve domates sos, 28 cm", "10,50"],
    ["Salami", "Salam, kaşar ve domates sos, 28 cm", "10,50"],
    ["Vegetarisch", "Brokoli, biber, mısır, kaşar, domates, 28 cm", "11,50"],
    ["Drehspieß Pizza", "Döner, soğan, kaşar ve domates sos, 28 cm", "11,50"],
    ["Chicken", "Tavuk göğsü, brokoli, hollandez sos, 28 cm", "11,50"],
    ["Kor Pizza", "Sucuk, salam, mantar, zeytin, soğan, kaşar, 28 cm", "12,50", "evin pizzası"],
  ]},
  { id: "brotchen", name: "Pizza ekmeği", items: [
    ["Käse", "6 adet, peynirli", "7,00"],
    ["Sucuk", "6 adet, sucuklu", "8,50"],
    ["Salami", "6 adet, salamlı", "8,50"],
    ["Tonno", "6 adet, ton balıklı", "8,50"],
    ["Drehspieß", "6 adet, dönerli", "9,00"],
  ]},
  { id: "veggie", name: "Vejetaryen", items: [
    ["Salat Tasche", "Pide ekmeğinde salata ve sos", "6,50"],
    ["Falafel Tasche", "Pide ekmeğinde falafel, salata ve sos", "7,00"],
    ["Falafel Dürüm", "Lavaşta falafel, salata ve sos", "8,00"],
    ["Falafel Teller", "Falafel, patates kızartması, salata ve sos", "10,50"],
  ]},
  { id: "salat", name: "Salata", items: [
    ["Gemischter Salat", "Yeşil salata, domates, salatalık, soğan, kırmızı lahana, roka", "7,00"],
    ["Bauern Salat", "Yeşil salata, domates, salatalık, roka, zeytin ve peynir", "8,00"],
    ["Tunfisch Salat", "Ton balığı, yeşil salata, domates, salatalık, soğan, roka", "8,00"],
    ["Drehspieß Salat", "Döner, yeşil salata, domates, salatalık, soğan, roka", "8,50"],
  ]},
  { id: "snack", name: "Atıştırmalık", items: [
    ["4'lü Nuggets", "Patates kızartmasıyla", "6,50"],
    ["6'lı Nuggets", "Patates kızartmasıyla", "7,50"],
    ["Currywurst", "Patates kızartmasıyla", "7,50"],
    ["6'lı Mozzarella Sticks", "", "7,50"],
    ["Hähnchenschnitzel Teller", "Tavuk şnitzel tabağı", "9,00"],
    ["Ekstra sos", "Ketçap, mayonez, köri sos ya da Joppi", "2,00"],
  ]},
  { id: "tatli", name: "Tatlı ve içecek", items: [
    ["Fıstıklı baklava", "4 dilim", "6,50"],
    ["Ayran", "250 ml", "2,25"],
    ["Coca-Cola, Cola Zero, Fanta", "0,33 l", "2,75"],
    ["Wasser", "0,5 l", "2,00"],
    ["Durstlöscher", "0,5 l", "2,25"],
    ["Capri-Sonne", "0,2 l", "1,50"],
    ["Energy Drink", "0,25 l", "2,75"],
    ["Red Bull", "250 ml", "3,25"],
  ]},
];

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const tabs = document.getElementById("menuTabs");
const panel = document.getElementById("menuPanel");

function renderCategory(id) {
  const cat = MENU.find((c) => c.id === id);
  panel.innerHTML = cat.items.map(([name, desc, price, tag]) => `
    <div class="menu-item">
      <div class="mi-row">
        <span class="mi-name" lang="de">${esc(name)}</span>
        <span class="mi-dots" aria-hidden="true"></span>
        <span class="mi-price">${price} €</span>
      </div>
      ${desc || tag ? `<p class="mi-desc">${esc(desc)}${tag ? `<span class="mi-tag">${esc(tag)}</span>` : ""}</p>` : ""}
    </div>`).join("");
  panel.setAttribute("aria-labelledby", `tab-${id}`);
  tabs.querySelectorAll("button").forEach((b) => {
    const on = b.dataset.id === id;
    b.setAttribute("aria-selected", on);
    b.tabIndex = on ? 0 : -1;
  });
}

tabs.innerHTML = MENU.map((c) =>
  `<button role="tab" id="tab-${c.id}" data-id="${c.id}" aria-controls="menuPanel">${esc(c.name)}</button>`
).join("");
tabs.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  renderCategory(b.dataset.id);
  // Mobilde seçilen kategori görünür alana kaysın
  b.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
});
tabs.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  const btns = [...tabs.querySelectorAll("button")];
  const i = btns.indexOf(document.activeElement);
  if (i < 0) return;
  const next = btns[(i + (e.key === "ArrowRight" ? 1 : -1) + btns.length) % btns.length];
  next.focus();
  renderCategory(next.dataset.id);
});
renderCategory(MENU[0].id);

// Fotoğraf yuvaları: assets/ içinde dosya varsa arka plana yerleştirilir.
document.querySelectorAll("[data-photo]").forEach((el) => {
  const src = el.dataset.photo;
  const img = new Image();
  img.onload = () => {
    el.style.backgroundImage = `url("${src}")`;
    el.classList.add("has-photo");
  };
  img.src = src;
});

// Tilt kartları (21st.dev InteractiveTiltCard'ın vanilla karşılığı).
// Yalnızca fareli cihazlarda ve hareket azaltma tercihi kapalıyken çalışır.
const canTilt = matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;
if (canTilt) {
  const TILT = 12; // derece
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    let frame = 0;
    el.addEventListener("pointerenter", () => el.classList.add("is-hover"));
    el.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;  // -0.5 .. 0.5
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${(-y * 2 * TILT).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 2 * TILT).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${(x * 50 + 50).toFixed(1)}%`);
        el.style.setProperty("--gy", `${(y * 50 + 50).toFixed(1)}%`);
      });
    });
    el.addEventListener("pointerleave", () => {
      cancelAnimationFrame(frame);
      el.classList.remove("is-hover");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  });
}

// ---------------------------------------------------------------------------
// Hero: fotoğraftaki döner şişini döndürür, duman ve kıvılcım ekler.
// Etin ön yüzü bir şerit olarak alınır, ayna ile çoğaltılıp silindire sarılır.
// Koordinatlar fotoğrafın kendi piksel düzleminde (1024x1536) tanımlıdır.
// Adres çubuğuna ?debug eklenirse et sınırları çizilir.
// ---------------------------------------------------------------------------
(function heroSpit() {
  const box = document.querySelector(".hero-art");
  if (!box) return;
  const img = box.querySelector("img");
  const canvas = box.querySelector(".hero-fx");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const IW = 1024, IH = 1536;
  const DEBUG = new URLSearchParams(location.search).has("debug");

  // Etin silueti: Y0'dan Y1'e merkez (c) ve yarıçap (r) doğrusal değişir.
  const Y0 = 290, Y1 = 1335;
  const TOP = { c: 508, r: 282 }, BOT = { c: 527, r: 228 };
  const geom = (y) => {
    const t = Math.min(1, Math.max(0, (y - Y0) / (Y1 - Y0)));
    return { c: TOP.c + (BOT.c - TOP.c) * t, r: TOP.r + (BOT.r - TOP.r) * t };
  };

  const SLICE = 0.42;            // ön yüzden alınan şerit (yarıçapın oranı)
  const EDGE = 0.9;              // dönen katmanın uzandığı en dış nokta
  const BANDS = 22, STEP = 3;    // yatay bant sayısı, sütun genişliği (foto px)
  const SPIN = (Math.PI * 2) / 22; // rad/sn: bir tam tur ~22 sn

  let tex, texPeriod, periodAngle;
  const band = document.createElement("canvas");
  const bctx = band.getContext("2d");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = 1, scale = 1, ox = 0, oy = 0;

  function buildTexture() {
    const W0 = 360, h = Y1 - Y0;
    tex = document.createElement("canvas");
    tex.width = W0 * 6; tex.height = h;
    const t = tex.getContext("2d");
    for (let y = Y0; y < Y1; y += 2) {
      const { c, r } = geom(y);
      t.drawImage(img, c - SLICE * r, y, 2 * SLICE * r, 2, 0, y - Y0, W0, 2);
    }
    t.save(); t.translate(2 * W0, 0); t.scale(-1, 1);
    t.drawImage(tex, 0, 0, W0, h, 0, 0, W0, h);
    t.restore();
    t.drawImage(tex, 0, 0, 2 * W0, h, 2 * W0, 0, 2 * W0, h);
    t.drawImage(tex, 0, 0, 2 * W0, h, 4 * W0, 0, 2 * W0, h);
    texPeriod = 2 * W0;
    periodAngle = 4 * Math.asin(SLICE);
  }

  function resize() {
    const r = box.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = band.width = Math.max(1, Math.round(W * dpr));
    canvas.height = band.height = Math.max(1, Math.round(H * dpr));
    scale = Math.max(W / IW, H / IH);
    ox = (W - IW * scale) / 2; oy = (H - IH * scale) / 2;
  }
  const photoSpace = (c) => c.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * ox, dpr * oy);

  function drawSpit(phase) {
    bctx.globalCompositeOperation = "source-over";
    bctx.setTransform(1, 0, 0, 1, 0, 0);
    bctx.clearRect(0, 0, band.width, band.height);
    photoSpace(bctx);
    const bh = (Y1 - Y0) / BANDS;
    for (let i = 0; i < BANDS; i++) {
      const y = Y0 + i * bh;
      const { c, r } = geom(y + bh / 2);
      const lim = EDGE * r;
      for (let dx = -lim; dx < lim; dx += STEP) {
        const dx1 = Math.min(dx + STEP, lim);
        const a0 = Math.asin(dx / r) + phase, a1 = Math.asin(dx1 / r) + phase;
        let f = (a0 / periodAngle) % 1; if (f < 0) f += 1;
        const sw = ((a1 - a0) / periodAngle) * texPeriod;
        bctx.drawImage(tex, f * texPeriod, y - Y0, sw, bh, c + dx, y, dx1 - dx + 0.7, bh + 0.7);
      }
    }
    // Silindir gölgesi: kenarlar koyulaşır, sol taraf ateşten hafif aydınlık.
    bctx.globalCompositeOperation = "source-atop";
    for (let i = 0; i < BANDS; i++) {
      const y = Y0 + i * bh, { c, r } = geom(y + bh / 2);
      const g = bctx.createLinearGradient(c - r, 0, c + r, 0);
      g.addColorStop(0, "rgba(255,120,30,.10)");
      g.addColorStop(0.3, "rgba(0,0,0,0)");
      g.addColorStop(0.75, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(10,4,0,.45)");
      bctx.fillStyle = g; bctx.fillRect(c - r, y, 2 * r, bh + 0.7);
    }
    // Kenarları ve üst/alt uçları fotoğrafın kendisine yumuşakça bırak.
    bctx.globalCompositeOperation = "destination-in";
    for (let i = 0; i < BANDS; i++) {
      const y = Y0 + i * bh, { c, r } = geom(y + bh / 2);
      const g = bctx.createLinearGradient(c - EDGE * r, 0, c + EDGE * r, 0);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.16, "#000");
      g.addColorStop(0.84, "#000");
      g.addColorStop(1, "rgba(0,0,0,0)");
      bctx.fillStyle = g; bctx.fillRect(c - EDGE * r, y, 2 * EDGE * r, bh + 0.7);
    }
    const v = bctx.createLinearGradient(0, Y0, 0, Y1);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(0.06, "#000");
    v.addColorStop(0.94, "#000"); v.addColorStop(1, "rgba(0,0,0,0)");
    bctx.fillStyle = v; bctx.fillRect(0, Y0, IW, Y1 - Y0);
    bctx.globalCompositeOperation = "source-over";
  }

  // --- Duman ---
  const puff = document.createElement("canvas");
  puff.width = puff.height = 128;
  {
    const p = puff.getContext("2d");
    const g = p.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(235,228,220,.9)");
    g.addColorStop(0.3, "rgba(225,218,210,.5)");
    g.addColorStop(0.65, "rgba(215,206,200,.15)");
    g.addColorStop(1, "rgba(210,200,195,0)");
    p.fillStyle = g; p.fillRect(0, 0, 128, 128);
  }
  const smoke = [], sparks = [];
  const rand = (a, b) => a + Math.random() * (b - a);

  function emitSmoke() {
    const y = rand(260, 1150), { c, r } = geom(y);
    const side = Math.random() < 0.75 ? 1 : -1; // çoğu sağdan yükselir, fotoğraftaki gibi
    smoke.push({
      x: c + side * r * rand(0.7, 1.05), y,
      vx: side * rand(4, 18), vy: rand(-60, -32),
      r: rand(45, 80), grow: rand(28, 48), stretch: rand(1.3, 1.9),
      age: 0, life: rand(5, 9), seed: Math.random() * 10, a: rand(0.07, 0.12),
    });
  }
  function emitSpark() {
    // Ateşten doğar, etin çevresinden ve karanlık arka plandan geçerek yükselir.
    const fromFire = Math.random() < 0.55;
    let x, y;
    if (fromFire) { x = rand(150, 330); y = rand(500, 1400); }
    else { y = rand(380, 1380); const g = geom(y); x = g.c + (Math.random() < 0.5 ? -1 : 1) * g.r * rand(0.9, 1.25); }
    sparks.push({
      x, y, px: x, py: y,
      vx: rand(-20, 90), vy: rand(-380, -170),
      age: 0, life: rand(1.1, 2.6), size: rand(2.4, 4.8), hue: rand(24, 44), seed: Math.random() * 10,
    });
  }

  let smokeAcc = 0, sparkAcc = 0;
  function step(dt, t) {
    smokeAcc += dt * 12; sparkAcc += dt * 30;
    while (smokeAcc > 1 && smoke.length < 110) { emitSmoke(); smokeAcc -= 1; }
    while (sparkAcc > 1 && sparks.length < 110) { emitSpark(); sparkAcc -= 1; }
    for (let i = smoke.length - 1; i >= 0; i--) {
      const s = smoke[i]; s.age += dt;
      if (s.age > s.life) { smoke.splice(i, 1); continue; }
      s.x += (s.vx + Math.sin(t * 0.7 + s.seed) * 14) * dt;
      s.y += s.vy * dt; s.r += s.grow * dt;
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i]; p.age += dt;
      if (p.age > p.life || p.y < -20) { sparks.splice(i, 1); continue; }
      p.px = p.x; p.py = p.y;
      p.vx += Math.sin(t * 9 + p.seed * 7) * 160 * dt; // titrek, düzensiz uçuş
      p.vy *= 1 - 0.6 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
    }
  }

  function draw(phase, t) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpit(phase);
    ctx.drawImage(band, 0, 0);
    photoSpace(ctx);

    ctx.globalCompositeOperation = "screen";
    for (const s of smoke) {
      const k = s.age / s.life;
      // Dikey uzatılmış, hafif sallanan bulutçuk: süzülen ince duman hissi
      ctx.globalAlpha = s.a * Math.sin(Math.PI * k);
      const rw = s.r * (0.8 + 0.2 * Math.sin(t * 0.9 + s.seed)), rh = s.r * s.stretch;
      ctx.drawImage(puff, s.x - rw, s.y - rh, rw * 2, rh * 2);
    }

    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    for (const p of sparks) {
      const k = p.age / p.life;
      const flick = 0.6 + 0.4 * Math.sin(t * 38 + p.seed * 13);
      const a = Math.min(1, (1 - k) * 1.4) * flick;
      // Kısa kuyruk: son ~40 ms'lik yol
      const tx = p.x - p.vx * 0.04, ty = p.y - p.vy * 0.04;
      ctx.globalAlpha = a * 0.4;
      ctx.strokeStyle = `hsl(${p.hue},100%,52%)`;
      ctx.lineWidth = p.size * 3;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.globalAlpha = a;
      ctx.strokeStyle = `hsl(${p.hue + 12},100%,${82 - k * 22}%)`;
      ctx.lineWidth = p.size;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(p.x, p.y); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    if (DEBUG) {
      ctx.strokeStyle = "#0f0"; ctx.lineWidth = 2;
      ctx.beginPath();
      for (let y = Y0; y <= Y1; y += 20) { const g = geom(y); ctx.lineTo(g.c - g.r, y); }
      for (let y = Y1; y >= Y0; y -= 20) { const g = geom(y); ctx.lineTo(g.c + g.r, y); }
      ctx.closePath(); ctx.stroke();
    }
  }

  let running = false, visible = true, last = 0, phase = 0, raf = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now; phase += SPIN * dt;
    step(dt, now / 1000);
    draw(phase, now / 1000);
    raf = requestAnimationFrame(frame);
  }
  function setRunning(on) {
    if (on === running) return;
    running = on;
    if (on) { last = performance.now(); raf = requestAnimationFrame(frame); }
    else cancelAnimationFrame(raf);
  }

  function start() {
    buildTexture();
    resize();
    // Isınma: sahne açıldığında duman ve kıvılcım zaten havada olsun.
    for (let i = 0; i < 240; i++) step(1 / 30, i / 30);
    new ResizeObserver(resize).observe(box);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; setRunning(visible && !document.hidden); })
      .observe(box);
    document.addEventListener("visibilitychange", () => setRunning(visible && !document.hidden));
    setRunning(true);
  }
  if (img.complete && img.naturalWidth) start();
  else img.addEventListener("load", start, { once: true });
})();

// ---------------------------------------------------------------------------
// Sayfa içi bağlantılar: yavaş başlar, hızlanır, hedefe yaklaşınca yavaşlar.
// Süre mesafeye göre uzar (0,7–1,6 sn). Kullanıcı tekerlek/dokunma ile
// araya girerse kaydırma bırakılır. Hareket azaltma açıksa anında atlar.
// ---------------------------------------------------------------------------
(function easedAnchors() {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let raf = 0;

  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  ["wheel", "touchstart", "keydown"].forEach((ev) =>
    window.addEventListener(ev, () => raf && stop(), { passive: true }));

  function scrollToY(targetY, done) {
    stop();
    const startY = window.scrollY;
    const dist = targetY - startY;
    if (Math.abs(dist) < 2) { done(); return; }
    const duration = Math.min(1600, Math.max(700, Math.abs(dist) * 0.45));
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, startY + dist * easeInOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else { raf = 0; done(); }
    };
    raf = requestAnimationFrame(tick);
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = decodeURIComponent(a.getAttribute("href").slice(1));
    const target = id ? document.getElementById(id) : document.body;
    if (!target) return;
    e.preventDefault();
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const y = Math.min(maxY, Math.max(0, target.getBoundingClientRect().top + window.scrollY));
    const finish = () => {
      history.pushState(null, "", "#" + id);
      // Klavye ve ekran okuyucu kullanıcıları için odağı hedefe taşı
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    if (reduce.matches) { window.scrollTo(0, y); finish(); }
    else scrollToY(y, finish);
  });
})();

// Mobil menü
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "Kapat" : "Menü";
});
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menü";
  }
});
