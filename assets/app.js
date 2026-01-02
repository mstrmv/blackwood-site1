/* BLACKWOOD shop – single JS for all pages (GitHub Pages friendly)
   Cart in localStorage
*/

const STORE_KEY = "bw_cart_v1";
const LANG_KEY  = "bw_lang_v1";

const PRODUCTS = [
  { id: "core-3",  name: "CORE • 3 KG",  weight: "3 kg",  price: 399, img: "img/products/core-3kg.png",  tag: "3-5kg" },
  { id: "core-5",  name: "CORE • 5 KG",  weight: "5 kg",  price: 499, img: "img/products/core-5kg.png",  tag: "3-5kg" },
  { id: "core-10", name: "CORE • 10 KG", weight: "10 kg", price: 599, img: "img/products/core-10kg.png", tag: "10kg" },
];

function getCart(){
  try{
    return JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  }catch(e){
    return [];
  }
}
function saveCart(cart){
  localStorage.setItem(STORE_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function cartCount(){
  return getCart().reduce((sum, it) => sum + (it.qty || 0), 0);
}
function cartTotal(){
  const cart = getCart();
  let total = 0;
  for(const it of cart){
    const p = PRODUCTS.find(x => x.id === it.id);
    if(p) total += p.price * (it.qty || 0);
  }
  return total;
}
function setQty(id, qty){
  let cart = getCart();
  const idx = cart.findIndex(x => x.id === id);
  if(qty <= 0){
    if(idx >= 0) cart.splice(idx, 1);
  }else{
    if(idx >= 0) cart[idx].qty = qty;
    else cart.push({ id, qty });
  }
  saveCart(cart);
}
function addOne(id){
  const cart = getCart();
  const it = cart.find(x => x.id === id);
  const qty = (it?.qty || 0) + 1;
  setQty(id, qty);
}
function subOne(id){
  const cart = getCart();
  const it = cart.find(x => x.id === id);
  const qty = (it?.qty || 0) - 1;
  setQty(id, qty);
}

function updateCartBadge(){
  const el = document.querySelector("[data-cart-count]");
  if(el) el.textContent = String(cartCount());
}

function setActiveNav(){
  const page = document.body.getAttribute("data-page") || "";
  document.querySelectorAll("[data-nav]").forEach(a=>{
    a.classList.toggle("active", a.getAttribute("data-nav") === page);
  });
}

function mobileMenu(){
  const btn = document.querySelector("[data-burger]");
  const menu = document.querySelector("[data-mobile-nav]");
  if(!btn || !menu) return;
  btn.addEventListener("click", ()=>{
    menu.classList.toggle("open");
  });
}

function langInit(){
  const saved = localStorage.getItem(LANG_KEY) || "RU";
  document.querySelectorAll("[data-lang]").forEach(b=>{
    b.classList.toggle("active", b.getAttribute("data-lang") === saved);
    b.addEventListener("click", ()=>{
      localStorage.setItem(LANG_KEY, b.getAttribute("data-lang"));
      document.querySelectorAll("[data-lang]").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
    });
  });
}

function renderCatalog(){
  const grid = document.querySelector("#productGrid");
  if(!grid) return;

  // filters
  let active = "all";
  const pills = document.querySelectorAll("[data-filter]");
  pills.forEach(p=>{
    p.addEventListener("click", ()=>{
      pills.forEach(x=>x.classList.remove("active"));
      p.classList.add("active");
      active = p.getAttribute("data-filter");
      draw();
    });
  });

  function draw(){
    grid.innerHTML = "";
    const items = PRODUCTS.filter(p=>{
      if(active === "all") return true;
      if(active === "3-5kg") return p.tag === "3-5kg";
      if(active === "10kg") return p.tag === "10kg";
      return true;
    });

    for(const p of items){
      const cart = getCart();
      const inCart = cart.find(x => x.id === p.id);
      const qty = inCart?.qty || 0;

      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <div class="product__img">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="product__title">${p.name}</div>
        <div class="product__meta">
          <span>${p.weight}</span>
          <span class="price">${p.price} грн</span>
        </div>

        <div class="qtyrow">
          <div class="qty">
            <button type="button" data-sub>-</button>
            <b data-q>${qty}</b>
            <button type="button" data-add>+</button>
          </div>
          <button class="btn primary buy" type="button" data-buy>В КОРЗИНУ</button>
        </div>
      `;
      card.querySelector("[data-add]").addEventListener("click", ()=>{
        addOne(p.id);
        card.querySelector("[data-q]").textContent = String(getCart().find(x=>x.id===p.id)?.qty || 0);
      });
      card.querySelector("[data-sub]").addEventListener("click", ()=>{
        subOne(p.id);
        card.querySelector("[data-q]").textContent = String(getCart().find(x=>x.id===p.id)?.qty || 0);
      });
      card.querySelector("[data-buy]").addEventListener("click", ()=>{
        addOne(p.id);
        card.querySelector("[data-q]").textContent = String(getCart().find(x=>x.id===p.id)?.qty || 0);
      });

      grid.appendChild(card);
    }
  }

  draw();
}

function renderCart(){
  const wrap = document.querySelector("#cartLines");
  const totalEl = document.querySelector("[data-total]");
  if(!wrap) return;

  const cart = getCart();
  wrap.innerHTML = "";

  if(cart.length === 0){
    wrap.innerHTML = `<div class="panel" style="padding:18px;border-radius:18px;">Корзина пустая.</div>`;
    if(totalEl) totalEl.textContent = "0";
    return;
  }

  for(const it of cart){
    const p = PRODUCTS.find(x=>x.id===it.id);
    if(!p) continue;

    const line = document.createElement("div");
    line.className = "line";
    line.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div>
        <h3>${p.name}</h3>
        <div class="small">${p.weight} • ${p.price} грн</div>
        <div style="margin-top:10px;" class="qty">
          <button type="button" data-sub>-</button>
          <b data-q>${it.qty}</b>
          <button type="button" data-add>+</button>
        </div>
      </div>
      <div class="rightbox">
        <div class="price">${p.price * it.qty} грн</div>
        <button class="remove" type="button" data-remove>Удалить</button>
      </div>
    `;

    line.querySelector("[data-add]").addEventListener("click", ()=>{
      addOne(p.id);
      renderCart();
    });
    line.querySelector("[data-sub]").addEventListener("click", ()=>{
      subOne(p.id);
      renderCart();
    });
    line.querySelector("[data-remove]").addEventListener("click", ()=>{
      setQty(p.id, 0);
      renderCart();
    });

    wrap.appendChild(line);
  }

  if(totalEl) totalEl.textContent = String(cartTotal());
}

function checkoutInit(){
  const totalEl = document.querySelector("[data-total]");
  const form = document.querySelector("#checkoutForm");
  if(!form) return;

  if(totalEl) totalEl.textContent = String(cartTotal());

  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const cart = getCart();
    if(cart.length === 0){
      alert("Корзина пустая.");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    // Build order text
    const itemsText = cart.map(it=>{
      const p = PRODUCTS.find(x=>x.id===it.id);
      return p ? `${p.name} — ${it.qty} шт. × ${p.price} = ${p.price*it.qty} грн` : "";
    }).filter(Boolean).join("\n");

    const text =
`НОВЫЙ ЗАКАЗ BLACKWOOD

Товары:
${itemsText}

Итого: ${cartTotal()} грн

Данные:
ФИО: ${data.fio || ""}
Телефон: ${data.phone || ""}
Город: ${data.city || ""}
Способ доставки: ${data.ship || ""}
Отделение/Почтомат/Адрес: ${data.branch || ""}
Оплата: ${data.pay || ""}
Комментарий: ${data.comment || ""}

(Заказ отправлен через mailto из GitHub Pages.)`;

    const subject = encodeURIComponent("Заказ BLACKWOOD • CHARCOAL");
    const body = encodeURIComponent(text);

    // TODO: заменить на свой email
    const to = "YOUR_EMAIL_HERE@example.com";

    // open mail client
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  updateCartBadge();
  setActiveNav();
  mobileMenu();
  langInit();

  renderCatalog();
  renderCart();
  checkoutInit();
});
