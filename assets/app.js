/* ====== i18n ====== */
const I18N = {
  ru:{
    nav_home:"Главная",
    nav_catalog:"Каталог",
    nav_cart:"Корзина",
    nav_shipping:"Доставка",
    nav_about:"О нас",
    nav_contacts:"Контакты",

    hero_title:"PREMIUM<br>HARDWOOD<br>CHARCOAL",
    hero_sub:"Длительное горение, минимум пепла, чистый жар. Идеально для BBQ и гриля.",
    open_catalog:"Открыть каталог",
    go_cart:"Перейти в корзину",
    go_shipping:"Доставка и оплата",

    products:"Товары",
    products_note:"Выберите вес и добавьте в корзину.",
    price_stub:"— грн",
    add_to_cart:"В корзину",
    added:"Добавлено в корзину",

    cart_title:"Корзина",
    cart_empty:"Корзина пуста",
    cart_items:"Товаров",
    cart_clear:"Очистить",
    cart_checkout:"Оформить заказ",
    cart_back:"Назад в каталог",

    checkout_title:"Оформление",
    checkout_sub:"Заполните данные — позже подключим оплату/отправку.",
    f_name:"Имя",
    f_phone:"Телефон",
    f_city:"Город",
    f_delivery:"Доставка",
    f_payment:"Оплата",
    f_comment:"Комментарий",
    delivery_np:"Нова Пошта",
    delivery_courier:"Курьер",
    delivery_pickup:"Самовывоз",
    pay_card:"Карта",
    pay_cod:"Наложенный платеж",
    pay_cash:"Наличные",
    place_order:"Оформить",
    need_cart:"Добавьте товары в корзину",

    success_title:"Заказ создан",
    success_sub:"Пока это демо (без отправки). Дальше можно подключить Telegram/оплату.",
    back_home:"На главную",

    ship_title:"Доставка и оплата",
    ship_sub:"Коротко: как доставляем и как оплачивать.",

    about_title:"О нас",
    about_sub:"Премиум-уголь для жаркого, чистого и стабильного жара.",

    contacts_title:"Контакты",
    contacts_sub:"Вставьте ваши реальные контакты.",

    footer:"Все права защищены."
  },

  uk:{
    nav_home:"Головна",
    nav_catalog:"Каталог",
    nav_cart:"Кошик",
    nav_shipping:"Доставка",
    nav_about:"Про нас",
    nav_contacts:"Контакти",

    hero_title:"PREMIUM<br>HARDWOOD<br>CHARCOAL",
    hero_sub:"Тривале горіння, мінімум попелу, чистий жар. Ідеально для BBQ та гриля.",
    open_catalog:"Відкрити каталог",
    go_cart:"Перейти до кошика",
    go_shipping:"Доставка та оплата",

    products:"Товари",
    products_note:"Оберіть вагу та додайте до кошика.",
    price_stub:"— грн",
    add_to_cart:"У кошик",
    added:"Додано до кошика",

    cart_title:"Кошик",
    cart_empty:"Кошик порожній",
    cart_items:"Товарів",
    cart_clear:"Очистити",
    cart_checkout:"Оформити замовлення",
    cart_back:"Назад до каталогу",

    checkout_title:"Оформлення",
    checkout_sub:"Заповніть дані — пізніше підключимо оплату/відправку.",
    f_name:"Ім’я",
    f_phone:"Телефон",
    f_city:"Місто",
    f_delivery:"Доставка",
    f_payment:"Оплата",
    f_comment:"Коментар",
    delivery_np:"Нова Пошта",
    delivery_courier:"Кур’єр",
    delivery_pickup:"Самовивіз",
    pay_card:"Картка",
    pay_cod:"Післяплата",
    pay_cash:"Готівка",
    place_order:"Оформити",
    need_cart:"Додайте товари в кошик",

    success_title:"Замовлення створено",
    success_sub:"Поки це демо (без відправки). Далі можна підключити Telegram/оплату.",
    back_home:"На головну",

    ship_title:"Доставка та оплата",
    ship_sub:"Коротко: як доставляємо та як оплачувати.",

    about_title:"Про нас",
    about_sub:"Преміум-вугілля для гарячого, чистого та стабільного жару.",

    contacts_title:"Контакти",
    contacts_sub:"Вставте ваші реальні контакти.",

    footer:"Усі права захищено."
  },

  en:{
    nav_home:"Home",
    nav_catalog:"Catalog",
    nav_cart:"Cart",
    nav_shipping:"Shipping",
    nav_about:"About",
    nav_contacts:"Contacts",

    hero_title:"PREMIUM<br>HARDWOOD<br>CHARCOAL",
    hero_sub:"Long-lasting heat, low ash, clean burn. Perfect for BBQ & grill.",
    open_catalog:"Open catalog",
    go_cart:"Go to cart",
    go_shipping:"Shipping & payment",

    products:"Products",
    products_note:"Choose weight and add to cart.",
    price_stub:"— UAH",
    add_to_cart:"Add to cart",
    added:"Added to cart",

    cart_title:"Cart",
    cart_empty:"Cart is empty",
    cart_items:"Items",
    cart_clear:"Clear",
    cart_checkout:"Checkout",
    cart_back:"Back to catalog",

    checkout_title:"Checkout",
    checkout_sub:"Fill your details — later we’ll connect payment/sending.",
    f_name:"Name",
    f_phone:"Phone",
    f_city:"City",
    f_delivery:"Delivery",
    f_payment:"Payment",
    f_comment:"Comment",
    delivery_np:"Nova Poshta",
    delivery_courier:"Courier",
    delivery_pickup:"Pickup",
    pay_card:"Card",
    pay_cod:"Cash on delivery",
    pay_cash:"Cash",
    place_order:"Place order",
    need_cart:"Add items to cart",

    success_title:"Order created",
    success_sub:"Demo only (no sending). Next we can connect Telegram/payment.",
    back_home:"Back home",

    ship_title:"Shipping & payment",
    ship_sub:"Quick overview: delivery and payment options.",

    about_title:"About",
    about_sub:"Premium charcoal for hot, clean and stable heat.",

    contacts_title:"Contacts",
    contacts_sub:"Put your real contacts here.",

    footer:"All rights reserved."
  }
};

