// Simple shop logic (catalog + cart) using localStorage
const CART_KEY = "bw_cart_v1";

function money(n){ return Math.round(n); }

function loadCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    const obj = raw ? JSON.parse(raw) : {};
    return obj && typeof obj === "object" ? obj : {};
  }catch{
    return {};
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadges();
}

function cartCount(cart){
  return Object.values(cart).reduce((sum, item)=> sum + (item.qty||0), 0);
}

function cartTotal(cart){
  return Object.values(cart).reduce((sum, item)=> sum + (item.qty||0) * (item.price||0), 0);
}

function updateCartBadges(){
  const cart = loadCart();
  const count = cartCount(cart);
  document.querySelectorAll("[data-cart-count]").forEach(el=> el.textContent = String(count));
}

const PRODUCTS = [
  // Charcoal
  { id:"core-3kg",  name:{uk:"CORE • 3 KG",  ru:"CORE • 3 KG",  en:"CORE • 3 KG"},  desc:{uk:"Вугілля 3 кг", ru:"Уголь 3 кг", en:"Charcoal 3 kg"},  price:399, img:"core-3kg.png",  cat:"charcoal", pop:10 },
  { id:"core-5kg",  name:{uk:"CORE • 5 KG",  ru:"CORE • 5 KG",  en:"CORE • 5 KG"},  desc:{uk:"Вугілля 5 кг", ru:"Уголь 5 кг", en:"Charcoal 5 kg"},  price:499, img:"core-5kg.png",  cat:"charcoal", pop:9 },
  { id:"core-10kg", name:{uk:"CORE • 10 KG", ru:"CORE • 10 KG", en:"CORE • 10 KG"}, desc:{uk:"Вугілля 10 кг",ru:"Уголь 10 кг",en:"Charcoal 10 kg"}, price:599, img:"core-10kg.png", cat:"charcoal", pop:8 },

  // Accessories (your JPGs)
  { id:"starter",       name:{uk:"CHARCOAL STARTER", ru:"CHARCOAL STARTER", en:"CHARCOAL STARTER"}, desc:{uk:"Стартер для вугілля",ru:"Стартер для угля",en:"Charcoal starter"}, price:799, img:"starter.jpg", cat:"accessories", pop:7 },
  { id:"royal-ignition",name:{uk:"ROYAL IGNITION", ru:"ROYAL IGNITION", en:"ROYAL IGNITION"}, desc:{uk:"Рідина для розпалу",ru:"Жидкость для розжига",en:"Ignition fluid"}, price:299, img:"royal-ignition.jpg", cat:"accessories", pop:7 },
  { id:"thermometer",   name:{uk:"DIGITAL THERMOMETER", ru:"DIGITAL THERMOMETER", en:"DIGITAL THERMOMETER"}, desc:{uk:"Термометр",ru:"Термометр",en:"Thermometer"}, price:549, img:"thermometer.jpg", cat:"accessories", pop:6 },

  { id:"grid-double",   name:{uk:"GRID DOUBLE", ru:"GRID DOUBLE", en:"GRID DOUBLE"}, desc:{uk:"Подвійна решітка",ru:"Двойная решетка",en:"Double grill grid"}, price:699, img:"grid-double.jpg", cat:"accessories", pop:6 },
  { id:"grid-sausage",  name:{uk:"GRID SAUSAGE", ru:"GRID SAUSAGE", en:"GRID SAUSAGE"}, desc:{uk:"Решітка для ковбасок",ru:"Решетка для сосисок",en:"Sausage grid"}, price:649, img:"grid-sausage.jpg", cat:"accessories", pop:5 },
  { id:"grid-flat",     name:{uk:"GRID FLAT", ru:"GRID FLAT", en:"GRID FLAT"}, desc:{uk:"Пласка решітка",ru:"Плоская решетка",en:"Flat grid"}, price:629, img:"grid-flat.jpg", cat:"accessories", pop:5 },

  { id:"gloves",        name:{uk:"GLOVES", ru:"GLOVES", en:"GLOVES"}, desc:{uk:"Рукавички",ru:"Перчатки",en:"Gloves"}, price:499, img:"gloves.jpg", cat:"accessories", pop:4 },
  { id:"apron",         name:{uk:"APRON", ru:"APRON", en:"APRON"}, desc:{uk:"Фартух",ru:"Фартук",en:"Apron"}, price:699, img:"apron.jpg", cat:"accessories", pop:4 },
  { id:"blower",        name:{uk:"BLOWER", ru:"BLOWER", en:"BLOWER"}, desc:{uk:"Міх для роздування",ru:"Мех для раздува",en:"BBQ blower"}, price:249, img:"blower.jpg", cat:"accessories", pop:3 },
  { id:"grill-set",     name:{uk:"GRILL SET", ru:"GRILL SET", en:"GRILL SET"}, desc:{uk:"Набір для гриля",ru:"Набор для гриля",en:"Grill tools set"}, price:1499, img:"grill-set.jpg", cat:"accessories", pop:3 },
  { id:"weekend-box",   name:{uk:"WEEKEND BOX", ru:"WEEKEND BOX", en:"WEEKEND BOX"}, desc:{uk:"Набір вихідного дня",ru:"Набор выходного дня",en:"Weekend box"}, price:1999, img:"weekend-box.jpg", cat:"accessories", pop:2 },
];

