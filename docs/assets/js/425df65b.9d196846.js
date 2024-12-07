"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8410],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>f});var r=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,o=function(e,t){if(null==e)return{};var a,r,o={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=r.createContext({}),d=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},c=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,o=e.mdxType,n=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=d(a),m=o,f=p["".concat(l,".").concat(m)]||p[m]||u[m]||n;return a?r.createElement(f,s(s({ref:t},c),{},{components:a})):r.createElement(f,s({ref:t},c))}));function f(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=a.length,s=new Array(n);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:o,s[1]=i;for(var d=2;d<n;d++)s[d]=a[d];return r.createElement.apply(null,s)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1262:(e,t,a)=>{a.d(t,{Z:()=>n});var r=a(7294),o=a(2389);function n(e){let{children:t,fallback:a}=e;return(0,o.Z)()?r.createElement(r.Fragment,null,t?.()):a??null}},325:(e,t,a)=>{a.d(t,{Z:()=>g});var r=a(7462),o=a(7294),n=a(9493);function s(e){const t=(0,o.useRef)(null),[a,r]=(0,o.useState)(e.className||""),[s,i]=(0,o.useState)(e.style||{}),[l,d]=(0,o.useState)(e.height),[c,p]=(0,o.useState)(),[u,m]=(0,o.useState)(JSON.stringify(e.config||"")),[f,h]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(!t.current)return;const{className:a,style:o,height:s,sdkReady:l,config:g,...v}=e;if(r(a||""),i(o||{}),d(s),c&&f===JSON.stringify(v)){if(u===JSON.stringify(g))return;m(JSON.stringify(g)),"string"==typeof g?fetch(g).then((e=>e.json())).then((e=>{c?.setConfig(e)})):g&&c.setConfig(g)}else h(JSON.stringify(v)),c?.destroy(),(0,n.T)(t.current,{config:g,...v}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,o.useEffect)((()=>()=>{c?.destroy()}),[]),o.createElement("div",{ref:t,className:a,style:s,"data-height":l})}var i=a(1446),l=a(412),d=a(814),c=a(4866),p=a(5162),u=a(2134),m=a(420);function f(e){const[t,a]=(0,o.useState)(e.js),[r,n]=(0,o.useState)(e.ts),[s,i]=(0,o.useState)(e.react),[f,h]=(0,o.useState)(e.vue),[g,v]=(0,o.useState)(e.svelte),b="3.7rem",[y,k]=(0,o.useState)(!0),[w,N]=(0,o.useState)(b),E=(0,o.useRef)(null),S=()=>{setTimeout((()=>{N(`calc(${E.current.offsetHeight}px + ${b})`)}),5),setTimeout((()=>{N(`calc(${E.current.offsetHeight}px + ${b})`)}),255)};return(0,o.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};a(e(t,"js")),n(e(r,"ts")),i(e(s,"jsx")),h(e(f,"html")),v(e(g,"html"))}}),[]),o.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":y,style:{height:y?b:w,overflow:"hidden",willChange:"height",transition:`height ${y?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},o.createElement("summary",{onClick:()=>{k(!y),S()}},"show code"),o.createElement("div",{ref:E,style:{display:"block",overflow:"hidden"}},o.createElement("div",{className:u.Z.collapsibleContent},o.createElement(c.Z,{groupId:"sdk-code"},o.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:S}},o.createElement(d.Z,{language:"js"},t)),o.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:S}},o.createElement(d.Z,{language:"ts"},r)),o.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:S}},o.createElement(d.Z,{language:"jsx"},s)),o.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:S}},o.createElement(d.Z,{language:"html"},f)),o.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:S}},o.createElement(d.Z,{language:"html"},g))))))}const h="container_Egsj";function g(e){const{className:t,style:a,showCode:n,height:l,...d}=e,c=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${c(d)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${c(d)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${c(d)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),g=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${c(d)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${c(d)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return o.createElement(o.Fragment,null,o.createElement(s,(0,r.Z)({className:`${h} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(166, 40%, 50%",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&o.createElement(f,{js:p,ts:u,react:m,vue:g,svelte:v}))}},4887:(e,t,a)=>{a.d(t,{Z:()=>l});var r=a(7294),o=a(1262),n=a(814),s=a(9493),i=a(1446);function l(e){const{params:t,config:a,code:l,language:d="js",codeTitle:c="",showLineNumbers:p=!1,formatCode:u=!0,linkText:m="Run in LiveCodes",style:f={},className:h=""}=e,g=(0,s.r)({appUrl:i.G,params:t,config:a});return r.createElement("div",{style:{marginBottom:"30px",...f},className:h},l&&r.createElement(o.Z,null,(()=>{return r.createElement(n.Z,{language:d,title:c,showLineNumbers:p},u?(e=l,void 0===(t=d)&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})):l);var e,t})),r.createElement("a",{href:g,target:"_blank",rel:"noreferrer"},m,r.createElement("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"}},r.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))))}},9493:(e,t,a)=>{a.d(t,{T:()=>o,r:()=>n});var r=a(7728);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:a="https://livecodes.io/",params:r={},config:o={},import:n,lite:s,loading:i="lazy",template:l,view:d="split"}=t,c="headless"===d;let p,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!c||"object"!=typeof e)throw new Error("A valid container element is required.");if(!u){if(!c)throw new Error(`Cannot find element: "${e}"`);u=document.createElement("div"),S(u),document.body.appendChild(u)}try{p=new URL(a)}catch{throw new Error(`"${a}" is not a valid URL.`)}const m=p.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{p.searchParams.set(e,String(r[e]))})),"string"==typeof o)try{new URL(o),p.searchParams.set("config",o)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof o)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(o).length>0&&p.searchParams.set("config","sdk")}l&&p.searchParams.set("template",l),n&&p.searchParams.set("x",n),s&&p.searchParams.set("lite","true"),p.searchParams.set("embed","true"),p.searchParams.set("loading",c?"eager":i),p.searchParams.set("view",d);let f=!1;const h="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t&&!c){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"===u.dataset.defaultStyles||c||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="8px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");const a=document.createElement("iframe");a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const r="eager"===i?"eager":"lazy";a.setAttribute("loading",r),a.classList.add("livecodes"),c?S(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=u.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:o},m))})),a.onload=()=>{e(a)},a.src=p.href,u.appendChild(a)})),v=new Promise((e=>{addEventListener("message",(function t(a){a.source===g.contentWindow&&a.origin===m&&"livecodes-ready"===a.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),b=()=>f?Promise.reject(h):new Promise((async e=>{v.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},m),await v,e()})),y=(e,t)=>new Promise((async(a,r)=>{if(f)return r(h);await b();const o=j();addEventListener("message",(function t(n){if(n.source===g.contentWindow&&n.origin===m&&"livecodes-api-response"===n.data?.type&&n.data?.id===o&&n.data.method===e){removeEventListener("message",t);const e=n.data.payload;e?.error?r(e.error):a(e)}})),g.contentWindow?.postMessage({method:e,id:o,args:t},m)})),k={},w=["load","ready","code","console","tests","destroy"],N=(e,t)=>{if(f)throw new Error(h);return w.includes(e)?(y("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter((e=>e!==t)),0===k[e]?.length&&y("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==g.contentWindow||e.origin!==m||!t||!k[t])return;const a=e.data?.payload;k[t]?.forEach((e=>{e(a)}))}));const E=()=>{Object.values(k).forEach((e=>{e.length=0})),g?.remove?.(),f=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}function S(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const j=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>N("code",e),watch:N,exec:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];return y("exec",[e,...a])},destroy:()=>v.settled?y("destroy").then(E):f?Promise.reject(h):(E(),Promise.resolve())}}function n(e){void 0===e&&(e={});const{appUrl:t,params:a,config:o,import:n,...s}=e,i="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,r.compressToEncodedURIComponent)(JSON.stringify(o))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...a,x:n,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const a=e.dataset.options;if(a)try{t=JSON.parse(a)}catch{}let r;const n=e.dataset.config||e.dataset.prefill;if(n)try{r=JSON.parse(n)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+s,...t,...r?{config:r}:{}})}))}))},9562:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>d,toc:()=>p});var r=a(7462),o=(a(7294),a(3905)),n=a(325),s=a(4887);const i={},l="Embedded Playgrounds",d={unversionedId:"features/embeds",id:"features/embeds",title:"Embedded Playgrounds",description:"Overview",source:"@site/docs/features/embeds.md",sourceDirName:"features",slug:"/features/embeds",permalink:"/livecodes/docs/features/embeds",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/embeds.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Mobile Support",permalink:"/livecodes/docs/features/mobile"},next:{title:"Lite Mode",permalink:"/livecodes/docs/features/lite"}},c={},p=[{value:"Overview",id:"overview",level:2},{value:"Create Embedded Playground",id:"create-embedded-playground",level:2},{value:"App Embed Screen",id:"app-embed-screen",level:3},{value:"SDK",id:"sdk",level:3},{value:"Avoid Breaking Changes",id:"avoid-breaking-changes",level:2},{value:"Differences from Full App",id:"differences-from-full-app",level:2},{value:"Features Not Available",id:"features-not-available",level:3},{value:"Features Not Shown by Default",id:"features-not-shown-by-default",level:3},{value:"Security",id:"security",level:2},{value:"Related",id:"related",level:2}],u={toc:p};function m(e){let{components:t,...i}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"embedded-playgrounds"},"Embedded Playgrounds"),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"LiveCodes playgrounds can be embedded in any web page. The playground can be ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/code-prefill"},"prefilled with code")," in any supported language. This can be very useful in documentation websites, technical blogs, educational websites and others."),(0,o.kt)("p",null,"Demo:"),(0,o.kt)(n.Z,{template:"javascript",mdxType:"LiveCodes"}),(0,o.kt)("p",null,"The embedding web page can communicate with the playground using a powerful ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," (e.g. edit/format code, watch for code changes, get the compiled code or result page HTML, run tests, change layout, ...etc)."),(0,o.kt)("h2",{id:"create-embedded-playground"},"Create Embedded Playground"),(0,o.kt)("h3",{id:"app-embed-screen"},"App Embed Screen"),(0,o.kt)("p",null,"In the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/getting-started#standalone-app"},"standalone app"),", the Embed Screen can be accessed from Project menu \u2192 Embed."),(0,o.kt)(s.Z,{params:{screen:"embed"},linkText:"direct link",mdxType:"RunInLiveCodes"}),(0,o.kt)("p",null,"It shows a preview of the embedded playground, allows customizations of ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options")," and provides generated code that can be added to the web page that will embed the playground."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"LiveCodes embed",src:a(4019).Z,width:"2240",height:"1400"}),"\n",(0,o.kt)("img",{alt:"LiveCodes embed",src:a(157).Z,width:"2240",height:"1400"}),"\n",(0,o.kt)("img",{alt:"LiveCodes embed",src:a(9615).Z,width:"2240",height:"1400"})),(0,o.kt)("admonition",{title:"Note",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Please note that the Embed Screen sends the project code to ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/share"},"LiveCodes share service")," to generate a short URL for usage in the embed code.")),(0,o.kt)("p",null,'The setting "Embed Type" allows selection from different variations of the generated code:'),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Using the SDK from CDN."),(0,o.kt)("li",{parentName:"ul"},"Using the SDK with a bundler (e.g. vite, parcel, webpack, etc)."),(0,o.kt)("li",{parentName:"ul"},"Using the React SDK."),(0,o.kt)("li",{parentName:"ul"},"Using the Vue SDK."),(0,o.kt)("li",{parentName:"ul"},"Using iframe and ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/query-params"},"query params"),"."),(0,o.kt)("li",{parentName:"ul"},"Using HTML code that the SDK can use to ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/code-prefill#auto-prefill-from-page-dom"},"auto-prefill")," the playground.")),(0,o.kt)("h3",{id:"sdk"},"SDK"),(0,o.kt)("p",null,"The LiveCodes ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," can be used to embed playgrounds, specify ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed")," and ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/"},"configuration")," options and allows communication with the embedded playground with many ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#sdk-methods"},"SDK methods"),"."),(0,o.kt)("p",null,"This method provides more control and allows advanced scenarios."),(0,o.kt)("h2",{id:"avoid-breaking-changes"},"Avoid Breaking Changes"),(0,o.kt)("p",null,"To avoid breaking changes that would cause the embedded playgrounds to stop working as expected with later updates, follow these recommendations:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Use a ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/permanent-url"},"permanent URL")," to a pinned version of the LiveCodes app for ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/js-ts#appurl"},(0,o.kt)("inlineCode",{parentName:"a"},"EmbedOptions.appUrl")),". The code generated in the Embed screen uses that by default."),(0,o.kt)("li",{parentName:"ul"},"Specify the version of the SDK used. The code generated in the Embed screen also does that."),(0,o.kt)("li",{parentName:"ul"},"For project code, ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/module-resolution#package-version"},"specify the versions")," of the imported packages and ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/external-resources"},"external resources"),". ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/module-resolution#custom-module-resolution"},"Custom import maps")," can be set to control the module import behavior.")),(0,o.kt)("p",null,"Check the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/permanent-url"},"Permanent URL")," section for more details."),(0,o.kt)("h2",{id:"differences-from-full-app"},"Differences from Full App"),(0,o.kt)("p",null,"Some of the features of the full standalone app are not available or shown by default in embedded playgrounds, either because of security reasons, being not useful when embedded or because of space limitations."),(0,o.kt)("h3",{id:"features-not-available"},"Features Not Available"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"All features that require saving/loading from browser storage:",(0,o.kt)("br",{parentName:"li"}),"e.g. ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/projects"},"projects"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/assets"},"assets"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/snippets"},"code snippets"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/user-settings"},"user settings"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/default-template-language"},"default template/language"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/recover"},"recover unsaved"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/backup-restore"},"backup/restore"),"."),(0,o.kt)("li",{parentName:"ul"},"All features that require authentication:",(0,o.kt)("br",{parentName:"li"}),"e.g. ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/github-integration"},"login/logout"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/sync"},"sync"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/deploy"},"deploy"),", ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/import"},"importing")," from private github repos."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/broadcast"},"Broadcast"),"."),(0,o.kt)("li",{parentName:"ul"},"App menus."),(0,o.kt)("li",{parentName:"ul"},"Some tools in ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/tools-pane"},"tools pane"),":",(0,o.kt)("br",{parentName:"li"}),"e.g. open result page in new window, broadcast status."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/welcome"},"Welcome screen"),".")),(0,o.kt)("h3",{id:"features-not-shown-by-default"},"Features Not Shown by Default"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/external-resources"},"External resources")," button (below the editor) and external resources screen are only shown if the loaded project has external resources (e.g. via ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#stylesheets"},(0,o.kt)("inlineCode",{parentName:"a"},"EmbedOptions.config.stylesheets"))," and ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#scripts"},(0,o.kt)("inlineCode",{parentName:"a"},"EmbedOptions.config.scripts")),")."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/tests"},"Tests")," are not shown in ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/tools-pane"},"tools pane")," unless the loaded project has tests (e.g. via ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#tests"},(0,o.kt)("inlineCode",{parentName:"a"},"EmbedOptions.config.tests")),"). Test editor is not available."),(0,o.kt)("li",{parentName:"ul"},"Loading ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/templates"},"starter templates")," can be achieved by the ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/"},"SDK")," (",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/js-ts#template"},(0,o.kt)("inlineCode",{parentName:"a"},"EmbedOptions.template")),"), not from the UI."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/import"},"Importing")," from external sources can be achieved by the ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/"},"SDK")," (",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/js-ts#import"},(0,o.kt)("inlineCode",{parentName:"a"},"EmbedOptions.import")),"), not from the UI."),(0,o.kt)("li",{parentName:"ul"},"Getting a ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/share"},"share")," URL can be achieved by the ",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/"},"SDK")," (",(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/js-ts#getshareurl"},(0,o.kt)("inlineCode",{parentName:"a"},"getShareUrl"))," method), not from the UI.")),(0,o.kt)("h2",{id:"security"},"Security"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"All user code, ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," and compilers run in ",(0,o.kt)("a",{parentName:"p",href:"https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/"},"sandboxed iframes")," with a unique origin.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Embedded playgrounds do not have access to the parent page, or to sensitive data like user cookies and localstorage of the embedding page origin. Communications with the SDK occur by means of ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage"},(0,o.kt)("inlineCode",{parentName:"a"},"postMessage"))," calls."))),(0,o.kt)("h2",{id:"related"},"Related"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/"},"SDK")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/code-prefill"},"Code prefill")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/"},"Configuration")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/js-ts#embed-options"},"Embed options")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/js-ts#sdk-methods"},"SDK methods")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/permanent-url"},"Permanent URL")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/lite"},"Lite mode")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/read-only"},"Read-only"))))}m.isMDXComponent=!0},4019:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/embed-1-408ede1485d4bc08a9d49ae7c79dd077.jpg"},157:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/embed-2-1a99c4db9d201fd7d7a928cccc31b1b6.jpg"},9615:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/embed-3-c90eef02803a8609e7c39ccb48bbe5a6.jpg"}}]);