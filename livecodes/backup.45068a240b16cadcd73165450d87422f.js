var _=(e,t="_")=>e.replace(/[\W]+/g,t);var H=(e,t,n)=>{let o=document.createElement("a");o.style.display="none",o.href=n,o.download=_(e)+"."+t,o.click(),o.remove()},L=(e,t)=>new Promise((n,o)=>{if(t&&globalThis[t])return n(globalThis[t]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),t&&globalThis[t]?n(globalThis[t]):n(globalThis);let s=document.createElement("script");s.src=e,s.async=!0;let a=()=>{s.removeEventListener("load",c),s.removeEventListener("error",g)},c=()=>{if(a(),!t)return n("loaded: "+e);let b=setInterval(()=>{if(window[t])return clearInterval(b),n(window[t])},5)},g=()=>{a(),o("failed to load: "+e)};s.addEventListener("load",c),s.addEventListener("error",g),document.head.appendChild(s)});var v=()=>{let e=new Date,t=e.getTimezoneOffset();return e=new Date(e.getTime()-t*60*1e3),e.toISOString().split("T")[0]};var w=e=>new Uint8Array(atob(e).split("").map(t=>t.charCodeAt(0)));var q={APP_VERSION:"36",SDK_VERSION:"0.7.0",COMMIT_SHA:"60bdd1b",REPO_URL:"https://github.com/live-codes/livecodes",DOCS_BASE_URL:"/livecodes/docs/"};var j='<div id="backup-container" class="modal-container"><div class="modal-title" data-i18n="backup.heading">Backup / Restore</div><div id="backup-screens" class="modal-screen-container"><ul id="backup-tabs" class="modal-tabs"><li data-target="backup" class="active" data-i18n="backup.backup.heading">Backup</li><li data-target="restore" data-i18n="backup.restore.heading">Restore</li></ul><div id="backup" class="tab-content active"><div class="modal-screen"><div class="description help" data-i18n="backup.backup.desc" data-i18n-prop="innerHTML">Backup LiveCodes data, so that it can be later restored on this or other devices.<br>Please visit the <a href="{{DOCS_BASE_URL}}features/backup-restore" target="_blank" rel="noopener">documentations</a> for details.</div><form id="backup-form"><div id="backup-stores"><div class="backup-store"><input type="checkbox" id="backup-projects-checkbox" data-store="projects" checked> <label for="backup-projects-checkbox" data-i18n="backup.backup.projects">Projects</label></div><div class="backup-store"><input type="checkbox" id="backup-templates-checkbox" data-store="templates" checked> <label for="backup-templates-checkbox" data-i18n="backup.backup.templates">User Templates</label></div><div class="backup-store"><input type="checkbox" id="backup-snippets-checkbox" data-store="snippets" checked> <label for="backup-snippets-checkbox" data-i18n="backup.backup.snippets">Code Snippets</label></div><div class="backup-store"><input type="checkbox" id="backup-assets-checkbox" data-store="assets" checked> <label for="backup-assets-checkbox" data-i18n="backup.backup.assets">Assets</label></div><div class="backup-store"><input type="checkbox" id="backup-user-settings-checkbox" data-store="userConfig" checked> <label for="backup-user-settings-checkbox" data-i18n="backup.backup.settings">User Settings</label></div></div><button id="backup-btn" class="wide-button" type="submit" data-i18n="backup.backup.button">Backup</button></form></div></div><div id="restore" class="tab-content"><div class="modal-screen"><div class="description help" data-i18n="backup.restore.desc" data-i18n-prop="innerHTML">Restore previously backed-up LiveCodes data.<br>If you choose to replace current content, you may want to back it up first.<br>Please visit the <a href="{{DOCS_BASE_URL}}features/backup-restore" target="_blank" rel="noopener">documentations</a> for details.</div><form id="restore-form"><div class="input-container"><span><input type="radio" name="restore-mode" id="restore-mode-replace" value="replace" checked> <label class="radio-label" for="restore-mode-replace" data-i18n="backup.restore.mode.replace">Replace current content</label> </span><span><input type="radio" name="restore-mode" id="restore-mode-merge" value="merge"> <label class="radio-label" for="restore-mode-merge" data-i18n="backup.restore.mode.merge">Merge with current content</label></span></div><label for="file-input" class="file-input-label" data-i18n="backup.restore.fromFile">Restore from file</label> <input type="file" id="file-input" class="file-input" accept=".zip,zip,application/zip,application/x-zip,application/x-zip-compressed"></form></div></div></div></div>';var V=e=>Object.entries(q).reduce((t,[n,o])=>t.replace(new RegExp(`{{${n}}}`,"g"),o),e);var U=V(j);var C=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],A=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],I=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],u={getModuleUrl:(e,{isModule:t=!0,defaultCDN:n="esm.sh"}={})=>{e=e.replace(/#nobundle/g,"");let o=B(e,t,n);return o||(t?"https://esm.sh/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:B(e,!1,t||Z())||e,cdnLists:{npm:A,module:C,gh:I},checkCDNs:async(e,t)=>{let n=[t,...u.cdnLists.npm].filter(Boolean);for(let o of n)try{if((await fetch(u.getUrl(e,o),{method:"HEAD"})).ok)return o}catch{}return u.cdnLists.npm[0]}},Z=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||u.cdnLists.npm[0]}catch{return u.cdnLists.npm[0]}},B=(e,t,n)=>{let o=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",I[0]):e.includes(":")||(e=(n||(t?C[0]:A[0]))+":"+e);for(let s of K){let[a,c]=s;if(a.test(e))return e.replace(a,c)+o}return null},K=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:G,getModuleUrl:ce}=u;var T=G("jszip@3.10.1/dist/jszip.js");var S=()=>document.querySelector("#backup-link");var E=e=>e.querySelector("#file-input"),R=e=>e.querySelector(".file-input-label");var D=e=>e.querySelector("#backup-form"),P=e=>e.querySelector("#backup-btn"),$=e=>e.querySelectorAll('#backup input[type="checkbox"]:checked');var Q=e=>{let t=document.createElement("div");t.innerHTML=U;let n=t.firstChild,o=n.querySelectorAll("#backup-tabs li");return o.forEach(s=>{e.addEventListener(s,"click",()=>{o.forEach(c=>c.classList.remove("active")),s.classList.add("active"),document.querySelectorAll("#backup-screens > div").forEach(c=>{c.classList.remove("active")});let a=n.querySelector("#"+s.dataset.target);a?.classList.add("active"),a?.querySelector("input")?.focus()})}),n},f=window.deps.translateString("backup.inProgress","In progress..."),X=()=>S()?.title===f,x=({inProgress:e,backupContainer:t})=>{let n=S(),o=P(t),s=E(t),a=R(t);e??X()?(n&&(n.title=f),o.innerText=f,o.disabled=!0,a.innerText=f,s.disabled=!0):(n&&(n.title=""),o.innerText=window.deps.translateString("backup.backupBtn","Backup"),o.disabled=!1,a.innerText=window.deps.translateString("backup.fileInputLabel","Restore from file"),s.disabled=!1)},de=({baseUrl:e,modal:t,notifications:n,eventsManager:o,stores:s,deps:a})=>{let c=Q(o),g=D(c),b=E(c);x({backupContainer:c});let M=import(e+"sync.b7b307f1c4dcb61691931d6e795bce26.js").then(r=>(r.init(e),r)),F=async r=>{let p=await L(T,"JSZip"),i=new p;r.forEach(({filename:k,content:h})=>{i.file(k,h)});let l=await i.generateAsync({type:"base64",compression:"DEFLATE",compressionOptions:{level:6}}),m="livecodes_backup_"+v(),d="zip",y="data:application/zip;base64,"+encodeURIComponent(l);H(m,d,y)},N=async()=>{let r=[...$(c)].map(l=>l.dataset.store).filter(Boolean);if(r.length===0){n.warning(window.deps.translateString("backup.error.atLeastOneStore","Please select at least one store to backup"));return}r.includes("userConfig")&&(r.push("userData"),r.push("appData"));let p=await M,i=await Promise.all(r.filter(l=>!!s[l]).map(async l=>({filename:l+".b64",content:await p.exportStoreAsBase64Update({storeKey:l})||""})));await F(i)},O=r=>new Promise((p,i)=>{if(r.files?.length===0)return;let l=r.files[0];if(!l.name.endsWith(".zip")){i(window.deps.translateString("backup.error.incorrectFileType","Error: Incorrect file type"));return}let m=100*1024*1024;if(l.size>m){i(window.deps.translateString("generic.error.exceededSize","Error: Exceeded size {{size}} MB",{size:100}));return}p(l)}),W=async r=>{let l=(await(await L(T,"JSZip")).loadAsync(r)).file(/\.b64$/);return Promise.all(l.map(async m=>({filename:m.name,content:await m.async("string")})))},z=async r=>{let p=await M,l=new FormData(g).get("restore-mode")==="merge";for(let d of r){let y=d.filename.slice(0,-4);if(s[y]){let h=w(d.content);await p.restoreFromUpdate({update:h,storeKey:y,mergeCurrent:l})}}r.find(d=>d.filename.startsWith("user"))&&a.loadUserConfig(),n.success(window.deps.translateString("backup.restore.success","Restored Successfully!"))};o.addEventListener(g,"submit",async r=>{r.preventDefault(),x({inProgress:!0,backupContainer:c}),await N(),x({inProgress:!1,backupContainer:c})}),o.addEventListener(b,"change",async()=>{x({inProgress:!0,backupContainer:c}),await Promise.resolve(b).then(O).then(W).then(z).catch(r=>{n.error(r)}),x({inProgress:!1,backupContainer:c})}),t.show(c,{isAsync:!0})};export{de as createBackupUI,X as isInProgress,x as updateProgressStatus};
