import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */function r(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}`}const i=document.querySelector(".js-body"),e=document.querySelector(".js-buttonStart"),o=document.querySelector(".js-buttonStop");let t=null;function n(){i.style.backgroundColor=r(),t=requestAnimationFrame(n)}e.addEventListener("click",()=>{t||(n(),e.setAttribute("disabled","disabled"),o.removeAttribute("disabled"))});o.addEventListener("click",()=>{t&&(cancelAnimationFrame(t),t=null,o.setAttribute("disabled","disabled"),e.removeAttribute("disabled"))});
//# sourceMappingURL=commonHelpers.js.map
