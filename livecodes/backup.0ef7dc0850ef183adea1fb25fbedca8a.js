var _=(e,t="_")=>e.replace(/[\W]+/g,t);var k=(e,t,n)=>{let o=document.createElement("a");o.style.display="none",o.href=n,o.download=_(e)+"."+t,o.click(),o.remove()},T=(e,t)=>new Promise((n,o)=>{if(t&&globalThis[t])return n(globalThis[t]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),t&&globalThis[t]?n(globalThis[t]):n(globalThis);let r=document.createElement("script");r.src=e,r.async=!0;let l=()=>{r.removeEventListener("load",s),r.removeEventListener("error",i)},s=()=>{if(l(),!t)return n("loaded: "+e);let y=setInterval(()=>{if(window[t])return clearInterval(y),n(window[t])},5)},i=()=>{l(),o("failed to load: "+e)};r.addEventListener("load",s),r.addEventListener("error",i),document.head.appendChild(r)});var v=()=>{let e=new Date,t=e.getTimezoneOffset();return e=new Date(e.getTime()-t*60*1e3),e.toISOString().split("T")[0]};var w=e=>new Uint8Array(atob(e).split("").map(t=>t.charCodeAt(0)));var q={APP_VERSION:"39",SDK_VERSION:"0.8.0",COMMIT_SHA:"523f456",REPO_URL:"https://github.com/live-codes/livecodes",DOCS_BASE_URL:"/livecodes/docs/"};var j='<div id="backup-container" class="modal-container"><div class="modal-title" data-i18n="backup.heading">Backup / Restore</div><div id="backup-screens" class="modal-screen-container"><ul id="backup-tabs" class="modal-tabs"><li class="active"><a href="#" data-target="backup" data-i18n="backup.backup.heading">Backup</a></li><li><a href="#" data-target="restore" data-i18n="backup.restore.heading">Restore</a></li></ul><div id="backup" class="tab-content active"><div class="modal-screen"><div class="description help" data-i18n="backup.backup.desc" data-i18n-prop="innerHTML">Backup LiveCodes data, so that it can be later restored on this or other devices.<br>Please visit the <a href="{{DOCS_BASE_URL}}features/backup-restore" target="_blank" rel="noopener">documentations</a> for details.</div><form id="backup-form"><div id="backup-stores"><div class="backup-store"><input type="checkbox" id="backup-projects-checkbox" data-store="projects" checked> <label for="backup-projects-checkbox" data-i18n="backup.backup.projects">Projects</label></div><div class="backup-store"><input type="checkbox" id="backup-templates-checkbox" data-store="templates" checked> <label for="backup-templates-checkbox" data-i18n="backup.backup.templates">User Templates</label></div><div class="backup-store"><input type="checkbox" id="backup-snippets-checkbox" data-store="snippets" checked> <label for="backup-snippets-checkbox" data-i18n="backup.backup.snippets">Code Snippets</label></div><div class="backup-store"><input type="checkbox" id="backup-assets-checkbox" data-store="assets" checked> <label for="backup-assets-checkbox" data-i18n="backup.backup.assets">Assets</label></div><div class="backup-store"><input type="checkbox" id="backup-user-settings-checkbox" data-store="userConfig" checked> <label for="backup-user-settings-checkbox" data-i18n="backup.backup.settings">User Settings</label></div></div><button id="backup-btn" class="wide-button" type="submit" data-i18n="backup.backup.button">Backup</button></form></div></div><div id="restore" class="tab-content"><div class="modal-screen"><div class="description help" data-i18n="backup.restore.desc" data-i18n-prop="innerHTML">Restore previously backed-up LiveCodes data.<br>If you choose to replace current content, you may want to back it up first.<br>Please visit the <a href="{{DOCS_BASE_URL}}features/backup-restore" target="_blank" rel="noopener">documentations</a> for details.</div><form id="restore-form"><div class="input-container"><span><input type="radio" name="restore-mode" id="restore-mode-replace" value="replace" checked> <label class="radio-label" for="restore-mode-replace" data-i18n="backup.restore.mode.replace">Replace current content</label> </span><span><input type="radio" name="restore-mode" id="restore-mode-merge" value="merge"> <label class="radio-label" for="restore-mode-merge" data-i18n="backup.restore.mode.merge">Merge with current content</label></span></div><label for="file-input" class="file-input-label" data-i18n="backup.restore.fromFile" tabindex="0">Restore from file</label> <input type="file" id="file-input" class="file-input" accept=".zip,zip,application/zip,application/x-zip,application/x-zip-compressed"></form></div></div></div></div>';var J=e=>Object.entries(q).reduce((t,[n,o])=>t.replace(new RegExp(`{{${n}}}`,"g"),o),e);var U=J(j);var A=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],C=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],I=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],d={getModuleUrl:(e,{isModule:t=!0,defaultCDN:n="esm.sh",external:o}={})=>{e=e.replace(/#nobundle/g,"");let r=s=>!o||!s.includes("https://esm.sh")?s:s.includes("?")?`${s}&external=${o}`:`${s}?external=${o}`,l=B(e,t,n);return l?r(l):t?r("https://esm.sh/"+e):"https://cdn.jsdelivr.net/npm/"+e},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:B(e,!1,t||K())||e,cdnLists:{npm:C,module:A,gh:I},checkCDNs:async(e,t)=>{let n=[t,...d.cdnLists.npm].filter(Boolean);for(let o of n)try{if((await fetch(d.getUrl(e,o),{method:"HEAD"})).ok)return o}catch{}return d.cdnLists.npm[0]}},K=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||d.cdnLists.npm[0]}catch{return d.cdnLists.npm[0]}},B=(e,t,n)=>{let o=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",I[0]):e.includes(":")||(e=(n||(t?A[0]:C[0]))+":"+e);for(let r of Z){let[l,s]=r;if(l.test(e))return e.replace(l,s)+o}return null},Z=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:G,getModuleUrl:ce}=d;var L=G("jszip@3.10.1/dist/jszip.js");var S=()=>document.querySelector("#backup-link");var E=e=>e.querySelector("#file-input"),R=e=>e.querySelector(".file-input-label");var D=e=>e.querySelector("#backup-form"),P=e=>e.querySelector("#backup-btn"),$=e=>e.querySelectorAll('#backup input[type="checkbox"]:checked');var Q=e=>{let t=document.createElement("div");t.innerHTML=U;let n=t.firstChild,o=n.querySelectorAll("#backup-tabs li");return o.forEach(r=>{let l=r.querySelector("a");l&&e.addEventListener(l,"click",()=>{o.forEach(i=>i.classList.remove("active")),r.classList.add("active"),document.querySelectorAll("#backup-screens > div").forEach(i=>{i.classList.remove("active")});let s=n.querySelector("#"+l.dataset.target);s?.classList.add("active"),s?.querySelector("input")?.focus()})}),n},f=window.deps.translateString("backup.inProgress","In progress..."),X=()=>S()?.title===f,x=({inProgress:e,backupContainer:t})=>{let n=S(),o=P(t),r=E(t),l=R(t);e??X()?(n&&(n.title=f),o.innerText=f,o.disabled=!0,l.innerText=f,r.disabled=!0):(n&&(n.title=""),o.innerText=window.deps.translateString("backup.backupBtn","Backup"),o.disabled=!1,l.innerText=window.deps.translateString("backup.fileInputLabel","Restore from file"),r.disabled=!1)},de=({baseUrl:e,modal:t,notifications:n,eventsManager:o,stores:r,deps:l})=>{let s=Q(o),i=D(s),y=E(s);x({backupContainer:s});let M=import(e+"sync.1e608a3b90e6ccee46e41e041afc0684.js").then(c=>(c.init(e),c)),F=async c=>{let m=await T(L,"JSZip"),p=new m;c.forEach(({filename:H,content:h})=>{p.file(H,h)});let a=await p.generateAsync({type:"base64",compression:"DEFLATE",compressionOptions:{level:6}}),u="livecodes_backup_"+v(),g="zip",b="data:application/zip;base64,"+encodeURIComponent(a);k(u,g,b)},N=async()=>{let c=[...$(s)].map(a=>a.dataset.store).filter(Boolean);if(c.length===0){n.warning(window.deps.translateString("backup.error.atLeastOneStore","Please select at least one store to backup"));return}c.includes("userConfig")&&(c.push("userData"),c.push("appData"));let m=await M,p=await Promise.all(c.filter(a=>!!r[a]).map(async a=>({filename:a+".b64",content:await m.exportStoreAsBase64Update({storeKey:a})||""})));await F(p)},O=c=>new Promise((m,p)=>{if(c.files?.length===0)return;let a=c.files[0];if(!a.name.endsWith(".zip")){p(window.deps.translateString("backup.error.incorrectFileType","Error: Incorrect file type"));return}let u=100*1024*1024;if(a.size>u){p(window.deps.translateString("generic.error.exceededSize","Error: Exceeded size {{size}} MB",{size:100}));return}m(a)}),W=async c=>{let a=(await(await T(L,"JSZip")).loadAsync(c)).file(/\.b64$/);return Promise.all(a.map(async u=>({filename:u.name,content:await u.async("string")})))},z=async c=>{let m=await M,a=new FormData(i).get("restore-mode")==="merge";for(let g of c){let b=g.filename.slice(0,-4);if(r[b]){let h=w(g.content);await m.restoreFromUpdate({update:h,storeKey:b,mergeCurrent:a})}}c.find(g=>g.filename.startsWith("user"))&&l.loadUserConfig(),n.success(window.deps.translateString("backup.restore.success","Restored Successfully!"))};o.addEventListener(i,"submit",async c=>{c.preventDefault(),x({inProgress:!0,backupContainer:s}),await N(),x({inProgress:!1,backupContainer:s})}),o.addEventListener(y,"change",async()=>{x({inProgress:!0,backupContainer:s}),await Promise.resolve(y).then(O).then(W).then(z).catch(c=>{n.error(c)}),x({inProgress:!1,backupContainer:s})}),t.show(s,{isAsync:!0})};export{de as createBackupUI,X as isInProgress,x as updateProgressStatus};
