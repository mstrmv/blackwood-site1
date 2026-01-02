/* =========================
   BLACKWOOD - APP
   Works on GitHub Pages + Telegram Mini App
========================= */

const PRICES = {
  "core-3kg": 399,
  "core-5kg": 499,
  "core-10kg": 599,
};

const PRODUCTS = [
  { id:"core-3kg",  title:"CORE • 3 KG",  weight:"3 kg",  price: PRICES["core-3kg"],  img:"img/products/core-3kg.png",  tag:"3-5kg" },
  { id:"core-5kg",  title:"CORE • 5 KG",  weight:"5 kg",  price: PRICES["core-5kg"],  img:"img/products/core-5kg.png",  tag:"3-5kg" },
  { id:"core-10kg", title:"CORE • 10 KG", weight:"10 kg", price: PRICES["core-10kg"], img:"img/products/core-10kg.png", tag:"10kg" },
];

/* ===== Cart storage ===== */
const CART_KEY = "bw_cart_v1";

function getCart(){
  try{
    return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
  }catch(e){
    return {};
  }
}
function setCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function cartCount(cart = getCart()){
  return Object.values(cart).reduce((a,b)=>a + (b||0), 0);
}
function cartTotal(cart = getCart()){
  let sum = 0;
  for (const [id, qty] of Object.entries(cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if (p) sum += p.price * (qty||0);
  }
  return sum;
}
function updateCartBadge(){
  const el = document.querySelector("[data-cart-count]");
  if(!el) return;
  el.textContent = cartCount();
}

function addToCart(id, qty){
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  if(cart[id] <= 0) delete cart[id];
  setCart(cart);
}

function setQty(id, qty){
  const cart = getCart();
  if(qty <= 0) delete cart[id];
  else cart[id] = qty;
  setCart(cart);
}

/* ===== Header stuff ===== */
function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a, .mobileMenu a").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if(href === path) a.classList.add("active");
  });
}

function setupBurger(){
  const b = document.querySelector("[data-burger]");
  const m = document.querySelector("[data-mobilemenu]");
  if(!b || !m) return;
  b.addEventListener("click", ()=>{
    m.classList.toggle("show");
  });
}

function setupLangButtons(){
  document.querySelectorAll("[data-lang]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const lang = btn.getAttribute("data-lang");
      localStorage.setItem("bw_lang", lang);
      document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active", b.getAttribute("data-lang")===lang));
      // на сейчас: просто подсветка. Тексты можем перевести позже.
    });
  });

  const saved = localStorage.getItem("bw_lang") || "RU";
  document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active", b.getAttribute("data-lang")===saved));
}

