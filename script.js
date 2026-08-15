const cards=[...document.querySelectorAll(".card")],filters=[...document.querySelectorAll(".filter")],search=document.querySelector("#search"),empty=document.querySelector("#empty");let active="all";
function update(){const q=search.value.trim().toLowerCase();let n=0;cards.forEach(c=>{const show=(!q||c.textContent.toLowerCase().includes(q))&&(active==="all"||c.dataset.category===active);c.hidden=!show;if(show)n++});empty.hidden=n!==0}
filters.forEach(b=>b.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));b.classList.add("active");active=b.dataset.filter;update()}));
search.addEventListener("input",update);
document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);b.textContent="Copied";b.classList.add("copied");setTimeout(()=>{b.textContent="Copy";b.classList.remove("copied")},1600)}catch{b.textContent="Select";setTimeout(()=>b.textContent="Copy",1600)}}));

/* Installation guide modal */
const installModal=document.querySelector("#installModal");
const installTriggers=document.querySelectorAll(".install-trigger");
const installCloseButtons=document.querySelectorAll("[data-install-close]");
function openInstallModal(event){event.preventDefault();if(!installModal)return;installModal.classList.add("open");installModal.setAttribute("aria-hidden","false");document.body.classList.add("install-modal-open");installModal.querySelector(".modal-close")?.focus()}
function closeInstallModal(){if(!installModal)return;installModal.classList.remove("open");installModal.setAttribute("aria-hidden","true");document.body.classList.remove("install-modal-open")}
installTriggers.forEach(trigger=>trigger.addEventListener("click",openInstallModal));
installCloseButtons.forEach(button=>button.addEventListener("click",closeInstallModal));
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&installModal?.classList.contains("open"))closeInstallModal()});
