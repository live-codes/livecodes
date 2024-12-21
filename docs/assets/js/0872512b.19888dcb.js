"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3084],{3905:(e,t,o)=>{o.d(t,{Zo:()=>c,kt:()=>f});var n=o(7294);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,n,a=function(e,t){if(null==e)return{};var o,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||(a[o]=e[o]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}var l=n.createContext({}),d=function(e){var t=n.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},c=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var o=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=d(o),m=a,f=p["".concat(l,".").concat(m)]||p[m]||u[m]||r;return o?n.createElement(f,s(s({ref:t},c),{},{components:o})):n.createElement(f,s({ref:t},c))}));function f(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=o.length,s=new Array(r);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var d=2;d<r;d++)s[d]=o[d];return n.createElement.apply(null,s)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},325:(e,t,o)=>{o.d(t,{Z:()=>g});var n=o(7462),a=o(7294),r=o(9493);function s(e){const t=(0,a.useRef)(null),[o,n]=(0,a.useState)(e.className||""),[s,i]=(0,a.useState)(e.style||{}),[l,d]=(0,a.useState)(e.height),[c,p]=(0,a.useState)(),[u,m]=(0,a.useState)(JSON.stringify(e.config||"")),[f,h]=(0,a.useState)("");return(0,a.useEffect)((()=>{if(!t.current)return;const{className:o,style:a,height:s,sdkReady:l,config:g,...y}=e;if(n(o||""),i(a||{}),d(s),c&&f===JSON.stringify(y)){if(u===JSON.stringify(g))return;m(JSON.stringify(g)),"string"==typeof g?fetch(g).then((e=>e.json())).then((e=>{c?.setConfig(e)})):g&&c.setConfig(g)}else h(JSON.stringify(y)),c?.destroy(),(0,r.T)(t.current,{config:g,...y}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,a.useEffect)((()=>()=>{c?.destroy()}),[]),a.createElement("div",{ref:t,className:o,style:s,"data-height":l})}var i=o(1446),l=o(412),d=o(814),c=o(4866),p=o(5162),u=o(2134),m=o(420);function f(e){const[t,o]=(0,a.useState)(e.js),[n,r]=(0,a.useState)(e.ts),[s,i]=(0,a.useState)(e.react),[f,h]=(0,a.useState)(e.vue),[g,y]=(0,a.useState)(e.svelte),v="3.7rem",[b,w]=(0,a.useState)(!0),[k,C]=(0,a.useState)(v),N=(0,a.useRef)(null),E=()=>{setTimeout((()=>{C(`calc(${N.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{C(`calc(${N.current.offsetHeight}px + ${v})`)}),255)};return(0,a.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};o(e(t,"js")),r(e(n,"ts")),i(e(s,"jsx")),h(e(f,"html")),y(e(g,"html"))}}),[]),a.createElement("details",{className:`alert alert--info ${u.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},a.createElement("summary",{onClick:()=>{w(!b),E()}},"show code"),a.createElement("div",{ref:N,style:{display:"block",overflow:"hidden"}},a.createElement("div",{className:u.Z.collapsibleContent},a.createElement(c.Z,{groupId:"sdk-code"},a.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:E}},a.createElement(d.Z,{language:"js"},t)),a.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:E}},a.createElement(d.Z,{language:"ts"},n)),a.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:E}},a.createElement(d.Z,{language:"jsx"},s)),a.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:E}},a.createElement(d.Z,{language:"html"},f)),a.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:E}},a.createElement(d.Z,{language:"html"},g))))))}const h="container_Egsj";function g(e){const{className:t,style:o,showCode:r,height:l,...d}=e,c=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${c(d)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${c(d)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${c(d)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),g=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${c(d)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${c(d)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return a.createElement(a.Fragment,null,a.createElement(s,(0,n.Z)({className:`${h} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&a.createElement(f,{js:p,ts:u,react:m,vue:g,svelte:y}))}},9493:(e,t,o)=>{o.d(t,{T:()=>a,r:()=>r});var n=o(7728);async function a(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:o="https://livecodes.io/",params:n={},config:a={},import:r,lite:s,loading:i="lazy",template:l,view:d="split"}=t,c="headless"===d;let p,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!c||"object"!=typeof e)throw new Error("A valid container element is required.");if(!u){if(!c)throw new Error(`Cannot find element: "${e}"`);u=document.createElement("div"),E(u),document.body.appendChild(u)}try{p=new URL(o)}catch{throw new Error(`"${o}" is not a valid URL.`)}const m=p.origin;if("object"==typeof n&&Object.keys(n).forEach((e=>{p.searchParams.set(e,String(n[e]))})),"string"==typeof a)try{new URL(a),p.searchParams.set("config",a)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof a)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(a).length>0&&p.searchParams.set("config","sdk")}l&&p.searchParams.set("template",l),r&&p.searchParams.set("x",r),s&&p.searchParams.set("lite","true"),p.searchParams.set("embed","true"),p.searchParams.set("loading",c?"eager":i),p.searchParams.set("view",d);let f=!1;const h="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t&&!c){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"===u.dataset.defaultStyles||c||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="8px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");const o=document.createElement("iframe");o.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),o.setAttribute("allowtransparency","true"),o.setAttribute("allowpaymentrequest","true"),o.setAttribute("allowfullscreen","true"),o.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const n="eager"===i?"eager":"lazy";o.setAttribute("loading",n),o.classList.add("livecodes"),c?E(o):(o.style.height="100%",o.style.minHeight="200px",o.style.width="100%",o.style.margin="0",o.style.border="0",o.style.borderRadius=u.style.borderRadius),addEventListener("message",(function e(t){t.source===o.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),o.contentWindow?.postMessage({type:"livecodes-config",payload:a},m))})),o.onload=()=>{e(o)},o.src=p.href,u.appendChild(o)})),y=new Promise((e=>{addEventListener("message",(function t(o){o.source===g.contentWindow&&o.origin===m&&"livecodes-ready"===o.data?.type&&(removeEventListener("message",t),e(),y.settled=!0)}))})),v=()=>f?Promise.reject(h):new Promise((async e=>{y.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},m),await y,e()})),b=(e,t)=>new Promise((async(o,n)=>{if(f)return n(h);await v();const a=S();addEventListener("message",(function t(r){if(r.source===g.contentWindow&&r.origin===m&&"livecodes-api-response"===r.data?.type&&r.data?.id===a&&r.data.method===e){removeEventListener("message",t);const e=r.data.payload;e?.error?n(e.error):o(e)}})),g.contentWindow?.postMessage({method:e,id:a,args:t},m)})),w={},k=["load","ready","code","console","tests","destroy"],C=(e,t)=>{if(f)throw new Error(h);return k.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==g.contentWindow||e.origin!==m||!t||!w[t])return;const o=e.data?.payload;w[t]?.forEach((e=>{e(o)}))}));const N=()=>{Object.values(w).forEach((e=>{e.length=0})),g?.remove?.(),f=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const S=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>C("code",e),watch:C,exec:function(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),n=1;n<t;n++)o[n-1]=arguments[n];return b("exec",[e,...o])},destroy:()=>y.settled?b("destroy").then(N):f?Promise.reject(h):(N(),Promise.resolve())}}function r(e){void 0===e&&(e={});const{appUrl:t,params:o,config:a,import:r,...s}=e,i="string"==typeof a?{config:a}:"object"==typeof a?{x:"code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(a))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...o,x:r,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const o=e.dataset.options;if(o)try{t=JSON.parse(o)}catch{}let n;const r=e.dataset.config||e.dataset.prefill;if(r)try{n=JSON.parse(r)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",a(e,{import:"dom/"+s,...t,...n?{config:n}:{}})}))}))},9422:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>l,simpleConfig:()=>p,toc:()=>c});var n=o(7462),a=(o(7294),o(3905)),r=o(325);const s={},i="Display Modes",l={unversionedId:"features/display-modes",id:"features/display-modes",title:"Display Modes",description:"The configuration option mode, also available as query param, can be used to select different display modes.",source:"@site/docs/features/display-modes.md",sourceDirName:"features",slug:"/features/display-modes",permalink:"/livecodes/docs/features/display-modes",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/display-modes.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Code to Image",permalink:"/livecodes/docs/features/code-to-image"},next:{title:"Default View",permalink:"/livecodes/docs/features/default-view"}},d={},c=[{value:"<code>full</code>",id:"full",level:2},{value:"<code>focus</code>",id:"focus",level:2},{value:"<code>simple</code>",id:"simple",level:2},{value:"<code>editor</code>",id:"editor",level:2},{value:"<code>codeblock</code>",id:"codeblock",level:2},{value:"<code>result</code>",id:"result",level:2},{value:"Display Mode vs Default View",id:"display-mode-vs-default-view",level:2}],p={mode:"simple",layout:"vertical",activeEditor:"script",editor:"monaco",tools:{status:"none"},script:{language:"jsx",content:"import { atom, useAtom } from 'jotai';\n\nconst countAtom = atom(0);\n\nconst Counter = () => {\n  const [count, setCount] = useAtom(countAtom);\n  const inc = () => setCount((c) => c + 1);\n  return (\n    <>\n      {count} <button onClick={inc}>+1</button>\n    </>\n  );\n};\n\nconst App = () => (\n  <div className=\"App\">\n    <h1>Hello Jotai</h1>\n    <h2>Enjoy coding!</h2>\n    <Counter />\n  </div>\n);\n\nexport default App;\n"},style:{language:"css",content:".App {\n font-family: sans-serif;\n text-align: center;\n}\n".trimStart()}},u={toc:c,simpleConfig:p};function m(e){let{components:t,...s}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"display-modes"},"Display Modes"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration")," option ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#mode"},(0,a.kt)("inlineCode",{parentName:"a"},"mode")),", also available as ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query param"),", can be used to select different display modes.\nThe following display modes are supported:"),(0,a.kt)("h2",{id:"full"},(0,a.kt)("inlineCode",{parentName:"h2"},"full")),(0,a.kt)("p",null,"This is the default mode with toolbars, editor and result panes."),(0,a.kt)("p",null,"Example: ",(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=react"},"https://livecodes.io/?template=react")),(0,a.kt)("p",null,"Screenshot: (App in full mode)"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"full-mode",src:o(8516).Z,width:"2240",height:"1400"})),(0,a.kt)("p",null,"Demo: (Embedded playground in full mode)"),(0,a.kt)(r.Z,{template:"react",mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"focus"},(0,a.kt)("inlineCode",{parentName:"h2"},"focus")),(0,a.kt)("p",null,"This hides most of UI buttons and menus and keeps only the essential elements: editors, editor titles, result page, console, and run and share buttons. It can be toggled during runtime from the full mode through the UI from a button in the lower left corner. Also the query param ",(0,a.kt)("inlineCode",{parentName:"p"},"?mode=focus"),"."),(0,a.kt)("p",null,"Example: ",(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=react&mode=focus"},"https://livecodes.io/?template=react&mode=focus")),(0,a.kt)("p",null,"Screenshot: (focus mode)"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"focus-mode",src:o(7081).Z,width:"2240",height:"1400"})),(0,a.kt)("h2",{id:"simple"},(0,a.kt)("inlineCode",{parentName:"h2"},"simple")),(0,a.kt)("p",null,"This mode is mainly useful for embedded playgrounds.",(0,a.kt)("br",{parentName:"p"}),"\n","It shows only 1 editor with the output (result page +/- console). The content of other editors can be set using ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"config")," even though the editors are not shown.",(0,a.kt)("br",{parentName:"p"}),"\n","By default, ",(0,a.kt)("inlineCode",{parentName:"p"},"codemirror")," editor is used, however, this can be changed by the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editor"},(0,a.kt)("inlineCode",{parentName:"a"},"editor"))," option.",(0,a.kt)("br",{parentName:"p"}),"\n","By default, the layout is ",(0,a.kt)("inlineCode",{parentName:"p"},"responsive")," but can also be overridden by the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#layout"},(0,a.kt)("inlineCode",{parentName:"a"},"layout"))," option to ",(0,a.kt)("inlineCode",{parentName:"p"},"vertical")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"horizontal"),"."),(0,a.kt)("p",null,"Demo: JS with console"),(0,a.kt)(r.Z,{params:{mode:"simple",js:'console.log("hello world")',layout:"vertical",console:"full"},mdxType:"LiveCodes"}),(0,a.kt)("p",null,"Demo: JSX & Result page (Monaco editor, add CSS)"),(0,a.kt)(r.Z,{config:p,height:"400px",mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"editor"},(0,a.kt)("inlineCode",{parentName:"h2"},"editor")),(0,a.kt)("p",null,"Hides the results pane and works as editor only."),(0,a.kt)("p",null,"Example: ",(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?mode=editor&template=react"},"https://livecodes.io/?mode=editor&template=react")),(0,a.kt)("p",null,"Demo:"),(0,a.kt)(r.Z,{config:{mode:"editor"},template:"react",mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"codeblock"},(0,a.kt)("inlineCode",{parentName:"h2"},"codeblock")),(0,a.kt)("p",null,"A read-only mode showing only the code block without editor interface. On mouse-over a copy button appears that allows to copy the code. This is specially useful when embedded."),(0,a.kt)("p",null,"Example: ",(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?mode=codeblock&template=react"},"https://livecodes.io/?mode=codeblock&template=react")),(0,a.kt)("p",null,"Demo:"),(0,a.kt)(r.Z,{config:{mode:"codeblock"},template:"react",mdxType:"LiveCodes"}),(0,a.kt)("p",null,"By default, in ",(0,a.kt)("inlineCode",{parentName:"p"},"codeblock")," mode, the light-weight ",(0,a.kt)("inlineCode",{parentName:"p"},"CodeJar")," editor is used (in read-only mode). You can override this by setting the ",(0,a.kt)("inlineCode",{parentName:"p"},"editor")," option. Refer to ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/editor-settings#code-editor"},"Editor Settings")," for details."),(0,a.kt)("p",null,"Example: ",(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?mode=codeblock&editor=monaco&template=react"},"https://livecodes.io/?mode=codeblock&editor=monaco&template=react")),(0,a.kt)("p",null,"Demo:"),(0,a.kt)(r.Z,{config:{mode:"codeblock",editor:"monaco"},template:"react",mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"result"},(0,a.kt)("inlineCode",{parentName:"h2"},"result")),(0,a.kt)("p",null,"Shows the result page only, with a drawer at the bottom (which can be closed) that allows opening the project in the full playground."),(0,a.kt)("p",null,"Example: ",(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?mode=result&template=react"},"https://livecodes.io/?mode=result&template=react")),(0,a.kt)("p",null,"Demo:"),(0,a.kt)(r.Z,{params:{mode:"result",template:"react"},mdxType:"LiveCodes"}),(0,a.kt)("p",null,"The tools pane (e.g. console/compiled code viewer) is hidden by default in ",(0,a.kt)("inlineCode",{parentName:"p"},"result")," mode. It can be shown if set to ",(0,a.kt)("inlineCode",{parentName:"p"},"open")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"full"),". Refer to ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tools-pane"},"Tools pane")," documentation for details."),(0,a.kt)("p",null,"Example: ",(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?mode=result&tools=console%7Cfull&&js=console.log(%22Hello%20World!%22)"},'https://livecodes.io/?mode=result&tools=console|full&&js=console.log("Hello%20World!")')),(0,a.kt)("p",null,"Demo:"),(0,a.kt)(r.Z,{params:{mode:"result",tools:"console|full",js:'console.log("Hello World!")'},mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"display-mode-vs-default-view"},"Display Mode vs Default View"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},'"Display Mode" is different from "',(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/default-view"},"Default View"),'".'),(0,a.kt)("p",{parentName:"admonition"},"In ",(0,a.kt)("inlineCode",{parentName:"p"},"editor")," display mode, only the editor is loaded and the result page is not available. While ",(0,a.kt)("inlineCode",{parentName:"p"},"editor")," default view shows the editor by default, and the result page can be shown by dragging the split gutter."),(0,a.kt)("p",{parentName:"admonition"},"The same applies for ",(0,a.kt)("inlineCode",{parentName:"p"},"result")," display mode and default view.")))}m.isMDXComponent=!0},7081:(e,t,o)=>{o.d(t,{Z:()=>n});const n=o.p+"assets/images/mode-focus-cfaa1455bdd069375859aa7cefbbc82d.jpg"},8516:(e,t,o)=>{o.d(t,{Z:()=>n});const n=o.p+"assets/images/mode-full-25f311a4ee364ffd5331c99c03160894.jpg"}}]);