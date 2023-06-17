"use strict";(()=>{var c=["jspm","skypack"],a=["unpkg","jsdelivr"],p=["jsdelivr.gh","statically"],i={getModuleUrl:(t,{isModule:s=!0,defaultCDN:e="jspm"}={})=>{t=t.replace(/#nobundle/g,"");let o=l(t,s,e);return o||(s?"https://jspm.dev/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,s)=>t.startsWith("http")?t:l(t,!1,s||f())||t,cdnLists:{npm:a,module:c,gh:p},checkCDNs:async(t,s)=>{let e=[s,...i.cdnLists.npm].filter(Boolean);for(let o of e)try{if((await fetch(i.getUrl(t,o),{method:"HEAD"})).ok)return o}catch{}return i.cdnLists.npm[0]}},f=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||i.cdnLists.npm[0]}catch{return i.cdnLists.npm[0]}},l=(t,s,e)=>{let o=s&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",p[0]):t.includes(":")||(t=(e||(s?c[0]:a[0]))+":"+t);for(let r of j){let[n,m]=r;if(n.test(t))return t.replace(n,m)+o}return null},j=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:d,getModuleUrl:U}=i;var u=d("@chriskoch/julia-wasm@1.0.4");var x="0.6.64",v=d(`malinajs@${x}/malina.js`);var h=`
let isCompilerloaded = false;
let outputBuffer = '';
let url = '${u}';
let errCalls = 0;
let ignoredErrors = [
  'still waiting on run dependencies:',
  'dependency: fp /sys.ji',
  'dependency: datafile_/julia.data',
  'dependency: wasm-instantiate',
  '(end of list)',
  'file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)',
];

self.Module = {
  locateFile: (path) =>
    path === 'julia-wasm/julia.wasm'
      ? url + '/julia.wasm'
      : url + '/julia.data',
  preRun: [],
  noInitialRun: true,
  print: (stdout) => (outputBuffer += stdout + '\\n'),
  printErr: function (text) {
    errCalls++;
    if (errCalls == 1) return;
    if (arguments.length > 1) {
      text = Array.prototype.slice.call(arguments).join(' ');
    }
    if (ignoredErrors.includes(text)) return;
    console.warn(text);
  },
  postRun: [
    function () {
      self.Module._jl_initialize();
      let input = 'Base.load_InteractiveUtils()';
      let ptr = self.Module._malloc(input.length + 1);
      self.Module.stringToUTF8(input, ptr, input.length + 1);
      self.Module._jl_eval_string(ptr);
      if (self.Module.initialize_jscall_runtime)
        self.Module.initialize_jscall_runtime();
      isCompilerloaded = true;
    },
  ],
};

importScripts(url + '/julia.js');

let runCode = (code, input) => {
  let output = '';
  if (code) {
    if (input) {
      code = 'livescodesInput = ' + input + '\\n' + code;
    }
    let ptr = self.Module._malloc(code.length + 1);
    self.Module.stringToUTF8(code, ptr, code.length + 1);
    self.Module._jl_eval_and_print(ptr);
    output = getOutput();
  }
  outputBuffer = '';
  return output;
};

function getOutput() {
  if (outputBuffer.endsWith('nothing\\n')) {
    outputBuffer = outputBuffer.slice(0, outputBuffer.length - 8);
    outputBuffer += '\\nReturn Type: nothing';
  } else {
    outputBuffer = outputBuffer.split('typeof(').join('\\nReturn Type: typeof(');
  }
  return outputBuffer;
}

const waitForCompiler = () =>
  new Promise((resolve, reject) => {
    const i = setInterval(() => {
      if (isCompilerloaded) {
        clearInterval(i);
        return resolve();
      }
    }, 50);
  });

waitForCompiler().then(() => postMessage({ loaded: true }));

addEventListener('message', async (e) => {
  await waitForCompiler();
  const code = e.data.code;
  const input = e.data.input;
  const output = code.trim() ? runCode(code, input) : null;
  postMessage({ output });
});
`;livecodes.julia=livecodes.julia||{};livecodes.julia.run=livecodes.julia.run||(t=>new Promise(s=>{let e="";livecodes.julia.input=t,livecodes.julia.output="",document.querySelectorAll('script[type="text/julia"]').forEach(r=>e+=r.innerHTML+`
`),livecodes.julia.worker.onmessage=function(r){if(r.data.loaded){console.log("Julia compiler loaded!"),livecodes.julia.worker.loaded=!0;return}let n=r.data.output;n!=null&&console.log(n),livecodes.julia.output=n,livecodes.julia.ready=!0,s(n)},livecodes.julia.worker.postMessage({code:e,input:`"${String(t??"")}"`})}));livecodes.julia.loaded=new Promise(async function(t){let s=setInterval(()=>{if(livecodes.julia.ready)return clearInterval(s),t()},50)});window.addEventListener("load",async()=>{livecodes.julia.ready=!1,parent.postMessage({type:"loading",payload:!0},"*"),(()=>{livecodes.julia.worker||(console.log("Loading Julia compiler..."),livecodes.julia.worker=new Worker("data:text/javascript;base64,"+btoa(h)))})(),await livecodes.julia.run(livecodes.julia.input),parent.postMessage({type:"loading",payload:!1},"*")});})();
//# sourceMappingURL=lang-julia-script.js.map
