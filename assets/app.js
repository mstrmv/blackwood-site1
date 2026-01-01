(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const LS_LANG = "bw_lang";
  const LS_CART = "bw_cart_v1";

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function readJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  // ---------- i18n ----------
  const i18n = {
    ru: {
      home:"Главная", catalog:"Каталог", shipping:"Доставка", about:"О нас", contacts:"Контакты",
      cart:"Корзина", products:"ТОВАРЫ", choose_weight:"Выберите вес и добавьте в корзину.",
      sort:"Sort", popular:"Popular", price_low:"Price: Low", price_high:"Price: High",
      to_cart:"Перейти в корзину", checkout:"Оформить заказ",
      add_to_cart:"В КОРЗИНУ", weight:"Вес", currency:"грн",
      kicker:"Премиум уголь для гриля",
      hero_desc:"Длительное горение, минимум пепла, чистый жар. Идеально для BBQ и гриля.",
      open_catalog:"Открыть каталог",
      shipping_pay:"Доставка и оплата",
    },
    ukr: {
      home:"Головна", catalog:"Каталог", shipping:"Доставка", about:"Про нас", contacts:"Контакти",
      cart:"Кошик", products:"ТОВАРИ", choose_weight:"Оберіть вагу та додайте в кошик.",
      sort:"Sort", popular:"Popular", price_low:"Price: Low", price_high:"Price: High",
      to_cart:"Перейти в кошик", checkout:"Оформити замовлення",
      add_to_cart:"В КОШИК", weight:"Вага", currency:"грн",
      kicker:"Преміум вугілля для гриля",
      hero_desc:"Довге горіння, мінімум попелу, чистий жар. Ідеально для BBQ та гриля.",
      open_catalog:"Відкрити каталог",
      shipping_pay:"Доставка та оплата",
    },
    en: {
      home:"Home", catalog:"Catalog", shipping:"Shipping", about:"About", contacts:"Contacts",
      cart:"Cart", products:"PRODUCTS", choose_weight:"Choose weight and add to cart.",
      sort:"Sort", popular:"Popular", price_low:"Price: Low", price_high:"Price: High",
      to_cart:"Go to cart", checkout:"Checkout",
      add_to_cart:"ADD TO CART", weight:"Weight", currency:"UAH",
      kicker:"Premium charcoal for grill",
      hero_desc:"Long burn, low ash, clean heat. Perfect for BBQ & grill.",
      open_catalog:"Open catalog",
      shipping_pay:"Shipping & payment",
    },
  };

  function getLang() {
    const saved = localStorage.getItem(LS_LANG);
    return saved && i18n[saved] ? saved : "ru";
  }

  function setLang(lang) {
    if (!i18n[lang]) return;
    localStorage.setItem(LS_LANG, lang);

    $$(".langs button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));

    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const val = i18n[lang][key];
      if (typeof val === "string") el.textContent = val;
    });

    if ($("#catalogGrid")) renderCatalog();
  }

  function initLangButtons() {
    setLang(getLang());
    $$(".langs button").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang)));
  }

  // ---------- Cart ----------
  function getCart() { return readJSON(LS_CART, { items:{} }); }
  function saveCart(cart){ writeJSON(LS_CART, cart); updateCartCount(); }
  function cartCount(cart = getCart()){
    return Object.values(cart.items).reduce((a,b)=>a+(Number(b)||0),0);
  }
  function updateCartCount(){
    const el = $("#cartCount");
    if (el) el.textContent = String(cartCount());
  }
  function addToCart(id, qty){
    const cart = getCart();
    cart.items[id] = (Number(cart.items[id])||0) + qty;
    if (cart.items[id] <= 0) delete cart.items[id];
    saveCart(cart);
  }

  // ---------- Products (твои пути!) ----------
  const products = [
    { id:"core-3",  name:"CORE • 3 KG",  weight:"3 kg",  group:"3-5", price:null, img:"./img/products/core-3kg.png",  popular:3 },
    { id:"core-5",  name:"CORE • 5 KG",  weight:"5 kg",  group:"3-5", price:null, img:"./img/products/core-5kg.png",  popular:2 },
    { id:"core-10", name:"CORE • 10 KG", weight:"10 kg", group:"10",  price:null, img:"./img/products/core-10kg.png", popular:1 },
  ];

  let currentFilter = "all";
  let currentSort = "popular";
  const qtyState = {};

  function sortProducts(list){
    const arr = [...list];
    if (currentSort === "popular") arr.sort((a,b)=>(a.popular||0)-(b.popular||0));
    if (currentSort === "price_low") arr.sort((a,b)=>(a.price??999999)-(b.price??999999));
    if (currentSort === "price_high") arr.sort((a,b)=>(b.price??-1)-(a.price??-1));
    return arr;
  }
  function filterProducts(list){
    if (currentFilter === "all") return list;
    return list.filter(p => p.group === currentFilter);
  }
  function formatPrice(p, lang){
    if (typeof p.price !== "number") return "—";
    return `${p.price} ${i18n[lang].currency}`;
  }

  function renderCatalog(){
    const grid = $("#catalogGrid");
    if (!grid) return;

    const lang = getLang();
    const list = sortProducts(filterProducts(products));

    grid.innerHTML = list.map(p=>{
      const qty = clamp(qtyState[p.id] ?? 1, 1, 99);
      return `
        <article class="card" data-id="${p.id}">
          <div class="cardInner">
            <div class="cardMedia">
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <div class="cardTitle">${p.name}</div>
            <div class="cardMeta">${i18n[lang].weight}: ${p.weight}</div>

            <div class="cardRow">
              <div class="qty">
                <button type="button" class="qtyMinus">−</button>
                <span class="qtyVal">${qty}</span>
                <button type="button" class="qtyPlus">+</button>
              </div>
              <button type="button" class="cardBtn">${i18n[lang].add_to_cart}</button>
            </div>

            <div class="cardPrice">${formatPrice(p, lang)}</div>
          </div>
        </article>
      `;
    }).join("");

    $$(".card", grid).forEach(card=>{
      const id = card.dataset.id;
      const qtyEl = $(".qtyVal", card);
      const minus = $(".qtyMinus", card);
      const plus  = $(".qtyPlus", card);
      const btn   = $(".cardBtn", card);

      const setQty = (n)=>{
        const v = clamp(n, 1, 99);
        qtyState[id] = v;
        qtyEl.textContent = String(v);
      };

      minus.addEventListener("click", ()=>setQty((qtyState[id]??1)-1));
      plus.addEventListener("click",  ()=>setQty((qtyState[id]??1)+1));

      btn.addEventListener("click", ()=>{
        const qty = clamp(qtyState[id] ?? 1, 1, 99);
        addToCart(id, qty);
        btn.textContent = "✓";
        setTimeout(()=>btn.textContent = i18n[getLang()].add_to_cart, 550);
      });
    });
  }

  function initCatalogControls(){
    $$(".pillBtn").forEach(b=>{
      b.addEventListener("click", ()=>{
        currentFilter = b.dataset.filter || "all";
        $$(".pillBtn").forEach(x=>x.classList.toggle("active", x===b));
        renderCatalog();
      });
    });

    const sortSelect = $("#sortSelect");
    if (sortSelect){
      sortSelect.addEventListener("change", ()=>{
        currentSort = sortSelect.value;
        renderCatalog();
      });
    }
  }

  // ---------- Sparks (canvas) ----------
  function initSparks(){
    const canvas = $("#sparks");
    if (!canvas) return;

    // на мобилках уменьшить/отключить чтоб не лагало
    const isMobile = matchMedia("(max-width: 900px)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { canvas.remove(); return; }

    const ctx = canvas.getContext("2d");
    let w=0,h=0,dpr=1;
    let particles = [];

    function resize(){
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = canvas.clientWidth = window.innerWidth;
      h = canvas.clientHeight = window.innerHeight;
      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    function spawn(){
      const count = isMobile ? 25 : 60;
      particles = Array.from({length:count}).map(()=>({
        x: Math.random()*w,
        y: h + Math.random()*h*0.3,
        vx: (Math.random()-.5) * (isMobile?0.15:0.25),
        vy: -(0.6 + Math.random()*(isMobile?0.9:1.4)),
        r:  0.8 + Math.random()*(isMobile?1.2:1.8),
        a:  0.25 + Math.random()*0.55,
        life: 200 + Math.random()*220
      }));
    }

    function tick(){
      ctx.clearRect(0,0,w,h);

      // мягкая дымка
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0,0,w,h);

      for (const p of particles){
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        p.a = Math.max(0, p.a - 0.0012);

        // рисуем искру
        ctx.beginPath();
        ctx.fillStyle = `rgba(200,164,90,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();

        if (p.y < -30 || p.life <= 0){
          p.x = Math.random()*w;
          p.y = h + Math.random()*80;
          p.vx = (Math.random()-.5) * (isMobile?0.15:0.25);
          p.vy = -(0.6 + Math.random()*(isMobile?0.9:1.4));
          p.r  = 0.8 + Math.random()*(isMobile?1.2:1.8);
          p.a  = 0.25 + Math.random()*0.55;
          p.life = 200 + Math.random()*220;
        }
      }

      requestAnimationFrame(tick);
    }

    window.addEventListener("resize", ()=>{ resize(); spawn(); });
    resize();
    spawn();
    tick();
  }

  function init(){
    initLangButtons();
    updateCartCount();

    if ($("#catalogGrid")){
      initCatalogControls();
      renderCatalog();
    }
    initSparks();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
