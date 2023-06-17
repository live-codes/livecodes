"use strict";(()=>{var p=["jspm","skypack"],a=["unpkg","jsdelivr"],d=["jsdelivr.gh","statically"],n={getModuleUrl:(t,{isModule:o=!0,defaultCDN:s="jspm"}={})=>{t=t.replace(/#nobundle/g,"");let e=i(t,o,s);return e||(o?"https://jspm.dev/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,o)=>t.startsWith("http")?t:i(t,!1,o||f())||t,cdnLists:{npm:a,module:p,gh:d},checkCDNs:async(t,o)=>{let s=[o,...n.cdnLists.npm].filter(Boolean);for(let e of s)try{if((await fetch(n.getUrl(t,e),{method:"HEAD"})).ok)return e}catch{}return n.cdnLists.npm[0]}},f=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||n.cdnLists.npm[0]}catch{return n.cdnLists.npm[0]}},i=(t,o,s)=>{let e=o&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",d[0]):t.includes(":")||(t=(s||(o?p[0]:a[0]))+":"+t);for(let r of h){let[c,l]=r;if(c.test(t))return t.replace(c,l)+e}return null},h=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:m,getModuleUrl:y}=n;var b="0.6.64",w=m(`malinajs@${b}/malina.js`);var u=m("gh:teal-language/tl@d2fc36b5ff9a52d7265e63eb74cce70fd1cdbcb2/tl.lua");self.createTealCompiler=()=>{let t=`
package.path = "${u}"
os = {
  getenv = function (var)
    if var == 'TL_PATH' then
      return ''
    end
  end
}
local tl = require('tl')
local env = tl.init_env(false, false, true)
local output, result = tl.gen(%input%, env)
return { output, result.syntax_errors, result.type_errors }
`;return async o=>{try{let s=self.fengari.load(t.replace("%input%",JSON.stringify(o)))(),e=s.get(1)||"",r=s.get(2)||null,c=s.get(3)||null;return x(r,"Syntax Error"),x(c,"Type Error"),e}catch(s){return console.error(s),""}}};var x=(t,o)=>{let s=1;for(;t.has(s);){let e=t.get(s),r=e.get("y"),c=e.get("x"),l=e.get("msg");console[o==="Syntax Error"?"error":"warn"](`${o} at line ${r}, column: ${c}:`,l),s++}};})();
//# sourceMappingURL=lang-teal-compiler.js.map
