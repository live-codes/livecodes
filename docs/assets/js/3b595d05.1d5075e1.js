"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["2255"],{7201:function(e,t,o){o.r(t),o.d(t,{mdxDemo:()=>h,pyDemo:()=>u,default:()=>g,frontMatter:()=>a,mdDemo:()=>c,metadata:()=>s,assets:()=>l,toc:()=>p,contentTitle:()=>d});var s=JSON.parse('{"id":"sdk/headless","title":"Headless Mode","description":"The LiveCodes SDK can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all SDK methods are accessible (e.g. for updating code, getting compiled code, console output, result HTML, shareable URLs, formatting code, running tests, etc).","source":"@site/docs/sdk/headless.mdx","sourceDirName":"sdk","slug":"/sdk/headless","permalink":"/livecodes/docs/sdk/headless","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/sdk/headless.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Svelte","permalink":"/livecodes/docs/sdk/svelte"},"next":{"title":"Advanced Topics","permalink":"/livecodes/docs/advanced/"}}'),n=o("5893"),r=o("65"),i=o("3365");let a={},d="Headless Mode",l={},c={markup:{language:"html",content:`<textarea id="editor" style="display: none;"></textarea>
<div id="output">Loading...</div>

<script type="module">
  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";
  import debounce from "https://jspm.dev/debounce";

  const initialCode = "# Hello, LiveCodes!\\n\\n";

  // the code editor
  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    mode: "markdown",
  });
  editor.setSize("100%", 200);
  editor.setValue(initialCode);

  // the playground
  const options = {
    view: "headless",
  };

  const livecodes = await createPlayground(options);
  await livecodes.load();

  const compile = async () => {
    await livecodes.setConfig({
      autoupdate: false,
      markup: {
        language: "markdown",
        content: editor.doc.getValue(),
      },
    });
  };

  // watch for changes
  editor.on("change", debounce(compile, 1000));
  livecodes.watch("code", ({ code, config }) => {
    createSandbox(document.querySelector("#output"), code.markup.compiled);
  });

  await compile();

  // create a sandbox for safe execution of compiled code
  function createSandbox (container, html) {
    const iframe = document.createElement("iframe");
    iframe.src = "https://livecodes-sandbox.pages.dev/v7/";
    iframe.sandbox =
      "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts";
    iframe.onload = () => {
      iframe.contentWindow.postMessage({ html }, "*");
    };
    container.innerHTML = "";
    container.appendChild(iframe);
    return iframe;
  };
</script>

<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />
<script src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js"></script>
<script src="https://unpkg.com/codemirror@5.65.15/mode/markdown/markdown.js"></script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  #output {
    flex: 1;
  }
  #output iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
`}},h={markup:{language:"html",content:`<textarea id="editor" style="display: none;"></textarea>
<div id="output">Loading...</div>

