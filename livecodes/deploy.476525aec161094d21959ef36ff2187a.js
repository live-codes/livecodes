var Ue=typeof btoa=="function",q=typeof Buffer=="function",Qe=typeof TextDecoder=="function"?new TextDecoder:void 0,D=typeof TextEncoder=="function"?new TextEncoder:void 0,ke="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",M=Array.prototype.slice.call(ke),Xe=(e=>{let t={};return e.forEach((o,n)=>t[o]=n),t})(M);var f=String.fromCharCode.bind(String),Ye=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),je=e=>e.replace(/=/g,"").replace(/[+\/]/g,t=>t=="+"?"-":"_");var Re=e=>{let t,o,n,a,r="",s=e.length%3;for(let c=0;c<e.length;){if((o=e.charCodeAt(c++))>255||(n=e.charCodeAt(c++))>255||(a=e.charCodeAt(c++))>255)throw new TypeError("invalid character found");t=o<<16|n<<8|a,r+=M[t>>18&63]+M[t>>12&63]+M[t>>6&63]+M[t&63]}return s?r.slice(0,s-3)+"===".substring(s):r},N=Ue?e=>btoa(e):q?e=>Buffer.from(e,"binary").toString("base64"):Re,Ae=q?e=>Buffer.from(e).toString("base64"):e=>{let o=[];for(let n=0,a=e.length;n<a;n+=4096)o.push(f.apply(null,e.subarray(n,n+4096)));return N(o.join(""))};var Ie=e=>{if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?f(192|t>>>6)+f(128|t&63):f(224|t>>>12&15)+f(128|t>>>6&63)+f(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return f(240|t>>>18&7)+f(128|t>>>12&63)+f(128|t>>>6&63)+f(128|t&63)}},Be=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,$e=e=>e.replace(Be,Ie),P=q?e=>Buffer.from(e,"utf8").toString("base64"):D?e=>Ae(D.encode(e)):e=>N($e(e)),_=(e,t=!1)=>t?je(P(e)):P(e);var h=(e,t="_")=>e.replace(/[\W]+/g,t);var U=(e,t)=>new Promise((o,n)=>{if(t&&globalThis[t])return o(globalThis[t]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),t&&globalThis[t]?o(globalThis[t]):o(globalThis);let a=document.createElement("script");a.src=e,a.async=!0;let r=()=>{a.removeEventListener("load",s),a.removeEventListener("error",c)},s=()=>{if(r(),!t)return o("loaded: "+e);let i=setInterval(()=>{if(window[t])return clearInterval(i),o(window[t])},5)},c=()=>{r(),n("failed to load: "+e)};a.addEventListener("load",s),a.addEventListener("error",c),document.head.appendChild(a)});var W={APP_VERSION:"39",SDK_VERSION:"0.8.0",COMMIT_SHA:"523f456",REPO_URL:"https://github.com/live-codes/livecodes",DOCS_BASE_URL:"/livecodes/docs/"};var O='<!doctype html><html><head><script id="message-script" data-env="development">window.addEventListener("message",(function(e){var t=e.data.result||e.data.html;t&&(document.write(t),document.close())}))<\/script></head><body></body></html>';var z='<div id="deploy-container" class="modal-container"><div class="modal-title" data-i18n="deploy.heading">Deploy to GitHub Pages</div><div id="deploy-screens" class="modal-screen-container"><ul id="deploy-tabs" class="modal-tabs"><li class="active"><a href="#" data-target="new-repo" data-i18n="deploy.create.heading">Create New Repo</a></li><li><a href="#" data-target="existing-repo" data-i18n="deploy.existing.heading">Existing Repo</a></li></ul><div id="new-repo" class="tab-content active"><div class="modal-screen"><form id="new-repo-form"><div><label for="new-repo-name" data-i18n="deploy.create.repoName" data-i18n-prop="innerHTML">Repo Name <span id="new-repo-name-error" class="error"></span></label> <input type="text" id="new-repo-name" placeholder="Required" data-i18n="generic.required" data-i18n-prop="placeholder"></div><div><label for="new-repo-message" data-i18n="deploy.generic.commitMessage">Commit Message</label> <input type="text" id="new-repo-message" placeholder="Optional" data-i18n="generic.optional" data-i18n-prop="placeholder"></div><div class="padded"><input type="checkbox" id="new-repo-source"> <label for="new-repo-source" data-i18n="deploy.generic.commitSourceCodePublic">Commit source code (public)</label></div><button id="new-repo-btn" class="wide-button" type="submit" data-i18n="deploy.generic.deployBtn">Deploy</button></form><div class="description help" data-i18n="deploy.create.desc" data-i18n-prop="innerHTML">A new <strong>public</strong> repo will be created. The result page will be pushed to <span class="code">gh-pages</span> branch.</div></div></div><div id="existing-repo" class="tab-content"><div class="modal-screen"><form id="existing-repo-form"><div><label for="existing-repo-name" data-i18n="deploy.existing.repoName">Repo Name</label> <input type="text" id="existing-repo-name" autocomplete="off" placeholder="Loading..." data-i18n="generic.loading" data-i18n-prop="placeholder"></div><div><label for="existing-repo-message" data-i18n="deploy.generic.commitMessage">Commit Message</label> <input type="text" id="existing-repo-message" placeholder="Optional" data-i18n="generic.optional" data-i18n-prop="placeholder"></div><div class="padded"><input type="checkbox" id="existing-repo-source"> <label for="existing-repo-source" data-i18n="deploy.generic.commitSourceCodePublic">Commit source code (public)</label></div><button id="existing-repo-btn" class="wide-button" type="submit" data-i18n="deploy.generic.deployBtn">Deploy</button></form><div class="description help" data-i18n="deploy.existing.desc" data-i18n-prop="innerHTML">A new commit will be added to <span class="code">gh-pages</span> branch.</div></div></div></div></div>';var G=e=>Object.entries(W).reduce((t,[o,n])=>t.replace(new RegExp(`{{${o}}}`,"g"),n),e),V=G(O);var J=G(z);var Z=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],Q=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],X=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],b={getModuleUrl:(e,{isModule:t=!0,defaultCDN:o="esm.sh",external:n}={})=>{e=e.replace(/#nobundle/g,"");let a=s=>!n||!s.includes("https://esm.sh")?s:s.includes("?")?`${s}&external=${n}`:`${s}?external=${n}`,r=K(e,t,o);return r?a(r):t?a("https://esm.sh/"+e):"https://cdn.jsdelivr.net/npm/"+e},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:K(e,!1,t||Pe())||e,cdnLists:{npm:Q,module:Z,gh:X},checkCDNs:async(e,t)=>{let o=[t,...b.cdnLists.npm].filter(Boolean);for(let n of o)try{if((await fetch(b.getUrl(e,n),{method:"HEAD"})).ok)return n}catch{}return b.cdnLists.npm[0]}},Pe=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||b.cdnLists.npm[0]}catch{return b.cdnLists.npm[0]}},K=(e,t,o)=>{let n=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",X[0]):e.includes(":")||(e=(o||(t?Z[0]:Q[0]))+":"+e);for(let a of Ne){let[r,s]=a;if(r.test(e))return e.replace(r,s)+n}return null},Ne=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:Y,getModuleUrl:pt}=b;var ee=Y("@tarekraafat/autocomplete.js@10.2.7/dist/autoComplete.min.js");var te=Y("easyqrcodejs@4.6.1/dist/easy.qrcode.min.js");var oe=(e,{getLanguageExtension:t})=>{let o={markup:"index",style:"style",script:"script"},n=Object.keys(o).reduce((c,i)=>{let p=o[i],l=e[i].language,m=t?.(l)||"md",u=e[i].content||"";return{...c,...u?{[p+"."+m]:{content:u}}:{}}},{}),a=e.stylesheets.length>0?{styles:{content:e.stylesheets.map(c=>`<link rel="stylesheet" href="${c}" />`).join(`
`)}}:void 0,r=e.scripts.length>0?{scripts:{content:e.scripts.map(c=>`<script src="${c}"><\/script>`).join(`
`)}}:void 0,s=e.tests?.content?{["script.spec."+t?.(e.tests?.language)||"ts"]:{content:e.tests?.content}}:void 0;return{...n,...a,...r,...s}},ne=(e,t,o,n=!0)=>{let a=n?"https://gist.github.com/":"https://github.com/",r=t?.displayName||t?.username,s=r?t.username?"by ["+r+"]("+a+t.username+")":"by "+r:"",c=o?`[project](https://livecodes.io/?x=${o})`:"project";return{[h(e.title)+".md"]:{content:`# ${e.title}
A ${c} created ${s} on [LiveCodes](https://livecodes.io).`}}};var re=()=>(Date.now()+""+Math.floor(Math.floor(Math.random()*Date.now()))).substring(0,24);var g=(e,t)=>({Accept:`application/vnd.github.v3${t?"."+t:""}+json`,"Content-Type":"application/json",Authorization:"token "+e.token}),se=async(e,t)=>{try{return(await fetch(`https://api.github.com/repos/${e.username}/${t}`,{method:"GET",cache:"no-store",headers:g(e)})).ok}catch{return!1}},ae=async(e,t,o=!1,n)=>{let a=await fetch("https://api.github.com/user/repos",{method:"POST",cache:"no-store",headers:g(e),body:JSON.stringify({name:t,private:o,...o?{}:{homepage:`https://${e.username}.github.io/${t}/`},...n?{description:n}:{}})});if(!a.ok)throw await a.json().then(s=>s.errors[0]?.message)==="name already exists on this account"?new Error("Repo name already exists"):new Error("Error creating repo");return a.json().then(r=>r.name)},ce=async({user:e,repo:t,branch:o,file:n,message:a,initialize:r=!1,encoded:s=!1})=>{let c=`https://api.github.com/repos/${e.username}/${t}/contents/`,i=n.path.split("/").slice(0,-1).join("/"),p;if(!r){let m=await fetch(c+i,{method:"GET",cache:"no-store",headers:g(e)});m.ok&&(p=(await m.json()).find(x=>x.path===n.path)?.sha)}let l=await fetch(c+n.path,{method:"PUT",cache:"no-store",headers:g(e),body:JSON.stringify({message:a||"deploy",content:s?n.content:_(n.content),branch:o,...p?{sha:p}:{}})});if(!l.ok)throw new Error("Error creating file");return l.json()};var k=async(e,t,o="main",n)=>(await ce({user:e,repo:t,branch:o,file:{path:"README.md",content:`${n||"# "+t+`
`}`},message:"initial commit",initialize:!0,encoded:!1}))?.commit.sha,_e=async(e,t,o)=>{let n=await fetch(`https://api.github.com/repos/${e.username}/${t}/git/matching-refs/heads/${o}?per_page=100`,{method:"GET",cache:"no-store",headers:g(e)}),a=await n.json();if(a.message==="Git Repository is empty."){let s=await k(e,t,"main");return o==="main"?s:null}if(!n.ok)throw new Error("Error getting last commit");let r=a.find(s=>s.ref===`refs/heads/${o}`);return r?r.object.sha:null},We=async(e,t,o)=>{let n=await fetch(`https://api.github.com/repos/${e.username}/${t}/commits/${o}`,{method:"GET",cache:"no-store",headers:g(e)});if(!n.ok)throw new Error("Error getting commit tree");let r=(await n.json())?.commit?.tree?.sha;return r||null},Oe=async(e,t,o,n)=>{let a=o.map(s=>({path:s.path,mode:"100644",type:"blob",content:s.content})),r=await fetch(`https://api.github.com/repos/${e.username}/${t}/git/trees`,{method:"POST",cache:"no-store",headers:g(e),body:JSON.stringify({...n?{base_tree:n}:{},tree:a})});if(!r.ok)throw new Error("Error creating tree");return r.json().then(s=>s.sha)},ze=async(e,t,o,n,a)=>{let r=await fetch(`https://api.github.com/repos/${e.username}/${t}/git/commits`,{method:"POST",cache:"no-store",headers:g(e),body:JSON.stringify({tree:n,message:o||"deploy",...a?{parents:[a]}:{}})});if(!r.ok)throw new Error("Error creating commit");return r.json().then(s=>s.sha)},Ge=async(e,t,o,n)=>{if(!(await fetch(`https://api.github.com/repos/${e.username}/${t}/git/refs`,{method:"POST",cache:"no-store",headers:g(e),body:JSON.stringify({ref:`refs/heads/${o}`,sha:n})})).ok)throw new Error("Error creating branch");return!0},Ve=async(e,t,o,n)=>{if(!(await fetch(`https://api.github.com/repos/${e.username}/${t}/git/refs/heads/${o}`,{method:"PATCH",cache:"no-store",headers:g(e),body:JSON.stringify({sha:n})})).ok)throw new Error("Error updating branch");return!0},ie=async({files:e,user:t,repo:o,branch:n,message:a,newRepo:r,privateRepo:s,description:c,readmeContent:i,clearPrevious:p=!0})=>{let l,m,u,x=!1;r&&(o=h(o,"-").toLowerCase());try{if(r||!await se(t,o)){r=!0,await ae(t,o,s,c);let L=await k(t,o,"main",i);l=n==="main"?L:null}else l=await _e(t,o,n);let y=l&&!p?await We(t,o,l):null;return m=await Oe(t,o,e,y),u=await ze(t,o,a,m,l),l?x=await Ve(t,o,n,u):x=await Ge(t,o,n,u),x?{tree:m,commit:u}:null}catch{return null}},le=async({file:e,user:t,repo:o,branch:n,message:a,newRepo:r,privateRepo:s,description:c,readmeContent:i})=>{try{(r||!await se(t,o))&&(r=!0,o=h(o,"-").toLowerCase(),await ae(t,o,s,c),await k(t,o,n,i));let p=await ce({user:t,repo:o,branch:n,file:e,message:a,initialize:r||!1,encoded:!0});return{tree:p?.commit?.tree?.sha,commit:p?.commit?.sha}}catch{return null}},pe=async(e,t="public")=>{let o=1,n=100,a=5,r=[];for(;o<=a;){let s=await fetch(`https://api.github.com/user/repos?type=${t}&per_page=${n}&page=${o}`,{method:"GET",cache:"no-store",headers:g(e)});if(o+=1,!s.ok)continue;let c=await s.json();r.push(...c.map(i=>i.name)),c.length<n&&(o=a+1)}return r};var me={title:"Untitled Project",description:"",head:`<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,htmlAttrs:'lang="en" class=""',tags:[],autoupdate:!0,autosave:!1,autotest:!1,delay:1500,formatOnsave:!1,view:"split",mode:"full",theme:"dark",themeColor:void 0,layout:"responsive",editorTheme:void 0,appLanguage:void 0,recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{},tests:{language:"typescript",content:""},tools:{enabled:"all",active:"",status:""},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,semicolons:!0,singleQuote:!1,trailingComma:!0,emmet:!0,enableAI:!1,editorMode:void 0,version:"39"};var Je=({config:e,content:t,commitSource:o,singleFile:n,deps:a})=>{let r=[{path:"index.html",content:t.resultPage}];if(n||r.push({path:"style.css",content:t.style||""},{path:"script.js",content:t.script||""}),o){let s=oe(e,a);r.push(...Object.keys(s).map(c=>({path:"src/"+c,content:s[c].content})),{path:"src/livecodes.json",content:JSON.stringify(e,null,2)})}return r},ue=async({user:e,repo:t,config:o,content:n,message:a,commitSource:r=!0,singleFile:s,newRepo:c=!0,deps:i})=>{c&&(t=h(t,"-").toLowerCase());let p=Je({config:o,content:n,commitSource:r,singleFile:s,deps:i}),l="gh-pages",m=r?`https://github.com/${e.username}/${t}/tree/gh-pages/src`:void 0,u=o.title!==me.title?o.title:"",x=Object.values(ne(o,e,m,!1))[0].content,y=await ie({files:p,user:e,repo:t,branch:l,message:a,newRepo:c,privateRepo:!1,description:u,readmeContent:x,clearPrevious:!0});return y?{url:`https://${e.username}.github.io/${t}/`,username:e.username,repo:t,tree:y.tree,commit:y.commit}:null},Ke=async({file:e,user:t,repo:o,branch:n,message:a,description:r,readmeContent:s})=>{let c={path:`assets/${re()}/${e.path}`,content:e.content},i=await le({file:c,user:t,repo:o,branch:n,message:a,privateRepo:!1,description:r,readmeContent:s});return i?{url:`https://${t.username}.github.io/${o}/${c.path}`,username:t.username,repo:o,tree:i?.tree,commit:i?.commit}:null},de=(e,t)=>{let{url:o,username:n,repo:a,commit:r}=e,s=t?`
    <div class="description">
      <p>
        The source code is
        <a
          href="https://github.com/${n}/${a}/tree/${r}/src"
          target="_blank"
        >
          publicly available
        </a>
      </p>
      <p>
        Permanent link:
        <a
          href="https://livecodes.io/?config=https://raw.githubusercontent.com/${n}/${a}/${r}/src/livecodes.json"
          target="_blank"
        >
          Edit in LiveCodes
        </a>
      </p>
      <p>
        Check
        <a
          href="https://github.com/${n}/${a}/actions"
          target="_blank"
        >
          deployment status
        </a>
      </p>
    </div>
`:"",c=`
    <div id="deploy-container" class="modal-container">
      <div class="modal-title">Deployed Successfully!</div>
        <div class="modal-screen-container">
          <div class="description success">
            Your project has been deployed successfully to GitHub Pages, and will shortly be available (~1&nbsp;min) on: <br />
            <a href="${o}" target="_blank">${o}</a>
          </div>
          <div id="deploy-qrcode" class="qrcode-container">Generating...</div>
          ${s}
        </div>
    </div>
  `,i=document.createElement("div");return i.innerHTML=c,i};var ge=async({container:e,url:t,title:o,logo:n})=>{let a=await U(te,"QRCode");e.style.visibility="hidden";let r=new a(e,{text:t,logo:n,width:200,height:200,drawer:"canvas",onRenderingEnd:(s,c)=>{e.innerHTML="";let i=document.createElement("img");i.src=c,i.style.cursor="pointer",i.title=window.deps.translateString("share.qrcode.clickToDownload","Click to download"),i.onclick=()=>r.download(h(o||"LiveCodes","-")),e.appendChild(i),e.style.visibility="visible"}})};var fe=e=>e.querySelector("#new-repo-form"),xe=e=>e.querySelector("#new-repo-btn"),ye=e=>e.querySelector("#new-repo-name"),he=e=>e.querySelector("#new-repo-name-error"),be=e=>e.querySelector("#new-repo-message"),Ee=e=>e.querySelector("#new-repo-source");var Te=e=>e.querySelector("#existing-repo-form"),Le=e=>e.querySelector("#existing-repo-btn"),j=e=>e.querySelector("#existing-repo-name"),R=e=>e.querySelector("#existing-repo-message"),Se=e=>e.querySelector("#existing-repo-source");var Ze=(e,t)=>{let o=document.createElement("div");o.innerHTML=J;let n=o.firstChild,a=n.querySelectorAll("#deploy-tabs li");return a.forEach(r=>{let s=r.querySelector("a");s&&e.addEventListener(r,"click",()=>{a.forEach(i=>i.classList.remove("active")),r.classList.add("active"),document.querySelectorAll("#deploy-screens > div").forEach(i=>{i.classList.remove("active")});let c=n.querySelector("#"+s.dataset.target);c?.classList.add("active"),c?.querySelector("input")?.focus()})}),t&&setTimeout(()=>{a[1].click();let r=j(n),s=R(n);r.value=t,s.focus()}),n},Eo=async({modal:e,notifications:t,eventsManager:o,user:n,deployRepo:a,deps:r})=>{let s=Ze(o,a),c=fe(s),i=xe(s),p=ye(s),l=he(s),m=be(s),u=Ee(s),x=Te(s),y=Le(s),L=j(s),we=R(s),Me=Se(s),A=async(E,d,T,S,w)=>{let B=r.getLanguageCompiler(r.getConfig().script.language)?.scriptType,$=B!=null&&B!=="module";l.innerHTML="";let qe=await r.getResultPage({forExport:!0,template:V,singleFile:$}),F=r.getCache(),C=await ue({user:E,repo:d,config:r.getContentConfig(r.getConfig()),content:{resultPage:qe,style:F.style.compiled||"",script:F.script.compiled||""},message:T,commitSource:S,singleFile:$,newRepo:w,deps:{getLanguageExtension:r.getLanguageExtension}}).catch(v=>{v.message==="Repo name already exists"&&(l.innerHTML=window.deps.translateString("deploy.error.repoNameExists","Repo name already exists"))});if(l.innerHTML!=="")return!1;if(C){await r.setProjectDeployRepo(d);let v=de(C,S);return e.show(v,{size:"small"}),await ge({container:v.querySelector("#deploy-qrcode"),url:C.url,title:d}),!0}else return e.close(),t.error(window.deps.translateString("deploy.error.generic","Deployment failed!")),!0};if(o.addEventListener(c,"submit",async E=>{if(E.preventDefault(),!n)return;let d=p.value.replace(/[^A-Za-z0-9_.-]/g,"-"),T=m.value,S=u.checked,w=!0;if(!d){t.error(window.deps.translateString("deploy.error.repoNameRequired","Repo name is required"));return}i.innerHTML=window.deps.translateString("deploy.generic.deploying","Deploying..."),i.disabled=!0,await A(n,d,T,S,w)||(i.innerHTML=window.deps.translateString("deploy.generic.deployBtn","Deploy"),i.disabled=!1)}),o.addEventListener(x,"submit",async E=>{if(E.preventDefault(),!n)return;let d=L.value,T=we.value,S=Me.checked,w=!1;if(!d){t.error(window.deps.translateString("deploy.error.repoNameRequired","Repo name is required"));return}y.innerHTML=window.deps.translateString("deploy.generic.deploying","Deploying..."),y.disabled=!0,await A(n,d,T,S,w)}),e.show(s,{isAsync:!0}),p.focus(),!n)return;globalThis.autoComplete||await import(ee);let ve=globalThis.autoComplete,He=await pe(n);o.addEventListener(L,"init",()=>{a||L.focus()});let I="#"+L.id;if(!document.querySelector(I))return;let H=new ve({selector:I,placeHolder:window.deps.translateString("deploy.searchRepo","Search your public repos..."),data:{src:He},resultItem:{highlight:{render:!0}}});o.addEventListener(H.input,"selection",function(E){let d=E.detail;H.input.blur();let T=d.selection.value;H.input.value=T})};export{Eo as createDeployUI,Ke as deployFile};
