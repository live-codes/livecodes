"use strict";(()=>{var l=["jspm","skypack"],p=["unpkg","jsdelivr"],a=["jsdelivr.gh","statically"],c={getModuleUrl:(t,{isModule:s=!0,defaultCDN:e="jspm"}={})=>{t=t.replace(/#nobundle/g,"");let r=i(t,s,e);return r||(s?"https://jspm.dev/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,s)=>t.startsWith("http")?t:i(t,!1,s||x())||t,cdnLists:{npm:p,module:l,gh:a},checkCDNs:async(t,s)=>{let e=[s,...c.cdnLists.npm].filter(Boolean);for(let r of e)try{if((await fetch(c.getUrl(t,r),{method:"HEAD"})).ok)return r}catch{}return c.cdnLists.npm[0]}},x=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||c.cdnLists.npm[0]}catch{return c.cdnLists.npm[0]}},i=(t,s,e)=>{let r=s&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",a[0]):t.includes(":")||(t=(e||(s?l[0]:p[0]))+":"+t);for(let n of f){let[o,u]=n;if(o.test(t))return t.replace(o,u)+r}return null},f=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:d,getModuleUrl:g}=c;var m=d("@chriskoch/cpp-wasm@1.0.2");var h="0.6.64",w=d(`malinajs@${h}/malina.js`);var b=`
var window = self;
const url = '${m}';
importScripts(url + '/shared.js');

window.CPP_READY.then(() => postMessage({ loaded: true }));

const runCode = async (code, input) => {
  let output = null;
  let error = null;
  let exitCode = 0;
  try {
    window.CPP.memfs.setStdinStr(input ?? "");
    await window.CPP.compileLinkRun(code);
    output = window.CPP_OUTPUT;
  } catch (err) {
    error = err.message ?? err;
    exitCode = err.code ?? 1;
  } finally {
    window.CPP.memfs.setStdinStr("");
    window.CPP_OUTPUT = "";
  }
  return {input, output, error, exitCode};
}

addEventListener('message', async (e) => {
  await window.CPP_READY;
  const code = e.data.code;
  const input = e.data.input;
  const result = code.trim() ? await runCode(code, input) : {};
  postMessage(result);
});
`;livecodes.cpp=livecodes.cpp||{};livecodes.cpp.run=livecodes.cpp.run||(t=>new Promise(s=>{let e="";livecodes.cpp.input=t,livecodes.cpp.output=null,document.querySelectorAll('script[type="text/cpp"]').forEach(n=>e+=n.innerHTML+`
`),livecodes.cpp.worker.onmessage=function(n){if(n.data.loaded){console.log("Clang compiler loaded!"),livecodes.cpp.worker.loaded=!0;return}let o=n.data;o.error!=null?console.error(o.error):o.output!=null&&console.log(o.output),livecodes.cpp.input=o.input,livecodes.cpp.output=o.output,livecodes.cpp.error=o.error,livecodes.cpp.exitCode=o.exitCode,livecodes.cpp.ready=!0,s(o)},livecodes.cpp.worker.postMessage({code:e,input:`${String(t??"")}`})}));livecodes.cpp.loaded=new Promise(async function(t){let s=setInterval(()=>{if(livecodes.cpp.ready)return clearInterval(s),t()},50)});window.addEventListener("load",async()=>{livecodes.cpp.ready=!1,parent.postMessage({type:"loading",payload:!0},"*"),(()=>{livecodes.cpp.worker||(console.log("Loading Clang compiler..."),livecodes.cpp.worker=new Worker("data:text/javascript;base64,"+btoa(b)))})(),await livecodes.cpp.run(livecodes.cpp.input),parent.postMessage({type:"loading",payload:!1},"*")});})();
//# sourceMappingURL=lang-cpp-clang-script.js.map
