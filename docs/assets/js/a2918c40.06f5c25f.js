"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5943],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=d(n),m=r,u=c["".concat(p,".").concat(m)]||c[m]||f[m]||i;return n?a.createElement(u,l(l({ref:t},s),{},{components:n})):a.createElement(u,l({ref:t},s))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[c]="string"==typeof e?e:r,l[1]=o;for(var d=2;d<i;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9588:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var a=n(7462),r=(n(7294),n(3905));const i={id:"internal.AppConfig",title:"Interface: AppConfig",sidebar_label:"AppConfig",custom_edit_url:null},l=void 0,o={unversionedId:"api/interfaces/internal.AppConfig",id:"api/interfaces/internal.AppConfig",title:"Interface: AppConfig",description:"_internal.AppConfig",source:"@site/docs/api/interfaces/internal.AppConfig.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/internal.AppConfig",permalink:"/livecodes/docs/api/interfaces/internal.AppConfig",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"internal.AppConfig",title:"Interface: AppConfig",sidebar_label:"AppConfig",custom_edit_url:null}},p={},d=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"allowLangChange",id:"allowlangchange",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"mode",id:"mode",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"readonly",id:"readonly",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"tools",id:"tools",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"zoom",id:"zoom",level:3},{value:"Defined in",id:"defined-in-4",level:4}],s={toc:d};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/api/modules/internal"},"_internal"),".AppConfig"),(0,r.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"AppConfig"))),(0,r.kt)("p",{parentName:"li"},"\u21b3 ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/api/interfaces/Config"},(0,r.kt)("inlineCode",{parentName:"a"},"Config"))))),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"allowlangchange"},"allowLangChange"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"allowLangChange"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/fe430fb4/src/sdk/models.ts#L60"},"models.ts:60")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"mode"},"mode"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"mode"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'"full"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"result"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"editor"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"codeblock"')),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/fe430fb4/src/sdk/models.ts#L61"},"models.ts:61")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"readonly"},"readonly"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"readonly"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/fe430fb4/src/sdk/models.ts#L59"},"models.ts:59")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tools"},"tools"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"tools"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Object")),(0,r.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"active")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},'""')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"console"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"compiled"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"tests"'))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"enabled")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},'"all"')," ","|"," (",(0,r.kt)("inlineCode",{parentName:"td"},'"console"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"compiled"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"tests"'),")[]")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"status")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/livecodes/docs/api/modules/internal#toolspanestatus"},(0,r.kt)("inlineCode",{parentName:"a"},"ToolsPaneStatus")))))),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/fe430fb4/src/sdk/models.ts#L62"},"models.ts:62")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"zoom"},"zoom"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"zoom"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"0.5")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"0.25")),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/fe430fb4/src/sdk/models.ts#L67"},"models.ts:67")))}c.isMDXComponent=!0}}]);