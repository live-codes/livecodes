"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["9716"],{4441:function(e,t,s){s.r(t),s.d(t,{basicJsxDemo:()=>h,importsDemo:()=>g,stylesDemo:()=>x,preactDemo:()=>b,frontMatter:()=>a,styledComponentsDemo:()=>y,metadata:()=>n,exportsDemo:()=>f,assets:()=>c,cssModulesDemo:()=>j,rootDemo:()=>p,contentTitle:()=>d,disableAutoRenderDemo:()=>m,toc:()=>w,default:()=>C,reactDomDemo:()=>u,tailwindcssDemo:()=>v});var n=JSON.parse('{"id":"languages/jsx","title":"JSX","description":"JSX is a syntax extension for JavaScript that allows writing HTML-like markup inside JavaScript.","source":"@site/docs/languages/jsx.mdx","sourceDirName":"languages","slug":"/languages/jsx","permalink":"/livecodes/docs/languages/jsx","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/jsx.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"JavaScript","permalink":"/livecodes/docs/languages/javascript"},"next":{"title":"Julia","permalink":"/livecodes/docs/languages/julia"}}'),o=s("5893"),r=s("65"),i=s("3365"),l=s("8500");let a={},d="JSX",c={},h={jsx:`export default function App() {
  return <h1>Hello World!</h1>;
}`},u={jsx:`import { createRoot } from "react-dom/client";

function App() {
  return <h1>Hello World!</h1>;
}

