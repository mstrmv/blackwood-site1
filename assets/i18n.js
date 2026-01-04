/* ===== FILE: assets/i18n.js ===== */
(() => {
  const DICT = {
    uk: {
      nav_home: "Головна",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "Про нас",
      nav_contacts: "Контакти",
      nav_cart: "Кошик",

      hero_kicker: "Преміум вугілля для гриля",
      hero_title: "PREMIUM HARDWOOD CHARCOAL",
      hero_text: "Довге горіння, мінімум попелу, чистий жар. Ідеально для BBQ і гриля.",
      hero_cta_catalog: "Відкрити каталог",
      hero_cta_shipping: "Доставка та оплата",
      hero_cta_cart: "Перейти в кошик",

      section_catalog: "Каталог",
      section_catalog_sub: "Оберіть товар і додайте в кошик.",
      search_placeholder: "Пошук товарів…",
      add_to_cart: "Додати в кошик",
      in_cart: "У кошику",
      weight: "Вага",
      kg: "кг",

      section_shipping: "Доставка та оплата",
      shipping_text: "Доставка по Україні. Відправка щодня. Оплата: карта / післяплата (за домовленістю).",
      section_about: "Про нас",
      about_text: "BLACKWOOD • CHARCOAL — преміальне тверде деревне вугілля для BBQ та професійної кухні.",
      section_contacts: "Контакти",
      contacts_text: "Напишіть нам у Telegram або Instagram — відповідаємо швидко.",
      section_cart: "Кошик",
      cart_empty: "Ваш кошик порожній.",
      cart_total: "Разом",
      cart_clear: "Очистити кошик",
      cart_checkout: "Оформити замовлення",

      section_checkout: "Оформлення",
      checkout_name: "Ім'я",
      checkout_phone: "Телефон",
      checkout_city: "Місто",
      checkout_address: "Адреса / Відділення",
      checkout_comment: "Коментар",
      checkout_pay: "Оплата",
      pay_card: "Карта",
      pay_cod: "Післяплата",
      place_order: "Підтвердити замовлення",

      success_title: "Замовлення прийнято!",
      success_text: "Дякуємо! Ми зв’яжемося з вами найближчим часом.",
      back_home: "Повернутися на головну",

      uah: "₴",
      col_item: "Товар",
      col_qty: "Кількість",
      col_price: "Ціна",
      col_sum: "Сума"
    },
    ru: {
      nav_home: "Главная",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "О нас",
      nav_contacts: "Контакты",
      nav_cart: "Корзина",

      hero_kicker: "Премиум уголь для гриля",
      hero_title: "PREMIUM HARDWOOD CHARCOAL",
      hero_text: "Долгое горение, минимум золы, чистый жар. Идеально для BBQ и гриля.",
      hero_cta_catalog: "Открыть каталог",
      hero_cta_shipping: "Доставка и оплата",
      hero_cta_cart: "Перейти в корзину",

      section_catalog: "Каталог",
      section_catalog_sub: "Выберите товар и добавьте в корзину.",
      search_placeholder: "Поиск товаров…",
      add_to_cart: "Добавить в корзину",
      in_cart: "В корзине",
      weight: "Вес",
      kg: "кг",

      section_shipping: "Доставка и оплата",
      shipping_text: "Доставка по Украине. Отправка ежедневно. Оплата: карта / наложка (по договоренности).",
      section_about: "О нас",
      about_text: "BLACKWOOD • CHARCOAL — премиальный древесный уголь для BBQ и профессиональной кухни.",
      section_contacts: "Контакты",
      contacts_text: "Пишите в Telegram или Instagram — отвечаем быстро.",
      section_cart: "Корзина",
      cart_empty: "Ваша корзина пуста.",
      cart_total: "Итого",
      cart_clear: "Очистить корзину",
      cart_checkout: "Оформить заказ",

      section_checkout: "Оформление",
      checkout_name: "Имя",
      checkout_phone: "Телефон",
      checkout_city: "Город",
      checkout_address: "Адрес / Отделение",
      checkout_comment: "Комментарий",
      checkout_pay: "Оплата",
      pay_card: "Карта",
      pay_cod: "Наложка",
      place_order: "Подтвердить заказ",

      success_title: "Заказ принят!",
      success_text: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      back_home: "Вернуться на главную",

      uah: "₴",
      col_item: "Товар",
      col_qty: "Кол-во",
      col_price: "Цена",
      col_sum: "Сумма"
    },
    en: {
      nav_home: "Home",
      nav_catalog: "Catalog",
      nav_shipping: "Shipping",
      nav_about: "About",
      nav_contacts: "Contacts",
      nav_cart: "Cart",

      hero_kicker: "Premium charcoal for grill",
      hero_title: "PREMIUM HARDWOOD CHARCOAL",
      hero_text: "Long-lasting heat, low ash, clean burn. Perfect for BBQ & grill.",
      hero_cta_catalog: "Open catalog",
      hero_cta_shipping: "Shipping & payment",
      hero_cta_cart: "Go to cart",

      section_catalog: "Catalog",
      section_catalog_sub: "Choose products and add to cart.",
      search_placeholder: "Search products…",
      add_to_cart: "Add to cart",
      in_cart: "In cart",
      weight: "Weight",
      kg: "kg",

      section_shipping: "Shipping & payment",
      shipping_text: "Shipping across Ukraine. Daily dispatch. Payment: card / cash on delivery (by agreement).",
      section_about: "About",
      about_text: "BLACKWOOD • CHARCOAL — premium hardwood charcoal for BBQ and professional kitchens.",
      section_contacts: "Contacts",
      contacts_text: "Message us on Telegram or Instagram — fast replies.",
      section_cart: "Cart",
      cart_empty: "Your cart is empty.",
      cart_total: "Total",
      cart_clear: "Clear cart",
      cart_checkout: "Checkout",

      section_checkout: "Checkout",
      checkout_name: "Name",
      checkout_phone: "Phone",
      checkout_city: "City",
      checkout_address: "Address / Pickup point",
      checkout_comment: "Comment",
      checkout_pay: "Payment",
      pay_card: "Card",
      pay_cod: "Cash on delivery",
      place_order: "Place order",

      success_title: "Order received!",
      success_text: "Thank you! We’ll contact you shortly.",
      back_home: "Back to home",

      uah: "₴",
      col_item: "Item",
      col_qty: "Qty",
      col_price: "Price",
      col_sum: "Sum"
    }
  };

  const LANGS = ["uk","ru","en"];
  const STORAGE_KEY = "bw_lang";

  function getLang(){
    const saved = (localStorage.getItem(STORAGE_KEY) || "").toLowerCase();
    if (LANGS.includes(saved)) return saved;
    return "uk";
  }

  function setLang(lang){
    const v = (lang || "").toLowerCase();
    if (!LANGS.includes(v)) return;
    localStorage.setItem(STORAGE_KEY, v);
    applyI18n(v);
    window.dispatchEvent(new CustomEvent("bw:lang", { detail:{ lang:v }}));
  }

  function t(key, lang = getLang()){
    return (DICT[lang] && DICT[lang][key]) || (DICT.uk && DICT.uk[key]) || key;
  }

  function applyI18n(lang = getLang()){
    document.documentElement.lang = lang === "uk" ? "uk" : (lang === "ru" ? "ru" : "en");

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key, lang);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key, lang));
    });

    document.querySelectorAll(".lang [data-lang]").forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".navlinks a").forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      a.classList.toggle("active", href === path);
    });
  }

  window.BW_I18N = { getLang, setLang, t, applyI18n, DICT };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (btn && btn.closest(".lang")) {
      e.preventDefault();
      setLang(btn.getAttribute("data-lang"));
    }
  });

  document.addEventListener("DOMContentLoaded", () => applyI18n(getLang()));
})();
