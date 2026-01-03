/* =========================
   BLACKWOOD • CHARCOAL
   app.js — catalog/cart/checkout + i18n
   ========================= */

const NP_KEY = "e2d2f807d2464e81aae678bb51c9c569"; // ⚠️ на статике ключ виден всем

const PRODUCTS = [
  {
    id: "core-3",
    name: "CORE • 3 KG",
    weight: "3 kg",
    price: 399,
    tag: "3-5kg",
    img: "img/products/core-3kg.png",
  },
  {
    id: "core-5",
    name: "CORE • 5 KG",
    weight: "5 kg",
    price: 499,
    tag: "3-5kg",
    img: "img/products/core-5kg.png",
  },
  {
    id: "core-10",
    name: "CORE • 10 KG",
    weight: "10 kg",
    price: 599,
    tag: "10kg",
    img: "img/products/core-10kg.png",
  }
];

const I18N = {
  UKR: {
    nav_home: "Головна",
    nav_catalog: "Каталог",
    nav_shipping: "Доставка",
    nav_about: "Про нас",
    nav_contacts: "Контакти",
    cart: "Кошик",
    hero_badge: "Преміум вугілля для гриля",
    hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
    hero_sub: "Тривале горіння, мінімум попелу, чистий жар. Ідеально для BBQ і гриля.",
    btn_catalog: "Відкрити каталог",
    btn_shipping: "Доставка та оплата",
    btn_cart: "Кошик",

    cat_title: "Товари",
    cat_sub: "Виберіть вагу та додайте в кошик.",
    sort: "Sort",
    to_cart: "Перейти в кошик",
    checkout: "Оформити замовлення",
    add: "В КОШИКУ",

    cart_title: "Кошик",
    cart_empty: "Кошик порожній.",
    total: "Разом",
    back_catalog: "Назад до каталогу",
    remove: "Видалити",

    checkout_title: "ОФОРМЛЕННЯ ЗАМОВЛЕННЯ",
    fio: "ПІБ",
    phone: "Телефон",
    city: "Місто",
    delivery: "Доставка",
    branch: "Відділення",
    postomat: "Поштомат",
    courier: "Курʼєр",
    address: "Адреса (для курʼєра)",
    warehouse: "Відділення / Поштомат",
    comment: "Коментар",
    pay: "Оплата",
    pay_cod: "Накладений платіж (при отриманні)",
    send: "Відправити замовлення",
    np_hint: "Підказки підтягуються з Нової Пошти.",
  },
  RU: {
    nav_home: "Главная",
    nav_catalog: "Каталог",
    nav_shipping: "Доставка",
    nav_about: "О нас",
    nav_contacts: "Контакты",
    cart: "Корзина",
    hero_badge: "Премиум уголь для гриля",
    hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
    hero_sub: "Длительное горение, минимум пепла, чистый жар. Идеально для BBQ и гриля.",
    btn_catalog: "Открыть каталог",
    btn_shipping: "Доставка и оплата",
    btn_cart: "Корзина",

    cat_title: "Товары",
    cat_sub: "Выберите вес и добавьте в корзину.",
    sort: "Sort",
    to_cart: "Перейти в корзину",
    checkout: "Оформить заказ",
    add: "В КОРЗИНУ",

    cart_title: "Корзина",
    cart_empty: "Корзина пуста.",
    total: "Итого",
    back_catalog: "Назад в каталог",
    remove: "Удалить",

    checkout_title: "ОФОРМЛЕНИЕ ЗАКАЗА",
    fio: "ФИО",
    phone: "Телефон",
    city: "Город",
    delivery: "Доставка",
    branch: "Отделение",
    postomat: "Почтомат",
    courier: "Курьер",
    address: "Адрес (для курьера)",
    warehouse: "Отделение / Почтомат",
    comment: "Комментарий",
    pay: "Оплата",
    pay_cod: "Наложенный платеж (при получении)",
    send: "Отправить заказ",
    np_hint: "Подсказки подтягиваются с Новой Почты.",
  },
  EN: {
    nav_home: "Home",
    nav_catalog: "Catalog",
    nav_shipping: "Shipping",
    nav_about: "About",
    nav_contacts: "Contacts",
    cart: "Cart",
    hero_badge: "Premium charcoal for grill",
    hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
    hero_sub: "Long heat, low ash, clean burn. Perfect for BBQ & grill.",
    btn_catalog: "Open catalog",
    btn_shipping: "Shipping & payment",
    btn_cart: "Cart",

    cat_title: "Products",
    cat_sub: "Choose weight and add to cart.",
    sort: "Sort",
    to_cart: "Go to cart",
    checkout: "Checkout",
    add: "ADD",

    cart_title: "Cart",
    cart_empty: "Cart is empty.",
    total: "Total",
    back_catalog: "Back to catalog",
    remove: "Remove",

    checkout_title: "CHECKOUT",
    fio: "Full name",
    phone: "Phone",
    city: "City",
    delivery: "Delivery",
    branch: "Branch",
    postomat: "Postomat",
    courier: "Courier",
    address: "Address (courier)",
    warehouse: "Branch / Postomat",
    comment: "Comment",
    pay: "Payment",
    pay_cod: "Cash on delivery",
    send: "Send order",
    np_hint: "Hints are loaded from Nova Poshta.",
  }
};

