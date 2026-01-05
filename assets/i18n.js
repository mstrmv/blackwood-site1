/* assets/style.css */
:root{
  --bg:#070708;
  --text:#ffffff;
  --muted:rgba(255,255,255,.76);
  --muted2:rgba(255,255,255,.62);

  --gold:#c8a45a;
  --gold2:#b08a3f;

  --stroke:rgba(255,255,255,.10);
  --stroke2:rgba(255,255,255,.16);

  --shadow:0 18px 55px rgba(0,0,0,.65);

  --r:16px;
  --r2:22px;

  --container:1120px;
  --focus:0 0 0 3px rgba(200,164,90,.26);
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;
  color:var(--text);
  background:var(--bg);
  overflow-x:hidden;
}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
a:visited{color:inherit}
button,input,select,textarea{font-family:inherit}
::selection{background:rgba(200,164,90,.24)}

.container{width:min(var(--container), calc(100% - 32px)); margin:0 auto}

/* BG */
body.page{min-height:100%; position:relative;}
body.page::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:0;
  background:
    radial-gradient(1200px 650px at 18% 8%, rgba(200,164,90,.16), transparent 60%),
    radial-gradient(900px 520px at 82% 12%, rgba(176,138,63,.12), transparent 58%),
    radial-gradient(1100px 750px at 50% 110%, rgba(255,255,255,.06), transparent 55%);
}
body.page{
  background:
    linear-gradient(180deg, rgba(7,7,8,.74), rgba(7,7,8,.86) 45%, rgba(7,7,8,.92)),
    var(--page-bg, none);
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
  background-attachment:fixed;
}
body.page-hero{ --page-bg: url("../img/hero-bg.png"); }
body.page-catalog{ --page-bg: url("../img/catalog-bg.png"); }

.noise{
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:1;
  opacity:.085;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  background-size:220px 220px;
}

/* TOPBAR */
.topbar{
  position:sticky; top:0;
  z-index:50;
  backdrop-filter: blur(14px);
  background: linear-gradient(180deg, rgba(10,10,11,.86), rgba(10,10,11,.58));
  border-bottom:1px solid var(--stroke);
}
.nav{
  display:flex;
  align-items:center;
  gap:14px;
  padding:14px 0;
}
.brand{
  display:flex;
  align-items:baseline;
  gap:10px;
  font-weight:950;
  letter-spacing:.14em;
  text-transform:uppercase;
  white-space:nowrap;
}
.brand .dot{
  width:7px;height:7px;border-radius:999px;
  background:var(--gold);
  box-shadow:0 0 0 4px rgba(200,164,90,.12);
}
.brand .gold{color:var(--gold)}

.navlinks{
  margin-left:18px;
  display:flex;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
}
.navlinks a{
  padding:10px 12px;
  border-radius:999px;
  color:var(--muted);
  border:1px solid transparent;
  transition:.2s ease;
  font-weight:900;
  letter-spacing:.06em;
  text-transform:uppercase;
  font-size:12px;
}
.navlinks a:hover{
  background:rgba(255,255,255,.04);
  border-color:var(--stroke2);
  color:#fff;
}
.navlinks a.active{
  background:rgba(200,164,90,.14);
  border-color:rgba(200,164,90,.40);
  color:#fff;
}

.spacer{flex:1}
.pills{display:flex; align-items:center; gap:10px}

