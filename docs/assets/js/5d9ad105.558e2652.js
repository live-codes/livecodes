"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6058],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>h});var i=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function n(e,t){if(null==e)return{};var a,i,r=function(e,t){if(null==e)return{};var a,i,r={},l=Object.keys(e);for(i=0;i<l.length;i++)a=l[i],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)a=l[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=i.createContext({}),c=function(e){var t=i.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},d=function(e){var t=c(e.components);return i.createElement(o.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,d=n(e,["components","mdxType","originalType","parentName"]),p=c(a),m=r,h=p["".concat(o,".").concat(m)]||p[m]||u[m]||l;return a?i.createElement(h,s(s({ref:t},d),{},{components:a})):i.createElement(h,s({ref:t},d))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,s=new Array(l);s[0]=m;var n={};for(var o in t)hasOwnProperty.call(t,o)&&(n[o]=t[o]);n.originalType=e,n[p]="string"==typeof e?e:r,s[1]=n;for(var c=2;c<l;c++)s[c]=a[c];return i.createElement.apply(null,s)}return i.createElement.apply(null,a)}m.displayName="MDXCreateElement"},124:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>p,frontMatter:()=>l,metadata:()=>n,toc:()=>c});var i=a(7462),r=(a(7294),a(3905));const l={},s="Adding Languages",n={unversionedId:"contribution/adding-languages",id:"contribution/adding-languages",title:"Adding Languages",description:"Criteria for a new language",source:"@site/docs/contribution/adding-languages.md",sourceDirName:"contribution",slug:"/contribution/adding-languages",permalink:"/livecodes/docs/contribution/adding-languages",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/contribution/adding-languages.md",tags:[],version:"current",frontMatter:{}},o={},c=[{value:"Criteria for a new language",id:"criteria-for-a-new-language",level:2},{value:"Checklist when adding",id:"checklist-when-adding",level:2}],d={toc:c};function p(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,i.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"adding-languages"},"Adding Languages"),(0,r.kt)("h2",{id:"criteria-for-a-new-language"},"Criteria for a new language"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Has a syntax that needs to be compiled/transpiled to work in browsers (e.g. not a JS library)."),(0,r.kt)("li",{parentName:"ul"},"A compiler/runtime that runs ",(0,r.kt)("a",{parentName:"li",href:"/livecodes/docs/why#client-side"},"client-side")," in the browser (not on a remote server)."),(0,r.kt)("li",{parentName:"ul"},"Its output can be represented in a web page."),(0,r.kt)("li",{parentName:"ul"},"Relatively popular (e.g. at least hundreds of GitHub stars/thousands of weekly downloads)."),(0,r.kt)("li",{parentName:"ul"},"Not ",(0,r.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Esoteric_programming_language"},"esoteric")," (otherwise, ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/discussions"},"convince me")," if you have a good use case)."),(0,r.kt)("li",{parentName:"ul"},"The compiler/runtime is still reasonably maintained."),(0,r.kt)("li",{parentName:"ul"},"The compiler/runtime has a permissive license compatible with MIT license.")),(0,r.kt)("p",null,"If you still have doubts if the language qualifies, ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/discussions"},"let's discuss it"),"."),(0,r.kt)("h2",{id:"checklist-when-adding"},"Checklist when adding"),(0,r.kt)("ul",{className:"contains-task-list"},(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Add ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/tree/develop/src/livecodes/languages"},"language specs")," and include that in the list of ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/develop/src/livecodes/languages/languages.ts"},"languages")," or ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/develop/src/livecodes/languages/processors.ts"},"processors"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","The compiler +/- formatter should be lazy-loaded."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","If the compiler needs a separate build, add it to the ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/3a2617850f09487b9af92de862093f082942b8a9/scripts/build.js#L207"},"build script"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","If the compiler/formatter require installing new packages or adding static files (e.g. wasm) add them to the ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/browser-compilers/"},"browser compilers repo")," and load them from ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/3a2617850f09487b9af92de862093f082942b8a9/src/livecodes/vendors.ts#L1"},"CDN"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Any links to CDN hosted assets should be referenced from ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/develop/src/livecodes/vendors.ts"},"list of vendors"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Add language name and aliases to ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/3a2617850f09487b9af92de862093f082942b8a9/src/sdk/models.ts#L129"},"models"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Add editor support (e.g. syntax highlighting) for ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/tree/develop/src/livecodes/editor/monaco"},"Monaco"),", ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/tree/develop/src/livecodes/editor/codemirror"},"CodeMirror")," and ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/develop/src/livecodes/editor/codejar/codejar.ts"},"Prismjs")," (if not auto-loaded)."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Add ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/develop/src/livecodes/html/language-info.html"},"language info"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Consider adding a ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/tree/develop/src/livecodes/templates/starter"},"starter template"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Add ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/tree/develop/e2e/specs"},"end-to-ends tests"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Add language ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages"},"documentation"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Add language to documentation website ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/develop/docs/src/components/LanguageSliders.tsx"},"slider"),"."),(0,r.kt)("li",{parentName:"ul",className:"task-list-item"},(0,r.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Add compiler/formatter ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/live-codes/livecodes/blob/develop/vendor-licenses.md"},"license(s)"),".")))}p.isMDXComponent=!0}}]);