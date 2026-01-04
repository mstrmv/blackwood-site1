/* ===== FILE: assets/app.js ===== */
(() => {
  const CART_KEY = "bw_cart_v1";
  const ORDER_KEY = "bw_order_v1";

  const PRODUCTS = [
    { id:"core-3",  cat:"CORE", name:{uk:"Вугілля BLACKWOOD CORE 3 кг", ru:"Уголь BLACKWOOD CORE 3 кг", en:"BLACKWOOD CORE 3 kg"},  weightKg:3,  price:199, img:"img/core-3kg.png" },
    { id:"core-5",  cat:"CORE", name:{uk:"Вугілля BLACKWOOD CORE 5 кг", ru:"Уголь BLACKWOOD CORE 5 кг", en:"BLACKWOOD CORE 5 kg"},  weightKg:5,  price:299, img:"img/core-5kg.png" },
    { id:"core-10", cat:"CORE", name:{uk:"Вугілля BLACKWOOD CORE 10 кг",ru:"Уголь BLACKWOOD CORE 10 кг",en:"BLACKWOOD CORE 10 kg"}, weightKg:10, price:499, img:"img/core-10kg.png" },

    /* дополнительные товары (jpg). Если у тебя других названий — просто переименуй файлы в img/ */
    { id:"prod-01", cat:"BBQ", name:{uk:"Розпалювач 1 л", ru:"Розжиг 1 л", en:"Fire starter 1 L"}, weightKg:1, price:179, img:"img/product-01.jpg" },
    { id:"prod-02", cat:"BBQ", name:{uk:"Розпалювач 0.5 л", ru:"Розжиг 0.5 л", en:"Fire starter 0.5 L"}, weightKg:0.5, price:119, img:"img/product-02.jpg" },
    { id:"prod-03", cat:"BBQ", name:{uk:"Брикети 2 кг", ru:"Брикеты 2 кг", en:"Briquettes 2 kg"}, weightKg:2, price:189, img:"img/product-03.jpg" },
    { id:"prod-04", cat:"BBQ", name:{uk:"Брикети 5 кг", ru:"Брикеты 5 кг", en:"Briquettes 5 kg"}, weightKg:5, price:349, img:"img/product-04.jpg" },
    { id:"prod-05", cat:"ACCESS", name:{uk:"Рукавиці для гриля", ru:"Перчатки для гриля", en:"BBQ gloves"}, weightKg:1, price:249, img:"img/product-05.jpg" },
    { id:"prod-06", cat:"ACCESS", name:{uk:"Щипці для гриля", ru:"Щипцы для гриля", en:"BBQ tongs"}, weightKg:1, price:159, img:"img/product-06.jpg" },
    { id:"prod-07", cat:"ACCESS", name:{uk:"Щітка для решітки", ru:"Щетка для решетки", en:"Grill brush"}, weightKg:1, price:149, img:"img/product-07.jpg" },
    { id:"prod-08", cat:"ACCESS", name:{uk:"Фартух BBQ", ru:"Фартук BBQ", en:"BBQ apron"}, weightKg:1, price:299, img:"img/product-08.jpg" },
    { id:"prod-09", cat:"BBQ", name:{uk:"Тріска для копчення", ru:"Щепа для копчения", en:"Smoking wood chips"}, weightKg:1, price:129, img:"img/product-09.jpg" },
    { id:"prod-10", cat:"BBQ", name:{uk:"Паливні кубики", ru:"Топливные кубики", en:"Firelighters"}, weightKg:1, price:99, img:"img/product-10.jpg" },
    { id:"prod-11", cat:"BBQ", name:{uk:"Деревне вугілля 2 кг", ru:"Древесный уголь 2 кг", en:"Hardwood charcoal 2 kg"}, weightKg:2, price:159, img:"img/product-11.jpg" },
    { id:"prod-12", cat:"BBQ", name:{uk:"Деревне вугілля 8 кг", ru:"Древесный уголь 8 кг", en:"Hardwood charcoal 8 kg"}, weightKg:8, price:399, img:"img/product-12.jpg" },
  ];

  const EXT_TRIES = [
    (src) => src,
    (src) => src.replace(/\.jpg$/i, ".JPG"),
    (src) => src.replace(/\.JPG$/i, ".jpg"),
    (src) => src.replace(/\.jpeg$/i, ".JPEG"),
    (src) => src.replace(/\.JPEG$/i, ".jpeg"),
    (src) => src.replace(/\.png$/i, ".PNG"),
    (src) => src.replace(/\.PNG$/i, ".png"),
    (src) => src.replace(/\.jpg$/i, ".png"),
    (src) => src.replace(/\.png$/i, ".jpg"),
    (src) => "img/core-10kg.png"
  ];

  function onImgError(img){
    try{
      const tried = Number(img.getAttribute("data-try") || "0");
      const next = tried + 1;
      img.setAttribute("data-try", String(next));
      const base = img.getAttribute("data-src") || img.src || "";
      const clean = base.split("?")[0];
      const fn = EXT_TRIES[next] || null;
      if (!fn){
        img.style.opacity = ".35";
        img.style.filter = "grayscale(1)";
        return;
      }
      img.src = fn(clean) + "?v=" + next;
    }catch(_){
      img.style.opacity = ".35";
      img.style.filter = "grayscale(1)";
    }
  }
  window.BW_IMG = { onError: onImgError };

  function money(n){
    const lang = window.BW_I18N?.getLang?.() || "uk";
    const uah = window.BW_I18N?.t?.("uah", lang) || "₴";
    return `${Number(n).toFixed(0)} ${uah}`;
  }

  function loadCart(){
    try{
      const raw = localStorage.getItem(CART_KEY);
      const obj = raw ? JSON.parse(raw) : {};
      if (obj && typeof obj === "object") return obj;
      return {};
    }catch(_){ return {}; }
  }
  function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  function cartCount(){
    const cart = loadCart();
    return Object.values(cart).reduce((a,b)=>a + (Number(b)||0), 0);
  }
  function renderCartBadge(){
    const count = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      el.textContent = String(count);
      el.style.display = count > 0 ? "inline-block" : "none";
    });
  }

  function addToCart(id, qty=1){
    const cart = loadCart();
    cart[id] = (Number(cart[id])||0) + qty;
    if (cart[id] <= 0) delete cart[id];
    saveCart(cart);
    renderCartBadge();
  }
  function setQty(id, qty){
    const cart = loadCart();
    const q = Number(qty)||0;
    if (q <= 0) delete cart[id];
    else cart[id] = q;
    saveCart(cart);
    renderCartBadge();
  }
  function clearCart(){
    localStorage.removeItem(CART_KEY);
    renderCartBadge();
  }

  function productById(id){ return PRODUCTS.find(p => p.id === id); }

  function renderCatalog(){
    const grid = document.querySelector("[data-catalog-grid]");
    if (!grid) return;

    const lang = window.BW_I18N?.getLang?.() || "uk";
    const qInput = document.querySelector("[data-catalog-search]");

    const draw = () => {
      const q = (qInput?.value || "").trim().toLowerCase();
      const list = PRODUCTS.filter(p => {
        const name = (p.name?.[lang] || p.name?.uk || "").toLowerCase();
        return !q || name.includes(q) || (p.cat||"").toLowerCase().includes(q);
      });

      grid.innerHTML = list.map(p => {
        const name = p.name?.[lang] || p.name?.uk || p.id;
        const addLabel = window.BW_I18N?.t?.("add_to_cart", lang) || "Add";
        const weightLabel = window.BW_I18N?.t?.("weight", lang) || "Weight";
        const kgLabel = window.BW_I18N?.t?.("kg", lang) || "kg";
        return `
          <article class="card product">
            <div class="thumb">
              <img src="${p.img}?v=1" data-src="${p.img}" alt="${name}" onerror="BW_IMG.onError(this)">
            </div>
            <div class="body">
              <div class="name">${name}</div>
              <div class="meta">
                <div class="mini"><span class="pill">${p.cat}</span> &nbsp; ${weightLabel}: <b>${p.weightKg}</b> ${kgLabel}</div>
                <div class="price">${money(p.price)}</div>
              </div>
              <button class="btn primary small" data-add="${p.id}">${addLabel}</button>
            </div>
          </article>
        `;
      }).join("");
    };

    draw();
    qInput?.addEventListener("input", draw);

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      addToCart(btn.getAttribute("data-add"), 1);
    });

    window.addEventListener("bw:lang", () => draw());
  }

  function renderCartPage(){
    const tableBody = document.querySelector("[data-cart-body]");
    const totalEl = document.querySelector("[data-cart-total]");
    const emptyEl = document.querySelector("[data-cart-empty]");
    if (!tableBody || !totalEl || !emptyEl) return;

    const lang = window.BW_I18N?.getLang?.() || "uk";

    const draw = () => {
      const cart = loadCart();
      const ids = Object.keys(cart);
      const items = ids.map(id => ({ p: productById(id), id, qty: Number(cart[id])||0 })).filter(x => x.p && x.qty>0);

      emptyEl.style.display = items.length ? "none" : "block";
      document.querySelector("[data-cart-table]")?.style?.setProperty("display", items.length ? "table" : "none");

      let total = 0;
      tableBody.innerHTML = items.map(({p, id, qty}) => {
        const name = p.name?.[lang] || p.name?.uk || id;
        const sum = p.price * qty;
        total += sum;
        return `
          <tr>
            <td style="display:flex;gap:10px;align-items:center;">
              <span class="rowimg"><img src="${p.img}?v=1" data-src="${p.img}" alt="${name}" onerror="BW_IMG.onError(this)"></span>
              <div>
                <div style="font-weight:950">${name}</div>
                <div class="mini"><span class="pill">${p.cat}</span> &nbsp; ${window.BW_I18N.t("weight",lang)}: <b>${p.weightKg}</b> ${window.BW_I18N.t("kg",lang)}</div>
              </div>
            </td>
            <td>
              <div class="qty" data-qty="${id}">
                <button type="button" data-dec>-</button>
                <span data-val>${qty}</span>
                <button type="button" data-inc>+</button>
              </div>
            </td>
            <td><b>${money(p.price)}</b></td>
            <td><b>${money(sum)}</b></td>
          </tr>
        `;
      }).join("");

      totalEl.textContent = money(total);
      renderCartBadge();
    };

    draw();

    tableBody.addEventListener("click", (e) => {
      const row = e.target.closest("[data-qty]");
      if (!row) return;
      const id = row.getAttribute("data-qty");
      const cart = loadCart();
      const cur = Number(cart[id])||0;

      if (e.target.matches("[data-inc]")) setQty(id, cur + 1);
      if (e.target.matches("[data-dec]")) setQty(id, cur - 1);

      draw();
    });

    document.querySelector("[data-cart-clear]")?.addEventListener("click", () => {
      clearCart();
      draw();
    });

    window.addEventListener("bw:lang", draw);
  }

  function setupCheckout(){
    const form = document.querySelector("[data-checkout-form]");
    if (!form) return;

    const lang = window.BW_I18N?.getLang?.() || "uk";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const cart = loadCart();
      const ids = Object.keys(cart);
      if (!ids.length){
        location.href = "cart.html";
        return;
      }

      const fd = new FormData(form);
      const order = {
        ts: Date.now(),
        lang,
        customer: {
          name: String(fd.get("name")||"").trim(),
          phone: String(fd.get("phone")||"").trim(),
          city: String(fd.get("city")||"").trim(),
          address: String(fd.get("address")||"").trim(),
          comment: String(fd.get("comment")||"").trim(),
          pay: String(fd.get("pay")||"card")
        },
        items: ids.map(id => {
          const p = productById(id);
          const qty = Number(cart[id])||0;
          return p && qty>0 ? { id, qty, price:p.price, name:p.name } : null;
        }).filter(Boolean)
      };

      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      clearCart();
      location.href = "success.html";
    });

    window.addEventListener("bw:lang", () => {
      // ничего, тексты обновляет i18n.js
    });
  }

  function renderSuccess(){
    const box = document.querySelector("[data-success-box]");
    if (!box) return;
    renderCartBadge();
  }

  function boot(){
    renderCartBadge();
    renderCatalog();
    renderCartPage();
    setupCheckout();
    renderSuccess();

    const year = document.getElementById("y");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
