"use strict";(()=>{var U=typeof btoa=="function",d=typeof Buffer=="function",D=typeof TextDecoder=="function"?new TextDecoder:void 0,u=typeof TextEncoder=="function"?new TextEncoder:void 0,w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l=Array.prototype.slice.call(w),R=(t=>{let e={};return t.forEach((s,o)=>e[s]=o),e})(l);var i=String.fromCharCode.bind(String),q=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):t=>new Uint8Array(Array.prototype.slice.call(t,0)),C=t=>t.replace(/=/g,"").replace(/[+\/]/g,e=>e=="+"?"-":"_");var k=t=>{let e,s,o,r,n="",c=t.length%3;for(let p=0;p<t.length;){if((s=t.charCodeAt(p++))>255||(o=t.charCodeAt(p++))>255||(r=t.charCodeAt(p++))>255)throw new TypeError("invalid character found");e=s<<16|o<<8|r,n+=l[e>>18&63]+l[e>>12&63]+l[e>>6&63]+l[e&63]}return c?n.slice(0,c-3)+"===".substring(c):n},f=U?t=>btoa(t):d?t=>Buffer.from(t,"binary").toString("base64"):k,B=d?t=>Buffer.from(t).toString("base64"):t=>{let s=[];for(let o=0,r=t.length;o<r;o+=4096)s.push(i.apply(null,t.subarray(o,o+4096)));return f(s.join(""))};var T=t=>{if(t.length<2){var e=t.charCodeAt(0);return e<128?t:e<2048?i(192|e>>>6)+i(128|e&63):i(224|e>>>12&15)+i(128|e>>>6&63)+i(128|e&63)}else{var e=65536+(t.charCodeAt(0)-55296)*1024+(t.charCodeAt(1)-56320);return i(240|e>>>18&7)+i(128|e>>>12&63)+i(128|e>>>6&63)+i(128|e&63)}},A=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,S=t=>t.replace(A,T),m=d?t=>Buffer.from(t,"utf8").toString("base64"):u?t=>B(u.encode(t)):t=>f(S(t)),g=(t,e=!1)=>e?C(m(t)):m(t);var E=(t,e="text/javascript")=>`data:${e};charset=UTF-8;base64,`+g(t);var x=t=>{try{return new Worker(E(t))}catch{return new Worker(URL.createObjectURL(new Blob([t],{type:"application/javascript"})))}};var b=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],y=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],j=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],a={getModuleUrl:(t,{isModule:e=!0,defaultCDN:s="esm.sh"}={})=>{t=t.replace(/#nobundle/g,"");let o=h(t,e,s);return o||(e?"https://esm.sh/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,e)=>t.startsWith("http")||t.startsWith("data:")?t:h(t,!1,e||$())||t,cdnLists:{npm:y,module:b,gh:j},checkCDNs:async(t,e)=>{let s=[e,...a.cdnLists.npm].filter(Boolean);for(let o of s)try{if((await fetch(a.getUrl(t,o),{method:"HEAD"})).ok)return o}catch{}return a.cdnLists.npm[0]}},$=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||a.cdnLists.npm[0]}catch{return a.cdnLists.npm[0]}},h=(t,e,s)=>{let o=e&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",j[0]):t.includes(":")||(t=(s||(e?b[0]:y[0]))+":"+t);for(let r of L){let[n,c]=r;if(n.test(t))return t.replace(n,c)+o}return null},L=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:M,getModuleUrl:z}=a;var v=M("@chriskoch/julia-wasm@1.0.4");var _=`
let isCompilerloaded = false;
let outputBuffer = '';
let url = '${v}';
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
`;livecodes.julia=livecodes.julia||{};livecodes.julia.run=livecodes.julia.run||(t=>new Promise(e=>{let s="";livecodes.julia.input=t,livecodes.julia.output="",document.querySelectorAll('script[type="text/julia"]').forEach(r=>s+=r.innerHTML+`
`),livecodes.julia.worker.onmessage=function(r){if(r.data.loaded){console.log("Julia compiler loaded!"),livecodes.julia.worker.loaded=!0;return}let n=r.data.output;n!=null&&console.log(n),livecodes.julia.output=n,livecodes.julia.ready=!0,e(n)},livecodes.julia.worker.postMessage({code:s,input:`"${String(t??"")}"`})}));livecodes.julia.loaded=new Promise(async function(t){let e=setInterval(()=>{if(livecodes.julia.ready)return clearInterval(e),t()},50)});window.addEventListener("load",async()=>{livecodes.julia.ready=!1,parent.postMessage({type:"loading",payload:!0},"*"),(()=>{livecodes.julia.worker||(console.log("Loading Julia compiler..."),livecodes.julia.worker=x(_))})(),await livecodes.julia.run(livecodes.julia.input),parent.postMessage({type:"loading",payload:!1},"*")});})();
