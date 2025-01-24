"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7774],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,g=p["".concat(l,".").concat(m)]||p[m]||u[m]||a;return n?o.createElement(g,s(s({ref:t},d),{},{components:n})):o.createElement(g,s({ref:t},d))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<a;c++)s[c]=n[c];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1262:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(7294),r=n(2389);function a(e){let{children:t,fallback:n}=e;return(0,r.Z)()?o.createElement(o.Fragment,null,t?.()):n??null}},325:(e,t,n)=>{n.d(t,{Z:()=>h});var o=n(7462),r=n(7294),a=n(9493);function s(e){const t=(0,r.useRef)(null),[n,o]=(0,r.useState)(e.className||""),[s,i]=(0,r.useState)(e.style||{}),[l,c]=(0,r.useState)(e.height),[d,p]=(0,r.useState)(),[u,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,f]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(!t.current)return;const{className:n,style:r,height:s,sdkReady:l,config:h,...v}=e;if(o(n||""),i(r||{}),c(s),d&&g===JSON.stringify(v)){if(u===JSON.stringify(h))return;m(JSON.stringify(h)),"string"==typeof h?fetch(h).then((e=>e.json())).then((e=>{d?.setConfig(e)})):h&&d.setConfig(h)}else f(JSON.stringify(v)),d?.destroy(),(0,a.T)(t.current,{config:h,...v}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,r.useEffect)((()=>()=>{d?.destroy()}),[]),r.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),p=n(5162),u=n(2134),m=n(420);function g(e){const[t,n]=(0,r.useState)(e.js),[o,a]=(0,r.useState)(e.ts),[s,i]=(0,r.useState)(e.react),[g,f]=(0,r.useState)(e.vue),[h,v]=(0,r.useState)(e.svelte),y="3.7rem",[w,b]=(0,r.useState)(!0),[k,S]=(0,r.useState)(y),E=(0,r.useRef)(null),N=()=>{setTimeout((()=>{S(`calc(${E.current.offsetHeight}px + ${y})`)}),5),setTimeout((()=>{S(`calc(${E.current.offsetHeight}px + ${y})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(o,"ts")),i(e(s,"jsx")),f(e(g,"html")),v(e(h,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":w,style:{height:w?y:k,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{b(!w),N()}},"show code"),r.createElement("div",{ref:E,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:u.Z.collapsibleContent},r.createElement(d.Z,{groupId:"sdk-code"},r.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"js"},t)),r.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"ts"},o)),r.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"jsx"},s)),r.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"html"},g)),r.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"html"},h))))))}const f="container_Egsj";function h(e){const{className:t,style:n,showCode:a,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(s,(0,o.Z)({className:`${f} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&r.createElement(g,{js:p,ts:u,react:m,vue:h,svelte:v}))}},4887:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(7294),r=n(1262),a=n(814),s=n(9493),i=n(1446);function l(e){const{params:t,config:n,code:l,language:c="js",codeTitle:d="",showLineNumbers:p=!1,formatCode:u=!0,linkText:m="Run in LiveCodes",style:g={},className:f=""}=e,h=(0,s.r)({appUrl:i.G,params:t,config:n});return o.createElement("div",{style:{marginBottom:"30px",...g},className:f},l&&o.createElement(r.Z,null,(()=>{return o.createElement(a.Z,{language:c,title:d,showLineNumbers:p},u?(e=l,void 0===(t=c)&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})):l);var e,t})),o.createElement("a",{href:h,target:"_blank",rel:"noreferrer"},m,o.createElement("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"}},o.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))))}},9493:(e,t,n)=>{n.d(t,{T:()=>r,r:()=>a});var o=n(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:o={},config:r={},import:a,headless:s,lite:i,loading:l="lazy",template:c,view:d}=t,p=s||"headless"===d;let u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!p)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),x(m),document.body.appendChild(m)}try{u=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const g=u.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{u.searchParams.set(e,String(o[e]))})),c&&u.searchParams.set("template",c),a&&u.searchParams.set("x",a),p&&u.searchParams.set("headless","true"),i&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":u.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==d?r.view=d:u.searchParams.set("view",d)),"string"==typeof r)try{new URL(r),u.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&u.searchParams.set("config","sdk")}u.searchParams.set("embed","true"),u.searchParams.set("loading",p?"eager":l);let f=!1;const h="Cannot call API methods after calling `destroy()`.",v=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||p||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const n="livecodes",o=m.querySelector(`iframe.${n}`),a=o||document.createElement("iframe");a.classList.add(n),a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const s="eager"===l?"eager":"lazy";a.setAttribute("loading",s),p?x(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===g&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:r},g))})),a.onload=()=>{e(a)},a.src=u.href,o||m.appendChild(a)})),y=new Promise((e=>{addEventListener("message",(function t(n){n.source===v.contentWindow&&n.origin===g&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),y.settled=!0)}))})),w=()=>f?Promise.reject(h):new Promise((async e=>{y.settled&&e();v.contentWindow?.postMessage({type:"livecodes-load"},g),await y,e()})),b=(e,t)=>new Promise((async(n,o)=>{if(f)return o(h);await w();const r=C();addEventListener("message",(function t(a){if(a.source===v.contentWindow&&a.origin===g&&"livecodes-api-response"===a.data?.type&&a.data?.id===r&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?o(e.error):n(e)}})),v.contentWindow?.postMessage({method:e,id:r,args:t},g)})),k={},S=["load","ready","code","console","tests","destroy"],E=(e,t)=>{if(f)throw new Error(h);return S.includes(e)?(b("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter((e=>e!==t)),0===k[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==v.contentWindow||e.origin!==g||!t||!k[t])return;const n=e.data?.payload;k[t]?.forEach((e=>{e(n)}))}));const N=()=>{Object.values(k).forEach((e=>{e.length=0})),v?.remove?.(),f=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await w(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function x(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>w(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>E("code",e),watch:E,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return b("exec",[e,...n])},destroy:()=>y.settled?b("destroy").then(N):f?Promise.reject(h):(N(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:n,config:r,import:a,...s}=e,i="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:a,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o;const a=e.dataset.config||e.dataset.prefill;if(a)try{o=JSON.parse(a)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+s,...t,...o?{config:o}:{}})}))}))},3964:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var o=n(7462),r=(n(7294),n(3905)),a=n(325);n(4887);const s={},i="Solid",l={unversionedId:"languages/solid",id:"languages/solid",title:"Solid",description:"Solid is a JavaScript framework for making interactive web applications.",source:"@site/docs/languages/solid.md",sourceDirName:"languages",slug:"/languages/solid",permalink:"/livecodes/docs/languages/solid",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/solid.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"SCSS",permalink:"/livecodes/docs/languages/scss"},next:{title:"Solid (TS)",permalink:"/livecodes/docs/languages/solid.tsx"}},c={},d=[{value:"Demo",id:"demo",level:2},{value:"Usage",id:"usage",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}],p={toc:d};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"solid"},"Solid"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.solidjs.com/"},"Solid")," is a JavaScript framework for making interactive web applications."),(0,r.kt)("p",null,"Solid offers very similar syntax to ",(0,r.kt)("a",{parentName:"p",href:"https://react.dev/"},"React"),", with strong focus on ",(0,r.kt)("a",{parentName:"p",href:"https://www.solidjs.com/guides/reactivity"},"reactivity")," using signals. Solid supports templating in 3 forms ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/jsx"},"JSX"),", Tagged Template Literals and Solid's HyperScript variant, although JSX is the predominate form. Solid also supports ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/typescript"},"TypeScript")," (See ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/solid.tsx"},"Solid-TS"),")."),(0,r.kt)("h2",{id:"demo"},"Demo"),(0,r.kt)(a.Z,{template:"solid",height:"400px",mdxType:"LiveCodes"}),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"For usage, see documentation for ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/jsx"},"JSX")," and ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/typescript"},"TypeScript")," support in LiveCodes."),(0,r.kt)("h2",{id:"language-info"},"Language Info"),(0,r.kt)("h3",{id:"name"},"Name"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"solid")),(0,r.kt)("h3",{id:"extension"},"Extension"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"solid.jsx")),(0,r.kt)("h3",{id:"editor"},"Editor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"script")),(0,r.kt)("h2",{id:"compiler"},"Compiler"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions"},"Official Solid JSX compiler")," (",(0,r.kt)("inlineCode",{parentName:"p"},"babel-preset-solid"),")"),(0,r.kt)("h3",{id:"version"},"Version"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"babel-preset-solid")," version 1.7.4"),(0,r.kt)("h2",{id:"code-formatting"},"Code Formatting"),(0,r.kt)("p",null,"Using ",(0,r.kt)("a",{parentName:"p",href:"https://prettier.io/"},"Prettier"),"."),(0,r.kt)("h2",{id:"custom-settings"},"Custom Settings"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"Custom settings")," added to the property ",(0,r.kt)("inlineCode",{parentName:"p"},"solid")," are passed to the Babel compiler during compile. Please check the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions#plugin-options"},"documentation")," for full reference.\nIn addition, the option ",(0,r.kt)("inlineCode",{parentName:"p"},"disableAutoRender")," can be set to ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," to disable ",(0,r.kt)("a",{parentName:"p",href:"./jsx#auto-rendering"},"auto-rendering"),"."),(0,r.kt)("p",null,"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "solid": {\n    "disableAutoRender": true\n  }\n}\n')),(0,r.kt)("h2",{id:"starter-template"},"Starter Template"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=solid"},"https://livecodes.io/?template=solid")," (uses TSX)"),(0,r.kt)("h2",{id:"links"},"Links"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.solidjs.com/"},"Solid")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://react.dev/learn/writing-markup-with-jsx"},"JSX")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/"},"TypeScript"))))}u.isMDXComponent=!0}}]);