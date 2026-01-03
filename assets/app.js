/* BLACKWOOD • CHARCOAL — app.js (full) */

/* =========================
   CONFIG
========================= */
const DEFAULT_LANG = "UKR"; // главный язык — украинский

// УКАЖИ СВОИ ССЫЛКИ (иконки в шапке)
const SOCIAL = {
  telegram: "https://t.me/USERNAME",
  instagram: "https://instagram.com/USERNAME",
  tiktok: "https://tiktok.com/@USERNAME",
};

// ЦЕНЫ
const PRODUCTS = [
  { id: "core-3kg",  name: "CORE • 3 KG",  weight: "3kg",  price: 399, img: "./img/products/core-3kg.png"  },
  { id: "core-5kg",  name: "CORE • 5 KG",  weight: "5kg",  price: 499, img: "./img/products/core-5kg.png"  },
  { id: "core-10kg", name: "CORE • 10 KG", weight: "10kg", price: 599, img: "./img/products/core-10kg.png" },
];

// Куда отправлять заказы (mailto)
const ORDER_EMAIL = "YOUR_EMAIL@gmail.com";

// ⚠️ ВАЖНО: Nova Poshta API key на GitHub Pages будет виден всем.
// Лучше делать через сервер/бота. Если всё равно надо — вставь сюда:
const NOVA_POSHTA_KEY = ""; // "e2d2f807d2464e81aae678bb51c9c569";

/* =========================
   I18N
========================= */
const i18n = {
  RU: {
    nav_home:"Главная", nav_catalog:"Каталог", nav_shipping:"Доставка", nav_about:"О нас", nav_contacts:"Контакты",
    cart:"Корзина",
    hero_tag:"Премиум уголь для гриля",
    hero_sub:"Длительное горение, минимум пепла, чистый жар.\nИдеально для BBQ и гриля.",
    btn_catalog:"Открыть каталог", btn_shipping:"Доставка и оплата", btn_cart:"Корзина",
    catalog_title:"Товары", catalog_sub:"Выберите вес и добавьте в корзину.",
    filter_all:"All", filter_3:"3–5kg", filter_10:"10kg",
    to_cart:"В корзину",
    go_cart:"Перейти в корзину",
    checkout:"Оформить заказ",
    cart_title:"Корзина",
    empty:"Пока пусто.",
    total:"Итого",
    checkout_title:"Оформление заказа",
    fio:"ФИО", phone:"Телефон", city:"Город", comment:"Комментарий",
    delivery_type:"Доставка",
    np_branch:"Отделение", np_locker:"Почтомат", np_courier:"Курьер",
    warehouse:"Отделение / Почтомат",
    send_order:"Отправить заказ",
    about_title:"О нас",
    contacts_title:"Контакты",
    shipping_title:"Доставка",
  },
  UKR: {
    nav_home:"Головна", nav_catalog:"Каталог", nav_shipping:"Доставка", nav_about:"Про нас", nav_contacts:"Контакти",
    cart:"Кошик",
    hero_tag:"Преміум вугілля для гриля",
    hero_sub:"Довге горіння, мінімум попелу, чистий жар.\nІдеально для BBQ та гриля.",
    btn_catalog:"Відкрити каталог", btn_shipping:"Доставка та оплата", btn_cart:"Кошик",
    catalog_title:"Товари", catalog_sub:"Оберіть вагу та додайте у кошик.",
    filter_all:"All", filter_3:"3–5kg", filter_10:"10kg",
    to_cart:"У кошик",
    go_cart:"Перейти в кошик",
    checkout:"Оформити замовлення",
    cart_title:"Кошик",
    empty:"Поки порожньо.",
    total:"Разом",
    checkout_title:"Оформлення замовлення",
    fio:"ПІБ", phone:"Телефон", city:"Місто", comment:"Коментар",
    delivery_type:"Доставка",
    np_branch:"Відділення", np_locker:"Поштомат", np_courier:"Курʼєр",
    warehouse:"Відділення / Поштомат",
    send_order:"Надіслати замовлення",
    about_title:"Про нас",
    contacts_title:"Контакти",
    shipping_title:"Доставка",
  },
  EN: {
    nav_home:"Home", nav_catalog:"Catalog", nav_shipping:"Shipping", nav_about:"About", nav_contacts:"Contacts",
    cart:"Cart",
    hero_tag:"Premium charcoal for grill",
    hero_sub:"Long burn, low ash, clean heat.\nPerfect for BBQ & grill.",
    btn_catalog:"Open catalog", btn_shipping:"Shipping & payment", btn_cart:"Cart",
    catalog_title:"Products", catalog_sub:"Choose weight and add to cart.",
    filter_all:"All", filter_3:"3–5kg", filter_10:"10kg",
    to_cart:"Add to cart",
    go_cart:"Go to cart",
    checkout:"Checkout",
    cart_title:"Cart",
    empty:"Empty for now.",
    total:"Total",
    checkout_title:"Checkout",
    fio:"Full name", phone:"Phone", city:"City", comment:"Comment",
    delivery_type:"Delivery",
    np_branch:"Branch", np_locker:"Locker", np_courier:"Courier",
    warehouse:"Branch / Locker",
    send_order:"Send order",
    about_title:"About",
    contacts_title:"Contacts",
    shipping_title:"Shipping",
  }
};

