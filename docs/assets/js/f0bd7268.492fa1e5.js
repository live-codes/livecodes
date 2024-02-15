"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1119],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>f});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),p=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},d=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},l="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),l=p(r),u=n,f=l["".concat(c,".").concat(u)]||l[u]||h[u]||o;return r?a.createElement(f,s(s({ref:t},d),{},{components:r})):a.createElement(f,s({ref:t},d))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=u;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[l]="string"==typeof e?e:n,s[1]=i;for(var p=2;p<o;p++)s[p]=r[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},2314:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=r(7462),n=(r(7294),r(3905));const o={},s="Share",i={unversionedId:"features/share",id:"features/share",title:"Share",description:"It is easy to share LiveCodes projects!",source:"@site/docs/features/share.md",sourceDirName:"features",slug:"/features/share",permalink:"/livecodes/docs/features/share",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/share.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Export",permalink:"/livecodes/docs/features/export"},next:{title:"Welcome Screen",permalink:"/livecodes/docs/features/welcome"}},c={},p=[{value:"Related",id:"related",level:2}],d={toc:p};function l(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,a.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"share"},"Share"),(0,n.kt)("p",null,"It is easy to share LiveCodes projects!"),(0,n.kt)("p",null,"A URL is generated to load the shared project. This URL can be copied or shared to different social media."),(0,n.kt)("p",null,"The share screen can be accessed from the share icon at the top right or from the app menu \u2192 Share."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"LiveCodes Share",src:r(9496).Z,width:"1884",height:"1282"})),(0,n.kt)("p",null,"By default, the generated URL encodes the project configuration in a base-64-encoded compressed query string. This step is generated locally in the browser without sending the code to any server. However, depending on the size of the project, the URL can be very long. The length of the URL is indicated in the share screen. ",(0,n.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers"},"Try not to use very long URLs")," to ensure cross-browser compatibility."),(0,n.kt)("p",null,"When requested by the user, short URLs can be generated. This requires sending the project configuration (",(0,n.kt)("strong",{parentName:"p"},"including source code"),") to a server that saves the code and provides a short Id which can be used to retrieve the project."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"LiveCodes Share - short URL",src:r(2593).Z,width:"1747",height:"1292"})),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"Generating a short URL for sharing requires sending the project configuration (",(0,n.kt)("strong",{parentName:"p"},"including source code"),") to LiveCodes share service. ",(0,n.kt)("strong",{parentName:"p"},"It cannot then be deleted"),".")),(0,n.kt)("admonition",{title:"Note",type:"info"},(0,n.kt)("p",{parentName:"admonition"},"The app hosted on ",(0,n.kt)("a",{parentName:"p",href:"https://livecodes.io"},(0,n.kt)("inlineCode",{parentName:"a"},"https://livecodes.io"))," uses an API endpoint specifically provided to generate short URLs for LiveCodes share service. We will make every effort to keep that online and available for free use, so long as it is not abused. Please help keep it available by not abusing it and by ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/sponsor"},"sponsoring the project"),"."),(0,n.kt)("p",{parentName:"admonition"},"Short URLs generated by LiveCodes share service are ",(0,n.kt)("strong",{parentName:"p"},"private")," by default and are not listed or indexed."),(0,n.kt)("p",{parentName:"admonition"},"However, ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/features/self-hosting"},(0,n.kt)("strong",{parentName:"a"},"self-hosted apps"))," use the free service ",(0,n.kt)("a",{parentName:"p",href:"https://dpaste.com/"},"dpaste")," for short URLs which are ",(0,n.kt)("a",{parentName:"p",href:"https://dpaste.com/help"},(0,n.kt)("strong",{parentName:"a"},"deleted after 365 days")),". You may want to use a ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/advanced/services"},"custom service")," instead. LiveCodes ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/sponsor"},"sponsors")," (Bronze sponsors and above) get access to managed custom services.")),(0,n.kt)("p",null,"QR code can be generated for the share URL. This can then be scanned by any QR code scanner (e.g. mobile/tablet camera) to load the project on other devices without having to send the link. Please note that generating QR code also requires generating a short URL (code is sent to the share service - see above)."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"LiveCodes Share - QR code",src:r(9486).Z,width:"1674",height:"1261"})),(0,n.kt)("h2",{id:"related"},"Related"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/export"},"Export")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/import"},"Import")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/deploy"},"Deploy")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/broadcast"},"Broadcast")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/backup-restore"},"Backup / Restore")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/sync"},"Sync")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/permanent-url"},"Permanent URL"))))}l.isMDXComponent=!0},9486:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/share-qrcode-54047d58db4a765680fa1f2ae299f0b6.jpg"},9496:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/share-54568bc139045c6238d10a9f68ec1dd7.jpg"},2593:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/share2-3c8932371a674423a390b374ac9ee937.jpg"}}]);