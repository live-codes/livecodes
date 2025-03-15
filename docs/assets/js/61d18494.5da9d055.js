"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["5794"],{1280:function(e,t,s){s.r(t),s.d(t,{default:()=>u,frontMatter:()=>l,metadata:()=>n,assets:()=>c,toc:()=>d,contentTitle:()=>a});var n=JSON.parse('{"id":"languages/sql","title":"SQL (SQLite)","description":"SQLite is a small, fast, self-contained, high-reliability, full-featured, SQL database engine. LiveCodes runs SQLite (compiled to Wasm) in the browser using SQL.js.","source":"@site/docs/languages/sql.mdx","sourceDirName":"languages","slug":"/languages/sql","permalink":"/livecodes/docs/languages/sql","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/sql.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Solid (TS)","permalink":"/livecodes/docs/languages/solid.tsx"},"next":{"title":"Stencil","permalink":"/livecodes/docs/languages/stencil"}}'),r=s("5893"),o=s("65"),i=s("3365");let l={},a="SQL (SQLite)",c={},d=[{value:"Usage",id:"usage",level:2},{value:"Helper Methods",id:"helper-methods",level:3},{value:"Example Usage",id:"example-usage",level:3},{value:"Custom Settings",id:"custom-settings",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Aliases/Extensions",id:"aliasesextensions",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function h(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"sql-sqlite",children:"SQL (SQLite)"})}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://www.sqlite.org/",children:"SQLite"})," is a small, fast, self-contained, high-reliability, full-featured, SQL database engine. LiveCodes runs SQLite (compiled to ",(0,r.jsx)(t.a,{href:"https://webassembly.org/",children:"Wasm"}),") in the browser using ",(0,r.jsx)(t.a,{href:"https://sql.js.org/",children:"SQL.js"}),"."]}),"\n",(0,r.jsx)(t.admonition,{title:"Note",type:"info",children:(0,r.jsxs)(t.p,{children:["Please note that LiveCodes also supports ",(0,r.jsx)(t.a,{href:"/livecodes/docs/languages/postgresql",children:"PostgreSQL"}),"."]})}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsxs)(t.p,{children:["The SQL code runs (in the browser) and the output is produced as a JSON object. This JSON object is added to the ",(0,r.jsx)(t.a,{href:"/livecodes/docs/features/result",children:"result page"})," in a ",(0,r.jsx)(t.code,{children:"script"})," block with type ",(0,r.jsx)(t.code,{children:"application/json"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"#helper-methods",children:"Helper methods"})," are provided for easy access/rendering of the JSON object (see below)."]}),"\n",(0,r.jsx)(t.h3,{id:"helper-methods",children:"Helper Methods"}),"\n",(0,r.jsxs)(t.p,{children:["The JavaScript object ",(0,r.jsx)(t.code,{children:"livecodes.sql"})," is globally available in the ",(0,r.jsx)(t.a,{href:"/livecodes/docs/features/result",children:"result page"}),". This can be used in ",(0,r.jsx)(t.code,{children:"script"})," blocks in the ",(0,r.jsx)(t.a,{href:"/livecodes/docs/features/projects",children:"markup editor"})," (page HTML - see HTML editor is ",(0,r.jsx)(t.a,{href:"#example-usage",children:"example usage"}),"). It provides the following methods for easy access/rendering of the JSON object:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"livecodes.sql.getResult"})}),"\n",(0,r.jsxs)(t.p,{children:["Type: ",(0,r.jsx)(t.code,{children:"() => Promise<{ data: Array<{ columns: string[]; values: unknown[][]; }>}>"}),":"]}),"\n",(0,r.jsxs)(t.p,{children:["Returns a promise that resolves to the JSON object. The object has a single property ",(0,r.jsx)(t.code,{children:"data"})," which is an array of objects, each representing the output of a query (e.g. ",(0,r.jsx)(t.code,{children:"SELECT * FROM table"}),"). Each object has two properties ",(0,r.jsx)(t.code,{children:"columns"})," (an array of column names) and ",(0,r.jsx)(t.code,{children:"values"})," (an array of arrays of values)."]}),"\n",(0,r.jsx)(t.p,{children:"In case of errors, the promise rejects with the error message."}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",metastring:'title="HTML"',children:"<script>\n  livecodes.sql\n    .getResult()\n    .then((result) => {\n      console.log(result);\n      // { data: [{ columns: ['columnA', 'columnB'], values: [['row 1 - value A', 'row 1 - value B'], ['row 2 - value A', 'row 2 - value B']] }] }\n    })\n    .catch((error) => {\n      console.error(error);\n      // 'error message'\n    });\n<\/script>\n"})}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"livecodes.sql.getResultAsObjects"})}),"\n",(0,r.jsxs)(t.p,{children:["Type: ",(0,r.jsx)(t.code,{children:"() => Promise<{ [key: string]: unknown; }[][]>"}),":"]}),"\n",(0,r.jsx)(t.p,{children:"Returns a promise that resolves to the data as an array (representing queries/tables) of arrays (representing rows) of objects. Each object has key/value pairs for the column names and their values."}),"\n",(0,r.jsx)(t.p,{children:"In case of errors, the promise rejects with the error message."}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",metastring:'title="HTML"',children:"<script>\n  livecodes.sql\n    .getResultAsObjects()\n    .then((result) => {\n      console.log(result);\n      // [[{ columnA: 'row 1 - value A', columnB: 'row 1 - value B' }, { columnA: 'row 2 - value A', columnB: 'row 2 - value B' }]]\n    })\n    .catch((error) => {\n      console.error(error);\n      // 'error message'\n    });\n<\/script>\n"})}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"livecodes.sql.render: (element?: HTMLElement | string) => Promise<void>"}),":"]}),"\n",(0,r.jsxs)(t.p,{children:["Accepts a single parameter which can be a DOM element or a CSS selector and renders the JSON object as HTML ",(0,r.jsx)(t.code,{children:"table"}),"(s) in that element. If no element is specified, it renders the table(s) in ",(0,r.jsx)(t.code,{children:"document.body"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",metastring:'title="HTML"',children:"<div id=\"tables\"></div>\n<script>\n  livecodes.sql.render('#tables');\n<\/script>\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.admonition,{title:"Note",type:"info",children:(0,r.jsxs)(t.p,{children:["Helper methods for SQLite are identical to those for ",(0,r.jsx)(t.a,{href:"/livecodes/docs/languages/postgresql",children:"PostgreSQL"}),". So the same code can be used for both engines."]})}),"\n",(0,r.jsx)(t.h3,{id:"example-usage",children:"Example Usage"}),"\n","\n",(0,r.jsx)(i.Z,{template:"sql"}),"\n",(0,r.jsx)(t.h3,{id:"custom-settings",children:"Custom Settings"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"Custom settings"})," added to the property ",(0,r.jsx)(t.code,{children:"sql"})," are used during running the SQL code. It is a JSON object with the following properties:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"dbURL"}),": a URL to a SQLite database. It is downloaded and used to run the SQL code (",(0,r.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",children:"CORS"})," must be enabled). Changes are NOT persisted to the remote database."]}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"scriptURLs"}),": An array of URLs to SQL scripts that should be loaded before running the SQL code."]}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"params"}),": An object that can be used to pass parameters to the SQL code."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Example:"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "postgresql": {\n    "dbURL": "https://myserver.com/sqlite.db",\n    "scriptURLs": ["https://myserver.com/sql.sql"],\n    "params": {\n      "param1": "value1",\n      "param2": "value2"\n    }\n  }\n}\n'})}),"\n",(0,r.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,r.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"sql"})}),"\n",(0,r.jsx)(t.h3,{id:"aliasesextensions",children:"Aliases/Extensions"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"sql"}),", ",(0,r.jsx)(t.code,{children:"sqlite"}),", ",(0,r.jsx)(t.code,{children:"sqlite3"})]}),"\n",(0,r.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"script"})}),"\n",(0,r.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://sql.js.org/",children:"SQL.js"})}),"\n",(0,r.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"sql.js"}),": v1.10.3"]}),"\n",(0,r.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,r.jsxs)(t.p,{children:["using ",(0,r.jsx)(t.a,{href:"https://github.com/sql-formatter-org/sql-formatter",children:(0,r.jsx)(t.code,{children:"sql-formatter"})})]}),"\n",(0,r.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://livecodes.io/?template=sql",children:"https://livecodes.io/?template=sql"})}),"\n",(0,r.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://www.sqlite.org/",children:"SQLite official website"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://www.sqlite.org/lang.html",children:"SQLite syntax documentation"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://sql.js.org/",children:"SQL.js official website"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"/livecodes/docs/languages/postgresql",children:"PostgreSQL in LiveCodes"})}),"\n"]})]})}function u(e={}){let{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},3365:function(e,t,s){s.d(t,{Z:()=>f});var n=s("5893"),r=s("4200"),o=s("7294"),i=s("8294");function l(e){let t=(0,o.useRef)(null),[s,r]=(0,o.useState)(e.className||""),[l,a]=(0,o.useState)(e.style||{}),[c,d]=(0,o.useState)(e.height),[h,u]=(0,o.useState)(),[p,m]=(0,o.useState)(JSON.stringify(e.config||"")),[g,f]=(0,o.useState)("");return(0,o.useEffect)(()=>{if(!t.current)return;let{className:s,style:n,height:o,sdkReady:l,config:c,...j}=e;if(r(s||""),a(n||{}),d(o),h&&g===JSON.stringify(j)){if(p===JSON.stringify(c))return;m(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{h?.setConfig(e)}):c&&h.setConfig(c)}else f(JSON.stringify(j)),h?.destroy(),(0,i.T)(t.current,{config:c,...j}).then(e=>{u(e),"function"==typeof l&&l(e)})},[e]),(0,o.useEffect)(()=>()=>{h?.destroy()},[]),(0,n.jsx)("div",{ref:t,className:s,style:l,"data-height":c})}var a=s("1858"),c=s("3262"),d=s("1705"),h=s("8168"),u=s("7645"),p=s("5050"),m=s("8228");function g(e){let[t,s]=(0,o.useState)(e.js),[r,i]=(0,o.useState)(e.ts),[l,a]=(0,o.useState)(e.react),[g,f]=(0,o.useState)(e.vue),[j,v]=(0,o.useState)(e.svelte),x="3.7rem",[y,b]=(0,o.useState)(!0),[w,S]=(0,o.useState)(x),L=(0,o.useRef)(null),C=()=>{setTimeout(()=>{S(`calc(${L.current.offsetHeight}px + ${x})`)},5),setTimeout(()=>{S(`calc(${L.current.offsetHeight}px + ${x})`)},255)};return(0,o.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),i(e(r,"ts")),a(e(l,"jsx")),f(e(g,"html")),v(e(j,"html"))}},[]),(0,n.jsxs)("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":y,style:{height:y?x:w,overflow:"hidden",willChange:"height",transition:`height ${y?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,n.jsx)("summary",{onClick:()=>{b(!y),C()},children:"show code"}),(0,n.jsx)("div",{ref:L,style:{display:"block",overflow:"hidden"},children:(0,n.jsx)("div",{className:p.Z.collapsibleContent,children:(0,n.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,n.jsx)(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:C},children:(0,n.jsx)(d.Z,{language:"js",children:t})}),(0,n.jsx)(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:C},children:(0,n.jsx)(d.Z,{language:"ts",children:r})}),(0,n.jsx)(u.Z,{value:"react",label:"React",attributes:{onMouseDown:C},children:(0,n.jsx)(d.Z,{language:"jsx",children:l})}),(0,n.jsx)(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:C},children:(0,n.jsx)(d.Z,{language:"html",children:g})}),(0,n.jsx)(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:C},children:(0,n.jsx)(d.Z,{language:"html",children:j})})]})})})]})}function f(e){let{className:t,style:s,showCode:o,height:i,...c}=e,{colorMode:d}=(0,r.I)(),h=e=>JSON.stringify(e,null,2),u=`
import { createPlayground } from 'livecodes';

