"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["6083"],{9662:function(e,t,s){s.r(t),s.d(t,{stdlibConfig:()=>c,default:()=>g,externalsConfig:()=>h,frontMatter:()=>l,metadata:()=>n,assets:()=>d,npmConfig:()=>m,toc:()=>p,contentTitle:()=>a});var n=JSON.parse('{"id":"languages/gleam","title":"Gleam","description":"Gleam is a friendly language for building type-safe systems that scale!","source":"@site/docs/languages/gleam.mdx","sourceDirName":"languages","slug":"/languages/gleam","permalink":"/livecodes/docs/languages/gleam","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/gleam.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Flow","permalink":"/livecodes/docs/languages/flow"},"next":{"title":"Go (Golang)","permalink":"/livecodes/docs/languages/go"}}'),i=s("5893"),o=s("65"),r=s("3365");let l={},a="Gleam",d={},c={activeEditor:"script",script:{language:"gleam",content:`import gleam/io
import gleam/string

pub fn main() {
  "hello world!"
  |> string.uppercase
  |> io.println
}`},tools:{status:"open"}},h={activeEditor:"script",script:{language:"gleam",content:'import gleam/io\n\n@external(javascript, "my_pkg/greet.js", "hello")\npub fn hello(str: String) -> String\n\npub fn main() {\n io.println(hello("from JavaScript"))\n}'},tools:{status:"open"},customSettings:{imports:{"my_pkg/greet.js":"https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js"}}},m={activeEditor:"script",script:{language:"gleam",content:'import gleam/io\n\n// npm module (https://www.npmjs.com/package/uuid)\n@external(javascript, "npm:uuid", "v4")\npub fn uuid() -> String\n\n// jsr module (https://jsr.io/@kwhinnery/yassify)\n@external(javascript, "jsr:@kwhinnery/yassify", "yassify")\npub fn yassify(str: String) -> String\n\npub fn main() {\n io.println(uuid())\n io.println(yassify("Hello, World!"))\n}\n'},tools:{status:"open"}},p=[{value:"Usage",id:"usage",level:2},{value:"Standard Library",id:"standard-library",level:3},{value:"Custom Modules",id:"custom-modules",level:3},{value:"Externals",id:"externals",level:3},{value:"NPM Modules",id:"npm-modules",level:3},{value:"Example Usage",id:"example-usage",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function u(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"gleam",children:"Gleam"})}),"\n","\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://gleam.run",children:"Gleam"})," is a friendly language for building type-safe systems that scale!"]}),"\n",(0,i.jsx)(t.p,{children:"Gleam is a statically-typed functional programming language, which compiles to Erlang or JavaScript."}),"\n",(0,i.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(t.p,{children:["LiveCodes compiles Gleam code to JavaScript using the WebAssembly (wasm) version of the ",(0,i.jsx)(t.a,{href:"https://github.com/gleam-lang/gleam",children:"official Gleam compiler"}),". The compiled JavaScript code is then executed in the context of the ",(0,i.jsx)(t.a,{href:"/livecodes/docs/features/result",children:"result page"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["The compiled JavaScript code can be inspected in the ",(0,i.jsx)(t.a,{href:"/livecodes/docs/features/compiled-code",children:"Compiled Code Viewer"})," in the ",(0,i.jsx)(t.a,{href:"/livecodes/docs/features/tools-pane",children:"Tools Pane"})," (below the result page). Console output is shown in the ",(0,i.jsx)(t.a,{href:"/livecodes/docs/features/console",children:"integrated console"}),"."]}),"\n",(0,i.jsx)(t.p,{children:"Please note that the compiler messages (e.g. errors and warnings) are shown in the browser console (not the integrated console)."}),"\n",(0,i.jsx)(t.h3,{id:"standard-library",children:"Standard Library"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://hexdocs.pm/gleam_stdlib/",children:"Gleam's standard library"})," in addition to the following packages are available for use and can be imported as usual with no additional configuration:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://hexdocs.pm/gleam_crypto/",children:"gleam/crypto"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://hexdocs.pm/gleam_erlang/",children:"gleam/erlang"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://hexdocs.pm/gleam_fetch/",children:"gleam/fetch"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://hexdocs.pm/gleam_http/",children:"gleam/http"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://hexdocs.pm/gleam_javascript/",children:"gleam/javascript"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://hexdocs.pm/gleam_json/",children:"gleam/json"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://hexdocs.pm/gleam_otp/",children:"gleam/otp"})}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Demo:"}),"\n","\n",(0,i.jsx)(r.Z,{config:c}),"\n",(0,i.jsx)(t.h3,{id:"custom-modules",children:"Custom Modules"}),"\n",(0,i.jsx)(t.p,{children:"Custom modules can be used in Gleam code. These modules have to be precompiled (to JavaScript) by the Gleam compiler. URLs to the compiled JavaScript code and either the Gleam source code or URLs to the Gleam source code are needed to be able to import custom modules."}),"\n",(0,i.jsxs)(t.p,{children:["This is an example for a repo with precompiled Gleam modules:\n",(0,i.jsx)(t.a,{href:"https://github.com/live-codes/gleam-precompiled",children:"https://github.com/live-codes/gleam-precompiled"})]}),"\n",(0,i.jsxs)(t.p,{children:["Please refer to ",(0,i.jsx)(t.a,{href:"https://gleam.run/writing-gleam/command-line-reference/",children:"Gleam CLI docs"})," for details about adding and building packages."]}),"\n",(0,i.jsxs)(t.p,{children:["Note that the built code was committed to the repo by clearing out ",(0,i.jsx)(t.code,{children:".gitignore"})," file."]}),"\n",(0,i.jsxs)(t.p,{children:["The built code can then by accessed from a ",(0,i.jsx)(t.a,{href:"https://www.jsdelivr.com/?docs=gh",children:"CDN that mirrors GitHub"}),", like this:\n",(0,i.jsx)(t.code,{children:"https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@main/..."})]}),"\n",(0,i.jsxs)(t.p,{children:["Built modules can then be declared in ",(0,i.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"custom settings"})," (Project menu \u2192 Custom Settings), under the ",(0,i.jsx)(t.code,{children:"gleam"})," property, by adding a ",(0,i.jsx)(t.code,{children:"modules"})," property."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"modules"})," property is an object that has the module name as the key. The value is an object with the following properties:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"srcUrl"}),": the URL to the Gleam source code of the module."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"src"}),": optionally use this instead of ",(0,i.jsx)(t.code,{children:"srcUrl"})," to specify the Gleam source code of the module."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"compiledUrl"}),": the URL to the compiled JavaScript code of the module."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Example:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "gleam": {\n    "modules": {\n      "plinth/browser/document": {\n        "srcUrl": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/build/packages/plinth/src/plinth/browser/document.gleam",\n        "compiledUrl": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/build/dev/javascript/plinth/plinth/browser/document.mjs"\n      }\n    }\n  }\n}\n'})}),"\n",(0,i.jsxs)(t.p,{children:["See the ",(0,i.jsx)(t.a,{href:"#example-usage",children:"demo below"})," (",(0,i.jsx)(t.a,{href:"https://livecodes.io/?template=gleam",children:"open in LiveCodes"}),")."]}),"\n",(0,i.jsxs)(t.p,{children:["If ",(0,i.jsx)(t.code,{children:"compiledUrl"})," property is not specified, the JavaScript module is imported from this URL pattern: ",(0,i.jsx)(t.code,{children:"{module_name}.mjs"})," (example: ",(0,i.jsx)(t.code,{children:"plinth/browser/document.mjs"}),").\nThis can then be ",(0,i.jsx)(t.a,{href:"/livecodes/docs/features/module-resolution#custom-module-resolution",children:"mapped (using import maps)"})," in ",(0,i.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"custom settings"})," (Project menu \u2192 Custom Settings) to the full URL of the compiled JavaScript code."]}),"\n",(0,i.jsx)(t.p,{children:"Example:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "gleam": {\n    "modules": {\n      "some_pkg/some_module": {\n        "srcUrl": "https://example.com/packages/some_pkg/some_module.gleam"\n      },\n      "another_pkg/another_module": {\n        "srcUrl": "https://example.com/packages/another_pkg/another_module.gleam"\n      }\n    }\n  },\n  "imports": {\n    // map a specific module\n    "some_pkg/some_module.mjs": "https://example.com/compiled/some_pkg/some_module.mjs",\n    // or map a whole directory\n    "another_pkg/": "https://example.com/compiled/another_pkg/"\n  }\n}\n'})}),"\n",(0,i.jsx)(t.h3,{id:"externals",children:"Externals"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://tour.gleam.run/advanced-features/externals/",children:"External functions"})," written in JavaScript can also be used. An external function has the ",(0,i.jsx)(t.code,{children:"@external"}),' attribute on it. It needs to specify a "relative" URL specifying the location of the external code. This URL is ',(0,i.jsx)(t.a,{href:"/livecodes/docs/features/module-resolution#custom-module-resolution",children:"mapped (using import maps)"})," in ",(0,i.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"custom settings"})," (Project menu \u2192 Custom Settings) to the full URL of the script that contains the code."]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:"Example:"})}),"\n",(0,i.jsxs)(t.p,{children:["The following script is hosted on this URL:\n",(0,i.jsx)(t.a,{href:"https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js",children:"https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js"})]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",metastring:'title="greet.js"',children:"export const hello = (str) => `Hello, ${str}!`;\n"})}),"\n",(0,i.jsx)(t.p,{children:"Use this in custom settings:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "imports": {\n    "my_pkg/greet.js": "https://cdn.jsdelivr.net/gh/live-codes/gleam-precompiled@v0.3.0/demo/greet.js"\n  }\n}\n'})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:'"my_pkg/greet.js"'})," can then be used in the ",(0,i.jsx)(t.code,{children:"@external"})," attribute."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",metastring:'title="Gleam"',children:'import gleam/io\n\n// highlight-next-line\n@external(javascript, "my_pkg/greet.js", "hello")\n// highlight-next-line\npub fn hello(str: String) -> String\n\npub fn main() {\n io.println(hello("from JavaScript"))\n}\n'})}),"\n",(0,i.jsx)(t.p,{children:"Demo:"}),"\n","\n",(0,i.jsx)(r.Z,{config:h}),"\n",(0,i.jsxs)(t.admonition,{type:"tip",children:[(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs",children:"Data URLs"})," can be used to avoid having to host the external code online. LiveCodes enables ",(0,i.jsx)(t.a,{href:"/livecodes/docs/features/data-urls",children:"creating data URLs"})," easily."]}),(0,i.jsx)(t.p,{children:"Example:\nThe import map in the previous example can be rewritten like this:"}),(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "imports": {\n    "my_pkg/greet.js": "data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNvbnN0IGhlbGxvID0gKHN0cikgPT4gYEhlbGxvLCAke3N0cn0hYDs="\n  }\n}\n'})})]}),"\n",(0,i.jsx)(t.h3,{id:"npm-modules",children:"NPM Modules"}),"\n",(0,i.jsxs)(t.p,{children:["Modules published to ",(0,i.jsx)(t.a,{href:"https://www.npmjs.com/",children:"npm"}),", ",(0,i.jsx)(t.a,{href:"https://deno.land/x",children:"deno.land/x"})," and ",(0,i.jsx)(t.a,{href:"https://jsr.io/",children:"jsr.io"})," can be imported as external functions. There is no need to specify import maps. The package/module name is prefixed with a modifier to specify the source (e.g. ",(0,i.jsx)(t.code,{children:"npm:uuid"})," to import the ",(0,i.jsx)(t.a,{href:"https://www.npmjs.com/package/uuid",children:(0,i.jsx)(t.code,{children:"uuid"})})," npm module)."]}),"\n",(0,i.jsxs)(t.p,{children:["See list of supported CDNs and the respective modifiers in the section about ",(0,i.jsx)(t.a,{href:"/livecodes/docs/features/module-resolution#cdn-providers",children:"module resolution"}),"."]}),"\n",(0,i.jsx)(t.p,{children:"Example:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",children:'import gleam/io\n\n// npm module (https://www.npmjs.com/package/uuid)\n@external(javascript, "npm:uuid", "v4")\npub fn uuid() -> String\n\n// jsr module (https://jsr.io/@kwhinnery/yassify)\n@external(javascript, "jsr:@kwhinnery/yassify", "yassify")\npub fn yassify(str: String) -> String\n\npub fn main() {\n io.println(uuid())\n io.println(yassify("Hello, World!"))\n}\n'})}),"\n",(0,i.jsx)(t.p,{children:"Demo:"}),"\n","\n",(0,i.jsx)(r.Z,{config:m}),"\n",(0,i.jsx)(t.h3,{id:"example-usage",children:"Example Usage"}),"\n",(0,i.jsx)(t.p,{children:"This is the Gleam starter template demonstrating the use of standard library, custom modules, external functions and npm modules."}),"\n",(0,i.jsx)(r.Z,{template:"gleam",height:"80vh"}),"\n",(0,i.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,i.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:"gleam"})}),"\n",(0,i.jsx)(t.h3,{id:"extension",children:"Extension"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:".gleam"})}),"\n",(0,i.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:"script"})}),"\n",(0,i.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,i.jsxs)(t.p,{children:["The wasm version of the ",(0,i.jsx)(t.a,{href:"https://github.com/gleam-lang/gleam",children:"official Gleam compiler"}),"."]}),"\n",(0,i.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:"v1.3.0-rc1"})}),"\n",(0,i.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:"https://livecodes.io/?template=gleam",children:"https://livecodes.io/?template=gleam"})}),"\n",(0,i.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://gleam.run",children:"Gleam"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://gleam.run/documentation/",children:"Gleam documentation"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://tour.gleam.run/",children:"Gleam language tour"})}),"\n"]})]})}function g(e={}){let{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},3365:function(e,t,s){s.d(t,{Z:()=>f});var n=s("5893"),i=s("4200"),o=s("7294"),r=s("8294");function l(e){let t=(0,o.useRef)(null),[s,i]=(0,o.useState)(e.className||""),[l,a]=(0,o.useState)(e.style||{}),[d,c]=(0,o.useState)(e.height),[h,m]=(0,o.useState)(),[p,u]=(0,o.useState)(JSON.stringify(e.config||"")),[g,f]=(0,o.useState)("");return(0,o.useEffect)(()=>{if(!t.current)return;let{className:s,style:n,height:o,sdkReady:l,config:d,...x}=e;if(i(s||""),a(n||{}),c(o),h&&g===JSON.stringify(x)){if(p===JSON.stringify(d))return;u(JSON.stringify(d)),"string"==typeof d?fetch(d).then(e=>e.json()).then(e=>{h?.setConfig(e)}):d&&h.setConfig(d)}else f(JSON.stringify(x)),h?.destroy(),(0,r.T)(t.current,{config:d,...x}).then(e=>{m(e),"function"==typeof l&&l(e)})},[e]),(0,o.useEffect)(()=>()=>{h?.destroy()},[]),(0,n.jsx)("div",{ref:t,className:s,style:l,"data-height":d})}var a=s("1858"),d=s("3262"),c=s("1705"),h=s("8168"),m=s("7645"),p=s("5050"),u=s("8228");function g(e){let[t,s]=(0,o.useState)(e.js),[i,r]=(0,o.useState)(e.ts),[l,a]=(0,o.useState)(e.react),[g,f]=(0,o.useState)(e.vue),[x,j]=(0,o.useState)(e.svelte),v="3.7rem",[y,b]=(0,o.useState)(!0),[w,S]=(0,o.useState)(v),C=(0,o.useRef)(null),k=()=>{setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${v})`)},5),setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${v})`)},255)};return(0,o.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),r(e(i,"ts")),a(e(l,"jsx")),f(e(g,"html")),j(e(x,"html"))}},[]),(0,n.jsxs)("details",{className:`alert alert--info ${p.Z.details} ${u.Z.details}`,"data-collapsed":y,style:{height:y?v:w,overflow:"hidden",willChange:"height",transition:`height ${y?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,n.jsx)("summary",{onClick:()=>{b(!y),k()},children:"show code"}),(0,n.jsx)("div",{ref:C,style:{display:"block",overflow:"hidden"},children:(0,n.jsx)("div",{className:p.Z.collapsibleContent,children:(0,n.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,n.jsx)(m.Z,{value:"js",label:"JS",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"js",children:t})}),(0,n.jsx)(m.Z,{value:"ts",label:"TS",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"ts",children:i})}),(0,n.jsx)(m.Z,{value:"react",label:"React",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"jsx",children:l})}),(0,n.jsx)(m.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"html",children:g})}),(0,n.jsx)(m.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"html",children:x})})]})})})]})}function f(e){let{className:t,style:s,showCode:o,height:r,...d}=e,{colorMode:c}=(0,i.I)(),h=e=>JSON.stringify(e,null,2),m=`
import { createPlayground } from 'livecodes';

const options = ${h(d)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(d)};
createPlayground('#container', options);

`.trimStart(),u=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${h(d)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${h(d)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,x=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${h(d)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:r||"50vh",...e.style},appUrl:a.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,n.jsx)(g,{js:m,ts:p,react:u,vue:f,svelte:x})]})}},8294:function(e,t,s){s.d(t,{T:function(){return i},r:function(){return o}});var n=s(7728);async function i(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(s=e,e=null);let{appUrl:n="https://livecodes.io/",params:i={},config:o={},import:r,headless:l,lite:a,loading:d="lazy",template:c,view:h}=s,m=l||"headless"===h,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!(m&&"object"==typeof e))throw Error("A valid container element is required.");if(!p){if(m)E(p=document.createElement("div")),document.body.appendChild(p);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(n)}catch{throw Error(`"${n}" is not a valid URL.`)}let u=t.origin;if("object"==typeof i&&Object.keys(i).forEach(e=>{t.searchParams.set(e,String(i[e]))}),c&&t.searchParams.set("template",c),r&&t.searchParams.set("x",r),m&&t.searchParams.set("headless","true"),a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof o&&null==o.mode?o.mode="lite":t.searchParams.set("lite","true")),h&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof o&&null==o.view&&"headless"!==h?o.view=h:t.searchParams.set("view",h)),"string"==typeof o)try{new URL(o),t.searchParams.set("config",o)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof o)Object.keys(o).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",m?"eager":d);let g=!1,f="Cannot call API methods after calling `destroy()`.",x=await new Promise(e=>{if(!p)return;let s=p.dataset.height||p.style.height;if(s&&!m){let e=isNaN(Number(s))?s:s+"px";p.style.height=e}"false"===p.dataset.defaultStyles||m||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="8px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");let n="livecodes",i=p.querySelector(`iframe.${n}`),r=i||document.createElement("iframe");r.classList.add(n),r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),r.setAttribute("loading","eager"===d?"eager":"lazy"),m?E(r):(r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=p.style.borderRadius),addEventListener("message",function e(t){t.source===r.contentWindow&&t.origin===u&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:o},u))}),r.onload=()=>{e(r)},r.src=t.href,i||p.appendChild(r)}),j=new Promise(e=>{addEventListener("message",function t(s){s.source===x.contentWindow&&s.origin===u&&s.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),j.settled=!0)})}),v=()=>g?Promise.reject(f):new Promise(async e=>{j.settled&&e(),x.contentWindow?.postMessage({type:"livecodes-load"},u),await j,e()}),y=(e,t)=>new Promise(async(s,n)=>{if(g)return n(f);await v();let i=L();addEventListener("message",function t(o){if(o.source===x.contentWindow&&o.origin===u&&o.data?.type==="livecodes-api-response"&&o.data?.id===i&&o.data.method===e){removeEventListener("message",t);let e=o.data.payload;e?.error?n(e.error):s(e)}}),x.contentWindow?.postMessage({method:e,id:i,args:t},u)}),b={},w=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw Error(f);return w.includes(e)?(y("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter(e=>e!==t),b[e]?.length===0&&y("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=C(e.data?.type??"");if(e.source!==x.contentWindow||e.origin!==u||!t||!b[t])return;let s=e.data?.payload;b[t]?.forEach(e=>{e(s)})});let k=()=>{Object.values(b).forEach(e=>{e.length=0}),x?.remove?.(),g=!0};function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===d&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await v(),t.unobserve(p))})},{rootMargin:"150px"}).observe(p);let L=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),n=1;n<t;n++)s[n-1]=arguments[n];return y("exec",[e,...s])},destroy:()=>j.settled?y("destroy").then(k):g?Promise.reject(f):(k(),Promise.resolve())}}function o(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:s,config:i,import:o,...r}=e,l="string"==typeof i?{config:i}:"object"==typeof i?{x:"code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(i))}:{},a=new URLSearchParams(JSON.parse(JSON.stringify({...r,...s,x:o,...l}))).toString();return(t||"https://livecodes.io")+(a?"?"+a:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,s;let n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let o=e.dataset.config||e.dataset.prefill;if(o)try{s=JSON.parse(o)}catch{}let r=encodeURIComponent(e.outerHTML);e.innerHTML="",i(e,{import:"dom/"+r,...t,...s?{config:s}:{}})})})},65:function(e,t,s){s.d(t,{Z:function(){return l},a:function(){return r}});var n=s(7294);let i={},o=n.createContext(i);function r(e){let t=n.useContext(o);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);