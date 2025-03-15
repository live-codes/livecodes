"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["5031"],{4883:function(e,s,n){n.r(s),n.d(s,{default:()=>h,frontMatter:()=>r,metadata:()=>t,assets:()=>a,toc:()=>c,contentTitle:()=>l});var t=JSON.parse('{"id":"features/result","title":"Result Page","description":"The output of a LiveCodes project is a single HTML page. This includes the (compiled) code from editors (markup + style + script) and external resources (CSS + JS), in addition to customizations specified in custom settings.","source":"@site/docs/features/result.mdx","sourceDirName":"features","slug":"/features/result","permalink":"/livecodes/docs/features/result","draft":false,"unlisted":false,"editUrl":"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/result.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"CSS","permalink":"/livecodes/docs/features/css"},"next":{"title":"External Resources","permalink":"/livecodes/docs/features/external-resources"}}'),i=n("5893"),o=n("65");let r={},l="Result Page",a={},c=[{value:"Result page structure",id:"result-page-structure",level:2},{value:"Result page zoom",id:"result-page-zoom",level:2},{value:"Open in new window",id:"open-in-new-window",level:2},{value:"Show Spacings",id:"show-spacings",level:2},{value:"Scroll Position",id:"scroll-position",level:2}];function d(e){let s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"result-page",children:"Result Page"})}),"\n",(0,i.jsxs)(s.p,{children:["The output of a LiveCodes project is a single HTML page. This includes the (compiled) code from editors (markup + style + script) and ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/external-resources",children:"external resources"})," (CSS + JS), in addition to customizations specified in ",(0,i.jsx)(s.a,{href:"/livecodes/docs/advanced/custom-settings",children:"custom settings"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:["This page is loaded in a ",(0,i.jsx)(s.a,{href:"https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/",children:"sandboxed iframe"})," with a unique origin to enforce ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/security",children:"security"}),". The page code is sent to the iframe in the browser (no code is sent to the server)."]}),"\n",(0,i.jsx)(s.h2,{id:"result-page-structure",children:"Result page structure"}),"\n",(0,i.jsxs)(s.p,{children:["This is the pseudo-code for the structure of the result page (inspired by ",(0,i.jsx)(s.a,{href:"https://blog.codepen.io/documentation/preview-template/",children:"CodePen docs"}),")."]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-html",children:'<!DOCTYPE html>\n<html { Config.htmlAttrs }*>\n  <head>\n    <title>{ Config.title }*</title>\n    <meta name="title" content="{ Config.title }*" />\n    <meta name="description" content="{ Config.description }*" />\n\n    { Config.head }*\n\n    { CSS preset }**\n\n    { External CSS }**\n\n    { Editor CSS }\n\n    { Language(s) run-time CSS }***\n\n    { Language(s) run-time JS }***\n\n    { Import map }****\n\n  </head>\n  <body>\n\n    { Editor HTML }\n\n    { External JS }**\n\n    { Editor JS }\n\n    { Spacing script (if enabled) }*****\n\n    { Test scripts (if enabled) }******\n\n  </body>\n</html>\n'})}),"\n",(0,i.jsxs)(s.p,{children:["* See ",(0,i.jsx)(s.a,{href:"/livecodes/docs/configuration/configuration-object",children:"Configuration Object"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:["** See ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/external-resources",children:"External Resources"}),"."]}),"\n",(0,i.jsx)(s.p,{children:"*** Although most languages are compiled and then the compiled code is used, some languages require run-time scripts or styles to run in the result page."}),"\n",(0,i.jsxs)(s.p,{children:["**** See ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/module-resolution",children:"Module Resolution"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:["***** See ",(0,i.jsx)(s.a,{href:"#show-spacings",children:"Show Sapcings"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:["****** See ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/tests",children:"Tests"}),"."]}),"\n",(0,i.jsx)(s.h2,{id:"result-page-zoom",children:"Result page zoom"}),"\n",(0,i.jsxs)(s.p,{children:["The zoom button in the ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/tools-pane",children:"tools pane"})," below result page, allows you to toggle result page zoom (1x/0.5x/0.25x)."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{alt:"Result page zoom",src:n(8811).Z+"",width:"1010",height:"390"})}),"\n",(0,i.jsx)(s.h2,{id:"open-in-new-window",children:"Open in new window"}),"\n",(0,i.jsxs)(s.p,{children:["From the ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/tools-pane",children:"tools pane"}),", the result page can be viewed in a separate window."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{alt:"Open in new window",src:n(6508).Z+"",width:"994",height:"399"})}),"\n",(0,i.jsxs)(s.admonition,{type:"caution",children:[(0,i.jsxs)(s.p,{children:["Please note that the URL of the result page shown in the new window is a ",(0,i.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#parameters",children:"temporary URL"}),", for local preview. Sharing this URL will not work."]}),(0,i.jsxs)(s.p,{children:["If you need to share a project, use the ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/share",children:"Share screen"}),". While, if you need to share the result page use the ",(0,i.jsx)(s.code,{children:"result"})," ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/display-modes",children:"display mode"})," or the ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/broadcast",children:"broadcast"})," feature."]})]}),"\n",(0,i.jsx)(s.h2,{id:"show-spacings",children:"Show Spacings"}),"\n",(0,i.jsxs)(s.p,{children:["The spacing between elements on the result page can be measured by adding ",(0,i.jsx)(s.a,{href:"https://spacingjs.com/",children:"Spacing.js"})," to the result page."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{alt:"Show Spacings",src:n(1593).Z+"",width:"1102",height:"553"})}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:["Enable ",(0,i.jsx)(s.code,{children:"Show Spacing"})," setting in the Settings menu."]}),"\n",(0,i.jsx)(s.li,{children:"Move your cursor to an element and press Alt on Windows, or Option on a Mac."}),"\n",(0,i.jsx)(s.li,{children:"Move your cursor to another element, the measurement results will be there."}),"\n"]}),"\n",(0,i.jsx)(s.admonition,{type:"note",children:(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"Show Spacing"})," is only available when viewing the result page in the app. It is not added to the result page for example when ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/export",children:"exported"})," or ",(0,i.jsx)(s.a,{href:"/livecodes/docs/features/deploy",children:"deployed"}),"."]})}),"\n",(0,i.jsx)(s.h2,{id:"scroll-position",children:"Scroll Position"}),"\n",(0,i.jsx)(s.p,{children:"By default, the result page scroll position is maintained after reloads."}),"\n",(0,i.jsxs)(s.p,{children:["To disable this behavior, set the ",(0,i.jsx)(s.a,{href:"/livecodes/docs/configuration/query-params",children:"query param"})," ",(0,i.jsx)(s.code,{children:"scrollPosition"})," to ",(0,i.jsx)(s.code,{children:"false"}),"."]}),"\n",(0,i.jsx)(s.p,{children:"Example:"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://livecodes.io?scrollPosition=false",children:"https://livecodes.io?scrollPosition=false"})})]})}function h(e={}){let{wrapper:s}={...(0,o.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},6508:function(e,s,n){n.d(s,{Z:function(){return t}});let t=n.p+"assets/images/new-window-cd70a363844414d3ee937eed20e93e22.jpg"},1593:function(e,s,n){n.d(s,{Z:function(){return t}});let t=n.p+"assets/images/spacing-05e1a59a21c8781758c12d8841027655.jpg"},8811:function(e,s,n){n.d(s,{Z:function(){return t}});let t=n.p+"assets/images/zoom-439a6d440a32d8eeba41dbe6426d3b9c.jpg"},65:function(e,s,n){n.d(s,{Z:function(){return l},a:function(){return r}});var t=n(7294);let i={},o=t.createContext(i);function r(e){let s=t.useContext(o);return t.useMemo(function(){return"function"==typeof e?e(s):{...s,...e}},[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(o.Provider,{value:s},e.children)}}}]);