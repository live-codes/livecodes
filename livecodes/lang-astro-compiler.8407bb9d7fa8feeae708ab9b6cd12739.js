"use strict";(()=>{var J=Object.create;var I=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var G=Object.getOwnPropertyNames;var Q=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var X=(e,o)=>()=>(o||e((o={exports:{}}).exports,o),o.exports);var Y=(e,o,p,u)=>{if(o&&typeof o=="object"||typeof o=="function")for(let m of G(o))!V.call(e,m)&&m!==p&&I(e,m,{get:()=>o[m],enumerable:!(u=Z(o,m))||u.enumerable});return e};var ee=(e,o,p)=>(p=e!=null?J(Q(e)):{},Y(o||!e||!e.__esModule?I(p,"default",{value:e,enumerable:!0}):p,e));var N=X((st,_)=>{var B=function(){var e=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",u={};function m(t,n){if(!u[t]){u[t]={};for(var a=0;a<t.length;a++)u[t][t.charAt(a)]=a}return u[t][n]}var g={compressToBase64:function(t){if(t==null)return"";var n=g._compress(t,6,function(a){return o.charAt(a)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(t){return t==null?"":t==""?null:g._decompress(t.length,32,function(n){return m(o,t.charAt(n))})},compressToUTF16:function(t){return t==null?"":g._compress(t,15,function(n){return e(n+32)})+" "},decompressFromUTF16:function(t){return t==null?"":t==""?null:g._decompress(t.length,16384,function(n){return t.charCodeAt(n)-32})},compressToUint8Array:function(t){for(var n=g.compress(t),a=new Uint8Array(n.length*2),i=0,l=n.length;i<l;i++){var y=n.charCodeAt(i);a[i*2]=y>>>8,a[i*2+1]=y%256}return a},decompressFromUint8Array:function(t){if(t==null)return g.decompress(t);for(var n=new Array(t.length/2),a=0,i=n.length;a<i;a++)n[a]=t[a*2]*256+t[a*2+1];var l=[];return n.forEach(function(y){l.push(e(y))}),g.decompress(l.join(""))},compressToEncodedURIComponent:function(t){return t==null?"":g._compress(t,6,function(n){return p.charAt(n)})},decompressFromEncodedURIComponent:function(t){return t==null?"":t==""?null:(t=t.replace(/ /g,"+"),g._decompress(t.length,32,function(n){return m(p,t.charAt(n))}))},compress:function(t){return g._compress(t,16,function(n){return e(n)})},_compress:function(t,n,a){if(t==null)return"";var i,l,y={},w={},v="",U="",h="",x=2,S=3,d=2,f=[],r=0,s=0,b;for(b=0;b<t.length;b+=1)if(v=t.charAt(b),Object.prototype.hasOwnProperty.call(y,v)||(y[v]=S++,w[v]=!0),U=h+v,Object.prototype.hasOwnProperty.call(y,U))h=U;else{if(Object.prototype.hasOwnProperty.call(w,h)){if(h.charCodeAt(0)<256){for(i=0;i<d;i++)r=r<<1,s==n-1?(s=0,f.push(a(r)),r=0):s++;for(l=h.charCodeAt(0),i=0;i<8;i++)r=r<<1|l&1,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=l>>1}else{for(l=1,i=0;i<d;i++)r=r<<1|l,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=0;for(l=h.charCodeAt(0),i=0;i<16;i++)r=r<<1|l&1,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=l>>1}x--,x==0&&(x=Math.pow(2,d),d++),delete w[h]}else for(l=y[h],i=0;i<d;i++)r=r<<1|l&1,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=l>>1;x--,x==0&&(x=Math.pow(2,d),d++),y[U]=S++,h=String(v)}if(h!==""){if(Object.prototype.hasOwnProperty.call(w,h)){if(h.charCodeAt(0)<256){for(i=0;i<d;i++)r=r<<1,s==n-1?(s=0,f.push(a(r)),r=0):s++;for(l=h.charCodeAt(0),i=0;i<8;i++)r=r<<1|l&1,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=l>>1}else{for(l=1,i=0;i<d;i++)r=r<<1|l,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=0;for(l=h.charCodeAt(0),i=0;i<16;i++)r=r<<1|l&1,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=l>>1}x--,x==0&&(x=Math.pow(2,d),d++),delete w[h]}else for(l=y[h],i=0;i<d;i++)r=r<<1|l&1,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=l>>1;x--,x==0&&(x=Math.pow(2,d),d++)}for(l=2,i=0;i<d;i++)r=r<<1|l&1,s==n-1?(s=0,f.push(a(r)),r=0):s++,l=l>>1;for(;;)if(r=r<<1,s==n-1){f.push(a(r));break}else s++;return f.join("")},decompress:function(t){return t==null?"":t==""?null:g._decompress(t.length,32768,function(n){return t.charCodeAt(n)})},_decompress:function(t,n,a){var i=[],l,y=4,w=4,v=3,U="",h=[],x,S,d,f,r,s,b,c={val:a(0),position:n,index:1};for(x=0;x<3;x+=1)i[x]=x;for(d=0,r=Math.pow(2,2),s=1;s!=r;)f=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=a(c.index++)),d|=(f>0?1:0)*s,s<<=1;switch(l=d){case 0:for(d=0,r=Math.pow(2,8),s=1;s!=r;)f=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=a(c.index++)),d|=(f>0?1:0)*s,s<<=1;b=e(d);break;case 1:for(d=0,r=Math.pow(2,16),s=1;s!=r;)f=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=a(c.index++)),d|=(f>0?1:0)*s,s<<=1;b=e(d);break;case 2:return""}for(i[3]=b,S=b,h.push(b);;){if(c.index>t)return"";for(d=0,r=Math.pow(2,v),s=1;s!=r;)f=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=a(c.index++)),d|=(f>0?1:0)*s,s<<=1;switch(b=d){case 0:for(d=0,r=Math.pow(2,8),s=1;s!=r;)f=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=a(c.index++)),d|=(f>0?1:0)*s,s<<=1;i[w++]=e(d),b=w-1,y--;break;case 1:for(d=0,r=Math.pow(2,16),s=1;s!=r;)f=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=a(c.index++)),d|=(f>0?1:0)*s,s<<=1;i[w++]=e(d),b=w-1,y--;break;case 2:return h.join("")}if(y==0&&(y=Math.pow(2,v),v++),i[b])U=i[b];else if(b===w)U=S+S.charAt(0);else return null;h.push(U),i[w++]=S+U.charAt(0),y--,S=U,y==0&&(y=Math.pow(2,v),v++)}}};return g}();typeof define=="function"&&define.amd?define(function(){return B}):typeof _<"u"&&_!=null&&(_.exports=B)});var E=async(e,o,p,u={},m=self)=>new Promise(g=>{if(!e||!o||!p)return g(e||"");let t=async function(n){let a=n.data.payload;n.data.trigger==="compileInCompiler"&&a?.content===e&&a?.language===o&&(m.removeEventListener("message",t),g(a.compiled))};m.addEventListener("message",t),m.postMessage({type:"compileInCompiler",payload:{content:e,language:o,config:p,options:u}})});var C=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.io")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost")));var k=e=>e.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,"$1");var P=(e,o)=>({...o.customSettings[e]});var R=["jspm","skypack"],$=["unpkg","jsdelivr"],O=["jsdelivr.gh","statically"],j={getModuleUrl:(e,{isModule:o=!0,defaultCDN:p="jspm"}={})=>{e=e.replace(/#nobundle/g,"");let u=M(e,o,p);return u||(o?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,o)=>e.startsWith("http")?e:M(e,!1,o||te())||e,cdnLists:{npm:$,module:R,gh:O},checkCDNs:async(e,o)=>{let p=[o,...j.cdnLists.npm].filter(Boolean);for(let u of p)try{if((await fetch(j.getUrl(e,u),{method:"HEAD"})).ok)return u}catch{}return j.cdnLists.npm[0]}},te=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||j.cdnLists.npm[0]}catch{return j.cdnLists.npm[0]}},M=(e,o,p)=>{let u=o&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",O[0]):e.includes(":")||(e=(p||(o?R[0]:$[0]))+":"+e);for(let m of oe){let[g,t]=m;if(g.test(e))return e.replace(g,t)+u}return null},oe=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:A,getModuleUrl:Se}=j;var q=A("@hatemhosny/astro-internal@0.0.4/"),W=A("@astrojs/compiler@0.9.2/astro.wasm");var re="0.6.64",Ce=A(`malinajs@${re}/malina.js`);var T=ee(N());var F="https://dpaste.com/",ne="https://dpaste.com/api/v2/",z="https://api2.livecodes.io/share",K={getProject:async e=>{try{let o=await fetch(F+e+".txt");return o.ok?JSON.parse(await o.text()):{}}catch{return{}}},shareProject:async e=>{try{let o=await fetch(ne,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return o.ok?(await o.text()).replace(F,""):""}catch{return""}}},ie={getProject:async e=>{if(e.length<11)return K.getProject(e);if(!C())return{};try{let o=await fetch(z+"?id="+e);return o.ok?JSON.parse(await o.text()):{}}catch{return{}}},shareProject:async e=>{if(!C())return"";try{let o=await fetch(z,{method:"POST",mode:"cors",body:JSON.stringify(e)});return o.ok?o.text():""}catch{return""}}},Pt=C()?ie:K;var L=/(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g,ae=/(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g,ce=e=>[...k(e).matchAll(new RegExp(L)),...k(e).matchAll(new RegExp(ae))].map(o=>o[2].replace(/"/g,"").replace(/'/g,"")),le=e=>!e.startsWith("https://deno.bundlejs.com/")&&!e.startsWith("https://edge.bundlejs.com/")&&!e.endsWith("#nobundle")&&(e.startsWith("https://deno.land/")||e.startsWith("https://github.com/")||e.startsWith("https://raw.githubusercontent.com/")||e.startsWith("https://gitlab.com/")||e.startsWith("https://bitbucket.org")||e.endsWith(".ts")||e.endsWith(".jsx")||e.endsWith(".tsx")),pe=e=>!e.startsWith("https://")&&!e.startsWith("http://")&&!e.startsWith(".")&&!e.startsWith("/")&&!e.startsWith("data:")&&!e.startsWith("blob:"),de=(e,o)=>ce(e).map(p=>{if(!le(p)&&!pe(p))return{};{let u=Object.keys(o.imports).find(m=>m===p||p.startsWith(m+"/"));return u?{[u]:o.imports[u]}:{[p]:j.getModuleUrl(p,{defaultCDN:o?.customSettings?.defaultCDN})}}}).reduce((p,u)=>({...p,...u}),{});var H=(e,o)=>{let p=de(e,o);return e.replace(new RegExp(L),u=>{let m=u.replace(new RegExp(L),"$2").replace(/"/g,"").replace(/'/g,""),g=Object.keys(p).find(t=>t===m||m.startsWith(t+"/"));return g?u.replace(g,p[g]):u})};var ue=q+"index.min.js",me=async(e,o)=>{e=H(e,o);let p=/^---((?:.|\n|\r)*)---((?:.|\n|\r)*)/,u=e.trim().match(new RegExp(p))?.[1];if(!u)return e;let m=await E(u,"typescript",o);return e.trim().replace(new RegExp(p),`---
${m}
---
$2`)};self.createAstroCompiler=()=>{let{transform:e,initialize:o,renderAstroToHTML:p}=self.astroCompiler,u=o({wasmURL:W});return async(m,{config:g})=>{await u;let t=await me(m,g),n=await e(t,{sourcefile:"file.astro",sourcemap:!1,internalURL:ue,...P("astro",g)}),a=await p(n.code);if(a.errors){for(let i of a.errors)console.warn(i);return""}return a}};})();
//# sourceMappingURL=lang-astro-compiler.js.map
