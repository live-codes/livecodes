"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4432],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),c=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(r),m=a,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||o;return r?n.createElement(f,l(l({ref:t},u),{},{components:r})):n.createElement(f,l({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[d]="string"==typeof e?e:a,l[1]=s;for(var c=2;c<o;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5162:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(7294),a=r(6010);const o="tabItem_Ymn6";function l(e){let{children:t,hidden:r,className:l}=e;return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(o,l),hidden:r},t)}},4866:(e,t,r)=>{r.d(t,{Z:()=>E});var n=r(7462),a=r(7294),o=r(6010),l=r(2466),s=r(6550),i=r(1980),c=r(7392),u=r(12);function d(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}function p(e){const{values:t,children:r}=e;return(0,a.useMemo)((()=>{const e=t??d(r);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function m(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:r}=e;const n=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,i._X)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(n.location.search);t.set(o,e),n.replace({...n.location,search:t.toString()})}),[o,n])]}function g(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,o=p(e),[l,s]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:o}))),[i,c]=f({queryString:r,groupId:n}),[d,g]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,o]=(0,u.Nk)(r);return[n,(0,a.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:n}),h=(()=>{const e=i??d;return m({value:e,tabValues:o})?e:null})();(0,a.useLayoutEffect)((()=>{h&&s(h)}),[h]);return{selectedValue:l,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),c(e),g(e)}),[c,g,o]),tabValues:o}}var h=r(2389);const v="tabList__CuJ",y="tabItem_LNqP";function b(e){let{className:t,block:r,selectedValue:s,selectValue:i,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:d}=(0,l.o5)(),p=e=>{const t=e.currentTarget,r=u.indexOf(t),n=c[r].value;n!==s&&(d(t),i(n))},m=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const r=u.indexOf(e.currentTarget)+1;t=u[r]??u[0];break}case"ArrowLeft":{const r=u.indexOf(e.currentTarget)-1;t=u[r]??u[u.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":r},t)},c.map((e=>{let{value:t,label:r,attributes:l}=e;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>u.push(e),onKeyDown:m,onClick:p},l,{className:(0,o.Z)("tabs__item",y,l?.className,{"tabs__item--active":s===t})}),r??t)})))}function w(e){let{lazy:t,children:r,selectedValue:n}=e;const o=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===n));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function k(e){const t=g(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",v)},a.createElement(b,(0,n.Z)({},e,t)),a.createElement(w,(0,n.Z)({},e,t)))}function E(e){const t=(0,h.Z)();return a.createElement(k,(0,n.Z)({key:String(t)},e))}},7778:(e,t,r)=>{r.d(t,{Z:()=>h});var n=r(7462),a=r(7294);const o=async function(e,t){void 0===t&&(t={});const{appUrl:r="https://livecodes.io/",params:n={},config:a={},import:o,lite:l=!1,loading:s="lazy",template:i,view:c="split"}=t;let u,d;if(u="string"==typeof e?document.querySelector(e):e,!e)throw new Error("Container element is required.");if(!u)throw new Error(`Cannot find element: "${e}"`);try{d=new URL(r)}catch{throw new Error(`"${r}" is not a valid URL.`)}const p=d.origin;if("object"==typeof n&&Object.keys(n).forEach((e=>{d.searchParams.set(e,String(n[e]))})),"string"==typeof a)try{new URL(a),d.searchParams.set("config",a)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof a)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(a).length>0&&d.searchParams.set("config","sdk")}i&&d.searchParams.set("template",i),o&&d.searchParams.set("x",o),d.searchParams.set(l?"lite":"embed","true"),d.searchParams.set("loading",s),d.searchParams.set("view",c);let m=!1;const f="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"!==u.dataset.defaultStyles&&(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="5px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.overflow||="hidden",u.style.resize||="vertical");const r=document.createElement("iframe");r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const n="eager"===s?"eager":"lazy";r.setAttribute("loading",n),r.classList.add("livecodes"),r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=u.style.borderRadius,addEventListener("message",(function e(t){t.source===r.contentWindow&&t.origin===p&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:a},p))})),r.onload=()=>{e(r)},r.src=d.href,u.innerHTML="",u.appendChild(r)})),h=new Promise((e=>{addEventListener("message",(function t(r){r.source===g.contentWindow&&r.origin===p&&"livecodes-ready"===r.data?.type&&(removeEventListener("message",t),e(),h.settled=!0)}))})),v=()=>m?Promise.reject(f):new Promise((async e=>{h.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},p),await h,e()})),y=(e,t)=>new Promise((async(r,n)=>{if(m)return n(f);await v(),addEventListener("message",(function t(a){if(a.source===g.contentWindow&&a.origin===p&&"livecodes-api-response"===a.data?.type&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?n(e.error):r(e)}})),g.contentWindow?.postMessage({method:e,args:t},p)}));let b=[];addEventListener("message",(async e=>{if(e.source!==g.contentWindow||e.origin!==p||"livecodes-change"!==e.data?.type)return;const t=await y("getCode"),r=await y("getConfig");b.forEach((e=>{e({code:t,config:r})}))}));const w=()=>{b.length=0,u&&(u.innerHTML=""),m=!0};if("lazy"===s&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}return{load:()=>v(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>(e=>{if(m)throw new Error(f);return b.push(e),{remove:()=>{b=b.filter((t=>t!==e))}}})(e),exec:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return y("exec",[e,...r])},destroy:()=>h.settled?y("destroy").then(w):m?Promise.reject(f):(w(),Promise.resolve())}};function l(e){const{className:t,style:r,height:n,sdkReady:l,...s}=e,i=(0,a.useRef)(null);let c;return(0,a.useEffect)((()=>{if(i.current)return o(i.current,s).then((e=>{c=e,"function"==typeof l&&l(e)})),()=>{c?.destroy()}}),[]),a.createElement("div",{ref:i,className:t,style:r,"data-height":n})}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const r=e.dataset.options;if(r)try{t=JSON.parse(r)}catch{}let n;const a=e.dataset.config||e.dataset.prefill;if(a)try{n=JSON.parse(a)}catch{}o(e,{import:"dom/"+encodeURIComponent(e.outerHTML),...t,...n?{config:n}:{}})}))}));var s=r(1446),i=r(412),c=r(814),u=r(4866),d=r(5162),p=r(2134),m=r(420);function f(e){const[t,r]=(0,a.useState)(e.js),[n,o]=(0,a.useState)(e.ts),[l,s]=(0,a.useState)(e.react),[f,g]=(0,a.useState)(e.vue),[h,v]=(0,a.useState)(e.svelte),y="3.7rem",[b,w]=(0,a.useState)(!0),[k,E]=(0,a.useState)(y),C=(0,a.useRef)(null),P=()=>{setTimeout((()=>{E(`calc(${C.current.offsetHeight}px + ${y})`)}),5),setTimeout((()=>{E(`calc(${C.current.offsetHeight}px + ${y})`)}),255)};return(0,a.useEffect)((()=>{if(i.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};r(e(t,"js")),o(e(n,"ts")),s(e(l,"jsx")),g(e(f,"html")),v(e(h,"html"))}}),[]),a.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?y:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},a.createElement("summary",{onClick:()=>{w(!b),P()}},"show code"),a.createElement("div",{ref:C,style:{display:"block",overflow:"hidden"}},a.createElement("div",{className:p.Z.collapsibleContent},a.createElement(u.Z,{groupId:"sdk-code"},a.createElement(d.Z,{value:"js",label:"JS",attributes:{onMouseDown:P}},a.createElement(c.Z,{language:"js"},t)),a.createElement(d.Z,{value:"ts",label:"TS",attributes:{onMouseDown:P}},a.createElement(c.Z,{language:"ts"},n)),a.createElement(d.Z,{value:"react",label:"React",attributes:{onMouseDown:P}},a.createElement(c.Z,{language:"jsx"},l)),a.createElement(d.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:P}},a.createElement(c.Z,{language:"html"},f)),a.createElement(d.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:P}},a.createElement(c.Z,{language:"html"},h))))))}const g="container_Egsj";function h(e){const{className:t,style:r,showCode:o,height:i,...c}=e,u=e=>JSON.stringify(e,null,2),d=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${u(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${u(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return a.createElement(a.Fragment,null,a.createElement(l,(0,n.Z)({className:`${g} ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:s.G},e)),!1!==e.showCode&&a.createElement(f,{js:d,ts:p,react:m,vue:h,svelte:v}))}},5493:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var n=r(7462),a=(r(7294),r(3905)),o=r(7778);const l={},s="Code Prefill",i={unversionedId:"features/code-prefill",id:"features/code-prefill",title:"Code Prefill",description:"There are many ways to pre-fill code into playgrounds. This is generally achieved either by the SDK or using query params.",source:"@site/docs/features/code-prefill.md",sourceDirName:"features",slug:"/features/code-prefill",permalink:"/livecodes/docs/features/code-prefill",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/code-prefill.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Permanent URL",permalink:"/livecodes/docs/features/permanent-url"},next:{title:"Data URLs",permalink:"/livecodes/docs/features/data-urls"}},c={},u=[{value:"Prefill using SDK",id:"prefill-using-sdk",level:2},{value:"config",id:"config",level:3},{value:"import",id:"import",level:3},{value:"template",id:"template",level:3},{value:"Prefill using query params",id:"prefill-using-query-params",level:2},{value:"Auto-Prefill from page DOM",id:"auto-prefill-from-page-dom",level:2},{value:"Related",id:"related",level:2}],d={toc:u};function p(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"code-prefill"},"Code Prefill"),(0,a.kt)("p",null,"There are many ways to pre-fill code into playgrounds. This is generally achieved either by the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," or using ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query params"),"."),(0,a.kt)("h2",{id:"prefill-using-sdk"},"Prefill using SDK"),(0,a.kt)("p",null,"When creating an embeded playground, the following ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options")," allow prefill with code:"),(0,a.kt)("h3",{id:"config"},"config"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#config"},"EmbedOptions.config")),(0,a.kt)("p",null,"loads a ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," (or a URL to JSON file representing the configuration object)"),(0,a.kt)(o.Z,{config:{markup:{language:"html",content:"<h1>Hello World!</h1>"},style:{language:"css",content:"h1 { color: blue; }"}},mdxType:"LiveCodes"}),(0,a.kt)("h3",{id:"import"},"import"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#import"},"EmbedOptions.import")),(0,a.kt)("p",null,"allows ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/import"},"importing")," from many sources."),(0,a.kt)("p",null,"Examples:"),(0,a.kt)("p",null,"Import GitHub directory:"),(0,a.kt)(o.Z,{import:"https://github.com/bradtraversy/50projects50days/tree/master/progress-steps",mdxType:"LiveCodes"}),(0,a.kt)("p",null,"Import shared project:"),(0,a.kt)(o.Z,{import:"id/6ys2b8txf33",mdxType:"LiveCodes"}),(0,a.kt)("h3",{id:"template"},"template"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#template"},"EmbedOptions.template")),(0,a.kt)("p",null,"loads one of the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/templates"},"starter templates"),"."),(0,a.kt)(o.Z,{template:"react",mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"prefill-using-query-params"},"Prefill using query params"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"Query parameters")," can provide easy and powerful ways for configuring the playground."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("a",{href:"https://livecodes.io/?md=**Hello World!**",target:"_blank"},"https://livecodes.io/?md=**Hello World!**"),(0,a.kt)("br",null),(0,a.kt)("br",null),(0,a.kt)(o.Z,{params:{md:"**Hello World!**"},mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"auto-prefill-from-page-dom"},"Auto-Prefill from page DOM"),(0,a.kt)("p",null,"TODO..."),(0,a.kt)("h2",{id:"related"},"Related"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/import"},"Import")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/templates"},"Templates")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../configuration/"},"Configuration")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../sdk/"},"SDK"))))}p.isMDXComponent=!0},420:(e,t,r)=>{r.d(t,{Z:()=>n});const n={details:"details_sGeq"}},2134:(e,t,r)=>{r.d(t,{Z:()=>n});const n={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}}}]);