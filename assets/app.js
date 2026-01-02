/* BLACKWOOD • CHARCOAL — app.js (no sparkles)
   - cart in localStorage
   - catalog render
   - totals & checkout
   - (optional) Nova Poshta via /api/np proxy endpoint
*/

const LS_CART = "bw_cart_v1";
const LS_LANG = "bw_lang_v1";

const PRODUCTS = [
  { id: "core-3",  name: "CORE • 3 KG",  weight: "3 kg",  price: 399, img: "./img/products/core-3kg.png",  tag: "3-5kg" },
  { id: "core-5",  name: "CORE • 5 KG",  weight: "5 kg",  price: 499, img: "./img/products/core-5kg.png",  tag: "3-5kg" },
  { id: "core-10", name: "CORE • 10 KG", weight: "10 kg", price: 599, img: "./img/products/core-10kg.png", tag: "10kg" },
];

function money(n){ return `${Number(n||0)} грн`; }

function loadCart(){
  try{ return JSON.parse(localStorage.getItem(LS_CART) || "{}"); }catch(e){ return {}; }
}
function saveCart(cart){
  localStorage.setItem(LS_CART, JSON.stringify(cart));
  updateCartBadges();
}
function cartCount(cart){
  return Object.values(cart).reduce((a,b)=>a + (b||0), 0);
}
function cartTotal(cart){
  let sum = 0;
  for(const [id, qty] of Object.entries(cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) sum += p.price * (qty||0);
  }
  return sum;
}
function updateCartBadges(){
  const cart = loadCart();
  const count = cartCount(cart);
  document.querySelectorAll("[data-cart-count]").forEach(el=>el.textContent = count);
}

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a, .mobile-menu a").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if(href === path) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function initBurger(){
  const b = document.querySelector("[data-burger]");
  const m = document.querySelector("[data-mobile-menu]");
  if(!b || !m) return;
  b.addEventListener("click", ()=>{
    m.classList.toggle("show");
  });
}

function initLang(){
  const saved = localStorage.getItem(LS_LANG) || "RU";
  document.querySelectorAll("[data-lang]").forEach(btn=>{
    const v = btn.getAttribute("data-lang");
    if(v === saved) btn.classList.add("active"); else btn.classList.remove("active");
    btn.addEventListener("click", ()=>{
      localStorage.setItem(LS_LANG, v);
      document.querySelectorAll("[data-lang]").forEach(x=>x.classList.toggle("active", x.getAttribute("data-lang")===v));
      // Минимально: меняем только подписи кнопок "Корзина/Кошик", но можно расширить.
      updateLangTexts(v);
    });
  });
  updateLangTexts(saved);
}
function updateLangTexts(lang){
  // Simple UI labels
  document.querySelectorAll("[data-i18n-cart]").forEach(el=>{
    el.textContent = (lang==="UKR") ? "Кошик" : "Корзина";
  });
}

function bindGoCatalog(){
  const btn = document.querySelector("[data-go-catalog]");
  if(btn) btn.addEventListener("click", ()=> location.href = "./catalog.html");
}