const root = createRoot(document.querySelector("#root"));
root.render(<App />);`,html:'<div id="root"></div>'},p={html:'<div id="livecodes-app">Loading...</div>',jsx:`export default function App() {
  return <h1>Hello World!</h1>;
}`},m={markup:{language:"html",content:`JSX auto-rendering is disabled. Set from Project menu \u{2192} Custom Settings.`},script:{language:"jsx",content:`export default function App() {
  return <h1>Hello World!</h1>;
}`},customSettings:{jsx:{disableAutoRender:!0}}},g={jsx:`import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      confetti();
    }
  }, [count]);

  return (
    <div className="m-5 text-center">
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
`},f={mdx:`import Greeting from "./script";

<Greeting name="MDX" />
`,jsx:`export default function(props) {
  return <h1>Greeting from {props.name}!</h1>;
}
`},x={jsx:`import "bootstrap/dist/css/bootstrap.css";

export default () => <h1 className="m-5 text-center">Hello World!</h1>;
`},j={activeEditor:"script",style:{language:"css",content:`.title {
  color: green;
  font-family: sans-serif;
}
`},script:{language:"jsx",content:`import classes from './style.module.css';

export default function() {
  return <h1 className={classes.title}>Hello, CSS Modules!</h1>;
}
`},processors:["cssmodules"]},v={activeEditor:"script",style:{language:"css",content:`@tailwind base;
@tailwind components;
@tailwind utilities;
`},script:{language:"jsx",content:`export default function() {
  return <h1 className="text-3xl font-bold text-gray-500 text-center m-4">Hello, Tailwind CSS!</h1>;
}
`},processors:["tailwindcss"]},y={jsx:"import styled from 'styled-components';\n\nconst Title = styled.h1`\n text-align: center;\n font-family: sans-serif;\n color: palevioletred;\n`;\n\nexport default function () {\n return <Title>Hello, styled-components!</Title>;\n}\n"},b={jsx:`/** @jsx h */
import { h, render } from 'preact';

const App = (props) => <h1>Hello, {props.name}</h1>;

render(<App name="Preact" />, document.body);
`},w=[{value:"Usage",id:"usage",level:2},{value:"Auto-rendering",id:"auto-rendering",level:3},{value:"Root Element",id:"root-element",level:4},{value:"Disabling Auto-rendering",id:"disabling-auto-rendering",level:4},{value:"Importing Modules",id:"importing-modules",level:3},{value:"Types for Imported Modules",id:"types-for-imported-modules",level:4},{value:"Exports",id:"exports",level:3},{value:"Styles",id:"styles",level:3},{value:"Style Editor",id:"style-editor",level:4},{value:"Importing Stylesheets",id:"importing-stylesheets",level:4},{value:"CSS Modules",id:"css-modules",level:4},{value:"CSS Frameworks",id:"css-frameworks",level:4},{value:"CSS-in-JS",id:"css-in-js",level:4},{value:"Custom JSX Runtimes",id:"custom-jsx-runtimes",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Extension",id:"extension",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Links",id:"links",level:2}];function S(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"jsx",children:"JSX"})}),"\n","\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"https://react.dev/learn/writing-markup-with-jsx",children:"JSX"})," is a syntax extension for JavaScript that allows writing HTML-like markup inside JavaScript.\nIt has been popularized by ",(0,o.jsx)(t.a,{href:"https://react.dev/",children:"React"}),", and then adopted by many other libraries/frameworks."]}),"\n",(0,o.jsxs)(t.p,{children:["By default, when running JSX in LiveCodes, ",(0,o.jsx)(t.a,{href:"https://react.dev/",children:"React"})," runtime is used.\nHowever, other libraries like ",(0,o.jsx)(t.a,{href:"https://preactjs.com/",children:"Preact"}),", ",(0,o.jsx)(t.a,{href:"https://nanojsx.io/",children:"nano JSX"})," and others can be used as well (see ",(0,o.jsx)(t.a,{href:"#custom-jsx-runtimes",children:"Custom JSX Runtimes"}),")."]}),"\n",(0,o.jsxs)(t.p,{children:["TSX is also supported in LiveCodes and is ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/tsx",children:"documented here"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["Please note that ",(0,o.jsx)(t.a,{href:"https://react.dev/learn/react-compiler",children:"React compiler"})," is also available in LiveCodes and is ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/react",children:"documented here"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,o.jsxs)(t.p,{children:["The easiest way is to ",(0,o.jsx)(t.a,{href:"#auto-rendering",children:"auto-render"})," a component by exporting it as the ",(0,o.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#using_the_default_export",children:"default export"}),":"]}),"\n","\n",(0,o.jsx)(l.Z,{params:h,code:h.jsx,language:"jsx",formatCode:!1}),"\n",(0,o.jsxs)(t.p,{children:["You may, however, be more explicit and render the component yourself using ",(0,o.jsx)(t.a,{href:"https://react.dev/reference/react-dom/client",children:"React DOM"}),":"]}),"\n","\n",(0,o.jsx)(l.Z,{params:u,code:u.jsx,language:"jsx",formatCode:!1}),"\n",(0,o.jsxs)(t.admonition,{title:"note",type:"info",children:[(0,o.jsxs)(t.p,{children:["React's ",(0,o.jsx)(t.a,{href:"https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html",children:"new JSX transform"})," is utilized. So there is no need to import React."]}),(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-jsx",children:"// this is not needed:\n// import React from 'react';\n\nexport default function App() {\n  return <h1>Hello World!</h1>;\n}\n"})})]}),"\n",(0,o.jsx)(t.h3,{id:"auto-rendering",children:"Auto-rendering"}),"\n",(0,o.jsx)(t.p,{children:"A component is rendered automatically as a React component (without having to manually use React Dom to render it) if the following conditions are met:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"The component is exported as the default export."}),"\n",(0,o.jsxs)(t.li,{children:["No custom JSX runtime is used (see ",(0,o.jsx)(t.a,{href:"#custom-jsx-runtimes",children:"Custom JSX Runtimes"}),")."]}),"\n",(0,o.jsxs)(t.li,{children:["No ",(0,o.jsxs)(t.a,{href:"#exports",children:["imports from ",(0,o.jsx)(t.code,{children:'"./script"'})]})," in markup editor."]}),"\n",(0,o.jsxs)(t.li,{children:["Auto-rendering is not ",(0,o.jsx)(t.a,{href:"#disabling-auto-rendering",children:"disabled"}),"."]}),"\n"]}),"\n",(0,o.jsx)(t.h4,{id:"root-element",children:"Root Element"}),"\n",(0,o.jsxs)(t.p,{children:["To render the React components to a specific ",(0,o.jsx)(t.a,{href:"https://react.dev/reference/react-dom/client/createRoot",children:"root"})," DOM element use ",(0,o.jsx)(t.code,{children:'"livecodes-app"'})," as the element ",(0,o.jsx)(t.code,{children:"id"}),". Otherwise, if that element is not found, a new ",(0,o.jsx)(t.code,{children:"div"})," element is added to ",(0,o.jsx)(t.code,{children:"document.body"})," and is used as the root."]}),"\n",(0,o.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,o.jsx)(l.Z,{params:p,code:p.html,language:"html",formatCode:!1}),"\n",(0,o.jsx)(t.h4,{id:"disabling-auto-rendering",children:"Disabling Auto-rendering"}),"\n",(0,o.jsxs)(t.p,{children:["To disable auto-rendering, set the ",(0,o.jsx)(t.a,{href:"#custom-settings",children:"custom settings"})," ",(0,o.jsx)(t.code,{children:"disableAutoRender"})," property to ",(0,o.jsx)(t.code,{children:"true"}),"."]}),"\n","\n",(0,o.jsx)(l.Z,{config:m,code:JSON.stringify(m.customSettings,null,2),language:"json",codeTitle:"Custom Settings",formatCode:!1}),"\n",(0,o.jsx)(t.h3,{id:"importing-modules",children:"Importing Modules"}),"\n",(0,o.jsxs)(t.p,{children:["npm modules can be imported as described in the section about ",(0,o.jsx)(t.a,{href:"/livecodes/docs/features/module-resolution",children:"module resolution"}),", including bare module imports and importing from different CDNs. Stylesheet imports are added as ",(0,o.jsx)(t.code,{children:'<link rel="stylesheet">'})," tags in the page ",(0,o.jsx)(t.code,{children:"head"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"Example:"}),"\n","\n",(0,o.jsx)(l.Z,{params:g,code:g.jsx,language:"jsx",formatCode:!1}),"\n",(0,o.jsxs)(t.p,{children:["Module imports can be customized using import maps as described in ",(0,o.jsx)(t.a,{href:"/livecodes/docs/features/module-resolution#custom-module-resolution",children:"module resolution"})," documentations."]}),"\n",(0,o.jsx)(t.h4,{id:"types-for-imported-modules",children:"Types for Imported Modules"}),"\n",(0,o.jsxs)(t.p,{children:["Types for imported modules are loaded automatically (if available) to provide ",(0,o.jsx)(t.a,{href:"/livecodes/docs/features/intellisense",children:"Intellisense"}),", auto-completion and type information."]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"LiveCodes Intellisense",src:s(9203).Z+"",width:"1128",height:"754"})}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"LiveCodes Intellisense",src:s(313).Z+"",width:"1126",height:"713"})}),"\n",(0,o.jsxs)(t.p,{children:["Moreover, you can provide custom type definitions for modules that do not have types available on npm. See ",(0,o.jsx)(t.a,{href:"/livecodes/docs/features/intellisense#custom-types",children:"Custom Types"})," for details."]}),"\n",(0,o.jsx)(t.h3,{id:"exports",children:"Exports"}),"\n",(0,o.jsxs)(t.p,{children:["Values exported from script editor (default or named) can be imported in the markup editor by importing from ",(0,o.jsx)(t.code,{children:'"./script"'})," (with no extension)."]}),"\n",(0,o.jsxs)(t.p,{children:["This can be useful, for example, when using ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/mdx",children:"MDX"})," to import components exported form JSX."]}),"\n",(0,o.jsx)(t.p,{children:"Demo:"}),"\n","\n",(0,o.jsx)(i.Z,{params:f}),"\n",(0,o.jsx)(t.admonition,{title:"note",type:"info",children:(0,o.jsxs)(t.p,{children:["When values are imported from ",(0,o.jsx)(t.code,{children:'"./script"'}),", ",(0,o.jsx)(t.a,{href:"#auto-rendering",children:"auto-rendering"})," is disabled, because it is assumed that you want to take control over component rendering."]})}),"\n",(0,o.jsx)(t.h3,{id:"styles",children:"Styles"}),"\n",(0,o.jsx)(t.p,{children:"CSS can be applied to the component using various ways:"}),"\n",(0,o.jsx)(t.h4,{id:"style-editor",children:"Style Editor"}),"\n",(0,o.jsxs)(t.p,{children:["Styles added in the style editor is applied globally to the ",(0,o.jsx)(t.a,{href:"/livecodes/docs/features/result",children:"result page"}),". This can use different ",(0,o.jsx)(t.strong,{children:"languages/processors"})," supported in LiveCodes including CSS, SCSS, Less, Stylus, ..etc. See ",(0,o.jsx)(t.a,{href:"/livecodes/docs/features/css",children:"style documentation"})," for more details."]}),"\n",(0,o.jsx)(t.p,{children:"And of course, styles and stylesheets added in markup editor are also applied globally."}),"\n",(0,o.jsx)(t.h4,{id:"importing-stylesheets",children:"Importing Stylesheets"}),"\n",(0,o.jsxs)(t.p,{children:["Stylesheets imported in script editor are added as ",(0,o.jsx)(t.code,{children:'<link rel="stylesheet">'})," tags in the page ",(0,o.jsx)(t.code,{children:"head"}),".\nThe stylesheet URL can be an absolute URL or a path in the npm package. The URL has to end with ",(0,o.jsx)(t.code,{children:'".css"'}),"."]}),"\n",(0,o.jsx)(t.p,{children:"example:"}),"\n","\n",(0,o.jsx)(l.Z,{params:x,code:x.jsx,language:"jsx",formatCode:!1}),"\n",(0,o.jsx)(t.h4,{id:"css-modules",children:"CSS Modules"}),"\n",(0,o.jsxs)(t.p,{children:["CSS modules are supported and are ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/cssmodules",children:"documented separately"}),". Make sure to enable CSS modules (from style editor menu or in ",(0,o.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object#processors",children:(0,o.jsx)(t.code,{children:"processors"})})," property of ",(0,o.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object",children:"configuration object"}),")."]}),"\n",(0,o.jsx)(t.p,{children:"Demo:"}),"\n","\n",(0,o.jsx)(i.Z,{config:j}),"\n",(0,o.jsx)(t.h4,{id:"css-frameworks",children:"CSS Frameworks"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"/livecodes/docs/features/css#css-processors",children:"CSS Frameworks"})," supported in LiveCodes (e.g. ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/tailwindcss",children:"Tailwind CSS"}),", ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/unocss",children:"UnoCSS"}),", ",(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/windicss",children:"WindiCSS"}),") can detect class names added in JSX. Make sure that the required utility is enabled (from style editor menu or in ",(0,o.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object#processors",children:(0,o.jsx)(t.code,{children:"processors"})})," property of ",(0,o.jsx)(t.a,{href:"/livecodes/docs/configuration/configuration-object",children:"configuration object"}),") and that required ",(0,o.jsx)(t.a,{href:"https://tailwindcss.com/docs/functions-and-directives#tailwind",children:"directives"})," are added to the style editor."]}),"\n",(0,o.jsx)(t.p,{children:"Demo:"}),"\n","\n",(0,o.jsx)(i.Z,{config:v}),"\n",(0,o.jsx)(t.h4,{id:"css-in-js",children:"CSS-in-JS"}),"\n",(0,o.jsx)(t.p,{children:"CSS-in-JS libraries can be imported and used as usual."}),"\n",(0,o.jsx)(t.p,{children:"Demo:"}),"\n","\n",(0,o.jsx)(i.Z,{params:y}),"\n",(0,o.jsx)(t.h3,{id:"custom-jsx-runtimes",children:"Custom JSX Runtimes"}),"\n",(0,o.jsxs)(t.p,{children:["LiveCodes allows using other libraries (like ",(0,o.jsx)(t.a,{href:"https://preactjs.com/",children:"Preact"})," and ",(0,o.jsx)(t.a,{href:"https://nanojsx.io/",children:"nano JSX"}),") as the JSX runtime."]}),"\n",(0,o.jsxs)(t.p,{children:["JSX is compiled to JavaScript using the TypeScript compiler, which allows multiple configuration options for JSX, including ",(0,o.jsx)(t.a,{href:"https://www.typescriptlang.org/tsconfig#jsx",children:(0,o.jsx)(t.code,{children:"jsx"})}),", ",(0,o.jsx)(t.a,{href:"https://www.typescriptlang.org/tsconfig#jsxFactory",children:(0,o.jsx)(t.code,{children:"jsxFactory"})}),", ",(0,o.jsx)(t.a,{href:"https://www.typescriptlang.org/tsconfig#jsxFragmentFactory",children:(0,o.jsx)(t.code,{children:"jsxFragmentFactory"})})," and ",(0,o.jsx)(t.a,{href:"https://www.typescriptlang.org/tsconfig#jsxImportSource",children:(0,o.jsx)(t.code,{children:"jsxImportSource"})}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["These can be configured using in-code pragmas or in ",(0,o.jsx)(t.a,{href:"#custom-settings",children:"custom settings"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"Example for using Preact:"}),"\n","\n",(0,o.jsx)(l.Z,{params:b,code:"//highlight-next-line\n"+b.jsx,language:"jsx",formatCode:!1,showLineNumbers:!0}),"\n",(0,o.jsx)(t.admonition,{title:"note",type:"info",children:(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"#auto-rendering",children:"Auto-rendering"})," is disabled for custom JSX runtimes."]})}),"\n",(0,o.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,o.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:"jsx"})}),"\n",(0,o.jsx)(t.h3,{id:"extension",children:"Extension"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:".jsx"})}),"\n",(0,o.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:"script"})}),"\n",(0,o.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.a,{href:"/livecodes/docs/languages/typescript",children:"TypeScript compiler"})}),"\n",(0,o.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,o.jsxs)(t.p,{children:["Using ",(0,o.jsx)(t.a,{href:"https://prettier.io/",children:"Prettier"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"custom-settings",children:"Custom Settings"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"/livecodes/docs/advanced/custom-settings",children:"Custom settings"})," added to the property ",(0,o.jsx)(t.code,{children:"jsx"})," are passed to the TypeScript compiler as ",(0,o.jsx)(t.a,{href:"https://www.typescriptlang.org/tsconfig#compilerOptions",children:"compiler options"})," while compiling JSX.\nIn addition, the option ",(0,o.jsx)(t.code,{children:"disableAutoRender"})," can be set to ",(0,o.jsx)(t.code,{children:"true"})," to disable ",(0,o.jsx)(t.a,{href:"#auto-rendering",children:"auto-rendering"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"Example:"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-json",metastring:'title="Custom Settings"',children:'{\n  "jsx": {\n    "disableAutoRender": true,\n    "jsxFactory": "h",\n    "jsxFragmentFactory": "Fragment"\n  }\n}\n'})}),"\n",(0,o.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://react.dev/",children:"React"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://react.dev/learn/writing-markup-with-jsx",children:"JSX"})}),"\n"]})]})}function C(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(S,{...e})}):S(e)}},9203:function(e,t,s){s.d(t,{Z:function(){return n}});let n=s.p+"assets/images/intellisense-1-bbc692078d1b88aaf8d2be72beb49849.jpg"},313:function(e,t,s){s.d(t,{Z:function(){return n}});let n=s.p+"assets/images/intellisense-2-ffdab70d10948aa165e3332a58d37827.jpg"},3365:function(e,t,s){s.d(t,{Z:()=>f});var n=s("5893"),o=s("4200"),r=s("7294"),i=s("8294");function l(e){let t=(0,r.useRef)(null),[s,o]=(0,r.useState)(e.className||""),[l,a]=(0,r.useState)(e.style||{}),[d,c]=(0,r.useState)(e.height),[h,u]=(0,r.useState)(),[p,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,f]=(0,r.useState)("");return(0,r.useEffect)(()=>{if(!t.current)return;let{className:s,style:n,height:r,sdkReady:l,config:d,...x}=e;if(o(s||""),a(n||{}),c(r),h&&g===JSON.stringify(x)){if(p===JSON.stringify(d))return;m(JSON.stringify(d)),"string"==typeof d?fetch(d).then(e=>e.json()).then(e=>{h?.setConfig(e)}):d&&h.setConfig(d)}else f(JSON.stringify(x)),h?.destroy(),(0,i.T)(t.current,{config:d,...x}).then(e=>{u(e),"function"==typeof l&&l(e)})},[e]),(0,r.useEffect)(()=>()=>{h?.destroy()},[]),(0,n.jsx)("div",{ref:t,className:s,style:l,"data-height":d})}var a=s("1858"),d=s("3262"),c=s("1705"),h=s("8168"),u=s("7645"),p=s("5050"),m=s("8228");function g(e){let[t,s]=(0,r.useState)(e.js),[o,i]=(0,r.useState)(e.ts),[l,a]=(0,r.useState)(e.react),[g,f]=(0,r.useState)(e.vue),[x,j]=(0,r.useState)(e.svelte),v="3.7rem",[y,b]=(0,r.useState)(!0),[w,S]=(0,r.useState)(v),C=(0,r.useRef)(null),k=()=>{setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${v})`)},5),setTimeout(()=>{S(`calc(${C.current.offsetHeight}px + ${v})`)},255)};return(0,r.useEffect)(()=>{if(d.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),i(e(o,"ts")),a(e(l,"jsx")),f(e(g,"html")),j(e(x,"html"))}},[]),(0,n.jsxs)("details",{className:`alert alert--info ${p.Z.details} ${m.Z.details}`,"data-collapsed":y,style:{height:y?v:w,overflow:"hidden",willChange:"height",transition:`height ${y?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,n.jsx)("summary",{onClick:()=>{b(!y),k()},children:"show code"}),(0,n.jsx)("div",{ref:C,style:{display:"block",overflow:"hidden"},children:(0,n.jsx)("div",{className:p.Z.collapsibleContent,children:(0,n.jsxs)(h.Z,{groupId:"sdk-code",children:[(0,n.jsx)(u.Z,{value:"js",label:"JS",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"js",children:t})}),(0,n.jsx)(u.Z,{value:"ts",label:"TS",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"ts",children:o})}),(0,n.jsx)(u.Z,{value:"react",label:"React",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"jsx",children:l})}),(0,n.jsx)(u.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"html",children:g})}),(0,n.jsx)(u.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:k},children:(0,n.jsx)(c.Z,{language:"html",children:x})})]})})})]})}function f(e){let{className:t,style:s,showCode:r,height:i,...d}=e,{colorMode:c}=(0,o.I)(),h=e=>JSON.stringify(e,null,2),u=`
import { createPlayground } from 'livecodes';

const options = ${h(d)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(d)};
createPlayground('#container', options);

`.trimStart(),m=`
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

`.trimStart();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:a.G,...e,config:{theme:c,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,n.jsx)(g,{js:u,ts:p,react:m,vue:f,svelte:x})]})}},8500:function(e,t,s){s.d(t,{Z:()=>d});var n=s("5893");s("7294");var o=s("6735");function r(e){let{children:t,fallback:s}=e;return(0,o.Z)()?(0,n.jsx)(n.Fragment,{children:t?.()}):s??null}var i=s("1705"),l=s("8294"),a=s("1858");function d(e){let{params:t,config:s,code:o,language:d="js",codeTitle:c="",showLineNumbers:h=!1,formatCode:u=!0,linkText:p="Run in LiveCodes",style:m={},className:g=""}=e,f=(0,l.r)({appUrl:a.G,params:t,config:s});return(0,n.jsxs)("div",{style:{marginBottom:"30px",...m},className:g,children:[o&&(0,n.jsx)(r,{children:()=>(0,n.jsx)(i.Z,{language:d,title:c,showLineNumbers:h,children:u?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}(o,d):o})}),(0,n.jsxs)("a",{href:f,target:"_blank",rel:"noreferrer",children:[p,(0,n.jsx)("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"},children:(0,n.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})]})]})}},8294:function(e,t,s){s.d(t,{T:function(){return o},r:function(){return r}});var n=s(7728);async function o(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(s=e,e=null);let{appUrl:n="https://livecodes.io/",params:o={},config:r={},import:i,headless:l,lite:a,loading:d="lazy",template:c,view:h}=s,u=l||"headless"===h,p=null;if("string"==typeof e)p=document.querySelector(e);else if(e instanceof HTMLElement)p=e;else if(!(u&&"object"==typeof e))throw Error("A valid container element is required.");if(!p){if(u)E(p=document.createElement("div")),document.body.appendChild(p);else throw Error(`Cannot find element: "${e}"`)}try{t=new URL(n)}catch{throw Error(`"${n}" is not a valid URL.`)}let m=t.origin;if("object"==typeof o&&Object.keys(o).forEach(e=>{t.searchParams.set(e,String(o[e]))}),c&&t.searchParams.set("template",c),i&&t.searchParams.set("x",i),u&&t.searchParams.set("headless","true"),a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":t.searchParams.set("lite","true")),h&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==h?r.view=h:t.searchParams.set("view",h)),"string"==typeof r)try{new URL(r),t.searchParams.set("config",r)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof r)Object.keys(r).length>0&&t.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",u?"eager":d);let g=!1,f="Cannot call API methods after calling `destroy()`.",x=await new Promise(e=>{if(!p)return;let s=p.dataset.height||p.style.height;if(s&&!u){let e=isNaN(Number(s))?s:s+"px";p.style.height=e}"false"===p.dataset.defaultStyles||u||(p.style.backgroundColor||="#fff",p.style.border||="1px solid black",p.style.borderRadius||="8px",p.style.boxSizing||="border-box",p.style.padding||="0",p.style.width||="100%",p.style.height||=p.style.height||"300px",p.style.minHeight="200px",p.style.flexGrow="1",p.style.overflow||="hidden",p.style.resize||="vertical");let n="livecodes",o=p.querySelector(`iframe.${n}`),i=o||document.createElement("iframe");i.classList.add(n),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),i.setAttribute("loading","eager"===d?"eager":"lazy"),u?E(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=p.style.borderRadius),addEventListener("message",function e(t){t.source===i.contentWindow&&t.origin===m&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:r},m))}),i.onload=()=>{e(i)},i.src=t.href,o||p.appendChild(i)}),j=new Promise(e=>{addEventListener("message",function t(s){s.source===x.contentWindow&&s.origin===m&&s.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),j.settled=!0)})}),v=()=>g?Promise.reject(f):new Promise(async e=>{j.settled&&e(),x.contentWindow?.postMessage({type:"livecodes-load"},m),await j,e()}),y=(e,t)=>new Promise(async(s,n)=>{if(g)return n(f);await v();let o=J();addEventListener("message",function t(r){if(r.source===x.contentWindow&&r.origin===m&&r.data?.type==="livecodes-api-response"&&r.data?.id===o&&r.data.method===e){removeEventListener("message",t);let e=r.data.payload;e?.error?n(e.error):s(e)}}),x.contentWindow?.postMessage({method:e,id:o,args:t},m)}),b={},w=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(g)throw Error(f);return w.includes(e)?(y("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(t),{remove:()=>{b[e]=b[e]?.filter(e=>e!==t),b[e]?.length===0&&y("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let t=C(e.data?.type??"");if(e.source!==x.contentWindow||e.origin!==m||!t||!b[t])return;let s=e.data?.payload;b[t]?.forEach(e=>{e(s)})});let k=()=>{Object.values(b).forEach(e=>{e.length=0}),x?.remove?.(),g=!0};function E(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===d&&"IntersectionObserver"in window&&new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await v(),t.unobserve(p))})},{rootMargin:"150px"}).observe(p);let J=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>v(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),n=1;n<t;n++)s[n-1]=arguments[n];return y("exec",[e,...s])},destroy:()=>j.settled?y("destroy").then(k):g?Promise.reject(f):(k(),Promise.resolve())}}function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:t,params:s,config:o,import:r,...i}=e,l="string"==typeof o?{config:o}:"object"==typeof o?{x:"code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(o))}:{},a=new URLSearchParams(JSON.parse(JSON.stringify({...i,...s,x:r,...l}))).toString();return(t||"https://livecodes.io")+(a?"?"+a:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let t,s;let n=e.dataset.options;if(n)try{t=JSON.parse(n)}catch{}let r=e.dataset.config||e.dataset.prefill;if(r)try{s=JSON.parse(r)}catch{}let i=encodeURIComponent(e.outerHTML);e.innerHTML="",o(e,{import:"dom/"+i,...t,...s?{config:s}:{}})})})},65:function(e,t,s){s.d(t,{Z:function(){return l},a:function(){return i}});var n=s(7294);let o={},r=n.createContext(o);function i(e){let t=n.useContext(r);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);