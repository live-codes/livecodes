"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["318"],{73994:function(e,t,n){n.r(t),n.d(t,{clickToLoadParams:()=>g,lazyLoadParams:()=>p,embedDemoParams:()=>h,default:()=>v,frontMatter:()=>d,fullHtmlExample:()=>m,metadata:()=>o,assets:()=>u,toc:()=>y,contentTitle:()=>c});var o=JSON.parse('{"id":"tutorials/embedding-playgrounds","title":"Embedding Playgrounds","description":"const config = {","source":"@site/docs/tutorials/embedding-playgrounds.mdx","sourceDirName":"tutorials","slug":"/tutorials/embedding-playgrounds","permalink":"/livecodes/docs/tutorials/embedding-playgrounds","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/tutorials/embedding-playgrounds.mdx","tags":[],"version":"current","frontMatter":{"title":"Embedding Playgrounds"},"sidebar":"docsSidebar","previous":{"title":"Building Your First App","permalink":"/livecodes/docs/tutorials/building-your-first-app"},"next":{"title":"Creating Shareable URLs","permalink":"/livecodes/docs/tutorials/creating-shareable-urls"}}'),r=n("85893"),i=n("50065"),l=n("31705"),a=n("65899"),s=n("58500");let d={title:"Embedding Playgrounds"},c="Embedding a Code Playground",u={},h={html:`<div id="page">
  <header>
    <h1>My Code Playground</h1>
    <p>Edit the code below and see the result instantly!</p>
  </header>
  <div id="playground"></div>
</div>
`,css:`body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  background: #f5f5f5;
}
#page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
header {
  text-align: center;
  margin-bottom: 20px;
}
h1 {
  margin: 0 0 8px;
  color: #1a1a1a;
}
p {
  margin: 0;
  color: #666;
}
#playground {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  height: 500px;
}
`,js:`import { createPlayground } from 'livecodes';

const config = {
  markup: {
    language: 'html',
    content: \`<div class="card">
  <h2>Hello LiveCodes!</h2>
  <p>Edit this code and see changes live.</p>
  <button id="actionBtn">Click me</button>
</div>\`,
  },
  style: {
    language: 'css',
    content: \`body {
  font-family: system-ui;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f0f0f0;
}
.card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
}
h2 {
  margin: 0 0 12px;
  color: #333;
}
button {
  padding: 10px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background: #0056b3;
}\`,
  },
  script: {
    language: 'javascript',
    content: \`const btn = document.getElementById("actionBtn");
btn.addEventListener("click", () => {
  btn.textContent = "Clicked!";
  setTimeout(() => {
    btn.textContent = "Click me";
  }, 1000);
});\`,
  },
};

await createPlayground('#playground', {
  config,
  loading: 'eager',
});
`},p={html:`<div id="page">
  <h1>Lazy Loaded Playground</h1>
  <p>Scroll down to see the playground load automatically.</p>
  <div class="spacer"></div>
  <div id="playground"></div>
</div>
`,css:`body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 20px;
}
.spacer {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}
#playground {
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
`,js:`import { createPlayground } from 'livecodes';

const config = {
  markup: {
    language: 'html',
    content: '<h2>I loaded lazily!</h2><p>This playground only loads when it enters the viewport.</p>',
  },
};

createPlayground('#playground', {
  config,
  loading: 'lazy',
});
`},g={html:`<div id="page">
  <h1>Click-to-Load Playground</h1>
  <p>The playground below won't load until you click it.</p>
  <div id="playground"></div>
</div>
`,css:`body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 20px;
}
#playground {
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
`,js:`import { createPlayground } from 'livecodes';

const config = {
  markup: {
    language: 'html',
    content: '<h2>You clicked to load me!</h2>',
  },
};

createPlayground('#playground', {
  config,
  loading: 'click',
});
`},m=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Embedded LiveCodes Playground</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      background: #f5f5f5;
    }
    #page {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0 0 8px;
      color: #1a1a1a;
    }
    p {
      margin: 0;
      color: #666;
    }
    #playground {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      height: 500px;
    }
  </style>
