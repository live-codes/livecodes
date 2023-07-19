"use strict";(()=>{var a=e=>e.buffer.slice(e.byteOffset,e.byteLength+e.byteOffset);var p="application/wasm-uint8",d=`;; WebAssembly Text Format (module.wat)

`,i=`

;; WebAssembly Binary (module.wasm)
;; `;window.livecodes.loadWasm=(e={})=>new Promise(s=>{let c=(n="")=>{if(!n)return{text:"",binary:null};let r=n.split(`${d}`)[1].split(`${i}`)[0],t=n.split(`${i}`)[1].split("[")[1].slice(0,-1),o=new Uint8Array(t.split(",").map(Number));return{text:r,binary:o}};window.addEventListener("load",()=>{let n=document.querySelector(`script[type="${p}"]`),{text:r,binary:t}=c(n?.innerHTML);if(!t)s({wasmModule:{exports:{}},text:r,binary:t});else{let o=a(t);loader.instantiate(o,e).then(l=>{s({wasmModule:l,text:r,binary:t})})}})});})();
