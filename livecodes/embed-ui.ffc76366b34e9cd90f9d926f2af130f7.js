var u={title:"Untitled Project",description:"",head:`<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,htmlAttrs:'lang="en" class=""',tags:[],autoupdate:!0,autosave:!1,autotest:!1,delay:1500,formatOnsave:!1,mode:"full",theme:"dark",themeColor:void 0,layout:"responsive",editorTheme:void 0,appLanguage:void 0,recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{},tests:{language:"typescript",content:""},tools:{enabled:"all",active:"",status:""},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,semicolons:!0,singleQuote:!1,trailingComma:!0,emmet:!0,enableAI:!1,editorMode:void 0,version:"36"};var R=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&#34;");var T=(t,s=!0)=>t.replace(/\\/g,s?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var q=t=>(globalThis.structuredClone||(s=>JSON.parse(JSON.stringify(s,(l,a)=>a===void 0?null:a))))(t);var z=t=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy")){let s=document.createElement("textarea");s.textContent=t,s.style.position="fixed",document.body.appendChild(s),s.select();try{return document.execCommand("copy")}catch(l){return console.warn("Copy to clipboard failed.",l),!1}finally{document.body.removeChild(s)}}return!1};var L=(t,s,l=!0)=>(l?"":" ".repeat(s))+t.split(`
`).join(`
`+" ".repeat(s));var B={APP_VERSION:"36",SDK_VERSION:"0.7.0",COMMIT_SHA:"60bdd1b",REPO_URL:"https://github.com/live-codes/livecodes",DOCS_BASE_URL:"/livecodes/docs/"};var V='<div id="embed-container" class="modal-container"><div class="modal-title" data-i18n="embed.heading">Embed Project</div><div id="embed-screen-container" class="modal-screen-container"><div class="modal-screen"><label data-i18n="embed.preview">Preview</label><div id="embed-preview-container" data-i18n="embed.previewLoading">Loading Preview...</div><form id="embed-form"></form><label for="embed-code" data-i18n="embed.code.heading">Code</label><div id="embed-code" class="custom-editor"></div><button id="embed-copy-btn" class="wide-button" data-i18n="embed.code.copy">Copy Code</button><div class="description help" data-i18n="embed.desc" data-i18n-prop="innerHTML">Please check the <a href="{{DOCS_BASE_URL}}configuration/" target="_blank" rel="noopener">documentations</a> for advanced configurations.</div></div></div></div>';var oe=t=>Object.entries(B).reduce((s,[l,a])=>s.replace(new RegExp(`{{${l}}}`,"g"),a),t);var W=oe(V);var J=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],Z=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],Q=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],f={getModuleUrl:(t,{isModule:s=!0,defaultCDN:l="esm.sh"}={})=>{t=t.replace(/#nobundle/g,"");let a=K(t,s,l);return a||(s?"https://esm.sh/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,s)=>t.startsWith("http")||t.startsWith("data:")?t:K(t,!1,s||re())||t,cdnLists:{npm:Z,module:J,gh:Q},checkCDNs:async(t,s)=>{let l=[s,...f.cdnLists.npm].filter(Boolean);for(let a of l)try{if((await fetch(f.getUrl(t,a),{method:"HEAD"})).ok)return a}catch{}return f.cdnLists.npm[0]}},re=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||f.cdnLists.npm[0]}catch{return f.cdnLists.npm[0]}},K=(t,s,l)=>{let a=s&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",Q[0]):t.includes(":")||(t=(l||(s?J[0]:Z[0]))+":"+t);for(let h of se){let[x,$]=h;if(x.test(t))return t.replace(x,$)+a}return null},se=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var ie={esm:"livecodes.js",umd:"livecodes.umd.js",react:"react.js",vue:"vue.js",types:"index.d.ts"},G={getAppUrl:()=>"https://v36.livecodes.io/",getSDKUrl:(t="esm")=>f.getUrl(`livecodes@0.7.0/${ie[t]}`)};var Se=async({config:t,editorLanguages:s,modal:l,notifications:a,eventsManager:h,createEditorFn:x,getUrlFn:$})=>{let M=t.title,b=t.activeEditor||"markup",O=document.createElement("div");O.innerHTML=W;let S=O.firstChild;l.show(S,{isAsync:!0,onClose:()=>E?.destroy()});let U=S.querySelector("#embed-preview-container"),k=S.querySelector("#embed-form"),P=S.querySelector("#embed-code"),H=S.querySelector("#embed-copy-btn");if(!U||!k||!P||!H)return;[{title:window.deps.translateString("embed.theme.heading","Theme"),name:"theme",options:[{label:window.deps.translateString("embed.theme.dark","Dark"),value:"dark",checked:!0},{label:window.deps.translateString("embed.theme.light","Light"),value:"light"}]},{title:window.deps.translateString("embed.loading.heading","Loading"),name:"loading",options:[{label:window.deps.translateString("embed.loading.lazy","Lazy"),value:"lazy",checked:!0},{label:window.deps.translateString("embed.loading.click","On-click"),value:"click"},{label:window.deps.translateString("embed.loading.eager","Eager"),value:"eager"}]},{title:window.deps.translateString("embed.lite","Lite Mode"),name:"lite",options:[{value:"true",checked:!1}],help:"/livecodes/docs/features/lite"},{title:window.deps.translateString("embed.readonly","Read only"),name:"readonly",options:[{value:"true",checked:!1}]},{title:window.deps.translateString("embed.mode.heading","Display Mode"),name:"mode",options:[{label:window.deps.translateString("embed.mode.full","Full"),value:"full",checked:!0},{label:window.deps.translateString("embed.mode.simple","Simple"),value:"simple"},{label:window.deps.translateString("embed.mode.editor","Editor"),value:"editor"},{label:window.deps.translateString("embed.mode.codeblock","Code Block"),value:"codeblock"},{label:window.deps.translateString("embed.mode.result","Result"),value:"result"}],help:"/livecodes/docs/features/display-modes"},{title:window.deps.translateString("embed.view.heading","Default View"),name:"view",options:[{label:window.deps.translateString("embed.view.split","Split"),value:"split",checked:!0},{label:window.deps.translateString("embed.view.editor","Editor"),value:"editor"},{label:window.deps.translateString("embed.view.result","Result"),value:"result"}],help:"/livecodes/docs/features/default-view"},{title:window.deps.translateString("embed.layout.heading","Layout"),name:"layout",options:[{label:window.deps.translateString("embed.layout.responsive","Responsive"),value:"responsive",checked:!0},{label:window.deps.translateString("embed.layout.horizontal","Horizontal"),value:"horizontal"},{label:window.deps.translateString("embed.layout.vertical","Vertical"),value:"vertical"}],help:"/livecodes/docs/configuration/configuration-object#layout"},{title:window.deps.translateString("embed.activeEditor.heading","Active Editor"),name:"activeEditor",options:[{label:window.deps.translateString("embed.activeEditor.markup","{{markup}}",{markup:s.markup}),value:"markup",checked:b==="markup"},{label:window.deps.translateString("embed.activeEditor.style","{{style}}",{style:s.style}),value:"style",checked:b==="style"},{label:window.deps.translateString("embed.activeEditor.script","{{script}}",{script:s.script}),value:"script",checked:b==="script"}]},{title:window.deps.translateString("embed.codeEditor.heading","Code Editor"),name:"editor",options:[{label:window.deps.translateString("embed.codeEditor.default","Default"),value:"",checked:!0},{label:window.deps.translateString("embed.codeEditor.monaco","Monaco"),value:"monaco"},{label:window.deps.translateString("embed.codeEditor.codeMirror","CodeMirror"),value:"codemirror"},{label:window.deps.translateString("embed.codeEditor.codeJar","CodeJar"),value:"codejar"}],help:"/livecodes/docs/features/editor-settings#code-editor"},{title:window.deps.translateString("embed.tools.heading","Tools"),name:"tools",options:[{label:window.deps.translateString("embed.tools.closed","Closed"),value:"closed",checked:!0},{label:window.deps.translateString("embed.tools.open","Open"),value:"open"},{label:window.deps.translateString("embed.tools.full","Full"),value:"full"},{label:window.deps.translateString("embed.tools.none","None"),value:"none"}],help:"/livecodes/docs/features/tools-pane"},{title:window.deps.translateString("embed.activeTool.heading","Active Tool"),name:"activeTool",options:[{label:window.deps.translateString("embed.activeTool.console","Console"),value:"console",checked:!0},{label:window.deps.translateString("embed.activeTool.compiled","Compiled"),value:"compiled"},{label:window.deps.translateString("embed.activeTool.tests","Tests"),value:"tests"}].filter(e=>!(e.value==="tests"&&!t.tests?.content)),help:"/livecodes/docs/features/tools-pane"},{title:window.deps.translateString("embed.permanentUrl","Permanent URL"),name:"permanentUrl",options:[{value:"true",checked:!0}],help:"/livecodes/docs/features/permanent-url"},{title:window.deps.translateString("embed.embedType.heading","Embed Type"),name:"type",options:[{label:window.deps.translateString("embed.embedType.cdn","Script (CDN)"),value:"cdn",checked:!0},{label:window.deps.translateString("embed.embedType.npm","JS (npm)"),value:"npm"},{label:window.deps.translateString("embed.embedType.react","React"),value:"react"},{label:window.deps.translateString("embed.embedType.vue","Vue"),value:"vue"},{label:window.deps.translateString("embed.embedType.svelte","Svelte"),value:"svelte"},{label:window.deps.translateString("embed.embedType.iframe","Iframe"),value:"iframe"},{label:window.deps.translateString("embed.embedType.html","HTML"),value:"html"}]}].forEach(e=>{let o=document.createElement("label");if(o.innerHTML=e.title,k.appendChild(o),e.help){let r=document.createElement("a");r.href=e.help,r.target="_blank",r.classList.add("help-link"),r.title=window.deps.translateString("generic.clickForInfo","Click for info..."),o.appendChild(r);let d=document.createElement("i");d.classList.add("icon-info"),r.appendChild(d)}let i=document.createElement("div");i.classList.add("input-container"),k.appendChild(i),e.options.forEach(r=>{let d=`embed-${e.name}`,p=`${d}-${r.value}`,C=!r.label&&r.value==="true",y=document.createElement("span");i.appendChild(y);let m=document.createElement("input");if(m.type=C?"checkbox":"radio",m.name=d,m.id=p,m.value=r.value,m.checked=r.checked||!1,y.appendChild(m),C)m.classList.add("switch");else{let g=document.createElement("label");g.classList.add("radio-label"),g.htmlFor=p,g.innerHTML=r.label||"",y.appendChild(g)}})});let E=await x(P),X="https://livecodes.io",I=G.getSDKUrl("umd"),j=await $(!0),v=new URL(j),D=v.origin+v.pathname,A=document.createElement("iframe");A.id="embed-preview-iframe",U.innerHTML="",U.appendChild(A);let Y=()=>"livecodes-"+(Math.random()+1).toString(36).substring(2),w=e=>{let o={...e.mode!==u.mode?{mode:e.mode}:{},...e.theme!==u.theme?{theme:e.theme}:{},...!e.lite&&(e.tools!=="closed"||e.activeTool!=="console")?{tools:{enabled:e.tools==="none"?[]:"all",status:e.tools,active:e.activeTool}}:{},...e.readonly?{readonly:e.readonly}:{},...e.mode!=="result"&&e.activeEditor!==b?{activeEditor:e.activeEditor}:{},...e.editor?{editor:e.editor}:{},...e.layout!==u.layout?{layout:e.layout}:{}},i=v.searchParams.get("x");return{...D!=="https://livecodes.io/"?{appUrl:D}:{},...Object.keys(o).length>0?{config:o}:{},...i?{import:i}:{},...e.lite?{lite:e.lite}:{},...e.loading!=="lazy"?{loading:e.loading}:{},...e.view&&e.view!=="split"?{view:e.view}:{}}},F=e=>{let o=new URL(j);return o.searchParams.set(e.lite?"lite":"embed","true"),e.loading&&e.loading!=="lazy"&&o.searchParams.set("loading",String(e.loading)),e.view&&e.view!=="split"&&o.searchParams.set("view",String(e.view)),e.mode!=="result"&&e.activeEditor&&e.activeEditor!==b&&o.searchParams.set("activeEditor",String(e.activeEditor)),e.mode&&e.mode!==u.mode&&o.searchParams.set("mode",String(e.mode)),e.theme&&e.theme!==u.theme&&o.searchParams.set("theme",String(e.theme)),e.tools&&!e.lite&&(e.tools!=="closed"||e.activeTool!=="console")&&o.searchParams.set(e.tools==="none"?"tools":String(e.activeTool),String(e.tools)),e.readonly!==void 0&&o.searchParams.set("readonly",String(e.readonly)),e.editor&&o.searchParams.set("editor",String(e.editor)),e.layout&&e.layout!==u.layout&&o.searchParams.set("layout",String(e.layout)),decodeURIComponent(o.href)},ee={cdn:e=>{let o=Y(),i=`<div id="${o}"></div>`,r=w(e),d=JSON.stringify(r,null,2),p=L(d,2);return`
${i}
<script src="${I}"><\/script>
<script>
  const options = ${p};
  livecodes.createPlayground("#${o}", options);
<\/script>
`.trimStart()},npm(e){let o=w(e);return`
import { createPlayground } from "livecodes";
const options = ${JSON.stringify(o,null,2)};
createPlayground("#container", options);
`.trimStart()},react(e){let o=w(e),i=JSON.stringify(o,null,2);return`
import LiveCodes from "livecodes/react";
export default function App() {
  const options = ${L(i,2)};
  return <LiveCodes {...options}></LiveCodes>;
}
`.trimStart()},vue(e){let o=w(e),i=JSON.stringify(o,null,2);return`
<script setup>
  import LiveCodes from 'livecodes/vue';
  const options = ${L(i,2)};
<\/script>

<template>
  <LiveCodes v-bind="options" />
</template>
`.trimStart()},svelte(e){let o=w(e),i=JSON.stringify(o,null,2);return`
<script>
  import { onMount } from 'svelte';
  import { createPlayground } from 'livecodes';
  const options = ${L(i,2)};
  let container;
  let playground;
  onMount(() => {
    createPlayground(container, options).then((p) => (playground = p));
    return () => playground?.destroy();
  });
<\/script>

<div bind:this="{container}"></div>
`.trimStart()},iframe:e=>{let o=F(e),i=new URL(o);i.searchParams.delete("embed"),i.searchParams.delete("lite");let r=decodeURIComponent(i.href);return`
<iframe title="${M}" scrolling="no" loading="lazy" style="height:300px; width: 100%; border:1px solid black; border-radius:6px;" src="${o}">
  See the project <a href="${r}" target="_blank">${M}</a> on <a href="${X}" target="_blank">LiveCodes</a>.
</iframe>
`.trimStart()},html:e=>{let{import:o,...i}=w(e),r={...q(t),...i.config};return Object.keys(r).forEach(p=>{(JSON.stringify(r[p])===JSON.stringify(u[p])||p==="activeEditor"&&r.activeEditor==="markup"||["markup","style","script"].includes(p))&&delete r[p]}),Object.keys(r).length>0&&(i.config=r),`
<div class="livecodes" style="height: 300px;" data-options='${T(JSON.stringify(i).replace(/'/g,"&#39;"))}'>
<pre data-lang="${t.markup.language}">${T(R(t.markup.content||""))}</pre>
<pre data-lang="${t.style.language}">${T(R(t.style.content||""))}</pre>
<pre data-lang="${t.script.language}">${T(R(t.script.content||""))}</pre>
</div>
<script defer src="${I}" data-prefill><\/script>
`.trimStart()}},c={view:"split",tools:"closed",activeTool:"console",editor:""},_=async()=>{let e=Array.from(new FormData(k)).reduce((n,[te,N])=>({...n,[te.replace("embed-","")]:N==="true"?!0:N}),{});j=await $(!!e.permanentUrl),v=new URL(j),D=v.origin+v.pathname;let o=document.querySelectorAll('input[name="embed-view"]');e.mode!=="full"?(c.view=e.view||c.view,delete e.view,o.forEach(n=>{n.checked=!1,n.disabled=!0})):o.forEach(n=>{n.value===(e.view||c.view)&&(n.checked=!0),n.disabled=!1,n.checked&&(e.view=n.value)});let i=document.querySelectorAll('input[name="embed-tools"]'),r=document.querySelectorAll('input[name="embed-activeTool"]'),d=document.querySelectorAll('input[name="embed-editor"]');e.lite?(c.tools=e.tools??c.tools,c.editor=e.editor??c.editor,delete e.tools,delete e.editor,i.forEach(n=>{n.checked=!1,n.disabled=!0}),d.forEach(n=>{n.checked=!1,n.disabled=!0,n.value==="codejar"&&(n.checked=!0)})):(i.forEach(n=>{n.value===(e.tools??c.tools)&&(n.checked=!0),n.disabled=!1,n.checked&&(e.tools=n.value)}),d.forEach(n=>{n.value===(e.editor??c.editor)&&(n.checked=!0),n.disabled=!1,n.checked&&(e.editor=n.value)})),e.lite||e.tools==="none"?(c.activeTool=e.activeTool||c.activeTool,delete e.activeTool,r.forEach(n=>{n.checked=!1,n.disabled=!0})):r.forEach(n=>{n.value===(e.activeTool||c.activeTool)&&(n.checked=!0),n.disabled=!1,n.checked&&(e.activeTool=n.value)}),document.querySelectorAll('input[name="embed-activeEditor"]').forEach(n=>{e.mode==="result"?(n.checked=n.value===b,n.disabled=!0,delete e.activeEditor):n.disabled=!1}),A.src=F(e);let C=e.type,y=ee[C]?.(e),g={npm:"javascript",react:"jsx"}[C]||"html";E.getLanguage()!==g?E.setLanguage(g,y):E.setValue(y)};h.addEventListener(k,"change",_),h.addEventListener(H,"click",async()=>{z(E.getValue())?a.success(window.deps.translateString("core.copy.copied","Code copied to clipboard")):a.error(window.deps.translateString("core.error.failedToCopyCode","Failed to copy code"))}),_()};export{Se as createEmbedUI};
