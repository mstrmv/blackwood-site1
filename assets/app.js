(() => {
  const LS_CART = "bw_cart_v1";
  const LS_LANG = "bw_lang_v1";

  const money = (n) => `${n} грн`;

  const products = [
    { id: "core-3",  name: "CORE · 3 KG",  weight: "3 kg",  price: 0,  img: "img/products/core-3kg.png",  group: "3-5" },
    { id: "core-5",  name: "CORE · 5 KG",  weight: "5 kg",  price: 0,  img: "img/products/core-5kg.png",  group: "3-5" },
    { id: "core-10", name: "CORE · 10 KG", weight: "10 kg", price: 0,  img: "img/products/core-10kg.png", group: "10" }
  ];

  const i18n = {
    ru: {
      home: "Главная", catalog: "Каталог", shipping: "Доставка", about: "О нас", contacts: "Контакты",
      cart: "Корзина",
      hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
      hero_desc: "Длительное горение, минимум пепла, чистый жар.\nИдеально для BBQ и гриля.",
      open_catalog: "Открыть каталог",
      delivery_pay: "Доставка и оплата",
      go_cart: "Перейти в корзину",
      products: "ТОВАРЫ",
      choose_weight: "Выберите вес и добавьте в корзину.",
      filter: "Filter",
      all: "All",
      sort: "Sort",
      popular: "Popular",
      price_low: "Price: Low",
      price_high: "Price: High",
      in_cart: "В корзину",
      to_cart: "Перейти в корзину",
      checkout: "Оформить заказ",
      empty_cart: "Корзина пуста. Перейдите в каталог и добавьте товары.",
      total: "Итого",
      checkout_title: "Оформление заказа",
      name: "Имя и Фамилия",
      phone: "Телефон",
      city: "Город",
      address: "Адрес (НП/улица/дом)",
      comment: "Комментарий",
      place_order: "Подтвердить заказ",
      back_to_cart: "Назад в корзину",
      success_title: "Заказ оформлен!",
      success_desc: "Спасибо! Мы скоро свяжемся с вами для подтверждения."
    },
    ukr: {
      home: "Головна", catalog: "Каталог", shipping: "Доставка", about: "Про нас", contacts: "Контакти",
      cart: "Кошик",
      hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
      hero_desc: "Довге горіння, мінімум попелу, чистий жар.\nІдеально для BBQ та гриля.",
      open_catalog: "Відкрити каталог",
      delivery_pay: "Доставка та оплата",
      go_cart: "Перейти в кошик",
      products: "ТОВАРИ",
      choose_weight: "Оберіть вагу та додайте в кошик.",
      filter: "Filter",
      all: "All",
      sort: "Sort",
      popular: "Popular",
      price_low: "Price: Low",
      price_high: "Price: High",
      in_cart: "У кошик",
      to_cart: "Перейти в кошик",
      checkout: "Оформити замовлення",
      empty_cart: "Кошик порожній. Перейдіть у каталог і додайте товари.",
      total: "Разом",
      checkout_title: "Оформлення замовлення",
      name: "Ім'я та Прізвище",
      phone: "Телефон",
      city: "Місто",
      address: "Адреса (НП/вулиця/будинок)",
      comment: "Коментар",
      place_order: "Підтвердити замовлення",
      back_to_cart: "Назад у кошик",
      success_title: "Замовлення оформлено!",
      success_desc: "Дякуємо! Ми скоро зв’яжемося з вами для підтвердження."
    },
    en: {
      home: "Home", catalog: "Catalog", shipping: "Shipping", about: "About", contacts: "Contacts",
      cart: "Cart",
      hero_title: "PREMIUM\nHARDWOOD\nCHARCOAL",
      hero_desc: "Long heat, low ash, clean burn.\nPerfect for BBQ & grill.",
      open_catalog: "Open catalog",
      delivery_pay: "Shipping & payment",
      go_cart: "Go to cart",
      products: "PRODUCTS",
      choose_weight: "Choose a weight and add to cart.",
      filter: "Filter",
      all: "All",
      sort: "Sort",
      popular: "Popular",
      price_low: "Price: Low",
      price_high: "Price: High",
      in_cart: "Add to cart",
      to_cart: "Go to cart",
      checkout: "Checkout",
      empty_cart: "Your cart is empty. Go to catalog and add items.",
      total: "Total",
      checkout_title: "Checkout",
      name: "Full name",
      phone: "Phone",
      city: "City",
      address: "Address",
      comment: "Comment",
      place_order: "Place order",
      back_to_cart: "Back to cart",
      success_title: "Order placed!",
      success_desc: "Thank you! We’ll contact you soon to confirm."
    }
  };

  const getLang = () => localStorage.getItem(LS_LANG) || "ru";
  const setLang = (lang) => localStorage.setItem(LS_LANG, lang);

  const getCart = () => {
    try { return JSON.parse(localStorage.getItem(LS_CART) || "{}"); }
    catch { return {}; }
  };
  const setCart = (cart) => localStorage.setItem(LS_CART, JSON.stringify(cart));

  const cartCount = () => Object.values(getCart()).reduce((a,b)=>a+b,0);
  const cartTotal = () => {
    const cart = getCart();
    let t = 0;
    for(const [id,qty] of Object.entries(cart)){
      const p = products.find(x=>x.id===id);
      if(p) t += (p.price||0) * qty;
    }
    return t;
  };

  const toast = (msg) => {
    let el = document.querySelector(".toast");
    if(!el){
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(()=> el.classList.remove("show"), 1600);
  };

  const applyI18n = () => {
    const lang = getLang();
    const t = i18n[lang] || i18n.ru;

    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if(t[key] != null) el.textContent = t[key];
    });

    // multiline for hero
    document.querySelectorAll("[data-i18n-multiline]").forEach(el=>{
      const key = el.getAttribute("data-i18n-multiline");
      if(t[key] != null) el.innerHTML = String(t[key]).replace(/\n/g,"<br>");
    });

    // active lang buttons
    document.querySelectorAll("[data-lang]").forEach(btn=>{
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  };

  const wireLangButtons = () => {
    document.querySelectorAll("[data-lang]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        setLang(btn.getAttribute("data-lang"));
        applyI18n();
      });
    });
  };

  const updateHeaderCartCount = () => {
    document.querySelectorAll("#cartCount").forEach(el => el.textContent = String(cartCount()));
  };

  /* ===== Catalog render ===== */
  const renderCatalog = () => {
    const grid = document.querySelector("#catalogGrid");
    if(!grid) return;

    let filter = "all";
    let sort = "popular";

    const apply = () => {
      let list = [...products];

      if(filter === "3-5") list = list.filter(p=>p.group==="3-5");
      if(filter === "10") list = list.filter(p=>p.group==="10");

      if(sort === "price_low") list.sort((a,b)=>(a.price||0)-(b.price||0));
      if(sort === "price_high") list.sort((a,b)=>(b.price||0)-(a.price||0));

      grid.innerHTML = list.map(p=>`
        <div class="card">
          <div class="prodImg"><img src="${p.img}" alt="${p.name}"></div>
          <h3 class="prodTitle">${p.name}</h3>
          <div class="meta">
            <div>${p.weight}</div>
            <div class="price">${p.price ? money(p.price) : "-"}</div>
          </div>

          <div class="addRow">
            <div class="qty" data-qty="${p.id}">
              <button type="button" data-dec="${p.id}">−</button>
              <div class="qtyVal" id="qty-${p.id}">1</div>
              <button type="button" data-inc="${p.id}">+</button>
            </div>
            <button class="addBtn" type="button" data-add="${p.id}" data-i18n="in_cart">В корзину</button>
          </div>
        </div>
      `).join("");

      // qty state
      const qtyState = {};
      list.forEach(p=>qtyState[p.id]=1);

      grid.querySelectorAll("[data-inc]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          const id = btn.getAttribute("data-inc");
          qtyState[id] = Math.min(99,(qtyState[id]||1)+1);
          const el = document.getElementById(`qty-${id}`);
          if(el) el.textContent = String(qtyState[id]);
        });
      });

      grid.querySelectorAll("[data-dec]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          const id = btn.getAttribute("data-dec");
          qtyState[id] = Math.max(1,(qtyState[id]||1)-1);
          const el = document.getElementById(`qty-${id}`);
          if(el) el.textContent = String(qtyState[id]);
        });
      });

      grid.querySelectorAll("[data-add]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          const id = btn.getAttribute("data-add");
          const cart = getCart();
          cart[id] = (cart[id]||0) + (qtyState[id]||1);
          setCart(cart);
          updateHeaderCartCount();
          toast("✅ Добавлено в корзину");
        });
      });

      applyI18n();
    };

    // pills
    document.querySelectorAll("[data-filter]").forEach(b=>{
      b.addEventListener("click", ()=>{
        document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));
        b.classList.add("active");
        filter = b.getAttribute("data-filter");
        apply();
      });
    });

    // sort select
    const sel = document.querySelector("#sortSelect");
    if(sel){
      sel.addEventListener("change", ()=>{
        sort = sel.value;
        apply();
      });
    }

    apply();
  };

  /* ===== Cart render ===== */
  const renderCart = () => {
    const box = document.querySelector("#cartBox");
    if(!box) return;

    const t = i18n[getLang()] || i18n.ru;

    const draw = () => {
      const cart = getCart();
      const items = Object.entries(cart).map(([id,qty])=>{
        const p = products.find(x=>x.id===id);
        if(!p) return null;
        return {p,qty};
      }).filter(Boolean);

      if(items.length===0){
        box.innerHTML = `<p class="cartEmpty" data-i18n="empty_cart">${t.empty_cart}</p>`;
        updateHeaderCartCount();
        applyI18n();
        return;
      }

      box.innerHTML = `
        <div class="cartList">
          ${items.map(({p,qty})=>`
            <div class="cartItem" data-item="${p.id}">
              <div class="cartThumb"><img src="${p.img}" alt="${p.name}"></div>

              <div>
                <div class="cartName">${p.name}</div>
                <div class="cartSub">${p.weight} · <span class="price">${p.price?money(p.price):"-"}</span></div>
              </div>

              <div class="cartRight">
                <div class="cartLinePrice">${p.price?money((p.price||0)*qty):"-"}</div>
                <div class="cartActions">
                  <button class="iconBtn" type="button" data-dec="${p.id}">−</button>
                  <b id="cqty-${p.id}">${qty}</b>
                  <button class="iconBtn" type="button" data-inc="${p.id}">+</button>
                  <button class="removeBtn" type="button" data-rm="${p.id}">Удалить</button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="cartTotalRow">
          <div class="total"><span data-i18n="total">${t.total}</span>: <span id="cartTotal">${money(cartTotal())}</span></div>
          <div style="display:flex; gap:12px; flex-wrap:wrap">
            <a class="btn dark" href="catalog.html" data-i18n="to_cart">Перейти в корзину</a>
            <a class="btn gold" href="checkout.html" data-i18n="checkout">Оформить заказ</a>
          </div>
        </div>
      `;

      // buttons
      box.querySelectorAll("[data-inc]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          const id = btn.getAttribute("data-inc");
          const cart = getCart();
          cart[id] = Math.min(99,(cart[id]||0)+1);
          setCart(cart);
          draw();
        });
      });

      box.querySelectorAll("[data-dec]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          const id = btn.getAttribute("data-dec");
          const cart = getCart();
          cart[id] = Math.max(1,(cart[id]||1)-1);
          setCart(cart);
          draw();
        });
      });

      box.querySelectorAll("[data-rm]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          const id = btn.getAttribute("data-rm");
          const cart = getCart();
          delete cart[id];
          setCart(cart);
          draw();
        });
      });

      updateHeaderCartCount();
      applyI18n();
    };

    draw();
  };

  /* ===== Checkout ===== */
  const wireCheckout = () => {
    const form = document.querySelector("#checkoutForm");
    if(!form) return;

    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      // Тут потом подключишь реальный заказ/бота.
      // Сейчас просто чистим корзину и кидаем на success.
      setCart({});
      updateHeaderCartCount();
      window.location.href = "success.html";
    });
  };

  /* ===== Init ===== */
  const init = () => {
    wireLangButtons();
    applyI18n();
    updateHeaderCartCount();

    renderCatalog();
    renderCart();
    wireCheckout();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
