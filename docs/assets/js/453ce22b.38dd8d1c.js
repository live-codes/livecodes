"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6853],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,g=p["".concat(l,".").concat(m)]||p[m]||u[m]||s;return n?o.createElement(g,a(a({ref:t},d),{},{components:n})):o.createElement(g,a({ref:t},d))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,a=new Array(s);a[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:r,a[1]=i;for(var c=2;c<s;c++)a[c]=n[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>f});var o=n(7462),r=n(7294),s=n(9493);function a(e){const t=(0,r.useRef)(null),[n,o]=(0,r.useState)(e.className||""),[a,i]=(0,r.useState)(e.style||{}),[l,c]=(0,r.useState)(e.height),[d,p]=(0,r.useState)(),[u,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,h]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(!t.current)return;const{className:n,style:r,height:a,sdkReady:l,config:f,...y}=e;if(o(n||""),i(r||{}),c(a),d&&g===JSON.stringify(y)){if(u===JSON.stringify(f))return;m(JSON.stringify(f)),"string"==typeof f?fetch(f).then((e=>e.json())).then((e=>{d?.setConfig(e)})):f&&d.setConfig(f)}else h(JSON.stringify(y)),d?.destroy(),(0,s.T)(t.current,{config:f,...y}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,r.useEffect)((()=>()=>{d?.destroy()}),[]),r.createElement("div",{ref:t,className:n,style:a,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),p=n(5162),u=n(2134),m=n(420);function g(e){const[t,n]=(0,r.useState)(e.js),[o,s]=(0,r.useState)(e.ts),[a,i]=(0,r.useState)(e.react),[g,h]=(0,r.useState)(e.vue),[f,y]=(0,r.useState)(e.svelte),v="3.7rem",[b,w]=(0,r.useState)(!0),[k,S]=(0,r.useState)(v),C=(0,r.useRef)(null),N=()=>{setTimeout((()=>{S(`calc(${C.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{S(`calc(${C.current.offsetHeight}px + ${v})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),s(e(o,"ts")),i(e(a,"jsx")),h(e(g,"html")),y(e(f,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{w(!b),N()}},"show code"),r.createElement("div",{ref:C,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:u.Z.collapsibleContent},r.createElement(d.Z,{groupId:"sdk-code"},r.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"js"},t)),r.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"ts"},o)),r.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"jsx"},a)),r.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"html"},g)),r.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:N}},r.createElement(c.Z,{language:"html"},f))))))}const h="container_Egsj";function f(e){const{className:t,style:n,showCode:s,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),f=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(a,(0,o.Z)({className:`${h} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&r.createElement(g,{js:p,ts:u,react:m,vue:f,svelte:y}))}},9493:(e,t,n)=>{n.d(t,{T:()=>r,r:()=>s});var o=n(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:o={},config:r={},import:s,headless:a,lite:i,loading:l="lazy",template:c,view:d}=t,p=a||"headless"===d;let u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!p)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),j(m),document.body.appendChild(m)}try{u=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const g=u.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{u.searchParams.set(e,String(o[e]))})),c&&u.searchParams.set("template",c),s&&u.searchParams.set("x",s),p&&u.searchParams.set("headless","true"),i&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":u.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==d?r.view=d:u.searchParams.set("view",d)),"string"==typeof r)try{new URL(r),u.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&u.searchParams.set("config","sdk")}u.searchParams.set("embed","true"),u.searchParams.set("loading",p?"eager":l);let h=!1;const f="Cannot call API methods after calling `destroy()`.",y=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||p||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const n="livecodes",o=m.querySelector(`iframe.${n}`),s=o||document.createElement("iframe");s.classList.add(n),s.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),s.setAttribute("allowtransparency","true"),s.setAttribute("allowpaymentrequest","true"),s.setAttribute("allowfullscreen","true"),s.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const a="eager"===l?"eager":"lazy";s.setAttribute("loading",a),p?j(s):(s.style.height="100%",s.style.minHeight="200px",s.style.width="100%",s.style.margin="0",s.style.border="0",s.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===s.contentWindow&&t.origin===g&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),s.contentWindow?.postMessage({type:"livecodes-config",payload:r},g))})),s.onload=()=>{e(s)},s.src=u.href,o||m.appendChild(s)})),v=new Promise((e=>{addEventListener("message",(function t(n){n.source===y.contentWindow&&n.origin===g&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),b=()=>h?Promise.reject(f):new Promise((async e=>{v.settled&&e();y.contentWindow?.postMessage({type:"livecodes-load"},g),await v,e()})),w=(e,t)=>new Promise((async(n,o)=>{if(h)return o(f);await b();const r=Z();addEventListener("message",(function t(s){if(s.source===y.contentWindow&&s.origin===g&&"livecodes-api-response"===s.data?.type&&s.data?.id===r&&s.data.method===e){removeEventListener("message",t);const e=s.data.payload;e?.error?o(e.error):n(e)}})),y.contentWindow?.postMessage({method:e,id:r,args:t},g)})),k={},S=["load","ready","code","console","tests","destroy"],C=(e,t)=>{if(h)throw new Error(f);return S.includes(e)?(w("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter((e=>e!==t)),0===k[e]?.length&&w("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==y.contentWindow||e.origin!==g||!t||!k[t])return;const n=e.data?.payload;k[t]?.forEach((e=>{e(n)}))}));const N=()=>{Object.values(k).forEach((e=>{e.length=0})),y?.remove?.(),h=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function j(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const Z=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>w("run"),format:e=>w("format",[e]),getShareUrl:e=>w("getShareUrl",[e]),getConfig:e=>w("getConfig",[e]),setConfig:e=>w("setConfig",[e]),getCode:()=>w("getCode"),show:(e,t)=>w("show",[e,t]),runTests:()=>w("runTests"),onChange:e=>C("code",e),watch:C,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return w("exec",[e,...n])},destroy:()=>v.settled?w("destroy").then(N):h?Promise.reject(f):(N(),Promise.resolve())}}function s(e){void 0===e&&(e={});const{appUrl:t,params:n,config:r,import:s,...a}=e,i="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...a,...n,x:s,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o;const s=e.dataset.config||e.dataset.prefill;if(s)try{o=JSON.parse(s)}catch{}const a=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+a,...t,...o?{config:o}:{}})}))}))},4980:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,customModules:()=>p,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var o=n(7462),r=(n(7294),n(3905)),s=n(325);const a={},i="IntelliSense",l={unversionedId:"features/intellisense",id:"features/intellisense",title:"IntelliSense",description:"The code editor provides a rich experience with intellisense and autocompletion. Many of the features required for this are based on TypeScript types that are either inferred by the editor or supplied as data definition files.",source:"@site/docs/features/intellisense.md",sourceDirName:"features",slug:"/features/intellisense",permalink:"/livecodes/docs/features/intellisense",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/intellisense.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Module Resolution",permalink:"/livecodes/docs/features/module-resolution"},next:{title:"AI Code Assistant \ud83e\ude84",permalink:"/livecodes/docs/features/ai"}},c={},d=[{value:"Types for imported npm packages",id:"types-for-imported-npm-packages",level:2},{value:"TypeScript TwoSlash",id:"typescript-twoslash",level:2},{value:"Custom Types",id:"custom-types",level:2},{value:"Demo",id:"demo",level:2},{value:"Related",id:"related",level:2}],p={editor:"monaco",activeEditor:"script",script:{language:"typescript",content:"import { Greeter } from 'my-greeter';\n\nconst greeter = new Greeter();\n// now `greeter` has autocomplete\n\ndocument.body.innerText = greeter.morning();\n\n// this should show error in the editor\n// Property 'morningGreetings' is private and only accessible within class 'Greeter'\nconsole.log(greeter.morningGreetings);"},imports:{"my-greeter":"data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNsYXNzIEdyZWV0ZXIgew0KICAgIGNvbnN0cnVjdG9yKCkgew0KICAgICAgICB0aGlzLm1vcm5pbmdHcmVldGluZ3MgPSBbJ0dvb2QgbW9ybmluZycsICdIYXZlIGEgZ29vZCBkYXknLCAnSG93IGFyZSB5b3UgdG9kYXk/J107DQogICAgICAgIHRoaXMuZXZlbmluZ0dyZWV0aW5ncyA9IFsnR29vZCBldmVuaW5nJywgJ0dvb2QgbmlnaHQnLCAnU2xlZXAgd2VsbCddOw0KICAgIH0NCiAgICByYW5kb21TZWxlY3RvcihhcnJheSkgew0KICAgICAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKV07DQogICAgfQ0KICAgIG1vcm5pbmcoKSB7DQogICAgICAgIHJldHVybiB0aGlzLnJhbmRvbVNlbGVjdG9yKHRoaXMubW9ybmluZ0dyZWV0aW5ncyk7DQogICAgfQ0KICAgIGV2ZW5pbmcoKSB7DQogICAgICAgIHJldHVybiB0aGlzLnJhbmRvbVNlbGVjdG9yKHRoaXMuZXZlbmluZ0dyZWV0aW5ncyk7DQogICAgfQ0KfQ0K"},types:{"my-greeter":"data:text/typescript;charset=UTF-8;base64,ZXhwb3J0IGRlY2xhcmUgY2xhc3MgR3JlZXRlciB7DQogIHByaXZhdGUgbW9ybmluZ0dyZWV0aW5nczsNCiAgcHJpdmF0ZSBldmVuaW5nR3JlZXRpbmdzOw0KICBwcml2YXRlIHJhbmRvbVNlbGVjdG9yOw0KICBtb3JuaW5nKCk6IHN0cmluZzsNCiAgZXZlbmluZygpOiBzdHJpbmc7DQp9DQo="}},u={toc:d,customModules:p};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,o.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"intellisense"},"IntelliSense"),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/editor-settings#code-editor"},"code editor")," provides a rich experience with ",(0,r.kt)("a",{parentName:"p",href:"https://code.visualstudio.com/docs/editor/intellisense"},"intellisense")," and autocompletion. Many of the features required for this are based on TypeScript types that are either inferred by the editor or supplied as data definition files."),(0,r.kt)("p",null,"This not only works when the editor language is TypeScript, but also works with others like JavaScript and JSX."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"LiveCodes Autocomplete",src:n(3824).Z,width:"1127",height:"621"})),(0,r.kt)("h2",{id:"types-for-imported-npm-packages"},"Types for imported npm packages"),(0,r.kt)("p",null,"LiveCodes will try to automatically find type definitions for npm modules imported in the editor."),(0,r.kt)("p",null,"These are examples for automatically loading React types with autocomplete and hover info:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"LiveCodes Intellisense",src:n(3326).Z,width:"1128",height:"754"})),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"LiveCodes Intellisense",src:n(4315).Z,width:"1126",height:"713"})),(0,r.kt)("h2",{id:"typescript-twoslash"},"TypeScript TwoSlash"),(0,r.kt)("p",null,"The code editor supports ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ts-twoslasher"},"TypeScript TwoSlash"),". This can be very useful for debugging, sharing and teaching TypeScript."),(0,r.kt)("p",null,"This is supported in ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/javascript"},"JavaScript"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/typescript"},"TypeScript"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/jsx"},"JSX")," and ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/tsx"},"TSX"),". This also includes ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/babel"},"Babel"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/sucrase"},"Sucrase"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/solid"},"Solid"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/react-native"},"React Native"),", etc."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"TypeScript TwoSlash",src:n(5926).Z,width:"1150",height:"878"})," "),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"TwoSlash in JSX",src:n(2264).Z,width:"1147",height:"939"})," "),(0,r.kt)("h2",{id:"custom-types"},"Custom Types"),(0,r.kt)("p",null,"If no type definitions are found, or if you want to provide your own (e.g. for a module that is not hosted on npm), custom type definition files can be used."),(0,r.kt)("p",null,"In the standalone app, these can be provided in ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"custom settings")," using the ",(0,r.kt)("inlineCode",{parentName:"p"},"types")," property. This takes an object with the key representing the module name and the value representing the URL of the file."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "types": {\n    "my-module": "https://cdn.jsdelivr.net/npm/my-module@1.0.0/types/my-module.d.ts",\n    "my-other-module": "https://my-website.com/my-other-module/my-other-module.d.ts"\n  }\n}\n')),(0,r.kt)("p",null,"For embedded playgrounds, these can be provided in the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," using the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#types"},(0,r.kt)("inlineCode",{parentName:"a"},"types"))," property."),(0,r.kt)("p",null,"This can be combined with the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#imports"},(0,r.kt)("inlineCode",{parentName:"a"},"imports"))," property to provide ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#custom-module-resolution"},"importmap")," for runtime implementation of your custom modules."),(0,r.kt)("p",null,"This is an example of how to create a playground that provides the implementation of the custom module: ",(0,r.kt)("inlineCode",{parentName:"p"},"my-module")," and its type definition to provide editor intellisense:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { createPlayground } from 'livecodes';\n\nconst config = {\n  activeEditor: 'script',\n  script: {\n    language: 'javascript',\n    content: `import { foo } from 'my-module';\\n\\nconsole.log(foo());`\n  };\n  imports: {\n    'my-module': 'https://my-website.com/my-module/index.js',\n  },\n  types: {\n    'my-module': 'https://my-website.com/my-module/my-module.d.ts',\n  },\n};\n\ncreatePlayground('#container', {config});\n")),(0,r.kt)("p",null,"Please note that the URLs used for ",(0,r.kt)("inlineCode",{parentName:"p"},"types")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"imports")," properties may be full URLs or ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/data-urls"},"data URLs"),"."),(0,r.kt)("p",null,"This can be of great use for library authors who want to provide playgrounds for documenting their libraries that are not (yet) published to npm."),(0,r.kt)("h2",{id:"demo"},"Demo"),(0,r.kt)("p",null,"Let's assume we have this TypeScript module:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Greeter.ts"',title:'"Greeter.ts"'},"export class Greeter {\n  private morningGreetings = ['Good morning', 'Have a good day', 'How are you today?'];\n  private eveningGreetings = ['Good evening', 'Good night', 'Sleep well'];\n\n  private randomSelector(array: string[]) {\n    return array[Math.floor(Math.random() * array.length)];\n  }\n\n  public morning() {\n    return this.randomSelector(this.morningGreetings);\n  }\n\n  public evening() {\n    return this.randomSelector(this.eveningGreetings);\n  }\n}\n")),(0,r.kt)("p",null,"which compiles to this JavaScript:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="Greeter.js"',title:'"Greeter.js"'},"export class Greeter {\n  constructor() {\n    this.morningGreetings = ['Good morning', 'Have a good day', 'How are you today?'];\n    this.eveningGreetings = ['Good evening', 'Good night', 'Sleep well'];\n  }\n  randomSelector(array) {\n    return array[Math.floor(Math.random() * array.length)];\n  }\n  morning() {\n    return this.randomSelector(this.morningGreetings);\n  }\n  evening() {\n    return this.randomSelector(this.eveningGreetings);\n  }\n}\n")),(0,r.kt)("p",null,"and this type definition:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Greeter.d.ts"',title:'"Greeter.d.ts"'},"export declare class Greeter {\n  private morningGreetings;\n  private eveningGreetings;\n  private randomSelector;\n  morning(): string;\n  evening(): string;\n}\n")),(0,r.kt)("p",null,"The JavaScript output (Greeter.js) and the data definition file (Greeter.d.ts) should be hosted online or converted to data URLs (see ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/assets"},"assets")," and ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/data-urls"},"data URLs"),")."),(0,r.kt)("p",null,"Then, they can be used like that:"),(0,r.kt)(s.Z,{config:p,height:"80vh",mdxType:"LiveCodes"}),(0,r.kt)("h2",{id:"related"},"Related"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/module-resolution"},"Module Resolution")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/data-urls"},"Data Urls")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/assets"},"Assets")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/advanced/custom-settings"},"Custom Settings")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object"},"Configuration Object"))))}m.isMDXComponent=!0},3824:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/autocomplete-54ec86de500afd076e2948246f4bf434.jpg"},3326:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/intellisense-1-bbc692078d1b88aaf8d2be72beb49849.jpg"},4315:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/intellisense-2-ffdab70d10948aa165e3332a58d37827.jpg"},2264:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/twoslash-jsx-dce9c452f6f57be25c0145a3471c25d9.jpg"},5926:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/twoslash-129fce4a76fef85f9c655b3d0278c216.jpg"}}]);