"use strict";(()=>{var v=typeof btoa=="function",d=typeof Buffer=="function",R=typeof TextDecoder=="function"?new TextDecoder:void 0,u=typeof TextEncoder=="function"?new TextEncoder:void 0,w="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l=Array.prototype.slice.call(w),_=(e=>{let t={};return e.forEach((o,s)=>t[o]=s),t})(l);var a=String.fromCharCode.bind(String),q=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),C=e=>e.replace(/=/g,"").replace(/[+\/]/g,t=>t=="+"?"-":"_");var k=e=>{let t,o,s,r,n="",i=e.length%3;for(let p=0;p<e.length;){if((o=e.charCodeAt(p++))>255||(s=e.charCodeAt(p++))>255||(r=e.charCodeAt(p++))>255)throw new TypeError("invalid character found");t=o<<16|s<<8|r,n+=l[t>>18&63]+l[t>>12&63]+l[t>>6&63]+l[t&63]}return i?n.slice(0,i-3)+"===".substring(i):n},f=v?e=>btoa(e):d?e=>Buffer.from(e,"binary").toString("base64"):k,T=d?e=>Buffer.from(e).toString("base64"):e=>{let o=[];for(let s=0,r=e.length;s<r;s+=4096)o.push(a.apply(null,e.subarray(s,s+4096)));return f(o.join(""))};var B=e=>{if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?a(192|t>>>6)+a(128|t&63):a(224|t>>>12&15)+a(128|t>>>6&63)+a(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return a(240|t>>>18&7)+a(128|t>>>12&63)+a(128|t>>>6&63)+a(128|t&63)}},A=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,E=e=>e.replace(A,B),m=d?e=>Buffer.from(e,"utf8").toString("base64"):u?e=>T(u.encode(e)):e=>f(E(e)),g=(e,t=!1)=>t?C(m(e)):m(e);var S=(e,t="text/javascript")=>`data:${t};charset=UTF-8;base64,`+g(e);var x=e=>{try{return new Worker(S(e))}catch{return new Worker(URL.createObjectURL(new Blob([e],{type:"application/javascript"})))}};var b=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],y=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],j=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],c={getModuleUrl:(e,{isModule:t=!0,defaultCDN:o="esm.sh",external:s}={})=>{e=e.replace(/#nobundle/g,"");let r=i=>!s||!i.includes("https://esm.sh")?i:i.includes("?")?`${i}&external=${s}`:`${i}?external=${s}`,n=h(e,t,o);return n?r(n):t?r("https://esm.sh/"+e):"https://cdn.jsdelivr.net/npm/"+e},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:h(e,!1,t||$())||e,cdnLists:{npm:y,module:b,gh:j},checkCDNs:async(e,t)=>{let o=[t,...c.cdnLists.npm].filter(Boolean);for(let s of o)try{if((await fetch(c.getUrl(e,s),{method:"HEAD"})).ok)return s}catch{}return c.cdnLists.npm[0]}},$=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||c.cdnLists.npm[0]}catch{return c.cdnLists.npm[0]}},h=(e,t,o)=>{let s=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",j[0]):e.includes(":")||(e=(o||(t?b[0]:y[0]))+":"+e);for(let r of M){let[n,i]=r;if(n.test(e))return e.replace(n,i)+s}return null},M=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(pr:)(.+)/i,"https://esm.sh/pr/$2"],[/^(pkg\.pr\.new:)(.+)/i,"https://esm.sh/pkg.pr.new/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:L,getModuleUrl:z}=c;var U=L("@chriskoch/julia-wasm@1.0.4");var D=`
let isCompilerloaded = false;
let outputBuffer = '';
let url = '${U}';
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
`;livecodes.julia=livecodes.julia||{};livecodes.julia.run=livecodes.julia.run||(e=>new Promise(t=>{let o="";livecodes.julia.input=e,livecodes.julia.output="",document.querySelectorAll('script[type="text/julia"]').forEach(r=>o+=r.innerHTML+`
`),livecodes.julia.worker.onmessage=function(r){if(r.data.loaded){console.log("Julia compiler loaded!"),livecodes.julia.worker.loaded=!0;return}let n=r.data.output;n!=null&&console.log(n),livecodes.julia.output=n,livecodes.julia.ready=!0,t(n)},livecodes.julia.worker.postMessage({code:o,input:`"${String(e??"")}"`})}));livecodes.julia.loaded=new Promise(async function(e){let t=setInterval(()=>{if(livecodes.julia.ready)return clearInterval(t),e()},50)});window.addEventListener("load",async()=>{livecodes.julia.ready=!1,parent.postMessage({type:"loading",payload:!0},"*"),(()=>{livecodes.julia.worker||(console.log("Loading Julia compiler..."),livecodes.julia.worker=x(D))})(),await livecodes.julia.run(livecodes.julia.input),parent.postMessage({type:"loading",payload:!1},"*")});})();
