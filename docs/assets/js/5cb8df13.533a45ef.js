"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["3397"],{919:function(e,t,s){s.r(t),s.d(t,{default:()=>p,frontMatter:()=>a,metadata:()=>o,assets:()=>c,toc:()=>d,contentTitle:()=>l});var o=JSON.parse('{"id":"examples/display-modes/result","title":"result","description":"","source":"@site/docs/examples/display-modes/result.mdx","sourceDirName":"examples/display-modes","slug":"/examples/display-modes/result","permalink":"/livecodes/docs/examples/display-modes/result","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/examples/display-modes/result.mdx","tags":[],"version":"current","frontMatter":{"title":"result"},"sidebar":"examplesSidebar","previous":{"title":"codeblock","permalink":"/livecodes/docs/examples/display-modes/codeblock"}}'),r=s("5893"),n=s("65"),i=s("3365");let a={title:"result"},l="Display Mode: result",c={},d=[];function u(e){let t={h1:"h1",header:"header",...(0,n.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"display-mode-result",children:"Display Mode: result"})}),"\n","\n",(0,r.jsx)(i.Z,{config:{mode:"result"},template:"react"})]})}function p(e={}){let{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},3365:function(e,t,s){s.d(t,{Z:()=>g});var o=s("5893"),r=s("4200"),n=s("7294"),i=s("8294");function a(e){let t=(0,n.useRef)(null),[s,r]=(0,n.useState)(e.className||""),[a,l]=(0,n.useState)(e.style||{}),[c,d]=(0,n.useState)(e.height),[u,p]=(0,n.useState)(),[m,f]=(0,n.useState)(JSON.stringify(e.config||"")),[h,g]=(0,n.useState)("");return(0,n.useEffect)(()=>{if(!t.current)return;let{className:s,style:o,height:n,sdkReady:a,config:c,...y}=e;if(r(s||""),l(o||{}),d(n),u&&h===JSON.stringify(y)){if(m===JSON.stringify(c))return;f(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{u?.setConfig(e)}):c&&u.setConfig(c)}else g(JSON.stringify(y)),u?.destroy(),(0,i.T)(t.current,{config:c,...y}).then(e=>{p(e),"function"==typeof a&&a(e)})},[e]),(0,n.useEffect)(()=>()=>{u?.destroy()},[]),(0,o.jsx)("div",{ref:t,className:s,style:a,"data-height":c})}var l=s("1858"),c=s("3262"),d=s("1705"),u=s("8168"),p=s("7645"),m=s("5050"),f=s("8228");function h(e){let[t,s]=(0,n.useState)(e.js),[r,i]=(0,n.useState)(e.ts),[a,l]=(0,n.useState)(e.react),[h,g]=(0,n.useState)(e.vue),[y,v]=(0,n.useState)(e.svelte),w="3.7rem",[b,x]=(0,n.useState)(!0),[j,S]=(0,n.useState)(w),C=(0,n.useRef)(null),E=()=>{setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${w})`)},5),setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${w})`)},255)};return(0,n.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),i(e(r,"ts")),l(e(a,"jsx")),g(e(h,"html")),v(e(y,"html"))}},[]),(0,o.jsxs)("details",{className:`alert alert--info ${m.Z.details} ${f.Z.details}`,"data-collapsed":b,style:{height:b?w:j,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,o.jsx)("summary",{onClick:()=>{x(!b),E()},children:"show code"}),(0,o.jsx)("div",{ref:C,style:{display:"block",overflow:"hidden"},children:(0,o.jsx)("div",{className:m.Z.collapsibleContent,children:(0,o.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,o.jsx)(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:E},children:(0,o.jsx)(d.Z,{language:"js",children:t})}),(0,o.jsx)(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:E},children:(0,o.jsx)(d.Z,{language:"ts",children:r})}),(0,o.jsx)(p.Z,{value:"react",label:"React",attributes:{onMouseDown:E},children:(0,o.jsx)(d.Z,{language:"jsx",children:a})}),(0,o.jsx)(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:E},children:(0,o.jsx)(d.Z,{language:"html",children:h})}),(0,o.jsx)(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:E},children:(0,o.jsx)(d.Z,{language:"html",children:y})})]})})})]})}function g(e){let{className:t,style:s,showCode:n,height:i,...c}=e,{colorMode:d}=(0,r.I)(),u=e=>JSON.stringify(e,null,2),p=`
import { createPlayground } from 'livecodes';

