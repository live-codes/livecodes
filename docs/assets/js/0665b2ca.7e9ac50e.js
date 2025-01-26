"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3729],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=o,h=p["".concat(l,".").concat(m)]||p[m]||u[m]||a;return n?r.createElement(h,i(i({ref:t},d),{},{components:n})):r.createElement(h,i({ref:t},d))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1262:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(7294),o=n(2389);function a(e){let{children:t,fallback:n}=e;return(0,o.Z)()?r.createElement(r.Fragment,null,t?.()):n??null}},325:(e,t,n)=>{n.d(t,{Z:()=>g});var r=n(7462),o=n(7294),a=n(9493);function i(e){const t=(0,o.useRef)(null),[n,r]=(0,o.useState)(e.className||""),[i,s]=(0,o.useState)(e.style||{}),[l,c]=(0,o.useState)(e.height),[d,p]=(0,o.useState)(),[u,m]=(0,o.useState)(JSON.stringify(e.config||"")),[h,f]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(!t.current)return;const{className:n,style:o,height:i,sdkReady:l,config:g,...y}=e;if(r(n||""),s(o||{}),c(i),d&&h===JSON.stringify(y)){if(u===JSON.stringify(g))return;m(JSON.stringify(g)),"string"==typeof g?fetch(g).then((e=>e.json())).then((e=>{d?.setConfig(e)})):g&&d.setConfig(g)}else f(JSON.stringify(y)),d?.destroy(),(0,a.T)(t.current,{config:g,...y}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,o.useEffect)((()=>()=>{d?.destroy()}),[]),o.createElement("div",{ref:t,className:n,style:i,"data-height":l})}var s=n(1446),l=n(412),c=n(814),d=n(4866),p=n(5162),u=n(2134),m=n(420);function h(e){const[t,n]=(0,o.useState)(e.js),[r,a]=(0,o.useState)(e.ts),[i,s]=(0,o.useState)(e.react),[h,f]=(0,o.useState)(e.vue),[g,y]=(0,o.useState)(e.svelte),v="3.7rem",[b,w]=(0,o.useState)(!0),[k,E]=(0,o.useState)(v),P=(0,o.useRef)(null),S=()=>{setTimeout((()=>{E(`calc(${P.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{E(`calc(${P.current.offsetHeight}px + ${v})`)}),255)};return(0,o.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(r,"ts")),s(e(i,"jsx")),f(e(h,"html")),y(e(g,"html"))}}),[]),o.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},o.createElement("summary",{onClick:()=>{w(!b),S()}},"show code"),o.createElement("div",{ref:P,style:{display:"block",overflow:"hidden"}},o.createElement("div",{className:u.Z.collapsibleContent},o.createElement(d.Z,{groupId:"sdk-code"},o.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:S}},o.createElement(c.Z,{language:"js"},t)),o.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:S}},o.createElement(c.Z,{language:"ts"},r)),o.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:S}},o.createElement(c.Z,{language:"jsx"},i)),o.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:S}},o.createElement(c.Z,{language:"html"},h)),o.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:S}},o.createElement(c.Z,{language:"html"},g))))))}const f="container_Egsj";function g(e){const{className:t,style:n,showCode:a,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),g=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return o.createElement(o.Fragment,null,o.createElement(i,(0,r.Z)({className:`${f} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:s.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&o.createElement(h,{js:p,ts:u,react:m,vue:g,svelte:y}))}},4887:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(7294),o=n(1262),a=n(814),i=n(9493),s=n(1446);function l(e){const{params:t,config:n,code:l,language:c="js",codeTitle:d="",showLineNumbers:p=!1,formatCode:u=!0,linkText:m="Run in LiveCodes",style:h={},className:f=""}=e,g=(0,i.r)({appUrl:s.G,params:t,config:n});return r.createElement("div",{style:{marginBottom:"30px",...h},className:f},l&&r.createElement(o.Z,null,(()=>{return r.createElement(a.Z,{language:c,title:d,showLineNumbers:p},u?(e=l,void 0===(t=c)&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})):l);var e,t})),r.createElement("a",{href:g,target:"_blank",rel:"noreferrer"},m,r.createElement("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"}},r.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))))}},9493:(e,t,n)=>{n.d(t,{T:()=>o,r:()=>a});var r=n(7728);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:r={},config:o={},import:a,headless:i,lite:s,loading:l="lazy",template:c,view:d}=t,p=i||"headless"===d;let u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!p)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),N(m),document.body.appendChild(m)}try{u=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const h=u.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{u.searchParams.set(e,String(r[e]))})),c&&u.searchParams.set("template",c),a&&u.searchParams.set("x",a),p&&u.searchParams.set("headless","true"),s&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof o&&null==o.mode?o.mode="lite":u.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof o&&null==o.view&&"headless"!==d?o.view=d:u.searchParams.set("view",d)),"string"==typeof o)try{new URL(o),u.searchParams.set("config",o)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof o)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(o).length>0&&u.searchParams.set("config","sdk")}u.searchParams.set("embed","true"),u.searchParams.set("loading",p?"eager":l);let f=!1;const g="Cannot call API methods after calling `destroy()`.",y=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||p||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const n="livecodes",r=m.querySelector(`iframe.${n}`),a=r||document.createElement("iframe");a.classList.add(n),a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const i="eager"===l?"eager":"lazy";a.setAttribute("loading",i),p?N(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===h&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:o},h))})),a.onload=()=>{e(a)},a.src=u.href,r||m.appendChild(a)})),v=new Promise((e=>{addEventListener("message",(function t(n){n.source===y.contentWindow&&n.origin===h&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),b=()=>f?Promise.reject(g):new Promise((async e=>{v.settled&&e();y.contentWindow?.postMessage({type:"livecodes-load"},h),await v,e()})),w=(e,t)=>new Promise((async(n,r)=>{if(f)return r(g);await b();const o=C();addEventListener("message",(function t(a){if(a.source===y.contentWindow&&a.origin===h&&"livecodes-api-response"===a.data?.type&&a.data?.id===o&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?r(e.error):n(e)}})),y.contentWindow?.postMessage({method:e,id:o,args:t},h)})),k={},E=["load","ready","code","console","tests","destroy"],P=(e,t)=>{if(f)throw new Error(g);return E.includes(e)?(w("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter((e=>e!==t)),0===k[e]?.length&&w("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==y.contentWindow||e.origin!==h||!t||!k[t])return;const n=e.data?.payload;k[t]?.forEach((e=>{e(n)}))}));const S=()=>{Object.values(k).forEach((e=>{e.length=0})),y?.remove?.(),f=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function N(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>w("run"),format:e=>w("format",[e]),getShareUrl:e=>w("getShareUrl",[e]),getConfig:e=>w("getConfig",[e]),setConfig:e=>w("setConfig",[e]),getCode:()=>w("getCode"),show:(e,t)=>w("show",[e,t]),runTests:()=>w("runTests"),onChange:e=>P("code",e),watch:P,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return w("exec",[e,...n])},destroy:()=>v.settled?w("destroy").then(S):f?Promise.reject(g):(S(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:n,config:o,import:a,...i}=e,s="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,r.compressToEncodedURIComponent)(JSON.stringify(o))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...i,...n,x:a,...s}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let r;const a=e.dataset.config||e.dataset.prefill;if(a)try{r=JSON.parse(a)}catch{}const i=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+i,...t,...r?{config:r}:{}})}))}))},3782:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var r=n(7462),o=(n(7294),n(3905)),a=(n(4887),n(325));const i={},s="Python",l={unversionedId:"languages/python",id:"languages/python",title:"Python",description:"LiveCodes can run Python in the browser using Brython, a Python 3 implementation for client-side web programming.",source:"@site/docs/languages/python.md",sourceDirName:"languages",slug:"/languages/python",permalink:"/livecodes/docs/languages/python",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/python.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Python (Wasm)",permalink:"/livecodes/docs/languages/python-wasm"},next:{title:"R",permalink:"/livecodes/docs/languages/r"}},c={},d=[{value:"Usage",id:"usage",level:2},{value:"Standard Library",id:"standard-library",level:3},{value:"JavaScript Interoperability",id:"javascript-interoperability",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}],p={toc:d};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"python"},"Python"),(0,o.kt)("p",null,"LiveCodes can run Python in the browser using ",(0,o.kt)("a",{parentName:"p",href:"https://brython.info/"},"Brython"),", a Python 3 implementation for client-side web programming."),(0,o.kt)("admonition",{title:"Note",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Brython is a light-weight Python interpreter written in JavaScript. However, It does not allow loading external packages from PyPI."),(0,o.kt)("p",{parentName:"admonition"},"If you need to import external packages including scientific Python packages like numpy, pandas, scipy, matplotlib, and scikit-learn, you may want to use ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/python-wasm"},"Python (Wasm)"),", which uses Pyodide the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/python/cpython"},"CPython")," port to WebAssembly.")),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"LiveCodes runs Python code in the browser. There is no server required to run the code and no need to install Python."),(0,o.kt)("p",null,"In addition, since the Python code is running on the client-side, it has access to the ",(0,o.kt)("a",{parentName:"p",href:"#javascript-interoperability"},"JavaScript scope"),", including the page DOM and browser APIs. See the ",(0,o.kt)("a",{parentName:"p",href:"#starter-template"},"starter template")," for an example."),(0,o.kt)("h3",{id:"standard-library"},"Standard Library"),(0,o.kt)("p",null,"Many modules of the Python standard library are functional. See ",(0,o.kt)("a",{parentName:"p",href:"https://brython.info/static_doc/en/stdlib.html"},"Brython distribution")," for details."),(0,o.kt)("h3",{id:"javascript-interoperability"},"JavaScript Interoperability"),(0,o.kt)("p",null,"Interaction with the page DOM and JavaScript can be achieved using ",(0,o.kt)("a",{parentName:"p",href:"https://brython.info/static_doc/en/browser.html"},(0,o.kt)("inlineCode",{parentName:"a"},"browser"))," and ",(0,o.kt)("a",{parentName:"p",href:"https://brython.info/static_doc/en/javascript.html"},(0,o.kt)("inlineCode",{parentName:"a"},"javascript"))," modules. See ",(0,o.kt)("a",{parentName:"p",href:"https://brython.info/static_doc/en/dom_api.html"},"this guide")," for using the DOM API."),(0,o.kt)("p",null,"Check the ",(0,o.kt)("a",{parentName:"p",href:"#starter-template"},"starter template")," for an example."),(0,o.kt)("h2",{id:"language-info"},"Language Info"),(0,o.kt)("h3",{id:"name"},"Name"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"python")),(0,o.kt)("h3",{id:"extensions"},"Extensions"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},".py")),(0,o.kt)("h3",{id:"editor"},"Editor"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"script")),(0,o.kt)("h2",{id:"compiler"},"Compiler"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://brython.info/"},"Brython")),(0,o.kt)("h3",{id:"version"},"Version"),(0,o.kt)("p",null,"Brython v3.12.3, running Python v3.12"),(0,o.kt)("h2",{id:"code-formatting"},"Code Formatting"),(0,o.kt)("p",null,"Not supported."),(0,o.kt)("h2",{id:"example-usage"},"Example Usage"),(0,o.kt)(a.Z,{template:"python",height:"80vh",mdxType:"LiveCodes"}),(0,o.kt)("h2",{id:"starter-template"},"Starter Template"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=python"},"https://livecodes.io/?template=python")),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.python.org/"},"Python")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://brython.info/"},"Brython")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/languages/python-wasm"},"Python (Wasm)")," in LiveCodes")))}u.isMDXComponent=!0}}]);