var Pe=Object.create;var N=Object.defineProperty;var Oe=Object.getOwnPropertyDescriptor;var Ne=Object.getOwnPropertyNames;var Fe=Object.getPrototypeOf,Je=Object.prototype.hasOwnProperty;var Xe=(e,o)=>()=>(o||e((o={exports:{}}).exports,o),o.exports);var We=(e,o,p,u)=>{if(o&&typeof o=="object"||typeof o=="function")for(let m of Ne(o))!Je.call(e,m)&&m!==p&&N(e,m,{get:()=>o[m],enumerable:!(u=Oe(o,m))||u.enumerable});return e};var ze=(e,o,p)=>(p=e!=null?Pe(Fe(e)):{},We(o||!e||!e.__esModule?N(p,"default",{value:e,enumerable:!0}):p,e));var Q=Xe((ha,q)=>{var V=function(){var e=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",u={};function m(a,n){if(!u[a]){u[a]={};for(var d=0;d<a.length;d++)u[a][a.charAt(d)]=d}return u[a][n]}var h={compressToBase64:function(a){if(a==null)return"";var n=h._compress(a,6,function(d){return o.charAt(d)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:h._decompress(a.length,32,function(n){return m(o,a.charAt(n))})},compressToUTF16:function(a){return a==null?"":h._compress(a,15,function(n){return e(n+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:h._decompress(a.length,16384,function(n){return a.charCodeAt(n)-32})},compressToUint8Array:function(a){for(var n=h.compress(a),d=new Uint8Array(n.length*2),i=0,l=n.length;i<l;i++){var b=n.charCodeAt(i);d[i*2]=b>>>8,d[i*2+1]=b%256}return d},decompressFromUint8Array:function(a){if(a==null)return h.decompress(a);for(var n=new Array(a.length/2),d=0,i=n.length;d<i;d++)n[d]=a[d*2]*256+a[d*2+1];var l=[];return n.forEach(function(b){l.push(e(b))}),h.decompress(l.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":h._compress(a,6,function(n){return p.charAt(n)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),h._decompress(a.length,32,function(n){return m(p,a.charAt(n))}))},compress:function(a){return h._compress(a,16,function(n){return e(n)})},_compress:function(a,n,d){if(a==null)return"";var i,l,b={},S={},x="",L="",v="",y=2,k=3,g=2,s=[],t=0,r=0,f;for(f=0;f<a.length;f+=1)if(x=a.charAt(f),Object.prototype.hasOwnProperty.call(b,x)||(b[x]=k++,S[x]=!0),L=v+x,Object.prototype.hasOwnProperty.call(b,L))v=L;else{if(Object.prototype.hasOwnProperty.call(S,v)){if(v.charCodeAt(0)<256){for(i=0;i<g;i++)t=t<<1,r==n-1?(r=0,s.push(d(t)),t=0):r++;for(l=v.charCodeAt(0),i=0;i<8;i++)t=t<<1|l&1,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=l>>1}else{for(l=1,i=0;i<g;i++)t=t<<1|l,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=0;for(l=v.charCodeAt(0),i=0;i<16;i++)t=t<<1|l&1,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=l>>1}y--,y==0&&(y=Math.pow(2,g),g++),delete S[v]}else for(l=b[v],i=0;i<g;i++)t=t<<1|l&1,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=l>>1;y--,y==0&&(y=Math.pow(2,g),g++),b[L]=k++,v=String(x)}if(v!==""){if(Object.prototype.hasOwnProperty.call(S,v)){if(v.charCodeAt(0)<256){for(i=0;i<g;i++)t=t<<1,r==n-1?(r=0,s.push(d(t)),t=0):r++;for(l=v.charCodeAt(0),i=0;i<8;i++)t=t<<1|l&1,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=l>>1}else{for(l=1,i=0;i<g;i++)t=t<<1|l,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=0;for(l=v.charCodeAt(0),i=0;i<16;i++)t=t<<1|l&1,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=l>>1}y--,y==0&&(y=Math.pow(2,g),g++),delete S[v]}else for(l=b[v],i=0;i<g;i++)t=t<<1|l&1,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=l>>1;y--,y==0&&(y=Math.pow(2,g),g++)}for(l=2,i=0;i<g;i++)t=t<<1|l&1,r==n-1?(r=0,s.push(d(t)),t=0):r++,l=l>>1;for(;;)if(t=t<<1,r==n-1){s.push(d(t));break}else r++;return s.join("")},decompress:function(a){return a==null?"":a==""?null:h._decompress(a.length,32768,function(n){return a.charCodeAt(n)})},_decompress:function(a,n,d){var i=[],l,b=4,S=4,x=3,L="",v=[],y,k,g,s,t,r,f,c={val:d(0),position:n,index:1};for(y=0;y<3;y+=1)i[y]=y;for(g=0,t=Math.pow(2,2),r=1;r!=t;)s=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=d(c.index++)),g|=(s>0?1:0)*r,r<<=1;switch(l=g){case 0:for(g=0,t=Math.pow(2,8),r=1;r!=t;)s=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=d(c.index++)),g|=(s>0?1:0)*r,r<<=1;f=e(g);break;case 1:for(g=0,t=Math.pow(2,16),r=1;r!=t;)s=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=d(c.index++)),g|=(s>0?1:0)*r,r<<=1;f=e(g);break;case 2:return""}for(i[3]=f,k=f,v.push(f);;){if(c.index>a)return"";for(g=0,t=Math.pow(2,x),r=1;r!=t;)s=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=d(c.index++)),g|=(s>0?1:0)*r,r<<=1;switch(f=g){case 0:for(g=0,t=Math.pow(2,8),r=1;r!=t;)s=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=d(c.index++)),g|=(s>0?1:0)*r,r<<=1;i[S++]=e(g),f=S-1,b--;break;case 1:for(g=0,t=Math.pow(2,16),r=1;r!=t;)s=c.val&c.position,c.position>>=1,c.position==0&&(c.position=n,c.val=d(c.index++)),g|=(s>0?1:0)*r,r<<=1;i[S++]=e(g),f=S-1,b--;break;case 2:return v.join("")}if(b==0&&(b=Math.pow(2,x),x++),i[f])L=i[f];else if(f===S)L=k+k.charAt(0);else return null;v.push(L),i[S++]=k+L.charAt(0),b--,k=L,b==0&&(b=Math.pow(2,x),x++)}}};return h}();typeof define=="function"&&define.amd?define(function(){return V}):typeof q<"u"&&q!=null&&(q.exports=V)});var F=()=>{let e=!1,o=navigator.userAgent.toLowerCase();(function(u){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(u)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(u.substr(0,4)))&&(e=!0)})(o||navigator.vendor||window.opera);let p=o.indexOf("safari")>-1&&o.indexOf("chrome")===-1;return e||p};var J=e=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy")){let o=document.createElement("textarea");o.textContent=e,o.style.position="fixed",document.body.appendChild(o),o.select();try{return document.execCommand("copy")}catch(p){return console.warn("Copy to clipboard failed.",p),!1}finally{document.body.removeChild(o)}}return!1};var B=(e,o)=>new Promise((p,u)=>{if(o&&globalThis[o])return p(globalThis[o]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),o&&globalThis[o]?p(globalThis[o]):p(globalThis);let m=document.createElement("script");m.src=e,m.async=!0;let h=()=>{m.removeEventListener("load",a),m.removeEventListener("error",n)},a=()=>{if(h(),!o)return p("loaded: "+e);let d=setInterval(()=>{if(window[o])return clearInterval(d),p(window[o])},5)},n=()=>{h(),u("failed to load: "+e)};m.addEventListener("load",a),m.addEventListener("error",n),document.head.appendChild(m)});var W=["jspm","skypack"],z=["unpkg","jsdelivr"],G=["jsdelivr.gh","statically"],H={getModuleUrl:(e,{isModule:o=!0,defaultCDN:p="jspm"}={})=>{e=e.replace(/#nobundle/g,"");let u=X(e,o,p);return u||(o?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,o)=>e.startsWith("http")?e:X(e,!1,o||Ge())||e,cdnLists:{npm:z,module:W,gh:G},checkCDNs:async(e,o)=>{let p=[o,...H.cdnLists.npm].filter(Boolean);for(let u of p)try{if((await fetch(H.getUrl(e,u),{method:"HEAD"})).ok)return u}catch{}return H.cdnLists.npm[0]}},Ge=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||H.cdnLists.npm[0]}catch{return H.cdnLists.npm[0]}},X=(e,o,p)=>{let u=o&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",G[0]):e.includes(":")||(e=(p||(o?W[0]:z[0]))+":"+e);for(let m of $e){let[h,a]=m;if(h.test(e))return e.replace(h,a)+u}return null},$e=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:$,getModuleUrl:Dt}=H;var Y=$("flexsearch@0.7.21/dist/flexsearch.bundle.js");var Ye="0.6.64",It=$(`malinajs@${Ye}/malina.js`);var D=()=>(Date.now()+""+Math.floor(Math.floor(Math.random()*Date.now()))).substring(0,24);var I=ze(Q());var Z=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LiveCodes</title>
    <script>
      window.addEventListener('message', function (event) {
        if (event.data.result) {
          document.write(event.data.result);
          document.close();
        }
      });
    <\/script>
  </head>
  <body></body>
</html>
`;var ee=`<!DOCTYPE html>\r
<html lang="en">\r
  <head>\r
    <meta charset="UTF-8" />\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
    <title>LiveCodes</title>\r
    <style>\r
      body {\r
        overflow: hidden;\r
      }\r
    </style>\r
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />\r
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />\r
    <link rel="stylesheet" href="{{baseUrl}}app.a4c2be5f9b09604655b5d151dfef680a.css" id="app-styles" />\r
    <script src="{{esModuleShimsUrl}}" async><\/script>\r
    <script type="importmap">\r
      {\r
        "imports": {\r
          "@codemirror/autocomplete": "{{codemirrorCoreUrl}}",\r
          "@codemirror/commands": "{{codemirrorCoreUrl}}",\r
          "@codemirror/language": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lint": "{{codemirrorCoreUrl}}",\r
          "@codemirror/search": "{{codemirrorCoreUrl}}",\r
          "@codemirror/state": "{{codemirrorCoreUrl}}",\r
          "@codemirror/theme-one-dark": "{{codemirrorCoreUrl}}",\r
          "@codemirror/view": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lang-html": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lang-css": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lang-javascript": "{{codemirrorCoreUrl}}",\r
          "@lezer/common": "{{codemirrorCoreUrl}}",\r
          "@lezer/highlight": "{{codemirrorCoreUrl}}",\r
          "@lezer/lr": "{{codemirrorCoreUrl}}"\r
        }\r
      }\r
    <\/script>\r
  </head>\r
  <body>\r
    <div id="container">\r
      <div id="toolbar">\r
        <div id="logo">\r
          <a href="/" title="LiveCodes: Code playground that runs in the browser!"\r
            ><img\r
              alt="LiveCodes Logo"\r
              src="{{baseUrl}}assets/images/livecodes-logo.svg"\r
              width="50"\r
              loading="lazy"\r
          /></a>\r
        </div>\r
        <div id="select-editor"></div>\r
        <div id="project-title" contenteditable="true" tabindex="8">Untitled Project</div>\r
        <div id="buttons">\r
          <a\r
            href="javascript:void(0)"\r
            id="run-button"\r
            class="button hint--bottom"\r
            data-hint="Run (Shift + Enter)"\r
            tabindex="9"\r
          >\r
            <img\r
              width="20"\r
              height="20"\r
              alt="Run"\r
              src="{{baseUrl}}assets/images/play.svg"\r
              loading="lazy"\r
            />\r
          </a>\r
          <a\r
            href="javascript:void(0)"\r
            id="result-button"\r
            class="button hint--bottom"\r
            data-hint="Toggle Result"\r
            tabindex="10"\r
          >\r
            <img\r
              width="28"\r
              height="28"\r
              alt="Result"\r
              src="{{baseUrl}}assets/images/document.svg"\r
              loading="lazy"\r
            />\r
          </a>\r
          <a\r
            href="javascript:void(0)"\r
            id="fullscreen-button"\r
            class="button hint--bottom"\r
            data-hint="Full Screen"\r
            tabindex="11"\r
          >\r
            <img\r
              width="28"\r
              height="28"\r
              alt="Fullscreen"\r
              src="{{baseUrl}}assets/images/expand.svg"\r
              loading="lazy"\r
            />\r
          </a>\r
          <a\r
            href="javascript:void(0)"\r
            id="settings-button"\r
            class="button"\r
            aria-label="Menu"\r
            tabindex="12"\r
          >\r
            <img\r
              width="30"\r
              height="30"\r
              alt="Menu"\r
              src="{{baseUrl}}assets/images/menu.svg"\r
              loading="lazy"\r
            />\r
          </a>\r
          <div id="settings-menu-container" class="menu-scroller"></div>\r
        </div>\r
      </div>\r
      <div id="editor-container">\r
        <div id="editors">\r
          <div id="markup" class="editor"></div>\r
          <div id="style" class="editor"></div>\r
          <div id="script" class="editor"></div>\r
