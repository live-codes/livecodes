"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5798],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=o,g=p["".concat(l,".").concat(m)]||p[m]||u[m]||a;return n?r.createElement(g,s(s({ref:t},d),{},{components:n})):r.createElement(g,s({ref:t},d))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:o,s[1]=i;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1262:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(7294),o=n(2389);function a(e){let{children:t,fallback:n}=e;return(0,o.Z)()?r.createElement(r.Fragment,null,t?.()):n??null}},325:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(7462),o=n(7294),a=n(9493);function s(e){const t=(0,o.useRef)(null),[n,r]=(0,o.useState)(e.className||""),[s,i]=(0,o.useState)(e.style||{}),[l,c]=(0,o.useState)(e.height),[d,p]=(0,o.useState)(),[u,m]=(0,o.useState)(JSON.stringify(e.config||"")),[g,f]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(!t.current)return;const{className:n,style:o,height:s,sdkReady:l,config:h,...v}=e;if(r(n||""),i(o||{}),c(s),d&&g===JSON.stringify(v)){if(u===JSON.stringify(h))return;m(JSON.stringify(h)),"string"==typeof h?fetch(h).then((e=>e.json())).then((e=>{d?.setConfig(e)})):h&&d.setConfig(h)}else f(JSON.stringify(v)),d?.destroy(),(0,a.T)(t.current,{config:h,...v}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,o.useEffect)((()=>()=>{d?.destroy()}),[]),o.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),p=n(5162),u=n(2134),m=n(420);function g(e){const[t,n]=(0,o.useState)(e.js),[r,a]=(0,o.useState)(e.ts),[s,i]=(0,o.useState)(e.react),[g,f]=(0,o.useState)(e.vue),[h,v]=(0,o.useState)(e.svelte),y="3.7rem",[w,b]=(0,o.useState)(!0),[k,S]=(0,o.useState)(y),E=(0,o.useRef)(null),x=()=>{setTimeout((()=>{S(`calc(${E.current.offsetHeight}px + ${y})`)}),5),setTimeout((()=>{S(`calc(${E.current.offsetHeight}px + ${y})`)}),255)};return(0,o.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(r,"ts")),i(e(s,"jsx")),f(e(g,"html")),v(e(h,"html"))}}),[]),o.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":w,style:{height:w?y:k,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},o.createElement("summary",{onClick:()=>{b(!w),x()}},"show code"),o.createElement("div",{ref:E,style:{display:"block",overflow:"hidden"}},o.createElement("div",{className:u.Z.collapsibleContent},o.createElement(d.Z,{groupId:"sdk-code"},o.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:x}},o.createElement(c.Z,{language:"js"},t)),o.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:x}},o.createElement(c.Z,{language:"ts"},r)),o.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:x}},o.createElement(c.Z,{language:"jsx"},s)),o.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:x}},o.createElement(c.Z,{language:"html"},g)),o.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:x}},o.createElement(c.Z,{language:"html"},h))))))}const f="container_Egsj";function h(e){const{className:t,style:n,showCode:a,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return o.createElement(o.Fragment,null,o.createElement(s,(0,r.Z)({className:`${f} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e)),!1!==e.showCode&&o.createElement(g,{js:p,ts:u,react:m,vue:h,svelte:v}))}},4887:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(7294),o=n(1262),a=n(814),s=n(9493),i=n(1446);function l(e){const{params:t,config:n,code:l,language:c="js",codeTitle:d="",showLineNumbers:p=!1,formatCode:u=!0,linkText:m="Run in LiveCodes",style:g={},className:f=""}=e,h=(0,s.r)({appUrl:i.G,params:t,config:n});return r.createElement("div",{style:{marginBottom:"30px",...g},className:f},l&&r.createElement(o.Z,null,(()=>{return r.createElement(a.Z,{language:c,title:d,showLineNumbers:p},u?(e=l,void 0===(t=c)&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})):l);var e,t})),r.createElement("a",{href:h,target:"_blank",rel:"noreferrer"},m,r.createElement("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"}},r.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))))}},9493:(e,t,n)=>{n.d(t,{T:()=>o,r:()=>a});var r=n(7728);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:r={},config:o={},import:a,lite:s,loading:i="lazy",template:l,view:c="split"}=t,d="headless"===c;let p,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!d||"object"!=typeof e)throw new Error("A valid container element is required.");if(!u){if(!d)throw new Error(`Cannot find element: "${e}"`);u=document.createElement("div"),x(u),document.body.appendChild(u)}try{p=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const m=p.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{p.searchParams.set(e,String(r[e]))})),"string"==typeof o)try{new URL(o),p.searchParams.set("config",o)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof o)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(o).length>0&&p.searchParams.set("config","sdk")}l&&p.searchParams.set("template",l),a&&p.searchParams.set("x",a),s&&p.searchParams.set("lite","true"),p.searchParams.set("embed","true"),p.searchParams.set("loading",d?"eager":i),p.searchParams.set("view",c);let g=!1;const f="Cannot call API methods after calling `destroy()`.",h=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t&&!d){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"===u.dataset.defaultStyles||d||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="5px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const r="eager"===i?"eager":"lazy";n.setAttribute("loading",r),n.classList.add("livecodes"),d?x(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=u.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:o},m))})),n.onload=()=>{e(n)},n.src=p.href,u.appendChild(n)})),v=new Promise((e=>{addEventListener("message",(function t(n){n.source===h.contentWindow&&n.origin===m&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),y=()=>g?Promise.reject(f):new Promise((async e=>{v.settled&&e();h.contentWindow?.postMessage({type:"livecodes-load"},m),await v,e()})),w=(e,t)=>new Promise((async(n,r)=>{if(g)return r(f);await y();const o=N();addEventListener("message",(function t(a){if(a.source===h.contentWindow&&a.origin===m&&"livecodes-api-response"===a.data?.type&&a.data?.id===o&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?r(e.error):n(e)}})),h.contentWindow?.postMessage({method:e,id:o,args:t},m)})),b={},k=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw new Error(f);return k.includes(e)?(w("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter((e=>e!==t)),0===b[e]?.length&&w("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==h.contentWindow||e.origin!==m||!t||!b[t])return;const n=e.data?.payload;b[t]?.forEach((e=>{e(n)}))}));const E=()=>{Object.values(b).forEach((e=>{e.length=0})),h?.remove?.(),g=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await y(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}function x(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const N=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>y(),run:()=>w("run"),format:e=>w("format",[e]),getShareUrl:e=>w("getShareUrl",[e]),getConfig:e=>w("getConfig",[e]),setConfig:e=>w("setConfig",[e]),getCode:()=>w("getCode"),show:(e,t)=>w("show",[e,t]),runTests:()=>w("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return w("exec",[e,...n])},destroy:()=>v.settled?w("destroy").then(E):g?Promise.reject(f):(E(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:n,config:o,import:a,...s}=e,i="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,r.compressToEncodedURIComponent)(JSON.stringify(o))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:a,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let r;const a=e.dataset.config||e.dataset.prefill;if(a)try{r=JSON.parse(a)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+s,...t,...r?{config:r}:{}})}))}))},2509:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var r=n(7462),o=(n(7294),n(3905)),a=n(325);n(4887);const s={},i="Solid (TS)",l={unversionedId:"languages/solid.tsx",id:"languages/solid.tsx",title:"Solid (TS)",description:"Solid is a JavaScript framework for making interactive web applications.",source:"@site/docs/languages/solid.tsx.md",sourceDirName:"languages",slug:"/languages/solid.tsx",permalink:"/livecodes/docs/languages/solid.tsx",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/solid.tsx.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Solid",permalink:"/livecodes/docs/languages/solid"},next:{title:"SQL",permalink:"/livecodes/docs/languages/sql"}},c={},d=[{value:"Demo",id:"demo",level:2},{value:"Usage",id:"usage",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}],p={toc:d};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"solid-ts"},"Solid (TS)"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.solidjs.com/"},"Solid")," is a JavaScript framework for making interactive web applications."),(0,o.kt)("p",null,"Solid offers very similar syntax to ",(0,o.kt)("a",{parentName:"p",href:"https://react.dev/"},"React"),", with strong focus on ",(0,o.kt)("a",{parentName:"p",href:"https://www.solidjs.com/guides/reactivity"},"reactivity")," using signals. Solid supports templating in 3 forms ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/jsx"},"JSX"),", Tagged Template Literals and Solid's HyperScript variant, although JSX is the predominate form. Solid also supports ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/typescript"},"TypeScript"),"."),(0,o.kt)("h2",{id:"demo"},"Demo"),(0,o.kt)(a.Z,{template:"solid",height:"400px",mdxType:"LiveCodes"}),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"For usage, see documentation for ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/jsx"},"JSX")," and ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/typescript"},"TypeScript")," support in LiveCodes."),(0,o.kt)("h2",{id:"language-info"},"Language Info"),(0,o.kt)("h3",{id:"name"},"Name"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"solid.tsx")),(0,o.kt)("h3",{id:"extension"},"Extension"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"solid.tsx")),(0,o.kt)("h3",{id:"editor"},"Editor"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"script")),(0,o.kt)("h2",{id:"compiler"},"Compiler"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions"},"Official Solid JSX compiler")," (",(0,o.kt)("inlineCode",{parentName:"p"},"babel-preset-solid"),")"),(0,o.kt)("h3",{id:"version"},"Version"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"babel-preset-solid")," version 1.7.4"),(0,o.kt)("h2",{id:"code-formatting"},"Code Formatting"),(0,o.kt)("p",null,"Using ",(0,o.kt)("a",{parentName:"p",href:"https://prettier.io/"},"Prettier"),"."),(0,o.kt)("h2",{id:"custom-settings"},"Custom Settings"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"Custom settings")," added to the property ",(0,o.kt)("inlineCode",{parentName:"p"},"solid.tsx")," are passed to the Babel compiler during compile. Please check the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions#plugin-options"},"documentation")," for full reference.\nIn addition, the option ",(0,o.kt)("inlineCode",{parentName:"p"},"disableAutoRender")," can be set to ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," to disable ",(0,o.kt)("a",{parentName:"p",href:"./jsx#auto-rendering"},"auto-rendering"),"."),(0,o.kt)("p",null,"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Example:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "solid": {\n    "disableAutoRender": true\n  }\n}\n')),(0,o.kt)("h2",{id:"starter-template"},"Starter Template"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=solid"},"https://livecodes.io/?template=solid")),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.solidjs.com/"},"Solid")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://react.dev/learn/writing-markup-with-jsx"},"JSX")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/"},"TypeScript"))))}u.isMDXComponent=!0}}]);