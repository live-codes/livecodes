"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[82],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var a=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,s=e.mdxType,o=e.originalType,i=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),p=c(n),u=s,g=p["".concat(i,".").concat(u)]||p[u]||m[u]||o;return n?a.createElement(g,l(l({ref:t},d),{},{components:n})):a.createElement(g,l({ref:t},d))}));function g(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=n.length,l=new Array(o);l[0]=u;var r={};for(var i in t)hasOwnProperty.call(t,i)&&(r[i]=t[i]);r.originalType=e,r[p]="string"==typeof e?e:s,l[1]=r;for(var c=2;c<o;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>h});var a=n(7462),s=n(7294),o=n(9493);function l(e){const t=(0,s.useRef)(null),[n,a]=(0,s.useState)(e.className||""),[l,r]=(0,s.useState)(e.style||{}),[i,c]=(0,s.useState)(e.height),[d,p]=(0,s.useState)(),[m,u]=(0,s.useState)(JSON.stringify(e.config||"")),[g,f]=(0,s.useState)("");return(0,s.useEffect)((()=>{if(!t.current)return;const{className:n,style:s,height:l,sdkReady:i,config:h,...y}=e;if(a(n||""),r(s||{}),c(l),d&&g===JSON.stringify(y)){if(m===JSON.stringify(h))return;u(JSON.stringify(h)),"string"==typeof h?fetch(h).then((e=>e.json())).then((e=>{d?.setConfig(e)})):h&&d.setConfig(h)}else f(JSON.stringify(y)),d?.destroy(),(0,o.T)(t.current,{config:h,...y}).then((e=>{p(e),"function"==typeof i&&i(e)}))}),[e]),(0,s.useEffect)((()=>()=>{d?.destroy()}),[]),s.createElement("div",{ref:t,className:n,style:l,"data-height":i})}var r=n(1446),i=n(412),c=n(814),d=n(4866),p=n(5162),m=n(2134),u=n(420);function g(e){const[t,n]=(0,s.useState)(e.js),[a,o]=(0,s.useState)(e.ts),[l,r]=(0,s.useState)(e.react),[g,f]=(0,s.useState)(e.vue),[h,y]=(0,s.useState)(e.svelte),v="3.7rem",[k,b]=(0,s.useState)(!0),[N,S]=(0,s.useState)(v),x=(0,s.useRef)(null),w=()=>{setTimeout((()=>{S(`calc(${x.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{S(`calc(${x.current.offsetHeight}px + ${v})`)}),255)};return(0,s.useEffect)((()=>{if(i.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),o(e(a,"ts")),r(e(l,"jsx")),f(e(g,"html")),y(e(h,"html"))}}),[]),s.createElement("details",{className:`alert alert--info ${m.Z.details} ${u.Z.details}`,"data-collapsed":k,style:{height:k?v:N,overflow:"hidden",willChange:"height",transition:`height ${k?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},s.createElement("summary",{onClick:()=>{b(!k),w()}},"show code"),s.createElement("div",{ref:x,style:{display:"block",overflow:"hidden"}},s.createElement("div",{className:m.Z.collapsibleContent},s.createElement(d.Z,{groupId:"sdk-code"},s.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:w}},s.createElement(c.Z,{language:"js"},t)),s.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:w}},s.createElement(c.Z,{language:"ts"},a)),s.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:w}},s.createElement(c.Z,{language:"jsx"},l)),s.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:w}},s.createElement(c.Z,{language:"html"},g)),s.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:w}},s.createElement(c.Z,{language:"html"},h))))))}const f="container_Egsj";function h(e){const{className:t,style:n,showCode:o,height:i,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return s.createElement(s.Fragment,null,s.createElement(l,(0,a.Z)({className:`${f} ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:r.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&s.createElement(g,{js:p,ts:m,react:u,vue:h,svelte:y}))}},9493:(e,t,n)=>{n.d(t,{T:()=>s,r:()=>o});var a=n(7728);async function s(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:a={},config:s={},import:o,headless:l,lite:r,loading:i="lazy",template:c,view:d}=t,p=l||"headless"===d;let m,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!u){if(!p)throw new Error(`Cannot find element: "${e}"`);u=document.createElement("div"),C(u),document.body.appendChild(u)}try{m=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const g=m.origin;if("object"==typeof a&&Object.keys(a).forEach((e=>{m.searchParams.set(e,String(a[e]))})),c&&m.searchParams.set("template",c),o&&m.searchParams.set("x",o),p&&m.searchParams.set("headless","true"),r&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof s&&null==s.mode?s.mode="lite":m.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof s&&null==s.view&&"headless"!==d?s.view=d:m.searchParams.set("view",d)),"string"==typeof s)try{new URL(s),m.searchParams.set("config",s)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof s)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(s).length>0&&m.searchParams.set("config","sdk")}m.searchParams.set("embed","true"),m.searchParams.set("loading",p?"eager":i);let f=!1;const h="Cannot call API methods after calling `destroy()`.",y=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"===u.dataset.defaultStyles||p||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="8px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");const n="livecodes",a=u.querySelector(`iframe.${n}`),o=a||document.createElement("iframe");o.classList.add(n),o.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),o.setAttribute("allowtransparency","true"),o.setAttribute("allowpaymentrequest","true"),o.setAttribute("allowfullscreen","true"),o.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const l="eager"===i?"eager":"lazy";o.setAttribute("loading",l),p?C(o):(o.style.height="100%",o.style.minHeight="200px",o.style.width="100%",o.style.margin="0",o.style.border="0",o.style.borderRadius=u.style.borderRadius),addEventListener("message",(function e(t){t.source===o.contentWindow&&t.origin===g&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),o.contentWindow?.postMessage({type:"livecodes-config",payload:s},g))})),o.onload=()=>{e(o)},o.src=m.href,a||u.appendChild(o)})),v=new Promise((e=>{addEventListener("message",(function t(n){n.source===y.contentWindow&&n.origin===g&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),k=()=>f?Promise.reject(h):new Promise((async e=>{v.settled&&e();y.contentWindow?.postMessage({type:"livecodes-load"},g),await v,e()})),b=(e,t)=>new Promise((async(n,a)=>{if(f)return a(h);await k();const s=T();addEventListener("message",(function t(o){if(o.source===y.contentWindow&&o.origin===g&&"livecodes-api-response"===o.data?.type&&o.data?.id===s&&o.data.method===e){removeEventListener("message",t);const e=o.data.payload;e?.error?a(e.error):n(e)}})),y.contentWindow?.postMessage({method:e,id:s,args:t},g)})),N={},S=["load","ready","code","console","tests","destroy"],x=(e,t)=>{if(f)throw new Error(h);return S.includes(e)?(b("watch",[e]),N[e]||(N[e]=[]),N[e]?.push(t),{remove:()=>{N[e]=N[e]?.filter((e=>e!==t)),0===N[e]?.length&&b("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==y.contentWindow||e.origin!==g||!t||!N[t])return;const n=e.data?.payload;N[t]?.forEach((e=>{e(n)}))}));const w=()=>{Object.values(N).forEach((e=>{e.length=0})),y?.remove?.(),f=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await k(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}function C(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const T=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>x("code",e),watch:x,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return b("exec",[e,...n])},destroy:()=>v.settled?b("destroy").then(w):f?Promise.reject(h):(w(),Promise.resolve())}}function o(e){void 0===e&&(e={});const{appUrl:t,params:n,config:s,import:o,...l}=e,r="string"==typeof s?{config:s}:"object"==typeof s?{x:"code/"+(0,a.compressToEncodedURIComponent)(JSON.stringify(s))}:{},i=new URLSearchParams(JSON.parse(JSON.stringify({...l,...n,x:o,...r}))).toString();return(t||"https://livecodes.io")+(i?"?"+i:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let a;const o=e.dataset.config||e.dataset.prefill;if(o)try{a=JSON.parse(o)}catch{}const l=encodeURIComponent(e.outerHTML);e.innerHTML="",s(e,{import:"dom/"+l,...t,...a?{config:a}:{}})}))}))},7320:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>f,frontMatter:()=>i,metadata:()=>d,params:()=>u,toc:()=>m});var a=n(7462),s=(n(7294),n(3905)),o=n(4866),l=n(5162),r=n(325);const i={},c="CSS Modules",d={unversionedId:"languages/cssmodules",id:"languages/cssmodules",title:"CSS Modules",description:"A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.",source:"@site/docs/languages/cssmodules.md",sourceDirName:"languages",slug:"/languages/cssmodules",permalink:"/livecodes/docs/languages/cssmodules",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/cssmodules.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"CSS",permalink:"/livecodes/docs/languages/css"},next:{title:"cssnano",permalink:"/livecodes/docs/languages/cssnano"}},p={},m=[{value:"Usage",id:"usage",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Type",id:"type",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Limitations",id:"limitations",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Links",id:"links",level:2}],u={activeEditor:"style",html:'<div class="page">\n <h1>Page Title</h1>\n <p class="small-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur similique facere facilis minima tempora.</p>\n</div>\n',css:":global .page {\n padding: 20px;\n}\n\n.text {\n color: black;\n font-family: sans-serif;\n}\n\n.small-text {\n composes: text;\n font-size: 20px;\n}\n\n.large-text {\n composes: text;\n font-size: 40px;\n}\n\n.large-text:hover {\n color: red;\n}\n\n.title {\n composes: large-text;\n color: green;\n}\n",js:"import classes from './style.module.css';\n\ndocument.querySelector('h1').className = classes.title;\nconsole.log(classes);\n",processors:"cssmodules",compiled:"open"},g={toc:m,params:u};function f(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"css-modules"},"CSS Modules"),(0,s.kt)("p",null,"A ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/css-modules/css-modules"},"CSS Module")," is a CSS file in which all class names and animation names are scoped locally by default."),(0,s.kt)("p",null,"The selector names are unique to avoid naming collision. They can then be imported as a JavaScript object."),(0,s.kt)("h2",{id:"usage"},"Usage"),(0,s.kt)("p",null,"CSS Modules can be enabled from the style editor menu."),(0,s.kt)("p",null,"Selectors added to the style editor (using any language e.g. CSS, SCSS, Less, etc.) are transformed to unique selectors. The transformed classes are then accessible in the script editor as a JSON object, and are injected into the HTML elements."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Example:")),(0,s.kt)(o.Z,{mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"src-css",label:"Source CSS",default:!0,mdxType:"TabItem"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-css"},":global .page {\n  padding: 20px;\n}\n\n.text {\n  color: black;\n  font-family: sans-serif;\n}\n\n.small-text {\n  composes: text;\n  font-size: 20px;\n}\n\n.large-text {\n  composes: text;\n  font-size: 40px;\n}\n\n.large-text:hover {\n  color: red;\n}\n\n.title {\n  composes: large-text;\n  color: green;\n}\n"))),(0,s.kt)(l.Z,{value:"compiled-css",label:"Compiled CSS",mdxType:"TabItem"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-css"},".page {\n  padding: 20px;\n}\n\n._text_1ygro_9 {\n  color: black;\n  font-family: sans-serif;\n}\n\n._small-text_1ygro_19 {\n  font-size: 20px;\n}\n\n._large-text_1ygro_29 {\n  font-size: 40px;\n}\n\n._large-text_1ygro_29:hover {\n  color: red;\n}\n\n._title_1ygro_47 {\n  color: green;\n}\n"))),(0,s.kt)(l.Z,{value:"json",label:"JSON Object",mdxType:"TabItem"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "text": "_text_1ygro_9",\n  "small-text": "_small-text_1ygro_19 _text_1ygro_9",\n  "large-text": "_large-text_1ygro_29 _text_1ygro_9",\n  "title": "_title_1ygro_47 _large-text_1ygro_29 _text_1ygro_9",\n  "smallText": "_small-text_1ygro_19 _text_1ygro_9",\n  "largeText": "_large-text_1ygro_29 _text_1ygro_9"\n}\n'))),(0,s.kt)(l.Z,{value:"src-html",label:"Source HTML",mdxType:"TabItem"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'<div class="page">\n  <h1>Page Title</h1>\n  <p class="small-text">\n    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non\n    beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur\n    similique facere facilis minima tempora.\n  </p>\n</div>\n'))),(0,s.kt)(l.Z,{value:"compiled-html",label:"Compiled HTML",mdxType:"TabItem"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'<div class="page">\n  <h1>Page Title</h1>\n  <p class="small-text _small-text_1ygro_19 _text_1ygro_9">\n    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non\n    beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur\n    similique facere facilis minima tempora.\n  </p>\n</div>\n')))),(0,s.kt)("p",null,"In the script editor, the JSON object representing the transformed classes can be imported from the relative URLs ",(0,s.kt)("inlineCode",{parentName:"p"},"'./style.module.css'")," or ",(0,s.kt)("inlineCode",{parentName:"p"},"'./styles.module.css'"),"."),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#default_import"},"Default"),", ",(0,s.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#named_import"},"named")," and ",(0,s.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import"},"namespace")," imports are supported. Class names are also available in camelCase (e.g ",(0,s.kt)("inlineCode",{parentName:"p"},".large-text")," becomes ",(0,s.kt)("inlineCode",{parentName:"p"},"largeText"),"). This can be changed by setting ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/madyankin/postcss-modules#localsconvention"},(0,s.kt)("inlineCode",{parentName:"a"},"localsConvention"))," in ",(0,s.kt)("a",{parentName:"p",href:"#custom-settings"},"custom settings"),"."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Example:")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="In script editor (using JS in this case):"',title:'"In',script:!0,editor:!0,"(using":!0,JS:!0,in:!0,this:!0,'case):"':!0},"import classes from './style.module.css';\nimport { smallText } from './styles.module.css';\nimport * as allClasses from './styles.module.css';\n\nconsole.log(classes.title);\n\n// .small-text -> smallText\nconsole.log(smallText);\n\n// .large-text -> largeText\nconsole.log(allClasses.largeText);\n\n// bracket notation for class with dash\nconsole.log(allClasses['large-text']);\n")),(0,s.kt)("p",null,"For full example, see ",(0,s.kt)("a",{parentName:"p",href:"#example-usage"},"example usage")," below."),(0,s.kt)("admonition",{type:"info"},(0,s.kt)("p",{parentName:"admonition"},"CSS Modules has to be enabled (from style editor menu), to be able to import classes in the script editor."),(0,s.kt)("p",{parentName:"admonition"},"Importing a URL that does not include ",(0,s.kt)("inlineCode",{parentName:"p"},".module")," (e.g. ",(0,s.kt)("inlineCode",{parentName:"p"},"./style.css"),") gets the processed CSS ",(0,s.kt)("strong",{parentName:"p"},"string")," as the module's default export."),(0,s.kt)("p",{parentName:"admonition"},"The extension of the style editor language can also be used, in addition to ",(0,s.kt)("inlineCode",{parentName:"p"},".css"),". For example, when using SCSS, importing from any of the following URLs is the same:"),(0,s.kt)("ul",{parentName:"admonition"},(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"./style.module.css")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"./styles.module.css")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"./style.module.scss")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"./styles.module.scss")))),(0,s.kt)("h2",{id:"language-info"},"Language Info"),(0,s.kt)("h3",{id:"name"},"Name"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"cssmodules")),(0,s.kt)("h3",{id:"type"},"Type"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"/livecodes/docs/features/css#css-processors"},"Processor")),(0,s.kt)("h3",{id:"editor"},"Editor"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"style")),(0,s.kt)("h2",{id:"compiler"},"Compiler"),(0,s.kt)("p",null,"The CSS Modules processor is provided using ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/madyankin/postcss-modules"},"postcss-modules")," as a ",(0,s.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/postcss"},"PostCSS")," plugin."),(0,s.kt)("h3",{id:"version"},"Version"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"postcss-modules"),": v6.0.0"),(0,s.kt)("h2",{id:"custom-settings"},"Custom Settings"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"Custom settings")," added to the property ",(0,s.kt)("inlineCode",{parentName:"p"},"cssmodules")," are passed as a JSON object to the ",(0,s.kt)("inlineCode",{parentName:"p"},"postcss-modules")," plugin during compile. Please check the ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/madyankin/postcss-modules#usage"},"documentation")," for full reference."),(0,s.kt)("p",null,"In addition, the following settings are available:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("inlineCode",{parentName:"p"},"addClassesToHTML")),(0,s.kt)("p",{parentName:"li"},"Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"boolean"),". Default: ",(0,s.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,s.kt)("p",{parentName:"li"},"The generated classes are injected into the HTML elements, so the styles are applied without having to assign them using JavaScript.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("inlineCode",{parentName:"p"},"removeOriginalClasses")),(0,s.kt)("p",{parentName:"li"},"Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"boolean"),". Default: ",(0,s.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,s.kt)("p",{parentName:"li"},"When enabled, the original classes are removed from HTML, keeping only the generated classes. Only applies if ",(0,s.kt)("inlineCode",{parentName:"p"},"addClassesToHTML")," is enabled."))),(0,s.kt)("p",null,"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Example:")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "cssmodules": {\n    "exportGlobals": true,\n    "localsConvention": "camelCaseOnly",\n    "addClassesToHTML": false\n  }\n}\n')),(0,s.kt)("h2",{id:"limitations"},"Limitations"),(0,s.kt)("p",null,"Currently, loading external sources in ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/css-modules/css-modules#composing-from-other-files"},(0,s.kt)("inlineCode",{parentName:"a"},"composes"))," is not supported."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-css"},"/* you cannot do this */\n.title {\n  composes: title from 'https://example.com/styles.css';\n}\n")),(0,s.kt)("p",null,"If you get this working, ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/pulls"},"please create a pull request"),"."),(0,s.kt)("h2",{id:"example-usage"},"Example Usage"),(0,s.kt)(r.Z,{params:u,height:"400",mdxType:"LiveCodes"}),(0,s.kt)("h2",{id:"links"},"Links"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://github.com/css-modules/css-modules"},"CSS Modules")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://github.com/madyankin/postcss-modules"},"postcss-modules")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://postcss.org/"},"PostCSS"))))}f.isMDXComponent=!0}}]);