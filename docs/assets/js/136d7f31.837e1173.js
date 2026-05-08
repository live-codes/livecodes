"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["4343"],{89311:function(e,t,r){r.r(t),r.d(t,{default:()=>g,frontMatter:()=>c,metadata:()=>o,assets:()=>u,colorGeneratorParams:()=>h,toc:()=>p,contentTitle:()=>d});var o=JSON.parse('{"id":"tutorials/building-your-first-app","title":"Building Your First App","description":".container {","source":"@site/docs/tutorials/building-your-first-app.mdx","sourceDirName":"tutorials","slug":"/tutorials/building-your-first-app","permalink":"/livecodes/docs/tutorials/building-your-first-app","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/tutorials/building-your-first-app.mdx","tags":[],"version":"current","frontMatter":{"title":"Building Your First App"},"sidebar":"docsSidebar","previous":{"title":"Getting Started Guide","permalink":"/livecodes/docs/tutorials/getting-started-guide"},"next":{"title":"Embedding Playgrounds","permalink":"/livecodes/docs/tutorials/embedding-playgrounds"}}'),n=r("85893"),i=r("50065"),s=r("31705"),l=r("65899"),a=r("58500");let c={title:"Building Your First App"},d="Building Your First App",u={},h={html:`<div class="container">
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
`},p=[{value:"What We&#39;ll Build",id:"what-well-build",level:2},{value:"Project Setup",id:"project-setup",level:2},{value:"Implementation",id:"implementation",level:2},{value:"HTML Structure",id:"html-structure",level:3},{value:"Styling",id:"styling",level:3},{value:"JavaScript Logic",id:"javascript-logic",level:3},{value:"How It Works",id:"how-it-works",level:2},{value:"Testing Your App",id:"testing-your-app",level:2},{value:"Challenge: Enhance Your App",id:"challenge-enhance-your-app",level:2},{value:"Congratulations!",id:"congratulations",level:2},{value:"Next Steps",id:"next-steps",level:2},{value:"Complete Code Summary",id:"complete-code-summary",level:2}];function m(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"building-your-first-app",children:"Building Your First App"})}),"\n",(0,n.jsx)(t.p,{children:"Learn how to build a simple color generator app using LiveCodes. This app will let users click a button to generate random background colors."}),"\n",(0,n.jsx)(t.p,{children:"Try the completed project below:"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(a.Z,{linkText:"open it in a new tab",params:h}),"."]}),"\n",(0,n.jsx)(l.Z,{params:h}),"\n",(0,n.jsx)(t.h2,{id:"what-well-build",children:"What We'll Build"}),"\n",(0,n.jsx)(t.p,{children:"A fun color generator with:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Random color generation"}),"\n",(0,n.jsx)(t.li,{children:"Display the color code"}),"\n",(0,n.jsx)(t.li,{children:"Simple, clean interface"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"project-setup",children:"Project Setup"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:["Open ",(0,n.jsx)(t.a,{href:"https://livecodes.io",children:"LiveCodes"})]}),"\n",(0,n.jsx)(t.li,{children:"We'll use HTML, CSS, and JavaScript"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"implementation",children:"Implementation"}),"\n",(0,n.jsx)(t.h3,{id:"html-structure",children:"HTML Structure"}),"\n",(0,n.jsx)(s.Z,{language:"html",children:h.html}),"\n",(0,n.jsx)(t.h3,{id:"styling",children:"Styling"}),"\n",(0,n.jsx)(s.Z,{language:"css",children:h.css}),"\n",(0,n.jsx)(t.h3,{id:"javascript-logic",children:"JavaScript Logic"}),"\n",(0,n.jsx)(s.Z,{language:"js",children:h.js}),"\n",(0,n.jsx)(t.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"HTML"}),": Creates a simple layout with a color display and button"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"CSS"}),": Styles the interface and adds smooth transitions"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"JavaScript"}),":","\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"getRandomColor()"}),": Generates a random hex color"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"updateColor()"}),": Changes the background and displays the color code"]}),"\n",(0,n.jsx)(t.li,{children:"Event listener: Triggers color change on button click"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"testing-your-app",children:"Testing Your App"}),"\n",(0,n.jsx)(t.p,{children:"Try these features:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsx)(t.li,{children:'Click "Generate Color" multiple times'}),"\n",(0,n.jsx)(t.li,{children:"Watch the smooth color transitions"}),"\n",(0,n.jsx)(t.li,{children:"See the color code update"}),"\n",(0,n.jsx)(t.li,{children:"Notice the button hover and click effects"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"challenge-enhance-your-app",children:"Challenge: Enhance Your App"}),"\n",(0,n.jsx)(t.p,{children:"Try adding these features:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Copy color code to clipboard when clicked"}),"\n",(0,n.jsx)(t.li,{children:"Add a history of recent colors"}),"\n",(0,n.jsx)(t.li,{children:"Let users save their favorite colors"}),"\n",(0,n.jsx)(t.li,{children:"Add different color format options (RGB, HSL)"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"congratulations",children:"Congratulations!"}),"\n",(0,n.jsx)(t.p,{children:"You've just built your color generator app with LiveCodes!"}),"\n",(0,n.jsx)(t.p,{children:"Compare your version with the completed project above. Did you add any personal touches?"}),"\n",(0,n.jsx)(a.Z,{linkText:"View the completed project",params:h}),"\n",(0,n.jsx)(t.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"/livecodes/docs/features/external-resources",children:"External Resources"})," - Add libraries like color manipulation tools"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"/livecodes/docs/tutorials/getting-started-guide",children:"Getting Started Guide"})," - Review the basics"]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"complete-code-summary",children:"Complete Code Summary"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Concepts Covered"}),": DOM manipulation, events, random generation, CSS transitions"]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Time to Build"}),": 10-15 minutes"]})]})}function g(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},65899:function(e,t,r){r.d(t,{Z:()=>v});var o=r("85893"),n=r("79207"),i=r("67294"),s=r("88711");let l=function(e){let{useEffect:t,useRef:r}=e;return function(e){let o=r(null),n=r(void 0),i=r(""),l=r(""),a=r(0),c=r(!1),d=e.className||"",u=e.style||{},h=e.height&&Number(e.height)?`${e.height}px`:e.height;return t(()=>{if(!o.current)return;let{className:t,style:r,height:d,sdkReady:u,config:h,...p}=e,m=++a.current,g=()=>a.current!==m||c.current,f=JSON.stringify(p);if(n.current&&l.current===f){let e=JSON.stringify(h);if(i.current===e)return;i.current=e,h&&n.current.setConfig(h)}else l.current=f,i.current=JSON.stringify(h),n.current?.destroy(),n.current=void 0,(0,s.TH)(o.current,{config:h,...p}).then(e=>{if(g()){e.destroy();return}n.current=e,"function"==typeof u&&u(e)})},[e]),t(()=>()=>{c.current=!0,n.current?.destroy(),n.current=void 0},[]),{containerRef:o,className:d,style:u,height:h}}}({useEffect:i.useEffect,useRef:i.useRef});function a(e){let{containerRef:t,className:r,style:n,height:i}=l(e);return(0,o.jsx)("div",{ref:t,className:r,style:{...n,...i?{height:i}:{}},"data-height":i})}var c=r("21858"),d=r("33262"),u=r("31705"),h=r("97645"),p=r("58168"),m=r("98228"),g=r("45050");function f(e){let[t,r]=(0,i.useState)(e.js),[n,s]=(0,i.useState)(e.ts),[l,a]=(0,i.useState)(e.react),[c,f]=(0,i.useState)(e.vue),[v,y]=(0,i.useState)(e.svelte),[x,j]=(0,i.useState)(e.solid),[b,w]=(0,i.useState)(e.preact),[C,S]=(0,i.useState)(e.webComponents),k="3.7rem",[E,L]=(0,i.useState)(!0),[P,Z]=(0,i.useState)(k),N=(0,i.useRef)(null),A=()=>{setTimeout(()=>{Z(`calc(${N.current.offsetHeight}px + ${k})`)},5),setTimeout(()=>{Z(`calc(${N.current.offsetHeight}px + ${k})`)},255)};return(0,i.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};r(e(t,"js")),s(e(n,"ts")),a(e(l,"jsx")),f(e(c,"html")),y(e(v,"html")),j(e(x,"tsx")),w(e(b,"jsx")),S(e(C,"html"))}},[]),(0,o.jsxs)("details",{className:`alert alert--info ${g.Z.details} ${m.Z.details}`,"data-collapsed":E,style:{height:E?k:P,overflow:"hidden",willChange:"height",transition:`height ${E?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,o.jsx)("summary",{onClick:()=>{L(!E),A()},children:"show code"}),(0,o.jsx)("div",{ref:N,style:{display:"block",overflow:"hidden"},children:(0,o.jsx)("div",{className:g.Z.collapsibleContent,children:(0,o.jsxs)(p.Z,{groupId:"sdk-code",children:[(0,o.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:A},children:(0,o.jsx)(u.Z,{language:"js",children:t})}),(0,o.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:A},children:(0,o.jsx)(u.Z,{language:"ts",children:n})}),(0,o.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:A},children:(0,o.jsx)(u.Z,{language:"jsx",children:l})}),(0,o.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:A},children:(0,o.jsx)(u.Z,{language:"html",children:c})}),(0,o.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:A},children:(0,o.jsx)(u.Z,{language:"html",children:v})}),(0,o.jsx)(h.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:A},children:(0,o.jsx)(u.Z,{language:"tsx",children:x})}),(0,o.jsx)(h.Z,{value:"preact",label:"Preact",attributes:{onMouseDown:A},children:(0,o.jsx)(u.Z,{language:"jsx",children:b})}),(0,o.jsx)(h.Z,{value:"web-components",label:"Web Components",attributes:{onMouseDown:A},children:(0,o.jsx)(u.Z,{language:"html",children:C})})]})})})]})}function v(e){let{className:t,style:r,showCode:i,height:s,...l}=e,{colorMode:d}=(0,n.I)(),u=e=>JSON.stringify(e,null,2),h=`
import { createPlayground } from 'livecodes';

const options = ${u(l)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(l)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${u(l)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),g=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${u(l)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,v=`
<script>
import LiveCodes from 'livecodes/svelte';

export default function App() {
  const options = ${u(l)};
}
</script>

<LiveCodes {...options} />

`.trimStart(),y=`
import LiveCodes from 'livecodes/solid';

export default function App() {
  const options = ${u(l)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),x=`
import LiveCodes from 'livecodes/preact';

export default function App() {
  const options = ${u(l)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),j=(e=>{let{config:t,params:r,...o}=e,n=Object.entries(o).filter(e=>{let[,t]=e;return null!=t}).map(e=>{let[t,r]=e,o=t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`);return"boolean"==typeof r?r?o:null:`${o}="${r}"`}).filter(Boolean),i=n.length>0?"\n  "+n.join("\n  "):"",s=[];t&&s.push(`playground.config = ${JSON.stringify(t,null,2).split("\n").join("\n  ")};`),r&&s.push(`playground.params = ${JSON.stringify(r,null,2).split("\n").join("\n  ")};`);let l=s.length>0?`

  const playground = document.querySelector("live-codes");
  ${s.join("\n  ")}`:"";return`
<live-codes${i}></live-codes>

<script type="module">
  import "livecodes/web-components";${l}
</script>
`.trimStart()})(l);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:s||"50vh",...e.style},appUrl:c.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,o.jsx)(f,{js:h,ts:p,react:m,vue:g,svelte:v,solid:y,preact:x,webComponents:j})]})}},58500:function(e,t,r){r.d(t,{Z:()=>c});var o=r("85893");r("67294");var n=r("6735");function i(e){let{children:t,fallback:r}=e;return(0,n.Z)()?(0,o.jsx)(o.Fragment,{children:t?.()}):r??null}var s=r("31705"),l=r("88711"),a=r("21858");function c(e){let{params:t,config:r,code:n,language:c="js",codeTitle:d="",showLineNumbers:u=!1,formatCode:h=!0,linkText:p="Run in LiveCodes",style:m={},className:g=""}=e,f=(0,l.rP)({appUrl:a.G,params:t,config:r});return(0,o.jsxs)("div",{style:{marginBottom:"30px",...m},className:g,children:[n&&(0,o.jsx)(i,{children:()=>(0,o.jsx)(s.Z,{language:c,title:d,showLineNumbers:u,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(n,c):n})}),(0,o.jsxs)("a",{href:f,target:"_blank",rel:"noreferrer",children:[p,(0,o.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,o.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},88711:function(e,t,r){r.d(t,{rP:()=>a,TH:()=>l});var o=r("17728");let n={chrome:["accelerometer","bluetooth","camera","clipboard-read","clipboard-write","display-capture","encrypted-media","geolocation","gyroscope","language-detector","language-model","local-network-access","microphone","midi","proofreader","rewriter","serial","summarizer","translator","web-share","writer","window-placement","xr-spatial-tracking"],firefox:["camera","display-capture","geolocation","microphone","web-share"],default:["accelerometer","ambient-light-sensor","camera","display-capture","encrypted-media","geolocation","gyroscope","microphone","midi","payment","serial","vr","web-share","xr-spatial-tracking"]},i=()=>{if("undefined"==typeof navigator)return"default";let e=navigator.userAgent;return/Firefox\//i.test(e)?"firefox":/Chrome\//i.test(e)?"chrome":"default"},s=()=>n[i()].filter(e=>{let t=globalThis.document?.featurePolicy?.features?.();return!t||t.includes(e)}).join("; ");async function l(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(r=e,e=null);let{config:o={},headless:n,loading:i="lazy",view:l}=r,c=n||"headless"===l,d=null,u=null,h=e=>{e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"};if("string"==typeof e)d=document.querySelector(e);else if(e instanceof HTMLElement)d=e;else if(!(c&&"object"==typeof e))throw Error("A valid container element is required.");if(!d){if(c)h(d=document.createElement("div")),document.body.appendChild(d);else throw Error(`Cannot find element: "${e}"`)}let p=new URL(a(r)),m=p.origin;p.searchParams.set("embed","true"),p.searchParams.set("loading",c?"eager":i),p.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof o&&Object.keys(o).length>0&&p.searchParams.set("config","sdk");let g=r.params;"object"==typeof g&&Object.keys(g).length>0&&JSON.stringify(g).length<1800&&Object.keys(g).forEach(e=>{p.searchParams.set(e,encodeURIComponent(String(g[e])))});let f=!1,v="Cannot call API methods after calling `destroy()`.",y=[],x=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),y.push(e)},j=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";removeEventListener(t,e);let r=y.indexOf(e);r>-1&&y.splice(r,1)},b=await new Promise(e=>{if(!d)return;let t=d.dataset.height||d.style.height;if(t&&!c){let e=isNaN(Number(t))?t:t+"px";d.style.height=e}"false"===d.dataset.defaultStyles||c||(d.style.backgroundColor||="#fff",d.style.border||="1px solid black",d.style.borderRadius||="8px",d.style.boxSizing||="border-box",d.style.padding||="0",d.style.width||="100%",d.style.height||=d.style.height||"300px",d.style.minHeight="200px",d.style.flexGrow="1",d.style.overflow||="hidden",d.style.resize||="vertical","inline"!==getComputedStyle(d).getPropertyValue("display")||(d.style.display="block"));let r="livecodes",n=d.querySelector(`iframe.${r}`),l=n||document.createElement("iframe");l.classList.add(r),l.setAttribute("allow",s()),l.setAttribute("allowtransparency","true"),l.setAttribute("allowpaymentrequest","true"),l.setAttribute("allowfullscreen","true"),l.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),l.setAttribute("loading","eager"===i?"eager":"lazy"),c?h(l):(l.style.height="100%",l.style.minHeight="200px",l.style.width="100%",l.style.margin="0",l.style.border="0",l.style.borderRadius=d.style.borderRadius),x(function e(t){t.source===l.contentWindow&&t.origin===m&&t.data?.type==="livecodes-init"&&(j(e),u=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!u||u<46)&&x(function e(t){t.source===l.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(j(e),l.contentWindow?.postMessage({type:"livecodes-config",payload:o},m))}),l.onload=()=>{e(l)},l.src=p.href,n||d.appendChild(l)}),w=new Promise(e=>{x(function t(r){r.source===b.contentWindow&&r.origin===m&&r.data?.type==="livecodes-ready"&&(j(t),e(),w.settled=!0)})}),C=()=>f?Promise.reject(v):new Promise(async e=>{w.settled&&e(),b.contentWindow?.postMessage({type:"livecodes-load"},m),await w,e()}),S=(e,t)=>new Promise(async(r,o)=>{if(f)return o(v);await C();let n=N(),i=setTimeout(()=>{j(s),o(Error(`SDK call "${e}" timed out after 60000ms.`))},6e4);function s(t){if(t.source===b.contentWindow&&t.origin===m&&t.data?.type==="livecodes-api-response"&&t.data?.id===n&&t.data.method===e){clearTimeout(i),j(s);let e=t.data.payload;e?.error?o(e.error):r(e)}}x(s),b.contentWindow?.postMessage({method:e,id:n,args:t},m)}),k={},E=["load","ready","code","console","tests","destroy"],L=(e,t)=>{if(f)throw Error(v);return E.includes(e)?(S("watch",[e]),k[e]||(k[e]=[]),k[e]?.push(t),{remove:()=>{k[e]=k[e]?.filter(e=>e!==t),k[e]?.length===0&&S("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},P=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];x(async function(e){let t=P(e.data?.type??"");if(e.source!==b.contentWindow||e.origin!==m||!t||!k[t])return;let r=e.data?.payload;k[t]?.forEach(e=>{e(r)})});let Z=()=>{b?.remove?.(),Object.values(k).forEach(e=>{e.length=0}),y.forEach(e=>removeEventListener("message",e)),y.length=0,t&&d&&t.unobserve(d),f=!0};"lazy"===i&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await C(),t.unobserve(d))})},{rootMargin:"150px"})).observe(d);let N=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>C(),run:()=>S("run"),format:e=>S("format",[e]),getShareUrl:e=>S("getShareUrl",[e]),getConfig:e=>S("getConfig",[e]),setConfig:e=>S("setConfig",[e]),getCode:()=>S("getCode"),show:(e,t)=>S("show",[e,t]),runTests:()=>S("runTests"),onChange:e=>L("code",e),watch:L,exec:function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return S("exec",[e,...r])},destroy:()=>f?Promise.reject(v):(Z(),Promise.resolve())}}function a(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:r="https://livecodes.io",params:n={},config:i={},headless:s,import:l,lite:a,view:c,...d}=t;try{e=new URL(r)}catch{throw Error(`${r} is not a valid URL.`)}let u=new URLSearchParams;Object.entries(d).forEach(t=>{let[r,o]=t;void 0!==o&&e.searchParams.set(r,String(o))});let h="headless"===t.view||s;if(a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":e.searchParams.set("lite","true")),c&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==c?i.view=c:e.searchParams.set("view",c)),"string"==typeof i)try{new URL(i),e.searchParams.set("config",encodeURIComponent(i))}catch{throw Error('"config" is not a valid URL or configuration object.')}else i&&"object"==typeof i&&Object.keys(i).length>0&&(i.title&&"Untitled Project"!==i.title&&e.searchParams.set("title",i.title),i.description&&i.description.length>0&&e.searchParams.set("description",i.description),u.set("config","code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(i))));if(n&&"object"==typeof n&&Object.keys(n).length>0)try{u.set("params",(0,o.compressToEncodedURIComponent)(JSON.stringify(n)))}catch{Object.keys(n).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(n[t])))})}return l&&e.searchParams.set("x",encodeURIComponent(l)),h&&e.searchParams.set("headless","true"),u.toString().length>0&&(e.hash=u.toString()),e.href}},50065:function(e,t,r){r.d(t,{Z:function(){return l},a:function(){return s}});var o=r(67294);let n={},i=o.createContext(n);function s(e){let t=o.useContext(i);return o.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);