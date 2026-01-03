// assets/app.js

/* =======================
   SETTINGS (EDIT HERE)
======================= */
const DEFAULT_LANG = "uk"; // главный язык = UKR
const ORDER_EMAIL = "your@email.com"; // <- поставь сюда твой email для заказов

// Nova Poshta API key (твой)
const NP_API_KEY = "e2d2f807d2464e81aae678bb51c9c569";

// Social links (замени на свои)
const SOCIAL = {
  telegram: "https://t.me/your_channel",
  instagram: "https://instagram.com/your_page",
  tiktok: "https://tiktok.com/@your_page",
};

/* =======================
   PRODUCTS (EDIT PRICES IF NEEDED)
======================= */
const PRODUCTS = [
  // CHARCOAL
  {
    id: "core_3",
    category: "charcoal",
    img: "assets/img/core-3.jpg",
    price: 399,
    title: { uk: "CORE • 3 кг", ru: "CORE • 3 кг", en: "CORE • 3 kg" },
    subtitle: { uk: "Вугілля", ru: "Уголь", en: "Charcoal" },
    popular: 10,
  },
  {
    id: "core_5",
    category: "charcoal",
    img: "assets/img/core-5.jpg",
    price: 499,
    title: { uk: "CORE • 5 кг", ru: "CORE • 5 кг", en: "CORE • 5 kg" },
    subtitle: { uk: "Вугілля", ru: "Уголь", en: "Charcoal" },
    popular: 9,
  },
  {
    id: "core_10",
    category: "charcoal",
    img: "assets/img/core-10.jpg",
    price: 599,
    title: { uk: "CORE • 10 кг", ru: "CORE • 10 кг", en: "CORE • 10 kg" },
    subtitle: { uk: "Вугілля", ru: "Уголь", en: "Charcoal" },
    popular: 8,
  },

  // GRIDS (сетки)
  {
    id: "grid_double",
    category: "grids",
    img: "assets/img/grid-double.jpg",
    price: 699,
    title: { uk: "Сітка Double", ru: "Сетка Double", en: "Grid Double" },
    subtitle: { uk: "Аксесуар", ru: "Аксессуар", en: "Accessory" },
    popular: 7,
  },
  {
    id: "grid_sausage",
    category: "grids",
    img: "assets/img/grid-sausage.jpg",
    price: 649,
    title: { uk: "Сітка Sausage", ru: "Сетка Sausage", en: "Sausage Grid" },
    subtitle: { uk: "Аксесуар", ru: "Аксессуар", en: "Accessory" },
    popular: 6,
  },
  {
    id: "grid_flat",
    category: "grids",
    img: "assets/img/grid-flat.jpg",
    price: 599,
    title: { uk: "Сітка Flat", ru: "Сетка Flat", en: "Flat Grid" },
    subtitle: { uk: "Аксесуар", ru: "Аксессуар", en: "Accessory" },
    popular: 6,
  },

  // ACCESSORIES (9 товаров)
  {
    id: "starter",
    category: "accessories",
    img: "assets/img/starter.jpg",
    price: 1199,
    title: { uk: "Charcoal Starter", ru: "Charcoal Starter", en: "Charcoal Starter" },
    subtitle: { uk: "Стартер", ru: "Стартер", en: "Starter" },
    popular: 5,
  },
  {
    id: "weekend_box",
    category: "accessories",
    img: "assets/img/weekend-box.jpg",
    price: 1999,
    title: { uk: "Weekend Box", ru: "Weekend Box", en: "Weekend Box" },
    subtitle: { uk: "Набір", ru: "Набор", en: "Bundle" },
    popular: 5,
  },
  {
    id: "royal_ignition",
    category: "accessories",
    img: "assets/img/royal-ignition.jpg",
    price: 399,
    title: { uk: "Royal Ignition", ru: "Royal Ignition", en: "Royal Ignition" },
    subtitle: { uk: "Рідина для розпалу", ru: "Жидкость для розжига", en: "Ignition fluid" },
    popular: 7,
  },
  {
    id: "apron",
    category: "accessories",
    img: "assets/img/apron.jpg",
    price: 899,
    title: { uk: "Фартух BLACKWOOD", ru: "Фартук BLACKWOOD", en: "BLACKWOOD Apron" },
    subtitle: { uk: "Одяг", ru: "Одежда", en: "Gear" },
    popular: 4,
  },
  {
    id: "gloves",
    category: "accessories",
    img: "assets/img/gloves.jpg",
    price: 799,
    title: { uk: "Рукавиці BLACKWOOD", ru: "Перчатки BLACKWOOD", en: "BLACKWOOD Gloves" },
    subtitle: { uk: "Захист", ru: "Защита", en: "Protection" },
    popular: 6,
  },
  {
    id: "grill_set",
    category: "accessories",
    img: "assets/img/grill-set.jpg",
    price: 2499,
    title: { uk: "Grill Set", ru: "Grill Set", en: "Grill Set" },
    subtitle: { uk: "Набір", ru: "Набор", en: "Set" },
    popular: 3,
  },
  {
    id: "blower",
    category: "accessories",
    img: "assets/img/blower.jpg",
    price: 499,
    title: { uk: "Міх для розпалу", ru: "Мех для розжига", en: "Blower" },
    subtitle: { uk: "Аксесуар", ru: "Аксессуар", en: "Accessory" },
    popular: 2,
  },
  {
    id: "thermometer",
    category: "accessories",
    img: "assets/img/thermometer.jpg",
    price: 799,
    title: { uk: "Термометр", ru: "Термометр", en: "Thermometer" },
    subtitle: { uk: "Контроль", ru: "Контроль", en: "Control" },
    popular: 4,
  },
  {
    id: "fish_basket",
    category: "accessories",
    img: "assets/img/fish-basket.jpg",
    price: 699,
    title: { uk: "Сітка для риби", ru: "Сетка для рыбы", en: "Fish Basket" },
    subtitle: { uk: "Сітка", ru: "Сетка", en: "Grid" },
    popular: 4,
  },
  {
    id: "sausage_cage",
    category: "accessories",
    img: "assets/img/sausage-cage.jpg",
    price: 649,
    title: { uk: "Сітка для ковбасок", ru: "Сетка для сосисок", en: "Sausage Cage" },
    subtitle: { uk: "Сітка", ru: "Сетка", en: "Grid" },
    popular: 4,
  },
];

