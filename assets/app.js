// ===== CART STORAGE =====
const CART_KEY = "bw_cart_v1";
const LANG_KEY = "bw_lang_v1";

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

// ===== PRODUCTS (ТОЛЬКО ТВОИ 3 PNG ПАЧКИ) =====
const PRODUCTS = [
  {
    id: "core-3",
    nameKey: "p_core_3",
    weightKey: "w_3",
    price: 399,
    img: "assets/img/products/core-3kg.png",
    category: "charcoal"
  },
  {
    id: "core-5",
    nameKey: "p_core_5",
    weightKey: "w_5",
    price: 499,
    img: "assets/img/products/core-5kg.png",
    category: "charcoal"
  },
  {
    id: "core-10",
    nameKey: "p_core_10",
    weightKey: "w_10",
    price: 599,
    img: "assets/img/products/core-10kg.png",
    category: "charcoal"
  }
];

// ===== HELPERS =====
function getLang(){
  return localStorage.getItem(LANG_KEY) || "uk"; // UKR главный
}
function setLang(lang){
  localStorage.setItem(LANG_KEY, lang);
}

// ===== RENDER CATALOG =====
function renderCatalog(){
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  PRODUCTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="img">
        <img src="${p.img}" alt="">
      </div>
      <div class="body">
        <div class="name" data-i18n="${p.nameKey}">CORE</div>
        <div class="meta">
          <span data-i18n="${p.weightKey}">Вага</span>
          <span class="price">${p.price} грн</span>
        </div>
        <div class="row">
          <div class="qty">
            <button data-act="minus">-</button>
            <strong data-qty>1</strong>
            <button data-act="plus">+</button>
          </div>
          <button class="btn gold" data-act="add" data-i18n="add_to_cart">В кошик</button>
        </div>
      </div>
    `;

    let qty = 1;
    const qtyEl = card.querySelector("[data-qty]");
    card.addEventListener("click", (e) => {
      const act = e.target?.getAttribute?.("data-act");
      if (!act) return;

      if (act === "plus"){
        qty = Math.min(99, qty + 1);
        qtyEl.textContent = qty;
      }
      if (act === "minus"){
        qty = Math.max(1, qty - 1);
        qtyEl.textContent = qty;
      }
      if (act === "add"){
        const cart = loadCart();
        const found = cart.find(x => x.id === p.id);
        if (found) found.qty += qty;
        else cart.push({ id: p.id, qty, price: p.price, img: p.img, nameKey: p.nameKey, weightKey: p.weightKey });
        saveCart(cart);
      }
    });

    grid.appendChild(card);
  });

  // применяем переводы после рендера
  if (window.applyI18n) window.applyI18n(getLang());
}

// ===== ON LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // lang buttons
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLang(lang);

      document.querySelectorAll(".lang-switch button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (window.applyI18n) window.applyI18n(lang);
    });
  });

  // set active button on load
  const lang = getLang();
  const activeBtn = document.querySelector(`.lang-switch button[data-lang="${lang}"]`);
  if (activeBtn){
    document.querySelectorAll(".lang-switch button").forEach(b => b.classList.remove("active"));
    activeBtn.classList.add("active");
  }

  if (window.applyI18n) window.applyI18n(lang);

  renderCatalog();
});
