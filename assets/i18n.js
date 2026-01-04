// assets/i18n.js
(() => {
  const LANG_KEY = "bw_lang";
  const supported = ["uk", "ru", "en"];

  const dict = {
    uk: {
      nav_home: "Головна",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "Про нас",
      nav_contacts: "Контакти",
      nav_cart: "Кошик",
      buy_now: "Купити",
      hero_kicker: "Преміальний вуголь для гриля",
      hero_title_1: "PREMIUM",
      hero_title_2: "HARDWOOD CHARCOAL",
      hero_lead: "Довге горіння, мінімум попелу, чистий жар. Ідеально для BBQ та гриля.",
      hero_cta_catalog: "Відкрити каталог",
      hero_cta_shipping: "Доставка та оплата",
      why_title: "Чому BLACKWOOD",
      why_hint: "Стабільна якість для BBQ та гриля",
      why_1_t: "Довге горіння",
      why_1_p: "Стабільне тепло та контроль жару.",
      why_2_t: "Низька зольність",
      why_2_p: "Менше попелу — чистіше приготування.",
      why_3_t: "Для BBQ та гриля",
      why_3_p: "Підходить для м'яса, овочів і копчення.",
      catalog_title: "Каталог",
      catalog_hint: "18 товарів • CORE / YARD / Сітки та аксесуари",
      search_ph: "Пошук товару…",
      category_all: "Усі",
      category_core: "CORE вугілля",
      category_yard: "YARD вугілля",
      category_sets: "Сітки / Сети / Аксесуари",
      add_to_cart: "Додати в кошик",
      added_to_cart: "Додано в кошик",
      in_cart: "В кошику",
      empty_catalog: "Нічого не знайдено.",
      shipping_title: "Доставка",
      shipping_text: "Відправка по Україні. Опрацювання замовлення — щодня. Термін доставки зазвичай 1–3 дні (залежить від перевізника). Оплата: картка / готівка / післяплата (за домовленістю).",
      about_title: "Про нас",
      about_text: "BLACKWOOD • CHARCOAL — преміальний деревний вуголь для гриля та BBQ. Лінійки CORE і YARD, а також аксесуари: сітки, рукавички, щипці та набори для старту.",
      contacts_title: "Контакти",
      contacts_text: "Напишіть нам у соцмережах або залиште заявку. Ми відповімо якнайшвидше.",
      contact_name: "Ім'я",
      contact_phone: "Телефон",
      contact_msg: "Повідомлення",
      send: "Надіслати",
      cart_title: "Кошик",
      cart_hint: "Керуйте кількістю та оформлюйте замовлення",
      cart_empty: "Кошик порожній.",
      product: "Товар",
      price: "Ціна",
      qty: "К-сть",
      total: "Разом",
      clear_cart: "Очистити кошик",
      go_checkout: "Оформити",
      checkout_title: "Оформлення",
      checkout_hint: "Заповніть дані — і ми підтвердимо замовлення",
      f_name: "Ім'я",
      f_phone: "Телефон",
      f_city: "Місто",
      f_address: "Адреса",
      f_comment: "Коментар",
      f_payment: "Оплата",
      pay_card: "Картка",
      pay_cash: "Готівка",
      pay_cod: "Післяплата",
      place_order: "Підтвердити замовлення",
      success_title: "Замовлення прийнято",
      success_text: "Дякуємо! Ми зв'яжемося з вами найближчим часом для підтвердження.",
      back_home: "На головну",
      back_catalog: "Продовжити покупки",
      footer_left: "© BLACKWOOD • CHARCOAL",
      footer_right: "GitHub Pages • HTML/CSS/JS"
    },
    ru: {
      nav_home: "Главная",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "О нас",
      nav_contacts: "Контакты",
      nav_cart: "Корзина",
      buy_now: "Купить",
      hero_kicker: "Премиум уголь для гриля",
      hero_title_1: "PREMIUM",
      hero_title_2: "HARDWOOD CHARCOAL",
      hero_lead: "Длительное горение, минимум пепла, чистый жар. Идеально для BBQ и гриля.",
      hero_cta_catalog: "Открыть каталог",
      hero_cta_shipping: "Доставка и оплата",
      why_title: "Почему BLACKWOOD",
      why_hint: "Стабильное качество для BBQ и гриля",
      why_1_t: "Долгое горение",
      why_1_p: "Стабильное тепло и контроль жара.",
      why_2_t: "Низкая зольность",
      why_2_p: "Меньше золы — чище приготовление.",
      why_3_t: "Для BBQ и гриля",
      why_3_p: "Подходит для мяса, овощей и копчения.",
      catalog_title: "Каталог",
      catalog_hint: "18 товаров • CORE / YARD / Сетки и аксессуары",
      search_ph: "Поиск товара…",
      category_all: "Все",
      category_core: "CORE уголь",
      category_yard: "YARD уголь",
      category_sets: "Сетки / Сеты / Аксессуары",
      add_to_cart: "В корзину",
      added_to_cart: "Добавлено в корзину",
      in_cart: "В корзине",
      empty_catalog: "Ничего не найдено.",
      shipping_title: "Доставка",
      shipping_text: "Отправка по Украине. Обработка заказа — ежедневно. Срок доставки обычно 1–3 дня (зависит от перевозчика). Оплата: карта / наличные / наложенный платеж (по договоренности).",
      about_title: "О нас",
      about_text: "BLACKWOOD • CHARCOAL — премиальный древесный уголь для гриля и BBQ. Линейки CORE и YARD, а также аксессуары: сетки, перчатки, щипцы и стартовые наборы.",
      contacts_title: "Контакты",
      contacts_text: "Напишите нам в соцсетях или оставьте заявку. Мы ответим как можно быстрее.",
      contact_name: "Имя",
      contact_phone: "Телефон",
      contact_msg: "Сообщение",
      send: "Отправить",
      cart_title: "Корзина",
      cart_hint: "Управляйте количеством и оформляйте заказ",
      cart_empty: "Корзина пуста.",
      product: "Товар",
      price: "Цена",
      qty: "Кол-во",
      total: "Итого",
      clear_cart: "Очистить корзину",
      go_checkout: "Оформить",
      checkout_title: "Оформление",
      checkout_hint: "Заполните данные — и мы подтвердим заказ",
      f_name: "Имя",
      f_phone: "Телефон",
      f_city: "Город",
      f_address: "Адрес",
      f_comment: "Комментарий",
      f_payment: "Оплата",
      pay_card: "Карта",
      pay_cash: "Наличные",
      pay_cod: "Наложенный платеж",
      place_order: "Подтвердить заказ",
      success_title: "Заказ принят",
      success_text: "Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения.",
      back_home: "На главную",
      back_catalog: "Продолжить покупки",
      footer_left: "© BLACKWOOD • CHARCOAL",
      footer_right: "GitHub Pages • HTML/CSS/JS"
    },
    en: {
      nav_home: "Home",
      nav_catalog: "Catalog",
      nav_shipping: "Shipping",
      nav_about: "About",
      nav_contacts: "Contacts",
      nav_cart: "Cart",
      buy_now: "Buy",
      hero_kicker: "Premium charcoal for grill",
      hero_title_1: "PREMIUM",
      hero_title_2: "HARDWOOD CHARCOAL",
      hero_lead: "Long burn, minimal ash, clean heat. Perfect for BBQ & grill.",
      hero_cta_catalog: "Open catalog",
      hero_cta_shipping: "Shipping & payment",
      why_title: "Why BLACKWOOD",
      why_hint: "Consistent quality for BBQ & grill",
      why_1_t: "Long burn",
      why_1_p: "Stable heat and easy control.",
      why_2_t: "Low ash",
      why_2_p: "Less ash — cleaner cooking.",
      why_3_t: "For BBQ & grill",
      why_3_p: "Great for meat, veggies and smoking.",
      catalog_title: "Catalog",
      catalog_hint: "18 products • CORE / YARD / Mesh & accessories",
      search_ph: "Search products…",
      category_all: "All",
      category_core: "CORE charcoal",
      category_yard: "YARD charcoal",
      category_sets: "Mesh / Sets / Accessories",
      add_to_cart: "Add to cart",
      added_to_cart: "Added to cart",
      in_cart: "In cart",
      empty_catalog: "No results found.",
      shipping_title: "Shipping",
      shipping_text: "Delivery across Ukraine. Orders are processed daily. Typical delivery time is 1–3 days (carrier dependent). Payment: card / cash / COD (by arrangement).",
      about_title: "About",
      about_text: "BLACKWOOD • CHARCOAL is premium hardwood charcoal for grill and BBQ. CORE and YARD lines plus accessories: mesh bags, gloves, tongs and starter kits.",
      contacts_title: "Contacts",
      contacts_text: "Message us on social or leave a request. We’ll reply ASAP.",
      contact_name: "Name",
      contact_phone: "Phone",
      contact_msg: "Message",
      send: "Send",
      cart_title: "Cart",
      cart_hint: "Manage quantities and checkout",
      cart_empty: "Your cart is empty.",
      product: "Product",
      price: "Price",
      qty: "Qty",
      total: "Total",
      clear_cart: "Clear cart",
      go_checkout: "Checkout",
      checkout_title: "Checkout",
      checkout_hint: "Fill in details — we will confirm your order",
      f_name: "Name",
      f_phone: "Phone",
      f_city: "City",
      f_address: "Address",
      f_comment: "Comment",
      f_payment: "Payment",
      pay_card: "Card",
      pay_cash: "Cash",
      pay_cod: "COD",
      place_order: "Place order",
      success_title: "Order received",
      success_text: "Thank you! We’ll contact you shortly to confirm.",
      back_home: "Back home",
      back_catalog: "Continue shopping",
      footer_left: "© BLACKWOOD • CHARCOAL",
      footer_right: "GitHub Pages • HTML/CSS/JS"
    }
  };

  function getLang(){
    const fromStorage = (localStorage.getItem(LANG_KEY) || "").toLowerCase();
    if (supported.includes(fromStorage)) return fromStorage;
    return "uk";
  }

  function setLang(lang){
    const l = (lang || "").toLowerCase();
    if (!supported.includes(l)) return;
    localStorage.setItem(LANG_KEY, l);
    applyI18n();
  }

  function t(key){
    const lang = getLang();
    return (dict[lang] && dict[lang][key]) || (dict.uk && dict.uk[key]) || key;
  }

  function applyI18n(){
    const lang = getLang();
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll("[data-lang]").forEach(btn => {
      const l = btn.getAttribute("data-lang");
      btn.classList.toggle("active", l === lang);
      btn.setAttribute("aria-pressed", l === lang ? "true" : "false");
    });

    const titleEl = document.querySelector("title[data-i18n-title]");
    if (titleEl){
      const key = titleEl.getAttribute("data-i18n-title");
      titleEl.textContent = `${t(key)} • BLACKWOOD CHARCOAL`;
    }

    window.dispatchEvent(new CustomEvent("bw:lang", { detail: { lang } }));
  }

  window.BW_I18N = { getLang, setLang, t, applyI18n, dict };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    e.preventDefault();
    setLang(btn.getAttribute("data-lang"));
  });

  document.addEventListener("DOMContentLoaded", applyI18n);
})();