<script type="module">
  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";
  import debounce from "https://jspm.dev/debounce";

  const initialCode = \`import { useState, useEffect } from 'react';

export const Hello = ({name}) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Hello, {name}!</h1>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
};

<Hello name="LiveCodes"></Hello>

## MDX in short

- \u{2764}\u{FE0F} Powerful
- \u{1F4BB} Everything is a component
- \u{1F527} Customizable
- \u{1F4DA} Markdown-based
- \u{1F525} Blazingly blazing fast

> from [mdxjs.com](https://mdxjs.com/)
\`;

  // the code editor
  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    mode: "markdown",
  });
  editor.setSize("100%", 200);
  editor.setValue(initialCode);

  // the playground
  const options = {
    view: "headless",
    config: { autoupdate: false },
  };

  const livecodes = await createPlayground(options);
  await livecodes.load();

  const compile = async () => {
    await livecodes.setConfig({
      autoupdate: false,
      markup: {
        language: "mdx",
        content: editor.doc.getValue(),
      },
    });
  };

  // watch for changes
  editor.on("change", debounce(compile, 1000));
  livecodes.watch("code", ({ code, config }) => {
    createSandbox(document.querySelector("#output"), code.result);
  });

  await compile();

  // create a sandbox for safe execution of compiled code
  function createSandbox (container, html) {
    const iframe = document.createElement("iframe");
    iframe.src = "https://livecodes-sandbox.pages.dev/v7/";
    iframe.sandbox =
      "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts";
    iframe.onload = () => {
      iframe.contentWindow.postMessage({ html }, "*");
    };
    container.innerHTML = "";
    container.appendChild(iframe);
    return iframe;
  };
</script>

<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />
<script src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js"></script>
<script src="https://unpkg.com/codemirror@5.65.15/mode/markdown/markdown.js"></script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  #output {
    flex: 1;
  }
  #output iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
`}},u={markup:{language:"html",content:`<textarea id="editor" style="display: none"></textarea>
<div id="output">Loading...</div>

<script type="module">
  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes@0.2.0";
  import debounce from "https://jspm.dev/debounce";

  const initialCode = \`def say_hello(name):
  return f"Hello, {name}!"

print(say_hello("LiveCodes"))
\`;

  // the code editor
  const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    mode: "python",
  });
  editor.setSize("100%", 250);
  editor.setValue(initialCode);

  // the playground
  const options = {
    view: "headless",
  };

  const livecodes = await createPlayground(options);
  await livecodes.load();

  const run = async () => {
    await livecodes.setConfig({
      autoupdate: true,
      script: {
        language: "python",
        content: editor.doc.getValue(),
      },
    });
  };

  // watch for changes
  editor.on("change", debounce(run, 1000));
  livecodes.watch("console", ({ method, args }) => {
    const output = document.querySelector("#output");
    output.innerHTML = args.join("\\n");
    if (method === "error") {
      output.style.color = "red";
    } else {
      output.style.color = "unset";
    }
  });

  await run();
</script>

<link rel="stylesheet" href="https://unpkg.com/codemirror@5.65.15/lib/codemirror.css" />
<script src="https://unpkg.com/codemirror@5.65.15/lib/codemirror.js"></script>
<script src="https://unpkg.com/codemirror@5.65.15/mode/python/python.js"></script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  #output {
    flex: 1;
    margin: 1em;
    white-space: pre;
    font-family: monospace;
  }
  #output iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
`}},p=[{value:"Usage",id:"usage",level:2},{value:"Examples",id:"examples",level:2},{value:"Markdown Editor",id:"markdown-editor",level:3},{value:"MDX Editor",id:"mdx-editor",level:3},{value:"Python Interpreter",id:"python-interpreter",level:3}];function m(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"headless-mode",children:"Headless Mode"})}),"\n","\n",(0,n.jsxs)(t.p,{children:["The LiveCodes ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/",children:"SDK"})," can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#sdk-methods",children:"SDK methods"})," are accessible (e.g. for ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#setconfig",children:"updating code"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:"getting compiled code"}),", console output, ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:"result HTML"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getshareurl",children:"shareable URLs"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#format",children:"formatting code"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#runtests",children:"running tests"}),", etc)."]}),"\n",(0,n.jsx)(t.p,{children:"This provides the power of leveraging the wide range of features and language support offered by LiveCodes, while retaining full control over the UI."}),"\n",(0,n.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsxs)(t.p,{children:["To create a headless playground, set the ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#embed-options",children:"embed option"})," ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#headless",children:(0,n.jsx)(t.code,{children:"headless"})})," to ",(0,n.jsx)(t.code,{children:"true"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Please note that in headless mode, the first parameter (",(0,n.jsx)(t.code,{children:"container"}),") of the function ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#createplayground",children:(0,n.jsx)(t.code,{children:"createPlayground"})})," is optional and can be omitted."]}),"\n",(0,n.jsx)("div",{style:{clear:"both"}}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { createPlayground } from 'livecodes';\r\n\r\ncreatePlayground({\r\n  view: 'headless',\r\n  config: {\r\n    markup: {\r\n      language: 'markdown',\r\n      content: '# Hello World!',\r\n    },\r\n  },\r\n}).then(async (playground) => {\r\n  const code = await playground.getCode();\r\n  console.log(code.markup.compiled); // \"<h1>Hello World!</h1>\"\r\n  console.log(code.result); // (result page HTML)\r\n});\n"})}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(t.p,{children:"The following examples show how to use the headless mode to make a Markdown editor, an MDX editor and a Python interpreter."}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsx)(t.p,{children:"You may want to view the following playgrounds in full screen (using the full screen button in the top right of each playground)."})}),"\n",(0,n.jsx)(t.h3,{id:"markdown-editor",children:"Markdown Editor"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, code changes are watched using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"code"})," and ",(0,n.jsx)(t.code,{children:"config"})," (see ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:(0,n.jsx)(t.code,{children:"getCode"})})," and ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getconfig",children:(0,n.jsx)(t.code,{children:"getConfig"})}),"). The compiled code is obtained as ",(0,n.jsx)(t.code,{children:"code.markup.compiled"}),"."]}),"\n","\n",(0,n.jsx)(i.Z,{config:c,height:"80vh"}),"\n",(0,n.jsx)(t.h3,{id:"mdx-editor",children:"MDX Editor"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, code changes are watched using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"code"})," and ",(0,n.jsx)(t.code,{children:"config"})," (see ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:(0,n.jsx)(t.code,{children:"getCode"})})," and ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getconfig",children:(0,n.jsx)(t.code,{children:"getConfig"})}),"). The result HTML is obtained as ",(0,n.jsx)(t.code,{children:"code.result"}),"."]}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsxs)(t.p,{children:["If you do not want to run the result page in the headless playground and only want to get the generated result HTML, you can set the configuration option [",(0,n.jsx)(t.code,{children:"autoupdate](../configuration/configuration-object.mdx#autoupdate) to "}),"false`."]})}),"\n","\n",(0,n.jsx)(i.Z,{config:h,height:"80vh"}),"\n",(0,n.jsx)(t.h3,{id:"python-interpreter",children:"Python Interpreter"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, console output is obtained using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"method"})," and ",(0,n.jsx)(t.code,{children:"args"})," indicating the console method and the arguments that were passed (as an array)."]}),"\n","\n",(0,n.jsx)(i.Z,{config:u,height:"80vh"})]})}function g(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},3365:function(e,t,o){o.d(t,{Z:()=>f});var s=o("5893"),n=o("4200"),r=o("7294"),i=o("8294");function a(e){let t=(0,r.useRef)(null),[o,n]=(0,r.useState)(e.className||""),[a,d]=(0,r.useState)(e.style||{}),[l,c]=(0,r.useState)(e.height),[h,u]=(0,r.useState)(),[p,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,f]=(0,r.useState)("");return(0,r.useEffect)(()=>{if(!t.current)return;let{className:o,style:s,height:r,sdkReady:a,config:l,...y}=e;if(n(o||""),d(s||{}),c(r),h&&g===JSON.stringify(y)){if(p===JSON.stringify(l))return;m(JSON.stringify(l)),"string"==typeof l?fetch(l).then(e=>e.json()).then(e=>{h?.setConfig(e)}):l&&h.setConfig(l)}else f(JSON.stringify(y)),h?.destroy(),(0,i.T)(t.current,{config:l,...y}).then(e=>{u(e),"function"==typeof a&&a(e)})},[e]),(0,r.useEffect)(()=>()=>{h?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:o,style:a,"data-height":l})}var d=o("1858"),l=o("3262"),c=o("1705"),h=o("8168"),u=o("7645"),p=o("5050"),m=o("8228");function g(e){let[t,o]=(0,r.useState)(e.js),[n,i]=(0,r.useState)(e.ts),[a,d]=(0,r.useState)(e.react),[g,f]=(0,r.useState)(e.vue),[y,v]=(0,r.useState)(e.svelte),w="3.7rem",[x,j]=(0,r.useState)(!0),[b,k]=(0,r.useState)(w),S=(0,r.useRef)(null),C=()=>{setTimeout(()=>{k(`calc(${S.current.offsetHeight}px + ${w})`)},5),setTimeout(()=>{k(`calc(${S.current.offsetHeight}px + ${w})`)},255)};return(0,r.useEffect)(()=>{if(l.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};o(e(t,"js")),i(e(n,"ts")),d(e(a,"jsx")),f(e(g,"html")),v(e(y,"html"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":x,style:{height:x?w:b,overflow:"hidden",willChange:"height",transition:`height ${x?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{j(!x),C()},children:"show code"}),(0,s.jsx)("div",{ref:S,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:p.Z.collapsibleContent,children:(0,s.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,s.jsx)(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"js",children:t})}),(0,s.jsx)(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"ts",children:n})}),(0,s.jsx)(u.Z,{value:"react",label:"React",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"jsx",children:a})}),(0,s.jsx)(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"html",children:g})}),(0,s.jsx)(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:C},children:(0,s.jsx)(c.Z,{language:"html",children:y})})]})})})]})}function f(e){let{className:t,style:o,showCode:r,height:i,...l}=e,{colorMode:c}=(0,n.I)(),h=e=>JSON.stringify(e,null,2),u=`
import { createPlayground } from 'livecodes';

