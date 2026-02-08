"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["6834"],{70906:function(e,t,s){s.r(t),s.d(t,{default:()=>p,frontMatter:()=>a,csharpConfig:()=>d,assets:()=>c,metadata:()=>n,toc:()=>h,contentTitle:()=>l});var n=JSON.parse('{"id":"languages/csharp-wasm","title":"C# (Wasm)","description":"(Wasm)","source":"@site/docs/languages/csharp-wasm.mdx","sourceDirName":"languages","slug":"/languages/csharp-wasm","permalink":"/livecodes/docs/languages/csharp-wasm","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages/csharp-wasm.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"C++","permalink":"/livecodes/docs/languages/cpp"},"next":{"title":"CSS","permalink":"/livecodes/docs/languages/css"}}'),i=s("85893"),r=s("50065"),o=s("13365");let a={},l="C# (Wasm)",c={},d={activeEditor:"script",script:{language:"csharp-wasm",content:`using System;

public class Program
{
    public static void Main()
    {
        int[] sortedArray = { 1, 3, 5, 7, 9, 11, 13, 15 };
        int itemToSearch = 7;

        int result = BinarySearch(sortedArray, 0, sortedArray.Length - 1, itemToSearch);

        if (result == -1)
        {
            Console.WriteLine("Result: Item not found in the array.");
        }
        else
        {
            Console.WriteLine($"Result: Item found at index -> {result}");
        }
    }

