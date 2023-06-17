var bo=Object.create;var ce=Object.defineProperty;var wo=Object.getOwnPropertyDescriptor;var So=Object.getOwnPropertyNames;var vo=Object.getPrototypeOf,Lo=Object.prototype.hasOwnProperty;var ko=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var jo=(e,t,r,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of So(t))!Lo.call(e,u)&&u!==r&&ce(e,u,{get:()=>t[u],enumerable:!(c=wo(t,u))||c.enumerable});return e};var Co=(e,t,r)=>(r=e!=null?bo(vo(e)):{},jo(t||!e||!e.__esModule?ce(r,"default",{value:e,enumerable:!0}):r,e));var co=ko((rm,z)=>{var lo=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",c={};function u(s,n){if(!c[s]){c[s]={};for(var d=0;d<s.length;d++)c[s][s.charAt(d)]=d}return c[s][n]}var h={compressToBase64:function(s){if(s==null)return"";var n=h._compress(s,6,function(d){return t.charAt(d)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(s){return s==null?"":s==""?null:h._decompress(s.length,32,function(n){return u(t,s.charAt(n))})},compressToUTF16:function(s){return s==null?"":h._compress(s,15,function(n){return e(n+32)})+" "},decompressFromUTF16:function(s){return s==null?"":s==""?null:h._decompress(s.length,16384,function(n){return s.charCodeAt(n)-32})},compressToUint8Array:function(s){for(var n=h.compress(s),d=new Uint8Array(n.length*2),p=0,m=n.length;p<m;p++){var b=n.charCodeAt(p);d[p*2]=b>>>8,d[p*2+1]=b%256}return d},decompressFromUint8Array:function(s){if(s==null)return h.decompress(s);for(var n=new Array(s.length/2),d=0,p=n.length;d<p;d++)n[d]=s[d*2]*256+s[d*2+1];var m=[];return n.forEach(function(b){m.push(e(b))}),h.decompress(m.join(""))},compressToEncodedURIComponent:function(s){return s==null?"":h._compress(s,6,function(n){return r.charAt(n)})},decompressFromEncodedURIComponent:function(s){return s==null?"":s==""?null:(s=s.replace(/ /g,"+"),h._decompress(s.length,32,function(n){return u(r,s.charAt(n))}))},compress:function(s){return h._compress(s,16,function(n){return e(n)})},_compress:function(s,n,d){if(s==null)return"";var p,m,b={},L={},S="",j="",v="",k=2,T=3,x=2,w=[],a=0,i=0,C;for(C=0;C<s.length;C+=1)if(S=s.charAt(C),Object.prototype.hasOwnProperty.call(b,S)||(b[S]=T++,L[S]=!0),j=v+S,Object.prototype.hasOwnProperty.call(b,j))v=j;else{if(Object.prototype.hasOwnProperty.call(L,v)){if(v.charCodeAt(0)<256){for(p=0;p<x;p++)a=a<<1,i==n-1?(i=0,w.push(d(a)),a=0):i++;for(m=v.charCodeAt(0),p=0;p<8;p++)a=a<<1|m&1,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=m>>1}else{for(m=1,p=0;p<x;p++)a=a<<1|m,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=0;for(m=v.charCodeAt(0),p=0;p<16;p++)a=a<<1|m&1,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=m>>1}k--,k==0&&(k=Math.pow(2,x),x++),delete L[v]}else for(m=b[v],p=0;p<x;p++)a=a<<1|m&1,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=m>>1;k--,k==0&&(k=Math.pow(2,x),x++),b[j]=T++,v=String(S)}if(v!==""){if(Object.prototype.hasOwnProperty.call(L,v)){if(v.charCodeAt(0)<256){for(p=0;p<x;p++)a=a<<1,i==n-1?(i=0,w.push(d(a)),a=0):i++;for(m=v.charCodeAt(0),p=0;p<8;p++)a=a<<1|m&1,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=m>>1}else{for(m=1,p=0;p<x;p++)a=a<<1|m,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=0;for(m=v.charCodeAt(0),p=0;p<16;p++)a=a<<1|m&1,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=m>>1}k--,k==0&&(k=Math.pow(2,x),x++),delete L[v]}else for(m=b[v],p=0;p<x;p++)a=a<<1|m&1,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=m>>1;k--,k==0&&(k=Math.pow(2,x),x++)}for(m=2,p=0;p<x;p++)a=a<<1|m&1,i==n-1?(i=0,w.push(d(a)),a=0):i++,m=m>>1;for(;;)if(a=a<<1,i==n-1){w.push(d(a));break}else i++;return w.join("")},decompress:function(s){return s==null?"":s==""?null:h._decompress(s.length,32768,function(n){return s.charCodeAt(n)})},_decompress:function(s,n,d){var p=[],m,b=4,L=4,S=3,j="",v=[],k,T,x,w,a,i,C,y={val:d(0),position:n,index:1};for(k=0;k<3;k+=1)p[k]=k;for(x=0,a=Math.pow(2,2),i=1;i!=a;)w=y.val&y.position,y.position>>=1,y.position==0&&(y.position=n,y.val=d(y.index++)),x|=(w>0?1:0)*i,i<<=1;switch(m=x){case 0:for(x=0,a=Math.pow(2,8),i=1;i!=a;)w=y.val&y.position,y.position>>=1,y.position==0&&(y.position=n,y.val=d(y.index++)),x|=(w>0?1:0)*i,i<<=1;C=e(x);break;case 1:for(x=0,a=Math.pow(2,16),i=1;i!=a;)w=y.val&y.position,y.position>>=1,y.position==0&&(y.position=n,y.val=d(y.index++)),x|=(w>0?1:0)*i,i<<=1;C=e(x);break;case 2:return""}for(p[3]=C,T=C,v.push(C);;){if(y.index>s)return"";for(x=0,a=Math.pow(2,S),i=1;i!=a;)w=y.val&y.position,y.position>>=1,y.position==0&&(y.position=n,y.val=d(y.index++)),x|=(w>0?1:0)*i,i<<=1;switch(C=x){case 0:for(x=0,a=Math.pow(2,8),i=1;i!=a;)w=y.val&y.position,y.position>>=1,y.position==0&&(y.position=n,y.val=d(y.index++)),x|=(w>0?1:0)*i,i<<=1;p[L++]=e(x),C=L-1,b--;break;case 1:for(x=0,a=Math.pow(2,16),i=1;i!=a;)w=y.val&y.position,y.position>>=1,y.position==0&&(y.position=n,y.val=d(y.index++)),x|=(w>0?1:0)*i,i<<=1;p[L++]=e(x),C=L-1,b--;break;case 2:return v.join("")}if(b==0&&(b=Math.pow(2,S),S++),p[C])j=p[C];else if(C===L)j=T+T.charAt(0);else return null;v.push(j),p[L++]=T+j.charAt(0),b--,T=j,b==0&&(b=Math.pow(2,S),S++)}}};return h}();typeof define=="function"&&define.amd?define(function(){return lo}):typeof z<"u"&&z!=null&&(z.exports=lo)});var me=["jspm","skypack"],de=["unpkg","jsdelivr"],ue=["jsdelivr.gh","statically"],P={getModuleUrl:(e,{isModule:t=!0,defaultCDN:r="jspm"}={})=>{e=e.replace(/#nobundle/g,"");let c=pe(e,t,r);return c||(t?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,t)=>e.startsWith("http")?e:pe(e,!1,t||fe())||e,cdnLists:{npm:de,module:me,gh:ue},checkCDNs:async(e,t)=>{let r=[t,...P.cdnLists.npm].filter(Boolean);for(let c of r)try{if((await fetch(P.getUrl(e,c),{method:"HEAD"})).ok)return c}catch{}return P.cdnLists.npm[0]}},fe=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||P.cdnLists.npm[0]}catch{return P.cdnLists.npm[0]}},pe=(e,t,r)=>{let c=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",ue[0]):e.includes(":")||(e=(r||(t?me[0]:de[0]))+":"+e);for(let u of Uo){let[h,s]=u;if(h.test(e))return e.replace(h,s)+c}return null},Uo=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:f,getModuleUrl:xr}=P,l=f("@live-codes/browser-compilers@0.7.4/dist/");var ge=f("art-template@4.13.2/lib/template-web.js"),ye=f("@asciidoctor/core@2.2.6/dist/browser/asciidoctor.js"),he=f("@assemblyscript/loader@0.27.5/umd/index.js");var xe=f("@hatemhosny/astro-internal@0.0.4/");var be=f("@babel/standalone@7.22.4/babel.js"),we=f("biwascheme@0.8.0/release/biwascheme.js"),Se=f("blockly@9.3.3/"),X=f("brython@3.11.2/");var $=f("cherry-cljs@0.0.4/");var K=f("@live-codes/clio-browser-compiler@0.0.3/public/build/"),ve=f("coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js");var Le=f("dot@1.1.3/doT.js"),ke=f("ejs@3.1.9/ejs.js");var je=f("eta@2.2.0/dist/eta.umd.js");var W=f("@live-codes/go2js@0.4.0/build/");var V=f("handlebars@4.7.7/dist/");var G=f("imba@2.0.0-alpha.229/dist/");var Ce=f("gh:jscl-project/jscl-project.github.io@efd3aecdba496d132ed650b7b5be976fd0ca278f/jscl.js");var Ue=f("liquidjs@10.8.2/dist/liquid.browser.min.js");var E=f("fengari-web@0.1.4/dist/fengari-web.js");var Z="0.6.64",br=f(`malinajs@${Z}/malina.js`),_e=f("marked@5.0.4/marked.min.js");var Te=f("mjml-browser@4.14.1/lib/index.js");var Pe=f("mustache@4.2.0/mustache.js");var Y=f("nunjucks@3.2.4/browser/"),R=f("https://cdn.opalrb.com/opal/1.7.3/"),Ee=f("parinfer@3.13.1/parinfer.js");var M=f("prettier@2.5.1/"),Me=f("@prettier/plugin-php@0.18.0/standalone.js");var Ae=f("requirejs@2.3.6/require.js");var Q=f("riot@7.1.0/");var Oe=f("sql-formatter@12.2.1/dist/sql-formatter.min.js"),Re=f("sql.js@1.8.0/dist/"),Ie=f("@stencil/core@3.2.2/compiler/stencil.js"),Be=f("stylis@4.2.0/dist/umd/stylis.js");var U=f("tau-prolog@0.3.4/modules/");var Ne=f("twig@1.16.0/twig.min.js"),qe=f("typescript@5.1.3/lib/typescript.js"),De=f("uniter@2.18.0/dist/uniter.js");var ee=f("vue@3"),te=f("vue@2"),H=f("vue3-sfc-loader@0.8.4/dist/"),Fe=f("wabt@1.0.32/index.js");var oe=(e,t=!0)=>e.replace(/\\/g,t?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var g=(e,t)=>({...t.customSettings[e]});var _o={name:"lightningcss",title:"Lightning CSS",isPostcssPlugin:!1,compiler:{url:l+"lightningcss/lightningcss.js",factory:(e,t)=>(self.importScripts(t+"processor-lightningcss-compiler.c9a8575d1089c28538780ba5ba130cb2.js"),self.createLightningcssCompiler())},editor:"style"};var To={name:"postcss",title:"Processors:",isPostcssPlugin:!1,compiler:{url:l+"postcss/postcss.js",factory:(e,t)=>(self.importScripts(t+"processor-postcss-compiler.f8787bd5395ada95f6d40279daf71948.js"),self.createPostcssCompiler())},editor:"style",hidden:!0};var Po={name:"autoprefixer",title:"Autoprefixer",isPostcssPlugin:!0,compiler:{url:l+"autoprefixer/autoprefixer.js",factory:e=>self.autoprefixer.autoprefixer({...g("autoprefixer",e)})},editor:"style"},Eo={name:"cssnano",title:"cssnano",isPostcssPlugin:!0,compiler:{url:l+"cssnano/cssnano.js",factory:()=>{let e=self.cssnano.cssnanoPresetDefault().plugins,t=[];for(let r of e){let[c,u]=r;(typeof u>"u"||typeof u=="object"&&!u.exclude||typeof u=="boolean"&&u===!0)&&t.push(c(u))}return t}},editor:"style"};var Mo={name:"postcssPresetEnv",title:"Preset Env",isPostcssPlugin:!0,compiler:{url:l+"postcss-preset-env/postcss-preset-env.js",factory:e=>self.postcssPresetEnv.postcssPresetEnv({autoprefixer:!1,...g("postcssPresetEnv",e)})},editor:"style"},Ao={name:"purgecss",title:"PurgeCSS",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:l+"purgecss/purgecss.js",factory:(e,t,r)=>self.purgecss.purgecss({...g("purgecss",e),content:[{raw:`<template>${r.html}
<script>${e.script.content}<\/script></template>`,extension:"html"}]})},editor:"style"},Oo={name:"tokencss",title:"Token CSS",isPostcssPlugin:!0,compiler:{url:l+"tokencss/tokencss.js",factory:e=>{let t=g("tokencss",e);Object.keys(t).length===0&&(t.$schema="https://tokencss.com/schema@0.0.1",t.extends="@tokencss/core/preset");let r=(u,h)=>{let s=JSON.parse(JSON.stringify(u));return Object.keys(h).forEach(n=>{s[n]=typeof h[n]!="object"||Array.isArray(h[n])?h[n]:{...s[n],...h[n]}}),s},c=t.extends?.includes("@tokencss/core/preset")?r(self.tokencss.preset,t):t;return self.tokencss.tokencss({config:c})}},editor:"style"},Ro={name:"cssmodules",title:"CSS Modules",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:l+"postcss-modules/postcss-modules.js",factory:(e,t,r)=>{let c=g("cssmodules",e);return self.postcssModules.postcssModules({localsConvention:"camelCase",...c,getJSON(u,h,s){let n=c.addClassesToHTML!==!1,d=c.removeOriginalClasses===!0;n&&(r.html=self.postcssModules.addClassesToHtml(r.html,h,d)),r.compileInfo={...r.compileInfo,cssModules:h,...n?{modifiedHTML:r.html}:{}}}})}},editor:"style"};var Io={name:"unocss",title:"UnoCSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:l+"unocss/unocss.js",factory:(e,t)=>(self.importScripts(t+"processor-unocss-compiler.aabd93b3d26601936d1f5a0f0c4f7c00.js"),self.createUnocssCompiler())},editor:"style"};var Bo={name:"windicss",title:"Windi CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:l+"windicss/windicss.js",factory:(e,t)=>(self.importScripts(t+"processor-windicss-compiler.2c60d8a9c198f1d4b94016ef99f81429.js"),self.createWindicssCompiler())},editor:"style"};var $e=(e="")=>{if(!e)return;let t=e?.toLowerCase();return I.find(r=>r.name===t||r.title.toLowerCase()===t||r.extensions.map(c=>c.toLowerCase()).includes(t))?.name};var We=(e="")=>I.find(t=>t.name===$e(e))?.editor;var se=(e,t)=>{let r={...g(e,t)};return We(e)==="markup"&&(r.template=t.customSettings.template),r};var He={name:"asciidoc",title:"AsciiDoc",compiler:{url:ye,factory:()=>{let e=window.Asciidoctor();return async(t,{config:r})=>e.convert(t,{...g("asciidoc",r)})}},extensions:["adoc","asciidoc","asc"],editor:"markup"};var xs=M+"standalone.js",o={babel:M+"parser-babel.js",glimmer:M+"parser-glimmer.js",html:M+"parser-html.js",markdown:M+"parser-markdown.js",postcss:M+"parser-postcss.js",php:Me,pug:l+"prettier/parser-pug.js"};var ze={name:"babel",title:"Babel",parser:{name:"babel",pluginUrls:[o.babel,o.html]},compiler:{url:be,factory:()=>async(e,{config:t})=>window.Babel.transform(e,{filename:"script.tsx",presets:[["env",{modules:!1}],"typescript","react"],...g("babel",t)}).code},extensions:["es","babel"],editor:"script",editorLanguage:"typescript"};var Je={name:"css",title:"CSS",info:!1,parser:{name:"css",pluginUrls:[o.postcss]},compiler:{factory:()=>async e=>e},extensions:["css"],editor:"style"};var Xe={name:"haml",title:"Haml",compiler:{url:l+"clientside-haml-js/haml.js",factory:(e,t)=>(self.importScripts(t+"lang-haml-compiler.8e0f4fea3a8fefc8259ca8d6f0768a72.js"),self.createHamlCompiler())},extensions:["haml"],editor:"markup"};var Ke={name:"html",title:"HTML",info:!1,parser:{name:"html",pluginUrls:[o.html]},compiler:{factory:()=>async e=>e},extensions:["html","htm"],editor:"markup"};var Ve={name:"javascript",title:"JS",longTitle:"JavaScript",info:!1,parser:{name:"babel",pluginUrls:[o.babel,o.html]},compiler:{factory:()=>async e=>e},extensions:["js"],editor:"script"};var Ge={name:"jsx",title:"JSX",parser:{name:"babel",pluginUrls:[o.babel,o.html]},compiler:"typescript",extensions:["jsx"],editor:"script",editorLanguage:"javascript"};var Ze={name:"tsx",title:"TSX",parser:{name:"babel-ts",pluginUrls:[o.babel,o.html]},compiler:"typescript",extensions:["tsx"],editor:"script",editorLanguage:"typescript"};var Ye={name:"less",title:"Less",parser:{name:"less",pluginUrls:[o.postcss]},compiler:{url:l+"less/less.js",factory:()=>async(e,{config:t})=>(await window.less.render(e,{...g("less",t)})).css},extensions:["less"],editor:"style"};var Qe={name:"markdown",title:"Markdown",parser:{name:"markdown",pluginUrls:[o.markdown,o.html]},compiler:{url:_e,factory:()=>async(e,{config:t})=>window.marked.parse(e,{headerIds:!1,mangle:!1,...g("markdown",t)})},extensions:["md","markdown","mdown","mkdn"],editor:"markup"};var B=async(e,t,r,c={},u=self)=>new Promise(h=>{if(!e||!t||!r)return h(e||"");let s=async function(n){let d=n.data.payload;n.data.trigger==="compileInCompiler"&&d?.content===e&&d?.language===t&&(u.removeEventListener("message",s),h(d.compiled))};u.addEventListener("message",s),u.postMessage({type:"compileInCompiler",payload:{content:e,language:t,config:r,options:c}})});var No=async(e,{config:t,worker:r})=>new Promise(async c=>{if(!e)return c("");let[u,{default:h}]=await Promise.all([import(l+"mdx/mdx.js"),import(l+"remark-gfm/remark-gfm.js")]),s=(await u.compile(e,{remarkPlugins:[h],...g("mdx",t)})).value,d=(b=>b.replace(/, {[^}]*} = _components/g,"").replace(/const {[^:]*} = props.components[^;]*;/g,""))(s),p=`import React from "react";
import { createRoot } from "react-dom/client";
${oe(d,!1)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`,m=await B(p,"jsx",t,{},r);c(`<div id="__livecodes_mdx_root__"></div><script type="module">${m}<\/script>`)}),et={name:"mdx",title:"MDX",parser:{name:"markdown",pluginUrls:[o.markdown,o.html]},compiler:{factory:()=>async e=>e,runOutsideWorker:No,compiledCodeLanguage:"javascript"},extensions:["mdx"],editor:"markup",editorLanguage:"markdown"};var tt={name:"pug",title:"Pug",parser:{name:"pug",pluginUrls:[o.pug]},compiler:{url:l+"pug/pug.min.js",factory:(e,t)=>(self.importScripts(t+"lang-pug-compiler.6b93c9c73ccadec5e38caa8ec77d3900.js"),self.createPugCompiler())},extensions:["pug","jade"],editor:"markup"};var ot={name:"scss",title:"SCSS",parser:{name:"scss",pluginUrls:[o.postcss]},compiler:{url:l+"sass/sass.js",factory:(e,t)=>(self.importScripts(t+"lang-scss-compiler.712bd4672051205ef090643fa8dd8b68.js"),self.createScssCompiler())},extensions:["scss"],editor:"style"};var rt={name:"sass",title:"Sass",compiler:"scss",extensions:["sass"],editor:"style"};var st={name:"svelte",title:"Svelte",parser:{name:"html",pluginUrls:[o.html,o.babel]},compiler:{url:l+"svelte/svelte-compiler.min.js",factory:(e,t)=>(self.importScripts(t+"lang-svelte-compiler.069bfb65fda860a697774c930b5d091c.js"),self.createSvelteCompiler())},extensions:["svelte"],editor:"script",editorLanguage:"html"};var nt={name:"stylus",title:"Stylus",compiler:{url:l+"stylus/stylus.min.js",factory:()=>async e=>window.stylus.render(e)},extensions:["styl"],editor:"style"};var N={target:"es2015",jsx:"react",allowUmdGlobalAccess:!0,esModuleInterop:!0},at={name:"typescript",title:"TS",longTitle:"TypeScript",parser:{name:"babel-ts",pluginUrls:[o.babel,o.html]},compiler:{url:qe,factory:()=>async(e,{config:t,language:r})=>window.ts.transpile(e,{...N,...g("typescript",t),...g(r,t)})},extensions:["ts","typescript"],editor:"script"};var qo=H+"vue3-sfc-loader.js",it={name:"vue",title:"Vue 3",longTitle:"Vue 3 SFC",parser:{name:"html",pluginUrls:[o.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVueCompiler()),scripts:[ee,qo],imports:{vue:ee+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue","vue3"],editor:"script",editorLanguage:"html"};var Do=H+"vue2-sfc-loader.js",lt={name:"vue2",title:"Vue 2",longTitle:"Vue 2 SFC",parser:{name:"html",pluginUrls:[o.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVue2Compiler()),scripts:[te,Do],imports:{vue:te+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue2"],editor:"script",editorLanguage:"html"};var ct={name:"stencil",title:"Stencil",parser:{name:"babel-ts",pluginUrls:[o.babel,o.html]},compiler:{url:Ie,factory:()=>async(e,{config:t})=>(await window.stencil.transpile(e,{sourceMap:!1,target:"es2019",...g("stencil",t)})).code,types:{"@stencil/core":{url:l+"types/stencil-core.d.ts",declareAsModule:!1}}},extensions:["stencil.tsx"],editor:"script",editorLanguage:"typescript"};var pt={name:"coffeescript",title:"Coffee",longTitle:"CoffeeScript",compiler:{url:ve,factory:()=>async(e,{config:t})=>window.CoffeeScript.compile(e,{bare:!0,...g("coffeescript",t)})},extensions:["coffee"],editor:"script"};var mt={name:"livescript",title:"LiveScript",compiler:{url:l+"livescript/livescript-min.js",factory:()=>async(e,{config:t})=>window.require("livescript").compile(e,{bare:!0,...g("livescript",t)}),scripts:[l+"livescript/prelude-browser-min.js"]},extensions:["ls"],editor:"script"};var Fo=l+"assemblyscript/assemblyscript.js",dt={name:"assemblyscript",title:"AS",longTitle:"AssemblyScript",parser:{name:"babel-ts",pluginUrls:[o.babel]},compiler:{url:Fo,factory:(e,t)=>(self.importScripts(t+"lang-assemblyscript-compiler.8caa06a4a75b2f2d32150d1c4cd03b95.js"),self.createAssemblyscriptCompiler()),scripts:({baseUrl:e})=>[he,e+"lang-assemblyscript-script.a8afe51d73d1fa349c7874dce9f2108f.js"],scriptType:"application/wasm-uint8",compiledCodeLanguage:"wat",types:{assemblyscript:{url:l+"types/assemblyscript.d.ts",declareAsModule:!1,autoload:!0}}},extensions:["as","ts"],editor:"script",editorLanguage:"typescript"};var $o=X+"brython.min.js",Wo=X+"brython_stdlib.js",ut={name:"python",title:"Python",compiler:{factory:()=>async e=>e,scripts:({compiled:e,config:t})=>{let{autoloadStdlib:r,...c}=g("python",t),u=/^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm,h=r!==!1&&e.match(u)?[Wo]:[],s=`window.addEventListener("load", () => {brython(${JSON.stringify(c)})})`,n="data:text/plain;base64,"+btoa(s);return[$o,...h,n]},scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py"],editor:"script"};var Ho=(e,t={})=>Array.from(new Set([...e.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map(r=>r[1]).map(r=>r.split("/")[0]).filter(r=>t.hasOwnProperty(r)||r!=="opal").map(r=>t[r]||`${R+r}.min.js`))),ft={name:"ruby",title:"Ruby",compiler:{url:R+"opal.min.js",factory:()=>(importScripts(R+"opal-parser.min.js"),self.Opal.config.unsupported_features_severity="ignore",self.Opal.load("opal-parser"),async(e,{config:t})=>{let{autoloadStdlib:r,requireMap:c,...u}=g("ruby",t);return self.Opal.compile(e,u)}),scripts:({compiled:e,config:t})=>{let{autoloadStdlib:r,requireMap:c}=g("ruby",t),u=Ho(e,c),h=r!==!1?u:[];return[R+"opal.min.js",...h]}},extensions:["rb"],editor:"script"};var gt={name:"php",title:"PHP",parser:{name:"php",pluginUrls:[o.php]},compiler:{factory:()=>async e=>(e=e.trim(),e.startsWith("<?php")&&(e=e.replace("<?php","/* <?php */"),e.endsWith("?>")&&(e=e.replace("?>","/* ?> */"))),e),scripts:[De],deferScripts:!0,scriptType:"text/x-uniter-php",compiledCodeLanguage:"php"},extensions:["php"],editor:"script"};var yt={name:"perl",title:"Perl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[l+"perlito/perlito5.min.js",e+"lang-perl-script.1f606d886aeb724510a595d45cbaf555.js"],scriptType:"text/perl"},extensions:["pl","pm"],editor:"script"};var zo=l+"lua-fmt/lua-fmt.js",ne={factory:()=>(self.importScripts(zo),async(e,t)=>({formatted:self.luaFmt.formatText(e),cursorOffset:t}))},ht={name:"lua",title:"Lua",formatter:ne,compiler:{factory:()=>async e=>e,scripts:[E],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["lua"],editor:"script"};var A=()=>{let e=Ee;return self.importScripts(e),async t=>({formatted:window.parinfer.parenMode(t).text,cursorOffset:0})},xt={name:"commonlisp",title:"Lisp",longTitle:"Common Lisp",formatter:{factory:A},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[Ce,e+"lang-commonlisp-script.0c86dfce5f8509928ccf51ff666c7b4b.js"],scriptType:"text/commonlisp",compiledCodeLanguage:"commonlisp",inlineScript:`

    `},extensions:["lisp","common-lisp"],editor:"script",editorLanguage:"scheme"};var bt={name:"scheme",title:"Scheme",formatter:{factory:A},compiler:{factory:()=>async e=>e,scripts:[we],scriptType:"text/biwascheme",compiledCodeLanguage:"scheme"},extensions:["scm"],editor:"script"};var wt={name:"solid",title:"Solid",parser:{name:"babel",pluginUrls:[o.babel,o.html]},compiler:{dependencies:["babel"],url:l+"babel-preset-solid/babel-preset-solid.js",factory:(e,t)=>(self.importScripts(t+"lang-solid-compiler.4edfa4ed39f071836693c79f40f0d9b6.js"),self.createSolidCompiler()),types:{"solid-js":{url:l+"types/solid-js.d.ts",declareAsModule:!1}}},extensions:["solid.jsx"],editor:"script",editorLanguage:"javascript"};var St={name:"solid.tsx",title:"Solid (TS)",parser:{name:"babel",pluginUrls:[o.babel,o.html]},compiler:"solid",extensions:["solid.tsx"],editor:"script",editorLanguage:"typescript"};var vt={name:"pyodide",title:"Pyodide",longTitle:"Python (Pyodide)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-python-pyodide-script.d8d4d32ed97521be2e4e35536f468333.js"],liveReload:!0,scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py3"],editor:"script",editorLanguage:"python",largeDownload:!0};var Lt={name:"liquid",title:"Liquid",parser:{name:"html",pluginUrls:[o.html]},compiler:{url:Ue,factory:(e,t)=>(self.importScripts(t+"lang-liquid-compiler.a8cb47f76c1808bdc02fcae94ff8025f.js"),self.createLiquidCompiler())},extensions:["liquid","liquidjs"],editor:"markup",editorLanguage:"html"};var kt={name:"ejs",title:"EJS",parser:{name:"html",pluginUrls:[o.html]},compiler:{url:ke,factory:(e,t)=>(self.importScripts(t+"lang-ejs-compiler.1f9bfcb931f9f068dbdca2155fde7947.js"),self.createEjsCompiler())},extensions:["ejs"],editor:"markup",editorLanguage:"html"};var Jo=V+"handlebars.min.js",wi=V+"handlebars.runtime.min.js",jt={name:"handlebars",title:"Handlebars",parser:{name:"glimmer",pluginUrls:[o.glimmer]},compiler:{url:Jo,factory:(e,t)=>(self.importScripts(t+"lang-handlebars-compiler.be7818c60da12a1729c425a770910e92.js"),self.createHandlebarsCompiler())},extensions:["hbs","handlebars"],editor:"markup",editorLanguage:"html"};var Ct={name:"dot",title:"doT",parser:{name:"html",pluginUrls:[o.html]},compiler:{url:Le,factory:(e,t)=>(self.importScripts(t+"lang-dot-compiler.557d6ca7c515de1e84f17c4842ec71cd.js"),self.createDotCompiler())},extensions:["dot"],editor:"markup",editorLanguage:"html"};var Xo=Y+"nunjucks.min.js",Ei=Y+"nunjucks-slim.min.js",Ut={name:"nunjucks",title:"Nunjucks",parser:{name:"html",pluginUrls:[o.html]},compiler:{url:Xo,factory:(e,t)=>(self.importScripts(t+"lang-nunjucks-compiler.055d011de44eb181acbea8b1a49a7ce2.js"),self.createNunjucksCompiler())},extensions:["njk","nunjucks"],editor:"markup",editorLanguage:"html"};var _t={name:"go",title:"Go",formatter:{factory:()=>(importScripts(W+"go2js-format.js"),async e=>{if(!e)return{formatted:"",cursorOffset:0};let[t,r]=globalThis.go2jsFormat(e);return r?(console.error(r),{formatted:e,cursorOffset:0}):{formatted:t,cursorOffset:0}})},compiler:{url:W+"go2js-compile.js",factory:()=>e=>new Promise(t=>{if(!e){t("");return}globalThis.go2jsCompile(e,W,(r,c)=>{r?(console.error(r),t("")):t(c)})})},extensions:["go","golang"],editor:"script"};var Ko=async(e,{baseUrl:t,language:r})=>{let{rescriptCompiler:c}=await import(t+"lang-rescript-compiler-esm.2b9d0781c004e55c6bc74ba441a3e29e.js");return c(e,{baseUrl:t,language:r})},ae=(e,t)=>(importScripts(e+"lang-rescript-formatter.187ba934d1c84704a2717e3cf411e618.js"),self.createRescriptFormatter(e,t)),Tt={name:"rescript",title:"ReScript",formatter:{factory:ae},compiler:{factory:()=>async e=>e,runOutsideWorker:Ko,scriptType:"module"},extensions:["res","resi"],editor:"script",editorLanguage:"javascript"};var Pt={name:"reason",title:"Reason",formatter:{factory:ae},compiler:"rescript",extensions:["re","rei"],editor:"script",editorLanguage:"javascript"};var Et={name:"ocaml",title:"OCaml",compiler:"rescript",extensions:["ml","mli"],editor:"script",editorLanguage:"javascript"};var Vo=l+"wast-refmt/wast-refmt.js",Go="application/wasm-uint8",Mt={name:"wat",title:"WAT",longTitle:"WebAssembly Text",formatter:{factory:()=>(importScripts(Vo),async e=>{let t=e;try{t=self.wastRefmt.format(e)}catch(r){console.warn("failed parsing WAT",r)}return{formatted:t,cursorOffset:0}})},compiler:{url:Fe,factory:(e,t)=>(self.importScripts(t+"lang-wat-compiler.eea1bd41c9dee36246a40e3aed8394fd.js"),self.createWatCompiler()),scripts:({baseUrl:e})=>[e+"lang-wat-script.29d1634ac55c93301ce5fe2a25906bd0.js"],scriptType:Go,compiledCodeLanguage:"Binary"},extensions:["wat","wast","webassembly","wasm"],editor:"script"};var Zo=Q+"riot+compiler.min.js",Yo=Q+"riot.min.js",At={name:"riot",title:"Riot.js",parser:{name:"html",pluginUrls:[o.html,o.babel]},compiler:{url:Zo,factory:(e,t)=>(self.importScripts(t+"lang-riot-compiler.1f8f0884684f258ddc3c50c8094e7e2a.js"),self.createRiotCompiler()),scripts:[Yo],scriptType:"module"},extensions:["riot","riotjs"],editor:"script",editorLanguage:"html"};var Qo="application/json",Ot={name:"sql",title:"SQL",formatter:{factory:()=>(importScripts(Oe),async e=>({formatted:await self.sqlFormatter.format(e,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{url:Re+"sql-wasm.js",factory:(e,t)=>(self.importScripts(t+"lang-sql-compiler.fa10aaaaf82d9d6a8cc8ebce5c63c3bc.js"),self.createSqlCompiler()),scripts:({baseUrl:e})=>[e+"lang-sql-script.0c35ad4ef2960bb91f816273b91f6c33.js"],scriptType:Qo,compiledCodeLanguage:"json"},extensions:["sql","sqlite","sqlite3"],editor:"script"};var q=l+"react-native-web/react-native-web.js",Rt={name:"react-native",title:"RN",longTitle:"React Native",parser:{name:"babel",pluginUrls:[o.babel,o.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:r})=>window.ts.transpile(e,{...N,...g("typescript",t),...g(r,t)}),imports:{react:q,"react-native":q}},extensions:["react-native.jsx"],editor:"script",editorLanguage:"javascript"};var It={name:"react-native-tsx",title:"RN (TSX)",longTitle:"React Native (TSX)",parser:{name:"babel",pluginUrls:[o.babel,o.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:r})=>window.ts.transpile(e,{...N,...g("typescript",t),...g(r,t)}),imports:{react:q,"react-native":q}},extensions:["react-native.tsx"],editor:"script",editorLanguage:"typescript"};var Bt={name:"blockly",title:"Blockly",compiler:{factory:()=>async(e,{options:t})=>t?.blockly?.js||""},extensions:["blockly.xml","xml"],editor:"script",editorLanguage:"xml"};var Nt={name:"twig",title:"Twig",parser:{name:"html",pluginUrls:[o.html]},compiler:{url:Ne,factory:(e,t)=>(self.importScripts(t+"lang-twig-compiler.39e618d8e11e20b2f85ea15294864c17.js"),self.createTwigCompiler())},extensions:["twig"],editor:"markup",editorLanguage:"html"};var er=xe+"compiler.min.js",qt={name:"astro",title:"Astro",parser:{name:"html",pluginUrls:[o.html,o.babel]},compiler:{url:er,factory:(e,t)=>(self.importScripts(t+"lang-astro-compiler.8407bb9d7fa8feeae708ab9b6cd12739.js"),self.createAstroCompiler())},extensions:["astro"],editor:"markup"};var Dt={name:"malina",title:"Malina.js",parser:{name:"html",pluginUrls:[o.html,o.babel]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-malina-compiler.a0adf0552670bef0d7989fd7b78dfbb3.js"),self.createMalinaCompiler()),imports:{"malinajs/runtime.js":`https://jspm.dev/malinajs@${Z}/runtime.js`}},extensions:["xht"],editor:"script",editorLanguage:"html"};var tr=l+"jscpp/JSCPP.es5.min.js",Ft={name:"cpp",title:"C++",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[tr,e+"lang-cpp-script.1baeb187434ba3ed6b23b718933338ad.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp"},extensions:["cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script"};var $t={name:"julia",title:"Julia",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-julia-script.fe987901a797bc777c685f0daf4357d5.js"],liveReload:!0,scriptType:"text/julia",compiledCodeLanguage:"julia"},extensions:["jl"],editor:"script",largeDownload:!0};var Wt={name:"clang",title:"Clang",longTitle:"C/C++ (Clang)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-cpp-clang-script.4816be0f52e578d04c317645169dc4cb.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp",liveReload:!0},extensions:["clang.cpp","clang","cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script",editorLanguage:"cpp",largeDownload:!0};var Ht={name:"tcl",title:"Tcl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[Ae,e+"lang-tcl-script.3f6a624f992c65a3fd69f999e53fcbd7.js"],scriptType:"text/tcl",compiledCodeLanguage:"tcl"},extensions:["tcl"],editor:"script"};var zt={name:"prolog",title:"Prolog",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[U+"core.js",U+"charsio.js",U+"dom.js",U+"format.js",U+"js.js",U+"lists.js",U+"os.js",U+"promises.js",U+"random.js",U+"statistics.js",e+"lang-prolog-script.2780539e5f2bc8edb4aedd5cf57143e7.js"],scriptType:"text/prolog",compiledCodeLanguage:"prolog"},extensions:["prolog.pl","prolog"],editor:"script"};var Jt={name:"clio",title:"Clio",compiler:{url:K+"compile.js",factory:(e,t)=>(self.importScripts(t+"lang-clio-compiler.75c879c608b8073530c584f64896740a.js"),self.createClioCompiler()),scripts:[K+"exec.js"]},extensions:["clio"],editor:"script",editorLanguage:"coffeescript"};var Xt={name:"richtext",title:"Rich Text",longTitle:"Rich Text Editor",compiler:{factory:()=>async(e,{config:t})=>t.markup.content||"",styles:["quill.8e9d74c74d2c8aaa5d849678c215cf7e.css"]},extensions:["rte","rte.html","rich"],editor:"markup",editorLanguage:"html"};var or=async(e,{baseUrl:t,config:r})=>{let{diagramsCompiler:c}=await import(t+"lang-diagrams-compiler-esm.468dd2b25c78af5f2902eb20a4571be5.js");return c(e,{config:r})},Kt={name:"diagrams",title:"Diagrams",parser:{name:"html",pluginUrls:[o.html]},compiler:{factory:()=>async e=>e||"",runOutsideWorker:or},extensions:["diagrams","diagram","graph","plt"],editor:"markup",editorLanguage:"html"};var Vt={name:"imba",title:"Imba",compiler:{url:G+"compiler.js",factory:(e,t)=>(self.importScripts(t+"lang-imba-compiler.4f3b1e55a23cb0384355b5dca2ab42bf.js"),self.createImbaCompiler()),imports:{imba:G+"imba.mjs"}},extensions:["imba"],editor:"script"};var Gt={name:"mustache",title:"Mustache",parser:{name:"glimmer",pluginUrls:[o.glimmer]},compiler:{url:Pe,factory:(e,t)=>(self.importScripts(t+"lang-mustache-compiler.93b843bf816add490577db24db6270c6.js"),self.createMustacheCompiler())},extensions:["mustache"],editor:"markup",editorLanguage:"html"};var Zt={name:"art-template",title:"art",longTitle:"art-template",parser:{name:"html",pluginUrls:[o.html]},compiler:{url:ge,factory:(e,t)=>(self.importScripts(t+"lang-art-template-compiler.4716dcf439c98cecc6d924d76392deb3.js"),self.createArtTemplateCompiler())},extensions:["art","art-template"],editor:"markup",editorLanguage:"html"};var Yt={name:"r",title:"R",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-r-script-esm.42cba088ad6175ae88305ac37d440eae.js"],inlineScript:`
    livecodes.r = livecodes.r || {config: {}};
    addEventListener('load', async () => {
      await livecodes.r.loaded;
      if (livecodes.r.config?.autoEvaluate !== false) {
        await livecodes.r.run();
      }
      // reset config before next load
      livecodes.r.config = {};
    });
    `,liveReload:!0,scriptType:"text/r",compiledCodeLanguage:"r"},extensions:["r","rlang","rstats"],editor:"script",largeDownload:!0};var rr=l+"civet/civet.js",Qt={name:"civet",title:"Civet",compiler:{url:rr,factory:()=>async e=>window.civet.compile(e,{js:!0})},extensions:["civet"],editor:"script",editorLanguage:"coffeescript"};var eo={name:"fennel",title:"Fennel",formatter:{factory:A},compiler:{url:E,factory:(e,t)=>(self.importScripts(t+"lang-fennel-compiler.1f24a9823f590b00c793a67b29f61e83.js"),self.createFennelCompiler()),scripts:[E],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["fnl"],editor:"script",editorLanguage:"scheme"};var to={name:"teal",title:"Teal",formatter:ne,compiler:{url:E,factory:(e,t)=>(self.importScripts(t+"lang-teal-compiler.1a0bb35b51557f740f6379336bc5a8e1.js"),self.createTealCompiler()),scripts:[E],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["tl"],editor:"script",editorLanguage:"lua"};var oo={name:"stylis",title:"Stylis",compiler:{url:Be,factory:()=>async e=>{let{compile:t,serialize:r,stringify:c,middleware:u,prefixer:h}=window.stylis;return r(t(e),u([h,c]))}},extensions:["stylis"],editor:"style",editorLanguage:"scss"};var ro={name:"flow",title:"Flow",parser:{name:"babel-flow",pluginUrls:[o.babel,o.html]},compiler:{url:l+"flow-remove-types/flow-remove-types.js",factory:()=>async(e,{config:t})=>window.flowRemoveTypes.transpile(e,{all:!0,...g("flow",t)}).toString()},extensions:["flow"],editor:"script",editorLanguage:"typescript"};var so={name:"mjml",title:"MJML",parser:{name:"html",pluginUrls:[o.html]},compiler:{url:Te,factory:()=>async(e,{config:t})=>{if(!e.trim())return"";let{html:r,errors:c}=self.mjml(e,g("mjml",t));return c?.forEach(u=>{console.warn(u.formattedMessage)}),r}},extensions:["mjml"],editor:"markup",editorLanguage:"xml"};var no={name:"sucrase",title:"Sucrase",parser:{name:"babel",pluginUrls:[o.babel,o.html]},compiler:{url:l+"sucrase/sucrase.js",factory:()=>async(e,{config:t})=>window.sucrase.transform(e,{transforms:["jsx","typescript"],...g("sucrase",t)}).code},extensions:["sucrase"],editor:"script",editorLanguage:"typescript"};var ao={name:"eta",title:"Eta",parser:{name:"html",pluginUrls:[o.html]},compiler:{url:je,factory:(e,t)=>(self.importScripts(t+"lang-eta-compiler.ad84b8336e66949b7ecb9ad4f792e059.js"),self.createEtaCompiler())},extensions:["eta"],editor:"markup",editorLanguage:"html"};var O=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.io")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost")));var ie=Co(co());var ar="https://livecodes-sandbox.pages.dev";var le=ar,po="v6",D={getResultUrl:()=>`${le}/${po}/result`,getCompilerUrl:()=>`${le}/${po}/compiler`,getOrigin:()=>new URL(le).origin};var mo="https://dpaste.com/",ir="https://dpaste.com/api/v2/",uo="https://api2.livecodes.io/share",fo={getProject:async e=>{try{let t=await fetch(mo+e+".txt");return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{try{let t=await fetch(ir,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return t.ok?(await t.text()).replace(mo,""):""}catch{return""}}},lr={getProject:async e=>{if(e.length<11)return fo.getProject(e);if(!O())return{};try{let t=await fetch(uo+"?id="+e);return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{if(!O())return"";try{let t=await fetch(uo,{method:"POST",mode:"cors",body:JSON.stringify(e)});return t.ok?t.text():""}catch{return""}}},Mm=O()?lr:fo;var go={name:"clojurescript",title:"CLJS (cherry)",longTitle:"ClojureScript (cherry)",formatter:{factory:A},compiler:{url:$+"lib/cherry.umd.js",factory:()=>async(e,{config:t,options:r})=>{let c=self.CherryCljs.compileString(e);return e.includes("#jsx")?B(c,"jsx",t,r):c},imports:{"cherry-cljs":$+"index.js","cherry-cljs/cljs.core.js":$+"cljs.core.js"}},extensions:["cljs","clj","cljc","edn","clojure"],editor:"script",editorLanguage:"clojure"};var I=[Ke,Qe,et,qt,tt,He,Xe,Gt,jt,kt,ao,Ut,Lt,Ct,Nt,Zt,so,Kt,Xt,Je,ot,rt,Ye,nt,oo,Ve,at,ro,ze,no,Ge,Ze,Rt,It,it,lt,st,ct,wt,St,At,Dt,pt,mt,Qt,Jt,Vt,Tt,Pt,Et,ut,vt,Yt,ft,_t,gt,Ft,Wt,yt,ht,to,eo,$t,bt,xt,go,Ht,dt,Mt,Ot,zt,Bt];var yo=`<!DOCTYPE html>\r
<html lang="en">\r
  <head>\r
    <meta charset="UTF-8" />\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
    <title>Blockly Editor</title>\r
    <style>\r
      html,\r
      body {\r
        margin: 0;\r
        padding: 0;\r
        height: 100%;\r
      }\r
\r
      #blocklyDiv {\r
        width: 100%;\r
        height: 100%;\r
      }\r
    </style>\r
    <script src="{{CDN_URL}}blockly.min.js"><\/script>\r
    <!-- <script src="https://cdn.jsdelivr.net/npm/@live-codes/blockly-utils@0.1.0/src/custom-dialog.js"><\/script> -->\r
  </head>\r
  <body>\r
    <div id="blocklyDiv"></div>\r
