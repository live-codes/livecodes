"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7306],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>C});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},p=Object.keys(e);for(a=0;a<p.length;a++)t=p[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)t=p[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var o=a.createContext({}),d=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},m=function(e){var n=d(e.components);return a.createElement(o.Provider,{value:n},e.children)},s="mdxType",k={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},N=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,p=e.originalType,o=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),s=d(t),N=i,C=s["".concat(o,".").concat(N)]||s[N]||k[N]||p;return t?a.createElement(C,r(r({ref:n},m),{},{components:t})):a.createElement(C,r({ref:n},m))}));function C(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var p=t.length,r=new Array(p);r[0]=N;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l[s]="string"==typeof e?e:i,r[1]=l;for(var d=2;d<p;d++)r[d]=t[d];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}N.displayName="MDXCreateElement"},4440:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>s,frontMatter:()=>p,metadata:()=>l,toc:()=>d});var a=t(7462),i=(t(7294),t(3905));const p={id:"modules",title:"livecodes",sidebar_label:"Exports",sidebar_position:.5,custom_edit_url:null},r=void 0,l={unversionedId:"api/modules",id:"api/modules",title:"livecodes",description:"Modules",source:"@site/docs/api/modules.md",sourceDirName:"api",slug:"/api/modules",permalink:"/livecodes/docs/api/modules",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:.5,frontMatter:{id:"modules",title:"livecodes",sidebar_label:"Exports",sidebar_position:.5,custom_edit_url:null}},o={},d=[{value:"Modules",id:"modules",level:2},{value:"Interfaces",id:"interfaces",level:2},{value:"Type Aliases",id:"type-aliases",level:2},{value:"Language",id:"language",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"Functions",id:"functions",level:2},{value:"createPlayground",id:"createplayground",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"getPlaygroundUrl",id:"getplaygroundurl",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-3",level:4}],m={toc:d};function s(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"modules"},"Modules"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/livecodes/docs/api/modules/internal"},"_","internal"))),(0,i.kt)("h2",{id:"interfaces"},"Interfaces"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/livecodes/docs/api/interfaces/Code"},"Code")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/livecodes/docs/api/interfaces/Config"},"Config")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/livecodes/docs/api/interfaces/EmbedOptions"},"EmbedOptions")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/livecodes/docs/api/interfaces/Playground"},"Playground"))),(0,i.kt)("h2",{id:"type-aliases"},"Type Aliases"),(0,i.kt)("h3",{id:"language"},"Language"),(0,i.kt)("p",null,"\u01ac ",(0,i.kt)("strong",{parentName:"p"},"Language"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"html"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"htm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"markdown"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"md"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"mdown"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"mkdn"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"mdx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"astro"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pug"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"jade"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"haml"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"asciidoc"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"adoc"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"asc"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"mustache"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"handlebars"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"hbs"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ejs"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"eta"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"nunjucks"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"njk"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"liquid"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"liquidjs"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"dot"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"twig"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"vento"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"vto"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"art-template"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"art"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"bbcode"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"bb"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"mjml"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"diagrams"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"diagram"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"graph"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"plt"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"richtext"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rte"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rich"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rte.html"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"css"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"scss"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"sass"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"less"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"stylus"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"styl"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"stylis"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"postcss"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"javascript"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"js"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"json"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"babel"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"es"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"sucrase"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"typescript"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"flow"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ts"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"jsx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"tsx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"react-native"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"react-native.jsx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"react-native-tsx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"react-native.tsx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"vue"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"vue3"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"vue2"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"svelte"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"stencil"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"stencil.tsx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"solid"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"solid.jsx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"solid.tsx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"riot"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"riotjs"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"malina"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"malinajs"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"xht"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"coffeescript"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"coffee"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"livescript"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ls"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"civet"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"clio"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"imba"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"assemblyscript"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"as"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"python"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"py"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pyodide"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"python-wasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"py-wasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pythonwasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pywasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"py3"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wasm.py"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"r"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rlang"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rstats"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"r-wasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ruby"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rb"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ruby-wasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wasm.rb"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rubywasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"go"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"golang"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"php"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"php-wasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"phpwasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wasm.php"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cpp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"c"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"C"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cxx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"c++"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cppm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ixx"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ii"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"hpp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"h"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cpp-wasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cppwasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cwasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wasm.cpp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"clang"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"clang.cpp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"perl"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pl"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"lua"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"lua-wasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"luawasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wasm.lua"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"teal"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"tl"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"fennel"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"fnl"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"julia"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"jl"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"scheme"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"scm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"commonlisp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"common-lisp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"lisp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"clojurescript"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"clojure"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cljs"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"clj"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"cljc"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"edn"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"gleam"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rescript"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"res"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"resi"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"reason"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"re"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"rei"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ocaml"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"ml"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"mli"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"tcl"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wat"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wast"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"webassembly"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"wasm"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"Binary"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"csharp"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"sql"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"sqlite"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"sqlite3"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pg.sql"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pgsql.sql"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pgsql"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pg"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pglite"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pglite.sql"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"postgresql"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"postgres"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"postgre.sql"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"postgresql.sql"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"prolog.pl"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"prolog"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"blockly"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"blockly.xml"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"xml"')," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},'"pintora"')),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/dfe9c87c4ed452c872d073fb948ae23b5517fcbf/src/sdk/models.ts#L169"},"models.ts:169")),(0,i.kt)("h2",{id:"functions"},"Functions"),(0,i.kt)("h3",{id:"createplayground"},"createPlayground"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"createPlayground"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"container"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"options?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/livecodes/docs/api/interfaces/Playground"},(0,i.kt)("inlineCode",{parentName:"a"},"Playground")),">"),(0,i.kt)("p",null,"Creates a LiveCodes playground."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"container")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},"HTMLElement")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The container where the playground will be rendered.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/livecodes/docs/api/interfaces/EmbedOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"EmbedOptions"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The embed options for the playground (optional).")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/livecodes/docs/api/interfaces/Playground"},(0,i.kt)("inlineCode",{parentName:"a"},"Playground")),">"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A promise that resolves to the created playground.")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/dfe9c87c4ed452c872d073fb948ae23b5517fcbf/src/sdk/index.ts#L25"},"index.ts:25")),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"createPlayground"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"options"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/livecodes/docs/api/interfaces/Playground"},(0,i.kt)("inlineCode",{parentName:"a"},"Playground")),">"),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/livecodes/docs/api/interfaces/EmbedOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"EmbedOptions"))," & ","{"," ",(0,i.kt)("inlineCode",{parentName:"td"},"view"),": ",(0,i.kt)("inlineCode",{parentName:"td"},'"headless"'),"  }")))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/livecodes/docs/api/interfaces/Playground"},(0,i.kt)("inlineCode",{parentName:"a"},"Playground")),">"),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/dfe9c87c4ed452c872d073fb948ae23b5517fcbf/src/sdk/index.ts#L29"},"index.ts:29")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getplaygroundurl"},"getPlaygroundUrl"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getPlaygroundUrl"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"options?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/livecodes/docs/api/interfaces/EmbedOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"EmbedOptions")))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes/blob/dfe9c87c4ed452c872d073fb948ae23b5517fcbf/src/sdk/index.ts#L381"},"index.ts:381")))}s.isMDXComponent=!0}}]);