function getLang(){
  return localStorage.getItem("lang") || DEFAULT_LANG;
}
function setLang(lang){
  localStorage.setItem("lang", lang);
  applyI18n();
  updateLangButtons();
}

function applyI18n(){
  const lang = getLang();
  const dict = i18n[lang] || i18n[DEFAULT_LANG];

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(!dict[key]) return;
    el.textContent = dict[key];
  });

  // multiline hero text support
  document.querySelectorAll("[data-i18n-multiline]").forEach(el=>{
    const key = el.getAttribute("data-i18n-multiline");
    if(!dict[key]) return;
    el.innerHTML = String(dict[key]).replace(/\n/g, "<br/>");
  });
}

function updateLangButtons(){
  const lang = getLang();
  document.querySelectorAll(".lang__btn").forEach(b=>{
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });
}

/* =========================
   CART (localStorage)
========================= */
function loadCart(){
  try{
    return JSON.parse(localStorage.getItem("cart")||"{}");
  }catch{ return {}; }
}
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
function cartCount(cart = loadCart()){
  return Object.values(cart).reduce((s, n)=>s + n, 0);
}
function updateCartCount(){
  const el = document.getElementById("cartCount");
  if(!el) return;
  el.textContent = String(cartCount());
}
function addToCart(productId, qty=1){
  const cart = loadCart();
  cart[productId] = (cart[productId]||0) + qty;
  if(cart[productId] < 1) delete cart[productId];
  saveCart(cart);
}
function setQty(productId, qty){
  const cart = loadCart();
  if(qty <= 0) delete cart[productId];
  else cart[productId] = qty;
  saveCart(cart);
}

/* =========================
   COMMON INIT
========================= */
function initHeader(){
  // lang buttons
  document.querySelectorAll(".lang__btn").forEach(btn=>{
    btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
  });

  // inject social links if present
  const tg = document.querySelector('[data-social="telegram"]');
  const ig = document.querySelector('[data-social="instagram"]');
  const tt = document.querySelector('[data-social="tiktok"]');
  if(tg) tg.href = SOCIAL.telegram;
  if(ig) ig.href = SOCIAL.instagram;
  if(tt) tt.href = SOCIAL.tiktok;

  applyI18n();
  updateLangButtons();
  updateCartCount();
}

