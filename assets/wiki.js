let INDEX=[];
async function loadIndex(){const url=window.MAP_SEARCH_INDEX_URL||"/search.json";const res=await fetch(url,{cache:"no-store"});INDEX=await res.json();}
function openModal(){const m=document.getElementById("modal");m.classList.add("show");m.setAttribute("aria-hidden","false");const i=document.getElementById("modalInput");i.value="";i.focus();renderResults("");}
function closeModal(){const m=document.getElementById("modal");m.classList.remove("show");m.setAttribute("aria-hidden","true");}
function renderResults(q){const n=(q||"").trim().toLowerCase();const el=document.getElementById("results");
const list=!n?INDEX.slice(0,14):INDEX.filter(p=>(p.title||"").toLowerCase().includes(n)||(p.type||"").toLowerCase().includes(n)||(p.tags||[]).some(t=>(t||"").toLowerCase().includes(n))).slice(0,20);
el.innerHTML=list.map(p=>`<div class="res" data-url="${p.url}"><div class="t">${esc(p.title)}</div><div class="m">${esc(cap(p.type))}${p.edited?` · ${esc(p.edited)}`:""}${(p.tags||[]).length?` · ${esc((p.tags||[]).slice(0,3).join(", "))}`:""}</div></div>`).join("");
[...el.querySelectorAll(".res")].forEach(r=>r.addEventListener("click",()=>location.href=r.dataset.url));}
function cap(s){return (s||"").replace(/^\w/,c=>c.toUpperCase());}
function esc(s){return String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}
document.addEventListener("DOMContentLoaded",async()=>{
const nav=document.getElementById("nav");const navToggle=document.getElementById("navToggle");if(navToggle&&nav) navToggle.addEventListener("click",()=>nav.classList.toggle("open"));
const dense=document.getElementById("toggleDense");if(dense) dense.addEventListener("click",()=>document.body.classList.toggle("dense"));
const collapse=document.getElementById("collapseToc");const tocList=document.getElementById("tocList");if(collapse&&tocList){collapse.addEventListener("click",()=>{const hidden=tocList.style.display==="none";tocList.style.display=hidden?"":"none";collapse.textContent=hidden?"Collapse":"Expand";});}
const open=document.getElementById("openSearch");const q=document.getElementById("q");const close=document.getElementById("closeModal");const modal=document.getElementById("modal");const input=document.getElementById("modalInput");
if(open) open.addEventListener("click",openModal);
if(q) q.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();openModal();}});
if(close) close.addEventListener("click",closeModal);
if(modal) modal.addEventListener("click",e=>{if(e.target===modal) closeModal();});
if(input) input.addEventListener("input",e=>renderResults(e.target.value));
document.addEventListener("keydown",e=>{const isMac=navigator.platform.toUpperCase().includes("MAC");const cmdOrCtrl=isMac?e.metaKey:e.ctrlKey;
if(cmdOrCtrl&&e.key.toLowerCase()==="k"){e.preventDefault();openModal();} if(e.key==="Escape") closeModal();});
try{await loadIndex();}catch(e){}
});
