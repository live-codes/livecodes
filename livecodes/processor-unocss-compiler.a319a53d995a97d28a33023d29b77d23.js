"use strict";(()=>{var d=(e,n)=>({...n.customSettings[e]});self.createUnocssCompiler=()=>{let e=self.unocss,{createGenerator:n,defineConfig:m}=e;return async(o,{config:s,options:g})=>{let u=`<template>${g.html}
<script>${s.script.content}<\/script></template>`,f=d("unocss",s),i=(r={})=>Object.keys(r).filter(t=>r[t]&&t in e).map(t=>{let p=r[t];return typeof p=="object"?e[t](p):e[t]()}),y=m({presets:i({presetUno:!0,presetAttributify:!0,presetIcons:{cdn:"https://esm.sh/"}})}),{presets:a,...c}=f;a&&(c.presets=i(a));let h=n(c,y),{css:l}=await h.generate(u);return l.trim()?l+`

`+o:o}};})();
