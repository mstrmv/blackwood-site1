/* =========================================================
   BLACKWOOD • app.js (full)
   - i18n RU/UKR/EN
   - cart (localStorage)
   - catalog add-to-cart
   - cart page render
   - checkout demo -> success
   - reveal (stagger)
   - header scroll effect + parallax (desktop only)
   - live embers particles (canvas) (desktop only)
   ========================================================= */

/* ===== i18n ===== */
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

/* ===== Motion / performance guards (mobile + reduced motion) ===== */
function prefersReducedMotion(){
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function isMobileLike(){
  // simple heuristics: small screen or coarse pointer
  const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  return coarse || Math.min(window.innerWidth, window.innerHeight) < 820;
}
function allowHeavyFX(){
  if (prefersReducedMotion()) return false;
  if (isMobileLike()) return false; // auto disable on mobile
  return true;
}

/* ===== Language ===== */
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

  updateCartBadge();
}
function initLangButtons(){
  ["ru","uk","en"].forEach(l=>{
    const b = $("#lang-"+l);
    if(b) b.addEventListener("click", ()=>setLang(l));
  });
  setLang(getLang());
}

/* ===== Cart ===== */
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
    "core-3":  { img:"./img/products/core-3kg.png", title:"CORE • 3 KG"  },
    "core-5":  { img:"./img/products/core-5kg.png", title:"CORE • 5 KG"  },
    "core-10": { img:"./img/products/core-10kg.png", title:"CORE • 10 KG" },
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

/* ===== Toast ===== */
let toastTimer = null;
function toast(text){
  const el = $("#toast");
  if(!el) return;
  el.textContent = text;
  el.classList.add("show");
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove("show"), 1200);
}

/* ===== Reveal (stagger) ===== */
function initRevealStagger(){
  const els = $$(".reveal");
  if(!els.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const delay = Number(el.getAttribute("data-stagger") || "0");
      setTimeout(()=> el.classList.add("in"), delay);
      io.unobserve(el);
    });
  },{threshold:0.15});

  els.forEach((el, idx)=>{
    if(!el.hasAttribute("data-stagger")){
      el.setAttribute("data-stagger", String(Math.min(idx * 70, 420)));
    }
    io.observe(el);
  });
}

/* ===== Catalog cards wiring ===== */
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
      if(val) val.textContent = qty;
    });

    plus?.addEventListener("click", ()=>{
      qty = Math.min(99, qty+1);
      if(val) val.textContent = qty;
    });

    addBtn?.addEventListener("click", ()=>{
      addToCart(id, qty);
      addBtn.style.transform = "scale(.98)";
      setTimeout(()=> addBtn.style.transform = "", 120);
    });
  });

  updateCartBadge();
}

/* ===== Cart page render ===== */
function renderCartPage(){
  const wrap = $("#cartList");
  if(!wrap) return;

  const lang = getLang();
  const cart = loadCart();
  const db = productsDB();
  const count = cartCount(cart);

  const badge = $("#cartCount");
  if(badge) badge.textContent = count;

  const totalEl = $("#itemsTotal");
  if(totalEl) totalEl.textContent = count;

  wrap.innerHTML = "";

  if(count === 0){
    wrap.innerHTML = `<div class="card reveal in" style="color:var(--muted)">${I18N[lang].cart_empty}</div>`;
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

/* ===== Checkout ===== */
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
      name: $("#name")?.value?.trim() || "",
      phone: $("#phone")?.value?.trim() || "",
      city: $("#city")?.value?.trim() || "",
      delivery: $("#delivery")?.value || "",
      payment: $("#payment")?.value || "",
      comment: $("#comment")?.value?.trim() || "",
      cart,
      created_at: new Date().toISOString()
    };

    localStorage.setItem(ORDER_KEY, JSON.stringify(data));
    saveCart({}); // чистим корзину
    window.location.href = "./success.html";
  });
}

/* ===== Success ===== */
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

/* =========================================================
   (OPT) Header scroll effect + Parallax (desktop only)
   ========================================================= */