\r
          <div id="editor-tools" class="tool-buttons">\r
            <span\r
              id="copy-btn"\r
              class="hint--top-right"\r
              data-hint="Copy (Ctrl/Cmd + A, Ctrl/Cmd + C)"\r
            >\r
              <img src="{{baseUrl}}assets/images/copy.svg" alt="copy" />\r
            </span>\r
            <span id="undo-btn" class="hint--top-right" data-hint="Undo (Ctrl/Cmd + Z)">\r
              <img src="{{baseUrl}}assets/images/undo.svg" alt="undo" />\r
            </span>\r
            <span id="redo-btn" class="hint--top-right" data-hint="Redo (Ctrl/Cmd + Shift + Z)">\r
              <img src="{{baseUrl}}assets/images/redo.svg" alt="redo" />\r
            </span>\r
            <span id="format-btn" class="hint--top-right" data-hint="Format (Alt + Shift + F)">\r
              <img src="{{baseUrl}}assets/images/format.svg" alt="format" />\r
            </span>\r
            <span id="editor-status">\r
              <span id="editor-mode" class="hint--top-right" data-hint="Editor Mode"></span>\r
              <span data-status="markup"></span>\r
              <span data-status="style"></span>\r
              <span data-status="script"></span>\r
            </span>\r
            <span id="external-resources-btn" class="hint--top-left" data-hint="External Resources">\r
              <img src="{{baseUrl}}assets/images/script-sheet.svg" alt="External Resources" />\r
              <span id="external-resources-mark" class="mark"></span>\r
            </span>\r
          </div>\r
          <button id="code-run-button" class="hint--top-left" data-hint="Run (Shift + Enter)">\r
            <img\r
              width="20"\r
              height="20"\r
              alt="Run"\r
              src="{{baseUrl}}assets/images/play.svg"\r
              loading="lazy"\r
            />\r
          </button>\r
        </div>\r
        <div id="output">\r
          <div id="result" class="full"></div>\r
          <div id="tools-pane"></div>\r
        </div>\r
      </div>\r
    </div>\r
    <div id="overlay" style="display: none"></div>\r
    <div id="modal-container" style="display: none">\r
      <div id="modal"></div>\r
    </div>\r
    <script src="https://polyfill.io/v3/polyfill.min.js" crossorigin="anonymous"><\/script>\r
    <script>\r
      window.appCDN = '{{appCDN}}';\r
    <\/script>\r
    {{codemirrorModule}}\r
    <script type="module">\r
      import { app } from '{{baseUrl}}{{script}}';\r
      window.app = app;\r
    <\/script>\r
  </body>\r
</html>\r
`;var te=`<ul id="settings-menu" class="dropdown-menu">\r
  <li>\r
    <a href="#" id="login-link">Login \u2026</a>\r
    <a href="#" id="logout-link" style="display: none">Log out</a>\r
  </li>\r
  <li>\r
    <a href="#" id="new-link">New \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="open-link">Open \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="save-link">Save</a>\r
  </li>\r
  <li>\r
    <i class="arrow left"></i>\r
    <a href="#" id="save-as">Save as</a>\r
    <ul class="dropdown-menu submenu" id="save-as-menu">\r
      <li>\r
        <a href="#" id="fork-link">Fork (New Project)</a>\r
      </li>\r
      <li>\r
        <a href="#" id="template-link">Template</a>\r
      </li>\r
    </ul>\r
  </li>\r
  <li>\r
    <a href="#" id="import-link">Import \u2026</a>\r
  </li>\r
  <li>\r
    <i class="arrow left"></i>\r
    <a href="#" id="export">Export</a>\r
    <ul class="dropdown-menu submenu" id="export-menu">\r
      <li>\r
        <a href="#" id="export-json">Export Project (JSON)</a>\r
      </li>\r
      <li>\r
        <a href="#" id="export-src">Export Source (ZIP)</a>\r
      </li>\r
      <li>\r
        <a href="#" id="export-result">Export Result (HTML)</a>\r
      </li>\r
      <li>\r
        <a href="#" id="export-githubGist">Export to GitHub Gist</a>\r
      </li>\r
      <li>\r
        <a href="#" id="export-codepen">Edit in CodePen</a>\r
      </li>\r
      <li>\r
        <a href="#" id="export-jsfiddle">Edit in JSFiddle</a>\r
      </li>\r
    </ul>\r
  </li>\r
  <li>\r
    <a href="#" id="share-link">Share \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="embed-link">Embed \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="deploy-link">Deploy \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="external-resources-link">External Resources \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="custom-settings-link">Custom Settings \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="info-link">Project Info \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="broadcast-link">Broadcast \u2026</a>\r
  </li>\r
  <li>\r
    <label class="switch">\r
      <span>Auto update</span>\r
      <div>\r
        <input id="autoupdate" type="checkbox" data-config="autoupdate" />\r
        <span class="slider round"></span>\r
      </div>\r
    </label>\r
  </li>\r
  <li>\r
    <label class="switch">\r
      <span>Auto save</span>\r
      <div>\r
        <input id="autosave" type="checkbox" data-config="autosave" />\r
        <span class="slider round"></span>\r
      </div>\r
    </label>\r
  </li>\r
  <li>\r
    <label class="range-slider-label hint--bottom" data-hint="Delay before auto-update">\r
      <span>Delay: <span id="delay-value">1.5</span>s</span>\r
      <div>\r
        <input\r
          type="range"\r
          id="delay-range"\r
          min="0"\r
          max="3000"\r
          step="250"\r
          value="1500"\r
          class="range-slider"\r
        />\r
      </div>\r
    </label>\r
  </li>\r
  <li>\r
    <label class="switch">\r
      <span>Format on-save</span>\r
      <div>\r
        <input id="formatOnsave" type="checkbox" data-config="formatOnsave" />\r
        <span class="slider round"></span>\r
      </div>\r
    </label>\r
  </li>\r
  <li>\r
    <label class="switch">\r
      <span>Dark theme</span>\r
      <div>\r
        <input id="theme" type="checkbox" data-config="theme" />\r
        <span class="slider round"></span>\r
      </div>\r
    </label>\r
  </li>\r
  <li>\r
    <label class="switch">\r
      <span>Recover Unsaved</span>\r
      <div>\r
        <input id="recover-unsaved" type="checkbox" data-config="recoverUnsaved" />\r
        <span class="slider round"></span>\r
      </div>\r
    </label>\r
  </li>\r
  <li class="hint--bottom-left" data-hint="Press Alt/Option and move your cursor over result page">\r
    <label class="switch">\r
      <span>Show Spacing</span>\r
      <div>\r
        <input id="show-spacing" type="checkbox" data-config="showSpacing" />\r
        <span class="slider round"></span>\r
      </div>\r
    </label>\r
  </li>\r
  <li class="link-and-switch">\r
    <a href="#" id="sync-link"\r
      >Sync (beta) \u2026 <span id="sync-indicator" class="smaller hidden"> \u23F3</span></a\r
    >\r
    <label class="switch">\r
      <div>\r
        <input id="autosync" type="checkbox" data-config="autosync" />\r
        <span class="slider round"></span>\r
      </div>\r
    </label>\r
  </li>\r
  <li class="link-and-switch">\r
    <a href="#" id="welcome-link">Welcome \u2026</a>\r
    <label class="switch hint--bottom-left" data-hint="Show Welcome screen on startup">\r
      <div>\r
        <input id="welcome" type="checkbox" data-config="welcome" />\r
        <span class="slider round"></span>\r
      </div>\r
    </label>\r
  </li>\r
  <li>\r
    <a href="#" id="editor-settings-link">Editor Settings \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="assets-link">Assets \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="snippets-link">Code Snippets \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="backup-link">Backup / Restore \u2026</a>\r
  </li>\r
  <li>\r
    <a href="#" id="about-link">About</a>\r
  </li>\r
</ul>\r
`;var ae=`<section data-lang="art-template">\r
  <h3>art-template</h3>\r
  <div>High performance JavaScript templating engine.</div>\r
  <ul>\r
    <li>\r
      <a href="https://aui.github.io/art-template/" target="_blank" rel="noopener"\r
        >art-template official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://aui.github.io/art-template/docs/" target="_blank" rel="noopener"\r
        >art-template documentation</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="asciidoc">\r
  <h3>AsciiDoc</h3>\r
  <div>AsciiDoc compiled to HTML using Asciidoctor.</div>\r
  <ul>\r
    <li>\r
      <a href="https://asciidoc.org/" target="_blank" rel="noopener">AsciiDoc official website</a>\r
    </li>\r
    <li>\r
      <a href="https://asciidoctor.org/" target="_blank" rel="noopener"\r
        >Asciidoctor official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://asciidoctor.org/docs/" target="_blank" rel="noopener"\r
        >Asciidoctor documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/asciidoc/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=asciidoc</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="assemblyscript">\r
  <h3>AssemblyScript</h3>\r
  <div>A TypeScript-like language for WebAssembly.</div>\r
  <ul>\r
    <li>\r
      <a href="https://www.assemblyscript.org/" target="_blank" rel="noopener"\r
        >AssemblyScript official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.assemblyscript.org/introduction.html" target="_blank" rel="noopener"\r
        >AssemblyScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=assemblyscript" target="_parent" data-template="assemblyscript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="astro">\r
  <h3>Astro</h3>\r
  <div>Build faster websites with less client-side Javascript. (Still in Beta)</div>\r
  <ul>\r
    <li>\r
      <a href="https://astro.build/" target="_blank" rel="noopener">Astro official website</a>\r
    </li>\r
    <li>\r
      <a href="https://docs.astro.build/" target="_blank" rel="noopener">Astro documentation</a>\r
    </li>\r
    <li>\r
      <a href="?template=astro" target="_parent" data-template="astro">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="babel">\r
  <h3>Babel</h3>\r
  <div>The JavaScript compiler</div>\r
  <ul>\r
    <li><a href="https://babeljs.io/" target="_blank" rel="noopener">Official website</a></li>\r
    <li>\r
      <a href="https://babeljs.io/docs/" target="_blank" rel="noopener">Babel documentation</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="civet">\r
  <h3>Civet</h3>\r
  <div>\r
    Civet is a programming language that compiles to TypeScript or JavaScript, so you can use\r
    existing tooling but enable concise and powerful syntax.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://civet.dev/" target="_blank" rel="noopener">Civet official website</a>\r
    </li>\r
    <li>\r
      <a href="https://civet.dev/cheatsheet/" target="_blank" rel="noopener">Civet cheatsheet</a>\r
    </li>\r
    <li>\r
      <a href="?template=civet" target="_parent" data-template="civet">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="clio">\r
  <h3>Clio</h3>\r
  <div>\r
    Clio is a fast, distributed, functional programming language that compiles to JavaScript.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://clio-lang.org/" target="_blank" rel="noopener">Clio official website</a>\r
    </li>\r
    <li>\r
      <a href="https://docs.clio-lang.org/" target="_blank" rel="noopener">Clio documentation</a>\r
    </li>\r
    <li>\r
      <a href="?template=clio" target="_parent" data-template="clio">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="cpp">\r
  <h3>C++</h3>\r
  <div>C++ support using JSCPP (a simple C++ interpreter written in JavaScript).</div>\r
  <div>\r
    It is not a complete implementation of C++. Please refer to\r
    <a href="https://github.com/felixhao28/JSCPP" target="_blank" rel="noopener"\r
      >JSCPP documentation</a\r
    >\r
    for details.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://isocpp.org/" target="_blank" rel="noopener">Standard C++ Foundation</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/felixhao28/JSCPP" target="_blank" rel="noopener">JSCPP</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/c++/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=C++</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=cpp" target="_parent" data-template="cpp">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="clang">\r
  <h3>Clang compiler</h3>\r
  <div>\r
    Clang C/C++ compiler running on WASM, using\r
    <a href="https://github.com/binji/wasm-clang" target="_blank" rel="noopener">wasm-clang</a>\r
    adapted by\r
    <a href="https://github.com/chris-koch-penn/polylang.io" target="_blank" rel="noopener"\r
      >polylang.io</a\r
    >.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://isoclang.org/" target="_blank" rel="noopener">Standard C++ Foundation</a>\r
    </li>\r
    <li>\r
      <a href="https://clang.llvm.org/" target="_blank" rel="noopener">Clang official website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/c++/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=C++</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=clang" target="_parent" data-template="clang">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="clojurescript">\r
  <h3>ClojureScript (CLJS)</h3>\r
  <div>\r
    ClojureScript is a compiler for\r
    <a href="https://clojure.org/" target="_blank" rel="noopener">Clojure</a> that targets\r
    JavaScript. <br />In LiveCodes, it runs in the browser using\r
    <a href="https://github.com/squint-cljs/cherry" target="_blank" rel="noopener">Cherry</a>.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://clojurescript.org/" target="_blank" rel="noopener"\r
        >ClojureScript official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://clojure.org/" target="_blank" rel="noopener">Clojure official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/squint-cljs/cherry" target="_blank" rel="noopener">Cherry repo</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/clojure/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=clojure</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/clojurescript" target="_blank"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=clojurescript" target="_parent" data-template="clojurescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="coffeescript">\r
  <h3>CoffeeScript</h3>\r
  <div>Unfancy JavaScript.</div>\r
  <ul>\r
    <li>\r
      <a href="https://coffeescript.org/" target="_blank" rel="noopener"\r
        >CoffeeScript official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/coffeescript/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=coffeescript</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=coffeescript" target="_parent" data-template="coffeescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="commonlisp">\r
  <h3>Common Lisp</h3>\r
  <div>\r
    A Common Lisp implementation on Javascript using JSCL (a Lisp-to-Javascript compiler\r
    bootstrapped from Common Lisp).\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://common-lisp.net/" target="_blank" rel="noopener">Common-Lisp.net</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/jscl-project/jscl" target="_blank" rel="noopener">JSCL Project</a>\r
    </li>\r
    <li>\r
      <a href="https://common-lisp.net/documentation" target="_blank" rel="noopener"\r
        >Common Lisp Resources</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/common-lisp/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Common Lisp</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=commonlisp" target="_parent" data-template="commonlisp"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="diagrams">\r
  <h3>Diagrams</h3>\r
  <div class="description">(Experimental)</div>\r
  <div>Diagrams-as-code. Supports:</div>\r
  <ol style="margin-left: 1em">\r
    <li>\r
      <a href="https://js.cytoscape.org/" target="_blank" rel="noopener">Cytoscape</a>\r
    </li>\r
    <li>\r
      <a href="https://www.eclipse.org/elk/" target="_blank" rel="noopener">ELK</a>\r
      (using <a href="https://github.com/kieler/elkjs" target="_blank" rel="noopener">elkjs</a>)\r
    </li>\r
    <li>\r
      <a href="http://www.gnuplot.info/" target="_blank" rel="noopener">Gnuplot</a>\r
      (using\r
      <a href="https://github.com/chhu/gnuplot-JS" target="_blank" rel="noopener">gnuplot-JS</a>)\r
    </li>\r
    <li>\r
      <a href="https://graphviz.org/" target="_blank" rel="noopener">Graphviz</a>\r
      (using\r
      <a href="https://github.com/hpcc-systems/hpcc-js-wasm" target="_blank" rel="noopener"\r
        >@hpcc-js/wasm</a\r
      >)\r
    </li>\r
    <li>\r
      <a href="https://mermaid-js.github.io/mermaid/" target="_blank" rel="noopener">Mermaid</a>\r
    </li>\r
    <li>\r
      <a href="https://nomnoml.com/" target="_blank" rel="noopener">Nomnoml</a>\r
    </li>\r
    <li>\r
      <a href="https://pintorajs.vercel.app/" target="_blank" rel="noopener">Pintora</a>\r
    </li>\r
    <li>\r
      <a href="https://plotly.com/graphing-libraries/" target="_blank" rel="noopener">Plotly</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/ivanceras/svgbob" target="_blank" rel="noopener">Svgbob</a>\r
    </li>\r
    <li>\r
      <a href="https://vega.github.io/vega/" target="_blank" rel="noopener">Vega</a>\r
    </li>\r
    <li>\r
      <a href="https://vega.github.io/vega-lite/" target="_blank" rel="noopener">VegaLite</a>\r
    </li>\r
    <li>\r
      <a href="https://wavedrom.com/" target="_blank" rel="noopener">WaveDrom</a>\r
    </li>\r
  </ol>\r
  <ul>\r
    <li>\r
      <a href="?template=diagrams" target="_parent" data-template="diagrams"\r
        >Load starter template</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/diagrams" target="_blank" rel="noopener"\r
        >LiveCodes Documentation</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="dot">\r
  <h3>doT.js</h3>\r
  <div>The fastest + concise javascript template engine for Node.js and browsers.</div>\r
  <ul>\r
    <li>\r
      <a href="https://olado.github.io/doT/" target="_blank" rel="noopener">Official website</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="ejs">\r
  <h3>EJS</h3>\r
  <div>Embedded JavaScript templating.</div>\r
  <ul>\r
    <li><a href="https://ejs.co/" target="_blank" rel="noopener">Official website</a></li>\r
  </ul>\r
