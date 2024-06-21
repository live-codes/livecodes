"use strict";(()=>{var C=typeof btoa=="function",d=typeof Buffer=="function",q=typeof TextDecoder=="function"?new TextDecoder:void 0,m=typeof TextEncoder=="function"?new TextEncoder:void 0,k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l=Array.prototype.slice.call(k),F=(t=>{let e={};return t.forEach((o,s)=>e[o]=s),e})(l);var i=String.fromCharCode.bind(String),P=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):t=>new Uint8Array(Array.prototype.slice.call(t,0)),B=t=>t.replace(/=/g,"").replace(/[+\/]/g,e=>e=="+"?"-":"_");var T=t=>{let e,o,s,r,n="",c=t.length%3;for(let p=0;p<t.length;){if((o=t.charCodeAt(p++))>255||(s=t.charCodeAt(p++))>255||(r=t.charCodeAt(p++))>255)throw new TypeError("invalid character found");e=o<<16|s<<8|r,n+=l[e>>18&63]+l[e>>12&63]+l[e>>6&63]+l[e&63]}return c?n.slice(0,c-3)+"===".substring(c):n},g=C?t=>btoa(t):d?t=>Buffer.from(t,"binary").toString("base64"):T,A=d?t=>Buffer.from(t).toString("base64"):t=>{let o=[];for(let s=0,r=t.length;s<r;s+=4096)o.push(i.apply(null,t.subarray(s,s+4096)));return g(o.join(""))};var $=t=>{if(t.length<2){var e=t.charCodeAt(0);return e<128?t:e<2048?i(192|e>>>6)+i(128|e&63):i(224|e>>>12&15)+i(128|e>>>6&63)+i(128|e&63)}else{var e=65536+(t.charCodeAt(0)-55296)*1024+(t.charCodeAt(1)-56320);return i(240|e>>>18&7)+i(128|e>>>12&63)+i(128|e>>>6&63)+i(128|e&63)}},S=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,E=t=>t.replace(S,$),f=d?t=>Buffer.from(t,"utf8").toString("base64"):m?t=>A(m.encode(t)):t=>g(E(t)),h=(t,e=!1)=>e?B(f(t)):f(t);var L=(t,e="text/javascript")=>`data:${e};charset=UTF-8;base64,`+h(t);var x=t=>{try{return new Worker(L(t))}catch{return new Worker(URL.createObjectURL(new Blob([t],{type:"application/javascript"})))}};var y=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],j=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],U=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],a={getModuleUrl:(t,{isModule:e=!0,defaultCDN:o="esm.sh"}={})=>{t=t.replace(/#nobundle/g,"");let s=b(t,e,o);return s||(e?"https://esm.sh/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,e)=>t.startsWith("http")||t.startsWith("data:")?t:b(t,!1,e||D())||t,cdnLists:{npm:j,module:y,gh:U},checkCDNs:async(t,e)=>{let o=[e,...a.cdnLists.npm].filter(Boolean);for(let s of o)try{if((await fetch(a.getUrl(t,s),{method:"HEAD"})).ok)return s}catch{}return a.cdnLists.npm[0]}},D=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||a.cdnLists.npm[0]}catch{return a.cdnLists.npm[0]}},b=(t,e,o)=>{let s=e&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",U[0]):t.includes(":")||(t=(o||(e?y[0]:j[0]))+":"+t);for(let r of M){let[n,c]=r;if(n.test(t))return t.replace(n,c)+s}return null},M=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:u,getModuleUrl:H}=a,v="5.5.2";var w=u("@chriskoch/julia-wasm@1.0.4");var _="0.6.64",V=u(`malinajs@${_}/malina.js`);var J=`https://typescript.azureedge.net/cdn/${v}/monaco/min/vs`;var Z=u(`typescript@${v}/lib/typescript.js`);var R=`
let isCompilerloaded = false;
let outputBuffer = '';
let url = '${w}';
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
      code = 'livecodesInput = ' + input + '\\n' + code;
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
`;livecodes.julia=livecodes.julia||{};livecodes.julia.run=livecodes.julia.run||(t=>new Promise(e=>{let o="";livecodes.julia.input=t,livecodes.julia.output="",document.querySelectorAll('script[type="text/julia"]').forEach(r=>o+=r.innerHTML+`
`),livecodes.julia.worker.onmessage=function(r){if(r.data.loaded){console.log("Julia compiler loaded!"),livecodes.julia.worker.loaded=!0;return}let n=r.data.output;n!=null&&console.log(n),livecodes.julia.output=n,livecodes.julia.ready=!0,e(n)},livecodes.julia.worker.postMessage({code:o,input:`"${String(t??"")}"`})}));livecodes.julia.loaded=new Promise(async function(t){let e=setInterval(()=>{if(livecodes.julia.ready)return clearInterval(e),t()},50)});window.addEventListener("load",async()=>{livecodes.julia.ready=!1,parent.postMessage({type:"loading",payload:!0},"*"),(()=>{livecodes.julia.worker||(console.log("Loading Julia compiler..."),livecodes.julia.worker=x(R))})(),await livecodes.julia.run(livecodes.julia.input),parent.postMessage({type:"loading",payload:!1},"*")});})();
