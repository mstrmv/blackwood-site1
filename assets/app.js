/* BLACKWOOD • CHARCOAL — app.js (cart + i18n + Nova Poshta) */

const NP_API_KEY = "e2d2f807d2464e81aae678bb51c9c569";
const NP_URL = "https://api.novaposhta.ua/v2.0/json/";

const PRODUCTS = [
  { id: "core-3", title: "CORE • 3 KG", weight: "3 kg", price: 399, img: "img/products/core-3kg.png", tag: "3-5kg" },
  { id: "core-5", title: "CORE • 5 KG", weight: "5 kg", price: 499, img: "img/products/core-5kg.png", tag: "3-5kg" },
  { id: "core-10", title: "CORE • 10 KG", weight: "10 kg", price: 599, img: "img/products/core-10kg.png", tag: "10kg" },
];

const I18N = {
  ru: {
    nav_home: "Главная",
    nav_catalog: "Каталог",
    nav_shipping: "Доставка",
    nav_about: "О нас",
    nav_contacts: "Контакты",
    cart: "Корзина",
    hero_kicker: "Премиум уголь для гриля",
    hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
    hero_desc: "Длительное горение, минимум пепла, чистый жар.\nИдеально для BBQ и гриля.",
    btn_open_catalog: "Открыть каталог",
    btn_shipping: "Доставка и оплата",
    btn_to_cart: "Перейти в корзину",
    goods_title: "Товары",
    goods_sub: "Выберите вес и добавьте в корзину.",
    filter_all: "All",
    filter_35: "3–5kg",
    filter_10: "10kg",
    sort: "Sort",
    sort_pop: "Popular",
    go_cart: "Перейти в корзину",
    checkout: "Оформить заказ",
    in_cart: "В корзину",
    qty: "Кол-во",
    empty_cart: "Корзина пуста.",
    total: "Итого",
    proceed: "Перейти к оформлению",
    checkout_title: "Оформление заказа",
    name: "ФИО",
    phone: "Телефон",
    city: "Город",
    warehouse: "Отделение / Поштомат",
    comment: "Комментарий",
    pay: "Оплата",
    pay_cash: "Наличными при получении",
    pay_card: "Картой (уточним после заказа)",
    send_order: "Отправить заказ",
    success_title: "Заказ сформирован",
    success_desc: "Мы подготовили письмо с деталями заказа. Проверьте почту / отправьте письмо.",
    back_home: "На главную",
  },
  ukr: {
    nav_home: "Головна",
    nav_catalog: "Каталог",
    nav_shipping: "Доставка",
    nav_about: "Про нас",
    nav_contacts: "Контакти",
    cart: "Кошик",
    hero_kicker: "Преміум вугілля для гриля",
    hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
    hero_desc: "Довге горіння, мінімум попелу, чистий жар.\nІдеально для BBQ та гриля.",
    btn_open_catalog: "Відкрити каталог",
    btn_shipping: "Доставка та оплата",
    btn_to_cart: "Перейти в кошик",
    goods_title: "Товари",
    goods_sub: "Оберіть вагу і додайте в кошик.",
    filter_all: "All",
    filter_35: "3–5kg",
    filter_10: "10kg",
    sort: "Sort",
    sort_pop: "Popular",
    go_cart: "Перейти в кошик",
    checkout: "Оформити замовлення",
    in_cart: "В кошик",
    qty: "К-сть",
    empty_cart: "Кошик порожній.",
    total: "Разом",
    proceed: "Перейти до оформлення",
    checkout_title: "Оформлення замовлення",
    name: "ПІБ",
    phone: "Телефон",
    city: "Місто",
    warehouse: "Відділення / Поштомат",
    comment: "Коментар",
    pay: "Оплата",
    pay_cash: "Готівкою при отриманні",
    pay_card: "Карткою (уточнимо після замовлення)",
    send_order: "Надіслати замовлення",
    success_title: "Замовлення сформовано",
    success_desc: "Ми підготували лист з деталями замовлення. Перевірте пошту / надішліть лист.",
    back_home: "На головну",
  },
  en: {
    nav_home: "Home",
    nav_catalog: "Catalog",
    nav_shipping: "Shipping",
    nav_about: "About",
    nav_contacts: "Contacts",
    cart: "Cart",
    hero_kicker: "Premium charcoal for grill",
    hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
    hero_desc: "Long heat, low ash, clean burn.\nPerfect for BBQ & grill.",
    btn_open_catalog: "Open catalog",
    btn_shipping: "Shipping & payment",
    btn_to_cart: "Go to cart",
    goods_title: "Products",
    goods_sub: "Choose weight and add to cart.",
    filter_all: "All",
    filter_35: "3–5kg",
    filter_10: "10kg",
    sort: "Sort",
    sort_pop: "Popular",
    go_cart: "Go to cart",
    checkout: "Checkout",
    in_cart: "Add to cart",
    qty: "Qty",
    empty_cart: "Cart is empty.",
    total: "Total",
    proceed: "Proceed to checkout",
    checkout_title: "Checkout",
    name: "Full name",
    phone: "Phone",
    city: "City",
    warehouse: "Warehouse / Parcel locker",
    comment: "Comment",
    pay: "Payment",
    pay_cash: "Cash on delivery",
    pay_card: "Card (confirm later)",
    send_order: "Send order",
    success_title: "Order prepared",
    success_desc: "We prepared an email with order details. Please send it.",
    back_home: "Back home",
  }
};