</section>\r
<section data-lang="eta">\r
  <h3>Eta</h3>\r
  <div>\r
    Embedded JS template engine for Node, Deno, and the browser. Lighweight, fast, and pluggable.\r
    Written in TypeScript.\r
  </div>\r
  <ul>\r
    <li><a href="https://eta.js.org/" target="_blank" rel="noopener">Official website</a></li>\r
    <li>\r
      <a href="https://eta.js.org/docs/learn" target="_blank" rel="noopener">Documentation</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="fennel">\r
  <h3>Fennel</h3>\r
  <div>\r
    Fennel is a programming language that brings together the speed, simplicity, and reach of Lua\r
    with the flexibility of a lisp syntax and macro system.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://fennel-lang.org/" target="_blank" rel="noopener">Fennel official website</a>\r
    </li>\r
    <li>\r
      <a href="https://fennel-lang.org/tutorial" target="_blank" rel="noopener"\r
        >Getting Started with Fennel</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=fennel" target="_parent" data-template="fennel">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="flow">\r
  <h3>Flow</h3>\r
  <div>Flow is a static type checker for JavaScript.</div>\r
  <ul>\r
    <li>\r
      <a href="https://flow.org/" target="_blank" rel="noopener">Flow official website</a>\r
    </li>\r
    <li>\r
      <a href="https://flow.org/en/docs/" target="_blank" rel="noopener">Flow documentation</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="go">\r
  <h3>Go</h3>\r
  <div>\r
    Go (Golang) is an open source programming language that makes it easy to build simple, reliable,\r
    and efficient software.\r
  </div>\r
  <div>Here, it is compiled to JavaScript using GopherJS.</div>\r
  <ul>\r
    <li><a href="https://golang.org/" target="_blank" rel="noopener">Go website</a></li>\r
    <li><a href="https://golang.org/doc/" target="_blank" rel="noopener">Go documentation</a></li>\r
    <li>\r
      <a href="https://github.com/gopherjs/gopherjs" target="_blank" rel="noopener"\r
        >GopherJS repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/go/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Go</a\r
      >\r
    </li>\r
    <li><a href="?template=go" target="_parent" data-template="go">Load starter template</a></li>\r
  </ul>\r
</section>\r
<section data-lang="gnuplot">\r
  <h3>Gnuplot</h3>\r
  <div>Gnuplot is a portable command-line driven graphing utility.</div>\r
  <div>Here, it is running in the browser using gnuplot-JS.</div>\r
  <ul>\r
    <li>\r
      <a href="http://www.gnuplot.info/" target="_blank" rel="noopener">Gnuplot official website</a>\r
    </li>\r
    <li>\r
      <a href="http://www.gnuplot.info/documentation.html" target="_blank" rel="noopener"\r
        >Gnuplot documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/chhu/gnuplot-JS" target="_blank" rel="noopener"\r
        >gnuplot-JS repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=gnuplot" target="_parent" data-template="gnuplot">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="haml">\r
  <h3>Haml</h3>\r
  <div>Haml compiler for client side javascript view templates using clientside-haml-js.</div>\r
  <ul>\r
    <li><a href="https://haml.info/" target="_blank" rel="noopener">Haml official website</a></li>\r
    <li>\r
      <a href="https://haml.info/docs.html" target="_blank" rel="noopener">Haml documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/uglyog/clientside-haml-js" target="_blank" rel="noopener"\r
        >clientside-haml-js GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/haml/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=haml</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="handlebars">\r
  <h3>Handlebars</h3>\r
  <div>Minimal templating on steroids.</div>\r
  <ul>\r
    <li><a href="https://handlebarsjs.com/" target="_blank" rel="noopener">Official website</a></li>\r
  </ul>\r
</section>\r
<section data-lang="imba">\r
  <h3>Imba</h3>\r
  <div>The friendly full-stack language.</div>\r
  <ul>\r
    <li><a href="https://imba.io/" target="_blank" rel="noopener">Official website</a></li>\r
  </ul>\r
</section>\r
<section data-lang="jsx">\r
  <h3>JSX</h3>\r
  <div>\r
    JSX is compiled to JavaScript in LiveCodes using the TypeScript Compiler. <br />\r
    By default it uses <code>React.createElement</code>\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://reactjs.org/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener"\r
        >React documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank" rel="noopener"\r
        >JSX in React documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=react" target="_parent" data-template="react">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="julia">\r
  <h3>Julia</h3>\r
  <div class="description">(Julia language support in LiveCodes is still experimental)</div>\r
  <div>\r
    Julia compiler and Julia Base running on WASM, using\r
    <a href="https://github.com/Keno/julia-wasm" target="_blank" rel="noopener">julia-wasm</a>\r
    adapted by\r
    <a href="https://github.com/chris-koch-penn/polylang.io" target="_blank" rel="noopener"\r
      >polylang.io</a\r
    >.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://julialang.org/" target="_blank" rel="noopener">Julia official website</a>\r
    </li>\r
    <li>\r
      <a href="https://docs.julialang.org/en/v1/" target="_blank" rel="noopener"\r
        >Julia documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/julia/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Julia</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=julia" target="_parent" data-template="julia">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="less">\r
  <h3>Less</h3>\r
  <div>It's CSS, with just a little more.</div>\r
  <ul>\r
    <li><a href="https://lesscss.org/" target="_blank" rel="noopener">Less official website</a></li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/less/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=less</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="liquid">\r
  <h3>LiquidJS</h3>\r
  <div>A simple, expressive and safe template engine.</div>\r
  <ul>\r
    <li>\r
      <a href="https://liquidjs.com" target="_blank" rel="noopener">LiquidJS official website</a>\r
    </li>\r
    <li>\r
      <a href="https://liquidjs.com/tutorials/intro-to-liquid.html" target="_blank" rel="noopener"\r
        >LiquidJS documentation</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="livescript">\r
  <h3>LiveScript</h3>\r
  <div>A language which compiles to JavaScript.</div>\r
  <ul>\r
    <li>\r
      <a href="https://livescript.net/" target="_blank" rel="noopener"\r
        >LiveScript official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/livescript/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=LiveScript</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=livescript" target="_parent" data-template="livescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="lua">\r
  <h3>Lua</h3>\r
  <div>Lua running in the browser using fengari-web.</div>\r
  <ul>\r
    <li><a href="https://www.lua.org/" target="_blank" rel="noopener">Lua official website</a></li>\r
    <li>\r
      <a href="https://www.lua.org/manual/5.4/manual.html" target="_blank" rel="noopener"\r
        >Lua documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://fengari.io/" target="_blank" rel="noopener">Fengari official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/fengari-lua/fengari-web" target="_blank" rel="noopener"\r
        >fengari-web GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/lua/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Lua</a\r
      >\r
    </li>\r
    <li><a href="?template=lua" target="_parent" data-template="lua">Load starter template</a></li>\r
  </ul>\r
</section>\r
<section data-lang="malina">\r
  <h3>Malina.js</h3>\r
  <div>Frontend compiler, inspired by Svelte.</div>\r
  <ul>\r
    <li>\r
      <a href="https://github.com/malinajs/malinajs" target="_blank" rel="noopener"\r
        >Malina.js repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://malinajs.github.io/docs/" target="_blank" rel="noopener"\r
        >Malina.js documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=malina" target="_parent" data-template="malina">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="markdown">\r
  <h3>Markdown</h3>\r
  <div>Markdown compiled to HTML using Marked.</div>\r
  <ul>\r
    <li>\r
      <a href="https://daringfireball.net/projects/markdown/" target="_blank" rel="noopener"\r
        >Markdown official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://marked.js.org/" target="_blank" rel="noopener">Marked documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/markdown/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=markdown</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=markdown" target="_parent" data-template="markdown"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="mdx">\r
  <h3>MDX</h3>\r
  <div>\r
    Markdown for the component era. <br />MDX lets you seamlessly write JSX in your Markdown\r
    documents.\r
  </div>\r
  <ul>\r
    <li><a href="https://mdxjs.com/" target="_blank" rel="noopener">MDX documentation</a></li>\r
    <li><a href="?template=mdx" target="_parent" data-template="mdx">Load starter template</a></li>\r
  </ul>\r
</section>\r
<section data-lang="mjml">\r
  <h3>MJML</h3>\r
  <div>MJML is a markup language designed to reduce the pain of coding a responsive email.</div>\r
  <ul>\r
    <li><a href="https://mjml.io/" target="_blank" rel="noopener">MJML official website</a></li>\r
    <li>\r
      <a href="https://documentation.mjml.io/" target="_blank" rel="noopener">MJML documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://mjml.io/templates" target="_blank" rel="noopener">MJML official templates</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="mustache">\r
  <h3>Mustache</h3>\r
  <div>Logic-less templates.</div>\r
  <ul>\r
    <li>\r
      <a href="https://mustache.github.io/" target="_blank" rel="noopener">Official website</a>\r
    </li>\r
    <li>\r
      <a href="https://mustache.github.io/mustache.5.html" target="_blank" rel="noopener"\r
        >mustache(5) manual</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/janl/mustache.js" target="_blank" rel="noopener"\r
        >JavaScript implementation</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="nunjucks">\r
  <h3>Nunjucks</h3>\r
  <div>\r
    A rich and powerful templating language for JavaScript. Nunjucks is essentially a port of\r
    <a href="http://jinja.pocoo.org/docs/" target="_blank" rel="noopener">jinja2</a>.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://mozilla.github.io/nunjucks/" target="_blank" rel="noopener"\r
        >Official website</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="twig">\r
  <h3>Twig</h3>\r
  <div>\r
    A JavaScript implementation of the\r
    <a href="https://twig.symfony.com/" target="_blank" rel="noopener">Twig</a>\r
    PHP templating language by\r
    <a href="https://github.com/twigjs/twig.js" target="_blank" rel="noopener">Twig.js</a> .\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://twig.symfony.com/" target="_blank" rel="noopener">Twig official website</a>\r
    </li>\r
    <li>\r
      <a href="https://twig.symfony.com/doc/3.x/" target="_blank" rel="noopener"\r
        >Twig Documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/twigjs/twig.js" target="_blank" rel="noopener">Twig.js Repo</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/twigjs/twig.js/wiki" target="_blank" rel="noopener"\r
        >Twig.js Documentation</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="ocaml">\r
  <h3>OCaml</h3>\r
  <div>\r
    OCaml is an industrial-strength programming language supporting functional, imperative and\r
    object-oriented styles.\r
  </div>\r
  <div>ReScript compiler is used here to compile OCaml to JavaScript.</div>\r
  <ul>\r
    <li><a href="https://ocaml.org/" target="_blank" rel="noopener">OCaml website</a></li>\r
    <li>\r
      <a href="https://ocaml.org/docs/" target="_blank" rel="noopener">OCaml documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/ocaml/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=OCaml</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=ocaml" target="_parent" data-template="ocaml">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="perl">\r
  <h3>Perl</h3>\r
  <div>Perl running in the browser using Perlito.</div>\r
  <ul>\r
    <li>\r
      <a href="https://www.perl.org/" target="_blank" rel="noopener">Perl official website</a>\r
    </li>\r
    <li>\r
      <a href="https://perldoc.perl.org/" target="_blank" rel="noopener">Perl documentation</a>\r
    </li>\r
    <li>\r
      <a\r
        href="https://github.com/fglock/Perlito/blob/master/README-perlito5.md"\r
        target="_blank"\r
        rel="noopener"\r
        >Perlito5 Readme</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/perl/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=perl</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=perl" target="_parent" data-template="perl">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="php">\r
  <h3>PHP</h3>\r
  <div>PHP running in the browser using Uniter.</div>\r
  <ul>\r
    <li><a href="https://www.php.net/" target="_blank" rel="noopener">PHP official website</a></li>\r
    <li>\r
      <a href="https://www.php.net/manual/en/" target="_blank" rel="noopener">PHP documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/asmblah/uniter" target="_blank" rel="noopener"\r
        >Uniter GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/php/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=PHP</a\r
      >\r
    </li>\r
    <li><a href="?template=php" target="_parent" data-template="php">Load starter template</a></li>\r
  </ul>\r
