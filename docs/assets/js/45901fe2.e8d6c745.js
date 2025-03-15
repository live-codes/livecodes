"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["1576"],{9976:function(e,t,n){n.r(t),n.d(t,{default:()=>m,frontMatter:()=>a,metadata:()=>s,assets:()=>c,svelteSDKDemo:()=>u,toc:()=>h,contentTitle:()=>d});var s=JSON.parse('{"id":"sdk/svelte","title":"Svelte","description":"The JS/TS SDK can be used directly in Svelte components without the need for any wrappers.","source":"@site/docs/sdk/svelte.mdx","sourceDirName":"sdk","slug":"/sdk/svelte","permalink":"/livecodes/docs/sdk/svelte","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/sdk/svelte.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Vue SDK","permalink":"/livecodes/docs/sdk/vue"},"next":{"title":"Headless Mode","permalink":"/livecodes/docs/sdk/headless"}}'),o=n("5893"),r=n("65"),i=n("3365"),l=n("8500");let a={},d="Svelte",c={},u={svelte:`<script>
  import { onMount } from 'svelte';
  import { createPlayground } from 'livecodes';

  // Embed Options
  const options = {
    params: {
      html: '<h1>Hello World!</h1>',
      css: 'h1 {color: blue;}',
      js: 'console.log("Hello, Svelte!")',
      console: 'open',
    },
  };

  let container;
  let playground = $state(null);
  onMount(() => {
    createPlayground(container, options).then((p) => {
      playground = p; // now the SDK is available
    });
    // cleanup when the component is destroyed
    return () => playground?.destroy();
  });
</script>

