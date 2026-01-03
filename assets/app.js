/* ===== FILE: assets/app.js ===== */
(() => {
  const CART_KEY = "bw_cart_v1";

  // ===== IMAGE FIXER (case/extension fallback for GitHub Pages) =====
  const EXT_TRIES = [
    (src) => src,
    (src) => src.replace(/\.jpg$/i, ".JPG"),
    (src) => src.replace(/\.JPG$/i, ".jpg"),
    (src) => src.replace(/\.jpeg$/i, ".JPEG"),
    (src) => src.replace(/\.JPEG$/i, ".jpeg"),
    (src) => src.replace(/\.png$/i, ".PNG"),
    (src) => src.replace(/\.PNG$/i, ".png"),
    (src) => src.replace(/\.jpg$/i, ".png"),
    (src) => src.replace(/\.png$/i, ".jpg"),
    (src) => "img/core-10kg.png"
  ];

  function onImgError(img){
    try{
      const tried = Number(img.getAttribute("data-try") || "0");
      const next = tried + 1;
      img.setAttribute("data-try", String(next));
      const base = img.getAttribute("data-src") || img.src || "";
      const clean = base.split("?")[0];

      const fn = EXT_TRIES[next] || null;
      if (!fn){
        img.style.opacity = ".35";
        img.style.filter = "grayscale(1)";
        return;
      }
      const nextSrc = fn(clean) + "?v=" + next;
      img.src = nextSrc;
    }catch(_){
      img.style.opacity = ".35";
      img.style.filter = "grayscale(1)";
    }
  }

  window.BW_IMG = { onError: onImgError };

  // ===== PRODUCTS (БОЛЬШЕ ТОВАРОВ) =====
  // ВАЖНО: файлы должны реально существовать в /img/
  // Если какой-то jpg назван по-другому — просто поменяй img: "img/....jpg"
  const PRODUCTS = [
    { id:"core-3kg",  img:"img/core-3kg.png",  weight:"3 кг",  grade:"CORE", price:199,
      name:{uk:"Вугілля BLACKWOOD CORE 3 кг", ru:"Уголь BLACKWOOD CORE 3 кг", en:"BLACKWOOD CORE Charcoal 3 kg"} },
    { id:"core-5kg",  img:"img/core-5kg.png",  weight:"5 кг",  grade:"CORE", price:299,
      name:{uk:"Вугілля BLACKWOOD CORE 5 кг", ru:"Уголь BLACKWOOD CORE 5 кг", en:"BLACKWOOD CORE Charcoal 5 kg"} },
    { id:"core-10kg", img:"img/core-10kg.png", weight:"10 кг", grade:"CORE", price:499,
      name:{uk:"Вугілля BLACKWOOD CORE 10 кг", ru:"Уголь BLACKWOOD CORE 10 кг", en:"BLACKWOOD CORE Charcoal 10 kg"} },

    // JPG товары (примерные названия файлов):
    { id:"product-01", img:"img/product-01.jpg", weight:"—", grade:"BBQ", price:149,
      name:{uk:"Розпалювач для гриля", ru:"Розжиг для гриля", en:"BBQ fire starter"} },
    { id:"product-02", img:"img/product-02.jpg", weight:"—", grade:"BBQ", price:129,
      name:{uk:"Щепа для копчення", ru:"Щепа для копчения", en:"Smoking wood chips"} },
    { id:"product-03", img:"img/product-03.jpg", weight:"—", grade:"BBQ", price:199,
      name:{uk:"Рукавиці для гриля", ru:"Перчатки для гриля", en:"BBQ gloves"} },
    { id:"product-04", img:"img/product-04.jpg", weight:"—", grade:"BBQ", price:179,
      name:{uk:"Щипці для гриля", ru:"Щипцы для гриля", en:"BBQ tongs"} },
    { id:"product-05", img:"img/product-05.jpg", weight:"—", grade:"BBQ", price:169,
      name:{uk:"Щітка для решітки", ru:"Щетка для решетки", en:"Grill brush"} },
    { id:"product-06", img:"img/product-06.jpg", weight:"—", grade:"BBQ", price:119,
      name:{uk:"Підпалювач кубики", ru:"Кубики для розжига", en:"Firelighter cubes"} },
    { id:"product-07", img:"img/product-07.jpg", weight:"—", grade:"BBQ", price:139,
      name:{uk:"Термометр (приклад)", ru:"Термометр (пример)", en:"Thermometer (sample)"} },
    { id:"product-08", img:"img/product-08.jpg", weight:"—", grade:"BBQ", price:99,
      name:{uk:"Фольга для BBQ (приклад)", ru:"Фольга для BBQ (пример)", en:"BBQ foil (sample)"} },
    { id:"product-09", img:"img/product-09.jpg", weight:"—", grade:"BBQ", price:89,
      name:{uk:"Шампури (приклад)", ru:"Шампура (пример)", en:"Skewers (sample)"} },
    { id:"product-10", img:"img/product-10.jpg", weight:"—", grade:"BBQ", price:159,
      name:{uk:"Решітка (приклад)", ru:"Решетка (пример)", en:"Grill grate (sample)"} },
    { id:"product-11", img:"img/product-11.jpg", weight:"—", grade:"BBQ", price:109,
      name:{uk:"Рукав/фартух (приклад)", ru:"Фартук (пример)", en:"Apron (sample)"} },
    { id:"product-12", img:"img/product-12.jpg", weight:"—", grade:"BBQ", price:149,
      name:{uk:"Сумка для вугілля (приклад)", ru:"Сумка для угля (пример)", en:"Charcoal bag (sample)"} }
  ];

  // ===== CART HELPERS =====
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const money = (n) => `${Number(n || 0).toFixed(0)} ${window.BW_I18N?.t("uah") || "₴"}`;

  function loadCart(){
    try{
      const raw = localStorage.getItem(CART_KEY);
      const obj = raw ? JSON.parse(raw) : {};
      if (obj && typeof obj === "object") return obj;
      return {};
    }catch(_){ return {}; }
  }

  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart || {}));
    renderCartBadge();
    window.dispatchEvent(new CustomEvent("bw:cart"));
  }

  function addToCart(id, qty=1){
    const cart = loadCart();
    cart[id] = clamp((cart[id] || 0) + qty, 0, 999);
    if (cart[id] <= 0) delete cart[id];
    saveCart(cart);
  }

  function setQty(id, qty){
    const cart = loadCart();
    const v = clamp(qty, 0, 999);
    if (v <= 0) delete cart[id];
    else cart[id] = v;
    saveCart(cart);
  }

  function clearCart(){
    saveCart({});
  }

  function cartCount(){
    const cart = loadCart();
    return Object.values(cart).reduce((a,b)=>a + (Number(b)||0), 0);
  }

  function cartTotal(){
    const cart = loadCart();
    let total = 0;
    for (const [id, qty] of Object.entries(cart)){
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) continue;
      total += (p.price * (Number(qty)||0));
    }
    return total;
  }

  function renderCartBadge(){
    const count = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      el.textContent = String(count);
      el.style.display = count > 0 ? "inline-block" : "none";
    });
  }

  // ===== RENDER =====
  function productName(p){
    const lang = window.BW_I18N?.getLang?.() || "uk";
    return (p.name && (p.name[lang] || p.name.uk || p.name.en)) || p.id;
  }

  function escapeHtml(s){
    return String(s ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function renderCatalog(targetSel){
    const wrap = document.querySelector(targetSel);
    if (!wrap) return;

    const q = (document.querySelector("[data-catalog-search]")?.value || "").trim().toLowerCase();
    const cart = loadCart();
    const lang = window.BW_I18N?.getLang?.() || "uk";

    const list = PRODUCTS
      .filter(p => productName(p).toLowerCase().includes(q) || (p.grade || "").toLowerCase().includes(q))
      .map(p => {
        const inCart = !!cart[p.id];
        const btnText = inCart ? (window.BW_I18N?.t("in_cart", lang) || "In cart") : (window.BW_I18N?.t("add_to_cart", lang) || "Add");
        const btnClass = inCart ? "btn small" : "btn primary small";

        const src = encodeURI(p.img);
        return `
          <article class="card product" data-product="${p.id}">
            <div class="thumb">
              <img data-src="${src}" src="${src}" alt="${escapeHtml(productName(p))}" loading="lazy" onerror="BW_IMG.onError(this)" />
            </div>
            <div class="body">
              <div class="name">${escapeHtml(productName(p))}</div>
              <div class="meta">
                <div class="mini">
                  <span class="pill">${escapeHtml(p.grade || "")}</span>
                  <span style="margin-left:8px; color: var(--muted2)">${escapeHtml(window.BW_I18N?.t("weight", lang) || "Weight")}: ${escapeHtml(p.weight || "—")}</span>
                </div>
                <div class="price">${money(p.price)}</div>
              </div>
              <button class="${btnClass}" data-add="${p.id}">${escapeHtml(btnText)}</button>
            </div>
          </article>
        `;
      }).join("");

    wrap.innerHTML = list || `<div class="notice">—</div>`;
  }

  function renderPopular(targetSel){
    const wrap = document.querySelector(targetSel);
    if (!wrap) return;
    const top = PRODUCTS.slice(0, 3);

    wrap.innerHTML = top.map(p => {
      const src = encodeURI(p.img);
      return `
        <article class="card product">
          <div class="thumb">
            <img data-src="${src}" src="${src}" alt="${escapeHtml(productName(p))}" loading="lazy" onerror="BW_IMG.onError(this)" />
          </div>
          <div class="body">
            <div class="name">${escapeHtml(productName(p))}</div>
            <div class="meta">
              <div class="mini">
                <span class="pill">${escapeHtml(p.grade || "")}</span>
                <span style="margin-left:8px; color: var(--muted2)">${escapeHtml(window.BW_I18N?.t("weight") || "Weight")}: ${escapeHtml(p.weight || "—")}</span>
              </div>
              <div class="price">${money(p.price)}</div>
            </div>
            <a class="btn primary small" href="catalog.html" data-i18n="hero_cta_catalog">Перейти в каталог</a>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderCartTable(){
    const tableWrap = document.querySelector("[data-cart-table]");
    const emptyWrap = document.querySelector("[data-cart-empty]");
    const totalEl = document.querySelector("[data-cart-total]");
    const checkoutBtn = document.querySelector("[data-go-checkout]");

    if (!tableWrap || !emptyWrap || !totalEl) return;

    const cart = loadCart();
    const items = Object.entries(cart)
      .map(([id, qty]) => {
        const p = PRODUCTS.find(x => x.id === id);
        if (!p) return null;
        const q = Number(qty) || 0;
        const sum = p.price * q;
        return { p, q, sum };
      })
      .filter(Boolean);

    if (items.length === 0){
      tableWrap.style.display = "none";
      emptyWrap.style.display = "block";
      totalEl.textContent = money(0);
      if (checkoutBtn) checkoutBtn.setAttribute("disabled", "disabled");
      return;
    }

    if (checkoutBtn) checkoutBtn.removeAttribute("disabled");
    emptyWrap.style.display = "none";
    tableWrap.style.display = "block";

    const rows = items.map(({p,q,sum}) => {
      const src = encodeURI(p.img);
      return `
        <tr>
          <td>
            <div style="display:flex; gap:10px; align-items:center;">
              <div class="rowimg">
                <img data-src="${src}" src="${src}" alt="${escapeHtml(productName(p))}" onerror="BW_IMG.onError(this)" />
              </div>
              <div>
                <div style="font-weight:900">${escapeHtml(productName(p))}</div>
                <div class="mini">${escapeHtml(p.grade || "")} • ${escapeHtml(p.weight || "—")}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="qty">
              <button type="button" data-qty-dec="${p.id}">−</button>
              <span data-qty-val="${p.id}">${q}</span>
              <button type="button" data-qty-inc="${p.id}">+</button>
            </div>
          </td>
          <td>${money(p.price)}</td>
          <td><strong>${money(sum)}</strong></td>
        </tr>
      `;
    }).join("");

    tableWrap.querySelector("tbody").innerHTML = rows;
    totalEl.textContent = money(cartTotal());
  }

  function setupContactsForm(){
    const form = document.querySelector("[data-contacts-form]");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem("bw_contacts_last", JSON.stringify({ ...data, ts: Date.now() }));
      form.reset();
      const note = document.querySelector("[data-contacts-note]");
      if (note){
        note.style.display = "block";
        setTimeout(()=> note.style.display="none", 2500);
      }
    });
  }

  function setupCheckout(){
    const form = document.querySelector("[data-checkout-form]");
    if (!form) return;

    if (cartCount() === 0){
      location.href = "cart.html";
      return;
    }

    const totalEl = document.querySelector("[data-checkout-total]");
    if (totalEl) totalEl.textContent = money(cartTotal());

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const order = Object.fromEntries(new FormData(form).entries());
      const cart = loadCart();
      const items = Object.entries(cart).map(([id,qty]) => {
        const p = PRODUCTS.find(x=>x.id===id);
        if (!p) return null;
        return { id, qty:Number(qty)||0, price:p.price, name: productName(p) };
      }).filter(Boolean);

      const payload = { order, items, total: cartTotal(), ts: Date.now() };
      localStorage.setItem("bw_last_order", JSON.stringify(payload));
      clearCart();
      location.href = "success.html";
    });
  }

  // ===== EVENTS =====
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn){
      const id = addBtn.getAttribute("data-add");
      addToCart(id, 1);
      renderCatalog("[data-catalog-grid]");
      renderPopular("[data-popular-grid]");
      renderCartTable();
      return;
    }

    const inc = e.target.closest("[data-qty-inc]");
    const dec = e.target.closest("[data-qty-dec]");
    if (inc){
      const id = inc.getAttribute("data-qty-inc");
      addToCart(id, 1);
      renderCartTable();
      return;
    }
    if (dec){
      const id = dec.getAttribute("data-qty-dec");
      const cart = loadCart();
      setQty(id, (cart[id] || 0) - 1);
      renderCartTable();
      return;
    }

    const clear = e.target.closest("[data-cart-clear]");
    if (clear){
      clearCart();
      renderCartTable();
      return;
    }

    const go = e.target.closest("[data-go-checkout]");
    if (go){
      if (cartCount() > 0) location.href = "checkout.html";
      return;
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target && e.target.matches("[data-catalog-search]")){
      renderCatalog("[data-catalog-grid]");
    }
  });

  window.addEventListener("bw:lang", () => {
    renderCatalog("[data-catalog-grid]");
    renderPopular("[data-popular-grid]");
    renderCartTable();
    const totalEl = document.querySelector("[data-checkout-total]");
    if (totalEl) totalEl.textContent = money(cartTotal());
  });

  window.addEventListener("bw:cart", () => {
    renderCatalog("[data-catalog-grid]");
    renderPopular("[data-popular-grid]");
    renderCartTable();
  });

  document.addEventListener("DOMContentLoaded", () => {
    renderCartBadge();
    renderCatalog("[data-catalog-grid]");
    renderPopular("[data-popular-grid]");
    renderCartTable();
    setupContactsForm();
    setupCheckout();
  });
})();
