var b={title:"Untitled Project",description:"",head:`<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,htmlAttrs:'lang="en" class=""',tags:[],autoupdate:!0,autosave:!1,autotest:!1,delay:1500,formatOnsave:!1,mode:"full",theme:"dark",editorTheme:void 0,recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{},tests:{language:"typescript",content:""},tools:{enabled:"all",active:"",status:""},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,semicolons:!0,singleQuote:!1,trailingComma:!0,emmet:!0,enableAI:!1,editorMode:void 0,version:"26"};var q='<div id="embed-container" class="modal-container"><div class="modal-title">Embed Project</div><div id="embed-screen-container" class="modal-screen-container"><div class="modal-screen"><label>Preview</label><div id="embed-preview-container">Loading Preview...</div><form id="embed-form"></form><label for="embed-code">Code</label><div id="embed-code" class="custom-editor"></div><button id="embed-copy-btn" class="wide-button">Copy Code</button><div class="description">Please check the <a href="{{DOCS_BASE_URL}}configuration/" target="_blank" rel="noopener">documentations</a> for advanced configurations.</div></div></div></div>';var oe=t=>t.replace(/{{APP_VERSION}}/g,"26").replace(/{{SDK_VERSION}}/g,"0.4.0").replace(/{{COMMIT_SHA}}/g,"1817dea").replace(/{{REPO_URL}}/g,"https://github.com/live-codes/livecodes").replace(/{{DOCS_BASE_URL}}/g,"/livecodes/docs/");var B=oe(q);var $=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&#34;");var E=(t,n=!0)=>t.replace(/\\/g,n?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var z=t=>JSON.parse(JSON.stringify(t));var W=t=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy")){let n=document.createElement("textarea");n.textContent=t,n.style.position="fixed",document.body.appendChild(n),n.select();try{return document.execCommand("copy")}catch(a){return console.warn("Copy to clipboard failed.",a),!1}finally{document.body.removeChild(n)}}return!1};var C=(t,n,a=!0)=>(a?"":" ".repeat(n))+t.split(`
`).join(`
`+" ".repeat(n));var V=["esm.sh","skypack","jspm"],J=["unpkg","jsdelivr","fastly.jsdelivr"],Z=["fastly.jsdelivr.gh","jsdelivr.gh","statically"],u={getModuleUrl:(t,{isModule:n=!0,defaultCDN:a="esm.sh"}={})=>{t=t.replace(/#nobundle/g,"");let d=K(t,n,a);return d||(n?"https://esm.sh/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,n)=>t.startsWith("http")||t.startsWith("data:")?t:K(t,!1,n||re())||t,cdnLists:{npm:J,module:V,gh:Z},checkCDNs:async(t,n)=>{let a=[n,...u.cdnLists.npm].filter(Boolean);for(let d of a)try{if((await fetch(u.getUrl(t,d),{method:"HEAD"})).ok)return d}catch{}return u.cdnLists.npm[0]}},re=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||u.cdnLists.npm[0]}catch{return u.cdnLists.npm[0]}},K=(t,n,a)=>{let d=n&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",Z[0]):t.includes(":")||(t=(a||(n?V[0]:J[0]))+":"+t);for(let g of ne){let[y,R]=g;if(y.test(t))return t.replace(y,R)+d}return null},ne=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly.jsdelivr.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var se={esm:"livecodes.js",umd:"livecodes.umd.js",react:"react.js",vue:"vue.js",types:"index.d.ts"},Q={getAppUrl:()=>"https://v26.livecodes.io/",getSDKUrl:(t="esm")=>u.getUrl(`livecodes@0.4.0/${se[t]}`)};var ye=async({baseUrl:t,config:n,editorLanguages:a,modal:d,notifications:g,eventsManager:y,createEditorFn:R,getUrlFn:A})=>{let M=n.title,f=n.activeEditor||"markup",O=document.createElement("div");O.innerHTML=B;let w=O.firstChild;d.show(w,{isAsync:!0});let U=w.querySelector("#embed-preview-container"),S=w.querySelector("#embed-form"),I=w.querySelector("#embed-code"),P=w.querySelector("#embed-copy-btn");if(!U||!S||!I||!P)return;[{title:"Theme",name:"theme",options:[{label:"Dark",value:"dark",checked:!0},{label:"Light",value:"light"}]},{title:"Loading",name:"loading",options:[{label:"Lazy",value:"lazy",checked:!0},{label:"On-click",value:"click"},{label:"Eager",value:"eager"}]},{title:"Lite Mode",name:"lite",options:[{value:"true",checked:!1}],help:"/livecodes/docs/features/lite"},{title:"Read only",name:"readonly",options:[{value:"true",checked:!1}]},{title:"Display Mode",name:"mode",options:[{label:"Full",value:"full",checked:!0},{label:"Editor",value:"editor"},{label:"Code Block",value:"codeblock"},{label:"Result",value:"result"}],help:"/livecodes/docs/features/display-modes"},{title:"Default View",name:"view",options:[{label:"Split",value:"split",checked:!0},{label:"Editor",value:"editor"},{label:"Result",value:"result"}],help:"/livecodes/docs/features/default-view"},{title:"Active Editor",name:"activeEditor",options:[{label:a.markup,value:"markup",checked:f==="markup"},{label:a.style,value:"style",checked:f==="style"},{label:a.script,value:"script",checked:f==="script"}]},{title:"Tools",name:"tools",options:[{label:"Closed",value:"closed",checked:!0},{label:"Open",value:"open"},{label:"Full",value:"full"},{label:"None",value:"none"}],help:"/livecodes/docs/features/tools-pane"},{title:"Active Tool",name:"activeTool",options:[{label:"Console",value:"console",checked:!0},{label:"Compiled",value:"compiled"},{label:"Tests",value:"tests"}].filter(e=>!(e.value==="tests"&&!n.tests?.content)),help:"/livecodes/docs/features/tools-pane"},{title:"Permanent URL",name:"permanentUrl",options:[{value:"true",checked:!0}],help:"/livecodes/docs/features/permanent-url"},{title:"Embed Type",name:"type",options:[{label:"Script (CDN)",value:"cdn",checked:!0},{label:"JS (npm)",value:"npm"},{label:"React",value:"react"},{label:"Vue",value:"vue"},{label:"Svelte",value:"svelte"},{label:"Iframe",value:"iframe"},{label:"HTML",value:"html"}]}].forEach(e=>{let r=document.createElement("label");if(r.innerHTML=e.title,S.appendChild(r),e.help){let s=document.createElement("a");s.href=e.help,s.target="_blank",s.classList.add("help-link"),s.title="Click for info...",r.appendChild(s);let m=document.createElement("img");m.src=t+"assets/icons/info.svg",s.appendChild(m)}let i=document.createElement("div");i.classList.add("input-container"),S.appendChild(i),e.options.forEach(s=>{let m=`embed-${e.name}`,c=`${m}-${s.value}`,k=!s.label&&s.value==="true",x=document.createElement("span");i.appendChild(x);let l=document.createElement("input");if(l.type=k?"checkbox":"radio",l.name=m,l.id=c,l.value=s.value,l.checked=s.checked||!1,x.appendChild(l),k)l.classList.add("switch");else{let o=document.createElement("label");o.classList.add("radio-label"),o.htmlFor=c,o.innerHTML=s.label||"",x.appendChild(o)}})});let L=await R(I),G="https://livecodes.io",F=Q.getSDKUrl("umd"),T=await A(!0),h=new URL(T),D=h.origin+h.pathname,j=document.createElement("iframe");j.id="embed-preview-iframe",U.innerHTML="",U.appendChild(j);let X=()=>"livecodes-"+(Math.random()+1).toString(36).substring(2),v=e=>{let r={...e.mode!==b.mode?{mode:e.mode}:{},...e.theme!==b.theme?{theme:e.theme}:{},...e.tools!=="closed"||e.activeTool!=="console"?{tools:{enabled:e.tools==="none"?[]:"all",status:e.tools,active:e.activeTool}}:{},...e.readonly?{readonly:e.readonly}:{},...e.mode!=="result"&&e.activeEditor!==f?{activeEditor:e.activeEditor}:{}},i=h.searchParams.get("x");return{...D!=="https://livecodes.io/"?{appUrl:D}:{},...Object.keys(r).length>0?{config:r}:{},...i?{import:i}:{},...e.lite?{lite:e.lite}:{},...e.loading!=="lazy"?{loading:e.loading}:{},...e.view&&e.view!=="split"?{view:e.view}:{}}},H=e=>{let r=new URL(T);return r.searchParams.set(e.lite?"lite":"embed","true"),e.loading&&e.loading!=="lazy"&&r.searchParams.set("loading",String(e.loading)),e.view&&e.view!=="split"&&r.searchParams.set("view",String(e.view)),e.mode!=="result"&&e.activeEditor&&e.activeEditor!==f&&r.searchParams.set("activeEditor",String(e.activeEditor)),e.mode&&e.mode!==b.mode&&r.searchParams.set("mode",String(e.mode)),e.theme&&e.theme!==b.theme&&r.searchParams.set("theme",String(e.theme)),e.tools&&(e.tools!=="closed"||e.activeTool!=="console")&&r.searchParams.set(e.tools==="none"?"tools":String(e.activeTool),String(e.tools)),e.readonly!==void 0&&r.searchParams.set("readonly",String(e.readonly)),decodeURIComponent(r.href)},Y={cdn:e=>{let r=X(),i=`<div id="${r}"></div>`,s=v(e),m=JSON.stringify(s,null,2),c=C(m,2);return`
${i}
<script src="${F}"><\/script>
<script>
  const options = ${c};
  livecodes.createPlayground("#${r}", options);
<\/script>
`.trimStart()},npm(e){let r=v(e);return`
import { createPlayground } from "livecodes";
const options = ${JSON.stringify(r,null,2)};
createPlayground("#container", options);
`.trimStart()},react(e){let r=v(e),i=JSON.stringify(r,null,2);return`
import LiveCodes from "livecodes/react";
export default function App() {
  const options = ${C(i,2)};
  return <LiveCodes {...options}></LiveCodes>;
}
`.trimStart()},vue(e){let r=v(e),i=JSON.stringify(r,null,2);return`
<script setup>
  import LiveCodes from 'livecodes/vue';
  const options = ${C(i,2)};
<\/script>

<template>
  <LiveCodes v-bind="options" />
</template>
`.trimStart()},svelte(e){let r=v(e),i=JSON.stringify(r,null,2);return`
<script>
  import { onMount } from 'svelte';
  import { createPlayground } from 'livecodes';
  const options = ${C(i,2)};
  let container;
  let playground;
  onMount(() => {
    createPlayground(container, options).then((p) => (playground = p));
    return () => playground?.destroy();
  });
<\/script>

<div bind:this="{container}"></div>
`.trimStart()},iframe:e=>{let r=H(e),i=new URL(r);i.searchParams.delete("embed"),i.searchParams.delete("lite");let s=decodeURIComponent(i.href);return`
<iframe title="${M}" scrolling="no" loading="lazy" style="height:300px; width: 100%; border:1px solid black; border-radius:5px;" src="${r}">
  See the project <a href="${s}" target="_blank">${M}</a> on <a href="${G}" target="_blank">LiveCodes</a>.
</iframe>
`.trimStart()},html:e=>{let{import:r,...i}=v(e),s={...z(n),...i.config};return Object.keys(s).forEach(c=>{(JSON.stringify(s[c])===JSON.stringify(b[c])||c==="activeEditor"&&s.activeEditor==="markup"||["markup","style","script"].includes(c))&&delete s[c]}),Object.keys(s).length>0&&(i.config=s),`
<div class="livecodes" style="height: 300px;" data-options='${E(JSON.stringify(i).replace(/'/g,"&#39;"))}'>
<pre data-lang="${n.markup.language}">${E($(n.markup.content||""))}</pre>
<pre data-lang="${n.style.language}">${E($(n.style.content||""))}</pre>
<pre data-lang="${n.script.language}">${E($(n.script.content||""))}</pre>
</div>
<script defer src="${F}" data-prefill><\/script>
`.trimStart()}},p={view:"split",tools:"closed",activeTool:"console"},N=async()=>{let e=Array.from(new FormData(S)).reduce((o,[ee,_])=>({...o,[ee.replace("embed-","")]:_==="true"?!0:_}),{});T=await A(!!e.permanentUrl),h=new URL(T),D=h.origin+h.pathname;let r=document.querySelectorAll('input[name="embed-view"]');e.mode!=="full"?(p.view=e.view||p.view,delete e.view,r.forEach(o=>{o.checked=!1,o.disabled=!0})):r.forEach(o=>{o.value===(e.view||p.view)&&(o.checked=!0),o.disabled=!1,o.checked&&(e.view=o.value)});let i=document.querySelectorAll('input[name="embed-tools"]'),s=document.querySelectorAll('input[name="embed-activeTool"]');e.lite?(p.tools=e.tools||p.tools,delete e.tools,i.forEach(o=>{o.checked=!1,o.disabled=!0})):i.forEach(o=>{o.value===(e.tools||p.tools)&&(o.checked=!0),o.disabled=!1,o.checked&&(e.tools=o.value)}),e.lite||e.tools==="none"?(p.activeTool=e.activeTool||p.activeTool,delete e.activeTool,s.forEach(o=>{o.checked=!1,o.disabled=!0})):s.forEach(o=>{o.value===(e.activeTool||p.activeTool)&&(o.checked=!0),o.disabled=!1,o.checked&&(e.activeTool=o.value)}),document.querySelectorAll('input[name="embed-activeEditor"]').forEach(o=>{e.mode==="result"?(o.checked=o.value===f,o.disabled=!0,delete e.activeEditor):o.disabled=!1}),j.src=H(e);let c=e.type,k=Y[c]?.(e),l={npm:"javascript",react:"jsx"}[c]||"html";L.getLanguage()!==l?L.setLanguage(l,k):L.setValue(k)};y.addEventListener(S,"change",N),y.addEventListener(P,"click",async()=>{W(L.getValue())?g.success("Code copied to clipboard"):g.error("Failed to copy to clipboard")}),N()};export{ye as createEmbedUI};
