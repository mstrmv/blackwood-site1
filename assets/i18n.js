/* assets/i18n.js */
(function(){
  const I18N = {
    uk: {
      nav_home: "Головна",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "Про нас",
      nav_contacts: "Контакти",
      nav_cart: "Кошик",

      cta_catalog: "Перейти в каталог",
      cta_shipping: "Умови доставки",
      hero_title: "BLACKWOOD • CHARCOAL",
      hero_sub: "Преміальний деревний вугілля для гриля та мангалу. CORE лінійка (3/5/10 кг) + товари для BBQ.",
      pill_1: "Швидкий розпал",
      pill_2: "Стабільне тепло",
      pill_3: "Мінімум попелу",
      pill_4: "Для HoReCa та дому",

      home_b1_t: "CORE лінійка",
      home_b1_d: "Пакування 3 / 5 / 10 кг (PNG), ідеально для швидких замовлень.",
      home_b2_t: "18 товарів у каталозі",
      home_b2_d: "Категорії, пошук, додавання в кошик — все працює на GitHub Pages.",
      home_b3_t: "Швидке оформлення",
      home_b3_d: "Форма замовлення + сторінка успіху (success).",

      catalog_title: "Каталог",
      catalog_sub: "Оберіть товари, додайте в кошик та оформіть замовлення.",
      search_ph: "Пошук товару…",
      category_all: "Усі категорії",
      sort_label: "Сортування",
      sort_pop: "За популярністю",
      sort_price_asc: "Ціна: зростання",
      sort_price_desc: "Ціна: спадання",
      sort_name: "Назва: A→Z",
      add_to_cart: "Додати",
      in_cart: "У кошику",
      empty_catalog: "Нічого не знайдено. Спробуйте інший запит або категорію.",

      cart_title: "Кошик",
      cart_sub: "Перевірте товари та кількість перед оформленням.",
      cart_empty: "Кошик порожній. Перейдіть у каталог та додайте товари.",
      cart_clear: "Очистити кошик",
      cart_checkout: "Оформити",
      cart_continue: "Продовжити покупки",
      cart_th_item: "Товар",
      cart_th_price: "Ціна",
      cart_th_qty: "К-сть",
      cart_th_sum: "Сума",
      cart_th_remove: "Видалити",
      total_label: "Разом",
      currency: "₴",

      shipping_title: "Доставка",
      shipping_sub: "Умови та способи доставки.",
      shipping_p1: "Доставка по Україні. Вартість і терміни залежать від служби доставки та міста.",
      shipping_p2: "Після оформлення замовлення ми зв'яжемося з вами для підтвердження та уточнення деталей.",
      shipping_p3: "Можливі способи: самовивіз (за домовленістю), поштові служби, кур'єр (за наявності).",

      about_title: "Про нас",
      about_sub: "Коротко про BLACKWOOD • CHARCOAL.",
      about_p1: "BLACKWOOD • CHARCOAL — про стабільну якість деревного вугілля та зручний сервіс.",
      about_p2: "Ми збираємо лінійку CORE та товари для BBQ, щоб ви отримували прогнозований результат на грилі.",
      about_p3: "Працюємо з роздрібними та оптовими замовленнями.",

      contacts_title: "Контакти",
      contacts_sub: "Напишіть нам у зручній соцмережі.",
      contacts_p1: "Telegram / Instagram / TikTok — іконки у шапці. Також можете залишити коментар при оформленні замовлення.",

      checkout_title: "Оформлення",
      checkout_sub: "Заповніть форму, ми зв'яжемося для підтвердження.",
      f_name: "Ім'я",
      f_phone: "Телефон",
      f_city: "Місто",
      f_address: "Адреса",
      f_comment: "Коментар",
      f_pay: "Оплата",
      pay_cash: "Готівка / при отриманні",
      pay_card: "Картка / переказ",
      pay_online: "Онлайн (узгодження)",
      place_order: "Підтвердити замовлення",
      must_cart: "Кошик порожній. Додайте товари перед оформленням.",

      success_title: "Замовлення прийнято",
      success_sub: "Дякуємо! Ми отримали заявку та скоро зв'яжемося з вами.",
      success_btn: "Повернутися на головну",

      toast_added: "Додано в кошик",
      toast_removed: "Видалено",
      toast_cleared: "Кошик очищено"
    },

    ru: {
      nav_home: "Главная",
      nav_catalog: "Каталог",
      nav_shipping: "Доставка",
      nav_about: "О нас",
      nav_contacts: "Контакты",
      nav_cart: "Корзина",

      cta_catalog: "Перейти в каталог",
      cta_shipping: "Условия доставки",
      hero_title: "BLACKWOOD • CHARCOAL",
      hero_sub: "Премиальный древесный уголь для гриля и мангала. Линейка CORE (3/5/10 кг) + товары для BBQ.",
      pill_1: "Быстрый розжиг",
      pill_2: "Стабильный жар",
      pill_3: "Минимум золы",
      pill_4: "Для HoReCa и дома",

      home_b1_t: "Линейка CORE",
      home_b1_d: "Упаковки 3 / 5 / 10 кг (PNG) — удобно и быстро.",
      home_b2_t: "18 товаров в каталоге",
      home_b2_d: "Категории, поиск, добавление в корзину — всё работает на GitHub Pages.",
      home_b3_t: "Быстрое оформление",
      home_b3_d: "Форма заказа + страница успеха (success).",

      catalog_title: "Каталог",
      catalog_sub: "Выберите товары, добавьте в корзину и оформите заказ.",
      search_ph: "Поиск товара…",
      category_all: "Все категории",
      sort_label: "Сортировка",
      sort_pop: "По популярности",
      sort_price_asc: "Цена: по возрастанию",
      sort_price_desc: "Цена: по убыванию",
      sort_name: "Название: A→Z",
      add_to_cart: "Добавить",
      in_cart: "В корзине",
      empty_catalog: "Ничего не найдено. Попробуйте другой запрос или категорию.",

      cart_title: "Корзина",
      cart_sub: "Проверьте товары и количество перед оформлением.",
      cart_empty: "Корзина пуста. Перейдите в каталог и добавьте товары.",
      cart_clear: "Очистить корзину",
      cart_checkout: "Оформить",
      cart_continue: "Продолжить покупки",
      cart_th_item: "Товар",
      cart_th_price: "Цена",
      cart_th_qty: "Кол-во",
      cart_th_sum: "Сумма",
      cart_th_remove: "Удалить",
      total_label: "Итого",
      currency: "₴",

      shipping_title: "Доставка",
      shipping_sub: "Условия и способы доставки.",
      shipping_p1: "Доставка по Украине. Стоимость и сроки зависят от службы доставки и города.",
      shipping_p2: "После оформления заказа мы свяжемся с вами для подтверждения и уточнения деталей.",
      shipping_p3: "Возможные способы: самовывоз (по договоренности), почтовые службы, курьер (при наличии).",

      about_title: "О нас",
      about_sub: "Коротко про BLACKWOOD • CHARCOAL.",
      about_p1: "BLACKWOOD • CHARCOAL — про стабильное качество древесного угля и удобный сервис.",
      about_p2: "Мы собираем линейку CORE и товары для BBQ, чтобы вы получали предсказуемый результат на гриле.",
      about_p3: "Работаем с розничными и оптовыми заказами.",

      contacts_title: "Контакты",
      contacts_sub: "Напишите нам в удобной соцсети.",
      contacts_p1: "Telegram / Instagram / TikTok — иконки в шапке. Также можно оставить комментарий при оформлении заказа.",

      checkout_title: "Оформление",
      checkout_sub: "Заполните форму, мы свяжемся для подтверждения.",
      f_name: "Имя",
      f_phone: "Телефон",
      f_city: "Город",
      f_address: "Адрес",
      f_comment: "Комментарий",
      f_pay: "Оплата",
      pay_cash: "Наличные / при получении",
      pay_card: "Карта / перевод",
      pay_online: "Онлайн (согласование)",
      place_order: "Подтвердить заказ",
      must_cart: "Корзина пуста. Добавьте товары перед оформлением.",

      success_title: "Заказ принят",
      success_sub: "Спасибо! Мы получили заявку и скоро свяжемся с вами.",
      success_btn: "Вернуться на главную",

      toast_added: "Добавлено в корзину",
      toast_removed: "Удалено",
      toast_cleared: "Корзина очищена"
    },

    en: {
      nav_home: "Home",
      nav_catalog: "Catalog",
      nav_shipping: "Shipping",
      nav_about: "About",
      nav_contacts: "Contacts",
      nav_cart: "Cart",

      cta_catalog: "Open catalog",
      cta_shipping: "Shipping info",
      hero_title: "BLACKWOOD • CHARCOAL",
      hero_sub: "Premium charcoal for grill & BBQ. CORE line (3/5/10 kg) + BBQ essentials.",
      pill_1: "Fast ignition",
      pill_2: "Stable heat",
      pill_3: "Low ash",
      pill_4: "Home & HoReCa",

      home_b1_t: "CORE line",
      home_b1_d: "3 / 5 / 10 kg packs (PNG) — quick and convenient.",
      home_b2_t: "18 products in catalog",
      home_b2_d: "Categories, search, add to cart — works on GitHub Pages.",
      home_b3_t: "Fast checkout",
      home_b3_d: "Order form + success page.",

      catalog_title: "Catalog",
      catalog_sub: "Pick items, add to cart and checkout.",
      search_ph: "Search products…",
      category_all: "All categories",
      sort_label: "Sorting",
      sort_pop: "By popularity",
      sort_price_asc: "Price: low to high",
      sort_price_desc: "Price: high to low",
      sort_name: "Name: A→Z",
      add_to_cart: "Add",
      in_cart: "In cart",
      empty_catalog: "Nothing found. Try another query or category.",

      cart_title: "Cart",
      cart_sub: "Review items and quantities before checkout.",
      cart_empty: "Your cart is empty. Go to catalog and add items.",
      cart_clear: "Clear cart",
      cart_checkout: "Checkout",
      cart_continue: "Continue shopping",
      cart_th_item: "Item",
      cart_th_price: "Price",
      cart_th_qty: "Qty",
      cart_th_sum: "Sum",
      cart_th_remove: "Remove",
      total_label: "Total",
      currency: "₴",

      shipping_title: "Shipping",
      shipping_sub: "Delivery options and terms.",
      shipping_p1: "Shipping across Ukraine. Cost and timing depend on carrier and city.",
      shipping_p2: "After placing an order we will contact you to confirm details.",
      shipping_p3: "Options: pickup (by arrangement), postal services, courier (if available).",

      about_title: "About",
      about_sub: "About BLACKWOOD • CHARCOAL.",
      about_p1: "BLACKWOOD • CHARCOAL is about stable charcoal quality and a smooth buying experience.",
      about_p2: "We offer the CORE line and BBQ essentials to keep your grill results consistent.",
      about_p3: "Retail and wholesale orders are welcome.",

      contacts_title: "Contacts",
      contacts_sub: "Message us via social networks.",
      contacts_p1: "Telegram / Instagram / TikTok icons are in the header. You can also leave a comment during checkout.",

      checkout_title: "Checkout",
      checkout_sub: "Fill in the form and we’ll confirm your order.",
      f_name: "Name",
      f_phone: "Phone",
      f_city: "City",
      f_address: "Address",
      f_comment: "Comment",
      f_pay: "Payment",
      pay_cash: "Cash on delivery",
      pay_card: "Card / transfer",
      pay_online: "Online (arranged)",
      place_order: "Place order",
      must_cart: "Cart is empty. Add products before checkout.",

      success_title: "Order received",
      success_sub: "Thank you! We’ve received your request and will contact you soon.",
      success_btn: "Back to home",

      toast_added: "Added to cart",
      toast_removed: "Removed",
      toast_cleared: "Cart cleared"
    }
  };

  function getLang(){
    const saved = localStorage.getItem("bw_lang");
    if(saved && I18N[saved]) return saved;
    return "uk";
  }

  function setLang(lang){
    if(!I18N[lang]) lang = "uk";
    localStorage.setItem("bw_lang", lang);
    applyI18n();
  }

  function t(key){
    const lang = getLang();
    return (I18N[lang] && I18N[lang][key]) || key;
  }

  function applyI18n(){
    const lang = getLang();

    document.documentElement.lang = (lang === "uk" ? "uk" : lang);

    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
      const key = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll(".lang button[data-lang]").forEach(btn=>{
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // update dynamic UI if app.js exposes hooks
    if(window.BW && typeof window.BW.onLangChanged === "function"){
      window.BW.onLangChanged(lang);
    }
  }

  window.BW_I18N = { I18N, getLang, setLang, t, applyI18n };

  document.addEventListener("click", (e)=>{
    const btn = e.target.closest(".lang button[data-lang]");
    if(!btn) return;
    e.preventDefault();
    setLang(btn.getAttribute("data-lang"));
  });

  document.addEventListener("DOMContentLoaded", applyI18n);
})();