</section>\r
<section data-lang="prolog">\r
  <h3>Tau Prolog</h3>\r
  <div>An open source Prolog interpreter in JavaScript.</div>\r
  <ul>\r
    <li>\r
      <a href="http://tau-prolog.org/" target="_blank" rel="noopener"\r
        >Tau Prolog official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="http://tau-prolog.org/documentation" target="_blank" rel="noopener"\r
        >Tau Prolog documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.swi-prolog.org/" target="_blank" rel="noopener">SWI-Prolog</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/prolog/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Prolog</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=prolog" target="_parent" data-template="prolog">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="pug">\r
  <h3>Pug</h3>\r
  <div>Robust, elegant, feature rich template engine.</div>\r
  <ul>\r
    <li>\r
      <a href="https://pugjs.org/api/getting-started.html" target="_blank" rel="noopener"\r
        >Pug documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/pug/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Pug</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="pyodide">\r
  <h3>Python</h3>\r
  <div>Python with the scientific stack, compiled to WebAssembly using Pyodide.</div>\r
  <div class="description">\r
    Pyodide allows using Python scientific stack including NumPy, Pandas, Matplotlib, SciPy,\r
    scikit-learn and many more. In addition it\u2019s possible to install pure Python wheels from PyPi.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://www.python.org/" target="_blank" rel="noopener">Python official website</a>\r
    </li>\r
    <li>\r
      <a href="https://www.python.org/doc/" target="_blank" rel="noopener">Python documentation</a>\r
    </li>\r
    <li><a href="https://pyodide.org/" target="_blank" rel="noopener">Pyodide documentation</a></li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/python/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Python</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=pyodide" target="_parent" data-template="pyodide">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="python">\r
  <h3>Python</h3>\r
  <div>Python running in the browser using Brython.</div>\r
  <ul>\r
    <li>\r
      <a href="https://www.python.org/" target="_blank" rel="noopener">Python official website</a>\r
    </li>\r
    <li>\r
      <a href="https://www.python.org/doc/" target="_blank" rel="noopener">Python documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://brython.info/" target="_blank" rel="noopener">Brython documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/python/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Python</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=python" target="_parent" data-template="python">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="r">\r
  <h3>R</h3>\r
  <div class="description">(R language support in LiveCodes is still experimental)</div>\r
  <div>R running in the browser using WebR.</div>\r
  <ul>\r
    <li>\r
      <a href="https://www.r-project.org/" target="_blank" rel="noopener"\r
        >R project official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://cran.r-project.org/manuals.html" target="_blank" rel="noopener"\r
        >The R Manuals</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://r4ds.hadley.nz/" target="_blank" rel="noopener">R for Data Science (2e)</a>\r
    </li>\r
    <li>\r
      <a href="https://docs.r-wasm.org/webr/latest/" target="_blank" rel="noopener"\r
        >WebR documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/r/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=R</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=r" target="_parent" data-template="r">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="react-native-tsx">\r
  <h3>React Native for Web (with TypeScript)</h3>\r
  <div>\r
    React Native for Web is an accessible implementation of React Native's Components and APIs that\r
    is interoperable with React DOM.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://reactjs.org/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://reactnative.dev/" target="_blank" rel="noopener">React Native website</a>\r
    </li>\r
    <li>\r
      <a href="https://necolas.github.io/react-native-web/" target="_blank" rel="noopener"\r
        >React Native for Web website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://reactnative.dev/docs/getting-started" target="_blank" rel="noopener"\r
        >React Native documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener"\r
        >TypeScript website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >TypeScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=react-native" target="_parent" data-template="react-native"\r
        >Load starter template (JSX)</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="react-native">\r
  <h3>React Native for Web</h3>\r
  <div>\r
    React Native for Web is an accessible implementation of React Native's Components and APIs that\r
    is interoperable with React DOM.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://reactjs.org/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://reactnative.dev/" target="_blank" rel="noopener">React Native website</a>\r
    </li>\r
    <li>\r
      <a href="https://necolas.github.io/react-native-web/" target="_blank" rel="noopener"\r
        >React Native for Web website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://reactnative.dev/docs/getting-started" target="_blank" rel="noopener"\r
        >React Native documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=react-native" target="_parent" data-template="react-native"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="reason">\r
  <h3>Reason</h3>\r
  <div>\r
    Reason lets you write simple, fast and quality type safe code while leveraging both the\r
    JavaScript & OCaml ecosystems.\r
  </div>\r
  <div>ReScript compiler is used here to compile Reason to JavaScript.</div>\r
  <ul>\r
    <li><a href="https://reasonml.github.io/" target="_blank" rel="noopener">Reason website</a></li>\r
    <li>\r
      <a href="https://reasonml.github.io/docs/en/what-and-why" target="_blank" rel="noopener"\r
        >Reason documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://reasonml.github.io/reason-react/en/" target="_blank" rel="noopener"\r
        >ReasonReact</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/reason/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=reason</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=reason" target="_parent" data-template="reason">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="rescript">\r
  <h3>ReScript</h3>\r
  <div>\r
    ReScript is a robustly typed language that compiles to efficient and human-readable JavaScript.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a>\r
    </li>\r
    <li>\r
      <a\r
        href="https://rescript-lang.org/docs/react/latest/introduction"\r
        target="_blank"\r
        rel="noopener"\r
        >ReScript / React</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=rescript" target="_parent" data-template="rescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="richtext">\r
  <h3>Rich Text Editor</h3>\r
  <div>Using Quill:</div>\r
  <div>Your powerful rich text editor.</div>\r
  <ul>\r
    <li>\r
      <a href="https://quilljs.com/" target="_blank" rel="noopener">Quill official website</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="riot">\r
  <h3>Riot.js</h3>\r
  <div>Simple and elegant component-based UI library.</div>\r
  <ul>\r
    <li>\r
      <a href="https://riot.js.org/" target="_blank" rel="noopener">Riot.js official website</a>\r
    </li>\r
    <li>\r
      <a href="https://riot.js.org/documentation/" target="_blank" rel="noopener"\r
        >Riot.js documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=riot" target="_parent" data-template="riot">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="ruby">\r
  <h3>Ruby</h3>\r
  <div>Ruby running in the browser using Opal.</div>\r
  <ul>\r
    <li>\r
      <a href="https://www.ruby-lang.org/en/" target="_blank" rel="noopener"\r
        >Ruby official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.ruby-lang.org/en/documentation/" target="_blank" rel="noopener"\r
        >Ruby documentation</a\r
      >\r
    </li>\r
    <li><a href="https://opalrb.com/" target="_blank" rel="noopener">Opal official website</a></li>\r
    <li>\r
      <a href="https://cdn.opalrb.com/opal/1.0.0/index.html" target="_blank" rel="noopener"\r
        >Opal standard library CDN</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/ruby/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=ruby</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=ruby" target="_parent" data-template="ruby">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="sass">\r
  <h3>Sass</h3>\r
  <div>Syntactically Awesome Style Sheets.</div>\r
  <ul>\r
    <li>\r
      <a href="https://sass-lang.com/" target="_blank" rel="noopener">Sass official website</a>\r
    </li>\r
    <li>\r
      <a href="https://sass-lang.com/documentation" target="_blank" rel="noopener"\r
        >Sass documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://sass-lang.com/documentation/syntax#the-indented-syntax"\r
        target="_blank"\r
        rel="noopener"\r
        >Sass (the indented) syntax</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/sass/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=sass</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="scheme">\r
  <h3>Scheme</h3>\r
  <div>Scheme running in the browser using biwascheme.</div>\r
  <ul>\r
    <li>\r
      <a href="https://www.scheme.com/tspl4/" target="_blank" rel="noopener"\r
        >The Scheme Programming Language</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.biwascheme.org/" target="_blank" rel="noopener"\r
        >BiwaScheme official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.biwascheme.org/doc/reference.html" target="_blank" rel="noopener"\r
        >BiwaScheme reference</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=scheme" target="_parent" data-template="scheme">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="scss">\r
  <h3>SCSS</h3>\r
  <div>Syntactically Awesome Style Sheets.</div>\r
  <ul>\r
    <li>\r
      <a href="https://sass-lang.com/" target="_blank" rel="noopener">Sass official website</a>\r
    </li>\r
    <li>\r
      <a href="https://sass-lang.com/documentation" target="_blank" rel="noopener"\r
        >Sass documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://sass-lang.com/documentation/syntax#scss" target="_blank" rel="noopener"\r
        >SCSS syntax</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/sass/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=sass</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="solid.tsx">\r
  <h3>Solid (with TypeScript)</h3>\r
  <div>A declarative, efficient and flexible JavaScript library for building user interfaces.</div>\r
  <ul>\r
    <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener">Official website</a></li>\r
    <li>\r
      <a href="https://www.solidjs.com/docs" target="_blank" rel="noopener">Solid documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener"\r
        >TypeScript website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >TypeScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=solid" target="_parent" data-template="solid"\r
        >Load starter template (JSX)</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="solid">\r
  <h3>Solid</h3>\r
  <div>A declarative, efficient and flexible JavaScript library for building user interfaces.</div>\r
  <ul>\r
    <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener">Official website</a></li>\r
    <li><a href="https://www.solidjs.com/docs" target="_blank" rel="noopener">Documentation</a></li>\r
    <li>\r
      <a href="?template=solid" target="_parent" data-template="solid">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="sql">\r
  <h3>SQLite</h3>\r
  <div>SQLite compiled to JavaScript using SQL.js</div>\r
  <ul>\r
    <li>\r
      <a href="https://www.sqlite.org/" target="_blank" rel="noopener">SQLite official website</a>\r
    </li>\r
    <li>\r
      <a href="https://www.sqlite.org/lang.html" target="_blank" rel="noopener"\r
        >SQLite syntax documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://sql.js.org/" target="_blank" rel="noopener">SQL.js official website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/sql/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=SQL</a\r
      >\r
    </li>\r
    <li><a href="?template=sql" target="_parent" data-template="sql">Load starter template</a></li>\r
  </ul>\r
</section>\r
<section data-lang="stencil">\r
  <h3>Stencil</h3>\r
  <div>A Compiler for Web Components and High Performance Web Apps.</div>\r
  <ul>\r
    <li>\r
      <a href="https://stenciljs.com/" target="_blank" rel="noopener">Stencil official website</a>\r
    </li>\r
    <li>\r
      <a href="https://stenciljs.com/docs/introduction" target="_blank" rel="noopener"\r
        >Stencil documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=stencil" target="_parent" data-template="stencil">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="stylis">\r
  <h3>Stylis</h3>\r
  <div>Light-weight css preprocessor.</div>\r
  <ul>\r
    <li>\r
      <a href="https://stylis.js.org/" target="_blank" rel="noopener">Stylis official website</a>\r
    </li>\r
  </ul>\r
  <ul>\r
    <li>\r
      <a href="https://github.com/thysultan/stylis" target="_blank" rel="noopener"\r
        >Stylis GitHub repo</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="stylus">\r
  <h3>Stylus</h3>\r
  <div>Expressive, Dynamic, Robust CSS.</div>\r
  <ul>\r
    <li>\r
      <a href="https://stylus-lang.com/" target="_blank" rel="noopener">Stylus official website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/stylus/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=stylus</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="sucrase">\r
  <h3>Sucrase</h3>\r
  <div>Super-fast alternative to Babel for when you can target modern JS runtimes.</div>\r
  <ul>\r
    <li>\r
      <a href="https://sucrase.io/" target="_blank" rel="noopener">Sucrase official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/alangpierce/sucrase" target="_blank" rel="noopener"\r
        >Sucrase GitHub Repo</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="svelte">\r
  <h3>Svelte</h3>\r
  <div>Cybernetically enhanced web apps.</div>\r
  <ul>\r
    <li>\r
      <a href="https://svelte.dev/" target="_blank" rel="noopener">Svelte official website</a>\r
    </li>\r
    <li>\r
      <a href="https://svelte.dev/docs" target="_blank" rel="noopener">Svelte documentation</a>\r
    </li>\r
    <li>\r
      <a href="?template=svelte" target="_parent" data-template="svelte">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="tcl">\r
  <h3>Tcl (Tool Command Language)</h3>\r
  <div>\r
    Tcl running in the browser, using\r
    <a href="https://github.com/ecky-l/wacl/" target="_blank" rel="noopener">wacl</a>.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://www.tcl.tk/" target="_blank" rel="noopener">Tcl official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/ecky-l/wacl/" target="_blank" rel="noopener">wacl repo</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/tcl/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Tcl</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=tcl" target="_parent" data-template="tcl">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="teal">\r
  <h3>Teal</h3>\r
  <div>A typed dialect of Lua.</div>\r
  <ul>\r
    <li>\r
      <a href="https://github.com/teal-language/tl" target="_blank" rel="noopener"\r
        >Teal GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/teal-language/tl/tree/master/docs" target="_blank" rel="noopener"\r
        >Teal docs</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://github.com/teal-language/tl/blob/master/docs/tutorial.md"\r
        target="_blank"\r
        rel="noopener"\r
        >Teal tutorial</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=teal" target="_parent" data-template="teal">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="tsx">\r
  <h3>TSX</h3>\r
  <div>\r
    TypeScript in JSX. TSX is compiled to JavaScript in LiveCodes using the TypeScript Compiler.<br />\r
    By default it uses <code>React.createElement</code>\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://reactjs.org/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener"\r
        >React documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank" rel="noopener"\r
        >JSX in React documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >Typescript documentation</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="typescript">\r
  <h3>TypeScript</h3>\r
  <div>A Typed Superset of JavaScript.</div>\r
  <ul>\r
    <li>\r
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">Official website</a>\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >TypeScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/typescript/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=TypeScript</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=typescript" target="_parent" data-template="typescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="vue">\r
  <h3>Vue3 Single File Components</h3>\r
  <div>Loaded using vue3-sfc-loader.</div>\r
  <ul>\r
    <li>\r
      <a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue.js v3 official website</a>\r
    </li>\r
    <li>\r
      <a href="https://v3.vuejs.org/guide/introduction.html" target="_blank" rel="noopener"\r
        >Vue3 documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://v3.vuejs.org/guide/single-file-component.html" target="_blank" rel="noopener"\r
        >Vue3 single file components</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/FranckFreiburger/vue3-sfc-loader" target="_blank" rel="noopener"\r
        >vue3-sfc-loader GitHub repo</a\r
      >\r
    </li>\r
    <li><a href="?template=vue" target="_parent" data-template="vue">Load starter template</a></li>\r
  </ul>\r
