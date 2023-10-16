"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3902],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>f});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),c=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(a),m=r,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||o;return a?n.createElement(f,l(l({ref:t},u),{},{components:a})):n.createElement(f,l({ref:t},u))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[d]="string"==typeof e?e:r,l[1]=s;for(var c=2;c<o;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5162:(e,t,a)=>{a.d(t,{Z:()=>l});var n=a(7294),r=a(6010);const o="tabItem_Ymn6";function l(e){let{children:t,hidden:a,className:l}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,l),hidden:a},t)}},4866:(e,t,a)=>{a.d(t,{Z:()=>E});var n=a(7462),r=a(7294),o=a(6010),l=a(2466),s=a(6550),i=a(1980),c=a(7392),u=a(12);function d(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function p(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=t??d(a);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:a}=e;const n=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,i._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(n.location.search);t.set(o,e),n.replace({...n.location,search:t.toString()})}),[o,n])]}function g(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,o=p(e),[l,s]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:o}))),[i,c]=f({queryString:a,groupId:n}),[d,g]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,o]=(0,u.Nk)(a);return[n,(0,r.useCallback)((e=>{a&&o.set(e)}),[a,o])]}({groupId:n}),h=(()=>{const e=i??d;return m({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{h&&s(h)}),[h]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),c(e),g(e)}),[c,g,o]),tabValues:o}}var h=a(2389);const v="tabList__CuJ",y="tabItem_LNqP";function b(e){let{className:t,block:a,selectedValue:s,selectValue:i,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:d}=(0,l.o5)(),p=e=>{const t=e.currentTarget,a=u.indexOf(t),n=c[a].value;n!==s&&(d(t),i(n))},m=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const a=u.indexOf(e.currentTarget)+1;t=u[a]??u[0];break}case"ArrowLeft":{const a=u.indexOf(e.currentTarget)-1;t=u[a]??u[u.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},t)},c.map((e=>{let{value:t,label:a,attributes:l}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>u.push(e),onKeyDown:m,onClick:p},l,{className:(0,o.Z)("tabs__item",y,l?.className,{"tabs__item--active":s===t})}),a??t)})))}function w(e){let{lazy:t,children:a,selectedValue:n}=e;const o=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function k(e){const t=g(e);return r.createElement("div",{className:(0,o.Z)("tabs-container",v)},r.createElement(b,(0,n.Z)({},e,t)),r.createElement(w,(0,n.Z)({},e,t)))}function E(e){const t=(0,h.Z)();return r.createElement(k,(0,n.Z)({key:String(t)},e))}},7778:(e,t,a)=>{a.d(t,{Z:()=>h});var n=a(7462),r=a(7294);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:a="https://livecodes.io/",params:n={},config:r={},import:o,lite:l,loading:s="lazy",template:i,view:c="split"}=t,u="headless"===c;let d,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!u||"object"!=typeof e)throw new Error("A valid container element is required.");if(!p){if(!u)throw new Error(`Cannot find element: "${e}"`);p=document.createElement("div"),C(p),document.body.appendChild(p)}try{d=new URL(a)}catch{throw new Error(`"${a}" is not a valid URL.`)}const m=d.origin;if("object"==typeof n&&Object.keys(n).forEach((e=>{d.searchParams.set(e,String(n[e]))})),"string"==typeof r)try{new URL(r),d.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&d.searchParams.set("config","sdk")}i&&d.searchParams.set("template",i),o&&d.searchParams.set("x",o),l&&d.searchParams.set("lite","true"),d.searchParams.set("embed","true"),d.searchParams.set("loading",u?"eager":s),d.searchParams.set("view",c);let f=!1;const g="Cannot call API methods after calling `destroy()`.",h=await new Promise((e=>{if(!p)return;const t=p.dataset.height||p.style.height;if(t&&!u){const e=isNaN(Number(t))?t:t+"px";p.style.height=e}"false"===p.dataset.defaultStyles||u||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="5px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");const a=document.createElement("iframe");a.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const n="eager"===s?"eager":"lazy";a.setAttribute("loading",n),a.classList.add("livecodes"),u?C(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=p.style.borderRadius),addEventListener("message",(function e(t){t.source===a.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),a.contentWindow?.postMessage({type:"livecodes-config",payload:r},m))})),a.onload=()=>{e(a)},a.src=d.href,p.appendChild(a)})),v=new Promise((e=>{addEventListener("message",(function t(a){a.source===h.contentWindow&&a.origin===m&&"livecodes-ready"===a.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),y=()=>f?Promise.reject(g):new Promise((async e=>{v.settled&&e();h.contentWindow?.postMessage({type:"livecodes-load"},m),await v,e()})),b=(e,t)=>new Promise((async(a,n)=>{if(f)return n(g);await y();const r=S();addEventListener("message",(function t(o){if(o.source===h.contentWindow&&o.origin===m&&"livecodes-api-response"===o.data?.type&&o.data?.id===r&&o.data.method===e){removeEventListener("message",t);const e=o.data.payload;e?.error?n(e.error):a(e)}})),h.contentWindow?.postMessage({method:e,id:r,args:t},m)})),w={},k=["load","ready","code","console","tests","destroy"],E=(e,t)=>{if(f)throw new Error(g);return k.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==h.contentWindow||e.origin!==m||!t||!w[t])return;const a=e.data?.payload;w[t]?.forEach((e=>{e(a)}))}));const N=()=>{Object.values(w).forEach((e=>{e.length=0})),h?.remove?.(),f=!0};if("lazy"===s&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await y(),t.unobserve(p))}))}),{rootMargin:"150px"}).observe(p)}function C(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const S=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>y(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>E("code",e),watch:E,exec:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return b("exec",[e,...a])},destroy:()=>v.settled?b("destroy").then(N):f?Promise.reject(g):(N(),Promise.resolve())}}function l(e){const{className:t,style:a,height:n,sdkReady:l,...s}=e,i=(0,r.useRef)(null);let c;return(0,r.useEffect)((()=>{if(i.current)return o(i.current,s).then((e=>{c=e,"function"==typeof l&&l(e)})),()=>{c?.destroy()}}),[]),r.createElement("div",{ref:i,className:t,style:a,"data-height":n})}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const a=e.dataset.options;if(a)try{t=JSON.parse(a)}catch{}let n;const r=e.dataset.config||e.dataset.prefill;if(r)try{n=JSON.parse(r)}catch{}o(e,{import:"dom/"+encodeURIComponent(e.outerHTML),...t,...n?{config:n}:{}})}))}));var s=a(1446),i=a(412),c=a(814),u=a(4866),d=a(5162),p=a(2134),m=a(420);function f(e){const[t,a]=(0,r.useState)(e.js),[n,o]=(0,r.useState)(e.ts),[l,s]=(0,r.useState)(e.react),[f,g]=(0,r.useState)(e.vue),[h,v]=(0,r.useState)(e.svelte),y="3.7rem",[b,w]=(0,r.useState)(!0),[k,E]=(0,r.useState)(y),N=(0,r.useRef)(null),C=()=>{setTimeout((()=>{E(`calc(${N.current.offsetHeight}px + ${y})`)}),5),setTimeout((()=>{E(`calc(${N.current.offsetHeight}px + ${y})`)}),255)};return(0,r.useEffect)((()=>{if(i.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};a(e(t,"js")),o(e(n,"ts")),s(e(l,"jsx")),g(e(f,"html")),v(e(h,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?y:k,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{w(!b),C()}},"show code"),r.createElement("div",{ref:N,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:p.Z.collapsibleContent},r.createElement(u.Z,{groupId:"sdk-code"},r.createElement(d.Z,{value:"js",label:"JS",attributes:{onMouseDown:C}},r.createElement(c.Z,{language:"js"},t)),r.createElement(d.Z,{value:"ts",label:"TS",attributes:{onMouseDown:C}},r.createElement(c.Z,{language:"ts"},n)),r.createElement(d.Z,{value:"react",label:"React",attributes:{onMouseDown:C}},r.createElement(c.Z,{language:"jsx"},l)),r.createElement(d.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:C}},r.createElement(c.Z,{language:"html"},f)),r.createElement(d.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:C}},r.createElement(c.Z,{language:"html"},h))))))}const g="container_Egsj";function h(e){const{className:t,style:a,showCode:o,height:i,...c}=e,u=e=>JSON.stringify(e,null,2),d=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${u(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${u(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(l,(0,n.Z)({className:`${g} ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:s.G},e)),!1!==e.showCode&&r.createElement(f,{js:d,ts:p,react:m,vue:h,svelte:v}))}},8806:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var n=a(7462),r=(a(7294),a(3905)),o=a(7778);const l={},s="Teal",i={unversionedId:"languages/teal",id:"languages/teal",title:"Teal",description:"Teal is a typed dialect of Lua.",source:"@site/docs/languages/teal.md",sourceDirName:"languages",slug:"/languages/teal",permalink:"/livecodes/docs/languages/teal",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/teal.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Tcl",permalink:"/livecodes/docs/languages/tcl"},next:{title:"Token CSS",permalink:"/livecodes/docs/languages/tokencss"}},c={},u=[{value:"Usage",id:"usage",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}],d={toc:u};function p(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"teal"},"Teal"),(0,r.kt)("p",null,"Teal is a typed dialect of ",(0,r.kt)("a",{parentName:"p",href:"https://www.lua.org/"},"Lua"),"."),(0,r.kt)("p",null,"Teal code is compiled to Lua, which then runs in the browser using ",(0,r.kt)("a",{parentName:"p",href:"https://fengari.io/"},"Fengari"),". See documentation for Lua language support in LiveCodes ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/lua"},"here"),"."),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"JavaScript interoperability and DOM access is achieved using ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/fengari-lua/fengari-interop"},(0,r.kt)("inlineCode",{parentName:"a"},'"js"')," module"),"."),(0,r.kt)("p",null,"This example demonstrates usage, JavaScript interoperability and DOM access:"),(0,r.kt)(o.Z,{template:"teal",height:"80vh",mdxType:"LiveCodes"}),(0,r.kt)("h2",{id:"language-info"},"Language Info"),(0,r.kt)("h3",{id:"name"},"Name"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"teal")),(0,r.kt)("h3",{id:"extension"},"Extension"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},".tl")),(0,r.kt)("h3",{id:"editor"},"Editor"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"script")),(0,r.kt)("h2",{id:"compiler"},"Compiler"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/teal-language/tl"},"Teal")),(0,r.kt)("h3",{id:"version"},"Version"),(0,r.kt)("p",null,"Teal v0.15.2"),(0,r.kt)("h2",{id:"code-formatting"},"Code Formatting"),(0,r.kt)("p",null,"Using ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/trixnz/lua-fmt"},(0,r.kt)("inlineCode",{parentName:"a"},"lua-fmt")),"."),(0,r.kt)("h2",{id:"starter-template"},"Starter Template"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=teal"},"https://livecodes.io/?template=teal")),(0,r.kt)("h2",{id:"links"},"Links"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/teal-language/tl"},"Teal")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/teal-language/tl/tree/master/docs"},"Teal documentation")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/teal-language/tl/blob/master/docs/tutorial.md"},"Teal tutorial")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.lua.org/"},"Lua")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.lua.org/docs.html"},"Lua documentation")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://fengari.io/"},"Fengari")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/languages/lua"},"lua")," in LiveCodes"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/languages/lua-wasm"},"lua-wasm")," in LiveCodes")))}p.isMDXComponent=!0},420:(e,t,a)=>{a.d(t,{Z:()=>n});const n={details:"details_sGeq"}},2134:(e,t,a)=>{a.d(t,{Z:()=>n});const n={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}}}]);