/* ===== Catalog render ===== */
function renderCatalog(){
  const root = document.querySelector("[data-products]");
  if(!root) return;

  const filterBtns = document.querySelectorAll("[data-filter]");
  const sortSel = document.querySelector("[data-sort]");
  const goCartBtn = document.querySelector("[data-go-cart]");
  const goCheckoutBtn = document.querySelector("[data-go-checkout]");

  let filter = "all";
  let sort = "popular";

  function apply(){
    let list = [...PRODUCTS];

    if(filter !== "all"){
      if(filter === "3-5kg") list = list.filter(p=>p.tag==="3-5kg");
      if(filter === "10kg") list = list.filter(p=>p.tag==="10kg");
    }

    if(sort === "price_asc") list.sort((a,b)=>a.price-b.price);
    if(sort === "price_desc") list.sort((a,b)=>b.price-a.price);

    root.innerHTML = list.map(p=>productCardHTML(p)).join("");
    bindProductCardActions();
  }

  function productCardHTML(p){
    return `
      <article class="card">
        <div class="cardMedia">
          <img src="${p.img}" alt="${escapeHtml(p.title)}">
        </div>
        <div class="cardBody">
          <div class="cardTitle">${escapeHtml(p.title)}</div>
          <div class="cardMeta">
            <div>${escapeHtml(p.weight)}</div>
            <div><b>${p.price} грн</b></div>
          </div>

          <div class="qtyRow">
            <div class="qty" data-qty="${p.id}">
              <button type="button" data-minus="${p.id}">−</button>
              <span data-val="${p.id}">1</span>
              <button type="button" data-plus="${p.id}">+</button>
            </div>
            <button class="btn primary" type="button" data-add="${p.id}">В КОРЗИНУ</button>
          </div>
        </div>
      </article>
    `;
  }

  function bindProductCardActions(){
    root.querySelectorAll("[data-plus]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-plus");
        const val = root.querySelector(`[data-val="${id}"]`);
        val.textContent = String(Math.min(99, (parseInt(val.textContent||"1",10)+1)));
      });
    });
    root.querySelectorAll("[data-minus]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-minus");
        const val = root.querySelector(`[data-val="${id}"]`);
        val.textContent = String(Math.max(1, (parseInt(val.textContent||"1",10)-1)));
      });
    });
    root.querySelectorAll("[data-add]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-add");
        const val = root.querySelector(`[data-val="${id}"]`);
        const qty = parseInt(val?.textContent || "1", 10);
        addToCart(id, qty);

        // Telegram Mini App feedback
        try{
          if(window.Telegram?.WebApp){
            window.Telegram.WebApp.HapticFeedback?.impactOccurred("light");
          }
        }catch(e){}
      });
    });
  }

  filterBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      filterBtns.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      filter = btn.getAttribute("data-filter");
      apply();
    });
  });

  if(sortSel){
    sortSel.addEventListener("change", ()=>{
      sort = sortSel.value;
      apply();
    });
  }

  if(goCartBtn) goCartBtn.addEventListener("click", ()=>location.href="cart.html");
  if(goCheckoutBtn) goCheckoutBtn.addEventListener("click", ()=>location.href="checkout.html");

  // default active
  const def = document.querySelector('[data-filter="all"]');
  if(def) def.classList.add("active");

  apply();
}

/* ===== Cart page ===== */
function renderCartPage(){
  const listEl = document.querySelector("[data-cart-list]");
  if(!listEl) return;

  const totalEl = document.querySelector("[data-cart-total]");
  const emptyEl = document.querySelector("[data-cart-empty]");

  function paint(){
    const cart = getCart();
    const items = Object.entries(cart)
      .map(([id, qty])=>{
        const p = PRODUCTS.find(x=>x.id===id);
        if(!p) return null;
        return { p, qty };
      })
      .filter(Boolean);

    if(items.length === 0){
      emptyEl?.classList.remove("hidden");
      listEl.innerHTML = "";
      if(totalEl) totalEl.textContent = "0 грн";
      return;
    }
    emptyEl?.classList.add("hidden");

    listEl.innerHTML = items.map(({p, qty})=>`
      <div class="cartItem">
        <img src="${p.img}" alt="${escapeHtml(p.title)}">
        <div>
          <div class="name">${escapeHtml(p.title)}</div>
          <div class="sub">${p.weight} • ${p.price} грн</div>
          <div style="margin-top:10px" class="qty">
            <button type="button" data-cminus="${p.id}">−</button>
            <span data-cval="${p.id}">${qty}</span>
            <button type="button" data-cplus="${p.id}">+</button>
          </div>
        </div>
        <div class="right">
          <div class="price">${p.price * qty} грн</div>
          <button class="smallBtn danger" type="button" data-remove="${p.id}">Удалить</button>
        </div>
      </div>
    `).join("");

    if(totalEl) totalEl.textContent = `${cartTotal(cart)} грн`;

    listEl.querySelectorAll("[data-cplus]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-cplus");
        const cart = getCart();
        setQty(id, (cart[id]||0)+1);
        paint();
      });
    });
    listEl.querySelectorAll("[data-cminus]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-cminus");
        const cart = getCart();
        setQty(id, Math.max(0, (cart[id]||0)-1));
        paint();
      });
    });
    listEl.querySelectorAll("[data-remove]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const id = btn.getAttribute("data-remove");
        setQty(id, 0);
        paint();
      });
    });
  }

  paint();
}

