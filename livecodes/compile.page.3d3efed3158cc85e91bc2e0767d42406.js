"use strict";(()=>{var d=async(e,{baseUrl:t,language:o})=>{let{rescriptCompiler:s}=await import(t+"lang-rescript-compiler-esm.40a43969937f1a27ad14498c94f2ed5b.js");return s(e,{baseUrl:t,language:o})};var u=e=>typeof e=="string"?{code:e,info:{}}:e;var b=async(e,t,o,s={},r=self)=>new Promise(i=>{if(!e||!t||!o)return i(u(""));let n=async function(g){let l=g.data.payload;g.data.trigger==="compileInCompiler"&&l?.content===e&&l?.language===t&&(r.removeEventListener("message",n),i(u(l.compiled)))};r.addEventListener("message",n),r.postMessage({type:"compileInCompiler",payload:{content:e,language:t,config:o,options:s}})});var y=(e,t=!0)=>e.replace(/\\/g,t?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var j=(e,t)=>({...t.customSettings[e]});var U=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],w=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],C=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],a={getModuleUrl:(e,{isModule:t=!0,defaultCDN:o="esm.sh",external:s}={})=>{e=e.replace(/#nobundle/g,"");let r=n=>!s||!n.includes("https://esm.sh")?n:n.includes("?")?`${n}&external=${s}`:`${n}?external=${s}`,i=v(e,t,o);return i?r(i):t?r("https://esm.sh/"+e):"https://cdn.jsdelivr.net/npm/"+e},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:v(e,!1,t||E())||e,cdnLists:{npm:w,module:U,gh:C},checkCDNs:async(e,t)=>{let o=[t,...a.cdnLists.npm].filter(Boolean);for(let s of o)try{if((await fetch(a.getUrl(e,s),{method:"HEAD"})).ok)return s}catch{}return a.cdnLists.npm[0]}},E=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||a.cdnLists.npm[0]}catch{return a.cdnLists.npm[0]}},v=(e,t,o)=>{let s=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",C[0]):e.includes(":")||(e=(o||(t?U[0]:w[0]))+":"+e);for(let r of q){let[i,n]=r;if(i.test(e))return e.replace(i,n)+s}return null},q=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:f,getModuleUrl:z}=a,p=f("@live-codes/browser-compilers@0.18.0/dist/");var c=f("prettier@3.3.2/"),k=f("@prettier/plugin-php@0.22.2/standalone.js");var J=c+"standalone.js",m={babel:c+"plugins/babel.js",estree:c+"plugins/estree.js",glimmer:c+"plugins/glimmer.js",html:c+"plugins/html.js",markdown:c+"plugins/markdown.js",postcss:c+"plugins/postcss.js",php:k,pug:p+"prettier/parser-pug.js"};var x=async(e,{config:t,worker:o})=>new Promise(async s=>{if(!e)return s("");let[r,{default:i}]=await Promise.all([import(p+"mdx/mdx.js"),import(p+"remark-gfm/remark-gfm.js")]),n=(await r.compile(e,{remarkPlugins:[i],...j("mdx",t)})).value,l=($=>$.replace(/, {[^}]*} = _components/g,"").replace(/const {[^:]*} = props.components[^;]*;/g,""))(n),S=`import React from "react";
import { createRoot } from "react-dom/client";
${y(l,!1)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`,L=(await b(S,"jsx",t,{},o)).code;s(`<div id="__livecodes_mdx_root__"></div><script type="module">${L}<\/script>`)}),ee={name:"mdx",title:"MDX",parser:{name:"markdown",pluginUrls:[m.markdown,m.html]},compiler:{factory:()=>async e=>e,runOutsideWorker:x,compiledCodeLanguage:"javascript"},extensions:["mdx"],editor:"markup",editorLanguage:"markdown"};var h=async(e,{baseUrl:t,config:o})=>{let{diagramsCompiler:s}=await import(t+"lang-diagrams-compiler-esm.5eb70eb9daa3cca298c616262b02393f.js");return s(e,{config:o})},ne={name:"diagrams",title:"Diagrams",parser:{name:"html",pluginUrls:[m.html]},compiler:{factory:()=>async e=>e||"",runOutsideWorker:h},extensions:["diagrams","diagram","graph","plt"],editor:"markup",editorLanguage:"html"};var T=async(e,{baseUrl:t,config:o})=>{let{pgSqlCompiler:s}=await import(t+"lang-postgresql-compiler-esm.bf40ef03f3eba9940eda908ac366ae39.js");return s(e,{baseUrl:t,config:o})};window.compilers={rescript:d,reason:d,ocaml:d,mdx:x,diagrams:h,postgresql:T};})();
