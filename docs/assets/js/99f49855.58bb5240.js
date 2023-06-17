"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7657],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var r=n(7294);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,c=e.mdxType,o=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=l(n),p=c,f=u["".concat(s,".").concat(p)]||u[p]||m[p]||o;return n?r.createElement(f,a(a({ref:t},d),{},{components:n})):r.createElement(f,a({ref:t},d))}));function f(e,t){var n=arguments,c=t&&t.mdxType;if("string"==typeof e||c){var o=n.length,a=new Array(o);a[0]=p;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:c,a[1]=i;for(var l=2;l<o;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},2991:(e,t,n)=>{n.d(t,{Z:()=>g});var r=n(7294),c=n(6010),o=n(3438),a=n(9960),i=n(3919),s=n(5999);const l="cardContainer_fWXF",d="cardTitle_rnsV",u="cardDescription_PWke";function m(e){let{href:t,children:n}=e;return r.createElement(a.Z,{href:t,className:(0,c.Z)("card padding--lg",l)},n)}function p(e){let{href:t,icon:n,title:o,description:a}=e;return r.createElement(m,{href:t},r.createElement("h2",{className:(0,c.Z)("text--truncate",d),title:o},n," ",o),a&&r.createElement("p",{className:(0,c.Z)("text--truncate",u),title:a},a))}function f(e){let{item:t}=e;const n=(0,o.Wl)(t);return n?r.createElement(p,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,s.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function v(e){let{item:t}=e;const n=(0,i.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",c=(0,o.xz)(t.docId??void 0);return r.createElement(p,{href:t.href,icon:n,title:t.label,description:t.description??c?.description})}function y(e){let{item:t}=e;switch(t.type){case"link":return r.createElement(v,{item:t});case"category":return r.createElement(f,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function b(e){let{className:t}=e;const n=(0,o.jA)();return r.createElement(g,{items:n.items,className:t})}function g(e){const{items:t,className:n}=e;if(!t)return r.createElement(b,e);const a=(0,o.MN)(t);return r.createElement("section",{className:(0,c.Z)("row",n)},a.map(((e,t)=>r.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},r.createElement(y,{item:e})))))}},8967:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var r=n(7462),c=(n(7294),n(3905)),o=n(2991),a=n(3438);const i={sidebar_class_name:"exclude_from_sidebar"},s="Advanced Topics",l={unversionedId:"advanced/index",id:"advanced/index",title:"Advanced Topics",description:"advanced-topics-custom-content-top}",source:"@site/docs/advanced/index.md",sourceDirName:"advanced",slug:"/advanced/",permalink:"/livecodes/docs/advanced/",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/advanced/index.md",tags:[],version:"current",frontMatter:{sidebar_class_name:"exclude_from_sidebar"},sidebar:"docsSidebar",previous:{title:"Vue SDK",permalink:"/livecodes/docs/sdk/vue"},next:{title:"Custom Settings",permalink:"/livecodes/docs/advanced/custom-settings"}},d={},u=[],m={toc:u};function p(e){let{components:t,...n}=e;return(0,c.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"advanced-topics-custom-content-top"},"Advanced Topics"),(0,c.kt)(o.Z,{items:(0,a.jA)().items.filter((e=>"languages/index"!==e.docId)),mdxType:"DocCardList"}))}p.isMDXComponent=!0}}]);