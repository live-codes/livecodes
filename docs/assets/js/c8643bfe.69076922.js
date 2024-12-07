"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9217],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=a,f=u["".concat(l,".").concat(m)]||u[m]||p[m]||o;return n?r.createElement(f,s(s({ref:t},d),{},{components:n})):r.createElement(f,s({ref:t},d))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(7462),a=n(7294),o=n(9493);function s(e){const t=(0,a.useRef)(null),[n,r]=(0,a.useState)(e.className||""),[s,i]=(0,a.useState)(e.style||{}),[l,c]=(0,a.useState)(e.height),[d,u]=(0,a.useState)(),[p,m]=(0,a.useState)(JSON.stringify(e.config||"")),[f,g]=(0,a.useState)("");return(0,a.useEffect)((()=>{if(!t.current)return;const{className:n,style:a,height:s,sdkReady:l,config:h,...y}=e;if(r(n||""),i(a||{}),c(s),d&&f===JSON.stringify(y)){if(p===JSON.stringify(h))return;m(JSON.stringify(h)),"string"==typeof h?fetch(h).then((e=>e.json())).then((e=>{d?.setConfig(e)})):h&&d.setConfig(h)}else g(JSON.stringify(y)),d?.destroy(),(0,o.T)(t.current,{config:h,...y}).then((e=>{u(e),"function"==typeof l&&l(e)}))}),[e]),(0,a.useEffect)((()=>()=>{d?.destroy()}),[]),a.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),u=n(5162),p=n(2134),m=n(420);function f(e){const[t,n]=(0,a.useState)(e.js),[r,o]=(0,a.useState)(e.ts),[s,i]=(0,a.useState)(e.react),[f,g]=(0,a.useState)(e.vue),[h,y]=(0,a.useState)(e.svelte),v="3.7rem",[b,w]=(0,a.useState)(!0),[k,E]=(0,a.useState)(v),S=(0,a.useRef)(null),N=()=>{setTimeout((()=>{E(`calc(${S.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{E(`calc(${S.current.offsetHeight}px + ${v})`)}),255)};return(0,a.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),o(e(r,"ts")),i(e(s,"jsx")),g(e(f,"html")),y(e(h,"html"))}}),[]),a.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},a.createElement("summary",{onClick:()=>{w(!b),N()}},"show code"),a.createElement("div",{ref:S,style:{display:"block",overflow:"hidden"}},a.createElement("div",{className:p.Z.collapsibleContent},a.createElement(d.Z,{groupId:"sdk-code"},a.createElement(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:N}},a.createElement(c.Z,{language:"js"},t)),a.createElement(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:N}},a.createElement(c.Z,{language:"ts"},r)),a.createElement(u.Z,{value:"react",label:"React",attributes:{onMouseDown:N}},a.createElement(c.Z,{language:"jsx"},s)),a.createElement(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:N}},a.createElement(c.Z,{language:"html"},f)),a.createElement(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:N}},a.createElement(c.Z,{language:"html"},h))))))}const g="container_Egsj";function h(e){const{className:t,style:n,showCode:o,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),u=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return a.createElement(a.Fragment,null,a.createElement(s,(0,r.Z)({className:`${g} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(166, 40%, 50%",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&a.createElement(f,{js:u,ts:p,react:m,vue:h,svelte:y}))}},9493:(e,t,n)=>{n.d(t,{T:()=>a,r:()=>o});var r=n(7728);async function a(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:r={},config:a={},import:o,lite:s,loading:i="lazy",template:l,view:c="split"}=t,d="headless"===c;let u,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!d||"object"!=typeof e)throw new Error("A valid container element is required.");if(!p){if(!d)throw new Error(`Cannot find element: "${e}"`);p=document.createElement("div"),N(p),document.body.appendChild(p)}try{u=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const m=u.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{u.searchParams.set(e,String(r[e]))})),"string"==typeof a)try{new URL(a),u.searchParams.set("config",a)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof a)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(a).length>0&&u.searchParams.set("config","sdk")}l&&u.searchParams.set("template",l),o&&u.searchParams.set("x",o),s&&u.searchParams.set("lite","true"),u.searchParams.set("embed","true"),u.searchParams.set("loading",d?"eager":i),u.searchParams.set("view",c);let f=!1;const g="Cannot call API methods after calling `destroy()`.",h=await new Promise((e=>{if(!p)return;const t=p.dataset.height||p.style.height;if(t&&!d){const e=isNaN(Number(t))?t:t+"px";p.style.height=e}"false"===p.dataset.defaultStyles||d||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="8px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const r="eager"===i?"eager":"lazy";n.setAttribute("loading",r),n.classList.add("livecodes"),d?N(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=p.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:a},m))})),n.onload=()=>{e(n)},n.src=u.href,p.appendChild(n)})),y=new Promise((e=>{addEventListener("message",(function t(n){n.source===h.contentWindow&&n.origin===m&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),y.settled=!0)}))})),v=()=>f?Promise.reject(g):new Promise((async e=>{y.settled&&e();h.contentWindow?.postMessage({type:"livecodes-load"},m),await y,e()})),b=(e,t)=>new Promise((async(n,r)=>{if(f)return r(g);await v();const a=O();addEventListener("message",(function t(o){if(o.source===h.contentWindow&&o.origin===m&&"livecodes-api-response"===o.data?.type&&o.data?.id===a&&o.data.method===e){removeEventListener("message",t);const e=o.data.payload;e?.error?r(e.error):n(e)}})),h.contentWindow?.postMessage({method:e,id:a,args:t},m)})),w={},k=["load","ready","code","console","tests","destroy"],E=(e,t)=>{if(f)throw new Error(g);return k.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==h.contentWindow||e.origin!==m||!t||!w[t])return;const n=e.data?.payload;w[t]?.forEach((e=>{e(n)}))}));const S=()=>{Object.values(w).forEach((e=>{e.length=0})),h?.remove?.(),f=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(p))}))}),{rootMargin:"150px"}).observe(p)}function N(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const O=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>E("code",e),watch:E,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return b("exec",[e,...n])},destroy:()=>y.settled?b("destroy").then(S):f?Promise.reject(g):(S(),Promise.resolve())}}function o(e){void 0===e&&(e={});const{appUrl:t,params:n,config:a,import:o,...s}=e,i="string"==typeof a?{config:a}:"object"==typeof a?{x:"code/"+(0,r.compressToEncodedURIComponent)(JSON.stringify(a))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:o,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let r;const o=e.dataset.config||e.dataset.prefill;if(o)try{r=JSON.parse(o)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",a(e,{import:"dom/"+s,...t,...r?{config:r}:{}})}))}))},92:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>l,params:()=>u,toc:()=>d});var r=n(7462),a=(n(7294),n(3905)),o=n(325);const s={},i="Sucrase",l={unversionedId:"languages/sucrase",id:"languages/sucrase",title:"Sucrase",description:"Sucrase is a super-fast alternative to Babel for when you can target modern JS runtimes.",source:"@site/docs/languages/sucrase.md",sourceDirName:"languages",slug:"/languages/sucrase",permalink:"/livecodes/docs/languages/sucrase",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/sucrase.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Stylus",permalink:"/livecodes/docs/languages/stylus"},next:{title:"Svelte",permalink:"/livecodes/docs/languages/svelte"}},c={},d=[{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Links",id:"links",level:2}],u={sucrase:"export const Greet = (name: string) => <>Hello {name}!</>;",compiled:"open"},p={toc:d,params:u};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"sucrase"},"Sucrase"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://sucrase.io/"},"Sucrase")," is a super-fast alternative to ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/babel"},"Babel")," for when you can target modern JS runtimes."),(0,a.kt)("h2",{id:"language-info"},"Language Info"),(0,a.kt)("h3",{id:"name"},"Name"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"sucrase")),(0,a.kt)("h3",{id:"extension"},"Extension"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},".sucrase")),(0,a.kt)("h3",{id:"editor"},"Editor"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"script")),(0,a.kt)("h2",{id:"compiler"},"Compiler"),(0,a.kt)("p",null,"The official ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alangpierce/sucrase"},"Sucrase compiler"),"."),(0,a.kt)("h3",{id:"version"},"Version"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"sucrase"),": v3.32.0"),(0,a.kt)("h2",{id:"custom-settings"},"Custom Settings"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"Custom settings")," added to the property ",(0,a.kt)("inlineCode",{parentName:"p"},"sucrase")," are passed as a JSON object to the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alangpierce/sucrase#usage-from-code"},(0,a.kt)("inlineCode",{parentName:"a"},"transform")," function")," during compile. Please check the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alangpierce/sucrase"},"documentation")," for full reference."),(0,a.kt)("p",null,"By default, the following transforms are enabled: ",(0,a.kt)("inlineCode",{parentName:"p"},"['jsx', 'typescript']")),(0,a.kt)("p",null,"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Example:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "sucrase": { "transforms": ["typescript", "imports"] }\n}\n')),(0,a.kt)("h2",{id:"example-usage"},"Example Usage"),(0,a.kt)(o.Z,{params:u,mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"links"},"Links"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://sucrase.io/"},"Sucrase official website")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/alangpierce/sucrase"},"Sucrase GitHub Repo"))))}m.isMDXComponent=!0}}]);