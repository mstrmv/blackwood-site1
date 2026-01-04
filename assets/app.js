// assets/app.js
(() => {
  const CART_KEY = "bw_cart_v2";

  const money = (n) =>
    new Intl.NumberFormat("uk-UA", { style: "currency", currency: "UAH", maximumFractionDigits: 0 }).format(n);

  // IMPORTANT:
  // CORE images are exact (png). Other products try multiple common filenames (jpg/png/webp).
  // If a file exists in img/, it will be used automatically.
  const imgCandidates = (id, explicit) => {
    const base = id.toLowerCase();
    const common = [
      explicit,
      `img/${base}.jpg`,
      `img/${base}.jpeg`,
      `img/${base}.png`,
      `img/${base}.webp`,
      `img/${base}-1.jpg`,
      `img/${base}-1.png`,
      `img/${base}_1.jpg`,
      `img/${base}_1.png`,
      `img/${base.replaceAll("-", "_")}.jpg`,
      `img/${base.replaceAll("-", "_")}.png`,
      `img/product-${base}.jpg`,
      `img/product-${base}.png`,
      `img/${base}.JPG`,
      `img/${base}.PNG`,
    ].filter(Boolean);

    // Also try "yard-3kg" style from id split
    const alt = [];
    if (base.startsWith("yard-")) {
      const tail = base.replace("yard-", "");
      alt.push(
        `img/yard-${tail}.jpg`,
        `img/yard-${tail}.png`,
        `img/yard-${tail}.jpeg`,
        `img/yard-${tail}.webp`,
        `img/yard_${tail}.jpg`,
        `img/yard_${tail}.png`
      );
    }
    if (base.startsWith("sets-")) {
      const tail = base.replace("sets-", "");
      alt.push(
        `img/${tail}.jpg`,
        `img/${tail}.png`,
        `img/${tail}.jpeg`,
        `img/${tail}.webp`,
        `img/sets-${tail}.jpg`,
        `img/sets-${tail}.png`
      );
    }
    return [...new Set([...common, ...alt])];
  };

  const FALLBACK_IMG = "img/core-3kg.png";

  const PRODUCTS = [
    // CORE (exact png)
    { id: "core-3", brand: "CORE", category: "core", weight: "3 kg", price: 299, img: "img/core-3kg.png",
      name: { uk: "BLACKWOOD CORE 3 кг", ru: "BLACKWOOD CORE 3 кг", en: "BLACKWOOD CORE 3 kg" } },
    { id: "core-5", brand: "CORE", category: "core", weight: "5 kg", price: 459, img: "img/core-5kg.png",
      name: { uk: "BLACKWOOD CORE 5 кг", ru: "BLACKWOOD CORE 5 кг", en: "BLACKWOOD CORE 5 kg" } },
    { id: "core-10", brand: "CORE", category: "core", weight: "10 kg", price: 799, img: "img/core-10kg.png",
      name: { uk: "BLACKWOOD CORE 10 кг", ru: "BLACKWOOD CORE 10 кг", en: "BLACKWOOD CORE 10 kg" } },

    // YARD (tries yard-*.jpg/png automatically)
    { id: "yard-3", brand: "YARD", category: "yard", weight: "3 kg", price: 269, img: null,
      name: { uk: "BLACKWOOD YARD 3 кг", ru: "BLACKWOOD YARD 3 кг", en: "BLACKWOOD YARD 3 kg" } },
    { id: "yard-5", brand: "YARD", category: "yard", weight: "5 kg", price: 419, img: null,
      name: { uk: "BLACKWOOD YARD 5 кг", ru: "BLACKWOOD YARD 5 кг", en: "BLACKWOOD YARD 5 kg" } },
    { id: "yard-10", brand: "YARD", category: "yard", weight: "10 kg", price: 739, img: null,
      name: { uk: "BLACKWOOD YARD 10 кг", ru: "BLACKWOOD YARD 10 кг", en: "BLACKWOOD YARD 10 kg" } },

    // Accessories / sets (tries unique filenames automatically)
    { id: "sets-mesh-1", brand: "SET", category: "sets", weight: "—", price: 79, img: null,
      name: { uk: "Сітка для вугілля (1 шт)", ru: "Сетка для угля (1 шт)", en: "Charcoal mesh bag (1 pc)" } },
    { id: "sets-mesh-5", brand: "SET", category: "sets", weight: "—", price: 299, img: null,
      name: { uk: "Сітки для вугілля (5 шт)", ru: "Сетки для угля (5 шт)", en: "Charcoal mesh bags (5 pcs)" } },
    { id: "sets-starter", brand: "SET", category: "sets", weight: "—", price: 349, img: null,
      name: { uk: "Стартовий набір для гриля", ru: "Стартовый набор для гриля", en: "Grill starter kit" } },
    { id: "sets-firestarter", brand: "SET", category: "sets", weight: "—", price: 129, img: null,
      name: { uk: "Розпалювач", ru: "Розжиг", en: "Firestarter" } },
    { id: "sets-gloves", brand: "SET", category: "sets", weight: "—", price: 249, img: null,
      name: { uk: "Рукавички для гриля", ru: "Перчатки для гриля", en: "Grill gloves" } },
    { id: "sets-tongs", brand: "SET", category: "sets", weight: "—", price: 219, img: null,
      name: { uk: "Щипці для гриля", ru: "Щипцы для гриля", en: "Grill tongs" } },
    { id: "sets-brush", brand: "SET", category: "sets", weight: "—", price: 189, img: null,
      name: { uk: "Щітка для решітки", ru: "Щетка для решетки", en: "Grill brush" } },
    { id: "sets-grate", brand: "SET", category: "sets", weight: "—", price: 499, img: null,
      name: { uk: "Решітка для гриля", ru: "Решетка для гриля", en: "Grill grate" } },
    { id: "sets-container", brand: "SET", category: "sets", weight: "—", price: 159, img: null,
      name: { uk: "Контейнер для зберігання", ru: "Контейнер для хранения", en: "Storage container" } },
    { id: "sets-bbq-set", brand: "SET", category: "sets", weight: "—", price: 699, img: null,
      name: { uk: "BBQ сет (аксесуари)", ru: "BBQ сет (аксессуары)", en: "BBQ set (accessories)" } },
    { id: "sets-core-bundle", brand: "SET", category: "sets", weight: "—", price: 1099, img: null,
      name: { uk: "CORE сет (3+5 кг)", ru: "CORE сет (3+5 кг)", en: "CORE bundle (3+5 kg)" } },
    { id: "sets-yard-bundle", brand: "SET", category: "sets", weight: "—", price: 999, img: null,
      name: { uk: "YARD сет (3+5 кг)", ru: "YARD сет (3+5 кг)", en: "YARD bundle (3+5 kg)" } },
  ];

  function getLang() {
    return (window.BW_I18N && BW_I18N.getLang()) || "uk";
  }
  function t(key) {
    return (window.BW_I18N && BW_I18N.t(key)) || key;
  }
  function nameOf(p) {
    const lang = getLang();
    return (p.name && (p.name[lang] || p.name.uk)) || p.id;
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const obj = raw ? JSON.parse(raw) : {};
      return obj && typeof obj === "object" ? obj : {};
    } catch {
      return {};
    }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart || {}));
    updateCartBadge();
    window.dispatchEvent(new CustomEvent("bw:cart"));
  }
  function cartCount(cart) {
    return Object.values(cart || {}).reduce((a, b) => a + (Number(b) || 0), 0);
  }
  function cartTotal(cart) {
    let sum = 0;
    for (const [id, qty] of Object.entries(cart || {})) {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) continue;
      sum += p.price * (Number(qty) || 0);
    }
    return sum;
  }
  function updateCartBadge() {
    const cart = loadCart();
    const n = cartCount(cart);
    document.querySelectorAll("[data-cart-count]").forEach((el) => (el.textContent = String(n)));
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(el._t);
    el._t = setTimeout(() => {
      el.style.display = "none";
    }, 1600);
  }

  function setActiveNav() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".navlinks a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      a.classList.toggle("active", href === path);
    });
  }

  function esc(s) {
    return String(s || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function bindMultiSrc(imgEl, candidates) {
    const list = (candidates || []).filter(Boolean);
    let idx = 0;

    const tryNext = () => {
      if (idx >= list.length) {
        imgEl.onerror = null;
        imgEl.src = FALLBACK_IMG;
        return;
      }
      imgEl.src = list[idx++];
    };

    imgEl.onerror = () => tryNext();
    tryNext();
  }

  function renderCatalog() {
    const root = document.getElementById("catalogRoot");
    if (!root) return;

    const input = document.getElementById("searchInput");
    const select = document.getElementById("sortSelect");
    const chips = Array.from(document.querySelectorAll("[data-cat]"));

    let state = { q: "", cat: "all", sort: "popular" };

    function setChipActive(cat) {
      chips.forEach((c) => c.classList.toggle("active", c.getAttribute("data-cat") === cat));
      render();
    }

    function readState() {
      state.q = ((input && input.value) || "").trim().toLowerCase();
      state.sort = (select && select.value) || "popular";
      const active = document.querySelector("[data-cat].active");
      state.cat = active ? active.getAttribute("data-cat") : "all";
    }

    function filtered() {
      readState();
      let list = [...PRODUCTS];

      if (state.cat !== "all") list = list.filter((p) => p.category === state.cat);

      if (state.q) {
        list = list.filter((p) => {
          const n = nameOf(p).toLowerCase();
          const b = (p.brand || "").toLowerCase();
          const w = (p.weight || "").toLowerCase();
          return n.includes(state.q) || b.includes(state.q) || w.includes(state.q);
        });
      }

      if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
      if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
      if (state.sort === "name-asc") list.sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
      if (state.sort === "name-desc") list.sort((a, b) => nameOf(b).localeCompare(nameOf(a)));

      return list;
    }

    function card(p) {
      const cart = loadCart();
      const inCart = !!cart[p.id];
      const pill = (p.brand || p.category || "").toUpperCase();
      const btnLabel = inCart ? t("in_cart") : t("add_to_cart");

      const cands = imgCandidates(p.id, p.img);

      return `
        <article class="panel product" data-pid="${esc(p.id)}">
          <div class="thumb">
            <span class="pill">${esc(pill)}</span>
            <img data-multisrc="${esc(cands.join("|"))}" alt="${esc(nameOf(p))}" loading="lazy">
          </div>
          <div class="body">
            <div class="title">${esc(nameOf(p))}</div>
            <div class="meta">
              <span class="muted">${esc(p.weight || "")}</span>
              <span class="price">${money(p.price)}</span>
            </div>
            <div class="actions">
              <button class="btn primary" data-add="${esc(p.id)}">${esc(btnLabel)}</button>
            </div>
          </div>
        </article>
      `;
    }

    function applyImages() {
      root.querySelectorAll("img[data-multisrc]").forEach((img) => {
        const raw = img.getAttribute("data-multisrc") || "";
        const list = raw.split("|").map((s) => s.trim()).filter(Boolean);
        bindMultiSrc(img, [...list, FALLBACK_IMG]);
      });
    }

    function render() {
      const list = filtered();
      const empty = document.getElementById("catalogEmpty");
      if (!list.length) {
        root.innerHTML = "";
        if (empty) empty.style.display = "block";
        return;
      }
      if (empty) empty.style.display = "none";
      root.innerHTML = list.map(card).join("");
      applyImages();
    }

    if (input) input.addEventListener("input", render);
    if (select) select.addEventListener("change", render);

    chips.forEach((c) =>
      c.addEventListener("click", (e) => {
        e.preventDefault();
        setChipActive(c.getAttribute("data-cat"));
      })
    );

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

    function applyHashCat() {
      const h = (location.hash || "").replace("#", "").trim().toLowerCase();
      if (h === "core" || h === "yard" || h === "sets") setChipActive(h);
      else setChipActive("all");
    }

    window.addEventListener("hashchange", applyHashCat);
    window.addEventListener("bw:lang", render);
    window.addEventListener("bw:cart", render);

    applyHashCat();
  }

  function renderCartPage() {
    const tableBody = document.getElementById("cartBody");
    if (!tableBody) return;

    const emptyEl = document.getElementById("cartEmpty");
    const totalEl = document.getElementById("cartTotal");
    const clearBtn = document.getElementById("clearCartBtn");
    const checkoutBtn = document.getElementById("checkoutBtn");

    function row(p, qty) {
      const cands = imgCandidates(p.id, p.img).concat([FALLBACK_IMG]);
      return `
        <tr>
          <td>
            <div style="display:flex; gap:12px; align-items:center;">
              <div style="width:70px; height:52px; border:1px solid var(--stroke); border-radius:12px; overflow:hidden; background:rgba(255,255,255,.03); display:grid; place-items:center;">
                <img data-multisrc="${esc(cands.join("|"))}" alt="${esc(nameOf(p))}" style="width:100%; height:100%; object-fit:cover;">
              </div>
              <div>
                <div style="font-weight:980; letter-spacing:.03em;">${esc(nameOf(p))}</div>
                <div class="muted" style="font-size:13px">${esc(p.weight || "")}</div>
              </div>
            </div>
          </td>
          <td class="price">${money(p.price)}</td>
          <td>
            <div class="qty">
              <button type="button" data-dec="${esc(p.id)}">−</button>
              <input type="text" value="${qty}" inputmode="numeric" data-q="${esc(p.id)}" aria-label="qty">
              <button type="button" data-inc="${esc(p.id)}">+</button>
            </div>
          </td>
          <td class="price">${money(p.price * qty)}</td>
          <td style="width:1%; white-space:nowrap;">
            <button class="btn" style="padding:10px 12px; border-radius:12px;" type="button" data-del="${esc(p.id)}">✕</button>
          </td>
        </tr>
      `;
    }

    function applyImages() {
      tableBody.querySelectorAll("img[data-multisrc]").forEach((img) => {
        const raw = img.getAttribute("data-multisrc") || "";
        const list = raw.split("|").map((s) => s.trim()).filter(Boolean);
        bindMultiSrc(img, list);
      });
    }

    function render() {
      const cart = loadCart();
      const ids = Object.keys(cart);
      if (!ids.length) {
        tableBody.innerHTML = "";
        if (emptyEl) emptyEl.style.display = "block";
        if (totalEl) totalEl.textContent = money(0);
        if (checkoutBtn) checkoutBtn.setAttribute("disabled", "true");
        return;
      }

      const rows = [];
      for (const id of ids) {
        const qty = Number(cart[id]) || 0;
        const p = PRODUCTS.find((x) => x.id === id);
        if (!p || qty <= 0) continue;
        rows.push(row(p, qty));
      }

      if (!rows.length) {
        saveCart({});
        render();
        return;
      }

      if (emptyEl) emptyEl.style.display = "none";
      tableBody.innerHTML = rows.join("");
      applyImages();

      if (totalEl) totalEl.textContent = money(cartTotal(cart));
      if (checkoutBtn) checkoutBtn.removeAttribute("disabled");
    }

    function setQty(id, qty) {
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
      if (inc) {
        const id = inc.getAttribute("data-inc");
        const cart = loadCart();
        setQty(id, (Number(cart[id]) || 0) + 1);
      } else if (dec) {
        const id = dec.getAttribute("data-dec");
        const cart = loadCart();
        setQty(id, (Number(cart[id]) || 0) - 1);
      } else if (del) {
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

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        saveCart({});
        render();
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        location.href = "checkout.html";
      });
    }

    window.addEventListener("bw:lang", render);
    window.addEventListener("bw:cart", render);
    render();
  }

  function initCheckout() {
    const form = document.getElementById("checkoutForm");
    if (!form) return;

    const totalEl = document.getElementById("checkoutTotal");
    const listEl = document.getElementById("checkoutList");
    const emptyEl = document.getElementById("checkoutEmpty");

    function render() {
      const cart = loadCart();
      const ids = Object.keys(cart);
      const total = cartTotal(cart);
      if (totalEl) totalEl.textContent = money(total);

      const items = [];
      for (const id of ids) {
        const qty = Number(cart[id]) || 0;
        const p = PRODUCTS.find((x) => x.id === id);
        if (!p || qty <= 0) continue;
        items.push(`<div class="summary-row"><span>${esc(nameOf(p))} × ${qty}</span><strong>${money(p.price * qty)}</strong></div>`);
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
        items: Object.entries(cart).map(([id, qty]) => ({ id, qty: Number(qty) || 0 })),
      };

      if (!payload.name || !payload.phone || !payload.city || !payload.address) {
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

  function initSuccess() {
    const box = document.getElementById("successBox");
    if (!box) return;

    const params = new URLSearchParams(location.search);
    const order = params.get("order") || "";
    const orderEl = document.getElementById("orderId");
    if (orderEl) orderEl.textContent = order ? ("#" + order) : "";

    const detailsEl = document.getElementById("orderDetails");
    try {
      const raw = sessionStorage.getItem("bw_last_order");
      const obj = raw ? JSON.parse(raw) : null;
      if (obj && obj.payload && detailsEl) {
        const items = (obj.payload.items || [])
          .map((it) => {
            const p = PRODUCTS.find((x) => x.id === it.id);
            if (!p) return null;
            return `<div class="summary-row"><span>${esc(nameOf(p))} × ${it.qty}</span><strong>${money(p.price * it.qty)}</strong></div>`;
          })
          .filter(Boolean)
          .join("");
        detailsEl.innerHTML =
          items +
          `<hr class="sep"><div class="summary-row"><span><strong>${esc(t("total"))}</strong></span><strong>${money(obj.payload.total || 0)}</strong></div>`;
      }
    } catch {}
  }

  function initContacts() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      toast("✅ " + t("send"));
      form.reset();
    });
  }

  function init() {
    setActiveNav();
    updateCartBadge();

    renderCatalog();
    renderCartPage();
    initCheckout();
    initSuccess();
    initContacts();

    window.addEventListener("bw:lang", () => {
      setActiveNav();
      updateCartBadge();
    });
    window.addEventListener("bw:cart", updateCartBadge);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
