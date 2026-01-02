/* BLACKWOOD — single JS for all pages (catalog/cart/checkout/lang) */

const NOVA_POSHTA_API_KEY = "e2d2f807d2464e81aae678bb51c9c569"; // ты дал ключ

const PRODUCTS = [
  {
    id: "core-3kg",
    name: "CORE • 3 KG",
    weight: "3kg",
    price: 399,
    img: "img/products/core-3kg.png"
  },
  {
    id: "core-5kg",
    name: "CORE • 5 KG",
    weight: "5kg",
    price: 499,
    img: "img/products/core-5kg.png"
  },
  {
    id: "core-10kg",
    name: "CORE • 10 KG",
    weight: "10kg",
    price: 599,
    img: "img/products/core-10kg.png"
  },
];

const LS_CART = "bw_cart_v1";
const LS_LANG = "bw_lang_v1";
const DEFAULT_LANG = "RU";

const I18N = {
  RU: {
    nav_home: "Главная",
    nav_catalog: "Каталог",
    nav_shipping: "Доставка",
    nav_about: "О нас",
    nav_contacts: "Контакты",
    cart: "Корзина",
    hero_kicker: "Премиум уголь для гриля",
    hero_title: "PREMIUM<br/>HARDWOOD<br/>CHARCOAL",
    hero_desc: "Длительное горение, минимум пепла, чистый жар. Идеально для BBQ и гриля.",
    btn_open_catalog: "Открыть каталог",
    btn_shipping_pay: "Доставка и оплата",
    btn_go_cart: "Перейти в корзину",
    catalog_title: "Товары",
    catalog_sub: "Выберите вес и добавьте в корзину.",
    filter_all: "All",
    filter_3_5: "3–5kg",
    filter_10: "10kg",
    sort_label: "Sort",
    sort_popular: "Popular",
    btn_to_cart: "В корзину",
    btn_checkout: "Оформить заказ",
    btn_cart_page: "Перейти в корзину",
    cart_title: "Корзина",
    cart_empty: "Корзина пустая.",
    checkout_title: "Оформление заказа",
    total: "Итого",
    fio: "ФИО",
    phone: "Телефон",
    city: "Город",
    delivery: "Доставка",
    delivery_branch: "Отделение",
    delivery_locker: "Почтомат",
    delivery_courier: "Курьер",
    branch: "Отделение / Почтомат",
    address: "Адрес (для курьера)",
    pay: "Оплата",
    pay_cod: "Наличными при получении",
    comment: "Комментарий",
    send: "Отправить заказ",
    hint_np: "Подсказки подтягиваются с Новой Почты.",
  },
  UKR: {
    nav_home: "Головна",
    nav_catalog: "Каталог",
    nav_shipping: "Доставка",
    nav_about: "Про нас",
    nav_contacts: "Контакти",
    cart: "Кошик",
    hero_kicker: "Преміум вугілля для гриля",
    hero_title: "PREMIUM<br/>HARDWOOD<br/>CHARCOAL",
    hero_desc: "Тривале горіння, мінімум попелу, чистий жар. Ідеально для BBQ та гриля.",
    btn_open_catalog: "Відкрити каталог",
    btn_shipping_pay: "Доставка та оплата",
    btn_go_cart: "Перейти в кошик",
    catalog_title: "Товари",
    catalog_sub: "Оберіть вагу та додайте в кошик.",
    filter_all: "All",
    filter_3_5: "3–5kg",
    filter_10: "10kg",
    sort_label: "Sort",
    sort_popular: "Popular",
    btn_to_cart: "В кошик",
    btn_checkout: "Оформити замовлення",
    btn_cart_page: "Перейти в кошик",
    cart_title: "Кошик",
    cart_empty: "Кошик порожній.",
    checkout_title: "Оформлення замовлення",
    total: "Разом",
    fio: "ПІБ",
    phone: "Телефон",
    city: "Місто",
    delivery: "Доставка",
    delivery_branch: "Відділення",
    delivery_locker: "Поштомат",
    delivery_courier: "Кур’єр",
    branch: "Відділення / Поштомат",
    address: "Адреса (для кур’єра)",
    pay: "Оплата",
    pay_cod: "Готівкою при отриманні",
    comment: "Коментар",
    send: "Надіслати замовлення",
    hint_np: "Підказки підтягуються з Нової Пошти.",
  },
  EN: {
    nav_home: "Home",
    nav_catalog: "Catalog",
    nav_shipping: "Shipping",
    nav_about: "About",
    nav_contacts: "Contacts",
    cart: "Cart",
    hero_kicker: "Premium charcoal for grilling",
    hero_title: "PREMIUM<br/>HARDWOOD<br/>CHARCOAL",
    hero_desc: "Long burn, low ash, clean heat. Perfect for BBQ & grill.",
    btn_open_catalog: "Open catalog",
    btn_shipping_pay: "Shipping & payment",
    btn_go_cart: "Go to cart",
    catalog_title: "Products",
    catalog_sub: "Choose weight and add to cart.",
    filter_all: "All",
    filter_3_5: "3–5kg",
    filter_10: "10kg",
    sort_label: "Sort",
    sort_popular: "Popular",
    btn_to_cart: "Add to cart",
    btn_checkout: "Checkout",
    btn_cart_page: "Go to cart",
    cart_title: "Cart",
    cart_empty: "Your cart is empty.",
    checkout_title: "Checkout",
    total: "Total",
    fio: "Full name",
    phone: "Phone",
    city: "City",
    delivery: "Delivery",
    delivery_branch: "Branch",
    delivery_locker: "Locker",
    delivery_courier: "Courier",
    branch: "Branch / Locker",
    address: "Address (courier)",
    pay: "Payment",
    pay_cod: "Cash on delivery",
    comment: "Comment",
    send: "Send order",
    hint_np: "Suggestions are fetched from Nova Poshta.",
  }
};

