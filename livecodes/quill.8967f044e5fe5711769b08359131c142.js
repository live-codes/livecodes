var J=Object.create;var $=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var X=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,tt=Object.prototype.hasOwnProperty;var et=(t,i)=>()=>(i||t((i={exports:{}}).exports,i),i.exports);var ot=(t,i,m,f)=>{if(i&&typeof i=="object"||typeof i=="function")for(let b of X(i))!tt.call(t,b)&&b!==m&&$(t,b,{get:()=>i[b],enumerable:!(f=Z(i,b))||f.enumerable});return t};var st=(t,i,m)=>(m=t!=null?J(Y(t)):{},ot(i||!t||!t.__esModule?$(m,"default",{value:t,enumerable:!0}):m,t));var H=et((Xt,q)=>{var at=function(){var t=String.fromCharCode,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",f={};function b(e,n){if(!f[e]){f[e]={};for(var c=0;c<e.length;c++)f[e][e.charAt(c)]=c}return f[e][n]}var g={compressToBase64:function(e){if(e==null)return"";var n=g._compress(e,6,function(c){return i.charAt(c)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(e){return e==null?"":e==""?null:g._decompress(e.length,32,function(n){return b(i,e.charAt(n))})},compressToUTF16:function(e){return e==null?"":g._compress(e,15,function(n){return t(n+32)})+" "},decompressFromUTF16:function(e){return e==null?"":e==""?null:g._decompress(e.length,16384,function(n){return e.charCodeAt(n)-32})},compressToUint8Array:function(e){for(var n=g.compress(e),c=new Uint8Array(n.length*2),r=0,a=n.length;r<a;r++){var u=n.charCodeAt(r);c[r*2]=u>>>8,c[r*2+1]=u%256}return c},decompressFromUint8Array:function(e){if(e==null)return g.decompress(e);for(var n=new Array(e.length/2),c=0,r=n.length;c<r;c++)n[c]=e[c*2]*256+e[c*2+1];var a=[];return n.forEach(function(u){a.push(t(u))}),g.decompress(a.join(""))},compressToEncodedURIComponent:function(e){return e==null?"":g._compress(e,6,function(n){return m.charAt(n)})},decompressFromEncodedURIComponent:function(e){return e==null?"":e==""?null:(e=e.replace(/ /g,"+"),g._decompress(e.length,32,function(n){return b(m,e.charAt(n))}))},compress:function(e){return g._compress(e,16,function(n){return t(n)})},_compress:function(e,n,c){if(e==null)return"";var r,a,u={},v={},w="",U="",h="",y=2,j=3,p=2,d=[],o=0,s=0,x;for(x=0;x<e.length;x+=1)if(w=e.charAt(x),Object.prototype.hasOwnProperty.call(u,w)||(u[w]=j++,v[w]=!0),U=h+w,Object.prototype.hasOwnProperty.call(u,U))h=U;else{if(Object.prototype.hasOwnProperty.call(v,h)){if(h.charCodeAt(0)<256){for(r=0;r<p;r++)o=o<<1,s==n-1?(s=0,d.push(c(o)),o=0):s++;for(a=h.charCodeAt(0),r=0;r<8;r++)o=o<<1|a&1,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=a>>1}else{for(a=1,r=0;r<p;r++)o=o<<1|a,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=0;for(a=h.charCodeAt(0),r=0;r<16;r++)o=o<<1|a&1,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=a>>1}y--,y==0&&(y=Math.pow(2,p),p++),delete v[h]}else for(a=u[h],r=0;r<p;r++)o=o<<1|a&1,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=a>>1;y--,y==0&&(y=Math.pow(2,p),p++),u[U]=j++,h=String(w)}if(h!==""){if(Object.prototype.hasOwnProperty.call(v,h)){if(h.charCodeAt(0)<256){for(r=0;r<p;r++)o=o<<1,s==n-1?(s=0,d.push(c(o)),o=0):s++;for(a=h.charCodeAt(0),r=0;r<8;r++)o=o<<1|a&1,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=a>>1}else{for(a=1,r=0;r<p;r++)o=o<<1|a,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=0;for(a=h.charCodeAt(0),r=0;r<16;r++)o=o<<1|a&1,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=a>>1}y--,y==0&&(y=Math.pow(2,p),p++),delete v[h]}else for(a=u[h],r=0;r<p;r++)o=o<<1|a&1,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=a>>1;y--,y==0&&(y=Math.pow(2,p),p++)}for(a=2,r=0;r<p;r++)o=o<<1|a&1,s==n-1?(s=0,d.push(c(o)),o=0):s++,a=a>>1;for(;;)if(o=o<<1,s==n-1){d.push(c(o));break}else s++;return d.join("")},decompress:function(e){return e==null?"":e==""?null:g._decompress(e.length,32768,function(n){return e.charCodeAt(n)})},_decompress:function(e,n,c){var r=[],a,u=4,v=4,w=3,U="",h=[],y,j,p,d,o,s,x,l={val:c(0),position:n,index:1};for(y=0;y<3;y+=1)r[y]=y;for(p=0,o=Math.pow(2,2),s=1;s!=o;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*s,s<<=1;switch(a=p){case 0:for(p=0,o=Math.pow(2,8),s=1;s!=o;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*s,s<<=1;x=t(p);break;case 1:for(p=0,o=Math.pow(2,16),s=1;s!=o;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*s,s<<=1;x=t(p);break;case 2:return""}for(r[3]=x,j=x,h.push(x);;){if(l.index>e)return"";for(p=0,o=Math.pow(2,w),s=1;s!=o;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*s,s<<=1;switch(x=p){case 0:for(p=0,o=Math.pow(2,8),s=1;s!=o;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*s,s<<=1;r[v++]=t(p),x=v-1,u--;break;case 1:for(p=0,o=Math.pow(2,16),s=1;s!=o;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*s,s<<=1;r[v++]=t(p),x=v-1,u--;break;case 2:return h.join("")}if(u==0&&(u=Math.pow(2,w),w++),r[x])U=r[x];else if(x===v)U=j+j.charAt(0);else return null;h.push(U),r[v++]=j+U.charAt(0),u--,j=U,u==0&&(u=Math.pow(2,w),w++)}}};return g}();typeof q<"u"&&q!=null&&(q.exports=at)});var T=(t=location.origin)=>!!(t&&(t.endsWith("livecodes.io")||t.endsWith("livecodes.pages.dev")||t.endsWith("localpen.pages.dev")||t.startsWith("http://127.0.0.1")||t.startsWith("http://localhost")));var B=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],O=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],W=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],S={getModuleUrl:(t,{isModule:i=!0,defaultCDN:m="esm.sh",external:f}={})=>{t=t.replace(/#nobundle/g,"");let b=e=>!f||!e.includes("https://esm.sh")?e:e.includes("?")?`${e}&external=${f}`:`${e}?external=${f}`,g=P(t,i,m);return g?b(g):i?b("https://esm.sh/"+t):"https://cdn.jsdelivr.net/npm/"+t},getUrl:(t,i)=>t.startsWith("http")||t.startsWith("data:")?t:P(t,!1,i||rt())||t,cdnLists:{npm:O,module:B,gh:W},checkCDNs:async(t,i)=>{let m=[i,...S.cdnLists.npm].filter(Boolean);for(let f of m)try{if((await fetch(S.getUrl(t,f),{method:"HEAD"})).ok)return f}catch{}return S.cdnLists.npm[0]}},rt=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||S.cdnLists.npm[0]}catch{return S.cdnLists.npm[0]}},P=(t,i,m)=>{let f=i&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",W[0]):t.includes(":")||(t=(m||(i?B[0]:O[0]))+":"+t);for(let b of nt){let[g,e]=b;if(g.test(t))return t.replace(g,e)+f}return null},nt=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:k,getModuleUrl:yt}=S;var A=k("quill@2.0.2/dist/"),D=k("quill-html-edit-button@2.2.14/dist/quill.htmlEditButton.min.js"),N=k("quill-blot-formatter@1.0.5/dist/quill-blot-formatter.min.js"),L=k("quill-better-table@1.2.10/dist/");var M=st(H());var lt="https://live-codes.github.io/livecodes-sandbox/dist",I=lt,z="v8",_={getResultUrl:()=>`${I}/${z}/`,getCompilerUrl:()=>`${I}/${z}/compiler`,getOrigin:()=>new URL(I).origin};var K="https://dpaste.com/",ct="https://dpaste.com/api/v2/",Q="https://api2.livecodes.io/share",V={getProject:async t=>{try{let i=await fetch(K+t+".txt");return i.ok?JSON.parse(await i.text()):{}}catch{return{}}},shareProject:async t=>{try{let i=await fetch(ct,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(t))}&title=${encodeURIComponent(t.title||"")}&syntax=json&expiry_days=365`});return i.ok?(await i.text()).replace(K,""):""}catch{return""}}},pt={getProject:async t=>{if(t.length<11)return V.getProject(t);if(!T())return{};try{let i=await fetch(Q+"?id="+t);return i.ok?JSON.parse(await i.text()):{}}catch{return{}}},shareProject:async t=>{if(!T())return"";try{let i=await fetch(Q,{method:"POST",mode:"cors",body:JSON.stringify(t)});return i.ok?i.text():""}catch{return""}}},Ae=T()?pt:V;var G=`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rich Text Editor</title></head><body><style>body,html{margin:0;padding:0;height:100%}#standalone-container{display:flex;flex-direction:column;height:100%;max-height:100%}#editor-container{flex-grow:0;overflow-y:auto}body{background:#fff}.ql-snow.ql-toolbar{background:#eaecec}#toolbar-container .ql-font span[data-label=Arial]::before{font-family:Arial,sans-serif}#toolbar-container .ql-font span[data-label='Comic Sans MS']::before{font-family:Comic Sans MS,sans-serif}#toolbar-container .ql-font span[data-label=Verdana]::before{font-family:Verdana,sans-serif}#toolbar-container .ql-font span[data-label=Helvetica]::before{font-family:Helvetica,sans-serif}#toolbar-container .ql-font span[data-label=Tahoma]::before{font-family:Tahoma,sans-serif}#toolbar-container .ql-font span[data-label='Trebuchet MS']::before{font-family:Trebuchet MS,sans-serif}#toolbar-container .ql-font span[data-label='Times New Roman']::before{font-family:Times New Roman,serif}#toolbar-container .ql-font span[data-label=Georgia]::before{font-family:Georgia,serif}#toolbar-container .ql-font span[data-label=Garamond]::before{font-family:Garamond,serif}#toolbar-container .ql-font span[data-label='Courier New']::before{font-family:Courier New,monospace}#toolbar-container .ql-font span[data-label='Brush Script MT']::before{font-family:Brush Script MT,cursive}#toolbar-container .ql-size span[data-label=Small]::before{font-size:.75em}#toolbar-container .ql-size span[data-label=Large]::before{font-size:1.5em}#toolbar-container .ql-size span[data-label=Huge]::before{font-size:2.5em}</style><!-- styles placeholder --><div id="standalone-container"><div id="toolbar-container"><span class="ql-formats"><select class="ql-font" title="Font Face"><option selected>Default</option><option>Arial</option><option>Brush Script MT</option><option>Comic Sans MS</option><option>Courier New</option><option>Garamond</option><option>Georgia</option><option>Helvetica</option><option>Tahoma</option><option>Times New Roman</option><option>Trebuchet MS</option><option>Verdana</option></select> <select class="ql-size" title="Font Size"><option value="0.75em">Small</option><option selected>Normal</option><option value="1.5em">Large</option><option value="2.5em">Huge</option></select> <select class="ql-header" title="Heading"><option value=""></option><option value="1"></option><option value="2"></option><option value="3"></option><option value="4"></option><option value="5"></option><option value="6"></option></select> </span><span class="ql-formats"><button class="ql-bold" title="Bold"></button> <button class="ql-italic" title="Italic"></button> <button class="ql-underline" title="Underline"></button> <button class="ql-strike" title="Strike"></button> </span><span class="ql-formats"><select class="ql-color" title="Font Color"></select> <select class="ql-background" title="Background Color"></select> </span><span class="ql-formats"><button class="ql-script" value="sub" title="Subscript"></button> <button class="ql-script" value="super" title="Superscript"></button> </span><span class="ql-formats"><button class="ql-list" value="ordered" title="Ordered List"></button> <button class="ql-list" value="bullet" title="Unordered List"></button> <button class="ql-indent" value="-1" title="Outdent"></button> <button class="ql-indent" value="+1" title="Indent"></button> <button class="ql-blockquote" title="Quote"></button> </span><span class="ql-formats"><button class="ql-direction" value="rtl" title="Text Direction"></button> <select class="ql-align" title="Align"><option></option><option value="right"></option><option value="center"></option><option value="justify"></option></select> </span><span class="ql-formats"><button class="ql-link" title="Link"></button> <button class="ql-image" title="Image"></button> <button class="ql-video" title="Video"></button> <button class="ql-table" title="Insert Table"></button> </span><span class="ql-formats"><button class="ql-undo" title="Undo"></button> <button class="ql-redo" title="Redo"></button> <button class="ql-clean" title="Reset formatting"></button></span></div><div id="editor-container"><!-- content placeholder --></div></div><!-- scripts placeholder --><script>(()=>{let t=!1;(l=Quill.import("attributors/style/font")).whitelist=["Arial","Helvetica","Verdana","Tahoma","Trebuchet MS","Times New Roman","Georgia","Garamond","Courier New","Brush Script MT"],Quill.register(l,!0),(r=Quill.import("attributors/style/size")).whitelist=["0.75em","1.5em","2.5em"],Quill.register(r,!0);var e=Quill.import("attributors/style/align");Quill.register(e,!0);var l,r,i=Quill.import("attributors/style/direction");Quill.register(i,!0),Quill.register("modules/htmlEditButton",htmlEditButton),Quill.register("modules/blotFormatter",QuillBlotFormatter.default),Quill.register({"modules/better-table":quillBetterTable},!0),(l=Quill.import("attributors/style/font")).whitelist=["Arial","Brush Script MT","Comic Sans MS","Courier New","Garamond","Georgia","Helvetica","Tahoma","Times New Roman","Trebuchet MS","Verdana"],Quill.register(l,!0),(r=Quill.import("attributors/style/size")).whitelist=["0.75em","1.5em","2.5em"],Quill.register(r,!0);e=Quill.import("attributors/style/align");Quill.register(e,!0);i=Quill.import("attributors/style/direction");Quill.register(i,!0);var o=new Quill("#editor-container",{modules:{toolbar:{container:"#toolbar-container",handlers:{undo:t=>{o.history.undo()},redo:t=>{o.history.redo()},table:t=>{o.getModule("better-table").insertTable(3,3)}}},history:{delay:1e3,userOnly:!1},htmlEditButton:{debug:!1,msg:"Edit the content in HTML format"},blotFormatter:{},table:!1,"better-table":{operationMenu:{color:{colors:["green","red","yellow","blue","grey","white"],text:"Background Colors:"}}}},placeholder:"Content...",theme:"snow"});function a(){parent.postMessage({type:"quillEditorCode",payload:{html:o.root.innerHTML||""}},"*")}document.querySelector(".ql-undo").innerHTML='<svg viewBox="0 0 1792 1792" style="transform: scaleX(0.9) scaleY(0.9);" xmlns="http://www.w3.org/2000/svg"><path class="ql-fill" d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"/></svg>',document.querySelector(".ql-redo").innerHTML='<svg viewBox="0 0 1792 1792" style="transform: scaleX(-0.9) scaleY(0.9);" xmlns="http://www.w3.org/2000/svg"><path class="ql-fill" d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"/></svg>',o.on("text-change",(()=>{t?t=!1:a()})),window.addEventListener("message",(function(e){e.data.html?(t=!0,o.root.innerHTML=e.data.html):"updateCode"===e.data.type?a():e.data.type})),window.addEventListener("load",(()=>{parent.postMessage({type:"quillEditorLoaded",payload:!0},"*"),a()}))})()<\/script></body></html>`;var E=!1,R="",C=()=>document.querySelector("#quill-editor-frame"),ut=async({baseUrl:t,config:i,editors:m,eventsManager:f})=>{if(E){R!==m.markup.getValue()&&C()?.contentWindow?.postMessage({html:m.markup.getValue()},"*");return}let b=`
  <script src="${A}quill.js"><\/script>
  <script src="${D}"><\/script>
  <script src="${N}"><\/script>
  <script src="${L}quill-better-table.min.js"><\/script>
  <script src="${t}custom-editor-utils.93da371294edff0056c5505aaf0a9ce5.js"><\/script>
    `,g=`
  <link rel="stylesheet" href="${t}quill.8e9d74c74d2c8aaa5d849678c215cf7e.css" />
  <link rel="stylesheet" href="${A}quill.snow.css" />
  <link rel="stylesheet" href="${L}quill-better-table.css" />
  `,e=()=>G.replace("<!-- styles placeholder -->",g).replace("<!-- scripts placeholder -->",E?"":b).replace("// {{ custom config }}",i.readonly?"readOnly: true":"").replace("<!-- content placeholder -->",m.markup.getValue());await new Promise(n=>{let c=document.querySelector("#quillEditor"),r=C(),a=()=>{f.addEventListener(window,"message",u=>{if(u.source!==C()?.contentWindow||!["quillEditorCode","quillEditorLoaded"].includes(u.data.type))return;if(u.data.type==="quillEditorLoaded"){E=!0,f.removeEventListener(r,"load",a),mt(),n("loaded");return}let{html:v}=u.data.payload;R=v,m.markup.setValue(v||"")}),C()?.contentWindow?.postMessage({result:e()},"*")};r?a():(r=document.createElement("iframe"),r.name="quillEditor",r.id="quill-editor-frame",r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),f.addEventListener(r,"load",a),r.src=_.getResultUrl(),c.appendChild(r))})},ho=async({baseUrl:t,editors:i,config:m,html:f,eventsManager:b})=>m.script.language!=="richtext"?{}:(E||await ut({baseUrl:t,config:m,editors:i,html:f,eventsManager:b}),{html:R}),bo=t=>{C()?.contentWindow?.postMessage({type:"setTheme",payload:t},_.getOrigin())},mt=()=>{C()?.contentWindow?.postMessage({type:"updateCode"},_.getOrigin())};export{ho as getQuillEditorContent,bo as setQuillEditorTheme,ut as showQuillEditor};