\r
    <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">\r
      <category name="Logic" colour="#5b80a5">\r
        <block type="controls_if"></block>\r
        <block type="logic_compare">\r
          <field name="OP">EQ</field>\r
        </block>\r
        <block type="logic_operation">\r
          <field name="OP">AND</field>\r
        </block>\r
        <block type="logic_negate"></block>\r
        <block type="logic_boolean">\r
          <field name="BOOL">TRUE</field>\r
        </block>\r
        <block type="logic_null"></block>\r
        <block type="logic_ternary"></block>\r
      </category>\r
      <category name="Loops" colour="#5ba55b">\r
        <block type="controls_repeat_ext">\r
          <value name="TIMES">\r
            <shadow type="math_number">\r
              <field name="NUM">10</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="controls_whileUntil">\r
          <field name="MODE">WHILE</field>\r
        </block>\r
        <block type="controls_for">\r
          <field name="VAR" id="mhPqYhZH,S)tSOh0bq]0">i</field>\r
          <value name="FROM">\r
            <shadow type="math_number">\r
              <field name="NUM">1</field>\r
            </shadow>\r
          </value>\r
          <value name="TO">\r
            <shadow type="math_number">\r
              <field name="NUM">10</field>\r
            </shadow>\r
          </value>\r
          <value name="BY">\r
            <shadow type="math_number">\r
              <field name="NUM">1</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="controls_forEach">\r
          <field name="VAR" id="P*OGeY|!5)*O-0D2XaR?">j</field>\r
        </block>\r
        <block type="controls_flow_statements">\r
          <field name="FLOW">BREAK</field>\r
        </block>\r
      </category>\r
      <category name="Math" colour="#5b67a5">\r
        <block type="math_number">\r
          <field name="NUM">0</field>\r
        </block>\r
        <block type="math_arithmetic">\r
          <field name="OP">ADD</field>\r
          <value name="A">\r
            <shadow type="math_number">\r
              <field name="NUM">1</field>\r
            </shadow>\r
          </value>\r
          <value name="B">\r
            <shadow type="math_number">\r
              <field name="NUM">1</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="math_single">\r
          <field name="OP">ROOT</field>\r
          <value name="NUM">\r
            <shadow type="math_number">\r
              <field name="NUM">9</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="math_trig">\r
          <field name="OP">SIN</field>\r
          <value name="NUM">\r
            <shadow type="math_number">\r
              <field name="NUM">45</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="math_constant">\r
          <field name="CONSTANT">PI</field>\r
        </block>\r
        <block type="math_number_property">\r
          <mutation divisor_input="false"></mutation>\r
          <field name="PROPERTY">EVEN</field>\r
          <value name="NUMBER_TO_CHECK">\r
            <shadow type="math_number">\r
              <field name="NUM">0</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="math_round">\r
          <field name="OP">ROUND</field>\r
          <value name="NUM">\r
            <shadow type="math_number">\r
              <field name="NUM">3.1</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="math_on_list">\r
          <mutation op="SUM"></mutation>\r
          <field name="OP">SUM</field>\r
        </block>\r
        <block type="math_modulo">\r
          <value name="DIVIDEND">\r
            <shadow type="math_number">\r
              <field name="NUM">64</field>\r
            </shadow>\r
          </value>\r
          <value name="DIVISOR">\r
            <shadow type="math_number">\r
              <field name="NUM">10</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="math_constrain">\r
          <value name="VALUE">\r
            <shadow type="math_number">\r
              <field name="NUM">50</field>\r
            </shadow>\r
          </value>\r
          <value name="LOW">\r
            <shadow type="math_number">\r
              <field name="NUM">1</field>\r
            </shadow>\r
          </value>\r
          <value name="HIGH">\r
            <shadow type="math_number">\r
              <field name="NUM">100</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="math_random_int">\r
          <value name="FROM">\r
            <shadow type="math_number">\r
              <field name="NUM">1</field>\r
            </shadow>\r
          </value>\r
          <value name="TO">\r
            <shadow type="math_number">\r
              <field name="NUM">100</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="math_random_float"></block>\r
      </category>\r
      <category name="Text" colour="#5ba58c">\r
        <block type="text">\r
          <field name="TEXT"></field>\r
        </block>\r
        <block type="text_join">\r
          <mutation items="2"></mutation>\r
        </block>\r
        <block type="text_append">\r
          <field name="VAR" id="{c*$G-wO_K85DOwAUN)0">item</field>\r
          <value name="TEXT">\r
            <shadow type="text">\r
              <field name="TEXT"></field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="text_length">\r
          <value name="VALUE">\r
            <shadow type="text">\r
              <field name="TEXT">abc</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="text_isEmpty">\r
          <value name="VALUE">\r
            <shadow type="text">\r
              <field name="TEXT"></field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="text_indexOf">\r
          <field name="END">FIRST</field>\r
          <value name="VALUE">\r
            <block type="variables_get">\r
              <field name="VAR" id="56^Bs:W6[;bSlf.n%D.0">text</field>\r
            </block>\r
          </value>\r
          <value name="FIND">\r
            <shadow type="text">\r
              <field name="TEXT">abc</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="text_charAt">\r
          <mutation at="true"></mutation>\r
          <field name="WHERE">FROM_START</field>\r
          <value name="VALUE">\r
            <block type="variables_get">\r
              <field name="VAR" id="56^Bs:W6[;bSlf.n%D.0">text</field>\r
            </block>\r
          </value>\r
        </block>\r
        <block type="text_getSubstring">\r
          <mutation at1="true" at2="true"></mutation>\r
          <field name="WHERE1">FROM_START</field>\r
          <field name="WHERE2">FROM_START</field>\r
          <value name="STRING">\r
            <block type="variables_get">\r
              <field name="VAR" id="56^Bs:W6[;bSlf.n%D.0">text</field>\r
            </block>\r
          </value>\r
        </block>\r
        <block type="text_changeCase">\r
          <field name="CASE">UPPERCASE</field>\r
          <value name="TEXT">\r
            <shadow type="text">\r
              <field name="TEXT">abc</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="text_trim">\r
          <field name="MODE">BOTH</field>\r
          <value name="TEXT">\r
            <shadow type="text">\r
              <field name="TEXT">abc</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="text_print">\r
          <value name="TEXT">\r
            <shadow type="text">\r
              <field name="TEXT">abc</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="text_prompt_ext">\r
          <mutation type="TEXT"></mutation>\r
          <field name="TYPE">TEXT</field>\r
          <value name="TEXT">\r
            <shadow type="text">\r
              <field name="TEXT">abc</field>\r
            </shadow>\r
          </value>\r
        </block>\r
      </category>\r
      <category name="Lists" colour="#745ba5">\r
        <block type="lists_create_with">\r
          <mutation items="0"></mutation>\r
        </block>\r
        <block type="lists_create_with">\r
          <mutation items="3"></mutation>\r
        </block>\r
        <block type="lists_repeat">\r
          <value name="NUM">\r
            <shadow type="math_number">\r
              <field name="NUM">5</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="lists_length"></block>\r
        <block type="lists_isEmpty"></block>\r
        <block type="lists_indexOf">\r
          <field name="END">FIRST</field>\r
          <value name="VALUE">\r
            <block type="variables_get">\r
              <field name="VAR" id="=[3|%qk6D5qw(*9IL-+N">list</field>\r
            </block>\r
          </value>\r
        </block>\r
        <block type="lists_getIndex">\r
          <mutation statement="false" at="true"></mutation>\r
          <field name="MODE">GET</field>\r
          <field name="WHERE">FROM_START</field>\r
          <value name="VALUE">\r
            <block type="variables_get">\r
              <field name="VAR" id="=[3|%qk6D5qw(*9IL-+N">list</field>\r
            </block>\r
          </value>\r
        </block>\r
        <block type="lists_setIndex">\r
          <mutation at="true"></mutation>\r
          <field name="MODE">SET</field>\r
          <field name="WHERE">FROM_START</field>\r
          <value name="LIST">\r
            <block type="variables_get">\r
              <field name="VAR" id="=[3|%qk6D5qw(*9IL-+N">list</field>\r
            </block>\r
          </value>\r
        </block>\r
        <block type="lists_getSublist">\r
          <mutation at1="true" at2="true"></mutation>\r
          <field name="WHERE1">FROM_START</field>\r
          <field name="WHERE2">FROM_START</field>\r
          <value name="LIST">\r
            <block type="variables_get">\r
              <field name="VAR" id="=[3|%qk6D5qw(*9IL-+N">list</field>\r
            </block>\r
          </value>\r
        </block>\r
        <block type="lists_split">\r
          <mutation mode="SPLIT"></mutation>\r
          <field name="MODE">SPLIT</field>\r
          <value name="DELIM">\r
            <shadow type="text">\r
              <field name="TEXT">,</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="lists_sort">\r
          <field name="TYPE">NUMERIC</field>\r
          <field name="DIRECTION">1</field>\r
        </block>\r
      </category>\r
      <category name="Colour" colour="#a5745b">\r
        <block type="colour_picker">\r
          <field name="COLOUR">#ff0000</field>\r
        </block>\r
        <block type="colour_random"></block>\r
        <block type="colour_rgb">\r
          <value name="RED">\r
            <shadow type="math_number">\r
              <field name="NUM">100</field>\r
            </shadow>\r
          </value>\r
          <value name="GREEN">\r
            <shadow type="math_number">\r
              <field name="NUM">50</field>\r
            </shadow>\r
          </value>\r
          <value name="BLUE">\r
            <shadow type="math_number">\r
              <field name="NUM">0</field>\r
            </shadow>\r
          </value>\r
        </block>\r
        <block type="colour_blend">\r
          <value name="COLOUR1">\r
            <shadow type="colour_picker">\r
              <field name="COLOUR">#ff0000</field>\r
            </shadow>\r
          </value>\r
          <value name="COLOUR2">\r
            <shadow type="colour_picker">\r
              <field name="COLOUR">#3333ff</field>\r
            </shadow>\r
          </value>\r
          <value name="RATIO">\r
            <shadow type="math_number">\r
              <field name="NUM">0.5</field>\r
            </shadow>\r
          </value>\r
        </block>\r
      </category>\r
      <sep></sep>\r
      <category name="Variables" colour="#a55b80" custom="VARIABLE"></category>\r
      <category name="Functions" colour="#995ba5" custom="PROCEDURE"></category>\r
      <sep></sep>\r
    </xml>\r
