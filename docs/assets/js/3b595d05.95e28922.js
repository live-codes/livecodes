"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["2255"],{37201:function(e,t,o){o.r(t),o.d(t,{mdxDemo:()=>h,pyDemo:()=>u,default:()=>g,frontMatter:()=>a,mdDemo:()=>c,metadata:()=>s,assets:()=>l,toc:()=>p,contentTitle:()=>d});var s=JSON.parse('{"id":"sdk/headless","title":"Headless Mode","description":"The LiveCodes SDK can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all SDK methods are accessible (e.g. for updating code, getting compiled code, console output, result HTML, shareable URLs, formatting code, running tests, etc).","source":"@site/docs/sdk/headless.mdx","sourceDirName":"sdk","slug":"/sdk/headless","permalink":"/livecodes/docs/sdk/headless","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/sdk/headless.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Solid","permalink":"/livecodes/docs/sdk/solid"},"next":{"title":"Advanced Topics","permalink":"/livecodes/docs/advanced/"}}'),n=o("85893"),r=o("50065"),i=o("13365");let a={},d="Headless Mode",l={},c={markup:{language:"html",content:`<textarea id="editor" style="display: none;"></textarea>
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
`}},p=[{value:"Usage",id:"usage",level:2},{value:"Examples",id:"examples",level:2},{value:"Markdown Editor",id:"markdown-editor",level:3},{value:"MDX Editor",id:"mdx-editor",level:3},{value:"Python Interpreter",id:"python-interpreter",level:3}];function m(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"headless-mode",children:"Headless Mode"})}),"\n","\n",(0,n.jsxs)(t.p,{children:["The LiveCodes ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/",children:"SDK"})," can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#sdk-methods",children:"SDK methods"})," are accessible (e.g. for ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#setconfig",children:"updating code"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:"getting compiled code"}),", console output, ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:"result HTML"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getshareurl",children:"shareable URLs"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#format",children:"formatting code"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#runtests",children:"running tests"}),", etc)."]}),"\n",(0,n.jsx)(t.p,{children:"This provides the power of leveraging the wide range of features and language support offered by LiveCodes, while retaining full control over the UI."}),"\n",(0,n.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsxs)(t.p,{children:["To create a headless playground, set the ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#embed-options",children:"embed option"})," ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#headless",children:(0,n.jsx)(t.code,{children:"headless"})})," to ",(0,n.jsx)(t.code,{children:"true"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Please note that in headless mode, the first parameter (",(0,n.jsx)(t.code,{children:"container"}),") of the function ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#createplayground",children:(0,n.jsx)(t.code,{children:"createPlayground"})})," is optional and can be omitted."]}),"\n",(0,n.jsx)("div",{style:{clear:"both"}}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { createPlayground } from 'livecodes';\n\ncreatePlayground({\n  view: 'headless',\n  config: {\n    markup: {\n      language: 'markdown',\n      content: '# Hello World!',\n    },\n  },\n}).then(async (playground) => {\n  const code = await playground.getCode();\n  console.log(code.markup.compiled); // \"<h1>Hello World!</h1>\"\n  console.log(code.result); // (result page HTML)\n});\n"})}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(t.p,{children:"The following examples show how to use the headless mode to make a Markdown editor, an MDX editor and a Python interpreter."}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsx)(t.p,{children:"You may want to view the following playgrounds in full screen (using the full screen button in the top right of each playground)."})}),"\n",(0,n.jsx)(t.h3,{id:"markdown-editor",children:"Markdown Editor"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, code changes are watched using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"code"})," and ",(0,n.jsx)(t.code,{children:"config"})," (see ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:(0,n.jsx)(t.code,{children:"getCode"})})," and ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getconfig",children:(0,n.jsx)(t.code,{children:"getConfig"})}),"). The compiled code is obtained as ",(0,n.jsx)(t.code,{children:"code.markup.compiled"}),"."]}),"\n","\n",(0,n.jsx)(i.Z,{config:c,height:"80vh"}),"\n",(0,n.jsx)(t.h3,{id:"mdx-editor",children:"MDX Editor"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, code changes are watched using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"code"})," and ",(0,n.jsx)(t.code,{children:"config"})," (see ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:(0,n.jsx)(t.code,{children:"getCode"})})," and ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getconfig",children:(0,n.jsx)(t.code,{children:"getConfig"})}),"). The result HTML is obtained as ",(0,n.jsx)(t.code,{children:"code.result"}),"."]}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsxs)(t.p,{children:["If you do not want to run the result page in the headless playground and only want to get the generated result HTML, you can set the configuration option [",(0,n.jsx)(t.code,{children:"autoupdate](../configuration/configuration-object.mdx#autoupdate) to "}),"false`."]})}),"\n","\n",(0,n.jsx)(i.Z,{config:h,height:"80vh"}),"\n",(0,n.jsx)(t.h3,{id:"python-interpreter",children:"Python Interpreter"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, console output is obtained using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"method"})," and ",(0,n.jsx)(t.code,{children:"args"})," indicating the console method and the arguments that were passed (as an array)."]}),"\n","\n",(0,n.jsx)(i.Z,{config:u,height:"80vh"})]})}function g(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},13365:function(e,t,o){o.d(t,{Z:()=>f});var s=o("85893"),n=o("79207"),r=o("67294"),i=o("38294");function a(e){let t=(0,r.useRef)(null),[o,n]=(0,r.useState)(e.className||""),[a,d]=(0,r.useState)(e.style||{}),[l,c]=(0,r.useState)(e.height),[h,u]=(0,r.useState)(),[p,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,f]=(0,r.useState)("");return(0,r.useEffect)(()=>{if(!t.current)return;let{className:o,style:s,height:r,sdkReady:a,config:l,...v}=e;if(n(o||""),d(s||{}),c(r),h&&g===JSON.stringify(v)){if(p===JSON.stringify(l))return;m(JSON.stringify(l)),"string"==typeof l?fetch(l).then(e=>e.json()).then(e=>{h?.setConfig(e)}):l&&h.setConfig(l)}else f(JSON.stringify(v)),h?.destroy(),(0,i.T)(t.current,{config:l,...v}).then(e=>{u(e),"function"==typeof a&&a(e)})},[e]),(0,r.useEffect)(()=>()=>{h?.destroy()},[]),(0,s.jsx)("div",{ref:t,className:o,style:a,"data-height":l})}var d=o("21858"),l=o("33262"),c=o("31705"),h=o("97645"),u=o("58168"),p=o("98228"),m=o("45050");function g(e){let[t,o]=(0,r.useState)(e.js),[n,i]=(0,r.useState)(e.ts),[a,d]=(0,r.useState)(e.react),[g,f]=(0,r.useState)(e.vue),[v,y]=(0,r.useState)(e.svelte),[w,x]=(0,r.useState)(e.solid),j="3.7rem",[b,k]=(0,r.useState)(!0),[S,C]=(0,r.useState)(j),E=(0,r.useRef)(null),P=()=>{setTimeout(()=>{C(`calc(${E.current.offsetHeight}px + ${j})`)},5),setTimeout(()=>{C(`calc(${E.current.offsetHeight}px + ${j})`)},255)};return(0,r.useEffect)(()=>{if(l.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};o(e(t,"js")),i(e(n,"ts")),d(e(a,"jsx")),f(e(g,"html")),y(e(v,"html")),x(e(w,"tsx"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${m.Z.details} ${p.Z.details}`,"data-collapsed":b,style:{height:b?j:S,overflow:"hidden",willChange:"height",transition:`height ${b?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{k(!b),P()},children:"show code"}),(0,s.jsx)("div",{ref:E,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:m.Z.collapsibleContent,children:(0,s.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,s.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"js",children:t})}),(0,s.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"ts",children:n})}),(0,s.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"jsx",children:a})}),(0,s.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"html",children:g})}),(0,s.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"html",children:v})}),(0,s.jsx)(h.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:P},children:(0,s.jsx)(c.Z,{language:"tsx",children:w})})]})})})]})}function f(e){let{className:t,style:o,showCode:r,height:i,...l}=e,{colorMode:c}=(0,n.I)(),h=e=>JSON.stringify(e,null,2),u=`
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