const options = ${u(c)};
createPlayground('#container', options);

`.trimStart(),m=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(c)};
createPlayground('#container', options);

`.trimStart(),f=`
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

`.trimStart();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:l.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,o.jsx)(h,{js:p,ts:m,react:f,vue:g,svelte:y})]})}},8294:function(e,t,s){s.d(t,{T:function(){return r},r:function(){return n}});var o=s(7728);async function r(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(s=e,e=null);let{appUrl:o="https://livecodes.io/",params:r={},config:n={},import:i,headless:a,lite:l,loading:c="lazy",template:d,view:u}=s,p=a||"headless"===u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!(p&&"object"==typeof e))throw Error("A valid container element is required.");if(!m){if(p)P(m=document.createElement("div")),document.body.appendChild(m);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(o)}catch{throw Error(`"${o}" is not a valid URL.`)}let f=t.origin;if("object"==typeof r&&Object.keys(r).forEach(e=>{t.searchParams.set(e,String(r[e]))}),d&&t.searchParams.set("template",d),i&&t.searchParams.set("x",i),p&&t.searchParams.set("headless","true"),l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof n&&null==n.mode?n.mode="lite":t.searchParams.set("lite","true")),u&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof n&&null==n.view&&"headless"!==u?n.view=u:t.searchParams.set("view",u)),"string"==typeof n)try{new URL(n),t.searchParams.set("config",n)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof n)Object.keys(n).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",p?"eager":c);let h=!1,g="Cannot call API methods after calling `destroy()`.",y=await new Promise(e=>{if(!m)return;let s=m.dataset.height||m.style.height;if(s&&!p){let e=isNaN(Number(s))?s:s+"px";m.style.height=e}"false"===m.dataset.defaultStyles||p||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");let o="livecodes",r=m.querySelector(`iframe.${o}`),i=r||document.createElement("iframe");i.classList.add(o),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),i.setAttribute("loading","eager"===c?"eager":"lazy"),p?P(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=m.style.borderRadius),addEventListener("message",function e(t){t.source===i.contentWindow&&t.origin===f&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:n},f))}),i.onload=()=>{e(i)},i.src=t.href,r||m.appendChild(i)}),v=new Promise(e=>{addEventListener("message",function t(s){s.source===y.contentWindow&&s.origin===f&&s.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),v.settled=!0)})}),w=()=>h?Promise.reject(g):new Promise(async e=>{v.settled&&e(),y.contentWindow?.postMessage({type:"livecodes-load"},f),await v,e()}),b=(e,t)=>new Promise(async(s,o)=>{if(h)return o(g);await w();let r=L();addEventListener("message",function t(n){if(n.source===y.contentWindow&&n.origin===f&&n.data?.type==="livecodes-api-response"&&n.data?.id===r&&n.data.method===e){removeEventListener("message",t);let e=n.data.payload;e?.error?o(e.error):s(e)}}),y.contentWindow?.postMessage({method:e,id:r,args:t},f)}),x={},j=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(h)throw Error(g);return j.includes(e)?(b("watch",[e]),x[e]||(x[e]=[]),x[e]?.push(t),{remove:()=>{x[e]=x[e]?.filter(e=>e!==t),x[e]?.length===0&&b("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=C(e.data?.type??"");if(e.source!==y.contentWindow||e.origin!==f||!t||!x[t])return;let s=e.data?.payload;x[t]?.forEach(e=>{e(s)})});let E=()=>{Object.values(x).forEach(e=>{e.length=0}),y?.remove?.(),h=!0};function P(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===c&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await w(),t.unobserve(m))})},{rootMargin:"150px"}).observe(m);let L=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>w(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),o=1;o<t;o++)s[o-1]=arguments[o];return b("exec",[e,...s])},destroy:()=>v.settled?b("destroy").then(E):h?Promise.reject(g):(E(),Promise.resolve())}}function n(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:s,config:r,import:n,...i}=e,a="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...i,...s,x:n,...a}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,s;let o=e.dataset.options;if(o)try{t=JSON.parse(o)}catch{}let n=e.dataset.config||e.dataset.prefill;if(n)try{s=JSON.parse(n)}catch{}let i=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+i,...t,...s?{config:s}:{}})})})},65:function(e,t,s){s.d(t,{Z:function(){return a},a:function(){return i}});var o=s(7294);let r={},n=o.createContext(r);function i(e){let t=o.useContext(n);return o.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(n.Provider,{value:t},e.children)}}}]);