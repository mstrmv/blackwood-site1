/* BLACKWOOD Mini App glue + cart helpers */

const tg = window.Telegram?.WebApp || null;
const IS_TG = !!tg;

// --- Cart storage ---
const CART_KEY = "bw_cart_v1";

function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}
function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function cartCount() {
  const cart = readCart();
  return cart.reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
}
function cartTotalUAH() {
  const cart = readCart();
  return cart.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
}

function updateCartBadges() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = String(cartCount());
}

// --- Telegram behavior ---
function initTelegram() {
  if (!IS_TG) return;

  tg.ready();
  tg.expand();

  // цвета можно не трогать, но если хочешь:
  // tg.setHeaderColor("#0b0b0c");
  // tg.setBackgroundColor("#0b0b0c");

  // Если есть товары — показываем MainButton внизу
  const count = cartCount();
  if (count > 0) {
    tg.MainButton.setText(`Оформить • ${cartTotalUAH()} грн`);
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      window.location.href = "./checkout.html";
    });
  } else {
    tg.MainButton.hide();
  }
}

// --- Public API (чтобы catalog/cart могли вызывать) ---
window.BW = {
  readCart,
  writeCart,
  cartCount,
  cartTotalUAH,
  updateCartBadges,
  IS_TG,
  tg,
};

// --- Boot ---
document.addEventListener("DOMContentLoaded", () => {
  // добавим класс на body чтобы CSS понимал что это телега
  if (IS_TG) document.body.classList.add("is-telegram");

  updateCartBadges();
  initTelegram();
});
