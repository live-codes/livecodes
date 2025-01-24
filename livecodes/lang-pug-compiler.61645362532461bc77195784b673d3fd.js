"use strict";(()=>{var o=(t,e=!0)=>t.replace(/\\/g,e?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var s=(t,e)=>({...e.customSettings[t]});self.createPugCompiler=()=>async(t,{config:e})=>{let n=s("pug",e),r=e.customSettings.template?.data||{};return e.customSettings.template?.prerender!==!1?window.pug.compile(t,n)(r):`<!-- ... compiling ... -->

<script>
window.addEventListener("load", () => {
${window.pug.compileClient(t,{...n,name:"clientFn"})}
const content = clientFn({
...${o(JSON.stringify(r))},
...window.livecodes?.templateData,
});
document.body.innerHTML += content;
parent.postMessage({type: 'compiled', payload: {language: 'pug', content}}, '*');
});
<\/script>
`};})();
