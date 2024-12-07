"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8356],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),d=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=d(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=d(n),u=r,h=p["".concat(l,".").concat(u)]||p[u]||m[u]||a;return n?o.createElement(h,s(s({ref:t},c),{},{components:n})):o.createElement(h,s({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:r,s[1]=i;for(var d=2;d<a;d++)s[d]=n[d];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},325:(e,t,n)=>{n.d(t,{Z:()=>f});var o=n(7462),r=n(7294),a=n(9493);function s(e){const t=(0,r.useRef)(null),[n,o]=(0,r.useState)(e.className||""),[s,i]=(0,r.useState)(e.style||{}),[l,d]=(0,r.useState)(e.height),[c,p]=(0,r.useState)(),[m,u]=(0,r.useState)(JSON.stringify(e.config||"")),[h,g]=(0,r.useState)("");return(0,r.useEffect)((()=>{if(!t.current)return;const{className:n,style:r,height:s,sdkReady:l,config:f,...y}=e;if(o(n||""),i(r||{}),d(s),c&&h===JSON.stringify(y)){if(m===JSON.stringify(f))return;u(JSON.stringify(f)),"string"==typeof f?fetch(f).then((e=>e.json())).then((e=>{c?.setConfig(e)})):f&&c.setConfig(f)}else g(JSON.stringify(y)),c?.destroy(),(0,a.T)(t.current,{config:f,...y}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,r.useEffect)((()=>()=>{c?.destroy()}),[]),r.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),d=n(814),c=n(4866),p=n(5162),m=n(2134),u=n(420);function h(e){const[t,n]=(0,r.useState)(e.js),[o,a]=(0,r.useState)(e.ts),[s,i]=(0,r.useState)(e.react),[h,g]=(0,r.useState)(e.vue),[f,y]=(0,r.useState)(e.svelte),v="3.7rem",[w,k]=(0,r.useState)(!0),[b,C]=(0,r.useState)(v),x=(0,r.useRef)(null),j=()=>{setTimeout((()=>{C(`calc(${x.current.offsetHeight}px + ${v})`)}),5),setTimeout((()=>{C(`calc(${x.current.offsetHeight}px + ${v})`)}),255)};return(0,r.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),a(e(o,"ts")),i(e(s,"jsx")),g(e(h,"html")),y(e(f,"html"))}}),[]),r.createElement("details",{className:`alert alert--info ${m.Z.details} ${u.Z.details}`,"data-collapsed":w,style:{height:w?v:b,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},r.createElement("summary",{onClick:()=>{k(!w),j()}},"show code"),r.createElement("div",{ref:x,style:{display:"block",overflow:"hidden"}},r.createElement("div",{className:m.Z.collapsibleContent},r.createElement(c.Z,{groupId:"sdk-code"},r.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:j}},r.createElement(d.Z,{language:"js"},t)),r.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:j}},r.createElement(d.Z,{language:"ts"},o)),r.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:j}},r.createElement(d.Z,{language:"jsx"},s)),r.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:j}},r.createElement(d.Z,{language:"html"},h)),r.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:j}},r.createElement(d.Z,{language:"html"},f))))))}const g="container_Egsj";function f(e){const{className:t,style:n,showCode:a,height:l,...d}=e,c=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${c(d)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${c(d)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${c(d)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),f=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${c(d)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,y=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nconst options = ${c(d)};\nlet container;\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return r.createElement(r.Fragment,null,r.createElement(s,(0,o.Z)({className:`${g} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(166, 40%, 50%",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&r.createElement(h,{js:p,ts:m,react:u,vue:f,svelte:y}))}},9493:(e,t,n)=>{n.d(t,{T:()=>r,r:()=>a});var o=n(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:o={},config:r={},import:a,lite:s,loading:i="lazy",template:l,view:d="split"}=t,c="headless"===d;let p,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!c||"object"!=typeof e)throw new Error("A valid container element is required.");if(!m){if(!c)throw new Error(`Cannot find element: "${e}"`);m=document.createElement("div"),j(m),document.body.appendChild(m)}try{p=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const u=p.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{p.searchParams.set(e,String(o[e]))})),"string"==typeof r)try{new URL(r),p.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&p.searchParams.set("config","sdk")}l&&p.searchParams.set("template",l),a&&p.searchParams.set("x",a),s&&p.searchParams.set("lite","true"),p.searchParams.set("embed","true"),p.searchParams.set("loading",c?"eager":i),p.searchParams.set("view",d);let h=!1;const g="Cannot call API methods after calling `destroy()`.",f=await new Promise((e=>{if(!m)return;const t=m.dataset.height||m.style.height;if(t&&!c){const e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||c||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");const n=document.createElement("iframe");n.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const o="eager"===i?"eager":"lazy";n.setAttribute("loading",o),n.classList.add("livecodes"),c?j(n):(n.style.height="100%",n.style.minHeight="200px",n.style.width="100%",n.style.margin="0",n.style.border="0",n.style.borderRadius=m.style.borderRadius),addEventListener("message",(function e(t){t.source===n.contentWindow&&t.origin===u&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),n.contentWindow?.postMessage({type:"livecodes-config",payload:r},u))})),n.onload=()=>{e(n)},n.src=p.href,m.appendChild(n)})),y=new Promise((e=>{addEventListener("message",(function t(n){n.source===f.contentWindow&&n.origin===u&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),y.settled=!0)}))})),v=()=>h?Promise.reject(g):new Promise((async e=>{y.settled&&e();f.contentWindow?.postMessage({type:"livecodes-load"},u),await y,e()})),w=(e,t)=>new Promise((async(n,o)=>{if(h)return o(g);await v();const r=E();addEventListener("message",(function t(a){if(a.source===f.contentWindow&&a.origin===u&&"livecodes-api-response"===a.data?.type&&a.data?.id===r&&a.data.method===e){removeEventListener("message",t);const e=a.data.payload;e?.error?o(e.error):n(e)}})),f.contentWindow?.postMessage({method:e,id:r,args:t},u)})),k={},b=["load","ready","code","console","tests","destroy"],C=(e,t)=>{if(h)throw new Error(g);return b.includes(e)?(w("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter((e=>e!==t)),0===k[e]?.length&&w("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==f.contentWindow||e.origin!==u||!t||!k[t])return;const n=e.data?.payload;k[t]?.forEach((e=>{e(n)}))}));const x=()=>{Object.values(k).forEach((e=>{e.length=0})),f?.remove?.(),h=!0};if("lazy"===i&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await v(),t.unobserve(m))}))}),{rootMargin:"150px"}).observe(m)}function j(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const E=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>w("run"),format:e=>w("format",[e]),getShareUrl:e=>w("getShareUrl",[e]),getConfig:e=>w("getConfig",[e]),setConfig:e=>w("setConfig",[e]),getCode:()=>w("getCode"),show:(e,t)=>w("show",[e,t]),runTests:()=>w("runTests"),onChange:e=>C("code",e),watch:C,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return w("exec",[e,...n])},destroy:()=>y.settled?w("destroy").then(x):h?Promise.reject(g):(x(),Promise.resolve())}}function a(e){void 0===e&&(e={});const{appUrl:t,params:n,config:r,import:a,...s}=e,i="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:a,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o;const a=e.dataset.config||e.dataset.prefill;if(a)try{o=JSON.parse(a)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+s,...t,...o?{config:o}:{}})}))}))},6491:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>g,frontMatter:()=>s,mdDemo:()=>p,mdxDemo:()=>m,metadata:()=>l,pyDemo:()=>u,toc:()=>c});var o=n(7462),r=(n(7294),n(3905)),a=n(325);const s={},i="Headless Mode",l={unversionedId:"sdk/headless",id:"sdk/headless",title:"Headless Mode",description:"The LiveCodes SDK can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all SDK methods are accessible (e.g. for updating code, getting compiled code, console output, result HTML, shareable URLs, formatting code, running tests, etc).",source:"@site/docs/sdk/headless.md",sourceDirName:"sdk",slug:"/sdk/headless",permalink:"/livecodes/docs/sdk/headless",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/sdk/headless.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Svelte",permalink:"/livecodes/docs/sdk/svelte"},next:{title:"Advanced Topics",permalink:"/livecodes/docs/advanced/"}},d={},c=[{value:"Usage",id:"usage",level:2},{value:"Examples",id:"examples",level:2},{value:"Markdown Editor",id:"markdown-editor",level:3},{value:"MDX Editor",id:"mdx-editor",level:3},{value:"Python Interpreter",id:"python-interpreter",level:3}],p={markup:{language:"html",content:'<textarea id="editor" style="display: none;"></textarea>\n<div id="output">Loading...</div>\n\n<script type="module">\n  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";\n  import debounce from "https://jspm.dev/debounce";\n\n  const initialCode = "# Hello, LiveCodes!\\n\\n";\n\n  // the code editor\n  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {\n    lineNumbers: true,\n    mode: "markdown",\n  });\n  editor.setSize("100%", 200);\n  editor.setValue(initialCode);\n\n  // the playground\n  const options = {\n    view: "headless",\n  };\n\n  const livecodes = await createPlayground(options);\n  await livecodes.load();\n\n  const compile = async () => {\n    await livecodes.setConfig({\n      autoupdate: false,\n      markup: {\n        language: "markdown",\n        content: editor.doc.getValue(),\n      },\n    });\n  };\n\n  // watch for changes\n  editor.on("change", debounce(compile, 1000));\n  livecodes.watch("code", ({ code, config }) => {\n    createSandbox(document.querySelector("#output"), code.markup.compiled);\n  });\n\n  await compile();\n\n  // create a sandbox for safe execution of compiled code\n  function createSandbox (container, html) {\n    const iframe = document.createElement("iframe");\n    iframe.src = "https://livecodes-sandbox.pages.dev/v7/";\n    iframe.sandbox =\n      "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts";\n    iframe.onload = () => {\n      iframe.contentWindow.postMessage({ html }, "*");\n    };\n    container.innerHTML = "";\n    container.appendChild(iframe);\n    return iframe;\n  };\n<\/script>\n\n<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />\n<script src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js"><\/script>\n<script src="https://unpkg.com/codemirror@5.65.15/mode/markdown/markdown.js"><\/script>\n\n<style>\n  * {\n    margin: 0;\n    padding: 0;\n  }\n  body {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    overflow: hidden;\n  }\n  #output {\n    flex: 1;\n  }\n  #output iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n</style>\n'}},m={markup:{language:"html",content:'<textarea id="editor" style="display: none;"></textarea>\n<div id="output">Loading...</div>\n\n<script type="module">\n  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";\n  import debounce from "https://jspm.dev/debounce";\n\n  const initialCode = `import { useState, useEffect } from \'react\';\n\nexport const Hello = ({name}) => {\n  const [count, setCount] = useState(0);\n  return (\n    <>\n      <h1>Hello, {name}!</h1>\n      <p>You clicked {count} times.</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </>\n  );\n};\n\n<Hello name="LiveCodes"></Hello>\n\n## MDX in short\n\n- \u2764\ufe0f Powerful\n- \ud83d\udcbb Everything is a component\n- \ud83d\udd27 Customizable\n- \ud83d\udcda Markdown-based\n- \ud83d\udd25 Blazingly blazing fast\n\n> from [mdxjs.com](https://mdxjs.com/)\n`;\n\n  // the code editor\n  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {\n    lineNumbers: true,\n    mode: "markdown",\n  });\n  editor.setSize("100%", 200);\n  editor.setValue(initialCode);\n\n  // the playground\n  const options = {\n    view: "headless",\n    config: { autoupdate: false },\n  };\n\n  const livecodes = await createPlayground(options);\n  await livecodes.load();\n\n  const compile = async () => {\n    await livecodes.setConfig({\n      autoupdate: false,\n      markup: {\n        language: "mdx",\n        content: editor.doc.getValue(),\n      },\n    });\n  };\n\n  // watch for changes\n  editor.on("change", debounce(compile, 1000));\n  livecodes.watch("code", ({ code, config }) => {\n    createSandbox(document.querySelector("#output"), code.result);\n  });\n\n  await compile();\n\n  // create a sandbox for safe execution of compiled code\n  function createSandbox (container, html) {\n    const iframe = document.createElement("iframe");\n    iframe.src = "https://livecodes-sandbox.pages.dev/v7/";\n    iframe.sandbox =\n      "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts";\n    iframe.onload = () => {\n      iframe.contentWindow.postMessage({ html }, "*");\n    };\n    container.innerHTML = "";\n    container.appendChild(iframe);\n    return iframe;\n  };\n<\/script>\n\n<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />\n<script src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js"><\/script>\n<script src="https://unpkg.com/codemirror@5.65.15/mode/markdown/markdown.js"><\/script>\n\n<style>\n  * {\n    margin: 0;\n    padding: 0;\n  }\n  body {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    overflow: hidden;\n  }\n  #output {\n    flex: 1;\n  }\n  #output iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n</style>\n'}},u={markup:{language:"html",content:'<textarea id="editor" style="display: none"></textarea>\n<div id="output">Loading...</div>\n\n<script type="module">\n  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";\n  import debounce from "https://jspm.dev/debounce";\n\n  const initialCode = `def say_hello(name):\n  return f"Hello, {name}!"\n\nprint(say_hello("LiveCodes"))\n`;\n\n  // the code editor\n  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {\n    lineNumbers: true,\n    mode: "python",\n  });\n  editor.setSize("100%", 250);\n  editor.setValue(initialCode);\n\n  // the playground\n  const options = {\n    view: "headless",\n  };\n\n  const livecodes = await createPlayground(options);\n  await livecodes.load();\n\n  const run = async () => {\n    await livecodes.setConfig({\n      autoupdate: true,\n      script: {\n        language: "python",\n        content: editor.doc.getValue(),\n      },\n    });\n  };\n\n  // watch for changes\n  editor.on("change", debounce(run, 1000));\n  livecodes.watch("console", ({ method, args }) => {\n    const output = document.querySelector("#output");\n    output.innerHTML = args.join("\\n");\n    if (method === "error") {\n      output.style.color = "red";\n    } else {\n      output.style.color = "unset";\n    }\n  });\n\n  await run();\n<\/script>\n\n<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />\n<script src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js"><\/script>\n<script src="https://unpkg.com/codemirror@5.65.15/mode/python/python.js"><\/script>\n\n<style>\n  * {\n    margin: 0;\n    padding: 0;\n  }\n  body {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    overflow: hidden;\n  }\n  #output {\n    flex: 1;\n    margin: 1em;\n    white-space: pre;\n    font-family: monospace;\n  }\n  #output iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n</style>\n'}},h={toc:c,mdDemo:p,mdxDemo:m,pyDemo:u};function g(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"headless-mode"},"Headless Mode"),(0,r.kt)("p",null,"The LiveCodes ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#sdk-methods"},"SDK methods")," are accessible (e.g. for ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#setconfig"},"updating code"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#getcode"},"getting compiled code"),", console output, ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#getcode"},"result HTML"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#getshareurl"},"shareable URLs"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#format"},"formatting code"),", ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#runtests"},"running tests"),", etc)."),(0,r.kt)("p",null,"This provides the power of leveraging the wide range of features and language support offered by LiveCodes, while retaining full control over the UI."),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"To create a headless playground, set the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed option")," ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#view"},(0,r.kt)("inlineCode",{parentName:"a"},"view"))," to ",(0,r.kt)("inlineCode",{parentName:"p"},'"headless"'),"."),(0,r.kt)("p",null,"Please note that in headless mode, the first parameter (",(0,r.kt)("inlineCode",{parentName:"p"},"container"),") of the function ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#createplayground"},(0,r.kt)("inlineCode",{parentName:"a"},"createPlayground"))," is optional and can be omitted."),(0,r.kt)("div",{style:{clear:"both"}}),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { createPlayground } from 'livecodes';\n\ncreatePlayground({\n  view: 'headless',\n  config: {\n    markup: {\n      language: 'markdown',\n      content: '# Hello World!',\n    },\n  },\n}).then(async (playground) => {\n  const code = await playground.getCode();\n  console.log(code.markup.compiled); // \"<h1>Hello World!</h1>\"\n  console.log(code.result); // (result page HTML)\n});\n")),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("p",null,"The following examples show how to use the headless mode to make a Markdown editor, an MDX editor and a Python interpreter."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"You may want to view the following playgrounds in full screen (using the full screen button in the top right of each playground).")),(0,r.kt)("h3",{id:"markdown-editor"},"Markdown Editor"),(0,r.kt)("p",null,"In this demo, code changes are watched using the SDK method ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#watch"},(0,r.kt)("inlineCode",{parentName:"a"},"watch('code', callback)")),". The callback function accepts an argument which is an object with the properties ",(0,r.kt)("inlineCode",{parentName:"p"},"code")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"config")," (see ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#getcode"},(0,r.kt)("inlineCode",{parentName:"a"},"getCode"))," and ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#getconfig"},(0,r.kt)("inlineCode",{parentName:"a"},"getConfig")),"). The compiled code is obtained as ",(0,r.kt)("inlineCode",{parentName:"p"},"code.markup.compiled"),"."),(0,r.kt)(a.Z,{config:p,height:"80vh",mdxType:"LiveCodes"}),(0,r.kt)("h3",{id:"mdx-editor"},"MDX Editor"),(0,r.kt)("p",null,"In this demo, code changes are watched using the SDK method ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#watch"},(0,r.kt)("inlineCode",{parentName:"a"},"watch('code', callback)")),". The callback function accepts an argument which is an object with the properties ",(0,r.kt)("inlineCode",{parentName:"p"},"code")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"config")," (see ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#getcode"},(0,r.kt)("inlineCode",{parentName:"a"},"getCode"))," and ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#getconfig"},(0,r.kt)("inlineCode",{parentName:"a"},"getConfig")),"). The result HTML is obtained as ",(0,r.kt)("inlineCode",{parentName:"p"},"code.result"),"."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"If you do not want to run the result page in the headless playground and only want to get the generated result HTML, you can set the configuration option ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#autoupdate"},"`autoupdate")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),".")),(0,r.kt)(a.Z,{config:m,height:"80vh",mdxType:"LiveCodes"}),(0,r.kt)("h3",{id:"python-interpreter"},"Python Interpreter"),(0,r.kt)("p",null,"In this demo, console output is obtained using the SDK method ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#watch"},(0,r.kt)("inlineCode",{parentName:"a"},"watch('code', callback)")),". The callback function accepts an argument which is an object with the properties ",(0,r.kt)("inlineCode",{parentName:"p"},"method")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"args")," indicating the console method and the arguments that were passed (as an array)."),(0,r.kt)(a.Z,{config:u,height:"80vh",mdxType:"LiveCodes"}))}g.isMDXComponent=!0}}]);