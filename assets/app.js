(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ===== Year =====
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // ===== Cart =====
  const LS_CART = "bw_cart_v1";

  function readJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function getCart() { return readJSON(LS_CART, { items: {} }); }
  function saveCart(cart) { writeJSON(LS_CART, cart); updateCartCount(); }

  function cartCount() {
    const cart = getCart();
    return Object.values(cart.items || {}).reduce((a,b)=>a + (Number(b) || 0), 0);
  }

  function updateCartCount() {
    const n = String(cartCount());
    const a = $("#cartCount");
    const b = $("#cartCountMobile");
    if (a) a.textContent = n;
    if (b) b.textContent = n;
  }

  function addToCart(id, qty) {
    const cart = getCart();
    cart.items[id] = (Number(cart.items[id]) || 0) + qty;
    if (cart.items[id] <= 0) delete cart.items[id];
    saveCart(cart);
  }

  updateCartCount();

  // ===== Burger =====
  const burger = $("#burger");
  const mobileNav = $("#mobileNav");
  const toggleMenu = (force) => {
    if (!burger || !mobileNav) return;
    const open = typeof force === "boolean" ? force : mobileNav.hidden;
    mobileNav.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
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

  // ===== i18n =====
  const LS_LANG = "bw_lang";
  const dict = {
    ru: {
      home:"Главная", catalog:"Каталог", shipping:"Доставка", about:"О нас", contacts:"Контакты",
      cart:"Корзина", to_cart:"Перейти в корзину",
      products:"ТОВАРЫ", choose_weight:"Выберите вес и добавьте в корзину.",
      sort:"Sort", popular:"Popular", price_low:"Price: Low", price_high:"Price: High",
      checkout:"Оформить заказ", add_to_cart:"В КОРЗИНУ", weight:"Вес", currency:"грн",
      kicker:"Премиум уголь для гриля",
      hero_desc:"Длительное горение, минимум пепла, чистый жар. Идеально для BBQ и гриля.",
      open_catalog:"Открыть каталог",
      shipping_pay:"Доставка и оплата",
    },
    ukr: {
      home:"Головна", catalog:"Каталог", shipping:"Доставка", about:"Про нас", contacts:"Контакти",
      cart:"Кошик", to_cart:"Перейти в кошик",
      products:"ТОВАРИ", choose_weight:"Оберіть вагу та додайте в кошик.",
      sort:"Sort", popular:"Popular", price_low:"Price: Low", price_high:"Price: High",
      checkout:"Оформити замовлення", add_to_cart:"В КОШИК", weight:"Вага", currency:"грн",
      kicker:"Преміум вугілля для гриля",
      hero_desc:"Довге горіння, мінімум попелу, чистий жар. Ідеально для BBQ та гриля.",
      open_catalog:"Відкрити каталог",
      shipping_pay:"Доставка та оплата",
    },
    en: {
      home:"Home", catalog:"Catalog", shipping:"Shipping", about:"About", contacts:"Contacts",
      cart:"Cart", to_cart:"Go to cart",
      products:"PRODUCTS", choose_weight:"Choose weight and add to cart.",
      sort:"Sort", popular:"Popular", price_low:"Price: Low", price_high:"Price: High",
      checkout:"Checkout", add_to_cart:"ADD TO CART", weight:"Weight", currency:"UAH",
      kicker:"Premium charcoal for grill",
      hero_desc:"Long burn, low ash, clean heat. Perfect for BBQ & grill.",
      open_catalog:"Open catalog",
      shipping_pay:"Shipping & payment",
    }
  };

  function getLang() {
    const saved = localStorage.getItem(LS_LANG);
    return saved && dict[saved] ? saved : "ru";
  }

  function setLang(lang) {
    if (!dict[lang]) return;
    localStorage.setItem(LS_LANG, lang);

    $$("[data-lang]").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const v = dict[lang][key];
      if (typeof v === "string") el.textContent = v;
    });

    if ($("#catalogGrid")) renderCatalog();
  }

  setLang(getLang());
  $$("[data-lang]").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang)));

  // ===== Catalog =====
  const products = [
    { id:"core-3",  name:"CORE • 3 KG",  weight:"3 kg",  group:"3-5", price:null, img:"./img/products/core-3kg.png",  popular:3 },
    { id:"core-5",  name:"CORE • 5 KG",  weight:"5 kg",  group:"3-5", price:null, img:"./img/products/core-5kg.png",  popular:2 },
    { id:"core-10", name:"CORE • 10 KG", weight:"10 kg", group:"10",  price:null, img:"./img/products/core-10kg.png", popular:1 },
  ];

  let currentFilter = "all";
  let currentSort = "popular";
  const qtyState = {};

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function sortProducts(list) {
    const arr = [...list];
    if (currentSort === "popular") arr.sort((a,b)=>(a.popular||0)-(b.popular||0));
    if (currentSort === "price_low") arr.sort((a,b)=>(a.price??999999)-(b.price??999999));
    if (currentSort === "price_high") arr.sort((a,b)=>(b.price??-1)-(a.price??-1));
    return arr;
  }

  function filterProducts(list) {
    if (currentFilter === "all") return list;
    return list.filter(p => p.group === currentFilter);
  }

  function formatPrice(p, lang) {
    if (typeof p.price !== "number") return "—";
    return `${p.price} ${dict[lang].currency}`;
  }

  function renderCatalog() {
    const grid = $("#catalogGrid");
    if (!grid) return;

    const lang = getLang();
    const list = sortProducts(filterProducts(products));

    grid.innerHTML = list.map(p => {
      const qty = clamp(qtyState[p.id] ?? 1, 1, 99);
      return `
        <article class="card" data-id="${p.id}">
          <div class="cardInner">
            <div class="cardMedia">
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>

            <div class="cardTitle">${p.name}</div>
            <div class="cardMeta">${dict[lang].weight}: ${p.weight}</div>

            <div class="cardRow">
              <div class="qty">
                <button type="button" class="qtyMinus">−</button>
                <span class="qtyVal">${qty}</span>
                <button type="button" class="qtyPlus">+</button>
              </div>

              <button type="button" class="cardBtn">${dict[lang].add_to_cart}</button>
            </div>

            <div class="cardPrice">${formatPrice(p, lang)}</div>
          </div>
        </article>
      `;
    }).join("");

    $$(".card", grid).forEach(card => {
      const id = card.dataset.id;
      const qtyEl = $(".qtyVal", card);
      const minus = $(".qtyMinus", card);
      const plus  = $(".qtyPlus", card);
      const btn   = $(".cardBtn", card);

      const setQty = (n) => {
        const v = clamp(n, 1, 99);
        qtyState[id] = v;
        qtyEl.textContent = String(v);
      };

      minus.addEventListener("click", () => setQty((qtyState[id] ?? 1) - 1));
      plus.addEventListener("click",  () => setQty((qtyState[id] ?? 1) + 1));

      btn.addEventListener("click", () => {
        const qty = clamp(qtyState[id] ?? 1, 1, 99);
        addToCart(id, qty);
        btn.textContent = "✓";
        setTimeout(() => btn.textContent = dict[getLang()].add_to_cart, 550);
      });
    });
  }

  function initCatalogControls() {
    $$(".pillBtn").forEach(b => {
      b.addEventListener("click", () => {
        currentFilter = b.dataset.filter || "all";
        $$(".pillBtn").forEach(x => x.classList.toggle("active", x === b));
        renderCatalog();
      });
    });

    const sortSelect = $("#sortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        currentSort = sortSelect.value;
        renderCatalog();
      });
    }
  }

  if ($("#catalogGrid")) {
    initCatalogControls();
    renderCatalog();
  }
})();