const options = ${h(l)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(l)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${h(l)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${h(l)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,y=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${h(l)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:d.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(g,{js:u,ts:p,react:m,vue:f,svelte:y})]})}},8294:function(e,t,o){o.d(t,{T:function(){return n},r:function(){return r}});var s=o(7728);async function n(e){let t,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(o=e,e=null);let{appUrl:n="https://livecodes.io/",params:r={},config:i={},import:a,headless:d,lite:l,loading:c="lazy",template:h,view:u}=o,p=d||"headless"===u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!(p&&"object"==typeof e))throw Error("A valid container element is required.");if(!m){if(p)M(m=document.createElement("div")),document.body.appendChild(m);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(n)}catch{throw Error(`"${n}" is not a valid URL.`)}let g=t.origin;if(r&&"object"==typeof r)try{t.searchParams.set("params",(0,s.compressToEncodedURIComponent)(JSON.stringify(r)))}catch{Object.keys(r).forEach(e=>{t.searchParams.set(e,encodeURIComponent(String(r[e])))})}if(h&&t.searchParams.set("template",h),a&&t.searchParams.set("x",encodeURIComponent(a)),p&&t.searchParams.set("headless","true"),l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":t.searchParams.set("lite","true")),u&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==u?i.view=u:t.searchParams.set("view",u)),"string"==typeof i)try{new URL(i),t.searchParams.set("config",encodeURIComponent(i))}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof i)Object.keys(i).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",p?"eager":c);let f=!1,y="Cannot call API methods after calling `destroy()`.",v=await new Promise(e=>{if(!m)return;let o=m.dataset.height||m.style.height;if(o&&!p){let e=isNaN(Number(o))?o:o+"px";m.style.height=e}"false"===m.dataset.defaultStyles||p||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");let s="livecodes",n=m.querySelector(`iframe.${s}`),r=n||document.createElement("iframe");r.classList.add(s),r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),r.setAttribute("loading","eager"===c?"eager":"lazy"),p?M(r):(r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=m.style.borderRadius),addEventListener("message",function e(t){t.source===r.contentWindow&&t.origin===g&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:i},g))}),r.onload=()=>{e(r)},r.src=t.href,n||m.appendChild(r)}),w=new Promise(e=>{addEventListener("message",function t(o){o.source===v.contentWindow&&o.origin===g&&o.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),w.settled=!0)})}),x=()=>f?Promise.reject(y):new Promise(async e=>{w.settled&&e(),v.contentWindow?.postMessage({type:"livecodes-load"},g),await w,e()}),j=(e,t)=>new Promise(async(o,s)=>{if(f)return s(y);await x();let n=L();addEventListener("message",function t(r){if(r.source===v.contentWindow&&r.origin===g&&r.data?.type==="livecodes-api-response"&&r.data?.id===n&&r.data.method===e){removeEventListener("message",t);let e=r.data.payload;e?.error?s(e.error):o(e)}}),v.contentWindow?.postMessage({method:e,id:n,args:t},g)}),b={},k=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(f)throw Error(y);return k.includes(e)?(j("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter(e=>e!==t),b[e]?.length===0&&j("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=C(e.data?.type??"");if(e.source!==v.contentWindow||e.origin!==g||!t||!b[t])return;let o=e.data?.payload;b[t]?.forEach(e=>{e(o)})});let E=()=>{Object.values(b).forEach(e=>{e.length=0}),v?.remove?.(),f=!0};function M(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===c&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await x(),t.unobserve(m))})},{rootMargin:"150px"}).observe(m);let L=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>x(),run:()=>j("run"),format:e=>j("format",[e]),getShareUrl:e=>j("getShareUrl",[e]),getConfig:e=>j("getConfig",[e]),setConfig:e=>j("setConfig",[e]),getCode:()=>j("getCode"),show:(e,t)=>j("show",[e,t]),runTests:()=>j("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,o=Array(t>1?t-1:0),s=1;s<t;s++)o[s-1]=arguments[s];return j("exec",[e,...o])},destroy:()=>w.settled?j("destroy").then(E):f?Promise.reject(y):(E(),Promise.resolve())}}function r(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:o,params:n,config:r,import:i,...a}=t,d="string"==typeof r?{config:r}:r&&"object"==typeof r&&Object.keys(r).length?{x:"code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(r))}:{};if(n&&"object"==typeof n)try{e=(0,s.compressToEncodedURIComponent)(JSON.stringify(n))}catch{Object.keys(n).forEach(e=>{n[e]=encodeURIComponent(String(n[e]))})}let l=new URLSearchParams(JSON.parse(JSON.stringify({...a,...e?{params:e}:n,x:i,...d}))).toString();return(o||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,o;let s=e.dataset.options;if(s)try{t=JSON.parse(s)}catch{}let r=e.dataset.config||e.dataset.prefill;if(r)try{o=JSON.parse(r)}catch{}let i=encodeURIComponent(e.outerHTML);e.innerHTML="",n(e,{import:"dom/"+i,...t,...o?{config:o}:{}})})})},65:function(e,t,o){o.d(t,{Z:function(){return a},a:function(){return i}});var s=o(7294);let n={},r=s.createContext(n);function i(e){let t=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);