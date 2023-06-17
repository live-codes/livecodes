"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7242],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),u=r,k=d["".concat(s,".").concat(u)]||d[u]||m[u]||o;return n?a.createElement(k,i(i({ref:t},c),{},{components:n})):a.createElement(k,i({ref:t},c))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6318:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={},i="React SDK",l={unversionedId:"sdk/react",id:"sdk/react",title:"React SDK",description:"The react SDK is a thin wrapper around the JavaScript SDK to provide an easy to use react component, yet retaining the full power, by having access to the SDK methods.",source:"@site/docs/sdk/react.md",sourceDirName:"sdk",slug:"/sdk/react",permalink:"/livecodes/docs/sdk/react",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/sdk/react.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"JS/TS SDK",permalink:"/livecodes/docs/sdk/js-ts"},next:{title:"Vue SDK",permalink:"/livecodes/docs/sdk/vue"}},s={},p=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"TypeScript Support",id:"typescript-support",level:3},{value:"Props",id:"props",level:3}],c={toc:p};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"react-sdk"},"React SDK"),(0,r.kt)("p",null,"The react SDK is a thin wrapper around the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts"},"JavaScript SDK")," to provide an easy to use react component, yet retaining the full power, by having access to the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#sdk-methods"},"SDK methods"),"."),(0,r.kt)("p",null,"It has a very simple ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/develop/src/sdk/react.tsx"},"implementation")," which you can easily modify in case you need."),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("p",null,"Please refer to the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/#installation"},"SDK installation")," section."),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"The react component is provided as the default export from ",(0,r.kt)("inlineCode",{parentName:"p"},"livecodes/react"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="JSX"',title:'"JSX"'},"import LiveCodes from 'livecodes/react';\n\nexport const Playground = () => <LiveCodes />;\n")),(0,r.kt)("h3",{id:"typescript-support"},"TypeScript Support"),(0,r.kt)("p",null,"Prop types are exported as ",(0,r.kt)("inlineCode",{parentName:"p"},"Props")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"livecodes/react"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="TSX"',title:'"TSX"'},"import LiveCodes, { type Props } from 'livecodes/react';\n\nconst options: Props = {\n  // embed options\n};\nexport const Playground = () => <LiveCodes {...options} />;\n")),(0,r.kt)("p",null,"TypeScript types are ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/api/modules"},"documented here"),"."),(0,r.kt)("h3",{id:"props"},"Props"),(0,r.kt)("p",null,"All ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#embed-options"},"embed options")," are available as props with the corresponding types."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="JSX"',title:'"JSX"'},"import LiveCodes from 'livecodes/react';\n\nconst config = {\n  markup: {\n    language: 'markdown',\n    content: '# Hello World!',\n  },\n};\nexport const Playground = () => <LiveCodes config={config} view=\"result\" />;\n")),(0,r.kt)("p",null,"In addition, the following props are also available:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"className")),(0,r.kt)("p",{parentName:"li"},"Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),"."),(0,r.kt)("p",{parentName:"li"},"Class name(s) to add to playground container element."),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="JSX"',title:'"JSX"'},"import LiveCodes from 'livecodes/react';\n\nexport const Playground = () => <LiveCodes className=\"centered\" />;\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"height")),(0,r.kt)("p",{parentName:"li"},"Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),"."),(0,r.kt)("p",{parentName:"li"},"Sets the hight of playground container element."),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="JSX"',title:'"JSX"'},"import LiveCodes from 'livecodes/react';\n\nexport const Playground = () => <LiveCodes height=\"500px\" />;\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"style")),(0,r.kt)("p",{parentName:"li"},"Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"Record<string, string>"),"."),(0,r.kt)("p",{parentName:"li"},"Defines styles to add to playground container element. Styles set here override the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#default-styles"},"default styles"),"."),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="JSX"',title:'"JSX"'},"import LiveCodes from 'livecodes/react';\n\nconst style = {\n  margin: 'auto',\n  width: '80%',\n};\nexport const Playground = () => <LiveCodes style={style} />;\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"sdkReady")),(0,r.kt)("p",{parentName:"li"},"Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"(sdk: Playground) => void"),"."),(0,r.kt)("p",{parentName:"li"},"A callback function, that is provided with an instance of the ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts"},"JavaScript SDK")," representing the current playground. This allows making use of full capability of the SDK by calling ",(0,r.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#sdk-methods"},"SDK methods"),"."),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="TSX"',title:'"TSX"'},"import LiveCodes from 'livecodes/react';\nimport type { Playground } from 'livecodes';\n\nexport const App = () => {\n  let playground: Playground | undefined;\n\n  const onReady = (sdk: Playground) => {\n    playground = sdk;\n  };\n\n  const run = async () => {\n    await playground?.run();\n  };\n\n  return (\n    <>\n      <LiveCodes sdkReady={onReady} />\n      <button onClick={run}>Run</button>\n    </>\n  );\n};\n")))))}d.isMDXComponent=!0}}]);