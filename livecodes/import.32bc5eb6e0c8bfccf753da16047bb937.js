var Ae=Object.create;var O=Object.defineProperty;var Re=Object.getOwnPropertyDescriptor;var Be=Object.getOwnPropertyNames;var Pe=Object.getPrototypeOf,_e=Object.prototype.hasOwnProperty;var Fe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Oe=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of Be(t))!_e.call(e,u)&&u!==r&&O(e,u,{get:()=>t[u],enumerable:!(a=Re(t,u))||a.enumerable});return e};var De=(e,t,r)=>(r=e!=null?Ae(Pe(e)):{},Oe(t||!e||!e.__esModule?O(r,"default",{value:e,enumerable:!0}):r,e));var N=Fe((ct,C)=>{var Je=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",a={};function u(o,s){if(!a[o]){a[o]={};for(var m=0;m<o.length;m++)a[o][o.charAt(m)]=m}return a[o][s]}var d={compressToBase64:function(o){if(o==null)return"";var s=d._compress(o,6,function(m){return t.charAt(m)});switch(s.length%4){default:case 0:return s;case 1:return s+"===";case 2:return s+"==";case 3:return s+"="}},decompressFromBase64:function(o){return o==null?"":o==""?null:d._decompress(o.length,32,function(s){return u(t,o.charAt(s))})},compressToUTF16:function(o){return o==null?"":d._compress(o,15,function(s){return e(s+32)})+" "},decompressFromUTF16:function(o){return o==null?"":o==""?null:d._decompress(o.length,16384,function(s){return o.charCodeAt(s)-32})},compressToUint8Array:function(o){for(var s=d.compress(o),m=new Uint8Array(s.length*2),n=0,p=s.length;n<p;n++){var h=s.charCodeAt(n);m[n*2]=h>>>8,m[n*2+1]=h%256}return m},decompressFromUint8Array:function(o){if(o==null)return d.decompress(o);for(var s=new Array(o.length/2),m=0,n=s.length;m<n;m++)s[m]=o[m*2]*256+o[m*2+1];var p=[];return s.forEach(function(h){p.push(e(h))}),d.decompress(p.join(""))},compressToEncodedURIComponent:function(o){return o==null?"":d._compress(o,6,function(s){return r.charAt(s)})},decompressFromEncodedURIComponent:function(o){return o==null?"":o==""?null:(o=o.replace(/ /g,"+"),d._decompress(o.length,32,function(s){return u(r,o.charAt(s))}))},compress:function(o){return d._compress(o,16,function(s){return e(s)})},_compress:function(o,s,m){if(o==null)return"";var n,p,h={},b={},L="",T="",S="",x=2,v=3,g=2,y=[],i=0,c=0,f;for(f=0;f<o.length;f+=1)if(L=o.charAt(f),Object.prototype.hasOwnProperty.call(h,L)||(h[L]=v++,b[L]=!0),T=S+L,Object.prototype.hasOwnProperty.call(h,T))S=T;else{if(Object.prototype.hasOwnProperty.call(b,S)){if(S.charCodeAt(0)<256){for(n=0;n<g;n++)i=i<<1,c==s-1?(c=0,y.push(m(i)),i=0):c++;for(p=S.charCodeAt(0),n=0;n<8;n++)i=i<<1|p&1,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=p>>1}else{for(p=1,n=0;n<g;n++)i=i<<1|p,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=0;for(p=S.charCodeAt(0),n=0;n<16;n++)i=i<<1|p&1,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=p>>1}x--,x==0&&(x=Math.pow(2,g),g++),delete b[S]}else for(p=h[S],n=0;n<g;n++)i=i<<1|p&1,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=p>>1;x--,x==0&&(x=Math.pow(2,g),g++),h[T]=v++,S=String(L)}if(S!==""){if(Object.prototype.hasOwnProperty.call(b,S)){if(S.charCodeAt(0)<256){for(n=0;n<g;n++)i=i<<1,c==s-1?(c=0,y.push(m(i)),i=0):c++;for(p=S.charCodeAt(0),n=0;n<8;n++)i=i<<1|p&1,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=p>>1}else{for(p=1,n=0;n<g;n++)i=i<<1|p,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=0;for(p=S.charCodeAt(0),n=0;n<16;n++)i=i<<1|p&1,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=p>>1}x--,x==0&&(x=Math.pow(2,g),g++),delete b[S]}else for(p=h[S],n=0;n<g;n++)i=i<<1|p&1,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=p>>1;x--,x==0&&(x=Math.pow(2,g),g++)}for(p=2,n=0;n<g;n++)i=i<<1|p&1,c==s-1?(c=0,y.push(m(i)),i=0):c++,p=p>>1;for(;;)if(i=i<<1,c==s-1){y.push(m(i));break}else c++;return y.join("")},decompress:function(o){return o==null?"":o==""?null:d._decompress(o.length,32768,function(s){return o.charCodeAt(s)})},_decompress:function(o,s,m){var n=[],p,h=4,b=4,L=3,T="",S=[],x,v,g,y,i,c,f,l={val:m(0),position:s,index:1};for(x=0;x<3;x+=1)n[x]=x;for(g=0,i=Math.pow(2,2),c=1;c!=i;)y=l.val&l.position,l.position>>=1,l.position==0&&(l.position=s,l.val=m(l.index++)),g|=(y>0?1:0)*c,c<<=1;switch(p=g){case 0:for(g=0,i=Math.pow(2,8),c=1;c!=i;)y=l.val&l.position,l.position>>=1,l.position==0&&(l.position=s,l.val=m(l.index++)),g|=(y>0?1:0)*c,c<<=1;f=e(g);break;case 1:for(g=0,i=Math.pow(2,16),c=1;c!=i;)y=l.val&l.position,l.position>>=1,l.position==0&&(l.position=s,l.val=m(l.index++)),g|=(y>0?1:0)*c,c<<=1;f=e(g);break;case 2:return""}for(n[3]=f,v=f,S.push(f);;){if(l.index>o)return"";for(g=0,i=Math.pow(2,L),c=1;c!=i;)y=l.val&l.position,l.position>>=1,l.position==0&&(l.position=s,l.val=m(l.index++)),g|=(y>0?1:0)*c,c<<=1;switch(f=g){case 0:for(g=0,i=Math.pow(2,8),c=1;c!=i;)y=l.val&l.position,l.position>>=1,l.position==0&&(l.position=s,l.val=m(l.index++)),g|=(y>0?1:0)*c,c<<=1;n[b++]=e(g),f=b-1,h--;break;case 1:for(g=0,i=Math.pow(2,16),c=1;c!=i;)y=l.val&l.position,l.position>>=1,l.position==0&&(l.position=s,l.val=m(l.index++)),g|=(y>0?1:0)*c,c<<=1;n[b++]=e(g),f=b-1,h--;break;case 2:return S.join("")}if(h==0&&(h=Math.pow(2,L),L++),n[f])T=n[f];else if(f===b)T=v+v.charAt(0);else return null;S.push(T),n[b++]=v+T.charAt(0),h--,v=T,h==0&&(h=Math.pow(2,L),L++)}}};return d}();typeof C<"u"&&C!=null&&(C.exports=Je)});var R={title:"Untitled Project",description:"",head:`<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,htmlAttrs:'lang="en" class=""',tags:[],autoupdate:!0,autosave:!1,autotest:!1,delay:1500,formatOnsave:!1,view:"split",mode:"full",theme:"dark",themeColor:void 0,layout:"responsive",editorTheme:void 0,appLanguage:void 0,recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{},tests:{language:"typescript",content:""},tools:{enabled:"all",active:"",status:""},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,semicolons:!0,singleQuote:!1,trailingComma:!0,emmet:!0,enableAI:!1,editorMode:void 0,version:"39"};var B=(e,t)=>new Promise((r,a)=>{if(t&&globalThis[t])return r(globalThis[t]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),t&&globalThis[t]?r(globalThis[t]):r(globalThis);let u=document.createElement("script");u.src=e,u.async=!0;let d=()=>{u.removeEventListener("load",o),u.removeEventListener("error",s)},o=()=>{if(d(),!t)return r("loaded: "+e);let m=setInterval(()=>{if(window[t])return clearInterval(m),r(window[t])},5)},s=()=>{d(),a("failed to load: "+e)};u.addEventListener("load",o),u.addEventListener("error",s),document.head.appendChild(u)});var We=e=>e.ok?e:Promise.reject(),I=(e,t)=>fetch(e,t).then(We);var P=e=>{if(!e)return null;let t=null;if(e.startsWith("http")||e.startsWith("data:"))try{t=new URL(e).href}catch{try{t=new URL(decodeURIComponent(e)).href}catch{}}return t};var D={APP_VERSION:"39",SDK_VERSION:"0.8.0",COMMIT_SHA:"523f456",REPO_URL:"https://github.com/live-codes/livecodes",DOCS_BASE_URL:"/livecodes/docs/"};var W='<div id="import-container" class="modal-container"><div class="modal-title" data-i18n="import.heading">Import</div><div id="import-screens" class="modal-screen-container"><ul id="import-tabs" class="modal-tabs"><li class="active"><a href="#" data-target="import-code" data-i18n="import.code.heading">Import Code</a></li><li><a href="#" data-target="import-json" data-i18n="import.json.heading">Import Project JSON</a></li><li><a href="#" data-target="bulk-import-json" data-i18n="import.bulk.heading">Bulk Import</a></li></ul><div id="import-code" class="tab-content active"><div class="modal-screen"><form id="url-import-form"><label for="code-url" data-i18n="import.generic.url">URL</label><br><input type="text" dir="ltr" id="code-url" placeholder="https://"> <button id="url-import-btn" class="wide-button" type="submit" data-i18n="import.code.fromURL">Import from URL</button></form><form id="local-code-import-form"><label for="local-code-input" data-i18n="import.generic.file">Local file</label><br><label for="local-code-input" class="file-input-label" data-i18n="import.code.fromFile" tabindex="0">Import local files</label> <input type="file" id="local-code-input" class="file-input" multiple></form><div class="description help" data-i18n="import.code.desc" data-i18n-prop="innerHTML">Supported Sources:<ul><li>GitHub gist</li><li>GitHub file</li><li>Directory in a GitHub repo</li><li>Gitlab snippet</li><li>Gitlab file</li><li>Directory in a Gitlab repo</li><li>JS Bin</li><li>Raw code</li><li>Code in web page DOM</li><li>Code in zip file</li><li>Official playgrounds<br>(TypeScript and Vue)</li></ul>Please visit the <a href="{{DOCS_BASE_URL}}features/import" target="_blank" rel="noopener">documentations</a> for details.</div></div></div><div id="import-json" class="tab-content"><div class="modal-screen"><div class="description confirm" data-i18n="import.json.desc" data-i18n-prop="innerHTML">Import a single project JSON to editor. A project can be exported from app&nbsp;menu&nbsp;\u2192 Export&nbsp;\u2192 Export&nbsp;Project&nbsp;(JSON).</div><form id="json-url-import-form"><label for="json-url" data-i18n="import.generic.url">URL</label><br><input type="text" dir="ltr" id="json-url" placeholder="https://"> <button id="json-url-import-btn" class="wide-button" type="submit" data-i18n="import.json.fromURL">Import project from URL</button></form><form id="file-url-import-form"><label for="file-input" data-i18n="import.generic.file">Local file</label><br><label for="file-input" class="file-input-label" data-i18n="import.json.fromFile" tabindex="0">Import project from local file</label> <input type="file" id="file-input" class="file-input" accept="application/json"></form></div></div><div id="bulk-import-json" class="tab-content"><div class="modal-screen"><div class="description help" data-i18n="import.bulk.desc" data-i18n-prop="innerHTML">Bulk import multiple projects to your saved projects. Projects can be exported from the <a href="#" id="link-to-saved-projects">Saved Projects</a> screen.</div><form id="bulk-json-url-import-form"><label for="bulk-json-url" data-i18n="import.generic.url">URL</label><br><input type="text" dir="ltr" id="bulk-json-url" placeholder="https://"> <button id="bulk-json-url-import-btn" class="wide-button" type="submit" data-i18n="import.bulk.fromURL">Bulk import from URL</button></form><form id="bulk-file-url-import-form"><label for="bulk-file-input" data-i18n="import.generic.file">Local file</label><br><label for="bulk-file-input" class="file-input-label" data-i18n="import.bulk.fromFile" tabindex="0">Bulk import from local file</label> <input type="file" id="bulk-file-input" class="file-input" accept="application/json"></form></div></div></div></div>';var Ne=e=>Object.entries(D).reduce((t,[r,a])=>t.replace(new RegExp(`{{${r}}}`,"g"),a),e);var $=Ne(W);var U=De(N());var _=(e,t=!0)=>{let r=(0,U.decompressFromEncodedURIComponent)(e);if(r){if(!t)return r;try{if(JSON.parse(r))return r}catch{}}return(0,U.decompressFromBase64)(e)};var J=e=>{let t=e.slice(5),r;try{r=JSON.parse(_(t)||"{}")}catch{r={}}return r};var k=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost")));var z=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],K=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],V=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],j={getModuleUrl:(e,{isModule:t=!0,defaultCDN:r="esm.sh",external:a}={})=>{e=e.replace(/#nobundle/g,"");let u=o=>!a||!o.includes("https://esm.sh")?o:o.includes("?")?`${o}&external=${a}`:`${o}?external=${a}`,d=G(e,t,r);return d?u(d):t?u("https://esm.sh/"+e):"https://cdn.jsdelivr.net/npm/"+e},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:G(e,!1,t||Ge())||e,cdnLists:{npm:K,module:z,gh:V},checkCDNs:async(e,t)=>{let r=[t,...j.cdnLists.npm].filter(Boolean);for(let a of r)try{if((await fetch(j.getUrl(e,a),{method:"HEAD"})).ok)return a}catch{}return j.cdnLists.npm[0]}},Ge=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||j.cdnLists.npm[0]}catch{return j.cdnLists.npm[0]}},G=(e,t,r)=>{let a=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",V[0]):e.includes(":")||(e=(r||(t?z[0]:K[0]))+":"+e);for(let u of ze){let[d,o]=u;if(d.test(e))return e.replace(d,o)+a}return null},ze=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:Ke,getModuleUrl:gt}=j;var Z=Ke("jszip@3.10.1/dist/jszip.js");var X="https://dpaste.com/",Ze="https://dpaste.com/api/v2/",Y="https://api2.livecodes.io/share",ee={getProject:async e=>{try{let t=await fetch(X+e+".txt");return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{try{let t=await fetch(Ze,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return t.ok?(await t.text()).replace(X,""):""}catch{return""}}},Qe={getProject:async e=>{if(e.length<11)return ee.getProject(e);if(!k())return{};try{let t=await fetch(Y+"?id="+e);return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{if(!k())return"";try{let t=await fetch(Y,{method:"POST",mode:"cors",body:JSON.stringify(e)});return t.ok?t.text():""}catch{return""}}},te=k()?Qe:ee;var oe=e=>{let t=e.slice(3);return te.getProject(t)};var q=e=>{try{return e.startsWith("https://")?new URL(e):new URL("https://"+e)}catch{return}},H={github:/^(?:(?:http|https):\/\/)?github\.com\/(?:.*)/g,githubGist:/^(?:(?:http|https):\/\/)?gist\.github\.com(?:\/\S*)?\/(\w+)/g,gitlab:/^(?:(?:http|https):\/\/)?gitlab\.com\/(?:.*)/g,codepen:/^(?:(?:http|https):\/\/)?codepen\.io\/(\w+)\/pen\/(\w+)/g,jsbin:/^(?:(?:(?:http|https):\/\/)?(?:\w+.)?)?jsbin\.com\/((\w)+(\/\d+)?)(?:.*)/g,typescriptPlayground:/^(?:(?:http|https):\/\/)?(?:www\.)?typescriptlang\.org\/play(?:.*)/g,vuePlayground:/^(?:(?:http|https):\/\/)?play\.vuejs\.org(?:.*)/g,sveltePlayground:/^(?:(?:http|https):\/\/)?svelte\.dev\/repl\/(?:.*)/g},re=e=>e.startsWith("code/"),ne=(e,t=new RegExp(H.codepen))=>t.test(e),se=e=>e.startsWith("dom/"),ie=(e,t=new RegExp(H.github))=>{if(t.test(e))try{let r=q(e);return r?r.pathname.split("/")[3]==="blob":void 0}catch{return}};var ce=(e,t=new RegExp(H.github))=>{if(t.test(e))try{let r=q(e);if(!r)return;let a=r.pathname;r.pathname.endsWith("/")&&(a=r.pathname.slice(0,-1));let u=a.split("/");return u[3]==="tree"||u.length===3}catch{return}},ae=(e,t=new RegExp(H.githubGist))=>t.test(e),le=(e,t=new RegExp(H.gitlab))=>{if(t.test(e))try{let r=q(e);return r?r.pathname.split("/")[4]==="blob":void 0}catch{return}},pe=(e,t=new RegExp(H.gitlab))=>{if(t.test(e))try{let r=q(e);if(!r)return;let a=r.pathname;r.pathname.endsWith("/")&&(a=r.pathname.slice(0,-1));let u=a.split("/");return u[4]==="tree"||u.length===3}catch{return}},me=(e,t=new RegExp(H.gitlab))=>{if(!t.test(e))return;let r=q(e);if(!r)return;let a=r.pathname.split("/");return a[a.length-2]==="snippets"},ue=(e,t=new RegExp(H.jsbin))=>t.test(e),de=e=>e.startsWith("id/"),ge=(e,t=new RegExp(H.typescriptPlayground))=>t.test(e),fe=(e,t=new RegExp(H.vuePlayground))=>t.test(e);var he=async(e,t,r,a,u)=>{if(re(e))return J(e);if(de(e))return oe(e);let d=await import(u+"import-src.92fcf9b2bc09fcf908b41c9ab928ede9.js"),{importFromCodepen:o,importFromDom:s,importFromGithub:m,importFromGithubDir:n,importFromGithubGist:p,importFromGitlab:h,importFromGitlabDir:b,importFromGitlabSnippet:L,importFromJsbin:T,importTypescriptPlayground:S,importVuePlayground:x,importFromUrl:v}=d;return se(e)?s(e,t,r):ae(e)?p(e,t):ce(e)?n(e,t,a):ie(e)?m(e,a):me(e)?L(e,t):pe(e)?b(e,t):le(e)?h(e):ne(e)?o(e):ue(e)?T(e):ge(e)?S(e):fe(e)?x(e):P(e)?v(e,t,r):Promise.resolve({})};var ye=async(e,t)=>new Promise(async(r,a)=>{(await B(Z,"JSZip")).loadAsync(e).then(async d=>{let o=d.file(/livecodes\.json/);if(o.length>0){o[0].async("string").then(h=>{r(JSON.parse(h))}).catch(a);return}let s=d.file(/((^src\/)|(\/src\/))/),m=d.file(/.*/),n=m.filter(h=>!h.name.includes("/")),p=s.length>0?s:n.length>0?n:m;if(p.length>0){let h=await Promise.all(p.map(async b=>({filename:b.name,content:await b.async("string")})));r(t(h,{}));return}r({})}).catch(a)});var xe=async(e,t,r)=>{let a=o=>new Promise((s,m)=>{let n=[];for(let p of o){if(p.size>104857600){m("Error: Exceeded size 100 MB");return}let b=new FileReader;r.addEventListener(b,"load",L=>{let T=L.target?.result||"";n.push({filename:p.name,content:T}),n.length===o.length&&s(t(n,{}))}),r.addEventListener(b,"error",()=>{m("Error: Failed to read file")}),b.readAsText(p)}}),u=o=>ye(o[0],t);return e?.length?(e?.length===1&&e[0].name.endsWith(".zip")?u:a)(e):{}};var be=e=>e.querySelector("#url-import-form"),Se=e=>e.querySelector("#url-import-btn"),F=e=>e.querySelector("#code-url"),Te=e=>e.querySelector("#local-code-input"),Le=e=>e.querySelector("#json-url-import-form"),Ee=e=>e.querySelector("#json-url-import-btn"),ve=e=>e.querySelector("#json-url"),we=e=>e.querySelector("#bulk-json-url-import-form"),Me=e=>e.querySelector("#bulk-json-url-import-btn"),He=e=>e.querySelector("#bulk-json-url"),je=e=>e.querySelector("#link-to-saved-projects"),Ue=e=>e.querySelector("#file-input");var ke=e=>e.querySelector("#bulk-file-input");var Xe=e=>{let t=document.createElement("div");t.innerHTML=$;let r=t.firstChild,a=r.querySelectorAll("#import-tabs li");return a.forEach(u=>{let d=u.querySelector("a");d&&e.addEventListener(d,"click",()=>{a.forEach(s=>s.classList.remove("active")),u.classList.add("active"),document.querySelectorAll("#import-screens > div").forEach(s=>{s.classList.remove("active")});let o=r.querySelector("#"+d.dataset.target);o?.classList.add("active"),o?.querySelector("input")?.focus()})}),r},Sr=({baseUrl:e,modal:t,notifications:r,eventsManager:a,getUser:u,loadConfig:d,populateConfig:o,projectStorage:s,showScreen:m})=>{let n=Xe(a),p=be(n),h=Se(n);a.addEventListener(p,"submit",async f=>{f.preventDefault();let l=h.innerHTML;h.innerHTML=window.deps.translateString("generic.loading","Loading..."),h.disabled=!0;let E=F(n),w=E.value,M=await he(w,{},R,await u?.(),e);M&&Object.keys(M).length>0?(await d({...R,...M},location.origin+location.pathname+"?x="+encodeURIComponent(w)),t.close()):(h.innerHTML=l,h.disabled=!1,r.error(window.deps.translateString("import.error.failedToLoadURL","Error: failed to load URL")),E.focus())});let b=Te(n);a.addEventListener(b,"change",()=>{b.files?.length&&xe(b.files,o,a).then(d).then(t.close).catch(f=>{r.error(f)})});let L=Le(n),T=Ee(n);a.addEventListener(L,"submit",async f=>{f.preventDefault();let l=T.innerHTML;T.innerHTML=window.deps.translateString("generic.loading","Loading..."),T.disabled=!0;let E=ve(n),w=E.value;I(w).then(M=>M.json()).then(M=>d(M,location.origin+location.pathname+"?config="+w)).then(()=>t.close()).catch(()=>{T.innerHTML=l,T.disabled=!1,r.error(window.deps.translateString("import.error.failedToLoadURL","Error: failed to load URL")),E.focus()})});let S=we(n),x=Me(n);a.addEventListener(S,"submit",async f=>{f.preventDefault(),r.info(window.deps.translateString("import.bulk.started","Bulk import started..."));let l=x.innerHTML;x.innerHTML=window.deps.translateString("generic.loading","Loading..."),x.disabled=!0;let E=He(n),w=E.value;I(w).then(M=>M.json()).then(g).catch(()=>{x.innerHTML=l,x.disabled=!1,r.error(window.deps.translateString("import.error.failedToLoadURL","Error: failed to load URL")),E.focus()})});let v=f=>new Promise((l,E)=>{if(f.files?.length===0)return;let w=f.files[0];if(["application/json","text/plain"].indexOf(w.type)===-1){E("Error: Incorrect file type");return}let qe=100*1024*1024;if(w.size>qe){E(window.deps.translateString("generic.error.exceededSize","Error: Exceeded size {{size}} MB",{size:100}));return}let A=new FileReader;a.addEventListener(A,"load",async Ie=>{let Ce=Ie.target?.result||"";try{l(JSON.parse(Ce))}catch{E(window.deps.translateString("import.error.invalidConfigFile","Invalid configuration file"))}}),a.addEventListener(A,"error",()=>{E(window.deps.translateString("generic.error.failedToReadFile","Error: Failed to read file"))}),A.readAsText(w)}),g=async f=>{let l=E=>E.config||E.pen;if(Array.isArray(f)&&f.every(l)&&s){await s.bulkInsert(f.map(l)),r.success(window.deps.translateString("import.success","Import Successful!")),m("open");return}return Promise.reject(window.deps.translateString("import.error.invalidFile","Error: Invalid file"))},y=Ue(n);a.addEventListener(y,"change",()=>{v(y).then(d).then(t.close).catch(f=>{r.error(f)})});let i=ke(n);a.addEventListener(i,"change",()=>{r.info(window.deps.translateString("import.bulk.started","Bulk import started...")),v(i).then(g).catch(f=>{r.error(f)})});let c=je(n);a.addEventListener(c,"click",f=>{f.preventDefault(),m("open")}),t.show(n,{isAsync:!0}),F(n).focus()};export{Sr as createImportUI,he as importCode};
