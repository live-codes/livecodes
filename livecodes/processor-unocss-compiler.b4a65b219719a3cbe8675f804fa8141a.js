"use strict";(()=>{var d=(e,n)=>({...n.customSettings[e]});self.createUnocssCompiler=()=>{let e=self.unocss,{createGenerator:n,defineConfig:u}=e;return async(o,{config:s,options:g})=>{let m=`<template>${g.html}
<script>${s.script.content}<\/script></template>`,f=d("unocss",s),a=(r={})=>Object.keys(r).filter(t=>r[t]&&t in e).map(t=>{let p=r[t];return typeof p=="object"?e[t](p):e[t]()}),y=u({presets:a({presetUno:!0,presetAttributify:!0,presetIcons:{cdn:"https://esm.sh/"}})}),{presets:i,...c}=f;i&&(c.presets=a(i));let b=n(c,y),{css:l}=await b.generate(m);return l.trim()?l+`

`+o:o}};})();