/* ===== Checkout page ===== */
const NP_API_KEY = "e2d2f807d2464e81aae678bb51c9c569";
const NP_ENDPOINT = "https://api.novaposhta.ua/v2.0/json/";

async function npRequest(modelName, calledMethod, methodProperties){
  const res = await fetch(NP_ENDPOINT, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      apiKey: NP_API_KEY,
      modelName,
      calledMethod,
      methodProperties
    })
  });
  const data = await res.json();
  if(!data.success) throw new Error((data.errors||["NP error"]).join(", "));
  return data.data || [];
}

function setupSuggest(inputEl, listEl, fetcher){
  let lastQuery = "";
  let timer = null;

  inputEl.addEventListener("input", ()=>{
    const q = inputEl.value.trim();
    lastQuery = q;
    clearTimeout(timer);
    if(q.length < 2){
      listEl.classList.remove("show");
      listEl.innerHTML = "";
      return;
    }
    timer = setTimeout(async ()=>{
      try{
        const items = await fetcher(q);
        if(inputEl.value.trim() !== lastQuery) return;
        listEl.innerHTML = items.map(x=>`<button type="button" data-val="${escapeHtml(x.value)}" data-id="${escapeHtml(x.id||"")}">${escapeHtml(x.label)}</button>`).join("");
        listEl.classList.toggle("show", items.length > 0);
        listEl.querySelectorAll("button").forEach(b=>{
          b.addEventListener("click", ()=>{
            inputEl.value = b.getAttribute("data-val");
            inputEl.dataset.ref = b.getAttribute("data-id") || "";
            listEl.classList.remove("show");
            listEl.innerHTML = "";
            inputEl.dispatchEvent(new Event("change"));
          });
        });
      }catch(e){
        listEl.classList.remove("show");
        listEl.innerHTML = "";
      }
    }, 250);
  });

  document.addEventListener("click", (e)=>{
    if(!listEl.contains(e.target) && e.target !== inputEl){
      listEl.classList.remove("show");
    }
  });
}

