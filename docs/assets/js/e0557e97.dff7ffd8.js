"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9203],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=a,f=p["".concat(l,".").concat(m)]||p[m]||u[m]||r;return n?o.createElement(f,s(s({ref:t},d),{},{components:n})):o.createElement(f,s({ref:t},d))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var c=2;c<r;c++)s[c]=n[c];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>g});var o=n(7462),a=n(7294),r=n(9493);function s(e){const t=(0,a.useRef)(null),[n,o]=(0,a.useState)(e.className||""),[s,i]=(0,a.useState)(e.style||{}),[l,c]=(0,a.useState)(e.height),[d,p]=(0,a.useState)(),[u,m]=(0,a.useState)(JSON.stringify(e.config||"")),[f,h]=(0,a.useState)("");return(0,a.useEffect)((()=>{if(!t.current)return;const{className:n,style:a,height:s,sdkReady:l,config:g,...v}=e;if(o(n||""),i(a||{}),c(s),d&&f===JSON.stringify(v)){if(u===JSON.stringify(g))return;m(JSON.stringify(g)),"string"==typeof g?fetch(g).then((e=>e.json())).then((e=>{d?.setConfig(e)})):g&&d.setConfig(g)}else h(JSON.stringify(v)),d?.destroy(),(0,r.T)(t.current,{config:g,...v}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,a.useEffect)((()=>()=>{d?.destroy()}),[]),a.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),p=n(5162),u=n(2134),m=n(420);function f(e){const[t,n]=(0,a.useState)(e.js),[o,r]=(0,a.useState)(e.ts),[s,i]=(0,a.useState)(e.react),[f,h]=(0,a.useState)(e.vue),[g,v]=(0,a.useState)(e.svelte),y="3.7rem",[b,k]=(0,a.useState)(!0),[w,S]=(0,a.useState)(y),N=(0,a.useRef)(null),E=()=>{setTimeout((()=>{S(`calc(${N.current.offsetHeight}px + ${y})`)}),5),setTimeout((()=>{S(`calc(${N.current.offsetHeight}px + ${y})`)}),255)};return(0,a.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),r(e(o,"ts")),i(e(s,"jsx")),h(e(f,"html")),v(e(g,"html"))}}),[]),a.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?y:w,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},a.createElement("summary",{onClick:()=>{k(!b),E()}},"show code"),a.createElement("div",{ref:N,style:{display:"block",overflow:"hidden"}},a.createElement("div",{className:u.Z.collapsibleContent},a.createElement(d.Z,{groupId:"sdk-code"},a.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:E}},a.createElement(c.Z,{language:"js"},t)),a.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:E}},a.createElement(c.Z,{language:"ts"},o)),a.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:E}},a.createElement(c.Z,{language:"jsx"},s)),a.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:E}},a.createElement(c.Z,{language:"html"},f)),a.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:E}},a.createElement(c.Z,{language:"html"},g))))))}const h="container_Egsj";function g(e){const{className:t,style:n,showCode:r,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),g=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return a.createElement(a.Fragment,null,a.createElement(s,(0,o.Z)({className:`${h} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&a.createElement(f,{js:p,ts:u,react:m,vue:g,svelte:v}))}},9493:(e,t,n)=>{n.d(t,{T:()=>a,r:()=>r});var o=n(7728);async function a(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:o={},config:a={},import:r,headless:s,lite:i,loading:l="lazy",template:c,view:d}=t,p=s||"headless"===d;let u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!p)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),j(m),document.body.appendChild(m)}try{u=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const f=u.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{u.searchParams.set(e,String(o[e]))})),c&&u.searchParams.set("template",c),r&&u.searchParams.set("x",r),p&&u.searchParams.set("headless","true"),i&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof a&&null==a.mode?a.mode="lite":u.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof a&&null==a.view&&"headless"!==d?a.view=d:u.searchParams.set("view",d)),"string"==typeof a)try{new URL(a),u.searchParams.set("config",a)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof a)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(a).length>0&&u.searchParams.set("config","sdk")}u.searchParams.set("embed","true"),u.searchParams.set("loading",p?"eager":l);let h=!1;const g="Cannot call API methods after calling `destroy()`.",v=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||p||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const n="livecodes",o=m.querySelector(`iframe.${n}`),r=o||document.createElement("iframe");r.classList.add(n),r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const s="eager"===l?"eager":"lazy";r.setAttribute("loading",s),p?j(r):(r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===r.contentWindow&&t.origin===f&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:a},f))})),r.onload=()=>{e(r)},r.src=u.href,o||m.appendChild(r)})),y=new Promise((e=>{addEventListener("message",(function t(n){n.source===v.contentWindow&&n.origin===f&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),y.settled=!0)}))})),b=()=>h?Promise.reject(g):new Promise((async e=>{y.settled&&e();v.contentWindow?.postMessage({type:"livecodes-load"},f),await y,e()})),k=(e,t)=>new Promise((async(n,o)=>{if(h)return o(g);await b();const a=C();addEventListener("message",(function t(r){if(r.source===v.contentWindow&&r.origin===f&&"livecodes-api-response"===r.data?.type&&r.data?.id===a&&r.data.method===e){removeEventListener("message",t);const e=r.data.payload;e?.error?o(e.error):n(e)}})),v.contentWindow?.postMessage({method:e,id:a,args:t},f)})),w={},S=["load","ready","code","console","tests","destroy"],N=(e,t)=>{if(h)throw new Error(g);return S.includes(e)?(k("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&k("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==v.contentWindow||e.origin!==f||!t||!w[t])return;const n=e.data?.payload;w[t]?.forEach((e=>{e(n)}))}));const E=()=>{Object.values(w).forEach((e=>{e.length=0})),v?.remove?.(),h=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function j(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>k("run"),format:e=>k("format",[e]),getShareUrl:e=>k("getShareUrl",[e]),getConfig:e=>k("getConfig",[e]),setConfig:e=>k("setConfig",[e]),getCode:()=>k("getCode"),show:(e,t)=>k("show",[e,t]),runTests:()=>k("runTests"),onChange:e=>N("code",e),watch:N,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return k("exec",[e,...n])},destroy:()=>y.settled?k("destroy").then(E):h?Promise.reject(g):(E(),Promise.resolve())}}function r(e){void 0===e&&(e={});const{appUrl:t,params:n,config:a,import:r,...s}=e,i="string"==typeof a?{config:a}:"object"==typeof a?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(a))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:r,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o;const r=e.dataset.config||e.dataset.prefill;if(r)try{o=JSON.parse(r)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",a(e,{import:"dom/"+s,...t,...o?{config:o}:{}})}))}))},7047:(e,t,n)=>{n.r(t),n.d(t,{ESMCode:()=>m,UMDCode:()=>f,assets:()=>p,contentTitle:()=>c,default:()=>g,frontMatter:()=>l,metadata:()=>d,toc:()=>u});var o=n(7462),a=(n(7294),n(3905)),r=n(325),s=n(2263),i=n(814);const l={sidebar_class_name:"exclude_from_sidebar"},c="LiveCodes SDK",d={unversionedId:"sdk/index",id:"sdk/index",title:"LiveCodes SDK",description:"The Software Development Kit (SDK) provides an easy, yet powerful, interface to embed and communicate with LiveCodes playgrounds.",source:"@site/docs/sdk/index.md",sourceDirName:"sdk",slug:"/sdk/",permalink:"/livecodes/docs/sdk/",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/sdk/index.md",tags:[],version:"current",frontMatter:{sidebar_class_name:"exclude_from_sidebar"},sidebar:"docsSidebar",previous:{title:"Query Parameters",permalink:"/livecodes/docs/configuration/query-params"},next:{title:"JS/TS SDK",permalink:"/livecodes/docs/sdk/js-ts"}},p={},u=[{value:"SDK Demo",id:"sdk-demo",level:2},{value:"Installation",id:"installation",level:2},{value:"NPM Package",id:"npm-package",level:3},{value:"CDN",id:"cdn",level:3},{value:"Usage",id:"usage",level:2},{value:"Headless Mode",id:"headless-mode",level:2},{value:"SDK Playground!",id:"sdk-playground",level:2}],m=()=>{const{siteConfig:e}=(0,s.Z)();return(0,a.kt)(i.Z,{title:"index.html",language:"html",mdxType:"CodeBlock"},`<div id="container"></div>\n<script type="module">\n  import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@${e.customFields.sdkVersion}';\n\n${" ".repeat(2)}createPlayground('#container', {\n${" ".repeat(4)}// embed options  \n${" ".repeat(2)}});\n<\/script>`)},f=()=>{const{siteConfig:e}=(0,s.Z)();return(0,a.kt)(i.Z,{title:"index.html",language:"html",mdxType:"CodeBlock"},`<div id="container"></div>\n<script src="https://cdn.jsdelivr.net/npm/livecodes@${e.customFields.sdkVersion}/livecodes.umd.js"><\/script>\n<script>\n  // the UMD version provides the global object \`livecodes\`\n${" ".repeat(2)}livecodes.createPlayground('#container', {\n${" ".repeat(4)}// embed options  \n${" ".repeat(2)}});\n<\/script>\n`)},h={toc:u,ESMCode:m,UMDCode:f};function g(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"livecodes-sdk"},"LiveCodes SDK"),(0,a.kt)("p",null,"The Software Development Kit (SDK) provides an easy, yet powerful, interface to embed and communicate with LiveCodes playgrounds."),(0,a.kt)("p",null,"The SDK is provided as a light-weight (",(0,a.kt)("a",{parentName:"p",href:"https://bundlephobia.com/package/livecodes"},"less than 5kb gzipped"),"), zero-dependencies ",(0,a.kt)("a",{parentName:"p",href:"#npm-package"},"npm package"),", that is also available from ",(0,a.kt)("a",{parentName:"p",href:"#cdn"},"CDNs"),". It can be used to create playgrounds with a wide variety of ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configurations")," and ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options"),". In addition, ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#sdk-methods"},"SDK methods")," allow programmatic communication and control of the playgrounds during runtime."),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts"},"JavaScript SDK")," is framework/library agnostic. However, wrapper components are also provided for popular libraries (currently ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/react"},"React")," and ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/vue"},"Vue"),"). The SDK can be used in ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/svelte"},"Svelte")," directly without wrappers. ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#typescript-types"},"TypeScript support")," provides type-safety and a great developer experience."),(0,a.kt)("h2",{id:"sdk-demo"},"SDK Demo"),(0,a.kt)("p",null,"This is an example of an editable embedded playground using the SDK."),(0,a.kt)(r.Z,{config:{markup:{language:"markdown",content:"# Hello World!"},script:{language:"javascript",content:'console.log("Hello, from JS!");'},tools:{active:"console",status:"open"}},mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("h3",{id:"npm-package"},"NPM Package"),(0,a.kt)("p",null,"This is a single npm package for the SDK which supports JavaScript/TypeScript, React, Vue and Svelte.\nInstall the library from npm:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"npm i livecodes\n")),(0,a.kt)("p",null,"then it can be used like that:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="index.js"',title:'"index.js"'},"import { createPlayground } from 'livecodes';\n\ncreatePlayground('#container', {\n  // embed options\n});\n")),(0,a.kt)("h3",{id:"cdn"},"CDN"),(0,a.kt)("p",null,"Alternatively, it can just be loaded from a CDN."),(0,a.kt)("p",null,"ESM:"),(0,a.kt)(m,{mdxType:"ESMCode"}),(0,a.kt)("p",null,"UMD:"),(0,a.kt)(f,{mdxType:"UMDCode"}),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"In the full ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/getting-started#standalone-app"},"standalone app"),", the JavaScript SDK is accessible via the global variable ",(0,a.kt)("inlineCode",{parentName:"p"},"livecodes"),", which can be interacted with in the browser console.")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,"The SDK is currently provided in the following variations:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts"},"JavaScript/TypeScript"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/react"},"React"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/vue"},"Vue"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/svelte"},"Svelte")))),(0,a.kt)("h2",{id:"headless-mode"},"Headless Mode"),(0,a.kt)("p",null,"The SDK also has a ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/headless"},"headless mode"),". In this mode, no visible output is displayed in the embedding web page. However, all ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#sdk-methods"},"SDK methods")," are accessible. This provides the power of leveraging the wide range of features and language support offered by LiveCodes, while retaining full control over the UI."),(0,a.kt)("h2",{id:"sdk-playground"},"SDK Playground!"),(0,a.kt)("p",null,"A demo page that shows the usage of the SDK can be ",(0,a.kt)("a",{parentName:"p",href:"https://live-codes.github.io/livecodes-examples/sdk-demo.html"},"found here")," (",(0,a.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes-examples/blob/gh-pages/sdk-demo.html"},"source"),")."),(0,a.kt)("p",null,"Or edit the SDK playground in LiveCodes. How meta! :)"),(0,a.kt)(r.Z,{import:"id/nqdxpnj6uvg",view:"result",height:"80vh",showCode:!1,mdxType:"LiveCodes"}),(0,a.kt)("p",null,'P.S. You may want to use the "Full Screen" button!'))}g.isMDXComponent=!0}}]);