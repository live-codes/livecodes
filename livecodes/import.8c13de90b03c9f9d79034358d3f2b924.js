var Zo=Object.create;var Te=Object.defineProperty;var Qo=Object.getOwnPropertyDescriptor;var es=Object.getOwnPropertyNames;var ts=Object.getPrototypeOf,rs=Object.prototype.hasOwnProperty;var os=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ss=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of es(t))!rs.call(e,l)&&l!==r&&Te(e,l,{get:()=>t[l],enumerable:!(s=Qo(t,l))||s.enumerable});return e};var as=(e,t,r)=>(r=e!=null?Zo(ts(e)):{},ss(t||!e||!e.__esModule?Te(r,"default",{value:e,enumerable:!0}):r,e));var ct=os((ci,te)=>{var lt=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",s={};function l(a,i){if(!s[a]){s[a]={};for(var o=0;o<a.length;o++)s[a][a.charAt(o)]=o}return s[a][i]}var m={compressToBase64:function(a){if(a==null)return"";var i=m._compress(a,6,function(o){return t.charAt(o)});switch(i.length%4){default:case 0:return i;case 1:return i+"===";case 2:return i+"==";case 3:return i+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:m._decompress(a.length,32,function(i){return l(t,a.charAt(i))})},compressToUTF16:function(a){return a==null?"":m._compress(a,15,function(i){return e(i+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:m._decompress(a.length,16384,function(i){return a.charCodeAt(i)-32})},compressToUint8Array:function(a){for(var i=m.compress(a),o=new Uint8Array(i.length*2),n=0,p=i.length;n<p;n++){var h=i.charCodeAt(n);o[n*2]=h>>>8,o[n*2+1]=h%256}return o},decompressFromUint8Array:function(a){if(a==null)return m.decompress(a);for(var i=new Array(a.length/2),o=0,n=i.length;o<n;o++)i[o]=a[o*2]*256+a[o*2+1];var p=[];return i.forEach(function(h){p.push(e(h))}),m.decompress(p.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":m._compress(a,6,function(i){return r.charAt(i)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),m._decompress(a.length,32,function(i){return l(r,a.charAt(i))}))},compress:function(a){return m._compress(a,16,function(i){return e(i)})},_compress:function(a,i,o){if(a==null)return"";var n,p,h={},w={},L="",k="",b="",y=2,E=3,S=2,j=[],u=0,g=0,U;for(U=0;U<a.length;U+=1)if(L=a.charAt(U),Object.prototype.hasOwnProperty.call(h,L)||(h[L]=E++,w[L]=!0),k=b+L,Object.prototype.hasOwnProperty.call(h,k))b=k;else{if(Object.prototype.hasOwnProperty.call(w,b)){if(b.charCodeAt(0)<256){for(n=0;n<S;n++)u=u<<1,g==i-1?(g=0,j.push(o(u)),u=0):g++;for(p=b.charCodeAt(0),n=0;n<8;n++)u=u<<1|p&1,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=p>>1}else{for(p=1,n=0;n<S;n++)u=u<<1|p,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=0;for(p=b.charCodeAt(0),n=0;n<16;n++)u=u<<1|p&1,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=p>>1}y--,y==0&&(y=Math.pow(2,S),S++),delete w[b]}else for(p=h[b],n=0;n<S;n++)u=u<<1|p&1,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=p>>1;y--,y==0&&(y=Math.pow(2,S),S++),h[k]=E++,b=String(L)}if(b!==""){if(Object.prototype.hasOwnProperty.call(w,b)){if(b.charCodeAt(0)<256){for(n=0;n<S;n++)u=u<<1,g==i-1?(g=0,j.push(o(u)),u=0):g++;for(p=b.charCodeAt(0),n=0;n<8;n++)u=u<<1|p&1,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=p>>1}else{for(p=1,n=0;n<S;n++)u=u<<1|p,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=0;for(p=b.charCodeAt(0),n=0;n<16;n++)u=u<<1|p&1,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=p>>1}y--,y==0&&(y=Math.pow(2,S),S++),delete w[b]}else for(p=h[b],n=0;n<S;n++)u=u<<1|p&1,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=p>>1;y--,y==0&&(y=Math.pow(2,S),S++)}for(p=2,n=0;n<S;n++)u=u<<1|p&1,g==i-1?(g=0,j.push(o(u)),u=0):g++,p=p>>1;for(;;)if(u=u<<1,g==i-1){j.push(o(u));break}else g++;return j.join("")},decompress:function(a){return a==null?"":a==""?null:m._decompress(a.length,32768,function(i){return a.charCodeAt(i)})},_decompress:function(a,i,o){var n=[],p,h=4,w=4,L=3,k="",b=[],y,E,S,j,u,g,U,d={val:o(0),position:i,index:1};for(y=0;y<3;y+=1)n[y]=y;for(S=0,u=Math.pow(2,2),g=1;g!=u;)j=d.val&d.position,d.position>>=1,d.position==0&&(d.position=i,d.val=o(d.index++)),S|=(j>0?1:0)*g,g<<=1;switch(p=S){case 0:for(S=0,u=Math.pow(2,8),g=1;g!=u;)j=d.val&d.position,d.position>>=1,d.position==0&&(d.position=i,d.val=o(d.index++)),S|=(j>0?1:0)*g,g<<=1;U=e(S);break;case 1:for(S=0,u=Math.pow(2,16),g=1;g!=u;)j=d.val&d.position,d.position>>=1,d.position==0&&(d.position=i,d.val=o(d.index++)),S|=(j>0?1:0)*g,g<<=1;U=e(S);break;case 2:return""}for(n[3]=U,E=U,b.push(U);;){if(d.index>a)return"";for(S=0,u=Math.pow(2,L),g=1;g!=u;)j=d.val&d.position,d.position>>=1,d.position==0&&(d.position=i,d.val=o(d.index++)),S|=(j>0?1:0)*g,g<<=1;switch(U=S){case 0:for(S=0,u=Math.pow(2,8),g=1;g!=u;)j=d.val&d.position,d.position>>=1,d.position==0&&(d.position=i,d.val=o(d.index++)),S|=(j>0?1:0)*g,g<<=1;n[w++]=e(S),U=w-1,h--;break;case 1:for(S=0,u=Math.pow(2,16),g=1;g!=u;)j=d.val&d.position,d.position>>=1,d.position==0&&(d.position=i,d.val=o(d.index++)),S|=(j>0?1:0)*g,g<<=1;n[w++]=e(S),U=w-1,h--;break;case 2:return b.join("")}if(h==0&&(h=Math.pow(2,L),L++),n[U])k=n[U];else if(U===w)k=E+E.charAt(0);else return null;b.push(k),n[w++]=E+k.charAt(0),h--,E=k,h==0&&(h=Math.pow(2,L),L++)}}};return m}();typeof define=="function"&&define.amd?define(function(){return lt}):typeof te<"u"&&te!=null&&(te.exports=lt)});var pe={title:"Untitled Project",description:"",tags:[],autoupdate:!0,autosave:!1,delay:1500,formatOnsave:!1,mode:"full",theme:"dark",recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{},tests:{language:"typescript",content:""},tools:{enabled:"all",active:"",status:""},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,semicolons:!0,singleQuote:!1,trailingComma:!0,emmet:!0,editorMode:void 0,version:"4"};var Ue=`<!DOCTYPE html>
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
`;var Me=`<!DOCTYPE html>\r
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
`;var Pe=`<ul id="settings-menu" class="dropdown-menu">\r
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
`;var Re=`<section data-lang="art-template">\r
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
`;var He=`<div id="custom-settings-container" class="modal-container">
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
`;var Ae=`<div id="test-editor-container" class="modal-container">
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
`;var Ie=`<div id="import-container" class="modal-container">
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
`;var qe=`<div id="deploy-container" class="modal-container">
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
`;var Be=`<div id="sync-container" class="modal-container">
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
`;var Oe=`<div id="backup-container" class="modal-container">
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
`;var De=`<div id="broadcast-container" class="modal-container">
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
`;var Fe=`<div id="welcome-container" class="modal-container">\r
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
`;var $e=`<div id="about-container" class="modal-container">\r
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
`;var Ne=`<div id="info-container" class="modal-container">
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
`;var Je=`<div id="resources-container" class="modal-container">
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
`;var We=`<div id="login-screen" class="modal-container">\r
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
`;var Ge=`<div id="prompt-screen">
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
`;var ze=`<div id="prompt-recover-screen">
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
`;var Xe=`<div id="templates-container" class="modal-container">
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
`;var Ye=`<div id="list-container" class="list-container">
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
`;var Ve=`<div id="assets-list-container" class="list-container">
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
`;var Ke=`<div id="add-asset-container" class="modal-container">
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
`;var Ze=`<div id="snippets-list-container" class="list-container">
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
`;var Qe=`<div id="add-snippet-container" class="modal-container">
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
`;var et=`<div id="share-screen" class="modal-container">\r
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
`;var tt=`<div id="embed-container" class="modal-container">
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
`;var rt=`<div id="editor-settings-container" class="modal-container">
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
`;var ot=`<!DOCTYPE html>
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
`;var C=e=>e.replace(/{{APP_VERSION}}/g,"4").replace(/{{SDK_VERSION}}/g,"0.0.2").replace(/{{COMMIT_SHA}}/g,"fe430fb").replace(/{{REPO_URL}}/g,"https://github.com/live-codes/livecodes").replace(/{{DOCS_BASE_URL}}/g,"/livecodes/docs/"),Hn=C(Ue),An=C(Me),In=C(Pe),qn=C(Re),Bn=C(He),On=C(Ae),st=C(Ie),Dn=C(qe),Fn=C(Be),$n=C(Oe),Nn=C(De),Jn=C(Fe),Wn=C($e),Gn=C(Ne),zn=C(Je),Xn=C(We),Yn=C(Ge),Vn=C(ze),Kn=C(Xe),Zn=C(Ye),Qn=C(Ve),ei=C(Ke),ti=C(Ze),ri=C(Qe),oi=C(et),si=C(tt),ai=C(rt),ni=C(ot);var at=e=>{let t=document.createElement("textarea");return t.innerHTML=e,t.value};var me=(e,t=!0)=>e.replace(/\\/g,t?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>"),nt=(...e)=>e.reduce((t,r)=>(...s)=>r(t(...s)));var de=(e,t)=>new Promise((r,s)=>{if(t&&globalThis[t])return r(globalThis[t]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),t&&globalThis[t]?r(globalThis[t]):r(globalThis);let l=document.createElement("script");l.src=e,l.async=!0;let m=()=>{l.removeEventListener("load",a),l.removeEventListener("error",i)},a=()=>{if(m(),!t)return r("loaded: "+e);let o=setInterval(()=>{if(window[t])return clearInterval(o),r(window[t])},5)},i=()=>{m(),s("failed to load: "+e)};l.addEventListener("load",a),l.addEventListener("error",i),document.head.appendChild(l)});var Hs=e=>e.ok?e:Promise.reject(),$=(e,t)=>fetch(e,t).then(Hs);var x=(e,t)=>({...t.customSettings[e]}),it=e=>{if(!e)return null;let t=null;if(e.startsWith("http")||e.startsWith("data:"))try{t=new URL(e).href}catch{try{t=new URL(decodeURIComponent(e)).href}catch{}}return t};var Y=as(ct());var ue=(e,t=!0)=>{let r=(0,Y.decompressFromEncodedURIComponent)(e);if(r){if(!t)return r;try{if(JSON.parse(r))return r}catch{}}return(0,Y.decompressFromBase64)(e)};var pt=e=>e.startsWith("code/"),mt=e=>{let t=e.slice(5),r;try{r=JSON.parse(ue(t)||"{}")}catch{r={}}return r};var ut=["jspm","skypack"],gt=["unpkg","jsdelivr"],ft=["jsdelivr.gh","statically"],D={getModuleUrl:(e,{isModule:t=!0,defaultCDN:r="jspm"}={})=>{e=e.replace(/#nobundle/g,"");let s=dt(e,t,r);return s||(t?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,t)=>e.startsWith("http")?e:dt(e,!1,t||ht())||e,cdnLists:{npm:gt,module:ut,gh:ft},checkCDNs:async(e,t)=>{let r=[t,...D.cdnLists.npm].filter(Boolean);for(let s of r)try{if((await fetch(D.getUrl(e,s),{method:"HEAD"})).ok)return s}catch{}return D.cdnLists.npm[0]}},ht=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||D.cdnLists.npm[0]}catch{return D.cdnLists.npm[0]}},dt=(e,t,r)=>{let s=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",ft[0]):e.includes(":")||(e=(r||(t?ut[0]:gt[0]))+":"+e);for(let l of As){let[m,a]=l;if(m.test(e))return e.replace(m,a)+s}return null},As=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:v,getModuleUrl:Is}=D,f=v("@live-codes/browser-compilers@0.7.4/dist/");var bt=v("art-template@4.13.2/lib/template-web.js"),yt=v("@asciidoctor/core@2.2.6/dist/browser/asciidoctor.js"),vt=v("@assemblyscript/loader@0.27.5/umd/index.js");var xt=v("@hatemhosny/astro-internal@0.0.4/");var St=v("@babel/standalone@7.22.4/babel.js"),wt=v("biwascheme@0.8.0/release/biwascheme.js");var ge=v("brython@3.11.2/");var re=v("cherry-cljs@0.0.4/");var fe=v("@live-codes/clio-browser-compiler@0.0.3/public/build/"),Lt=v("coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js");var kt=v("dot@1.1.3/doT.js"),jt=v("ejs@3.1.9/ejs.js");var Ct=v("eta@2.2.0/dist/eta.umd.js");var oe=v("@live-codes/go2js@0.4.0/build/");var he=v("handlebars@4.7.7/dist/"),Et=Is("highlight.js@11.5.1");var be=v("imba@2.0.0-alpha.229/dist/");var _t=v("gh:jscl-project/jscl-project.github.io@efd3aecdba496d132ed650b7b5be976fd0ca278f/jscl.js"),Tt=v("jszip@3.10.1/dist/jszip.js");var Ut=v("liquidjs@10.8.2/dist/liquid.browser.min.js");var F=v("fengari-web@0.1.4/dist/fengari-web.js");var ye="0.6.64",fi=v(`malinajs@${ye}/malina.js`),Mt=v("marked@5.0.4/marked.min.js");var Pt=v("mjml-browser@4.14.1/lib/index.js");var Rt=v("mustache@4.2.0/mustache.js");var ve=v("nunjucks@3.2.4/browser/"),V=v("https://cdn.opalrb.com/opal/1.7.3/"),Ht=v("parinfer@3.13.1/parinfer.js");var N=v("prettier@2.5.1/"),At=v("@prettier/plugin-php@0.18.0/standalone.js");var It=v("requirejs@2.3.6/require.js");var xe=v("riot@7.1.0/");var qt=v("sql-formatter@12.2.1/dist/sql-formatter.min.js"),Bt=v("sql.js@1.8.0/dist/"),Ot=v("@stencil/core@3.2.2/compiler/stencil.js"),Dt=v("stylis@4.2.0/dist/umd/stylis.js");var q=v("tau-prolog@0.3.4/modules/");var Ft=v("twig@1.16.0/twig.min.js"),$t=v("typescript@5.1.3/lib/typescript.js"),Nt=v("uniter@2.18.0/dist/uniter.js");var Se=v("vue@3"),we=v("vue@2"),se=v("vue3-sfc-loader@0.8.4/dist/"),Jt=v("wabt@1.0.32/index.js");var qs={name:"lightningcss",title:"Lightning CSS",isPostcssPlugin:!1,compiler:{url:f+"lightningcss/lightningcss.js",factory:(e,t)=>(self.importScripts(t+"processor-lightningcss-compiler.c9a8575d1089c28538780ba5ba130cb2.js"),self.createLightningcssCompiler())},editor:"style"};var Bs={name:"postcss",title:"Processors:",isPostcssPlugin:!1,compiler:{url:f+"postcss/postcss.js",factory:(e,t)=>(self.importScripts(t+"processor-postcss-compiler.f8787bd5395ada95f6d40279daf71948.js"),self.createPostcssCompiler())},editor:"style",hidden:!0};var Os={name:"autoprefixer",title:"Autoprefixer",isPostcssPlugin:!0,compiler:{url:f+"autoprefixer/autoprefixer.js",factory:e=>self.autoprefixer.autoprefixer({...x("autoprefixer",e)})},editor:"style"},Ds={name:"cssnano",title:"cssnano",isPostcssPlugin:!0,compiler:{url:f+"cssnano/cssnano.js",factory:()=>{let e=self.cssnano.cssnanoPresetDefault().plugins,t=[];for(let r of e){let[s,l]=r;(typeof l>"u"||typeof l=="object"&&!l.exclude||typeof l=="boolean"&&l===!0)&&t.push(s(l))}return t}},editor:"style"};var Fs={name:"postcssPresetEnv",title:"Preset Env",isPostcssPlugin:!0,compiler:{url:f+"postcss-preset-env/postcss-preset-env.js",factory:e=>self.postcssPresetEnv.postcssPresetEnv({autoprefixer:!1,...x("postcssPresetEnv",e)})},editor:"style"},$s={name:"purgecss",title:"PurgeCSS",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:f+"purgecss/purgecss.js",factory:(e,t,r)=>self.purgecss.purgecss({...x("purgecss",e),content:[{raw:`<template>${r.html}
<script>${e.script.content}<\/script></template>`,extension:"html"}]})},editor:"style"},Ns={name:"tokencss",title:"Token CSS",isPostcssPlugin:!0,compiler:{url:f+"tokencss/tokencss.js",factory:e=>{let t=x("tokencss",e);Object.keys(t).length===0&&(t.$schema="https://tokencss.com/schema@0.0.1",t.extends="@tokencss/core/preset");let r=(l,m)=>{let a=JSON.parse(JSON.stringify(l));return Object.keys(m).forEach(i=>{a[i]=typeof m[i]!="object"||Array.isArray(m[i])?m[i]:{...a[i],...m[i]}}),a},s=t.extends?.includes("@tokencss/core/preset")?r(self.tokencss.preset,t):t;return self.tokencss.tokencss({config:s})}},editor:"style"},Js={name:"cssmodules",title:"CSS Modules",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:f+"postcss-modules/postcss-modules.js",factory:(e,t,r)=>{let s=x("cssmodules",e);return self.postcssModules.postcssModules({localsConvention:"camelCase",...s,getJSON(l,m,a){let i=s.addClassesToHTML!==!1,o=s.removeOriginalClasses===!0;i&&(r.html=self.postcssModules.addClassesToHtml(r.html,m,o)),r.compileInfo={...r.compileInfo,cssModules:m,...i?{modifiedHTML:r.html}:{}}}})}},editor:"style"};var Ws={name:"unocss",title:"UnoCSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:f+"unocss/unocss.js",factory:(e,t)=>(self.importScripts(t+"processor-unocss-compiler.aabd93b3d26601936d1f5a0f0c4f7c00.js"),self.createUnocssCompiler())},editor:"style"};var Gs={name:"windicss",title:"Windi CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:f+"windicss/windicss.js",factory:(e,t)=>(self.importScripts(t+"processor-windicss-compiler.2c60d8a9c198f1d4b94016ef99f81429.js"),self.createWindicssCompiler())},editor:"style"};var _=(e="")=>{if(!e)return;let t=e?.toLowerCase();return B.find(r=>r.name===t||r.title.toLowerCase()===t||r.extensions.map(s=>s.toLowerCase()).includes(t))?.name};var A=(e="")=>B.find(t=>t.name===_(e))?.editor;var Wt=async(e,t)=>{window.HighlightJS=window.HighlightJS||(await import(Et)).default;let r=window.HighlightJS.highlightAuto(e,t);return{language:r.language,secondBest:r.secondBest.language}};var Gt={name:"asciidoc",title:"AsciiDoc",compiler:{url:yt,factory:()=>{let e=window.Asciidoctor();return async(t,{config:r})=>e.convert(t,{...x("asciidoc",r)})}},extensions:["adoc","asciidoc","asc"],editor:"markup"};var dl=N+"standalone.js",c={babel:N+"parser-babel.js",glimmer:N+"parser-glimmer.js",html:N+"parser-html.js",markdown:N+"parser-markdown.js",postcss:N+"parser-postcss.js",php:At,pug:f+"prettier/parser-pug.js"};var zt={name:"babel",title:"Babel",parser:{name:"babel",pluginUrls:[c.babel,c.html]},compiler:{url:St,factory:()=>async(e,{config:t})=>window.Babel.transform(e,{filename:"script.tsx",presets:[["env",{modules:!1}],"typescript","react"],...x("babel",t)}).code},extensions:["es","babel"],editor:"script",editorLanguage:"typescript"};var Xt={name:"css",title:"CSS",info:!1,parser:{name:"css",pluginUrls:[c.postcss]},compiler:{factory:()=>async e=>e},extensions:["css"],editor:"style"};var Yt={name:"haml",title:"Haml",compiler:{url:f+"clientside-haml-js/haml.js",factory:(e,t)=>(self.importScripts(t+"lang-haml-compiler.8e0f4fea3a8fefc8259ca8d6f0768a72.js"),self.createHamlCompiler())},extensions:["haml"],editor:"markup"};var Vt={name:"html",title:"HTML",info:!1,parser:{name:"html",pluginUrls:[c.html]},compiler:{factory:()=>async e=>e},extensions:["html","htm"],editor:"markup"};var Kt={name:"javascript",title:"JS",longTitle:"JavaScript",info:!1,parser:{name:"babel",pluginUrls:[c.babel,c.html]},compiler:{factory:()=>async e=>e},extensions:["js"],editor:"script"};var Zt={name:"jsx",title:"JSX",parser:{name:"babel",pluginUrls:[c.babel,c.html]},compiler:"typescript",extensions:["jsx"],editor:"script",editorLanguage:"javascript"};var Qt={name:"tsx",title:"TSX",parser:{name:"babel-ts",pluginUrls:[c.babel,c.html]},compiler:"typescript",extensions:["tsx"],editor:"script",editorLanguage:"typescript"};var er={name:"less",title:"Less",parser:{name:"less",pluginUrls:[c.postcss]},compiler:{url:f+"less/less.js",factory:()=>async(e,{config:t})=>(await window.less.render(e,{...x("less",t)})).css},extensions:["less"],editor:"style"};var tr={name:"markdown",title:"Markdown",parser:{name:"markdown",pluginUrls:[c.markdown,c.html]},compiler:{url:Mt,factory:()=>async(e,{config:t})=>window.marked.parse(e,{headerIds:!1,mangle:!1,...x("markdown",t)})},extensions:["md","markdown","mdown","mkdn"],editor:"markup"};var K=async(e,t,r,s={},l=self)=>new Promise(m=>{if(!e||!t||!r)return m(e||"");let a=async function(i){let o=i.data.payload;i.data.trigger==="compileInCompiler"&&o?.content===e&&o?.language===t&&(l.removeEventListener("message",a),m(o.compiled))};l.addEventListener("message",a),l.postMessage({type:"compileInCompiler",payload:{content:e,language:t,config:r,options:s}})});var zs=async(e,{config:t,worker:r})=>new Promise(async s=>{if(!e)return s("");let[l,{default:m}]=await Promise.all([import(f+"mdx/mdx.js"),import(f+"remark-gfm/remark-gfm.js")]),a=(await l.compile(e,{remarkPlugins:[m],...x("mdx",t)})).value,o=(h=>h.replace(/, {[^}]*} = _components/g,"").replace(/const {[^:]*} = props.components[^;]*;/g,""))(a),n=`import React from "react";
import { createRoot } from "react-dom/client";
${me(o,!1)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`,p=await K(n,"jsx",t,{},r);s(`<div id="__livecodes_mdx_root__"></div><script type="module">${p}<\/script>`)}),rr={name:"mdx",title:"MDX",parser:{name:"markdown",pluginUrls:[c.markdown,c.html]},compiler:{factory:()=>async e=>e,runOutsideWorker:zs,compiledCodeLanguage:"javascript"},extensions:["mdx"],editor:"markup",editorLanguage:"markdown"};var or={name:"pug",title:"Pug",parser:{name:"pug",pluginUrls:[c.pug]},compiler:{url:f+"pug/pug.min.js",factory:(e,t)=>(self.importScripts(t+"lang-pug-compiler.6b93c9c73ccadec5e38caa8ec77d3900.js"),self.createPugCompiler())},extensions:["pug","jade"],editor:"markup"};var sr={name:"scss",title:"SCSS",parser:{name:"scss",pluginUrls:[c.postcss]},compiler:{url:f+"sass/sass.js",factory:(e,t)=>(self.importScripts(t+"lang-scss-compiler.712bd4672051205ef090643fa8dd8b68.js"),self.createScssCompiler())},extensions:["scss"],editor:"style"};var ar={name:"sass",title:"Sass",compiler:"scss",extensions:["sass"],editor:"style"};var nr={name:"svelte",title:"Svelte",parser:{name:"html",pluginUrls:[c.html,c.babel]},compiler:{url:f+"svelte/svelte-compiler.min.js",factory:(e,t)=>(self.importScripts(t+"lang-svelte-compiler.069bfb65fda860a697774c930b5d091c.js"),self.createSvelteCompiler())},extensions:["svelte"],editor:"script",editorLanguage:"html"};var ir={name:"stylus",title:"Stylus",compiler:{url:f+"stylus/stylus.min.js",factory:()=>async e=>window.stylus.render(e)},extensions:["styl"],editor:"style"};var Z={target:"es2015",jsx:"react",allowUmdGlobalAccess:!0,esModuleInterop:!0},lr={name:"typescript",title:"TS",longTitle:"TypeScript",parser:{name:"babel-ts",pluginUrls:[c.babel,c.html]},compiler:{url:$t,factory:()=>async(e,{config:t,language:r})=>window.ts.transpile(e,{...Z,...x("typescript",t),...x(r,t)})},extensions:["ts","typescript"],editor:"script"};var Xs=se+"vue3-sfc-loader.js",cr={name:"vue",title:"Vue 3",longTitle:"Vue 3 SFC",parser:{name:"html",pluginUrls:[c.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVueCompiler()),scripts:[Se,Xs],imports:{vue:Se+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue","vue3"],editor:"script",editorLanguage:"html"};var Ys=se+"vue2-sfc-loader.js",pr={name:"vue2",title:"Vue 2",longTitle:"Vue 2 SFC",parser:{name:"html",pluginUrls:[c.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVue2Compiler()),scripts:[we,Ys],imports:{vue:we+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue2"],editor:"script",editorLanguage:"html"};var mr={name:"stencil",title:"Stencil",parser:{name:"babel-ts",pluginUrls:[c.babel,c.html]},compiler:{url:Ot,factory:()=>async(e,{config:t})=>(await window.stencil.transpile(e,{sourceMap:!1,target:"es2019",...x("stencil",t)})).code,types:{"@stencil/core":{url:f+"types/stencil-core.d.ts",declareAsModule:!1}}},extensions:["stencil.tsx"],editor:"script",editorLanguage:"typescript"};var dr={name:"coffeescript",title:"Coffee",longTitle:"CoffeeScript",compiler:{url:Lt,factory:()=>async(e,{config:t})=>window.CoffeeScript.compile(e,{bare:!0,...x("coffeescript",t)})},extensions:["coffee"],editor:"script"};var ur={name:"livescript",title:"LiveScript",compiler:{url:f+"livescript/livescript-min.js",factory:()=>async(e,{config:t})=>window.require("livescript").compile(e,{bare:!0,...x("livescript",t)}),scripts:[f+"livescript/prelude-browser-min.js"]},extensions:["ls"],editor:"script"};var Vs=f+"assemblyscript/assemblyscript.js",gr={name:"assemblyscript",title:"AS",longTitle:"AssemblyScript",parser:{name:"babel-ts",pluginUrls:[c.babel]},compiler:{url:Vs,factory:(e,t)=>(self.importScripts(t+"lang-assemblyscript-compiler.8caa06a4a75b2f2d32150d1c4cd03b95.js"),self.createAssemblyscriptCompiler()),scripts:({baseUrl:e})=>[vt,e+"lang-assemblyscript-script.a8afe51d73d1fa349c7874dce9f2108f.js"],scriptType:"application/wasm-uint8",compiledCodeLanguage:"wat",types:{assemblyscript:{url:f+"types/assemblyscript.d.ts",declareAsModule:!1,autoload:!0}}},extensions:["as","ts"],editor:"script",editorLanguage:"typescript"};var Ks=ge+"brython.min.js",Zs=ge+"brython_stdlib.js",fr={name:"python",title:"Python",compiler:{factory:()=>async e=>e,scripts:({compiled:e,config:t})=>{let{autoloadStdlib:r,...s}=x("python",t),l=/^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm,m=r!==!1&&e.match(l)?[Zs]:[],a=`window.addEventListener("load", () => {brython(${JSON.stringify(s)})})`,i="data:text/plain;base64,"+btoa(a);return[Ks,...m,i]},scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py"],editor:"script"};var Qs=(e,t={})=>Array.from(new Set([...e.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map(r=>r[1]).map(r=>r.split("/")[0]).filter(r=>t.hasOwnProperty(r)||r!=="opal").map(r=>t[r]||`${V+r}.min.js`))),hr={name:"ruby",title:"Ruby",compiler:{url:V+"opal.min.js",factory:()=>(importScripts(V+"opal-parser.min.js"),self.Opal.config.unsupported_features_severity="ignore",self.Opal.load("opal-parser"),async(e,{config:t})=>{let{autoloadStdlib:r,requireMap:s,...l}=x("ruby",t);return self.Opal.compile(e,l)}),scripts:({compiled:e,config:t})=>{let{autoloadStdlib:r,requireMap:s}=x("ruby",t),l=Qs(e,s),m=r!==!1?l:[];return[V+"opal.min.js",...m]}},extensions:["rb"],editor:"script"};var br={name:"php",title:"PHP",parser:{name:"php",pluginUrls:[c.php]},compiler:{factory:()=>async e=>(e=e.trim(),e.startsWith("<?php")&&(e=e.replace("<?php","/* <?php */"),e.endsWith("?>")&&(e=e.replace("?>","/* ?> */"))),e),scripts:[Nt],deferScripts:!0,scriptType:"text/x-uniter-php",compiledCodeLanguage:"php"},extensions:["php"],editor:"script"};var yr={name:"perl",title:"Perl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[f+"perlito/perlito5.min.js",e+"lang-perl-script.1f606d886aeb724510a595d45cbaf555.js"],scriptType:"text/perl"},extensions:["pl","pm"],editor:"script"};var ea=f+"lua-fmt/lua-fmt.js",ke={factory:()=>(self.importScripts(ea),async(e,t)=>({formatted:self.luaFmt.formatText(e),cursorOffset:t}))},vr={name:"lua",title:"Lua",formatter:ke,compiler:{factory:()=>async e=>e,scripts:[F],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["lua"],editor:"script"};var J=()=>{let e=Ht;return self.importScripts(e),async t=>({formatted:window.parinfer.parenMode(t).text,cursorOffset:0})},xr={name:"commonlisp",title:"Lisp",longTitle:"Common Lisp",formatter:{factory:J},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[_t,e+"lang-commonlisp-script.0c86dfce5f8509928ccf51ff666c7b4b.js"],scriptType:"text/commonlisp",compiledCodeLanguage:"commonlisp",inlineScript:`

    `},extensions:["lisp","common-lisp"],editor:"script",editorLanguage:"scheme"};var Sr={name:"scheme",title:"Scheme",formatter:{factory:J},compiler:{factory:()=>async e=>e,scripts:[wt],scriptType:"text/biwascheme",compiledCodeLanguage:"scheme"},extensions:["scm"],editor:"script"};var wr={name:"solid",title:"Solid",parser:{name:"babel",pluginUrls:[c.babel,c.html]},compiler:{dependencies:["babel"],url:f+"babel-preset-solid/babel-preset-solid.js",factory:(e,t)=>(self.importScripts(t+"lang-solid-compiler.4edfa4ed39f071836693c79f40f0d9b6.js"),self.createSolidCompiler()),types:{"solid-js":{url:f+"types/solid-js.d.ts",declareAsModule:!1}}},extensions:["solid.jsx"],editor:"script",editorLanguage:"javascript"};var Lr={name:"solid.tsx",title:"Solid (TS)",parser:{name:"babel",pluginUrls:[c.babel,c.html]},compiler:"solid",extensions:["solid.tsx"],editor:"script",editorLanguage:"typescript"};var kr={name:"pyodide",title:"Pyodide",longTitle:"Python (Pyodide)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-python-pyodide-script.d8d4d32ed97521be2e4e35536f468333.js"],liveReload:!0,scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py3"],editor:"script",editorLanguage:"python",largeDownload:!0};var jr={name:"liquid",title:"Liquid",parser:{name:"html",pluginUrls:[c.html]},compiler:{url:Ut,factory:(e,t)=>(self.importScripts(t+"lang-liquid-compiler.a8cb47f76c1808bdc02fcae94ff8025f.js"),self.createLiquidCompiler())},extensions:["liquid","liquidjs"],editor:"markup",editorLanguage:"html"};var Cr={name:"ejs",title:"EJS",parser:{name:"html",pluginUrls:[c.html]},compiler:{url:jt,factory:(e,t)=>(self.importScripts(t+"lang-ejs-compiler.1f9bfcb931f9f068dbdca2155fde7947.js"),self.createEjsCompiler())},extensions:["ejs"],editor:"markup",editorLanguage:"html"};var ta=he+"handlebars.min.js",um=he+"handlebars.runtime.min.js",Er={name:"handlebars",title:"Handlebars",parser:{name:"glimmer",pluginUrls:[c.glimmer]},compiler:{url:ta,factory:(e,t)=>(self.importScripts(t+"lang-handlebars-compiler.be7818c60da12a1729c425a770910e92.js"),self.createHandlebarsCompiler())},extensions:["hbs","handlebars"],editor:"markup",editorLanguage:"html"};var _r={name:"dot",title:"doT",parser:{name:"html",pluginUrls:[c.html]},compiler:{url:kt,factory:(e,t)=>(self.importScripts(t+"lang-dot-compiler.557d6ca7c515de1e84f17c4842ec71cd.js"),self.createDotCompiler())},extensions:["dot"],editor:"markup",editorLanguage:"html"};var ra=ve+"nunjucks.min.js",km=ve+"nunjucks-slim.min.js",Tr={name:"nunjucks",title:"Nunjucks",parser:{name:"html",pluginUrls:[c.html]},compiler:{url:ra,factory:(e,t)=>(self.importScripts(t+"lang-nunjucks-compiler.055d011de44eb181acbea8b1a49a7ce2.js"),self.createNunjucksCompiler())},extensions:["njk","nunjucks"],editor:"markup",editorLanguage:"html"};var Ur={name:"go",title:"Go",formatter:{factory:()=>(importScripts(oe+"go2js-format.js"),async e=>{if(!e)return{formatted:"",cursorOffset:0};let[t,r]=globalThis.go2jsFormat(e);return r?(console.error(r),{formatted:e,cursorOffset:0}):{formatted:t,cursorOffset:0}})},compiler:{url:oe+"go2js-compile.js",factory:()=>e=>new Promise(t=>{if(!e){t("");return}globalThis.go2jsCompile(e,oe,(r,s)=>{r?(console.error(r),t("")):t(s)})})},extensions:["go","golang"],editor:"script"};var oa=async(e,{baseUrl:t,language:r})=>{let{rescriptCompiler:s}=await import(t+"lang-rescript-compiler-esm.2b9d0781c004e55c6bc74ba441a3e29e.js");return s(e,{baseUrl:t,language:r})},je=(e,t)=>(importScripts(e+"lang-rescript-formatter.187ba934d1c84704a2717e3cf411e618.js"),self.createRescriptFormatter(e,t)),Mr={name:"rescript",title:"ReScript",formatter:{factory:je},compiler:{factory:()=>async e=>e,runOutsideWorker:oa,scriptType:"module"},extensions:["res","resi"],editor:"script",editorLanguage:"javascript"};var Pr={name:"reason",title:"Reason",formatter:{factory:je},compiler:"rescript",extensions:["re","rei"],editor:"script",editorLanguage:"javascript"};var Rr={name:"ocaml",title:"OCaml",compiler:"rescript",extensions:["ml","mli"],editor:"script",editorLanguage:"javascript"};var sa=f+"wast-refmt/wast-refmt.js",aa="application/wasm-uint8",Hr={name:"wat",title:"WAT",longTitle:"WebAssembly Text",formatter:{factory:()=>(importScripts(sa),async e=>{let t=e;try{t=self.wastRefmt.format(e)}catch(r){console.warn("failed parsing WAT",r)}return{formatted:t,cursorOffset:0}})},compiler:{url:Jt,factory:(e,t)=>(self.importScripts(t+"lang-wat-compiler.eea1bd41c9dee36246a40e3aed8394fd.js"),self.createWatCompiler()),scripts:({baseUrl:e})=>[e+"lang-wat-script.29d1634ac55c93301ce5fe2a25906bd0.js"],scriptType:aa,compiledCodeLanguage:"Binary"},extensions:["wat","wast","webassembly","wasm"],editor:"script"};var na=xe+"riot+compiler.min.js",ia=xe+"riot.min.js",Ar={name:"riot",title:"Riot.js",parser:{name:"html",pluginUrls:[c.html,c.babel]},compiler:{url:na,factory:(e,t)=>(self.importScripts(t+"lang-riot-compiler.1f8f0884684f258ddc3c50c8094e7e2a.js"),self.createRiotCompiler()),scripts:[ia],scriptType:"module"},extensions:["riot","riotjs"],editor:"script",editorLanguage:"html"};var la="application/json",Ir={name:"sql",title:"SQL",formatter:{factory:()=>(importScripts(qt),async e=>({formatted:await self.sqlFormatter.format(e,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{url:Bt+"sql-wasm.js",factory:(e,t)=>(self.importScripts(t+"lang-sql-compiler.fa10aaaaf82d9d6a8cc8ebce5c63c3bc.js"),self.createSqlCompiler()),scripts:({baseUrl:e})=>[e+"lang-sql-script.0c35ad4ef2960bb91f816273b91f6c33.js"],scriptType:la,compiledCodeLanguage:"json"},extensions:["sql","sqlite","sqlite3"],editor:"script"};var Q=f+"react-native-web/react-native-web.js",qr={name:"react-native",title:"RN",longTitle:"React Native",parser:{name:"babel",pluginUrls:[c.babel,c.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:r})=>window.ts.transpile(e,{...Z,...x("typescript",t),...x(r,t)}),imports:{react:Q,"react-native":Q}},extensions:["react-native.jsx"],editor:"script",editorLanguage:"javascript"};var Br={name:"react-native-tsx",title:"RN (TSX)",longTitle:"React Native (TSX)",parser:{name:"babel",pluginUrls:[c.babel,c.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:r})=>window.ts.transpile(e,{...Z,...x("typescript",t),...x(r,t)}),imports:{react:Q,"react-native":Q}},extensions:["react-native.tsx"],editor:"script",editorLanguage:"typescript"};var Or={name:"blockly",title:"Blockly",compiler:{factory:()=>async(e,{options:t})=>t?.blockly?.js||""},extensions:["blockly.xml","xml"],editor:"script",editorLanguage:"xml"};var Dr={name:"twig",title:"Twig",parser:{name:"html",pluginUrls:[c.html]},compiler:{url:Ft,factory:(e,t)=>(self.importScripts(t+"lang-twig-compiler.39e618d8e11e20b2f85ea15294864c17.js"),self.createTwigCompiler())},extensions:["twig"],editor:"markup",editorLanguage:"html"};var ca=xt+"compiler.min.js",Fr={name:"astro",title:"Astro",parser:{name:"html",pluginUrls:[c.html,c.babel]},compiler:{url:ca,factory:(e,t)=>(self.importScripts(t+"lang-astro-compiler.8407bb9d7fa8feeae708ab9b6cd12739.js"),self.createAstroCompiler())},extensions:["astro"],editor:"markup"};var $r={name:"malina",title:"Malina.js",parser:{name:"html",pluginUrls:[c.html,c.babel]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-malina-compiler.a0adf0552670bef0d7989fd7b78dfbb3.js"),self.createMalinaCompiler()),imports:{"malinajs/runtime.js":`https://jspm.dev/malinajs@${ye}/runtime.js`}},extensions:["xht"],editor:"script",editorLanguage:"html"};var pa=f+"jscpp/JSCPP.es5.min.js",Nr={name:"cpp",title:"C++",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[pa,e+"lang-cpp-script.1baeb187434ba3ed6b23b718933338ad.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp"},extensions:["cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script"};var Jr={name:"julia",title:"Julia",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-julia-script.fe987901a797bc777c685f0daf4357d5.js"],liveReload:!0,scriptType:"text/julia",compiledCodeLanguage:"julia"},extensions:["jl"],editor:"script",largeDownload:!0};var Wr={name:"clang",title:"Clang",longTitle:"C/C++ (Clang)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-cpp-clang-script.4816be0f52e578d04c317645169dc4cb.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp",liveReload:!0},extensions:["clang.cpp","clang","cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script",editorLanguage:"cpp",largeDownload:!0};var Gr={name:"tcl",title:"Tcl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[It,e+"lang-tcl-script.3f6a624f992c65a3fd69f999e53fcbd7.js"],scriptType:"text/tcl",compiledCodeLanguage:"tcl"},extensions:["tcl"],editor:"script"};var zr={name:"prolog",title:"Prolog",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[q+"core.js",q+"charsio.js",q+"dom.js",q+"format.js",q+"js.js",q+"lists.js",q+"os.js",q+"promises.js",q+"random.js",q+"statistics.js",e+"lang-prolog-script.2780539e5f2bc8edb4aedd5cf57143e7.js"],scriptType:"text/prolog",compiledCodeLanguage:"prolog"},extensions:["prolog.pl","prolog"],editor:"script"};var Xr={name:"clio",title:"Clio",compiler:{url:fe+"compile.js",factory:(e,t)=>(self.importScripts(t+"lang-clio-compiler.75c879c608b8073530c584f64896740a.js"),self.createClioCompiler()),scripts:[fe+"exec.js"]},extensions:["clio"],editor:"script",editorLanguage:"coffeescript"};var Yr={name:"richtext",title:"Rich Text",longTitle:"Rich Text Editor",compiler:{factory:()=>async(e,{config:t})=>t.markup.content||"",styles:["quill.8e9d74c74d2c8aaa5d849678c215cf7e.css"]},extensions:["rte","rte.html","rich"],editor:"markup",editorLanguage:"html"};var ma=async(e,{baseUrl:t,config:r})=>{let{diagramsCompiler:s}=await import(t+"lang-diagrams-compiler-esm.468dd2b25c78af5f2902eb20a4571be5.js");return s(e,{config:r})},Vr={name:"diagrams",title:"Diagrams",parser:{name:"html",pluginUrls:[c.html]},compiler:{factory:()=>async e=>e||"",runOutsideWorker:ma},extensions:["diagrams","diagram","graph","plt"],editor:"markup",editorLanguage:"html"};var Kr={name:"imba",title:"Imba",compiler:{url:be+"compiler.js",factory:(e,t)=>(self.importScripts(t+"lang-imba-compiler.4f3b1e55a23cb0384355b5dca2ab42bf.js"),self.createImbaCompiler()),imports:{imba:be+"imba.mjs"}},extensions:["imba"],editor:"script"};var Zr={name:"mustache",title:"Mustache",parser:{name:"glimmer",pluginUrls:[c.glimmer]},compiler:{url:Rt,factory:(e,t)=>(self.importScripts(t+"lang-mustache-compiler.93b843bf816add490577db24db6270c6.js"),self.createMustacheCompiler())},extensions:["mustache"],editor:"markup",editorLanguage:"html"};var Qr={name:"art-template",title:"art",longTitle:"art-template",parser:{name:"html",pluginUrls:[c.html]},compiler:{url:bt,factory:(e,t)=>(self.importScripts(t+"lang-art-template-compiler.4716dcf439c98cecc6d924d76392deb3.js"),self.createArtTemplateCompiler())},extensions:["art","art-template"],editor:"markup",editorLanguage:"html"};var eo={name:"r",title:"R",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-r-script-esm.42cba088ad6175ae88305ac37d440eae.js"],inlineScript:`
    livecodes.r = livecodes.r || {config: {}};
    addEventListener('load', async () => {
      await livecodes.r.loaded;
      if (livecodes.r.config?.autoEvaluate !== false) {
        await livecodes.r.run();
      }
      // reset config before next load
      livecodes.r.config = {};
    });
    `,liveReload:!0,scriptType:"text/r",compiledCodeLanguage:"r"},extensions:["r","rlang","rstats"],editor:"script",largeDownload:!0};var da=f+"civet/civet.js",to={name:"civet",title:"Civet",compiler:{url:da,factory:()=>async e=>window.civet.compile(e,{js:!0})},extensions:["civet"],editor:"script",editorLanguage:"coffeescript"};var ro={name:"fennel",title:"Fennel",formatter:{factory:J},compiler:{url:F,factory:(e,t)=>(self.importScripts(t+"lang-fennel-compiler.1f24a9823f590b00c793a67b29f61e83.js"),self.createFennelCompiler()),scripts:[F],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["fnl"],editor:"script",editorLanguage:"scheme"};var oo={name:"teal",title:"Teal",formatter:ke,compiler:{url:F,factory:(e,t)=>(self.importScripts(t+"lang-teal-compiler.1a0bb35b51557f740f6379336bc5a8e1.js"),self.createTealCompiler()),scripts:[F],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["tl"],editor:"script",editorLanguage:"lua"};var so={name:"stylis",title:"Stylis",compiler:{url:Dt,factory:()=>async e=>{let{compile:t,serialize:r,stringify:s,middleware:l,prefixer:m}=window.stylis;return r(t(e),l([m,s]))}},extensions:["stylis"],editor:"style",editorLanguage:"scss"};var ao={name:"flow",title:"Flow",parser:{name:"babel-flow",pluginUrls:[c.babel,c.html]},compiler:{url:f+"flow-remove-types/flow-remove-types.js",factory:()=>async(e,{config:t})=>window.flowRemoveTypes.transpile(e,{all:!0,...x("flow",t)}).toString()},extensions:["flow"],editor:"script",editorLanguage:"typescript"};var no={name:"mjml",title:"MJML",parser:{name:"html",pluginUrls:[c.html]},compiler:{url:Pt,factory:()=>async(e,{config:t})=>{if(!e.trim())return"";let{html:r,errors:s}=self.mjml(e,x("mjml",t));return s?.forEach(l=>{console.warn(l.formattedMessage)}),r}},extensions:["mjml"],editor:"markup",editorLanguage:"xml"};var io={name:"sucrase",title:"Sucrase",parser:{name:"babel",pluginUrls:[c.babel,c.html]},compiler:{url:f+"sucrase/sucrase.js",factory:()=>async(e,{config:t})=>window.sucrase.transform(e,{transforms:["jsx","typescript"],...x("sucrase",t)}).code},extensions:["sucrase"],editor:"script",editorLanguage:"typescript"};var lo={name:"eta",title:"Eta",parser:{name:"html",pluginUrls:[c.html]},compiler:{url:Ct,factory:(e,t)=>(self.importScripts(t+"lang-eta-compiler.ad84b8336e66949b7ecb9ad4f792e059.js"),self.createEtaCompiler())},extensions:["eta"],editor:"markup",editorLanguage:"html"};var W=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.io")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost"))),co=e=>new RegExp(/^(?:(?:http|https):\/\/(?:\w+.)?)(githubusercontent.com|jsbin.com|)\/(?:.*)/g).test(e);var fa="https://api.livecodes.io/cors?url=",ha="https://api.allorigins.win/raw?url=",ae={fetch:async(e,t)=>{let r=(W()?fa:ha)+encodeURIComponent(e);return co(e)?$(r,t):$(e,t).catch(()=>$(r,t))}};var mo="https://dpaste.com/",ba="https://dpaste.com/api/v2/",uo="https://api2.livecodes.io/share",go={getProject:async e=>{try{let t=await fetch(mo+e+".txt");return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{try{let t=await fetch(ba,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return t.ok?(await t.text()).replace(mo,""):""}catch{return""}}},ya={getProject:async e=>{if(e.length<11)return go.getProject(e);if(!W())return{};try{let t=await fetch(uo+"?id="+e);return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{if(!W())return"";try{let t=await fetch(uo,{method:"POST",mode:"cors",body:JSON.stringify(e)});return t.ok?t.text():""}catch{return""}}},fo=W()?ya:go;var ho={name:"clojurescript",title:"CLJS (cherry)",longTitle:"ClojureScript (cherry)",formatter:{factory:J},compiler:{url:re+"lib/cherry.umd.js",factory:()=>async(e,{config:t,options:r})=>{let s=self.CherryCljs.compileString(e);return e.includes("#jsx")?K(s,"jsx",t,r):s},imports:{"cherry-cljs":re+"index.js","cherry-cljs/cljs.core.js":re+"cljs.core.js"}},extensions:["cljs","clj","cljc","edn","clojure"],editor:"script",editorLanguage:"clojure"};var B=[Vt,tr,rr,Fr,or,Gt,Yt,Zr,Er,Cr,lo,Tr,jr,_r,Dr,Qr,no,Vr,Yr,Xt,sr,ar,er,ir,so,Kt,lr,ao,zt,io,Zt,Qt,qr,Br,cr,pr,nr,mr,wr,Lr,Ar,$r,dr,ur,to,Xr,Kr,Mr,Pr,Rr,fr,kr,eo,hr,Ur,br,Nr,Wr,yr,vr,oo,ro,Jr,Sr,xr,ho,Gr,gr,Hr,Ir,zr,Or];var I=e=>{try{return e.startsWith("https://")?new URL(e):new URL("https://"+e)}catch{return}},O=(e,t)=>{if(e.length===0)return{};if(Object.keys(t).some(_))return Object.keys(t).reduce((o,n)=>{let p=_(n);if(!p)return o;let h=e.find(L=>L?.filename===t[n]);if(!h)return o;let w=A(p);return!w||o[w]?o:{...o,[w]:{language:p,content:h.content}}},{});let s=e.map(o=>{let n=o.filename.split(".")[o.filename.split(".").length-1],p=o.language||_(n)||"html",h=o.editorId||A(p)||"markup";return{...o,language:p,editorId:h}}).sort((o,n)=>{if(o.editorId===n.editorId&&(o.editorId==="markup"&&o.filename.toLowerCase().startsWith("index.")||o.editorId==="style"&&o.filename.toLowerCase().startsWith("style.")||o.editorId==="script"&&o.filename.toLowerCase().startsWith("script.")))return-1;if(o.editorId===n.editorId&&(n.editorId==="markup"&&n.filename.toLowerCase().startsWith("index.")||n.editorId==="style"&&n.filename.toLowerCase().startsWith("style.")||n.editorId==="script"&&n.filename.toLowerCase().startsWith("script.")))return 1;if(o.editorId===n.editorId&&o.editorId==="markup"){if(o.filename.toLowerCase().startsWith("readme"))return 1;if(n.filename.toLowerCase().startsWith("readme"))return-1}return o.language===n.language?o.filename.localeCompare(n.filename):B.findIndex(p=>p.name===o.language)-B.findIndex(p=>p.name===n.language)}).reduce((o,n)=>n.filename.toLowerCase().match(new RegExp(".(test|spec)\\.[jt]sx?"))?o.tests?.content?o:{...o,tests:{language:n.language,content:n.content}}:!n.editorId||o[n.editorId]?o:{...o,[n.editorId]:{language:n.language,content:n.content}},{}),l=[],m=e.find(o=>o.filename==="styles");if(m?.content)try{let o=[];new DOMParser().parseFromString(m.content,"text/html").querySelectorAll('link[rel="stylesheet"]').forEach(h=>{o.push(h.href)}),o.length===0&&m.content.trim().split(`
`).forEach(h=>{o.push(h)}),o.forEach(h=>{try{l.push(new URL(h).href)}catch{}})}catch{}let a=[],i=e.find(o=>o.filename==="scripts");if(i?.content)try{let o=[];new DOMParser().parseFromString(i.content,"text/html").querySelectorAll("script").forEach(h=>{o.push(h.src)}),o.length===0&&i.content.trim().split(`
`).forEach(h=>{o.push(h)}),o.forEach(h=>{try{a.push(new URL(h).href)}catch{}})}catch{}return{...s,stylesheets:l,scripts:a}},M={github:/^(?:(?:http|https):\/\/)?github.com\/(?:.*)/g,githubGist:/^(?:(?:http|https):\/\/)?gist.github.com(?:\/\S*)?\/(\w+)/g,gitlab:/^(?:(?:http|https):\/\/)?gitlab.com\/(?:.*)/g,codepen:/^(?:(?:http|https):\/\/)?codepen.io\/(\w+)\/pen\/(\w+)/g,jsbin:/^(?:(?:(?:http|https):\/\/)?(?:\w+.)?)?jsbin.com\/((\w)+(\/\d)?)(?:.*)/g};var bo=(e,t=new RegExp(M.codepen))=>t.test(e),ne={markup:["html","markdown","haml"],style:["css","scss","sass","less","stylus"],script:["javascript","typescript","coffeescript","livescript"]},Sa=async(e,t)=>{let[r,s,l]=new RegExp(M.codepen).exec(e)||[];if(!s||!l)return{};let m=`https://codepen.io/${s}/pen/${l}`,a=ne[t][1],i=ne[t][0];i==="javascript"&&(i="js");let[o,n]=await Promise.all([`${m}.${a}`,`${m}.${i}`].map(w=>fetch(w).then(L=>L.text()))),p=await Wt(o,ne[t]);return{language:o.trim()!==n.trim()&&p.language===ne[t][0]?p.secondBest:p.language,code:o}},yo=async e=>{try{let t=["markup","style","script"],[r,s,l]=await Promise.all(t.map(m=>Sa(e,m)));return{markup:{language:_(r.language)||"html",content:r.code||""},style:{language:_(s.language)||"css",content:s.code||""},script:{language:_(l.language)||"javascript",content:l.code||""}}}catch(t){return console.error("Cannot fetch: "+e),console.error(t),{}}};var So=e=>e.startsWith("dom/"),vo=e=>Object.keys(e).reduce((t,r)=>{let s=_(r);if(!s)return t;let l=A(s);return!l||t[l]?t:{...t,[l]:{language:s,selector:e[r]}}},{}),xo=(e,t)=>{try{let r=e.querySelector(t);return r?at(r.innerHTML.trim()+`
`||""):void 0}catch{return}},ie=async(e,t,r)=>{e.startsWith("dom/")&&(e=e.slice(4));let l=new DOMParser().parseFromString(e,"text/html"),m=r.activeEditor,a=B.map(b=>b.name).reduce((b,y)=>({...b,[y]:`.livecodes [data-lang="${y}"]`}),{}),i=Object.keys(t).filter(b=>b.endsWith("-selector")).reduce((b,y)=>({...b,[y.replace("-selector","")]:t[y]}),{}),o=["markup","style","script"].reduce((b,y)=>r[y].language&&r[y].selector?{...b,[y]:{language:r[y].language,selector:r[y].selector}}:b,{}),n=vo(a),p=vo(i),h={...n,...o,...p},w=Object.keys(h).reduce((b,y)=>{let E=xo(l,h[y].selector);return E===void 0?b:{...b,[y]:{language:h[y].language,content:E}}},{activeEditor:m});if(Object.keys(w).length===4)return w;let k={...Object.keys(a).reduce((b,y)=>{let E=A(y);if(!E||w[E])return b;let S=xo(l,a[y]);return S===void 0?b:{...b,[E]:{language:y,content:S}}},{activeEditor:m}),...w};return Object.keys(k).filter(b=>b!=="activeEditor").length===0?{}:k};var G=(e,t)=>({Accept:`application/vnd.github.v3${t?"."+t:""}+json`,"Content-Type":"application/json",Authorization:"token "+e.token});var Ce=(e,t=new RegExp(M.github))=>{if(t.test(e))try{let s=wa(e).pathname.split("/");return s[3]==="tree"||s.length===3}catch{return}},wa=e=>e.startsWith("https://")?new URL(e):new URL("https://"+e),wo=async(e,t,r)=>{try{let l=(e.startsWith("https://")?new URL(e):new URL("https://"+e)).pathname.split("/"),m=l.length===3,a=l[1],i=l[2],o,n="";m?o=await fetch(`https://api.github.com/repos/${a}/${i}`,{...r?{headers:G(r)}:{}}).then(k=>k.json()).then(k=>k.default_branch):(o=l[4],n=l.slice(5,l.length).join("/"));let p=`https://api.github.com/repos/${a}/${i}/git/trees/${o}?recursive=true`,w=(await fetch(p,{...r?{headers:G(r)}:{}}).then(k=>k.json()).then(k=>k.tree)).filter(k=>m?k.type==="blob":k.type==="blob"&&k.path.startsWith(n)&&k.path.split("/").length===n.split("/").length+1),L=await Promise.all(Object.values(w).map(async k=>{let b=k.path.split("/")[k.path.split("/").length-1],y=atob(await fetch(k.url,{...r?{headers:G(r)}:{}}).then(E=>E.json()).then(E=>E.content));return{filename:b,content:y}}));return O(L,t)}catch(s){return console.error("Cannot fetch directory: "+e),console.error(s),{}}};var Lo=(e,t=new RegExp(M.github))=>{if(t.test(e))try{return ko(e).pathname.split("/")[3]==="blob"}catch{return}};var ko=e=>e.startsWith("https://")?new URL(e):new URL("https://"+e),La=e=>{let t=e.pathname.split("/"),r=t[1],s=t[2],l=t[4],m=t.slice(5,t.length).join("/"),a=m.split("/")[m.split("/").length-1],i=a.split(".")[a.split(".").length-1]||"md",o=e.hash.split("-"),n=e.hash!==""?Number(o[0].replace("#L","")):-1,p=e.hash!==""&&o.length>1?Number(o[1].replace("L","")):n,h=`https://api.github.com/repos/${r}/${s}/contents/${m}?ref=${l}`;return{user:r,repo:s,ref:l,path:m,filename:a,extension:i,startLine:n,endLine:p,apiUrl:h}},ka=async(e,t)=>{let{apiUrl:r,extension:s,startLine:l,endLine:m}=e;try{let a=await fetch(r,{...t?{headers:G(t)}:{}}).then(p=>p.json()).then(p=>atob(p.content)),i=l>0?a.split(`
`).slice(l-1,m).join(`
`):a,o=_(s)||"html",n=A(o)||"markup";return{[n]:{language:o,content:i},activeEditor:n}}catch{return console.error("Cannot fetch: "+r),{}}},jo=(e,t)=>{let r=ko(e),s=La(r);return ka(s,t)};var Co=(e,t=new RegExp(M.githubGist))=>t.test(e),Eo=async(e,t)=>{try{let r=I(e);if(!r)return{};let s=r.pathname.split("/"),l=s[s.length-1],m="",a=await fetch(`https://api.github.com/gists/${l}`).then(o=>o.json()).then(o=>(m=o.description,o.files)).then(o=>Object.values(o).map(n=>{let p=n.language,h=n.filename.split(".")[n.filename.split(".").length-1],w=_(h)||_(p);return{...n,language:w}})),i=Object.values(a).map(o=>({filename:o.filename,language:o.language,content:o.content}));return{...O(i,t),title:m}}catch(r){return console.error("Cannot fetch gist: "+e),console.error(r),{}}};var _o=(e,t=new RegExp(M.gitlab))=>{if(t.test(e))try{let r=I(e);return r?r.pathname.split("/")[4]==="blob":void 0}catch{return}},ja=async e=>{let t=e.pathname.split("/"),r=t[1],s=t[2],l=t[5],m=t.slice(6,t.length).join("/"),a=m.split(".")[m.split(".").length-1]||"md",i=e.hash.split("-"),o=e.hash!==""?Number(i[0].replace("#L","")):-1,n=e.hash!==""&&i.length>1?Number(i[1].replace("L","")):o,p=await fetch(`${e.origin}/api/v4/projects/${r}%2F${s}`).then(w=>w.json()).then(w=>w.id);return{rawURL:`${e.origin}/api/v4/projects/${p}/repository/files/${encodeURIComponent(m)}/raw?ref=${l}`,extension:a,startLine:o,endLine:n}},Ca=async e=>{let{rawURL:t,extension:r,startLine:s,endLine:l}=await e;try{let m=await fetch(t).then(n=>n.text()),a=s>0?m.split(`
`).slice(s-1,l).join(`
`):m,i=_(r)||"html",o=A(i)||"markup";return{[o]:{language:i,content:a},activeEditor:o}}catch(m){return console.error("Cannot fetch: "+t),console.error(m),{}}},To=nt(I,ja,Ca);var Uo=(e,t=new RegExp(M.gitlab))=>{if(t.test(e))try{let r=I(e);if(!r)return;let s=r.pathname.split("/");return s[4]==="tree"||s.length===3}catch{return}},Mo=async(e,t)=>{try{let r=I(e);if(!r)return{};let s=r.pathname.split("/"),l=s[1],m=s[2],a=await fetch(`${r.origin}/api/v4/projects/${l}%2F${m}`).then(L=>L.json()),i=s[5]||a.default_branch,o=a.id,n=s.slice(6,s.length).join("/"),p=`${r.origin}/api/v4/projects/${o}/repository/tree?per_page=100&ref=${i}&path=${n}`,h=await fetch(p).then(L=>L.json()).then(L=>L.filter(k=>k.type==="blob")),w=await Promise.all(Object.values(h).map(async L=>{let k=L.path.split("/")[L.path.split("/").length-1],b=`${r.origin}/api/v4/projects/${o}/repository/files/${encodeURIComponent(L.path)}/raw?ref=${i}`,y=await fetch(b).then(E=>E.text());return{filename:k,content:y}}));return O(w,t)}catch(r){return console.error("Cannot fetch directory: "+e),console.error(r),{}}};var Po=(e,t=new RegExp(M.gitlab))=>{if(!t.test(e))return;let r=I(e);if(!r)return;let s=r.pathname.split("/");return s[s.length-2]==="snippets"},Ro=async(e,t)=>{try{let r=I(e);if(!r)return{};let s=r.pathname.split("/"),l=s[s.length-1],m="",a=await fetch(`${r.origin}/api/v4/snippets/${l}`).then(o=>o.json()).then(o=>(m=o.title,o.files)),i=await Promise.all(Object.values(a).map(async o=>{let n=o.path,h=I(o.raw_url)?.pathname.split("/")[5]||"main",w=await fetch(`${r.origin}/api/v4/snippets/${l}/files/${h}/${encodeURIComponent(n)}/raw`).then(L=>L.text());return{filename:n,content:w}}));return{...O(i,t),title:m}}catch(r){return console.error("Cannot fetch snippet: "+r),{}}};var Ho=(e,t=new RegExp(M.jsbin))=>t.test(e),Ao=async e=>{let t=new RegExp(M.jsbin).exec(e)?.[1];if(!t)return{};let r=`https://jsbin.com/api/${t}`;try{let s=await ae.fetch(r).then(l=>l.json());return{markup:{language:_(s.settings?.processors?.html)||"html",content:s.html||""},style:{language:_(s.settings?.processors?.css)||"css",content:s.css||""},script:{language:_(s.settings?.processors?.javascript)||"javascript",content:s.javascript||""}}}catch(s){return console.error("Cannot fetch: "+r),console.error(s),{}}};var Io=e=>e.startsWith("id/"),qo=e=>{let t=e.slice(3);return fo.getProject(t)};var le=async e=>new Promise(async(t,r)=>{(await de(Tt,"JSZip")).loadAsync(e).then(async l=>{let m=l.file(/livecodes\.json/);if(m.length>0){m[0].async("string").then(p=>{t(JSON.parse(p))}).catch(r);return}let a=l.file(/((^src\/)|(\/src\/))/),i=l.file(/.*/),o=i.filter(p=>!p.name.includes("/")),n=a.length>0?a:o.length>0?o:i;if(n.length>0){let p=await Promise.all(n.map(async h=>({filename:h.name,content:await h.async("string")})));t(O(p,{}));return}t({})}).catch(r)});var Ea=(e,t)=>{let r=_(t)||"html",s=A(r)||"markup";return{[s]:{language:r,content:e},activeEditor:s}},Bo=async(e,t,r)=>{let s;try{s=await ae.fetch(e)}catch{return console.error("Error fetching "+e),{}}if(e.endsWith(".zip")||["application/zip","application/octet-stream"].includes(s.headers.get("Content-Type")||"")||e.startsWith("data:application/zip")||e.startsWith("data:application/octet-stream")){let a=await s.blob();return le(a)}let l=await s.text();if(t.raw)return Ea(l,t.raw);let m=await ie(l,t,r);if(Object.keys(m).length>0)return m;{let a=e.slice(e.lastIndexOf(".")+1),i=_(a)||"html",o=A(i)||"markup";return{[o]:{language:i,content:l||""},activeEditor:o}}};var Oo=async(e,t,r,s)=>pt(e)?mt(e):Io(e)?qo(e):So(e)?ie(e,t,r):Co(e)?Eo(e,t):Ce(e)?wo(e,t,s):Lo(e)?jo(e,s):Po(e)?Ro(e,t):Uo(e)?Mo(e,t):_o(e)?To(e):bo(e)?yo(e):Ho(e)?Ao(e):it(e)?Bo(e,t,r):Promise.resolve({});var Do=e=>e.querySelector("#url-import-form"),Fo=e=>e.querySelector("#url-import-btn"),Ee=e=>e.querySelector("#code-url"),$o=e=>e.querySelector("#local-code-input"),No=e=>e.querySelector("#json-url-import-form"),Jo=e=>e.querySelector("#json-url-import-btn"),Wo=e=>e.querySelector("#json-url"),Go=e=>e.querySelector("#bulk-json-url-import-form"),zo=e=>e.querySelector("#bulk-json-url-import-btn"),Xo=e=>e.querySelector("#bulk-json-url"),Yo=e=>e.querySelector("#link-to-saved-projects"),Vo=e=>e.querySelector("#file-input");var Ko=e=>e.querySelector("#bulk-file-input");var _a=e=>{let t=document.createElement("div");t.innerHTML=st;let r=t.firstChild,s=r.querySelectorAll("#import-tabs li");return s.forEach(l=>{e.addEventListener(l,"click",()=>{s.forEach(a=>a.classList.remove("active")),l.classList.add("active"),document.querySelectorAll("#import-screens > div").forEach(a=>{a.classList.remove("active")});let m=r.querySelector("#"+l.dataset.target);m?.classList.add("active"),m?.querySelector("input")?.focus()})}),r},iv=({modal:e,notifications:t,eventsManager:r,getUser:s,loadConfig:l,populateConfig:m,projectStorage:a,showScreen:i})=>{let o=_a(r),n=Do(o),p=Fo(o);r.addEventListener(n,"submit",async d=>{d.preventDefault();let P=p.innerHTML;p.innerHTML="Loading...",p.disabled=!0;let T=Ee(o),R=T.value,H=await Oo(R,{},pe,await s?.());H&&Object.keys(H).length>0?(await l({...pe,...H},location.origin+location.pathname+"?x="+encodeURIComponent(R)),e.close()):(p.innerHTML=P,p.disabled=!1,t.error("failed to load URL"),T.focus())});let h=d=>new Promise((P,T)=>{let R=Array.from(d.files),H=[];for(let z of R){if(z.size>104857600){T("Error: Exceeded size 100 MB");return}let X=new FileReader;r.addEventListener(X,"load",async ce=>{let _e=ce.target?.result||"";H.push({filename:z.name,content:_e}),H.length===R.length&&P(m(H,{}))}),r.addEventListener(X,"error",()=>{T("Error: Failed to read file")}),X.readAsText(z)}}),w=d=>le(d.files[0]),L=$o(o);r.addEventListener(L,"change",()=>{if(L.files?.length===0)return;(L.files?.length===1&&L.files[0].name.endsWith(".zip")?w:h)(L).then(l).then(e.close).catch(P=>{t.error(P)})});let k=No(o),b=Jo(o);r.addEventListener(k,"submit",async d=>{d.preventDefault();let P=b.innerHTML;b.innerHTML="Loading...",b.disabled=!0;let T=Wo(o),R=T.value;$(R).then(H=>H.json()).then(H=>l(H,location.origin+location.pathname+"?config="+R)).then(()=>e.close()).catch(()=>{b.innerHTML=P,b.disabled=!1,t.error("Error: failed to load URL"),T.focus()})});let y=Go(o),E=zo(o);r.addEventListener(y,"submit",async d=>{d.preventDefault();let P=E.innerHTML;E.innerHTML="Loading...",E.disabled=!0;let T=Xo(o),R=T.value;$(R).then(H=>H.json()).then(j).catch(()=>{E.innerHTML=P,E.disabled=!1,t.error("Error: failed to load URL"),T.focus()})});let S=d=>new Promise((P,T)=>{if(d.files?.length===0)return;let R=d.files[0];if(["application/json","text/plain"].indexOf(R.type)===-1){T("Error: Incorrect file type");return}let z=100*1024*1024;if(R.size>z){T("Error: Exceeded size 100 MB");return}let ee=new FileReader;r.addEventListener(ee,"load",async X=>{let ce=X.target?.result||"";try{P(JSON.parse(ce))}catch{T("Invalid configuration file")}}),r.addEventListener(ee,"error",()=>{T("Error: Failed to read file")}),ee.readAsText(R)}),j=async d=>{let P=T=>T.config||T.pen;if(Array.isArray(d)&&d.every(P)&&a){await a.bulkInsert(d.map(P)),t.success("Import Successful!"),i("open");return}return Promise.reject("Error: Invalid file")},u=Vo(o);r.addEventListener(u,"change",()=>{S(u).then(l).then(e.close).catch(d=>{t.error(d)})});let g=Ko(o);r.addEventListener(g,"change",()=>{S(g).then(j).catch(d=>{t.error(d)})});let U=Yo(o);r.addEventListener(U,"click",d=>{d.preventDefault(),i("open")}),e.show(o,{isAsync:!0}),Ee(o).focus()};export{iv as createImportUI,Oo as importCode};
//# sourceMappingURL=import.js.map
