/* =========================
   BLACKWOOD · CHARCOAL
   app.js (FULL)
   - i18n RU/UKR/EN
   - Catalog: filter + sort + qty + add to cart
   - Cart persisted in localStorage
   - Safe init (no crashes if blocks missing)
   ========================= */

(function () {
  "use strict";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const LS_LANG = "bw_lang";
  const LS_CART = "bw_cart_v1";

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function readJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  }
  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  // ---------- i18n ----------
  const i18n = {
    ru: {
      home: "Главная",
      catalog: "Каталог",
      shipping: "Доставка",
      about: "О нас",
      contacts: "Контакты",
      cart: "Корзина",
      products: "ТОВАРЫ",
      choose_weight: "Выберите вес и добавьте в корзину.",
      sort: "Sort",
      popular: "Popular",
      price_low: "Price: Low",
      price_high: "Price: High",
      to_cart: "Перейти в корзину",
      checkout: "Оформить заказ",
      add_to_cart: "В КОРЗИНУ",
      weight: "Вес",
      грн: "грн",
    },
    ukr: {
      home: "Головна",
      catalog: "Каталог",
      shipping: "Доставка",
      about: "Про нас",
      contacts: "Контакти",
      cart: "Кошик",
      products: "ТОВАРИ",
      choose_weight: "Оберіть вагу та додайте в кошик.",
      sort: "Sort",
      popular: "Popular",
      price_low: "Price: Low",
      price_high: "Price: High",
      to_cart: "Перейти в кошик",
      checkout: "Оформити замовлення",
      add_to_cart: "В КОШИК",
      weight: "Вага",
      грн: "грн",
    },
    en: {
      home: "Home",
      catalog: "Catalog",
      shipping: "Shipping",
      about: "About",
      contacts: "Contacts",
      cart: "Cart",
      products: "PRODUCTS",
      choose_weight: "Choose weight and add to cart.",
      sort: "Sort",
      popular: "Popular",
      price_low: "Price: Low",
      price_high: "Price: High",
      to_cart: "Go to cart",
      checkout: "Checkout",
      add_to_cart: "ADD TO CART",
      weight: "Weight",
      грн: "UAH",
    },
  };

  function getLang() {
    const saved = localStorage.getItem(LS_LANG);
    return saved && i18n[saved] ? saved : "ru";
  }
  function setLang(lang) {
    if (!i18n[lang]) return;
    localStorage.setItem(LS_LANG, lang);

    $$(".langs button").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });

    $$("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const val = i18n[lang][key];
      if (typeof val === "string") el.textContent = val;
    });

    // Also update dynamic buttons in catalog if rendered
    if ($("#catalogGrid")) renderCatalog();
  }

  function initLangButtons() {
    const lang = getLang();
    setLang(lang);

    $$(".langs button").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLang(btn.dataset.lang);
      });
    });
  }

  // ---------- Cart ----------
  function getCart() {
    return readJSON(LS_CART, { items: {} }); // { items: {id: qty} }
  }
  function saveCart(cart) {
    writeJSON(LS_CART, cart);
    updateCartCount();
  }
  function cartCount(cart = getCart()) {
    return Object.values(cart.items).reduce((a, b) => a + (Number(b) || 0), 0);
  }
  function updateCartCount() {
    const el = $("#cartCount");
    if (!el) return;
    el.textContent = String(cartCount());
  }
  function addToCart(id, qty) {
    const cart = getCart();
    cart.items[id] = (Number(cart.items[id]) || 0) + qty;
    if (cart.items[id] <= 0) delete cart.items[id];
    saveCart(cart);
  }

  // ---------- Products (edit if you want prices) ----------
  const products = [
    {
      id: "core-3",
      name: "CORE • 3 KG",
      weight: "3 kg",
      group: "3-5",
      price: null, // put number if you want, e.g. 199
      img: "./img/core-3kg.jpg",
      popular: 3,
    },
    {
      id: "core-5",
      name: "CORE • 5 KG",
      weight: "5 kg",
      group: "3-5",
      price: null,
      img: "./img/core-5kg.jpg",
      popular: 2,
    },
    {
      id: "core-10",
      name: "CORE • 10 KG",
      weight: "10 kg",
      group: "10",
      price: null,
      img: "./img/core-10kg.jpg",
      popular: 1,
    },
  ];

  // ---------- Catalog state ----------
  let currentFilter = "all";
  let currentSort = "popular";
  const qtyState = {}; // per product id

  function sortProducts(list) {
    const arr = [...list];
    if (currentSort === "popular") {
      arr.sort((a, b) => (a.popular || 0) - (b.popular || 0));
    } else if (currentSort === "price_low") {
      arr.sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999));
    } else if (currentSort === "price_high") {
      arr.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    }
    return arr;
  }

  function filterProducts(list) {
    if (currentFilter === "all") return list;
    return list.filter((p) => p.group === currentFilter);
  }

  function formatPrice(p, lang) {
    if (typeof p.price !== "number") return "—";
    const currency = i18n[lang]["грн"];
    return `${p.price} ${currency}`;
  }

  function renderCatalog() {
    const grid = $("#catalogGrid");
    if (!grid) return;

    const lang = getLang();

    const list = sortProducts(filterProducts(products));

    grid.innerHTML = list
      .map((p) => {
        const qty = clamp(qtyState[p.id] ?? 1, 1, 99);
        const priceText = formatPrice(p, lang);

        return `
        <article class="card" data-id="${p.id}">
          <div class="cardInner">
            <div class="cardMedia">
              <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.15'; this.alt='Image not found';">
            </div>

            <div class="cardTitle">${p.name}</div>
            <div class="cardMeta">${i18n[lang].weight}: ${p.weight}</div>

            <div class="cardRow">
              <div class="qty">
                <button type="button" class="qtyMinus" aria-label="minus">−</button>
                <span class="qtyVal">${qty}</span>
                <button type="button" class="qtyPlus" aria-label="plus">+</button>
              </div>

              <button type="button" class="cardBtn">${i18n[lang].add_to_cart}</button>
            </div>

            <div style="display:flex; justify-content:flex-end; margin-top:10px; color:rgba(255,255,255,.65); font-weight:800">
              <span>${priceText}</span>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    // bind events
    $$(".card", grid).forEach((card) => {
      const id = card.dataset.id;

      const qtyEl = $(".qtyVal", card);
      const minus = $(".qtyMinus", card);
      const plus = $(".qtyPlus", card);
      const btn = $(".cardBtn", card);

      function setQty(n) {
        const v = clamp(n, 1, 99);
        qtyState[id] = v;
        qtyEl.textContent = String(v);
      }

      minus.addEventListener("click", () => setQty((qtyState[id] ?? 1) - 1));
      plus.addEventListener("click", () => setQty((qtyState[id] ?? 1) + 1));

      btn.addEventListener("click", () => {
        const qty = clamp(qtyState[id] ?? 1, 1, 99);
        addToCart(id, qty);
        // small feedback
        btn.textContent = "✓";
        setTimeout(() => {
          const lang = getLang();
          btn.textContent = i18n[lang].add_to_cart;
        }, 550);
      });
    });
  }

  function initCatalogControls() {
    // filter pills
    $$(".pillBtn").forEach((b) => {
      b.addEventListener("click", () => {
        currentFilter = b.dataset.filter || "all";
        $$(".pillBtn").forEach((x) => x.classList.toggle("active", x === b));
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

  // ---------- Init ----------
  function init() {
    initLangButtons();
    updateCartCount();

    // Only if catalog exists
    if ($("#catalogGrid")) {
      initCatalogControls();
      renderCatalog();
    }

    // If you later add cart page rendering, app.js won't crash
  }

  document.addEventListener("DOMContentLoaded", init);
})();
