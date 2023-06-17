var Z=Object.create;var O=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var Y=Object.getOwnPropertyNames;var tt=Object.getPrototypeOf,et=Object.prototype.hasOwnProperty;var ot=(t,i)=>()=>(i||t((i={exports:{}}).exports,i),i.exports);var rt=(t,i,m,f)=>{if(i&&typeof i=="object"||typeof i=="function")for(let y of Y(i))!et.call(t,y)&&y!==m&&O(t,y,{get:()=>i[y],enumerable:!(f=X(i,y))||f.enumerable});return t};var st=(t,i,m)=>(m=t!=null?Z(tt(t)):{},rt(i||!t||!t.__esModule?O(m,"default",{value:t,enumerable:!0}):m,t));var H=ot((se,T)=>{var F=function(){var t=String.fromCharCode,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",f={};function y(s,n){if(!f[s]){f[s]={};for(var c=0;c<s.length;c++)f[s][s.charAt(c)]=c}return f[s][n]}var b={compressToBase64:function(s){if(s==null)return"";var n=b._compress(s,6,function(c){return i.charAt(c)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(s){return s==null?"":s==""?null:b._decompress(s.length,32,function(n){return y(i,s.charAt(n))})},compressToUTF16:function(s){return s==null?"":b._compress(s,15,function(n){return t(n+32)})+" "},decompressFromUTF16:function(s){return s==null?"":s==""?null:b._decompress(s.length,16384,function(n){return s.charCodeAt(n)-32})},compressToUint8Array:function(s){for(var n=b.compress(s),c=new Uint8Array(n.length*2),r=0,a=n.length;r<a;r++){var u=n.charCodeAt(r);c[r*2]=u>>>8,c[r*2+1]=u%256}return c},decompressFromUint8Array:function(s){if(s==null)return b.decompress(s);for(var n=new Array(s.length/2),c=0,r=n.length;c<r;c++)n[c]=s[c*2]*256+s[c*2+1];var a=[];return n.forEach(function(u){a.push(t(u))}),b.decompress(a.join(""))},compressToEncodedURIComponent:function(s){return s==null?"":b._compress(s,6,function(n){return m.charAt(n)})},decompressFromEncodedURIComponent:function(s){return s==null?"":s==""?null:(s=s.replace(/ /g,"+"),b._decompress(s.length,32,function(n){return y(m,s.charAt(n))}))},compress:function(s){return b._compress(s,16,function(n){return t(n)})},_compress:function(s,n,c){if(s==null)return"";var r,a,u={},x={},w="",U="",g="",h=2,S=3,p=2,d=[],e=0,o=0,v;for(v=0;v<s.length;v+=1)if(w=s.charAt(v),Object.prototype.hasOwnProperty.call(u,w)||(u[w]=S++,x[w]=!0),U=g+w,Object.prototype.hasOwnProperty.call(u,U))g=U;else{if(Object.prototype.hasOwnProperty.call(x,g)){if(g.charCodeAt(0)<256){for(r=0;r<p;r++)e=e<<1,o==n-1?(o=0,d.push(c(e)),e=0):o++;for(a=g.charCodeAt(0),r=0;r<8;r++)e=e<<1|a&1,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=a>>1}else{for(a=1,r=0;r<p;r++)e=e<<1|a,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=0;for(a=g.charCodeAt(0),r=0;r<16;r++)e=e<<1|a&1,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=a>>1}h--,h==0&&(h=Math.pow(2,p),p++),delete x[g]}else for(a=u[g],r=0;r<p;r++)e=e<<1|a&1,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=a>>1;h--,h==0&&(h=Math.pow(2,p),p++),u[U]=S++,g=String(w)}if(g!==""){if(Object.prototype.hasOwnProperty.call(x,g)){if(g.charCodeAt(0)<256){for(r=0;r<p;r++)e=e<<1,o==n-1?(o=0,d.push(c(e)),e=0):o++;for(a=g.charCodeAt(0),r=0;r<8;r++)e=e<<1|a&1,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=a>>1}else{for(a=1,r=0;r<p;r++)e=e<<1|a,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=0;for(a=g.charCodeAt(0),r=0;r<16;r++)e=e<<1|a&1,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=a>>1}h--,h==0&&(h=Math.pow(2,p),p++),delete x[g]}else for(a=u[g],r=0;r<p;r++)e=e<<1|a&1,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=a>>1;h--,h==0&&(h=Math.pow(2,p),p++)}for(a=2,r=0;r<p;r++)e=e<<1|a&1,o==n-1?(o=0,d.push(c(e)),e=0):o++,a=a>>1;for(;;)if(e=e<<1,o==n-1){d.push(c(e));break}else o++;return d.join("")},decompress:function(s){return s==null?"":s==""?null:b._decompress(s.length,32768,function(n){return s.charCodeAt(n)})},_decompress:function(s,n,c){var r=[],a,u=4,x=4,w=3,U="",g=[],h,S,p,d,e,o,v,l={val:c(0),position:n,index:1};for(h=0;h<3;h+=1)r[h]=h;for(p=0,e=Math.pow(2,2),o=1;o!=e;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*o,o<<=1;switch(a=p){case 0:for(p=0,e=Math.pow(2,8),o=1;o!=e;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*o,o<<=1;v=t(p);break;case 1:for(p=0,e=Math.pow(2,16),o=1;o!=e;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*o,o<<=1;v=t(p);break;case 2:return""}for(r[3]=v,S=v,g.push(v);;){if(l.index>s)return"";for(p=0,e=Math.pow(2,w),o=1;o!=e;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*o,o<<=1;switch(v=p){case 0:for(p=0,e=Math.pow(2,8),o=1;o!=e;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*o,o<<=1;r[x++]=t(p),v=x-1,u--;break;case 1:for(p=0,e=Math.pow(2,16),o=1;o!=e;)d=l.val&l.position,l.position>>=1,l.position==0&&(l.position=n,l.val=c(l.index++)),p|=(d>0?1:0)*o,o<<=1;r[x++]=t(p),v=x-1,u--;break;case 2:return g.join("")}if(u==0&&(u=Math.pow(2,w),w++),r[v])U=r[v];else if(v===x)U=S+S.charAt(0);else return null;g.push(U),r[x++]=S+U.charAt(0),u--,S=U,u==0&&(u=Math.pow(2,w),w++)}}};return b}();typeof define=="function"&&define.amd?define(function(){return F}):typeof T<"u"&&T!=null&&(T.exports=F)});var k=(t=location.origin)=>!!(t&&(t.endsWith("livecodes.io")||t.endsWith("livecodes.pages.dev")||t.endsWith("localpen.io")||t.endsWith("localpen.pages.dev")||t.startsWith("http://127.0.0.1")||t.startsWith("http://localhost")));var R=["jspm","skypack"],$=["unpkg","jsdelivr"],D=["jsdelivr.gh","statically"],j={getModuleUrl:(t,{isModule:i=!0,defaultCDN:m="jspm"}={})=>{t=t.replace(/#nobundle/g,"");let f=B(t,i,m);return f||(i?"https://jspm.dev/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,i)=>t.startsWith("http")?t:B(t,!1,i||nt())||t,cdnLists:{npm:$,module:R,gh:D},checkCDNs:async(t,i)=>{let m=[i,...j.cdnLists.npm].filter(Boolean);for(let f of m)try{if((await fetch(j.getUrl(t,f),{method:"HEAD"})).ok)return f}catch{}return j.cdnLists.npm[0]}},nt=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||j.cdnLists.npm[0]}catch{return j.cdnLists.npm[0]}},B=(t,i,m)=>{let f=i&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",D[0]):t.includes(":")||(t=(m||(i?R[0]:$[0]))+":"+t);for(let y of it){let[b,s]=y;if(b.test(t))return t.replace(b,s)+f}return null},it=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:C,getModuleUrl:jt}=j;var at="0.6.64",kt=C(`malinajs@${at}/malina.js`);var A=C("quill@2.0.0-dev.4/dist/"),N=C("quill-html-edit-button@2.2.7/dist/quill.htmlEditButton.min.js"),z=C("quill-blot-formatter@1.0.5/dist/quill-blot-formatter.min.js"),L=C("quill-better-table@1.2.10/dist/");var M=st(H());var ct="https://livecodes-sandbox.pages.dev";var I=ct,Q="v6",_={getResultUrl:()=>`${I}/${Q}/result`,getCompilerUrl:()=>`${I}/${Q}/compiler`,getOrigin:()=>new URL(I).origin};var K="https://dpaste.com/",pt="https://dpaste.com/api/v2/",J="https://api2.livecodes.io/share",G={getProject:async t=>{try{let i=await fetch(K+t+".txt");return i.ok?JSON.parse(await i.text()):{}}catch{return{}}},shareProject:async t=>{try{let i=await fetch(pt,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(t))}&title=${encodeURIComponent(t.title||"")}&syntax=json&expiry_days=365`});return i.ok?(await i.text()).replace(K,""):""}catch{return""}}},dt={getProject:async t=>{if(t.length<11)return G.getProject(t);if(!k())return{};try{let i=await fetch(J+"?id="+t);return i.ok?JSON.parse(await i.text()):{}}catch{return{}}},shareProject:async t=>{if(!k())return"";try{let i=await fetch(J,{method:"POST",mode:"cors",body:JSON.stringify(t)});return i.ok?i.text():""}catch{return""}}},Me=k()?dt:G;var V=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rich Text Editor</title>
  </head>
  <body>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      #standalone-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        max-height: 100%;
      }
      #editor-container {
        flex-grow: 0;
        overflow-y: auto;
      }
      body {
        background: #fff;
      }
      .ql-snow.ql-toolbar {
        background: #eaecec;
      }
      #toolbar-container .ql-font span[data-label='Arial']::before {
        font-family: Arial, sans-serif;
      }
      #toolbar-container .ql-font span[data-label='Comic Sans MS']::before {
        font-family: Comic Sans MS, sans-serif;
      }
      #toolbar-container .ql-font span[data-label='Verdana']::before {
        font-family: Verdana, sans-serif;
      }
      #toolbar-container .ql-font span[data-label='Helvetica']::before {
        font-family: Helvetica, sans-serif;
      }
      #toolbar-container .ql-font span[data-label='Tahoma']::before {
        font-family: Tahoma, sans-serif;
      }
      #toolbar-container .ql-font span[data-label='Trebuchet MS']::before {
        font-family: Trebuchet MS, sans-serif;
      }
      #toolbar-container .ql-font span[data-label='Times New Roman']::before {
        font-family: Times New Roman, serif;
      }
      #toolbar-container .ql-font span[data-label='Georgia']::before {
        font-family: Georgia, serif;
      }
      #toolbar-container .ql-font span[data-label='Garamond']::before {
        font-family: Garamond, serif;
      }
      #toolbar-container .ql-font span[data-label='Courier New']::before {
        font-family: Courier New, monospace;
      }
      #toolbar-container .ql-font span[data-label='Brush Script MT']::before {
        font-family: Brush Script MT, cursive;
      }
      #toolbar-container .ql-size span[data-label='Small']::before {
        font-size: 0.75em;
      }
      #toolbar-container .ql-size span[data-label='Large']::before {
        font-size: 1.5em;
      }
      #toolbar-container .ql-size span[data-label='Huge']::before {
        font-size: 2.5em;
      }
    </style>

    <!-- styles placeholder -->

    <div id="standalone-container">
      <div id="toolbar-container">
        <span class="ql-formats">
          <select class="ql-font" title="Font Face">
            <option selected>Default</option>
            <option>Arial</option>
            <option>Brush Script MT</option>
            <option>Comic Sans MS</option>
            <option>Courier New</option>
            <option>Garamond</option>
            <option>Georgia</option>
            <option>Helvetica</option>
            <option>Tahoma</option>
            <option>Times New Roman</option>
            <option>Trebuchet MS</option>
            <option>Verdana</option>
          </select>
          <select class="ql-size" title="Font Size">
            <option value="0.75em">Small</option>
            <option selected>Normal</option>
            <option value="1.5em">Large</option>
            <option value="2.5em">Huge</option>
          </select>
          <select class="ql-header" title="Heading">
            <option value=""></option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold" title="Bold"></button>
          <button class="ql-italic" title="Italic"></button>
          <button class="ql-underline" title="Underline"></button>
          <button class="ql-strike" title="Strike"></button>
        </span>
        <span class="ql-formats">
          <select class="ql-color" title="Font Color"></select>
          <select class="ql-background" title="Background Color"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-script" value="sub" title="Subscript"></button>
          <button class="ql-script" value="super" title="Superscript"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered" title="Ordered List"></button>
          <button class="ql-list" value="bullet" title="Unordered List"></button>
          <button class="ql-indent" value="-1" title="Outdent"></button>
          <button class="ql-indent" value="+1" title="Indent"></button>
          <button class="ql-blockquote" title="Quote"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-direction" value="rtl" title="Text Direction"></button>
          <select class="ql-align" title="Align">
            <option></option>
            <option value="right"></option>
            <option value="center"></option>
            <option value="justify"></option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-link" title="Link"></button>
          <button class="ql-image" title="Image"></button>
          <button class="ql-video" title="Video"></button>
          <button class="ql-table" title="Insert Table"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-undo" title="Undo"></button>
          <button class="ql-redo" title="Redo"></button>
          <button class="ql-clean" title="Reset formatting"></button>
        </span>
      </div>
      <div id="editor-container">
        <!-- content placeholder -->
      </div>
    </div>

    <!-- scripts placeholder -->

    <script>
      (() => {
        let updatingContent = false;

        var Font = Quill.import('attributors/style/font');
        Font.whitelist = [
          'Arial',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'Trebuchet MS',
          'Times New Roman',
          'Georgia',
          'Garamond',
          'Courier New',
          'Brush Script MT',
        ];
        Quill.register(Font, true);

        var SizeStyle = Quill.import('attributors/style/size');
        SizeStyle.whitelist = ['0.75em', '1.5em', '2.5em'];
        Quill.register(SizeStyle, true);

        var Align = Quill.import('attributors/style/align');
        Quill.register(Align, true);

        var Direction = Quill.import('attributors/style/direction');
        Quill.register(Direction, true);

        Quill.register('modules/htmlEditButton', htmlEditButton);
        Quill.register('modules/blotFormatter', QuillBlotFormatter.default);
        Quill.register({ 'modules/better-table': quillBetterTable }, true);

        var Font = Quill.import('attributors/style/font');
        Font.whitelist = [
          'Arial',
          'Brush Script MT',
          'Comic Sans MS',
          'Courier New',
          'Garamond',
          'Georgia',
          'Helvetica',
          'Tahoma',
          'Times New Roman',
          'Trebuchet MS',
          'Verdana',
        ];
        Quill.register(Font, true);

        var SizeStyle = Quill.import('attributors/style/size');
        SizeStyle.whitelist = ['0.75em', '1.5em', '2.5em'];
        Quill.register(SizeStyle, true);

        var Align = Quill.import('attributors/style/align');
        Quill.register(Align, true);

        var Direction = Quill.import('attributors/style/direction');
        Quill.register(Direction, true);

        var quill = new Quill('#editor-container', {
          modules: {
            toolbar: {
              container: '#toolbar-container',
              handlers: {
                undo: (value) => {
                  quill.history.undo();
                },
                redo: (value) => {
                  quill.history.redo();
                },
                table: (value) => {
                  let tableModule = quill.getModule('better-table');
                  tableModule.insertTable(3, 3);
                },
              },
            },
            history: {
              delay: 1000,
              userOnly: false,
            },
            htmlEditButton: {
              debug: false,
              msg: 'Edit the content in HTML format',
            },
            blotFormatter: {},
            table: false, // disable table module
            'better-table': {
              operationMenu: {
                color: {
                  colors: ['green', 'red', 'yellow', 'blue', 'grey', 'white'],
                  text: 'Background Colors:',
                },
              },
            },
            // keyboard: {
            //   bindings: quillBetterTable.keyboardBindings
            // }
          },
          placeholder: 'Content...',
          theme: 'snow',
        });

        document.querySelector('.ql-undo').innerHTML =
          '<svg viewBox="0 0 1792 1792" style="transform: scaleX(0.9) scaleY(0.9);" xmlns="http://www.w3.org/2000/svg"><path class="ql-fill" d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"/></svg>';
        document.querySelector('.ql-redo').innerHTML =
          '<svg viewBox="0 0 1792 1792" style="transform: scaleX(-0.9) scaleY(0.9);" xmlns="http://www.w3.org/2000/svg"><path class="ql-fill" d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"/></svg>';

        function updateCode() {
          parent.postMessage(
            { type: 'quillEditorCode', payload: { html: quill.root.innerHTML || '' } },
            '*',
          );
        }

        quill.on('text-change', () => {
          if (updatingContent) {
            updatingContent = false;
            return; // prevent infinite loop
          }
          updateCode();
        });

        window.addEventListener('message', function (event) {
          if (event.data.html) {
            updatingContent = true;
            quill.root.innerHTML = event.data.html;
          } else if (event.data.type === 'updateCode') {
            updateCode();
          } else if (event.data.type === 'setTheme') {
          }
        });

        window.addEventListener('load', () => {
          parent.postMessage({ type: 'quillEditorLoaded', payload: true }, '*');
          updateCode();
        });
      })();
    <\/script>
  </body>
