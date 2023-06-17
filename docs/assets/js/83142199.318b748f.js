"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8663],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=o.createContext({}),p=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(r),f=n,m=d["".concat(s,".").concat(f)]||d[f]||u[f]||a;return r?o.createElement(m,i(i({ref:t},c),{},{components:r})):o.createElement(m,i({ref:t},c))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:n,i[1]=l;for(var p=2;p<a;p++)i[p]=r[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3590:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var o=r(7462),n=(r(7294),r(3905));const a={},i="Deploy",l={unversionedId:"features/deploy",id:"features/deploy",title:"Deploy",description:"The result page (of any number of projects) can be deployed and hosted at GitHub Pages (a free service from GitHub for hosting static websites). This requires login with a GitHub account.",source:"@site/docs/features/deploy.md",sourceDirName:"features",slug:"/features/deploy",permalink:"/livecodes/docs/features/deploy",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/deploy.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Code Prefill",permalink:"/livecodes/docs/features/code-prefill"},next:{title:"Sync",permalink:"/livecodes/docs/features/sync"}},s={},p=[{value:"Related",id:"related",level:2}],c={toc:p};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"deploy"},"Deploy"),(0,n.kt)("p",null,"The result page (of any number of projects) can be deployed and hosted at ",(0,n.kt)("a",{parentName:"p",href:"https://pages.github.com/"},"GitHub Pages")," (a free service from GitHub for hosting static websites). This requires login with a ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/features/github-integration"},"GitHub account"),"."),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"Deploy")," screen can be accessed from the app menu \u2192 Deploy."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"LiveCodes Deploy",src:r(7825).Z,width:"2695",height:"1366"})),(0,n.kt)("p",null,"The result page (and optionally the source code) is pushed to ",(0,n.kt)("inlineCode",{parentName:"p"},"gh-pages")," branch of a ",(0,n.kt)("strong",{parentName:"p"},"public")," GitHub repo (new or existing). The page, shortly, becomes available on ",(0,n.kt)("inlineCode",{parentName:"p"},"https://{user}.github.io/{repo}/"),"."),(0,n.kt)("p",null,"If an existing repo is selected, the content of the ",(0,n.kt)("inlineCode",{parentName:"p"},"gh-pages")," branch (if existing) is replaced by the deployed content."),(0,n.kt)("p",null,"If the option ",(0,n.kt)("inlineCode",{parentName:"p"},"Commit source code")," is enabled, the source code will be deployed to the directory ",(0,n.kt)("inlineCode",{parentName:"p"},"/src"),"."),(0,n.kt)("p",null,"The code for the result page (and source code) is deployed as separate files for markup (",(0,n.kt)("inlineCode",{parentName:"p"},"/index.html"),"), styles (",(0,n.kt)("inlineCode",{parentName:"p"},"style.css"),") and script (",(0,n.kt)("inlineCode",{parentName:"p"},"script.js"),"). This allows re-use of these resources in other projects. Of course, multiple projects can be deloyed and linked to each other to act like a multi-page website."),(0,n.kt)("p",null,"The LiveCodes app will remember the repo used to deploy each project, so that later updates to the project can be deployed to the same repo."),(0,n.kt)("h2",{id:"related"},"Related"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/export"},"Export")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/share"},"Share")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/broadcast"},"Broadcast")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/github-integration"},"GitHub integration"))))}d.isMDXComponent=!0},7825:(e,t,r)=>{r.d(t,{Z:()=>o});const o=r.p+"assets/images/deploy-d1540338be0915200f7f17c4b3328c4c.jpg"}}]);