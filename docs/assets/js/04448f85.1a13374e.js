"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4054"],{29827:function(e,t,n){n.r(t),n.d(t,{markdownConfig:()=>c,styledMarkdownParams:()=>h,default:()=>p,frontMatter:()=>a,metadata:()=>s,assets:()=>d,toc:()=>u,contentTitle:()=>l});var s=JSON.parse('{"id":"languages/markdown","title":"Markdown","description":"Markdown is a text-to-HTML conversion tool for web writers.","source":"@site/docs/languages/markdown.mdx","sourceDirName":"languages","slug":"/languages/markdown","permalink":"/livecodes/docs/languages/markdown","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/markdown.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Malina.js","permalink":"/livecodes/docs/languages/malina"},"next":{"title":"MDX","permalink":"/livecodes/docs/languages/mdx"}}'),o=n("85893"),r=n("50065"),i=n("13365");let a={},l="Markdown",d={},c={markup:{language:"markdown",content:`## Markdown

_Hello_ **World**

Ordered List:

1. item
2. item
3. item

Unordered list:

- item
- item
- item

Link:

[link](https://livecodes.io)

Image:

![image](https://placehold.co/300x200)

Table:

| header 1 | header 2 |
| -------- | -------- |
| cell 1   | cell 2   |
| cell 3   | cell 4   |

Quote:

> blockquote

Code:

\`\`\`python
print("Hello, World!")
\`\`\`
`}},h={template:"markdown",activeEditor:"style",css:`@import 'github-markdown-css';

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
`},u=[{value:"Demo",id:"demo",level:2},{value:"Styles",id:"styles",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Aliases",id:"aliases",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function m(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"markdown",children:"Markdown"})}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"https://daringfireball.net/projects/markdown/",children:"Markdown"})," is a text-to-HTML conversion tool for web writers.\nMarkdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML."]}),"\n",(0,o.jsx)(t.p,{children:"Markdown is now one of the world's most popular markup languages."}),"\n",(0,o.jsx)(t.admonition,{title:"Note",type:"info",children:(0,o.jsxs)(t.p,{children:["Please note that MDX is also supported in LiveCodes and is ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/mdx",children:"documented here"}),"."]})}),"\n",(0,o.jsx)(t.h2,{id:"demo",children:"Demo"}),"\n","\n","\n",(0,o.jsx)(i.Z,{config:c}),"\n",(0,o.jsx)(t.h2,{id:"styles",children:"Styles"}),"\n",(0,o.jsx)(t.p,{children:"By default, no styes are added. Only HTML output is generated from the Markdown code."}),"\n",(0,o.jsxs)(t.p,{children:["If you want to style the result page similar to GitHub Markdown, you can use ",(0,o.jsx)(t.a,{href:"https://github.com/sindresorhus/github-markdown-css",children:(0,o.jsx)(t.code,{children:"github-markdown-css"})}),".\nNote that the body needs to have a ",(0,o.jsx)(t.code,{children:'class="markdown-body"'})," for the styles to be applied."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-js",metastring:'title="Script Editor (JS)"',children:"document.body.classList.add('markdown-body');\n"})}),"\n",(0,o.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,o.jsx)(i.Z,{params:h,height:"80vh"}),"\n",(0,o.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,o.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:"markdown"})}),"\n",(0,o.jsx)(t.h3,{id:"aliases",children:"Aliases"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:"md"}),", ",(0,o.jsx)(t.code,{children:"mdown"}),", ",(0,o.jsx)(t.code,{children:"mkdn"})]}),"\n",(0,o.jsx)(t.h3,{id:"extension",children:"Extension"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:".md"})}),"\n",(0,o.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:"script"})}),"\n",(0,o.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.a,{href:"https://marked.js.org/",children:"Marked"})}),"\n",(0,o.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:"marked"}),": v13.0.2"]}),"\n",(0,o.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,o.jsxs)(t.p,{children:["Using ",(0,o.jsx)(t.a,{href:"https://prettier.io/",children:"Prettier"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"custom-settings",children:"Custom Settings"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"Custom settings"})," added to the property ",(0,o.jsx)(t.code,{children:"markdown"})," are passed as a JSON object to ",(0,o.jsx)(t.a,{href:"https://marked.js.org/using_advanced",children:(0,o.jsx)(t.code,{children:"marked.parse"})}),". Please check the ",(0,o.jsx)(t.a,{href:"https://marked.js.org/using_advanced#options",children:"documentation"})," for full reference."]}),"\n",(0,o.jsx)(t.p,{children:"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"Example:"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "markdown": {\n    "gfm": true,\n    "breaks": true\n  }\n}\n'})}),"\n",(0,o.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.a,{href:"https://livecodes.io/?template=markdown",children:"https://livecodes.io/?template=markdown"})}),"\n",(0,o.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://daringfireball.net/projects/markdown/",children:"Markdown"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://marked.js.org/",children:"Marked"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://www.markdownguide.org/",children:"The Markdown Guide"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/mdx",children:"MDX support in LiveCodes"})}),"\n"]})]})}function p(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}},13365:function(e,t,n){n.d(t,{Z:()=>f});var s=n("85893"),o=n("79207"),r=n("67294"),i=n("38294");function a(e){let t=(0,r.useRef)(null),[n,o]=(0,r.useState)(e.className||""),[a,l]=(0,r.useState)(e.style||{}),[d,c]=(0,r.useState)(e.height),[h,u]=(0,r.useState)(),[m,p]=(0,r.useState)(JSON.stringify(e.config||"")),[g,f]=(0,r.useState)("");return(0,r.useEffect)(()=>{if(!t.current)return;let{className:n,style:s,height:r,sdkReady:a,config:d,...v}=e;if(o(n||""),l(s||{}),c(r),h&&g===JSON.stringify(v)){if(m===JSON.stringify(d))return;p(JSON.stringify(d)),"string"==typeof d?fetch(d).then(e=>e.json()).then(e=>{h?.setConfig(e)}):d&&h.setConfig(d)}else f(JSON.stringify(v)),h?.destroy(),(0,i.T)(t.current,{config:d,...v}).then(e=>{u(e),"function"==typeof a&&a(e)})},[e]),(0,r.useEffect)(()=>()=>{h?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:n,style:a,"data-height":d})}var l=n("21858"),d=n("33262"),c=n("31705"),h=n("97645"),u=n("58168"),m=n("98228"),p=n("45050");function g(e){let[t,n]=(0,r.useState)(e.js),[o,i]=(0,r.useState)(e.ts),[a,l]=(0,r.useState)(e.react),[g,f]=(0,r.useState)(e.vue),[v,y]=(0,r.useState)(e.svelte),[x,w]=(0,r.useState)(e.solid),j="3.7rem",[b,k]=(0,r.useState)(!0),[S,C]=(0,r.useState)(j),M=(0,r.useRef)(null),E=()=>{setTimeout(()=>{C(`calc(${M.current.offsetHeight}px + ${j})`)},5),setTimeout(()=>{C(`calc(${M.current.offsetHeight}px + ${j})`)},255)};return(0,r.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),i(e(o,"ts")),l(e(a,"jsx")),f(e(g,"html")),y(e(v,"html")),w(e(x,"tsx"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":b,style:{height:b?j:S,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{k(!b),E()},children:"show code"}),(0,s.jsx)("div",{ref:M,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:p.Z.collapsibleContent,children:(0,s.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,s.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"js",children:t})}),(0,s.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"ts",children:o})}),(0,s.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"jsx",children:a})}),(0,s.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"html",children:g})}),(0,s.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"html",children:v})}),(0,s.jsx)(h.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:E},children:(0,s.jsx)(c.Z,{language:"tsx",children:x})})]})})})]})}function f(e){let{className:t,style:n,showCode:r,height:i,...d}=e,{colorMode:c}=(0,o.I)(),h=e=>JSON.stringify(e,null,2),u=`
import { createPlayground } from 'livecodes';

const options = ${h(d)};
createPlayground('#container', options);

`.trimStart(),m=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(d)};
createPlayground('#container', options);

`.trimStart(),p=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${h(d)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${h(d)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,v=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${h(d)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart(),y=`
import { createPlayground, type EmbedOptions } from 'livecodes';

export default function App() {
  const options: EmbedOptions = ${h(d)};
  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options);
  };

  return <div ref={onMounted}></div>;
}

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:l.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(g,{js:u,ts:m,react:p,vue:f,svelte:v,solid:y})]})}},38294:function(e,t,n){n.d(t,{T:function(){return o},r:function(){return r}});var s=n(17728);async function o(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(n=e,e=null);let{config:s={},headless:o,loading:i="lazy",view:a}=n,l=o||"headless"===a,d=null,c=null;if("string"==typeof e)d=document.querySelector(e);else if(e instanceof HTMLElement)d=e;else if(!(l&&"object"==typeof e))throw Error("A valid container element is required.");if(!d){if(l)E(d=document.createElement("div")),document.body.appendChild(d);else throw Error(`Cannot find element: "${e}"`)}let h=new URL(r(n)),u=h.origin;h.searchParams.set("embed","true"),h.searchParams.set("loading",l?"eager":i),h.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof s&&Object.keys(s).length>0&&h.searchParams.set("config","sdk");let m=n.params;"object"==typeof m&&Object.keys(m).length>0&&JSON.stringify(m).length<1800&&Object.keys(m).forEach(e=>{h.searchParams.set(e,encodeURIComponent(String(m[e])))});let p=!1,g="Cannot call API methods after calling `destroy()`.",f=[],v=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),f.push(e)},y=await new Promise(e=>{if(!d)return;let t=d.dataset.height||d.style.height;if(t&&!l){let e=isNaN(Number(t))?t:t+"px";d.style.height=e}"false"===d.dataset.defaultStyles||l||(d.style.backgroundColor||="#fff",d.style.border||="1px solid black",d.style.borderRadius||="8px",d.style.boxSizing||="border-box",d.style.padding||="0",d.style.width||="100%",d.style.height||=d.style.height||"300px",d.style.minHeight="200px",d.style.flexGrow="1",d.style.overflow||="hidden",d.style.resize||="vertical");let n="livecodes",o=d.querySelector(`iframe.${n}`),r=o||document.createElement("iframe");r.classList.add(n),r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),r.setAttribute("loading","eager"===i?"eager":"lazy"),l?E(r):(r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=d.style.borderRadius),v(function e(t){t.source===r.contentWindow&&t.origin===u&&t.data?.type==="livecodes-init"&&(removeEventListener("message",e),c=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!c||c<46)&&v(function e(t){t.source===r.contentWindow&&t.origin===u&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:s},u))}),r.onload=()=>{e(r)},r.src=h.href,o||d.appendChild(r)}),x=new Promise(e=>{v(function t(n){n.source===y.contentWindow&&n.origin===u&&n.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),x.settled=!0)})}),w=()=>p?Promise.reject(g):new Promise(async e=>{x.settled&&e(),y.contentWindow?.postMessage({type:"livecodes-load"},u),await x,e()}),j=(e,t)=>new Promise(async(n,s)=>{if(p)return s(g);await w();let o=P();v(function t(r){if(r.source===y.contentWindow&&r.origin===u&&r.data?.type==="livecodes-api-response"&&r.data?.id===o&&r.data.method===e){removeEventListener("message",t);let e=r.data.payload;e?.error?s(e.error):n(e)}}),y.contentWindow?.postMessage({method:e,id:o,args:t},u)}),b={},k=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(p)throw Error(g);return k.includes(e)?(j("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter(e=>e!==t),b[e]?.length===0&&j("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];v(async function(e){let t=C(e.data?.type??"");if(e.source!==y.contentWindow||e.origin!==u||!t||!b[t])return;let n=e.data?.payload;b[t]?.forEach(e=>{e(n)})});let M=()=>{y?.remove?.(),Object.values(b).forEach(e=>{e.length=0}),f.forEach(e=>removeEventListener("message",e)),f.length=0,t&&d&&t.unobserve(d),p=!0};function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===i&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await w(),t.unobserve(d))})},{rootMargin:"150px"})).observe(d);let P=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>w(),run:()=>j("run"),format:e=>j("format",[e]),getShareUrl:e=>j("getShareUrl",[e]),getConfig:e=>j("getConfig",[e]),setConfig:e=>j("setConfig",[e]),getCode:()=>j("getCode"),show:(e,t)=>j("show",[e,t]),runTests:()=>j("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return j("exec",[e,...n])},destroy:()=>p?Promise.reject(g):(M(),Promise.resolve())}}function r(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:n="https://livecodes.io",params:o={},config:r={},headless:i,import:a,lite:l,view:d,...c}=t;try{e=new URL(n)}catch{throw Error(`${n} is not a valid URL.`)}let h=new URLSearchParams;Object.entries(c).forEach(t=>{let[n,s]=t;void 0!==s&&e.searchParams.set(n,String(s))});let u="headless"===t.view||i;if(l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":e.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==d?r.view=d:e.searchParams.set("view",d)),"string"==typeof r)try{new URL(r),e.searchParams.set("config",encodeURIComponent(r))}catch{throw Error('"config" is not a valid URL or configuration object.')}else r&&"object"==typeof r&&Object.keys(r).length>0&&(r.title&&"Untitled Project"!==r.title&&e.searchParams.set("title",r.title),r.description&&r.description.length>0&&e.searchParams.set("description",r.description),h.set("config","code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(r))));if(o&&"object"==typeof o&&Object.keys(o).length>0)try{h.set("params",(0,s.compressToEncodedURIComponent)(JSON.stringify(o)))}catch{Object.keys(o).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(o[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),u&&e.searchParams.set("headless","true"),h.toString().length>0&&(e.hash=h.toString()),e.href}},50065:function(e,t,n){n.d(t,{Z:function(){return a},a:function(){return i}});var s=n(67294);let o={},r=s.createContext(o);function i(e){let t=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);