    public static int BinarySearch(int[] arr, int left, int right, int item)
    {
        if (right >= left)
        {
            int mid = left + (right - left) / 2;
            if (arr[mid] == item)
            {
                return mid;
            }

            if (arr[mid] > item)
            {
                return BinarySearch(arr, left, mid - 1, item);
            }

            return BinarySearch(arr, mid + 1, right, item);
        }
        return -1;
    }
}`},mode:"simple",editor:"auto",tools:{status:"full"}},h=[{value:"Usage",id:"usage",level:2},{value:"Communication with JavaScript",id:"communication-with-javascript",level:3},{value:"Language Info",id:"language-info",level:2},{value:"Name",id:"name",level:3},{value:"Aliases / Extensions",id:"aliases--extensions",level:3},{value:"Editor",id:"editor",level:3},{value:"Compiler",id:"compiler",level:2},{value:"Version",id:"version",level:3},{value:"Code Formatting",id:"code-formatting",level:2},{value:"Live Reload",id:"live-reload",level:2},{value:"Example Usage",id:"example-usage",level:2},{value:"Starter Template",id:"starter-template",level:2},{value:"Links",id:"links",level:2}];function u(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"c-wasm",children:"C# (Wasm)"})}),"\n",(0,i.jsx)(t.p,{children:"C# is a high-level, general-purpose, object-oriented programming language developed by Microsoft."}),"\n",(0,i.jsx)(t.p,{children:"In LiveCodes, C# runs in the browser using Blazor WebAssembly with a WebAssembly-based .NET runtime."}),"\n",(0,i.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(t.p,{children:"Demo:"}),"\n","\n",(0,i.jsx)(o.Z,{config:d}),"\n",(0,i.jsx)(t.h3,{id:"communication-with-javascript",children:"Communication with JavaScript"}),"\n",(0,i.jsxs)(t.p,{children:["The C# code runs in the context of the result page. A few helper properties and methods are available in the browser global ",(0,i.jsx)(t.code,{children:"livecodes.csharp"})," object:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"livecodes.csharp.input"}),": The initial standard input passed to the C# code."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"livecodes.csharp.loaded"}),": A promise that resolves when the C# environment (Blazor WebAssembly) is fully loaded. Other helpers should be used after this promise resolves."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"livecodes.csharp.output"}),": The standard output from the C# code execution."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"livecodes.csharp.run"}),": A function that runs the C# code with new input. This function takes a string as input and returns a promise that resolves with an object containing the ",(0,i.jsx)(t.code,{children:"output"}),", ",(0,i.jsx)(t.code,{children:"error"}),", and ",(0,i.jsx)(t.code,{children:"exitCode"})," properties."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Example:"}),"\n",(0,i.jsx)(o.Z,{template:"csharp-wasm",params:{activeEditor:"markup"},height:"80vh"}),"\n",(0,i.jsx)(t.h2,{id:"language-info",children:"Language Info"}),"\n",(0,i.jsx)(t.h3,{id:"name",children:"Name"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:"csharp-wasm"})}),"\n",(0,i.jsx)(t.h3,{id:"aliases--extensions",children:"Aliases / Extensions"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"cs"}),", ",(0,i.jsx)(t.code,{children:"csharp"}),", ",(0,i.jsx)(t.code,{children:"wasm.cs"}),", ",(0,i.jsx)(t.code,{children:"cs-wasm"})]}),"\n",(0,i.jsx)(t.h3,{id:"editor",children:"Editor"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.code,{children:"script"})}),"\n",(0,i.jsx)(t.h2,{id:"compiler",children:"Compiler"}),"\n",(0,i.jsx)(t.p,{children:"Blazor WebAssembly with .NET WebAssembly runtime."}),"\n",(0,i.jsx)(t.h3,{id:"version",children:"Version"}),"\n",(0,i.jsx)(t.p,{children:".NET 9.0"}),"\n",(0,i.jsx)(t.h2,{id:"code-formatting",children:"Code Formatting"}),"\n",(0,i.jsxs)(t.p,{children:["using ",(0,i.jsx)(t.a,{href:"https://prettier.io/",children:"Prettier"})]}),"\n",(0,i.jsx)(t.h2,{id:"live-reload",children:"Live Reload"}),"\n",(0,i.jsxs)(t.p,{children:["By default, new code changes are sent to the result page for re-evaluation without a full page reload, avoiding the need to reinitialize the Blazor environment. This behavior can be disabled by adding the code comment ",(0,i.jsx)(t.code,{children:"// __livecodes_reload__"})," to the C# code, which forces a full page reload."]}),"\n",(0,i.jsxs)(t.p,{children:["This comment can be added in the ",(0,i.jsx)(t.code,{children:"hiddenContent"})," property of the editor for embedded playgrounds."]}),"\n",(0,i.jsx)(t.h2,{id:"example-usage",children:"Example Usage"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-csharp",children:'using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        Console.WriteLine("Hello, LiveCodes C#!");\n    }\n}\n'})}),"\n",(0,i.jsx)(t.h2,{id:"starter-template",children:"Starter Template"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:"https://livecodes.io/?template=csharp-wasm",children:"https://livecodes.io/?template=csharp-wasm"})}),"\n",(0,i.jsx)(t.h2,{id:"links",children:"Links"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://learn.microsoft.com/en-us/dotnet/csharp/",children:"C#"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor",children:"Blazor WebAssembly"})}),"\n"]})]})}function p(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},13365:function(e,t,s){s.d(t,{Z:()=>f});var n=s("85893"),i=s("79207"),r=s("67294"),o=s("38294");function a(e){let t=(0,r.useRef)(null),[s,i]=(0,r.useState)(e.className||""),[a,l]=(0,r.useState)(e.style||{}),[c,d]=(0,r.useState)(e.height),[h,u]=(0,r.useState)(),[p,m]=(0,r.useState)(JSON.stringify(e.config||"")),[g,f]=(0,r.useState)("");return(0,r.useEffect)(()=>{if(!t.current)return;let{className:s,style:n,height:r,sdkReady:a,config:c,...v}=e;if(i(s||""),l(n||{}),d(r),h&&g===JSON.stringify(v)){if(p===JSON.stringify(c))return;m(JSON.stringify(c)),"string"==typeof c?fetch(c).then(e=>e.json()).then(e=>{h?.setConfig(e)}):c&&h.setConfig(c)}else f(JSON.stringify(v)),h?.destroy(),(0,o.T)(t.current,{config:c,...v}).then(e=>{u(e),"function"==typeof a&&a(e)})},[e]),(0,r.useEffect)(()=>()=>{h?.destroy()},[]),(0,n.jsx)("div",{ref:t,className:s,style:a,"data-height":c})}var l=s("21858"),c=s("33262"),d=s("31705"),h=s("97645"),u=s("58168"),p=s("98228"),m=s("45050");function g(e){let[t,s]=(0,r.useState)(e.js),[i,o]=(0,r.useState)(e.ts),[a,l]=(0,r.useState)(e.react),[g,f]=(0,r.useState)(e.vue),[v,y]=(0,r.useState)(e.svelte),[x,j]=(0,r.useState)(e.solid),b="3.7rem",[w,C]=(0,r.useState)(!0),[S,E]=(0,r.useState)(b),P=(0,r.useRef)(null),L=()=>{setTimeout(()=>{E(`calc(${P.current.offsetHeight}px + ${b})`)},5),setTimeout(()=>{E(`calc(${P.current.offsetHeight}px + ${b})`)},255)};return(0,r.useEffect)(()=>{if(c.Z.canUseDOM){let e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"js";try{return window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})}catch{return e}};s(e(t,"js")),o(e(i,"ts")),l(e(a,"jsx")),f(e(g,"html")),y(e(v,"html")),j(e(x,"tsx"))}},[]),(0,n.jsxs)("details",{className:`alert alert--info ${m.Z.details} ${p.Z.details}`,"data-collapsed":w,style:{height:w?b:S,overflow:"hidden",willChange:"height",transition:`height ${w?"250ms":"265ms"} ease-in-out 0s`,margin:"1em 0"},children:[(0,n.jsx)("summary",{onClick:()=>{C(!w),L()},children:"show code"}),(0,n.jsx)("div",{ref:P,style:{display:"block",overflow:"hidden"},children:(0,n.jsx)("div",{className:m.Z.collapsibleContent,children:(0,n.jsxs)(u.Z,{groupId:"sdk-code",children:[(0,n.jsx)(h.Z,{value:"js",label:"JS",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"js",children:t})}),(0,n.jsx)(h.Z,{value:"ts",label:"TS",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"ts",children:i})}),(0,n.jsx)(h.Z,{value:"react",label:"React",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"jsx",children:a})}),(0,n.jsx)(h.Z,{value:"vue",label:"Vue",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"html",children:g})}),(0,n.jsx)(h.Z,{value:"svelte",label:"Svelte",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"html",children:v})}),(0,n.jsx)(h.Z,{value:"solid",label:"Solid",attributes:{onMouseDown:L},children:(0,n.jsx)(d.Z,{language:"tsx",children:x})})]})})})]})}function f(e){let{className:t,style:s,showCode:r,height:o,...c}=e,{colorMode:d}=(0,i.I)(),h=e=>JSON.stringify(e,null,2),u=`
import { createPlayground } from 'livecodes';