function getLang(){
  return localStorage.getItem("bw_lang") || "UKR";
}

function setLang(lang){
  localStorage.setItem("bw_lang", lang);
  applyI18n(lang);
}

function applyI18n(lang){
  const dict = I18N[lang] || I18N.UKR;

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(!key) return;
    const val = dict[key];
    if(val == null) return;

    if(el.hasAttribute("data-i18n-multiline")){
      el.innerHTML = String(val).replaceAll("\n","<br>");
    }else{
      el.textContent = val;
    }
  });

  const cartLabel = document.querySelector("[data-cart-label]");
  if(cartLabel){
    cartLabel.textContent = dict.cart || "Кошик";
  }
}

function setupLangButtons(){
  const saved = getLang();

  document.querySelectorAll("[data-lang]").forEach(btn=>{
    btn.classList.toggle("active", btn.getAttribute("data-lang")===saved);
    btn.addEventListener("click", ()=>{
      const lang = btn.getAttribute("data-lang");
      document.querySelectorAll("[data-lang]").forEach(b=>
        b.classList.toggle("active", b.getAttribute("data-lang")===lang)
      );
      setLang(lang);
    });
  });

  applyI18n(saved);
}

/* ========== CART ========== */
function loadCart(){
  try{
    return JSON.parse(localStorage.getItem("bw_cart") || "{}");
  }catch{
    return {};
  }
}
function saveCart(cart){
  localStorage.setItem("bw_cart", JSON.stringify(cart));
  updateCartCount();
}
function cartCount(){
  const cart = loadCart();
  return Object.values(cart).reduce((a,b)=>a + (Number(b)||0), 0);
}
function cartTotal(){
  const cart = loadCart();
  let sum = 0;
  for(const [id, qty] of Object.entries(cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) sum += p.price * Number(qty);
  }
  return sum;
}
function updateCartCount(){
  const el = document.querySelector("[data-cart-count]");
  if(el) el.textContent = String(cartCount());
}

function addToCart(id, qty){
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + qty;
  if(cart[id] <= 0) delete cart[id];
  saveCart(cart);
}

/* ========== CATALOG RENDER ========== */
function renderCatalog(){
  const grid = document.querySelector("[data-catalog-grid]");
  if(!grid) return;

  const dict = I18N[getLang()] || I18N.UKR;

  let filter = "all";
  const pills = document.querySelectorAll("[data-filter]");
  pills.forEach(p=>{
    p.addEventListener("click", ()=>{
      pills.forEach(x=>x.classList.remove("active"));
      p.classList.add("active");
      filter = p.getAttribute("data-filter") || "all";
      draw();
    });
  });

  const sortSel = document.querySelector("[data-sort]");
  if(sortSel){
    sortSel.addEventListener("change", ()=>draw());
  }

  function draw(){
    let items = [...PRODUCTS];
    if(filter !== "all"){
      items = items.filter(p=>p.tag === filter);
    }
    if(sortSel){
      const v = sortSel.value;
      if(v === "price_asc") items.sort((a,b)=>a.price-b.price);
      if(v === "price_desc") items.sort((a,b)=>b.price-a.price);
      if(v === "weight") items.sort((a,b)=>parseInt(a.weight)-parseInt(b.weight));
    }

    grid.innerHTML = items.map(p=>cardHTML(p, dict.add)).join("");

    grid.querySelectorAll("[data-qty-minus]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-qty-minus");
        const span = grid.querySelector(`[data-qty-val="${id}"]`);
        const v = Math.max(1, Number(span.textContent||"1")-1);
        span.textContent = String(v);
      });
    });

    grid.querySelectorAll("[data-qty-plus]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-qty-plus");
        const span = grid.querySelector(`[data-qty-val="${id}"]`);
        const v = Math.max(1, Number(span.textContent||"1")+1);
        span.textContent = String(v);
      });
    });

    grid.querySelectorAll("[data-add]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-add");
        const span = grid.querySelector(`[data-qty-val="${id}"]`);
        const qty = Math.max(1, Number(span?.textContent||"1"));
        addToCart(id, qty);
      });
    });
  }

  draw();
}