/* =========================
   CATALOG PAGE
========================= */
function renderCatalog(){
  const mount = document.getElementById("catalogGrid");
  if(!mount) return;

  let filter = "all";

  const buttons = document.querySelectorAll("[data-filter]");
  buttons.forEach(b=>{
    b.addEventListener("click", ()=>{
      filter = b.dataset.filter;
      buttons.forEach(x=>x.classList.toggle("is-active", x===b));
      draw();
    });
  });

  function draw(){
    mount.innerHTML = "";
    const list = PRODUCTS.filter(p=>{
      if(filter === "all") return true;
      if(filter === "3") return p.weight === "3kg" || p.weight === "5kg";
      if(filter === "10") return p.weight === "10kg";
      return true;
    });

    list.forEach(p=>{
      const card = document.createElement("div");
      card.className = "card product";

      card.innerHTML = `
        <div class="product__imgWrap">
          <img class="product__img" src="${p.img}" alt="${p.name}" loading="lazy" />
        </div>

        <div class="product__title">${p.name}</div>
        <div class="product__meta">
          <span>${p.weight}</span>
          <span>${p.price} грн</span>
        </div>

        <div class="product__bottom">
          <div class="qty" data-qty="${p.id}">
            <button type="button" data-dec>-</button>
            <span>1</span>
            <button type="button" data-inc>+</button>
          </div>
          <button class="btn btn--gold" type="button" data-add="${p.id}" data-i18n="to_cart">В корзину</button>
        </div>
      `;

      mount.appendChild(card);

      // qty handlers
      const qtyWrap = card.querySelector(`[data-qty="${p.id}"]`);
      const qtySpan = qtyWrap.querySelector("span");
      let q = 1;

      qtyWrap.querySelector("[data-dec]").addEventListener("click", ()=>{
        q = Math.max(1, q-1);
        qtySpan.textContent = String(q);
      });
      qtyWrap.querySelector("[data-inc]").addEventListener("click", ()=>{
        q = Math.min(99, q+1);
        qtySpan.textContent = String(q);
      });

      card.querySelector(`[data-add="${p.id}"]`).addEventListener("click", ()=>{
        addToCart(p.id, q);
      });
    });

    applyI18n();
  }

  draw();

  // buttons bottom
  const go = document.getElementById("goCartBtn");
  const ch = document.getElementById("checkoutBtn");
  if(go) go.addEventListener("click", ()=> location.href="cart.html");
  if(ch) ch.addEventListener("click", ()=> location.href="checkout.html");
}

