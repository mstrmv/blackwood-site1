/* BLACKWOOD • CHARCOAL
   One JS for all pages.
   Cart in localStorage: "bw_cart"
*/

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const CART_KEY = "bw_cart";
  const LANG_KEY = "bw_lang";

  const products = [
    {
      id: "core-3kg",
      weight: 3,
      popular: 3,
      img: "img/products/core-3kg.png",
      title: { ru: "CORE • 3 KG", uk: "CORE • 3 KG", en: "CORE • 3 KG" },
      sub:   { ru: "Вес: 3 кг",   uk: "Вага: 3 кг",  en: "Weight: 3 kg" }
    },
    {
      id: "core-5kg",
      weight: 5,
      popular: 2,
      img: "img/products/core-5kg.png",
      title: { ru: "CORE • 5 KG", uk: "CORE • 5 KG", en: "CORE • 5 KG" },
      sub:   { ru: "Вес: 5 кг",   uk: "Вага: 5 кг",  en: "Weight: 5 kg" }
    },
    {
      id: "core-10kg",
      weight: 10,
      popular: 1,
      img: "img/products/core-10kg.png",
      title: { ru: "CORE • 10 KG", uk: "CORE • 10 KG", en: "CORE • 10 KG" },
      sub:   { ru: "Вес: 10 кг",   uk: "Вага: 10 кг",  en: "Weight: 10 kg" }
    }
  ];

  const dict = {
    ru: {
      nav_home: "Главная",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "О нас",
      nav_contacts: "Контакты",
      cart: "Корзина",

      catalog_title: "Товары",
      catalog_sub: "Выберите вес и добавьте в корзину.",
      filter_all: "All",
      filter_3_5: "3–5kg",
      filter_10: "10kg",
      sort: "Sort",
      sort_popular: "Popular",
      sort_weight_asc: "Weight ↑",
      sort_weight_desc: "Weight ↓",

      to_cart: "В корзину",
      go_cart: "Перейти в корзину",
      checkout: "Оформить заказ"
    },
    uk: {
      nav_home: "Головна",
      nav_catalog: note("Каталог","Каталог"),
      nav_shipping: "Доставка",
      nav_about: "Про нас",
      nav_contacts: "Контакти",
      cart: "Кошик",

      catalog_title: "Товари",
      catalog_sub: "Оберіть вагу та додайте в кошик.",
      filter_all: "All",
      filter_3_5: "3–5kg",
      filter_10: "10kg",
      sort: "Sort",
      sort_popular: "Popular",
      sort_weight_asc: "Weight ↑",
      sort_weight_desc: "Weight ↓",

      to_cart: "В кошик",
      go_cart: "Перейти в кошик",
      checkout: "Оформити замовлення"
    },
    en: {
      nav_home: "Home",
      nav_catalog: "Catalog",
      nav_shipping: "Shipping",
      nav_about: "About",
      nav_contacts: "Contacts",
      cart: "Cart",

      catalog_title: "Products",
      catalog_sub: "Choose weight and add to cart.",
      filter_all: "All",
      filter_3_5: "3–5kg",
      filter_10: "10kg",
      sort: "Sort",
      sort_popular: "Popular",
      sort_weight_asc: "Weight ↑",
      sort_weight_desc: "Weight ↓",

      to_cart: "Add to cart",
      go_cart: "Go to cart",
      checkout: "Checkout"
    }
  };

  function note(a, b){ return a || b; }

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
    catch { return {}; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  function cartCount(cart) {
    return Object.values(cart).reduce((s, n) => s + Number(n || 0), 0);
  }
  function updateCartBadge() {
    const cart = loadCart();
    const el = $("#cartCount");
    if (el) el.textContent = String(cartCount(cart));
  }

  function getLang() {
    const saved = localStorage.getItem(LANG_KEY);
    return saved || "ru";
  }
  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyI18n(lang);
    renderCatalog(); // чтобы тексты карточек обновились
  }
  function applyI18n(lang) {
    const d = dict[lang] || dict.ru;
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (d[key]) el.textContent = d[key];
    });

    // Active lang button
    $$(".lang__btn").forEach(b => {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
  }

  // ===== Catalog render =====
  function getFilter() {
    const active = $(".chip.is-active");
    return active ? active.dataset.filter : "all";
  }
  function getSort() {
    const sel = $("#sortSelect");
    return sel ? sel.value : "popular";
  }

  function filteredProducts(list) {
    const f = getFilter();
    if (f === "all") return list.slice();
    if (f === "10") return list.filter(p => p.weight === 10);
    // 3-5
    return list.filter(p => p.weight === 3 || p.weight === 5);
  }

  function sortedProducts(list) {
    const s = getSort();
    const arr = list.slice();
    if (s === "weight_asc") arr.sort((a, b) => a.weight - b.weight);
    else if (s === "weight_desc") arr.sort((a, b) => b.weight - a.weight);
    else arr.sort((a, b) => a.popular - b.popular); // popular
    return arr;
  }

  function renderCatalog() {
    const grid = $("#productsGrid");
    if (!grid) return;

    const lang = getLang();
    const d = dict[lang] || dict.ru;

    const list = sortedProducts(filteredProducts(products));
    grid.innerHTML = list.map(p => cardHTML(p, lang, d)).join("");

    // bind card events
    $$(".card").forEach(card => {
      const id = card.dataset.id;
      const minus = $(".qty__btn--minus", card);
      const plus = $(".qty__btn--plus", card);
      const num = $(".qty__num", card);
      const add = $(".card__buy", card);

      let q = 1;

      const setQ = (v) => {
        q = Math.max(1, Math.min(99, v));
        num.textContent = String(q);
      };

      minus?.addEventListener("click", () => setQ(q - 1));
      plus?.addEventListener("click", () => setQ(q + 1));

      add?.addEventListener("click", () => {
        const cart = loadCart();
        cart[id] = (cart[id] || 0) + q;
        saveCart(cart);
        updateCartBadge();

        // маленький "пульс" на кнопке
        add.classList.add("is-done");
        setTimeout(() => add.classList.remove("is-done"), 250);
      });
    });
  }

  function cardHTML(p, lang, d) {
    const title = p.title[lang] || p.title.ru;
    const sub = p.sub[lang] || p.sub.ru;

    return `
      <article class="card" data-id="${p.id}">
        <div class="card__media">
          <img class="card__img" src="${p.img}" alt="${title}" loading="lazy" />
        </div>

        <div class="card__body">
          <div class="card__title">${title}</div>
          <div class="card__sub">${sub}</div>

          <div class="card__row">
            <div class="qty">
              <button class="qty__btn qty__btn--minus" type="button">−</button>
              <div class="qty__num">1</div>
              <button class="qty__btn qty__btn--plus" type="button">+</button>
            </div>

            <button class="btn btn--gold card__buy" type="button">${d.to_cart}</button>
          </div>
        </div>
      </article>
    `;
  }

  function bindCatalogControls() {
    // Filters
    $$(".chip").forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".chip").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        renderCatalog();
      });
    });

    // Sort
    const sel = $("#sortSelect");
    sel?.addEventListener("change", renderCatalog);
  }

  function bindLangButtons() {
    $$(".lang__btn").forEach(btn => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
  }

  function init() {
    // year
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());

    bindLangButtons();
    applyI18n(getLang());

    updateCartBadge();

    // catalog specific
    bindCatalogControls();
    renderCatalog();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

