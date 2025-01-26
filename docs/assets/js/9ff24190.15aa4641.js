"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4895],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,f=u["".concat(l,".").concat(m)]||u[m]||p[m]||a;return n?o.createElement(f,s(s({ref:t},d),{},{components:n})):o.createElement(f,s({ref:t},d))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<a;c++)s[c]=n[c];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>y});var o=n(7462),r=n(7294),a=n(9493);function s(e){const t=(0,r.useRef)(null),[n,o]=(0,r.useState)(e.className||""),[s,i]=(0,r.useState)(e.style||{}),[l,c]=(0,r.useState)(e.height),[d,u]=(0,r.useState)(),[p,m]=(0,r.useState)(JSON.stringify(e.config||"")),[f,g]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(!t.current)return;const{className:n,style:r,height:s,sdkReady:l,config:y,...h}=e;if(o(n||""),i(r||{}),c(s),d&&f===JSON.stringify(h)){if(p===JSON.stringify(y))return;m(JSON.stringify(y)),"string"==typeof y?fetch(y).then((e=>e.json())).then((e=>{d?.setConfig(e)})):y&&d.setConfig(y)}else g(JSON.stringify(h)),d?.destroy(),(0,a.T)(t.current,{config:y,...h}).then((e=>{u(e),"function"==typeof l&&l(e)}))}),[e]),(0,r.useEffect)((()=>()=>{d?.destroy()}),[]),r.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),u=n(5162),p=n(2134),m=n(420);function f(e){const[t,n]=(0,r.useState)(e.js),[o,a]=(0,r.useState)(e.ts),[s,i]=(0,r.useState)(e.react),[f,g]=(0,r.useState)(e.vue),[y,h]=(0,r.useState)(e.svelte),v="3.7rem",[w,b]=(0,r.useState)(!0),[k,E]=(0,r.useState)(v),j=(0,r.useRef)(null),S=()=>{setTimeout((()=>{E(`calc(${j.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{E(`calc(${j.current.offsetHeight}px + ${v})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(o,"ts")),i(e(s,"jsx")),g(e(f,"html")),h(e(y,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":w,style:{height:w?v:k,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{b(!w),S()}},"show code"),r.createElement("div",{ref:j,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:p.Z.collapsibleContent},r.createElement(d.Z,{groupId:"sdk-code"},r.createElement(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"js"},t)),r.createElement(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"ts"},o)),r.createElement(u.Z,{value:"react",label:"React",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"jsx"},s)),r.createElement(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"html"},f)),r.createElement(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"html"},y))))))}const g="container_Egsj";function y(e){const{className:t,style:n,showCode:a,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),u=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),y=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,h=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(s,(0,o.Z)({className:`${g} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&r.createElement(f,{js:u,ts:p,react:m,vue:y,svelte:h}))}},9493:(e,t,n)=>{n.d(t,{T:()=>r,r:()=>a});var o=n(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:o={},config:r={},import:a,headless:s,lite:i,loading:l="lazy",template:c,view:d}=t,u=s||"headless"===d;let p,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!u||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!u)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),O(m),document.body.appendChild(m)}try{p=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const f=p.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{p.searchParams.set(e,String(o[e]))})),c&&p.searchParams.set("template",c),a&&p.searchParams.set("x",a),u&&p.searchParams.set("headless","true"),i&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":p.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==d?r.view=d:p.searchParams.set("view",d)),"string"==typeof r)try{new URL(r),p.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&p.searchParams.set("config","sdk")}p.searchParams.set("embed","true"),p.searchParams.set("loading",u?"eager":l);let g=!1;const y="Cannot call API methods after calling `destroy()`.",h=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!u){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||u||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const n="livecodes",o=m.querySelector(`iframe.${n}`),a=o||document.createElement("iframe");a.classList.add(n),a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const s="eager"===l?"eager":"lazy";a.setAttribute("loading",s),u?O(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===f&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:r},f))})),a.onload=()=>{e(a)},a.src=p.href,o||m.appendChild(a)})),v=new Promise((e=>{addEventListener("message",(function t(n){n.source===h.contentWindow&&n.origin===f&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),w=()=>g?Promise.reject(y):new Promise((async e=>{v.settled&&e();h.contentWindow?.postMessage({type:"livecodes-load"},f),await v,e()})),b=(e,t)=>new Promise((async(n,o)=>{if(g)return o(y);await w();const r=N();addEventListener("message",(function t(a){if(a.source===h.contentWindow&&a.origin===f&&"livecodes-api-response"===a.data?.type&&a.data?.id===r&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?o(e.error):n(e)}})),h.contentWindow?.postMessage({method:e,id:r,args:t},f)})),k={},E=["load","ready","code","console","tests","destroy"],j=(e,t)=>{if(g)throw new Error(y);return E.includes(e)?(b("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter((e=>e!==t)),0===k[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==h.contentWindow||e.origin!==f||!t||!k[t])return;const n=e.data?.payload;k[t]?.forEach((e=>{e(n)}))}));const S=()=>{Object.values(k).forEach((e=>{e.length=0})),h?.remove?.(),g=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await w(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function O(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const N=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>w(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>j("code",e),watch:j,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return b("exec",[e,...n])},destroy:()=>v.settled?b("destroy").then(S):g?Promise.reject(y):(S(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:n,config:r,import:a,...s}=e,i="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:a,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o;const a=e.dataset.config||e.dataset.prefill;if(a)try{o=JSON.parse(a)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+s,...t,...o?{config:o}:{}})}))}))},97:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var o=n(7462),r=(n(7294),n(3905)),a=n(325);const s={},i="Read-Only",l={unversionedId:"features/read-only",id:"features/read-only",title:"Read-Only",description:"In case you need to embed a playground in your web page to show case some code and want users to read through the code and not allow edits, you may use the readonly setting.",source:"@site/docs/features/read-only.md",sourceDirName:"features",slug:"/features/read-only",permalink:"/livecodes/docs/features/read-only",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/read-only.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Lite Mode",permalink:"/livecodes/docs/features/lite"},next:{title:"Permanent URL",permalink:"/livecodes/docs/features/permanent-url"}},c={},d=[{value:"Using SDK",id:"using-sdk",level:2},{value:"Using query params",id:"using-query-params",level:2},{value:"Related",id:"related",level:2}],u={toc:d};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"read-only"},"Read-Only"),(0,r.kt)("p",null,"In case you need to embed a playground in your web page to show case some code and want users to read through the code and not allow edits, you may use the ",(0,r.kt)("inlineCode",{parentName:"p"},"readonly")," setting."),(0,r.kt)("p",null,"Code editing, ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/code-format"},"formatting"),", and ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/console"},"console input")," are not available. However, any language supported by LiveCodes can be used, with syntax highlighting. Code can be ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/code-prefill"},"prefilled"),", and is compiled and shown in the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," as usual."),(0,r.kt)("p",null,"By default, a light-weight, minimal ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/editor-settings#code-editor"},"code editor")," is used. This can be changed by explicitly setting the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," property ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editor"},(0,r.kt)("inlineCode",{parentName:"a"},"editor"))," (e.g. to show hover intellisense)."),(0,r.kt)("p",null,"Demo:"),(0,r.kt)(a.Z,{template:"javascript",config:{readonly:!0},mdxType:"LiveCodes"}),(0,r.kt)("h2",{id:"using-sdk"},"Using SDK"),(0,r.kt)("p",null,"set the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," property ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#readonly"},(0,r.kt)("inlineCode",{parentName:"a"},"readonly"))," to ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { createPlayground } from 'livecodes';\n\ncreatePlayground('#container', { template: 'javascript', config: { readonly: true } });\n")),(0,r.kt)("h2",{id:"using-query-params"},"Using query params"),(0,r.kt)("p",null,"add the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query parameter")," ",(0,r.kt)("inlineCode",{parentName:"p"},"readonly")," (no need to set a value)."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io?template=javascript&readonly"},"https://livecodes.io?template=javascript&readonly")),(0,r.kt)("h2",{id:"related"},"Related"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/code-prefill"},"Code prefill")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/lite"},"Lite mode"))))}p.isMDXComponent=!0}}]);