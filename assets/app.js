const CART_KEY = "bw_cart_v1";
const LANG_KEY = "bw_lang_v1";

const PRODUCTS = [
  { id:"core-3",  nameKey:"p_core_3",  weightKey:"w_3",  price:399, img:"assets/img/products/core-3kg.png" },
  { id:"core-5",  nameKey:"p_core_5",  weightKey:"w_5",  price:499, img:"assets/img/products/core-5kg.png" },
  { id:"core-10", nameKey:"p_core_10", weightKey:"w_10", price:599, img:"assets/img/products/core-10kg.png" },
];

function loadCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function cartCount(){
  return loadCart().reduce((sum, it) => sum + (it.qty || 0), 0);
}
function updateCartCount(){
  const el = document.getElementById("cartCount");
  if (el) el.textContent = String(cartCount());
}

function getLang(){
  return localStorage.getItem(LANG_KEY) || "uk"; // УКР по умолчанию
}
function setLang(lang){
  localStorage.setItem(LANG_KEY, lang);
}

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navlinks a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    a.classList.toggle("active", href === path);
  });
}

function initLangSwitch(){
  const lang = getLang();

  // выставить активную кнопку
  const btn = document.querySelector(`.lang-switch button[data-lang="${lang}"]`);
  if (btn){
    document.querySelectorAll(".lang-switch button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  // клики
  document.querySelectorAll(".lang-switch button").forEach(b => {
    b.addEventListener("click", () => {
      const l = b.getAttribute("data-lang");
      setLang(l);
      document.querySelectorAll(".lang-switch button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      if (window.applyI18n) window.applyI18n(l);
      renderCart(); // чтобы корзина перевелась/перерисовалась
    });
  });

  if (window.applyI18n) window.applyI18n(lang);
}

function formatUAH(n){
  return `${n} грн`;
}

function findProduct(id){
  return PRODUCTS.find(p => p.id === id);
}

/* =========================
   CATALOG RENDER
   ========================= */
function renderCatalog(){
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  PRODUCTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="img"><img src="${p.img}" alt=""></div>
      <div class="body">
        <div class="name" data-i18n="${p.nameKey}">CORE</div>
        <div class="meta">
          <span data-i18n="${p.weightKey}">kg</span>
          <span class="price">${formatUAH(p.price)}</span>
        </div>
        <div class="row">
          <div class="qty">
            <button type="button" data-act="minus">-</button>
            <strong data-qty>1</strong>
            <button type="button" data-act="plus">+</button>
          </div>
          <button type="button" class="btn gold" data-act="add" data-i18n="add_to_cart">В кошик</button>
        </div>
      </div>
    `;

    let qty = 1;
    const qtyEl = card.querySelector("[data-qty]");

    card.addEventListener("click", (e) => {
      const act = e.target?.getAttribute?.("data-act");
      if (!act) return;

      if (act === "plus"){ qty = Math.min(99, qty + 1); qtyEl.textContent = String(qty); }
      if (act === "minus"){ qty = Math.max(1, qty - 1); qtyEl.textContent = String(qty); }

      if (act === "add"){
        const cart = loadCart();
        const found = cart.find(x => x.id === p.id);
        if (found) found.qty += qty;
        else cart.push({ id: p.id, qty: qty });
        saveCart(cart);
        qty = 1;
        qtyEl.textContent = "1";
      }
    });

    grid.appendChild(card);
  });

  if (window.applyI18n) window.applyI18n(getLang());
}

/* =========================
   CART RENDER
   ========================= */
function renderCart(){
  const wrap = document.getElementById("cartWrap");
  if (!wrap) return;

  const cart = loadCart();
  const lang = getLang();

  if (!cart.length){
    wrap.innerHTML = `
      <div class="card" style="padding:18px;">
        <h3 style="margin:0 0 6px" data-i18n="cart_empty">Кошик порожній</h3>
        <p style="margin:0;color:rgba(255,255,255,.75)" data-i18n="cart_empty_hint">Додайте товари з каталогу.</p>
        <div style="margin-top:12px">
          <a class="btn gold" href="catalog.html" data-i18n="go_catalog">Відкрити каталог</a>
        </div>
      </div>
    `;
    if (window.applyI18n) window.applyI18n(lang);
    updateCartCount();
    return;
  }

  let total = 0;

  const itemsHtml = cart.map(it => {
    const p = findProduct(it.id);
    if (!p) return "";
    const line = p.price * it.qty;
    total += line;

    return `
      <div class="card" style="display:flex; gap:14px; padding:14px; align-items:center;">
        <div style="width:120px; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.03)">
          <img src="${p.img}" alt="" style="width:100%; height:90px; object-fit:cover; display:block">
        </div>

        <div style="flex:1">
          <div style="font-weight:900" data-i18n="${p.nameKey}">CORE</div>
          <div style="color:rgba(255,255,255,.75); font-size:13px" data-i18n="${p.weightKey}">kg</div>
          <div style="margin-top:6px; color:var(--gold); font-weight:900">${formatUAH(p.price)}</div>
        </div>

        <div class="qty">
          <button type="button" data-cart-act="dec" data-id="${p.id}">-</button>
          <strong style="min-width:22px; text-align:center">${it.qty}</strong>
          <button type="button" data-cart-act="inc" data-id="${p.id}">+</button>
        </div>

        <button type="button" class="btn outline" data-cart-act="remove" data-id="${p.id}" data-i18n="remove">
          Видалити
        </button>
      </div>
    `;
  }).join("");

  wrap.innerHTML = `
    <div style="display:grid; gap:14px;">
      ${itemsHtml}

      <div class="card" style="padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
          <div>
            <div style="font-weight:900" data-i18n="total">Разом</div>
            <div style="color:rgba(255,255,255,.75); font-size:13px" data-i18n="total_hint">Сума товарів у кошику</div>
          </div>
          <div style="font-size:22px; font-weight:900; color:var(--gold)">${formatUAH(total)}</div>
        </div>

        <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
          <a class="btn gold" href="checkout.html" data-i18n="checkout">Оформити</a>
          <a class="btn outline" href="catalog.html" data-i18n="go_catalog">Відкрити каталог</a>
          <button type="button" class="btn ghost" id="clearCartBtn" data-i18n="clear_cart">Очистити</button>
        </div>
      </div>
    </div>
  `;

  wrap.querySelectorAll("[data-cart-act]").forEach(btn => {
    btn.addEventListener("click", () => {
      const act = btn.getAttribute("data-cart-act");
      const id = btn.getAttribute("data-id");
      const c = loadCart();
      const item = c.find(x => x.id === id);
      if (!item) return;

      if (act === "inc") item.qty = Math.min(99, item.qty + 1);
      if (act === "dec") item.qty = Math.max(1, item.qty - 1);
      if (act === "remove") {
        const idx = c.findIndex(x => x.id === id);
        if (idx >= 0) c.splice(idx, 1);
      }

      saveCart(c);
      renderCart();
    });
  });

  const clearBtn = wrap.querySelector("#clearCartBtn");
  if (clearBtn){
    clearBtn.addEventListener("click", () => {
      saveCart([]);
      renderCart();
    });
  }

  if (window.applyI18n) window.applyI18n(lang);
  updateCartCount();
}

/* =========================
   BOOT
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setActiveNav();
  initLangSwitch();
  renderCatalog();
  renderCart();
});