.lang{
  display:flex;
  align-items:center;
  gap:6px;
  padding:6px;
  border-radius:999px;
  background:rgba(0,0,0,.22);
  border:1px solid var(--stroke);
  backdrop-filter:blur(12px);
}
.lang button{
  cursor:pointer;
  border:0;
  border-radius:999px;
  padding:8px 11px;
  color:var(--muted);
  background:transparent;
  font-weight:950;
  letter-spacing:.10em;
  transition:.2s ease;
  font-size:12px;
}
.lang button:hover{background:rgba(255,255,255,.05); color:#fff}
.lang button.active{
  background:rgba(200,164,90,.20);
  color:#fff;
  box-shadow:0 0 0 1px rgba(200,164,90,.24) inset;
}

.social{display:flex; align-items:center; gap:10px}
.iconbtn{
  display:inline-grid;
  place-items:center;
  width:38px;height:38px;
  border-radius:999px;
  border:1px solid var(--stroke);
  background:rgba(0,0,0,.22);
  backdrop-filter:blur(12px);
  transition:.2s ease;
}
.iconbtn:hover{
  transform:translateY(-1px);
  border-color:rgba(200,164,90,.35);
  background:rgba(200,164,90,.12);
}
.iconbtn svg{width:18px;height:18px; fill:#fff; opacity:.92}

.cartbtn{
  display:flex; align-items:center; gap:10px;
  padding:10px 12px;
  border-radius:999px;
  border:1px solid rgba(200,164,90,.40);
  background:linear-gradient(180deg, rgba(200,164,90,.22), rgba(200,164,90,.10));
  box-shadow:0 10px 25px rgba(0,0,0,.28);
  font-weight:950;
  letter-spacing:.08em;
  text-transform:uppercase;
  font-size:12px;
}
.cartbtn small{font-weight:950; letter-spacing:.08em}
.badge{
  min-width:22px;
  height:22px;
  padding:0 7px;
  border-radius:999px;
  display:inline-grid;
  place-items:center;
  font-size:12px;
  background:rgba(255,255,255,.12);
  border:1px solid var(--stroke2);
}

/* MAIN */
.main{padding:28px 0 56px; position:relative; z-index:2}

/* HERO */
.hero{
  min-height: calc(100vh - 92px);
  display:grid;
  align-items:start;
  padding: 26px 0 44px;
}
.hero-grid{
  display:grid;
  grid-template-columns: 640px 1fr;
  gap:18px;
  align-items:start;
}
.hero-card{
  border-radius:var(--r2);
  border:1px solid rgba(255,255,255,.12);
  background:linear-gradient(180deg, rgba(0,0,0,.56), rgba(0,0,0,.32));
  backdrop-filter: blur(16px);
  box-shadow:0 28px 70px rgba(0,0,0,.62);
  overflow:hidden;
  position:relative;
  z-index:2;
}
.hero-card::before{
  content:"";
  position:absolute; inset:0;
  pointer-events:none;
  background:
    radial-gradient(700px 420px at 18% 20%, rgba(200,164,90,.22), transparent 60%),
    radial-gradient(700px 420px at 88% 30%, rgba(176,138,63,.14), transparent 62%);
}
.hero-card-inner{
  position:relative;
  padding:26px 26px 22px;
  display:grid;
  gap:14px;
}
.hero-badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 12px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.05);
  color:rgba(255,255,255,.86);
  font-weight:950;
  letter-spacing:.02em;
  font-size:12px;
  width:max-content;
}
.hero-badge .dot{
  width:7px;height:7px;border-radius:999px;
  background:var(--gold);
  box-shadow:0 0 0 4px rgba(200,164,90,.12);
}
.hero-title{
  margin:0;
  font-size:54px;
  line-height:1.0;
  letter-spacing:.02em;
  font-weight:980;
  text-transform:uppercase;
}
.hero-desc{
  margin:0;
  color:rgba(255,255,255,.74);
  font-size:14px;
  line-height:1.65;
  max-width:60ch;
}
.hero-actions{display:flex; flex-wrap:wrap; gap:10px; margin-top:8px;}

/* Section */
.section{margin-top:22px; display:grid; gap:12px;}
.section-title{
  display:flex;
  align-items:end;
  justify-content:space-between;
  gap:12px;
}
.section-title h2{
  margin:0;
  font-size:18px;
  letter-spacing:.14em;
  text-transform:uppercase;
}
.section-title .hint{color:var(--muted2); font-size:13px}

/* Panels */
.panel{
  border:1px solid var(--stroke);
  border-radius:var(--r);
  background:rgba(255,255,255,.03);
  box-shadow:0 14px 35px rgba(0,0,0,.35);
  z-index:2;
  position:relative;
}
.panel.pad{padding:16px}
.panel h3{
  margin:0 0 6px;
  font-size:13px;
  letter-spacing:.14em;
  text-transform:uppercase;
}
.panel p{
  margin:0;
  color:var(--muted);
  font-size:13.5px;
  line-height:1.55;
}

/* Catalog */
.toolbar{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  align-items:center;
  justify-content:space-between;
  padding:14px;
}
.row{display:flex; flex-wrap:wrap; gap:10px; align-items:center}

.input, .select{
  background:rgba(255,255,255,.03);
  border:1px solid var(--stroke);
  color:#fff;
  padding:11px 12px;
  border-radius:14px;
  min-width:220px;
}
.select{min-width:180px}
.input::placeholder{color:rgba(255,255,255,.42)}
.input:focus,.select:focus{outline:none; box-shadow:var(--focus); border-color:rgba(200,164,90,.34)}