function cardHTML(p, addText){
  // ВАЖНО: img путь как в твоей структуре: img/products/...
  return `
  <div class="card">
    <div class="cardMedia">
      <img src="${p.img}" alt="${escapeHtml(p.name)}">
    </div>
    <div class="cardTitle">${escapeHtml(p.name)}</div>
    <div class="cardMeta">
      <div>${escapeHtml(p.weight)}</div>
      <div class="price">${p.price} грн</div>
    </div>
    <div class="qtyRow">
      <div class="qty">
        <button type="button" data-qty-minus="${p.id}">−</button>
        <span data-qty-val="${p.id}">1</span>
        <button type="button" data-qty-plus="${p.id}">+</button>
      </div>
      <button class="btn primary" type="button" data-add="${p.id}">${addText}</button>
    </div>
  </div>
  `;
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

/* ========== CART PAGE RENDER ========== */
function renderCartPage(){
  const list = document.querySelector("[data-cart-list]");
  const sumEl = document.querySelector("[data-cart-sum]");
  const emptyEl = document.querySelector("[data-cart-empty]");
  if(!list || !sumEl || !emptyEl) return;

  const dict = I18N[getLang()] || I18N.UKR;

  const cart = loadCart();
  const ids = Object.keys(cart);

  if(ids.length === 0){
    emptyEl.classList.remove("hidden");
    list.innerHTML = "";
    sumEl.textContent = "0 грн";
    return;
  }
  emptyEl.classList.add("hidden");

  list.innerHTML = ids.map(id=>{
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return "";
    const qty = Number(cart[id]||0);
    const subtotal = qty * p.price;

    return `
      <div class="card cartItem">
        <div class="thumb"><img src="${p.img}" alt="${escapeHtml(p.name)}"></div>
        <div>
          <div class="name">${escapeHtml(p.name)}</div>
          <div class="sub">${qty} × ${p.price} грн = <b>${subtotal} грн</b></div>
          <div class="sub">${escapeHtml(p.weight)}</div>
        </div>
        <div class="rightCol">
          <div class="qty">
            <button type="button" data-cart-minus="${p.id}">−</button>
            <span data-cart-val="${p.id}">${qty}</span>
            <button type="button" data-cart-plus="${p.id}">+</button>
          </div>
          <button class="remove" type="button" data-remove="${p.id}">${dict.remove}</button>
        </div>
      </div>
    `;
  }).join("");

  function refresh(){
    sumEl.textContent = `${cartTotal()} грн`;
  }
  refresh();

  list.querySelectorAll("[data-cart-minus]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-cart-minus");
      addToCart(id, -1);
      renderCartPage();
    });
  });
  list.querySelectorAll("[data-cart-plus]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-cart-plus");
      addToCart(id, 1);
      renderCartPage();
    });
  });
  list.querySelectorAll("[data-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-remove");
      const cart = loadCart();
      delete cart[id];
      saveCart(cart);
      renderCartPage();
    });
  });
}

/* ========== CHECKOUT ========== */
async function npRequest(modelName, calledMethod, methodProperties){
  const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      apiKey: NP_KEY,
      modelName,
      calledMethod,
      methodProperties
    })
  });
  return await res.json();
}

