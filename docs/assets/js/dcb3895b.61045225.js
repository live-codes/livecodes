"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1874],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=o.createContext({}),c=function(e){var t=o.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return o.createElement(i.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||a;return n?o.createElement(f,s(s({ref:t},u),{},{components:n})):o.createElement(f,s({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[d]="string"==typeof e?e:r,s[1]=l;for(var c=2;c<a;c++)s[c]=n[c];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>s});var o=n(7294),r=n(6010);const a="tabItem_Ymn6";function s(e){let{children:t,hidden:n,className:s}=e;return o.createElement("div",{role:"tabpanel",className:(0,r.Z)(a,s),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>k});var o=n(7462),r=n(7294),a=n(6010),s=n(2466),l=n(6550),i=n(1980),c=n(7392),u=n(12);function d(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:o,default:r}}=e;return{value:t,label:n,attributes:o,default:r}}))}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??d(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const o=(0,l.k6)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(a),(0,r.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(o.location.search);t.set(a,e),o.replace({...o.location,search:t.toString()})}),[a,o])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:o}=e,a=p(e),[s,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const o=n.find((e=>e.default))??n[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:t,tabValues:a}))),[i,c]=f({queryString:n,groupId:o}),[d,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[o,a]=(0,u.Nk)(n);return[o,(0,r.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:o}),g=(()=>{const e=i??d;return m({value:e,tabValues:a})?e:null})();(0,r.useLayoutEffect)((()=>{g&&l(g)}),[g]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),h(e)}),[c,h,a]),tabValues:a}}var g=n(2389);const y="tabList__CuJ",v="tabItem_LNqP";function b(e){let{className:t,block:n,selectedValue:l,selectValue:i,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:d}=(0,s.o5)(),p=e=>{const t=e.currentTarget,n=u.indexOf(t),o=c[n].value;o!==l&&(d(t),i(o))},m=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},t)},c.map((e=>{let{value:t,label:n,attributes:s}=e;return r.createElement("li",(0,o.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>u.push(e),onKeyDown:m,onClick:p},s,{className:(0,a.Z)("tabs__item",v,s?.className,{"tabs__item--active":l===t})}),n??t)})))}function w(e){let{lazy:t,children:n,selectedValue:o}=e;const a=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},a.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==o}))))}function E(e){const t=h(e);return r.createElement("div",{className:(0,a.Z)("tabs-container",y)},r.createElement(b,(0,o.Z)({},e,t)),r.createElement(w,(0,o.Z)({},e,t)))}function k(e){const t=(0,g.Z)();return r.createElement(E,(0,o.Z)({key:String(t)},e))}},7778:(e,t,n)=>{n.d(t,{Z:()=>g});var o=n(7462),r=n(7294);async function a(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:o={},config:r={},import:a,lite:s,loading:l="lazy",template:i,view:c="split"}=t,u="headless"===c;let d,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!u||"object"!=typeof e)throw new Error("A valid container element is required.");if(!p){if(!u)throw new Error(`Cannot find element: "${e}"`);p=document.createElement("div"),x(p),document.body.appendChild(p)}try{d=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const m=d.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{d.searchParams.set(e,String(o[e]))})),"string"==typeof r)try{new URL(r),d.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&d.searchParams.set("config","sdk")}i&&d.searchParams.set("template",i),a&&d.searchParams.set("x",a),s&&d.searchParams.set("lite","true"),d.searchParams.set("embed","true"),d.searchParams.set("loading",u?"eager":l),d.searchParams.set("view",c);let f=!1;const h="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!p)return;const t=p.dataset.height||p.style.height;if(t&&!u){const e=isNaN(Number(t))?t:t+"px";p.style.height=e}"false"===p.dataset.defaultStyles||u||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="5px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const o="eager"===l?"eager":"lazy";n.setAttribute("loading",o),n.classList.add("livecodes"),u?x(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=p.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:r},m))})),n.onload=()=>{e(n)},n.src=d.href,p.appendChild(n)})),y=new Promise((e=>{addEventListener("message",(function t(n){n.source===g.contentWindow&&n.origin===m&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),y.settled=!0)}))})),v=()=>f?Promise.reject(h):new Promise((async e=>{y.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},m),await y,e()})),b=(e,t)=>new Promise((async(n,o)=>{if(f)return o(h);await v();const r=S();addEventListener("message",(function t(a){if(a.source===g.contentWindow&&a.origin===m&&"livecodes-api-response"===a.data?.type&&a.data?.id===r&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?o(e.error):n(e)}})),g.contentWindow?.postMessage({method:e,id:r,args:t},m)})),w={},E=["load","ready","code","console","tests","destroy"],k=(e,t)=>{if(f)throw new Error(h);return E.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==g.contentWindow||e.origin!==m||!t||!w[t])return;const n=e.data?.payload;w[t]?.forEach((e=>{e(n)}))}));const C=()=>{Object.values(w).forEach((e=>{e.length=0})),g?.remove?.(),f=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(p))}))}),{rootMargin:"150px"}).observe(p)}function x(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const S=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>k("code",e),watch:k,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return b("exec",[e,...n])},destroy:()=>y.settled?b("destroy").then(C):f?Promise.reject(h):(C(),Promise.resolve())}}function s(e){const{className:t,style:n,height:o,sdkReady:s,...l}=e,i=(0,r.useRef)(null);let c;return(0,r.useEffect)((()=>{if(i.current)return a(i.current,l).then((e=>{c=e,"function"==typeof s&&s(e)})),()=>{c?.destroy()}}),[]),r.createElement("div",{ref:i,className:t,style:n,"data-height":o})}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o;const r=e.dataset.config||e.dataset.prefill;if(r)try{o=JSON.parse(r)}catch{}a(e,{import:"dom/"+encodeURIComponent(e.outerHTML),...t,...o?{config:o}:{}})}))}));var l=n(1446),i=n(412),c=n(814),u=n(4866),d=n(5162),p=n(2134),m=n(420);function f(e){const[t,n]=(0,r.useState)(e.js),[o,a]=(0,r.useState)(e.ts),[s,l]=(0,r.useState)(e.react),[f,h]=(0,r.useState)(e.vue),[g,y]=(0,r.useState)(e.svelte),v="3.7rem",[b,w]=(0,r.useState)(!0),[E,k]=(0,r.useState)(v),C=(0,r.useRef)(null),x=()=>{setTimeout((()=>{k(`calc(${C.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{k(`calc(${C.current.offsetHeight}px + ${v})`)}),255)};return(0,r.useEffect)((()=>{if(i.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(o,"ts")),l(e(s,"jsx")),h(e(f,"html")),y(e(g,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:E,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{w(!b),x()}},"show code"),r.createElement("div",{ref:C,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:p.Z.collapsibleContent},r.createElement(u.Z,{groupId:"sdk-code"},r.createElement(d.Z,{value:"js",label:"JS",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"js"},t)),r.createElement(d.Z,{value:"ts",label:"TS",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"ts"},o)),r.createElement(d.Z,{value:"react",label:"React",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"jsx"},s)),r.createElement(d.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"html"},f)),r.createElement(d.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:x}},r.createElement(c.Z,{language:"html"},g))))))}const h="container_Egsj";function g(e){const{className:t,style:n,showCode:a,height:i,...c}=e,u=e=>JSON.stringify(e,null,2),d=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${u(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),g=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${u(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(s,(0,o.Z)({className:`${h} ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:l.G},e)),!1!==e.showCode&&r.createElement(f,{js:d,ts:p,react:m,vue:g,svelte:y}))}},2039:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>u});var o=n(7462),r=(n(7294),n(3905)),a=n(7778);const s={},l="Console",i={unversionedId:"features/console",id:"features/console",title:"Console",description:"Console messages are shown in the integrated console (in the tools pane, below the result page), without having to open the native browser console.",source:"@site/docs/features/console.md",sourceDirName:"features",slug:"/features/console",permalink:"/livecodes/docs/features/console",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/console.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Tools Pane",permalink:"/livecodes/docs/features/tools-pane"},next:{title:"Compiled Code",permalink:"/livecodes/docs/features/compiled-code"}},c={},u=[],d={toc:u};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"console"},"Console"),(0,r.kt)("p",null,"Console messages are shown in the integrated console (in the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tools-pane"},"tools pane"),", below the result page), without having to open the native browser console."),(0,r.kt)("p",null,"Messages can be sent to the console using the standard ",(0,r.kt)("inlineCode",{parentName:"p"},"console")," methods in the code editor (e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"console.log"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"console.warn"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"console.error"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"console.table"),", ...etc). The console can also be used as REPL (read\u2013eval\u2013print loop) using the integrated console input."),(0,r.kt)("p",null,"The code is evaluated in the context of the result page (i.e. variables defined in the script editor are accessible for evaluation in the console input). Also code completion works in the console input."),(0,r.kt)("p",null,"e.g. ",(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?ts&console=full"},"https://livecodes.io/?ts&console=full")," ",(0,r.kt)("br",null),"\nsets TypeScript as the active editor and shows the console maximized."),(0,r.kt)("p",null,"Demo: (console=full)"),(0,r.kt)(a.Z,{params:{console:"full",js:"const x = 5;\nconsole.log('x:', x);\nconsole.log({x, y: 6});\nconsole.table({x, y: 6});\nconsole.warn('take care!');\nconst z = x * y;"},mdxType:"LiveCodes"}),(0,r.kt)("p",null,"\xa0"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Setting the querystring ",(0,r.kt)("inlineCode",{parentName:"p"},"languages")," only shows these languages.\nSelecting one language and setting console to ",(0,r.kt)("inlineCode",{parentName:"p"},"full")," gives an environment similar to a REPL.")),(0,r.kt)("p",null,"Demo: (Python - print to console)"),(0,r.kt)(a.Z,{params:{languages:"py",console:"full",py:"print('hello from python')"},mdxType:"LiveCodes"}))}p.isMDXComponent=!0},420:(e,t,n)=>{n.d(t,{Z:()=>o});const o={details:"details_sGeq"}},2134:(e,t,n)=>{n.d(t,{Z:()=>o});const o={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}}}]);