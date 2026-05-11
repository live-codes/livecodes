"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["2255"],{37201:function(e,t,o){o.r(t),o.d(t,{mdxDemo:()=>u,pyDemo:()=>h,default:()=>g,frontMatter:()=>a,mdDemo:()=>c,metadata:()=>s,assets:()=>d,toc:()=>p,contentTitle:()=>l});var s=JSON.parse('{"id":"sdk/headless","title":"Headless Mode","description":"The LiveCodes SDK can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all SDK methods are accessible (e.g. for updating code, getting compiled code, console output, result HTML, shareable URLs, formatting code, running tests, etc).","source":"@site/docs/sdk/headless.mdx","sourceDirName":"sdk","slug":"/sdk/headless","permalink":"/livecodes/docs/sdk/headless","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/sdk/headless.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Web Components SDK","permalink":"/livecodes/docs/sdk/web-components"},"next":{"title":"Advanced Topics","permalink":"/livecodes/docs/advanced/"}}'),n=o("85893"),r=o("50065"),i=o("65899");let a={},l="Headless Mode",d={},c={markup:{language:"html",content:`<textarea id="editor" style="display: none;"></textarea>
<div id="output">Loading...</div>

<script type="module">
  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes";
  import debounce from "https://esm.sh/debounce";

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
    headless: true,
  };

  const livecodes = await createPlayground(options);

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
    iframe.src = "https://livecodes-sandbox.pages.dev/v9/";
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
`}},u={markup:{language:"html",content:`<textarea id="editor" style="display: none;"></textarea>
<div id="output">Loading...</div>

<script type="module">
  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes";
  import debounce from "https://esm.sh/debounce";

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
    headless: true,
    config: { autoupdate: false },
  };

  const livecodes = await createPlayground(options);

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
`}},h={markup:{language:"html",content:`<textarea id="editor" style="display: none"></textarea>
<div id="output">Loading...</div>

