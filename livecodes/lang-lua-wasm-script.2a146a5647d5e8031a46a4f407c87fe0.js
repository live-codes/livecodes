"use strict";(()=>{addEventListener("load",async()=>{let t="";if(document.querySelectorAll('script[type="application/lua"]').forEach(o=>t+=o.innerHTML+`
`),!t.trim())return;let a=await new wasmoon.LuaFactory().createEngine();try{a.global.set("window",window),await a.doString(t)}catch(o){console.error(o)}});})();