/* ---------- storage/cart ---------- */
const CART_KEY = "bw_cart_v1";
const LANG_KEY = "bw_lang_v1";

function loadCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY) || "{}"); }
  catch{ return {}; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadges();
}
function cartCount(cart = loadCart()){
  return Object.values(cart).reduce((a,b)=>a + (Number(b)||0), 0);
}
function cartTotal(cart = loadCart()){
  let sum = 0;
  for(const [id,qty] of Object.entries(cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) sum += p.price * Number(qty||0);
  }
  return sum;
}
function updateCartBadges(){
  const count = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach(el=>{
    el.textContent = String(count);
  });
}

/* ---------- i18n ---------- */
function getLang(){
  return (localStorage.getItem(LANG_KEY) || "ru").toLowerCase();
}
function setLang(lang){
  localStorage.setItem(LANG_KEY, lang);
  applyLang();
}
function t(key){
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N.ru[key] || key);
}
function applyLang(){
  const lang = getLang();
  document.documentElement.lang = lang === "ukr" ? "uk" : lang;

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-multiline]").forEach(el=>{
    const key = el.getAttribute("data-i18n-multiline");
    el.innerHTML = t(key).replace(/\n/g,"<br>");
  });

  document.querySelectorAll(".lang button").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

/* ---------- catalog rendering ---------- */
function renderCatalog(){
  const grid = document.querySelector("[data-catalog-grid]");
  if(!grid) return;

  // pills
  const pills = document.querySelectorAll("[data-filter]");
  let activeFilter = "all";

  function draw(){
    const sortVal = (document.querySelector("[data-sort]")?.value || "popular");
    let list = [...PRODUCTS];

    if(activeFilter !== "all"){
      list = list.filter(p=>p.tag === activeFilter);
    }

    if(sortVal === "price-asc") list.sort((a,b)=>a.price-b.price);
    if(sortVal === "price-desc") list.sort((a,b)=>b.price-a.price);

    const cart = loadCart();

    grid.innerHTML = list.map(p=>{
      const qty = cart[p.id] || 1;
      return `
        <article class="card" data-product="${p.id}">
          <div class="cardBody">
            <div class="imgBox">
              <img src="${p.img}" alt="${p.title}">
            </div>

            <div class="cardTitle">${p.title}</div>

            <div class="cardMeta">
              <div>${p.weight}</div>
              <div class="price">${p.price} грн</div>
            </div>

            <div class="cardActions">
              <div class="qty" aria-label="${t("qty")}">
                <button type="button" data-qty-minus>-</button>
                <span data-qty-val>${qty}</span>
                <button type="button" data-qty-plus>+</button>
              </div>
              <button class="btn primary" type="button" data-add>
                ${t("in_cart")}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // bind events per card
    grid.querySelectorAll("[data-product]").forEach(card=>{
      const id = card.getAttribute("data-product");
      const qtyVal = card.querySelector("[data-qty-val]");

      card.querySelector("[data-qty-minus]").addEventListener("click", ()=>{
        let v = Number(qtyVal.textContent||"1");
        v = Math.max(1, v-1);
        qtyVal.textContent = String(v);
      });
      card.querySelector("[data-qty-plus]").addEventListener("click", ()=>{
        let v = Number(qtyVal.textContent||"1");
        v = Math.min(99, v+1);
        qtyVal.textContent = String(v);
      });

      card.querySelector("[data-add]").addEventListener("click", ()=>{
        const cart = loadCart();
        const addQty = Number(qtyVal.textContent||"1");
        cart[id] = (Number(cart[id]||0) + addQty);
        saveCart(cart);
      });
    });
  }

  pills.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      pills.forEach(x=>x.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      draw();
    });
  });

  document.querySelector("[data-sort]")?.addEventListener("change", draw);

  draw();
}

/* ---------- cart page rendering ---------- */
function renderCartPage(){
  const wrap = document.querySelector("[data-cart]");
  if(!wrap) return;

  const cart = loadCart();
  const ids = Object.keys(cart);

  if(ids.length === 0){
    wrap.innerHTML = `<div class="formWrap">${t("empty_cart")}</div>`;
    return;
  }

  const rows = ids.map(id=>{
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return "";
    const qty = Number(cart[id]||0);
    const line = p.price * qty;
    return `
      <div class="formWrap" style="margin-top:12px">
        <div style="display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
          <div style="display:flex; gap:12px; align-items:center;">
            <img src="${p.img}" alt="${p.title}" style="width:78px;height:78px;border-radius:14px;object-fit:cover;border:1px solid rgba(255,255,255,.10);">
            <div>
              <div style="font-weight:950;letter-spacing:.08em;text-transform:uppercase">${p.title}</div>
              <div style="color:rgba(255,255,255,.62);font-weight:750">${p.weight} • ${p.price} грн</div>
            </div>
          </div>

          <div style="display:flex; gap:10px; align-items:center;">
            <div class="qty">
              <button type="button" data-dec="${id}">-</button>
              <span style="width:28px;text-align:center;font-weight:900">${qty}</span>
              <button type="button" data-inc="${id}">+</button>
            </div>
            <div class="badge">${line} грн</div>
            <button class="btn small" type="button" data-del="${id}">✕</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const total = cartTotal(cart);

  wrap.innerHTML = `
    ${rows}
    <div class="formWrap" style="margin-top:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div style="font-weight:950">${t("total")}: <span style="color:var(--gold)">${total} грн</span></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn ghost" href="catalog.html">${t("nav_catalog")}</a>
          <a class="btn primary" href="checkout.html">${t("proceed")}</a>
        </div>
      </div>
    </div>
  `;

  wrap.querySelectorAll("[data-inc]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const id = b.getAttribute("data-inc");
      const cart = loadCart();
      cart[id] = (Number(cart[id]||0) + 1);
      saveCart(cart);
      renderCartPage();
    });
  });
  wrap.querySelectorAll("[data-dec]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const id = b.getAttribute("data-dec");
      const cart = loadCart();
      cart[id] = Math.max(1, Number(cart[id]||1) - 1);
      saveCart(cart);
      renderCartPage();
    });
  });
  wrap.querySelectorAll("[data-del]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const id = b.getAttribute("data-del");
      const cart = loadCart();
      delete cart[id];
      saveCart(cart);
      renderCartPage();
    });
  });
}

