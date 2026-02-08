"use strict";(()=>{var j=typeof btoa=="function",m=typeof Buffer=="function",q=typeof TextDecoder=="function"?new TextDecoder:void 0,g=typeof TextEncoder=="function"?new TextEncoder:void 0,C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l=Array.prototype.slice.call(C),P=(e=>{let t={};return e.forEach((r,s)=>t[r]=s),t})(l);var a=String.fromCharCode.bind(String),O=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),k=e=>e.replace(/=/g,"").replace(/[+\/]/g,t=>t=="+"?"-":"_");var T=e=>{let t,r,s,n,o="",i=e.length%3;for(let p=0;p<e.length;){if((r=e.charCodeAt(p++))>255||(s=e.charCodeAt(p++))>255||(n=e.charCodeAt(p++))>255)throw new TypeError("invalid character found");t=r<<16|s<<8|n,o+=l[t>>18&63]+l[t>>12&63]+l[t>>6&63]+l[t&63]}return i?o.slice(0,i-3)+"===".substring(i):o},x=j?e=>btoa(e):m?e=>Buffer.from(e,"binary").toString("base64"):T,A=m?e=>Buffer.from(e).toString("base64"):e=>{let r=[];for(let s=0,n=e.length;s<n;s+=4096)r.push(a.apply(null,e.subarray(s,s+4096)));return x(r.join(""))};var B=e=>{if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?a(192|t>>>6)+a(128|t&63):a(224|t>>>12&15)+a(128|t>>>6&63)+a(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return a(240|t>>>18&7)+a(128|t>>>12&63)+a(128|t>>>6&63)+a(128|t&63)}},E=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,S=e=>e.replace(E,B),f=m?e=>Buffer.from(e,"utf8").toString("base64"):g?e=>A(g.encode(e)):e=>x(S(e)),h=(e,t=!1)=>t?k(f(e)):f(e);var $=(e,t="text/javascript")=>`data:${t};charset=UTF-8;base64,`+h(e);var b=e=>{try{return new Worker($(e))}catch{return new Worker(URL.createObjectURL(new Blob([e],{type:"application/javascript"})))}};var U=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],v=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],w=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],c={getModuleUrl:(e,{isModule:t=!0,defaultCDN:r="esm.sh",external:s}={})=>{e=e.replace(/#nobundle/g,"");let n=i=>!s||!i.includes("https://esm.sh")?i:i.includes("?")?`${i}&external=${s}`:`${i}?external=${s}`,o=y(e,t,r);return o?n(o):t?n("https://esm.sh/"+e):"https://cdn.jsdelivr.net/npm/"+e},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:y(e,!1,t||L())||e,cdnLists:{npm:v,module:U,gh:w},checkCDNs:async(e,t)=>{let r=[t,...c.cdnLists.npm].filter(Boolean);for(let s of r)try{if((await fetch(c.getUrl(e,s),{method:"HEAD"})).ok)return s}catch{}return c.cdnLists.npm[0]}},L=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||c.cdnLists.npm[0]}catch{return c.cdnLists.npm[0]}},y=(e,t,r)=>{let s=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",w[0]):e.includes(":")||(e=(r||(t?U[0]:v[0]))+":"+e);for(let n of M){let[o,i]=n;if(o.test(e))return e.replace(o,i)+s}return null},M=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(pr:)(.+)/i,"https://esm.sh/pr/$2"],[/^(pkg\.pr\.new:)(.+)/i,"https://esm.sh/pkg.pr.new/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:D,getModuleUrl:H}=c;var u=D("yaegi-wasm@1.0.2/src/");var R=`
(async () => {
  importScripts('${u}wasm_exec.js');

  const wasmUrl = '${u}yaegi-browser.wasm';
  const wasmResponse = await fetch(wasmUrl);

  const initYaegi = async () => {
    try {
      let instance;
      const go = new Go();
      try {
        const streaming = await WebAssembly.instantiateStreaming(wasmResponse.clone(), go.importObject);
        instance = streaming.instance;
      } catch {
        const resp = await wasmResponse.clone();
        if (!resp.ok)
          throw new Error('Failed to fetch yaegi-browser.wasm: ' + resp.status);
        const bytes = await resp.arrayBuffer();
        const res = await WebAssembly.instantiate(bytes, go.importObject);
        instance = res.instance;
      }
      go.run(instance);
    } catch (err) {
      console.error('Failed to load Yaegi:', err);
      throw err;
    }
  };

  addEventListener('message', async (e) => {
    const runCode = async (code, input) => {
      let output = null;
      let error = null;
      let exitCode = 0;

      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      let capturedOutput = '';
      let capturedError = '';

      try {
        await initYaegi();

        console.log = (...args) => {
          capturedOutput += args.join(' ') + '\\n';
        };

        console.error = (...args) => {
          capturedError += args.join(' ') + '\\n';
        };

        // Set up stdin if input is provided
        if (input && globalThis.setStdin) {
          globalThis.setStdin(input);
        }

        if (self.yaegi) {
          try {
            const result = await self.yaegi.eval(code);
          } catch (err) {
            console.error('Yaegi execution error:', err);
            throw err;
          }
        } else {
          throw new Error(
            'Yaegi not found on window. Make sure yaegi-browser.wasm is loaded correctly.',
          );
        }

        output = capturedOutput.trim();
        if (capturedError) {
          error = capturedError.trim();
          exitCode = 1;
        }
      } catch (err) {
        error = err.message || err.toString();
        exitCode = 1;
      } finally {
        // Restore console functions
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
      }

      return { input, output, error, exitCode };
    };

    const code = e.data.code;
    const input = e.data.input;
    const result = code.trim() ? await runCode(code, input) : {};
    postMessage(result);
  });

  // Initialize Yaegi when worker starts
  initYaegi()
    .then(() => {
      postMessage({ loaded: true });
    })
    .catch((err) => {
      console.error('Failed to initialize Yaegi:', err);
      postMessage({ error: err.message });
    });
})();
`;livecodes.goWasm=livecodes.goWasm||{};livecodes.goWasm.worker=livecodes.goWasm.worker||b(R);var d=livecodes.goWasm.worker,W=new Promise(e=>{let t=r=>{console.log("Loading Yaegi WebAssembly..."),r.data.loaded&&(d.removeEventListener("message",t),console.log("Yaegi WebAssembly loaded successfully."),livecodes.goWasm.worker.loaded=!0,e())};livecodes.goWasm.worker.loaded?e():d.addEventListener("message",t)});livecodes.goWasm.run=livecodes.goWasm.run||(e=>new Promise(t=>{let r="";livecodes.goWasm.input=e,livecodes.goWasm.output=null,document.querySelectorAll('script[type="text/go-wasm"]').forEach(n=>r+=(n.textContent??"")+`
`),d.onmessage=function(n){if(n.data.loaded)return;let o=n.data;o.error!=null?console.error(o.error):o.output!=null&&console.log(o.output),livecodes.goWasm.input=o.input,livecodes.goWasm.output=o.output,livecodes.goWasm.error=o.error,livecodes.goWasm.exitCode=o.exitCode,livecodes.goWasm.ready=!0,t(o)},d.postMessage({code:r,input:`${String(e??"")}`})}));livecodes.goWasm.loaded=new Promise(e=>{let t=setInterval(()=>{if(livecodes.goWasm.ready)return clearInterval(t),e()},50)});window.addEventListener("load",async()=>{livecodes.goWasm.ready=!1,parent.postMessage({type:"loading",payload:!0},"*"),await W,await livecodes.goWasm.run(livecodes.goWasm.input),parent.postMessage({type:"loading",payload:!1},"*")});})();
