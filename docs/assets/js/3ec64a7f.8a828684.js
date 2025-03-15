"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7649"],{3782:function(e,n,d){d.r(n),d.d(n,{default:()=>h,frontMatter:()=>o,metadata:()=>l,assets:()=>t,toc:()=>r,contentTitle:()=>c});var l=JSON.parse('{"id":"api/internal/interfaces/AppConfig","title":"Interface: AppConfig","description":"These are properties that define how the app behaves.","source":"@site/docs/api/internal/interfaces/AppConfig.md","sourceDirName":"api/internal/interfaces","slug":"/api/internal/interfaces/AppConfig","permalink":"/livecodes/docs/api/internal/interfaces/AppConfig","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/api/internal/interfaces/AppConfig.md","tags":[],"version":"current","frontMatter":{}}'),s=d("5893"),i=d("65");let o={},c="Interface: AppConfig",t={},r=[{value:"Extended by",id:"extended-by",level:2},{value:"Properties",id:"properties",level:2},{value:"allowLangChange",id:"allowlangchange",level:3},{value:"Default",id:"default",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"mode",id:"mode",level:3},{value:"Default",id:"default-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"readonly",id:"readonly",level:3},{value:"Default",id:"default-2",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"tools",id:"tools",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"active",id:"active",level:5},{value:"enabled",id:"enabled",level:5},{value:"status",id:"status",level:5},{value:"Default",id:"default-3",level:4},{value:"Example",id:"example",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"view?",id:"view",level:3},{value:"Default",id:"default-4",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"zoom",id:"zoom",level:3},{value:"Defined in",id:"defined-in-5",level:4}];function a(e){let n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"interface-appconfig",children:"Interface: AppConfig"})}),"\n",(0,s.jsx)(n.p,{children:"These are properties that define how the app behaves."}),"\n",(0,s.jsx)(n.h2,{id:"extended-by",children:"Extended by"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"/livecodes/docs/api/interfaces/Config",children:(0,s.jsx)(n.code,{children:"Config"})})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(n.h3,{id:"allowlangchange",children:"allowLangChange"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"allowLangChange"}),": ",(0,s.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["If ",(0,s.jsx)(n.code,{children:"false"}),", the UI will not show the menu that allows changing editor language."]}),"\n",(0,s.jsx)(n.h4,{id:"default",children:"Default"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"true\n"})}),"\n",(0,s.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/live-codes/livecodes/blob/b06e53d11f89bb42b0b22b8d86e82047ad153098/src/sdk/models.ts#L603",children:"models.ts:603"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"mode",children:"mode"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"mode"}),": ",(0,s.jsx)(n.code,{children:'"focus"'})," | ",(0,s.jsx)(n.code,{children:'"full"'})," | ",(0,s.jsx)(n.code,{children:'"result"'})," | ",(0,s.jsx)(n.code,{children:'"editor"'})," | ",(0,s.jsx)(n.code,{children:'"lite"'})," | ",(0,s.jsx)(n.code,{children:'"simple"'})," | ",(0,s.jsx)(n.code,{children:'"codeblock"'})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Sets the ",(0,s.jsx)(n.a,{href:"https://livecodes.io/docs/features/display-modes",children:"display mode"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"default-1",children:"Default"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'"full"\n'})}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/live-codes/livecodes/blob/b06e53d11f89bb42b0b22b8d86e82047ad153098/src/sdk/models.ts#L615",children:"models.ts:615"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"readonly",children:"readonly"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"readonly"}),": ",(0,s.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["If ",(0,s.jsx)(n.code,{children:"true"}),", editors are loaded in read-only mode, where the user is not allowed to change the code."]}),"\n",(0,s.jsxs)(n.p,{children:["By default, when readonly is set to true, the light-weight code editor ",(0,s.jsx)(n.a,{href:"https://livecodes.io/docs/features/editor-settings#code-editor",children:"CodeJar"})," is used.\nIf you wish to use another editor, set the ",(0,s.jsx)(n.a,{href:"https://livecodes.io/docs/configuration/configuration-object#editor",children:"editor"})," property."]}),"\n",(0,s.jsx)(n.h4,{id:"default-2",children:"Default"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"false\n"})}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/live-codes/livecodes/blob/b06e53d11f89bb42b0b22b8d86e82047ad153098/src/sdk/models.ts#L597",children:"models.ts:597"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"tools",children:"tools"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"tools"}),": ",(0,s.jsx)(n.code,{children:"Partial"}),"<",(0,s.jsx)(n.code,{children:"object"}),">"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Sets enabled and active tools and status of ",(0,s.jsx)(n.a,{href:"https://livecodes.io/docs/features/tools-pane",children:"tools pane"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"type-declaration",children:"Type declaration"}),"\n",(0,s.jsx)(n.h5,{id:"active",children:"active"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"active"}),": ",(0,s.jsx)(n.code,{children:'""'})," | ",(0,s.jsx)(n.code,{children:'"console"'})," | ",(0,s.jsx)(n.code,{children:'"compiled"'})," | ",(0,s.jsx)(n.code,{children:'"tests"'})]}),"\n"]}),"\n",(0,s.jsx)(n.h5,{id:"enabled",children:"enabled"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"enabled"}),": ",(0,s.jsx)(n.code,{children:'"all"'})," | (",(0,s.jsx)(n.code,{children:'"console"'})," | ",(0,s.jsx)(n.code,{children:'"compiled"'})," | ",(0,s.jsx)(n.code,{children:'"tests"'}),")[]"]}),"\n"]}),"\n",(0,s.jsx)(n.h5,{id:"status",children:"status"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"status"}),": ",(0,s.jsx)(n.a,{href:"/livecodes/docs/api/internal/type-aliases/ToolsPaneStatus",children:(0,s.jsx)(n.code,{children:"ToolsPaneStatus"})})]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"default-3",children:"Default"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'{ enabled: "all", active: "", status: "" }\n'})}),"\n",(0,s.jsx)(n.h4,{id:"example",children:"Example"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'{\n  "tools": {\n    "enabled": ["console", "compiled"],\n    "active": "console",\n    "status": "open"\n  }\n}\n'})}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/live-codes/livecodes/blob/b06e53d11f89bb42b0b22b8d86e82047ad153098/src/sdk/models.ts#L631",children:"models.ts:631"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"view",children:"view?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"view"}),": ",(0,s.jsx)(n.code,{children:'"split"'})," | ",(0,s.jsx)(n.code,{children:'"result"'})," | ",(0,s.jsx)(n.code,{children:'"editor"'})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Sets the ",(0,s.jsx)(n.a,{href:"https://livecodes.io/docs/features/default-view",children:"default view"})," for the playground."]}),"\n",(0,s.jsx)(n.h4,{id:"default-4",children:"Default"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'"split"\n'})}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/live-codes/livecodes/blob/b06e53d11f89bb42b0b22b8d86e82047ad153098/src/sdk/models.ts#L609",children:"models.ts:609"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"zoom",children:"zoom"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"zoom"}),": ",(0,s.jsx)(n.code,{children:"0.25"})," | ",(0,s.jsx)(n.code,{children:"0.5"})," | ",(0,s.jsx)(n.code,{children:"1"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Sets result page ",(0,s.jsx)(n.a,{href:"https://livecodes.io/docs/features/result#result-page-zoom",children:"zoom level"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/live-codes/livecodes/blob/b06e53d11f89bb42b0b22b8d86e82047ad153098/src/sdk/models.ts#L640",children:"models.ts:640"})})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},65:function(e,n,d){d.d(n,{Z:function(){return c},a:function(){return o}});var l=d(7294);let s={},i=l.createContext(s);function o(e){let n=l.useContext(i);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),l.createElement(i.Provider,{value:n},e.children)}}}]);