const options = ${h(c)};
createPlayground('#container', options);

`.trimStart(),p=`
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${h(c)};
createPlayground('#container', options);

`.trimStart(),m=`
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${h(c)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart(),f=`
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${h(c)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`,v=`
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

let options = $state(${h(c)});
let container = $state(null);
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

`.trimStart(),y=`
import { createPlayground, type EmbedOptions } from 'livecodes';

export default function App() {
  const options: EmbedOptions = ${h(c)};
  const onMounted = (container: HTMLElement) => {
    createPlayground(container, options);
  };

  return <div ref={onMounted}></div>;
}

`.trimStart();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{className:`container_Egsj ${e.className}`,style:{height:o||"50vh",...e.style},appUrl:l.G,...e,config:{theme:d,themeColor:"hsl(215, 8%, 60%)",..."object"==typeof e.config?e.config:{}}}),!1!==e.showCode&&(0,n.jsx)(g,{js:u,ts:p,react:m,vue:f,svelte:v,solid:y})]})}},38294:function(e,t,s){s.d(t,{T:function(){return i},r:function(){return r}});var n=s(17728);async function i(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"object"!=typeof e||e instanceof HTMLElement||!e.headless&&"headless"!==e.view||(s=e,e=null);let{config:n={},headless:i,loading:o="lazy",view:a}=s,l=i||"headless"===a,c=null,d=null;if("string"==typeof e)c=document.querySelector(e);else if(e instanceof HTMLElement)c=e;else if(!(l&&"object"==typeof e))throw Error("A valid container element is required.");if(!c){if(l)L(c=document.createElement("div")),document.body.appendChild(c);else throw Error(`Cannot find element: "${e}"`)}let h=new URL(r(s)),u=h.origin;h.searchParams.set("embed","true"),h.searchParams.set("loading",l?"eager":o),h.searchParams.set("sdkVersion",process.env.SDK_VERSION||"latest"),"object"==typeof n&&Object.keys(n).length>0&&h.searchParams.set("config","sdk");let p=s.params;"object"==typeof p&&Object.keys(p).length>0&&JSON.stringify(p).length<1800&&Object.keys(p).forEach(e=>{h.searchParams.set(e,encodeURIComponent(String(p[e])))});let m=!1,g="Cannot call API methods after calling `destroy()`.",f=[],v=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"message";addEventListener(t,e),f.push(e)},y=await new Promise(e=>{if(!c)return;let t=c.dataset.height||c.style.height;if(t&&!l){let e=isNaN(Number(t))?t:t+"px";c.style.height=e}"false"===c.dataset.defaultStyles||l||(c.style.backgroundColor||="#fff",c.style.border||="1px solid black",c.style.borderRadius||="8px",c.style.boxSizing||="border-box",c.style.padding||="0",c.style.width||="100%",c.style.height||=c.style.height||"300px",c.style.minHeight="200px",c.style.flexGrow="1",c.style.overflow||="hidden",c.style.resize||="vertical");let s="livecodes",i=c.querySelector(`iframe.${s}`),r=i||document.createElement("iframe");r.classList.add(s),r.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),r.setAttribute("allowtransparency","true"),r.setAttribute("allowpaymentrequest","true"),r.setAttribute("allowfullscreen","true"),r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),r.setAttribute("loading","eager"===o?"eager":"lazy"),l?L(r):(r.style.height="100%",r.style.minHeight="200px",r.style.width="100%",r.style.margin="0",r.style.border="0",r.style.borderRadius=c.style.borderRadius),v(function e(t){t.source===r.contentWindow&&t.origin===u&&t.data?.type==="livecodes-init"&&(removeEventListener("message",e),d=Number(t.data.payload.appVersion.replace(/^v/,"")))}),(!d||d<46)&&v(function e(t){t.source===r.contentWindow&&t.origin===u&&t.data?.type==="livecodes-get-config"&&(removeEventListener("message",e),r.contentWindow?.postMessage({type:"livecodes-config",payload:n},u))}),r.onload=()=>{e(r)},r.src=h.href,i||c.appendChild(r)}),x=new Promise(e=>{v(function t(s){s.source===y.contentWindow&&s.origin===u&&s.data?.type==="livecodes-ready"&&(removeEventListener("message",t),e(),x.settled=!0)})}),j=()=>m?Promise.reject(g):new Promise(async e=>{x.settled&&e(),y.contentWindow?.postMessage({type:"livecodes-load"},u),await x,e()}),b=(e,t)=>new Promise(async(s,n)=>{if(m)return n(g);await j();let i=k();v(function t(r){if(r.source===y.contentWindow&&r.origin===u&&r.data?.type==="livecodes-api-response"&&r.data?.id===i&&r.data.method===e){removeEventListener("message",t);let e=r.data.payload;e?.error?n(e.error):s(e)}}),y.contentWindow?.postMessage({method:e,id:i,args:t},u)}),w={},C=["load","ready","code","console","tests","destroy"],S=(e,t)=>{if(m)throw Error(g);return C.includes(e)?(b("watch",[e]),w[e]||(w[e]=[]),w[e]?.push(t),{remove:()=>{w[e]=w[e]?.filter(e=>e!==t),w[e]?.length===0&&b("watch",[e,"unsubscribe"])}}):{remove:()=>void 0}},E=e=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[e];v(async function(e){let t=E(e.data?.type??"");if(e.source!==y.contentWindow||e.origin!==u||!t||!w[t])return;let s=e.data?.payload;w[t]?.forEach(e=>{e(s)})});let P=()=>{y?.remove?.(),Object.values(w).forEach(e=>{e.length=0}),f.forEach(e=>removeEventListener("message",e)),f.length=0,t&&c&&t.unobserve(c),m=!0};function L(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}"lazy"===o&&"IntersectionObserver"in window&&(t=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await j(),t.unobserve(c))})},{rootMargin:"150px"})).observe(c);let k=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>j(),run:()=>b("run"),format:e=>b("format",[e]),getShareUrl:e=>b("getShareUrl",[e]),getConfig:e=>b("getConfig",[e]),setConfig:e=>b("setConfig",[e]),getCode:()=>b("getCode"),show:(e,t)=>b("show",[e,t]),runTests:()=>b("runTests"),onChange:e=>S("code",e),watch:S,exec:function(e){for(var t=arguments.length,s=Array(t>1?t-1:0),n=1;n<t;n++)s[n-1]=arguments[n];return b("exec",[e,...s])},destroy:()=>m?Promise.reject(g):(P(),Promise.resolve())}}function r(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{appUrl:s="https://livecodes.io",params:i={},config:r={},headless:o,import:a,lite:l,view:c,...d}=t;try{e=new URL(s)}catch{throw Error(`${s} is not a valid URL.`)}let h=new URLSearchParams;Object.entries(d).forEach(t=>{let[s,n]=t;void 0!==n&&e.searchParams.set(s,String(n))});let u="headless"===t.view||o;if(l&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":e.searchParams.set("lite","true")),c&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==c?r.view=c:e.searchParams.set("view",c)),"string"==typeof r)try{new URL(r),e.searchParams.set("config",encodeURIComponent(r))}catch{throw Error('"config" is not a valid URL or configuration object.')}else r&&"object"==typeof r&&Object.keys(r).length>0&&(r.title&&"Untitled Project"!==r.title&&e.searchParams.set("title",r.title),r.description&&r.description.length>0&&e.searchParams.set("description",r.description),h.set("config","code/"+(0,n.compressToEncodedURIComponent)(JSON.stringify(r))));if(i&&"object"==typeof i&&Object.keys(i).length>0)try{h.set("params",(0,n.compressToEncodedURIComponent)(JSON.stringify(i)))}catch{Object.keys(i).forEach(t=>{e.searchParams.set(t,encodeURIComponent(String(i[t])))})}return a&&e.searchParams.set("x",encodeURIComponent(a)),u&&e.searchParams.set("headless","true"),h.toString().length>0&&(e.hash=h.toString()),e.href}},50065:function(e,t,s){s.d(t,{Z:function(){return a},a:function(){return o}});var n=s(67294);let i={},r=n.createContext(i);function o(e){let t=n.useContext(r);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);