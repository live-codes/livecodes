"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["833"],{172:function(e,t,s){s.r(t),s.d(t,{default:()=>m,frontMatter:()=>a,metadata:()=>n,assets:()=>c,basicSchemeDemo:()=>d,toc:()=>h,contentTitle:()=>l});var n=JSON.parse('{"id":"languages/scheme","title":"Scheme","description":"Scheme is a classic programming language in the Lisp family. It emphasizes functional programming and domain-specific languages but adapts to other styles.","source":"@site/docs/languages/scheme.mdx","sourceDirName":"languages","slug":"/languages/scheme","permalink":"/livecodes/docs/languages/scheme","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/scheme.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Sass","permalink":"/livecodes/docs/languages/sass"},"next":{"title":"SCSS","permalink":"/livecodes/docs/languages/scss"}}'),i=s("5893"),o=s("65"),r=s("3365");let a={},l="Scheme",c={},d={activeEditor:"script",markup:{language:"html",content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="https://livecodes.io/livecodes/assets/templates/scheme.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:"css",content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:"scheme",content:`(let ((title "Scheme"))
  (set-content! "#title" title))

(let ((counter 0))
(add-handler! "#counter-button" "click"
(lambda (ev)
(set! counter (+ counter 1))
(set-content! "#counter" (number->string counter)))))

