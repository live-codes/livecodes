"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6854],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>g});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=p(n),u=o,g=c["".concat(i,".").concat(u)]||c[u]||d[u]||r;return n?a.createElement(g,l(l({ref:t},m),{},{components:n})):a.createElement(g,l({ref:t},m))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,l=new Array(r);l[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[c]="string"==typeof e?e:o,l[1]=s;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1262:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294),o=n(2389);function r(e){let{children:t,fallback:n}=e;return(0,o.Z)()?a.createElement(a.Fragment,null,t?.()):n??null}},325:(e,t,n)=>{n.d(t,{Z:()=>f});var a=n(7462),o=n(7294),r=n(9493);function l(e){const t=(0,o.useRef)(null),[n,a]=(0,o.useState)(e.className||""),[l,s]=(0,o.useState)(e.style||{}),[i,p]=(0,o.useState)(e.height),[m,c]=(0,o.useState)(),[d,u]=(0,o.useState)(JSON.stringify(e.config||"")),[g,h]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(!t.current)return;const{className:n,style:o,height:l,sdkReady:i,config:f,...v}=e;if(a(n||""),s(o||{}),p(l),m&&g===JSON.stringify(v)){if(d===JSON.stringify(f))return;u(JSON.stringify(f)),"string"==typeof f?fetch(f).then((e=>e.json())).then((e=>{m?.setConfig(e)})):f&&m.setConfig(f)}else h(JSON.stringify(v)),m?.destroy(),(0,r.T)(t.current,{config:f,...v}).then((e=>{c(e),"function"==typeof i&&i(e)}))}),[e]),(0,o.useEffect)((()=>()=>{m?.destroy()}),[]),o.createElement("div",{ref:t,className:n,style:l,"data-height":i})}var s=n(1446),i=n(412),p=n(814),m=n(4866),c=n(5162),d=n(2134),u=n(420);function g(e){const[t,n]=(0,o.useState)(e.js),[a,r]=(0,o.useState)(e.ts),[l,s]=(0,o.useState)(e.react),[g,h]=(0,o.useState)(e.vue),[f,v]=(0,o.useState)(e.svelte),y="3.7rem",[k,b]=(0,o.useState)(!0),[w,N]=(0,o.useState)(y),x=(0,o.useRef)(null),j=()=>{setTimeout((()=>{N(`calc(${x.current.offsetHeight}px + ${y})`)}),5),setTimeout((()=>{N(`calc(${x.current.offsetHeight}px + ${y})`)}),255)};return(0,o.useEffect)((()=>{if(i.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),r(e(a,"ts")),s(e(l,"jsx")),h(e(g,"html")),v(e(f,"html"))}}),[]),o.createElement("details",{className:`alert alert--info ${d.Z.details} ${u.Z.details}`,"data-collapsed":k,style:{height:k?y:w,overflow:"hidden",willChange:"height",transition:`height ${k?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},o.createElement("summary",{onClick:()=>{b(!k),j()}},"show code"),o.createElement("div",{ref:x,style:{display:"block",overflow:"hidden"}},o.createElement("div",{className:d.Z.collapsibleContent},o.createElement(m.Z,{groupId:"sdk-code"},o.createElement(c.Z,{value:"js",label:"JS",attributes:{onMouseDown:j}},o.createElement(p.Z,{language:"js"},t)),o.createElement(c.Z,{value:"ts",label:"TS",attributes:{onMouseDown:j}},o.createElement(p.Z,{language:"ts"},a)),o.createElement(c.Z,{value:"react",label:"React",attributes:{onMouseDown:j}},o.createElement(p.Z,{language:"jsx"},l)),o.createElement(c.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:j}},o.createElement(p.Z,{language:"html"},g)),o.createElement(c.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:j}},o.createElement(p.Z,{language:"html"},f))))))}const h="container_Egsj";function f(e){const{className:t,style:n,showCode:r,height:i,...p}=e,m=e=>JSON.stringify(e,null,2),c=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${m(p)};\ncreatePlayground('#container', options);\n\n`.trimStart(),d=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${m(p)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${m(p)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),f=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${m(p)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${m(p)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return o.createElement(o.Fragment,null,o.createElement(l,(0,a.Z)({className:`${h} ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:s.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&o.createElement(g,{js:c,ts:d,react:u,vue:f,svelte:v}))}},4887:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294),o=n(1262),r=n(814),l=n(9493),s=n(1446);function i(e){const{params:t,config:n,code:i,language:p="js",codeTitle:m="",showLineNumbers:c=!1,formatCode:d=!0,linkText:u="Run in LiveCodes",style:g={},className:h=""}=e,f=(0,l.r)({appUrl:s.G,params:t,config:n});return a.createElement("div",{style:{marginBottom:"30px",...g},className:h},i&&a.createElement(o.Z,null,(()=>{return a.createElement(r.Z,{language:p,title:m,showLineNumbers:c},d?(e=i,void 0===(t=p)&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})):i);var e,t})),a.createElement("a",{href:f,target:"_blank",rel:"noreferrer"},u,a.createElement("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"}},a.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))))}},9493:(e,t,n)=>{n.d(t,{T:()=>o,r:()=>r});var a=n(7728);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:a={},config:o={},import:r,lite:l,loading:s="lazy",template:i,view:p="split"}=t,m="headless"===p;let c,d=null;if("string"==typeof e)d=document.querySelector(e);else if(e instanceof HTMLElement)d=e;else if(!m||"object"!=typeof e)throw new Error("A valid container element is required.");if(!d){if(!m)throw new Error(`Cannot find element: "${e}"`);d=document.createElement("div"),j(d),document.body.appendChild(d)}try{c=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const u=c.origin;if("object"==typeof a&&Object.keys(a).forEach((e=>{c.searchParams.set(e,String(a[e]))})),"string"==typeof o)try{new URL(o),c.searchParams.set("config",o)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof o)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(o).length>0&&c.searchParams.set("config","sdk")}i&&c.searchParams.set("template",i),r&&c.searchParams.set("x",r),l&&c.searchParams.set("lite","true"),c.searchParams.set("embed","true"),c.searchParams.set("loading",m?"eager":s),c.searchParams.set("view",p);let g=!1;const h="Cannot call API methods after calling `destroy()`.",f=await new Promise((e=>{if(!d)return;const t=d.dataset.height||d.style.height;if(t&&!m){const e=isNaN(Number(t))?t:t+"px";d.style.height=e}"false"===d.dataset.defaultStyles||m||(d.style.backgroundColor||="#fff",d.style.border||="1px solid black",d.style.borderRadius||="8px",d.style.boxSizing||="border-box",d.style.padding||="0",d.style.width||="100%",d.style.height||=d.style.height||"300px",d.style.minHeight="200px",d.style.flexGrow="1",d.style.overflow||="hidden",d.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const a="eager"===s?"eager":"lazy";n.setAttribute("loading",a),n.classList.add("livecodes"),m?j(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=d.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===u&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:o},u))})),n.onload=()=>{e(n)},n.src=c.href,d.appendChild(n)})),v=new Promise((e=>{addEventListener("message",(function t(n){n.source===f.contentWindow&&n.origin===u&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),y=()=>g?Promise.reject(h):new Promise((async e=>{v.settled&&e();f.contentWindow?.postMessage({type:"livecodes-load"},u),await v,e()})),k=(e,t)=>new Promise((async(n,a)=>{if(g)return a(h);await y();const o=C();addEventListener("message",(function t(r){if(r.source===f.contentWindow&&r.origin===u&&"livecodes-api-response"===r.data?.type&&r.data?.id===o&&r.data.method===e){removeEventListener("message",t);const e=r.data.payload;e?.error?a(e.error):n(e)}})),f.contentWindow?.postMessage({method:e,id:o,args:t},u)})),b={},w=["load","ready","code","console","tests","destroy"],N=(e,t)=>{if(g)throw new Error(h);return w.includes(e)?(k("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter((e=>e!==t)),0===b[e]?.length&&k("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==f.contentWindow||e.origin!==u||!t||!b[t])return;const n=e.data?.payload;b[t]?.forEach((e=>{e(n)}))}));const x=()=>{Object.values(b).forEach((e=>{e.length=0})),f?.remove?.(),g=!0};if("lazy"===s&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await y(),t.unobserve(d))}))}),{rootMargin:"150px"}).observe(d)}function j(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>y(),run:()=>k("run"),format:e=>k("format",[e]),getShareUrl:e=>k("getShareUrl",[e]),getConfig:e=>k("getConfig",[e]),setConfig:e=>k("setConfig",[e]),getCode:()=>k("getCode"),show:(e,t)=>k("show",[e,t]),runTests:()=>k("runTests"),onChange:e=>N("code",e),watch:N,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return k("exec",[e,...n])},destroy:()=>v.settled?k("destroy").then(x):g?Promise.reject(h):(x(),Promise.resolve())}}function r(e){void 0===e&&(e={});const{appUrl:t,params:n,config:o,import:r,...l}=e,s="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,a.compressToEncodedURIComponent)(JSON.stringify(o))}:{},i=new URLSearchParams(JSON.parse(JSON.stringify({...l,...n,x:r,...s}))).toString();return(t||"https://livecodes.io")+(i?"?"+i:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let a;const r=e.dataset.config||e.dataset.prefill;if(r)try{a=JSON.parse(r)}catch{}const l=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+l,...t,...a?{config:a}:{}})}))}))},6575:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>h,externalsConfig:()=>d,frontMatter:()=>l,metadata:()=>i,npmConfig:()=>u,stdlibConfig:()=>c,toc:()=>m});var a=n(7462),o=(n(7294),n(3905)),r=n(325);n(4887);const l={},s="Gleam",i={unversionedId:"languages/gleam",id:"languages/gleam",title:"Gleam",description:"Gleam is a friendly language for building type-safe systems that scale!",source:"@site/docs/languages/gleam.md",sourceDirName:"languages",slug:"/languages/gleam",permalink:"/livecodes/docs/languages/gleam",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/gleam.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Flow",permalink:"/livecodes/docs/languages/flow"},next:{title:"Go (Golang)",permalink:"/livecodes/docs/languages/go"}},p={},m=[{value:"Usage",id:"usage",level:2},{value:"Standard Library",id:"standard-library",level:3},{value:"Custom Modules",id:"custom-modules",level:3},{value:"Externals",id:"externals",level:3},{value:"NPM Modules",id:"npm-modules",level:3},{value:"Example Usage",id:"example-usage",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}],c={activeEditor:"script",script:{language:"gleam",content:'import gleam/io\nimport gleam/string\n\npub fn main() {\n  "hello world!"\n  |> string.uppercase\n  |> io.println\n}'},tools:{status:"open"}},d={activeEditor:"script",script:{language:"gleam",content:'import gleam/io\n\n@external(javascript, "my_pkg/greet.js", "hello")\npub fn hello(str: String) -> String\n\npub fn main() {\n io.println(hello("from JavaScript"))\n}'},tools:{status:"open"},customSettings:{imports:{"my_pkg/greet.js":"https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js"}}},u={activeEditor:"script",script:{language:"gleam",content:'import gleam/io\n\n// npm module (https://www.npmjs.com/package/uuid)\n@external(javascript, "npm:uuid", "v4")\npub fn uuid() -> String\n\n// jsr module (https://jsr.io/@kwhinnery/yassify)\n@external(javascript, "jsr:@kwhinnery/yassify", "yassify")\npub fn yassify(str: String) -> String\n\npub fn main() {\n io.println(uuid())\n io.println(yassify("Hello, World!"))\n}\n'},tools:{status:"open"}},g={toc:m,stdlibConfig:c,externalsConfig:d,npmConfig:u};function h(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"gleam"},"Gleam"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://gleam.run"},"Gleam")," is a friendly language for building type-safe systems that scale!"),(0,o.kt)("p",null,"Gleam is a statically-typed functional programming language, which compiles to Erlang or JavaScript."),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"LiveCodes compiles Gleam code to JavaScript using the WebAssembly (wasm) version of the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/gleam-lang/gleam"},"official Gleam compiler"),". The compiled JavaScript code is then executed in the context of the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page"),"."),(0,o.kt)("p",null,"The compiled JavaScript code can be inspected in the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/compiled-code"},"Compiled Code Viewer")," in the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tools-pane"},"Tools Pane")," (below the result page). Console output is shown in the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/console"},"integrated console"),"."),(0,o.kt)("p",null,"Please note that the compiler messages (e.g. errors and warnings) are shown in the browser console (not the integrated console)."),(0,o.kt)("h3",{id:"standard-library"},"Standard Library"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://hexdocs.pm/gleam_stdlib/"},"Gleam's standard library")," in addition to the following packages are available for use and can be imported as usual with no additional configuration:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://hexdocs.pm/gleam_crypto/"},"gleam/crypto")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://hexdocs.pm/gleam_erlang/"},"gleam/erlang")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://hexdocs.pm/gleam_fetch/"},"gleam/fetch")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://hexdocs.pm/gleam_http/"},"gleam/http")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://hexdocs.pm/gleam_javascript/"},"gleam/javascript")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://hexdocs.pm/gleam_json/"},"gleam/json")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://hexdocs.pm/gleam_otp/"},"gleam/otp"))),(0,o.kt)("p",null,"Demo:"),(0,o.kt)(r.Z,{config:c,mdxType:"LiveCodes"}),(0,o.kt)("h3",{id:"custom-modules"},"Custom Modules"),(0,o.kt)("p",null,"Custom modules can be used in Gleam code. These modules have to be precompiled (to JavaScript) by the Gleam compiler. URLs to the compiled JavaScript code and either the Gleam source code or URLs to the Gleam source code are needed to be able to import custom modules."),(0,o.kt)("p",null,"This is an example for a repo with precompiled Gleam modules:",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/live-codes/gleam-precompiled"},"https://github.com/live-codes/gleam-precompiled")),(0,o.kt)("p",null,"Please refer to ",(0,o.kt)("a",{parentName:"p",href:"https://gleam.run/writing-gleam/command-line-reference/"},"Gleam CLI docs")," for details about adding and building packages."),(0,o.kt)("p",null,"Note that the built code was committed to the repo by clearing out ",(0,o.kt)("inlineCode",{parentName:"p"},".gitignore")," file."),(0,o.kt)("p",null,"The built code can then by accessed from a ",(0,o.kt)("a",{parentName:"p",href:"https://www.jsdelivr.com/?docs=gh"},"CDN that mirrors GitHub"),", like this:",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@main/...")),(0,o.kt)("p",null,"Built modules can then be declared in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"custom settings")," (Project menu \u2192 Custom Settings), under the ",(0,o.kt)("inlineCode",{parentName:"p"},"gleam")," property, by adding a ",(0,o.kt)("inlineCode",{parentName:"p"},"modules")," property."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"modules")," property is an object that has the module name as the key. The value is an object with the following properties:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"srcUrl"),": the URL to the Gleam source code of the module."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"src"),": optionally use this instead of ",(0,o.kt)("inlineCode",{parentName:"li"},"srcUrl")," to specify the Gleam source code of the module."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"compiledUrl"),": the URL to the compiled JavaScript code of the module.")),(0,o.kt)("p",null,"Example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "gleam": {\n    "modules": {\n      "plinth/browser/document": {\n        "srcUrl": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/build/packages/plinth/src/plinth/browser/document.gleam",\n        "compiledUrl": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/build/dev/javascript/plinth/plinth/browser/document.mjs"\n      }\n    }\n  }\n}\n')),(0,o.kt)("p",null,"See the ",(0,o.kt)("a",{parentName:"p",href:"#example-usage"},"demo below")," (",(0,o.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=gleam"},"open in LiveCodes"),")."),(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"compiledUrl")," property is not specified, the JavaScript module is imported from this URL pattern: ",(0,o.kt)("inlineCode",{parentName:"p"},"{module_name}.mjs")," (example: ",(0,o.kt)("inlineCode",{parentName:"p"},"plinth/browser/document.mjs"),").",(0,o.kt)("br",{parentName:"p"}),"\n","This can then be ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#custom-module-resolution"},"mapped (using import maps)")," in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"custom settings")," (Project menu \u2192 Custom Settings) to the full URL of the compiled JavaScript code."),(0,o.kt)("p",null,"Example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "gleam": {\n    "modules": {\n      "some_pkg/some_module": {\n        "srcUrl": "https://example.com/packages/some_pkg/some_module.gleam"\n      },\n      "another_pkg/another_module": {\n        "srcUrl": "https://example.com/packages/another_pkg/another_module.gleam"\n      }\n    }\n  },\n  "imports": {\n    // map a specific module\n    "some_pkg/some_module.mjs": "https://example.com/compiled/some_pkg/some_module.mjs",\n    // or map a whole directory\n    "another_pkg/": "https://example.com/compiled/another_pkg/"\n  }\n}\n')),(0,o.kt)("h3",{id:"externals"},"Externals"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://tour.gleam.run/advanced-features/externals/"},"External functions")," written in JavaScript can also be used. An external function has the ",(0,o.kt)("inlineCode",{parentName:"p"},"@external"),' attribute on it. It needs to specify a "relative" URL specifying the location of the external code. This URL is ',(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#custom-module-resolution"},"mapped (using import maps)")," in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"custom settings")," (Project menu \u2192 Custom Settings) to the full URL of the script that contains the code."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Example:")),(0,o.kt)("p",null,"The following script is hosted on this URL:",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("a",{parentName:"p",href:"https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js"},"https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="greet.js"',title:'"greet.js"'},"export const hello = (str) => `Hello, ${str}!`;\n")),(0,o.kt)("p",null,"Use this in custom settings:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "imports": {\n    "my_pkg/greet.js": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js"\n  }\n}\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},'"my_pkg/greet.js"')," can then be used in the ",(0,o.kt)("inlineCode",{parentName:"p"},"@external")," attribute."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="Gleam"',title:'"Gleam"'},'import gleam/io\n\n// highlight-next-line\n@external(javascript, "my_pkg/greet.js", "hello")\n// highlight-next-line\npub fn hello(str: String) -> String\n\npub fn main() {\n io.println(hello("from JavaScript"))\n}\n')),(0,o.kt)("p",null,"Demo:"),(0,o.kt)(r.Z,{config:d,mdxType:"LiveCodes"}),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs"},"Data URLs")," can be used to avoid having to host the external code online. LiveCodes enables ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/data-urls"},"creating data URLs")," easily."),(0,o.kt)("p",{parentName:"admonition"},"Example:",(0,o.kt)("br",{parentName:"p"}),"\n","The import map in the previous example can be rewritten like this:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "imports": {\n    "my_pkg/greet.js": "data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNvbnN0IGhlbGxvID0gKHN0cikgPT4gYEhlbGxvLCAke3N0cn0hYDs="\n  }\n}\n'))),(0,o.kt)("h3",{id:"npm-modules"},"NPM Modules"),(0,o.kt)("p",null,"Modules published to ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/"},"npm"),", ",(0,o.kt)("a",{parentName:"p",href:"https://deno.land/x"},"deno.land/x")," and ",(0,o.kt)("a",{parentName:"p",href:"https://jsr.io/"},"jsr.io")," can be imported as external functions. There is no need to specify import maps. The package/module name is prefixed with a modifier to specify the source (e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"npm:uuid")," to import the ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/uuid"},(0,o.kt)("inlineCode",{parentName:"a"},"uuid"))," npm module)."),(0,o.kt)("p",null,"See list of supported CDNs and the respective modifiers in the section about ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#cdn-providers"},"module resolution"),"."),(0,o.kt)("p",null,"Example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import gleam/io\n\n// npm module (https://www.npmjs.com/package/uuid)\n@external(javascript, "npm:uuid", "v4")\npub fn uuid() -> String\n\n// jsr module (https://jsr.io/@kwhinnery/yassify)\n@external(javascript, "jsr:@kwhinnery/yassify", "yassify")\npub fn yassify(str: String) -> String\n\npub fn main() {\n io.println(uuid())\n io.println(yassify("Hello, World!"))\n}\n')),(0,o.kt)("p",null,"Demo:"),(0,o.kt)(r.Z,{config:u,mdxType:"LiveCodes"}),(0,o.kt)("h3",{id:"example-usage"},"Example Usage"),(0,o.kt)("p",null,"This is the Gleam starter template demonstrating the use of standard library, custom modules, external functions and npm modules."),(0,o.kt)(r.Z,{template:"gleam",height:"80vh",mdxType:"LiveCodes"}),(0,o.kt)("h2",{id:"language-info"},"Language Info"),(0,o.kt)("h3",{id:"name"},"Name"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"gleam")),(0,o.kt)("h3",{id:"extension"},"Extension"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},".gleam")),(0,o.kt)("h3",{id:"editor"},"Editor"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"script")),(0,o.kt)("h2",{id:"compiler"},"Compiler"),(0,o.kt)("p",null,"The wasm version of the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/gleam-lang/gleam"},"official Gleam compiler"),"."),(0,o.kt)("h3",{id:"version"},"Version"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"v1.3.0-rc1")),(0,o.kt)("h2",{id:"starter-template"},"Starter Template"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=gleam"},"https://livecodes.io/?template=gleam")),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://gleam.run"},"Gleam")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://gleam.run/documentation/"},"Gleam documentation")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://tour.gleam.run/"},"Gleam language tour"))))}h.isMDXComponent=!0}}]);