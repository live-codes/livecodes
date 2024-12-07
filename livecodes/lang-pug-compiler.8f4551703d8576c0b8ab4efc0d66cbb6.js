"use strict";(()=>{var r=(t,e=!0)=>t.replace(/\\/g,e?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var s=(t,e)=>({...e.customSettings[t]});self.createPugCompiler=()=>async(t,{config:e})=>{let n=s("pug",e),o=e.customSettings.template?.data||{};return e.customSettings.template?.prerender!==!1?window.pug.compile(t,n)(o):`<!-- ... compiling ... -->

<script>
window.addEventListener("load", () => {
${window.pug.compileClient(t,{...n,name:"clientFn"})}
const content = clientFn({
...${r(JSON.stringify(o))},
...window.livecodes?.templateData,
});
document.body.innerHTML += content;
parent.postMessage({type: 'compiled', payload: {language: 'pug', content}}, '*');
});
<\/script>
`};})();
