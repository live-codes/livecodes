var C=["esm.sh","skypack","jspm"],v=["unpkg","jsdelivr","fastly.jsdelivr"],k=["fastly.jsdelivr.gh","jsdelivr.gh","statically"],l={getModuleUrl:(t,{isModule:e=!0,defaultCDN:s="esm.sh"}={})=>{t=t.replace(/#nobundle/g,"");let r=w(t,e,s);return r||(e?"https://esm.sh/"+t:"https://cdn.jsdelivr.net/npm/"+t)},getUrl:(t,e)=>t.startsWith("http")||t.startsWith("data:")?t:w(t,!1,e||A())||t,cdnLists:{npm:v,module:C,gh:k},checkCDNs:async(t,e)=>{let s=[e,...l.cdnLists.npm].filter(Boolean);for(let r of s)try{if((await fetch(l.getUrl(t,r),{method:"HEAD"})).ok)return r}catch{}return l.cdnLists.npm[0]}},A=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||l.cdnLists.npm[0]}catch{return l.cdnLists.npm[0]}},w=(t,e,s)=>{let r=e&&t.startsWith("unpkg:")?"?module":"";t.startsWith("gh:")?t=t.replace("gh",k[0]):t.includes(":")||(t=(s||(e?C[0]:v[0]))+":"+t);for(let o of O){let[n,i]=o;if(n.test(t))return t.replace(n,i)+r}return null},O=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://esm.sh/$2"],[/^(node:)(.+)/i,"https://esm.sh/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(fastly.jsdelivr:)(.+)/i,"https://fastly.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(fastly.jsdelivr.gh:)(.+)/i,"https://fastly.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var E=t=>t.replace(/<\/script>/g,"<\\/script>");var x=(t,e="_")=>t.replace(/[\W]+/g,e);var d=(t,e,s)=>{let r=document.createElement("a");r.style.display="none",r.href=s,r.download=x(t)+"."+e,r.click(),r.remove()},L=(t,e)=>new Promise((s,r)=>{if(e&&globalThis[e])return s(globalThis[e]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(t),e&&globalThis[e]?s(globalThis[e]):s(globalThis);let o=document.createElement("script");o.src=t,o.async=!0;let n=()=>{o.removeEventListener("load",i),o.removeEventListener("error",a)},i=()=>{if(n(),!e)return s("loaded: "+t);let p=setInterval(()=>{if(window[e])return clearInterval(p),s(window[e])},5)},a=()=>{n(),r("failed to load: "+t)};o.addEventListener("load",i),o.addEventListener("error",a),document.head.appendChild(o)});var y=t=>t.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,"$1");var b=/(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g,P=/(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g,N=(t,e=!1)=>[...y(t).matchAll(new RegExp(b)),...y(t).matchAll(new RegExp(P))].map(s=>s[2].replace(/"/g,"").replace(/'/g,"")).map(s=>!e||!S(s)||!s.includes(":")?s:s.split(":")[1]),z=t=>!t.startsWith("https://deno.bundlejs.com/")&&!t.startsWith("https://edge.bundlejs.com/")&&!t.endsWith("#nobundle")&&(t.startsWith("https://deno.land/")||t.startsWith("https://github.com/")||t.startsWith("https://raw.githubusercontent.com/")||t.startsWith("https://gitlab.com/")||t.startsWith("https://bitbucket.org")||t.endsWith(".ts")||t.endsWith(".jsx")||t.endsWith(".tsx")),S=t=>!t.startsWith("https://")&&!t.startsWith("http://")&&!t.startsWith(".")&&!t.startsWith("/")&&!t.startsWith("data:")&&!t.startsWith("blob:"),H=t=>(t.endsWith(".css")||t.endsWith(".scss")||t.endsWith(".sass")||t.endsWith(".less")||t.endsWith(".styl"))&&!t.startsWith("./style"),$=(t,e)=>Object.keys(e).find(s=>s===t||t.startsWith(s+"/")),J=(t,e,s=!0)=>N(t).map(r=>{if(!z(r)&&!S(r)||H(r))return{};{let o={...e.imports,...e.customSettings?.imports},n=$(r,o);return n?{[n]:o[n]}:s?{[r]:l.getModuleUrl(r,{defaultCDN:e?.customSettings?.defaultCDN})}:{}}}).reduce((r,o)=>({...r,...o}),{});var T=(t,e,s)=>(s=s||J(t,e),t.replace(new RegExp(b),r=>{if(!s)return r;let o=r.replace(new RegExp(b),"$2").replace(/"/g,"").replace(/'/g,""),n=$(o,s);return n?r.replace(n,s[n]):r}));var u=(t,{getLanguageExtension:e})=>{let s={markup:"index",style:"style",script:"script"},r=Object.keys(s).reduce((a,p)=>{let c=s[p],m=t[p].language,g=e?.(m)||"md",U=t[p].content||"";return{...a,...U?{[c+"."+g]:{content:U}}:{}}},{}),o=t.stylesheets.length>0?{styles:{content:t.stylesheets.map(a=>`<link rel="stylesheet" href="${a}" />`).join(`
`)}}:void 0,n=t.scripts.length>0?{scripts:{content:t.scripts.map(a=>`<script src="${a}"><\/script>`).join(`
`)}}:void 0,i=t.tests?.content?{["script.spec."+e?.(t.tests?.language)||"ts"]:{content:t.tests?.content}}:void 0;return{...r,...o,...n,...i}},j=(t,e,s,r=!0)=>{let o=r?"https://gist.github.com/":"https://github.com/",n=e?e.username?"by ["+e.displayName+"]("+o+e.username+")":"by "+e.displayName:"",i=s?`[project](https://livecodes.io/?x=${s})`:"project";return{[x(t.title)+".md"]:{content:`# ${t.title}
A ${i} created ${n} on [LiveCodes](https://livecodes.io).`}}},h=({baseUrl:t,editorId:e,config:s,compiled:r,supportedLanguages:o,getLanguageCompiler:n})=>{if(o[e].includes(s[e].language))return[];let i=n?.(s[e].language)?.scripts,a=s[e].language==="python"?s[e].content||"":r[e];return(typeof i=="function"?i({compiled:a,baseUrl:t,config:s}):i)?.filter(c=>c.startsWith("https://"))||[]},f=({editorId:t,config:e,compiled:s,supportedLanguages:r,getLanguageCompiler:o})=>{let n=["javascript","jsx","tsx",...r.script].includes(e.script.language),i={markup:["html",...r.markup].includes(e.markup.language)?e.markup.content:s.markup,style:["css",...r.style].includes(e.style.language)?e.style.content:s.style,script:e.script.language==="php"?e.script.content?.replace(/<\?php/g,"")||"":e.script.language==="python"?e.script.content:T((n?e.script.content:s.script)||"",e)},a=o?.(e.script.language)?.scriptType;if(!n&&a&&a!=="module"){if(t==="markup")return i.markup+`
<script type="${a}">
${E(i.script||"")}
<\/script>
`;if(t==="script")return e.script.language==="python"?'window.addEventListener("load", () => {brython()});':""}return i[t]||""};var q=(t,{baseUrl:e,compiled:s,deps:r})=>{let o=document.createElement("form");o.action="https://codepen.io/pen/define",o.method="POST",o.target="_blank",o.style.display="none";let n=document.createElement("input");n.name="data";let i={markup:["markdown","haml"],style:["less","scss","sass","stylus"],script:["babel","typescript","coffeescript","livescript"]},a=c=>f({editorId:c,config:t,compiled:s,supportedLanguages:i,...r}),p=c=>h({baseUrl:e,editorId:c,config:t,compiled:s,supportedLanguages:i,...r});n.value=JSON.stringify({title:t.title,desciption:t.description,tags:t.tags,html:a("markup"),html_pre_processor:i.markup.includes(t.markup.language)?t.markup.language:"none",css:a("style"),css_pre_processor:i.style.includes(t.style.language)?t.style.language:"none",css_starter:t.cssPreset==="normalize.css"?"normalize":t.cssPreset==="reset-css"?"reset":"neither",css_prefix:t.processors.includes("autoprefixer")?"autoprefixer":"neither",js:a("script"),js_pre_processor:i.script.includes(t.script.language)?t.script.language:t.script.language==="jsx"?"babel":t.script.language==="tsx"?"typescript":"none",html_classes:typeof t.htmlAttrs=="object"&&t.htmlAttrs.class||"",head:t.head||"",css_external:t.stylesheets.join(";"),js_external:[...t.scripts,...p("markup"),...p("style"),...p("script")].join(";")}),o.appendChild(n),document.body.appendChild(o),o.submit(),o.remove()};var R=async(t,{user:e,deps:s})=>{if(!e)return;let r=V(t,e,s),n=await(await I(t,e,r)).json();if(n.id){let i=j(t,e,n.html_url);await I(t,e,i,n.id),window.open("https://gist.github.com/"+n.id)}},V=(t,e,s)=>{let r=j(t,e),o=u(t,s);return{...r,...o}},I=(t,e,s,r)=>{let o={accept:"application/vnd.github.v3+json",description:t.title,files:s,public:!0},n="https://api.github.com/gists";return r&&(n+="/"+r),fetch(n,{method:r?"PATCH":"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"token "+e.token},body:JSON.stringify(o)})};var F=(t,e)=>{let s=t.title,r="html",o="data:text/html;charset=utf-8,"+encodeURIComponent(e);d(s,r,o)};var W=(t,{baseUrl:e,compiled:s,deps:r})=>{let o=document.createElement("form");o.action="https://jsfiddle.net/api/post/library/pure/",o.method="POST",o.target="_blank",o.style.display="none";let n={markup:["haml"],style:["scss","sass"],script:["babel","typescript","coffeescript"]},i=c=>f({editorId:c,config:t,compiled:s,supportedLanguages:n,...r}),a=c=>h({baseUrl:e,editorId:c,config:t,compiled:s,supportedLanguages:n,...r}),p={title:t.title,description:t.description||"",html:i("markup"),css:i("style"),css_panel:t.style.language==="scss"?"1":"0",js:i("script"),js_panel:t.script.language==="typescript"?"4":t.script.language==="jsx"?"3":t.script.language==="coffeescript"?"5":"0",resources:[...t.stylesheets,...t.scripts,...a("markup"),...a("style"),...a("script")].join(",")};Object.keys(p).forEach(c=>{let m=document.createElement("input");m.name=c,m.value=p[c],o.appendChild(m)}),document.body.appendChild(o),o.submit(),o.remove()};var _=t=>{let e=t.title,s="json",r="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(t,null,2));d(e,s,r)};var{getUrl:M,getModuleUrl:Tt}=l;var B=M("jszip@3.10.1/dist/jszip.js");var K="0.6.64",qt=M(`malinajs@${K}/malina.js`);var D=async(t,{html:e,deps:s},r)=>{let o=await L(B,"JSZip"),n=new o,i=u(t,s);Object.keys(i).forEach(g=>{n.file(g,i[g]?.content)}),n.file("result.html",e),n.file("livecodes.json",JSON.stringify(t,null,2));let a=await n.generateAsync({type:"base64"}),p=t.title,c="zip",m="data:application/zip;base64,"+encodeURIComponent(a);d(p,c,m)};var Nt=(t,e,s,r)=>{({json:_,src:D,html:F,codepen:q,jsfiddle:W,githubGist:R})[s](t,r,e)};export{Nt as exportConfig};