"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1141],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),p=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=p(n),c=r,h=u["".concat(l,".").concat(c)]||u[c]||m[c]||a;return n?o.createElement(h,s(s({ref:t},d),{},{components:n})):o.createElement(h,s({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=c;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:r,s[1]=i;for(var p=2;p<a;p++)s[p]=n[p];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>k});var o=n(7462),r=n(7294),a=n(9493);function s(e){const t=(0,r.useRef)(null),[n,o]=(0,r.useState)(e.className||""),[s,i]=(0,r.useState)(e.style||{}),[l,p]=(0,r.useState)(e.height),[d,u]=(0,r.useState)(),[m,c]=(0,r.useState)(JSON.stringify(e.config||"")),[h,f]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(!t.current)return;const{className:n,style:r,height:s,sdkReady:l,config:k,...g}=e;if(o(n||""),i(r||{}),p(s),d&&h===JSON.stringify(g)){if(m===JSON.stringify(k))return;c(JSON.stringify(k)),"string"==typeof k?fetch(k).then((e=>e.json())).then((e=>{d?.setConfig(e)})):k&&d.setConfig(k)}else f(JSON.stringify(g)),d?.destroy(),(0,a.T)(t.current,{config:k,...g}).then((e=>{u(e),"function"==typeof l&&l(e)}))}),[e]),(0,r.useEffect)((()=>()=>{d?.destroy()}),[]),r.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),p=n(814),d=n(4866),u=n(5162),m=n(2134),c=n(420);function h(e){const[t,n]=(0,r.useState)(e.js),[o,a]=(0,r.useState)(e.ts),[s,i]=(0,r.useState)(e.react),[h,f]=(0,r.useState)(e.vue),[k,g]=(0,r.useState)(e.svelte),v="3.7rem",[y,b]=(0,r.useState)(!0),[N,w]=(0,r.useState)(v),C=(0,r.useRef)(null),j=()=>{setTimeout((()=>{w(`calc(${C.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{w(`calc(${C.current.offsetHeight}px + ${v})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(o,"ts")),i(e(s,"jsx")),f(e(h,"html")),g(e(k,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${m.Z.details} ${c.Z.details}`,"data-collapsed":y,style:{height:y?v:N,overflow:"hidden",willChange:"height",transition:`height ${y?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{b(!y),j()}},"show code"),r.createElement("div",{ref:C,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:m.Z.collapsibleContent},r.createElement(d.Z,{groupId:"sdk-code"},r.createElement(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:j}},r.createElement(p.Z,{language:"js"},t)),r.createElement(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:j}},r.createElement(p.Z,{language:"ts"},o)),r.createElement(u.Z,{value:"react",label:"React",attributes:{onMouseDown:j}},r.createElement(p.Z,{language:"jsx"},s)),r.createElement(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:j}},r.createElement(p.Z,{language:"html"},h)),r.createElement(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:j}},r.createElement(p.Z,{language:"html"},k))))))}const f="container_Egsj";function k(e){const{className:t,style:n,showCode:a,height:l,...p}=e,d=e=>JSON.stringify(e,null,2),u=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(p)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(p)};\ncreatePlayground('#container', options);\n\n`.trimStart(),c=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(p)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),k=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(p)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,g=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(p)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(s,(0,o.Z)({className:`${f} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e)),!1!==e.showCode&&r.createElement(h,{js:u,ts:m,react:c,vue:k,svelte:g}))}},9493:(e,t,n)=>{n.d(t,{T:()=>r,r:()=>a});var o=n(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:o={},config:r={},import:a,lite:s,loading:i="lazy",template:l,view:p="split"}=t,d="headless"===p;let u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!d||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!d)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),j(m),document.body.appendChild(m)}try{u=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const c=u.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{u.searchParams.set(e,String(o[e]))})),"string"==typeof r)try{new URL(r),u.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&u.searchParams.set("config","sdk")}l&&u.searchParams.set("template",l),a&&u.searchParams.set("x",a),s&&u.searchParams.set("lite","true"),u.searchParams.set("embed","true"),u.searchParams.set("loading",d?"eager":i),u.searchParams.set("view",p);let h=!1;const f="Cannot call API methods after calling `destroy()`.",k=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!d){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||d||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="5px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const o="eager"===i?"eager":"lazy";n.setAttribute("loading",o),n.classList.add("livecodes"),d?j(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===c&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:r},c))})),n.onload=()=>{e(n)},n.src=u.href,m.appendChild(n)})),g=new Promise((e=>{addEventListener("message",(function t(n){n.source===k.contentWindow&&n.origin===c&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),g.settled=!0)}))})),v=()=>h?Promise.reject(f):new Promise((async e=>{g.settled&&e();k.contentWindow?.postMessage({type:"livecodes-load"},c),await g,e()})),y=(e,t)=>new Promise((async(n,o)=>{if(h)return o(f);await v();const r=E();addEventListener("message",(function t(a){if(a.source===k.contentWindow&&a.origin===c&&"livecodes-api-response"===a.data?.type&&a.data?.id===r&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?o(e.error):n(e)}})),k.contentWindow?.postMessage({method:e,id:r,args:t},c)})),b={},N=["load","ready","code","console","tests","destroy"],w=(e,t)=>{if(h)throw new Error(f);return N.includes(e)?(y("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter((e=>e!==t)),0===b[e]?.length&&y("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==k.contentWindow||e.origin!==c||!t||!b[t])return;const n=e.data?.payload;b[t]?.forEach((e=>{e(n)}))}));const C=()=>{Object.values(b).forEach((e=>{e.length=0})),k?.remove?.(),h=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function j(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const E=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>w("code",e),watch:w,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return y("exec",[e,...n])},destroy:()=>g.settled?y("destroy").then(C):h?Promise.reject(f):(C(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:n,config:r,import:a,...s}=e,i="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:a,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o;const a=e.dataset.config||e.dataset.prefill;if(a)try{o=JSON.parse(a)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+s,...t,...o?{config:o}:{}})}))}))},8975:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var o=n(7462),r=(n(7294),n(3905)),a=n(325);const s={},i="Module Resolution",l={unversionedId:"features/module-resolution",id:"features/module-resolution",title:"Module Resolution",description:"NPM Modules",source:"@site/docs/features/module-resolution.md",sourceDirName:"features",slug:"/features/module-resolution",permalink:"/livecodes/docs/features/module-resolution",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/module-resolution.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Tests",permalink:"/livecodes/docs/features/tests"},next:{title:"IntelliSense",permalink:"/livecodes/docs/features/intellisense"}},p={},d=[{value:"NPM Modules",id:"npm-modules",level:2},{value:"Bare Module Imports",id:"bare-module-imports",level:3},{value:"CommonJS Modules",id:"commonjs-modules",level:3},{value:"NPM Package Search",id:"npm-package-search",level:3},{value:"Deno Modules",id:"deno-modules",level:2},{value:"JSR Modules",id:"jsr-modules",level:2},{value:"GitHub/GitLab/Bitbucket",id:"githubgitlabbitbucket",level:2},{value:"CDN Providers",id:"cdn-providers",level:2},{value:"Change Default CDN",id:"change-default-cdn",level:3},{value:"Package Version",id:"package-version",level:3},{value:"Custom Module Resolution",id:"custom-module-resolution",level:2},{value:"Custom Settings",id:"custom-settings",level:4},{value:"SDK",id:"sdk",level:4},{value:"Related",id:"related",level:2}],u={toc:d};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"module-resolution"},"Module Resolution"),(0,r.kt)("h2",{id:"npm-modules"},"NPM Modules"),(0,r.kt)("h3",{id:"bare-module-imports"},"Bare Module Imports"),(0,r.kt)("p",null,"In LiveCodes you can use node-style bare module imports for npm modules like you do in your local development. However, there are no installation or build steps required."),(0,r.kt)("p",null,"e.g. consider the following code:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { v4 } from 'uuid';\n\ndocument.body.innerHTML = v4();\n")),(0,r.kt)("p",null,"If you run it directly in the browser, you get this error:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'Uncaught TypeError: Failed to resolve module specifier "uuid". Relative references must start with either "/", "./", or "../".\n')),(0,r.kt)("p",null,"However, in LiveCodes, bare module imports are transformed to full URLs that are imported from CDN (by default: ",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh/"},"esm.sh"),") which provides ESM versions of NPM packages."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"import { v4 } from 'uuid';")," ",(0,r.kt)("br",null)," becomes ",(0,r.kt)("br",null),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"import { v4 } from 'https://esm.sh/uuid';")),(0,r.kt)("p",null,"This is made possible by using ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/WICG/import-maps"},"import maps"),"."),(0,r.kt)("p",{id:"npm-modules-demo1"},"Demo:"),(0,r.kt)(a.Z,{params:{js:"import { v4 } from 'uuid';\n\ndocument.body.innerHTML = v4();"},mdxType:"LiveCodes"}),(0,r.kt)("p",null,"\xa0"),(0,r.kt)("p",null,"You can import React like that:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import React, { useState } from 'react';\nimport { createRoot } from 'react-dom/client';\n")),(0,r.kt)("p",null,"Demo:"),(0,r.kt)(a.Z,{template:"react",mdxType:"LiveCodes"}),(0,r.kt)("p",null,"It just works without a build step and without you having to worry about. And when you ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/export"},"export your project")," to another service (e.g. CodePen) or as HTML, the full URL imports are used, so your code continues to work."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"It is recommended to use this method for dependencies over using ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources"},"external scripts"),". The dependencies are explicitly stated in the code. And if you move to a local development environment, your bundler will take care of importing them and doing other optimizations like ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking"},"tree-shaking"),".")),(0,r.kt)("h3",{id:"commonjs-modules"},"CommonJS Modules"),(0,r.kt)("p",null,"CommonJS module ",(0,r.kt)("inlineCode",{parentName:"p"},"require"),"s are also supported (they are converted to ESM imports)."),(0,r.kt)("p",null,"So this also works (although not recommended - use ESM imports instead):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const { v4 } = require('uuid');\n\ndocument.body.innerHTML = v4();\n")),(0,r.kt)("p",null,"Exercise:"),(0,r.kt)("p",null,"Copy the previous code snippet and paste it in the playground below. Check the generated code in the compiled code viewer."),(0,r.kt)(a.Z,{params:{activeEditor:"script",compiled:"open"},mdxType:"LiveCodes"}),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Script code that contains ",(0,r.kt)("inlineCode",{parentName:"p"},"import"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"export")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"require")," gets served in a script tag with ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"},(0,r.kt)("inlineCode",{parentName:"a"},'type="module"')),".")),(0,r.kt)("h3",{id:"npm-package-search"},"NPM Package Search"),(0,r.kt)("p",null,"NPM packages can be searched and added as script tags from the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources"},"External Resources")," screen."),(0,r.kt)("h2",{id:"deno-modules"},"Deno Modules"),(0,r.kt)("p",null,"Modules imported from ",(0,r.kt)("a",{parentName:"p",href:"https://deno.land/x"},"deno.land/x")," (or any other URL ending in ",(0,r.kt)("inlineCode",{parentName:"p"},".ts"),", ",(0,r.kt)("inlineCode",{parentName:"p"},".jsx")," or ",(0,r.kt)("inlineCode",{parentName:"p"},".tsx"),") are automatically transpiled (ts -> js) and bundled by ",(0,r.kt)("a",{parentName:"p",href:"https://bundlejs.com/"},"bundlejs")," (using ",(0,r.kt)("a",{parentName:"p",href:"https://esbuild.github.io/"},"esbuild"),"), including their relative imports. The project on LiveCodes that imports these modules does not need to be using TypeScript."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { uuid } from 'https://deno.land/x/uuid/mod.ts';\n\ndocument.body.innerHTML = uuid();\n")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?js=import%20%7B%20uuid%20%7D%20from%20'https%3A%2F%2Fdeno.land%2Fx%2Fuuid%2Fmod.ts'%3B%0A%0Adocument.body.innerHTML%20%3D%20uuid()%3B"},"Open in LiveCodes")),(0,r.kt)("h2",{id:"jsr-modules"},"JSR Modules"),(0,r.kt)("p",null,"Modules can be imported from ",(0,r.kt)("a",{parentName:"p",href:"https://jsr.io/"},"jsr.io")," using the prefix ",(0,r.kt)("inlineCode",{parentName:"p"},"jsr:"),". The project on LiveCodes that imports these modules does not need to be using TypeScript."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { yassify } from 'jsr:@kwhinnery/yassify';\n\ndocument.body.innerHTML = yassify('Hello, World!');\n")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?js=import%20%7B%20yassify%20%7D%20from%20'jsr%3A%40kwhinnery%2Fyassify'%3B%0A%0Adocument.body.innerHTML%20%3D%20yassify('Hello%2C%20World!')%3B"},"Open in LiveCodes")),(0,r.kt)("h2",{id:"githubgitlabbitbucket"},"GitHub/GitLab/Bitbucket"),(0,r.kt)("p",null,"Modules can also be similarly imported from GitHub, Gitlab or Bitbucket. Also these imports are transpiled and bundled (see ",(0,r.kt)("a",{parentName:"p",href:"#deno-modules"},"Deno Modules"),")."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { flatten } from 'https://github.com/remeda/remeda/blob/master/src/flatten.ts';\n\nconsole.log(flatten([[1, 2], [3], [4, 5]])); // -> [1, 2, 3, 4, 5]\n")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?console=open&js=import%20%7B%20flatten%20%7D%20from%20'https%3A%2F%2Fgithub.com%2Fremeda%2Fremeda%2Fblob%2Fmaster%2Fsrc%2Fflatten.ts'%3B%0A%0Aconsole.log(flatten(%5B%5B1%2C%202%5D%2C%20%5B3%5D%2C%20%5B4%2C%205%5D%5D))%3B"},"Open in LiveCodes")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"If you do not want the import URL to be bundled (e.g. in Deno or GitHub imports), add ",(0,r.kt)("inlineCode",{parentName:"p"},"#nobundle")," to the end of URL."),(0,r.kt)("p",{parentName:"admonition"},"Example:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { flatten } from 'https://github.com/remeda/remeda/blob/master/src/flatten.ts#nobundle';\n")),(0,r.kt)("p",{parentName:"admonition"},"If you want to bundle (and transpile) any import URL, prefix it with ",(0,r.kt)("inlineCode",{parentName:"p"},"bundle:")," (see below).")),(0,r.kt)("h2",{id:"cdn-providers"},"CDN Providers"),(0,r.kt)("p",null,"By default, npm modules are imported from ",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh/"},"esm.sh"),". You may choose another provider by using a CDN prefix. These are examples of importing the library ",(0,r.kt)("inlineCode",{parentName:"p"},"uuid"),":"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh/uuid"},"https://esm.sh/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"esm.sh:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh/uuid"},"https://esm.sh/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"skypack:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://cdn.skypack.dev/uuid"},"https://cdn.skypack.dev/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://www.skypack.dev/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"jsdelivr:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://cdn.jsdelivr.net/npm/uuid"},"https://cdn.jsdelivr.net/npm/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://www.jsdelivr.com/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"esm.run:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://esm.run/uuid"},"https://esm.run/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://esm.run/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"unpkg:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://unpkg.com/uuid?module"},"https://unpkg.com/uuid?module")," (",(0,r.kt)("a",{parentName:"p",href:"https://unpkg.com/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"esbuild:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://esbuild.vercel.app/uuid"},"https://esbuild.vercel.app/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://esbuild.vercel.app/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"bundlejs:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://deno.bundlejs.com/?file&q=uuid"},"https://deno.bundlejs.com/?file&q=uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://bundlejs.com/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"bundle:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://deno.bundlejs.com/?file&q=uuid"},"https://deno.bundlejs.com/?file&q=uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://bundlejs.com/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"deno:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://deno.bundlejs.com/?file&q=https://deno.land/x/uuid/mod.ts"},"https://deno.bundlejs.com/?file&q=https://deno.land/x/uuid/mod.ts")," (",(0,r.kt)("a",{parentName:"p",href:"https://bundlejs.com/"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"npm:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh/uuid"},"https://esm.sh/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"node:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh/uuid"},"https://esm.sh/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"jsr:@std/uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh/jsr/@std/uuid"},"https://esm.sh/jsr/@std/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://esm.sh"},"info"),")"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"jspm:uuid")," \u2192 ",(0,r.kt)("a",{parentName:"p",href:"https://jspm.dev/uuid"},"https://jspm.dev/uuid")," (",(0,r.kt)("a",{parentName:"p",href:"https://jspm.org"},"info")," - ",(0,r.kt)("a",{parentName:"p",href:"https://jspm.org/jspm-dev-deprecation"},"DEPRECATED"),")"),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import React, { useState } from 'esm.sh:react';\nimport { createRoot } from 'esm.sh:react-dom/client';\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Please note that importing the same module (even for dependencies) from different CDNs may cause conflicts."),(0,r.kt)("p",{parentName:"admonition"},"Example:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// this will NOT work!\nimport React, { useState } from 'esm.sh:react'; // React from esm.sh\nimport { createRoot } from 'react-dom/client'; // React from jspm.dev\n"))),(0,r.kt)("h3",{id:"change-default-cdn"},"Change Default CDN"),(0,r.kt)("p",null,"Default CDN can be changed on project-level using the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"custom settings")," property ",(0,r.kt)("inlineCode",{parentName:"p"},"defaultCDN")," which accepts a string representing one of the CDN aliases listed above."),(0,r.kt)("p",null,"Example: This assigns ",(0,r.kt)("a",{parentName:"p",href:"https://www.skypack.dev/"},"Skypack")," as the default CDN for all imports of the project"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "defaultCDN": "skypack"\n}\n')),(0,r.kt)("h3",{id:"package-version"},"Package Version"),(0,r.kt)("p",null,"Most CDN providers allow specifying package version using the format: ",(0,r.kt)("br",null),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"{pkgName}@{version}/{path}"),"."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import latest from 'lodash';\nimport v3 from 'lodash@3';\n\nconsole.log(latest.VERSION); // -> 4.17.21\nconsole.log(v3.VERSION); // -> 3.10.1\n")),(0,r.kt)("h2",{id:"custom-module-resolution"},"Custom Module Resolution"),(0,r.kt)("p",null,"Module resolution described in this page mainly depends on ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/WICG/import-maps"},"import maps"),". The generated import map is added to the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page"),"."),(0,r.kt)("p",null,"You may wish to override or customize module resolution behavior (e.g. change URL, CDN, specify version, import custom unpublished library, ...etc. ), however you cannot add another import map script because ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/WICG/import-maps#multiple-import-map-support"},"currently multiple import maps are not yet supported"),"."),(0,r.kt)("p",null,"LiveCodes allows you to add your custom import map by one of the following methods:"),(0,r.kt)("h4",{id:"custom-settings"},"Custom Settings"),(0,r.kt)("p",null,"In the standalone app, via the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"custom settings")," property ",(0,r.kt)("inlineCode",{parentName:"p"},"imports"),"."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "imports": {\n    "my-lib": "https://my-server.com/path/to/library.js"\n  }\n}\n')),(0,r.kt)("h4",{id:"sdk"},"SDK"),(0,r.kt)("p",null,"For embedded playgrounds, use the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," embed option ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#imports"},(0,r.kt)("inlineCode",{parentName:"a"},"config.imports")),"."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="index.js"',title:'"index.js"'},"import { createPlayground } from 'livecodes';\n\nconst config = {\n  imports: {\n    'my-lib': 'https://my-server.com/path/to/library.js',\n  },\n  // other configurations ...\n};\n\ncreatePlayground('#container', { config });\n")),(0,r.kt)("p",null,"Please note that you may also provide ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/intellisense#custom-types"},"custom type definitions")," for your custom modules for editor intellisense and better development experience."),(0,r.kt)("h2",{id:"related"},"Related"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/import"},"Import")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/external-resources"},"External Resources")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/projects"},"Projects")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/intellisense"},"Intellisense"))))}m.isMDXComponent=!0}}]);