function getLang(){
  return localStorage.getItem(LS_LANG) || DEFAULT_LANG;
}
function setLang(lang){
  localStorage.setItem(LS_LANG, lang);
  applyI18n();
  updateHeaderCartCount();
}
function t(key){
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N[DEFAULT_LANG][key] || key);
}
function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    el.innerHTML = val;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    const key = el.getAttribute("data-i18n-ph");
    el.setAttribute("placeholder", t(key));
  });
  // lang buttons
  document.querySelectorAll(".lang button").forEach(b=>{
    b.classList.toggle("active", b.dataset.lang === getLang());
  });
}

function loadCart(){
  try{
    return JSON.parse(localStorage.getItem(LS_CART) || "{}");
  }catch{ return {}; }
}
function saveCart(cart){
  localStorage.setItem(LS_CART, JSON.stringify(cart));
  updateHeaderCartCount();
}
function cartCount(cart = loadCart()){
  return Object.values(cart).reduce((a,b)=>a + (b||0), 0);
}
function cartTotal(cart = loadCart()){
  let sum = 0;
  for(const [id, qty] of Object.entries(cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) sum += p.price * qty;
  }
  return sum;
}
function updateHeaderCartCount(){
  const el = document.querySelector("[data-cart-badge]");
  if(!el) return;
  const count = cartCount();
  el.textContent = `${t("cart")} • ${count}`;
}

/* ---------- Catalog ---------- */

function renderCatalog(){
  const grid = document.querySelector("[data-catalog-grid]");
  if(!grid) return;

  let activeFilter = "all"; // all | 3-5 | 10
  const filterButtons = document.querySelectorAll("[data-filter]");

  function getFiltered(){
    if(activeFilter === "all") return PRODUCTS;
    if(activeFilter === "3-5") return PRODUCTS.filter(p=>p.weight==="3kg" || p.weight==="5kg");
    if(activeFilter === "10") return PRODUCTS.filter(p=>p.weight==="10kg");
    return PRODUCTS;
  }

  function draw(){
    const cart = loadCart();
    grid.innerHTML = "";

    const items = getFiltered();

    items.forEach(p=>{
      const qty = cart[p.id] || 0;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="cardMedia">
          <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.15'; this.style.filter='grayscale(1)';">
        </div>
        <div class="cardBody">
          <div class="cardTop">
            <div>
              <div class="cardTitle">${p.name}</div>
              <div class="cardMeta">${p.weight}</div>
            </div>
            <div class="price">${p.price} грн</div>
          </div>

          <div class="cardBottom">
            <div class="qty">
              <button type="button" data-dec="${p.id}">−</button>
              <span data-qty="${p.id}">${Math.max(1, qty || 1)}</span>
              <button type="button" data-inc="${p.id}">+</button>
            </div>
            <button class="btn primary" type="button" data-add="${p.id}" data-label="${t("btn_to_cart")}">${t("btn_to_cart")}</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Bind qty
    grid.querySelectorAll("[data-inc]").forEach(b=>{
      b.addEventListener("click", ()=>{
        const id = b.dataset.inc;
        const span = grid.querySelector(`[data-qty="${id}"]`);
        span.textContent = String((parseInt(span.textContent,10) || 1) + 1);
      });
    });
    grid.querySelectorAll("[data-dec]").forEach(b=>{
      b.addEventListener("click", ()=>{
        const id = b.dataset.dec;
        const span = grid.querySelector(`[data-qty="${id}"]`);
        const v = (parseInt(span.textContent,10) || 1);
        span.textContent = String(Math.max(1, v - 1));
      });
    });

    // Add to cart
    grid.querySelectorAll("[data-add]").forEach(b=>{
      b.addEventListener("click", ()=>{
        const id = b.dataset.add;
        const span = grid.querySelector(`[data-qty="${id}"]`);
        const want = parseInt(span.textContent,10) || 1;

        const cart = loadCart();
        cart[id] = (cart[id] || 0) + want;
        saveCart(cart);
      });
    });
  }

  filterButtons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      activeFilter = btn.dataset.filter;
      filterButtons.forEach(x=>x.classList.toggle("active", x===btn));
      draw();
    });
  });

  draw();
}