\r
    <!-- startBlocks placeholder -->\r
\r
    <script>\r
      (function () {\r
        var darkTheme = Blockly.Theme.defineTheme('dark', {\r
          base: Blockly.Themes.Classic,\r
          componentStyles: {\r
            workspaceBackgroundColour: '#1e1e1e',\r
            toolboxBackgroundColour: 'blackBackground',\r
            toolboxForegroundColour: '#fff',\r
            flyoutBackgroundColour: '#252526',\r
            flyoutForegroundColour: '#ccc',\r
            flyoutOpacity: 1,\r
            scrollbarColour: '#797979',\r
            insertionMarkerColour: '#fff',\r
            insertionMarkerOpacity: 0.3,\r
            scrollbarOpacity: 0.4,\r
            cursorColour: '#d0d0d0',\r
            blackBackground: '#333',\r
          },\r
        });\r
\r
        var themes = {\r
          light: Blockly.Themes.Classic,\r
          dark: darkTheme,\r
        };\r
\r
        var workspace = Blockly.inject('blocklyDiv', {\r
          zoom: {\r
            controls: true,\r
            wheel: false,\r
            startScale: 0.7,\r
            maxScale: 2,\r
            minScale: 0.3,\r
            scaleSpeed: 1.2,\r
            pinch: true,\r
          },\r
          trashcan: true,\r
          renderer: 'zelos',\r
          theme: themes['{{theme}}'],\r
\r
          // {{custom_config}}\r
\r
          media: '{{CDN_URL}}media/',\r
          toolbox: document.getElementById('toolbox'),\r
        });\r
\r
        function updateCode() {\r
          window.LoopTrap = 1000;\r
          Blockly.JavaScript.INFINITE_LOOP_TRAP =\r
            'if (--window.LoopTrap == 0) throw "Infinite loop.";\\n';\r
          var js = Blockly.JavaScript.workspaceToCode(workspace);\r
          var dom = Blockly.Xml.workspaceToDom(workspace);\r
          var xml = Blockly.Xml.domToPrettyText(dom);\r
          Blockly.JavaScript.INFINITE_LOOP_TRAP = null;\r
          parent.postMessage({ type: 'blocklyCode', payload: { xml, js } }, '*');\r
        }\r
\r
        function loadWorkspace(xml) {\r
          if (xml) {\r
            workspace.clear();\r
            var dom = Blockly.utils.xml.textToDom(xml);\r
            Blockly.Xml.domToWorkspace(dom, workspace);\r
          }\r
        }\r
\r
        window.addEventListener('message', function (event) {\r
          if (event.data.result) {\r
            document.write(event.data.result);\r
            document.close();\r
          } else if (event.data.type === 'updateCode') {\r
            updateCode();\r
          } else if (event.data.type === 'setTheme') {\r
            workspace.setTheme(themes[event.data.payload]);\r
          }\r
        });\r
\r
        var onresize = function (e) {\r
          Blockly.svgResize(workspace);\r
        };\r
\r
        window.addEventListener('resize', onresize, false);\r
\r
        function centerContent() {\r
          workspace.markFocused();\r
          workspace.beginCanvasTransition();\r
          // workspace.zoomToFit();\r
          workspace.zoomCenter(0);\r
          workspace.scrollCenter();\r
          setTimeout(function () {\r
            workspace.endCanvasTransition();\r
          }, 500);\r
        }\r
\r
        document.addEventListener('keydown', function (ev) {\r
          if (ev.shiftKey && ev.altKey && ev.key === 'F') {\r
            centerContent();\r
          }\r
          if (ev.ctrlKey && ev.key === 's') {\r
            // save\r
          }\r
        });\r
\r
        window.addEventListener('load', () => {\r
          loadWorkspace(document.querySelector('#startBlocksContainer')?.innerHTML || '');\r
          parent.postMessage({ type: 'blocklyLoaded', payload: true }, '*');\r
          workspace.addChangeListener(updateCode);\r
          updateCode();\r
          onresize();\r
        });\r
      })();\r
    <\/script>\r
  </body>\r
