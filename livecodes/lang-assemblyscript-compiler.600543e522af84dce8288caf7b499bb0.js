"use strict";(()=>{var o=(e,t)=>({...t.customSettings[e]});var i=`;; WebAssembly Text Format (module.wat)

`,a=`

;; WebAssembly Binary (module.wasm)
;; `,c=async(e,t)=>{await self.assemblyscriptLoaded;try{let{text:r,binary:n}=await self.assemblyscript.asc.compileString(e,t);if(!n)return"";let s=n.toString();return i+r+a+"Uint8Array ["+s+"]"}catch(r){return console.error(r),""}};self.createAssemblyscriptCompiler=()=>(e,{config:t})=>c(e,{optimizeLevel:3,...o("assemblyscript",t)});})();