/* ---------- Cart page ---------- */

function renderCartPage(){
  const list = document.querySelector("[data-cart-list]");
  const totalEl = document.querySelector("[data-cart-total]");
  if(!list || !totalEl) return;

  function draw(){
    const cart = loadCart();
    const ids = Object.keys(cart).filter(id=>cart[id]>0);

    list.innerHTML = "";

    if(ids.length === 0){
      list.innerHTML = `<div class="card" style="padding:16px">${t("cart_empty")}</div>`;
      totalEl.textContent = `0 грн`;
      return;
    }

    ids.forEach(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) return;
      const qty = cart[id];

      const row = document.createElement("div");
      row.className = "cartRow";
      row.innerHTML = `
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="cartInfo">
          <div class="name">${p.name}</div>
          <div class="sub">${p.price} грн × ${qty} = <b>${p.price*qty} грн</b></div>
        </div>
        <div class="cartRight">
          <div class="qty">
            <button type="button" data-dec="${id}">−</button>
            <span>${qty}</span>
            <button type="button" data-inc="${id}">+</button>
          </div>
          <button class="btn" type="button" data-del="${id}">✕</button>
        </div>
      `;
      list.appendChild(row);
    });

    totalEl.textContent = `${cartTotal(loadCart())} грн`;

    list.querySelectorAll("[data-inc]").forEach(b=>{
      b.addEventListener("click", ()=>{
        const id = b.dataset.inc;
        const cart = loadCart();
        cart[id] = (cart[id] || 0) + 1;
        saveCart(cart);
        draw();
      });
    });
    list.querySelectorAll("[data-dec]").forEach(b=>{
      b.addEventListener("click", ()=>{
        const id = b.dataset.dec;
        const cart = loadCart();
        cart[id] = Math.max(0, (cart[id] || 0) - 1);
        saveCart(cart);
        draw();
      });
    });
    list.querySelectorAll("[data-del]").forEach(b=>{
      b.addEventListener("click", ()=>{
        const id = b.dataset.del;
        const cart = loadCart();
        delete cart[id];
        saveCart(cart);
        draw();
      });
    });
  }

  draw();
}

/* ---------- Nova Poshta (cities + warehouses) ---------- */

async function npRequest(modelName, calledMethod, methodProperties){
  const r = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      apiKey: NOVA_POSHTA_API_KEY,
      modelName,
      calledMethod,
      methodProperties
    })
  });
  const data = await r.json();
  if(!data || data.success !== true) return [];
  return data.data || [];
}

