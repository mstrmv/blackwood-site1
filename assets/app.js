/* ===== FILE: assets/app.js ===== */
(() => {
  const CART_KEY = "bw_cart_v1";
  const ORDER_KEY = "bw_order_v1";

  /* Реальні файли (як у твоїй папці img/) + 4 нових товарів (додай JPG у img/ з цими назвами) */
  const PRODUCTS = [
    /* Пачки вугілля (3 штуки) */
    { id:"core-3",  group:"charcoal", badge:"CORE", name:{uk:"Вугілля BLACKWOOD CORE 3 кг",  ru:"Уголь BLACKWOOD CORE 3 кг",  en:"BLACKWOOD CORE 3 kg"},  weightKg:3,  price:199, img:"img/core-3kg.png" },
    { id:"core-5",  group:"charcoal", badge:"CORE", name:{uk:"Вугілля BLACKWOOD CORE 5 кг",  ru:"Уголь BLACKWOOD CORE 5 кг",  en:"BLACKWOOD CORE 5 kg"},  weightKg:5,  price:299, img:"img/core-5kg.png" },
    { id:"core-10", group:"charcoal", badge:"CORE", name:{uk:"Вугілля BLACKWOOD CORE 10 кг", ru:"Уголь BLACKWOOD CORE 10 кг", en:"BLACKWOOD CORE 10 kg"}, weightKg:10, price:499, img:"img/core-10kg.png" },

    /* Сет */
    { id:"weekend", group:"set", badge:"SET", name:{uk:"Набір Weekend Box", ru:"Набор Weekend Box", en:"Weekend Box set"}, weightKg:1, price:799, img:"img/weekend-box.jpg" },

    /* +4 нових товарів (поклади файли у img/ з цими назвами) */
    { id:"charcoal-5kg", group:"charcoal", badge:"CHARCOAL", name:{uk:"Вугілля BLACKWOOD 5 кг (kraft)", ru:"Уголь BLACKWOOD 5 кг (kraft)", en:"BLACKWOOD Charcoal 5 kg (kraft)"}, weightKg:5, price:329, img:"img/charcoal-5kg.jpg" },
    { id:"charcoal-10kg", group:"charcoal", badge:"CHARCOAL", name:{uk:"Вугілля BLACKWOOD 10 кг (kraft)", ru:"Уголь BLACKWOOD 10 кг (kraft)", en:"BLACKWOOD Charcoal 10 kg (kraft)"}, weightKg:10, price:549, img:"img/charcoal-10kg.jpg" },
    { id:"royal", group:"set", badge:"SET", name:{uk:"BLACKWOOD Royal Ignition", ru:"BLACKWOOD Royal Ignition", en:"BLACKWOOD Royal Ignition"}, weightKg:1, price:179, img:"img/royal-ignition.jpg" },
    { id:"starter-set", group:"set", badge:"SET", name:{uk:"Сет Starter (вугілля + розпал)", ru:"Сет Starter (уголь + розжиг)", en:"Starter Set (charcoal + ignition)"}, weightKg:1, price:899, img:"img/starter-set.jpg" },

    /* Інші товари (як у твоїй папці img/) */
    { id:"starter",  group:"other", badge:"BBQ", name:{uk:"Розпалювач", ru:"Розжиг", en:"Fire starter"}, weightKg:1, price:149, img:"img/starter.jpg" },
    { id:"apron",    group:"other", badge:"ACCESS", name:{uk:"Фартух BBQ", ru:"Фартук BBQ", en:"BBQ apron"}, weightKg:1, price:299, img:"img/apron.jpg" },
    { id:"gloves",   group:"other", badge:"ACCESS", name:{uk:"Рукавиці для гриля", ru:"Перчатки для гриля", en:"BBQ gloves"}, weightKg:1, price:249, img:"img/gloves.jpg" },
    { id:"thermo",   group:"other", badge:"ACCESS", name:{uk:"Термометр", ru:"Термометр", en:"Thermometer"}, weightKg:1, price:219, img:"img/thermometer.jpg" },
    { id:"blower",   group:"other", badge:"ACCESS", name:{uk:"Міх для роздуву", ru:"Мех для раздува", en:"BBQ blower"}, weightKg:1, price:129, img:"img/blower.jpg" },

    { id:"grid-set",    group:"other", badge:"GRILL", name:{uk:"Набір для гриля", ru:"Набор для гриля", en:"Grill set"}, weightKg:1, price:349, img:"img/grill-set.jpg" },
    { id:"grid-flat",   group:"other", badge:"GRILL", name:{uk:"Решітка (пласка)", ru:"Решетка (плоская)", en:"Grill grid (flat)"}, weightKg:1, price:279, img:"img/grid-flat.jpg" },
    { id:"grid-double", group:"other", badge:"GRILL", name:{uk:"Решітка (подвійна)", ru:"Решетка (двойная)", en:"Grill grid (double)"}, weightKg:1, price:319, img:"img/grid-double.jpg" },
    { id:"grid-saus",   group:"other", badge:"GRILL", name:{uk:"Решітка для ковбасок", ru:"Решетка для сосисок", en:"Sausage grill grid"}, weightKg:1, price:259, img:"img/grid-sausage.jpg" },
  ];

  function safeImg(img){
    img.style.opacity = ".35";
    img.style.filter = "grayscale(1)";
  }

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
    const filterWrap = document.querySelector("[data-filters]");
    let activeGroup = "all";

    const draw = () => {
      const langNow = window.BW_I18N?.getLang?.() || "uk";
      const q = (qInput?.value || "").trim().toLowerCase();

      const list = PRODUCTS.filter(p => {
        const name = (p.name?.[langNow] || p.name?.uk || "").toLowerCase();
        const okQuery = !q || name.includes(q) || (p.badge||"").toLowerCase().includes(q);
        const okGroup = activeGroup === "all" || p.group === activeGroup;
        return okQuery && okGroup;
      });

      grid.innerHTML = list.map(p => {
        const name = p.name?.[langNow] || p.name?.uk || p.id;
        const addLabel = window.BW_I18N?.t?.("add_to_cart", langNow) || "Add";
        const weightLabel = window.BW_I18N?.t?.("weight", langNow) || "Weight";
        const kgLabel = window.BW_I18N?.t?.("kg", langNow) || "kg";
        return `
          <article class="card product">
            <div class="thumb">
              <img src="${p.img}?v=1" alt="${name}" onerror="this.onerror=null;(${safeImg.toString()})(this)">
            </div>
            <div class="body">
              <div class="name">${name}</div>
              <div class="meta">
                <div class="mini"><span class="pill">${p.badge}</span> &nbsp; ${weightLabel}: <b>${p.weightKg}</b> ${kgLabel}</div>
                <div class="price">${money(p.price)}</div>
              </div>
              <button class="btn primary small" data-add="${p.id}">${addLabel}</button>
            </div>
          </article>
        `;
      }).join("");
    };

    if (filterWrap){
      filterWrap.addEventListener("click", (e) => {
        const b = e.target.closest("[data-group]");
        if (!b) return;
        activeGroup = b.getAttribute("data-group") || "all";
        filterWrap.querySelectorAll("[data-group]").forEach(x => x.classList.toggle("is-active", x === b));
        draw();
      });
    }

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

    const draw = () => {
      const lang = window.BW_I18N?.getLang?.() || "uk";
      const cart = loadCart();
      const ids = Object.keys(cart);
      const items = ids.map(id => ({ p: productById(id), id, qty: Number(cart[id])||0 })).filter(x => x.p && x.qty>0);

      emptyEl.style.display = items.length ? "none" : "block";
      const table = document.querySelector("[data-cart-table]");
      if (table) table.style.display = items.length ? "table" : "none";

      let total = 0;
      tableBody.innerHTML = items.map(({p, id, qty}) => {
        const name = p.name?.[lang] || p.name?.uk || id;
        const sum = p.price * qty;
        total += sum;
        return `
          <tr>
            <td style="display:flex;gap:10px;align-items:center;">
              <span class="rowimg"><img src="${p.img}?v=1" alt="${name}" onerror="this.onerror=null;(${safeImg.toString()})(this)"></span>
              <div>
                <div style="font-weight:950">${name}</div>
                <div class="mini"><span class="pill">${p.badge}</span></div>
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

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const cart = loadCart();
      const ids = Object.keys(cart);
      if (!ids.length){
        location.href = "cart.html";
        return;
      }

      const lang = window.BW_I18N?.getLang?.() || "uk";
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
  }

  function boot(){
    renderCartBadge();
    renderCatalog();
    renderCartPage();
    setupCheckout();

    const year = document.getElementById("y");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