</html>\r
`;var J=!1,_={src:"",customScripts:[],customXml:[]},F=()=>document.querySelector("#blockly-frame"),ho=e=>"..."+JSON.stringify({...se("blockly",e),...e.readonly?{readOnly:!0}:{}})+",",xo=async(e,t)=>{let c=new DOMParser().parseFromString(e,"text/html"),u=Array.from(c.querySelectorAll('script[type="blockly/script"], script[data-type="blockly/script"]')),h=Array.from(c.querySelectorAll('xml[type="blockly/xml"], xml[data-type="blockly/xml"]')),s=u.map(S=>S.src||S.dataset.src||S.innerHTML),n=h.map(S=>S.src||S.dataset.src||S.innerHTML),d=ho(t),p=JSON.stringify([s,n,d]);if(_.src===p)return[_.customScripts,_.customXml];J=!1;let m=async S=>Promise.all(S.map(async j=>{let v=j.src||j.dataset.src;return v?fetch(v).then(k=>k.text()):j.innerHTML})),[b,L]=await Promise.all([m(u),m(h)]);return _={src:p,customScripts:b,customXml:L},[b,L]},dr=async({baseUrl:e,editors:t,config:r,html:c,eventsManager:u})=>{let[h,s]=await xo(c,r);if(J)return;let n=()=>yo.replace(/{{CDN_URL}}/g,Se).replace("{{theme}}",r.theme).replace("// {{custom_config}}",ho(r)).replace("<!-- startBlocks placeholder -->",`<div id="startBlocksContainer" style="display:none;">${t.script.getValue()}</div>
    ${h?.map(d=>"<script>"+d+"<\/script>").join("/n")}
      <script>
        if (typeof window.editToolbox !== 'function') {
          window.editToolbox = (toolboxElement, customXml) => {
            const domParser = new DOMParser();
            customXml.forEach(xml => {
              const dom = domParser.parseFromString(xml, 'text/xml');
              toolboxElement.innerHTML += dom.documentElement.innerHTML;
            })
          }
        }
        window.editToolbox(document.getElementById('toolbox'), [${s?.map(d=>"`"+d.replace(/\`/g,"\\`")+"`").join(", ")}]);
      <\/script>
      <script src="${e}custom-editor-utils.5645a2cb96ac65049b5cfaa8391888fb.js"><\/script>
    `);await new Promise(d=>{let p=document.querySelector("#blockly"),m=F(),b=()=>{u.addEventListener(window,"message",L=>{if(L.source!==F()?.contentWindow||!["blocklyCode","blocklyLoaded"].includes(L.data.type))return;if(L.data.type==="blocklyLoaded"){J=!0,u.removeEventListener(m,"load",b),ur(r.theme),fr(),d("loaded");return}let{xml:S,js:j}=L.data.payload;_.xml=S,_.js=j,t.script.setValue(S)}),F()?.contentWindow?.postMessage({result:n()},"*")};m?b():(m=document.createElement("iframe"),m.name="blockly",m.id="blockly-frame",m.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),u.addEventListener(m,"load",b),m.src=D.getResultUrl(),p.appendChild(m))})},df=async({baseUrl:e,editors:t,config:r,html:c,eventsManager:u})=>r.script.language!=="blockly"?{}:(await xo(c,r),(!J||_.js==null)&&await dr({baseUrl:e,config:r,editors:t,html:c,eventsManager:u}),{xml:_.xml,js:_.js}),ur=e=>{F()?.contentWindow?.postMessage({type:"setTheme",payload:e},D.getOrigin())},fr=()=>{F()?.contentWindow?.postMessage({type:"updateCode"},D.getOrigin())};export{df as getBlocklyContent,ur as setBlocklyTheme,dr as showBlockly};
//# sourceMappingURL=blockly.js.map
