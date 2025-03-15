"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["3806"],{4457:function(e,s,t){t.r(s),t.d(s,{default:()=>h,frontMatter:()=>i,metadata:()=>n,assets:()=>l,toc:()=>d,contentTitle:()=>o});var n=JSON.parse('{"id":"features/data-urls","title":"Data URLs","description":"Data URLs, URLs prefixed with the data: scheme, allow content creators to embed small files inline in documents.","source":"@site/docs/features/data-urls.mdx","sourceDirName":"features","slug":"/features/data-urls","permalink":"/livecodes/docs/features/data-urls","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/data-urls.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"Code Prefill","permalink":"/livecodes/docs/features/code-prefill"},"next":{"title":"Deploy","permalink":"/livecodes/docs/features/deploy"}}'),a=t("5893"),r=t("65");let i={},o="Data URLs",l={},d=[{value:"Creating data URLs",id:"creating-data-urls",level:2},{value:"Assets",id:"assets",level:3},{value:"&quot;Copy code as data URL&quot; button",id:"copy-code-as-data-url-button",level:3},{value:"Consuming data URLs",id:"consuming-data-urls",level:2},{value:"Example",id:"example",level:2},{value:"Related",id:"related",level:2}];function c(e){let s={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.header,{children:(0,a.jsx)(s.h1,{id:"data-urls",children:"Data URLs"})}),"\n",(0,a.jsxs)(s.blockquote,{children:["\n",(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.strong,{children:"Data URLs"}),", URLs prefixed with the ",(0,a.jsx)(s.code,{children:"data:"})," scheme, allow content creators to embed small files inline in documents."]}),"\n",(0,a.jsxs)(s.p,{children:["\u2014 ",(0,a.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs",children:"MDN"})]}),"\n"]}),"\n",(0,a.jsxs)(s.p,{children:["Sometimes, you need to use an external file (e.g. script, stylesheet) that is not hosted online. In this case, you can use data URLs to embed the file in your code. These can then be used similar to regular URLs (e.g. for ",(0,a.jsx)(s.code,{children:"<script src>"}),", ",(0,a.jsx)(s.code,{children:"<link href>"}),", import URL, etc.)."]}),"\n",(0,a.jsx)(s.p,{children:"LiveCodes UI allows creating and consuming these data URLs."}),"\n",(0,a.jsx)(s.h2,{id:"creating-data-urls",children:"Creating data URLs"}),"\n",(0,a.jsx)(s.p,{children:"Data URLs can be created from:"}),"\n",(0,a.jsx)(s.h3,{id:"assets",children:"Assets"}),"\n",(0,a.jsx)(s.p,{children:"For local files on user's device."}),"\n",(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.a,{href:"/livecodes/docs/features/assets",children:"Assets screen"})," can be accessed from Settings menu \u2192 Assets. This works for any file type, including text files (e.g. stylesheets or scripts) and binary files like images. Generated data URLs are saved locally in the user's browser storage and are available across projects."]}),"\n",(0,a.jsx)(s.h3,{id:"copy-code-as-data-url-button",children:'"Copy code as data URL" button'}),"\n",(0,a.jsx)(s.p,{children:"For code in code editor."}),"\n",(0,a.jsx)(s.p,{children:"The button can be found in the editor toolbar, below the code editor. This copies the code of the active editor as data URL to the clipboard."}),"\n",(0,a.jsxs)(s.p,{children:["The content is base64-encoded. Unicode content is appropriately encoded (see ",(0,a.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem",children:'The "Unicode Problem"'}),")."]}),"\n",(0,a.jsx)(s.h2,{id:"consuming-data-urls",children:"Consuming data URLs"}),"\n",(0,a.jsxs)(s.p,{children:["Data URLs can be used anywhere you use a regular URL (e.g. for ",(0,a.jsx)(s.code,{children:"<script src>"}),", ",(0,a.jsx)(s.code,{children:"<link href>"}),", import URL, etc.)."]}),"\n",(0,a.jsxs)(s.p,{children:["In addition, LiveCodes supports ",(0,a.jsx)(s.a,{href:"/livecodes/docs/features/import",children:"importing"})," data URLs, like other URLs. If the language is detected, it is loaded in the appropriate editor (e.g. ",(0,a.jsx)(s.code,{children:"data:text/typescript;charset=UTF-8;base64,...."})," is detected as TypeScript)."]}),"\n",(0,a.jsxs)(s.admonition,{type:"caution",children:[(0,a.jsxs)(s.p,{children:["Depending on the browser, there may be ",(0,a.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#common_problems",children:"length limitations"})," on URLs. So, it is generally recommended to use data URLs for small files."]}),(0,a.jsxs)(s.p,{children:["For large files, it is better to host these online. LiveCodes allows hosting assets on ",(0,a.jsx)(s.a,{href:"https://pages.github.com/",children:"GitHub Pages"})," (see ",(0,a.jsx)(s.a,{href:"/livecodes/docs/features/assets",children:"assets"}),")."]})]}),"\n",(0,a.jsx)(s.h2,{id:"example",children:"Example"}),"\n",(0,a.jsx)(s.p,{children:"If we add this this in script editor:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-js",children:"export const sayHello = (name) => 'Hello ' + name;\n"})}),"\n",(0,a.jsx)(s.p,{children:"then copy it as data URL, we will get:"}),"\n",(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.code,{children:"data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNvbnN0IHNheUhlbGxvID0gKG5hbWUpID0+ICdIZWxsbyAnICsgbmFtZTs="}),"."]}),"\n",(0,a.jsx)(s.p,{children:"This can be used (e.g. in another project) like this:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-js",children:"import { sayHello } from 'data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNvbnN0IHNheUhlbGxvID0gKG5hbWUpID0+ICdIZWxsbyAnICsgbmFtZTs=';\n\nconsole.log(sayHello('Ali'));\n"})}),"\n",(0,a.jsx)(s.h2,{id:"related",children:"Related"}),"\n",(0,a.jsxs)(s.ul,{children:["\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs",children:"Data URLs (MDN)"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.a,{href:"/livecodes/docs/features/assets",children:"Assets"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.a,{href:"/livecodes/docs/features/import",children:"Import"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.a,{href:"/livecodes/docs/features/external-resources",children:"External Resources"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.a,{href:"/livecodes/docs/features/module-resolution",children:"Module resolution"})}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.a,{href:"/livecodes/docs/features/css",children:"CSS"})}),"\n"]})]})}function h(e={}){let{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},65:function(e,s,t){t.d(s,{Z:function(){return o},a:function(){return i}});var n=t(7294);let a={},r=n.createContext(a);function i(e){let s=n.useContext(r);return n.useMemo(function(){return"function"==typeof e?e(s):{...s,...e}},[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);