"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[359],{3905:(e,t,o)=>{o.d(t,{Zo:()=>d,kt:()=>f});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function s(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?s(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)o=s[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)o=s[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):a(a({},t),e)),o},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(o),m=r,f=p["".concat(l,".").concat(m)]||p[m]||u[m]||s;return o?n.createElement(f,a(a({ref:t},d),{},{components:o})):n.createElement(f,a({ref:t},d))}));function f(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=o.length,a=new Array(s);a[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:r,a[1]=i;for(var c=2;c<s;c++)a[c]=o[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},325:(e,t,o)=>{o.d(t,{Z:()=>g});var n=o(7462),r=o(7294),s=o(9493);function a(e){const t=(0,r.useRef)(null),[o,n]=(0,r.useState)(e.className||""),[a,i]=(0,r.useState)(e.style||{}),[l,c]=(0,r.useState)(e.height),[d,p]=(0,r.useState)(),[u,m]=(0,r.useState)(JSON.stringify(e.config||"")),[f,y]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(!t.current)return;const{className:o,style:r,height:a,sdkReady:l,config:g,...h}=e;if(n(o||""),i(r||{}),c(a),d&&f===JSON.stringify(h)){if(u===JSON.stringify(g))return;m(JSON.stringify(g)),"string"==typeof g?fetch(g).then((e=>e.json())).then((e=>{d?.setConfig(e)})):g&&d.setConfig(g)}else y(JSON.stringify(h)),d?.destroy(),(0,s.T)(t.current,{config:g,...h}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,r.useEffect)((()=>()=>{d?.destroy()}),[]),r.createElement("div",{ref:t,className:o,style:a,"data-height":l})}var i=o(1446),l=o(412),c=o(814),d=o(4866),p=o(5162),u=o(2134),m=o(420);function f(e){const[t,o]=(0,r.useState)(e.js),[n,s]=(0,r.useState)(e.ts),[a,i]=(0,r.useState)(e.react),[f,y]=(0,r.useState)(e.vue),[g,h]=(0,r.useState)(e.svelte),v="3.7rem",[w,b]=(0,r.useState)(!0),[E,S]=(0,r.useState)(v),O=(0,r.useRef)(null),x=()=>{setTimeout((()=>{S(`calc(${O.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{S(`calc(${O.current.offsetHeight}px + ${v})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};o(e(t,"js")),s(e(n,"ts")),i(e(a,"jsx")),y(e(f,"html")),h(e(g,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":w,style:{height:w?v:E,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{b(!w),x()}},"show code"),r.createElement("div",{ref:O,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:u.Z.collapsibleContent},r.createElement(d.Z,{groupId:"sdk-code"},r.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"js"},t)),r.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"ts"},n)),r.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"jsx"},a)),r.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"html"},f)),r.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"html"},g))))))}const y="container_Egsj";function g(e){const{className:t,style:o,showCode:s,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),g=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,h=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(a,(0,n.Z)({className:`${y} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&r.createElement(f,{js:p,ts:u,react:m,vue:g,svelte:h}))}},9493:(e,t,o)=>{o.d(t,{T:()=>r,r:()=>s});var n=o(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:o="https://livecodes.io/",params:n={},config:r={},import:s,lite:a,loading:i="lazy",template:l,view:c="split"}=t,d="headless"===c;let p,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!d||"object"!=typeof e)throw new Error("A valid container element is required.");if(!u){if(!d)throw new Error(`Cannot find element: "${e}"`);u=document.createElement("div"),x(u),document.body.appendChild(u)}try{p=new URL(o)}catch{throw new Error(`"${o}" is not a valid URL.`)}const m=p.origin;if("object"==typeof n&&Object.keys(n).forEach((e=>{p.searchParams.set(e,String(n[e]))})),"string"==typeof r)try{new URL(r),p.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&p.searchParams.set("config","sdk")}l&&p.searchParams.set("template",l),s&&p.searchParams.set("x",s),a&&p.searchParams.set("lite","true"),p.searchParams.set("embed","true"),p.searchParams.set("loading",d?"eager":i),p.searchParams.set("view",c);let f=!1;const y="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t&&!d){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"===u.dataset.defaultStyles||d||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="8px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");const o=document.createElement("iframe");o.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),o.setAttribute("allowtransparency","true"),o.setAttribute("allowpaymentrequest","true"),o.setAttribute("allowfullscreen","true"),o.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const n="eager"===i?"eager":"lazy";o.setAttribute("loading",n),o.classList.add("livecodes"),d?x(o):(o.style.height="100%",o.style.minHeight="200px",o.style.width="100%",o.style.margin="0",o.style.border="0",o.style.borderRadius=u.style.borderRadius),addEventListener("message",(function e(t){t.source===o.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),o.contentWindow?.postMessage({type:"livecodes-config",payload:r},m))})),o.onload=()=>{e(o)},o.src=p.href,u.appendChild(o)})),h=new Promise((e=>{addEventListener("message",(function t(o){o.source===g.contentWindow&&o.origin===m&&"livecodes-ready"===o.data?.type&&(removeEventListener("message",t),e(),h.settled=!0)}))})),v=()=>f?Promise.reject(y):new Promise((async e=>{h.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},m),await h,e()})),w=(e,t)=>new Promise((async(o,n)=>{if(f)return n(y);await v();const r=j();addEventListener("message",(function t(s){if(s.source===g.contentWindow&&s.origin===m&&"livecodes-api-response"===s.data?.type&&s.data?.id===r&&s.data.method===e){removeEventListener("message",t);const e=s.data.payload;e?.error?n(e.error):o(e)}})),g.contentWindow?.postMessage({method:e,id:r,args:t},m)})),b={},E=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(f)throw new Error(y);return E.includes(e)?(w("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter((e=>e!==t)),0===b[e]?.length&&w("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==g.contentWindow||e.origin!==m||!t||!b[t])return;const o=e.data?.payload;b[t]?.forEach((e=>{e(o)}))}));const O=()=>{Object.values(b).forEach((e=>{e.length=0})),g?.remove?.(),f=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}function x(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const j=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>w("run"),format:e=>w("format",[e]),getShareUrl:e=>w("getShareUrl",[e]),getConfig:e=>w("getConfig",[e]),setConfig:e=>w("setConfig",[e]),getCode:()=>w("getCode"),show:(e,t)=>w("show",[e,t]),runTests:()=>w("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),n=1;n<t;n++)o[n-1]=arguments[n];return w("exec",[e,...o])},destroy:()=>h.settled?w("destroy").then(O):f?Promise.reject(y):(O(),Promise.resolve())}}function s(e){void 0===e&&(e={});const{appUrl:t,params:o,config:r,import:s,...a}=e,i="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...a,...o,x:s,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const o=e.dataset.options;if(o)try{t=JSON.parse(o)}catch{}let n;const s=e.dataset.config||e.dataset.prefill;if(s)try{n=JSON.parse(s)}catch{}const a=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+a,...t,...n?{config:n}:{}})}))}))},8626:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var n=o(7462),r=(o(7294),o(3905)),s=o(325);const a={title:"editor"},i="Display Mode: editor",l={unversionedId:"examples/display-modes/editor",id:"examples/display-modes/editor",title:"editor",description:"",source:"@site/docs/examples/display-modes/editor.md",sourceDirName:"examples/display-modes",slug:"/examples/display-modes/editor",permalink:"/livecodes/docs/examples/display-modes/editor",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/examples/display-modes/editor.md",tags:[],version:"current",frontMatter:{title:"editor"},sidebar:"examplesSidebar",previous:{title:"full",permalink:"/livecodes/docs/examples/display-modes/full"},next:{title:"codeblock",permalink:"/livecodes/docs/examples/display-modes/codeblock"}},c={},d=[],p={toc:d};function u(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"display-mode-editor"},"Display Mode: editor"),(0,r.kt)(s.Z,{config:{mode:"editor"},template:"react",mdxType:"LiveCodes"}))}u.isMDXComponent=!0}}]);