"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3824],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,g=u["".concat(l,".").concat(m)]||u[m]||p[m]||o;return n?a.createElement(g,s(s({ref:t},d),{},{components:n})):a.createElement(g,s({ref:t},d))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>y});var a=n(7462),r=n(7294),o=n(9493);function s(e){const t=(0,r.useRef)(null),[n,a]=(0,r.useState)(e.className||""),[s,i]=(0,r.useState)(e.style||{}),[l,c]=(0,r.useState)(e.height),[d,u]=(0,r.useState)(),[p,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,f]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(!t.current)return;const{className:n,style:r,height:s,sdkReady:l,config:y,...h}=e;if(a(n||""),i(r||{}),c(s),d&&g===JSON.stringify(h)){if(p===JSON.stringify(y))return;m(JSON.stringify(y)),"string"==typeof y?fetch(y).then((e=>e.json())).then((e=>{d?.setConfig(e)})):y&&d.setConfig(y)}else f(JSON.stringify(h)),d?.destroy(),(0,o.T)(t.current,{config:y,...h}).then((e=>{u(e),"function"==typeof l&&l(e)}))}),[e]),(0,r.useEffect)((()=>()=>{d?.destroy()}),[]),r.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),u=n(5162),p=n(2134),m=n(420);function g(e){const[t,n]=(0,r.useState)(e.js),[a,o]=(0,r.useState)(e.ts),[s,i]=(0,r.useState)(e.react),[g,f]=(0,r.useState)(e.vue),[y,h]=(0,r.useState)(e.svelte),v="3.7rem",[b,w]=(0,r.useState)(!0),[k,E]=(0,r.useState)(v),N=(0,r.useRef)(null),S=()=>{setTimeout((()=>{E(`calc(${N.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{E(`calc(${N.current.offsetHeight}px + ${v})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),o(e(a,"ts")),i(e(s,"jsx")),f(e(g,"html")),h(e(y,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{w(!b),S()}},"show code"),r.createElement("div",{ref:N,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:p.Z.collapsibleContent},r.createElement(d.Z,{groupId:"sdk-code"},r.createElement(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"js"},t)),r.createElement(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"ts"},a)),r.createElement(u.Z,{value:"react",label:"React",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"jsx"},s)),r.createElement(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"html"},g)),r.createElement(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:S}},r.createElement(c.Z,{language:"html"},y))))))}const f="container_Egsj";function y(e){const{className:t,style:n,showCode:o,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),u=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),y=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,h=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(s,(0,a.Z)({className:`${f} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(166, 40%, 50%",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&r.createElement(g,{js:u,ts:p,react:m,vue:y,svelte:h}))}},9493:(e,t,n)=>{n.d(t,{T:()=>r,r:()=>o});var a=n(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:a={},config:r={},import:o,lite:s,loading:i="lazy",template:l,view:c="split"}=t,d="headless"===c;let u,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!d||"object"!=typeof e)throw new Error("A valid container element is required.");if(!p){if(!d)throw new Error(`Cannot find element: "${e}"`);p=document.createElement("div"),S(p),document.body.appendChild(p)}try{u=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const m=u.origin;if("object"==typeof a&&Object.keys(a).forEach((e=>{u.searchParams.set(e,String(a[e]))})),"string"==typeof r)try{new URL(r),u.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&u.searchParams.set("config","sdk")}l&&u.searchParams.set("template",l),o&&u.searchParams.set("x",o),s&&u.searchParams.set("lite","true"),u.searchParams.set("embed","true"),u.searchParams.set("loading",d?"eager":i),u.searchParams.set("view",c);let g=!1;const f="Cannot call API methods after calling `destroy()`.",y=await new Promise((e=>{if(!p)return;const t=p.dataset.height||p.style.height;if(t&&!d){const e=isNaN(Number(t))?t:t+"px";p.style.height=e}"false"===p.dataset.defaultStyles||d||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="8px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const a="eager"===i?"eager":"lazy";n.setAttribute("loading",a),n.classList.add("livecodes"),d?S(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=p.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:r},m))})),n.onload=()=>{e(n)},n.src=u.href,p.appendChild(n)})),h=new Promise((e=>{addEventListener("message",(function t(n){n.source===y.contentWindow&&n.origin===m&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),h.settled=!0)}))})),v=()=>g?Promise.reject(f):new Promise((async e=>{h.settled&&e();y.contentWindow?.postMessage({type:"livecodes-load"},m),await h,e()})),b=(e,t)=>new Promise((async(n,a)=>{if(g)return a(f);await v();const r=O();addEventListener("message",(function t(o){if(o.source===y.contentWindow&&o.origin===m&&"livecodes-api-response"===o.data?.type&&o.data?.id===r&&o.data.method===e){removeEventListener("message",t);const e=o.data.payload;e?.error?a(e.error):n(e)}})),y.contentWindow?.postMessage({method:e,id:r,args:t},m)})),w={},k=["load","ready","code","console","tests","destroy"],E=(e,t)=>{if(g)throw new Error(f);return k.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==y.contentWindow||e.origin!==m||!t||!w[t])return;const n=e.data?.payload;w[t]?.forEach((e=>{e(n)}))}));const N=()=>{Object.values(w).forEach((e=>{e.length=0})),y?.remove?.(),g=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(p))}))}),{rootMargin:"150px"}).observe(p)}function S(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const O=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>E("code",e),watch:E,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return b("exec",[e,...n])},destroy:()=>h.settled?b("destroy").then(N):g?Promise.reject(f):(N(),Promise.resolve())}}function o(e){void 0===e&&(e={});const{appUrl:t,params:n,config:r,import:o,...s}=e,i="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,a.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:o,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let a;const o=e.dataset.config||e.dataset.prefill;if(o)try{a=JSON.parse(o)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+s,...t,...a?{config:a}:{}})}))}))},212:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>l,params:()=>u,toc:()=>d});var a=n(7462),r=(n(7294),n(3905)),o=n(325);const s={},i="Ruby",l={unversionedId:"languages/ruby",id:"languages/ruby",title:"Ruby",description:"Ruby is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.",source:"@site/docs/languages/ruby.md",sourceDirName:"languages",slug:"/languages/ruby",permalink:"/livecodes/docs/languages/ruby",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/ruby.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Ruby (Wasm)",permalink:"/livecodes/docs/languages/ruby-wasm"},next:{title:"Sass",permalink:"/livecodes/docs/languages/sass"}},c={},d=[{value:"Usage",id:"usage",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}],u={ruby:"class User\n  attr_accessor :name\n\n  def initialize(name)\n    @name = name\n  end\n\n  def admin?\n    @name == 'Admin'\n  end\nend\n\nuser = User.new('Bob')\n\n# the output will go to the console\nputs user\nputs user.admin?\n",console:"full"},p={toc:d,params:u};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"ruby"},"Ruby"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://ruby-lang.org/"},"Ruby")," is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write."),(0,r.kt)("p",null,"LiveCodes runs Ruby in the browser using ",(0,r.kt)("a",{parentName:"p",href:"https://opalrb.com/"},"Opal"),"."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Opal is a Ruby to JavaScript source-to-source compiler.\nIt comes packed with the Ruby corelib you know and love.\nIt is both fast as a runtime and small in its footprint."),(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("a",{parentName:"p",href:"https://opalrb.com/"},"opalrb.com"))),(0,r.kt)("admonition",{title:"Note",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"LiveCodes also supports running Ruby using ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ruby/ruby.wasm"},"ruby.wasm")," which is a collection of WebAssembly ports of the official ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ruby/ruby"},"CRuby"),". Read documentation ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/ruby-wasm"},"here"))),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"LiveCodes runs Ruby in the browser, including ",(0,r.kt)("a",{parentName:"p",href:"https://opalrb.com/docs/api/v1.7.3/corelib/index.html"},"corelib")," and the supported ",(0,r.kt)("a",{parentName:"p",href:"https://opalrb.com/docs/api/v1.7.3/stdlib/index.html"},"stdlib"),"."),(0,r.kt)("p",null,"JavaScript interoperability and DOM access is achieved using ",(0,r.kt)("a",{parentName:"p",href:"https://opalrb.com/docs/api/v1.7.3/stdlib/Native"},(0,r.kt)("inlineCode",{parentName:"a"},'"Native"')," module"),". See the ",(0,r.kt)("a",{parentName:"p",href:"#starter-template"},"starter template")," for an example."),(0,r.kt)("h2",{id:"language-info"},"Language Info"),(0,r.kt)("h3",{id:"name"},"Name"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ruby")),(0,r.kt)("h3",{id:"extension"},"Extension"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},".rb")),(0,r.kt)("h3",{id:"editor"},"Editor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"script")),(0,r.kt)("h2",{id:"compiler"},"Compiler"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://opalrb.com/"},"Opal")),(0,r.kt)("h3",{id:"version"},"Version"),(0,r.kt)("p",null,"Opal v1.8.2"),(0,r.kt)("h2",{id:"code-formatting"},"Code Formatting"),(0,r.kt)("p",null,"Not supported for Ruby."),(0,r.kt)("h2",{id:"example-usage"},"Example Usage"),(0,r.kt)(o.Z,{params:u,height:"80vh",mdxType:"LiveCodes"}),(0,r.kt)("p",null,"This example demonstrates stdlib usage, JavaScript interoperability and DOM access:"),(0,r.kt)(o.Z,{template:"ruby",height:"80vh",mdxType:"LiveCodes"}),(0,r.kt)("h2",{id:"starter-template"},"Starter Template"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=ruby"},"https://livecodes.io/?template=ruby")),(0,r.kt)("h2",{id:"links"},"Links"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://ruby-lang.org/"},"Ruby")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://ruby-lang.org/en/documentation/"},"Ruby documentation")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://opalrb.com/"},"Opal")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/languages/ruby-wasm"},"ruby.wasm")," in LiveCodes")))}m.isMDXComponent=!0}}]);