var FS=Object.create;var Fp=Object.defineProperty;var zS=Object.getOwnPropertyDescriptor;var WS=Object.getOwnPropertyNames;var GS=Object.getPrototypeOf,JS=Object.prototype.hasOwnProperty;var w=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var VS=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of WS(t))!JS.call(e,n)&&n!==s&&Fp(e,n,{get:()=>t[n],enumerable:!(r=zS(t,n))||r.enumerable});return e};var zp=(e,t,s)=>(s=e!=null?FS(GS(e)):{},VS(t||!e||!e.__esModule?Fp(s,"default",{value:e,enumerable:!0}):s,e));var sf=w((rD,An)=>{var tf=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",r={};function n(o,a){if(!r[o]){r[o]={};for(var l=0;l<o.length;l++)r[o][o.charAt(l)]=l}return r[o][a]}var i={compressToBase64:function(o){if(o==null)return"";var a=i._compress(o,6,function(l){return t.charAt(l)});switch(a.length%4){default:case 0:return a;case 1:return a+"===";case 2:return a+"==";case 3:return a+"="}},decompressFromBase64:function(o){return o==null?"":o==""?null:i._decompress(o.length,32,function(a){return n(t,o.charAt(a))})},compressToUTF16:function(o){return o==null?"":i._compress(o,15,function(a){return e(a+32)})+" "},decompressFromUTF16:function(o){return o==null?"":o==""?null:i._decompress(o.length,16384,function(a){return o.charCodeAt(a)-32})},compressToUint8Array:function(o){for(var a=i.compress(o),l=new Uint8Array(a.length*2),c=0,p=a.length;c<p;c++){var d=a.charCodeAt(c);l[c*2]=d>>>8,l[c*2+1]=d%256}return l},decompressFromUint8Array:function(o){if(o==null)return i.decompress(o);for(var a=new Array(o.length/2),l=0,c=a.length;l<c;l++)a[l]=o[l*2]*256+o[l*2+1];var p=[];return a.forEach(function(d){p.push(e(d))}),i.decompress(p.join(""))},compressToEncodedURIComponent:function(o){return o==null?"":i._compress(o,6,function(a){return s.charAt(a)})},decompressFromEncodedURIComponent:function(o){return o==null?"":o==""?null:(o=o.replace(/ /g,"+"),i._decompress(o.length,32,function(a){return n(s,o.charAt(a))}))},compress:function(o){return i._compress(o,16,function(a){return e(a)})},_compress:function(o,a,l){if(o==null)return"";var c,p,d={},g={},_="",f="",u="",m=2,b=3,S=2,v=[],y=0,h=0,C;for(C=0;C<o.length;C+=1)if(_=o.charAt(C),Object.prototype.hasOwnProperty.call(d,_)||(d[_]=b++,g[_]=!0),f=u+_,Object.prototype.hasOwnProperty.call(d,f))u=f;else{if(Object.prototype.hasOwnProperty.call(g,u)){if(u.charCodeAt(0)<256){for(c=0;c<S;c++)y=y<<1,h==a-1?(h=0,v.push(l(y)),y=0):h++;for(p=u.charCodeAt(0),c=0;c<8;c++)y=y<<1|p&1,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=p>>1}else{for(p=1,c=0;c<S;c++)y=y<<1|p,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=0;for(p=u.charCodeAt(0),c=0;c<16;c++)y=y<<1|p&1,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=p>>1}m--,m==0&&(m=Math.pow(2,S),S++),delete g[u]}else for(p=d[u],c=0;c<S;c++)y=y<<1|p&1,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=p>>1;m--,m==0&&(m=Math.pow(2,S),S++),d[f]=b++,u=String(_)}if(u!==""){if(Object.prototype.hasOwnProperty.call(g,u)){if(u.charCodeAt(0)<256){for(c=0;c<S;c++)y=y<<1,h==a-1?(h=0,v.push(l(y)),y=0):h++;for(p=u.charCodeAt(0),c=0;c<8;c++)y=y<<1|p&1,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=p>>1}else{for(p=1,c=0;c<S;c++)y=y<<1|p,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=0;for(p=u.charCodeAt(0),c=0;c<16;c++)y=y<<1|p&1,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=p>>1}m--,m==0&&(m=Math.pow(2,S),S++),delete g[u]}else for(p=d[u],c=0;c<S;c++)y=y<<1|p&1,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=p>>1;m--,m==0&&(m=Math.pow(2,S),S++)}for(p=2,c=0;c<S;c++)y=y<<1|p&1,h==a-1?(h=0,v.push(l(y)),y=0):h++,p=p>>1;for(;;)if(y=y<<1,h==a-1){v.push(l(y));break}else h++;return v.join("")},decompress:function(o){return o==null?"":o==""?null:i._decompress(o.length,32768,function(a){return o.charCodeAt(a)})},_decompress:function(o,a,l){var c=[],p,d=4,g=4,_=3,f="",u=[],m,b,S,v,y,h,C,k={val:l(0),position:a,index:1};for(m=0;m<3;m+=1)c[m]=m;for(S=0,y=Math.pow(2,2),h=1;h!=y;)v=k.val&k.position,k.position>>=1,k.position==0&&(k.position=a,k.val=l(k.index++)),S|=(v>0?1:0)*h,h<<=1;switch(p=S){case 0:for(S=0,y=Math.pow(2,8),h=1;h!=y;)v=k.val&k.position,k.position>>=1,k.position==0&&(k.position=a,k.val=l(k.index++)),S|=(v>0?1:0)*h,h<<=1;C=e(S);break;case 1:for(S=0,y=Math.pow(2,16),h=1;h!=y;)v=k.val&k.position,k.position>>=1,k.position==0&&(k.position=a,k.val=l(k.index++)),S|=(v>0?1:0)*h,h<<=1;C=e(S);break;case 2:return""}for(c[3]=C,b=C,u.push(C);;){if(k.index>o)return"";for(S=0,y=Math.pow(2,_),h=1;h!=y;)v=k.val&k.position,k.position>>=1,k.position==0&&(k.position=a,k.val=l(k.index++)),S|=(v>0?1:0)*h,h<<=1;switch(C=S){case 0:for(S=0,y=Math.pow(2,8),h=1;h!=y;)v=k.val&k.position,k.position>>=1,k.position==0&&(k.position=a,k.val=l(k.index++)),S|=(v>0?1:0)*h,h<<=1;c[g++]=e(S),C=g-1,d--;break;case 1:for(S=0,y=Math.pow(2,16),h=1;h!=y;)v=k.val&k.position,k.position>>=1,k.position==0&&(k.position=a,k.val=l(k.index++)),S|=(v>0?1:0)*h,h<<=1;c[g++]=e(S),C=g-1,d--;break;case 2:return u.join("")}if(d==0&&(d=Math.pow(2,_),_++),c[C])f=c[C];else if(C===g)f=b+b.charAt(0);else return null;u.push(f),c[g++]=b+f.charAt(0),d--,b=f,d==0&&(d=Math.pow(2,_),_++)}}};return i}();typeof define=="function"&&define.amd?define(function(){return tf}):typeof An<"u"&&An!=null&&(An.exports=tf)});var tr=w((Go,$_)=>{var zE=Object.prototype.hasOwnProperty;Go=function(e,t){return zE.call(e,t)};$_.exports=Go});var Fe=w((Vn,F_)=>{var WE=tr();Object.keys?Vn=Object.keys:Vn=function(e){var t=[];for(var s in e)WE(e,s)&&t.push(s);return t};F_.exports=Vn});var Xn=w((Kn,G_)=>{var GE=Fe();Kn=function(e){return JE.test(e)?e.replace(VE,KE):e};var z_=Kn.map={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},W_="(?:"+GE(z_).join("|")+")",JE=new RegExp(W_),VE=new RegExp(W_,"g"),KE=function(e){return z_[e]};G_.exports=Kn});var bt=w((Jo,J_)=>{Jo=function(e){return e==null?"":e.toString()};J_.exports=Jo});var K_=w((Vo,V_)=>{Vo=function(e,t,s){return Array.prototype.indexOf.call(e,t,s)};V_.exports=Vo});var Ct=w((Ko,X_)=>{var XE=Object.prototype.toString;Ko=function(e){return XE.call(e)};X_.exports=Ko});var pe=w((Xo,Y_)=>{var YE=Ct();Xo=function(e){return YE(e)==="[object String]"};Y_.exports=Xo});var rs=w((Yo,Q_)=>{var QE=Ct();Yo=function(e){return QE(e)==="[object Number]"};Q_.exports=Yo});var at=w((Qo,Z_)=>{var ZE=Ct();Qo=function(e){var t=ZE(e);return t==="[object Function]"||t==="[object GeneratorFunction]"||t==="[object AsyncFunction]"};Z_.exports=Qo});var ns=w((Zo,ey)=>{var ek=rs(),tk=at(),sk=Math.pow(2,53)-1;Zo=function(e){if(!e)return!1;var t=e.length;return ek(t)&&t>=0&&t<=sk&&!tk(e)};ey.exports=Zo});var tt=w((ea,ty)=>{ea=function(e){return e===void 0};ty.exports=ea});var sa=w((ta,sy)=>{var rk=tt();ta=function(e,t,s){if(rk(t))return e;switch(s??3){case 1:return function(r){return e.call(t,r)};case 3:return function(r,n,i){return e.call(t,r,n,i)};case 4:return function(r,n,i,o){return e.call(t,r,n,i,o)}}return function(){return e.apply(t,arguments)}};sy.exports=ta});var se=w((ra,ry)=>{var nk=ns(),ik=Fe(),ok=sa();ra=function(e,t,s){t=ok(t,s);var r,n;if(nk(e))for(r=0,n=e.length;r<n;r++)t(e[r],r,e);else{var i=ik(e);for(r=0,n=i.length;r<n;r++)t(e[i[r]],i[r],e)}return e};ry.exports=ra});var iy=w((na,ny)=>{var ak=se();na=function(e){var t=[];return ak(e,function(s){t.push(s)}),t};ny.exports=na});var jt=w((ia,oy)=>{var lk=K_(),ck=pe(),pk=ns(),uk=iy();ia=function(e,t){return ck(e)?e.indexOf(t)>-1:(pk(e)||(e=uk(e)),lk(e,t)>=0)};oy.exports=ia});var Cs=w((oa,ay)=>{oa=function(e,t){return e.indexOf(t)===0};ay.exports=oa});var la=w((aa,ly)=>{var dk=bt();aa=function(e){return dk(e).replace(mk,function(t){switch(t){case'"':case"'":case"\\":return"\\"+t;case`
`:return"\\n";case"\r":return"\\r";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029"}})};var mk=/["'\\\n\r\u2028\u2029]/g;ly.exports=aa});var pa=w((ca,cy)=>{ca=function(e,t){var s=e.length-t.length;return s>=0&&e.indexOf(t,s)===s};cy.exports=ca});var lt=w((Yn,py)=>{var fk=Ct();Array.isArray?Yn=Array.isArray:Yn=function(e){return fk(e)==="[object Array]"};py.exports=Yn});var dy=w((ua,uy)=>{var hk=Ct();ua=function(e){return hk(e)==="[object Arguments]"};uy.exports=ua});var Qn=w((da,my)=>{var gk=ns(),_k=lt(),yk=pe(),vk=dy(),bk=Fe();da=function(e){return e==null?!0:gk(e)&&(_k(e)||yk(e)||vk(e))?e.length===0:bk(e).length===0};my.exports=da});var qr=w((ma,fy)=>{ma=function(e){return e.length<1?e:e[0].toUpperCase()+e.slice(1)};fy.exports=ma});var fa=w(sr=>{"use strict";var wk=sr&&sr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(sr,"__esModule",{value:!0});sr.getObjType=void 0;var xk=wk(qr());function Sk(e){return e.constructor&&e.constructor.name?e.constructor.name:xk.default({}.toString.call(e).replace(/(\[object )|]/g,""))}sr.getObjType=Sk});var ze=w((ha,hy)=>{ha=function(e){var t=typeof e;return!!e&&(t==="function"||t==="object")};hy.exports=ha});var Zn=w((ga,_y)=>{var Lk=tt(),gy=se();ga=function(e,t){return function(s){return gy(arguments,function(r,n){if(n!==0){var i=e(r);gy(i,function(o){(!t||Lk(s[o]))&&(s[o]=r[o])})}}),s}};_y.exports=ga});var vy=w((_a,yy)=>{var Ek=Fe(),kk=Zn();_a=kk(Ek);yy.exports=_a});var wy=w((ya,by)=>{var Tk=Fe();ya=function(e,t){var s=Tk(t),r=s.length;if(e==null)return!r;e=Object(e);for(var n=0;n<r;n++){var i=s[n];if(t[i]!==e[i]||!(i in e))return!1}return!0};by.exports=ya});var Sy=w((va,xy)=>{var Ck=vy(),jk=wy();va=function(e){return e=Ck({},e),function(t){return jk(t,e)}};xy.exports=va});var Ey=w((ba,Ly)=>{ba=function(e){return e};Ly.exports=ba});var ei=w((wa,ky)=>{var Mk=tr(),Uk=lt();wa=function(e,t){if(Uk(e))return e;if(t&&Mk(t,e))return[e];var s=[];return e.replace(Ak,function(r,n,i,o){s.push(i?o.replace(Pk,"$1"):n||r)}),s};var Ak=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Pk=/\\(\\)?/g;ky.exports=wa});var Sa=w((xa,Ty)=>{var Ok=tt(),qk=ei();xa=function(e,t){t=qk(t,e);var s;for(s=t.shift();!Ok(s);){if(e=e[s],e==null)return;s=t.shift()}return e};Ty.exports=xa});var jy=w((La,Cy)=>{var Rk=lt(),Ik=Sa();La=function(e){return Rk(e)?function(t){return Ik(t,e)}:Hk(e)};function Hk(e){return function(t){return t?.[e]}}Cy.exports=La});var Rr=w((Ea,My)=>{var Bk=at(),Dk=ze(),Nk=lt(),$k=sa(),Fk=Sy(),zk=Ey(),Wk=jy();Ea=function(e,t,s){return e==null?zk:Bk(e)?$k(e,t,s):Dk(e)&&!Nk(e)?Fk(e):Wk(e)};My.exports=Ea});var rr=w((ka,Uy)=>{var Gk=Rr(),Jk=Fe(),Vk=ns();ka=function(e,t,s){t=Gk(t,s);for(var r=!Vk(e)&&Jk(e),n=(r||e).length,i=Array(n),o=0;o<n;o++){var a=r?r[o]:o;i[o]=t(e[a],a,e)}return i};Uy.exports=ka});var Py=w((Ta,Ay)=>{var Kk=/^\s+/;Ta=function(e,t){if(t==null)return e.trimLeft?e.trimLeft():e.replace(Kk,"");for(var s=0,r=e.length,n=t.length,i=!0,o,a;i&&s<r;)for(i=!1,o=-1,a=e.charAt(s);++o<n;)if(a===t[o]){i=!0,s++;break}return s>=r?"":e.substr(s,r)};Ay.exports=Ta});var qy=w((Ca,Oy)=>{Ca=function(e,t){if(t==null){if(e.trimRight)return e.trimRight();t=` \r
	\f\v`}for(var s=e.length-1,r=t.length,n=!0,i,o;n&&s>=0;)for(n=!1,i=-1,o=e.charAt(s);++i<r;)if(o===t[i]){n=!0,s--;break}return s>=0?e.substring(0,s+1):""};Oy.exports=Ca});var js=w((ja,Ry)=>{var Xk=Py(),Yk=qy();ja=function(e,t){return t==null&&e.trim?e.trim():Xk(Yk(e,t),t)};Ry.exports=ja});var Ua=w((Ma,Iy)=>{Ma=typeof window=="object"&&typeof document=="object"&&document.nodeType===9;Iy.exports=Ma});var ti=w((Aa,Hy)=>{var Qk=Ua();Aa=Qk?window:global;Hy.exports=Aa});var si=w((Pa,By)=>{Pa=function(e){var t=e?e.length:0;if(t)return e[t-1]};By.exports=Pa});var Ny=w((Oa,Dy)=>{var Zk=se(),eT=tt(),tT=at();Oa=function(e,t){eT(t)&&(t=!0);var s=tT(t),r={};return Zk(e,function(n){r[n]=s?t(n):t}),r};Dy.exports=Oa});var Ms=w((qa,$y)=>{var sT=bt();qa=function(e){return sT(e).toLocaleLowerCase()};$y.exports=qa});var Jy=w((Ra,Gy)=>{var ri=si(),rT=Ny(),ni=Cs(),Fy=Ms();Ra=function(e,t){for(var s=[],r,n=e;e;){if(r=!0,!ri(s)||!oT[ri(s)]){if(ni(e,"<!--")){var i=e.indexOf("-->");i>=0&&(t.comment&&t.comment(e.substring(4,i)),e=e.substring(i+3),r=!1)}else if(ni(e,"<!")){var o=e.match(nT);o&&(t.text&&t.text(e.substring(0,o[0].length)),e=e.substring(o[0].length),r=!1)}else if(ni(e,"</")){var a=e.match(zy);a&&(e=e.substring(a[0].length),a[0].replace(zy,f),r=!1)}else if(ni(e,"<")){var l=e.match(Wy);l&&(e=e.substring(l[0].length),l[0].replace(Wy,_),r=!1)}if(r){var c=e.indexOf("<"),p=c<0?e:e.substring(0,c);e=c<0?"":e.substring(c),t.text&&t.text(p)}}else{var d=new RegExp("</".concat(ri(s),"[^>]*>")).exec(e);if(d){var g=e.substring(0,d.index);e=e.substring(d.index+d[0].length),g&&t.text&&t.text(g)}f("",ri(s))}if(n===e)throw Error("Parse Error: "+e);n=e}f();function _(u,m,b,S){if(m=Fy(m),S=!!S,S||s.push(m),t.start){var v={};b.replace(iT,function(y,h,C,k,A){v[h]=C||k||A||""}),t.start(m,v,S)}}function f(u,m){m=Fy(m);var b;if(!m)b=0;else for(b=s.length-1;b>=0&&s[b]!==m;b--);if(b>=0){for(var S=s.length-1;S>=b;S--)t.end&&t.end(s[S]);s.length=b}}};var nT=/^<!\s*doctype((?:\s+[\w:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i,zy=/^<\/([-A-Za-z0-9_]+)[^>]*>/,Wy=/^<([-A-Za-z0-9_]+)((?:\s+[-A-Za-z0-9_:@.]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i,iT=/([-A-Za-z0-9_:@.]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,oT=rT("script,style".split(","));Gy.exports=Ra});var ii=w((Ia,Xy)=>{var aT=ze(),lT=at(),Vy=Object.getPrototypeOf,Ky={}.constructor;Ia=function(e){if(aT(e)){if(Vy)return Vy(e);var t=e.__proto__;if(t||t===null)return t;if(lT(e.constructor))return e.constructor.prototype;if(e instanceof Ky)return Ky.prototype}};Xy.exports=Ia});var Ir=w((Ha,Yy)=>{var cT=Rr(),pT=se();Ha=function(e,t,s){var r=[];return t=cT(t,s),pT(e,function(n,i,o){t(n,i,o)&&r.push(n)}),r};Yy.exports=Ha});var oi=w((Ba,Qy)=>{var uT=Ir();Ba=function(e,t){return t=t||dT,uT(e,function(s,r,n){for(var i=n.length;++r<i;)if(t(s,n[r]))return!1;return!0})};function dT(e,t){return e===t}Qy.exports=Ba});var Hr=w((Na,tv)=>{var Zy=Fe(),mT=ii(),fT=oi(),Da=Object.getOwnPropertyNames,ev=Object.getOwnPropertySymbols;Na=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.prototype,r=s===void 0?!0:s,n=t.unenumerable,i=n===void 0?!1:n,o=t.symbol,a=o===void 0?!1:o,l=[];if((i||a)&&Da){var c=Zy;i&&Da&&(c=Da);do l=l.concat(c(e)),a&&ev&&(l=l.concat(ev(e)));while(r&&(e=mT(e))&&e!==Object.prototype);l=fT(l)}else if(r)for(var p in e)l.push(p);else l=Zy(e);return l};tv.exports=Na});var Us=w(($a,sv)=>{var hT=Zn(),gT=Hr();$a=hT(gT);sv.exports=$a});var Mt=w((Fa,rv)=>{var _T=ns(),yT=rr(),vT=lt(),bT=pe();Fa=function(e){return e?vT(e)?e:_T(e)&&!bT(e)?yT(e):[e]:[]};rv.exports=Fa});var Wa=w((za,iv)=>{var wT=ze();za=function(e){if(!wT(e))return{};if(nv)return nv(e);function t(){}return t.prototype=e,new t};var nv=Object.create;iv.exports=za});var av=w((Ga,ov)=>{var xT=Wa();Ga=function(e,t){e.prototype=xT(t.prototype)};ov.exports=Ga});var Va=w((Ja,lv)=>{var ST=at();Ja=typeof wx<"u"&&ST(wx.openLocation);lv.exports=Ja});var nr=w((ai,mv)=>{var cv=Us(),pv=Mt(),uv=av(),LT=Sa(),ET=Va();ai=function(e,t){return kT.extend(e,t)};function dv(e,t,s){s=s||{};var r=t.className||LT(t,"initialize.name")||"";delete t.className;var n=function(){var i=pv(arguments);return this.initialize?this.initialize.apply(this,i)||this:this};if(!ET)try{n=new Function("toArr","return function "+r+"(){var args = toArr(arguments);return this.initialize ? this.initialize.apply(this, args) || this : this;};")(pv)}catch{}return uv(n,e),n.prototype.constructor=n,n.extend=function(i,o){return dv(n,i,o)},n.inherits=function(i){uv(n,i)},n.methods=function(i){return cv(n.prototype,i),n},n.statics=function(i){return cv(n,i),n},n.methods(t).statics(s),n}var kT=ai.Base=dv(Object,{className:"Base",callSuper:function(e,t,s){var r=e.prototype[t];return r.apply(this,s)},toString:function(){return this.constructor.name}});mv.exports=ai});var hv=w((Ka,fv)=>{Ka=function(e){var t=e.length,s=Array(t);t--;for(var r=0;r<=t;r++)s[t-r]=e[r];return s};fv.exports=Ka});var Ya=w((Xa,gv)=>{var TT=nr(),CT=hv();Xa=TT({initialize:function(){this.clear()},clear:function(){this._items=[],this.size=0},push:function(e){return this._items.push(e),++this.size},pop:function(){if(this.size)return this.size--,this._items.pop()},peek:function(){return this._items[this.size-1]},forEach:function(e,t){t=arguments.length>1?t:this;for(var s=this._items,r=this.size-1,n=0;r>=0;r--,n++)e.call(t,s[r],n,this)},toArr:function(){return CT(this._items)}});gv.exports=Xa});var yv=w((Qa,_v)=>{var jT=Rr(),MT=Fe();Qa=function(e,t,s){t=jT(t,s);for(var r=MT(e),n=r.length,i={},o=0;o<n;o++){var a=r[o];i[a]=t(e[a],a,e)}return i};_v.exports=Qa});var xv=w((el,wv)=>{var UT=Jy(),AT=Ya(),bv=lt(),vv=se(),PT=pe(),OT=yv();function qT(e){var t=[],s=new AT;return UT(e,{start:function(r,n){n=OT(n,function(i){return RT(i)}),s.push({tag:r,attrs:n})},end:function(){var r=s.pop();if(!s.size){t.push(r);return}var n=s.peek();bv(n.content)||(n.content=[]),n.content.push(r)},comment:function(r){var n="<!--".concat(r,"-->"),i=s.peek();if(!i){t.push(n);return}i.content||(i.content=[]),i.content.push(n)},text:function(r){var n=s.peek();if(!n){t.push(r);return}n.content||(n.content=[]),n.content.push(r)}}),t}function Za(e){var t="";return bv(e)?vv(e,function(s){return t+=Za(s)}):PT(e)?t=e:(t+="<".concat(e.tag),vv(e.attrs,function(s,r){return t+=" ".concat(r,'="').concat(IT(s),'"')}),t+=">",e.content&&(t+=Za(e.content)),t+="</".concat(e.tag,">")),t}var RT=function(e){return e.replace(/&quot;/g,'"')},IT=function(e){return e.replace(/"/g,"&quot;")};el={parse:qT,stringify:Za};wv.exports=el});var ir=w((tl,Lv)=>{var HT=rs(),Sv=ze(),BT=at(),DT=pe();tl=function(e){if(HT(e))return e;if(Sv(e)){var t=BT(e.valueOf)?e.valueOf():e;e=Sv(t)?t+"":t}return DT(e)?+e:e===0?e:+e};Lv.exports=tl});var ci=w(Se=>{"use strict";var As=Se&&Se.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Se,"__esModule",{value:!0});Se.pxToNum=Se.executeAfterTransition=Se.hasVerticalScrollbar=Se.measuredScrollbarWidth=Se.eventClient=Se.drag=Se.classPrefix=void 0;var NT=As(rr()),$T=As(js()),FT=As(ti()),Ev=As(xv()),zT=As(rs()),WT=As(jt()),GT=As(ir());function JT(e){let t=`luna-${e}-`;function s(r){return NT.default($T.default(r).split(/\s+/),n=>WT.default(n,t)?n:n.replace(/[\w-]+/,i=>`${t}${i}`)).join(" ")}return function(r){if(/<[^>]*>/g.test(r))try{let n=Ev.default.parse(r);return kv(n,i=>{i.attrs&&i.attrs.class&&(i.attrs.class=s(i.attrs.class))}),Ev.default.stringify(n)}catch{return s(r)}return s(r)}}Se.classPrefix=JT;function kv(e,t){for(let s=0,r=e.length;s<r;s++){let n=e[s];t(n),n.content&&kv(n.content,t)}}var VT="ontouchstart"in FT.default,KT={start:"touchstart",move:"touchmove",end:"touchend"},XT={start:"mousedown",move:"mousemove",end:"mouseup"};function YT(e){return VT?KT[e]:XT[e]}Se.drag=YT;function QT(e,t){let s=e==="x"?"clientX":"clientY";return t[s]?t[s]:t.changedTouches?t.changedTouches[0][s]:0}Se.eventClient=QT;var li;function ZT(){if(zT.default(li))return li;if(!document)return 16;let e=document.createElement("div"),t=document.createElement("div");return e.setAttribute("style","display: block; width: 100px; height: 100px; overflow: scroll;"),t.setAttribute("style","height: 200px"),e.appendChild(t),document.body.appendChild(e),li=e.offsetWidth-e.clientWidth,document.body.removeChild(e),li}Se.measuredScrollbarWidth=ZT;function e1(e){return e.scrollHeight>e.offsetHeight}Se.hasVerticalScrollbar=e1;function t1(e,t){let s=r=>{r.target===e&&(e.removeEventListener("transitionend",s),t())};e.addEventListener("transitionend",s)}Se.executeAfterTransition=t1;function s1(e){return GT.default(e.replace("px",""))}Se.pxToNum=s1});var Mv=w(Br=>{"use strict";var is=Br&&Br.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Br,"__esModule",{value:!0});var r1=is(Xn()),n1=is(bt()),i1=is(jt()),o1=is(Cs()),a1=is(la()),Tv=is(se()),l1=is(pa()),c1=is(Qn()),Cv=fa(),p1=ci(),or=p1.classPrefix("console");function rl(e,{topObj:t,level:s=0,getterVal:r=!1,unenumerable:n=!0}={}){let i="",o="",l=[],c=[],p="",g;t=t||e;let _={getterVal:r,unenumerable:n,level:s+1},f=s===0,u=`<span class="${or("key")}">`,m=`<span class="${or("number")}">`,b=`<span class="${or("null")}">`,S=`<span class="${or("string")}">`,v=`<span class="${or("boolean")}">`,y=`<span class="${or("special")}">`,h=W=>r1.default(W).replace(/\\n/g,"\u21B5").replace(/\\f|\\r|\\t/g,"").replace(/\\/g,""),C="</span>",k=W=>u+h(W)+C,A=W=>m+W+C,B=W=>S+W+C,Me=W=>v+W+C,xe=W=>b+W+C;function ge(W){return W=n1.default(W),i1.default(u1,W)||o1.default(W,"Array[")?y+h(W)+C:S+h(`"${W}"`)+C}function K(W){if(g>5){p=", \u2026";return}let be=k(sl(W));if(!r){let Ue=Object.getOwnPropertyDescriptor(e,W);if(Ue&&Ue.get){l.push(`${be}: ${ge("(...)")}`),g++;return}}l.push(`${be}: ${rl(t[W],_)}`),g++}try{o={}.toString.call(e)}catch{o="[object Object]"}let ve=o=="[object String]",O=o=="[object Array]",G=o=="[object Object]",te=o=="[object Number]",de=o=="[object RegExp]",ft=o=="[object Symbol]",Lt=o=="[object Function]",$e=o=="[object Boolean]";if(ve)i=ge(sl(e));else if(de)i=B(sl(e.toString()));else if(Lt)i=ge("\u0192");else if(O)if(f){i="[";let W=e.length,be="";W>100&&(W=100,be=", \u2026");for(let Ue=0;Ue<W;Ue++)l.push(`${rl(e[Ue],_)}`);i+=l.join(", ")+be+"]"}else i=`Array(${e.length})`;else if(G)jv(e)&&(e=Object.getPrototypeOf(e)),c=n?Object.getOwnPropertyNames(e):Object.keys(e),f?(g=1,i="{",Tv.default(c,K),i+=l.join(", ")+p+"}"):(i=Cv.getObjType(e),i==="Object"&&(i="{\u2026}"));else if(te)i=e+"",l1.default(i,"Infinity")||i==="NaN"?i=`"${i}"`:i=A(i);else if($e)i=Me(e?"true":"false");else if(e===null)i=xe("null");else if(ft)i=ge("Symbol");else if(e===void 0)i=ge("undefined");else try{jv(e)&&(e=Object.getPrototypeOf(e)),f?(g=1,i="{",c=n?Object.getOwnPropertyNames(e):Object.keys(e),Tv.default(c,K),i+=l.join(", ")+p+"}"):(i=Cv.getObjType(e),i==="Object"&&(i="{\u2026}"))}catch{i=ge(e)}return i}Br.default=rl;var u1=["(...)","undefined","Symbol","Object","\u0192"];function jv(e){let t=c1.default(Object.getOwnPropertyNames(e)),s=Object.getPrototypeOf(e);return t&&s&&s!==Object.prototype}function sl(e){return a1.default(e).replace(/\\'/g,"'").replace(/\t/g,"\\t")}});var Av=w((nl,Uv)=>{nl=function(e,t,s){var r=e.length;t==null?t=0:t<0?t=Math.max(r+t,0):t=Math.min(t,r),s==null?s=r:s<0?s=Math.max(r+s,0):s=Math.min(s,r);for(var n=[];t<s;)n.push(e[t++]);return n};Uv.exports=nl});var pi=w((il,Pv)=>{il=function(e,t){return t=t==null?e.length-1:+t,function(){var s=Math.max(arguments.length-t,0),r=new Array(s),n;for(n=0;n<s;n++)r[n]=arguments[n+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var i=new Array(t+1);for(n=0;n<t;n++)i[n]=arguments[n];return i[t]=r,e.apply(this,i)}};Pv.exports=il});var qv=w((ol,Ov)=>{var d1=pi(),m1=Mt();ol=d1(function(e,t){return function(){var s=[];return s=s.concat(t),s=s.concat(m1(arguments)),e.apply(this,s)}});Ov.exports=ol});var Iv=w((al,Rv)=>{al=function(e,t){var s;return function(){return--e>0&&(s=t.apply(this,arguments)),e<=1&&(t=null),s}};Rv.exports=al});var Bv=w((ll,Hv)=>{var f1=qv(),h1=Iv();ll=f1(h1,2);Hv.exports=ll});var pl=w((cl,Dv)=>{var g1=ze(),_1=lt(),y1=Us();cl=function(e){return g1(e)?_1(e)?e.slice():y1({},e):e};Dv.exports=cl});var Dr=w((ui,Fv)=>{var v1=nr(),Nv=tr(),$v=se(),b1=Av(),w1=Bv(),x1=pl();ui=v1({initialize:function(){this._events=this._events||{}},on:function(e,t){return this._events[e]=this._events[e]||[],this._events[e].push(t),this},off:function(e,t){var s=this._events;if(Nv(s,e)){var r=s[e].indexOf(t);return r>-1&&s[e].splice(r,1),this}},once:function(e,t){return this.on(e,w1(t)),this},emit:function(e){var t=this;if(Nv(this._events,e)){var s=b1(arguments,1),r=x1(this._events[e]);return $v(r,function(n){return n.apply(t,s)},this),this}},removeAllListeners:function(e){return e?delete this._events[e]:this._events={},this}},{mixin:function(e){$v(["on","off","once","emit","removeAllListeners"],function(t){e[t]=ui.prototype[t]}),e._events=e._events||{}}});Fv.exports=ui});var dl=w((ul,zv)=>{ul=function(e){return e===!0||e===!1};zv.exports=ul});var Gv=w((ml,Wv)=>{ml=function(e){return e==null};Wv.exports=ml});var hl=w((fl,Jv)=>{var S1=Gv();fl=function(e){if(S1(e))return"";try{return L1.call(e)}catch{}try{return e+""}catch{}return""};var L1=Function.prototype.toString;Jv.exports=fl});var _l=w((gl,Kv)=>{var E1=ze(),Vv=at();gl=function(e){return E1(e)&&Vv(e.then)&&Vv(e.catch)};Kv.exports=gl});var vl=w((yl,Xv)=>{var k1=rs();yl=function(e){return k1(e)&&e!==+e};Xv.exports=yl});var Qv=w((bl,Yv)=>{var T1=at();bl=function(e){return e==null?!1:e._isBuffer?!0:e.constructor&&T1(e.constructor.isBuffer)&&e.constructor.isBuffer(e)};Yv.exports=bl});var xl=w((wl,Zv)=>{var C1=Ct(),j1=vl(),M1=Ms(),U1=Qv();wl=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,s;return e===null&&(s="Null"),e===void 0&&(s="Undefined"),j1(e)&&(s="NaN"),U1(e)&&(s="Buffer"),s||(s=C1(e).match(A1),s&&(s=s[1])),s?t?M1(s):s:""};var A1=/^\[object\s+(.*?)]$/;Zv.exports=wl});var tb=w((Sl,eb)=>{var P1=pi();Sl=P1(function(e,t){for(var s=e.length,r=0,n=t.length;r<n;r++)for(var i=t[r],o=0,a=i.length;o<a;o++)e[s++]=i[o];return e.length=s,e});eb.exports=Sl});var Ll=w((Nr,sb)=>{var O1=nr(),q1=pe(),R1=se(),I1=tb();Nr=O1({className:"Select",initialize:function(e){if(this.length=0,!e)return this;if(q1(e))return H1.find(e);e.nodeType&&(this[0]=e,this.length=1)},find:function(e){var t=new Nr;return this.each(function(){I1(t,this.querySelectorAll(e))}),t},each:function(e){return R1(this,function(t,s){e.call(t,s,t)}),this}});var H1=new Nr(document);sb.exports=Nr});var wt=w((El,rb)=>{var B1=pe(),D1=Mt(),N1=Ll();El=function(e){return D1(B1(e)?new N1(e):e)};rb.exports=El});var ib=w((kl,nb)=>{var $1=wt();kl=function(e){e=$1(e);var t=e[0],s=t.getBoundingClientRect();return{left:s.left+window.pageXOffset,top:s.top+window.pageYOffset,width:Math.round(s.width),height:Math.round(s.height)}};nb.exports=kl});var ab=w((Cl,ob)=>{var F1=se(),z1=wt();Cl=function(e){e=z1(e),F1(e,function(t){W1(t)&&(t.style.display=G1(t.nodeName))})};function W1(e){return getComputedStyle(e,"").getPropertyValue("display")=="none"}var Tl={};function G1(e){var t,s;return Tl[e]||(t=document.createElement(e),document.documentElement.appendChild(t),s=getComputedStyle(t,"").getPropertyValue("display"),t.parentNode.removeChild(t),s=="none"&&(s="block"),Tl[e]=s),Tl[e]}ob.exports=Cl});var Ml=w((jl,lb)=>{var J1=/([A-Z])/g,V1=/[_.\- ]+/g,K1=/(^-)|(-$)/g;jl=function(e){return e=e.replace(J1,"-$1").toLowerCase().replace(V1,"-").replace(K1,""),e.split("-")};lb.exports=jl});var Al=w((Ul,cb)=>{var X1=Ml();Ul=function(e){return X1(e).join("-")};cb.exports=Ul});var ub=w((Pl,pb)=>{var Y1=tr();Pl=function(e,t){var s=function(r){var n=s.cache,i=""+(t?t.apply(this,arguments):r);return Y1(n,i)||(n[i]=e.apply(this,arguments)),n[i]};return s.cache={},s};pb.exports=Pl});var mb=w((Ol,db)=>{var Q1=Ml();Ol=function(e){var t=Q1(e),s=t[0];return t.shift(),t.forEach(Z1,t),s+=t.join(""),s};function Z1(e,t){this[t]=e.replace(/\w/,function(s){return s.toUpperCase()})}db.exports=Ol});var bb=w(($r,vb)=>{var _b=ub(),eC=mb(),tC=qr(),fb=tr(),sC=Al();$r=_b(function(e){if(e=e.replace(yb,""),e=eC(e),fb(gb,e))return e;for(var t=hb.length;t--;){var s=hb[t]+tC(e);if(fb(gb,s))return s}return e});$r.dash=_b(function(e){var t=$r(e);return(yb.test(t)?"-":"")+sC(t)});var hb=["O","ms","Moz","Webkit"],yb=/^(O)|(ms)|(Moz)|(Webkit)|(-o-)|(-ms-)|(-moz-)|(-webkit-)/g,gb=document.createElement("p").style;vb.exports=$r});var Rl=w((ql,Sb)=>{var rC=pe(),nC=ze(),iC=Al(),oC=tt(),aC=jt(),lC=rs(),cC=wt(),xb=bb(),wb=se();ql=function(e,t,s){e=cC(e);var r=oC(s)&&rC(t);if(r)return pC(e[0],t);var n=t;nC(n)||(n={},n[t]=s),uC(e,n)};function pC(e,t){return e.style[xb(t)]||getComputedStyle(e,"").getPropertyValue(t)}function uC(e,t){wb(e,function(s){var r=";";wb(t,function(n,i){i=xb.dash(i),r+=i+":"+mC(i,n)+";"}),s.style.cssText+=r})}var dC=["column-count","columns","font-weight","line-weight","opacity","z-index","zoom"];function mC(e,t){var s=lC(t)&&!aC(dC,iC(e));return s?t+"px":t}Sb.exports=ql});var Il=w((mi,Eb)=>{var fC=Mt(),hC=ze(),gC=pe(),di=se(),_C=tt(),Lb=wt();mi=function(e,t,s){e=Lb(e);var r=_C(s)&&gC(t);if(r)return yC(e[0],t);var n=t;hC(n)||(n={},n[t]=s),vC(e,n)};mi.remove=function(e,t){e=Lb(e),t=fC(t),di(e,function(s){di(t,function(r){s.removeAttribute(r)})})};function yC(e,t){return e.getAttribute(t)}function vC(e,t){di(e,function(s){di(t,function(r,n){s.setAttribute(n,r)})})}Eb.exports=mi});var Tb=w((Bl,kb)=>{var bC=tt(),wC=se(),xC=wt();Bl={html:Hl("innerHTML"),text:Hl("textContent"),val:Hl("value")};function Hl(e){return function(t,s){t=xC(t);var r=t[0];if(bC(s))return r?r[e]:"";r&&wC(t,function(n){n[e]=s})}}kb.exports=Bl});var jb=w((Dl,Cb)=>{var SC=se(),LC=wt();Dl=function(e){e=LC(e),SC(e,function(t){var s=t.parentNode;s&&s.removeChild(t)})};Cb.exports=Dl});var Ub=w((Nl,Mb)=>{var EC=Il(),kC=pe(),TC=ze(),CC=se(),F6=wt();Nl=function(e,t,s){var r=t;return kC(t)&&(r="data-"+t),TC(t)&&(r={},CC(t,function(n,i){r["data-"+i]=n})),EC(e,r,s)};Mb.exports=Nl});var Pb=w((fi,Ab)=>{var jC=nr(),MC=jt();function $l(){return!0}function Fl(){return!1}function UC(e){var t=this.events[e.type],s,r=AC.call(this,e,t);e=new fi.Event(e);for(var n=0,i,o,a;(o=r[n++])&&!e.isPropagationStopped();)for(e.curTarget=o.el,i=0;(s=o.handlers[i++])&&!e.isImmediatePropagationStopped();)a=s.handler.apply(o.el,[e]),a===!1&&(e.preventDefault(),e.stopPropagation())}function AC(e,t){var s=e.target,r=[],n=t.delegateCount,i,o,a,l;if(s.nodeType)for(;s!==this;s=s.parentNode||this){for(o=[],l=0;l<n;l++)a=t[l],i=a.selector+" ",o[i]===void 0&&(o[i]=MC(this.querySelectorAll(i),s)),o[i]&&o.push(a);o.length&&r.push({el:s,handlers:o})}return n<t.length&&r.push({el:this,handlers:t.slice(n)}),r}fi={add:function(e,t,s,r){var n={selector:s,handler:r},i;e.events||(e.events={}),(i=e.events[t])||(i=e.events[t]=[],i.delegateCount=0,e.addEventListener(t,function(){UC.apply(e,arguments)},!1)),s?i.splice(i.delegateCount++,0,n):i.push(n)},remove:function(e,t,s,r){var n=e.events;if(!(!n||!n[t]))for(var i=n[t],o=i.length,a;o--;)a=i[o],(!s||a.selector==s)&&a.handler==r&&(i.splice(o,1),a.selector&&i.delegateCount--)},Event:jC({className:"Event",initialize:function(t){this.origEvent=t},isDefaultPrevented:Fl,isPropagationStopped:Fl,isImmediatePropagationStopped:Fl,preventDefault:function(){var e=this.origEvent;this.isDefaultPrevented=$l,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.origEvent;this.isPropagationStopped=$l,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.origEvent;this.isImmediatePropagationStopped=$l,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}})};Ab.exports=fi});var Rb=w((zl,qb)=>{var PC=Pb(),OC=tt(),qC=wt(),RC=se();zl={on:Ob("add"),off:Ob("remove")};function Ob(e){return function(t,s,r,n){t=qC(t),OC(n)&&(n=r,r=void 0),RC(t,function(i){PC[e](i,s,r,n)})}}qb.exports=zl});var Hb=w((Wl,Ib)=>{var IC=Rr(),HC=ns(),BC=Fe();Wl=function(e,t,s){t=IC(t,s);for(var r=!HC(e)&&BC(e),n=(r||e).length,i=0;i<n;i++){var o=r?r[i]:i;if(t(e[o],o,e))return!0}return!1};Ib.exports=Wl});var Gl=w((Ps,Db)=>{var DC=Mt(),NC=Hb(),hi=wt(),$C=pe(),Fr=se();Ps={add:function(e,t){e=hi(e);var s=Bb(t);Fr(e,function(r){var n=[];Fr(s,function(i){Ps.has(r,i)||n.push(i)}),n.length!==0&&(r.className+=(r.className?" ":"")+n.join(" "))})},has:function(e,t){e=hi(e);var s=new RegExp("(^|\\s)"+t+"(\\s|$)");return NC(e,function(r){return s.test(r.className)})},toggle:function(e,t){e=hi(e),Fr(e,function(s){if(!Ps.has(s,t))return Ps.add(s,t);Ps.remove(s,t)})},remove:function(e,t){e=hi(e);var s=Bb(t);Fr(e,function(r){Fr(s,function(n){r.classList.remove(n)})})}};function Bb(e){return $C(e)?e.split(/\s+/):DC(e)}Db.exports=Ps});var $b=w((Jl,Nb)=>{var FC=se(),zC=wt(),WC=pe();Jl={before:gi("beforebegin"),after:gi("afterend"),append:gi("beforeend"),prepend:gi("afterbegin")};function gi(e){return function(t,s){t=zC(t),FC(t,function(r){if(WC(s))r.insertAdjacentHTML(e,s);else{var n=r.parentNode;switch(e){case"beforebegin":n&&n.insertBefore(s,r);break;case"afterend":n&&n.insertBefore(s,r.nextSibling);break;case"beforeend":r.appendChild(s);break;case"afterbegin":r.prepend(s);break}}})}}Nb.exports=Jl});var zr=w((Os,Gb)=>{var Wb=Ll(),GC=ib(),JC=ab(),VC=Rl(),Fb=Il(),Vl=Tb(),KC=si(),XC=jb(),YC=Ub(),zb=Rb(),_i=Gl(),yi=$b(),vi=tt(),QC=pe();Os=function(e){return new Wb(e)};Wb.methods({offset:function(){return GC(this)},hide:function(){return this.css("display","none")},show:function(){return JC(this),this},first:function(){return Os(this[0])},last:function(){return Os(KC(this))},get:function(e){return this[e]},eq:function(e){return Os(this[e])},on:function(e,t,s){return zb.on(this,e,t,s),this},off:function(e,t,s){return zb.off(this,e,t,s),this},html:function(e){var t=Vl.html(this,e);return vi(e)?t:this},text:function(e){var t=Vl.text(this,e);return vi(e)?t:this},val:function(e){var t=Vl.val(this,e);return vi(e)?t:this},css:function(e,t){var s=VC(this,e,t);return Kl(e,t)?s:this},attr:function(e,t){var s=Fb(this,e,t);return Kl(e,t)?s:this},data:function(e,t){var s=YC(this,e,t);return Kl(e,t)?s:this},rmAttr:function(e){return Fb.remove(this,e),this},remove:function(){return XC(this),this},addClass:function(e){return _i.add(this,e),this},rmClass:function(e){return _i.remove(this,e),this},toggleClass:function(e){return _i.toggle(this,e),this},hasClass:function(e){return _i.has(this,e)},parent:function(){return Os(this[0].parentNode)},append:function(e){return yi.append(this,e),this},prepend:function(e){return yi.prepend(this,e),this},before:function(e){return yi.before(this,e),this},after:function(e){return yi.after(this,e),this}});var Kl=function(e,t){return vi(t)&&QC(e)};Gb.exports=Os});var Kb=w((Xl,Vb)=>{var ZC=lt();Xl=function(e){return Jb(e,[])};function Jb(e,t){for(var s=e.length,r=-1,n;s--;)n=e[++r],ZC(n)?Jb(n,t):t.push(n);return t}Vb.exports=Xl});var Ql=w((Yl,Xb)=>{var ej=pi(),tj=Kb(),sj=Ir(),rj=jt();Yl=ej(function(e,t){return t=tj(t),sj(e,function(s){return!rj(t,s)})});Xb.exports=Yl});var ec=w((Zl,Yb)=>{Zl=function(e,t){var s=[];t=t||1;for(var r=0,n=Math.ceil(e.length/t);r<n;r++){var i=r*t,o=i+t;s.push(e.slice(i,o))}return s};Yb.exports=Zl});var bi=w((tc,Qb)=>{tc=function(){};Qb.exports=tc});var Zb=w(Wr=>{"use strict";var nj=Wr&&Wr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Wr,"__esModule",{value:!0});var ij=nj(Us()),sc=class{constructor(){this.id=0,this.visited=[]}set(t,s){let{visited:r,id:n}=this,i={id:n,val:t};return ij.default(i,s),r.push(i),this.id++,n}get(t){let{visited:s}=this;for(let r=0,n=s.length;r<n;r++){let i=s[r];if(t===i.val)return i}return!1}};Wr.default=sc});var nc=w(Ut=>{"use strict";var Gr=Ut&&Ut.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ut,"__esModule",{value:!0});Ut.sortObjName=Ut.getFnAbstract=Ut.encode=void 0;var rc=Gr(bt()),oj=Gr(js()),ew=Gr(ir()),wi=Gr(Cs()),aj=Gr(Xn());Ut.encode=e=>aj.default(rc.default(e)).replace(/\n/g,"\u21B5").replace(/\f|\r|\t/g,"");function lj(e){return e.length>500&&(e=e.slice(0,500)+"..."),"\u0192 "+oj.default(pj(e).replace("function",""))}Ut.getFnAbstract=lj;var cj=/function(.*?)\((.*?)\)/;function pj(e){let t=e.match(cj);return t?t[0]:e}function uj(e,t){e=rc.default(e),t=rc.default(t);let s=ew.default(e),r=ew.default(t);if(!isNaN(s)&&!isNaN(r))return s>r?1:s<r?-1:0;(wi.default(e,"get ")||wi.default(e,"set "))&&(e=e.slice(4)),(wi.default(t,"get ")||wi.default(t,"set "))&&(t=t.slice(4));let n=e.length,i=t.length,o=n>i?i:n;for(let a=0;a<o;a++){let l=e.charCodeAt(a),c=t.charCodeAt(a),p=dj(l,c);if(p!==0)return p}return n>i?1:n<i?-1:0}Ut.sortObjName=uj;function dj(e,t){return e=tw(e),t=tw(t),e>t?1:e<t?-1:0}function tw(e){return e===95?123:e}});var oc=w((ic,sw)=>{var mj=0;ic=function(e){var t=++mj+"";return e?e+t:t};sw.exports=ic});var ac=w(ar=>{"use strict";var rw=ar&&ar.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ar,"__esModule",{value:!0});ar.classPrefix=void 0;var fj=rw(rr()),hj=rw(js());function gj(e){let t=`luna-${e}-`;return function(s){return fj.default(hj.default(s).split(/\s+/),r=>`${t}${r}`).join(" ")}}ar.classPrefix=gj});var lw=w(qs=>{"use strict";var We=qs&&qs.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(qs,"__esModule",{value:!0});qs.getObjAbstract=void 0;var nw=We(zr()),_j=We(Cs()),lc=We(ze()),iw=We(oc()),yj=We(qr()),vj=We(ir()),bj=We(ec()),Jr=We(se()),wj=We(vl()),xj=We(rs()),Sj=We(dl()),Lj=We(pe()),Ej=We(Fe()),kj=We(Ms()),Tj=We(Dr()),lr=nc(),Cj=ac(),Le=Cj.classPrefix("object-viewer"),cc=class extends Tj.default{constructor(t){super(),this.onItemClick=s=>{let{map:r}=this,n=nw.default(s.curTarget),i=n.data("object-id"),o=n.find("span").eq(0);if(n.data("first-level")||(i&&(n.find("ul").html(this.objToHtml(r[i],!1)),n.rmAttr("data-object-id")),s.stopImmediatePropagation(),!o.hasClass(Le("expanded"))))return;let a=n.find("ul").eq(0);o.hasClass(Le("collapsed"))?(o.rmClass(Le("collapsed")),a.show()):(o.addClass(Le("collapsed")),a.hide()),this.emit("change")},this.$container=nw.default(t),this.$container.addClass("luna-object-viewer"),this.bindEvent()}set(t){Lj.default(t)&&(t=JSON.parse(t)),this.data={id:iw.default("json"),enumerable:{0:t}},this.map={},ow(this.map,this.data),this.appendTpl()}destroy(){this.$container.off("click","li",this.onItemClick),this.$container.rmClass("luna-object-viewer"),this.$container.html("")}objToHtml(t,s){let r="";return Jr.default(["enumerable","unenumerable","symbol"],n=>{if(!t[n])return;let i=Ej.default(t[n]);i.sort(lr.sortObjName);for(let o=0,a=i.length;o<a;o++){let l=i[o];r+=this.createEl(l,t[n][l],n,s)}}),t.proto&&(r===""?r=this.objToHtml(t.proto):r+=this.createEl("__proto__",t.proto,"proto")),r}createEl(t,s,r,n=!1){let i=typeof s;if(s===null)return`<li>${o(t)}<span class="${Le("null")}">null</span></li>`;if(xj.default(s)||Sj.default(s))return`<li>${o(t)}<span class="${Le(i)}">${lr.encode(s)}</span></li>`;if(s.type==="RegExp"&&(i="regexp"),s.type==="Number"&&(i="number"),s.type==="Number"||s.type==="RegExp")return`<li>${o(t)}<span class="${Le(i)}">${lr.encode(s.value)}</span></li>`;if(s.type==="Undefined"||s.type==="Symbol")return`<li>${o(t)}<span class="${Le("special")}">${kj.default(s.type)}</span></li>`;if(s==="(...)")return`<li>${o(t)}<span class="${Le("special")}">${s}</span></li>`;if(lc.default(s)){let a=s.id,l=s.reference,c=aw(s)||yj.default(i),p=n?"":`<span class="${Le("expanded collapsed")}"><span class="${Le("icon icon-caret-right")}"></span><span class="${Le("icon icon-caret-down")}"></span></span>`,d=`<li ${n?'data-first-level="true"':""} ${'data-object-id="'+(l||a)+'"'}>${p}${o(t)}<span class="${Le("open")}">${n?"":c}</span><ul class="${Le(i)}" ${n?"":'style="display:none"'}>`;return n&&(d+=this.objToHtml(this.map[a])),d+`</ul><span class="${Le("close")}"></span></li>`}function o(a){if(n||lc.default(s)&&s.jsonSplitArr)return"";let l=Le("key");return(r==="unenumerable"||r==="proto"||r==="symbol")&&(l=Le("key-lighter")),`<span class="${l}">${lr.encode(a)}</span>: `}return`<li>${o(t)}<span class="${Le(typeof s)}">"${lr.encode(s)}"</span></li>`}appendTpl(){let t=this.map[this.data.id];this.$container.html(this.objToHtml(t,!0))}bindEvent(){this.$container.on("click","li",this.onItemClick)}};qs.default=cc;function ow(e,t){let s=t.id;if(!s&&s!==0)return;if(t.type&&_j.default(t.type,"Array")&&t.enumerable){let i=Mj(t,s,t.type);i.length>100&&(t=jj(i))}e[s]=t;let n=[];Jr.default(["enumerable","unenumerable","symbol"],i=>{if(t[i])for(let o in t[i])n.push(t[i][o])}),t.proto&&n.push(t.proto);for(let i=0,o=n.length;i<o;i++){let a=n[i];lc.default(a)&&ow(e,a)}}function jj(e){let t=0,s={};Jr.default(bj.default(e,100),n=>{let i={},o=t;i.type="["+o,i.enumerable={},Jr.default(n,l=>{i.enumerable[t]=l,t+=1});let a=t-1;i.type+=(a-o>0?" \u2026 "+a:"")+"]",i.id=iw.default("json"),i.jsonSplitArr=!0,s[t]=i});let r={};return r.enumerable=s,r.id=e.id,r.type=e.type,e.unenumerable&&(r.unenumerable=e.unenumerable),e.symbol&&(r.symbol=e.symbol),e.proto&&(r.proto=e.proto),r}function Mj(e,t,s){let r=[],n={};return Jr.default(e.enumerable,(i,o)=>{let a=vj.default(o);wj.default(a)?n[o]=i:r[a]=i}),r.enumerable=n,r.type=s,r.id=t,e.unenumerable&&(r.unenumerable=e.unenumerable),e.symbol&&(r.symbol=e.symbol),e.proto&&(r.proto=e.proto),r}function aw(e){let{type:t,value:s}=e;if(t)return t==="Function"?lr.getFnAbstract(s):t==="Array"&&e.unenumerable?`Array(${e.unenumerable.length})`:e.type}qs.getObjAbstract=aw});var hw=w((dc,fw)=>{"use strict";var ue=dc&&dc.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},pc,Uj=ue(Dr()),Aj=ue(ii()),Pj=ue(rs()),Oj=ue(dl()),qj=ue(Ms()),cw=ue(ze()),Rj=ue(lt()),Ij=ue(qr()),pw=ue(Fe()),uc=ue(se()),Hj=ue(hl()),Bj=ue(_l()),Dj=ue(xl()),uw=ue(zr()),Nj=ue(Ql()),dw=ue(Hr()),mw=ue(Ir()),$j=ue(ec()),Fj=ue(bt()),zj=ue(bi()),Wj=ue(Zb()),cr=nc(),Gj=ue(lw()),Jj=ac(),Ee=Jj.classPrefix("object-viewer");function Vj(e,t){if(t)return t==="Function"?cr.getFnAbstract(Hj.default(e)):t==="Array"?`Array(${e.length})`:t}fw.exports=(pc=class extends Uj.default{constructor(t,{unenumerable:s=!1,accessGetter:r=!1}={}){super(),this.onItemClick=n=>{let{map:i}=this,o=uw.default(n.curTarget),a=o.data("object-id"),l=o.find("span").eq(0);if(o.data("first-level")||(a&&(o.find("ul").html(this.objToHtml(i[a],!1)),o.rmAttr("data-object-id")),n.stopImmediatePropagation(),!l.hasClass(Ee("expanded"))))return;let c=o.find("ul").eq(0);l.hasClass(Ee("collapsed"))?(l.rmClass(Ee("collapsed")),c.show()):(l.addClass(Ee("collapsed")),c.hide()),this.emit("change")},this.$container=uw.default(t),this.$container.addClass("luna-object-viewer"),this.unenumerable=s,this.accessGetter=r,this.bindEvent()}set(t){this.data=[t],this.visitor=new Wj.default,this.map={},this.appendTpl()}destroy(){this.$container.off("click","li",this.onItemClick),this.$container.rmClass("luna-object-viewer"),this.$container.html("")}objToHtml(t,s){let{visitor:r}=this,n=t,i=!1,o=r.get(t);o&&o.self&&(n=o.self);let a="",l=["enumerable"],c=pw.default(t),p=[],d=[],g=[],_={};if(this.unenumerable&&!s&&(l.push("unenumerable"),l.push("symbol"),p=Nj.default(dw.default(t,{prototype:!1,unenumerable:!0}),c),d=mw.default(dw.default(t,{prototype:!1,symbol:!0}),u=>typeof u=="symbol")),Rj.default(t)&&t.length>100){l.unshift("virtual"),i=!0;let u=0,m={};uc.default($j.default(t,100),b=>{let S=Object.create(null),v=u,y="["+v;uc.default(b,C=>{S[u]=C,m[u]=!0,u++});let h=u-1;y+=(h-v>0?" \u2026 "+h:"")+"]",_[y]=S}),g=pw.default(_),c=mw.default(c,b=>!m[b])}uc.default(l,u=>{let m=[];u==="symbol"?m=d:u==="unenumerable"?m=p:u==="virtual"?m=g:m=c,i||m.sort(cr.sortObjName);for(let b=0,S=m.length;b<S;b++){let v=Fj.default(m[b]),y="",h=Object.getOwnPropertyDescriptor(t,v),C=h&&h.get,k=h&&h.set;if(C&&!this.accessGetter)y="(...)";else try{u==="virtual"?y=_[v]:y=n[v],Bj.default(y)&&y.catch(zj.default)}catch(A){y=A.message}a+=this.createEl(v,t,y,u,s),C&&(a+=this.createEl(`get ${v}`,t,h.get,u,s)),k&&(a+=this.createEl(`set ${v}`,t,h.set,u,s))}});let f=Aj.default(t);if(!s&&f)if(a===""){let u=r.set(f,{self:t});this.map[u]=f,a=this.objToHtml(f)}else a+=this.createEl("__proto__",n||t,f,"proto");return a}createEl(t,s,r,n,i=!1){let{visitor:o}=this,a=typeof r,l=Dj.default(r,!1);if(n==="virtual"&&(l=t),r===null)return`<li>${c(t)}<span class="${Ee("null")}">null</span></li>`;if(Pj.default(r)||Oj.default(r))return`<li>${c(t)}<span class="${Ee(a)}">${cr.encode(r)}</span></li>`;if(l==="RegExp"&&(a="regexp"),l==="Number"&&(a="number"),l==="Number"||l==="RegExp")return`<li>${c(t)}<span class="${Ee(a)}">${cr.encode(r.value)}</span></li>`;if(l==="Undefined"||l==="Symbol")return`<li>${c(t)}<span class="${Ee("special")}">${qj.default(l)}</span></li>`;if(r==="(...)")return`<li>${c(t)}<span class="${Ee("special")}">${r}</span></li>`;if(cw.default(r)){let p=o.get(r),d;if(p)d=p.id;else{let u={};n==="proto"&&(u.self=s),d=o.set(r,u),this.map[d]=r}let g=Vj(r,l)||Ij.default(a),_=i?"":`<span class="${Ee("expanded collapsed")}"><span class="${Ee("icon icon-caret-right")}"></span><span class="${Ee("icon icon-caret-down")}"></span></span>`,f=`<li ${i?'data-first-level="true"':""} ${'data-object-id="'+d+'"'}>${_}${c(t)}<span class="${Ee("open")}">${i?"":g}</span><ul class="${Ee(a)}" ${i?"":'style="display:none"'}>`;return i&&(f+=this.objToHtml(r)),f+`</ul><span class="${Ee("close")}"></span></li>`}function c(p){if(i||cw.default(r)&&n==="virtual")return"";let d=Ee("key");return(n==="unenumerable"||n==="proto"||n==="symbol")&&(d=Ee("key-lighter")),`<span class="${d}">${cr.encode(p)}</span>: `}return`<li>${c(t)}<span class="${Ee(typeof r)}">"${cr.encode(r)}"</span></li>`}appendTpl(){this.$container.html(this.objToHtml(this.data,!0))}bindEvent(){this.$container.on("click","li",this.onItemClick)}},pc.Static=Gj.default,pc)});var _w=w((mc,gw)=>{var Kj=Ct();mc=function(e){return Kj(e)==="[object Error]"};gw.exports=mc});var vw=w((fc,yw)=>{fc=function(e){var t=typeof e;return e==null||t!=="function"&&t!=="object"};yw.exports=fc});var gc=w((hc,bw)=>{var Xj=Zn(),Yj=Hr();hc=Xj(Yj,!0);bw.exports=hc});var yc=w((_c,ww)=>{_c=function(e){return!!(e&&e.nodeType===1)};ww.exports=_c});var Sw=w((vc,xw)=>{var Qj=ir();vc=function(e){return e?(e=Qj(e),e-e%1):e===0?e:0};xw.exports=vc});var Ew=w((bc,Lw)=>{bc=function(e){return e===null};Lw.exports=bc});var jw=w((Sc,Cw)=>{var kw=yc(),wc=pe(),xc=Cs(),Zj=Gl(),eM=Rl(),Tw=se(),tM=at();Sc=function(e,t){for(var s=arguments.length,r=new Array(s>2?s-2:0),n=2;n<s;n++)r[n-2]=arguments[n];(kw(t)||wc(t))&&(r.unshift(t),t=null),t||(t={});var i=sM(e),o=i.tagName,a=i.id,l=i.classes,c=document.createElement(o);return a&&c.setAttribute("id",a),Zj.add(c,l),Tw(r,function(p){wc(p)?c.appendChild(document.createTextNode(p)):kw(p)&&c.appendChild(p)}),Tw(t,function(p,d){wc(p)?c.setAttribute(d,p):tM(p)&&xc(d,"on")?c.addEventListener(d.slice(2),p,!1):d==="style"&&eM(c,p)}),c};function sM(e){for(var t="div",s="",r=[],n=[],i="",o=0,a=e.length;o<a;o++){var l=e[o];l==="#"||l==="."?(n.push(i),i=l):i+=l}n.push(i);for(var c=0,p=n.length;c<p;c++)i=n[c],i&&(xc(i,"#")?s=i.slice(1):xc(i,".")?r.push(i.slice(1)):t=i);return{tagName:t,id:s,classes:r}}Cw.exports=Sc});var Vr=w((xi,Mw)=>{Date.now?xi=Date.now:xi=function(){return new Date().getTime()};Mw.exports=xi});var Aw=w((Lc,Uw)=>{Lc=function(e){return typeof e=="symbol"};Uw.exports=Lc});var Ow=w((Ec,Pw)=>{var rM=ei(),nM=tt(),iM=bt(),oM=Aw(),aM=pe();Ec=function(e,t,s){t=rM(t,e);var r=t.pop(),n;for(n=t.shift();!nM(n);){if(!aM(n)&&!oM(n)&&(n=iM(n)),n==="__proto__"||n==="constructor"||n==="prototype")return;e[n]||(e[n]={}),e=e[n],n=t.shift()}e[r]=s};Pw.exports=Ec});var Iw=w((kc,Rw)=>{var lM=ei(),cM=pe(),pM=ze(),uM=se();kc=function(e,t,s){return cM(t)?qw(e,t,s):pM(t)&&uM(t,function(r,n){qw(e,n,r)}),e};function qw(e,t,s){for(var r=lM(t,e),n=r.pop();t=r.shift();)e[t]||(e[t]={}),e=e[t];Object.defineProperty(e,n,s)}Rw.exports=kc});var Bw=w((Tc,Hw)=>{var dM=pe(),mM=lt(),fM=jt(),hM=se();Tc=function(e,t,s){if(dM(t)&&(t=[t]),mM(t)){var r=t;t=function(o,a){return fM(r,a)}}var n={},i=function(o,a){t(o,a)&&(n[a]=o)};return s&&(i=function(o,a){t(o,a)||(n[a]=o)}),hM(e,i),n};Hw.exports=Tc});var Xw=w((os,Kw)=>{var gM=la(),_M=xl(),ur=bt(),Dw=pa(),yM=hl(),Ww=Fe(),Kr=se(),vM=nr(),Gw=ii(),bM=Ql(),wM=Us(),xM=_l(),SM=Ir(),Nw=Vr(),$w=Hr(),Jw=jt(),Mc=ze(),LM=Va(),Fw=Wa(),EM=Cs(),kM=Ow(),TM=Iw(),zw=Bw(),CM=ns();os=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.self,r=t.startTime,n=r===void 0?Nw():r,i=t.timeout,o=i===void 0?0:i,a=t.depth,l=a===void 0?0:a,c=t.curDepth,p=c===void 0?1:c,d=t.visitor,g=d===void 0?new jM:d,_=t.unenumerable,f=_===void 0?!1:_,u=t.symbol,m=u===void 0?!1:u,b=t.accessGetter,S=b===void 0?!1:b,v=t.ignore,y=v===void 0?[]:v,h="",C={visitor:g,unenumerable:f,symbol:m,accessGetter:S,depth:l,curDepth:p+1,timeout:o,startTime:n,ignore:y},k=_M(e,!1);if(k==="String")h=pr(e);else if(k==="Number")h=ur(e),Dw(h,"Infinity")&&(h='{"value":"'.concat(h,'","type":"Number"}'));else if(k==="NaN")h='{"value":"NaN","type":"Number"}';else if(k==="Boolean")h=e?"true":"false";else if(k==="Null")h="null";else if(k==="Undefined")h='{"type":"Undefined"}';else if(k==="Symbol"){var A="Symbol";try{A=ur(e)}catch{}h='{"value":'.concat(pr(A),',"type":"Symbol"}')}else{if(o&&Nw()-n>o)return pr("Timeout");if(l&&p>l)return pr("{...}");h="{";var B=[],Me=g.get(e),xe;if(Me?(xe=Me.id,B.push('"reference":'.concat(xe))):(xe=g.set(e),B.push('"id":'.concat(xe))),B.push('"type":"'.concat(k,'"')),Dw(k,"Function")?B.push('"value":'.concat(pr(yM(e)))):k==="RegExp"&&B.push('"value":'.concat(pr(e))),!Me){var ge=Ww(e);if(ge.length&&B.push(Cc("enumerable",ge,s||e,C)),f){var K=bM($w(e,{prototype:!1,unenumerable:!0}),ge);K.length&&B.push(Cc("unenumerable",K,s||e,C))}if(m){var ve=SM($w(e,{prototype:!1,symbol:!0}),function(te){return typeof te=="symbol"});ve.length&&B.push(Cc("symbol",ve,s||e,C))}var O=Gw(e);if(O&&!Jw(y,O)){var G='"proto":'.concat(os(O,wM(C,{self:s||e})));B.push(G)}}h+=B.join(",")+"}"}return h};function Cc(e,t,s,r){var n=[];return Kr(t,function(i){var o,a=Object.getOwnPropertyDescriptor(s,i),l=a&&a.get,c=a&&a.set;if(!r.accessGetter&&l)o="(...)";else try{if(o=s[i],Jw(r.ignore,o))return;xM(o)&&o.catch(function(){})}catch(p){o=p.message}n.push("".concat(jc(i),":").concat(os(o,r))),l&&n.push("".concat(jc("get "+ur(i)),":").concat(os(a.get,r))),c&&n.push("".concat(jc("set "+ur(i)),":").concat(os(a.set,r)))}),'"'.concat(e,'":{')+n.join(",")+"}"}function jc(e){return'"'.concat(Vw(e),'"')}function pr(e){return'"'.concat(Vw(ur(e)),'"')}function Vw(e){return gM(e).replace(/\\'/g,"'").replace(/\t/g,"\\t")}var jM=vM({initialize:function(){this.id=1,this.visited=[]},set:function(e){var t=this.visited,s=this.id,r={id:s,val:e};return t.push(r),this.id++,s},get:function(e){for(var t=this.visited,s=0,r=t.length;s<r;s++){var n=t[s];if(e===n.val)return n}return!1}});os.parse=function(e){var t={},s=Rs(JSON.parse(e),{map:t});return MM(t),s};function MM(e){Kr(e,function(t){for(var s=Ww(t),r=0,n=s.length;r<n;r++){var i=s[r];if(Mc(t[i])){var o=t[i].reference;o&&e[o]&&(t[i]=e[o])}}var a=Gw(t);a&&a.reference&&e[a.reference]&&Object.setPrototypeOf(t,e[a.reference])})}function Rs(e,t){var s=t.map;if(!Mc(e))return e;var r=e.id,n=e.type,i=e.value,o=e.proto,a=e.reference,l=e.enumerable,c=e.unenumerable;if(a)return e;if(n==="Number")return i==="Infinity"?Number.POSITIVE_INFINITY:i==="-Infinity"?Number.NEGATIVE_INFINITY:NaN;if(n==="Undefined")return;var p;if(n==="Function")p=function(){},p.toString=function(){return i},o&&Object.setPrototypeOf(p,Rs(o,t));else if(n==="RegExp")p=AM(i);else if(n!=="Object"){var d;LM?d=function(){}:d=new Function(n,""),o&&(d.prototype=Rs(o,t)),p=new d}else o?p=Fw(Rs(o,t)):p=Fw(null);var g={};if(l){var _;CM(l)&&(_=l.length,delete l.length),l=zw(l,function(u,m){return!f(l,u,m)}),Kr(l,function(u,m){var b=g[m]||{};b.get||(p[m]=Rs(u,t))}),_&&(p.length=_)}c&&(c=zw(c,function(u,m){return!f(c,u,m)}),Kr(c,function(u,m){var b=g[m]||{};if(!b.get)if(u=Rs(u,t),Mc(u)&&u.reference){var S=u.reference;u=function(){return s[S]},b.get=u}else b.value=u;b.enumerable=!1,g[m]=b})),TM(p,g);function f(u,m,b){b=ur(b);var S=!1;return Kr(["get","set"],function(v){if(EM(b,v+" ")){var y=b.replace(v+" ","");u[y]&&(m=Rs(m,t),m==="Timeout"&&(m=UM),kM(g,[y,v],m),S=!0)}}),S}return s[r]=p,p}function UM(){return"Timeout"}function AM(e){var t=e.lastIndexOf("/");return new RegExp(e.slice(1,t),e.slice(t+1))}Kw.exports=os});var Zw=w((Xr,Qw)=>{typeof process=="object"&&process.nextTick?Xr=process.nextTick:typeof setImmediate=="function"?Xr=function(e){setImmediate(Yw(e))}:Xr=function(e){setTimeout(Yw(e),0)};function Yw(e){if(typeof e!="function")throw new TypeError(e+" is not a function");return e}Qw.exports=Xr});var tx=w((Uc,ex)=>{var PM=oi(),OM=js(),qM=rr(),RM=Mt();Uc=function(e){var t=RM(e.match(IM));return PM(qM(t,function(s){return OM(s)}))};var IM=/((https?)|(ftp)):\/\/[\w.]+[^ \f\n\r\t\v"\\<>[\]\u2100-\uFFFF(),]*/gi;ex.exports=Uc});var rx=w((Ac,sx)=>{Ac=function(e){return e.replace(/\W/g,"\\$&")};sx.exports=Ac});var ix=w((Pc,nx)=>{var HM=tx(),BM=se(),DM=rx();Pc=function(e,t){t=t||NM;var s=HM(e);return BM(s,function(r){e=e.replace(new RegExp(DM(r),"g"),t)}),e};function NM(e){return'<a href="'+e+'">'+e+"</a>"}nx.exports=Pc});var ax=w((Li,ox)=>{var Si=se(),$M=gc();Li=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"js",s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};$M(s,FM),e=e.replace(/</g,"&lt;").replace(/>/g,"&gt;"),t=as[t];var r=0,n=[];Si(t,function(o){o.language&&(e=e.replace(o.re,function(a,l){return l?(n[r++]=Li(l,o.language,s),a.replace(l,"___subtmpl"+(r-1)+"___")):a}))}),Si(t,function(o,a){as[o.language]||(e=e.replace(o.re,"___"+a+"___$1___end"+a+"___"))});var i=[];return e=e.replace(/___(?!subtmpl)\w+?___/g,function(o){var a=o.substr(3,3)==="end",l=(a?o.substr(6):o.substr(3)).replace(/_/g,""),c=i.length>0?i[i.length-1]:null;return!a&&(c==null||l==c||c!=null&&t[c]&&t[c].embed!=null&&t[c].embed.indexOf(l)>-1)?(i.push(l),o):a&&l==c?(i.pop(),o):""}),Si(t,function(o,a){var l=s[o.style]?' style="'.concat(s[o.style],'"'):"";e=e.replace(new RegExp("___end"+a+"___","g"),"</span>").replace(new RegExp("___"+a+"___","g"),'<span class="'.concat(o.style,'"').concat(l,">"))}),Si(t,function(o){o.language&&(e=e.replace(/___subtmpl\d+___/g,function(a){var l=parseInt(a.replace(/___subtmpl(\d+)___/,"$1"),10);return n[l]}))}),e};var FM={comment:"color:#63a35c;",string:"color:#183691;",number:"color:#0086b3;",keyword:"color:#a71d5d;",operator:"color:#994500;"},as={};as.js={comment:{re:/(\/\/.*|\/\*([\s\S]*?)\*\/)/g,style:"comment"},string:{re:/(('.*?')|(".*?"))/g,style:"string"},numbers:{re:/(-?(\d+|\d+\.\d+|\.\d+))/g,style:"number"},keywords:{re:/(?:\b)(function|for|foreach|while|if|else|elseif|switch|break|as|return|this|class|self|default|var|const|let|false|true|null|undefined)(?:\b)/gi,style:"keyword"},operator:{re:/(\+|-|\/|\*|%|=|&lt;|&gt;|\||\?|\.)/g,style:"operator"}};as.html={comment:{re:/(&lt;!--([\s\S]*?)--&gt;)/g,style:"comment"},tag:{re:/(&lt;\/?\w(.|\n)*?\/?&gt;)/g,style:"keyword",embed:["string"]},string:as.js.string,css:{re:/(?:&lt;style.*?&gt;)([\s\S]*)?(?:&lt;\/style&gt;)/gi,language:"css"},script:{re:/(?:&lt;script.*?&gt;)([\s\S]*?)(?:&lt;\/script&gt;)/gi,language:"js"}};as.css={comment:as.js.comment,string:as.js.string,numbers:{re:/((-?(\d+|\d+\.\d+|\.\d+)(%|px|em|pt|in)?)|#[0-9a-fA-F]{3}[0-9a-fA-F]{3})/g,style:"number"},keywords:{re:/(@\w+|:?:\w+|[a-z-]+:)/g,style:"keyword"}};ox.exports=Li});var cx=w((Oc,lx)=>{Oc=function(){for(var e=arguments,t=e[0],s=1,r=e.length;s<r;s++)e[s]<t&&(t=e[s]);return t};lx.exports=Oc});var Rc=w((qc,px)=>{var zM=pe(),WM=Mt(),GM=cx(),JM=rr(),VM=js();qc=function(e){zM(e)&&(e=WM(e));for(var t="",s=arguments.length,r=new Array(s>1?s-1:0),n=1;n<s;n++)r[n-1]=arguments[n];for(var i=0,o=e.length;i<o;i++)t+=e[i],r[i]&&(t+=r[i]);for(var a=t.split(`
`),l=[],c=0,p=a.length;c<p;c++){var d=a[c],g=d.match(KM);g&&l.push(g[1].length)}var _=l.length>0?GM.apply(null,l):0;return VM(JM(a,function(f){return f[0]===" "?f.slice(_):f}).join(`
`))};var KM=/^(\s+)\S+/;px.exports=qc});var Ei=w((K6,ux)=>{"use strict";function ke(e){this.__parent=e,this.__character_count=0,this.__indent_count=-1,this.__alignment_count=0,this.__wrap_point_index=0,this.__wrap_point_character_count=0,this.__wrap_point_indent_count=-1,this.__wrap_point_alignment_count=0,this.__items=[]}ke.prototype.clone_empty=function(){var e=new ke(this.__parent);return e.set_indent(this.__indent_count,this.__alignment_count),e};ke.prototype.item=function(e){return e<0?this.__items[this.__items.length+e]:this.__items[e]};ke.prototype.has_match=function(e){for(var t=this.__items.length-1;t>=0;t--)if(this.__items[t].match(e))return!0;return!1};ke.prototype.set_indent=function(e,t){this.is_empty()&&(this.__indent_count=e||0,this.__alignment_count=t||0,this.__character_count=this.__parent.get_indent_size(this.__indent_count,this.__alignment_count))};ke.prototype._set_wrap_point=function(){this.__parent.wrap_line_length&&(this.__wrap_point_index=this.__items.length,this.__wrap_point_character_count=this.__character_count,this.__wrap_point_indent_count=this.__parent.next_line.__indent_count,this.__wrap_point_alignment_count=this.__parent.next_line.__alignment_count)};ke.prototype._should_wrap=function(){return this.__wrap_point_index&&this.__character_count>this.__parent.wrap_line_length&&this.__wrap_point_character_count>this.__parent.next_line.__character_count};ke.prototype._allow_wrap=function(){if(this._should_wrap()){this.__parent.add_new_line();var e=this.__parent.current_line;return e.set_indent(this.__wrap_point_indent_count,this.__wrap_point_alignment_count),e.__items=this.__items.slice(this.__wrap_point_index),this.__items=this.__items.slice(0,this.__wrap_point_index),e.__character_count+=this.__character_count-this.__wrap_point_character_count,this.__character_count=this.__wrap_point_character_count,e.__items[0]===" "&&(e.__items.splice(0,1),e.__character_count-=1),!0}return!1};ke.prototype.is_empty=function(){return this.__items.length===0};ke.prototype.last=function(){return this.is_empty()?null:this.__items[this.__items.length-1]};ke.prototype.push=function(e){this.__items.push(e);var t=e.lastIndexOf(`
`);t!==-1?this.__character_count=e.length-t:this.__character_count+=e.length};ke.prototype.pop=function(){var e=null;return this.is_empty()||(e=this.__items.pop(),this.__character_count-=e.length),e};ke.prototype._remove_indent=function(){this.__indent_count>0&&(this.__indent_count-=1,this.__character_count-=this.__parent.indent_size)};ke.prototype._remove_wrap_indent=function(){this.__wrap_point_indent_count>0&&(this.__wrap_point_indent_count-=1)};ke.prototype.trim=function(){for(;this.last()===" ";)this.__items.pop(),this.__character_count-=1};ke.prototype.toString=function(){var e="";return this.is_empty()?this.__parent.indent_empty_lines&&(e=this.__parent.get_indent_string(this.__indent_count)):(e=this.__parent.get_indent_string(this.__indent_count,this.__alignment_count),e+=this.__items.join("")),e};function Yr(e,t){this.__cache=[""],this.__indent_size=e.indent_size,this.__indent_string=e.indent_char,e.indent_with_tabs||(this.__indent_string=new Array(e.indent_size+1).join(e.indent_char)),t=t||"",e.indent_level>0&&(t=new Array(e.indent_level+1).join(this.__indent_string)),this.__base_string=t,this.__base_string_length=t.length}Yr.prototype.get_indent_size=function(e,t){var s=this.__base_string_length;return t=t||0,e<0&&(s=0),s+=e*this.__indent_size,s+=t,s};Yr.prototype.get_indent_string=function(e,t){var s=this.__base_string;return t=t||0,e<0&&(e=0,s=""),t+=e*this.__indent_size,this.__ensure_cache(t),s+=this.__cache[t],s};Yr.prototype.__ensure_cache=function(e){for(;e>=this.__cache.length;)this.__add_column()};Yr.prototype.__add_column=function(){var e=this.__cache.length,t=0,s="";this.__indent_size&&e>=this.__indent_size&&(t=Math.floor(e/this.__indent_size),e-=t*this.__indent_size,s=new Array(t+1).join(this.__indent_string)),e&&(s+=new Array(e+1).join(" ")),this.__cache.push(s)};function Te(e,t){this.__indent_cache=new Yr(e,t),this.raw=!1,this._end_with_newline=e.end_with_newline,this.indent_size=e.indent_size,this.wrap_line_length=e.wrap_line_length,this.indent_empty_lines=e.indent_empty_lines,this.__lines=[],this.previous_line=null,this.current_line=null,this.next_line=new ke(this),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1,this.__add_outputline()}Te.prototype.__add_outputline=function(){this.previous_line=this.current_line,this.current_line=this.next_line.clone_empty(),this.__lines.push(this.current_line)};Te.prototype.get_line_number=function(){return this.__lines.length};Te.prototype.get_indent_string=function(e,t){return this.__indent_cache.get_indent_string(e,t)};Te.prototype.get_indent_size=function(e,t){return this.__indent_cache.get_indent_size(e,t)};Te.prototype.is_empty=function(){return!this.previous_line&&this.current_line.is_empty()};Te.prototype.add_new_line=function(e){return this.is_empty()||!e&&this.just_added_newline()?!1:(this.raw||this.__add_outputline(),!0)};Te.prototype.get_code=function(e){this.trim(!0);var t=this.current_line.pop();t&&(t[t.length-1]===`
`&&(t=t.replace(/\n+$/g,"")),this.current_line.push(t)),this._end_with_newline&&this.__add_outputline();var s=this.__lines.join(`
`);return e!==`
`&&(s=s.replace(/[\n]/g,e)),s};Te.prototype.set_wrap_point=function(){this.current_line._set_wrap_point()};Te.prototype.set_indent=function(e,t){return e=e||0,t=t||0,this.next_line.set_indent(e,t),this.__lines.length>1?(this.current_line.set_indent(e,t),!0):(this.current_line.set_indent(),!1)};Te.prototype.add_raw_token=function(e){for(var t=0;t<e.newlines;t++)this.__add_outputline();this.current_line.set_indent(-1),this.current_line.push(e.whitespace_before),this.current_line.push(e.text),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1};Te.prototype.add_token=function(e){this.__add_space_before_token(),this.current_line.push(e),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=this.current_line._allow_wrap()};Te.prototype.__add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&(this.non_breaking_space||this.set_wrap_point(),this.current_line.push(" "))};Te.prototype.remove_indent=function(e){for(var t=this.__lines.length;e<t;)this.__lines[e]._remove_indent(),e++;this.current_line._remove_wrap_indent()};Te.prototype.trim=function(e){for(e=e===void 0?!1:e,this.current_line.trim();e&&this.__lines.length>1&&this.current_line.is_empty();)this.__lines.pop(),this.current_line=this.__lines[this.__lines.length-1],this.current_line.trim();this.previous_line=this.__lines.length>1?this.__lines[this.__lines.length-2]:null};Te.prototype.just_added_newline=function(){return this.current_line.is_empty()};Te.prototype.just_added_blankline=function(){return this.is_empty()||this.current_line.is_empty()&&this.previous_line.is_empty()};Te.prototype.ensure_empty_line_above=function(e,t){for(var s=this.__lines.length-2;s>=0;){var r=this.__lines[s];if(r.is_empty())break;if(r.item(0).indexOf(e)!==0&&r.item(-1)!==t){this.__lines.splice(s+1,0,new ke(this)),this.previous_line=this.__lines[this.__lines.length-2];break}s--}};ux.exports.Output=Te});var Ic=w((X6,dx)=>{"use strict";function XM(e,t,s,r){this.type=e,this.text=t,this.comments_before=null,this.newlines=s||0,this.whitespace_before=r||"",this.parent=null,this.next=null,this.previous=null,this.opened=null,this.closed=null,this.directives=null}dx.exports.Token=XM});var Bc=w($t=>{"use strict";var YM="\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a",mx="\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a",Hc="\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc",fx="\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f",hx="(?:\\\\u[0-9a-fA-F]{4}|["+YM+Hc+"])",QM="(?:\\\\u[0-9a-fA-F]{4}|["+mx+Hc+fx+"])*";$t.identifier=new RegExp(hx+QM,"g");$t.identifierStart=new RegExp(hx);$t.identifierMatch=new RegExp("(?:\\\\u[0-9a-fA-F]{4}|["+mx+Hc+fx+"])+");$t.newline=/[\n\r\u2028\u2029]/;$t.lineBreak=new RegExp(`\r
|`+$t.newline.source);$t.allLineBreaks=new RegExp($t.lineBreak.source,"g")});var Ti=w((Q6,ki)=>{"use strict";function ls(e,t){this.raw_options=gx(e,t),this.disabled=this._get_boolean("disabled"),this.eol=this._get_characters("eol","auto"),this.end_with_newline=this._get_boolean("end_with_newline"),this.indent_size=this._get_number("indent_size",4),this.indent_char=this._get_characters("indent_char"," "),this.indent_level=this._get_number("indent_level"),this.preserve_newlines=this._get_boolean("preserve_newlines",!0),this.max_preserve_newlines=this._get_number("max_preserve_newlines",32786),this.preserve_newlines||(this.max_preserve_newlines=0),this.indent_with_tabs=this._get_boolean("indent_with_tabs",this.indent_char==="	"),this.indent_with_tabs&&(this.indent_char="	",this.indent_size===1&&(this.indent_size=4)),this.wrap_line_length=this._get_number("wrap_line_length",this._get_number("max_char")),this.indent_empty_lines=this._get_boolean("indent_empty_lines"),this.templating=this._get_selection_list("templating",["auto","none","django","erb","handlebars","php","smarty"],["auto"])}ls.prototype._get_array=function(e,t){var s=this.raw_options[e],r=t||[];return typeof s=="object"?s!==null&&typeof s.concat=="function"&&(r=s.concat()):typeof s=="string"&&(r=s.split(/[^a-zA-Z0-9_\/\-]+/)),r};ls.prototype._get_boolean=function(e,t){var s=this.raw_options[e],r=s===void 0?!!t:!!s;return r};ls.prototype._get_characters=function(e,t){var s=this.raw_options[e],r=t||"";return typeof s=="string"&&(r=s.replace(/\\r/,"\r").replace(/\\n/,`
`).replace(/\\t/,"	")),r};ls.prototype._get_number=function(e,t){var s=this.raw_options[e];t=parseInt(t,10),isNaN(t)&&(t=0);var r=parseInt(s,10);return isNaN(r)&&(r=t),r};ls.prototype._get_selection=function(e,t,s){var r=this._get_selection_list(e,t,s);if(r.length!==1)throw new Error("Invalid Option Value: The option '"+e+`' can only be one of the following values:
`+t+`
You passed in: '`+this.raw_options[e]+"'");return r[0]};ls.prototype._get_selection_list=function(e,t,s){if(!t||t.length===0)throw new Error("Selection list cannot be empty.");if(s=s||[t[0]],!this._is_valid_selection(s,t))throw new Error("Invalid Default Value!");var r=this._get_array(e,s);if(!this._is_valid_selection(r,t))throw new Error("Invalid Option Value: The option '"+e+`' can contain only the following values:
`+t+`
You passed in: '`+this.raw_options[e]+"'");return r};ls.prototype._is_valid_selection=function(e,t){return e.length&&t.length&&!e.some(function(s){return t.indexOf(s)===-1})};function gx(e,t){var s={};e=_x(e);var r;for(r in e)r!==t&&(s[r]=e[r]);if(t&&e[t])for(r in e[t])s[r]=e[t][r];return s}function _x(e){var t={},s;for(s in e){var r=s.replace(/-/g,"_");t[r]=e[s]}return t}ki.exports.Options=ls;ki.exports.normalizeOpts=_x;ki.exports.mergeOpts=gx});var Dc=w((Z6,bx)=>{"use strict";var yx=Ti().Options,ZM=["before-newline","after-newline","preserve-newline"];function vx(e){yx.call(this,e,"js");var t=this.raw_options.brace_style||null;t==="expand-strict"?this.raw_options.brace_style="expand":t==="collapse-preserve-inline"?this.raw_options.brace_style="collapse,preserve-inline":this.raw_options.braces_on_own_line!==void 0&&(this.raw_options.brace_style=this.raw_options.braces_on_own_line?"expand":"collapse");var s=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_preserve_inline=!1,this.brace_style="collapse";for(var r=0;r<s.length;r++)s[r]==="preserve-inline"?this.brace_preserve_inline=!0:this.brace_style=s[r];this.unindent_chained_methods=this._get_boolean("unindent_chained_methods"),this.break_chained_methods=this._get_boolean("break_chained_methods"),this.space_in_paren=this._get_boolean("space_in_paren"),this.space_in_empty_paren=this._get_boolean("space_in_empty_paren"),this.jslint_happy=this._get_boolean("jslint_happy"),this.space_after_anon_function=this._get_boolean("space_after_anon_function"),this.space_after_named_function=this._get_boolean("space_after_named_function"),this.keep_array_indentation=this._get_boolean("keep_array_indentation"),this.space_before_conditional=this._get_boolean("space_before_conditional",!0),this.unescape_strings=this._get_boolean("unescape_strings"),this.e4x=this._get_boolean("e4x"),this.comma_first=this._get_boolean("comma_first"),this.operator_position=this._get_selection("operator_position",ZM),this.test_output_raw=this._get_boolean("test_output_raw"),this.jslint_happy&&(this.space_after_anon_function=!0)}vx.prototype=new yx;bx.exports.Options=vx});var Ci=w((e9,Sx)=>{"use strict";var xx=RegExp.prototype.hasOwnProperty("sticky");function Oe(e){this.__input=e||"",this.__input_length=this.__input.length,this.__position=0}Oe.prototype.restart=function(){this.__position=0};Oe.prototype.back=function(){this.__position>0&&(this.__position-=1)};Oe.prototype.hasNext=function(){return this.__position<this.__input_length};Oe.prototype.next=function(){var e=null;return this.hasNext()&&(e=this.__input.charAt(this.__position),this.__position+=1),e};Oe.prototype.peek=function(e){var t=null;return e=e||0,e+=this.__position,e>=0&&e<this.__input_length&&(t=this.__input.charAt(e)),t};Oe.prototype.__match=function(e,t){e.lastIndex=t;var s=e.exec(this.__input);return s&&!(xx&&e.sticky)&&s.index!==t&&(s=null),s};Oe.prototype.test=function(e,t){return t=t||0,t+=this.__position,t>=0&&t<this.__input_length?!!this.__match(e,t):!1};Oe.prototype.testChar=function(e,t){var s=this.peek(t);return e.lastIndex=0,s!==null&&e.test(s)};Oe.prototype.match=function(e){var t=this.__match(e,this.__position);return t?this.__position+=t[0].length:t=null,t};Oe.prototype.read=function(e,t,s){var r="",n;return e&&(n=this.match(e),n&&(r+=n[0])),t&&(n||!e)&&(r+=this.readUntil(t,s)),r};Oe.prototype.readUntil=function(e,t){var s="",r=this.__position;e.lastIndex=this.__position;var n=e.exec(this.__input);return n?(r=n.index,t&&(r+=n[0].length)):r=this.__input_length,s=this.__input.substring(this.__position,r),this.__position=r,s};Oe.prototype.readUntilAfter=function(e){return this.readUntil(e,!0)};Oe.prototype.get_regexp=function(e,t){var s=null,r="g";return t&&xx&&(r="y"),typeof e=="string"&&e!==""?s=new RegExp(e,r):e&&(s=new RegExp(e.source,r)),s};Oe.prototype.get_literal_regexp=function(e){return RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"))};Oe.prototype.peekUntilAfter=function(e){var t=this.__position,s=this.readUntilAfter(e);return this.__position=t,s};Oe.prototype.lookBack=function(e){var t=this.__position-1;return t>=e.length&&this.__input.substring(t-e.length,t).toLowerCase()===e};Sx.exports.InputScanner=Oe});var Ex=w((t9,Lx)=>{"use strict";function Is(e){this.__tokens=[],this.__tokens_length=this.__tokens.length,this.__position=0,this.__parent_token=e}Is.prototype.restart=function(){this.__position=0};Is.prototype.isEmpty=function(){return this.__tokens_length===0};Is.prototype.hasNext=function(){return this.__position<this.__tokens_length};Is.prototype.next=function(){var e=null;return this.hasNext()&&(e=this.__tokens[this.__position],this.__position+=1),e};Is.prototype.peek=function(e){var t=null;return e=e||0,e+=this.__position,e>=0&&e<this.__tokens_length&&(t=this.__tokens[e]),t};Is.prototype.add=function(e){this.__parent_token&&(e.parent=this.__parent_token),this.__tokens.push(e),this.__tokens_length+=1};Lx.exports.TokenStream=Is});var Qr=w((s9,kx)=>{"use strict";function At(e,t){this._input=e,this._starting_pattern=null,this._match_pattern=null,this._until_pattern=null,this._until_after=!1,t&&(this._starting_pattern=this._input.get_regexp(t._starting_pattern,!0),this._match_pattern=this._input.get_regexp(t._match_pattern,!0),this._until_pattern=this._input.get_regexp(t._until_pattern),this._until_after=t._until_after)}At.prototype.read=function(){var e=this._input.read(this._starting_pattern);return(!this._starting_pattern||e)&&(e+=this._input.read(this._match_pattern,this._until_pattern,this._until_after)),e};At.prototype.read_match=function(){return this._input.match(this._match_pattern)};At.prototype.until_after=function(e){var t=this._create();return t._until_after=!0,t._until_pattern=this._input.get_regexp(e),t._update(),t};At.prototype.until=function(e){var t=this._create();return t._until_after=!1,t._until_pattern=this._input.get_regexp(e),t._update(),t};At.prototype.starting_with=function(e){var t=this._create();return t._starting_pattern=this._input.get_regexp(e,!0),t._update(),t};At.prototype.matching=function(e){var t=this._create();return t._match_pattern=this._input.get_regexp(e,!0),t._update(),t};At.prototype._create=function(){return new At(this._input,this)};At.prototype._update=function(){};kx.exports.Pattern=At});var jx=w((r9,Cx)=>{"use strict";var Tx=Qr().Pattern;function cs(e,t){Tx.call(this,e,t),t?this._line_regexp=this._input.get_regexp(t._line_regexp):this.__set_whitespace_patterns("",""),this.newline_count=0,this.whitespace_before_token=""}cs.prototype=new Tx;cs.prototype.__set_whitespace_patterns=function(e,t){e+="\\t ",t+="\\n\\r",this._match_pattern=this._input.get_regexp("["+e+t+"]+",!0),this._newline_regexp=this._input.get_regexp("\\r\\n|["+t+"]")};cs.prototype.read=function(){this.newline_count=0,this.whitespace_before_token="";var e=this._input.read(this._match_pattern);if(e===" ")this.whitespace_before_token=" ";else if(e){var t=this.__split(this._newline_regexp,e);this.newline_count=t.length-1,this.whitespace_before_token=t[this.newline_count]}return e};cs.prototype.matching=function(e,t){var s=this._create();return s.__set_whitespace_patterns(e,t),s._update(),s};cs.prototype._create=function(){return new cs(this._input,this)};cs.prototype.__split=function(e,t){e.lastIndex=0;for(var s=0,r=[],n=e.exec(t);n;)r.push(t.substring(s,n.index)),s=n.index+n[0].length,n=e.exec(t);return s<t.length?r.push(t.substring(s,t.length)):r.push(""),r};Cx.exports.WhitespacePattern=cs});var en=w((n9,$c)=>{"use strict";var eU=Ci().InputScanner,Mx=Ic().Token,Nc=Ex().TokenStream,tU=jx().WhitespacePattern,Zr={START:"TK_START",RAW:"TK_RAW",EOF:"TK_EOF"},Pt=function(e,t){this._input=new eU(e),this._options=t||{},this.__tokens=null,this._patterns={},this._patterns.whitespace=new tU(this._input)};Pt.prototype.tokenize=function(){this._input.restart(),this.__tokens=new Nc,this._reset();for(var e,t=new Mx(Zr.START,""),s=null,r=[],n=new Nc;t.type!==Zr.EOF;){for(e=this._get_next_token(t,s);this._is_comment(e);)n.add(e),e=this._get_next_token(t,s);n.isEmpty()||(e.comments_before=n,n=new Nc),e.parent=s,this._is_opening(e)?(r.push(s),s=e):s&&this._is_closing(e,s)&&(e.opened=s,s.closed=e,s=r.pop(),e.parent=s),e.previous=t,t.next=e,this.__tokens.add(e),t=e}return this.__tokens};Pt.prototype._is_first_token=function(){return this.__tokens.isEmpty()};Pt.prototype._reset=function(){};Pt.prototype._get_next_token=function(e,t){this._readWhitespace();var s=this._input.read(/.+/g);return s?this._create_token(Zr.RAW,s):this._create_token(Zr.EOF,"")};Pt.prototype._is_comment=function(e){return!1};Pt.prototype._is_opening=function(e){return!1};Pt.prototype._is_closing=function(e,t){return!1};Pt.prototype._create_token=function(e,t){var s=new Mx(e,t,this._patterns.whitespace.newline_count,this._patterns.whitespace.whitespace_before_token);return s};Pt.prototype._readWhitespace=function(){return this._patterns.whitespace.read()};$c.exports.Tokenizer=Pt;$c.exports.TOKEN=Zr});var ji=w((i9,Ux)=>{"use strict";function Fc(e,t){e=typeof e=="string"?e:e.source,t=typeof t=="string"?t:t.source,this.__directives_block_pattern=new RegExp(e+/ beautify( \w+[:]\w+)+ /.source+t,"g"),this.__directive_pattern=/ (\w+)[:](\w+)/g,this.__directives_end_ignore_pattern=new RegExp(e+/\sbeautify\signore:end\s/.source+t,"g")}Fc.prototype.get_directives=function(e){if(!e.match(this.__directives_block_pattern))return null;var t={};this.__directive_pattern.lastIndex=0;for(var s=this.__directive_pattern.exec(e);s;)t[s[1]]=s[2],s=this.__directive_pattern.exec(e);return t};Fc.prototype.readIgnored=function(e){return e.readUntilAfter(this.__directives_end_ignore_pattern)};Ux.exports.Directives=Fc});var Gc=w((o9,Ax)=>{"use strict";var zc=Qr().Pattern,Wc={django:!1,erb:!1,handlebars:!1,php:!1,smarty:!1};function xt(e,t){zc.call(this,e,t),this.__template_pattern=null,this._disabled=Object.assign({},Wc),this._excluded=Object.assign({},Wc),t&&(this.__template_pattern=this._input.get_regexp(t.__template_pattern),this._excluded=Object.assign(this._excluded,t._excluded),this._disabled=Object.assign(this._disabled,t._disabled));var s=new zc(e);this.__patterns={handlebars_comment:s.starting_with(/{{!--/).until_after(/--}}/),handlebars_unescaped:s.starting_with(/{{{/).until_after(/}}}/),handlebars:s.starting_with(/{{/).until_after(/}}/),php:s.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),erb:s.starting_with(/<%[^%]/).until_after(/[^%]%>/),django:s.starting_with(/{%/).until_after(/%}/),django_value:s.starting_with(/{{/).until_after(/}}/),django_comment:s.starting_with(/{#/).until_after(/#}/),smarty:s.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),smarty_comment:s.starting_with(/{\*/).until_after(/\*}/),smarty_literal:s.starting_with(/{literal}/).until_after(/{\/literal}/)}}xt.prototype=new zc;xt.prototype._create=function(){return new xt(this._input,this)};xt.prototype._update=function(){this.__set_templated_pattern()};xt.prototype.disable=function(e){var t=this._create();return t._disabled[e]=!0,t._update(),t};xt.prototype.read_options=function(e){var t=this._create();for(var s in Wc)t._disabled[s]=e.templating.indexOf(s)===-1;return t._update(),t};xt.prototype.exclude=function(e){var t=this._create();return t._excluded[e]=!0,t._update(),t};xt.prototype.read=function(){var e="";this._match_pattern?e=this._input.read(this._starting_pattern):e=this._input.read(this._starting_pattern,this.__template_pattern);for(var t=this._read_template();t;)this._match_pattern?t+=this._input.read(this._match_pattern):t+=this._input.readUntil(this.__template_pattern),e+=t,t=this._read_template();return this._until_after&&(e+=this._input.readUntilAfter(this._until_pattern)),e};xt.prototype.__set_templated_pattern=function(){var e=[];this._disabled.php||e.push(this.__patterns.php._starting_pattern.source),this._disabled.handlebars||e.push(this.__patterns.handlebars._starting_pattern.source),this._disabled.erb||e.push(this.__patterns.erb._starting_pattern.source),this._disabled.django||(e.push(this.__patterns.django._starting_pattern.source),e.push(this.__patterns.django_value._starting_pattern.source),e.push(this.__patterns.django_comment._starting_pattern.source)),this._disabled.smarty||e.push(this.__patterns.smarty._starting_pattern.source),this._until_pattern&&e.push(this._until_pattern.source),this.__template_pattern=this._input.get_regexp("(?:"+e.join("|")+")")};xt.prototype._read_template=function(){var e="",t=this._input.peek();if(t==="<"){var s=this._input.peek(1);!this._disabled.php&&!this._excluded.php&&s==="?"&&(e=e||this.__patterns.php.read()),!this._disabled.erb&&!this._excluded.erb&&s==="%"&&(e=e||this.__patterns.erb.read())}else t==="{"&&(!this._disabled.handlebars&&!this._excluded.handlebars&&(e=e||this.__patterns.handlebars_comment.read(),e=e||this.__patterns.handlebars_unescaped.read(),e=e||this.__patterns.handlebars.read()),this._disabled.django||(!this._excluded.django&&!this._excluded.handlebars&&(e=e||this.__patterns.django_value.read()),this._excluded.django||(e=e||this.__patterns.django_comment.read(),e=e||this.__patterns.django.read())),this._disabled.smarty||this._disabled.django&&this._disabled.handlebars&&(e=e||this.__patterns.smarty_comment.read(),e=e||this.__patterns.smarty_literal.read(),e=e||this.__patterns.smarty.read()));return e};Ax.exports.TemplatablePattern=xt});var sn=w((a9,tn)=>{"use strict";var sU=Ci().InputScanner,Ox=en().Tokenizer,Jc=en().TOKEN,rU=ji().Directives,ct=Bc(),nU=Qr().Pattern,iU=Gc().TemplatablePattern;function Vc(e,t){return t.indexOf(e)!==-1}var D={START_EXPR:"TK_START_EXPR",END_EXPR:"TK_END_EXPR",START_BLOCK:"TK_START_BLOCK",END_BLOCK:"TK_END_BLOCK",WORD:"TK_WORD",RESERVED:"TK_RESERVED",SEMICOLON:"TK_SEMICOLON",STRING:"TK_STRING",EQUALS:"TK_EQUALS",OPERATOR:"TK_OPERATOR",COMMA:"TK_COMMA",BLOCK_COMMENT:"TK_BLOCK_COMMENT",COMMENT:"TK_COMMENT",DOT:"TK_DOT",UNKNOWN:"TK_UNKNOWN",START:Jc.START,RAW:Jc.RAW,EOF:Jc.EOF},Px=new rU(/\/\*/,/\*\//),oU=/0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/,aU=/[0-9]/,lU=/[^\d\.]/,cU=">>> === !== << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" "),Hs=">>>= ... >>= <<= === >>> !== **= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";Hs=Hs.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&");Hs="\\?\\.(?!\\d) "+Hs;Hs=Hs.replace(/ /g,"|");var pU=new RegExp(Hs),qx="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","),uU=qx.concat(["do","in","of","else","get","set","new","catch","finally","typeof","yield","async","await","from","as"]),dU=new RegExp("^(?:"+uU.join("|")+")$"),Mi,qe=function(e,t){Ox.call(this,e,t),this._patterns.whitespace=this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,/\u2028\u2029/.source);var s=new nU(this._input),r=new iU(this._input).read_options(this._options);this.__patterns={template:r,identifier:r.starting_with(ct.identifier).matching(ct.identifierMatch),number:s.matching(oU),punct:s.matching(pU),comment:s.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),block_comment:s.starting_with(/\/\*/).until_after(/\*\//),html_comment_start:s.matching(/<!--/),html_comment_end:s.matching(/-->/),include:s.starting_with(/#include/).until_after(ct.lineBreak),shebang:s.starting_with(/#!/).until_after(ct.lineBreak),xml:s.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\]|)(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/),single_quote:r.until(/['\\\n\r\u2028\u2029]/),double_quote:r.until(/["\\\n\r\u2028\u2029]/),template_text:r.until(/[`\\$]/),template_expression:r.until(/[`}\\]/)}};qe.prototype=new Ox;qe.prototype._is_comment=function(e){return e.type===D.COMMENT||e.type===D.BLOCK_COMMENT||e.type===D.UNKNOWN};qe.prototype._is_opening=function(e){return e.type===D.START_BLOCK||e.type===D.START_EXPR};qe.prototype._is_closing=function(e,t){return(e.type===D.END_BLOCK||e.type===D.END_EXPR)&&t&&(e.text==="]"&&t.text==="["||e.text===")"&&t.text==="("||e.text==="}"&&t.text==="{")};qe.prototype._reset=function(){Mi=!1};qe.prototype._get_next_token=function(e,t){var s=null;this._readWhitespace();var r=this._input.peek();return r===null?this._create_token(D.EOF,""):(s=s||this._read_non_javascript(r),s=s||this._read_string(r),s=s||this._read_word(e),s=s||this._read_singles(r),s=s||this._read_comment(r),s=s||this._read_regexp(r,e),s=s||this._read_xml(r,e),s=s||this._read_punctuation(),s=s||this._create_token(D.UNKNOWN,this._input.next()),s)};qe.prototype._read_word=function(e){var t;if(t=this.__patterns.identifier.read(),t!=="")return t=t.replace(ct.allLineBreaks,`
`),!(e.type===D.DOT||e.type===D.RESERVED&&(e.text==="set"||e.text==="get"))&&dU.test(t)?t==="in"||t==="of"?this._create_token(D.OPERATOR,t):this._create_token(D.RESERVED,t):this._create_token(D.WORD,t);if(t=this.__patterns.number.read(),t!=="")return this._create_token(D.WORD,t)};qe.prototype._read_singles=function(e){var t=null;return e==="("||e==="["?t=this._create_token(D.START_EXPR,e):e===")"||e==="]"?t=this._create_token(D.END_EXPR,e):e==="{"?t=this._create_token(D.START_BLOCK,e):e==="}"?t=this._create_token(D.END_BLOCK,e):e===";"?t=this._create_token(D.SEMICOLON,e):e==="."&&lU.test(this._input.peek(1))?t=this._create_token(D.DOT,e):e===","&&(t=this._create_token(D.COMMA,e)),t&&this._input.next(),t};qe.prototype._read_punctuation=function(){var e=this.__patterns.punct.read();if(e!=="")return e==="="?this._create_token(D.EQUALS,e):e==="?."?this._create_token(D.DOT,e):this._create_token(D.OPERATOR,e)};qe.prototype._read_non_javascript=function(e){var t="";if(e==="#"){if(this._is_first_token()&&(t=this.__patterns.shebang.read(),t))return this._create_token(D.UNKNOWN,t.trim()+`
`);if(t=this.__patterns.include.read(),t)return this._create_token(D.UNKNOWN,t.trim()+`
`);e=this._input.next();var s="#";if(this._input.hasNext()&&this._input.testChar(aU)){do e=this._input.next(),s+=e;while(this._input.hasNext()&&e!=="#"&&e!=="=");return e==="#"||(this._input.peek()==="["&&this._input.peek(1)==="]"?(s+="[]",this._input.next(),this._input.next()):this._input.peek()==="{"&&this._input.peek(1)==="}"&&(s+="{}",this._input.next(),this._input.next())),this._create_token(D.WORD,s)}this._input.back()}else if(e==="<"&&this._is_first_token()){if(t=this.__patterns.html_comment_start.read(),t){for(;this._input.hasNext()&&!this._input.testChar(ct.newline);)t+=this._input.next();return Mi=!0,this._create_token(D.COMMENT,t)}}else if(Mi&&e==="-"&&(t=this.__patterns.html_comment_end.read(),t))return Mi=!1,this._create_token(D.COMMENT,t);return null};qe.prototype._read_comment=function(e){var t=null;if(e==="/"){var s="";if(this._input.peek(1)==="*"){s=this.__patterns.block_comment.read();var r=Px.get_directives(s);r&&r.ignore==="start"&&(s+=Px.readIgnored(this._input)),s=s.replace(ct.allLineBreaks,`
`),t=this._create_token(D.BLOCK_COMMENT,s),t.directives=r}else this._input.peek(1)==="/"&&(s=this.__patterns.comment.read(),t=this._create_token(D.COMMENT,s))}return t};qe.prototype._read_string=function(e){if(e==="`"||e==="'"||e==='"'){var t=this._input.next();return this.has_char_escapes=!1,e==="`"?t+=this._read_string_recursive("`",!0,"${"):t+=this._read_string_recursive(e),this.has_char_escapes&&this._options.unescape_strings&&(t=mU(t)),this._input.peek()===e&&(t+=this._input.next()),t=t.replace(ct.allLineBreaks,`
`),this._create_token(D.STRING,t)}return null};qe.prototype._allow_regexp_or_xml=function(e){return e.type===D.RESERVED&&Vc(e.text,["return","case","throw","else","do","typeof","yield"])||e.type===D.END_EXPR&&e.text===")"&&e.opened.previous.type===D.RESERVED&&Vc(e.opened.previous.text,["if","while","for"])||Vc(e.type,[D.COMMENT,D.START_EXPR,D.START_BLOCK,D.START,D.END_BLOCK,D.OPERATOR,D.EQUALS,D.EOF,D.SEMICOLON,D.COMMA])};qe.prototype._read_regexp=function(e,t){if(e==="/"&&this._allow_regexp_or_xml(t)){for(var s=this._input.next(),r=!1,n=!1;this._input.hasNext()&&(r||n||this._input.peek()!==e)&&!this._input.testChar(ct.newline);)s+=this._input.peek(),r?r=!1:(r=this._input.peek()==="\\",this._input.peek()==="["?n=!0:this._input.peek()==="]"&&(n=!1)),this._input.next();return this._input.peek()===e&&(s+=this._input.next(),s+=this._input.read(ct.identifier)),this._create_token(D.STRING,s)}return null};qe.prototype._read_xml=function(e,t){if(this._options.e4x&&e==="<"&&this._allow_regexp_or_xml(t)){var s="",r=this.__patterns.xml.read_match();if(r){for(var n=r[2].replace(/^{\s+/,"{").replace(/\s+}$/,"}"),i=n.indexOf("{")===0,o=0;r;){var a=!!r[1],l=r[2],c=!!r[r.length-1]||l.slice(0,8)==="![CDATA[";if(!c&&(l===n||i&&l.replace(/^{\s+/,"{").replace(/\s+}$/,"}"))&&(a?--o:++o),s+=r[0],o<=0)break;r=this.__patterns.xml.read_match()}return r||(s+=this._input.match(/[\s\S]*/g)[0]),s=s.replace(ct.allLineBreaks,`
`),this._create_token(D.STRING,s)}}return null};function mU(e){for(var t="",s=0,r=new sU(e),n=null;r.hasNext();)if(n=r.match(/([\s]|[^\\]|\\\\)+/g),n&&(t+=n[0]),r.peek()==="\\"){if(r.next(),r.peek()==="x")n=r.match(/x([0-9A-Fa-f]{2})/g);else if(r.peek()==="u")n=r.match(/u([0-9A-Fa-f]{4})/g);else{t+="\\",r.hasNext()&&(t+=r.next());continue}if(!n||(s=parseInt(n[1],16),s>126&&s<=255&&n[0].indexOf("x")===0))return e;if(s>=0&&s<32){t+="\\"+n[0];continue}else s===34||s===39||s===92?t+="\\"+String.fromCharCode(s):t+=String.fromCharCode(s)}return t}qe.prototype._read_string_recursive=function(e,t,s){var r,n;e==="'"?n=this.__patterns.single_quote:e==='"'?n=this.__patterns.double_quote:e==="`"?n=this.__patterns.template_text:e==="}"&&(n=this.__patterns.template_expression);for(var i=n.read(),o="";this._input.hasNext();){if(o=this._input.next(),o===e||!t&&ct.newline.test(o)){this._input.back();break}else o==="\\"&&this._input.hasNext()?(r=this._input.peek(),r==="x"||r==="u"?this.has_char_escapes=!0:r==="\r"&&this._input.peek(1)===`
`&&this._input.next(),o+=this._input.next()):s&&(s==="${"&&o==="$"&&this._input.peek()==="{"&&(o+=this._input.next()),s===o&&(e==="`"?o+=this._read_string_recursive("}",t,"`"):o+=this._read_string_recursive("`",t,"${"),this._input.hasNext()&&(o+=this._input.next())));o+=n.read(),i+=o}return i};tn.exports.Tokenizer=qe;tn.exports.TOKEN=D;tn.exports.positionable_operators=cU.slice();tn.exports.line_starters=qx.slice()});var Bx=w((l9,Hx)=>{"use strict";var fU=Ei().Output,hU=Ic().Token,Ui=Bc(),gU=Dc().Options,_U=sn().Tokenizer,an=sn().line_starters,rn=sn().positionable_operators,L=sn().TOKEN;function V(e,t){return t.indexOf(e)!==-1}function yU(e){return e.replace(/^\s+/g,"")}function vU(e){for(var t={},s=0;s<e.length;s++)t[e[s].replace(/-/g,"_")]=e[s];return t}function pt(e,t){return e&&e.type===L.RESERVED&&e.text===t}function oe(e,t){return e&&e.type===L.RESERVED&&V(e.text,t)}var Ai=["case","return","do","if","throw","else","await","break","continue","async"],bU=["before-newline","after-newline","preserve-newline"],nn=vU(bU),Rx=[nn.before_newline,nn.preserve_newline],N={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"};function Ix(e,t){t.multiline_frame||t.mode===N.ForInitializer||t.mode===N.Conditional||e.remove_indent(t.start_line_index)}function wU(e){e=e.replace(Ui.allLineBreaks,`
`);for(var t=[],s=e.indexOf(`
`);s!==-1;)t.push(e.substring(0,s)),e=e.substring(s+1),s=e.indexOf(`
`);return e.length&&t.push(e),t}function ps(e){return e===N.ArrayLiteral}function on(e){return V(e,[N.Expression,N.ForInitializer,N.Conditional])}function xU(e,t){for(var s=0;s<e.length;s++){var r=e[s].trim();if(r.charAt(0)!==t)return!1}return!0}function SU(e,t){for(var s=0,r=e.length,n;s<r;s++)if(n=e[s],n&&n.indexOf(t)!==0)return!1;return!0}function Z(e,t){t=t||{},this._source_text=e||"",this._output=null,this._tokens=null,this._last_last_text=null,this._flags=null,this._previous_flags=null,this._flag_store=null,this._options=new gU(t)}Z.prototype.create_flags=function(e,t){var s=0;e&&(s=e.indentation_level,!this._output.just_added_newline()&&e.line_indent_level>s&&(s=e.line_indent_level));var r={mode:t,parent:e,last_token:e?e.last_token:new hU(L.START_BLOCK,""),last_word:e?e.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,inline_frame:!1,if_block:!1,else_block:!1,do_block:!1,do_while:!1,import_block:!1,in_case_statement:!1,in_case:!1,case_body:!1,indentation_level:s,alignment:0,line_indent_level:e?e.line_indent_level:s,start_line_index:this._output.get_line_number(),ternary_depth:0};return r};Z.prototype._reset=function(e){var t=e.match(/^[\t ]*/)[0];this._last_last_text="",this._output=new fU(this._options,t),this._output.raw=this._options.test_output_raw,this._flag_store=[],this.set_mode(N.BlockStatement);var s=new _U(e,this._options);return this._tokens=s.tokenize(),e};Z.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e,t=this._reset(this._source_text),s=this._options.eol;this._options.eol==="auto"&&(s=`
`,t&&Ui.lineBreak.test(t||"")&&(s=t.match(Ui.lineBreak)[0]));for(var r=this._tokens.next();r;)this.handle_token(r),this._last_last_text=this._flags.last_token.text,this._flags.last_token=r,r=this._tokens.next();return e=this._output.get_code(s),e};Z.prototype.handle_token=function(e,t){e.type===L.START_EXPR?this.handle_start_expr(e):e.type===L.END_EXPR?this.handle_end_expr(e):e.type===L.START_BLOCK?this.handle_start_block(e):e.type===L.END_BLOCK?this.handle_end_block(e):e.type===L.WORD?this.handle_word(e):e.type===L.RESERVED?this.handle_word(e):e.type===L.SEMICOLON?this.handle_semicolon(e):e.type===L.STRING?this.handle_string(e):e.type===L.EQUALS?this.handle_equals(e):e.type===L.OPERATOR?this.handle_operator(e):e.type===L.COMMA?this.handle_comma(e):e.type===L.BLOCK_COMMENT?this.handle_block_comment(e,t):e.type===L.COMMENT?this.handle_comment(e,t):e.type===L.DOT?this.handle_dot(e):e.type===L.EOF?this.handle_eof(e):e.type===L.UNKNOWN?this.handle_unknown(e,t):this.handle_unknown(e,t)};Z.prototype.handle_whitespace_and_comments=function(e,t){var s=e.newlines,r=this._options.keep_array_indentation&&ps(this._flags.mode);if(e.comments_before)for(var n=e.comments_before.next();n;)this.handle_whitespace_and_comments(n,t),this.handle_token(n,t),n=e.comments_before.next();if(r)for(var i=0;i<s;i+=1)this.print_newline(i>0,t);else if(this._options.max_preserve_newlines&&s>this._options.max_preserve_newlines&&(s=this._options.max_preserve_newlines),this._options.preserve_newlines&&s>1){this.print_newline(!1,t);for(var o=1;o<s;o+=1)this.print_newline(!0,t)}};var Kc=["async","break","continue","return","throw","yield"];Z.prototype.allow_wrap_or_preserved_newline=function(e,t){if(t=t===void 0?!1:t,!this._output.just_added_newline()){var s=this._options.preserve_newlines&&e.newlines||t,r=V(this._flags.last_token.text,rn)||V(e.text,rn);if(r){var n=V(this._flags.last_token.text,rn)&&V(this._options.operator_position,Rx)||V(e.text,rn);s=s&&n}if(s)this.print_newline(!1,!0);else if(this._options.wrap_line_length){if(oe(this._flags.last_token,Kc))return;this._output.set_wrap_point()}}};Z.prototype.print_newline=function(e,t){if(!t&&this._flags.last_token.text!==";"&&this._flags.last_token.text!==","&&this._flags.last_token.text!=="="&&(this._flags.last_token.type!==L.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++"))for(var s=this._tokens.peek();this._flags.mode===N.Statement&&!(this._flags.if_block&&pt(s,"else"))&&!this._flags.do_block;)this.restore_mode();this._output.add_new_line(e)&&(this._flags.multiline_frame=!0)};Z.prototype.print_token_line_indentation=function(e){this._output.just_added_newline()&&(this._options.keep_array_indentation&&e.newlines&&(e.text==="["||ps(this._flags.mode))?(this._output.current_line.set_indent(-1),this._output.current_line.push(e.whitespace_before),this._output.space_before_token=!1):this._output.set_indent(this._flags.indentation_level,this._flags.alignment)&&(this._flags.line_indent_level=this._flags.indentation_level))};Z.prototype.print_token=function(e){if(this._output.raw){this._output.add_raw_token(e);return}if(this._options.comma_first&&e.previous&&e.previous.type===L.COMMA&&this._output.just_added_newline()&&this._output.previous_line.last()===","){var t=this._output.previous_line.pop();this._output.previous_line.is_empty()&&(this._output.previous_line.push(t),this._output.trim(!0),this._output.current_line.pop(),this._output.trim()),this.print_token_line_indentation(e),this._output.add_token(","),this._output.space_before_token=!0}this.print_token_line_indentation(e),this._output.non_breaking_space=!0,this._output.add_token(e.text),this._output.previous_token_wrapped&&(this._flags.multiline_frame=!0)};Z.prototype.indent=function(){this._flags.indentation_level+=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment)};Z.prototype.deindent=function(){this._flags.indentation_level>0&&(!this._flags.parent||this._flags.indentation_level>this._flags.parent.indentation_level)&&(this._flags.indentation_level-=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment))};Z.prototype.set_mode=function(e){this._flags?(this._flag_store.push(this._flags),this._previous_flags=this._flags):this._previous_flags=this.create_flags(null,e),this._flags=this.create_flags(this._previous_flags,e),this._output.set_indent(this._flags.indentation_level,this._flags.alignment)};Z.prototype.restore_mode=function(){this._flag_store.length>0&&(this._previous_flags=this._flags,this._flags=this._flag_store.pop(),this._previous_flags.mode===N.Statement&&Ix(this._output,this._previous_flags),this._output.set_indent(this._flags.indentation_level,this._flags.alignment))};Z.prototype.start_of_object_property=function(){return this._flags.parent.mode===N.ObjectLiteral&&this._flags.mode===N.Statement&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||oe(this._flags.last_token,["get","set"]))};Z.prototype.start_of_statement=function(e){var t=!1;return t=t||oe(this._flags.last_token,["var","let","const"])&&e.type===L.WORD,t=t||pt(this._flags.last_token,"do"),t=t||!(this._flags.parent.mode===N.ObjectLiteral&&this._flags.mode===N.Statement)&&oe(this._flags.last_token,Kc)&&!e.newlines,t=t||pt(this._flags.last_token,"else")&&!(pt(e,"if")&&!e.comments_before),t=t||this._flags.last_token.type===L.END_EXPR&&(this._previous_flags.mode===N.ForInitializer||this._previous_flags.mode===N.Conditional),t=t||this._flags.last_token.type===L.WORD&&this._flags.mode===N.BlockStatement&&!this._flags.in_case&&!(e.text==="--"||e.text==="++")&&this._last_last_text!=="function"&&e.type!==L.WORD&&e.type!==L.RESERVED,t=t||this._flags.mode===N.ObjectLiteral&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||oe(this._flags.last_token,["get","set"])),t?(this.set_mode(N.Statement),this.indent(),this.handle_whitespace_and_comments(e,!0),this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e,oe(e,["do","for","if","while"])),!0):!1};Z.prototype.handle_start_expr=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e);var t=N.Expression;if(e.text==="["){if(this._flags.last_token.type===L.WORD||this._flags.last_token.text===")"){oe(this._flags.last_token,an)&&(this._output.space_before_token=!0),this.print_token(e),this.set_mode(t),this.indent(),this._options.space_in_paren&&(this._output.space_before_token=!0);return}t=N.ArrayLiteral,ps(this._flags.mode)&&(this._flags.last_token.text==="["||this._flags.last_token.text===","&&(this._last_last_text==="]"||this._last_last_text==="}"))&&(this._options.keep_array_indentation||this.print_newline()),V(this._flags.last_token.type,[L.START_EXPR,L.END_EXPR,L.WORD,L.OPERATOR,L.DOT])||(this._output.space_before_token=!0)}else{if(this._flags.last_token.type===L.RESERVED)this._flags.last_token.text==="for"?(this._output.space_before_token=this._options.space_before_conditional,t=N.ForInitializer):V(this._flags.last_token.text,["if","while","switch"])?(this._output.space_before_token=this._options.space_before_conditional,t=N.Conditional):V(this._flags.last_word,["await","async"])?this._output.space_before_token=!0:this._flags.last_token.text==="import"&&e.whitespace_before===""?this._output.space_before_token=!1:(V(this._flags.last_token.text,an)||this._flags.last_token.text==="catch")&&(this._output.space_before_token=!0);else if(this._flags.last_token.type===L.EQUALS||this._flags.last_token.type===L.OPERATOR)this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e);else if(this._flags.last_token.type===L.WORD){this._output.space_before_token=!1;var s=this._tokens.peek(-3);if(this._options.space_after_named_function&&s){var r=this._tokens.peek(-4);oe(s,["async","function"])||s.text==="*"&&oe(r,["async","function"])?this._output.space_before_token=!0:this._flags.mode===N.ObjectLiteral&&(s.text==="{"||s.text===","||s.text==="*"&&(r.text==="{"||r.text===","))&&(this._output.space_before_token=!0)}}else this.allow_wrap_or_preserved_newline(e);(this._flags.last_token.type===L.RESERVED&&(this._flags.last_word==="function"||this._flags.last_word==="typeof")||this._flags.last_token.text==="*"&&(V(this._last_last_text,["function","yield"])||this._flags.mode===N.ObjectLiteral&&V(this._last_last_text,["{",","])))&&(this._output.space_before_token=this._options.space_after_anon_function)}this._flags.last_token.text===";"||this._flags.last_token.type===L.START_BLOCK?this.print_newline():(this._flags.last_token.type===L.END_EXPR||this._flags.last_token.type===L.START_EXPR||this._flags.last_token.type===L.END_BLOCK||this._flags.last_token.text==="."||this._flags.last_token.type===L.COMMA)&&this.allow_wrap_or_preserved_newline(e,e.newlines),this.print_token(e),this.set_mode(t),this._options.space_in_paren&&(this._output.space_before_token=!0),this.indent()};Z.prototype.handle_end_expr=function(e){for(;this._flags.mode===N.Statement;)this.restore_mode();this.handle_whitespace_and_comments(e),this._flags.multiline_frame&&this.allow_wrap_or_preserved_newline(e,e.text==="]"&&ps(this._flags.mode)&&!this._options.keep_array_indentation),this._options.space_in_paren&&(this._flags.last_token.type===L.START_EXPR&&!this._options.space_in_empty_paren?(this._output.trim(),this._output.space_before_token=!1):this._output.space_before_token=!0),this.deindent(),this.print_token(e),this.restore_mode(),Ix(this._output,this._previous_flags),this._flags.do_while&&this._previous_flags.mode===N.Conditional&&(this._previous_flags.mode=N.Expression,this._flags.do_block=!1,this._flags.do_while=!1)};Z.prototype.handle_start_block=function(e){this.handle_whitespace_and_comments(e);var t=this._tokens.peek(),s=this._tokens.peek(1);this._flags.last_word==="switch"&&this._flags.last_token.type===L.END_EXPR?(this.set_mode(N.BlockStatement),this._flags.in_case_statement=!0):this._flags.case_body?this.set_mode(N.BlockStatement):s&&(V(s.text,[":",","])&&V(t.type,[L.STRING,L.WORD,L.RESERVED])||V(t.text,["get","set","..."])&&V(s.type,[L.WORD,L.RESERVED]))?V(this._last_last_text,["class","interface"])?this.set_mode(N.BlockStatement):this.set_mode(N.ObjectLiteral):this._flags.last_token.type===L.OPERATOR&&this._flags.last_token.text==="=>"?this.set_mode(N.BlockStatement):V(this._flags.last_token.type,[L.EQUALS,L.START_EXPR,L.COMMA,L.OPERATOR])||oe(this._flags.last_token,["return","throw","import","default"])?this.set_mode(N.ObjectLiteral):this.set_mode(N.BlockStatement);var r=!t.comments_before&&t.text==="}",n=r&&this._flags.last_word==="function"&&this._flags.last_token.type===L.END_EXPR;if(this._options.brace_preserve_inline){var i=0,o=null;this._flags.inline_frame=!0;do if(i+=1,o=this._tokens.peek(i-1),o.newlines){this._flags.inline_frame=!1;break}while(o.type!==L.EOF&&!(o.type===L.END_BLOCK&&o.opened===e))}(this._options.brace_style==="expand"||this._options.brace_style==="none"&&e.newlines)&&!this._flags.inline_frame?this._flags.last_token.type!==L.OPERATOR&&(n||this._flags.last_token.type===L.EQUALS||oe(this._flags.last_token,Ai)&&this._flags.last_token.text!=="else")?this._output.space_before_token=!0:this.print_newline(!1,!0):(ps(this._previous_flags.mode)&&(this._flags.last_token.type===L.START_EXPR||this._flags.last_token.type===L.COMMA)&&((this._flags.last_token.type===L.COMMA||this._options.space_in_paren)&&(this._output.space_before_token=!0),(this._flags.last_token.type===L.COMMA||this._flags.last_token.type===L.START_EXPR&&this._flags.inline_frame)&&(this.allow_wrap_or_preserved_newline(e),this._previous_flags.multiline_frame=this._previous_flags.multiline_frame||this._flags.multiline_frame,this._flags.multiline_frame=!1)),this._flags.last_token.type!==L.OPERATOR&&this._flags.last_token.type!==L.START_EXPR&&(this._flags.last_token.type===L.START_BLOCK&&!this._flags.inline_frame?this.print_newline():this._output.space_before_token=!0)),this.print_token(e),this.indent(),!r&&!(this._options.brace_preserve_inline&&this._flags.inline_frame)&&this.print_newline()};Z.prototype.handle_end_block=function(e){for(this.handle_whitespace_and_comments(e);this._flags.mode===N.Statement;)this.restore_mode();var t=this._flags.last_token.type===L.START_BLOCK;this._flags.inline_frame&&!t?this._output.space_before_token=!0:this._options.brace_style==="expand"?t||this.print_newline():t||(ps(this._flags.mode)&&this._options.keep_array_indentation?(this._options.keep_array_indentation=!1,this.print_newline(),this._options.keep_array_indentation=!0):this.print_newline()),this.restore_mode(),this.print_token(e)};Z.prototype.handle_word=function(e){if(e.type===L.RESERVED){if(V(e.text,["set","get"])&&this._flags.mode!==N.ObjectLiteral)e.type=L.WORD;else if(e.text==="import"&&this._tokens.peek().text==="(")e.type=L.WORD;else if(V(e.text,["as","from"])&&!this._flags.import_block)e.type=L.WORD;else if(this._flags.mode===N.ObjectLiteral){var t=this._tokens.peek();t.text===":"&&(e.type=L.WORD)}}if(this.start_of_statement(e)?oe(this._flags.last_token,["var","let","const"])&&e.type===L.WORD&&(this._flags.declaration_statement=!0):e.newlines&&!on(this._flags.mode)&&(this._flags.last_token.type!==L.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++")&&this._flags.last_token.type!==L.EQUALS&&(this._options.preserve_newlines||!oe(this._flags.last_token,["var","let","const","set","get"]))?(this.handle_whitespace_and_comments(e),this.print_newline()):this.handle_whitespace_and_comments(e),this._flags.do_block&&!this._flags.do_while)if(pt(e,"while")){this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0,this._flags.do_while=!0;return}else this.print_newline(),this._flags.do_block=!1;if(this._flags.if_block)if(!this._flags.else_block&&pt(e,"else"))this._flags.else_block=!0;else{for(;this._flags.mode===N.Statement;)this.restore_mode();this._flags.if_block=!1,this._flags.else_block=!1}if(this._flags.in_case_statement&&oe(e,["case","default"])){this.print_newline(),this._flags.last_token.type!==L.END_BLOCK&&(this._flags.case_body||this._options.jslint_happy)&&this.deindent(),this._flags.case_body=!1,this.print_token(e),this._flags.in_case=!0;return}if((this._flags.last_token.type===L.COMMA||this._flags.last_token.type===L.START_EXPR||this._flags.last_token.type===L.EQUALS||this._flags.last_token.type===L.OPERATOR)&&(this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e)),pt(e,"function")){(V(this._flags.last_token.text,["}",";"])||this._output.just_added_newline()&&!(V(this._flags.last_token.text,["(","[","{",":","=",","])||this._flags.last_token.type===L.OPERATOR))&&!this._output.just_added_blankline()&&!e.comments_before&&(this.print_newline(),this.print_newline(!0)),this._flags.last_token.type===L.RESERVED||this._flags.last_token.type===L.WORD?oe(this._flags.last_token,["get","set","new","export"])||oe(this._flags.last_token,Kc)?this._output.space_before_token=!0:pt(this._flags.last_token,"default")&&this._last_last_text==="export"?this._output.space_before_token=!0:this._flags.last_token.text==="declare"?this._output.space_before_token=!0:this.print_newline():this._flags.last_token.type===L.OPERATOR||this._flags.last_token.text==="="?this._output.space_before_token=!0:!this._flags.multiline_frame&&(on(this._flags.mode)||ps(this._flags.mode))||this.print_newline(),this.print_token(e),this._flags.last_word=e.text;return}var s="NONE";if(this._flags.last_token.type===L.END_BLOCK?this._previous_flags.inline_frame?s="SPACE":oe(e,["else","catch","finally","from"])?this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&e.newlines?s="NEWLINE":(s="SPACE",this._output.space_before_token=!0):s="NEWLINE":this._flags.last_token.type===L.SEMICOLON&&this._flags.mode===N.BlockStatement?s="NEWLINE":this._flags.last_token.type===L.SEMICOLON&&on(this._flags.mode)?s="SPACE":this._flags.last_token.type===L.STRING?s="NEWLINE":this._flags.last_token.type===L.RESERVED||this._flags.last_token.type===L.WORD||this._flags.last_token.text==="*"&&(V(this._last_last_text,["function","yield"])||this._flags.mode===N.ObjectLiteral&&V(this._last_last_text,["{",","]))?s="SPACE":this._flags.last_token.type===L.START_BLOCK?this._flags.inline_frame?s="SPACE":s="NEWLINE":this._flags.last_token.type===L.END_EXPR&&(this._output.space_before_token=!0,s="NEWLINE"),oe(e,an)&&this._flags.last_token.text!==")"&&(this._flags.inline_frame||this._flags.last_token.text==="else"||this._flags.last_token.text==="export"?s="SPACE":s="NEWLINE"),oe(e,["else","catch","finally"]))if((!(this._flags.last_token.type===L.END_BLOCK&&this._previous_flags.mode===N.BlockStatement)||this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&e.newlines)&&!this._flags.inline_frame)this.print_newline();else{this._output.trim(!0);var r=this._output.current_line;r.last()!=="}"&&this.print_newline(),this._output.space_before_token=!0}else s==="NEWLINE"?oe(this._flags.last_token,Ai)?this._output.space_before_token=!0:this._flags.last_token.text==="declare"&&oe(e,["var","let","const"])?this._output.space_before_token=!0:this._flags.last_token.type!==L.END_EXPR?(this._flags.last_token.type!==L.START_EXPR||!oe(e,["var","let","const"]))&&this._flags.last_token.text!==":"&&(pt(e,"if")&&pt(e.previous,"else")?this._output.space_before_token=!0:this.print_newline()):oe(e,an)&&this._flags.last_token.text!==")"&&this.print_newline():this._flags.multiline_frame&&ps(this._flags.mode)&&this._flags.last_token.text===","&&this._last_last_text==="}"?this.print_newline():s==="SPACE"&&(this._output.space_before_token=!0);e.previous&&(e.previous.type===L.WORD||e.previous.type===L.RESERVED)&&(this._output.space_before_token=!0),this.print_token(e),this._flags.last_word=e.text,e.type===L.RESERVED&&(e.text==="do"?this._flags.do_block=!0:e.text==="if"?this._flags.if_block=!0:e.text==="import"?this._flags.import_block=!0:this._flags.import_block&&pt(e,"from")&&(this._flags.import_block=!1))};Z.prototype.handle_semicolon=function(e){this.start_of_statement(e)?this._output.space_before_token=!1:this.handle_whitespace_and_comments(e);for(var t=this._tokens.peek();this._flags.mode===N.Statement&&!(this._flags.if_block&&pt(t,"else"))&&!this._flags.do_block;)this.restore_mode();this._flags.import_block&&(this._flags.import_block=!1),this.print_token(e)};Z.prototype.handle_string=function(e){e.text.startsWith("`")&&e.newlines===0&&e.whitespace_before===""&&(e.previous.text===")"||this._flags.last_token.type===L.WORD)||(this.start_of_statement(e)?this._output.space_before_token=!0:(this.handle_whitespace_and_comments(e),this._flags.last_token.type===L.RESERVED||this._flags.last_token.type===L.WORD||this._flags.inline_frame?this._output.space_before_token=!0:this._flags.last_token.type===L.COMMA||this._flags.last_token.type===L.START_EXPR||this._flags.last_token.type===L.EQUALS||this._flags.last_token.type===L.OPERATOR?this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e):e.text.startsWith("`")&&this._flags.last_token.type===L.END_EXPR&&(e.previous.text==="]"||e.previous.text===")")&&e.newlines===0?this._output.space_before_token=!0:this.print_newline())),this.print_token(e)};Z.prototype.handle_equals=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e),this._flags.declaration_statement&&(this._flags.declaration_assignment=!0),this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0};Z.prototype.handle_comma=function(e){this.handle_whitespace_and_comments(e,!0),this.print_token(e),this._output.space_before_token=!0,this._flags.declaration_statement?(on(this._flags.parent.mode)&&(this._flags.declaration_assignment=!1),this._flags.declaration_assignment?(this._flags.declaration_assignment=!1,this.print_newline(!1,!0)):this._options.comma_first&&this.allow_wrap_or_preserved_newline(e)):this._flags.mode===N.ObjectLiteral||this._flags.mode===N.Statement&&this._flags.parent.mode===N.ObjectLiteral?(this._flags.mode===N.Statement&&this.restore_mode(),this._flags.inline_frame||this.print_newline()):this._options.comma_first&&this.allow_wrap_or_preserved_newline(e)};Z.prototype.handle_operator=function(e){var t=e.text==="*"&&(oe(this._flags.last_token,["function","yield"])||V(this._flags.last_token.type,[L.START_BLOCK,L.COMMA,L.END_BLOCK,L.SEMICOLON])),s=V(e.text,["-","+"])&&(V(this._flags.last_token.type,[L.START_BLOCK,L.START_EXPR,L.EQUALS,L.OPERATOR])||V(this._flags.last_token.text,an)||this._flags.last_token.text===",");if(!this.start_of_statement(e)){var r=!t;this.handle_whitespace_and_comments(e,r)}if(oe(this._flags.last_token,Ai)){this._output.space_before_token=!0,this.print_token(e);return}if(e.text==="*"&&this._flags.last_token.type===L.DOT){this.print_token(e);return}if(e.text==="::"){this.print_token(e);return}if(this._flags.last_token.type===L.OPERATOR&&V(this._options.operator_position,Rx)&&this.allow_wrap_or_preserved_newline(e),e.text===":"&&this._flags.in_case){this.print_token(e),this._flags.in_case=!1,this._flags.case_body=!0,this._tokens.peek().type!==L.START_BLOCK?(this.indent(),this.print_newline()):this._output.space_before_token=!0;return}var n=!0,i=!0,o=!1;if(e.text===":"?this._flags.ternary_depth===0?n=!1:(this._flags.ternary_depth-=1,o=!0):e.text==="?"&&(this._flags.ternary_depth+=1),!s&&!t&&this._options.preserve_newlines&&V(e.text,rn)){var a=e.text===":",l=a&&o,c=a&&!o;switch(this._options.operator_position){case nn.before_newline:this._output.space_before_token=!c,this.print_token(e),(!a||l)&&this.allow_wrap_or_preserved_newline(e),this._output.space_before_token=!0;return;case nn.after_newline:this._output.space_before_token=!0,!a||l?this._tokens.peek().newlines?this.print_newline(!1,!0):this.allow_wrap_or_preserved_newline(e):this._output.space_before_token=!1,this.print_token(e),this._output.space_before_token=!0;return;case nn.preserve_newline:c||this.allow_wrap_or_preserved_newline(e),n=!(this._output.just_added_newline()||c),this._output.space_before_token=n,this.print_token(e),this._output.space_before_token=!0;return}}if(t){this.allow_wrap_or_preserved_newline(e),n=!1;var p=this._tokens.peek();i=p&&V(p.type,[L.WORD,L.RESERVED])}else e.text==="..."?(this.allow_wrap_or_preserved_newline(e),n=this._flags.last_token.type===L.START_BLOCK,i=!1):(V(e.text,["--","++","!","~"])||s)&&((this._flags.last_token.type===L.COMMA||this._flags.last_token.type===L.START_EXPR)&&this.allow_wrap_or_preserved_newline(e),n=!1,i=!1,e.newlines&&(e.text==="--"||e.text==="++")&&this.print_newline(!1,!0),this._flags.last_token.text===";"&&on(this._flags.mode)&&(n=!0),this._flags.last_token.type===L.RESERVED?n=!0:this._flags.last_token.type===L.END_EXPR?n=!(this._flags.last_token.text==="]"&&(e.text==="--"||e.text==="++")):this._flags.last_token.type===L.OPERATOR&&(n=V(e.text,["--","-","++","+"])&&V(this._flags.last_token.text,["--","-","++","+"]),V(e.text,["+","-"])&&V(this._flags.last_token.text,["--","++"])&&(i=!0)),(this._flags.mode===N.BlockStatement&&!this._flags.inline_frame||this._flags.mode===N.Statement)&&(this._flags.last_token.text==="{"||this._flags.last_token.text===";")&&this.print_newline());this._output.space_before_token=this._output.space_before_token||n,this.print_token(e),this._output.space_before_token=i};Z.prototype.handle_block_comment=function(e,t){if(this._output.raw){this._output.add_raw_token(e),e.directives&&e.directives.preserve==="end"&&(this._output.raw=this._options.test_output_raw);return}if(e.directives){this.print_newline(!1,t),this.print_token(e),e.directives.preserve==="start"&&(this._output.raw=!0),this.print_newline(!1,!0);return}if(!Ui.newline.test(e.text)&&!e.newlines){this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0;return}else this.print_block_commment(e,t)};Z.prototype.print_block_commment=function(e,t){var s=wU(e.text),r,n=!1,i=!1,o=e.whitespace_before,a=o.length;if(this.print_newline(!1,t),this.print_token_line_indentation(e),this._output.add_token(s[0]),this.print_newline(!1,t),s.length>1){for(s=s.slice(1),n=xU(s,"*"),i=SU(s,o),n&&(this._flags.alignment=1),r=0;r<s.length;r++)n?(this.print_token_line_indentation(e),this._output.add_token(yU(s[r]))):i&&s[r]?(this.print_token_line_indentation(e),this._output.add_token(s[r].substring(a))):(this._output.current_line.set_indent(-1),this._output.add_token(s[r])),this.print_newline(!1,t);this._flags.alignment=0}};Z.prototype.handle_comment=function(e,t){e.newlines?this.print_newline(!1,t):this._output.trim(!0),this._output.space_before_token=!0,this.print_token(e),this.print_newline(!1,t)};Z.prototype.handle_dot=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e,!0),oe(this._flags.last_token,Ai)?this._output.space_before_token=!1:this.allow_wrap_or_preserved_newline(e,this._flags.last_token.text===")"&&this._options.break_chained_methods),this._options.unindent_chained_methods&&this._output.just_added_newline()&&this.deindent(),this.print_token(e)};Z.prototype.handle_unknown=function(e,t){this.print_token(e),e.text[e.text.length-1]===`
`&&this.print_newline(!1,t)};Z.prototype.handle_eof=function(e){for(;this._flags.mode===N.Statement;)this.restore_mode();this.handle_whitespace_and_comments(e)};Hx.exports.Beautifier=Z});var Dx=w((c9,Xc)=>{"use strict";var LU=Bx().Beautifier,EU=Dc().Options;function kU(e,t){var s=new LU(e,t);return s.beautify()}Xc.exports=kU;Xc.exports.defaultOptions=function(){return new EU}});var Yc=w((p9,Fx)=>{"use strict";var Nx=Ti().Options;function $x(e){Nx.call(this,e,"css"),this.selector_separator_newline=this._get_boolean("selector_separator_newline",!0),this.newline_between_rules=this._get_boolean("newline_between_rules",!0);var t=this._get_boolean("space_around_selector_separator");this.space_around_combinator=this._get_boolean("space_around_combinator")||t;var s=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_style="collapse";for(var r=0;r<s.length;r++)s[r]!=="expand"?this.brace_style="collapse":this.brace_style=s[r]}$x.prototype=new Nx;Fx.exports.Options=$x});var Jx=w((u9,Gx)=>{"use strict";var TU=Yc().Options,CU=Ei().Output,jU=Ci().InputScanner,MU=ji().Directives,zx=new MU(/\/\*/,/\*\//),Wx=/\r\n|[\r\n]/,UU=/\r\n|[\r\n]/g,Pi=/\s/,AU=/(?:\s|\n)+/g,PU=/\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,OU=/\/\/(?:[^\n\r\u2028\u2029]*)/g;function Ft(e,t){this._source_text=e||"",this._options=new TU(t),this._ch=null,this._input=null,this.NESTED_AT_RULE={"@page":!0,"@font-face":!0,"@keyframes":!0,"@media":!0,"@supports":!0,"@document":!0},this.CONDITIONAL_GROUP_RULE={"@media":!0,"@supports":!0,"@document":!0}}Ft.prototype.eatString=function(e){var t="";for(this._ch=this._input.next();this._ch;){if(t+=this._ch,this._ch==="\\")t+=this._input.next();else if(e.indexOf(this._ch)!==-1||this._ch===`
`)break;this._ch=this._input.next()}return t};Ft.prototype.eatWhitespace=function(e){for(var t=Pi.test(this._input.peek()),s=0;Pi.test(this._input.peek());)this._ch=this._input.next(),e&&this._ch===`
`&&(s===0||s<this._options.max_preserve_newlines)&&(s++,this._output.add_new_line(!0));return t};Ft.prototype.foundNestedPseudoClass=function(){for(var e=0,t=1,s=this._input.peek(t);s;){if(s==="{")return!0;if(s==="(")e+=1;else if(s===")"){if(e===0)return!1;e-=1}else if(s===";"||s==="}")return!1;t++,s=this._input.peek(t)}return!1};Ft.prototype.print_string=function(e){this._output.set_indent(this._indentLevel),this._output.non_breaking_space=!0,this._output.add_token(e)};Ft.prototype.preserveSingleSpace=function(e){e&&(this._output.space_before_token=!0)};Ft.prototype.indent=function(){this._indentLevel++};Ft.prototype.outdent=function(){this._indentLevel>0&&this._indentLevel--};Ft.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e=this._source_text,t=this._options.eol;t==="auto"&&(t=`
`,e&&Wx.test(e||"")&&(t=e.match(Wx)[0])),e=e.replace(UU,`
`);var s=e.match(/^[\t ]*/)[0];this._output=new CU(this._options,s),this._input=new jU(e),this._indentLevel=0,this._nestedLevel=0,this._ch=null;for(var r=0,n=!1,i=!1,o=!1,a=!1,l=!1,c=this._ch,p,d,g;p=this._input.read(AU),d=p!=="",g=c,this._ch=this._input.next(),this._ch==="\\"&&this._input.hasNext()&&(this._ch+=this._input.next()),c=this._ch,this._ch;)if(this._ch==="/"&&this._input.peek()==="*"){this._output.add_new_line(),this._input.back();var _=this._input.read(PU),f=zx.get_directives(_);f&&f.ignore==="start"&&(_+=zx.readIgnored(this._input)),this.print_string(_),this.eatWhitespace(!0),this._output.add_new_line()}else if(this._ch==="/"&&this._input.peek()==="/")this._output.space_before_token=!0,this._input.back(),this.print_string(this._input.read(OU)),this.eatWhitespace(!0);else if(this._ch==="@")if(this.preserveSingleSpace(d),this._input.peek()==="{")this.print_string(this._ch+this.eatString("}"));else{this.print_string(this._ch);var u=this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);u.match(/[ :]$/)&&(u=this.eatString(": ").replace(/\s$/,""),this.print_string(u),this._output.space_before_token=!0),u=u.replace(/\s$/,""),u==="extend"?a=!0:u==="import"&&(l=!0),u in this.NESTED_AT_RULE?(this._nestedLevel+=1,u in this.CONDITIONAL_GROUP_RULE&&(o=!0)):!n&&r===0&&u.indexOf(":")!==-1&&(i=!0,this.indent())}else this._ch==="#"&&this._input.peek()==="{"?(this.preserveSingleSpace(d),this.print_string(this._ch+this.eatString("}"))):this._ch==="{"?(i&&(i=!1,this.outdent()),o?(o=!1,n=this._indentLevel>=this._nestedLevel):n=this._indentLevel>=this._nestedLevel-1,this._options.newline_between_rules&&n&&this._output.previous_line&&this._output.previous_line.item(-1)!=="{"&&this._output.ensure_empty_line_above("/",","),this._output.space_before_token=!0,this._options.brace_style==="expand"?(this._output.add_new_line(),this.print_string(this._ch),this.indent(),this._output.set_indent(this._indentLevel)):(this.indent(),this.print_string(this._ch)),this.eatWhitespace(!0),this._output.add_new_line()):this._ch==="}"?(this.outdent(),this._output.add_new_line(),g==="{"&&this._output.trim(!0),l=!1,a=!1,i&&(this.outdent(),i=!1),this.print_string(this._ch),n=!1,this._nestedLevel&&this._nestedLevel--,this.eatWhitespace(!0),this._output.add_new_line(),this._options.newline_between_rules&&!this._output.just_added_blankline()&&this._input.peek()!=="}"&&this._output.add_new_line(!0)):this._ch===":"?(n||o)&&!(this._input.lookBack("&")||this.foundNestedPseudoClass())&&!this._input.lookBack("(")&&!a&&r===0?(this.print_string(":"),i||(i=!0,this._output.space_before_token=!0,this.eatWhitespace(!0),this.indent())):(this._input.lookBack(" ")&&(this._output.space_before_token=!0),this._input.peek()===":"?(this._ch=this._input.next(),this.print_string("::")):this.print_string(":")):this._ch==='"'||this._ch==="'"?(this.preserveSingleSpace(d),this.print_string(this._ch+this.eatString(this._ch)),this.eatWhitespace(!0)):this._ch===";"?r===0?(i&&(this.outdent(),i=!1),a=!1,l=!1,this.print_string(this._ch),this.eatWhitespace(!0),this._input.peek()!=="/"&&this._output.add_new_line()):(this.print_string(this._ch),this.eatWhitespace(!0),this._output.space_before_token=!0):this._ch==="("?this._input.lookBack("url")?(this.print_string(this._ch),this.eatWhitespace(),r++,this.indent(),this._ch=this._input.next(),this._ch===")"||this._ch==='"'||this._ch==="'"?this._input.back():this._ch&&(this.print_string(this._ch+this.eatString(")")),r&&(r--,this.outdent()))):(this.preserveSingleSpace(d),this.print_string(this._ch),this.eatWhitespace(),r++,this.indent()):this._ch===")"?(r&&(r--,this.outdent()),this.print_string(this._ch)):this._ch===","?(this.print_string(this._ch),this.eatWhitespace(!0),this._options.selector_separator_newline&&!i&&r===0&&!l&&!a?this._output.add_new_line():this._output.space_before_token=!0):(this._ch===">"||this._ch==="+"||this._ch==="~")&&!i&&r===0?this._options.space_around_combinator?(this._output.space_before_token=!0,this.print_string(this._ch),this._output.space_before_token=!0):(this.print_string(this._ch),this.eatWhitespace(),this._ch&&Pi.test(this._ch)&&(this._ch="")):this._ch==="]"?this.print_string(this._ch):this._ch==="["?(this.preserveSingleSpace(d),this.print_string(this._ch)):this._ch==="="?(this.eatWhitespace(),this.print_string("="),Pi.test(this._ch)&&(this._ch="")):this._ch==="!"&&!this._input.lookBack("\\")?(this.print_string(" "),this.print_string(this._ch)):(this.preserveSingleSpace(d),this.print_string(this._ch));var m=this._output.get_code(t);return m};Gx.exports.Beautifier=Ft});var Vx=w((d9,Qc)=>{"use strict";var qU=Jx().Beautifier,RU=Yc().Options;function IU(e,t){var s=new qU(e,t);return s.beautify()}Qc.exports=IU;Qc.exports.defaultOptions=function(){return new RU}});var Zc=w((m9,Yx)=>{"use strict";var Kx=Ti().Options;function Xx(e){Kx.call(this,e,"html"),this.templating.length===1&&this.templating[0]==="auto"&&(this.templating=["django","erb","handlebars","php"]),this.indent_inner_html=this._get_boolean("indent_inner_html"),this.indent_body_inner_html=this._get_boolean("indent_body_inner_html",!0),this.indent_head_inner_html=this._get_boolean("indent_head_inner_html",!0),this.indent_handlebars=this._get_boolean("indent_handlebars",!0),this.wrap_attributes=this._get_selection("wrap_attributes",["auto","force","force-aligned","force-expand-multiline","aligned-multiple","preserve","preserve-aligned"]),this.wrap_attributes_indent_size=this._get_number("wrap_attributes_indent_size",this.indent_size),this.extra_liners=this._get_array("extra_liners",["head","body","/html"]),this.inline=this._get_array("inline",["a","abbr","area","audio","b","bdi","bdo","br","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","img","input","ins","kbd","keygen","label","map","mark","math","meter","noscript","object","output","progress","q","ruby","s","samp","select","small","span","strong","sub","sup","svg","template","textarea","time","u","var","video","wbr","text","acronym","big","strike","tt"]),this.void_elements=this._get_array("void_elements",["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr","!doctype","?xml","basefont","isindex"]),this.unformatted=this._get_array("unformatted",[]),this.content_unformatted=this._get_array("content_unformatted",["pre","textarea"]),this.unformatted_content_delimiter=this._get_characters("unformatted_content_delimiter"),this.indent_scripts=this._get_selection("indent_scripts",["normal","keep","separate"])}Xx.prototype=new Kx;Yx.exports.Options=Xx});var sp=w((f9,tp)=>{"use strict";var Zx=en().Tokenizer,ep=en().TOKEN,HU=ji().Directives,BU=Gc().TemplatablePattern,DU=Qr().Pattern,fe={TAG_OPEN:"TK_TAG_OPEN",TAG_CLOSE:"TK_TAG_CLOSE",ATTRIBUTE:"TK_ATTRIBUTE",EQUALS:"TK_EQUALS",VALUE:"TK_VALUE",COMMENT:"TK_COMMENT",TEXT:"TK_TEXT",UNKNOWN:"TK_UNKNOWN",START:ep.START,RAW:ep.RAW,EOF:ep.EOF},Qx=new HU(/<\!--/,/-->/),De=function(e,t){Zx.call(this,e,t),this._current_tag_name="";var s=new BU(this._input).read_options(this._options),r=new DU(this._input);if(this.__patterns={word:s.until(/[\n\r\t <]/),single_quote:s.until_after(/'/),double_quote:s.until_after(/"/),attribute:s.until(/[\n\r\t =>]|\/>/),element_name:s.until(/[\n\r\t >\/]/),handlebars_comment:r.starting_with(/{{!--/).until_after(/--}}/),handlebars:r.starting_with(/{{/).until_after(/}}/),handlebars_open:r.until(/[\n\r\t }]/),handlebars_raw_close:r.until(/}}/),comment:r.starting_with(/<!--/).until_after(/-->/),cdata:r.starting_with(/<!\[CDATA\[/).until_after(/]]>/),conditional_comment:r.starting_with(/<!\[/).until_after(/]>/),processing:r.starting_with(/<\?/).until_after(/\?>/)},this._options.indent_handlebars&&(this.__patterns.word=this.__patterns.word.exclude("handlebars")),this._unformatted_content_delimiter=null,this._options.unformatted_content_delimiter){var n=this._input.get_literal_regexp(this._options.unformatted_content_delimiter);this.__patterns.unformatted_content_delimiter=r.matching(n).until_after(n)}};De.prototype=new Zx;De.prototype._is_comment=function(e){return!1};De.prototype._is_opening=function(e){return e.type===fe.TAG_OPEN};De.prototype._is_closing=function(e,t){return e.type===fe.TAG_CLOSE&&t&&((e.text===">"||e.text==="/>")&&t.text[0]==="<"||e.text==="}}"&&t.text[0]==="{"&&t.text[1]==="{")};De.prototype._reset=function(){this._current_tag_name=""};De.prototype._get_next_token=function(e,t){var s=null;this._readWhitespace();var r=this._input.peek();return r===null?this._create_token(fe.EOF,""):(s=s||this._read_open_handlebars(r,t),s=s||this._read_attribute(r,e,t),s=s||this._read_close(r,t),s=s||this._read_raw_content(r,e,t),s=s||this._read_content_word(r),s=s||this._read_comment_or_cdata(r),s=s||this._read_processing(r),s=s||this._read_open(r,t),s=s||this._create_token(fe.UNKNOWN,this._input.next()),s)};De.prototype._read_comment_or_cdata=function(e){var t=null,s=null,r=null;if(e==="<"){var n=this._input.peek(1);n==="!"&&(s=this.__patterns.comment.read(),s?(r=Qx.get_directives(s),r&&r.ignore==="start"&&(s+=Qx.readIgnored(this._input))):s=this.__patterns.cdata.read()),s&&(t=this._create_token(fe.COMMENT,s),t.directives=r)}return t};De.prototype._read_processing=function(e){var t=null,s=null,r=null;if(e==="<"){var n=this._input.peek(1);(n==="!"||n==="?")&&(s=this.__patterns.conditional_comment.read(),s=s||this.__patterns.processing.read()),s&&(t=this._create_token(fe.COMMENT,s),t.directives=r)}return t};De.prototype._read_open=function(e,t){var s=null,r=null;return t||e==="<"&&(s=this._input.next(),this._input.peek()==="/"&&(s+=this._input.next()),s+=this.__patterns.element_name.read(),r=this._create_token(fe.TAG_OPEN,s)),r};De.prototype._read_open_handlebars=function(e,t){var s=null,r=null;return t||this._options.indent_handlebars&&e==="{"&&this._input.peek(1)==="{"&&(this._input.peek(2)==="!"?(s=this.__patterns.handlebars_comment.read(),s=s||this.__patterns.handlebars.read(),r=this._create_token(fe.COMMENT,s)):(s=this.__patterns.handlebars_open.read(),r=this._create_token(fe.TAG_OPEN,s))),r};De.prototype._read_close=function(e,t){var s=null,r=null;return t&&(t.text[0]==="<"&&(e===">"||e==="/"&&this._input.peek(1)===">")?(s=this._input.next(),e==="/"&&(s+=this._input.next()),r=this._create_token(fe.TAG_CLOSE,s)):t.text[0]==="{"&&e==="}"&&this._input.peek(1)==="}"&&(this._input.next(),this._input.next(),r=this._create_token(fe.TAG_CLOSE,"}}"))),r};De.prototype._read_attribute=function(e,t,s){var r=null,n="";if(s&&s.text[0]==="<")if(e==="=")r=this._create_token(fe.EQUALS,this._input.next());else if(e==='"'||e==="'"){var i=this._input.next();e==='"'?i+=this.__patterns.double_quote.read():i+=this.__patterns.single_quote.read(),r=this._create_token(fe.VALUE,i)}else n=this.__patterns.attribute.read(),n&&(t.type===fe.EQUALS?r=this._create_token(fe.VALUE,n):r=this._create_token(fe.ATTRIBUTE,n));return r};De.prototype._is_content_unformatted=function(e){return this._options.void_elements.indexOf(e)===-1&&(this._options.content_unformatted.indexOf(e)!==-1||this._options.unformatted.indexOf(e)!==-1)};De.prototype._read_raw_content=function(e,t,s){var r="";if(s&&s.text[0]==="{")r=this.__patterns.handlebars_raw_close.read();else if(t.type===fe.TAG_CLOSE&&t.opened.text[0]==="<"&&t.text[0]!=="/"){var n=t.opened.text.substr(1).toLowerCase();if(n==="script"||n==="style"){var i=this._read_comment_or_cdata(e);if(i)return i.type=fe.TEXT,i;r=this._input.readUntil(new RegExp("</"+n+"[\\n\\r\\t ]*?>","ig"))}else this._is_content_unformatted(n)&&(r=this._input.readUntil(new RegExp("</"+n+"[\\n\\r\\t ]*?>","ig")))}return r?this._create_token(fe.TEXT,r):null};De.prototype._read_content_word=function(e){var t="";if(this._options.unformatted_content_delimiter&&e===this._options.unformatted_content_delimiter[0]&&(t=this.__patterns.unformatted_content_delimiter.read()),t||(t=this.__patterns.word.read()),t)return this._create_token(fe.TEXT,t)};tp.exports.Tokenizer=De;tp.exports.TOKEN=fe});var r0=w((h9,s0)=>{"use strict";var NU=Zc().Options,$U=Ei().Output,FU=sp().Tokenizer,ne=sp().TOKEN,e0=/\r\n|[\r\n]/,zU=/\r\n|[\r\n]/g,dt=function(e,t){this.indent_level=0,this.alignment_size=0,this.max_preserve_newlines=e.max_preserve_newlines,this.preserve_newlines=e.preserve_newlines,this._output=new $U(e,t)};dt.prototype.current_line_has_match=function(e){return this._output.current_line.has_match(e)};dt.prototype.set_space_before_token=function(e,t){this._output.space_before_token=e,this._output.non_breaking_space=t};dt.prototype.set_wrap_point=function(){this._output.set_indent(this.indent_level,this.alignment_size),this._output.set_wrap_point()};dt.prototype.add_raw_token=function(e){this._output.add_raw_token(e)};dt.prototype.print_preserved_newlines=function(e){var t=0;e.type!==ne.TEXT&&e.previous.type!==ne.TEXT&&(t=e.newlines?1:0),this.preserve_newlines&&(t=e.newlines<this.max_preserve_newlines+1?e.newlines:this.max_preserve_newlines+1);for(var s=0;s<t;s++)this.print_newline(s>0);return t!==0};dt.prototype.traverse_whitespace=function(e){return e.whitespace_before||e.newlines?(this.print_preserved_newlines(e)||(this._output.space_before_token=!0),!0):!1};dt.prototype.previous_token_wrapped=function(){return this._output.previous_token_wrapped};dt.prototype.print_newline=function(e){this._output.add_new_line(e)};dt.prototype.print_token=function(e){e.text&&(this._output.set_indent(this.indent_level,this.alignment_size),this._output.add_token(e.text))};dt.prototype.indent=function(){this.indent_level++};dt.prototype.get_full_indent=function(e){return e=this.indent_level+(e||0),e<1?"":this._output.get_indent_string(e)};var WU=function(e){for(var t=null,s=e.next;s.type!==ne.EOF&&e.closed!==s;){if(s.type===ne.ATTRIBUTE&&s.text==="type"){s.next&&s.next.type===ne.EQUALS&&s.next.next&&s.next.next.type===ne.VALUE&&(t=s.next.next.text);break}s=s.next}return t},GU=function(e,t){var s=null,r=null;return t.closed?(e==="script"?s="text/javascript":e==="style"&&(s="text/css"),s=WU(t)||s,s.search("text/css")>-1?r="css":s.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/)>-1?r="javascript":s.search(/(text|application|dojo)\/(x-)?(html)/)>-1?r="html":s.search(/test\/null/)>-1&&(r="null"),r):null};function ln(e,t){return t.indexOf(e)!==-1}function JU(e,t,s){this.parent=e||null,this.tag=t?t.tag_name:"",this.indent_level=s||0,this.parser_token=t||null}function Bs(e){this._printer=e,this._current_frame=null}Bs.prototype.get_parser_token=function(){return this._current_frame?this._current_frame.parser_token:null};Bs.prototype.record_tag=function(e){var t=new JU(this._current_frame,e,this._printer.indent_level);this._current_frame=t};Bs.prototype._try_pop_frame=function(e){var t=null;return e&&(t=e.parser_token,this._printer.indent_level=e.indent_level,this._current_frame=e.parent),t};Bs.prototype._get_frame=function(e,t){for(var s=this._current_frame;s&&e.indexOf(s.tag)===-1;){if(t&&t.indexOf(s.tag)!==-1){s=null;break}s=s.parent}return s};Bs.prototype.try_pop=function(e,t){var s=this._get_frame([e],t);return this._try_pop_frame(s)};Bs.prototype.indent_to_tag=function(e){var t=this._get_frame(e);t&&(this._printer.indent_level=t.indent_level)};function ut(e,t,s,r){this._source_text=e||"",t=t||{},this._js_beautify=s,this._css_beautify=r,this._tag_stack=null;var n=new NU(t,"html");this._options=n,this._is_wrap_attributes_force=this._options.wrap_attributes.substr(0,5)==="force",this._is_wrap_attributes_force_expand_multiline=this._options.wrap_attributes==="force-expand-multiline",this._is_wrap_attributes_force_aligned=this._options.wrap_attributes==="force-aligned",this._is_wrap_attributes_aligned_multiple=this._options.wrap_attributes==="aligned-multiple",this._is_wrap_attributes_preserve=this._options.wrap_attributes.substr(0,8)==="preserve",this._is_wrap_attributes_preserve_aligned=this._options.wrap_attributes==="preserve-aligned"}ut.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e=this._source_text,t=this._options.eol;this._options.eol==="auto"&&(t=`
`,e&&e0.test(e)&&(t=e.match(e0)[0])),e=e.replace(zU,`
`);var s=e.match(/^[\t ]*/)[0],r={text:"",type:""},n=new t0,i=new dt(this._options,s),o=new FU(e,this._options).tokenize();this._tag_stack=new Bs(i);for(var a=null,l=o.next();l.type!==ne.EOF;)l.type===ne.TAG_OPEN||l.type===ne.COMMENT?(a=this._handle_tag_open(i,l,n,r),n=a):l.type===ne.ATTRIBUTE||l.type===ne.EQUALS||l.type===ne.VALUE||l.type===ne.TEXT&&!n.tag_complete?a=this._handle_inside_tag(i,l,n,o):l.type===ne.TAG_CLOSE?a=this._handle_tag_close(i,l,n):l.type===ne.TEXT?a=this._handle_text(i,l,n):i.add_raw_token(l),r=a,l=o.next();var c=i._output.get_code(t);return c};ut.prototype._handle_tag_close=function(e,t,s){var r={text:t.text,type:t.type};return e.alignment_size=0,s.tag_complete=!0,e.set_space_before_token(t.newlines||t.whitespace_before!=="",!0),s.is_unformatted?e.add_raw_token(t):(s.tag_start_char==="<"&&(e.set_space_before_token(t.text[0]==="/",!0),this._is_wrap_attributes_force_expand_multiline&&s.has_wrapped_attrs&&e.print_newline(!1)),e.print_token(t)),s.indent_content&&!(s.is_unformatted||s.is_content_unformatted)&&(e.indent(),s.indent_content=!1),!s.is_inline_element&&!(s.is_unformatted||s.is_content_unformatted)&&e.set_wrap_point(),r};ut.prototype._handle_inside_tag=function(e,t,s,r){var n=s.has_wrapped_attrs,i={text:t.text,type:t.type};if(e.set_space_before_token(t.newlines||t.whitespace_before!=="",!0),s.is_unformatted)e.add_raw_token(t);else if(s.tag_start_char==="{"&&t.type===ne.TEXT)e.print_preserved_newlines(t)?(t.newlines=0,e.add_raw_token(t)):e.print_token(t);else{if(t.type===ne.ATTRIBUTE?(e.set_space_before_token(!0),s.attr_count+=1):(t.type===ne.EQUALS||t.type===ne.VALUE&&t.previous.type===ne.EQUALS)&&e.set_space_before_token(!1),t.type===ne.ATTRIBUTE&&s.tag_start_char==="<"&&((this._is_wrap_attributes_preserve||this._is_wrap_attributes_preserve_aligned)&&(e.traverse_whitespace(t),n=n||t.newlines!==0),this._is_wrap_attributes_force)){var o=s.attr_count>1;if(this._is_wrap_attributes_force_expand_multiline&&s.attr_count===1){var a=!0,l=0,c;do{if(c=r.peek(l),c.type===ne.ATTRIBUTE){a=!1;break}l+=1}while(l<4&&c.type!==ne.EOF&&c.type!==ne.TAG_CLOSE);o=!a}o&&(e.print_newline(!1),n=!0)}e.print_token(t),n=n||e.previous_token_wrapped(),s.has_wrapped_attrs=n}return i};ut.prototype._handle_text=function(e,t,s){var r={text:t.text,type:"TK_CONTENT"};return s.custom_beautifier_name?this._print_custom_beatifier_text(e,t,s):s.is_unformatted||s.is_content_unformatted?e.add_raw_token(t):(e.traverse_whitespace(t),e.print_token(t)),r};ut.prototype._print_custom_beatifier_text=function(e,t,s){var r=this;if(t.text!==""){var n=t.text,i,o=1,a="",l="";s.custom_beautifier_name==="javascript"&&typeof this._js_beautify=="function"?i=this._js_beautify:s.custom_beautifier_name==="css"&&typeof this._css_beautify=="function"?i=this._css_beautify:s.custom_beautifier_name==="html"&&(i=function(f,u){var m=new ut(f,u,r._js_beautify,r._css_beautify);return m.beautify()}),this._options.indent_scripts==="keep"?o=0:this._options.indent_scripts==="separate"&&(o=-e.indent_level);var c=e.get_full_indent(o);if(n=n.replace(/\n[ \t]*$/,""),s.custom_beautifier_name!=="html"&&n[0]==="<"&&n.match(/^(<!--|<!\[CDATA\[)/)){var p=/^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(n);if(!p){e.add_raw_token(t);return}a=c+p[1]+`
`,n=p[4],p[5]&&(l=c+p[5]),n=n.replace(/\n[ \t]*$/,""),(p[2]||p[3].indexOf(`
`)!==-1)&&(p=p[3].match(/[ \t]+$/),p&&(t.whitespace_before=p[0]))}if(n)if(i){var d=function(){this.eol=`
`};d.prototype=this._options.raw_options;var g=new d;n=i(c+n,g)}else{var _=t.whitespace_before;_&&(n=n.replace(new RegExp(`
(`+_+")?","g"),`
`)),n=c+n.replace(/\n/g,`
`+c)}a&&(n?n=a+n+`
`+l:n=a+l),e.print_newline(!1),n&&(t.text=n,t.whitespace_before="",t.newlines=0,e.add_raw_token(t),e.print_newline(!0))}};ut.prototype._handle_tag_open=function(e,t,s,r){var n=this._get_tag_open_token(t);return(s.is_unformatted||s.is_content_unformatted)&&!s.is_empty_element&&t.type===ne.TAG_OPEN&&t.text.indexOf("</")===0?(e.add_raw_token(t),n.start_tag_token=this._tag_stack.try_pop(n.tag_name)):(e.traverse_whitespace(t),this._set_tag_position(e,t,n,s,r),n.is_inline_element||e.set_wrap_point(),e.print_token(t)),(this._is_wrap_attributes_force_aligned||this._is_wrap_attributes_aligned_multiple||this._is_wrap_attributes_preserve_aligned)&&(n.alignment_size=t.text.length+1),!n.tag_complete&&!n.is_unformatted&&(e.alignment_size=n.alignment_size),n};var t0=function(e,t){if(this.parent=e||null,this.text="",this.type="TK_TAG_OPEN",this.tag_name="",this.is_inline_element=!1,this.is_unformatted=!1,this.is_content_unformatted=!1,this.is_empty_element=!1,this.is_start_tag=!1,this.is_end_tag=!1,this.indent_content=!1,this.multiline_content=!1,this.custom_beautifier_name=null,this.start_tag_token=null,this.attr_count=0,this.has_wrapped_attrs=!1,this.alignment_size=0,this.tag_complete=!1,this.tag_start_char="",this.tag_check="",!t)this.tag_complete=!0;else{var s;this.tag_start_char=t.text[0],this.text=t.text,this.tag_start_char==="<"?(s=t.text.match(/^<([^\s>]*)/),this.tag_check=s?s[1]:""):(s=t.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/),this.tag_check=s?s[1]:"",t.text==="{{#>"&&this.tag_check===">"&&t.next!==null&&(this.tag_check=t.next.text)),this.tag_check=this.tag_check.toLowerCase(),t.type===ne.COMMENT&&(this.tag_complete=!0),this.is_start_tag=this.tag_check.charAt(0)!=="/",this.tag_name=this.is_start_tag?this.tag_check:this.tag_check.substr(1),this.is_end_tag=!this.is_start_tag||t.closed&&t.closed.text==="/>",this.is_end_tag=this.is_end_tag||this.tag_start_char==="{"&&(this.text.length<3||/[^#\^]/.test(this.text.charAt(2)))}};ut.prototype._get_tag_open_token=function(e){var t=new t0(this._tag_stack.get_parser_token(),e);return t.alignment_size=this._options.wrap_attributes_indent_size,t.is_end_tag=t.is_end_tag||ln(t.tag_check,this._options.void_elements),t.is_empty_element=t.tag_complete||t.is_start_tag&&t.is_end_tag,t.is_unformatted=!t.tag_complete&&ln(t.tag_check,this._options.unformatted),t.is_content_unformatted=!t.is_empty_element&&ln(t.tag_check,this._options.content_unformatted),t.is_inline_element=ln(t.tag_name,this._options.inline)||t.tag_start_char==="{",t};ut.prototype._set_tag_position=function(e,t,s,r,n){if(s.is_empty_element||(s.is_end_tag?s.start_tag_token=this._tag_stack.try_pop(s.tag_name):(this._do_optional_end_element(s)&&(s.is_inline_element||e.print_newline(!1)),this._tag_stack.record_tag(s),(s.tag_name==="script"||s.tag_name==="style")&&!(s.is_unformatted||s.is_content_unformatted)&&(s.custom_beautifier_name=GU(s.tag_check,t)))),ln(s.tag_check,this._options.extra_liners)&&(e.print_newline(!1),e._output.just_added_blankline()||e.print_newline(!0)),s.is_empty_element){if(s.tag_start_char==="{"&&s.tag_check==="else"){this._tag_stack.indent_to_tag(["if","unless","each"]),s.indent_content=!0;var i=e.current_line_has_match(/{{#if/);i||e.print_newline(!1)}s.tag_name==="!--"&&n.type===ne.TAG_CLOSE&&r.is_end_tag&&s.text.indexOf(`
`)===-1||(s.is_inline_element||s.is_unformatted||e.print_newline(!1),this._calcluate_parent_multiline(e,s))}else if(s.is_end_tag){var o=!1;o=s.start_tag_token&&s.start_tag_token.multiline_content,o=o||!s.is_inline_element&&!(r.is_inline_element||r.is_unformatted)&&!(n.type===ne.TAG_CLOSE&&s.start_tag_token===r)&&n.type!=="TK_CONTENT",(s.is_content_unformatted||s.is_unformatted)&&(o=!1),o&&e.print_newline(!1)}else s.indent_content=!s.custom_beautifier_name,s.tag_start_char==="<"&&(s.tag_name==="html"?s.indent_content=this._options.indent_inner_html:s.tag_name==="head"?s.indent_content=this._options.indent_head_inner_html:s.tag_name==="body"&&(s.indent_content=this._options.indent_body_inner_html)),!(s.is_inline_element||s.is_unformatted)&&(n.type!=="TK_CONTENT"||s.is_content_unformatted)&&e.print_newline(!1),this._calcluate_parent_multiline(e,s)};ut.prototype._calcluate_parent_multiline=function(e,t){t.parent&&e._output.just_added_newline()&&!((t.is_inline_element||t.is_unformatted)&&t.parent.is_inline_element)&&(t.parent.multiline_content=!0)};var VU=["address","article","aside","blockquote","details","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","main","nav","ol","p","pre","section","table","ul"],KU=["a","audio","del","ins","map","noscript","video"];ut.prototype._do_optional_end_element=function(e){var t=null;if(!(e.is_empty_element||!e.is_start_tag||!e.parent)){if(e.tag_name==="body")t=t||this._tag_stack.try_pop("head");else if(e.tag_name==="li")t=t||this._tag_stack.try_pop("li",["ol","ul"]);else if(e.tag_name==="dd"||e.tag_name==="dt")t=t||this._tag_stack.try_pop("dt",["dl"]),t=t||this._tag_stack.try_pop("dd",["dl"]);else if(e.parent.tag_name==="p"&&VU.indexOf(e.tag_name)!==-1){var s=e.parent.parent;(!s||KU.indexOf(s.tag_name)===-1)&&(t=t||this._tag_stack.try_pop("p"))}else e.tag_name==="rp"||e.tag_name==="rt"?(t=t||this._tag_stack.try_pop("rt",["ruby","rtc"]),t=t||this._tag_stack.try_pop("rp",["ruby","rtc"])):e.tag_name==="optgroup"?t=t||this._tag_stack.try_pop("optgroup",["select"]):e.tag_name==="option"?t=t||this._tag_stack.try_pop("option",["select","datalist","optgroup"]):e.tag_name==="colgroup"?t=t||this._tag_stack.try_pop("caption",["table"]):e.tag_name==="thead"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"])):e.tag_name==="tbody"||e.tag_name==="tfoot"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"]),t=t||this._tag_stack.try_pop("thead",["table"]),t=t||this._tag_stack.try_pop("tbody",["table"])):e.tag_name==="tr"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"]),t=t||this._tag_stack.try_pop("tr",["table","thead","tbody","tfoot"])):(e.tag_name==="th"||e.tag_name==="td")&&(t=t||this._tag_stack.try_pop("td",["table","thead","tbody","tfoot","tr"]),t=t||this._tag_stack.try_pop("th",["table","thead","tbody","tfoot","tr"]));return e.parent=this._tag_stack.get_parser_token(),t}};s0.exports.Beautifier=ut});var n0=w((g9,rp)=>{"use strict";var XU=r0().Beautifier,YU=Zc().Options;function QU(e,t,s,r){var n=new XU(e,t,s,r);return n.beautify()}rp.exports=QU;rp.exports.defaultOptions=function(){return new YU}});var c0=w((_9,Oi)=>{"use strict";var i0=Dx(),o0=Vx(),a0=n0();function l0(e,t,s,r){return s=s||i0,r=r||o0,a0(e,t,s,r)}l0.defaultOptions=a0.defaultOptions;Oi.exports.js=i0;Oi.exports.css=o0;Oi.exports.html=l0});var d0=w((y9,u0)=>{"use strict";function p0(e,t,s){var r=function(n,i){return e.js_beautify(n,i)};return r.js=e.js_beautify,r.css=t.css_beautify,r.html=s.html_beautify,r.js_beautify=e.js_beautify,r.css_beautify=t.css_beautify,r.html_beautify=s.html_beautify,r}typeof define=="function"&&define.amd?define(["./lib/beautify","./lib/beautify-css","./lib/beautify-html"],function(e,t,s){return p0(e,t,s)}):function(e){var t=c0();t.js_beautify=t.js,t.css_beautify=t.css,t.html_beautify=t.html,e.exports=p0(t,t,t)}(u0)});var b0=w(pn=>{"use strict";var Y=pn&&pn.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(pn,"__esModule",{value:!0});var ZU=Y(Mv()),m0=Y(hw()),Ot=Y(ze()),np=Y(pe()),eA=Y(_w()),ip=Y(vw()),tA=Y(gc()),f0=Y(yc()),cn=Y(bt()),sA=Y(ir()),rA=Y(Sw()),op=Y(Xn()),nA=Y(Ew()),iA=Y(tt()),oA=Y(at()),aA=Y(Mt()),lA=Y(lt()),cA=Y(oi()),v0=Y(jt()),pA=Y(Qn()),uA=Y(pl()),dA=Y(bi()),qi=Y(se()),h0=Y(js()),mA=Y(Ms()),fA=Y(Fe()),hA=Y(zr()),gA=Y(jw()),_A=Y(Dr()),yA=Y(Xw()),vA=Y(Zw()),bA=Y(ix()),g0=Y(ax()),wA=fa(),xA=Y(Rc()),_0=Y(d0()),SA=/https?:\/\/([0-9.\-A-Za-z]+)(?::(\d+))?\/[A-Z.a-z0-9/]*\.js/g,y0={comment:"",string:"",number:"",keyword:"",operator:""},ap=class extends _A.default{constructor(t,{type:s="log",args:r=[],id:n,group:i,targetGroup:o,header:a,ignoreFilter:l=!1,accessGetter:c,unenumerable:p,lazyEvaluation:d}){super(),this.container=gA.default("div"),this.count=1,this.width=0,this.height=0,this.console=t,this.type=s,this.group=i,this.targetGroup=o,this.args=r,this.id=n,this.header=a,this.ignoreFilter=l,this.collapsed=!1,this.container.log=this,this.height=0,this.width=0,this.$container=hA.default(this.container),this.accessGetter=c,this.unenumerable=p,this.lazyEvaluation=d,this.formatMsg(),this.group&&this.checkGroup()}checkGroup(){let{group:t}=this,s=!1;for(;t;){if(t.collapsed){s=!0;break}t=t.parent}return s!==this.collapsed?(this.collapsed=s,!0):!1}updateIcon(t){let{c:s}=this.console;return this.$container.find(s(".icon")).rmAttr("class").addClass([s("icon"),s(`icon-${t}`)]),this}addCount(){this.count++;let{$container:t,count:s}=this,{c:r}=this.console,n=t.find(r(".count-container")),i=t.find(r(".icon-container")),o=n.find(r(".count"));return s===2&&n.rmClass(r("hidden")),o.text(cn.default(s)),i.addClass(r("hidden")),this}groupEnd(){let{$container:t}=this,{c:s}=this.console;return t.find(`.${s("nesting-level")}:not(.${s("group-closed")})`).last().addClass(s("group-closed")),this}updateTime(t){let s=this.$container.find(this.console.c(".time-container"));return this.header&&(s.find("span").eq(0).text(t),this.header.time=t),this}isAttached(){return!!this.container.parentNode}updateSize(t=!0){let s=this.container.offsetHeight,r=this.container.offsetWidth;(this.height!==s||this.width!==r)&&(this.height=s,this.width=r,t||this.emit("updateSize"))}html(){return this.container.outerHTML}text(){return this.content.textContent||""}needSrc(){let{type:t,args:s}=this;if(t==="html")return!1;for(let r=0,n=s.length;r<n;r++)if(Ot.default(s[r]))return!0;return!1}extractObj(t=dA.default){let{args:s,type:r}=this,n=i=>{this.src=i,t()};r==="table"?this._extractObj(s[0],{},n):this._extractObj(s.length===1&&Ot.default(s[0])?s[0]:s,{},n)}_extractObj(t,s={},r){let{accessGetter:n,unenumerable:i}=this;tA.default(s,{accessGetter:n,unenumerable:i,symbol:i,timeout:1e3}),EA(t,s,o=>r(JSON.parse(o)))}click(){let{type:t,src:s,$container:r,console:n,unenumerable:i,accessGetter:o}=this,{c:a}=n,{args:l}=this;switch(t){case"log":case"warn":case"debug":case"output":case"table":case"dir":case"group":case"groupCollapsed":if(s||l){let c=r.find(a(".json"));if(c.hasClass(a("hidden"))){if(c.data("init")!=="true"){if(s){let p=new m0.default.Static(c.get(0));p.set(s),p.on("change",()=>this.updateSize(!1))}else{(t==="table"||l.length===1)&&Ot.default(l[0])&&(l=l[0]);let p=new m0.default(c.get(0),{unenumerable:i,accessGetter:o});p.set(l),p.on("change",()=>this.updateSize(!1))}c.data("init","true")}c.rmClass(a("hidden"))}else c.addClass(a("hidden"))}else(t==="group"||t==="groupCollapsed")&&n.toggleGroup(this);break;case"error":r.find(a(".stack")).toggleClass(a("hidden"));break}this.updateSize(!1)}formatMsg(){let{args:t}=this,{type:s,id:r,header:n,group:i,lazyEvaluation:o}=this,{c:a}=this.console;t=uA.default(t),this.needSrc()&&!o&&this.extractObj();let l="",c,p;switch((s==="group"||s==="groupCollapsed")&&t.length===0&&(t=["console.group"]),s){case"log":l=this.formatCommon(t);break;case"debug":l=this.formatCommon(t);break;case"dir":l=this.formatDir(t);break;case"warn":c="warn",l=this.formatCommon(t);break;case"error":np.default(t[0])&&t.length!==1&&(t=this.substituteStr(t)),p=t[0],c="error",p=eA.default(p)?p:new Error(this.formatCommon(t)),this.src=p,l=this.formatErr(p);break;case"table":l=this.formatTable(t);break;case"html":l=t[0];break;case"input":l=this.formatJs(t[0]),c="input";break;case"output":l=this.formatCommon(t),c="output";break;case"groupCollapsed":l=this.formatCommon(t),c="caret-right";break;case"group":l=this.formatCommon(t),c="caret-down";break}(!this.needSrc()||!o)&&delete this.args,s!=="error"&&!this.args&&(l=bA.default(l,d=>`<a href="${d}" target="_blank">${d}</a>`)),l=this.render({msg:l,type:s,icon:c,id:r,header:n,group:i}),this.$container.addClass(`${a("log-container")}`).html(l),this.$content=this.$container.find(a(".log-content")),this.content=this.$content.get(0)}render(t){let{c:s}=this.console,r="",n="";if(t.group){let{indentLevel:o}=t.group;for(let a=0;a<o;a++)n+=`<div class="${s("nesting-level")}"></div>`}t.header&&(r+=xA.default`
      <div class="${s("header")}">
        ${n}
        <div class="${s("time-from-container")}">
          <span>${t.header.time}</span> <span>${t.header.from}</span>
        </div>
      </div>`);let i="";return t.icon&&(i=`<div class="${s("icon-container")}"><span class="${s("icon icon-"+t.icon)}"></span></div>`),r+=`
    <div class="${s(t.type+" log-item")}">
      ${n}
      ${i}
      <div class="${s("count-container hidden")}">
        <div class="${s("count")}"></div>
      </div>    
      <div class="${s("log-content-wrapper")}">
        <div class="${s("log-content")}">${t.msg}</div>
      </div>
    </div>`,r}formatTable(t){let s="__LunaConsoleValue",r=t[0],n="",i=t[1],o=[];return np.default(i)&&(i=aA.default(i)),lA.default(i)||(i=null),Ot.default(r)?(qi.default(r,a=>{ip.default(a)?o.push(s):Ot.default(a)&&(o=o.concat(fA.default(a)))}),o=cA.default(o),o.sort(),i&&(o=o.filter(a=>v0.default(i,a))),o.length>20&&(o=o.slice(0,20)),pA.default(o)?this.formatCommon(t):(n+="<table><thead><tr><th>(index)</th>",o.forEach(a=>n+=`<th>${a===s?"Value":cn.default(a)}</th>`),n+="</tr></thead><tbody>",qi.default(r,(a,l)=>{n+=`<tr><td>${l}</td>`,o.forEach(c=>{Ot.default(a)?n+=c===s?"<td></td>":`<td>${this.formatTableVal(a[c])}</td>`:ip.default(a)&&(n+=c===s?`<td>${this.formatTableVal(a)}</td>`:"<td></td>")}),n+="</tr>"}),n+="</tbody></table>",n+=`<div class="${this.console.c("json hidden")}"></div>`,n)):this.formatCommon(t)}formatErr(t){let s=t.stack?t.stack.split(`
`):[],r=`${t.message||s[0]}<br/>`;s=s.map(i=>op.default(i));let n=`<div class="${this.console.c("stack hidden")}">${s.slice(1).join("<br/>")}</div>`;return r+n.replace(SA,i=>`<a href="${i}" target="_blank">${i}</a>`)}formatCommon(t,{htmlForEl:s=!0}={}){let r=np.default(t[0])&&t.length!==1;r&&(t=this.substituteStr(t));for(let n=0,i=t.length;n<i;n++){let o=t[n];f0.default(o)&&s?t[n]=this.formatEl(o):oA.default(o)?t[n]=this.formatJs(o):Ot.default(o)?t[n]=this.formatObj(o):iA.default(o)?t[n]="undefined":nA.default(o)?t[n]="null":(o=cn.default(o),(n!==0||!r)&&(o=op.default(o)),t[n]=o)}return t.join(" ")+`<div class="${this.console.c("json hidden")}"></div>`}formatDir(t){return this.formatCommon(t,{htmlForEl:!1})}formatTableVal(t){return Ot.default(t)?t="{\u2026}":ip.default(t)?this.getAbstract(t):cn.default(t)}getAbstract(t){return`<span class="${this.console.c("abstract")}">`+ZU.default(t,{getterVal:this.accessGetter,unenumerable:!1})+"</span>"}substituteStr(t){let s=op.default(t[0]),r=!1,n="";t.shift();for(let i=0,o=s.length;i<o;i++){let a=s[i];if(a==="%"&&t.length!==0){i++;let l=t.shift();switch(s[i]){case"i":case"d":n+=rA.default(l);break;case"f":n+=sA.default(l);break;case"s":n+=cn.default(l);break;case"O":Ot.default(l)&&(n+=this.getAbstract(l));break;case"o":f0.default(l)?n+=this.formatEl(l):Ot.default(l)&&(n+=this.getAbstract(l));break;case"c":if(s.length<=i+1)break;r&&(n+="</span>"),r=!0,n+=`<span style="${LA(l)}">`;break;default:i--,t.unshift(l),n+=a}}else n+=a}return r&&(n+="</span>"),t.unshift(n),t}formatJs(t){return`<pre class="${this.console.c("code")}">${this.console.c(g0.default(_0.default(t,{indent_size:2}),"js",y0))}</pre>`}formatObj(t){let s=wA.getObjType(t);return s==="Array"&&t.length>1&&(s=`(${t.length})`),`${s} ${this.getAbstract(t)}`}formatEl(t){let{c:s}=this.console;return`<pre class="${s("code")}">${s(g0.default(_0.default.html(t.outerHTML,{unformatted:[],indent_size:2}),"html",y0))}</pre>`}};pn.default=ap;function LA(e){e=mA.default(e);let t=e.split(";"),s={};qi.default(t,n=>{if(!v0.default(n,":"))return;let[i,o]=n.split(":");s[h0.default(i)]=h0.default(o)}),s.display="inline-block",s["max-width"]="100%",delete s.width,delete s.height;let r="";return qi.default(s,(n,i)=>{r+=`${i}:${n};`}),r}function EA(e,t,s){let r=yA.default(e,t);vA.default(()=>s(r))}});var L0=w((un,S0)=>{var w0=Vr(),x0=ti(),lp=x0.performance,Ri=x0.process,Ii;lp&&lp.now?un=function(){return lp.now()}:Ri&&Ri.hrtime?(cp=function(){var e=Ri.hrtime();return e[0]*1e9+e[1]},Ii=cp()-Ri.uptime()*1e9,un=function(){return(cp()-Ii)/1e6}):(Ii=w0(),un=function(){return w0()-Ii});var cp;S0.exports=un});var k0=w((pp,E0)=>{var kA=Ct();pp=function(e){return kA(e)==="[object RegExp]"};E0.exports=pp});var C0=w((up,T0)=>{var TA=Us(),CA=bi();up=function(e,t){t=t||CA;var s=document.createElement("textarea"),r=document.body;TA(s.style,{fontSize:"12pt",border:"0",padding:"0",margin:"0",position:"absolute",left:"-9999px"}),s.value=e,r.appendChild(s),s.setAttribute("readonly",""),s.select(),s.setSelectionRange(0,e.length);try{document.execCommand("copy"),t()}catch(n){t(n)}finally{r.removeChild(s)}};T0.exports=up});var M0=w((dp,j0)=>{dp=function(e,t,s){var r;return function(){var n=this,i=arguments,o=function(){r=null,e.apply(n,i)};s||clearTimeout(r),(!s||!r)&&(r=setTimeout(o,t))}};j0.exports=dp});var A0=w((mp,U0)=>{var jA=M0();mp=function(e,t){return jA(e,t,!0)};U0.exports=mp});var O0=w((fp,P0)=>{fp=function(e){for(var t=[],s=document.evaluate(e,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),r=0;r<s.snapshotLength;r++)t.push(s.snapshotItem(r));return t};P0.exports=fp});var R0=w((hp,q0)=>{var MA=Ct();hp=function(e){return MA(e)==="[object Date]"};q0.exports=hp});var H0=w((gp,I0)=>{gp=function(e,t){var s="";if(t<1)return"";for(;t>0;)t&1&&(s+=e),t>>=1,e+=e;return s};I0.exports=gp});var D0=w((_p,B0)=>{var UA=H0(),AA=bt();_p=function(e,t,s){e=AA(e);var r=e.length;return s=s||" ",r<t&&(e=(UA(s,t-r)+e).slice(-t)),e};B0.exports=_p});var $0=w((St,N0)=>{var PA=pe(),OA=R0(),Hi=bt(),qA=D0();St=function(e,t,s,r){arguments.length===1&&PA(e)&&!HA.test(e)&&(t=e,e=void 0),e=e||new Date,OA(e)||(e=new Date(e)),t=Hi(St.masks[t]||t||St.masks.default);var n=t.slice(0,4);(n==="UTC:"||n==="GMT:")&&(t=t.slice(4),s=!0,n==="GMT:"&&(r=!0));var i=s?"getUTC":"get",o=e[i+"Date"](),a=e[i+"Day"](),l=e[i+"Month"](),c=e[i+"FullYear"](),p=e[i+"Hours"](),d=e[i+"Minutes"](),g=e[i+"Seconds"](),_=e[i+"Milliseconds"](),f=s?0:e.getTimezoneOffset(),u={d:o,dd:zt(o),ddd:St.i18n.dayNames[a],dddd:St.i18n.dayNames[a+7],m:l+1,mm:zt(l+1),mmm:St.i18n.monthNames[l],mmmm:St.i18n.monthNames[l+12],yy:Hi(c).slice(2),yyyy:c,h:p%12||12,hh:zt(p%12||12),H:p,HH:zt(p),M:d,MM:zt(d),s:g,ss:zt(g),l:zt(_,3),L:zt(Math.round(_/10)),t:p<12?"a":"p",tt:p<12?"am":"pm",T:p<12?"A":"P",TT:p<12?"AM":"PM",Z:r?"GMT":s?"UTC":(Hi(e).match(IA)||[""]).pop().replace(BA,""),o:(f>0?"-":"+")+zt(Math.floor(Math.abs(f)/60)*100+Math.abs(f)%60,4),S:["th","st","nd","rd"][o%10>3?0:(o%100-o%10!=10)*o%10]};return t.replace(RA,function(m){return m in u?u[m]:m.slice(1,m.length-1)})};var zt=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return qA(Hi(e),t,"0")},RA=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,IA=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,HA=/\d/,BA=/[^-+\dA-Z]/g;St.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};St.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};N0.exports=St});var J0=w((vp,G0)=>{var W0=ti(),yp=W0.getComputedStyle,F0=W0.document;vp=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.display,r=s===void 0?!0:s,n=t.visibility,i=n===void 0?!1:n,o=t.opacity,a=o===void 0?!1:o,l=t.size,c=l===void 0?!1:l,p=t.viewport,d=p===void 0?!1:p,g=t.overflow,_=g===void 0?!1:g;if(r)return e.offsetParent===null;var f=yp(e);if(i&&f.visibility==="hidden")return!0;if(a){if(f.opacity==="0")return!0;for(var u=e;u=u.parentElement;){var m=yp(u);if(m.opacity==="0")return!0}}var b=e.getBoundingClientRect();if(c&&(b.width===0||b.height===0))return!0;if(d){var S={top:0,left:0,right:F0.documentElement.clientWidth,bottom:F0.documentElement.clientHeight};return z0(b,S)}if(_)for(var v=e;v=v.parentElement;){var y=yp(v),h=y.overflow;if(h==="scroll"||h==="hidden"){var C=v.getBoundingClientRect();if(z0(b,C))return!0}}return!1};function z0(e,t){return e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom}G0.exports=vp});var V0=w(dn=>{"use strict";var wp=dn&&dn.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(dn,"__esModule",{value:!0});var DA=wp(Dr()),NA=wp(zr()),$A=ci(),FA=wp(se()),bp=class extends DA.default{constructor(t,{compName:s}){super(),this.compName=s,this.c=$A.classPrefix(s),this.options={},this.container=t,this.$container=NA.default(t),this.$container.addClass(`luna-${s}`)}destroy(){this.$container.rmClass(`luna-${this.compName}`),this.$container.html(""),this.emit("destroy"),this.removeAllListeners()}setOption(t,s){let r=this.options,n={};typeof t=="string"?n[t]=s:n=t,FA.default(n,(i,o)=>{let a=r[o];r[o]=i,this.emit("optionChange",o,i,a)})}find(t){return this.$container.find(this.c(t))}};dn.default=bp});var Q0=w((xp,Y0)=>{var zA=Vr(),WA=Ua(),Ds,fn,K0=0;if(WA)for(Ds=window.requestAnimationFrame,fn=window.cancelAnimationFrame,mn=["ms","moz","webkit","o"],dr=0,X0=mn.length;dr<X0&&!Ds;dr++)Ds=window[mn[dr]+"RequestAnimationFrame"],fn=window[mn[dr]+"CancelAnimationFrame"]||window[mn[dr]+"CancelRequestAnimationFrame"];var mn,dr,X0;Ds=Ds||function(e){var t=zA(),s=Math.max(0,16-(t-K0)),r=setTimeout(function(){e(t+s)},s);return K0=t+s,r};fn=fn||function(e){clearTimeout(e)};Ds.cancel=fn;xp=Ds;Y0.exports=xp});var iS=w((gn,Sp)=>{"use strict";var le=gn&&gn.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(gn,"__esModule",{value:!0});var GA=le(b0()),Z0=le(tt()),eS=le(L0()),JA=le(Vr()),tS=le(pe()),VA=le(Us()),KA=le(oc()),XA=le(k0()),YA=le(at()),sS=le(Ya()),Ns=le(Qn()),QA=le(jt()),ZA=le(C0()),rS=le(se()),e2=le(Mt()),t2=le(Fe()),s2=le(si()),r2=le(A0()),n2=le(O0()),i2=le(Ms()),o2=le($0()),a2=le(J0()),l2=le(Rc()),c2=ci(),p2=le(V0()),u2=Q0(),nS=navigator.userAgent,d2=nS.indexOf("Android")>-1||nS.indexOf("Adr")>-1,m2=c2.classPrefix("console"),f2=0,hn=class extends p2.default{constructor(t,{maxNum:s=0,asyncRender:r=!0,showHeader:n=!1,filter:i="all",accessGetter:o=!1,unenumerable:a=!0,lazyEvaluation:l=!0}={}){super(t,{compName:"console"}),this.spaceHeight=0,this.topSpaceHeight=0,this.bottomSpaceHeight=0,this.lastScrollTop=0,this.lastTimestamp=0,this.speedToleranceFactor=100,this.maxSpeedTolerance=2e3,this.minSpeedTolerance=100,this.logs=[],this.displayLogs=[],this.timer={},this.counter={},this.asyncList=[],this.asyncTimer=null,this.isAtBottom=!0,this.groupStack=new sS.default,this.onScroll=()=>{let{scrollHeight:c,offsetHeight:p,scrollTop:d}=this.container;if(d<=0||p+d>c)return;let g=!1;(c===p||d===c-p)&&(g=!0),this.isAtBottom=g;let _=this.lastScrollTop,f=this.lastTimestamp,u=JA.default(),m=u-f,b=d-_,v=Math.abs(b/m)*this.speedToleranceFactor;m>1e3&&(v=1e3),v>this.maxSpeedTolerance&&(v=this.maxSpeedTolerance),v<this.minSpeedTolerance&&(v=this.minSpeedTolerance),this.lastScrollTop=d,this.lastTimestamp=u;let y=0,h=0;_<d?(y=this.minSpeedTolerance,h=v):(y=v,h=this.minSpeedTolerance),!(this.topSpaceHeight<d-y&&this.topSpaceHeight+this.el.offsetHeight>d+p+h)&&this.renderViewport({topTolerance:y*2,bottomTolerance:h*2})},this.initTpl(),this.options={maxNum:s,asyncRender:r,showHeader:n,filter:i,accessGetter:o,unenumerable:a,lazyEvaluation:l},this.$el=this.find(".logs"),this.el=this.$el.get(0),this.$fakeEl=this.find(".fake-logs"),this.fakeEl=this.$fakeEl.get(0),this.$space=this.find(".logs-space"),this.space=this.$space.get(0),d2&&(this.speedToleranceFactor=800,this.maxSpeedTolerance=3e3,this.minSpeedTolerance=800),this.renderViewport=r2.default(c=>{this._renderViewport(c)},16),this.global={copy(c){tS.default(c)||(c=JSON.stringify(c,null,2)),ZA.default(c)},$(c){return document.querySelector(c)},$$(c){return e2.default(document.querySelectorAll(c))},$x(c){return n2.default(c)},clear:()=>{this.clear()},dir:c=>{this.dir(c)},table:(c,p)=>{this.table(c,p)},keys:t2.default},this.bindEvent()}setGlobal(t,s){this.global[t]=s}destroy(){super.destroy(),this.$container.off("scroll",this.onScroll)}count(t="default"){let{counter:s}=this;Z0.default(s[t])?s[t]=1:s[t]++,this.info(`${t}: ${s[t]}`)}countReset(t="default"){this.counter[t]=0}assert(...t){if(Ns.default(t))return;t.shift()||(t.length===0&&t.unshift("console.assert"),t.unshift("Assertion failed: "),this.insert("error",t))}log(...t){Ns.default(t)||this.insert("log",t)}debug(...t){Ns.default(t)||this.insert("debug",t)}dir(t){Z0.default(t)||this.insert("dir",[t])}table(...t){Ns.default(t)||this.insert("table",t)}time(t="default"){if(this.timer[t])return this.insert("warn",[`Timer '${t}' already exists`]);this.timer[t]=eS.default()}timeLog(t="default"){let s=this.timer[t];if(!s)return this.insert("warn",[`Timer '${t}' does not exist`]);this.info(`${t}: ${eS.default()-s}ms`)}timeEnd(t="default"){this.timeLog(t),delete this.timer[t]}clear(t=!1){this.logs=[],this.displayLogs=[],this.lastLog=void 0,this.counter={},this.timer={},this.groupStack=new sS.default,this.asyncList=[],this.asyncTimer&&(clearTimeout(this.asyncTimer),this.asyncTimer=null),t?this.render():this.insert("log",["%cConsole was cleared","color:#808080;font-style:italic;"])}info(...t){Ns.default(t)||this.insert("log",t)}error(...t){Ns.default(t)||this.insert("error",t)}warn(...t){Ns.default(t)||this.insert("warn",t)}group(...t){this.insert({type:"group",args:t,ignoreFilter:!0})}groupCollapsed(...t){this.insert({type:"groupCollapsed",args:t,ignoreFilter:!0})}groupEnd(){this.insert("groupEnd")}evaluate(t){this.insert({type:"input",args:[t],ignoreFilter:!0});try{this.output(this.evalJs(t))}catch(s){this.insert({type:"error",ignoreFilter:!0,args:[s]})}}html(...t){this.insert("html",t)}toggleGroup(t){let{targetGroup:s}=t;s.collapsed?this.openGroup(t):this.collapseGroup(t)}output(t){this.insert({type:"output",args:[t],ignoreFilter:!0})}render(){let{logs:t}=this;this.$el.html(""),this.isAtBottom=!0,this.updateBottomSpace(0),this.updateTopSpace(0),this.displayLogs=[];for(let s=0,r=t.length;s<r;s++)this.attachLog(t[s])}insert(t,s){let{showHeader:r,asyncRender:n}=this.options,i;if(r&&(i={time:h2(),from:g2()}),n)return this.insertAsync(t,s,i);this.insertSync(t,s,i)}insertAsync(t,s,r){this.asyncList.push([t,s,r]),this.handleAsyncList()}insertSync(t,s,r){let{logs:n,groupStack:i}=this,{maxNum:o,accessGetter:a,unenumerable:l,lazyEvaluation:c}=this.options,p;if(tS.default(t)?p={type:t,args:s,header:r}:p=t,p.type==="groupEnd"){this.lastLog.groupEnd(),this.groupStack.pop();return}if(i.size>0&&(p.group=i.peek()),VA.default(p,{id:++f2,accessGetter:a,unenumerable:l,lazyEvaluation:c}),p.type==="group"||p.type==="groupCollapsed"){let _={id:KA.default("group"),collapsed:!1,parent:i.peek(),indentLevel:i.size+1};p.type==="groupCollapsed"&&(_.collapsed=!0),p.targetGroup=_,i.push(_)}let d=new GA.default(this,p);d.on("updateSize",()=>{this.isAtBottom=!1,this.renderViewport()});let g=this.lastLog;if(g&&!QA.default(["html","group","groupCollapsed"],d.type)&&g.type===d.type&&!d.src&&!d.args&&g.text()===d.text()?(g.addCount(),d.header&&g.updateTime(d.header.time),d=g,this.detachLog(g)):(n.push(d),this.lastLog=d),o!==0&&n.length>o){let _=n[0];this.detachLog(_),n.shift()}this.attachLog(d),this.emit("insert",d)}updateTopSpace(t){this.topSpaceHeight=t,this.el.style.top=t+"px"}updateBottomSpace(t){this.bottomSpaceHeight=t}updateSpace(t){this.spaceHeight!==t&&(this.spaceHeight=t,this.space.style.height=t+"px")}detachLog(t){let{displayLogs:s}=this,r=s.indexOf(t);r>-1&&(s.splice(r,1),this.renderViewport())}attachLog(t){if(!this.filterLog(t)||t.collapsed)return;let{displayLogs:s}=this;if(s.length===0){s.push(t),this.renderViewport();return}let r=s2.default(s);if(t.id>r.id){s.push(t),this.renderViewport();return}let n=0,i=s.length-1,o,a=0;for(;n<=i;){if(a=n+Math.floor((i-n)/2),o=s[a],o.id===t.id)return;o.id<t.id?n=a+1:i=a-1}o.id<t.id?s.splice(a+1,0,t):s.splice(a,0,t),this.renderViewport()}handleAsyncList(t=20){let s=this.asyncList;this.asyncTimer||(this.asyncTimer=setTimeout(()=>{this.asyncTimer=null;let r=!1,n=s.length,i,o;n<1e3?(o=200,i=400):n<5e3?(o=500,i=800):n<1e4?(o=800,i=1e3):n<25e3?(o=1e3,i=1200):n<5e4?(o=1500,i=1500):(o=2e3,i=2500),o>n&&(o=n,r=!0);for(let a=0;a<o;a++){let[l,c,p]=s.shift();this.insertSync(l,c,p)}r||u2(()=>this.handleAsyncList(i))},t))}injectGlobal(){rS.default(this.global,(t,s)=>{window[s]||(window[s]=t)})}clearGlobal(){rS.default(this.global,(t,s)=>{window[s]&&window[s]===t&&delete window[s]})}evalJs(t){let s;this.injectGlobal();try{s=eval.call(window,`(${t})`)}catch{s=eval.call(window,t)}return this.setGlobal("$_",s),this.clearGlobal(),s}filterLog(t){let{filter:s}=this.options;return s==="all"||t.ignoreFilter?!0:YA.default(s)?s(t):XA.default(s)?s.test(i2.default(t.text())):t.type===s}collapseGroup(t){let{targetGroup:s}=t;s.collapsed=!0,t.updateIcon("caret-right"),this.updateGroup(t)}openGroup(t){let{targetGroup:s}=t;s.collapsed=!1,t.updateIcon("caret-down"),this.updateGroup(t)}updateGroup(t){let{targetGroup:s}=t,{logs:r}=this,n=r.length,i=r.indexOf(t)+1;for(;i<n;){let o=r[i];if(!o.checkGroup()&&o.group===s)break;o.collapsed?this.detachLog(o):this.attachLog(o),i++}}bindEvent(){let{$el:t}=this;t.on("click",m2(".log-container"),function(){this.log.click()}),this.on("optionChange",(s,r)=>{let{logs:n}=this;switch(s){case"maxNum":r>0&&n.length>r&&(this.logs=n.slice(n.length-r),this.render());break;case"filter":this.render();break}}),this.$container.on("scroll",this.onScroll)}_renderViewport({topTolerance:t=500,bottomTolerance:s=500}={}){let{el:r,container:n}=this;if(a2.default(n))return;let{scrollTop:i,clientWidth:o,offsetHeight:a}=n,l=i-t,c=i+a+s,{displayLogs:p}=this,d=0,g=0,_=0,f=p.length,{fakeEl:u}=this,m=document.createDocumentFragment(),b=[];for(let y=0;y<f;y++){let h=p[y],{width:C,height:k}=h;(k===0||C!==o)&&(m.appendChild(h.container),b.push(h))}if(b.length>0){u.appendChild(m);for(let y=0,h=b.length;y<h;y++)b[y].updateSize();u.innerHTML=""}let S=document.createDocumentFragment();for(let y=0;y<f;y++){let h=p[y],{container:C,height:k}=h;_>c?g+=k:_+k>l?S.appendChild(C):_<l&&(d+=k),_+=k}for(this.updateSpace(_),this.updateTopSpace(d),this.updateBottomSpace(g);r.firstChild;)r.lastChild&&r.removeChild(r.lastChild);r.appendChild(S);let{scrollHeight:v}=n;this.isAtBottom&&i<=v-a&&(n.scrollTop=1e7)}initTpl(){this.$container.html(this.c(l2.default`
      <div class="logs-space">
        <div class="fake-logs"></div>
        <div class="logs"></div>
      </div>
    `))}};gn.default=hn;Sp.exports=hn;Sp.exports.default=hn;var h2=()=>o2.default("HH:MM:ss ");function g2(){let e=new Error,t="",s=e.stack?e.stack.split(`
`):"";for(let r=0,n=s.length;r<n;r++)if(t=s[r],t.indexOf("winConsole")>-1&&r<n-1){t=s[r+1];break}return t}});var Qi=(e,t)=>{let s;return(...r)=>{s&&clearTimeout(s),s=setTimeout(()=>e.apply(null,r),typeof t=="function"?t():t)}},Wp=e=>{let t=document.createElement("textarea");return t.innerHTML=e,t.value};var Zi=e=>e.replace(/<\/script>/g,"<\\/script>"),gs=(e,t=!0)=>e.replace(/\\/g,t?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var Gp=(e,t="_")=>e.replace(/[\W]+/g,t),Xt=()=>{let e=!1,t=navigator.userAgent.toLowerCase();(function(r){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4)))&&(e=!0)})(t||navigator.vendor||window.opera);let s=t.indexOf("safari")>-1&&t.indexOf("chrome")===-1;return e||s},Gs=e=>!e?.startsWith("http")&&!e?.startsWith("data:"),Js=(e,t=document.baseURI)=>Gs(e)?new URL(e,t).href:e,Yt=e=>JSON.parse(JSON.stringify(e)),gr=(e,t)=>Object.fromEntries(Object.entries(e).map(([s,r],n)=>[s,t(r,s,n)])),Jp=(e,t)=>Object.fromEntries(Object.entries(e).filter(([s,r],n)=>t(r,s,n))),eo=e=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy")){let t=document.createElement("textarea");t.textContent=e,t.style.position="fixed",document.body.appendChild(t),t.select();try{return document.execCommand("copy")}catch(s){return console.warn("Copy to clipboard failed.",s),!1}finally{document.body.removeChild(t)}}return!1},Vp=e=>e.replace(/'[^'"]*'(?=(?:[^"]*"[^"]*")*[^"]*$)/g,function(s){return'"'+s.substring(1,s.length-1)+'"'}).replace(/(\w+(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))(\s*:)(?!(\w*)(?:"))/gm,function(s){return'"'+s.substring(0,s.length-1).trimEnd()+'":'}).replace(/,\s*([\]}])/g,"$1"),_r=(e,t=!1)=>{try{return JSON.stringify(e,void 0,t?2:void 0)}catch{return""}},KS=()=>String(Math.random())+"-"+Date.now().toFixed(),to=(e,t,s)=>{let r=document.createElement("a");r.style.display="none",r.href=s,r.download=Gp(e)+"."+t,r.click(),r.remove()},yr=(e,t)=>new Promise((s,r)=>{if(t&&globalThis[t])return s(globalThis[t]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),t&&globalThis[t]?s(globalThis[t]):s(globalThis);let n=document.createElement("script");n.src=e,n.async=!0;let i=()=>{n.removeEventListener("load",o),n.removeEventListener("error",a)},o=()=>{if(i(),!t)return s("loaded: "+e);let l=setInterval(()=>{if(window[t])return clearInterval(l),s(window[t])},5)},a=()=>{i(),r("failed to load: "+e)};n.addEventListener("load",o),n.addEventListener("error",a),document.head.appendChild(n)}),_s=(e,t,s)=>{if(t&&document.getElementById(t))return;let r=document.createElement("link");r.rel="stylesheet",r.href=e,r.id=t||"styles-"+KS(),document.head.insertBefore(r,s?document.querySelector(s):null)};var vr=e=>e.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,"$1"),XS=e=>e.replace(/'[^\n']*'/gm,"''").replace(/"[^\n"]*"/gm,'""').replace(/`[^`]*`/gm,"``"),so=e=>XS(vr(e)),$=(e,t)=>({...t.customSettings[e]}),ro=e=>{if(!e)return null;let t=null;if(e.startsWith("http")||e.startsWith("data:"))try{t=new URL(e).href}catch{try{t=new URL(decodeURIComponent(e)).href}catch{}}return t};var Kp=e=>e.replace(/[-_.]+/g," ").trim().replace(/^([A-Z])|\s+(\w)/g,function(t,s,r){return r?r.toUpperCase():s.toLowerCase()}),Qt=e=>Array.from(new Set(e));function YS(e){return import(e)}var no=null;function Xp(e){return no||(no=YS(e).catch(()=>{})),no}var Qp=["jspm","skypack"],Zp=["unpkg","jsdelivr"],eu=["jsdelivr.gh","statically"],Xe={getModuleUrl:(e,{isModule:t=!0,defaultCDN:s="jspm"}={})=>{e=e.replace(/#nobundle/g,"");let r=Yp(e,t,s);return r||(t?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,t)=>e.startsWith("http")?e:Yp(e,!1,t||ys())||e,cdnLists:{npm:Zp,module:Qp,gh:eu},checkCDNs:async(e,t)=>{let s=[t,...Xe.cdnLists.npm].filter(Boolean);for(let r of s)try{if((await fetch(Xe.getUrl(e,r),{method:"HEAD"})).ok)return r}catch{}return Xe.cdnLists.npm[0]}},ys=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||Xe.cdnLists.npm[0]}catch{return Xe.cdnLists.npm[0]}},Yp=(e,t,s)=>{let r=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",eu[0]):e.includes(":")||(e=(s||(t?Qp[0]:Zp[0]))+":"+e);for(let n of QS){let[i,o]=n;if(i.test(e))return e.replace(i,o)+r}return null},QS=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:M,getModuleUrl:ZS}=Xe,P=M("@live-codes/browser-compilers@0.7.4/dist/");var tu=M("art-template@4.13.2/lib/template-web.js"),su=M("@asciidoctor/core@2.2.6/dist/browser/asciidoctor.js"),ru=M("@assemblyscript/loader@0.27.5/umd/index.js");var nu=M("@hatemhosny/astro-internal@0.0.4/");var iu=M("@babel/standalone@7.22.4/babel.js"),ou=M("biwascheme@0.8.0/release/biwascheme.js");var io=M("brython@3.11.2/"),au=ZS("chai@4.3.6"),lu=M("@types/chai@4.2.22/index.d.ts"),Ln=M("cherry-cljs@0.0.4/");var oo=M("@live-codes/clio-browser-compiler@0.0.3/public/build/"),cu=M("coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js");var pu=M("dot@1.1.3/doT.js"),uu=M("ejs@3.1.9/ejs.js");var du="es-module-shims@1.4.4/dist/es-module-shims.js",mu=M("eta@2.2.0/dist/eta.umd.js");var fu=M("@fontsource/anonymous-pro@4.5.9/index.css"),hu=M("@fontsource/cascadia-code@4.2.1/index.css"),gu=M("https://fonts.cdnfonts.com/css/code-new-roman-2"),_u=M("comic-mono@0.0.1/index.css"),yu=M("@fontsource/courier-prime@4.5.9/index.css"),vu=M("https://fonts.cdnfonts.com/css/dec-terminal-modern"),bu=M("@fontsource/dejavu-mono@4.5.4/index.css"),wu=M("@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono.css"),xu=M("firacode@6.2.0/distr/fira_code.css"),Su=M("https://fonts.cdnfonts.com/css/fixedsys-62"),Lu=M("hack-font@3.3.0/build/web/hack.css"),Eu=M("typeface-hermit@0.0.44/index.css"),ku=M("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap"),Tu=M("https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"),Cu=M("@fontsource/iosevka@4.5.4/index.css"),ju=M("@fontsource/jetbrains-mono@4.5.11/index.css"),Mu=M("https://fonts.cdnfonts.com/css/menlo"),Uu=M("https://fonts.cdnfonts.com/css/monofur"),Au=M("@typopro/web-monoid@3.7.5/TypoPRO-Monoid.css"),Pu=M("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap"),Ou=M("https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap"),qu=M("@fontsource/opendyslexic@4.5.4/index.css"),Ru=M("https://fonts.cdnfonts.com/css/profontwindows"),Iu=M("@fontsource/roboto-mono@4.5.8/index.css"),Hu=M("https://fonts.cdnfonts.com/css/sf-mono"),Bu=M("@fontsource/source-code-pro@4.5.12/index.css"),Du=M("@fontsource/space-mono@4.5.10/index.css"),Nu=M("https://fonts.cdnfonts.com/css/sudo-var"),$u=M("@fontsource/ubuntu-mono@4.5.11/index.css"),Fu=M("victormono@1.5.4/dist/index.css"),zu=M("fscreen@1.2.0/dist/fscreen.esm.js");var En=M("@live-codes/go2js@0.4.0/build/");var ao=M("handlebars@4.7.7/dist/");var Wu=M("hint.css@2.7.0/hint.css");var lo=M("imba@2.0.0-alpha.229/dist/"),Gu=M("jest-lite@1.0.0-alpha.4/dist/core.js"),Ju=M("@types/jest@27.4.1/index.d.ts"),Vu=M("gh:jscl-project/jscl-project.github.io@efd3aecdba496d132ed650b7b5be976fd0ca278f/jscl.js");var Ku=M("liquidjs@10.8.2/dist/liquid.browser.min.js"),Xu=M("localforage@1.10.0/dist/localforage.js"),Zt=M("fengari-web@0.1.4/dist/fengari-web.js"),Yu=M("luna-object-viewer@0.2.0/luna-object-viewer.css"),Qu=M("luna-console@0.2.1/luna-console.css"),co="0.6.64",HP=M(`malinajs@${co}/malina.js`),Zu=M("marked@5.0.4/marked.min.js");var ed=M("mjml-browser@4.14.1/lib/index.js");var td=M("mustache@4.2.0/mustache.js");var sd=M("normalize.css@8.0.1/normalize.css"),po=M("nunjucks@3.2.4/browser/"),br=M("https://cdn.opalrb.com/opal/1.7.3/"),rd=M("parinfer@3.13.1/parinfer.js");var nd=M("@live-codes/postcss-import-url@0.1.2/dist/postcss-import-url.js"),vs=M("prettier@2.5.1/"),id=M("@prettier/plugin-php@0.18.0/standalone.js");var od=M("requirejs@2.3.6/require.js");var ad=M("reset-css@5.0.1/reset.css"),uo=M("riot@7.1.0/"),ld=M("@snackbar/core@1.7.0/dist/snackbar.css"),cd=M("spacingjs@1.0.7/dist/bundle.js"),pd=M("sql-formatter@12.2.1/dist/sql-formatter.min.js"),ud=M("sql.js@1.8.0/dist/"),dd=M("@stencil/core@3.2.2/compiler/stencil.js"),md=M("stylis@4.2.0/dist/umd/stylis.js");var kn=M("@yaireo/tagify@4.9.6/dist/"),fd=M("@mhsdesign/jit-browser-tailwindcss@0.3.0/dist/cdn.min.js"),ht=M("tau-prolog@0.3.4/modules/");var hd=M("twig@1.16.0/twig.min.js"),gd=M("typescript@5.1.3/lib/typescript.js"),_d=M("uniter@2.18.0/dist/uniter.js");var mo=M("vue@3"),fo=M("vue@2"),Tn=M("vue3-sfc-loader@0.8.4/dist/"),yd=M("wabt@1.0.32/index.js");var vd={name:"lightningcss",title:"Lightning CSS",isPostcssPlugin:!1,compiler:{url:P+"lightningcss/lightningcss.js",factory:(e,t)=>(self.importScripts(t+"processor-lightningcss-compiler.c9a8575d1089c28538780ba5ba130cb2.js"),self.createLightningcssCompiler())},editor:"style"};var bd={name:"postcss",title:"Processors:",isPostcssPlugin:!1,compiler:{url:P+"postcss/postcss.js",factory:(e,t)=>(self.importScripts(t+"processor-postcss-compiler.f8787bd5395ada95f6d40279daf71948.js"),self.createPostcssCompiler())},editor:"style",hidden:!0};var wd={name:"autoprefixer",title:"Autoprefixer",isPostcssPlugin:!0,compiler:{url:P+"autoprefixer/autoprefixer.js",factory:e=>self.autoprefixer.autoprefixer({...$("autoprefixer",e)})},editor:"style"},xd={name:"cssnano",title:"cssnano",isPostcssPlugin:!0,compiler:{url:P+"cssnano/cssnano.js",factory:()=>{let e=self.cssnano.cssnanoPresetDefault().plugins,t=[];for(let s of e){let[r,n]=s;(typeof n>"u"||typeof n=="object"&&!n.exclude||typeof n=="boolean"&&n===!0)&&t.push(r(n))}return t}},editor:"style"},Sd={name:"postcssImportUrl",title:"Import Url",isPostcssPlugin:!0,compiler:{url:nd,factory:e=>self.postcssImportUrl({...$("postcssImportUrl",e)})},editor:"style"},Ld={name:"postcssPresetEnv",title:"Preset Env",isPostcssPlugin:!0,compiler:{url:P+"postcss-preset-env/postcss-preset-env.js",factory:e=>self.postcssPresetEnv.postcssPresetEnv({autoprefixer:!1,...$("postcssPresetEnv",e)})},editor:"style"},Ed={name:"purgecss",title:"PurgeCSS",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:P+"purgecss/purgecss.js",factory:(e,t,s)=>self.purgecss.purgecss({...$("purgecss",e),content:[{raw:`<template>${s.html}
<script>${e.script.content}<\/script></template>`,extension:"html"}]})},editor:"style"},kd={name:"tokencss",title:"Token CSS",isPostcssPlugin:!0,compiler:{url:P+"tokencss/tokencss.js",factory:e=>{let t=$("tokencss",e);Object.keys(t).length===0&&(t.$schema="https://tokencss.com/schema@0.0.1",t.extends="@tokencss/core/preset");let s=(n,i)=>{let o=JSON.parse(JSON.stringify(n));return Object.keys(i).forEach(a=>{o[a]=typeof i[a]!="object"||Array.isArray(i[a])?i[a]:{...o[a],...i[a]}}),o},r=t.extends?.includes("@tokencss/core/preset")?s(self.tokencss.preset,t):t;return self.tokencss.tokencss({config:r})}},editor:"style"},Td={name:"cssmodules",title:"CSS Modules",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:P+"postcss-modules/postcss-modules.js",factory:(e,t,s)=>{let r=$("cssmodules",e);return self.postcssModules.postcssModules({localsConvention:"camelCase",...r,getJSON(n,i,o){let a=r.addClassesToHTML!==!1,l=r.removeOriginalClasses===!0;a&&(s.html=self.postcssModules.addClassesToHtml(s.html,i,l)),s.compileInfo={...s.compileInfo,cssModules:i,...a?{modifiedHTML:s.html}:{}}}})}},editor:"style"};var Cd={name:"tailwindcss",title:"Tailwind CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:fd,factory:(e,t)=>(self.importScripts(t+"processor-tailwindcss-compiler.4e4e1e62107a607ca6b8b776830640ee.js"),self.createTailwindcssCompiler())},editor:"style"};var jd={name:"unocss",title:"UnoCSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:P+"unocss/unocss.js",factory:(e,t)=>(self.importScripts(t+"processor-unocss-compiler.aabd93b3d26601936d1f5a0f0c4f7c00.js"),self.createUnocssCompiler())},editor:"style"};var Md={name:"windicss",title:"Windi CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:P+"windicss/windicss.js",factory:(e,t)=>(self.importScripts(t+"processor-windicss-compiler.2c60d8a9c198f1d4b94016ef99f81429.js"),self.createWindicssCompiler())},editor:"style"};var Ye=[Cd,Md,jd,kd,Ed,Sd,wd,Ld,vd,xd,Td,bd];var Q=(e="")=>{if(!e)return;let t=e?.toLowerCase();return we.find(s=>s.name===t||s.title.toLowerCase()===t||s.extensions.map(r=>r.toLowerCase()).includes(t))?.name},bs=e=>{let t=we.find(s=>s.name===e);return t?.longTitle||t?.title||e.toUpperCase()},ae=(e="")=>we.find(t=>t.name===Q(e))?.editor,Pe=(e="")=>we.find(t=>t.name===Q(e))?.extensions[0],wr=(e="")=>we.find(t=>t.name===Q(e)),Qe=(e="")=>{let s=wr(e)?.compiler;return typeof s=="string"&&(s=Qe(s)),s},rt=e=>wr(e)?.editorLanguage||e,Ze=(e,t)=>{let s=Q(e);return s?t.languages?t.languages?.map(Q).filter(Boolean).includes(s):!0:!1},ws=(e,t)=>Ye.map(s=>s.name).includes(e)?t.languages?t.languages.includes(e):!0:!1,ho=(e,t)=>t.processors.includes(e),Ud=(e,t)=>{let s=ae(e);return s?Ye.filter(r=>r.editor===s).map(r=>r.name).filter(r=>ws(r,t)).filter(r=>ho(r,t)).join("-"):""};var go=(e,t)=>{let s={...$(e,t)};return ae(e)==="markup"&&(s.template=t.customSettings.template),s};var Ad={name:"asciidoc",title:"AsciiDoc",compiler:{url:su,factory:()=>{let e=window.Asciidoctor();return async(t,{config:s})=>e.convert(t,{...$("asciidoc",s)})}},extensions:["adoc","asciidoc","asc"],editor:"markup"};var CO=vs+"standalone.js",T={babel:vs+"parser-babel.js",glimmer:vs+"parser-glimmer.js",html:vs+"parser-html.js",markdown:vs+"parser-markdown.js",postcss:vs+"parser-postcss.js",php:id,pug:P+"prettier/parser-pug.js"};var Pd={name:"babel",title:"Babel",parser:{name:"babel",pluginUrls:[T.babel,T.html]},compiler:{url:iu,factory:()=>async(e,{config:t})=>window.Babel.transform(e,{filename:"script.tsx",presets:[["env",{modules:!1}],"typescript","react"],...$("babel",t)}).code},extensions:["es","babel"],editor:"script",editorLanguage:"typescript"};var Od={name:"css",title:"CSS",info:!1,parser:{name:"css",pluginUrls:[T.postcss]},compiler:{factory:()=>async e=>e},extensions:["css"],editor:"style"};var qd={name:"haml",title:"Haml",compiler:{url:P+"clientside-haml-js/haml.js",factory:(e,t)=>(self.importScripts(t+"lang-haml-compiler.8e0f4fea3a8fefc8259ca8d6f0768a72.js"),self.createHamlCompiler())},extensions:["haml"],editor:"markup"};var Rd={name:"html",title:"HTML",info:!1,parser:{name:"html",pluginUrls:[T.html]},compiler:{factory:()=>async e=>e},extensions:["html","htm"],editor:"markup"};var Id={name:"javascript",title:"JS",longTitle:"JavaScript",info:!1,parser:{name:"babel",pluginUrls:[T.babel,T.html]},compiler:{factory:()=>async e=>e},extensions:["js"],editor:"script"};var Hd={name:"jsx",title:"JSX",parser:{name:"babel",pluginUrls:[T.babel,T.html]},compiler:"typescript",extensions:["jsx"],editor:"script",editorLanguage:"javascript"};var Bd={name:"tsx",title:"TSX",parser:{name:"babel-ts",pluginUrls:[T.babel,T.html]},compiler:"typescript",extensions:["tsx"],editor:"script",editorLanguage:"typescript"};var Dd={name:"less",title:"Less",parser:{name:"less",pluginUrls:[T.postcss]},compiler:{url:P+"less/less.js",factory:()=>async(e,{config:t})=>(await window.less.render(e,{...$("less",t)})).css},extensions:["less"],editor:"style"};var Nd={name:"markdown",title:"Markdown",parser:{name:"markdown",pluginUrls:[T.markdown,T.html]},compiler:{url:Zu,factory:()=>async(e,{config:t})=>window.marked.parse(e,{headerIds:!1,mangle:!1,...$("markdown",t)})},extensions:["md","markdown","mdown","mkdn"],editor:"markup"};var xr=async(e,t,s,r={},n=self)=>new Promise(i=>{if(!e||!t||!s)return i(e||"");let o=async function(a){let l=a.data.payload;a.data.trigger==="compileInCompiler"&&l?.content===e&&l?.language===t&&(n.removeEventListener("message",o),i(l.compiled))};n.addEventListener("message",o),n.postMessage({type:"compileInCompiler",payload:{content:e,language:t,config:s,options:r}})});var eL=async(e,{config:t,worker:s})=>new Promise(async r=>{if(!e)return r("");let[n,{default:i}]=await Promise.all([import(P+"mdx/mdx.js"),import(P+"remark-gfm/remark-gfm.js")]),o=(await n.compile(e,{remarkPlugins:[i],...$("mdx",t)})).value,l=(d=>d.replace(/, {[^}]*} = _components/g,"").replace(/const {[^:]*} = props.components[^;]*;/g,""))(o),c=`import React from "react";
import { createRoot } from "react-dom/client";
${gs(l,!1)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`,p=await xr(c,"jsx",t,{},s);r(`<div id="__livecodes_mdx_root__"></div><script type="module">${p}<\/script>`)}),$d={name:"mdx",title:"MDX",parser:{name:"markdown",pluginUrls:[T.markdown,T.html]},compiler:{factory:()=>async e=>e,runOutsideWorker:eL,compiledCodeLanguage:"javascript"},extensions:["mdx"],editor:"markup",editorLanguage:"markdown"};var Fd={name:"pug",title:"Pug",parser:{name:"pug",pluginUrls:[T.pug]},compiler:{url:P+"pug/pug.min.js",factory:(e,t)=>(self.importScripts(t+"lang-pug-compiler.6b93c9c73ccadec5e38caa8ec77d3900.js"),self.createPugCompiler())},extensions:["pug","jade"],editor:"markup"};var zd={name:"scss",title:"SCSS",parser:{name:"scss",pluginUrls:[T.postcss]},compiler:{url:P+"sass/sass.js",factory:(e,t)=>(self.importScripts(t+"lang-scss-compiler.712bd4672051205ef090643fa8dd8b68.js"),self.createScssCompiler())},extensions:["scss"],editor:"style"};var Wd={name:"sass",title:"Sass",compiler:"scss",extensions:["sass"],editor:"style"};var Gd={name:"svelte",title:"Svelte",parser:{name:"html",pluginUrls:[T.html,T.babel]},compiler:{url:P+"svelte/svelte-compiler.min.js",factory:(e,t)=>(self.importScripts(t+"lang-svelte-compiler.069bfb65fda860a697774c930b5d091c.js"),self.createSvelteCompiler())},extensions:["svelte"],editor:"script",editorLanguage:"html"};var Jd={name:"stylus",title:"Stylus",compiler:{url:P+"stylus/stylus.min.js",factory:()=>async e=>window.stylus.render(e)},extensions:["styl"],editor:"style"};var Sr={target:"es2015",jsx:"react",allowUmdGlobalAccess:!0,esModuleInterop:!0},Vd={name:"typescript",title:"TS",longTitle:"TypeScript",parser:{name:"babel-ts",pluginUrls:[T.babel,T.html]},compiler:{url:gd,factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...Sr,...$("typescript",t),...$(s,t)})},extensions:["ts","typescript"],editor:"script"};var tL=Tn+"vue3-sfc-loader.js",Kd={name:"vue",title:"Vue 3",longTitle:"Vue 3 SFC",parser:{name:"html",pluginUrls:[T.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVueCompiler()),scripts:[mo,tL],imports:{vue:mo+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue","vue3"],editor:"script",editorLanguage:"html"};var sL=Tn+"vue2-sfc-loader.js",Xd={name:"vue2",title:"Vue 2",longTitle:"Vue 2 SFC",parser:{name:"html",pluginUrls:[T.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVue2Compiler()),scripts:[fo,sL],imports:{vue:fo+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue2"],editor:"script",editorLanguage:"html"};var Yd={name:"stencil",title:"Stencil",parser:{name:"babel-ts",pluginUrls:[T.babel,T.html]},compiler:{url:dd,factory:()=>async(e,{config:t})=>(await window.stencil.transpile(e,{sourceMap:!1,target:"es2019",...$("stencil",t)})).code,types:{"@stencil/core":{url:P+"types/stencil-core.d.ts",declareAsModule:!1}}},extensions:["stencil.tsx"],editor:"script",editorLanguage:"typescript"};var Qd={name:"coffeescript",title:"Coffee",longTitle:"CoffeeScript",compiler:{url:cu,factory:()=>async(e,{config:t})=>window.CoffeeScript.compile(e,{bare:!0,...$("coffeescript",t)})},extensions:["coffee"],editor:"script"};var Zd={name:"livescript",title:"LiveScript",compiler:{url:P+"livescript/livescript-min.js",factory:()=>async(e,{config:t})=>window.require("livescript").compile(e,{bare:!0,...$("livescript",t)}),scripts:[P+"livescript/prelude-browser-min.js"]},extensions:["ls"],editor:"script"};var rL=P+"assemblyscript/assemblyscript.js",em={name:"assemblyscript",title:"AS",longTitle:"AssemblyScript",parser:{name:"babel-ts",pluginUrls:[T.babel]},compiler:{url:rL,factory:(e,t)=>(self.importScripts(t+"lang-assemblyscript-compiler.8caa06a4a75b2f2d32150d1c4cd03b95.js"),self.createAssemblyscriptCompiler()),scripts:({baseUrl:e})=>[ru,e+"lang-assemblyscript-script.a8afe51d73d1fa349c7874dce9f2108f.js"],scriptType:"application/wasm-uint8",compiledCodeLanguage:"wat",types:{assemblyscript:{url:P+"types/assemblyscript.d.ts",declareAsModule:!1,autoload:!0}}},extensions:["as","ts"],editor:"script",editorLanguage:"typescript"};var nL=io+"brython.min.js",iL=io+"brython_stdlib.js",tm={name:"python",title:"Python",compiler:{factory:()=>async e=>e,scripts:({compiled:e,config:t})=>{let{autoloadStdlib:s,...r}=$("python",t),n=/^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm,i=s!==!1&&e.match(n)?[iL]:[],o=`window.addEventListener("load", () => {brython(${JSON.stringify(r)})})`,a="data:text/plain;base64,"+btoa(o);return[nL,...i,a]},scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py"],editor:"script"};var oL=(e,t={})=>Array.from(new Set([...e.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map(s=>s[1]).map(s=>s.split("/")[0]).filter(s=>t.hasOwnProperty(s)||s!=="opal").map(s=>t[s]||`${br+s}.min.js`))),sm={name:"ruby",title:"Ruby",compiler:{url:br+"opal.min.js",factory:()=>(importScripts(br+"opal-parser.min.js"),self.Opal.config.unsupported_features_severity="ignore",self.Opal.load("opal-parser"),async(e,{config:t})=>{let{autoloadStdlib:s,requireMap:r,...n}=$("ruby",t);return self.Opal.compile(e,n)}),scripts:({compiled:e,config:t})=>{let{autoloadStdlib:s,requireMap:r}=$("ruby",t),n=oL(e,r),i=s!==!1?n:[];return[br+"opal.min.js",...i]}},extensions:["rb"],editor:"script"};var rm={name:"php",title:"PHP",parser:{name:"php",pluginUrls:[T.php]},compiler:{factory:()=>async e=>(e=e.trim(),e.startsWith("<?php")&&(e=e.replace("<?php","/* <?php */"),e.endsWith("?>")&&(e=e.replace("?>","/* ?> */"))),e),scripts:[_d],deferScripts:!0,scriptType:"text/x-uniter-php",compiledCodeLanguage:"php"},extensions:["php"],editor:"script"};var nm={name:"perl",title:"Perl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[P+"perlito/perlito5.min.js",e+"lang-perl-script.1f606d886aeb724510a595d45cbaf555.js"],scriptType:"text/perl"},extensions:["pl","pm"],editor:"script"};var aL=P+"lua-fmt/lua-fmt.js",_o={factory:()=>(self.importScripts(aL),async(e,t)=>({formatted:self.luaFmt.formatText(e),cursorOffset:t}))},im={name:"lua",title:"Lua",formatter:_o,compiler:{factory:()=>async e=>e,scripts:[Zt],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["lua"],editor:"script"};var xs=()=>{let e=rd;return self.importScripts(e),async t=>({formatted:window.parinfer.parenMode(t).text,cursorOffset:0})},om={name:"commonlisp",title:"Lisp",longTitle:"Common Lisp",formatter:{factory:xs},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[Vu,e+"lang-commonlisp-script.0c86dfce5f8509928ccf51ff666c7b4b.js"],scriptType:"text/commonlisp",compiledCodeLanguage:"commonlisp",inlineScript:`

    `},extensions:["lisp","common-lisp"],editor:"script",editorLanguage:"scheme"};var am={name:"scheme",title:"Scheme",formatter:{factory:xs},compiler:{factory:()=>async e=>e,scripts:[ou],scriptType:"text/biwascheme",compiledCodeLanguage:"scheme"},extensions:["scm"],editor:"script"};var lm={name:"solid",title:"Solid",parser:{name:"babel",pluginUrls:[T.babel,T.html]},compiler:{dependencies:["babel"],url:P+"babel-preset-solid/babel-preset-solid.js",factory:(e,t)=>(self.importScripts(t+"lang-solid-compiler.4edfa4ed39f071836693c79f40f0d9b6.js"),self.createSolidCompiler()),types:{"solid-js":{url:P+"types/solid-js.d.ts",declareAsModule:!1}}},extensions:["solid.jsx"],editor:"script",editorLanguage:"javascript"};var cm={name:"solid.tsx",title:"Solid (TS)",parser:{name:"babel",pluginUrls:[T.babel,T.html]},compiler:"solid",extensions:["solid.tsx"],editor:"script",editorLanguage:"typescript"};var pm={name:"pyodide",title:"Pyodide",longTitle:"Python (Pyodide)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-python-pyodide-script.d8d4d32ed97521be2e4e35536f468333.js"],liveReload:!0,scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py3"],editor:"script",editorLanguage:"python",largeDownload:!0};var um={name:"liquid",title:"Liquid",parser:{name:"html",pluginUrls:[T.html]},compiler:{url:Ku,factory:(e,t)=>(self.importScripts(t+"lang-liquid-compiler.a8cb47f76c1808bdc02fcae94ff8025f.js"),self.createLiquidCompiler())},extensions:["liquid","liquidjs"],editor:"markup",editorLanguage:"html"};var dm={name:"ejs",title:"EJS",parser:{name:"html",pluginUrls:[T.html]},compiler:{url:uu,factory:(e,t)=>(self.importScripts(t+"lang-ejs-compiler.1f9bfcb931f9f068dbdca2155fde7947.js"),self.createEjsCompiler())},extensions:["ejs"],editor:"markup",editorLanguage:"html"};var lL=ao+"handlebars.min.js",jI=ao+"handlebars.runtime.min.js",mm={name:"handlebars",title:"Handlebars",parser:{name:"glimmer",pluginUrls:[T.glimmer]},compiler:{url:lL,factory:(e,t)=>(self.importScripts(t+"lang-handlebars-compiler.be7818c60da12a1729c425a770910e92.js"),self.createHandlebarsCompiler())},extensions:["hbs","handlebars"],editor:"markup",editorLanguage:"html"};var fm={name:"dot",title:"doT",parser:{name:"html",pluginUrls:[T.html]},compiler:{url:pu,factory:(e,t)=>(self.importScripts(t+"lang-dot-compiler.557d6ca7c515de1e84f17c4842ec71cd.js"),self.createDotCompiler())},extensions:["dot"],editor:"markup",editorLanguage:"html"};var cL=po+"nunjucks.min.js",DI=po+"nunjucks-slim.min.js",hm={name:"nunjucks",title:"Nunjucks",parser:{name:"html",pluginUrls:[T.html]},compiler:{url:cL,factory:(e,t)=>(self.importScripts(t+"lang-nunjucks-compiler.055d011de44eb181acbea8b1a49a7ce2.js"),self.createNunjucksCompiler())},extensions:["njk","nunjucks"],editor:"markup",editorLanguage:"html"};var gm={name:"go",title:"Go",formatter:{factory:()=>(importScripts(En+"go2js-format.js"),async e=>{if(!e)return{formatted:"",cursorOffset:0};let[t,s]=globalThis.go2jsFormat(e);return s?(console.error(s),{formatted:e,cursorOffset:0}):{formatted:t,cursorOffset:0}})},compiler:{url:En+"go2js-compile.js",factory:()=>e=>new Promise(t=>{if(!e){t("");return}globalThis.go2jsCompile(e,En,(s,r)=>{s?(console.error(s),t("")):t(r)})})},extensions:["go","golang"],editor:"script"};var pL=async(e,{baseUrl:t,language:s})=>{let{rescriptCompiler:r}=await import(t+"lang-rescript-compiler-esm.2b9d0781c004e55c6bc74ba441a3e29e.js");return r(e,{baseUrl:t,language:s})},yo=(e,t)=>(importScripts(e+"lang-rescript-formatter.187ba934d1c84704a2717e3cf411e618.js"),self.createRescriptFormatter(e,t)),_m={name:"rescript",title:"ReScript",formatter:{factory:yo},compiler:{factory:()=>async e=>e,runOutsideWorker:pL,scriptType:"module"},extensions:["res","resi"],editor:"script",editorLanguage:"javascript"};var ym={name:"reason",title:"Reason",formatter:{factory:yo},compiler:"rescript",extensions:["re","rei"],editor:"script",editorLanguage:"javascript"};var vm={name:"ocaml",title:"OCaml",compiler:"rescript",extensions:["ml","mli"],editor:"script",editorLanguage:"javascript"};var uL=P+"wast-refmt/wast-refmt.js",dL="application/wasm-uint8",bm={name:"wat",title:"WAT",longTitle:"WebAssembly Text",formatter:{factory:()=>(importScripts(uL),async e=>{let t=e;try{t=self.wastRefmt.format(e)}catch(s){console.warn("failed parsing WAT",s)}return{formatted:t,cursorOffset:0}})},compiler:{url:yd,factory:(e,t)=>(self.importScripts(t+"lang-wat-compiler.eea1bd41c9dee36246a40e3aed8394fd.js"),self.createWatCompiler()),scripts:({baseUrl:e})=>[e+"lang-wat-script.29d1634ac55c93301ce5fe2a25906bd0.js"],scriptType:dL,compiledCodeLanguage:"Binary"},extensions:["wat","wast","webassembly","wasm"],editor:"script"};var mL=uo+"riot+compiler.min.js",fL=uo+"riot.min.js",wm={name:"riot",title:"Riot.js",parser:{name:"html",pluginUrls:[T.html,T.babel]},compiler:{url:mL,factory:(e,t)=>(self.importScripts(t+"lang-riot-compiler.1f8f0884684f258ddc3c50c8094e7e2a.js"),self.createRiotCompiler()),scripts:[fL],scriptType:"module"},extensions:["riot","riotjs"],editor:"script",editorLanguage:"html"};var hL="application/json",xm={name:"sql",title:"SQL",formatter:{factory:()=>(importScripts(pd),async e=>({formatted:await self.sqlFormatter.format(e,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{url:ud+"sql-wasm.js",factory:(e,t)=>(self.importScripts(t+"lang-sql-compiler.fa10aaaaf82d9d6a8cc8ebce5c63c3bc.js"),self.createSqlCompiler()),scripts:({baseUrl:e})=>[e+"lang-sql-script.0c35ad4ef2960bb91f816273b91f6c33.js"],scriptType:hL,compiledCodeLanguage:"json"},extensions:["sql","sqlite","sqlite3"],editor:"script"};var Lr=P+"react-native-web/react-native-web.js",Sm={name:"react-native",title:"RN",longTitle:"React Native",parser:{name:"babel",pluginUrls:[T.babel,T.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...Sr,...$("typescript",t),...$(s,t)}),imports:{react:Lr,"react-native":Lr}},extensions:["react-native.jsx"],editor:"script",editorLanguage:"javascript"};var Lm={name:"react-native-tsx",title:"RN (TSX)",longTitle:"React Native (TSX)",parser:{name:"babel",pluginUrls:[T.babel,T.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...Sr,...$("typescript",t),...$(s,t)}),imports:{react:Lr,"react-native":Lr}},extensions:["react-native.tsx"],editor:"script",editorLanguage:"typescript"};var Em={name:"blockly",title:"Blockly",compiler:{factory:()=>async(e,{options:t})=>t?.blockly?.js||""},extensions:["blockly.xml","xml"],editor:"script",editorLanguage:"xml"};var km={name:"twig",title:"Twig",parser:{name:"html",pluginUrls:[T.html]},compiler:{url:hd,factory:(e,t)=>(self.importScripts(t+"lang-twig-compiler.39e618d8e11e20b2f85ea15294864c17.js"),self.createTwigCompiler())},extensions:["twig"],editor:"markup",editorLanguage:"html"};var gL=nu+"compiler.min.js",Tm={name:"astro",title:"Astro",parser:{name:"html",pluginUrls:[T.html,T.babel]},compiler:{url:gL,factory:(e,t)=>(self.importScripts(t+"lang-astro-compiler.8407bb9d7fa8feeae708ab9b6cd12739.js"),self.createAstroCompiler())},extensions:["astro"],editor:"markup"};var Cm={name:"malina",title:"Malina.js",parser:{name:"html",pluginUrls:[T.html,T.babel]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-malina-compiler.a0adf0552670bef0d7989fd7b78dfbb3.js"),self.createMalinaCompiler()),imports:{"malinajs/runtime.js":`https://jspm.dev/malinajs@${co}/runtime.js`}},extensions:["xht"],editor:"script",editorLanguage:"html"};var _L=P+"jscpp/JSCPP.es5.min.js",jm={name:"cpp",title:"C++",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[_L,e+"lang-cpp-script.1baeb187434ba3ed6b23b718933338ad.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp"},extensions:["cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script"};var Mm={name:"julia",title:"Julia",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-julia-script.fe987901a797bc777c685f0daf4357d5.js"],liveReload:!0,scriptType:"text/julia",compiledCodeLanguage:"julia"},extensions:["jl"],editor:"script",largeDownload:!0};var Um={name:"clang",title:"Clang",longTitle:"C/C++ (Clang)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-cpp-clang-script.4816be0f52e578d04c317645169dc4cb.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp",liveReload:!0},extensions:["clang.cpp","clang","cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script",editorLanguage:"cpp",largeDownload:!0};var Am={name:"tcl",title:"Tcl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[od,e+"lang-tcl-script.3f6a624f992c65a3fd69f999e53fcbd7.js"],scriptType:"text/tcl",compiledCodeLanguage:"tcl"},extensions:["tcl"],editor:"script"};var Pm={name:"prolog",title:"Prolog",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[ht+"core.js",ht+"charsio.js",ht+"dom.js",ht+"format.js",ht+"js.js",ht+"lists.js",ht+"os.js",ht+"promises.js",ht+"random.js",ht+"statistics.js",e+"lang-prolog-script.2780539e5f2bc8edb4aedd5cf57143e7.js"],scriptType:"text/prolog",compiledCodeLanguage:"prolog"},extensions:["prolog.pl","prolog"],editor:"script"};var Om={name:"clio",title:"Clio",compiler:{url:oo+"compile.js",factory:(e,t)=>(self.importScripts(t+"lang-clio-compiler.75c879c608b8073530c584f64896740a.js"),self.createClioCompiler()),scripts:[oo+"exec.js"]},extensions:["clio"],editor:"script",editorLanguage:"coffeescript"};var qm={name:"richtext",title:"Rich Text",longTitle:"Rich Text Editor",compiler:{factory:()=>async(e,{config:t})=>t.markup.content||"",styles:["quill.8e9d74c74d2c8aaa5d849678c215cf7e.css"]},extensions:["rte","rte.html","rich"],editor:"markup",editorLanguage:"html"};var yL=async(e,{baseUrl:t,config:s})=>{let{diagramsCompiler:r}=await import(t+"lang-diagrams-compiler-esm.468dd2b25c78af5f2902eb20a4571be5.js");return r(e,{config:s})},Rm={name:"diagrams",title:"Diagrams",parser:{name:"html",pluginUrls:[T.html]},compiler:{factory:()=>async e=>e||"",runOutsideWorker:yL},extensions:["diagrams","diagram","graph","plt"],editor:"markup",editorLanguage:"html"};var Im={name:"imba",title:"Imba",compiler:{url:lo+"compiler.js",factory:(e,t)=>(self.importScripts(t+"lang-imba-compiler.4f3b1e55a23cb0384355b5dca2ab42bf.js"),self.createImbaCompiler()),imports:{imba:lo+"imba.mjs"}},extensions:["imba"],editor:"script"};var Hm={name:"mustache",title:"Mustache",parser:{name:"glimmer",pluginUrls:[T.glimmer]},compiler:{url:td,factory:(e,t)=>(self.importScripts(t+"lang-mustache-compiler.93b843bf816add490577db24db6270c6.js"),self.createMustacheCompiler())},extensions:["mustache"],editor:"markup",editorLanguage:"html"};var Bm={name:"art-template",title:"art",longTitle:"art-template",parser:{name:"html",pluginUrls:[T.html]},compiler:{url:tu,factory:(e,t)=>(self.importScripts(t+"lang-art-template-compiler.4716dcf439c98cecc6d924d76392deb3.js"),self.createArtTemplateCompiler())},extensions:["art","art-template"],editor:"markup",editorLanguage:"html"};var Dm={name:"r",title:"R",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-r-script-esm.42cba088ad6175ae88305ac37d440eae.js"],inlineScript:`
    livecodes.r = livecodes.r || {config: {}};
    addEventListener('load', async () => {
      await livecodes.r.loaded;
      if (livecodes.r.config?.autoEvaluate !== false) {
        await livecodes.r.run();
      }
      // reset config before next load
      livecodes.r.config = {};
    });
    `,liveReload:!0,scriptType:"text/r",compiledCodeLanguage:"r"},extensions:["r","rlang","rstats"],editor:"script",largeDownload:!0};var vL=P+"civet/civet.js",Nm={name:"civet",title:"Civet",compiler:{url:vL,factory:()=>async e=>window.civet.compile(e,{js:!0})},extensions:["civet"],editor:"script",editorLanguage:"coffeescript"};var $m={name:"fennel",title:"Fennel",formatter:{factory:xs},compiler:{url:Zt,factory:(e,t)=>(self.importScripts(t+"lang-fennel-compiler.1f24a9823f590b00c793a67b29f61e83.js"),self.createFennelCompiler()),scripts:[Zt],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["fnl"],editor:"script",editorLanguage:"scheme"};var Fm={name:"teal",title:"Teal",formatter:_o,compiler:{url:Zt,factory:(e,t)=>(self.importScripts(t+"lang-teal-compiler.1a0bb35b51557f740f6379336bc5a8e1.js"),self.createTealCompiler()),scripts:[Zt],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["tl"],editor:"script",editorLanguage:"lua"};var zm={name:"stylis",title:"Stylis",compiler:{url:md,factory:()=>async e=>{let{compile:t,serialize:s,stringify:r,middleware:n,prefixer:i}=window.stylis;return s(t(e),n([i,r]))}},extensions:["stylis"],editor:"style",editorLanguage:"scss"};var Wm={name:"flow",title:"Flow",parser:{name:"babel-flow",pluginUrls:[T.babel,T.html]},compiler:{url:P+"flow-remove-types/flow-remove-types.js",factory:()=>async(e,{config:t})=>window.flowRemoveTypes.transpile(e,{all:!0,...$("flow",t)}).toString()},extensions:["flow"],editor:"script",editorLanguage:"typescript"};var Gm={name:"mjml",title:"MJML",parser:{name:"html",pluginUrls:[T.html]},compiler:{url:ed,factory:()=>async(e,{config:t})=>{if(!e.trim())return"";let{html:s,errors:r}=self.mjml(e,$("mjml",t));return r?.forEach(n=>{console.warn(n.formattedMessage)}),s}},extensions:["mjml"],editor:"markup",editorLanguage:"xml"};var Jm={name:"sucrase",title:"Sucrase",parser:{name:"babel",pluginUrls:[T.babel,T.html]},compiler:{url:P+"sucrase/sucrase.js",factory:()=>async(e,{config:t})=>window.sucrase.transform(e,{transforms:["jsx","typescript"],...$("sucrase",t)}).code},extensions:["sucrase"],editor:"script",editorLanguage:"typescript"};var Vm={name:"eta",title:"Eta",parser:{name:"html",pluginUrls:[T.html]},compiler:{url:mu,factory:(e,t)=>(self.importScripts(t+"lang-eta-compiler.ad84b8336e66949b7ecb9ad4f792e059.js"),self.createEtaCompiler())},extensions:["eta"],editor:"markup",editorLanguage:"html"};var Cn=(e,t,s)=>e.filter(r=>Ye.includes(r)||Ze(r.name,t)).reduce((r,n)=>{if(n.compiler&&!r[n.name])if(typeof n.compiler=="string"){let i=e.find(o=>o.name===n.compiler)?.compiler;r[n.name]={...i,url:Km(i.url,s),aliasTo:n.compiler}}else r[n.name]={...n.compiler,url:Km(n.compiler.url,s)};return r},{}),Km=(e,t)=>e?Gs(e)?t+e:e:"";var Ss=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.io")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost")));var Xm=()=>{let e=[];return{addEventListener:(n,i,o,a)=>{n&&(n.addEventListener(i,o,a||!1),e.push({element:n,eventType:i,fn:o}))},removeEventListener:(n,i,o)=>{if(!n)return;n.removeEventListener(i,o);let a=e.find(l=>l.element===n&&l.eventType===i&&l.fn===o);a&&e.splice(e.indexOf(a))},removeEventListeners:()=>{e.forEach(n=>{n.element.removeEventListener(n.eventType,n.fn),e.splice(e.indexOf(n))})}}};var nt={getConfig:"livecodes-get-config",config:"livecodes-config",load:"livecodes-load",appLoaded:"livecodes-app-loaded",ready:"livecodes-ready",change:"livecodes-change",testResults:"livecodes-test-results",destroy:"livecodes-destroy",resizeEditor:"livecodes-resize-editor",apiResponse:"livecodes-api-response"};var jn=()=>{let e=[];return{subscribe:i=>(e.push(i),{unsubscribe:()=>{e.splice(e.indexOf(i),1)}}),notify:i=>{e.forEach(o=>{o(i)})},hasSubscribers:()=>e.length>0,unsubscribeAll:()=>{e.length=0}}};var Ht={getList:async()=>[],getAllData:async()=>[],getItem:async()=>null,addItem:async()=>"",updateItem:async()=>"",deleteItem:async()=>{},bulkInsert:async()=>{},restore:async()=>{},clear:async()=>{},subscribe:()=>({unsubscribe:()=>{}}),unsubscribeAll:()=>{}},Ym={getValue:()=>null,setValue:()=>{},clear:()=>{},subscribe:()=>({unsubscribe:()=>{}}),unsubscribeAll:()=>{}};var Mn,Qm="livecodes",vo={},bo=()=>(Date.now()+""+Math.floor(Math.floor(Math.random()*Date.now()))).substring(0,24),bL=async e=>{Mn||(Mn=await yr(Xu,"localforage"),Mn.config({name:Qm})),vo[e]||(vo[e]=Mn.createInstance({name:Qm,storeName:e}))},Bt=async(e,t)=>{if(t)return Ht;let s,r=jn(),n=b=>r.subscribe(b),i=()=>{r.unsubscribeAll()},o=()=>{r.hasSubscribers()&&c().then(b=>{r.notify(b)})},a=async()=>{await bL(e),s=vo[e]},l=async()=>(await a(),s.keys()),c=async()=>{await a();let b=[];return await s.iterate(S=>{b.push(S)}),b.sort((S,v)=>v.lastModified&&S.lastModified?v.lastModified-S.lastModified:0)},p=async b=>(await a(),s.getItem(b)),d=async(b,S,v=!0)=>(await a(),await s.setItem(b,S),v&&o(),b),g=async(b,S=!0)=>{let v=bo();return await d(v,b,S),v};return{getList:l,getAllData:c,getItem:p,addItem:b=>g(b),updateItem:(b,S)=>d(b,S),deleteItem:async b=>{await a(),await s.removeItem(b),o()},bulkInsert:async b=>{for(let S of b)await g(S,!1);o()},restore:async b=>{for(let S of b)S.id?await d(S.id,S,!1):await g(S,!1);o()},clear:async()=>{await a(),await s.clear(),o()},subscribe:n,unsubscribeAll:i}};var wo=async(e,t)=>{let s=await Bt(e,t),r=async()=>(await s.getAllData()).map(a=>({id:a.id,title:a.config?.title||"",description:a.config?.description||"",tags:a.config?.tags||[],languages:a.config?[a.config.markup.language,a.config.style.language,a.config.script.language]:[],lastModified:a.lastModified})).sort((a,l)=>l.lastModified-a.lastModified),n=(a,l)=>{let c={id:a,config:l,lastModified:Date.now()};return s.updateItem(a,c)},i=async a=>{let l=bo();return n(l,a)};return{...s,getList:r,addItem:i,updateItem:n,bulkInsert:async a=>{for(let l of a)await i(l)}}};var Un=(e,t)=>{if(t)return Ym;let s=jn(),r=c=>s.subscribe(c),n=()=>{s.unsubscribeAll()},i=()=>{s.notify(a())},o=c=>{window.localStorage.setItem(e,JSON.stringify(c)),i()},a=()=>{let c=window.localStorage.getItem(e);if(!c)return null;try{return JSON.parse(c)}catch{return null}};return{getValue:a,setValue:o,clear:()=>{o(null),i()},subscribe:r,unsubscribeAll:n}};var Zm=()=>Yt({projects:null,templates:null,assets:null,snippets:null,recover:null,userConfig:null,userData:null,appData:null,sync:null}),ef=async(e,t)=>{t||(e.projects=await wo("__livecodes_data__",t),e.templates=await wo("__livecodes_templates__",t),e.assets=await Bt("__livecodes_assets__",t),e.snippets=await Bt("__livecodes_snippets__",t),e.recover=Un("__livecodes_project_recover__",t),e.userConfig=Un("__livecodes_user_config__",t),e.userData=await Bt("__livecodes_user_data__",t),e.appData=Un("__livecodes_app_data__",t),e.sync=await Bt("__livecodes_sync_data__",t))};var Vs=zp(sf()),Pn=Vs.compressToEncodedURIComponent,rf=(e,t=!0)=>{let s=(0,Vs.decompressFromEncodedURIComponent)(e);if(s){if(!t)return s;try{if(JSON.parse(s))return s}catch{}}return(0,Vs.decompressFromBase64)(e)};var On,nf=async()=>{On=On||await Bt("__livecodes_key__",!1)},wL=e=>new TextEncoder().encode(e),xL=e=>new TextDecoder().decode(e),SL=async e=>{await nf(),await On.updateItem("__livecodes_key_id__",Pn(e))},LL=async()=>{await nf();let e=await On.getItem("__livecodes_key_id__");return e?rf(e):null},EL=async()=>{let e=await window.crypto.subtle.generateKey({name:"RSA-OAEP",modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},!0,["encrypt","decrypt"]),t=await crypto.subtle.exportKey("jwk",e.publicKey),s=await crypto.subtle.exportKey("jwk",e.privateKey),r=JSON.stringify({public:t,private:s});return await SL(r),r},of=async e=>crypto.subtle.importKey("jwk",JSON.parse(await LL()||await EL())[e],{name:"RSA-OAEP",hash:"SHA-256"},!0,e==="public"?["encrypt"]:["decrypt"]),af=async e=>{let t=wL(e),s=await of("public"),r=await window.crypto.subtle.encrypt({name:"RSA-OAEP"},s,t);return JSON.stringify(Array.from(new Uint8Array(r)))},lf=async e=>{try{let t=await window.crypto.subtle.decrypt({name:"RSA-OAEP"},await of("private"),new Uint8Array(JSON.parse(e)));return xL(t)}catch{return null}};var kL={load:async()=>{},getUser:async()=>{},signIn:async()=>{},signOut:async()=>{},isLoggedIn:()=>!1},pf=e=>{if(e)return kL;let t,s,r,n,i,o,a,l,c,p;return{async load(){let d=await Xp("./firebase.4625f0fe5950885c0804c63b33a7aad7.js");t=d.initializeApp,s=d.getApp,r=d.getAuth,n=d.signInWithPopup,i=d.signOut,o=d.GithubAuthProvider,a=d.firebaseConfig;try{l=s()}catch{l=t(a)}c=r(l),p=c.currentUser},async getUser(){return c||await this.load(),p?await So(p.uid)?Promise.resolve(await xo(p)):void 0:new Promise(d=>{let g=c.onAuthStateChanged(async _=>{_?(p=_,g(),d(await xo(p))):d(void 0)})})},async signIn(d=["gist","repo"]){c||await this.load();let g=new o;d.forEach(u=>g.addScope(u));let _=await n(c,g),f=o.credentialFromResult(_)?.accessToken;if(f)return p=_.user,await TL(p.uid,f),await uf(p),xo(_.user)},async signOut(){c||await this.load(),await i(c),CL(p?.uid),p=null},isLoggedIn(){return p!=null}}},TL=async(e,t)=>{localStorage.setItem("token_"+e,await af(t))},So=async e=>{if(!e)return null;let t=localStorage.getItem("token_"+e);return t?lf(t):null},cf=(e,t)=>{localStorage.setItem("username_"+e,t)},CL=e=>{e&&(localStorage.removeItem("token_"+e),localStorage.removeItem("username_"+e))},xo=async e=>({uid:e.uid,displayName:e.displayName,username:await uf(e),email:e.email,photoURL:e.photoURL,token:await So(e.uid)}),uf=async e=>{let t=e.uid,s=localStorage.getItem("username_"+t);if(s)return s;let r=e.reloadUserInfo?.screenName;if(r)return cf(t,r),r;let o=(await(await fetch("https://api.github.com/user",{headers:{Accept:"application/vnd.github.v3+json",Authorization:"token "+await So(t)}})).json()).login;return cf(t,o),o};var jL="https://livecodes-sandbox.pages.dev";var Lo=jL,df="v6",es={getResultUrl:()=>`${Lo}/${df}/result`,getCompilerUrl:()=>`${Lo}/${df}/compiler`,getOrigin:()=>new URL(Lo).origin};var mf="https://dpaste.com/",ML="https://dpaste.com/api/v2/",ff="https://api2.livecodes.io/share",hf={getProject:async e=>{try{let t=await fetch(mf+e+".txt");return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{try{let t=await fetch(ML,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return t.ok?(await t.text()).replace(mf,""):""}catch{return""}}},UL={getProject:async e=>{if(e.length<11)return hf.getProject(e);if(!Ss())return{};try{let t=await fetch(ff+"?id="+e);return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{if(!Ss())return"";try{let t=await fetch(ff,{method:"POST",mode:"cors",body:JSON.stringify(e)});return t.ok?t.text():""}catch{return""}}},gf=Ss()?UL:hf;var _f={getTypeUrls:async e=>{let t={};if(e.length>0&&Ss())try{t=await(await fetch("https://api.livecodes.io/types",{method:"POST",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({types:e})})).json()}catch{}return t}};var yf=e=>new Promise(t=>{let s="compiler-frame";document.getElementById(s)?.remove();let n=document.createElement("iframe");n.name="compiler",n.id=s,n.style.width="0",n.style.height="0",n.style.visibility="hidden",n.style.position="absolute",n.setAttribute("sandbox","allow-same-origin allow-scripts"),n.src=e,document.body.appendChild(n),n.onload=()=>{t(n.contentWindow)}});var AL=/(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g,PL=/(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g,ts=e=>[...vr(e).matchAll(new RegExp(AL)),...vr(e).matchAll(new RegExp(PL))].map(t=>t[2].replace(/"/g,"").replace(/'/g,"")),OL=e=>!e.startsWith("https://deno.bundlejs.com/")&&!e.startsWith("https://edge.bundlejs.com/")&&!e.endsWith("#nobundle")&&(e.startsWith("https://deno.land/")||e.startsWith("https://github.com/")||e.startsWith("https://raw.githubusercontent.com/")||e.startsWith("https://gitlab.com/")||e.startsWith("https://bitbucket.org")||e.endsWith(".ts")||e.endsWith(".jsx")||e.endsWith(".tsx")),qL=e=>!e.startsWith("https://")&&!e.startsWith("http://")&&!e.startsWith(".")&&!e.startsWith("/")&&!e.startsWith("data:")&&!e.startsWith("blob:"),qn=(e,t)=>ts(e).map(s=>{if(!OL(s)&&!qL(s))return{};{let r=Object.keys(t.imports).find(n=>n===s||s.startsWith(n+"/"));return r?{[r]:t.imports[r]}:{[s]:Xe.getModuleUrl(s,{defaultCDN:t?.customSettings?.defaultCDN})}}}).reduce((s,r)=>({...s,...r}),{}),Er=e=>ts(e).length>0,RL=e=>new RegExp(/(^export\s)|([\s|;]export\s)/).test(so(e)),IL=e=>new RegExp(/(^await\s)|([\s|;]await\s)/).test(so(e)),vf=e=>Er(e)||RL(e)||IL(e);var HL=/(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g,bf=e=>new RegExp(HL).test(e);var wf=e=>{let t=vr(e);if(!/\b(require|module|exports)\b/.test(t))return e;let s=/(?:^|\s)require(?:\s*)\((?:\s*)('(.*?)'|"(.*?)")(?:\s*)\)/g,n=(l=>[...l.matchAll(new RegExp(s))].map(c=>c[1].replace(/"/g,"").replace(/'/g,"")))(t);if(n.length===0)return e;let i=n.map((l,c)=>[`import * as __requires_${c} from '${l}';`,`const __requires_${c}_default = __requires_${c}.default;`].join(`
`)).join(`
`),o=`const __requires_lookup = { ${n.map((l,c)=>`'${l}': __requires_${c}_default || __requires_${c}`).join(", ")} };`;return[i,o,"window.require = window.require || ((id) => {\n	if (id in __requires_lookup) return __requires_lookup[id];\n	throw new Error(`Cannot require modules dynamically (${id})`);\n});","const exports = {}; const module = { exports };",e,"export default module.exports;"].join(`

`)},Eo=(e,t,s={},r="css")=>{let n=ts(e),i=r==="css"?[r]:["css",r];return[...i.map(a=>"./style."+a),...i.map(a=>"./styles."+a),...i.map(a=>"./style.module."+a),...i.map(a=>"./styles.module."+a)].map(a=>{if(!n.includes(a))return{};if(!a.includes(".module."))return{[a]:"data:text/javascript;base64,"+btoa(`export default \`${gs(t)}\`;`)};let l=`export default ${gs(JSON.stringify(s))};
`+Object.keys(s).filter(c=>c===Kp(c)).map(c=>`export const ${gs(c)} = "${gs(s[c])}";`).join(`
`);return{[a]:"data:text/javascript;base64,"+btoa(l)}}).reduce((a,l)=>({...a,...l}),{})};var Dt=e=>typeof e=="string"?{code:e,info:{}}:e;var xf=async({config:e,baseUrl:t,eventsManager:s})=>{let r,n,i=es.getOrigin(),o=3,a=async()=>new Promise(async f=>{r=Cn([...we,...Ye],e,t);let u=es.getCompilerUrl();n=await yf(u+"?appCDN="+ys()),s.addEventListener(window,"message",async b=>{b.origin===i&&b.data.type==="init-success"&&f("done")});let m={type:"init",payload:e,baseUrl:t,scriptUrl:t+"compiler-utils.d69d232f65ff2eafd6b24b03569ab205.js"};n.postMessage(m,i)}),l=f=>(u,{config:m,options:b})=>new Promise((S,v)=>{let y=C=>{let k=C.data;C.origin===i&&k.from==="compiler"&&(k.type==="compiled"||k.type==="compile-failed")&&k.payload.language===f&&k.payload.content===u&&(window.removeEventListener("message",y),k.type==="compiled"?S(k.payload.compiled):k.type==="compile-failed"&&v(f+` compile failed.
`+k.payload.error))};window.addEventListener("message",y);let h={type:"compile",payload:{content:u,language:f,config:m,options:b}};n.postMessage(h,i)}),c=(f,u)=>Promise.allSettled(f.map(m=>new Promise(async(b,S)=>{["jsx","tsx"].includes(m)&&(m="typescript");let v=r[m];if(v&&!v.fn){s.addEventListener(window,"message",async h=>{h.origin===i&&h.data.from==="compiler"&&h.data.type==="loaded"&&h.data.payload===m?(v.fn=l(m),b("done")):h.origin===i&&h.data.from==="compiler"&&h.data.type==="load-failed"&&h.data.payload===m&&(o===0?S(`Failed to load compiler for: ${m}.`):(o-=1,await a(),await c(Array.from(new Set([...f,u.markup.language,u.style.language,u.script.language])),u),b("done")))});let y={type:"load",payload:{language:m,config:u}};n.postMessage(y,i)}else b("done")}))),p={},d=async(f,u,m,b)=>{["jsx","tsx"].includes(u)&&(u="typescript");let S=Ud(u,m),v=_r(go(u,m));if(!b?.forceCompile&&p[u]?.content===f&&p[u]?.processors===S&&p[u]?.languageSettings===v&&p[u]?.compiled)return{code:p[u]?.compiled||"",info:JSON.parse(p[u]?.info||"{}")};r[u]&&!r[u].fn&&await c([u],m);let y=r[u]?.fn;if(typeof y!="function")return new Promise(A=>{u!=="html"&&u!=="css"&&u!=="javascript"&&console.error("Failed to load compiler for: "+u),A({code:"",info:{}})});let h=Dt(await y(f,{config:m,language:u,baseUrl:t,options:b}))||"",C=Dt(await g(h.code,{config:m,language:u,baseUrl:t,options:b}))||"",k={...h.info,...C.info};return p[u]={content:f,compiled:C.code,info:JSON.stringify(k),processors:S,languageSettings:_r(go(u,m))},{code:C.code,info:k}},g=async(f,{config:u,language:m,baseUrl:b,options:S})=>{let v=f,y={},h=!1,C=ae(m)||"markup";C==="style"&&bf(v)&&(h=!0);for(let k of Ye)if(ws(k.name,u)&&ho(k.name,u)&&k.editor===C||C==="style"&&k.name==="postcss")if(k.isPostcssPlugin)h=!0;else{if(k.name==="postcss"&&!h)continue;r[k.name]&&!r[k.name].fn&&await c([k.name],u);let A=r[k.name].fn||(async xe=>xe);if(typeof A!="function")return console.error("Failed to load processor: "+k.name),{code:v,info:y};let B=await A(v,{config:u,language:m,baseUrl:b,options:S}),Me=Dt(B);v=Me.code,y={...y,...Me.info}}return{code:v,info:y}},_=()=>{Object.keys(p).forEach(f=>delete p[f])};return await a(),{load:c,compile:d,clearCache:_}};var Sf=e=>{let t=e.config.mode;return t==="codeblock"||t==="editor"?BL():xf(e)};async function BL(){return{load:(e,t)=>Promise.resolve(["do nothing"]),compile:(e,t,s)=>Promise.resolve(Dt(e)),clearCache:()=>{}}}var Lf={name:"clojurescript",title:"CLJS (cherry)",longTitle:"ClojureScript (cherry)",formatter:{factory:xs},compiler:{url:Ln+"lib/cherry.umd.js",factory:()=>async(e,{config:t,options:s})=>{let r=self.CherryCljs.compileString(e);return e.includes("#jsx")?xr(r,"jsx",t,s):r},imports:{"cherry-cljs":Ln+"index.js","cherry-cljs/cljs.core.js":Ln+"cljs.core.js"}},extensions:["cljs","clj","cljc","edn","clojure"],editor:"script",editorLanguage:"clojure"};var we=[Rd,Nd,$d,Tm,Fd,Ad,qd,Hm,mm,dm,Vm,hm,um,fm,km,Bm,Gm,Rm,qm,Od,zd,Wd,Dd,Jd,zm,Id,Vd,Wm,Pd,Jm,Hd,Bd,Sm,Lm,Kd,Xd,Gd,Yd,lm,cm,wm,Cm,Qd,Zd,Nm,Om,Im,_m,ym,vm,tm,pm,Dm,sm,gm,rm,jm,Um,nm,im,Fm,$m,Mm,am,om,Lf,Am,em,bm,xm,Pm,Em];var Ef=(e,t,s,r,n,i)=>{let o=["markup","style","script"],a=document.createElement("ul");document.querySelector("#select-editor")?.appendChild(a);let l=o.length;o.forEach(c=>{let p=document.createElement("li");p.id=c+"-selector",p.classList.add("editor-title","noselect"),p.dataset.editor=c,p.tabIndex=1,p.innerHTML=`
      <span></span>
      <a
        href="javascript:void(0)"
        onclick="event.stopPropagation();"
        tabIndex="1"
        class="language-menu-button hint--bottom"
        data-hint="Change Language"
      >
        <img
          width="20"
          height="20"
          src="${t}assets/images/down_arrow.svg"
        />
      </a>
    `,a.appendChild(p);let d=document.createElement("div");d.classList.add("menu-scroller"),d.classList.add("menu-scroller-"+c),p.appendChild(d);let g=document.createElement("ul");g.classList.add("dropdown-menu"),g.classList.add("dropdown-menu-"+c),d.appendChild(g);let _=[...we].filter(m=>m.editor===c).filter(m=>Ze(m.name,e));if(_.length===0)p.classList.add("hidden"),l-=1;else if(_.length===1){let m=p.querySelector(".language-menu-button");m&&(m.style.display="none")}let u=Ye.filter(m=>m.editor===c&&ws(m.name,e)).length>0?{name:c+"-processors",title:"Processors:",longTitle:"Processors:",editor:c}:void 0;u&&_.push(u),_.forEach(m=>{let b=document.createElement("li");b.classList.add("language-item"),g.appendChild(b);let S=document.createElement("a");if(S.href="#",S.dataset.editor=c,S.dataset.lang=m.name,S.title=m.longTitle||m.title,S.innerHTML=m.longTitle||m.title,"extensions"in m||S.classList.add("subtitle"),m.name==="style-processors"&&b.classList.add("column-break"),b.appendChild(S),m.info!==!1){let v=document.createElement("span");v.classList.add("tooltip","hint--bottom-left"),v.dataset.hint="Click for info...",v.innerHTML=NL,s.addEventListener(v,"mousedown",async()=>{let y=document.createElement("div");y.classList.add("language-info"),y.innerHTML=await DL(m.name,t),r(y);let h=y.querySelector("a[data-template]"),C=h?.dataset.template;h&&C&&s.addEventListener(h,"click",async B=>{B.preventDefault(),n(C)},!1);let k=y.querySelector("a[data-code]"),A=k?.dataset.code;k&&A&&s.addEventListener(k,"click",async B=>{B.preventDefault(),i({url:A})},!1)},!1),b.appendChild(v)}})}),l<3&&document.querySelectorAll(".editor-title").forEach(c=>{c.classList.add("half-width")})},kf=e=>{let t=document.createElement("li");return t.classList.add("language-item","processor-item"),t.innerHTML=`
        <label class="switch">
          <span>${e.title}</span>
          <div>
            <input id="${e.name}" type="checkbox" data-processor="${e.name}" />
            <span class="slider round"></span>
          </div>
        </label>
        `,t},DL=async(e,t)=>{let s=await import(t+"language-info.9e9ef85f4593622bc49aa47fa20b5061.js").then(o=>o.languageInfo);return new DOMParser().parseFromString(s,"text/html").querySelector(`[data-lang="${e}"]`)?.innerHTML||""},NL=`<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 496.158 496.158" style="enable-background:new 0 0 496.158 496.158;" xml:space="preserve">
<path style="fill:#5a6074da;" d="M496.158,248.085c0-137.022-111.069-248.082-248.075-248.082C111.07,0.003,0,111.063,0,248.085
	c0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.158,385.086,496.158,248.085z"/>
<g>
	<path style="fill:#FFFFFF;" d="M315.249,359.555c-1.387-2.032-4.048-2.755-6.27-1.702c-24.582,11.637-52.482,23.94-57.958,25.015
		c-0.138-0.123-0.357-0.348-0.644-0.737c-0.742-1.005-1.103-2.318-1.103-4.015c0-13.905,10.495-56.205,31.192-125.719
		c17.451-58.406,19.469-70.499,19.469-74.514c0-6.198-2.373-11.435-6.865-15.146c-4.267-3.519-10.229-5.302-17.719-5.302
		c-12.459,0-26.899,4.73-44.146,14.461c-16.713,9.433-35.352,25.41-55.396,47.487c-1.569,1.729-1.733,4.314-0.395,6.228
		c1.34,1.915,3.825,2.644,5.986,1.764c7.037-2.872,42.402-17.359,47.557-20.597c4.221-2.646,7.875-3.989,10.861-3.989
		c0.107,0,0.199,0.004,0.276,0.01c0.036,0.198,0.07,0.5,0.07,0.933c0,3.047-0.627,6.654-1.856,10.703
		c-30.136,97.641-44.785,157.498-44.785,182.994c0,8.998,2.501,16.242,7.432,21.528c5.025,5.393,11.803,8.127,20.146,8.127
		c8.891,0,19.712-3.714,33.08-11.354c12.936-7.392,32.68-23.653,60.363-49.717C316.337,364.326,316.636,361.587,315.249,359.555z"/>
	<path style="fill:#FFFFFF;" d="M314.282,76.672c-4.925-5.041-11.227-7.597-18.729-7.597c-9.34,0-17.475,3.691-24.176,10.971
		c-6.594,7.16-9.938,15.946-9.938,26.113c0,8.033,2.463,14.69,7.32,19.785c4.922,5.172,11.139,7.794,18.476,7.794
		c8.958,0,17.049-3.898,24.047-11.586c6.876-7.553,10.363-16.433,10.363-26.393C321.646,88.105,319.169,81.684,314.282,76.672z"/>
</g>
</svg>`;var Tf=[{id:"normalize.css",name:"Normalize.css",url:sd},{id:"reset-css",name:"CSS reset",url:ad}];var Cf=e=>{let t=e.value,s=e.language;return{getValue:()=>t,setValue:(r="")=>{t=r},getLanguage:()=>s,setLanguage:(r,n)=>{s=r,n&&(t=n)},getEditorId:()=>ae(s)||"markup",focus:()=>{},getPosition:()=>({lineNumber:1,column:1}),setPosition:()=>{},onContentChanged:()=>{},addKeyBinding:()=>{},keyCodes:{CtrlEnter:"",ShiftEnter:"",Enter:"",UpArrow:"",DownArrow:"",ShiftAltF:""},changeSettings:()=>{},registerFormatter:()=>{},format:async()=>{},isReadonly:!0,setTheme:()=>{},undo:()=>{},redo:()=>{},destroy:()=>{},isFake:!0}};var ko=[{id:"anonymous-pro",name:"Anonymous Pro",url:fu},{id:"cascadia-code",name:"Cascadia Code",url:hu},{id:"comic-mono",name:"Code New Roman",url:gu},{id:"comic-mono",name:"Comic Mono",url:_u},{id:"courier-prime",name:"Courier Prime",url:yu},{id:"dec-terminal-modern",name:"DEC Terminal Modern",url:vu},{id:"dejavu-mono",name:"DejaVu Mono",url:bu},{id:"fantasque-sans-mono",name:"TypoPRO Fantasque Sans Mono",label:"Fantasque Sans Mono",url:wu},{id:"fira-code",name:"Fira Code",url:xu},{id:"fixedsys",name:"Fixedsys 62",label:"Fixedsys",url:Su},{id:"hack",name:"Hack",url:Lu},{id:"hermit",name:"Hermit",url:Eu},{id:"ibm-plex-mono",name:"IBM Plex Mono",url:ku},{id:"inconsolata",name:"Inconsolata",url:Tu},{id:"iosevka",name:"Iosevka",url:Cu},{id:"jetbrains-mono",name:"JetBrains Mono",url:ju},{id:"menlo",name:"Menlo",url:Mu},{id:"monofur",name:"Monofur",url:Uu},{id:"monoid",name:"TypoPRO Monoid",label:"Monoid",url:Au},{id:"noto-sans-mono",name:"Noto Sans Mono",url:Pu},{id:"nova-mono",name:"Nova Mono",url:Ou},{id:"opendyslexic",name:"OpenDyslexic",url:qu},{id:"profontwindows",name:"ProFontWindows",label:"ProFont",url:Ru},{id:"roboto-mono",name:"Roboto Mono",url:Iu},{id:"sf-mono",name:"SF Mono",url:Hu},{id:"source-code-pro",name:"Source Code Pro",url:Bu},{id:"space-mono",name:"Space Mono",url:Du},{id:"sudo-var",name:"Sudo Var",url:Nu},{id:"ubuntu-mono",name:"Ubuntu Mono",url:$u},{id:"victor-mono",name:"Victor Mono",url:Fu}],Et=e=>{let t='Consolas, "Roboto Mono", "Ubuntu Mono", ui-monospace, monospace';if(!e)return t;let s=ko.find(r=>[r.id,r.name,r.label].includes(e))?.name;return s?`"${s}", ${t}`:t};var $L=e=>e==="codemirror"?"codemirror.f07ed45d348e9ab10adffdb20b13c5f0.js":e==="codejar"?"codejar.82342f3f4543f632519e31bcde034d68.js":"monaco.40c520b263bbf75297f34bd9e5b7c64a.js",FL=async(e,t)=>{let{baseUrl:s}=t,r=$L(e),n=s+r,i=window[n];i||(i=await import(n),window[n]=i);let o=i.createEditor;return await o(t)},zL=e=>{let{editor:t,mode:s,editorId:r}=e;return(s==="result"&&r!=="console"&&r!=="compiled"?"fake":["codemirror","monaco","codejar"].includes(t||"")?t:s==="codeblock"?"codejar":Xt()?"codemirror":"monaco")||"monaco"},WL=e=>{let t={...e,readOnly:!0},s={...e,readOnly:!0},r={...e,lineNumbers:!1},n={...e,lineNumbers:!1,readOnly:!0},i=e.editorId;return i==="console"?r:i==="compiled"?s:i==="embed"?n:e.mode==="codeblock"?t:e},jf=e=>{if(!e)return;let t=ko.find(s=>[s.id,s.name,s.label].includes(e));t&&_s(t.url,"font-"+t.id)},et=async e=>{if(!e)throw new Error;let t=WL(e),s=zL(t);if(s==="fake")return Cf(t);t.fontFamily&&jf(t.fontFamily);let r=await FL(s,t),n=r.changeSettings;return r.changeSettings=i=>(i.fontFamily&&jf(i.fontFamily),n(i)),r};var Mf=e=>{e.data.type==="customEditorCommand"&&(e.data.payload==="fork"&&window.dispatchEvent(new KeyboardEvent("keydown",{keyCode:83,shiftKey:!0,ctrlKey:!navigator.platform.match("Mac"),metaKey:!!navigator.platform.match("Mac")})),e.data.payload==="save"&&window.dispatchEvent(new KeyboardEvent("keydown",{keyCode:83,ctrlKey:!navigator.platform.match("Mac"),metaKey:!!navigator.platform.match("Mac")})))},Rn=(e,t)=>{e?t.addEventListener(window,"message",Mf):t.removeEventListener(window,"message",Mf)};var Uf=({baseUrl:e,eventsManager:t})=>{let s,r=async()=>{if(s)return;let n=document.querySelector("#script"),i=document.createElement("div");i.id="blockly",i.classList.add("custom-editor"),i.innerHTML='<span class="loading-custom-editor">Loading blockly editor...</span>',n.appendChild(i),s=await import(e+"blockly.f35daf5dcf76eed1e1dc620505f3a483.js")};return{language:"blockly",show:async(n,i)=>{!s&&n&&await r();let o=document.querySelector("#blockly");if(!n||i.editors.script.getLanguage()!=="blockly"){o&&(o.style.display="none");return}o&&(o.style.display="unset"),await s.showBlockly(i),Rn(n,t)},getContent:async n=>(await r(),s.getBlocklyContent(n)),setTheme:n=>{s?.setBlocklyTheme(n)}}};var Af=({baseUrl:e,eventsManager:t})=>{let s,r=async()=>{if(s)return;let n=document.querySelector("#markup"),i=document.createElement("div");i.id="quillEditor",i.classList.add("custom-editor"),i.innerHTML='<span class="loading-custom-editor">Loading rich text editor...</span>',n.appendChild(i),s=await import(e+"quill.2468c2596d64cb46ee06d87d3b865bf6.js")};return{language:"richtext",show:async(n,i)=>{!s&&n&&await r();let o=document.querySelector("#quillEditor");if(!n||i.editors.markup.getLanguage()!=="richtext"){o&&(o.style.display="none");return}o&&(o.style.display="unset"),await s.showQuillEditor(i),Rn(n,t)},getContent:async n=>(await r(),s.getQuillEditorContent(n)),setTheme:n=>{s?.setQuillEditorTheme(n)}}};var Pf=e=>({blockly:Uf(e),richtext:Af(e)});var Of=e=>{let t=new Worker(e+"format.worker.39bb6fcd4622534764f5b2f3be01eb6a.js?appCDN="+ys()),s={type:"init",baseUrl:e};return t.postMessage(s),{load:async o=>new Promise((a,l)=>{let c=d=>{let g=d.data;(g.type==="loaded"||g.type==="load-failed")&&g.payload===o&&(t.removeEventListener("message",c),g.type==="loaded"?a("loaded formatter for: "+o.join(", ")):g.type==="load-failed"&&l("failed loading formatter for: "+o.join(", ")))};t.addEventListener("message",c);let p={type:"load",payload:o};t.postMessage(p)}),getFormatFn:async o=>(l,c,p={})=>new Promise((d,g)=>{let _=u=>{let m=u.data;(m.type==="formatted"||m.type==="format-failed")&&m.payload.language===o&&m.payload.value===l&&m.payload.cursorOffset===c&&(t.removeEventListener("message",_),m.type==="formatted"?d({formatted:m.payload.formatted,cursorOffset:m.payload.formattedCursorOffset}):m.type==="format-failed"&&g({language:o,formatted:l,cursorOffset:c}))};t.addEventListener("message",_);let f={type:"format",payload:{language:o,value:l,cursorOffset:c,formatterConfig:p}};t.postMessage(f)}),destroy:()=>{t.terminate()}}};var qf=(e,t,s)=>{let{readonly:r,mode:n}=e;return r||n==="codeblock"||n==="result"||s?GL():Of(t)};function GL(){return{load:e=>Promise.resolve("do nothing"),getFormatFn:e=>Promise.resolve((t,s)=>Promise.resolve({formatted:t,cursorOffset:s})),destroy:()=>{}}}function JL(e,t,s){if(s)return t?t(e()):e();try{var r=Promise.resolve(e());return t?r.then(t):r}catch(n){return Promise.reject(n)}}function VL(e){var t=e();if(t&&t.then)return t.then(KL)}function KL(){}function XL(e,t,s){return s?t?t(e):e:((!e||!e.then)&&(e=Promise.resolve(e)),t?e.then(t):e)}var In={left:[],center:[],right:[]},To={left:!0,center:!0,right:!0},YL={light:{backgroundColor:"#fff",textColor:"#000",actionColor:"#008000"},dark:{}},kt=function(t,s){var r=this;s===void 0&&(s={});var n=s.timeout;n===void 0&&(n=0);var i=s.actions;i===void 0&&(i=[{text:"dismiss",callback:function(){return r.destroy()}}]);var o=s.position;o===void 0&&(o="center");var a=s.theme;a===void 0&&(a="dark");var l=s.maxStack;l===void 0&&(l=3),this.message=t,this.options={timeout:n,actions:i,position:o,maxStack:l,theme:typeof a=="string"?YL[a]:a},this.wrapper=this.getWrapper(this.options.position),this.insert(),In[this.options.position].push(this),this.stack()},Rf={theme:{configurable:!0}};Rf.theme.get=function(){return this.options.theme};kt.prototype.getWrapper=function(t){var s=document.querySelector(".snackbars-"+t);return s||(s=document.createElement("div"),s.className="snackbars snackbars-"+t,document.body.appendChild(s)),s};kt.prototype.insert=function(){var t=this,s=document.createElement("div");s.className="snackbar",s.setAttribute("aria-live","assertive"),s.setAttribute("aria-atomic","true"),s.setAttribute("aria-hidden","false");var r=this.theme,n=r.backgroundColor,i=r.textColor,o=r.boxShadow,a=r.actionColor,l=document.createElement("div");l.className="snackbar--container",n&&(l.style.backgroundColor=n),i&&(l.style.color=i),o&&(l.style.boxShadow=o),s.appendChild(l);var c=document.createElement("div");if(c.className="snackbar--text",typeof this.message=="string"?c.textContent=this.message:c.appendChild(this.message),l.appendChild(c),this.options.actions)for(var p=function(){var _=g[d],f=_.style,u=_.text,m=_.callback,b=document.createElement("button");b.className="snackbar--button",b.innerHTML=u,a&&(b.style.color=a),f&&Object.keys(f).forEach(function(S){b.style[S]=f[S]}),b.addEventListener("click",function(){t.stopTimer(),m?m(b,t):t.destroy()}),l.appendChild(b)},d=0,g=t.options.actions;d<g.length;d+=1)p();this.startTimer(),s.addEventListener("mouseenter",function(){t.expand()}),s.addEventListener("mouseleave",function(){t.stack()}),this.el=s,this.wrapper.appendChild(s)};kt.prototype.stack=function(){var t=this;To[this.options.position]=!0;var s=In[this.options.position],r=s.length-1;s.forEach(function(n,i){n.startTimer();var o=n.el;if(o){o.style.transform="translate3d(0, -"+(r-i)*15+"px, -"+(r-i)+"px) scale("+(1-.05*(r-i))+")";var a=r-i>=t.options.maxStack;t.toggleVisibility(o,a)}})};kt.prototype.expand=function(){var t=this;To[this.options.position]=!1;var s=In[this.options.position],r=s.length-1;s.forEach(function(n,i){n.stopTimer();var o=n.el;if(o){o.style.transform="translate3d(0, -"+(r-i)*o.clientHeight+"px, 0) scale(1)";var a=r-i>=t.options.maxStack;t.toggleVisibility(o,a)}})};kt.prototype.toggleVisibility=function(t,s){s?(this.visibilityTimeoutId=window.setTimeout(function(){t.style.visibility="hidden"},300),t.style.opacity="0"):(this.visibilityTimeoutId&&(clearTimeout(this.visibilityTimeoutId),this.visibilityTimeoutId=void 0),t.style.opacity="1",t.style.visibility="visible")};kt.prototype.destroy=function(){var t=this;return JL(function(){var s=t.el,r=t.wrapper;return VL(function(){if(s)return s.setAttribute("aria-hidden","true"),XL(new Promise(function(n){var i=QL(s);i?s.addEventListener(i,function(){return n()}):n()}),function(){r.removeChild(s);for(var n=In[t.options.position],i=void 0,o=0;o<n.length;o++)if(n[o].el===s){i=o;break}i!==void 0&&n.splice(i,1),To[t.options.position]?t.stack():t.expand()})})})};kt.prototype.startTimer=function(){var t=this;this.options.timeout&&!this.timeoutId&&(this.timeoutId=self.setTimeout(function(){return t.destroy()},this.options.timeout))};kt.prototype.stopTimer=function(){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)};Object.defineProperties(kt.prototype,Rf);function QL(e){for(var t={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"Animationend",WebkitAnimation:"webkitAnimationEnd"},s=0,r=Object.keys(t);s<r.length;s+=1){var n=r[s];if(e.style[n]!==void 0)return t[n]}}function Ks(e,t){return new kt(e,t)}var If={minWidth:"2em",padding:"3px"};var Hf={textColor:"#343A40",actionColor:"#343A40",backgroundColor:"#fff"},Bf={textColor:"#055160",actionColor:"#055160",backgroundColor:"#CFF4FC"},Df={textColor:"#0F5132",actionColor:"#0F5132",backgroundColor:"#D1E7DD"},Nf={textColor:"#664D16",actionColor:"#664D16",backgroundColor:"#FFF3CD"},$f={textColor:"#842040",actionColor:"#842040",backgroundColor:"#F8D7DA"},Xs={text:'<span title="Dismiss">\u2716</span>',style:If,callback(e,t){t.destroy()}},Ff={text:'<span title="Confirm">\u2713</span>',style:If,callback(e,t){t.destroy()}};var zf=()=>({info:(o,a=!0)=>Ks(o,{theme:Bf,actions:a?[Xs]:[],timeout:2e3}),success:(o,a=!0)=>Ks("\u2713 "+o,{theme:Df,actions:a?[Xs]:[],timeout:2e3}),warning:(o,a=!0)=>Ks(o,{theme:Nf,actions:a?[Xs]:[],timeout:2e3}),error:(o,a=!0)=>Ks("\u2716 "+o,{theme:$f,actions:a?[Xs]:[],timeout:2e3}),confirm:(o,a,l)=>{let c={...Ff,callback(d,g){a(),g.destroy()}},p={...Xs,callback(d,g){l?.(),g.destroy()}};return Ks(o,{theme:Hf,actions:[c,p]})}});var Wf=()=>{let e=document.querySelector("#overlay"),t=document.querySelector("#modal-container"),s=document.querySelector("#modal"),r,n=()=>{},i=(c,{size:p="large",closeButton:d=!1,isAsync:g=!1,onClose:_=()=>{},scrollToSelector:f=""}={})=>{if(s.innerHTML="",s.className=p,s.appendChild(c),n=_,f&&setTimeout(()=>{let m=c.querySelector(f);c.style.scrollBehavior="smooth",m&&m.scrollIntoView()},500),d){let m=document.createElement("div");m.className="close-container";let b=document.createElement("button");b.classList.add("button"),b.innerHTML="Close",b.onclick=o,m.appendChild(b),s.appendChild(m)}let u=document.createElement("div");u.classList.add("close-button"),u.title="Esc",u.onclick=o,s.appendChild(u),e.style.display="flex",t.style.display="flex",s.style.display="flex",e.classList.remove("hidden"),t.classList.remove("hidden"),r=!0,document.removeEventListener("click",a),document.removeEventListener("keydown",l),document.addEventListener("click",a,!1),document.addEventListener("keydown",l,!1),g&&c.click()},o=()=>{typeof n=="function"&&n(),document.removeEventListener("click",a),document.removeEventListener("keydown",l),s.innerHTML="",s.className="",e.classList.add("hidden"),t.classList.add("hidden"),s.style.display="none",setTimeout(()=>{e.style.display="none",t.style.display="none",r=!1},400)};function a(c){let p=document.querySelector(".snackbar");!s?.contains(c.target)&&!p?.contains(c.target)&&!r&&o(),r=!1}let l=c=>{c.key==="Escape"&&!window.watchingEscape&&(o(),c.preventDefault())};return{show:i,close:o}};var Gf=`<!DOCTYPE html>
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
`;var Jf=`<!DOCTYPE html>\r
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
`;var Vf=`<ul id="settings-menu" class="dropdown-menu">\r
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
`;var Kf=`<section data-lang="art-template">\r
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
`;var Xf=`<div id="custom-settings-container" class="modal-container">
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
`;var Yf=`<div id="test-editor-container" class="modal-container">
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
`;var Qf=`<div id="import-container" class="modal-container">
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
`;var Zf=`<div id="deploy-container" class="modal-container">
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
`;var eh=`<div id="sync-container" class="modal-container">
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
`;var th=`<div id="backup-container" class="modal-container">
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
`;var sh=`<div id="broadcast-container" class="modal-container">
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
`;var rh=`<div id="welcome-container" class="modal-container">\r
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
`;var nh=`<div id="about-container" class="modal-container">\r
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
`;var ih=`<div id="info-container" class="modal-container">
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
`;var oh=`<div id="resources-container" class="modal-container">
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
`;var ah=`<div id="login-screen" class="modal-container">\r
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
`;var lh=`<div id="prompt-screen">
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
`;var ch=`<div id="prompt-recover-screen">
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
`;var ph=`<div id="templates-container" class="modal-container">
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
`;var uh=`<div id="list-container" class="list-container">
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
`;var dh=`<div id="assets-list-container" class="list-container">
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
`;var mh=`<div id="add-asset-container" class="modal-container">
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
`;var fh=`<div id="snippets-list-container" class="list-container">
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
`;var hh=`<div id="add-snippet-container" class="modal-container">
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
`;var gh=`<div id="share-screen" class="modal-container">\r
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
`;var _h=`<div id="embed-container" class="modal-container">
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
`;var yh=`<div id="editor-settings-container" class="modal-container">
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
`;var vh=`<!DOCTYPE html>
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
`;var re=e=>e.replace(/{{APP_VERSION}}/g,"4").replace(/{{SDK_VERSION}}/g,"0.0.2").replace(/{{COMMIT_SHA}}/g,"fe430fb").replace(/{{REPO_URL}}/g,"https://github.com/live-codes/livecodes").replace(/{{DOCS_BASE_URL}}/g,"/livecodes/docs/"),bh=re(Gf),C4=re(Jf),wh=re(Vf),j4=re(Kf),xh=re(Xf),Sh=re(Yf),M4=re(Qf),U4=re(Zf),A4=re(eh),P4=re(th),O4=re(sh),Lh=re(rh),Eh=re(nh),kh=re(ih),q4=re(oh),Th=re(ah),Ch=re(lh),jh=re(ch),Mh=re(ph),TE=re(uh),R4=re(dh),I4=re(mh),H4=re(fh),B4=re(hh),D4=re(gh),N4=re(_h),$4=re(yh),Uh=re(vh);var Ah=e=>{let t=e.title,s="json",r="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,2));to(t,s,r)};var Tt=(e,t)=>{let s=r=>r.replace(/{{ __livecodes_baseUrl__ }}/g,Js(t)).replace(/{{ __CDN_URL__ }}/g,Xe.getUrl("~").replace("~",""));return typeof e=="string"?s(e):{...e,url:s(e.url)}},CE=async e=>(await import(e+"templates.ba84017649b6a8db4e5f4844cb167368.js")).starterTemplates,Co=async(e,t)=>(await CE(t)).filter(s=>{let r=e.languages?.map(Q).filter(Boolean);if(!r||s.title==="Blank Project")return!0;let n=[s.markup?.language,s.style?.language,s.script?.language];for(let i of n){let o=Q(i);if(!o||!r.includes(o))return!1}return!0}).map(s=>({...s,markup:{...s.markup,language:s.markup?.language||"html",content:Tt(s.markup?.content||"",t),...s.markup?.contentUrl?{contentUrl:Tt(s.markup?.contentUrl||"",t)}:{}},style:{...s.style,language:s.style?.language||"css",content:Tt(s.style?.content||"",t),...s.style?.contentUrl?{contentUrl:Tt(s.style?.contentUrl||"",t)}:{}},script:{...s.script,language:s.script?.language||"javascript",content:Tt(s.script?.content||"",t),...s.script?.contentUrl?{contentUrl:Tt(s.script?.contentUrl||"",t)}:{}},imports:gr(s.imports||{},r=>Tt(r||"",t)),types:gr(s.types||{},r=>Tt(r||"",t)),stylesheets:s.stylesheets?.map(r=>Tt(r||"",t)),scripts:s.scripts?.map(r=>Tt(r||"",t))})),Ph=async(e,t,s)=>(await Co(t,s)).filter(r=>r.name.toLowerCase()===e.toLowerCase())[0];var X={title:"Untitled Project",description:"",tags:[],autoupdate:!0,autosave:!1,delay:1500,formatOnsave:!1,mode:"full",theme:"dark",recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{},tests:{language:"typescript",content:""},tools:{enabled:"all",active:"",status:""},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,semicolons:!0,singleQuote:!1,trailingComma:!0,emmet:!0,editorMode:void 0,version:"4"};var Ys=e=>{if(!e)return{...X};let t=Ls(e),s={...X,...t,...t.mode==="result"&&t.tools==null?{tools:{enabled:[],active:"",status:"none"}}:{}},r=Hn(),{version:n,...i}=Ls(ME(s,r));s={...s,...i};let o=s.activeEditor||"markup";return s=jE({...s,activeEditor:o}),s},jE=e=>({...e,markup:{...e.markup,language:Q(e.markup.language)||X.markup.language},style:{...e.style,language:Q(e.style.language)||X.style.language},script:{...e.script,language:Q(e.script.language)||X.script.language},...e.tests?.language?{tests:{...e.tests,language:Q(e.tests.language)||X.tests?.language||"typescript"}}:{}}),Hn=(e=parent.location.search)=>{let t=Object.fromEntries(new URLSearchParams(e));return Object.keys(t).forEach(s=>{try{t[s]=decodeURIComponent(t[s])}catch{}t[s]===""&&(t[s]=!0),t[s]==="true"&&(t[s]=!0),t[s]==="false"&&(t[s]=!1)}),t},ME=(e,t)=>{let s=[...Object.keys(X)].filter(d=>d!=="version").reduce((d,g)=>({...d,[g]:t[g]}),{});Object.keys(t).forEach(d=>{let g=Q(d);if(!g)return;let _=ae(g);if(_&&!s[_]){let f=t[d],u=typeof f=="string"?Wp(decodeURIComponent(f)):"";s[_]={language:g,content:u},s.activeEditor||(s.activeEditor=_)}});let r=Q(t.language||t.lang),n=ae(r);n&&(s[n]?.language===r?s.activeEditor=n:!s[n]?.content&&e[n]?.language===r?(s[n]={...e[n]},s.activeEditor=n):e[n]?.content||(s[n]={language:r,content:""},s.activeEditor=n));let i=["markup","style","script"],o=t.activeEditor,a=t.active;s.activeEditor=i.includes(o)?o:o in i?i[o]:i.includes(a)?a:a in i?i[a]:s.activeEditor,typeof t.languages=="string"&&(s.languages=t.languages.split(",").map(d=>d.trim()).map(Q).filter(Boolean)),typeof t.processors=="string"&&(s.processors=t.processors.split(",").map(d=>d.trim()).filter(Boolean)),typeof t.tags=="string"&&(s.tags=t.tags.split(",").map(d=>d.trim()).filter(Boolean)),typeof t.stylesheets=="string"&&(s.stylesheets=t.stylesheets.split(",").map(d=>d.trim()).filter(Boolean)),typeof t.scripts=="string"&&(s.scripts=t.scripts.split(",").map(d=>d.trim()).filter(Boolean));let l=["console","compiled","tests"],c=!t.tools&&l.map(d=>t[d]).filter(Boolean).length===0;if(t.tools==="none"||t.tools===!1||t.mode==="editor"||t.mode==="codeblock"||t.mode==="result"&&c)s.tools={enabled:[],active:"",status:"none"};else if(!c){s.tools=Yt(X.tools);let d,[g,_]=t.tools?.split("|")||["",""],f=g.split(",").map(m=>m.trim()).filter(m=>l.includes(m));f.length>0&&(s.tools.enabled=f,s.tools.active=f[0]),Object.keys(t).filter(m=>l.includes(m)).forEach(m=>{s.tools&&(t[m]===!0&&(t[m]="open"),t[m]===!1&&(t[m]="none"),!d&&["open","full","closed"].includes(t[m])&&(s.tools.enabled!=="all"&&!s.tools.enabled.includes(m)&&s.tools.enabled.push(m),s.tools.active=m,s.tools.status=t[m],d=s.tools.status),t[m]==="none"&&(s.tools.enabled==="all"&&(s.tools.enabled=[...l]),s.tools.enabled=s.tools.enabled.filter(b=>b!==m),s.tools.active===m&&(s.tools.active=s.tools.enabled[0])))}),["open","full","closed"].includes(t.tools)?s.tools.status=t.tools:["open","full","closed"].includes(_)?s.tools.status=_:!s.tools?.status&&["editor","codeblock","result"].includes(s.mode||"")?s.tools={enabled:[],active:"",status:"none"}:s.tools.status||(s.tools.status="closed")}return s};var UE=[{to:"0.6.0",upgrade:(e,t)=>{let s=Qs(e);return s.processors&&"postcss"in s.processors&&(s.processors=Object.keys(s.processors.postcss).filter(r=>s.processors.postcss[r])),{...s,version:t}}},{to:"0.5.0",upgrade:(e,t)=>{let s=Qs(e);return"editor"in s&&s.editor==="prism"&&(s.editor="codejar"),"compiled"in s&&(s.tools=s.tools||Qs(X.tools),s.tools.active="compiled",s.tools.status=s.compiled,delete s.compiled),"console"in s&&(s.tools=s.tools||Qs(X.tools),s.tools.active="console",s.tools.status=s.console,delete s.console),s.script?.language==="graph"&&(s.script.language="diagrams"),s.languages?.includes("graph")&&(s.languages=s.languages.map(r=>r==="graph"?"diagrams":r)),"enableRestore"in s&&(s.recoverUnsaved=s.enableRestore,delete s.enableRestore),{...s,version:t}}},{to:"0.4.0",upgrade:(e,t)=>{let s=Qs(e);if(s=Oh(s,"update_delay","delay"),s=Oh(s,"allow_lang_change","allowLangChange"),"autoprefixer"in s&&(s.processors=Qs(X.processors),s.processors.postcss=s.processors.postcss||{},s.processors.postcss.autoprefixer=s.autoprefixer,delete s.autoprefixer),"baseUrl"in s&&delete s.baseUrl,"cssPreset"in s&&s.cssPreset===null&&(s.cssPreset=""),"editor"in s&&typeof s.editor!="string"&&(s.editor=void 0),"language"in s&&(s.activeEditor=ae(s.language),delete s.language),"modules"in s){let r={...s.modules.reduce((i,o)=>({...i,...o.url?{[o.name]:o.url}:{}}),{})};Object.keys(r).length>0&&(s.imports=r);let n={...s.modules.reduce((i,o)=>({...i,...o.typesUrl?{[o.name]:o.typesUrl}:{}}),{})};Object.keys(n).length>0&&(s.types=n),delete s.modules}return{...s,version:t}}}],qh=e=>{let t=AE(e.version)?e.version:"0.0.0",s=X.version;return jo({version:s,comparedTo:t})?(console.warn(`Unsupported config version '${t}'. Current LiveCodes version is '${s}'`),e):t===s?e:{...UE.sort((r,n)=>jo({version:r.to,comparedTo:n.to})?-1:1).reduce((r,n)=>jo({version:r.version,comparedTo:n.to})?n.upgrade(r,n.to):r,e),version:s}},AE=e=>{if(typeof e!="string")return!1;let t=e.split(".");return!(t.length!==3||t.map(s=>Number(s)).filter(isNaN).length!==0)},jo=({version:e,comparedTo:t})=>{if(!e)return!0;let s=e.split(".").map(n=>Number(n)),r=t.split(".").map(n=>Number(n));for(let n in s)if(s[n]<r[n])return!0;return!1},Qs=e=>JSON.parse(JSON.stringify(e)),Oh=(e,t,s)=>{let{[t]:r,...n}={...e,...t in e?{[s]:e[t]}:{}};return n};var Rh=e=>{let t=(u,m,b)=>m==="array"?Array.isArray(u)?b?u.filter(S=>t(S,b)).length>0:!0:!1:m==="object"?u&&typeof u===m:m==="number"&&!isNaN(Number(u))?!0:typeof u===m,s=(u,m)=>m!=null&&u.includes(m),r=["full","editor","codeblock","result"],n=["light","dark"],i=["vim","emacs"],o=["console","compiled","tests"],a=["","full","closed","open","none"],l=["monaco","codemirror","codejar"],c=["markup","style","script"],p=[1,.5,.25],d=u=>t(u,"object")&&(t(u.language,"string")||t(u.content,"string")||t(u.contentUrl,"string")),g=(u,m)=>({language:ae(u.language)===m?Q(u.language)||X[m].language:X[m].language,...t(u.content,"string")?{content:u.content}:{},...t(u.contentUrl,"string")?{contentUrl:u.contentUrl}:{},...t(u.selector,"string")?{selector:u.selector}:{}}),_=u=>({...u&&t(u.language,"string")?{language:u.language}:{},...u&&t(u.content,"string")?{content:u.content}:{},...u&&t(u.contentUrl,"string")?{contentUrl:u.contentUrl}:{},...u&&t(u.selector,"string")?{selector:u.selector}:{}}),f=u=>({...X.tools,...u&&Array.isArray(u.enabled)?{enabled:u.enabled.filter(m=>o.includes(m))}:{...u&&u.enabled==null&&u.status==="none"?{enabled:[]}:{enabled:X.tools.enabled}},...u&&u.active!=null&&s(o,u.active)&&(typeof u.enabled=="string"||u.enabled==null||Array.isArray(u.enabled)&&s(u.enabled,u.active))?{active:u.active}:{active:X.tools.active},...u&&u.status!=null&&s(a,u.status)?{status:u.status}:{status:X.tools.status}});return{...t(e.title,"string")?{title:e.title}:{},...t(e.description,"string")?{description:e.description}:{},...t(e.tags,"array","string")?{tags:Qt(e.tags)}:{},...t(e.autoupdate,"boolean")?{autoupdate:e.autoupdate}:{},...t(e.autosave,"boolean")?{autosave:e.autosave}:{},...t(e.delay,"number")?{delay:Number(e.delay)}:{},...t(e.formatOnsave,"boolean")?{formatOnsave:e.formatOnsave}:{},...s(r,e.mode)?{mode:e.mode}:{},...s(n,e.theme)?{theme:e.theme}:{},...t(e.recoverUnsaved,"boolean")?{recoverUnsaved:e.recoverUnsaved}:{},...t(e.welcome,"boolean")?{welcome:e.welcome}:{},...t(e.showSpacing,"boolean")?{showSpacing:e.showSpacing}:{},...t(e.readonly,"boolean")?{readonly:e.readonly}:{},...t(e.allowLangChange,"boolean")?{allowLangChange:e.allowLangChange}:{},...s(c,e.activeEditor)?{activeEditor:e.activeEditor}:{},...t(e.languages,"array","string")?{languages:Qt(e.languages)}:{},...d(e.markup)?{markup:g(e.markup,"markup")}:{},...d(e.style)?{style:g(e.style,"style")}:{},...d(e.script)?{script:g(e.script,"script")}:{},...t(e.tools,"object")?{tools:f(e.tools)}:{},...t(e.tests,"object")?{tests:_(e.tests)}:{},...s(p,Number(e.zoom))?{zoom:Number(e.zoom)}:{},...t(e.stylesheets,"array","string")?{stylesheets:Qt(e.stylesheets)}:{},...t(e.scripts,"array","string")?{scripts:Qt(e.scripts)}:{},...t(e.cssPreset,"string")?{cssPreset:e.cssPreset}:{},...t(e.processors,"array","string")?{processors:Qt(e.processors)}:{},...t(e.customSettings,"object")?{customSettings:e.customSettings}:{},...s(l,e.editor)?{editor:e.editor}:{},...t(e.fontFamily,"string")?{fontFamily:e.fontFamily}:{},...t(e.fontSize,"number")?{fontSize:Number(e.fontSize)}:{},...t(e.useTabs,"boolean")?{useTabs:e.useTabs}:{},...t(e.tabSize,"number")?{tabSize:Number(e.tabSize)}:{},...t(e.lineNumbers,"boolean")?{lineNumbers:e.lineNumbers}:{},...t(e.wordWrap,"boolean")?{wordWrap:e.wordWrap}:{},...t(e.closeBrackets,"boolean")?{closeBrackets:e.closeBrackets}:{},...t(e.semicolons,"boolean")?{semicolons:e.semicolons}:{},...t(e.singleQuote,"boolean")?{singleQuote:e.singleQuote}:{},...t(e.trailingComma,"boolean")?{trailingComma:e.trailingComma}:{},...t(e.emmet,"boolean")?{emmet:e.emmet}:{},...s(i,e.editorMode)?{editorMode:e.editorMode}:{},...t(e.imports,"object")?{imports:e.imports}:{},...t(e.types,"object")?{types:e.types}:{},...t(e.version,"string")?{version:e.version}:{}}};var Ih=X,x=()=>Yt(Ih),me=e=>{Ih=Yt(e)},Ie=e=>Yt({title:e.title,description:e.description,tags:e.tags,activeEditor:e.activeEditor,languages:e.languages,markup:e.markup,style:e.style,script:e.script,stylesheets:e.stylesheets,scripts:e.scripts,cssPreset:e.cssPreset,processors:e.processors,customSettings:e.customSettings,imports:e.imports,types:e.types,tests:e.tests,version:e.version}),Zs=e=>({autoupdate:e.autoupdate,autosave:e.autosave,delay:e.delay,formatOnsave:e.formatOnsave,recoverUnsaved:e.recoverUnsaved,welcome:e.welcome,showSpacing:e.showSpacing,theme:e.theme,...it(e),...Es(e)}),it=e=>({editor:e.editor??(e.readonly===!0?"codejar":void 0),fontFamily:e.fontFamily,fontSize:e.fontSize,useTabs:e.useTabs,tabSize:e.tabSize,lineNumbers:e.lineNumbers,wordWrap:e.wordWrap,closeBrackets:e.closeBrackets,emmet:e.emmet,editorMode:e.editorMode}),Es=e=>({useTabs:e.useTabs,tabSize:e.tabSize,semicolons:e.semicolons,singleQuote:e.singleQuote,trailingComma:e.trailingComma}),Ls=e=>Rh(qh(e));var Mo=(e,t)=>{if(e.length===0)return{};if(Object.keys(t).some(Q))return Object.keys(t).reduce((l,c)=>{let p=Q(c);if(!p)return l;let d=e.find(_=>_?.filename===t[c]);if(!d)return l;let g=ae(p);return!g||l[g]?l:{...l,[g]:{language:p,content:d.content}}},{});let r=e.map(l=>{let c=l.filename.split(".")[l.filename.split(".").length-1],p=l.language||Q(c)||"html",d=l.editorId||ae(p)||"markup";return{...l,language:p,editorId:d}}).sort((l,c)=>{if(l.editorId===c.editorId&&(l.editorId==="markup"&&l.filename.toLowerCase().startsWith("index.")||l.editorId==="style"&&l.filename.toLowerCase().startsWith("style.")||l.editorId==="script"&&l.filename.toLowerCase().startsWith("script.")))return-1;if(l.editorId===c.editorId&&(c.editorId==="markup"&&c.filename.toLowerCase().startsWith("index.")||c.editorId==="style"&&c.filename.toLowerCase().startsWith("style.")||c.editorId==="script"&&c.filename.toLowerCase().startsWith("script.")))return 1;if(l.editorId===c.editorId&&l.editorId==="markup"){if(l.filename.toLowerCase().startsWith("readme"))return 1;if(c.filename.toLowerCase().startsWith("readme"))return-1}return l.language===c.language?l.filename.localeCompare(c.filename):we.findIndex(p=>p.name===l.language)-we.findIndex(p=>p.name===c.language)}).reduce((l,c)=>c.filename.toLowerCase().match(new RegExp(".(test|spec)\\.[jt]sx?"))?l.tests?.content?l:{...l,tests:{language:c.language,content:c.content}}:!c.editorId||l[c.editorId]?l:{...l,[c.editorId]:{language:c.language,content:c.content}},{}),n=[],i=e.find(l=>l.filename==="styles");if(i?.content)try{let l=[];new DOMParser().parseFromString(i.content,"text/html").querySelectorAll('link[rel="stylesheet"]').forEach(d=>{l.push(d.href)}),l.length===0&&i.content.trim().split(`
`).forEach(d=>{l.push(d)}),l.forEach(d=>{try{n.push(new URL(d).href)}catch{}})}catch{}let o=[],a=e.find(l=>l.filename==="scripts");if(a?.content)try{let l=[];new DOMParser().parseFromString(a.content,"text/html").querySelectorAll("script").forEach(d=>{l.push(d.src)}),l.length===0&&a.content.trim().split(`
`).forEach(d=>{l.push(d)}),l.forEach(d=>{try{o.push(new URL(d).href)}catch{}})}catch{}return{...r,stylesheets:n,scripts:o}},Bn={github:/^(?:(?:http|https):\/\/)?github.com\/(?:.*)/g,githubGist:/^(?:(?:http|https):\/\/)?gist.github.com(?:\/\S*)?\/(\w+)/g,gitlab:/^(?:(?:http|https):\/\/)?gitlab.com\/(?:.*)/g,codepen:/^(?:(?:http|https):\/\/)?codepen.io\/(\w+)\/pen\/(\w+)/g,jsbin:/^(?:(?:(?:http|https):\/\/)?(?:\w+.)?)?jsbin.com\/((\w)+(\/\d)?)(?:.*)/g};var Hh=(e,t=new RegExp(Bn.github))=>{if(t.test(e))try{let r=OE(e).pathname.split("/");return r[3]==="tree"||r.length===3}catch{return}},OE=e=>e.startsWith("https://")?new URL(e):new URL("https://"+e);var qE=(e,t=new RegExp(Bn.github))=>{if(t.test(e))try{return RE(e).pathname.split("/")[3]==="blob"}catch{return}},Bh=e=>Hh(e)||qE(e),RE=e=>e.startsWith("https://")?new URL(e):new URL("https://"+e);var Dh=()=>{let e={},t=async n=>{let i="",o=Object.keys(n)[0],a=Object.values(n)[0],l=typeof a=="string"?a:a.url,c=typeof a=="string"||a.declareAsModule===!0;if(l)try{let d=await(await fetch(l)).text();i=c?`declare module '${o}' {${d}}`:d}catch{i=`declare module '${o}': any`}return e={...e,...n},{filename:`file:///node_modules/${o}/index.d.ts`,content:i}},s=n=>Promise.all(Object.keys(n).map(i=>t({[i]:n[i]})));return{load:async(n,i,o=!1)=>{let l=ts(n).reduce((g,_)=>{let f,u=Object.keys(e).find(b=>_===b)||Object.keys(e).find(b=>_.startsWith(b+"/"))&&!Object.keys(i).find(b=>_===b),m=Object.keys(i).find(b=>_===b)||Object.keys(i).find(b=>_.startsWith(b+"/"));return u&&!o?f={}:m?f={[m]:i[m]}:f={[_]:""},{...g,...f}},{}),c=Object.keys(l).filter(g=>l[g]===""),p=await _f.getTypeUrls(c),d=Jp(i,(g,_)=>(!Object.keys(e).includes(_)||o)&&typeof g!="string"&&g.autoload===!0);return s({...l,...p,...d})}}};var Nh={"@testing-library/dom":P+"@testing-library/dom.js","@testing-library/jest-dom":P+"@testing-library/jest-dom.js","@testing-library/react":P+"@testing-library/react.js",chai:au};var $h=async({code:e,config:t,forExport:s,template:r,baseUrl:n,singleFile:i,runTests:o,compileInfo:a})=>{let l=Js(n),p=new DOMParser().parseFromString(r,"text/html");if(s)p.querySelector("script")?.remove();else{let v=p.createElement("script");v.src=l+"result-utils.a838b33c947a1f0351fea5c7aafbba54.js",p.head.appendChild(v)}if(p.title=t.title,t.customSettings.htmlClasses&&p.documentElement.classList.add(...t.customSettings.htmlClasses.split(" ")),t.customSettings.head&&(p.head.innerHTML+=t.customSettings.head),t.cssPreset){let v=Tf.find(y=>y.id===t.cssPreset)?.url;if(v){let y=p.createElement("link");y.rel="stylesheet",y.id="__livecodes__css-preset",y.href=Js(v,l),p.head.appendChild(y)}}if(t.stylesheets.forEach(v=>{let y=p.createElement("link");y.rel="stylesheet",y.href=v,p.head.appendChild(y)}),i){let v=e.style.compiled,y=p.createElement("style");y.id="__livecodes_styles__",y.innerHTML=v,p.head.appendChild(y)}else{let v=p.createElement("link");v.rel="stylesheet",v.href="./style.css",p.head.appendChild(v)}let d=e.markup.compiled;p.body.innerHTML+=d,e.script.language==="blockly"&&p.querySelectorAll('script[type="blockly/script"], script[data-type="blockly/script"], xml[type="blockly/xml"], xml[data-type="blockly/xml"]').forEach(y=>y.remove());let g=["markup","style","script"].map(v=>({language:e[v].language,compiled:e[v].compiled})),_=o&&e.tests?.compiled||"",f=ts(d).includes("./script")||o&&!s&&ts(_).includes("./script"),u={};for(let{language:v,compiled:y}of g){let h=Qe(v);if(!h)continue;if((typeof h.styles=="function"?h.styles({compiled:y,baseUrl:l,config:t}):h.styles||[]).forEach(A=>{let B=p.createElement("link");B.rel="stylesheet",B.href=Gs(A)?l+A:A,p.head.appendChild(B)}),(typeof h.scripts=="function"?h.scripts({compiled:y,baseUrl:l,config:t}):h.scripts||[]).forEach(A=>{let B=p.createElement("script");B.src=Gs(A)?l+A:A,h.deferScripts&&(B.defer=!0),A.includes("-script-esm.")&&(B.type="module"),p.head.appendChild(B)}),h.inlineScript){typeof h.inlineScript=="function"&&(h.inlineScript=await h.inlineScript({baseUrl:n}));let A=document.createElement("script");A.innerHTML=h.inlineScript,p.head.appendChild(A)}h.imports&&(u={...u,...gr(h.imports,A=>Js(A,n))})}let m=Pe(e.style.language),S={...t.customSettings.mapImports===!1?{}:{...Er(e.script.compiled)?qn(e.script.compiled,t):{},...Er(e.markup.compiled)?qn(e.markup.compiled,t):{},...o&&!s&&Er(_)?qn(_,t):{},...f?{"./script":"data:text/javascript;base64,"+btoa(e.script.compiled)}:{},...Eo(e.script.compiled,e.style.compiled,a.cssModules,m),...Eo(e.markup.compiled,e.style.compiled,a.cssModules,m)},...u,...o?Nh:{},...t.imports,...t.customSettings.imports};if(Object.keys(S).length>0){let v=p.createElement("script");v.src=Xe.getUrl(du,ys()),v.async=!0,p.head.appendChild(v);let y=p.createElement("script");y.type="importmap",y.innerHTML=`{"imports": ${JSON.stringify(S,null,2)}}`,p.head.appendChild(y)}if(t.scripts.forEach(v=>{let y=p.createElement("script");y.src=v,p.head.appendChild(y)}),!f){let v=e.script.compiled,y=p.createElement("script");i?y.innerHTML=Zi(v):y.src="./script.js",p.body.appendChild(y);let h=Qe(e.script.language)?.scriptType;h?y.type=h:t.customSettings.scriptType!=null?t.customSettings.scriptType&&(y.type=t.customSettings.scriptType):vf(v)&&(y.type="module")}if(t.showSpacing&&!s){let v=p.createElement("script");v.src=cd,p.body.appendChild(v)}if(o&&!s){let v=p.createElement("script");v.src=Gu,p.body.appendChild(v);let y=p.createElement("script");y.type="module",y.innerHTML=`
const {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  describe: { only: fdescribe, skip: xdescribe },
  it,
  test,
  test: { only: fit, skip: xtest, skip: xit },
  expect,
  jest } = window.jestLite.core;

${Zi(_)}

window.jestLite.core.run().then(results => {
  parent.postMessage({type: 'testResults', payload: {results}}, '*');
}).catch((error) => {
  parent.postMessage({type: 'testResults', payload: {error: error.message || String(error)}}, '*');
});
    `,p.body.appendChild(y)}return`<!DOCTYPE html>
`+p.documentElement.outerHTML};var Fh=()=>document.querySelector("#toolbar"),ks=()=>document.querySelector("#project-title"),zh=()=>document.querySelector("#editor-container"),Wh=()=>document.querySelector("#editors"),Gh=()=>document.querySelector("#markup"),Jh=()=>document.querySelector("#style"),Vh=()=>document.querySelector("#script"),Kh=()=>document.querySelector("#output"),ss=()=>document.querySelector("#result"),Ts=()=>document.querySelector("#result > iframe"),Uo=()=>document.querySelector("#editor-container .gutter"),Ao=()=>document.querySelector("#logo a"),Po=()=>document.querySelector("#run-button"),Oo=()=>document.querySelector("#code-run-button"),Dn=()=>document.querySelector("#editor-tools"),Xh=()=>document.querySelector("#editor-tools #copy-btn"),Yh=()=>document.querySelector("#editor-tools #undo-btn"),Qh=()=>document.querySelector("#editor-tools #redo-btn"),kr=()=>document.querySelector("#editor-tools #format-btn"),Zh=()=>document.querySelector("#editor-mode"),eg=()=>document.querySelector("#editor-tools #editor-status"),qo=()=>document.querySelector("#editor-tools #external-resources-btn");var tg=()=>document.querySelector("#result-button"),sg=()=>document.querySelector("#fullscreen-button"),Ro=()=>document.querySelectorAll(".editor-title:not(.hidden)"),rg=()=>document.querySelectorAll("#editors > .editor"),er=()=>document.querySelector("#output #tools-pane"),ng=()=>document.querySelector("#output #tools-pane-bar"),Nn=()=>document.querySelector("#tools-pane-buttons"),$n=()=>document.querySelector("#tools-pane-titles"),ig=()=>document.querySelector("#tools-pane-loading"),og=()=>document.querySelector("#zoom-button #zoom-value"),ag=()=>document.querySelector("#modal #prompt-save-btn"),lg=()=>document.querySelector("#modal #prompt-donot-save-btn"),cg=()=>document.querySelector("#modal #prompt-cancel-btn"),pg=()=>document.querySelector("#modal #prompt-recover-btn"),ug=()=>document.querySelector("#modal #prompt-save-previous-btn"),dg=()=>document.querySelector("#modal #prompt-cancel-recover-btn"),Io=()=>document.querySelector("#modal #unsaved-project-name"),mg=()=>document.querySelector("#modal #unsaved-project-last-modified"),fg=()=>document.querySelector("#modal #disable-recover-checkbox"),hg=()=>document.querySelectorAll("#select-editor .language-item a"),gg=()=>document.querySelectorAll("#select-editor .language-menu-button"),_g=()=>document.querySelector("#style-selector .dropdown-menu"),yg=()=>document.querySelectorAll("#settings-menu input");var vg=()=>document.querySelector("#settings-menu-container"),bg=()=>document.querySelector("#settings-button"),wg=()=>document.querySelector("#export-menu #export-json"),xg=()=>document.querySelector("#export-menu #export-result"),Sg=()=>document.querySelector("#export-menu #export-src"),Lg=()=>document.querySelector("#export-menu #export-githubGist"),Eg=()=>document.querySelector("#export-menu #export-codepen"),kg=()=>document.querySelector("#export-menu #export-jsfiddle"),Tr=()=>document.querySelector("#login-link"),Cr=()=>document.querySelector("#logout-link"),Tg=()=>document.querySelector("#new-link"),Cg=()=>document.querySelector("#open-link"),jg=()=>document.querySelector("#save-link"),Mg=()=>document.querySelector("#fork-link"),Ug=()=>document.querySelector("#template-link"),Ag=()=>document.querySelector("#external-resources-link"),Pg=()=>document.querySelector("#custom-settings-link"),Og=()=>document.querySelector("#share-link"),qg=()=>document.querySelector("#embed-link"),Rg=()=>document.querySelector("#editor-settings-link"),Ig=()=>document.querySelector("#deploy-link"),Hg=()=>document.querySelector("#sync-link");var Bg=()=>document.querySelector("#import-link"),Dg=()=>document.querySelector("#backup-link"),Ng=()=>document.querySelector("#broadcast-link"),$g=()=>document.querySelector("#welcome-link"),Fg=()=>document.querySelector("#about-link"),zg=()=>document.querySelector("#settings-menu input#autoupdate"),Ho=()=>document.querySelector("#settings-menu #delay-value"),Bo=()=>document.querySelector("#settings-menu input#delay-range"),Wg=()=>document.querySelector("#settings-menu input#autosave"),Gg=()=>document.querySelector("#settings-menu input#autosync"),Jg=()=>document.querySelector("#settings-menu input#formatOnsave"),Vg=()=>document.querySelectorAll("#style-selector input");var Kg=()=>document.querySelector("#settings-menu input#theme"),Xg=()=>document.querySelector("#settings-menu input#welcome"),Yg=()=>document.querySelector("#settings-menu input#recover-unsaved"),Qg=()=>document.querySelector("#settings-menu input#show-spacing"),Zg=()=>document.querySelectorAll("#css-preset-menu a"),e_=()=>document.querySelector("#settings-menu #info-link"),t_=()=>document.querySelector("#settings-menu #assets-link"),s_=()=>document.querySelector("#settings-menu #snippets-link"),r_=()=>document.querySelector("#info-container input#title-input"),n_=()=>document.querySelector("#info-container #description-textarea"),i_=()=>document.querySelector("#info-container input#tags-input"),o_=()=>document.querySelector("#info-container #info-save-btn");var a_=()=>document.querySelector("#custom-settings-container #custom-settings-editor"),l_=()=>document.querySelector("#custom-settings-container #custom-settings-load-btn"),c_=()=>document.querySelector("#test-editor-container #test-editor"),p_=()=>document.querySelector("#test-editor-container #test-load-btn"),u_=()=>document.querySelector("#test-container #edit-tests-btn"),d_=()=>document.querySelector("#test-container #run-tests-btn"),Fn=()=>document.querySelector("#test-container #watch-tests-btn");var m_=e=>e.querySelector('#templates-tabs [data-target="templates-starter"]'),f_=e=>e.querySelector("#starter-templates-list"),h_=e=>e.querySelector("#templates-user .modal-screen");var g_=()=>document.querySelector("#broadcast-status-btn");var __=e=>e.querySelector("#welcome-link-new"),y_=e=>e.querySelector("#welcome-link-open"),v_=e=>e.querySelector("#welcome-link-import"),b_=e=>e.querySelector(".default-template-li"),w_=e=>e.querySelector("#no-default-template"),x_=e=>e.querySelector("#welcome-link-load-default"),S_=e=>e.querySelector("#welcome-link-recent-open"),L_=e=>e.querySelector("#welcome-link-templates"),E_=e=>e.querySelector("#modal #show-welcome-checkbox"),k_=(e=document)=>e.querySelector("#modal #welcome-recover"),T_=e=>e.querySelector("#welcome-screen-container .modal-screen"),C_=e=>e.querySelector("#modal #welcome-recent"),j_=e=>e.querySelector("#modal #welcome-recent-list"),M_=e=>e.querySelector("#modal #welcome-template-list");var jr=Ie(X),U_={...jr,markup:{...jr.markup,compiled:"",modified:""},style:{...jr.style,compiled:"",modified:""},script:{...jr.script,compiled:"",modified:""},tests:{language:"javascript",...jr.tests,compiled:""},result:"",styleOnlyUpdate:!1},ce=U_,ye=()=>({...ce}),Do=(e=U_)=>{ce={...e,markup:{modified:e.markup.compiled===ce.markup.compiled?ce.markup.modified:"",...e.markup},style:{modified:e.style.compiled===ce.style.compiled?ce.style.modified:"",...e.style},script:{modified:e.script.compiled===ce.script.compiled?ce.script.modified:"",...e.script},tests:{language:"javascript",compiled:"",...e.tests},result:e.result||""}},Mr=(e,t,s)=>{ce[e].language===t&&(ce[e].modified=s)},Ur=()=>({markup:{language:ce.markup.language,content:ce.markup.content||"",compiled:ce.markup.modified||ce.markup.compiled||""},style:{language:ce.style.language,content:ce.style.content||"",compiled:ce.style.modified||ce.style.compiled||""},script:{language:ce.script.language,content:ce.script.content||"",compiled:ce.script.modified||ce.script.compiled||""},result:ce.result||""});var Ar=(e,t)=>{let s={...e};return t.forEach(r=>delete s[r]),s},zn=(e,t)=>{let s=["activeEditor","title","description","tests"],r=["compiled","modified"],n={...Ar(e,["result","styleOnlyUpdate",...s]),markup:Ar(e.markup,r),style:Ar(e.style,r),script:Ar(e.script,r)},i=Ar(t,s);return JSON.stringify(n)===JSON.stringify(i)};var A_=e=>{try{return JSON.parse(e).map(t=>t.value)}catch{return e.split(",").map(t=>t.trim())}},P_=async(e,t,s,r,n)=>{let i=document.createElement("div");i.innerHTML=kh;let o=i.firstChild;s.show(o);let a=r_();a.value=e.title,a.focus();let l=n_();l.value=e.description;let c=i_();c.value=Qt(e.tags).join(", "),r.addEventListener(o_(),"click",async()=>{ks().textContent=a.value,n(a.value,l.value,A_(c.value)),s.close()}),_s(kn+"tagify.css","tagify-styles"),await yr(kn+"tagify.min.js","Tagify");let p=window.Tagify;p&&new p(c,{whitelist:Array.from(new Set((await t.getList()).map(d=>d.tags).flat())).sort((d,g)=>g>d?-1:1),dropdown:{maxItems:40,enabled:0,closeOnSelect:!1,highlightFirst:!0}})};var He=(e="Loading...")=>{let t=document.createElement("div");return t.innerHTML=e,t.classList.add("modal-message"),t};var O_=(e,t)=>{let s=document.createElement("div");s.innerHTML=Th;let r=s.firstChild,n=r.querySelector("#public_repo"),i=r.querySelector("#repo"),o=r.querySelector("#gist"),a=r.querySelector("#login-btn");return e.addEventListener(n,"change",()=>{i.checked=n.checked},!1),e.addEventListener(i,"change",()=>{i.checked&&(n.checked=!0)},!1),e.addEventListener(a,"click",()=>{let l=[...n.checked&&!i.checked?[n.value]:[],...i.checked?[i.value]:[],...o.checked?[o.value]:[]];t(l)},!1),r},No=e=>{let t=Tr();t&&(t.style.display="none");let s=Cr();if(s){let r=e.displayName||e.username;s.innerHTML="Log out",s.classList.add("hint--bottom"),s.dataset.hint="Logged in as "+r,s.style.display="block"}},q_=()=>{let e=Tr();e&&(e.style.display="block");let t=Cr();t&&(t.innerHTML="Log out",t.style.display="none")};var R_=(e,t,s,r,n=!1)=>{let i=document.createElement("li");t.appendChild(i);let o=document.createElement("a");o.href="#",o.dataset.id=e.id,o.classList.add("open-project-link");let a=Xt()?new Date(e.lastModified).toLocaleDateString():new Date(e.lastModified).toLocaleString(),l=[];Xt()||e.languages.forEach(S=>{let v=document.createElement("span");v.classList.add("language-tag"),v.dataset.lang=r(S),n?v.classList.add("template-tag"):v.title="filter by language",v.textContent=s(S),l.push(v)});let c=[];e.tags=[...new Set(e.tags)].filter(Boolean),!Xt()&&e.tags.length>0&&e.tags.forEach(S=>{let v=document.createElement("span");v.classList.add("user-tag"),v.dataset.tag=S,n?v.classList.add("template-tag"):v.title="filter by tag",v.textContent=S,c.push(v)});let p=document.createElement("div");p.classList.add("open-title","overflow-text"),p.textContent=e.title,o.appendChild(p);let d=document.createElement("div");d.classList.add("light"),d.textContent="Last modified: "+a,o.appendChild(d);let g=document.createElement("div");g.classList.add("project-tags"),l.forEach(S=>g.append(S)),g.innerHTML+=c.length>0?' <span class="light">|</span> ':"",c.forEach(S=>g.append(S)),o.appendChild(g);let _=document.createElement("div");_.classList.add("template-default");let f=document.createElement("span");f.innerText="Set as default",f.classList.add("template-default-link"),_.appendChild(f);let u=document.createElement("span");u.classList.add("default-template-label"),u.innerText="Default template ",_.appendChild(u);let m=document.createElement("span");m.innerText="(unset)",m.classList.add("template-remove-default-link"),u.appendChild(m),n&&o.appendChild(_),i.appendChild(o);let b=document.createElement("button");return b.classList.add("delete-button"),i.appendChild(b),{link:o,deleteButton:b,setAsDefaultLink:f,removeDefaultLink:m}};var ot=typeof window<"u"?window:null,Fo=ot===null,Or=Fo?void 0:ot.document,gt="addEventListener",_t="removeEventListener",$o="getBoundingClientRect",Pr="_a",yt="_b",Nt="_c",Wn="horizontal",vt=function(){return!1},BE=Fo?"calc":["","-webkit-","-moz-","-o-"].filter(function(e){var t=Or.createElement("div");return t.style.cssText="width:"+e+"calc(9px)",!!t.style.length}).shift()+"calc",H_=function(e){return typeof e=="string"||e instanceof String},I_=function(e){if(H_(e)){var t=Or.querySelector(e);if(!t)throw new Error("Selector "+e+" did not match a DOM element");return t}return e},Be=function(e,t,s){var r=e[t];return r!==void 0?r:s},Gn=function(e,t,s,r){if(t){if(r==="end")return 0;if(r==="center")return e/2}else if(s){if(r==="start")return 0;if(r==="center")return e/2}return e},DE=function(e,t){var s=Or.createElement("div");return s.className="gutter gutter-"+t,s},NE=function(e,t,s){var r={};return H_(t)?r[e]=t:r[e]=BE+"("+t+"% - "+s+"px)",r},$E=function(e,t){var s;return s={},s[e]=t+"px",s},FE=function(e,t){if(t===void 0&&(t={}),Fo)return{};var s=e,r,n,i,o,a,l;Array.from&&(s=Array.from(s));var c=I_(s[0]),p=c.parentNode,d=getComputedStyle?getComputedStyle(p):null,g=d?d.flexDirection:null,_=Be(t,"sizes")||s.map(function(){return 100/s.length}),f=Be(t,"minSize",100),u=Array.isArray(f)?f:s.map(function(){return f}),m=Be(t,"maxSize",1/0),b=Array.isArray(m)?m:s.map(function(){return m}),S=Be(t,"expandToMin",!1),v=Be(t,"gutterSize",10),y=Be(t,"gutterAlign","center"),h=Be(t,"snapOffset",30),C=Array.isArray(h)?h:s.map(function(){return h}),k=Be(t,"dragInterval",1),A=Be(t,"direction",Wn),B=Be(t,"cursor",A===Wn?"col-resize":"row-resize"),Me=Be(t,"gutter",DE),xe=Be(t,"elementStyle",NE),ge=Be(t,"gutterStyle",$E);A===Wn?(r="width",n="clientX",i="left",o="right",a="clientWidth"):A==="vertical"&&(r="height",n="clientY",i="top",o="bottom",a="clientHeight");function K(q,j,U,H){var Ae=xe(r,j,U,H);Object.keys(Ae).forEach(function(_e){q.style[_e]=Ae[_e]})}function ve(q,j,U){var H=ge(r,j,U);Object.keys(H).forEach(function(Ae){q.style[Ae]=H[Ae]})}function O(){return l.map(function(q){return q.size})}function G(q){return"touches"in q?q.touches[0][n]:q[n]}function te(q){var j=l[this.a],U=l[this.b],H=j.size+U.size;j.size=q/this.size*H,U.size=H-q/this.size*H,K(j.element,j.size,this[yt],j.i),K(U.element,U.size,this[Nt],U.i)}function de(q){var j,U=l[this.a],H=l[this.b];this.dragging&&(j=G(q)-this.start+(this[yt]-this.dragOffset),k>1&&(j=Math.round(j/k)*k),j<=U.minSize+U.snapOffset+this[yt]?j=U.minSize+this[yt]:j>=this.size-(H.minSize+H.snapOffset+this[Nt])&&(j=this.size-(H.minSize+this[Nt])),j>=U.maxSize-U.snapOffset+this[yt]?j=U.maxSize+this[yt]:j<=this.size-(H.maxSize-H.snapOffset+this[Nt])&&(j=this.size-(H.maxSize+this[Nt])),te.call(this,j),Be(t,"onDrag",vt)(O()))}function ft(){var q=l[this.a].element,j=l[this.b].element,U=q[$o](),H=j[$o]();this.size=U[r]+H[r]+this[yt]+this[Nt],this.start=U[i],this.end=U[o]}function Lt(q){if(!getComputedStyle)return null;var j=getComputedStyle(q);if(!j)return null;var U=q[a];return U===0?null:(A===Wn?U-=parseFloat(j.paddingLeft)+parseFloat(j.paddingRight):U-=parseFloat(j.paddingTop)+parseFloat(j.paddingBottom),U)}function $e(q){var j=Lt(p);if(j===null||u.reduce(function(_e,Ke){return _e+Ke},0)>j)return q;var U=0,H=[],Ae=q.map(function(_e,Ke){var hs=j*_e/100,xn=Gn(v,Ke===0,Ke===q.length-1,y),Sn=u[Ke]+xn;return hs<Sn?(U+=Sn-hs,H.push(0),Sn):(H.push(hs-Sn),hs)});return U===0?q:Ae.map(function(_e,Ke){var hs=_e;if(U>0&&H[Ke]-U>0){var xn=Math.min(U,H[Ke]-U);U-=xn,hs=_e-xn}return hs/j*100})}function W(){var q=this,j=l[q.a].element,U=l[q.b].element;q.dragging&&Be(t,"onDragEnd",vt)(O()),q.dragging=!1,ot[_t]("mouseup",q.stop),ot[_t]("touchend",q.stop),ot[_t]("touchcancel",q.stop),ot[_t]("mousemove",q.move),ot[_t]("touchmove",q.move),q.stop=null,q.move=null,j[_t]("selectstart",vt),j[_t]("dragstart",vt),U[_t]("selectstart",vt),U[_t]("dragstart",vt),j.style.userSelect="",j.style.webkitUserSelect="",j.style.MozUserSelect="",j.style.pointerEvents="",U.style.userSelect="",U.style.webkitUserSelect="",U.style.MozUserSelect="",U.style.pointerEvents="",q.gutter.style.cursor="",q.parent.style.cursor="",Or.body.style.cursor=""}function be(q){if(!("button"in q&&q.button!==0)){var j=this,U=l[j.a].element,H=l[j.b].element;j.dragging||Be(t,"onDragStart",vt)(O()),q.preventDefault(),j.dragging=!0,j.move=de.bind(j),j.stop=W.bind(j),ot[gt]("mouseup",j.stop),ot[gt]("touchend",j.stop),ot[gt]("touchcancel",j.stop),ot[gt]("mousemove",j.move),ot[gt]("touchmove",j.move),U[gt]("selectstart",vt),U[gt]("dragstart",vt),H[gt]("selectstart",vt),H[gt]("dragstart",vt),U.style.userSelect="none",U.style.webkitUserSelect="none",U.style.MozUserSelect="none",U.style.pointerEvents="none",H.style.userSelect="none",H.style.webkitUserSelect="none",H.style.MozUserSelect="none",H.style.pointerEvents="none",j.gutter.style.cursor=B,j.parent.style.cursor=B,Or.body.style.cursor=B,ft.call(j),j.dragOffset=G(q)-j.end}}_=$e(_);var Ue=[];l=s.map(function(q,j){var U={element:I_(q),size:_[j],minSize:u[j],maxSize:b[j],snapOffset:C[j],i:j},H;if(j>0&&(H={a:j-1,b:j,dragging:!1,direction:A,parent:p},H[yt]=Gn(v,j-1===0,!1,y),H[Nt]=Gn(v,!1,j===s.length-1,y),g==="row-reverse"||g==="column-reverse")){var Ae=H.a;H.a=H.b,H.b=Ae}if(j>0){var _e=Me(j,A,U.element);ve(_e,v,j),H[Pr]=be.bind(H),_e[gt]("mousedown",H[Pr]),_e[gt]("touchstart",H[Pr]),p.insertBefore(_e,U.element),H.gutter=_e}return K(U.element,U.size,Gn(v,j===0,j===s.length-1,y),j),j>0&&Ue.push(H),U});function wn(q){var j=q.i===Ue.length,U=j?Ue[q.i-1]:Ue[q.i];ft.call(U);var H=j?U.size-q.minSize-U[Nt]:q.minSize+U[yt];te.call(U,H)}l.forEach(function(q){var j=q.element[$o]()[r];j<q.minSize&&(S?wn(q):q.minSize=j)});function NS(q){var j=$e(q);j.forEach(function(U,H){if(H>0){var Ae=Ue[H-1],_e=l[Ae.a],Ke=l[Ae.b];_e.size=j[H-1],Ke.size=U,K(_e.element,_e.size,Ae[yt],_e.i),K(Ke.element,Ke.size,Ae[Nt],Ke.i)}})}function $S(q,j){Ue.forEach(function(U){if(j!==!0?U.parent.removeChild(U.gutter):(U.gutter[_t]("mousedown",U[Pr]),U.gutter[_t]("touchstart",U[Pr])),q!==!0){var H=xe(r,U.a.size,U[yt]);Object.keys(H).forEach(function(Ae){l[U.a].element.style[Ae]="",l[U.b].element.style[Ae]=""})}})}return{setSizes:NS,getSizes:O,collapse:function(j){wn(l[j])},destroy:$S,parent:p,pairs:Ue}},Jn=FE;var zo=()=>{let t=!1,s=Jn(["#editors","#output"],{minSize:[0,0],gutterSize:10,elementStyle:(a,l,c)=>(window.dispatchEvent(new Event(nt.resizeEditor)),{"flex-basis":`calc(${l}% - ${c}px)`}),gutterStyle:(a,l)=>({"flex-basis":`${l}px`}),onDragStart(){n(!1)},onDragEnd(){n(!0)}}),r=document.querySelector(".gutter");if(r){let a=document.createElement("div");a.id="handle",r.appendChild(a)}let n=a=>{let l=document.querySelector("#editors"),c=document.querySelector("#output");!c||!l||(a?(l.style.transition="flex-basis 0.5s",c.style.transition="flex-basis 0.5s"):(l.style.transition="none",c.style.transition="none"))},i=(a,l=!1)=>{let c=window.innerWidth<800,p=c||l?[100,0]:[50,50],d=c||l?[0,100]:[50,50];a==="code"&&(s.getSizes()[0]<10||l)?s.setSizes(p):a==="output"&&(s.getSizes()[1]<10||l)&&(s.getSizes()[0]<10?s.setSizes(p):s.setSizes(d))},o=(a,l)=>{t||(s.destroy(a,l),t=!0)};return n(!0),{show:i,destroy:o}};var B_=(e,t)=>{let s=document.createElement("div");s.innerHTML=Mh;let r=s.firstChild,n=r.querySelectorAll("#templates-tabs li");return n.forEach(i=>{e.addEventListener(i,"click",()=>{n.forEach(a=>a.classList.remove("active")),i.classList.add("active"),document.querySelectorAll("#templates-screens > div").forEach(a=>{a.classList.remove("active")}),r.querySelector("#"+i.dataset.target)?.classList.add("active"),i.dataset.target==="templates-user"&&t()})}),r},D_=(e,t,s)=>{let r=document.createElement("li"),n=document.createElement("a");return n.href="?template="+e.name,n.innerHTML=`
<img src="${s+e.thumbnail}" />
<div>${e.title}</div>
`,r.appendChild(n),t?.appendChild(r),n},Wo=`
<div class="modal-message no-data">
  <div>You have no saved templates.</div>
  <div class="description">
    You can save a project as a template from
    <wbr />(App&nbsp;menu&nbsp;>&nbsp;Save&nbsp;as&nbsp;> Template).
  </div>
</div>
`;var N_=(e,t,s,r,n,i)=>{let o,a,l,c=()=>{if(o)return;let u=er(),m=document.createElement("div");m.id="compiled-code-container",u.appendChild(m),o=document.createElement("div"),o.id="compiled-code",m.appendChild(o);let b=Nn();b&&(l=document.createElement("div"),l.id="compiled-code-language-label",l.style.display="none",b.prepend(l))},p=(u=!1)=>{if(a&&!u)return a;let m={baseUrl:t,container:o,language:"javascript",value:"",readonly:!0,mode:e.mode,editorId:"compiled",theme:e.theme,isEmbed:n,mapLanguage:rt,getLanguageExtension:Pe,getFormatterConfig:()=>({}),getFontFamily:Et,...it(e)};return et(m)},d=(u,m)=>{if(u==="javascript"&&window.monaco&&a.monaco){a?.setValue(m+`
export {}`);let b=a.monaco,S=b.getModel()?.getLineCount()||1;b.setHiddenAreas([]),b.setHiddenAreas([new window.monaco.Range(S+1,0,S+2,0)])}},g=(u,m,b)=>{if(a&&(a.setLanguage(u,m),d(u,m),l)){let S=we.find(y=>y.name===b),v=S?.longTitle||S?.title||b||"";l.innerHTML=v}},_=async()=>{c(),a=await p()};return{name:"compiled",title:"Compiled",load:_,onActivate:()=>{l&&(l.style.display="unset")},onDeactivate:()=>{l&&(l.style.display="none")},getEditor:()=>a,update:g,reloadEditor:async u=>{if(e=u,!o){await _();return}a?.destroy(),a=await p(!0)}}};var Lp=zp(iS());var oS=(e,t,s,r,n,i)=>{let o,a,l,c="#result > iframe",p,d=[],g=-1,_=()=>{document.activeElement instanceof HTMLElement&&document.activeElement.blur()},f=h=>{let C=h.substr(1,4);if(["html","head"].includes(C))return h;if(C==="body"){let A=document.createElement(C);return A.innerHTML=h,A}let k=document.createElement("template");return h=h.trim(),k.innerHTML=h,k.content.firstChild},u=h=>h.map(C=>C.type==="element"?f(C.content):C.content),m=()=>o?(o.destroy(),o=new Lp.default(l),o):(o=new Lp.default(l),r.addEventListener(window,"message",h=>{if(!l||h.origin!==es.getOrigin()||h.data.type!=="console")return;let C=h.data;["output","log","error","info","warn","dir","time","timeLog","timeEnd","clear","count","countReset","assert","table","group","groupCollapsed","groupEnd"].includes(C.method)&&o[C.method](...u(C.args))}),o),b=async(h=!1)=>{if(a&&!h)return a;let C=document.querySelector("#console-input");if(!C)throw new Error("Console input container not found");let k={baseUrl:t,container:C,language:"javascript",value:"",readonly:!1,mode:e.mode,editorId:"console",theme:e.theme,isEmbed:n,mapLanguage:rt,getLanguageExtension:Pe,getFormatterConfig:()=>({}),getFontFamily:Et,...it(e)},A=await et(k);A.addKeyBinding("exec",A.keyCodes.Enter,()=>{let K=A.getValue(),ve=document.querySelector(c);o.insert({type:"input",args:[K],ignoreFilter:!0}),ve.contentWindow?.postMessage({console:K},"*"),d.push(K),A.setValue("",!1),g=-1}),A.addKeyBinding("prev",A.keyCodes.UpArrow,()=>{let K=g===-1?d.length:g;g=K===0?0:K-1,A.setValue(d[g])}),A.addKeyBinding("next",A.keyCodes.DownArrow,()=>{let K=g===-1?d.length-1:g;g=K===d.length-1?-1:K+1,A.setValue(d[g]||"")});let B=25;if(C.style.minHeight=B+"px",A.onContentChanged(()=>{if(!A.monaco)return;let K=A.monaco.getContentHeight()<B?B:A.monaco.getContentHeight()*2;C.style.height=K+"px"}),a)return A;new MutationObserver(()=>{let K=l.querySelectorAll(".luna-console-input pre.luna-console-code:not(.visible)");K.length!==0&&K.forEach(ve=>{let O=/(luna-console-)(?!keyword|string|operator|number|json|hidden)/g;ve.innerHTML=ve.innerHTML.replace(O,""),ve.classList.add("visible")})}).observe(l,{subtree:!0,childList:!0});let xe=A.monaco?".glyph-margin":".cm-gutters",ge=document.querySelector("#console-input "+xe);if(ge){let K=document.createElement("div");K.id="console-input-indicator",K.innerHTML='<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: top;"><g><path d="m16.6 10l10 10-10 10-2.3-2.3 7.7-7.7-7.7-7.7z"></path></g></svg>',ge.appendChild(K)}return A},S=()=>{if(l)return;let h=er(),C=document.createElement("div");C.id="console-container",h.appendChild(C),l=document.createElement("div"),l.id="console",C.appendChild(l);let k=document.createElement("div");k.id="console-input",C.appendChild(k);let A=Nn();if(A){let B=document.createElement("span");B.classList.add("hint--top-left"),B.dataset.hint="Clear console",p=document.createElement("button"),p.classList.add("clear-button"),p.style.display="none",r.addEventListener(p,"click",()=>{o.clear()},!1),r.addEventListener(p,"touchstart",()=>{o.clear()},!1),B.appendChild(p),A.prepend(B)}},v=async()=>{S(),o=m(),!(e.readonly||e.mode==="codeblock"||e.mode==="editor")&&(a=await b())};return{name:"console",title:"Console",load:v,onActivate:()=>{!Xt()&&!n&&a?.focus(),p&&(p.style.display="unset")},onDeactivate:()=>{_(),p&&(p.style.display="none")},getEditor:()=>a,reloadEditor:async h=>{if(e=h,!a){await v();return}a?.destroy(),a=await b(!0)},log:(...h)=>o?.log(...h),info:(...h)=>o?.info(...h),table:(...h)=>o?.table(...h),warn:(...h)=>o?.warn(...h),error:(...h)=>o?.error(...h),clear:()=>o?.clear(),evaluate:h=>o?.evaluate(h)}};var aS='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Play</title><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>',lS='<svg xmlns="http://www.w3.org/2000/svg" class="checked" viewBox="0 0 512 512"><title>Checkbox</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 176L217.6 336 160 272"/><rect x="64" y="64" width="384" height="384" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>',cS='<svg xmlns="http://www.w3.org/2000/svg" class="unchecked" viewBox="0 0 512 512"><title>Square</title><path d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>',pS='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Refresh</title><path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 58l80 80-80 80"/></svg>',uS='<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';var dS=(e,t,s,r,n,i)=>{let o,a='<div class="test-summary">Loading tests...</div>',l=()=>{if(o)return;let g=er(),_=document.createElement("div");_.id="test-container",g.appendChild(_);let f=document.createElement("div");f.id="test-actions",f.classList.add("buttons"),f.innerHTML=`
    <a id="run-tests-btn" href="#" class="button hint--top" data-hint="Ctrl/Cmd + Alt + T">
      ${aS} Run
    </a>
    <a id="watch-tests-btn" href="#" class="button disabled hint--top" data-hint="Run tests when code changes">
      ${lS} ${cS} Watch
    </a>
    <a id="reset-tests-btn" href="#" class="button">${pS} Reset</a>
    ${n?"":'<a id="edit-tests-btn" href="#" class="button">'+uS+" Edit</a>"}
    `,_.appendChild(f),o=document.createElement("div"),o.id="test-results",o.classList.add("luna-console"),o.innerHTML=a,_.appendChild(o),r.addEventListener(document.querySelector("#reset-tests-btn"),"click",u=>{u.preventDefault(),c()})},c=()=>{o.querySelectorAll(".test-result").forEach(_=>{_.querySelectorAll(".test-error").forEach(f=>f.remove()),_.classList.contains("pass")&&_.classList.remove("pass"),_.classList.contains("fail")&&_.classList.remove("fail")});let g=o.querySelector(".test-summary");g&&(g.innerText="")};return{name:"tests",title:"Tests",load:async()=>{l()},onActivate:()=>{i()},onDeactivate:()=>{},showResults:({results:g,error:_})=>{if(o||l(),o.innerHTML="",_){o.innerHTML='<div class="no-tests"><span class="fail">Test error!</span></div>';return}if(g.length===0){o.innerHTML='<div class="no-tests">This project has no tests!</div>';return}g.forEach(v=>{let y=document.createElement("div");y.innerText=v.testPath.filter(h=>h!=="ROOT_DESCRIBE_BLOCK").join(" \u203A "),y.classList.add("test-result",v.status),v.errors.map(h=>h.split("at Object.<anonymous>")[0]?.trim()).map(h=>h.startsWith("AssertionError: ")?h.replace("AssertionError: ",""):h).forEach(h=>{let C=document.createElement("pre");C.classList.add("test-error"),C.innerText=h,y.appendChild(C)}),o.appendChild(y)});let f=g.filter(v=>v.status==="pass").length,u=g.filter(v=>v.status==="fail").length,m=g.length,b=g.reduce((v,y)=>v+y.duration,0)/1e3,S=document.createElement("div");S.classList.add("test-summary"),S.innerHTML=`
    Tests: ${u!==0?'<span class="fail">'+u+" failed</span>,":""}
           ${f!==0?'<span class="pass">'+f+" passed</span>,":""}
           ${m} total <br />
    Time: ${b}s
`,o.prepend(S)},resetTests:c,clearTests:()=>{o&&(o.innerHTML=a)}}};var mS=(e,t,s,r,n,i)=>{let o,a,l=0,c=[{name:"console",factory:oS},{name:"compiled",factory:N_},{name:"tests",factory:dS}],p=O=>e.tools.enabled==="all"||e.tools.enabled.includes(O.name),d=c.filter(p),_=((O,G,te,de,ft,Lt)=>d.map($e=>$e.factory(O,G,te,de,ft,Lt)))(e,t,s,r,n,i),f=[..._],u=ss(),m=30,b={closed:[100,0],open:[60,40],full:[0,100],none:[100,0],"":[100,0]},S=O=>{O?u.style.transition="height 0.5s":u.style.transition="none"},v=O=>{O?(o.collapse(1),u.style.minHeight="100%"):u.style.minHeight="unset"},y=O=>{l=O,document.querySelectorAll("#tools-pane-bar .tools-pane-title").forEach((G,te)=>{O===te?G.classList.add("active"):G.classList.remove("active")}),document.querySelectorAll("#tools-pane > div").forEach((G,te)=>{O===te?G.classList.add("active"):G.classList.remove("active")}),f.forEach((G,te)=>{O===te?G.onActivate():G.onDeactivate()})},h=()=>{let O=document.querySelector("#tools-pane-bar #tools-pane-buttons");o.getSizes()[0]>90?O.style.visibility="hidden":O.style.visibility==="hidden"&&(O.style.visibility="visible",f[l]?.onActivate())},C=(O,G=!1)=>{G?(o.collapse(0),a="full"):(o.setSizes(b.open),a="open"),h(),y(O)},k=()=>{o.collapse(1),a="closed",h(),f.forEach(O=>O.onDeactivate())},A=()=>{if(o)return o;o=Jn(["#result","#tools-pane"],{sizes:b.closed,gutterSize:m,direction:"vertical",elementStyle:($e,W,be)=>({height:`calc(${W}% - ${be}px)`}),gutterStyle:($e,W)=>({height:`${W}px`}),onDragStart(){S(!1)},onDragEnd(){S(!0)},onDrag(){h()}});let O=document.querySelector("#output .gutter");O.id="tools-pane-bar";let G=document.createElement("div");G.id="tools-pane-titles",O.appendChild(G),f.forEach(($e,W)=>{let be=document.createElement("div");be.dataset.id=String(W),be.classList.add("tools-pane-title",$e.name),be.innerHTML=$e.title,G.appendChild(be);let Ue;r.addEventListener(be,"click",wn=>{wn.detail===1&&(Ue=setTimeout(()=>{o.getSizes()[0]>90?C(W):be.classList.contains("active")?k():y(W)},200))},!1),r.addEventListener(be,"dblclick",()=>{clearTimeout(Ue),o.getSizes()[0]<10?k():C(W,!0)},!1),r.addEventListener(be,"touchstart",()=>{o.getSizes()[0]>90?C(W):be.classList.contains("active")?k():y(W)},{capture:!1,passive:!0})}),r.addEventListener(window,"resize",()=>{let $e=document.querySelector("#tools-pane");$e&&(o.getSizes()[0]<10?(u.style.height="0",$e.style.height=`calc(100% - ${m}px)`):o.getSizes()[0]>90&&(u.style.height=`calc(100% - ${m}px)`,$e.style.height="0"))},!1);let te=document.createElement("div");te.id="tools-pane-loading",te.style.display="none",O.appendChild(te);let de=document.createElement("div");de.id="tools-pane-buttons",O.appendChild(de);let ft=document.createElement("span");ft.classList.add("hint--top-left"),ft.dataset.hint="Close";let Lt=document.createElement("button");return Lt.classList.add("delete-button"),r.addEventListener(Lt,"click",()=>{k()},!1),r.addEventListener(Lt,"touchstart",()=>{k()},!1),ft.appendChild(Lt),de.appendChild(ft),o},B=O=>{v(O==="none"),O==="closed"?k():O==="full"?C(l,!0):O==="open"&&C(l),a=O,h()},Me=async()=>{let O=a===void 0;l=xe(e.tools.active),a=e.tools.status||"closed",O&&(o=A(),o.setSizes(b[a]),h(),a==="none"&&(ng().style.pointerEvents="none"),f.forEach(async G=>{await G.load()})),y(l)},xe=O=>{let G=f.findIndex(te=>te?.name===O);return G>-1?G:0},ve={load:Me,open:()=>B("open"),close:()=>B("closed"),maximize:()=>B("full"),hide:()=>B("none"),getStatus:()=>a,getActiveTool:()=>f[l]?.name,setActiveTool:O=>y(xe(O)),disableTool:O=>{let G=f.findIndex(de=>de?.name===O);if(G===-1)return;delete f[G],l===G&&y(f.findIndex(de=>de)),O in ve&&delete ve[O];let te=document.querySelector("#tools-pane-titles ."+O);te&&(te.classList.remove("active"),te.style.display="none"),f.filter(de=>de).length===0&&B("none")},enableTool:O=>{let G=_.findIndex(de=>de.name===O);if(G===-1||f.find(de=>de?.name===O))return;f.filter(de=>de).length===0&&(B("closed"),y(G)),ve[O]=_[G],f[G]=_[G];let te=document.querySelector(".tools-pane-title."+O);te&&(te.style.display="flex")},...d.reduce((O,G,te)=>({...O,[G.name]:f[te]}),{})};return ve};var y2={esm:"livecodes.js",umd:"livecodes.umd.js",react:"react.js",vue:"vue.js",types:"index.d.ts"},Bi={getAppUrl:()=>"https://v4.livecodes.io/",getSDKUrl:(e="esm")=>`https://cdn.jsdelivr.net/npm/livecodes@0.0.2/${y2[e]}`};var F=Zm(),E=Xm(),ee=zf(),I=Wf(),je=zo(),hS=Dh(),Tp=[],Ce=Hn(),us={x:0,y:0},R,J,Di,Jt,ds,z,$s,ie,Je,Rt,fS=[],Re,Wi=!0,mr=!1,Ep,Ni,$i=!1,Up=!1,Fi=!1,Ge={isBroadcasting:!1,channel:"",channelUrl:"",channelToken:"",broadcastSource:!1},Wt=null,Ap=(e="markup")=>Rt?.[e],Pp=()=>Object.values(Rt||{}),Vt=()=>z[x().activeEditor||"markup"],v2=async e=>Ki(e.activeEditor),b2=()=>Promise.all([ld,Wu,Yu,Qu].map(e=>_s(e,void 0,"#app-styles"))),gS=(e,t="",s=es)=>new Promise((r,n)=>{if(!e){n("Result container not found");return}let i=Ts();i||(i=document.createElement("iframe"),i.name="result",i.id="result-frame",i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts")),["codeblock","editor"].includes(x().mode)&&(t="");let o=Ap("script")||"javascript",a=Cn(we,x(),R),l=`${x().markup.content}
      ${x().style.content}
      ${x().script.content}
      `,c=i.parentElement===e,p=c&&ye().styleOnlyUpdate,d=c&&a[o]?.liveReload&&fS.includes(o)&&!l.includes("__livecodes_reload__");if(p){let f=new DOMParser().parseFromString(t,"text/html").querySelector("#__livecodes_styles__");if(f){let u=f.innerHTML;i.contentWindow?.postMessage({styles:u},s.getOrigin())}else i.contentWindow?.postMessage({result:t},s.getOrigin());r("loaded")}else if(d)i.contentWindow?.postMessage({result:t},s.getOrigin()),r("loaded");else{let g=!1;E.addEventListener(i,"load",function S(){if(E.removeEventListener(i,"load",S),!t||g){r("loaded");return}i.contentWindow?.postMessage({result:t},s.getOrigin()),g=!0,r("loaded")}),i.remove();let{markup:_,style:f,script:u}=x(),m=`?markup=${_.language}&style=${f.language}&script=${u.language}&isEmbed=${J}&isLoggedIn=${!!Je?.isLoggedIn()}`,b=Ce.scrollPosition===!1||us.x===0&&us.y===0?"":`#livecodes-scroll-position:${us.x},${us.y}`;i.src=s.getResultUrl()+m+b,e.appendChild(i)}fS=Pp()}),Vi=async(e,t)=>{let s=t.script.language;if(e.script&&["typescript","javascript"].includes(rt(s))&&typeof e.script.addTypes=="function"){let r={...Qe(s)?.types,...t.types,...t.customSettings.types};(await hS.load(x().script.content||"",r)).forEach(i=>e.script.addTypes?.(i))}},w2=(e,t)=>{document.querySelectorAll(`.dropdown-menu-${e} .language-item a`).forEach(r=>{r.dataset.lang===t?r.parentElement?.classList.add("active"):r.parentElement?.classList.remove("active")})},zi=(e,t)=>{let s=document.querySelector(`#${e}-selector span`),r=Q(t);!s||!r||(s.innerHTML=we.find(n=>n.name===r)?.title||"",w2(e,r))},x2=()=>{let e=["markup","style","script"],t=`<span><img src="${R}assets/images/copy.svg" alt="copy"></span>`;e.forEach(s=>{let r=document.createElement("div");r.innerHTML=t,r.classList.add("copy-button","tool-buttons"),r.title="Copy",document.getElementById(s)?.appendChild(r),E.addEventListener(r,"click",()=>{eo(z?.[s]?.getValue())&&(r.innerHTML=`<span><img src="${R}assets/images/tick.svg" alt="copied"></span>`,r.classList.add("hint--left","visible"),r.dataset.hint="Copied!",r.title="",setTimeout(()=>{r.innerHTML=t,r.classList.remove("hint--left","visible"),r.dataset.hint="",r.title="Copy"},2e3))})})},_S=async e=>{z&&(Object.values(z).forEach(l=>l.destroy()),E2());let t={baseUrl:R,mode:e.mode,readonly:e.readonly,theme:e.theme,...it(e),isEmbed:J,mapLanguage:rt,getLanguageExtension:Pe,getFormatterConfig:()=>Es(x()),getFontFamily:Et},s={...t,container:Gh(),editorId:"markup",language:Ze(e.markup.language,e)?e.markup.language:e.languages?.find(l=>ae(l)==="markup")||"html",value:Ze(e.markup.language,e)&&e.markup.content||""},r={...t,container:Jh(),editorId:"style",language:Ze(e.style.language,e)?e.style.language:e.languages?.find(l=>ae(l)==="style")||"css",value:Ze(e.style.language,e)&&e.style.content||""},n={...t,container:Vh(),editorId:"script",language:Ze(e.script.language,e)?e.script.language:e.languages?.find(l=>ae(l)==="script")||"javascript",value:Ze(e.script.language,e)&&e.script.content||""},i=await et(s),o=await et(r),a=await et(n);zi("markup",s.language),zi("style",r.language),zi("script",n.language),Rt={markup:s.language,style:r.language,script:n.language},z={markup:i,style:o,script:a},Object.keys(z).forEach(async l=>{let c=Rt?.[l]||"html";xS(c),z[l].registerFormatter(await ds.getFormatFn(c)),k2(l,z)}),e.mode==="codeblock"&&x2()},S2=async e=>{await _S(e),await ie?.console?.reloadEditor(e),await ie?.compiled?.reloadEditor(e),hr(),OS()},L2=async(e,t)=>{let s=Object.keys(e);for(let r of s){let n=Q(t[r].language);n&&await qp(n,t[r].content,!0)}},yS=e=>{let s={full:"111",editor:"110",codeblock:"010",result:"001"}[e.mode]||"111",r=Fh(),n=zh(),i=Wh(),o=Kh(),a=ss(),l=Uo(),c=Po(),p=Oo(),d=Dn(),g=s[0]==="1",_=s[1]==="1",f=s[2]==="1";r.style.display="flex",i.style.display="flex",a.style.display="flex",o.style.display="block",l.style.display="block",c.style.visibility="visible",p.style.visibility="visible",g||(r.style.display="none",n.style.height="100%"),_||(o.style.flexBasis="100%",i.style.display="none",je?.destroy(!0),je=null),f||(i.style.flexBasis="100%",o.style.display="none",a.style.display="none",p.style.display="none",je?.destroy(!0),je=null),(e.mode==="editor"||e.mode==="codeblock")&&(c.style.visibility="hidden",p.style.visibility="hidden"),e.mode==="codeblock"&&(d.style.display="none"),e.mode==="result"&&(["full","open","closed"].includes(ie?.getStatus()||"")||ie?.hide()),e.mode==="full"&&!je&&(je=zo()),window.dispatchEvent(new Event(nt.resizeEditor))},Ki=(e="markup",t=!1)=>{let s=Ro();(()=>Array.from(s).map(a=>a.dataset.editor).includes(e))()||(e=s[0].dataset.editor||"markup"),s.forEach(a=>a.classList.remove("active")),document.getElementById(e+"-selector")?.classList.add("active"),rg().forEach(a=>a.style.display="none");let o=document.getElementById(e);o.style.display="block",o.style.visibility="visible",!J&&!t&&z[e]?.focus(),t||me({...x(),activeEditor:e}),hr(),(Up||Ce.view!=="result")&&je?.show("code"),vS(e)},vS=e=>{document.querySelectorAll("#editor-status > span[data-status]").forEach(s=>{s.dataset.status===e?(s.style.position="unset",s.style.width="unset",s.style.overflow="unset"):(s.style.position="absolute",s.style.width="0",s.style.overflow="hidden")})},E2=()=>{let e=Zh();e&&(e.textContent=""),document.querySelectorAll("#editor-status > span[data-status]").forEach(s=>{s.innerHTML=""})},bS=()=>{Ep&&Ep.dispose(),Rt?.script&&["javascript","typescript"].includes(rt(Rt.script))&&z.script&&typeof z.script.addTypes=="function"&&(Ep=z.script.addTypes({content:x().script.content+`
{}`,filename:"script.js"}))},wS=e=>{if(x().readonly||e==="blockly"||e==="richtext")return Dn().classList.add("hidden"),!1;Dn().classList.remove("hidden");let t=wr(e);return t?.formatter||t?.parser?kr().classList.remove("disabled"):kr().classList.add("disabled"),!0},Op=({editor:e,code:t})=>{let s=r=>r.trim().startsWith("<?php")?r:`<?php
`+r;if(t)return s(t);e?.getLanguage()==="php"&&e.setValue(s(e.getValue()))},xS=async e=>{!ae(e)||!e||!Ze(e,x())||(wS(e),Object.keys($s).forEach(async s=>{await $s[s]?.show(Object.values(Rt||[]).includes(s),{baseUrl:R,editors:z,config:x(),html:ye().markup.compiled||x().markup.content||"",eventsManager:E})}))},qp=async(e,t,s=!1)=>{let r=ae(e);if(!r||!e||!Ze(e,x()))return;wr(e)?.largeDownload&&ee.info(`Loading ${bs(e)}. This may take a while!`);let n=z[r];n.setLanguage(e,t??(x()[r].content||"")),Rt&&(Rt[r]=e),zi(r,e),Ki(r,s),Op({editor:z.script}),!J&&!s&&setTimeout(()=>n.focus()),await Jt.load([e],x()),ds.getFormatFn(e).then(i=>n.registerFormatter(i)),s||(me({...x(),activeEditor:r}),x().autoupdate&&await Ve()),await fs(),vn(),bS(),Vi(z,x()),await xS(e)},k2=(e,t)=>{let s=t[e];s.addKeyBinding("run",s.keyCodes.ShiftEnter,async()=>{await Ve()})},hr=()=>{let e=s=>{let r={markup:"html",style:"css",script:"javascript"},n=Qe(x()[s].language)?.compiledCodeLanguage;return{language:n||r[s],label:n==="json"?"JSON":Q(n)||n||r[s]}},t={markup:e("markup"),style:e("style"),script:e("script")};if(ie&&ie.compiled){let s=ye();Object.keys(s).forEach(r=>{if(r!==x().activeEditor)return;let n=s[r].modified||s[r].compiled||"";r==="script"&&x().script.language==="php"&&(n=Op({code:n})||`<?php
`),ie?.compiled?.update(t[r].language,n,t[r].label)})}},Kt=async({sourceEditor:e=void 0,forExport:t=!1,template:s=bh,singleFile:r=!0,runTests:n=!1})=>{mt();let i=x(),o=Ie(i),a=i.markup.content||"",l=i.style.content||"",c=i.script.content||"",p=i.tests?.content||"",d=i.markup.language,g=i.style.language,_=i.script.language,f=i.tests?.language||"typescript",u=Qe(_)?.scriptType,m=i.processors.find(ge=>Ye.find(K=>ge===K.name&&K.needsHTML))&&(a!==ye().markup.content||c!==ye().script.content),b=i.tests?.language===ye().tests?.language&&i.tests?.content===ye().tests?.content&&ye().tests?.compiled,S=await Jt.compile(a,d,i,{}),v=S.code,y=await Promise.all([Jt.compile(l,g,i,{html:v,forceCompile:m}),Jt.compile(c,_,i,{blockly:_==="blockly"?await $s.blockly?.getContent({baseUrl:R,editors:z,config:x(),html:v,eventsManager:E}):{}}),n?b?Promise.resolve(ye().tests?.compiled||""):Jt.compile(p,f,i,{}):Promise.resolve(Dt(ye().tests?.compiled||""))]),h={...S.info},[C,k,A]=y.map(ge=>{let{code:K,info:ve}=Dt(ge);return h={...h,...ve},K});h.modifiedHTML&&(v=h.modifiedHTML);let B={...o,markup:{...o.markup,compiled:v},style:{...o.style,compiled:C},script:{...o.script,compiled:i.customSettings.convertCommonjs===!1||u&&u!=="module"?k:wf(k)},tests:{language:f,...o.tests,compiled:A}},Me=await $h({code:B,config:i,forExport:t,template:s,baseUrl:R,singleFile:r,runTests:n,compileInfo:h}),xe=e==="style"&&!h.cssModules;return Do({...ye(),...B,result:Me,styleOnlyUpdate:xe}),r&&(Ge.isBroadcasting&&AS(),Wt&&!Wt.closed&&Wt?.postMessage({result:Me},location.origin)),Me},_n=e=>{let t=ig();t&&(e===!0?t.style.display="unset":t.style.display="none")},T2=()=>{let e=Ts();if(!e?.contentWindow)return;_n(!0),e.contentWindow.postMessage({flush:!0},"*");let t={markup:Qe(x().markup.language)?.compiledCodeLanguage||"html",style:Qe(x().style.language)?.compiledCodeLanguage||"css",script:Qe(x().script.language)?.compiledCodeLanguage||"javascript"},s={html:"<!-- loading -->",css:"/* loading */",javascript:"// loading",wat:";; loading"};Mr("markup",t.markup,s[t.markup]||"html"),Mr("style",t.style,s[t.style]||"css"),Mr("script",t.script,s[t.script]||"javascript"),Do({...ye(),tests:{language:"javascript",content:"",compiled:""}}),hr(),ie?.tests?.clearTests()},Cp=(e=!1)=>{let t=ks();if(!t)return;let s=X.title;e&&t.textContent?.trim()===""&&(t.textContent=s);let r=t.textContent||s;r!==x().title&&(me({...x(),title:r}),x().autosave&&Ws(!Re,!1),Rp(),fs(),vn())},Rp=()=>{let e=x().title,t=location.hostname.startsWith("dev.livecodes.io")?"(dev) ":location.hostname.startsWith("127.0.0.1")||location.hostname.startsWith("localhost")?"(local) ":"";parent.document.title=t+(e&&e!=="Untitled Project"?e+" - ":"")+"LiveCodes"},SS=()=>{let e=qo(),t=x();t.scripts.length>0||t.stylesheets.length>0||t.cssPreset?(e.classList.add("active"),e.style.display="unset"):(e.classList.remove("active"),J&&(e.style.display="none"))},Ve=async(e,t=!1)=>{_n(!0);let s=await Kt({sourceEditor:e,runTests:t});await gS(ss(),s),ie?.console?.clear(),hr()},fr=()=>Ve(void 0,!0),LS=(e,t=!1)=>{t&&!J?parent.history.pushState(null,"",e):parent.history.replaceState(null,"",e)},Ip=async(e=!0)=>{if(e)await Promise.all([z.markup.format(),z.style.format(),z.script.format()]);else{let t=Vt();await t.format(),t.focus()}mt()},Ws=async(e=!1,t=!0)=>{t&&Cp(!0),z&&x().formatOnsave&&await Ip(!0);let s=Ys(x());Re?await F.projects?.updateItem(Re,s):Re=await F.projects?.addItem(s)||"",await fs(),e&&ee.success("Project locally saved to device!"),await yn(!1)},ES=async()=>{Re="",It({...x(),title:x().title+" (fork)"}),await Ws(),ee.success("Forked as a new project")},yn=async(e=!1,t=!0,s=!0,r=!1,n=!1)=>{let i=t?Ie(x()):x(),o=e?"?x=id/"+await gf.shareProject({...i,result:r?ye().result:void 0}):"?x=code/"+Pn(JSON.stringify(i)),a=(location.origin+location.pathname).split("/").slice(0,-1).join("/")+"/",c=(n?Bi.getAppUrl():a)+o;return s&&LS(a+o,!0),{title:(i.title!==X.title?i.title+" - ":"")+"LiveCodes",url:c}},mt=()=>{["markup","style","script"].forEach(t=>{me({...x(),[t]:{...x()[t],language:Ap(t),content:z[t].getValue()}})})},It=async(e,t,s=!0)=>{mr=!0;let r=Ie({...X,...Ls(e)});me({...x(),...r}),await Ji({config:x()}),ms(),s&&T2();let n=ks();n.textContent=x().title,Rp(),LS(t||location.origin+location.pathname,!0),us.x=0,us.y=0,await HS(!0),mr=!1},Gt=(e,t=!0)=>{let s=Zs({...x(),...e??Zs(X)});me({...x(),...s}),t&&F.userConfig?.setValue({...F.userConfig.getValue(),...e})},Gi=(e=!0)=>{if(J)return;let t=F.userConfig?.getValue();me(Ys({...x(),...t})),e&&(bn(x()),Dp(x().theme),US(!0))},kS=async e=>{let t=(await F.templates?.getItem(e))?.config;t&&await It(t)},vn=()=>{let e=new Event(nt.change);document.dispatchEvent(e),parent.dispatchEvent(e)},fs=async()=>{if(J)return;mt();let e=Re&&(await F.projects?.getItem(Re||""))?.config;Wi=mr||!!(e&&JSON.stringify(Ie(e))===JSON.stringify(Ie(x())));let t=ks();Wi?(t.classList.remove("unsaved"),ms(!0)):(t.classList.add("unsaved"),ms())},jp=(e=!1)=>Wi||J?Promise.resolve(!0):new Promise(t=>{let s=document.createElement("div");s.innerHTML=Ch,I.show(s.firstChild,{size:"small"}),E.addEventListener(ag(),"click",async()=>{await Ws(!0),e||I.close(),t(!0)}),E.addEventListener(lg(),"click",()=>{e||I.close(),t(!0)}),E.addEventListener(cg(),"click",()=>{e||I.close(),t(!1)})}),Fs=(e,t)=>()=>jp(!0).then(s=>{setTimeout(s?e:typeof t=="function"?t:()=>{I.close()})}),ms=(e=!1)=>{J||(F.recover?.clear(),!(e||!x().recoverUnsaved)&&F.recover?.setValue({config:Ie(x()),lastModified:Date.now()}))},TS=(e=!1)=>{if(!x().recoverUnsaved||J)return Promise.resolve("recover disabled");let t=F.recover?.getValue(),s=t?.config;if(!t||!s)return Promise.resolve("no unsaved project");let r=s.title;return new Promise(n=>{let i=k_();if(e)i.style.display="unset";else{let a=document.createElement("div");a.innerHTML=jh,I.show(a.firstChild,{size:"small",isAsync:!0})}Io().textContent=r,Io().title=r,mg().textContent=new Date(t.lastModified).toLocaleString();let o=fg();E.addEventListener(pg(),"click",async()=>{await It(s),await fs(),I.close(),n("recover")}),E.addEventListener(ug(),"click",async()=>{F.projects&&(await F.projects.addItem(s),ee.success(`Project "${r}" saved to device.`)),e?i.style.maxHeight="0":I.close(),ms(!0),n("save and continue")}),E.addEventListener(dg(),"click",()=>{e?i.style.maxHeight="0":I.close(),ms(!0),n("cancel recover")}),E.addEventListener(o,"change",()=>{Gt({recoverUnsaved:!o.checked}),bn(x())})})},CS=async e=>{[z.markup,z.style].forEach((t,s)=>{t.monaco&&s>0||t.changeSettings(it(e))})},jS=async()=>Ni||(Ni=await Co(x(),R),Ni),Hp=async()=>{if(Je)return;Je=pf(J);let e=await Je.getUser();e&&No(e)},Mp=async()=>new Promise((e,t)=>{let r=O_(E,n=>{Je?Je.signIn(n).then(i=>{if(!i)t("Login error!");else{MS(i,"restore");let o=i.displayName||i.username,a=o?"Logged in as: "+o:"Logged in successfully";ee.success(a),No(i),e(i)}}).catch(()=>{ee.error("Login error!")}):t("Login error!"),I.close()});I.show(r,{size:"small"})}).catch(()=>{ee.error("Login error!")}),C2=()=>{Je&&Je?.getUser().then(async e=>{e&&await MS(e,"clear")}).then(()=>Je?.signOut().then(()=>{ee.success("Logged out successfully"),q_()}).catch(()=>{ee.error("Logout error!")}))},Xi=async e=>{await Hp();let t=await Je?.getUser();return t||(t=await Mp(),typeof e=="function"&&e()),t},zs=async()=>{let e=await Je?.getUser();if(!e||!F.userData)return null;let t=e.username||e.uid;return(await F.userData.getItem(t))?.data||null},Yi=async e=>{let t=await Je?.getUser();if(!t||!F.userData)return null;let s=t.username||t.uid,r=(await F.userData.getItem(s))?.data;return await F.userData?.updateItem(s,{id:s,data:{...r,...e}})},st=()=>F.appData?.getValue()||null,qt=e=>{F.appData?.setValue({...F.appData.getValue(),...e})},MS=async(e,t)=>{let s=Object.keys(F).filter(n=>!["recover","sync"].includes(n)),r=await import(R+"sync.0516f201dac9fd021aeba54ab85f6049.js");r.init(R);for(let n of s)t==="clear"?(await r.exportToLocalSync({user:e,storeKey:n}),F[n]?.clear()):await r.restoreFromLocalSync({user:e,storeKey:n});t==="clear"&&(Gt(X),Ge.isBroadcasting=!1,Ge.channel="",Ge.channelUrl="",Ge.channelToken="",Ge.broadcastSource=!1),Gi()},US=async(e=!1)=>{if(J)return;let t=(await zs())?.sync?.lastSync;(t||e)&&(await import(R+"sync-ui.d0439fd0137e0c66038590b908e110df.js")).updateSyncStatus({lastSync:t})},he=(e,t)=>{let s=Tp.find(r=>r.screen.toLowerCase()===e.toLowerCase());s?s.show=t:Tp.push({screen:e.toLowerCase(),show:t})},Ne=async(e,t)=>{let s=Tp.find(n=>n.screen.toLowerCase()===e.toLowerCase());if(!s)return;await s.show(t),document.querySelector("#modal").firstElementChild?.click()},j2=()=>{let e=Object.fromEntries(new URLSearchParams(parent.location.search)),t=e.new===""?"new":e.screen;t&&Ne(t)},Bp=()=>[...Object.values(z),ie?.console?.getEditor?.(),ie?.compiled?.getEditor?.()],Dp=e=>{let t=["light","dark"],s=document.querySelector(":root");s?.classList.remove(...t),s?.classList.add(e),Bp().forEach(r=>{r?.setTheme(e),$s[r?.getLanguage()]?.setTheme(e)})},bn=e=>{if(Vg().forEach(g=>{let _=g.dataset.processor;_&&(g.checked=e.processors.includes(_))}),J)return;let s=zg();s.checked=e.autoupdate;let r=Ho(),n=Bo();n.value=String(e.delay),r.textContent=String(e.delay/1e3);let i=Wg();i.checked=e.autosave;let o=Gg();zs().then(g=>{o.checked=g?.sync?.autosync||!1});let a=Jg();a.checked=e.formatOnsave;let l=Kg();l.checked=e.theme==="dark";let c=Yg();c.checked=e.recoverUnsaved;let p=Xg();p.checked=e.welcome;let d=Qg();d.checked=e.showSpacing,Zg().forEach(g=>{g.classList.remove("active"),e.cssPreset===g.dataset.preset&&g.classList.add("active"),!e.cssPreset&&g.dataset.preset==="none"&&g.classList.add("active")})},M2=e=>{I.show(e,{size:"small"})},Np=async(e,t=!0)=>{let s=await jS(),{title:r,thumbnail:n,...i}=s.filter(o=>o.name===e)?.[0]||{};i?(qt({recentTemplates:[{name:e,title:r},...st()?.recentTemplates?.filter(a=>a.name!==e)||[]].slice(0,5)}),(t?Fs:a=>async()=>a())(()=>{Re="",It({...X,...i},"?template="+e)})().finally(()=>{I.close()})):ee.error("Failed loading template")},U2=()=>{let e=x(),t=Ur();return{...e,...t,markup:{...e.markup,...t.markup,position:z.markup.getPosition()},style:{...e.style,...t.style,position:z.style.getPosition()},script:{...e.script,...t.script,position:z.script.getPosition()},tools:{enabled:e.tools.enabled,active:ie?.getActiveTool()??"",status:ie?.getStatus()??""}}},$p=(e=1)=>{let t=Ts(),s=og();!t||!s||(t.classList.remove("zoom25"),t.classList.remove("zoom50"),e===.5&&t.classList.add("zoom50"),e===.25&&t.classList.add("zoom25"),s.textContent=String(e))},AS=async({serverUrl:e,channel:t,channelToken:s,broadcastSource:r}={})=>{if(J)return;let n=st()?.broadcast;if(e||(e=n?.serverUrl),!e)return;r==null&&(r=Ge.broadcastSource),t==null&&(t=Ge.channel),s==null&&(s=Ge.channelToken);let i=n?.userToken,{result:o,...a}=U2();try{let l=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({result:o,...r?{data:a}:{},...t?{channel:t}:{},...s?{channelToken:s}:{},...i?{userToken:i}:{}})});return l.ok?l.json():void 0}catch{return}},A2=e=>{Ge.isBroadcasting=e.isBroadcasting,Ge.channel=e.channel,Ge.channelUrl=e.channelUrl,Ge.channelToken=e.channelToken,Ge.broadcastSource=e.broadcastSource;let t=g_();t&&(e.isBroadcasting?(t.firstElementChild?.classList.add("active"),t.dataset.hint="Broadcasting..."):(t.firstElementChild?.classList.remove("active"),t.dataset.hint="Broadcast"))},PS=(e=!0)=>{let t="4",s="0.0.2",r="fe430fb",n="https://github.com/live-codes/livecodes",i=Bi.getAppUrl(),o=Bi.getSDKUrl();return e&&(console.log(`App Version: ${t} (${n}/releases/tag/v${t})`),console.log(`SDK Version: ${s} (https://www.npmjs.com/package/livecodes/v/${s})`),console.log(`Git commit: ${r} (${n}/commit/${r})`),console.log(`App Permanent URL: ${i}`),console.log(`SDK Permanent URL: ${o}`)),{appVersion:t,sdkVersion:s,commitSHA:r,appUrl:i,sdkUrl:o}},kp=()=>{Object.values(z).forEach(e=>{setTimeout(()=>{e.layout&&e.layout()})})},P2=()=>{let e=ks();if(!e)return;e.textContent=x().title||X.title,Rp();let t=r=>{r.which===13&&(r.preventDefault(),e.blur())},s=r=>{r.preventDefault();let n=r.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,n)};E.addEventListener(e,"input",()=>Cp(),!1),E.addEventListener(e,"blur",()=>Cp(!0),!1),E.addEventListener(e,"keypress",t,!1),E.addEventListener(e,"paste",s,!1)},O2=()=>{kp(),E.addEventListener(window,"resize",kp,!1),E.addEventListener(window,nt.resizeEditor,kp,!1)},q2=()=>{let e=Uo();if(!e)return;let t=document.createElement("div");t.id="size-label",e.appendChild(t);let s=Qi(()=>{setTimeout(()=>{t.classList.remove("visible"),setTimeout(()=>{t.style.display="none"},100)},1e3)},1e3);E.addEventListener(window,"message",r=>{let n=Ts();if(!t||!n||r.source!==n.contentWindow||r.data.type!=="resize")return;let i=r.data.sizes;t.innerHTML=`${i.width} x ${i.height}`,t.style.display="block",t.classList.add("visible"),s()})},R2=()=>{E.addEventListener(window,"message",e=>{let t=Ts();if(!t||e.source!==t.contentWindow||e.data.type!=="scroll")return;let s=e.data.position;us.x=Number(s.x)||0,us.y=Number(s.y)||0})},I2=()=>{Ro().forEach(e=>{E.addEventListener(e,"click",()=>{Ki(e.dataset.editor),qt({language:Ap(e.dataset.editor)}),ms()},!1)})},H2=()=>{x().allowLangChange?hg().forEach(e=>{E.addEventListener(e,"mousedown",async()=>{await qp(e.dataset.lang),qt({language:e.dataset.lang})},!1)}):gg().forEach(e=>{e.style.display="none"})},OS=()=>{let e=async(s,r)=>{mt(),bS();let n=!!($i&&x().tests?.content);(x().autoupdate||n)&&!r&&await Ve(s,n),x().markup.content!==ye().markup.content&&await Kt({sourceEditor:s});for(let i of Object.keys($s))x()[s].language===i&&await $s[i]?.show(!0,{baseUrl:R,editors:z,config:x(),html:ye().markup.compiled||x().markup.content||"",eventsManager:E});x().autosave&&await Ws(),vn(),Vi(z,x())},t=s=>Qi(async()=>{await e(s,mr)},()=>x().delay??X.delay);Object.keys(z).forEach(s=>{z[s].onContentChanged(t(s)),z[s].onContentChanged(fs)})},B2=()=>{let e=s=>navigator.platform.match("Mac")?s.metaKey:s.ctrlKey,t=async s=>{if(!s)return;let r=Vt();if(e(s)&&s.key.toLowerCase()==="p"&&r.monaco){s.preventDefault(),r.monaco.trigger("anyString","editor.action.quickCommand");return}if(e(s)&&s.key.toLowerCase()==="d"){s.preventDefault();return}if(!J){if(e(s)&&s.shiftKey&&s.key.toLowerCase()==="s"){s.preventDefault(),await ES();return}if(e(s)&&s.key.toLowerCase()==="s"){s.preventDefault(),await Ws(!0);return}if(e(s)&&s.altKey&&s.key.toLowerCase()==="t"){s.preventDefault(),je?.show("output"),ie?.setActiveTool("tests"),ie?.getStatus()==="closed"&&ie?.open(),await fr();return}if(s.shiftKey&&s.key==="Enter"){s.preventDefault(),je?.show("output"),await Ve();return}}};E.addEventListener(window,"keydown",t,!0)},D2=()=>{if(J||x().mode==="result")return;let e=Ao();E.addEventListener(e,"click",async t=>{t.preventDefault(),parent.postMessage({args:"home"},location.origin)})},N2=()=>{let e=async()=>{je?.show("output"),await Ve()};E.addEventListener(Po(),"click",e),E.addEventListener(Oo(),"click",e)},$2=()=>{E.addEventListener(tg(),"click",()=>je?.show("output",!0))},F2=()=>{wS(Vt().getLanguage())&&(E.addEventListener(Xh(),"click",()=>{eo(Vt().getValue())?ee.success("Code copied to clipboard"):ee.error("Failed to copy code")}),E.addEventListener(Yh(),"click",()=>{let e=Vt();e.undo(),e.focus()}),E.addEventListener(Qh(),"click",()=>{let e=Vt();e.redo(),e.focus()}),E.addEventListener(kr(),"click",async()=>{await Ip(!1)}),E.addEventListener(eg(),"click",()=>{Ne("editor-settings",{scrollToSelector:'label[data-name="editorMode"]'})}))},z2=()=>{let e=_g(),t=Ye.filter(s=>ws(s.name,x())).filter(s=>!s.hidden).map(s=>({name:s.name,title:s.title}));!e||t.length===0||t.forEach(s=>{let r=kf(s);e.append(r),E.addEventListener(r,"mousedown",async n=>{n.preventDefault(),n.stopPropagation();let i=r.querySelector("input");if(!i)return;i.checked=!i.checked;let o=i.dataset.processor;!o||!t.find(a=>a.name===o)||(me({...x(),processors:[...i.checked?[...x().processors,o]:x().processors.filter(a=>a!==o)]}),x().autoupdate&&await Ve())},!1),E.addEventListener(r,"click",async n=>{n.preventDefault(),n.stopPropagation()})})},W2=()=>{let e=vg(),t=bg();!e||!t||(e.innerHTML=wh,E.addEventListener(e,"mousedown",s=>{s.target===e&&e.classList.add("hidden")}),E.addEventListener(t,"mousedown",()=>{e.classList.remove("hidden")}))},G2=()=>{yg().forEach(s=>{E.addEventListener(s,"change",async()=>{let r=s.dataset.config;if(!(!r||!(r in x()))){if(r==="theme")me({...x(),theme:s.checked?"dark":"light"}),Dp(x().theme);else if(r==="autosync"){let n=(await zs())?.sync;n?.repo&&await Yi({sync:{...n,autosync:s.checked}}),s.checked&&!n?.repo&&(s.checked=!1,await Ne("sync"))}else me({...x(),[r]:s.checked});Gt(Zs(x())),r==="autoupdate"&&x()[r]&&await Ve(),r==="emmet"&&await CS(x()),r==="welcome"&&Gt({welcome:s.checked}),r==="recoverUnsaved"&&(Gt({recoverUnsaved:s.checked}),ms()),r==="showSpacing"&&(Gt({showSpacing:s.checked}),x().autoupdate&&await Ve())}})});let t=Bo();E.addEventListener(t,"input",()=>{let s=Ho(),r=Number(t.value);s.textContent=String(r/1e3),me({...x(),delay:r}),Gt(Zs(x()))})},J2=()=>{E.addEventListener(Tr(),"click",Mp,!1),he("login",Mp)},V2=()=>{E.addEventListener(Cr(),"click",C2,!1)},K2=()=>{let e=B_(E,()=>s()),t=h_(e),s=async()=>{let i=st()?.defaultTemplate,o=(await F.templates?.getList()||[]).sort((l,c)=>l.id===i?-1:c.id===i?1:0);if(o.length===0){t.innerHTML=Wo;return}t.innerHTML="";let a=document.createElement("ul");a.classList.add("open-list"),t.appendChild(a),o.forEach(l=>{let{link:c,deleteButton:p,setAsDefaultLink:d,removeDefaultLink:g}=R_(l,a,bs,Q,!0);i===l.id&&c.parentElement?.classList.add("selected"),E.addEventListener(c,"click",async _=>{_.preventDefault();let f=c.dataset.id||"",u=(await F.templates?.getItem(f))?.config;u&&(await It({...u,title:X.title}),Re=""),I.close()},!1),E.addEventListener(p,"click",async()=>{if(!F.templates)return;st()?.defaultTemplate===l.id&&qt({defaultTemplate:null}),await F.templates.deleteItem(l.id);let _=p.parentElement;_.classList.add("hidden"),setTimeout(async()=>{_.style.display="none",F.templates&&(await F.templates.getList()).length===0&&(a.remove(),t.innerHTML=Wo)},500)},!1),E.addEventListener(d,"click",_=>{_.stopPropagation(),qt({defaultTemplate:l.id}),[...a.children].forEach(f=>{f.classList.remove("selected")}),c.parentElement?.classList.add("selected")},!1),E.addEventListener(g,"click",_=>{_.stopPropagation(),qt({defaultTemplate:null}),c.parentElement?.classList.remove("selected")},!1)})},r,n=async()=>{let i=f_(e),o=i?.firstElementChild;r||jS().then(a=>{r=a,o?.remove(),a.forEach(l=>{let c=D_(l,i,R);E.addEventListener(c,"click",p=>{p.preventDefault(),Np(l.name,!1)},!1)})}).catch(()=>{o?.remove(),ee.error("Failed loading starter templates")}),setTimeout(()=>m_(e)?.click()),I.show(e,{isAsync:!0})};E.addEventListener(Tg(),"click",Fs(n),!1),he("new",Fs(n))},X2=()=>{E.addEventListener(jg(),"click",async e=>{e.preventDefault(),await Ws(!0)})},Y2=()=>{E.addEventListener(Mg(),"click",async e=>{e.preventDefault(),await ES()})},Q2=()=>{E.addEventListener(Ug(),"click",async e=>{e.preventDefault(),F.templates&&(await F.templates.addItem(x()),ee.success("Saved as a new template"))})},Z2=()=>{let e=async()=>{I.show(He()),await(await import(R+"open.48c6caaf00e256d6397f6b19bad653d3.js")).createSavedProjectsList({eventsManager:E,getContentConfig:Ie,getProjectId:()=>Re,loadConfig:It,modal:I,notifications:ee,projectStorage:F.projects||Ht,setProjectId:s=>Re=s,showScreen:Ne,languages:we,getLanguageTitle:bs,getLanguageByAlias:Q})};E.addEventListener(Cg(),"click",Fs(e),!1),he("open",Fs(e))},eP=()=>{let e=async()=>{I.show(He()),(await import(R+"import.8c13de90b03c9f9d79034358d3f2b924.js")).createImportUI({baseUrl:R,modal:I,notifications:ee,eventsManager:E,getUser:Je?.getUser,loadConfig:It,populateConfig:Mo,projectStorage:F.projects,showScreen:Ne})};E.addEventListener(Bg(),"click",Fs(e),!1),he("import",Fs(e))},tP=()=>{let e,t=async()=>{e=e||await import(R+"export.6035ae48b819d7f5ec5bda8aeeec981e.js")};E.addEventListener(wg(),"click",s=>{s.preventDefault(),mt(),Ah(x())},!1),E.addEventListener(xg(),"click",async s=>{s.preventDefault(),mt(),await t(),e.exportConfig(x(),R,"html",await Kt({forExport:!0}))},!1),E.addEventListener(Sg(),"click",async s=>{s.preventDefault(),mt();let r=await Kt({forExport:!0});await t(),e.exportConfig(x(),R,"src",{html:r,deps:{getLanguageExtension:Pe}})},!1),E.addEventListener(Eg(),"click",async()=>{mt(),zn(ye(),Ie(x()))||await Kt({});let s=Ur(),r={markup:s.markup.compiled,style:s.style.compiled,script:s.script.compiled};await t(),e.exportConfig(x(),R,"codepen",{baseUrl:R,compiled:r,deps:{getLanguageExtension:Pe,getLanguageCompiler:Qe}})},!1),E.addEventListener(kg(),"click",async()=>{mt(),zn(ye(),Ie(x()))||await Kt({});let s=Ur(),r={markup:s.markup.compiled,style:s.style.compiled,script:s.script.compiled};await t(),e.exportConfig(x(),R,"jsfiddle",{baseUrl:R,compiled:r,deps:{getLanguageExtension:Pe,getLanguageCompiler:Qe}})},!1),E.addEventListener(Lg(),"click",async()=>{mt();let s=await Xi();s&&(ee.info("Creating a public GitHub gist..."),await t(),e.exportConfig(x(),R,"githubGist",{user:s,deps:{getLanguageExtension:Pe}}))},!1)},sP=()=>{let e=async()=>{I.show(He(),{size:"small"});let t=await import(R+"share.290885402d4dcf946ceb7ad455cff26e.js"),s=(n=!1,i=!1)=>yn(n,!0,!1,!0,i),r=await t.createShareContainer(s,R,E);I.show(r,{size:"small"})};E.addEventListener(Og(),"click",async t=>{t.preventDefault(),await e()},!1),he("share",e)},rP=()=>{let e=async()=>{let t=await Xi();if(!t){ee.error("Authentication error!");return}I.show(He());let s=async()=>{if(Re)return(await zs())?.deploys?.[Re]},r=async i=>{Re&&await Yi({deploys:{...(await zs())?.deploys,[Re]:i}})};(await import(R+"deploy.57c36fea35f9820d9335cfe1864a89e2.js")).createDeployUI({modal:I,notifications:ee,eventsManager:E,user:t,deployRepo:await s(),deps:{getResultPage:Kt,getCache:ye,getConfig:x,getContentConfig:Ie,getLanguageExtension:Pe,setProjectDeployRepo:r}})};E.addEventListener(Ig(),"click",e,!1),he("deploy",e)},nP=()=>{if(J)return;let e=async()=>{let t=await Xi();if(!t){ee.error("Authentication error!");return}I.show(He()),(await import(R+"sync-ui.d0439fd0137e0c66038590b908e110df.js")).createSyncUI({baseUrl:R,modal:I,notifications:ee,eventsManager:E,user:t,deps:{getSyncData:async()=>(await zs())?.sync||null,setSyncData:async r=>{await Yi({sync:r}),bn(x())}}})};E.addEventListener(Hg(),"click",e,!1),he("sync",e)},iP=async()=>{if(J)return;let e=1e3*60,t=30*e,s,r=async()=>{if(Fi){clearInterval(s);return}let i=(await zs())?.sync;if(!i?.autosync||Date.now()-i.lastSync<t)return;let o=await Je?.getUser(),a=i.repo;if(!o||!a)return;let l=await import(R+"sync.0516f201dac9fd021aeba54ab85f6049.js");l.init(R),await l.sync({user:o,repo:a,newRepo:!1})&&Yi({sync:{...i,lastSync:Date.now()}})};(()=>{setTimeout(()=>{r(),s=window.setInterval(r,t)},e)})()},oP=async()=>{if(J)return;let e=!1,t=()=>{n?.unsubscribe(),i?.unsubscribe(),o?.unsubscribe()},s=()=>{if(e)return t();setTimeout(async()=>{e=!0,navigator.storage&&navigator.storage.persist&&await navigator.storage.persist()},2e3)},r=a=>{let l=a?.slice(0,5).map(c=>({id:c.id,title:c.config.title,description:c.config.description}))||[];qt({recentProjects:l})},n=F.projects?.subscribe(s),i=F.templates?.subscribe(s),o=F.assets?.subscribe(s);F.projects?.subscribe(r)},aP=()=>{let e=async()=>{I.show(He()),(await import(R+"backup.862e2cea48a04203a9a91d00cd7c6399.js")).createBackupUI({baseUrl:R,modal:I,notifications:ee,eventsManager:E,stores:F,deps:{loadUserConfig:Gi}})};E.addEventListener(Dg(),"click",e,!1),he("backup",e)},lP=()=>{if(J)return;let e=async()=>{I.show(He()),(await import(R+"broadcast.4488547e38a070318c748819ec1a70b0.js")).createBroadcastUI({modal:I,notifications:ee,eventsManager:E,deps:{getBroadcastData:()=>({...Ge,serverUrl:st()?.broadcast?.serverUrl||""}),setBroadcastData:s=>{A2(s),qt({broadcast:{...st()?.broadcast,serverUrl:s.serverUrl}})},broadcast:AS}})};E.addEventListener(Ng(),"click",e,!1),he("broadcast",e)},cP=()=>{if(J)return;let e=async()=>{I.show(He());let t=document.createElement("div");t.innerHTML=Lh.replace(/{{baseUrl}}/g,R);let s=t.firstChild;I.show(s);let r=E_(s);r.checked=x().welcome,E.addEventListener(__(s),"click",()=>{Ne("new")}),E.addEventListener(y_(s),"click",()=>{Ne("open")}),E.addEventListener(v_(s),"click",()=>{Ne("import")}),E.addEventListener(S_(s),"click",()=>{Ne("open")}),E.addEventListener(L_(s),"click",()=>{Ne("new")}),E.addEventListener(r,"change",()=>{Gt({welcome:r.checked}),bn(x())}),Up||TS(!0);let n=async _=>{I.show(He(),{size:"small"});let f=(await F.projects?.getItem(_))?.config;f&&(await It(f),Re=_),I.close()},i=st()?.recentProjects?.slice(0,5).reverse()||[],o=T_(s),a=C_(s);if(i.length===0&&o&&a)a.style.display="none",o.classList.add("no-recent");else{let _=j_(s);i.forEach(f=>{let u=document.createElement("li");u.classList.add("overflow-ellipsis");let m=document.createElement("a");m.textContent=f.title,m.title=f.description.trim()||f.title,m.href="#",u.appendChild(m),_?.prepend(u),E.addEventListener(m,"click",()=>jp().then(b=>{b&&n(f.id)}))})}let l=st()?.defaultTemplate;if(!l)w_(s).style.display="unset";else{let _=x_(s);E.addEventListener(_,"click",async f=>{f.preventDefault(),I.show(He(),{size:"small"}),await kS(l),I.close()},!1),_.style.display="unset"}b_(s).style.visibility="visible";let c=[{name:"blank",title:"Blank Project"},{name:"javascript",title:"JavaScript Starter"},{name:"typescript",title:"TypeScript Starter"},{name:"react",title:"React Starter"},{name:"vue",title:"Vue 3 Starter"}],p=st()?.recentTemplates||[],d=[...p,...c.filter(_=>!p.map(f=>f.name).includes(_.name))].slice(0,5).reverse(),g=M_(s);d.forEach(_=>{let f=document.createElement("li"),u=document.createElement("a");u.textContent=_.title,u.href="#",f.appendChild(u),g?.prepend(f),E.addEventListener(u,"click",()=>jp().then(m=>{m&&Np(_.name)}))})};E.addEventListener($g(),"click",e),he("welcome",e)},pP=()=>{if(J)return;let e=async()=>{let t=PS(),s="https://github.com/live-codes/livecodes",r=document.createElement("div");r.innerHTML=Eh.replace(/{{COMMIT_URL}}/g,`${s}/commit/${t.commitSHA}`).replace(/{{APP_URL}}/g,t.appUrl).replace(/{{SDK_URL}}/g,t.sdkUrl);let n=r.firstChild;I.show(n)};E.addEventListener(Fg(),"click",e),he("about",e)},uP=()=>{let e=(s,r,n)=>{me({...x(),title:s,description:r,tags:n}),Ws(!Re,!0)},t=()=>P_(x(),F.projects||Ht,I,E,e);E.addEventListener(e_(),"click",t,!1),he("info",t)},dP=()=>{let e=async(n=!1)=>(await yn(!0,!0,!1,!0,n)).url,t=x(),s=async n=>et({baseUrl:R,container:n,editorId:"embed",getLanguageExtension:Pe,isEmbed:J,language:"html",mapLanguage:rt,readonly:!0,theme:t.theme,value:"",...it(t),editor:"codejar",getFormatterConfig:()=>Es(x()),getFontFamily:Et}),r=async()=>{I.show(He()),await(await import(R+"embed-ui.05314c99a4a649636110b4d48cd41b4c.js")).createEmbedUI({baseUrl:R,config:Ie(x()),editorLanguages:{markup:bs(x().markup.language),style:bs(x().style.language),script:bs(x().script.language)},modal:I,notifications:ee,eventsManager:E,createEditorFn:s,getUrlFn:e})};E.addEventListener(qg(),"click",r,!1),he("embed",r)},mP=()=>{let e=s=>{if(!s)return;let r=s.editor!==x().editor;Gt(s),r?S2(x()):Bp().forEach(n=>n.changeSettings(s)),vS(x().activeEditor||"markup")},t=async({scrollToSelector:s=""}={})=>{I.show(He()),await(await import(R+"editor-settings.fa86d908608bef98539492cff68f5358.js")).createEditorSettingsUI({baseUrl:R,modal:I,eventsManager:E,scrollToSelector:s,deps:{getUserConfig:()=>Zs(x()),createEditor:et,getFormatFn:()=>ds.getFormatFn("jsx"),changeSettings:e}})};E.addEventListener(Rg(),"click",()=>t(),!1),he("editor-settings",t)},fP=()=>{let e,t=async()=>{I.show(He()),e=e||await import(R+"assets.251ce39d29b1a43529968b70ad4e3815.js")},s=async()=>{await t(),await e.createAssetsList({eventsManager:E,modal:I,notifications:ee,assetsStorage:F.assets||Ht,showScreen:Ne,baseUrl:R})},r=async n=>{await t();let i=await import(R+"deploy.57c36fea35f9820d9335cfe1864a89e2.js"),o=async(a,l)=>i.deployFile({file:l,user:a,repo:"livecodes-assets",branch:"gh-pages",message:"add "+l.path,description:"LiveCodes assets",readmeContent:"#LiveCodes assets"});I.show(e.createAddAssetContainer({eventsManager:E,notifications:ee,assetsStorage:F.assets||Ht,showScreen:Ne,deployAsset:o,getUser:Xi,baseUrl:R,activeTab:n}),{isAsync:!0})};E.addEventListener(t_(),"click",s,!1),he("assets",s),he("add-asset",n=>{setTimeout(()=>r(n))})},hP=()=>{let e,t=async()=>{I.show(He()),e=e||await import(R+"snippets.efafc31b7a26f13984a4eb6837e73df6.js")},s=async i=>et({baseUrl:R,container:null,editorId:"snippet",getLanguageExtension:Pe,isEmbed:J,language:"html",value:"",theme:x().theme,readonly:x().readonly,mapLanguage:rt,getFormatterConfig:()=>Es(x()),getFontFamily:Et,...it(x()),...i}),r=async()=>{await t(),await e.createSnippetsList({eventsManager:E,modal:I,notifications:ee,snippetsStorage:F.snippets||Ht,deps:{createEditorFn:s,showScreen:Ne}})},n=async i=>{await t();let o=await e.createAddSnippetContainer({snippetId:i,eventsManager:E,notifications:ee,snippetsStorage:F.snippets||Ht,showScreen:Ne,deps:{createEditorFn:s,getAppData:st,setAppData:qt}});I.show(o,{isAsync:!0})};E.addEventListener(s_(),"click",r,!1),he("snippets",r),he("add-snippet",i=>{setTimeout(()=>n(i))})},qS=()=>{let e=async()=>{let t=async()=>{SS(),await fs(),I.close(),x().autoupdate&&await Ve()};I.show(He()),(await import(R+"resources.879931acfbb97918dd80fcffe442a301.js")).createExternalResourcesUI({baseUrl:R,modal:I,eventsManager:E,deps:{getConfig:x,setConfig:me,loadResources:t}})};E.addEventListener(Ag(),"click",e,!1),E.addEventListener(qo(),"click",e,!1),he("resources",e)},gP=()=>{let e=async()=>{let t=x(),s,r=document.createElement("div");r.innerHTML=xh;let n=r.firstChild;I.show(n,{onClose:()=>{s?.destroy()}});let i={baseUrl:R,mode:t.mode,readonly:t.readonly,editorId:"customSettings",container:a_(),language:"json",value:_r(t.customSettings,!0),theme:t.theme,isEmbed:J,mapLanguage:rt,getLanguageExtension:Pe,getFormatterConfig:()=>Es(x()),getFontFamily:Et,...it(t)};s=await et(i),s?.focus(),E.addEventListener(l_(),"click",async()=>{let o={},a=s?.getValue()||"{}";try{o=JSON.parse(a)}catch{try{o=JSON.parse(Vp(a))}catch{ee.error("Failed parsing settings as JSON");return}}o!==x().customSettings&&(Jt.clearCache(),me({...x(),customSettings:o}),await fs(),o.types&&Vi(z,x())),s?.destroy(),I.close(),x().autoupdate&&await Ve(),vn()})};E.addEventListener(Pg(),"click",e,!1),he("custom-settings",e)},_P=()=>{E.addEventListener(window,"message",e=>{if(e.origin!==es.getOrigin()||e.data.type!=="testResults")return;ie?.tests?.showResults(e.data.payload);let t=new CustomEvent(nt.testResults,{detail:JSON.parse(JSON.stringify(e.data.payload))});document.dispatchEvent(t)}),E.addEventListener(d_(),"click",e=>{e.preventDefault(),fr()},!1),E.addEventListener(Fn(),"click",e=>{e.preventDefault(),$i=!$i,$i?(Fn()?.classList.remove("disabled"),fr()):Fn()?.classList.add("disabled")},!1)},yP=()=>{let e=async()=>{let t=x(),s,r=document.createElement("div");r.innerHTML=Sh;let n=r.firstChild;I.show(n,{onClose:()=>{s?.destroy(),z.script.monaco&&ds.getFormatFn(x().script.language).then(l=>z.script.registerFormatter(l))}});let i=t.tests?.language||"tsx",o="jsx",a={baseUrl:R,mode:t.mode,readonly:t.readonly,editorId:"tests",container:c_(),language:o,value:t.tests?.content||"",theme:t.theme,isEmbed:J,mapLanguage:rt,getLanguageExtension:Pe,getFormatterConfig:()=>Es(x()),getFontFamily:Et,...it(t)};if(s=await et(a),ds.getFormatFn(o).then(l=>s?.registerFormatter(l)),s?.focus(),typeof s?.addTypes=="function"){let l={jest:{url:Ju,autoload:!0},chai:{url:lu,autoload:!0}};hS.load("",l,!0).then(c=>{c.forEach(p=>s?.addTypes?.(p))})}E.addEventListener(p_(),"click",async()=>{let l=s?.getValue()||"";l!==x().tests?.content&&(Jt.clearCache(),me({...x(),tests:{language:i,content:l}}),await fs()),I.close(),ie?.tests?.resetTests(),await fr(),vn()})};E.addEventListener(u_(),"click",t=>{t.preventDefault(),e()},!1),he("test-editor",e)},vP=()=>{E.addEventListener(window,"message",e=>{let t=Ts();if(!t||e.source!==t.contentWindow)return;e.data.type==="loading"&&_n(e.data.payload);let s=e.data.payload?.language;if(e.data.type==="compiled"&&s&&Pp().includes(s)){let r=ae(s);if(!r)return;Mr(r,s,e.data.payload.content||""),hr()}})},bP=()=>{let e=document.createElement("div");e.classList.add("tool-buttons","hint--top"),e.dataset.hint="Show result in new window",e.style.pointerEvents="all";let t=R+"assets/images/new-window.svg";e.innerHTML=`<span id="show-result"><img src="${t}" /></span>`;let s,r=async()=>{if(Wt&&!Wt.closed){Wt.focus();return}e.classList.add("loading");let n=await Kt({forExport:!0,singleFile:!0});s=s||URL.createObjectURL(new Blob([Uh],{type:"text/html"}));let i="#---TEMPORARY-URL---";Wt=window.open(s+i,"livecodes-result","width=800,height=400"),E.addEventListener(Wt,"load",()=>{Wt?.postMessage({result:n},location.origin)},{once:!0}),e.classList.remove("loading")};E.addEventListener(e,"click",r),E.addEventListener(e,"touchstart",r),$n()?.appendChild(e)},wP=()=>{let e=document.createElement("div");e.id="zoom-button",e.classList.add("tool-buttons","hint--top"),e.dataset.hint="Zoom",e.style.pointerEvents="all",e.innerHTML=`
  <span class="text">
    <span id="zoom-value">${String(Number(x().zoom))}</span>
    &times;
  </span>`;let t=()=>{let s=x(),r=s.zoom,n=r===1?.5:r===.5?.25:1;me({...s,zoom:n}),$p(n)};E.addEventListener(e,"click",t),E.addEventListener(e,"touchstart",t),$n()?.appendChild(e)},xP=()=>{let e=document.createElement("div");e.id="broadcast-status-btn",e.classList.add("tool-buttons","hint--top"),e.dataset.hint="Broadcast",e.style.pointerEvents="all";let t=R+"assets/images/broadcast.svg";e.innerHTML=`
  <span id="broadcast-status">
    <img src="${t}" />
    <span class="mark"></span>
  </span>`;let s=()=>{Ne("broadcast")};E.addEventListener(e,"click",s),E.addEventListener(e,"touchstart",s),$n()?.appendChild(e)},SP=async()=>{if(!J)return;let e=sg(),t=e.querySelector("img"),s=(await import(zu)).default;if(!s.fullscreenEnabled){e.style.visibility="hidden";return}E.addEventListener(s,"fullscreenchange",async()=>{if(!s.fullscreenElement){t.src=t.src.replace("collapse.svg","expand.svg"),e.dataset.hint="Full Screen";return}t.src=t.src.replace("expand.svg","collapse.svg"),e.dataset.hint="Exit Full Screen"}),E.addEventListener(e,"click",async()=>{if(s.fullscreenElement){await s.exitFullscreen();return}await s.requestFullscreen(document.body)})},LP=()=>{window.onbeforeunload=()=>{if(!Wi)return"Changes you made may not be saved."}},RS=async()=>{ie=mS(x(),R,z,E,J,fr),await ie.load(),_P(),wP(),ss().classList.remove("full")},EP=()=>{D2(),O2(),q2(),R2(),I2(),H2(),OS(),B2(),N2(),$2(),F2(),z2(),vP(),J&&(qS(),SP())},IS=async()=>{P2(),W2(),G2(),uP(),gP(),yP(),J2(),V2(),K2(),X2(),Y2(),Q2(),Z2(),sP(),dP(),eP(),tP(),rP(),fP(),hP(),mP(),nP(),iP(),oP(),qS(),aP(),lP(),cP(),pP(),bP(),xP(),LP()},kP=(e,t)=>{document.body.classList.add("embed"),e.mode==="result"&&document.body.classList.add("result"),(e.mode==="editor"||e.mode==="codeblock")&&document.body.classList.add("no-result");let s=Ao();s.classList.add("hint--bottom-left"),s.dataset.hint="Edit in LiveCodes \u{1F855}",s.title="",t.addEventListener(s,"click",async r=>{r.preventDefault(),window.open((await yn(!1,!0,!1)).url,"_blank")})},TP=()=>{me({...x(),editor:"codejar",emmet:!1,tools:{enabled:[],active:"",status:"none"}}),kr().style.display="none"},CP=({config:e,isEmbed:t,isLite:s})=>{e.mode==="full"&&(Ce.view==="editor"&&je?.show("code",!0),Ce.view==="result"&&je?.show("output",!0)),e.mode==="codeblock"&&me({...e,readonly:!0}),(e.mode==="editor"||e.mode==="codeblock"||e.mode==="result")&&(je?.destroy(),je=null),s&&TP(),(t||e.mode==="result")&&kP(e,E)},Ji=async e=>{let{config:t=X,configUrl:s,template:r,url:n}=e,i=["markup","style","script"],o=_=>i.filter(f=>_[f]?.contentUrl&&!_[f]?.content).length>0;if(!s&&!r&&!n&&!o(t))return!1;let a=document.createElement("div");a.classList.add("modal-message"),a.innerHTML="Loading Project...",I.show(a,{size:"small",isAsync:!0});let l={},c={},p={},d={};if(r){let _=await Ph(r,t,R);_?l=Ls(_):ee.error("Could not load template: "+r)}if(n){let _=n;if(n.startsWith("http")||n.startsWith("data"))try{_=new URL(n).href}catch{_=decodeURIComponent(n)}let f;Bh(_)&&!J&&(await Hp(),f=await Je?.getUser()),c=await(await import(R+"import.8c13de90b03c9f9d79034358d3f2b924.js")).importCode(_,Hn(),x(),f),Object.keys(c).length===0&&ee.error("Invalid import URL")}if(o(t)){let _=await Promise.all(i.map(f=>{let u=t[f].contentUrl;return u&&ro(u)&&!t[f].content?fetch(u).then(m=>m.text()).then(m=>({...t[f],content:m})):Promise.resolve(t[f])}));p={markup:_[0],style:_[1],script:_[2]}}let g=ro(s);return g&&(d=Ls(await fetch(g).then(_=>_.json()).catch(()=>({}))),o(d))?Ji({config:{...t,...d}}):(await It(Ys({...t,...l,...c,...p,...d}),parent.location.href,!1),I.close(),!0)},jP=async()=>{if(J||Ce["no-defaults"]||Ce.languages||Ce.template||Ce.config||Ce.active||Ce.activeEditor||Q(Ce.lang)||Q(Ce.language))return;for(let s of Object.keys(Ce))if(Q(s))return;if(x().welcome&&!Ce.screen||Ce.screen==="welcome"){Ne("welcome");return}let e=st()?.defaultTemplate;if(e){ee.info("Loading default template"),await kS(e);return}let t=st()?.language;t&&(mr=!0,await qp(t),mr=!1),ms(!0)},HS=async(e=!1)=>{e&&await L2(z,x()),Op({editor:z.script}),_n(!0),$p(x().zoom),await v2(x()),bn(x()),ie?.console?.clear(),J||setTimeout(()=>Vt().focus()),SS(),hr(),Vi(z,x()),Jt.load(Object.values(Rt||{}),x()).then(()=>{if(!x().autoupdate){_n(!1);return}setTimeout(()=>{ie?.getActiveTool()==="tests"&&["open","full"].includes(ie?.getStatus())?Ve(void 0,!0):Ve()})}),ds.load(Pp()),J&&!x().tests?.content?.trim()&&ie?.disableTool("tests")},BS=async(e,t)=>{let s=e?.config??{};R=e?.baseUrl??"/livecodes/",Di=e?.isLite??!1,J=Di||(e?.isEmbed??!1),await ef(F,J),Gi(!1),me(Ys({...x(),...s})),CP({config:x(),isEmbed:J,isLite:Di}),Jt=await Sf({config:x(),baseUrl:R,eventsManager:E}),ds=qf(x(),R,Di),$s=Pf({baseUrl:R,eventsManager:E}),Ef(x(),R,E,M2,Np,Ji),await _S(x()),EP(),await t?.(),Gi(!0),b2(),await gS(ss()),yS(x()),j2(),Dp(x().theme),J||(Hp().then(()=>US()),TS()),Ji({config:x(),configUrl:Ce.config,template:Ce.template,url:Ce.x||parent.location.hash.substring(1)}).then(async r=>{r||(await HS(),await jP()),J&&parent.dispatchEvent(new Event(nt.ready)),Up=!0}),CS(x())},DS=()=>{let e=async(f=!1)=>(await yn(f,!0,!1)).url,t=async(f=!1)=>{mt();let u=f?Ie(x()):x();return JSON.parse(JSON.stringify(u))},s=async f=>{let u={...x(),...Ys(f)};return u.mode!==x().mode&&yS(u),me(u),await It(u),u},r=async()=>(mt(),zn(ye(),Ie(x()))||await Kt({}),JSON.parse(JSON.stringify(Ur()))),n=async(f,{full:u=!1,line:m,column:b,zoom:S}={})=>{if(f==="result")je?.show("output",u),ie?.close(),S&&$p(S);else if(f==="console"||f==="compiled"||f==="tests")je?.show("output"),ie?.setActiveTool(f),u?ie?.maximize():ie?.open();else if(Object.keys(z).includes(f)){if(Ki(f),je?.show("code",u),typeof m=="number"&&m>0){let v=typeof b=="number"&&b>-1?b:0;Vt().setPosition({lineNumber:m,column:v}),Vt().focus()}}else throw new Error("Invalid panel id")},i=()=>new Promise(f=>{E.addEventListener(document,nt.testResults,u=>{f({results:u.detail?.results||[]})},{once:!0}),fr()}),o=f=>{let u=async function(){f({code:await r(),config:await t()})};return E.addEventListener(document,nt.change,u),{remove:()=>{E.removeEventListener(document,nt.change,u)}}},a=async(f,...u)=>{if(f==="setBroadcastToken"){if(J)return{error:"Command unavailable for embeds"};let m=st()?.broadcast;if(!m)return{error:"Command unavailable"};let b=u[0];return typeof b!="string"?{error:"Invalid token!"}:(qt({broadcast:{...m,userToken:b}}),{output:"Broadcast user token set successfully"})}return f==="showVersion"?{output:PS()}:{error:"Invalid command!"}},l=async()=>{Bp().forEach(f=>f?.destroy()),E.removeEventListeners(),Object.values(F).forEach(f=>f?.unsubscribeAll?.()),parent.dispatchEvent(new Event(nt.destroy)),ds?.destroy(),document.body.innerHTML="",document.head.innerHTML="",Fi=!0},c="Cannot call API methods after calling `destroy()`.",p=()=>Promise.reject(c),d=()=>{throw new Error(c)},g=f=>Fi?p():f(),_=f=>Fi?d():f();return{run:()=>g(()=>Ve()),format:f=>g(()=>Ip(f)),getShareUrl:f=>g(()=>e(f)),getConfig:f=>g(()=>t(f)),setConfig:f=>g(()=>s(f)),getCode:()=>g(()=>r()),show:(f,u)=>g(()=>n(f,u)),runTests:()=>g(()=>i()),onChange:f=>_(()=>o(f)),exec:(f,...u)=>g(()=>a(f,...u)),destroy:()=>g(()=>l())}};var hF=async(e,t)=>(await BS({config:e,baseUrl:t},async()=>{await RS(),await IS()}),DS());export{hF as app};
//# sourceMappingURL=app.js.map
