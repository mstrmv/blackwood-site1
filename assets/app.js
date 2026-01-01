(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // year
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());

  // --- Cart count (bw_cart_v1) ---
  const LS_CART = "bw_cart_v1";
  function readJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }
  function cartCount() {
    const cart = readJSON(LS_CART, { items: {} });
    return Object.values(cart.items || {}).reduce((a, b) => a + (Number(b) || 0), 0);
  }
  function updateCartCount() {
    const n = String(cartCount());
    const el1 = $("#cartCount");
    const el2 = $("#cartCountMobile");
    if (el1) el1.textContent = n;
    if (el2) el2.textContent = n;
  }
  updateCartCount();

  // --- Burger menu ---
  const burger = $("#burger");
  const mobileNav = $("#mobileNav");
  const toggleMenu = (force) => {
    if (!burger || !mobileNav) return;
    const willOpen = typeof force === "boolean" ? force : mobileNav.hidden;
    mobileNav.hidden = !willOpen;
    burger.setAttribute("aria-expanded", String(willOpen));
  };

  if (burger && mobileNav) {
    burger.addEventListener("click", () => toggleMenu());
    mobileNav.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") toggleMenu(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) toggleMenu(false);
    });
  }

  // --- i18n ---
  const LS_LANG = "bw_lang";
  const dict = {
    ru: {
      home:"Главная", catalog:"Каталог", shipping:"Доставка", about:"О нас", contacts:"Контакты",
      cart:"Корзина", to_cart:"Перейти в корзину",
      kicker:"Премиум уголь для гриля",
      hero_desc:"Длительное горение, минимум пепла, чистый жар. Идеально для BBQ и гриля.",
      open_catalog:"Открыть каталог",
      shipping_pay:"Доставка и оплата",
    },
    ukr: {
      home:"Головна", catalog:"Каталог", shipping:"Доставка", about:"Про нас", contacts:"Контакти",
      cart:"Кошик", to_cart:"Перейти в кошик",
      kicker:"Преміум вугілля для гриля",
      hero_desc:"Довге горіння, мінімум попелу, чистий жар. Ідеально для BBQ та гриля.",
      open_catalog:"Відкрити каталог",
      shipping_pay:"Доставка та оплата",
    },
    en: {
      home:"Home", catalog:"Catalog", shipping:"Shipping", about:"About", contacts:"Contacts",
      cart:"Cart", to_cart:"Go to cart",
      kicker:"Premium charcoal for grill",
      hero_desc:"Long burn, low ash, clean heat. Perfect for BBQ & grill.",
      open_catalog:"Open catalog",
      shipping_pay:"Shipping & payment",
    }
  };

  function getLang(){
    const saved = localStorage.getItem(LS_LANG);
    return saved && dict[saved] ? saved : "ru";
  }

  function setLang(lang){
    if (!dict[lang]) return;
    localStorage.setItem(LS_LANG, lang);

    // sync all lang buttons (desktop + mobile)
    $$("[data-lang]").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));

    // translate
    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const v = dict[lang][key];
      if (typeof v === "string") el.textContent = v;
    });
  }

  // bind lang buttons
  setLang(getLang());
  $$("[data-lang]").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang)));

  // --- Sparks (canvas) ---
  const canvas = $("#sparks");
  if (canvas) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      canvas.remove();
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    let w=0, h=0, dpr=1;

    const isMobile = matchMedia("(max-width: 900px)").matches;
    const MAX = isMobile ? 30 : 90;
    const SPEED = isMobile ? 0.25 : 0.55;
    const FADE = isMobile ? 0.06 : 0.045;

    const rand = (a,b)=>a+Math.random()*(b-a);
    const sparks = [];

    function resize(){
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    function spawn(){
      return {
        x: rand(0, w),
        y: rand(h*0.55, h),
        vx: rand(-0.25, 0.25) * SPEED,
        vy: rand(-1.6, -0.6) * SPEED,
        life: rand(0.9, 1.9),
        size: rand(1.0, 2.2) * (isMobile ? 0.9 : 1.0),
        glow: rand(0.25, 0.75),
        a: rand(0.35, 0.85),
      };
    }

    function init(){
      sparks.length = 0;
      for (let i=0;i<MAX;i++) sparks.push(spawn());
    }

    let last = performance.now();
    function tick(now){
      const dt = Math.min(0.033, (now-last)/1000);
      last = now;

      ctx.fillStyle = `rgba(0,0,0,${FADE})`;
      ctx.fillRect(0,0,w,h);

      for (let i=0;i<sparks.length;i++){
        const p = sparks[i];
        p.life -= dt;
        p.x += p.vx * 120 * dt;
        p.y += p.vy * 120 * dt;

        p.vx += rand(-0.02, 0.02) * dt;
        p.vy += rand(-0.03, 0.01) * dt;

        const alpha = Math.max(0, Math.min(1, p.life)) * p.a;

        ctx.beginPath();
        ctx.fillStyle = `rgba(200,164,90,${alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(200,164,90,${alpha * p.glow * 0.6})`;
        ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI*2);
        ctx.fill();

        if (p.life <= 0 || p.y < -40 || p.x < -60 || p.x > w+60){
          sparks[i] = spawn();
        }
      }

      requestAnimationFrame(tick);
    }

    window.addEventListener("resize", () => { resize(); init(); });
    resize();
    init();
    ctx.clearRect(0,0,w,h);
    requestAnimationFrame(tick);
  }
})();