function getProduct(id){
  return PRODUCTS.find(p=>p.id===id);
}

function getCurrency(lang){
  return (window.I18N?.[lang]?.currency) || "грн";
}

function renderCatalog(){
  const root = document.querySelector("[data-catalog]");
  if (!root) return;

  const lang = getLang();
  const currency = getCurrency(lang);

  const state = window.AppState || (window.AppState = {
    cat: "all",
    sort: "popular",
  });

  let list = [...PRODUCTS];

  if (state.cat !== "all") list = list.filter(p=>p.cat === state.cat);

  if (state.sort === "popular") list.sort((a,b)=>(b.pop||0)-(a.pop||0));
  if (state.sort === "price_asc") list.sort((a,b)=>(a.price||0)-(b.price||0));
  if (state.sort === "price_desc") list.sort((a,b)=>(b.price||0)-(a.price||0));

  root.innerHTML = list.map(p=>{
    const title = p.name[lang] || p.name.uk;
    const desc  = p.desc[lang] || p.desc.uk;
    return `
      <div class="card">
        <div class="img"><img src="${p.img}" alt="${title}"></div>
        <div class="body">
          <div class="title">
            <h3>${title}</h3>
            <div class="price">${money(p.price)} ${currency}</div>
          </div>
          <div class="meta">${desc}</div>
          <div class="row">
            <div class="qty">
              <button type="button" data-qty-minus="${p.id}">−</button>
              <span data-qty="${p.id}">1</span>
              <button type="button" data-qty-plus="${p.id}">+</button>
            </div>
            <button class="add" type="button" data-add="${p.id}" data-i18n="add_to_cart">${window.I18N[lang].add_to_cart}</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // qty controllers
  const qtyMap = window.QTYMAP || (window.QTYMAP = {});
  list.forEach(p=>{ if (!qtyMap[p.id]) qtyMap[p.id] = 1; });

  root.querySelectorAll("[data-qty]").forEach(el=>{
    const id = el.dataset.qty;
    el.textContent = String(qtyMap[id] || 1);
  });

  root.querySelectorAll("[data-qty-minus]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.dataset.qtyMinus;
      qtyMap[id] = Math.max(1, (qtyMap[id]||1) - 1);
      const el = root.querySelector(`[data-qty="${id}"]`);
      if (el) el.textContent = String(qtyMap[id]);
    });
  });
  root.querySelectorAll("[data-qty-plus]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.dataset.qtyPlus;
      qtyMap[id] = Math.min(99, (qtyMap[id]||1) + 1);
      const el = root.querySelector(`[data-qty="${id}"]`);
      if (el) el.textContent = String(qtyMap[id]);
    });
  });

  root.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.dataset.add;
      const p = getProduct(id);
      if (!p) return;

      const cart = loadCart();
      const addQty = qtyMap[id] || 1;

      if (!cart[id]) {
        cart[id] = { id, qty: 0, price: p.price, img: p.img };
      }
      cart[id].qty += addQty;
      saveCart(cart);
    });
  });
}

function bindCatalogControls(){
  const chips = document.querySelectorAll("[data-chip]");
  const sortSel = document.querySelector("[data-sort]");

  if (!chips.length && !sortSel) return;

  const state = window.AppState || (window.AppState = { cat:"all", sort:"popular" });

  function setChipActive(){
    chips.forEach(c=> c.classList.toggle("active", c.dataset.chip === state.cat));
  }

  chips.forEach(c=>{
    c.addEventListener("click", ()=>{
      state.cat = c.dataset.chip;
      setChipActive();
      renderCatalog();
    });
  });

  if (sortSel){
    sortSel.addEventListener("change", ()=>{
      state.sort = sortSel.value;
      renderCatalog();
    });
  }

  setChipActive();
}

function renderCart(){
  const root = document.querySelector("[data-cart]");
  if (!root) return;

  const lang = getLang();
  const currency = getCurrency(lang);

  const cart = loadCart();
  const items = Object.values(cart).filter(it=>it.qty>0);

  if (!items.length){
    root.innerHTML = `<div class="p" data-i18n="empty_cart">${window.I18N[lang].empty_cart}</div>`;
    document.querySelectorAll("[data-cart-total]").forEach(el=>el.textContent = `0 ${currency}`);
    return;
  }

  root.innerHTML = `
    <div class="cartlist">
      ${items.map(it=>{
        const p = getProduct(it.id);
        const title = (p?.name?.[lang]) || (p?.name?.uk) || it.id;
        const lineTotal = money((it.qty||0) * (it.price||0));
        return `
          <div class="cartitem">
            <img src="${it.img}" alt="${title}">
            <div class="ci">
              <div>
                <h4>${title}</h4>
                <div class="small">${money(it.price)} ${currency} • x${it.qty} = <strong>${lineTotal} ${currency}</strong></div>
              </div>
              <div class="actions">
                <button type="button" data-ci-minus="${it.id}">−</button>
                <button type="button" data-ci-plus="${it.id}">+</button>
                <button type="button" data-ci-del="${it.id}">✕</button>
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  root.querySelectorAll("[data-ci-minus]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const id = b.dataset.ciMinus;
      const cart = loadCart();
      if (!cart[id]) return;
      cart[id].qty = Math.max(0, (cart[id].qty||0)-1);
      if (cart[id].qty === 0) delete cart[id];
      saveCart(cart);
      renderCart();
    });
  });

  root.querySelectorAll("[data-ci-plus]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const id = b.dataset.ciPlus;
      const cart = loadCart();
      if (!cart[id]) return;
      cart[id].qty = Math.min(99, (cart[id].qty||0)+1);
      saveCart(cart);
      renderCart();
    });
  });

  root.querySelectorAll("[data-ci-del]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const id = b.dataset.ciDel;
      const cart = loadCart();
      delete cart[id];
      saveCart(cart);
      renderCart();
    });
  });

  const total = cartTotal(loadCart());
  document.querySelectorAll("[data-cart-total]").forEach(el=>el.textContent = `${money(total)} ${currency}`);
}

function bindCheckout(){
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const cart = loadCart();
    if (cartCount(cart) === 0){
      alert("Cart is empty");
      return;
    }

    // Here you can интегрировать Telegram/CRM позже.
    // Сейчас — имитация успешного заказа.
    localStorage.removeItem(CART_KEY);
    updateCartBadges();
    window.location.href = "success.html";
  });
}

function highlightActiveNav(){
  const file = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a=>{
    a.classList.toggle("active", a.getAttribute("href") === file);
  });
}

window.App = {
  onLangChange(){
    // re-render dynamic parts
    renderCatalog();
    renderCart();
  }
};

document.addEventListener("DOMContentLoaded", ()=>{
  // Lang init (default UKR)
  setLang(getLang());

  // Global UI
  highlightActiveNav();
  updateCartBadges();

  // Catalog + cart + checkout
  bindCatalogControls();
  renderCatalog();
  renderCart();
  bindCheckout();
});
