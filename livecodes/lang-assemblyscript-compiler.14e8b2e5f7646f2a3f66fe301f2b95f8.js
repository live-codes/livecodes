"use strict";(()=>{var o=(e,t)=>({...t.customSettings[e]});var a=`;; WebAssembly Text Format (module.wat)

`,i=`

;; WebAssembly Binary (module.wasm)
;; `,c=async(e,t)=>{await self.assemblyscriptLoaded;try{let{text:n,binary:r}=await self.assemblyscript.asc.compileString(e,t);if(!r)return"";let s=r.toString();return a+n+i+"Uint8Array ["+s+"]"}catch(n){return console.error(n),""}};self.createAssemblyscriptCompiler=()=>(e,{config:t})=>c(e,{optimizeLevel:3,...o("assemblyscript",t)});})();
