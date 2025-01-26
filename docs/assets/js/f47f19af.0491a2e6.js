"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6120],{4887:(e,t,o)=>{o.d(t,{Z:()=>l});var i=o(7294),a=o(1262),s=o(814),n=o(9493),r=o(1446);function l(e){const{params:t,config:o,code:l,language:d="js",codeTitle:c="",showLineNumbers:p=!1,formatCode:m=!0,linkText:u="Run in LiveCodes",style:g={},className:f=""}=e,h=(0,n.r)({appUrl:r.G,params:t,config:o});return i.createElement("div",{style:{marginBottom:"30px",...g},className:f},l&&i.createElement(a.Z,null,(()=>{return i.createElement(s.Z,{language:d,title:c,showLineNumbers:p},m?(e=l,void 0===(t=d)&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})):l);var e,t})),i.createElement("a",{href:h,target:"_blank",rel:"noreferrer"},u,i.createElement("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"}},i.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))))}},9493:(e,t,o)=>{o.d(t,{T:()=>a,r:()=>s});var i=o(7728);async function a(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:o="https://livecodes.io/",params:i={},config:a={},import:s,headless:n,lite:r,loading:l="lazy",template:d,view:c}=t,p=n||"headless"===c;let m,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!p||"object"!=typeof e)throw new Error("A valid container element is required.");if(!u){if(!p)throw new Error(`Cannot find element: "${e}"`);u=document.createElement("div"),S(u),document.body.appendChild(u)}try{m=new URL(o)}catch{throw new Error(`"${o}" is not a valid URL.`)}const g=m.origin;if("object"==typeof i&&Object.keys(i).forEach((e=>{m.searchParams.set(e,String(i[e]))})),d&&m.searchParams.set("template",d),s&&m.searchParams.set("x",s),p&&m.searchParams.set("headless","true"),r&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof a&&null==a.mode?a.mode="lite":m.searchParams.set("lite","true")),c&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof a&&null==a.view&&"headless"!==c?a.view=c:m.searchParams.set("view",c)),"string"==typeof a)try{new URL(a),m.searchParams.set("config",a)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof a)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(a).length>0&&m.searchParams.set("config","sdk")}m.searchParams.set("embed","true"),m.searchParams.set("loading",p?"eager":l);let f=!1;const h="Cannot call API methods after calling `destroy()`.",v=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t&&!p){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"===u.dataset.defaultStyles||p||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="8px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");const o="livecodes",i=u.querySelector(`iframe.${o}`),s=i||document.createElement("iframe");s.classList.add(o),s.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),s.setAttribute("allowtransparency","true"),s.setAttribute("allowpaymentrequest","true"),s.setAttribute("allowfullscreen","true"),s.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const n="eager"===l?"eager":"lazy";s.setAttribute("loading",n),p?S(s):(s.style.height="100%",s.style.minHeight="200px",s.style.width="100%",s.style.margin="0",s.style.border="0",s.style.borderRadius=u.style.borderRadius),addEventListener("message",(function e(t){t.source===s.contentWindow&&t.origin===g&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),s.contentWindow?.postMessage({type:"livecodes-config",payload:a},g))})),s.onload=()=>{e(s)},s.src=m.href,i||u.appendChild(s)})),k=new Promise((e=>{addEventListener("message",(function t(o){o.source===v.contentWindow&&o.origin===g&&"livecodes-ready"===o.data?.type&&(removeEventListener("message",t),e(),k.settled=!0)}))})),b=()=>f?Promise.reject(h):new Promise((async e=>{k.settled&&e();v.contentWindow?.postMessage({type:"livecodes-load"},g),await k,e()})),w=(e,t)=>new Promise((async(o,i)=>{if(f)return i(h);await b();const a=j();addEventListener("message",(function t(s){if(s.source===v.contentWindow&&s.origin===g&&"livecodes-api-response"===s.data?.type&&s.data?.id===a&&s.data.method===e){removeEventListener("message",t);const e=s.data.payload;e?.error?i(e.error):o(e)}})),v.contentWindow?.postMessage({method:e,id:a,args:t},g)})),y={},N=["load","ready","code","console","tests","destroy"],E=(e,t)=>{if(f)throw new Error(h);return N.includes(e)?(w("watch",[e]),y[e]||(y[e]=[]),y[e]?.push(t),{remove:()=>{y[e]=y[e]?.filter((e=>e!==t)),0===y[e]?.length&&w("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==v.contentWindow||e.origin!==g||!t||!y[t])return;const o=e.data?.payload;y[t]?.forEach((e=>{e(o)}))}));const C=()=>{Object.values(y).forEach((e=>{e.length=0})),v?.remove?.(),f=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}function S(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const j=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>w("run"),format:e=>w("format",[e]),getShareUrl:e=>w("getShareUrl",[e]),getConfig:e=>w("getConfig",[e]),setConfig:e=>w("setConfig",[e]),getCode:()=>w("getCode"),show:(e,t)=>w("show",[e,t]),runTests:()=>w("runTests"),onChange:e=>E("code",e),watch:E,exec:function(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),i=1;i<t;i++)o[i-1]=arguments[i];return w("exec",[e,...o])},destroy:()=>k.settled?w("destroy").then(C):f?Promise.reject(h):(C(),Promise.resolve())}}function s(e){void 0===e&&(e={});const{appUrl:t,params:o,config:a,import:s,...n}=e,r="string"==typeof a?{config:a}:"object"==typeof a?{x:"code/"+(0,i.compressToEncodedURIComponent)(JSON.stringify(a))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...n,...o,x:s,...r}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const o=e.dataset.options;if(o)try{t=JSON.parse(o)}catch{}let i;const s=e.dataset.config||e.dataset.prefill;if(s)try{i=JSON.parse(s)}catch{}const n=encodeURIComponent(e.outerHTML);e.innerHTML="",a(e,{import:"dom/"+n,...t,...i?{config:i}:{}})}))}))},5076:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>m,frontMatter:()=>n,metadata:()=>l,toc:()=>c});var i=o(7462),a=(o(7294),o(3905)),s=o(4887);const n={},r="Editor Settings",l={unversionedId:"features/editor-settings",id:"features/editor-settings",title:"Editor Settings",description:"LiveCodes allows a lot of flexibility for configuring which code editor to use and its settings.",source:"@site/docs/features/editor-settings.md",sourceDirName:"features",slug:"/features/editor-settings",permalink:"/livecodes/docs/features/editor-settings",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/editor-settings.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"User Settings",permalink:"/livecodes/docs/features/user-settings"},next:{title:"Internationalization (i18n)",permalink:"/livecodes/docs/features/i18n"}},d={},c=[{value:"Enable AI Code Assistant",id:"enable-ai-code-assistant",level:3},{value:"Code Editor",id:"code-editor",level:3},{value:"Editor Options",id:"editor-options",level:3},{value:"Emmet",id:"emmet",level:3},{value:"Editor Modes",id:"editor-modes",level:3},{value:"Format Options",id:"format-options",level:3}],p={toc:c};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"editor-settings"},"Editor Settings"),(0,a.kt)("p",null,"LiveCodes allows a lot of flexibility for configuring which code editor to use and its settings."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Editor Settings")," screen can be accessed from Settings menu \u2192 Editor Settings."),(0,a.kt)(s.Z,{params:{screen:"editor-settings"},linkText:"direct link",mdxType:"RunInLiveCodes"}),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"LiveCodes Editor Settings",src:o(5119).Z,width:"2240",height:"1400"})),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"LiveCodes Editor Settings",src:o(4586).Z,width:"2240",height:"1400"})),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"LiveCodes Editor Settings",src:o(4852).Z,width:"2240",height:"1400"})),(0,a.kt)("p",null,"A preview code editor is displayed to preview the settings in real time."),(0,a.kt)("p",null,"The settings selected in the ",(0,a.kt)("inlineCode",{parentName:"p"},"Editor Settings")," screen are saved locally to ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/user-settings"},"user settings")," and are used subsequently. These include:"),(0,a.kt)("h3",{id:"enable-ai-code-assistant"},"Enable AI Code Assistant"),(0,a.kt)("p",null,"Enables the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/ai"},"AI code assistant"),". (Free and no account required)"),(0,a.kt)("h3",{id:"code-editor"},"Code Editor"),(0,a.kt)("p",null,"The following code editors are supported:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://microsoft.github.io/monaco-editor/"},(0,a.kt)("strong",{parentName:"a"},"Monaco Editor")),": This is the code editor that powers ",(0,a.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/"},(0,a.kt)("strong",{parentName:"a"},"VS Code")),". It is ",(0,a.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/docs/editor/codebasics"},"feature-rich")," and supports autocomplete with ",(0,a.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/docs/editor/intellisense"},(0,a.kt)("strong",{parentName:"a"},"IntelliSense"))," (including ",(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/intellisense"},"types for custom libraries"),"). However, it requires a relatively large download and is not supported in mobile browsers."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://codemirror.net/"},(0,a.kt)("strong",{parentName:"a"},"CodeMirror")),": Has ",(0,a.kt)("a",{parentName:"li",href:"https://codemirror.net/docs/extensions/"},"many editing features"),", including autocomplete, with good ",(0,a.kt)("strong",{parentName:"li"},"mobile support"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://medv.io/codejar/"},(0,a.kt)("strong",{parentName:"a"},"CodeJar")),": A ",(0,a.kt)("strong",{parentName:"li"},"lightweight")," code editor with very basic editing features. ",(0,a.kt)("a",{parentName:"li",href:"https://prismjs.com/"},"PrismJs")," is used for syntax highlighting. Please note that some editor settings are not supported in CodeJar (see below).")),(0,a.kt)("p",null,"This can be configured using the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editor"},(0,a.kt)("inlineCode",{parentName:"a"},"editor"))," configuration option."),(0,a.kt)("p",null,"By default, Monaco editor is used on desktop, CodeMirror is used on mobile and CodeJar is used in ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/display-modes#codeblock"},"codeblocks"),", in ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/lite"},"lite mode")," and in ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#readonly"},"readonly")," playgrounds."),(0,a.kt)("h3",{id:"editor-options"},"Editor Options"),(0,a.kt)("p",null,"These include:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#editortheme"},"Editor theme")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#fontfamily"},"Font family")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#fontsize"},"Font size")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#usetabs"},"Indentation")," (Spaces/Tabs)"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#tabsize"},"Tab size")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#linenumbers"},"Line numbers")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#wordwrap"},"Word-wrap")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#closebrackets"},"Auto-close brackets and quotes"))),(0,a.kt)("h3",{id:"emmet"},"Emmet"),(0,a.kt)("p",null,"Allows using ",(0,a.kt)("a",{parentName:"p",href:"https://emmet.io/"},(0,a.kt)("strong",{parentName:"a"},"Emmet"))," ",(0,a.kt)("a",{parentName:"p",href:"https://docs.emmet.io/"},"abbreviations and actions"),". See ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#emmet"},(0,a.kt)("inlineCode",{parentName:"a"},"emmet"))," configuration option."),(0,a.kt)("p",null,"(Not supported in CodeJar)"),(0,a.kt)("h3",{id:"editor-modes"},"Editor Modes"),(0,a.kt)("p",null,"Allows using ",(0,a.kt)("a",{parentName:"p",href:"https://vimhelp.org/"},(0,a.kt)("strong",{parentName:"a"},"Vim"))," and ",(0,a.kt)("a",{parentName:"p",href:"https://www.gnu.org/software/emacs/manual/html_node/emacs/Basic.html"},(0,a.kt)("strong",{parentName:"a"},"Emacs"))," keyboard bindings. See ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#editormode"},(0,a.kt)("inlineCode",{parentName:"a"},"editorMode"))," configuration option."),(0,a.kt)("p",null,"(Not supported in CodeJar)"),(0,a.kt)("h3",{id:"format-options"},"Format Options"),(0,a.kt)("p",null,"These are ",(0,a.kt)("a",{parentName:"p",href:"https://prettier.io/"},(0,a.kt)("strong",{parentName:"a"},"Prettier"))," ",(0,a.kt)("a",{parentName:"p",href:"https://prettier.io/docs/en/options.html"},"configuration options")," used for code formatting."),(0,a.kt)("p",null,"In addition to those specified in ",(0,a.kt)("a",{parentName:"p",href:"#editor-options"},"Editor Options"),", the following options are available:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#semicolons"},"Use Semicolons")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#singlequote"},"Use Single Quotes")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/configuration/configuration-object#trailingcomma"},"Use Trailing Commas"))))}m.isMDXComponent=!0},5119:(e,t,o)=>{o.d(t,{Z:()=>i});const i=o.p+"assets/images/editor-settings-1-f401ae77e35e8e11b6427b4f1eb67bb9.jpg"},4586:(e,t,o)=>{o.d(t,{Z:()=>i});const i=o.p+"assets/images/editor-settings-2-dcbfd00bb00d3759e59daec48d1dc905.jpg"},4852:(e,t,o)=>{o.d(t,{Z:()=>i});const i=o.p+"assets/images/editor-settings-3-33c11e13b5bd21a710703dc0dd6bebb6.jpg"}}]);