"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9217],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=o,f=u["".concat(l,".").concat(m)]||u[m]||p[m]||a;return n?r.createElement(f,s(s({ref:t},d),{},{components:n})):r.createElement(f,s({ref:t},d))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:o,s[1]=i;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(7462),o=n(7294),a=n(9493);function s(e){const t=(0,o.useRef)(null),[n,r]=(0,o.useState)(e.className||""),[s,i]=(0,o.useState)(e.style||{}),[l,c]=(0,o.useState)(e.height),[d,u]=(0,o.useState)(),[p,m]=(0,o.useState)(JSON.stringify(e.config||"")),[f,g]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(!t.current)return;const{className:n,style:o,height:s,sdkReady:l,config:h,...y}=e;if(r(n||""),i(o||{}),c(s),d&&f===JSON.stringify(y)){if(p===JSON.stringify(h))return;m(JSON.stringify(h)),"string"==typeof h?fetch(h).then((e=>e.json())).then((e=>{d?.setConfig(e)})):h&&d.setConfig(h)}else g(JSON.stringify(y)),d?.destroy(),(0,a.T)(t.current,{config:h,...y}).then((e=>{u(e),"function"==typeof l&&l(e)}))}),[e]),(0,o.useEffect)((()=>()=>{d?.destroy()}),[]),o.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),u=n(5162),p=n(2134),m=n(420);function f(e){const[t,n]=(0,o.useState)(e.js),[r,a]=(0,o.useState)(e.ts),[s,i]=(0,o.useState)(e.react),[f,g]=(0,o.useState)(e.vue),[h,y]=(0,o.useState)(e.svelte),v="3.7rem",[b,w]=(0,o.useState)(!0),[k,E]=(0,o.useState)(v),S=(0,o.useRef)(null),N=()=>{setTimeout((()=>{E(`calc(${S.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{E(`calc(${S.current.offsetHeight}px + ${v})`)}),255)};return(0,o.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(r,"ts")),i(e(s,"jsx")),g(e(f,"html")),y(e(h,"html"))}}),[]),o.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},o.createElement("summary",{onClick:()=>{w(!b),N()}},"show code"),o.createElement("div",{ref:S,style:{display:"block",overflow:"hidden"}},o.createElement("div",{className:p.Z.collapsibleContent},o.createElement(d.Z,{groupId:"sdk-code"},o.createElement(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:N}},o.createElement(c.Z,{language:"js"},t)),o.createElement(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:N}},o.createElement(c.Z,{language:"ts"},r)),o.createElement(u.Z,{value:"react",label:"React",attributes:{onMouseDown:N}},o.createElement(c.Z,{language:"jsx"},s)),o.createElement(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:N}},o.createElement(c.Z,{language:"html"},f)),o.createElement(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:N}},o.createElement(c.Z,{language:"html"},h))))))}const g="container_Egsj";function h(e){const{className:t,style:n,showCode:a,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),u=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return o.createElement(o.Fragment,null,o.createElement(s,(0,r.Z)({className:`${g} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&o.createElement(f,{js:u,ts:p,react:m,vue:h,svelte:y}))}},9493:(e,t,n)=>{n.d(t,{T:()=>o,r:()=>a});var r=n(7728);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:r={},config:o={},import:a,headless:s,lite:i,loading:l="lazy",template:c,view:d}=t,u=s||"headless"===d;let p,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!u||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!u)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),O(m),document.body.appendChild(m)}try{p=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const f=p.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{p.searchParams.set(e,String(r[e]))})),c&&p.searchParams.set("template",c),a&&p.searchParams.set("x",a),u&&p.searchParams.set("headless","true"),i&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof o&&null==o.mode?o.mode="lite":p.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof o&&null==o.view&&"headless"!==d?o.view=d:p.searchParams.set("view",d)),"string"==typeof o)try{new URL(o),p.searchParams.set("config",o)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof o)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(o).length>0&&p.searchParams.set("config","sdk")}p.searchParams.set("embed","true"),p.searchParams.set("loading",u?"eager":l);let g=!1;const h="Cannot call API methods after calling `destroy()`.",y=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!u){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||u||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const n="livecodes",r=m.querySelector(`iframe.${n}`),a=r||document.createElement("iframe");a.classList.add(n),a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const s="eager"===l?"eager":"lazy";a.setAttribute("loading",s),u?O(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===f&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:o},f))})),a.onload=()=>{e(a)},a.src=p.href,r||m.appendChild(a)})),v=new Promise((e=>{addEventListener("message",(function t(n){n.source===y.contentWindow&&n.origin===f&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),b=()=>g?Promise.reject(h):new Promise((async e=>{v.settled&&e();y.contentWindow?.postMessage({type:"livecodes-load"},f),await v,e()})),w=(e,t)=>new Promise((async(n,r)=>{if(g)return r(h);await b();const o=C();addEventListener("message",(function t(a){if(a.source===y.contentWindow&&a.origin===f&&"livecodes-api-response"===a.data?.type&&a.data?.id===o&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?r(e.error):n(e)}})),y.contentWindow?.postMessage({method:e,id:o,args:t},f)})),k={},E=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw new Error(h);return E.includes(e)?(w("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter((e=>e!==t)),0===k[e]?.length&&w("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==y.contentWindow||e.origin!==f||!t||!k[t])return;const n=e.data?.payload;k[t]?.forEach((e=>{e(n)}))}));const N=()=>{Object.values(k).forEach((e=>{e.length=0})),y?.remove?.(),g=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function O(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>w("run"),format:e=>w("format",[e]),getShareUrl:e=>w("getShareUrl",[e]),getConfig:e=>w("getConfig",[e]),setConfig:e=>w("setConfig",[e]),getCode:()=>w("getCode"),show:(e,t)=>w("show",[e,t]),runTests:()=>w("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return w("exec",[e,...n])},destroy:()=>v.settled?w("destroy").then(N):g?Promise.reject(h):(N(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:n,config:o,import:a,...s}=e,i="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,r.compressToEncodedURIComponent)(JSON.stringify(o))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:a,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let r;const a=e.dataset.config||e.dataset.prefill;if(a)try{r=JSON.parse(a)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+s,...t,...r?{config:r}:{}})}))}))},92:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>l,params:()=>u,toc:()=>d});var r=n(7462),o=(n(7294),n(3905)),a=n(325);const s={},i="Sucrase",l={unversionedId:"languages/sucrase",id:"languages/sucrase",title:"Sucrase",description:"Sucrase is a super-fast alternative to Babel for when you can target modern JS runtimes.",source:"@site/docs/languages/sucrase.md",sourceDirName:"languages",slug:"/languages/sucrase",permalink:"/livecodes/docs/languages/sucrase",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/sucrase.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Stylus",permalink:"/livecodes/docs/languages/stylus"},next:{title:"Svelte",permalink:"/livecodes/docs/languages/svelte"}},c={},d=[{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Links",id:"links",level:2}],u={sucrase:"export const Greet = (name: string) => <>Hello {name}!</>;",compiled:"open"},p={toc:d,params:u};function m(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"sucrase"},"Sucrase"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://sucrase.io/"},"Sucrase")," is a super-fast alternative to ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/babel"},"Babel")," for when you can target modern JS runtimes."),(0,o.kt)("h2",{id:"language-info"},"Language Info"),(0,o.kt)("h3",{id:"name"},"Name"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"sucrase")),(0,o.kt)("h3",{id:"extension"},"Extension"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},".sucrase")),(0,o.kt)("h3",{id:"editor"},"Editor"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"script")),(0,o.kt)("h2",{id:"compiler"},"Compiler"),(0,o.kt)("p",null,"The official ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/alangpierce/sucrase"},"Sucrase compiler"),"."),(0,o.kt)("h3",{id:"version"},"Version"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"sucrase"),": v3.32.0"),(0,o.kt)("h2",{id:"custom-settings"},"Custom Settings"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"Custom settings")," added to the property ",(0,o.kt)("inlineCode",{parentName:"p"},"sucrase")," are passed as a JSON object to the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/alangpierce/sucrase#usage-from-code"},(0,o.kt)("inlineCode",{parentName:"a"},"transform")," function")," during compile. Please check the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/alangpierce/sucrase"},"documentation")," for full reference."),(0,o.kt)("p",null,"By default, the following transforms are enabled: ",(0,o.kt)("inlineCode",{parentName:"p"},"['jsx', 'typescript']")),(0,o.kt)("p",null,"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Example:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "sucrase": { "transforms": ["typescript", "imports"] }\n}\n')),(0,o.kt)("h2",{id:"example-usage"},"Example Usage"),(0,o.kt)(a.Z,{params:u,mdxType:"LiveCodes"}),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://sucrase.io/"},"Sucrase official website")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/alangpierce/sucrase"},"Sucrase GitHub Repo"))))}m.isMDXComponent=!0}}]);