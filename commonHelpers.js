import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */function n(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}`}const d=document.querySelector(".js-body"),o=document.querySelector(".js-buttonStart"),e=document.querySelector(".js-buttonStop");let t=null;e.setAttribute("disabled","disabled");function r(){d.style.backgroundColor=n()}o.addEventListener("click",()=>{t||(t=setInterval(r,500),o.setAttribute("disabled","disabled"),e.removeAttribute("disabled"),r())});e.addEventListener("click",()=>{t&&(clearInterval(t),t=null,e.setAttribute("disabled","disabled"),o.removeAttribute("disabled"))});
//# sourceMappingURL=commonHelpers.js.map
