"use strict";(()=>{var f=t=>!t?.startsWith("http")&&!t?.startsWith("data:"),c=(t,e=document.baseURI)=>f(t)?new URL(t,e).href:t;var l=["esm.sh","skypack","jspm"],p=["unpkg","jsdelivr","fastly.jsdelivr"],d=["fastly.jsdelivr.gh","jsdelivr.gh","statically"],r={getModuleUrl:(t,{isModule:e=!0,defaultCDN:o="esm.sh"}={})=>{t=t.replace(/#nobundle/g,"");let s=a(t,e,o);return s||(e?"https://esm.sh/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,e)=>t.startsWith("http")||t.startsWith("data:")?t:a(t,!1,e||h())||t,cdnLists:{npm:p,module:l,gh:d},checkCDNs:async(t,e)=>{let o=[e,...r.cdnLists.npm].filter(Boolean);for(let s of o)try{if((await fetch(r.getUrl(t,s),{method:"HEAD"})).ok)return s}catch{}return r.cdnLists.npm[0]}},h=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||r.cdnLists.npm[0]}catch{return r.cdnLists.npm[0]}},a=(t,e,o)=>{let s=e&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",d[0]):t.includes(":")||(t=(o||(e?l[0]:p[0]))+":"+t);for(let n of x){let[i,g]=n;if(i.test(t))return t.replace(i,g)+s}return null},x=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly.jsdelivr.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:m,getModuleUrl:L}=r;var b="0.6.64",$=m(`malinajs@${b}/malina.js`);var u=m("https://cdn.rescript-lang.org/v10.1.2/compiler.js");var y=(t,e)=>{self.rescript_compiler||importScripts(c(u,t));let o=self.rescript_compiler.make();return o.setModuleSystem("es6"),o.setFilename("index.bs.js"),async s=>{let n=s;try{let i=o[e].format(s);i.type==="success"&&(n=i.code)}catch{}return{formatted:n,cursorOffset:0}}};self.createRescriptFormatter=y;})();
