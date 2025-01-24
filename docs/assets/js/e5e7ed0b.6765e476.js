"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4432],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>f});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=o.createContext({}),c=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(r),m=n,f=p["".concat(l,".").concat(m)]||p[m]||u[m]||a;return r?o.createElement(f,s(s({ref:t},d),{},{components:r})):o.createElement(f,s({ref:t},d))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:n,s[1]=i;for(var c=2;c<a;c++)s[c]=r[c];return o.createElement.apply(null,s)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},325:(e,t,r)=>{r.d(t,{Z:()=>y});var o=r(7462),n=r(7294),a=r(9493);function s(e){const t=(0,n.useRef)(null),[r,o]=(0,n.useState)(e.className||""),[s,i]=(0,n.useState)(e.style||{}),[l,c]=(0,n.useState)(e.height),[d,p]=(0,n.useState)(),[u,m]=(0,n.useState)(JSON.stringify(e.config||"")),[f,g]=(0,n.useState)("");return(0,n.useEffect)((()=>{if(!t.current)return;const{className:r,style:n,height:s,sdkReady:l,config:y,...h}=e;if(o(r||""),i(n||{}),c(s),d&&f===JSON.stringify(h)){if(u===JSON.stringify(y))return;m(JSON.stringify(y)),"string"==typeof y?fetch(y).then((e=>e.json())).then((e=>{d?.setConfig(e)})):y&&d.setConfig(y)}else g(JSON.stringify(h)),d?.destroy(),(0,a.T)(t.current,{config:y,...h}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,n.useEffect)((()=>()=>{d?.destroy()}),[]),n.createElement("div",{ref:t,className:r,style:s,"data-height":l})}var i=r(1446),l=r(412),c=r(814),d=r(4866),p=r(5162),u=r(2134),m=r(420);function f(e){const[t,r]=(0,n.useState)(e.js),[o,a]=(0,n.useState)(e.ts),[s,i]=(0,n.useState)(e.react),[f,g]=(0,n.useState)(e.vue),[y,h]=(0,n.useState)(e.svelte),v="3.7rem",[b,w]=(0,n.useState)(!0),[k,E]=(0,n.useState)(v),S=(0,n.useRef)(null),O=()=>{setTimeout((()=>{E(`calc(${S.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{E(`calc(${S.current.offsetHeight}px + ${v})`)}),255)};return(0,n.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};r(e(t,"js")),a(e(o,"ts")),i(e(s,"jsx")),g(e(f,"html")),h(e(y,"html"))}}),[]),n.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},n.createElement("summary",{onClick:()=>{w(!b),O()}},"show code"),n.createElement("div",{ref:S,style:{display:"block",overflow:"hidden"}},n.createElement("div",{className:u.Z.collapsibleContent},n.createElement(d.Z,{groupId:"sdk-code"},n.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:O}},n.createElement(c.Z,{language:"js"},t)),n.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:O}},n.createElement(c.Z,{language:"ts"},o)),n.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:O}},n.createElement(c.Z,{language:"jsx"},s)),n.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:O}},n.createElement(c.Z,{language:"html"},f)),n.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:O}},n.createElement(c.Z,{language:"html"},y))))))}const g="container_Egsj";function y(e){const{className:t,style:r,showCode:a,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),y=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,h=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return n.createElement(n.Fragment,null,n.createElement(s,(0,o.Z)({className:`${g} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&n.createElement(f,{js:p,ts:u,react:m,vue:y,svelte:h}))}},9493:(e,t,r)=>{r.d(t,{T:()=>n,r:()=>a});var o=r(7728);async function n(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:r="https://livecodes.io/",params:o={},config:n={},import:a,headless:s,lite:i,loading:l="lazy",template:c,view:d}=t,p=s||"headless"===d;let u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!p)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),j(m),document.body.appendChild(m)}try{u=new URL(r)}catch{throw new Error(`"${r}" is not a valid URL.`)}const f=u.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{u.searchParams.set(e,String(o[e]))})),c&&u.searchParams.set("template",c),a&&u.searchParams.set("x",a),p&&u.searchParams.set("headless","true"),i&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof n&&null==n.mode?n.mode="lite":u.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof n&&null==n.view&&"headless"!==d?n.view=d:u.searchParams.set("view",d)),"string"==typeof n)try{new URL(n),u.searchParams.set("config",n)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof n)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(n).length>0&&u.searchParams.set("config","sdk")}u.searchParams.set("embed","true"),u.searchParams.set("loading",p?"eager":l);let g=!1;const y="Cannot call API methods after calling `destroy()`.",h=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||p||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const r="livecodes",o=m.querySelector(`iframe.${r}`),a=o||document.createElement("iframe");a.classList.add(r),a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const s="eager"===l?"eager":"lazy";a.setAttribute("loading",s),p?j(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===f&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:n},f))})),a.onload=()=>{e(a)},a.src=u.href,o||m.appendChild(a)})),v=new Promise((e=>{addEventListener("message",(function t(r){r.source===h.contentWindow&&r.origin===f&&"livecodes-ready"===r.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),b=()=>g?Promise.reject(y):new Promise((async e=>{v.settled&&e();h.contentWindow?.postMessage({type:"livecodes-load"},f),await v,e()})),w=(e,t)=>new Promise((async(r,o)=>{if(g)return o(y);await b();const n=P();addEventListener("message",(function t(a){if(a.source===h.contentWindow&&a.origin===f&&"livecodes-api-response"===a.data?.type&&a.data?.id===n&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?o(e.error):r(e)}})),h.contentWindow?.postMessage({method:e,id:n,args:t},f)})),k={},E=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw new Error(y);return E.includes(e)?(w("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter((e=>e!==t)),0===k[e]?.length&&w("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==h.contentWindow||e.origin!==f||!t||!k[t])return;const r=e.data?.payload;k[t]?.forEach((e=>{e(r)}))}));const O=()=>{Object.values(k).forEach((e=>{e.length=0})),h?.remove?.(),g=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function j(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const P=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>w("run"),format:e=>w("format",[e]),getShareUrl:e=>w("getShareUrl",[e]),getConfig:e=>w("getConfig",[e]),setConfig:e=>w("setConfig",[e]),getCode:()=>w("getCode"),show:(e,t)=>w("show",[e,t]),runTests:()=>w("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return w("exec",[e,...r])},destroy:()=>v.settled?w("destroy").then(O):g?Promise.reject(y):(O(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:r,config:n,import:a,...s}=e,i="string"==typeof n?{config:n}:"object"==typeof n?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(n))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...r,x:a,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const r=e.dataset.options;if(r)try{t=JSON.parse(r)}catch{}let o;const a=e.dataset.config||e.dataset.prefill;if(a)try{o=JSON.parse(a)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",n(e,{import:"dom/"+s,...t,...o?{config:o}:{}})}))}))},5493:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var o=r(7462),n=(r(7294),r(3905)),a=r(325);const s={},i="Code Prefill",l={unversionedId:"features/code-prefill",id:"features/code-prefill",title:"Code Prefill",description:"There are many ways to pre-fill code into playgrounds. This is generally achieved either by the SDK or using query params.",source:"@site/docs/features/code-prefill.md",sourceDirName:"features",slug:"/features/code-prefill",permalink:"/livecodes/docs/features/code-prefill",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/code-prefill.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Permanent URL",permalink:"/livecodes/docs/features/permanent-url"},next:{title:"Data URLs",permalink:"/livecodes/docs/features/data-urls"}},c={},d=[{value:"Prefill using SDK",id:"prefill-using-sdk",level:2},{value:"config",id:"config",level:3},{value:"import",id:"import",level:3},{value:"template",id:"template",level:3},{value:"Prefill using query params",id:"prefill-using-query-params",level:2},{value:"Auto-Prefill from page DOM",id:"auto-prefill-from-page-dom",level:2},{value:"Related",id:"related",level:2}],p={toc:d};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"code-prefill"},"Code Prefill"),(0,n.kt)("p",null,"There are many ways to pre-fill code into playgrounds. This is generally achieved either by the ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," or using ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query params"),"."),(0,n.kt)("h2",{id:"prefill-using-sdk"},"Prefill using SDK"),(0,n.kt)("p",null,"When creating an embedded playground, the following ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options")," allow prefill with code:"),(0,n.kt)("h3",{id:"config"},"config"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#config"},"EmbedOptions.config")),(0,n.kt)("p",null,"loads a ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," (or a URL to JSON file representing the configuration object)"),(0,n.kt)(a.Z,{config:{markup:{language:"html",content:"<h1>Hello World!</h1>"},style:{language:"css",content:"h1 { color: blue; }"}},mdxType:"LiveCodes"}),(0,n.kt)("h3",{id:"import"},"import"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#import"},"EmbedOptions.import")),(0,n.kt)("p",null,"allows ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/features/import"},"importing")," from many sources."),(0,n.kt)("p",null,"Examples:"),(0,n.kt)("p",null,"Import GitHub directory:"),(0,n.kt)(a.Z,{import:"https://github.com/bradtraversy/50projects50days/tree/master/progress-steps",mdxType:"LiveCodes"}),(0,n.kt)("p",null,"Import shared project:"),(0,n.kt)(a.Z,{import:"id/6ys2b8txf33",mdxType:"LiveCodes"}),(0,n.kt)("h3",{id:"template"},"template"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#template"},"EmbedOptions.template")),(0,n.kt)("p",null,"loads one of the ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/features/templates"},"starter templates"),"."),(0,n.kt)(a.Z,{template:"react",mdxType:"LiveCodes"}),(0,n.kt)("h2",{id:"prefill-using-query-params"},"Prefill using query params"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"Query parameters")," can provide easy and powerful ways for configuring the playground."),(0,n.kt)("p",null,"Example:"),(0,n.kt)("a",{href:"https://livecodes.io/?md=**Hello World!**",target:"_blank"},"https://livecodes.io/?md=**Hello World!**"),(0,n.kt)("br",null),(0,n.kt)("br",null),(0,n.kt)(a.Z,{params:{md:"**Hello World!**"},mdxType:"LiveCodes"}),(0,n.kt)("h2",{id:"auto-prefill-from-page-dom"},"Auto-Prefill from page DOM"),(0,n.kt)("p",null,"TODO..."),(0,n.kt)("h2",{id:"related"},"Related"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/import"},"Import")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/templates"},"Templates")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/"},"Configuration")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/"},"SDK"))))}u.isMDXComponent=!0}}]);