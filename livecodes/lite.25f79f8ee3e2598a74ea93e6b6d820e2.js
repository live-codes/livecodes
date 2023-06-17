var Ax=Object.create;var cp=Object.defineProperty;var Px=Object.getOwnPropertyDescriptor;var Ox=Object.getOwnPropertyNames;var qx=Object.getPrototypeOf,Rx=Object.prototype.hasOwnProperty;var h=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ix=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ox(t))!Rx.call(e,n)&&n!==s&&cp(e,n,{get:()=>t[n],enumerable:!(r=Px(t,n))||r.enumerable});return e};var pp=(e,t,s)=>(s=e!=null?Ax(qx(e)):{},Ix(t||!e||!e.__esModule?cp(s,"default",{value:e,enumerable:!0}):s,e));var vm=h((F3,nn)=>{var ym=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",r={};function n(o,a){if(!r[o]){r[o]={};for(var l=0;l<o.length;l++)r[o][o.charAt(l)]=l}return r[o][a]}var i={compressToBase64:function(o){if(o==null)return"";var a=i._compress(o,6,function(l){return t.charAt(l)});switch(a.length%4){default:case 0:return a;case 1:return a+"===";case 2:return a+"==";case 3:return a+"="}},decompressFromBase64:function(o){return o==null?"":o==""?null:i._decompress(o.length,32,function(a){return n(t,o.charAt(a))})},compressToUTF16:function(o){return o==null?"":i._compress(o,15,function(a){return e(a+32)})+" "},decompressFromUTF16:function(o){return o==null?"":o==""?null:i._decompress(o.length,16384,function(a){return o.charCodeAt(a)-32})},compressToUint8Array:function(o){for(var a=i.compress(o),l=new Uint8Array(a.length*2),c=0,p=a.length;c<p;c++){var m=a.charCodeAt(c);l[c*2]=m>>>8,l[c*2+1]=m%256}return l},decompressFromUint8Array:function(o){if(o==null)return i.decompress(o);for(var a=new Array(o.length/2),l=0,c=a.length;l<c;l++)a[l]=o[l*2]*256+o[l*2+1];var p=[];return a.forEach(function(m){p.push(e(m))}),i.decompress(p.join(""))},compressToEncodedURIComponent:function(o){return o==null?"":i._compress(o,6,function(a){return s.charAt(a)})},decompressFromEncodedURIComponent:function(o){return o==null?"":o==""?null:(o=o.replace(/ /g,"+"),i._decompress(o.length,32,function(a){return n(s,o.charAt(a))}))},compress:function(o){return i._compress(o,16,function(a){return e(a)})},_compress:function(o,a,l){if(o==null)return"";var c,p,m={},y={},b="",f="",u="",d=2,v=3,S=2,w=[],g=0,_=0,A;for(A=0;A<o.length;A+=1)if(b=o.charAt(A),Object.prototype.hasOwnProperty.call(m,b)||(m[b]=v++,y[b]=!0),f=u+b,Object.prototype.hasOwnProperty.call(m,f))u=f;else{if(Object.prototype.hasOwnProperty.call(y,u)){if(u.charCodeAt(0)<256){for(c=0;c<S;c++)g=g<<1,_==a-1?(_=0,w.push(l(g)),g=0):_++;for(p=u.charCodeAt(0),c=0;c<8;c++)g=g<<1|p&1,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=p>>1}else{for(p=1,c=0;c<S;c++)g=g<<1|p,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=0;for(p=u.charCodeAt(0),c=0;c<16;c++)g=g<<1|p&1,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=p>>1}d--,d==0&&(d=Math.pow(2,S),S++),delete y[u]}else for(p=m[u],c=0;c<S;c++)g=g<<1|p&1,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=p>>1;d--,d==0&&(d=Math.pow(2,S),S++),m[f]=v++,u=String(b)}if(u!==""){if(Object.prototype.hasOwnProperty.call(y,u)){if(u.charCodeAt(0)<256){for(c=0;c<S;c++)g=g<<1,_==a-1?(_=0,w.push(l(g)),g=0):_++;for(p=u.charCodeAt(0),c=0;c<8;c++)g=g<<1|p&1,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=p>>1}else{for(p=1,c=0;c<S;c++)g=g<<1|p,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=0;for(p=u.charCodeAt(0),c=0;c<16;c++)g=g<<1|p&1,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=p>>1}d--,d==0&&(d=Math.pow(2,S),S++),delete y[u]}else for(p=m[u],c=0;c<S;c++)g=g<<1|p&1,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=p>>1;d--,d==0&&(d=Math.pow(2,S),S++)}for(p=2,c=0;c<S;c++)g=g<<1|p&1,_==a-1?(_=0,w.push(l(g)),g=0):_++,p=p>>1;for(;;)if(g=g<<1,_==a-1){w.push(l(g));break}else _++;return w.join("")},decompress:function(o){return o==null?"":o==""?null:i._decompress(o.length,32768,function(a){return o.charCodeAt(a)})},_decompress:function(o,a,l){var c=[],p,m=4,y=4,b=3,f="",u=[],d,v,S,w,g,_,A,L={val:l(0),position:a,index:1};for(d=0;d<3;d+=1)c[d]=d;for(S=0,g=Math.pow(2,2),_=1;_!=g;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),S|=(w>0?1:0)*_,_<<=1;switch(p=S){case 0:for(S=0,g=Math.pow(2,8),_=1;_!=g;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),S|=(w>0?1:0)*_,_<<=1;A=e(S);break;case 1:for(S=0,g=Math.pow(2,16),_=1;_!=g;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),S|=(w>0?1:0)*_,_<<=1;A=e(S);break;case 2:return""}for(c[3]=A,v=A,u.push(A);;){if(L.index>o)return"";for(S=0,g=Math.pow(2,b),_=1;_!=g;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),S|=(w>0?1:0)*_,_<<=1;switch(A=S){case 0:for(S=0,g=Math.pow(2,8),_=1;_!=g;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),S|=(w>0?1:0)*_,_<<=1;c[y++]=e(S),A=y-1,m--;break;case 1:for(S=0,g=Math.pow(2,16),_=1;_!=g;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),S|=(w>0?1:0)*_,_<<=1;c[y++]=e(S),A=y-1,m--;break;case 2:return u.join("")}if(m==0&&(m=Math.pow(2,b),b++),c[A])f=c[A];else if(A===y)f=v+v.charAt(0);else return null;u.push(f),c[y++]=v+f.charAt(0),m--,v=f,m==0&&(m=Math.pow(2,b),b++)}}};return i}();typeof define=="function"&&define.amd?define(function(){return ym}):typeof nn<"u"&&nn!=null&&(nn.exports=ym)});var ks=h((mo,Wh)=>{var GS=Object.prototype.hasOwnProperty;mo=function(e,t){return GS.call(e,t)};Wh.exports=mo});var Ee=h((_n,Gh)=>{var JS=ks();Object.keys?_n=Object.keys:_n=function(e){var t=[];for(var s in e)JS(e,s)&&t.push(s);return t};Gh.exports=_n});var vn=h((yn,Kh)=>{var VS=Ee();yn=function(e){return KS.test(e)?e.replace(XS,YS):e};var Jh=yn.map={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},Vh="(?:"+VS(Jh).join("|")+")",KS=new RegExp(Vh),XS=new RegExp(Vh,"g"),YS=function(e){return Jh[e]};Kh.exports=yn});var Qe=h((fo,Xh)=>{fo=function(e){return e==null?"":e.toString()};Xh.exports=fo});var Qh=h((ho,Yh)=>{ho=function(e,t,s){return Array.prototype.indexOf.call(e,t,s)};Yh.exports=ho});var ot=h((go,Zh)=>{var QS=Object.prototype.toString;go=function(e){return QS.call(e)};Zh.exports=go});var ee=h((_o,eg)=>{var ZS=ot();_o=function(e){return ZS(e)==="[object String]"};eg.exports=_o});var kt=h((yo,tg)=>{var eL=ot();yo=function(e){return eL(e)==="[object Number]"};tg.exports=yo});var He=h((vo,sg)=>{var tL=ot();vo=function(e){var t=tL(e);return t==="[object Function]"||t==="[object GeneratorFunction]"||t==="[object AsyncFunction]"};sg.exports=vo});var Tt=h((bo,rg)=>{var sL=kt(),rL=He(),nL=Math.pow(2,53)-1;bo=function(e){if(!e)return!1;var t=e.length;return sL(t)&&t>=0&&t<=nL&&!rL(e)};rg.exports=bo});var Re=h((wo,ng)=>{wo=function(e){return e===void 0};ng.exports=wo});var So=h((xo,ig)=>{var iL=Re();xo=function(e,t,s){if(iL(t))return e;switch(s??3){case 1:return function(r){return e.call(t,r)};case 3:return function(r,n,i){return e.call(t,r,n,i)};case 4:return function(r,n,i,o){return e.call(t,r,n,i,o)}}return function(){return e.apply(t,arguments)}};ig.exports=xo});var G=h((Lo,og)=>{var oL=Tt(),aL=Ee(),lL=So();Lo=function(e,t,s){t=lL(t,s);var r,n;if(oL(e))for(r=0,n=e.length;r<n;r++)t(e[r],r,e);else{var i=aL(e);for(r=0,n=i.length;r<n;r++)t(e[i[r]],i[r],e)}return e};og.exports=Lo});var lg=h((Eo,ag)=>{var cL=G();Eo=function(e){var t=[];return cL(e,function(s){t.push(s)}),t};ag.exports=Eo});var at=h((ko,cg)=>{var pL=Qh(),uL=ee(),dL=Tt(),mL=lg();ko=function(e,t){return uL(e)?e.indexOf(t)>-1:(dL(e)||(e=mL(e)),pL(e,t)>=0)};cg.exports=ko});var Vt=h((To,pg)=>{To=function(e,t){return e.indexOf(t)===0};pg.exports=To});var jo=h((Co,ug)=>{var fL=Qe();Co=function(e){return fL(e).replace(hL,function(t){switch(t){case'"':case"'":case"\\":return"\\"+t;case`
`:return"\\n";case"\r":return"\\r";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029"}})};var hL=/["'\\\n\r\u2028\u2029]/g;ug.exports=Co});var Uo=h((Mo,dg)=>{Mo=function(e,t){var s=e.length-t.length;return s>=0&&e.indexOf(t,s)===s};dg.exports=Mo});var Be=h((bn,mg)=>{var gL=ot();Array.isArray?bn=Array.isArray:bn=function(e){return gL(e)==="[object Array]"};mg.exports=bn});var hg=h((Ao,fg)=>{var _L=ot();Ao=function(e){return _L(e)==="[object Arguments]"};fg.exports=Ao});var wn=h((Po,gg)=>{var yL=Tt(),vL=Be(),bL=ee(),wL=hg(),xL=Ee();Po=function(e){return e==null?!0:yL(e)&&(vL(e)||bL(e)||wL(e))?e.length===0:xL(e).length===0};gg.exports=Po});var nr=h((Oo,_g)=>{Oo=function(e){return e.length<1?e:e[0].toUpperCase()+e.slice(1)};_g.exports=Oo});var qo=h(Ts=>{"use strict";var SL=Ts&&Ts.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ts,"__esModule",{value:!0});Ts.getObjType=void 0;var LL=SL(nr());function EL(e){return e.constructor&&e.constructor.name?e.constructor.name:LL.default({}.toString.call(e).replace(/(\[object )|]/g,""))}Ts.getObjType=EL});var ke=h((Ro,yg)=>{Ro=function(e){var t=typeof e;return!!e&&(t==="function"||t==="object")};yg.exports=Ro});var xn=h((Io,bg)=>{var kL=Re(),vg=G();Io=function(e,t){return function(s){return vg(arguments,function(r,n){if(n!==0){var i=e(r);vg(i,function(o){(!t||kL(s[o]))&&(s[o]=r[o])})}}),s}};bg.exports=Io});var xg=h((Ho,wg)=>{var TL=Ee(),CL=xn();Ho=CL(TL);wg.exports=Ho});var Lg=h((Bo,Sg)=>{var jL=Ee();Bo=function(e,t){var s=jL(t),r=s.length;if(e==null)return!r;e=Object(e);for(var n=0;n<r;n++){var i=s[n];if(t[i]!==e[i]||!(i in e))return!1}return!0};Sg.exports=Bo});var kg=h((Do,Eg)=>{var ML=xg(),UL=Lg();Do=function(e){return e=ML({},e),function(t){return UL(t,e)}};Eg.exports=Do});var Cg=h((No,Tg)=>{No=function(e){return e};Tg.exports=No});var Sn=h(($o,jg)=>{var AL=ks(),PL=Be();$o=function(e,t){if(PL(e))return e;if(t&&AL(t,e))return[e];var s=[];return e.replace(OL,function(r,n,i,o){s.push(i?o.replace(qL,"$1"):n||r)}),s};var OL=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,qL=/\\(\\)?/g;jg.exports=$o});var zo=h((Fo,Mg)=>{var RL=Re(),IL=Sn();Fo=function(e,t){t=IL(t,e);var s;for(s=t.shift();!RL(s);){if(e=e[s],e==null)return;s=t.shift()}return e};Mg.exports=Fo});var Ag=h((Wo,Ug)=>{var HL=Be(),BL=zo();Wo=function(e){return HL(e)?function(t){return BL(t,e)}:DL(e)};function DL(e){return function(t){return t?.[e]}}Ug.exports=Wo});var ir=h((Go,Pg)=>{var NL=He(),$L=ke(),FL=Be(),zL=So(),WL=kg(),GL=Cg(),JL=Ag();Go=function(e,t,s){return e==null?GL:NL(e)?zL(e,t,s):$L(e)&&!FL(e)?WL(e):JL(e)};Pg.exports=Go});var Cs=h((Jo,Og)=>{var VL=ir(),KL=Ee(),XL=Tt();Jo=function(e,t,s){t=VL(t,s);for(var r=!XL(e)&&KL(e),n=(r||e).length,i=Array(n),o=0;o<n;o++){var a=r?r[o]:o;i[o]=t(e[a],a,e)}return i};Og.exports=Jo});var Rg=h((Vo,qg)=>{var YL=/^\s+/;Vo=function(e,t){if(t==null)return e.trimLeft?e.trimLeft():e.replace(YL,"");for(var s=0,r=e.length,n=t.length,i=!0,o,a;i&&s<r;)for(i=!1,o=-1,a=e.charAt(s);++o<n;)if(a===t[o]){i=!0,s++;break}return s>=r?"":e.substr(s,r)};qg.exports=Vo});var Hg=h((Ko,Ig)=>{Ko=function(e,t){if(t==null){if(e.trimRight)return e.trimRight();t=` \r
	\f\v`}for(var s=e.length-1,r=t.length,n=!0,i,o;n&&s>=0;)for(n=!1,i=-1,o=e.charAt(s);++i<r;)if(o===t[i]){n=!0,s--;break}return s>=0?e.substring(0,s+1):""};Ig.exports=Ko});var Kt=h((Xo,Bg)=>{var QL=Rg(),ZL=Hg();Xo=function(e,t){return t==null&&e.trim?e.trim():QL(ZL(e,t),t)};Bg.exports=Xo});var Qo=h((Yo,Dg)=>{Yo=typeof window=="object"&&typeof document=="object"&&document.nodeType===9;Dg.exports=Yo});var Ln=h((Zo,Ng)=>{var eE=Qo();Zo=eE?window:global;Ng.exports=Zo});var En=h((ea,$g)=>{ea=function(e){var t=e?e.length:0;if(t)return e[t-1]};$g.exports=ea});var zg=h((ta,Fg)=>{var tE=G(),sE=Re(),rE=He();ta=function(e,t){sE(t)&&(t=!0);var s=rE(t),r={};return tE(e,function(n){r[n]=s?t(n):t}),r};Fg.exports=ta});var Xt=h((sa,Wg)=>{var nE=Qe();sa=function(e){return nE(e).toLocaleLowerCase()};Wg.exports=sa});var Xg=h((ra,Kg)=>{var kn=En(),iE=zg(),Tn=Vt(),Gg=Xt();ra=function(e,t){for(var s=[],r,n=e;e;){if(r=!0,!kn(s)||!lE[kn(s)]){if(Tn(e,"<!--")){var i=e.indexOf("-->");i>=0&&(t.comment&&t.comment(e.substring(4,i)),e=e.substring(i+3),r=!1)}else if(Tn(e,"<!")){var o=e.match(oE);o&&(t.text&&t.text(e.substring(0,o[0].length)),e=e.substring(o[0].length),r=!1)}else if(Tn(e,"</")){var a=e.match(Jg);a&&(e=e.substring(a[0].length),a[0].replace(Jg,f),r=!1)}else if(Tn(e,"<")){var l=e.match(Vg);l&&(e=e.substring(l[0].length),l[0].replace(Vg,b),r=!1)}if(r){var c=e.indexOf("<"),p=c<0?e:e.substring(0,c);e=c<0?"":e.substring(c),t.text&&t.text(p)}}else{var m=new RegExp("</".concat(kn(s),"[^>]*>")).exec(e);if(m){var y=e.substring(0,m.index);e=e.substring(m.index+m[0].length),y&&t.text&&t.text(y)}f("",kn(s))}if(n===e)throw Error("Parse Error: "+e);n=e}f();function b(u,d,v,S){if(d=Gg(d),S=!!S,S||s.push(d),t.start){var w={};v.replace(aE,function(g,_,A,L,H){w[_]=A||L||H||""}),t.start(d,w,S)}}function f(u,d){d=Gg(d);var v;if(!d)v=0;else for(v=s.length-1;v>=0&&s[v]!==d;v--);if(v>=0){for(var S=s.length-1;S>=v;S--)t.end&&t.end(s[S]);s.length=v}}};var oE=/^<!\s*doctype((?:\s+[\w:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i,Jg=/^<\/([-A-Za-z0-9_]+)[^>]*>/,Vg=/^<([-A-Za-z0-9_]+)((?:\s+[-A-Za-z0-9_:@.]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i,aE=/([-A-Za-z0-9_:@.]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,lE=iE("script,style".split(","));Kg.exports=ra});var Cn=h((na,Zg)=>{var cE=ke(),pE=He(),Yg=Object.getPrototypeOf,Qg={}.constructor;na=function(e){if(cE(e)){if(Yg)return Yg(e);var t=e.__proto__;if(t||t===null)return t;if(pE(e.constructor))return e.constructor.prototype;if(e instanceof Qg)return Qg.prototype}};Zg.exports=na});var or=h((ia,e_)=>{var uE=ir(),dE=G();ia=function(e,t,s){var r=[];return t=uE(t,s),dE(e,function(n,i,o){t(n,i,o)&&r.push(n)}),r};e_.exports=ia});var jn=h((oa,t_)=>{var mE=or();oa=function(e,t){return t=t||fE,mE(e,function(s,r,n){for(var i=n.length;++r<i;)if(t(s,n[r]))return!1;return!0})};function fE(e,t){return e===t}t_.exports=oa});var ar=h((la,n_)=>{var s_=Ee(),hE=Cn(),gE=jn(),aa=Object.getOwnPropertyNames,r_=Object.getOwnPropertySymbols;la=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.prototype,r=s===void 0?!0:s,n=t.unenumerable,i=n===void 0?!1:n,o=t.symbol,a=o===void 0?!1:o,l=[];if((i||a)&&aa){var c=s_;i&&aa&&(c=aa);do l=l.concat(c(e)),a&&r_&&(l=l.concat(r_(e)));while(r&&(e=hE(e))&&e!==Object.prototype);l=gE(l)}else if(r)for(var p in e)l.push(p);else l=s_(e);return l};n_.exports=la});var Yt=h((ca,i_)=>{var _E=xn(),yE=ar();ca=_E(yE);i_.exports=ca});var lt=h((pa,o_)=>{var vE=Tt(),bE=Cs(),wE=Be(),xE=ee();pa=function(e){return e?wE(e)?e:vE(e)&&!xE(e)?bE(e):[e]:[]};o_.exports=pa});var da=h((ua,l_)=>{var SE=ke();ua=function(e){if(!SE(e))return{};if(a_)return a_(e);function t(){}return t.prototype=e,new t};var a_=Object.create;l_.exports=ua});var p_=h((ma,c_)=>{var LE=da();ma=function(e,t){e.prototype=LE(t.prototype)};c_.exports=ma});var ha=h((fa,u_)=>{var EE=He();fa=typeof wx<"u"&&EE(wx.openLocation);u_.exports=fa});var js=h((Mn,g_)=>{var d_=Yt(),m_=lt(),f_=p_(),kE=zo(),TE=ha();Mn=function(e,t){return CE.extend(e,t)};function h_(e,t,s){s=s||{};var r=t.className||kE(t,"initialize.name")||"";delete t.className;var n=function(){var i=m_(arguments);return this.initialize?this.initialize.apply(this,i)||this:this};if(!TE)try{n=new Function("toArr","return function "+r+"(){var args = toArr(arguments);return this.initialize ? this.initialize.apply(this, args) || this : this;};")(m_)}catch{}return f_(n,e),n.prototype.constructor=n,n.extend=function(i,o){return h_(n,i,o)},n.inherits=function(i){f_(n,i)},n.methods=function(i){return d_(n.prototype,i),n},n.statics=function(i){return d_(n,i),n},n.methods(t).statics(s),n}var CE=Mn.Base=h_(Object,{className:"Base",callSuper:function(e,t,s){var r=e.prototype[t];return r.apply(this,s)},toString:function(){return this.constructor.name}});g_.exports=Mn});var y_=h((ga,__)=>{ga=function(e){var t=e.length,s=Array(t);t--;for(var r=0;r<=t;r++)s[t-r]=e[r];return s};__.exports=ga});var ya=h((_a,v_)=>{var jE=js(),ME=y_();_a=jE({initialize:function(){this.clear()},clear:function(){this._items=[],this.size=0},push:function(e){return this._items.push(e),++this.size},pop:function(){if(this.size)return this.size--,this._items.pop()},peek:function(){return this._items[this.size-1]},forEach:function(e,t){t=arguments.length>1?t:this;for(var s=this._items,r=this.size-1,n=0;r>=0;r--,n++)e.call(t,s[r],n,this)},toArr:function(){return ME(this._items)}});v_.exports=_a});var w_=h((va,b_)=>{var UE=ir(),AE=Ee();va=function(e,t,s){t=UE(t,s);for(var r=AE(e),n=r.length,i={},o=0;o<n;o++){var a=r[o];i[a]=t(e[a],a,e)}return i};b_.exports=va});var E_=h((wa,L_)=>{var PE=Xg(),OE=ya(),S_=Be(),x_=G(),qE=ee(),RE=w_();function IE(e){var t=[],s=new OE;return PE(e,{start:function(r,n){n=RE(n,function(i){return HE(i)}),s.push({tag:r,attrs:n})},end:function(){var r=s.pop();if(!s.size){t.push(r);return}var n=s.peek();S_(n.content)||(n.content=[]),n.content.push(r)},comment:function(r){var n="<!--".concat(r,"-->"),i=s.peek();if(!i){t.push(n);return}i.content||(i.content=[]),i.content.push(n)},text:function(r){var n=s.peek();if(!n){t.push(r);return}n.content||(n.content=[]),n.content.push(r)}}),t}function ba(e){var t="";return S_(e)?x_(e,function(s){return t+=ba(s)}):qE(e)?t=e:(t+="<".concat(e.tag),x_(e.attrs,function(s,r){return t+=" ".concat(r,'="').concat(BE(s),'"')}),t+=">",e.content&&(t+=ba(e.content)),t+="</".concat(e.tag,">")),t}var HE=function(e){return e.replace(/&quot;/g,'"')},BE=function(e){return e.replace(/"/g,"&quot;")};wa={parse:IE,stringify:ba};L_.exports=wa});var Ms=h((xa,T_)=>{var DE=kt(),k_=ke(),NE=He(),$E=ee();xa=function(e){if(DE(e))return e;if(k_(e)){var t=NE(e.valueOf)?e.valueOf():e;e=k_(t)?t+"":t}return $E(e)?+e:e===0?e:+e};T_.exports=xa});var An=h(le=>{"use strict";var Qt=le&&le.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(le,"__esModule",{value:!0});le.pxToNum=le.executeAfterTransition=le.hasVerticalScrollbar=le.measuredScrollbarWidth=le.eventClient=le.drag=le.classPrefix=void 0;var FE=Qt(Cs()),zE=Qt(Kt()),WE=Qt(Ln()),C_=Qt(E_()),GE=Qt(kt()),JE=Qt(at()),VE=Qt(Ms());function KE(e){let t=`luna-${e}-`;function s(r){return FE.default(zE.default(r).split(/\s+/),n=>JE.default(n,t)?n:n.replace(/[\w-]+/,i=>`${t}${i}`)).join(" ")}return function(r){if(/<[^>]*>/g.test(r))try{let n=C_.default.parse(r);return j_(n,i=>{i.attrs&&i.attrs.class&&(i.attrs.class=s(i.attrs.class))}),C_.default.stringify(n)}catch{return s(r)}return s(r)}}le.classPrefix=KE;function j_(e,t){for(let s=0,r=e.length;s<r;s++){let n=e[s];t(n),n.content&&j_(n.content,t)}}var XE="ontouchstart"in WE.default,YE={start:"touchstart",move:"touchmove",end:"touchend"},QE={start:"mousedown",move:"mousemove",end:"mouseup"};function ZE(e){return XE?YE[e]:QE[e]}le.drag=ZE;function ek(e,t){let s=e==="x"?"clientX":"clientY";return t[s]?t[s]:t.changedTouches?t.changedTouches[0][s]:0}le.eventClient=ek;var Un;function tk(){if(GE.default(Un))return Un;if(!document)return 16;let e=document.createElement("div"),t=document.createElement("div");return e.setAttribute("style","display: block; width: 100px; height: 100px; overflow: scroll;"),t.setAttribute("style","height: 200px"),e.appendChild(t),document.body.appendChild(e),Un=e.offsetWidth-e.clientWidth,document.body.removeChild(e),Un}le.measuredScrollbarWidth=tk;function sk(e){return e.scrollHeight>e.offsetHeight}le.hasVerticalScrollbar=sk;function rk(e,t){let s=r=>{r.target===e&&(e.removeEventListener("transitionend",s),t())};e.addEventListener("transitionend",s)}le.executeAfterTransition=rk;function nk(e){return VE.default(e.replace("px",""))}le.pxToNum=nk});var P_=h(lr=>{"use strict";var Ct=lr&&lr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(lr,"__esModule",{value:!0});var ik=Ct(vn()),ok=Ct(Qe()),ak=Ct(at()),lk=Ct(Vt()),ck=Ct(jo()),M_=Ct(G()),pk=Ct(Uo()),uk=Ct(wn()),U_=qo(),dk=An(),Us=dk.classPrefix("console");function La(e,{topObj:t,level:s=0,getterVal:r=!1,unenumerable:n=!0}={}){let i="",o="",l=[],c=[],p="",y;t=t||e;let b={getterVal:r,unenumerable:n,level:s+1},f=s===0,u=`<span class="${Us("key")}">`,d=`<span class="${Us("number")}">`,v=`<span class="${Us("null")}">`,S=`<span class="${Us("string")}">`,w=`<span class="${Us("boolean")}">`,g=`<span class="${Us("special")}">`,_=W=>ik.default(W).replace(/\\n/g,"\u21B5").replace(/\\f|\\r|\\t/g,"").replace(/\\/g,""),A="</span>",L=W=>u+_(W)+A,H=W=>d+W+A,$=W=>S+W+A,Ce=W=>w+W+A,Ue=W=>v+W+A;function ve(W){return W=ok.default(W),ak.default(mk,W)||lk.default(W,"Array[")?g+_(W)+A:S+_(`"${W}"`)+A}function be(W){if(y>5){p=", \u2026";return}let It=L(Sa(W));if(!r){let je=Object.getOwnPropertyDescriptor(e,W);if(je&&je.get){l.push(`${It}: ${ve("(...)")}`),y++;return}}l.push(`${It}: ${La(t[W],b)}`),y++}try{o={}.toString.call(e)}catch{o="[object Object]"}let xt=o=="[object String]",rt=o=="[object Array]",us=o=="[object Object]",Rt=o=="[object Number]",gi=o=="[object RegExp]",zr=o=="[object Symbol]",_i=o=="[object Function]",Wr=o=="[object Boolean]";if(xt)i=ve(Sa(e));else if(gi)i=$(Sa(e.toString()));else if(_i)i=ve("\u0192");else if(rt)if(f){i="[";let W=e.length,It="";W>100&&(W=100,It=", \u2026");for(let je=0;je<W;je++)l.push(`${La(e[je],b)}`);i+=l.join(", ")+It+"]"}else i=`Array(${e.length})`;else if(us)A_(e)&&(e=Object.getPrototypeOf(e)),c=n?Object.getOwnPropertyNames(e):Object.keys(e),f?(y=1,i="{",M_.default(c,be),i+=l.join(", ")+p+"}"):(i=U_.getObjType(e),i==="Object"&&(i="{\u2026}"));else if(Rt)i=e+"",pk.default(i,"Infinity")||i==="NaN"?i=`"${i}"`:i=H(i);else if(Wr)i=Ce(e?"true":"false");else if(e===null)i=Ue("null");else if(zr)i=ve("Symbol");else if(e===void 0)i=ve("undefined");else try{A_(e)&&(e=Object.getPrototypeOf(e)),f?(y=1,i="{",c=n?Object.getOwnPropertyNames(e):Object.keys(e),M_.default(c,be),i+=l.join(", ")+p+"}"):(i=U_.getObjType(e),i==="Object"&&(i="{\u2026}"))}catch{i=ve(e)}return i}lr.default=La;var mk=["(...)","undefined","Symbol","Object","\u0192"];function A_(e){let t=uk.default(Object.getOwnPropertyNames(e)),s=Object.getPrototypeOf(e);return t&&s&&s!==Object.prototype}function Sa(e){return ck.default(e).replace(/\\'/g,"'").replace(/\t/g,"\\t")}});var q_=h((Ea,O_)=>{Ea=function(e,t,s){var r=e.length;t==null?t=0:t<0?t=Math.max(r+t,0):t=Math.min(t,r),s==null?s=r:s<0?s=Math.max(r+s,0):s=Math.min(s,r);for(var n=[];t<s;)n.push(e[t++]);return n};O_.exports=Ea});var Pn=h((ka,R_)=>{ka=function(e,t){return t=t==null?e.length-1:+t,function(){var s=Math.max(arguments.length-t,0),r=new Array(s),n;for(n=0;n<s;n++)r[n]=arguments[n+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var i=new Array(t+1);for(n=0;n<t;n++)i[n]=arguments[n];return i[t]=r,e.apply(this,i)}};R_.exports=ka});var H_=h((Ta,I_)=>{var fk=Pn(),hk=lt();Ta=fk(function(e,t){return function(){var s=[];return s=s.concat(t),s=s.concat(hk(arguments)),e.apply(this,s)}});I_.exports=Ta});var D_=h((Ca,B_)=>{Ca=function(e,t){var s;return function(){return--e>0&&(s=t.apply(this,arguments)),e<=1&&(t=null),s}};B_.exports=Ca});var $_=h((ja,N_)=>{var gk=H_(),_k=D_();ja=gk(_k,2);N_.exports=ja});var Ua=h((Ma,F_)=>{var yk=ke(),vk=Be(),bk=Yt();Ma=function(e){return yk(e)?vk(e)?e.slice():bk({},e):e};F_.exports=Ma});var cr=h((On,G_)=>{var wk=js(),z_=ks(),W_=G(),xk=q_(),Sk=$_(),Lk=Ua();On=wk({initialize:function(){this._events=this._events||{}},on:function(e,t){return this._events[e]=this._events[e]||[],this._events[e].push(t),this},off:function(e,t){var s=this._events;if(z_(s,e)){var r=s[e].indexOf(t);return r>-1&&s[e].splice(r,1),this}},once:function(e,t){return this.on(e,Sk(t)),this},emit:function(e){var t=this;if(z_(this._events,e)){var s=xk(arguments,1),r=Lk(this._events[e]);return W_(r,function(n){return n.apply(t,s)},this),this}},removeAllListeners:function(e){return e?delete this._events[e]:this._events={},this}},{mixin:function(e){W_(["on","off","once","emit","removeAllListeners"],function(t){e[t]=On.prototype[t]}),e._events=e._events||{}}});G_.exports=On});var Pa=h((Aa,J_)=>{Aa=function(e){return e===!0||e===!1};J_.exports=Aa});var K_=h((Oa,V_)=>{Oa=function(e){return e==null};V_.exports=Oa});var Ra=h((qa,X_)=>{var Ek=K_();qa=function(e){if(Ek(e))return"";try{return kk.call(e)}catch{}try{return e+""}catch{}return""};var kk=Function.prototype.toString;X_.exports=qa});var Ha=h((Ia,Q_)=>{var Tk=ke(),Y_=He();Ia=function(e){return Tk(e)&&Y_(e.then)&&Y_(e.catch)};Q_.exports=Ia});var Da=h((Ba,Z_)=>{var Ck=kt();Ba=function(e){return Ck(e)&&e!==+e};Z_.exports=Ba});var ty=h((Na,ey)=>{var jk=He();Na=function(e){return e==null?!1:e._isBuffer?!0:e.constructor&&jk(e.constructor.isBuffer)&&e.constructor.isBuffer(e)};ey.exports=Na});var Fa=h(($a,sy)=>{var Mk=ot(),Uk=Da(),Ak=Xt(),Pk=ty();$a=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,s;return e===null&&(s="Null"),e===void 0&&(s="Undefined"),Uk(e)&&(s="NaN"),Pk(e)&&(s="Buffer"),s||(s=Mk(e).match(Ok),s&&(s=s[1])),s?t?Ak(s):s:""};var Ok=/^\[object\s+(.*?)]$/;sy.exports=$a});var ny=h((za,ry)=>{var qk=Pn();za=qk(function(e,t){for(var s=e.length,r=0,n=t.length;r<n;r++)for(var i=t[r],o=0,a=i.length;o<a;o++)e[s++]=i[o];return e.length=s,e});ry.exports=za});var Wa=h((pr,iy)=>{var Rk=js(),Ik=ee(),Hk=G(),Bk=ny();pr=Rk({className:"Select",initialize:function(e){if(this.length=0,!e)return this;if(Ik(e))return Dk.find(e);e.nodeType&&(this[0]=e,this.length=1)},find:function(e){var t=new pr;return this.each(function(){Bk(t,this.querySelectorAll(e))}),t},each:function(e){return Hk(this,function(t,s){e.call(t,s,t)}),this}});var Dk=new pr(document);iy.exports=pr});var Ze=h((Ga,oy)=>{var Nk=ee(),$k=lt(),Fk=Wa();Ga=function(e){return $k(Nk(e)?new Fk(e):e)};oy.exports=Ga});var ly=h((Ja,ay)=>{var zk=Ze();Ja=function(e){e=zk(e);var t=e[0],s=t.getBoundingClientRect();return{left:s.left+window.pageXOffset,top:s.top+window.pageYOffset,width:Math.round(s.width),height:Math.round(s.height)}};ay.exports=Ja});var py=h((Ka,cy)=>{var Wk=G(),Gk=Ze();Ka=function(e){e=Gk(e),Wk(e,function(t){Jk(t)&&(t.style.display=Vk(t.nodeName))})};function Jk(e){return getComputedStyle(e,"").getPropertyValue("display")=="none"}var Va={};function Vk(e){var t,s;return Va[e]||(t=document.createElement(e),document.documentElement.appendChild(t),s=getComputedStyle(t,"").getPropertyValue("display"),t.parentNode.removeChild(t),s=="none"&&(s="block"),Va[e]=s),Va[e]}cy.exports=Ka});var Ya=h((Xa,uy)=>{var Kk=/([A-Z])/g,Xk=/[_.\- ]+/g,Yk=/(^-)|(-$)/g;Xa=function(e){return e=e.replace(Kk,"-$1").toLowerCase().replace(Xk,"-").replace(Yk,""),e.split("-")};uy.exports=Xa});var Za=h((Qa,dy)=>{var Qk=Ya();Qa=function(e){return Qk(e).join("-")};dy.exports=Qa});var fy=h((el,my)=>{var Zk=ks();el=function(e,t){var s=function(r){var n=s.cache,i=""+(t?t.apply(this,arguments):r);return Zk(n,i)||(n[i]=e.apply(this,arguments)),n[i]};return s.cache={},s};my.exports=el});var gy=h((tl,hy)=>{var eT=Ya();tl=function(e){var t=eT(e),s=t[0];return t.shift(),t.forEach(tT,t),s+=t.join(""),s};function tT(e,t){this[t]=e.replace(/\w/,function(s){return s.toUpperCase()})}hy.exports=tl});var Sy=h((ur,xy)=>{var by=fy(),sT=gy(),rT=nr(),_y=ks(),nT=Za();ur=by(function(e){if(e=e.replace(wy,""),e=sT(e),_y(vy,e))return e;for(var t=yy.length;t--;){var s=yy[t]+rT(e);if(_y(vy,s))return s}return e});ur.dash=by(function(e){var t=ur(e);return(wy.test(t)?"-":"")+nT(t)});var yy=["O","ms","Moz","Webkit"],wy=/^(O)|(ms)|(Moz)|(Webkit)|(-o-)|(-ms-)|(-moz-)|(-webkit-)/g,vy=document.createElement("p").style;xy.exports=ur});var rl=h((sl,ky)=>{var iT=ee(),oT=ke(),aT=Za(),lT=Re(),cT=at(),pT=kt(),uT=Ze(),Ey=Sy(),Ly=G();sl=function(e,t,s){e=uT(e);var r=lT(s)&&iT(t);if(r)return dT(e[0],t);var n=t;oT(n)||(n={},n[t]=s),mT(e,n)};function dT(e,t){return e.style[Ey(t)]||getComputedStyle(e,"").getPropertyValue(t)}function mT(e,t){Ly(e,function(s){var r=";";Ly(t,function(n,i){i=Ey.dash(i),r+=i+":"+hT(i,n)+";"}),s.style.cssText+=r})}var fT=["column-count","columns","font-weight","line-weight","opacity","z-index","zoom"];function hT(e,t){var s=pT(t)&&!cT(fT,aT(e));return s?t+"px":t}ky.exports=sl});var nl=h((Rn,Cy)=>{var gT=lt(),_T=ke(),yT=ee(),qn=G(),vT=Re(),Ty=Ze();Rn=function(e,t,s){e=Ty(e);var r=vT(s)&&yT(t);if(r)return bT(e[0],t);var n=t;_T(n)||(n={},n[t]=s),wT(e,n)};Rn.remove=function(e,t){e=Ty(e),t=gT(t),qn(e,function(s){qn(t,function(r){s.removeAttribute(r)})})};function bT(e,t){return e.getAttribute(t)}function wT(e,t){qn(e,function(s){qn(t,function(r,n){s.setAttribute(n,r)})})}Cy.exports=Rn});var My=h((ol,jy)=>{var xT=Re(),ST=G(),LT=Ze();ol={html:il("innerHTML"),text:il("textContent"),val:il("value")};function il(e){return function(t,s){t=LT(t);var r=t[0];if(xT(s))return r?r[e]:"";r&&ST(t,function(n){n[e]=s})}}jy.exports=ol});var Ay=h((al,Uy)=>{var ET=G(),kT=Ze();al=function(e){e=kT(e),ET(e,function(t){var s=t.parentNode;s&&s.removeChild(t)})};Uy.exports=al});var Oy=h((ll,Py)=>{var TT=nl(),CT=ee(),jT=ke(),MT=G(),q4=Ze();ll=function(e,t,s){var r=t;return CT(t)&&(r="data-"+t),jT(t)&&(r={},MT(t,function(n,i){r["data-"+i]=n})),TT(e,r,s)};Py.exports=ll});var Ry=h((In,qy)=>{var UT=js(),AT=at();function cl(){return!0}function pl(){return!1}function PT(e){var t=this.events[e.type],s,r=OT.call(this,e,t);e=new In.Event(e);for(var n=0,i,o,a;(o=r[n++])&&!e.isPropagationStopped();)for(e.curTarget=o.el,i=0;(s=o.handlers[i++])&&!e.isImmediatePropagationStopped();)a=s.handler.apply(o.el,[e]),a===!1&&(e.preventDefault(),e.stopPropagation())}function OT(e,t){var s=e.target,r=[],n=t.delegateCount,i,o,a,l;if(s.nodeType)for(;s!==this;s=s.parentNode||this){for(o=[],l=0;l<n;l++)a=t[l],i=a.selector+" ",o[i]===void 0&&(o[i]=AT(this.querySelectorAll(i),s)),o[i]&&o.push(a);o.length&&r.push({el:s,handlers:o})}return n<t.length&&r.push({el:this,handlers:t.slice(n)}),r}In={add:function(e,t,s,r){var n={selector:s,handler:r},i;e.events||(e.events={}),(i=e.events[t])||(i=e.events[t]=[],i.delegateCount=0,e.addEventListener(t,function(){PT.apply(e,arguments)},!1)),s?i.splice(i.delegateCount++,0,n):i.push(n)},remove:function(e,t,s,r){var n=e.events;if(!(!n||!n[t]))for(var i=n[t],o=i.length,a;o--;)a=i[o],(!s||a.selector==s)&&a.handler==r&&(i.splice(o,1),a.selector&&i.delegateCount--)},Event:UT({className:"Event",initialize:function(t){this.origEvent=t},isDefaultPrevented:pl,isPropagationStopped:pl,isImmediatePropagationStopped:pl,preventDefault:function(){var e=this.origEvent;this.isDefaultPrevented=cl,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.origEvent;this.isPropagationStopped=cl,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.origEvent;this.isImmediatePropagationStopped=cl,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}})};qy.exports=In});var By=h((ul,Hy)=>{var qT=Ry(),RT=Re(),IT=Ze(),HT=G();ul={on:Iy("add"),off:Iy("remove")};function Iy(e){return function(t,s,r,n){t=IT(t),RT(n)&&(n=r,r=void 0),HT(t,function(i){qT[e](i,s,r,n)})}}Hy.exports=ul});var Ny=h((dl,Dy)=>{var BT=ir(),DT=Tt(),NT=Ee();dl=function(e,t,s){t=BT(t,s);for(var r=!DT(e)&&NT(e),n=(r||e).length,i=0;i<n;i++){var o=r?r[i]:i;if(t(e[o],o,e))return!0}return!1};Dy.exports=dl});var ml=h((Zt,Fy)=>{var $T=lt(),FT=Ny(),Hn=Ze(),zT=ee(),dr=G();Zt={add:function(e,t){e=Hn(e);var s=$y(t);dr(e,function(r){var n=[];dr(s,function(i){Zt.has(r,i)||n.push(i)}),n.length!==0&&(r.className+=(r.className?" ":"")+n.join(" "))})},has:function(e,t){e=Hn(e);var s=new RegExp("(^|\\s)"+t+"(\\s|$)");return FT(e,function(r){return s.test(r.className)})},toggle:function(e,t){e=Hn(e),dr(e,function(s){if(!Zt.has(s,t))return Zt.add(s,t);Zt.remove(s,t)})},remove:function(e,t){e=Hn(e);var s=$y(t);dr(e,function(r){dr(s,function(n){r.classList.remove(n)})})}};function $y(e){return zT(e)?e.split(/\s+/):$T(e)}Fy.exports=Zt});var Wy=h((fl,zy)=>{var WT=G(),GT=Ze(),JT=ee();fl={before:Bn("beforebegin"),after:Bn("afterend"),append:Bn("beforeend"),prepend:Bn("afterbegin")};function Bn(e){return function(t,s){t=GT(t),WT(t,function(r){if(JT(s))r.insertAdjacentHTML(e,s);else{var n=r.parentNode;switch(e){case"beforebegin":n&&n.insertBefore(s,r);break;case"afterend":n&&n.insertBefore(s,r.nextSibling);break;case"beforeend":r.appendChild(s);break;case"afterbegin":r.prepend(s);break}}})}}zy.exports=fl});var mr=h((es,Ky)=>{var Vy=Wa(),VT=ly(),KT=py(),XT=rl(),Gy=nl(),hl=My(),YT=En(),QT=Ay(),ZT=Oy(),Jy=By(),Dn=ml(),Nn=Wy(),$n=Re(),e1=ee();es=function(e){return new Vy(e)};Vy.methods({offset:function(){return VT(this)},hide:function(){return this.css("display","none")},show:function(){return KT(this),this},first:function(){return es(this[0])},last:function(){return es(YT(this))},get:function(e){return this[e]},eq:function(e){return es(this[e])},on:function(e,t,s){return Jy.on(this,e,t,s),this},off:function(e,t,s){return Jy.off(this,e,t,s),this},html:function(e){var t=hl.html(this,e);return $n(e)?t:this},text:function(e){var t=hl.text(this,e);return $n(e)?t:this},val:function(e){var t=hl.val(this,e);return $n(e)?t:this},css:function(e,t){var s=XT(this,e,t);return gl(e,t)?s:this},attr:function(e,t){var s=Gy(this,e,t);return gl(e,t)?s:this},data:function(e,t){var s=ZT(this,e,t);return gl(e,t)?s:this},rmAttr:function(e){return Gy.remove(this,e),this},remove:function(){return QT(this),this},addClass:function(e){return Dn.add(this,e),this},rmClass:function(e){return Dn.remove(this,e),this},toggleClass:function(e){return Dn.toggle(this,e),this},hasClass:function(e){return Dn.has(this,e)},parent:function(){return es(this[0].parentNode)},append:function(e){return Nn.append(this,e),this},prepend:function(e){return Nn.prepend(this,e),this},before:function(e){return Nn.before(this,e),this},after:function(e){return Nn.after(this,e),this}});var gl=function(e,t){return $n(t)&&e1(e)};Ky.exports=es});var Qy=h((_l,Yy)=>{var t1=Be();_l=function(e){return Xy(e,[])};function Xy(e,t){for(var s=e.length,r=-1,n;s--;)n=e[++r],t1(n)?Xy(n,t):t.push(n);return t}Yy.exports=_l});var vl=h((yl,Zy)=>{var s1=Pn(),r1=Qy(),n1=or(),i1=at();yl=s1(function(e,t){return t=r1(t),n1(e,function(s){return!i1(t,s)})});Zy.exports=yl});var wl=h((bl,ev)=>{bl=function(e,t){var s=[];t=t||1;for(var r=0,n=Math.ceil(e.length/t);r<n;r++){var i=r*t,o=i+t;s.push(e.slice(i,o))}return s};ev.exports=bl});var Fn=h((xl,tv)=>{xl=function(){};tv.exports=xl});var sv=h(fr=>{"use strict";var o1=fr&&fr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(fr,"__esModule",{value:!0});var a1=o1(Yt()),Sl=class{constructor(){this.id=0,this.visited=[]}set(t,s){let{visited:r,id:n}=this,i={id:n,val:t};return a1.default(i,s),r.push(i),this.id++,n}get(t){let{visited:s}=this;for(let r=0,n=s.length;r<n;r++){let i=s[r];if(t===i.val)return i}return!1}};fr.default=Sl});var El=h(ct=>{"use strict";var hr=ct&&ct.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ct,"__esModule",{value:!0});ct.sortObjName=ct.getFnAbstract=ct.encode=void 0;var Ll=hr(Qe()),l1=hr(Kt()),rv=hr(Ms()),zn=hr(Vt()),c1=hr(vn());ct.encode=e=>c1.default(Ll.default(e)).replace(/\n/g,"\u21B5").replace(/\f|\r|\t/g,"");function p1(e){return e.length>500&&(e=e.slice(0,500)+"..."),"\u0192 "+l1.default(d1(e).replace("function",""))}ct.getFnAbstract=p1;var u1=/function(.*?)\((.*?)\)/;function d1(e){let t=e.match(u1);return t?t[0]:e}function m1(e,t){e=Ll.default(e),t=Ll.default(t);let s=rv.default(e),r=rv.default(t);if(!isNaN(s)&&!isNaN(r))return s>r?1:s<r?-1:0;(zn.default(e,"get ")||zn.default(e,"set "))&&(e=e.slice(4)),(zn.default(t,"get ")||zn.default(t,"set "))&&(t=t.slice(4));let n=e.length,i=t.length,o=n>i?i:n;for(let a=0;a<o;a++){let l=e.charCodeAt(a),c=t.charCodeAt(a),p=f1(l,c);if(p!==0)return p}return n>i?1:n<i?-1:0}ct.sortObjName=m1;function f1(e,t){return e=nv(e),t=nv(t),e>t?1:e<t?-1:0}function nv(e){return e===95?123:e}});var Tl=h((kl,iv)=>{var h1=0;kl=function(e){var t=++h1+"";return e?e+t:t};iv.exports=kl});var Cl=h(As=>{"use strict";var ov=As&&As.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(As,"__esModule",{value:!0});As.classPrefix=void 0;var g1=ov(Cs()),_1=ov(Kt());function y1(e){let t=`luna-${e}-`;return function(s){return g1.default(_1.default(s).split(/\s+/),r=>`${t}${r}`).join(" ")}}As.classPrefix=y1});var uv=h(ts=>{"use strict";var Te=ts&&ts.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ts,"__esModule",{value:!0});ts.getObjAbstract=void 0;var av=Te(mr()),v1=Te(Vt()),jl=Te(ke()),lv=Te(Tl()),b1=Te(nr()),w1=Te(Ms()),x1=Te(wl()),gr=Te(G()),S1=Te(Da()),L1=Te(kt()),E1=Te(Pa()),k1=Te(ee()),T1=Te(Ee()),C1=Te(Xt()),j1=Te(cr()),Ps=El(),M1=Cl(),ce=M1.classPrefix("object-viewer"),Ml=class extends j1.default{constructor(t){super(),this.onItemClick=s=>{let{map:r}=this,n=av.default(s.curTarget),i=n.data("object-id"),o=n.find("span").eq(0);if(n.data("first-level")||(i&&(n.find("ul").html(this.objToHtml(r[i],!1)),n.rmAttr("data-object-id")),s.stopImmediatePropagation(),!o.hasClass(ce("expanded"))))return;let a=n.find("ul").eq(0);o.hasClass(ce("collapsed"))?(o.rmClass(ce("collapsed")),a.show()):(o.addClass(ce("collapsed")),a.hide()),this.emit("change")},this.$container=av.default(t),this.$container.addClass("luna-object-viewer"),this.bindEvent()}set(t){k1.default(t)&&(t=JSON.parse(t)),this.data={id:lv.default("json"),enumerable:{0:t}},this.map={},cv(this.map,this.data),this.appendTpl()}destroy(){this.$container.off("click","li",this.onItemClick),this.$container.rmClass("luna-object-viewer"),this.$container.html("")}objToHtml(t,s){let r="";return gr.default(["enumerable","unenumerable","symbol"],n=>{if(!t[n])return;let i=T1.default(t[n]);i.sort(Ps.sortObjName);for(let o=0,a=i.length;o<a;o++){let l=i[o];r+=this.createEl(l,t[n][l],n,s)}}),t.proto&&(r===""?r=this.objToHtml(t.proto):r+=this.createEl("__proto__",t.proto,"proto")),r}createEl(t,s,r,n=!1){let i=typeof s;if(s===null)return`<li>${o(t)}<span class="${ce("null")}">null</span></li>`;if(L1.default(s)||E1.default(s))return`<li>${o(t)}<span class="${ce(i)}">${Ps.encode(s)}</span></li>`;if(s.type==="RegExp"&&(i="regexp"),s.type==="Number"&&(i="number"),s.type==="Number"||s.type==="RegExp")return`<li>${o(t)}<span class="${ce(i)}">${Ps.encode(s.value)}</span></li>`;if(s.type==="Undefined"||s.type==="Symbol")return`<li>${o(t)}<span class="${ce("special")}">${C1.default(s.type)}</span></li>`;if(s==="(...)")return`<li>${o(t)}<span class="${ce("special")}">${s}</span></li>`;if(jl.default(s)){let a=s.id,l=s.reference,c=pv(s)||b1.default(i),p=n?"":`<span class="${ce("expanded collapsed")}"><span class="${ce("icon icon-caret-right")}"></span><span class="${ce("icon icon-caret-down")}"></span></span>`,m=`<li ${n?'data-first-level="true"':""} ${'data-object-id="'+(l||a)+'"'}>${p}${o(t)}<span class="${ce("open")}">${n?"":c}</span><ul class="${ce(i)}" ${n?"":'style="display:none"'}>`;return n&&(m+=this.objToHtml(this.map[a])),m+`</ul><span class="${ce("close")}"></span></li>`}function o(a){if(n||jl.default(s)&&s.jsonSplitArr)return"";let l=ce("key");return(r==="unenumerable"||r==="proto"||r==="symbol")&&(l=ce("key-lighter")),`<span class="${l}">${Ps.encode(a)}</span>: `}return`<li>${o(t)}<span class="${ce(typeof s)}">"${Ps.encode(s)}"</span></li>`}appendTpl(){let t=this.map[this.data.id];this.$container.html(this.objToHtml(t,!0))}bindEvent(){this.$container.on("click","li",this.onItemClick)}};ts.default=Ml;function cv(e,t){let s=t.id;if(!s&&s!==0)return;if(t.type&&v1.default(t.type,"Array")&&t.enumerable){let i=A1(t,s,t.type);i.length>100&&(t=U1(i))}e[s]=t;let n=[];gr.default(["enumerable","unenumerable","symbol"],i=>{if(t[i])for(let o in t[i])n.push(t[i][o])}),t.proto&&n.push(t.proto);for(let i=0,o=n.length;i<o;i++){let a=n[i];jl.default(a)&&cv(e,a)}}function U1(e){let t=0,s={};gr.default(x1.default(e,100),n=>{let i={},o=t;i.type="["+o,i.enumerable={},gr.default(n,l=>{i.enumerable[t]=l,t+=1});let a=t-1;i.type+=(a-o>0?" \u2026 "+a:"")+"]",i.id=lv.default("json"),i.jsonSplitArr=!0,s[t]=i});let r={};return r.enumerable=s,r.id=e.id,r.type=e.type,e.unenumerable&&(r.unenumerable=e.unenumerable),e.symbol&&(r.symbol=e.symbol),e.proto&&(r.proto=e.proto),r}function A1(e,t,s){let r=[],n={};return gr.default(e.enumerable,(i,o)=>{let a=w1.default(o);S1.default(a)?n[o]=i:r[a]=i}),r.enumerable=n,r.type=s,r.id=t,e.unenumerable&&(r.unenumerable=e.unenumerable),e.symbol&&(r.symbol=e.symbol),e.proto&&(r.proto=e.proto),r}function pv(e){let{type:t,value:s}=e;if(t)return t==="Function"?Ps.getFnAbstract(s):t==="Array"&&e.unenumerable?`Array(${e.unenumerable.length})`:e.type}ts.getObjAbstract=pv});var yv=h((Pl,_v)=>{"use strict";var se=Pl&&Pl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},Ul,P1=se(cr()),O1=se(Cn()),q1=se(kt()),R1=se(Pa()),I1=se(Xt()),dv=se(ke()),H1=se(Be()),B1=se(nr()),mv=se(Ee()),Al=se(G()),D1=se(Ra()),N1=se(Ha()),$1=se(Fa()),fv=se(mr()),F1=se(vl()),hv=se(ar()),gv=se(or()),z1=se(wl()),W1=se(Qe()),G1=se(Fn()),J1=se(sv()),Os=El(),V1=se(uv()),K1=Cl(),pe=K1.classPrefix("object-viewer");function X1(e,t){if(t)return t==="Function"?Os.getFnAbstract(D1.default(e)):t==="Array"?`Array(${e.length})`:t}_v.exports=(Ul=class extends P1.default{constructor(t,{unenumerable:s=!1,accessGetter:r=!1}={}){super(),this.onItemClick=n=>{let{map:i}=this,o=fv.default(n.curTarget),a=o.data("object-id"),l=o.find("span").eq(0);if(o.data("first-level")||(a&&(o.find("ul").html(this.objToHtml(i[a],!1)),o.rmAttr("data-object-id")),n.stopImmediatePropagation(),!l.hasClass(pe("expanded"))))return;let c=o.find("ul").eq(0);l.hasClass(pe("collapsed"))?(l.rmClass(pe("collapsed")),c.show()):(l.addClass(pe("collapsed")),c.hide()),this.emit("change")},this.$container=fv.default(t),this.$container.addClass("luna-object-viewer"),this.unenumerable=s,this.accessGetter=r,this.bindEvent()}set(t){this.data=[t],this.visitor=new J1.default,this.map={},this.appendTpl()}destroy(){this.$container.off("click","li",this.onItemClick),this.$container.rmClass("luna-object-viewer"),this.$container.html("")}objToHtml(t,s){let{visitor:r}=this,n=t,i=!1,o=r.get(t);o&&o.self&&(n=o.self);let a="",l=["enumerable"],c=mv.default(t),p=[],m=[],y=[],b={};if(this.unenumerable&&!s&&(l.push("unenumerable"),l.push("symbol"),p=F1.default(hv.default(t,{prototype:!1,unenumerable:!0}),c),m=gv.default(hv.default(t,{prototype:!1,symbol:!0}),u=>typeof u=="symbol")),H1.default(t)&&t.length>100){l.unshift("virtual"),i=!0;let u=0,d={};Al.default(z1.default(t,100),v=>{let S=Object.create(null),w=u,g="["+w;Al.default(v,A=>{S[u]=A,d[u]=!0,u++});let _=u-1;g+=(_-w>0?" \u2026 "+_:"")+"]",b[g]=S}),y=mv.default(b),c=gv.default(c,v=>!d[v])}Al.default(l,u=>{let d=[];u==="symbol"?d=m:u==="unenumerable"?d=p:u==="virtual"?d=y:d=c,i||d.sort(Os.sortObjName);for(let v=0,S=d.length;v<S;v++){let w=W1.default(d[v]),g="",_=Object.getOwnPropertyDescriptor(t,w),A=_&&_.get,L=_&&_.set;if(A&&!this.accessGetter)g="(...)";else try{u==="virtual"?g=b[w]:g=n[w],N1.default(g)&&g.catch(G1.default)}catch(H){g=H.message}a+=this.createEl(w,t,g,u,s),A&&(a+=this.createEl(`get ${w}`,t,_.get,u,s)),L&&(a+=this.createEl(`set ${w}`,t,_.set,u,s))}});let f=O1.default(t);if(!s&&f)if(a===""){let u=r.set(f,{self:t});this.map[u]=f,a=this.objToHtml(f)}else a+=this.createEl("__proto__",n||t,f,"proto");return a}createEl(t,s,r,n,i=!1){let{visitor:o}=this,a=typeof r,l=$1.default(r,!1);if(n==="virtual"&&(l=t),r===null)return`<li>${c(t)}<span class="${pe("null")}">null</span></li>`;if(q1.default(r)||R1.default(r))return`<li>${c(t)}<span class="${pe(a)}">${Os.encode(r)}</span></li>`;if(l==="RegExp"&&(a="regexp"),l==="Number"&&(a="number"),l==="Number"||l==="RegExp")return`<li>${c(t)}<span class="${pe(a)}">${Os.encode(r.value)}</span></li>`;if(l==="Undefined"||l==="Symbol")return`<li>${c(t)}<span class="${pe("special")}">${I1.default(l)}</span></li>`;if(r==="(...)")return`<li>${c(t)}<span class="${pe("special")}">${r}</span></li>`;if(dv.default(r)){let p=o.get(r),m;if(p)m=p.id;else{let u={};n==="proto"&&(u.self=s),m=o.set(r,u),this.map[m]=r}let y=X1(r,l)||B1.default(a),b=i?"":`<span class="${pe("expanded collapsed")}"><span class="${pe("icon icon-caret-right")}"></span><span class="${pe("icon icon-caret-down")}"></span></span>`,f=`<li ${i?'data-first-level="true"':""} ${'data-object-id="'+m+'"'}>${b}${c(t)}<span class="${pe("open")}">${i?"":y}</span><ul class="${pe(a)}" ${i?"":'style="display:none"'}>`;return i&&(f+=this.objToHtml(r)),f+`</ul><span class="${pe("close")}"></span></li>`}function c(p){if(i||dv.default(r)&&n==="virtual")return"";let m=pe("key");return(n==="unenumerable"||n==="proto"||n==="symbol")&&(m=pe("key-lighter")),`<span class="${m}">${Os.encode(p)}</span>: `}return`<li>${c(t)}<span class="${pe(typeof r)}">"${Os.encode(r)}"</span></li>`}appendTpl(){this.$container.html(this.objToHtml(this.data,!0))}bindEvent(){this.$container.on("click","li",this.onItemClick)}},Ul.Static=V1.default,Ul)});var bv=h((Ol,vv)=>{var Y1=ot();Ol=function(e){return Y1(e)==="[object Error]"};vv.exports=Ol});var xv=h((ql,wv)=>{ql=function(e){var t=typeof e;return e==null||t!=="function"&&t!=="object"};wv.exports=ql});var Il=h((Rl,Sv)=>{var Q1=xn(),Z1=ar();Rl=Q1(Z1,!0);Sv.exports=Rl});var Bl=h((Hl,Lv)=>{Hl=function(e){return!!(e&&e.nodeType===1)};Lv.exports=Hl});var kv=h((Dl,Ev)=>{var eC=Ms();Dl=function(e){return e?(e=eC(e),e-e%1):e===0?e:0};Ev.exports=Dl});var Cv=h((Nl,Tv)=>{Nl=function(e){return e===null};Tv.exports=Nl});var Av=h((zl,Uv)=>{var jv=Bl(),$l=ee(),Fl=Vt(),tC=ml(),sC=rl(),Mv=G(),rC=He();zl=function(e,t){for(var s=arguments.length,r=new Array(s>2?s-2:0),n=2;n<s;n++)r[n-2]=arguments[n];(jv(t)||$l(t))&&(r.unshift(t),t=null),t||(t={});var i=nC(e),o=i.tagName,a=i.id,l=i.classes,c=document.createElement(o);return a&&c.setAttribute("id",a),tC.add(c,l),Mv(r,function(p){$l(p)?c.appendChild(document.createTextNode(p)):jv(p)&&c.appendChild(p)}),Mv(t,function(p,m){$l(p)?c.setAttribute(m,p):rC(p)&&Fl(m,"on")?c.addEventListener(m.slice(2),p,!1):m==="style"&&sC(c,p)}),c};function nC(e){for(var t="div",s="",r=[],n=[],i="",o=0,a=e.length;o<a;o++){var l=e[o];l==="#"||l==="."?(n.push(i),i=l):i+=l}n.push(i);for(var c=0,p=n.length;c<p;c++)i=n[c],i&&(Fl(i,"#")?s=i.slice(1):Fl(i,".")?r.push(i.slice(1)):t=i);return{tagName:t,id:s,classes:r}}Uv.exports=zl});var _r=h((Wn,Pv)=>{Date.now?Wn=Date.now:Wn=function(){return new Date().getTime()};Pv.exports=Wn});var qv=h((Wl,Ov)=>{Wl=function(e){return typeof e=="symbol"};Ov.exports=Wl});var Iv=h((Gl,Rv)=>{var iC=Sn(),oC=Re(),aC=Qe(),lC=qv(),cC=ee();Gl=function(e,t,s){t=iC(t,e);var r=t.pop(),n;for(n=t.shift();!oC(n);){if(!cC(n)&&!lC(n)&&(n=aC(n)),n==="__proto__"||n==="constructor"||n==="prototype")return;e[n]||(e[n]={}),e=e[n],n=t.shift()}e[r]=s};Rv.exports=Gl});var Dv=h((Jl,Bv)=>{var pC=Sn(),uC=ee(),dC=ke(),mC=G();Jl=function(e,t,s){return uC(t)?Hv(e,t,s):dC(t)&&mC(t,function(r,n){Hv(e,n,r)}),e};function Hv(e,t,s){for(var r=pC(t,e),n=r.pop();t=r.shift();)e[t]||(e[t]={}),e=e[t];Object.defineProperty(e,n,s)}Bv.exports=Jl});var $v=h((Vl,Nv)=>{var fC=ee(),hC=Be(),gC=at(),_C=G();Vl=function(e,t,s){if(fC(t)&&(t=[t]),hC(t)){var r=t;t=function(o,a){return gC(r,a)}}var n={},i=function(o,a){t(o,a)&&(n[a]=o)};return s&&(i=function(o,a){t(o,a)||(n[a]=o)}),_C(e,i),n};Nv.exports=Vl});var Zv=h((jt,Qv)=>{var yC=jo(),vC=Fa(),Rs=Qe(),Fv=Uo(),bC=Ra(),Vv=Ee(),yr=G(),wC=js(),Kv=Cn(),xC=vl(),SC=Yt(),LC=Ha(),EC=or(),zv=_r(),Wv=ar(),Xv=at(),Yl=ke(),kC=ha(),Gv=da(),TC=Vt(),CC=Iv(),jC=Dv(),Jv=$v(),MC=Tt();jt=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.self,r=t.startTime,n=r===void 0?zv():r,i=t.timeout,o=i===void 0?0:i,a=t.depth,l=a===void 0?0:a,c=t.curDepth,p=c===void 0?1:c,m=t.visitor,y=m===void 0?new UC:m,b=t.unenumerable,f=b===void 0?!1:b,u=t.symbol,d=u===void 0?!1:u,v=t.accessGetter,S=v===void 0?!1:v,w=t.ignore,g=w===void 0?[]:w,_="",A={visitor:y,unenumerable:f,symbol:d,accessGetter:S,depth:l,curDepth:p+1,timeout:o,startTime:n,ignore:g},L=vC(e,!1);if(L==="String")_=qs(e);else if(L==="Number")_=Rs(e),Fv(_,"Infinity")&&(_='{"value":"'.concat(_,'","type":"Number"}'));else if(L==="NaN")_='{"value":"NaN","type":"Number"}';else if(L==="Boolean")_=e?"true":"false";else if(L==="Null")_="null";else if(L==="Undefined")_='{"type":"Undefined"}';else if(L==="Symbol"){var H="Symbol";try{H=Rs(e)}catch{}_='{"value":'.concat(qs(H),',"type":"Symbol"}')}else{if(o&&zv()-n>o)return qs("Timeout");if(l&&p>l)return qs("{...}");_="{";var $=[],Ce=y.get(e),Ue;if(Ce?(Ue=Ce.id,$.push('"reference":'.concat(Ue))):(Ue=y.set(e),$.push('"id":'.concat(Ue))),$.push('"type":"'.concat(L,'"')),Fv(L,"Function")?$.push('"value":'.concat(qs(bC(e)))):L==="RegExp"&&$.push('"value":'.concat(qs(e))),!Ce){var ve=Vv(e);if(ve.length&&$.push(Kl("enumerable",ve,s||e,A)),f){var be=xC(Wv(e,{prototype:!1,unenumerable:!0}),ve);be.length&&$.push(Kl("unenumerable",be,s||e,A))}if(d){var xt=EC(Wv(e,{prototype:!1,symbol:!0}),function(Rt){return typeof Rt=="symbol"});xt.length&&$.push(Kl("symbol",xt,s||e,A))}var rt=Kv(e);if(rt&&!Xv(g,rt)){var us='"proto":'.concat(jt(rt,SC(A,{self:s||e})));$.push(us)}}_+=$.join(",")+"}"}return _};function Kl(e,t,s,r){var n=[];return yr(t,function(i){var o,a=Object.getOwnPropertyDescriptor(s,i),l=a&&a.get,c=a&&a.set;if(!r.accessGetter&&l)o="(...)";else try{if(o=s[i],Xv(r.ignore,o))return;LC(o)&&o.catch(function(){})}catch(p){o=p.message}n.push("".concat(Xl(i),":").concat(jt(o,r))),l&&n.push("".concat(Xl("get "+Rs(i)),":").concat(jt(a.get,r))),c&&n.push("".concat(Xl("set "+Rs(i)),":").concat(jt(a.set,r)))}),'"'.concat(e,'":{')+n.join(",")+"}"}function Xl(e){return'"'.concat(Yv(e),'"')}function qs(e){return'"'.concat(Yv(Rs(e)),'"')}function Yv(e){return yC(e).replace(/\\'/g,"'").replace(/\t/g,"\\t")}var UC=wC({initialize:function(){this.id=1,this.visited=[]},set:function(e){var t=this.visited,s=this.id,r={id:s,val:e};return t.push(r),this.id++,s},get:function(e){for(var t=this.visited,s=0,r=t.length;s<r;s++){var n=t[s];if(e===n.val)return n}return!1}});jt.parse=function(e){var t={},s=ss(JSON.parse(e),{map:t});return AC(t),s};function AC(e){yr(e,function(t){for(var s=Vv(t),r=0,n=s.length;r<n;r++){var i=s[r];if(Yl(t[i])){var o=t[i].reference;o&&e[o]&&(t[i]=e[o])}}var a=Kv(t);a&&a.reference&&e[a.reference]&&Object.setPrototypeOf(t,e[a.reference])})}function ss(e,t){var s=t.map;if(!Yl(e))return e;var r=e.id,n=e.type,i=e.value,o=e.proto,a=e.reference,l=e.enumerable,c=e.unenumerable;if(a)return e;if(n==="Number")return i==="Infinity"?Number.POSITIVE_INFINITY:i==="-Infinity"?Number.NEGATIVE_INFINITY:NaN;if(n==="Undefined")return;var p;if(n==="Function")p=function(){},p.toString=function(){return i},o&&Object.setPrototypeOf(p,ss(o,t));else if(n==="RegExp")p=OC(i);else if(n!=="Object"){var m;kC?m=function(){}:m=new Function(n,""),o&&(m.prototype=ss(o,t)),p=new m}else o?p=Gv(ss(o,t)):p=Gv(null);var y={};if(l){var b;MC(l)&&(b=l.length,delete l.length),l=Jv(l,function(u,d){return!f(l,u,d)}),yr(l,function(u,d){var v=y[d]||{};v.get||(p[d]=ss(u,t))}),b&&(p.length=b)}c&&(c=Jv(c,function(u,d){return!f(c,u,d)}),yr(c,function(u,d){var v=y[d]||{};if(!v.get)if(u=ss(u,t),Yl(u)&&u.reference){var S=u.reference;u=function(){return s[S]},v.get=u}else v.value=u;v.enumerable=!1,y[d]=v})),jC(p,y);function f(u,d,v){v=Rs(v);var S=!1;return yr(["get","set"],function(w){if(TC(v,w+" ")){var g=v.replace(w+" ","");u[g]&&(d=ss(d,t),d==="Timeout"&&(d=PC),CC(y,[g,w],d),S=!0)}}),S}return s[r]=p,p}function PC(){return"Timeout"}function OC(e){var t=e.lastIndexOf("/");return new RegExp(e.slice(1,t),e.slice(t+1))}Qv.exports=jt});var sb=h((vr,tb)=>{typeof process=="object"&&process.nextTick?vr=process.nextTick:typeof setImmediate=="function"?vr=function(e){setImmediate(eb(e))}:vr=function(e){setTimeout(eb(e),0)};function eb(e){if(typeof e!="function")throw new TypeError(e+" is not a function");return e}tb.exports=vr});var nb=h((Ql,rb)=>{var qC=jn(),RC=Kt(),IC=Cs(),HC=lt();Ql=function(e){var t=HC(e.match(BC));return qC(IC(t,function(s){return RC(s)}))};var BC=/((https?)|(ftp)):\/\/[\w.]+[^ \f\n\r\t\v"\\<>[\]\u2100-\uFFFF(),]*/gi;rb.exports=Ql});var ob=h((Zl,ib)=>{Zl=function(e){return e.replace(/\W/g,"\\$&")};ib.exports=Zl});var lb=h((ec,ab)=>{var DC=nb(),NC=G(),$C=ob();ec=function(e,t){t=t||FC;var s=DC(e);return NC(s,function(r){e=e.replace(new RegExp($C(r),"g"),t)}),e};function FC(e){return'<a href="'+e+'">'+e+"</a>"}ab.exports=ec});var pb=h((Jn,cb)=>{var Gn=G(),zC=Il();Jn=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"js",s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};zC(s,WC),e=e.replace(/</g,"&lt;").replace(/>/g,"&gt;"),t=Mt[t];var r=0,n=[];Gn(t,function(o){o.language&&(e=e.replace(o.re,function(a,l){return l?(n[r++]=Jn(l,o.language,s),a.replace(l,"___subtmpl"+(r-1)+"___")):a}))}),Gn(t,function(o,a){Mt[o.language]||(e=e.replace(o.re,"___"+a+"___$1___end"+a+"___"))});var i=[];return e=e.replace(/___(?!subtmpl)\w+?___/g,function(o){var a=o.substr(3,3)==="end",l=(a?o.substr(6):o.substr(3)).replace(/_/g,""),c=i.length>0?i[i.length-1]:null;return!a&&(c==null||l==c||c!=null&&t[c]&&t[c].embed!=null&&t[c].embed.indexOf(l)>-1)?(i.push(l),o):a&&l==c?(i.pop(),o):""}),Gn(t,function(o,a){var l=s[o.style]?' style="'.concat(s[o.style],'"'):"";e=e.replace(new RegExp("___end"+a+"___","g"),"</span>").replace(new RegExp("___"+a+"___","g"),'<span class="'.concat(o.style,'"').concat(l,">"))}),Gn(t,function(o){o.language&&(e=e.replace(/___subtmpl\d+___/g,function(a){var l=parseInt(a.replace(/___subtmpl(\d+)___/,"$1"),10);return n[l]}))}),e};var WC={comment:"color:#63a35c;",string:"color:#183691;",number:"color:#0086b3;",keyword:"color:#a71d5d;",operator:"color:#994500;"},Mt={};Mt.js={comment:{re:/(\/\/.*|\/\*([\s\S]*?)\*\/)/g,style:"comment"},string:{re:/(('.*?')|(".*?"))/g,style:"string"},numbers:{re:/(-?(\d+|\d+\.\d+|\.\d+))/g,style:"number"},keywords:{re:/(?:\b)(function|for|foreach|while|if|else|elseif|switch|break|as|return|this|class|self|default|var|const|let|false|true|null|undefined)(?:\b)/gi,style:"keyword"},operator:{re:/(\+|-|\/|\*|%|=|&lt;|&gt;|\||\?|\.)/g,style:"operator"}};Mt.html={comment:{re:/(&lt;!--([\s\S]*?)--&gt;)/g,style:"comment"},tag:{re:/(&lt;\/?\w(.|\n)*?\/?&gt;)/g,style:"keyword",embed:["string"]},string:Mt.js.string,css:{re:/(?:&lt;style.*?&gt;)([\s\S]*)?(?:&lt;\/style&gt;)/gi,language:"css"},script:{re:/(?:&lt;script.*?&gt;)([\s\S]*?)(?:&lt;\/script&gt;)/gi,language:"js"}};Mt.css={comment:Mt.js.comment,string:Mt.js.string,numbers:{re:/((-?(\d+|\d+\.\d+|\.\d+)(%|px|em|pt|in)?)|#[0-9a-fA-F]{3}[0-9a-fA-F]{3})/g,style:"number"},keywords:{re:/(@\w+|:?:\w+|[a-z-]+:)/g,style:"keyword"}};cb.exports=Jn});var db=h((tc,ub)=>{tc=function(){for(var e=arguments,t=e[0],s=1,r=e.length;s<r;s++)e[s]<t&&(t=e[s]);return t};ub.exports=tc});var rc=h((sc,mb)=>{var GC=ee(),JC=lt(),VC=db(),KC=Cs(),XC=Kt();sc=function(e){GC(e)&&(e=JC(e));for(var t="",s=arguments.length,r=new Array(s>1?s-1:0),n=1;n<s;n++)r[n-1]=arguments[n];for(var i=0,o=e.length;i<o;i++)t+=e[i],r[i]&&(t+=r[i]);for(var a=t.split(`
`),l=[],c=0,p=a.length;c<p;c++){var m=a[c],y=m.match(YC);y&&l.push(y[1].length)}var b=l.length>0?VC.apply(null,l):0;return XC(KC(a,function(f){return f[0]===" "?f.slice(b):f}).join(`
`))};var YC=/^(\s+)\S+/;mb.exports=sc});var Vn=h((N4,fb)=>{"use strict";function ue(e){this.__parent=e,this.__character_count=0,this.__indent_count=-1,this.__alignment_count=0,this.__wrap_point_index=0,this.__wrap_point_character_count=0,this.__wrap_point_indent_count=-1,this.__wrap_point_alignment_count=0,this.__items=[]}ue.prototype.clone_empty=function(){var e=new ue(this.__parent);return e.set_indent(this.__indent_count,this.__alignment_count),e};ue.prototype.item=function(e){return e<0?this.__items[this.__items.length+e]:this.__items[e]};ue.prototype.has_match=function(e){for(var t=this.__items.length-1;t>=0;t--)if(this.__items[t].match(e))return!0;return!1};ue.prototype.set_indent=function(e,t){this.is_empty()&&(this.__indent_count=e||0,this.__alignment_count=t||0,this.__character_count=this.__parent.get_indent_size(this.__indent_count,this.__alignment_count))};ue.prototype._set_wrap_point=function(){this.__parent.wrap_line_length&&(this.__wrap_point_index=this.__items.length,this.__wrap_point_character_count=this.__character_count,this.__wrap_point_indent_count=this.__parent.next_line.__indent_count,this.__wrap_point_alignment_count=this.__parent.next_line.__alignment_count)};ue.prototype._should_wrap=function(){return this.__wrap_point_index&&this.__character_count>this.__parent.wrap_line_length&&this.__wrap_point_character_count>this.__parent.next_line.__character_count};ue.prototype._allow_wrap=function(){if(this._should_wrap()){this.__parent.add_new_line();var e=this.__parent.current_line;return e.set_indent(this.__wrap_point_indent_count,this.__wrap_point_alignment_count),e.__items=this.__items.slice(this.__wrap_point_index),this.__items=this.__items.slice(0,this.__wrap_point_index),e.__character_count+=this.__character_count-this.__wrap_point_character_count,this.__character_count=this.__wrap_point_character_count,e.__items[0]===" "&&(e.__items.splice(0,1),e.__character_count-=1),!0}return!1};ue.prototype.is_empty=function(){return this.__items.length===0};ue.prototype.last=function(){return this.is_empty()?null:this.__items[this.__items.length-1]};ue.prototype.push=function(e){this.__items.push(e);var t=e.lastIndexOf(`
`);t!==-1?this.__character_count=e.length-t:this.__character_count+=e.length};ue.prototype.pop=function(){var e=null;return this.is_empty()||(e=this.__items.pop(),this.__character_count-=e.length),e};ue.prototype._remove_indent=function(){this.__indent_count>0&&(this.__indent_count-=1,this.__character_count-=this.__parent.indent_size)};ue.prototype._remove_wrap_indent=function(){this.__wrap_point_indent_count>0&&(this.__wrap_point_indent_count-=1)};ue.prototype.trim=function(){for(;this.last()===" ";)this.__items.pop(),this.__character_count-=1};ue.prototype.toString=function(){var e="";return this.is_empty()?this.__parent.indent_empty_lines&&(e=this.__parent.get_indent_string(this.__indent_count)):(e=this.__parent.get_indent_string(this.__indent_count,this.__alignment_count),e+=this.__items.join("")),e};function br(e,t){this.__cache=[""],this.__indent_size=e.indent_size,this.__indent_string=e.indent_char,e.indent_with_tabs||(this.__indent_string=new Array(e.indent_size+1).join(e.indent_char)),t=t||"",e.indent_level>0&&(t=new Array(e.indent_level+1).join(this.__indent_string)),this.__base_string=t,this.__base_string_length=t.length}br.prototype.get_indent_size=function(e,t){var s=this.__base_string_length;return t=t||0,e<0&&(s=0),s+=e*this.__indent_size,s+=t,s};br.prototype.get_indent_string=function(e,t){var s=this.__base_string;return t=t||0,e<0&&(e=0,s=""),t+=e*this.__indent_size,this.__ensure_cache(t),s+=this.__cache[t],s};br.prototype.__ensure_cache=function(e){for(;e>=this.__cache.length;)this.__add_column()};br.prototype.__add_column=function(){var e=this.__cache.length,t=0,s="";this.__indent_size&&e>=this.__indent_size&&(t=Math.floor(e/this.__indent_size),e-=t*this.__indent_size,s=new Array(t+1).join(this.__indent_string)),e&&(s+=new Array(e+1).join(" ")),this.__cache.push(s)};function de(e,t){this.__indent_cache=new br(e,t),this.raw=!1,this._end_with_newline=e.end_with_newline,this.indent_size=e.indent_size,this.wrap_line_length=e.wrap_line_length,this.indent_empty_lines=e.indent_empty_lines,this.__lines=[],this.previous_line=null,this.current_line=null,this.next_line=new ue(this),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1,this.__add_outputline()}de.prototype.__add_outputline=function(){this.previous_line=this.current_line,this.current_line=this.next_line.clone_empty(),this.__lines.push(this.current_line)};de.prototype.get_line_number=function(){return this.__lines.length};de.prototype.get_indent_string=function(e,t){return this.__indent_cache.get_indent_string(e,t)};de.prototype.get_indent_size=function(e,t){return this.__indent_cache.get_indent_size(e,t)};de.prototype.is_empty=function(){return!this.previous_line&&this.current_line.is_empty()};de.prototype.add_new_line=function(e){return this.is_empty()||!e&&this.just_added_newline()?!1:(this.raw||this.__add_outputline(),!0)};de.prototype.get_code=function(e){this.trim(!0);var t=this.current_line.pop();t&&(t[t.length-1]===`
`&&(t=t.replace(/\n+$/g,"")),this.current_line.push(t)),this._end_with_newline&&this.__add_outputline();var s=this.__lines.join(`
`);return e!==`
`&&(s=s.replace(/[\n]/g,e)),s};de.prototype.set_wrap_point=function(){this.current_line._set_wrap_point()};de.prototype.set_indent=function(e,t){return e=e||0,t=t||0,this.next_line.set_indent(e,t),this.__lines.length>1?(this.current_line.set_indent(e,t),!0):(this.current_line.set_indent(),!1)};de.prototype.add_raw_token=function(e){for(var t=0;t<e.newlines;t++)this.__add_outputline();this.current_line.set_indent(-1),this.current_line.push(e.whitespace_before),this.current_line.push(e.text),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1};de.prototype.add_token=function(e){this.__add_space_before_token(),this.current_line.push(e),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=this.current_line._allow_wrap()};de.prototype.__add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&(this.non_breaking_space||this.set_wrap_point(),this.current_line.push(" "))};de.prototype.remove_indent=function(e){for(var t=this.__lines.length;e<t;)this.__lines[e]._remove_indent(),e++;this.current_line._remove_wrap_indent()};de.prototype.trim=function(e){for(e=e===void 0?!1:e,this.current_line.trim();e&&this.__lines.length>1&&this.current_line.is_empty();)this.__lines.pop(),this.current_line=this.__lines[this.__lines.length-1],this.current_line.trim();this.previous_line=this.__lines.length>1?this.__lines[this.__lines.length-2]:null};de.prototype.just_added_newline=function(){return this.current_line.is_empty()};de.prototype.just_added_blankline=function(){return this.is_empty()||this.current_line.is_empty()&&this.previous_line.is_empty()};de.prototype.ensure_empty_line_above=function(e,t){for(var s=this.__lines.length-2;s>=0;){var r=this.__lines[s];if(r.is_empty())break;if(r.item(0).indexOf(e)!==0&&r.item(-1)!==t){this.__lines.splice(s+1,0,new ue(this)),this.previous_line=this.__lines[this.__lines.length-2];break}s--}};fb.exports.Output=de});var nc=h(($4,hb)=>{"use strict";function QC(e,t,s,r){this.type=e,this.text=t,this.comments_before=null,this.newlines=s||0,this.whitespace_before=r||"",this.parent=null,this.next=null,this.previous=null,this.opened=null,this.closed=null,this.directives=null}hb.exports.Token=QC});var oc=h(yt=>{"use strict";var ZC="\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a",gb="\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a",ic="\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc",_b="\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f",yb="(?:\\\\u[0-9a-fA-F]{4}|["+ZC+ic+"])",ej="(?:\\\\u[0-9a-fA-F]{4}|["+gb+ic+_b+"])*";yt.identifier=new RegExp(yb+ej,"g");yt.identifierStart=new RegExp(yb);yt.identifierMatch=new RegExp("(?:\\\\u[0-9a-fA-F]{4}|["+gb+ic+_b+"])+");yt.newline=/[\n\r\u2028\u2029]/;yt.lineBreak=new RegExp(`\r
|`+yt.newline.source);yt.allLineBreaks=new RegExp(yt.lineBreak.source,"g")});var Xn=h((z4,Kn)=>{"use strict";function Ut(e,t){this.raw_options=vb(e,t),this.disabled=this._get_boolean("disabled"),this.eol=this._get_characters("eol","auto"),this.end_with_newline=this._get_boolean("end_with_newline"),this.indent_size=this._get_number("indent_size",4),this.indent_char=this._get_characters("indent_char"," "),this.indent_level=this._get_number("indent_level"),this.preserve_newlines=this._get_boolean("preserve_newlines",!0),this.max_preserve_newlines=this._get_number("max_preserve_newlines",32786),this.preserve_newlines||(this.max_preserve_newlines=0),this.indent_with_tabs=this._get_boolean("indent_with_tabs",this.indent_char==="	"),this.indent_with_tabs&&(this.indent_char="	",this.indent_size===1&&(this.indent_size=4)),this.wrap_line_length=this._get_number("wrap_line_length",this._get_number("max_char")),this.indent_empty_lines=this._get_boolean("indent_empty_lines"),this.templating=this._get_selection_list("templating",["auto","none","django","erb","handlebars","php","smarty"],["auto"])}Ut.prototype._get_array=function(e,t){var s=this.raw_options[e],r=t||[];return typeof s=="object"?s!==null&&typeof s.concat=="function"&&(r=s.concat()):typeof s=="string"&&(r=s.split(/[^a-zA-Z0-9_\/\-]+/)),r};Ut.prototype._get_boolean=function(e,t){var s=this.raw_options[e],r=s===void 0?!!t:!!s;return r};Ut.prototype._get_characters=function(e,t){var s=this.raw_options[e],r=t||"";return typeof s=="string"&&(r=s.replace(/\\r/,"\r").replace(/\\n/,`
`).replace(/\\t/,"	")),r};Ut.prototype._get_number=function(e,t){var s=this.raw_options[e];t=parseInt(t,10),isNaN(t)&&(t=0);var r=parseInt(s,10);return isNaN(r)&&(r=t),r};Ut.prototype._get_selection=function(e,t,s){var r=this._get_selection_list(e,t,s);if(r.length!==1)throw new Error("Invalid Option Value: The option '"+e+`' can only be one of the following values:
`+t+`
You passed in: '`+this.raw_options[e]+"'");return r[0]};Ut.prototype._get_selection_list=function(e,t,s){if(!t||t.length===0)throw new Error("Selection list cannot be empty.");if(s=s||[t[0]],!this._is_valid_selection(s,t))throw new Error("Invalid Default Value!");var r=this._get_array(e,s);if(!this._is_valid_selection(r,t))throw new Error("Invalid Option Value: The option '"+e+`' can contain only the following values:
`+t+`
You passed in: '`+this.raw_options[e]+"'");return r};Ut.prototype._is_valid_selection=function(e,t){return e.length&&t.length&&!e.some(function(s){return t.indexOf(s)===-1})};function vb(e,t){var s={};e=bb(e);var r;for(r in e)r!==t&&(s[r]=e[r]);if(t&&e[t])for(r in e[t])s[r]=e[t][r];return s}function bb(e){var t={},s;for(s in e){var r=s.replace(/-/g,"_");t[r]=e[s]}return t}Kn.exports.Options=Ut;Kn.exports.normalizeOpts=bb;Kn.exports.mergeOpts=vb});var ac=h((W4,Sb)=>{"use strict";var wb=Xn().Options,tj=["before-newline","after-newline","preserve-newline"];function xb(e){wb.call(this,e,"js");var t=this.raw_options.brace_style||null;t==="expand-strict"?this.raw_options.brace_style="expand":t==="collapse-preserve-inline"?this.raw_options.brace_style="collapse,preserve-inline":this.raw_options.braces_on_own_line!==void 0&&(this.raw_options.brace_style=this.raw_options.braces_on_own_line?"expand":"collapse");var s=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_preserve_inline=!1,this.brace_style="collapse";for(var r=0;r<s.length;r++)s[r]==="preserve-inline"?this.brace_preserve_inline=!0:this.brace_style=s[r];this.unindent_chained_methods=this._get_boolean("unindent_chained_methods"),this.break_chained_methods=this._get_boolean("break_chained_methods"),this.space_in_paren=this._get_boolean("space_in_paren"),this.space_in_empty_paren=this._get_boolean("space_in_empty_paren"),this.jslint_happy=this._get_boolean("jslint_happy"),this.space_after_anon_function=this._get_boolean("space_after_anon_function"),this.space_after_named_function=this._get_boolean("space_after_named_function"),this.keep_array_indentation=this._get_boolean("keep_array_indentation"),this.space_before_conditional=this._get_boolean("space_before_conditional",!0),this.unescape_strings=this._get_boolean("unescape_strings"),this.e4x=this._get_boolean("e4x"),this.comma_first=this._get_boolean("comma_first"),this.operator_position=this._get_selection("operator_position",tj),this.test_output_raw=this._get_boolean("test_output_raw"),this.jslint_happy&&(this.space_after_anon_function=!0)}xb.prototype=new wb;Sb.exports.Options=xb});var Yn=h((G4,Eb)=>{"use strict";var Lb=RegExp.prototype.hasOwnProperty("sticky");function _e(e){this.__input=e||"",this.__input_length=this.__input.length,this.__position=0}_e.prototype.restart=function(){this.__position=0};_e.prototype.back=function(){this.__position>0&&(this.__position-=1)};_e.prototype.hasNext=function(){return this.__position<this.__input_length};_e.prototype.next=function(){var e=null;return this.hasNext()&&(e=this.__input.charAt(this.__position),this.__position+=1),e};_e.prototype.peek=function(e){var t=null;return e=e||0,e+=this.__position,e>=0&&e<this.__input_length&&(t=this.__input.charAt(e)),t};_e.prototype.__match=function(e,t){e.lastIndex=t;var s=e.exec(this.__input);return s&&!(Lb&&e.sticky)&&s.index!==t&&(s=null),s};_e.prototype.test=function(e,t){return t=t||0,t+=this.__position,t>=0&&t<this.__input_length?!!this.__match(e,t):!1};_e.prototype.testChar=function(e,t){var s=this.peek(t);return e.lastIndex=0,s!==null&&e.test(s)};_e.prototype.match=function(e){var t=this.__match(e,this.__position);return t?this.__position+=t[0].length:t=null,t};_e.prototype.read=function(e,t,s){var r="",n;return e&&(n=this.match(e),n&&(r+=n[0])),t&&(n||!e)&&(r+=this.readUntil(t,s)),r};_e.prototype.readUntil=function(e,t){var s="",r=this.__position;e.lastIndex=this.__position;var n=e.exec(this.__input);return n?(r=n.index,t&&(r+=n[0].length)):r=this.__input_length,s=this.__input.substring(this.__position,r),this.__position=r,s};_e.prototype.readUntilAfter=function(e){return this.readUntil(e,!0)};_e.prototype.get_regexp=function(e,t){var s=null,r="g";return t&&Lb&&(r="y"),typeof e=="string"&&e!==""?s=new RegExp(e,r):e&&(s=new RegExp(e.source,r)),s};_e.prototype.get_literal_regexp=function(e){return RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"))};_e.prototype.peekUntilAfter=function(e){var t=this.__position,s=this.readUntilAfter(e);return this.__position=t,s};_e.prototype.lookBack=function(e){var t=this.__position-1;return t>=e.length&&this.__input.substring(t-e.length,t).toLowerCase()===e};Eb.exports.InputScanner=_e});var Tb=h((J4,kb)=>{"use strict";function rs(e){this.__tokens=[],this.__tokens_length=this.__tokens.length,this.__position=0,this.__parent_token=e}rs.prototype.restart=function(){this.__position=0};rs.prototype.isEmpty=function(){return this.__tokens_length===0};rs.prototype.hasNext=function(){return this.__position<this.__tokens_length};rs.prototype.next=function(){var e=null;return this.hasNext()&&(e=this.__tokens[this.__position],this.__position+=1),e};rs.prototype.peek=function(e){var t=null;return e=e||0,e+=this.__position,e>=0&&e<this.__tokens_length&&(t=this.__tokens[e]),t};rs.prototype.add=function(e){this.__parent_token&&(e.parent=this.__parent_token),this.__tokens.push(e),this.__tokens_length+=1};kb.exports.TokenStream=rs});var wr=h((V4,Cb)=>{"use strict";function pt(e,t){this._input=e,this._starting_pattern=null,this._match_pattern=null,this._until_pattern=null,this._until_after=!1,t&&(this._starting_pattern=this._input.get_regexp(t._starting_pattern,!0),this._match_pattern=this._input.get_regexp(t._match_pattern,!0),this._until_pattern=this._input.get_regexp(t._until_pattern),this._until_after=t._until_after)}pt.prototype.read=function(){var e=this._input.read(this._starting_pattern);return(!this._starting_pattern||e)&&(e+=this._input.read(this._match_pattern,this._until_pattern,this._until_after)),e};pt.prototype.read_match=function(){return this._input.match(this._match_pattern)};pt.prototype.until_after=function(e){var t=this._create();return t._until_after=!0,t._until_pattern=this._input.get_regexp(e),t._update(),t};pt.prototype.until=function(e){var t=this._create();return t._until_after=!1,t._until_pattern=this._input.get_regexp(e),t._update(),t};pt.prototype.starting_with=function(e){var t=this._create();return t._starting_pattern=this._input.get_regexp(e,!0),t._update(),t};pt.prototype.matching=function(e){var t=this._create();return t._match_pattern=this._input.get_regexp(e,!0),t._update(),t};pt.prototype._create=function(){return new pt(this._input,this)};pt.prototype._update=function(){};Cb.exports.Pattern=pt});var Ub=h((K4,Mb)=>{"use strict";var jb=wr().Pattern;function At(e,t){jb.call(this,e,t),t?this._line_regexp=this._input.get_regexp(t._line_regexp):this.__set_whitespace_patterns("",""),this.newline_count=0,this.whitespace_before_token=""}At.prototype=new jb;At.prototype.__set_whitespace_patterns=function(e,t){e+="\\t ",t+="\\n\\r",this._match_pattern=this._input.get_regexp("["+e+t+"]+",!0),this._newline_regexp=this._input.get_regexp("\\r\\n|["+t+"]")};At.prototype.read=function(){this.newline_count=0,this.whitespace_before_token="";var e=this._input.read(this._match_pattern);if(e===" ")this.whitespace_before_token=" ";else if(e){var t=this.__split(this._newline_regexp,e);this.newline_count=t.length-1,this.whitespace_before_token=t[this.newline_count]}return e};At.prototype.matching=function(e,t){var s=this._create();return s.__set_whitespace_patterns(e,t),s._update(),s};At.prototype._create=function(){return new At(this._input,this)};At.prototype.__split=function(e,t){e.lastIndex=0;for(var s=0,r=[],n=e.exec(t);n;)r.push(t.substring(s,n.index)),s=n.index+n[0].length,n=e.exec(t);return s<t.length?r.push(t.substring(s,t.length)):r.push(""),r};Mb.exports.WhitespacePattern=At});var Sr=h((X4,cc)=>{"use strict";var sj=Yn().InputScanner,Ab=nc().Token,lc=Tb().TokenStream,rj=Ub().WhitespacePattern,xr={START:"TK_START",RAW:"TK_RAW",EOF:"TK_EOF"},ut=function(e,t){this._input=new sj(e),this._options=t||{},this.__tokens=null,this._patterns={},this._patterns.whitespace=new rj(this._input)};ut.prototype.tokenize=function(){this._input.restart(),this.__tokens=new lc,this._reset();for(var e,t=new Ab(xr.START,""),s=null,r=[],n=new lc;t.type!==xr.EOF;){for(e=this._get_next_token(t,s);this._is_comment(e);)n.add(e),e=this._get_next_token(t,s);n.isEmpty()||(e.comments_before=n,n=new lc),e.parent=s,this._is_opening(e)?(r.push(s),s=e):s&&this._is_closing(e,s)&&(e.opened=s,s.closed=e,s=r.pop(),e.parent=s),e.previous=t,t.next=e,this.__tokens.add(e),t=e}return this.__tokens};ut.prototype._is_first_token=function(){return this.__tokens.isEmpty()};ut.prototype._reset=function(){};ut.prototype._get_next_token=function(e,t){this._readWhitespace();var s=this._input.read(/.+/g);return s?this._create_token(xr.RAW,s):this._create_token(xr.EOF,"")};ut.prototype._is_comment=function(e){return!1};ut.prototype._is_opening=function(e){return!1};ut.prototype._is_closing=function(e,t){return!1};ut.prototype._create_token=function(e,t){var s=new Ab(e,t,this._patterns.whitespace.newline_count,this._patterns.whitespace.whitespace_before_token);return s};ut.prototype._readWhitespace=function(){return this._patterns.whitespace.read()};cc.exports.Tokenizer=ut;cc.exports.TOKEN=xr});var Qn=h((Y4,Pb)=>{"use strict";function pc(e,t){e=typeof e=="string"?e:e.source,t=typeof t=="string"?t:t.source,this.__directives_block_pattern=new RegExp(e+/ beautify( \w+[:]\w+)+ /.source+t,"g"),this.__directive_pattern=/ (\w+)[:](\w+)/g,this.__directives_end_ignore_pattern=new RegExp(e+/\sbeautify\signore:end\s/.source+t,"g")}pc.prototype.get_directives=function(e){if(!e.match(this.__directives_block_pattern))return null;var t={};this.__directive_pattern.lastIndex=0;for(var s=this.__directive_pattern.exec(e);s;)t[s[1]]=s[2],s=this.__directive_pattern.exec(e);return t};pc.prototype.readIgnored=function(e){return e.readUntilAfter(this.__directives_end_ignore_pattern)};Pb.exports.Directives=pc});var mc=h((Q4,Ob)=>{"use strict";var uc=wr().Pattern,dc={django:!1,erb:!1,handlebars:!1,php:!1,smarty:!1};function et(e,t){uc.call(this,e,t),this.__template_pattern=null,this._disabled=Object.assign({},dc),this._excluded=Object.assign({},dc),t&&(this.__template_pattern=this._input.get_regexp(t.__template_pattern),this._excluded=Object.assign(this._excluded,t._excluded),this._disabled=Object.assign(this._disabled,t._disabled));var s=new uc(e);this.__patterns={handlebars_comment:s.starting_with(/{{!--/).until_after(/--}}/),handlebars_unescaped:s.starting_with(/{{{/).until_after(/}}}/),handlebars:s.starting_with(/{{/).until_after(/}}/),php:s.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),erb:s.starting_with(/<%[^%]/).until_after(/[^%]%>/),django:s.starting_with(/{%/).until_after(/%}/),django_value:s.starting_with(/{{/).until_after(/}}/),django_comment:s.starting_with(/{#/).until_after(/#}/),smarty:s.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),smarty_comment:s.starting_with(/{\*/).until_after(/\*}/),smarty_literal:s.starting_with(/{literal}/).until_after(/{\/literal}/)}}et.prototype=new uc;et.prototype._create=function(){return new et(this._input,this)};et.prototype._update=function(){this.__set_templated_pattern()};et.prototype.disable=function(e){var t=this._create();return t._disabled[e]=!0,t._update(),t};et.prototype.read_options=function(e){var t=this._create();for(var s in dc)t._disabled[s]=e.templating.indexOf(s)===-1;return t._update(),t};et.prototype.exclude=function(e){var t=this._create();return t._excluded[e]=!0,t._update(),t};et.prototype.read=function(){var e="";this._match_pattern?e=this._input.read(this._starting_pattern):e=this._input.read(this._starting_pattern,this.__template_pattern);for(var t=this._read_template();t;)this._match_pattern?t+=this._input.read(this._match_pattern):t+=this._input.readUntil(this.__template_pattern),e+=t,t=this._read_template();return this._until_after&&(e+=this._input.readUntilAfter(this._until_pattern)),e};et.prototype.__set_templated_pattern=function(){var e=[];this._disabled.php||e.push(this.__patterns.php._starting_pattern.source),this._disabled.handlebars||e.push(this.__patterns.handlebars._starting_pattern.source),this._disabled.erb||e.push(this.__patterns.erb._starting_pattern.source),this._disabled.django||(e.push(this.__patterns.django._starting_pattern.source),e.push(this.__patterns.django_value._starting_pattern.source),e.push(this.__patterns.django_comment._starting_pattern.source)),this._disabled.smarty||e.push(this.__patterns.smarty._starting_pattern.source),this._until_pattern&&e.push(this._until_pattern.source),this.__template_pattern=this._input.get_regexp("(?:"+e.join("|")+")")};et.prototype._read_template=function(){var e="",t=this._input.peek();if(t==="<"){var s=this._input.peek(1);!this._disabled.php&&!this._excluded.php&&s==="?"&&(e=e||this.__patterns.php.read()),!this._disabled.erb&&!this._excluded.erb&&s==="%"&&(e=e||this.__patterns.erb.read())}else t==="{"&&(!this._disabled.handlebars&&!this._excluded.handlebars&&(e=e||this.__patterns.handlebars_comment.read(),e=e||this.__patterns.handlebars_unescaped.read(),e=e||this.__patterns.handlebars.read()),this._disabled.django||(!this._excluded.django&&!this._excluded.handlebars&&(e=e||this.__patterns.django_value.read()),this._excluded.django||(e=e||this.__patterns.django_comment.read(),e=e||this.__patterns.django.read())),this._disabled.smarty||this._disabled.django&&this._disabled.handlebars&&(e=e||this.__patterns.smarty_comment.read(),e=e||this.__patterns.smarty_literal.read(),e=e||this.__patterns.smarty.read()));return e};Ob.exports.TemplatablePattern=et});var Er=h((Z4,Lr)=>{"use strict";var nj=Yn().InputScanner,Rb=Sr().Tokenizer,fc=Sr().TOKEN,ij=Qn().Directives,De=oc(),oj=wr().Pattern,aj=mc().TemplatablePattern;function hc(e,t){return t.indexOf(e)!==-1}var O={START_EXPR:"TK_START_EXPR",END_EXPR:"TK_END_EXPR",START_BLOCK:"TK_START_BLOCK",END_BLOCK:"TK_END_BLOCK",WORD:"TK_WORD",RESERVED:"TK_RESERVED",SEMICOLON:"TK_SEMICOLON",STRING:"TK_STRING",EQUALS:"TK_EQUALS",OPERATOR:"TK_OPERATOR",COMMA:"TK_COMMA",BLOCK_COMMENT:"TK_BLOCK_COMMENT",COMMENT:"TK_COMMENT",DOT:"TK_DOT",UNKNOWN:"TK_UNKNOWN",START:fc.START,RAW:fc.RAW,EOF:fc.EOF},qb=new ij(/\/\*/,/\*\//),lj=/0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/,cj=/[0-9]/,pj=/[^\d\.]/,uj=">>> === !== << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" "),ns=">>>= ... >>= <<= === >>> !== **= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";ns=ns.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&");ns="\\?\\.(?!\\d) "+ns;ns=ns.replace(/ /g,"|");var dj=new RegExp(ns),Ib="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","),mj=Ib.concat(["do","in","of","else","get","set","new","catch","finally","typeof","yield","async","await","from","as"]),fj=new RegExp("^(?:"+mj.join("|")+")$"),Zn,ye=function(e,t){Rb.call(this,e,t),this._patterns.whitespace=this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,/\u2028\u2029/.source);var s=new oj(this._input),r=new aj(this._input).read_options(this._options);this.__patterns={template:r,identifier:r.starting_with(De.identifier).matching(De.identifierMatch),number:s.matching(lj),punct:s.matching(dj),comment:s.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),block_comment:s.starting_with(/\/\*/).until_after(/\*\//),html_comment_start:s.matching(/<!--/),html_comment_end:s.matching(/-->/),include:s.starting_with(/#include/).until_after(De.lineBreak),shebang:s.starting_with(/#!/).until_after(De.lineBreak),xml:s.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\]|)(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/),single_quote:r.until(/['\\\n\r\u2028\u2029]/),double_quote:r.until(/["\\\n\r\u2028\u2029]/),template_text:r.until(/[`\\$]/),template_expression:r.until(/[`}\\]/)}};ye.prototype=new Rb;ye.prototype._is_comment=function(e){return e.type===O.COMMENT||e.type===O.BLOCK_COMMENT||e.type===O.UNKNOWN};ye.prototype._is_opening=function(e){return e.type===O.START_BLOCK||e.type===O.START_EXPR};ye.prototype._is_closing=function(e,t){return(e.type===O.END_BLOCK||e.type===O.END_EXPR)&&t&&(e.text==="]"&&t.text==="["||e.text===")"&&t.text==="("||e.text==="}"&&t.text==="{")};ye.prototype._reset=function(){Zn=!1};ye.prototype._get_next_token=function(e,t){var s=null;this._readWhitespace();var r=this._input.peek();return r===null?this._create_token(O.EOF,""):(s=s||this._read_non_javascript(r),s=s||this._read_string(r),s=s||this._read_word(e),s=s||this._read_singles(r),s=s||this._read_comment(r),s=s||this._read_regexp(r,e),s=s||this._read_xml(r,e),s=s||this._read_punctuation(),s=s||this._create_token(O.UNKNOWN,this._input.next()),s)};ye.prototype._read_word=function(e){var t;if(t=this.__patterns.identifier.read(),t!=="")return t=t.replace(De.allLineBreaks,`
`),!(e.type===O.DOT||e.type===O.RESERVED&&(e.text==="set"||e.text==="get"))&&fj.test(t)?t==="in"||t==="of"?this._create_token(O.OPERATOR,t):this._create_token(O.RESERVED,t):this._create_token(O.WORD,t);if(t=this.__patterns.number.read(),t!=="")return this._create_token(O.WORD,t)};ye.prototype._read_singles=function(e){var t=null;return e==="("||e==="["?t=this._create_token(O.START_EXPR,e):e===")"||e==="]"?t=this._create_token(O.END_EXPR,e):e==="{"?t=this._create_token(O.START_BLOCK,e):e==="}"?t=this._create_token(O.END_BLOCK,e):e===";"?t=this._create_token(O.SEMICOLON,e):e==="."&&pj.test(this._input.peek(1))?t=this._create_token(O.DOT,e):e===","&&(t=this._create_token(O.COMMA,e)),t&&this._input.next(),t};ye.prototype._read_punctuation=function(){var e=this.__patterns.punct.read();if(e!=="")return e==="="?this._create_token(O.EQUALS,e):e==="?."?this._create_token(O.DOT,e):this._create_token(O.OPERATOR,e)};ye.prototype._read_non_javascript=function(e){var t="";if(e==="#"){if(this._is_first_token()&&(t=this.__patterns.shebang.read(),t))return this._create_token(O.UNKNOWN,t.trim()+`
`);if(t=this.__patterns.include.read(),t)return this._create_token(O.UNKNOWN,t.trim()+`
`);e=this._input.next();var s="#";if(this._input.hasNext()&&this._input.testChar(cj)){do e=this._input.next(),s+=e;while(this._input.hasNext()&&e!=="#"&&e!=="=");return e==="#"||(this._input.peek()==="["&&this._input.peek(1)==="]"?(s+="[]",this._input.next(),this._input.next()):this._input.peek()==="{"&&this._input.peek(1)==="}"&&(s+="{}",this._input.next(),this._input.next())),this._create_token(O.WORD,s)}this._input.back()}else if(e==="<"&&this._is_first_token()){if(t=this.__patterns.html_comment_start.read(),t){for(;this._input.hasNext()&&!this._input.testChar(De.newline);)t+=this._input.next();return Zn=!0,this._create_token(O.COMMENT,t)}}else if(Zn&&e==="-"&&(t=this.__patterns.html_comment_end.read(),t))return Zn=!1,this._create_token(O.COMMENT,t);return null};ye.prototype._read_comment=function(e){var t=null;if(e==="/"){var s="";if(this._input.peek(1)==="*"){s=this.__patterns.block_comment.read();var r=qb.get_directives(s);r&&r.ignore==="start"&&(s+=qb.readIgnored(this._input)),s=s.replace(De.allLineBreaks,`
`),t=this._create_token(O.BLOCK_COMMENT,s),t.directives=r}else this._input.peek(1)==="/"&&(s=this.__patterns.comment.read(),t=this._create_token(O.COMMENT,s))}return t};ye.prototype._read_string=function(e){if(e==="`"||e==="'"||e==='"'){var t=this._input.next();return this.has_char_escapes=!1,e==="`"?t+=this._read_string_recursive("`",!0,"${"):t+=this._read_string_recursive(e),this.has_char_escapes&&this._options.unescape_strings&&(t=hj(t)),this._input.peek()===e&&(t+=this._input.next()),t=t.replace(De.allLineBreaks,`
`),this._create_token(O.STRING,t)}return null};ye.prototype._allow_regexp_or_xml=function(e){return e.type===O.RESERVED&&hc(e.text,["return","case","throw","else","do","typeof","yield"])||e.type===O.END_EXPR&&e.text===")"&&e.opened.previous.type===O.RESERVED&&hc(e.opened.previous.text,["if","while","for"])||hc(e.type,[O.COMMENT,O.START_EXPR,O.START_BLOCK,O.START,O.END_BLOCK,O.OPERATOR,O.EQUALS,O.EOF,O.SEMICOLON,O.COMMA])};ye.prototype._read_regexp=function(e,t){if(e==="/"&&this._allow_regexp_or_xml(t)){for(var s=this._input.next(),r=!1,n=!1;this._input.hasNext()&&(r||n||this._input.peek()!==e)&&!this._input.testChar(De.newline);)s+=this._input.peek(),r?r=!1:(r=this._input.peek()==="\\",this._input.peek()==="["?n=!0:this._input.peek()==="]"&&(n=!1)),this._input.next();return this._input.peek()===e&&(s+=this._input.next(),s+=this._input.read(De.identifier)),this._create_token(O.STRING,s)}return null};ye.prototype._read_xml=function(e,t){if(this._options.e4x&&e==="<"&&this._allow_regexp_or_xml(t)){var s="",r=this.__patterns.xml.read_match();if(r){for(var n=r[2].replace(/^{\s+/,"{").replace(/\s+}$/,"}"),i=n.indexOf("{")===0,o=0;r;){var a=!!r[1],l=r[2],c=!!r[r.length-1]||l.slice(0,8)==="![CDATA[";if(!c&&(l===n||i&&l.replace(/^{\s+/,"{").replace(/\s+}$/,"}"))&&(a?--o:++o),s+=r[0],o<=0)break;r=this.__patterns.xml.read_match()}return r||(s+=this._input.match(/[\s\S]*/g)[0]),s=s.replace(De.allLineBreaks,`
`),this._create_token(O.STRING,s)}}return null};function hj(e){for(var t="",s=0,r=new nj(e),n=null;r.hasNext();)if(n=r.match(/([\s]|[^\\]|\\\\)+/g),n&&(t+=n[0]),r.peek()==="\\"){if(r.next(),r.peek()==="x")n=r.match(/x([0-9A-Fa-f]{2})/g);else if(r.peek()==="u")n=r.match(/u([0-9A-Fa-f]{4})/g);else{t+="\\",r.hasNext()&&(t+=r.next());continue}if(!n||(s=parseInt(n[1],16),s>126&&s<=255&&n[0].indexOf("x")===0))return e;if(s>=0&&s<32){t+="\\"+n[0];continue}else s===34||s===39||s===92?t+="\\"+String.fromCharCode(s):t+=String.fromCharCode(s)}return t}ye.prototype._read_string_recursive=function(e,t,s){var r,n;e==="'"?n=this.__patterns.single_quote:e==='"'?n=this.__patterns.double_quote:e==="`"?n=this.__patterns.template_text:e==="}"&&(n=this.__patterns.template_expression);for(var i=n.read(),o="";this._input.hasNext();){if(o=this._input.next(),o===e||!t&&De.newline.test(o)){this._input.back();break}else o==="\\"&&this._input.hasNext()?(r=this._input.peek(),r==="x"||r==="u"?this.has_char_escapes=!0:r==="\r"&&this._input.peek(1)===`
`&&this._input.next(),o+=this._input.next()):s&&(s==="${"&&o==="$"&&this._input.peek()==="{"&&(o+=this._input.next()),s===o&&(e==="`"?o+=this._read_string_recursive("}",t,"`"):o+=this._read_string_recursive("`",t,"${"),this._input.hasNext()&&(o+=this._input.next())));o+=n.read(),i+=o}return i};Lr.exports.Tokenizer=ye;Lr.exports.TOKEN=O;Lr.exports.positionable_operators=uj.slice();Lr.exports.line_starters=Ib.slice()});var Nb=h((e$,Db)=>{"use strict";var gj=Vn().Output,_j=nc().Token,ei=oc(),yj=ac().Options,vj=Er().Tokenizer,jr=Er().line_starters,kr=Er().positionable_operators,x=Er().TOKEN;function D(e,t){return t.indexOf(e)!==-1}function bj(e){return e.replace(/^\s+/g,"")}function wj(e){for(var t={},s=0;s<e.length;s++)t[e[s].replace(/-/g,"_")]=e[s];return t}function Ne(e,t){return e&&e.type===x.RESERVED&&e.text===t}function Y(e,t){return e&&e.type===x.RESERVED&&D(e.text,t)}var ti=["case","return","do","if","throw","else","await","break","continue","async"],xj=["before-newline","after-newline","preserve-newline"],Tr=wj(xj),Hb=[Tr.before_newline,Tr.preserve_newline],q={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"};function Bb(e,t){t.multiline_frame||t.mode===q.ForInitializer||t.mode===q.Conditional||e.remove_indent(t.start_line_index)}function Sj(e){e=e.replace(ei.allLineBreaks,`
`);for(var t=[],s=e.indexOf(`
`);s!==-1;)t.push(e.substring(0,s)),e=e.substring(s+1),s=e.indexOf(`
`);return e.length&&t.push(e),t}function Pt(e){return e===q.ArrayLiteral}function Cr(e){return D(e,[q.Expression,q.ForInitializer,q.Conditional])}function Lj(e,t){for(var s=0;s<e.length;s++){var r=e[s].trim();if(r.charAt(0)!==t)return!1}return!0}function Ej(e,t){for(var s=0,r=e.length,n;s<r;s++)if(n=e[s],n&&n.indexOf(t)!==0)return!1;return!0}function z(e,t){t=t||{},this._source_text=e||"",this._output=null,this._tokens=null,this._last_last_text=null,this._flags=null,this._previous_flags=null,this._flag_store=null,this._options=new yj(t)}z.prototype.create_flags=function(e,t){var s=0;e&&(s=e.indentation_level,!this._output.just_added_newline()&&e.line_indent_level>s&&(s=e.line_indent_level));var r={mode:t,parent:e,last_token:e?e.last_token:new _j(x.START_BLOCK,""),last_word:e?e.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,inline_frame:!1,if_block:!1,else_block:!1,do_block:!1,do_while:!1,import_block:!1,in_case_statement:!1,in_case:!1,case_body:!1,indentation_level:s,alignment:0,line_indent_level:e?e.line_indent_level:s,start_line_index:this._output.get_line_number(),ternary_depth:0};return r};z.prototype._reset=function(e){var t=e.match(/^[\t ]*/)[0];this._last_last_text="",this._output=new gj(this._options,t),this._output.raw=this._options.test_output_raw,this._flag_store=[],this.set_mode(q.BlockStatement);var s=new vj(e,this._options);return this._tokens=s.tokenize(),e};z.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e,t=this._reset(this._source_text),s=this._options.eol;this._options.eol==="auto"&&(s=`
`,t&&ei.lineBreak.test(t||"")&&(s=t.match(ei.lineBreak)[0]));for(var r=this._tokens.next();r;)this.handle_token(r),this._last_last_text=this._flags.last_token.text,this._flags.last_token=r,r=this._tokens.next();return e=this._output.get_code(s),e};z.prototype.handle_token=function(e,t){e.type===x.START_EXPR?this.handle_start_expr(e):e.type===x.END_EXPR?this.handle_end_expr(e):e.type===x.START_BLOCK?this.handle_start_block(e):e.type===x.END_BLOCK?this.handle_end_block(e):e.type===x.WORD?this.handle_word(e):e.type===x.RESERVED?this.handle_word(e):e.type===x.SEMICOLON?this.handle_semicolon(e):e.type===x.STRING?this.handle_string(e):e.type===x.EQUALS?this.handle_equals(e):e.type===x.OPERATOR?this.handle_operator(e):e.type===x.COMMA?this.handle_comma(e):e.type===x.BLOCK_COMMENT?this.handle_block_comment(e,t):e.type===x.COMMENT?this.handle_comment(e,t):e.type===x.DOT?this.handle_dot(e):e.type===x.EOF?this.handle_eof(e):e.type===x.UNKNOWN?this.handle_unknown(e,t):this.handle_unknown(e,t)};z.prototype.handle_whitespace_and_comments=function(e,t){var s=e.newlines,r=this._options.keep_array_indentation&&Pt(this._flags.mode);if(e.comments_before)for(var n=e.comments_before.next();n;)this.handle_whitespace_and_comments(n,t),this.handle_token(n,t),n=e.comments_before.next();if(r)for(var i=0;i<s;i+=1)this.print_newline(i>0,t);else if(this._options.max_preserve_newlines&&s>this._options.max_preserve_newlines&&(s=this._options.max_preserve_newlines),this._options.preserve_newlines&&s>1){this.print_newline(!1,t);for(var o=1;o<s;o+=1)this.print_newline(!0,t)}};var gc=["async","break","continue","return","throw","yield"];z.prototype.allow_wrap_or_preserved_newline=function(e,t){if(t=t===void 0?!1:t,!this._output.just_added_newline()){var s=this._options.preserve_newlines&&e.newlines||t,r=D(this._flags.last_token.text,kr)||D(e.text,kr);if(r){var n=D(this._flags.last_token.text,kr)&&D(this._options.operator_position,Hb)||D(e.text,kr);s=s&&n}if(s)this.print_newline(!1,!0);else if(this._options.wrap_line_length){if(Y(this._flags.last_token,gc))return;this._output.set_wrap_point()}}};z.prototype.print_newline=function(e,t){if(!t&&this._flags.last_token.text!==";"&&this._flags.last_token.text!==","&&this._flags.last_token.text!=="="&&(this._flags.last_token.type!==x.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++"))for(var s=this._tokens.peek();this._flags.mode===q.Statement&&!(this._flags.if_block&&Ne(s,"else"))&&!this._flags.do_block;)this.restore_mode();this._output.add_new_line(e)&&(this._flags.multiline_frame=!0)};z.prototype.print_token_line_indentation=function(e){this._output.just_added_newline()&&(this._options.keep_array_indentation&&e.newlines&&(e.text==="["||Pt(this._flags.mode))?(this._output.current_line.set_indent(-1),this._output.current_line.push(e.whitespace_before),this._output.space_before_token=!1):this._output.set_indent(this._flags.indentation_level,this._flags.alignment)&&(this._flags.line_indent_level=this._flags.indentation_level))};z.prototype.print_token=function(e){if(this._output.raw){this._output.add_raw_token(e);return}if(this._options.comma_first&&e.previous&&e.previous.type===x.COMMA&&this._output.just_added_newline()&&this._output.previous_line.last()===","){var t=this._output.previous_line.pop();this._output.previous_line.is_empty()&&(this._output.previous_line.push(t),this._output.trim(!0),this._output.current_line.pop(),this._output.trim()),this.print_token_line_indentation(e),this._output.add_token(","),this._output.space_before_token=!0}this.print_token_line_indentation(e),this._output.non_breaking_space=!0,this._output.add_token(e.text),this._output.previous_token_wrapped&&(this._flags.multiline_frame=!0)};z.prototype.indent=function(){this._flags.indentation_level+=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment)};z.prototype.deindent=function(){this._flags.indentation_level>0&&(!this._flags.parent||this._flags.indentation_level>this._flags.parent.indentation_level)&&(this._flags.indentation_level-=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment))};z.prototype.set_mode=function(e){this._flags?(this._flag_store.push(this._flags),this._previous_flags=this._flags):this._previous_flags=this.create_flags(null,e),this._flags=this.create_flags(this._previous_flags,e),this._output.set_indent(this._flags.indentation_level,this._flags.alignment)};z.prototype.restore_mode=function(){this._flag_store.length>0&&(this._previous_flags=this._flags,this._flags=this._flag_store.pop(),this._previous_flags.mode===q.Statement&&Bb(this._output,this._previous_flags),this._output.set_indent(this._flags.indentation_level,this._flags.alignment))};z.prototype.start_of_object_property=function(){return this._flags.parent.mode===q.ObjectLiteral&&this._flags.mode===q.Statement&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||Y(this._flags.last_token,["get","set"]))};z.prototype.start_of_statement=function(e){var t=!1;return t=t||Y(this._flags.last_token,["var","let","const"])&&e.type===x.WORD,t=t||Ne(this._flags.last_token,"do"),t=t||!(this._flags.parent.mode===q.ObjectLiteral&&this._flags.mode===q.Statement)&&Y(this._flags.last_token,gc)&&!e.newlines,t=t||Ne(this._flags.last_token,"else")&&!(Ne(e,"if")&&!e.comments_before),t=t||this._flags.last_token.type===x.END_EXPR&&(this._previous_flags.mode===q.ForInitializer||this._previous_flags.mode===q.Conditional),t=t||this._flags.last_token.type===x.WORD&&this._flags.mode===q.BlockStatement&&!this._flags.in_case&&!(e.text==="--"||e.text==="++")&&this._last_last_text!=="function"&&e.type!==x.WORD&&e.type!==x.RESERVED,t=t||this._flags.mode===q.ObjectLiteral&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||Y(this._flags.last_token,["get","set"])),t?(this.set_mode(q.Statement),this.indent(),this.handle_whitespace_and_comments(e,!0),this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e,Y(e,["do","for","if","while"])),!0):!1};z.prototype.handle_start_expr=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e);var t=q.Expression;if(e.text==="["){if(this._flags.last_token.type===x.WORD||this._flags.last_token.text===")"){Y(this._flags.last_token,jr)&&(this._output.space_before_token=!0),this.print_token(e),this.set_mode(t),this.indent(),this._options.space_in_paren&&(this._output.space_before_token=!0);return}t=q.ArrayLiteral,Pt(this._flags.mode)&&(this._flags.last_token.text==="["||this._flags.last_token.text===","&&(this._last_last_text==="]"||this._last_last_text==="}"))&&(this._options.keep_array_indentation||this.print_newline()),D(this._flags.last_token.type,[x.START_EXPR,x.END_EXPR,x.WORD,x.OPERATOR,x.DOT])||(this._output.space_before_token=!0)}else{if(this._flags.last_token.type===x.RESERVED)this._flags.last_token.text==="for"?(this._output.space_before_token=this._options.space_before_conditional,t=q.ForInitializer):D(this._flags.last_token.text,["if","while","switch"])?(this._output.space_before_token=this._options.space_before_conditional,t=q.Conditional):D(this._flags.last_word,["await","async"])?this._output.space_before_token=!0:this._flags.last_token.text==="import"&&e.whitespace_before===""?this._output.space_before_token=!1:(D(this._flags.last_token.text,jr)||this._flags.last_token.text==="catch")&&(this._output.space_before_token=!0);else if(this._flags.last_token.type===x.EQUALS||this._flags.last_token.type===x.OPERATOR)this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e);else if(this._flags.last_token.type===x.WORD){this._output.space_before_token=!1;var s=this._tokens.peek(-3);if(this._options.space_after_named_function&&s){var r=this._tokens.peek(-4);Y(s,["async","function"])||s.text==="*"&&Y(r,["async","function"])?this._output.space_before_token=!0:this._flags.mode===q.ObjectLiteral&&(s.text==="{"||s.text===","||s.text==="*"&&(r.text==="{"||r.text===","))&&(this._output.space_before_token=!0)}}else this.allow_wrap_or_preserved_newline(e);(this._flags.last_token.type===x.RESERVED&&(this._flags.last_word==="function"||this._flags.last_word==="typeof")||this._flags.last_token.text==="*"&&(D(this._last_last_text,["function","yield"])||this._flags.mode===q.ObjectLiteral&&D(this._last_last_text,["{",","])))&&(this._output.space_before_token=this._options.space_after_anon_function)}this._flags.last_token.text===";"||this._flags.last_token.type===x.START_BLOCK?this.print_newline():(this._flags.last_token.type===x.END_EXPR||this._flags.last_token.type===x.START_EXPR||this._flags.last_token.type===x.END_BLOCK||this._flags.last_token.text==="."||this._flags.last_token.type===x.COMMA)&&this.allow_wrap_or_preserved_newline(e,e.newlines),this.print_token(e),this.set_mode(t),this._options.space_in_paren&&(this._output.space_before_token=!0),this.indent()};z.prototype.handle_end_expr=function(e){for(;this._flags.mode===q.Statement;)this.restore_mode();this.handle_whitespace_and_comments(e),this._flags.multiline_frame&&this.allow_wrap_or_preserved_newline(e,e.text==="]"&&Pt(this._flags.mode)&&!this._options.keep_array_indentation),this._options.space_in_paren&&(this._flags.last_token.type===x.START_EXPR&&!this._options.space_in_empty_paren?(this._output.trim(),this._output.space_before_token=!1):this._output.space_before_token=!0),this.deindent(),this.print_token(e),this.restore_mode(),Bb(this._output,this._previous_flags),this._flags.do_while&&this._previous_flags.mode===q.Conditional&&(this._previous_flags.mode=q.Expression,this._flags.do_block=!1,this._flags.do_while=!1)};z.prototype.handle_start_block=function(e){this.handle_whitespace_and_comments(e);var t=this._tokens.peek(),s=this._tokens.peek(1);this._flags.last_word==="switch"&&this._flags.last_token.type===x.END_EXPR?(this.set_mode(q.BlockStatement),this._flags.in_case_statement=!0):this._flags.case_body?this.set_mode(q.BlockStatement):s&&(D(s.text,[":",","])&&D(t.type,[x.STRING,x.WORD,x.RESERVED])||D(t.text,["get","set","..."])&&D(s.type,[x.WORD,x.RESERVED]))?D(this._last_last_text,["class","interface"])?this.set_mode(q.BlockStatement):this.set_mode(q.ObjectLiteral):this._flags.last_token.type===x.OPERATOR&&this._flags.last_token.text==="=>"?this.set_mode(q.BlockStatement):D(this._flags.last_token.type,[x.EQUALS,x.START_EXPR,x.COMMA,x.OPERATOR])||Y(this._flags.last_token,["return","throw","import","default"])?this.set_mode(q.ObjectLiteral):this.set_mode(q.BlockStatement);var r=!t.comments_before&&t.text==="}",n=r&&this._flags.last_word==="function"&&this._flags.last_token.type===x.END_EXPR;if(this._options.brace_preserve_inline){var i=0,o=null;this._flags.inline_frame=!0;do if(i+=1,o=this._tokens.peek(i-1),o.newlines){this._flags.inline_frame=!1;break}while(o.type!==x.EOF&&!(o.type===x.END_BLOCK&&o.opened===e))}(this._options.brace_style==="expand"||this._options.brace_style==="none"&&e.newlines)&&!this._flags.inline_frame?this._flags.last_token.type!==x.OPERATOR&&(n||this._flags.last_token.type===x.EQUALS||Y(this._flags.last_token,ti)&&this._flags.last_token.text!=="else")?this._output.space_before_token=!0:this.print_newline(!1,!0):(Pt(this._previous_flags.mode)&&(this._flags.last_token.type===x.START_EXPR||this._flags.last_token.type===x.COMMA)&&((this._flags.last_token.type===x.COMMA||this._options.space_in_paren)&&(this._output.space_before_token=!0),(this._flags.last_token.type===x.COMMA||this._flags.last_token.type===x.START_EXPR&&this._flags.inline_frame)&&(this.allow_wrap_or_preserved_newline(e),this._previous_flags.multiline_frame=this._previous_flags.multiline_frame||this._flags.multiline_frame,this._flags.multiline_frame=!1)),this._flags.last_token.type!==x.OPERATOR&&this._flags.last_token.type!==x.START_EXPR&&(this._flags.last_token.type===x.START_BLOCK&&!this._flags.inline_frame?this.print_newline():this._output.space_before_token=!0)),this.print_token(e),this.indent(),!r&&!(this._options.brace_preserve_inline&&this._flags.inline_frame)&&this.print_newline()};z.prototype.handle_end_block=function(e){for(this.handle_whitespace_and_comments(e);this._flags.mode===q.Statement;)this.restore_mode();var t=this._flags.last_token.type===x.START_BLOCK;this._flags.inline_frame&&!t?this._output.space_before_token=!0:this._options.brace_style==="expand"?t||this.print_newline():t||(Pt(this._flags.mode)&&this._options.keep_array_indentation?(this._options.keep_array_indentation=!1,this.print_newline(),this._options.keep_array_indentation=!0):this.print_newline()),this.restore_mode(),this.print_token(e)};z.prototype.handle_word=function(e){if(e.type===x.RESERVED){if(D(e.text,["set","get"])&&this._flags.mode!==q.ObjectLiteral)e.type=x.WORD;else if(e.text==="import"&&this._tokens.peek().text==="(")e.type=x.WORD;else if(D(e.text,["as","from"])&&!this._flags.import_block)e.type=x.WORD;else if(this._flags.mode===q.ObjectLiteral){var t=this._tokens.peek();t.text===":"&&(e.type=x.WORD)}}if(this.start_of_statement(e)?Y(this._flags.last_token,["var","let","const"])&&e.type===x.WORD&&(this._flags.declaration_statement=!0):e.newlines&&!Cr(this._flags.mode)&&(this._flags.last_token.type!==x.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++")&&this._flags.last_token.type!==x.EQUALS&&(this._options.preserve_newlines||!Y(this._flags.last_token,["var","let","const","set","get"]))?(this.handle_whitespace_and_comments(e),this.print_newline()):this.handle_whitespace_and_comments(e),this._flags.do_block&&!this._flags.do_while)if(Ne(e,"while")){this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0,this._flags.do_while=!0;return}else this.print_newline(),this._flags.do_block=!1;if(this._flags.if_block)if(!this._flags.else_block&&Ne(e,"else"))this._flags.else_block=!0;else{for(;this._flags.mode===q.Statement;)this.restore_mode();this._flags.if_block=!1,this._flags.else_block=!1}if(this._flags.in_case_statement&&Y(e,["case","default"])){this.print_newline(),this._flags.last_token.type!==x.END_BLOCK&&(this._flags.case_body||this._options.jslint_happy)&&this.deindent(),this._flags.case_body=!1,this.print_token(e),this._flags.in_case=!0;return}if((this._flags.last_token.type===x.COMMA||this._flags.last_token.type===x.START_EXPR||this._flags.last_token.type===x.EQUALS||this._flags.last_token.type===x.OPERATOR)&&(this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e)),Ne(e,"function")){(D(this._flags.last_token.text,["}",";"])||this._output.just_added_newline()&&!(D(this._flags.last_token.text,["(","[","{",":","=",","])||this._flags.last_token.type===x.OPERATOR))&&!this._output.just_added_blankline()&&!e.comments_before&&(this.print_newline(),this.print_newline(!0)),this._flags.last_token.type===x.RESERVED||this._flags.last_token.type===x.WORD?Y(this._flags.last_token,["get","set","new","export"])||Y(this._flags.last_token,gc)?this._output.space_before_token=!0:Ne(this._flags.last_token,"default")&&this._last_last_text==="export"?this._output.space_before_token=!0:this._flags.last_token.text==="declare"?this._output.space_before_token=!0:this.print_newline():this._flags.last_token.type===x.OPERATOR||this._flags.last_token.text==="="?this._output.space_before_token=!0:!this._flags.multiline_frame&&(Cr(this._flags.mode)||Pt(this._flags.mode))||this.print_newline(),this.print_token(e),this._flags.last_word=e.text;return}var s="NONE";if(this._flags.last_token.type===x.END_BLOCK?this._previous_flags.inline_frame?s="SPACE":Y(e,["else","catch","finally","from"])?this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&e.newlines?s="NEWLINE":(s="SPACE",this._output.space_before_token=!0):s="NEWLINE":this._flags.last_token.type===x.SEMICOLON&&this._flags.mode===q.BlockStatement?s="NEWLINE":this._flags.last_token.type===x.SEMICOLON&&Cr(this._flags.mode)?s="SPACE":this._flags.last_token.type===x.STRING?s="NEWLINE":this._flags.last_token.type===x.RESERVED||this._flags.last_token.type===x.WORD||this._flags.last_token.text==="*"&&(D(this._last_last_text,["function","yield"])||this._flags.mode===q.ObjectLiteral&&D(this._last_last_text,["{",","]))?s="SPACE":this._flags.last_token.type===x.START_BLOCK?this._flags.inline_frame?s="SPACE":s="NEWLINE":this._flags.last_token.type===x.END_EXPR&&(this._output.space_before_token=!0,s="NEWLINE"),Y(e,jr)&&this._flags.last_token.text!==")"&&(this._flags.inline_frame||this._flags.last_token.text==="else"||this._flags.last_token.text==="export"?s="SPACE":s="NEWLINE"),Y(e,["else","catch","finally"]))if((!(this._flags.last_token.type===x.END_BLOCK&&this._previous_flags.mode===q.BlockStatement)||this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&e.newlines)&&!this._flags.inline_frame)this.print_newline();else{this._output.trim(!0);var r=this._output.current_line;r.last()!=="}"&&this.print_newline(),this._output.space_before_token=!0}else s==="NEWLINE"?Y(this._flags.last_token,ti)?this._output.space_before_token=!0:this._flags.last_token.text==="declare"&&Y(e,["var","let","const"])?this._output.space_before_token=!0:this._flags.last_token.type!==x.END_EXPR?(this._flags.last_token.type!==x.START_EXPR||!Y(e,["var","let","const"]))&&this._flags.last_token.text!==":"&&(Ne(e,"if")&&Ne(e.previous,"else")?this._output.space_before_token=!0:this.print_newline()):Y(e,jr)&&this._flags.last_token.text!==")"&&this.print_newline():this._flags.multiline_frame&&Pt(this._flags.mode)&&this._flags.last_token.text===","&&this._last_last_text==="}"?this.print_newline():s==="SPACE"&&(this._output.space_before_token=!0);e.previous&&(e.previous.type===x.WORD||e.previous.type===x.RESERVED)&&(this._output.space_before_token=!0),this.print_token(e),this._flags.last_word=e.text,e.type===x.RESERVED&&(e.text==="do"?this._flags.do_block=!0:e.text==="if"?this._flags.if_block=!0:e.text==="import"?this._flags.import_block=!0:this._flags.import_block&&Ne(e,"from")&&(this._flags.import_block=!1))};z.prototype.handle_semicolon=function(e){this.start_of_statement(e)?this._output.space_before_token=!1:this.handle_whitespace_and_comments(e);for(var t=this._tokens.peek();this._flags.mode===q.Statement&&!(this._flags.if_block&&Ne(t,"else"))&&!this._flags.do_block;)this.restore_mode();this._flags.import_block&&(this._flags.import_block=!1),this.print_token(e)};z.prototype.handle_string=function(e){e.text.startsWith("`")&&e.newlines===0&&e.whitespace_before===""&&(e.previous.text===")"||this._flags.last_token.type===x.WORD)||(this.start_of_statement(e)?this._output.space_before_token=!0:(this.handle_whitespace_and_comments(e),this._flags.last_token.type===x.RESERVED||this._flags.last_token.type===x.WORD||this._flags.inline_frame?this._output.space_before_token=!0:this._flags.last_token.type===x.COMMA||this._flags.last_token.type===x.START_EXPR||this._flags.last_token.type===x.EQUALS||this._flags.last_token.type===x.OPERATOR?this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e):e.text.startsWith("`")&&this._flags.last_token.type===x.END_EXPR&&(e.previous.text==="]"||e.previous.text===")")&&e.newlines===0?this._output.space_before_token=!0:this.print_newline())),this.print_token(e)};z.prototype.handle_equals=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e),this._flags.declaration_statement&&(this._flags.declaration_assignment=!0),this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0};z.prototype.handle_comma=function(e){this.handle_whitespace_and_comments(e,!0),this.print_token(e),this._output.space_before_token=!0,this._flags.declaration_statement?(Cr(this._flags.parent.mode)&&(this._flags.declaration_assignment=!1),this._flags.declaration_assignment?(this._flags.declaration_assignment=!1,this.print_newline(!1,!0)):this._options.comma_first&&this.allow_wrap_or_preserved_newline(e)):this._flags.mode===q.ObjectLiteral||this._flags.mode===q.Statement&&this._flags.parent.mode===q.ObjectLiteral?(this._flags.mode===q.Statement&&this.restore_mode(),this._flags.inline_frame||this.print_newline()):this._options.comma_first&&this.allow_wrap_or_preserved_newline(e)};z.prototype.handle_operator=function(e){var t=e.text==="*"&&(Y(this._flags.last_token,["function","yield"])||D(this._flags.last_token.type,[x.START_BLOCK,x.COMMA,x.END_BLOCK,x.SEMICOLON])),s=D(e.text,["-","+"])&&(D(this._flags.last_token.type,[x.START_BLOCK,x.START_EXPR,x.EQUALS,x.OPERATOR])||D(this._flags.last_token.text,jr)||this._flags.last_token.text===",");if(!this.start_of_statement(e)){var r=!t;this.handle_whitespace_and_comments(e,r)}if(Y(this._flags.last_token,ti)){this._output.space_before_token=!0,this.print_token(e);return}if(e.text==="*"&&this._flags.last_token.type===x.DOT){this.print_token(e);return}if(e.text==="::"){this.print_token(e);return}if(this._flags.last_token.type===x.OPERATOR&&D(this._options.operator_position,Hb)&&this.allow_wrap_or_preserved_newline(e),e.text===":"&&this._flags.in_case){this.print_token(e),this._flags.in_case=!1,this._flags.case_body=!0,this._tokens.peek().type!==x.START_BLOCK?(this.indent(),this.print_newline()):this._output.space_before_token=!0;return}var n=!0,i=!0,o=!1;if(e.text===":"?this._flags.ternary_depth===0?n=!1:(this._flags.ternary_depth-=1,o=!0):e.text==="?"&&(this._flags.ternary_depth+=1),!s&&!t&&this._options.preserve_newlines&&D(e.text,kr)){var a=e.text===":",l=a&&o,c=a&&!o;switch(this._options.operator_position){case Tr.before_newline:this._output.space_before_token=!c,this.print_token(e),(!a||l)&&this.allow_wrap_or_preserved_newline(e),this._output.space_before_token=!0;return;case Tr.after_newline:this._output.space_before_token=!0,!a||l?this._tokens.peek().newlines?this.print_newline(!1,!0):this.allow_wrap_or_preserved_newline(e):this._output.space_before_token=!1,this.print_token(e),this._output.space_before_token=!0;return;case Tr.preserve_newline:c||this.allow_wrap_or_preserved_newline(e),n=!(this._output.just_added_newline()||c),this._output.space_before_token=n,this.print_token(e),this._output.space_before_token=!0;return}}if(t){this.allow_wrap_or_preserved_newline(e),n=!1;var p=this._tokens.peek();i=p&&D(p.type,[x.WORD,x.RESERVED])}else e.text==="..."?(this.allow_wrap_or_preserved_newline(e),n=this._flags.last_token.type===x.START_BLOCK,i=!1):(D(e.text,["--","++","!","~"])||s)&&((this._flags.last_token.type===x.COMMA||this._flags.last_token.type===x.START_EXPR)&&this.allow_wrap_or_preserved_newline(e),n=!1,i=!1,e.newlines&&(e.text==="--"||e.text==="++")&&this.print_newline(!1,!0),this._flags.last_token.text===";"&&Cr(this._flags.mode)&&(n=!0),this._flags.last_token.type===x.RESERVED?n=!0:this._flags.last_token.type===x.END_EXPR?n=!(this._flags.last_token.text==="]"&&(e.text==="--"||e.text==="++")):this._flags.last_token.type===x.OPERATOR&&(n=D(e.text,["--","-","++","+"])&&D(this._flags.last_token.text,["--","-","++","+"]),D(e.text,["+","-"])&&D(this._flags.last_token.text,["--","++"])&&(i=!0)),(this._flags.mode===q.BlockStatement&&!this._flags.inline_frame||this._flags.mode===q.Statement)&&(this._flags.last_token.text==="{"||this._flags.last_token.text===";")&&this.print_newline());this._output.space_before_token=this._output.space_before_token||n,this.print_token(e),this._output.space_before_token=i};z.prototype.handle_block_comment=function(e,t){if(this._output.raw){this._output.add_raw_token(e),e.directives&&e.directives.preserve==="end"&&(this._output.raw=this._options.test_output_raw);return}if(e.directives){this.print_newline(!1,t),this.print_token(e),e.directives.preserve==="start"&&(this._output.raw=!0),this.print_newline(!1,!0);return}if(!ei.newline.test(e.text)&&!e.newlines){this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0;return}else this.print_block_commment(e,t)};z.prototype.print_block_commment=function(e,t){var s=Sj(e.text),r,n=!1,i=!1,o=e.whitespace_before,a=o.length;if(this.print_newline(!1,t),this.print_token_line_indentation(e),this._output.add_token(s[0]),this.print_newline(!1,t),s.length>1){for(s=s.slice(1),n=Lj(s,"*"),i=Ej(s,o),n&&(this._flags.alignment=1),r=0;r<s.length;r++)n?(this.print_token_line_indentation(e),this._output.add_token(bj(s[r]))):i&&s[r]?(this.print_token_line_indentation(e),this._output.add_token(s[r].substring(a))):(this._output.current_line.set_indent(-1),this._output.add_token(s[r])),this.print_newline(!1,t);this._flags.alignment=0}};z.prototype.handle_comment=function(e,t){e.newlines?this.print_newline(!1,t):this._output.trim(!0),this._output.space_before_token=!0,this.print_token(e),this.print_newline(!1,t)};z.prototype.handle_dot=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e,!0),Y(this._flags.last_token,ti)?this._output.space_before_token=!1:this.allow_wrap_or_preserved_newline(e,this._flags.last_token.text===")"&&this._options.break_chained_methods),this._options.unindent_chained_methods&&this._output.just_added_newline()&&this.deindent(),this.print_token(e)};z.prototype.handle_unknown=function(e,t){this.print_token(e),e.text[e.text.length-1]===`
`&&this.print_newline(!1,t)};z.prototype.handle_eof=function(e){for(;this._flags.mode===q.Statement;)this.restore_mode();this.handle_whitespace_and_comments(e)};Db.exports.Beautifier=z});var $b=h((t$,_c)=>{"use strict";var kj=Nb().Beautifier,Tj=ac().Options;function Cj(e,t){var s=new kj(e,t);return s.beautify()}_c.exports=Cj;_c.exports.defaultOptions=function(){return new Tj}});var yc=h((s$,Wb)=>{"use strict";var Fb=Xn().Options;function zb(e){Fb.call(this,e,"css"),this.selector_separator_newline=this._get_boolean("selector_separator_newline",!0),this.newline_between_rules=this._get_boolean("newline_between_rules",!0);var t=this._get_boolean("space_around_selector_separator");this.space_around_combinator=this._get_boolean("space_around_combinator")||t;var s=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_style="collapse";for(var r=0;r<s.length;r++)s[r]!=="expand"?this.brace_style="collapse":this.brace_style=s[r]}zb.prototype=new Fb;Wb.exports.Options=zb});var Kb=h((r$,Vb)=>{"use strict";var jj=yc().Options,Mj=Vn().Output,Uj=Yn().InputScanner,Aj=Qn().Directives,Gb=new Aj(/\/\*/,/\*\//),Jb=/\r\n|[\r\n]/,Pj=/\r\n|[\r\n]/g,si=/\s/,Oj=/(?:\s|\n)+/g,qj=/\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,Rj=/\/\/(?:[^\n\r\u2028\u2029]*)/g;function vt(e,t){this._source_text=e||"",this._options=new jj(t),this._ch=null,this._input=null,this.NESTED_AT_RULE={"@page":!0,"@font-face":!0,"@keyframes":!0,"@media":!0,"@supports":!0,"@document":!0},this.CONDITIONAL_GROUP_RULE={"@media":!0,"@supports":!0,"@document":!0}}vt.prototype.eatString=function(e){var t="";for(this._ch=this._input.next();this._ch;){if(t+=this._ch,this._ch==="\\")t+=this._input.next();else if(e.indexOf(this._ch)!==-1||this._ch===`
`)break;this._ch=this._input.next()}return t};vt.prototype.eatWhitespace=function(e){for(var t=si.test(this._input.peek()),s=0;si.test(this._input.peek());)this._ch=this._input.next(),e&&this._ch===`
`&&(s===0||s<this._options.max_preserve_newlines)&&(s++,this._output.add_new_line(!0));return t};vt.prototype.foundNestedPseudoClass=function(){for(var e=0,t=1,s=this._input.peek(t);s;){if(s==="{")return!0;if(s==="(")e+=1;else if(s===")"){if(e===0)return!1;e-=1}else if(s===";"||s==="}")return!1;t++,s=this._input.peek(t)}return!1};vt.prototype.print_string=function(e){this._output.set_indent(this._indentLevel),this._output.non_breaking_space=!0,this._output.add_token(e)};vt.prototype.preserveSingleSpace=function(e){e&&(this._output.space_before_token=!0)};vt.prototype.indent=function(){this._indentLevel++};vt.prototype.outdent=function(){this._indentLevel>0&&this._indentLevel--};vt.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e=this._source_text,t=this._options.eol;t==="auto"&&(t=`
`,e&&Jb.test(e||"")&&(t=e.match(Jb)[0])),e=e.replace(Pj,`
`);var s=e.match(/^[\t ]*/)[0];this._output=new Mj(this._options,s),this._input=new Uj(e),this._indentLevel=0,this._nestedLevel=0,this._ch=null;for(var r=0,n=!1,i=!1,o=!1,a=!1,l=!1,c=this._ch,p,m,y;p=this._input.read(Oj),m=p!=="",y=c,this._ch=this._input.next(),this._ch==="\\"&&this._input.hasNext()&&(this._ch+=this._input.next()),c=this._ch,this._ch;)if(this._ch==="/"&&this._input.peek()==="*"){this._output.add_new_line(),this._input.back();var b=this._input.read(qj),f=Gb.get_directives(b);f&&f.ignore==="start"&&(b+=Gb.readIgnored(this._input)),this.print_string(b),this.eatWhitespace(!0),this._output.add_new_line()}else if(this._ch==="/"&&this._input.peek()==="/")this._output.space_before_token=!0,this._input.back(),this.print_string(this._input.read(Rj)),this.eatWhitespace(!0);else if(this._ch==="@")if(this.preserveSingleSpace(m),this._input.peek()==="{")this.print_string(this._ch+this.eatString("}"));else{this.print_string(this._ch);var u=this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);u.match(/[ :]$/)&&(u=this.eatString(": ").replace(/\s$/,""),this.print_string(u),this._output.space_before_token=!0),u=u.replace(/\s$/,""),u==="extend"?a=!0:u==="import"&&(l=!0),u in this.NESTED_AT_RULE?(this._nestedLevel+=1,u in this.CONDITIONAL_GROUP_RULE&&(o=!0)):!n&&r===0&&u.indexOf(":")!==-1&&(i=!0,this.indent())}else this._ch==="#"&&this._input.peek()==="{"?(this.preserveSingleSpace(m),this.print_string(this._ch+this.eatString("}"))):this._ch==="{"?(i&&(i=!1,this.outdent()),o?(o=!1,n=this._indentLevel>=this._nestedLevel):n=this._indentLevel>=this._nestedLevel-1,this._options.newline_between_rules&&n&&this._output.previous_line&&this._output.previous_line.item(-1)!=="{"&&this._output.ensure_empty_line_above("/",","),this._output.space_before_token=!0,this._options.brace_style==="expand"?(this._output.add_new_line(),this.print_string(this._ch),this.indent(),this._output.set_indent(this._indentLevel)):(this.indent(),this.print_string(this._ch)),this.eatWhitespace(!0),this._output.add_new_line()):this._ch==="}"?(this.outdent(),this._output.add_new_line(),y==="{"&&this._output.trim(!0),l=!1,a=!1,i&&(this.outdent(),i=!1),this.print_string(this._ch),n=!1,this._nestedLevel&&this._nestedLevel--,this.eatWhitespace(!0),this._output.add_new_line(),this._options.newline_between_rules&&!this._output.just_added_blankline()&&this._input.peek()!=="}"&&this._output.add_new_line(!0)):this._ch===":"?(n||o)&&!(this._input.lookBack("&")||this.foundNestedPseudoClass())&&!this._input.lookBack("(")&&!a&&r===0?(this.print_string(":"),i||(i=!0,this._output.space_before_token=!0,this.eatWhitespace(!0),this.indent())):(this._input.lookBack(" ")&&(this._output.space_before_token=!0),this._input.peek()===":"?(this._ch=this._input.next(),this.print_string("::")):this.print_string(":")):this._ch==='"'||this._ch==="'"?(this.preserveSingleSpace(m),this.print_string(this._ch+this.eatString(this._ch)),this.eatWhitespace(!0)):this._ch===";"?r===0?(i&&(this.outdent(),i=!1),a=!1,l=!1,this.print_string(this._ch),this.eatWhitespace(!0),this._input.peek()!=="/"&&this._output.add_new_line()):(this.print_string(this._ch),this.eatWhitespace(!0),this._output.space_before_token=!0):this._ch==="("?this._input.lookBack("url")?(this.print_string(this._ch),this.eatWhitespace(),r++,this.indent(),this._ch=this._input.next(),this._ch===")"||this._ch==='"'||this._ch==="'"?this._input.back():this._ch&&(this.print_string(this._ch+this.eatString(")")),r&&(r--,this.outdent()))):(this.preserveSingleSpace(m),this.print_string(this._ch),this.eatWhitespace(),r++,this.indent()):this._ch===")"?(r&&(r--,this.outdent()),this.print_string(this._ch)):this._ch===","?(this.print_string(this._ch),this.eatWhitespace(!0),this._options.selector_separator_newline&&!i&&r===0&&!l&&!a?this._output.add_new_line():this._output.space_before_token=!0):(this._ch===">"||this._ch==="+"||this._ch==="~")&&!i&&r===0?this._options.space_around_combinator?(this._output.space_before_token=!0,this.print_string(this._ch),this._output.space_before_token=!0):(this.print_string(this._ch),this.eatWhitespace(),this._ch&&si.test(this._ch)&&(this._ch="")):this._ch==="]"?this.print_string(this._ch):this._ch==="["?(this.preserveSingleSpace(m),this.print_string(this._ch)):this._ch==="="?(this.eatWhitespace(),this.print_string("="),si.test(this._ch)&&(this._ch="")):this._ch==="!"&&!this._input.lookBack("\\")?(this.print_string(" "),this.print_string(this._ch)):(this.preserveSingleSpace(m),this.print_string(this._ch));var d=this._output.get_code(t);return d};Vb.exports.Beautifier=vt});var Xb=h((n$,vc)=>{"use strict";var Ij=Kb().Beautifier,Hj=yc().Options;function Bj(e,t){var s=new Ij(e,t);return s.beautify()}vc.exports=Bj;vc.exports.defaultOptions=function(){return new Hj}});var bc=h((i$,Zb)=>{"use strict";var Yb=Xn().Options;function Qb(e){Yb.call(this,e,"html"),this.templating.length===1&&this.templating[0]==="auto"&&(this.templating=["django","erb","handlebars","php"]),this.indent_inner_html=this._get_boolean("indent_inner_html"),this.indent_body_inner_html=this._get_boolean("indent_body_inner_html",!0),this.indent_head_inner_html=this._get_boolean("indent_head_inner_html",!0),this.indent_handlebars=this._get_boolean("indent_handlebars",!0),this.wrap_attributes=this._get_selection("wrap_attributes",["auto","force","force-aligned","force-expand-multiline","aligned-multiple","preserve","preserve-aligned"]),this.wrap_attributes_indent_size=this._get_number("wrap_attributes_indent_size",this.indent_size),this.extra_liners=this._get_array("extra_liners",["head","body","/html"]),this.inline=this._get_array("inline",["a","abbr","area","audio","b","bdi","bdo","br","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","img","input","ins","kbd","keygen","label","map","mark","math","meter","noscript","object","output","progress","q","ruby","s","samp","select","small","span","strong","sub","sup","svg","template","textarea","time","u","var","video","wbr","text","acronym","big","strike","tt"]),this.void_elements=this._get_array("void_elements",["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr","!doctype","?xml","basefont","isindex"]),this.unformatted=this._get_array("unformatted",[]),this.content_unformatted=this._get_array("content_unformatted",["pre","textarea"]),this.unformatted_content_delimiter=this._get_characters("unformatted_content_delimiter"),this.indent_scripts=this._get_selection("indent_scripts",["normal","keep","separate"])}Qb.prototype=new Yb;Zb.exports.Options=Qb});var Sc=h((o$,xc)=>{"use strict";var tw=Sr().Tokenizer,wc=Sr().TOKEN,Dj=Qn().Directives,Nj=mc().TemplatablePattern,$j=wr().Pattern,ne={TAG_OPEN:"TK_TAG_OPEN",TAG_CLOSE:"TK_TAG_CLOSE",ATTRIBUTE:"TK_ATTRIBUTE",EQUALS:"TK_EQUALS",VALUE:"TK_VALUE",COMMENT:"TK_COMMENT",TEXT:"TK_TEXT",UNKNOWN:"TK_UNKNOWN",START:wc.START,RAW:wc.RAW,EOF:wc.EOF},ew=new Dj(/<\!--/,/-->/),xe=function(e,t){tw.call(this,e,t),this._current_tag_name="";var s=new Nj(this._input).read_options(this._options),r=new $j(this._input);if(this.__patterns={word:s.until(/[\n\r\t <]/),single_quote:s.until_after(/'/),double_quote:s.until_after(/"/),attribute:s.until(/[\n\r\t =>]|\/>/),element_name:s.until(/[\n\r\t >\/]/),handlebars_comment:r.starting_with(/{{!--/).until_after(/--}}/),handlebars:r.starting_with(/{{/).until_after(/}}/),handlebars_open:r.until(/[\n\r\t }]/),handlebars_raw_close:r.until(/}}/),comment:r.starting_with(/<!--/).until_after(/-->/),cdata:r.starting_with(/<!\[CDATA\[/).until_after(/]]>/),conditional_comment:r.starting_with(/<!\[/).until_after(/]>/),processing:r.starting_with(/<\?/).until_after(/\?>/)},this._options.indent_handlebars&&(this.__patterns.word=this.__patterns.word.exclude("handlebars")),this._unformatted_content_delimiter=null,this._options.unformatted_content_delimiter){var n=this._input.get_literal_regexp(this._options.unformatted_content_delimiter);this.__patterns.unformatted_content_delimiter=r.matching(n).until_after(n)}};xe.prototype=new tw;xe.prototype._is_comment=function(e){return!1};xe.prototype._is_opening=function(e){return e.type===ne.TAG_OPEN};xe.prototype._is_closing=function(e,t){return e.type===ne.TAG_CLOSE&&t&&((e.text===">"||e.text==="/>")&&t.text[0]==="<"||e.text==="}}"&&t.text[0]==="{"&&t.text[1]==="{")};xe.prototype._reset=function(){this._current_tag_name=""};xe.prototype._get_next_token=function(e,t){var s=null;this._readWhitespace();var r=this._input.peek();return r===null?this._create_token(ne.EOF,""):(s=s||this._read_open_handlebars(r,t),s=s||this._read_attribute(r,e,t),s=s||this._read_close(r,t),s=s||this._read_raw_content(r,e,t),s=s||this._read_content_word(r),s=s||this._read_comment_or_cdata(r),s=s||this._read_processing(r),s=s||this._read_open(r,t),s=s||this._create_token(ne.UNKNOWN,this._input.next()),s)};xe.prototype._read_comment_or_cdata=function(e){var t=null,s=null,r=null;if(e==="<"){var n=this._input.peek(1);n==="!"&&(s=this.__patterns.comment.read(),s?(r=ew.get_directives(s),r&&r.ignore==="start"&&(s+=ew.readIgnored(this._input))):s=this.__patterns.cdata.read()),s&&(t=this._create_token(ne.COMMENT,s),t.directives=r)}return t};xe.prototype._read_processing=function(e){var t=null,s=null,r=null;if(e==="<"){var n=this._input.peek(1);(n==="!"||n==="?")&&(s=this.__patterns.conditional_comment.read(),s=s||this.__patterns.processing.read()),s&&(t=this._create_token(ne.COMMENT,s),t.directives=r)}return t};xe.prototype._read_open=function(e,t){var s=null,r=null;return t||e==="<"&&(s=this._input.next(),this._input.peek()==="/"&&(s+=this._input.next()),s+=this.__patterns.element_name.read(),r=this._create_token(ne.TAG_OPEN,s)),r};xe.prototype._read_open_handlebars=function(e,t){var s=null,r=null;return t||this._options.indent_handlebars&&e==="{"&&this._input.peek(1)==="{"&&(this._input.peek(2)==="!"?(s=this.__patterns.handlebars_comment.read(),s=s||this.__patterns.handlebars.read(),r=this._create_token(ne.COMMENT,s)):(s=this.__patterns.handlebars_open.read(),r=this._create_token(ne.TAG_OPEN,s))),r};xe.prototype._read_close=function(e,t){var s=null,r=null;return t&&(t.text[0]==="<"&&(e===">"||e==="/"&&this._input.peek(1)===">")?(s=this._input.next(),e==="/"&&(s+=this._input.next()),r=this._create_token(ne.TAG_CLOSE,s)):t.text[0]==="{"&&e==="}"&&this._input.peek(1)==="}"&&(this._input.next(),this._input.next(),r=this._create_token(ne.TAG_CLOSE,"}}"))),r};xe.prototype._read_attribute=function(e,t,s){var r=null,n="";if(s&&s.text[0]==="<")if(e==="=")r=this._create_token(ne.EQUALS,this._input.next());else if(e==='"'||e==="'"){var i=this._input.next();e==='"'?i+=this.__patterns.double_quote.read():i+=this.__patterns.single_quote.read(),r=this._create_token(ne.VALUE,i)}else n=this.__patterns.attribute.read(),n&&(t.type===ne.EQUALS?r=this._create_token(ne.VALUE,n):r=this._create_token(ne.ATTRIBUTE,n));return r};xe.prototype._is_content_unformatted=function(e){return this._options.void_elements.indexOf(e)===-1&&(this._options.content_unformatted.indexOf(e)!==-1||this._options.unformatted.indexOf(e)!==-1)};xe.prototype._read_raw_content=function(e,t,s){var r="";if(s&&s.text[0]==="{")r=this.__patterns.handlebars_raw_close.read();else if(t.type===ne.TAG_CLOSE&&t.opened.text[0]==="<"&&t.text[0]!=="/"){var n=t.opened.text.substr(1).toLowerCase();if(n==="script"||n==="style"){var i=this._read_comment_or_cdata(e);if(i)return i.type=ne.TEXT,i;r=this._input.readUntil(new RegExp("</"+n+"[\\n\\r\\t ]*?>","ig"))}else this._is_content_unformatted(n)&&(r=this._input.readUntil(new RegExp("</"+n+"[\\n\\r\\t ]*?>","ig")))}return r?this._create_token(ne.TEXT,r):null};xe.prototype._read_content_word=function(e){var t="";if(this._options.unformatted_content_delimiter&&e===this._options.unformatted_content_delimiter[0]&&(t=this.__patterns.unformatted_content_delimiter.read()),t||(t=this.__patterns.word.read()),t)return this._create_token(ne.TEXT,t)};xc.exports.Tokenizer=xe;xc.exports.TOKEN=ne});var iw=h((a$,nw)=>{"use strict";var Fj=bc().Options,zj=Vn().Output,Wj=Sc().Tokenizer,X=Sc().TOKEN,sw=/\r\n|[\r\n]/,Gj=/\r\n|[\r\n]/g,Fe=function(e,t){this.indent_level=0,this.alignment_size=0,this.max_preserve_newlines=e.max_preserve_newlines,this.preserve_newlines=e.preserve_newlines,this._output=new zj(e,t)};Fe.prototype.current_line_has_match=function(e){return this._output.current_line.has_match(e)};Fe.prototype.set_space_before_token=function(e,t){this._output.space_before_token=e,this._output.non_breaking_space=t};Fe.prototype.set_wrap_point=function(){this._output.set_indent(this.indent_level,this.alignment_size),this._output.set_wrap_point()};Fe.prototype.add_raw_token=function(e){this._output.add_raw_token(e)};Fe.prototype.print_preserved_newlines=function(e){var t=0;e.type!==X.TEXT&&e.previous.type!==X.TEXT&&(t=e.newlines?1:0),this.preserve_newlines&&(t=e.newlines<this.max_preserve_newlines+1?e.newlines:this.max_preserve_newlines+1);for(var s=0;s<t;s++)this.print_newline(s>0);return t!==0};Fe.prototype.traverse_whitespace=function(e){return e.whitespace_before||e.newlines?(this.print_preserved_newlines(e)||(this._output.space_before_token=!0),!0):!1};Fe.prototype.previous_token_wrapped=function(){return this._output.previous_token_wrapped};Fe.prototype.print_newline=function(e){this._output.add_new_line(e)};Fe.prototype.print_token=function(e){e.text&&(this._output.set_indent(this.indent_level,this.alignment_size),this._output.add_token(e.text))};Fe.prototype.indent=function(){this.indent_level++};Fe.prototype.get_full_indent=function(e){return e=this.indent_level+(e||0),e<1?"":this._output.get_indent_string(e)};var Jj=function(e){for(var t=null,s=e.next;s.type!==X.EOF&&e.closed!==s;){if(s.type===X.ATTRIBUTE&&s.text==="type"){s.next&&s.next.type===X.EQUALS&&s.next.next&&s.next.next.type===X.VALUE&&(t=s.next.next.text);break}s=s.next}return t},Vj=function(e,t){var s=null,r=null;return t.closed?(e==="script"?s="text/javascript":e==="style"&&(s="text/css"),s=Jj(t)||s,s.search("text/css")>-1?r="css":s.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/)>-1?r="javascript":s.search(/(text|application|dojo)\/(x-)?(html)/)>-1?r="html":s.search(/test\/null/)>-1&&(r="null"),r):null};function Mr(e,t){return t.indexOf(e)!==-1}function Kj(e,t,s){this.parent=e||null,this.tag=t?t.tag_name:"",this.indent_level=s||0,this.parser_token=t||null}function is(e){this._printer=e,this._current_frame=null}is.prototype.get_parser_token=function(){return this._current_frame?this._current_frame.parser_token:null};is.prototype.record_tag=function(e){var t=new Kj(this._current_frame,e,this._printer.indent_level);this._current_frame=t};is.prototype._try_pop_frame=function(e){var t=null;return e&&(t=e.parser_token,this._printer.indent_level=e.indent_level,this._current_frame=e.parent),t};is.prototype._get_frame=function(e,t){for(var s=this._current_frame;s&&e.indexOf(s.tag)===-1;){if(t&&t.indexOf(s.tag)!==-1){s=null;break}s=s.parent}return s};is.prototype.try_pop=function(e,t){var s=this._get_frame([e],t);return this._try_pop_frame(s)};is.prototype.indent_to_tag=function(e){var t=this._get_frame(e);t&&(this._printer.indent_level=t.indent_level)};function $e(e,t,s,r){this._source_text=e||"",t=t||{},this._js_beautify=s,this._css_beautify=r,this._tag_stack=null;var n=new Fj(t,"html");this._options=n,this._is_wrap_attributes_force=this._options.wrap_attributes.substr(0,5)==="force",this._is_wrap_attributes_force_expand_multiline=this._options.wrap_attributes==="force-expand-multiline",this._is_wrap_attributes_force_aligned=this._options.wrap_attributes==="force-aligned",this._is_wrap_attributes_aligned_multiple=this._options.wrap_attributes==="aligned-multiple",this._is_wrap_attributes_preserve=this._options.wrap_attributes.substr(0,8)==="preserve",this._is_wrap_attributes_preserve_aligned=this._options.wrap_attributes==="preserve-aligned"}$e.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e=this._source_text,t=this._options.eol;this._options.eol==="auto"&&(t=`
`,e&&sw.test(e)&&(t=e.match(sw)[0])),e=e.replace(Gj,`
`);var s=e.match(/^[\t ]*/)[0],r={text:"",type:""},n=new rw,i=new Fe(this._options,s),o=new Wj(e,this._options).tokenize();this._tag_stack=new is(i);for(var a=null,l=o.next();l.type!==X.EOF;)l.type===X.TAG_OPEN||l.type===X.COMMENT?(a=this._handle_tag_open(i,l,n,r),n=a):l.type===X.ATTRIBUTE||l.type===X.EQUALS||l.type===X.VALUE||l.type===X.TEXT&&!n.tag_complete?a=this._handle_inside_tag(i,l,n,o):l.type===X.TAG_CLOSE?a=this._handle_tag_close(i,l,n):l.type===X.TEXT?a=this._handle_text(i,l,n):i.add_raw_token(l),r=a,l=o.next();var c=i._output.get_code(t);return c};$e.prototype._handle_tag_close=function(e,t,s){var r={text:t.text,type:t.type};return e.alignment_size=0,s.tag_complete=!0,e.set_space_before_token(t.newlines||t.whitespace_before!=="",!0),s.is_unformatted?e.add_raw_token(t):(s.tag_start_char==="<"&&(e.set_space_before_token(t.text[0]==="/",!0),this._is_wrap_attributes_force_expand_multiline&&s.has_wrapped_attrs&&e.print_newline(!1)),e.print_token(t)),s.indent_content&&!(s.is_unformatted||s.is_content_unformatted)&&(e.indent(),s.indent_content=!1),!s.is_inline_element&&!(s.is_unformatted||s.is_content_unformatted)&&e.set_wrap_point(),r};$e.prototype._handle_inside_tag=function(e,t,s,r){var n=s.has_wrapped_attrs,i={text:t.text,type:t.type};if(e.set_space_before_token(t.newlines||t.whitespace_before!=="",!0),s.is_unformatted)e.add_raw_token(t);else if(s.tag_start_char==="{"&&t.type===X.TEXT)e.print_preserved_newlines(t)?(t.newlines=0,e.add_raw_token(t)):e.print_token(t);else{if(t.type===X.ATTRIBUTE?(e.set_space_before_token(!0),s.attr_count+=1):(t.type===X.EQUALS||t.type===X.VALUE&&t.previous.type===X.EQUALS)&&e.set_space_before_token(!1),t.type===X.ATTRIBUTE&&s.tag_start_char==="<"&&((this._is_wrap_attributes_preserve||this._is_wrap_attributes_preserve_aligned)&&(e.traverse_whitespace(t),n=n||t.newlines!==0),this._is_wrap_attributes_force)){var o=s.attr_count>1;if(this._is_wrap_attributes_force_expand_multiline&&s.attr_count===1){var a=!0,l=0,c;do{if(c=r.peek(l),c.type===X.ATTRIBUTE){a=!1;break}l+=1}while(l<4&&c.type!==X.EOF&&c.type!==X.TAG_CLOSE);o=!a}o&&(e.print_newline(!1),n=!0)}e.print_token(t),n=n||e.previous_token_wrapped(),s.has_wrapped_attrs=n}return i};$e.prototype._handle_text=function(e,t,s){var r={text:t.text,type:"TK_CONTENT"};return s.custom_beautifier_name?this._print_custom_beatifier_text(e,t,s):s.is_unformatted||s.is_content_unformatted?e.add_raw_token(t):(e.traverse_whitespace(t),e.print_token(t)),r};$e.prototype._print_custom_beatifier_text=function(e,t,s){var r=this;if(t.text!==""){var n=t.text,i,o=1,a="",l="";s.custom_beautifier_name==="javascript"&&typeof this._js_beautify=="function"?i=this._js_beautify:s.custom_beautifier_name==="css"&&typeof this._css_beautify=="function"?i=this._css_beautify:s.custom_beautifier_name==="html"&&(i=function(f,u){var d=new $e(f,u,r._js_beautify,r._css_beautify);return d.beautify()}),this._options.indent_scripts==="keep"?o=0:this._options.indent_scripts==="separate"&&(o=-e.indent_level);var c=e.get_full_indent(o);if(n=n.replace(/\n[ \t]*$/,""),s.custom_beautifier_name!=="html"&&n[0]==="<"&&n.match(/^(<!--|<!\[CDATA\[)/)){var p=/^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(n);if(!p){e.add_raw_token(t);return}a=c+p[1]+`
`,n=p[4],p[5]&&(l=c+p[5]),n=n.replace(/\n[ \t]*$/,""),(p[2]||p[3].indexOf(`
`)!==-1)&&(p=p[3].match(/[ \t]+$/),p&&(t.whitespace_before=p[0]))}if(n)if(i){var m=function(){this.eol=`
`};m.prototype=this._options.raw_options;var y=new m;n=i(c+n,y)}else{var b=t.whitespace_before;b&&(n=n.replace(new RegExp(`
(`+b+")?","g"),`
`)),n=c+n.replace(/\n/g,`
`+c)}a&&(n?n=a+n+`
`+l:n=a+l),e.print_newline(!1),n&&(t.text=n,t.whitespace_before="",t.newlines=0,e.add_raw_token(t),e.print_newline(!0))}};$e.prototype._handle_tag_open=function(e,t,s,r){var n=this._get_tag_open_token(t);return(s.is_unformatted||s.is_content_unformatted)&&!s.is_empty_element&&t.type===X.TAG_OPEN&&t.text.indexOf("</")===0?(e.add_raw_token(t),n.start_tag_token=this._tag_stack.try_pop(n.tag_name)):(e.traverse_whitespace(t),this._set_tag_position(e,t,n,s,r),n.is_inline_element||e.set_wrap_point(),e.print_token(t)),(this._is_wrap_attributes_force_aligned||this._is_wrap_attributes_aligned_multiple||this._is_wrap_attributes_preserve_aligned)&&(n.alignment_size=t.text.length+1),!n.tag_complete&&!n.is_unformatted&&(e.alignment_size=n.alignment_size),n};var rw=function(e,t){if(this.parent=e||null,this.text="",this.type="TK_TAG_OPEN",this.tag_name="",this.is_inline_element=!1,this.is_unformatted=!1,this.is_content_unformatted=!1,this.is_empty_element=!1,this.is_start_tag=!1,this.is_end_tag=!1,this.indent_content=!1,this.multiline_content=!1,this.custom_beautifier_name=null,this.start_tag_token=null,this.attr_count=0,this.has_wrapped_attrs=!1,this.alignment_size=0,this.tag_complete=!1,this.tag_start_char="",this.tag_check="",!t)this.tag_complete=!0;else{var s;this.tag_start_char=t.text[0],this.text=t.text,this.tag_start_char==="<"?(s=t.text.match(/^<([^\s>]*)/),this.tag_check=s?s[1]:""):(s=t.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/),this.tag_check=s?s[1]:"",t.text==="{{#>"&&this.tag_check===">"&&t.next!==null&&(this.tag_check=t.next.text)),this.tag_check=this.tag_check.toLowerCase(),t.type===X.COMMENT&&(this.tag_complete=!0),this.is_start_tag=this.tag_check.charAt(0)!=="/",this.tag_name=this.is_start_tag?this.tag_check:this.tag_check.substr(1),this.is_end_tag=!this.is_start_tag||t.closed&&t.closed.text==="/>",this.is_end_tag=this.is_end_tag||this.tag_start_char==="{"&&(this.text.length<3||/[^#\^]/.test(this.text.charAt(2)))}};$e.prototype._get_tag_open_token=function(e){var t=new rw(this._tag_stack.get_parser_token(),e);return t.alignment_size=this._options.wrap_attributes_indent_size,t.is_end_tag=t.is_end_tag||Mr(t.tag_check,this._options.void_elements),t.is_empty_element=t.tag_complete||t.is_start_tag&&t.is_end_tag,t.is_unformatted=!t.tag_complete&&Mr(t.tag_check,this._options.unformatted),t.is_content_unformatted=!t.is_empty_element&&Mr(t.tag_check,this._options.content_unformatted),t.is_inline_element=Mr(t.tag_name,this._options.inline)||t.tag_start_char==="{",t};$e.prototype._set_tag_position=function(e,t,s,r,n){if(s.is_empty_element||(s.is_end_tag?s.start_tag_token=this._tag_stack.try_pop(s.tag_name):(this._do_optional_end_element(s)&&(s.is_inline_element||e.print_newline(!1)),this._tag_stack.record_tag(s),(s.tag_name==="script"||s.tag_name==="style")&&!(s.is_unformatted||s.is_content_unformatted)&&(s.custom_beautifier_name=Vj(s.tag_check,t)))),Mr(s.tag_check,this._options.extra_liners)&&(e.print_newline(!1),e._output.just_added_blankline()||e.print_newline(!0)),s.is_empty_element){if(s.tag_start_char==="{"&&s.tag_check==="else"){this._tag_stack.indent_to_tag(["if","unless","each"]),s.indent_content=!0;var i=e.current_line_has_match(/{{#if/);i||e.print_newline(!1)}s.tag_name==="!--"&&n.type===X.TAG_CLOSE&&r.is_end_tag&&s.text.indexOf(`
`)===-1||(s.is_inline_element||s.is_unformatted||e.print_newline(!1),this._calcluate_parent_multiline(e,s))}else if(s.is_end_tag){var o=!1;o=s.start_tag_token&&s.start_tag_token.multiline_content,o=o||!s.is_inline_element&&!(r.is_inline_element||r.is_unformatted)&&!(n.type===X.TAG_CLOSE&&s.start_tag_token===r)&&n.type!=="TK_CONTENT",(s.is_content_unformatted||s.is_unformatted)&&(o=!1),o&&e.print_newline(!1)}else s.indent_content=!s.custom_beautifier_name,s.tag_start_char==="<"&&(s.tag_name==="html"?s.indent_content=this._options.indent_inner_html:s.tag_name==="head"?s.indent_content=this._options.indent_head_inner_html:s.tag_name==="body"&&(s.indent_content=this._options.indent_body_inner_html)),!(s.is_inline_element||s.is_unformatted)&&(n.type!=="TK_CONTENT"||s.is_content_unformatted)&&e.print_newline(!1),this._calcluate_parent_multiline(e,s)};$e.prototype._calcluate_parent_multiline=function(e,t){t.parent&&e._output.just_added_newline()&&!((t.is_inline_element||t.is_unformatted)&&t.parent.is_inline_element)&&(t.parent.multiline_content=!0)};var Xj=["address","article","aside","blockquote","details","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","main","nav","ol","p","pre","section","table","ul"],Yj=["a","audio","del","ins","map","noscript","video"];$e.prototype._do_optional_end_element=function(e){var t=null;if(!(e.is_empty_element||!e.is_start_tag||!e.parent)){if(e.tag_name==="body")t=t||this._tag_stack.try_pop("head");else if(e.tag_name==="li")t=t||this._tag_stack.try_pop("li",["ol","ul"]);else if(e.tag_name==="dd"||e.tag_name==="dt")t=t||this._tag_stack.try_pop("dt",["dl"]),t=t||this._tag_stack.try_pop("dd",["dl"]);else if(e.parent.tag_name==="p"&&Xj.indexOf(e.tag_name)!==-1){var s=e.parent.parent;(!s||Yj.indexOf(s.tag_name)===-1)&&(t=t||this._tag_stack.try_pop("p"))}else e.tag_name==="rp"||e.tag_name==="rt"?(t=t||this._tag_stack.try_pop("rt",["ruby","rtc"]),t=t||this._tag_stack.try_pop("rp",["ruby","rtc"])):e.tag_name==="optgroup"?t=t||this._tag_stack.try_pop("optgroup",["select"]):e.tag_name==="option"?t=t||this._tag_stack.try_pop("option",["select","datalist","optgroup"]):e.tag_name==="colgroup"?t=t||this._tag_stack.try_pop("caption",["table"]):e.tag_name==="thead"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"])):e.tag_name==="tbody"||e.tag_name==="tfoot"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"]),t=t||this._tag_stack.try_pop("thead",["table"]),t=t||this._tag_stack.try_pop("tbody",["table"])):e.tag_name==="tr"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"]),t=t||this._tag_stack.try_pop("tr",["table","thead","tbody","tfoot"])):(e.tag_name==="th"||e.tag_name==="td")&&(t=t||this._tag_stack.try_pop("td",["table","thead","tbody","tfoot","tr"]),t=t||this._tag_stack.try_pop("th",["table","thead","tbody","tfoot","tr"]));return e.parent=this._tag_stack.get_parser_token(),t}};nw.exports.Beautifier=$e});var ow=h((l$,Lc)=>{"use strict";var Qj=iw().Beautifier,Zj=bc().Options;function eM(e,t,s,r){var n=new Qj(e,t,s,r);return n.beautify()}Lc.exports=eM;Lc.exports.defaultOptions=function(){return new Zj}});var uw=h((c$,ri)=>{"use strict";var aw=$b(),lw=Xb(),cw=ow();function pw(e,t,s,r){return s=s||aw,r=r||lw,cw(e,t,s,r)}pw.defaultOptions=cw.defaultOptions;ri.exports.js=aw;ri.exports.css=lw;ri.exports.html=pw});var fw=h((p$,mw)=>{"use strict";function dw(e,t,s){var r=function(n,i){return e.js_beautify(n,i)};return r.js=e.js_beautify,r.css=t.css_beautify,r.html=s.html_beautify,r.js_beautify=e.js_beautify,r.css_beautify=t.css_beautify,r.html_beautify=s.html_beautify,r}typeof define=="function"&&define.amd?define(["./lib/beautify","./lib/beautify-css","./lib/beautify-html"],function(e,t,s){return dw(e,t,s)}):function(e){var t=uw();t.js_beautify=t.js,t.css_beautify=t.css,t.html_beautify=t.html,e.exports=dw(t,t,t)}(mw)});var xw=h(Ar=>{"use strict";var N=Ar&&Ar.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ar,"__esModule",{value:!0});var tM=N(P_()),hw=N(yv()),dt=N(ke()),Ec=N(ee()),sM=N(bv()),kc=N(xv()),rM=N(Il()),gw=N(Bl()),Ur=N(Qe()),nM=N(Ms()),iM=N(kv()),Tc=N(vn()),oM=N(Cv()),aM=N(Re()),lM=N(He()),cM=N(lt()),pM=N(Be()),uM=N(jn()),ww=N(at()),dM=N(wn()),mM=N(Ua()),fM=N(Fn()),ni=N(G()),_w=N(Kt()),hM=N(Xt()),gM=N(Ee()),_M=N(mr()),yM=N(Av()),vM=N(cr()),bM=N(Zv()),wM=N(sb()),xM=N(lb()),yw=N(pb()),SM=qo(),LM=N(rc()),vw=N(fw()),EM=/https?:\/\/([0-9.\-A-Za-z]+)(?::(\d+))?\/[A-Z.a-z0-9/]*\.js/g,bw={comment:"",string:"",number:"",keyword:"",operator:""},Cc=class extends vM.default{constructor(t,{type:s="log",args:r=[],id:n,group:i,targetGroup:o,header:a,ignoreFilter:l=!1,accessGetter:c,unenumerable:p,lazyEvaluation:m}){super(),this.container=yM.default("div"),this.count=1,this.width=0,this.height=0,this.console=t,this.type=s,this.group=i,this.targetGroup=o,this.args=r,this.id=n,this.header=a,this.ignoreFilter=l,this.collapsed=!1,this.container.log=this,this.height=0,this.width=0,this.$container=_M.default(this.container),this.accessGetter=c,this.unenumerable=p,this.lazyEvaluation=m,this.formatMsg(),this.group&&this.checkGroup()}checkGroup(){let{group:t}=this,s=!1;for(;t;){if(t.collapsed){s=!0;break}t=t.parent}return s!==this.collapsed?(this.collapsed=s,!0):!1}updateIcon(t){let{c:s}=this.console;return this.$container.find(s(".icon")).rmAttr("class").addClass([s("icon"),s(`icon-${t}`)]),this}addCount(){this.count++;let{$container:t,count:s}=this,{c:r}=this.console,n=t.find(r(".count-container")),i=t.find(r(".icon-container")),o=n.find(r(".count"));return s===2&&n.rmClass(r("hidden")),o.text(Ur.default(s)),i.addClass(r("hidden")),this}groupEnd(){let{$container:t}=this,{c:s}=this.console;return t.find(`.${s("nesting-level")}:not(.${s("group-closed")})`).last().addClass(s("group-closed")),this}updateTime(t){let s=this.$container.find(this.console.c(".time-container"));return this.header&&(s.find("span").eq(0).text(t),this.header.time=t),this}isAttached(){return!!this.container.parentNode}updateSize(t=!0){let s=this.container.offsetHeight,r=this.container.offsetWidth;(this.height!==s||this.width!==r)&&(this.height=s,this.width=r,t||this.emit("updateSize"))}html(){return this.container.outerHTML}text(){return this.content.textContent||""}needSrc(){let{type:t,args:s}=this;if(t==="html")return!1;for(let r=0,n=s.length;r<n;r++)if(dt.default(s[r]))return!0;return!1}extractObj(t=fM.default){let{args:s,type:r}=this,n=i=>{this.src=i,t()};r==="table"?this._extractObj(s[0],{},n):this._extractObj(s.length===1&&dt.default(s[0])?s[0]:s,{},n)}_extractObj(t,s={},r){let{accessGetter:n,unenumerable:i}=this;rM.default(s,{accessGetter:n,unenumerable:i,symbol:i,timeout:1e3}),TM(t,s,o=>r(JSON.parse(o)))}click(){let{type:t,src:s,$container:r,console:n,unenumerable:i,accessGetter:o}=this,{c:a}=n,{args:l}=this;switch(t){case"log":case"warn":case"debug":case"output":case"table":case"dir":case"group":case"groupCollapsed":if(s||l){let c=r.find(a(".json"));if(c.hasClass(a("hidden"))){if(c.data("init")!=="true"){if(s){let p=new hw.default.Static(c.get(0));p.set(s),p.on("change",()=>this.updateSize(!1))}else{(t==="table"||l.length===1)&&dt.default(l[0])&&(l=l[0]);let p=new hw.default(c.get(0),{unenumerable:i,accessGetter:o});p.set(l),p.on("change",()=>this.updateSize(!1))}c.data("init","true")}c.rmClass(a("hidden"))}else c.addClass(a("hidden"))}else(t==="group"||t==="groupCollapsed")&&n.toggleGroup(this);break;case"error":r.find(a(".stack")).toggleClass(a("hidden"));break}this.updateSize(!1)}formatMsg(){let{args:t}=this,{type:s,id:r,header:n,group:i,lazyEvaluation:o}=this,{c:a}=this.console;t=mM.default(t),this.needSrc()&&!o&&this.extractObj();let l="",c,p;switch((s==="group"||s==="groupCollapsed")&&t.length===0&&(t=["console.group"]),s){case"log":l=this.formatCommon(t);break;case"debug":l=this.formatCommon(t);break;case"dir":l=this.formatDir(t);break;case"warn":c="warn",l=this.formatCommon(t);break;case"error":Ec.default(t[0])&&t.length!==1&&(t=this.substituteStr(t)),p=t[0],c="error",p=sM.default(p)?p:new Error(this.formatCommon(t)),this.src=p,l=this.formatErr(p);break;case"table":l=this.formatTable(t);break;case"html":l=t[0];break;case"input":l=this.formatJs(t[0]),c="input";break;case"output":l=this.formatCommon(t),c="output";break;case"groupCollapsed":l=this.formatCommon(t),c="caret-right";break;case"group":l=this.formatCommon(t),c="caret-down";break}(!this.needSrc()||!o)&&delete this.args,s!=="error"&&!this.args&&(l=xM.default(l,m=>`<a href="${m}" target="_blank">${m}</a>`)),l=this.render({msg:l,type:s,icon:c,id:r,header:n,group:i}),this.$container.addClass(`${a("log-container")}`).html(l),this.$content=this.$container.find(a(".log-content")),this.content=this.$content.get(0)}render(t){let{c:s}=this.console,r="",n="";if(t.group){let{indentLevel:o}=t.group;for(let a=0;a<o;a++)n+=`<div class="${s("nesting-level")}"></div>`}t.header&&(r+=LM.default`
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
    </div>`,r}formatTable(t){let s="__LunaConsoleValue",r=t[0],n="",i=t[1],o=[];return Ec.default(i)&&(i=cM.default(i)),pM.default(i)||(i=null),dt.default(r)?(ni.default(r,a=>{kc.default(a)?o.push(s):dt.default(a)&&(o=o.concat(gM.default(a)))}),o=uM.default(o),o.sort(),i&&(o=o.filter(a=>ww.default(i,a))),o.length>20&&(o=o.slice(0,20)),dM.default(o)?this.formatCommon(t):(n+="<table><thead><tr><th>(index)</th>",o.forEach(a=>n+=`<th>${a===s?"Value":Ur.default(a)}</th>`),n+="</tr></thead><tbody>",ni.default(r,(a,l)=>{n+=`<tr><td>${l}</td>`,o.forEach(c=>{dt.default(a)?n+=c===s?"<td></td>":`<td>${this.formatTableVal(a[c])}</td>`:kc.default(a)&&(n+=c===s?`<td>${this.formatTableVal(a)}</td>`:"<td></td>")}),n+="</tr>"}),n+="</tbody></table>",n+=`<div class="${this.console.c("json hidden")}"></div>`,n)):this.formatCommon(t)}formatErr(t){let s=t.stack?t.stack.split(`
`):[],r=`${t.message||s[0]}<br/>`;s=s.map(i=>Tc.default(i));let n=`<div class="${this.console.c("stack hidden")}">${s.slice(1).join("<br/>")}</div>`;return r+n.replace(EM,i=>`<a href="${i}" target="_blank">${i}</a>`)}formatCommon(t,{htmlForEl:s=!0}={}){let r=Ec.default(t[0])&&t.length!==1;r&&(t=this.substituteStr(t));for(let n=0,i=t.length;n<i;n++){let o=t[n];gw.default(o)&&s?t[n]=this.formatEl(o):lM.default(o)?t[n]=this.formatJs(o):dt.default(o)?t[n]=this.formatObj(o):aM.default(o)?t[n]="undefined":oM.default(o)?t[n]="null":(o=Ur.default(o),(n!==0||!r)&&(o=Tc.default(o)),t[n]=o)}return t.join(" ")+`<div class="${this.console.c("json hidden")}"></div>`}formatDir(t){return this.formatCommon(t,{htmlForEl:!1})}formatTableVal(t){return dt.default(t)?t="{\u2026}":kc.default(t)?this.getAbstract(t):Ur.default(t)}getAbstract(t){return`<span class="${this.console.c("abstract")}">`+tM.default(t,{getterVal:this.accessGetter,unenumerable:!1})+"</span>"}substituteStr(t){let s=Tc.default(t[0]),r=!1,n="";t.shift();for(let i=0,o=s.length;i<o;i++){let a=s[i];if(a==="%"&&t.length!==0){i++;let l=t.shift();switch(s[i]){case"i":case"d":n+=iM.default(l);break;case"f":n+=nM.default(l);break;case"s":n+=Ur.default(l);break;case"O":dt.default(l)&&(n+=this.getAbstract(l));break;case"o":gw.default(l)?n+=this.formatEl(l):dt.default(l)&&(n+=this.getAbstract(l));break;case"c":if(s.length<=i+1)break;r&&(n+="</span>"),r=!0,n+=`<span style="${kM(l)}">`;break;default:i--,t.unshift(l),n+=a}}else n+=a}return r&&(n+="</span>"),t.unshift(n),t}formatJs(t){return`<pre class="${this.console.c("code")}">${this.console.c(yw.default(vw.default(t,{indent_size:2}),"js",bw))}</pre>`}formatObj(t){let s=SM.getObjType(t);return s==="Array"&&t.length>1&&(s=`(${t.length})`),`${s} ${this.getAbstract(t)}`}formatEl(t){let{c:s}=this.console;return`<pre class="${s("code")}">${s(yw.default(vw.default.html(t.outerHTML,{unformatted:[],indent_size:2}),"html",bw))}</pre>`}};Ar.default=Cc;function kM(e){e=hM.default(e);let t=e.split(";"),s={};ni.default(t,n=>{if(!ww.default(n,":"))return;let[i,o]=n.split(":");s[_w.default(i)]=_w.default(o)}),s.display="inline-block",s["max-width"]="100%",delete s.width,delete s.height;let r="";return ni.default(s,(n,i)=>{r+=`${i}:${n};`}),r}function TM(e,t,s){let r=bM.default(e,t);wM.default(()=>s(r))}});var kw=h((Pr,Ew)=>{var Sw=_r(),Lw=Ln(),jc=Lw.performance,ii=Lw.process,oi;jc&&jc.now?Pr=function(){return jc.now()}:ii&&ii.hrtime?(Mc=function(){var e=ii.hrtime();return e[0]*1e9+e[1]},oi=Mc()-ii.uptime()*1e9,Pr=function(){return(Mc()-oi)/1e6}):(oi=Sw(),Pr=function(){return Sw()-oi});var Mc;Ew.exports=Pr});var Cw=h((Uc,Tw)=>{var CM=ot();Uc=function(e){return CM(e)==="[object RegExp]"};Tw.exports=Uc});var Mw=h((Ac,jw)=>{var jM=Yt(),MM=Fn();Ac=function(e,t){t=t||MM;var s=document.createElement("textarea"),r=document.body;jM(s.style,{fontSize:"12pt",border:"0",padding:"0",margin:"0",position:"absolute",left:"-9999px"}),s.value=e,r.appendChild(s),s.setAttribute("readonly",""),s.select(),s.setSelectionRange(0,e.length);try{document.execCommand("copy"),t()}catch(n){t(n)}finally{r.removeChild(s)}};jw.exports=Ac});var Aw=h((Pc,Uw)=>{Pc=function(e,t,s){var r;return function(){var n=this,i=arguments,o=function(){r=null,e.apply(n,i)};s||clearTimeout(r),(!s||!r)&&(r=setTimeout(o,t))}};Uw.exports=Pc});var Ow=h((Oc,Pw)=>{var UM=Aw();Oc=function(e,t){return UM(e,t,!0)};Pw.exports=Oc});var Rw=h((qc,qw)=>{qc=function(e){for(var t=[],s=document.evaluate(e,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),r=0;r<s.snapshotLength;r++)t.push(s.snapshotItem(r));return t};qw.exports=qc});var Hw=h((Rc,Iw)=>{var AM=ot();Rc=function(e){return AM(e)==="[object Date]"};Iw.exports=Rc});var Dw=h((Ic,Bw)=>{Ic=function(e,t){var s="";if(t<1)return"";for(;t>0;)t&1&&(s+=e),t>>=1,e+=e;return s};Bw.exports=Ic});var $w=h((Hc,Nw)=>{var PM=Dw(),OM=Qe();Hc=function(e,t,s){e=OM(e);var r=e.length;return s=s||" ",r<t&&(e=(PM(s,t-r)+e).slice(-t)),e};Nw.exports=Hc});var zw=h((tt,Fw)=>{var qM=ee(),RM=Hw(),ai=Qe(),IM=$w();tt=function(e,t,s,r){arguments.length===1&&qM(e)&&!DM.test(e)&&(t=e,e=void 0),e=e||new Date,RM(e)||(e=new Date(e)),t=ai(tt.masks[t]||t||tt.masks.default);var n=t.slice(0,4);(n==="UTC:"||n==="GMT:")&&(t=t.slice(4),s=!0,n==="GMT:"&&(r=!0));var i=s?"getUTC":"get",o=e[i+"Date"](),a=e[i+"Day"](),l=e[i+"Month"](),c=e[i+"FullYear"](),p=e[i+"Hours"](),m=e[i+"Minutes"](),y=e[i+"Seconds"](),b=e[i+"Milliseconds"](),f=s?0:e.getTimezoneOffset(),u={d:o,dd:bt(o),ddd:tt.i18n.dayNames[a],dddd:tt.i18n.dayNames[a+7],m:l+1,mm:bt(l+1),mmm:tt.i18n.monthNames[l],mmmm:tt.i18n.monthNames[l+12],yy:ai(c).slice(2),yyyy:c,h:p%12||12,hh:bt(p%12||12),H:p,HH:bt(p),M:m,MM:bt(m),s:y,ss:bt(y),l:bt(b,3),L:bt(Math.round(b/10)),t:p<12?"a":"p",tt:p<12?"am":"pm",T:p<12?"A":"P",TT:p<12?"AM":"PM",Z:r?"GMT":s?"UTC":(ai(e).match(BM)||[""]).pop().replace(NM,""),o:(f>0?"-":"+")+bt(Math.floor(Math.abs(f)/60)*100+Math.abs(f)%60,4),S:["th","st","nd","rd"][o%10>3?0:(o%100-o%10!=10)*o%10]};return t.replace(HM,function(d){return d in u?u[d]:d.slice(1,d.length-1)})};var bt=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return IM(ai(e),t,"0")},HM=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,BM=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,DM=/\d/,NM=/[^-+\dA-Z]/g;tt.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};tt.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Fw.exports=tt});var Kw=h((Dc,Vw)=>{var Jw=Ln(),Bc=Jw.getComputedStyle,Ww=Jw.document;Dc=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.display,r=s===void 0?!0:s,n=t.visibility,i=n===void 0?!1:n,o=t.opacity,a=o===void 0?!1:o,l=t.size,c=l===void 0?!1:l,p=t.viewport,m=p===void 0?!1:p,y=t.overflow,b=y===void 0?!1:y;if(r)return e.offsetParent===null;var f=Bc(e);if(i&&f.visibility==="hidden")return!0;if(a){if(f.opacity==="0")return!0;for(var u=e;u=u.parentElement;){var d=Bc(u);if(d.opacity==="0")return!0}}var v=e.getBoundingClientRect();if(c&&(v.width===0||v.height===0))return!0;if(m){var S={top:0,left:0,right:Ww.documentElement.clientWidth,bottom:Ww.documentElement.clientHeight};return Gw(v,S)}if(b)for(var w=e;w=w.parentElement;){var g=Bc(w),_=g.overflow;if(_==="scroll"||_==="hidden"){var A=w.getBoundingClientRect();if(Gw(v,A))return!0}}return!1};function Gw(e,t){return e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom}Vw.exports=Dc});var Xw=h(Or=>{"use strict";var $c=Or&&Or.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Or,"__esModule",{value:!0});var $M=$c(cr()),FM=$c(mr()),zM=An(),WM=$c(G()),Nc=class extends $M.default{constructor(t,{compName:s}){super(),this.compName=s,this.c=zM.classPrefix(s),this.options={},this.container=t,this.$container=FM.default(t),this.$container.addClass(`luna-${s}`)}destroy(){this.$container.rmClass(`luna-${this.compName}`),this.$container.html(""),this.emit("destroy"),this.removeAllListeners()}setOption(t,s){let r=this.options,n={};typeof t=="string"?n[t]=s:n=t,WM.default(n,(i,o)=>{let a=r[o];r[o]=i,this.emit("optionChange",o,i,a)})}find(t){return this.$container.find(this.c(t))}};Or.default=Nc});var ex=h((Fc,Zw)=>{var GM=_r(),JM=Qo(),os,Rr,Yw=0;if(JM)for(os=window.requestAnimationFrame,Rr=window.cancelAnimationFrame,qr=["ms","moz","webkit","o"],Is=0,Qw=qr.length;Is<Qw&&!os;Is++)os=window[qr[Is]+"RequestAnimationFrame"],Rr=window[qr[Is]+"CancelAnimationFrame"]||window[qr[Is]+"CancelRequestAnimationFrame"];var qr,Is,Qw;os=os||function(e){var t=GM(),s=Math.max(0,16-(t-Yw)),r=setTimeout(function(){e(t+s)},s);return Yw=t+s,r};Rr=Rr||function(e){clearTimeout(e)};os.cancel=Rr;Fc=os;Zw.exports=Fc});var ax=h((Hr,zc)=>{"use strict";var Q=Hr&&Hr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Hr,"__esModule",{value:!0});var VM=Q(xw()),tx=Q(Re()),sx=Q(kw()),KM=Q(_r()),rx=Q(ee()),XM=Q(Yt()),YM=Q(Tl()),QM=Q(Cw()),ZM=Q(He()),nx=Q(ya()),as=Q(wn()),eU=Q(at()),tU=Q(Mw()),ix=Q(G()),sU=Q(lt()),rU=Q(Ee()),nU=Q(En()),iU=Q(Ow()),oU=Q(Rw()),aU=Q(Xt()),lU=Q(zw()),cU=Q(Kw()),pU=Q(rc()),uU=An(),dU=Q(Xw()),mU=ex(),ox=navigator.userAgent,fU=ox.indexOf("Android")>-1||ox.indexOf("Adr")>-1,hU=uU.classPrefix("console"),gU=0,Ir=class extends dU.default{constructor(t,{maxNum:s=0,asyncRender:r=!0,showHeader:n=!1,filter:i="all",accessGetter:o=!1,unenumerable:a=!0,lazyEvaluation:l=!0}={}){super(t,{compName:"console"}),this.spaceHeight=0,this.topSpaceHeight=0,this.bottomSpaceHeight=0,this.lastScrollTop=0,this.lastTimestamp=0,this.speedToleranceFactor=100,this.maxSpeedTolerance=2e3,this.minSpeedTolerance=100,this.logs=[],this.displayLogs=[],this.timer={},this.counter={},this.asyncList=[],this.asyncTimer=null,this.isAtBottom=!0,this.groupStack=new nx.default,this.onScroll=()=>{let{scrollHeight:c,offsetHeight:p,scrollTop:m}=this.container;if(m<=0||p+m>c)return;let y=!1;(c===p||m===c-p)&&(y=!0),this.isAtBottom=y;let b=this.lastScrollTop,f=this.lastTimestamp,u=KM.default(),d=u-f,v=m-b,w=Math.abs(v/d)*this.speedToleranceFactor;d>1e3&&(w=1e3),w>this.maxSpeedTolerance&&(w=this.maxSpeedTolerance),w<this.minSpeedTolerance&&(w=this.minSpeedTolerance),this.lastScrollTop=m,this.lastTimestamp=u;let g=0,_=0;b<m?(g=this.minSpeedTolerance,_=w):(g=w,_=this.minSpeedTolerance),!(this.topSpaceHeight<m-g&&this.topSpaceHeight+this.el.offsetHeight>m+p+_)&&this.renderViewport({topTolerance:g*2,bottomTolerance:_*2})},this.initTpl(),this.options={maxNum:s,asyncRender:r,showHeader:n,filter:i,accessGetter:o,unenumerable:a,lazyEvaluation:l},this.$el=this.find(".logs"),this.el=this.$el.get(0),this.$fakeEl=this.find(".fake-logs"),this.fakeEl=this.$fakeEl.get(0),this.$space=this.find(".logs-space"),this.space=this.$space.get(0),fU&&(this.speedToleranceFactor=800,this.maxSpeedTolerance=3e3,this.minSpeedTolerance=800),this.renderViewport=iU.default(c=>{this._renderViewport(c)},16),this.global={copy(c){rx.default(c)||(c=JSON.stringify(c,null,2)),tU.default(c)},$(c){return document.querySelector(c)},$$(c){return sU.default(document.querySelectorAll(c))},$x(c){return oU.default(c)},clear:()=>{this.clear()},dir:c=>{this.dir(c)},table:(c,p)=>{this.table(c,p)},keys:rU.default},this.bindEvent()}setGlobal(t,s){this.global[t]=s}destroy(){super.destroy(),this.$container.off("scroll",this.onScroll)}count(t="default"){let{counter:s}=this;tx.default(s[t])?s[t]=1:s[t]++,this.info(`${t}: ${s[t]}`)}countReset(t="default"){this.counter[t]=0}assert(...t){if(as.default(t))return;t.shift()||(t.length===0&&t.unshift("console.assert"),t.unshift("Assertion failed: "),this.insert("error",t))}log(...t){as.default(t)||this.insert("log",t)}debug(...t){as.default(t)||this.insert("debug",t)}dir(t){tx.default(t)||this.insert("dir",[t])}table(...t){as.default(t)||this.insert("table",t)}time(t="default"){if(this.timer[t])return this.insert("warn",[`Timer '${t}' already exists`]);this.timer[t]=sx.default()}timeLog(t="default"){let s=this.timer[t];if(!s)return this.insert("warn",[`Timer '${t}' does not exist`]);this.info(`${t}: ${sx.default()-s}ms`)}timeEnd(t="default"){this.timeLog(t),delete this.timer[t]}clear(t=!1){this.logs=[],this.displayLogs=[],this.lastLog=void 0,this.counter={},this.timer={},this.groupStack=new nx.default,this.asyncList=[],this.asyncTimer&&(clearTimeout(this.asyncTimer),this.asyncTimer=null),t?this.render():this.insert("log",["%cConsole was cleared","color:#808080;font-style:italic;"])}info(...t){as.default(t)||this.insert("log",t)}error(...t){as.default(t)||this.insert("error",t)}warn(...t){as.default(t)||this.insert("warn",t)}group(...t){this.insert({type:"group",args:t,ignoreFilter:!0})}groupCollapsed(...t){this.insert({type:"groupCollapsed",args:t,ignoreFilter:!0})}groupEnd(){this.insert("groupEnd")}evaluate(t){this.insert({type:"input",args:[t],ignoreFilter:!0});try{this.output(this.evalJs(t))}catch(s){this.insert({type:"error",ignoreFilter:!0,args:[s]})}}html(...t){this.insert("html",t)}toggleGroup(t){let{targetGroup:s}=t;s.collapsed?this.openGroup(t):this.collapseGroup(t)}output(t){this.insert({type:"output",args:[t],ignoreFilter:!0})}render(){let{logs:t}=this;this.$el.html(""),this.isAtBottom=!0,this.updateBottomSpace(0),this.updateTopSpace(0),this.displayLogs=[];for(let s=0,r=t.length;s<r;s++)this.attachLog(t[s])}insert(t,s){let{showHeader:r,asyncRender:n}=this.options,i;if(r&&(i={time:_U(),from:yU()}),n)return this.insertAsync(t,s,i);this.insertSync(t,s,i)}insertAsync(t,s,r){this.asyncList.push([t,s,r]),this.handleAsyncList()}insertSync(t,s,r){let{logs:n,groupStack:i}=this,{maxNum:o,accessGetter:a,unenumerable:l,lazyEvaluation:c}=this.options,p;if(rx.default(t)?p={type:t,args:s,header:r}:p=t,p.type==="groupEnd"){this.lastLog.groupEnd(),this.groupStack.pop();return}if(i.size>0&&(p.group=i.peek()),XM.default(p,{id:++gU,accessGetter:a,unenumerable:l,lazyEvaluation:c}),p.type==="group"||p.type==="groupCollapsed"){let b={id:YM.default("group"),collapsed:!1,parent:i.peek(),indentLevel:i.size+1};p.type==="groupCollapsed"&&(b.collapsed=!0),p.targetGroup=b,i.push(b)}let m=new VM.default(this,p);m.on("updateSize",()=>{this.isAtBottom=!1,this.renderViewport()});let y=this.lastLog;if(y&&!eU.default(["html","group","groupCollapsed"],m.type)&&y.type===m.type&&!m.src&&!m.args&&y.text()===m.text()?(y.addCount(),m.header&&y.updateTime(m.header.time),m=y,this.detachLog(y)):(n.push(m),this.lastLog=m),o!==0&&n.length>o){let b=n[0];this.detachLog(b),n.shift()}this.attachLog(m),this.emit("insert",m)}updateTopSpace(t){this.topSpaceHeight=t,this.el.style.top=t+"px"}updateBottomSpace(t){this.bottomSpaceHeight=t}updateSpace(t){this.spaceHeight!==t&&(this.spaceHeight=t,this.space.style.height=t+"px")}detachLog(t){let{displayLogs:s}=this,r=s.indexOf(t);r>-1&&(s.splice(r,1),this.renderViewport())}attachLog(t){if(!this.filterLog(t)||t.collapsed)return;let{displayLogs:s}=this;if(s.length===0){s.push(t),this.renderViewport();return}let r=nU.default(s);if(t.id>r.id){s.push(t),this.renderViewport();return}let n=0,i=s.length-1,o,a=0;for(;n<=i;){if(a=n+Math.floor((i-n)/2),o=s[a],o.id===t.id)return;o.id<t.id?n=a+1:i=a-1}o.id<t.id?s.splice(a+1,0,t):s.splice(a,0,t),this.renderViewport()}handleAsyncList(t=20){let s=this.asyncList;this.asyncTimer||(this.asyncTimer=setTimeout(()=>{this.asyncTimer=null;let r=!1,n=s.length,i,o;n<1e3?(o=200,i=400):n<5e3?(o=500,i=800):n<1e4?(o=800,i=1e3):n<25e3?(o=1e3,i=1200):n<5e4?(o=1500,i=1500):(o=2e3,i=2500),o>n&&(o=n,r=!0);for(let a=0;a<o;a++){let[l,c,p]=s.shift();this.insertSync(l,c,p)}r||mU(()=>this.handleAsyncList(i))},t))}injectGlobal(){ix.default(this.global,(t,s)=>{window[s]||(window[s]=t)})}clearGlobal(){ix.default(this.global,(t,s)=>{window[s]&&window[s]===t&&delete window[s]})}evalJs(t){let s;this.injectGlobal();try{s=eval.call(window,`(${t})`)}catch{s=eval.call(window,t)}return this.setGlobal("$_",s),this.clearGlobal(),s}filterLog(t){let{filter:s}=this.options;return s==="all"||t.ignoreFilter?!0:ZM.default(s)?s(t):QM.default(s)?s.test(aU.default(t.text())):t.type===s}collapseGroup(t){let{targetGroup:s}=t;s.collapsed=!0,t.updateIcon("caret-right"),this.updateGroup(t)}openGroup(t){let{targetGroup:s}=t;s.collapsed=!1,t.updateIcon("caret-down"),this.updateGroup(t)}updateGroup(t){let{targetGroup:s}=t,{logs:r}=this,n=r.length,i=r.indexOf(t)+1;for(;i<n;){let o=r[i];if(!o.checkGroup()&&o.group===s)break;o.collapsed?this.detachLog(o):this.attachLog(o),i++}}bindEvent(){let{$el:t}=this;t.on("click",hU(".log-container"),function(){this.log.click()}),this.on("optionChange",(s,r)=>{let{logs:n}=this;switch(s){case"maxNum":r>0&&n.length>r&&(this.logs=n.slice(n.length-r),this.render());break;case"filter":this.render();break}}),this.$container.on("scroll",this.onScroll)}_renderViewport({topTolerance:t=500,bottomTolerance:s=500}={}){let{el:r,container:n}=this;if(cU.default(n))return;let{scrollTop:i,clientWidth:o,offsetHeight:a}=n,l=i-t,c=i+a+s,{displayLogs:p}=this,m=0,y=0,b=0,f=p.length,{fakeEl:u}=this,d=document.createDocumentFragment(),v=[];for(let g=0;g<f;g++){let _=p[g],{width:A,height:L}=_;(L===0||A!==o)&&(d.appendChild(_.container),v.push(_))}if(v.length>0){u.appendChild(d);for(let g=0,_=v.length;g<_;g++)v[g].updateSize();u.innerHTML=""}let S=document.createDocumentFragment();for(let g=0;g<f;g++){let _=p[g],{container:A,height:L}=_;b>c?y+=L:b+L>l?S.appendChild(A):b<l&&(m+=L),b+=L}for(this.updateSpace(b),this.updateTopSpace(m),this.updateBottomSpace(y);r.firstChild;)r.lastChild&&r.removeChild(r.lastChild);r.appendChild(S);let{scrollHeight:w}=n;this.isAtBottom&&i<=w-a&&(n.scrollTop=1e7)}initTpl(){this.$container.html(this.c(pU.default`
      <div class="logs-space">
        <div class="fake-logs"></div>
        <div class="logs"></div>
      </div>
    `))}};Hr.default=Ir;zc.exports=Ir;zc.exports.default=Ir;var _U=()=>lU.default("HH:MM:ss ");function yU(){let e=new Error,t="",s=e.stack?e.stack.split(`
`):"";for(let r=0,n=s.length;r<n;r++)if(t=s[r],t.indexOf("winConsole")>-1&&r<n-1){t=s[r+1];break}return t}});var yi=(e,t)=>{let s;return(...r)=>{s&&clearTimeout(s),s=setTimeout(()=>e.apply(null,r),typeof t=="function"?t():t)}},up=e=>{let t=document.createElement("textarea");return t.innerHTML=e,t.value};var vi=e=>e.replace(/<\/script>/g,"<\\/script>"),Bt=(e,t=!0)=>e.replace(/\\/g,t?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var Vr=()=>{let e=!1,t=navigator.userAgent.toLowerCase();(function(r){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4)))&&(e=!0)})(t||navigator.vendor||window.opera);let s=t.indexOf("safari")>-1&&t.indexOf("chrome")===-1;return e||s},ds=e=>!e?.startsWith("http")&&!e?.startsWith("data:"),ms=(e,t=document.baseURI)=>ds(e)?new URL(e,t).href:e,St=e=>JSON.parse(JSON.stringify(e)),Fs=(e,t)=>Object.fromEntries(Object.entries(e).map(([s,r],n)=>[s,t(r,s,n)])),dp=(e,t)=>Object.fromEntries(Object.entries(e).filter(([s,r],n)=>t(r,s,n))),bi=e=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy")){let t=document.createElement("textarea");t.textContent=e,t.style.position="fixed",document.body.appendChild(t),t.select();try{return document.execCommand("copy")}catch(s){return console.warn("Copy to clipboard failed.",s),!1}finally{document.body.removeChild(t)}}return!1};var Kr=(e,t=!1)=>{try{return JSON.stringify(e,void 0,t?2:void 0)}catch{return""}},Hx=()=>String(Math.random())+"-"+Date.now().toFixed();var Xr=(e,t)=>new Promise((s,r)=>{if(t&&globalThis[t])return s(globalThis[t]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),t&&globalThis[t]?s(globalThis[t]):s(globalThis);let n=document.createElement("script");n.src=e,n.async=!0;let i=()=>{n.removeEventListener("load",o),n.removeEventListener("error",a)},o=()=>{if(i(),!t)return s("loaded: "+e);let l=setInterval(()=>{if(window[t])return clearInterval(l),s(window[t])},5)},a=()=>{i(),r("failed to load: "+e)};n.addEventListener("load",o),n.addEventListener("error",a),document.head.appendChild(n)}),fs=(e,t,s)=>{if(t&&document.getElementById(t))return;let r=document.createElement("link");r.rel="stylesheet",r.href=e,r.id=t||"styles-"+Hx(),document.head.insertBefore(r,s?document.querySelector(s):null)};var zs=e=>e.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,"$1"),Bx=e=>e.replace(/'[^\n']*'/gm,"''").replace(/"[^\n"]*"/gm,'""').replace(/`[^`]*`/gm,"``"),wi=e=>Bx(zs(e)),R=(e,t)=>({...t.customSettings[e]}),xi=e=>{if(!e)return null;let t=null;if(e.startsWith("http")||e.startsWith("data:"))try{t=new URL(e).href}catch{try{t=new URL(decodeURIComponent(e)).href}catch{}}return t};var mp=e=>e.replace(/[-_.]+/g," ").trim().replace(/^([A-Z])|\s+(\w)/g,function(t,s,r){return r?r.toUpperCase():s.toLowerCase()}),Dt=e=>Array.from(new Set(e));function Dx(e){return import(e)}var Si=null;function fp(e){return Si||(Si=Dx(e).catch(()=>{})),Si}var gp=["jspm","skypack"],_p=["unpkg","jsdelivr"],yp=["jsdelivr.gh","statically"],Pe={getModuleUrl:(e,{isModule:t=!0,defaultCDN:s="jspm"}={})=>{e=e.replace(/#nobundle/g,"");let r=hp(e,t,s);return r||(t?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,t)=>e.startsWith("http")?e:hp(e,!1,t||Nt())||e,cdnLists:{npm:_p,module:gp,gh:yp},checkCDNs:async(e,t)=>{let s=[t,...Pe.cdnLists.npm].filter(Boolean);for(let r of s)try{if((await fetch(Pe.getUrl(e,r),{method:"HEAD"})).ok)return r}catch{}return Pe.cdnLists.npm[0]}},Nt=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||Pe.cdnLists.npm[0]}catch{return Pe.cdnLists.npm[0]}},hp=(e,t,s)=>{let r=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",yp[0]):e.includes(":")||(e=(s||(t?gp[0]:_p[0]))+":"+e);for(let n of Nx){let[i,o]=n;if(i.test(e))return e.replace(i,o)+r}return null},Nx=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:C,getModuleUrl:$x}=Pe,M=C("@live-codes/browser-compilers@0.7.4/dist/");var vp=C("art-template@4.13.2/lib/template-web.js"),bp=C("@asciidoctor/core@2.2.6/dist/browser/asciidoctor.js"),wp=C("@assemblyscript/loader@0.27.5/umd/index.js");var xp=C("@hatemhosny/astro-internal@0.0.4/");var Sp=C("@babel/standalone@7.22.4/babel.js"),Lp=C("biwascheme@0.8.0/release/biwascheme.js");var Li=C("brython@3.11.2/"),Ep=$x("chai@4.3.6");var Yr=C("cherry-cljs@0.0.4/");var Ei=C("@live-codes/clio-browser-compiler@0.0.3/public/build/"),kp=C("coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js");var Tp=C("dot@1.1.3/doT.js"),Cp=C("ejs@3.1.9/ejs.js");var jp="es-module-shims@1.4.4/dist/es-module-shims.js",Mp=C("eta@2.2.0/dist/eta.umd.js");var Up=C("@fontsource/anonymous-pro@4.5.9/index.css"),Ap=C("@fontsource/cascadia-code@4.2.1/index.css"),Pp=C("https://fonts.cdnfonts.com/css/code-new-roman-2"),Op=C("comic-mono@0.0.1/index.css"),qp=C("@fontsource/courier-prime@4.5.9/index.css"),Rp=C("https://fonts.cdnfonts.com/css/dec-terminal-modern"),Ip=C("@fontsource/dejavu-mono@4.5.4/index.css"),Hp=C("@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono.css"),Bp=C("firacode@6.2.0/distr/fira_code.css"),Dp=C("https://fonts.cdnfonts.com/css/fixedsys-62"),Np=C("hack-font@3.3.0/build/web/hack.css"),$p=C("typeface-hermit@0.0.44/index.css"),Fp=C("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap"),zp=C("https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"),Wp=C("@fontsource/iosevka@4.5.4/index.css"),Gp=C("@fontsource/jetbrains-mono@4.5.11/index.css"),Jp=C("https://fonts.cdnfonts.com/css/menlo"),Vp=C("https://fonts.cdnfonts.com/css/monofur"),Kp=C("@typopro/web-monoid@3.7.5/TypoPRO-Monoid.css"),Xp=C("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap"),Yp=C("https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap"),Qp=C("@fontsource/opendyslexic@4.5.4/index.css"),Zp=C("https://fonts.cdnfonts.com/css/profontwindows"),eu=C("@fontsource/roboto-mono@4.5.8/index.css"),tu=C("https://fonts.cdnfonts.com/css/sf-mono"),su=C("@fontsource/source-code-pro@4.5.12/index.css"),ru=C("@fontsource/space-mono@4.5.10/index.css"),nu=C("https://fonts.cdnfonts.com/css/sudo-var"),iu=C("@fontsource/ubuntu-mono@4.5.11/index.css"),ou=C("victormono@1.5.4/dist/index.css"),au=C("fscreen@1.2.0/dist/fscreen.esm.js");var Qr=C("@live-codes/go2js@0.4.0/build/");var ki=C("handlebars@4.7.7/dist/");var lu=C("hint.css@2.7.0/hint.css");var Ti=C("imba@2.0.0-alpha.229/dist/"),cu=C("jest-lite@1.0.0-alpha.4/dist/core.js");var pu=C("gh:jscl-project/jscl-project.github.io@efd3aecdba496d132ed650b7b5be976fd0ca278f/jscl.js");var uu=C("liquidjs@10.8.2/dist/liquid.browser.min.js"),du=C("localforage@1.10.0/dist/localforage.js"),Lt=C("fengari-web@0.1.4/dist/fengari-web.js"),mu=C("luna-object-viewer@0.2.0/luna-object-viewer.css"),fu=C("luna-console@0.2.1/luna-console.css"),Ci="0.6.64",LA=C(`malinajs@${Ci}/malina.js`),hu=C("marked@5.0.4/marked.min.js");var gu=C("mjml-browser@4.14.1/lib/index.js");var _u=C("mustache@4.2.0/mustache.js");var yu=C("normalize.css@8.0.1/normalize.css"),ji=C("nunjucks@3.2.4/browser/"),Ws=C("https://cdn.opalrb.com/opal/1.7.3/"),vu=C("parinfer@3.13.1/parinfer.js");var bu=C("@live-codes/postcss-import-url@0.1.2/dist/postcss-import-url.js"),$t=C("prettier@2.5.1/"),wu=C("@prettier/plugin-php@0.18.0/standalone.js");var xu=C("requirejs@2.3.6/require.js");var Su=C("reset-css@5.0.1/reset.css"),Mi=C("riot@7.1.0/"),Lu=C("@snackbar/core@1.7.0/dist/snackbar.css"),Eu=C("spacingjs@1.0.7/dist/bundle.js"),ku=C("sql-formatter@12.2.1/dist/sql-formatter.min.js"),Tu=C("sql.js@1.8.0/dist/"),Cu=C("@stencil/core@3.2.2/compiler/stencil.js"),ju=C("stylis@4.2.0/dist/umd/stylis.js");var Mu=C("@mhsdesign/jit-browser-tailwindcss@0.3.0/dist/cdn.min.js"),ze=C("tau-prolog@0.3.4/modules/");var Uu=C("twig@1.16.0/twig.min.js"),Au=C("typescript@5.1.3/lib/typescript.js"),Pu=C("uniter@2.18.0/dist/uniter.js");var Ui=C("vue@3"),Ai=C("vue@2"),Zr=C("vue3-sfc-loader@0.8.4/dist/"),Ou=C("wabt@1.0.32/index.js");var qu={name:"lightningcss",title:"Lightning CSS",isPostcssPlugin:!1,compiler:{url:M+"lightningcss/lightningcss.js",factory:(e,t)=>(self.importScripts(t+"processor-lightningcss-compiler.c9a8575d1089c28538780ba5ba130cb2.js"),self.createLightningcssCompiler())},editor:"style"};var Ru={name:"postcss",title:"Processors:",isPostcssPlugin:!1,compiler:{url:M+"postcss/postcss.js",factory:(e,t)=>(self.importScripts(t+"processor-postcss-compiler.f8787bd5395ada95f6d40279daf71948.js"),self.createPostcssCompiler())},editor:"style",hidden:!0};var Iu={name:"autoprefixer",title:"Autoprefixer",isPostcssPlugin:!0,compiler:{url:M+"autoprefixer/autoprefixer.js",factory:e=>self.autoprefixer.autoprefixer({...R("autoprefixer",e)})},editor:"style"},Hu={name:"cssnano",title:"cssnano",isPostcssPlugin:!0,compiler:{url:M+"cssnano/cssnano.js",factory:()=>{let e=self.cssnano.cssnanoPresetDefault().plugins,t=[];for(let s of e){let[r,n]=s;(typeof n>"u"||typeof n=="object"&&!n.exclude||typeof n=="boolean"&&n===!0)&&t.push(r(n))}return t}},editor:"style"},Bu={name:"postcssImportUrl",title:"Import Url",isPostcssPlugin:!0,compiler:{url:bu,factory:e=>self.postcssImportUrl({...R("postcssImportUrl",e)})},editor:"style"},Du={name:"postcssPresetEnv",title:"Preset Env",isPostcssPlugin:!0,compiler:{url:M+"postcss-preset-env/postcss-preset-env.js",factory:e=>self.postcssPresetEnv.postcssPresetEnv({autoprefixer:!1,...R("postcssPresetEnv",e)})},editor:"style"},Nu={name:"purgecss",title:"PurgeCSS",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:M+"purgecss/purgecss.js",factory:(e,t,s)=>self.purgecss.purgecss({...R("purgecss",e),content:[{raw:`<template>${s.html}
<script>${e.script.content}<\/script></template>`,extension:"html"}]})},editor:"style"},$u={name:"tokencss",title:"Token CSS",isPostcssPlugin:!0,compiler:{url:M+"tokencss/tokencss.js",factory:e=>{let t=R("tokencss",e);Object.keys(t).length===0&&(t.$schema="https://tokencss.com/schema@0.0.1",t.extends="@tokencss/core/preset");let s=(n,i)=>{let o=JSON.parse(JSON.stringify(n));return Object.keys(i).forEach(a=>{o[a]=typeof i[a]!="object"||Array.isArray(i[a])?i[a]:{...o[a],...i[a]}}),o},r=t.extends?.includes("@tokencss/core/preset")?s(self.tokencss.preset,t):t;return self.tokencss.tokencss({config:r})}},editor:"style"},Fu={name:"cssmodules",title:"CSS Modules",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:M+"postcss-modules/postcss-modules.js",factory:(e,t,s)=>{let r=R("cssmodules",e);return self.postcssModules.postcssModules({localsConvention:"camelCase",...r,getJSON(n,i,o){let a=r.addClassesToHTML!==!1,l=r.removeOriginalClasses===!0;a&&(s.html=self.postcssModules.addClassesToHtml(s.html,i,l)),s.compileInfo={...s.compileInfo,cssModules:i,...a?{modifiedHTML:s.html}:{}}}})}},editor:"style"};var zu={name:"tailwindcss",title:"Tailwind CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:Mu,factory:(e,t)=>(self.importScripts(t+"processor-tailwindcss-compiler.4e4e1e62107a607ca6b8b776830640ee.js"),self.createTailwindcssCompiler())},editor:"style"};var Wu={name:"unocss",title:"UnoCSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:M+"unocss/unocss.js",factory:(e,t)=>(self.importScripts(t+"processor-unocss-compiler.aabd93b3d26601936d1f5a0f0c4f7c00.js"),self.createUnocssCompiler())},editor:"style"};var Gu={name:"windicss",title:"Windi CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:M+"windicss/windicss.js",factory:(e,t)=>(self.importScripts(t+"processor-windicss-compiler.2c60d8a9c198f1d4b94016ef99f81429.js"),self.createWindicssCompiler())},editor:"style"};var Oe=[zu,Gu,Wu,$u,Nu,Bu,Iu,Du,qu,Hu,Fu,Ru];var V=(e="")=>{if(!e)return;let t=e?.toLowerCase();return Le.find(s=>s.name===t||s.title.toLowerCase()===t||s.extensions.map(r=>r.toLowerCase()).includes(t))?.name},Ju=e=>{let t=Le.find(s=>s.name===e);return t?.longTitle||t?.title||e.toUpperCase()},te=(e="")=>Le.find(t=>t.name===V(e))?.editor,hs=(e="")=>Le.find(t=>t.name===V(e))?.extensions[0],Gs=(e="")=>Le.find(t=>t.name===V(e)),We=(e="")=>{let s=Gs(e)?.compiler;return typeof s=="string"&&(s=We(s)),s},gs=e=>Gs(e)?.editorLanguage||e,qe=(e,t)=>{let s=V(e);return s?t.languages?t.languages?.map(V).filter(Boolean).includes(s):!0:!1},Ft=(e,t)=>Oe.map(s=>s.name).includes(e)?t.languages?t.languages.includes(e):!0:!1,Pi=(e,t)=>t.processors.includes(e),Vu=(e,t)=>{let s=te(e);return s?Oe.filter(r=>r.editor===s).map(r=>r.name).filter(r=>Ft(r,t)).filter(r=>Pi(r,t)).join("-"):""};var Oi=(e,t)=>{let s={...R(e,t)};return te(e)==="markup"&&(s.template=t.customSettings.template),s};var Ku={name:"asciidoc",title:"AsciiDoc",compiler:{url:bp,factory:()=>{let e=window.Asciidoctor();return async(t,{config:s})=>e.convert(t,{...R("asciidoc",s)})}},extensions:["adoc","asciidoc","asc"],editor:"markup"};var f2=$t+"standalone.js",k={babel:$t+"parser-babel.js",glimmer:$t+"parser-glimmer.js",html:$t+"parser-html.js",markdown:$t+"parser-markdown.js",postcss:$t+"parser-postcss.js",php:wu,pug:M+"prettier/parser-pug.js"};var Xu={name:"babel",title:"Babel",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{url:Sp,factory:()=>async(e,{config:t})=>window.Babel.transform(e,{filename:"script.tsx",presets:[["env",{modules:!1}],"typescript","react"],...R("babel",t)}).code},extensions:["es","babel"],editor:"script",editorLanguage:"typescript"};var Yu={name:"css",title:"CSS",info:!1,parser:{name:"css",pluginUrls:[k.postcss]},compiler:{factory:()=>async e=>e},extensions:["css"],editor:"style"};var Qu={name:"haml",title:"Haml",compiler:{url:M+"clientside-haml-js/haml.js",factory:(e,t)=>(self.importScripts(t+"lang-haml-compiler.8e0f4fea3a8fefc8259ca8d6f0768a72.js"),self.createHamlCompiler())},extensions:["haml"],editor:"markup"};var Zu={name:"html",title:"HTML",info:!1,parser:{name:"html",pluginUrls:[k.html]},compiler:{factory:()=>async e=>e},extensions:["html","htm"],editor:"markup"};var ed={name:"javascript",title:"JS",longTitle:"JavaScript",info:!1,parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{factory:()=>async e=>e},extensions:["js"],editor:"script"};var td={name:"jsx",title:"JSX",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:"typescript",extensions:["jsx"],editor:"script",editorLanguage:"javascript"};var sd={name:"tsx",title:"TSX",parser:{name:"babel-ts",pluginUrls:[k.babel,k.html]},compiler:"typescript",extensions:["tsx"],editor:"script",editorLanguage:"typescript"};var rd={name:"less",title:"Less",parser:{name:"less",pluginUrls:[k.postcss]},compiler:{url:M+"less/less.js",factory:()=>async(e,{config:t})=>(await window.less.render(e,{...R("less",t)})).css},extensions:["less"],editor:"style"};var nd={name:"markdown",title:"Markdown",parser:{name:"markdown",pluginUrls:[k.markdown,k.html]},compiler:{url:hu,factory:()=>async(e,{config:t})=>window.marked.parse(e,{headerIds:!1,mangle:!1,...R("markdown",t)})},extensions:["md","markdown","mdown","mkdn"],editor:"markup"};var Js=async(e,t,s,r={},n=self)=>new Promise(i=>{if(!e||!t||!s)return i(e||"");let o=async function(a){let l=a.data.payload;a.data.trigger==="compileInCompiler"&&l?.content===e&&l?.language===t&&(n.removeEventListener("message",o),i(l.compiled))};n.addEventListener("message",o),n.postMessage({type:"compileInCompiler",payload:{content:e,language:t,config:s,options:r}})});var Fx=async(e,{config:t,worker:s})=>new Promise(async r=>{if(!e)return r("");let[n,{default:i}]=await Promise.all([import(M+"mdx/mdx.js"),import(M+"remark-gfm/remark-gfm.js")]),o=(await n.compile(e,{remarkPlugins:[i],...R("mdx",t)})).value,l=(m=>m.replace(/, {[^}]*} = _components/g,"").replace(/const {[^:]*} = props.components[^;]*;/g,""))(o),c=`import React from "react";
import { createRoot } from "react-dom/client";
${Bt(l,!1)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`,p=await Js(c,"jsx",t,{},s);r(`<div id="__livecodes_mdx_root__"></div><script type="module">${p}<\/script>`)}),id={name:"mdx",title:"MDX",parser:{name:"markdown",pluginUrls:[k.markdown,k.html]},compiler:{factory:()=>async e=>e,runOutsideWorker:Fx,compiledCodeLanguage:"javascript"},extensions:["mdx"],editor:"markup",editorLanguage:"markdown"};var od={name:"pug",title:"Pug",parser:{name:"pug",pluginUrls:[k.pug]},compiler:{url:M+"pug/pug.min.js",factory:(e,t)=>(self.importScripts(t+"lang-pug-compiler.6b93c9c73ccadec5e38caa8ec77d3900.js"),self.createPugCompiler())},extensions:["pug","jade"],editor:"markup"};var ad={name:"scss",title:"SCSS",parser:{name:"scss",pluginUrls:[k.postcss]},compiler:{url:M+"sass/sass.js",factory:(e,t)=>(self.importScripts(t+"lang-scss-compiler.712bd4672051205ef090643fa8dd8b68.js"),self.createScssCompiler())},extensions:["scss"],editor:"style"};var ld={name:"sass",title:"Sass",compiler:"scss",extensions:["sass"],editor:"style"};var cd={name:"svelte",title:"Svelte",parser:{name:"html",pluginUrls:[k.html,k.babel]},compiler:{url:M+"svelte/svelte-compiler.min.js",factory:(e,t)=>(self.importScripts(t+"lang-svelte-compiler.069bfb65fda860a697774c930b5d091c.js"),self.createSvelteCompiler())},extensions:["svelte"],editor:"script",editorLanguage:"html"};var pd={name:"stylus",title:"Stylus",compiler:{url:M+"stylus/stylus.min.js",factory:()=>async e=>window.stylus.render(e)},extensions:["styl"],editor:"style"};var Vs={target:"es2015",jsx:"react",allowUmdGlobalAccess:!0,esModuleInterop:!0},ud={name:"typescript",title:"TS",longTitle:"TypeScript",parser:{name:"babel-ts",pluginUrls:[k.babel,k.html]},compiler:{url:Au,factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...Vs,...R("typescript",t),...R(s,t)})},extensions:["ts","typescript"],editor:"script"};var zx=Zr+"vue3-sfc-loader.js",dd={name:"vue",title:"Vue 3",longTitle:"Vue 3 SFC",parser:{name:"html",pluginUrls:[k.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVueCompiler()),scripts:[Ui,zx],imports:{vue:Ui+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue","vue3"],editor:"script",editorLanguage:"html"};var Wx=Zr+"vue2-sfc-loader.js",md={name:"vue2",title:"Vue 2",longTitle:"Vue 2 SFC",parser:{name:"html",pluginUrls:[k.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVue2Compiler()),scripts:[Ai,Wx],imports:{vue:Ai+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue2"],editor:"script",editorLanguage:"html"};var fd={name:"stencil",title:"Stencil",parser:{name:"babel-ts",pluginUrls:[k.babel,k.html]},compiler:{url:Cu,factory:()=>async(e,{config:t})=>(await window.stencil.transpile(e,{sourceMap:!1,target:"es2019",...R("stencil",t)})).code,types:{"@stencil/core":{url:M+"types/stencil-core.d.ts",declareAsModule:!1}}},extensions:["stencil.tsx"],editor:"script",editorLanguage:"typescript"};var hd={name:"coffeescript",title:"Coffee",longTitle:"CoffeeScript",compiler:{url:kp,factory:()=>async(e,{config:t})=>window.CoffeeScript.compile(e,{bare:!0,...R("coffeescript",t)})},extensions:["coffee"],editor:"script"};var gd={name:"livescript",title:"LiveScript",compiler:{url:M+"livescript/livescript-min.js",factory:()=>async(e,{config:t})=>window.require("livescript").compile(e,{bare:!0,...R("livescript",t)}),scripts:[M+"livescript/prelude-browser-min.js"]},extensions:["ls"],editor:"script"};var Gx=M+"assemblyscript/assemblyscript.js",_d={name:"assemblyscript",title:"AS",longTitle:"AssemblyScript",parser:{name:"babel-ts",pluginUrls:[k.babel]},compiler:{url:Gx,factory:(e,t)=>(self.importScripts(t+"lang-assemblyscript-compiler.8caa06a4a75b2f2d32150d1c4cd03b95.js"),self.createAssemblyscriptCompiler()),scripts:({baseUrl:e})=>[wp,e+"lang-assemblyscript-script.a8afe51d73d1fa349c7874dce9f2108f.js"],scriptType:"application/wasm-uint8",compiledCodeLanguage:"wat",types:{assemblyscript:{url:M+"types/assemblyscript.d.ts",declareAsModule:!1,autoload:!0}}},extensions:["as","ts"],editor:"script",editorLanguage:"typescript"};var Jx=Li+"brython.min.js",Vx=Li+"brython_stdlib.js",yd={name:"python",title:"Python",compiler:{factory:()=>async e=>e,scripts:({compiled:e,config:t})=>{let{autoloadStdlib:s,...r}=R("python",t),n=/^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm,i=s!==!1&&e.match(n)?[Vx]:[],o=`window.addEventListener("load", () => {brython(${JSON.stringify(r)})})`,a="data:text/plain;base64,"+btoa(o);return[Jx,...i,a]},scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py"],editor:"script"};var Kx=(e,t={})=>Array.from(new Set([...e.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map(s=>s[1]).map(s=>s.split("/")[0]).filter(s=>t.hasOwnProperty(s)||s!=="opal").map(s=>t[s]||`${Ws+s}.min.js`))),vd={name:"ruby",title:"Ruby",compiler:{url:Ws+"opal.min.js",factory:()=>(importScripts(Ws+"opal-parser.min.js"),self.Opal.config.unsupported_features_severity="ignore",self.Opal.load("opal-parser"),async(e,{config:t})=>{let{autoloadStdlib:s,requireMap:r,...n}=R("ruby",t);return self.Opal.compile(e,n)}),scripts:({compiled:e,config:t})=>{let{autoloadStdlib:s,requireMap:r}=R("ruby",t),n=Kx(e,r),i=s!==!1?n:[];return[Ws+"opal.min.js",...i]}},extensions:["rb"],editor:"script"};var bd={name:"php",title:"PHP",parser:{name:"php",pluginUrls:[k.php]},compiler:{factory:()=>async e=>(e=e.trim(),e.startsWith("<?php")&&(e=e.replace("<?php","/* <?php */"),e.endsWith("?>")&&(e=e.replace("?>","/* ?> */"))),e),scripts:[Pu],deferScripts:!0,scriptType:"text/x-uniter-php",compiledCodeLanguage:"php"},extensions:["php"],editor:"script"};var wd={name:"perl",title:"Perl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[M+"perlito/perlito5.min.js",e+"lang-perl-script.1f606d886aeb724510a595d45cbaf555.js"],scriptType:"text/perl"},extensions:["pl","pm"],editor:"script"};var Xx=M+"lua-fmt/lua-fmt.js",qi={factory:()=>(self.importScripts(Xx),async(e,t)=>({formatted:self.luaFmt.formatText(e),cursorOffset:t}))},xd={name:"lua",title:"Lua",formatter:qi,compiler:{factory:()=>async e=>e,scripts:[Lt],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["lua"],editor:"script"};var zt=()=>{let e=vu;return self.importScripts(e),async t=>({formatted:window.parinfer.parenMode(t).text,cursorOffset:0})},Sd={name:"commonlisp",title:"Lisp",longTitle:"Common Lisp",formatter:{factory:zt},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[pu,e+"lang-commonlisp-script.0c86dfce5f8509928ccf51ff666c7b4b.js"],scriptType:"text/commonlisp",compiledCodeLanguage:"commonlisp",inlineScript:`

    `},extensions:["lisp","common-lisp"],editor:"script",editorLanguage:"scheme"};var Ld={name:"scheme",title:"Scheme",formatter:{factory:zt},compiler:{factory:()=>async e=>e,scripts:[Lp],scriptType:"text/biwascheme",compiledCodeLanguage:"scheme"},extensions:["scm"],editor:"script"};var Ed={name:"solid",title:"Solid",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{dependencies:["babel"],url:M+"babel-preset-solid/babel-preset-solid.js",factory:(e,t)=>(self.importScripts(t+"lang-solid-compiler.4edfa4ed39f071836693c79f40f0d9b6.js"),self.createSolidCompiler()),types:{"solid-js":{url:M+"types/solid-js.d.ts",declareAsModule:!1}}},extensions:["solid.jsx"],editor:"script",editorLanguage:"javascript"};var kd={name:"solid.tsx",title:"Solid (TS)",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:"solid",extensions:["solid.tsx"],editor:"script",editorLanguage:"typescript"};var Td={name:"pyodide",title:"Pyodide",longTitle:"Python (Pyodide)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-python-pyodide-script.d8d4d32ed97521be2e4e35536f468333.js"],liveReload:!0,scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py3"],editor:"script",editorLanguage:"python",largeDownload:!0};var Cd={name:"liquid",title:"Liquid",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:uu,factory:(e,t)=>(self.importScripts(t+"lang-liquid-compiler.a8cb47f76c1808bdc02fcae94ff8025f.js"),self.createLiquidCompiler())},extensions:["liquid","liquidjs"],editor:"markup",editorLanguage:"html"};var jd={name:"ejs",title:"EJS",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Cp,factory:(e,t)=>(self.importScripts(t+"lang-ejs-compiler.1f9bfcb931f9f068dbdca2155fde7947.js"),self.createEjsCompiler())},extensions:["ejs"],editor:"markup",editorLanguage:"html"};var Yx=ki+"handlebars.min.js",hq=ki+"handlebars.runtime.min.js",Md={name:"handlebars",title:"Handlebars",parser:{name:"glimmer",pluginUrls:[k.glimmer]},compiler:{url:Yx,factory:(e,t)=>(self.importScripts(t+"lang-handlebars-compiler.be7818c60da12a1729c425a770910e92.js"),self.createHandlebarsCompiler())},extensions:["hbs","handlebars"],editor:"markup",editorLanguage:"html"};var Ud={name:"dot",title:"doT",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Tp,factory:(e,t)=>(self.importScripts(t+"lang-dot-compiler.557d6ca7c515de1e84f17c4842ec71cd.js"),self.createDotCompiler())},extensions:["dot"],editor:"markup",editorLanguage:"html"};var Qx=ji+"nunjucks.min.js",kq=ji+"nunjucks-slim.min.js",Ad={name:"nunjucks",title:"Nunjucks",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Qx,factory:(e,t)=>(self.importScripts(t+"lang-nunjucks-compiler.055d011de44eb181acbea8b1a49a7ce2.js"),self.createNunjucksCompiler())},extensions:["njk","nunjucks"],editor:"markup",editorLanguage:"html"};var Pd={name:"go",title:"Go",formatter:{factory:()=>(importScripts(Qr+"go2js-format.js"),async e=>{if(!e)return{formatted:"",cursorOffset:0};let[t,s]=globalThis.go2jsFormat(e);return s?(console.error(s),{formatted:e,cursorOffset:0}):{formatted:t,cursorOffset:0}})},compiler:{url:Qr+"go2js-compile.js",factory:()=>e=>new Promise(t=>{if(!e){t("");return}globalThis.go2jsCompile(e,Qr,(s,r)=>{s?(console.error(s),t("")):t(r)})})},extensions:["go","golang"],editor:"script"};var Zx=async(e,{baseUrl:t,language:s})=>{let{rescriptCompiler:r}=await import(t+"lang-rescript-compiler-esm.2b9d0781c004e55c6bc74ba441a3e29e.js");return r(e,{baseUrl:t,language:s})},Ri=(e,t)=>(importScripts(e+"lang-rescript-formatter.187ba934d1c84704a2717e3cf411e618.js"),self.createRescriptFormatter(e,t)),Od={name:"rescript",title:"ReScript",formatter:{factory:Ri},compiler:{factory:()=>async e=>e,runOutsideWorker:Zx,scriptType:"module"},extensions:["res","resi"],editor:"script",editorLanguage:"javascript"};var qd={name:"reason",title:"Reason",formatter:{factory:Ri},compiler:"rescript",extensions:["re","rei"],editor:"script",editorLanguage:"javascript"};var Rd={name:"ocaml",title:"OCaml",compiler:"rescript",extensions:["ml","mli"],editor:"script",editorLanguage:"javascript"};var e0=M+"wast-refmt/wast-refmt.js",t0="application/wasm-uint8",Id={name:"wat",title:"WAT",longTitle:"WebAssembly Text",formatter:{factory:()=>(importScripts(e0),async e=>{let t=e;try{t=self.wastRefmt.format(e)}catch(s){console.warn("failed parsing WAT",s)}return{formatted:t,cursorOffset:0}})},compiler:{url:Ou,factory:(e,t)=>(self.importScripts(t+"lang-wat-compiler.eea1bd41c9dee36246a40e3aed8394fd.js"),self.createWatCompiler()),scripts:({baseUrl:e})=>[e+"lang-wat-script.29d1634ac55c93301ce5fe2a25906bd0.js"],scriptType:t0,compiledCodeLanguage:"Binary"},extensions:["wat","wast","webassembly","wasm"],editor:"script"};var s0=Mi+"riot+compiler.min.js",r0=Mi+"riot.min.js",Hd={name:"riot",title:"Riot.js",parser:{name:"html",pluginUrls:[k.html,k.babel]},compiler:{url:s0,factory:(e,t)=>(self.importScripts(t+"lang-riot-compiler.1f8f0884684f258ddc3c50c8094e7e2a.js"),self.createRiotCompiler()),scripts:[r0],scriptType:"module"},extensions:["riot","riotjs"],editor:"script",editorLanguage:"html"};var n0="application/json",Bd={name:"sql",title:"SQL",formatter:{factory:()=>(importScripts(ku),async e=>({formatted:await self.sqlFormatter.format(e,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{url:Tu+"sql-wasm.js",factory:(e,t)=>(self.importScripts(t+"lang-sql-compiler.fa10aaaaf82d9d6a8cc8ebce5c63c3bc.js"),self.createSqlCompiler()),scripts:({baseUrl:e})=>[e+"lang-sql-script.0c35ad4ef2960bb91f816273b91f6c33.js"],scriptType:n0,compiledCodeLanguage:"json"},extensions:["sql","sqlite","sqlite3"],editor:"script"};var Ks=M+"react-native-web/react-native-web.js",Dd={name:"react-native",title:"RN",longTitle:"React Native",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...Vs,...R("typescript",t),...R(s,t)}),imports:{react:Ks,"react-native":Ks}},extensions:["react-native.jsx"],editor:"script",editorLanguage:"javascript"};var Nd={name:"react-native-tsx",title:"RN (TSX)",longTitle:"React Native (TSX)",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...Vs,...R("typescript",t),...R(s,t)}),imports:{react:Ks,"react-native":Ks}},extensions:["react-native.tsx"],editor:"script",editorLanguage:"typescript"};var $d={name:"blockly",title:"Blockly",compiler:{factory:()=>async(e,{options:t})=>t?.blockly?.js||""},extensions:["blockly.xml","xml"],editor:"script",editorLanguage:"xml"};var Fd={name:"twig",title:"Twig",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Uu,factory:(e,t)=>(self.importScripts(t+"lang-twig-compiler.39e618d8e11e20b2f85ea15294864c17.js"),self.createTwigCompiler())},extensions:["twig"],editor:"markup",editorLanguage:"html"};var i0=xp+"compiler.min.js",zd={name:"astro",title:"Astro",parser:{name:"html",pluginUrls:[k.html,k.babel]},compiler:{url:i0,factory:(e,t)=>(self.importScripts(t+"lang-astro-compiler.8407bb9d7fa8feeae708ab9b6cd12739.js"),self.createAstroCompiler())},extensions:["astro"],editor:"markup"};var Wd={name:"malina",title:"Malina.js",parser:{name:"html",pluginUrls:[k.html,k.babel]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-malina-compiler.a0adf0552670bef0d7989fd7b78dfbb3.js"),self.createMalinaCompiler()),imports:{"malinajs/runtime.js":`https://jspm.dev/malinajs@${Ci}/runtime.js`}},extensions:["xht"],editor:"script",editorLanguage:"html"};var o0=M+"jscpp/JSCPP.es5.min.js",Gd={name:"cpp",title:"C++",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[o0,e+"lang-cpp-script.1baeb187434ba3ed6b23b718933338ad.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp"},extensions:["cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script"};var Jd={name:"julia",title:"Julia",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-julia-script.fe987901a797bc777c685f0daf4357d5.js"],liveReload:!0,scriptType:"text/julia",compiledCodeLanguage:"julia"},extensions:["jl"],editor:"script",largeDownload:!0};var Vd={name:"clang",title:"Clang",longTitle:"C/C++ (Clang)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-cpp-clang-script.4816be0f52e578d04c317645169dc4cb.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp",liveReload:!0},extensions:["clang.cpp","clang","cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script",editorLanguage:"cpp",largeDownload:!0};var Kd={name:"tcl",title:"Tcl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[xu,e+"lang-tcl-script.3f6a624f992c65a3fd69f999e53fcbd7.js"],scriptType:"text/tcl",compiledCodeLanguage:"tcl"},extensions:["tcl"],editor:"script"};var Xd={name:"prolog",title:"Prolog",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[ze+"core.js",ze+"charsio.js",ze+"dom.js",ze+"format.js",ze+"js.js",ze+"lists.js",ze+"os.js",ze+"promises.js",ze+"random.js",ze+"statistics.js",e+"lang-prolog-script.2780539e5f2bc8edb4aedd5cf57143e7.js"],scriptType:"text/prolog",compiledCodeLanguage:"prolog"},extensions:["prolog.pl","prolog"],editor:"script"};var Yd={name:"clio",title:"Clio",compiler:{url:Ei+"compile.js",factory:(e,t)=>(self.importScripts(t+"lang-clio-compiler.75c879c608b8073530c584f64896740a.js"),self.createClioCompiler()),scripts:[Ei+"exec.js"]},extensions:["clio"],editor:"script",editorLanguage:"coffeescript"};var Qd={name:"richtext",title:"Rich Text",longTitle:"Rich Text Editor",compiler:{factory:()=>async(e,{config:t})=>t.markup.content||"",styles:["quill.8e9d74c74d2c8aaa5d849678c215cf7e.css"]},extensions:["rte","rte.html","rich"],editor:"markup",editorLanguage:"html"};var a0=async(e,{baseUrl:t,config:s})=>{let{diagramsCompiler:r}=await import(t+"lang-diagrams-compiler-esm.468dd2b25c78af5f2902eb20a4571be5.js");return r(e,{config:s})},Zd={name:"diagrams",title:"Diagrams",parser:{name:"html",pluginUrls:[k.html]},compiler:{factory:()=>async e=>e||"",runOutsideWorker:a0},extensions:["diagrams","diagram","graph","plt"],editor:"markup",editorLanguage:"html"};var em={name:"imba",title:"Imba",compiler:{url:Ti+"compiler.js",factory:(e,t)=>(self.importScripts(t+"lang-imba-compiler.4f3b1e55a23cb0384355b5dca2ab42bf.js"),self.createImbaCompiler()),imports:{imba:Ti+"imba.mjs"}},extensions:["imba"],editor:"script"};var tm={name:"mustache",title:"Mustache",parser:{name:"glimmer",pluginUrls:[k.glimmer]},compiler:{url:_u,factory:(e,t)=>(self.importScripts(t+"lang-mustache-compiler.93b843bf816add490577db24db6270c6.js"),self.createMustacheCompiler())},extensions:["mustache"],editor:"markup",editorLanguage:"html"};var sm={name:"art-template",title:"art",longTitle:"art-template",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:vp,factory:(e,t)=>(self.importScripts(t+"lang-art-template-compiler.4716dcf439c98cecc6d924d76392deb3.js"),self.createArtTemplateCompiler())},extensions:["art","art-template"],editor:"markup",editorLanguage:"html"};var rm={name:"r",title:"R",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-r-script-esm.42cba088ad6175ae88305ac37d440eae.js"],inlineScript:`
    livecodes.r = livecodes.r || {config: {}};
    addEventListener('load', async () => {
      await livecodes.r.loaded;
      if (livecodes.r.config?.autoEvaluate !== false) {
        await livecodes.r.run();
      }
      // reset config before next load
      livecodes.r.config = {};
    });
    `,liveReload:!0,scriptType:"text/r",compiledCodeLanguage:"r"},extensions:["r","rlang","rstats"],editor:"script",largeDownload:!0};var l0=M+"civet/civet.js",nm={name:"civet",title:"Civet",compiler:{url:l0,factory:()=>async e=>window.civet.compile(e,{js:!0})},extensions:["civet"],editor:"script",editorLanguage:"coffeescript"};var im={name:"fennel",title:"Fennel",formatter:{factory:zt},compiler:{url:Lt,factory:(e,t)=>(self.importScripts(t+"lang-fennel-compiler.1f24a9823f590b00c793a67b29f61e83.js"),self.createFennelCompiler()),scripts:[Lt],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["fnl"],editor:"script",editorLanguage:"scheme"};var om={name:"teal",title:"Teal",formatter:qi,compiler:{url:Lt,factory:(e,t)=>(self.importScripts(t+"lang-teal-compiler.1a0bb35b51557f740f6379336bc5a8e1.js"),self.createTealCompiler()),scripts:[Lt],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["tl"],editor:"script",editorLanguage:"lua"};var am={name:"stylis",title:"Stylis",compiler:{url:ju,factory:()=>async e=>{let{compile:t,serialize:s,stringify:r,middleware:n,prefixer:i}=window.stylis;return s(t(e),n([i,r]))}},extensions:["stylis"],editor:"style",editorLanguage:"scss"};var lm={name:"flow",title:"Flow",parser:{name:"babel-flow",pluginUrls:[k.babel,k.html]},compiler:{url:M+"flow-remove-types/flow-remove-types.js",factory:()=>async(e,{config:t})=>window.flowRemoveTypes.transpile(e,{all:!0,...R("flow",t)}).toString()},extensions:["flow"],editor:"script",editorLanguage:"typescript"};var cm={name:"mjml",title:"MJML",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:gu,factory:()=>async(e,{config:t})=>{if(!e.trim())return"";let{html:s,errors:r}=self.mjml(e,R("mjml",t));return r?.forEach(n=>{console.warn(n.formattedMessage)}),s}},extensions:["mjml"],editor:"markup",editorLanguage:"xml"};var pm={name:"sucrase",title:"Sucrase",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{url:M+"sucrase/sucrase.js",factory:()=>async(e,{config:t})=>window.sucrase.transform(e,{transforms:["jsx","typescript"],...R("sucrase",t)}).code},extensions:["sucrase"],editor:"script",editorLanguage:"typescript"};var um={name:"eta",title:"Eta",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Mp,factory:(e,t)=>(self.importScripts(t+"lang-eta-compiler.ad84b8336e66949b7ecb9ad4f792e059.js"),self.createEtaCompiler())},extensions:["eta"],editor:"markup",editorLanguage:"html"};var en=(e,t,s)=>e.filter(r=>Oe.includes(r)||qe(r.name,t)).reduce((r,n)=>{if(n.compiler&&!r[n.name])if(typeof n.compiler=="string"){let i=e.find(o=>o.name===n.compiler)?.compiler;r[n.name]={...i,url:dm(i.url,s),aliasTo:n.compiler}}else r[n.name]={...n.compiler,url:dm(n.compiler.url,s)};return r},{}),dm=(e,t)=>e?ds(e)?t+e:e:"";var Wt=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.io")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost")));var mm=()=>{let e=[];return{addEventListener:(n,i,o,a)=>{n&&(n.addEventListener(i,o,a||!1),e.push({element:n,eventType:i,fn:o}))},removeEventListener:(n,i,o)=>{if(!n)return;n.removeEventListener(i,o);let a=e.find(l=>l.element===n&&l.eventType===i&&l.fn===o);a&&e.splice(e.indexOf(a))},removeEventListeners:()=>{e.forEach(n=>{n.element.removeEventListener(n.eventType,n.fn),e.splice(e.indexOf(n))})}}};var Ge={getConfig:"livecodes-get-config",config:"livecodes-config",load:"livecodes-load",appLoaded:"livecodes-app-loaded",ready:"livecodes-ready",change:"livecodes-change",testResults:"livecodes-test-results",destroy:"livecodes-destroy",resizeEditor:"livecodes-resize-editor",apiResponse:"livecodes-api-response"};var tn=()=>{let e=[];return{subscribe:i=>(e.push(i),{unsubscribe:()=>{e.splice(e.indexOf(i),1)}}),notify:i=>{e.forEach(o=>{o(i)})},hasSubscribers:()=>e.length>0,unsubscribeAll:()=>{e.length=0}}};var Ii={getList:async()=>[],getAllData:async()=>[],getItem:async()=>null,addItem:async()=>"",updateItem:async()=>"",deleteItem:async()=>{},bulkInsert:async()=>{},restore:async()=>{},clear:async()=>{},subscribe:()=>({unsubscribe:()=>{}}),unsubscribeAll:()=>{}},fm={getValue:()=>null,setValue:()=>{},clear:()=>{},subscribe:()=>({unsubscribe:()=>{}}),unsubscribeAll:()=>{}};var sn,hm="livecodes",Hi={},Bi=()=>(Date.now()+""+Math.floor(Math.floor(Math.random()*Date.now()))).substring(0,24),c0=async e=>{sn||(sn=await Xr(du,"localforage"),sn.config({name:hm})),Hi[e]||(Hi[e]=sn.createInstance({name:hm,storeName:e}))},ht=async(e,t)=>{if(t)return Ii;let s,r=tn(),n=v=>r.subscribe(v),i=()=>{r.unsubscribeAll()},o=()=>{r.hasSubscribers()&&c().then(v=>{r.notify(v)})},a=async()=>{await c0(e),s=Hi[e]},l=async()=>(await a(),s.keys()),c=async()=>{await a();let v=[];return await s.iterate(S=>{v.push(S)}),v.sort((S,w)=>w.lastModified&&S.lastModified?w.lastModified-S.lastModified:0)},p=async v=>(await a(),s.getItem(v)),m=async(v,S,w=!0)=>(await a(),await s.setItem(v,S),w&&o(),v),y=async(v,S=!0)=>{let w=Bi();return await m(w,v,S),w};return{getList:l,getAllData:c,getItem:p,addItem:v=>y(v),updateItem:(v,S)=>m(v,S),deleteItem:async v=>{await a(),await s.removeItem(v),o()},bulkInsert:async v=>{for(let S of v)await y(S,!1);o()},restore:async v=>{for(let S of v)S.id?await m(S.id,S,!1):await y(S,!1);o()},clear:async()=>{await a(),await s.clear(),o()},subscribe:n,unsubscribeAll:i}};var Di=async(e,t)=>{let s=await ht(e,t),r=async()=>(await s.getAllData()).map(a=>({id:a.id,title:a.config?.title||"",description:a.config?.description||"",tags:a.config?.tags||[],languages:a.config?[a.config.markup.language,a.config.style.language,a.config.script.language]:[],lastModified:a.lastModified})).sort((a,l)=>l.lastModified-a.lastModified),n=(a,l)=>{let c={id:a,config:l,lastModified:Date.now()};return s.updateItem(a,c)},i=async a=>{let l=Bi();return n(l,a)};return{...s,getList:r,addItem:i,updateItem:n,bulkInsert:async a=>{for(let l of a)await i(l)}}};var rn=(e,t)=>{if(t)return fm;let s=tn(),r=c=>s.subscribe(c),n=()=>{s.unsubscribeAll()},i=()=>{s.notify(a())},o=c=>{window.localStorage.setItem(e,JSON.stringify(c)),i()},a=()=>{let c=window.localStorage.getItem(e);if(!c)return null;try{return JSON.parse(c)}catch{return null}};return{getValue:a,setValue:o,clear:()=>{o(null),i()},subscribe:r,unsubscribeAll:n}};var gm=()=>St({projects:null,templates:null,assets:null,snippets:null,recover:null,userConfig:null,userData:null,appData:null,sync:null}),_m=async(e,t)=>{t||(e.projects=await Di("__livecodes_data__",t),e.templates=await Di("__livecodes_templates__",t),e.assets=await ht("__livecodes_assets__",t),e.snippets=await ht("__livecodes_snippets__",t),e.recover=rn("__livecodes_project_recover__",t),e.userConfig=rn("__livecodes_user_config__",t),e.userData=await ht("__livecodes_user_data__",t),e.appData=rn("__livecodes_app_data__",t),e.sync=await ht("__livecodes_sync_data__",t))};var _s=pp(vm()),on=_s.compressToEncodedURIComponent,bm=(e,t=!0)=>{let s=(0,_s.decompressFromEncodedURIComponent)(e);if(s){if(!t)return s;try{if(JSON.parse(s))return s}catch{}}return(0,_s.decompressFromBase64)(e)};var an,wm=async()=>{an=an||await ht("__livecodes_key__",!1)},p0=e=>new TextEncoder().encode(e),u0=e=>new TextDecoder().decode(e),d0=async e=>{await wm(),await an.updateItem("__livecodes_key_id__",on(e))},m0=async()=>{await wm();let e=await an.getItem("__livecodes_key_id__");return e?bm(e):null},f0=async()=>{let e=await window.crypto.subtle.generateKey({name:"RSA-OAEP",modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},!0,["encrypt","decrypt"]),t=await crypto.subtle.exportKey("jwk",e.publicKey),s=await crypto.subtle.exportKey("jwk",e.privateKey),r=JSON.stringify({public:t,private:s});return await d0(r),r},xm=async e=>crypto.subtle.importKey("jwk",JSON.parse(await m0()||await f0())[e],{name:"RSA-OAEP",hash:"SHA-256"},!0,e==="public"?["encrypt"]:["decrypt"]),Sm=async e=>{let t=p0(e),s=await xm("public"),r=await window.crypto.subtle.encrypt({name:"RSA-OAEP"},s,t);return JSON.stringify(Array.from(new Uint8Array(r)))},Lm=async e=>{try{let t=await window.crypto.subtle.decrypt({name:"RSA-OAEP"},await xm("private"),new Uint8Array(JSON.parse(e)));return u0(t)}catch{return null}};var h0={load:async()=>{},getUser:async()=>{},signIn:async()=>{},signOut:async()=>{},isLoggedIn:()=>!1},km=e=>{if(e)return h0;let t,s,r,n,i,o,a,l,c,p;return{async load(){let m=await fp("./firebase.4625f0fe5950885c0804c63b33a7aad7.js");t=m.initializeApp,s=m.getApp,r=m.getAuth,n=m.signInWithPopup,i=m.signOut,o=m.GithubAuthProvider,a=m.firebaseConfig;try{l=s()}catch{l=t(a)}c=r(l),p=c.currentUser},async getUser(){return c||await this.load(),p?await $i(p.uid)?Promise.resolve(await Ni(p)):void 0:new Promise(m=>{let y=c.onAuthStateChanged(async b=>{b?(p=b,y(),m(await Ni(p))):m(void 0)})})},async signIn(m=["gist","repo"]){c||await this.load();let y=new o;m.forEach(u=>y.addScope(u));let b=await n(c,y),f=o.credentialFromResult(b)?.accessToken;if(f)return p=b.user,await g0(p.uid,f),await Tm(p),Ni(b.user)},async signOut(){c||await this.load(),await i(c),_0(p?.uid),p=null},isLoggedIn(){return p!=null}}},g0=async(e,t)=>{localStorage.setItem("token_"+e,await Sm(t))},$i=async e=>{if(!e)return null;let t=localStorage.getItem("token_"+e);return t?Lm(t):null},Em=(e,t)=>{localStorage.setItem("username_"+e,t)},_0=e=>{e&&(localStorage.removeItem("token_"+e),localStorage.removeItem("username_"+e))},Ni=async e=>({uid:e.uid,displayName:e.displayName,username:await Tm(e),email:e.email,photoURL:e.photoURL,token:await $i(e.uid)}),Tm=async e=>{let t=e.uid,s=localStorage.getItem("username_"+t);if(s)return s;let r=e.reloadUserInfo?.screenName;if(r)return Em(t,r),r;let o=(await(await fetch("https://api.github.com/user",{headers:{Accept:"application/vnd.github.v3+json",Authorization:"token "+await $i(t)}})).json()).login;return Em(t,o),o};var y0="https://livecodes-sandbox.pages.dev";var Fi=y0,Cm="v6",ys={getResultUrl:()=>`${Fi}/${Cm}/result`,getCompilerUrl:()=>`${Fi}/${Cm}/compiler`,getOrigin:()=>new URL(Fi).origin};var jm="https://dpaste.com/",v0="https://dpaste.com/api/v2/",Mm="https://api2.livecodes.io/share",Um={getProject:async e=>{try{let t=await fetch(jm+e+".txt");return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{try{let t=await fetch(v0,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return t.ok?(await t.text()).replace(jm,""):""}catch{return""}}},b0={getProject:async e=>{if(e.length<11)return Um.getProject(e);if(!Wt())return{};try{let t=await fetch(Mm+"?id="+e);return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{if(!Wt())return"";try{let t=await fetch(Mm,{method:"POST",mode:"cors",body:JSON.stringify(e)});return t.ok?t.text():""}catch{return""}}},Am=Wt()?b0:Um;var Pm={getTypeUrls:async e=>{let t={};if(e.length>0&&Wt())try{t=await(await fetch("https://api.livecodes.io/types",{method:"POST",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({types:e})})).json()}catch{}return t}};var Om=e=>new Promise(t=>{let s="compiler-frame";document.getElementById(s)?.remove();let n=document.createElement("iframe");n.name="compiler",n.id=s,n.style.width="0",n.style.height="0",n.style.visibility="hidden",n.style.position="absolute",n.setAttribute("sandbox","allow-same-origin allow-scripts"),n.src=e,document.body.appendChild(n),n.onload=()=>{t(n.contentWindow)}});var w0=/(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g,x0=/(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g,Et=e=>[...zs(e).matchAll(new RegExp(w0)),...zs(e).matchAll(new RegExp(x0))].map(t=>t[2].replace(/"/g,"").replace(/'/g,"")),S0=e=>!e.startsWith("https://deno.bundlejs.com/")&&!e.startsWith("https://edge.bundlejs.com/")&&!e.endsWith("#nobundle")&&(e.startsWith("https://deno.land/")||e.startsWith("https://github.com/")||e.startsWith("https://raw.githubusercontent.com/")||e.startsWith("https://gitlab.com/")||e.startsWith("https://bitbucket.org")||e.endsWith(".ts")||e.endsWith(".jsx")||e.endsWith(".tsx")),L0=e=>!e.startsWith("https://")&&!e.startsWith("http://")&&!e.startsWith(".")&&!e.startsWith("/")&&!e.startsWith("data:")&&!e.startsWith("blob:"),ln=(e,t)=>Et(e).map(s=>{if(!S0(s)&&!L0(s))return{};{let r=Object.keys(t.imports).find(n=>n===s||s.startsWith(n+"/"));return r?{[r]:t.imports[r]}:{[s]:Pe.getModuleUrl(s,{defaultCDN:t?.customSettings?.defaultCDN})}}}).reduce((s,r)=>({...s,...r}),{}),Xs=e=>Et(e).length>0,E0=e=>new RegExp(/(^export\s)|([\s|;]export\s)/).test(wi(e)),k0=e=>new RegExp(/(^await\s)|([\s|;]await\s)/).test(wi(e)),qm=e=>Xs(e)||E0(e)||k0(e);var T0=/(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g,Rm=e=>new RegExp(T0).test(e);var Im=e=>{let t=zs(e);if(!/\b(require|module|exports)\b/.test(t))return e;let s=/(?:^|\s)require(?:\s*)\((?:\s*)('(.*?)'|"(.*?)")(?:\s*)\)/g,n=(l=>[...l.matchAll(new RegExp(s))].map(c=>c[1].replace(/"/g,"").replace(/'/g,"")))(t);if(n.length===0)return e;let i=n.map((l,c)=>[`import * as __requires_${c} from '${l}';`,`const __requires_${c}_default = __requires_${c}.default;`].join(`
`)).join(`
`),o=`const __requires_lookup = { ${n.map((l,c)=>`'${l}': __requires_${c}_default || __requires_${c}`).join(", ")} };`;return[i,o,"window.require = window.require || ((id) => {\n	if (id in __requires_lookup) return __requires_lookup[id];\n	throw new Error(`Cannot require modules dynamically (${id})`);\n});","const exports = {}; const module = { exports };",e,"export default module.exports;"].join(`

`)},zi=(e,t,s={},r="css")=>{let n=Et(e),i=r==="css"?[r]:["css",r];return[...i.map(a=>"./style."+a),...i.map(a=>"./styles."+a),...i.map(a=>"./style.module."+a),...i.map(a=>"./styles.module."+a)].map(a=>{if(!n.includes(a))return{};if(!a.includes(".module."))return{[a]:"data:text/javascript;base64,"+btoa(`export default \`${Bt(t)}\`;`)};let l=`export default ${Bt(JSON.stringify(s))};
`+Object.keys(s).filter(c=>c===mp(c)).map(c=>`export const ${Bt(c)} = "${Bt(s[c])}";`).join(`
`);return{[a]:"data:text/javascript;base64,"+btoa(l)}}).reduce((a,l)=>({...a,...l}),{})};var gt=e=>typeof e=="string"?{code:e,info:{}}:e;var Hm=async({config:e,baseUrl:t,eventsManager:s})=>{let r,n,i=ys.getOrigin(),o=3,a=async()=>new Promise(async f=>{r=en([...Le,...Oe],e,t);let u=ys.getCompilerUrl();n=await Om(u+"?appCDN="+Nt()),s.addEventListener(window,"message",async v=>{v.origin===i&&v.data.type==="init-success"&&f("done")});let d={type:"init",payload:e,baseUrl:t,scriptUrl:t+"compiler-utils.d69d232f65ff2eafd6b24b03569ab205.js"};n.postMessage(d,i)}),l=f=>(u,{config:d,options:v})=>new Promise((S,w)=>{let g=A=>{let L=A.data;A.origin===i&&L.from==="compiler"&&(L.type==="compiled"||L.type==="compile-failed")&&L.payload.language===f&&L.payload.content===u&&(window.removeEventListener("message",g),L.type==="compiled"?S(L.payload.compiled):L.type==="compile-failed"&&w(f+` compile failed.
`+L.payload.error))};window.addEventListener("message",g);let _={type:"compile",payload:{content:u,language:f,config:d,options:v}};n.postMessage(_,i)}),c=(f,u)=>Promise.allSettled(f.map(d=>new Promise(async(v,S)=>{["jsx","tsx"].includes(d)&&(d="typescript");let w=r[d];if(w&&!w.fn){s.addEventListener(window,"message",async _=>{_.origin===i&&_.data.from==="compiler"&&_.data.type==="loaded"&&_.data.payload===d?(w.fn=l(d),v("done")):_.origin===i&&_.data.from==="compiler"&&_.data.type==="load-failed"&&_.data.payload===d&&(o===0?S(`Failed to load compiler for: ${d}.`):(o-=1,await a(),await c(Array.from(new Set([...f,u.markup.language,u.style.language,u.script.language])),u),v("done")))});let g={type:"load",payload:{language:d,config:u}};n.postMessage(g,i)}else v("done")}))),p={},m=async(f,u,d,v)=>{["jsx","tsx"].includes(u)&&(u="typescript");let S=Vu(u,d),w=Kr(Oi(u,d));if(!v?.forceCompile&&p[u]?.content===f&&p[u]?.processors===S&&p[u]?.languageSettings===w&&p[u]?.compiled)return{code:p[u]?.compiled||"",info:JSON.parse(p[u]?.info||"{}")};r[u]&&!r[u].fn&&await c([u],d);let g=r[u]?.fn;if(typeof g!="function")return new Promise(H=>{u!=="html"&&u!=="css"&&u!=="javascript"&&console.error("Failed to load compiler for: "+u),H({code:"",info:{}})});let _=gt(await g(f,{config:d,language:u,baseUrl:t,options:v}))||"",A=gt(await y(_.code,{config:d,language:u,baseUrl:t,options:v}))||"",L={..._.info,...A.info};return p[u]={content:f,compiled:A.code,info:JSON.stringify(L),processors:S,languageSettings:Kr(Oi(u,d))},{code:A.code,info:L}},y=async(f,{config:u,language:d,baseUrl:v,options:S})=>{let w=f,g={},_=!1,A=te(d)||"markup";A==="style"&&Rm(w)&&(_=!0);for(let L of Oe)if(Ft(L.name,u)&&Pi(L.name,u)&&L.editor===A||A==="style"&&L.name==="postcss")if(L.isPostcssPlugin)_=!0;else{if(L.name==="postcss"&&!_)continue;r[L.name]&&!r[L.name].fn&&await c([L.name],u);let H=r[L.name].fn||(async Ue=>Ue);if(typeof H!="function")return console.error("Failed to load processor: "+L.name),{code:w,info:g};let $=await H(w,{config:u,language:d,baseUrl:v,options:S}),Ce=gt($);w=Ce.code,g={...g,...Ce.info}}return{code:w,info:g}},b=()=>{Object.keys(p).forEach(f=>delete p[f])};return await a(),{load:c,compile:m,clearCache:b}};var Bm=e=>{let t=e.config.mode;return t==="codeblock"||t==="editor"?C0():Hm(e)};async function C0(){return{load:(e,t)=>Promise.resolve(["do nothing"]),compile:(e,t,s)=>Promise.resolve(gt(e)),clearCache:()=>{}}}var Dm={name:"clojurescript",title:"CLJS (cherry)",longTitle:"ClojureScript (cherry)",formatter:{factory:zt},compiler:{url:Yr+"lib/cherry.umd.js",factory:()=>async(e,{config:t,options:s})=>{let r=self.CherryCljs.compileString(e);return e.includes("#jsx")?Js(r,"jsx",t,s):r},imports:{"cherry-cljs":Yr+"index.js","cherry-cljs/cljs.core.js":Yr+"cljs.core.js"}},extensions:["cljs","clj","cljc","edn","clojure"],editor:"script",editorLanguage:"clojure"};var Le=[Zu,nd,id,zd,od,Ku,Qu,tm,Md,jd,um,Ad,Cd,Ud,Fd,sm,cm,Zd,Qd,Yu,ad,ld,rd,pd,am,ed,ud,lm,Xu,pm,td,sd,Dd,Nd,dd,md,cd,fd,Ed,kd,Hd,Wd,hd,gd,nm,Yd,em,Od,qd,Rd,yd,Td,rm,vd,Pd,bd,Gd,Vd,wd,xd,om,im,Jd,Ld,Sd,Dm,Kd,_d,Id,Bd,Xd,$d];var Nm=(e,t,s,r,n,i)=>{let o=["markup","style","script"],a=document.createElement("ul");document.querySelector("#select-editor")?.appendChild(a);let l=o.length;o.forEach(c=>{let p=document.createElement("li");p.id=c+"-selector",p.classList.add("editor-title","noselect"),p.dataset.editor=c,p.tabIndex=1,p.innerHTML=`
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
    `,a.appendChild(p);let m=document.createElement("div");m.classList.add("menu-scroller"),m.classList.add("menu-scroller-"+c),p.appendChild(m);let y=document.createElement("ul");y.classList.add("dropdown-menu"),y.classList.add("dropdown-menu-"+c),m.appendChild(y);let b=[...Le].filter(d=>d.editor===c).filter(d=>qe(d.name,e));if(b.length===0)p.classList.add("hidden"),l-=1;else if(b.length===1){let d=p.querySelector(".language-menu-button");d&&(d.style.display="none")}let u=Oe.filter(d=>d.editor===c&&Ft(d.name,e)).length>0?{name:c+"-processors",title:"Processors:",longTitle:"Processors:",editor:c}:void 0;u&&b.push(u),b.forEach(d=>{let v=document.createElement("li");v.classList.add("language-item"),y.appendChild(v);let S=document.createElement("a");if(S.href="#",S.dataset.editor=c,S.dataset.lang=d.name,S.title=d.longTitle||d.title,S.innerHTML=d.longTitle||d.title,"extensions"in d||S.classList.add("subtitle"),d.name==="style-processors"&&v.classList.add("column-break"),v.appendChild(S),d.info!==!1){let w=document.createElement("span");w.classList.add("tooltip","hint--bottom-left"),w.dataset.hint="Click for info...",w.innerHTML=M0,s.addEventListener(w,"mousedown",async()=>{let g=document.createElement("div");g.classList.add("language-info"),g.innerHTML=await j0(d.name,t),r(g);let _=g.querySelector("a[data-template]"),A=_?.dataset.template;_&&A&&s.addEventListener(_,"click",async $=>{$.preventDefault(),n(A)},!1);let L=g.querySelector("a[data-code]"),H=L?.dataset.code;L&&H&&s.addEventListener(L,"click",async $=>{$.preventDefault(),i({url:H})},!1)},!1),v.appendChild(w)}})}),l<3&&document.querySelectorAll(".editor-title").forEach(c=>{c.classList.add("half-width")})},$m=e=>{let t=document.createElement("li");return t.classList.add("language-item","processor-item"),t.innerHTML=`
        <label class="switch">
          <span>${e.title}</span>
          <div>
            <input id="${e.name}" type="checkbox" data-processor="${e.name}" />
            <span class="slider round"></span>
          </div>
        </label>
        `,t},j0=async(e,t)=>{let s=await import(t+"language-info.9e9ef85f4593622bc49aa47fa20b5061.js").then(o=>o.languageInfo);return new DOMParser().parseFromString(s,"text/html").querySelector(`[data-lang="${e}"]`)?.innerHTML||""},M0=`<?xml version="1.0" encoding="iso-8859-1"?>
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
</svg>`;var Fm=[{id:"normalize.css",name:"Normalize.css",url:yu},{id:"reset-css",name:"CSS reset",url:Su}];var zm=e=>{let t=e.value,s=e.language;return{getValue:()=>t,setValue:(r="")=>{t=r},getLanguage:()=>s,setLanguage:(r,n)=>{s=r,n&&(t=n)},getEditorId:()=>te(s)||"markup",focus:()=>{},getPosition:()=>({lineNumber:1,column:1}),setPosition:()=>{},onContentChanged:()=>{},addKeyBinding:()=>{},keyCodes:{CtrlEnter:"",ShiftEnter:"",Enter:"",UpArrow:"",DownArrow:"",ShiftAltF:""},changeSettings:()=>{},registerFormatter:()=>{},format:async()=>{},isReadonly:!0,setTheme:()=>{},undo:()=>{},redo:()=>{},destroy:()=>{},isFake:!0}};var Wi=[{id:"anonymous-pro",name:"Anonymous Pro",url:Up},{id:"cascadia-code",name:"Cascadia Code",url:Ap},{id:"comic-mono",name:"Code New Roman",url:Pp},{id:"comic-mono",name:"Comic Mono",url:Op},{id:"courier-prime",name:"Courier Prime",url:qp},{id:"dec-terminal-modern",name:"DEC Terminal Modern",url:Rp},{id:"dejavu-mono",name:"DejaVu Mono",url:Ip},{id:"fantasque-sans-mono",name:"TypoPRO Fantasque Sans Mono",label:"Fantasque Sans Mono",url:Hp},{id:"fira-code",name:"Fira Code",url:Bp},{id:"fixedsys",name:"Fixedsys 62",label:"Fixedsys",url:Dp},{id:"hack",name:"Hack",url:Np},{id:"hermit",name:"Hermit",url:$p},{id:"ibm-plex-mono",name:"IBM Plex Mono",url:Fp},{id:"inconsolata",name:"Inconsolata",url:zp},{id:"iosevka",name:"Iosevka",url:Wp},{id:"jetbrains-mono",name:"JetBrains Mono",url:Gp},{id:"menlo",name:"Menlo",url:Jp},{id:"monofur",name:"Monofur",url:Vp},{id:"monoid",name:"TypoPRO Monoid",label:"Monoid",url:Kp},{id:"noto-sans-mono",name:"Noto Sans Mono",url:Xp},{id:"nova-mono",name:"Nova Mono",url:Yp},{id:"opendyslexic",name:"OpenDyslexic",url:Qp},{id:"profontwindows",name:"ProFontWindows",label:"ProFont",url:Zp},{id:"roboto-mono",name:"Roboto Mono",url:eu},{id:"sf-mono",name:"SF Mono",url:tu},{id:"source-code-pro",name:"Source Code Pro",url:su},{id:"space-mono",name:"Space Mono",url:ru},{id:"sudo-var",name:"Sudo Var",url:nu},{id:"ubuntu-mono",name:"Ubuntu Mono",url:iu},{id:"victor-mono",name:"Victor Mono",url:ou}],cn=e=>{let t='Consolas, "Roboto Mono", "Ubuntu Mono", ui-monospace, monospace';if(!e)return t;let s=Wi.find(r=>[r.id,r.name,r.label].includes(e))?.name;return s?`"${s}", ${t}`:t};var U0=e=>e==="codemirror"?"codemirror.f07ed45d348e9ab10adffdb20b13c5f0.js":e==="codejar"?"codejar.82342f3f4543f632519e31bcde034d68.js":"monaco.40c520b263bbf75297f34bd9e5b7c64a.js",A0=async(e,t)=>{let{baseUrl:s}=t,r=U0(e),n=s+r,i=window[n];i||(i=await import(n),window[n]=i);let o=i.createEditor;return await o(t)},P0=e=>{let{editor:t,mode:s,editorId:r}=e;return(s==="result"&&r!=="console"&&r!=="compiled"?"fake":["codemirror","monaco","codejar"].includes(t||"")?t:s==="codeblock"?"codejar":Vr()?"codemirror":"monaco")||"monaco"},O0=e=>{let t={...e,readOnly:!0},s={...e,readOnly:!0},r={...e,lineNumbers:!1},n={...e,lineNumbers:!1,readOnly:!0},i=e.editorId;return i==="console"?r:i==="compiled"?s:i==="embed"?n:e.mode==="codeblock"?t:e},Wm=e=>{if(!e)return;let t=Wi.find(s=>[s.id,s.name,s.label].includes(e));t&&fs(t.url,"font-"+t.id)},vs=async e=>{if(!e)throw new Error;let t=O0(e),s=P0(t);if(s==="fake")return zm(t);t.fontFamily&&Wm(t.fontFamily);let r=await A0(s,t),n=r.changeSettings;return r.changeSettings=i=>(i.fontFamily&&Wm(i.fontFamily),n(i)),r};var Gm=e=>{e.data.type==="customEditorCommand"&&(e.data.payload==="fork"&&window.dispatchEvent(new KeyboardEvent("keydown",{keyCode:83,shiftKey:!0,ctrlKey:!navigator.platform.match("Mac"),metaKey:!!navigator.platform.match("Mac")})),e.data.payload==="save"&&window.dispatchEvent(new KeyboardEvent("keydown",{keyCode:83,ctrlKey:!navigator.platform.match("Mac"),metaKey:!!navigator.platform.match("Mac")})))},pn=(e,t)=>{e?t.addEventListener(window,"message",Gm):t.removeEventListener(window,"message",Gm)};var Jm=({baseUrl:e,eventsManager:t})=>{let s,r=async()=>{if(s)return;let n=document.querySelector("#script"),i=document.createElement("div");i.id="blockly",i.classList.add("custom-editor"),i.innerHTML='<span class="loading-custom-editor">Loading blockly editor...</span>',n.appendChild(i),s=await import(e+"blockly.f35daf5dcf76eed1e1dc620505f3a483.js")};return{language:"blockly",show:async(n,i)=>{!s&&n&&await r();let o=document.querySelector("#blockly");if(!n||i.editors.script.getLanguage()!=="blockly"){o&&(o.style.display="none");return}o&&(o.style.display="unset"),await s.showBlockly(i),pn(n,t)},getContent:async n=>(await r(),s.getBlocklyContent(n)),setTheme:n=>{s?.setBlocklyTheme(n)}}};var Vm=({baseUrl:e,eventsManager:t})=>{let s,r=async()=>{if(s)return;let n=document.querySelector("#markup"),i=document.createElement("div");i.id="quillEditor",i.classList.add("custom-editor"),i.innerHTML='<span class="loading-custom-editor">Loading rich text editor...</span>',n.appendChild(i),s=await import(e+"quill.2468c2596d64cb46ee06d87d3b865bf6.js")};return{language:"richtext",show:async(n,i)=>{!s&&n&&await r();let o=document.querySelector("#quillEditor");if(!n||i.editors.markup.getLanguage()!=="richtext"){o&&(o.style.display="none");return}o&&(o.style.display="unset"),await s.showQuillEditor(i),pn(n,t)},getContent:async n=>(await r(),s.getQuillEditorContent(n)),setTheme:n=>{s?.setQuillEditorTheme(n)}}};var Km=e=>({blockly:Jm(e),richtext:Vm(e)});var Xm=e=>{let t=new Worker(e+"format.worker.39bb6fcd4622534764f5b2f3be01eb6a.js?appCDN="+Nt()),s={type:"init",baseUrl:e};return t.postMessage(s),{load:async o=>new Promise((a,l)=>{let c=m=>{let y=m.data;(y.type==="loaded"||y.type==="load-failed")&&y.payload===o&&(t.removeEventListener("message",c),y.type==="loaded"?a("loaded formatter for: "+o.join(", ")):y.type==="load-failed"&&l("failed loading formatter for: "+o.join(", ")))};t.addEventListener("message",c);let p={type:"load",payload:o};t.postMessage(p)}),getFormatFn:async o=>(l,c,p={})=>new Promise((m,y)=>{let b=u=>{let d=u.data;(d.type==="formatted"||d.type==="format-failed")&&d.payload.language===o&&d.payload.value===l&&d.payload.cursorOffset===c&&(t.removeEventListener("message",b),d.type==="formatted"?m({formatted:d.payload.formatted,cursorOffset:d.payload.formattedCursorOffset}):d.type==="format-failed"&&y({language:o,formatted:l,cursorOffset:c}))};t.addEventListener("message",b);let f={type:"format",payload:{language:o,value:l,cursorOffset:c,formatterConfig:p}};t.postMessage(f)}),destroy:()=>{t.terminate()}}};var Ym=(e,t,s)=>{let{readonly:r,mode:n}=e;return r||n==="codeblock"||n==="result"||s?q0():Xm(t)};function q0(){return{load:e=>Promise.resolve("do nothing"),getFormatFn:e=>Promise.resolve((t,s)=>Promise.resolve({formatted:t,cursorOffset:s})),destroy:()=>{}}}function R0(e,t,s){if(s)return t?t(e()):e();try{var r=Promise.resolve(e());return t?r.then(t):r}catch(n){return Promise.reject(n)}}function I0(e){var t=e();if(t&&t.then)return t.then(H0)}function H0(){}function B0(e,t,s){return s?t?t(e):e:((!e||!e.then)&&(e=Promise.resolve(e)),t?e.then(t):e)}var un={left:[],center:[],right:[]},Gi={left:!0,center:!0,right:!0},D0={light:{backgroundColor:"#fff",textColor:"#000",actionColor:"#008000"},dark:{}},nt=function(t,s){var r=this;s===void 0&&(s={});var n=s.timeout;n===void 0&&(n=0);var i=s.actions;i===void 0&&(i=[{text:"dismiss",callback:function(){return r.destroy()}}]);var o=s.position;o===void 0&&(o="center");var a=s.theme;a===void 0&&(a="dark");var l=s.maxStack;l===void 0&&(l=3),this.message=t,this.options={timeout:n,actions:i,position:o,maxStack:l,theme:typeof a=="string"?D0[a]:a},this.wrapper=this.getWrapper(this.options.position),this.insert(),un[this.options.position].push(this),this.stack()},Qm={theme:{configurable:!0}};Qm.theme.get=function(){return this.options.theme};nt.prototype.getWrapper=function(t){var s=document.querySelector(".snackbars-"+t);return s||(s=document.createElement("div"),s.className="snackbars snackbars-"+t,document.body.appendChild(s)),s};nt.prototype.insert=function(){var t=this,s=document.createElement("div");s.className="snackbar",s.setAttribute("aria-live","assertive"),s.setAttribute("aria-atomic","true"),s.setAttribute("aria-hidden","false");var r=this.theme,n=r.backgroundColor,i=r.textColor,o=r.boxShadow,a=r.actionColor,l=document.createElement("div");l.className="snackbar--container",n&&(l.style.backgroundColor=n),i&&(l.style.color=i),o&&(l.style.boxShadow=o),s.appendChild(l);var c=document.createElement("div");if(c.className="snackbar--text",typeof this.message=="string"?c.textContent=this.message:c.appendChild(this.message),l.appendChild(c),this.options.actions)for(var p=function(){var b=y[m],f=b.style,u=b.text,d=b.callback,v=document.createElement("button");v.className="snackbar--button",v.innerHTML=u,a&&(v.style.color=a),f&&Object.keys(f).forEach(function(S){v.style[S]=f[S]}),v.addEventListener("click",function(){t.stopTimer(),d?d(v,t):t.destroy()}),l.appendChild(v)},m=0,y=t.options.actions;m<y.length;m+=1)p();this.startTimer(),s.addEventListener("mouseenter",function(){t.expand()}),s.addEventListener("mouseleave",function(){t.stack()}),this.el=s,this.wrapper.appendChild(s)};nt.prototype.stack=function(){var t=this;Gi[this.options.position]=!0;var s=un[this.options.position],r=s.length-1;s.forEach(function(n,i){n.startTimer();var o=n.el;if(o){o.style.transform="translate3d(0, -"+(r-i)*15+"px, -"+(r-i)+"px) scale("+(1-.05*(r-i))+")";var a=r-i>=t.options.maxStack;t.toggleVisibility(o,a)}})};nt.prototype.expand=function(){var t=this;Gi[this.options.position]=!1;var s=un[this.options.position],r=s.length-1;s.forEach(function(n,i){n.stopTimer();var o=n.el;if(o){o.style.transform="translate3d(0, -"+(r-i)*o.clientHeight+"px, 0) scale(1)";var a=r-i>=t.options.maxStack;t.toggleVisibility(o,a)}})};nt.prototype.toggleVisibility=function(t,s){s?(this.visibilityTimeoutId=window.setTimeout(function(){t.style.visibility="hidden"},300),t.style.opacity="0"):(this.visibilityTimeoutId&&(clearTimeout(this.visibilityTimeoutId),this.visibilityTimeoutId=void 0),t.style.opacity="1",t.style.visibility="visible")};nt.prototype.destroy=function(){var t=this;return R0(function(){var s=t.el,r=t.wrapper;return I0(function(){if(s)return s.setAttribute("aria-hidden","true"),B0(new Promise(function(n){var i=N0(s);i?s.addEventListener(i,function(){return n()}):n()}),function(){r.removeChild(s);for(var n=un[t.options.position],i=void 0,o=0;o<n.length;o++)if(n[o].el===s){i=o;break}i!==void 0&&n.splice(i,1),Gi[t.options.position]?t.stack():t.expand()})})})};nt.prototype.startTimer=function(){var t=this;this.options.timeout&&!this.timeoutId&&(this.timeoutId=self.setTimeout(function(){return t.destroy()},this.options.timeout))};nt.prototype.stopTimer=function(){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)};Object.defineProperties(nt.prototype,Qm);function N0(e){for(var t={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"Animationend",WebkitAnimation:"webkitAnimationEnd"},s=0,r=Object.keys(t);s<r.length;s+=1){var n=r[s];if(e.style[n]!==void 0)return t[n]}}function bs(e,t){return new nt(e,t)}var Zm={minWidth:"2em",padding:"3px"};var ef={textColor:"#343A40",actionColor:"#343A40",backgroundColor:"#fff"},tf={textColor:"#055160",actionColor:"#055160",backgroundColor:"#CFF4FC"},sf={textColor:"#0F5132",actionColor:"#0F5132",backgroundColor:"#D1E7DD"},rf={textColor:"#664D16",actionColor:"#664D16",backgroundColor:"#FFF3CD"},nf={textColor:"#842040",actionColor:"#842040",backgroundColor:"#F8D7DA"},ws={text:'<span title="Dismiss">\u2716</span>',style:Zm,callback(e,t){t.destroy()}},of={text:'<span title="Confirm">\u2713</span>',style:Zm,callback(e,t){t.destroy()}};var af=()=>({info:(o,a=!0)=>bs(o,{theme:tf,actions:a?[ws]:[],timeout:2e3}),success:(o,a=!0)=>bs("\u2713 "+o,{theme:sf,actions:a?[ws]:[],timeout:2e3}),warning:(o,a=!0)=>bs(o,{theme:rf,actions:a?[ws]:[],timeout:2e3}),error:(o,a=!0)=>bs("\u2716 "+o,{theme:nf,actions:a?[ws]:[],timeout:2e3}),confirm:(o,a,l)=>{let c={...of,callback(m,y){a(),y.destroy()}},p={...ws,callback(m,y){l?.(),y.destroy()}};return bs(o,{theme:ef,actions:[c,p]})}});var lf=()=>{let e=document.querySelector("#overlay"),t=document.querySelector("#modal-container"),s=document.querySelector("#modal"),r,n=()=>{},i=(c,{size:p="large",closeButton:m=!1,isAsync:y=!1,onClose:b=()=>{},scrollToSelector:f=""}={})=>{if(s.innerHTML="",s.className=p,s.appendChild(c),n=b,f&&setTimeout(()=>{let d=c.querySelector(f);c.style.scrollBehavior="smooth",d&&d.scrollIntoView()},500),m){let d=document.createElement("div");d.className="close-container";let v=document.createElement("button");v.classList.add("button"),v.innerHTML="Close",v.onclick=o,d.appendChild(v),s.appendChild(d)}let u=document.createElement("div");u.classList.add("close-button"),u.title="Esc",u.onclick=o,s.appendChild(u),e.style.display="flex",t.style.display="flex",s.style.display="flex",e.classList.remove("hidden"),t.classList.remove("hidden"),r=!0,document.removeEventListener("click",a),document.removeEventListener("keydown",l),document.addEventListener("click",a,!1),document.addEventListener("keydown",l,!1),y&&c.click()},o=()=>{typeof n=="function"&&n(),document.removeEventListener("click",a),document.removeEventListener("keydown",l),s.innerHTML="",s.className="",e.classList.add("hidden"),t.classList.add("hidden"),s.style.display="none",setTimeout(()=>{e.style.display="none",t.style.display="none",r=!1},400)};function a(c){let p=document.querySelector(".snackbar");!s?.contains(c.target)&&!p?.contains(c.target)&&!r&&o(),r=!1}let l=c=>{c.key==="Escape"&&!window.watchingEscape&&(o(),c.preventDefault())};return{show:i,close:o}};var cf=`<!DOCTYPE html>
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
`;var pf=`<!DOCTYPE html>\r
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
`;var uf=`<ul id="settings-menu" class="dropdown-menu">\r
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
`;var df=`<section data-lang="art-template">\r
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
`;var mf=`<div id="custom-settings-container" class="modal-container">
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
`;var ff=`<div id="test-editor-container" class="modal-container">
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
`;var hf=`<div id="import-container" class="modal-container">
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
`;var gf=`<div id="deploy-container" class="modal-container">
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
`;var _f=`<div id="sync-container" class="modal-container">
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
`;var yf=`<div id="backup-container" class="modal-container">
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
`;var vf=`<div id="broadcast-container" class="modal-container">
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
`;var bf=`<div id="welcome-container" class="modal-container">\r
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
`;var wf=`<div id="about-container" class="modal-container">\r
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
`;var xf=`<div id="info-container" class="modal-container">
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
`;var Sf=`<div id="resources-container" class="modal-container">
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
`;var Lf=`<div id="login-screen" class="modal-container">\r
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
`;var Ef=`<div id="prompt-screen">
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
`;var kf=`<div id="prompt-recover-screen">
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
`;var Tf=`<div id="templates-container" class="modal-container">
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
`;var Cf=`<div id="list-container" class="list-container">
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
`;var jf=`<div id="assets-list-container" class="list-container">
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
`;var Mf=`<div id="add-asset-container" class="modal-container">
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
`;var Uf=`<div id="snippets-list-container" class="list-container">
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
`;var Af=`<div id="add-snippet-container" class="modal-container">
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
`;var Pf=`<div id="share-screen" class="modal-container">\r
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
`;var Of=`<div id="embed-container" class="modal-container">
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
`;var qf=`<div id="editor-settings-container" class="modal-container">
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
`;var Rf=`<!DOCTYPE html>
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
`;var K=e=>e.replace(/{{APP_VERSION}}/g,"4").replace(/{{SDK_VERSION}}/g,"0.0.2").replace(/{{COMMIT_SHA}}/g,"fe430fb").replace(/{{REPO_URL}}/g,"https://github.com/live-codes/livecodes").replace(/{{DOCS_BASE_URL}}/g,"/livecodes/docs/"),If=K(cf),fN=K(pf),gS=K(uf),hN=K(df),_S=K(mf),yS=K(ff),gN=K(hf),_N=K(gf),yN=K(_f),vN=K(yf),bN=K(vf),vS=K(bf),bS=K(wf),wS=K(xf),wN=K(Sf),xS=K(Lf),Hf=K(Ef),Bf=K(kf),SS=K(Tf),LS=K(Cf),xN=K(jf),SN=K(Mf),LN=K(Uf),EN=K(Af),kN=K(Pf),TN=K(Of),CN=K(qf),ES=K(Rf);var it=(e,t)=>{let s=r=>r.replace(/{{ __livecodes_baseUrl__ }}/g,ms(t)).replace(/{{ __CDN_URL__ }}/g,Pe.getUrl("~").replace("~",""));return typeof e=="string"?s(e):{...e,url:s(e.url)}},TS=async e=>(await import(e+"templates.ba84017649b6a8db4e5f4844cb167368.js")).starterTemplates,Ji=async(e,t)=>(await TS(t)).filter(s=>{let r=e.languages?.map(V).filter(Boolean);if(!r||s.title==="Blank Project")return!0;let n=[s.markup?.language,s.style?.language,s.script?.language];for(let i of n){let o=V(i);if(!o||!r.includes(o))return!1}return!0}).map(s=>({...s,markup:{...s.markup,language:s.markup?.language||"html",content:it(s.markup?.content||"",t),...s.markup?.contentUrl?{contentUrl:it(s.markup?.contentUrl||"",t)}:{}},style:{...s.style,language:s.style?.language||"css",content:it(s.style?.content||"",t),...s.style?.contentUrl?{contentUrl:it(s.style?.contentUrl||"",t)}:{}},script:{...s.script,language:s.script?.language||"javascript",content:it(s.script?.content||"",t),...s.script?.contentUrl?{contentUrl:it(s.script?.contentUrl||"",t)}:{}},imports:Fs(s.imports||{},r=>it(r||"",t)),types:Fs(s.types||{},r=>it(r||"",t)),stylesheets:s.stylesheets?.map(r=>it(r||"",t)),scripts:s.scripts?.map(r=>it(r||"",t))})),Df=async(e,t,s)=>(await Ji(t,s)).filter(r=>r.name.toLowerCase()===e.toLowerCase())[0];var F={title:"Untitled Project",description:"",tags:[],autoupdate:!0,autosave:!1,delay:1500,formatOnsave:!1,mode:"full",theme:"dark",recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{},tests:{language:"typescript",content:""},tools:{enabled:"all",active:"",status:""},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,semicolons:!0,singleQuote:!1,trailingComma:!0,emmet:!0,editorMode:void 0,version:"4"};var xs=e=>{if(!e)return{...F};let t=Gt(e),s={...F,...t,...t.mode==="result"&&t.tools==null?{tools:{enabled:[],active:"",status:"none"}}:{}},r=dn(),{version:n,...i}=Gt(jS(s,r));s={...s,...i};let o=s.activeEditor||"markup";return s=CS({...s,activeEditor:o}),s},CS=e=>({...e,markup:{...e.markup,language:V(e.markup.language)||F.markup.language},style:{...e.style,language:V(e.style.language)||F.style.language},script:{...e.script,language:V(e.script.language)||F.script.language},...e.tests?.language?{tests:{...e.tests,language:V(e.tests.language)||F.tests?.language||"typescript"}}:{}}),dn=(e=parent.location.search)=>{let t=Object.fromEntries(new URLSearchParams(e));return Object.keys(t).forEach(s=>{try{t[s]=decodeURIComponent(t[s])}catch{}t[s]===""&&(t[s]=!0),t[s]==="true"&&(t[s]=!0),t[s]==="false"&&(t[s]=!1)}),t},jS=(e,t)=>{let s=[...Object.keys(F)].filter(m=>m!=="version").reduce((m,y)=>({...m,[y]:t[y]}),{});Object.keys(t).forEach(m=>{let y=V(m);if(!y)return;let b=te(y);if(b&&!s[b]){let f=t[m],u=typeof f=="string"?up(decodeURIComponent(f)):"";s[b]={language:y,content:u},s.activeEditor||(s.activeEditor=b)}});let r=V(t.language||t.lang),n=te(r);n&&(s[n]?.language===r?s.activeEditor=n:!s[n]?.content&&e[n]?.language===r?(s[n]={...e[n]},s.activeEditor=n):e[n]?.content||(s[n]={language:r,content:""},s.activeEditor=n));let i=["markup","style","script"],o=t.activeEditor,a=t.active;s.activeEditor=i.includes(o)?o:o in i?i[o]:i.includes(a)?a:a in i?i[a]:s.activeEditor,typeof t.languages=="string"&&(s.languages=t.languages.split(",").map(m=>m.trim()).map(V).filter(Boolean)),typeof t.processors=="string"&&(s.processors=t.processors.split(",").map(m=>m.trim()).filter(Boolean)),typeof t.tags=="string"&&(s.tags=t.tags.split(",").map(m=>m.trim()).filter(Boolean)),typeof t.stylesheets=="string"&&(s.stylesheets=t.stylesheets.split(",").map(m=>m.trim()).filter(Boolean)),typeof t.scripts=="string"&&(s.scripts=t.scripts.split(",").map(m=>m.trim()).filter(Boolean));let l=["console","compiled","tests"],c=!t.tools&&l.map(m=>t[m]).filter(Boolean).length===0;if(t.tools==="none"||t.tools===!1||t.mode==="editor"||t.mode==="codeblock"||t.mode==="result"&&c)s.tools={enabled:[],active:"",status:"none"};else if(!c){s.tools=St(F.tools);let m,[y,b]=t.tools?.split("|")||["",""],f=y.split(",").map(d=>d.trim()).filter(d=>l.includes(d));f.length>0&&(s.tools.enabled=f,s.tools.active=f[0]),Object.keys(t).filter(d=>l.includes(d)).forEach(d=>{s.tools&&(t[d]===!0&&(t[d]="open"),t[d]===!1&&(t[d]="none"),!m&&["open","full","closed"].includes(t[d])&&(s.tools.enabled!=="all"&&!s.tools.enabled.includes(d)&&s.tools.enabled.push(d),s.tools.active=d,s.tools.status=t[d],m=s.tools.status),t[d]==="none"&&(s.tools.enabled==="all"&&(s.tools.enabled=[...l]),s.tools.enabled=s.tools.enabled.filter(v=>v!==d),s.tools.active===d&&(s.tools.active=s.tools.enabled[0])))}),["open","full","closed"].includes(t.tools)?s.tools.status=t.tools:["open","full","closed"].includes(b)?s.tools.status=b:!s.tools?.status&&["editor","codeblock","result"].includes(s.mode||"")?s.tools={enabled:[],active:"",status:"none"}:s.tools.status||(s.tools.status="closed")}return s};var MS=[{to:"0.6.0",upgrade:(e,t)=>{let s=Ss(e);return s.processors&&"postcss"in s.processors&&(s.processors=Object.keys(s.processors.postcss).filter(r=>s.processors.postcss[r])),{...s,version:t}}},{to:"0.5.0",upgrade:(e,t)=>{let s=Ss(e);return"editor"in s&&s.editor==="prism"&&(s.editor="codejar"),"compiled"in s&&(s.tools=s.tools||Ss(F.tools),s.tools.active="compiled",s.tools.status=s.compiled,delete s.compiled),"console"in s&&(s.tools=s.tools||Ss(F.tools),s.tools.active="console",s.tools.status=s.console,delete s.console),s.script?.language==="graph"&&(s.script.language="diagrams"),s.languages?.includes("graph")&&(s.languages=s.languages.map(r=>r==="graph"?"diagrams":r)),"enableRestore"in s&&(s.recoverUnsaved=s.enableRestore,delete s.enableRestore),{...s,version:t}}},{to:"0.4.0",upgrade:(e,t)=>{let s=Ss(e);if(s=Nf(s,"update_delay","delay"),s=Nf(s,"allow_lang_change","allowLangChange"),"autoprefixer"in s&&(s.processors=Ss(F.processors),s.processors.postcss=s.processors.postcss||{},s.processors.postcss.autoprefixer=s.autoprefixer,delete s.autoprefixer),"baseUrl"in s&&delete s.baseUrl,"cssPreset"in s&&s.cssPreset===null&&(s.cssPreset=""),"editor"in s&&typeof s.editor!="string"&&(s.editor=void 0),"language"in s&&(s.activeEditor=te(s.language),delete s.language),"modules"in s){let r={...s.modules.reduce((i,o)=>({...i,...o.url?{[o.name]:o.url}:{}}),{})};Object.keys(r).length>0&&(s.imports=r);let n={...s.modules.reduce((i,o)=>({...i,...o.typesUrl?{[o.name]:o.typesUrl}:{}}),{})};Object.keys(n).length>0&&(s.types=n),delete s.modules}return{...s,version:t}}}],$f=e=>{let t=US(e.version)?e.version:"0.0.0",s=F.version;return Vi({version:s,comparedTo:t})?(console.warn(`Unsupported config version '${t}'. Current LiveCodes version is '${s}'`),e):t===s?e:{...MS.sort((r,n)=>Vi({version:r.to,comparedTo:n.to})?-1:1).reduce((r,n)=>Vi({version:r.version,comparedTo:n.to})?n.upgrade(r,n.to):r,e),version:s}},US=e=>{if(typeof e!="string")return!1;let t=e.split(".");return!(t.length!==3||t.map(s=>Number(s)).filter(isNaN).length!==0)},Vi=({version:e,comparedTo:t})=>{if(!e)return!0;let s=e.split(".").map(n=>Number(n)),r=t.split(".").map(n=>Number(n));for(let n in s)if(s[n]<r[n])return!0;return!1},Ss=e=>JSON.parse(JSON.stringify(e)),Nf=(e,t,s)=>{let{[t]:r,...n}={...e,...t in e?{[s]:e[t]}:{}};return n};var Ff=e=>{let t=(u,d,v)=>d==="array"?Array.isArray(u)?v?u.filter(S=>t(S,v)).length>0:!0:!1:d==="object"?u&&typeof u===d:d==="number"&&!isNaN(Number(u))?!0:typeof u===d,s=(u,d)=>d!=null&&u.includes(d),r=["full","editor","codeblock","result"],n=["light","dark"],i=["vim","emacs"],o=["console","compiled","tests"],a=["","full","closed","open","none"],l=["monaco","codemirror","codejar"],c=["markup","style","script"],p=[1,.5,.25],m=u=>t(u,"object")&&(t(u.language,"string")||t(u.content,"string")||t(u.contentUrl,"string")),y=(u,d)=>({language:te(u.language)===d?V(u.language)||F[d].language:F[d].language,...t(u.content,"string")?{content:u.content}:{},...t(u.contentUrl,"string")?{contentUrl:u.contentUrl}:{},...t(u.selector,"string")?{selector:u.selector}:{}}),b=u=>({...u&&t(u.language,"string")?{language:u.language}:{},...u&&t(u.content,"string")?{content:u.content}:{},...u&&t(u.contentUrl,"string")?{contentUrl:u.contentUrl}:{},...u&&t(u.selector,"string")?{selector:u.selector}:{}}),f=u=>({...F.tools,...u&&Array.isArray(u.enabled)?{enabled:u.enabled.filter(d=>o.includes(d))}:{...u&&u.enabled==null&&u.status==="none"?{enabled:[]}:{enabled:F.tools.enabled}},...u&&u.active!=null&&s(o,u.active)&&(typeof u.enabled=="string"||u.enabled==null||Array.isArray(u.enabled)&&s(u.enabled,u.active))?{active:u.active}:{active:F.tools.active},...u&&u.status!=null&&s(a,u.status)?{status:u.status}:{status:F.tools.status}});return{...t(e.title,"string")?{title:e.title}:{},...t(e.description,"string")?{description:e.description}:{},...t(e.tags,"array","string")?{tags:Dt(e.tags)}:{},...t(e.autoupdate,"boolean")?{autoupdate:e.autoupdate}:{},...t(e.autosave,"boolean")?{autosave:e.autosave}:{},...t(e.delay,"number")?{delay:Number(e.delay)}:{},...t(e.formatOnsave,"boolean")?{formatOnsave:e.formatOnsave}:{},...s(r,e.mode)?{mode:e.mode}:{},...s(n,e.theme)?{theme:e.theme}:{},...t(e.recoverUnsaved,"boolean")?{recoverUnsaved:e.recoverUnsaved}:{},...t(e.welcome,"boolean")?{welcome:e.welcome}:{},...t(e.showSpacing,"boolean")?{showSpacing:e.showSpacing}:{},...t(e.readonly,"boolean")?{readonly:e.readonly}:{},...t(e.allowLangChange,"boolean")?{allowLangChange:e.allowLangChange}:{},...s(c,e.activeEditor)?{activeEditor:e.activeEditor}:{},...t(e.languages,"array","string")?{languages:Dt(e.languages)}:{},...m(e.markup)?{markup:y(e.markup,"markup")}:{},...m(e.style)?{style:y(e.style,"style")}:{},...m(e.script)?{script:y(e.script,"script")}:{},...t(e.tools,"object")?{tools:f(e.tools)}:{},...t(e.tests,"object")?{tests:b(e.tests)}:{},...s(p,Number(e.zoom))?{zoom:Number(e.zoom)}:{},...t(e.stylesheets,"array","string")?{stylesheets:Dt(e.stylesheets)}:{},...t(e.scripts,"array","string")?{scripts:Dt(e.scripts)}:{},...t(e.cssPreset,"string")?{cssPreset:e.cssPreset}:{},...t(e.processors,"array","string")?{processors:Dt(e.processors)}:{},...t(e.customSettings,"object")?{customSettings:e.customSettings}:{},...s(l,e.editor)?{editor:e.editor}:{},...t(e.fontFamily,"string")?{fontFamily:e.fontFamily}:{},...t(e.fontSize,"number")?{fontSize:Number(e.fontSize)}:{},...t(e.useTabs,"boolean")?{useTabs:e.useTabs}:{},...t(e.tabSize,"number")?{tabSize:Number(e.tabSize)}:{},...t(e.lineNumbers,"boolean")?{lineNumbers:e.lineNumbers}:{},...t(e.wordWrap,"boolean")?{wordWrap:e.wordWrap}:{},...t(e.closeBrackets,"boolean")?{closeBrackets:e.closeBrackets}:{},...t(e.semicolons,"boolean")?{semicolons:e.semicolons}:{},...t(e.singleQuote,"boolean")?{singleQuote:e.singleQuote}:{},...t(e.trailingComma,"boolean")?{trailingComma:e.trailingComma}:{},...t(e.emmet,"boolean")?{emmet:e.emmet}:{},...s(i,e.editorMode)?{editorMode:e.editorMode}:{},...t(e.imports,"object")?{imports:e.imports}:{},...t(e.types,"object")?{types:e.types}:{},...t(e.version,"string")?{version:e.version}:{}}};var zf=F,E=()=>St(zf),Me=e=>{zf=St(e)},Je=e=>St({title:e.title,description:e.description,tags:e.tags,activeEditor:e.activeEditor,languages:e.languages,markup:e.markup,style:e.style,script:e.script,stylesheets:e.stylesheets,scripts:e.scripts,cssPreset:e.cssPreset,processors:e.processors,customSettings:e.customSettings,imports:e.imports,types:e.types,tests:e.tests,version:e.version}),Ki=e=>({autoupdate:e.autoupdate,autosave:e.autosave,delay:e.delay,formatOnsave:e.formatOnsave,recoverUnsaved:e.recoverUnsaved,welcome:e.welcome,showSpacing:e.showSpacing,theme:e.theme,...Ls(e),...Xi(e)}),Ls=e=>({editor:e.editor??(e.readonly===!0?"codejar":void 0),fontFamily:e.fontFamily,fontSize:e.fontSize,useTabs:e.useTabs,tabSize:e.tabSize,lineNumbers:e.lineNumbers,wordWrap:e.wordWrap,closeBrackets:e.closeBrackets,emmet:e.emmet,editorMode:e.editorMode}),Xi=e=>({useTabs:e.useTabs,tabSize:e.tabSize,semicolons:e.semicolons,singleQuote:e.singleQuote,trailingComma:e.trailingComma}),Gt=e=>Ff($f(e));var mn={github:/^(?:(?:http|https):\/\/)?github.com\/(?:.*)/g,githubGist:/^(?:(?:http|https):\/\/)?gist.github.com(?:\/\S*)?\/(\w+)/g,gitlab:/^(?:(?:http|https):\/\/)?gitlab.com\/(?:.*)/g,codepen:/^(?:(?:http|https):\/\/)?codepen.io\/(\w+)\/pen\/(\w+)/g,jsbin:/^(?:(?:(?:http|https):\/\/)?(?:\w+.)?)?jsbin.com\/((\w)+(\/\d)?)(?:.*)/g};var Wf=(e,t=new RegExp(mn.github))=>{if(t.test(e))try{let r=OS(e).pathname.split("/");return r[3]==="tree"||r.length===3}catch{return}},OS=e=>e.startsWith("https://")?new URL(e):new URL("https://"+e);var qS=(e,t=new RegExp(mn.github))=>{if(t.test(e))try{return RS(e).pathname.split("/")[3]==="blob"}catch{return}},Gf=e=>Wf(e)||qS(e),RS=e=>e.startsWith("https://")?new URL(e):new URL("https://"+e);var Jf=()=>{let e={},t=async n=>{let i="",o=Object.keys(n)[0],a=Object.values(n)[0],l=typeof a=="string"?a:a.url,c=typeof a=="string"||a.declareAsModule===!0;if(l)try{let m=await(await fetch(l)).text();i=c?`declare module '${o}' {${m}}`:m}catch{i=`declare module '${o}': any`}return e={...e,...n},{filename:`file:///node_modules/${o}/index.d.ts`,content:i}},s=n=>Promise.all(Object.keys(n).map(i=>t({[i]:n[i]})));return{load:async(n,i,o=!1)=>{let l=Et(n).reduce((y,b)=>{let f,u=Object.keys(e).find(v=>b===v)||Object.keys(e).find(v=>b.startsWith(v+"/"))&&!Object.keys(i).find(v=>b===v),d=Object.keys(i).find(v=>b===v)||Object.keys(i).find(v=>b.startsWith(v+"/"));return u&&!o?f={}:d?f={[d]:i[d]}:f={[b]:""},{...y,...f}},{}),c=Object.keys(l).filter(y=>l[y]===""),p=await Pm.getTypeUrls(c),m=dp(i,(y,b)=>(!Object.keys(e).includes(b)||o)&&typeof y!="string"&&y.autoload===!0);return s({...l,...p,...m})}}};var Vf={"@testing-library/dom":M+"@testing-library/dom.js","@testing-library/jest-dom":M+"@testing-library/jest-dom.js","@testing-library/react":M+"@testing-library/react.js",chai:Ep};var Kf=async({code:e,config:t,forExport:s,template:r,baseUrl:n,singleFile:i,runTests:o,compileInfo:a})=>{let l=ms(n),p=new DOMParser().parseFromString(r,"text/html");if(s)p.querySelector("script")?.remove();else{let w=p.createElement("script");w.src=l+"result-utils.a838b33c947a1f0351fea5c7aafbba54.js",p.head.appendChild(w)}if(p.title=t.title,t.customSettings.htmlClasses&&p.documentElement.classList.add(...t.customSettings.htmlClasses.split(" ")),t.customSettings.head&&(p.head.innerHTML+=t.customSettings.head),t.cssPreset){let w=Fm.find(g=>g.id===t.cssPreset)?.url;if(w){let g=p.createElement("link");g.rel="stylesheet",g.id="__livecodes__css-preset",g.href=ms(w,l),p.head.appendChild(g)}}if(t.stylesheets.forEach(w=>{let g=p.createElement("link");g.rel="stylesheet",g.href=w,p.head.appendChild(g)}),i){let w=e.style.compiled,g=p.createElement("style");g.id="__livecodes_styles__",g.innerHTML=w,p.head.appendChild(g)}else{let w=p.createElement("link");w.rel="stylesheet",w.href="./style.css",p.head.appendChild(w)}let m=e.markup.compiled;p.body.innerHTML+=m,e.script.language==="blockly"&&p.querySelectorAll('script[type="blockly/script"], script[data-type="blockly/script"], xml[type="blockly/xml"], xml[data-type="blockly/xml"]').forEach(g=>g.remove());let y=["markup","style","script"].map(w=>({language:e[w].language,compiled:e[w].compiled})),b=o&&e.tests?.compiled||"",f=Et(m).includes("./script")||o&&!s&&Et(b).includes("./script"),u={};for(let{language:w,compiled:g}of y){let _=We(w);if(!_)continue;if((typeof _.styles=="function"?_.styles({compiled:g,baseUrl:l,config:t}):_.styles||[]).forEach(H=>{let $=p.createElement("link");$.rel="stylesheet",$.href=ds(H)?l+H:H,p.head.appendChild($)}),(typeof _.scripts=="function"?_.scripts({compiled:g,baseUrl:l,config:t}):_.scripts||[]).forEach(H=>{let $=p.createElement("script");$.src=ds(H)?l+H:H,_.deferScripts&&($.defer=!0),H.includes("-script-esm.")&&($.type="module"),p.head.appendChild($)}),_.inlineScript){typeof _.inlineScript=="function"&&(_.inlineScript=await _.inlineScript({baseUrl:n}));let H=document.createElement("script");H.innerHTML=_.inlineScript,p.head.appendChild(H)}_.imports&&(u={...u,...Fs(_.imports,H=>ms(H,n))})}let d=hs(e.style.language),S={...t.customSettings.mapImports===!1?{}:{...Xs(e.script.compiled)?ln(e.script.compiled,t):{},...Xs(e.markup.compiled)?ln(e.markup.compiled,t):{},...o&&!s&&Xs(b)?ln(b,t):{},...f?{"./script":"data:text/javascript;base64,"+btoa(e.script.compiled)}:{},...zi(e.script.compiled,e.style.compiled,a.cssModules,d),...zi(e.markup.compiled,e.style.compiled,a.cssModules,d)},...u,...o?Vf:{},...t.imports,...t.customSettings.imports};if(Object.keys(S).length>0){let w=p.createElement("script");w.src=Pe.getUrl(jp,Nt()),w.async=!0,p.head.appendChild(w);let g=p.createElement("script");g.type="importmap",g.innerHTML=`{"imports": ${JSON.stringify(S,null,2)}}`,p.head.appendChild(g)}if(t.scripts.forEach(w=>{let g=p.createElement("script");g.src=w,p.head.appendChild(g)}),!f){let w=e.script.compiled,g=p.createElement("script");i?g.innerHTML=vi(w):g.src="./script.js",p.body.appendChild(g);let _=We(e.script.language)?.scriptType;_?g.type=_:t.customSettings.scriptType!=null?t.customSettings.scriptType&&(g.type=t.customSettings.scriptType):qm(w)&&(g.type="module")}if(t.showSpacing&&!s){let w=p.createElement("script");w.src=Eu,p.body.appendChild(w)}if(o&&!s){let w=p.createElement("script");w.src=cu,p.body.appendChild(w);let g=p.createElement("script");g.type="module",g.innerHTML=`
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

${vi(b)}

window.jestLite.core.run().then(results => {
  parent.postMessage({type: 'testResults', payload: {results}}, '*');
}).catch((error) => {
  parent.postMessage({type: 'testResults', payload: {error: error.message || String(error)}}, '*');
});
    `,p.body.appendChild(g)}return`<!DOCTYPE html>
`+p.documentElement.outerHTML};var Xf=()=>document.querySelector("#toolbar"),Ys=()=>document.querySelector("#project-title"),Yf=()=>document.querySelector("#editor-container"),Qf=()=>document.querySelector("#editors"),Zf=()=>document.querySelector("#markup"),eh=()=>document.querySelector("#style"),th=()=>document.querySelector("#script"),sh=()=>document.querySelector("#output"),Es=()=>document.querySelector("#result"),Jt=()=>document.querySelector("#result > iframe"),Yi=()=>document.querySelector("#editor-container .gutter"),Qi=()=>document.querySelector("#logo a"),Zi=()=>document.querySelector("#run-button"),eo=()=>document.querySelector("#code-run-button"),fn=()=>document.querySelector("#editor-tools"),rh=()=>document.querySelector("#editor-tools #copy-btn"),nh=()=>document.querySelector("#editor-tools #undo-btn"),ih=()=>document.querySelector("#editor-tools #redo-btn"),Qs=()=>document.querySelector("#editor-tools #format-btn"),oh=()=>document.querySelector("#editor-mode"),ah=()=>document.querySelector("#editor-tools #editor-status"),to=()=>document.querySelector("#editor-tools #external-resources-btn");var lh=()=>document.querySelector("#result-button"),ch=()=>document.querySelector("#fullscreen-button"),so=()=>document.querySelectorAll(".editor-title:not(.hidden)"),ph=()=>document.querySelectorAll("#editors > .editor");var uh=()=>document.querySelector("#tools-pane-loading"),dh=()=>document.querySelector("#zoom-button #zoom-value"),mh=()=>document.querySelector("#modal #prompt-save-btn"),fh=()=>document.querySelector("#modal #prompt-donot-save-btn"),hh=()=>document.querySelector("#modal #prompt-cancel-btn"),gh=()=>document.querySelector("#modal #prompt-recover-btn"),_h=()=>document.querySelector("#modal #prompt-save-previous-btn"),yh=()=>document.querySelector("#modal #prompt-cancel-recover-btn"),ro=()=>document.querySelector("#modal #unsaved-project-name"),vh=()=>document.querySelector("#modal #unsaved-project-last-modified"),bh=()=>document.querySelector("#modal #disable-recover-checkbox"),wh=()=>document.querySelectorAll("#select-editor .language-item a"),xh=()=>document.querySelectorAll("#select-editor .language-menu-button"),Sh=()=>document.querySelector("#style-selector .dropdown-menu");var no=()=>document.querySelector("#login-link"),io=()=>document.querySelector("#logout-link");var Lh=()=>document.querySelector("#external-resources-link");var Eh=()=>document.querySelector("#settings-menu input#autoupdate"),kh=()=>document.querySelector("#settings-menu #delay-value"),Th=()=>document.querySelector("#settings-menu input#delay-range"),Ch=()=>document.querySelector("#settings-menu input#autosave"),jh=()=>document.querySelector("#settings-menu input#autosync"),Mh=()=>document.querySelector("#settings-menu input#formatOnsave"),Uh=()=>document.querySelectorAll("#style-selector input");var Ah=()=>document.querySelector("#settings-menu input#theme"),Ph=()=>document.querySelector("#settings-menu input#welcome"),Oh=()=>document.querySelector("#settings-menu input#recover-unsaved"),qh=()=>document.querySelector("#settings-menu input#show-spacing"),Rh=()=>document.querySelectorAll("#css-preset-menu a");var Ih=(e=document)=>e.querySelector("#modal #welcome-recover");var Zs=Je(F),Hh={...Zs,markup:{...Zs.markup,compiled:"",modified:""},style:{...Zs.style,compiled:"",modified:""},script:{...Zs.script,compiled:"",modified:""},tests:{language:"javascript",...Zs.tests,compiled:""},result:"",styleOnlyUpdate:!1},Z=Hh,ge=()=>({...Z}),oo=(e=Hh)=>{Z={...e,markup:{modified:e.markup.compiled===Z.markup.compiled?Z.markup.modified:"",...e.markup},style:{modified:e.style.compiled===Z.style.compiled?Z.style.modified:"",...e.style},script:{modified:e.script.compiled===Z.script.compiled?Z.script.modified:"",...e.script},tests:{language:"javascript",compiled:"",...e.tests},result:e.result||""}},er=(e,t,s)=>{Z[e].language===t&&(Z[e].modified=s)},ao=()=>({markup:{language:Z.markup.language,content:Z.markup.content||"",compiled:Z.markup.modified||Z.markup.compiled||""},style:{language:Z.style.language,content:Z.style.content||"",compiled:Z.style.modified||Z.style.compiled||""},script:{language:Z.script.language,content:Z.script.content||"",compiled:Z.script.modified||Z.script.compiled||""},result:Z.result||""});var tr=(e,t)=>{let s={...e};return t.forEach(r=>delete s[r]),s},Bh=(e,t)=>{let s=["activeEditor","title","description","tests"],r=["compiled","modified"],n={...tr(e,["result","styleOnlyUpdate",...s]),markup:tr(e.markup,r),style:tr(e.style,r),script:tr(e.script,r)},i=tr(t,s);return JSON.stringify(n)===JSON.stringify(i)};var Dh=(e="Loading...")=>{let t=document.createElement("div");return t.innerHTML=e,t.classList.add("modal-message"),t};var Nh=e=>{let t=no();t&&(t.style.display="none");let s=io();if(s){let r=e.displayName||e.username;s.innerHTML="Log out",s.classList.add("hint--bottom"),s.dataset.hint="Logged in as "+r,s.style.display="block"}};var Ie=typeof window<"u"?window:null,co=Ie===null,rr=co?void 0:Ie.document,Ve="addEventListener",Ke="removeEventListener",lo="getBoundingClientRect",sr="_a",Xe="_b",_t="_c",hn="horizontal",Ye=function(){return!1},DS=co?"calc":["","-webkit-","-moz-","-o-"].filter(function(e){var t=rr.createElement("div");return t.style.cssText="width:"+e+"calc(9px)",!!t.style.length}).shift()+"calc",Fh=function(e){return typeof e=="string"||e instanceof String},$h=function(e){if(Fh(e)){var t=rr.querySelector(e);if(!t)throw new Error("Selector "+e+" did not match a DOM element");return t}return e},we=function(e,t,s){var r=e[t];return r!==void 0?r:s},gn=function(e,t,s,r){if(t){if(r==="end")return 0;if(r==="center")return e/2}else if(s){if(r==="start")return 0;if(r==="center")return e/2}return e},NS=function(e,t){var s=rr.createElement("div");return s.className="gutter gutter-"+t,s},$S=function(e,t,s){var r={};return Fh(t)?r[e]=t:r[e]=DS+"("+t+"% - "+s+"px)",r},FS=function(e,t){var s;return s={},s[e]=t+"px",s},zS=function(e,t){if(t===void 0&&(t={}),co)return{};var s=e,r,n,i,o,a,l;Array.from&&(s=Array.from(s));var c=$h(s[0]),p=c.parentNode,m=getComputedStyle?getComputedStyle(p):null,y=m?m.flexDirection:null,b=we(t,"sizes")||s.map(function(){return 100/s.length}),f=we(t,"minSize",100),u=Array.isArray(f)?f:s.map(function(){return f}),d=we(t,"maxSize",1/0),v=Array.isArray(d)?d:s.map(function(){return d}),S=we(t,"expandToMin",!1),w=we(t,"gutterSize",10),g=we(t,"gutterAlign","center"),_=we(t,"snapOffset",30),A=Array.isArray(_)?_:s.map(function(){return _}),L=we(t,"dragInterval",1),H=we(t,"direction",hn),$=we(t,"cursor",H===hn?"col-resize":"row-resize"),Ce=we(t,"gutter",NS),Ue=we(t,"elementStyle",$S),ve=we(t,"gutterStyle",FS);H===hn?(r="width",n="clientX",i="left",o="right",a="clientWidth"):H==="vertical"&&(r="height",n="clientY",i="top",o="bottom",a="clientHeight");function be(U,T,j,P){var he=Ue(r,T,j,P);Object.keys(he).forEach(function(ie){U.style[ie]=he[ie]})}function xt(U,T,j){var P=ve(r,T,j);Object.keys(P).forEach(function(he){U.style[he]=P[he]})}function rt(){return l.map(function(U){return U.size})}function us(U){return"touches"in U?U.touches[0][n]:U[n]}function Rt(U){var T=l[this.a],j=l[this.b],P=T.size+j.size;T.size=U/this.size*P,j.size=P-U/this.size*P,be(T.element,T.size,this[Xe],T.i),be(j.element,j.size,this[_t],j.i)}function gi(U){var T,j=l[this.a],P=l[this.b];this.dragging&&(T=us(U)-this.start+(this[Xe]-this.dragOffset),L>1&&(T=Math.round(T/L)*L),T<=j.minSize+j.snapOffset+this[Xe]?T=j.minSize+this[Xe]:T>=this.size-(P.minSize+P.snapOffset+this[_t])&&(T=this.size-(P.minSize+this[_t])),T>=j.maxSize-j.snapOffset+this[Xe]?T=j.maxSize+this[Xe]:T<=this.size-(P.maxSize-P.snapOffset+this[_t])&&(T=this.size-(P.maxSize+this[_t])),Rt.call(this,T),we(t,"onDrag",Ye)(rt()))}function zr(){var U=l[this.a].element,T=l[this.b].element,j=U[lo](),P=T[lo]();this.size=j[r]+P[r]+this[Xe]+this[_t],this.start=j[i],this.end=j[o]}function _i(U){if(!getComputedStyle)return null;var T=getComputedStyle(U);if(!T)return null;var j=U[a];return j===0?null:(H===hn?j-=parseFloat(T.paddingLeft)+parseFloat(T.paddingRight):j-=parseFloat(T.paddingTop)+parseFloat(T.paddingBottom),j)}function Wr(U){var T=_i(p);if(T===null||u.reduce(function(ie,Ae){return ie+Ae},0)>T)return U;var j=0,P=[],he=U.map(function(ie,Ae){var Ht=T*ie/100,Gr=gn(w,Ae===0,Ae===U.length-1,g),Jr=u[Ae]+Gr;return Ht<Jr?(j+=Jr-Ht,P.push(0),Jr):(P.push(Ht-Jr),Ht)});return j===0?U:he.map(function(ie,Ae){var Ht=ie;if(j>0&&P[Ae]-j>0){var Gr=Math.min(j,P[Ae]-j);j-=Gr,Ht=ie-Gr}return Ht/T*100})}function W(){var U=this,T=l[U.a].element,j=l[U.b].element;U.dragging&&we(t,"onDragEnd",Ye)(rt()),U.dragging=!1,Ie[Ke]("mouseup",U.stop),Ie[Ke]("touchend",U.stop),Ie[Ke]("touchcancel",U.stop),Ie[Ke]("mousemove",U.move),Ie[Ke]("touchmove",U.move),U.stop=null,U.move=null,T[Ke]("selectstart",Ye),T[Ke]("dragstart",Ye),j[Ke]("selectstart",Ye),j[Ke]("dragstart",Ye),T.style.userSelect="",T.style.webkitUserSelect="",T.style.MozUserSelect="",T.style.pointerEvents="",j.style.userSelect="",j.style.webkitUserSelect="",j.style.MozUserSelect="",j.style.pointerEvents="",U.gutter.style.cursor="",U.parent.style.cursor="",rr.body.style.cursor=""}function It(U){if(!("button"in U&&U.button!==0)){var T=this,j=l[T.a].element,P=l[T.b].element;T.dragging||we(t,"onDragStart",Ye)(rt()),U.preventDefault(),T.dragging=!0,T.move=gi.bind(T),T.stop=W.bind(T),Ie[Ve]("mouseup",T.stop),Ie[Ve]("touchend",T.stop),Ie[Ve]("touchcancel",T.stop),Ie[Ve]("mousemove",T.move),Ie[Ve]("touchmove",T.move),j[Ve]("selectstart",Ye),j[Ve]("dragstart",Ye),P[Ve]("selectstart",Ye),P[Ve]("dragstart",Ye),j.style.userSelect="none",j.style.webkitUserSelect="none",j.style.MozUserSelect="none",j.style.pointerEvents="none",P.style.userSelect="none",P.style.webkitUserSelect="none",P.style.MozUserSelect="none",P.style.pointerEvents="none",T.gutter.style.cursor=$,T.parent.style.cursor=$,rr.body.style.cursor=$,zr.call(T),T.dragOffset=us(U)-T.end}}b=Wr(b);var je=[];l=s.map(function(U,T){var j={element:$h(U),size:b[T],minSize:u[T],maxSize:v[T],snapOffset:A[T],i:T},P;if(T>0&&(P={a:T-1,b:T,dragging:!1,direction:H,parent:p},P[Xe]=gn(w,T-1===0,!1,g),P[_t]=gn(w,!1,T===s.length-1,g),y==="row-reverse"||y==="column-reverse")){var he=P.a;P.a=P.b,P.b=he}if(T>0){var ie=Ce(T,H,j.element);xt(ie,w,T),P[sr]=It.bind(P),ie[Ve]("mousedown",P[sr]),ie[Ve]("touchstart",P[sr]),p.insertBefore(ie,j.element),P.gutter=ie}return be(j.element,j.size,gn(w,T===0,T===s.length-1,g),T),T>0&&je.push(P),j});function lp(U){var T=U.i===je.length,j=T?je[U.i-1]:je[U.i];zr.call(j);var P=T?j.size-U.minSize-j[_t]:U.minSize+j[Xe];Rt.call(j,P)}l.forEach(function(U){var T=U.element[lo]()[r];T<U.minSize&&(S?lp(U):U.minSize=T)});function Mx(U){var T=Wr(U);T.forEach(function(j,P){if(P>0){var he=je[P-1],ie=l[he.a],Ae=l[he.b];ie.size=T[P-1],Ae.size=j,be(ie.element,ie.size,he[Xe],ie.i),be(Ae.element,Ae.size,he[_t],Ae.i)}})}function Ux(U,T){je.forEach(function(j){if(T!==!0?j.parent.removeChild(j.gutter):(j.gutter[Ke]("mousedown",j[sr]),j.gutter[Ke]("touchstart",j[sr])),U!==!0){var P=Ue(r,j.a.size,j[Xe]);Object.keys(P).forEach(function(he){l[j.a].element.style[he]="",l[j.b].element.style[he]=""})}})}return{setSizes:Mx,getSizes:rt,collapse:function(T){lp(l[T])},destroy:Ux,parent:p,pairs:je}},po=zS;var uo=()=>{let t=!1,s=po(["#editors","#output"],{minSize:[0,0],gutterSize:10,elementStyle:(a,l,c)=>(window.dispatchEvent(new Event(Ge.resizeEditor)),{"flex-basis":`calc(${l}% - ${c}px)`}),gutterStyle:(a,l)=>({"flex-basis":`${l}px`}),onDragStart(){n(!1)},onDragEnd(){n(!0)}}),r=document.querySelector(".gutter");if(r){let a=document.createElement("div");a.id="handle",r.appendChild(a)}let n=a=>{let l=document.querySelector("#editors"),c=document.querySelector("#output");!c||!l||(a?(l.style.transition="flex-basis 0.5s",c.style.transition="flex-basis 0.5s"):(l.style.transition="none",c.style.transition="none"))},i=(a,l=!1)=>{let c=window.innerWidth<800,p=c||l?[100,0]:[50,50],m=c||l?[0,100]:[50,50];a==="code"&&(s.getSizes()[0]<10||l)?s.setSizes(p):a==="output"&&(s.getSizes()[1]<10||l)&&(s.getSizes()[0]<10?s.setSizes(p):s.setSizes(m))},o=(a,l)=>{t||(s.destroy(a,l),t=!0)};return n(!0),{show:i,destroy:o}};var vU=pp(ax());var wU={esm:"livecodes.js",umd:"livecodes.umd.js",react:"react.js",vue:"vue.js",types:"index.d.ts"},li={getAppUrl:()=>"https://v4.livecodes.io/",getSDKUrl:(e="esm")=>`https://cdn.jsdelivr.net/npm/livecodes@0.0.2/${wU[e]}`};var ae=gm(),I=mm(),mt=af(),Se=lf(),fe=uo(),xU=Jf(),Kc=[],me=dn(),Ot={x:0,y:0},oe,J,ci,ls,Nr,B,cs,re,Hs,ft,lx=[],qt,Xc=!0,Bs=!1,Wc,pi,SU=!1,px=!1,Gc=!1,ui={isBroadcasting:!1,channel:"",channelUrl:"",channelToken:"",broadcastSource:!1},Jc=null,Yc=(e="markup")=>ft?.[e],Qc=()=>Object.values(ft||{}),wt=()=>B[E().activeEditor||"markup"],LU=async e=>fi(e.activeEditor),EU=()=>Promise.all([Lu,lu,mu,fu].map(e=>fs(e,void 0,"#app-styles"))),ux=(e,t="",s=ys)=>new Promise((r,n)=>{if(!e){n("Result container not found");return}let i=Jt();i||(i=document.createElement("iframe"),i.name="result",i.id="result-frame",i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts")),["codeblock","editor"].includes(E().mode)&&(t="");let o=Yc("script")||"javascript",a=en(Le,E(),oe),l=`${E().markup.content}
      ${E().style.content}
      ${E().script.content}
      `,c=i.parentElement===e,p=c&&ge().styleOnlyUpdate,m=c&&a[o]?.liveReload&&lx.includes(o)&&!l.includes("__livecodes_reload__");if(p){let f=new DOMParser().parseFromString(t,"text/html").querySelector("#__livecodes_styles__");if(f){let u=f.innerHTML;i.contentWindow?.postMessage({styles:u},s.getOrigin())}else i.contentWindow?.postMessage({result:t},s.getOrigin());r("loaded")}else if(m)i.contentWindow?.postMessage({result:t},s.getOrigin()),r("loaded");else{let y=!1;I.addEventListener(i,"load",function S(){if(I.removeEventListener(i,"load",S),!t||y){r("loaded");return}i.contentWindow?.postMessage({result:t},s.getOrigin()),y=!0,r("loaded")}),i.remove();let{markup:b,style:f,script:u}=E(),d=`?markup=${b.language}&style=${f.language}&script=${u.language}&isEmbed=${J}&isLoggedIn=${!!Hs?.isLoggedIn()}`,v=me.scrollPosition===!1||Ot.x===0&&Ot.y===0?"":`#livecodes-scroll-position:${Ot.x},${Ot.y}`;i.src=s.getResultUrl()+d+v,e.appendChild(i)}lx=Qc()}),Zc=async(e,t)=>{let s=t.script.language;if(e.script&&["typescript","javascript"].includes(gs(s))&&typeof e.script.addTypes=="function"){let r={...We(s)?.types,...t.types,...t.customSettings.types};(await xU.load(E().script.content||"",r)).forEach(i=>e.script.addTypes?.(i))}},kU=(e,t)=>{document.querySelectorAll(`.dropdown-menu-${e} .language-item a`).forEach(r=>{r.dataset.lang===t?r.parentElement?.classList.add("active"):r.parentElement?.classList.remove("active")})},di=(e,t)=>{let s=document.querySelector(`#${e}-selector span`),r=V(t);!s||!r||(s.innerHTML=Le.find(n=>n.name===r)?.title||"",kU(e,r))},TU=()=>{let e=["markup","style","script"],t=`<span><img src="${oe}assets/images/copy.svg" alt="copy"></span>`;e.forEach(s=>{let r=document.createElement("div");r.innerHTML=t,r.classList.add("copy-button","tool-buttons"),r.title="Copy",document.getElementById(s)?.appendChild(r),I.addEventListener(r,"click",()=>{bi(B?.[s]?.getValue())&&(r.innerHTML=`<span><img src="${oe}assets/images/tick.svg" alt="copied"></span>`,r.classList.add("hint--left","visible"),r.dataset.hint="Copied!",r.title="",setTimeout(()=>{r.innerHTML=t,r.classList.remove("hint--left","visible"),r.dataset.hint="",r.title="Copy"},2e3))})})},CU=async e=>{B&&(Object.values(B).forEach(l=>l.destroy()),UU());let t={baseUrl:oe,mode:e.mode,readonly:e.readonly,theme:e.theme,...Ls(e),isEmbed:J,mapLanguage:gs,getLanguageExtension:hs,getFormatterConfig:()=>Xi(E()),getFontFamily:cn},s={...t,container:Zf(),editorId:"markup",language:qe(e.markup.language,e)?e.markup.language:e.languages?.find(l=>te(l)==="markup")||"html",value:qe(e.markup.language,e)&&e.markup.content||""},r={...t,container:eh(),editorId:"style",language:qe(e.style.language,e)?e.style.language:e.languages?.find(l=>te(l)==="style")||"css",value:qe(e.style.language,e)&&e.style.content||""},n={...t,container:th(),editorId:"script",language:qe(e.script.language,e)?e.script.language:e.languages?.find(l=>te(l)==="script")||"javascript",value:qe(e.script.language,e)&&e.script.content||""},i=await vs(s),o=await vs(r),a=await vs(n);di("markup",s.language),di("style",r.language),di("script",n.language),ft={markup:s.language,style:r.language,script:n.language},B={markup:i,style:o,script:a},Object.keys(B).forEach(async l=>{let c=ft?.[l]||"html";hx(c),B[l].registerFormatter(await Nr.getFormatFn(c)),AU(l,B)}),e.mode==="codeblock"&&TU()};var jU=async(e,t)=>{let s=Object.keys(e);for(let r of s){let n=V(t[r].language);n&&await tp(n,t[r].content,!0)}},dx=e=>{let s={full:"111",editor:"110",codeblock:"010",result:"001"}[e.mode]||"111",r=Xf(),n=Yf(),i=Qf(),o=sh(),a=Es(),l=Yi(),c=Zi(),p=eo(),m=fn(),y=s[0]==="1",b=s[1]==="1",f=s[2]==="1";r.style.display="flex",i.style.display="flex",a.style.display="flex",o.style.display="block",l.style.display="block",c.style.visibility="visible",p.style.visibility="visible",y||(r.style.display="none",n.style.height="100%"),b||(o.style.flexBasis="100%",i.style.display="none",fe?.destroy(!0),fe=null),f||(i.style.flexBasis="100%",o.style.display="none",a.style.display="none",p.style.display="none",fe?.destroy(!0),fe=null),(e.mode==="editor"||e.mode==="codeblock")&&(c.style.visibility="hidden",p.style.visibility="hidden"),e.mode==="codeblock"&&(m.style.display="none"),e.mode==="result"&&(["full","open","closed"].includes(re?.getStatus()||"")||re?.hide()),e.mode==="full"&&!fe&&(fe=uo()),window.dispatchEvent(new Event(Ge.resizeEditor))},fi=(e="markup",t=!1)=>{let s=so();(()=>Array.from(s).map(a=>a.dataset.editor).includes(e))()||(e=s[0].dataset.editor||"markup"),s.forEach(a=>a.classList.remove("active")),document.getElementById(e+"-selector")?.classList.add("active"),ph().forEach(a=>a.style.display="none");let o=document.getElementById(e);o.style.display="block",o.style.visibility="visible",!J&&!t&&B[e]?.focus(),t||Me({...E(),activeEditor:e}),$r(),(px||me.view!=="result")&&fe?.show("code"),MU(e)},MU=e=>{document.querySelectorAll("#editor-status > span[data-status]").forEach(s=>{s.dataset.status===e?(s.style.position="unset",s.style.width="unset",s.style.overflow="unset"):(s.style.position="absolute",s.style.width="0",s.style.overflow="hidden")})},UU=()=>{let e=oh();e&&(e.textContent=""),document.querySelectorAll("#editor-status > span[data-status]").forEach(s=>{s.innerHTML=""})},mx=()=>{Wc&&Wc.dispose(),ft?.script&&["javascript","typescript"].includes(gs(ft.script))&&B.script&&typeof B.script.addTypes=="function"&&(Wc=B.script.addTypes({content:E().script.content+`
{}`,filename:"script.js"}))},fx=e=>{if(E().readonly||e==="blockly"||e==="richtext")return fn().classList.add("hidden"),!1;fn().classList.remove("hidden");let t=Gs(e);return t?.formatter||t?.parser?Qs().classList.remove("disabled"):Qs().classList.add("disabled"),!0},ep=({editor:e,code:t})=>{let s=r=>r.trim().startsWith("<?php")?r:`<?php
`+r;if(t)return s(t);e?.getLanguage()==="php"&&e.setValue(s(e.getValue()))},hx=async e=>{!te(e)||!e||!qe(e,E())||(fx(e),Object.keys(cs).forEach(async s=>{await cs[s]?.show(Object.values(ft||[]).includes(s),{baseUrl:oe,editors:B,config:E(),html:ge().markup.compiled||E().markup.content||"",eventsManager:I})}))},tp=async(e,t,s=!1)=>{let r=te(e);if(!r||!e||!qe(e,E()))return;Gs(e)?.largeDownload&&mt.info(`Loading ${Ju(e)}. This may take a while!`);let n=B[r];n.setLanguage(e,t??(E()[r].content||"")),ft&&(ft[r]=e),di(r,e),fi(r,s),ep({editor:B.script}),!J&&!s&&setTimeout(()=>n.focus()),await ls.load([e],E()),Nr.getFormatFn(e).then(i=>n.registerFormatter(i)),s||(Me({...E(),activeEditor:r}),E().autoupdate&&await st()),await $s(),ip(),mx(),Zc(B,E()),await hx(e)},AU=(e,t)=>{let s=t[e];s.addKeyBinding("run",s.keyCodes.ShiftEnter,async()=>{await st()})},$r=()=>{let e=s=>{let r={markup:"html",style:"css",script:"javascript"},n=We(E()[s].language)?.compiledCodeLanguage;return{language:n||r[s],label:n==="json"?"JSON":V(n)||n||r[s]}},t={markup:e("markup"),style:e("style"),script:e("script")};if(re&&re.compiled){let s=ge();Object.keys(s).forEach(r=>{if(r!==E().activeEditor)return;let n=s[r].modified||s[r].compiled||"";r==="script"&&E().script.language==="php"&&(n=ep({code:n})||`<?php
`),re?.compiled?.update(t[r].language,n,t[r].label)})}},sp=async({sourceEditor:e=void 0,forExport:t=!1,template:s=If,singleFile:r=!0,runTests:n=!1})=>{Ds();let i=E(),o=Je(i),a=i.markup.content||"",l=i.style.content||"",c=i.script.content||"",p=i.tests?.content||"",m=i.markup.language,y=i.style.language,b=i.script.language,f=i.tests?.language||"typescript",u=We(b)?.scriptType,d=i.processors.find(ve=>Oe.find(be=>ve===be.name&&be.needsHTML))&&(a!==ge().markup.content||c!==ge().script.content),v=i.tests?.language===ge().tests?.language&&i.tests?.content===ge().tests?.content&&ge().tests?.compiled,S=await ls.compile(a,m,i,{}),w=S.code,g=await Promise.all([ls.compile(l,y,i,{html:w,forceCompile:d}),ls.compile(c,b,i,{blockly:b==="blockly"?await cs.blockly?.getContent({baseUrl:oe,editors:B,config:E(),html:w,eventsManager:I}):{}}),n?v?Promise.resolve(ge().tests?.compiled||""):ls.compile(p,f,i,{}):Promise.resolve(gt(ge().tests?.compiled||""))]),_={...S.info},[A,L,H]=g.map(ve=>{let{code:be,info:xt}=gt(ve);return _={..._,...xt},be});_.modifiedHTML&&(w=_.modifiedHTML);let $={...o,markup:{...o.markup,compiled:w},style:{...o.style,compiled:A},script:{...o.script,compiled:i.customSettings.convertCommonjs===!1||u&&u!=="module"?L:Im(L)},tests:{language:f,...o.tests,compiled:H}},Ce=await Kf({code:$,config:i,forExport:t,template:s,baseUrl:oe,singleFile:r,runTests:n,compileInfo:_}),Ue=e==="style"&&!_.cssModules;return oo({...ge(),...$,result:Ce,styleOnlyUpdate:Ue}),r&&(ui.isBroadcasting&&VU(),Jc&&!Jc.closed&&Jc?.postMessage({result:Ce},location.origin)),Ce},Br=e=>{let t=uh();t&&(e===!0?t.style.display="unset":t.style.display="none")},PU=()=>{let e=Jt();if(!e?.contentWindow)return;Br(!0),e.contentWindow.postMessage({flush:!0},"*");let t={markup:We(E().markup.language)?.compiledCodeLanguage||"html",style:We(E().style.language)?.compiledCodeLanguage||"css",script:We(E().script.language)?.compiledCodeLanguage||"javascript"},s={html:"<!-- loading -->",css:"/* loading */",javascript:"// loading",wat:";; loading"};er("markup",t.markup,s[t.markup]||"html"),er("style",t.style,s[t.style]||"css"),er("script",t.script,s[t.script]||"javascript"),oo({...ge(),tests:{language:"javascript",content:"",compiled:""}}),$r(),re?.tests?.clearTests()},OU=(e=!1)=>{let t=Ys();if(!t)return;let s=F.title;e&&t.textContent?.trim()===""&&(t.textContent=s);let r=t.textContent||s;r!==E().title&&(Me({...E(),title:r}),E().autosave&&Fr(!qt,!1),gx(),$s(),ip())},gx=()=>{let e=E().title,t=location.hostname.startsWith("dev.livecodes.io")?"(dev) ":location.hostname.startsWith("127.0.0.1")||location.hostname.startsWith("localhost")?"(local) ":"";parent.document.title=t+(e&&e!=="Untitled Project"?e+" - ":"")+"LiveCodes"},_x=()=>{let e=to(),t=E();t.scripts.length>0||t.stylesheets.length>0||t.cssPreset?(e.classList.add("active"),e.style.display="unset"):(e.classList.remove("active"),J&&(e.style.display="none"))},st=async(e,t=!1)=>{Br(!0);let s=await sp({sourceEditor:e,runTests:t});await ux(Es(),s),re?.console?.clear(),$r()},yx=()=>st(void 0,!0),vx=(e,t=!1)=>{t&&!J?parent.history.pushState(null,"",e):parent.history.replaceState(null,"",e)},rp=async(e=!0)=>{if(e)await Promise.all([B.markup.format(),B.style.format(),B.script.format()]);else{let t=wt();await t.format(),t.focus()}Ds()},Fr=async(e=!1,t=!0)=>{t&&OU(!0),B&&E().formatOnsave&&await rp(!0);let s=xs(E());qt?await ae.projects?.updateItem(qt,s):qt=await ae.projects?.addItem(s)||"",await $s(),e&&mt.success("Project locally saved to device!"),await np(!1)},qU=async()=>{qt="",Ns({...E(),title:E().title+" (fork)"}),await Fr(),mt.success("Forked as a new project")},np=async(e=!1,t=!0,s=!0,r=!1,n=!1)=>{let i=t?Je(E()):E(),o=e?"?x=id/"+await Am.shareProject({...i,result:r?ge().result:void 0}):"?x=code/"+on(JSON.stringify(i)),a=(location.origin+location.pathname).split("/").slice(0,-1).join("/")+"/",c=(n?li.getAppUrl():a)+o;return s&&vx(a+o,!0),{title:(i.title!==F.title?i.title+" - ":"")+"LiveCodes",url:c}},Ds=()=>{["markup","style","script"].forEach(t=>{Me({...E(),[t]:{...E()[t],language:Yc(t),content:B[t].getValue()}})})},Ns=async(e,t,s=!0)=>{Bs=!0;let r=Je({...F,...Gt(e)});Me({...E(),...r}),await mi({config:E()}),ps(),s&&PU();let n=Ys();n.textContent=E().title,gx(),vx(t||location.origin+location.pathname,!0),Ot.x=0,Ot.y=0,await Tx(!0),Bs=!1},RU=(e,t=!0)=>{let s=Ki({...E(),...e??Ki(F)});Me({...E(),...s}),t&&ae.userConfig?.setValue({...ae.userConfig.getValue(),...e})},cx=(e=!0)=>{if(J)return;let t=ae.userConfig?.getValue();Me(xs({...E(),...t})),e&&(ap(E()),Ex(E().theme),Sx(!0))},IU=async e=>{let t=(await ae.templates?.getItem(e))?.config;t&&await Ns(t)},ip=()=>{let e=new Event(Ge.change);document.dispatchEvent(e),parent.dispatchEvent(e)},$s=async()=>{if(J)return;Ds();let e=qt&&(await ae.projects?.getItem(qt||""))?.config;Xc=Bs||!!(e&&JSON.stringify(Je(e))===JSON.stringify(Je(E())));let t=Ys();Xc?(t.classList.remove("unsaved"),ps(!0)):(t.classList.add("unsaved"),ps())},HU=(e=!1)=>Xc||J?Promise.resolve(!0):new Promise(t=>{let s=document.createElement("div");s.innerHTML=Hf,Se.show(s.firstChild,{size:"small"}),I.addEventListener(mh(),"click",async()=>{await Fr(!0),e||Se.close(),t(!0)}),I.addEventListener(fh(),"click",()=>{e||Se.close(),t(!0)}),I.addEventListener(hh(),"click",()=>{e||Se.close(),t(!1)})}),BU=(e,t)=>()=>HU(!0).then(s=>{setTimeout(s?e:typeof t=="function"?t:()=>{Se.close()})}),ps=(e=!1)=>{J||(ae.recover?.clear(),!(e||!E().recoverUnsaved)&&ae.recover?.setValue({config:Je(E()),lastModified:Date.now()}))},DU=(e=!1)=>{if(!E().recoverUnsaved||J)return Promise.resolve("recover disabled");let t=ae.recover?.getValue(),s=t?.config;if(!t||!s)return Promise.resolve("no unsaved project");let r=s.title;return new Promise(n=>{let i=Ih();if(e)i.style.display="unset";else{let a=document.createElement("div");a.innerHTML=Bf,Se.show(a.firstChild,{size:"small",isAsync:!0})}ro().textContent=r,ro().title=r,vh().textContent=new Date(t.lastModified).toLocaleString();let o=bh();I.addEventListener(gh(),"click",async()=>{await Ns(s),await $s(),Se.close(),n("recover")}),I.addEventListener(_h(),"click",async()=>{ae.projects&&(await ae.projects.addItem(s),mt.success(`Project "${r}" saved to device.`)),e?i.style.maxHeight="0":Se.close(),ps(!0),n("save and continue")}),I.addEventListener(yh(),"click",()=>{e?i.style.maxHeight="0":Se.close(),ps(!0),n("cancel recover")}),I.addEventListener(o,"change",()=>{RU({recoverUnsaved:!o.checked}),ap(E())})})},NU=async e=>{[B.markup,B.style].forEach((t,s)=>{t.monaco&&s>0||t.changeSettings(Ls(e))})},$U=async()=>pi||(pi=await Ji(E(),oe),pi),bx=async()=>{if(Hs)return;Hs=km(J);let e=await Hs.getUser();e&&Nh(e)};var xx=async()=>{let e=await Hs?.getUser();if(!e||!ae.userData)return null;let t=e.username||e.uid;return(await ae.userData.getItem(t))?.data||null};var Dr=()=>ae.appData?.getValue()||null,hi=e=>{ae.appData?.setValue({...ae.appData.getValue(),...e})};var Sx=async(e=!1)=>{if(J)return;let t=(await xx())?.sync?.lastSync;(t||e)&&(await import(oe+"sync-ui.d0439fd0137e0c66038590b908e110df.js")).updateSyncStatus({lastSync:t})},FU=(e,t)=>{let s=Kc.find(r=>r.screen.toLowerCase()===e.toLowerCase());s?s.show=t:Kc.push({screen:e.toLowerCase(),show:t})},op=async(e,t)=>{let s=Kc.find(n=>n.screen.toLowerCase()===e.toLowerCase());if(!s)return;await s.show(t),document.querySelector("#modal").firstElementChild?.click()},zU=()=>{let e=Object.fromEntries(new URLSearchParams(parent.location.search)),t=e.new===""?"new":e.screen;t&&op(t)},Lx=()=>[...Object.values(B),re?.console?.getEditor?.(),re?.compiled?.getEditor?.()],Ex=e=>{let t=["light","dark"],s=document.querySelector(":root");s?.classList.remove(...t),s?.classList.add(e),Lx().forEach(r=>{r?.setTheme(e),cs[r?.getLanguage()]?.setTheme(e)})},ap=e=>{if(Uh().forEach(y=>{let b=y.dataset.processor;b&&(y.checked=e.processors.includes(b))}),J)return;let s=Eh();s.checked=e.autoupdate;let r=kh(),n=Th();n.value=String(e.delay),r.textContent=String(e.delay/1e3);let i=Ch();i.checked=e.autosave;let o=jh();xx().then(y=>{o.checked=y?.sync?.autosync||!1});let a=Mh();a.checked=e.formatOnsave;let l=Ah();l.checked=e.theme==="dark";let c=Oh();c.checked=e.recoverUnsaved;let p=Ph();p.checked=e.welcome;let m=qh();m.checked=e.showSpacing,Rh().forEach(y=>{y.classList.remove("active"),e.cssPreset===y.dataset.preset&&y.classList.add("active"),!e.cssPreset&&y.dataset.preset==="none"&&y.classList.add("active")})},WU=e=>{Se.show(e,{size:"small"})},GU=async(e,t=!0)=>{let s=await $U(),{title:r,thumbnail:n,...i}=s.filter(o=>o.name===e)?.[0]||{};i?(hi({recentTemplates:[{name:e,title:r},...Dr()?.recentTemplates?.filter(a=>a.name!==e)||[]].slice(0,5)}),(t?BU:a=>async()=>a())(()=>{qt="",Ns({...F,...i},"?template="+e)})().finally(()=>{Se.close()})):mt.error("Failed loading template")},JU=()=>{let e=E(),t=ao();return{...e,...t,markup:{...e.markup,...t.markup,position:B.markup.getPosition()},style:{...e.style,...t.style,position:B.style.getPosition()},script:{...e.script,...t.script,position:B.script.getPosition()},tools:{enabled:e.tools.enabled,active:re?.getActiveTool()??"",status:re?.getStatus()??""}}},kx=(e=1)=>{let t=Jt(),s=dh();!t||!s||(t.classList.remove("zoom25"),t.classList.remove("zoom50"),e===.5&&t.classList.add("zoom50"),e===.25&&t.classList.add("zoom25"),s.textContent=String(e))},VU=async({serverUrl:e,channel:t,channelToken:s,broadcastSource:r}={})=>{if(J)return;let n=Dr()?.broadcast;if(e||(e=n?.serverUrl),!e)return;r==null&&(r=ui.broadcastSource),t==null&&(t=ui.channel),s==null&&(s=ui.channelToken);let i=n?.userToken,{result:o,...a}=JU();try{let l=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({result:o,...r?{data:a}:{},...t?{channel:t}:{},...s?{channelToken:s}:{},...i?{userToken:i}:{}})});return l.ok?l.json():void 0}catch{return}};var KU=(e=!0)=>{let t="4",s="0.0.2",r="fe430fb",n="https://github.com/live-codes/livecodes",i=li.getAppUrl(),o=li.getSDKUrl();return e&&(console.log(`App Version: ${t} (${n}/releases/tag/v${t})`),console.log(`SDK Version: ${s} (https://www.npmjs.com/package/livecodes/v/${s})`),console.log(`Git commit: ${r} (${n}/commit/${r})`),console.log(`App Permanent URL: ${i}`),console.log(`SDK Permanent URL: ${o}`)),{appVersion:t,sdkVersion:s,commitSHA:r,appUrl:i,sdkUrl:o}},Vc=()=>{Object.values(B).forEach(e=>{setTimeout(()=>{e.layout&&e.layout()})})};var XU=()=>{Vc(),I.addEventListener(window,"resize",Vc,!1),I.addEventListener(window,Ge.resizeEditor,Vc,!1)},YU=()=>{let e=Yi();if(!e)return;let t=document.createElement("div");t.id="size-label",e.appendChild(t);let s=yi(()=>{setTimeout(()=>{t.classList.remove("visible"),setTimeout(()=>{t.style.display="none"},100)},1e3)},1e3);I.addEventListener(window,"message",r=>{let n=Jt();if(!t||!n||r.source!==n.contentWindow||r.data.type!=="resize")return;let i=r.data.sizes;t.innerHTML=`${i.width} x ${i.height}`,t.style.display="block",t.classList.add("visible"),s()})},QU=()=>{I.addEventListener(window,"message",e=>{let t=Jt();if(!t||e.source!==t.contentWindow||e.data.type!=="scroll")return;let s=e.data.position;Ot.x=Number(s.x)||0,Ot.y=Number(s.y)||0})},ZU=()=>{so().forEach(e=>{I.addEventListener(e,"click",()=>{fi(e.dataset.editor),hi({language:Yc(e.dataset.editor)}),ps()},!1)})},eA=()=>{E().allowLangChange?wh().forEach(e=>{I.addEventListener(e,"mousedown",async()=>{await tp(e.dataset.lang),hi({language:e.dataset.lang})},!1)}):xh().forEach(e=>{e.style.display="none"})},tA=()=>{let e=async(s,r)=>{Ds(),mx();let n=!!(SU&&E().tests?.content);(E().autoupdate||n)&&!r&&await st(s,n),E().markup.content!==ge().markup.content&&await sp({sourceEditor:s});for(let i of Object.keys(cs))E()[s].language===i&&await cs[i]?.show(!0,{baseUrl:oe,editors:B,config:E(),html:ge().markup.compiled||E().markup.content||"",eventsManager:I});E().autosave&&await Fr(),ip(),Zc(B,E())},t=s=>yi(async()=>{await e(s,Bs)},()=>E().delay??F.delay);Object.keys(B).forEach(s=>{B[s].onContentChanged(t(s)),B[s].onContentChanged($s)})},sA=()=>{let e=s=>navigator.platform.match("Mac")?s.metaKey:s.ctrlKey,t=async s=>{if(!s)return;let r=wt();if(e(s)&&s.key.toLowerCase()==="p"&&r.monaco){s.preventDefault(),r.monaco.trigger("anyString","editor.action.quickCommand");return}if(e(s)&&s.key.toLowerCase()==="d"){s.preventDefault();return}if(!J){if(e(s)&&s.shiftKey&&s.key.toLowerCase()==="s"){s.preventDefault(),await qU();return}if(e(s)&&s.key.toLowerCase()==="s"){s.preventDefault(),await Fr(!0);return}if(e(s)&&s.altKey&&s.key.toLowerCase()==="t"){s.preventDefault(),fe?.show("output"),re?.setActiveTool("tests"),re?.getStatus()==="closed"&&re?.open(),await yx();return}if(s.shiftKey&&s.key==="Enter"){s.preventDefault(),fe?.show("output"),await st();return}}};I.addEventListener(window,"keydown",t,!0)},rA=()=>{if(J||E().mode==="result")return;let e=Qi();I.addEventListener(e,"click",async t=>{t.preventDefault(),parent.postMessage({args:"home"},location.origin)})},nA=()=>{let e=async()=>{fe?.show("output"),await st()};I.addEventListener(Zi(),"click",e),I.addEventListener(eo(),"click",e)},iA=()=>{I.addEventListener(lh(),"click",()=>fe?.show("output",!0))},oA=()=>{fx(wt().getLanguage())&&(I.addEventListener(rh(),"click",()=>{bi(wt().getValue())?mt.success("Code copied to clipboard"):mt.error("Failed to copy code")}),I.addEventListener(nh(),"click",()=>{let e=wt();e.undo(),e.focus()}),I.addEventListener(ih(),"click",()=>{let e=wt();e.redo(),e.focus()}),I.addEventListener(Qs(),"click",async()=>{await rp(!1)}),I.addEventListener(ah(),"click",()=>{op("editor-settings",{scrollToSelector:'label[data-name="editorMode"]'})}))},aA=()=>{let e=Sh(),t=Oe.filter(s=>Ft(s.name,E())).filter(s=>!s.hidden).map(s=>({name:s.name,title:s.title}));!e||t.length===0||t.forEach(s=>{let r=$m(s);e.append(r),I.addEventListener(r,"mousedown",async n=>{n.preventDefault(),n.stopPropagation();let i=r.querySelector("input");if(!i)return;i.checked=!i.checked;let o=i.dataset.processor;!o||!t.find(a=>a.name===o)||(Me({...E(),processors:[...i.checked?[...E().processors,o]:E().processors.filter(a=>a!==o)]}),E().autoupdate&&await st())},!1),I.addEventListener(r,"click",async n=>{n.preventDefault(),n.stopPropagation()})})};var lA=()=>{let e=async()=>{let t=async()=>{_x(),await $s(),Se.close(),E().autoupdate&&await st()};Se.show(Dh()),(await import(oe+"resources.879931acfbb97918dd80fcffe442a301.js")).createExternalResourcesUI({baseUrl:oe,modal:Se,eventsManager:I,deps:{getConfig:E,setConfig:Me,loadResources:t}})};I.addEventListener(Lh(),"click",e,!1),I.addEventListener(to(),"click",e,!1),FU("resources",e)};var cA=()=>{I.addEventListener(window,"message",e=>{let t=Jt();if(!t||e.source!==t.contentWindow)return;e.data.type==="loading"&&Br(e.data.payload);let s=e.data.payload?.language;if(e.data.type==="compiled"&&s&&Qc().includes(s)){let r=te(s);if(!r)return;er(r,s,e.data.payload.content||""),$r()}})};var pA=async()=>{if(!J)return;let e=ch(),t=e.querySelector("img"),s=(await import(au)).default;if(!s.fullscreenEnabled){e.style.visibility="hidden";return}I.addEventListener(s,"fullscreenchange",async()=>{if(!s.fullscreenElement){t.src=t.src.replace("collapse.svg","expand.svg"),e.dataset.hint="Full Screen";return}t.src=t.src.replace("expand.svg","collapse.svg"),e.dataset.hint="Exit Full Screen"}),I.addEventListener(e,"click",async()=>{if(s.fullscreenElement){await s.exitFullscreen();return}await s.requestFullscreen(document.body)})};var uA=()=>{rA(),XU(),YU(),QU(),ZU(),eA(),tA(),sA(),nA(),iA(),oA(),aA(),cA(),J&&(lA(),pA())};var dA=(e,t)=>{document.body.classList.add("embed"),e.mode==="result"&&document.body.classList.add("result"),(e.mode==="editor"||e.mode==="codeblock")&&document.body.classList.add("no-result");let s=Qi();s.classList.add("hint--bottom-left"),s.dataset.hint="Edit in LiveCodes \u{1F855}",s.title="",t.addEventListener(s,"click",async r=>{r.preventDefault(),window.open((await np(!1,!0,!1)).url,"_blank")})},mA=()=>{Me({...E(),editor:"codejar",emmet:!1,tools:{enabled:[],active:"",status:"none"}}),Qs().style.display="none"},fA=({config:e,isEmbed:t,isLite:s})=>{e.mode==="full"&&(me.view==="editor"&&fe?.show("code",!0),me.view==="result"&&fe?.show("output",!0)),e.mode==="codeblock"&&Me({...e,readonly:!0}),(e.mode==="editor"||e.mode==="codeblock"||e.mode==="result")&&(fe?.destroy(),fe=null),s&&mA(),(t||e.mode==="result")&&dA(e,I)},mi=async e=>{let{config:t=F,configUrl:s,template:r,url:n}=e,i=["markup","style","script"],o=b=>i.filter(f=>b[f]?.contentUrl&&!b[f]?.content).length>0;if(!s&&!r&&!n&&!o(t))return!1;let a=document.createElement("div");a.classList.add("modal-message"),a.innerHTML="Loading Project...",Se.show(a,{size:"small",isAsync:!0});let l={},c={},p={},m={};if(r){let b=await Df(r,t,oe);b?l=Gt(b):mt.error("Could not load template: "+r)}if(n){let b=n;if(n.startsWith("http")||n.startsWith("data"))try{b=new URL(n).href}catch{b=decodeURIComponent(n)}let f;Gf(b)&&!J&&(await bx(),f=await Hs?.getUser()),c=await(await import(oe+"import.8c13de90b03c9f9d79034358d3f2b924.js")).importCode(b,dn(),E(),f),Object.keys(c).length===0&&mt.error("Invalid import URL")}if(o(t)){let b=await Promise.all(i.map(f=>{let u=t[f].contentUrl;return u&&xi(u)&&!t[f].content?fetch(u).then(d=>d.text()).then(d=>({...t[f],content:d})):Promise.resolve(t[f])}));p={markup:b[0],style:b[1],script:b[2]}}let y=xi(s);return y&&(m=Gt(await fetch(y).then(b=>b.json()).catch(()=>({}))),o(m))?mi({config:{...t,...m}}):(await Ns(xs({...t,...l,...c,...p,...m}),parent.location.href,!1),Se.close(),!0)},hA=async()=>{if(J||me["no-defaults"]||me.languages||me.template||me.config||me.active||me.activeEditor||V(me.lang)||V(me.language))return;for(let s of Object.keys(me))if(V(s))return;if(E().welcome&&!me.screen||me.screen==="welcome"){op("welcome");return}let e=Dr()?.defaultTemplate;if(e){mt.info("Loading default template"),await IU(e);return}let t=Dr()?.language;t&&(Bs=!0,await tp(t),Bs=!1),ps(!0)},Tx=async(e=!1)=>{e&&await jU(B,E()),ep({editor:B.script}),Br(!0),kx(E().zoom),await LU(E()),ap(E()),re?.console?.clear(),J||setTimeout(()=>wt().focus()),_x(),$r(),Zc(B,E()),ls.load(Object.values(ft||{}),E()).then(()=>{if(!E().autoupdate){Br(!1);return}setTimeout(()=>{re?.getActiveTool()==="tests"&&["open","full"].includes(re?.getStatus())?st(void 0,!0):st()})}),Nr.load(Qc()),J&&!E().tests?.content?.trim()&&re?.disableTool("tests")},Cx=async(e,t)=>{let s=e?.config??{};oe=e?.baseUrl??"/livecodes/",ci=e?.isLite??!1,J=ci||(e?.isEmbed??!1),await _m(ae,J),cx(!1),Me(xs({...E(),...s})),fA({config:E(),isEmbed:J,isLite:ci}),ls=await Bm({config:E(),baseUrl:oe,eventsManager:I}),Nr=Ym(E(),oe,ci),cs=Km({baseUrl:oe,eventsManager:I}),Nm(E(),oe,I,WU,GU,mi),await CU(E()),uA(),await t?.(),cx(!0),EU(),await ux(Es()),dx(E()),zU(),Ex(E().theme),J||(bx().then(()=>Sx()),DU()),mi({config:E(),configUrl:me.config,template:me.template,url:me.x||parent.location.hash.substring(1)}).then(async r=>{r||(await Tx(),await hA()),J&&parent.dispatchEvent(new Event(Ge.ready)),px=!0}),NU(E())},jx=()=>{let e=async(f=!1)=>(await np(f,!0,!1)).url,t=async(f=!1)=>{Ds();let u=f?Je(E()):E();return JSON.parse(JSON.stringify(u))},s=async f=>{let u={...E(),...xs(f)};return u.mode!==E().mode&&dx(u),Me(u),await Ns(u),u},r=async()=>(Ds(),Bh(ge(),Je(E()))||await sp({}),JSON.parse(JSON.stringify(ao()))),n=async(f,{full:u=!1,line:d,column:v,zoom:S}={})=>{if(f==="result")fe?.show("output",u),re?.close(),S&&kx(S);else if(f==="console"||f==="compiled"||f==="tests")fe?.show("output"),re?.setActiveTool(f),u?re?.maximize():re?.open();else if(Object.keys(B).includes(f)){if(fi(f),fe?.show("code",u),typeof d=="number"&&d>0){let w=typeof v=="number"&&v>-1?v:0;wt().setPosition({lineNumber:d,column:w}),wt().focus()}}else throw new Error("Invalid panel id")},i=()=>new Promise(f=>{I.addEventListener(document,Ge.testResults,u=>{f({results:u.detail?.results||[]})},{once:!0}),yx()}),o=f=>{let u=async function(){f({code:await r(),config:await t()})};return I.addEventListener(document,Ge.change,u),{remove:()=>{I.removeEventListener(document,Ge.change,u)}}},a=async(f,...u)=>{if(f==="setBroadcastToken"){if(J)return{error:"Command unavailable for embeds"};let d=Dr()?.broadcast;if(!d)return{error:"Command unavailable"};let v=u[0];return typeof v!="string"?{error:"Invalid token!"}:(hi({broadcast:{...d,userToken:v}}),{output:"Broadcast user token set successfully"})}return f==="showVersion"?{output:KU()}:{error:"Invalid command!"}},l=async()=>{Lx().forEach(f=>f?.destroy()),I.removeEventListeners(),Object.values(ae).forEach(f=>f?.unsubscribeAll?.()),parent.dispatchEvent(new Event(Ge.destroy)),Nr?.destroy(),document.body.innerHTML="",document.head.innerHTML="",Gc=!0},c="Cannot call API methods after calling `destroy()`.",p=()=>Promise.reject(c),m=()=>{throw new Error(c)},y=f=>Gc?p():f(),b=f=>Gc?m():f();return{run:()=>y(()=>st()),format:f=>y(()=>rp(f)),getShareUrl:f=>y(()=>e(f)),getConfig:f=>y(()=>t(f)),setConfig:f=>y(()=>s(f)),getCode:()=>y(()=>r()),show:(f,u)=>y(()=>n(f,u)),runTests:()=>y(()=>i()),onChange:f=>b(()=>o(f)),exec:(f,...u)=>y(()=>a(f,...u)),destroy:()=>y(()=>l())}};var T9=async(e,t)=>(await Cx({config:e,baseUrl:t,isEmbed:!0,isLite:!0}),jx());export{T9 as app};
//# sourceMappingURL=lite.js.map