function renderCheckout(){
  const totalEl = document.querySelector("[data-checkout-total]");
  if(!totalEl) return;

  // total
  const cart = getCart();
  const total = cartTotal(cart);
  totalEl.textContent = `${total} грн`;

  // elements
  const nameEl = document.querySelector("#fio");
  const phoneEl = document.querySelector("#phone");
  const cityEl = document.querySelector("#city");
  const whEl = document.querySelector("#warehouse");
  const addrEl = document.querySelector("#address");
  const commentEl = document.querySelector("#comment");
  const payEl = document.querySelector("#pay");
  const sendBtn = document.querySelector("[data-send-order]");

  const cityList = document.querySelector("[data-city-list]");
  const whList = document.querySelector("[data-wh-list]");

  // delivery type buttons
  const segBtns = document.querySelectorAll("[data-delivery]");
  let deliveryType = "branch"; // branch | postomat | courier

  function setDelivery(type){
    deliveryType = type;
    segBtns.forEach(b=>b.classList.toggle("active", b.getAttribute("data-delivery")===type));

    // toggle fields
    const isCourier = type === "courier";
    document.querySelector("[data-warehouse-field]").style.display = isCourier ? "none" : "block";
    document.querySelector("[data-address-field]").style.display = isCourier ? "block" : "none";

    whEl.placeholder = type === "postomat" ? "Введите поштомат..." : "Введите отделение...";
    whEl.value = "";
    whEl.dataset.ref = "";
  }

  segBtns.forEach(b=>{
    b.addEventListener("click", ()=>setDelivery(b.getAttribute("data-delivery")));
  });
  setDelivery("branch");

  // City suggest (NP)
  setupSuggest(cityEl, cityList, async (q)=>{
    const data = await npRequest("Address", "searchSettlements", {
      CityName: q,
      Limit: 10
    });
    const items = (data[0]?.Addresses || []).map(x=>({
      id: x.DeliveryCity,
      value: x.Present,
      label: x.Present
    }));
    return items;
  });

  // When city chosen -> enable warehouse suggest
  cityEl.addEventListener("change", ()=>{
    // clear warehouses
    whEl.value = "";
    whEl.dataset.ref = "";
  });

  // Warehouse suggest
  setupSuggest(whEl, whList, async (q)=>{
    const cityRef = cityEl.dataset.ref || "";
    if(!cityRef) return [];

    // отделение/поштомат
    const type = deliveryType === "postomat" ? "Postomat" : "Branch";

    const data = await npRequest("AddressGeneral", "getWarehouses", {
      CityRef: cityRef,
      FindByString: q,
      Limit: 20,
      TypeOfWarehouseRef: type === "Postomat" ? "f9316480-5f2d-425d-bc2c-ac7cd29decf0" : undefined
    });

    return data.map(x=>({
      id: x.Ref,
      value: x.Description,
      label: x.Description
    })).slice(0, 12);
  });

  // Send order via mailto
  sendBtn.addEventListener("click", ()=>{
    const cartObj = getCart();
    const items = Object.entries(cartObj)
      .map(([id, qty])=>{
        const p = PRODUCTS.find(x=>x.id===id);
        if(!p) return null;
        return `${p.title} — ${qty} шт × ${p.price} грн = ${p.price*qty} грн`;
      })
      .filter(Boolean);

    if(items.length === 0){
      alert("Корзина пуста.");
      return;
    }

    const fio = (nameEl.value||"").trim();
    const phone = (phoneEl.value||"").trim();
    const city = (cityEl.value||"").trim();

    if(!fio || !phone || !city){
      alert("Заполните ФИО, телефон и город.");
      return;
    }

    let deliveryText = "";
    if(deliveryType === "courier"){
      const addr = (addrEl.value||"").trim();
      if(!addr){ alert("Введите адрес для курьера."); return; }
      deliveryText = `Доставка: Курьер\nАдрес: ${addr}`;
    }else{
      const wh = (whEl.value||"").trim();
      if(!wh){ alert("Введите отделение/поштомат."); return; }
      deliveryText = `Доставка: ${deliveryType==="postomat"?"Поштомат":"Отделение"}\nПункт: ${wh}`;
    }

    const pay = payEl.value;
    const comment = (commentEl.value||"").trim();

    const body =
`НОВЫЙ ЗАКАЗ BLACKWOOD

ФИО: ${fio}
Телефон: ${phone}
Город: ${city}
${deliveryText}
Оплата: ${pay}
Комментарий: ${comment || "-"}

ТОВАРЫ:
${items.join("\n")}

ИТОГО: ${cartTotal(cartObj)} грн
`;

    const toEmail = "YOUR_EMAIL_HERE@example.com"; // <- поставь свой email
    const subject = `Заказ BLACKWOOD • ${new Date().toLocaleString()}`;
    const mailto = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // очищаем корзину и переходим на success
    setCart({});
    location.href = "success.html?m=" + encodeURIComponent(mailto);
  });
}

/* ===== Success page ===== */
function renderSuccess(){
  const a = document.querySelector("[data-mailto]");
  if(!a) return;
  const params = new URLSearchParams(location.search);
  const mailto = params.get("m");
  if(mailto){
    a.href = mailto;
    a.style.display = "inline-flex";
  }else{
    a.style.display = "none";
  }
}

/* ===== Utils ===== */
function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", ()=>{
  updateCartBadge();
  setActiveNav();
  setupBurger();
  setupLangButtons();

  renderCatalog();
  renderCartPage();
  renderCheckout();
  renderSuccess();

  // Telegram Mini App init
  try{
    if(window.Telegram?.WebApp){
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }catch(e){}
});
