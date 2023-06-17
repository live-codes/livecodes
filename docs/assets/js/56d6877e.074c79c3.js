"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8481],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=l(n),u=o,f=d["".concat(p,".").concat(u)]||d[u]||m[u]||a;return n?r.createElement(f,s(s({ref:t},c),{},{components:n})):r.createElement(f,s({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[d]="string"==typeof e?e:o,s[1]=i;for(var l=2;l<a;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1107:(e,t,n)=>{n.r(t),n.d(t,{AppVersionLink:()=>m,Code:()=>u,FullCode:()=>h,GetPermanentUrl:()=>f,assets:()=>c,contentTitle:()=>p,default:()=>k,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var r=n(7462),o=(n(7294),n(3905)),a=n(2263),s=n(452);const i={},p="Permanent URL",l={unversionedId:"features/permanent-url",id:"features/permanent-url",title:"Permanent URL",description:"Any specific version of LiveCodes app can be accessed through the permanent unique URL:",source:"@site/docs/features/permanent-url.md",sourceDirName:"features",slug:"/features/permanent-url",permalink:"/livecodes/docs/features/permanent-url",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/permanent-url.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Read-Only",permalink:"/livecodes/docs/features/read-only"},next:{title:"Code Prefill",permalink:"/livecodes/docs/features/code-prefill"}},c={},d=[{value:"Get Permanent URL",id:"get-permanent-url",level:2},{value:"Full Example:",id:"full-example",level:4},{value:"Related",id:"related",level:2}],m=()=>{const{siteConfig:e}=(0,a.Z)();return(0,o.kt)("a",{href:`https://v${e.customFields.appVersion}.livecodes.io`,target:"\\_blank"},"https://v",e.customFields.appVersion,".livecodes.io")},u=()=>{const{siteConfig:e}=(0,a.Z)();return(0,o.kt)(s.Z,{title:"index.html",language:"html",mdxType:"CodeBlock"},`<div id="container"></div>\n<script type="module">\n  // specific SDK version\n// highlight-next-line\n  import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@${e.customFields.sdkVersion}';\n\n  createPlayground('#container', {\n    // App permanent URL\n// highlight-next-line\n    appUrl: 'https://v${e.customFields.appVersion}.livecodes.io',\n    template: 'react',\n  });\n<\/script>`)},f=()=>{const{siteConfig:e}=(0,a.Z)();return(0,o.kt)(s.Z,{language:"js",mdxType:"CodeBlock"},`await livecodes.exec('showVersion');\n\n// output:\n// App Version: ${e.customFields.appVersion} (https://github.com/live-codes/livecodes/releases/tag/v${e.customFields.appVersion})\n// SDK Version: ${e.customFields.sdkVersion} (https://www.npmjs.com/package/livecodes/v/${e.customFields.sdkVersion})\n// Git commit: 0698f9f (https://github.com/live-codes/livecodes/commit/0698f9f)\n// App Permanent URL: https://v${e.customFields.appVersion}.livecodes.io/\n// SDK Permanent URL: https://cdn.jsdelivr.net/npm/livecodes@${e.customFields.sdkVersion}/livecodes.js\n`)},h=()=>{const{siteConfig:e}=(0,a.Z)();return(0,o.kt)(s.Z,{title:"index.html",language:"html",mdxType:"CodeBlock"},`<div id="container"></div>\n<script type="module">\n  // specific SDK version\n// highlight-next-line\n  import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@${e.customFields.sdkVersion}';\n\n  createPlayground('#container', {\n    // App permanent URL\n// highlight-next-line\n    appUrl: 'https://v${e.customFields.appVersion}.livecodes.io',\n    config: {\n        script: {\n            language: 'javascript',\n            // project code imports package with specific version\n// highlight-next-line\n            content: 'import lodash from "lodash@4.17.21";\\nconsole.log(lodash.VERSION);',\n        },\n        activeEditor: 'script',\n        tools: { status: 'open', active: 'console' },\n    },\n  });\n<\/script>`)},v={toc:d,AppVersionLink:m,Code:u,GetPermanentUrl:f,FullCode:h};function k(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"permanent-url"},"Permanent URL"),(0,o.kt)("p",null,"Any specific version of LiveCodes app can be accessed through the permanent unique URL:"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"{version}.livecodes.io"),(0,o.kt)("br",{parentName:"p"}),"\n","(e.g. ",(0,o.kt)(m,{mdxType:"AppVersionLink"}),")"),(0,o.kt)("p",null,"This allows ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/embeds"},"embedded playgrounds")," to use a pinned version of the LiveCodes app and its dependencies and avoid any breaking changes that may occur in later versions."),(0,o.kt)("p",null,"Permanent URL is used by default in the code generated by the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/embeds"},"embed screen UI"),".\nIt is also available when ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/share"},"sharing")," projects from the share screen."),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"../sdk/"},"SDK")," embed option ",(0,o.kt)("a",{parentName:"p",href:"../sdk/js-ts#appurl"},(0,o.kt)("inlineCode",{parentName:"a"},"appUrl"))," allows specifying the URL for the app to be used.",(0,o.kt)("br",{parentName:"p"}),"\n","In addition, it is always a good practice to use a specific version of the SDK."),(0,o.kt)("p",null,"Example:"),(0,o.kt)(u,{mdxType:"Code"}),(0,o.kt)("h2",{id:"get-permanent-url"},"Get Permanent URL"),(0,o.kt)("p",null,"You can get the permanent URL for the app from the ",(0,o.kt)("a",{parentName:"p",href:"pathname:///../?screen=about"},"About screen")," (App menu \u2192 About). By default, the code generated in the ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/embeds#app-embed-screen"},"Embed screen")," uses permanent URL.",(0,o.kt)("br",{parentName:"p"}),"\n","Alternatively, open the browser console of the standalone app (e.g. ",(0,o.kt)("a",{parentName:"p",href:"https://livecodes.io"},"https://livecodes.io"),"), and run this:"),(0,o.kt)(f,{mdxType:"GetPermanentUrl"}),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Please note that this only applies to the LiveCodes app and its dependencies.",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution"},"NPM imports")," in ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/projects#script-editor"},"project code")," that do not specify versions use the latest version.\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#package-version"},"Package versions")," can be specified in the import.",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/module-resolution#custom-module-resolution"},"Custom import maps")," can be set to control the module import behavior."),(0,o.kt)("p",{parentName:"admonition"},"Example:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import lodash from 'lodash@4.17.21';\n\nconsole.log(lodash.VERSION); // -> 4.17.21\n")),(0,o.kt)("p",{parentName:"admonition"},"It is recommended to also specify versions of ",(0,o.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources"},"external resources"),".")),(0,o.kt)("h4",{id:"full-example"},"Full Example:"),(0,o.kt)(h,{mdxType:"FullCode"}),(0,o.kt)("h2",{id:"related"},"Related"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/embeds"},"Embedded playgrounds")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/features/share"},"Share")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"../sdk/"},"SDK")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/livecodes/docs/sdk/js-ts#exec"},(0,o.kt)("inlineCode",{parentName:"a"},"exec")," SDK method"))))}k.isMDXComponent=!0}}]);