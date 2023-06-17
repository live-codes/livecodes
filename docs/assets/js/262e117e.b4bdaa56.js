"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3053],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>k});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),l=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=l(e.components);return a.createElement(i.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(r),f=n,k=u["".concat(i,".").concat(f)]||u[f]||d[f]||o;return r?a.createElement(k,c(c({ref:t},p),{},{components:r})):a.createElement(k,c({ref:t},p))}));function k(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,c=new Array(o);c[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[u]="string"==typeof e?e:n,c[1]=s;for(var l=2;l<o;l++)c[l]=r[l];return a.createElement.apply(null,c)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2828:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=r(7462),n=(r(7294),r(3905));const o={},c="Backup / Restore",s={unversionedId:"features/backup-restore",id:"features/backup-restore",title:"Backup / Restore",description:"LiveCodes data can be backed-up, so that it can be later restored on the same or different device.",source:"@site/docs/features/backup-restore.md",sourceDirName:"features",slug:"/features/backup-restore",permalink:"/livecodes/docs/features/backup-restore",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/backup-restore.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Broadcast",permalink:"/livecodes/docs/features/broadcast"},next:{title:"GitHub Integration",permalink:"/livecodes/docs/features/github-integration"}},i={},l=[{value:"Backup",id:"backup",level:2},{value:"Restore",id:"restore",level:2},{value:"Related",id:"related",level:2}],p={toc:l};function u(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"backup--restore"},"Backup / Restore"),(0,n.kt)("p",null,"LiveCodes data can be backed-up, so that it can be later restored on the same or different device."),(0,n.kt)("p",null,"The Backup/Restore screen can be accessed from the app menu \u2192 Backup / Restore."),(0,n.kt)("h2",{id:"backup"},"Backup"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"LiveCode Backup",src:r(9029).Z,width:"2094",height:"1001"})),(0,n.kt)("p",null,"The backup can include one or more of the following:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/projects"},"Projects")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/templates"},"User Templates")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/snippets"},"Code Snippets")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/assets"},"Assets")),(0,n.kt)("li",{parentName:"ul"},"User Settings")),(0,n.kt)("p",null,"A zip file containing the (base64-encoded binary) backup data is downloaded. This file can be restored later on the same or different device."),(0,n.kt)("h2",{id:"restore"},"Restore"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"LiveCode Restore",src:r(5160).Z,width:"2100",height:"998"})),(0,n.kt)("p",null,"When restoring a backup, there are 2 options for managing the current data:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"The current data can be deleted and replaced by the backup data. It cannot then be retrieved, so you may want to back it up first.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"The backup data can be merged with the current data with best effort to preserve both."))),(0,n.kt)("h2",{id:"related"},"Related"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/sync"},"Sync")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/export"},"Export"))))}u.isMDXComponent=!0},9029:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/backup-3dcf8a83957957bb6c688ffcbad1eb91.jpg"},5160:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/restore-41543395e4e5f52874f133cfffddd3c2.jpg"}}]);