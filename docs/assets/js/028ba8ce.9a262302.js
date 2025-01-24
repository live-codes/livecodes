"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7083],{3905:(e,t,s)=>{s.d(t,{Zo:()=>d,kt:()=>h});var r=s(7294);function o(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function a(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function n(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?a(Object(s),!0).forEach((function(t){o(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):a(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function l(e,t){if(null==e)return{};var s,r,o=function(e,t){if(null==e)return{};var s,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)s=a[r],t.indexOf(s)>=0||(o[s]=e[s]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)s=a[r],t.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(o[s]=e[s])}return o}var i=r.createContext({}),c=function(e){var t=r.useContext(i),s=t;return e&&(s="function"==typeof e?e(t):n(n({},t),e)),s},d=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var s=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=c(s),m=o,h=p["".concat(i,".").concat(m)]||p[m]||u[m]||a;return s?r.createElement(h,n(n({ref:t},d),{},{components:s})):r.createElement(h,n({ref:t},d))}));function h(e,t){var s=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=s.length,n=new Array(a);n[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[p]="string"==typeof e?e:o,n[1]=l;for(var c=2;c<a;c++)n[c]=s[c];return r.createElement.apply(null,n)}return r.createElement.apply(null,s)}m.displayName="MDXCreateElement"},325:(e,t,s)=>{s.d(t,{Z:()=>f});var r=s(7462),o=s(7294),a=s(9493);function n(e){const t=(0,o.useRef)(null),[s,r]=(0,o.useState)(e.className||""),[n,l]=(0,o.useState)(e.style||{}),[i,c]=(0,o.useState)(e.height),[d,p]=(0,o.useState)(),[u,m]=(0,o.useState)(JSON.stringify(e.config||"")),[h,g]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(!t.current)return;const{className:s,style:o,height:n,sdkReady:i,config:f,...y}=e;if(r(s||""),l(o||{}),c(n),d&&h===JSON.stringify(y)){if(u===JSON.stringify(f))return;m(JSON.stringify(f)),"string"==typeof f?fetch(f).then((e=>e.json())).then((e=>{d?.setConfig(e)})):f&&d.setConfig(f)}else g(JSON.stringify(y)),d?.destroy(),(0,a.T)(t.current,{config:f,...y}).then((e=>{p(e),"function"==typeof i&&i(e)}))}),[e]),(0,o.useEffect)((()=>()=>{d?.destroy()}),[]),o.createElement("div",{ref:t,className:s,style:n,"data-height":i})}var l=s(1446),i=s(412),c=s(814),d=s(4866),p=s(5162),u=s(2134),m=s(420);function h(e){const[t,s]=(0,o.useState)(e.js),[r,a]=(0,o.useState)(e.ts),[n,l]=(0,o.useState)(e.react),[h,g]=(0,o.useState)(e.vue),[f,y]=(0,o.useState)(e.svelte),v="3.7rem",[k,b]=(0,o.useState)(!0),[S,w]=(0,o.useState)(v),N=(0,o.useRef)(null),C=()=>{setTimeout((()=>{w(`calc(${N.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{w(`calc(${N.current.offsetHeight}px + ${v})`)}),255)};return(0,o.useEffect)((()=>{if(i.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),a(e(r,"ts")),l(e(n,"jsx")),g(e(h,"html")),y(e(f,"html"))}}),[]),o.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":k,style:{height:k?v:S,overflow:"hidden",willChange:"height",transition:`height ${k?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},o.createElement("summary",{onClick:()=>{b(!k),C()}},"show code"),o.createElement("div",{ref:N,style:{display:"block",overflow:"hidden"}},o.createElement("div",{className:u.Z.collapsibleContent},o.createElement(d.Z,{groupId:"sdk-code"},o.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"js"},t)),o.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"ts"},r)),o.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"jsx"},n)),o.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"html"},h)),o.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"html"},f))))))}const g="container_Egsj";function f(e){const{className:t,style:s,showCode:a,height:i,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),f=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return o.createElement(o.Fragment,null,o.createElement(n,(0,r.Z)({className:`${g} ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:l.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&o.createElement(h,{js:p,ts:u,react:m,vue:f,svelte:y}))}},9493:(e,t,s)=>{s.d(t,{T:()=>o,r:()=>a});var r=s(7728);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:s="https://livecodes.io/",params:r={},config:o={},import:a,headless:n,lite:l,loading:i="lazy",template:c,view:d}=t,p=n||"headless"===d;let u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!p)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),E(m),document.body.appendChild(m)}try{u=new URL(s)}catch{throw new Error(`"${s}" is not a valid URL.`)}const h=u.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{u.searchParams.set(e,String(r[e]))})),c&&u.searchParams.set("template",c),a&&u.searchParams.set("x",a),p&&u.searchParams.set("headless","true"),l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof o&&null==o.mode?o.mode="lite":u.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof o&&null==o.view&&"headless"!==d?o.view=d:u.searchParams.set("view",d)),"string"==typeof o)try{new URL(o),u.searchParams.set("config",o)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof o)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(o).length>0&&u.searchParams.set("config","sdk")}u.searchParams.set("embed","true"),u.searchParams.set("loading",p?"eager":i);let g=!1;const f="Cannot call API methods after calling `destroy()`.",y=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||p||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const s="livecodes",r=m.querySelector(`iframe.${s}`),a=r||document.createElement("iframe");a.classList.add(s),a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const n="eager"===i?"eager":"lazy";a.setAttribute("loading",n),p?E(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===h&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:o},h))})),a.onload=()=>{e(a)},a.src=u.href,r||m.appendChild(a)})),v=new Promise((e=>{addEventListener("message",(function t(s){s.source===y.contentWindow&&s.origin===h&&"livecodes-ready"===s.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),k=()=>g?Promise.reject(f):new Promise((async e=>{v.settled&&e();y.contentWindow?.postMessage({type:"livecodes-load"},h),await v,e()})),b=(e,t)=>new Promise((async(s,r)=>{if(g)return r(f);await k();const o=x();addEventListener("message",(function t(a){if(a.source===y.contentWindow&&a.origin===h&&"livecodes-api-response"===a.data?.type&&a.data?.id===o&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?r(e.error):s(e)}})),y.contentWindow?.postMessage({method:e,id:o,args:t},h)})),S={},w=["load","ready","code","console","tests","destroy"],N=(e,t)=>{if(g)throw new Error(f);return w.includes(e)?(b("watch",[e]),S[e]||(S[e]=[]),S[e]?.push(t),{remove:()=>{S[e]=S[e]?.filter((e=>e!==t)),0===S[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==y.contentWindow||e.origin!==h||!t||!S[t])return;const s=e.data?.payload;S[t]?.forEach((e=>{e(s)}))}));const C=()=>{Object.values(S).forEach((e=>{e.length=0})),y?.remove?.(),g=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await k(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const x=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>N("code",e),watch:N,exec:function(e){for(var t=arguments.length,s=new Array(t>1?t-1:0),r=1;r<t;r++)s[r-1]=arguments[r];return b("exec",[e,...s])},destroy:()=>v.settled?b("destroy").then(C):g?Promise.reject(f):(C(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:s,config:o,import:a,...n}=e,l="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,r.compressToEncodedURIComponent)(JSON.stringify(o))}:{},i=new URLSearchParams(JSON.parse(JSON.stringify({...n,...s,x:a,...l}))).toString();return(t||"https://livecodes.io")+(i?"?"+i:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const s=e.dataset.options;if(s)try{t=JSON.parse(s)}catch{}let r;const a=e.dataset.config||e.dataset.prefill;if(a)try{r=JSON.parse(a)}catch{}const n=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+n,...t,...r?{config:r}:{}})}))}))},3508:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>n,metadata:()=>i,toc:()=>d});var r=s(7462),o=(s(7294),s(3905)),a=s(325);const n={},l="CSS",i={unversionedId:"features/css",id:"features/css",title:"CSS",description:"The result page can be styled with CSS using various methods, including:",source:"@site/docs/features/css.md",sourceDirName:"features",slug:"/features/css",permalink:"/livecodes/docs/features/css",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/css.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Templates",permalink:"/livecodes/docs/features/templates"},next:{title:"Result Page",permalink:"/livecodes/docs/features/result"}},c={},d=[{value:"Style Editor",id:"style-editor",level:2},{value:"Languages",id:"languages",level:3},{value:"CSS Processors",id:"css-processors",level:3},{value:"Style Imports",id:"style-imports",level:3},{value:"Example",id:"example",level:4},{value:"Compiled CSS",id:"compiled-css",level:3},{value:"Auto-update",id:"auto-update",level:3},{value:"External Resources",id:"external-resources",level:2},{value:"CSS Presets",id:"css-presets",level:2},{value:"Stylesheets Imported in Script Editor",id:"stylesheets-imported-in-script-editor",level:2},{value:"External Stylesheets",id:"external-stylesheets",level:3},{value:"<code>./style.css</code>",id:"stylecss",level:3},{value:"CSS Modules",id:"css-modules",level:2},{value:"CSS Frameworks",id:"css-frameworks",level:2},{value:"Styles in Markup &amp; Script",id:"styles-in-markup--script",level:2},{value:"Related",id:"related",level:2}],p={toc:d};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"css"},"CSS"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," can be styled with CSS using various methods, including:"),(0,o.kt)("h2",{id:"style-editor"},"Style Editor"),(0,o.kt)("p",null,"Code added to ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/projects#style-editor"},"style editor")," is ",(0,o.kt)("a",{parentName:"p",href:"#languages"},"compiled")," and ",(0,o.kt)("a",{parentName:"p",href:"#css-processors"},"processed"),", then added as CSS to the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," ",(0,o.kt)("inlineCode",{parentName:"p"},"head")," element."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"LiveCodes styles",src:s(6622).Z,width:"2240",height:"1400"})," "),(0,o.kt)("h3",{id:"languages"},"Languages"),(0,o.kt)("p",null,"LiveCodes supports multiple languages that compile to CSS, including ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/scss"},"SCSS"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/sass"},"Sass"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/less"},"Less")," and ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/stylus"},"Stylus"),". Code authored in any of these languages is compiled to CSS before being added to the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page"),"."),(0,o.kt)("p",null,"The style language can be selected from the style editor menu. In embedded playgrounds, the language can be configured via the configuration object property ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#style"},(0,o.kt)("inlineCode",{parentName:"a"},"style.language"))),(0,o.kt)("h3",{id:"css-processors"},"CSS Processors"),(0,o.kt)("p",null,"The (compiled) CSS code can be processed by one or more of the supported CSS processors. Examples of these include: ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/autoprefixer"},"Autoprefixer"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/postcssPresetEnv"},"postcss-preset-env"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/lightningcss"},"Lightning CSS"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/cssmodules"},"CSS Modules"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/cssnano"},"cssnano"),", ...etc."),(0,o.kt)("p",null,"Multiple CSS processors can be enabled at the same time. The code is processed in the order of processors placed in the style editor menu of the app."),(0,o.kt)("p",null,"Processors are enabled in the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/getting-started#standalone-app"},"standalone app")," from the style editor menu, by switching on the toggles of the required processors."),(0,o.kt)("p",null,"In embedded playgrounds, processors are enabled via the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#processors"},(0,o.kt)("inlineCode",{parentName:"a"},"processors"))," property of the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object"),"."),(0,o.kt)("h3",{id:"style-imports"},"Style Imports"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#bare-module-imports"},"Bare modules")," used with ",(0,o.kt)("inlineCode",{parentName:"p"},"@import")," rules are supposed to be npm modules. These are converted to ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#cdn-providers"},"full URLs from CDN"),"."),(0,o.kt)("h4",{id:"example"},"Example"),(0,o.kt)("p",null,"This code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"@import 'github-markdown-css/github-markdown.css';\n")),(0,o.kt)("p",null,"becomes:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"@import 'https://unpkg.com/github-markdown-css/github-markdown.css';\n")),(0,o.kt)("p",null,"Packages that specify a stylesheet as the main module can be imported like that:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"@import 'github-markdown-css';\n")),(0,o.kt)("p",null,"demo:"),(0,o.kt)(a.Z,{template:"markdown",params:{activeEditor:"style",compiled:"open"},mdxType:"LiveCodes"}),(0,o.kt)("p",null,"The content can be inlined in the compiled CSS by enabling the processor ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/postcssImportUrl"},"postcss-import-url"),"."),(0,o.kt)("h3",{id:"compiled-css"},"Compiled CSS"),(0,o.kt)("p",null,"Compiled CSS (following compilation of style language, and all enabled processors) is added to the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," ",(0,o.kt)("inlineCode",{parentName:"p"},"head")," element."),(0,o.kt)("p",null,"The compiled code can be inspected in the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/compiled-code"},"compiled code viewer")," in the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tools-pane"},"tools pane"),"."),(0,o.kt)("h3",{id:"auto-update"},"Auto-update"),(0,o.kt)("p",null,"When ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#autoupdate"},(0,o.kt)("inlineCode",{parentName:"a"},"autoupdate"))," is enabled (default), in contrast to ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/projects#markup-editor"},"markup editor")," and ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/projects#script-editor"},"script editor"),", changes in style editor code does NOT trigger a full reload of the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page"),". The updated CSS code is sent to the page and applied without a reload."),(0,o.kt)("p",null,"The page can be force-reloaded by clicking the run button or using the keyboard shortcut: ",(0,o.kt)("kbd",null,"Shift"),"\xa0","+","\xa0",(0,o.kt)("kbd",null,"Enter"),"."),(0,o.kt)("h2",{id:"external-resources"},"External Resources"),(0,o.kt)("p",null,"External stylesheets can be added in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources"},"external resources")," screen. These are added to the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," before the compiled style editor code. This allows code in style editor to override CSS properties in external stylesheets."),(0,o.kt)("p",null,"External stylesheets can be added to embedded playgrounds using the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," property ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#stylesheets"},(0,o.kt)("inlineCode",{parentName:"a"},"stylesheets")),"."),(0,o.kt)("h2",{id:"css-presets"},"CSS Presets"),(0,o.kt)("p",null,"CSS presets like ",(0,o.kt)("a",{parentName:"p",href:"https://necolas.github.io/normalize.css/"},"Normalize.css")," and ",(0,o.kt)("a",{parentName:"p",href:"https://meyerweb.com/eric/tools/css/reset/"},"Reset CSS")," can be selected in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources#css-presets"},"external resources")," screen."),(0,o.kt)("h2",{id:"stylesheets-imported-in-script-editor"},"Stylesheets Imported in Script Editor"),(0,o.kt)("h3",{id:"external-stylesheets"},"External Stylesheets"),(0,o.kt)("p",null,"CSS stylesheets imported in the script editor are added to the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," ",(0,o.kt)("inlineCode",{parentName:"p"},"head")," element. ",(0,o.kt)("em",{parentName:"p"},"The URL has to end with ",(0,o.kt)("strong",{parentName:"em"},(0,o.kt)("inlineCode",{parentName:"strong"},".css")," extension")),"."),(0,o.kt)("p",null,"For example, adding this in the script editor (JavaScript):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import 'https://unpkg.com/github-markdown-css/github-markdown.css';\n")),(0,o.kt)("p",null,"adds this to the page ",(0,o.kt)("inlineCode",{parentName:"p"},"head"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<link rel="stylesheet" href="https://unpkg.com/github-markdown-css/github-markdown.css" />\n')),(0,o.kt)("p",null,"Currently, compiling imported stylesheets (e.g. SCSS) is not supported."),(0,o.kt)("p",null,"Similar to ",(0,o.kt)("a",{parentName:"p",href:"#style-imports"},"imports in style editor"),", bare imports are converted to full URLs from CDN."),(0,o.kt)("p",null,"For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import 'github-markdown-css/github-markdown.css';\n")),(0,o.kt)("p",null,"becomes:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<link rel="stylesheet" href="https://unpkg.com/github-markdown-css/github-markdown.css" />\n')),(0,o.kt)("h3",{id:"stylecss"},(0,o.kt)("inlineCode",{parentName:"h3"},"./style.css")),(0,o.kt)("p",null,"Importing the URLs (",(0,o.kt)("inlineCode",{parentName:"p"},"./style.css")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"./styles.css"),") gets the style editor compiled/processed CSS ",(0,o.kt)("strong",{parentName:"p"},"string")," as the module's default export."),(0,o.kt)("p",null,"Example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import styles from './style.css';\n\nconsole.log(styles); // => compiled CSS as string\n")),(0,o.kt)("h2",{id:"css-modules"},"CSS Modules"),(0,o.kt)("p",null,"CSS modules are supported and are ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/cssmodules"},"documented separately"),"."),(0,o.kt)("h2",{id:"css-frameworks"},"CSS Frameworks"),(0,o.kt)("p",null,"Multiple CSS frameworks are supported including ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/tailwindcss"},"Tailwind CSS"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/unocss"},"UnoCSS")," and ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/windicss"},"WindiCSS"),"."),(0,o.kt)("h2",{id:"styles-in-markup--script"},"Styles in Markup & Script"),(0,o.kt)("p",null,"Of course, styles and stylesheets can still be added as usual in markup and script editors (via HTML elements and/or DOM)."),(0,o.kt)("h2",{id:"related"},"Related"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/projects"},"Projects")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/external-resources"},"External resources")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/module-resolution"},"Module resolution"))))}u.isMDXComponent=!0},6622:(e,t,s)=>{s.d(t,{Z:()=>r});const r=s.p+"assets/images/css-processors-832dad3e4809409f2d12e9d8109f0962.jpg"}}]);