</section>\r
<section data-lang="vue2">\r
  <h3>Vue2 Single File Components</h3>\r
  <div>Loaded using vue3-sfc-loader.</div>\r
  <ul>\r
    <li><a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js official website</a></li>\r
    <li>\r
      <a href="https://vuejs.org/v2/guide/" target="_blank" rel="noopener">Vue2 documentation</a>\r
    </li>\r
    <li>\r
      <a\r
        href="https://vuejs.org/v2/guide/single-file-components.html"\r
        target="_blank"\r
        rel="noopener"\r
        >Vue2 single file components</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/FranckFreiburger/vue3-sfc-loader" target="_blank" rel="noopener"\r
        >vue3-sfc-loader GitHub repo</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="wat">\r
  <h3>WebAssembly Text Format</h3>\r
  <div>Low-level textual representation of the WebAssembly (wasm) binary format.</div>\r
  <div>It is converted to wasm using wabt.js.</div>\r
  <ul>\r
    <li><a href="https://webassembly.org/" target="_blank" rel="noopener">WebAssembly.org</a></li>\r
    <li>\r
      <a\r
        href="https://webassembly.github.io/spec/core/text/index.html"\r
        target="_blank"\r
        rel="noopener"\r
        >WebAssembly Text Specs</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://developer.mozilla.org/en-US/docs/WebAssembly" target="_blank" rel="noopener"\r
        >WebAssembly on MDN</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format"\r
        target="_blank"\r
        rel="noopener"\r
        >Understanding WebAssembly text format</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/AssemblyScript/wabt.js" target="_blank" rel="noopener"\r
        >wabt.js documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/wasm/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=WebAssembly</a\r
      >\r
    </li>\r
    <li><a href="?template=wat" target="_parent" data-template="wat">Load starter template</a></li>\r
  </ul>\r
</section>\r
<section data-lang="blockly">\r
  <h3>Blockly</h3>\r
  <div>A JavaScript library for building visual programming editors.</div>\r
  <ul>\r
    <li>\r
      <a href="https://developers.google.com/blockly" target="_blank" rel="noopener"\r
        >Official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://developers.google.com/blockly/guides/overview" target="_blank" rel="noopener"\r
        >Guides</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://developers.google.com/blockly/reference/overview"\r
        target="_blank"\r
        rel="noopener"\r
        >Reference</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://google.github.io/blockly-samples/" target="_blank" rel="noopener">Samples</a>\r
    </li>\r
    <li>\r
      <a href="?template=blockly" target="_parent" data-template="blockly">Load starter template</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="style-processors">\r
  <h3>CSS Utilities and Processors</h3>\r
  <ul>\r
    <li>\r
      <a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a>\r
    </li>\r
    <li>\r
      <a href="https://windicss.org/" target="_blank" rel="noopener">Windi CSS</a>\r
    </li>\r
    <li>\r
      <a href="https://uno.antfu.me/" target="_blank" rel="noopener">UnoCSS</a>\r
    </li>\r
    <li>\r
      <a href="https://lightningcss.dev/" target="_blank" rel="noopener">Lightning CSS</a>\r
    </li>\r
    <li>\r
      <a href="https://postcss.org/" target="_blank" rel="noopener">PostCSS</a>\r
      Plugins:\r
      <ul>\r
        <li>\r
          <a href="https://github.com/postcss/autoprefixer" target="_blank" rel="noopener"\r
            >Autoprefixer</a\r
          >\r
        </li>\r
        <li>\r
          <a href="https://preset-env.cssdb.org/" target="_blank" rel="noopener"\r
            >postcss-preset-env</a\r
          >\r
        </li>\r
        <li>\r
          <a href="https://github.com/unlight/postcss-import-url" target="_blank" rel="noopener"\r
            >postcss-import-url</a\r
          >\r
        </li>\r
        <li>\r
          <a href="https://github.com/madyankin/postcss-modules" target="_blank" rel="noopener"\r
            >postcss-modules</a\r
          >\r
        </li>\r
      </ul>\r
    </li>\r
  </ul>\r
</section>\r
`;var oe=`<div id="custom-settings-container" class="modal-container">
  <div class="modal-title">Custom Settings</div>
  <div id="custom-settings-screen-container" class="modal-screen-container">
    <div class="modal-screen">
      <label>Custom Settings JSON</label>
      <div id="custom-settings-editor" class="editor custom-editor"></div>
      <button id="custom-settings-load-btn" class="wide-button">Load</button>
    </div>
    <!-- TODO: add link to documentations -->
    <!-- <div class="description">See documentations for details.</div> -->
  </div>
</div>
`;var ne=`<div id="test-editor-container" class="modal-container">
  <div class="modal-title">Edit Tests</div>
  <div id="test-editor-screen-container" class="modal-screen-container">
    <div class="modal-screen">
      <label>Tests</label>
      <div id="test-editor" class="editor custom-editor"></div>
      <button id="test-load-btn" class="wide-button">Load</button>
    </div>
    <!-- TODO: add link to documentations -->
    <!-- <div class="description">See documentations for details.</div> -->
  </div>
</div>
`;var re=`<div id="import-container" class="modal-container">
  <div class="modal-title">Import</div>
  <ul id="import-tabs" class="modal-tabs">
    <li data-target="import-code" class="active">Import Code</li>
    <li data-target="import-json">Import Project JSON</li>
    <li data-target="bulk-import-json">Bulk Import</li>
  </ul>
  <div id="import-screens" class="modal-screen-container">
    <div id="import-code" class="tab-content active">
      <div class="modal-screen">
        <form id="url-import-form">
          <label for="code-url">URL</label>
          <input type="text" id="code-url" placeholder="https://" />
          <button id="url-import-btn" class="wide-button" type="submit">Import from URL</button>
        </form>
        <form id="local-code-import-form">
          <label for="local-code-input">Local file</label>
          <label for="local-code-input" class="file-input-label">Import local files</label>
          <input type="file" id="local-code-input" class="file-input" multiple />
        </form>
        <div class="description">
          Supported Sources:
          <ul>
            <li>GitHub gist</li>
            <li>GitHub file</li>
            <li>Directory in a GitHub repo</li>
            <li>Gitlab snippet</li>
            <li>Gitlab file</li>
            <li>Directory in a Gitlab repo</li>
            <li>JS Bin</li>
            <li>Raw code</li>
            <li>Code in web page DOM</li>
            <li>Code in zip file</li>
          </ul>
          Please visit the
          <a href="{{DOCS_BASE_URL}}features/import" target="_blank" rel="noopener"
            >documentations</a
          >
          for details.
        </div>
      </div>
    </div>
    <div id="import-json" class="tab-content">
      <div class="modal-screen">
        <div class="description">
          Import a single project JSON to editor. A project can be exported from
          settings&nbsp;menu&nbsp;>> Export&nbsp;>> Export&nbsp;Project&nbsp;(JSON).
        </div>
        <form id="json-url-import-form">
          <label for="json-url">URL</label>
          <input type="text" id="json-url" placeholder="https://" />
          <button id="json-url-import-btn" class="wide-button" type="submit">
            Import project from URL
          </button>
        </form>
        <form id="file-url-import-form">
          <label for="file-input">Local file</label>
          <label for="file-input" class="file-input-label">Import project from local file</label>
          <input type="file" id="file-input" class="file-input" accept="application/json" />
        </form>
      </div>
    </div>
    <div id="bulk-import-json" class="tab-content">
      <div class="modal-screen">
        <div class="description">
          Bulk import multiple projects to your saved projects. Projects can be exported from the
          <a href="#" id="link-to-saved-projects">Saved Projects</a> screen.
        </div>
        <form id="bulk-json-url-import-form">
          <label for="bulk-json-url">URL</label>
          <input type="text" id="bulk-json-url" placeholder="https://" />
          <button id="bulk-json-url-import-btn" class="wide-button" type="submit">
            Bulk import from URL
          </button>
        </form>
        <form id="bulk-file-url-import-form">
          <label for="bulk-file-input">Local file</label>
          <label for="bulk-file-input" class="file-input-label">Bulk import from local file</label>
          <input type="file" id="bulk-file-input" class="file-input" accept="application/json" />
        </form>
      </div>
    </div>
  </div>
</div>
`;var se=`<div id="deploy-container" class="modal-container">
  <div class="modal-title">Deploy to GitHub Pages</div>
  <ul id="deploy-tabs" class="modal-tabs">
    <li data-target="new-repo" class="active">Create New Repo</li>
    <li data-target="existing-repo">Existing Repo</li>
  </ul>
  <div id="deploy-screens" class="modal-screen-container">
    <div id="new-repo" class="tab-content active">
      <div class="modal-screen">
        <form id="new-repo-form">
          <div>
            <label for="new-repo-name"
              >Repo Name <span id="new-repo-name-error" class="error"></span
            ></label>
            <input type="text" id="new-repo-name" placeholder="Required" />
          </div>
          <div>
            <label for="new-repo-message">Commit Message</label>
            <input type="text" id="new-repo-message" placeholder="Optional" />
          </div>
          <div class="padded">
            <input type="checkbox" id="new-repo-source" />
            <label for="new-repo-source">Commit source code (public)</label>
          </div>
          <button id="new-repo-btn" class="wide-button" type="submit">Deploy</button>
        </form>
        <div class="description">
          A new <strong>public</strong> repo will be created. The result page will be pushed to
          <span class="code">gh-pages</span> branch.
        </div>
      </div>
    </div>
    <div id="existing-repo" class="tab-content">
      <div class="modal-screen">
        <form id="existing-repo-form">
          <div>
            <label for="existing-repo-name">Repo Name</label>
            <input
              type="text"
              id="existing-repo-name"
              autocomplete="off"
              placeholder="Loading..."
            />
          </div>
          <div>
            <label for="existing-repo-message">Commit Message</label>
            <input type="text" id="existing-repo-message" placeholder="Optional" />
          </div>
          <div class="padded">
            <input type="checkbox" id="existing-repo-source" />
            <label for="existing-repo-source">Commit source code (public)</label>
          </div>
          <button id="existing-repo-btn" class="wide-button" type="submit">Deploy</button>
        </form>
        <div class="description">
          A new commit will be added to <span class="code">gh-pages</span> branch.
        </div>
      </div>
    </div>
  </div>
</div>
`;var ie=`<div id="sync-container" class="modal-container">
  <div class="modal-title">Sync to GitHub Repo</div>
  <div id="sync-status" class="modal-status"></div>
  <ul id="sync-tabs" class="modal-tabs">
    <li data-target="new-repo" class="active">Create New Repo</li>
    <li data-target="existing-repo">Existing Repo</li>
  </ul>
  <div id="sync-screens" class="modal-screen-container">
    <div id="new-repo" class="tab-content active">
      <div class="modal-screen">
        <form id="new-repo-form">
          <div>
            <label for="new-repo-name"
              >Repo Name <span id="new-repo-name-error" class="error"></span
            ></label>
            <input type="text" id="new-repo-name" placeholder="Required" />
          </div>
          <div class="padded">
            <input type="checkbox" id="new-repo-autosync" checked />
            <label for="new-repo-autosync">Auto sync</label>
          </div>
          <button id="new-repo-btn" class="wide-button start-sync-btn" type="submit">Sync</button>
        </form>
        <div class="description">
          A new <strong>private</strong> repo will be created. Your LiveCodes local data will be
          synchronized with <span class="code">main</span> branch.
        </div>
      </div>
    </div>
    <div id="existing-repo" class="tab-content">
      <div class="modal-screen">
        <form id="existing-repo-form">
          <div>
            <label for="existing-repo-name">Repo Name</label>
            <input
              type="text"
              id="existing-repo-name"
              autocomplete="off"
              placeholder="Loading..."
            />
          </div>
          <div class="padded">
            <input type="checkbox" id="existing-repo-autosync" checked />
            <label for="existing-repo-autosync">Auto sync</label>
          </div>
          <button id="existing-repo-btn" class="wide-button start-sync-btn" type="submit">
            sync
          </button>
        </form>
        <div class="description">
          Your LiveCodes local data will be synchronized with
          <span class="code">main</span> branch.
        </div>
      </div>
    </div>
  </div>