; check console
(let ((time-now (date-hour (current-date))))
(console-log
(cond ((< time-now 12) "Good morning")
((< time-now 18) "Good afternoon")
(else "Good evening"))))
`}},h=[{value:"Usage",id:"usage",level:2},{value:"JS Interoperability",id:"js-interoperability",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Limitations",id:"limitations",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function u(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"scheme",children:"Scheme"})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://www.scheme.org/",children:"Scheme"})," is a classic programming language in the Lisp family. It emphasizes functional programming and domain-specific languages but adapts to other styles."]}),"\n",(0,i.jsxs)(t.p,{children:["In LiveCodes, Scheme code runs in the browser using ",(0,i.jsx)(t.a,{href:"https://www.biwascheme.org/",children:"BiwaScheme"}),", a Scheme interpreter written in JavaScript."]}),"\n",(0,i.jsx)(t.admonition,{title:"Note",type:"info",children:(0,i.jsxs)(t.p,{children:["Lisp language family supported in LiveCodes includes ",(0,i.jsx)(t.a,{href:"/livecodes/docs/languages/commonlisp",children:"Common Lisp"}),", ",(0,i.jsx)(t.a,{href:"/livecodes/docs/languages/scheme",children:"Scheme"}),", ",(0,i.jsx)(t.a,{href:"/livecodes/docs/languages/clojurescript",children:"ClojureScript"})," and ",(0,i.jsx)(t.a,{href:"/livecodes/docs/languages/fennel",children:"Fennel"}),"."]})}),"\n",(0,i.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(t.p,{children:["LiveCodes runs Scheme code in the browser. BiwaScheme ",(0,i.jsx)(t.a,{href:"https://www.biwascheme.org/doc/features.html",children:"implements"})," most of the features of ",(0,i.jsx)(t.a,{href:"https://small.r7rs.org/",children:"R7RS small"}),", including first-class continuation and tail call optimization."]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:"Example:"})}),"\n","\n","\n",(0,i.jsx)(r.Z,{config:d,height:"70vh"}),"\n",(0,i.jsx)(t.h3,{id:"js-interoperability",children:"JS Interoperability"}),"\n",(0,i.jsxs)(t.p,{children:["See ",(0,i.jsx)(t.a,{href:"https://www.biwascheme.org/doc/features.html#javascript-language-interface",children:"BiwaScheme docs"}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,i.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:"scheme"})}),"\n",(0,i.jsx)(t.h3,{id:"extensions",children:"Extensions"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:".scm"})}),"\n",(0,i.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:"script"})}),"\n",(0,i.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://www.biwascheme.org/",children:"BiwaScheme"}),", a Scheme interpreter written in JavaScript."]}),"\n",(0,i.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"biwascheme"}),": v0.8.0"]}),"\n",(0,i.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,i.jsxs)(t.p,{children:["Using ",(0,i.jsx)(t.a,{href:"https://shaunlebron.github.io/parinfer/",children:"Parinfer"}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"limitations",children:"Limitations"}),"\n",(0,i.jsxs)(t.p,{children:["BiwaScheme implements most of the features of R7RS small, however some features are not supported.\nSee the ",(0,i.jsx)(t.a,{href:"https://github.com/biwascheme/biwascheme#conformance",children:"BiwaScheme documentation"})," for more information."]}),"\n",(0,i.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:"https://livecodes.io/?template=scheme",children:"https://livecodes.io/?template=scheme"})}),"\n",(0,i.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://www.scheme.org/",children:"Scheme Programming Language"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://www.biwascheme.org/",children:"BiwaScheme"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://www.scheme.com/tspl4/",children:"The Scheme Programming Language (4th Edition)"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html",children:"Structure and Interpretation of Computer Programs"})}),"\n"]})]})}function m(e={}){let{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},3365:function(e,t,s){s.d(t,{Z:()=>f});var n=s("5893"),i=s("4200"),o=s("7294"),r=s("8294");function a(e){let t=(0,o.useRef)(null),[s,i]=(0,o.useState)(e.className||""),[a,l]=(0,o.useState)(e.style||{}),[c,d]=(0,o.useState)(e.height),[h,u]=(0,o.useState)(),[m,p]=(0,o.useState)(JSON.stringify(e.config||"")),[g,f]=(0,o.useState)("");return(0,o.useEffect)(()=>{if(!t.current)return;let{className:s,style:n,height:o,sdkReady:a,config:c,...v}=e;if(i(s||""),l(n||{}),d(o),h&&g===JSON.stringify(v)){if(m===JSON.stringify(c))return;p(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{h?.setConfig(e)}):c&&h.setConfig(c)}else f(JSON.stringify(v)),h?.destroy(),(0,r.T)(t.current,{config:c,...v}).then(e=>{u(e),"function"==typeof a&&a(e)})},[e]),(0,o.useEffect)(()=>()=>{h?.destroy()},[]),(0,n.jsx)("div",{ref:t,className:s,style:a,"data-height":c})}var l=s("1858"),c=s("3262"),d=s("1705"),h=s("8168"),u=s("7645"),m=s("5050"),p=s("8228");function g(e){let[t,s]=(0,o.useState)(e.js),[i,r]=(0,o.useState)(e.ts),[a,l]=(0,o.useState)(e.react),[g,f]=(0,o.useState)(e.vue),[v,w]=(0,o.useState)(e.svelte),y="3.7rem",[x,j]=(0,o.useState)(!0),[b,S]=(0,o.useState)(y),C=(0,o.useRef)(null),L=()=>{setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${y})`)},5),setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${y})`)},255)};return(0,o.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),r(e(i,"ts")),l(e(a,"jsx")),f(e(g,"html")),w(e(v,"html"))}},[]),(0,n.jsxs)("details",{className:`alert alert--info ${m.Z.details} ${p.Z.details}`,"data-collapsed":x,style:{height:x?y:b,overflow:"hidden",willChange:"height",transition:`height ${x?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,n.jsx)("summary",{onClick:()=>{j(!x),L()},children:"show code"}),(0,n.jsx)("div",{ref:C,style:{display:"block",overflow:"hidden"},children:(0,n.jsx)("div",{className:m.Z.collapsibleContent,children:(0,n.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,n.jsx)(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"js",children:t})}),(0,n.jsx)(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"ts",children:i})}),(0,n.jsx)(u.Z,{value:"react",label:"React",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"jsx",children:a})}),(0,n.jsx)(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"html",children:g})}),(0,n.jsx)(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"html",children:v})})]})})})]})}function f(e){let{className:t,style:s,showCode:o,height:r,...c}=e,{colorMode:d}=(0,i.I)(),h=e=>JSON.stringify(e,null,2),u=`
import { createPlayground } from 'livecodes';

const options = ${h(c)};
createPlayground('#container', options);

`.trimStart(),m=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(c)};
createPlayground('#container', options);

