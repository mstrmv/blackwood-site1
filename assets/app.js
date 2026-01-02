// file: /assets/app.js

(() => {
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

  const CART_KEY = "bw_cart_v1";

  const products = [
    {
      id: "core-3",
      title: "CORE • 3 KG",
      weight: 3,
      group: "3-5",
      img: "img/products/core-3kg.png"
    },
    {
      id: "core-5",
      title: "CORE • 5 KG",
      weight: 5,
      group: "3-5",
      img: "img/products/core-5kg.png"
    },
    {
      id: "core-10",
      title: "CORE • 10 KG",
      weight: 10,
      group: "10",
      img: "img/products/core-10kg.png"
    }
  ];

  function readCart(){
    try{
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    }catch(e){
      return {};
    }
  }
  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  function cartCount(cart){
    return Object.values(cart).reduce((a,n)=>a+(Number(n)||0),0);
  }
  function setCartCountUI(){
    const el = $("#cartCount");
    if(!el) return;
    el.textContent = String(cartCount(readCart()));
  }

  function cardTemplate(p){
    return `
      <article class="card" data-id="${p.id}" data-group="${p.group}" data-weight="${p.weight}">
        <div class="card__media">
          <div class="card__frame">
            <img class="card__img" src="${p.img}" alt="${p.title}" loading="lazy">
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

    if(sort === "weight_asc"){
      list.sort((a,b)=>a.weight-b.weight);
    } else if(sort === "weight_desc"){
      list.sort((a,b)=>b.weight-a.weight);
    } // popular = default order

    renderProducts(list);
  }

  function bindCatalogEvents(){
    const grid = $("#productsGrid");
    if(!grid) return;

    // chips
    $$(".chip").forEach(ch => {
      ch.addEventListener("click", () => {
        $$(".chip").forEach(x => x.classList.remove("is-active"));
        ch.classList.add("is-active");
        applyFilterAndSort();
      });
    });

    // sort
    const sort = $("#sortSelect");
    if(sort){
      sort.addEventListener("change", applyFilterAndSort);
    }

    // delegation for qty/add
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

        // small feedback
        btn.classList.add("is-done");
        btn.textContent = "ДОБАВЛЕНО";
        setTimeout(() => {
          btn.classList.remove("is-done");
          btn.textContent = "В КОРЗИНУ";
        }, 900);
      }
    });
  }

  function initYear(){
    const y = $("#year");
    if(y) y.textContent = String(new Date().getFullYear());
  }

  function initLangButtons(){
    // только подсветка, чтобы не ломать твой сайт
    const btns = $$(".lang__btn");
    btns.forEach(b => {
      b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("is-active"));
        b.classList.add("is-active");
      });
    });
  }

  // init
  document.addEventListener("DOMContentLoaded", () => {
    initYear();
    initLangButtons();
    setCartCountUI();

    // if catalog page
    if($("#productsGrid")){
      applyFilterAndSort();
      bindCatalogEvents();
    }
  });
})();
