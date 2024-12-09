"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1547],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,g=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(g,s(s({ref:t},u),{},{components:n})):a.createElement(g,s({ref:t},u))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[d]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>f});var a=n(7462),r=n(7294),o=n(9493);function s(e){const t=(0,r.useRef)(null),[n,a]=(0,r.useState)(e.className||""),[s,i]=(0,r.useState)(e.style||{}),[l,c]=(0,r.useState)(e.height),[u,d]=(0,r.useState)(),[p,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,y]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(!t.current)return;const{className:n,style:r,height:s,sdkReady:l,config:f,...h}=e;if(a(n||""),i(r||{}),c(s),u&&g===JSON.stringify(h)){if(p===JSON.stringify(f))return;m(JSON.stringify(f)),"string"==typeof f?fetch(f).then((e=>e.json())).then((e=>{u?.setConfig(e)})):f&&u.setConfig(f)}else y(JSON.stringify(h)),u?.destroy(),(0,o.T)(t.current,{config:f,...h}).then((e=>{d(e),"function"==typeof l&&l(e)}))}),[e]),(0,r.useEffect)((()=>()=>{u?.destroy()}),[]),r.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),u=n(4866),d=n(5162),p=n(2134),m=n(420);function g(e){const[t,n]=(0,r.useState)(e.js),[a,o]=(0,r.useState)(e.ts),[s,i]=(0,r.useState)(e.react),[g,y]=(0,r.useState)(e.vue),[f,h]=(0,r.useState)(e.svelte),b="3.7rem",[v,w]=(0,r.useState)(!0),[k,E]=(0,r.useState)(b),N=(0,r.useRef)(null),S=()=>{setTimeout((()=>{E(`calc(${N.current.offsetHeight}px + ${b})`)}),5),setTimeout((()=>{E(`calc(${N.current.offsetHeight}px + ${b})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),o(e(a,"ts")),i(e(s,"jsx")),y(e(g,"html")),h(e(f,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":v,style:{height:v?b:k,overflow:"hidden",willChange:"height",transition:`height ${v?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{w(!v),S()}},"show code"),r.createElement("div",{ref:N,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:p.Z.collapsibleContent},r.createElement(u.Z,{groupId:"sdk-code"},r.createElement(d.Z,{value:"js",label:"JS",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"js"},t)),r.createElement(d.Z,{value:"ts",label:"TS",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"ts"},a)),r.createElement(d.Z,{value:"react",label:"React",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"jsx"},s)),r.createElement(d.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"html"},g)),r.createElement(d.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"html"},f))))))}const y="container_Egsj";function f(e){const{className:t,style:n,showCode:o,height:l,...c}=e,u=e=>JSON.stringify(e,null,2),d=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${u(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),f=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${u(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,h=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(s,(0,a.Z)({className:`${y} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&r.createElement(g,{js:d,ts:p,react:m,vue:f,svelte:h}))}},9493:(e,t,n)=>{n.d(t,{T:()=>r,r:()=>o});var a=n(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:a={},config:r={},import:o,lite:s,loading:i="lazy",template:l,view:c="split"}=t,u="headless"===c;let d,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!u||"object"!=typeof e)throw new Error("A valid container element is required.");if(!p){if(!u)throw new Error(`Cannot find element: "${e}"`);p=document.createElement("div"),S(p),document.body.appendChild(p)}try{d=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const m=d.origin;if("object"==typeof a&&Object.keys(a).forEach((e=>{d.searchParams.set(e,String(a[e]))})),"string"==typeof r)try{new URL(r),d.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&d.searchParams.set("config","sdk")}l&&d.searchParams.set("template",l),o&&d.searchParams.set("x",o),s&&d.searchParams.set("lite","true"),d.searchParams.set("embed","true"),d.searchParams.set("loading",u?"eager":i),d.searchParams.set("view",c);let g=!1;const y="Cannot call API methods after calling `destroy()`.",f=await new Promise((e=>{if(!p)return;const t=p.dataset.height||p.style.height;if(t&&!u){const e=isNaN(Number(t))?t:t+"px";p.style.height=e}"false"===p.dataset.defaultStyles||u||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="8px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const a="eager"===i?"eager":"lazy";n.setAttribute("loading",a),n.classList.add("livecodes"),u?S(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=p.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:r},m))})),n.onload=()=>{e(n)},n.src=d.href,p.appendChild(n)})),h=new Promise((e=>{addEventListener("message",(function t(n){n.source===f.contentWindow&&n.origin===m&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),h.settled=!0)}))})),b=()=>g?Promise.reject(y):new Promise((async e=>{h.settled&&e();f.contentWindow?.postMessage({type:"livecodes-load"},m),await h,e()})),v=(e,t)=>new Promise((async(n,a)=>{if(g)return a(y);await b();const r=C();addEventListener("message",(function t(o){if(o.source===f.contentWindow&&o.origin===m&&"livecodes-api-response"===o.data?.type&&o.data?.id===r&&o.data.method===e){removeEventListener("message",t);const e=o.data.payload;e?.error?a(e.error):n(e)}})),f.contentWindow?.postMessage({method:e,id:r,args:t},m)})),w={},k=["load","ready","code","console","tests","destroy"],E=(e,t)=>{if(g)throw new Error(y);return k.includes(e)?(v("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&v("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==f.contentWindow||e.origin!==m||!t||!w[t])return;const n=e.data?.payload;w[t]?.forEach((e=>{e(n)}))}));const N=()=>{Object.values(w).forEach((e=>{e.length=0})),f?.remove?.(),g=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(p))}))}),{rootMargin:"150px"}).observe(p)}function S(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>v("run"),format:e=>v("format",[e]),getShareUrl:e=>v("getShareUrl",[e]),getConfig:e=>v("getConfig",[e]),setConfig:e=>v("setConfig",[e]),getCode:()=>v("getCode"),show:(e,t)=>v("show",[e,t]),runTests:()=>v("runTests"),onChange:e=>E("code",e),watch:E,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return v("exec",[e,...n])},destroy:()=>h.settled?v("destroy").then(N):g?Promise.reject(y):(N(),Promise.resolve())}}function o(e){void 0===e&&(e={});const{appUrl:t,params:n,config:r,import:o,...s}=e,i="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,a.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:o,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let a;const o=e.dataset.config||e.dataset.prefill;if(o)try{a=JSON.parse(o)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+s,...t,...a?{config:a}:{}})}))}))},6014:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>l,params:()=>d,toc:()=>u});var a=n(7462),r=(n(7294),n(3905)),o=n(325);const s={},i="Ruby (Wasm)",l={unversionedId:"languages/ruby-wasm",id:"languages/ruby-wasm",title:"Ruby (Wasm)",description:"Ruby is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.",source:"@site/docs/languages/ruby-wasm.md",sourceDirName:"languages",slug:"/languages/ruby-wasm",permalink:"/livecodes/docs/languages/ruby-wasm",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/ruby-wasm.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Riot.js",permalink:"/livecodes/docs/languages/riot"},next:{title:"Ruby",permalink:"/livecodes/docs/languages/ruby"}},c={},u=[{value:"Usage",id:"usage",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Alias",id:"alias",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}],d={"ruby-wasm":"class User\n  attr_accessor :name\n\n  def initialize(name)\n    @name = name\n  end\n\n  def admin?\n    @name == 'Admin'\n  end\nend\n\nuser = User.new('Bob')\n\n# the output will go to the console\nputs user\nputs user.admin?\n",console:"full"},p={toc:u,params:d};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"ruby-wasm"},"Ruby (Wasm)"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ruby-lang.org/"},"Ruby")," is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write."),(0,r.kt)("p",null,"LiveCodes uses ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ruby/ruby.wasm"},"ruby.wasm")," to run Ruby in the browser."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"ruby.wasm is a collection of ",(0,r.kt)("a",{parentName:"p",href:"https://webassembly.org/"},"WebAssembly")," ports of the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ruby/ruby"},"CRuby"),". It enables running Ruby application on browsers, WASI compatible WebAssembly runtimes, and Edge Computing platforms."),(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("a",{parentName:"p",href:"https://ruby.github.io/ruby.wasm/"},"ruby.github.io/ruby.wasm/"))),(0,r.kt)("admonition",{title:"Note",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"LiveCodes also supports running Ruby using ",(0,r.kt)("a",{parentName:"p",href:"https://opalrb.com/"},"Opal")," which is a Ruby to JavaScript source-to-source compiler. Read documentation ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/ruby"},"here"),".")),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"LiveCodes runs Ruby in the browser, including the stdlib."),(0,r.kt)("p",null,"JavaScript interoperability and DOM access is achieved using ",(0,r.kt)("a",{parentName:"p",href:"https://ruby.github.io/ruby.wasm/JS.html"},(0,r.kt)("inlineCode",{parentName:"a"},'"JS"')," module"),". See the ",(0,r.kt)("a",{parentName:"p",href:"#starter-template"},"starter template")," for an example."),(0,r.kt)("h2",{id:"language-info"},"Language Info"),(0,r.kt)("h3",{id:"name"},"Name"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ruby-wasm")),(0,r.kt)("h3",{id:"extension"},"Extension"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},".wasm.rb")),(0,r.kt)("h3",{id:"alias"},"Alias"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"rubywasm")),(0,r.kt)("h3",{id:"editor"},"Editor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"script")),(0,r.kt)("h2",{id:"compiler"},"Compiler"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ruby/ruby.wasm"},"ruby.wasm")),(0,r.kt)("h3",{id:"version"},"Version"),(0,r.kt)("p",null,"ruby.wasm v2.6.2, running Ruby v3.3"),(0,r.kt)("h2",{id:"code-formatting"},"Code Formatting"),(0,r.kt)("p",null,"Not supported for Ruby."),(0,r.kt)("h2",{id:"example-usage"},"Example Usage"),(0,r.kt)(o.Z,{params:d,height:"80vh",mdxType:"LiveCodes"}),(0,r.kt)("p",null,"This example demonstrates stdlib usage, JavaScript interoperability and DOM access:"),(0,r.kt)(o.Z,{template:"ruby-wasm",height:"80vh",mdxType:"LiveCodes"}),(0,r.kt)("h2",{id:"starter-template"},"Starter Template"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=ruby-wasm"},"https://livecodes.io/?template=ruby-wasm")),(0,r.kt)("h2",{id:"links"},"Links"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://ruby-lang.org/"},"Ruby")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://ruby-lang.org/en/documentation/"},"Ruby documentation")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/ruby/ruby.wasm"},"ruby.wasm")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/languages/ruby"},"Ruby using Opal")," in LiveCodes")))}m.isMDXComponent=!0}}]);