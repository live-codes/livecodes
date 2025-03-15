"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7516"],{7635:function(e,s,t){t.r(s),t.d(s,{default:()=>g,frontMatter:()=>c,metadata:()=>n,assets:()=>u,params:()=>h,toc:()=>m,contentTitle:()=>d});var n=JSON.parse('{"id":"languages/cssmodules","title":"CSS Modules","description":"A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.","source":"@site/docs/languages/cssmodules.mdx","sourceDirName":"languages","slug":"/languages/cssmodules","permalink":"/livecodes/docs/languages/cssmodules","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/cssmodules.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"CSS","permalink":"/livecodes/docs/languages/css"},"next":{"title":"cssnano","permalink":"/livecodes/docs/languages/cssnano"}}'),l=t("5893"),o=t("65"),i=t("8168"),r=t("7645"),a=t("3365");let c={},d="CSS Modules",u={},h={activeEditor:"style",html:'<div class="page">\n <h1>Page Title</h1>\n <p class="small-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur similique facere facilis minima tempora.</p>\n</div>\n',css:":global .page {\n padding: 20px;\n}\n\n.text {\n color: black;\n font-family: sans-serif;\n}\n\n.small-text {\n composes: text;\n font-size: 20px;\n}\n\n.large-text {\n composes: text;\n font-size: 40px;\n}\n\n.large-text:hover {\n color: red;\n}\n\n.title {\n composes: large-text;\n color: green;\n}\n",js:"import classes from './style.module.css';\n\ndocument.querySelector('h1').className = classes.title;\nconsole.log(classes);\n",processors:"cssmodules",compiled:"open"},m=[{value:"Usage",id:"usage",level:2},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Type",id:"type",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Custom Settings",id:"custom-settings",level:2},{value:"Limitations",id:"limitations",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Links",id:"links",level:2}];function p(e){let s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.header,{children:(0,l.jsx)(s.h1,{id:"css-modules",children:"CSS Modules"})}),"\n",(0,l.jsxs)(s.p,{children:["A ",(0,l.jsx)(s.a,{href:"https://github.com/css-modules/css-modules",children:"CSS Module"})," is a CSS file in which all class names and animation names are scoped locally by default."]}),"\n",(0,l.jsx)(s.p,{children:"The selector names are unique to avoid naming collision. They can then be imported as a JavaScript object."}),"\n",(0,l.jsx)(s.h2,{id:"usage",children:"Usage"}),"\n",(0,l.jsx)(s.p,{children:"CSS Modules can be enabled from the style editor menu."}),"\n",(0,l.jsx)(s.p,{children:"Selectors added to the style editor (using any language e.g. CSS, SCSS, Less, etc.) are transformed to unique selectors. The transformed classes are then accessible in the script editor as a JSON object, and are injected into the HTML elements."}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"Example:"})}),"\n","\n",(0,l.jsxs)(i.Z,{children:[(0,l.jsx)(r.Z,{value:"src-css",label:"Source CSS",default:!0,children:(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-css",children:":global .page {\n  padding: 20px;\n}\n\n.text {\n  color: black;\n  font-family: sans-serif;\n}\n\n.small-text {\n  composes: text;\n  font-size: 20px;\n}\n\n.large-text {\n  composes: text;\n  font-size: 40px;\n}\n\n.large-text:hover {\n  color: red;\n}\n\n.title {\n  composes: large-text;\n  color: green;\n}\n"})})}),(0,l.jsx)(r.Z,{value:"compiled-css",label:"Compiled CSS",children:(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-css",children:".page {\n  padding: 20px;\n}\n\n._text_1ygro_9 {\n  color: black;\n  font-family: sans-serif;\n}\n\n._small-text_1ygro_19 {\n  font-size: 20px;\n}\n\n._large-text_1ygro_29 {\n  font-size: 40px;\n}\n\n._large-text_1ygro_29:hover {\n  color: red;\n}\n\n._title_1ygro_47 {\n  color: green;\n}\n"})})}),(0,l.jsx)(r.Z,{value:"json",label:"JSON Object",children:(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-json",children:'{\n  "text": "_text_1ygro_9",\n  "small-text": "_small-text_1ygro_19 _text_1ygro_9",\n  "large-text": "_large-text_1ygro_29 _text_1ygro_9",\n  "title": "_title_1ygro_47 _large-text_1ygro_29 _text_1ygro_9",\n  "smallText": "_small-text_1ygro_19 _text_1ygro_9",\n  "largeText": "_large-text_1ygro_29 _text_1ygro_9"\n}\n'})})}),(0,l.jsx)(r.Z,{value:"src-html",label:"Source HTML",children:(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-html",children:'<div class="page">\n  <h1>Page Title</h1>\n  <p class="small-text">\n    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non\n    beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur\n    similique facere facilis minima tempora.\n  </p>\n</div>\n'})})}),(0,l.jsx)(r.Z,{value:"compiled-html",label:"Compiled HTML",children:(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-html",children:'<div class="page">\n  <h1>Page Title</h1>\n  <p class="small-text _small-text_1ygro_19 _text_1ygro_9">\n    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore earum blanditiis quidem non\n    beatae ipsam autem maiores ut et delectus unde repudiandae, repellendus aut. Aspernatur\n    similique facere facilis minima tempora.\n  </p>\n</div>\n'})})})]}),"\n",(0,l.jsxs)(s.p,{children:["In the script editor, the JSON object representing the transformed classes can be imported from the relative URLs ",(0,l.jsx)(s.code,{children:"'./style.module.css'"})," or ",(0,l.jsx)(s.code,{children:"'./styles.module.css'"}),"."]}),"\n",(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#default_import",children:"Default"}),", ",(0,l.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#named_import",children:"named"})," and ",(0,l.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import",children:"namespace"})," imports are supported. Class names are also available in camelCase (e.g ",(0,l.jsx)(s.code,{children:".large-text"})," becomes ",(0,l.jsx)(s.code,{children:"largeText"}),"). This can be changed by setting ",(0,l.jsx)(s.a,{href:"https://github.com/madyankin/postcss-modules#localsconvention",children:(0,l.jsx)(s.code,{children:"localsConvention"})})," in ",(0,l.jsx)(s.a,{href:"#custom-settings",children:"custom settings"}),"."]}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"Example:"})}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-js",metastring:'title="In script editor (using JS in this case):"',children:"import classes from './style.module.css';\nimport { smallText } from './styles.module.css';\nimport * as allClasses from './styles.module.css';\n\nconsole.log(classes.title);\n\n// .small-text -> smallText\nconsole.log(smallText);\n\n// .large-text -> largeText\nconsole.log(allClasses.largeText);\n\n// bracket notation for class with dash\nconsole.log(allClasses['large-text']);\n"})}),"\n",(0,l.jsxs)(s.p,{children:["For full example, see ",(0,l.jsx)(s.a,{href:"#example-usage",children:"example usage"})," below."]}),"\n",(0,l.jsxs)(s.admonition,{type:"info",children:[(0,l.jsx)(s.p,{children:"CSS Modules has to be enabled (from style editor menu), to be able to import classes in the script editor."}),(0,l.jsxs)(s.p,{children:["Importing a URL that does not include ",(0,l.jsx)(s.code,{children:".module"})," (e.g. ",(0,l.jsx)(s.code,{children:"./style.css"}),") gets the processed CSS ",(0,l.jsx)(s.strong,{children:"string"})," as the module's default export."]}),(0,l.jsxs)(s.p,{children:["The extension of the style editor language can also be used, in addition to ",(0,l.jsx)(s.code,{children:".css"}),". For example, when using SCSS, importing from any of the following URLs is the same:"]}),(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.code,{children:"./style.module.css"})}),"\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.code,{children:"./styles.module.css"})}),"\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.code,{children:"./style.module.scss"})}),"\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.code,{children:"./styles.module.scss"})}),"\n"]})]}),"\n",(0,l.jsx)(s.h2,{id:"language-info",children:"Language Info"}),"\n",(0,l.jsx)(s.h3,{id:"name",children:"Name"}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.code,{children:"cssmodules"})}),"\n",(0,l.jsx)(s.h3,{id:"type",children:"Type"}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.a,{href:"/livecodes/docs/features/css#css-processors",children:"Processor"})}),"\n",(0,l.jsx)(s.h3,{id:"editor",children:"Editor"}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.code,{children:"style"})}),"\n",(0,l.jsx)(s.h2,{id:"compiler",children:"Compiler"}),"\n",(0,l.jsxs)(s.p,{children:["The CSS Modules processor is provided using ",(0,l.jsx)(s.a,{href:"https://github.com/madyankin/postcss-modules",children:"postcss-modules"})," as a ",(0,l.jsx)(s.a,{href:"/livecodes/docs/languages/postcss",children:"PostCSS"})," plugin."]}),"\n",(0,l.jsx)(s.h3,{id:"version",children:"Version"}),"\n",(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.code,{children:"postcss-modules"}),": v6.0.0"]}),"\n",(0,l.jsx)(s.h2,{id:"custom-settings",children:"Custom Settings"}),"\n",(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.a,{href:"/livecodes/docs/advanced/custom-settings",children:"Custom settings"})," added to the property ",(0,l.jsx)(s.code,{children:"cssmodules"})," are passed as a JSON object to the ",(0,l.jsx)(s.code,{children:"postcss-modules"})," plugin during compile. Please check the ",(0,l.jsx)(s.a,{href:"https://github.com/madyankin/postcss-modules#usage",children:"documentation"})," for full reference."]}),"\n",(0,l.jsx)(s.p,{children:"In addition, the following settings are available:"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.code,{children:"addClassesToHTML"})}),"\n",(0,l.jsxs)(s.p,{children:["Type: ",(0,l.jsx)(s.code,{children:"boolean"}),". Default: ",(0,l.jsx)(s.code,{children:"true"}),"."]}),"\n",(0,l.jsx)(s.p,{children:"The generated classes are injected into the HTML elements, so the styles are applied without having to assign them using JavaScript."}),"\n"]}),"\n",(0,l.jsxs)(s.li,{children:["\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.code,{children:"removeOriginalClasses"})}),"\n",(0,l.jsxs)(s.p,{children:["Type: ",(0,l.jsx)(s.code,{children:"boolean"}),". Default: ",(0,l.jsx)(s.code,{children:"false"}),"."]}),"\n",(0,l.jsxs)(s.p,{children:["When enabled, the original classes are removed from HTML, keeping only the generated classes. Only applies if ",(0,l.jsx)(s.code,{children:"addClassesToHTML"})," is enabled."]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(s.p,{children:"Please note that custom settings should be valid JSON (i.e. functions are not allowed)."}),"\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"Example:"})}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-json",children:'{\n  "cssmodules": {\n    "exportGlobals": true,\n    "localsConvention": "camelCaseOnly",\n    "addClassesToHTML": false\n  }\n}\n'})}),"\n",(0,l.jsx)(s.h2,{id:"limitations",children:"Limitations"}),"\n",(0,l.jsxs)(s.p,{children:["Currently, loading external sources in ",(0,l.jsx)(s.a,{href:"https://github.com/css-modules/css-modules#composing-from-other-files",children:(0,l.jsx)(s.code,{children:"composes"})})," is not supported."]}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-css",children:"/* you cannot do this */\n.title {\n  composes: title from 'https://example.com/styles.css';\n}\n"})}),"\n",(0,l.jsxs)(s.p,{children:["If you get this working, ",(0,l.jsx)(s.a,{href:"https://github.com/live-codes/livecodes/pulls",children:"please create a pull request"}),"."]}),"\n",(0,l.jsx)(s.h2,{id:"example-usage",children:"Example Usage"}),"\n","\n","\n",(0,l.jsx)(a.Z,{params:h,height:"400"}),"\n",(0,l.jsx)(s.h2,{id:"links",children:"Links"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.a,{href:"https://github.com/css-modules/css-modules",children:"CSS Modules"})}),"\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.a,{href:"https://github.com/madyankin/postcss-modules",children:"postcss-modules"})}),"\n",(0,l.jsx)(s.li,{children:(0,l.jsx)(s.a,{href:"https://postcss.org/",children:"PostCSS"})}),"\n"]})]})}function g(e={}){let{wrapper:s}={...(0,o.a)(),...e.components};return s?(0,l.jsx)(s,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}},3365:function(e,s,t){t.d(s,{Z:()=>x});var n=t("5893"),l=t("4200"),o=t("7294"),i=t("8294");function r(e){let s=(0,o.useRef)(null),[t,l]=(0,o.useState)(e.className||""),[r,a]=(0,o.useState)(e.style||{}),[c,d]=(0,o.useState)(e.height),[u,h]=(0,o.useState)(),[m,p]=(0,o.useState)(JSON.stringify(e.config||"")),[g,x]=(0,o.useState)("");return(0,o.useEffect)(()=>{if(!s.current)return;let{className:t,style:n,height:o,sdkReady:r,config:c,...f}=e;if(l(t||""),a(n||{}),d(o),u&&g===JSON.stringify(f)){if(m===JSON.stringify(c))return;p(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{u?.setConfig(e)}):c&&u.setConfig(c)}else x(JSON.stringify(f)),u?.destroy(),(0,i.T)(s.current,{config:c,...f}).then(e=>{h(e),"function"==typeof r&&r(e)})},[e]),(0,o.useEffect)(()=>()=>{u?.destroy()},[]),(0,n.jsx)("div",{ref:s,className:t,style:r,"data-height":c})}var a=t("1858"),c=t("3262"),d=t("1705"),u=t("8168"),h=t("7645"),m=t("5050"),p=t("8228");function g(e){let[s,t]=(0,o.useState)(e.js),[l,i]=(0,o.useState)(e.ts),[r,a]=(0,o.useState)(e.react),[g,x]=(0,o.useState)(e.vue),[f,j]=(0,o.useState)(e.svelte),y="3.7rem",[v,b]=(0,o.useState)(!0),[S,w]=(0,o.useState)(y),C=(0,o.useRef)(null),_=()=>{setTimeout(()=>{w(`calc(${C.current.offsetHeight}px + ${y})`)},5),setTimeout(()=>{w(`calc(${C.current.offsetHeight}px + ${y})`)},255)};return(0,o.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===s?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};t(e(s,"js")),i(e(l,"ts")),a(e(r,"jsx")),x(e(g,"html")),j(e(f,"html"))}},[]),(0,n.jsxs)("details",{className:`alert alert--info ${m.Z.details} ${p.Z.details}`,"data-collapsed":v,style:{height:v?y:S,overflow:"hidden",willChange:"height",transition:`height ${v?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,n.jsx)("summary",{onClick:()=>{b(!v),_()},children:"show code"}),(0,n.jsx)("div",{ref:C,style:{display:"block",overflow:"hidden"},children:(0,n.jsx)("div",{className:m.Z.collapsibleContent,children:(0,n.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,n.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:_},children:(0,n.jsx)(d.Z,{language:"js",children:s})}),(0,n.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:_},children:(0,n.jsx)(d.Z,{language:"ts",children:l})}),(0,n.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:_},children:(0,n.jsx)(d.Z,{language:"jsx",children:r})}),(0,n.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:_},children:(0,n.jsx)(d.Z,{language:"html",children:g})}),(0,n.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:_},children:(0,n.jsx)(d.Z,{language:"html",children:f})})]})})})]})}function x(e){let{className:s,style:t,showCode:o,height:i,...c}=e,{colorMode:d}=(0,l.I)(),u=e=>JSON.stringify(e,null,2),h=`
import { createPlayground } from 'livecodes';

const options = ${u(c)};
createPlayground('#container', options);

`.trimStart(),m=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${u(c)};
createPlayground('#container', options);

`.trimStart(),p=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${u(c)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),x=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${u(c)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,f=`
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

`.trimStart();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r,{className:`container_Egsj ${e.className}`,style:{height:i||"50vh",...e.style},appUrl:a.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,n.jsx)(g,{js:h,ts:m,react:p,vue:x,svelte:f})]})}},8294:function(e,s,t){t.d(s,{T:function(){return l},r:function(){return o}});var n=t(7728);async function l(e){let s,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);let{appUrl:n="https://livecodes.io/",params:l={},config:o={},import:i,headless:r,lite:a,loading:c="lazy",template:d,view:u}=t,h=r||"headless"===u,m=null;if("string"==typeof e)m=document.querySelector(e);else if(e instanceof HTMLElement)m=e;else if(!(h&&"object"==typeof e))throw Error("A valid container element is required.");if(!m){if(h)T(m=document.createElement("div")),document.body.appendChild(m);else throw Error(`Cannot find element: "${e}"`)}try{s=new URL(n)}catch{throw Error(`"${n}" is not a valid URL.`)}let p=s.origin;if("object"==typeof l&&Object.keys(l).forEach(e=>{s.searchParams.set(e,String(l[e]))}),d&&s.searchParams.set("template",d),i&&s.searchParams.set("x",i),h&&s.searchParams.set("headless","true"),a&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof o&&null==o.mode?o.mode="lite":s.searchParams.set("lite","true")),u&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof o&&null==o.view&&"headless"!==u?o.view=u:s.searchParams.set("view",u)),"string"==typeof o)try{new URL(o),s.searchParams.set("config",o)}catch{throw Error('"config" is not a valid URL or configuration object.')}else if("object"==typeof o)Object.keys(o).length>0&&s.searchParams.set("config","sdk");else throw Error('"config" is not a valid URL or configuration object.');s.searchParams.set("embed","true"),s.searchParams.set("loading",h?"eager":c);let g=!1,x="Cannot call API methods after calling `destroy()`.",f=await new Promise(e=>{if(!m)return;let t=m.dataset.height||m.style.height;if(t&&!h){let e=isNaN(Number(t))?t:t+"px";m.style.height=e}"false"===m.dataset.defaultStyles||h||(m.style.backgroundColor||="#fff",m.style.border||="1px solid black",m.style.borderRadius||="8px",m.style.boxSizing||="border-box",m.style.padding||="0",m.style.width||="100%",m.style.height||=m.style.height||"300px",m.style.minHeight="200px",m.style.flexGrow="1",m.style.overflow||="hidden",m.style.resize||="vertical");let n="livecodes",l=m.querySelector(`iframe.${n}`),i=l||document.createElement("iframe");i.classList.add(n),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),i.setAttribute("loading","eager"===c?"eager":"lazy"),h?T(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=m.style.borderRadius),addEventListener("message",function e(s){s.source===i.contentWindow&&s.origin===p&&s.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:o},p))}),i.onload=()=>{e(i)},i.src=s.href,l||m.appendChild(i)}),j=new Promise(e=>{addEventListener("message",function s(t){t.source===f.contentWindow&&t.origin===p&&t.data?.type==="livecodes-ready"&&(removeEventListener("message",s),e(),j.settled=!0)})}),y=()=>g?Promise.reject(x):new Promise(async e=>{j.settled&&e(),f.contentWindow?.postMessage({type:"livecodes-load"},p),await j,e()}),v=(e,s)=>new Promise(async(t,n)=>{if(g)return n(x);await y();let l=L();addEventListener("message",function s(o){if(o.source===f.contentWindow&&o.origin===p&&o.data?.type==="livecodes-api-response"&&o.data?.id===l&&o.data.method===e){removeEventListener("message",s);let e=o.data.payload;e?.error?n(e.error):t(e)}}),f.contentWindow?.postMessage({method:e,id:l,args:s},p)}),b={},S=["load","ready","code","console","tests","destroy"],w=(e,s)=>{if(g)throw Error(x);return S.includes(e)?(v("watch",[e]),b[e]||(b[e]=[]),b[e]?.push(s),{remove:()=>{b[e]=b[e]?.filter(e=>e!==s),b[e]?.length===0&&v("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},C=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];addEventListener("message",async e=>{let s=C(e.data?.type??"");if(e.source!==f.contentWindow||e.origin!==p||!s||!b[s])return;let t=e.data?.payload;b[s]?.forEach(e=>{e(t)})});let _=()=>{Object.values(b).forEach(e=>{e.length=0}),f?.remove?.(),g=!0};function T(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===c&&"IntersectionObserver"in window&&new IntersectionObserver((e,s)=>{e.forEach(async e=>{e.isIntersecting&&(await y(),s.unobserve(m))})},{rootMargin:"150px"}).observe(m);let L=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>y(),run:()=>v("run"),format:e=>v("format",[e]),getShareUrl:e=>v("getShareUrl",[e]),getConfig:e=>v("getConfig",[e]),setConfig:e=>v("setConfig",[e]),getCode:()=>v("getCode"),show:(e,s)=>v("show",[e,s]),runTests:()=>v("runTests"),onChange:e=>w("code",e),watch:w,exec:function(e){for(var s=arguments.length,t=Array(s>1?s-1:0),n=1;n<s;n++)t[n-1]=arguments[n];return v("exec",[e,...t])},destroy:()=>j.settled?v("destroy").then(_):g?Promise.reject(x):(_(),Promise.resolve())}}function o(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:s,params:t,config:l,import:o,...i}=e,r="string"==typeof l?{config:l}:"object"==typeof l?{x:"code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(l))}:{},a=new URLSearchParams(JSON.parse(JSON.stringify({...i,...t,x:o,...r}))).toString();return(s||"https://livecodes.io")+(a?"?"+a:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(e=>{let s,t;let n=e.dataset.options;if(n)try{s=JSON.parse(n)}catch{}let o=e.dataset.config||e.dataset.prefill;if(o)try{t=JSON.parse(o)}catch{}let i=encodeURIComponent(e.outerHTML);e.innerHTML="",l(e,{import:"dom/"+i,...s,...t?{config:t}:{}})})})},65:function(e,s,t){t.d(s,{Z:function(){return r},a:function(){return i}});var n=t(7294);let l={},o=n.createContext(l);function i(e){let s=n.useContext(o);return n.useMemo(function(){return"function"==typeof e?e(s):{...s,...e}},[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);