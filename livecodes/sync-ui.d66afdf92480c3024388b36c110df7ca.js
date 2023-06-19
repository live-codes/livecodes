var M=`<div id="sync-container" class="modal-container">
  <div class="modal-title">Sync to GitHub Repo</div>
  <div id="sync-status" class="modal-status"></div>
  <ul id="sync-tabs" class="modal-tabs">
    <li data-target="new-repo" class="active">Create New Repo</li>
    <li data-target="existing-repo">Existing Repo</li>
  </ul>
  <div id="sync-screens" class="modal-screen-container">
    <div id="new-repo" class="tab-content active">
      <div class="modal-screen">
        <form id="new-repo-form">
          <div>
            <label for="new-repo-name"
              >Repo Name <span id="new-repo-name-error" class="error"></span
            ></label>
            <input type="text" id="new-repo-name" placeholder="Required" />
          </div>
          <div class="padded">
            <input type="checkbox" id="new-repo-autosync" checked />
            <label for="new-repo-autosync">Auto sync</label>
          </div>
          <button id="new-repo-btn" class="wide-button start-sync-btn" type="submit">Sync</button>
        </form>
        <div class="description">
          A new <strong>private</strong> repo will be created. Your LiveCodes local data will be
          synchronized with <span class="code">main</span> branch.
        </div>
      </div>
    </div>
    <div id="existing-repo" class="tab-content">
      <div class="modal-screen">
        <form id="existing-repo-form">
          <div>
            <label for="existing-repo-name">Repo Name</label>
            <input
              type="text"
              id="existing-repo-name"
              autocomplete="off"
              placeholder="Loading..."
            />
          </div>
          <div class="padded">
            <input type="checkbox" id="existing-repo-autosync" checked />
            <label for="existing-repo-autosync">Auto sync</label>
          </div>
          <button id="existing-repo-btn" class="wide-button start-sync-btn" type="submit">
            sync
          </button>
        </form>
        <div class="description">
          Your LiveCodes local data will be synchronized with
          <span class="code">main</span> branch.
        </div>
      </div>
    </div>
  </div>
</div>
`;var J=e=>e.replace(/{{APP_VERSION}}/g,"4").replace(/{{SDK_VERSION}}/g,"0.0.2").replace(/{{COMMIT_SHA}}/g,"b09b1b6").replace(/{{REPO_URL}}/g,"https://github.com/live-codes/livecodes").replace(/{{DOCS_BASE_URL}}/g,"/livecodes/docs/");var w=J(M);var q=["jspm","skypack"],v=["jsdelivr","unpkg","fastly.jsdelivr"],k=["jsdelivr.gh","statically"],g={getModuleUrl:(e,{isModule:o=!0,defaultCDN:n="jspm"}={})=>{e=e.replace(/#nobundle/g,"");let t=H(e,o,n);return t||(o?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,o)=>e.startsWith("http")?e:H(e,!1,o||V())||e,cdnLists:{npm:v,module:q,gh:k},checkCDNs:async(e,o)=>{let n=[o,...g.cdnLists.npm].filter(Boolean);for(let t of n)try{if((await fetch(g.getUrl(e,t),{method:"HEAD"})).ok)return t}catch{}return g.cdnLists.npm[0]}},V=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||g.cdnLists.npm[0]}catch{return g.cdnLists.npm[0]}},H=(e,o,n)=>{let t=o&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",k[0]):e.includes(":")||(e=(n||(o?q[0]:v[0]))+":"+e);for(let r of K){let[c,a]=r;if(c.test(e))return e.replace(c,a)+t}return null},K=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:U,getModuleUrl:re}=g;var j=U("@tarekraafat/autocomplete.js@10.2.6/dist/autoComplete.js");var Z="0.6.64",se=U(`malinajs@${Z}/malina.js`);var Q=(e,o)=>({Accept:`application/vnd.github.v3${o?"."+o:""}+json`,"Content-Type":"application/json",Authorization:"token "+e.token});var R=async(e,o="public")=>{let n=1,t=100,r=5,c=[];for(;n<=r;){let a=await fetch(`https://api.github.com/user/repos?type=${o}&per_page=${t}&page=${n}`,{method:"GET",cache:"no-store",headers:Q(e)});if(n+=1,!a.ok)continue;let s=await a.json();c.push(...s.map(p=>p.name)),s.length<t&&(n=r+1)}return c};var f=()=>document.querySelector("#sync-link"),C=()=>document.querySelector("#sync-indicator");var I=e=>e.querySelector("#new-repo-form");var A=e=>e.querySelector("#new-repo-name");var B=e=>e.querySelector("#new-repo-autosync"),$=e=>e.querySelector("#existing-repo-form");var E=e=>e.querySelector("#existing-repo-name");var D=e=>e.querySelector("#existing-repo-autosync");var N=e=>(e||document).querySelector("#sync-status"),P=e=>(e||document).querySelectorAll(".start-sync-btn");var Y=(e,o)=>{let n=document.createElement("div");n.innerHTML=w;let t=n.firstChild,r=t.querySelectorAll("#sync-tabs li");return r.forEach(c=>{e.addEventListener(c,"click",()=>{r.forEach(s=>s.classList.remove("active")),c.classList.add("active"),document.querySelectorAll("#sync-screens > div").forEach(s=>{s.classList.remove("active")});let a=t.querySelector("#"+c.dataset.target);a?.classList.add("active"),a?.querySelector("input")?.focus()})}),o&&setTimeout(()=>{r[1].click();let c=E(t);c.value=o}),t},b="Sync in progress...",h=()=>f()?.dataset.hint===b,y=({inProgress:e,lastSync:o,syncContainer:n})=>{let t=f(),r=C(),c=N(n),a=P(n),s=o?`Last sync: ${new Date(o).toLocaleString()}`:"";c&&(c.innerText=s),e??h()?(t&&(t.classList.add("hint--bottom"),t.dataset.hint=b,r?.classList.remove("hidden")),a?.forEach(p=>{p.innerText=b,p.disabled=!0})):(t&&(t.classList.toggle("hint--bottom",!!s),t.dataset.hint=s,r?.classList.add("hidden")),a?.forEach(p=>{p.innerText="Sync",p.disabled=!1}))},xe=async({baseUrl:e,modal:o,notifications:n,eventsManager:t,user:r,deps:c})=>{let a=await c.getSyncData(),s=Y(t,a?.repo),p=I(s),L=A(s),F=B(s),O=$(s),x=E(s),W=D(s);y({inProgress:h(),lastSync:a?.lastSync,syncContainer:s});let z=import(e+"sync.ad4bf793795cae03b494f1faa0e15082.js").then(i=>(i.init(e),i)),S=(i,l,m)=>(n.info("Sync started..."),o.close(),z.then(async d=>{if(!await d.sync({user:i,repo:l,newRepo:m})){n.error("Sync failed!");return}n.success("Sync complete!")}).catch(()=>{n.error("Sync failed!")}));t.addEventListener(p,"submit",async i=>{if(i.preventDefault(),!r||h())return;let l=L.value,m=F.checked,d=!0;if(!l){n.error("Repo name is required");return}y({inProgress:!0}),await S(r,l,d);let u=Date.now();await c.setSyncData({autosync:m,repo:l,lastSync:u}),y({inProgress:!1,lastSync:u})}),t.addEventListener(O,"submit",async i=>{if(i.preventDefault(),!r||h())return;let l=x.value,m=W.checked,d=!1;if(!l){n.error("Repo name is required");return}y({inProgress:!0}),await S(r,l,d);let u=Date.now();await c.setSyncData({autosync:m,repo:l,lastSync:u}),y({inProgress:!1,lastSync:u})});let T;import(j).then(async()=>{if(T=globalThis.autoComplete,!r)return;let i=await R(r,"all");t.addEventListener(x,"init",()=>{x.focus()});let l="#"+x.id;if(!document.querySelector(l))return;let m=new T({selector:l,placeHolder:"Search your repos...",data:{src:i},resultItem:{highlight:{render:!0}}});t.addEventListener(m.input,"selection",function(d){let u=d.detail;m.input.blur();let _=u.selection.value;m.input.value=_})}),o.show(s,{isAsync:!0}),L.focus()};export{xe as createSyncUI,h as isSyncInProgress,y as updateSyncStatus};
//# sourceMappingURL=sync-ui.js.map