/* =======================
   HELPERS
======================= */
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));

function getLang(){
  return localStorage.getItem("lang") || DEFAULT_LANG;
}
function setLang(lang){
  localStorage.setItem("lang", lang);
  applyI18n();
  renderHeader(); // обновить активную кнопку
  renderAllDynamic();
}
function t(key){
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N[DEFAULT_LANG] && I18N[DEFAULT_LANG][key]) || key;
}
function money(n){ return `${Number(n || 0)} грн`; }

function getCart(){
  try{ return JSON.parse(localStorage.getItem("cart") || "{}"); }catch{ return {}; }
}
function setCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}
function cartCount(){
  const c = getCart();
  return Object.values(c).reduce((a,b)=>a + (b.qty||0), 0);
}
function cartTotal(){
  const c = getCart();
  let sum = 0;
  for(const [id, item] of Object.entries(c)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) sum += p.price * (item.qty||0);
  }
  return sum;
}
function updateCartBadge(){
  const el = $("#cartCount");
  if(el) el.textContent = String(cartCount());
}

/* =======================
   HEADER / FOOTER (one for all pages)
======================= */
function currentPage(){
  const p = location.pathname.split("/").pop() || "index.html";
  return p;
}

function iconSVG(name){
  if(name==="tg") return `
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.04 15.64 8.87 20c.58 0 .83-.25 1.13-.55l2.7-2.58 5.6 4.1c1.02.56 1.74.27 2-.95l3.62-17c.33-1.5-.54-2.09-1.53-1.72L1.1 9.7c-1.45.56-1.43 1.36-.25 1.72l5.86 1.83L20.28 5c.64-.4 1.22-.18.74.24z"/></svg>`;
  if(name==="ig") return `
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM18 6.3a.7.7 0 1 1-.7.7.7.7 0 0 1 .7-.7z"/></svg>`;
  if(name==="tt") return `
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.7 2h-3.2v13.2a2.7 2.7 0 1 1-2.3-2.6V9.3a6 6 0 1 0 5.5 5.9V8.3c1.1.8 2.4 1.3 3.8 1.4V6.5c-2-.2-3.7-1.8-3.8-4.5z"/></svg>`;
  return "";
}

