"use strict";(()=>{var Qe=Object.create;var Y=Object.defineProperty;var Ye=Object.getOwnPropertyDescriptor;var et=Object.getOwnPropertyNames;var tt=Object.getPrototypeOf,rt=Object.prototype.hasOwnProperty;var st=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ot=(e,t,n,m)=>{if(t&&typeof t=="object"||typeof t=="function")for(let d of et(t))!rt.call(e,d)&&d!==n&&Y(e,d,{get:()=>t[d],enumerable:!(m=Ye(t,d))||m.enumerable});return e};var nt=(e,t,n)=>(n=e!=null?Qe(tt(e)):{},ot(t||!e||!e.__esModule?Y(n,"default",{value:e,enumerable:!0}):n,e));var Je=st((Tg,F)=>{var Sr=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",m={};function d(s,o){if(!m[s]){m[s]={};for(var c=0;c<s.length;c++)m[s][s.charAt(c)]=c}return m[s][o]}var f={compressToBase64:function(s){if(s==null)return"";var o=f._compress(s,6,function(c){return t.charAt(c)});switch(o.length%4){default:case 0:return o;case 1:return o+"===";case 2:return o+"==";case 3:return o+"="}},decompressFromBase64:function(s){return s==null?"":s==""?null:f._decompress(s.length,32,function(o){return d(t,s.charAt(o))})},compressToUTF16:function(s){return s==null?"":f._compress(s,15,function(o){return e(o+32)})+" "},decompressFromUTF16:function(s){return s==null?"":s==""?null:f._decompress(s.length,16384,function(o){return s.charCodeAt(o)-32})},compressToUint8Array:function(s){for(var o=f.compress(s),c=new Uint8Array(o.length*2),a=0,u=o.length;a<u;a++){var v=o.charCodeAt(a);c[a*2]=v>>>8,c[a*2+1]=v%256}return c},decompressFromUint8Array:function(s){if(s==null)return f.decompress(s);for(var o=new Array(s.length/2),c=0,a=o.length;c<a;c++)o[c]=s[c*2]*256+s[c*2+1];var u=[];return o.forEach(function(v){u.push(e(v))}),f.decompress(u.join(""))},compressToEncodedURIComponent:function(s){return s==null?"":f._compress(s,6,function(o){return n.charAt(o)})},decompressFromEncodedURIComponent:function(s){return s==null?"":s==""?null:(s=s.replace(/ /g,"+"),f._decompress(s.length,32,function(o){return d(n,s.charAt(o))}))},compress:function(s){return f._compress(s,16,function(o){return e(o)})},_compress:function(s,o,c){if(s==null)return"";var a,u,v={},U={},C="",P="",w="",S=2,T=3,x=2,b=[],p=0,l=0,L;for(L=0;L<s.length;L+=1)if(C=s.charAt(L),Object.prototype.hasOwnProperty.call(v,C)||(v[C]=T++,U[C]=!0),P=w+C,Object.prototype.hasOwnProperty.call(v,P))w=P;else{if(Object.prototype.hasOwnProperty.call(U,w)){if(w.charCodeAt(0)<256){for(a=0;a<x;a++)p=p<<1,l==o-1?(l=0,b.push(c(p)),p=0):l++;for(u=w.charCodeAt(0),a=0;a<8;a++)p=p<<1|u&1,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=u>>1}else{for(u=1,a=0;a<x;a++)p=p<<1|u,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=0;for(u=w.charCodeAt(0),a=0;a<16;a++)p=p<<1|u&1,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=u>>1}S--,S==0&&(S=Math.pow(2,x),x++),delete U[w]}else for(u=v[w],a=0;a<x;a++)p=p<<1|u&1,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=u>>1;S--,S==0&&(S=Math.pow(2,x),x++),v[P]=T++,w=String(C)}if(w!==""){if(Object.prototype.hasOwnProperty.call(U,w)){if(w.charCodeAt(0)<256){for(a=0;a<x;a++)p=p<<1,l==o-1?(l=0,b.push(c(p)),p=0):l++;for(u=w.charCodeAt(0),a=0;a<8;a++)p=p<<1|u&1,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=u>>1}else{for(u=1,a=0;a<x;a++)p=p<<1|u,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=0;for(u=w.charCodeAt(0),a=0;a<16;a++)p=p<<1|u&1,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=u>>1}S--,S==0&&(S=Math.pow(2,x),x++),delete U[w]}else for(u=v[w],a=0;a<x;a++)p=p<<1|u&1,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=u>>1;S--,S==0&&(S=Math.pow(2,x),x++)}for(u=2,a=0;a<x;a++)p=p<<1|u&1,l==o-1?(l=0,b.push(c(p)),p=0):l++,u=u>>1;for(;;)if(p=p<<1,l==o-1){b.push(c(p));break}else l++;return b.join("")},decompress:function(s){return s==null?"":s==""?null:f._decompress(s.length,32768,function(o){return s.charCodeAt(o)})},_decompress:function(s,o,c){var a=[],u,v=4,U=4,C=3,P="",w=[],S,T,x,b,p,l,L,y={val:c(0),position:o,index:1};for(S=0;S<3;S+=1)a[S]=S;for(x=0,p=Math.pow(2,2),l=1;l!=p;)b=y.val&y.position,y.position>>=1,y.position==0&&(y.position=o,y.val=c(y.index++)),x|=(b>0?1:0)*l,l<<=1;switch(u=x){case 0:for(x=0,p=Math.pow(2,8),l=1;l!=p;)b=y.val&y.position,y.position>>=1,y.position==0&&(y.position=o,y.val=c(y.index++)),x|=(b>0?1:0)*l,l<<=1;L=e(x);break;case 1:for(x=0,p=Math.pow(2,16),l=1;l!=p;)b=y.val&y.position,y.position>>=1,y.position==0&&(y.position=o,y.val=c(y.index++)),x|=(b>0?1:0)*l,l<<=1;L=e(x);break;case 2:return""}for(a[3]=L,T=L,w.push(L);;){if(y.index>s)return"";for(x=0,p=Math.pow(2,C),l=1;l!=p;)b=y.val&y.position,y.position>>=1,y.position==0&&(y.position=o,y.val=c(y.index++)),x|=(b>0?1:0)*l,l<<=1;switch(L=x){case 0:for(x=0,p=Math.pow(2,8),l=1;l!=p;)b=y.val&y.position,y.position>>=1,y.position==0&&(y.position=o,y.val=c(y.index++)),x|=(b>0?1:0)*l,l<<=1;a[U++]=e(x),L=U-1,v--;break;case 1:for(x=0,p=Math.pow(2,16),l=1;l!=p;)b=y.val&y.position,y.position>>=1,y.position==0&&(y.position=o,y.val=c(y.index++)),x|=(b>0?1:0)*l,l<<=1;a[U++]=e(x),L=U-1,v--;break;case 2:return w.join("")}if(v==0&&(v=Math.pow(2,C),C++),a[L])P=a[L];else if(L===U)P=T+T.charAt(0);else return null;w.push(P),a[U++]=T+P.charAt(0),v--,T=P,v==0&&(v=Math.pow(2,C),C++)}}};return f}();typeof F<"u"&&F!=null&&(F.exports=Sr)});var te=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],re=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],se=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],k={getModuleUrl:(e,{isModule:t=!0,defaultCDN:n="esm.sh",external:m}={})=>{e=e.replace(/#nobundle/g,"");let d=s=>!m||!s.includes("https://esm.sh")?s:s.includes("?")?`${s}&external=${m}`:`${s}?external=${m}`,f=ee(e,t,n);return f?d(f):t?d("https://esm.sh/"+e):"https://cdn.jsdelivr.net/npm/"+e},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:ee(e,!1,t||oe())||e,cdnLists:{npm:re,module:te,gh:se},checkCDNs:async(e,t)=>{let n=[t,...k.cdnLists.npm].filter(Boolean);for(let m of n)try{if((await fetch(k.getUrl(e,m),{method:"HEAD"})).ok)return m}catch{}return k.cdnLists.npm[0]}},oe=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||k.cdnLists.npm[0]}catch{return k.cdnLists.npm[0]}},ee=(e,t,n)=>{let m=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",se[0]):e.includes(":")||(e=(n||(t?te[0]:re[0]))+":"+e);for(let d of it){let[f,s]=d;if(f.test(e))return e.replace(f,s)+m}return null},it=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:h,getModuleUrl:Tr}=k,i=h("@live-codes/browser-compilers@0.21.1/dist/");var ne=h("art-template@4.13.2/lib/template-web.js");var ie=h("@assemblyscript/loader@0.27.29/umd/index.js");var ae=h("@hatemhosny/astro-internal@0.0.4/");var ce=h("@babel/standalone@7.26.4/babel.js");var D=h("brython@3.12.4/");var $=h("cherry-cljs@0.2.19/");var N=h("@live-codes/clio-browser-compiler@0.0.3/public/build/");var pe=h("dot@1.1.3/doT.js"),le=h("ejs@3.1.10/ejs.js");var me=h("eta@3.4.0/dist/eta.umd.js");var A=h("@live-codes/go2js@0.5.0/build/");var H=h("handlebars@4.7.8/dist/");var J=h("imba@2.0.0-alpha.229/dist/");var ue=h("liquidjs@10.14.0/dist/liquid.browser.min.js");var ge=h("malinajs@0.7.19/"),de=h("marked@13.0.2/marked.min.js");var fe=h("mjml-browser@4.15.3/lib/index.js");var ye=h("mustache@4.2.0/mustache.js");var z=h("nunjucks@3.2.4/browser/"),R=h("https://cdn.opalrb.com/opal/1.8.2/"),he=h("parinfer@3.13.1/parinfer.js");var xe=h("@live-codes/postcss-import-url@0.1.2/dist/postcss-import-url.js"),_=h("prettier@3.3.2/"),be=h("@prettier/plugin-php@0.22.2/standalone.js");var K=h("riot@9.2.2/");var V=h("sql-formatter@12.2.1/dist/sql-formatter.min.js"),ve=h("sql.js@1.10.3/dist/"),I=h("squint-cljs@0.4.81/"),we=h("@stencil/core@3.2.2/compiler/stencil.js");var j=h("svelte@5.12.0/");var Se=h("twig@1.17.1/twig.min.js"),je=h("typescript@5.6.2/lib/typescript.js");var Le=h("uniter@2.18.0/dist/uniter.js");var G=h("vue@2"),Ue=h("vue@3.4.31/dist/vue.runtime.esm-browser.prod.js"),Ce=h("livecodes@0.8.0/vue.js"),Pe=h("vue3-sfc-loader@0.9.5/dist/");var M=(e,t=!0)=>e.replace(/\\/g,t?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var ke=e=>!e?.startsWith("http")&&!e?.startsWith("data:"),Te=(e,t=document.baseURI)=>ke(e)?new URL(e,t).href:e;var g=(e,t)=>({...t.customSettings[e]});var _e={name:"lightningcss",title:"Lightning CSS",isPostcssPlugin:!1,compiler:{url:i+"lightningcss/lightningcss.js",factory:(e,t)=>(self.importScripts(t+"processor-lightningcss-compiler.6c6e2bf56e55966bb9a11774b3f1f873.js"),self.createLightningcssCompiler())},editor:"style"};var Ee={name:"postcss",title:"Processors:",isPostcssPlugin:!1,compiler:{url:i+"postcss/postcss.js",factory:(e,t)=>(self.importScripts(t+"waiting"),self.createPostcssCompiler())},editor:"style",hidden:!0};var Ae={name:"autoprefixer",title:"Autoprefixer",isPostcssPlugin:!0,compiler:{url:i+"autoprefixer/autoprefixer.js",factory:e=>self.autoprefixer.autoprefixer({...g("autoprefixer",e)})},editor:"style"},Ie={name:"cssnano",title:"cssnano",isPostcssPlugin:!0,compiler:{url:i+"cssnano/cssnano.js",factory:()=>{let e=self.cssnano.cssnanoPresetDefault().plugins,t=[];for(let n of e){let[m,d]=n;(typeof d>"u"||typeof d=="object"&&!d.exclude||typeof d=="boolean"&&d===!0)&&t.push(m(d))}return t}},editor:"style"},Be={name:"postcssImportUrl",title:"Import Url",isPostcssPlugin:!0,compiler:{url:xe,factory:e=>self.postcssImportUrl({...g("postcssImportUrl",e)})},editor:"style"},Re={name:"postcssPresetEnv",title:"Preset Env",isPostcssPlugin:!0,compiler:{url:i+"postcss-preset-env/postcss-preset-env.js",factory:e=>self.postcssPresetEnv.postcssPresetEnv({autoprefixer:!1,...g("postcssPresetEnv",e)})},editor:"style"},Me={name:"purgecss",title:"PurgeCSS",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:i+"purgecss/purgecss.js",factory:(e,t,n)=>self.purgecss.purgecss({...g("purgecss",e),content:[{raw:`<template>${n.html}
<script>${e.script.content}<\/script></template>`,extension:"html"}]})},editor:"style"},qe={name:"tokencss",title:"Token CSS",isPostcssPlugin:!0,compiler:{url:i+"tokencss/tokencss.js",factory:e=>{let t=g("tokencss",e);Object.keys(t).length===0&&(t.$schema="https://tokencss.com/schema@0.0.1",t.extends="@tokencss/core/preset");let n=(d,f)=>{let s=JSON.parse(JSON.stringify(d));return Object.keys(f).forEach(o=>{s[o]=typeof f[o]!="object"||Array.isArray(f[o])?f[o]:{...s[o],...f[o]}}),s},m=t.extends?.includes("@tokencss/core/preset")?n(self.tokencss.preset,t):t;return self.tokencss.tokencss({config:m})}},editor:"style"},Oe={name:"cssmodules",title:"CSS Modules",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:i+"postcss-modules/postcss-modules.js",factory:(e,t,n)=>{let m=g("cssmodules",e);return self.postcssModules.postcssModules({localsConvention:"camelCase",...m,getJSON(d,f,s){let o=m.addClassesToHTML!==!1,c=m.removeOriginalClasses===!0;o&&(n.html=self.postcssModules.addClassesToHtml(n.html,f,c)),n.compileInfo={...n.compileInfo,cssModules:f,...o?{modifiedHTML:n.html}:{}}}})}},editor:"style"};var $e={name:"tailwindcss",title:"Tailwind CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:i+"tailwindcss/tailwindcss.js",factory:(e,t)=>(self.importScripts(t+"processor-tailwindcss-compiler.0830a797e87a82a53906abbc1300ba06.js"),self.createTailwindcssCompiler())},editor:"style"};var We={name:"unocss",title:"UnoCSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:i+"unocss/unocss.js",factory:(e,t)=>(self.importScripts(t+"processor-unocss-compiler.b4a65b219719a3cbe8675f804fa8141a.js"),self.createUnocssCompiler())},editor:"style"};var Fe={name:"windicss",title:"Windi CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:i+"windicss/windicss.js",factory:(e,t)=>(self.importScripts(t+"processor-windicss-compiler.148b8a060115020a629609380e167c3b.js"),self.createWindicssCompiler())},editor:"style"};var E=[$e,Fe,We,qe,Me,Be,Ae,Re,_e,Ie,Oe,Ee];var Z=(e,t)=>E.map(n=>n.name).includes(e)?t.languages?t.languages.includes(e):!0:!1;var Ts=_+"standalone.js",r={babel:_+"plugins/babel.js",estree:_+"plugins/estree.js",glimmer:_+"plugins/glimmer.js",html:_+"plugins/html.js",markdown:_+"plugins/markdown.js",postcss:_+"plugins/postcss.js",php:be,pug:i+"prettier/parser-pug.js"};var ct={name:"babel",title:"Babel",parser:{name:"babel",pluginUrls:[r.babel,r.html]},compiler:{url:ce,factory:()=>async(e,{config:t})=>{let n=g("babel",t),m=g("@babel/preset-env",t),d=g("@babel/preset-typescript",t),f=g("@babel/preset-react",t);return window.Babel.transform(e,{filename:"script.tsx",presets:[["env",{modules:!1,...m}],["typescript",d],["react",f]],...n}).code}},extensions:["es","babel"],editor:"script",editorLanguage:"typescript"};var pt={name:"css",title:"CSS",info:!1,parser:{name:"css",pluginUrls:[r.postcss]},compiler:{factory:()=>async e=>e},extensions:["css"],editor:"style"};var lt={name:"haml",title:"Haml",compiler:{url:i+"clientside-haml-js/haml.js",factory:(e,t)=>(self.importScripts(t+"lang-haml-compiler.839d8458e3b9491e00d5abbc03a1abf2.js"),self.createHamlCompiler())},extensions:["haml"],editor:"markup"};var mt={name:"html",title:"HTML",info:!1,parser:{name:"html",pluginUrls:[r.html]},compiler:{factory:()=>async e=>e},extensions:["html","htm"],editor:"markup"};var ut={name:"javascript",title:"JS",longTitle:"JavaScript",info:!1,parser:{name:"babel",pluginUrls:[r.babel,r.html]},compiler:{factory:()=>async e=>e},extensions:["js"],editor:"script"};var gt={name:"jsx",title:"JSX",parser:{name:"babel",pluginUrls:[r.babel,r.html]},compiler:"typescript",extensions:["jsx"],editor:"script",editorLanguage:"javascript"};var dt={name:"tsx",title:"TSX",parser:{name:"babel-ts",pluginUrls:[r.babel,r.html]},compiler:"typescript",extensions:["tsx"],editor:"script",editorLanguage:"typescript"};var ft={name:"less",title:"Less",parser:{name:"less",pluginUrls:[r.postcss]},compiler:{url:i+"less/less.js",factory:()=>async(e,{config:t})=>(await window.less.render(e,{...g("less",t)})).css},extensions:["less"],editor:"style"};var yt={name:"markdown",title:"Markdown",parser:{name:"markdown",pluginUrls:[r.markdown,r.html]},compiler:{url:de,factory:()=>async(e,{config:t})=>window.marked.parse(e,{...g("markdown",t)})},extensions:["md","markdown","mdown","mkdn"],editor:"markup"};var q=e=>typeof e=="string"?{code:e,info:{}}:e;var B=async(e,t,n,m={},d=self)=>new Promise(f=>{if(!e||!t||!n)return f(q(""));let s=async function(o){let c=o.data.payload;o.data.trigger==="compileInCompiler"&&c?.content===e&&c?.language===t&&(d.removeEventListener("message",s),f(q(c.compiled)))};d.addEventListener("message",s),d.postMessage({type:"compileInCompiler",payload:{content:e,language:t,config:n,options:m}})});var ht=async(e,{config:t,worker:n})=>new Promise(async m=>{if(!e)return m("");let[d,{default:f}]=await Promise.all([import(i+"mdx/mdx.js"),import(i+"remark-gfm/remark-gfm.js")]),s=(await d.compile(e,{remarkPlugins:[f],...g("mdx",t)})).value,c=(v=>v.replace(/, {[^}]*} = _components/g,"").replace(/const {[^:]*} = props.components[^;]*;/g,""))(s),a=`import React from "react";
import { createRoot } from "react-dom/client";
${M(c,!1)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`,u=(await B(a,"jsx",t,{},n)).code;m(`<div id="__livecodes_mdx_root__"></div><script type="module">${u}<\/script>`)}),xt={name:"mdx",title:"MDX",parser:{name:"markdown",pluginUrls:[r.markdown,r.html]},compiler:{factory:()=>async e=>e,runOutsideWorker:ht,compiledCodeLanguage:"javascript"},extensions:["mdx"],editor:"markup",editorLanguage:"markdown"};var bt={name:"pug",title:"Pug",compiler:{url:i+"pug/pug.min.js",factory:(e,t)=>(self.importScripts(t+"lang-pug-compiler.61645362532461bc77195784b673d3fd.js"),self.createPugCompiler())},extensions:["pug","jade"],editor:"markup"};var vt={name:"scss",title:"SCSS",parser:{name:"scss",pluginUrls:[r.postcss]},compiler:{url:i+"sass/sass.js",factory:(e,t)=>(self.importScripts(t+"lang-scss-compiler.142208576c5da932631999efaf07ffaa.js"),self.createScssCompiler())},extensions:["scss"],editor:"style"};var wt={name:"svelte",title:"Svelte",parser:{name:"html",pluginUrls:[r.html,r.babel]},compiler:{url:j+"compiler/index.js",factory:(e,t)=>(self.importScripts(t+"lang-svelte-compiler.e2fb6a56e76fa752acad8b414b8094c4.js"),self.createSvelteCompiler()),imports:{svelte:j+"src/index-client.js","svelte/animate":j+"src/animate/index.js","svelte/easing":j+"src/easing/index.js","svelte/internal":j+"src/internal/index.js","svelte/internal/client":j+"src/internal/client/index.js","svelte/internal/disclose-version":j+"src/internal/disclose-version.js","svelte/internal/flags/legacy":j+"src/internal/flags/legacy.js","svelte/internal/server":j+"src/internal/server/index.js","svelte/legacy":j+"src/legacy/legacy-client.js","svelte/motion":j+"src/motion/index.js","svelte/reactivity":j+"src/reactivity/index-client.js","svelte/reactivity/window":j+"src/reactivity/window/index.js","svelte/server":j+"src/server/index.js","svelte/store":j+"src/store/index-client.js","svelte/transition":j+"src/transition/index.js","svelte/events":j+"src/events/index.js","esm-env":"https://esm.sh/esm-env"},inlineScript:'globalThis.process = { env: { NODE_ENV: "production" } };'},extensions:["svelte"],editor:"script",editorLanguage:"html"};var St={name:"stylus",title:"Stylus",compiler:{url:i+"stylus/stylus.min.js",factory:()=>async e=>window.stylus.render(e)},extensions:["styl"],editor:"style"};var jt=(e,t)=>{let n={...g("typescript",t),...g(t.script.language,t)};return!!(n.jsx||n.jsxFactory||new RegExp(/\/\*\*[\s\*]*@jsx\s/g).test(e))},X={target:"es2020",jsx:"react",allowUmdGlobalAccess:!0,esModuleInterop:!0},Lt={name:"typescript",title:"TS",longTitle:"TypeScript",parser:{name:"babel-ts",pluginUrls:[r.babel,r.html]},compiler:{url:je,factory:()=>async(e,{config:t})=>window.ts.transpile(e,{...X,...["jsx","tsx"].includes(t.script.language)&&!jt(e,t)?{jsx:"react-jsx"}:{},...g("typescript",t),...g(t.script.language,t)})},extensions:["ts","typescript"],editor:"script"};var Ut=i+"vue-compiler-sfc/vue-compiler-sfc.js",Ct={name:"vue",title:"Vue 3",longTitle:"Vue 3 SFC",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:Ut,factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.e2a6e6c5f5e485de819094519f323035.js"),self.createVueCompiler()),imports:{vue:Ue,"livecodes/vue":Ce}},extensions:["vue","vue3"],editor:"script",editorLanguage:"html"};var Pt=Pe+"vue2-sfc-loader.js",kt={name:"vue2",title:"Vue 2",longTitle:"Vue 2 SFC",parser:{name:"html",pluginUrls:[r.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue2-compiler.2d2475df1b43d5e55d4fc370f48899d2.js"),self.createVue2Compiler()),scripts:[G,Pt],imports:{vue:G+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue2"],editor:"script",editorLanguage:"html"};var Tt={name:"stencil",title:"Stencil",parser:{name:"babel-ts",pluginUrls:[r.babel,r.html]},compiler:{url:we,factory:()=>async(e,{config:t})=>(await window.stencil.transpile(e,{sourceMap:!1,target:"es2019",...g("stencil",t)})).code,types:{"@stencil/core":{url:i+"types/stencil-core.d.ts",declareAsModule:!1}}},extensions:["stencil.tsx"],editor:"script",editorLanguage:"typescript"};var _t={name:"livescript",title:"LiveScript",compiler:{url:i+"livescript/livescript-min.js",factory:()=>async(e,{config:t})=>window.require("livescript").compile(e,{bare:!0,...g("livescript",t)}),scripts:[i+"livescript/prelude-browser-min.js"]},extensions:["ls"],editor:"script"};var Et=i+"assemblyscript/assemblyscript.js",At={name:"assemblyscript",title:"AS",longTitle:"AssemblyScript",parser:{name:"babel-ts",pluginUrls:[r.babel]},compiler:{url:Et,factory:(e,t)=>(self.importScripts(t+"lang-assemblyscript-compiler.14e8b2e5f7646f2a3f66fe301f2b95f8.js"),self.createAssemblyscriptCompiler()),scripts:({baseUrl:e})=>[ie,e+"lang-assemblyscript-script.bc1d8b506b4f8cae0a57028a76574d4b.js"],scriptType:"application/wasm-uint8",compiledCodeLanguage:"wat",types:{assemblyscript:{url:i+"types/assemblyscript.d.ts",declareAsModule:!1,autoload:!0}}},extensions:["as","ts"],editor:"script",editorLanguage:"typescript"};var Mn=D+"brython.min.js",qn=D+"brython_stdlib.js";var It=(e,t={})=>Array.from(new Set([...e.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map(n=>n[1]).map(n=>n.split("/")[0]).filter(n=>t.hasOwnProperty(n)||n!=="opal").map(n=>t[n]||`${R+n}.min.js`))),Bt={name:"ruby",title:"Ruby",compiler:{url:R+"opal.min.js",factory:()=>(importScripts(R+"opal-parser.min.js"),self.Opal.config.unsupported_features_severity="ignore",self.Opal.load("opal-parser"),async(e,{config:t})=>{let{autoloadStdlib:n,requireMap:m,...d}=g("ruby",t),f=e.includes("$0")?`$0 = __FILE__
`:"";return self.Opal.compile(f+e,d)}),scripts:({compiled:e,config:t})=>{let{autoloadStdlib:n,requireMap:m}=g("ruby",t),d=It(e,m),f=n!==!1?d:[];return[R+"opal.min.js",...f]}},extensions:["rb"],editor:"script"};var Rt={name:"php",title:"PHP",parser:{name:"php",pluginUrls:[r.php]},compiler:{factory:()=>async e=>(e=e.trim(),e.startsWith("<?php")&&(e=e.replace("<?php","/* <?php */"),e.endsWith("?>")&&(e=e.replace("?>","/* ?> */"))),e),scripts:[Le],deferScripts:!0,scriptType:"text/x-uniter-php",compiledCodeLanguage:"php"},extensions:["php"],editor:"script"};var ri=i+"lua-fmt/lua-fmt.js";var W=()=>{let e=he;return self.importScripts(e),async t=>({formatted:window.parinfer.parenMode(t).text,cursorOffset:0})};var Mt={name:"solid",title:"Solid",parser:{name:"babel",pluginUrls:[r.babel,r.html]},compiler:{dependencies:["babel"],url:i+"babel-preset-solid/babel-preset-solid.js",factory:(e,t)=>(self.importScripts(t+"lang-solid-compiler.6ade5d553f3b537b0bbb98d536f2c513.js"),self.createSolidCompiler())},extensions:["solid.jsx"],editor:"script",editorLanguage:"javascript"};var qt={name:"solid.tsx",title:"Solid (TS)",parser:{name:"babel-ts",pluginUrls:[r.babel,r.html]},compiler:"solid",extensions:["solid.tsx"],editor:"script",editorLanguage:"typescript"};var Ot={name:"liquid",title:"Liquid",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:ue,factory:(e,t)=>(self.importScripts(t+"lang-liquid-compiler.393ead92b46cb0179f641adb899644b0.js"),self.createLiquidCompiler())},extensions:["liquid","liquidjs"],editor:"markup",editorLanguage:"html"};var $t={name:"ejs",title:"EJS",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:le,factory:(e,t)=>(self.importScripts(t+"lang-ejs-compiler.76c23bffb3766c76e7a8c72b445ed620.js"),self.createEjsCompiler())},extensions:["ejs"],editor:"markup",editorLanguage:"html"};var Wt=H+"handlebars.min.js",Wi=H+"handlebars.runtime.min.js",Ft={name:"handlebars",title:"Handlebars",parser:{name:"glimmer",pluginUrls:[r.glimmer]},compiler:{url:Wt,factory:(e,t)=>(self.importScripts(t+"lang-handlebars-compiler.4dbe03f99f348c3c3061bd45d76010c0.js"),self.createHandlebarsCompiler())},extensions:["hbs","handlebars"],editor:"markup",editorLanguage:"html"};var Dt={name:"dot",title:"doT",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:pe,factory:(e,t)=>(self.importScripts(t+"lang-dot-compiler.787b3a4d145ce986b7bd6479773a624f.js"),self.createDotCompiler())},extensions:["dot"],editor:"markup",editorLanguage:"html"};var Nt=z+"nunjucks.min.js",Xi=z+"nunjucks-slim.min.js",Ht={name:"nunjucks",title:"Nunjucks",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:Nt,factory:(e,t)=>(self.importScripts(t+"lang-nunjucks-compiler.d51e446e2426ab0a50408586772c0a7c.js"),self.createNunjucksCompiler())},extensions:["njk","nunjucks"],editor:"markup",editorLanguage:"html"};var Jt={name:"go",title:"Go",formatter:{factory:()=>(importScripts(A+"go2js-format.js"),async e=>{if(!e)return{formatted:"",cursorOffset:0};let[t,n]=globalThis.go2jsFormat(e);return n?(console.error(n),{formatted:e,cursorOffset:0}):{formatted:t,cursorOffset:0}})},compiler:{url:A+"go2js-compile.js",factory:()=>e=>new Promise(t=>{if(!e){t("");return}let n=A.endsWith("/")?A.slice(0,-1):A;globalThis.go2jsCompile(e,n,(m,d)=>{m?(console.error(m),t("")):t(d)})})},extensions:["go","golang"],editor:"script"};var xa=i+"wast-refmt/wast-refmt.js";var zt=K+"riot+compiler.min.js",Kt=K+"riot.min.js",Vt={name:"riot",title:"Riot.js",parser:{name:"html",pluginUrls:[r.html,r.babel]},compiler:{url:zt,factory:(e,t)=>(self.importScripts(t+"lang-riot-compiler.aff779c7db3cab29b2ad2eae5f127d39.js"),self.createRiotCompiler()),scripts:[Kt],scriptType:"module"},extensions:["riot","riotjs"],editor:"script",editorLanguage:"html"};var Gt="application/json",Zt={name:"sql",title:"SQL",formatter:{factory:()=>(importScripts(V),async e=>({formatted:await self.sqlFormatter.format(e,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{url:ve+"sql-wasm.js",factory:(e,t)=>(self.importScripts(t+"lang-sql-compiler.a6b88143b0889ab64f4e16a422f9ee5c.js"),self.createSqlCompiler()),scripts:({baseUrl:e})=>[e+"lang-sql-script.2b9c2dab7239386f868ee1b40c442d4e.js"],scriptType:Gt,compiledCodeLanguage:"json"},extensions:["sql","sqlite","sqlite3"],editor:"script"};var Ne=i+"react-native-web/react-native-web.js",Xt={name:"react-native",title:"RN",longTitle:"React Native",parser:{name:"babel",pluginUrls:[r.babel,r.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:n})=>window.ts.transpile(e,{...X,jsx:"react-jsx",...g("typescript",t),...g(n,t)}),imports:{react:Ne,"react-native":Ne}},extensions:["react-native.jsx"],editor:"script",editorLanguage:"javascript"};var Qt={name:"react-native-tsx",title:"RN (TSX)",longTitle:"React Native (TSX)",parser:{name:"babel-ts",pluginUrls:[r.babel,r.html]},compiler:"react-native",extensions:["react-native.tsx"],editor:"script",editorLanguage:"typescript"};var Yt={name:"twig",title:"Twig",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:Se,factory:(e,t)=>(self.importScripts(t+"lang-twig-compiler.ed89f9f78311b48e27359c1852c0d9b9.js"),self.createTwigCompiler())},extensions:["twig"],editor:"markup",editorLanguage:"html"};var er=ae+"compiler.min.js",tr={name:"astro",title:"Astro",parser:{name:"html",pluginUrls:[r.html,r.babel]},compiler:{url:er,factory:(e,t)=>(self.importScripts(t+"lang-astro-compiler.7ff65b0f2cd081b1782a8a4a09c99811.js"),self.createAstroCompiler())},extensions:["astro"],editor:"markup"};var rr={name:"malina",title:"Malina.js",parser:{name:"html",pluginUrls:[r.html,r.babel]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-malina-compiler.68e40c9a5acb152a9140c79588010530.js"),self.createMalinaCompiler()),imports:{"malinajs/runtime.js":`${ge}runtime.js`}},extensions:["xht"],editor:"script",editorLanguage:"html"};var ic=i+"jscpp/JSCPP.es5.min.js";var sr={name:"clio",title:"Clio",compiler:{url:N+"compile.js",factory:(e,t)=>(self.importScripts(t+"lang-clio-compiler.39359acd089dc1311577d3a39313905b.js"),self.createClioCompiler()),scripts:[N+"exec.js"]},extensions:["clio"],editor:"script",editorLanguage:"coffeescript"};var or=async(e,{baseUrl:t,config:n})=>{let{diagramsCompiler:m}=await import(t+"lang-diagrams-compiler-esm.73b6481d789c092d805712b6faf1c7fd.js");return m(e,{config:n})},nr={name:"diagrams",title:"Diagrams",parser:{name:"html",pluginUrls:[r.html]},compiler:{factory:()=>async e=>e||"",runOutsideWorker:or},extensions:["diagrams","diagram","graph","plt"],editor:"markup",editorLanguage:"html"};var ir={name:"imba",title:"Imba",compiler:{url:J+"compiler.js",factory:(e,t)=>(self.importScripts(t+"lang-imba-compiler.c5c7b69434893c97f82c4b3e8be7af1e.js"),self.createImbaCompiler()),imports:{imba:J+"imba.mjs"}},extensions:["imba"],editor:"script"};var ar={name:"mustache",title:"Mustache",parser:{name:"glimmer",pluginUrls:[r.glimmer]},compiler:{url:ye,factory:(e,t)=>(self.importScripts(t+"lang-mustache-compiler.a424c09f7c71713de83052878738af3a.js"),self.createMustacheCompiler())},extensions:["mustache"],editor:"markup",editorLanguage:"html"};var cr={name:"art-template",title:"art",longTitle:"art-template",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:ne,factory:(e,t)=>(self.importScripts(t+"lang-art-template-compiler.f7f28bfde1988e977306171ed26474d0.js"),self.createArtTemplateCompiler())},extensions:["art","art-template"],editor:"markup",editorLanguage:"html"};var tp=i+"civet/civet.js";var lr={name:"flow",title:"Flow",parser:{name:"babel-flow",pluginUrls:[r.babel,r.html]},compiler:{url:i+"flow-remove-types/flow-remove-types.js",factory:()=>async(e,{config:t})=>window.flowRemoveTypes.transpile(e,{all:!0,...g("flow",t)}).toString()},extensions:["flow"],editor:"script",editorLanguage:"typescript"};var mr={name:"mjml",title:"MJML",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:fe,factory:()=>async(e,{config:t})=>{if(!e.trim())return"";let{html:n,errors:m}=self.mjml(e,g("mjml",t));return m?.forEach(d=>{console.warn(d.formattedMessage)}),n}},extensions:["mjml"],editor:"markup",editorLanguage:"xml"};var ur={name:"sucrase",title:"Sucrase",parser:{name:"babel",pluginUrls:[r.babel,r.html]},compiler:{url:i+"sucrase/sucrase.js",factory:()=>async(e,{config:t})=>window.sucrase.transform(e,{transforms:["jsx","typescript"],...g("sucrase",t)}).code},extensions:["sucrase"],editor:"script",editorLanguage:"typescript"};var gr={name:"eta",title:"Eta",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:me,factory:(e,t)=>(self.importScripts(t+"lang-eta-compiler.784e346037787c2e491855cecb47cf18.js"),self.createEtaCompiler())},extensions:["eta"],editor:"markup",editorLanguage:"html"};var dr={name:"clojurescript",title:"CLJS (cherry)",longTitle:"ClojureScript (cherry)",formatter:{factory:W},compiler:{url:$+"lib/cherry.umd.js",factory:()=>async(e,{config:t,options:n})=>{let m=self.CherryCljs.compileString(e);return e.includes("#jsx")?(await B(m,"jsx",t,n)).code:m},imports:{"cherry-cljs":$+"index.js","cherry-cljs/cljs.core.js":$+"cljs.core.js","cherry-cljs/lib/clojure.string.js":"lib/clojure.string.js","cherry-cljs/lib/clojure.set.js":"lib/clojure.set.js","cherry-cljs/lib/clojure.walk.js":"lib/clojure.walk.js","squint-cljs":I+"index.js","squint-cljs/core.js":I+"core.js","squint-cljs/string.js":I+"string.js","squint-cljs/src/squint/string.js":I+"src/squint/string.js","squint-cljs/src/squint/set.js":I+"src/squint/set.js"}},extensions:["cljs","clj","cljc","edn","clojure"],editor:"script",editorLanguage:"clojure"};var fr={name:"php-wasm",title:"PHP (Wasm)",parser:{name:"php",pluginUrls:[r.php]},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[i+"php-wasm/php-wasm.js",e+"lang-php-wasm-script.94b7508d299d33857fb195f7a1adb898.js"],scriptType:"text/php-wasm",compiledCodeLanguage:"php"},extensions:["wasm.php","phpwasm"],editor:"script",editorLanguage:"php"};var yr={name:"bbcode",title:"BBCode",compiler:{url:i+"bbob/bbob.js",factory:()=>async e=>self.BBob.bbobHTML(e,self.BBob.presetHTML5())},extensions:["bbcode","bb"],editor:"markup"};var hr={name:"vento",title:"Vento",parser:{name:"html",pluginUrls:[r.html]},compiler:{url:i+"vento/vento.js",factory:(e,t)=>(self.importScripts(t+"lang-vento-compiler.8211cabadbe317216e49ab143add3dae.js"),self.createVentoCompiler())},extensions:["vto","vento"],editor:"markup",editorLanguage:"html"};var xr={name:"react",title:"React",parser:{name:"babel",pluginUrls:[r.babel,r.html]},compiler:{dependencies:["babel"],url:i+"babel-plugin-react-compiler/babel-plugin-react-compiler.js",factory:()=>async(e,{config:t,language:n})=>{let m=g("babel",t),d=g("@babel/preset-env",t),f=g("@babel/preset-typescript",t),s=g("@babel/preset-react",t),o=g("babel-plugin-react-compiler",t);return window.Babel.transform(e,{filename:"script.tsx",presets:[["env",{modules:!1,...d}],...n==="react-tsx"?["typescript",f]:[],["react",{runtime:"automatic",...s}]],plugins:[[window.reactCompiler.reactCompiler,o]],...m}).code}},extensions:["react.jsx","react-jsx"],editor:"script",editorLanguage:"javascript"};var br={name:"react-tsx",title:"React (TSX)",parser:{name:"babel-ts",pluginUrls:[r.babel,r.html]},compiler:"react",extensions:["react.tsx"],editor:"script",editorLanguage:"typescript"};var O=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost")));var Q=nt(Je());var ze="https://dpaste.com/",jr="https://dpaste.com/api/v2/",Ke="https://api2.livecodes.io/share",Ve={getProject:async e=>{try{let t=await fetch(ze+e+".txt");return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{try{let t=await fetch(jr,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return t.ok?(await t.text()).replace(ze,""):""}catch{return""}}},Lr={getProject:async e=>{if(e.length<11)return Ve.getProject(e);if(!O())return{};try{let t=await fetch(Ke+"?id="+e);return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{if(!O())return"";try{let t=await fetch(Ke,{method:"POST",mode:"cors",body:JSON.stringify(e)});return t.ok?t.text():""}catch{return""}}},od=O()?Lr:Ve;var Ge=e=>!e.startsWith("https://")&&!e.startsWith("http://")&&!e.startsWith(".")&&!e.startsWith("/")&&!e.startsWith("data:")&&!e.startsWith("blob:");var Ur=/(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g;var Ze=(e,t)=>e.replace(new RegExp(Ur),(n,m,d)=>{if(t?.some(c=>typeof c=="string"&&c===m||typeof c=="object"&&new RegExp(c).test(m)))return n;let f=m.replace(/"/g,"").replace(/'/g,"").replace(/url\(/g,"").replace(/\)/g,""),s='@import "'+k.getUrl(f)+'";',o=d?.trim();return Ge(f)?o?`@media ${o} {
${s}
}`:s:n});var Xe=e=>E.find(t=>t.name===e);self.createPostcssCompiler=()=>{let e={from:void 0},t={},n=(s,o)=>{let c=Xe(s);if(!(!c||t[s]!=null))try{c.compiler.url&&self.importScripts(Te(c.compiler.url,o)),t[s]=c.compiler.factory}catch{throw new Error("Failed to load PostCSS plugin: "+s)}},m=s=>{let o=s.processors.filter(a=>Xe(a)?.isPostcssPlugin),c=a=>Z(a,s)&&o.includes(a);return E.map(a=>a.name).filter(c)},d=(s,o,c)=>{let a=m(s);return a.forEach(u=>n(u,o)),E.filter(u=>a.includes(u.name)).map(u=>t[u.name]?.(s,o,c)).flat()},f=s=>M(Ze(s),!1);return async function(o,{config:c,baseUrl:a,options:u}){if(!c||!a)return{code:o,info:{}};let v=d(c,a,u);return m(c).includes("tokencss")&&(o=`@inject "tokencss:base";
`+o),{code:(await self.postcss.postcss(v).process(f(o),e)).css,info:u.compileInfo||{}}}};})();
