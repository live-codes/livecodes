"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["9636"],{1941:function(e,t,n){n.r(t),n.d(t,{config:()=>c,config2:()=>u,default:()=>g,frontMatter:()=>o,metadata:()=>s,assets:()=>d,params:()=>h,toc:()=>p,contentTitle:()=>l});var s=JSON.parse('{"id":"languages/eta","title":"Eta","description":"Eta is an embedded JS template engine for Node, Deno, and the browser. Lighweight, fast, and pluggable. Written in TypeScript.","source":"@site/docs/languages/eta.mdx","sourceDirName":"languages","slug":"/languages/eta","permalink":"/livecodes/docs/languages/eta","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/eta.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"EJS","permalink":"/livecodes/docs/languages/ejs"},"next":{"title":"Fennel","permalink":"/livecodes/docs/languages/fennel"}}'),r=n("5893"),i=n("65"),a=n("3365");let o={},l="Eta",d={},c={markup:{language:"eta",content:"Hello <%= it.name %>!"},customSettings:{template:{data:{name:"LiveCodes"}}}},h={compiled:"open"},u={markup:{language:"eta",content:"Hello <%= it.name %>!"},script:{language:"javascript",content:'window.livecodes.templateData = { name: "LiveCodes" };'},customSettings:{template:{prerender:!1}},activeEditor:"script"},p=[{value:"Usage",id:"usage",level:2},{value:"Pre-rendered (Default)",id:"pre-rendered-default",level:3},{value:"Dynamic",id:"dynamic",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Pre-rendered",id:"pre-rendered",level:3},{value:"Dynamic",id:"dynamic-1",level:3},{value:"Links",id:"links",level:2}];function m(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"eta",children:"Eta"})}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://eta.js.org/",children:"Eta"})," is an embedded JS template engine for Node, Deno, and the browser. Lighweight, fast, and pluggable. Written in TypeScript."]}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(t.p,{children:"There are 2 modes for rendering:"}),"\n",(0,r.jsx)(t.h3,{id:"pre-rendered-default",children:"Pre-rendered (Default)"}),"\n",(0,r.jsxs)(t.p,{children:["The values of the expressions are evaluated and added to the template during compilation of the ",(0,r.jsx)(t.a,{href:"/livecodes/docs/features/result",children:"result page"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["The values of all expressions should be supplied in advance using ",(0,r.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"custom settings"})," to the property ",(0,r.jsx)(t.code,{children:"template.data"})," which accepts an object of key-value pairs."]}),"\n",(0,r.jsxs)(t.p,{children:["Example: This provides the value of the expression ",(0,r.jsx)(t.code,{children:"name"})]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "template": {\n    "data": {\n      "name": "LiveCodes"\n    }\n  }\n}\n'})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"#pre-rendered",children:"Full example below"})}),"\n",(0,r.jsx)(t.h3,{id:"dynamic",children:"Dynamic"}),"\n",(0,r.jsxs)(t.p,{children:["To use this mode, the property ",(0,r.jsx)(t.code,{children:"template.prerender"})," in ",(0,r.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"custom settings"})," should be set to ",(0,r.jsx)(t.code,{children:"false"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "template": {\n    "prerender": false\n  }\n}\n'})}),"\n",(0,r.jsxs)(t.p,{children:["In this mode, in addition to values supplied in custom settings (see above), expressions can have values that are evaluated during the ",(0,r.jsx)(t.a,{href:"/livecodes/docs/features/result",children:"result page"})," runtime."]}),"\n",(0,r.jsxs)(t.p,{children:["This can be achieved in JavaScript (or any ",(0,r.jsx)(t.a,{href:"/livecodes/docs/languages/",children:"language"})," that compiles to it) by assigning ",(0,r.jsx)(t.code,{children:"window.livecodes.templateData"})," to an object with the data."]}),"\n",(0,r.jsxs)(t.p,{children:["Please note that template rendering occurs on ",(0,r.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event",children:"page load"}),", so the assignment must occur before that."]}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'title="Script Editor (JS)"',children:"window.livecodes.templateData = { name: 'LiveCodes' };\n"})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"#dynamic-1",children:"Full example below"})}),"\n",(0,r.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,r.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"eta"})}),"\n",(0,r.jsx)(t.h3,{id:"extension",children:"Extension"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:".eta"})}),"\n",(0,r.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"markup"})}),"\n",(0,r.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,r.jsxs)(t.p,{children:["The official ",(0,r.jsx)(t.a,{href:"https://www.npmjs.com/package/eta",children:"Eta compiler"}),"."]}),"\n",(0,r.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"eta"}),": v3.4.0"]}),"\n",(0,r.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,r.jsxs)(t.p,{children:["Using ",(0,r.jsx)(t.a,{href:"https://prettier.io/",children:"Prettier"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"custom-settings",children:"Custom Settings"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"Custom settings"})," added to the property ",(0,r.jsx)(t.code,{children:"eta"})," are passed as a JSON object to the ",(0,r.jsx)(t.a,{href:"https://eta.js.org/docs/api/rendering",children:(0,r.jsx)(t.code,{children:"Eta.render"})})," method during compile. Please check the ",(0,r.jsx)(t.a,{href:"https://eta.js.org/docs/api/configuration",children:"documentation"})," for full reference."]}),"\n",(0,r.jsx)(t.p,{children:"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Example:"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "eta": {\n    "varName": "data"\n  }\n}\n'})}),"\n",(0,r.jsx)(t.h2,{id:"example-usage",children:"Example Usage"}),"\n","\n",(0,r.jsx)(t.h3,{id:"pre-rendered",children:"Pre-rendered"}),"\n","\n","\n",(0,r.jsx)(a.Z,{config:c,params:h}),"\n",(0,r.jsx)(t.h3,{id:"dynamic-1",children:"Dynamic"}),"\n","\n",(0,r.jsx)(a.Z,{config:u}),"\n",(0,r.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://eta.js.org/",children:"Official website"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://eta.js.org/docs/learn",children:"Documentation"})}),"\n"]})]})}function g(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},3365:function(e,t,n){n.d(t,{Z:()=>f});var s=n("5893"),r=n("4200"),i=n("7294"),a=n("8294");function o(e){let t=(0,i.useRef)(null),[n,r]=(0,i.useState)(e.className||""),[o,l]=(0,i.useState)(e.style||{}),[d,c]=(0,i.useState)(e.height),[h,u]=(0,i.useState)(),[p,m]=(0,i.useState)(JSON.stringify(e.config||"")),[g,f]=(0,i.useState)("");return(0,i.useEffect)(()=>{if(!t.current)return;let{className:n,style:s,height:i,sdkReady:o,config:d,...v}=e;if(r(n||""),l(s||{}),c(i),h&&g===JSON.stringify(v)){if(p===JSON.stringify(d))return;m(JSON.stringify(d)),"string"==typeof d?fetch(d).then(e=>e.json()).then(e=>{h?.setConfig(e)}):d&&h.setConfig(d)}else f(JSON.stringify(v)),h?.destroy(),(0,a.T)(t.current,{config:d,...v}).then(e=>{u(e),"function"==typeof o&&o(e)})},[e]),(0,i.useEffect)(()=>()=>{h?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:n,style:o,"data-height":d})}var l=n("1858"),d=n("3262"),c=n("1705"),h=n("8168"),u=n("7645"),p=n("5050"),m=n("8228");function g(e){let[t,n]=(0,i.useState)(e.js),[r,a]=(0,i.useState)(e.ts),[o,l]=(0,i.useState)(e.react),[g,f]=(0,i.useState)(e.vue),[v,x]=(0,i.useState)(e.svelte),j="3.7rem",[y,w]=(0,i.useState)(!0),[b,S]=(0,i.useState)(j),E=(0,i.useRef)(null),C=()=>{setTimeout(()=>{S(`calc(${E.current.offsetHeight}px + ${j})`)},5),setTimeout(()=>{S(`calc(${E.current.offsetHeight}px + ${j})`)},255)};return(0,i.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(r,"ts")),l(e(o,"jsx")),f(e(g,"html")),x(e(v,"html"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":y,style:{height:y?j:b,overflow:"hidden",willChange:"height",transition:`height ${y?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{w(!y),C()},children:"show code"}),(0,s.jsx)("div",{ref:E,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:p.Z.collapsibleContent,children:(0,s.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,s.jsx)(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"js",children:t})}),(0,s.jsx)(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"ts",children:r})}),(0,s.jsx)(u.Z,{value:"react",label:"React",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"jsx",children:o})}),(0,s.jsx)(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"html",children:g})}),(0,s.jsx)(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"html",children:v})})]})})})]})}function f(e){let{className:t,style:n,showCode:i,height:a,...d}=e,{colorMode:c}=(0,r.I)(),h=e=>JSON.stringify(e,null,2),u=`
import { createPlayground } from 'livecodes';

const options = ${h(d)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(d)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${h(d)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${h(d)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,v=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${h(d)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o,{className:`container_Egsj ${e.className}`,style:{height:a||"50vh",...e.style},appUrl:l.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(g,{js:u,ts:p,react:m,vue:f,svelte:v})]})}},8294:function(e,t,n){n.d(t,{T:function(){return r},r:function(){return i}});var s=n(7728);async function r(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(n=e,e=null);let{appUrl:s="https://livecodes.io/",params:r={},config:i={},import:a,headless:o,lite:l,loading:d="lazy",template:c,view:h}=n,u=o||"headless"===h,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!(u&&"object"==typeof e))throw Error("A valid container element is required.");if(!p){if(u)P(p=document.createElement("div")),document.body.appendChild(p);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(s)}catch{throw Error(`"${s}" is not a valid URL.`)}let m=t.origin;if("object"==typeof r&&Object.keys(r).forEach(e=>{t.searchParams.set(e,String(r[e]))}),c&&t.searchParams.set("template",c),a&&t.searchParams.set("x",a),u&&t.searchParams.set("headless","true"),l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":t.searchParams.set("lite","true")),h&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==h?i.view=h:t.searchParams.set("view",h)),"string"==typeof i)try{new URL(i),t.searchParams.set("config",i)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof i)Object.keys(i).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",u?"eager":d);let g=!1,f="Cannot call API methods after calling `destroy()`.",v=await new Promise(e=>{if(!p)return;let n=p.dataset.height||p.style.height;if(n&&!u){let e=isNaN(Number(n))?n:n+"px";p.style.height=e}"false"===p.dataset.defaultStyles||u||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="8px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");let s="livecodes",r=p.querySelector(`iframe.${s}`),a=r||document.createElement("iframe");a.classList.add(s),a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),a.setAttribute("loading","eager"===d?"eager":"lazy"),u?P(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=p.style.borderRadius),addEventListener("message",function e(t){t.source===a.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:i},m))}),a.onload=()=>{e(a)},a.src=t.href,r||p.appendChild(a)}),x=new Promise(e=>{addEventListener("message",function t(n){n.source===v.contentWindow&&n.origin===m&&n.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),x.settled=!0)})}),j=()=>g?Promise.reject(f):new Promise(async e=>{x.settled&&e(),v.contentWindow?.postMessage({type:"livecodes-load"},m),await x,e()}),y=(e,t)=>new Promise(async(n,s)=>{if(g)return s(f);await j();let r=L();addEventListener("message",function t(i){if(i.source===v.contentWindow&&i.origin===m&&i.data?.type==="livecodes-api-response"&&i.data?.id===r&&i.data.method===e){removeEventListener("message",t);let e=i.data.payload;e?.error?s(e.error):n(e)}}),v.contentWindow?.postMessage({method:e,id:r,args:t},m)}),w={},b=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw Error(f);return b.includes(e)?(y("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter(e=>e!==t),w[e]?.length===0&&y("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},E=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=E(e.data?.type??"");if(e.source!==v.contentWindow||e.origin!==m||!t||!w[t])return;let n=e.data?.payload;w[t]?.forEach(e=>{e(n)})});let C=()=>{Object.values(w).forEach(e=>{e.length=0}),v?.remove?.(),g=!0};function P(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===d&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await j(),t.unobserve(p))})},{rootMargin:"150px"}).observe(p);let L=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>j(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return y("exec",[e,...n])},destroy:()=>x.settled?y("destroy").then(C):g?Promise.reject(f):(C(),Promise.resolve())}}function i(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:n,config:r,import:i,...a}=e,o="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...a,...n,x:i,...o}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,n;let s=e.dataset.options;if(s)try{t=JSON.parse(s)}catch{}let i=e.dataset.config||e.dataset.prefill;if(i)try{n=JSON.parse(i)}catch{}let a=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+a,...t,...n?{config:n}:{}})})})},65:function(e,t,n){n.d(t,{Z:function(){return o},a:function(){return a}});var s=n(7294);let r={},i=s.createContext(r);function a(e){let t=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);