"use strict";(()=>{var n=()=>navigator.userAgent.includes("Mac")||navigator.platform.includes("Mac"),t=e=>n()?e.metaKey:e.ctrlKey;document.addEventListener("keydown",function(e){if(t(e)&&e.shiftKey&&e.code==="KeyS"){e.preventDefault(),parent.postMessage({type:"customEditorCommand",payload:"fork"},"*");return}if(t(e)&&e.code==="KeyS"){e.preventDefault(),parent.postMessage({type:"customEditorCommand",payload:"save"},"*");return}});})();