const LANG_KEY = "bw_lang_v1";
const CART_KEY = "bw_cart_v1";
const ORDER_KEY = "bw_last_order_v1";

const $  = (s)=>document.querySelector(s);
const $$ = (s)=>Array.from(document.querySelectorAll(s));

function getLang(){
  return localStorage.getItem(LANG_KEY) || "ru";
}

function setLang(lang){
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = (lang==="uk"?"uk":lang==="en"?"en":"ru");

  $$("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if(I18N[lang] && I18N[lang][k] != null) el.innerHTML = I18N[lang][k];
  });

  ["ru","uk","en"].forEach(l=>{
    const b = $("#lang-"+l);
    if(b) b.classList.toggle("active", l===lang);
  });

  // update cart badge
  updateCartBadge();
}

function initLangButtons(){
  ["ru","uk","en"].forEach(l=>{
    const b = $("#lang-"+l);
    if(b) b.addEventListener("click", ()=>setLang(l));
  });
  setLang(getLang());
}

/* ====== Cart ====== */
function loadCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY) || "{}"); } catch { return {}; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function cartCount(cart){
  return Object.values(cart).reduce((a,b)=>a+(b.qty||0),0);
}
function updateCartBadge(){
  const cart = loadCart();
  const count = cartCount(cart);
  const badge = $("#cartCount");
  if(badge) badge.textContent = count;
}

function productsDB(){
  return {
    "core-3":  { img:"./img/products/core-3kg.png", title:"CORE • 3 KG", weight:3 },
    "core-5":  { img:"./img/products/core-5kg.png", title:"CORE • 5 KG", weight:5 },
    "core-10": { img:"./img/products/core-10kg.png", title:"CORE • 10 KG", weight:10 },
  };
}

function addToCart(id, qty){
  const cart = loadCart();
  if(!cart[id]) cart[id] = { qty:0 };
  cart[id].qty += qty;
  saveCart(cart);
  updateCartBadge();
  toast(I18N[getLang()].added);
}

function setQtyInCart(id, qty){
  const cart = loadCart();
  if(qty <= 0){
    delete cart[id];
  }else{
    cart[id] = cart[id] || {};
    cart[id].qty = qty;
  }
  saveCart(cart);
  updateCartBadge();
}

/* ====== Toast ====== */
let toastTimer = null;
function toast(text){
  const el = $("#toast");
  if(!el) return;
  el.textContent = text;
  el.classList.add("show");
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove("show"), 1200);
}

/* ====== Reveal animation ====== */
function initReveal(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },{threshold:0.14});
  $$(".reveal").forEach(el=>io.observe(el));
}

