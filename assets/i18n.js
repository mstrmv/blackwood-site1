window.I18N = {
  uk: {
    nav_home: "Головна",
    nav_catalog: "Каталог",
    nav_shipping: "Доставка",
    nav_about: "Про нас",
    nav_contacts: "Контакти",
    cart: "Кошик",

    hero_badge: "Преміум вугілля для гриля",
    hero_title: "PREMIUM HARDWOOD\nCHARCOAL",
    hero_text: "Довге горіння, мінімум попелу, чистий жар.\nІдеально для BBQ та гриля.",
    hero_catalog: "Відкрити каталог",
    hero_shipping: "Доставка і оплата",
    hero_cart: "Кошик",

    catalog_title: "Товари",
    catalog_sub: "Оберіть вагу та додайте в кошик.",
    add_to_cart: "В кошик",

    p_core_3: "CORE • 3 KG",
    p_core_5: "CORE • 5 KG",
    p_core_10: "CORE • 10 KG",
    w_3: "3 kg",
    w_5: "5 kg",
    w_10: "10 kg",

    shipping_title: "Доставка та оплата",
    shipping_text: "Доставляємо по Україні Новою Поштою. Після оформлення замовлення ми зв’яжемося з вами для підтвердження та відправки.",

    about_title: "Про нас",
    about_text: "BLACKWOOD — преміальний деревний вуголь для гриля та BBQ. Ми робимо акцент на чистому жарі, стабільному горінні та мінімумі попелу. Наша мета — щоб кожне приготування було простим і смачним.",

    contacts_title: "Контакти",
    contacts_text: "Напишіть нам у соцмережі або на email — відповімо швидко.",

    cart_title: "Кошик",
    cart_empty: "Кошик порожній",
    cart_empty_hint: "Додайте товари з каталогу.",
    go_catalog: "Відкрити каталог",
    remove: "Видалити",
    total: "Разом",
    total_hint: "Сума товарів у кошику",
    checkout: "Оформити",
    clear_cart: "Очистити",
  },

  ru: {
    nav_home: "Главная",
    nav_catalog: "Каталог",
    nav_shipping: "Доставка",
    nav_about: "О нас",
    nav_contacts: "Контакты",
    cart: "Корзина",

    hero_badge: "Премиум уголь для гриля",
    hero_title: "PREMIUM HARDWOOD\nCHARCOAL",
    hero_text: "Долгое горение, минимум пепла, чистый жар.\nИдеально для BBQ и гриля.",
    hero_catalog: "Открыть каталог",
    hero_shipping: "Доставка и оплата",
    hero_cart: "Корзина",

    catalog_title: "Товары",
    catalog_sub: "Выберите вес и добавьте в корзину.",
    add_to_cart: "В корзину",

    p_core_3: "CORE • 3 KG",
    p_core_5: "CORE • 5 KG",
    p_core_10: "CORE • 10 KG",
    w_3: "3 kg",
    w_5: "5 kg",
    w_10: "10 kg",

    shipping_title: "Доставка и оплата",
    shipping_text: "Доставляем по Украине Новой Почтой. После оформления заказа мы свяжемся с вами для подтверждения и отправки.",

    about_title: "О нас",
    about_text: "BLACKWOOD — премиальный древесный уголь для гриля и BBQ. Мы делаем упор на чистый жар, стабильное горение и минимум пепла. Наша цель — чтобы каждая готовка была простой и вкусной.",

    contacts_title: "Контакты",
    contacts_text: "Напишите нам в соцсети или на email — ответим быстро.",

    cart_title: "Корзина",
    cart_empty: "Корзина пуста",
    cart_empty_hint: "Добавьте товары из каталога.",
    go_catalog: "Открыть каталог",
    remove: "Удалить",
    total: "Итого",
    total_hint: "Сумма товаров в корзине",
    checkout: "Оформить",
    clear_cart: "Очистить",
  },

  en: {
    nav_home: "Home",
    nav_catalog: "Catalog",
    nav_shipping: "Shipping",
    nav_about: "About",
    nav_contacts: "Contacts",
    cart: "Cart",

    hero_badge: "Premium charcoal for grill",
    hero_title: "PREMIUM HARDWOOD\nCHARCOAL",
    hero_text: "Long burn, low ash, clean heat.\nPerfect for BBQ & grill.",
    hero_catalog: "Open catalog",
    hero_shipping: "Shipping & payment",
    hero_cart: "Cart",

    catalog_title: "Products",
    catalog_sub: "Pick weight and add to cart.",
    add_to_cart: "Add to cart",

    p_core_3: "CORE • 3 KG",
    p_core_5: "CORE • 5 KG",
    p_core_10: "CORE • 10 KG",
    w_3: "3 kg",
    w_5: "5 kg",
    w_10: "10 kg",

    shipping_title: "Shipping & payment",
    shipping_text: "We ship across Ukraine via Nova Poshta. After checkout we will contact you to confirm and dispatch the order.",

    about_title: "About",
    about_text: "BLACKWOOD is premium hardwood charcoal for grill & BBQ. We focus on clean heat, stable burn and low ash — so every cook is easy and tasty.",

    contacts_title: "Contacts",
    contacts_text: "Message us via social media or email — we reply fast.",

    cart_title: "Cart",
    cart_empty: "Your cart is empty",
    cart_empty_hint: "Add products from the catalog.",
    go_catalog: "Open catalog",
    remove: "Remove",
    total: "Total",
    total_hint: "Sum of items in cart",
    checkout: "Checkout",
    clear_cart: "Clear",
  }
};

window.applyI18n = function(lang){
  const dict = window.I18N?.[lang] || window.I18N.uk;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
};
