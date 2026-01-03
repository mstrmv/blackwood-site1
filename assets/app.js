/* ОБЩИЕ НАСТРОЙКИ */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
  color: #fff;
  background: #000;
}

/* =========================
   ГЛАВНАЯ СТРАНИЦА
   ========================= */
.page-home {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at center, rgba(0,0,0,.3), rgba(0,0,0,.85)),
    url("./img/hero-bg.png") center / cover no-repeat fixed;
}

/* =========================
   ВСЕ ВНУТРЕННИЕ СТРАНИЦЫ
   ========================= */
.page-inner {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at center, rgba(0,0,0,.4), rgba(0,0,0,.9)),
    url("./img/catalog-bg.png") center / cover no-repeat fixed;
}

/* =========================
   КАТАЛОГ
   ========================= */
.catalog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 80px;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}

.product-card {
  background: rgba(0,0,0,.55);
  border-radius: 18px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.product-card img {
  width: 100%;
  border-radius: 14px;
  display: block;
}

.product-title {
  margin: 14px 0 6px;
  font-weight: 600;
}

.product-price {
  color: #c8a45a;
  font-weight: 600;
}
