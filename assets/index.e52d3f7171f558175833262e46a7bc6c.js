(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const $=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.io")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost"))),D="https://dpaste.com/",_="https://dpaste.com/api/v2/",O="https://api2.livecodes.io/share",W={getProject:async e=>{try{const t=await fetch(D+e+".txt");return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{try{const t=await fetch(_,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return t.ok?(await t.text()).replace(D,""):""}catch{return""}}},G={getProject:async e=>{if(e.length<11)return W.getProject(e);if(!$())return{};try{const t=await fetch(O+"?id="+e);return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{if(!$())return"";try{const t=await fetch(O,{method:"POST",mode:"cors",body:JSON.stringify(e)});return t.ok?t.text():""}catch{return""}}},K=$()?G:W,Y=`<!DOCTYPE html>\r
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
`,s={getConfig:"livecodes-get-config",config:"livecodes-config",load:"livecodes-load",appLoaded:"livecodes-app-loaded",ready:"livecodes-ready",change:"livecodes-change",testResults:"livecodes-test-results",destroy:"livecodes-destroy",resizeEditor:"livecodes-resize-editor",apiResponse:"livecodes-api-response"},Q=()=>{try{return window.self!==window.top}catch{return!0}},H=["jspm","skypack"],I=["unpkg","jsdelivr"],N=["jsdelivr.gh","statically"],l={getModuleUrl:(e,{isModule:t=!0,defaultCDN:n="jspm"}={})=>{e=e.replace(/#nobundle/g,"");const o=R(e,t,n);return o||(t?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,t)=>e.startsWith("http")?e:R(e,!1,t||V())||e,cdnLists:{npm:I,module:H,gh:N},checkCDNs:async(e,t)=>{const n=[t,...l.cdnLists.npm].filter(Boolean);for(const o of n)try{if((await fetch(l.getUrl(e,o),{method:"HEAD"})).ok)return o}catch{}return l.cdnLists.npm[0]}},V=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||l.cdnLists.npm[0]}catch{return l.cdnLists.npm[0]}},R=(e,t,n)=>{const o=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",N[0]):e.includes(":")||(e=(n||(t?H[0]:I[0]))+":"+e);for(const r of X){const[i,a]=r;if(i.test(e))return e.replace(i,a)+o}return null},X=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]],q="es-module-shims@1.4.4/dist/es-module-shims.js",c=new URLSearchParams(location.search),F=c.get("lite")!=null&&c.get("lite")!=="false",p=F||c.get("embed")!=null&&c.get("embed")!=="false"||Q(),m=c.get("loading"),J=p&&m!=="eager",ee=p?m==="lazy"||m==="click"||m==="eager"?m:"lazy":"eager",A=async(e,t={})=>new Promise(async n=>{const o=document.querySelector(e);if(!o)throw new Error(`Cannot find element with the selector: "${e}"`);const r=(location.origin+location.pathname).split("/").slice(0,-1).join("/")+"/livecodes/",i=F?"lite.25f79f8ee3e2598a74ea93e6b6d820e2.js":p?"embed.7732b355eb72b6ff075e9cebb089c6a4.js":"app.e832b0d737fd4350f4c2707cf9d81d2d.js",a="*",j=document.createElement("style");j.innerHTML=`
        ${e} {
            min-width: 300px;
            min-height: 200px;
            padding: 0;
            overflow: hidden;
        }
        ${e} > iframe {
            border: 0;
            width: 100%;
            height: 100%;
        }
        ${e}.embed iframe {
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            border: 1px solid #001b25;
            border-radius: 5px;
        }
    `,document.head.appendChild(j);const k=await l.checkCDNs(q,c.get("appCDN")),U=()=>{var E,x,S;const h=HTMLScriptElement.supports?HTMLScriptElement.supports("importmap"):!1,d=document.createElement("iframe");d.name="app",d.style.display="none",o.appendChild(d),(E=d.contentWindow)==null||E.document.open(),(x=d.contentWindow)==null||x.document.write(Y.replace(/{{baseUrl}}/g,r).replace(/{{script}}/g,i).replace(/{{appCDN}}/g,k).replace(/{{esModuleShimsUrl}}/g,l.getUrl(q,k)).replace(/{{codemirrorModule}}/g,h?"":`
          <script type="module">
            import * as mod from '${r}codemirror.f07ed45d348e9ab10adffdb20b13c5f0.js';
            window['${r}codemirror.f07ed45d348e9ab10adffdb20b13c5f0.js'] = mod;
          <\/script>
          `).replace(/{{codemirrorCoreUrl}}/g,`${r}vendor/codemirror/v6.0.1/codemirror-core.js`)),(S=d.contentWindow)==null||S.document.close(),p&&(window.addEventListener(s.appLoaded,()=>{parent.postMessage({type:s.appLoaded},a)}),window.addEventListener(s.ready,()=>{parent.postMessage({type:s.ready},a)}),window.addEventListener(s.change,()=>{parent.postMessage({type:s.change},a)})),d.addEventListener("load",async()=>{var P;const M=(P=d.contentWindow)==null?void 0:P.app;if(typeof M=="function"){const b=await M(t,r);d.style.display="block",window.dispatchEvent(new CustomEvent(s.appLoaded,{detail:b})),addEventListener("message",async v=>{var T;if(p){if(v.source!==parent)return;const{method:y,args:w}=v.data||{};if(!y)return;const B=Array.isArray(w)?w:[w];let L;try{L=await b[y](...B)}catch(z){L={error:z.message||z}}parent.postMessage({type:s.apiResponse,method:y,payload:L},a)}else{if(v.source!==d.contentWindow)return;((T=v.data)==null?void 0:T.args)==="home"&&(location.href="/")}}),n(b)}})};if(J){window.addEventListener(s.load,U,{once:!0});const h=document.createElement("link");h.href=r+i,h.rel="preload",h.as="script",document.head.appendChild(h)}else U()}),te=async e=>{if(!e)return;const t=await K.getProject(e);if(!t.result)return;const n=document.createElement("iframe");n.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),n.setAttribute("scrolling","no"),n.classList.add("preview"),n.srcdoc=t.result,document.body.appendChild(n)};if(m==="click"&&["true","","1"].includes(c.get("preview"))){const e=c.get("x");e!=null&&e.startsWith("id/")&&te(e.replace("id/",""))}const g=document.querySelector("#animating-logo"),Z=document.querySelector("#cube"),u=document.querySelector("#click-to-load");p&&(document.body.classList.add("embed"),J&&(document.body.classList.add("click-to-load"),Z.classList.remove("cube"),g.classList.add("hidden"),g.style.display="none",u.style.display="flex",u.classList.add("visible"),u.addEventListener("click",C),addEventListener("message",e=>{var t;e.source===parent&&((t=e.data)==null?void 0:t.type)===s.load&&C()}),ee==="lazy"&&"IntersectionObserver"in window&&new IntersectionObserver((t,n)=>{t.forEach(async o=>{o.isIntersecting&&(C(),n.unobserve(document.body))})},{rootMargin:"150px"}).observe(document.body)));function C(){var e;u.classList.remove("visible"),(e=document.querySelector(".preview"))==null||e.classList.add("hidden"),setTimeout(()=>{document.body.classList.remove("click-to-load"),g.style.display="flex",g.classList.remove("hidden"),Z.classList.add("cube"),setTimeout(()=>{var t;u.remove(),(t=document.querySelector(".preview"))==null||t.remove()},300)},500),window.dispatchEvent(new Event(s.load))}function f(){document.body.style.height=window.innerHeight+"px"}f();window.addEventListener("resize",f,!1);setTimeout(f,500);window.addEventListener(s.appLoaded,e=>{g.remove(),window.livecodes=e.detail});window.addEventListener(s.ready,()=>{});window.addEventListener(s.change,()=>{});window.addEventListener(s.testResults,e=>{});window.addEventListener(s.destroy,()=>{window.removeEventListener("resize",f),document.body.innerHTML="",document.head.innerHTML=""});p&&c.get("config")==="sdk"?(addEventListener("message",function e(t){var n;t.source!==parent||((n=t.data)==null?void 0:n.type)!==s.config||(removeEventListener("message",e),A("#livecodes",t.data.payload))}),parent.postMessage({type:s.getConfig},"*")):A("#livecodes");
//# sourceMappingURL=index.js.map
