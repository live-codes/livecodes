var te=t=>(globalThis.structuredClone||(o=>JSON.parse(JSON.stringify(o,(i,r)=>r===void 0?null:r))))(t);var oe=()=>String(Math.random())+"-"+Date.now().toFixed();var P=(t,o)=>new Promise((i,r)=>{if(o&&globalThis[o])return i(globalThis[o]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(t),o&&globalThis[o]?i(globalThis[o]):i(globalThis);let d=document.createElement("script");d.src=t,d.async=!0;let c=()=>{d.removeEventListener("load",p),d.removeEventListener("error",j)},p=()=>{if(c(),!o)return i("loaded: "+t);let g=setInterval(()=>{if(window[o])return clearInterval(g),i(window[o])},5)},j=()=>{c(),r("failed to load: "+t)};d.addEventListener("load",p),d.addEventListener("error",j),document.head.appendChild(d)});var F=t=>t.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,"$1");var re=["esm.sh","skypack","jspm"],se=["unpkg","jsdelivr","fastly.jsdelivr"],ie=["fastly.jsdelivr.gh","jsdelivr.gh","statically"],k={getModuleUrl:(t,{isModule:o=!0,defaultCDN:i="esm.sh"}={})=>{t=t.replace(/#nobundle/g,"");let r=ne(t,o,i);return r||(o?"https://esm.sh/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,o)=>t.startsWith("http")||t.startsWith("data:")?t:ne(t,!1,o||Ye())||t,cdnLists:{npm:se,module:re,gh:ie},checkCDNs:async(t,o)=>{let i=[o,...k.cdnLists.npm].filter(Boolean);for(let r of i)try{if((await fetch(k.getUrl(t,r),{method:"HEAD"})).ok)return r}catch{}return k.cdnLists.npm[0]}},Ye=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||k.cdnLists.npm[0]}catch{return k.cdnLists.npm[0]}},ne=(t,o,i)=>{let r=o&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",ie[0]):t.includes(":")||(t=(i||(o?re[0]:se[0]))+":"+t);for(let d of et){let[c,p]=d;if(c.test(t))return t.replace(c,p)+r}return null},et=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(jsr:)(.+)/i,"https://esm.sh/jsr/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly.jsdelivr.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:v,getModuleUrl:ht}=k;var ce=v("@live-codes/monaco-codeium-provider@0.2.2/dist/index.js");var ae=v("emmet-monaco-es@5.0.0/dist/emmet-monaco.js");var tt="0.6.64",ft=v(`malinajs@${tt}/malina.js`);var le=v("monaco-emacs@0.3.0/dist/monaco-emacs.js"),n=v("monaco-themes@0.4.4/themes/"),me=v("monaco-vim@0.4.0/dist/monaco-vim.js");var ot=/(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g,nt=/(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g,pe=(t,o=!1)=>[...F(t).matchAll(new RegExp(ot)),...F(t).matchAll(new RegExp(nt))].map(i=>i[2].replace(/"/g,"").replace(/'/g,"")).map(i=>!o||!rt(i)||!i.includes(":")?i:i.split(":")[1]);var rt=t=>!t.startsWith("https://")&&!t.startsWith("http://")&&!t.startsWith(".")&&!t.startsWith("/")&&!t.startsWith("data:")&&!t.startsWith("blob:");var ue=()=>document.querySelector("#editor-mode");var de=t=>`https://ofcncog2cu-dsn.algolia.net/1/indexes/npm-search/${encodeURIComponent(t)}?x-algolia-agent=Browser`,ge={"X-Algolia-Application-Id":"OFCNCOG2CU","X-Algolia-API-Key":"f54e21fa3a2a0160595bb058179bfb1e"},he=["name","description","homepage","repository.url","version"],_="https://data.jsdelivr.com/v1",V={"User-Agent":"https://livecodes.io"},U=t=>{let o=t.startsWith("@"),i=o?t.slice(1):t,[r,d]=i.split("@");return[(o?"@":"")+r,d]},st=async(t,o=10)=>{let i={page:0,hitsPerPage:o,attributesToHighlight:[],attributesToRetrieve:he,analyticsTags:["jsdelivr"]},[r,d]=U(t),c;if(d){let g=await D(t);typeof g=="string"&&(c=U(g)[1])}let p=await fetch(de("query"),{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",...ge},body:JSON.stringify({query:r,...i})}).then(g=>{if(!g.ok)throw new Error("failed to fetch");return g}).then(g=>g.json()).catch(g=>({error:!0,message:g.mesage||String(g)}));if("error"in p)return p;let j=p.hits.map(g=>(g.name===r&&c&&(g.version=c),g.repository?.url&&(g.repo=g.repository?.url),g));return j.sort((g,R)=>g.name===r?-1:R.name===r?1:0),j},D=async t=>{let o=`${_}/package/resolve/npm/${t}`,i=await fetch(o,{headers:V}).then(c=>{if(!c.ok)throw new Error("failed to fetch");return c}).then(c=>c.json()).catch(c=>({error:!0,message:c.mesage||String(c)}));if("error"in i)return i;let r=U(t)[0],d=i.version;return d?`${r}@${d}`:r},it=async t=>{let[o,i]=U(t),r;if(i){let p=await D(t);typeof p=="string"&&(r=U(p)[1])}let d=de(o)+"&attributesToRetrieve="+he.join(","),c=await fetch(d,{method:"GET",headers:ge}).then(p=>{if(!p.ok)throw new Error("failed to fetch");return p}).then(p=>p.json()).catch(p=>({error:!0,message:p.mesage||String(p)}));return"error"in c||(r&&(c.version=r),c.repository?.url&&(c.repo=c.repository?.url)),c},ct=async t=>{let o=await D(t),i=`${_}/package/npm/${o}/flat`,r=await fetch(i,{headers:V}).then(c=>{if(!c.ok)throw new Error("failed to fetch");return c}).then(c=>c.json()).catch(c=>({error:!0,message:c.mesage||String(c)}));if("error"in r)return r;let d=`https://cdn.jsdelivr.net/npm/${o}`;return{...r.default?{default:d+r.default}:{},files:r.files.map(c=>d+c.name)}},at=async t=>{let o=await D(t),i=`${_}/package/npm/${o}/entrypoints`,r=await fetch(i,{headers:V}).then(c=>{if(!c.ok)throw new Error("failed to fetch");return c}).then(c=>c.json()).catch(c=>({error:!0,message:c.mesage||String(c)}));if("error"in r)return r;let d=`https://cdn.jsdelivr.net/npm/${o}`;return{...r.js?.file?{js:d+r.js?.file}:{},...r.css?.file?{css:d+r.css?.file}:{}}},fe={search:st,getPkgInfo:it,getPkgFiles:ct,getPkgDefaultFiles:at};var lt=t=>{let o=t.trim(),i,r;return t.includes(":")&&([i,o]=o.split(":"),i!=="monaco"&&i!=="codemirror"&&i!=="codejar"&&(i=void 0)),t.includes("@")&&([o,r]=o.split("@"),r!=="light"&&r!=="dark"&&(r=void 0)),{editor:i,editorTheme:o,theme:r}},xe=({editor:t,editorTheme:o,theme:i,editorThemes:r})=>{if(!o)return null;let c=(typeof o=="string"?o.split(",").map(p=>p.trim()):o).map(lt);for(let p of c)if((p.editor===t||p.editor===void 0)&&(p.theme===i||p.theme===void 0)&&r.includes(p.editorTheme))return p.editorTheme;return null};var z=[{name:"active4d",title:"Active4D",url:n+"Active4D.json"},{name:"all-hallows-eve",title:"All Hallows Eve",url:n+"All Hallows Eve.json"},{name:"amy",title:"Amy",url:n+"Amy.json"},{name:"birds-of-paradise",title:"Birds of Paradise",url:n+"Birds of Paradise.json"},{name:"blackboard",title:"Blackboard",url:n+"Blackboard.json"},{name:"brilliance-black",title:"Brilliance Black",url:n+"Brilliance Black.json"},{name:"brilliance-dull",title:"Brilliance Dull",url:n+"Brilliance Dull.json"},{name:"chrome-devtools",title:"Chrome DevTools",url:n+"Chrome DevTools.json"},{name:"clouds-midnight",title:"Clouds Midnight",url:n+"Clouds Midnight.json"},{name:"clouds",title:"Clouds",url:n+"Clouds.json"},{name:"cobalt",title:"Cobalt",url:n+"Cobalt.json"},{name:"cobalt2",title:"Cobalt2",url:n+"Cobalt2.json"},{name:"dawn",title:"Dawn",url:n+"Dawn.json"},{name:"dracula",title:"Dracula",url:n+"Dracula.json"},{name:"dreamweaver",title:"Dreamweaver",url:n+"Dreamweaver.json"},{name:"eiffel",title:"Eiffel",url:n+"Eiffel.json"},{name:"espresso-libre",title:"Espresso Libre",url:n+"Espresso Libre.json"},{name:"github",title:"GitHub",url:n+"GitHub.json"},{name:"github-dark",title:"GitHub Dark",url:n+"GitHub Dark.json"},{name:"github-light",title:"GitHub Light",url:n+"GitHub Light.json"},{name:"hc-black",title:"High Contrast (Black)"},{name:"hc-light",title:"High Contrast (Light)"},{name:"idle",title:"Idle",url:n+"IDLE.json"},{name:"idlefingers",title:"Idle Fingers",url:n+"idleFingers.json"},{name:"iplastic",title:"iPlastic",url:n+"iPlastic.json"},{name:"katzenmilch",title:"Katzenmilch",url:n+"Katzenmilch.json"},{name:"krtheme",title:"krTheme",url:n+"krTheme.json"},{name:"kuroir",title:"Kuroir Theme",url:n+"Kuroir Theme.json"},{name:"lazy",title:"Lazy",url:n+"LAZY.json"},{name:"magicwb-amiga",title:"MagicWB (Amiga)",url:n+"MagicWB (Amiga).json"},{name:"merbivore-soft",title:"Merbivore Soft",url:n+"Merbivore Soft.json"},{name:"merbivore",title:"Merbivore",url:n+"Merbivore.json"},{name:"monochrome",title:"Monochrome"},{name:"monochrome-dark",title:"Monochrome Dark"},{name:"monoindustrial",title:"monoindustrial",url:n+"monoindustrial.json"},{name:"monokai",title:"Monokai",url:n+"Monokai.json"},{name:"monokai-bright",title:"Monokai Bright",url:n+"Monokai Bright.json"},{name:"night-owl",title:"Night Owl",url:n+"Night Owl.json"},{name:"nord",title:"Nord",url:n+"Nord.json"},{name:"oceanic-next",title:"Oceanic Next",url:n+"Oceanic Next.json"},{name:"pastels-on-dark",title:"Pastels on Dark",url:n+"Pastels on Dark.json"},{name:"slush-and-poppies",title:"Slush and Poppies",url:n+"Slush and Poppies.json"},{name:"solarized-dark",title:"Solarized Dark",url:n+"Solarized-dark.json"},{name:"solarized-light",title:"Solarized Light",url:n+"Solarized-light.json"},{name:"spacecadet",title:"SpaceCadet",url:n+"SpaceCadet.json"},{name:"sunburst",title:"Sunburst",url:n+"Sunburst.json"},{name:"textmate-mac-classic",title:"Textmate (Mac Classic)",url:n+"Textmate (Mac Classic).json"},{name:"tomorrow",title:"Tomorrow",url:n+"Tomorrow.json"},{name:"tomorrow-night",title:"Tomorrow Night",url:n+"Tomorrow-Night.json"},{name:"tomorrow-night-blue",title:"Tomorrow Night Blue",url:n+"Tomorrow-Night-Blue.json"},{name:"tomorrow-night-bright",title:"Tomorrow Night Bright",url:n+"Tomorrow-Night-Bright.json"},{name:"tomorrow-night-eighties",title:"Tomorrow Night Eighties",url:n+"Tomorrow-Night-Eighties.json"},{name:"twilight",title:"Twilight",url:n+"Twilight.json"},{name:"upstream-sunburst",title:"Upstream Sunburst",url:n+"Upstream Sunburst.json"},{name:"vibrant-ink",title:"Vibrant Ink",url:n+"Vibrant Ink.json"},{name:"vs",title:"VS"},{name:"vs-dark",title:"VS Dark"},{name:"xcode-default",title:"Xcode Default",url:n+"Xcode_default.json"},{name:"zenburnesque",title:"Zenburnesque",url:n+"Zenburnesque.json"}],ye=[{name:"custom-vs-light",theme:{base:"vs",inherit:!0,rules:[{token:"comment",fontStyle:"italic"}],colors:{}}},{name:"custom-vs-dark",theme:{base:"vs-dark",inherit:!0,rules:[{token:"comment",fontStyle:"italic"}],colors:{}}},{name:"monochrome",theme:{base:"vs",inherit:!1,rules:[],colors:{"editor.foreground":"#24292e","editorBracketHighlight.foreground1":"#24292e","editorBracketHighlight.foreground2":"#24292e","editorBracketHighlight.foreground3":"#24292e","editorBracketHighlight.foreground4":"#24292e","editorBracketHighlight.unexpectedBracket.foreground":"#24292e"}}},{name:"monochrome-dark",theme:{base:"vs-dark",inherit:!1,rules:[],colors:{"editor.foreground":"#e2e2e3","editor.background":"#24292e","editorBracketHighlight.foreground1":"#e2e2e3","editorBracketHighlight.foreground2":"#e2e2e3","editorBracketHighlight.foreground3":"#e2e2e3","editorBracketHighlight.foreground4":"#e2e2e3","editorBracketHighlight.unexpectedBracket.foreground":"#e2e2e3"}}}];var be=!1,M={},a,Ee=new Set,I,$=[],Vt=async t=>{let{container:o,baseUrl:i,readonly:r,theme:d,editorTheme:c,isEmbed:p,getLanguageExtension:j,mapLanguage:g,getFormatterConfig:R,getFontFamily:Te}=t;if(!o)throw new Error("editor container not found");let x,K=e=>({fontFamily:Te(e.fontFamily),fontSize:e.fontSize||(p?12:14),insertSpaces:!e.useTabs,detectIndentation:!1,tabSize:e.tabSize,lineNumbers:e.lineNumbers?"on":"off",wordWrap:e.wordWrap?"on":"off",autoClosingBrackets:e.closeBrackets?"always":"never",autoClosingQuotes:e.closeBrackets?"always":"never",autoClosingDelete:e.closeBrackets?"always":"never"}),Le=K(t),q=e=>e==="livescript"?"coffeescript":["rescript","reason","ocaml"].includes(e)?"csharp":g(e),T=i+"vendor/monaco-editor/v0.40.0";try{window.monaco=window.monaco||(await import(`${T}/monaco-editor.js`)).monaco,a=window.monaco}catch{throw new Error("Failed to load monaco editor")}ye.forEach(e=>a.editor.defineTheme(e.name,e.theme));let J=async(e,s)=>{let l=xe({editor:"monaco",editorTheme:s,theme:e,editorThemes:z.map(m=>m.name)}),h=l==="vs"?"custom-vs-light":l==="vs-dark"?"custom-vs-dark":l||"custom-vs-"+e;if(Ee.has(h))return h;let f=z.find(m=>m.name===h);return f?.url&&await fetch(f.url).then(m=>m.json()).then(m=>{a.editor.defineTheme(h,m),Ee.add(h)}),h},Me=(e,s)=>{J(e,s).then(l=>{a.editor.setTheme(l)})},B={theme:await J(d,c),fontLigatures:!0,formatOnType:!1,lineNumbersMinChars:3,minimap:{enabled:!1},scrollbar:{useShadows:!1},mouseWheelZoom:!0,automaticLayout:!0,readOnly:r,fixedOverflowWidgets:!0},Se={...B,scrollBeyondLastLine:!1,contextmenu:!1},we={...B,scrollBeyondLastLine:!1},G={...B,glyphMargin:!0,folding:!1,lineDecorationsWidth:0,lineNumbersMinChars:0,scrollbar:{vertical:"auto"},scrollBeyondLastLine:!1,contextmenu:!1},ke={...G},H=t.editorId,Z=H==="console"?G:H==="compiled"?we:H==="embed"?ke:t.mode==="codeblock"?Se:B,S=te({...Le,...Z});if(!document.head.querySelector("#__livecodes__monaco-styles")){let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href",`${T}/monaco-editor.css`),e.id="__livecodes__monaco-styles",document.head.appendChild(e)}window.MonacoEnvironment={getWorkerUrl(e,s){return s==="json"?`${T}/json.worker.js`:s==="css"?`${T}/css.worker.js`:s==="scss"?`${T}/css.worker.js`:s==="sass"?`${T}/css.worker.js`:s==="less"?`${T}/css.worker.js`:s==="html"?`${T}/html.worker.js`:s==="typescript"||s==="javascript"?`${T}/ts.worker.js`:`${T}/editor.worker.js`}};let je=()=>{let e={jsx:a.languages.typescript.JsxEmit.Preserve,allowNonTsExtensions:!0,allowJs:!1,target:a.languages.typescript.ScriptTarget.Latest,experimentalDecorators:!0,allowSyntheticDefaultImports:!0,lib:["esnext","dom"],module:a.languages.typescript.ModuleKind.ESNext};a.languages.typescript.typescriptDefaults.setCompilerOptions(e),(y==="tsx"||y==="jsx"||y==="sucrase"||y==="babel"||y==="flow")&&a.languages.typescript.typescriptDefaults.setCompilerOptions({...e,jsx:a.languages.typescript.JsxEmit.React,jsxFactory:"React.createElement",reactNamespace:"React"}),y==="stencil"&&a.languages.typescript.typescriptDefaults.setCompilerOptions({...e,jsx:a.languages.typescript.JsxEmit.Preserve,jsxFactory:void 0,reactNamespace:"h"}),y==="flow"?a.languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0}):["typescript"].includes(g(y))&&a.languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSemanticValidation:!1})},W=[],He=()=>{W.forEach(e=>u.getModel()?.onDidChangeContent(e))},Q="",X=(e,s,l)=>{let h=oe(),f=j(l),m=q(l)==="typescript"&&!f?.endsWith("ts")&&!f?.endsWith("tsx")?f+".tsx":f;Q=`file:///${H}.${h}.${m}`;let E=e.getModel(),b=a.editor.createModel(s||"",q(l),a.Uri.parse(Q));e.setModel(b),setTimeout(()=>E?.dispose(),1e3),He(),je()},y=t.language,u=a.editor.create(o,{...S,language:q(y)});X(u,t.value,y),["markup","style","script","tests"].includes(H)&&$.push(u),S.theme==="vs-light"&&(o.style.backgroundColor="#fff"),(S.theme?.startsWith("http")||S.theme?.startsWith("./"))&&fetch(S.theme).then(e=>e.json()).then(e=>{a.editor.defineTheme("theme",e),a.editor.setTheme("theme"),o.style.backgroundColor=e.colors["editor.background"]});let ve={astro:i+"monaco-lang-astro.31ace80fb590384d92861650cd635109.js",clio:i+"monaco-lang-clio.bdef68dfea0312fab9a27b5d87146182.js",imba:i+"monaco-lang-imba.b0acc149ca1c00547c24cad4172e8f22.js",wat:i+"monaco-lang-wat.90de1d50eb45ed8f299322a2d8c6f760.js"},qe=async e=>{let s=ve[e];if(s&&!a.languages.getLanguages().find(l=>l.id===e)){let l=(await import(s)).default;a.languages.register({id:e}),l.config&&a.languages.setLanguageConfiguration(e,l.config),l.tokens&&a.languages.setMonarchTokensProvider(e,l.tokens)}},Ce=()=>H,Ue=()=>u.getValue(),Ie=(e="")=>{u.getModel()?.setValue(e)},A=[],N=e=>!e.filename.startsWith("file:///node_modules/"),Y=(e=!0)=>{A.filter(s=>e?!0:N(s)).forEach(s=>{s.libJs.dispose(),s.libTs.dispose()}),A.length=0},Be=()=>y,Ae=(e,s)=>{y=e,Y(!1),X(u,s??u.getValue(),y),qe(e)},Pe=(e,s=!1)=>{let l=A.find(h=>h.filename===e.filename);if(l){if(N(e)&&(l.libJs.dispose(),l.libJs=a.languages.typescript.javascriptDefaults.addExtraLib(e.content,e.filename)),!s)return;l.libJs?.dispose(),l.libTs?.dispose()}A.push({filename:e.filename,libJs:a.languages.typescript.javascriptDefaults.addExtraLib(e.content,e.filename),libTs:N(e)?{dispose:()=>{}}:a.languages.typescript.typescriptDefaults.addExtraLib(e.content,e.filename)})},De=()=>u.focus(),$e=()=>u.layout(),Re=e=>{W.push(e),u.getModel()?.onDidChangeContent(e)},We={CtrlEnter:a.KeyMod.CtrlCmd|a.KeyCode.Enter,ShiftEnter:a.KeyMod.Shift|a.KeyCode.Enter,Enter:a.KeyCode.Enter,UpArrow:a.KeyCode.UpArrow,DownArrow:a.KeyCode.DownArrow,ShiftAltF:a.KeyMod.Shift|a.KeyMod.Alt|a.KeyCode.KeyF},Ne=(e,s,l)=>{u.addAction({id:e,label:e,keybindings:[s],precondition:"!suggestWidgetVisible && !markersNavigationVisible && !findWidgetVisible",run:l})},ee=async e=>{let s=ue(),l=document.querySelector(`#editor-status [data-status="${t.editorId}"]`),h=m=>{s&&(s.textContent=m)},f=m=>{l&&(l.textContent=m)};if(!e){x?.dispose(),x=void 0,f(""),h("");return}if(e==="vim"){if(x?.mode==="vim")return;x?.mode==="emacs"&&(x.dispose(),f(""));let m=await P(me,"MonacoVim"),E=l?.innerHTML!==""?void 0:l;x=m.initVimMode(u,E),x.mode="vim",h("Vim")}if(e==="emacs"){if(x?.mode==="emacs")return;x?.mode==="vim"&&(x.dispose(),f(""));let m=await P(le,"MonacoEmacs");x=new m.EmacsExtension(u),f(""),x.onDidMarkChange(function(E){f(E?"Mark Set!":"Mark Unset")}),x.onDidChangeKey(function(E){f(E)}),x.start(),x.mode="emacs",h("Emacs")}};ee(t.editorMode);let Oe=e=>{let s=u.getModel();!e||!s||a.languages.registerDocumentFormattingEditProvider(q(y),{provideDocumentFormattingEdits:async()=>{let l=u.getValue(),h=await e(l,0,R());return[{range:s.getFullModelRange(),text:h.formatted}]}})},Fe=async()=>u.getAction("editor.action.formatDocument")?.run(),_e=e=>{!e&&!window.emmetMonaco||P(ae,"emmetMonaco").then(s=>{e?(!M.html||M.disabled)&&(M.html=s.emmetHTML(a,["html","php","astro","markdown","mdx"]),M.css=s.emmetCSS(a,["css","scss","less"]),M.jsx=s.emmetJSX(a,["javascript","typescript","jsx","tsx"]),M.disabled=!1):(M.html?.(),M.css?.(),M.jsx?.(),M.disabled=!0)})},Ve=e=>{S={...K(e),...Z},_e(e.emmet),ee(e.editorMode),u.updateOptions(S),Ze(e.enableAI)},ze=()=>{u.getModel()?.undo?.()},Ke=()=>{u.getModel()?.redo?.()},Je=()=>{let e=u.getPosition();return{lineNumber:e?.lineNumber??1,column:e?.column??1}},Ge=e=>{let s={lineNumber:e.lineNumber,column:e.column??1};u.setPosition(s),setTimeout(()=>u.revealPositionInCenter(s,0),50)},Ze=e=>{if(!e){I?.dispose(),I=void 0;return}I||(I={dispose:()=>"loading..."},import(ce).then(s=>{I=s.registerCodeiumProvider(a,{getEditors:()=>$})}))},Qe=()=>{$=$.filter(e=>e!==u),x?.dispose(),W.length=0,Y(!0),u.getModel()?.dispose(),u.dispose(),o.innerHTML=""};window.addEventListener("unhandledrejection",function(e){e.reason&&e.reason.name==="Canceled"&&e.preventDefault()});let Xe=e=>{let s=["html","markdown","javascript","typescript"],l=u.getModel();if(!l||!s.includes(q(y))||S.autoClosingBrackets==="never")return;let h=f=>["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr","circle","ellipse","line","path","polygon","polyline","rect","stop","use"].includes(f);if(e.browserEvent.key===">"){let f=u.getSelections()||[],m=[],E=[];for(let b of f){E.push(new a.Selection(b.selectionStartLineNumber,b.selectionStartColumn+1,b.endLineNumber,b.endColumn+1));let L=l.getValueInRange({startLineNumber:1,startColumn:1,endLineNumber:b.endLineNumber,endColumn:b.endColumn}).match(/<([\w-]+)(?![^>]*\/>)[^>]*$/);if(!L)continue;let[O,C]=L;h(C)||O.trim().endsWith("/")||m.push({range:{startLineNumber:b.endLineNumber,startColumn:b.endColumn+1,endLineNumber:b.endLineNumber,endColumn:b.endColumn+1},text:`</${C}>`})}setTimeout(()=>{u.executeEdits(l.getValue(),m,E)},0)}};return u.onKeyDown(Xe),be||(()=>{let e=new Map,s={provideHover(l,h){let f=l.getLineContent(h.lineNumber),m=pe(f,!0)[0];if(!m||m.startsWith("https://")||m.startsWith("http://")||m.startsWith(".")||m.startsWith("data:")||m.startsWith("blob:"))return;let E=m.split("/"),b=E[0].startsWith("@")?2:1;return m=E.slice(0,b).join("/"),(async()=>{let w;if(e.has(m))w=e.get(m);else{if(w=await fe.getPkgInfo(m),"error"in w)return;e.set(m,w)}if(!w||"error"in w)return;let{name:L,description:O="",repo:C=""}=w;return{contents:[{value:`## [${L}](https://www.npmjs.com/package/${L})
${O}


${C?`[GitHub](${C}) |`:""} [Skypack](https://skypack.dev/view/${L}) | [jsDelivr](https://www.jsdelivr.com/package/npm/${L}) | [Unpkg](https://unpkg.com/browse/${L}/) | [Snyk](https://snyk.io/advisor/npm-package/${L}) | [Bundlephobia](https://bundlephobia.com/package/${L})

Docs: [Importing modules](${new URL("/livecodes/docs/",location.href).href}features/module-resolution)`}]}})()}};a.languages.registerHoverProvider("javascript",s),a.languages.registerHoverProvider("typescript",s),a.languages.registerHoverProvider("html",s)})(),be=!0,{getValue:Ue,setValue:Ie,getLanguage:Be,setLanguage:Ae,getEditorId:Ce,focus:De,getPosition:Je,setPosition:Ge,layout:$e,addTypes:Pe,changeSettings:Ve,onContentChanged:Re,keyCodes:We,addKeyBinding:Ne,registerFormatter:Oe,format:Fe,isReadonly:r,setTheme:Me,undo:ze,redo:Ke,destroy:Qe,monaco:u}};export{Vt as createEditor};
