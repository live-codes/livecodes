var Y=(o,r)=>{let c;return(...a)=>{c&&clearTimeout(c),c=setTimeout(()=>o.apply(null,a),typeof r=="function"?r():r)}};var Qe=(o,r="_")=>o.replace(/[\W]+/g,r);var Q=o=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy")){let r=document.createElement("textarea");r.textContent=o,r.style.position="fixed",document.body.appendChild(r),r.select();try{return document.execCommand("copy")}catch(c){return console.warn("Copy to clipboard failed.",c),!1}finally{document.body.removeChild(r)}}return!1};var Xe=()=>String(Math.random())+"-"+Date.now().toFixed(),X=(o,r,c)=>{let a=document.createElement("a");a.style.display="none",a.href=c,a.download=Qe(o)+"."+r,a.click(),a.remove()},ee=(o,r)=>new Promise((c,a)=>{if(r&&globalThis[r])return c(globalThis[r]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(o),r&&globalThis[r]?c(globalThis[r]):c(globalThis);let m=document.createElement("script");m.src=o,m.async=!0;let u=()=>{m.removeEventListener("load",p),m.removeEventListener("error",g)},p=()=>{if(u(),!r)return c("loaded: "+o);let T=setInterval(()=>{if(window[r])return clearInterval(T),c(window[r])},5)},g=()=>{u(),a("failed to load: "+o)};m.addEventListener("load",p),m.addEventListener("error",g),document.head.appendChild(m)}),te=(o,r,c)=>{if(r&&document.getElementById(r))return;let a=document.createElement("link");a.rel="stylesheet",a.href=o,a.id=r||"styles-"+Xe(),a.crossOrigin="anonymous",document.head.insertBefore(a,c?document.querySelector(c):null)};var oe=o=>{let r=document.createElement("div");r.style.color=o,document.body.appendChild(r);let a=window.getComputedStyle(r).getPropertyValue("color")||"rgb(77, 121, 179)";document.body.removeChild(r);let m=a.split("(")[1].split(")")[0].split(",").map(y=>Number(y)),[u,p,g,T=1]=m;return{r:u,g:p,b:g,a:T}};var re={APP_VERSION:"37",SDK_VERSION:"0.7.2",COMMIT_SHA:"f20a601",REPO_URL:"https://github.com/live-codes/livecodes",DOCS_BASE_URL:"/livecodes/docs/"};var se='<div id="code-to-img-container" class="modal-container"><div class="modal-title" data-i18n="codeToImage.heading">Code to Image</div><div class="modal-screen-container"><div class="modal-screen"><label data-i18n="codeToImage.preview">Preview</label> <a href="#" id="code-to-img-copy-link" class="code-link" data-i18n="codeToImage.copy">Copy</a><!-- <a href="#" id="code-to-img-format-link" class="code-link" data-i18n="codeToImage.format">Format</a> --><div id="code-to-img-preview-background" dir="ltr"><div id="code-to-img-preview-container"></div><div id="code-to-img-watermark"></div></div><form id="code-to-img-form"><div class="accordion"><button class="title" data-i18n="codeToImage.presets">Presets</button><div class="panel" id="presets-container"></div><button class="title" data-i18n="codeToImage.layout">Layout</button><div class="panel"><label class="range-slider-label" data-i18n="codeToImage.background">Background</label><div class="input-container color-picker-container"><input type="text" class="color-picker" name="code-to-img-bg1" id="code-to-img-bg1" placeholder="color 1"> <input type="text" class="color-picker" name="code-to-img-bg2" id="code-to-img-bg2" placeholder="color 2"> <select name="code-to-img-bgDirection" id="code-to-img-bgDirection"><option value="" data-i18n="codeToImage.direction">Direction</option><option value="to bottom">\u2193</option><option value="to top">\u2191</option><option value="to right">\u2192</option><option value="to left">\u2190</option><option value="to bottom right">\u2198</option><option value="to bottom left">\u2199</option><option value="to top right">\u2197</option><option value="to top left">\u2196</option></select></div><label class="range-slider-label" data-i18n="codeToImage.width">Width</label><div class="input-container"><input type="range" min="30" max="100" class="range-slider" name="code-to-img-width"></div><label class="range-slider-label" data-i18n="codeToImage.padding">Padding</label><div class="input-container"><input type="range" min="0" max="64" value="48" class="range-slider" name="code-to-img-padding"></div><label class="range-slider-label" data-i18n="codeToImage.borderRadius">Border Radius</label><div class="input-container"><input type="range" min="0" max="30" value="5" class="range-slider" name="code-to-img-borderRadius"></div><label data-i18n="codeToImage.shadow">Shadow</label><div class="input-container"><input type="checkbox" class="switch" value="true" checked name="code-to-img-shadow"></div><label data-i18n="codeToImage.windowStyle.label">Window Style</label><div class="input-container"><span><input name="code-to-img-windowStyle" type="radio" value="none" checked id="code-to-img-windowStyle-none"> <label for="code-to-img-windowStyle-none" class="radio-label" data-i18n="codeToImage.windowStyle.none">None</label> </span><span><input name="code-to-img-windowStyle" type="radio" value="mac" id="code-to-img-windowStyle-mac"> <label for="code-to-img-windowStyle-mac" class="radio-label" data-i18n="codeToImage.windowStyle.mac">macOS</label> </span><span><input name="code-to-img-windowStyle" type="radio" value="windows" id="code-to-img-windowStyle-windows"> <label for="code-to-img-windowStyle-windows" class="radio-label" data-i18n="codeToImage.windowStyle.windows">Windows</label></span></div><label data-i18n="codeToImage.shareUrl">Share URL</label><div class="input-container"><input type="checkbox" class="switch" value="true" name="code-to-img-watermark"></div></div><button class="title" data-i18n="codeToImage.code">Code</button><div class="panel"><label data-i18n="codeToImage.theme">Theme</label><div class="input-container"><select name="code-to-img-editorTheme" id="code-to-img-editorTheme"></select></div><label class="range-slider-label" data-i18n="codeToImage.opacity">Opacity</label><div class="input-container"><input type="range" min="0.7" max="1.0" step="0.01" class="range-slider" name="code-to-img-opacity" id="code-to-img-opacity"></div><label data-i18n="codeToImage.fontFamily">Font Family</label><div class="input-container"><select name="code-to-img-fontFamily" id="code-to-img-fontFamily"><option value="" data-i18n="codeToImage.default">Default</option></select></div><label data-i18n="codeToImage.fontSize">Font Size</label><div class="input-container"><select name="code-to-img-fontSize" id="code-to-img-fontSize"><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="22">22</option><option value="24">24</option><option value="26">26</option></select></div></div><button class="title" data-i18n="codeToImage.image">Image</button><div class="panel"><label data-i18n="codeToImage.scale">Image Scale</label><div class="input-container"><span><input name="code-to-img-scale" type="radio" value="1" id="code-to-img-scale-1"> <label for="code-to-img-scale-1" class="radio-label">1x</label> </span><span><input name="code-to-img-scale" type="radio" value="2" id="code-to-img-scale-2"> <label for="code-to-img-scale-2" class="radio-label">2x</label> </span><span><input name="code-to-img-scale" type="radio" value="3" id="code-to-img-scale-3"> <label for="code-to-img-scale-3" class="radio-label">3x</label> </span><span><input name="code-to-img-scale" type="radio" value="4" id="code-to-img-scale-4"> <label for="code-to-img-scale-4" class="radio-label">4x</label></span></div><label data-i18n="codeToImage.imageFormat.label">Image Format</label><div class="input-container"><span><input name="code-to-img-format" type="radio" value="png" id="code-to-img-format-png"> <label for="code-to-img-format-png" class="radio-label" data-i18n="codeToImage.imageFormat.png">PNG</label> </span><span><input name="code-to-img-format" type="radio" value="jpg" id="code-to-img-format-jpg"> <label for="code-to-img-format-jpg" class="radio-label" data-i18n="codeToImage.imageFormat.jpg">JPEG</label> </span><span><input name="code-to-img-format" type="radio" value="svg" id="code-to-img-format-svg"> <label for="code-to-img-format-svg" class="radio-label" data-i18n="codeToImage.imageFormat.svg">SVG</label></span></div><label data-i18n="codeToImage.fileName">File Name</label><div class="input-container"><input name="code-to-img-fileName" type="text" id="code-to-img-fileName"></div></div></div></form><button id="code-to-img-save-btn" class="wide-button" data-i18n="codeToImage.save">Save Image</button> <button id="code-to-img-share-btn" class="wide-button" data-i18n="codeToImage.share">Share Image</button></div></div></div>';var tt=o=>Object.entries(re).reduce((r,[c,a])=>r.replace(new RegExp(`{{${c}}}`,"g"),a),o);var ne=tt(se);var ae=["esm.sh","skypack","esm.run","jsdelivr.esm","fastly.jsdelivr.esm","gcore.jsdelivr.esm","testingcf.jsdelivr.esm","jsdelivr.b-cdn.esm","jspm"],ce=["jsdelivr","fastly.jsdelivr","unpkg","gcore.jsdelivr","testingcf.jsdelivr","jsdelivr.b-cdn","npmcdn"],le=["jsdelivr.gh","fastly.jsdelivr.gh","statically","gcore.jsdelivr.gh","testingcf.jsdelivr.gh","jsdelivr.b-cdn.gh"],S={getModuleUrl:(o,{isModule:r=!0,defaultCDN:c="esm.sh"}={})=>{o=o.replace(/#nobundle/g,"");let a=ie(o,r,c);return a||(r?"https://esm.sh/"+o:"https://cdn.jsdelivr.net/npm/"+o)},getUrl:(o,r)=>o.startsWith("http")||o.startsWith("data:")?o:ie(o,!1,r||ot())||o,cdnLists:{npm:ce,module:ae,gh:le},checkCDNs:async(o,r)=>{let c=[r,...S.cdnLists.npm].filter(Boolean);for(let a of c)try{if((await fetch(S.getUrl(o,a),{method:"HEAD"})).ok)return a}catch{}return S.cdnLists.npm[0]}},ot=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||S.cdnLists.npm[0]}catch{return S.cdnLists.npm[0]}},ie=(o,r,c)=>{let a=r&&o.startsWith("unpkg:")?"?module":"";o.startsWith("gh:")?o=o.replace("gh",le[0]):o.includes(":")||(o=(c||(r?ae[0]:ce[0]))+":"+o);for(let m of rt){let[u,p]=m;if(u.test(o))return o.replace(u,p)+a}return null},rt=[[/^(esm\.sh:)(.+)/i,"https://esm.sh/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly\.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(gcore\.jsdelivr:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2"],[/^(testingcf\.jsdelivr:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2"],[/^(jsdelivr\.b-cdn:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2"],[/^(jsdelivr\.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly\.jsdelivr\.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(gcore\.jsdelivr\.gh:)(.+)/i,"https://gcore.jsdelivr.net/gh/$2"],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,"https://testingcf.jsdelivr.net/gh/$2"],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,"https://jsdelivr.b-cdn.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm\.run:)(.+)/i,"https://esm.run/$2"],[/^(jsdelivr\.esm:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2/+esm"],[/^(fastly\.jsdelivr\.esm:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2/+esm"],[/^(gcore\.jsdelivr\.esm:)(.+)/i,"https://gcore.jsdelivr.net/npm/$2/+esm"],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,"https://testingcf.jsdelivr.net/npm/$2/+esm"],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,"https://jsdelivr.b-cdn.net/npm/$2/+esm"],[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle\.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(npmcdn:)(.+)/i,"https://npmcdn.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:s,getModuleUrl:ft}=S,P=s("@live-codes/browser-compilers@0.18.0/dist/");var O=s("@melloware/coloris@0.22.0/dist/");var de=s("@fontsource/anonymous-pro@4.5.9/index.css"),me=s("gh:hatemhosny/astigmata-font@6d0ee00a07fb1932902f0b81a504d075d47bd52f/index.css");var pe=s("@fontsource/cascadia-code@4.2.1/index.css"),ue=s("https://fonts.cdnfonts.com/css/code-new-roman-2"),ge=s("comic-mono@0.0.1/index.css"),fe=s("@fontsource/courier-prime@4.5.9/index.css"),he=s("https://fonts.cdnfonts.com/css/dec-terminal-modern"),be=s("@fontsource/dejavu-mono@4.5.4/index.css"),ye=s("@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono.css"),we=s("firacode@6.2.0/distr/fira_code.css"),ve=s("https://fonts.cdnfonts.com/css/fixedsys-62"),xe=s("hack-font@3.3.0/build/web/hack.css"),Ue=s("typeface-hermit@0.0.44/index.css"),je=s("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap"),ke=s("https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"),Se=s("@fontsource/iosevka@4.5.4/index.css"),Te=s("@fontsource/jetbrains-mono@4.5.11/index.css"),Ce=s("https://fonts.cdnfonts.com/css/menlo"),C=s("monaspace-font@0.0.2/"),Me=s("https://fonts.cdnfonts.com/css/monofur"),Le=s("@typopro/web-monoid@3.7.5/TypoPRO-Monoid.css"),Ee=s("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap"),Pe=s("https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap"),Re=s("@fontsource/opendyslexic@4.5.4/index.css"),Fe=s("https://fonts.cdnfonts.com/css/profontwindows"),Ie=s("@fontsource/roboto-mono@4.5.8/index.css"),$e=s("https://fonts.cdnfonts.com/css/sf-mono"),De=s("@fontsource/source-code-pro@4.5.12/index.css"),Be=s("@fontsource/space-mono@4.5.10/index.css"),Ne=s("https://fonts.cdnfonts.com/css/sudo-var"),qe=s("@fontsource/ubuntu-mono@4.5.11/index.css"),Oe=s("victormono@1.5.4/dist/index.css");var He=s("html-to-image@1.11.11/dist/html-to-image.js");var j=s("prismjs@1.29.0/themes/"),n=s("prism-themes@1.9.0/themes/"),Ae=s("gh:GalenWong/nord-prism-js@9f085d2a64b37f72a516540ba3f87877d12d7e2d/prism-nord.css"),We=s("gh:PrismJS/prism-themes@447479fc7b2be2051fe27e561aceed7cc87a589f/themes/prism-laserwave.css");var ze=[{id:"anonymous-pro",name:"Anonymous Pro",url:de},{id:"astigmata",name:"Astigmata",url:me},{id:"cascadia-code",name:"Cascadia Code",url:pe},{id:"comic-mono",name:"Code New Roman",url:ue},{id:"comic-mono",name:"Comic Mono",url:ge},{id:"courier-prime",name:"Courier Prime",url:fe},{id:"dec-terminal-modern",name:"DEC Terminal Modern",url:he},{id:"dejavu-mono",name:"DejaVu Mono",url:be},{id:"fantasque-sans-mono",name:"TypoPRO Fantasque Sans Mono",label:"Fantasque Sans Mono",url:ye},{id:"fira-code",name:"Fira Code",url:we},{id:"fixedsys",name:"Fixedsys 62",label:"Fixedsys",url:ve},{id:"hack",name:"Hack",url:xe},{id:"hermit",name:"Hermit",url:Ue},{id:"ibm-plex-mono",name:"IBM Plex Mono",url:je},{id:"inconsolata",name:"Inconsolata",url:ke},{id:"iosevka",name:"Iosevka",url:Se},{id:"jetbrains-mono",name:"JetBrains Mono",url:Te},{id:"menlo",name:"Menlo",url:Ce},{id:"monaspace-argon",name:"Monaspace Argon",url:C+"argon.css"},{id:"monaspace-krypton",name:"Monaspace Krypton",url:C+"krypton.css"},{id:"monaspace-neon",name:"Monaspace Neon",url:C+"neon.css"},{id:"monaspace-radon",name:"Monaspace Radon",url:C+"radon.css"},{id:"monaspace-xenon",name:"Monaspace Xenon",url:C+"xenon.css"},{id:"monofur",name:"Monofur",url:Me},{id:"monoid",name:"TypoPRO Monoid",label:"Monoid",url:Le},{id:"noto-sans-mono",name:"Noto Sans Mono",url:Ee},{id:"nova-mono",name:"Nova Mono",url:Pe},{id:"opendyslexic",name:"OpenDyslexic",url:Re},{id:"profontwindows",name:"ProFontWindows",label:"ProFont",url:Fe},{id:"roboto-mono",name:"Roboto Mono",url:Ie},{id:"sf-mono",name:"SF Mono",url:$e},{id:"source-code-pro",name:"Source Code Pro",url:De},{id:"space-mono",name:"Space Mono",url:Be},{id:"sudo-var",name:"Sudo Var",url:Ne},{id:"ubuntu-mono",name:"Ubuntu Mono",url:qe},{id:"victor-mono",name:"Victor Mono",url:Oe}];var st=o=>`.line-numbers-rows > span::before { color: ${o} !important; }`,_e=[{name:"a11y-dark",title:"A11y Dark",url:n+"prism-a11y-dark.css"},{name:"atom-dark",title:"Atom Dark",url:n+"prism-atom-dark.css"},{name:"base16-ateliersulphurpool-light",title:"Base16 Ateliersulphurpool Light",url:n+"prism-base16-ateliersulphurpool.light.css"},{name:"catppuccin-latte",title:"Catppuccin Latte",url:P+"catppuccin/prism/latte.css"},{name:"catppuccin-frappe",title:"Catppuccin Frappe",url:P+"catppuccin/prism/frappe.css"},{name:"catppuccin-macchiato",title:"Catppuccin Macchiato",url:P+"catppuccin/prism/macchiato.css"},{name:"catppuccin-mocha",title:"Catppuccin Mocha",url:P+"catppuccin/prism/mocha.css"},{name:"cb",title:"CB",url:n+"prism-cb.css"},{name:"coldark-cold",title:"Coldark Cold",url:n+"prism-coldark-cold.css"},{name:"coldark-dark",title:"Coldark Dark",url:n+"prism-coldark-dark.css"},{name:"coy",title:"Coy",url:j+"prism-coy.css"},{name:"coy-without-shadows",title:"Coy Without Shadows",url:n+"prism-coy-without-shadows.css"},{name:"darcula",title:"Darcula",url:n+"prism-darcula.css"},{name:"dark",title:"Dark",url:j+"prism-dark.css"},{name:"dracula",title:"Dracula",url:n+"prism-dracula.css"},{name:"duotone-dark",title:"Duotone Dark",url:n+"prism-duotone-dark.css"},{name:"duotone-earth",title:"Duotone Earth",url:n+"prism-duotone-earth.css"},{name:"duotone-forest",title:"Duotone Forest",url:n+"prism-duotone-forest.css"},{name:"duotone-light",title:"Duotone Light",url:n+"prism-duotone-light.css"},{name:"duotone-sea",title:"Duotone Sea",url:n+"prism-duotone-sea.css"},{name:"duotone-space",title:"Duotone Space",url:n+"prism-duotone-space.css"},{name:"funky",title:"Funky",url:j+"prism-funky.css"},{name:"ghcolors",title:"GH Colors",url:n+"prism-ghcolors.css"},{name:"gruvbox-dark",title:"Gruvbox Dark",url:n+"prism-gruvbox-dark.css"},{name:"gruvbox-light",title:"Gruvbox Light",url:n+"prism-gruvbox-light.css"},{name:"holi-theme",title:"Holi Theme",url:n+"prism-holi-theme.css"},{name:"hopscotch",title:"Hopscotch",url:n+"prism-hopscotch.css"},{name:"laserwave",title:"Laserwave",url:We},{name:"lucario",title:"Lucario",url:n+"prism-lucario.css"},{name:"material-dark",title:"Material Dark",url:n+"prism-material-dark.css"},{name:"material-light",title:"Material Light",url:n+"prism-material-light.css"},{name:"material-oceanic",title:"Material Oceanic",url:n+"prism-material-oceanic.css"},{name:"monochrome",title:"Monochrome",url:"data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiMyNDI5MmU7YmFja2dyb3VuZC1jb2xvcjojZmZmZmZlO30="},{name:"monochrome-dark",title:"Monochrome Dark",url:"data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiNlMmUyZTM7YmFja2dyb3VuZC1jb2xvcjojMjQyOTJlO30="},{name:"night-owl",title:"Night Owl",url:n+"prism-night-owl.css"},{name:"nord",title:"Nord",url:n+"prism-nord.css"},{name:"nord-2",title:"Nord 2",url:Ae},{name:"okaidia",title:"Okaidia",url:j+"prism-okaidia.css"},{name:"one-dark",title:"One Dark",url:n+"prism-one-dark.css"},{name:"one-light",title:"One Light",url:n+"prism-one-light.css"},{name:"pojoaque",title:"Pojoaque",url:n+"prism-pojoaque.css"},{name:"shades-of-purple",title:"Shades of Purple",url:n+"prism-shades-of-purple.css"},{name:"solarized-dark-atom",title:"Solarized Dark Atom",url:n+"prism-solarized-dark-atom.css"},{name:"solarized-light",title:"Solarized Light",url:j+"prism-solarizedlight.css"},{name:"synthwave84",title:"Synthwave 84",url:n+"prism-synthwave84.css"},{name:"tomorrow",title:"Tomorrow",url:j+"prism-tomorrow.css"},{name:"twilight",title:"Twilight",url:j+"prism-twilight.css"},{name:"vs",title:"VS",url:n+"prism-vs.css"},{name:"vsc-dark-plus",title:"VSC Dark Plus",url:n+"prism-vsc-dark-plus.css"},{name:"xonokai",title:"Xonokai",url:n+"prism-xonokai.css",overrideCSS:st("#6f705e")},{name:"z-touchs",title:"Z-Touchs",url:n+"prism-z-touch.css"}];var nt=o=>({container:o.container,editorTheme:o.editorTheme,fontFamily:o.fontFamily,fontSize:o.fontSize,lineNumbers:o.lineNumbers,wordWrap:o.wordWrap}),Et=async({baseUrl:o,currentUrl:r,fileName:c,editorId:a,modal:m,notifications:u,eventsManager:p,deps:g})=>{let T=document.createElement("div");T.innerHTML=ne.replace(/{{baseUrl}}/g,o);let y=T.firstChild,w=y.querySelector("#code-to-img-preview-container"),v=y.querySelector("#code-to-img-preview-background"),f=y.querySelector("#code-to-img-form");if(!w||!f)return;let H=f.querySelector("#presets-container"),M={id:"default",container:w,bg1:"#f5f5dc",bg2:"",bgDirection:"to bottom right",opacity:.9,windowStyle:"none",watermark:!1,editorTheme:"dracula",fontFamily:"fira-code",fontSize:14,lineNumbers:!1,wordWrap:!0,borderRadius:5,shadow:!0,width:70,padding:48,format:"png",scale:1,fileName:c},A=t=>{H.querySelectorAll(".preset").forEach(e=>{e.dataset.id===t?e.classList.add("active"):e.classList.remove("active")})},W=t=>{let e=q(),i=R.find(l=>l.id==="custom");i&&(Object.keys(e).filter(l=>l!=="id").forEach(l=>{i[l]=e[l]}),t==="custom"?g.savePreset(i):g.savePreset({id:t}))},F=t=>{let e={...M,...t},i=["container","width","fileName"];Object.keys(e).filter(d=>!i.includes(d)&&f[`code-to-img-${d}`]!=null).forEach(d=>{let b=f[`code-to-img-${d}`];if(b.type==="checkbox"?b.checked=e[d]:b.value=String(e[d]),d==="bg1"||d==="bg2"){let L=b.parentNode;L.classList.contains("clr-field")&&(L.style.color=b.value)}d==="opacity"&&e.opacity==null&&(b.value="1")}),I(!0),A(e.id)};(()=>{R.forEach(t=>{let e=document.createElement("btn");if(e.classList.add("preset"),e.dataset.id=t.id,t.id==="custom")e.textContent=window.deps.translateString("generic.custom","Custom");else{let i=document.createElement("img");i.src=`${o}assets/code-to-img/${t.id}.jpg`,e.appendChild(i)}e.addEventListener("click",()=>{F(t),W(t.id)}),e.tabIndex=0,p.addEventListener(e,"keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),e.click())}),H.appendChild(e)})})(),m.show(y,{isAsync:!0,size:"full"});let Ve=async t=>{let e=await g.createEditor(nt(t));return e.getValue().trim()===""&&e.setLanguage("tsx",it),g.getFormatFn().then(i=>{setTimeout(()=>{e.registerFormatter(i)},500)}),p.addEventListener(y.querySelector("#code-to-img-format-link"),"click",i=>{i.preventDefault(),e.format()}),p.addEventListener(y.querySelector("#code-to-img-copy-link"),"click",i=>{i.preventDefault();let l=e.getValue();Q(l)?u.success(window.deps.translateString("core.copy.copied","Code copied to clipboard")):u.error(window.deps.translateString("core.error.failedToCopyCode","Failed to copy code"))}),e},Je=f.querySelector("#code-to-img-editorTheme");_e.forEach(t=>{let e=document.createElement("option");e.text=t.title,e.value=t.name,Je.appendChild(e)});let Ge=f.querySelector("#code-to-img-fontFamily");ze.forEach(t=>{let e=document.createElement("option");e.text=t.name,e.value=t.id,Ge.appendChild(e)}),Object.keys(M).forEach(t=>{let e=f[`code-to-img-${t}`];e&&(e.type==="checkbox"?e.checked=M[t]:e.value=String(M[t]))}),import(O+"esm/coloris.min.js").then(t=>{let e=t.default;e.init(),e({el:"#code-to-img-bg1",parent:".modal-screen-container",swatches:["#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51","#d62828","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#f5f5dc","#4a90e2"]}),e({el:"#code-to-img-bg2"})}),te(O+"coloris.css");let D=await Ve(M),k=document.createElement("div");k.id="code-to-img-window-controls",k.innerHTML=`
  <span id="code-to-img-mac" class="window-buttons"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></span>
  <span id="code-to-img-title" class="window-title" spellcheck="false" contenteditable="true"></span>
  <span id="code-to-img-windows" class="window-buttons"><svg width="58" height="14" viewBox="0 0 58 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7H11" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35 1H25C24.4477 1 24 1.44772 24 2V12C24 12.5523 24.4477 13 25 13H35C35.5523 13 36 12.5523 36 12V2C36 1.44772 35.5523 1 35 1Z" stroke="#878787"></path><path d="M47 2L57 12" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path><path d="M47 12L57 2" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
