"use strict";(()=>{livecodes.prolog={createSession:async(e={})=>{await livecodes.prolog.loaded;let s=e.limit??1e3,o="";document.querySelectorAll('script[type="text/prolog"]').forEach(i=>o+=i.innerHTML+`
`);let t=pl.create(s);return await t.promiseConsult(o),t},loaded:new Promise(e=>{window.addEventListener("load",e)})};})();