</head>
<body>
  <div id="page">
    <header>
      <h1>My Code Playground</h1>
      <p>Edit the code below and see the result instantly!</p>
    </header>
    <div id="playground"></div>
  </div>

  <script type="module">
    import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes';

    const config = {
      markup: {
        language: 'html',
        content: '<div class="card">
  <h2>Hello LiveCodes!</h2>
  <p>Edit this code and see changes live.</p>
  <button id="actionBtn">Click me</button>
</div>',
      },
      style: {
        language: 'css',
        content: 'body {
  font-family: system-ui;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f0f0f0;
}
.card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
}
h2 {
  margin: 0 0 12px;
  color: #333;
}
button {
  padding: 10px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background: #0056b3;
}',
      },
      script: {
        language: 'javascript',
        content: 'const btn = document.getElementById("actionBtn");
btn.addEventListener("click", () => {
  btn.textContent = "Clicked!";
  setTimeout(() => {
    btn.textContent = "Click me";
  }, 1000);
});',
      },
    };

    await createPlayground('#playground', {
      config,
      loading: 'eager',
    });
  </script>
</body>
</html>`,y=[{value:"What We&#39;ll Build",id:"what-well-build",level:2},{value:"Basic Embedding",id:"basic-embedding",level:2},{value:"Loading Modes",id:"loading-modes",level:2},{value:"Eager Loading (Default)",id:"eager-loading-default",level:3},{value:"Lazy Loading",id:"lazy-loading",level:3},{value:"Click-to-Load",id:"click-to-load",level:3},{value:"Full Example",id:"full-example",level:2},{value:"How It Works",id:"how-it-works",level:2},{value:"Container Setup",id:"container-setup",level:3},{value:"Configuration",id:"configuration",level:3},{value:"CDN Import",id:"cdn-import",level:3},{value:"Testing Your App",id:"testing-your-app",level:2},{value:"Challenge: Enhance Your Playground",id:"challenge-enhance-your-playground",level:2},{value:"Next Steps",id:"next-steps",level:2},{value:"Complete Code Summary",id:"complete-code-summary",level:2}];function f(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"embedding-a-code-playground",children:"Embedding a Code Playground"})}),"\n",(0,r.jsx)(t.p,{children:"Learn how to embed a LiveCodes playground into any web page so your users can write, edit, and run code directly on your site."}),"\n",(0,r.jsx)(t.p,{children:"Try the live demo below:"}),"\n",(0,r.jsx)(s.Z,{linkText:"Run the demo in LiveCodes",params:h}),"\n",(0,r.jsx)(a.Z,{params:h,height:"70vh"}),"\n",(0,r.jsx)(t.h2,{id:"what-well-build",children:"What We'll Build"}),"\n",(0,r.jsx)(t.p,{children:"A web page that:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsx)(t.li,{children:"Embeds a LiveCodes playground in a styled container"}),"\n",(0,r.jsx)(t.li,{children:"Pre-fills the playground with starter code"}),"\n",(0,r.jsx)(t.li,{children:"Lets users edit HTML, CSS, and JavaScript directly"}),"\n",(0,r.jsx)(t.li,{children:"Shows live results as they type"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"basic-embedding",children:"Basic Embedding"}),"\n",(0,r.jsxs)(t.p,{children:["The simplest way to embed LiveCodes is with ",(0,r.jsx)(t.code,{children:"createPlayground"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"import { createPlayground } from 'livecodes';\n\nconst config = {\n  markup: { language: 'html', content: '<h1>Hello!</h1>' },\n  style: { language: 'css', content: 'h1 { color: blue; }' },\n  script: { language: 'javascript', content: 'console.log(\"hi\")' },\n};\n\nawait createPlayground('#playground', { config });\n"})}),"\n",(0,r.jsxs)(t.p,{children:["This creates an interactive editor inside the ",(0,r.jsx)(t.code,{children:"#playground"})," element."]}),"\n",(0,r.jsx)(t.h2,{id:"loading-modes",children:"Loading Modes"}),"\n",(0,r.jsx)(t.p,{children:"LiveCodes supports three loading modes:"}),"\n",(0,r.jsx)(t.h3,{id:"eager-loading-default",children:"Eager Loading (Default)"}),"\n",(0,r.jsx)(t.p,{children:"The playground loads immediately:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"createPlayground('#playground', {\n  config,\n  loading: 'eager',\n});\n"})}),"\n",(0,r.jsx)(t.h3,{id:"lazy-loading",children:"Lazy Loading"}),"\n",(0,r.jsx)(t.p,{children:"The playground only loads when it scrolls into view:"}),"\n",(0,r.jsx)(a.Z,{params:p,height:"90vh"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"createPlayground('#playground', {\n  config,\n  loading: 'lazy',\n});\n"})}),"\n",(0,r.jsx)(t.h3,{id:"click-to-load",children:"Click-to-Load"}),"\n",(0,r.jsx)(t.p,{children:'Shows a "Click to load" screen until the user clicks:'}),"\n",(0,r.jsx)(a.Z,{params:g,height:"50vh"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"createPlayground('#playground', {\n  config,\n  loading: 'click',\n});\n"})}),"\n",(0,r.jsx)(t.h2,{id:"full-example",children:"Full Example"}),"\n",(0,r.jsxs)(t.p,{children:["Save this as ",(0,r.jsx)(t.code,{children:"index.html"})," and open it in a browser:"]}),"\n",(0,r.jsx)(l.Z,{language:"html",children:m}),"\n",(0,r.jsx)(t.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,r.jsx)(t.h3,{id:"container-setup",children:"Container Setup"}),"\n",(0,r.jsxs)(t.p,{children:["LiveCodes needs a container element. You can use any ",(0,r.jsx)(t.code,{children:"div"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",children:'<div id="playground"></div>\n'})}),"\n",(0,r.jsxs)(t.p,{children:["By default, the playground has a height of ",(0,r.jsx)(t.code,{children:"300px"}),". You can override this with CSS:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-css",children:"#playground {\n  height: 500px;\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["Or use the ",(0,r.jsx)(t.code,{children:"data-height"})," attribute:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",children:'<div id="playground" data-height="500"></div>\n'})}),"\n",(0,r.jsx)(t.h3,{id:"configuration",children:"Configuration"}),"\n",(0,r.jsxs)(t.p,{children:["Pass a ",(0,r.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object",children:"config object"})," to pre-fill the playground:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"const config = {\n  markup: {\n    language: 'html',\n    content: '<h1>Hello World</h1>',\n  },\n  style: {\n    language: 'css',\n    content: 'h1 { color: royalblue; }',\n  },\n  script: {\n    language: 'javascript',\n    content: 'console.log(\"Hello!\");',\n  },\n};\n"})}),"\n",(0,r.jsx)(t.h3,{id:"cdn-import",children:"CDN Import"}),"\n",(0,r.jsx)(t.p,{children:"For quick testing without a build step, import from jsDelivr:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",children:"<script type=\"module\">\n  import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes';\n  // ...\n<\/script>\n"})}),"\n",(0,r.jsx)(t.h2,{id:"testing-your-app",children:"Testing Your App"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsx)(t.li,{children:"Save the HTML example to a file"}),"\n",(0,r.jsx)(t.li,{children:"Open it in your browser"}),"\n",(0,r.jsx)(t.li,{children:"Edit the code in the embedded playground"}),"\n",(0,r.jsx)(t.li,{children:"Watch the result update live"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"challenge-enhance-your-playground",children:"Challenge: Enhance Your Playground"}),"\n",(0,r.jsx)(t.p,{children:"Try adding these features:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object",children:"Configure"})," the playground with a custom theme"]}),"\n",(0,r.jsx)(t.li,{children:'Add a "Reset" button to restore the original config'}),"\n",(0,r.jsx)(t.li,{children:"Add a language selector to switch between different starter templates"}),"\n",(0,r.jsx)(t.li,{children:"Style the playground container to match your site's design"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/tutorials/creating-shareable-urls",children:"Creating Shareable URLs"}),": Let users share their edited code"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/sdk/js-ts",children:"SDK Methods"}),": Learn more about controlling the playground programmatically"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object",children:"Configuration"}),": Explore all configuration options"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"complete-code-summary",children:"Complete Code Summary"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Concepts Covered"}),": Embedding, container setup, loading modes, configuration, CDN import"]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Key SDK Functions"}),": ",(0,r.jsx)(t.code,{children:"createPlayground"})]})]})}function v(e={}){let{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(f,{...e})}):f(e)}},65899:function(e,t,n){n.d(t,{Z:()=>f});var o=n("85893"),r=n("79207"),i=n("67294"),l=n("88711");let a=function(e){let{useEffect:t,useRef:n}=e;return function(e){let o=n(null),r=n(void 0),i=n(""),a=n(""),s=n(0),d=n(!1),c=e.className||"",u=e.style||{},h=e.height&&Number(e.height)?`${e.height}px`:e.height;return t(()=>{if(!o.current)return;let{className:t,style:n,height:c,sdkReady:u,config:h,...p}=e,g=++s.current,m=()=>s.current!==g||d.current,y=JSON.stringify(p);if(r.current&&a.current===y){let e=JSON.stringify(h);if(i.current===e)return;i.current=e,h&&r.current.setConfig(h)}else a.current=y,i.current=JSON.stringify(h),r.current?.destroy(),r.current=void 0,(0,l.TH)(o.current,{config:h,...p}).then(e=>{if(m()){e.destroy();return}r.current=e,"function"==typeof u&&u(e)})},[e]),t(()=>()=>{d.current=!0,r.current?.destroy(),r.current=void 0},[]),{containerRef:o,className:c,style:u,height:h}}}({useEffect:i.useEffect,useRef:i.useRef});function s(e){let{containerRef:t,className:n,style:r,height:i}=a(e);return(0,o.jsx)("div",{ref:t,className:n,style:{...r,...i?{height:i}:{}},"data-height":i})}var d=n("21858"),c=n("33262"),u=n("31705"),h=n("97645"),p=n("58168"),g=n("98228"),m=n("45050");function y(e){let[t,n]=(0,i.useState)(e.js),[r,l]=(0,i.useState)(e.ts),[a,s]=(0,i.useState)(e.react),[d,y]=(0,i.useState)(e.vue),[f,v]=(0,i.useState)(e.svelte),[x,b]=(0,i.useState)(e.solid),[j,w]=(0,i.useState)(e.preact),[C,k]=(0,i.useState)(e.webComponents),P="3.7rem",[S,L]=(0,i.useState)(!0),[E,N]=(0,i.useState)(P),T=(0,i.useRef)(null),Z=()=>{setTimeout(()=>{N(`calc(${T.current.offsetHeight}px + ${P})`)},5),setTimeout(()=>{N(`calc(${T.current.offsetHeight}px + ${P})`)},255)};return(0,i.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};n(e(t,"js")),l(e(r,"ts")),s(e(a,"jsx")),y(e(d,"html")),v(e(f,"html")),b(e(x,"tsx")),w(e(j,"jsx")),k(e(C,"html"))}},[]),(0,o.jsxs)("details",{className:`alert alert--info ${m.Z.details} ${g.Z.details}`,"data-collapsed":S,style:{height:S?P:E,overflow:"hidden",willChange:"height",transition:`height ${S?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,o.jsx)("summary",{onClick:()=>{L(!S),Z()},children:"show code"}),(0,o.jsx)("div",{ref:T,style:{display:"block",overflow:"hidden"},children:(0,o.jsx)("div",{className:m.Z.collapsibleContent,children:(0,o.jsxs)(p.Z,{groupId:"sdk-code",children:[(0,o.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:Z},children:(0,o.jsx)(u.Z,{language:"js",children:t})}),(0,o.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:Z},children:(0,o.jsx)(u.Z,{language:"ts",children:r})}),(0,o.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:Z},children:(0,o.jsx)(u.Z,{language:"jsx",children:a})}),(0,o.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:Z},children:(0,o.jsx)(u.Z,{language:"html",children:d})}),(0,o.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:Z},children:(0,o.jsx)(u.Z,{language:"html",children:f})}),(0,o.jsx)(h.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:Z},children:(0,o.jsx)(u.Z,{language:"tsx",children:x})}),(0,o.jsx)(h.Z,{value:"preact",label:"Preact",attributes:{onMouseDown:Z},children:(0,o.jsx)(u.Z,{language:"jsx",children:j})}),(0,o.jsx)(h.Z,{value:"web-components",label:"Web Components",attributes:{onMouseDown:Z},children:(0,o.jsx)(u.Z,{language:"html",children:C})})]})})})]})}function f(e){let{className:t,style:n,showCode:i,height:l,...a}=e,{colorMode:c}=(0,r.I)(),u=e=>JSON.stringify(e,null,2),h=`
import { createPlayground } from 'livecodes';

const options = ${u(a)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(a)};
createPlayground('#container', options);

`.trimStart(),g=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${u(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),m=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${u(a)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,f=`
<script>
import LiveCodes from 'livecodes/svelte';

export default function App() {
  const options = ${u(a)};
}
</script>

<LiveCodes {...options} />

`.trimStart(),v=`
import LiveCodes from 'livecodes/solid';

export default function App() {
  const options = ${u(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),x=`
import LiveCodes from 'livecodes/preact';

export default function App() {
  const options = ${u(a)};
  return (<LiveCodes {...options} />);
}

`.trimStart(),b=(e=>{let{config:t,params:n,...o}=e,r=Object.entries(o).filter(e=>{let[,t]=e;return null!=t}).map(e=>{let[t,n]=e,o=t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`);return"boolean"==typeof n?n?o:null:`${o}="${n}"`}).filter(Boolean),i=r.length>0?"\n  "+r.join("\n  "):"",l=[];t&&l.push(`playground.config = ${JSON.stringify(t,null,2).split("\n").join("\n  ")};`),n&&l.push(`playground.params = ${JSON.stringify(n,null,2).split("\n").join("\n  ")};`);let a=l.length>0?`

  const playground = document.querySelector("live-codes");
  ${l.join("\n  ")}`:"";return`
<live-codes${i}></live-codes>

<script type="module">
  import "livecodes/web-components";${a}
</script>
`.trimStart()})(a);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{className:`container_Egsj ${e.className}`,style:{height:l||"50vh",...e.style},appUrl:d.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,o.jsx)(y,{js:h,ts:p,react:g,vue:m,svelte:f,solid:v,preact:x,webComponents:b})]})}},58500:function(e,t,n){n.d(t,{Z:()=>d});var o=n("85893");n("67294");var r=n("6735");function i(e){let{children:t,fallback:n}=e;return(0,r.Z)()?(0,o.jsx)(o.Fragment,{children:t?.()}):n??null}var l=n("31705"),a=n("88711"),s=n("21858");function d(e){let{params:t,config:n,code:r,language:d="js",codeTitle:c="",showLineNumbers:u=!1,formatCode:h=!0,linkText:p="Run in LiveCodes",style:g={},className:m=""}=e,y=(0,a.rP)({appUrl:s.G,params:t,config:n});return(0,o.jsxs)("div",{style:{marginBottom:"30px",...g},className:m,children:[r&&(0,o.jsx)(i,{children:()=>(0,o.jsx)(l.Z,{language:d,title:c,showLineNumbers:u,children:h?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(r,d):r})}),(0,o.jsxs)("a",{href:y,target:"_blank",rel:"noreferrer",children:[p,(0,o.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,o.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},88711:function(e,t,n){n.d(t,{rP:()=>s,TH:()=>a});var o=n("17728");let r={chrome:["accelerometer","bluetooth","camera","clipboard-read","clipboard-write","display-capture","encrypted-media","geolocation","gyroscope","language-detector","language-model","local-network-access","microphone","midi","proofreader","rewriter","serial","summarizer","translator","web-share","writer","window-placement","xr-spatial-tracking"],firefox:["camera","display-capture","geolocation","microphone","web-share"],default:["accelerometer","ambient-light-sensor","camera","display-capture","encrypted-media","geolocation","gyroscope","microphone","midi","payment","serial","vr","web-share","xr-spatial-tracking"]},i=()=>{if("undefined"==typeof navigator)return"default";let e=navigator.userAgent;return/Firefox\//i.test(e)?"firefox":/Chrome\//i.test(e)?"chrome":"default"},l=()=>r[i()].filter(e=>{let t=globalThis.document?.featurePolicy?.features?.();return!t||t.includes(e)}).join("; ");async function a(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(n=e,e=null);let{config:o={},headless:r,loading:i="lazy",view:a}=n,d=r||"headless"===a,c=null,u=null,h=e=>{e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"};if("string"==typeof e)c=document.querySelector(e);else if(e instanceof HTMLElement)c=e;else if(!(d&&"object"==typeof e))throw Error("A valid container element is required.");if(!c){if(d)h(c=document.createElement("div")),document.body.appendChild(c);else throw Error(`Cannot find element: "${e}"`)}let p=new URL(s(n)),g=p.origin;p.searchParams.set("embed","true"),p.searchParams.set("loading",d?"eager":i),p.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof o&&Object.keys(o).length>0&&p.searchParams.set("config","sdk");let m=n.params;"object"==typeof m&&Object.keys(m).length>0&&JSON.stringify(m).length<1800&&Object.keys(m).forEach(e=>{p.searchParams.set(e,encodeURIComponent(String(m[e])))});let y=!1,f="Cannot call API methods after calling `destroy()`.",v=[],x=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),v.push(e)},b=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";removeEventListener(t,e);let n=v.indexOf(e);n>-1&&v.splice(n,1)},j=await new Promise(e=>{if(!c)return;let t=c.dataset.height||c.style.height;if(t&&!d){let e=isNaN(Number(t))?t:t+"px";c.style.height=e}"false"===c.dataset.defaultStyles||d||(c.style.backgroundColor||="#fff",c.style.border||="1px solid black",c.style.borderRadius||="8px",c.style.boxSizing||="border-box",c.style.padding||="0",c.style.width||="100%",c.style.height||=c.style.height||"300px",c.style.minHeight="200px",c.style.flexGrow="1",c.style.overflow||="hidden",c.style.resize||="vertical","inline"!==getComputedStyle(c).getPropertyValue("display")||(c.style.display="block"));let n="livecodes",r=c.querySelector(`iframe.${n}`),a=r||document.createElement("iframe");a.classList.add(n),a.setAttribute("allow",l()),a.setAttribute("allowtransparency","true"),a.setAttribute("allowpaymentrequest","true"),a.setAttribute("allowfullscreen","true"),a.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),a.setAttribute("loading","eager"===i?"eager":"lazy"),d?h(a):(a.style.height="100%",a.style.minHeight="200px",a.style.width="100%",a.style.margin="0",a.style.border="0",a.style.borderRadius=c.style.borderRadius),x(function e(t){t.source===a.contentWindow&&t.origin===g&&t.data?.type==="livecodes-init"&&(b(e),u=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!u||u<46)&&x(function e(t){t.source===a.contentWindow&&t.origin===g&&t.data?.type==="livecodes-get-config"&&(b(e),a.contentWindow?.postMessage({type:"livecodes-config",payload:o},g))}),a.onload=()=>{e(a)},a.src=p.href,r||c.appendChild(a)}),w=new Promise(e=>{x(function t(n){n.source===j.contentWindow&&n.origin===g&&n.data?.type==="livecodes-ready"&&(b(t),e(),w.settled=!0)})}),C=()=>y?Promise.reject(f):new Promise(async e=>{w.settled&&e(),j.contentWindow?.postMessage({type:"livecodes-load"},g),await w,e()}),k=(e,t)=>new Promise(async(n,o)=>{if(y)return o(f);await C();let r=T(),i=setTimeout(()=>{b(l),o(Error(`SDK call "${e}" timed out after 60000ms.`))},6e4);function l(t){if(t.source===j.contentWindow&&t.origin===g&&t.data?.type==="livecodes-api-response"&&t.data?.id===r&&t.data.method===e){clearTimeout(i),b(l);let e=t.data.payload;e?.error?o(e.error):n(e)}}x(l),j.contentWindow?.postMessage({method:e,id:r,args:t},g)}),P={},S=["load","ready","code","console","tests","destroy"],L=(e,t)=>{if(y)throw Error(f);return S.includes(e)?(k("watch",[e]),P[e]||(P[e]=[]),P[e]?.push(t),{remove:()=>{P[e]=P[e]?.filter(e=>e!==t),P[e]?.length===0&&k("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},E=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];x(async function(e){let t=E(e.data?.type??"");if(e.source!==j.contentWindow||e.origin!==g||!t||!P[t])return;let n=e.data?.payload;P[t]?.forEach(e=>{e(n)})});let N=()=>{j?.remove?.(),Object.values(P).forEach(e=>{e.length=0}),v.forEach(e=>removeEventListener("message",e)),v.length=0,t&&c&&t.unobserve(c),y=!0};"lazy"===i&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await C(),t.unobserve(c))})},{rootMargin:"150px"})).observe(c);let T=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>C(),run:()=>k("run"),format:e=>k("format",[e]),getShareUrl:e=>k("getShareUrl",[e]),getConfig:e=>k("getConfig",[e]),setConfig:e=>k("setConfig",[e]),getCode:()=>k("getCode"),show:(e,t)=>k("show",[e,t]),runTests:()=>k("runTests"),onChange:e=>L("code",e),watch:L,exec:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return k("exec",[e,...n])},destroy:()=>y?Promise.reject(f):(N(),Promise.resolve())}}function s(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:n="https://livecodes.io",params:r={},config:i={},headless:l,import:a,lite:s,view:d,...c}=t;try{e=new URL(n)}catch{throw Error(`${n} is not a valid URL.`)}let u=new URLSearchParams;Object.entries(c).forEach(t=>{let[n,o]=t;void 0!==o&&e.searchParams.set(n,String(o))});let h="headless"===t.view||l;if(s&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof i&&null==i.mode?i.mode="lite":e.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof i&&null==i.view&&"headless"!==d?i.view=d:e.searchParams.set("view",d)),"string"==typeof i)try{new URL(i),e.searchParams.set("config",encodeURIComponent(i))}catch{throw Error('"config" is not a valid URL or configuration object.')}else i&&"object"==typeof i&&Object.keys(i).length>0&&(i.title&&"Untitled Project"!==i.title&&e.searchParams.set("title",i.title),i.description&&i.description.length>0&&e.searchParams.set("description",i.description),u.set("config","code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(i))));if(r&&"object"==typeof r&&Object.keys(r).length>0)try{u.set("params",(0,o.compressToEncodedURIComponent)(JSON.stringify(r)))}catch{Object.keys(r).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(r[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),h&&e.searchParams.set("headless","true"),u.toString().length>0&&(e.hash=u.toString()),e.href}},50065:function(e,t,n){n.d(t,{Z:function(){return a},a:function(){return l}});var o=n(67294);let r={},i=o.createContext(r);function l(e){let t=o.useContext(i);return o.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);