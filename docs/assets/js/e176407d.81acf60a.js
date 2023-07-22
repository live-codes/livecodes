"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[543],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>f});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(a),m=r,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return a?n.createElement(f,i(i({ref:t},p),{},{components:a})):n.createElement(f,i({ref:t},p))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5162:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(7294),r=a(6010);const o="tabItem_Ymn6";function i(e){let{children:t,hidden:a,className:i}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,i),hidden:a},t)}},4866:(e,t,a)=>{a.d(t,{Z:()=>w});var n=a(7462),r=a(7294),o=a(6010),i=a(2466),s=a(6550),l=a(1980),c=a(7392),p=a(12);function u(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function d(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=t??u(a);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:a}=e;const n=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,l._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(n.location.search);t.set(o,e),n.replace({...n.location,search:t.toString()})}),[o,n])]}function g(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,o=d(e),[i,s]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:o}))),[l,c]=f({queryString:a,groupId:n}),[u,g]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,o]=(0,p.Nk)(a);return[n,(0,r.useCallback)((e=>{a&&o.set(e)}),[a,o])]}({groupId:n}),h=(()=>{const e=l??u;return m({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{h&&s(h)}),[h]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),c(e),g(e)}),[c,g,o]),tabValues:o}}var h=a(2389);const v="tabList__CuJ",k="tabItem_LNqP";function b(e){let{className:t,block:a,selectedValue:s,selectValue:l,tabValues:c}=e;const p=[],{blockElementScrollPositionUntilNextRender:u}=(0,i.o5)(),d=e=>{const t=e.currentTarget,a=p.indexOf(t),n=c[a].value;n!==s&&(u(t),l(n))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const a=p.indexOf(e.currentTarget)+1;t=p[a]??p[0];break}case"ArrowLeft":{const a=p.indexOf(e.currentTarget)-1;t=p[a]??p[p.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},t)},c.map((e=>{let{value:t,label:a,attributes:i}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>p.push(e),onKeyDown:m,onClick:d},i,{className:(0,o.Z)("tabs__item",k,i?.className,{"tabs__item--active":s===t})}),a??t)})))}function N(e){let{lazy:t,children:a,selectedValue:n}=e;const o=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function y(e){const t=g(e);return r.createElement("div",{className:(0,o.Z)("tabs-container",v)},r.createElement(b,(0,n.Z)({},e,t)),r.createElement(N,(0,n.Z)({},e,t)))}function w(e){const t=(0,h.Z)();return r.createElement(y,(0,n.Z)({key:String(t)},e))}},7778:(e,t,a)=>{a.d(t,{Z:()=>h});var n=a(7462),r=a(7294);const o=async function(e,t){void 0===t&&(t={});const{appUrl:a="https://livecodes.io/",params:n={},config:r={},import:o,lite:i=!1,loading:s="lazy",template:l,view:c="split"}=t;let p,u;if(p="string"==typeof e?document.querySelector(e):e,!e)throw new Error("Container element is required.");if(!p)throw new Error(`Cannot find element: "${e}"`);try{u=new URL(a)}catch{throw new Error(`"${a}" is not a valid URL.`)}const d=u.origin;if("object"==typeof n&&Object.keys(n).forEach((e=>{u.searchParams.set(e,String(n[e]))})),"string"==typeof r)try{new URL(r),u.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&u.searchParams.set("config","sdk")}l&&u.searchParams.set("template",l),o&&u.searchParams.set("x",o),u.searchParams.set(i?"lite":"embed","true"),u.searchParams.set("loading",s),u.searchParams.set("view",c);let m=!1;const f="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!p)return;const t=p.dataset.height||p.style.height;if(t){const e=isNaN(Number(t))?t:t+"px";p.style.height=e}"false"!==p.dataset.defaultStyles&&(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="5px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.overflow||="hidden",p.style.resize||="vertical");const a=document.createElement("iframe");a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const n="eager"===s?"eager":"lazy";a.setAttribute("loading",n),a.classList.add("livecodes"),a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=p.style.borderRadius,addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===d&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:r},d))})),a.onload=()=>{e(a)},a.src=u.href,p.innerHTML="",p.appendChild(a)})),h=new Promise((e=>{addEventListener("message",(function t(a){a.source===g.contentWindow&&a.origin===d&&"livecodes-ready"===a.data?.type&&(removeEventListener("message",t),e(),h.settled=!0)}))})),v=()=>m?Promise.reject(f):new Promise((async e=>{h.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},d),await h,e()})),k=(e,t)=>new Promise((async(a,n)=>{if(m)return n(f);await v(),addEventListener("message",(function t(r){if(r.source===g.contentWindow&&r.origin===d&&"livecodes-api-response"===r.data?.type&&r.data.method===e){removeEventListener("message",t);const e=r.data.payload;e?.error?n(e.error):a(e)}})),g.contentWindow?.postMessage({method:e,args:t},d)}));let b=[];addEventListener("message",(async e=>{if(e.source!==g.contentWindow||e.origin!==d||"livecodes-change"!==e.data?.type)return;const t=await k("getCode"),a=await k("getConfig");b.forEach((e=>{e({code:t,config:a})}))}));const N=()=>{b.length=0,p&&(p.innerHTML=""),m=!0};if("lazy"===s&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(p))}))}),{rootMargin:"150px"}).observe(p)}return{load:()=>v(),run:()=>k("run"),format:e=>k("format",[e]),getShareUrl:e=>k("getShareUrl",[e]),getConfig:e=>k("getConfig",[e]),setConfig:e=>k("setConfig",[e]),getCode:()=>k("getCode"),show:(e,t)=>k("show",[e,t]),runTests:()=>k("runTests"),onChange:e=>(e=>{if(m)throw new Error(f);return b.push(e),{remove:()=>{b=b.filter((t=>t!==e))}}})(e),exec:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return k("exec",[e,...a])},destroy:()=>h.settled?k("destroy").then(N):m?Promise.reject(f):(N(),Promise.resolve())}};function i(e){const{className:t,style:a,height:n,sdkReady:i,...s}=e,l=(0,r.useRef)(null);let c;return(0,r.useEffect)((()=>{if(l.current)return o(l.current,s).then((e=>{c=e,"function"==typeof i&&i(e)})),()=>{c?.destroy()}}),[]),r.createElement("div",{ref:l,className:t,style:a,"data-height":n})}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const a=e.dataset.options;if(a)try{t=JSON.parse(a)}catch{}let n;const r=e.dataset.config||e.dataset.prefill;if(r)try{n=JSON.parse(r)}catch{}o(e,{import:"dom/"+encodeURIComponent(e.outerHTML),...t,...n?{config:n}:{}})}))}));var s=a(1446),l=a(412),c=a(814),p=a(4866),u=a(5162),d=a(2134),m=a(420);function f(e){const[t,a]=(0,r.useState)(e.js),[n,o]=(0,r.useState)(e.ts),[i,s]=(0,r.useState)(e.react),[f,g]=(0,r.useState)(e.vue),[h,v]=(0,r.useState)(e.svelte),k="3.7rem",[b,N]=(0,r.useState)(!0),[y,w]=(0,r.useState)(k),j=(0,r.useRef)(null),E=()=>{setTimeout((()=>{w(`calc(${j.current.offsetHeight}px + ${k})`)}),5),setTimeout((()=>{w(`calc(${j.current.offsetHeight}px + ${k})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};a(e(t,"js")),o(e(n,"ts")),s(e(i,"jsx")),g(e(f,"html")),v(e(h,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${d.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?k:y,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{N(!b),E()}},"show code"),r.createElement("div",{ref:j,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:d.Z.collapsibleContent},r.createElement(p.Z,{groupId:"sdk-code"},r.createElement(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:E}},r.createElement(c.Z,{language:"js"},t)),r.createElement(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:E}},r.createElement(c.Z,{language:"ts"},n)),r.createElement(u.Z,{value:"react",label:"React",attributes:{onMouseDown:E}},r.createElement(c.Z,{language:"jsx"},i)),r.createElement(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:E}},r.createElement(c.Z,{language:"html"},f)),r.createElement(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:E}},r.createElement(c.Z,{language:"html"},h))))))}const g="container_Egsj";function h(e){const{className:t,style:a,showCode:o,height:l,...c}=e,p=e=>JSON.stringify(e,null,2),u=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${p(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),d=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${p(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${p(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${p(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${p(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(i,(0,n.Z)({className:`${g} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:s.G},e)),!1!==e.showCode&&r.createElement(f,{js:u,ts:d,react:m,vue:h,svelte:v}))}},905:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905)),o=a(7778);const i={},s="Query Parameters",l={unversionedId:"configuration/query-params",id:"configuration/query-params",title:"Query Parameters",description:"A flexible and convenient way to configure the app is to use URL query parameters.",source:"@site/docs/configuration/query-params.md",sourceDirName:"configuration",slug:"/configuration/query-params",permalink:"/livecodes/docs/configuration/query-params",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/configuration/query-params.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Configuration Object",permalink:"/livecodes/docs/configuration/configuration-object"},next:{title:"LiveCodes SDK",permalink:"/livecodes/docs/sdk/"}},c={},p=[{value:"Usage",id:"usage",level:2}],u={toc:p};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"query-parameters"},"Query Parameters"),(0,r.kt)("p",null,"A flexible and convenient way to configure the app is to use URL query parameters.\nIt allows configuration of a wide range of options, including those of the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," and ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options"),"."),(0,r.kt)("div",{style:{clear:"both"}}),"Example:",(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"https://livecodes.io?js=console.log('Hello World!')&console=open\n")),(0,r.kt)(o.Z,{params:{js:"console.log('Hello World!')",console:"open"},mdxType:"LiveCodes"}),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"All properties of ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," and ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options")," that have values of primitive types (e.g. string, number, boolean) can be assigned to a query parameter with the same name."),(0,r.kt)("p",{parentName:"li"},"These include:\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#config"},"config"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#import"},"import"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#lite"},"lite"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#loading"},"loading"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#template"},"template"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#view"},"view"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#title"},"title"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#description"},"description"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#activeEditor"},"activeEditor"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#cssPreset"},"cssPreset"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#readonly"},"readonly"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#allowLangChange"},"allowLangChange"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#mode"},"mode"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#autoupdate"},"autoupdate"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#autosave"},"autosave"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#delay"},"delay"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#formatOnsave"},"formatOnsave"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#theme"},"theme"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#recoverUnsaved"},"recoverUnsaved"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#showSpacing"},"showSpacing"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editor"},"editor"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#fontFamily"},"fontFamily"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#fontSize"},"fontSize"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#useTabs"},"useTabs"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#tabSize"},"tabSize"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#lineNumbers"},"lineNumbers"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#wordWrap"},"wordWrap"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#closeBrackets"},"closeBrackets"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#emmet"},"emmet"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editorMode"},"editorMode"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#semicolons"},"semicolons"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#singleQuote"},"singleQuote"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#trailingComma"},"trailingComma"),"."),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"?theme=light&delay=500&lineNumbers=false\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Any value given for booleans except ",(0,r.kt)("inlineCode",{parentName:"p"},'"false"')," (including no value) will be considered ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,r.kt)("p",{parentName:"li"},"Example: all these are considered ",(0,r.kt)("inlineCode",{parentName:"p"},"true")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"?lite=true\n?lite=1\n?lite=any\n?lite\n")),(0,r.kt)("p",{parentName:"li"},"while this is considered ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"?lite=false\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Parameters that expect array of values can be supplied with comma separated values. These include:\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#tags"},"tags"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#languages"},"languages"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#processors"},"processors"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#stylesheets"},"stylesheets"),",\n",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#scripts"},"scripts"),"."),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"?languages=html,md,css,ts\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Values set in the URL query parameters override those set in ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Unlike ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/user-settings"},"user settings")," that are set in the UI which are saved and subsequently used, those that are set in query parameters are not automatically saved.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Additional query parameters include:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"no-defaults"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")," (Default: ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),")."),(0,r.kt)("p",{parentName:"li"},"If ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", the app will not load the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/default-template-language"},"default template/language"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"x"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),"."),(0,r.kt)("p",{parentName:"li"},"Alias to ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#import"},(0,r.kt)("inlineCode",{parentName:"a"},"import"))," (a URL to ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/import"},"import"),").")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"raw"),": ",(0,r.kt)("a",{parentName:"p",href:"../api/modules/internal#language"},(0,r.kt)("inlineCode",{parentName:"a"},"Language")),"."),(0,r.kt)("p",{parentName:"li"},"When used with ",(0,r.kt)("inlineCode",{parentName:"p"},"import")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"x"),", imports the URL as code of the provided language.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"language"),": ",(0,r.kt)("a",{parentName:"p",href:"../api/modules/internal#language"},(0,r.kt)("inlineCode",{parentName:"a"},"Language")),"."),(0,r.kt)("p",{parentName:"li"},"The language to load by default in the editor.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"lang"),": ",(0,r.kt)("a",{parentName:"p",href:"../api/modules/internal#language"},(0,r.kt)("inlineCode",{parentName:"a"},"Language")),"."),(0,r.kt)("p",{parentName:"li"},"Alias to ",(0,r.kt)("inlineCode",{parentName:"p"},"language"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"active"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'"markup" | "style" | "script" | 0 | 1 | 2'),"."),(0,r.kt)("p",{parentName:"li"},"Alias to ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#activeEditor"},(0,r.kt)("inlineCode",{parentName:"a"},"activeEditor")),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"tools"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'"open" | "full" | "closed" | "console" | "compiled" | "tests" | "none"')),(0,r.kt)("p",{parentName:"li"},"The ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tools-pane"},"tools pane")," status.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"console"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'"open" | "full" | "closed" | "none"')),(0,r.kt)("p",{parentName:"li"},"The ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/console"},"console")," status.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"compiled"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'"open" | "full" | "closed" | "none"')),(0,r.kt)("p",{parentName:"li"},"The ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/compiled-code"},"compiled code viewer")," status.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"tests"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'"open" | "full" | "closed" | "none"')),(0,r.kt)("p",{parentName:"li"},"The ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tests"},"tests panel")," status.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"scrollPosition"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")," (Default: ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),")."),(0,r.kt)("p",{parentName:"li"},"If ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),", the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result#scroll-position"},"scroll position")," will not be maintained after reload.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Any ",(0,r.kt)("a",{parentName:"p",href:"../api/modules/internal#language"},(0,r.kt)("inlineCode",{parentName:"a"},"Language"))," can used as a query parameter, and the value will be used as its code."),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"https://livecodes.io?js=console.log('Hello World!')\n")))))),(0,r.kt)("admonition",{title:"Examples",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"For usage examples, check ",(0,r.kt)("a",{parentName:"p",href:"pathname:///../stories/?path=/story/embed-options-params--select-language"},"storybook")," and ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/develop/src/livecodes/config/__tests__/build-config.spec.ts"},"unit tests"),".")))}d.isMDXComponent=!0},420:(e,t,a)=>{a.d(t,{Z:()=>n});const n={details:"details_sGeq"}},2134:(e,t,a)=>{a.d(t,{Z:()=>n});const n={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}}}]);