function setupCheckout(){
  const totalEl = document.querySelector("[data-checkout-total]");
  if(!totalEl) return;

  // total
  totalEl.textContent = `${cartTotal()} грн`;

  const cityInput = document.querySelector("#npCity");
  const cityList = document.querySelector("#npCityList");

  const whInput = document.querySelector("#npWh");
  const whList = document.querySelector("#npWhList");

  const courierAddress = document.querySelector("#courierAddress");

  let selectedCityRef = null;
  let deliveryType = "branch"; // branch | locker | courier

  function setDeliveryType(type){
    deliveryType = type;
    document.querySelectorAll("[data-delivery-type]").forEach(b=>{
      b.classList.toggle("active", b.dataset.deliveryType === type);
    });

    // show/hide fields
    const whWrap = document.querySelector("[data-wh-wrap]");
    const addrWrap = document.querySelector("[data-addr-wrap]");
    if(type === "courier"){
      whWrap.style.display = "none";
      addrWrap.style.display = "";
    }else{
      whWrap.style.display = "";
      addrWrap.style.display = "none";
    }

    // reload warehouses if city already selected
    if(selectedCityRef && type !== "courier"){
      fetchWarehouses(whInput.value || "");
    }
  }

  async function fetchCities(q){
    if(!q || q.trim().length < 2){
      cityList.classList.remove("show");
      return;
    }
    const data = await npRequest("Address", "searchSettlements", {
      CityName: q.trim(),
      Limit: 20
    });

    const items = [];
    // data format: [{TotalCount, Addresses:[{Present, DeliveryCity, Warehouses, MainDescription, Area, Region}]}]
    for(const d of data){
      if(d.Addresses) items.push(...d.Addresses);
    }

    cityList.innerHTML = "";
    items.slice(0,20).forEach(it=>{
      const div = document.createElement("div");
      div.className = "suggestItem";
      div.textContent = it.Present;
      div.addEventListener("click", ()=>{
        cityInput.value = it.Present;
        selectedCityRef = it.DeliveryCity;
        cityList.classList.remove("show");
        // reset warehouse
        whInput.value = "";
        whList.innerHTML = "";
        if(deliveryType !== "courier") fetchWarehouses("");
      });
      cityList.appendChild(div);
    });

    if(items.length) cityList.classList.add("show");
    else cityList.classList.remove("show");
  }

  async function fetchWarehouses(q){
    if(!selectedCityRef){
      whList.classList.remove("show");
      return;
    }

    // WarehouseType: branch vs locker
    const typeRef = (deliveryType === "locker")
      ? "f9316480-5f2d-425d-bc2c-ac7cd29decf0" // Postomat
      : undefined; // all branches

    const data = await npRequest("Address", "getWarehouses", {
      CityRef: selectedCityRef,
      FindByString: (q||"").trim(),
      Limit: 50,
      ...(typeRef ? { TypeOfWarehouseRef: typeRef } : {})
    });

    whList.innerHTML = "";
    data.slice(0,50).forEach(w=>{
      const div = document.createElement("div");
      div.className = "suggestItem";
      div.textContent = w.Description;
      div.addEventListener("click", ()=>{
        whInput.value = w.Description;
        whList.classList.remove("show");
      });
      whList.appendChild(div);
    });

    if(data.length) whList.classList.add("show");
    else whList.classList.remove("show");
  }

  // Debounce
  let cityTimer = null;
  cityInput?.addEventListener("input", ()=>{
    selectedCityRef = null;
    clearTimeout(cityTimer);
    cityTimer = setTimeout(()=>fetchCities(cityInput.value), 250);
  });
  cityInput?.addEventListener("focus", ()=>fetchCities(cityInput.value));

  let whTimer = null;
  whInput?.addEventListener("input", ()=>{
    clearTimeout(whTimer);
    whTimer = setTimeout(()=>fetchWarehouses(whInput.value), 250);
  });
  whInput?.addEventListener("focus", ()=>fetchWarehouses(whInput.value));

  document.addEventListener("click", (e)=>{
    if(!cityList.contains(e.target) && e.target !== cityInput) cityList.classList.remove("show");
    if(!whList.contains(e.target) && e.target !== whInput) whList.classList.remove("show");
  });

  // Delivery buttons
  document.querySelectorAll("[data-delivery-type]").forEach(b=>{
    b.addEventListener("click", ()=>setDeliveryType(b.dataset.deliveryType));
  });
  setDeliveryType("branch");

  // Submit => mailto
  const form = document.querySelector("#checkoutForm");
  form?.addEventListener("submit", (e)=>{
    e.preventDefault();

    const cart = loadCart();
    const items = Object.entries(cart)
      .filter(([,q])=>q>0)
      .map(([id,q])=>{
        const p = PRODUCTS.find(x=>x.id===id);
        if(!p) return null;
        return `${p.name} — ${q} шт × ${p.price} грн = ${p.price*q} грн`;
      }).filter(Boolean);

    const fio = form.querySelector("#fio").value.trim();
    const phone = form.querySelector("#phone").value.trim();
    const city = cityInput.value.trim();
    const wh = whInput.value.trim();
    const addr = courierAddress.value.trim();
    const pay = form.querySelector("#pay").value;
    const comment = form.querySelector("#comment").value.trim();

    const sum = cartTotal(cart);

    const deliveryStr =
      deliveryType === "courier"
        ? `Курьер: ${city}, ${addr}`
        : (deliveryType === "locker"
            ? `Почтомат: ${city}, ${wh}`
            : `Отделение: ${city}, ${wh}`);

    const subject = encodeURIComponent(`BLACKWOOD заказ — ${fio} — ${sum} грн`);
    const body = encodeURIComponent(
`Заказ BLACKWOOD

Клиент: ${fio}
Телефон: ${phone}

Доставка: ${deliveryStr}
Оплата: ${pay}

Товары:
- ${items.join("\n- ")}

Итого: ${sum} грн

Комментарий:
${comment || "-"}

(сайт на GitHub Pages — отправка через mailto)`
    );

    // ВАЖНО: поставь сюда свой email
    const TO_EMAIL = "YOUR_EMAIL_HERE@example.com";
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
  });
}

/* ---------- Init ---------- */

function markActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a=>{
    const href = a.getAttribute("href");
    a.classList.toggle("active", href === path);
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  // lang buttons
  document.querySelectorAll(".lang button").forEach(b=>{
    b.addEventListener("click", ()=>setLang(b.dataset.lang));
  });

  applyI18n();
  markActiveNav();
  updateHeaderCartCount();

  renderCatalog();
  renderCartPage();
  setupCheckout();
});
