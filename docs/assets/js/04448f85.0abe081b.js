"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4054"],{29827:function(e,t,n){n.r(t),n.d(t,{markdownConfig:()=>c,styledMarkdownParams:()=>h,default:()=>p,frontMatter:()=>a,metadata:()=>r,assets:()=>d,toc:()=>u,contentTitle:()=>l});var r=JSON.parse('{"id":"languages/markdown","title":"Markdown","description":"Markdown is a text-to-HTML conversion tool for web writers.","source":"@site/docs/languages/markdown.mdx","sourceDirName":"languages","slug":"/languages/markdown","permalink":"/livecodes/docs/languages/markdown","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/markdown.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Malina.js","permalink":"/livecodes/docs/languages/malina"},"next":{"title":"MDX","permalink":"/livecodes/docs/languages/mdx"}}'),o=n("85893"),s=n("50065"),i=n("65899");let a={},l="Markdown",d={},c={markup:{language:"markdown",content:`## Markdown

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
`},u=[{value:"Demo",id:"demo",level:2},{value:"Styles",id:"styles",level:2},{value:"Code Blocks",id:"code-blocks",level:2},{value:"Mermaid Diagrams",id:"mermaid-diagrams",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Aliases",id:"aliases",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function m(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"markdown",children:"Markdown"})}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"https://daringfireball.net/projects/markdown/",children:"Markdown"})," is a text-to-HTML conversion tool for web writers.\nMarkdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML."]}),"\n",(0,o.jsx)(t.p,{children:"Markdown is now one of the world's most popular markup languages."}),"\n",(0,o.jsx)(t.admonition,{title:"Note",type:"info",children:(0,o.jsxs)(t.p,{children:["Please note that MDX is also supported in LiveCodes and is ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/mdx",children:"documented here"}),"."]})}),"\n",(0,o.jsx)(t.h2,{id:"demo",children:"Demo"}),"\n","\n","\n",(0,o.jsx)(i.Z,{config:c}),"\n",(0,o.jsx)(t.h2,{id:"styles",children:"Styles"}),"\n",(0,o.jsx)(t.p,{children:"By default, no styes are added. Only HTML output is generated from the Markdown code."}),"\n",(0,o.jsxs)(t.p,{children:["If you want to style the result page similar to GitHub Markdown, you can use ",(0,o.jsx)(t.a,{href:"https://github.com/sindresorhus/github-markdown-css",children:(0,o.jsx)(t.code,{children:"github-markdown-css"})}),".\nNote that the body needs to have a ",(0,o.jsx)(t.code,{children:'class="markdown-body"'})," for the styles to be applied."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-js",metastring:'title="Script Editor (JS)"',children:"document.body.classList.add('markdown-body');\n"})}),"\n",(0,o.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,o.jsx)(i.Z,{params:h,height:"80vh"}),"\n",(0,o.jsx)(t.h2,{id:"code-blocks",children:"Code Blocks"}),"\n",(0,o.jsxs)(t.p,{children:["Syntax highlighting is provided for code blocks using ",(0,o.jsx)(t.a,{href:"https://highlightjs.org/",children:"highlight.js"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"mermaid-diagrams",children:"Mermaid Diagrams"}),"\n",(0,o.jsxs)(t.p,{children:["Mermaid diagrams are also supported. See ",(0,o.jsx)(t.a,{href:"https://mermaid.ai/open-source/",children:"Mermaid documentation"})," for usage."]}),"\n",(0,o.jsx)(t.p,{children:"Example:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-md",children:"```mermaid\ngraph TD\n  A--\x3eB\n  A--\x3eC\n  B--\x3eD\n```\n"})}),"\n",(0,o.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,o.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:"markdown"})}),"\n",(0,o.jsx)(t.h3,{id:"aliases",children:"Aliases"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:"md"}),", ",(0,o.jsx)(t.code,{children:"mdown"}),", ",(0,o.jsx)(t.code,{children:"mkdn"})]}),"\n",(0,o.jsx)(t.h3,{id:"extension",children:"Extension"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:".md"})}),"\n",(0,o.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:"script"})}),"\n",(0,o.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.a,{href:"https://marked.js.org/",children:"Marked"})}),"\n",(0,o.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:"marked"}),": v17.0.4"]}),"\n",(0,o.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,o.jsxs)(t.p,{children:["Using ",(0,o.jsx)(t.a,{href:"https://prettier.io/",children:"Prettier"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"custom-settings",children:"Custom Settings"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"Custom settings"})," added to the property ",(0,o.jsx)(t.code,{children:"markdown"})," are passed as a JSON object to ",(0,o.jsx)(t.a,{href:"https://marked.js.org/using_advanced",children:(0,o.jsx)(t.code,{children:"marked.parse"})}),". Please check the ",(0,o.jsx)(t.a,{href:"https://marked.js.org/using_advanced#options",children:"documentation"})," for full reference."]}),"\n",(0,o.jsx)(t.p,{children:"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"Example:"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "markdown": {\n    "gfm": true,\n    "breaks": true\n  }\n}\n'})}),"\n",(0,o.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.a,{href:"https://livecodes.io/?template=markdown",children:"https://livecodes.io/?template=markdown"})}),"\n",(0,o.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://daringfireball.net/projects/markdown/",children:"Markdown"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://marked.js.org/",children:"Marked"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://www.markdownguide.org/",children:"The Markdown Guide"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/mdx",children:"MDX support in LiveCodes"})}),"\n"]})]})}function p(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}},65899:function(e,t,n){n.d(t,{Z:()=>v});var r=n("85893"),o=n("79207"),s=n("67294"),i=n("88711");let a=function(e){let{useEffect:t,useRef:n}=e;return function(e){let r=n(null),o=n(void 0),s=n(""),a=n(""),l=n(0),d=n(!1),c=e.className||"",h=e.style||{},u=e.height&&Number(e.height)?`${e.height}px`:e.height;return t(()=>{if(!r.current)return;let{className:t,style:n,height:c,sdkReady:h,config:u,...m}=e,p=++l.current,g=()=>l.current!==p||d.current,f=JSON.stringify(m);if(o.current&&a.current===f){let e=JSON.stringify(u);if(s.current===e)return;s.current=e,u&&o.current.setConfig(u)}else a.current=f,s.current=JSON.stringify(u),o.current?.destroy(),o.current=void 0,(0,i.TH)(r.current,{config:u,...m}).then(e=>{if(g()){e.destroy();return}o.current=e,"function"==typeof h&&h(e)})},[e]),t(()=>()=>{d.current=!0,o.current?.destroy(),o.current=void 0},[]),{containerRef:r,className:c,style:h,height:u}}}({useEffect:s.useEffect,useRef:s.useRef});function l(e){let{containerRef:t,className:n,style:o,height:s}=a(e);return(0,r.jsx)("div",{ref:t,className:n,style:{...o,...s?{height:s}:{}},"data-height":s})}var d=n("21858"),c=n("33262"),h=n("31705"),u=n("97645"),m=n("58168"),p=n("98228"),g=n("45050");function f(e){let[t,n]=(0,s.useState)(e.js),[o,i]=(0,s.useState)(e.ts),[a,l]=(0,s.useState)(e.react),[d,f]=(0,s.useState)(e.vue),[v,x]=(0,s.useState)(e.svelte),[y,j]=(0,s.useState)(e.solid),[w,b]=(0,s.useState)(e.preact),[k,S]=(0,s.useState)(e.webComponents),C="3.7rem",[M,P]=(0,s.useState)(!0),[E,L]=(0,s.useState)(C),N=(0,s.useRef)(null),O=()=>{setTimeout(()=>{L(`calc(${N.current.offsetHeight}px + ${C})`)},5),setTimeout(()=>{L(`calc(${N.current.offsetHeight}px + ${C})`)},255)};return(0,s.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),i(e(o,"ts")),l(e(a,"jsx")),f(e(d,"html")),x(e(v,"html")),j(e(y,"tsx")),b(e(w,"jsx")),S(e(k,"html"))}},[]),(0,r.jsxs)("details",{className:`alert alert--info ${g.Z.details} ${p.Z.details}`,"data-collapsed":M,style:{height:M?C:E,overflow:"hidden",willChange:"height",transition:`height ${M?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,r.jsx)("summary",{onClick:()=>{P(!M),O()},children:"show code"}),(0,r.jsx)("div",{ref:N,style:{display:"block",overflow:"hidden"},children:(0,r.jsx)("div",{className:g.Z.collapsibleContent,children:(0,r.jsxs)(m.Z,{groupId:"sdk-code",children:[(0,r.jsx)(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:O},children:(0,r.jsx)(h.Z,{language:"js",children:t})}),(0,r.jsx)(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:O},children:(0,r.jsx)(h.Z,{language:"ts",children:o})}),(0,r.jsx)(u.Z,{value:"react",label:"React",attributes:{onMouseDown:O},children:(0,r.jsx)(h.Z,{language:"jsx",children:a})}),(0,r.jsx)(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:O},children:(0,r.jsx)(h.Z,{language:"html",children:d})}),(0,r.jsx)(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:O},children:(0,r.jsx)(h.Z,{language:"html",children:v})}),(0,r.jsx)(u.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:O},children:(0,r.jsx)(h.Z,{language:"tsx",children:y})}),(0,r.jsx)(u.Z,{value:"preact",label:"Preact",attributes:{onMouseDown:O},children:(0,r.jsx)(h.Z,{language:"jsx",children:w})}),(0,r.jsx)(u.Z,{value:"web-components",label:"Web Components",attributes:{onMouseDown:O},children:(0,r.jsx)(h.Z,{language:"html",children:k})})]})})})]})}function v(e){let{className:t,style:n,showCode:s,height:i,...a}=e,{colorMode:c}=(0,o.I)(),h=e=>JSON.stringify(e,null,2),u=`
import { createPlayground } from 'livecodes';

const options = ${h(a)};
createPlayground('#container', options);

`.trimStart(),m=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(a)};
createPlayground('#container', options);

`.trimStart(),p=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${h(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),g=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${h(a)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,v=`
<script>
import LiveCodes from 'livecodes/svelte';

const options = ${h(a)};
</script>

<LiveCodes {...options} />

`.trimStart(),x=`
import LiveCodes from 'livecodes/solid';

export default function App() {
  const options = ${h(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),y=`
import LiveCodes from 'livecodes/preact';

export default function App() {
  const options = ${h(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),j=(e=>{let{config:t,params:n,...r}=e,o=Object.entries(r).filter(e=>{let[,t]=e;return null!=t}).map(e=>{let[t,n]=e,r=t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`);return"boolean"==typeof n?n?r:null:`${r}="${n}"`}).filter(Boolean),s=o.length>0?"\n  "+o.join("\n  "):"",i=[];t&&i.push(`playground.config = ${JSON.stringify(t,null,2).split("\n").join("\n  ")};`),n&&i.push(`playground.params = ${JSON.stringify(n,null,2).split("\n").join("\n  ")};`);let a=i.length>0?`

  const playground = document.querySelector("live-codes");
  ${i.join("\n  ")}`:"";return`
<live-codes${s}></live-codes>

<script type="module">
  import "livecodes/web-components";${a}
</script>
`.trimStart()})(a);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:d.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,r.jsx)(f,{js:u,ts:m,react:p,vue:g,svelte:v,solid:x,preact:y,webComponents:j})]})}},88711:function(e,t,n){n.d(t,{rP:()=>l,TH:()=>a});var r=n("17728");let o={chrome:["accelerometer","bluetooth","camera","clipboard-read","clipboard-write","display-capture","encrypted-media","geolocation","gyroscope","language-detector","language-model","local-network-access","microphone","midi","proofreader","rewriter","serial","summarizer","translator","web-share","writer","window-placement","xr-spatial-tracking"],firefox:["camera","display-capture","geolocation","microphone","web-share"],default:["accelerometer","ambient-light-sensor","camera","display-capture","encrypted-media","geolocation","gyroscope","microphone","midi","payment","serial","vr","web-share","xr-spatial-tracking"]},s=()=>{if("undefined"==typeof navigator)return"default";let e=navigator.userAgent;return/Firefox\//i.test(e)?"firefox":/Chrome\//i.test(e)?"chrome":"default"},i=()=>o[s()].filter(e=>{let t=globalThis.document?.featurePolicy?.features?.();return!t||t.includes(e)}).join("; ");async function a(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(n=e,e=null);let{config:r={},headless:o,loading:s="lazy",view:a}=n,d=o||"headless"===a,c=null,h=null,u=e=>{e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"};if("string"==typeof e)c=document.querySelector(e);else if(e instanceof HTMLElement)c=e;else if(!(d&&"object"==typeof e))throw Error("A valid container element is required.");if(!c){if(d)u(c=document.createElement("div")),document.body.appendChild(c);else throw Error(`Cannot find element: "${e}"`)}let m=new URL(l(n)),p=m.origin;m.searchParams.set("embed","true"),m.searchParams.set("loading",d?"eager":s),m.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof r&&Object.keys(r).length>0&&m.searchParams.set("config","sdk");let g=n.params;"object"==typeof g&&Object.keys(g).length>0&&JSON.stringify(g).length<1800&&Object.keys(g).forEach(e=>{m.searchParams.set(e,encodeURIComponent(String(g[e])))});let f=!1,v="Cannot call API methods after calling `destroy()`.",x=[],y=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),x.push(e)},j=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";removeEventListener(t,e);let n=x.indexOf(e);n>-1&&x.splice(n,1)},w=await new Promise(e=>{if(!c)return;let t=c.dataset.height||c.style.height;if(t&&!d){let e=isNaN(Number(t))?t:t+"px";c.style.height=e}"false"===c.dataset.defaultStyles||d||(c.style.backgroundColor||="#fff",c.style.border||="1px solid black",c.style.borderRadius||="8px",c.style.boxSizing||="border-box",c.style.padding||="0",c.style.width||="100%",c.style.height||=c.style.height||"300px",c.style.minHeight="200px",c.style.flexGrow="1",c.style.overflow||="hidden",c.style.resize||="vertical","inline"!==getComputedStyle(c).getPropertyValue("display")||(c.style.display="block"));let n="livecodes",o=c.querySelector(`iframe.${n}`),a=o||document.createElement("iframe");a.classList.add(n),a.setAttribute("allow",i()),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),a.setAttribute("loading","eager"===s?"eager":"lazy"),d?u(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=c.style.borderRadius),y(function e(t){t.source===a.contentWindow&&t.origin===p&&t.data?.type==="livecodes-init"&&(j(e),h=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!h||h<46)&&y(function e(t){t.source===a.contentWindow&&t.origin===p&&t.data?.type==="livecodes-get-config"&&(j(e),a.contentWindow?.postMessage({type:"livecodes-config",payload:r},p))}),a.onload=()=>{e(a)},a.src=m.href,o||c.appendChild(a)}),b=new Promise(e=>{y(function t(n){n.source===w.contentWindow&&n.origin===p&&n.data?.type==="livecodes-ready"&&(j(t),e(),b.settled=!0)})}),k=()=>f?Promise.reject(v):new Promise(async e=>{b.settled&&e(),w.contentWindow?.postMessage({type:"livecodes-load"},p),await b,e()}),S=(e,t)=>new Promise(async(n,r)=>{if(f)return r(v);await k();let o=N(),s=setTimeout(()=>{j(i),r(Error(`SDK call "${e}" timed out after 60000ms.`))},6e4);function i(t){if(t.source===w.contentWindow&&t.origin===p&&t.data?.type==="livecodes-api-response"&&t.data?.id===o&&t.data.method===e){clearTimeout(s),j(i);let e=t.data.payload;e?.error?r(e.error):n(e)}}y(i),w.contentWindow?.postMessage({method:e,id:o,args:t},p)}),C={},M=["load","ready","code","console","tests","destroy"],P=(e,t)=>{if(f)throw Error(v);return M.includes(e)?(S("watch",[e]),C[e]||(C[e]=[]),C[e]?.push(t),{remove:()=>{C[e]=C[e]?.filter(e=>e!==t),C[e]?.length===0&&S("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},E=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];y(async function(e){let t=E(e.data?.type??"");if(e.source!==w.contentWindow||e.origin!==p||!t||!C[t])return;let n=e.data?.payload;C[t]?.forEach(e=>{e(n)})});let L=()=>{w?.remove?.(),Object.values(C).forEach(e=>{e.length=0}),x.forEach(e=>removeEventListener("message",e)),x.length=0,t&&c&&t.unobserve(c),f=!0};"lazy"===s&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await k(),t.unobserve(c))})},{rootMargin:"150px"})).observe(c);let N=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>S("run"),format:e=>S("format",[e]),getShareUrl:e=>S("getShareUrl",[e]),getConfig:e=>S("getConfig",[e]),setConfig:e=>S("setConfig",[e]),getCode:()=>S("getCode"),show:(e,t)=>S("show",[e,t]),runTests:()=>S("runTests"),onChange:e=>P("code",e),watch:P,exec:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return S("exec",[e,...n])},destroy:()=>f?Promise.reject(v):(L(),Promise.resolve())}}function l(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:n="https://livecodes.io",params:o={},config:s={},headless:i,import:a,lite:l,view:d,...c}=t;try{e=new URL(n)}catch{throw Error(`${n} is not a valid URL.`)}let h=new URLSearchParams;Object.entries(c).forEach(t=>{let[n,r]=t;void 0!==r&&e.searchParams.set(n,String(r))});let u="headless"===t.view||i;if(l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof s&&null==s.mode?s.mode="lite":e.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof s&&null==s.view&&"headless"!==d?s.view=d:e.searchParams.set("view",d)),"string"==typeof s)try{new URL(s),e.searchParams.set("config",encodeURIComponent(s))}catch{throw Error('"config" is not a valid URL or configuration object.')}else s&&"object"==typeof s&&Object.keys(s).length>0&&(s.title&&"Untitled Project"!==s.title&&e.searchParams.set("title",s.title),s.description&&s.description.length>0&&e.searchParams.set("description",s.description),h.set("config","code/"+(0,r.compressToEncodedURIComponent)(JSON.stringify(s))));if(o&&"object"==typeof o&&Object.keys(o).length>0)try{h.set("params",(0,r.compressToEncodedURIComponent)(JSON.stringify(o)))}catch{Object.keys(o).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(o[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),u&&e.searchParams.set("headless","true"),h.toString().length>0&&(e.hash=h.toString()),e.href}},50065:function(e,t,n){n.d(t,{Z:function(){return a},a:function(){return i}});var r=n(67294);let o={},s=r.createContext(o);function i(e){let t=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);