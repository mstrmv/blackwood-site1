/* BLACKWOOD • CHARCOAL — clean stable JS (cart + helpers) */

const PRODUCTS = [
  { id: "core-3kg",  name: "CORE • 3 кг",  price: 399, img: "img/products/core-3kg.png" },
  { id: "core-5kg",  name: "CORE • 5 кг",  price: 499, img: "img/products/core-5kg.png" },
  { id: "core-10kg", name: "CORE • 10 кг", price: 599, img: "img/products/core-10kg.png" },
];

const CART_KEY = "blackwood_cart_v1";

function moneyUAH(n){
  return `${Number(n).toFixed(0)} грн`;
}

function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    const cart = raw ? JSON.parse(raw) : {};
    return (cart && typeof cart === "object") ? cart : {};
  }catch(_e){
    return {};
  }
}

function setCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartCount(){
  const cart = getCart();
  let c = 0;
  for (const id in cart) c += Number(cart[id] || 0);
  return c;
}

function cartTotal(){
  const cart = getCart();
  let sum = 0;
  for (const id in cart){
    const qty = Number(cart[id] || 0);
    const p = PRODUCTS.find(x => x.id === id);
    if (p && qty > 0) sum += p.price * qty;
  }
  return sum;
}

function addToCart(id, qty = 1){
  const cart = getCart();
  cart[id] = Number(cart[id] || 0) + Number(qty || 1);
  if (cart[id] < 1) cart[id] = 1;
  setCart(cart);
  renderCartBadge();
}

function setQty(id, qty){
  const cart = getCart();
  const n = Number(qty || 0);
  if (n <= 0) delete cart[id];
  else cart[id] = n;
  setCart(cart);
  renderCartBadge();
}

function clearCart(){
  localStorage.removeItem(CART_KEY);
  renderCartBadge();
}

function renderCartBadge(){
  const el = document.querySelector("[data-cart-count]");
  if (!el) return;
  const c = cartCount();
  el.textContent = c > 0 ? `(${c})` : "";
}

function setActiveNav(){
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navlinks a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === file) a.classList.add("active");
  });
}

/* Catalog rendering (optional) */
function renderCatalog(){
  const mount = document.querySelector("[data-catalog]");
  if (!mount) return;

  mount.innerHTML = PRODUCTS.map(p => `
    <article class="card product">
      <div class="product-media">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" />
      </div>
      <div class="product-body">
        <div class="product-title">
          <h3>${escapeHtml(p.name)}</h3>
          <div class="price">${moneyUAH(p.price)}</div>
        </div>
        <p class="product-meta">Преміальний деревний вуголь для мангалу та гриля. Чисте горіння, стабільний жар.</p>
        <div class="product-footer">
          <button class="btn primary" data-add="${p.id}">Додати в кошик</button>
          <a class="btn" href="cart.html">Кошик</a>
        </div>
      </div>
    </article>
  `).join("");

  mount.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.getAttribute("data-add"), 1);
      toast("Додано в кошик");
    });
  });
}

