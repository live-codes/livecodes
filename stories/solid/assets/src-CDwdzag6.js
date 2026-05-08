import{n as e,t}from"./chunk-BneVvdWh.js";import{n,t as r}from"./preload-helper-nVtPd9zc.js";import{C as i,S as a,_ as o,b as s,d as c,f as l,g as u,h as d,m as f,p,v as m,w as h,x as g,y as _}from"./iframe-qLl5n6Tf.js";var v,y,b=e((()=>{l(),s(),v=d(`<div>`),y=e=>t=>{let n,r,o=JSON.stringify(t.config||``),s=``,l=0,d=()=>{let e={};return t.appUrl!==void 0&&(e.appUrl=t.appUrl),t.import!==void 0&&(e.import=t.import),t.headless!==void 0&&(e.headless=t.headless),t.lite!==void 0&&(e.lite=t.lite),t.loading!==void 0&&(e.loading=t.loading),t.params!==void 0&&(e.params=t.params),t.template!==void 0&&(e.template=t.template),t.view!==void 0&&(e.view=t.view),e},g=()=>{if(!n)return;let i=t.config,a=t.sdkReady,c=d(),u=JSON.stringify(c),f=++l,p=()=>f!==l;if(!r||s!==u)s=u,o=JSON.stringify(i||``),r?.destroy(),r=void 0,e(n,{config:i,...c}).then(e=>{if(p()){e.destroy();return}r=e,typeof a==`function`&&a(e)});else{let e=JSON.stringify(i);if(o===e)return;o=e,typeof i==`string`?fetch(i).then(e=>e.json()).then(e=>{p()||r?.setConfig(e)}):i&&r.setConfig(i)}};return h(()=>{g()}),m(a(()=>[t.config,t.appUrl,t.import,t.headless,t.lite,t.loading,t.params,t.template,t.view,t.sdkReady],()=>{g()},{defer:!0})),i(()=>{++l,r?.destroy()}),(()=>{var e=v(),r=n;return typeof r==`function`?u(r,e):n=e,_(n=>{var r=t.class,i={...t.style,...t.height?{height:Number(t.height)?`${t.height}px`:t.height}:{}},a=t.height;return r!==n.e&&c(e,n.e=r),n.t=f(e,i,n.t),a!==n.a&&p(e,`data-height`,n.a=a),n},{e:void 0,t:void 0,a:void 0}),e})()}}));async function x(e,t={}){typeof e==`object`&&!(e instanceof HTMLElement)&&(e.headless||e.view===`headless`)&&(t=e,e=null);let n=6e4,{config:r={},headless:i,loading:a=`lazy`,view:o}=t,s=i||o===`headless`,c=null,l=null,u=e=>{e.style.position=`absolute`,e.style.top=`0`,e.style.visibility=`hidden`,e.style.opacity=`0`};if(typeof e==`string`)c=document.querySelector(e);else if(e instanceof HTMLElement)c=e;else if(!(s&&typeof e==`object`))throw Error(`A valid container element is required.`);if(!c)if(s)c=document.createElement(`div`),u(c),document.body.appendChild(c);else throw Error(`Cannot find element: "${e}"`);let d=new URL(ee(t)),f=d.origin;d.searchParams.set(`embed`,`true`),d.searchParams.set(`loading`,s?`eager`:a),d.searchParams.set(`sdkVersion`,`0.14.1`),typeof r==`object`&&Object.keys(r).length>0&&d.searchParams.set(`config`,`sdk`);let p=t.params;typeof p==`object`&&Object.keys(p).length>0&&JSON.stringify(p).length<1800&&Object.keys(p).forEach(e=>{d.searchParams.set(e,encodeURIComponent(String(p[e])))});let m=!1,h="Cannot call API methods after calling `destroy()`.",g=[],_=(e,t=`message`)=>{addEventListener(t,e),g.push(e)},v=(e,t=`message`)=>{removeEventListener(t,e);let n=g.indexOf(e);n>-1&&g.splice(n,1)},y=await new Promise(e=>{var t,n,i,o,p,m,h,g,y;if(!c)return;let b=c.dataset.height||c.style.height;if(b&&!s){let e=isNaN(Number(b))?b:b+`px`;c.style.height=e}c.dataset.defaultStyles!==`false`&&!s&&((t=c.style).backgroundColor||(t.backgroundColor=`#fff`),(n=c.style).border||(n.border=`1px solid black`),(i=c.style).borderRadius||(i.borderRadius=`8px`),(o=c.style).boxSizing||(o.boxSizing=`border-box`),(p=c.style).padding||(p.padding=`0`),(m=c.style).width||(m.width=`100%`),(h=c.style).height||(h.height=c.style.height||`300px`),c.style.minHeight=`200px`,c.style.flexGrow=`1`,(g=c.style).overflow||(g.overflow=`hidden`),(y=c.style).resize||(y.resize=`vertical`),getComputedStyle(c).getPropertyValue(`display`)===`inline`&&(c.style.display=`block`));let x=`livecodes`,ee=c.querySelector(`iframe.${x}`),S=ee||document.createElement(`iframe`);S.classList.add(x),S.setAttribute(`allow`,le()),S.setAttribute(`allowtransparency`,`true`),S.setAttribute(`allowpaymentrequest`,`true`),S.setAttribute(`allowfullscreen`,`true`),S.setAttribute(`sandbox`,`allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts`);let C=a===`eager`?`eager`:`lazy`;S.setAttribute(`loading`,C),s?u(S):(S.style.height=`100%`,S.style.minHeight=`200px`,S.style.width=`100%`,S.style.margin=`0`,S.style.border=`0`,S.style.borderRadius=c.style.borderRadius),_(function e(t){t.source!==S.contentWindow||t.origin!==f||t.data?.type!==`livecodes-init`||(v(e),l=Number(t.data.payload.appVersion.replace(/^v/,``)))}),(!l||l<46)&&_(function e(t){var n;t.source!==S.contentWindow||t.origin!==f||t.data?.type!==`livecodes-get-config`||(v(e),(n=S.contentWindow)==null||n.postMessage({type:`livecodes-config`,payload:r},f))}),S.onload=()=>{e(S)},S.src=d.href,ee||c.appendChild(S)}),b=new Promise(e=>{_(function t(n){n.source!==y.contentWindow||n.origin!==f||n.data?.type!==`livecodes-ready`||(v(t),e(),b.settled=!0)})}),x=()=>m?Promise.reject(h):new Promise(async e=>{var t;b.settled&&e(),(t=y.contentWindow)==null||t.postMessage({type:`livecodes-load`},f),await b,e()}),S=(e,t)=>new Promise(async(r,i)=>{var a;if(m)return i(h);await x();let o=ae(),s=setTimeout(()=>{v(c),i(Error(`SDK call "${e}" timed out after ${n}ms.`))},n);function c(t){if(!(t.source!==y.contentWindow||t.origin!==f||t.data?.type!==`livecodes-api-response`||t.data?.id!==o)&&t.data.method===e){clearTimeout(s),v(c);let e=t.data.payload;e!=null&&e.error?i(e.error):r(e)}}_(c),(a=y.contentWindow)==null||a.postMessage({method:e,id:o,args:t},f)}),C={},te=[`load`,`ready`,`code`,`console`,`tests`,`destroy`],ne=(e,t)=>{var n;if(m)throw Error(h);return te.includes(e)?(S(`watch`,[e]),C[e]||(C[e]=[]),(n=C[e])==null||n.push(t),{remove:()=>{C[e]=C[e]?.filter(e=>e!==t),C[e]?.length===0&&S(`watch`,[e,`unsubscribe`])}}):{remove:()=>{}}},re=e=>({"livecodes-app-loaded":`load`,"livecodes-ready":`ready`,"livecodes-change":`code`,"livecodes-console":`console`,"livecodes-test-results":`tests`,"livecodes-destroy":`destroy`})[e];_(async function(e){var t;let n=re(e.data?.type??``);if(e.source!==y.contentWindow||e.origin!==f||!n||!C[n])return;let r=e.data?.payload;(t=C[n])==null||t.forEach(e=>{e(r)})});let ie=()=>{var e;(e=y?.remove)==null||e.call(y),Object.values(C).forEach(e=>{e.length=0}),g.forEach(e=>removeEventListener(`message`,e)),g.length=0,w&&c&&w.unobserve(c),m=!0},w;a===`lazy`&&`IntersectionObserver`in window&&(w=new IntersectionObserver((e,t)=>{e.forEach(async e=>{e.isIntersecting&&(await x(),t.unobserve(c))})},{rootMargin:`150px`}),w.observe(c));let ae=()=>(String(Math.random())+Date.now().toFixed()).replace(`0.`,``);return{load:()=>x(),run:()=>S(`run`),format:e=>S(`format`,[e]),getShareUrl:e=>S(`getShareUrl`,[e]),getConfig:e=>S(`getConfig`,[e]),setConfig:e=>S(`setConfig`,[e]),getCode:()=>S(`getCode`),show:(e,t)=>S(`show`,[e,t]),runTests:()=>S(`runTests`),onChange:e=>ne(`code`,e),watch:ne,exec:(e,...t)=>S(`exec`,[e,...t]),destroy:()=>m?Promise.reject(h):(ie(),Promise.resolve())}}function ee(e={}){let{appUrl:t=`https://livecodes.io`,params:n={},config:r={},headless:i,import:a,lite:o,view:s,...c}=e,l;try{l=new URL(t)}catch{throw Error(`${t} is not a valid URL.`)}let u=new URLSearchParams;Object.entries(c).forEach(([e,t])=>{t!==void 0&&l.searchParams.set(e,String(t))});let d=e.view===`headless`||i;if(o&&(console.warn(`Deprecation notice: "lite" option is deprecated. Use "config: { mode: 'lite' }" instead.`),typeof r==`object`&&r.mode==null?r.mode=`lite`:l.searchParams.set(`lite`,`true`)),s&&(console.warn(`Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".`),typeof r==`object`&&r.view==null&&s!==`headless`?r.view=s:l.searchParams.set(`view`,s)),typeof r==`string`)try{new URL(r),l.searchParams.set(`config`,encodeURIComponent(r))}catch{throw Error(`"config" is not a valid URL or configuration object.`)}else r&&typeof r==`object`&&Object.keys(r).length>0&&(r.title&&r.title!==`Untitled Project`&&l.searchParams.set(`title`,r.title),r.description&&r.description.length>0&&l.searchParams.set(`description`,r.description),u.set(`config`,`code/`+(0,T.compressToEncodedURIComponent)(JSON.stringify(r))));if(n&&typeof n==`object`&&Object.keys(n).length>0)try{u.set(`params`,(0,T.compressToEncodedURIComponent)(JSON.stringify(n)))}catch{Object.keys(n).forEach(e=>{l.searchParams.set(e,encodeURIComponent(String(n[e])))})}return a&&l.searchParams.set(`x`,encodeURIComponent(a)),d&&l.searchParams.set(`headless`,`true`),u.toString().length>0&&(l.hash=u.toString()),l.href}var S,C,te,ne,re,ie,w,ae,oe,T,se,ce,le,ue=e((()=>{S=Object.create,C=Object.defineProperty,te=Object.getOwnPropertyDescriptor,ne=Object.getOwnPropertyNames,re=Object.getPrototypeOf,ie=Object.prototype.hasOwnProperty,w=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),ae=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(let i of ne(t))!ie.call(e,i)&&i!==n&&C(e,i,{get:()=>t[i],enumerable:!(r=te(t,i))||r.enumerable});return e},oe=(e,t,n)=>(n=e==null?{}:S(re(e)),ae(t||!e||!e.__esModule?C(n,`default`,{value:e,enumerable:!0}):n,e)),T=oe(w((e,t)=>{var n=function(){var e=String.fromCharCode,t=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$`,r={};function i(e,t){if(!r[e]){r[e]={};for(var n=0;n<e.length;n++)r[e][e.charAt(n)]=n}return r[e][t]}var a={compressToBase64:function(e){if(e==null)return``;var n=a._compress(e,6,function(e){return t.charAt(e)});switch(n.length%4){default:case 0:return n;case 1:return n+`===`;case 2:return n+`==`;case 3:return n+`=`}},decompressFromBase64:function(e){return e==null?``:e==``?null:a._decompress(e.length,32,function(n){return i(t,e.charAt(n))})},compressToUTF16:function(t){return t==null?``:a._compress(t,15,function(t){return e(t+32)})+` `},decompressFromUTF16:function(e){return e==null?``:e==``?null:a._decompress(e.length,16384,function(t){return e.charCodeAt(t)-32})},compressToUint8Array:function(e){for(var t=a.compress(e),n=new Uint8Array(t.length*2),r=0,i=t.length;r<i;r++){var o=t.charCodeAt(r);n[r*2]=o>>>8,n[r*2+1]=o%256}return n},decompressFromUint8Array:function(t){if(t==null)return a.decompress(t);for(var n=Array(t.length/2),r=0,i=n.length;r<i;r++)n[r]=t[r*2]*256+t[r*2+1];var o=[];return n.forEach(function(t){o.push(e(t))}),a.decompress(o.join(``))},compressToEncodedURIComponent:function(e){return e==null?``:a._compress(e,6,function(e){return n.charAt(e)})},decompressFromEncodedURIComponent:function(e){return e==null?``:e==``?null:(e=e.replace(/ /g,`+`),a._decompress(e.length,32,function(t){return i(n,e.charAt(t))}))},compress:function(t){return a._compress(t,16,function(t){return e(t)})},_compress:function(e,t,n){if(e==null)return``;var r,i,a={},o={},s=``,c=``,l=``,u=2,d=3,f=2,p=[],m=0,h=0,g;for(g=0;g<e.length;g+=1)if(s=e.charAt(g),Object.prototype.hasOwnProperty.call(a,s)||(a[s]=d++,o[s]=!0),c=l+s,Object.prototype.hasOwnProperty.call(a,c))l=c;else{if(Object.prototype.hasOwnProperty.call(o,l)){if(l.charCodeAt(0)<256){for(r=0;r<f;r++)m<<=1,h==t-1?(h=0,p.push(n(m)),m=0):h++;for(i=l.charCodeAt(0),r=0;r<8;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}else{for(i=1,r=0;r<f;r++)m=m<<1|i,h==t-1?(h=0,p.push(n(m)),m=0):h++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}u--,u==0&&(u=2**f,f++),delete o[l]}else for(i=a[l],r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;u--,u==0&&(u=2**f,f++),a[c]=d++,l=String(s)}if(l!==``){if(Object.prototype.hasOwnProperty.call(o,l)){if(l.charCodeAt(0)<256){for(r=0;r<f;r++)m<<=1,h==t-1?(h=0,p.push(n(m)),m=0):h++;for(i=l.charCodeAt(0),r=0;r<8;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}else{for(i=1,r=0;r<f;r++)m=m<<1|i,h==t-1?(h=0,p.push(n(m)),m=0):h++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}u--,u==0&&(u=2**f,f++),delete o[l]}else for(i=a[l],r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;u--,u==0&&(u=2**f,f++)}for(i=2,r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;for(;;)if(m<<=1,h==t-1){p.push(n(m));break}else h++;return p.join(``)},decompress:function(e){return e==null?``:e==``?null:a._decompress(e.length,32768,function(t){return e.charCodeAt(t)})},_decompress:function(t,n,r){var i=[],a=4,o=4,s=3,c=``,l=[],u,d,f,p,m,h,g,_={val:r(0),position:n,index:1};for(u=0;u<3;u+=1)i[u]=u;for(f=0,m=2**2,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;switch(f){case 0:for(f=0,m=2**8,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;g=e(f);break;case 1:for(f=0,m=2**16,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;g=e(f);break;case 2:return``}for(i[3]=g,d=g,l.push(g);;){if(_.index>t)return``;for(f=0,m=2**s,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;switch(g=f){case 0:for(f=0,m=2**8,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;i[o++]=e(f),g=o-1,a--;break;case 1:for(f=0,m=2**16,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;i[o++]=e(f),g=o-1,a--;break;case 2:return l.join(``)}if(a==0&&(a=2**s,s++),i[g])c=i[g];else if(g===o)c=d+d.charAt(0);else return null;l.push(c),i[o++]=d+c.charAt(0),a--,d=c,a==0&&(a=2**s,s++)}}};return a}();t!==void 0&&t!=null&&(t.exports=n)})()),se={chrome:[`accelerometer`,`bluetooth`,`camera`,`clipboard-read`,`clipboard-write`,`display-capture`,`encrypted-media`,`geolocation`,`gyroscope`,`language-detector`,`language-model`,`local-network-access`,`microphone`,`midi`,`proofreader`,`rewriter`,`serial`,`summarizer`,`translator`,`web-share`,`writer`,`window-placement`,`xr-spatial-tracking`],firefox:[`camera`,`display-capture`,`geolocation`,`microphone`,`web-share`],default:[`accelerometer`,`ambient-light-sensor`,`camera`,`display-capture`,`encrypted-media`,`geolocation`,`gyroscope`,`microphone`,`midi`,`payment`,`serial`,`vr`,`web-share`,`xr-spatial-tracking`]},ce=()=>{if(typeof navigator>`u`)return`default`;let e=navigator.userAgent;return/Firefox\//i.test(e)?`firefox`:/Chrome\//i.test(e)?`chrome`:`default`},le=()=>se[ce()].filter(e=>{var t;let n=((t=globalThis.document?.featurePolicy)?.features)?.call(t);return n?n.includes(e):!0}).join(`; `),T.compressToEncodedURIComponent,T.decompressFromEncodedURIComponent})),de,fe=e((()=>{b(),ue(),de=y(x)})),pe=e((()=>{fe()}));function me(e){return e&&e.constructor&&typeof e.constructor.isBuffer==`function`&&e.constructor.isBuffer(e)}function he(e){return e}function ge(e,t){t||={};let n=t.delimiter||`.`,r=t.maxDepth,i=t.transformKey||he,a={};function o(e,s,c){c||=1,Object.keys(e).forEach(function(l){let u=e[l],d=t.safe&&Array.isArray(u),f=Object.prototype.toString.call(u),p=me(u),m=f===`[object Object]`||f===`[object Array]`,h=s?s+n+i(l):i(l);if(!d&&!p&&m&&Object.keys(u).length&&(!t.maxDepth||c<r))return o(u,h,c+1);a[h]=u})}return o(e),a}function _e(e,t){t||={};let n=t.delimiter||`.`,r=t.overwrite||!1,i=t.transformKey||he,a={};if(me(e)||Object.prototype.toString.call(e)!==`[object Object]`)return e;function o(e){let n=Number(e);return isNaN(n)||e.indexOf(`.`)!==-1||t.object?e:n}function s(e,t,r){return Object.keys(r).reduce(function(t,i){return t[e+n+i]=r[i],t},t)}function c(e){let t=Object.prototype.toString.call(e),n=t===`[object Array]`,r=t===`[object Object]`;if(!e)return!0;if(n)return!e.length;if(r)return!Object.keys(e).length}return e=Object.keys(e).reduce(function(n,r){let i=Object.prototype.toString.call(e[r]);return!(i===`[object Object]`||i===`[object Array]`)||c(e[r])?(n[r]=e[r],n):s(r,n,ge(e[r],t))},{}),Object.keys(e).forEach(function(s){let c=s.split(n).map(i),l=o(c.shift()),u=o(c[0]),d=a;for(;u!==void 0;){if(l===`__proto__`)return;let e=Object.prototype.toString.call(d[l]),n=e===`[object Object]`||e===`[object Array]`;if(!r&&!n&&d[l]!==void 0)return;(r&&!n||!r&&d[l]==null)&&(d[l]=typeof u==`number`&&!t.object?[]:{}),d=d[l],c.length>0&&(l=o(c.shift()),u=o(c[0]))}d[l]=_e(e[s],t)}),a}var ve=e((()=>{})),ye,be,xe,E,Se,Ce,we,Te=e((()=>{ye=[`esm.sh`,`skypack`,`esm.run`,`jsdelivr.esm`,`fastly.jsdelivr.esm`,`gcore.jsdelivr.esm`,`testingcf.jsdelivr.esm`,`jsdelivr.b-cdn.esm`,`jspm`],be=[`jsdelivr`,`fastly.jsdelivr`,`unpkg`,`gcore.jsdelivr`,`testingcf.jsdelivr`,`jsdelivr.b-cdn`,`npmcdn`],xe=[`jsdelivr.gh`,`fastly.jsdelivr.gh`,`statically`,`gcore.jsdelivr.gh`,`testingcf.jsdelivr.gh`,`jsdelivr.b-cdn.gh`],E={getModuleUrl:(e,{isModule:t=!0,defaultCDN:n=`esm.sh`,external:r}={})=>{e=e.replace(/#nobundle/g,``);let i=e=>!r||!e.includes(`https://esm.sh`)?e:e.includes(`?`)?`${e}&external=${r}`:`${e}?external=${r}`,a=Ce(e,t,n);return a?i(a):t?i(`https://esm.sh/`+e):`https://cdn.jsdelivr.net/npm/`+e},getUrl:(e,t)=>e.startsWith(`http`)||e.startsWith(`data:`)?e:Ce(e,!1,t||Se())||e,cdnLists:{npm:be,module:ye,gh:xe},checkCDNs:async(e,t)=>{let n=[t,...E.cdnLists.npm].filter(Boolean);for(let t of n)try{if((await fetch(E.getUrl(e,t),{method:`HEAD`})).ok)return t}catch{}return E.cdnLists.npm[0]}},Se=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get(`appCDN`)||E.cdnLists.npm[0]}catch{return E.cdnLists.npm[0]}},Ce=(e,t,n)=>{let r=t&&e.startsWith(`unpkg:`)?`?module`:``;e.startsWith(`gh:`)?e=e.replace(`gh`,xe[0]):e.includes(`:`)||(e=(n||(t?ye[0]:be[0]))+`:`+e);for(let t of we){let[n,i]=t;if(n.test(e))return e.replace(n,i)+r}return null},we=[[/^(esm\.sh:)(.+)/i,`https://esm.sh/$2`],[/^(npm:)(.+)/i,`https://esm.sh/$2`],[/^(node:)(.+)/i,`https://esm.sh/$2`],[/^(jsr:)(.+)/i,`https://esm.sh/jsr/$2`],[/^(pr:)(.+)/i,`https://esm.sh/pr/$2`],[/^(pkg\.pr\.new:)(.+)/i,`https://esm.sh/pkg.pr.new/$2`],[/^(skypack:)(.+)/i,`https://cdn.skypack.dev/$2`],[/^(jsdelivr:)(.+)/i,`https://cdn.jsdelivr.net/npm/$2`],[/^(fastly\.jsdelivr:)(.+)/i,`https://fastly.jsdelivr.net/npm/$2`],[/^(gcore\.jsdelivr:)(.+)/i,`https://gcore.jsdelivr.net/npm/$2`],[/^(testingcf\.jsdelivr:)(.+)/i,`https://testingcf.jsdelivr.net/npm/$2`],[/^(jsdelivr\.b-cdn:)(.+)/i,`https://jsdelivr.b-cdn.net/npm/$2`],[/^(jsdelivr\.gh:)(.+)/i,`https://cdn.jsdelivr.net/gh/$2`],[/^(fastly\.jsdelivr\.gh:)(.+)/i,`https://fastly.jsdelivr.net/gh/$2`],[/^(gcore\.jsdelivr\.gh:)(.+)/i,`https://gcore.jsdelivr.net/gh/$2`],[/^(testingcf\.jsdelivr\.gh:)(.+)/i,`https://testingcf.jsdelivr.net/gh/$2`],[/^(jsdelivr\.b-cdn\.gh:)(.+)/i,`https://jsdelivr.b-cdn.net/gh/$2`],[/^(statically:)(.+)/i,`https://cdn.statically.io/gh/$2`],[/^(esm\.run:)(.+)/i,`https://esm.run/$2`],[/^(jsdelivr\.esm:)(.+)/i,`https://cdn.jsdelivr.net/npm/$2/+esm`],[/^(fastly\.jsdelivr\.esm:)(.+)/i,`https://fastly.jsdelivr.net/npm/$2/+esm`],[/^(gcore\.jsdelivr\.esm:)(.+)/i,`https://gcore.jsdelivr.net/npm/$2/+esm`],[/^(testingcf\.jsdelivr\.esm:)(.+)/i,`https://testingcf.jsdelivr.net/npm/$2/+esm`],[/^(jsdelivr\.b-cdn\.esm:)(.+)/i,`https://jsdelivr.b-cdn.net/npm/$2/+esm`],[/^(jspm:)(.+)/i,`https://jspm.dev/$2`],[/^(esbuild:)(.+)/i,`https://esbuild.vercel.app/$2`],[/^(bundle\.run:)(.+)/i,`https://bundle.run/$2`],[/^(unpkg:)(.+)/i,`https://unpkg.com/$2`],[/^(npmcdn:)(.+)/i,`https://npmcdn.com/$2`],[/^(bundlejs:)(.+)/i,`https://deno.bundlejs.com/?file&q=$2`],[/^(bundle:)(.+)/i,`https://deno.bundlejs.com/?file&q=$2`],[/^(deno:)(.+)/i,`https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts`],[/^(https:\/\/deno\.land\/.+)/i,`https://deno.bundlejs.com/?file&q=$1`],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,`https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4`],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,`https://gist.githack.com/$2`],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,`https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3`],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,`https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3`],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,`https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4`],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,`https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3`],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,`https://bb.githack.com/!api/2.0/snippets/$2/files/$3`],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,`https://bb.githack.com/!api/2.0/snippets/$2/files/$3`],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,`https://gist.githack.com/$2`],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,`https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3`]]})),D,Ee,O,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,k,Ie,A,Le,Re,ze,Be,Ve,j,He,Ue,We,Ge,M,Ke,qe,N,Je,Ye,P,Xe,Ze,F,Qe,$e,et,tt,nt,rt,it,I,at,ot,L,R,st,ct,lt,ut,dt,ft,pt,mt,ht,gt,z=e((()=>{Te(),{getUrl:D,getModuleUrl:Ee}=E,O=D(`@live-codes/browser-compilers@0.22.10/dist/`),De=D(`art-template@4.13.2/lib/template-web.js`),Oe=D(`@asciidoctor/core@2.2.8/dist/browser/asciidoctor.js`),ke=D(`@assemblyscript/loader@0.27.29/umd/index.js`),Ae=D(`@hatemhosny/astro-internal@0.0.4/`),je=D(`@babel/standalone@7.26.4/babel.js`),Me=D(`@bbob/html@4.3.1/dist/index.min.js`),Ne=D(`@bbob/preset-html5@4.3.1/dist/index.min.js`),Pe=D(`biwascheme@0.8.0/release/biwascheme.js`),Fe=D(`brython@3.12.4/`),k=D(`cherry-cljs@0.2.19/`),Ie=D(`@live-codes/clio-browser-compiler@0.0.3/public/build/`),A=D(`@live-codes/codemirror@0.3.4/build/`),Le=D(`coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js`),Re=D(`dot@1.1.3/doT.js`),ze=D(`ejs@4.0.1/ejs.js`),Be=D(`eta@3.4.0/dist/eta.umd.js`),Ve=D(`gh:live-codes/gleam-precompiled@v0.5.0/`),j=D(`@live-codes/go2js@0.5.0/build/`),He=D(`handlebars@4.7.8/dist/`),Ue=D(`imba@2.0.0-alpha.229/dist/`),We=D(`gh:jscl-project/jscl-project.github.io@058adc599f0d012718ef3ad28e704a92c4dd741e/jscl.js`),Ge=D(`liquidjs@10.14.0/dist/liquid.browser.min.js`),M=D(`fengari-web@0.1.4/dist/fengari-web.js`),Ke=D(`malinajs@0.7.19/`),qe=D(`mjml-browser@4.15.3/lib/index.js`),N=D(`@live-codes/monaco-languages@0.2.0/dist/`),Je=D(`mustache@4.2.0/mustache.js`),Ye=D(`nunjucks@3.2.4/browser/`),P=D(`https://cdn.opalrb.com/opal/1.8.2/`),Xe=D(`parinfer@3.13.1/parinfer.js`),Ze=D(`@live-codes/postcss-import-url@0.1.2/dist/postcss-import-url.js`),F=D(`prettier@3.3.2/`),Qe=D(`@live-codes/prettier-plugin-minizinc@0.2.0/dist/standalone.js`),$e=D(`@prettier/plugin-php@0.22.2/standalone.js`),et=D(`requirejs@2.3.6/require.js`),tt=D(`riot@9.2.2/`),nt=D(`@ruby/wasm-wasi@2.7.2/dist/browser.umd.js`),rt=D(`sql-formatter@12.2.1/dist/sql-formatter.min.js`),it=D(`sql.js@1.10.3/dist/`),I=D(`squint-cljs@0.4.81/`),at=D(`@stencil/core@3.2.2/compiler/stencil.js`),ot=D(`stylis@4.3.6/dist/umd/stylis.js`),L=D(`svelte@5.39.12/`),R=D(`tau-prolog@0.3.4/modules/`),st=D(`twig@1.17.1/twig.min.js`),ct=`5.9.3`,lt=D(`typescript@${ct}/lib/typescript.js`),ut=D(`uniter@2.18.0/dist/uniter.js`),dt=D(`vue@2`),ft=D(`vue@3/dist/vue.runtime.esm-browser.prod.js`),pt=D(`livecodes@${{}.SDK_VERSION}/vue.js`),mt=D(`vue3-sfc-loader@0.9.5/dist/`),ht=D(`wabt@1.0.35/index.js`),gt=D(`wasmoon@1.16.0/dist/index.js`)})),B,V=e((()=>{z(),F+``,B={babel:F+`plugins/babel.js`,estree:F+`plugins/estree.js`,glimmer:F+`plugins/glimmer.js`,html:F+`plugins/html.js`,markdown:F+`plugins/markdown.js`,postcss:F+`plugins/postcss.js`,php:$e,minizinc:Qe,pug:O+`prettier/parser-pug.js`,java:O+`prettier/parser-java.js`}})),_t,vt=e((()=>{z(),V(),_t={name:`art-template`,title:`art`,longTitle:`art-template`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:De,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-art-template-compiler.js}}`),self.createArtTemplateCompiler())},extensions:[`art`,`art-template`],editor:`markup`,editorLanguage:`html`}})),yt=e((()=>{vt()})),bt,H,U=e((()=>{bt=(e,t=!0)=>e.replace(/\\/g,t?`\\\\`:`\\`).replace(/`/g,"\\`").replace(/<\/script>/g,`<\\/script>`),H=(e,t)=>({...t.customSettings[e]}),{}.VERSION,{}.SDK_VERSION,{}.GIT_COMMIT,{}.REPO_URL,{}.DOCS_BASE_URL})),W=e((()=>{U(),z()})),xt,St=e((()=>{z(),W(),xt={name:`asciidoc`,title:`AsciiDoc`,compiler:{url:Oe,factory:()=>{let e=window.Asciidoctor();return async(t,{config:n})=>e.convert(t,{standalone:!0,attributes:{nofooter:!0},...H(`asciidoc`,n)})}},extensions:[`adoc`,`asciidoc`,`asc`],editor:`markup`}})),Ct=e((()=>{St()})),wt,Tt,Et=e((()=>{z(),V(),wt=O+`assemblyscript/assemblyscript.js`,Tt={name:`assemblyscript`,title:`AS`,longTitle:`AssemblyScript`,formatter:{prettier:{name:`babel-ts`,pluginUrls:[B.babel]}},compiler:{url:wt,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-assemblyscript-compiler.js}}`),self.createAssemblyscriptCompiler()),scripts:({baseUrl:e})=>[ke,e+`{{hash:lang-assemblyscript-script.js}}`],scriptType:`application/wasm-uint8`,compiledCodeLanguage:`wat`,types:{assemblyscript:{url:O+`types/assemblyscript.d.ts`,declareAsModule:!1,autoload:!0}}},extensions:[`as`,`ts`],editor:`script`,editorLanguage:`typescript`}})),Dt=e((()=>{Et()})),Ot,kt,At=e((()=>{z(),V(),Ot=Ae+`compiler.min.js`,kt={name:`astro`,title:`Astro`,formatter:{prettier:{name:`html`,pluginUrls:[B.html,B.babel]}},compiler:{url:Ot,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-astro-compiler.js}}`),self.createAstroCompiler())},extensions:[`astro`],editor:`markup`}})),jt=e((()=>{At()})),Mt=e((()=>{})),G=e((()=>{Mt(),U()})),Nt,Pt=e((()=>{G(),z(),V(),Nt={name:`babel`,title:`Babel`,formatter:{prettier:{name:`babel`,pluginUrls:[B.babel,B.html]}},compiler:{url:je,factory:()=>async(e,{config:t})=>{let n=H(`babel`,t),r=H(`@babel/preset-env`,t),i=H(`@babel/preset-typescript`,t),a=H(`@babel/preset-react`,t);return window.Babel.transform(e,{filename:`script.tsx`,presets:[[`env`,{modules:!1,...r}],[`typescript`,i],[`react`,a]],...n}).code}},extensions:[`es`,`babel`],editor:`script`,editorLanguage:`typescript`,editorSupport:{compilerOptions:{jsx:4}}}})),Ft=e((()=>{Pt()})),It,Lt=e((()=>{z(),It={name:`bbcode`,title:`BBCode`,compiler:{url:Me,factory:()=>(self.importScripts(Ne),async e=>self.BbobHtml.default(e,self.BbobPresetHTML5.default()))},extensions:[`bbcode`,`bb`],editor:`markup`}})),Rt=e((()=>{Lt()})),zt,Bt=e((()=>{zt={name:`blockly`,title:`Blockly`,compiler:{factory:()=>async(e,{options:t})=>t?.blockly?.js||``},extensions:[`blockly.xml`,`xml`],editor:`script`,editorLanguage:`xml`}})),Vt=e((()=>{Bt()})),Ht,Ut,Wt=e((()=>{z(),Ht=O+`civet/civet.js`,Ut={name:`civet`,title:`Civet`,compiler:{url:Ht,factory:()=>async e=>window.civet.compile(e,{js:!0})},extensions:[`civet`],editor:`script`,editorLanguage:`coffeescript`}})),Gt=e((()=>{Wt()})),Kt,qt=e((()=>{z(),Kt={name:`clio`,title:`Clio`,compiler:{url:Ie+`compile.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-clio-compiler.js}}`),self.createClioCompiler()),scripts:[Ie+`exec.js`]},extensions:[`clio`],editor:`script`,editorLanguage:`coffeescript`}})),Jt=e((()=>{qt()})),Yt,Xt=e((()=>{Yt=e=>typeof e==`string`?{code:e,info:{}}:e})),Zt,Qt=e((()=>{Xt(),Zt=async(e,t,n,r={},i=self)=>new Promise(a=>{if(!e||!t||!n)return a(Yt(``));let o=async function(n){let r=n.data.payload;n.data.trigger===`compileInCompiler`&&r?.content===e&&r?.language===t&&(i.removeEventListener(`message`,o),a(Yt(r.compiled)))};i.addEventListener(`message`,o),i.postMessage({type:`compileInCompiler`,payload:{content:e,language:t,config:n,options:r}})})})),$t=e((()=>{U()})),en=e((()=>{W(),U(),$t()})),tn=e((()=>{z()})),nn,rn,an,on,sn,cn,ln,un=e((()=>{G(),z(),nn={name:`autoprefixer`,title:`Autoprefixer`,isPostcssPlugin:!0,compiler:{url:O+`autoprefixer/autoprefixer.js`,factory:e=>self.autoprefixer.autoprefixer({...H(`autoprefixer`,e)})},editor:`style`},rn={name:`cssnano`,title:`cssnano`,isPostcssPlugin:!0,compiler:{url:O+`cssnano/cssnano.js`,factory:()=>{let e=self.cssnano.cssnanoPresetDefault().plugins,t=[];for(let n of e){let[e,r]=n;(r===void 0||typeof r==`object`&&!r.exclude||typeof r==`boolean`&&r===!0)&&t.push(e(r))}return t}},editor:`style`},an={name:`postcssImportUrl`,title:`Import Url`,isPostcssPlugin:!0,compiler:{url:Ze,factory:e=>self.postcssImportUrl({...H(`postcssImportUrl`,e)})},editor:`style`},on={name:`postcssPresetEnv`,title:`Preset Env`,isPostcssPlugin:!0,compiler:{url:O+`postcss-preset-env/postcss-preset-env.js`,factory:e=>self.postcssPresetEnv.postcssPresetEnv({autoprefixer:!1,...H(`postcssPresetEnv`,e)})},editor:`style`},sn={name:`purgecss`,title:`PurgeCSS`,isPostcssPlugin:!0,needsHTML:!0,compiler:{url:O+`purgecss/purgecss.js`,factory:(e,t,n)=>self.purgecss.purgecss({...H(`purgecss`,e),content:[{raw:`<template>${n.html}\n<script>${e.script.content}<\/script></template>`,extension:`html`}]})},editor:`style`},cn={name:`tokencss`,title:`Token CSS`,isPostcssPlugin:!0,compiler:{url:O+`tokencss/tokencss.js`,factory:e=>{let t=H(`tokencss`,e);Object.keys(t).length===0&&(t.$schema=`https://tokencss.com/schema@0.0.1`,t.extends=`@tokencss/core/preset`);let n=t.extends?.includes(`@tokencss/core/preset`)?((e,t)=>{let n=JSON.parse(JSON.stringify(e));return Object.keys(t).forEach(e=>{n[e]=typeof t[e]!=`object`||Array.isArray(t[e])?t[e]:{...n[e],...t[e]}}),n})(self.tokencss.preset,t):t;return self.tokencss.tokencss({config:n})}},editor:`style`},ln={name:`cssmodules`,title:`CSS Modules`,isPostcssPlugin:!0,needsHTML:!0,compiler:{url:O+`postcss-modules/postcss-modules.js`,factory:(e,t,n)=>{let r=H(`cssmodules`,e);return self.postcssModules.postcssModules({localsConvention:`camelCase`,...r,getJSON(e,t,i){let a=r.addClassesToHTML!==!1,o=r.removeOriginalClasses===!0;a&&(n.html=self.postcssModules.addClassesToHtml(n.html,t,o)),n.compileInfo={...n.compileInfo,cssModules:t,...a?{modifiedHTML:n.html}:{}}}})}},editor:`style`}})),dn,fn=e((()=>{z(),dn={name:`postcss`,title:`Processors:`,isPostcssPlugin:!1,compiler:{url:O+`postcss/postcss.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:processor-postcss-compiler.js}}`),self.createPostcssCompiler())},editor:`style`,hidden:!0}})),pn=e((()=>{un(),fn()})),mn,hn=e((()=>{z(),mn={name:`lightningcss`,title:`Lightning CSS`,isPostcssPlugin:!1,compiler:{url:O+`lightningcss/lightningcss.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:processor-lightningcss-compiler.js}}`),self.createLightningcssCompiler())},editor:`style`}})),gn=e((()=>{hn()})),_n,vn=e((()=>{z(),_n={name:`tailwindcss`,title:`Tailwind CSS`,isPostcssPlugin:!1,needsHTML:!0,compiler:{url:O+`tailwindcss/tailwindcss.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:processor-tailwindcss-compiler.js}}`),self.createTailwindcssCompiler())},editor:`style`}})),yn=e((()=>{vn()})),bn,xn=e((()=>{z(),bn={name:`unocss`,title:`UnoCSS`,isPostcssPlugin:!1,needsHTML:!0,compiler:{url:O+`unocss/unocss.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:processor-unocss-compiler.js}}`),self.createUnocssCompiler())},editor:`style`}})),Sn=e((()=>{xn()})),Cn,wn=e((()=>{z(),Cn={name:`windicss`,title:`Windi CSS`,isPostcssPlugin:!1,needsHTML:!0,compiler:{url:O+`windicss/windicss.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:processor-windicss-compiler.js}}`),self.createWindicssCompiler())},editor:`style`}})),Tn=e((()=>{wn()})),En,Dn=e((()=>{gn(),pn(),yn(),Sn(),Tn(),En=[...[_n,Cn,bn,cn,sn,an,nn,on,mn,rn,ln],dn]})),On=e((()=>{tn(),Ls(),pn(),V(),Dn(),W()})),kn=e((()=>{On(),G()})),An,jn=e((()=>{An=(e=location.origin)=>!!(e&&(e.endsWith(`livecodes.io`)||e.endsWith(`livecodes.pages.dev`)||e.endsWith(`localpen.pages.dev`)||e.includes(`127.0.0.1`)||e.includes(`localhost:`)||e.endsWith(`localhost`)||e.endsWith(`.test`)))})),Mn=t(((e,t)=>{var n=(function(){var e=String.fromCharCode,t=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$`,r={};function i(e,t){if(!r[e]){r[e]={};for(var n=0;n<e.length;n++)r[e][e.charAt(n)]=n}return r[e][t]}var a={compressToBase64:function(e){if(e==null)return``;var n=a._compress(e,6,function(e){return t.charAt(e)});switch(n.length%4){default:case 0:return n;case 1:return n+`===`;case 2:return n+`==`;case 3:return n+`=`}},decompressFromBase64:function(e){return e==null?``:e==``?null:a._decompress(e.length,32,function(n){return i(t,e.charAt(n))})},compressToUTF16:function(t){return t==null?``:a._compress(t,15,function(t){return e(t+32)})+` `},decompressFromUTF16:function(e){return e==null?``:e==``?null:a._decompress(e.length,16384,function(t){return e.charCodeAt(t)-32})},compressToUint8Array:function(e){for(var t=a.compress(e),n=new Uint8Array(t.length*2),r=0,i=t.length;r<i;r++){var o=t.charCodeAt(r);n[r*2]=o>>>8,n[r*2+1]=o%256}return n},decompressFromUint8Array:function(t){if(t==null)return a.decompress(t);for(var n=Array(t.length/2),r=0,i=n.length;r<i;r++)n[r]=t[r*2]*256+t[r*2+1];var o=[];return n.forEach(function(t){o.push(e(t))}),a.decompress(o.join(``))},compressToEncodedURIComponent:function(e){return e==null?``:a._compress(e,6,function(e){return n.charAt(e)})},decompressFromEncodedURIComponent:function(e){return e==null?``:e==``?null:(e=e.replace(/ /g,`+`),a._decompress(e.length,32,function(t){return i(n,e.charAt(t))}))},compress:function(t){return a._compress(t,16,function(t){return e(t)})},_compress:function(e,t,n){if(e==null)return``;var r,i,a={},o={},s=``,c=``,l=``,u=2,d=3,f=2,p=[],m=0,h=0,g;for(g=0;g<e.length;g+=1)if(s=e.charAt(g),Object.prototype.hasOwnProperty.call(a,s)||(a[s]=d++,o[s]=!0),c=l+s,Object.prototype.hasOwnProperty.call(a,c))l=c;else{if(Object.prototype.hasOwnProperty.call(o,l)){if(l.charCodeAt(0)<256){for(r=0;r<f;r++)m<<=1,h==t-1?(h=0,p.push(n(m)),m=0):h++;for(i=l.charCodeAt(0),r=0;r<8;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}else{for(i=1,r=0;r<f;r++)m=m<<1|i,h==t-1?(h=0,p.push(n(m)),m=0):h++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}u--,u==0&&(u=2**f,f++),delete o[l]}else for(i=a[l],r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;u--,u==0&&(u=2**f,f++),a[c]=d++,l=String(s)}if(l!==``){if(Object.prototype.hasOwnProperty.call(o,l)){if(l.charCodeAt(0)<256){for(r=0;r<f;r++)m<<=1,h==t-1?(h=0,p.push(n(m)),m=0):h++;for(i=l.charCodeAt(0),r=0;r<8;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}else{for(i=1,r=0;r<f;r++)m=m<<1|i,h==t-1?(h=0,p.push(n(m)),m=0):h++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}u--,u==0&&(u=2**f,f++),delete o[l]}else for(i=a[l],r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;u--,u==0&&(u=2**f,f++)}for(i=2,r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;for(;;)if(m<<=1,h==t-1){p.push(n(m));break}else h++;return p.join(``)},decompress:function(e){return e==null?``:e==``?null:a._decompress(e.length,32768,function(t){return e.charCodeAt(t)})},_decompress:function(t,n,r){var i=[],a=4,o=4,s=3,c=``,l=[],u,d,f,p,m,h,g,_={val:r(0),position:n,index:1};for(u=0;u<3;u+=1)i[u]=u;for(f=0,m=2**2,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;switch(f){case 0:for(f=0,m=2**8,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;g=e(f);break;case 1:for(f=0,m=2**16,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;g=e(f);break;case 2:return``}for(i[3]=g,d=g,l.push(g);;){if(_.index>t)return``;for(f=0,m=2**s,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;switch(g=f){case 0:for(f=0,m=2**8,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;i[o++]=e(f),g=o-1,a--;break;case 1:for(f=0,m=2**16,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=(p>0?1:0)*h,h<<=1;i[o++]=e(f),g=o-1,a--;break;case 2:return l.join(``)}if(a==0&&(a=2**s,s++),i[g])c=i[g];else if(g===o)c=d+d.charAt(0);else return null;l.push(c),i[o++]=d+c.charAt(0),a--,d=c,a==0&&(a=2**s,s++)}}};return a})();typeof define==`function`&&define.amd?define(function(){return n}):t!==void 0&&t!=null&&(t.exports=n)})),Nn=e((()=>{Mn()})),Pn=e((()=>{})),Fn=e((()=>{})),In=e((()=>{})),Ln=e((()=>{Pn(),Fn(),In()})),Rn=e((()=>{})),zn=e((()=>{Ln(),U(),z()})),Bn=e((()=>{Nn(),zn()})),Vn=e((()=>{zn()})),Hn=e((()=>{Ln()})),Un=e((()=>{U(),Vn(),Hn(),zn()})),Wn=e((()=>{Bn(),Rn(),Vn(),Hn(),zn(),Un()})),Gn=e((()=>{Wn(),G()})),Kn=e((()=>{})),qn=e((()=>{G()})),Jn=e((()=>{`${{}.SANDBOX_HOST_NAME}${{}.SANDBOX_PORT}`,location.hostname===`localhost`||location.hostname===`127.0.0.1`||{}.SELF_HOSTED===`true`||{}.CI})),Yn=e((()=>{jn(),{}.SELF_HOSTED===`true`?{}.SELF_HOSTED_SHARE:An()})),Xn=e((()=>{$t()})),Zn=e((()=>{jn(),Gn(),Kn(),qn(),Te(),Jn(),Yn(),Xn()})),Qn=e((()=>{On(),Zn(),G(),kn(),$t()})),$n=e((()=>{Qn()})),er=e((()=>{en(),Qt(),kn(),$n(),$t(),Xt()})),K,q,J=e((()=>{n(),K=async e=>{let{LanguageSupport:t,StreamLanguage:n}=await r(async()=>{let{LanguageSupport:e,StreamLanguage:t}=await import(q.language);return{LanguageSupport:e,StreamLanguage:t}},[],import.meta.url);return new t(n.define(e))},q={html:`@codemirror/lang-html`,css:`@codemirror/lang-css`,javascript:`@codemirror/lang-javascript`,json:`@codemirror/lang-json`,language:`@codemirror/language`}})),Y,tr,nr=e((()=>{z(),Y=()=>{let e=Xe;return self.importScripts(e),async e=>({formatted:window.parinfer.parenMode(e).text,cursorOffset:0})},tr={name:`commonlisp`,title:`Lisp`,longTitle:`Common Lisp`,formatter:{factory:Y},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[We,e+`{{hash:lang-commonlisp-script.js}}`],scriptType:`text/commonlisp`,compiledCodeLanguage:`commonlisp`},extensions:[`lisp`,`common-lisp`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`commonlisp.js`},codemirror:{language:`scheme`},codejar:{language:`scheme`}}}})),rr=e((()=>{nr()})),ir,ar=e((()=>{er(),J(),z(),rr(),n(),ir={name:`clojurescript`,title:`CLJS (cherry)`,longTitle:`ClojureScript (cherry)`,formatter:{factory:Y},compiler:{url:k+`lib/cherry.umd.js`,factory:()=>async(e,{config:t,options:n})=>{let r=self.CherryCljs.compileString(e);return e.includes(`#jsx`)?(await Zt(r,`jsx`,t,n)).code:r},imports:{"cherry-cljs":k+`index.js`,"cherry-cljs/cljs.core.js":k+`cljs.core.js`,"cherry-cljs/lib/clojure.string.js":`lib/clojure.string.js`,"cherry-cljs/lib/clojure.set.js":`lib/clojure.set.js`,"cherry-cljs/lib/clojure.walk.js":`lib/clojure.walk.js`,"squint-cljs":I+`index.js`,"squint-cljs/core.js":I+`core.js`,"squint-cljs/string.js":I+`string.js`,"squint-cljs/src/squint/string.js":I+`src/squint/string.js`,"squint-cljs/src/squint/set.js":I+`src/squint/set.js`}},extensions:[`cljs`,`clj`,`cljc`,`edn`,`clojure`],editor:`script`,editorLanguage:`clojure`,editorSupport:{codemirror:{languageSupport:async()=>K((await r(async()=>{let{clojure:e}=await import(A+`codemirror-lang-clojure.js`);return{clojure:e}},[],import.meta.url)).clojure)}}}})),or=e((()=>{ar()})),sr,cr=e((()=>{J(),G(),z(),n(),sr={name:`coffeescript`,title:`Coffee`,longTitle:`CoffeeScript`,compiler:{url:Le,factory:()=>async(e,{config:t})=>window.CoffeeScript.compile(e,{bare:!0,...H(`coffeescript`,t)})},extensions:[`coffee`],editor:`script`,editorSupport:{codemirror:{languageSupport:async()=>K((await r(async()=>{let{coffeescript:e}=await import(A+`codemirror-lang-coffeescript.js`);return{coffeescript:e}},[],import.meta.url)).coffeescript)}}}})),lr=e((()=>{cr()})),ur,dr,fr=e((()=>{z(),n(),ur=O+`jscpp/JSCPP.es5.min.js`,dr={name:`cpp`,title:`C++`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[ur,e+`{{hash:lang-cpp-script.js}}`],scriptType:`text/cpp`,compiledCodeLanguage:`cpp`},extensions:[`cpp`,`c`,`C`,`cp`,`cxx`,`c++`,`cppm`,`ixx`,`ii`,`hpp`,`h`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`cpp.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{cpp:e}=await import(A+`codemirror-lang-cpp.js`);return{cpp:e}},[],import.meta.url)).cpp()}}}})),pr=e((()=>{fr()})),mr,hr=e((()=>{mr={name:`cpp-wasm`,title:`C++ (Wasm)`,longTitle:`C/C++ (Wasm)`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+`{{hash:lang-cpp-wasm-script.js}}`],scriptType:`text/cpp`,compiledCodeLanguage:`cpp`,liveReload:!0},extensions:[`wasm.cpp`,`cppwasm`,`cwasm`,`clang.cpp`,`clang`,`cpp`,`c`,`C`,`cp`,`cxx`,`c++`,`cppm`,`ixx`,`ii`,`hpp`,`h`],editor:`script`,editorLanguage:`cpp`,largeDownload:!0}})),gr=e((()=>{hr()})),_r,vr=e((()=>{J(),z(),V(),n(),_r={name:`csharp-wasm`,title:`C# (Wasm)`,formatter:{prettier:{name:`java`,pluginUrls:[B.java]}},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+`{{hash:lang-csharp-wasm-script.js}}`],scriptType:`text/csharp-wasm`,compiledCodeLanguage:`csharp-wasm`,liveReload:!0},extensions:[`cs`,`csharp`,`wasm.cs`,`cs-wasm`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`csharp.js`},codemirror:{languageSupport:async()=>K((await r(async()=>{let{csharp:e}=await import(A+`codemirror-lang-clike.js`);return{csharp:e}},[],import.meta.url)).csharp)},codejar:{language:`csharp`}},largeDownload:!0}})),yr=e((()=>{vr()})),br,xr=e((()=>{J(),V(),n(),br={name:`css`,title:`CSS`,info:!1,formatter:{prettier:{name:`css`,pluginUrls:[B.postcss]}},compiler:{factory:()=>async e=>e},extensions:[`css`],editor:`style`,editorSupport:{codemirror:{languageSupport:async()=>{let{css:e}=await r(async()=>{let{css:e}=await import(q.css);return{css:e}},[],import.meta.url);return e()}}}}})),Sr=e((()=>{xr()})),Cr,wr,Tr=e((()=>{V(),n(),Cr=async(e,{baseUrl:t,config:n})=>{let{diagramsCompiler:i}=await r(async()=>{let{diagramsCompiler:e}=await import(t+`{{hash:lang-diagrams-compiler-esm.js}}`);return{diagramsCompiler:e}},[],import.meta.url);return i(e,{config:n})},wr={name:`diagrams`,title:`Diagrams`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{factory:()=>async e=>e||``,runOutsideWorker:Cr},extensions:[`diagrams`,`diagram`,`graph`,`plt`],editor:`markup`,editorLanguage:`html`}})),Er=e((()=>{Tr()})),Dr,Or=e((()=>{z(),V(),Dr={name:`dot`,title:`doT`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:Re,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-dot-compiler.js}}`),self.createDotCompiler())},extensions:[`dot`],editor:`markup`,editorLanguage:`html`}})),kr=e((()=>{Or()})),Ar,jr=e((()=>{z(),V(),Ar={name:`ejs`,title:`EJS`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:ze,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-ejs-compiler.js}}`),self.createEjsCompiler())},extensions:[`ejs`],editor:`markup`,editorLanguage:`html`}})),Mr=e((()=>{jr()})),Nr,Pr=e((()=>{z(),V(),Nr={name:`eta`,title:`Eta`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:Be,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-eta-compiler.js}}`),self.createEtaCompiler())},extensions:[`eta`],editor:`markup`,editorLanguage:`html`}})),Fr=e((()=>{Pr()})),Ir,Lr=e((()=>{z(),rr(),Ir={name:`fennel`,title:`Fennel`,formatter:{factory:Y},compiler:{url:M,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-fennel-compiler.js}}`),self.createFennelCompiler()),scripts:[M],scriptType:`application/lua`,compiledCodeLanguage:`lua`},extensions:[`fnl`],editor:`script`,editorLanguage:`scheme`}})),Rr=e((()=>{Lr()})),zr,Br=e((()=>{G(),z(),V(),zr={name:`flow`,title:`Flow`,formatter:{prettier:{name:`babel-flow`,pluginUrls:[B.babel,B.html]}},compiler:{url:O+`flow-remove-types/flow-remove-types.js`,factory:()=>async(e,{config:t})=>window.flowRemoveTypes.transpile(e,{all:!0,...H(`flow`,t)}).toString()},extensions:[`flow`],editor:`script`,editorLanguage:`typescript`,editorSupport:{compilerOptions:{jsx:4}}}})),Vr=e((()=>{Br()})),Hr,Ur=e((()=>{J(),z(),n(),Hr={name:`gleam`,title:`Gleam`,compiler:{factory:(e,t)=>(self.importScripts(t+`{{hash:lang-gleam-compiler.js}}`),self.createGleamCompiler()),loadAsExternalModule:!0,inlineModule:`(async() => {
      const main = (await import('./script')).main;
      if (typeof main === "function") main();
    })();
`},extensions:[`gleam`],editor:`script`,editorSupport:{monaco:{language:`swift`},codemirror:{languageSupport:async()=>K((await r(async()=>{let{swift:e}=await import(A+`codemirror-lang-swift.js`);return{swift:e}},[],import.meta.url)).swift)},codejar:{language:`swift`}}}})),Wr=e((()=>{Ur()})),Gr,Kr=e((()=>{z(),n(),Gr={name:`go`,title:`Go`,formatter:{factory:()=>(importScripts(j+`go2js-format.js`),async e=>{if(!e)return{formatted:``,cursorOffset:0};let[t,n]=globalThis.go2jsFormat(e);return n?(console.error(n),{formatted:e,cursorOffset:0}):{formatted:t,cursorOffset:0}})},compiler:{url:j+`go2js-compile.js`,factory:()=>e=>new Promise(t=>{if(!e){t(``);return}let n=j.endsWith(`/`)?j.slice(0,-1):j;globalThis.go2jsCompile(e,n,(e,n)=>{e?(console.error(e),t(``)):t(n)})})},extensions:[`go`,`golang`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`go.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{go:e}=await import(A+`codemirror-lang-go.js`);return{go:e}},[],import.meta.url)).go()}}}})),qr=e((()=>{Kr()})),Jr,Yr=e((()=>{Kr(),Jr={name:`go-wasm`,title:`Go (Wasm)`,formatter:Gr.formatter,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+`{{hash:lang-go-wasm-script.js}}`],liveReload:!0,scriptType:`text/go-wasm`,compiledCodeLanguage:`go`},extensions:[`wasm.go`,`go-wasm`,`gowasm`],editor:`script`,editorLanguage:`go`,largeDownload:!0}})),Xr=e((()=>{Yr()})),Zr,Qr=e((()=>{z(),Zr={name:`haml`,title:`Haml`,compiler:{url:O+`clientside-haml-js/haml.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-haml-compiler.js}}`),self.createHamlCompiler())},extensions:[`haml`],editor:`markup`}})),$r=e((()=>{Qr()})),ei,ti,ni=e((()=>{z(),V(),ei=He+`handlebars.min.js`,He+``,ti={name:`handlebars`,title:`Handlebars`,formatter:{prettier:{name:`glimmer`,pluginUrls:[B.glimmer]}},compiler:{url:ei,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-handlebars-compiler.js}}`),self.createHandlebarsCompiler())},extensions:[`hbs`,`handlebars`],editor:`markup`,editorLanguage:`html`}})),ri=e((()=>{ni()})),ii,ai=e((()=>{J(),V(),n(),ii={name:`html`,title:`HTML`,info:!1,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{factory:()=>async e=>e},extensions:[`html`,`htm`],editor:`markup`,editorSupport:{codemirror:{languageSupport:async()=>{let{html:e}=await r(async()=>{let{html:e}=await import(q.html);return{html:e}},[],import.meta.url);return e()}}}}})),oi=e((()=>{ai()})),si,ci=e((()=>{z(),si={name:`imba`,title:`Imba`,compiler:{url:Ue+`compiler.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-imba-compiler.js}}`),self.createImbaCompiler()),imports:{imba:Ue+`imba.mjs`}},extensions:[`imba`],editor:`script`}})),li=e((()=>{ci()})),ui,di=e((()=>{z(),V(),n(),ui={name:`java`,title:`Java`,formatter:{prettier:{name:`java`,pluginUrls:[B.java]}},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+`{{hash:lang-java-script.js}}`],scriptType:`text/java`,compiledCodeLanguage:`java`,liveReload:!0},extensions:[`java`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`java.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{java:e}=await import(A+`codemirror-lang-java.js`);return{java:e}},[],import.meta.url)).java()}},largeDownload:!0}})),fi=e((()=>{di()})),pi,mi=e((()=>{J(),V(),n(),pi={name:`javascript`,title:`JS`,longTitle:`JavaScript`,formatter:{prettier:{name:`babel`,pluginUrls:[B.babel,B.html]}},compiler:{factory:()=>async e=>e},extensions:[`js`,`mjs`],editor:`script`,editorSupport:{codemirror:{languageSupport:async()=>{let{javascript:e}=await r(async()=>{let{javascript:e}=await import(q.javascript);return{javascript:e}},[],import.meta.url);return e()}}}}})),hi=e((()=>{mi()})),gi,_i,vi=e((()=>{z(),gi=`${O}jinja/jinja.js`,_i={name:`jinja`,title:`Jinja`,formatter:{factory:()=>(self.importScripts(gi),async(e,t,n)=>({formatted:new self.Jinja.Template(e).format({indent:n?.tabSize||2}),cursorOffset:t}))},compiler:{url:gi,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-jinja-compiler.js}}`),self.createJinjaCompiler())},extensions:[`jinja`],editor:`markup`,editorLanguage:`html`}})),yi=e((()=>{vi()})),bi,xi=e((()=>{J(),V(),n(),bi={name:`jsx`,title:`JSX`,formatter:{prettier:{name:`babel`,pluginUrls:[B.babel,B.html]}},compiler:`typescript`,extensions:[`jsx`],editor:`script`,editorLanguage:`javascript`,editorSupport:{codemirror:{languageSupport:async()=>{let{javascript:e}=await r(async()=>{let{javascript:e}=await import(q.javascript);return{javascript:e}},[],import.meta.url);return e({jsx:!0})}},compilerOptions:{jsx:4}}}})),Si,Ci=e((()=>{J(),V(),n(),Si={name:`tsx`,title:`TSX`,formatter:{prettier:{name:`babel-ts`,pluginUrls:[B.babel,B.html]}},compiler:`typescript`,extensions:[`tsx`],editor:`script`,editorLanguage:`typescript`,editorSupport:{codemirror:{languageSupport:async()=>{let{javascript:e}=await r(async()=>{let{javascript:e}=await import(q.javascript);return{javascript:e}},[],import.meta.url);return e({jsx:!0,typescript:!0})}},compilerOptions:{checkJs:!0,strictNullChecks:!0,jsx:4}}}})),wi=e((()=>{xi(),Ci()})),Ti,Ei=e((()=>{J(),z(),n(),Ti={name:`julia`,title:`Julia`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+`{{hash:lang-julia-script.js}}`],liveReload:!0,scriptType:`text/julia`,compiledCodeLanguage:`julia`},extensions:[`jl`],editor:`script`,editorSupport:{codemirror:{languageSupport:async()=>K((await r(async()=>{let{julia:e}=await import(A+`codemirror-lang-julia.js`);return{julia:e}},[],import.meta.url)).julia)}},largeDownload:!0}})),Di=e((()=>{Ei()})),Oi,ki=e((()=>{J(),G(),z(),V(),n(),Oi={name:`less`,title:`Less`,formatter:{prettier:{name:`less`,pluginUrls:[B.postcss]}},compiler:{url:O+`less/less.js`,factory:()=>async(e,{config:t})=>(await window.less.render(e,{...H(`less`,t)})).css},extensions:[`less`],editor:`style`,editorSupport:{codemirror:{languageSupport:async()=>K((await r(async()=>{let{less:e}=await import(A+`codemirror-lang-less.js`);return{less:e}},[],import.meta.url)).less)}}}})),Ai=e((()=>{ki()})),ji,Mi=e((()=>{z(),V(),n(),ji={name:`liquid`,title:`Liquid`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:Ge,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-liquid-compiler.js}}`),self.createLiquidCompiler())},extensions:[`liquid`,`liquidjs`],editor:`markup`,editorLanguage:`html`,editorSupport:{codemirror:{languageSupport:async()=>(await r(async()=>{let{liquid:e}=await import(A+`codemirror-lang-liquid.js`);return{liquid:e}},[],import.meta.url)).liquid()}}}})),Ni=e((()=>{Mi()})),Pi,Fi=e((()=>{J(),G(),z(),n(),Pi={name:`livescript`,title:`LiveScript`,compiler:{url:O+`livescript/livescript-min.js`,factory:()=>async(e,{config:t})=>window.require(`livescript`).compile(e,{bare:!0,...H(`livescript`,t)}),scripts:[O+`livescript/prelude-browser-min.js`]},extensions:[`ls`],editor:`script`,editorSupport:{monaco:{language:`coffeescript`},codemirror:{languageSupport:async()=>K((await r(async()=>{let{livescript:e}=await import(A+`codemirror-lang-livescript.js`);return{livescript:e}},[],import.meta.url)).livescript)}}}})),Ii=e((()=>{Fi()})),Li,Ri,zi,Bi=e((()=>{J(),z(),n(),Li=O+`lua-fmt/lua-fmt.js`,Ri={factory:()=>(self.importScripts(Li),async(e,t)=>({formatted:self.luaFmt.formatText(e),cursorOffset:t}))},zi={name:`lua`,title:`Lua`,formatter:Ri,compiler:{factory:()=>async e=>e,scripts:[M],scriptType:`application/lua`,compiledCodeLanguage:`lua`},extensions:[`lua`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`lua.js`},codemirror:{languageSupport:async()=>K((await r(async()=>{let{lua:e}=await import(A+`codemirror-lang-lua.js`);return{lua:e}},[],import.meta.url)).lua)}}}})),Vi=e((()=>{Bi()})),Hi,Ui=e((()=>{z(),Bi(),Hi={name:`lua-wasm`,title:`Lua (Wasm)`,formatter:Ri,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[gt,e+`{{hash:lang-lua-wasm-script.js}}`],scriptType:`application/lua`,compiledCodeLanguage:`lua`},extensions:[`wasm.lua`,`luawasm`],editor:`script`,editorLanguage:`lua`}})),Wi=e((()=>{Ui()})),Gi,Ki=e((()=>{z(),V(),Gi={name:`malina`,title:`Malina.js`,formatter:{prettier:{name:`html`,pluginUrls:[B.html,B.babel]}},compiler:{factory:(e,t)=>(self.importScripts(t+`{{hash:lang-malina-compiler.js}}`),self.createMalinaCompiler()),imports:{"malinajs/runtime.js":`${Ke}runtime.js`}},extensions:[`xht`],editor:`script`,editorLanguage:`html`}})),qi=e((()=>{Ki()})),Ji,Yi=e((()=>{z(),V(),n(),Ji={name:`markdown`,title:`Markdown`,formatter:{prettier:{name:`markdown`,pluginUrls:[B.markdown,B.html]}},compiler:{factory:(e,t)=>(self.importScripts(t+`{{hash:lang-markdown-compiler.js}}`),self.createMarkdownCompiler()),scripts:({baseUrl:e})=>[e+`{{hash:lang-markdown-script.js}}`]},extensions:[`md`,`markdown`,`mdown`,`mkdn`],editor:`markup`,editorSupport:{codemirror:{languageSupport:async()=>(await r(async()=>{let{markdown:e}=await import(A+`codemirror-lang-markdown.js`);return{markdown:e}},[],import.meta.url)).markdown()}}}})),Xi=e((()=>{Yi()})),Zi,Qi,$i=e((()=>{Qt(),G(),z(),V(),n(),Zi=async(e,{config:t,worker:n})=>new Promise(async i=>{if(!e)return i(``);let[a,{default:o}]=await Promise.all([r(()=>import(O+`mdx/mdx.js`),[],import.meta.url),r(()=>import(O+`remark-gfm/remark-gfm.js`),[],import.meta.url)]),s=(await a.compile(e,{remarkPlugins:[o],...H(`mdx`,t)})).value,c=(await Zt(`import React from "react";
import { createRoot } from "react-dom/client";
${bt((e=>e.replace(/, {[^}]*} = _components/g,``).replace(/const {[^:]*} = props.components[^;]*;/g,``))(s),!1)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`,`jsx`,t,{},n)).code;i(`<div id="__livecodes_mdx_root__"></div><script type="module">${c}<\/script>`)}),Qi={name:`mdx`,title:`MDX`,formatter:{prettier:{name:`markdown`,pluginUrls:[B.markdown,B.html]}},compiler:{factory:()=>async e=>e,runOutsideWorker:Zi,compiledCodeLanguage:`javascript`},extensions:[`mdx`],editor:`markup`,editorLanguage:`markdown`}})),ea=e((()=>{$i()})),ta,na=e((()=>{z(),V(),n(),ta={name:`minizinc`,title:`MiniZinc`,formatter:{prettier:{name:`minizinc`,pluginUrls:[B.minizinc]}},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+`{{hash:lang-minizinc-script.js}}`],scriptType:`text/minizinc`,compiledCodeLanguage:`minizinc`},extensions:[`mzn`,`dzn`,`minizinc`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`minizinc.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{MiniZinc:e}=await import(A+`codemirror-lang-minizinc.js`);return{MiniZinc:e}},[],import.meta.url)).MiniZinc()}}}})),ra=e((()=>{na()})),ia,aa=e((()=>{G(),z(),V(),ia={name:`mjml`,title:`MJML`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:qe,factory:()=>async(e,{config:t})=>{if(!e.trim())return``;let{html:n,errors:r}=self.mjml(e,H(`mjml`,t));return r?.forEach(e=>{console.warn(e.formattedMessage)}),n}},extensions:[`mjml`],editor:`markup`,editorLanguage:`xml`}})),oa=e((()=>{aa()})),sa,ca=e((()=>{z(),V(),sa={name:`mustache`,title:`Mustache`,formatter:{prettier:{name:`glimmer`,pluginUrls:[B.glimmer]}},compiler:{url:Je,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-mustache-compiler.js}}`),self.createMustacheCompiler())},extensions:[`mustache`],editor:`markup`,editorLanguage:`html`}})),la=e((()=>{ca()})),ua,da,fa=e((()=>{z(),V(),ua=Ye+`nunjucks.min.js`,Ye+``,da={name:`nunjucks`,title:`Nunjucks`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:ua,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-nunjucks-compiler.js}}`),self.createNunjucksCompiler())},extensions:[`njk`,`nunjucks`],editor:`markup`,editorLanguage:`html`}})),pa=e((()=>{fa()})),ma,ha=e((()=>{J(),z(),n(),ma={name:`ocaml`,title:`OCaml`,compiler:`rescript`,extensions:[`ml`,`mli`],editor:`script`,editorSupport:{monaco:{language:`csharp`},codemirror:{languageSupport:async()=>K((await r(async()=>{let{oCaml:e}=await import(A+`codemirror-lang-mllike.js`);return{oCaml:e}},[],import.meta.url)).oCaml)}}}})),ga=e((()=>{ha()})),_a,va=e((()=>{J(),z(),n(),_a={name:`perl`,title:`Perl`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[O+`perlito/perlito5.min.js`,e+`{{hash:lang-perl-script.js}}`],scriptType:`text/perl`},extensions:[`pl`,`pm`],editor:`script`,editorSupport:{codemirror:{languageSupport:async()=>K((await r(async()=>{let{perl:e}=await import(A+`codemirror-lang-perl.js`);return{perl:e}},[],import.meta.url)).perl)}}}})),ya=e((()=>{va()})),ba,xa=e((()=>{z(),V(),n(),ba={name:`php`,title:`PHP`,formatter:{prettier:{name:`php`,pluginUrls:[B.php]}},compiler:{factory:()=>async e=>(e=e.trim(),e.startsWith(`<?php`)&&(e=e.replace(`<?php`,`/* <?php */`),e.endsWith(`?>`)&&(e=e.replace(`?>`,`/* ?> */`))),e),scripts:[ut],deferScripts:!0,scriptType:`text/x-uniter-php`,compiledCodeLanguage:`php`},extensions:[`php`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`php.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{php:e}=await import(A+`codemirror-lang-php.js`);return{php:e}},[],import.meta.url)).php()}}}})),Sa=e((()=>{xa()})),Ca,wa=e((()=>{z(),V(),Ca={name:`php-wasm`,title:`PHP (Wasm)`,formatter:{prettier:{name:`php`,pluginUrls:[B.php]}},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[O+`php-wasm/php-wasm.js`,e+`{{hash:lang-php-wasm-script.js}}`],scriptType:`text/php-wasm`,compiledCodeLanguage:`php`},extensions:[`wasm.php`,`phpwasm`],editor:`script`,editorLanguage:`php`}})),Ta=e((()=>{wa()})),Ea,Da,Oa=e((()=>{z(),n(),Ea=async(e,{baseUrl:t,config:n})=>{let{pgSqlCompiler:i}=await r(async()=>{let{pgSqlCompiler:e}=await import(t+`{{hash:lang-postgresql-compiler-esm.js}}`);return{pgSqlCompiler:e}},[],import.meta.url);return i(e,{baseUrl:t,config:n})},Da={name:`postgresql`,title:`PostgreSQL`,formatter:{factory:()=>(importScripts(rt),async e=>({formatted:await self.sqlFormatter.format(e,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{factory:()=>async e=>e,runOutsideWorker:Ea,scripts:({baseUrl:e})=>[e+`{{hash:lang-sql-script.js}}`],scriptType:`application/json`,compiledCodeLanguage:`json`},extensions:[`pg.sql`,`pgsql`,`pgsql.sql`,`pgsql`,`pg`,`pglite`,`pglite.sql`,`postgresql`,`postgres`,`postgre.sql`,`postgresql.sql`],editor:`script`,editorLanguage:`sql`}})),ka=e((()=>{Oa()})),Aa,ja=e((()=>{z(),n(),Aa={name:`prolog`,title:`Prolog`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[R+`core.js`,R+`charsio.js`,R+`dom.js`,R+`format.js`,R+`js.js`,R+`lists.js`,R+`os.js`,R+`promises.js`,R+`random.js`,R+`statistics.js`,e+`{{hash:lang-prolog-script.js}}`],scriptType:`text/prolog`,compiledCodeLanguage:`prolog`},extensions:[`prolog.pl`,`prolog`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`prolog.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{prolog:e}=await import(A+`codemirror-lang-prolog.js`);return{prolog:e}},[],import.meta.url)).prolog()}}}})),Ma=e((()=>{ja()})),Na,Pa=e((()=>{z(),Na={name:`pug`,title:`Pug`,compiler:{url:O+`pug/pug.min.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-pug-compiler.js}}`),self.createPugCompiler())},extensions:[`pug`,`jade`],editor:`markup`}})),Fa=e((()=>{Pa()})),Ia,La,Ra,za=e((()=>{U(),z(),n(),Ia=Fe+`brython.min.js`,La=Fe+`brython_stdlib.js`,Ra={name:`python`,title:`Python`,compiler:{factory:()=>async e=>e,scripts:({compiled:e,config:t})=>{let{autoloadStdlib:n}=H(`python`,t);return[Ia,...n!==!1&&e.match(/^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm)?[La]:[]]},scriptType:`text/python`,compiledCodeLanguage:`python`},extensions:[`py`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`python.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{python:e}=await import(A+`codemirror-lang-python.js`);return{python:e}},[],import.meta.url)).python()}}}})),Ba=e((()=>{za()})),Va,Ha=e((()=>{Va={name:`python-wasm`,title:`Py (Wasm)`,longTitle:`Python (Wasm)`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+`{{hash:lang-python-wasm-script.js}}`],liveReload:!0,scriptType:`text/python`,compiledCodeLanguage:`python`},extensions:[`wasm.py`,`py3`,`pyodide`,`py-wasm`,`pythonwasm`,`pywasm`],editor:`script`,editorLanguage:`python`,largeDownload:!0}})),Ua=e((()=>{Ha()})),Wa,Ga=e((()=>{J(),z(),n(),Wa={name:`r`,title:`R`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+`{{hash:lang-r-script-esm.js}}`],inlineScript:`
    livecodes.r = livecodes.r || {config: {}};
    // reset config before next load
    livecodes.r.config = {};
    livecodes.r.evaluated = new Promise((resolve) => {
      addEventListener('load', async () => {
        await livecodes.r.loaded;
        if (livecodes.r.config?.autoEvaluate !== false) {
          await livecodes.r.run();
          resolve();
        }
      });
    });
    `,liveReload:!0,scriptType:`text/r`,compiledCodeLanguage:`r`},extensions:[`r`,`rlang`,`rstats`,`r-wasm`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`r.js`},codemirror:{languageSupport:async()=>K((await r(async()=>{let{r:e}=await import(A+`codemirror-lang-r.js`);return{r:e}},[],import.meta.url)).r)}},largeDownload:!0}})),Ka=e((()=>{Ga()})),qa,Ja=e((()=>{z(),V(),W(),qa={name:`react`,title:`React`,formatter:{prettier:{name:`babel`,pluginUrls:[B.babel,B.html]}},compiler:{dependencies:[`babel`],url:O+`babel-plugin-react-compiler/babel-plugin-react-compiler.js`,factory:()=>async(e,{config:t,language:n})=>{let r=H(`babel`,t),i=H(`@babel/preset-env`,t),a=H(`@babel/preset-typescript`,t),o=H(`@babel/preset-react`,t),s=H(`babel-plugin-react-compiler`,t);return window.Babel.transform(e,{filename:`script.tsx`,presets:[[`env`,{modules:!1,...i}],...n===`react-tsx`?[`typescript`,a]:[],[`react`,{runtime:`automatic`,...o}]],plugins:[[window.reactCompiler.reactCompiler,s]],...r}).code}},extensions:[`react.jsx`,`react-jsx`],editor:`script`,editorLanguage:`javascript`,editorSupport:{compilerOptions:{jsx:4}}}})),Ya,Xa=e((()=>{V(),Ya={name:`react-tsx`,title:`React (TSX)`,formatter:{prettier:{name:`babel-ts`,pluginUrls:[B.babel,B.html]}},compiler:`react`,extensions:[`react.tsx`],editor:`script`,editorLanguage:`typescript`,editorSupport:{compilerOptions:{checkJs:!0,strictNullChecks:!0,jsx:4}}}})),Za=e((()=>{Ja(),Xa()})),Qa,$a,eo,to=e((()=>{J(),G(),z(),V(),n(),Qa=(e,t)=>{let n={...H(`typescript`,t),...H(t.script.language,t)};return!!(n.jsx||n.jsxFactory||new RegExp(/\/\*\*[\s\*]*((@jsx)|(@jsxImportSource))\s/g).test(e))},$a={target:`es2020`,jsx:`react`,allowUmdGlobalAccess:!0,esModuleInterop:!0},eo={name:`typescript`,title:`TS`,longTitle:`TypeScript`,formatter:{prettier:{name:`babel-ts`,pluginUrls:[B.babel,B.html]}},compiler:{url:lt,factory:()=>async(e,{config:t})=>window.ts.transpile(e,{...$a,...[`jsx`,`tsx`].includes(t.script.language)&&!Qa(e,t)?{jsx:`react-jsx`}:{},...H(`typescript`,t),...H(t.script.language,t)})},extensions:[`ts`,`mts`,`typescript`],editor:`script`,editorSupport:{codemirror:{languageSupport:async()=>{let{javascript:e}=await r(async()=>{let{javascript:e}=await import(q.javascript);return{javascript:e}},[],import.meta.url);return e({typescript:!0})}},compilerOptions:{checkJs:!0,strictNullChecks:!0}}}})),no=e((()=>{to()})),ro,io,ao=e((()=>{z(),V(),no(),W(),ro=O+`react-native-web/react-native-web.js`,io={name:`react-native`,title:`RN`,longTitle:`React Native`,formatter:{prettier:{name:`babel`,pluginUrls:[B.babel,B.html]}},compiler:{dependencies:[`typescript`],factory:()=>async(e,{config:t,language:n})=>window.ts.transpile(e,{...$a,jsx:`react-jsx`,...H(`typescript`,t),...H(n,t)}),imports:{react:ro,"react-native":ro}},extensions:[`react-native.jsx`],editor:`script`,editorLanguage:`javascript`,editorSupport:{compilerOptions:{jsx:4}}}})),oo,so=e((()=>{V(),oo={name:`react-native-tsx`,title:`RN (TSX)`,longTitle:`React Native (TSX)`,formatter:{prettier:{name:`babel-ts`,pluginUrls:[B.babel,B.html]}},compiler:`react-native`,extensions:[`react-native.tsx`],editor:`script`,editorLanguage:`typescript`,editorSupport:{compilerOptions:{checkJs:!0,strictNullChecks:!0,jsx:4}}}})),co=e((()=>{ao(),so()})),lo,uo,fo,po=e((()=>{n(),lo=async(e,{baseUrl:t,language:n})=>{let{rescriptCompiler:i}=await r(async()=>{let{rescriptCompiler:e}=await import(t+`{{hash:lang-rescript-compiler-esm.js}}`);return{rescriptCompiler:e}},[],import.meta.url);return i(e,{baseUrl:t,language:n})},uo=(e,t)=>(importScripts(e+`{{hash:lang-rescript-formatter.js}}`),self.createRescriptFormatter(e,t)),fo={name:`rescript`,title:`ReScript`,formatter:{factory:uo},compiler:{factory:()=>async e=>e,runOutsideWorker:lo,scriptType:`module`},extensions:[`res`,`resi`],editor:`script`,editorLanguage:`javascript`,editorSupport:{monaco:{language:`csharp`}}}})),mo=e((()=>{po()})),ho,go=e((()=>{mo(),ho={name:`reason`,title:`Reason`,formatter:{factory:uo},compiler:`rescript`,extensions:[`re`,`rei`],editor:`script`,editorLanguage:`javascript`,editorSupport:{monaco:{language:`csharp`}}}})),_o=e((()=>{go()})),vo,yo=e((()=>{vo={name:`richtext`,title:`Rich Text`,longTitle:`Rich Text Editor`,compiler:{factory:()=>async(e,{config:t})=>t.markup.content||``,styles:[`{{hash:quill.css}}`]},extensions:[`rte`,`rte.html`,`rich`],editor:`markup`,editorLanguage:`html`}})),bo=e((()=>{yo()})),xo,So,Co,wo=e((()=>{z(),V(),xo=tt+`riot+compiler.min.js`,So=tt+`riot.min.js`,Co={name:`riot`,title:`Riot.js`,formatter:{prettier:{name:`html`,pluginUrls:[B.html,B.babel]}},compiler:{url:xo,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-riot-compiler.js}}`),self.createRiotCompiler()),scripts:[So],scriptType:`module`},extensions:[`riot`,`riotjs`],editor:`script`,editorLanguage:`html`}})),To=e((()=>{wo()})),Eo,Do,Oo=e((()=>{J(),G(),z(),n(),Eo=(e,t={})=>Array.from(new Set([...e.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map(e=>e[1]).map(e=>e.split(`/`)[0]).filter(e=>t.hasOwnProperty(e)||e!==`opal`).map(e=>t[e]||`${P+e}.min.js`))),Do={name:`ruby`,title:`Ruby`,compiler:{url:P+`opal.min.js`,factory:()=>(importScripts(P+`opal-parser.min.js`),self.Opal.config.unsupported_features_severity=`ignore`,self.Opal.load(`opal-parser`),async(e,{config:t})=>{let{autoloadStdlib:n,requireMap:r,...i}=H(`ruby`,t),a=e.includes(`$0`)?`$0 = __FILE__
`:``;return self.Opal.compile(a+e,i)}),scripts:({compiled:e,config:t})=>{let{autoloadStdlib:n,requireMap:r}=H(`ruby`,t),i=Eo(e,r),a=n===!1?[]:i;return[P+`opal.min.js`,...a]}},extensions:[`rb`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`ruby.js`},codemirror:{languageSupport:async()=>K((await r(async()=>{let{ruby:e}=await import(A+`codemirror-lang-ruby.js`);return{ruby:e}},[],import.meta.url)).ruby)}}}})),ko=e((()=>{Oo()})),Ao,jo=e((()=>{z(),Ao={name:`ruby-wasm`,title:`Ruby (Wasm)`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[nt,e+`{{hash:lang-ruby-wasm-script.js}}`],liveReload:!0,scriptType:`text/ruby-wasm`,compiledCodeLanguage:`ruby`},extensions:[`wasm.rb`,`rubywasm`],editor:`script`,editorLanguage:`ruby`,largeDownload:!0}})),Mo=e((()=>{jo()})),No,Po=e((()=>{J(),z(),rr(),n(),No={name:`scheme`,title:`Scheme`,formatter:{factory:Y},compiler:{factory:()=>async e=>e,scripts:[Pe],scriptType:`text/biwascheme`,compiledCodeLanguage:`scheme`},extensions:[`scm`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`scheme.js`},codemirror:{languageSupport:async()=>K((await r(async()=>{let{scheme:e}=await import(A+`codemirror-lang-scheme.js`);return{scheme:e}},[],import.meta.url)).scheme)}}}})),Fo=e((()=>{Po()})),Io,Lo=e((()=>{z(),n(),Io={name:`sass`,title:`Sass`,compiler:`scss`,extensions:[`sass`],editor:`style`,editorSupport:{codemirror:{languageSupport:async()=>(await r(async()=>{let{sass:e}=await import(A+`codemirror-lang-scss.js`);return{sass:e}},[],import.meta.url)).sass({indented:!0})}}}})),Ro,zo=e((()=>{z(),V(),n(),Ro={name:`scss`,title:`SCSS`,formatter:{prettier:{name:`scss`,pluginUrls:[B.postcss]}},compiler:{url:O+`sass/sass.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-scss-compiler.js}}`),self.createScssCompiler())},extensions:[`scss`],editor:`style`,editorSupport:{codemirror:{languageSupport:async()=>(await r(async()=>{let{sass:e}=await import(A+`codemirror-lang-scss.js`);return{sass:e}},[],import.meta.url)).sass()}}}})),Bo=e((()=>{Lo(),zo()})),Vo,Ho=e((()=>{Te(),z(),V(),Vo={name:`solid`,title:`Solid`,formatter:{prettier:{name:`babel`,pluginUrls:[B.babel,B.html]}},compiler:{dependencies:[`babel`],url:O+`babel-preset-solid/babel-preset-solid.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-solid-compiler.js}}`),self.createSolidCompiler()),imports:{"solid-js":E.getModuleUrl(`solid-js`),"solid-js/web":E.getModuleUrl(`solid-js/web`)}},extensions:[`solid.jsx`],editor:`script`,editorLanguage:`javascript`,editorSupport:{compilerOptions:{jsx:1,jsxImportSource:`solid-js`,jsxFactory:`JSX`,jsxFragmentFactory:`Fragment`}}}})),Uo,Wo=e((()=>{V(),Uo={name:`solid.tsx`,title:`Solid (TS)`,formatter:{prettier:{name:`babel-ts`,pluginUrls:[B.babel,B.html]}},compiler:`solid`,extensions:[`solid.tsx`],editor:`script`,editorLanguage:`typescript`,editorSupport:{compilerOptions:{checkJs:!0,strictNullChecks:!0,jsx:1,jsxImportSource:`solid-js`,jsxFactory:`JSX`,jsxFragmentFactory:`Fragment`}}}})),Go=e((()=>{Ho(),Wo()})),Ko,qo,Jo=e((()=>{z(),n(),Ko=`application/json`,qo={name:`sql`,title:`SQL`,formatter:{factory:()=>(importScripts(rt),async e=>({formatted:await self.sqlFormatter.format(e,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{url:it+`sql-wasm.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-sql-compiler.js}}`),self.createSqlCompiler()),scripts:({baseUrl:e})=>[e+`{{hash:lang-sql-script.js}}`],scriptType:Ko,compiledCodeLanguage:`json`},extensions:[`sql`,`sqlite`,`sqlite3`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`sql.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{sql:e}=await import(A+`codemirror-lang-sql.js`);return{sql:e}},[],import.meta.url)).sql()}}}})),Yo=e((()=>{Jo()})),Xo,Zo=e((()=>{G(),z(),V(),Xo={name:`stencil`,title:`Stencil`,formatter:{prettier:{name:`babel-ts`,pluginUrls:[B.babel,B.html]}},compiler:{url:at,factory:()=>async(e,{config:t})=>(await window.stencil.transpile(e,{sourceMap:!1,target:`es2019`,...H(`stencil`,t)})).code,types:{"@stencil/core":{url:O+`types/stencil-core.d.ts`,declareAsModule:!1}}},extensions:[`stencil.tsx`],editor:`script`,editorLanguage:`typescript`,editorSupport:{compilerOptions:{jsx:1,jsxFactory:`h`,jsxFragmentFactory:`Fragment`}}}})),Qo=e((()=>{Zo()})),$o,es=e((()=>{z(),$o={name:`stylis`,title:`Stylis`,compiler:{url:ot,factory:()=>async e=>{let{compile:t,serialize:n,stringify:r,middleware:i,prefixer:a}=window.stylis;return n(t(e),i([a,r]))}},extensions:[`stylis`],editor:`style`,editorLanguage:`scss`}})),ts=e((()=>{es()})),ns,rs=e((()=>{J(),z(),n(),ns={name:`stylus`,title:`Stylus`,compiler:{url:O+`stylus/stylus.min.js`,factory:()=>async e=>window.stylus.render(e)},extensions:[`styl`],editor:`style`,editorSupport:{codemirror:{languageSupport:async()=>K((await r(async()=>{let{stylus:e}=await import(A+`codemirror-lang-stylus.js`);return{stylus:e}},[],import.meta.url)).stylus)}}}})),is=e((()=>{rs()})),as,os=e((()=>{G(),z(),V(),as={name:`sucrase`,title:`Sucrase`,formatter:{prettier:{name:`babel`,pluginUrls:[B.babel,B.html]}},compiler:{url:O+`sucrase/sucrase.js`,factory:()=>async(e,{config:t})=>window.sucrase.transform(e,{transforms:[`jsx`,`typescript`],...H(`sucrase`,t)}).code},extensions:[`sucrase`],editor:`script`,editorLanguage:`typescript`,editorSupport:{compilerOptions:{jsx:4}}}})),ss=e((()=>{os()})),cs,X,ls,us=e((()=>{z(),V(),n(),cs=O+`vue-compiler-sfc/vue-compiler-sfc.js`,X={name:`vue`,title:`Vue`,longTitle:`Vue SFC`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:cs,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-vue-compiler.js}}`),self.createVueCompiler()),imports:{vue:ft,"livecodes/vue":pt}},extensions:[`vue`,`vue3`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`vue.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{vue:e}=await import(A+`codemirror-lang-vue.js`);return{vue:e}},[],import.meta.url)).vue()},codejar:{language:`html`},compilerOptions:{jsx:1,jsxFactory:`h`,jsxFragmentFactory:`Fragment`}}},ls={...X,name:`vue-app`,compiler:`vue`,extensions:[`app.vue`],editor:`markup`,editorSupport:{...X.editorSupport,monaco:{language:`vue`}}}})),ds,fs,ps=e((()=>{Zn(),z(),V(),us(),n(),ds={name:`svelte`,title:`Svelte`,formatter:{prettier:{name:`html`,pluginUrls:[B.html,B.babel]}},compiler:{url:L+`compiler/index.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-svelte-compiler.js}}`),self.createSvelteCompiler()),imports:{"#client/constants":L+`src/internal/client/constants.js`,"#compiler/builders":L+`src/compiler/utils/builders.js`,svelte:L+`src/index-client.js`,"svelte/animate":L+`src/animate/index.js`,"svelte/attachments":L+`src/attachments/index.js`,"svelte/easing":L+`src/easing/index.js`,"svelte/internal":L+`src/internal/index.js`,"svelte/internal/client":L+`src/internal/client/index.js`,"svelte/internal/disclose-version":L+`src/internal/disclose-version.js`,"svelte/internal/flags/legacy":L+`src/internal/flags/legacy.js`,"svelte/internal/flags/tracing":L+`src/internal/flags/tracing.js`,"svelte/internal/server":L+`src/internal/server/index.js`,"svelte/legacy":L+`src/legacy/legacy-client.js`,"svelte/motion":L+`src/motion/index.js`,"svelte/reactivity":L+`src/reactivity/index-client.js`,"svelte/reactivity/window":L+`src/reactivity/window/index.js`,"svelte/server":L+`src/server/index.js`,"svelte/store":L+`src/store/index-client.js`,"svelte/transition":L+`src/transition/index.js`,"svelte/events":L+`src/events/index.js`,clsx:E.getModuleUrl(`clsx`),"esm-env":E.getModuleUrl(`esm-env`)},inlineScript:`globalThis.process = { env: { NODE_ENV: "production" } };`},extensions:[`svelte`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`svelte.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{svelte:e}=await import(A+`codemirror-lang-svelte.js`);return{svelte:e}},[],import.meta.url)).svelte()},codejar:{language:`html`}}},fs={...ds,name:`svelte-app`,compiler:`svelte`,extensions:[`app.svelte`],editor:`markup`,editorSupport:{...X.editorSupport,monaco:{language:`svelte`}}}})),ms=e((()=>{ps()})),hs,gs=e((()=>{J(),z(),n(),hs={name:`tcl`,title:`Tcl`,compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[et,e+`{{hash:lang-tcl-script.js}}`],scriptType:`text/tcl`,compiledCodeLanguage:`tcl`},extensions:[`tcl`],editor:`script`,editorSupport:{codemirror:{languageSupport:async()=>K((await r(async()=>{let{tcl:e}=await import(A+`codemirror-lang-tcl.js`);return{tcl:e}},[],import.meta.url)).tcl)}}}})),_s=e((()=>{gs()})),vs,ys=e((()=>{z(),Vi(),vs={name:`teal`,title:`Teal`,formatter:Ri,compiler:{url:M,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-teal-compiler.js}}`),self.createTealCompiler()),scripts:[M],scriptType:`application/lua`,compiledCodeLanguage:`lua`},extensions:[`tl`],editor:`script`,editorLanguage:`lua`}})),bs=e((()=>{ys()})),xs,Ss=e((()=>{z(),V(),xs={name:`twig`,title:`Twig`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:st,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-twig-compiler.js}}`),self.createTwigCompiler())},extensions:[`twig`],editor:`markup`,editorLanguage:`html`}})),Cs=e((()=>{Ss()})),ws,Ts=e((()=>{z(),V(),ws={name:`vento`,title:`Vento`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{url:O+`vento/vento.js`,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-vento-compiler.js}}`),self.createVentoCompiler())},extensions:[`vto`,`vento`],editor:`markup`,editorLanguage:`html`}})),Es=e((()=>{Ts()})),Ds=e((()=>{us()})),Os,ks,As=e((()=>{z(),V(),Os=mt+`vue2-sfc-loader.js`,ks={name:`vue2`,title:`Vue 2`,longTitle:`Vue 2 SFC`,formatter:{prettier:{name:`html`,pluginUrls:[B.html]}},compiler:{factory:(e,t)=>(self.importScripts(t+`{{hash:lang-vue2-compiler.js}}`),self.createVue2Compiler()),scripts:[dt,Os],imports:{vue:dt+`/dist/vue.runtime.esm-browser.prod.js`}},extensions:[`vue2`],editor:`script`,editorLanguage:`html`}})),js=e((()=>{As()})),Ms,Ns,Ps,Fs=e((()=>{z(),n(),Ms=O+`wast-refmt/wast-refmt.js`,Ns=`application/wasm-uint8`,Ps={name:`wat`,title:`WAT`,longTitle:`WebAssembly Text`,formatter:{factory:()=>(importScripts(Ms),async e=>{let t=e;try{t=self.wastRefmt.format(e)}catch(e){console.warn(`failed parsing WAT`,e)}return{formatted:t,cursorOffset:0}})},compiler:{url:ht,factory:(e,t)=>(self.importScripts(t+`{{hash:lang-wat-compiler.js}}`),self.createWatCompiler()),scripts:({baseUrl:e})=>[e+`{{hash:lang-wat-script.js}}`],scriptType:Ns,compiledCodeLanguage:`Binary`},extensions:[`wat`,`wast`,`webassembly`,`wasm`],editor:`script`,editorSupport:{monaco:{languageSupport:N+`wat.js`},codemirror:{languageSupport:async()=>(await r(async()=>{let{wast:e}=await import(A+`codemirror-lang-wast.js`);return{wast:e}},[],import.meta.url)).wast()},codejar:{language:`wasm`}}}})),Is=e((()=>{Fs()})),Z,Ls=e((()=>{yt(),Ct(),Dt(),jt(),Ft(),Rt(),Vt(),Gt(),Jt(),or(),lr(),rr(),pr(),gr(),yr(),Sr(),Er(),kr(),Mr(),Fr(),Rr(),Vr(),Wr(),qr(),Xr(),$r(),ri(),oi(),li(),fi(),hi(),yi(),wi(),Di(),Ai(),Ni(),Ii(),Vi(),Wi(),qi(),Xi(),ea(),ra(),oa(),la(),pa(),ga(),ya(),Sa(),Ta(),ka(),Ma(),Fa(),Ba(),Ua(),Ka(),Za(),co(),_o(),mo(),bo(),To(),ko(),Mo(),Fo(),Bo(),Go(),Yo(),Qo(),ts(),is(),ss(),ms(),_s(),bs(),Cs(),no(),Es(),Ds(),js(),Is(),Z=[ii,Ji,Qi,kt,Na,xt,Zr,sa,ti,Ar,Nr,da,ji,Dr,xs,ws,_t,_i,It,ia,wr,vo,br,Ro,Io,Oi,ns,$o,pi,eo,zr,Nt,as,bi,Si,qa,Ya,io,oo,X,ks,ls,ds,fs,Xo,Vo,Uo,Co,Gi,sr,Pi,Ut,Kt,si,fo,ho,ma,Ra,Va,Wa,Do,Ao,Gr,Jr,ba,Ca,dr,mr,ui,_r,_a,zi,Hi,vs,Ir,Ti,No,tr,ir,Hr,hs,Tt,Ps,qo,Da,Aa,ta,zt]})),Rs=e((()=>{Ls(),Dn(),window.deps={translateString:(e,t)=>t,languages:Z,processors:En}})),zs,Bs=e((()=>{zs={title:`Untitled Project`,description:``,head:`<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,htmlAttrs:`lang="en" class=""`,tags:[],autoupdate:!0,autosave:!1,autotest:!1,delay:1500,formatOnsave:!1,view:`split`,mode:`full`,theme:`dark`,themeColor:void 0,layout:`responsive`,editorTheme:void 0,appLanguage:void 0,recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:`html`,content:``},style:{language:`css`,content:``},script:{language:`javascript`,content:``},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{},tests:{language:`typescript`,content:``},tools:{enabled:`all`,active:``,status:``},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,foldRegions:!1,semicolons:!0,singleQuote:!1,trailingComma:!0,minimap:!1,emmet:!0,editorMode:void 0,version:{}.VERSION}})),Vs,Hs=e((()=>{Vs={ar:`العربية`,bn:`বাংলা`,de:`Deutsch`,en:`English`,es:`Español`,fa:`فارسی`,fr:`Français`,hi:`हिंदी`,id:`Bahasa Indonesia`,it:`Italiano`,ja:`日本語`,nl:`Nederlands`,pt:`Português`,ru:`Ру́сский`,tr:`Türkçe`,ur:`اردو`,"zh-CN":`中文（简体）`}})),Us,Ws=e((()=>{Us={name:`angular`,aliases:[`ng`],title:window.deps.translateString(`templates.starter.angular`,`Angular Starter`),thumbnail:`assets/templates/angular.svg`,activeEditor:`script`,markup:{language:`html`,content:`<app>Loading...</app>
`},style:{language:`css`,content:``},script:{language:`typescript`,content:`import { Component, Input, NgModule, enableProdMode } from '@angular/core@12.2.13';
import { CommonModule } from '@angular/common@12.2.13';
import { BrowserModule } from '@angular/platform-browser@12.2.13';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic@12.2.13';
import 'zone.js@0.12.0/dist/zone';

// app.component.ts
@Component({
  selector: "app",
  styles: [
    \`
  .container,
  .container button {
    text-align: center;
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
  \`,
  ],
  template: \`
    <div class="container">
      <heading name="{{name}}"></heading>
      <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/angular.svg" />
      <p>You clicked {{count}} times.</p>
      <button type="button" (click)="increment()">Click me</button>
    </div>
  \`,
})
class AppComponent {
  count = 0;
  name = "Angular";

  constructor() {}

  increment() {
    this.count += 1;
  }
}

// heading.component.ts
@Component({
  selector: "heading",
  template: "<h1>{{title}}</h1>",
})
class HeadingComponent {
  @Input() name: string;
  title: string;

  ngOnInit() {
    this.title = \`Hello, \${this.name}!\`;
  }
}

// app.module.ts
@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, HeadingComponent],
  bootstrap: [AppComponent],
  providers: [],
})
class AppModule {}

// main.ts
// enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: Error) => console.error(err));
`},customSettings:{typescript:{experimentalDecorators:!0}}}})),Gs,Ks=e((()=>{Gs={name:`assemblyscript`,aliases:[`as`],title:window.deps.translateString(`templates.starter.assemblyscript`,`AssemblyScript Starter`),thumbnail:`assets/templates/assemblyscript.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/assemblyscript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>loading...</button>
</div>

<script>
  (async() => {
    // The \`loadWasm\` method of \`livecodes\` global object
    // optionally takes an import object and
    // returns a promise which resolves to an object
    // exposing the compiled wasm module, wasm text and wasm binary
    const { wasmModule, text, binary } = await livecodes.loadWasm();
    const { __getString, getTitle, increment } = wasmModule.exports;

    const title = document.querySelector('#title');
    const counter = document.querySelector("#counter");
    const button = document.querySelector("#counter-button");
    let count = 0;

    title.innerHTML = __getString(getTitle());
    button.innerText = 'Click me';
    button.disabled = false;

    button.addEventListener("click", () => {
      count = increment(count);
      counter.innerText = count;
    }, false);

  })();
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`assemblyscript`,content:`export function getTitle(): string {
  return "AssemblyScript";
}
export function increment(num: i32): i32 {
  return num + 1;
}
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),qs,Js=e((()=>{qs={name:`astro`,title:window.deps.translateString(`templates.starter.astro`,`Astro Starter`),thumbnail:`assets/templates/astro.svg`,activeEditor:`markup`,markup:{language:`astro`,content:`---
import {format} from 'date-fns';

const title = "Astro";

const builtAt: Date = new Date();
const builtAtFormatted = format(builtAt, 'MMMM dd, yyyy -- H:mm:ss.SSS');
---
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>Welcome to Astro</title>
  <style>
    .container,
    .container button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
    .note {
      margin: 1rem;
      padding: 1rem;
      border-radius: 4px;
      background: #E4E5E6;
      border: 1px solid #BBB;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Hello, {title}!</h1>
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/astro.svg" />
    <p>You clicked <span id="counter">0</span> times.</p>
    <button id="counter-button">Click me</button>
    <p class="note">
      <strong>RENDERED AT:</strong><br/>
      {builtAtFormatted}
    </p>
  </div>
  <script>
    let count = 0
    document
      .querySelector("#counter-button")
      .addEventListener("click", () => {
        count += 1;
        document.querySelector("#counter").innerText = count;
    });
  <\/script>
</body>

</html>
`},style:{language:`css`,content:``},script:{language:`javascript`,content:``},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Ys,Xs=e((()=>{Ys={name:`backbone`,title:window.deps.translateString(`templates.starter.backbone`,`Backbone Starter`),thumbnail:`assets/templates/backbone.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/backbone.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`javascript`,content:`var Counter = Backbone.Model.extend({
  defaults: {
    value: 0,
    title: 'Backbone'
  },
  increment: function() {
    this.set({ value: this.get('value') + 1 });
  }
});
var counter = new Counter();

var AppView = Backbone.View.extend({
  el:'.container',
  render: function() {
    this.$('#counter').html(this.model.get('value'));
    this.$('#title').html(this.model.get('title'));
  },
  events:{
    'click #counter-button': 'addOne',
  },
  initialize: function() {
    this.model.on('change', this.render, this);
    this.render();
  },
  addOne: function() {
    this.model.increment();
    this.render();
  }
});
var view = new AppView({ model: counter });
`},stylesheets:[],scripts:[`https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js`,`https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js`,`https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js`],cssPreset:``,imports:{},types:{}}})),Zs,Qs=e((()=>{Zs={name:`blank`,title:window.deps.translateString(`templates.starter.blank`,`Blank Project`),thumbnail:`assets/templates/blank.svg`,activeEditor:`markup`,markup:{language:`html`,content:``},style:{language:`css`,content:``},script:{language:`javascript`,content:``},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),$s,ec=e((()=>{$s={name:`blockly`,title:window.deps.translateString(`templates.starter.blockly`,`Blockly Starter`),thumbnail:`assets/templates/blockly.svg`,activeEditor:`script`,markup:{language:`html`,content:`<xml
  data-src="{{ __CDN_URL__ }}@live-codes/blockly-utils@0.2.0/src/dom-blocks.xml"
  data-type="blockly/xml"
  style="display: none"
></xml>
<script
  src="{{ __CDN_URL__ }}@live-codes/blockly-utils@0.2.0/src/dom-blocks.js"
  type="blockly/script"
><\/script>

<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/blockly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`blockly`,content:`<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="?\`Dl!ysD-zLY64Lpe)c(">count</variable>
  </variables>
  <block type="dom_set_property" id="sr4sLpCoHdr%yw}lz]{u" x="35" y="35">
    <value name="element">
      <shadow type="dom_element_selector" id="8q6b-NxGim%yU^KHWg+M">
        <value name="selector">
          <shadow type="text" id="8MF#)_03uL#%YWyCDgM^">
            <field name="TEXT">

            </field>
          </shadow>
        </value>
      </shadow>
      <block type="dom_element_by_id" id="hXkkuwcC=n!.Z6H?$ROO">
        <value name="id">
          <shadow type="text" id="q=C\`rbb\`[ki-OOw7GiYK">
            <field name="TEXT">title</field>
          </shadow>
        </value>
      </block>
    </value>
    <value name="property">
      <shadow type="dom_element_properties" id="AHLrrpzt[m1Yx/4?2U-{">
        <field name="property">innerText</field>
      </shadow>
    </value>
    <value name="value">
      <shadow type="text" id="M8W]wK^:#Db^F_bIEad3">
        <field name="TEXT">Blockly</field>
      </shadow>
    </value>
    <next>
      <block type="variables_set" id="Ecm7Dkj.nJmeV{jTL8Y_">
        <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
        <value name="VALUE">
          <block type="math_number" id="D%LW6COR3l5[Z9MCjx/L">
            <field name="NUM">0</field>
          </block>
        </value>
      </block>
    </next>
  </block>
  <block type="dom_handle_event" id="K,_92]w;quNkxuUv*s9n" x="35" y="270">
    <value name="element">
      <shadow type="dom_element_selector" id="QV~_0VyIy(*b{r\`yJWy1">
        <value name="selector">
          <shadow type="text" id="iYe)MS{x+-J}5Kph!n7M">
            <field name="TEXT">button</field>
          </shadow>
        </value>
      </shadow>
    </value>
    <value name="event">
      <shadow type="dom_events" id="Dfnt}40u]T$?:p:S}irM">
        <field name="event">click</field>
      </shadow>
    </value>
    <statement name="event_handler">
      <block type="math_change" id="dxKITU6a]\`3w(sSIus2K">
        <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
        <value name="DELTA">
          <shadow type="math_number" id="_exnsV4gci%)lqM3#)2A">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <next>
          <block type="dom_set_property" id="c]gWo#)7YgY8eszx.]fO">
            <value name="element">
              <shadow type="dom_element_selector" id="\`p]W.N%K-bP39x)tC,j0">
                <value name="selector">
                  <shadow type="text" id="}uE=/^7ZJn-xR4v1Oumn">
                    <field name="TEXT">

                    </field>
                  </shadow>
                </value>
              </shadow>
              <block type="dom_element_by_id" id="PWFAw[cc{xg0qf}Frlw|">
                <value name="id">
                  <shadow type="text" id="}0V..:dc(=V;hNFV53R[">
                    <field name="TEXT">counter</field>
                  </shadow>
                </value>
              </block>
            </value>
            <value name="property">
              <shadow type="dom_element_properties" id=")K$1i925QSZjn/w:{j[Z">
                <field name="property">innerText</field>
              </shadow>
            </value>
            <value name="value">
              <shadow type="text" id="gu4kA*Ig3*6\`sGaI*P6C">
                <field name="TEXT">

                </field>
              </shadow>
              <block type="variables_get" id="LmiNr+~z9=zAWH]H8gqm">
                <field name="VAR" id="?\`Dl!ysD-zLY64Lpe)c(">count</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),tc,nc=e((()=>{tc={name:`bootstrap`,aliases:[`bs`],title:window.deps.translateString(`templates.starter.bootstrap`,`Bootstrap Starter`),thumbnail:`assets/templates/bootstrap.svg`,activeEditor:`markup`,markup:{language:`html`,content:`<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item active">
          <a class="nav-link" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            >Disabled</a
          >
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdown01"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >Dropdown</a
          >
          <ul class="dropdown-menu" aria-labelledby="dropdown01">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<main class="container">
  <div class="starter-template text-center py-5 px-3">
    <h1>Bootstrap starter template</h1>
    <p class="lead">
      Use this document as a way to quickly start any new project.<br />
      All you get is this text and a mostly barebones HTML document.
    </p>
  </div>
</main>
`},style:{language:`css`,content:`body {
  padding-top: 5rem;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
`},script:{language:`javascript`,content:``},stylesheets:[`{{ __CDN_URL__ }}bootstrap@5.3.0/dist/css/bootstrap.min.css`],scripts:[`{{ __CDN_URL__ }}bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js`],cssPreset:``,imports:{},types:{}}})),rc,ic=e((()=>{rc={name:`civet`,title:window.deps.translateString(`templates.starter.civet`,`Civet Starter`),thumbnail:`assets/templates/civet.png`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/civet.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`civet`,content:`titleElement := document.getElementById 'title'
counterElement := document.getElementById 'counter'
button := document.getElementById 'counter-button'

title := 'Civet'
titleElement.innerText = title

counter := (count: number) => => count += 1
increment := counter 0
function handleClick: void counterElement.innerText = increment()

button.addEventListener 'click', handleClick
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),ac,oc=e((()=>{ac={name:`clio`,title:window.deps.translateString(`templates.starter.clio`,`Clio Starter`),thumbnail:`assets/templates/clio.png`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/clio.png" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`clio`,content:`fn capitalize str:
  (str.charAt 0 -> .toUpperCase) + (str.slice 1 -> .toLowerCase)

fn greet name:
  f"Hello, {name}!"

fn setTitle name:
  title = document.querySelector "#title"
  title.innerText = name -> capitalize -> greet

fn increment value:
  (Number value) + 1

fn activateBtn btn:
  btn.disabled = false
  btn.innerText = "Click me"
  btn

fn onBtnClick:
  counter = document.querySelector "#counter"
  counter.innerText = increment counter.innerText

export fn main argv:
  setTitle "clio"
  document.querySelector "#counter-button"
    -> activateBtn
    -> .addEventListener "click" onBtnClick
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),sc,cc=e((()=>{sc={name:`clojurescript`,aliases:[`cljs`],title:window.deps.translateString(`templates.starter.clojurescript`,`ClojureScript Starter`),thumbnail:`assets/templates/cljs.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="app">Loading...</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`clojurescript`,content:`(ns react.component
  (:require
    ;; you may use npm packages
    ["canvas-confetti$default" :as confetti]
    ["react$default" :as React]
    ["react" :refer [useState]]
    ["react-dom/client" :refer [createRoot]]))

(defn Counter [^:js {:keys [name]}]
  (let [[counter setCount] (useState 0)]
    #jsx [:div
            {:className "container"}
            [:h1 (str "Hello, " name "!")]
            [:img
              {:className "logo"
              :alt "logo"
              :src "{{ __livecodes_baseUrl__ }}assets/templates/cljs.svg"}]
            [:p "You clicked " counter " times."]
            [:button
              {:onClick (fn []
                          (if (= (mod counter 3) 0) (confetti))
                          (setCount (inc counter)))}
              "Click me"]]))

(def title "ClojureScript")
(print (str "Hello, " title "!"))
(defonce root (createRoot (js/document.querySelector "#app")))
(.render root #jsx [Counter #js {:name title}])
`}}})),lc,uc=e((()=>{lc={name:`coffeescript`,aliases:[`coffee`],title:window.deps.translateString(`templates.starter.coffeescript`,`CoffeeScript Starter`),thumbnail:`assets/templates/coffeescript.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/coffeescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`coffeescript`,content:`titleElement = document.getElementById 'title'
counterElement = document.getElementById 'counter'
button = document.getElementById 'counter-button'

title = 'CoffeeScript'
titleElement.innerText = title

counter = (count) -> -> count += 1
increment = counter 0

button.addEventListener('click',
  -> counterElement.innerText = increment())
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),dc,fc=e((()=>{dc={name:`commonlisp`,aliases:[`lisp`],title:window.deps.translateString(`templates.starter.commonlisp`,`Common Lisp Starter`),thumbnail:`assets/templates/commonlisp.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/commonlisp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`commonlisp`,content:`(defun set-attribute (&key selector attribute value)
  (let ((node
         (#j:document:querySelector selector)))
    (setf (jscl::oget node attribute) value)
    node))

(let ((title "Common Lisp"))
  (set-attribute :selector "#title" :attribute "innerHTML"
      :value (format nil "Hello, ~A!" title)))

(let ((counter 0))
  (set-attribute :selector "#counter-button" :attribute "onclick"
    :value #'(lambda (ev)
              (setf counter (+ counter 1))
              (set-attribute :selector "#counter" :attribute "innerHTML"
               :value counter))))

(#j:console:clear)
(write "Hello, Common Lisp!")
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),pc,mc=e((()=>{pc={name:`cpp`,aliases:[`c++`],title:window.deps.translateString(`templates.starter.cpp`,`C++ Starter`),thumbnail:`assets/templates/cpp.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cpp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script>
  // set initial input
  livecodes.cpp.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.cpp.loaded;

    // get initial output
    const initialOutput = livecodes.cpp.output;
    update(initialOutput);

    button.onclick = async () => {
      // run with new input
      const {output, error, exitCode} = await livecodes.cpp.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
    }
  });
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`cpp`,content:`#include <iostream>
using namespace std;

int main() {
    char title[] = "C++";
    cout << title << endl;

    int count;
    cin >> count;
    count += 1;
    cout << count << endl;

    return 0;
}
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),hc,gc=e((()=>{hc={name:`cpp-wasm`,aliases:[`clang`,`c++-wasm`],title:window.deps.translateString(`templates.starter.cpp-wasm`,`C++ (Wasm) Starter`),thumbnail:`assets/templates/cpp.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/cpp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.cpp.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.cpp.loaded;

    // get initial output
    const initialOutput = livecodes.cpp.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.cpp.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
    }
  });
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`cpp-wasm`,content:`#include <iostream>
using namespace std;

int main() {
    char title[] = "C++";
    cout << title << endl;

    int count;
    cin >> count;
    count += 1;
    cout << count << endl;

    return 0;
}
`}}})),_c,vc=e((()=>{_c={name:`csharp-wasm`,aliases:[`c#-wasm`],title:window.deps.translateString(`templates.starter.csharp-wasm`,`C# (Wasm) Starter`),thumbnail:`assets/templates/csharp.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/csharp.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.csharp.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.csharp.loaded;

    // get initial output
    const initialOutput = livecodes.csharp.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.csharp.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
    }
  });
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`csharp-wasm`,content:`using System;

class Program
{
    static void Main()
    {
        string title = "C#";
        Console.WriteLine(title);

        string input = Console.ReadLine();
        int count = int.Parse(input);
        count += 1;
        Console.WriteLine(count);
    }
}
`}}})),yc,bc=e((()=>{yc={name:`d3`,title:window.deps.translateString(`templates.starter.d3`,`D3 Starter`),thumbnail:`assets/templates/d3.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="chart">Loading...</div>
`},style:{language:`css`,content:`.bar {
  fill: steelblue;
}

.bar:hover {
  fill: orange;
}
`},script:{language:`javascript`,content:`import * as d3 from "d3";

const data = [150, 230, 180, 90];

const svg = d3
  .select("#chart")
  .html('')
  .append("svg")
  .attr("width", 300)
  .attr("height", 200);

svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("width", (d) => d)
  .attr("height", 40)
  .attr("y", (d, i) => i * 50 + 10)
  .attr("x", 10);
`}}})),xc,Sc=e((()=>{xc={name:`daisyui`,title:window.deps.translateString(`templates.starter.daisyui`,`daisyUI Starter`),thumbnail:`assets/templates/daisyui.svg`,activeEditor:`markup`,markup:{language:`html`,content:`<!-- based on https://daisyui.com/tailwindplay/ -->

<!-- buttons -->
<div class="p-4">
  <button class="btn btn-primary">primary</button>
  <button class="btn btn-secondary">secondary</button>
  <button class="btn btn-accent">accent</button>
</div>

<!-- same buttons with another theme! -->
<div class="p-4" data-theme="abyss">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-accent">Accent</button>
</div>
<div class="p-4" data-theme="purplewind">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-accent">Accent</button>
</div>

<!-- tab -->
<div class="tabs tabs-lift p-4">
  <button class="tab">Tab 1</button>
  <button class="tab tab-active">Tab 2</button>
  <button class="tab">Tab 3</button>
  <button class="tab"></button>
</div>

<!-- toggle, checkbox, radio -->
<div class="p-4">
  <input type="checkbox" class="toggle" />
  <input type="checkbox" class="toggle toggle-primary" />
  <input type="checkbox" class="toggle toggle-secondary" />
  <input type="checkbox" class="toggle toggle-accent" />
  <br/>
  <input type="checkbox" class="checkbox" />
  <input type="checkbox" class="checkbox-primary checkbox" />
  <input type="checkbox" class="checkbox-secondary checkbox" />
  <input type="checkbox" class="checkbox-accent checkbox" />
  <br/>
  <input type="radio" name="radio" class="radio" />
  <input type="radio" name="radio" class="radio-primary radio" />
  <input type="radio" name="radio" class="radio-secondary radio" />
  <input type="radio" name="radio" class="radio-accent radio" />
</div>

<!-- card -->
<div class="card m-4 w-80 shadow-sm">
  <figure>
    <img src="{{ __livecodes_baseUrl__ }}assets/templates/daisyui-5.webp" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">DaisyUI 5.0</h2>
    <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus.</p>
  </div>
</div>

<!-- dropdown -->
<details class="dropdown m-4">
  <summary class="btn m-1">open/close dropdown</summary>
  <ul class="dropdown-content menu z-[2] w-52 rounded-box bg-base-200 p-2">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</details>

<!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>

<!-- steps -->
<ul class="steps my-4 w-full">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Choose plan</li>
  <li class="step">Purchase</li>
  <li class="step">Receive Product</li>
</ul>

<!-- chat bubble -->
<div class="chat chat-start m-4">
  <div class="avatar chat-image">
    <div class="w-10 rounded-full">
      <img src="{{ __livecodes_baseUrl__ }}assets/templates/daisy-profile-picture.webp" />
    </div>
  </div>
  <div class="chat-bubble">see all components <a class="link" target="_blank" href="https://daisyui.com/components">Here</a></div>
</div>
`},style:{language:`css`,content:`@import "tailwindcss";
@plugin "daisyui"{
  themes: light --default, dark --prefersdark, abyss;
}


/**
  A custom theme made with
  https://daisyui.com/theme-generator/
*/

@plugin "daisyui/theme" {
  name: "purplewind";
  default: false;
  prefersdark: false;
  color-scheme: "light";
  --color-base-100: oklch(96% 0.016 293.756);
  --color-base-200: oklch(94% 0.029 294.588);
  --color-base-300: oklch(89% 0.057 293.283);
  --color-base-content: oklch(38% 0.189 293.745);
  --color-primary: oklch(82% 0.12 346.018);
  --color-primary-content: oklch(28% 0.109 3.907);
  --color-secondary: oklch(82% 0.119 306.383);
  --color-secondary-content: oklch(29% 0.149 302.717);
  --color-accent: oklch(80% 0.105 251.813);
  --color-accent-content: oklch(28% 0.091 267.935);
  --color-neutral: oklch(38% 0.189 293.745);
  --color-neutral-content: oklch(96% 0.016 293.756);
  --color-info: oklch(54% 0.245 262.881);
  --color-info-content: oklch(97% 0.014 254.604);
  --color-success: oklch(60% 0.118 184.704);
  --color-success-content: oklch(98% 0.014 180.72);
  --color-warning: oklch(68% 0.162 75.834);
  --color-warning-content: oklch(98% 0.026 102.212);
  --color-error: oklch(58% 0.253 17.585);
  --color-error-content: oklch(96% 0.015 12.422);
  --radius-selector: 0.25rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 2px;
  --depth: 1;
  --noise: 1;
}
`},script:{language:`javascript`,content:``},processors:[`tailwindcss`]}})),Cc,wc=e((()=>{Cc={name:`diagrams`,title:window.deps.translateString(`templates.starter.diagrams`,`Diagrams Starter`),thumbnail:`assets/templates/diagrams.svg`,activeEditor:`markup`,markup:{language:`diagrams`,contentUrl:`{{ __livecodes_baseUrl__ }}assets/templates/diagrams-starter.html`},style:{language:`css`,content:`.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container div {
  width: 100%;
  text-align: center;
}

.container img {
  width: 80%;
  max-width: 600px;
}

.container h3:not(:nth-child(1)) {
  margin-top: 3em;
}
`},script:{language:`javascript`,content:``},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Tc,Ec=e((()=>{Tc={name:`fennel`,title:window.deps.translateString(`templates.starter.fennel`,`Fennel Starter`),thumbnail:`assets/templates/fennel.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/fennel.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`fennel`,content:`(global js (require :js))
(global window js.global)
(global document window.document)
(tset (document:getElementById :title) :innerHTML :Fennel)
(global Counter {:count 0})
(fn Counter.new [self o]
  (set-forcibly! o (or o {}))
  (setmetatable o self)
  (set self.__index self)
  o)
(fn Counter.increment [self] (set self.count (+ self.count 1)))
(fn Counter.show [self]
  (let [counter-el (document:getElementById :counter)]
    (set counter-el.innerHTML (: "You clicked %d times." :format self.count))))
(global counter (Counter:new nil))
(global button (document:querySelector "#counter-button"))
(button:addEventListener :click (fn [] (counter:increment) (counter:show)))
`}}})),Dc,Oc,kc,Ac=e((()=>{z(),Dc=Ve+`build/packages/plinth/src/plinth/`,Oc=Ve+`build/dev/javascript/plinth/plinth/`,kc={name:`gleam`,title:window.deps.translateString(`templates.starter.gleam`,`Gleam Starter`),thumbnail:`assets/templates/gleam.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/gleam.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`gleam`,content:`import gleam/int
import gleam/io
import gleam/result
import gleam/dynamic
import plinth/browser/document
import plinth/browser/element
import plinth/browser/event
// see docs for using custom modules:
// https://livecodes.io/docs/languages/gleam

pub fn main() {
  say_hello()
  counter()
}

fn say_hello() {
  let greeting = hello("Gleam")
  let assert Ok(title) = document.query_selector("#title")
  element.set_inner_html(title, greeting)
  io.println(cowsay(greeting))
}

fn counter() {
  document.add_event_listener("click", fn(ev) {
    let target = dynamic.unsafe_coerce(event.target(ev))
    case element.get_attribute(target, "id") {
        Ok("counter-button") -> increment()
        _ -> Nil
    }
  })
}

fn increment() {
  let assert Ok(el) = document.query_selector("#counter")
  let assert Ok(_) = el
  |> element.inner_text
  |> int.parse
  |> result.map(fn(n) { n + 1 })
  |> result.map(int.to_string)
  |> result.map(element.set_inner_html(el, _))
  Nil
}

// custom module
@external(javascript, "my_pkg/greet.js", "hello")
pub fn hello(str: String) -> String

// npm module
@external(javascript, "npm:cowsay2", "say")
pub fn cowsay(str: String) -> String
`},customSettings:{imports:{"my_pkg/greet.js":Ve+`demo/greet.js`},gleam:{modules:{"plinth/browser/document":{srcUrl:Dc+`browser/document.gleam`,compiledUrl:Oc+`browser/document.mjs`},"plinth/browser/element":{srcUrl:Dc+`browser/element.gleam`,compiledUrl:Oc+`browser/element.mjs`},"plinth/browser/event":{srcUrl:Dc+`browser/event.gleam`,compiledUrl:Oc+`browser/event.mjs`}}}}}})),jc,Mc=e((()=>{jc={name:`go`,aliases:[`golang`],title:window.deps.translateString(`templates.starter.go`,`Go Starter`),thumbnail:`assets/templates/go.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/go.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`},script:{language:`go`,content:`package main

import (
	"fmt"
	"syscall/js"
	"time"
)

func main() {
	title := querySelector("#title")
	title.Set("innerHTML", "Golang")

	registerCounter()

	// yes, you can use goroutines (check the console)
	go greet()
  fmt.Println("Hello!")
}

func querySelector(id string) js.Value {
	return js.Global().Get("document").Call("querySelector", id)
}

func registerCounter() {
	btn := querySelector("#counter-button")
	counter := querySelector("#counter")
	count := 0

	var cb js.Func
	cb = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		count += 1
		counter.Set("innerHTML", count)
		return nil
	})
	btn.Call("addEventListener", "click", cb)
}

func greet() {
	if hours, _, _ := time.Now().Clock(); hours < 12 {
		fmt.Println("Good morning")
	} else if hours < 18 {
		fmt.Println("Good afternoon")
	} else {
		fmt.Println("Good evening")
	}
}
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Nc,Pc=e((()=>{Nc={name:`go-wasm`,aliases:[`golang-wasm`],title:window.deps.translateString(`templates.starter.go-wasm`,`Go (Wasm) Starter`),thumbnail:`assets/templates/go.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Go (Wasm)</h1>
  <img class="logo" alt="Go logo" src="{{ __livecodes_baseUrl__ }}assets/templates/go.svg" />

  <div class="demo-section">
    <h2>Interactive Counter</h2>
    <p>Current count: <span id="counter">0</span></p>
    <button id="increment-btn" disabled>Loading...</button>
  </div>

  <div class="demo-section">
    <h2>Stdin Input Demo</h2>
    <p>Enter your name:</p>
    <input type="text" id="name-input" placeholder="Your name" />
    <button id="greet-btn" disabled>Loading...</button>
    <p id="greeting"></p>
  </div>


</div>

<script>
  addEventListener('load', async () => {
    // Wait for Go WASM to load
    await livecodes.goWasm.loaded;

    const incrementBtn = document.querySelector("#increment-btn");
    const greetBtn = document.querySelector("#greet-btn");

    incrementBtn.disabled = false;
    incrementBtn.textContent = "Increment";
    greetBtn.disabled = false;
    greetBtn.textContent = "Greet";

    incrementBtn.onclick = async () => {
      const currentCount = document.querySelector("#counter").textContent;
      const {output, error} = await livecodes.goWasm.run(currentCount);
      if (error) {
        console.error('Error:', error);
      } else {
        document.querySelector("#counter").textContent = output;
      }
    };

    greetBtn.onclick = async () => {
      const name = document.querySelector("#name-input").value;
      if (!name.trim()) {
        alert('Please enter your name');
        return;
      }
      const {output, error} = await livecodes.goWasm.run(name);
      if (error) {
        console.error('Error:', error);
      } else {
        document.querySelector("#greeting").textContent = output;
      }
    };

  });
<\/script>
`},style:{language:`css`,content:`.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.logo {
  width: 150px;
  display: block;
  margin: 20px auto;
}

.demo-section {
  background: #f5f5f5;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  border-left: 4px solid #00add8;
}

.demo-section h2 {
  margin-top: 0;
  color: #333;
}

button {
  background: #00add8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 5px;
}

button:hover:not(:disabled) {
  background: #0099c7;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

input[type="text"], input[type="number"] {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin: 5px;
  width: 200px;
}

#counter {
  font-weight: bold;
  color: #00add8;
  font-size: 24px;
}

#greeting, #result {
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}
`},script:{language:`go-wasm`,content:`package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// Read input from stdin
	scanner := bufio.NewScanner(os.Stdin)

	if scanner.Scan() {
		input := strings.TrimSpace(scanner.Text())

		if count, err := strconv.Atoi(input); err == nil {
			newCount := count + 1
			fmt.Println(newCount)
			return
		}

		fmt.Printf("Hello, %s!\\n", input)
	} else {
		fmt.Println("Hello from Go WebAssembly!")
	}
}
`}}})),Fc,Ic=e((()=>{Fc={name:`imba`,title:window.deps.translateString(`templates.starter.imba`,`Imba Starter`),thumbnail:`assets/templates/imba.svg`,activeEditor:`script`,markup:{language:`html`,content:``},style:{language:`css`,content:``},script:{language:`imba`,content:`tag app-counter
	prop name = "Imba"
	prop count = 0

	css self
		text-align: center
		font: 1em sans-serif

	css .btn h:2em	w:10em	fs:1em

	<self>
		<h1> "Hello, {name}!"
		<img[h:100px] alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/imba.svg">
		<p> "You clicked {count} times."
		<button.btn @click=count++> "Click me"

imba.mount <app-counter>
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Lc,Rc=e((()=>{Lc={name:`java`,title:window.deps.translateString(`templates.starter.java`,`Java Starter`),thumbnail:`assets/templates/java.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/java.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>
<script>
  // set initial input
  livecodes.java.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.java.loaded;

    // get initial output
    const initialOutput = livecodes.java.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.java.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
    }
  });
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`java`,content:`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {

  public static void main(String[] args) throws IOException {
    String title = "Java";
    System.out.println(title);

    BufferedReader reader = new BufferedReader(
      new InputStreamReader(System.in)
    );
    int count = Integer.parseInt(reader.readLine());
    count += 1;
    System.out.println(count);
  }
}
`}}})),zc,Bc=e((()=>{zc={name:`javascript`,aliases:[`js`],title:window.deps.translateString(`templates.starter.javascript`,`JavaScript Starter`),thumbnail:`assets/templates/javascript.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/javascript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`javascript`,content:`const title = document.querySelector("#title");
const counter = document.querySelector("#counter");
const button = document.querySelector("#counter-button");

title.innerText = "JavaScript";
let count = 0;

button.addEventListener("click", () => {
  count++;
  counter.innerText = count;
});
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Vc,Hc=e((()=>{Vc={name:`jest-react`,title:window.deps.translateString(`templates.starter.jest-react`,`Jest/React Starter`),thumbnail:`assets/templates/jest.svg`,activeEditor:`script`,autotest:!0,markup:{language:`html`,content:``},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
.info {
  color: #404040;
  font-size: 0.9em;
  margin: 2em;
}
`},script:{language:`jsx`,content:`import { useState } from "react";

export const increment = (count) => (count ?? 0) + 1;

function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jest.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(increment(count))}>Click me</button>
      <p className="info">Run tests in the "Tests" panel below.</p>
    </div>
  );
}

export default function App() {
  return <Counter name="Jest with React" />;
}
`},tests:{language:`tsx`,content:`import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { assert } from "chai";
import App, { increment } from "./script";

const renderComponent = () => {
  cleanup();
  render(<App />, {
    container: document.querySelector('#app')
  });
}

beforeEach(renderComponent);

afterAll(renderComponent);

describe("Increment", () => {
  test("should increment count", () => {
    expect(increment(3)).toBe(4);
  });

  test("should return 1 if no count was supplied", () => {
    assert.equal(increment(), 1);
  });
});

describe("Page", () => {
  test("Should display title", async () => {
    expect(screen.getByText("Hello", { exact: false })).toHaveTextContent(
      "Hello, Jest with React!"
    );
  });

  test("Should display logo", async () => {
    expect(document.querySelector('.logo').src).toContain('jest.svg');
  });

  test("Should increment counter on button click", async () => {
    await fireEvent.click(screen.getByText("Click me"));
    await fireEvent.click(screen.getByText("Click me"));
    await fireEvent.click(screen.getByText("Click me"));
    expect(screen.getByText("You clicked", { exact: false })).toHaveTextContent(
      "You clicked 3 times."
    );
  });
});
`},tools:{enabled:`all`,active:`tests`,status:`open`}}})),Uc,Wc=e((()=>{Uc={name:`jest`,title:window.deps.translateString(`templates.starter.jest`,`Jest Starter`),thumbnail:`assets/templates/jest.svg`,autotest:!0,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jest.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
  <p class="info">Run tests in the "Tests" panel below.</p>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
.info {
  color: #404040;
  font-size: 0.9em;
  margin: 2em;
}
`},script:{language:`javascript`,content:`export class Counter {
  count;
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
  }
  getValue() {
    return this.count;
  }
}

const title = document.querySelector("#title");
const count = document.querySelector("#counter");
const button = document.querySelector("#counter-button");

title.innerText = "Jest";
const counter = new Counter();
button.addEventListener(
  "click",
  () => {
    counter.increment();
    count.innerText = counter.getValue();
  },
  false
);
`},tests:{language:`tsx`,content:`import { fireEvent, screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { assert } from "chai";
import { Counter } from "./script";

describe("Counter Class", () => {
  test("Should initialize count with zero", () => {
    const counter = new Counter();
    expect(counter.getValue()).toBe(0);
  });

  test("Should increment", () => {
    const counter = new Counter();
    counter.increment();
    counter.increment();
    counter.increment();
    assert.equal(counter.getValue(), 3);
  });})

describe("Page", () => {
  test("Should display title", async () => {
    expect(screen.getByText("Hello", { exact: false })).toHaveTextContent(
      "Hello, Jest!"
    );
  });

  test("Should display logo", async () => {
    expect(document.querySelector('.logo').src).toContain('jest.svg');
  });

  test("Should increment counter on button click", async () => {
    fireEvent.click(screen.getByText("Click me"));
    fireEvent.click(screen.getByText("Click me"));
    fireEvent.click(screen.getByText("Click me"));
    expect(screen.getByText("You clicked", { exact: false })).toHaveTextContent(
      "You clicked 3 times."
    );
  });
});
`},tools:{enabled:`all`,active:`tests`,status:`open`}}})),Gc,Kc=e((()=>{Gc={name:`jquery`,title:window.deps.translateString(`templates.starter.jquery`,`jQuery Starter`),thumbnail:`assets/templates/jquery.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/jquery.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 300px;
}
`},script:{language:`javascript`,content:`import $ from "jquery";

$("#title").text('jQuery');

let count = 0;
$("#counter-button").click(() => {
  count += 1;
  $("#counter").text(count);
});
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),qc,Jc=e((()=>{qc={name:`julia`,title:window.deps.translateString(`templates.starter.julia`,`Julia Starter`),thumbnail:`assets/templates/julia.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/julia.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.julia.input = "";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.julia.loaded;

    // get initial output
    const initialOutput = livecodes.julia.output;
    update(initialOutput);

    button.innerText = "Click me";
    button.disabled = false;
    button.onclick = async () => {
      // run with new input
      const output = await livecodes.julia.run(window.count);
      update(output);
    };

    function parseOutput(output) {
      return output.replace(/"/g, '').split('\\n');
    }

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = parseOutput(output);

      if (parseInt(count) !== NaN) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
    }
  });
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`julia`,content:`function increment(x)
    if x == ""
        return 0
    else
        num = parse(Int, x)
        num + 1
    end
end

function getTitle()
    "Julia"
end

function formatOutput(args...)
    join(map(x -> string(x), args), "\\n")
end

formatOutput(getTitle(), increment(livecodesInput))
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Yc,Xc=e((()=>{Yc={name:`knockout`,title:window.deps.translateString(`templates.starter.knockout`,`Knockout Starter`),thumbnail:`assets/templates/knockout.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span data-bind="text: title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/knockout.svg" />
  <p>You clicked <span data-bind="text: numberOfClicks">0</span> times.</p>
  <button data-bind="click: registerClick">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`},script:{language:`javascript`,content:`import ko from "knockout";

class ClickCounterViewModel {
  constructor() {
    this.title = 'Knockout';
    this.numberOfClicks = ko.observable(0);

    this.registerClick = function () {
      this.numberOfClicks(this.numberOfClicks() + 1);
    };
  }
}

ko.applyBindings(new ClickCounterViewModel());
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Zc,Qc=e((()=>{Zc={name:`lit`,title:window.deps.translateString(`templates.starter.lit`,`Lit Starter`),thumbnail:`assets/templates/lit.svg`,activeEditor:`script`,markup:{language:`html`,content:`<my-counter name="Lit"></my-counter>
`},style:{language:`css`,content:``},script:{language:`typescript`,content:`import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SignalWatcher, signal } from "@lit-labs/preact-signals";

@customElement("my-counter")
export class SignalExample extends SignalWatcher(LitElement) {
  @property()
  name = "World";

  count = signal(0);

  private _onClick() {
    this.count.value = this.count.value + 1;
  }

  render() {
    return html\`
      <h1>Hello, \${this.name}!</h1>
      <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/lit.svg" />
      <p>You clicked \${this.count.value} times.</p>
      <button @click=\${this._onClick}>Click me</button>
    \`;
  }

  static styles = css\`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    :host, button {
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
  \`;
}
`},customSettings:{typescript:{experimentalDecorators:!0,useDefineForClassFields:!1}}}})),$c,el=e((()=>{$c={name:`livescript`,aliases:[`ls`],title:window.deps.translateString(`templates.starter.livescript`,`LiveScript Starter`),thumbnail:`assets/templates/livescript.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/livescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`livescript`,content:`{ capitalize, join, map, words } = require 'prelude-ls'

title = 'live script'
|> words
|> map capitalize
|> join ''

(document.getElementById \\title).innerText = title

increment = (count) -> -> count += 1
counter = increment 0

counter-element = document.getElementById \\counter
button = document.getElementById \\counter-button

button.addEventListener \\click,
  -> counter-element.innerText = counter!
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),tl,nl=e((()=>{tl={name:`lua`,title:window.deps.translateString(`templates.starter.lua`,`Lua Starter`),thumbnail:`assets/templates/lua.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/lua.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`lua`,content:`js = require "js"
window = js.global
document = window.document

document:getElementById("title").innerHTML = "Lua"

Counter = {count = 0}
function Counter:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end
function Counter:increment ()
  self.count = self.count + 1
end
function Counter:show ()
  local counter_el = document:getElementById("counter")
  counter_el.innerHTML = ("You clicked %d times."):format(self.count)
end

counter = Counter:new(nil)
button = document:querySelector("#counter-button")
button:addEventListener("click", function()
  counter:increment()
  counter:show()
end)

-- check console
time = os.date("*t").hour
if time < 12 then
  print ("Good morning")
elseif time >= 12 and time < 18 then
  print ("Good afternoon")
else
  print ("Good evening")
end
`}}})),rl,il=e((()=>{rl={name:`lua-wasm`,title:window.deps.translateString(`templates.starter.lua-wasm`,`Lua (Wasm) Starter`),thumbnail:`assets/templates/lua.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/lua.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`lua-wasm`,content:`document = window.document
document:getElementById("title").innerHTML = "Lua"

Counter = {count = 0}
function Counter:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end
function Counter:increment ()
  self.count = self.count + 1
end
function Counter:show ()
  local counter_el = document:getElementById("counter")
  counter_el.innerHTML = ("You clicked %d times."):format(self.count)
end

counter = Counter:new(nil)
button = document:querySelector("#counter-button")
button:addEventListener("click", function()
  counter:increment()
  counter:show()
end)

-- check console
time = os.date("*t").hour
if time < 12 then
  print ("Good morning")
elseif time >= 12 and time < 18 then
  print ("Good afternoon")
else
  print ("Good evening")
end
`}}})),al,ol=e((()=>{al={name:`malina`,title:window.deps.translateString(`templates.starter.malina`,`Malina.js Starter`),thumbnail:`assets/templates/malina.svg`,activeEditor:`script`,markup:{language:`html`,content:``},style:{language:`css`,content:``},script:{language:`malina`,content:`<script>
  let title = "Malina.js";
  let counter = 0;
  function increment() {
    counter += 1;
  }
<\/script>

<style>
  .container,
  .container button {
    text-align: center;
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>

<div class="container">
  <h1>Hello, {title}!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/malina.svg" />
  <p>You clicked {counter} times.</p>
  <button @click={increment}>Click me</button>
</div>
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),sl,cl=e((()=>{sl={name:`markdown`,aliases:[`md`],title:window.deps.translateString(`templates.starter.markdown`,`Markdown Starter`),thumbnail:`assets/templates/markdown.svg`,activeEditor:`markup`,markup:{language:`markdown`,content:`# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installation

Make sure you have \`python 3.10+\` and \`pip\` installed. Then run:

\`\`\`bash
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
\`\`\`

Start the development server on \`localhost:8000\`:

\`\`\`bash
python manage.py runserver
\`\`\`

### Usage

Give an example of getting some data out of the system or using it for a little demo

\`\`\`python
from project_name import Client

client = Client(api_key="your-api-key")
resources = client.resources.list(limit=10)

for resource in resources:
    print(f"{resource.id}: {resource.name}")
\`\`\`

You can also use the \`--verbose\` flag for detailed output:

\`\`\`bash
python main.py --verbose
\`\`\`

### Frontend Integration

The API returns \`JSON\` responses that can be consumed by any frontend:

\`\`\`js
const res = await fetch('http://localhost:8000/api/resources');
const data = await res.json();
console.log(data);
\`\`\`

## Overview

A high-level look at how the system fits together. The \`Core API\` handles all business logic.

\`\`\`mermaid
graph TD
    A[Client] -->|Request| B[API Gateway]
    B --> C[Auth Service]
    B --> D[Core API]
    D --> E[(Database)]
    D --> F[(Cache)]
\`\`\`

## Running the tests

Run the full test suite with \`pytest\`:

\`\`\`bash
pytest --cov=project_name tests/
\`\`\`

### End to end tests

These tests verify the full request lifecycle from \`Client\` to \`Database\` and back.

\`\`\`python
def test_create_resource(client):
    response = client.post("/api/resources", json={"name": "Test"})
    assert response.status_code == 201
    assert response.json()["name"] == "Test"
\`\`\`

### Coding style tests

We use \`flake8\` and \`black\` to enforce consistent code style:

\`\`\`bash
flake8 project_name/
black --check project_name/
\`\`\`

## Deployment

Make sure \`Docker\` is installed, then build and run:

\`\`\`bash
docker build -t project-name .
docker run -p 8000:8000 --env-file .env project-name
\`\`\`

## Built With

* [Django](https://www.djangoproject.com/) - The web framework used
* [pip](https://pip.pypa.io/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Your Name** - *Initial work* - [YourGitHub](https://github.com/your-username)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Give credit to anyone whose code was used
* Inspiration
* etc
`},style:{language:`css`,content:`@import "github-markdown-css";

body {
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  padding: 20px;
  margin: 20px !important;
}
`},script:{language:`javascript`,content:`document.body.classList.add('markdown-body');
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),ll,ul=e((()=>{ll={name:`mdx`,title:window.deps.translateString(`templates.starter.mdx`,`MDX Starter`),thumbnail:`assets/templates/mdx.svg`,activeEditor:`markup`,markup:{language:`mdx`,content:`import { Greeting, Counter } from './script';

<Greeting name="MDX" />

![MDX Logo]({{ __livecodes_baseUrl__ }}assets/templates/mdx.svg)

<Counter />
`},style:{language:`css`,content:`body,
body button {
  text-align: center;
  font: 1em sans-serif;
}
img {
  width: 150px;
}
`},script:{language:`jsx`,content:`import { useState } from "react";

export const Greeting = (props) => <h1>Hello, {props.name || "World"}!</h1>;

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`}}})),dl,fl=e((()=>{dl={name:`minizinc`,aliases:[`mzn`],title:window.deps.translateString(`templates.starter.minizinc`,`MiniZinc Starter`),thumbnail:`assets/templates/minizinc.png`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/minizinc.png" title="MiniZinc" />
  <button id="button" onclick="run()">Run</button>
  <div class="solver">
    <label for="solver" class="label">Solver:</label>
    <select id="solvers" hidden></select>
  </div>
  <label for="data" class="label">Data:</label>
  <textarea id="data">flour = 8000;
banana = 11;
sugar = 3000;
butter = 1500;
cocoa = 500;
</textarea>
  <div class="label">Output:</div>
  <pre id="output"></pre>
</div>

<script>
  const btn = document.getElementById('button');
  const menu = document.getElementById('solvers');
  const data = document.getElementById('data');
  const output = document.getElementById('output');

  const defaultSolver = 'Gecode';
  livecodes.minizinc.getSolvers().then((solvers) => {
    solvers.forEach((solver) => {
      const option = document.createElement('option');
      option.innerText = solver.name;
      if (solver.name === defaultSolver) {
        option.selected = true;
      }
      menu.append(option);
    })
    menu.hidden = false;
  });

  async function run() {

    btn.disabled = true;
    btn.innerText = 'Running...';
    output.innerHTML = 'Loading...';
    output.classList.remove('error');

    const config = {
      jsonOutput: false,
      options: { solver: menu.value || defaultSolver },
    };

    const result = await livecodes.minizinc.run({ dzn: data.value, config });

    if (result.status === 'ERROR') {
      output.classList.add('error');
      output.innerHTML = result.errors.map((err) => err.message).join('<br>');
    } else {
      output.innerHTML =
        result.solution?.output?.default ??
        result.solution?.output?.dzn ??
        JSON.stringify(
          result.solution?.output?.json ?? result.solution?.output ?? '',
          null,
          2,
        );
    }

    btn.disabled = false;
    btn.innerText = 'Run';
  }

  run();
<\/script>
`},style:{language:`css`,content:`* {
  box-sizing: border-box;
}

.container {
  text-align: center;
  font: 1em sans-serif;
  max-width: 900px;
  margin: 1em auto;
  padding: 0 2em;
}

.logo {
  width: 100px;
}

.label {
  display: block;
  text-align: left;
  margin: 0.5em 0;
  font-weight: bold;
}

#button {
  display: block;
  margin: 1em auto;
  width: 10em;
  height: 2em;
  background-color: #1491EB;
  border: 0;
  border-radius: 3px;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
}

#button:hover {
  background-color: #1180cf;
}

#button:disabled {
  background-color: #6a9bbe;
}

.solver {
  display: flex;
  gap: 1em;
}

#data {
  height: 9em;
  resize: vertical;
}

#data, #output {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #3d3d3d;
  margin: 1em auto;
  padding: 0.8em;
  text-align: left;
  width: 100%;
}

#output.error {
  color: red;
}
`},script:{language:`minizinc`,content:String.raw`
% from https://docs.minizinc.dev/en/stable/part_2_tutorial.html
% Baking cakes for the school fete (with data file)

int: flour;  % no. grams of flour available
int: banana;  % no. of bananas available
int: sugar;  % no. grams of sugar available
int: butter;  % no. grams of butter available
int: cocoa;  % no. grams of cocoa available

constraint assert(flour >= 0,
  "Invalid datafile: " ++ "Amount of flour should be non-negative");
constraint assert(banana >= 0,
  "Invalid datafile: " ++ "Amount of banana should be non-negative");
constraint assert(sugar >= 0,
  "Invalid datafile: " ++ "Amount of sugar should be non-negative");
constraint assert(butter >= 0,
  "Invalid datafile: " ++ "Amount of butter should be non-negative");
constraint assert(cocoa >= 0,
  "Invalid datafile: " ++ "Amount of cocoa should be non-negative");

var 0..100: b;  % no. of banana cakes
var 0..100: c;  % no. of chocolate cakes

% flour
constraint 250 * b + 200 * c <= flour;
% bananas
constraint 2 * b <= banana;
% sugar
constraint 75 * b + 150 * c <= sugar;
% butter
constraint 100 * b + 150 * c <= butter;
% cocoa
constraint 75 * c <= cocoa;

% maximize our profit
solve maximize 400 * b + 450 * c;

output [
  "no. of banana cakes = \(b)\n",
  "no. of chocolate cakes = \(c)\n"];
`.trimStart()}}})),pl,ml=e((()=>{pl={name:`ocaml`,title:window.deps.translateString(`templates.starter.ocaml`,`Ocaml Starter`),thumbnail:`assets/templates/ocaml.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="app">Loading...</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 250px;
}
`},script:{language:`ocaml`,content:`module App =
  struct
    let make ~name  =
      let title = "Hello, " ^ name ^ "!" in

      let (count,setCount) = React.useState ((fun _ -> 0) [@bs]) in

      let times =
        match count with
        | 1 -> "once"
        | 2 -> "twice"
        | n -> (string_of_int n) ^ " times" in

      ((div ~className: "container"
          ~children:[((h1 ~children: [React.string title] ()) [@JSX]);
                    ((img ~className: "logo"
                        ~alt: "logo"
                        ~src: "{{ __livecodes_baseUrl__ }}assets/templates/ocaml.svg"
                        ~children:[] ()) [@JSX]);
                    ((p
                        ~children:[React.string ("You clicked "
                                                ^ times)] ()) [@JSX]);
                    ((button
                        ~onClick:((fun _ -> setCount ((fun _ -> count + 1) [@bs])) [@bs])
                        ~children:[React.string "Click me"] ())
                    [@JSX])] ()) [@JSX]) [@@react.component]
  end

let _ =
  match ReactDOM.querySelector "#app" with
  | ((Some (app)) [@explicit_arity]) ->
      ReactDOM.render
        ((App.createElement
            ~name: "OCaml"
            ~children:[] ()) [@JSX]) app
  | None  -> ()

let _ = print_endline "Hello, OCaml!"
`},customSettings:{imports:{react:`https://esm.sh/react@18.3.1`,"react/":`https://esm.sh/react@18.3.1/`,"react-dom":`https://esm.sh/react-dom@18.3.1`}}}})),hl,gl=e((()=>{hl={name:`perl`,aliases:[`pl`],title:window.deps.translateString(`templates.starter.perl`,`Perl Starter`),thumbnail:`assets/templates/perl.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/perl.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`perl`,content:`use strict;

my $title = 'Perl';
JS::inline('document.getElementById("title").innerHTML') = $title;

{
package Counter;
  sub new {
    my $class = shift;
    my $self = {count => 0};
    return bless $self, $class;
  }
  sub count {
    my $self = shift;
    return $self->{count};
  }
  sub increment {
    my $self = shift;
    $self->{count}++;
  }
}

my $counter = Counter->new;

sub onClick {
    $counter->increment;
    JS::inline('document.getElementById("counter").innerHTML') =
    $counter->count;
}

JS::inline('document.getElementById("counter-button").onclick') = \\&onClick;

# check console
my ($sec,$min,$hour) = localtime(time);
if ($hour < 12) {
  print "Good morning";
} elsif ($hour >= 12 && $hour < 18) {
  print "Good afternoon";
} else {
  print "Good evening";
}
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),_l,vl=e((()=>{_l={name:`phaser`,title:window.deps.translateString(`templates.starter.phaser`,`Phaser Starter`),thumbnail:`assets/templates/phaser.png`,activeEditor:`script`,markup:{language:`html`,content:`<div id="app">
  <div id="game-container"></div>
</div>
`},style:{language:`css`,content:`body {
  margin: 0;
  padding: 0;
  color: rgba(255, 255, 255, 0.87);
  background-color: #000000;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
`},script:{language:`javascript`,content:`// based on https://github.com/phaserjs/template-vite
// and https://phaser.io/sandbox/XyqPcjNr

import Phaser from "phaser";

// learn about adding assets in livecodes
// https://livecodes.io/docs/features/assets

class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    this.load.image("background", "https://cdn.jsdelivr.net/gh/phaserjs/template-vite@main/public/assets/bg.png");
  }

  create() {
    this.scene.start("Preloader");
  }
}

class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}

class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(512, 384, "background");

    this.add.image(512, 300, "logo");

    this.add
      .text(512, 460, "Main Menu", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    const sky = this.add.image(512, 384, "sky");
    sky.setScale(1.3);

    const particles = this.add.particles(0, 0, "red", {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });
  }
}

class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.cameras.main.setBackgroundColor(0xff0000);

    this.add.image(512, 384, "background").setAlpha(0.5);

    this.add
      .text(512, 384, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
/**
 * @type {Phaser.Types.Core.GameConfig}
 */
const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
    physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [Boot, Preloader, MainMenu, Game, GameOver],
  autoFocus: false,
};

export default new Phaser.Game(config);
`}}})),yl,bl=e((()=>{yl={name:`php`,title:window.deps.translateString(`templates.starter.php`,`PHP Starter`),thumbnail:`assets/templates/php.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">world</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/php.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`php`,content:`<?php
$title = 'PHP';
$document->getElementById('title')->innerText = $title;

$count = 0;

$document
  ->getElementById('counter-button')
  ->addEventListener('click', function () use (&$count, $document) {
    $count += 1;
    $document->getElementById('counter')->innerText = $count;
    echo "count: $count";
  });
`}}})),xl,Sl=e((()=>{xl={name:`php-wasm`,title:window.deps.translateString(`templates.starter.php-wasm`,`PHP (Wasm) Starter`),thumbnail:`assets/templates/php.svg`,activeEditor:`script`,markup:{language:`html`,content:`<p>
  <h1>Hello, <span id="title">world</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/php.svg" />
</p>
`},style:{language:`css`,content:`body {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`php-wasm`,content:`<?php
$title = "PHP";
vrzno_eval('document.getElementById("title").innerText = "' . $title . '"');

$time = date("H");
if ($time < 12) {
  $greeting = "Good morning!";
} elseif ($time < 17) {
  $greeting = "Good afternoon!";
} elseif ($time < 20) {
  $greeting = "Good evening!";
} else {
  $greeting = "Good night!";
}

$date = date("l jS \\of F, Y");

echo $greeting . "<br>Today is:<br>" . $date;
`}}})),Cl,wl=e((()=>{Cl={name:`postgresql`,aliases:[`pg`,`postgres`,`pgsql`],title:window.deps.translateString(`templates.starter.postgresql`,`PostgreSQL Starter`),thumbnail:`assets/templates/postgresql.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="output">
  <details open>
    <summary>Tables</summary>
    <div id="tables"></div>
  </details>
  <details open>
    <summary>Result</summary>
    <pre><code id="result"></code></pre>
  </details>
  <details open>
    <summary>Result as objects</summary>
    <pre><code id="obj-result"></code></pre>
  </details>
</div>

<script>
  livecodes.sql.render('#tables');

  livecodes.sql.getResult().then((result) => {
    console.log(result)
    document.querySelector('#result').innerHTML =  JSON.stringify(result, null, 2);
  }).catch(console.error);


  livecodes.sql.getResultAsObjects().then((results) => {
    results.forEach(console.table);
    document.querySelector('#obj-result').innerHTML = JSON.stringify(results, null, 2);
  }).catch(console.error);
<\/script>
`},style:{language:`css`,content:`#output {
  color: #3d3d3d;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

#output summary {
  cursor: pointer;
}

#output table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-radius: 4px;
  border-spacing: 0;
  font-size: 0.9em;
  margin: 1em;
  width: 95%;
}

#output th,
#output td {
  padding: 0.5em;
}

#output tr:nth-child(odd) {
  background-color: #f2f2f2;
}

#output pre {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  margin: 1em;
  min-width: 95%;
  padding: 1em;
}
`},script:{language:`postgresql`,content:`-- based on https://stackoverflow.com/q/7745609

CREATE TABLE IF NOT EXISTS quotes (
  id int NOT NULL,
  rev int NOT NULL,
  quote varchar(200) NOT NULL,
  PRIMARY KEY (id, rev)
);

INSERT INTO quotes (id, rev, quote) VALUES
  ('1', '1', 'Simplicity is the ultimate sophistication. – Leonardo da Vinci'),
  ('2', '1', 'Change the world by being yourself. – Amy Poehler'),
  ('1', '2', 'Every moment is a fresh beginning. – T.S Eliot'),
  ('1', '3', 'Whatever you do, do it well. – Walt Disney');

SELECT a.id, a.rev, a.quote
FROM quotes a
INNER JOIN (
    SELECT id, MAX(rev) rev
    FROM quotes
    GROUP BY id
) b ON a.id = b.id AND a.rev = b.rev;

SELECT a.*
FROM quotes a
LEFT OUTER JOIN quotes b
    ON a.id = b.id AND a.rev < b.rev
WHERE b.id IS NULL;

SELECT a.id, a.rev, a.quote
  FROM (SELECT id, rev, quote,
               ROW_NUMBER() OVER (PARTITION BY id ORDER BY rev DESC) rank
          FROM quotes) a
  WHERE a.rank = 1;
`}}})),Tl,El=e((()=>{Tl={name:`preact`,title:window.deps.translateString(`templates.starter.preact`,`Preact Starter`),thumbnail:`assets/templates/preact.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="app"></div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`jsx`,content:`/** @jsx h */
import { h, render } from 'preact';
import { useSignal } from "@preact/signals";

function App(props) {
  const count = useSignal(0);
  return (
    <div class="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/preact.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => count.value++}>Click me</button>
    </div>
  );
}

render(<App name="Preact" />, document.body);
`}}})),Dl,Ol=e((()=>{Dl={name:`prolog`,title:window.deps.translateString(`templates.starter.prolog`,`Prolog Starter`),thumbnail:`assets/templates/tau-prolog.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/tau-prolog.svg" title="Tau Prolog" />
	<form id="query-form" onsubmit="runQuery(); return false;">
		<input type="text" id="query" value="father(X, jack)." placeholder="Enter a query" />
		<input type="submit" value="Run query" id="button" />
		<pre id="result"></pre>
	</form>
</div>

<script>
  async function getTitle() {
    const session = await livecodes.prolog.createSession();
    session.query('title(X).');
    session.answer(function(answer) {
      document.getElementById("title").innerText = answer.lookup('X');
    });
  }

  async function runQuery() {
    const query = document.getElementById("query").value;
    const result = document.getElementById("result");

    const session = await livecodes.prolog.createSession({limit: 1000});
    session.promiseQuery(query).then(async () => {
      result.innerText = "";
      for await (let answer of session.promiseAnswers()) {
        if(pl.type.is_substitution(answer)) {
          console.log(session.format_answer(answer));
          result.innerText += session.format_answer(answer) + '\\n';
        }
      }
      if (result.innerText == "") {
        result.innerText = "false.";
      }
      result.classList.remove('error');
    }).catch((err) => {
      result.innerText = err;
      result.classList.add('error');
    })
  }

  getTitle();
  runQuery();
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
#query {
  width: 20em;
}
#result {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  color: #3d3d3d;
  margin: 1em;
  padding: 1em;
  text-align: left;
}
#result.error {
  color: red;
}`},script:{language:`prolog`,content:`title('Prolog').

male(john).
male(oliver).
male(ali).
male(james).
male(jack).
male(harry).
female(helen).
female(sophie).
female(mary).
female(sue).

parent(john, mary).
parent(john, sue).
parent(helen, mary).
parent(helen, sue).
parent(oliver, james).
parent(sophie, james).
parent(mary, jack).
parent(ali, jack).
parent(sue, harry).
parent(james, harry).

father(X, Y):- male(X),
    parent(X, Y).

mother(X, Y):- female(X),
    parent(X, Y).

grandfather(X, Y):- male(X),
    parent(X, Z),
    parent(Z, Y).

grandmother(X, Y):- female(X),
    parent(X, Z),
    parent(Z, Y).

sister(X, Y):- female(X),
    father(F, Y),
    father(F, X),
    X \\= Y.
sister(X, Y):- female(X),
    mother(M, Y),
    mother(M, X),
    X \\= Y.

brother(X, Y):- male(X),
    father(F, Y),
    father(F, X),
    X \\= Y.
brother(X, Y):- male(X),
    mother(M, Y),
    mother(M, X),
    X \\= Y.

uncle(X, Y):- parent(Z, Y),
    brother(Z, X).

aunt(X, Y):- parent(Z, Y),
    sister(Z, X).

ancestor(X, Y):- parent(X, Y).
ancestor(X, Y):- parent(X, Z),
    ancestor(Z, Y).
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),kl,Al=e((()=>{kl={name:`python`,aliases:[`py`],title:window.deps.translateString(`templates.starter.python`,`Python Starter`),thumbnail:`assets/templates/python.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1 id="header">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/python.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`python`,content:`from browser import document
import time

title = 'Python'
document['header'].html = f"Hello, {title}!"

counter = 0

def increment(ev):
    global counter
    counter += 1
    document['counter'].html = str(counter)

document["counter-button"].bind("click", increment)

# check console
current_time = int(time.strftime('%H'))
if current_time < 12 :
      print('Good morning')
elif 12 <= current_time < 18:
      print('Good afternoon')
else:
      print('Good evening')
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),jl,Ml=e((()=>{jl={name:`python-wasm`,aliases:[`pyodide`,`py-wasm`],title:window.deps.translateString(`templates.starter.python-wasm`,`Python (Wasm) Starter`),thumbnail:`assets/templates/python.svg`,activeEditor:`script`,markup:{language:`html`,content:`<h1 id="title">Hello, World!</h1>
<div id="loading">Loading...</div>
<div id="plots"></div>
`},style:{language:`css`,content:`h1 {
  text-align: center;
}
`},script:{language:`python-wasm`,content:`from js import document, XMLHttpRequest
import pandas as pd
import matplotlib.pyplot as plt
from io import StringIO


def load_data(url):
  req = XMLHttpRequest.new()
  req.open("GET", url, False)
  req.send()
  res = req.response
  return StringIO(f"""{res}""")


def prepare_data(dataframe):
  def add_species_id(x):
    if x == "setosa":
      return 0
    elif x == "versicolor":
      return 1
    return 2

  df = dataframe.copy()
  df["species_id"] = df["species"].apply(add_species_id)
  return df


data = load_data("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv")
df = pd.read_csv(data)
df = prepare_data(df)

formatter = plt.FuncFormatter(lambda i, *args: df["species"].unique()[int(i)])
fig = plt.figure(figsize=(6, 4))
plt.scatter(df[df.columns[0]], df[df.columns[1]], c=df["species_id"])
plt.colorbar(ticks=[0, 1, 2], format=formatter)
plt.xlabel(df.columns[0])
plt.ylabel(df.columns[1])
plt.title("Iris dataset")
plt.tight_layout()

# render plots in a specific DOM element
# plots = document.querySelector("#plots")
# document.pyodideMplTarget = plots

plt.show()

title = document.getElementById("title")
name = "Python"
title.innerHTML = f"Hello, {name}!"

loading = document.getElementById("loading")
loading.innerHTML = ""

# avoid leaving figures open
plt.close("all")
`}}})),Nl,Pl=e((()=>{Nl={name:`r`,aliases:[`r-lang`,`rlang`],title:window.deps.translateString(`templates.starter.r`,`R Starter`),thumbnail:`assets/templates/r.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="output">Loading...</div>

<script>
  // livecodes.r.config = {
  //   container: '#output',
  //   canvasHeight: 309,
  //   canvasWidth: 500,
  //   canvasPointSize: 12,
  //   canvasBackground: 'transparent',
  // };
<\/script>
`},style:{language:`css`,content:``},script:{language:`r`,content:`head(iris)

PW <- iris$Petal.Width
PL <- iris$Petal.Length
species <- iris$Species
speciesID <- as.numeric(iris$Species)

fit <- lm(PW ~ PL)
summary(fit)

plot(PL, PW,
     pch = speciesID,
     col = speciesID,
     main = "Petal Width vs Length",
     xlab = "Petal Length",
     ylab = "Petal Width")
legend("topleft",
       levels(species),
       pch = 1:3,
       col = 1:3)


## This will take some time to load the packages

# library(dplyr)
# library(ggplot2)

# head(diamonds)

# diamonds %>%
#   filter(depth > 60) %>%
#   group_by(cut) %>%
#   summarize(mean_price = mean(price)) %>%
#   ggplot(aes(x = cut, y = mean_price, fill = cut)) +
#       geom_bar(stat = "identity")
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Fl,Il=e((()=>{Fl={name:`react-native`,title:window.deps.translateString(`templates.starter.react-native`,`React Native Starter`),thumbnail:`assets/templates/react.svg`,activeEditor:`script`,markup:{language:`html`,content:``},style:{language:`css`,content:``},script:{language:`react-native`,content:`import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

const logoUri = \`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" /><circle cx="420.9" cy="296.5" r="45.7" /><path d="M520.5 78.1z" /></g></svg>\`;

function Link(props) {
  return (
    <Text
      {...props}
      accessibilityRole="link"
      style={StyleSheet.compose(styles.link, props.style)}
    />
  );
}

function Counter(props) {
  const [count, setCount] = useState(props.initialCount);
  return (
    <View>
      <Text style={styles.text}>You clicked {count} times.</Text>
      <Button onPress={() => setCount(count + 1)} title="Click me" />
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="React logo"
          source={{ uri: logoUri }}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>React Native for Web</Text>
      </View>
      <Text style={styles.text}>
        This is an example app built with{" "}
        <Link href="https://necolas.github.io/react-native-web/">
          React Native for Web
        </Link>
      </Text>
      <Counter initialCount={0}></Counter>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    marginVertical: 20,
    maxWidth: 500,
  },
  logo: {
    height: 150,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "0.5em",
    textAlign: "center",
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "0.5em",
    textAlign: "center",
  },
  link: {
    color: "#1B95E0",
  },
});
`}}})),Ll,Rl=e((()=>{Ll={name:`react`,title:window.deps.translateString(`templates.starter.react`,`React Starter`),thumbnail:`assets/templates/react.svg`,activeEditor:`script`,markup:{language:`html`,content:``},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`react`,content:`import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/react.svg" />
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default function App() {
  return <Counter name="React" />;
}
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),zl,Bl=e((()=>{zl={name:`reason`,title:window.deps.translateString(`templates.starter.reason`,`Reason Starter`),thumbnail:`assets/templates/reason.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="app">Loading...</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`reason`,content:`module App = {
  [@react.component]
  let make = (~name) => {
    let title = "Hello, " ++ name ++ "!"

    let (count, setCount) = React.useState(() => 0);

    let times = switch (count) {
    | 1 => "once"
    | 2 => "twice"
    | n => string_of_int(n) ++ " times"
    };

    <div className="container">
      <h1> {React.string(title)} </h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/reason.svg" />
      <p> {React.string("You clicked " ++ times)} </p>
      <button onClick={_ => setCount(_ => count + 1)}>
        {React.string("Click me")}
      </button>
    </div>
  };
};

switch (ReactDOM.querySelector("#app")) {
| Some(app) => ReactDOM.render(<App name="ReasonReact" />, app)
| None => ()
}

Js.log("Hello, Reason!");
`},customSettings:{imports:{react:`https://esm.sh/react@18.3.1`,"react/":`https://esm.sh/react@18.3.1/`,"react-dom":`https://esm.sh/react-dom@18.3.1`}}}})),Vl,Hl=e((()=>{Vl={name:`rescript`,title:window.deps.translateString(`templates.starter.rescript`,`ReScript Starter`),thumbnail:`assets/templates/rescript.png`,activeEditor:`script`,markup:{language:`html`,content:`<div id="app">Loading...</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`rescript`,content:`// import npm modules
@module("canvas-confetti") external confetti: () => unit = "default"

confetti()

module App = {
  @react.component
  let make = (~name: string) => {
    let title = "Hello, " ++ name ++ "!"

    let (count, setCount) = React.useState(_ => 0)
    let onClick = _evt => {
      if (mod(count + 1, 5) == 0) {
        confetti()
      }
      setCount(_prev => _prev + 1)
    }

    let times = switch count {
    | 1 => "once"
    | 2 => "twice"
    | n => String.make(n) ++ " times"
    }

    <div className="container">
      <h1> {title->React.string} </h1>
      <img className="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/rescript.png" />
      <p> {React.string("You clicked " ++ times)} </p>
      <button onClick> {React.string("Click me")} </button>
    </div>
  }
}

switch ReactDOM.querySelector("#app") {
| Some(rootElement) => {
    let root = ReactDOM.Client.createRoot(rootElement)
    ReactDOM.Client.Root.render(root, <App name="ReScript React" />)
  }
| None => () // do nothing
}

Console.log("Hello, ReScript!")
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Ul,Wl=e((()=>{Ul={name:`riot`,title:window.deps.translateString(`templates.starter.riot`,`Riot.js Starter`),thumbnail:`assets/templates/riot.svg`,activeEditor:`script`,markup:{language:`html`,content:`<counter title="Riot.js"></counter>

<script>
  livecodes.templateData = {
    url: 'https://riot.js.org/'
  }
<\/script>
`},style:{language:`css`,content:``},script:{language:`riot`,content:`<counter>
  <div class="container">
    <h1>Hello, { props.title }!</h1>
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/riot.svg" />
    <p>You clicked { state.count } times.</p>
    <button onclick="{ increment }">Click me</button>
    <div class="footer">
      <a href="{ props.url }" target="_blank">Riot.js Website</a>
    </div>
  </div>

  <style>
    .container,
    .container button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
    .footer {
      font: 0.8em sans-serif;
      margin: 1.5em;
    }
  </style>

  <script>
    export default {
      onBeforeMount(props, state) {
        this.state = {
          count: 0,
        };
      },
      increment(e) {
        e.preventDefault();
        this.update({
          count: this.state.count + 1,
        });
      },
    };
  <\/script>
</counter>
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Gl,Kl=e((()=>{Gl={name:`ruby`,aliases:[`rb`],title:window.deps.translateString(`templates.starter.ruby`,`Ruby Starter`),thumbnail:`assets/templates/ruby.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/ruby.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`ruby`,content:`require "date"
require "native"

title = "Ruby"
$$.document.querySelector("#title").innerHTML = title

$counter = 0
$counter_element = $$.document.querySelector "#counter"

def increment
    $counter += 1
    $counter_element.innerHTML = "You clicked %d times." % [$counter]
end

button = $$.document.querySelector "button"
button.onclick = -> {increment}

# check console
current_time = Time.now.hour
msg = Date.today.strftime "happy %A!"
if current_time < 12
    puts "Good morning, " + msg
elsif current_time < 18
    puts "Good afternoon, " + msg
else
    puts "Good evening, " + msg
end
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),ql,Jl=e((()=>{ql={name:`ruby-wasm`,aliases:[`rb-wasm`],title:window.deps.translateString(`templates.starter.ruby-wasm`,`Ruby (Wasm) Starter`),thumbnail:`assets/templates/ruby.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/ruby.svg" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`ruby-wasm`,content:`require "js"
require "date"

document = JS.global[:document]

title = "Ruby"
document.querySelector("#title")[:innerHTML] = title

counter = 0

button = document.querySelector "button"
button.addEventListener "click" do |e|
    counter += 1
    counter_element = document.querySelector "#counter"
    counter_element[:innerHTML] = "You clicked %d times." % [counter]
end

# check console
current_time = Time.now.hour
msg = Date.today.strftime "happy %A!"
if current_time < 12
    puts "Good morning, " + msg
elsif current_time < 18
    puts "Good afternoon, " + msg
else
    puts "Good evening, " + msg
end
`}}})),Yl,Xl=e((()=>{Yl={name:`scheme`,title:window.deps.translateString(`templates.starter.scheme`,`Scheme Starter`),thumbnail:`assets/templates/scheme.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/scheme.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`scheme`,content:`(let ((title "Scheme"))
  (set-content! "#title" title))

(let ((counter 0))
  (add-handler! "#counter-button" "click"
    (lambda (ev)
      (set! counter (+ counter 1))
      (set-content! "#counter" (number->string counter)))))

; check console
(let ((time-now (date-hour (current-date))))
  (console-log
    (cond ((< time-now 12) "Good morning")
          ((< time-now 18) "Good afternoon")
          (else "Good evening"))))
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),Q,Zl,Ql=e((()=>{Q=`https://cdn.jsdelivr.net/npm/@hatemhosny/shadcdn@0.0.14/build/`,Zl={name:`shadcn-ui`,title:window.deps.translateString(`templates.starter.shadcnui`,`shadcn/ui Starter`),thumbnail:`assets/templates/shadcn-ui.svg`,activeEditor:`script`,markup:{language:`html`,content:`
<link rel="stylesheet" href="${Q}shadcdn.css">
<link rel="stylesheet" href="${Q}themes.css">
`.trimStart()},style:{language:`css`,content:`@tailwind base;
@tailwind components;
@tailwind utilities;


@layer base {
  :root .custom {
    --radius: 0.5rem;
  }
}
`},script:{language:`react-tsx`,content:`// from https://ui.shadcn.com/blocks/login#login-03
import { GalleryVerticalEnd } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  return (
    // \`dark\` for dark mode
    // themes: zinc, slate, stone, gray, neutral, red, rose, orange, green, blue, yellow, violet
    <div className="theme-violet custom">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="#" className="flex items-center gap-2 self-center font-medium text-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
`},processors:[`tailwindcss`],imports:{},types:{},customSettings:{imports:{react:`https://esm.sh/react`,"react/":`https://esm.sh/react/`,"react-dom":`https://esm.sh/react-dom`,"react-dom/":`https://esm.sh/react-dom/`,"@":`${Q}shadcdn.js`,"@/lib/utils":`${Q}shadcdn.js`,"@/components/ui/accordion":`${Q}shadcdn.js`,"@/components/ui/alert-dialog":`${Q}shadcdn.js`,"@/components/ui/alert":`${Q}shadcdn.js`,"@/components/ui/aspect-ratio":`${Q}shadcdn.js`,"@/components/ui/avatar":`${Q}shadcdn.js`,"@/components/ui/badge":`${Q}shadcdn.js`,"@/components/ui/button":`${Q}shadcdn.js`,"@/components/ui/calendar":`${Q}shadcdn.js`,"@/components/ui/card":`${Q}shadcdn.js`,"@/components/ui/checkbox":`${Q}shadcdn.js`,"@/components/ui/collapsible":`${Q}shadcdn.js`,"@/components/ui/command":`${Q}shadcdn.js`,"@/components/ui/context-menu":`${Q}shadcdn.js`,"@/components/ui/dialog":`${Q}shadcdn.js`,"@/components/ui/dropdown-menu":`${Q}shadcdn.js`,"@/components/ui/form":`${Q}shadcdn.js`,"@/components/ui/hover-card":`${Q}shadcdn.js`,"@/components/ui/input":`${Q}shadcdn.js`,"@/components/ui/label":`${Q}shadcdn.js`,"@/components/ui/menubar":`${Q}shadcdn.js`,"@/components/ui/navigation-menu":`${Q}shadcdn.js`,"@/components/ui/popover":`${Q}shadcdn.js`,"@/components/ui/progress":`${Q}shadcdn.js`,"@/components/ui/radio-group":`${Q}shadcdn.js`,"@/components/ui/scroll-area":`${Q}shadcdn.js`,"@/components/ui/select":`${Q}shadcdn.js`,"@/components/ui/separator":`${Q}shadcdn.js`,"@/components/ui/sheet":`${Q}shadcdn.js`,"@/components/ui/skeleton":`${Q}shadcdn.js`,"@/components/ui/slider":`${Q}shadcdn.js`,"@/components/ui/switch":`${Q}shadcdn.js`,"@/components/ui/table":`${Q}shadcdn.js`,"@/components/ui/tabs":`${Q}shadcdn.js`,"@/components/ui/textarea":`${Q}shadcdn.js`,"@/components/ui/toast":`${Q}shadcdn.js`,"@/components/ui/toaster":`${Q}shadcdn.js`,"@/components/ui/toggle":`${Q}shadcdn.js`,"@/components/ui/tooltip":`${Q}shadcdn.js`,"@/components/ui/use-toast":`${Q}shadcdn.js`,"@/components/ui/resizable":`${Q}shadcdn.js`,"@/components/ui/input-otp":`${Q}shadcdn.js`,"@/components/ui/breadcrumb":`${Q}shadcdn.js`,"@/components/ui/toggle-group":`${Q}shadcdn.js`,"@/components/ui/sonner":`${Q}shadcdn.js`,"@/components/ui/pagination":`${Q}shadcdn.js`,"@/components/ui/drawer":`${Q}shadcdn.js`,"@/components/ui/carousel":`${Q}shadcdn.js`,"@/components/ui/sidebar":`${Q}shadcdn.js`,"@/components/ui/chart":`${Q}shadcdn.js`},types:{"@/components":`${Q}shadcdn.d.ts`,"@/utils":`${Q}shadcdn.d.ts`}}}})),$l,eu=e((()=>{$l={name:`solid`,title:window.deps.translateString(`templates.starter.solid`,`Solid Starter`),thumbnail:`assets/templates/solid.svg`,activeEditor:`script`,markup:{language:`html`,content:``},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`solid.tsx`,content:`import { createSignal } from "solid-js";

function Counter(props: { name: string }) {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);
  return (
    <div class="container">
      <h1>Hello, {props.name}!</h1>
      <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/solid.svg" />
      <p>You clicked {count()} times.</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}

export default function App() {
  return <Counter name="Solid" />;
}
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),tu,nu=e((()=>{tu={name:`sql`,title:window.deps.translateString(`templates.starter.sql`,`SQL Starter`),thumbnail:`assets/templates/sqlite.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="output">
  <details open>
    <summary>Tables</summary>
    <div id="tables"></div>
  </details>
  <details open>
    <summary>Result</summary>
    <pre><code id="result"></code></pre>
  </details>
  <details open>
    <summary>Result as objects</summary>
    <pre><code id="obj-result"></code></pre>
  </details>
</div>

<script>
  livecodes.sql.render('#tables');

  livecodes.sql.getResult().then((result) => {
    console.log(result)
    document.querySelector('#result').innerHTML =  JSON.stringify(result, null, 2);
  }).catch(console.error);


  livecodes.sql.getResultAsObjects().then((results) => {
    results.forEach(console.table);
    document.querySelector('#obj-result').innerHTML = JSON.stringify(results, null, 2);
  }).catch(console.error);
<\/script>
`},style:{language:`css`,content:`#output {
  color: #3d3d3d;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

#output summary {
  cursor: pointer;
}

#output table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-radius: 4px;
  border-spacing: 0;
  font-size: 0.9em;
  margin: 1em;
  width: 95%;
}

#output th,
#output td {
  padding: 0.5em;
}

#output tr:nth-child(odd) {
  background-color: #f2f2f2;
}

#output pre {
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  margin: 1em;
  min-width: 95%;
  padding: 1em;
}
`},script:{language:`sql`,content:`-- based on https://stackoverflow.com/q/7745609

CREATE TABLE IF NOT EXISTS quotes (
  id int NOT NULL,
  rev int NOT NULL,
  quote varchar(200) NOT NULL,
  PRIMARY KEY (id, rev)
);

INSERT INTO quotes (id, rev, quote) VALUES
  ('1', '1', 'Simplicity is the ultimate sophistication. – Leonardo da Vinci'),
  ('2', '1', 'Change the world by being yourself. – Amy Poehler'),
  ('1', '2', 'Every moment is a fresh beginning. – T.S Eliot'),
  ('1', '3', 'Whatever you do, do it well. – Walt Disney');

SELECT a.id, a.rev, a.quote
FROM quotes a
INNER JOIN (
    SELECT id, MAX(rev) rev
    FROM quotes
    GROUP BY id
) b ON a.id = b.id AND a.rev = b.rev;

SELECT a.*
FROM quotes a
LEFT OUTER JOIN quotes b
    ON a.id = b.id AND a.rev < b.rev
WHERE b.id IS NULL;

SELECT a.id, a.rev, a.quote
  FROM (SELECT id, rev, quote,
               ROW_NUMBER() OVER (PARTITION BY id ORDER BY rev DESC) rank
          FROM quotes) a
  WHERE a.rank = 1;
`}}})),ru,iu=e((()=>{ru={name:`stencil`,title:window.deps.translateString(`templates.starter.stencil`,`Stencil Starter`),thumbnail:`assets/templates/stencil.png`,activeEditor:`script`,markup:{language:`html`,content:`<my-app title="Stencil"></my-app>
`},style:{language:`css`,content:``},script:{language:`stencil`,content:`import { Component, Prop, h, State } from "@stencil/core";

@Component({
  tag: "my-app",
  styles: \`
    my-app,
    button {
      text-align: center;
      font: 1em sans-serif;
    }
    .logo {
      width: 150px;
    }
  \`,
})
export class App {
  @Prop() title: string;
  @State() count = 0;

  increment = () => {
    this.count += 1;
  };

  render() {
    return (
      <div class="container">
        <h1>Hello, {this.title}!</h1>
        <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/stencil.png" />
        <p>You clicked {this.count} times.</p>
        <button onClick={this.increment}>Click me</button>
      </div>
    );
  }
}
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),au,ou=e((()=>{au={name:`svelte`,title:window.deps.translateString(`templates.starter.svelte`,`Svelte Starter`),thumbnail:`assets/templates/svelte.svg`,activeEditor:`script`,markup:{language:`svelte`,content:`<script>
import Counter from "./Component.svelte";
<\/script>

<Counter title="Svelte" />
`},style:{language:`css`,content:``},script:{language:`svelte`,content:`<script>
  let { title = "World" } = $props();
  let counter = $state(0);
  function increment() {
    counter += 1;
  }
<\/script>

<style>
  .container,
  .container button {
    text-align: center;
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>

<div class="container">
  <h1>Hello, {title}!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/svelte.svg" />
  <p>You clicked {counter} times.</p>
  <button on:click={increment}>Click me</button>
</div>
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),su,cu=e((()=>{su={name:`tailwindcss`,aliases:[`tw`,`tailwind`],title:window.deps.translateString(`templates.starter.tailwindcss`,`Tailwind CSS Starter`),thumbnail:`assets/templates/tailwindcss.svg`,activeEditor:`markup`,markup:{language:`html`,content:`<div class="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10">
  <div class="col-start-3 row-start-3 flex max-w-lg flex-col bg-gray-100 p-2 dark:bg-white/10">
    <div class="rounded-xl bg-white p-10 text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300">
      <img src="{{ __livecodes_baseUrl__ }}assets/templates/tailwind-play.svg" class="mb-11.5 h-6 dark:hidden" alt="Tailwind Play" />
      <img src="{{ __livecodes_baseUrl__ }}assets/templates/tailwind-play-dark.svg" class="mb-11.5 h-6 not-dark:hidden" alt="Tailwind Play" />
      <div class="space-y-6">
        <p>A template based on <a href="https://play.tailwindcss.com/" class="text-cyan-600 hover:text-cyan-700" target="_blank">Tailwind CSS playground</a>, including support for things like:</p>
        <ul class="space-y-3">
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
              Customizing your theme with
              <code class="font-mono font-medium text-gray-950 dark:text-white">@theme</code>
            </p>
          </li>
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
              Adding custom utilities with
              <code class="font-mono font-medium text-gray-950 dark:text-white">@utility</code>
            </p>
          </li>
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
              Adding custom variants with
              <code class="font-mono font-medium text-gray-950 dark:text-white">@variant</code>
            </p>
          </li>
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">Code completion with instant preview</p>
          </li>
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">Viewing generated CSS code (in <code class="text-sm font-bold text-gray-900">Compiled</code> pane below)</p>
          </li>
        </ul>
        <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
      </div>
      <hr class="my-6 w-full border-(--pattern-fg)" />
      <p class="mb-3">Want to dig deeper into Tailwind?</p>
      <p class="font-semibold">
        <a href="https://tailwindcss.com/docs" class="text-gray-950 underline decoration-sky-400 underline-offset-3 hover:decoration-2 dark:text-white">Read the docs &rarr;</a>
      </p>
    </div>
  </div>
  <div class="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
  <div class="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
  <div class="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
  <div class="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
</div>
`},style:{language:`css`,content:`@import "tailwindcss";

@theme {
  /* ... */
}
`},script:{language:`javascript`,content:``},processors:[`tailwindcss`]}})),lu,uu=e((()=>{lu={name:`tcl`,title:window.deps.translateString(`templates.starter.tcl`,`Tcl Starter`),thumbnail:`assets/templates/tcl.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/tcl.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set input
  livecodes.tcl.input = "-1";

  addEventListener("load", async () => {
    const button = document.querySelector("#counter-button");
    // wait till loaded
    await livecodes.tcl.loaded;
    button.innerText = "Click me";
    button.disabled = false;

    button.onclick = async () => {
      const {output, error} = await livecodes.tcl.run();
    };
  });
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`tcl`,content:`set title "Tcl"
::wacl::dom attr "#name" innerText $title

set input [gets stdin]
if {[info exists count]} {
  incr count
} else {
  set count [expr $input + 1]
}
::wacl::dom attr "#counter" innerText $count
puts $count
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),du,fu=e((()=>{du={name:`teal`,title:window.deps.translateString(`templates.starter.teal`,`Teal Starter`),thumbnail:`assets/templates/teal.png`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/teal.png" />
  <p id="counter">You clicked 0 times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`teal`,content:`global record Js
  record global
    record document
      querySelector: function(self: document, string): Element
    end
  end
end

global record Element
  innerHTML: string
  addEventListener: function(self: Element, string, function): nil
end

global js: Js = require "js"
global window = js.global
global document = window.document

global title = document:querySelector("#title")
global button = document:querySelector("#counter-button")
global counter_el = document:querySelector("#counter")

title.innerHTML = "Teal"

global count = 0
global function increment (current: integer): integer
  return current + 1
end

button:addEventListener("click", function()
  count = increment(count)
  counter_el.innerHTML = ("You clicked %d times."):format(count)
end)
`}}})),pu,mu=e((()=>{pu={name:`typescript`,aliases:[`ts`],title:window.deps.translateString(`templates.starter.typescript`,`TypeScript Starter`),thumbnail:`assets/templates/typescript.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/typescript.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`typescript`,content:`class Counter {
  private count: number;
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
  }
  getValue() {
    return this.count;
  }
}

const title = document.querySelector<HTMLElement>("#title")!;
const count = document.querySelector<HTMLElement>("#counter")!;
const button = document.querySelector<HTMLElement>("#counter-button")!;

title.innerText = "TypeScript";
const counter = new Counter();
button.addEventListener(
  "click",
  () => {
    counter.increment();
    count.innerText = String(counter.getValue());
  },
  false
);
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),hu,gu=e((()=>{hu={name:`vue`,title:window.deps.translateString(`templates.starter.vue`,`Vue SFC Starter`),thumbnail:`assets/templates/vue.svg`,activeEditor:`script`,markup:{language:`vue`,content:`<script setup lang="tsx">
import Counter from './Component.vue';
<\/script>

<template>
  <Counter name="Vue" />
</template>
`},style:{language:`css`,content:``},script:{language:`vue`,content:`<script setup lang="tsx">
  import { ref } from 'vue';

  interface Props {
    name?: string
  }
  const props = defineProps<Props>();
  const count = ref(0);
  const align = 'center';

  // define inline component
  function Greeting(props: Props) {
    return <h1>Hello, { props.name || 'World' }!</h1>
  }
<\/script>

<template>
  <div class="container">
    <Greeting :name="props.name" />
    <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
    <p>You clicked {{ count }} times.</p>
    <button @click="count++">Click me</button>
  </div>
</template>

<style scoped>
  .container,
  .container button {
    text-align: v-bind("align");
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),_u,vu=e((()=>{_u={name:`vue2`,title:window.deps.translateString(`templates.starter.vue2`,`Vue 2 Starter`),thumbnail:`assets/templates/vue.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div id="app">
  <h1>Hello, Vue!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/vue.svg" />
  <p>You clicked {{ counter }} times.</p>
  <button @click="increment()">Click me</button>
</div>
`},style:{language:`css`,content:`#app,
#app button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`javascript`,content:`new Vue({
  el: "#app",
  data: {
    counter: 0,
  },
  methods: {
    increment() {
      this.counter += 1;
    },
  },
});
`},stylesheets:[],scripts:[`{{ __CDN_URL__ }}vue@2`],cssPreset:``,imports:{},types:{}}})),yu,bu=e((()=>{yu={name:`wat`,title:window.deps.translateString(`templates.starter.wat`,`WebAssembly Text Starter`),thumbnail:`assets/templates/webassembly.svg`,activeEditor:`script`,markup:{language:`html`,content:`<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/webassembly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script>
  (async () => {
    const importObject = {
      title: {
        change: changeTitle,
      },
    };

    // The \`loadWasm\` method of \`livecodes\` global object
    // optionally takes an import object and
    // returns a promise which resolves to an object
    // exposing the compiled wasm module and wasm binary
    const { wasmModule, binary } = await livecodes.loadWasm(importObject);
    const { memory, setTitle, increment } = wasmModule.exports;

    function changeTitle(offset, length) {
      const bytes = new Uint8Array(memory.buffer, offset, length);
      const title = new TextDecoder("utf8").decode(bytes);
      document.querySelector("#title").innerText = title;
    }
    setTitle();

    const counter = document.querySelector("#counter");
    const button = document.querySelector("#counter-button");
    let count = 0;

    button.addEventListener(
      "click",
      () => {
        count = increment(count);
        counter.innerText = count;
      },
      false
    );
  })();
<\/script>
`},style:{language:`css`,content:`.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`},script:{language:`wat`,content:`(module
  (import "title" "change" (func $changeTitle (param i32) (param i32)))
  (export "memory" (memory $0))
  (export "setTitle" (func $setTitle))
  (export "increment" (func $increment))
  (memory $0 1)
  (data 0 (i32.const 0) "WebAssembly Text")
  (func $setTitle
    (call $changeTitle (i32.const 0) (i32.const 16))
  )
  (func $increment (param $0 i32) (result i32)
    (i32.add (local.get $0) (i32.const 1))
  )
)
`},stylesheets:[],scripts:[],cssPreset:``,imports:{},types:{}}})),xu,Su=e((()=>{Ws(),Ks(),Js(),Xs(),Qs(),ec(),nc(),ic(),oc(),cc(),uc(),fc(),mc(),gc(),vc(),bc(),Sc(),wc(),Ec(),Ac(),Mc(),Pc(),Ic(),Rc(),Bc(),Hc(),Wc(),Kc(),Jc(),Xc(),Qc(),el(),nl(),il(),ol(),cl(),ul(),fl(),ml(),gl(),vl(),bl(),Sl(),wl(),El(),Ol(),Al(),Ml(),Pl(),Il(),Rl(),Bl(),Hl(),Wl(),Kl(),Jl(),Xl(),Ql(),eu(),nu(),iu(),ou(),cu(),uu(),fu(),mu(),gu(),vu(),bu(),xu=[Zs,zc,pu,Ll,Fl,hu,Us,Tl,au,$l,Zc,ru,ll,su,Zl,xc,tc,qs,Ul,al,Gc,Ys,Yc,Uc,Vc,yc,_l,_u,lc,$c,rc,ac,Fc,Vl,zl,pl,kl,jl,Nl,Gl,ql,jc,Nc,yl,xl,pc,hc,Lc,_c,hl,tl,rl,du,Tc,qc,Yl,dc,sc,kc,lu,sl,Gs,yu,tu,Cl,Dl,dl,$s,Cc]})),Cu=e((()=>{Bs(),Hs(),Ls(),Su()})),wu,Tu=e((()=>{wu=`monaco:active4d.monaco:all-hallows-eve.monaco:amy.monaco:birds-of-paradise.monaco:blackboard.monaco:brilliance-black.monaco:brilliance-dull.monaco:catppuccin-latte.monaco:catppuccin-frappe.monaco:catppuccin-macchiato.monaco:catppuccin-mocha.monaco:chrome-devtools.monaco:clouds-midnight.monaco:clouds.monaco:cobalt.monaco:cobalt2.monaco:dawn.monaco:dracula.monaco:dreamweaver.monaco:eiffel.monaco:espresso-libre.monaco:github.monaco:github-dark.monaco:github-light.monaco:hc-black.monaco:hc-light.monaco:idle.monaco:idlefingers.monaco:iplastic.monaco:katzenmilch.monaco:krtheme.monaco:kuroir.monaco:lazy.monaco:magicwb-amiga.monaco:merbivore-soft.monaco:merbivore.monaco:monochrome.monaco:monochrome-dark.monaco:monoindustrial.monaco:monokai.monaco:monokai-bright.monaco:night-owl.monaco:nord.monaco:oceanic-next.monaco:pastels-on-dark.monaco:slush-and-poppies.monaco:solarized-dark.monaco:solarized-light.monaco:spacecadet.monaco:sunburst.monaco:textmate-mac-classic.monaco:tomorrow.monaco:tomorrow-night.monaco:tomorrow-night-blue.monaco:tomorrow-night-bright.monaco:tomorrow-night-eighties.monaco:twilight.monaco:upstream-sunburst.monaco:vibrant-ink.monaco:vs.monaco:vs-dark.monaco:xcode-default.monaco:zenburnesque.monaco:active4d.monaco:all-hallows-eve.monaco:amy.monaco:birds-of-paradise.monaco:blackboard.monaco:brilliance-black.monaco:brilliance-dull.monaco:catppuccin-latte.monaco:catppuccin-frappe.monaco:catppuccin-macchiato.monaco:catppuccin-mocha.monaco:chrome-devtools.monaco:clouds-midnight.monaco:clouds.monaco:cobalt.monaco:cobalt2.monaco:dawn.monaco:dracula.monaco:dreamweaver.monaco:eiffel.monaco:espresso-libre.monaco:github.monaco:github-dark.monaco:github-light.monaco:hc-black.monaco:hc-light.monaco:idle.monaco:idlefingers.monaco:iplastic.monaco:katzenmilch.monaco:krtheme.monaco:kuroir.monaco:lazy.monaco:magicwb-amiga.monaco:merbivore-soft.monaco:merbivore.monaco:monochrome.monaco:monochrome-dark.monaco:monoindustrial.monaco:monokai.monaco:monokai-bright.monaco:night-owl.monaco:nord.monaco:oceanic-next.monaco:pastels-on-dark.monaco:slush-and-poppies.monaco:solarized-dark.monaco:solarized-light.monaco:spacecadet.monaco:sunburst.monaco:textmate-mac-classic.monaco:tomorrow.monaco:tomorrow-night.monaco:tomorrow-night-blue.monaco:tomorrow-night-bright.monaco:tomorrow-night-eighties.monaco:twilight.monaco:upstream-sunburst.monaco:vibrant-ink.monaco:vs.monaco:vs-dark.monaco:xcode-default.monaco:zenburnesque.codemirror:amy.codemirror:aura.codemirror:ayu-light.codemirror:barf.codemirror:basic-light.codemirror:basic-dark.codemirror:bespin.codemirror:birds-of-paradise.codemirror:boys-and-girls.codemirror:catppuccin-latte.codemirror:catppuccin-frappe.codemirror:catppuccin-macchiato.codemirror:catppuccin-mocha.codemirror:clouds.codemirror:cobalt.codemirror:cm-light.codemirror:cool-glow.codemirror:dracula.codemirror:espresso.codemirror:github-dark.codemirror:github-light.codemirror:gruvbox-dark.codemirror:gruvbox-light.codemirror:material-dark.codemirror:material-light.codemirror:monochrome.codemirror:monochrome-dark.codemirror:noctis-lilac.codemirror:nord.codemirror:one-dark.codemirror:rose-pine-dawn.codemirror:smoothy.codemirror:solarized-dark.codemirror:solarized-light.codemirror:tokyo-night.codemirror:tokyo-night-day.codemirror:tokyo-night-storm.codemirror:tomorrow.codemirror:amy.codemirror:aura.codemirror:ayu-light.codemirror:barf.codemirror:basic-light.codemirror:basic-dark.codemirror:bespin.codemirror:birds-of-paradise.codemirror:boys-and-girls.codemirror:catppuccin-latte.codemirror:catppuccin-frappe.codemirror:catppuccin-macchiato.codemirror:catppuccin-mocha.codemirror:clouds.codemirror:cobalt.codemirror:cm-light.codemirror:cool-glow.codemirror:dracula.codemirror:espresso.codemirror:github-dark.codemirror:github-light.codemirror:gruvbox-dark.codemirror:gruvbox-light.codemirror:material-dark.codemirror:material-light.codemirror:monochrome.codemirror:monochrome-dark.codemirror:noctis-lilac.codemirror:nord.codemirror:one-dark.codemirror:rose-pine-dawn.codemirror:smoothy.codemirror:solarized-dark.codemirror:solarized-light.codemirror:tokyo-night.codemirror:tokyo-night-day.codemirror:tokyo-night-storm.codemirror:tomorrow.codejar:a11y-dark.codejar:atom-dark.codejar:base16-ateliersulphurpool-light.codejar:catppuccin-latte.codejar:catppuccin-frappe.codejar:catppuccin-macchiato.codejar:catppuccin-mocha.codejar:cb.codejar:coldark-cold.codejar:coldark-dark.codejar:coy.codejar:coy-without-shadows.codejar:darcula.codejar:dark.codejar:dracula.codejar:duotone-dark.codejar:duotone-earth.codejar:duotone-forest.codejar:duotone-light.codejar:duotone-sea.codejar:duotone-space.codejar:funky.codejar:ghcolors.codejar:gruvbox-dark.codejar:gruvbox-light.codejar:holi-theme.codejar:hopscotch.codejar:laserwave.codejar:lucario.codejar:material-dark.codejar:material-light.codejar:material-oceanic.codejar:monochrome.codejar:monochrome-dark.codejar:night-owl.codejar:nord.codejar:nord-2.codejar:okaidia.codejar:one-dark.codejar:one-light.codejar:pojoaque.codejar:shades-of-purple.codejar:solarized-dark-atom.codejar:solarized-light.codejar:synthwave84.codejar:tomorrow.codejar:twilight.codejar:vs.codejar:vsc-dark-plus.codejar:xonokai.codejar:z-touchs.codejar:a11y-dark.codejar:atom-dark.codejar:base16-ateliersulphurpool-light.codejar:catppuccin-latte.codejar:catppuccin-frappe.codejar:catppuccin-macchiato.codejar:catppuccin-mocha.codejar:cb.codejar:coldark-cold.codejar:coldark-dark.codejar:coy.codejar:coy-without-shadows.codejar:darcula.codejar:dark.codejar:dracula.codejar:duotone-dark.codejar:duotone-earth.codejar:duotone-forest.codejar:duotone-light.codejar:duotone-sea.codejar:duotone-space.codejar:funky.codejar:ghcolors.codejar:gruvbox-dark.codejar:gruvbox-light.codejar:holi-theme.codejar:hopscotch.codejar:laserwave.codejar:lucario.codejar:material-dark.codejar:material-light.codejar:material-oceanic.codejar:monochrome.codejar:monochrome-dark.codejar:night-owl.codejar:nord.codejar:nord-2.codejar:okaidia.codejar:one-dark.codejar:one-light.codejar:pojoaque.codejar:shades-of-purple.codejar:solarized-dark-atom.codejar:solarized-light.codejar:synthwave84.codejar:tomorrow.codejar:twilight.codejar:vs.codejar:vsc-dark-plus.codejar:xonokai.codejar:z-touchs`.split(`.`)})),$,Eu,Du,Ou=e((()=>{Rs(),Cu(),Tu(),$=(e,t=zs)=>{let n,r,i,a=e.split(`__`);a.length===2?[n,i]=a:[n,r,i]=a;let o=e=>typeof e==`string`?`text`:typeof e,s=r==null?t?.[i]:t?.[r]?.[i];return{table:{category:n,defaultValue:{summary:JSON.stringify(s,null,2)},...r?{subcategory:r}:{}},name:i,control:o(s),required:!1}},Eu={config__title:{...$(`config__title`),description:`Project title. This is used as [result page](https://livecodes.io/docs/features/result) title and title meta tag.`,type:`string`,control:`text`},config__description:{...$(`config__description`),description:`Project description. Used in [result page](https://livecodes.io/docs/features/result) description meta tag.`,type:`string`,control:`text`},config__head:{...$(`config__head`),description:"Content added to the [result page](https://livecodes.io/docs/features/result) `<head>` element.",type:`string`,control:`text`},config__htmlAttrs:{...$(`config__htmlAttrs`),description:'Attributes added to the result page `<html>` element. It can be an object or a string.\n\nExample: `{ lang: "en", class: "dark" }` or `\'lang="en" class="dark"\'`, become `<html lang="en" class="dark">`.',type:`string`,control:`text`},config__tags:{...$(`config__tags`),description:`(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)

Project tags. Used in project filter and search.`,type:{name:`array`,value:[]},control:`object`},config__autoupdate:{...$(`config__autoupdate`),description:"If `true`, the result page is automatically updated on code change, after a time `delay`.",type:`boolean`,control:`boolean`},config__autosave:{...$(`config__autosave`),description:"(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)\n\nIf `true`, the project is automatically saved on code change, after a time `delay`.",type:`boolean`,control:`boolean`},config__autotest:{...$(`config__autotest`),description:"If `true`, the project is watched for code changes which trigger tests to auto-run, after a time `delay`.",type:`boolean`,control:`boolean`},config__delay:{...$(`config__delay`),description:"Time delay (in milliseconds) following code change, after which the result page is updated (if `autoupdate` is true), tests are auto-run (if `autotest` is true), and the project is saved (if `autosave` is true).",type:`number`,control:`number`},config__formatOnsave:{...$(`config__formatOnsave`),description:`(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)

If true, the code is automatically [formatted](https://livecodes.io/docs/features/code-format) on saving the project.`,type:`boolean`,control:`boolean`},config__view:{...$(`config__view`),description:`The [default view](https://livecodes.io/docs/features/default-view) for the playground.`,type:`string`,control:`inline-radio`,options:[`split`,`editor`,`result`]},config__mode:{...$(`config__mode`),description:`Sets the [display mode](https://livecodes.io/docs/features/display-modes).`,type:`string`,control:`inline-radio`,options:[`full`,`focus`,`simple`,`lite`,`result`,`editor`,`codeblock`]},config__theme:{...$(`config__theme`),description:`Sets the app [theme](https://livecodes.io/docs/features/themes) to light/dark mode.`,type:`string`,control:`inline-radio`,options:[`light`,`dark`]},config__themeColor:{...$(`config__themeColor`),description:`A string representing a CSS color value, used to set the app [theme color](https://livecodes.io/docs/features/themes).`,type:`string`,control:`color`},config__layout:{...$(`config__layout`),description:'Sets the app layout to horizontal or vertical. If set to `"responsive"` (the default) or `undefined`, the layout is vertical in small screens when the playground height is larger than its width, otherwise horizontal.',type:`string`,control:`inline-radio`,options:[`responsive`,`vertical`,`horizontal`]},config__editorTheme:{...$(`config__editorTheme`),description:`Sets the [code editor themes](https://livecodes.io/docs/configuration/configuration-object#editortheme).`,type:`string`,control:`select`,options:wu},config__appLanguage:{...$(`config__appLanguage`),description:'Spoken language code that sets the app UI language (e.g. `"ar"`, `"zh-CN"`). Used in translations for internationalization. If `undefined` (the default), the language is automatically detected based on the user\'s browser settings and falls back to English, if detection fails or the language is not supported.',type:`string`,control:`select`,options:Object.values(Vs),mapping:Object.keys(Vs).reduce((e,t)=>(e[Vs[t]]=t,e),{})},config__recoverUnsaved:{...$(`config__recoverUnsaved`),description:`(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)

Enables recovering last unsaved project when the app is reopened.`,type:`boolean`,control:`boolean`},config__showSpacing:{...$(`config__showSpacing`),description:`Enables [showing element spacing](https://livecodes.io/docs/features/result#show-spacings) in the result page.`,type:`boolean`,control:`boolean`},config__welcome:{...$(`config__welcome`),description:`(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)

If \`true\`, the [welcome screen](https://livecodes.io/docs/features/welcome) is displayed when the app loads.`,type:`boolean`,control:`boolean`},config__readonly:{...$(`config__readonly`),description:"If `true`, editors are loaded in read-only mode, where the user is not allowed to change the code.\n\nBy default, when `readonly` is set to `true`, the light-weight code editor [CodeJar](https://livecodes.io/docs/features/editor-settings#code-editor) is used. If you wish to use another editor, set the `editor` property.",type:`boolean`,control:`boolean`},config__allowLangChange:{...$(`config__allowLangChange`),description:`(Only in the [standalone app](https://livecodes.io/docs/getting-started#standalone-app), not in embedded playgrounds)

If \`false\`, the UI will not show the menu that allows changing editor language.`,type:`boolean`,control:`boolean`},config__activeEditor:{...$(`config__activeEditor`),description:`Selects the active editor to show.`,type:`string`,control:`inline-radio`,options:[`markup`,`style`,`script`]},config__languages:{...$(`config__languages`),description:`List of enabled languages.`,type:{name:`array`,value:[]},control:`object`},config__markup__language:{...$(`config__markup__language`),description:'Sets the markup editor language. This can be a language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)). (e.g. `"markdown"`, `"md"`)',type:`string`,control:`select`,options:Z.filter(e=>e.editor===`markup`).map(e=>e.name)},config__markup__content:{...$(`config__markup__content`),description:`The initial content of the markup code editor.`,type:`string`,control:`text`},config__markup__contentUrl:{...$(`config__markup__contentUrl`),description:"A URL to load `content` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `content` property had no value.",type:`string`,control:`text`},config__markup__hiddenContent:{...$(`config__markup__hiddenContent`),description:`Hidden content that gets evaluated without being visible in the code editor. This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests).`,type:`string`,control:`text`},config__markup__hiddenContentUrl:{...$(`config__markup__hiddenContentUrl`),description:"A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `hiddenContent` property had no value.",type:`string`,control:`text`},config__markup__foldedLines:{...$(`config__markup__foldedLines`),description:"Lines that get folded when the editor loads. The code can be unfolded by clicking on arrow beside the line. This can be useful for less relevant code in embedded playgrounds. Example: `[{from: 1, to: 3}, {from: 5, to: 7}]`",type:{name:`array`,value:[]},control:`object`},config__markup__title:{...$(`config__markup__title`),description:`If set, this is used as the title of the editor in the UI, overriding the default title set to the language name (e.g. "index.html" can be used instead of "HTML").`,type:`string`,control:`text`},config__markup__hideTitle:{...$(`config__markup__hideTitle`),description:"If `true`, the code editor tab is hidden, however its code is still evaluated. This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).",type:`boolean`,control:`boolean`},config__markup__order:{...$(`config__markup__order`),description:`The order of the editor in the UI.`,type:`number`,control:`text`},config__markup__selector:{...$(`config__markup__selector`),description:"A CSS selector to load `content` from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).",type:`string`,control:`text`},config__markup__position:{...$(`config__markup__position`),description:"The initial position of the cursor in the markup code editor. Example: `{lineNumber: 5, column: 10}`",type:{name:`object`,value:{}},control:`object`},config__style__language:{...$(`config__style__language`),description:'Sets the style editor language. This can be a language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)). (e.g. `"css"`, `"scss"`)',type:`string`,control:`select`,options:Z.filter(e=>e.editor===`style`).map(e=>e.name)},config__style__content:{...$(`config__style__content`),description:`The initial content of the style code editor.`,type:`string`,control:`text`},config__style__contentUrl:{...$(`config__style__contentUrl`),description:"A URL to load `content` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `content` property had no value.",type:`string`,control:`text`},config__style__hiddenContent:{...$(`config__style__hiddenContent`),description:`Hidden content that gets evaluated without being visible in the code editor. This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests).`,type:`string`,control:`text`},config__style__hiddenContentUrl:{...$(`config__style__hiddenContentUrl`),description:"A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `hiddenContent` property had no value.",type:`string`,control:`text`},config__style__foldedLines:{...$(`config__style__foldedLines`),description:"Lines that get folded when the editor loads. The code can be unfolded by clicking on arrow beside the line. This can be useful for less relevant code in embedded playgrounds. Example: `[{from: 1, to: 3}, {from: 5, to: 7}]`",type:{name:`array`,value:[]},control:`object`},config__style__title:{...$(`config__style__title`),description:`If set, this is used as the title of the editor in the UI, overriding the default title set to the language name (e.g. "styles.css" can be used instead of "CSS").`,type:`string`,control:`text`},config__style__hideTitle:{...$(`config__style__hideTitle`),description:"If `true`, the code editor tab is hidden, however its code is still evaluated. This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).",type:`boolean`,control:`boolean`},config__style__order:{...$(`config__style__order`),description:`The order of the editor in the UI.`,type:`number`,control:`text`},config__style__selector:{...$(`config__style__selector`),description:"A CSS selector to load `content` from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).",type:`string`,control:`text`},config__style__position:{...$(`config__style__position`),description:"The initial position of the cursor in the markup code editor. Example: `{lineNumber: 5, column: 10}`",type:{name:`object`,value:{}},control:`object`},config__script__language:{...$(`config__script__language`),description:'Sets the script editor language. This can be a language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)). (e.g. `"javascript"`, `"js"`)',type:`string`,control:`select`,options:Z.filter(e=>e.editor===`script`).map(e=>e.name)},config__script__content:{...$(`config__script__content`),description:`The initial content of the script code editor.`,type:`string`,control:`text`},config__script__contentUrl:{...$(`config__script__contentUrl`),description:"A URL to load `content` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `content` property had no value.",type:`string`,control:`text`},config__script__hiddenContent:{...$(`config__script__hiddenContent`),description:`Hidden content that gets evaluated without being visible in the code editor. This can be useful in embedded playgrounds (e.g. for adding helper functions, utilities or tests).`,type:`string`,control:`text`},config__script__hiddenContentUrl:{...$(`config__script__hiddenContentUrl`),description:"A URL to load `hiddenContent` from. It has to be a valid URL that is CORS-enabled. The URL is only fetched if `hiddenContent` property had no value.",type:`string`,control:`text`},config__script__foldedLines:{...$(`config__script__foldedLines`),description:"Lines that get folded when the editor loads. The code can be unfolded by clicking on arrow beside the line. This can be useful for less relevant code in embedded playgrounds. Example: `[{from: 1, to: 3}, {from: 5, to: 7}]`",type:{name:`array`,value:[]},control:`object`},config__script__title:{...$(`config__script__title`),description:`If set, this is used as the title of the editor in the UI, overriding the default title set to the language name (e.g. "Python" can be used instead of "Py (Wasm)").`,type:`string`,control:`text`},config__script__hideTitle:{...$(`config__script__hideTitle`),description:"If `true`, the code editor tab is hidden, however its code is still evaluated. This can be useful in embedded playgrounds (e.g. for hiding unnecessary code).",type:`boolean`,control:`boolean`},config__script__order:{...$(`config__script__order`),description:`The order of the editor in the UI.`,type:`number`,control:`text`},config__script__selector:{...$(`config__script__selector`),description:"A CSS selector to load `content` from [DOM import](https://livecodes.io/docs/features/import#import-code-from-dom).",type:`string`,control:`text`},config__script__position:{...$(`config__script__position`),description:"The initial position of the cursor in the markup code editor. Example: `{lineNumber: 5, column: 10}`",type:{name:`object`,value:{}},control:`object`},config__stylesheets:{...$(`config__stylesheets`),description:`List of URLs for [external stylesheets](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).`,type:{name:`array`,value:[]},control:`object`},config__scripts:{...$(`config__scripts`),description:`List of URLs for [external scripts](https://livecodes.io/docs/features/external-resources) to add to the [result page](https://livecodes.io/docs/features/result).`,type:{name:`array`,value:[]},control:`object`},config__cssPreset:{...$(`config__cssPreset`),description:`The [CSS preset](https://livecodes.io/docs/features/external-resources#css-presets) to use.`,type:`string`,control:`inline-radio`,options:[`normalize.css`,`reset-css`]},config__imports:{...$(`config__imports`),description:`Allows specifying custom import maps for [module imports](https://livecodes.io/docs/features/module-resolution#custom-module-resolution) ([more info](https://livecodes.io/docs/configuration/configuration-object#imports)).`,type:{name:`object`,value:{}},control:`object`},config__types:{...$(`config__types`),description:`Allows providing custom TypeScript type declarations for better editor intellisense ([more info](https://livecodes.io/docs/configuration/configuration-object#types)).`,type:{name:`object`,value:{}},control:`object`},config__tests__language:{...$(`config__tests__language`),description:'Sets the tests editor language. This can be a language name, extension or alias (as defined in [language documentations](https://livecodes.io/docs/languages/)). (e.g. `"typescript"`, `"ts"`)',type:`string`,control:`select`,options:Z.filter(e=>e.editor===`script`).map(e=>e.name)},config__tests__content:{...$(`config__tests__content`),description:`The content of the tests code editor.`,type:`string`,control:`text`},config__tools__enabled:{...$(`config__tools__enabled`),description:'Enables/disables the [tools pane](https://livecodes.io/docs/features/tools-pane). It can be an array of tools to enable or `"all"` to enable all tools.',type:{name:`Array<'console' | 'compiled' | 'tests'> | 'all'`,value:[]}},config__tools__active:{...$(`config__tools__active`),description:`Sets the active tool in the [tools pane](https://livecodes.io/docs/features/tools-pane).`,type:`string`,control:`inline-radio`,options:[`console`,`compiled`,`tests`]},config__tools__status:{...$(`config__tools__status`),description:`Sets the status of the [tools pane](https://livecodes.io/docs/features/tools-pane).`,type:`string`,control:`inline-radio`,options:[`full`,`closed`,`open`,`none`]},config__zoom:{...$(`config__zoom`),description:`Sets result page [zoom level](https://livecodes.io/docs/features/result#result-page-zoom).`,type:`number`,control:`inline-radio`,options:[1,.5,.25]},config__processors:{...$(`config__processors`),description:`List of enabled [CSS processors](https://livecodes.io/docs/features/css#css-processors).`,type:{name:`array`,value:[]},control:`object`},config__customSettings:{...$(`config__customSettings`),description:`Defines [custom settings](https://livecodes.io/docs/advanced/custom-settings) for the current project.`,type:{name:`object`,value:{}},control:`object`},config__editor:{...$(`config__editor`),description:'Selects the [code editor](https://livecodes.io/docs/features/editor-settings#code-editor) to use.\n\nIf `undefined` (the default):<br />\nMonaco editor is used on desktop,<br />\nCodeMirror is used on mobile and in `simple` mode,<br />\nwhile CodeJar is used in [`codeblock` mode](https://livecodes.io/docs/features/display-modes#codeblock), in [`lite` mode](https://livecodes.io/docs/features/lite) and in `readonly` playgrounds.<br />\n\nIf set to `"auto"`, Monaco editor is used on desktop and CodeMirror is used on mobile regardless of other settings.',type:`string`,control:`inline-radio`,options:[`monaco`,`codemirror`,`codejar`,`auto`]},config__fontFamily:{...$(`config__fontFamily`),description:`Sets the code editor font family.`,type:`string`,control:`text`},config__fontSize:{...$(`config__fontSize`),description:"Sets the code editor font size.\n\nIf `undefined` (the default), the font size is set to `14` for the full app and `12` for embeds.",type:`number`,control:`number`},config__useTabs:{...$(`config__useTabs`),description:"If `true`, lines are indented with tabs instead of spaces. Also used in [code formatting](https://livecodes.io/docs/features/code-format).",type:`boolean`,control:`boolean`},config__tabSize:{...$(`config__useTabs`),description:`The number of spaces per indentation-level. Also used in [code formatting](https://livecodes.io/docs/features/code-format).`,type:`number`,control:`number`},config__lineNumbers:{...$(`config__lineNumbers`),description:'Shows line numbers in code editor. If set to `"relative"`, line numbers are shown relative to the current line. This can be useful with `vim` mode.',type:`boolean`,control:`inline-radio`,options:[`true`,`false`,`relative`],mapping:{true:!0,false:!1,relative:`relative`}},config__wordWrap:{...$(`config__wordWrap`),description:`Enables word-wrap for long lines.`,type:`boolean`,control:`boolean`},config__closeBrackets:{...$(`config__closeBrackets`),description:`Use auto-complete to close brackets and quotes.`,type:`boolean`,control:`boolean`},config__foldRegions:{...$(`config__foldRegions`),description:"When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.",type:`boolean`,control:`boolean`},config__semicolons:{...$(`config__semicolons`),description:`Configures Prettier code formatter to use semi-colons.`,type:`boolean`,control:`boolean`},config__singleQuote:{...$(`config__singleQuote`),description:`Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use single quotes instead of double quotes.`,type:`boolean`,control:`boolean`},config__trailingComma:{...$(`config__trailingComma`),description:`Configures Prettier [code formatter](https://livecodes.io/docs/features/code-format) to use trailing commas.`,type:`boolean`,control:`boolean`},config__minimap:{...$(`config__minimap`),description:`Enables minimap in code editor.`,type:`boolean`,control:`boolean`},config__emmet:{...$(`config__emmet`),description:`Enables [Emmet](https://livecodes.io/docs/features/editor-settings#emmet).`,type:`boolean`,control:`boolean`},config__editorMode:{...$(`config__editorMode`),description:`Sets [editor mode](https://livecodes.io/docs/features/editor-settings#editor-modes).`,type:`string`,control:`inline-radio`,options:[`vim`,`emacs`]}},Du={appUrl:{control:`text`,description:`Allows loading the playground from a custom URL (e.g. a [self-hosted app](https://livecodes.io/docs/features/self-hosting/) or a [permanent URL](https://livecodes.io/docs/features/permanent-url/)).`,type:`string`,required:!1,table:{category:`Embed Options`,defaultValue:{summary:`"https://livecodes.io"`}}},headless:{control:`boolean`,description:"When set to `true`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).",type:`boolean`,required:!1,table:{category:`Embed Options`,defaultValue:{summary:`false`}}},import:{control:`text`,description:`A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).`,type:`string`,required:!1,table:{category:`Embed Options`}},loading:{control:`inline-radio`,description:`Sets how the playground loads.`,options:[`eager`,`lazy`,`click`],type:`string`,required:!1,table:{category:`Embed Options`,defaultValue:{summary:`"lazy"`,detail:`"eager": The playground loads immediately.
"lazy": A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.
"click": The playground does not load automatically. Instead, a "Click-to-load" screen is shown.`}}},params:{control:`object`,description:`An object that represents [URL Query parameters](https://livecodes.io/docs/configuration/query-params), that can be used to configure the playground.`,type:{name:`object`,value:{}},required:!1,table:{category:`Embed Options`}},template:{control:`select`,description:`A [starter template](https://livecodes.io/docs/features/templates) to load.`,type:`string`,required:!1,table:{category:`Embed Options`},options:xu.map(e=>e.name)},config:{table:{disable:!0}},...Object.keys(zs).filter(e=>!e.includes(`version`)).reduce((e,t)=>{let n=zs[t];return n&&typeof n==`object`&&[`markup`,`style`,`script`].includes(t)&&(n={contentUrl:void 0,hiddenContent:void 0,hiddenContentUrl:void 0,title:void 0,hideTitle:void 0,foldedLines:void 0,order:void 0,position:void 0,selector:void 0,...n}),`config__${t}`in Eu?e[`config__${t}`]=Eu[`config__${t}`]:n&&typeof n==`object`&&!Array.isArray(n)?Object.keys(n).forEach(n=>{e[`config__${t}__${n}`]=Eu[`config__${t}__${n}`]||$(`config__${t}__${n}`)}):e[`config__${t}`]=$(`config__${t}`),e},{}),props:{control:`object`,required:!1,table:{readonly:!0,category:`Props`}},class:{control:`text`,type:`string`,required:!1,table:{category:`Styles`}},style:{control:`object`,required:!1,table:{category:`Styles`}},height:{control:`text`,type:`string`,required:!1,table:{category:`Styles`,defaultValue:{summary:`300px`}}}}})),ku,Au=e((()=>{ku=location.hostname.startsWith(`localhost`)||location.hostname.startsWith(`127.0.0.1`)?`http://127.0.0.1:8080`:location.origin})),ju=e((()=>{Rs(),Ou(),Cu(),Tu(),Au()})),Mu,Nu,Pu,Fu=e((()=>{l(),ve(),ju(),pe(),Mu={component:de,parameters:{layout:`fullscreen`},argTypes:Du},Nu=e=>{let{params:t,height:n,class:r,style:i,...a}=e;return{args:{appUrl:ku,...ge(a,{delimiter:`__`}),...t?{params:t}:{},height:n,class:r,style:i,props:e},render:e=>o(de,g(()=>_e(e,{delimiter:`__`}))),parameters:{docs:{source:{code:Pu(e),language:`jsx`,type:`auto`,format:!0}}}}},Pu=e=>`
import LiveCodes from "livecodes/solid";

export default function App() {
  const options = ${JSON.stringify(e,null,2).split(`
`).join(`
  `)};
  return <LiveCodes {...options} />;
}

`.trimStart();try{Nu.displayName=`livecodesStory`,Nu.__docgenInfo={description:``,displayName:`livecodesStory`,props:{class:{defaultValue:null,description:`CSS class name for the container element.`,name:`class`,required:!1,type:{name:`string`}},style:{defaultValue:null,description:`CSS styles for the container element.`,name:`style`,required:!1,type:{name:`CSSProperties`}},height:{defaultValue:null,description:`Height of the playground container.`,name:`height`,required:!1,type:{name:`string`}},sdkReady:{defaultValue:null,description:`Callback function that receives the SDK instance when ready.`,name:`sdkReady`,required:!1,type:{name:`(sdk: Playground) => void`}},appUrl:{defaultValue:{value:`'https://livecodes.io'`},description:`Allows loading the playground from a custom URL
(e.g. a [self-hosted app](https://livecodes.io/docs/features/self-hosting) or a [permanent URL](https://livecodes.io/docs/features/permanent-url)).

If supplied with an invalid URL, an error is thrown.`,name:`appUrl`,required:!1,type:{name:`string`}},params:{defaultValue:null,description:`An object that represents the [URL Query parameters](https://livecodes.io/docs/configuration/query-params), that can be used to configure the playground.

These 2 snippets produce similar output:

\`\`\`js
import { createPlayground } from 'livecodes';

// use config
createPlayground('#container', {
  config: {
    markup: {
      language: 'markdown',
      content: '# Hello World!',
    },
  },
});

// use params
createPlayground('#container', { params: { md: '# Hello World!' } });
\`\`\``,name:`params`,required:!1,type:{name:`{ appUrl?: string; params?: { appUrl?: string; params?: { appUrl?: string; params?: { appUrl?: string; params?: { appUrl?: string; params?: { appUrl?: string; params?: { appUrl?: string; params?: { appUrl?: string; params?: { appUrl?: string; ... 501 more ...; compiled?: "" | ... 4 more ... | "true"; }; ... 500 more...`}},config:{defaultValue:{value:`{}`},description:`A [configuration object](https://livecodes.io/docs/configuration/configuration-object) or a URL to a JSON file representing a configuration object to load.

If supplied and is not an object or a valid URL, an error is thrown.`,name:`config`,required:!1,type:{name:`string | Partial<Config>`}},headless:{defaultValue:{value:`false`},description:"If `true`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).",name:`headless`,required:!1,type:{name:`boolean`}},import:{defaultValue:null,description:`A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).`,name:`import`,required:!1,type:{name:`string`}},lite:{defaultValue:{value:`false`},description:'If `true`, the playground is loaded in [lite mode](https://livecodes.io/docs/features/lite).\n@deprecated Use `{ config: { mode: "lite" } }` instead',name:`lite`,required:!1,type:{name:`boolean`}},loading:{defaultValue:{value:`"lazy"`},description:'Sets how the playground loads:\n\n- `"eager"`: The playground loads immediately.\n- `"lazy"`: A playground embedded low down in the page will not load until the user scrolls so that it approaches the viewport.\n- `"click"`: The playground does not load automatically. Instead, a "Click-to-load" screen is shown.',name:`loading`,required:!1,type:{name:`enum`,value:[{value:`"lazy"`},{value:`"click"`},{value:`"eager"`}]}},template:{defaultValue:null,description:`A [starter template](https://livecodes.io/docs/features/templates) to load.
Allowed valued can be found [here](https://livecodes.io/docs/api/internal/type-aliases/TemplateName).`,name:`template`,required:!1,type:{name:`enum`,value:[{value:`"markdown"`},{value:`"mdx"`},{value:`"astro"`},{value:`"diagrams"`},{value:`"javascript"`},{value:`"typescript"`},{value:`"react"`},{value:`"react-native"`},{value:`"vue"`},{value:`"vue2"`},{value:`"svelte"`},{value:`"stencil"`},{value:`"solid"`},{value:`"riot"`},{value:`"malina"`},{value:`"coffeescript"`},{value:`"livescript"`},{value:`"civet"`},{value:`"clio"`},{value:`"imba"`},{value:`"assemblyscript"`},{value:`"python"`},{value:`"python-wasm"`},{value:`"r"`},{value:`"ruby"`},{value:`"ruby-wasm"`},{value:`"go"`},{value:`"go-wasm"`},{value:`"php"`},{value:`"php-wasm"`},{value:`"cpp"`},{value:`"cpp-wasm"`},{value:`"java"`},{value:`"csharp-wasm"`},{value:`"perl"`},{value:`"lua"`},{value:`"lua-wasm"`},{value:`"teal"`},{value:`"fennel"`},{value:`"julia"`},{value:`"scheme"`},{value:`"commonlisp"`},{value:`"clojurescript"`},{value:`"gleam"`},{value:`"rescript"`},{value:`"reason"`},{value:`"ocaml"`},{value:`"tcl"`},{value:`"wat"`},{value:`"sql"`},{value:`"postgresql"`},{value:`"prolog"`},{value:`"minizinc"`},{value:`"blockly"`},{value:`"blank"`},{value:`"angular"`},{value:`"preact"`},{value:`"lit"`},{value:`"jquery"`},{value:`"backbone"`},{value:`"knockout"`},{value:`"jest"`},{value:`"jest-react"`},{value:`"bootstrap"`},{value:`"tailwindcss"`},{value:`"shadcn-ui"`},{value:`"daisyui"`},{value:`"d3"`},{value:`"phaser"`}]}},view:{defaultValue:{value:`"split"`},description:'The [default view](https://livecodes.io/docs/features/default-view) for the playground.\n\nWhen set to `"headless"`, the playground is loaded in [headless mode](https://livecodes.io/docs/sdk/headless).\n@deprecated The `view` option has been moved to `config.view`. For headless mode use `headless: true`.',name:`view`,required:!1,type:{name:`enum`,value:[{value:`"editor"`},{value:`"split"`},{value:`"result"`},{value:`"headless"`}]}}}}}catch{}})),Iu=e((()=>{pe(),Fu()}));export{Mu as n,Nu as r,Iu as t};