const options = ${h(c)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(c)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${h(c)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${h(c)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,j=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${h(c)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:a.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,n.jsx)(g,{js:u,ts:p,react:m,vue:f,svelte:j})]})}},8294:function(e,t,s){s.d(t,{T:function(){return r},r:function(){return o}});var n=s(7728);async function r(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(s=e,e=null);let{appUrl:n="https://livecodes.io/",params:r={},config:o={},import:i,headless:l,lite:a,loading:c="lazy",template:d,view:h}=s,u=l||"headless"===h,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!(u&&"object"==typeof e))throw Error("A valid container element is required.");if(!p){if(u)q(p=document.createElement("div")),document.body.appendChild(p);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(n)}catch{throw Error(`"${n}" is not a valid URL.`)}let m=t.origin;if("object"==typeof r&&Object.keys(r).forEach(e=>{t.searchParams.set(e,String(r[e]))}),d&&t.searchParams.set("template",d),i&&t.searchParams.set("x",i),u&&t.searchParams.set("headless","true"),a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof o&&null==o.mode?o.mode="lite":t.searchParams.set("lite","true")),h&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof o&&null==o.view&&"headless"!==h?o.view=h:t.searchParams.set("view",h)),"string"==typeof o)try{new URL(o),t.searchParams.set("config",o)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof o)Object.keys(o).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",u?"eager":c);let g=!1,f="Cannot call API methods after calling `destroy()`.",j=await new Promise(e=>{if(!p)return;let s=p.dataset.height||p.style.height;if(s&&!u){let e=isNaN(Number(s))?s:s+"px";p.style.height=e}"false"===p.dataset.defaultStyles||u||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="8px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");let n="livecodes",r=p.querySelector(`iframe.${n}`),i=r||document.createElement("iframe");i.classList.add(n),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),i.setAttribute("loading","eager"===c?"eager":"lazy"),u?q(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=p.style.borderRadius),addEventListener("message",function e(t){t.source===i.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:o},m))}),i.onload=()=>{e(i)},i.src=t.href,r||p.appendChild(i)}),v=new Promise(e=>{addEventListener("message",function t(s){s.source===j.contentWindow&&s.origin===m&&s.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),v.settled=!0)})}),x=()=>g?Promise.reject(f):new Promise(async e=>{v.settled&&e(),j.contentWindow?.postMessage({type:"livecodes-load"},m),await v,e()}),y=(e,t)=>new Promise(async(s,n)=>{if(g)return n(f);await x();let r=E();addEventListener("message",function t(o){if(o.source===j.contentWindow&&o.origin===m&&o.data?.type==="livecodes-api-response"&&o.data?.id===r&&o.data.method===e){removeEventListener("message",t);let e=o.data.payload;e?.error?n(e.error):s(e)}}),j.contentWindow?.postMessage({method:e,id:r,args:t},m)}),b={},w=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw Error(f);return w.includes(e)?(y("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter(e=>e!==t),b[e]?.length===0&&y("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},L=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=L(e.data?.type??"");if(e.source!==j.contentWindow||e.origin!==m||!t||!b[t])return;let s=e.data?.payload;b[t]?.forEach(e=>{e(s)})});let C=()=>{Object.values(b).forEach(e=>{e.length=0}),j?.remove?.(),g=!0};function q(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===c&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await x(),t.unobserve(p))})},{rootMargin:"150px"}).observe(p);let E=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>x(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),n=1;n<t;n++)s[n-1]=arguments[n];return y("exec",[e,...s])},destroy:()=>v.settled?y("destroy").then(C):g?Promise.reject(f):(C(),Promise.resolve())}}function o(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:s,config:r,import:o,...i}=e,l="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(r))}:{},a=new URLSearchParams(JSON.parse(JSON.stringify({...i,...s,x:o,...l}))).toString();return(t||"https://livecodes.io")+(a?"?"+a:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,s;let n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o=e.dataset.config||e.dataset.prefill;if(o)try{s=JSON.parse(o)}catch{}let i=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+i,...t,...s?{config:s}:{}})})})},65:function(e,t,s){s.d(t,{Z:function(){return l},a:function(){return i}});var n=s(7294);let r={},o=n.createContext(r);function i(e){let t=n.useContext(o);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);