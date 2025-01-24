"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8685],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(n),u=o,f=p["".concat(l,".").concat(u)]||p[u]||m[u]||r;return n?a.createElement(f,s(s({ref:t},d),{},{components:n})):a.createElement(f,s({ref:t},d))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,s=new Array(r);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:o,s[1]=i;for(var c=2;c<r;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1262:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294),o=n(2389);function r(e){let{children:t,fallback:n}=e;return(0,o.Z)()?a.createElement(a.Fragment,null,t?.()):n??null}},325:(e,t,n)=>{n.d(t,{Z:()=>h});var a=n(7462),o=n(7294),r=n(9493);function s(e){const t=(0,o.useRef)(null),[n,a]=(0,o.useState)(e.className||""),[s,i]=(0,o.useState)(e.style||{}),[l,c]=(0,o.useState)(e.height),[d,p]=(0,o.useState)(),[m,u]=(0,o.useState)(JSON.stringify(e.config||"")),[f,g]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(!t.current)return;const{className:n,style:o,height:s,sdkReady:l,config:h,...v}=e;if(a(n||""),i(o||{}),c(s),d&&f===JSON.stringify(v)){if(m===JSON.stringify(h))return;u(JSON.stringify(h)),"string"==typeof h?fetch(h).then((e=>e.json())).then((e=>{d?.setConfig(e)})):h&&d.setConfig(h)}else g(JSON.stringify(v)),d?.destroy(),(0,r.T)(t.current,{config:h,...v}).then((e=>{p(e),"function"==typeof l&&l(e)}))}),[e]),(0,o.useEffect)((()=>()=>{d?.destroy()}),[]),o.createElement("div",{ref:t,className:n,style:s,"data-height":l})}var i=n(1446),l=n(412),c=n(814),d=n(4866),p=n(5162),m=n(2134),u=n(420);function f(e){const[t,n]=(0,o.useState)(e.js),[a,r]=(0,o.useState)(e.ts),[s,i]=(0,o.useState)(e.react),[f,g]=(0,o.useState)(e.vue),[h,v]=(0,o.useState)(e.svelte),y="3.7rem",[b,k]=(0,o.useState)(!0),[w,N]=(0,o.useState)(y),S=(0,o.useRef)(null),C=()=>{setTimeout((()=>{N(`calc(${S.current.offsetHeight}px + ${y})`)}),5),setTimeout((()=>{N(`calc(${S.current.offsetHeight}px + ${y})`)}),255)};return(0,o.useEffect)((()=>{if(l.Z.canUseDOM){const e=function(e,t){void 0===t&&(t="js");try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),r(e(a,"ts")),i(e(s,"jsx")),g(e(f,"html")),v(e(h,"html"))}}),[]),o.createElement("details",{className:`alert alert--info ${m.Z.details} ${u.Z.details}`,"data-collapsed":b,style:{height:b?y:w,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"}},o.createElement("summary",{onClick:()=>{k(!b),C()}},"show code"),o.createElement("div",{ref:S,style:{display:"block",overflow:"hidden"}},o.createElement("div",{className:m.Z.collapsibleContent},o.createElement(d.Z,{groupId:"sdk-code"},o.createElement(p.Z,{value:"js",label:"JS",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"js"},t)),o.createElement(p.Z,{value:"ts",label:"TS",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"ts"},a)),o.createElement(p.Z,{value:"react",label:"React",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"jsx"},s)),o.createElement(p.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"html"},f)),o.createElement(p.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:C}},o.createElement(c.Z,{language:"html"},h))))))}const g="container_Egsj";function h(e){const{className:t,style:n,showCode:r,height:l,...c}=e,d=e=>JSON.stringify(e,null,2),p=`\nimport { createPlayground } from 'livecodes';\n\nconst options = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),m=`\nimport { createPlayground, type EmbedOptions } from 'livecodes';\n\nconst options: EmbedOptions = ${d(c)};\ncreatePlayground('#container', options);\n\n`.trimStart(),u=`\nimport LiveCodes from 'livecodes/react';\n\nexport default function App() {\n  const options = ${d(c)};\n  return (<LiveCodes {...options}></LiveCodes>);\n}\n\n`.trimStart(),h=`\n<script setup>\nimport LiveCodes from "livecodes/vue";\n\nconst options = ${d(c)};\n<\/script>\n<template>\n  <LiveCodes v-bind="options" />\n</template>\n\n`,v=`\n<script>\nimport { onMount } from 'svelte';\nimport { createPlayground } from 'livecodes';\n\nlet options = $state(${d(c)});\nlet container = $state(null);\nonMount(() => {\n  createPlayground(container, options);\n});\n<\/script>\n\n<div bind:this="{container}"></div>\n\n`.trimStart();return o.createElement(o.Fragment,null,o.createElement(s,(0,a.Z)({className:`${g} ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:i.G},e,{config:{themeColor:"hsl(180, 60%, 60%)",..."object"==typeof e.config?e.config:{}}})),!1!==e.showCode&&o.createElement(f,{js:p,ts:m,react:u,vue:h,svelte:v}))}},4887:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(7294),o=n(1262),r=n(814),s=n(9493),i=n(1446);function l(e){const{params:t,config:n,code:l,language:c="js",codeTitle:d="",showLineNumbers:p=!1,formatCode:m=!0,linkText:u="Run in LiveCodes",style:f={},className:g=""}=e,h=(0,s.r)({appUrl:i.G,params:t,config:n});return a.createElement("div",{style:{marginBottom:"30px",...f},className:g},l&&a.createElement(o.Z,null,(()=>{return a.createElement(r.Z,{language:c,title:d,showLineNumbers:p},m?(e=l,void 0===(t=c)&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})):l);var e,t})),a.createElement("a",{href:h,target:"_blank",rel:"noreferrer"},u,a.createElement("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"}},a.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))))}},9493:(e,t,n)=>{n.d(t,{T:()=>o,r:()=>r});var a=n(7728);async function o(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:n="https://livecodes.io/",params:a={},config:o={},import:r,headless:s,lite:i,loading:l="lazy",template:c,view:d}=t,p=s||"headless"===d;let m,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!u){if(!p)throw new Error(`Cannot find element: "${e}"`);u=document.createElement("div"),x(u),document.body.appendChild(u)}try{m=new URL(n)}catch{throw new Error(`"${n}" is not a valid URL.`)}const f=m.origin;if("object"==typeof a&&Object.keys(a).forEach((e=>{m.searchParams.set(e,String(a[e]))})),c&&m.searchParams.set("template",c),r&&m.searchParams.set("x",r),p&&m.searchParams.set("headless","true"),i&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof o&&null==o.mode?o.mode="lite":m.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof o&&null==o.view&&"headless"!==d?o.view=d:m.searchParams.set("view",d)),"string"==typeof o)try{new URL(o),m.searchParams.set("config",o)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof o)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(o).length>0&&m.searchParams.set("config","sdk")}m.searchParams.set("embed","true"),m.searchParams.set("loading",p?"eager":l);let g=!1;const h="Cannot call API methods after calling `destroy()`.",v=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"===u.dataset.defaultStyles||p||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="8px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");const n="livecodes",a=u.querySelector(`iframe.${n}`),r=a||document.createElement("iframe");r.classList.add(n),r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const s="eager"===l?"eager":"lazy";r.setAttribute("loading",s),p?x(r):(r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=u.style.borderRadius),addEventListener("message",(function e(t){t.source===r.contentWindow&&t.origin===f&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:o},f))})),r.onload=()=>{e(r)},r.src=m.href,a||u.appendChild(r)})),y=new Promise((e=>{addEventListener("message",(function t(n){n.source===v.contentWindow&&n.origin===f&&"livecodes-ready"===n.data?.type&&(removeEventListener("message",t),e(),y.settled=!0)}))})),b=()=>g?Promise.reject(h):new Promise((async e=>{y.settled&&e();v.contentWindow?.postMessage({type:"livecodes-load"},f),await y,e()})),k=(e,t)=>new Promise((async(n,a)=>{if(g)return a(h);await b();const o=E();addEventListener("message",(function t(r){if(r.source===v.contentWindow&&r.origin===f&&"livecodes-api-response"===r.data?.type&&r.data?.id===o&&r.data.method===e){removeEventListener("message",t);const e=r.data.payload;e?.error?a(e.error):n(e)}})),v.contentWindow?.postMessage({method:e,id:o,args:t},f)})),w={},N=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw new Error(h);return N.includes(e)?(k("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter((e=>e!==t)),0===w[e]?.length&&k("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==v.contentWindow||e.origin!==f||!t||!w[t])return;const n=e.data?.payload;w[t]?.forEach((e=>{e(n)}))}));const C=()=>{Object.values(w).forEach((e=>{e.length=0})),v?.remove?.(),g=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}function x(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const E=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>k("run"),format:e=>k("format",[e]),getShareUrl:e=>k("getShareUrl",[e]),getConfig:e=>k("getConfig",[e]),setConfig:e=>k("setConfig",[e]),getCode:()=>k("getCode"),show:(e,t)=>k("show",[e,t]),runTests:()=>k("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return k("exec",[e,...n])},destroy:()=>y.settled?k("destroy").then(C):g?Promise.reject(h):(C(),Promise.resolve())}}function r(e){void 0===e&&(e={});const{appUrl:t,params:n,config:o,import:r,...s}=e,i="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,a.compressToEncodedURIComponent)(JSON.stringify(o))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...n,x:r,...i}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let a;const r=e.dataset.config||e.dataset.prefill;if(r)try{a=JSON.parse(r)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+s,...t,...a?{config:a}:{}})}))}))},9918:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,basicJsxDemo:()=>m,contentTitle:()=>l,cssModulesDemo:()=>b,default:()=>S,disableAutoRenderDemo:()=>g,exportsDemo:()=>v,frontMatter:()=>i,importsDemo:()=>h,metadata:()=>c,reactDomDemo:()=>u,rootDemo:()=>f,styledComponentsDemo:()=>w,stylesDemo:()=>y,tailwindcssDemo:()=>k,toc:()=>p});var a=n(7462),o=(n(7294),n(3905)),r=n(325),s=n(4887);const i={},l="React",c={unversionedId:"languages/react",id:"languages/react",title:"React",description:"React Compiler is a build-time only tool that automatically optimizes React apps.",source:"@site/docs/languages/react.md",sourceDirName:"languages",slug:"/languages/react",permalink:"/livecodes/docs/languages/react",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/react.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"React (TSX)",permalink:"/livecodes/docs/languages/react-tsx"},next:{title:"Reason",permalink:"/livecodes/docs/languages/reason"}},d={},p=[{value:"Demo:",id:"demo",level:2},{value:"Usage",id:"usage",level:2},{value:"Auto-rendering",id:"auto-rendering",level:3},{value:"Root Element",id:"root-element",level:4},{value:"Disabling Auto-rendering",id:"disabling-auto-rendering",level:4},{value:"Importing Modules",id:"importing-modules",level:3},{value:"Types for Imported Modules",id:"types-for-imported-modules",level:4},{value:"Exports",id:"exports",level:3},{value:"Styles",id:"styles",level:3},{value:"Style Editor",id:"style-editor",level:4},{value:"Importing Stylesheets",id:"importing-stylesheets",level:4},{value:"CSS Modules",id:"css-modules",level:4},{value:"CSS Frameworks",id:"css-frameworks",level:4},{value:"CSS-in-JS",id:"css-in-js",level:4},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extensions",id:"extensions",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}],m={react:"export default function App() {\n  return <h1>Hello World!</h1>;\n}"},u={react:'import { createRoot } from "react-dom/client";\n\nfunction App() {\n  return <h1>Hello World!</h1>;\n}\n\nconst root = createRoot(document.querySelector("#root"));\nroot.render(<App />);',html:'<div id="root"></div>'},f={html:'<div id="livecodes-app">Loading...</div>',react:"export default function App() {\n  return <h1>Hello World!</h1>;\n}"},g={markup:{language:"html",content:"JSX auto-rendering is disabled. Set from Project menu \u2192 Custom Settings."},script:{language:"react",content:"export default function App() {\n  return <h1>Hello World!</h1>;\n}"},customSettings:{react:{disableAutoRender:!0}}},h={react:'import { useState, useEffect } from "react";\nimport confetti from "canvas-confetti";\nimport "bootstrap/dist/css/bootstrap.css";\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    if (count > 0) {\n      confetti();\n    }\n  }, [count]);\n\n  return (\n    <div className="m-5 text-center">\n      <p>You clicked {count} times.</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}\n'},v={mdx:'import Greeting from "./script";\n\n<Greeting name="MDX" />\n',react:"export default function(props) {\n  return <h1>Greeting from {props.name}!</h1>;\n}\n"},y={react:'import "bootstrap/dist/css/bootstrap.css";\n\nexport default () => <h1 className="m-5 text-center">Hello World!</h1>;\n'},b={activeEditor:"script",style:{language:"css",content:".title {\n  color: green;\n  font-family: sans-serif;\n}\n"},script:{language:"react",content:"import classes from './style.module.css';\n\nexport default function() {\n  return <h1 className={classes.title}>Hello, CSS Modules!</h1>;\n}\n"},processors:["cssmodules"]},k={activeEditor:"script",style:{language:"css",content:"@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"},script:{language:"react",content:'export default function() {\n  return <h1 className="text-3xl font-bold text-gray-500 text-center m-4">Hello, Tailwind CSS!</h1>;\n}\n'},processors:["tailwindcss"]},w={react:"import styled from 'styled-components';\n\nconst Title = styled.h1`\n text-align: center;\n font-family: sans-serif;\n color: palevioletred;\n`;\n\nexport default function () {\n return <Title>Hello, styled-components!</Title>;\n}\n"},N={toc:p,basicJsxDemo:m,reactDomDemo:u,rootDemo:f,disableAutoRenderDemo:g,importsDemo:h,exportsDemo:v,stylesDemo:y,cssModulesDemo:b,tailwindcssDemo:k,styledComponentsDemo:w};function S(e){let{components:t,...i}=e;return(0,o.kt)("wrapper",(0,a.Z)({},N,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"react"},"React"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://react.dev/learn/react-compiler"},"React Compiler")," is a build-time only tool that automatically optimizes ",(0,o.kt)("a",{parentName:"p",href:"https://react.dev/"},"React")," apps."),(0,o.kt)("p",null,"Please note that using React compiler with TypeScript (TSX) is also supported in LiveCodes and is ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/react-tsx"},"documented here"),"."),(0,o.kt)("p",null,"Also note that LiveCodes supports running ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/jsx"},"JSX")," and ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/tsx"},"TSX")," which are compiled to JavaScript using the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/typescript"},"TypeScript compiler"),". This was the traditional way of running React and other JSX/TSX apps in LiveCodes before React compiler support was added."),(0,o.kt)("h2",{id:"demo"},"Demo:"),(0,o.kt)(r.Z,{template:"react",height:"400px",mdxType:"LiveCodes"}),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"The easiest way is to ",(0,o.kt)("a",{parentName:"p",href:"#auto-rendering"},"auto-render")," a component by exporting it as the ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#using_the_default_export"},"default export"),":"),(0,o.kt)(s.Z,{params:m,code:m.jsx,language:"react",formatCode:!1,mdxType:"RunInLiveCodes"}),(0,o.kt)("p",null,"You may, however, be more explicit and render the component yourself using ",(0,o.kt)("a",{parentName:"p",href:"https://react.dev/reference/react-dom/client"},"React DOM"),":"),(0,o.kt)(s.Z,{params:u,code:u.jsx,language:"react",formatCode:!1,mdxType:"RunInLiveCodes"}),(0,o.kt)("admonition",{title:"note",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"React's ",(0,o.kt)("a",{parentName:"p",href:"https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html"},"new JSX transform")," is utilized. So there is no need to import React."),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"// this is not needed:\n// import React from 'react';\n\nexport default function App() {\n  return <h1>Hello World!</h1>;\n}\n"))),(0,o.kt)("h3",{id:"auto-rendering"},"Auto-rendering"),(0,o.kt)("p",null,"A component is rendered automatically as a React component (without having to manually use React Dom to render it) if the following conditions are met:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The component is exported as the default export."),(0,o.kt)("li",{parentName:"ul"},"No ",(0,o.kt)("a",{parentName:"li",href:"#exports"},"imports from ",(0,o.kt)("inlineCode",{parentName:"a"},'"./script"'))," in markup editor."),(0,o.kt)("li",{parentName:"ul"},"Auto-rendering is not ",(0,o.kt)("a",{parentName:"li",href:"#disabling-auto-rendering"},"disabled"),".")),(0,o.kt)("h4",{id:"root-element"},"Root Element"),(0,o.kt)("p",null,"To render the React components to a specific ",(0,o.kt)("a",{parentName:"p",href:"https://react.dev/reference/react-dom/client/createRoot"},"root")," DOM element use ",(0,o.kt)("inlineCode",{parentName:"p"},'"livecodes-app"')," as the element ",(0,o.kt)("inlineCode",{parentName:"p"},"id"),". Otherwise, if that element is not found, a new ",(0,o.kt)("inlineCode",{parentName:"p"},"div")," element is added to ",(0,o.kt)("inlineCode",{parentName:"p"},"document.body")," and is used as the root."),(0,o.kt)("p",null,"Example:"),(0,o.kt)(s.Z,{params:f,code:f.html,language:"html",formatCode:!1,mdxType:"RunInLiveCodes"}),(0,o.kt)("h4",{id:"disabling-auto-rendering"},"Disabling Auto-rendering"),(0,o.kt)("p",null,"To disable auto-rendering, set the ",(0,o.kt)("a",{parentName:"p",href:"#custom-settings"},"custom settings")," ",(0,o.kt)("inlineCode",{parentName:"p"},"disableAutoRender")," property to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,o.kt)(s.Z,{config:g,code:JSON.stringify(g.customSettings,null,2),language:"json",codeTitle:"Custom Settings",formatCode:!1,mdxType:"RunInLiveCodes"}),(0,o.kt)("h3",{id:"importing-modules"},"Importing Modules"),(0,o.kt)("p",null,"npm modules can be imported as described in the section about ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution"},"module resolution"),", including bare module imports and importing from different CDNs. Stylesheet imports are added as ",(0,o.kt)("inlineCode",{parentName:"p"},'<link rel="stylesheet">')," tags in the page ",(0,o.kt)("inlineCode",{parentName:"p"},"head"),"."),(0,o.kt)("p",null,"Example:"),(0,o.kt)(s.Z,{params:h,code:h.jsx,language:"react",formatCode:!1,mdxType:"RunInLiveCodes"}),(0,o.kt)("p",null,"Module imports can be customized using import maps as described in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#custom-module-resolution"},"module resolution")," documentations."),(0,o.kt)("h4",{id:"types-for-imported-modules"},"Types for Imported Modules"),(0,o.kt)("p",null,"Types for imported modules are loaded automatically (if available) to provide ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/intellisense"},"Intellisense"),", auto-completion and type information."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"LiveCodes Intellisense",src:n(3326).Z,width:"1128",height:"754"})),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"LiveCodes Intellisense",src:n(4315).Z,width:"1126",height:"713"})),(0,o.kt)("p",null,"Moreover, you can provide custom type definitions for modules that do not have types available on npm. See ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/intellisense#custom-types"},"Custom Types")," for details."),(0,o.kt)("h3",{id:"exports"},"Exports"),(0,o.kt)("p",null,"Values exported from script editor (default or named) can be imported in the markup editor by importing from ",(0,o.kt)("inlineCode",{parentName:"p"},'"./script"')," (with no extension)."),(0,o.kt)("p",null,"This can be useful, for example, when using ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/mdx"},"MDX")," to import components exported form JSX."),(0,o.kt)("p",null,"Demo:"),(0,o.kt)(r.Z,{params:v,mdxType:"LiveCodes"}),(0,o.kt)("admonition",{title:"note",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"When values are imported from ",(0,o.kt)("inlineCode",{parentName:"p"},'"./script"'),", ",(0,o.kt)("a",{parentName:"p",href:"#auto-rendering"},"auto-rendering")," is disabled, because it is assumed that you want to take control over component rendering.")),(0,o.kt)("h3",{id:"styles"},"Styles"),(0,o.kt)("p",null,"CSS can be applied to the component using various ways:"),(0,o.kt)("h4",{id:"style-editor"},"Style Editor"),(0,o.kt)("p",null,"Styles added in the style editor is applied globally to the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page"),". This can use different ",(0,o.kt)("strong",{parentName:"p"},"languages/processors")," supported in LiveCodes including CSS, SCSS, Less, Stylus, ..etc. See ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/css"},"style documentation")," for more details."),(0,o.kt)("p",null,"And of course, styles and stylesheets added in markup editor are also applied globally."),(0,o.kt)("h4",{id:"importing-stylesheets"},"Importing Stylesheets"),(0,o.kt)("p",null,"Stylesheets imported in script editor are added as ",(0,o.kt)("inlineCode",{parentName:"p"},'<link rel="stylesheet">')," tags in the page ",(0,o.kt)("inlineCode",{parentName:"p"},"head"),".\nThe stylesheet URL can be an absolute URL or a path in the npm package. The URL has to end with ",(0,o.kt)("inlineCode",{parentName:"p"},'".css"'),"."),(0,o.kt)("p",null,"example:"),(0,o.kt)(s.Z,{params:y,code:y.react,language:"react",formatCode:!1,mdxType:"RunInLiveCodes"}),(0,o.kt)("h4",{id:"css-modules"},"CSS Modules"),(0,o.kt)("p",null,"CSS modules are supported and are ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/cssmodules"},"documented separately"),". Make sure to enable CSS modules (from style editor menu or in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#processors"},(0,o.kt)("inlineCode",{parentName:"a"},"processors"))," property of ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object"),")."),(0,o.kt)("p",null,"Demo:"),(0,o.kt)(r.Z,{config:b,mdxType:"LiveCodes"}),(0,o.kt)("h4",{id:"css-frameworks"},"CSS Frameworks"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/css#css-processors"},"CSS Frameworks")," supported in LiveCodes (e.g. ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/tailwindcss"},"Tailwind CSS"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/unocss"},"UnoCSS"),", ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/windicss"},"WindiCSS"),") can detect class names added in JSX. Make sure that the required utility is enabled (from style editor menu or in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#processors"},(0,o.kt)("inlineCode",{parentName:"a"},"processors"))," property of ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object"},"configuration object"),") and that required ",(0,o.kt)("a",{parentName:"p",href:"https://tailwindcss.com/docs/functions-and-directives#tailwind"},"directives")," are added to the style editor."),(0,o.kt)("p",null,"Demo:"),(0,o.kt)(r.Z,{config:k,mdxType:"LiveCodes"}),(0,o.kt)("h4",{id:"css-in-js"},"CSS-in-JS"),(0,o.kt)("p",null,"CSS-in-JS libraries can be imported and used as usual."),(0,o.kt)("p",null,"Demo:"),(0,o.kt)(r.Z,{params:w,mdxType:"LiveCodes"}),(0,o.kt)("h2",{id:"language-info"},"Language Info"),(0,o.kt)("h3",{id:"name"},"Name"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"react")),(0,o.kt)("h3",{id:"extensions"},"Extensions"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},".react.jsx"),", ",(0,o.kt)("inlineCode",{parentName:"p"},".react-jsx")),(0,o.kt)("h3",{id:"editor"},"Editor"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"script")),(0,o.kt)("h2",{id:"compiler"},"Compiler"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://react.dev/learn/react-compiler"},"React compiler"),", which is a ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/languages/babel"},"babel")," plugin (",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/babel-plugin-react-compiler"},"babel-plugin-react-compiler"),")."),(0,o.kt)("h2",{id:"code-formatting"},"Code Formatting"),(0,o.kt)("p",null,"Using ",(0,o.kt)("a",{parentName:"p",href:"https://prettier.io/"},"Prettier"),"."),(0,o.kt)("h2",{id:"custom-settings"},"Custom Settings"),(0,o.kt)("p",null,"React compiler is implemented as a babel plugin (",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/babel-plugin-react-compiler"},"babel-plugin-react-compiler"),"). In addition the following babel presets are used:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://babeljs.io/docs/en/babel-preset-env"},"@babel/preset-env")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://babeljs.io/docs/en/babel-preset-react"},"@babel/preset-react")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://babeljs.io/docs/en/babel-preset-typescript"},"@babel/preset-typescript"))),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/custom-settings"},"Custom settings")," can be used to add configuration under the following keys:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"react"),": the option ",(0,o.kt)("inlineCode",{parentName:"li"},"disableAutoRender")," can be set to ",(0,o.kt)("inlineCode",{parentName:"li"},"true")," to disable ",(0,o.kt)("a",{parentName:"li",href:"#auto-rendering"},"auto-rendering"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"babel"),": custom settings for ",(0,o.kt)("a",{parentName:"li",href:"https://babeljs.io/docs/options"},"babel"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"babel-plugin-react-compiler"),": custom settings for ",(0,o.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/babel-plugin-react-compiler"},"babel-plugin-react-compiler"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"@babel/preset-env"),": custom settings for ",(0,o.kt)("a",{parentName:"li",href:"https://babeljs.io/docs/en/babel-preset-env"},"@babel/preset-env"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"@babel/preset-react"),": custom settings for ",(0,o.kt)("a",{parentName:"li",href:"https://babeljs.io/docs/en/babel-preset-react"},"@babel/preset-react"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"@babel/preset-typescript"),": custom settings for ",(0,o.kt)("a",{parentName:"li",href:"https://babeljs.io/docs/en/babel-preset-typescript"},"@babel/preset-typescript"),".")),(0,o.kt)("p",null,"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Example:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Custom Settings"',title:'"Custom','Settings"':!0},'{\n  "react": {\n    "disableAutoRender": true\n  }\n}\n')),(0,o.kt)("h2",{id:"starter-template"},"Starter Template"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://livecodes.io/?template=react"},"https://livecodes.io/?template=react")),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://react.dev/"},"React")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://react.dev/learn/writing-markup-with-jsx"},"JSX")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://react.dev/learn/react-compiler"},"React compiler"))))}S.isMDXComponent=!0},3326:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/intellisense-1-bbc692078d1b88aaf8d2be72beb49849.jpg"},4315:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/intellisense-2-ffdab70d10948aa165e3332a58d37827.jpg"}}]);