<script type="module">
  import { createPlayground } from "https://cdn.jsdelivr.net/npm/livecodes";
  import debounce from "https://esm.sh/debounce";

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
    headless: true,
  };

  const livecodes = await createPlayground(options);

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
`}},p=[{value:"Usage",id:"usage",level:2},{value:"Examples",id:"examples",level:2},{value:"Markdown Editor",id:"markdown-editor",level:3},{value:"MDX Editor",id:"mdx-editor",level:3},{value:"Python Interpreter",id:"python-interpreter",level:3}];function m(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"headless-mode",children:"Headless Mode"})}),"\n","\n",(0,n.jsxs)(t.p,{children:["The LiveCodes ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/",children:"SDK"})," can be used to create playgrounds in headless mode. In this mode, no visible output is displayed in the embedding web page. However, all ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#sdk-methods",children:"SDK methods"})," are accessible (e.g. for ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#setconfig",children:"updating code"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:"getting compiled code"}),", console output, ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:"result HTML"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getshareurl",children:"shareable URLs"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#format",children:"formatting code"}),", ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#runtests",children:"running tests"}),", etc)."]}),"\n",(0,n.jsx)(t.p,{children:"This provides the power of leveraging the wide range of features and language support offered by LiveCodes, while retaining full control over the UI."}),"\n",(0,n.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsxs)(t.p,{children:["To create a headless playground, set the ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#embed-options",children:"embed option"})," ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#headless",children:(0,n.jsx)(t.code,{children:"headless"})})," to ",(0,n.jsx)(t.code,{children:"true"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Please note that in headless mode, the first parameter (",(0,n.jsx)(t.code,{children:"container"}),") of the function ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#createplayground",children:(0,n.jsx)(t.code,{children:"createPlayground"})})," is optional and can be omitted."]}),"\n",(0,n.jsx)("div",{style:{clear:"both"}}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:"{4}",children:"import { createPlayground } from 'livecodes';\n\ncreatePlayground({\n  headless: true,\n  config: {\n    markup: {\n      language: 'markdown',\n      content: '# Hello World!',\n    },\n  },\n}).then(async (playground) => {\n  const code = await playground.getCode();\n  console.log(code.markup.compiled); // \"<h1>Hello World!</h1>\"\n  console.log(code.result); // (result page HTML)\n});\n"})}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(t.p,{children:"The following examples show how to use the headless mode to make a Markdown editor, an MDX editor and a Python interpreter."}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsx)(t.p,{children:"You may want to view the following playgrounds in full screen (using the full screen button in the top right of each playground)."})}),"\n",(0,n.jsx)(t.h3,{id:"markdown-editor",children:"Markdown Editor"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, code changes are watched using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"code"})," and ",(0,n.jsx)(t.code,{children:"config"})," (see ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:(0,n.jsx)(t.code,{children:"getCode"})})," and ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getconfig",children:(0,n.jsx)(t.code,{children:"getConfig"})}),"). The compiled code is obtained as ",(0,n.jsx)(t.code,{children:"code.markup.compiled"}),"."]}),"\n","\n",(0,n.jsx)(i.Z,{config:c,height:"80vh"}),"\n",(0,n.jsx)(t.h3,{id:"mdx-editor",children:"MDX Editor"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, code changes are watched using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"code"})," and ",(0,n.jsx)(t.code,{children:"config"})," (see ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getcode",children:(0,n.jsx)(t.code,{children:"getCode"})})," and ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#getconfig",children:(0,n.jsx)(t.code,{children:"getConfig"})}),"). The result HTML is obtained as ",(0,n.jsx)(t.code,{children:"code.result"}),"."]}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsxs)(t.p,{children:["If you do not want to run the result page in the headless playground and only want to get the generated result HTML, you can set the configuration option [",(0,n.jsx)(t.code,{children:"autoupdate](../configuration/configuration-object.mdx#autoupdate) to "}),"false`."]})}),"\n","\n",(0,n.jsx)(i.Z,{config:u,height:"80vh"}),"\n",(0,n.jsx)(t.h3,{id:"python-interpreter",children:"Python Interpreter"}),"\n",(0,n.jsxs)(t.p,{children:["In this demo, console output is obtained using the SDK method ",(0,n.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts#watch",children:(0,n.jsx)(t.code,{children:"watch('code', callback)"})}),". The callback function accepts an argument which is an object with the properties ",(0,n.jsx)(t.code,{children:"method"})," and ",(0,n.jsx)(t.code,{children:"args"})," indicating the console method and the arguments that were passed (as an array)."]}),"\n","\n",(0,n.jsx)(i.Z,{config:h,height:"80vh"})]})}function g(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},65899:function(e,t,o){o.d(t,{Z:()=>y});var s=o("85893"),n=o("79207"),r=o("67294"),i=o("88711");let a=function(e){let{useEffect:t,useRef:o}=e;return function(e){let s=o(null),n=o(void 0),r=o(""),a=o(""),l=o(0),d=o(!1),c=e.className||"",u=e.style||{},h=e.height&&Number(e.height)?`${e.height}px`:e.height;return t(()=>{if(!s.current)return;let{className:t,style:o,height:c,sdkReady:u,config:h,...p}=e,m=++l.current,g=()=>l.current!==m||d.current,f=JSON.stringify(p);if(n.current&&a.current===f){let e=JSON.stringify(h);if(r.current===e)return;r.current=e,h&&n.current.setConfig(h)}else a.current=f,r.current=JSON.stringify(h),n.current?.destroy(),n.current=void 0,(0,i.TH)(s.current,{config:h,...p}).then(e=>{if(g()){e.destroy();return}n.current=e,"function"==typeof u&&u(e)})},[e]),t(()=>()=>{d.current=!0,n.current?.destroy(),n.current=void 0},[]),{containerRef:s,className:c,style:u,height:h}}}({useEffect:r.useEffect,useRef:r.useRef});function l(e){let{containerRef:t,className:o,style:n,height:r}=a(e);return(0,s.jsx)("div",{ref:t,className:o,style:{...n,...r?{height:r}:{}},"data-height":r})}var d=o("21858"),c=o("33262"),u=o("31705"),h=o("97645"),p=o("58168"),m=o("98228"),g=o("45050");function f(e){let[t,o]=(0,r.useState)(e.js),[n,i]=(0,r.useState)(e.ts),[a,l]=(0,r.useState)(e.react),[d,f]=(0,r.useState)(e.vue),[y,v]=(0,r.useState)(e.svelte),[w,x]=(0,r.useState)(e.solid),[b,j]=(0,r.useState)(e.preact),[k,C]=(0,r.useState)(e.webComponents),S="3.7rem",[P,E]=(0,r.useState)(!0),[M,L]=(0,r.useState)(S),T=(0,r.useRef)(null),D=()=>{setTimeout(()=>{L(`calc(${T.current.offsetHeight}px + ${S})`)},5),setTimeout(()=>{L(`calc(${T.current.offsetHeight}px + ${S})`)},255)};return(0,r.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};o(e(t,"js")),i(e(n,"ts")),l(e(a,"jsx")),f(e(d,"html")),v(e(y,"html")),x(e(w,"tsx")),j(e(b,"jsx")),C(e(k,"html"))}},[]),(0,s.jsxs)("details",{className:`alert alert--info ${g.Z.details} ${m.Z.details}`,"data-collapsed":P,style:{height:P?S:M,overflow:"hidden",willChange:"height",transition:`height ${P?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,s.jsx)("summary",{onClick:()=>{E(!P),D()},children:"show code"}),(0,s.jsx)("div",{ref:T,style:{display:"block",overflow:"hidden"},children:(0,s.jsx)("div",{className:g.Z.collapsibleContent,children:(0,s.jsxs)(p.Z,{groupId:"sdk-code",children:[(0,s.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:D},children:(0,s.jsx)(u.Z,{language:"js",children:t})}),(0,s.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:D},children:(0,s.jsx)(u.Z,{language:"ts",children:n})}),(0,s.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:D},children:(0,s.jsx)(u.Z,{language:"jsx",children:a})}),(0,s.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:D},children:(0,s.jsx)(u.Z,{language:"html",children:d})}),(0,s.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:D},children:(0,s.jsx)(u.Z,{language:"html",children:y})}),(0,s.jsx)(h.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:D},children:(0,s.jsx)(u.Z,{language:"tsx",children:w})}),(0,s.jsx)(h.Z,{value:"preact",label:"Preact",attributes:{onMouseDown:D},children:(0,s.jsx)(u.Z,{language:"jsx",children:b})}),(0,s.jsx)(h.Z,{value:"web-components",label:"Web Components",attributes:{onMouseDown:D},children:(0,s.jsx)(u.Z,{language:"html",children:k})})]})})})]})}function y(e){let{className:t,style:o,showCode:r,height:i,...a}=e,{colorMode:c}=(0,n.I)(),u=e=>JSON.stringify(e,null,2),h=`
import { createPlayground } from 'livecodes';

const options = ${u(a)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(a)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${u(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),g=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${u(a)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,y=`
<script>
import LiveCodes from 'livecodes/svelte';

const options = ${u(a)};
</script>

<LiveCodes {...options} />

`.trimStart(),v=`
import LiveCodes from 'livecodes/solid';

export default function App() {
  const options = ${u(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),w=`
import LiveCodes from 'livecodes/preact';

export default function App() {
  const options = ${u(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),x=(e=>{let{config:t,params:o,...s}=e,n=Object.entries(s).filter(e=>{let[,t]=e;return null!=t}).map(e=>{let[t,o]=e,s=t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`);return"boolean"==typeof o?o?s:null:`${s}="${o}"`}).filter(Boolean),r=n.length>0?"\n  "+n.join("\n  "):"",i=[];t&&i.push(`playground.config = ${JSON.stringify(t,null,2).split("\n").join("\n  ")};`),o&&i.push(`playground.params = ${JSON.stringify(o,null,2).split("\n").join("\n  ")};`);let a=i.length>0?`

  const playground = document.querySelector("live-codes");
  ${i.join("\n  ")}`:"";return`
<live-codes${r}></live-codes>

<script type="module">
  import "livecodes/web-components";${a}
</script>
`.trimStart()})(a);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:d.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,s.jsx)(f,{js:h,ts:p,react:m,vue:g,svelte:y,solid:v,preact:w,webComponents:x})]})}},88711:function(e,t,o){o.d(t,{rP:()=>l,TH:()=>a});var s=o("17728");let n={chrome:["accelerometer","bluetooth","camera","clipboard-read","clipboard-write","display-capture","encrypted-media","geolocation","gyroscope","language-detector","language-model","local-network-access","microphone","midi","proofreader","rewriter","serial","summarizer","translator","web-share","writer","window-placement","xr-spatial-tracking"],firefox:["camera","display-capture","geolocation","microphone","web-share"],default:["accelerometer","ambient-light-sensor","camera","display-capture","encrypted-media","geolocation","gyroscope","microphone","midi","payment","serial","vr","web-share","xr-spatial-tracking"]},r=()=>{if("undefined"==typeof navigator)return"default";let e=navigator.userAgent;return/Firefox\//i.test(e)?"firefox":/Chrome\//i.test(e)?"chrome":"default"},i=()=>n[r()].filter(e=>{let t=globalThis.document?.featurePolicy?.features?.();return!t||t.includes(e)}).join("; ");async function a(e){let t,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(o=e,e=null);let{config:s={},headless:n,loading:r="lazy",view:a}=o,d=n||"headless"===a,c=null,u=null,h=e=>{e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"};if("string"==typeof e)c=document.querySelector(e);else if(e instanceof HTMLElement)c=e;else if(!(d&&"object"==typeof e))throw Error("A valid container element is required.");if(!c){if(d)h(c=document.createElement("div")),document.body.appendChild(c);else throw Error(`Cannot find element: "${e}"`)}let p=new URL(l(o)),m=p.origin;p.searchParams.set("embed","true"),p.searchParams.set("loading",d?"eager":r),p.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof s&&Object.keys(s).length>0&&p.searchParams.set("config","sdk");let g=o.params;"object"==typeof g&&Object.keys(g).length>0&&JSON.stringify(g).length<1800&&Object.keys(g).forEach(e=>{p.searchParams.set(e,encodeURIComponent(String(g[e])))});let f=!1,y="Cannot call API methods after calling `destroy()`.",v=[],w=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),v.push(e)},x=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";removeEventListener(t,e);let o=v.indexOf(e);o>-1&&v.splice(o,1)},b=await new Promise(e=>{if(!c)return;let t=c.dataset.height||c.style.height;if(t&&!d){let e=isNaN(Number(t))?t:t+"px";c.style.height=e}"false"===c.dataset.defaultStyles||d||(c.style.backgroundColor||="#fff",c.style.border||="1px solid black",c.style.borderRadius||="8px",c.style.boxSizing||="border-box",c.style.padding||="0",c.style.width||="100%",c.style.height||=c.style.height||"300px",c.style.minHeight="200px",c.style.flexGrow="1",c.style.overflow||="hidden",c.style.resize||="vertical","inline"!==getComputedStyle(c).getPropertyValue("display")||(c.style.display="block"));let o="livecodes",n=c.querySelector(`iframe.${o}`),a=n||document.createElement("iframe");a.classList.add(o),a.setAttribute("allow",i()),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),a.setAttribute("loading","eager"===r?"eager":"lazy"),d?h(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=c.style.borderRadius),w(function e(t){t.source===a.contentWindow&&t.origin===m&&t.data?.type==="livecodes-init"&&(x(e),u=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!u||u<46)&&w(function e(t){t.source===a.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(x(e),a.contentWindow?.postMessage({type:"livecodes-config",payload:s},m))}),a.onload=()=>{e(a)},a.src=p.href,n||c.appendChild(a)}),j=new Promise(e=>{w(function t(o){o.source===b.contentWindow&&o.origin===m&&o.data?.type==="livecodes-ready"&&(x(t),e(),j.settled=!0)})}),k=()=>f?Promise.reject(y):new Promise(async e=>{j.settled&&e(),b.contentWindow?.postMessage({type:"livecodes-load"},m),await j,e()}),C=(e,t)=>new Promise(async(o,s)=>{if(f)return s(y);await k();let n=T(),r=setTimeout(()=>{x(i),s(Error(`SDK call "${e}" timed out after 60000ms.`))},6e4);function i(t){if(t.source===b.contentWindow&&t.origin===m&&t.data?.type==="livecodes-api-response"&&t.data?.id===n&&t.data.method===e){clearTimeout(r),x(i);let e=t.data.payload;e?.error?s(e.error):o(e)}}w(i),b.contentWindow?.postMessage({method:e,id:n,args:t},m)}),S={},P=["load","ready","code","console","tests","destroy"],E=(e,t)=>{if(f)throw Error(y);return P.includes(e)?(C("watch",[e]),S[e]||(S[e]=[]),S[e]?.push(t),{remove:()=>{S[e]=S[e]?.filter(e=>e!==t),S[e]?.length===0&&C("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},M=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];w(async function(e){let t=M(e.data?.type??"");if(e.source!==b.contentWindow||e.origin!==m||!t||!S[t])return;let o=e.data?.payload;S[t]?.forEach(e=>{e(o)})});let L=()=>{b?.remove?.(),Object.values(S).forEach(e=>{e.length=0}),v.forEach(e=>removeEventListener("message",e)),v.length=0,t&&c&&t.unobserve(c),f=!0};"lazy"===r&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await k(),t.unobserve(c))})},{rootMargin:"150px"})).observe(c);let T=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>C("run"),format:e=>C("format",[e]),getShareUrl:e=>C("getShareUrl",[e]),getConfig:e=>C("getConfig",[e]),setConfig:e=>C("setConfig",[e]),getCode:()=>C("getCode"),show:(e,t)=>C("show",[e,t]),runTests:()=>C("runTests"),onChange:e=>E("code",e),watch:E,exec:function(e){for(var t=arguments.length,o=Array(t>1?t-1:0),s=1;s<t;s++)o[s-1]=arguments[s];return C("exec",[e,...o])},destroy:()=>f?Promise.reject(y):(L(),Promise.resolve())}}function l(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:o="https://livecodes.io",params:n={},config:r={},headless:i,import:a,lite:l,view:d,...c}=t;try{e=new URL(o)}catch{throw Error(`${o} is not a valid URL.`)}let u=new URLSearchParams;Object.entries(c).forEach(t=>{let[o,s]=t;void 0!==s&&e.searchParams.set(o,String(s))});let h="headless"===t.view||i;if(l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":e.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==d?r.view=d:e.searchParams.set("view",d)),"string"==typeof r)try{new URL(r),e.searchParams.set("config",encodeURIComponent(r))}catch{throw Error('"config" is not a valid URL or configuration object.')}else r&&"object"==typeof r&&Object.keys(r).length>0&&(r.title&&"Untitled Project"!==r.title&&e.searchParams.set("title",r.title),r.description&&r.description.length>0&&e.searchParams.set("description",r.description),u.set("config","code/"+(0,s.compressToEncodedURIComponent)(JSON.stringify(r))));if(n&&"object"==typeof n&&Object.keys(n).length>0)try{u.set("params",(0,s.compressToEncodedURIComponent)(JSON.stringify(n)))}catch{Object.keys(n).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(n[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),h&&e.searchParams.set("headless","true"),u.toString().length>0&&(e.hash=u.toString()),e.href}},50065:function(e,t,o){o.d(t,{Z:function(){return a},a:function(){return i}});var s=o(67294);let n={},r=s.createContext(n);function i(e){let t=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);