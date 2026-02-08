"use strict";(()=>{var w=(t,e=!0)=>t.replace(/\\/g,e?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var U=t=>t.split(".")[t.split(".").length-1];var L=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],T=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],P=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],l={getModuleUrl:(t,{isModule:e=!0,defaultCDN:r="esm.sh",external:s}={})=>{t=t.replace(/#nobundle/g,"");let o=a=>!s||!a.includes("https://esm.sh")?a:a.includes("?")?`${a}&external=${s}`:`${a}?external=${s}`,n=E(t,e,r);return n?o(n):e?o("https://esm.sh/"+t):"https://cdn.jsdelivr.net/npm/"+t},getUrl:(t,e)=>t.startsWith("http")||t.startsWith("data:")?t:E(t,!1,e||I())||t,cdnLists:{npm:T,module:L,gh:P},checkCDNs:async(t,e)=>{let r=[e,...l.cdnLists.npm].filter(Boolean);for(let s of r)try{if((await fetch(l.getUrl(t,s),{method:"HEAD"})).ok)return s}catch{}return l.cdnLists.npm[0]}},I=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||l.cdnLists.npm[0]}catch{return l.cdnLists.npm[0]}},E=(t,e,r)=>{let s=e&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",P[0]):t.includes(":")||(t=(r||(e?L[0]:T[0]))+":"+t);for(let o of W){let[n,a]=o;if(n.test(t))return t.replace(n,a)+s}return null},W=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(pr:)(.+)/i,"https://esm.sh/pr/$2"],[/^(pkg\.pr\.new:)(.+)/i,"https://esm.sh/pkg.pr.new/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:z,getModuleUrl:K}=l;var C=(t="")=>{if(!t)return;let e=t?.toLowerCase();return window.deps.languages.find(r=>r.name===e||r.title.toLowerCase()===e||r.extensions.map(s=>s.toLowerCase()).includes(e))?.name};var R=(t="")=>window.deps.languages.find(e=>e.name===C(t))?.editor;var k=(t,e)=>window.deps.processors.map(r=>r.name).includes(t)?e.languages?e.languages.includes(t):!0:!1,$=(t,e)=>e.processors.includes(t);var g=t=>typeof t=="string"?{code:t,info:{}}:t;var j=async(t,e,r,s={},o=self)=>new Promise(n=>{if(!t||!e||!r)return n(g(""));let a=async function(c){let i=c.data.payload;c.data.trigger==="compileInCompiler"&&i?.content===t&&i?.language===e&&(o.removeEventListener("message",a),n(g(i.compiled)))};o.addEventListener("message",a),o.postMessage({type:"compileInCompiler",payload:{content:t,language:e,config:r,options:s}})});var q=/(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g,B=t=>new RegExp(q).test(t);var D=t=>{let e=/(?:import\s+?(?:(?:(\w*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g,r=[];for(let s of[...t.matchAll(new RegExp(e,"g"))]){let[o,n]=s;r.push(n)}return r.length===0?"":`
export { ${r.join(", ")} };`},O=async(t,e)=>{let s=(n=>`(<${n}(?:[^>]*?))(?:\\ssrc=["']([^"'\\s]*?)["'])((?:[^>]*))(>(?:\\s*?)<\\/${n}>|\\/>)`)(e),o=[];for(let n of[...t.matchAll(new RegExp(s,"g"))]){let[a,c,i,p,d]=n;if(!i)o.push(a);else{let m=l.getUrl(i);try{let h=await fetch(m);if(!h.ok)throw new Error("failed to fetch: "+m);let x=await h.text(),v=c.includes("lang")||p.includes("lang")?"":` lang="${U(m)}"`;o.push(`${c+v+p}>${x}</${e}>`)}catch{o.push(a)}}}return t.replace(new RegExp(s,"g"),()=>o.pop()||"")},_=async(t,e,r)=>{let s=t,o={},n=!1,a=R(r)||"markup",c=k("tailwindcss",e)&&$("tailwindcss",e);a==="style"&&B(s)&&!c&&(n=!0);for(let i of window.deps.processors)if(!["tailwindcss","unocss","windicss"].includes(i.name)&&(k(i.name,e)&&$(i.name,e)&&i.editor===a||a==="style"&&i.name==="postcss"))if(i.isPostcssPlugin)n=!0;else{if(i.name==="postcss"&&!n)continue;let p=c&&i.name==="tailwindcss"?`@reference "tailwindcss";
`:"",d=await j(p+s,i.name,e),m=g(d);s=m.code,o={...o,...m.info}}return{code:s,info:o}},N=async(t,e,r,s={})=>{let o=await O(t,e);typeof s.prepareFn=="function"&&(o=await s.prepareFn(o,r));let n=r.processors.filter(p=>!s.skipCompilers?.includes(p)).length>0,c=((p,d="lang")=>`(<${p}\\s*)(?:([\\s\\S]*?)${d}\\s*=\\s*["']([A-Za-z0-9 _]*)["'])?((?:[^>]*)>)([\\s\\S]*?)(<\\/${p}>)`)(e,s.languageAttribute),i=[];for(let p of[...o.matchAll(new RegExp(c,"g"))]){let[d,m,h="",x="",v,b,A]=p;if((!x||!b)&&(e!=="style"||!n)){i.push(d);continue}let f=C(x);if((!f||s.skipCompilers?.includes(f))&&(e!=="style"||!n)){i.push(d);continue}let y="";["typescript","jsx","tsx","babel","sucrase"].includes(f||"")&&(y=D(b));let u=(await j(b+y,f,r)).code||b;y&&(u=u.replace(y,"")),n&&(u=g(await _(u,r,f??"css")).code),i.push(d.replace(new RegExp(c,"g"),e==="template"&&s.removeEnclosingTemplate?u:m+h+v+u+A))}return o.replace(new RegExp(c,"g"),()=>i.pop()||"")},S=async(t,e,r={})=>{let s=["template","style","script"];for(let o of s)t=await N(t,o,e,r);return t};var M=t=>`const options = {
  moduleCache: {
    vue: Vue,
  },
  pathResolve({ refPath, relPath }) {
    if ( relPath === '.' ) {
      return refPath;
    }
    if ( relPath.startsWith('http') || relPath === 'vue' ) {
      return relPath;
    }
    // relPath is a module name ?
    if ( relPath[0] !== '.' && relPath[0] !== '/' ) {
      const importMapScript = document.querySelector('script[type="importmap"]')?.innerHTML.trim();
      if (importMapScript) {
        try {
          const importMap = JSON.parse(importMapScript);
          if (importMap?.imports?.[relPath]) {
            return importMap.imports[relPath];
          }
        } catch {}
      }
      return '${l.getModuleUrl("",{defaultCDN:t})}' + relPath;
    }

    return refPath === undefined || !refPath.startsWith('http') ? relPath : String(new URL(relPath, refPath));
  },
  async getFile(url) {
    if (url === '/component.vue') return content;
    const res = await fetch(url);
    if ( !res.ok )
      throw Object.assign(new Error(res.statusText + ' ' + url), { res });
    return await res.text();
  },
  loadModule(path, options) {
    if ( path === 'vue' ) return Vue;
    if ( path.endsWith('.vue') || path.endsWith('.css') || path.endsWith('.scss') ) return;
    if ( !['http://', 'https://'].some(x => path.startsWith(x)) ) return;
    return import(path).catch(() => import(path + '.js'));
  },
  handleModule: async function (type, getContentData, path, options) {
    switch (type) {
      case '.css':
        options.addStyle(await getContentData(false));
        return null;
    }
  },
  addStyle: (textContent) => {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
};
`;self.createVueCompiler=()=>async(t,{config:e})=>`(() => {
let app = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${w(await S(t,e))}\`;
/* --> */
${M(e.customSettings.defaultCDN)}
const { loadModule } = window['vue3-sfc-loader'];
const App = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options)));
App.mount(app)
App.config.devtools = true;
})();
`;self.createVue2Compiler=()=>async(t,{config:e})=>`(() => {
let app = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${w(await S(t,e))}\`;
/* --> */
${M(e.customSettings.defaultCDN)}
const { loadModule, vueVersion } = window['vue2-sfc-loader'];
loadModule('/component.vue', options)
.then(component => new Vue(component).$mount(app));
Vue.config.devtools = true;
})();
`;})();
