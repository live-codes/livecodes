"use strict";(()=>{var w=typeof btoa=="function",d=typeof Buffer=="function",_=typeof TextDecoder=="function"?new TextDecoder:void 0,u=typeof TextEncoder=="function"?new TextEncoder:void 0,C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l=Array.prototype.slice.call(C),q=(e=>{let t={};return e.forEach((r,s)=>t[r]=s),t})(l);var a=String.fromCharCode.bind(String),I=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),k=e=>e.replace(/=/g,"").replace(/[+\/]/g,t=>t=="+"?"-":"_");var S=e=>{let t,r,s,n,o="",i=e.length%3;for(let p=0;p<e.length;){if((r=e.charCodeAt(p++))>255||(s=e.charCodeAt(p++))>255||(n=e.charCodeAt(p++))>255)throw new TypeError("invalid character found");t=r<<16|s<<8|n,o+=l[t>>18&63]+l[t>>12&63]+l[t>>6&63]+l[t&63]}return i?o.slice(0,i-3)+"===".substring(i):o},g=w?e=>btoa(e):d?e=>Buffer.from(e,"binary").toString("base64"):S,B=d?e=>Buffer.from(e).toString("base64"):e=>{let r=[];for(let s=0,n=e.length;s<n;s+=4096)r.push(a.apply(null,e.subarray(s,s+4096)));return g(r.join(""))};var T=e=>{if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?a(192|t>>>6)+a(128|t&63):a(224|t>>>12&15)+a(128|t>>>6&63)+a(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return a(240|t>>>18&7)+a(128|t>>>12&63)+a(128|t>>>6&63)+a(128|t&63)}},A=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,$=e=>e.replace(A,T),f=d?e=>Buffer.from(e,"utf8").toString("base64"):u?e=>B(u.encode(e)):e=>g($(e)),x=(e,t=!1)=>t?k(f(e)):f(e);var E=(e,t="text/javascript")=>`data:${t};charset=UTF-8;base64,`+x(e);var h=e=>{try{return new Worker(E(e))}catch{return new Worker(URL.createObjectURL(new Blob([e],{type:"application/javascript"})))}};var y=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],v=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],j=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],c={getModuleUrl:(e,{isModule:t=!0,defaultCDN:r="esm.sh",external:s}={})=>{e=e.replace(/#nobundle/g,"");let n=i=>!s||!i.includes("https://esm.sh")?i:i.includes("?")?`${i}&external=${s}`:`${i}?external=${s}`,o=b(e,t,r);return o?n(o):t?n("https://esm.sh/"+e):"https://cdn.jsdelivr.net/npm/"+e},getUrl:(e,t)=>e.startsWith("http")||e.startsWith("data:")?e:b(e,!1,t||L())||e,cdnLists:{npm:v,module:y,gh:j},checkCDNs:async(e,t)=>{let r=[t,...c.cdnLists.npm].filter(Boolean);for(let s of r)try{if((await fetch(c.getUrl(e,s),{method:"HEAD"})).ok)return s}catch{}return c.cdnLists.npm[0]}},L=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||c.cdnLists.npm[0]}catch{return c.cdnLists.npm[0]}},b=(e,t,r)=>{let s=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",j[0]):e.includes(":")||(e=(r||(t?y[0]:v[0]))+":"+e);for(let n of M){let[o,i]=n;if(o.test(e))return e.replace(o,i)+s}return null},M=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(pr:)(.+)/i,"https://esm.sh/pr/$2"],[/^(pkg\.pr\.new:)(.+)/i,"https://esm.sh/pkg.pr.new/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:D,getModuleUrl:V}=c;var U=D("browserfs@1.4.3/dist/browserfs.min.js");var m="https://unpkg.com/@seth0x41/doppio@1.0.0/";var F=m+"doppio.js",P=m+"java_home/",R=()=>`
      var window = self;

      // overriding annoying ZipFS warnings
      const originalWarn = console.warn;
      console.warn = function(message) {
        if (message && message.includes("ZipFS")) {
          return;
        }
        originalWarn.apply(console, arguments);
      };
      const originalLog = console.log;
      console.log = function(message) {
        if (message && message.includes("@stu")) {
          return;
        }
        originalLog.apply(console, arguments);
      };

      // loading BrowserFS
      importScripts('${U}');
      importScripts('${F}');

      function createDir(fs, path) {
        const parts = path.split('/').filter(Boolean);
        let current = '';
        for (const part of parts) {
          current += \`/\${part}\`;
          if (!fs.existsSync(current)) fs.mkdirSync(current);
        }
      }

      async function initFS() {
        BrowserFS.install(self);
        const mfs = new BrowserFS.FileSystem.MountableFileSystem();
        BrowserFS.initialize(mfs);
        mfs.mount('/tmp', new BrowserFS.FileSystem.InMemory());
        mfs.mount('/release', new BrowserFS.FileSystem.InMemory());

        const fs = BrowserFS.BFSRequire('fs');
        self.javaFS = { fs };

        createDir(fs, '/release/vendor/java_home/lib');
        createDir(fs, '/release/vendor/natives');

        // load essential JAR files
        const jarBaseUrl = '${P}';
        const jars = ['doppio.jar', 'rt.jar', 'tools.jar', 'jce.jar', 'charsets.jar', 'currency.data'];
        await Promise.all(jars.map(async jar => {
          try {
            const response = await fetch(\`\${jarBaseUrl}\${jar}\`);
            if (!response.ok) throw new Error(\`Failed to fetch \${jar}: \${response.status}\`);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(\`/release/vendor/java_home/lib/\${jar}\`, Buffer.from(buffer));
            // console.log(\`loaded \${jar}\`);
          } catch (e) {
            console.error(\`error loading \${jar}: \${e.message}\`);
          }
        }));
      }

      const initialize = initFS();
      initialize.then(() => {
        postMessage({ initialized: true });
      });

      // Run Java code
      let lastCode = null;
      let lastClassName = null;

      const runCode = async (code, input) => {
        let output = null;
        let error = null;
        let exitCode = 0;

        try {
          await initialize;

          const fs = self.javaFS.fs;
          const process = BrowserFS.BFSRequire('process');

          const className = (code.match(/public\\s+class\\s+(\\w+)/)?.[1]) || 'Main';
          const filePath = \`/tmp/\${className}.java\`;
          const classFilePath = \`/tmp/\${className}.class\`;

          const shouldCompile = lastCode !== code || lastClassName !== className || !fs.existsSync(classFilePath);

          if (shouldCompile) {
            if (fs.existsSync('/tmp')) fs.readdirSync('/tmp').forEach(f => fs.unlinkSync(\`/tmp/\${f}\`));
            // console.log('Cleared /tmp directory');

            fs.writeFileSync(filePath, code);
            // console.log(\`Wrote source to \${filePath}\`);
            // console.log('Files in /tmp after writing:', fs.readdirSync('/tmp'));

            const classpath = '/release/vendor/java_home/lib/doppio.jar:/release/vendor/java_home/lib/rt.jar:/release/vendor/java_home/lib/tools.jar:/release/vendor/java_home/lib/jce.jar:/release/vendor/java_home/lib/charsets.jar';
            let compileOutput = '';

            process.stdout.removeAllListeners('data');
            process.stderr.removeAllListeners('data');
            process.stdout.on('data', data => compileOutput += data.toString());
            process.stderr.on('data', data => compileOutput += data.toString());

            const compileExitCode = await new Promise(resolve => {
              self.Doppio.VM.CLI(
                ['-classpath', classpath, 'com.sun.tools.javac.Main', filePath],
                {
                  doppioHomePath: '/release',
                  javaHomePath: '/release/vendor/java_home',
                  nativeClasspath: ['/release/vendor/natives'],
                },
                resolve
              );
            });

            // console.log('Compilation exit code:', compileExitCode);
            // console.log('Compilation output:', compileOutput);
            // console.log('files in /tmp after compilation:', fs.readdirSync('/tmp'));

            if (compileExitCode !== 0) {
              throw new Error(\`Compilation failed with exit code \${compileExitCode}. Output: \${compileOutput}\`);
            }

            if (!fs.existsSync(classFilePath)) {
              throw new Error(\`class file \${classFilePath} not found after compilation\`);
            }

            lastCode = code;
            lastClassName = className;
          } else {
            // console.log('Skipping compilation: Code unchanged and .class file exists');
          }

          let output = '';
          process.stdout.removeAllListeners('data');
          process.stderr.removeAllListeners('data');
          process.stdout.on('data', data => {
            output += data.toString();
          });
          process.stderr.on('data', data => {
            output += data.toString();
          });
          if (input) {
            process.stdin.write(input);
          }

          const runExitCode = await new Promise(resolve => {
            self.Doppio.VM.CLI(
              ['-classpath', '/tmp', className],
              {
                doppioHomePath: '/release',
                javaHomePath: '/release/vendor/java_home',
                nativeClasspath: ['/release/vendor/natives'],
              },
              resolve
            );
          });

          // console.log('Run exit code:', runExitCode);
          // console.log('Final output:', output);
          return { input, output, error, exitCode: runExitCode };
        } catch (err) {
          error = err.message ?? err;
          exitCode = err.code ?? 1;
          return { input, output, error, exitCode };
        }
      };

      addEventListener('message', async (e) => {
        const code = e.data.code;
        const input = e.data.input;
        const result = code.trim() ? await runCode(code, input) : {};
        postMessage(result);
      });

      postMessage({ loaded: true });
    `;livecodes.java=livecodes.java||{};livecodes.java.run=livecodes.java.run||((e="")=>new Promise(t=>{let r="";livecodes.java.input=e,livecodes.java.output=null,document.querySelectorAll('script[type="text/java"]').forEach(n=>r+=n.innerHTML+`
`),livecodes.java.worker.onmessage=function(n){if(n.data.loaded){livecodes.java.worker.loaded=!0;return}if(n.data.initialized){console.log("Java environment initialized successfully.");return}let o=n.data;o.error!=null?console.error(o.error):o.output!=null&&console.log(o.output),livecodes.java.input=o.input,livecodes.java.output=o.output,livecodes.java.error=o.error,livecodes.java.exitCode=o.exitCode,livecodes.java.ready=!0,t(o)},livecodes.java.worker.postMessage({code:r,input:`${String(e??"")}
`})}));livecodes.java.loaded=new Promise(async function(e){let t=setInterval(()=>{if(livecodes.java.ready)return clearInterval(t),e()},50)});window.addEventListener("load",async()=>{livecodes.java.ready=!1,parent.postMessage({type:"loading",payload:!0},"*");let e=await R();(()=>{livecodes.java.worker||(console.log("Initializing Java environment..."),livecodes.java.worker=h(e))})();let r=await livecodes.java.run(livecodes.java.input);parent.postMessage({type:"loading",payload:!1},"*")});})();
