const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a=null;const d=()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`};t.addEventListener("click",(()=>{t.disabled=!0,a=setInterval(d,1e3)})),e.addEventListener("click",(()=>{clearInterval(a),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.21f93ff7.js.map