function renderHeader(){
  const mount = $("#site-header");
  if(!mount) return;

  const page = currentPage();
  const lang = getLang();

  const nav = [
    ["index.html","nav_home"],
    ["catalog.html","nav_catalog"],
    ["shipping.html","nav_shipping"],
    ["about.html","nav_about"],
    ["contacts.html","nav_contacts"],
  ];

  mount.innerHTML = `
    <header class="topbar">
      <div class="container">
        <div class="row">
          <a class="brand" href="index.html">
            BLACKWOOD <span class="dot"></span> CHARCOAL
          </a>

          <nav class="nav">
            ${nav.map(([href,key]) => `
              <a href="${href}" class="${page===href ? "active":""}" data-i18n="${key}">${t(key)}</a>
            `).join("")}
          </nav>

          <div class="right">
            <div class="lang" role="group" aria-label="Language switch">
              <button type="button" class="${lang==="ru"?"active":""}" data-lang="ru">RU</button>
              <button type="button" class="${lang==="uk"?"active":""}" data-lang="uk">UKR</button>
              <button type="button" class="${lang==="en"?"active":""}" data-lang="en">EN</button>
            </div>

            <a class="cartpill" href="cart.html" aria-label="Cart">
              <span data-i18n="cart">${t("cart")}</span>
              <span class="count" id="cartCount">0</span>
            </a>

            <div class="social" aria-label="Social links">
              <a class="iconbtn" href="${SOCIAL.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${iconSVG("tg")}</a>
              <a class="iconbtn" href="${SOCIAL.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${iconSVG("ig")}</a>
              <a class="iconbtn" href="${SOCIAL.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${iconSVG("tt")}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  // bind language buttons
  $$(".lang button", mount).forEach(btn=>{
    btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
  });

  updateCartBadge();
}

function renderFooter(){
  const mount = $("#site-footer");
  if(!mount) return;
  mount.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div>BLACKWOOD • CHARCOAL</div>
          <div>© <span id="year2"></span></div>
        </div>
      </div>
    </footer>
  `;
}

/* =======================
   i18n apply
======================= */
function applyI18n(){
  const lang = getLang();
  document.documentElement.lang = lang === "uk" ? "uk" : (lang==="ru" ? "ru" : "en");
  $$("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(key && t(key)) el.textContent = t(key);
  });
}

