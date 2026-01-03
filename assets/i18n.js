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

      uah: "₴"
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

      uah: "₴"
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