/* =========================
   CART PAGE
========================= */
function renderCartPage(){
  const mount = document.getElementById("cartTable");
  if(!mount) return;

  const totalEl = document.getElementById("cartTotal");
  const emptyEl = document.getElementById("cartEmpty");

  function calcTotal(cart){
    let total = 0;
    for(const [id, qty] of Object.entries(cart)){
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) continue;
      total += p.price * qty;
    }
    return total;
  }

  function draw(){
    const cart = loadCart();
    const items = Object.entries(cart);

    if(items.length === 0){
      if(emptyEl) emptyEl.style.display = "block";
      mount.innerHTML = "";
      if(totalEl) totalEl.textContent = "0 грн";
      return;
    }
    if(emptyEl) emptyEl.style.display = "none";

    mount.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>Товар</th>
            <th>К-сть</th>
            <th>Ціна</th>
            <th>Сума</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    const tbody = mount.querySelector("tbody");

    items.forEach(([id, qty])=>{
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) return;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><b>${p.name}</b><div class="muted">${p.weight}</div></td>
        <td>
          <div class="qty">
            <button type="button" data-dec>-</button>
            <span>${qty}</span>
            <button type="button" data-inc>+</button>
          </div>
        </td>
        <td>${p.price} грн</td>
        <td><b>${p.price * qty} грн</b></td>
        <td class="rowActions">
          <button class="btn btn--dark" type="button" data-remove>Удалить</button>
        </td>
      `;

      const qtyWrap = tr.querySelector(".qty");
      const qtySpan = qtyWrap.querySelector("span");

      qtyWrap.querySelector("[data-dec]").addEventListener("click", ()=>{
        const n = Math.max(1, (loadCart()[id]||1) - 1);
        setQty(id, n);
        qtySpan.textContent = String(n);
        draw();
      });
      qtyWrap.querySelector("[data-inc]").addEventListener("click", ()=>{
        const n = Math.min(99, (loadCart()[id]||1) + 1);
        setQty(id, n);
        qtySpan.textContent = String(n);
        draw();
      });

      tr.querySelector("[data-remove]").addEventListener("click", ()=>{
        setQty(id, 0);
        draw();
      });

      tbody.appendChild(tr);
    });

    if(totalEl) totalEl.textContent = `${calcTotal(loadCart())} грн`;
  }

  draw();

  const checkout = document.getElementById("toCheckout");
  if(checkout) checkout.addEventListener("click", ()=> location.href="checkout.html");
}

/* =========================
   CHECKOUT PAGE (total + delivery buttons)
========================= */
function renderCheckout(){
  const totalEl = document.getElementById("checkoutTotal");
  if(!totalEl) return;

  // total
  const cart = loadCart();
  let total = 0;
  for(const [id, qty] of Object.entries(cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) total += p.price * qty;
  }
  totalEl.textContent = `${total} грн`;

  // delivery buttons
  let deliveryType = "branch"; // branch | locker | courier
  const btns = document.querySelectorAll("[data-delivery]");
  const whRow = document.getElementById("warehouseRow");

  function setDelivery(type){
    deliveryType = type;
    btns.forEach(b=>b.classList.toggle("is-active", b.dataset.delivery===type));
    if(whRow) whRow.style.display = (type==="courier") ? "none" : "block";
  }
  btns.forEach(b=> b.addEventListener("click", ()=> setDelivery(b.dataset.delivery)));
  setDelivery("branch");

  // Nova Poshta подсказки (опционально)
  const cityInput = document.getElementById("cityInput");
  const whInput = document.getElementById("warehouseInput");

  async function npRequest(modelName, calledMethod, methodProps){
    if(!NOVA_POSHTA_KEY) return null;
    const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        apiKey: NOVA_POSHTA_KEY,
        modelName,
        calledMethod,
        methodProperties: methodProps
      })
    });
    return await res.json();
  }

  // простая подсказка через datalist
  const cityList = document.getElementById("cityList");
  const whList = document.getElementById("whList");
  let cityRef = "";

  if(cityInput && cityList){
    cityInput.addEventListener("input", async ()=>{
      cityList.innerHTML = "";
      cityRef = "";
      const q = cityInput.value.trim();
      if(q.length < 2) return;

      const data = await npRequest("Address", "searchSettlements", { CityName: q, Limit: "10" });
      const arr = data?.data?.[0]?.Addresses || [];
      arr.forEach(item=>{
        const opt = document.createElement("option");
        opt.value = item.Present;
        opt.dataset.ref = item.DeliveryCity;
        cityList.appendChild(opt);
      });
    });

    cityInput.addEventListener("change", ()=>{
      // найти выбранный ref
      const v = cityInput.value.trim();
      const opt = Array.from(cityList.children).find(o=>o.value===v);
      cityRef = opt?.dataset?.ref || "";
      if(whInput) whInput.value = "";
      if(whList) whList.innerHTML = "";
    });
  }

  if(whInput && whList){
    whInput.addEventListener("input", async ()=>{
      whList.innerHTML = "";
      const q = whInput.value.trim();
      if(q.length < 1) return;
      if(!cityRef) return;

      const typeOfWh = (deliveryType === "locker") ? "Postomat" : "Branch";
      const data = await npRequest("Address", "getWarehouses", {
        CityRef: cityRef,
        TypeOfWarehouseRef: typeOfWh,
        FindByString: q,
        Limit: "15"
      });

      const arr = data?.data || [];
      arr.forEach(item=>{
        const opt = document.createElement("option");
        opt.value = item.Description;
        whList.appendChild(opt);
      });
    });
  }

  // send order (mailto)
  const sendBtn = document.getElementById("sendOrder");
  if(sendBtn){
    sendBtn.addEventListener("click", ()=>{
      const fio = (document.getElementById("fioInput")?.value || "").trim();
      const phone = (document.getElementById("phoneInput")?.value || "").trim();
      const city = (cityInput?.value || "").trim();
      const wh = (whInput?.value || "").trim();
      const comment = (document.getElementById("commentInput")?.value || "").trim();

      const items = Object.entries(loadCart()).map(([id, qty])=>{
        const p = PRODUCTS.find(x=>x.id===id);
        return p ? `${p.name} (${p.weight}) x${qty} = ${p.price*qty} грн` : "";
      }).filter(Boolean).join("\n");

      const deliveryText =
        deliveryType === "courier" ? "Курʼєр" :
        deliveryType === "locker" ? "Поштомат" : "Відділення";

      const body =
`Замовлення BLACKWOOD • CHARCOAL

ПІБ: ${fio}
Телефон: ${phone}

Доставка: ${deliveryText}
Місто: ${city}
${deliveryType==="courier" ? "" : `Відділення/Поштомат: ${wh}\n`}

Товари:
${items}

Разом: ${total} грн

Коментар: ${comment}
`;

      const subject = `Замовлення BLACKWOOD • CHARCOAL — ${fio || "клієнт"}`;
      const mailto = `mailto:${encodeURIComponent(ORDER_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
}

/* =========================
   BOOT
========================= */
document.addEventListener("DOMContentLoaded", ()=>{
  initHeader();
  renderCatalog();
  renderCartPage();
  renderCheckout();
});