/* =======================
   CATALOG
======================= */
function renderCatalog(){
  const grid = $("#productsGrid");
  const chips = $("#catChips");
  if(!grid || !chips) return;

  const cats = [
    ["all","cat_all"],
    ["charcoal","cat_charcoal"],
    ["grids","cat_grids"],
    ["accessories","cat_accessories"],
  ];

  let activeCat = localStorage.getItem("cat") || "all";

  chips.innerHTML = cats.map(([id, key]) => `
    <button class="chip ${activeCat===id?"active":""}" data-cat="${id}">${t(key)}</button>
  `).join("");

  $$(".chip", chips).forEach(btn=>{
    btn.addEventListener("click", ()=>{
      activeCat = btn.dataset.cat;
      localStorage.setItem("cat", activeCat);
      renderCatalog();
    });
  });

  const sortSel = $("#sortSel");
  const sort = sortSel ? (sortSel.value || "popular") : "popular";

  let list = [...PRODUCTS];
  if(activeCat !== "all") list = list.filter(p=>p.category===activeCat);

  if(sort === "price_asc") list.sort((a,b)=>a.price-b.price);
  else if(sort === "price_desc") list.sort((a,b)=>b.price-a.price);
  else if(sort === "name") list.sort((a,b)=> (a.title[getLang()]||"").localeCompare(b.title[getLang()]||""));
  else list.sort((a,b)=> (b.popular||0)-(a.popular||0));

  if(sortSel){
    sortSel.onchange = ()=> renderCatalog();
  }

  grid.innerHTML = list.map(p=> productCardHTML(p)).join("");

  // bind qty + add
  list.forEach(p=>{
    const root = $(`#p_${p.id}`);
    if(!root) return;
    const qtyEl = $(".qty-num", root);
    const minus = $(".qty-minus", root);
    const plus = $(".qty-plus", root);
    const add = $(".add-btn", root);

    let qty = 1;
    const setQty = (v)=>{
      qty = Math.max(1, Math.min(99, v));
      qtyEl.textContent = String(qty);
    };
    minus.addEventListener("click", ()=> setQty(qty-1));
    plus.addEventListener("click", ()=> setQty(qty+1));

    add.addEventListener("click", ()=>{
      const cart = getCart();
      cart[p.id] = cart[p.id] || { qty: 0 };
      cart[p.id].qty += qty;
      setCart(cart);
      setQty(1);
    });
  });
}

function productCardHTML(p){
  const lang = getLang();
  const title = p.title[lang] || p.title[DEFAULT_LANG];
  const subtitle = p.subtitle[lang] || p.subtitle[DEFAULT_LANG];
  return `
    <article class="card" id="p_${p.id}">
      <img class="img" src="${p.img}" alt="${title}" loading="lazy" />
      <div class="body">
        <div class="title">${title}</div>
        <div class="muted" style="margin-top:4px;font-size:12px">${subtitle}</div>
        <div class="row">
          <div class="qty">
            <button type="button" class="qty-minus">−</button>
            <span class="qty-num">1</span>
            <button type="button" class="qty-plus">+</button>
          </div>
          <div class="price">${money(p.price)}</div>
        </div>
        <div class="row" style="margin-top:10px">
          <span></span>
          <button type="button" class="btn btn-gold add-btn" data-i18n="add_to_cart">${t("add_to_cart")}</button>
        </div>
      </div>
    </article>
  `;
}