/* Cart page rendering */
function renderCartPage(){
  const tableWrap = document.querySelector("[data-cart-table]");
  const totalEl = document.querySelector("[data-cart-total]");
  const emptyEl = document.querySelector("[data-cart-empty]");
  if (!tableWrap || !totalEl || !emptyEl) return;

  const cart = getCart();
  const items = Object.keys(cart)
    .map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      const qty = Number(cart[id] || 0);
      return (p && qty > 0) ? { ...p, qty } : null;
    })
    .filter(Boolean);

  if (items.length === 0){
    tableWrap.innerHTML = "";
    totalEl.innerHTML = moneyUAH(0);
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "none";

  tableWrap.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Товар</th>
          <th>Ціна</th>
          <th>Кількість</th>
          <th>Сума</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${items.map(it => `
          <tr>
            <td><b>${escapeHtml(it.name)}</b></td>
            <td>${moneyUAH(it.price)}</td>
            <td>
              <div class="qty">
                <button data-dec="${it.id}" aria-label="minus">−</button>
                <span>${it.qty}</span>
                <button data-inc="${it.id}" aria-label="plus">+</button>
              </div>
            </td>
            <td><b>${moneyUAH(it.price * it.qty)}</b></td>
            <td><button class="btn" data-del="${it.id}">Видалити</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  tableWrap.querySelectorAll("[data-inc]").forEach(b => {
    b.addEventListener("click", () => {
      const id = b.getAttribute("data-inc");
      const cur = Number(getCart()[id] || 0);
      setQty(id, cur + 1);
      renderCartPage();
    });
  });

  tableWrap.querySelectorAll("[data-dec]").forEach(b => {
    b.addEventListener("click", () => {
      const id = b.getAttribute("data-dec");
      const cur = Number(getCart()[id] || 0);
      setQty(id, cur - 1);
      renderCartPage();
    });
  });

  tableWrap.querySelectorAll("[data-del]").forEach(b => {
    b.addEventListener("click", () => {
      setQty(b.getAttribute("data-del"), 0);
      renderCartPage();
    });
  });

  totalEl.innerHTML = moneyUAH(cartTotal());
}

/* Checkout page */
function renderCheckoutSummary(){
  const mount = document.querySelector("[data-checkout-summary]");
  const totalEl = document.querySelector("[data-checkout-total]");
  if (!mount || !totalEl) return;

  const cart = getCart();
  const items = Object.keys(cart)
    .map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      const qty = Number(cart[id] || 0);
      return (p && qty > 0) ? { ...p, qty } : null;
    })
    .filter(Boolean);

  if (items.length === 0){
    mount.innerHTML = `<p class="p">Кошик порожній. Перейдіть у <a class="btn" href="catalog.html" style="padding:8px 10px;border-radius:12px;">каталог</a></p>`;
    totalEl.textContent = moneyUAH(0);
    return;
  }

  mount.innerHTML = `
    <div class="card pad">
      ${items.map(it => `
        <div style="display:flex;justify-content:space-between;gap:10px;margin:8px 0;">
          <div><b>${escapeHtml(it.name)}</b> <span class="small">× ${it.qty}</span></div>
          <div><b>${moneyUAH(it.price * it.qty)}</b></div>
        </div>
      `).join("")}
      <div class="hr"></div>
      <div class="total">Разом: <b>${moneyUAH(cartTotal())}</b></div>
    </div>
  `;
  totalEl.textContent = moneyUAH(cartTotal());

  const form = document.querySelector("[data-checkout-form]");
  if (form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());
      // Тут позже можно отправлять в Telegram bot / webhook.
      console.log("ORDER:", { items, total: cartTotal(), customer: data });

      toast("Замовлення сформовано ✅");
      clearCart();
      setTimeout(() => location.href = "index.html", 650);
    }, { once: true });
  }
}

/* Telegram Mini App safe init */
function initTelegram(){
  try{
    const tg = window.Telegram && window.Telegram.WebApp;
    if (!tg) return;
    tg.ready();
    tg.expand();

    // Можно сделать кнопку оплаты/заказа позже.
    // tg.MainButton.setText("Оформити замовлення").show();
  }catch(_e){}
}

/* Tiny toast */
let toastTimer = null;
function toast(text){
  let el = document.querySelector("#toast");
  if (!el){
    el = document.createElement("div");
    el.id = "toast";
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "22px";
    el.style.transform = "translateX(-50%)";
    el.style.padding = "12px 14px";
    el.style.borderRadius = "14px";
    el.style.border = "1px solid rgba(255,255,255,.14)";
    el.style.background = "rgba(0,0,0,.55)";
    el.style.backdropFilter = "blur(10px)";
    el.style.color = "rgba(255,255,255,.92)";
    el.style.fontWeight = "800";
    el.style.boxShadow = "0 16px 40px rgba(0,0,0,.55)";
    el.style.zIndex = "999";
    el.style.maxWidth = "92vw";
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.opacity = "0"; }, 1100);
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/* Boot */
document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  renderCartBadge();
  renderCatalog();
  renderCartPage();
  renderCheckoutSummary();
  initTelegram();
});