`,w.querySelector("pre")?.prepend(k);let B=v.querySelector("#code-to-img-watermark"),z=t=>{B.innerHTML=`
    <img src="${o}assets/images/livecodes-logo.svg" alt="LiveCodes logo" />
    ${t}
  `};z(r);let Ze=()=>{let t=D.getLanguage();return{title:k.querySelector("#code-to-img-title").textContent||"",activeEditor:a,[a]:{language:t,content:D.getValue()}}},N,h,q=()=>(h=Array.from(new FormData(f)).reduce((e,[i,l])=>({...e,[i.replace("code-to-img-","")]:l==="true"?!0:l==="false"?!1:l===""?void 0:isNaN(Number(l))?l:Number(l)}),{}),["lineNumbers","wordWrap","shadow","watermark"].forEach(e=>{e in h||(h[e]=!1)}),h),_=(t,e)=>{if(v.style.padding=t.padding+"px",v.style.margin=64-t.padding+"px",e)setTimeout(()=>{t.width=v.offsetWidth/v.parentElement.offsetWidth*100,f["code-to-img-width"].value=t.width},150);else{let i=t.bg1||"#f5f5dc",l=t.bg2||i,d=t.bgDirection||"to bottom";v.style.backgroundImage=`linear-gradient(${d}, ${i}, ${l})`,v.style.width=t.width+"%",w.style.width=v.offsetWidth-t.padding*2+"px"}},I=async(t=!1)=>{let e=q();D.changeSettings(e),_(e,t);let i=e.bg1||"#f5f5dc",l=e.bg2||i,d=e.bgDirection||"to bottom";v.style.backgroundImage=`linear-gradient(${d}, ${i}, ${l})`,w.style.borderRadius=e.borderRadius+"px",w.querySelector("pre").style.borderRadius=e.borderRadius+"px",w.querySelector("code").style.borderRadius=e.borderRadius+"px";let b=w.querySelector("pre"),L=w.querySelector("code"),E=()=>{if(b.style.background="",L.style.background="",e.opacity===1)return;let{r:G,g:Z,b:K}=oe(getComputedStyle(b).backgroundColor);b.style.background=`rgba(${G}, ${Z}, ${K}, ${e.opacity})`,L.style.background=`rgba(${G}, ${Z}, ${K}, 0)`};setTimeout(E,50),setTimeout(E,200),setTimeout(E,500),setTimeout(E,1e3),setTimeout(E,2e3),w.classList.toggle("shadow",!!e.shadow),B.hidden=!e.watermark,B.classList.toggle("shadow",!!e.shadow),k.style.display=e.windowStyle==="none"?"none":"flex",k.querySelector("#code-to-img-windows").style.visibility=e.windowStyle==="windows"?"visible":"hidden",k.querySelector("#code-to-img-mac").style.visibility=e.windowStyle==="mac"?"visible":"hidden",e.watermark&&!N&&V()},V=async()=>{let t=Ze();if(h.watermark&&JSON.stringify(N)!==JSON.stringify(t)){N=t;let e=await g.getShareUrl(t);z(e)}},Ke=Y(I,500);p.addEventListener(f,"input",t=>{t?.target?.id==="code-to-img-editorTheme"&&(f["code-to-img-opacity"].value="1"),t?.target?.id==="code-to-img-opacity"?Ke():I(),["fileName","width"].map(e=>"code-to-img-"+e).includes(t?.target?.name)||(W("custom"),A("custom"))}),I(!0),p.addEventListener(window,"resize",()=>_(q(),!0));let Ye=ee(He,"htmlToImage"),J=async()=>{let t=await Ye;await V();let e=v,i=e.offsetWidth,l=e.offsetHeight,d=h.scale||1;return t[{png:"toPng",jpg:"toJpeg",svg:"toSvg"}[h.format]||"toPng"](e,{quality:1,width:i*d,height:l*d,style:{transform:`scale(${d})`,transformOrigin:"top left",margin:"0",width:`${i}px`,height:`${l}px`}})},x=y.querySelector("#code-to-img-save-btn");p.addEventListener(x,"click",async()=>{x.disabled=!0,x.classList.add("disabled");let t=x.innerText;x.innerText=window.deps.translateString("core.generating","Generating..."),J().then(e=>{X(h.fileName,h.format||"png",e)}).catch(()=>{u.error(window.deps.translateString("core.error.failedToSaveImage","Failed to save image"))}).finally(()=>{x.disabled=!1,x.classList.remove("disabled"),x.innerText=t})});let U=y.querySelector("#code-to-img-share-btn");p.addEventListener(U,"click",()=>{U.disabled=!0,U.classList.add("disabled");let t=U.innerText;U.innerText=window.deps.translateString("core.generating","Generating..."),J().then(async e=>{let i=await fetch(e).then(d=>d.blob()),l={files:[new File([i],`${h.fileName}.${h.format||"png"}`,{type:i.type})],title:"LiveCodes Code to Image"};await navigator.share(l)}).catch(()=>{u.error(window.deps.translateString("core.error.failedToShareImage","Failed to share image"))}).finally(()=>{U.disabled=!1,U.classList.remove("disabled"),U.innerText=t})});let $=g.getSavedPreset();$?$.id==="custom"?F($):F(R.find(t=>t.id===$.id)||R[0]):F(R[0])},R=[{id:"preset_1",bg1:"#4a90e2",bg2:"#c162f5",bgDirection:"to bottom left",editorTheme:"one-dark",shadow:!0,windowStyle:"mac"},{id:"preset_2",bg1:"#48cae4",bg2:"#f562f5",bgDirection:"to bottom right",editorTheme:"laserwave",shadow:!0},{id:"preset_3",bg1:"#823bb9",bg2:"#f4a261",bgDirection:"to bottom right",editorTheme:"duotone-dark",windowStyle:"mac",shadow:!0},{id:"preset_4",bg1:"#c3ac75",bg2:"#ff8e38",borderRadius:15,shadow:!0,editorTheme:"darcula",opacity:.95,fontFamily:"fira-code"},{id:"preset_5",bg1:"#f5f5dc",bg2:"",bgDirection:"to bottom right",editorTheme:"dracula",shadow:!0},{id:"preset_6",bg1:"#deecdd",bg2:"#c1dfc4",bgDirection:"to bottom",shadow:!0,editorTheme:"tomorrow",opacity:1,windowStyle:"none",fontFamily:"nova-mono"},{id:"preset_7",bg1:"#fd978b",bg2:"#f9748f",windowStyle:"mac",shadow:!0,editorTheme:"holi-theme",opacity:.85},{id:"preset_8",bg1:"#e94057",bg2:"#a52c78",bgDirection:"to bottom left",shadow:!0,editorTheme:"funky",opacity:.95},{id:"preset_9",bg1:"#4cb88e",bg2:"#1e6267",bgDirection:"to bottom",shadow:!0,editorTheme:"holi-theme",fontFamily:"cascadia-code"},{id:"preset_10",bg1:"#07a2a2",bg2:"",editorTheme:"a11y-dark",shadow:!0},{id:"preset_11",bg1:"#4a90e2",bg2:"",editorTheme:"dracula",fontFamily:"monaspace-radon",shadow:!1},{id:"preset_12",bg1:"#48cae4",bg2:"#0096c7",shadow:!0,editorTheme:"shades-of-purple",windowStyle:"mac",fontFamily:"monofur",fontSize:16},{id:"preset_13",bg1:"#111c28",bg2:"#111c28",padding:10,borderRadius:0,shadow:!1,editorTheme:"coldark-dark",windowStyle:"none",fontFamily:"monaspace-krypton"},{id:"preset_14",bg1:"#f2daa1",bg2:"#998149",shadow:!0,editorTheme:"gruvbox-light",fontFamily:"jetbrains-mono"},{id:"preset_15",bg1:"#494949",bg2:"#494949",editorTheme:"coldark-cold",opacity:1,shadow:!0,windowStyle:"windows"},{id:"preset_16",bg1:"#243b55",bg2:"#141e30",bgDirection:"to right",shadow:!0,editorTheme:"vs",opacity:.95,windowStyle:"none",fontFamily:"sf-mono"},{id:"preset_17",bg1:"#ffffff",bg2:"#e2efff",shadow:!0,editorTheme:"coy-without-shadows",opacity:1,fontFamily:"hack"},{id:"custom"}],it=`
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
`.trimStart();export{Et as createCodeToImageUI};
