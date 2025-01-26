"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5768],{4887:(e,t,a)=>{a.d(t,{Z:()=>l});var o=a(7294),r=a(1262),i=a(814),s=a(9493),n=a(1446);function l(e){const{params:t,config:a,code:l,language:p="js",codeTitle:d="",showLineNumbers:c=!1,formatCode:m=!0,linkText:u="Run in LiveCodes",style:h={},className:f=""}=e,k=(0,s.r)({appUrl:n.G,params:t,config:a});return o.createElement("div",{style:{marginBottom:"30px",...h},className:f},l&&o.createElement(r.Z,null,(()=>{return o.createElement(i.Z,{language:p,title:d,showLineNumbers:c},m?(e=l,void 0===(t=p)&&(t="js"),window.prettier?.format(e,{parser:"html"===t?"html":"babel",plugins:window.prettierPlugins})):l);var e,t})),o.createElement("a",{href:k,target:"_blank",rel:"noreferrer"},u,o.createElement("svg",{width:"12",height:"12","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module",style:{marginLeft:"4px"}},o.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))))}},9493:(e,t,a)=>{a.d(t,{T:()=>r,r:()=>i});var o=a(7728);async function r(e,t){void 0===t&&(t={}),"object"!=typeof e||e instanceof HTMLElement||"headless"!==e.view||(t=e,e=null);const{appUrl:a="https://livecodes.io/",params:o={},config:r={},import:i,headless:s,lite:n,loading:l="lazy",template:p,view:d}=t,c=s||"headless"===d;let m,u=null;if("string"==typeof e)u=document.querySelector(e);else if(e instanceof HTMLElement)u=e;else if(!c||"object"!=typeof e)throw new Error("A valid container element is required.");if(!u){if(!c)throw new Error(`Cannot find element: "${e}"`);u=document.createElement("div"),L(u),document.body.appendChild(u)}try{m=new URL(a)}catch{throw new Error(`"${a}" is not a valid URL.`)}const h=m.origin;if("object"==typeof o&&Object.keys(o).forEach((e=>{m.searchParams.set(e,String(o[e]))})),p&&m.searchParams.set("template",p),i&&m.searchParams.set("x",i),c&&m.searchParams.set("headless","true"),n&&(console.warn('Deprecation notice: "lite" option is deprecated. Use "config: { mode: \'lite\' }" instead.'),"object"==typeof r&&null==r.mode?r.mode="lite":m.searchParams.set("lite","true")),d&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),"object"==typeof r&&null==r.view&&"headless"!==d?r.view=d:m.searchParams.set("view",d)),"string"==typeof r)try{new URL(r),m.searchParams.set("config",r)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else{if("object"!=typeof r)throw new Error('"config" is not a valid URL or configuration object.');Object.keys(r).length>0&&m.searchParams.set("config","sdk")}m.searchParams.set("embed","true"),m.searchParams.set("loading",c?"eager":l);let f=!1;const k="Cannot call API methods after calling `destroy()`.",g=await new Promise((e=>{if(!u)return;const t=u.dataset.height||u.style.height;if(t&&!c){const e=isNaN(Number(t))?t:t+"px";u.style.height=e}"false"===u.dataset.defaultStyles||c||(u.style.backgroundColor||="#fff",u.style.border||="1px solid black",u.style.borderRadius||="8px",u.style.boxSizing||="border-box",u.style.padding||="0",u.style.width||="100%",u.style.height||=u.style.height||"300px",u.style.minHeight="200px",u.style.flexGrow="1",u.style.overflow||="hidden",u.style.resize||="vertical");const a="livecodes",o=u.querySelector(`iframe.${a}`),i=o||document.createElement("iframe");i.classList.add(a),i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");const s="eager"===l?"eager":"lazy";i.setAttribute("loading",s),c?L(i):(i.style.height="100%",i.style.minHeight="200px",i.style.width="100%",i.style.margin="0",i.style.border="0",i.style.borderRadius=u.style.borderRadius),addEventListener("message",(function e(t){t.source===i.contentWindow&&t.origin===h&&"livecodes-get-config"===t.data?.type&&(removeEventListener("message",e),i.contentWindow?.postMessage({type:"livecodes-config",payload:r},h))})),i.onload=()=>{e(i)},i.src=m.href,o||u.appendChild(i)})),v=new Promise((e=>{addEventListener("message",(function t(a){a.source===g.contentWindow&&a.origin===h&&"livecodes-ready"===a.data?.type&&(removeEventListener("message",t),e(),v.settled=!0)}))})),b=()=>f?Promise.reject(k):new Promise((async e=>{v.settled&&e();g.contentWindow?.postMessage({type:"livecodes-load"},h),await v,e()})),y=(e,t)=>new Promise((async(a,o)=>{if(f)return o(k);await b();const r=j();addEventListener("message",(function t(i){if(i.source===g.contentWindow&&i.origin===h&&"livecodes-api-response"===i.data?.type&&i.data?.id===r&&i.data.method===e){removeEventListener("message",t);const e=i.data.payload;e?.error?o(e.error):a(e)}})),g.contentWindow?.postMessage({method:e,id:r,args:t},h)})),N={},w=["load","ready","code","console","tests","destroy"],x=(e,t)=>{if(f)throw new Error(k);return w.includes(e)?(y("watch",[e]),N[e]||(N[e]=[]),N[e]?.push(t),{remove:()=>{N[e]=N[e]?.filter((e=>e!==t)),0===N[e]?.length&&y("watch",[e,"unsubscribe"])}}):{remove:()=>{}}};addEventListener("message",(async e=>{const t={"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"}[e.data?.type??""];if(e.source!==g.contentWindow||e.origin!==h||!t||!N[t])return;const a=e.data?.payload;N[t]?.forEach((e=>{e(a)}))}));const C=()=>{Object.values(N).forEach((e=>{e.length=0})),g?.remove?.(),f=!0};if("lazy"===l&&"IntersectionObserver"in window){new IntersectionObserver(((e,t)=>{e.forEach((async e=>{e.isIntersecting&&(await b(),t.unobserve(u))}))}),{rootMargin:"150px"}).observe(u)}function L(e){e.style.position="absolute",e.style.top="0",e.style.visibility="hidden",e.style.opacity="0"}const j=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>b(),run:()=>y("run"),format:e=>y("format",[e]),getShareUrl:e=>y("getShareUrl",[e]),getConfig:e=>y("getConfig",[e]),setConfig:e=>y("setConfig",[e]),getCode:()=>y("getCode"),show:(e,t)=>y("show",[e,t]),runTests:()=>y("runTests"),onChange:e=>x("code",e),watch:x,exec:function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),o=1;o<t;o++)a[o-1]=arguments[o];return y("exec",[e,...a])},destroy:()=>v.settled?y("destroy").then(C):f?Promise.reject(k):(C(),Promise.resolve())}}function i(e){void 0===e&&(e={});const{appUrl:t,params:a,config:r,import:i,...s}=e,n="string"==typeof r?{config:r}:"object"==typeof r?{x:"code/"+(0,o.compressToEncodedURIComponent)(JSON.stringify(r))}:{},l=new URLSearchParams(JSON.parse(JSON.stringify({...s,...a,x:i,...n}))).toString();return(t||"https://livecodes.io")+(l?"?"+l:"")}globalThis.document&&document.currentScript&&"prefill"in document.currentScript?.dataset&&window.addEventListener("load",(()=>{document.querySelectorAll(".livecodes").forEach((e=>{let t;const a=e.dataset.options;if(a)try{t=JSON.parse(a)}catch{}let o;const i=e.dataset.config||e.dataset.prefill;if(i)try{o=JSON.parse(i)}catch{}const s=encodeURIComponent(e.outerHTML);e.innerHTML="",r(e,{import:"dom/"+s,...t,...o?{config:o}:{}})}))}))},7283:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>n,default:()=>m,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var o=a(7462),r=(a(7294),a(3905)),i=a(4887);const s={},n="Import",l={unversionedId:"features/import",id:"features/import",title:"Import",description:"Overview",source:"@site/docs/features/import.md",sourceDirName:"features",slug:"/features/import",permalink:"/livecodes/docs/features/import",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/import.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Code Snippets",permalink:"/livecodes/docs/features/snippets"},next:{title:"Export",permalink:"/livecodes/docs/features/export"}},p={},d=[{value:"Overview",id:"overview",level:2},{value:"UI",id:"ui",level:3},{value:"Query Param",id:"query-param",level:3},{value:"Bookmarklet",id:"bookmarklet",level:3},{value:"SDK",id:"sdk",level:3},{value:"Examples",id:"examples",level:2},{value:"Sources",id:"sources",level:2},{value:"File Selection",id:"file-selection",level:2},{value:"Import Shared Projects",id:"import-shared-projects",level:2},{value:"Import Code from DOM",id:"import-code-from-dom",level:2},{value:"Import Raw Code",id:"import-raw-code",level:2},{value:"Import from CodePen",id:"import-from-codepen",level:2},{value:"Import Exported LiveCodes Projects",id:"import-exported-livecodes-projects",level:2},{value:"Related",id:"related",level:2}],c={toc:d};function m(e){let{components:t,...s}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,s,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"import"},"Import"),(0,r.kt)("h2",{id:"overview"},"Overview"),(0,r.kt)("p",null,"LiveCodes supports importing code from a wide variety of ",(0,r.kt)("a",{parentName:"p",href:"#sources"},"sources"),". This can be achieved using one of the following methods:"),(0,r.kt)("h3",{id:"ui"},"UI"),(0,r.kt)("p",null,"The Import screen can be accessed from the Project menu \u2192 Import."),(0,r.kt)(i.Z,{params:{screen:"import"},linkText:"direct link",mdxType:"RunInLiveCodes"}),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"LiveCodes Import",src:a(4532).Z,width:"2240",height:"1400"})),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"LiveCodes Import",src:a(8092).Z,width:"2240",height:"1400"})),(0,r.kt)("h3",{id:"query-param"},"Query Param"),(0,r.kt)("p",null,"A URL of any of the ",(0,r.kt)("a",{parentName:"p",href:"#sources"},"sources")," can be imported by adding it as a value to ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query param")," key: ",(0,r.kt)("inlineCode",{parentName:"p"},"x"),"."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://gist.github.com/f01deb828a42f363502fbae7964d48e9"},"https://livecodes.io/?x=https://gist.github.com/f01deb828a42f363502fbae7964d48e9")),(0,r.kt)("h3",{id:"bookmarklet"},"Bookmarklet"),(0,r.kt)("p",null,"Instead of manually copy/pasting URLs to import, adding ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/bookmarklet"},(0,r.kt)("strong",{parentName:"a"},'"Edit in LiveCodes"')," bookmarklet")," to the browser bookmarks bar can be a more convenient way. It opens LiveCodes in a new window and imports the current webpage URL."),(0,r.kt)("h3",{id:"sdk"},"SDK"),(0,r.kt)("p",null,"For ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/embeds"},"embedded playgrounds"),", use the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," property ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#import"},(0,r.kt)("inlineCode",{parentName:"a"},"EmbedOptions.import")),"."),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"GitHub File:"),(0,r.kt)("p",{parentName:"li"},"URL: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/lodash/lodash/blob/master/isObject.js"},"https://github.com/lodash/lodash/blob/master/isObject.js")),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://github.com/lodash/lodash/blob/master/isObject.js"},"Open in LiveCodes"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"GitHub Directory:"),(0,r.kt)("p",{parentName:"li"},"URL: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/bradtraversy/50projects50days/tree/master/expanding-cards"},"https://github.com/bradtraversy/50projects50days/tree/master/expanding-cards")),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://github.com/bradtraversy/50projects50days/tree/master/expanding-cards"},"Open in LiveCodes"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"GitHub Gist:"),(0,r.kt)("p",{parentName:"li"},"URL: ",(0,r.kt)("a",{parentName:"p",href:"https://gist.github.com/f01deb828a42f363502fbae7964d48e9"},"https://gist.github.com/f01deb828a42f363502fbae7964d48e9")),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://gist.github.com/f01deb828a42f363502fbae7964d48e9"},"Open in LiveCodes"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"JS Bin:"),(0,r.kt)("p",{parentName:"li"},"URL: ",(0,r.kt)("a",{parentName:"p",href:"https://jsbin.com/iwovaj/73/embed?html,js,output"},"https://jsbin.com/iwovaj/73/embed?html,js,output")),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://jsbin.com/iwovaj/73/embed?html,js,output"},"Open in LiveCodes"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Vue Playground:"),(0,r.kt)("p",{parentName:"li"},"URL: ",(0,r.kt)("a",{parentName:"p",href:"https://play.vuejs.org/#eNp9kUFKAzEUhq/yyKYKtUW6K9OCli4UUVFxlU2Zvk5TM0lIXsbCMGdw7QG8g+fxAl7Bl5RWF9Jd3v//7+cLrxUXzg2aiGIsilB65QgCUnRTaVTtrCdoweMKOlh5W0OPoz1ppCmtCQR1qGCS/JPejWpwZpcY4Ov94/vzDZ45eSpNMdzVciEPhLXTC0KeAIr1+bRtc0nXFUOesqqMiwTNWc1teiIF+1KwVQwP26IvKDDCSlWDTbCG6du0K0Vpa6c0+jtHihGlGEN2krfQ2r5eZ418xP5eL9dYvvyjb8I2aVLcewzoG5Ti4NHCV0g7e/54i1t+H0wmj5rTR8wHDFbHxLiLXUazZOw/uUx7lW+gTPUU5ltCE/afSqAp2eW8FHyX2ZGv/+KOBqO8J00nuh/8Wasi"},"https://play.vuejs.org/#eNp9kUFKAzEUhq/yyKYKtUW6K9OCli4UUVFxlU2Z...")),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https%3A%2F%2Fplay.vuejs.org%2F%23eNp9kUFKAzEUhq%2FyyKYKtUW6K9OCli4UUVFxlU2Zvk5TM0lIXsbCMGdw7QG8g%2BfxAl7Bl5RWF9Jd3v%2F%2F7%2BcLrxUXzg2aiGIsilB65QgCUnRTaVTtrCdoweMKOlh5W0OPoz1ppCmtCQR1qGCS%2FJPejWpwZpcY4Ov94%2FvzDZ45eSpNMdzVciEPhLXTC0KeAIr1%2BbRtc0nXFUOesqqMiwTNWc1teiIF%2B1KwVQwP26IvKDDCSlWDTbCG6du0K0Vpa6c0%2BjtHihGlGEN2krfQ2r5eZ418xP5eL9dYvvyjb8I2aVLcewzoG5Ti4NHCV0g7e%2F54i1t%2BH0wmj5rTR8wHDFbHxLiLXUazZOw%2FuUx7lW%2BgTPUU5ltCE%2FafSqAp2eW8FHyX2ZGv%2F%2BKOBqO8J00nuh%2F8Wasi"},"Open in LiveCodes")))),(0,r.kt)("h2",{id:"sources"},"Sources"),(0,r.kt)("p",null,"Import is supported from any of the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"GitHub gist"),(0,r.kt)("li",{parentName:"ul"},"GitHub file"),(0,r.kt)("li",{parentName:"ul"},"Directory in a GitHub repo"),(0,r.kt)("li",{parentName:"ul"},"Gitlab snippet"),(0,r.kt)("li",{parentName:"ul"},"Gitlab file"),(0,r.kt)("li",{parentName:"ul"},"Directory in a Gitlab repo"),(0,r.kt)("li",{parentName:"ul"},"JS Bin"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/share"},"Shared projects")),(0,r.kt)("li",{parentName:"ul"},"Raw code"),(0,r.kt)("li",{parentName:"ul"},"Code in web page DOM"),(0,r.kt)("li",{parentName:"ul"},"Projects shared in official playgrounds of ",(0,r.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/play"},"TypeScript")," and ",(0,r.kt)("a",{parentName:"li",href:"https://play.vuejs.org/"},"Vue")),(0,r.kt)("li",{parentName:"ul"},"Local file(s)"),(0,r.kt)("li",{parentName:"ul"},"Code in zip file (Local or URL)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/export"},"Exported project JSON")," (single project and bulk import)")),(0,r.kt)("p",null,"Import sources are identified by URL patterns (e.g. origin, pathname and extension)."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},'Local files can be imported from the "Import Screen" or by dragging and dropping the file(s) in the editor.')),(0,r.kt)("h2",{id:"file-selection"},"File Selection"),(0,r.kt)("p",null,"For sources that provide multiple files (e.g. GitHub/GitLab directories, GitHub gists, GitLab snippets and local files), a best guess is tried to load files in respective editors. Best results are when there are 3 files and each file is in a language (identified by file extension) that can be loaded to a different editor, for example:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"index.html, style.css, script.js"),(0,r.kt)("li",{parentName:"ul"},"default.pug, app.scss, main.ts")),(0,r.kt)("p",null,"The following file names are given higher priority:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Markup files starting with ",(0,r.kt)("inlineCode",{parentName:"li"},"index.")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"default.")),(0,r.kt)("li",{parentName:"ul"},"Style files starting with ",(0,r.kt)("inlineCode",{parentName:"li"},"style.")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"styles.")),(0,r.kt)("li",{parentName:"ul"},"Script files starting with ",(0,r.kt)("inlineCode",{parentName:"li"},"script."),", ",(0,r.kt)("inlineCode",{parentName:"li"},"app."),", ",(0,r.kt)("inlineCode",{parentName:"li"},"main.")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"index."))),(0,r.kt)("p",null,"While README, markdown files and files with no extension are given lower priority."),(0,r.kt)("p",null,"Alternatively, files can be specified using the ",(0,r.kt)("inlineCode",{parentName:"p"},"files")," ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query param"),". It takes a ",(0,r.kt)("strong",{parentName:"p"},"comma-separated list")," of filenames. The first 3 found files are loaded. If 1 or 2 files are specified, only these will be loaded. The first matching file is shown by default in the active editor."),(0,r.kt)("p",null,"The query params should have the following format:",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"?x={url}&files={file1},{file2},{file3}")),(0,r.kt)("p",null,"Example:",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"?x={url}&files=Counter.tsx,counter.scss,counter.html")),(0,r.kt)("p",null,"The active editor can be specified using the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/configuration-object#activeeditor"},(0,r.kt)("inlineCode",{parentName:"a"},"activeEditor"))," (or its alias ",(0,r.kt)("inlineCode",{parentName:"p"},"active"),") ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query param"),". It takes the name of the editor (",(0,r.kt)("inlineCode",{parentName:"p"},"markup"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"style")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"script"),") or its ID (",(0,r.kt)("inlineCode",{parentName:"p"},"0"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"2"),") to be shown by default."),(0,r.kt)("p",null,"Example:",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"?x={url}&activeEditor=style")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"?x={url}&active=1")),(0,r.kt)("h2",{id:"import-shared-projects"},"Import Shared Projects"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/share"},"Shared Projects")," can be imported using the value of the query param ",(0,r.kt)("inlineCode",{parentName:"p"},"x")," generated by the Share screen. This starts with either:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"code/"),": for compressed base64-encoded project config"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"id/"),": for short URLs recognized by shared project id.")),(0,r.kt)("p",null,"Example:"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=id/bi9qszw86w3"},"https://livecodes.io/?x=id/bi9qszw86w3")),(0,r.kt)("h2",{id:"import-code-from-dom"},"Import Code from DOM"),(0,r.kt)("p",null,"If the source URL does not match one of the supported origins (GitHub, GitLab and JS Bin), the URL is fetched, its response text is parsed as ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"},"DOM")," and code is extracted from elements that match specific CSS selectors.",(0,r.kt)("br",{parentName:"p"}),"\n","(By default: ",(0,r.kt)("inlineCode",{parentName:"p"},'.livecodes [data-lang="{language}"]'),")"),(0,r.kt)("admonition",{title:"Example",type:"info"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<code class="livecodes">\n  <pre data-lang="html">This is identified as &lt;strong&gt;HTML&lt;/strong&gt; code</pre>\n</code>\n')),(0,r.kt)("p",{parentName:"admonition"},"The HTML editor is prefilled with: ",(0,r.kt)("inlineCode",{parentName:"p"},"This is identified as <strong>HTML</strong> code")),(0,r.kt)("p",{parentName:"admonition"},"Please note that the code should be html-encoded to avoid interference with the HTML of the page.")),(0,r.kt)("p",null,"Example:"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html"},"https://livecodes.io/?x=https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html")),(0,r.kt)("p",null,"Alternatively, custom CSS selectors can be specified using ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query params"),":",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"?x={url}&{language}-selector={selector}")),(0,r.kt)("p",null,"The following example loads the content of the first element that matches the CSS selector ",(0,r.kt)("inlineCode",{parentName:"p"},"h3")," as ",(0,r.kt)("inlineCode",{parentName:"p"},"html"),":"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://livecodes.io/?html-selector=h3&x=https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html"},"https://livecodes.io/?html-selector=h3&x=https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html")),(0,r.kt)("p",null,"Of course, ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/embeds"},"embedded playgrounds")," can be prefilled with code from the same embedding page. This works well for documentation and educational websites."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html"},"This is a demo"),' for automatic extraction of code blocks to prefill editors by creating "Edit in LiveCodes" links. Also embedded editors are prefilled from the code blocks. (',(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes-examples/blob/master/prefill-from-code-blocks.html"},"View source"),")"),(0,r.kt)("h2",{id:"import-raw-code"},"Import Raw Code"),(0,r.kt)("p",null,"If the response text could not be parsed as DOM or no elements matched the CSS selectors, it is assumed to be raw code and the response text is loaded to editor. If the URL ends with an extension it is used to identify the language, otherwise it is assumed to be ",(0,r.kt)("inlineCode",{parentName:"p"},"html"),"."),(0,r.kt)("p",null,"Alternatively, the language of raw code can be specified using ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query params"),":",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"?x={url}&raw={language}")),(0,r.kt)("h2",{id:"import-from-codepen"},"Import from CodePen"),(0,r.kt)("p",null,"Currently, CodePen API does not allow directly importing code from Pens. However, you can export any saved Pen as a ",(0,r.kt)("a",{parentName:"p",href:"https://blog.codepen.io/documentation/exporting-pens/#export-zip-1"},"zip file")," or ",(0,r.kt)("a",{parentName:"p",href:"https://blog.codepen.io/documentation/exporting-pens/#save-as-github-gist-2"},"Github gist")," and then import it to LiveCodes. The format that Codepen exports is well understood by LiveCodes. Most Pens can be imported with no or minimal changes."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note:")," External resources (styles/scripts) are not exported with source code in zip file export of CodePen. However, export to GitHub gist does export these. So if a Pen with external resources exported as zip file is not imported properly, try exporting to GitHub gist or manually add the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources"},"external resources"),"."),(0,r.kt)("h2",{id:"import-exported-livecodes-projects"},"Import Exported LiveCodes Projects"),(0,r.kt)("p",null,"A ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/export#exporting-a-single-project"},"single project exported as JSON"),' can be imported in the same or a different device from the import screen under the tab "Import Project JSON". The JSON file can be supplied as a local file upload or from a URL.'),(0,r.kt)("p",null,"Similarly, ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/features/export#exporting-multiple-projects"},"multiple projects exported in bulk"),' can be imported from the tab "Bulk Import".'),(0,r.kt)("h2",{id:"related"},"Related"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/code-prefill"},"Code prefill")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/export"},"Export")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/external-resources"},"External resources")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/module-resolution"},"Module resolution")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/features/projects"},"Projects"))))}m.isMDXComponent=!0},4532:(e,t,a)=>{a.d(t,{Z:()=>o});const o=a.p+"assets/images/import-1-173c6698c44150c58b6d341db09435ad.jpg"},8092:(e,t,a)=>{a.d(t,{Z:()=>o});const o=a.p+"assets/images/import-2-d2b754e8fc74fcad61a5e7d2932be5d5.jpg"}}]);