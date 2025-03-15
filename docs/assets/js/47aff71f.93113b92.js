"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["1220"],{2327:function(e,t,o){o.r(t),o.d(t,{default:()=>p,frontMatter:()=>a,metadata:()=>s,assets:()=>c,toc:()=>d,contentTitle:()=>l});var s=JSON.parse('{"id":"features/compiled-code","title":"Compiled Code","description":"The resulting compiled/transpiled code can be seen in the compiled code viewer (in the tools pane) in real-time, as you type. This works for all compiled code (e.g. Markdown, Pug, SCSS, Less, Stylus, Typescript, CoffeeScript, ...etc.).","source":"@site/docs/features/compiled-code.mdx","sourceDirName":"features","slug":"/features/compiled-code","permalink":"/livecodes/docs/features/compiled-code","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/compiled-code.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Console","permalink":"/livecodes/docs/features/console"},"next":{"title":"Tests","permalink":"/livecodes/docs/features/tests"}}'),r=o("5893"),i=o("65"),n=o("3365");let a={},l="Compiled Code",c={},d=[];function u(e){let t={a:"a",h1:"h1",header:"header",img:"img",p:"p",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"compiled-code",children:"Compiled Code"})}),"\n","\n",(0,r.jsxs)(t.p,{children:["The resulting compiled/transpiled code can be seen in the compiled code viewer (in the ",(0,r.jsx)(t.a,{href:"/livecodes/docs/features/tools-pane",children:"tools pane"}),") in real-time, as you type. This works for all compiled code (e.g. Markdown, Pug, SCSS, Less, Stylus, Typescript, CoffeeScript, ...etc.)."]}),"\n",(0,r.jsx)(t.p,{children:"This can be a great tool for learning. As you write code, you see the compiled code and the resulting page at the same time. The compiled code viewer shows the code compiled from the currently active editor (markup/style/script). This includes the CSS produced by CSS processors (e.g. Autoprefixer), if enabled."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Compiled Code Viewer",src:o(4270).Z+"",width:"2240",height:"1400"})}),"\n",(0,r.jsxs)(t.p,{children:["e.g. ",(0,r.jsx)(t.a,{href:"https://livecodes.io/?ts&compiled=full",children:"https://livecodes.io/?ts&compiled=full"})," ",(0,r.jsx)("br",{}),"\nsets TypeScript as the active editor and shows compiled code viewer maximized."]}),"\n",(0,r.jsxs)(t.p,{children:["This demo shows TypeScript code along with the compiled Javascript code, similar to the ",(0,r.jsx)(t.a,{href:"https://www.typescriptlang.org/play",children:"official TypeScript Playground"}),":"]}),"\n",(0,r.jsx)(n.Z,{import:"https://gist.github.com/hatemhosny/4bed283ef9757a6a541aee685c710dc7",params:{"ts-selector":"playground.ts",activeEditor:"script",compiled:"full"}})]})}function p(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},4270:function(e,t,o){o.d(t,{Z:function(){return s}});let s=o.p+"assets/images/compiled-code-1-bf18468708e8da3bb486780bdc5310b0.jpg"},3365:function(e,t,o){o.d(t,{Z:()=>g});var s=o("5893"),r=o("4200"),i=o("7294"),n=o("8294");function a(e){let t=(0,i.useRef)(null),[o,r]=(0,i.useState)(e.className||""),[a,l]=(0,i.useState)(e.style||{}),[c,d]=(0,i.useState)(e.height),[u,p]=(0,i.useState)(),[h,m]=(0,i.useState)(JSON.stringify(e.config||"")),[f,g]=(0,i.useState)("");return(0,i.useEffect)(()=>{if(!t.current)return;let{className:o,style:s,height:i,sdkReady:a,config:c,...y}=e;if(r(o||""),l(s||{}),d(i),u&&f===JSON.stringify(y)){if(h===JSON.stringify(c))return;m(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{u?.setConfig(e)}):c&&u.setConfig(c)}else g(JSON.stringify(y)),u?.destroy(),(0,n.T)(t.current,{config:c,...y}).then(e=>{p(e),"function"==typeof a&&a(e)})},[e]),(0,i.useEffect)(()=>()=>{u?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:o,style:a,"data-height":c})}var l=o("1858"),c=o("3262"),d=o("1705"),u=o("8168"),p=o("7645"),h=o("5050"),m=o("8228");function f(e){let[t,o]=(0,i.useState)(e.js),[r,n]=(0,i.useState)(e.ts),[a,l]=(0,i.useState)(e.react),[f,g]=(0,i.useState)(e.vue),[y,v]=(0,i.useState)(e.svelte),w="3.7rem",[b,x]=(0,i.useState)(!0),[S,j]=(0,i.useState)(w),C=(0,i.useRef)(null),E=()=>{setTimeout(()=>{j(`calc(${C.current.offsetHeight}px + ${w})`)},5),setTimeout(()=>{j(`calc(${C.current.offsetHeight}px + ${w})`)},255)};return(0,i.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};o(e(t,"js")),n(e(r,"ts")),l(e(a,"jsx")),g(e(f,"html")),v(e(y,"html"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${h.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?w:S,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{x(!b),E()},children:"show code"}),(0,s.jsx)("div",{ref:C,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:h.Z.collapsibleContent,children:(0,s.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,s.jsx)(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:E},children:(0,s.jsx)(d.Z,{language:"js",children:t})}),(0,s.jsx)(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:E},children:(0,s.jsx)(d.Z,{language:"ts",children:r})}),(0,s.jsx)(p.Z,{value:"react",label:"React",attributes:{onMouseDown:E},children:(0,s.jsx)(d.Z,{language:"jsx",children:a})}),(0,s.jsx)(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:E},children:(0,s.jsx)(d.Z,{language:"html",children:f})}),(0,s.jsx)(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:E},children:(0,s.jsx)(d.Z,{language:"html",children:y})})]})})})]})}function g(e){let{className:t,style:o,showCode:i,height:n,...c}=e,{colorMode:d}=(0,r.I)(),u=e=>JSON.stringify(e,null,2),p=`
import { createPlayground } from 'livecodes';

const options = ${u(c)};
createPlayground('#container', options);

`.trimStart(),h=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(c)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${u(c)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),g=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${u(c)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,y=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${u(c)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:n||"50vh",...e.style},appUrl:l.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(f,{js:p,ts:h,react:m,vue:g,svelte:y})]})}},8294:function(e,t,o){o.d(t,{T:function(){return r},r:function(){return i}});var s=o(7728);async function r(e){let t,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(o=e,e=null);let{appUrl:s="https://livecodes.io/",params:r={},config:i={},import:n,headless:a,lite:l,loading:c="lazy",template:d,view:u}=o,p=a||"headless"===u,h=null;if("string"==typeof e)h=document.querySelector(e);else if(e instanceof HTMLElement)h=e;else if(!(p&&"object"==typeof e))throw Error("A valid container element is required.");if(!h){if(p)P(h=document.createElement("div")),document.body.appendChild(h);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(s)}catch{throw Error(`"${s}" is not a valid URL.`)}let m=t.origin;if("object"==typeof r&&Object.keys(r).forEach(e=>{t.searchParams.set(e,String(r[e]))}),d&&t.searchParams.set("template",d),n&&t.searchParams.set("x",n),p&&t.searchParams.set("headless","true"),l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":t.searchParams.set("lite","true")),u&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==u?i.view=u:t.searchParams.set("view",u)),"string"==typeof i)try{new URL(i),t.searchParams.set("config",i)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof i)Object.keys(i).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",p?"eager":c);let f=!1,g="Cannot call API methods after calling `destroy()`.",y=await new Promise(e=>{if(!h)return;let o=h.dataset.height||h.style.height;if(o&&!p){let e=isNaN(Number(o))?o:o+"px";h.style.height=e}"false"===h.dataset.defaultStyles||p||(h.style.backgroundColor||="#fff",h.style.border||="1px solid black",h.style.borderRadius||="8px",h.style.boxSizing||="border-box",h.style.padding||="0",h.style.width||="100%",h.style.height||=h.style.height||"300px",h.style.minHeight="200px",h.style.flexGrow="1",h.style.overflow||="hidden",h.style.resize||="vertical");let s="livecodes",r=h.querySelector(`iframe.${s}`),n=r||document.createElement("iframe");n.classList.add(s),n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),n.setAttribute("loading","eager"===c?"eager":"lazy"),p?P(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=h.style.borderRadius),addEventListener("message",function e(t){t.source===n.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:i},m))}),n.onload=()=>{e(n)},n.src=t.href,r||h.appendChild(n)}),v=new Promise(e=>{addEventListener("message",function t(o){o.source===y.contentWindow&&o.origin===m&&o.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),v.settled=!0)})}),w=()=>f?Promise.reject(g):new Promise(async e=>{v.settled&&e(),y.contentWindow?.postMessage({type:"livecodes-load"},m),await v,e()}),b=(e,t)=>new Promise(async(o,s)=>{if(f)return s(g);await w();let r=T();addEventListener("message",function t(i){if(i.source===y.contentWindow&&i.origin===m&&i.data?.type==="livecodes-api-response"&&i.data?.id===r&&i.data.method===e){removeEventListener("message",t);let e=i.data.payload;e?.error?s(e.error):o(e)}}),y.contentWindow?.postMessage({method:e,id:r,args:t},m)}),x={},S=["load","ready","code","console","tests","destroy"],j=(e,t)=>{if(f)throw Error(g);return S.includes(e)?(b("watch",[e]),x[e]||(x[e]=[]),x[e]?.push(t),{remove:()=>{x[e]=x[e]?.filter(e=>e!==t),x[e]?.length===0&&b("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=C(e.data?.type??"");if(e.source!==y.contentWindow||e.origin!==m||!t||!x[t])return;let o=e.data?.payload;x[t]?.forEach(e=>{e(o)})});let E=()=>{Object.values(x).forEach(e=>{e.length=0}),y?.remove?.(),f=!0};function P(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===c&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await w(),t.unobserve(h))})},{rootMargin:"150px"}).observe(h);let T=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>w(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>j("code",e),watch:j,exec:function(e){for(var t=arguments.length,o=Array(t>1?t-1:0),s=1;s<t;s++)o[s-1]=arguments[s];return b("exec",[e,...o])},destroy:()=>v.settled?b("destroy").then(E):f?Promise.reject(g):(E(),Promise.resolve())}}function i(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:o,config:r,import:i,...n}=e,a="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...n,...o,x:i,...a}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,o;let s=e.dataset.options;if(s)try{t=JSON.parse(s)}catch{}let i=e.dataset.config||e.dataset.prefill;if(i)try{o=JSON.parse(i)}catch{}let n=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+n,...t,...o?{config:o}:{}})})})},65:function(e,t,o){o.d(t,{Z:function(){return a},a:function(){return n}});var s=o(7294);let r={},i=s.createContext(r);function n(e){let t=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:n(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);