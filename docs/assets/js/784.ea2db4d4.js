(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[784],{5162:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var n=r(7294),o=r(6010);const a="tabItem_Ymn6";function s(e){let{children:t,hidden:r,className:s}=e;return n.createElement("div",{role:"tabpanel",className:(0,o.Z)(a,s),hidden:r},t)}},4866:(e,t,r)=>{"use strict";r.d(t,{Z:()=>E});var n=r(7462),o=r(7294),a=r(6010),s=r(2466),u=r(6550),l=r(1980),i=r(7392),c=r(12);function p(e){return function(e){return o.Children.map(e,(e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:o}}=e;return{value:t,label:r,attributes:n,default:o}}))}function f(e){const{values:t,children:r}=e;return(0,o.useMemo)((()=>{const e=t??p(r);return function(e){const t=(0,i.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function d(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:r}=e;const n=(0,u.k6)(),a=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,l._X)(a),(0,o.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(n.location.search);t.set(a,e),n.replace({...n.location,search:t.toString()})}),[a,n])]}function m(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,a=f(e),[s,u]=(0,o.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:a}))),[l,i]=h({queryString:r,groupId:n}),[p,m]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,a]=(0,c.Nk)(r);return[n,(0,o.useCallback)((e=>{r&&a.set(e)}),[r,a])]}({groupId:n}),b=(()=>{const e=l??p;return d({value:e,tabValues:a})?e:null})();(0,o.useLayoutEffect)((()=>{b&&u(b)}),[b]);return{selectedValue:s,selectValue:(0,o.useCallback)((e=>{if(!d({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);u(e),i(e),m(e)}),[i,m,a]),tabValues:a}}var b=r(2389);const v="tabList__CuJ",w="tabItem_LNqP";function g(e){let{className:t,block:r,selectedValue:u,selectValue:l,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,s.o5)(),f=e=>{const t=e.currentTarget,r=c.indexOf(t),n=i[r].value;n!==u&&(p(t),l(n))},d=e=>{let t=null;switch(e.key){case"Enter":f(e);break;case"ArrowRight":{const r=c.indexOf(e.currentTarget)+1;t=c[r]??c[0];break}case"ArrowLeft":{const r=c.indexOf(e.currentTarget)-1;t=c[r]??c[c.length-1];break}}t?.focus()};return o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":r},t)},i.map((e=>{let{value:t,label:r,attributes:s}=e;return o.createElement("li",(0,n.Z)({role:"tab",tabIndex:u===t?0:-1,"aria-selected":u===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:f},s,{className:(0,a.Z)("tabs__item",w,s?.className,{"tabs__item--active":u===t})}),r??t)})))}function y(e){let{lazy:t,children:r,selectedValue:n}=e;const a=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===n));return e?(0,o.cloneElement)(e,{className:"margin-top--md"}):null}return o.createElement("div",{className:"margin-top--md"},a.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function A(e){const t=m(e);return o.createElement("div",{className:(0,a.Z)("tabs-container",v)},o.createElement(g,(0,n.Z)({},e,t)),o.createElement(y,(0,n.Z)({},e,t)))}function E(e){const t=(0,b.Z)();return o.createElement(A,(0,n.Z)({key:String(t)},e))}},420:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n={details:"details_sGeq"}},2134:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n={details:"details_iMJ2",isBrowser:"isBrowser_HA_8",collapsibleContent:"collapsibleContent_AEyV"}},7728:(e,t,r)=>{var n,o=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",n={};function o(e,t){if(!n[e]){n[e]={};for(var r=0;r<e.length;r++)n[e][e.charAt(r)]=r}return n[e][t]}var a={compressToBase64:function(e){if(null==e)return"";var r=a._compress(e,6,(function(e){return t.charAt(e)}));switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(e){return null==e?"":""==e?null:a._decompress(e.length,32,(function(r){return o(t,e.charAt(r))}))},compressToUTF16:function(t){return null==t?"":a._compress(t,15,(function(t){return e(t+32)}))+" "},decompressFromUTF16:function(e){return null==e?"":""==e?null:a._decompress(e.length,16384,(function(t){return e.charCodeAt(t)-32}))},compressToUint8Array:function(e){for(var t=a.compress(e),r=new Uint8Array(2*t.length),n=0,o=t.length;n<o;n++){var s=t.charCodeAt(n);r[2*n]=s>>>8,r[2*n+1]=s%256}return r},decompressFromUint8Array:function(t){if(null==t)return a.decompress(t);for(var r=new Array(t.length/2),n=0,o=r.length;n<o;n++)r[n]=256*t[2*n]+t[2*n+1];var s=[];return r.forEach((function(t){s.push(e(t))})),a.decompress(s.join(""))},compressToEncodedURIComponent:function(e){return null==e?"":a._compress(e,6,(function(e){return r.charAt(e)}))},decompressFromEncodedURIComponent:function(e){return null==e?"":""==e?null:(e=e.replace(/ /g,"+"),a._decompress(e.length,32,(function(t){return o(r,e.charAt(t))})))},compress:function(t){return a._compress(t,16,(function(t){return e(t)}))},_compress:function(e,t,r){if(null==e)return"";var n,o,a,s={},u={},l="",i="",c="",p=2,f=3,d=2,h=[],m=0,b=0;for(a=0;a<e.length;a+=1)if(l=e.charAt(a),Object.prototype.hasOwnProperty.call(s,l)||(s[l]=f++,u[l]=!0),i=c+l,Object.prototype.hasOwnProperty.call(s,i))c=i;else{if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(n=0;n<d;n++)m<<=1,b==t-1?(b=0,h.push(r(m)),m=0):b++;for(o=c.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o>>=1}else{for(o=1,n=0;n<d;n++)m=m<<1|o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o=0;for(o=c.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o>>=1}0==--p&&(p=Math.pow(2,d),d++),delete u[c]}else for(o=s[c],n=0;n<d;n++)m=m<<1|1&o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o>>=1;0==--p&&(p=Math.pow(2,d),d++),s[i]=f++,c=String(l)}if(""!==c){if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(n=0;n<d;n++)m<<=1,b==t-1?(b=0,h.push(r(m)),m=0):b++;for(o=c.charCodeAt(0),n=0;n<8;n++)m=m<<1|1&o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o>>=1}else{for(o=1,n=0;n<d;n++)m=m<<1|o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o=0;for(o=c.charCodeAt(0),n=0;n<16;n++)m=m<<1|1&o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o>>=1}0==--p&&(p=Math.pow(2,d),d++),delete u[c]}else for(o=s[c],n=0;n<d;n++)m=m<<1|1&o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o>>=1;0==--p&&(p=Math.pow(2,d),d++)}for(o=2,n=0;n<d;n++)m=m<<1|1&o,b==t-1?(b=0,h.push(r(m)),m=0):b++,o>>=1;for(;;){if(m<<=1,b==t-1){h.push(r(m));break}b++}return h.join("")},decompress:function(e){return null==e?"":""==e?null:a._decompress(e.length,32768,(function(t){return e.charCodeAt(t)}))},_decompress:function(t,r,n){var o,a,s,u,l,i,c,p=[],f=4,d=4,h=3,m="",b=[],v={val:n(0),position:r,index:1};for(o=0;o<3;o+=1)p[o]=o;for(s=0,l=Math.pow(2,2),i=1;i!=l;)u=v.val&v.position,v.position>>=1,0==v.position&&(v.position=r,v.val=n(v.index++)),s|=(u>0?1:0)*i,i<<=1;switch(s){case 0:for(s=0,l=Math.pow(2,8),i=1;i!=l;)u=v.val&v.position,v.position>>=1,0==v.position&&(v.position=r,v.val=n(v.index++)),s|=(u>0?1:0)*i,i<<=1;c=e(s);break;case 1:for(s=0,l=Math.pow(2,16),i=1;i!=l;)u=v.val&v.position,v.position>>=1,0==v.position&&(v.position=r,v.val=n(v.index++)),s|=(u>0?1:0)*i,i<<=1;c=e(s);break;case 2:return""}for(p[3]=c,a=c,b.push(c);;){if(v.index>t)return"";for(s=0,l=Math.pow(2,h),i=1;i!=l;)u=v.val&v.position,v.position>>=1,0==v.position&&(v.position=r,v.val=n(v.index++)),s|=(u>0?1:0)*i,i<<=1;switch(c=s){case 0:for(s=0,l=Math.pow(2,8),i=1;i!=l;)u=v.val&v.position,v.position>>=1,0==v.position&&(v.position=r,v.val=n(v.index++)),s|=(u>0?1:0)*i,i<<=1;p[d++]=e(s),c=d-1,f--;break;case 1:for(s=0,l=Math.pow(2,16),i=1;i!=l;)u=v.val&v.position,v.position>>=1,0==v.position&&(v.position=r,v.val=n(v.index++)),s|=(u>0?1:0)*i,i<<=1;p[d++]=e(s),c=d-1,f--;break;case 2:return b.join("")}if(0==f&&(f=Math.pow(2,h),h++),p[c])m=p[c];else{if(c!==d)return null;m=a+a.charAt(0)}b.push(m),p[d++]=a+m.charAt(0),a=m,0==--f&&(f=Math.pow(2,h),h++)}}};return a}();void 0===(n=function(){return o}.call(t,r,t,e))||(e.exports=n)}}]);