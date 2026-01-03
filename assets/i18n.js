(() => {
  const DICT = {
    uk: {
      nav_home: "Головна",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "Про нас",
      nav_contacts: "Контакти",
      nav_cart: "Кошик",

      hero_kicker: "Преміум деревне вугілля",
      hero_title: "BLACKWOOD • CHARCOAL",
      hero_text: "Чисте горіння, стабільна температура та мінімум диму. Ідеально для гриля, ресторанів та домашнього барбекю.",
      hero_cta_catalog: "Перейти в каталог",
      hero_cta_shipping: "Доставка та оплата",

      b1_title: "Чисте горіння",
      b1_text: "Мінімум іскор і попелу — більше тепла та смаку.",
      b2_title: "Стабільна якість",
      b2_text: "Рівномірна фракція, контрольована вологість.",
      b3_title: "Швидка доставка",
      b3_text: "Відправка по Україні. Самовивіз — за домовленістю.",

      section_popular: "Популярні товари",
      section_catalog: "Каталог",
      section_cart: "Ваш кошик",
      section_checkout: "Оформлення замовлення",

      search_placeholder: "Пошук товарів…",
      add_to_cart: "Додати в кошик",
      in_cart: "У кошику",
      weight: "Вага",
      grade: "Клас",

      cart_empty: "Кошик порожній. Перейдіть у каталог та додайте товари.",
      cart_product: "Товар",
      cart_qty: "К-сть",
      cart_price: "Ціна",
      cart_sum: "Сума",
      cart_total: "Разом",
      cart_clear: "Очистити",
      cart_to_checkout: "Оформити",

      checkout_name: "Ім’я",
      checkout_phone: "Телефон",
      checkout_city: "Місто",
      checkout_address: "Адреса/Відділення",
      checkout_comment: "Коментар",
      checkout_pay: "Спосіб оплати",
      checkout_pay_cash: "Післяплата / готівка",
      checkout_pay_card: "Картка (узгодимо)",
      checkout_submit: "Підтвердити замовлення",

      shipping_title: "Доставка та оплата",
      shipping_text: "Відправляємо по Україні. Точну вартість доставки та терміни уточнюємо під час підтвердження замовлення.",
      shipping_points_1: "Нова пошта / інші служби — за домовленістю",
      shipping_points_2: "Оплата: післяплата або картка",
      shipping_points_3: "Оптові замовлення — індивідуальні умови",

      about_title: "Про нас",
      about_text: "BLACKWOOD • CHARCOAL — це якісне деревне вугілля для гриля та професійних кухонь. Ми робимо ставку на стабільну якість, акуратну упаковку та швидку комунікацію.",

      contacts_title: "Контакти",
      contacts_text: "Напишіть нам у соцмережі або залиште заявку — відповімо швидко.",
      contacts_form_name: "Ваше ім’я",
      contacts_form_phone: "Телефон/месенджер",
      contacts_form_msg: "Повідомлення",
      contacts_send: "Надіслати (збережеться локально)",

      success_title: "Замовлення створено",
      success_text: "Дякуємо! Дані збережено. Ми зв’яжемося з вами для підтвердження.",
      back_home: "На головну",
      back_catalog: "До каталогу",

      uah: "₴"
    },

    ru: {
      nav_home: "Главная",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "О нас",
      nav_contacts: "Контакты",
      nav_cart: "Корзина",

      hero_kicker: "Премиум древесный уголь",
      hero_title: "BLACKWOOD • CHARCOAL",
      hero_text: "Чистое горение, стабильная температура и минимум дыма. Идеально для гриля, ресторанов и домашнего барбекю.",
      hero_cta_catalog: "Перейти в каталог",
      hero_cta_shipping: "Доставка и оплата",

      b1_title: "Чистое горение",
      b1_text: "Минимум искр и золы — больше тепла и вкуса.",
      b2_title: "Стабильное качество",
      b2_text: "Равномерная фракция, контролируемая влажность.",
      b3_title: "Быстрая доставка",
      b3_text: "Отправка по Украине. Самовывоз — по договоренности.",

      section_popular: "Популярные товары",
      section_catalog: "Каталог",
      section_cart: "Ваша корзина",
      section_checkout: "Оформление заказа",

      search_placeholder: "Поиск товаров…",
      add_to_cart: "В корзину",
      in_cart: "В корзине",
      weight: "Вес",
      grade: "Класс",

      cart_empty: "Корзина пустая. Перейдите в каталог и добавьте товары.",
      cart_product: "Товар",
      cart_qty: "Кол-во",
      cart_price: "Цена",
      cart_sum: "Сумма",
      cart_total: "Итого",
      cart_clear: "Очистить",
      cart_to_checkout: "Оформить",

      checkout_name: "Имя",
      checkout_phone: "Телефон",
      checkout_city: "Город",
      checkout_address: "Адрес/Отделение",
      checkout_comment: "Комментарий",
      checkout_pay: "Способ оплаты",
      checkout_pay_cash: "Наложка / наличные",
      checkout_pay_card: "Карта (согласуем)",
      checkout_submit: "Подтвердить заказ",

      shipping_title: "Доставка и оплата",
      shipping_text: "Отправляем по Украине. Точную стоимость доставки и сроки уточняем при подтверждении заказа.",
      shipping_points_1: "Новая почта / другие службы — по договоренности",
      shipping_points_2: "Оплата: наложка или карта",
      shipping_points_3: "Опт — индивидуальные условия",

      about_title: "О нас",
      about_text: "BLACKWOOD • CHARCOAL — качественный древесный уголь для гриля и профессиональных кухонь. Мы делаем ставку на стабильное качество, аккуратную упаковку и быструю коммуникацию.",

      contacts_title: "Контакты",
      contacts_text: "Напишите нам в соцсети или оставьте заявку — ответим быстро.",
      contacts_form_name: "Ваше имя",
      contacts_form_phone: "Телефон/мессенджер",
      contacts_form_msg: "Сообщение",
      contacts_send: "Отправить (сохранится локально)",

      success_title: "Заказ создан",
      success_text: "Спасибо! Данные сохранены. Мы свяжемся с вами для подтверждения.",
      back_home: "На главную",
      back_catalog: "В каталог",

      uah: "₴"
    },

    en: {
      nav_home: "Home",
      nav_catalog: "Catalog",
      nav_shipping: "Shipping",
      nav_about: "About",
      nav_contacts: "Contacts",
      nav_cart: "Cart",

      hero_kicker: "Premium charcoal",
      hero_title: "BLACKWOOD • CHARCOAL",
      hero_text: "Clean burn, stable heat, minimal smoke. Great for grills, restaurants and home BBQ.",
      hero_cta_catalog: "Open catalog",
      hero_cta_shipping: "Shipping & payment",

      b1_title: "Clean burn",
      b1_text: "Less sparks and ash — more heat and flavor.",
      b2_title: "Stable quality",
      b2_text: "Even pieces, controlled moisture.",
      b3_title: "Fast delivery",
      b3_text: "Shipping across Ukraine. Pickup by arrangement.",

      section_popular: "Popular products",
      section_catalog: "Catalog",
      section_cart: "Your cart",
      section_checkout: "Checkout",

      search_placeholder: "Search products…",
      add_to_cart: "Add to cart",
      in_cart: "In cart",
      weight: "Weight",
      grade: "Grade",

      cart_empty: "Your cart is empty. Go to the catalog and add items.",
      cart_product: "Product",
      cart_qty: "Qty",
      cart_price: "Price",
      cart_sum: "Sum",
      cart_total: "Total",
      cart_clear: "Clear",
      cart_to_checkout: "Checkout",

      checkout_name: "Name",
      checkout_phone: "Phone",
      checkout_city: "City",
      checkout_address: "Address/Branch",
      checkout_comment: "Comment",
      checkout_pay: "Payment",
      checkout_pay_cash: "Cash on delivery",
      checkout_pay_card: "Card (we'll confirm)",
      checkout_submit: "Place order",

      shipping_title: "Shipping & payment",
      shipping_text: "We ship across Ukraine. Exact delivery cost and ETA are confirmed during order confirmation.",
      shipping_points_1: "Nova Poshta / other carriers — by arrangement",
      shipping_points_2: "Payment: COD or card",
      shipping_points_3: "Wholesale — custom terms",

      about_title: "About",
      about_text: "BLACKWOOD • CHARCOAL provides quality charcoal for grills and professional kitchens. We focus on consistent quality, neat packaging, and fast communication.",

      contacts_title: "Contacts",
      contacts_text: "Message us on social media or leave a request — we'll reply quickly.",
      contacts_form_name: "Your name",
      contacts_form_phone: "Phone/messenger",
      contacts_form_msg: "Message",
      contacts_send: "Send (saved locally)",

      success_title: "Order created",
      success_text: "Thank you! Your data is saved. We'll contact you to confirm.",
      back_home: "Back home",
      back_catalog: "Back to catalog",

      uah: "₴"
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

    // active nav link
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