/* ---------------- Catalog ---------------- */
function renderCatalog(){
  const mount = document.querySelector("[data-catalog-grid]");
  if(!mount) return;

  let filter = "all";

  const setFilter = (v)=>{
    filter = v;
    document.querySelectorAll("[data-filter]").forEach(p=>{
      p.classList.toggle("active", p.getAttribute("data-filter")===v);
    });
    paint();
  };

  document.querySelectorAll("[data-filter]").forEach(p=>{
    p.addEventListener("click", ()=> setFilter(p.getAttribute("data-filter")));
  });

  const sortSel = document.querySelector("[data-sort]");
  if(sortSel){
    sortSel.addEventListener("change", paint);
  }

  function paint(){
    const cart = loadCart();
    let list = [...PRODUCTS];

    if(filter !== "all"){
      list = list.filter(p=>p.tag === filter);
    }

    const s = (sortSel?.value || "popular");
    if(s === "price_asc") list.sort((a,b)=>a.price-b.price);
    if(s === "price_desc") list.sort((a,b)=>b.price-a.price);

    mount.innerHTML = list.map(p=>{
      const qty = cart[p.id] || 1;
      return `
        <article class="card" data-product="${p.id}">
          <div class="card__media">
            <div class="media-frame">
              <img src="${p.img}" alt="${p.name}">
            </div>
          </div>
          <div class="card__body">
            <div class="card__title">
              <h3>${p.name}</h3>
              <div class="price">${money(p.price)}</div>
            </div>
            <div class="card__meta">
              <div>${p.weight}</div>
              <div>Вес: ${p.weight}</div>
            </div>
            <div class="card__actions">
              <div class="qty">
                <button class="qbtn" data-qty-minus>-</button>
                <div class="qval" data-qty-val>${qty}</div>
                <button class="qbtn" data-qty-plus>+</button>
              </div>
              <button class="btn primary" data-add>В КОРЗИНУ</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // bind events
    mount.querySelectorAll("[data-product]").forEach(card=>{
      const id = card.getAttribute("data-product");
      const qval = card.querySelector("[data-qty-val]");
      const minus = card.querySelector("[data-qty-minus]");
      const plus  = card.querySelector("[data-qty-plus]");
      const add   = card.querySelector("[data-add]");

      let qty = Number(qval.textContent || 1);
      const clamp = ()=>{ qty = Math.max(1, Math.min(99, qty)); qval.textContent = qty; };

      minus.addEventListener("click", ()=>{ qty--; clamp(); });
      plus.addEventListener("click", ()=>{ qty++; clamp(); });

      add.addEventListener("click", ()=>{
        const cart = loadCart();
        cart[id] = (cart[id] || 0) + qty;
        saveCart(cart);
      });
    });

    updateCartBadges();
  }

  setFilter("all");

  const toCart = document.querySelector("[data-to-cart]");
  const toCheckout = document.querySelector("[data-to-checkout]");
  if(toCart) toCart.addEventListener("click", ()=> location.href="./cart.html");
  if(toCheckout) toCheckout.addEventListener("click", ()=> location.href="./checkout.html");
}

/* ---------------- Cart page ---------------- */
function renderCart(){
  const mount = document.querySelector("[data-cart-table]");
  const sumMount = document.querySelector("[data-cart-summary]");
  if(!mount || !sumMount) return;

  const cart = loadCart();
  const ids = Object.keys(cart).filter(id=>cart[id]>0);

  if(ids.length === 0){
    mount.innerHTML = `<div class="empty">Корзина пустая. Перейдите в каталог и добавьте товары.</div>`;
    sumMount.innerHTML = `
      <div class="sumline"><span>Товары</span><strong>0</strong></div>
      <div class="sumline sumtotal"><span>Итого</span><strong>${money(0)}</strong></div>
      <div class="catalog-cta">
        <a class="btn primary" href="./catalog.html">Открыть каталог</a>
      </div>
    `;
    updateCartBadges();
    return;
  }

  function paint(){
    const cart = loadCart();
    const rows = Object.keys(cart).filter(id=>cart[id]>0).map(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      const qty = cart[id] || 0;
      const line = (p? p.price:0) * qty;

      return `
        <div class="row" data-row="${id}">
          <div class="thumb"><img src="${p?.img||""}" alt=""></div>
          <div>
            <div class="rtitle">${p?.name||id}</div>
            <div class="rsub">${p?.weight||""}</div>
          </div>

          <div>
            <div class="qty">
              <button class="qbtn" data-m>-</button>
              <div class="qval" data-q>${qty}</div>
              <button class="qbtn" data-p>+</button>
            </div>
          </div>

          <div class="rprice">${money(p?.price||0)}</div>
          <div class="rsum">${money(line)}</div>

          <button class="xbtn" title="Удалить" data-x>✕</button>
        </div>
      `;
    }).join("");

    mount.innerHTML = `<div class="table">${rows}</div>`;

    mount.querySelectorAll("[data-row]").forEach(r=>{
      const id = r.getAttribute("data-row");
      r.querySelector("[data-m]").addEventListener("click", ()=>{
        const cart = loadCart();
        cart[id] = Math.max(0, (cart[id]||0) - 1);
        saveCart(cart);
        paint();
      });
      r.querySelector("[data-p]").addEventListener("click", ()=>{
        const cart = loadCart();
        cart[id] = Math.min(999, (cart[id]||0) + 1);
        saveCart(cart);
        paint();
      });
      r.querySelector("[data-x]").addEventListener("click", ()=>{
        const cart = loadCart();
        delete cart[id];
        saveCart(cart);
        paint();
      });
    });

    const cart2 = loadCart();
    const count = cartCount(cart2);
    const total = cartTotal(cart2);

    sumMount.innerHTML = `
      <h3>Корзина</h3>
      <div class="sumline"><span>Товары</span><strong>${count}</strong></div>
      <div class="sumline sumtotal"><span>Итого</span><strong>${money(total)}</strong></div>
      <div class="catalog-cta">
        <a class="btn ghost" href="./catalog.html">Продолжить покупки</a>
        <a class="btn primary" href="./checkout.html">Оформить заказ</a>
      </div>
    `;
  }

  paint();
}

/* ---------------- Checkout ---------------- */
async function npProxyCall(action, payload){
  // This expects YOUR server/proxy at /api/np
  // Example: POST /api/np { action: "searchCities", payload: {...} }
  const res = await fetch("./api/np", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ action, payload })
  });
  if(!res.ok) throw new Error("NP proxy not available");
  return await res.json();
}

function debounce(fn, ms=250){
  let t=null;
  return (...args)=>{
    clearTimeout(t);
    t=setTimeout(()=>fn(...args), ms);
  };
}

function renderCheckout(){
  const totalEl = document.querySelector("[data-checkout-total]");
  const countEl = document.querySelector("[data-checkout-count]");
  const form = document.querySelector("[data-checkout-form]");
  if(!totalEl || !countEl || !form) return;

  const cart = loadCart();
  const count = cartCount(cart);
  const total = cartTotal(cart);

  countEl.textContent = String(count);
  totalEl.textContent = money(total);

  // Delivery type buttons
  const dBtns = document.querySelectorAll("[data-delivery]");
  const branchWrap = document.querySelector("[data-branch-wrap]");
  const branchInput = document.querySelector("[name='branch']");
  const cityInput = document.querySelector("[name='city']");
  const phoneInput = document.querySelector("[name='phone']");

  let delivery = "warehouse"; // warehouse | postomat | courier

  function setDelivery(v){
    delivery = v;
    dBtns.forEach(b=>b.classList.toggle("active", b.getAttribute("data-delivery")===v));
    if(v === "courier"){
      if(branchWrap) branchWrap.style.display = "none";
      if(branchInput) branchInput.value = "";
    }else{
      if(branchWrap) branchWrap.style.display = "";
    }
  }

  dBtns.forEach(b=>{
    b.addEventListener("click", ()=> setDelivery(b.getAttribute("data-delivery")));
  });
  setDelivery("warehouse");

  // City suggestions (via proxy if available)
  const cityList = document.querySelector("#cityList");
  const branchList = document.querySelector("#branchList");

  const safeSetOptions = (datalist, arr)=>{
    if(!datalist) return;
    datalist.innerHTML = arr.map(s=>`<option value="${escapeHtml(s)}"></option>`).join("");
  };

  const cityFetch = debounce(async ()=>{
    const q = (cityInput?.value || "").trim();
    if(q.length < 2){ safeSetOptions(cityList, []); return; }
    try{
      const data = await npProxyCall("searchCities", { query: q });
      const items = (data?.data || []).slice(0,10).map(x=>x.Present || x.Description || x);
      safeSetOptions(cityList, items.filter(Boolean));
    }catch(e){
      // no proxy — keep silent (manual input)
      safeSetOptions(cityList, []);
    }
  }, 250);

  const branchFetch = debounce(async ()=>{
    const city = (cityInput?.value || "").trim();
    const q = (branchInput?.value || "").trim();
    if(delivery === "courier"){ safeSetOptions(branchList, []); return; }
    if(city.length < 2){ safeSetOptions(branchList, []); return; }

    try{
      const data = await npProxyCall("searchWarehouses", { city, query: q, type: delivery });
      const items = (data?.data || []).slice(0,10).map(x=>x.Description || x.Present || x);
      safeSetOptions(branchList, items.filter(Boolean));
    }catch(e){
      safeSetOptions(branchList, []);
    }
  }, 250);

  if(cityInput){
    cityInput.addEventListener("input", cityFetch);
    cityInput.addEventListener("change", branchFetch);
  }
  if(branchInput){
    branchInput.addEventListener("input", branchFetch);
  }

  // Submit => mailto with order summary (GitHub Pages limitation)
  form.addEventListener("submit", (ev)=>{
    ev.preventDefault();

    const data = new FormData(form);
    const fio = (data.get("fio")||"").toString().trim();
    const phone = (data.get("phone")||"").toString().trim();
    const city = (data.get("city")||"").toString().trim();
    const pay  = (data.get("pay")||"").toString().trim();
    const branch = (data.get("branch")||"").toString().trim();
    const comment = (data.get("comment")||"").toString().trim();

    if(!fio || !phone || !city){
      alert("Заполните ФИО, телефон и город.");
      return;
    }
    if(delivery !== "courier" && !branch){
      alert("Выберите отделение/поштомат или выберите Курьер.");
      return;
    }

    const cart = loadCart();
    const lines = Object.keys(cart).filter(id=>cart[id]>0).map(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      const qty = cart[id];
      return `${p?.name||id} — ${qty} шт × ${p?.price||0} = ${ (p?.price||0)*qty } грн`;
    });

    const total = cartTotal(cart);

    const subject = `BLACKWOOD • Заказ на ${total} грн`;
    const body =
`Новый заказ BLACKWOOD

ФИО: ${fio}
Телефон: ${phone}
Город: ${city}
Доставка: ${delivery === "warehouse" ? "Отделение" : delivery === "postomat" ? "Поштомат" : "Курьер"}
${delivery === "courier" ? "" : "Отделение/Поштомат: " + branch}

Оплата: ${pay}
Комментарий: ${comment}

Товары:
${lines.join("\n")}

Итого: ${total} грн
`;

    // Replace with your email:
    const email = (document.querySelector("[data-order-email]")?.getAttribute("data-order-email") || "").trim();
    if(!email){
      alert("Не задан email получателя заказа. Укажи его в checkout.html (data-order-email).");
      return;
    }

    const url = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  });

  // phone normalize minimal
  if(phoneInput){
    phoneInput.addEventListener("blur", ()=>{
      let v = (phoneInput.value||"").trim();
      if(v && !v.startsWith("+")) v = "+380" + v.replace(/\D/g,"").replace(/^380/,"");
      phoneInput.value = v;
    });
  }
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (c)=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

/* ---------------- Init ---------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  updateCartBadges();
  setActiveNav();
  initBurger();
  initLang();
  bindGoCatalog();

  renderCatalog();
  renderCart();
  renderCheckout();
});
