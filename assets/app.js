// assets/app.js
(() => {
  const CART_KEY = "bw_cart_v1";

  const FALLBACK_IMG = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stop-color="#2a2a2d"/>
          <stop offset="1" stop-color="#151518"/>
        </linearGradient>
        <radialGradient id="r" cx="30%" cy="20%" r="80%">
          <stop offset="0" stop-color="#c8a45a" stop-opacity=".18"/>
          <stop offset="1" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#g)"/>
      <rect width="1200" height="900" fill="url(#r)"/>
      <g fill="#ffffff" fill-opacity=".92" font-family="Arial" font-size="44" font-weight="700">
        <text x="80" y="130">BLACKWOOD • CHARCOAL</text>
      </g>
      <g fill="#ffffff" fill-opacity=".65" font-family="Arial" font-size="28">
        <text x="80" y="200">Image file not found</text>
      </g>
      <g fill="none" stroke="#ffffff" stroke-opacity=".20" stroke-width="6">
        <rect x="80" y="260" width="1040" height="560" rx="28"/>
        <path d="M140 740 L460 450 L670 640 L820 520 L1060 740"/>
        <circle cx="310" cy="420" r="42"/>
      </g>
    </svg>
  `);

  const PRODUCTS = [
    { id:"core-3",  category:"core", weight:"3 kg",  price:299, img:"img/core-3kg.png",
      nameKey:{uk:"BLACKWOOD CORE 3 кг", ru:"BLACKWOOD CORE 3 кг", en:"BLACKWOOD CORE 3 kg"} },
    { id:"core-5",  category:"core", weight:"5 kg",  price:459, img:"img/core-5kg.png",
      nameKey:{uk:"BLACKWOOD CORE 5 кг", ru:"BLACKWOOD CORE 5 кг", en:"BLACKWOOD CORE 5 kg"} },
    { id:"core-10", category:"core", weight:"10 kg", price:799, img:"img/core-10kg.png",
      nameKey:{uk:"BLACKWOOD CORE 10 кг", ru:"BLACKWOOD CORE 10 кг", en:"BLACKWOOD CORE 10 kg"} },

    /* JPG items (імена файлів мають відповідати вашим реальним .jpg у папці img/) */
    { id:"yard-3",  category:"yard", weight:"3 kg",  price:269, img:"img/yard-3kg.jpg",
      nameKey:{uk:"BLACKWOOD YARD 3 кг", ru:"BLACKWOOD YARD 3 кг", en:"BLACKWOOD YARD 3 kg"} },
    { id:"yard-5",  category:"yard", weight:"5 kg",  price:419, img:"img/yard-5kg.jpg",
      nameKey:{uk:"BLACKWOOD YARD 5 кг", ru:"BLACKWOOD YARD 5 кг", en:"BLACKWOOD YARD 5 kg"} },
    { id:"yard-10", category:"yard", weight:"10 kg", price:739, img:"img/yard-10kg.jpg",
      nameKey:{uk:"BLACKWOOD YARD 10 кг", ru:"BLACKWOOD YARD 10 кг", en:"BLACKWOOD YARD 10 kg"} },

    { id:"mesh-1",  category:"sets", weight:"—", price:79,  img:"img/mesh-1.jpg",
      nameKey:{uk:"Сітка для вугілля (1 шт)", ru:"Сетка для угля (1 шт)", en:"Charcoal mesh bag (1 pc)"} },
    { id:"mesh-5",  category:"sets", weight:"—", price:299, img:"img/mesh-5.jpg",
      nameKey:{uk:"Сітки для вугілля (5 шт)", ru:"Сетки для угля (5 шт)", en:"Charcoal mesh bags (5 pcs)"} },
    { id:"starter", category:"sets", weight:"—", price:349, img:"img/starter-kit.jpg",
      nameKey:{uk:"Стартовий набір для гриля", ru:"Стартовый набор для гриля", en:"Grill starter kit"} },
    { id:"fire",    category:"sets", weight:"—", price:129, img:"img/firestarter.jpg",
      nameKey:{uk:"Розпалювач", ru:"Розжиг", en:"Firestarter"} },
    { id:"gloves",  category:"sets", weight:"—", price:249, img:"img/gloves.jpg",
      nameKey:{uk:"Рукавички для гриля", ru:"Перчатки для гриля", en:"Grill gloves"} },
    { id:"tongs",   category:"sets", weight:"—", price:219, img:"img/tongs.jpg",
      nameKey:{uk:"Щипці для гриля", ru:"Щипцы для гриля", en:"Grill tongs"} },
    { id:"brush",   category:"sets", weight:"—", price:189, img:"img/brush.jpg",
      nameKey:{uk:"Щітка для решітки", ru:"Щетка для решетки", en:"Grill brush"} },
    { id:"grate",   category:"sets", weight:"—", price:499, img:"img/grate.jpg",
      nameKey:{uk:"Решітка для гриля", ru:"Решетка для гриля", en:"Grill grate"} },
    { id:"box",     category:"sets", weight:"—", price:159, img:"img/box.jpg",
      nameKey:{uk:"Контейнер для зберігання", ru:"Контейнер для хранения", en:"Storage container"} },
    { id:"set-bbq", category:"sets", weight:"—", price:699, img:"img/bbq-set.jpg",
      nameKey:{uk:"BBQ сет (аксесуари)", ru:"BBQ сет (аксессуары)", en:"BBQ set (accessories)"} },
    { id:"bundle-core", category:"sets", weight:"—", price:1099, img:"img/core-bundle.jpg",
      nameKey:{uk:"CORE сет (3+5 кг)", ru:"CORE сет (3+5 кг)", en:"CORE bundle (3+5 kg)"} },
    { id:"bundle-yard", category:"sets", weight:"—", price:999, img:"img/yard-bundle.jpg",
      nameKey:{uk:"YARD сет (3+5 кг)", ru:"YARD сет (3+5 кг)", en:"YARD bundle (3+5 kg)"} },
  ];

  function getLang(){ return (window.BW_I18N && BW_I18N.getLang()) || "uk"; }
  function t(key){ return (window.BW_I18N && BW_I18N.t(key)) || key; }
  function nameOf(p){
    const lang = getLang();
    return (p.nameKey && (p.nameKey[lang] || p.nameKey.uk)) || p.id;
  }

  function money(n){
    try{
      return new Intl.NumberFormat(getLang() === "en" ? "en-US" : "uk-UA", {
        style:"currency", currency:"UAH", maximumFractionDigits:0
      }).format(n);
    }catch{
      return `${n} UAH`;
    }
  }

  function loadCart(){
    try{
      const raw = localStorage.getItem(CART_KEY);
      const obj = raw ? JSON.parse(raw) : {};
      return obj && typeof obj === "object" ? obj : {};
    }catch{ return {}; }
  }
  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart || {}));
    updateCartBadge();
    window.dispatchEvent(new CustomEvent("bw:cart"));
  }
  function cartCount(cart){
    return Object.values(cart || {}).reduce((a,b)=>a + (Number(b)||0), 0);
  }
  function cartTotal(cart){
    let sum = 0;
    for (const [id, qty] of Object.entries(cart || {})){
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) continue;
      sum += p.price * (Number(qty)||0);
    }
    return sum;
  }
  function updateCartBadge(){
    const cart = loadCart();
    const n = cartCount(cart);
    document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = String(n));
  }

  function toast(msg){
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(el._t);
    el._t = setTimeout(()=>{ el.style.display="none"; }, 1400);
  }

  function setActiveNav(){
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".navlinks a").forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      a.classList.toggle("active", href === path);
    });
  }

  function escapeHtml(s){
    return String(s || "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function renderCatalog(){
    const root = document.getElementById("catalogRoot");
    if (!root) return;

    const input = document.getElementById("searchInput");
    const select = document.getElementById("sortSelect");
    const chips = document.querySelectorAll("[data-cat]");

    function readState(){
      const q = (input && input.value || "").trim().toLowerCase();
      const sort = (select && select.value) || "popular";
      const active = document.querySelector("[data-cat].active");
      const cat = active ? active.getAttribute("data-cat") : "all";
      return { q, sort, cat };
    }

    function filtered(){
      const st = readState();
      let list = [...PRODUCTS];

      if (st.cat !== "all") list = list.filter(p => p.category === st.cat);

      if (st.q){
        list = list.filter(p => {
          const n = nameOf(p).toLowerCase();
          const w = (p.weight || "").toLowerCase();
          return n.includes(st.q) || w.includes(st.q) || p.id.includes(st.q);
        });
      }

      if (st.sort === "price-asc") list.sort((a,b)=>a.price-b.price);
      if (st.sort === "price-desc") list.sort((a,b)=>b.price-a.price);
      if (st.sort === "name-asc") list.sort((a,b)=>nameOf(a).localeCompare(nameOf(b)));
      if (st.sort === "name-desc") list.sort((a,b)=>nameOf(b).localeCompare(nameOf(a)));

      return list;
    }

    function card(p){
      const cart = loadCart();
      const inCart = !!cart[p.id];
      const pill = (p.category || "").toUpperCase();
      const btnLabel = t(inCart ? "in_cart" : "add_to_cart");

      return `
        <article class="card product">
          <div class="thumb">
            <span class="pill">${pill}</span>
            <img src="${p.img}" alt="${escapeHtml(nameOf(p))}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
          </div>
          <div class="body">
            <div class="title">${escapeHtml(nameOf(p))}</div>
            <div class="meta">
              <span class="muted">${escapeHtml(p.weight || "")}</span>
              <span class="price">${money(p.price)}</span>
            </div>
            <div class="actions">
              <button class="btn primary" data-add="${p.id}">${btnLabel}</button>
            </div>
          </div>
        </article>
      `;
    }

    function render(){
      const list = filtered();
      const empty = document.getElementById("catalogEmpty");
      if (!list.length){
        root.innerHTML = "";
        if (empty) empty.style.display = "block";
        return;
      }
      if (empty) empty.style.display = "none";
      root.innerHTML = list.map(card).join("");
    }

    function setChipActive(cat){
      chips.forEach(c => c.classList.toggle("active", c.getAttribute("data-cat") === cat));
      render();
    }

    if (input) input.addEventListener("input", render);
    if (select) select.addEventListener("change", render);

    chips.forEach(c => c.addEventListener("click", (e) => {
      e.preventDefault();
      setChipActive(c.getAttribute("data-cat"));
    }));

    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      const id = btn.getAttribute("data-add");
      const cart = loadCart();
      cart[id] = (Number(cart[id]) || 0) + 1;
      saveCart(cart);
      btn.textContent = t("in_cart");
      toast(t("added_to_cart"));
    });

    function applySortLabels(){
      if (!select) return;
      const opts = Array.from(select.options);
      for (const o of opts){
        if (o.value === "popular") o.textContent = t("sort_popular");
        if (o.value === "price-asc") o.textContent = t("sort_price_asc");
        if (o.value === "price-desc") o.textContent = t("sort_price_desc");
        if (o.value === "name-asc") o.textContent = t("sort_name_asc");
        if (o.value === "name-desc") o.textContent = t("sort_name_desc");
      }
    }

    window.addEventListener("bw:lang", () => { applySortLabels(); render(); });
    window.addEventListener("bw:cart", render);

    applySortLabels();
    setChipActive("all");
  }

  function renderCartPage(){
    const tableBody = document.getElementById("cartBody");
    if (!tableBody) return;

    const emptyEl = document.getElementById("cartEmpty");
    const totalEl = document.getElementById("cartTotal");
    const clearBtn = document.getElementById("clearCartBtn");
    const checkoutBtn = document.getElementById("checkoutBtn");

    function row(p, qty){
      const sum = money(p.price * qty);
      return `
        <tr>
          <td>
            <div style="display:flex; gap:12px; align-items:center;">
              <div style="width:70px; height:52px; border:1px solid var(--stroke); border-radius:12px; overflow:hidden; background:rgba(255,255,255,.03); display:grid; place-items:center;">
                <img src="${p.img}" alt="${escapeHtml(nameOf(p))}" style="max-width:100%; max-height:100%; object-fit:contain; padding:6px;" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
              </div>
              <div>
                <div style="font-weight:950; letter-spacing:.03em;">${escapeHtml(nameOf(p))}</div>
                <div class="muted" style="font-size:13px">${escapeHtml(p.weight || "")}</div>
              </div>
            </div>
          </td>
          <td class="price">${money(p.price)}</td>
          <td>
            <div class="qty" data-qty="${p.id}">
              <button type="button" data-dec="${p.id}">−</button>
              <input type="text" value="${qty}" inputmode="numeric" data-q="${p.id}" aria-label="qty">
              <button type="button" data-inc="${p.id}">+</button>
            </div>
          </td>
          <td class="price">${sum}</td>
          <td style="width:1%; white-space:nowrap;">
            <button class="btn" style="padding:10px 12px; border-radius:12px;" type="button" data-del="${p.id}">✕</button>
          </td>
        </tr>
      `;
    }

    function render(){
      const cart = loadCart();
      const ids = Object.keys(cart);
      if (!ids.length){
        tableBody.innerHTML = "";
        if (emptyEl) emptyEl.style.display = "block";
        if (totalEl) totalEl.textContent = money(0);
        if (checkoutBtn) checkoutBtn.setAttribute("disabled","true");
        return;
      }
      if (emptyEl) emptyEl.style.display = "none";
      const rows = [];
      for (const id of ids){
        const qty = Number(cart[id]) || 0;
        const p = PRODUCTS.find(x => x.id === id);
        if (!p || qty <= 0) continue;
        rows.push(row(p, qty));
      }
      tableBody.innerHTML = rows.join("");
      if (totalEl) totalEl.textContent = money(cartTotal(cart));
      if (checkoutBtn) checkoutBtn.removeAttribute("disabled");
    }

    function setQty(id, qty){
      const cart = loadCart();
      const q = Math.max(0, Math.min(999, Number(qty) || 0));
      if (q <= 0) delete cart[id];
      else cart[id] = q;
      saveCart(cart);
      render();
    }

    tableBody.addEventListener("click", (e) => {
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      const del = e.target.closest("[data-del]");
      if (inc){
        const id = inc.getAttribute("data-inc");
        const cart = loadCart();
        setQty(id, (Number(cart[id]) || 0) + 1);
      } else if (dec){
        const id = dec.getAttribute("data-dec");
        const cart = loadCart();
        setQty(id, (Number(cart[id]) || 0) - 1);
      } else if (del){
        const id = del.getAttribute("data-del");
        setQty(id, 0);
      }
    });

    tableBody.addEventListener("input", (e) => {
      const inp = e.target.closest("[data-q]");
      if (!inp) return;
      const id = inp.getAttribute("data-q");
      const v = (inp.value || "").replace(/[^\d]/g, "");
      inp.value = v;
      setQty(id, Number(v || 0));
    });

    if (clearBtn){
      clearBtn.addEventListener("click", () => {
        saveCart({});
        render();
      });
    }

    if (checkoutBtn){
      checkoutBtn.addEventListener("click", () => {
        location.href = "checkout.html";
      });
    }

    window.addEventListener("bw:lang", render);
    window.addEventListener("bw:cart", render);
    render();
  }

  function initCheckout(){
    const form = document.getElementById("checkoutForm");
    if (!form) return;

    const totalEl = document.getElementById("checkoutTotal");
    const listEl = document.getElementById("checkoutList");
    const emptyEl = document.getElementById("checkoutEmpty");

    function render(){
      const cart = loadCart();
      const ids = Object.keys(cart);
      const total = cartTotal(cart);
      if (totalEl) totalEl.textContent = money(total);

      const items = [];
      for (const id of ids){
        const qty = Number(cart[id]) || 0;
        const p = PRODUCTS.find(x => x.id === id);
        if (!p || qty <= 0) continue;
        items.push(`<div class="summary-row"><span>${escapeHtml(nameOf(p))} × ${qty}</span><strong>${money(p.price * qty)}</strong></div>`);
      }

      if (listEl) listEl.innerHTML = items.join("");
      const hasItems = items.length > 0;
      if (emptyEl) emptyEl.style.display = hasItems ? "none" : "block";
      const btn = form.querySelector("button[type='submit']");
      if (btn) btn.disabled = !hasItems;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const cart = loadCart();
      if (!cartCount(cart)) return;

      const fd = new FormData(form);
      const payload = {
        name: (fd.get("name") || "").toString().trim(),
        phone: (fd.get("phone") || "").toString().trim(),
        city: (fd.get("city") || "").toString().trim(),
        address: (fd.get("address") || "").toString().trim(),
        comment: (fd.get("comment") || "").toString().trim(),
        payment: (fd.get("payment") || "").toString().trim(),
        total: cartTotal(cart),
        items: Object.entries(cart).map(([id, qty]) => ({ id, qty: Number(qty)||0 }))
      };

      if (!payload.name || !payload.phone || !payload.city || !payload.address){
        toast("⚠️ " + t("checkout_hint"));
        return;
      }

      const orderId = "BW-" + Math.random().toString(36).slice(2, 7).toUpperCase();
      sessionStorage.setItem("bw_last_order", JSON.stringify({ orderId, payload }));
      saveCart({});
      location.href = "success.html?order=" + encodeURIComponent(orderId);
    });

    window.addEventListener("bw:lang", render);
    window.addEventListener("bw:cart", render);
    render();
  }

  function initSuccess(){
    const box = document.getElementById("successBox");
    if (!box) return;

    const params = new URLSearchParams(location.search);
    const order = params.get("order") || "";
    const orderEl = document.getElementById("orderId");
    if (orderEl) orderEl.textContent = order ? ("#" + order) : "";

    const detailsEl = document.getElementById("orderDetails");
    try{
      const raw = sessionStorage.getItem("bw_last_order");
      const obj = raw ? JSON.parse(raw) : null;
      if (obj && obj.payload && detailsEl){
        const items = (obj.payload.items || [])
          .map(it => {
            const p = PRODUCTS.find(x => x.id === it.id);
            if (!p) return null;
            return `<div class="summary-row"><span>${escapeHtml(nameOf(p))} × ${it.qty}</span><strong>${money(p.price * it.qty)}</strong></div>`;
          })
          .filter(Boolean)
          .join("");
        detailsEl.innerHTML = items + `<hr class="sep"><div class="summary-row"><span><strong>${t("total")}</strong></span><strong>${money(obj.payload.total || 0)}</strong></div>`;
      }
    }catch{}
  }

  function initContacts(){
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      toast("✅ " + t("send"));
      form.reset();
    });
  }

  function init(){
    setActiveNav();
    updateCartBadge();
    renderCatalog();
    renderCartPage();
    initCheckout();
    initSuccess();
    initContacts();
    window.addEventListener("bw:lang", () => { setActiveNav(); updateCartBadge(); });
    window.addEventListener("bw:cart", updateCartBadge);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
