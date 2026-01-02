(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Storage keys
  const CART_KEY = "bw_cart_v2";
  const ORDERS_KEY = "bw_orders_v1";

  // Paths fallback (GitHub Pages cache/paths)
  const IMG = {
    core3: ["img/products/core-3kg.png", "./img/products/core-3kg.png"],
    core5: ["img/products/core-5kg.png", "./img/products/core-5kg.png"],
    core10: ["img/products/core-10kg.png", "./img/products/core-10kg.png"],
  };

  // Products (можешь потом добавить цены)
  const products = [
    { id: "core-3", title: "CORE • 3 KG", weight: 3, group: "3-5", imgs: IMG.core3, price: 0 },
    { id: "core-5", title: "CORE • 5 KG", weight: 5, group: "3-5", imgs: IMG.core5, price: 0 },
    { id: "core-10", title: "CORE • 10 KG", weight: 10, group: "10", imgs: IMG.core10, price: 0 },
  ];

  // ---------- helpers ----------
  function safeParse(raw, fallback) {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function readCart() {
    return safeParse(localStorage.getItem(CART_KEY), {});
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  function clearCart() {
    localStorage.removeItem(CART_KEY);
  }
  function cartCount(cart) {
    return Object.values(cart).reduce((a, n) => a + (Number(n) || 0), 0);
  }

  function getProduct(id) {
    return products.find((p) => p.id === id);
  }

  function cartItemsDetailed() {
    const cart = readCart();
    const ids = Object.keys(cart).filter((k) => (Number(cart[k]) || 0) > 0);
    return ids.map((id) => {
      const p = getProduct(id);
      const qty = Number(cart[id]) || 0;
      return { id, product: p, qty };
    });
  }

  function setCartCountUI() {
    const el = $("#cartCount");
    if (el) el.textContent = String(cartCount(readCart()));
  }

  function setActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    $$(".nav__link").forEach((a) => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      a.classList.toggle("is-active", href === path);
    });
  }

  function initYear() {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initLangButtons() {
    const btns = $$(".lang__btn");
    if (!btns.length) return;

    // запоминаем язык
    const stored = localStorage.getItem("bw_lang") || "ru";
    btns.forEach((b) => b.classList.toggle("is-active", b.dataset.lang === stored));

    btns.forEach((b) => {
      b.addEventListener("click", () => {
        btns.forEach((x) => x.classList.remove("is-active"));
        b.classList.add("is-active");
        localStorage.setItem("bw_lang", b.dataset.lang || "ru");
        // тексты можно локализовать позже (сейчас только переключатель)
      });
    });
  }

  // ---------- image fallback ----------
  function createImgTag(imgs, alt) {
    const first = imgs?.[0] || "";
    const rest = imgs?.slice(1) || [];
    const id = "img_" + Math.random().toString(16).slice(2);

    const html = `<img id="${id}" class="card__img" src="${first}" alt="${alt}" loading="lazy">`;

    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      let i = 0;
      el.addEventListener("error", () => {
        if (i < rest.length) {
          const next = rest[i++];
          console.warn("Image failed, trying:", next);
          el.src = next;
        } else {
          console.error("All image paths failed for:", alt, imgs);
        }
      });
    }, 0);

    return html;
  }

  // ---------- catalog ----------
  function cardTemplate(p) {
    return `
      <article class="card" data-id="${p.id}" data-group="${p.group}" data-weight="${p.weight}">
        <div class="card__media">
          <div class="card__frame">
            ${createImgTag(p.imgs, p.title)}
          </div>
        </div>

        <div class="card__body">
          <div class="card__title">${p.title}</div>
          <div class="card__sub">${p.weight} kg</div>

          <div class="card__row">
            <div class="qty" role="group" aria-label="quantity">
              <button class="qty__btn" data-act="minus" type="button">−</button>
              <div class="qty__num" data-qty>1</div>
              <button class="qty__btn" data-act="plus" type="button">+</button>
            </div>

            <button class="btn btn--gold card__buy" data-act="add" type="button">В КОРЗИНУ</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderProducts(list) {
    const grid = $("#productsGrid");
    if (!grid) return;
    grid.innerHTML = list.map(cardTemplate).join("");
  }

  function applyFilterAndSort() {
    const grid = $("#productsGrid");
    if (!grid) return;

    const activeChip = $(".chip.is-active");
    const filter = activeChip ? activeChip.dataset.filter : "all";
    const sort = $("#sortSelect") ? $("#sortSelect").value : "popular";

    let list = [...products];

    if (filter !== "all") list = list.filter((p) => p.group === filter);

    if (sort === "weight_asc") list.sort((a, b) => a.weight - b.weight);
    if (sort === "weight_desc") list.sort((a, b) => b.weight - a.weight);

    renderProducts(list);
  }

  function bindCatalogEvents() {
    const grid = $("#productsGrid");
    if (!grid) return;

    $$(".chip").forEach((ch) => {
      ch.addEventListener("click", () => {
        $$(".chip").forEach((x) => x.classList.remove("is-active"));
        ch.classList.add("is-active");
        applyFilterAndSort();
      });
    });

    const sort = $("#sortSelect");
    if (sort) sort.addEventListener("change", applyFilterAndSort);

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const card = e.target.closest(".card");
      if (!card) return;

      const act = btn.dataset.act;
      const qtyEl = card.querySelector("[data-qty]");
      let qty = Number(qtyEl?.textContent || 1);

      if (act === "minus") {
        qty = Math.max(1, qty - 1);
        qtyEl.textContent = String(qty);
        return;
      }
      if (act === "plus") {
        qty = Math.min(99, qty + 1);
        qtyEl.textContent = String(qty);
        return;
      }
      if (act === "add") {
        const id = card.dataset.id;
        const cart = readCart();
        cart[id] = (Number(cart[id]) || 0) + qty;
        saveCart(cart);
        setCartCountUI();

        btn.textContent = "ДОБАВЛЕНО";
        setTimeout(() => (btn.textContent = "В КОРЗИНУ"), 900);
      }
    });
  }

  // ---------- cart page ----------
  function renderCartPage() {
    const box = $("#cartBox");
    const totalEl = $("#cartTotal");
    const emptyEl = $("#cartEmpty");
    const actionsEl = $("#cartActions");

    if (!box) return;

    const items = cartItemsDetailed();

    if (items.length === 0) {
      if (emptyEl) emptyEl.style.display = "block";
      if (actionsEl) actionsEl.style.display = "none";
      if (totalEl) totalEl.textContent = "0";
      box.innerHTML = "";
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";
    if (actionsEl) actionsEl.style.display = "flex";

    const rows = items
      .map(({ id, product, qty }) => {
        const title = product?.title || id;
        const sub = product ? `${product.weight} kg` : "";
        return `
        <div class="cartrow glass">
          <div class="cartrow__left">
            <div class="cartrow__title">${title}</div>
            <div class="cartrow__sub">${sub}</div>
          </div>

          <div class="cartrow__right">
            <div class="qty" role="group" aria-label="quantity">
              <button class="qty__btn" data-cart-act="minus" data-id="${id}" type="button">−</button>
              <div class="qty__num">${qty}</div>
              <button class="qty__btn" data-cart-act="plus" data-id="${id}" type="button">+</button>
            </div>
            <button class="btn btn--ghost" data-cart-act="remove" data-id="${id}" type="button">Удалить</button>
          </div>
        </div>
      `;
      })
      .join("");

    box.innerHTML = rows;

    // total = сумма количества (пока без цены)
    const total = items.reduce((a, it) => a + it.qty, 0);
    if (totalEl) totalEl.textContent = String(total);

    box.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-cart-act]");
      if (!b) return;
      const act = b.dataset.cartAct;
      const id = b.dataset.id;
      const cart = readCart();

      const current = Number(cart[id]) || 0;

      if (act === "minus") {
        cart[id] = Math.max(0, current - 1);
        if (cart[id] === 0) delete cart[id];
      }
      if (act === "plus") {
        cart[id] = Math.min(99, current + 1);
      }
      if (act === "remove") {
        delete cart[id];
      }

      saveCart(cart);
      setCartCountUI();
      renderCartPage();
    });
  }

  // ---------- checkout ----------
  function fmtOrderId() {
    // BW-YYYYMMDD-XXXX
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const rnd = Math.floor(1000 + Math.random() * 9000);
    return `BW-${y}${m}${day}-${rnd}`;
  }

  function normalizePhoneUA(v) {
    // допускаем +380..., 0..., 380...
    const digits = (v || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("380")) return "+" + digits;
    if (digits.startsWith("0")) return "+38" + digits;
    if (digits.length === 9) return "+380" + digits;
    if (digits.startsWith("38") && digits.length >= 12) return "+" + digits;
    return v.trim();
  }

  function validateCheckout(data) {
    const errors = {};

    if (!data.fullName || data.fullName.trim().length < 4) errors.fullName = "Введите ФИО";
    const phone = normalizePhoneUA(data.phone);
    if (!phone || phone.replace(/\D/g, "").length < 12) errors.phone = "Введите номер телефона (UA)";
    if (!data.city || data.city.trim().length < 2) errors.city = "Введите город";
    if (!data.npWarehouse || data.npWarehouse.trim().length < 1) errors.npWarehouse = "Введите отделение/почтомат";
    if (!data.payment) errors.payment = "Выберите оплату";

    return errors;
  }

  function saveOrder(order) {
    const list = safeParse(localStorage.getItem(ORDERS_KEY), []);
    list.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list.slice(0, 30)));
  }

  function renderCheckoutSummary() {
    const box = $("#checkoutSummary");
    if (!box) return;

    const items = cartItemsDetailed();
    if (!items.length) {
      box.innerHTML = `<div class="muted">Корзина пустая. Перейдите в каталог.</div>`;
      return;
    }

    const rows = items
      .map(({ product, qty, id }) => {
        const title = product?.title || id;
        return `<div class="sumrow">
          <div class="sumrow__t">${title}</div>
          <div class="sumrow__q">× ${qty}</div>
        </div>`;
      })
      .join("");

    box.innerHTML = rows;
  }

  function initCheckoutForm() {
    const form = $("#checkoutForm");
    if (!form) return;

    renderCheckoutSummary();

    // Prefill last data (optional)
    const last = safeParse(localStorage.getItem("bw_checkout_last"), null);
    if (last) {
      ["fullName", "phone", "city", "npWarehouse", "comment"].forEach((k) => {
        const el = form.elements[k];
        if (el && last[k]) el.value = last[k];
      });
      if (last.payment) {
        const el = form.elements["payment"];
        if (el) el.value = last.payment;
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const items = cartItemsDetailed();
      if (!items.length) {
        alert("Корзина пустая. Добавьте товары.");
        location.href = "catalog.html";
        return;
      }

      const data = {
        fullName: form.elements.fullName.value.trim(),
        phone: normalizePhoneUA(form.elements.phone.value.trim()),
        city: form.elements.city.value.trim(),
        npWarehouse: form.elements.npWarehouse.value.trim(),
        payment: form.elements.payment.value,
        comment: form.elements.comment.value.trim(),
      };

      const errors = validateCheckout(data);

      // UI errors
      $$(".field").forEach((f) => f.classList.remove("field--error"));
      $$(".err").forEach((x) => (x.textContent = ""));

      Object.keys(errors).forEach((k) => {
        const field = form.querySelector(`[data-field="${k}"]`);
        const err = form.querySelector(`[data-err="${k}"]`);
        if (field) field.classList.add("field--error");
        if (err) err.textContent = errors[k];
      });

      if (Object.keys(errors).length) return;

      // Save last entered for convenience
      localStorage.setItem("bw_checkout_last", JSON.stringify(data));

      const orderId = fmtOrderId();
      const order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: data,
        items: items.map((it) => ({
          id: it.id,
          title: it.product?.title || it.id,
          weight: it.product?.weight || null,
          qty: it.qty,
        })),
      };

      saveOrder(order);

      // put current order for success page
      localStorage.setItem("bw_last_order", JSON.stringify(order));

      // clear cart
      clearCart();
      setCartCountUI();

      location.href = "success.html";
    });
  }

  // ---------- success page ----------
  function renderSuccessPage() {
    const box = $("#successBox");
    if (!box) return;

    const order = safeParse(localStorage.getItem("bw_last_order"), null);
    if (!order) {
      box.innerHTML = `<div class="glass panel">Заказ не найден. Перейдите в каталог.</div>`;
      return;
    }

    const items = (order.items || [])
      .map((it) => `<div class="sumrow">
        <div class="sumrow__t">${it.title}</div>
        <div class="sumrow__q">× ${it.qty}</div>
      </div>`)
      .join("");

    const c = order.customer || {};
    const textToCopy =
`Заказ: ${order.id}
ФИО: ${c.fullName}
Телефон: ${c.phone}
Город: ${c.city}
Нова Пошта (отделение/почтомат): ${c.npWarehouse}
Оплата: ${c.payment}
Комментарий: ${c.comment || "-"}

Товары:
${(order.items||[]).map(x=>`- ${x.title} x${x.qty}`).join("\n")}
`;

    box.innerHTML = `
      <div class="glass panel">
        <div class="h1" style="font-size:26px; margin-bottom:8px;">Заказ принят</div>
        <div class="muted">Номер заказа: <b style="color:#fff">${order.id}</b></div>

        <div class="divider"></div>

        <div class="muted" style="margin-bottom:8px;">Данные доставки (Нова Пошта):</div>
        <div class="kv">
          <div><span>ФИО:</span> <b>${escapeHtml(c.fullName || "")}</b></div>
          <div><span>Телефон:</span> <b>${escapeHtml(c.phone || "")}</b></div>
          <div><span>Город:</span> <b>${escapeHtml(c.city || "")}</b></div>
          <div><span>Отделение:</span> <b>${escapeHtml(c.npWarehouse || "")}</b></div>
          <div><span>Оплата:</span> <b>${escapeHtml(c.payment || "")}</b></div>
        </div>

        ${c.comment ? `<div class="muted" style="margin-top:10px;">Комментарий: ${escapeHtml(c.comment)}</div>` : ""}

        <div class="divider"></div>

        <div class="muted" style="margin-bottom:8px;">Товары:</div>
        <div id="successItems">${items}</div>

        <div class="divider"></div>

        <div class="rowbtns">
          <button class="btn btn--ghost" id="copyOrder" type="button">Скопировать данные</button>
          <a class="btn btn--gold" href="catalog.html">В каталог</a>
        </div>
      </div>
    `;

    const copyBtn = $("#copyOrder");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(textToCopy);
          copyBtn.textContent = "Скопировано ✅";
          setTimeout(() => (copyBtn.textContent = "Скопировать данные"), 1200);
        } catch {
          alert("Не удалось скопировать. Скопируйте вручную:\n\n" + textToCopy);
        }
      });
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ---------- init ----------
  document.addEventListener("DOMContentLoaded", () => {
    initYear();
    initLangButtons();
    setActiveNav();
    setCartCountUI();

    // catalog
    if ($("#productsGrid")) {
      applyFilterAndSort();
      bindCatalogEvents();
    }

    // cart
    if ($("#cartBox")) renderCartPage();

    // checkout
    if ($("#checkoutForm")) initCheckoutForm();

    // success
    if ($("#successBox")) renderSuccessPage();
  });
})();