function renderCheckout(){
  const form = document.querySelector("[data-checkout-form]");
  if(!form) return;

  const totalEl = document.querySelector("[data-checkout-total]");
  if(totalEl) totalEl.textContent = `${cartTotal()} грн`;

  // delivery type buttons
  const btnBranch = document.querySelector("[data-delivery=branch]");
  const btnPost = document.querySelector("[data-delivery=postomat]");
  const btnCourier = document.querySelector("[data-delivery=courier]");
  const blockWarehouse = document.querySelector("[data-block=warehouse]");
  const blockAddress = document.querySelector("[data-block=address]");

  let deliveryType = "branch";

  function setDelivery(type){
    deliveryType = type;
    [btnBranch, btnPost, btnCourier].forEach(b=>b && b.classList.remove("active"));
    if(type==="branch" && btnBranch) btnBranch.classList.add("active");
    if(type==="postomat" && btnPost) btnPost.classList.add("active");
    if(type==="courier" && btnCourier) btnCourier.classList.add("active");

    if(blockWarehouse) blockWarehouse.classList.toggle("hidden", type==="courier");
    if(blockAddress) blockAddress.classList.toggle("hidden", type!=="courier");
  }

  btnBranch?.addEventListener("click", ()=>setDelivery("branch"));
  btnPost?.addEventListener("click", ()=>setDelivery("postomat"));
  btnCourier?.addEventListener("click", ()=>setDelivery("courier"));
  setDelivery("branch");

  // NP city hints
  const cityInput = document.querySelector("[data-city]");
  const cityList = document.querySelector("[data-city-list]");
  const whSelect = document.querySelector("[data-warehouse]");
  let currentCityRef = "";

  let cityTimer = null;
  cityInput?.addEventListener("input", ()=>{
    clearTimeout(cityTimer);
    const q = cityInput.value.trim();
    if(q.length < 2) return;

    cityTimer = setTimeout(async ()=>{
      try{
        const data = await npRequest("Address", "searchSettlements", {
          CityName: q,
          Limit: 10
        });

        const arr = data?.data?.[0]?.Addresses || [];
        if(cityList){
          cityList.innerHTML = arr.map(x=>{
            const label = `${x.Present}`;
            // value делаем строкой, а Ref храним в data-атрибуте через отдельный массив ниже
            return `<option value="${escapeHtml(label)}"></option>`;
          }).join("");
        }

        // сохраним Ref по точному совпадению, когда пользователь выберет вариант
        const map = new Map(arr.map(x=>[x.Present, x.DeliveryCity]));
        // при blur/enter — пытаемся привязать
        const bindCityRef = ()=>{
          currentCityRef = map.get(cityInput.value) || "";
          if(currentCityRef) loadWarehouses();
        };
        cityInput.onchange = bindCityRef;
        cityInput.onblur = bindCityRef;

      }catch(e){
        // тихо
      }
    }, 250);
  });

  async function loadWarehouses(){
    if(!whSelect) return;
    whSelect.innerHTML = `<option value="">...</option>`;

    try{
      // Warehouses by cityRef:
      const data = await npRequest("AddressGeneral", "getWarehouses", {
        CityRef: currentCityRef,
        Limit: 200,
        Language: "UA"
      });

      let list = (data?.data || []);

      // фильтр под тип доставки
      if(deliveryType === "postomat"){
        list = list.filter(w => String(w.TypeOfWarehouse||"").includes("Postomat") || String(w.CategoryOfWarehouse||"").toLowerCase().includes("postomat"));
      } else if(deliveryType === "branch"){
        // обычные отделения: отсекаем постоматы
        list = list.filter(w => !(String(w.TypeOfWarehouse||"").includes("Postomat") || String(w.CategoryOfWarehouse||"").toLowerCase().includes("postomat")));
      }

      whSelect.innerHTML = `<option value="">Выберите...</option>` + list.slice(0,120).map(w=>{
        const label = w.Description || w.DescriptionRu || w.DescriptionEn || "Warehouse";
        const ref = w.Ref || "";
        return `<option value="${escapeHtml(ref)}">${escapeHtml(label)}</option>`;
      }).join("");
    }catch(e){
      // тихо
    }
  }

  // когда меняем тип доставки — подгружаем отделения заново
  [btnBranch, btnPost].forEach(b=>{
    b?.addEventListener("click", ()=>{
      if(currentCityRef) loadWarehouses();
    });
  });

  // submit => mailto
  form.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    const fio = (document.querySelector("[data-fio]")?.value || "").trim();
    const phone = (document.querySelector("[data-phone]")?.value || "").trim();
    const city = (cityInput?.value || "").trim();
    const pay = (document.querySelector("[data-pay]")?.value || "").trim();
    const comment = (document.querySelector("[data-comment]")?.value || "").trim();

    const whRef = (whSelect?.value || "").trim();
    const whText = whSelect?.selectedOptions?.[0]?.textContent?.trim() || "";

    const address = (document.querySelector("[data-address]")?.value || "").trim();

    const cart = loadCart();
    const lines = [];
    for(const [id, qty] of Object.entries(cart)){
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) continue;
      lines.push(`${p.name} — ${qty} × ${p.price} грн = ${Number(qty)*p.price} грн`);
    }

    const total = cartTotal();

    const deliveryLine =
      deliveryType === "courier"
        ? `Курʼєр: ${address}`
        : (deliveryType === "postomat"
            ? `Поштомат: ${whText}`
            : `Відділення: ${whText}`);

    const subject = encodeURIComponent(`BLACKWOOD • заказ на ${total} грн`);
    const body = encodeURIComponent(
`Новый заказ BLACKWOOD

ФИО: ${fio}
Телефон: ${phone}
Город: ${city}
Доставка: ${deliveryLine}
Оплата: ${pay}

Товары:
${lines.join("\n")}

ИТОГО: ${total} грн

Комментарий:
${comment}`
    );

    // ЗАМЕНИ тут email на свой
    const EMAIL_TO = "your-email@gmail.com";
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  });
}

/* ========== INIT ========== */
document.addEventListener("DOMContentLoaded", ()=>{
  setupLangButtons();
  updateCartCount();
  renderCatalog();
  renderCartPage();
  renderCheckout();

  // active nav
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if(href === path) a.classList.add("active");
  });
});