</html>
`;var E=!1,P="",q=()=>document.querySelector("#quill-editor-frame"),mt=async({baseUrl:t,config:i,editors:m,eventsManager:f})=>{if(E){P!==m.markup.getValue()&&q()?.contentWindow?.postMessage({html:m.markup.getValue()},"*");return}let y=`
  <script src="${A}quill.min.js"><\/script>
  <script src="${N}"><\/script>
  <script src="${z}"><\/script>
  <script src="${L}quill-better-table.min.js"><\/script>
  <script src="${t}custom-editor-utils.5645a2cb96ac65049b5cfaa8391888fb.js"><\/script>
    `,b=`
  <link rel="stylesheet" href="${t}quill.8e9d74c74d2c8aaa5d849678c215cf7e.css" />
  <link rel="stylesheet" href="${A}quill.snow.css" />
  <link rel="stylesheet" href="${L}quill-better-table.css" />
  `,s=()=>V.replace("<!-- styles placeholder -->",b).replace("<!-- scripts placeholder -->",E?"":y).replace("// {{ custom config }}",i.readonly?"readOnly: true":"").replace("<!-- content placeholder -->",m.markup.getValue());await new Promise(n=>{let c=document.querySelector("#quillEditor"),r=q(),a=()=>{f.addEventListener(window,"message",u=>{if(u.source!==q()?.contentWindow||!["quillEditorCode","quillEditorLoaded"].includes(u.data.type))return;if(u.data.type==="quillEditorLoaded"){E=!0,f.removeEventListener(r,"load",a),ft(),n("loaded");return}let{html:x}=u.data.payload;P=x,m.markup.setValue(x||"")}),q()?.contentWindow?.postMessage({result:s()},"*")};r?a():(r=document.createElement("iframe"),r.name="quillEditor",r.id="quill-editor-frame",r.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"),f.addEventListener(r,"load",a),r.src=_.getResultUrl(),c.appendChild(r))})},Ve=async({baseUrl:t,editors:i,config:m,html:f,eventsManager:y})=>m.script.language!=="richtext"?{}:(E||await mt({baseUrl:t,config:m,editors:i,html:f,eventsManager:y}),{html:P}),Ze=t=>{q()?.contentWindow?.postMessage({type:"setTheme",payload:t},_.getOrigin())},ft=()=>{q()?.contentWindow?.postMessage({type:"updateCode"},_.getOrigin())};export{Ve as getQuillEditorContent,Ze as setQuillEditorTheme,mt as showQuillEditor};
//# sourceMappingURL=quill.js.map
