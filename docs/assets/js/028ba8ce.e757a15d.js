"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7083],{3905:(e,t,s)=>{s.d(t,{Zo:()=>d,kt:()=>h});var r=s(7294);function a(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function n(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function o(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?n(Object(s),!0).forEach((function(t){a(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):n(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function l(e,t){if(null==e)return{};var s,r,a=function(e,t){if(null==e)return{};var s,r,a={},n=Object.keys(e);for(r=0;r<n.length;r++)s=n[r],t.indexOf(s)>=0||(a[s]=e[s]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)s=n[r],t.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(a[s]=e[s])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),s=t;return e&&(s="function"==typeof e?e(t):o(o({},t),e)),s},d=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var s=e.components,a=e.mdxType,n=e.originalType,i=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=c(s),m=a,h=u["".concat(i,".").concat(m)]||u[m]||p[m]||n;return s?r.createElement(h,o(o({ref:t},d),{},{components:s})):r.createElement(h,o({ref:t},d))}));function h(e,t){var s=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=s.length,o=new Array(n);o[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<n;c++)o[c]=s[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,s)}m.displayName="MDXCreateElement"},5162:(e,t,s)=>{s.d(t,{Z:()=>o});var r=s(7294),a=s(6010);const n="tabItem_Ymn6";function o(e){let{children:t,hidden:s,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(n,o),hidden:s},t)}},4866:(e,t,s)=>{s.d(t,{Z:()=>S});var r=s(7462),a=s(7294),n=s(6010),o=s(2466),l=s(6550),i=s(1980),c=s(7392),d=s(12);function u(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:s,attributes:r,default:a}}=e;return{value:t,label:s,attributes:r,default:a}}))}function p(e){const{values:t,children:s}=e;return(0,a.useMemo)((()=>{const e=t??u(s);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,s])}function m(e){let{value:t,tabValues:s}=e;return s.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:s}=e;const r=(0,l.k6)(),n=function(e){let{queryString:t=!1,groupId:s}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:t,groupId:s});return[(0,i._X)(n),(0,a.useCallback)((e=>{if(!n)return;const t=new URLSearchParams(r.location.search);t.set(n,e),r.replace({...r.location,search:t.toString()})}),[n,r])]}function f(e){const{defaultValue:t,queryString:s=!1,groupId:r}=e,n=p(e),[o,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=s.find((e=>e.default))??s[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:n}))),[i,c]=h({queryString:s,groupId:r}),[u,f]=function(e){let{groupId:t}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,n]=(0,d.Nk)(s);return[r,(0,a.useCallback)((e=>{s&&n.set(e)}),[s,n])]}({groupId:r}),g=(()=>{const e=i??u;return m({value:e,tabValues:n})?e:null})();(0,a.useLayoutEffect)((()=>{g&&l(g)}),[g]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:n}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),f(e)}),[c,f,n]),tabValues:n}}var g=s(2389);const v="tabList__CuJ",y="tabItem_LNqP";function k(e){let{className:t,block:s,selectedValue:l,selectValue:i,tabValues:c}=e;const d=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),p=e=>{const t=e.currentTarget,s=d.indexOf(t),r=c[s].value;r!==l&&(u(t),i(r))},m=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const s=d.indexOf(e.currentTarget)+1;t=d[s]??d[0];break}case"ArrowLeft":{const s=d.indexOf(e.currentTarget)-1;t=d[s]??d[d.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,n.Z)("tabs",{"tabs--block":s},t)},c.map((e=>{let{value:t,label:s,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>d.push(e),onKeyDown:m,onClick:p},o,{className:(0,n.Z)("tabs__item",y,o?.className,{"tabs__item--active":l===t})}),s??t)})))}function b(e){let{lazy:t,children:s,selectedValue:r}=e;const n=(Array.isArray(s)?s:[s]).filter(Boolean);if(t){const e=n.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function w(e){const t=f(e);return a.createElement("div",{className:(0,n.Z)("tabs-container",v)},a.createElement(k,(0,r.Z)({},e,t)),a.createElement(b,(0,r.Z)({},e,t)))}function S(e){const t=(0,g.Z)();return a.createElement(w,(0,r.Z)({key:String(t)},e))}},7778:(e,t,s)=>{s.d(t,{Z:()=>g});var r=s(7462),a=s(7294);async function n(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:s="https://livecodes.io/",params:r={},config:a={},import:n,lite:o,loading:l="lazy",template:i,view:c="split"}=t,d="headless"===c;let u,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!d||"object"!=typeof e)throw new Error("A valid container element is required.");if(!p){if(!d)throw new Error(`Cannot find element: "${e}"`);p=document.createElement("div"),C(p),document.body.appendChild(p)}try{u=new URL(s)}catch{throw new Error(`"${s}" is not a valid URL.`)}const m=u.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{u.searchParams.set(e,String(r[e]))})),"string"==typeof a)try{new URL(a),u.searchParams.set("config",a)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof a)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(a).length>0&&u.searchParams.set("config","sdk")}i&&u.searchParams.set("template",i),n&&u.searchParams.set("x",n),o&&u.searchParams.set("lite","true"),u.searchParams.set("embed","true"),u.searchParams.set("loading",d?"eager":l),u.searchParams.set("view",c);let h=!1;const f="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!p)return;const t=p.dataset.height||p.style.height;if(t&&!d){const e=isNaN(Number(t))?t:t+"px";p.style.height=e}"false"===p.dataset.defaultStyles||d||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="5px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");const s=document.createElement("iframe");s.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),s.setAttribute("allowtransparency","true"),s.setAttribute("allowpaymentrequest","true"),s.setAttribute("allowfullscreen","true"),s.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const r="eager"===l?"eager":"lazy";s.setAttribute("loading",r),s.classList.add("livecodes"),d?C(s):(s.style.height="100%",s.style.minHeight="200px",s.style.width="100%",s.style.margin="0",s.style.border="0",s.style.borderRadius=p.style.borderRadius),addEventListener("message",(function e(t){t.source===s.contentWindow&&t.origin===m&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),s.contentWindow?.postMessage({type:"livecodes-config",payload:a},m))})),s.onload=()=>{e(s)},s.src=u.href,p.appendChild(s)})),v=new Promise((e=>{addEventListener("message",(function t(s){s.source===g.contentWindow&&s.origin===m&&"livecodes-ready"===s.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),y=()=>h?Promise.reject(f):new Promise((async e=>{v.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},m),await v,e()})),k=(e,t)=>new Promise((async(s,r)=>{if(h)return r(f);await y();const a=E();addEventListener("message",(function t(n){if(n.source===g.contentWindow&&n.origin===m&&"livecodes-api-response"===n.data?.type&&n.data?.id===a&&n.data.method===e){removeEventListener("message",t);const e=n.data.payload;e?.error?r(e.error):s(e)}})),g.contentWindow?.postMessage({method:e,id:a,args:t},m)})),b={},w=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(h)throw new Error(f);return w.includes(e)?(k("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter((e=>e!==t)),0===b[e]?.length&&k("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==g.contentWindow||e.origin!==m||!t||!b[t])return;const s=e.data?.payload;b[t]?.forEach((e=>{e(s)}))}));const N=()=>{Object.values(b).forEach((e=>{e.length=0})),g?.remove?.(),h=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await y(),t.unobserve(p))}))}),{rootMargin:"150px"}).observe(p)}function C(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const E=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>y(),run:()=>k("run"),format:e=>k("format",[e]),getShareUrl:e=>k("getShareUrl",[e]),getConfig:e=>k("getConfig",[e]),setConfig:e=>k("setConfig",[e]),getCode:()=>k("getCode"),show:(e,t)=>k("show",[e,t]),runTests:()=>k("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,s=new Array(t>1?t-1:0),r=1;r<t;r++)s[r-1]=arguments[r];return k("exec",[e,...s])},destroy:()=>v.settled?k("destroy").then(N):h?Promise.reject(f):(N(),Promise.resolve())}}function o(e){const{className:t,style:s,height:r,sdkReady:o,...l}=e,i=(0,a.useRef)(null);let c;return(0,a.useEffect)((()=>{if(i.current)return n(i.current,l).then((e=>{c=e,"function"==typeof o&&o(e)})),()=>{c?.destroy()}}),[]),a.createElement("div",{ref:i,className:t,style:s,"data-height":r})}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const s=e.dataset.options;if(s)try{t=JSON.parse(s)}catch{}let r;const a=e.dataset.config||e.dataset.prefill;if(a)try{r=JSON.parse(a)}catch{}n(e,{import:"dom/"+encodeURIComponent(e.outerHTML),...t,...r?{config:r}:{}})}))}));var l=s(1446),i=s(412),c=s(814),d=s(4866),u=s(5162),p=s(2134),m=s(420);function h(e){const[t,s]=(0,a.useState)(e.js),[r,n]=(0,a.useState)(e.ts),[o,l]=(0,a.useState)(e.react),[h,f]=(0,a.useState)(e.vue),[g,v]=(0,a.useState)(e.svelte),y="3.7rem",[k,b]=(0,a.useState)(!0),[w,S]=(0,a.useState)(y),N=(0,a.useRef)(null),C=()=>{setTimeout((()=>{S(`calc(${N.current.offsetHeight}px + ${y})`)}),5),setTimeout((()=>{S(`calc(${N.current.offsetHeight}px + ${y})`)}),255)};return(0,a.useEffect)((()=>{if(i.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),n(e(r,"ts")),l(e(o,"jsx")),f(e(h,"html")),v(e(g,"html"))}}),[]),a.createElement("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":k,style:{height:k?y:w,overflow:"hidden",willChange:"height",transition:`height ${k?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},a.createElement("summary",{onClick:()=>{b(!k),C()}},"show code"),a.createElement("div",{ref:N,style:{display:"block",overflow:"hidden"}},a.createElement("div",{className:p.Z.collapsibleContent},a.createElement(d.Z,{groupId:"sdk-code"},a.createElement(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:C}},a.createElement(c.Z,{language:"js"},t)),a.createElement(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:C}},a.createElement(c.Z,{language:"ts"},r)),a.createElement(u.Z,{value:"react",label:"React",attributes:{onMouseDown:C}},a.createElement(c.Z,{language:"jsx"},o)),a.createElement(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:C}},a.createElement(c.Z,{language:"html"},h)),a.createElement(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:C}},a.createElement(c.Z,{language:"html"},g))))))}const f="container_Egsj";function g(e){const{className:t,style:s,showCode:n,height:i,...c}=e,d=e=>JSON.stringify(e,null,2),u=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),p=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),g=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return a.createElement(a.Fragment,null,a.createElement(o,(0,r.Z)({className:`${f} ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:l.G},e)),!1!==e.showCode&&a.createElement(h,{js:u,ts:p,react:m,vue:g,svelte:v}))}},3508:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var r=s(7462),a=(s(7294),s(3905)),n=s(7778);const o={},l="CSS",i={unversionedId:"features/css",id:"features/css",title:"CSS",description:"The result page can be styled with CSS using various methods, including:",source:"@site/docs/features/css.md",sourceDirName:"features",slug:"/features/css",permalink:"/livecodes/docs/features/css",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/css.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Templates",permalink:"/livecodes/docs/features/templates"},next:{title:"Result Page",permalink:"/livecodes/docs/features/result"}},c={},d=[{value:"Style Editor",id:"style-editor",level:2},{value:"Languages",id:"languages",level:3},{value:"CSS Processors",id:"css-processors",level:3},{value:"Style Imports",id:"style-imports",level:3},{value:"Example",id:"example",level:4},{value:"Compiled CSS",id:"compiled-css",level:3},{value:"Auto-update",id:"auto-update",level:3},{value:"External Resources",id:"external-resources",level:2},{value:"CSS Presets",id:"css-presets",level:2},{value:"Stylesheets Imported in Script Editor",id:"stylesheets-imported-in-script-editor",level:2},{value:"External Stylesheets",id:"external-stylesheets",level:3},{value:"<code>./style.css</code>",id:"stylecss",level:3},{value:"CSS Modules",id:"css-modules",level:2},{value:"CSS Frameworks",id:"css-frameworks",level:2},{value:"Styles in Markup &amp; Script",id:"styles-in-markup--script",level:2},{value:"Related",id:"related",level:2}],u={toc:d};function p(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"css"},"CSS"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," can be styled with CSS using various methods, including:"),(0,a.kt)("h2",{id:"style-editor"},"Style Editor"),(0,a.kt)("p",null,"Code added to ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/projects#style-editor"},"style editor")," is ",(0,a.kt)("a",{parentName:"p",href:"#languages"},"compiled")," and ",(0,a.kt)("a",{parentName:"p",href:"#css-processors"},"processed"),", then added as CSS to the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," ",(0,a.kt)("inlineCode",{parentName:"p"},"head")," element."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"LiveCodes styles",src:s(6156).Z,width:"3200",height:"1800"})),(0,a.kt)("h3",{id:"languages"},"Languages"),(0,a.kt)("p",null,"LiveCodes supports multiple languages that compile to CSS, including ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/scss"},"SCSS"),", ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/sass"},"Sass"),", ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/less"},"Less")," and ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/stylus"},"Stylus"),". Code authored in any of these languages is compiled to CSS before being added to the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page"),"."),(0,a.kt)("p",null,"The style language can be selected from the style editor menu. In embedded playgrounds, the language can be configured via the configuration object property ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#style"},(0,a.kt)("inlineCode",{parentName:"a"},"style.language"))),(0,a.kt)("h3",{id:"css-processors"},"CSS Processors"),(0,a.kt)("p",null,"The (compiled) CSS code can be processed by one or more of the supported CSS processors. Examples of these include: ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/autoprefixer"},"Autoprefixer"),", ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/postcssPresetEnv"},"postcss-preset-env"),", ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/lightningcss"},"Lightning CSS"),", ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/cssmodules"},"CSS Modules"),", ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/cssnano"},"cssnano"),", ...etc."),(0,a.kt)("p",null,"Multiple CSS processors can be enabled at the same time. The code is processed in the order of processors placed in the style editor menu of the app."),(0,a.kt)("p",null,"Processors are enabled in the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/getting-started#standalone-app"},"standalone app")," from the style editor menu, by switching on the toggles of the required processors."),(0,a.kt)("p",null,"In embedded playgrounds, processors are enabled via the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#processors"},(0,a.kt)("inlineCode",{parentName:"a"},"processors"))," property of the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object"),"."),(0,a.kt)("h3",{id:"style-imports"},"Style Imports"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#bare-module-imports"},"Bare modules")," used with ",(0,a.kt)("inlineCode",{parentName:"p"},"@import")," rules are supposed to be npm modules. These are converted to ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#cdn-providers"},"full URLs from CDN"),"."),(0,a.kt)("h4",{id:"example"},"Example"),(0,a.kt)("p",null,"This code:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-css"},"@import 'github-markdown-css/github-markdown.css';\n")),(0,a.kt)("p",null,"becomes:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-css"},"@import 'https://unpkg.com/github-markdown-css/github-markdown.css';\n")),(0,a.kt)("p",null,"Packages that specify a stylesheet as the main module can be imported like that:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-css"},"@import 'github-markdown-css';\n")),(0,a.kt)("p",null,"demo:"),(0,a.kt)(n.Z,{template:"markdown",params:{activeEditor:"style",compiled:"open"},mdxType:"LiveCodes"}),(0,a.kt)("p",null,"The content can be inlined in the compiled CSS by enabling the processor ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/postcssImportUrl"},"postcss-import-url"),"."),(0,a.kt)("h3",{id:"compiled-css"},"Compiled CSS"),(0,a.kt)("p",null,"Compiled CSS (following compilation of style language, and all enabled processors) is added to the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," ",(0,a.kt)("inlineCode",{parentName:"p"},"head")," element."),(0,a.kt)("p",null,"The compiled code can be inspected in the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/compiled-code"},"compiled code viewer")," in the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/tools-pane"},"tools pane"),"."),(0,a.kt)("h3",{id:"auto-update"},"Auto-update"),(0,a.kt)("p",null,"When ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#autoupdate"},(0,a.kt)("inlineCode",{parentName:"a"},"autoupdate"))," is enabled (default), in contrast to ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/projects#markup-editor"},"markup editor")," and ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/projects#script-editor"},"script editor"),", changes in style editor code does NOT trigger a full reload of the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page"),". The updated CSS code is sent to the page and applied without a reload."),(0,a.kt)("p",null,"The page can be force-reloaded by clicking the run button or using the keyboard shortcut: ",(0,a.kt)("kbd",null,"Shift"),"\xa0","+","\xa0",(0,a.kt)("kbd",null,"Enter"),"."),(0,a.kt)("h2",{id:"external-resources"},"External Resources"),(0,a.kt)("p",null,"External stylesheets can be added in ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources"},"external resources")," screen. These are added to the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," before the compiled style editor code. This allows code in style editor to override CSS properties in external stylesheets."),(0,a.kt)("p",null,"External stylesheets can be added to embedded playgrounds using the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object")," property ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#stylesheets"},(0,a.kt)("inlineCode",{parentName:"a"},"stylesheets")),"."),(0,a.kt)("h2",{id:"css-presets"},"CSS Presets"),(0,a.kt)("p",null,"CSS presets like ",(0,a.kt)("a",{parentName:"p",href:"https://necolas.github.io/normalize.css/"},"Normalize.css")," and ",(0,a.kt)("a",{parentName:"p",href:"https://meyerweb.com/eric/tools/css/reset/"},"Reset CSS")," can be selected in ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources#css-presets"},"external resources")," screen."),(0,a.kt)("h2",{id:"stylesheets-imported-in-script-editor"},"Stylesheets Imported in Script Editor"),(0,a.kt)("h3",{id:"external-stylesheets"},"External Stylesheets"),(0,a.kt)("p",null,"CSS stylesheets imported in the script editor are added to the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," ",(0,a.kt)("inlineCode",{parentName:"p"},"head")," element. ",(0,a.kt)("em",{parentName:"p"},"The URL has to end with ",(0,a.kt)("strong",{parentName:"em"},(0,a.kt)("inlineCode",{parentName:"strong"},".css")," extension")),"."),(0,a.kt)("p",null,"For example, adding this in the script editor (JavaScript):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import 'https://unpkg.com/github-markdown-css/github-markdown.css';\n")),(0,a.kt)("p",null,"adds this to the page ",(0,a.kt)("inlineCode",{parentName:"p"},"head"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<link rel="stylesheet" href="https://unpkg.com/github-markdown-css/github-markdown.css" />\n')),(0,a.kt)("p",null,"Currently, compiling imported stylesheets (e.g. SCSS) is not supported."),(0,a.kt)("p",null,"Similar to ",(0,a.kt)("a",{parentName:"p",href:"#style-imports"},"imports in style editor"),", bare imports are converted to full URLs from CDN."),(0,a.kt)("p",null,"For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import 'github-markdown-css/github-markdown.css';\n")),(0,a.kt)("p",null,"becomes:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<link rel="stylesheet" href="https://unpkg.com/github-markdown-css/github-markdown.css" />\n')),(0,a.kt)("h3",{id:"stylecss"},(0,a.kt)("inlineCode",{parentName:"h3"},"./style.css")),(0,a.kt)("p",null,"Importing the URLs (",(0,a.kt)("inlineCode",{parentName:"p"},"./style.css")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"./styles.css"),") gets the style editor compiled/processed CSS ",(0,a.kt)("strong",{parentName:"p"},"string")," as the module's default export."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import styles from './style.css';\n\nconsole.log(styles); // => compiled CSS as string\n")),(0,a.kt)("h2",{id:"css-modules"},"CSS Modules"),(0,a.kt)("p",null,"CSS modules are supported and are ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/cssmodules"},"documented separately"),"."),(0,a.kt)("h2",{id:"css-frameworks"},"CSS Frameworks"),(0,a.kt)("p",null,"Multiple CSS frameworks are supported including ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/tailwindcss"},"Tailwind CSS"),", ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/unocss"},"UnoCSS")," and ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/windicss"},"WindiCSS"),"."),(0,a.kt)("h2",{id:"styles-in-markup--script"},"Styles in Markup & Script"),(0,a.kt)("p",null,"Of course, styles and stylesheets can still be added as usual in markup and script editors (via HTML elements and/or DOM)."),(0,a.kt)("h2",{id:"related"},"Related"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/projects"},"Projects")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/external-resources"},"External resources")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/module-resolution"},"Module resolution"))))}p.isMDXComponent=!0},420:(e,t,s)=>{s.d(t,{Z:()=>r});const r={details:"details_sGeq"}},2134:(e,t,s)=>{s.d(t,{Z:()=>r});const r={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}},6156:(e,t,s)=>{s.d(t,{Z:()=>r});const r=s.p+"assets/images/css-processors-73160b6e6162c8ce5f58b896af38b587.png"}}]);