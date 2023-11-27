"use strict";(()=>{var j=["jspm","esm.sh","skypack"],U=["unpkg","jsdelivr","fastly.jsdelivr"],g=["fastly.jsdelivr.gh","jsdelivr.gh","statically"],c={getModuleUrl:(t,{isModule:s=!0,defaultCDN:o="jspm"}={})=>{t=t.replace(/#nobundle/g,"");let e=b(t,s,o);return e||(s?"https://jspm.dev/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,s)=>t.startsWith("http")?t:b(t,!1,s||C())||t,cdnLists:{npm:U,module:j,gh:g},checkCDNs:async(t,s)=>{let o=[s,...c.cdnLists.npm].filter(Boolean);for(let e of o)try{if((await fetch(c.getUrl(t,e),{method:"HEAD"})).ok)return e}catch{}return c.cdnLists.npm[0]}},C=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||c.cdnLists.npm[0]}catch{return c.cdnLists.npm[0]}},b=(t,s,o)=>{let e=s&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",g[0]):t.includes(":")||(t=(o||(s?j[0]:U[0]))+":"+t);for(let r of q){let[n,l]=r;if(n.test(t))return t.replace(n,l)+e}return null},q=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly.jsdelivr.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:u,getModuleUrl:S}=c;var k="0.6.64",D=u(`malinajs@${k}/malina.js`);var y=u("sql-formatter@12.2.1/dist/sql-formatter.min.js"),w=u("sql.js@1.8.0/dist/");var f="application/json",L={name:"sql",title:"SQL",formatter:{factory:()=>(importScripts(y),async t=>({formatted:await self.sqlFormatter.format(t,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{url:w+"sql-wasm.js",factory:(t,s)=>(self.importScripts(s+"lang-sql-compiler.c7b00e8095fe039991f6ea436b25384f.js"),self.createSqlCompiler()),scripts:({baseUrl:t})=>[t+"waiting"],scriptType:f,compiledCodeLanguage:"json"},extensions:["sql","sqlite","sqlite3"],editor:"script"};window.livecodes={...window.livecodes,sql:{getResult:()=>new Promise((t,s)=>{window.addEventListener("load",()=>{let o=document.querySelector(`script[type="${f}"]`);if(o)try{let e=JSON.parse(o.innerHTML);e.data&&t(e),s(e.error||"Error compiling SQL")}catch{s("Error compiling SQL")}else s("Error compiling SQL")})}),getResultAsObjects:()=>new Promise(async(t,s)=>{try{let e=(await livecodes.sql.getResult()).data.map(r=>{let n=r.columns;return r.values.reduce((l,d)=>[...l,d.reduce((i,p,x)=>({...i,[n[x]]:p}),{})],[])});t(e)}catch(o){s(o)}}),render:t=>new Promise((s,o)=>{livecodes.sql.getResult().then(e=>{e.data.forEach(n=>{let l=n.columns,d=n.values,i=document.createElement("table"),p=document.createElement("tr");i.append(p),l.forEach(m=>{let a=document.createElement("th");a.innerHTML=m,p.append(a)}),d.forEach(m=>{let a=document.createElement("tr");i.append(a),m.forEach(v=>{let h=document.createElement("td");h.innerHTML=v,a.append(h)})}),(typeof t=="string"?document.querySelector(t):t instanceof Element||t instanceof HTMLDocument?t:document.body).append(i),s()})}).catch(o)})}};})();
