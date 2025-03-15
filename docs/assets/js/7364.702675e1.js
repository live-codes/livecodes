(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["7364"],{7594:function(e,t){function n(e){let t,n=[];for(let s of e.split(",").map(e=>e.trim()))if(/^-?\d+$/.test(s))n.push(parseInt(s,10));else if(t=s.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,s,o,r]=t;if(s&&r){let e=(s=parseInt(s))<(r=parseInt(r))?1:-1;("-"===o||".."===o||"\u2025"===o)&&(r+=e);for(let t=s;t!==r;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},1705:function(e,t,n){"use strict";n.d(t,{Z:()=>W});var s=n("5893"),o=n("7294"),r=n("6735"),c=n("7026"),a=n("4200"),l=n("6009");function i(){let{prism:e}=(0,l.L)(),{colorMode:t}=(0,a.I)(),n=e.theme,s=e.darkTheme||n;return"dark"===t?s:n}var u=n("6171"),d=n("7594"),m=n.n(d);let p=/title=(?<quote>["'])(?<title>.*?)\1/,b=/\{(?<range>[\d,-]+)\}/,h={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},f={...h,lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}},g=Object.keys(h);function j(e,t){let n=e.map(e=>{let{start:n,end:s}=f[e];return`(?:${n}\\s*(${t.flatMap(e=>[e.line,e.block?.start,e.block?.end].filter(Boolean)).join("|")})\\s*${s})`}).join("|");return RegExp(`^\\s*(?:${n})\\s*$`)}function k(e){let{as:t,...n}=e,o=function(e){let t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach(e=>{let[s,o]=e,r=t[s];r&&"string"==typeof o&&(n[r]=o)}),n}(i());return(0,s.jsx)(t,{...n,style:o,className:(0,c.Z)(n.className,"codeBlockContainer_Ckt0",u.k.common.codeBlock)})}let B={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function x(e){let{children:t,className:n}=e;return(0,s.jsx)(k,{as:"pre",tabIndex:0,className:(0,c.Z)(B.codeBlockStandalone,"thin-scrollbar",n),children:(0,s.jsx)("code",{className:B.codeBlockLines,children:t})})}var y=n("1934");let v={attributes:!0,characterData:!0,childList:!0,subtree:!0};var w=n("3229");let N={codeLine:"codeLine_lJS_",codeLineNumber:"codeLineNumber_Tfdd",codeLineContent:"codeLineContent_feaV"};function C(e){let{line:t,classNames:n,showLineNumbers:o,getLineProps:r,getTokenProps:a}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");let l=r({line:t,className:(0,c.Z)(n,o&&N.codeLine)}),i=t.map((e,t)=>(0,s.jsx)("span",{...a({token:e})},t));return(0,s.jsxs)("span",{...l,children:[o?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{className:N.codeLineNumber}),(0,s.jsx)("span",{className:N.codeLineContent,children:i})]}):i,(0,s.jsx)("br",{})]})}var L=n("7670");function E(e){return(0,s.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,s.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}function I(e){return(0,s.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,s.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}let S={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function _(e){let{code:t,className:n}=e,[r,a]=(0,o.useState)(!1),l=(0,o.useRef)(void 0),i=(0,o.useCallback)(()=>{!function(e){let{target:t=document.body}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"!=typeof e)throw TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);let n=document.createElement("textarea"),s=document.activeElement;n.value=e,n.setAttribute("readonly",""),n.style.contain="strict",n.style.position="absolute",n.style.left="-9999px",n.style.fontSize="12pt";let o=document.getSelection(),r=o.rangeCount>0&&o.getRangeAt(0);t.append(n),n.select(),n.selectionStart=0,n.selectionEnd=e.length;let c=!1;try{document.execCommand("copy")}catch{}n.remove(),r&&(o.removeAllRanges(),o.addRange(r)),s&&s.focus()}(t),a(!0),l.current=window.setTimeout(()=>{a(!1)},1e3)},[t]);return(0,o.useEffect)(()=>()=>window.clearTimeout(l.current),[]),(0,s.jsx)("button",{type:"button","aria-label":r?(0,L.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,L.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,L.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,c.Z)("clean-btn",n,S.copyButton,r&&S.copyButtonCopied),onClick:i,children:(0,s.jsxs)("span",{className:S.copyButtonIcons,"aria-hidden":"true",children:[(0,s.jsx)(E,{className:S.copyButtonIcon}),(0,s.jsx)(I,{className:S.copyButtonSuccessIcon})]})})}function A(e){return(0,s.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,s.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}let $={wordWrapButtonIcon:"wordWrapButtonIcon_Bwma",wordWrapButtonEnabled:"wordWrapButtonEnabled_EoeP"};function T(e){let{className:t,onClick:n,isEnabled:o}=e,r=(0,L.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,s.jsx)("button",{type:"button",onClick:n,className:(0,c.Z)("clean-btn",t,o&&$.wordWrapButtonEnabled),"aria-label":r,title:r,children:(0,s.jsx)(A,{className:$.wordWrapButtonIcon,"aria-hidden":"true"})})}function H(e){var t;let{children:n,className:r="",metastring:a,title:u,showLineNumbers:d,language:h}=e,{prism:{defaultLanguage:f,magicComments:x}}=(0,l.L)(),N=(t=h??function(e){let t=e.split(" ").find(e=>e.startsWith("language-"));return t?.replace(/language-/,"")}(r)??f,t?.toLowerCase()),L=i(),E=function(){let[e,t]=(0,o.useState)(!1),[n,s]=(0,o.useState)(!1),r=(0,o.useRef)(null),c=(0,o.useCallback)(()=>{let n=r.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t(e=>!e)},[r,e]),a=(0,o.useCallback)(()=>{let{scrollWidth:e,clientWidth:t}=r.current;s(e>t||r.current.querySelector("code").hasAttribute("style"))},[r]);return!function(e,t){let[n,s]=(0,o.useState)(),r=(0,o.useCallback)(()=>{s(e.current?.closest("[role=tabpanel][hidden]"))},[e,s]);(0,o.useEffect)(()=>{r()},[r]),function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:v,s=(0,y.zX)(t),r=(0,y.Ql)(n);(0,o.useEffect)(()=>{let t=new MutationObserver(s);return e&&t.observe(e,r),()=>t.disconnect()},[e,s,r])}(n,e=>{e.forEach(e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),r())})},{attributes:!0,characterData:!1,childList:!1,subtree:!1})}(r,a),(0,o.useEffect)(()=>{a()},[e,a]),(0,o.useEffect)(()=>(window.addEventListener("resize",a,{passive:!0}),()=>{window.removeEventListener("resize",a)}),[a]),{codeBlockRef:r,isEnabled:e,isCodeScrollable:n,toggle:c}}(),I=(a?.match(p)?.groups.title??"")||u,{lineClassNames:S,code:A}=function(e,t){let n=e.replace(/\n$/,""),{language:s,magicComments:o,metastring:r}=t;if(r&&b.test(r)){let e=r.match(b).groups.range;if(0===o.length)throw Error(`A highlight range has been given in code block's metastring (\`\`\` ${r}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);let t=o[0].className;return{lineClassNames:Object.fromEntries(m()(e).filter(e=>e>0).map(e=>[e-1,[t]])),code:n}}if(void 0===s)return{lineClassNames:{},code:n};let c=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return j(["js","jsBlock"],t);case"jsx":case"tsx":return j(["js","jsBlock","jsx"],t);case"html":return j(["js","jsBlock","html"],t);case"python":case"py":case"bash":return j(["bash"],t);case"markdown":case"md":return j(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return j(["tex"],t);case"lua":case"haskell":return j(["lua"],t);case"sql":return j(["lua","jsBlock"],t);case"wasm":return j(["wasm"],t);case"vb":case"vba":case"visual-basic":return j(["vb","rem"],t);case"vbnet":return j(["vbnet","rem"],t);case"batch":return j(["rem"],t);case"basic":return j(["rem","f90"],t);case"fsharp":return j(["js","ml"],t);case"ocaml":case"sml":return j(["ml"],t);case"fortran":return j(["f90"],t);case"cobol":return j(["cobol"],t);default:return j(g,t)}}(s,o),a=n.split("\n"),l=Object.fromEntries(o.map(e=>[e.className,{start:0,range:""}])),i=Object.fromEntries(o.filter(e=>e.line).map(e=>{let{className:t,line:n}=e;return[n,t]})),u=Object.fromEntries(o.filter(e=>e.block).map(e=>{let{className:t,block:n}=e;return[n.start,t]})),d=Object.fromEntries(o.filter(e=>e.block).map(e=>{let{className:t,block:n}=e;return[n.end,t]}));for(let e=0;e<a.length;){let t=a[e].match(c);if(!t){e+=1;continue}let n=t.slice(1).find(e=>void 0!==e);i[n]?l[i[n]].range+=`${e},`:u[n]?l[u[n]].start=e:d[n]&&(l[d[n]].range+=`${l[d[n]].start}-${e-1},`),a.splice(e,1)}n=a.join("\n");let p={};return Object.entries(l).forEach(e=>{let[t,{range:n}]=e;m()(n).forEach(e=>{p[e]??=[],p[e].push(t)})}),{lineClassNames:p,code:n}}(n,{metastring:a,language:N,magicComments:x}),$=d??!!a?.includes("showLineNumbers");return(0,s.jsxs)(k,{as:"div",className:(0,c.Z)(r,N&&!r.includes(`language-${N}`)&&`language-${N}`),children:[I&&(0,s.jsx)("div",{className:B.codeBlockTitle,children:I}),(0,s.jsxs)("div",{className:B.codeBlockContent,children:[(0,s.jsx)(w.y$,{theme:L,code:A,language:N??"text",children:e=>{let{className:t,style:n,tokens:o,getLineProps:r,getTokenProps:a}=e;return(0,s.jsx)("pre",{tabIndex:0,ref:E.codeBlockRef,className:(0,c.Z)(t,B.codeBlock,"thin-scrollbar"),style:n,children:(0,s.jsx)("code",{className:(0,c.Z)(B.codeBlockLines,$&&B.codeBlockLinesWithNumbering),children:o.map((e,t)=>(0,s.jsx)(C,{line:e,getLineProps:r,getTokenProps:a,classNames:S[t],showLineNumbers:$},t))})})}}),(0,s.jsxs)("div",{className:B.buttonGroup,children:[(E.isEnabled||E.isCodeScrollable)&&(0,s.jsx)(T,{className:B.codeButton,onClick:()=>E.toggle(),isEnabled:E.isEnabled}),(0,s.jsx)(_,{className:B.codeButton,code:A})]})]})]})}function W(e){let{children:t,...n}=e,c=(0,r.Z)(),a=o.Children.toArray(t).some(e=>(0,o.isValidElement)(e))?t:Array.isArray(t)?t.join(""):t;return(0,s.jsx)("string"==typeof a?H:x,{...n,children:a},String(c))}}}]);