/* ====== Catalog page wiring ====== */
function initCatalogCards(){
  $$(".product-card[data-id]").forEach(card=>{
    const id = card.dataset.id;
    const minus = card.querySelector(".qtyMinus");
    const plus  = card.querySelector(".qtyPlus");
    const val   = card.querySelector(".qtyVal");
    const addBtn= card.querySelector(".addBtn");

    let qty = 1;

    minus?.addEventListener("click", ()=>{
      qty = Math.max(1, qty-1);
      val.textContent = qty;
    });
    plus?.addEventListener("click", ()=>{
      qty = Math.min(99, qty+1);
      val.textContent = qty;
    });
    addBtn?.addEventListener("click", ()=>{
      addToCart(id, qty);
      addBtn.style.transform = "scale(.98)";
      setTimeout(()=> addBtn.style.transform = "", 120);
      updateCartBadge();
    });
  });

  updateCartBadge();
}

/* ====== Cart page rendering ====== */
function renderCartPage(){
  const wrap = $("#cartList");
  if(!wrap) return;

  const lang = getLang();
  const cart = loadCart();
  const db = productsDB();
  const count = cartCount(cart);

  $("#cartCount") && ($("#cartCount").textContent = count);
  $("#itemsTotal") && ($("#itemsTotal").textContent = count);

  wrap.innerHTML = "";

  if(count === 0){
    wrap.innerHTML = `<div class="card"><div class="reveal in" style="color:var(--muted)">${I18N[lang].cart_empty}</div></div>`;
    return;
  }

  Object.entries(cart).forEach(([id, item])=>{
    const p = db[id];
    if(!p) return;

    const row = document.createElement("div");
    row.className = "card reveal in";
    row.style.display = "grid";
    row.style.gridTemplateColumns = "72px 1fr auto";
    row.style.gap = "14px";
    row.style.alignItems = "center";

    row.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.08);border-radius:16px;height:72px;">
        <img src="${p.img}" alt="" style="width:58px;height:58px;object-fit:contain;filter:drop-shadow(0 10px 18px rgba(0,0,0,.6))" onerror="this.style.display='none'">
      </div>
      <div>
        <div style="font-weight:900;letter-spacing:.08em;text-transform:uppercase">${p.title}</div>
        <div style="color:var(--muted);margin-top:4px">${I18N[lang].price_stub}</div>
      </div>
      <div class="qty">
        <button type="button" class="cMinus">−</button>
        <span class="cVal">${item.qty}</span>
        <button type="button" class="cPlus">+</button>
      </div>
    `;

    row.querySelector(".cMinus").addEventListener("click", ()=>{
      const cur = loadCart();
      const q = (cur[id]?.qty || 0) - 1;
      setQtyInCart(id, q);
      renderCartPage();
    });
    row.querySelector(".cPlus").addEventListener("click", ()=>{
      const cur = loadCart();
      const q = (cur[id]?.qty || 0) + 1;
      setQtyInCart(id, q);
      renderCartPage();
    });

    wrap.appendChild(row);
  });
}

/* ====== Checkout ====== */
function initCheckout(){
  const form = $("#checkoutForm");
  if(!form) return;

  updateCartBadge();

  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const cart = loadCart();
    if(cartCount(cart) === 0){
      toast(I18N[getLang()].need_cart);
      return;
    }

    const data = {
      name: $("#name").value.trim(),
      phone: $("#phone").value.trim(),
      city: $("#city").value.trim(),
      delivery: $("#delivery").value,
      payment: $("#payment").value,
      comment: $("#comment").value.trim(),
      cart,
      created_at: new Date().toISOString()
    };

    localStorage.setItem(ORDER_KEY, JSON.stringify(data));
    // очищать корзину можно сразу, а можно после success — я очищаю сразу
    saveCart({});
    window.location.href = "./success.html";
  });
}

/* ====== Success page ====== */
function renderSuccess(){
  const pre = $("#orderDump");
  if(!pre) return;
  try{
    const data = JSON.parse(localStorage.getItem(ORDER_KEY) || "{}");
    pre.textContent = JSON.stringify(data, null, 2);
  }catch{
    pre.textContent = "{}";
  }
}

/* ====== Boot ====== */
document.addEventListener("DOMContentLoaded", ()=>{
  initLangButtons();
  initReveal();
  initCatalogCards();
  renderCartPage();
  initCheckout();
  renderSuccess();
  updateCartBadge();
});

