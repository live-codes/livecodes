const e=require("fs"),t=require("crypto"),i=async({devMode:i=!1,buildDir:r="build/livecodes/",entryPoint:a="index.js",patchFiles:l=["build/index.html"],hashPattern:s=/{{hash:([\w\.-]+)}}/g}={})=>{let n=["js","css","html","svg","ico","png","json"],o=async t=>(await e.promises.readdir(t)).filter(i=>!e.statSync(t+i).isDirectory()).filter(e=>n.some(t=>e.endsWith("."+t))),f=async e=>{let t=[];for(let i of e)(await o(i)).forEach(e=>{t.push(i+e)});return t},w=async()=>{for(let t of[...l,...await f([r])]){let i=(await e.promises.readFile(t,"utf8")).replace(new RegExp(s),(e,t)=>t);await e.promises.writeFile(t,i,"utf8")}};if(i)return w();let c=(e,t)=>{let i=n.find(t=>e.endsWith("."+t));return i&&(e=u(e).replace(`.${i}`,`.${t}.${i}`)),e},u=e=>{let t=e.split(".");return e.length<35||t.length<3?e:t.filter((e,t)=>32!==e.length||0===t).join(".")},p=e=>t.createHash("md5").update(e).digest("hex"),d={},h=async t=>{if(d[t])return;d[t]="waiting";let a=await e.promises.readFile(r+t,"utf8").catch(e=>{if(i)return"";throw e});for(let e of a.matchAll(new RegExp(s))){let t=e[1];t&&!d[t]&&await h(t)}let l=a.replace(new RegExp(s),(e,t)=>d[t]);if(i){d[t]=t,await e.promises.writeFile(r+t,l,"utf8");return}let n=c(t,p(l));d[t]=n,await e.promises.writeFile(r+n,l,"utf8")};for(let t of(await h(a),Object.keys(d)))d[t]!==t&&await e.promises.unlink(r+t).catch(e=>{if(!i)throw e});for(let t of l){let i=(await e.promises.readFile(t,"utf8")).replace(new RegExp(s),(e,t)=>d[t]);await e.promises.writeFile(t,i,"utf8")}};module.exports={applyHash:i},require.main===module&&i();