</div>
`;var le=`<div id="backup-container" class="modal-container">
  <div class="modal-title">Backup / Restore</div>
  <ul id="backup-tabs" class="modal-tabs">
    <li data-target="backup" class="active">Backup</li>
    <li data-target="restore">Restore</li>
  </ul>
  <div id="backup-screens" class="modal-screen-container">
    <div id="backup" class="tab-content active">
      <div class="modal-screen">
        <div class="description">
          Backup LiveCodes data, so that it can be later restored on this or other devices. <br />
          Please visit the
          <a href="{{DOCS_BASE_URL}}features/backup-restore" target="_blank" rel="noopener"
            >documentations</a
          >
          for details.
        </div>
        <form id="backup-form">
          <div id="backup-stores">
            <div class="backup-store">
              <input type="checkbox" id="backup-projects-checkbox" data-store="projects" checked />
              <label for="backup-projects-checkbox">Projects</label>
            </div>
            <div class="backup-store">
              <input
                type="checkbox"
                id="backup-templates-checkbox"
                data-store="templates"
                checked
              />
              <label for="backup-templates-checkbox">User Templates</label>
            </div>
            <div class="backup-store">
              <input type="checkbox" id="backup-snippets-checkbox" data-store="snippets" checked />
              <label for="backup-snippets-checkbox">Code Snippets</label>
            </div>
            <div class="backup-store">
              <input type="checkbox" id="backup-assets-checkbox" data-store="assets" checked />
              <label for="backup-assets-checkbox">Assets</label>
            </div>
            <div class="backup-store">
              <input
                type="checkbox"
                id="backup-user-settings-checkbox"
                data-store="userConfig"
                checked
              />
              <label for="backup-user-settings-checkbox">User Settings</label>
            </div>
          </div>
          <button id="backup-btn" class="wide-button" type="submit">Backup</button>
        </form>
      </div>
    </div>
    <div id="restore" class="tab-content">
      <div class="modal-screen">
        <div class="description">
          Restore previously backed-up LiveCodes data. <br />
          If you choose to replace current content, you may want to back it up first. <br />
          Please visit the
          <a href="{{DOCS_BASE_URL}}features/backup-restore" target="_blank" rel="noopener"
            >documentations</a
          >
          for details.
        </div>
        <form id="restore-form">
          <div class="input-container">
            <span>
              <input
                type="radio"
                name="restore-mode"
                id="restore-mode-replace"
                value="replace"
                checked
              />
              <label class="radio-label" for="restore-mode-replace">Replace current content</label>
            </span>
            <span>
              <input type="radio" name="restore-mode" id="restore-mode-merge" value="merge" />
              <label class="radio-label" for="restore-mode-merge">Merge with current content</label>
            </span>
          </div>

          <label for="file-input" class="file-input-label">Restore from file</label>
          <input
            type="file"
            id="file-input"
            class="file-input"
            accept=".zip,zip,application/zip,application/x-zip,application/x-zip-compressed"
          />
        </form>
      </div>
    </div>
  </div>
</div>
`;var ce=`<div id="broadcast-container" class="modal-container">
  <div class="modal-title">Broadcast</div>
  <div id="broadcast-status" class="modal-status"></div>
  <div id="broadcast-screen-container" class="modal-screen-container">
    <div class="modal-screen">
      <div class="description">
        Broadcast the result page to other browsers/devices in real time. Please visit the
        <a href="{{DOCS_BASE_URL}}features/broadcast" target="_blank" rel="noopener"
          >documentations</a
        >
        for details.
      </div>
      <form id="broadcast-form">
        <div>
          <label for="broadcast-server-url">Server URL</label>
          <input type="text" id="broadcast-server-url" placeholder="Required" />
        </div>
        <div class="padded">
          <input type="checkbox" id="broadcast-source" />
          <label for="broadcast-source">Include source code</label>
        </div>
        <button id="broadcast-btn" class="wide-button" type="submit">Broadcast</button>
        <div id="broadcast-channel-url-section">
          <label>Channel URL</label>
          <a id="broadcast-channel-url" href="#" target="_blank"></a>
        </div>
      </form>
    </div>
  </div>
</div>
`;var de=`<div id="welcome-container" class="modal-container">\r
  <div class="modal-title">Welcome</div>\r
  <div id="welcome-screen-container" class="modal-screen-container">\r
    <div class="modal-screen">\r
      <div class="modal-section">\r
        <h3>Start</h3>\r
        <ul>\r
          <li>\r
            <img src="{{baseUrl}}assets/icons/new.svg" alt="new" width="19.19" height="19.19" />\r
            <a href="#" id="welcome-link-new"> New...</a>\r
          </li>\r
          <li>\r
            <img src="{{baseUrl}}assets/icons/open.svg" alt="open" width="19.19" height="19.19" />\r
            <a href="#" id="welcome-link-open"> Open...</a>\r
          </li>\r
          <li>\r
            <img\r
              src="{{baseUrl}}assets/icons/import.svg"\r
              alt="import"\r
              width="19.19"\r
              height="19.19"\r
            />\r
            <a href="#" id="welcome-link-import"> Import...</a>\r
          </li>\r
          <li class="default-template-li">\r
            <img\r
              src="{{baseUrl}}assets/icons/template.svg"\r
              alt="template"\r
              width="19.19"\r
              height="19.19"\r
            />\r
            <span id="no-default-template" class="default-template">No default template</span>\r
            <a href="#" id="welcome-link-load-default" class="default-template"\r
              >Load default template</a\r
            >\r
            <a\r
              href="{{DOCS_BASE_URL}}features/default-template-language"\r
              target="_blank"\r
              class="help-link"\r
              title="Click for info..."\r
              ><img src="{{baseUrl}}assets/icons/info.svg" alt="info"\r
            /></a>\r
          </li>\r
        </ul>\r
      </div>\r
\r
      <div class="modal-section" id="welcome-recent">\r
        <h3>Recent</h3>\r
        <ul id="welcome-recent-list">\r
          <li><a href="#" id="welcome-link-recent-open" class="more">More...</a></li>\r
        </ul>\r
      </div>\r
\r
      <div class="modal-section" id="welcome-templates">\r
        <h3>Starter Templates</h3>\r
        <ul id="welcome-template-list">\r
          <li><a href="#" id="welcome-link-templates" class="more">More...</a></li>\r
        </ul>\r
      </div>\r
\r
      <div class="modal-section" id="welcome-recover">\r
        <h3>Recover</h3>\r
        <div class="smaller">Your last project had unsaved changes:</div>\r
        <ul>\r
          <li class="overflow-ellipsis">\r
            <span id="unsaved-project-name" class="overflow-ellipsis"></span>\r
          </li>\r
          <li class="smaller">Last modified: <span id="unsaved-project-last-modified"></span></li>\r
        </ul>\r
        <div class="welcome-recover-actions">\r
          <div>\r
            <img src="{{baseUrl}}assets/icons/recover.svg" alt="recover" />\r
            <a href="#" id="prompt-recover-btn" title="Recover project to editor">Recover</a>\r
          </div>\r
          <div>\r
            <img src="{{baseUrl}}assets/icons/save.svg" alt="save" />\r
            <a href="#" id="prompt-save-previous-btn" title="Save to device and continue">Save</a>\r
          </div>\r
          <div>\r
            <img src="{{baseUrl}}assets/icons/cancel.svg" alt="cancel" />\r
            <a href="#" id="prompt-cancel-recover-btn">Cancel</a>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="modal-section">\r
        <h3>About LiveCodes</h3>\r
        <ul>\r
          <li><a href="{{DOCS_BASE_URL}}" target="_blank">Home</a></li>\r
          <li><a href="{{DOCS_BASE_URL}}getting-started" target="_blank">Getting Started</a></li>\r
          <li><a href="{{DOCS_BASE_URL}}features" target="_blank">Features</a></li>\r
          <li><a href="{{DOCS_BASE_URL}}configuration" target="_blank">Configuration</a></li>\r
          <li><a href="{{DOCS_BASE_URL}}sdk" target="_blank">SDK</a></li>\r
          <li><a href="https://blog.livecodes.io" target="_blank">Blog</a></li>\r
          <li><a href="{{DOCS_BASE_URL}}sponsor" target="_blank">Sponsor LiveCodes</a></li>\r
          <li><a href="{{DOCS_BASE_URL}}overview" target="_blank" class="more">More...</a></li>\r
        </ul>\r
      </div>\r
    </div>\r
  </div>\r
  <div id="show-welcome">\r
    <input type="checkbox" value="show-welcome-checkbox" id="show-welcome-checkbox" checked />\r
    <label for="show-welcome-checkbox">Show on startup</label>\r
  </div>\r
</div>\r
`;var pe=`<div id="about-container" class="modal-container">\r
  <div class="modal-title">About LiveCodes</div>\r
  <div id="about-screen-container" class="modal-screen-container">\r
    <div class="modal-section" id="about-info">\r
      <p>\r
        <strong><em>LiveCodes</em></strong> is an\r
        <a href="{{REPO_URL}}" target="_blank" rel="noopener">open-source</a>,\r
        <a href="{{DOCS_BASE_URL}}features/" target="_blank">feature-rich</a>,\r
        <a href="{{DOCS_BASE_URL}}why#client-side" target="_blank">client-side</a> code playground.\r
        Currently,\r
        <a href="{{DOCS_BASE_URL}}languages/" target="_blank">80+ languages/<wbr />frameworks</a>\r
        are supported. It can be used as a standalone app or can be\r
        <a href="{{DOCS_BASE_URL}}features/embeds" target="_blank">embedded</a> in any web page.\r
        There are many ways to\r
        <a href="{{DOCS_BASE_URL}}features/code-prefill" target="_blank">prefill playgrounds</a>\r
        with code.\r
      </p>\r
      <p>\r
        A wide range of\r
        <a href="{{DOCS_BASE_URL}}configuration/" target="_blank">configuration options</a> makes it\r
        very flexible. A powerful <a href="{{DOCS_BASE_URL}}sdk/" target="_blank">SDK</a> (for\r
        <a href="{{DOCS_BASE_URL}}sdk/js-ts" target="_blank">JS/TS</a>,\r
        <a href="{{DOCS_BASE_URL}}sdk/react" target="_blank">React</a> and\r
        <a href="{{DOCS_BASE_URL}}sdk/vue" target="_blank">Vue</a>) facilitates\r
        <a href="{{DOCS_BASE_URL}}sdk/js-ts#embed-options" target="_blank">embedding</a> and\r
        <a href="{{DOCS_BASE_URL}}sdk/js-ts#sdk-methods" target="_blank">communicating</a> with\r
        playgrounds.\r
        <a href="{{DOCS_BASE_URL}}" target="_blank">Comprehensive documentations</a> are available\r
        with code samples, live demos and screenshots.\r
      </p>\r
\r
      <div class="modal-screen">\r
        <div class="modal-section">\r
          <h3>Documentations</h3>\r
          <ul>\r
            <li><a href="{{DOCS_BASE_URL}}" target="_blank">Home</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}getting-started" target="_blank">Getting Started</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}features" target="_blank">Features</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}configuration" target="_blank">Configuration</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}sdk" target="_blank">SDK</a></li>\r
            <li><a href="https://blog.livecodes.io" target="_blank">Blog</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}license" target="_blank">License</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}sponsor" target="_blank">Sponsor LiveCodes</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}contact" target="_blank">Contact</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}about" target="_blank">About us</a></li>\r
            <li><a href="{{DOCS_BASE_URL}}overview" target="_blank" class="more">More...</a></li>\r
          </ul>\r
        </div>\r