function initHeaderAndParallax(){
  // always keep header nice; parallax only if allowed
  const heavy = allowHeavyFX();

  let ticking = false;
  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));

  function onScroll(){
    if(ticking) return;
    ticking = true;

    requestAnimationFrame(()=>{
      const y = window.scrollY || 0;

      // Header dynamic opacity (works even on mobile)
      const t = clamp(y / 240, 0, 1);
      const navA = 0.30 + t * 0.55;   // 0.30 -> 0.85
      const border = 0.04 + t * 0.10; // 0.04 -> 0.14
      const blur = 10 + t * 8;        // 10px -> 18px

      document.documentElement.style.setProperty("--navA", navA.toFixed(2));
      document.documentElement.style.setProperty("--navBorder", border.toFixed(2));
      document.documentElement.style.setProperty("--navBlur", blur.toFixed(1) + "px");

      // Parallax background (desktop only)
      if(heavy){
        const bgY = Math.round(-y * 0.18);
        document.documentElement.style.setProperty("--bgY", bgY + "px");
      }else{
        document.documentElement.style.setProperty("--bgY", "0px");
      }

      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, {passive:true});
  window.addEventListener("resize", onScroll, {passive:true});
  onScroll();
}

/* =========================================================
   (2) Live embers particles (canvas) - hero only
   - auto disabled on mobile/reduced motion
   ========================================================= */
function initEmbersCanvas(){
  const heavy = allowHeavyFX();
  const hero = document.querySelector(".hero");
  const canvas = document.getElementById("embersCanvas");

  if(!hero || !canvas) return;

  // Disable on mobile / reduced motion
  if(!heavy){
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d", {alpha:true});
  let w = 0, h = 0, raf = 0;
  let particles = [];
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize(){
    const rect = hero.getBoundingClientRect();
    // canvas size based on hero width and a fixed height zone near bottom
    w = Math.floor(rect.width);
    h = Math.floor(Math.max(220, Math.min(320, rect.height * 0.32)));

    canvas.width  = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // position canvas at bottom of hero
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.right = "0";
    canvas.style.bottom = "-20px";
    canvas.style.height = h + "px";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";

    // refresh particles a bit
    particles = particles.slice(0, Math.floor(w / 10));
  }

  function rand(a,b){ return a + Math.random()*(b-a); }

  function spawn(){
    // spawn near bottom with slight x randomness
    const x = rand(0, w);
    const y = rand(h * 0.70, h);
    const size = rand(0.8, 2.2);
    const speedY = rand(0.25, 1.0);
    const driftX = rand(-0.25, 0.25);

    return {
      x, y,
      vx: driftX,
      vy: -speedY,
      r: size,
      life: rand(80, 170),
      a: rand(0.35, 0.95),
      tw: rand(0.6, 1.6), // twinkle
      hue: rand(28, 46)   // warm ember range
    };
  }

  function step(){
    raf = requestAnimationFrame(step);

    ctx.clearRect(0,0,w,h);

    // soft glow at bottom
    const grad = ctx.createRadialGradient(w*0.5, h*1.05, 10, w*0.5, h*1.05, w*0.65);
    grad.addColorStop(0, "rgba(255,140,0,0.16)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);

    // keep enough particles
    const target = Math.min(160, Math.max(70, Math.floor(w / 6)));
    while(particles.length < target) particles.push(spawn());

    // draw
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;

      // slight wind based on time
      p.vx += Math.sin((Date.now()/1000) + p.tw) * 0.002;

      // fade as it goes up
      const t = Math.max(0, Math.min(1, p.life / 170));
      const alpha = p.a * t;

      // remove
      if(p.life <= 0 || p.y < -20 || p.x < -50 || p.x > w + 50){
        particles.splice(i,1);
        continue;
      }

      // draw ember
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 95%, 62%, ${alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();

      // little sparkle
      if(Math.random() < 0.025){
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,220,160,${alpha*0.7})`;
        ctx.arc(p.x + rand(-2,2), p.y + rand(-2,2), p.r*0.6, 0, Math.PI*2);
        ctx.fill();
      }
    }
  }

  resize();
  window.addEventListener("resize", resize, {passive:true});
  step();

  // stop on page hide
  document.addEventListener("visibilitychange", ()=>{
    if(document.hidden){
      if(raf) cancelAnimationFrame(raf);
      raf = 0;
    }else if(!raf){
      step();
    }
  });
}

/* =========================================================
   Boot
   ========================================================= */
document.addEventListener("DOMContentLoaded", ()=>{
  initLangButtons();
  initRevealStagger();
  initHeaderAndParallax();

  initCatalogCards();
  renderCartPage();
  initCheckout();
  renderSuccess();
  updateCartBadge();

  initEmbersCanvas();
});
