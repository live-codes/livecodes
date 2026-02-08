"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["3428"],{85006:function(e,t,n){n.r(t),n.d(t,{default:()=>m,frontMatter:()=>c,gettingStartedParams:()=>h,assets:()=>u,metadata:()=>s,toc:()=>p,contentTitle:()=>d});var s=JSON.parse('{"id":"tutorials/getting-started-guide","title":"Getting Started Guide","description":"h1 {","source":"@site/docs/tutorials/getting-started-guide.mdx","sourceDirName":"tutorials","slug":"/tutorials/getting-started-guide","permalink":"/livecodes/docs/tutorials/getting-started-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/tutorials/getting-started-guide.mdx","tags":[],"version":"current","frontMatter":{"title":"Getting Started Guide"},"sidebar":"docsSidebar","previous":{"title":"Guides & Tutorials","permalink":"/livecodes/docs/tutorials/"},"next":{"title":"Building Your First App","permalink":"/livecodes/docs/tutorials/building-your-first-app"}}'),r=n("85893"),i=n("50065"),o=n("31705"),l=n("13365"),a=n("58500");let c={title:"Getting Started Guide"},d="Getting Started Guide",u={},h={html:`<div class="container">
  <h1 id="greeting">Hello, World!</h1>
  <input type="text" id="nameInput" placeholder="Enter your name">
  <button id="greetBtn">Greet Me!</button>
</div>
`,css:`.container {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #007bff;
  font-size: 2.5rem;
}

input {
  padding: 10px;
  font-size: 1rem;
  margin: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
`,js:`const greeting = document.getElementById('greeting');
const nameInput = document.getElementById('nameInput');
const greetBtn = document.getElementById('greetBtn');

greetBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    greeting.textContent = \`Hello, \${name}!\`;
  } else {
    greeting.textContent = 'Hello, World!';
  }
});
`},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Step 1: Open LiveCodes",id:"step-1-open-livecodes",level:2},{value:"Step 2: Create a Simple Page",id:"step-2-create-a-simple-page",level:2},{value:"HTML Panel",id:"html-panel",level:3},{value:"CSS Panel",id:"css-panel",level:3},{value:"JavaScript Panel",id:"javascript-panel",level:3},{value:"Step 3: See Your Results",id:"step-3-see-your-results",level:2},{value:"Step 4: Save Your Project",id:"step-4-save-your-project",level:2},{value:"Congratulations!",id:"congratulations",level:2},{value:"Next Steps",id:"next-steps",level:2},{value:"Tips",id:"tips",level:2}];function g(e){let t={a:"a",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"getting-started-guide",children:"Getting Started Guide"})}),"\n",(0,r.jsx)(t.p,{children:"This guide will walk you through creating your first project in LiveCodes."}),"\n",(0,r.jsx)(t.p,{children:"Try the completed project below:"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(a.Z,{linkText:"open it in a new tab",params:h}),"."]}),"\n",(0,r.jsx)(l.Z,{params:h}),"\n",(0,r.jsx)(t.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"A web browser (Chrome, Firefox, Safari, or Edge)"}),"\n",(0,r.jsx)(t.li,{children:"Basic knowledge of HTML, CSS, and JavaScript"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"step-1-open-livecodes",children:"Step 1: Open LiveCodes"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:["Navigate to ",(0,r.jsx)(t.a,{href:"https://livecodes.io",children:"livecodes.io"})]}),"\n",(0,r.jsxs)(t.li,{children:["You'll see the editor interface with three panels:","\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.strong,{children:"HTML"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.strong,{children:"CSS"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.strong,{children:"JavaScript"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"step-2-create-a-simple-page",children:"Step 2: Create a Simple Page"}),"\n",(0,r.jsx)(t.p,{children:"Let's create a simple interactive greeting card."}),"\n",(0,r.jsx)(t.h3,{id:"html-panel",children:"HTML Panel"}),"\n",(0,r.jsx)(o.Z,{language:"html",children:h.html}),"\n",(0,r.jsx)(t.h3,{id:"css-panel",children:"CSS Panel"}),"\n",(0,r.jsx)(o.Z,{language:"css",children:h.css}),"\n",(0,r.jsx)(t.h3,{id:"javascript-panel",children:"JavaScript Panel"}),"\n",(0,r.jsx)(o.Z,{language:"js",children:h.js}),"\n",(0,r.jsx)(t.h2,{id:"step-3-see-your-results",children:"Step 3: See Your Results"}),"\n",(0,r.jsx)(t.p,{children:"The result panel automatically updates as you type. Try:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Entering your name in the input field"}),"\n",(0,r.jsx)(t.li,{children:'Clicking the "Greet Me!" button'}),"\n",(0,r.jsx)(t.li,{children:"Modifying the colors in the CSS"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"step-4-save-your-project",children:"Step 4: Save Your Project"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:['Click on the "',(0,r.jsx)(t.strong,{children:"Project"}),'" menu button in the toolbar']}),"\n",(0,r.jsxs)(t.li,{children:['Click "',(0,r.jsx)(t.strong,{children:"Save"}),'" to save the project (on this device)']}),"\n",(0,r.jsxs)(t.li,{children:['You can open it later from "',(0,r.jsx)(t.strong,{children:"Project menu > Open"}),'"']}),"\n",(0,r.jsxs)(t.li,{children:['Use "',(0,r.jsx)(t.strong,{children:"Project menu > Share"}),'" to get a permanent URL to your project that you can share']}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"congratulations",children:"Congratulations!"}),"\n",(0,r.jsx)(t.p,{children:"You've just built your first interactive app with LiveCodes!"}),"\n",(0,r.jsx)(t.p,{children:"Compare your version with the completed project above. Did you add any personal touches?"}),"\n",(0,r.jsx)(a.Z,{linkText:"View the completed project",params:h}),"\n",(0,r.jsx)(t.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,r.jsx)(t.p,{children:"Now that you've created your first project, explore:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"building-your-first-app",children:"Building Your First App"})," - Create more complex applications"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/features/",children:"Features"})," - Learn about all LiveCodes features"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/features/templates",children:"Templates"})," - Use pre-built templates"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/features/external-resources",children:"External Resources"})," - Add libraries to your projects"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"tips",children:"Tips"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["Use ",(0,r.jsx)(t.strong,{children:"Ctrl/Cmd + S"})," to manually save"]}),"\n",(0,r.jsxs)(t.li,{children:["Press ",(0,r.jsx)(t.strong,{children:"Ctrl/Cmd + Alt + S"})," to open share panel"]}),"\n",(0,r.jsxs)(t.li,{children:["Press ",(0,r.jsx)(t.strong,{children:"Ctrl/Cmd + K"})," to open the command menu"]}),"\n",(0,r.jsxs)(t.li,{children:["Enable ",(0,r.jsx)(t.strong,{children:"Auto-save"})," in user settings for automatic saving"]}),"\n"]})]})}function m(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(g,{...e})}):g(e)}},13365:function(e,t,n){n.d(t,{Z:()=>f});var s=n("85893"),r=n("79207"),i=n("67294"),o=n("38294");function l(e){let t=(0,i.useRef)(null),[n,r]=(0,i.useState)(e.className||""),[l,a]=(0,i.useState)(e.style||{}),[c,d]=(0,i.useState)(e.height),[u,h]=(0,i.useState)(),[p,g]=(0,i.useState)(JSON.stringify(e.config||"")),[m,f]=(0,i.useState)("");return(0,i.useEffect)(()=>{if(!t.current)return;let{className:n,style:s,height:i,sdkReady:l,config:c,...v}=e;if(r(n||""),a(s||{}),d(i),u&&m===JSON.stringify(v)){if(p===JSON.stringify(c))return;g(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{u?.setConfig(e)}):c&&u.setConfig(c)}else f(JSON.stringify(v)),u?.destroy(),(0,o.T)(t.current,{config:c,...v}).then(e=>{h(e),"function"==typeof l&&l(e)})},[e]),(0,i.useEffect)(()=>()=>{u?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:n,style:l,"data-height":c})}var a=n("21858"),c=n("33262"),d=n("31705"),u=n("97645"),h=n("58168"),p=n("98228"),g=n("45050");function m(e){let[t,n]=(0,i.useState)(e.js),[r,o]=(0,i.useState)(e.ts),[l,a]=(0,i.useState)(e.react),[m,f]=(0,i.useState)(e.vue),[v,x]=(0,i.useState)(e.svelte),[j,y]=(0,i.useState)(e.solid),b="3.7rem",[w,S]=(0,i.useState)(!0),[C,P]=(0,i.useState)(b),E=(0,i.useRef)(null),L=()=>{setTimeout(()=>{P(`calc(${E.current.offsetHeight}px + ${b})`)},5),setTimeout(()=>{P(`calc(${E.current.offsetHeight}px + ${b})`)},255)};return(0,i.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),o(e(r,"ts")),a(e(l,"jsx")),f(e(m,"html")),x(e(v,"html")),y(e(j,"tsx"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${g.Z.details} ${p.Z.details}`,"data-collapsed":w,style:{height:w?b:C,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{S(!w),L()},children:"show code"}),(0,s.jsx)("div",{ref:E,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:g.Z.collapsibleContent,children:(0,s.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,s.jsx)(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:L},children:(0,s.jsx)(d.Z,{language:"js",children:t})}),(0,s.jsx)(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:L},children:(0,s.jsx)(d.Z,{language:"ts",children:r})}),(0,s.jsx)(u.Z,{value:"react",label:"React",attributes:{onMouseDown:L},children:(0,s.jsx)(d.Z,{language:"jsx",children:l})}),(0,s.jsx)(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:L},children:(0,s.jsx)(d.Z,{language:"html",children:m})}),(0,s.jsx)(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:L},children:(0,s.jsx)(d.Z,{language:"html",children:v})}),(0,s.jsx)(u.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:L},children:(0,s.jsx)(d.Z,{language:"tsx",children:j})})]})})})]})}function f(e){let{className:t,style:n,showCode:i,height:o,...c}=e,{colorMode:d}=(0,r.I)(),u=e=>JSON.stringify(e,null,2),h=`
import { createPlayground } from 'livecodes';

const options = ${u(c)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(c)};
createPlayground('#container', options);

`.trimStart(),g=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${u(c)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${u(c)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,v=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${u(c)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart(),x=`
import { createPlayground, type EmbedOptions } from 'livecodes';

export default function App() {
  const options: EmbedOptions = ${u(c)};
  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options);
  };

  return <div ref={onMounted}></div>;
}

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:o||"50vh",...e.style},appUrl:a.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(m,{js:h,ts:p,react:g,vue:f,svelte:v,solid:x})]})}},58500:function(e,t,n){n.d(t,{Z:()=>c});var s=n("85893");n("67294");var r=n("6735");function i(e){let{children:t,fallback:n}=e;return(0,r.Z)()?(0,s.jsx)(s.Fragment,{children:t?.()}):n??null}var o=n("31705"),l=n("38294"),a=n("21858");function c(e){let{params:t,config:n,code:r,language:c="js",codeTitle:d="",showLineNumbers:u=!1,formatCode:h=!0,linkText:p="Run in LiveCodes",style:g={},className:m=""}=e,f=(0,l.r)({appUrl:a.G,params:t,config:n});return(0,s.jsxs)("div",{style:{marginBottom:"30px",...g},className:m,children:[r&&(0,s.jsx)(i,{children:()=>(0,s.jsx)(o.Z,{language:c,title:d,showLineNumbers:u,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(r,c):r})}),(0,s.jsxs)("a",{href:f,target:"_blank",rel:"noreferrer",children:[p,(0,s.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,s.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},38294:function(e,t,n){n.d(t,{T:function(){return r},r:function(){return i}});var s=n(17728);async function r(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(n=e,e=null);let{config:s={},headless:r,loading:o="lazy",view:l}=n,a=r||"headless"===l,c=null,d=null;if("string"==typeof e)c=document.querySelector(e);else if(e instanceof HTMLElement)c=e;else if(!(a&&"object"==typeof e))throw Error("A valid container element is required.");if(!c){if(a)L(c=document.createElement("div")),document.body.appendChild(c);else throw Error(`Cannot find element: "${e}"`)}let u=new URL(i(n)),h=u.origin;u.searchParams.set("embed","true"),u.searchParams.set("loading",a?"eager":o),u.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof s&&Object.keys(s).length>0&&u.searchParams.set("config","sdk");let p=n.params;"object"==typeof p&&Object.keys(p).length>0&&JSON.stringify(p).length<1800&&Object.keys(p).forEach(e=>{u.searchParams.set(e,encodeURIComponent(String(p[e])))});let g=!1,m="Cannot call API methods after calling `destroy()`.",f=[],v=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),f.push(e)},x=await new Promise(e=>{if(!c)return;let t=c.dataset.height||c.style.height;if(t&&!a){let e=isNaN(Number(t))?t:t+"px";c.style.height=e}"false"===c.dataset.defaultStyles||a||(c.style.backgroundColor||="#fff",c.style.border||="1px solid black",c.style.borderRadius||="8px",c.style.boxSizing||="border-box",c.style.padding||="0",c.style.width||="100%",c.style.height||=c.style.height||"300px",c.style.minHeight="200px",c.style.flexGrow="1",c.style.overflow||="hidden",c.style.resize||="vertical");let n="livecodes",r=c.querySelector(`iframe.${n}`),i=r||document.createElement("iframe");i.classList.add(n),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),i.setAttribute("loading","eager"===o?"eager":"lazy"),a?L(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=c.style.borderRadius),v(function e(t){t.source===i.contentWindow&&t.origin===h&&t.data?.type==="livecodes-init"&&(removeEventListener("message",e),d=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!d||d<46)&&v(function e(t){t.source===i.contentWindow&&t.origin===h&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:s},h))}),i.onload=()=>{e(i)},i.src=u.href,r||c.appendChild(i)}),j=new Promise(e=>{v(function t(n){n.source===x.contentWindow&&n.origin===h&&n.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),j.settled=!0)})}),y=()=>g?Promise.reject(m):new Promise(async e=>{j.settled&&e(),x.contentWindow?.postMessage({type:"livecodes-load"},h),await j,e()}),b=(e,t)=>new Promise(async(n,s)=>{if(g)return s(m);await y();let r=k();v(function t(i){if(i.source===x.contentWindow&&i.origin===h&&i.data?.type==="livecodes-api-response"&&i.data?.id===r&&i.data.method===e){removeEventListener("message",t);let e=i.data.payload;e?.error?s(e.error):n(e)}}),x.contentWindow?.postMessage({method:e,id:r,args:t},h)}),w={},S=["load","ready","code","console","tests","destroy"],C=(e,t)=>{if(g)throw Error(m);return S.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter(e=>e!==t),w[e]?.length===0&&b("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},P=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];v(async function(e){let t=P(e.data?.type??"");if(e.source!==x.contentWindow||e.origin!==h||!t||!w[t])return;let n=e.data?.payload;w[t]?.forEach(e=>{e(n)})});let E=()=>{x?.remove?.(),Object.values(w).forEach(e=>{e.length=0}),f.forEach(e=>removeEventListener("message",e)),f.length=0,t&&c&&t.unobserve(c),g=!0};function L(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===o&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await y(),t.unobserve(c))})},{rootMargin:"150px"})).observe(c);let k=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>y(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>C("code",e),watch:C,exec:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return b("exec",[e,...n])},destroy:()=>g?Promise.reject(m):(E(),Promise.resolve())}}function i(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:n="https://livecodes.io",params:r={},config:i={},headless:o,import:l,lite:a,view:c,...d}=t;try{e=new URL(n)}catch{throw Error(`${n} is not a valid URL.`)}let u=new URLSearchParams;Object.entries(d).forEach(t=>{let[n,s]=t;void 0!==s&&e.searchParams.set(n,String(s))});let h="headless"===t.view||o;if(a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":e.searchParams.set("lite","true")),c&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==c?i.view=c:e.searchParams.set("view",c)),"string"==typeof i)try{new URL(i),e.searchParams.set("config",encodeURIComponent(i))}catch{throw Error('"config" is not a valid URL or configuration object.')}else i&&"object"==typeof i&&Object.keys(i).length>0&&(i.title&&"Untitled Project"!==i.title&&e.searchParams.set("title",i.title),i.description&&i.description.length>0&&e.searchParams.set("description",i.description),u.set("config","code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(i))));if(r&&"object"==typeof r&&Object.keys(r).length>0)try{u.set("params",(0,s.compressToEncodedURIComponent)(JSON.stringify(r)))}catch{Object.keys(r).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(r[t])))})}return l&&e.searchParams.set("x",encodeURIComponent(l)),h&&e.searchParams.set("headless","true"),u.toString().length>0&&(e.hash=u.toString()),e.href}},50065:function(e,t,n){n.d(t,{Z:function(){return l},a:function(){return o}});var s=n(67294);let r={},i=s.createContext(r);function o(e){let t=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);