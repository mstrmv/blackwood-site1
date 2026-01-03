/* ===== FILE: assets/app.js ===== */
(() => {
  const CART_KEY = "bw_cart_v1";

  const EXT_TRIES = [
    (src) => src,
    (src) => src.replace(/\.jpg$/i, ".JPG"),
    (src) => src.replace(/\.JPG$/i, ".jpg"),
    (src) => src.replace(/\.jpeg$/i, ".JPEG"),
    (src) => src.replace(/\.JPEG$/i, ".jpeg"),
    (src) => src.replace(/\.png$/i, ".PNG"),
    (src) => src.replace(/\.PNG$/i, ".png"),
    (src) => src.replace(/\.jpg$/i, ".png"),
    (src) => src.replace(/\.png$/i, ".jpg"),
    (src) => "img/core-10kg.png"
  ];

  function onImgError(img){
    try{
      const tried = Number(img.getAttribute("data-try") || "0");
      const next = tried + 1;
      img.setAttribute("data-try", String(next));
      const base = img.getAttribute("data-src") || img.src || "";
      const clean = base.split("?")[0];

      const fn = EXT_TRIES[next] || null;
      if (!fn){
        img.style.opacity = ".35";
        img.style.filter = "grayscale(1)";
        return;
      }
      img.src = fn(clean) + "?v=" + next;
    }catch(_){
      img.style.opacity = ".35";
      img.style.filter = "grayscale(1)";
    }
  }

  window.BW_IMG = { onError: onImgError };

  function loadCart(){
    try{
      const raw = localStorage.getItem(CART_KEY);
      const obj = raw ? JSON.parse(raw) : {};
      if (obj && typeof obj === "object") return obj;
      return {};
    }catch(_){ return {}; }
  }

  function cartCount(){
    const cart = loadCart();
    return Object.values(cart).reduce((a,b)=>a + (Number(b)||0), 0);
  }

  function renderCartBadge(){
    const count = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      el.textContent = String(count);
      el.style.display = count > 0 ? "inline-block" : "none";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCartBadge();
  });
})();
