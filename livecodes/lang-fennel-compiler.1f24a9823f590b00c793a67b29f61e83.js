"use strict";(()=>{var i=["jspm","skypack"],p=["unpkg","jsdelivr"],a=["jsdelivr.gh","statically"],r={getModuleUrl:(t,{isModule:s=!0,defaultCDN:o="jspm"}={})=>{t=t.replace(/#nobundle/g,"");let e=l(t,s,o);return e||(s?"https://jspm.dev/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,s)=>t.startsWith("http")?t:l(t,!1,s||f())||t,cdnLists:{npm:p,module:i,gh:a},checkCDNs:async(t,s)=>{let o=[s,...r.cdnLists.npm].filter(Boolean);for(let e of o)try{if((await fetch(r.getUrl(t,e),{method:"HEAD"})).ok)return e}catch{}return r.cdnLists.npm[0]}},f=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||r.cdnLists.npm[0]}catch{return r.cdnLists.npm[0]}},l=(t,s,o)=>{let e=s&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",a[0]):t.includes(":")||(t=(o||(s?i[0]:p[0]))+":"+t);for(let n of x){let[c,u]=n;if(c.test(t))return t.replace(c,u)+e}return null},x=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:d,getModuleUrl:g}=r,m=d("@live-codes/browser-compilers@0.7.4/dist/");var b="0.6.64",y=d(`malinajs@${b}/malina.js`);var h=m+"fennel/?.lua";self.createFennelCompiler=()=>{let t=`
package.path = "${h}"
package.loaded.ffi = {typeof=function() end}
os = {getenv=function() end}
io = {open=function() end}
bit = {band = function(a,b) return a & b end,
       rshift=function(a,b) return a >> b end}
unpack = table.unpack

local fennel = require("fennel")
local compiler = fennel.compileString
local ok, result = pcall(compiler, %input%)
return {result, ok}
`;return async s=>{try{let o=self.fengari.load(t.replace("%input%",JSON.stringify(s)))(),e=o.get(1)||"";return o.get(2)||null?e:(console.error("Fennel compile error"),"")}catch(o){return console.error(o),""}}};})();
//# sourceMappingURL=lang-fennel-compiler.js.map
