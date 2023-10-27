"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[543],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>f});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(a),m=o,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||r;return a?n.createElement(f,i(i({ref:t},p),{},{components:a})):n.createElement(f,i({ref:t},p))}));function f(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<r;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5162:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(7294),o=a(6010);const r="tabItem_Ymn6";function i(e){let{children:t,hidden:a,className:i}=e;return n.createElement("div",{role:"tabpanel",className:(0,o.Z)(r,i),hidden:a},t)}},4866:(e,t,a)=>{a.d(t,{Z:()=>w});var n=a(7462),o=a(7294),r=a(6010),i=a(2466),s=a(6550),l=a(1980),c=a(7392),p=a(12);function u(e){return function(e){return o.Children.map(e,(e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:o}}=e;return{value:t,label:a,attributes:n,default:o}}))}function d(e){const{values:t,children:a}=e;return(0,o.useMemo)((()=>{const e=t??u(a);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:a}=e;const n=(0,s.k6)(),r=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,l._X)(r),(0,o.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(n.location.search);t.set(r,e),n.replace({...n.location,search:t.toString()})}),[r,n])]}function g(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,r=d(e),[i,s]=(0,o.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:r}))),[l,c]=f({queryString:a,groupId:n}),[u,g]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,r]=(0,p.Nk)(a);return[n,(0,o.useCallback)((e=>{a&&r.set(e)}),[a,r])]}({groupId:n}),h=(()=>{const e=l??u;return m({value:e,tabValues:r})?e:null})();(0,o.useLayoutEffect)((()=>{h&&s(h)}),[h]);return{selectedValue:i,selectValue:(0,o.useCallback)((e=>{if(!m({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);s(e),c(e),g(e)}),[c,g,r]),tabValues:r}}var h=a(2389);const v="tabList__CuJ",k="tabItem_LNqP";function b(e){let{className:t,block:a,selectedValue:s,selectValue:l,tabValues:c}=e;const p=[],{blockElementScrollPositionUntilNextRender:u}=(0,i.o5)(),d=e=>{const t=e.currentTarget,a=p.indexOf(t),n=c[a].value;n!==s&&(u(t),l(n))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const a=p.indexOf(e.currentTarget)+1;t=p[a]??p[0];break}case"ArrowLeft":{const a=p.indexOf(e.currentTarget)-1;t=p[a]??p[p.length-1];break}}t?.focus()};return o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":a},t)},c.map((e=>{let{value:t,label:a,attributes:i}=e;return o.createElement("li",(0,n.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>p.push(e),onKeyDown:m,onClick:d},i,{className:(0,r.Z)("tabs__item",k,i?.className,{"tabs__item--active":s===t})}),a??t)})))}function y(e){let{lazy:t,children:a,selectedValue:n}=e;const r=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=r.find((e=>e.props.value===n));return e?(0,o.cloneElement)(e,{className:"margin-top--md"}):null}return o.createElement("div",{className:"margin-top--md"},r.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function N(e){const t=g(e);return o.createElement("div",{className:(0,r.Z)("tabs-container",v)},o.createElement(b,(0,n.Z)({},e,t)),o.createElement(y,(0,n.Z)({},e,t)))}function w(e){const t=(0,h.Z)();return o.createElement(N,(0,n.Z)({key:String(t)},e))}},7778:(e,t,a)=>{a.d(t,{Z:()=>h});var n=a(7462),o=a(7294);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:a="https://livecodes.io/",params:n={},config:o={},import:r,lite:i,loading:s="lazy",template:l,view:c="split"}=t,p="headless"===c;let u,d=null;if("string"==typeof e)d=document.querySelector(e);else if(e instanceof HTMLElement)d=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!d){if(!p)throw new Error(`Cannot find element: "${e}"`);d=document.createElement("div"),E(d),document.body.appendChild(d)}try{u=new URL(a)}catch{throw new Error(`"${a}" is not a valid URL.`)}const m=u.origin;if("object"==typeof n&&Object.keys(n).forEach((e=>{u.searchParams.set(e,String(n[e]))})),"string"==typeof o)try{new URL(o),u.searchParams.set("config",o)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof o)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(o).length>0&&u.searchParams.set("config","sdk")}l&&u.searchParams.set("template",l),r&&u.searchParams.set("x",r),i&&u.searchParams.set("lite","true"),u.searchParams.set("embed","true"),u.searchParams.set("loading",p?"eager":s),u.searchParams.set("view",c);let f=!1;const g="Cannot call API methods after calling `destroy()`.",h=await new Promise((e=>{if(!d)return;const t=d.dataset.height||d.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";d.style.height=e}"false"===d.dataset.defaultStyles||p||(d.style.backgroundColor||="#fff",d.style.border||="1px solid black",d.style.borderRadius||="5px",d.style.boxSizing||="border-box",d.style.padding||="0",d.style.width||="100%",d.style.height||=d.style.height||"300px",d.style.minHeight="200px",d.style.flexGrow="1",d.style.overflow||="hidden",d.style.resize||="vertical");const a=document.createElement("iframe");a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const n="eager"===s?"eager":"lazy";a.setAttribute("loading",n),a.classList.add("livecodes"),p?E(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=d.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:o},m))})),a.onload=()=>{e(a)},a.src=u.href,d.appendChild(a)})),v=new Promise((e=>{addEventListener("message",(function t(a){a.source===h.contentWindow&&a.origin===m&&"livecodes-ready"===a.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),k=()=>f?Promise.reject(g):new Promise((async e=>{v.settled&&e();h.contentWindow?.postMessage({type:"livecodes-load"},m),await v,e()})),b=(e,t)=>new Promise((async(a,n)=>{if(f)return n(g);await k();const o=C();addEventListener("message",(function t(r){if(r.source===h.contentWindow&&r.origin===m&&"livecodes-api-response"===r.data?.type&&r.data?.id===o&&r.data.method===e){removeEventListener("message",t);const e=r.data.payload;e?.error?n(e.error):a(e)}})),h.contentWindow?.postMessage({method:e,id:o,args:t},m)})),y={},N=["load","ready","code","console","tests","destroy"],w=(e,t)=>{if(f)throw new Error(g);return N.includes(e)?(b("watch",[e]),y[e]||(y[e]=[]),y[e]?.push(t),{remove:()=>{y[e]=y[e]?.filter((e=>e!==t)),0===y[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==h.contentWindow||e.origin!==m||!t||!y[t])return;const a=e.data?.payload;y[t]?.forEach((e=>{e(a)}))}));const j=()=>{Object.values(y).forEach((e=>{e.length=0})),h?.remove?.(),f=!0};if("lazy"===s&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await k(),t.unobserve(d))}))}),{rootMargin:"150px"}).observe(d)}function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>w("code",e),watch:w,exec:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return b("exec",[e,...a])},destroy:()=>v.settled?b("destroy").then(j):f?Promise.reject(g):(j(),Promise.resolve())}}function i(e){const{className:t,style:a,height:n,sdkReady:i,...s}=e,l=(0,o.useRef)(null);let c;return(0,o.useEffect)((()=>{if(l.current)return r(l.current,s).then((e=>{c=e,"function"==typeof i&&i(e)})),()=>{c?.destroy()}}),[]),o.createElement("div",{ref:l,className:t,style:a,"data-height":n})}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const a=e.dataset.options;if(a)try{t=JSON.parse(a)}catch{}let n;const o=e.dataset.config||e.dataset.prefill;if(o)try{n=JSON.parse(o)}catch{}const i=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+i,...t,...n?{config:n}:{}})}))}));var s=a(1446),l=a(412),c=a(814),p=a(4866),u=a(5162),d=a(2134),m=a(420);function f(e){const[t,a]=(0,o.useState)(e.js),[n,r]=(0,o.useState)(e.ts),[i,s]=(0,o.useState)(e.react),[f,g]=(0,o.useState)(e.vue),[h,v]=(0,o.useState)(e.svelte),k="3.7rem",[b,y]=(0,o.useState)(!0),[N,w]=(0,o.useState)(k),j=(0,o.useRef)(null),E=()=>{setTimeout((()=>{w(`calc(${j.current.offsetHeight}px + ${k})`)}),5),setTimeout((()=>{w(`calc(${j.current.offsetHeight}px + ${k})`)}),255)};return(0,o.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};a(e(t,"js")),r(e(n,"ts")),s(e(i,"jsx")),g(e(f,"html")),v(e(h,"html"))}}),[]),o.createElement("details",{className:`alert alert--info ${d.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?k:N,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},o.createElement("summary",{onClick:()=>{y(!b),E()}},"show code"),o.createElement("div",{ref:j,style:{display:"block",overflow:"hidden"}},o.createElement("div",{className:d.Z.collapsibleContent},o.createElement(p.Z,{groupId:"sdk-code"},o.createElement(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:E}},o.createElement(c.Z,{language:"js"},t)),o.createElement(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:E}},o.createElement(c.Z,{language:"ts"},n)),o.createElement(u.Z,{value:"react",label:"React",attributes:{onMouseDown:E}},o.createElement(c.Z,{language:"jsx"},i)),o.createElement(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:E}},o.createElement(c.Z,{language:"html"},f)),o.createElement(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:E}},o.createElement(c.Z,{language:"html"},h))))))}const g="container_Egsj";function h(e){const{className:t,style:a,showCode:r,height:l,...c}=e,p=e=>JSON.stringify(e,null,2),u=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${p(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),d=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${p(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${p(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${p(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${p(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return o.createElement(o.Fragment,null,o.createElement(i,(0,n.Z)({className:`${g} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:s.G},e)),!1!==e.showCode&&o.createElement(f,{js:u,ts:d,react:m,vue:h,svelte:v}))}},905:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(7462),o=(a(7294),a(3905)),r=a(7778);const i={},s="Query Parameters",l={unversionedId:"configuration/query-params",id:"configuration/query-params",title:"Query Parameters",description:"A flexible and convenient way to configure the app is to use URL query parameters.",source:"@site/docs/configuration/query-params.md",sourceDirName:"configuration",slug:"/configuration/query-params",permalink:"/livecodes/docs/configuration/query-params",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/configuration/query-params.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Configuration Object",permalink:"/livecodes/docs/configuration/configuration-object"},next:{title:"LiveCodes SDK",permalink:"/livecodes/docs/sdk/"}},c={},p=[{value:"Usage",id:"usage",level:2}],u={toc:p};function d(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"query-parameters"},"Query Parameters"),(0,o.kt)("p",null,"A flexible and convenient way to configure the app is to use URL query parameters.\nIt allows configuration of a wide range of options, including those of the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," and ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options"),"."),(0,o.kt)("div",{style:{clear:"both"}}),"Example:",(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"https://livecodes.io?js=console.log('Hello World!')&console=open\n")),(0,o.kt)(r.Z,{params:{js:"console.log('Hello World!')",console:"open"},mdxType:"LiveCodes"}),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"All properties of ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," and ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options")," that have values of primitive types (e.g. string, number, boolean) can be assigned to a query parameter with the same name."),(0,o.kt)("p",{parentName:"li"},"These include:\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#config"},"config"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#import"},"import"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#lite"},"lite"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#loading"},"loading"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#template"},"template"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#view"},"view"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#title"},"title"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#description"},"description"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#activeEditor"},"activeEditor"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#cssPreset"},"cssPreset"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#readonly"},"readonly"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#allowLangChange"},"allowLangChange"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#mode"},"mode"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#autoupdate"},"autoupdate"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#autosave"},"autosave"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#delay"},"delay"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#formatOnsave"},"formatOnsave"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#theme"},"theme"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#recoverUnsaved"},"recoverUnsaved"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#showSpacing"},"showSpacing"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editor"},"editor"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#fontFamily"},"fontFamily"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#fontSize"},"fontSize"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#useTabs"},"useTabs"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#tabSize"},"tabSize"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#lineNumbers"},"lineNumbers"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#wordWrap"},"wordWrap"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#closeBrackets"},"closeBrackets"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#emmet"},"emmet"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editorMode"},"editorMode"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#semicolons"},"semicolons"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#singleQuote"},"singleQuote"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#trailingComma"},"trailingComma"),"."),(0,o.kt)("p",{parentName:"li"},"Example:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"?theme=light&delay=500&lineNumbers=false\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Any value given for booleans except ",(0,o.kt)("inlineCode",{parentName:"p"},'"false"')," (including no value) will be considered ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,o.kt)("p",{parentName:"li"},"Example: all these are considered ",(0,o.kt)("inlineCode",{parentName:"p"},"true")),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"?lite=true\n?lite=1\n?lite=any\n?lite\n")),(0,o.kt)("p",{parentName:"li"},"while this is considered ",(0,o.kt)("inlineCode",{parentName:"p"},"false")),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"?lite=false\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Parameters that expect array of values can be supplied with comma separated values. These include:\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#tags"},"tags"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#languages"},"languages"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#processors"},"processors"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#stylesheets"},"stylesheets"),",\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#scripts"},"scripts"),"."),(0,o.kt)("p",{parentName:"li"},"Example:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"?languages=html,md,css,ts\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Values set in the URL query parameters override those set in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object"),".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Unlike ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/user-settings"},"user settings")," that are set in the UI which are saved and subsequently used, those that are set in query parameters are not automatically saved.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Additional query parameters include:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"no-defaults"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"boolean")," (Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),")."),(0,o.kt)("p",{parentName:"li"},"If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", the app will not load the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/default-template-language"},"default template/language"),".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"x"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string"),"."),(0,o.kt)("p",{parentName:"li"},"Alias to ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#import"},(0,o.kt)("inlineCode",{parentName:"a"},"import"))," (a URL to ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/import"},"import"),").")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"raw"),": ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/api/modules/internal#language"},(0,o.kt)("inlineCode",{parentName:"a"},"Language")),"."),(0,o.kt)("p",{parentName:"li"},"When used with ",(0,o.kt)("inlineCode",{parentName:"p"},"import")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"x"),", imports the URL as code of the provided language.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"language"),": ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/api/modules/internal#language"},(0,o.kt)("inlineCode",{parentName:"a"},"Language")),"."),(0,o.kt)("p",{parentName:"li"},"The language to load by default in the editor.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"lang"),": ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/api/modules/internal#language"},(0,o.kt)("inlineCode",{parentName:"a"},"Language")),"."),(0,o.kt)("p",{parentName:"li"},"Alias to ",(0,o.kt)("inlineCode",{parentName:"p"},"language"),".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"active"),": ",(0,o.kt)("inlineCode",{parentName:"p"},'"markup" | "style" | "script" | 0 | 1 | 2'),"."),(0,o.kt)("p",{parentName:"li"},"Alias to ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#activeEditor"},(0,o.kt)("inlineCode",{parentName:"a"},"activeEditor")),".")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"tools"),": ",(0,o.kt)("inlineCode",{parentName:"p"},'"open" | "full" | "closed" | "console" | "compiled" | "tests" | "none"')),(0,o.kt)("p",{parentName:"li"},"The ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tools-pane"},"tools pane")," status.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"console"),": ",(0,o.kt)("inlineCode",{parentName:"p"},'"open" | "full" | "closed" | "none"')),(0,o.kt)("p",{parentName:"li"},"The ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/console"},"console")," status.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"compiled"),": ",(0,o.kt)("inlineCode",{parentName:"p"},'"open" | "full" | "closed" | "none"')),(0,o.kt)("p",{parentName:"li"},"The ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/compiled-code"},"compiled code viewer")," status.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"tests"),": ",(0,o.kt)("inlineCode",{parentName:"p"},'"open" | "full" | "closed" | "none"')),(0,o.kt)("p",{parentName:"li"},"The ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tests"},"tests panel")," status.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"scrollPosition"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"boolean")," (Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),")."),(0,o.kt)("p",{parentName:"li"},"If ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),", the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result#scroll-position"},"scroll position")," will not be maintained after reload.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Any ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/api/modules/internal#language"},(0,o.kt)("inlineCode",{parentName:"a"},"Language"))," can used as a query parameter, and the value will be used as its code."),(0,o.kt)("p",{parentName:"li"},"Example:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"https://livecodes.io?js=console.log('Hello World!')\n")))))),(0,o.kt)("admonition",{title:"Examples",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"For usage examples, check ",(0,o.kt)("a",{parentName:"p",href:"pathname:///../stories/?path=/story/embed-options-params--select-language"},"storybook")," and ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/develop/src/livecodes/config/__tests__/build-config.spec.ts"},"unit tests"),".")))}d.isMDXComponent=!0},420:(e,t,a)=>{a.d(t,{Z:()=>n});const n={details:"details_sGeq"}},2134:(e,t,a)=>{a.d(t,{Z:()=>n});const n={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}}}]);