`,v=`
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

`.trimStart(),y=`
import { createPlayground, type EmbedOptions } from 'livecodes';

export default function App() {
  const options: EmbedOptions = ${h(l)};
  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options);
  };

  return <div ref={onMounted}></div>;
}

`.trimStart();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:d.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(g,{js:u,ts:p,react:m,vue:f,svelte:v,solid:y})]})}},38294:function(e,t,o){o.d(t,{T:function(){return n},r:function(){return r}});var s=o(17728);async function n(e){let t,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(o=e,e=null);let{config:s={},headless:n,loading:i="lazy",view:a}=o,d=n||"headless"===a,l=null,c=null;if("string"==typeof e)l=document.querySelector(e);else if(e instanceof HTMLElement)l=e;else if(!(d&&"object"==typeof e))throw Error("A valid container element is required.");if(!l){if(d)P(l=document.createElement("div")),document.body.appendChild(l);else throw Error(`Cannot find element: "${e}"`)}let h=new URL(r(o)),u=h.origin;h.searchParams.set("embed","true"),h.searchParams.set("loading",d?"eager":i),h.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof s&&Object.keys(s).length>0&&h.searchParams.set("config","sdk");let p=o.params;"object"==typeof p&&Object.keys(p).length>0&&JSON.stringify(p).length<1800&&Object.keys(p).forEach(e=>{h.searchParams.set(e,encodeURIComponent(String(p[e])))});let m=!1,g="Cannot call API methods after calling `destroy()`.",f=[],v=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),f.push(e)},y=await new Promise(e=>{if(!l)return;let t=l.dataset.height||l.style.height;if(t&&!d){let e=isNaN(Number(t))?t:t+"px";l.style.height=e}"false"===l.dataset.defaultStyles||d||(l.style.backgroundColor||="#fff",l.style.border||="1px solid black",l.style.borderRadius||="8px",l.style.boxSizing||="border-box",l.style.padding||="0",l.style.width||="100%",l.style.height||=l.style.height||"300px",l.style.minHeight="200px",l.style.flexGrow="1",l.style.overflow||="hidden",l.style.resize||="vertical");let o="livecodes",n=l.querySelector(`iframe.${o}`),r=n||document.createElement("iframe");r.classList.add(o),r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),r.setAttribute("loading","eager"===i?"eager":"lazy"),d?P(r):(r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=l.style.borderRadius),v(function e(t){t.source===r.contentWindow&&t.origin===u&&t.data?.type==="livecodes-init"&&(removeEventListener("message",e),c=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!c||c<46)&&v(function e(t){t.source===r.contentWindow&&t.origin===u&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:s},u))}),r.onload=()=>{e(r)},r.src=h.href,n||l.appendChild(r)}),w=new Promise(e=>{v(function t(o){o.source===y.contentWindow&&o.origin===u&&o.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),w.settled=!0)})}),x=()=>m?Promise.reject(g):new Promise(async e=>{w.settled&&e(),y.contentWindow?.postMessage({type:"livecodes-load"},u),await w,e()}),j=(e,t)=>new Promise(async(o,s)=>{if(m)return s(g);await x();let n=M();v(function t(r){if(r.source===y.contentWindow&&r.origin===u&&r.data?.type==="livecodes-api-response"&&r.data?.id===n&&r.data.method===e){removeEventListener("message",t);let e=r.data.payload;e?.error?s(e.error):o(e)}}),y.contentWindow?.postMessage({method:e,id:n,args:t},u)}),b={},k=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(m)throw Error(g);return k.includes(e)?(j("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter(e=>e!==t),b[e]?.length===0&&j("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];v(async function(e){let t=C(e.data?.type??"");if(e.source!==y.contentWindow||e.origin!==u||!t||!b[t])return;let o=e.data?.payload;b[t]?.forEach(e=>{e(o)})});let E=()=>{y?.remove?.(),Object.values(b).forEach(e=>{e.length=0}),f.forEach(e=>removeEventListener("message",e)),f.length=0,t&&l&&t.unobserve(l),m=!0};function P(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===i&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await x(),t.unobserve(l))})},{rootMargin:"150px"})).observe(l);let M=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>x(),run:()=>j("run"),format:e=>j("format",[e]),getShareUrl:e=>j("getShareUrl",[e]),getConfig:e=>j("getConfig",[e]),setConfig:e=>j("setConfig",[e]),getCode:()=>j("getCode"),show:(e,t)=>j("show",[e,t]),runTests:()=>j("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,o=Array(t>1?t-1:0),s=1;s<t;s++)o[s-1]=arguments[s];return j("exec",[e,...o])},destroy:()=>m?Promise.reject(g):(E(),Promise.resolve())}}function r(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:o="https://livecodes.io",params:n={},config:r={},headless:i,import:a,lite:d,view:l,...c}=t;try{e=new URL(o)}catch{throw Error(`${o} is not a valid URL.`)}let h=new URLSearchParams;Object.entries(c).forEach(t=>{let[o,s]=t;void 0!==s&&e.searchParams.set(o,String(s))});let u="headless"===t.view||i;if(d&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":e.searchParams.set("lite","true")),l&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==l?r.view=l:e.searchParams.set("view",l)),"string"==typeof r)try{new URL(r),e.searchParams.set("config",encodeURIComponent(r))}catch{throw Error('"config" is not a valid URL or configuration object.')}else r&&"object"==typeof r&&Object.keys(r).length>0&&(r.title&&"Untitled Project"!==r.title&&e.searchParams.set("title",r.title),r.description&&r.description.length>0&&e.searchParams.set("description",r.description),h.set("config","code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(r))));if(n&&"object"==typeof n&&Object.keys(n).length>0)try{h.set("params",(0,s.compressToEncodedURIComponent)(JSON.stringify(n)))}catch{Object.keys(n).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(n[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),u&&e.searchParams.set("headless","true"),h.toString().length>0&&(e.hash=h.toString()),e.href}},50065:function(e,t,o){o.d(t,{Z:function(){return a},a:function(){return i}});var s=o(67294);let n={},r=s.createContext(n);function i(e){let t=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);