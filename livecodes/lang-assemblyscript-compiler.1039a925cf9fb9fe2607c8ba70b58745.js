"use strict";(()=>{var o=(e,t)=>({...t.customSettings[e]});var i=`;; WebAssembly Text Format (module.wat)

`,a=`

;; WebAssembly Binary (module.wasm)
;; `,c=async(e,t)=>{await self.assemblyscriptLoaded;try{let{text:n,binary:r}=await self.assemblyscript.asc.compileString(e,t);if(!r)return"";let s=r.toString();return i+n+a+"Uint8Array ["+s+"]"}catch(n){return console.error(n),""}};self.createAssemblyscriptCompiler=()=>(e,{config:t})=>c(e,{optimizeLevel:3,...o("assemblyscript",t)});})();
