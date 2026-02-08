"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4343"],{89311:function(e,t,n){n.r(t),n.d(t,{default:()=>m,frontMatter:()=>c,metadata:()=>o,assets:()=>u,colorGeneratorParams:()=>h,toc:()=>p,contentTitle:()=>d});var o=JSON.parse('{"id":"tutorials/building-your-first-app","title":"Building Your First App","description":".container {","source":"@site/docs/tutorials/building-your-first-app.mdx","sourceDirName":"tutorials","slug":"/tutorials/building-your-first-app","permalink":"/livecodes/docs/tutorials/building-your-first-app","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/tutorials/building-your-first-app.mdx","tags":[],"version":"current","frontMatter":{"title":"Building Your First App"},"sidebar":"docsSidebar","previous":{"title":"Getting Started Guide","permalink":"/livecodes/docs/tutorials/getting-started-guide"},"next":{"title":"Bookmarklet","permalink":"/livecodes/docs/bookmarklet"}}'),r=n("85893"),s=n("50065"),i=n("31705"),l=n("13365"),a=n("58500");let c={title:"Building Your First App"},d="Building Your First App",u={},h={html:`<div class="container">
  <h1>Color Generator</h1>
  <div class="color-display" id="colorDisplay">
    <span id="colorCode">#3498db</span>
  </div>
  <button id="generateBtn">Generate Color</button>
  <p class="hint">Click the button to generate a random color!</p>
</div>
`,css:`body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #3498db;
  transition: background 0.5s ease;
}

.container {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
  margin: 0 0 30px 0;
  color: #333;
}

.color-display {
  background: #f0f0f0;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}

#colorCode {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  color: #333;
}

#generateBtn {
  background: #333;
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

#generateBtn:hover {
  transform: scale(1.05);
}

#generateBtn:active {
  transform: scale(0.95);
}

.hint {
  margin-top: 20px;
  color: #666;
  font-size: 0.9rem;
}
`,js:`const colorDisplay = document.getElementById('colorDisplay');
const colorCode = document.getElementById('colorCode');
const generateBtn = document.getElementById('generateBtn');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateColor() {
  const newColor = getRandomColor();
  document.body.style.background = newColor;
  colorCode.textContent = newColor;
}

generateBtn.addEventListener('click', updateColor);

// Generate a color on page load
updateColor();
`},p=[{value:"What We&#39;ll Build",id:"what-well-build",level:2},{value:"Project Setup",id:"project-setup",level:2},{value:"Implementation",id:"implementation",level:2},{value:"HTML Structure",id:"html-structure",level:3},{value:"Styling",id:"styling",level:3},{value:"JavaScript Logic",id:"javascript-logic",level:3},{value:"How It Works",id:"how-it-works",level:2},{value:"Testing Your App",id:"testing-your-app",level:2},{value:"Challenge: Enhance Your App",id:"challenge-enhance-your-app",level:2},{value:"Congratulations!",id:"congratulations",level:2},{value:"Next Steps",id:"next-steps",level:2},{value:"Complete Code Summary",id:"complete-code-summary",level:2}];function g(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"building-your-first-app",children:"Building Your First App"})}),"\n",(0,r.jsx)(t.p,{children:"Learn how to build a simple color generator app using LiveCodes. This app will let users click a button to generate random background colors."}),"\n",(0,r.jsx)(t.p,{children:"Try the completed project below:"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(a.Z,{linkText:"open it in a new tab",params:h}),"."]}),"\n",(0,r.jsx)(l.Z,{params:h}),"\n",(0,r.jsx)(t.h2,{id:"what-well-build",children:"What We'll Build"}),"\n",(0,r.jsx)(t.p,{children:"A fun color generator with:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Random color generation"}),"\n",(0,r.jsx)(t.li,{children:"Display the color code"}),"\n",(0,r.jsx)(t.li,{children:"Simple, clean interface"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"project-setup",children:"Project Setup"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:["Open ",(0,r.jsx)(t.a,{href:"https://livecodes.io",children:"LiveCodes"})]}),"\n",(0,r.jsx)(t.li,{children:"We'll use HTML, CSS, and JavaScript"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"implementation",children:"Implementation"}),"\n",(0,r.jsx)(t.h3,{id:"html-structure",children:"HTML Structure"}),"\n",(0,r.jsx)(i.Z,{language:"html",children:h.html}),"\n",(0,r.jsx)(t.h3,{id:"styling",children:"Styling"}),"\n",(0,r.jsx)(i.Z,{language:"css",children:h.css}),"\n",(0,r.jsx)(t.h3,{id:"javascript-logic",children:"JavaScript Logic"}),"\n",(0,r.jsx)(i.Z,{language:"js",children:h.js}),"\n",(0,r.jsx)(t.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"HTML"}),": Creates a simple layout with a color display and button"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"CSS"}),": Styles the interface and adds smooth transitions"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"JavaScript"}),":","\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"getRandomColor()"}),": Generates a random hex color"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"updateColor()"}),": Changes the background and displays the color code"]}),"\n",(0,r.jsx)(t.li,{children:"Event listener: Triggers color change on button click"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"testing-your-app",children:"Testing Your App"}),"\n",(0,r.jsx)(t.p,{children:"Try these features:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsx)(t.li,{children:'Click "Generate Color" multiple times'}),"\n",(0,r.jsx)(t.li,{children:"Watch the smooth color transitions"}),"\n",(0,r.jsx)(t.li,{children:"See the color code update"}),"\n",(0,r.jsx)(t.li,{children:"Notice the button hover and click effects"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"challenge-enhance-your-app",children:"Challenge: Enhance Your App"}),"\n",(0,r.jsx)(t.p,{children:"Try adding these features:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Copy color code to clipboard when clicked"}),"\n",(0,r.jsx)(t.li,{children:"Add a history of recent colors"}),"\n",(0,r.jsx)(t.li,{children:"Let users save their favorite colors"}),"\n",(0,r.jsx)(t.li,{children:"Add different color format options (RGB, HSL)"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"congratulations",children:"Congratulations!"}),"\n",(0,r.jsx)(t.p,{children:"You've just built your color generator app with LiveCodes!"}),"\n",(0,r.jsx)(t.p,{children:"Compare your version with the completed project above. Did you add any personal touches?"}),"\n",(0,r.jsx)(a.Z,{linkText:"View the completed project",params:h}),"\n",(0,r.jsx)(t.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/features/external-resources",children:"External Resources"})," - Add libraries like color manipulation tools"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/tutorials/getting-started-guide",children:"Getting Started Guide"})," - Review the basics"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"complete-code-summary",children:"Complete Code Summary"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Concepts Covered"}),": DOM manipulation, events, random generation, CSS transitions"]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Time to Build"}),": 10-15 minutes"]})]})}function m(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(g,{...e})}):g(e)}},13365:function(e,t,n){n.d(t,{Z:()=>f});var o=n("85893"),r=n("79207"),s=n("67294"),i=n("38294");function l(e){let t=(0,s.useRef)(null),[n,r]=(0,s.useState)(e.className||""),[l,a]=(0,s.useState)(e.style||{}),[c,d]=(0,s.useState)(e.height),[u,h]=(0,s.useState)(),[p,g]=(0,s.useState)(JSON.stringify(e.config||"")),[m,f]=(0,s.useState)("");return(0,s.useEffect)(()=>{if(!t.current)return;let{className:n,style:o,height:s,sdkReady:l,config:c,...v}=e;if(r(n||""),a(o||{}),d(s),u&&m===JSON.stringify(v)){if(p===JSON.stringify(c))return;g(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{u?.setConfig(e)}):c&&u.setConfig(c)}else f(JSON.stringify(v)),u?.destroy(),(0,i.T)(t.current,{config:c,...v}).then(e=>{h(e),"function"==typeof l&&l(e)})},[e]),(0,s.useEffect)(()=>()=>{u?.destroy()},[]),(0,o.jsx)("div",{ref:t,className:n,style:l,"data-height":c})}var a=n("21858"),c=n("33262"),d=n("31705"),u=n("97645"),h=n("58168"),p=n("98228"),g=n("45050");function m(e){let[t,n]=(0,s.useState)(e.js),[r,i]=(0,s.useState)(e.ts),[l,a]=(0,s.useState)(e.react),[m,f]=(0,s.useState)(e.vue),[v,y]=(0,s.useState)(e.svelte),[x,j]=(0,s.useState)(e.solid),b="3.7rem",[w,C]=(0,s.useState)(!0),[S,k]=(0,s.useState)(b),E=(0,s.useRef)(null),L=()=>{setTimeout(()=>{k(`calc(${E.current.offsetHeight}px + ${b})`)},5),setTimeout(()=>{k(`calc(${E.current.offsetHeight}px + ${b})`)},255)};return(0,s.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),i(e(r,"ts")),a(e(l,"jsx")),f(e(m,"html")),y(e(v,"html")),j(e(x,"tsx"))}},[]),(0,o.jsxs)("details",{className:`alert alert--info ${g.Z.details} ${p.Z.details}`,"data-collapsed":w,style:{height:w?b:S,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,o.jsx)("summary",{onClick:()=>{C(!w),L()},children:"show code"}),(0,o.jsx)("div",{ref:E,style:{display:"block",overflow:"hidden"},children:(0,o.jsx)("div",{className:g.Z.collapsibleContent,children:(0,o.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,o.jsx)(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:L},children:(0,o.jsx)(d.Z,{language:"js",children:t})}),(0,o.jsx)(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:L},children:(0,o.jsx)(d.Z,{language:"ts",children:r})}),(0,o.jsx)(u.Z,{value:"react",label:"React",attributes:{onMouseDown:L},children:(0,o.jsx)(d.Z,{language:"jsx",children:l})}),(0,o.jsx)(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:L},children:(0,o.jsx)(d.Z,{language:"html",children:m})}),(0,o.jsx)(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:L},children:(0,o.jsx)(d.Z,{language:"html",children:v})}),(0,o.jsx)(u.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:L},children:(0,o.jsx)(d.Z,{language:"tsx",children:x})})]})})})]})}function f(e){let{className:t,style:n,showCode:s,height:i,...c}=e,{colorMode:d}=(0,r.I)(),u=e=>JSON.stringify(e,null,2),h=`
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

`.trimStart(),y=`
import { createPlayground, type EmbedOptions } from 'livecodes';

export default function App() {
  const options: EmbedOptions = ${u(c)};
  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options);
  };

  return <div ref={onMounted}></div>;
}

`.trimStart();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:a.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,o.jsx)(m,{js:h,ts:p,react:g,vue:f,svelte:v,solid:y})]})}},58500:function(e,t,n){n.d(t,{Z:()=>c});var o=n("85893");n("67294");var r=n("6735");function s(e){let{children:t,fallback:n}=e;return(0,r.Z)()?(0,o.jsx)(o.Fragment,{children:t?.()}):n??null}var i=n("31705"),l=n("38294"),a=n("21858");function c(e){let{params:t,config:n,code:r,language:c="js",codeTitle:d="",showLineNumbers:u=!1,formatCode:h=!0,linkText:p="Run in LiveCodes",style:g={},className:m=""}=e,f=(0,l.r)({appUrl:a.G,params:t,config:n});return(0,o.jsxs)("div",{style:{marginBottom:"30px",...g},className:m,children:[r&&(0,o.jsx)(s,{children:()=>(0,o.jsx)(i.Z,{language:c,title:d,showLineNumbers:u,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(r,c):r})}),(0,o.jsxs)("a",{href:f,target:"_blank",rel:"noreferrer",children:[p,(0,o.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,o.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},38294:function(e,t,n){n.d(t,{T:function(){return r},r:function(){return s}});var o=n(17728);async function r(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(n=e,e=null);let{config:o={},headless:r,loading:i="lazy",view:l}=n,a=r||"headless"===l,c=null,d=null;if("string"==typeof e)c=document.querySelector(e);else if(e instanceof HTMLElement)c=e;else if(!(a&&"object"==typeof e))throw Error("A valid container element is required.");if(!c){if(a)L(c=document.createElement("div")),document.body.appendChild(c);else throw Error(`Cannot find element: "${e}"`)}let u=new URL(s(n)),h=u.origin;u.searchParams.set("embed","true"),u.searchParams.set("loading",a?"eager":i),u.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof o&&Object.keys(o).length>0&&u.searchParams.set("config","sdk");let p=n.params;"object"==typeof p&&Object.keys(p).length>0&&JSON.stringify(p).length<1800&&Object.keys(p).forEach(e=>{u.searchParams.set(e,encodeURIComponent(String(p[e])))});let g=!1,m="Cannot call API methods after calling `destroy()`.",f=[],v=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),f.push(e)},y=await new Promise(e=>{if(!c)return;let t=c.dataset.height||c.style.height;if(t&&!a){let e=isNaN(Number(t))?t:t+"px";c.style.height=e}"false"===c.dataset.defaultStyles||a||(c.style.backgroundColor||="#fff",c.style.border||="1px solid black",c.style.borderRadius||="8px",c.style.boxSizing||="border-box",c.style.padding||="0",c.style.width||="100%",c.style.height||=c.style.height||"300px",c.style.minHeight="200px",c.style.flexGrow="1",c.style.overflow||="hidden",c.style.resize||="vertical");let n="livecodes",r=c.querySelector(`iframe.${n}`),s=r||document.createElement("iframe");s.classList.add(n),s.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),s.setAttribute("allowtransparency","true"),s.setAttribute("allowpaymentrequest","true"),s.setAttribute("allowfullscreen","true"),s.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),s.setAttribute("loading","eager"===i?"eager":"lazy"),a?L(s):(s.style.height="100%",s.style.minHeight="200px",s.style.width="100%",s.style.margin="0",s.style.border="0",s.style.borderRadius=c.style.borderRadius),v(function e(t){t.source===s.contentWindow&&t.origin===h&&t.data?.type==="livecodes-init"&&(removeEventListener("message",e),d=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!d||d<46)&&v(function e(t){t.source===s.contentWindow&&t.origin===h&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),s.contentWindow?.postMessage({type:"livecodes-config",payload:o},h))}),s.onload=()=>{e(s)},s.src=u.href,r||c.appendChild(s)}),x=new Promise(e=>{v(function t(n){n.source===y.contentWindow&&n.origin===h&&n.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),x.settled=!0)})}),j=()=>g?Promise.reject(m):new Promise(async e=>{x.settled&&e(),y.contentWindow?.postMessage({type:"livecodes-load"},h),await x,e()}),b=(e,t)=>new Promise(async(n,o)=>{if(g)return o(m);await j();let r=P();v(function t(s){if(s.source===y.contentWindow&&s.origin===h&&s.data?.type==="livecodes-api-response"&&s.data?.id===r&&s.data.method===e){removeEventListener("message",t);let e=s.data.payload;e?.error?o(e.error):n(e)}}),y.contentWindow?.postMessage({method:e,id:r,args:t},h)}),w={},C=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw Error(m);return C.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter(e=>e!==t),w[e]?.length===0&&b("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},k=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];v(async function(e){let t=k(e.data?.type??"");if(e.source!==y.contentWindow||e.origin!==h||!t||!w[t])return;let n=e.data?.payload;w[t]?.forEach(e=>{e(n)})});let E=()=>{y?.remove?.(),Object.values(w).forEach(e=>{e.length=0}),f.forEach(e=>removeEventListener("message",e)),f.length=0,t&&c&&t.unobserve(c),g=!0};function L(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===i&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await j(),t.unobserve(c))})},{rootMargin:"150px"})).observe(c);let P=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>j(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return b("exec",[e,...n])},destroy:()=>g?Promise.reject(m):(E(),Promise.resolve())}}function s(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:n="https://livecodes.io",params:r={},config:s={},headless:i,import:l,lite:a,view:c,...d}=t;try{e=new URL(n)}catch{throw Error(`${n} is not a valid URL.`)}let u=new URLSearchParams;Object.entries(d).forEach(t=>{let[n,o]=t;void 0!==o&&e.searchParams.set(n,String(o))});let h="headless"===t.view||i;if(a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof s&&null==s.mode?s.mode="lite":e.searchParams.set("lite","true")),c&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof s&&null==s.view&&"headless"!==c?s.view=c:e.searchParams.set("view",c)),"string"==typeof s)try{new URL(s),e.searchParams.set("config",encodeURIComponent(s))}catch{throw Error('"config" is not a valid URL or configuration object.')}else s&&"object"==typeof s&&Object.keys(s).length>0&&(s.title&&"Untitled Project"!==s.title&&e.searchParams.set("title",s.title),s.description&&s.description.length>0&&e.searchParams.set("description",s.description),u.set("config","code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(s))));if(r&&"object"==typeof r&&Object.keys(r).length>0)try{u.set("params",(0,o.compressToEncodedURIComponent)(JSON.stringify(r)))}catch{Object.keys(r).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(r[t])))})}return l&&e.searchParams.set("x",encodeURIComponent(l)),h&&e.searchParams.set("headless","true"),u.toString().length>0&&(e.hash=u.toString()),e.href}},50065:function(e,t,n){n.d(t,{Z:function(){return l},a:function(){return i}});var o=n(67294);let r={},s=o.createContext(r);function i(e){let t=o.useContext(s);return o.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);