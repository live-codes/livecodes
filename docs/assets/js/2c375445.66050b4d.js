"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4151],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(n),p=a,f=m["".concat(i,".").concat(p)]||m[p]||d[p]||o;return n?r.createElement(f,l(l({ref:t},u),{},{components:n})):r.createElement(f,l({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=p;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[m]="string"==typeof e?e:a,l[1]=s;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1262:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(7294),a=n(2389);function o(e){let{children:t,fallback:n}=e;return(0,a.Z)()?r.createElement(r.Fragment,null,t?.()):n??null}},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(7294),a=n(6010);const o="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o,l),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>E});var r=n(7462),a=n(7294),o=n(6010),l=n(2466),s=n(6550),i=n(1980),c=n(7392),u=n(12);function m(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function d(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(r.location.search);t.set(o,e),r.replace({...r.location,search:t.toString()})}),[o,r])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,o=d(e),[l,s]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[i,c]=f({queryString:n,groupId:r}),[m,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,o]=(0,u.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:r}),h=(()=>{const e=i??m;return p({value:e,tabValues:o})?e:null})();(0,a.useLayoutEffect)((()=>{h&&s(h)}),[h]);return{selectedValue:l,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),c(e),g(e)}),[c,g,o]),tabValues:o}}var h=n(2389);const v="tabList__CuJ",b="tabItem_LNqP";function y(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:m}=(0,l.o5)(),d=e=>{const t=e.currentTarget,n=u.indexOf(t),r=c[n].value;r!==s&&(m(t),i(r))},p=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},c.map((e=>{let{value:t,label:n,attributes:l}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>u.push(e),onKeyDown:p,onClick:d},l,{className:(0,o.Z)("tabs__item",b,l?.className,{"tabs__item--active":s===t})}),n??t)})))}function w(e){let{lazy:t,children:n,selectedValue:r}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function k(e){const t=g(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",v)},a.createElement(y,(0,r.Z)({},e,t)),a.createElement(w,(0,r.Z)({},e,t)))}function E(e){const t=(0,h.Z)();return a.createElement(k,(0,r.Z)({key:String(t)},e))}},5691:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(7462),a=n(7294);const o=async function(e,t){void 0===t&&(t={});const{appUrl:n="https://livecodes.io/",params:r={},config:a={},import:o,lite:l=!1,loading:s="lazy",template:i,view:c="split"}=t;let u,m;if(u="string"==typeof e?document.querySelector(e):e,!e)throw new Error("Container element is required.");if(!u)throw new Error(`Cannot find element: "${e}"`);try{m=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const d=m.origin;if("object"==typeof r&&Object.keys(r).forEach((e=>{m.searchParams.set(e,String(r[e]))})),"string"==typeof a)try{new URL(a),m.searchParams.set("config",a)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof a)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(a).length>0&&m.searchParams.set("config","sdk")}i&&m.searchParams.set("template",i),o&&m.searchParams.set("x",o),m.searchParams.set(l?"lite":"embed","true"),m.searchParams.set("loading",s),m.searchParams.set("view",c);let p=!1;const f="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"!==u.dataset.defaultStyles&&(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="5px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.overflow||="hidden",u.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const r="eager"===s?"eager":"lazy";n.setAttribute("loading",r),n.classList.add("livecodes"),n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=u.style.borderRadius,addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===d&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:a},d))})),n.onload=()=>{e(n)},n.src=m.href,u.innerHTML="",u.appendChild(n)})),h=new Promise((e=>{addEventListener("message",(function t(n){n.source===g.contentWindow&&n.origin===d&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),h.settled=!0)}))})),v=()=>p?Promise.reject(f):new Promise((async e=>{h.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},d),await h,e()})),b=(e,t)=>new Promise((async(n,r)=>{if(p)return r(f);await v(),addEventListener("message",(function t(a){if(a.source===g.contentWindow&&a.origin===d&&"livecodes-api-response"===a.data?.type&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?r(e.error):n(e)}})),g.contentWindow?.postMessage({method:e,args:t},d)}));let y=[];addEventListener("message",(async e=>{if(e.source!==g.contentWindow||e.origin!==d||"livecodes-change"!==e.data?.type)return;const t=await b("getCode"),n=await b("getConfig");y.forEach((e=>{e({code:t,config:n})}))}));const w=()=>{y.length=0,u&&(u.innerHTML=""),p=!0};if("lazy"===s&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}return{load:()=>v(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>(e=>{if(p)throw new Error(f);return y.push(e),{remove:()=>{y=y.filter((t=>t!==e))}}})(e),exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return b("exec",[e,...n])},destroy:()=>h.settled?b("destroy").then(w):p?Promise.reject(f):(w(),Promise.resolve())}};function l(e){const{className:t,style:n,height:r,sdkReady:l,...s}=e,i=(0,a.useRef)(null);let c;return(0,a.useEffect)((()=>{if(i.current)return o(i.current,s).then((e=>{c=e,"function"==typeof l&&l(e)})),()=>{c?.destroy()}}),[]),a.createElement("div",{ref:i,className:t,style:n,"data-height":r})}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let r;const a=e.dataset.config||e.dataset.prefill;if(a)try{r=JSON.parse(a)}catch{}o(e,{import:"dom/"+encodeURIComponent(e.outerHTML),...t,...r?{config:r}:{}})}))}));const s=globalThis.location?.hostname.startsWith("127.0.0.1")||globalThis.location?.hostname.startsWith("localhost")?"http://127.0.0.1:8080/":globalThis.location?.origin||"https://livecodes.io/";var i=n(1262),c=n(452),u=n(4866),m=n(5162),d=n(2134),p=n(420);function f(e){const t="3.7rem",[n,r]=(0,a.useState)(!0),[o,l]=(0,a.useState)(t),s=(0,a.useRef)(null),f=()=>{setTimeout((()=>{l(`calc(${s.current.offsetHeight}px + ${t})`)}),5),setTimeout((()=>{l(`calc(${s.current.offsetHeight}px + ${t})`)}),255)},g=()=>{r(!n),f()};return a.createElement(i.Z,null,(()=>{const r=function(e,t){return void 0===t&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})};return a.createElement("details",{className:`alert alert--info ${d.Z.details} ${p.Z.details}`,"data-collapsed":n,style:{height:n?t:o,overflow:"hidden",willChange:"height",transition:`height ${n?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},a.createElement("summary",{onClick:g},"show code"),a.createElement("div",{ref:s,style:{display:"block",overflow:"hidden"}},a.createElement("div",{className:d.Z.collapsibleContent},a.createElement(u.Z,{groupId:"sdk-code"},a.createElement(m.Z,{value:"js",label:"JS",attributes:{onMouseDown:f}},a.createElement(c.Z,{language:"js"},r(e.js,"js"))),a.createElement(m.Z,{value:"ts",label:"TS",attributes:{onMouseDown:f}},a.createElement(c.Z,{language:"ts"},r(e.ts,"ts"))),a.createElement(m.Z,{value:"react",label:"React",attributes:{onMouseDown:f}},a.createElement(c.Z,{language:"jsx"},r(e.react,"jsx"))),a.createElement(m.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:f}},a.createElement(c.Z,{language:"html"},r(e.vue,"html")))))))}))}const g="container_Egsj";function h(e){const{className:t,style:n,showCode:o,...i}=e,c=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${JSON.stringify(i,null,2)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${JSON.stringify(i,null,2)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport LiveCodes from 'livecodes/react';\nexport default function App() {\n  const options = ${JSON.stringify(i,null,2)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),d=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\nconst options = ${JSON.stringify(i,null,2)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`;return a.createElement(a.Fragment,null,a.createElement(l,(0,r.Z)({className:`${g} ${e.className}`,style:{height:"50vh",...e.style},appUrl:s},e)),!1!==e.showCode&&a.createElement(f,{js:c,ts:u,react:m,vue:d}))}},5088:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>l,metadata:()=>i,params:()=>m,toc:()=>u});var r=n(7462),a=(n(7294),n(3905)),o=n(5691);const l={},s="MJML",i={unversionedId:"languages/mjml",id:"languages/mjml",title:"MJML",description:"MJML is a markup language designed to reduce the pain of coding a responsive email.",source:"@site/docs/languages/mjml.md",sourceDirName:"languages",slug:"/languages/mjml",permalink:"/livecodes/docs/languages/mjml",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/mjml.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"MDX",permalink:"/livecodes/docs/languages/mdx"},next:{title:"Mustache",permalink:"/livecodes/docs/languages/mustache"}},c={},u=[{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Links",id:"links",level:2}],m={mjml:"<mjml>\n\t<mj-body>\n\t\t<mj-section>\n\t\t\t<mj-column>\n\t\t\t\t<mj-text>\n\t\t\t\t\tHello World!\n\t\t\t\t</mj-text>\n\t\t\t</mj-column>\n\t\t</mj-section>\n\t</mj-body>\n</mjml>\n"},d={toc:u,params:m};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"mjml"},"MJML"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://mjml.io/"},"MJML")," is a markup language designed to reduce the pain of coding a responsive email."),(0,a.kt)("h2",{id:"language-info"},"Language Info"),(0,a.kt)("h3",{id:"name"},"Name"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"mjml")),(0,a.kt)("h3",{id:"extension"},"Extension"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},".mjml")),(0,a.kt)("h3",{id:"editor"},"Editor"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"markup")),(0,a.kt)("h2",{id:"compiler"},"Compiler"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/mjml-browser"},"browser build")," of the official ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mjmlio/mjml"},"MJML compiler"),"."),(0,a.kt)("h3",{id:"version"},"Version"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"mjml-browser"),": v4.14.1"),(0,a.kt)("h2",{id:"custom-settings"},"Custom Settings"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"Custom settings")," added to the property ",(0,a.kt)("inlineCode",{parentName:"p"},"mjml")," are passed as a JSON object to the mjml compiler. Please check the ",(0,a.kt)("a",{parentName:"p",href:"https://documentation.mjml.io/#inside-node-js"},"documentation")," for full reference."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Example:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "mjml": {\n    "keepComments": false,\n    "minify": true\n  }\n}\n')),(0,a.kt)("h2",{id:"example-usage"},"Example Usage"),(0,a.kt)(o.Z,{params:m,mdxType:"LiveCodes"}),(0,a.kt)("p",null,"This playground loads a template from the official MJML ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mjmlio/email-templates"},"email templates"),":"),(0,a.kt)(o.Z,{import:"https://github.com/mjmlio/email-templates/blob/master/templates/onepage.mjml",height:"400",mdxType:"LiveCodes"}),(0,a.kt)("h2",{id:"links"},"Links"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://mjml.io/"},"MJML official website"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://documentation.mjml.io/"},"MJML documentation"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/mjmlio/mjml"},"MJML GitHub repo"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://mjml.io/templates"},"Official email templates")))))}p.isMDXComponent=!0},420:(e,t,n)=>{n.d(t,{Z:()=>r});const r={details:"details_sGeq"}},2134:(e,t,n)=>{n.d(t,{Z:()=>r});const r={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}}}]);