<div bind:this="{container}"></div>
`},h=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Demo",id:"demo",level:2},{value:"Related",id:"related",level:2}];function p(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"svelte",children:"Svelte"})}),"\n","\n",(0,o.jsxs)(t.p,{children:["The ",(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts",children:"JS/TS SDK"})," can be used directly in Svelte components without the need for any wrappers."]}),"\n",(0,o.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,o.jsxs)(t.p,{children:["Please refer to the ",(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/#installation",children:"SDK installation"})," section."]}),"\n",(0,o.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(t.p,{children:"This is an example of using the LiveCodes JS SDK in a Svelte component:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-html",metastring:'title="Component.svelte"',children:"<script>\n  import { onMount } from 'svelte';\n  import { createPlayground } from 'livecodes';\n\n  // Embed Options\n  const options = {\n    params: {\n      html: '<h1>Hello World!</h1>',\n      css: 'h1 {color: blue;}',\n      js: 'console.log(\"Hello, Svelte!\")',\n      console: 'open',\n    },\n  };\n\n  let container;\n  let playground = $state(null);\n  onMount(() => {\n    createPlayground(container, options).then((p) => {\n      playground = p; // now the SDK is available\n    });\n    // cleanup when the component is destroyed\n    return () => playground?.destroy();\n  });\n<\/script>\n\n<div bind:this=\"{container}\"></div>\n"})}),"\n","\n",(0,o.jsx)(l.Z,{params:u}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#embed-options",children:"Embed options"}),", ",(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#sdk-methods",children:"SDK methods"})," and ",(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#typescript-types",children:"TypeScript types"})," are available as described in the ",(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts",children:"JS/TS SDK documentations"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["Alternatively, the SDK function ",(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#createplayground",children:(0,o.jsx)(t.code,{children:"createPlayground"})})," can be used as an ",(0,o.jsx)(t.a,{href:"https://learn.svelte.dev/tutorial/actions",children:"action"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"Example:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-html",metastring:'title="Component.svelte"',children:"<script>\n  import { createPlayground } from 'livecodes';\n  let options = {\n    // embed options\n  };\n<\/script>\n\n<div use:createPlayground=\"{options}\"></div>\n"})}),"\n",(0,o.jsx)(t.p,{children:"However, it is recommended to cleanup when the node is unmounted, like that:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-html",metastring:'title="Component.svelte"',children:"<script>\n  import { createPlayground } from 'livecodes';\n  let options = {\n    // embed options\n  };\n\n  const livecodes = (node, opts) => {\n    let playground = $state(null);\n    const ready = new Promise(async (res) => {\n      playground = await createPlayground(node, opts);\n      res();\n    });\n    return { destroy: () => ready.then(() => playground?.destroy()) };\n  };\n<\/script>\n\n<div use:livecodes=\"{options}\"></div>\n"})}),"\n",(0,o.jsx)(t.h2,{id:"demo",children:"Demo"}),"\n",(0,o.jsx)(i.Z,{params:u,height:"80vh"}),"\n",(0,o.jsx)(t.h2,{id:"related",children:"Related"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/#installation",children:"SDK Installation"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts",children:"JS/TS SDK"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/react",children:"React SDK"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"/livecodes/docs/sdk/vue",children:"Vue SDK"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"/livecodes/docs/features/embeds",children:"Embedded Playgrounds"})}),"\n"]})]})}function m(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},3365:function(e,t,n){n.d(t,{Z:()=>v});var s=n("5893"),o=n("4200"),r=n("7294"),i=n("8294");function l(e){let t=(0,r.useRef)(null),[n,o]=(0,r.useState)(e.className||""),[l,a]=(0,r.useState)(e.style||{}),[d,c]=(0,r.useState)(e.height),[u,h]=(0,r.useState)(),[p,m]=(0,r.useState)(JSON.stringify(e.config||"")),[f,v]=(0,r.useState)("");return(0,r.useEffect)(()=>{if(!t.current)return;let{className:n,style:s,height:r,sdkReady:l,config:d,...g}=e;if(o(n||""),a(s||{}),c(r),u&&f===JSON.stringify(g)){if(p===JSON.stringify(d))return;m(JSON.stringify(d)),"string"==typeof d?fetch(d).then(e=>e.json()).then(e=>{u?.setConfig(e)}):d&&u.setConfig(d)}else v(JSON.stringify(g)),u?.destroy(),(0,i.T)(t.current,{config:d,...g}).then(e=>{h(e),"function"==typeof l&&l(e)})},[e]),(0,r.useEffect)(()=>()=>{u?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:n,style:l,"data-height":d})}var a=n("1858"),d=n("3262"),c=n("1705"),u=n("8168"),h=n("7645"),p=n("5050"),m=n("8228");function f(e){let[t,n]=(0,r.useState)(e.js),[o,i]=(0,r.useState)(e.ts),[l,a]=(0,r.useState)(e.react),[f,v]=(0,r.useState)(e.vue),[g,y]=(0,r.useState)(e.svelte),j="3.7rem",[x,w]=(0,r.useState)(!0),[b,S]=(0,r.useState)(j),k=(0,r.useRef)(null),P=()=>{setTimeout(()=>{S(`calc(${k.current.offsetHeight}px + ${j})`)},5),setTimeout(()=>{S(`calc(${k.current.offsetHeight}px + ${j})`)},255)};return(0,r.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),i(e(o,"ts")),a(e(l,"jsx")),v(e(f,"html")),y(e(g,"html"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":x,style:{height:x?j:b,overflow:"hidden",willChange:"height",transition:`height ${x?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{w(!x),P()},children:"show code"}),(0,s.jsx)("div",{ref:k,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:p.Z.collapsibleContent,children:(0,s.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,s.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"js",children:t})}),(0,s.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"ts",children:o})}),(0,s.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"jsx",children:l})}),(0,s.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"html",children:f})}),(0,s.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"html",children:g})})]})})})]})}function v(e){let{className:t,style:n,showCode:r,height:i,...d}=e,{colorMode:c}=(0,o.I)(),u=e=>JSON.stringify(e,null,2),h=`
import { createPlayground } from 'livecodes';

const options = ${u(d)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(d)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${u(d)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),v=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${u(d)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,g=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${u(d)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:a.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(f,{js:h,ts:p,react:m,vue:v,svelte:g})]})}},8500:function(e,t,n){n.d(t,{Z:()=>d});var s=n("5893");n("7294");var o=n("6735");function r(e){let{children:t,fallback:n}=e;return(0,o.Z)()?(0,s.jsx)(s.Fragment,{children:t?.()}):n??null}var i=n("1705"),l=n("8294"),a=n("1858");function d(e){let{params:t,config:n,code:o,language:d="js",codeTitle:c="",showLineNumbers:u=!1,formatCode:h=!0,linkText:p="Run in LiveCodes",style:m={},className:f=""}=e,v=(0,l.r)({appUrl:a.G,params:t,config:n});return(0,s.jsxs)("div",{style:{marginBottom:"30px",...m},className:f,children:[o&&(0,s.jsx)(r,{children:()=>(0,s.jsx)(i.Z,{language:d,title:c,showLineNumbers:u,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(o,d):o})}),(0,s.jsxs)("a",{href:v,target:"_blank",rel:"noreferrer",children:[p,(0,s.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,s.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},8294:function(e,t,n){n.d(t,{T:function(){return o},r:function(){return r}});var s=n(7728);async function o(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(n=e,e=null);let{appUrl:s="https://livecodes.io/",params:o={},config:r={},import:i,headless:l,lite:a,loading:d="lazy",template:c,view:u}=n,h=l||"headless"===u,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!(h&&"object"==typeof e))throw Error("A valid container element is required.");if(!p){if(h)E(p=document.createElement("div")),document.body.appendChild(p);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(s)}catch{throw Error(`"${s}" is not a valid URL.`)}let m=t.origin;if("object"==typeof o&&Object.keys(o).forEach(e=>{t.searchParams.set(e,String(o[e]))}),c&&t.searchParams.set("template",c),i&&t.searchParams.set("x",i),h&&t.searchParams.set("headless","true"),a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":t.searchParams.set("lite","true")),u&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==u?r.view=u:t.searchParams.set("view",u)),"string"==typeof r)try{new URL(r),t.searchParams.set("config",r)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof r)Object.keys(r).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",h?"eager":d);let f=!1,v="Cannot call API methods after calling `destroy()`.",g=await new Promise(e=>{if(!p)return;let n=p.dataset.height||p.style.height;if(n&&!h){let e=isNaN(Number(n))?n:n+"px";p.style.height=e}"false"===p.dataset.defaultStyles||h||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="8px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");let s="livecodes",o=p.querySelector(`iframe.${s}`),i=o||document.createElement("iframe");i.classList.add(s),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),i.setAttribute("loading","eager"===d?"eager":"lazy"),h?E(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=p.style.borderRadius),addEventListener("message",function e(t){t.source===i.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:r},m))}),i.onload=()=>{e(i)},i.src=t.href,o||p.appendChild(i)}),y=new Promise(e=>{addEventListener("message",function t(n){n.source===g.contentWindow&&n.origin===m&&n.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),y.settled=!0)})}),j=()=>f?Promise.reject(v):new Promise(async e=>{y.settled&&e(),g.contentWindow?.postMessage({type:"livecodes-load"},m),await y,e()}),x=(e,t)=>new Promise(async(n,s)=>{if(f)return s(v);await j();let o=C();addEventListener("message",function t(r){if(r.source===g.contentWindow&&r.origin===m&&r.data?.type==="livecodes-api-response"&&r.data?.id===o&&r.data.method===e){removeEventListener("message",t);let e=r.data.payload;e?.error?s(e.error):n(e)}}),g.contentWindow?.postMessage({method:e,id:o,args:t},m)}),w={},b=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(f)throw Error(v);return b.includes(e)?(x("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter(e=>e!==t),w[e]?.length===0&&x("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},k=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=k(e.data?.type??"");if(e.source!==g.contentWindow||e.origin!==m||!t||!w[t])return;let n=e.data?.payload;w[t]?.forEach(e=>{e(n)})});let P=()=>{Object.values(w).forEach(e=>{e.length=0}),g?.remove?.(),f=!0};function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===d&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await j(),t.unobserve(p))})},{rootMargin:"150px"}).observe(p);let C=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>j(),run:()=>x("run"),format:e=>x("format",[e]),getShareUrl:e=>x("getShareUrl",[e]),getConfig:e=>x("getConfig",[e]),setConfig:e=>x("setConfig",[e]),getCode:()=>x("getCode"),show:(e,t)=>x("show",[e,t]),runTests:()=>x("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return x("exec",[e,...n])},destroy:()=>y.settled?x("destroy").then(P):f?Promise.reject(v):(P(),Promise.resolve())}}function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:n,config:o,import:r,...i}=e,l="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(o))}:{},a=new URLSearchParams(JSON.parse(JSON.stringify({...i,...n,x:r,...l}))).toString();return(t||"https://livecodes.io")+(a?"?"+a:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,n;let s=e.dataset.options;if(s)try{t=JSON.parse(s)}catch{}let r=e.dataset.config||e.dataset.prefill;if(r)try{n=JSON.parse(r)}catch{}let i=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+i,...t,...n?{config:n}:{}})})})},65:function(e,t,n){n.d(t,{Z:function(){return l},a:function(){return i}});var s=n(7294);let o={},r=s.createContext(o);function i(e){let t=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);