"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9895],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var s=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,s,n=function(e,t){if(null==e)return{};var r,s,n={},a=Object.keys(e);for(s=0;s<a.length;s++)r=a[s],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(s=0;s<a.length;s++)r=a[s],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=s.createContext({}),i=function(e){var t=s.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=i(e.components);return s.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},f=s.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=i(r),f=n,h=d["".concat(c,".").concat(f)]||d[f]||u[f]||a;return r?s.createElement(h,o(o({ref:t},p),{},{components:r})):s.createElement(h,o({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:n,o[1]=l;for(var i=2;i<a;i++)o[i]=r[i];return s.createElement.apply(null,o)}return s.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9334:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>i});var s=r(7462),n=(r(7294),r(3905));const a={},o="External Resources",l={unversionedId:"features/external-resources",id:"features/external-resources",title:"External Resources",description:"Stylesheets and Scripts",source:"@site/docs/features/external-resources.md",sourceDirName:"features",slug:"/features/external-resources",permalink:"/livecodes/docs/features/external-resources",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/external-resources.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Result Page",permalink:"/livecodes/docs/features/result"},next:{title:"Tools Pane",permalink:"/livecodes/docs/features/tools-pane"}},c={},i=[{value:"Stylesheets and Scripts",id:"stylesheets-and-scripts",level:2},{value:"Search for NPM Packages",id:"search-for-npm-packages",level:2},{value:"Fonts",id:"fonts",level:2},{value:"CSS Presets",id:"css-presets",level:2},{value:"Related",id:"related",level:2}],p={toc:i};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,s.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"external-resources"},"External Resources"),(0,n.kt)("h2",{id:"stylesheets-and-scripts"},"Stylesheets and Scripts"),(0,n.kt)("p",null,"URLs to external CSS stylesheets and JS scripts can be added to the page from the UI using the app menu \u2192 External Resources. In addition, there is a button to the External Resources in the toolbar below the editors."),(0,n.kt)("p",null,"URLs to stylesheets/scripts should be added each in a separate line."),(0,n.kt)("p",null,"Stylesheets and scripts are loaded in the ",(0,n.kt)("a",{parentName:"p",href:"/livecodes/docs/features/result"},"result page")," before editor codes. Thus, CSS properties defined in external stylesheets can be overriden in the style editor. Global javascript variables defined in external scripts are available to code in the script editor."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"External Resources",src:r(5761).Z,width:"2662",height:"1549"})),(0,n.kt)("p",null,"Importing and Exporting code to other services (e.g. Codepen and Github gists) takes into consiedration the external resources."),(0,n.kt)("h2",{id:"search-for-npm-packages"},"Search for NPM Packages"),(0,n.kt)("p",null,"Package search allows finding NPM Packages and adding URLs to default scripts/stylesheets (hosted by ",(0,n.kt)("a",{parentName:"p",href:"https://www.jsdelivr.com/"},"jsDelivr"),"). Specific package version can be specified."),(0,n.kt)("p",null,"Examples for search terms:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"jque\n\njquery\n\njquery@3\n\njquery@3.6\n\njquery@3.6.3\n\n")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"External Resources Search",src:r(5528).Z,width:"2650",height:"1550"})),(0,n.kt)("h2",{id:"fonts"},"Fonts"),(0,n.kt)("p",null,"Fonts can be added from ",(0,n.kt)("a",{parentName:"p",href:"https://fonts.google.com/"},"Google fonts"),"."),(0,n.kt)("h2",{id:"css-presets"},"CSS Presets"),(0,n.kt)("p",null,"CSS presets currently include ",(0,n.kt)("a",{parentName:"p",href:"https://necolas.github.io/normalize.css/"},"Normalize.css")," and ",(0,n.kt)("a",{parentName:"p",href:"https://meyerweb.com/eric/tools/css/reset/"},"Reset CSS"),"."),(0,n.kt)("h2",{id:"related"},"Related"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/module-resolution"},"Module resolution")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/livecodes/docs/features/assets"},"Assets"))))}d.isMDXComponent=!0},5528:(e,t,r)=>{r.d(t,{Z:()=>s});const s=r.p+"assets/images/external-resources-search-dcdd60237bccc4f876878eaba25de674.jpg"},5761:(e,t,r)=>{r.d(t,{Z:()=>s});const s=r.p+"assets/images/external-resources-caa30d6ba93deeaa9155187595dafdeb.jpg"}}]);