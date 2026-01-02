(() => {
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

  const CART_KEY = "bw_cart_v1";

  // ДВА ВАРИАНТА ПУТЕЙ — чтобы точно работало на GitHub Pages
  const IMG = {
    core3: ["img/products/core-3kg.png", "./img/products/core-3kg.png"],
    core5: ["img/products/core-5kg.png", "./img/products/core-5kg.png"],
    core10:["img/products/core-10kg.png","./img/products/core-10kg.png"],
  };

  const products = [
    { id:"core-3",  title:"CORE • 3 KG",  weight:3,  group:"3-5", imgs: IMG.core3 },
    { id:"core-5",  title:"CORE • 5 KG",  weight:5,  group:"3-5", imgs: IMG.core5 },
    { id:"core-10", title:"CORE • 10 KG", weight:10, group:"10",  imgs: IMG.core10 }
  ];

  function readCart(){
    try{
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    }catch(e){ return {}; }
  }
  function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  function cartCount(cart){ return Object.values(cart).reduce((a,n)=>a+(Number(n)||0),0); }

  function setCartCountUI(){
    const el = $("#cartCount");
    if(el) el.textContent = String(cartCount(readCart()));
  }

  function setActiveNav(){
    const path = location.pathname.split("/").pop() || "index.html";
    $$(".nav__link").forEach(a => {
      const href = (a.getAttribute("href")||"").split("/").pop();
      a.classList.toggle("is-active", href === path);
    });
  }

  function initLangButtons(){
    const btns = $$(".lang__btn");
    btns.forEach(b => {
      b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("is-active"));
        b.classList.add("is-active");
      });
    });
  }

  // -------- Image fallback loader --------
  function createImgTag(imgs, alt){
    // imgs: array of src variants
    const first = imgs?.[0] || "";
    const rest = imgs?.slice(1) || [];
    const id = "img_" + Math.random().toString(16).slice(2);

    // we attach onerror handler after insert
    const html = `<img id="${id}" class="card__img" src="${first}" alt="${alt}" loading="lazy">`;
    setTimeout(() => {
      const el = document.getElementById(id);
      if(!el) return;

      let i = 0;
      el.addEventListener("error", () => {
        if(i < rest.length){
          const next = rest[i++];
          console.warn("Image failed, trying:", next);
          el.src = next;
        }else{
          console.error("All image paths failed for:", alt, imgs);
        }
      });
    }, 0);

    return html;
  }

  function cardTemplate(p){
    return `
      <article class="card" data-id="${p.id}" data-group="${p.group}" data-weight="${p.weight}">
        <div class="card__media">
          <div class="card__frame">
            ${createImgTag(p.imgs, p.title)}
          </div>
        </div>

        <div class="card__body">
          <div class="card__title">${p.title}</div>
          <div class="card__sub">${p.weight} kg</div>

          <div class="card__row">
            <div class="qty" role="group" aria-label="quantity">
              <button class="qty__btn" data-act="minus" type="button">−</button>
              <div class="qty__num" data-qty>1</div>
              <button class="qty__btn" data-act="plus" type="button">+</button>
            </div>

            <button class="btn btn--gold card__buy" data-act="add" type="button">В КОРЗИНУ</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderProducts(list){
    const grid = $("#productsGrid");
    if(!grid) return;
    grid.innerHTML = list.map(cardTemplate).join("");
  }

  function applyFilterAndSort(){
    const grid = $("#productsGrid");
    if(!grid) return;

    const activeChip = $(".chip.is-active");
    const filter = activeChip ? activeChip.dataset.filter : "all";
    const sort = $("#sortSelect") ? $("#sortSelect").value : "popular";

    let list = [...products];

    if(filter !== "all"){
      list = list.filter(p => p.group === filter);
    }

    if(sort === "weight_asc") list.sort((a,b)=>a.weight-b.weight);
    if(sort === "weight_desc") list.sort((a,b)=>b.weight-a.weight);

    renderProducts(list);
  }

  function bindCatalogEvents(){
    const grid = $("#productsGrid");
    if(!grid) return;

    $$(".chip").forEach(ch => {
      ch.addEventListener("click", () => {
        $$(".chip").forEach(x => x.classList.remove("is-active"));
        ch.classList.add("is-active");
        applyFilterAndSort();
      });
    });

    const sort = $("#sortSelect");
    if(sort) sort.addEventListener("change", applyFilterAndSort);

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if(!btn) return;

      const card = e.target.closest(".card");
      if(!card) return;

      const act = btn.dataset.act;
      const qtyEl = card.querySelector("[data-qty]");
      let qty = Number(qtyEl?.textContent || 1);

      if(act === "minus"){
        qty = Math.max(1, qty - 1);
        qtyEl.textContent = String(qty);
        return;
      }
      if(act === "plus"){
        qty = Math.min(99, qty + 1);
        qtyEl.textContent = String(qty);
        return;
      }
      if(act === "add"){
        const id = card.dataset.id;
        const cart = readCart();
        cart[id] = (Number(cart[id]) || 0) + qty;
        saveCart(cart);
        setCartCountUI();

        btn.textContent = "ДОБАВЛЕНО";
        setTimeout(() => btn.textContent = "В КОРЗИНУ", 900);
      }
    });
  }

  // ------- Cart page basic render (чтобы не “сломалось”) -------
  function renderCart(){
    const box = $("#cartBox");
    if(!box) return;

    const cart = readCart();
    const ids = Object.keys(cart).filter(k => Number(cart[k])>0);

    if(ids.length === 0){
      box.innerHTML = `<div class="glass panel">Корзина пустая.</div>`;
      return;
    }

    const rows = ids.map(id=>{
      const p = products.find(x=>x.id===id);
      const qty = Number(cart[id])||0;
      return `
        <div class="glass panel" style="margin-bottom:12px; display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <div>
            <div style="font-weight:900; letter-spacing:.08em; text-transform:uppercase;">${p?.title || id}</div>
            <div style="color:rgba(255,255,255,.72); margin-top:6px;">Количество: <b>${qty}</b></div>
          </div>
          <button class="btn btn--ghost" data-remove="${id}">Удалить</button>
        </div>
      `;
    }).join("");

    box.innerHTML = rows;

    box.addEventListener("click", (e)=>{
      const b = e.target.closest("button[data-remove]");
      if(!b) return;
      const id = b.dataset.remove;
      const cart = readCart();
      delete cart[id];
      saveCart(cart);
      setCartCountUI();
      renderCart();
    }, { once:true });
  }

  function initYear(){
    const y = $("#year");
    if(y) y.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", () => {
    initYear();
    initLangButtons();
    setActiveNav();
    setCartCountUI();

    if($("#productsGrid")){
      applyFilterAndSort();
      bindCatalogEvents();
    }
    renderCart();
  });
})();