.chips{display:flex; flex-wrap:wrap; gap:8px}
.chip{
  cursor:pointer;
  border:1px solid var(--stroke);
  background:rgba(255,255,255,.03);
  color:var(--muted);
  padding:9px 11px;
  border-radius:999px;
  font-weight:950;
  letter-spacing:.10em;
  text-transform:uppercase;
  font-size:12px;
  transition:.2s ease;
}
.chip:hover{background:rgba(255,255,255,.05); color:#fff}
.chip.active{
  border-color:rgba(200,164,90,.40);
  background:rgba(200,164,90,.12);
  color:#fff;
}

.products{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px;
  padding:14px;
}
.product{overflow:hidden; display:flex; flex-direction:column; min-height:360px;}
.product .thumb{
  position:relative;
  aspect-ratio: 4/3;
  background:
    radial-gradient(900px 500px at 40% 20%, rgba(200,164,90,.16), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.01));
  border-bottom:1px solid var(--stroke);
}
.product .thumb img{
  width:100%; height:100%;
  object-fit:cover;
  filter:drop-shadow(0 14px 28px rgba(0,0,0,.55));
}
.pill{
  position:absolute;
  top:10px; left:10px;
  border-radius:999px;
  padding:7px 10px;
  font-weight:980;
  letter-spacing:.10em;
  text-transform:uppercase;
  font-size:11px;
  border:1px solid rgba(255,255,255,.16);
  background:rgba(0,0,0,.35);
  backdrop-filter:blur(8px);
}
.product .body{
  padding:14px;
  display:flex;
  flex-direction:column;
  gap:10px;
  flex:1;
}
.product .title{
  font-weight:980;
  letter-spacing:.04em;
  font-size:14px;
  line-height:1.3;
}
.product .meta{
  display:flex; align-items:center; justify-content:space-between;
  gap:10px;
  color:var(--muted);
  font-size:13px;
}
.price{font-weight:980; letter-spacing:.04em; color:#fff;}
.product .actions{display:flex; gap:10px; margin-top:auto;}
.btn{
  cursor:pointer;
  border:1px solid var(--stroke2);
  background:rgba(255,255,255,.03);
  color:#fff;
  padding:12px 14px;
  border-radius:999px;
  transition:.2s ease;
  font-weight:980;
  letter-spacing:.08em;
  text-transform:uppercase;
  font-size:12px;
}
.btn:hover{transform:translateY(-1px); background:rgba(255,255,255,.05)}
.btn.primary{
  border-color:rgba(200,164,90,.52);
  background:linear-gradient(180deg, rgba(200,164,90,.26), rgba(200,164,90,.12));
}
.btn.primary:hover{background:linear-gradient(180deg, rgba(200,164,90,.32), rgba(200,164,90,.14))}
.btn:focus{outline:none; box-shadow:var(--focus)}
.btn[disabled]{opacity:.5; cursor:not-allowed; transform:none}

.note{padding:14px; color:var(--muted); font-size:13.5px; line-height:1.65;}

/* Table / cart */
.table{width:100%; border-collapse:collapse;}
.table th,.table td{padding:12px 10px; border-bottom:1px solid var(--stroke); text-align:left;}
.table th{
  color:var(--muted);
  font-size:12px;
  letter-spacing:.14em;
  text-transform:uppercase;
}
.qty{
  display:inline-flex;
  align-items:center;
  gap:8px;
  border:1px solid var(--stroke);
  background:rgba(255,255,255,.03);
  padding:8px;
  border-radius:12px;
}
.qty button{
  width:30px;height:30px;
  border-radius:10px;
  border:1px solid var(--stroke);
  background:rgba(255,255,255,.03);
  color:#fff;
  cursor:pointer;
  font-weight:980;
}
.qty button:hover{background:rgba(255,255,255,.06)}
.qty input{
  width:44px;
  text-align:center;
  border:0;
  background:transparent;
  color:#fff;
  font-weight:980;
  outline:none;
}
.summary{padding:14px; display:grid; gap:10px;}
.summary-row{display:flex; align-items:center; justify-content:space-between; gap:10px; color:var(--muted);}
.summary-row strong{color:#fff}
hr.sep{
  border:0;
  height:1px;
  background:linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
}

/* Forms */
.form{
  padding:14px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
}
.form .full{grid-column:1/-1}
.label{display:grid; gap:6px; color:var(--muted); font-size:13px;}
textarea.input{min-height:98px; resize:vertical}

/* Footer */
.footer{
  margin-top:28px;
  border-top:1px solid var(--stroke);
  background:rgba(255,255,255,.02);
  position:relative;
  z-index:2;
}
.footer .inner{
  padding:18px 0;
  display:flex;
  gap:10px;
  justify-content:space-between;
  flex-wrap:wrap;
  color:var(--muted2);
  font-size:13px;
}

/* Toast */
.toast{
  position:fixed;
  left:50%;
  bottom:18px;
  transform:translateX(-50%);
  z-index:999;
  background:rgba(12,12,14,.86);
  border:1px solid rgba(200,164,90,.32);
  backdrop-filter:blur(12px);
  color:#fff;
  padding:12px 14px;
  border-radius:14px;
  box-shadow:0 18px 45px rgba(0,0,0,.55);
  display:none;
  max-width:min(520px, calc(100% - 24px));
}

/* Responsive */
@media (max-width: 980px){
  .hero{min-height:unset}
  .hero-grid{grid-template-columns:1fr; gap:14px}
  .hero-title{font-size:44px}
  .products{grid-template-columns:repeat(2,1fr)}
}
@media (max-width: 700px){
  .navlinks{display:none}
}
@media (max-width: 560px){
  .products{grid-template-columns:1fr}
  .input{min-width:unset; width:100%}
  .select{min-width:unset}
  .form{grid-template-columns:1fr}
  .hero-title{font-size:40px}
}