/* ---------- Nova Poshta helpers ---------- */
async function npRequest(modelName, calledMethod, methodProperties = {}){
  const body = {
    apiKey: NP_API_KEY,
    modelName,
    calledMethod,
    methodProperties
  };
  const res = await fetch(NP_URL, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if(!data || data.success !== true) return { ok:false, data };
  return { ok:true, data };
}

function debounce(fn, ms){
  let t = null;
  return (...args)=>{
    clearTimeout(t);
    t = setTimeout(()=>fn(...args), ms);
  };
}

/* ---------- Checkout page ---------- */
function initCheckout(){
  const form = document.querySelector("[data-checkout-form]");
  if(!form) return;

  const cityInput = form.querySelector("#np_city");
  const cityDatalist = form.querySelector("#np_city_list");
  const whSelect = form.querySelector("#np_wh");
  const totalEl = form.querySelector("[data-total]");

  const cart = loadCart();
  const total = cartTotal(cart);
  totalEl.textContent = `${total} грн`;

  let selectedCityRef = null;

  const loadWarehouses = async (cityRef)=>{
    whSelect.innerHTML = `<option value="">...</option>`;
    if(!cityRef) return;
    const r = await npRequest("Address", "getWarehouses", { CityRef: cityRef, Limit: 200 });
    if(!r.ok){
      whSelect.innerHTML = `<option value="">(ошибка)</option>`;
      return;
    }
    const list = r.data.data || [];
    whSelect.innerHTML = `<option value="">${t("warehouse")}</option>` + list.map(w=>{
      const label = w.Description || w.DescriptionRu || w.ShortAddress || "Warehouse";
      const ref = w.Ref;
      return `<option value="${ref}">${label}</option>`;
    }).join("");
  };

  const searchCities = debounce(async ()=>{
    const q = (cityInput.value || "").trim();
    cityDatalist.innerHTML = "";
    selectedCityRef = null;
    whSelect.innerHTML = `<option value="">${t("warehouse")}</option>`;

    if(q.length < 2) return;

    // getCities with FindByString
    const r = await npRequest("Address", "getCities", { FindByString: q, Limit: 20 });
    if(!r.ok) return;

    const cities = r.data.data || [];
    cityDatalist.innerHTML = cities.map(c=>{
      // store Ref in value via "CityName | Ref"
      const name = c.Description || c.DescriptionRu || c.DescriptionEn || q;
      return `<option value="${name}" data-ref="${c.Ref}"></option>`;
    }).join("");
  }, 260);

  cityInput.addEventListener("input", searchCities);

  cityInput.addEventListener("change", async ()=>{
    // after user picks a city name, we must find its Ref
    const name = (cityInput.value || "").trim();
    if(!name) return;

    const r = await npRequest("Address", "getCities", { FindByString: name, Limit: 10 });
    if(!r.ok) return;

    const city = (r.data.data || []).find(c => (c.Description || c.DescriptionRu || c.DescriptionEn) === name) || (r.data.data || [])[0];
    if(!city) return;

    selectedCityRef = city.Ref;
    await loadWarehouses(selectedCityRef);
  });

  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const cart = loadCart();
    if(cartCount(cart) === 0){
      alert(t("empty_cart"));
      return;
    }

    const name = form.querySelector("#full_name").value.trim();
    const phone = form.querySelector("#phone").value.trim();
    const city = cityInput.value.trim();
    const whRef = whSelect.value;
    const whText = whSelect.options[whSelect.selectedIndex]?.textContent || "";
    const pay = form.querySelector("#pay").value;
    const comment = form.querySelector("#comment").value.trim();

    if(!name || !phone || !city || !whRef){
      alert("Заполни ФИО, телефон, город и отделение.");
      return;
    }

    const items = Object.entries(cart).map(([id,qty])=>{
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) return null;
      return `${p.title} — ${qty} шт × ${p.price} = ${p.price*qty} грн`;
    }).filter(Boolean);

    const total = cartTotal(cart);

    // IMPORTANT: static GitHub Pages can't "send email" реально без сервера.
    // Делаем mailto: откроет почту с готовым письмом.
    const subject = encodeURIComponent(`BLACKWOOD order — ${name}`);
    const body = encodeURIComponent(
`Новый заказ BLACKWOOD

ФИО: ${name}
Телефон: ${phone}

Новая Почта:
Город: ${city}
Отделение: ${whText}

Оплата: ${pay}
Комментарий: ${comment || "-"}

Товары:
${items.join("\n")}

ИТОГО: ${total} грн
`
    );

    // Save order draft for success page
    localStorage.setItem("bw_last_order", JSON.stringify({ name, phone, city, whText, pay, comment, items, total }));

    // Put your email here:
    const toEmail = "YOUR_EMAIL_HERE@example.com";
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
    // After that, go to success page
    setTimeout(()=>{ window.location.href = "success.html"; }, 400);
  });
}

/* ---------- boot ---------- */
function markActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navlinks a").forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    a.classList.toggle("active", href === path);
  });
}

function initLangButtons(){
  document.querySelectorAll(".lang button").forEach(btn=>{
    btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  updateCartBadges();
  applyLang();
  initLangButtons();
  markActiveNav();
  renderCatalog();
  renderCartPage();
  initCheckout();

  // Any "go to cart" buttons
  document.querySelectorAll("[data-go-cart]").forEach(b=>{
    b.addEventListener("click", ()=> location.href="cart.html");
  });
});