`.trimStart(),p=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${h(c)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${h(c)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,v=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${h(c)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:r||"50vh",...e.style},appUrl:l.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,n.jsx)(g,{js:u,ts:m,react:p,vue:f,svelte:v})]})}},8294:function(e,t,s){s.d(t,{T:function(){return i},r:function(){return o}});var n=s(7728);async function i(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(s=e,e=null);let{appUrl:n="https://livecodes.io/",params:i={},config:o={},import:r,headless:a,lite:l,loading:c="lazy",template:d,view:h}=s,u=a||"headless"===h,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!(u&&"object"==typeof e))throw Error("A valid container element is required.");if(!m){if(u)E(m=document.createElement("div")),document.body.appendChild(m);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(n)}catch{throw Error(`"${n}" is not a valid URL.`)}let p=t.origin;if("object"==typeof i&&Object.keys(i).forEach(e=>{t.searchParams.set(e,String(i[e]))}),d&&t.searchParams.set("template",d),r&&t.searchParams.set("x",r),u&&t.searchParams.set("headless","true"),l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof o&&null==o.mode?o.mode="lite":t.searchParams.set("lite","true")),h&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof o&&null==o.view&&"headless"!==h?o.view=h:t.searchParams.set("view",h)),"string"==typeof o)try{new URL(o),t.searchParams.set("config",o)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof o)Object.keys(o).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",u?"eager":c);let g=!1,f="Cannot call API methods after calling `destroy()`.",v=await new Promise(e=>{if(!m)return;let s=m.dataset.height||m.style.height;if(s&&!u){let e=isNaN(Number(s))?s:s+"px";m.style.height=e}"false"===m.dataset.defaultStyles||u||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");let n="livecodes",i=m.querySelector(`iframe.${n}`),r=i||document.createElement("iframe");r.classList.add(n),r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),r.setAttribute("loading","eager"===c?"eager":"lazy"),u?E(r):(r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=m.style.borderRadius),addEventListener("message",function e(t){t.source===r.contentWindow&&t.origin===p&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:o},p))}),r.onload=()=>{e(r)},r.src=t.href,i||m.appendChild(r)}),w=new Promise(e=>{addEventListener("message",function t(s){s.source===v.contentWindow&&s.origin===p&&s.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),w.settled=!0)})}),y=()=>g?Promise.reject(f):new Promise(async e=>{w.settled&&e(),v.contentWindow?.postMessage({type:"livecodes-load"},p),await w,e()}),x=(e,t)=>new Promise(async(s,n)=>{if(g)return n(f);await y();let i=P();addEventListener("message",function t(o){if(o.source===v.contentWindow&&o.origin===p&&o.data?.type==="livecodes-api-response"&&o.data?.id===i&&o.data.method===e){removeEventListener("message",t);let e=o.data.payload;e?.error?n(e.error):s(e)}}),v.contentWindow?.postMessage({method:e,id:i,args:t},p)}),j={},b=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw Error(f);return b.includes(e)?(x("watch",[e]),j[e]||(j[e]=[]),j[e]?.push(t),{remove:()=>{j[e]=j[e]?.filter(e=>e!==t),j[e]?.length===0&&x("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=C(e.data?.type??"");if(e.source!==v.contentWindow||e.origin!==p||!t||!j[t])return;let s=e.data?.payload;j[t]?.forEach(e=>{e(s)})});let L=()=>{Object.values(j).forEach(e=>{e.length=0}),v?.remove?.(),g=!0};function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===c&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await y(),t.unobserve(m))})},{rootMargin:"150px"}).observe(m);let P=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>y(),run:()=>x("run"),format:e=>x("format",[e]),getShareUrl:e=>x("getShareUrl",[e]),getConfig:e=>x("getConfig",[e]),setConfig:e=>x("setConfig",[e]),getCode:()=>x("getCode"),show:(e,t)=>x("show",[e,t]),runTests:()=>x("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),n=1;n<t;n++)s[n-1]=arguments[n];return x("exec",[e,...s])},destroy:()=>w.settled?x("destroy").then(L):g?Promise.reject(f):(L(),Promise.resolve())}}function o(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:s,config:i,import:o,...r}=e,a="string"==typeof i?{config:i}:"object"==typeof i?{x:"code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(i))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...r,...s,x:o,...a}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,s;let n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o=e.dataset.config||e.dataset.prefill;if(o)try{s=JSON.parse(o)}catch{}let r=encodeURIComponent(e.outerHTML);e.innerHTML="",i(e,{import:"dom/"+r,...t,...s?{config:s}:{}})})})},65:function(e,t,s){s.d(t,{Z:function(){return a},a:function(){return r}});var n=s(7294);let i={},o=n.createContext(i);function r(e){let t=n.useContext(o);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);