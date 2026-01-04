/* assets/app.js */
(function(){
  const STORAGE_KEY = "bw_cart_v1";

  const PRODUCTS = [
    // CORE (PNG)
    { id:"core-3kg",  name:{uk:"CORE 3 кг", ru:"CORE 3 кг", en:"CORE 3 kg"},  desc:{uk:"Деревне вугілля, пак 3 кг.", ru:"Древесный уголь, пак 3 кг.", en:"Charcoal, 3 kg pack."},  price:199,  category:"core", image:"img/core-3kg.png",  popularity: 90 },
    { id:"core-5kg",  name:{uk:"CORE 5 кг", ru:"CORE 5 кг", en:"CORE 5 kg"},  desc:{uk:"Деревне вугілля, пак 5 кг.", ru:"Древесный уголь, пак 5 кг.", en:"Charcoal, 5 kg pack."},  price:299,  category:"core", image:"img/core-5kg.png",  popularity: 95 },
    { id:"core-10kg", name:{uk:"CORE 10 кг",ru:"CORE 10 кг",en:"CORE 10 kg"}, desc:{uk:"Деревне вугілля, пак 10 кг.",ru:"Древесный уголь, пак 10 кг.",en:"Charcoal, 10 kg pack."}, price:499, category:"core", image:"img/core-10kg.png", popularity: 98 },

    // 15 more (JPG) — filenames are placeholders. Replace with your real .jpg names 1:1.
    { id:"bbq-1",  name:{uk:"Брикети BBQ", ru:"Брикеты BBQ", en:"BBQ Briquettes"}, desc:{uk:"Рівномірний жар для гриля.", ru:"Ровный жар для гриля.", en:"Even heat for grilling."}, price:179, category:"bbq", image:"img/product-01.jpg", popularity: 70 },
    { id:"bbq-2",  name:{uk:"Дрова для копчення", ru:"Дрова для копчения", en:"Smoking Wood"}, desc:{uk:"Аромат для копчення.", ru:"Аромат для копчения.", en:"Aroma for smoking."}, price:149, category:"bbq", image:"img/product-02.jpg", popularity: 62 },
    { id:"bbq-3",  name:{uk:"Розпалювач", ru:"Розжиг", en:"Fire Starter"}, desc:{uk:"Швидкий та чистий розпал.", ru:"Быстрый и чистый розжиг.", en:"Fast and clean ignition."}, price:89, category:"accessories", image:"img/product-03.jpg", popularity: 80 },
    { id:"bbq-4",  name:{uk:"Щипці для гриля", ru:"Щипцы для гриля", en:"Grill Tongs"}, desc:{uk:"Нержавіюча сталь.", ru:"Нержавеющая сталь.", en:"Stainless steel."}, price:129, category:"accessories", image:"img/product-04.jpg", popularity: 58 },
    { id:"bbq-5",  name:{uk:"Рукавички термо", ru:"Термоперчатки", en:"Heat Gloves"}, desc:{uk:"Захист рук від жару.", ru:"Защита рук от жара.", en:"Hand protection from heat."}, price:219, category:"accessories", image:"img/product-05.jpg", popularity: 55 },
    { id:"bbq-6",  name:{uk:"Решітка", ru:"Решетка", en:"Grill Grate"}, desc:{uk:"Для мангалу та гриля.", ru:"Для мангала и гриля.", en:"For grill & BBQ."}, price:349, category:"accessories", image:"img/product-06.jpg", popularity: 52 },
    { id:"bbq-7",  name:{uk:"Шампури", ru:"Шампуры", en:"Skewers"}, desc:{uk:"Набір шампурів.", ru:"Набор шампуров.", en:"Skewer set."}, price:199, category:"accessories", image:"img/product-07.jpg", popularity: 66 },
    { id:"bbq-8",  name:{uk:"Ковпак-роздув", ru:"Колпак-раздув", en:"Air Blower"}, desc:{uk:"Для контролю жару.", ru:"Для контроля жара.", en:"For heat control."}, price:99, category:"accessories", image:"img/product-08.jpg", popularity: 40 },
    { id:"bbq-9",  name:{uk:"Фольга BBQ", ru:"Фольга BBQ", en:"BBQ Foil"}, desc:{uk:"Для запікання та гриля.", ru:"Для запекания и гриля.", en:"For baking & grilling."}, price:59, category:"accessories", image:"img/product-09.jpg", popularity: 45 },
    { id:"bbq-10", name:{uk:"Сітка для овочів", ru:"Сетка для овощей", en:"Veggie Basket"}, desc:{uk:"Зручно для овочів.", ru:"Удобно для овощей.", en:"Great for veggies."}, price:139, category:"accessories", image:"img/product-10.jpg", popularity: 48 },
    { id:"bbq-11", name:{uk:"Соус BBQ", ru:"Соус BBQ", en:"BBQ Sauce"}, desc:{uk:"Класичний смак.", ru:"Классический вкус.", en:"Classic flavor."}, price:119, category:"food", image:"img/product-11.jpg", popularity: 60 },
    { id:"bbq-12", name:{uk:"Сіль копчена", ru:"Соль копченая", en:"Smoked Salt"}, desc:{uk:"Спеції для м’яса.", ru:"Специи для мяса.", en:"Seasoning for meat."}, price:79, category:"food", image:"img/product-12.jpg", popularity: 57 },
    { id:"bbq-13", name:{uk:"Приправа гриль", ru:"Приправа гриль", en:"Grill Rub"}, desc:{uk:"Суміш спецій.", ru:"Смесь специй.", en:"Spice blend."}, price:89, category:"food", image:"img/product-13.jpg", popularity: 63 },
    { id:"bbq-14", name:{uk:"Вугілля преміум", ru:"Уголь премиум", en:"Premium Charcoal"}, desc:{uk:"Фракція для довгого жару.", ru:"Фракция для долгого жара.", en:"Chunks for long heat."}, price:399, category:"charcoal", image:"img/product-14.jpg", popularity: 75 },
    { id:"bbq-15", name:{uk:"Сет BBQ", ru:"Сет BBQ", en:"BBQ Set"}, desc:{uk:"Набір для старту.", ru:"Набор для старта.", en:"Starter bundle."}, price:799, category:"sets", image:"img/product-15.jpg", popularity: 85 }
  ];

  const CATEGORIES = [
    { id:"all", label:{uk:"Усі категорії", ru:"Все категории", en:"All categories"} },
    { id:"core", label:{uk:"CORE (вугілля)", ru:"CORE (уголь)", en:"CORE (charcoal)"} },
    { id:"charcoal", label:{uk:"Вугілля", ru:"Уголь", en:"Charcoal"} },
    { id:"bbq", label:{uk:"BBQ", ru:"BBQ", en:"BBQ"} },
    { id:"accessories", label:{uk:"Аксесуари", ru:"Аксессуары", en:"Accessories"} },
    { id:"food", label:{uk:"Соуси/спеції", ru:"Соусы/специи", en:"Sauces/Spices"} },
    { id:"sets", label:{uk:"Сети", ru:"Сеты", en:"Sets"} }
  ];

  function getLang(){
    return (window.BW_I18N && window.BW_I18N.getLang) ? window.BW_I18N.getLang() : "uk";
  }
  function tt(key){
    return (window.BW_I18N && window.BW_I18N.t) ? window.BW_I18N.t(key) : key;
  }

  function money(n){
    const cur = tt("currency");
    return `${Number(n).toFixed(0)} ${cur}`;
  }

  function loadCart(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return {};
      const obj = JSON.parse(raw);
      if(obj && typeof obj === "object") return obj;
      return {};
    }catch(_e){
      return {};
    }
  }

  function saveCart(cart){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart || {}));
    updateCartBadge();
  }

  function cartCount(cart){
    return Object.values(cart).reduce((a,b)=>a + (Number(b)||0), 0);
  }

  function cartTotal(cart){
    let total = 0;
    for(const [id, qty] of Object.entries(cart)){
      const p = PRODUCTS.find(x=>x.id===id);
      if(p) total += p.price * (Number(qty)||0);
    }
    return total;
  }

  function updateCartBadge(){
    const cart = loadCart();
    const count = cartCount(cart);
    document.querySelectorAll("[data-cart-count]").forEach(el=>{
      el.textContent = String(count);
    });
  }

  function toast(msg){
    let el = document.getElementById("toast");
    if(!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(()=> el.classList.remove("show"), 1500);
  }

  function addToCart(id, qty=1){
    const cart = loadCart();
    cart[id] = (Number(cart[id])||0) + qty;
    if(cart[id] <= 0) delete cart[id];
    saveCart(cart);
    toast(tt("toast_added"));
  }

  function setQty(id, qty){
    const cart = loadCart();
    if(qty <= 0){ delete cart[id]; }
    else{ cart[id] = qty; }
    saveCart(cart);
  }

  function removeItem(id){
    const cart = loadCart();
    delete cart[id];
    saveCart(cart);
    toast(tt("toast_removed"));
  }

  function clearCart(){
    saveCart({});
    toast(tt("toast_cleared"));
  }

  function currentPage(){
    const p = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return p;
  }

  function setActiveNav(){
    const p = currentPage();
    document.querySelectorAll(".navlinks a[data-page]").forEach(a=>{
      a.classList.toggle("active", a.getAttribute("data-page") === p);
    });
  }

  function renderCatalog(){
    const root = document.getElementById("catalogRoot");
    if(!root) return;

    const lang = getLang();

    const qEl = document.getElementById("searchInput");
    const catEl = document.getElementById("categorySelect");
    const sortEl = document.getElementById("sortSelect");

    if(catEl && !catEl.dataset.ready){
      catEl.innerHTML = "";
      for(const c of CATEGORIES){
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.label[lang] || c.label.uk;
        catEl.appendChild(opt);
      }
      catEl.dataset.ready = "1";
    }

    function apply(){
      const query = (qEl ? qEl.value : "").trim().toLowerCase();
      const cat = catEl ? catEl.value : "all";
      const sort = sortEl ? sortEl.value : "pop";

      const cart = loadCart();

      let list = PRODUCTS.slice();

      if(cat && cat !== "all"){
        list = list.filter(p => p.category === cat);
      }

      if(query){
        list = list.filter(p=>{
          const name = (p.name[lang] || p.name.uk || "").toLowerCase();
          const desc = (p.desc[lang] || p.desc.uk || "").toLowerCase();
          return name.includes(query) || desc.includes(query);
        });
      }

      if(sort === "price_asc"){
        list.sort((a,b)=>a.price-b.price);
      }else if(sort === "price_desc"){
        list.sort((a,b)=>b.price-a.price);
      }else if(sort === "name"){
        list.sort((a,b)=>{
          const an = (a.name[lang] || a.name.uk).toLowerCase();
          const bn = (b.name[lang] || b.name.uk).toLowerCase();
          return an.localeCompare(bn);
        });
      }else{
        list.sort((a,b)=> (b.popularity||0) - (a.popularity||0));
      }

      root.innerHTML = "";

      if(!list.length){
        const empty = document.createElement("div");
        empty.className = "card mini";
        empty.innerHTML = `<h3>${tt("empty_catalog")}</h3>`;
        root.appendChild(empty);
        return;
      }

      list.forEach(p=>{
        const inCart = (Number(cart[p.id])||0) > 0;
        const el = document.createElement("div");
        el.className = "product";
        el.innerHTML = `
          <div class="thumb">
            <img src="${p.image}" alt="">
          </div>
          <div class="meta">
            <div>
              <h4>${p.name[lang] || p.name.uk}</h4>
              <p class="desc">${p.desc[lang] || p.desc.uk}</p>
            </div>
            <div class="cat">${(CATEGORIES.find(c=>c.id===p.category)?.label[lang]) || p.category}</div>
          </div>
          <div class="bottom">
            <div>
              <div class="price">${money(p.price)}</div>
              <div class="muted small">ID: ${p.id}</div>
            </div>
            <button class="btn ${inCart ? "primary" : ""}" data-add="${p.id}">
              ${inCart ? tt("in_cart") : tt("add_to_cart")}
            </button>
          </div>
        `;
        root.appendChild(el);
      });
    }

    root.addEventListener("click", (e)=>{
      const btn = e.target.closest("button[data-add]");
      if(!btn) return;
      addToCart(btn.getAttribute("data-add"), 1);
      apply();
    });

    if(qEl) qEl.addEventListener("input", apply);
    if(catEl) catEl.addEventListener("change", apply);
    if(sortEl) sortEl.addEventListener("change", apply);

    apply();
  }

  function renderCart(){
    const wrap = document.getElementById("cartWrap");
    if(!wrap) return;

    const tbody = document.getElementById("cartTbody");
    const empty = document.getElementById("cartEmpty");
    const totalEl = document.getElementById("cartTotal");
    const checkoutBtn = document.getElementById("goCheckout");
    const clearBtn = document.getElementById("clearCart");

    const lang = getLang();

    function draw(){
      const cart = loadCart();
      const ids = Object.keys(cart);

      if(!ids.length){
        if(tbody) tbody.innerHTML = "";
        if(empty) empty.style.display = "block";
        if(wrap) wrap.style.display = "none";
        if(totalEl) totalEl.textContent = money(0);
        return;
      }

      if(empty) empty.style.display = "none";
      if(wrap) wrap.style.display = "block";

      if(tbody){
        tbody.innerHTML = "";
        ids.forEach(id=>{
          const qty = Number(cart[id])||0;
          const p = PRODUCTS.find(x=>x.id===id);
          if(!p) return;

          const sum = p.price * qty;

          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>
              <div class="cart-item">
                <div class="pic"><img src="${p.image}" alt=""></div>
                <div>
                  <div style="font-weight:950">${p.name[lang] || p.name.uk}</div>
                  <div class="muted small">${(CATEGORIES.find(c=>c.id===p.category)?.label[lang]) || p.category}</div>
                </div>
              </div>
            </td>
            <td><strong>${money(p.price)}</strong></td>
            <td>
              <div class="qty" data-qty="${id}">
                <button type="button" data-minus>-</button>
                <span>${qty}</span>
                <button type="button" data-plus>+</button>
              </div>
            </td>
            <td><strong>${money(sum)}</strong></td>
            <td><button class="btn danger" type="button" data-remove="${id}">✕</button></td>
          `;
          tbody.appendChild(tr);
        });
      }

      if(totalEl) totalEl.textContent = money(cartTotal(cart));
      updateCartBadge();
    }

    document.addEventListener("click", (e)=>{
      const minus = e.target.closest("[data-minus]");
      const plus = e.target.closest("[data-plus]");
      const qtyBox = e.target.closest(".qty[data-qty]");
      const rem = e.target.closest("button[data-remove]");
      if(rem){
        removeItem(rem.getAttribute("data-remove"));
        draw();
      }
      if(qtyBox && (minus || plus)){
        const id = qtyBox.getAttribute("data-qty");
        const cart = loadCart();
        const cur = Number(cart[id])||0;
        const next = plus ? cur + 1 : cur - 1;
        setQty(id, next);
        draw();
      }
    });

    if(clearBtn){
      clearBtn.addEventListener("click", ()=>{
        clearCart();
        draw();
      });
    }

    if(checkoutBtn){
      checkoutBtn.addEventListener("click", ()=>{
        location.href = "checkout.html";
      });
    }

    draw();
  }

  function renderCheckout(){
    const form = document.getElementById("checkoutForm");
    if(!form) return;

    const warning = document.getElementById("checkoutWarning");
    const cart = loadCart();
    if(cartCount(cart) === 0){
      if(warning){
        warning.style.display = "block";
        warning.textContent = tt("must_cart");
      }
    }else{
      if(warning) warning.style.display = "none";
    }

    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const cartNow = loadCart();
      if(cartCount(cartNow) === 0){
        if(warning){
          warning.style.display = "block";
          warning.textContent = tt("must_cart");
        }
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      data.items = Object.entries(cartNow).map(([id, qty])=>{
        const p = PRODUCTS.find(x=>x.id===id);
        return { id, qty:Number(qty)||0, price:p?.price||0 };
      });
      data.total = cartTotal(cartNow);
      data.createdAt = new Date().toISOString();

      localStorage.setItem("bw_last_order", JSON.stringify(data));
      clearCart();
      location.href = "success.html";
    });
  }

  function onLangChanged(){
    // Re-render dynamic pages that rely on language
    renderCatalog();
    renderCart();
    renderCheckout();
  }

  function init(){
    updateCartBadge();
    setActiveNav();
    renderCatalog();
    renderCart();
    renderCheckout();
  }

  window.BW = {
    PRODUCTS,
    CATEGORIES,
    loadCart,
    saveCart,
    addToCart,
    setQty,
    removeItem,
    clearCart,
    cartCount,
    cartTotal,
    updateCartBadge,
    toast,
    onLangChanged
  };

  document.addEventListener("DOMContentLoaded", init);
})();
