"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4895],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,s(s({ref:t},u),{},{components:n})):r.createElement(f,s({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[d]="string"==typeof e?e:a,s[1]=l;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(7294),a=n(6010);const o="tabItem_Ymn6";function s(e){let{children:t,hidden:n,className:s}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o,s),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>k});var r=n(7462),a=n(7294),o=n(6010),s=n(2466),l=n(6550),i=n(1980),c=n(7392),u=n(12);function d(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??d(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const r=(0,l.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(r.location.search);t.set(o,e),r.replace({...r.location,search:t.toString()})}),[o,r])]}function y(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,o=p(e),[s,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[i,c]=f({queryString:n,groupId:r}),[d,y]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,o]=(0,u.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:r}),h=(()=>{const e=i??d;return m({value:e,tabValues:o})?e:null})();(0,a.useLayoutEffect)((()=>{h&&l(h)}),[h]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),y(e)}),[c,y,o]),tabValues:o}}var h=n(2389);const g="tabList__CuJ",v="tabItem_LNqP";function b(e){let{className:t,block:n,selectedValue:l,selectValue:i,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:d}=(0,s.o5)(),p=e=>{const t=e.currentTarget,n=u.indexOf(t),r=c[n].value;r!==l&&(d(t),i(r))},m=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},c.map((e=>{let{value:t,label:n,attributes:s}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>u.push(e),onKeyDown:m,onClick:p},s,{className:(0,o.Z)("tabs__item",v,s?.className,{"tabs__item--active":l===t})}),n??t)})))}function w(e){let{lazy:t,children:n,selectedValue:r}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function E(e){const t=y(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",g)},a.createElement(b,(0,r.Z)({},e,t)),a.createElement(w,(0,r.Z)({},e,t)))}function k(e){const t=(0,h.Z)();return a.createElement(E,(0,r.Z)({key:String(t)},e))}},7778:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(7462),a=n(7294);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:r={},config:a={},import:o,lite:s,loading:l="lazy",template:i,view:c="split"}=t,u="headless"===c;let d,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!u||"object"!=typeof e)throw new Error("A valid container element is required.");if(!p){if(!u)throw new Error(`Cannot find element: "${e}"`);p=document.createElement("div"),j(p),document.body.appendChild(p)}try{d=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const m=d.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{d.searchParams.set(e,String(r[e]))})),"string"==typeof a)try{new URL(a),d.searchParams.set("config",a)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof a)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(a).length>0&&d.searchParams.set("config","sdk")}i&&d.searchParams.set("template",i),o&&d.searchParams.set("x",o),s&&d.searchParams.set("lite","true"),d.searchParams.set("embed","true"),d.searchParams.set("loading",u?"eager":l),d.searchParams.set("view",c);let f=!1;const y="Cannot call API methods after calling `destroy()`.",h=await new Promise((e=>{if(!p)return;const t=p.dataset.height||p.style.height;if(t&&!u){const e=isNaN(Number(t))?t:t+"px";p.style.height=e}"false"===p.dataset.defaultStyles||u||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="5px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const r="eager"===l?"eager":"lazy";n.setAttribute("loading",r),n.classList.add("livecodes"),u?j(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=p.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:a},m))})),n.onload=()=>{e(n)},n.src=d.href,p.appendChild(n)})),g=new Promise((e=>{addEventListener("message",(function t(n){n.source===h.contentWindow&&n.origin===m&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),g.settled=!0)}))})),v=()=>f?Promise.reject(y):new Promise((async e=>{g.settled&&e();h.contentWindow?.postMessage({type:"livecodes-load"},m),await g,e()})),b=(e,t)=>new Promise((async(n,r)=>{if(f)return r(y);await v();const a=C();addEventListener("message",(function t(o){if(o.source===h.contentWindow&&o.origin===m&&"livecodes-api-response"===o.data?.type&&o.data?.id===a&&o.data.method===e){removeEventListener("message",t);const e=o.data.payload;e?.error?r(e.error):n(e)}})),h.contentWindow?.postMessage({method:e,id:a,args:t},m)})),w={},E=["load","ready","code","console","tests","destroy"],k=(e,t)=>{if(f)throw new Error(y);return E.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==h.contentWindow||e.origin!==m||!t||!w[t])return;const n=e.data?.payload;w[t]?.forEach((e=>{e(n)}))}));const N=()=>{Object.values(w).forEach((e=>{e.length=0})),h?.remove?.(),f=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(p))}))}),{rootMargin:"150px"}).observe(p)}function j(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>k("code",e),watch:k,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return b("exec",[e,...n])},destroy:()=>g.settled?b("destroy").then(N):f?Promise.reject(y):(N(),Promise.resolve())}}function s(e){const{className:t,style:n,height:r,sdkReady:s,...l}=e,i=(0,a.useRef)(null);let c;return(0,a.useEffect)((()=>{if(i.current)return o(i.current,l).then((e=>{c=e,"function"==typeof s&&s(e)})),()=>{c?.destroy()}}),[]),a.createElement("div",{ref:i,className:t,style:n,"data-height":r})}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let r;const a=e.dataset.config||e.dataset.prefill;if(a)try{r=JSON.parse(a)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+s,...t,...r?{config:r}:{}})}))}));var l=n(1446),i=n(412),c=n(814),u=n(4866),d=n(5162),p=n(2134),m=n(420);function f(e){const[t,n]=(0,a.useState)(e.js),[r,o]=(0,a.useState)(e.ts),[s,l]=(0,a.useState)(e.react),[f,y]=(0,a.useState)(e.vue),[h,g]=(0,a.useState)(e.svelte),v="3.7rem",[b,w]=(0,a.useState)(!0),[E,k]=(0,a.useState)(v),N=(0,a.useRef)(null),j=()=>{setTimeout((()=>{k(`calc(${N.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{k(`calc(${N.current.offsetHeight}px + ${v})`)}),255)};return(0,a.useEffect)((()=>{if(i.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),o(e(r,"ts")),l(e(s,"jsx")),y(e(f,"html")),g(e(h,"html"))}}),[]),a.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?v:E,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},a.createElement("summary",{onClick:()=>{w(!b),j()}},"show code"),a.createElement("div",{ref:N,style:{display:"block",overflow:"hidden"}},a.createElement("div",{className:p.Z.collapsibleContent},a.createElement(u.Z,{groupId:"sdk-code"},a.createElement(d.Z,{value:"js",label:"JS",attributes:{onMouseDown:j}},a.createElement(c.Z,{language:"js"},t)),a.createElement(d.Z,{value:"ts",label:"TS",attributes:{onMouseDown:j}},a.createElement(c.Z,{language:"ts"},r)),a.createElement(d.Z,{value:"react",label:"React",attributes:{onMouseDown:j}},a.createElement(c.Z,{language:"jsx"},s)),a.createElement(d.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:j}},a.createElement(c.Z,{language:"html"},f)),a.createElement(d.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:j}},a.createElement(c.Z,{language:"html"},h))))))}const y="container_Egsj";function h(e){const{className:t,style:n,showCode:o,height:i,...c}=e,u=e=>JSON.stringify(e,null,2),d=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${u(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${u(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${u(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,g=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${u(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return a.createElement(a.Fragment,null,a.createElement(s,(0,r.Z)({className:`${y} ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:l.G},e)),!1!==e.showCode&&a.createElement(f,{js:d,ts:p,react:m,vue:h,svelte:g}))}},97:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>u});var r=n(7462),a=(n(7294),n(3905)),o=n(7778);const s={},l="Read-Only",i={unversionedId:"features/read-only",id:"features/read-only",title:"Read-Only",description:"In case you need to embed a playground in your web page to show case some code and want users to read through the code and not allow edits, you may use the readonly setting.",source:"@site/docs/features/read-only.md",sourceDirName:"features",slug:"/features/read-only",permalink:"/livecodes/docs/features/read-only",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/read-only.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Lite Mode",permalink:"/livecodes/docs/features/lite"},next:{title:"Permanent URL",permalink:"/livecodes/docs/features/permanent-url"}},c={},u=[{value:"Using SDK",id:"using-sdk",level:2},{value:"Using query params",id:"using-query-params",level:2},{value:"Related",id:"related",level:2}],d={toc:u};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"read-only"},"Read-Only"),(0,a.kt)("p",null,"In case you need to embed a playground in your web page to show case some code and want users to read through the code and not allow edits, you may use the ",(0,a.kt)("inlineCode",{parentName:"p"},"readonly")," setting."),(0,a.kt)("p",null,"Code editing, ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/code-format"},"formatting"),", and ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/console"},"console input")," are not available. However, any language supported by LiveCodes can be used, with syntax highlighting. Code can be ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/code-prefill"},"prefilled"),", and is compiled and shown in the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," as usual."),(0,a.kt)("p",null,"By default, a light-weight, minimal ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/editor-settings#code-editor"},"code editor")," is used. This can be changed by explicitly setting the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," property ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editor"},(0,a.kt)("inlineCode",{parentName:"a"},"editor"))," (e.g. to show hover intellisense)."),(0,a.kt)("p",null,"Demo:"),(0,a.kt)(o.Z,{template:"javascript",config:{readonly:!0},mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"using-sdk"},"Using SDK"),(0,a.kt)("p",null,"set the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," property ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#readonly"},(0,a.kt)("inlineCode",{parentName:"a"},"readonly"))," to ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { createPlayground } from 'livecodes';\n\ncreatePlayground('#container', { template: 'javascript', config: { readonly: true } });\n")),(0,a.kt)("h2",{id:"using-query-params"},"Using query params"),(0,a.kt)("p",null,"add the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query parameter")," ",(0,a.kt)("inlineCode",{parentName:"p"},"readonly")," (no need to set a value)."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io?template=javascript&readonly"},"https://livecodes.io?template=javascript&readonly")),(0,a.kt)("h2",{id:"related"},"Related"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/code-prefill"},"Code prefill")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/lite"},"Lite mode"))))}p.isMDXComponent=!0},420:(e,t,n)=>{n.d(t,{Z:()=>r});const r={details:"details_sGeq"}},2134:(e,t,n)=>{n.d(t,{Z:()=>r});const r={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}}}]);