/* =======================
   CART PAGE
======================= */
function renderCartPage(){
  const listEl = $("#cartList");
  const empty = $("#cartEmpty");
  const wrap = $("#cartWrap");
  const totalEl = $("#cartTotal");
  if(!listEl || !empty || !wrap || !totalEl) return;

  const cart = getCart();
  const ids = Object.keys(cart).filter(id=>cart[id]?.qty>0);

  if(ids.length === 0){
    empty.classList.remove("hidden");
    wrap.classList.add("hidden");
    totalEl.textContent = money(0);
    return;
  }

  empty.classList.add("hidden");
  wrap.classList.remove("hidden");

  listEl.innerHTML = ids.map(id=>{
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return "";
    const lang = getLang();
    const title = p.title[lang] || p.title[DEFAULT_LANG];
    const qty = cart[id].qty;
    const sum = p.price * qty;
    return `
      <div class="cart-item" data-id="${id}">
        <img src="${p.img}" alt="${title}" loading="lazy" />
        <div class="info">
          <div class="name">${title}</div>
          <div class="meta">${money(p.price)} × ${qty}</div>
          <div class="actions">
            <div class="qty">
              <button type="button" class="c-minus">−</button>
              <span class="c-qty">${qty}</span>
              <button type="button" class="c-plus">+</button>
            </div>
            <strong>${money(sum)}</strong>
          </div>
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = money(cartTotal());

  // bind
  $$(".cart-item", listEl).forEach(item=>{
    const id = item.dataset.id;
    $(".c-minus", item).addEventListener("click", ()=>{
      const c = getCart();
      c[id].qty = Math.max(0, (c[id].qty||0)-1);
      if(c[id].qty === 0) delete c[id];
      setCart(c);
      renderCartPage();
    });
    $(".c-plus", item).addEventListener("click", ()=>{
      const c = getCart();
      c[id] = c[id] || { qty: 0 };
      c[id].qty += 1;
      setCart(c);
      renderCartPage();
    });
  });

  const clearBtn = $("#clearCartBtn");
  if(clearBtn){
    clearBtn.onclick = ()=>{
      setCart({});
      renderCartPage();
    };
  }
}

/* =======================
   CHECKOUT + NOVA POSHTA
======================= */
async function npCall(model, method, props){
  const body = {
    apiKey: NP_API_KEY,
    modelName: model,
    calledMethod: method,
    methodProperties: props || {}
  };

  const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

function renderCheckout(){
  const totalEl = $("#checkoutTotal");
  const form = $("#checkoutForm");
  if(!totalEl || !form) return;

  totalEl.textContent = money(cartTotal());

  // delivery type buttons
  const typeWrap = $("#deliveryType");
  const warehouseBlock = $("#warehouseBlock");
  const courierBlock = $("#courierBlock");
  let deliveryType = "warehouse";

  const setType = (t)=>{
    deliveryType = t;
    $$(".seg", typeWrap).forEach(b=>b.classList.toggle("active", b.dataset.type===t));
    if(t === "courier"){
      courierBlock.classList.remove("hidden");
      warehouseBlock.classList.add("hidden");
      $("#fWarehouse").value = "";
    }else{
      courierBlock.classList.add("hidden");
      warehouseBlock.classList.remove("hidden");
      $("#fAddress").value = "";
    }
  };

  $$(".seg", typeWrap).forEach(btn=>{
    btn.addEventListener("click", ()=> setType(btn.dataset.type));
  });

  // City suggestions
  const cityInput = $("#fCity");
  const citySug = $("#citySuggest");
  const whInput = $("#fWarehouse");
  const whSug = $("#whSuggest");

  let cityRef = null;
  let cityTimer = null;
  let whTimer = null;

  cityInput.addEventListener("input", ()=>{
    cityRef = null;
    whInput.value = "";
    whSug.classList.add("hidden");
    clearTimeout(cityTimer);
    const q = cityInput.value.trim();
    if(q.length < 2){
      citySug.classList.add("hidden");
      return;
    }
    cityTimer = setTimeout(async ()=>{
      try{
        const data = await npCall("Address", "searchSettlements", {
          CityName: q,
          Limit: 10
        });

        const items = data?.data?.[0]?.Addresses || [];
        if(!items.length){
          citySug.classList.add("hidden");
          return;
        }
        citySug.innerHTML = items.map(x=>`
          <button type="button" data-ref="${x.DeliveryCity}" data-name="${x.Present}">${x.Present}</button>
        `).join("");
        citySug.classList.remove("hidden");

        $$("button", citySug).forEach(b=>{
          b.addEventListener("click", ()=>{
            cityInput.value = b.dataset.name;
            cityRef = b.dataset.ref;
            citySug.classList.add("hidden");
          });
        });
      }catch(e){
        citySug.classList.add("hidden");
      }
    }, 350);
  });

  document.addEventListener("click", (e)=>{
    if(!citySug.contains(e.target) && e.target !== cityInput) citySug.classList.add("hidden");
    if(!whSug.contains(e.target) && e.target !== whInput) whSug.classList.add("hidden");
  });

  // Warehouses / postomats suggestions
  whInput.addEventListener("input", ()=>{
    clearTimeout(whTimer);
    const q = whInput.value.trim();
    if(!cityRef || q.length < 0){
      whSug.classList.add("hidden");
      return;
    }
    whTimer = setTimeout(async ()=>{
      try{
        // For postomats: use FindByString + filter type in UI (basic)
        const data = await npCall("AddressGeneral", "getWarehouses", {
          CityRef: cityRef,
          FindByString: q,
          Limit: 20
        });

        let items = data?.data || [];
        // filter by delivery type
        if(deliveryType === "postomat"){
          items = items.filter(x => (x.TypeOfWarehouse && String(x.TypeOfWarehouse).toLowerCase().includes("postomat")) || String(x.CategoryOfWarehouse||"").includes("Postomat"));
        }else if(deliveryType === "warehouse"){
          // leave warehouses (exclude postomats if possible)
        }

        if(!items.length){
          whSug.classList.add("hidden");
          return;
        }
        whSug.innerHTML = items.slice(0,10).map(x=>`
          <button type="button" data-name="${x.Description}">${x.Description}</button>
        `).join("");
        whSug.classList.remove("hidden");

        $$("button", whSug).forEach(b=>{
          b.addEventListener("click", ()=>{
            whInput.value = b.dataset.name;
            whSug.classList.add("hidden");
          });
        });
      }catch(e){
        whSug.classList.add("hidden");
      }
    }, 250);
  });

  // Submit => mailto
  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const cart = getCart();
    const items = Object.keys(cart).map(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) return null;
      return {
        id,
        name: p.title[getLang()] || p.title[DEFAULT_LANG],
        price: p.price,
        qty: cart[id].qty,
        sum: p.price * cart[id].qty
      };
    }).filter(Boolean);

    if(!items.length){
      alert("Кошик порожній");
      return;
    }

    const name = $("#fName").value.trim();
    const phone = $("#fPhone").value.trim();
    const city = $("#fCity").value.trim();
    const wh = $("#fWarehouse").value.trim();
    const addr = $("#fAddress").value.trim();
    const pay = $("#fPay").value;
    const comment = $("#fComment").value.trim();

    if(!name || !phone || !city){
      alert("Заповніть ПІБ, телефон і місто.");
      return;
    }
    if(deliveryType !== "courier" && !wh){
      alert("Оберіть відділення/поштомат.");
      return;
    }
    if(deliveryType === "courier" && !addr){
      alert("Вкажіть адресу курʼєра.");
      return;
    }

    const total = cartTotal();

    const subject = encodeURIComponent(`BLACKWOOD Order • ${name} • ${money(total)}`);
    const lines = [];
    lines.push(`Замовлення BLACKWOOD`);
    lines.push(``);
    lines.push(`ПІБ: ${name}`);
    lines.push(`Телефон: ${phone}`);
    lines.push(`Місто: ${city}`);
    lines.push(`Тип доставки: ${deliveryType === "courier" ? "Курʼєр" : (deliveryType==="postomat" ? "Поштомат" : "Відділення")}`);
    if(deliveryType === "courier") lines.push(`Адреса: ${addr}`);
    else lines.push(`Відділення/Поштомат: ${wh}`);
    lines.push(`Оплата: ${pay === "cod" ? "Накладений платіж" : "Передоплата"}`);
    if(comment) lines.push(`Коментар: ${comment}`);
    lines.push(``);
    lines.push(`Товари:`);
    items.forEach(it=>{
      lines.push(`- ${it.name} — ${it.qty} × ${money(it.price)} = ${money(it.sum)}`);
    });
    lines.push(``);
    lines.push(`Разом: ${money(total)}`);

    const body = encodeURIComponent(lines.join("\n"));
    const mailto = `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });

  // initial type
  setType("warehouse");
}

/* =======================
   RENDER ALL DYNAMIC
======================= */
function renderAllDynamic(){
  renderCatalog();
  renderCartPage();
  renderCheckout();

  const y = $("#year"); if(y) y.textContent = String(new Date().getFullYear());
  const y2 = $("#year2"); if(y2) y2.textContent = String(new Date().getFullYear());
  const contactEmail = $("#contactEmail"); if(contactEmail) contactEmail.textContent = ORDER_EMAIL;
}

/* =======================
   INIT
======================= */
function init(){
  renderHeader();
  renderFooter();
  applyI18n();
  updateCartBadge();
  renderAllDynamic();
}

document.addEventListener("DOMContentLoaded", init);
