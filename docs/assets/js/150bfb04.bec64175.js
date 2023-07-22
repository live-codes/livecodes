"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5768],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>h});var o=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,a=function(e,t){if(null==e)return{};var r,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=o.createContext({}),p=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):n(n({},t),e)),r},d=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(r),u=a,h=c["".concat(s,".").concat(u)]||c[u]||m[u]||i;return r?o.createElement(h,n(n({ref:t},d),{},{components:r})):o.createElement(h,n({ref:t},d))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,n=new Array(i);n[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:a,n[1]=l;for(var p=2;p<i;p++)n[p]=r[p];return o.createElement.apply(null,n)}return o.createElement.apply(null,r)}u.displayName="MDXCreateElement"},7283:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>n,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var o=r(7462),a=(r(7294),r(3905));const i={},n="Import",l={unversionedId:"features/import",id:"features/import",title:"Import",description:"Overview",source:"@site/docs/features/import.md",sourceDirName:"features",slug:"/features/import",permalink:"/livecodes/docs/features/import",draft:!1,editUrl:"https://github.com/live-codes/livecodes/tree/develop/docs/docs/features/import.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Code Snippets",permalink:"/livecodes/docs/features/snippets"},next:{title:"Export",permalink:"/livecodes/docs/features/export"}},s={},p=[{value:"Overview",id:"overview",level:2},{value:"Examples",id:"examples",level:2},{value:"Sources",id:"sources",level:2},{value:"File Selection",id:"file-selection",level:2},{value:"Import Shared Projects",id:"import-shared-projects",level:2},{value:"Import Code from DOM",id:"import-code-from-dom",level:2},{value:"Import Raw Code",id:"import-raw-code",level:2},{value:"&quot;Edit in LiveCodes&quot; Bookmarklet",id:"edit-in-livecodes-bookmarklet",level:2},{value:"Import from CodePen",id:"import-from-codepen",level:2},{value:"Import Exported LiveCodes Projects",id:"import-exported-livecodes-projects",level:2},{value:"Related",id:"related",level:2}],d={toc:p};function c(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,o.Z)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"import"},"Import"),(0,a.kt)("h2",{id:"overview"},"Overview"),(0,a.kt)("p",null,"LiveCodes supports importing code from a wide variety of sources."),(0,a.kt)("p",null,"The Import screen can be accessed from the app menu \u2192 Import."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"LiveCodes Import",src:r(7854).Z,width:"2697",height:"1581"})),(0,a.kt)("p",null,"Alternatively, a URL of any of the sources can be imported on-load by adding it as a value to ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query param")," key: ",(0,a.kt)("inlineCode",{parentName:"p"},"x"),". This is easier using the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/bookmarklet"},"bookmarklet"),"."),(0,a.kt)("p",null,"For ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/embeds"},"embedded playgrounds"),", use the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/"},"SDK")," property ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/sdk/js-ts#import"},(0,a.kt)("inlineCode",{parentName:"a"},"EmbedOptions.import")),"."),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"GitHub File:"),(0,a.kt)("p",{parentName:"li"},"URL: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/lodash/lodash/blob/master/isObject.js"},"https://github.com/lodash/lodash/blob/master/isObject.js")),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://github.com/lodash/lodash/blob/master/isObject.js"},"Open in LiveCodes"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"GitHub Directory:"),(0,a.kt)("p",{parentName:"li"},"URL: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/bradtraversy/50projects50days/tree/master/expanding-cards"},"https://github.com/bradtraversy/50projects50days/tree/master/expanding-cards")),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://github.com/bradtraversy/50projects50days/tree/master/expanding-cards"},"Open in LiveCodes"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"GitHub Gist:"),(0,a.kt)("p",{parentName:"li"},"URL: ",(0,a.kt)("a",{parentName:"p",href:"https://gist.github.com/f01deb828a42f363502fbae7964d48e9"},"https://gist.github.com/f01deb828a42f363502fbae7964d48e9")),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://gist.github.com/f01deb828a42f363502fbae7964d48e9"},"Open in LiveCodes"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"JS Bin:"),(0,a.kt)("p",{parentName:"li"},"URL: ",(0,a.kt)("a",{parentName:"p",href:"https://jsbin.com/iwovaj/73/embed?html,js,output"},"https://jsbin.com/iwovaj/73/embed?html,js,output")),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://jsbin.com/iwovaj/73/embed?html,js,output"},"Open in LiveCodes")))),(0,a.kt)("h2",{id:"sources"},"Sources"),(0,a.kt)("p",null,"Import is supported from any of the following:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"GitHub gist"),(0,a.kt)("li",{parentName:"ul"},"GitHub file"),(0,a.kt)("li",{parentName:"ul"},"Directory in a GitHub repo"),(0,a.kt)("li",{parentName:"ul"},"Gitlab snippet"),(0,a.kt)("li",{parentName:"ul"},"Gitlab file"),(0,a.kt)("li",{parentName:"ul"},"Directory in a Gitlab repo"),(0,a.kt)("li",{parentName:"ul"},"JS Bin"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/share"},"Shared projects")),(0,a.kt)("li",{parentName:"ul"},"Raw code"),(0,a.kt)("li",{parentName:"ul"},"Code in web page DOM"),(0,a.kt)("li",{parentName:"ul"},"Code in zip file"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/export"},"Exported project JSON")," (single project and bulk import)")),(0,a.kt)("p",null,"Import sources are identified by URL patterns (e.g. origin, pathname and extension)."),(0,a.kt)("h2",{id:"file-selection"},"File Selection"),(0,a.kt)("p",null,"For sources that provide multiple files (e.g. GitHub/GitLab directories, GitHub gists, GitLab snippets and zip files), a best guess is tried to load files in respective editors. Best results are when there are 3 files and each file is in a language (identified by file extension) that can be loaded to a different editor, for example:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"index.html, style.css, script.js"),(0,a.kt)("li",{parentName:"ul"},"default.pug, app.scss, main.ts")),(0,a.kt)("p",null,"Markup files starting with ",(0,a.kt)("inlineCode",{parentName:"p"},"index."),", style files starting with ",(0,a.kt)("inlineCode",{parentName:"p"},"style.")," and script files starting with ",(0,a.kt)("inlineCode",{parentName:"p"},"script.")," are given higher priority. While Markup files starting with ",(0,a.kt)("inlineCode",{parentName:"p"},"readme.")," are given lower priority."),(0,a.kt)("p",null,"Alternatively, languages and files can be specified using ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query params"),":",(0,a.kt)("br",{parentName:"p"}),"\n","?x={url}&{language1}={file1}&{language2}={file2}&{language3}={file3}"),(0,a.kt)("h2",{id:"import-shared-projects"},"Import Shared Projects"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/share"},"Shared Projects")," can be imported using the value of the query param ",(0,a.kt)("inlineCode",{parentName:"p"},"x")," generated by the Share screen. This starts with either:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"code/"),": for compressed base64-encoded project config"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"id/"),": for short URLs recognized by shared project id.")),(0,a.kt)("p",null,"Example:"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=id/bi9qszw86w3"},"https://livecodes.io/?x=id/bi9qszw86w3")),(0,a.kt)("h2",{id:"import-code-from-dom"},"Import Code from DOM"),(0,a.kt)("p",null,"If the source URL does not match one of the supported origins (GitHub, GitLab and JS Bin), the URL is fetched, its response text is parsed as ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"},"DOM")," and code is extracted from elements that match specific CSS selectors.",(0,a.kt)("br",{parentName:"p"}),"\n","(By default: ",(0,a.kt)("inlineCode",{parentName:"p"},'.livecodes [data-lang="{language}"]'),")"),(0,a.kt)("admonition",{title:"Example",type:"info"},(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<code class="livecodes">\n  <pre data-lang="html">This is identified as &lt;strong&gt;HTML&lt;/strong&gt; code</pre>\n</code>\n')),(0,a.kt)("p",{parentName:"admonition"},"The HTML editor is prefilled with: ",(0,a.kt)("inlineCode",{parentName:"p"},"This is identified as <strong>HTML</strong> code")),(0,a.kt)("p",{parentName:"admonition"},"Please note that the code should be html-encoded to avoid interference with the HTML of the page.")),(0,a.kt)("p",null,"Example:"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?x=https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html"},"https://livecodes.io/?x=https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html")),(0,a.kt)("p",null,"Alternatively, custom CSS selectors can be specified using ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query params"),":",(0,a.kt)("br",{parentName:"p"}),"\n","?x={url}&{language}-selector={selector}."),(0,a.kt)("p",null,"The following example loads the content of the first element that matches the CSS selector ",(0,a.kt)("inlineCode",{parentName:"p"},"h3")," as ",(0,a.kt)("inlineCode",{parentName:"p"},"html"),":"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://livecodes.io/?html-selector=h3&x=https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html"},"https://livecodes.io/?html-selector=h3&x=https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html")),(0,a.kt)("p",null,"Of course, ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/embeds"},"embedded playgrounds")," can be prefilled with code from the same embedding page. This works well for documentation and educational websites."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://live-codes.github.io/livecodes-examples/prefill-from-code-blocks.html"},"This is a demo"),' for automatic extraction of code blocks to prefill editors by creating "Edit in LiveCodes" links. Also embedded editors are prefilled from the code blocks. (',(0,a.kt)("a",{parentName:"p",href:"https://github.com/live-codes/livecodes-examples/blob/master/prefill-from-code-blocks.html"},"View source"),")"),(0,a.kt)("h2",{id:"import-raw-code"},"Import Raw Code"),(0,a.kt)("p",null,"If the response text could not be parsed as DOM or no elements matched the CSS selectors, it is assumed to be raw code and the response text is loaded to editor. If the URL ends with an extension it is used to identify the language, otherwise it is assumed to be ",(0,a.kt)("inlineCode",{parentName:"p"},"html"),"."),(0,a.kt)("p",null,"Alternatively, the language of raw code can be specified using ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/configuration/query-params"},"query params"),":",(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"?x={url}&raw={language}")),(0,a.kt)("h2",{id:"edit-in-livecodes-bookmarklet"},'"Edit in LiveCodes" Bookmarklet'),(0,a.kt)("p",null,"Instead of manually copy/pasting URLs to import, adding ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/bookmarklet"},(0,a.kt)("strong",{parentName:"a"},'"Edit in LiveCodes"')," bookmarklet")," to the browser bookmarks bar can be a more convenient way. It opens LiveCodes in a new window and imports the current webpage URL."),(0,a.kt)("h2",{id:"import-from-codepen"},"Import from CodePen"),(0,a.kt)("p",null,"Currently, CodePen API does not allow directly importing code from Pens (except for Pens of Pro users, which can be imported!). However, you can export any saved Pen as a ",(0,a.kt)("a",{parentName:"p",href:"https://blog.codepen.io/documentation/exporting-pens/#export-zip-1"},"zip file")," or ",(0,a.kt)("a",{parentName:"p",href:"https://blog.codepen.io/documentation/exporting-pens/#save-as-github-gist-2"},"Github gist")," and then import it to LiveCodes. The format that Codepen exports is well understood by LiveCodes. Most Pens can be imported with no or minimal changes."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Note:")," External resources (styles/scripts) are not exported with source code in zip file export of CodePen. However, export to GitHub gist does export these. So if a Pen with external resources exported as zip file is not imported properly, try exporting to GitHub gist or manually add the ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/external-resources"},"external resources"),"."),(0,a.kt)("h2",{id:"import-exported-livecodes-projects"},"Import Exported LiveCodes Projects"),(0,a.kt)("p",null,"A ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/export#exporting-a-single-project"},"single project exported as JSON"),' can be imported in the same or a different device from the import screen under the tab "Import Project JSON". The JSON file can be supplied as a local file upload or from a URL.'),(0,a.kt)("p",null,"Similarly, ",(0,a.kt)("a",{parentName:"p",href:"/livecodes/docs/features/export#exporting-multiple-projects"},"multiple projects exported in bulk"),' can be imported from the tab "Bulk Import".'),(0,a.kt)("h2",{id:"related"},"Related"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/code-prefill"},"Code prefill")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/export"},"Export")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/external-resources"},"External resources")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/module-resolution"},"Module resolution")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/livecodes/docs/features/projects"},"Projects"))))}c.isMDXComponent=!0},7854:(e,t,r)=>{r.d(t,{Z:()=>o});const o=r.p+"assets/images/import-fab1bf7eb26deac51b086969ed7b9497.jpg"}}]);