\r
        <div class="modal-section">\r
          <h3>Version</h3>\r
          <ul>\r
            <li>App version: {{APP_VERSION}}</li>\r
            <li>SDK version: {{SDK_VERSION}}</li>\r
            <li>\r
              Git commit: <a href="{{COMMIT_URL}}" target="_blank" rel="noopener">{{COMMIT_SHA}}</a>\r
            </li>\r
            <li><a href="{{APP_URL}}" target="_blank" rel="noopener">App Permanent URL</a></li>\r
            <li><a href="{{SDK_URL}}" target="_blank" rel="noopener">SDK Permanent URL</a></li>\r
            <li><a href="{{REPO_URL}}" target="_blank" rel="noopener">GitHub repo</a></li>\r
          </ul>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;var ue=`<div id="info-container" class="modal-container">
  <div class="modal-title">Project Info</div>
  <div id="info-screen-container" class="modal-screen-container">
    <div class="modal-screen">
      <label for="title-input">Project Title</label>
      <input id="title-input" type="text" />
      <label for="description-textarea">Description</label>
      <textarea id="description-textarea"></textarea>
      <label for="tags-input">Tags</label>
      <input id="tags-input" type="text" />
      <button id="info-save-btn" class="wide-button">Save</button>
    </div>
  </div>
</div>
`;var me=`<div id="resources-container" class="modal-container">
  <div class="modal-title">External Resources</div>
  <div id="resources-screen-container" class="modal-screen-container">
    <div class="modal-screen">
      <label for="resources-search-input"
        >Search Packages <span class="nowrap label-description">(powered by jsDelivr)</span></label
      >
      <input
        type="text"
        id="resources-search-input"
        placeholder="e.g. jquery, lodash@4, bootstrap@5.2.3, ..."
      />
      <div id="resources-result-container"><ul id="resources-search-results"></ul></div>

      <div id="resources-textarea-container">
        <div class="description center">
          Add stylesheet/script URLs and click 'Load'. Each URL should be in a separate line.
        </div>

        <label for="external-stylesheets">External Stylesheets</label>
        <textarea
          id="external-stylesheets"
          placeholder="https://"
          data-resource="stylesheets"
        ></textarea>
        <label for="external-scripts">External Scripts</label>
        <textarea id="external-scripts" placeholder="https://" data-resource="scripts"></textarea>
      </div>

      <label>Fonts <span class="nowrap label-description">(powered by Google Fonts)</span></label>
      <div id="fonts-container">
        <select>
          <option value="">Loading...</option>
        </select>
        <button class="btn">Add</button>
      </div>

      <label>CSS Presets</label>
      <div class="input-container">
        <span>
          <input type="radio" id="resources-css-preset-none" name="css-preset" value="" checked />
          <label class="radio-label" for="resources-css-preset-none">None</label>
        </span>
        <span>
          <input
            type="radio"
            id="resources-css-preset-normalize-css"
            name="css-preset"
            value="normalize.css"
          />
          <label class="radio-label" for="resources-css-preset-normalize-css">Normalize.css</label>
        </span>
        <span>
          <input
            type="radio"
            id="resources-css-preset-reset-css"
            name="css-preset"
            value="reset-css"
          />
          <label class="radio-label" for="resources-css-preset-reset-css">Reset CSS</label>
        </span>
      </div>

      <button id="resources-load-btn" class="wide-button">Load</button>
    </div>
  </div>
</div>
`;var ge=`<div id="login-screen" class="modal-container">\r
  <div class="modal-title">Login with GitHub</div>\r
  <div class="modal-screen-container">\r
    <div class="modal-content">\r
      <p>Allow access to:</p>\r
      <div>\r
        <input\r
          type="checkbox"\r
          value="public_repo"\r
          id="public_repo"\r
          name="public_repo"\r
          checked="checked"\r
        />\r
        <label for="public_repo">Repos</label>\r
        <div class="indent">\r
          <input type="checkbox" value="repo" id="repo" name="repo" checked="checked" /><label\r
            for="repo"\r
            >Private Repos</label\r
          >\r
        </div>\r
        <input type="checkbox" value="gist" id="gist" name="gist" checked="checked" /><label\r
          for="gist"\r
          >Gists</label\r
        >\r
      </div>\r
      <div class="buttons">\r
        <button id="login-btn" class="button">Login</button>\r
      </div>\r
    </div>\r
  </div>\r
  <div class="description">\r
    <p>By logging in, you agree that <strong>cookies</strong> may be stored on your device.</p>\r
    <p>\r
      <a\r
        href="{{DOCS_BASE_URL}}features/github-integration#features-that-require-github-account"\r
        target="_blank"\r
        >Why are these permissions required?</a\r
      >\r
    </p>\r
    <p>\r
      <a href="{{DOCS_BASE_URL}}features/github-integration#setting-permissions" target="_blank"\r
        >How to change/revoke permissions?</a\r
      >\r
    </p>\r
  </div>\r
</div>\r
`;var he=`<div id="prompt-screen">
  <div class="modal-title">Unsaved changes</div>
  <div class="modal-screen">
    <div>
      The changes you made may not be saved. <br />
      Do you want to save now?
    </div>
    <div class="buttons">
      <button id="prompt-save-btn" class="button">Save</button>
      <button id="prompt-donot-save-btn" class="button">Do not save</button>
      <button id="prompt-cancel-btn" class="button">Cancel</button>
    </div>
  </div>
</div>
`;var fe=`<div id="prompt-recover-screen">
  <div class="modal-title">Recover unsaved project?</div>
  <div class="modal-content">
    <div class="centered">
      Your last project has unsaved changes! <br />
      <br />
    </div>
    <div class="modal-screen-container">
      Title: <strong id="unsaved-project-name"></strong> <br />
      Last modified: <span id="unsaved-project-last-modified"></span>
    </div>
    <div class="centered"><br />Do you want to recover it now?</div>
    <div class="buttons">
      <button id="prompt-recover-btn" class="button" title="Recover project to editor">
        Recover
      </button>
      <button id="prompt-save-previous-btn" class="button" title="Save to device and continue">
        Save
      </button>
      <button id="prompt-cancel-recover-btn" class="button" title="Discard unsaved project">
        Cancel
      </button>
    </div>
    <div>
      <input
        type="checkbox"
        value="disable-recover-checkbox"
        id="disable-recover-checkbox"
        name="disable-recover-checkbox"
      />
      <label for="disable-recover-checkbox">Do not show this again.</label>
    </div>
  </div>
</div>
`;var be=`<div id="templates-container" class="modal-container">
  <div class="modal-title">New Project</div>
  <ul id="templates-tabs" class="modal-tabs">
    <li data-target="templates-starter" class="active">Starter Templates</li>
    <li data-target="templates-user">My Templates</li>
  </ul>
  <div id="templates-screens" class="modal-screen-container">
    <div id="templates-starter" class="tab-content active">
      <div class="modal-screen">
        <ul id="starter-templates-list" class="thumbnails">
          <li class="loading">Loading starter templates...</li>
        </ul>
      </div>
    </div>
    <div id="templates-user" class="tab-content">
      <div id="list-container" class="modal-screen">
        <div class="loading">Loading user templates...</div>
      </div>
    </div>
  </div>
</div>
`;var ve=`<div id="list-container" class="list-container">
  <div class="modal-title">Saved Projects</div>
  <div class="buttons">
    <button id="bulk-import-button" class="button">Import</button>
    <button id="export-all-button" class="button">Export All</button>
    <button id="delete-all-button" class="button danger">Delete All</button>
  </div>
  <div class="modal-message" id="projects-container" class="items-container">
    <span id="sort-by-label">Sort By:</span>
    <a href="#" id="sort-by-last-modified" class="active">Last&nbsp;Modified</a>&nbsp;/&nbsp;<a
      href="#"
      id="sort-by-title"
      >Title</a
    >&nbsp;(<a href="#" id="sorted-asc" style="display: none">\u25B2</a
    ><a href="#" id="sorted-desc">\u25BC</a>)
    <select name="language-filter" id="language-filter">
      <option value="">All languages</option>
    </select>
    <input id="filter-tags" type="text" placeholder="Filter by tags" />
    <input id="search-projects" type="text" placeholder="Search" />
    <a href="#" id="reset-filters" class="hint--bottom" data-hint="Reset" style="width: auto">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 489.533 489.533"
        style="width: 1em; height: 1em"
        xml:space="preserve"
      >
        <g>
          <path
            d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9
		l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6
		c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6
		C49.575,418.961,150.875,501.261,268.175,488.161z"
          />
        </g>
      </svg>
    </a>
    <div class="modal-message no-data">
      <div>You have no saved projects.</div>
      <div class="description">
        You can save a project from (settings&nbsp;menu&nbsp;>&nbsp;Save) or by the keyboard
        shortcut (Ctrl/Cmd&nbsp;+&nbsp;S).
      </div>
    </div>
    <div class="modal-message no-data" id="no-match">
      <div>No projects match these filters.</div>
    </div>
  </div>
</div>
`;var ye=`<div id="assets-list-container" class="list-container">
  <div class="modal-title">Assets</div>
  <div class="buttons">
    <button id="assets-add-asset-button" class="button">Add Asset</button>
    <button id="assets-delete-all-button" class="button danger">Delete All</button>
  </div>
  <div class="modal-message" id="assets-container" class="items-container">
    <span id="assets-sort-by-label">Sort By:</span>
    <a href="#" id="assets-sort-by-last-modified" class="active">Date</a>&nbsp;/&nbsp;<a
      href="#"
      id="assets-sort-by-title"
      >File Name</a
    >&nbsp;(<a href="#" id="assets-sorted-asc" style="display: none">\u25B2</a
    ><a href="#" id="assets-sorted-desc">\u25BC</a>)
    <select name="type-filter" id="assets-type-filter">
      <option value="">All types</option>
    </select>
    <input id="search-assets" type="text" placeholder="Search" />
    <a
      href="#"
      id="assets-reset-filters"
      class="hint--bottom"
      data-hint="Reset"
      style="width: auto"
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 489.533 489.533"
        style="width: 1em; height: 1em"
        xml:space="preserve"
      >
        <g>
          <path
            d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9
		l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6
		c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6
		C49.575,418.961,150.875,501.261,268.175,488.161z"
          />
        </g>
      </svg>
    </a>
    <div class="modal-message no-data">
      <div>You have no saved assets.</div>
    </div>
    <div class="modal-message no-data" id="assets-no-match">
      <div>No assets match these filters.</div>
    </div>
  </div>
</div>
`;var we=`<div id="add-asset-container" class="modal-container">
  <div class="modal-title">Add Asset</div>
  <div class="buttons">
    <button id="assets-button" class="button">Assets</button>
  </div>
  <ul id="add-asset-tabs" class="modal-tabs">
    <li data-target="add-asset-data-url" class="active">Data URL</li>
    <li data-target="add-asset-gh-pages">GitHub Pages</li>
  </ul>
  <div id="add-asset-screens" class="modal-screen-container">
    <div id="add-asset-data-url" class="tab-content active">
      <div class="modal-screen">
        <div class="description">
          Add asset as a base64-encoded
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs"
            target="_blank"
            rel="noopener"
            >data url</a
          >.
        </div>
        <form id="add-asset-data-url-form">
          <label for="asset-data-url-file-input" class="file-input-label">Add file</label>
          <input type="file" id="asset-data-url-file-input" class="file-input" />
        </form>
        <div id="data-url-output" class="clickable" style="width: 100%"></div>
      </div>
    </div>
    <div id="add-asset-gh-pages" class="tab-content">
      <div class="modal-screen">
        <div class="description">
          Deploy asset to GitHub Pages. The file is pushed to
          <span class="code">gh-pages</span> branch of the repo
          <span class="code">livecodes-assets</span> on your GitHub account. If the repo does not
          already exist, a public repo will be created.
        </div>
        <form id="add-asset-gh-pages-form">
          <label
            for="asset-gh-pages-file-input"
            id="asset-gh-pages-file-input-label"
            class="file-input-label"
            >Upload file</label
          >
          <input type="file" id="asset-gh-pages-file-input" class="file-input" />
        </form>
        <div id="gh-pages-output" class="clickable" style="width: 100%"></div>
      </div>
    </div>
  </div>
</div>
`;var xe=`<div id="snippets-list-container" class="list-container">
  <div class="modal-title">Code Snippets</div>
  <div class="buttons">
    <button id="snippets-add-snippet-button" class="button">Add Snippet</button>
    <button id="snippets-delete-all-button" class="button danger">Delete All</button>
  </div>
  <div class="modal-message" id="snippets-container" class="items-container">
    <span id="snippets-sort-by-label">Sort By:</span>
    <a href="#" id="snippets-sort-by-last-modified" class="active">Date</a>&nbsp;/&nbsp;<a
      href="#"
      id="snippets-sort-by-title"
      >Title</a
    >&nbsp;(<a href="#" id="snippets-sorted-asc" style="display: none">\u25B2</a
    ><a href="#" id="snippets-sorted-desc">\u25BC</a>)
    <select name="lang-filter" id="snippets-lang-filter">
      <option value="">All languages</option>
    </select>
    <input id="search-snippets" type="text" placeholder="Search" />
    <a
      href="#"
      id="snippets-reset-filters"
      class="hint--bottom"
      data-hint="Reset"
      style="width: auto"
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 489.533 489.533"
        style="width: 1em; height: 1em"
        xml:space="preserve"
      >
        <g>
          <path
            d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9
		l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6
		c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6
		C49.575,418.961,150.875,501.261,268.175,488.161z"
          />
        </g>
      </svg>
    </a>
    <div class="modal-message no-data">
      <div>You have no saved snippets.</div>
    </div>
    <div class="modal-message no-data" id="snippets-no-match">
      <div>No snippets match these filters.</div>
    </div>
  </div>
</div>
`;var Se=`<div id="add-snippet-container" class="modal-container">
  <div class="modal-title">Add Snippet</div>
  <div class="buttons">
    <button id="snippets-button" class="button">Snippets</button>
  </div>
  <div id="add-snippet-screen-container" class="modal-screen-container">
    <div class="modal-screen">
      <label for="add-snippet-title-input">Title</label>
      <input id="add-snippet-title-input" type="text" />
      <label for="add-snippet-description-textarea">Description</label>
      <textarea id="add-snippet-description-textarea"></textarea>
      <label for="language-select">Language</label>
      <select id="language-select"></select>
      <label for="snippet-editor">Code</label>
      <div id="add-snippet-editor" class="editor custom-editor"></div>
      <button id="add-snippet-save-btn" class="wide-button">Save</button>
    </div>
  </div>
</div>
`;var ke=`<div id="share-screen" class="modal-container">\r
  <div class="modal-title">Share</div>\r
  <div class="modal-content">\r
    <div id="share-top-text" class="description light">\r
      <span id="share-permanent-url"\r
        ><input id="share-permanent-url-checkbox" type="checkbox" /><label\r
          for="share-permanent-url-checkbox"\r
          >Permanent URL</label\r
        ></span\r
      >\r
      <span id="share-click-to-copy"></span>\r
    </div>\r
    <input type="text" id="share-url-input" readonly />\r
    <div id="share-expiry" class="share-expiry description light">\r
      <div class="share-short-url-expiry"><span>&nbsp;</span><a href="#">Get encoded URL</a></div>\r
      <div class="share-encoded-url-expiry">\r
        <span class="{{warnClass}}">{{urlLength}} characters</span><a href="#">Get short URL</a>\r
      </div>\r
    </div>\r
    <div id="share-expiry-self-hosted" class="share-expiry description light">\r
      <div class="share-short-url-expiry">\r
        <span class="danger">Expires in 1 year</span><a href="#">Get encoded URL</a>\r
      </div>\r
      <div class="share-encoded-url-expiry">\r
        <span class="{{warnClass}}">{{urlLength}} characters</span><a href="#">Get short URL</a>\r
      </div>\r
    </div>\r
    <div id="share-links-container">\r
      <ul id="share-links"></ul>\r
      <div id="qrcode-container">Generating...</div>\r
    </div>\r
  </div>\r
</div>\r
`;var Le=`<div id="embed-container" class="modal-container">
  <div class="modal-title">Embed Project</div>
  <div id="embed-screen-container" class="modal-screen-container">
    <div class="modal-screen">
      <label>Preview</label>
      <div id="embed-preview-container">Loading Preview...</div>
      <form id="embed-form"></form>
      <label for="embed-code">Code</label>
      <div id="embed-code" class="custom-editor"></div>
      <button id="embed-copy-btn" class="wide-button">Copy Code</button>
      <div class="description">
        Please check the
        <a href="{{DOCS_BASE_URL}}configuration/" target="_blank" rel="noopener">documentations</a>
        for advanced configurations.
      </div>
    </div>
  </div>
</div>
`;var _e=`<div id="editor-settings-container" class="modal-container">
  <div class="modal-title">Editor Settings</div>
  <div id="editor-settings-screen-container" class="modal-screen-container">
    <div class="modal-screen">
      <label>Preview</label>
      <a href="#" id="editor-settings-format-link">Format</a>
      <div id="editor-settings-preview-container" class="custom-editor"></div>
      <form id="editor-settings-form"></form>
      <div class="description" id="codejar-info">
        * The marked features are not available in CodeJar.
      </div>
      <div class="description">
        Please check the
        <a href="{{DOCS_BASE_URL}}features/editor-settings" target="_blank" rel="noopener"
          >documentations</a
        >
        for details.
      </div>
    </div>
  </div>
</div>
`;var Ee=`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>LiveCodes</title>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
      #result {
        border: 0;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <iframe
      id="result"
      title="result"
      sandbox="allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"
    ></iframe>
    <script>
      const result = document.querySelector('#result');
      addEventListener('message', (ev) => {
        if (ev.origin != window.opener.origin) return;
        if (ev.data.result) {
          result.srcdoc = ev.data.result;
        }
      });
    <\/script>
  </body>
</html>
`;var w=e=>e.replace(/{{APP_VERSION}}/g,"4").replace(/{{SDK_VERSION}}/g,"0.0.2").replace(/{{COMMIT_SHA}}/g,"fe430fb").replace(/{{REPO_URL}}/g,"https://github.com/live-codes/livecodes").replace(/{{DOCS_BASE_URL}}/g,"/livecodes/docs/"),Ao=w(Z),Ro=w(ee),qo=w(te),Bo=w(ae),Do=w(oe),Io=w(ne),Po=w(re),Oo=w(se),No=w(ie),Fo=w(le),Jo=w(ce),Xo=w(de),Wo=w(pe),zo=w(ue),Go=w(me),$o=w(ge),Yo=w(he),Ko=w(fe),Vo=w(be),Qo=w(ve),Te=w(ye),Me=w(we),Zo=w(xe),en=w(Se),tn=w(ke),an=w(Le),on=w(_e),nn=w(Ee);var je=e=>e.querySelector("#assets-add-asset-button"),Ce=e=>e.querySelector("#assets-delete-all-button"),He=e=>e.querySelector("#assets-button"),Ue=e=>e.querySelector("#asset-data-url-file-input"),Ae=e=>e.querySelector("#data-url-output"),Re=e=>e.querySelector("#asset-gh-pages-file-input"),qe=e=>e.querySelector("#asset-gh-pages-file-input-label");var Be=e=>e.querySelector("#gh-pages-output");var De=(e,o)=>{J(e)?o.success("URL is copied to clipboard."):o.error("Failed to copy URL.")},_t=(e,o)=>{let p=document.createElement("div");p.classList.add("asset-item");let u=document.createElement("div");u.classList.add("asset-title","overflow-text"),u.textContent=e.filename,p.appendChild(u);let m=document.createElement("img");m.src=Ie(e,o),m.classList.add("img-preview"),m.onerror=function(){let l=o+"assets/images/image.svg";m.src!==l&&(m.src=l)},p.appendChild(m);let h=document.createElement("div");h.classList.add("asset-details"),p.appendChild(h);let a=document.createElement("div");a.classList.add("light"),a.textContent="Type: "+e.type,h.appendChild(a);let n=F()?new Date(e.lastModified).toLocaleDateString():new Date(e.lastModified).toLocaleString(),d=document.createElement("div");d.classList.add("light"),d.textContent="Date: "+String(n),h.appendChild(d);let i=document.createElement("div");return i.classList.add("light","overflow-text"),i.textContent="URL: "+e.url,h.appendChild(i),p},Et=(e,o,p,u)=>{let m=document.createElement("li");o.appendChild(m);let h=document.createElement("a");h.href="#",h.dataset.id=e.id,h.classList.add("asset-link","hint--top"),h.dataset.hint="Click to copy URL",h.appendChild(_t(e,u)),h.onclick=n=>{n.preventDefault(),De(e.url,p)},m.appendChild(h);let a=document.createElement("button");return a.classList.add("delete-button"),m.appendChild(a),{link:h,deleteButton:a}},Tt=async(e,o,p)=>{let u="date",m="desc",h,a=[],n=document.querySelector("#assets-list-container #assets-sort-by-last-modified"),d=document.querySelector("#assets-list-container #assets-sort-by-title"),i=document.querySelector("#assets-list-container #assets-sorted-asc"),l=document.querySelector("#assets-list-container #assets-sorted-desc"),b=document.querySelector("#assets-list-container #assets-type-filter"),S=document.querySelector("#assets-list-container #search-assets"),x=document.querySelector("#assets-list-container #assets-reset-filters");Array.from(new Set((await e()).map(s=>s.type))).sort((s,t)=>s.toLowerCase()<t.toLowerCase()?-1:s.toLowerCase()>t.toLowerCase()?1:0).forEach(s=>{let t=document.createElement("option");t.text=s,t.value=s,b.appendChild(t)});let L=async()=>(await e()).filter(s=>h?s.type===h:!0).filter(s=>S.value.trim()!==""?a.includes(s.id):!0).sort((s,t)=>u==="date"&&m==="asc"?s.lastModified-t.lastModified:u==="date"&&m==="desc"?t.lastModified-s.lastModified:u==="filename"&&m==="asc"&&s.filename<t.filename?-1:u==="filename"&&m==="asc"&&s.filename>t.filename||u==="filename"&&m==="desc"&&s.filename<t.filename?1:u==="filename"&&m==="desc"&&s.filename>t.filename?-1:0),v=async()=>{o(await L())},y=()=>{m="asc",i.style.display="unset",l.style.display="none"},k=()=>{m="desc",i.style.display="none",l.style.display="unset"},g=async(s=b.value)=>{h=s,await v()};p.addEventListener(n,"click",async s=>{s.preventDefault(),u!=="date"||m==="asc"?k():y(),u="date",n.classList.add("active"),d.classList.remove("active"),await v()},!1),p.addEventListener(d,"click",async s=>{s.preventDefault(),u!=="filename"?y():m==="asc"?k():y(),u="filename",n.classList.remove("active"),d.classList.add("active"),await v()},!1),p.addEventListener(i,"click",async s=>{s.preventDefault(),k(),await v()},!1),p.addEventListener(l,"click",async s=>{s.preventDefault(),y(),await v()},!1),p.addEventListener(b,"change",async()=>{await g()},!1),B(Y,"FlexSearch").then(async s=>{let t=new s.Document({index:["filename","type"],tokenize:"full",worker:!0});await Promise.all((await e()).map(r=>t.add(r))),p.addEventListener(S,"keyup",async()=>{a=(await t.searchAsync(S.value)).map(f=>f.result).flat(),await v()},!1)}),p.addEventListener(x,"click",async s=>{s.preventDefault(),u="date",m="desc",h="",a=[],n.classList.add("active"),d.classList.remove("active"),k(),b.value="",S.value="",await v()},!1)},mn=async({assetsStorage:e,eventsManager:o,showScreen:p,notifications:u,modal:m,baseUrl:h})=>{let a=document.createElement("div");a.innerHTML=Te;let n=a.firstChild,d=n.querySelector(".no-data"),i=n.querySelector("#assets-no-match.no-data"),l=n.querySelector("#assets-container"),b=document.createElement("ul");b.classList.add("open-list");let S=await e.getAllData(),x=S,L=je(n),v=Ce(n);o.addEventListener(L,"click",()=>{p("add-asset")},!1),o.addEventListener(v,"click",async()=>{u.confirm(`Delete ${x.length} assets?`,async()=>{for(let g of x)await e.deleteItem(g.id);x=[],S=await e.getAllData(),await y(x)})},!1),l.appendChild(b);let y=async g=>{x=g,b.innerHTML="",g.forEach(s=>{let{deleteButton:t}=Et(s,b,u,h);o.addEventListener(t,"click",()=>{u.confirm(`Delete asset: ${s.filename}?`,async()=>{await e.deleteItem(s.id),x=x.filter(f=>f.id!==s.id),t.parentElement.classList.add("hidden"),setTimeout(()=>{y(x)},500)})},!1)}),g.length===0?(b.classList.add("hidden"),v.classList.add("hidden"),(await e.getList()).length===0?(d.classList.remove("hidden"),i.classList.add("hidden")):(d.classList.add("hidden"),i.classList.remove("hidden"))):(b.classList.remove("hidden"),v.classList.remove("hidden"),d.classList.add("hidden"),i.classList.add("hidden"))};await y(S);let k=()=>e.getAllData();m.show(n,{isAsync:!0}),Tt(k,y,o)},gn=({assetsStorage:e,eventsManager:o,showScreen:p,notifications:u,deployAsset:m,getUser:h,baseUrl:a,activeTab:n})=>{let d,i=document.createElement("div");i.innerHTML=Me;let l=i.firstChild,b=l.querySelectorAll("#add-asset-tabs li"),S=f=>{b.forEach(E=>E.classList.remove("active")),f.classList.add("active"),document.querySelectorAll("#add-asset-screens > div").forEach(E=>{E.classList.remove("active")});let c=l.querySelector("#"+f.dataset.target);c?.classList.add("active"),c?.querySelector("input")?.focus()};b.forEach(f=>{o.addEventListener(f,"click",()=>S(f))}),setTimeout(()=>{n&&S(b[n])});let x=He(l),L=Ue(l),v=Ae(l),y=Re(l),k=qe(l),g=Be(l);o.addEventListener(x,"click",()=>{p("assets")},!1);let s=(f,c=!1)=>new Promise((E,_)=>{if(f.files?.length===0)return;let T=f.files[0],R=2*1024*1024;if(T.size>R){_("Error: Exceeded size 2MB");return}let j=new FileReader;o.addEventListener(j,"load",async U=>{let C="";if(c){if(!d){_("Error: Unauthenticated user");return}k.innerText="Uploading...",k.classList.add("disabled");let A=await m(d,{path:T.name,content:U.target?.result.split("base64,")[1]});k.innerText="Upload file",k.classList.remove("disabled"),A?C=A.url:_("Error: Failed to upload file")}C=C||U.target?.result,E({id:D(),filename:T.name,type:Mt(T.type,T.name),url:C,lastModified:Date.now()})}),o.addEventListener(j,"error",()=>{_("Error: Failed to read file")}),j.readAsDataURL(T)}),t=async(f,c,E=!1)=>{await e.updateItem(f.id,f);let _=document.createElement("p"),T=document.createElement("span");T.textContent="Added file: ",T.classList.add("bold"),_.appendChild(T);let R=document.createElement("span");R.textContent+=f.filename,_.appendChild(R),_.classList.add("overflow-text"),c.appendChild(_);let j=document.createElement("p"),U=document.createElement("span");U.textContent="URL: ",U.classList.add("bold"),j.appendChild(U);let C=document.createElement("span");if(C.textContent+=f.url,j.appendChild(C),j.classList.add("overflow-text"),c.appendChild(j),E){let M=document.createElement("p");M.textContent="The asset should be available on this URL soon.",M.classList.add("description","center"),c.appendChild(M)}else{let M=document.createElement("img");M.src=Ie(f,a),M.onerror=function(){let O=a+"assets/images/image.svg";M.src!==O&&(M.src=O)},M.classList.add("img-preview-larger"),c.appendChild(M)}let A=document.createElement("p");A.textContent="Click to copy URL",A.classList.add("description","center"),c.appendChild(A);let P=document.createElement("hr");P.style.margin="1em",c.appendChild(P),c.title="Click to copy URL",u.success("File added to assets!"),c.onclick=()=>De(f.url,u)},r=async(f,c,E=!1)=>{await s(f,E).then(_=>t(_,c,E)).catch(_=>{u.error(_)})};return o.addEventListener(L,"change",()=>{r(L,v)},!1),o.addEventListener(k,"click",async f=>{d=await h(async()=>{await p("add-asset",1)}),d||(f.preventDefault(),u.error("Authentication error!"))},!1),o.addEventListener(y,"change",()=>{r(y,g,!0)},!1),l},Mt=(e,o)=>{let p={"audio/aac":"audio","video/x-msvideo":"video","image/bmp":"image","application/x-bzip":"archive","application/x-bzip2":"archive","text/css":"stylesheet","text/csv":"csv","application/gzip":"archive","image/gif":"image","text/html":"html","image/vnd.microsoft.icon":"icon","image/jpeg":"image","text/javascript":"script","application/javascript":"script","application/json":"json","application/ld+json":"json","audio/midi":"audio","audio/x-midi":"audio","audio/mpeg":"audio","video/mp4":"video","video/mpeg":"video","audio/ogg":"audio","video/ogg":"video","application/ogg":"audio","audio/opus":"audio","font/otf":"font","image/png":"image","application/vnd.rar":"archive","image/svg+xml":"image","application/x-tar":"archive","image/tiff":"image","video/mp2t":"video","font/ttf":"font","text/plain":"text","audio/wav":"audio","audio/webm":"audio","video/webm":"video","image/webp":"image","font/woff":"font","font/woff2":"font","application/xhtml+xml":"html","application/xml":"xml","application/zip":"archive","video/3gpp":"video","video/3gpp2":"audio","application/x-7z-compressed":"archive"},u={aac:"audio",bmp:"image",bzip:"archive",bzip2:"archive",css:"stylesheet",csv:"csv",gzip:"archive",gif:"image",html:"html",ico:"icon",jpeg:"image",jpg:"image",js:"script",json:"json",midi:"audio",mpeg:"audio",mp4:"video",ogg:"audio",otf:"font",png:"image",rar:"archive",svg:"image",tar:"archive",tiff:"image",mp2t:"video",ttf:"font",txt:"text",wav:"audio",webm:"audio",webp:"image",woff:"font",woff2:"font",xml:"xml",zip:"archive","3gpp":"video","3gpp2":"audio","7z":"archive"},m=o.split(".")[o.split(".").length-1];return p[e]||u[m]||"other"},Ie=(e,o)=>{if(e.type==="image"||e.type==="icon")return e.url;let p=o+"assets/images/";return e.type==="other"?p+"file.svg":p+e.type+".svg"};export{gn as createAddAssetContainer,mn as createAssetsList};
//# sourceMappingURL=assets.js.map
