var Kx=Object.create;var gp=Object.defineProperty;var Xx=Object.getOwnPropertyDescriptor;var Yx=Object.getOwnPropertyNames;var Qx=Object.getPrototypeOf,Zx=Object.prototype.hasOwnProperty;var v=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var e0=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Yx(t))!Zx.call(e,n)&&n!==s&&gp(e,n,{get:()=>t[n],enumerable:!(r=Xx(t,n))||r.enumerable});return e};var _p=(e,t,s)=>(s=e!=null?Kx(Qx(e)):{},e0(t||!e||!e.__esModule?gp(s,"default",{value:e,enumerable:!0}):s,e));var km=v((iH,un)=>{var Em=function(){var e=String.fromCharCode,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",r={};function n(o,a){if(!r[o]){r[o]={};for(var l=0;l<o.length;l++)r[o][o.charAt(l)]=l}return r[o][a]}var i={compressToBase64:function(o){if(o==null)return"";var a=i._compress(o,6,function(l){return t.charAt(l)});switch(a.length%4){default:case 0:return a;case 1:return a+"===";case 2:return a+"==";case 3:return a+"="}},decompressFromBase64:function(o){return o==null?"":o==""?null:i._decompress(o.length,32,function(a){return n(t,o.charAt(a))})},compressToUTF16:function(o){return o==null?"":i._compress(o,15,function(a){return e(a+32)})+" "},decompressFromUTF16:function(o){return o==null?"":o==""?null:i._decompress(o.length,16384,function(a){return o.charCodeAt(a)-32})},compressToUint8Array:function(o){for(var a=i.compress(o),l=new Uint8Array(a.length*2),c=0,p=a.length;c<p;c++){var m=a.charCodeAt(c);l[c*2]=m>>>8,l[c*2+1]=m%256}return l},decompressFromUint8Array:function(o){if(o==null)return i.decompress(o);for(var a=new Array(o.length/2),l=0,c=a.length;l<c;l++)a[l]=o[l*2]*256+o[l*2+1];var p=[];return a.forEach(function(m){p.push(e(m))}),i.decompress(p.join(""))},compressToEncodedURIComponent:function(o){return o==null?"":i._compress(o,6,function(a){return s.charAt(a)})},decompressFromEncodedURIComponent:function(o){return o==null?"":o==""?null:(o=o.replace(/ /g,"+"),i._decompress(o.length,32,function(a){return n(s,o.charAt(a))}))},compress:function(o){return i._compress(o,16,function(a){return e(a)})},_compress:function(o,a,l){if(o==null)return"";var c,p,m={},g={},y="",h="",u="",d=2,b=3,x=2,w=[],_=0,f=0,T;for(T=0;T<o.length;T+=1)if(y=o.charAt(T),Object.prototype.hasOwnProperty.call(m,y)||(m[y]=b++,g[y]=!0),h=u+y,Object.prototype.hasOwnProperty.call(m,h))u=h;else{if(Object.prototype.hasOwnProperty.call(g,u)){if(u.charCodeAt(0)<256){for(c=0;c<x;c++)_=_<<1,f==a-1?(f=0,w.push(l(_)),_=0):f++;for(p=u.charCodeAt(0),c=0;c<8;c++)_=_<<1|p&1,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=p>>1}else{for(p=1,c=0;c<x;c++)_=_<<1|p,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=0;for(p=u.charCodeAt(0),c=0;c<16;c++)_=_<<1|p&1,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=p>>1}d--,d==0&&(d=Math.pow(2,x),x++),delete g[u]}else for(p=m[u],c=0;c<x;c++)_=_<<1|p&1,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=p>>1;d--,d==0&&(d=Math.pow(2,x),x++),m[h]=b++,u=String(y)}if(u!==""){if(Object.prototype.hasOwnProperty.call(g,u)){if(u.charCodeAt(0)<256){for(c=0;c<x;c++)_=_<<1,f==a-1?(f=0,w.push(l(_)),_=0):f++;for(p=u.charCodeAt(0),c=0;c<8;c++)_=_<<1|p&1,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=p>>1}else{for(p=1,c=0;c<x;c++)_=_<<1|p,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=0;for(p=u.charCodeAt(0),c=0;c<16;c++)_=_<<1|p&1,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=p>>1}d--,d==0&&(d=Math.pow(2,x),x++),delete g[u]}else for(p=m[u],c=0;c<x;c++)_=_<<1|p&1,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=p>>1;d--,d==0&&(d=Math.pow(2,x),x++)}for(p=2,c=0;c<x;c++)_=_<<1|p&1,f==a-1?(f=0,w.push(l(_)),_=0):f++,p=p>>1;for(;;)if(_=_<<1,f==a-1){w.push(l(_));break}else f++;return w.join("")},decompress:function(o){return o==null?"":o==""?null:i._decompress(o.length,32768,function(a){return o.charCodeAt(a)})},_decompress:function(o,a,l){var c=[],p,m=4,g=4,y=3,h="",u=[],d,b,x,w,_,f,T,L={val:l(0),position:a,index:1};for(d=0;d<3;d+=1)c[d]=d;for(x=0,_=Math.pow(2,2),f=1;f!=_;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),x|=(w>0?1:0)*f,f<<=1;switch(p=x){case 0:for(x=0,_=Math.pow(2,8),f=1;f!=_;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),x|=(w>0?1:0)*f,f<<=1;T=e(x);break;case 1:for(x=0,_=Math.pow(2,16),f=1;f!=_;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),x|=(w>0?1:0)*f,f<<=1;T=e(x);break;case 2:return""}for(c[3]=T,b=T,u.push(T);;){if(L.index>o)return"";for(x=0,_=Math.pow(2,y),f=1;f!=_;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),x|=(w>0?1:0)*f,f<<=1;switch(T=x){case 0:for(x=0,_=Math.pow(2,8),f=1;f!=_;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),x|=(w>0?1:0)*f,f<<=1;c[g++]=e(x),T=g-1,m--;break;case 1:for(x=0,_=Math.pow(2,16),f=1;f!=_;)w=L.val&L.position,L.position>>=1,L.position==0&&(L.position=a,L.val=l(L.index++)),x|=(w>0?1:0)*f,f<<=1;c[g++]=e(x),T=g-1,m--;break;case 2:return u.join("")}if(m==0&&(m=Math.pow(2,y),y++),c[T])h=c[T];else if(T===g)h=b+b.charAt(0);else return null;u.push(h),c[g++]=b+h.charAt(0),m--,b=h,m==0&&(m=Math.pow(2,y),y++)}}};return i}();typeof define=="function"&&define.amd?define(function(){return Em}):typeof un<"u"&&un!=null&&(un.exports=Em)});var As=v((vo,tg)=>{var lL=Object.prototype.hasOwnProperty;vo=function(e,t){return lL.call(e,t)};tg.exports=vo});var Re=v((En,sg)=>{var cL=As();Object.keys?En=Object.keys:En=function(e){var t=[];for(var s in e)cL(e,s)&&t.push(s);return t};sg.exports=En});var Tn=v((kn,ig)=>{var pL=Re();kn=function(e){return uL.test(e)?e.replace(dL,mL):e};var rg=kn.map={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},ng="(?:"+pL(rg).join("|")+")",uL=new RegExp(ng),dL=new RegExp(ng,"g"),mL=function(e){return rg[e]};ig.exports=kn});var ot=v((bo,og)=>{bo=function(e){return e==null?"":e.toString()};og.exports=bo});var lg=v((wo,ag)=>{wo=function(e,t,s){return Array.prototype.indexOf.call(e,t,s)};ag.exports=wo});var ft=v((xo,cg)=>{var fL=Object.prototype.toString;xo=function(e){return fL.call(e)};cg.exports=xo});var ie=v((So,pg)=>{var hL=ft();So=function(e){return hL(e)==="[object String]"};pg.exports=So});var Bt=v((Lo,ug)=>{var gL=ft();Lo=function(e){return gL(e)==="[object Number]"};ug.exports=Lo});var Ge=v((Eo,dg)=>{var _L=ft();Eo=function(e){var t=_L(e);return t==="[object Function]"||t==="[object GeneratorFunction]"||t==="[object AsyncFunction]"};dg.exports=Eo});var Dt=v((ko,mg)=>{var yL=Bt(),vL=Ge(),bL=Math.pow(2,53)-1;ko=function(e){if(!e)return!1;var t=e.length;return yL(t)&&t>=0&&t<=bL&&!vL(e)};mg.exports=ko});var Fe=v((To,fg)=>{To=function(e){return e===void 0};fg.exports=To});var jo=v((Co,hg)=>{var wL=Fe();Co=function(e,t,s){if(wL(t))return e;switch(s??3){case 1:return function(r){return e.call(t,r)};case 3:return function(r,n,i){return e.call(t,r,n,i)};case 4:return function(r,n,i,o){return e.call(t,r,n,i,o)}}return function(){return e.apply(t,arguments)}};hg.exports=Co});var Y=v((Mo,gg)=>{var xL=Dt(),SL=Re(),LL=jo();Mo=function(e,t,s){t=LL(t,s);var r,n;if(xL(e))for(r=0,n=e.length;r<n;r++)t(e[r],r,e);else{var i=SL(e);for(r=0,n=i.length;r<n;r++)t(e[i[r]],i[r],e)}return e};gg.exports=Mo});var yg=v((Uo,_g)=>{var EL=Y();Uo=function(e){var t=[];return EL(e,function(s){t.push(s)}),t};_g.exports=Uo});var ht=v((Ao,vg)=>{var kL=lg(),TL=ie(),CL=Dt(),jL=yg();Ao=function(e,t){return TL(e)?e.indexOf(t)>-1:(CL(e)||(e=jL(e)),kL(e,t)>=0)};vg.exports=Ao});var is=v((Po,bg)=>{Po=function(e,t){return e.indexOf(t)===0};bg.exports=Po});var qo=v((Oo,wg)=>{var ML=ot();Oo=function(e){return ML(e).replace(UL,function(t){switch(t){case'"':case"'":case"\\":return"\\"+t;case`
`:return"\\n";case"\r":return"\\r";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029"}})};var UL=/["'\\\n\r\u2028\u2029]/g;wg.exports=Oo});var Io=v((Ro,xg)=>{Ro=function(e,t){var s=e.length-t.length;return s>=0&&e.indexOf(t,s)===s};xg.exports=Ro});var Je=v((Cn,Sg)=>{var AL=ft();Array.isArray?Cn=Array.isArray:Cn=function(e){return AL(e)==="[object Array]"};Sg.exports=Cn});var Eg=v((Ho,Lg)=>{var PL=ft();Ho=function(e){return PL(e)==="[object Arguments]"};Lg.exports=Ho});var jn=v((Bo,kg)=>{var OL=Dt(),qL=Je(),RL=ie(),IL=Eg(),HL=Re();Bo=function(e){return e==null?!0:OL(e)&&(qL(e)||RL(e)||IL(e))?e.length===0:HL(e).length===0};kg.exports=Bo});var ur=v((Do,Tg)=>{Do=function(e){return e.length<1?e:e[0].toUpperCase()+e.slice(1)};Tg.exports=Do});var No=v(Ps=>{"use strict";var BL=Ps&&Ps.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ps,"__esModule",{value:!0});Ps.getObjType=void 0;var DL=BL(ur());function NL(e){return e.constructor&&e.constructor.name?e.constructor.name:DL.default({}.toString.call(e).replace(/(\[object )|]/g,""))}Ps.getObjType=NL});var Ie=v(($o,Cg)=>{$o=function(e){var t=typeof e;return!!e&&(t==="function"||t==="object")};Cg.exports=$o});var Mn=v((Fo,Mg)=>{var $L=Fe(),jg=Y();Fo=function(e,t){return function(s){return jg(arguments,function(r,n){if(n!==0){var i=e(r);jg(i,function(o){(!t||$L(s[o]))&&(s[o]=r[o])})}}),s}};Mg.exports=Fo});var Ag=v((zo,Ug)=>{var FL=Re(),zL=Mn();zo=zL(FL);Ug.exports=zo});var Og=v((Wo,Pg)=>{var WL=Re();Wo=function(e,t){var s=WL(t),r=s.length;if(e==null)return!r;e=Object(e);for(var n=0;n<r;n++){var i=s[n];if(t[i]!==e[i]||!(i in e))return!1}return!0};Pg.exports=Wo});var Rg=v((Go,qg)=>{var GL=Ag(),JL=Og();Go=function(e){return e=GL({},e),function(t){return JL(t,e)}};qg.exports=Go});var Hg=v((Jo,Ig)=>{Jo=function(e){return e};Ig.exports=Jo});var Un=v((Vo,Bg)=>{var VL=As(),KL=Je();Vo=function(e,t){if(KL(e))return e;if(t&&VL(t,e))return[e];var s=[];return e.replace(XL,function(r,n,i,o){s.push(i?o.replace(YL,"$1"):n||r)}),s};var XL=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,YL=/\\(\\)?/g;Bg.exports=Vo});var Xo=v((Ko,Dg)=>{var QL=Fe(),ZL=Un();Ko=function(e,t){t=ZL(t,e);var s;for(s=t.shift();!QL(s);){if(e=e[s],e==null)return;s=t.shift()}return e};Dg.exports=Ko});var $g=v((Yo,Ng)=>{var eE=Je(),tE=Xo();Yo=function(e){return eE(e)?function(t){return tE(t,e)}:sE(e)};function sE(e){return function(t){return t?.[e]}}Ng.exports=Yo});var dr=v((Qo,Fg)=>{var rE=Ge(),nE=Ie(),iE=Je(),oE=jo(),aE=Rg(),lE=Hg(),cE=$g();Qo=function(e,t,s){return e==null?lE:rE(e)?oE(e,t,s):nE(e)&&!iE(e)?aE(e):cE(e)};Fg.exports=Qo});var Os=v((Zo,zg)=>{var pE=dr(),uE=Re(),dE=Dt();Zo=function(e,t,s){t=pE(t,s);for(var r=!dE(e)&&uE(e),n=(r||e).length,i=Array(n),o=0;o<n;o++){var a=r?r[o]:o;i[o]=t(e[a],a,e)}return i};zg.exports=Zo});var Gg=v((ea,Wg)=>{var mE=/^\s+/;ea=function(e,t){if(t==null)return e.trimLeft?e.trimLeft():e.replace(mE,"");for(var s=0,r=e.length,n=t.length,i=!0,o,a;i&&s<r;)for(i=!1,o=-1,a=e.charAt(s);++o<n;)if(a===t[o]){i=!0,s++;break}return s>=r?"":e.substr(s,r)};Wg.exports=ea});var Vg=v((ta,Jg)=>{ta=function(e,t){if(t==null){if(e.trimRight)return e.trimRight();t=` \r
	\f\v`}for(var s=e.length-1,r=t.length,n=!0,i,o;n&&s>=0;)for(n=!1,i=-1,o=e.charAt(s);++i<r;)if(o===t[i]){n=!0,s--;break}return s>=0?e.substring(0,s+1):""};Jg.exports=ta});var os=v((sa,Kg)=>{var fE=Gg(),hE=Vg();sa=function(e,t){return t==null&&e.trim?e.trim():fE(hE(e,t),t)};Kg.exports=sa});var na=v((ra,Xg)=>{ra=typeof window=="object"&&typeof document=="object"&&document.nodeType===9;Xg.exports=ra});var An=v((ia,Yg)=>{var gE=na();ia=gE?window:global;Yg.exports=ia});var Pn=v((oa,Qg)=>{oa=function(e){var t=e?e.length:0;if(t)return e[t-1]};Qg.exports=oa});var e_=v((aa,Zg)=>{var _E=Y(),yE=Fe(),vE=Ge();aa=function(e,t){yE(t)&&(t=!0);var s=vE(t),r={};return _E(e,function(n){r[n]=s?t(n):t}),r};Zg.exports=aa});var as=v((la,t_)=>{var bE=ot();la=function(e){return bE(e).toLocaleLowerCase()};t_.exports=la});var o_=v((ca,i_)=>{var On=Pn(),wE=e_(),qn=is(),s_=as();ca=function(e,t){for(var s=[],r,n=e;e;){if(r=!0,!On(s)||!LE[On(s)]){if(qn(e,"<!--")){var i=e.indexOf("-->");i>=0&&(t.comment&&t.comment(e.substring(4,i)),e=e.substring(i+3),r=!1)}else if(qn(e,"<!")){var o=e.match(xE);o&&(t.text&&t.text(e.substring(0,o[0].length)),e=e.substring(o[0].length),r=!1)}else if(qn(e,"</")){var a=e.match(r_);a&&(e=e.substring(a[0].length),a[0].replace(r_,h),r=!1)}else if(qn(e,"<")){var l=e.match(n_);l&&(e=e.substring(l[0].length),l[0].replace(n_,y),r=!1)}if(r){var c=e.indexOf("<"),p=c<0?e:e.substring(0,c);e=c<0?"":e.substring(c),t.text&&t.text(p)}}else{var m=new RegExp("</".concat(On(s),"[^>]*>")).exec(e);if(m){var g=e.substring(0,m.index);e=e.substring(m.index+m[0].length),g&&t.text&&t.text(g)}h("",On(s))}if(n===e)throw Error("Parse Error: "+e);n=e}h();function y(u,d,b,x){if(d=s_(d),x=!!x,x||s.push(d),t.start){var w={};b.replace(SE,function(_,f,T,L,U){w[f]=T||L||U||""}),t.start(d,w,x)}}function h(u,d){d=s_(d);var b;if(!d)b=0;else for(b=s.length-1;b>=0&&s[b]!==d;b--);if(b>=0){for(var x=s.length-1;x>=b;x--)t.end&&t.end(s[x]);s.length=b}}};var xE=/^<!\s*doctype((?:\s+[\w:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i,r_=/^<\/([-A-Za-z0-9_]+)[^>]*>/,n_=/^<([-A-Za-z0-9_]+)((?:\s+[-A-Za-z0-9_:@.]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i,SE=/([-A-Za-z0-9_:@.]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,LE=wE("script,style".split(","));i_.exports=ca});var Rn=v((pa,c_)=>{var EE=Ie(),kE=Ge(),a_=Object.getPrototypeOf,l_={}.constructor;pa=function(e){if(EE(e)){if(a_)return a_(e);var t=e.__proto__;if(t||t===null)return t;if(kE(e.constructor))return e.constructor.prototype;if(e instanceof l_)return l_.prototype}};c_.exports=pa});var mr=v((ua,p_)=>{var TE=dr(),CE=Y();ua=function(e,t,s){var r=[];return t=TE(t,s),CE(e,function(n,i,o){t(n,i,o)&&r.push(n)}),r};p_.exports=ua});var In=v((da,u_)=>{var jE=mr();da=function(e,t){return t=t||ME,jE(e,function(s,r,n){for(var i=n.length;++r<i;)if(t(s,n[r]))return!1;return!0})};function ME(e,t){return e===t}u_.exports=da});var fr=v((fa,f_)=>{var d_=Re(),UE=Rn(),AE=In(),ma=Object.getOwnPropertyNames,m_=Object.getOwnPropertySymbols;fa=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.prototype,r=s===void 0?!0:s,n=t.unenumerable,i=n===void 0?!1:n,o=t.symbol,a=o===void 0?!1:o,l=[];if((i||a)&&ma){var c=d_;i&&ma&&(c=ma);do l=l.concat(c(e)),a&&m_&&(l=l.concat(m_(e)));while(r&&(e=UE(e))&&e!==Object.prototype);l=AE(l)}else if(r)for(var p in e)l.push(p);else l=d_(e);return l};f_.exports=fa});var ls=v((ha,h_)=>{var PE=Mn(),OE=fr();ha=PE(OE);h_.exports=ha});var gt=v((ga,g_)=>{var qE=Dt(),RE=Os(),IE=Je(),HE=ie();ga=function(e){return e?IE(e)?e:qE(e)&&!HE(e)?RE(e):[e]:[]};g_.exports=ga});var ya=v((_a,y_)=>{var BE=Ie();_a=function(e){if(!BE(e))return{};if(__)return __(e);function t(){}return t.prototype=e,new t};var __=Object.create;y_.exports=_a});var b_=v((va,v_)=>{var DE=ya();va=function(e,t){e.prototype=DE(t.prototype)};v_.exports=va});var wa=v((ba,w_)=>{var NE=Ge();ba=typeof wx<"u"&&NE(wx.openLocation);w_.exports=ba});var qs=v((Hn,k_)=>{var x_=ls(),S_=gt(),L_=b_(),$E=Xo(),FE=wa();Hn=function(e,t){return zE.extend(e,t)};function E_(e,t,s){s=s||{};var r=t.className||$E(t,"initialize.name")||"";delete t.className;var n=function(){var i=S_(arguments);return this.initialize?this.initialize.apply(this,i)||this:this};if(!FE)try{n=new Function("toArr","return function "+r+"(){var args = toArr(arguments);return this.initialize ? this.initialize.apply(this, args) || this : this;};")(S_)}catch{}return L_(n,e),n.prototype.constructor=n,n.extend=function(i,o){return E_(n,i,o)},n.inherits=function(i){L_(n,i)},n.methods=function(i){return x_(n.prototype,i),n},n.statics=function(i){return x_(n,i),n},n.methods(t).statics(s),n}var zE=Hn.Base=E_(Object,{className:"Base",callSuper:function(e,t,s){var r=e.prototype[t];return r.apply(this,s)},toString:function(){return this.constructor.name}});k_.exports=Hn});var C_=v((xa,T_)=>{xa=function(e){var t=e.length,s=Array(t);t--;for(var r=0;r<=t;r++)s[t-r]=e[r];return s};T_.exports=xa});var La=v((Sa,j_)=>{var WE=qs(),GE=C_();Sa=WE({initialize:function(){this.clear()},clear:function(){this._items=[],this.size=0},push:function(e){return this._items.push(e),++this.size},pop:function(){if(this.size)return this.size--,this._items.pop()},peek:function(){return this._items[this.size-1]},forEach:function(e,t){t=arguments.length>1?t:this;for(var s=this._items,r=this.size-1,n=0;r>=0;r--,n++)e.call(t,s[r],n,this)},toArr:function(){return GE(this._items)}});j_.exports=Sa});var U_=v((Ea,M_)=>{var JE=dr(),VE=Re();Ea=function(e,t,s){t=JE(t,s);for(var r=VE(e),n=r.length,i={},o=0;o<n;o++){var a=r[o];i[a]=t(e[a],a,e)}return i};M_.exports=Ea});var q_=v((Ta,O_)=>{var KE=o_(),XE=La(),P_=Je(),A_=Y(),YE=ie(),QE=U_();function ZE(e){var t=[],s=new XE;return KE(e,{start:function(r,n){n=QE(n,function(i){return ek(i)}),s.push({tag:r,attrs:n})},end:function(){var r=s.pop();if(!s.size){t.push(r);return}var n=s.peek();P_(n.content)||(n.content=[]),n.content.push(r)},comment:function(r){var n="<!--".concat(r,"-->"),i=s.peek();if(!i){t.push(n);return}i.content||(i.content=[]),i.content.push(n)},text:function(r){var n=s.peek();if(!n){t.push(r);return}n.content||(n.content=[]),n.content.push(r)}}),t}function ka(e){var t="";return P_(e)?A_(e,function(s){return t+=ka(s)}):YE(e)?t=e:(t+="<".concat(e.tag),A_(e.attrs,function(s,r){return t+=" ".concat(r,'="').concat(tk(s),'"')}),t+=">",e.content&&(t+=ka(e.content)),t+="</".concat(e.tag,">")),t}var ek=function(e){return e.replace(/&quot;/g,'"')},tk=function(e){return e.replace(/"/g,"&quot;")};Ta={parse:ZE,stringify:ka};O_.exports=Ta});var Rs=v((Ca,I_)=>{var sk=Bt(),R_=Ie(),rk=Ge(),nk=ie();Ca=function(e){if(sk(e))return e;if(R_(e)){var t=rk(e.valueOf)?e.valueOf():e;e=R_(t)?t+"":t}return nk(e)?+e:e===0?e:+e};I_.exports=Ca});var Dn=v(_e=>{"use strict";var cs=_e&&_e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(_e,"__esModule",{value:!0});_e.pxToNum=_e.executeAfterTransition=_e.hasVerticalScrollbar=_e.measuredScrollbarWidth=_e.eventClient=_e.drag=_e.classPrefix=void 0;var ik=cs(Os()),ok=cs(os()),ak=cs(An()),H_=cs(q_()),lk=cs(Bt()),ck=cs(ht()),pk=cs(Rs());function uk(e){let t=`luna-${e}-`;function s(r){return ik.default(ok.default(r).split(/\s+/),n=>ck.default(n,t)?n:n.replace(/[\w-]+/,i=>`${t}${i}`)).join(" ")}return function(r){if(/<[^>]*>/g.test(r))try{let n=H_.default.parse(r);return B_(n,i=>{i.attrs&&i.attrs.class&&(i.attrs.class=s(i.attrs.class))}),H_.default.stringify(n)}catch{return s(r)}return s(r)}}_e.classPrefix=uk;function B_(e,t){for(let s=0,r=e.length;s<r;s++){let n=e[s];t(n),n.content&&B_(n.content,t)}}var dk="ontouchstart"in ak.default,mk={start:"touchstart",move:"touchmove",end:"touchend"},fk={start:"mousedown",move:"mousemove",end:"mouseup"};function hk(e){return dk?mk[e]:fk[e]}_e.drag=hk;function gk(e,t){let s=e==="x"?"clientX":"clientY";return t[s]?t[s]:t.changedTouches?t.changedTouches[0][s]:0}_e.eventClient=gk;var Bn;function _k(){if(lk.default(Bn))return Bn;if(!document)return 16;let e=document.createElement("div"),t=document.createElement("div");return e.setAttribute("style","display: block; width: 100px; height: 100px; overflow: scroll;"),t.setAttribute("style","height: 200px"),e.appendChild(t),document.body.appendChild(e),Bn=e.offsetWidth-e.clientWidth,document.body.removeChild(e),Bn}_e.measuredScrollbarWidth=_k;function yk(e){return e.scrollHeight>e.offsetHeight}_e.hasVerticalScrollbar=yk;function vk(e,t){let s=r=>{r.target===e&&(e.removeEventListener("transitionend",s),t())};e.addEventListener("transitionend",s)}_e.executeAfterTransition=vk;function bk(e){return pk.default(e.replace("px",""))}_e.pxToNum=bk});var F_=v(hr=>{"use strict";var Nt=hr&&hr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(hr,"__esModule",{value:!0});var wk=Nt(Tn()),xk=Nt(ot()),Sk=Nt(ht()),Lk=Nt(is()),Ek=Nt(qo()),D_=Nt(Y()),kk=Nt(Io()),Tk=Nt(jn()),N_=No(),Ck=Dn(),Is=Ck.classPrefix("console");function Ma(e,{topObj:t,level:s=0,getterVal:r=!1,unenumerable:n=!0}={}){let i="",o="",l=[],c=[],p="",g;t=t||e;let y={getterVal:r,unenumerable:n,level:s+1},h=s===0,u=`<span class="${Is("key")}">`,d=`<span class="${Is("number")}">`,b=`<span class="${Is("null")}">`,x=`<span class="${Is("string")}">`,w=`<span class="${Is("boolean")}">`,_=`<span class="${Is("special")}">`,f=N=>wk.default(N).replace(/\\n/g,"\u21B5").replace(/\\f|\\r|\\t/g,"").replace(/\\/g,""),T="</span>",L=N=>u+f(N)+T,U=N=>d+N+T,I=N=>x+N+T,Le=N=>w+N+T,ge=N=>b+N+T;function pe(N){return N=xk.default(N),Sk.default(jk,N)||Lk.default(N,"Array[")?_+f(N)+T:x+f(`"${N}"`)+T}function W(N){if(g>5){p=", \u2026";return}let fe=L(ja(N));if(!r){let Ee=Object.getOwnPropertyDescriptor(e,N);if(Ee&&Ee.get){l.push(`${fe}: ${pe("(...)")}`),g++;return}}l.push(`${fe}: ${Ma(t[N],y)}`),g++}try{o={}.toString.call(e)}catch{o="[object Object]"}let me=o=="[object String]",P=o=="[object Array]",$=o=="[object Object]",K=o=="[object Number]",le=o=="[object RegExp]",Qe=o=="[object Symbol]",ut=o=="[object Function]",Oe=o=="[object Boolean]";if(me)i=pe(ja(e));else if(le)i=I(ja(e.toString()));else if(ut)i=pe("\u0192");else if(P)if(h){i="[";let N=e.length,fe="";N>100&&(N=100,fe=", \u2026");for(let Ee=0;Ee<N;Ee++)l.push(`${Ma(e[Ee],y)}`);i+=l.join(", ")+fe+"]"}else i=`Array(${e.length})`;else if($)$_(e)&&(e=Object.getPrototypeOf(e)),c=n?Object.getOwnPropertyNames(e):Object.keys(e),h?(g=1,i="{",D_.default(c,W),i+=l.join(", ")+p+"}"):(i=N_.getObjType(e),i==="Object"&&(i="{\u2026}"));else if(K)i=e+"",kk.default(i,"Infinity")||i==="NaN"?i=`"${i}"`:i=U(i);else if(Oe)i=Le(e?"true":"false");else if(e===null)i=ge("null");else if(Qe)i=pe("Symbol");else if(e===void 0)i=pe("undefined");else try{$_(e)&&(e=Object.getPrototypeOf(e)),h?(g=1,i="{",c=n?Object.getOwnPropertyNames(e):Object.keys(e),D_.default(c,W),i+=l.join(", ")+p+"}"):(i=N_.getObjType(e),i==="Object"&&(i="{\u2026}"))}catch{i=pe(e)}return i}hr.default=Ma;var jk=["(...)","undefined","Symbol","Object","\u0192"];function $_(e){let t=Tk.default(Object.getOwnPropertyNames(e)),s=Object.getPrototypeOf(e);return t&&s&&s!==Object.prototype}function ja(e){return Ek.default(e).replace(/\\'/g,"'").replace(/\t/g,"\\t")}});var W_=v((Ua,z_)=>{Ua=function(e,t,s){var r=e.length;t==null?t=0:t<0?t=Math.max(r+t,0):t=Math.min(t,r),s==null?s=r:s<0?s=Math.max(r+s,0):s=Math.min(s,r);for(var n=[];t<s;)n.push(e[t++]);return n};z_.exports=Ua});var Nn=v((Aa,G_)=>{Aa=function(e,t){return t=t==null?e.length-1:+t,function(){var s=Math.max(arguments.length-t,0),r=new Array(s),n;for(n=0;n<s;n++)r[n]=arguments[n+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var i=new Array(t+1);for(n=0;n<t;n++)i[n]=arguments[n];return i[t]=r,e.apply(this,i)}};G_.exports=Aa});var V_=v((Pa,J_)=>{var Mk=Nn(),Uk=gt();Pa=Mk(function(e,t){return function(){var s=[];return s=s.concat(t),s=s.concat(Uk(arguments)),e.apply(this,s)}});J_.exports=Pa});var X_=v((Oa,K_)=>{Oa=function(e,t){var s;return function(){return--e>0&&(s=t.apply(this,arguments)),e<=1&&(t=null),s}};K_.exports=Oa});var Q_=v((qa,Y_)=>{var Ak=V_(),Pk=X_();qa=Ak(Pk,2);Y_.exports=qa});var Ia=v((Ra,Z_)=>{var Ok=Ie(),qk=Je(),Rk=ls();Ra=function(e){return Ok(e)?qk(e)?e.slice():Rk({},e):e};Z_.exports=Ra});var gr=v(($n,sy)=>{var Ik=qs(),ey=As(),ty=Y(),Hk=W_(),Bk=Q_(),Dk=Ia();$n=Ik({initialize:function(){this._events=this._events||{}},on:function(e,t){return this._events[e]=this._events[e]||[],this._events[e].push(t),this},off:function(e,t){var s=this._events;if(ey(s,e)){var r=s[e].indexOf(t);return r>-1&&s[e].splice(r,1),this}},once:function(e,t){return this.on(e,Bk(t)),this},emit:function(e){var t=this;if(ey(this._events,e)){var s=Hk(arguments,1),r=Dk(this._events[e]);return ty(r,function(n){return n.apply(t,s)},this),this}},removeAllListeners:function(e){return e?delete this._events[e]:this._events={},this}},{mixin:function(e){ty(["on","off","once","emit","removeAllListeners"],function(t){e[t]=$n.prototype[t]}),e._events=e._events||{}}});sy.exports=$n});var Ba=v((Ha,ry)=>{Ha=function(e){return e===!0||e===!1};ry.exports=Ha});var iy=v((Da,ny)=>{Da=function(e){return e==null};ny.exports=Da});var $a=v((Na,oy)=>{var Nk=iy();Na=function(e){if(Nk(e))return"";try{return $k.call(e)}catch{}try{return e+""}catch{}return""};var $k=Function.prototype.toString;oy.exports=Na});var za=v((Fa,ly)=>{var Fk=Ie(),ay=Ge();Fa=function(e){return Fk(e)&&ay(e.then)&&ay(e.catch)};ly.exports=Fa});var Ga=v((Wa,cy)=>{var zk=Bt();Wa=function(e){return zk(e)&&e!==+e};cy.exports=Wa});var uy=v((Ja,py)=>{var Wk=Ge();Ja=function(e){return e==null?!1:e._isBuffer?!0:e.constructor&&Wk(e.constructor.isBuffer)&&e.constructor.isBuffer(e)};py.exports=Ja});var Ka=v((Va,dy)=>{var Gk=ft(),Jk=Ga(),Vk=as(),Kk=uy();Va=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,s;return e===null&&(s="Null"),e===void 0&&(s="Undefined"),Jk(e)&&(s="NaN"),Kk(e)&&(s="Buffer"),s||(s=Gk(e).match(Xk),s&&(s=s[1])),s?t?Vk(s):s:""};var Xk=/^\[object\s+(.*?)]$/;dy.exports=Va});var fy=v((Xa,my)=>{var Yk=Nn();Xa=Yk(function(e,t){for(var s=e.length,r=0,n=t.length;r<n;r++)for(var i=t[r],o=0,a=i.length;o<a;o++)e[s++]=i[o];return e.length=s,e});my.exports=Xa});var Ya=v((_r,hy)=>{var Qk=qs(),Zk=ie(),eT=Y(),tT=fy();_r=Qk({className:"Select",initialize:function(e){if(this.length=0,!e)return this;if(Zk(e))return sT.find(e);e.nodeType&&(this[0]=e,this.length=1)},find:function(e){var t=new _r;return this.each(function(){tT(t,this.querySelectorAll(e))}),t},each:function(e){return eT(this,function(t,s){e.call(t,s,t)}),this}});var sT=new _r(document);hy.exports=_r});var at=v((Qa,gy)=>{var rT=ie(),nT=gt(),iT=Ya();Qa=function(e){return nT(rT(e)?new iT(e):e)};gy.exports=Qa});var yy=v((Za,_y)=>{var oT=at();Za=function(e){e=oT(e);var t=e[0],s=t.getBoundingClientRect();return{left:s.left+window.pageXOffset,top:s.top+window.pageYOffset,width:Math.round(s.width),height:Math.round(s.height)}};_y.exports=Za});var by=v((tl,vy)=>{var aT=Y(),lT=at();tl=function(e){e=lT(e),aT(e,function(t){cT(t)&&(t.style.display=pT(t.nodeName))})};function cT(e){return getComputedStyle(e,"").getPropertyValue("display")=="none"}var el={};function pT(e){var t,s;return el[e]||(t=document.createElement(e),document.documentElement.appendChild(t),s=getComputedStyle(t,"").getPropertyValue("display"),t.parentNode.removeChild(t),s=="none"&&(s="block"),el[e]=s),el[e]}vy.exports=tl});var rl=v((sl,wy)=>{var uT=/([A-Z])/g,dT=/[_.\- ]+/g,mT=/(^-)|(-$)/g;sl=function(e){return e=e.replace(uT,"-$1").toLowerCase().replace(dT,"-").replace(mT,""),e.split("-")};wy.exports=sl});var il=v((nl,xy)=>{var fT=rl();nl=function(e){return fT(e).join("-")};xy.exports=nl});var Ly=v((ol,Sy)=>{var hT=As();ol=function(e,t){var s=function(r){var n=s.cache,i=""+(t?t.apply(this,arguments):r);return hT(n,i)||(n[i]=e.apply(this,arguments)),n[i]};return s.cache={},s};Sy.exports=ol});var ky=v((al,Ey)=>{var gT=rl();al=function(e){var t=gT(e),s=t[0];return t.shift(),t.forEach(_T,t),s+=t.join(""),s};function _T(e,t){this[t]=e.replace(/\w/,function(s){return s.toUpperCase()})}Ey.exports=al});var Py=v((yr,Ay)=>{var My=Ly(),yT=ky(),vT=ur(),Ty=As(),bT=il();yr=My(function(e){if(e=e.replace(Uy,""),e=yT(e),Ty(jy,e))return e;for(var t=Cy.length;t--;){var s=Cy[t]+vT(e);if(Ty(jy,s))return s}return e});yr.dash=My(function(e){var t=yr(e);return(Uy.test(t)?"-":"")+bT(t)});var Cy=["O","ms","Moz","Webkit"],Uy=/^(O)|(ms)|(Moz)|(Webkit)|(-o-)|(-ms-)|(-moz-)|(-webkit-)/g,jy=document.createElement("p").style;Ay.exports=yr});var cl=v((ll,Ry)=>{var wT=ie(),xT=Ie(),ST=il(),LT=Fe(),ET=ht(),kT=Bt(),TT=at(),qy=Py(),Oy=Y();ll=function(e,t,s){e=TT(e);var r=LT(s)&&wT(t);if(r)return CT(e[0],t);var n=t;xT(n)||(n={},n[t]=s),jT(e,n)};function CT(e,t){return e.style[qy(t)]||getComputedStyle(e,"").getPropertyValue(t)}function jT(e,t){Oy(e,function(s){var r=";";Oy(t,function(n,i){i=qy.dash(i),r+=i+":"+UT(i,n)+";"}),s.style.cssText+=r})}var MT=["column-count","columns","font-weight","line-weight","opacity","z-index","zoom"];function UT(e,t){var s=kT(t)&&!ET(MT,ST(e));return s?t+"px":t}Ry.exports=ll});var pl=v((zn,Hy)=>{var AT=gt(),PT=Ie(),OT=ie(),Fn=Y(),qT=Fe(),Iy=at();zn=function(e,t,s){e=Iy(e);var r=qT(s)&&OT(t);if(r)return RT(e[0],t);var n=t;PT(n)||(n={},n[t]=s),IT(e,n)};zn.remove=function(e,t){e=Iy(e),t=AT(t),Fn(e,function(s){Fn(t,function(r){s.removeAttribute(r)})})};function RT(e,t){return e.getAttribute(t)}function IT(e,t){Fn(e,function(s){Fn(t,function(r,n){s.setAttribute(n,r)})})}Hy.exports=zn});var Dy=v((dl,By)=>{var HT=Fe(),BT=Y(),DT=at();dl={html:ul("innerHTML"),text:ul("textContent"),val:ul("value")};function ul(e){return function(t,s){t=DT(t);var r=t[0];if(HT(s))return r?r[e]:"";r&&BT(t,function(n){n[e]=s})}}By.exports=dl});var $y=v((ml,Ny)=>{var NT=Y(),$T=at();ml=function(e){e=$T(e),NT(e,function(t){var s=t.parentNode;s&&s.removeChild(t)})};Ny.exports=ml});var zy=v((fl,Fy)=>{var FT=pl(),zT=ie(),WT=Ie(),GT=Y(),Y4=at();fl=function(e,t,s){var r=t;return zT(t)&&(r="data-"+t),WT(t)&&(r={},GT(t,function(n,i){r["data-"+i]=n})),FT(e,r,s)};Fy.exports=fl});var Gy=v((Wn,Wy)=>{var JT=qs(),VT=ht();function hl(){return!0}function gl(){return!1}function KT(e){var t=this.events[e.type],s,r=XT.call(this,e,t);e=new Wn.Event(e);for(var n=0,i,o,a;(o=r[n++])&&!e.isPropagationStopped();)for(e.curTarget=o.el,i=0;(s=o.handlers[i++])&&!e.isImmediatePropagationStopped();)a=s.handler.apply(o.el,[e]),a===!1&&(e.preventDefault(),e.stopPropagation())}function XT(e,t){var s=e.target,r=[],n=t.delegateCount,i,o,a,l;if(s.nodeType)for(;s!==this;s=s.parentNode||this){for(o=[],l=0;l<n;l++)a=t[l],i=a.selector+" ",o[i]===void 0&&(o[i]=VT(this.querySelectorAll(i),s)),o[i]&&o.push(a);o.length&&r.push({el:s,handlers:o})}return n<t.length&&r.push({el:this,handlers:t.slice(n)}),r}Wn={add:function(e,t,s,r){var n={selector:s,handler:r},i;e.events||(e.events={}),(i=e.events[t])||(i=e.events[t]=[],i.delegateCount=0,e.addEventListener(t,function(){KT.apply(e,arguments)},!1)),s?i.splice(i.delegateCount++,0,n):i.push(n)},remove:function(e,t,s,r){var n=e.events;if(!(!n||!n[t]))for(var i=n[t],o=i.length,a;o--;)a=i[o],(!s||a.selector==s)&&a.handler==r&&(i.splice(o,1),a.selector&&i.delegateCount--)},Event:JT({className:"Event",initialize:function(t){this.origEvent=t},isDefaultPrevented:gl,isPropagationStopped:gl,isImmediatePropagationStopped:gl,preventDefault:function(){var e=this.origEvent;this.isDefaultPrevented=hl,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.origEvent;this.isPropagationStopped=hl,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.origEvent;this.isImmediatePropagationStopped=hl,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}})};Wy.exports=Wn});var Ky=v((_l,Vy)=>{var YT=Gy(),QT=Fe(),ZT=at(),e1=Y();_l={on:Jy("add"),off:Jy("remove")};function Jy(e){return function(t,s,r,n){t=ZT(t),QT(n)&&(n=r,r=void 0),e1(t,function(i){YT[e](i,s,r,n)})}}Vy.exports=_l});var Yy=v((yl,Xy)=>{var t1=dr(),s1=Dt(),r1=Re();yl=function(e,t,s){t=t1(t,s);for(var r=!s1(e)&&r1(e),n=(r||e).length,i=0;i<n;i++){var o=r?r[i]:i;if(t(e[o],o,e))return!0}return!1};Xy.exports=yl});var vl=v((ps,Zy)=>{var n1=gt(),i1=Yy(),Gn=at(),o1=ie(),vr=Y();ps={add:function(e,t){e=Gn(e);var s=Qy(t);vr(e,function(r){var n=[];vr(s,function(i){ps.has(r,i)||n.push(i)}),n.length!==0&&(r.className+=(r.className?" ":"")+n.join(" "))})},has:function(e,t){e=Gn(e);var s=new RegExp("(^|\\s)"+t+"(\\s|$)");return i1(e,function(r){return s.test(r.className)})},toggle:function(e,t){e=Gn(e),vr(e,function(s){if(!ps.has(s,t))return ps.add(s,t);ps.remove(s,t)})},remove:function(e,t){e=Gn(e);var s=Qy(t);vr(e,function(r){vr(s,function(n){r.classList.remove(n)})})}};function Qy(e){return o1(e)?e.split(/\s+/):n1(e)}Zy.exports=ps});var tv=v((bl,ev)=>{var a1=Y(),l1=at(),c1=ie();bl={before:Jn("beforebegin"),after:Jn("afterend"),append:Jn("beforeend"),prepend:Jn("afterbegin")};function Jn(e){return function(t,s){t=l1(t),a1(t,function(r){if(c1(s))r.insertAdjacentHTML(e,s);else{var n=r.parentNode;switch(e){case"beforebegin":n&&n.insertBefore(s,r);break;case"afterend":n&&n.insertBefore(s,r.nextSibling);break;case"beforeend":r.appendChild(s);break;case"afterbegin":r.prepend(s);break}}})}}ev.exports=bl});var br=v((us,iv)=>{var nv=Ya(),p1=yy(),u1=by(),d1=cl(),sv=pl(),wl=Dy(),m1=Pn(),f1=$y(),h1=zy(),rv=Ky(),Vn=vl(),Kn=tv(),Xn=Fe(),g1=ie();us=function(e){return new nv(e)};nv.methods({offset:function(){return p1(this)},hide:function(){return this.css("display","none")},show:function(){return u1(this),this},first:function(){return us(this[0])},last:function(){return us(m1(this))},get:function(e){return this[e]},eq:function(e){return us(this[e])},on:function(e,t,s){return rv.on(this,e,t,s),this},off:function(e,t,s){return rv.off(this,e,t,s),this},html:function(e){var t=wl.html(this,e);return Xn(e)?t:this},text:function(e){var t=wl.text(this,e);return Xn(e)?t:this},val:function(e){var t=wl.val(this,e);return Xn(e)?t:this},css:function(e,t){var s=d1(this,e,t);return xl(e,t)?s:this},attr:function(e,t){var s=sv(this,e,t);return xl(e,t)?s:this},data:function(e,t){var s=h1(this,e,t);return xl(e,t)?s:this},rmAttr:function(e){return sv.remove(this,e),this},remove:function(){return f1(this),this},addClass:function(e){return Vn.add(this,e),this},rmClass:function(e){return Vn.remove(this,e),this},toggleClass:function(e){return Vn.toggle(this,e),this},hasClass:function(e){return Vn.has(this,e)},parent:function(){return us(this[0].parentNode)},append:function(e){return Kn.append(this,e),this},prepend:function(e){return Kn.prepend(this,e),this},before:function(e){return Kn.before(this,e),this},after:function(e){return Kn.after(this,e),this}});var xl=function(e,t){return Xn(t)&&g1(e)};iv.exports=us});var lv=v((Sl,av)=>{var _1=Je();Sl=function(e){return ov(e,[])};function ov(e,t){for(var s=e.length,r=-1,n;s--;)n=e[++r],_1(n)?ov(n,t):t.push(n);return t}av.exports=Sl});var El=v((Ll,cv)=>{var y1=Nn(),v1=lv(),b1=mr(),w1=ht();Ll=y1(function(e,t){return t=v1(t),b1(e,function(s){return!w1(t,s)})});cv.exports=Ll});var Tl=v((kl,pv)=>{kl=function(e,t){var s=[];t=t||1;for(var r=0,n=Math.ceil(e.length/t);r<n;r++){var i=r*t,o=i+t;s.push(e.slice(i,o))}return s};pv.exports=kl});var Yn=v((Cl,uv)=>{Cl=function(){};uv.exports=Cl});var dv=v(wr=>{"use strict";var x1=wr&&wr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(wr,"__esModule",{value:!0});var S1=x1(ls()),jl=class{constructor(){this.id=0,this.visited=[]}set(t,s){let{visited:r,id:n}=this,i={id:n,val:t};return S1.default(i,s),r.push(i),this.id++,n}get(t){let{visited:s}=this;for(let r=0,n=s.length;r<n;r++){let i=s[r];if(t===i.val)return i}return!1}};wr.default=jl});var Ul=v(_t=>{"use strict";var xr=_t&&_t.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(_t,"__esModule",{value:!0});_t.sortObjName=_t.getFnAbstract=_t.encode=void 0;var Ml=xr(ot()),L1=xr(os()),mv=xr(Rs()),Qn=xr(is()),E1=xr(Tn());_t.encode=e=>E1.default(Ml.default(e)).replace(/\n/g,"\u21B5").replace(/\f|\r|\t/g,"");function k1(e){return e.length>500&&(e=e.slice(0,500)+"..."),"\u0192 "+L1.default(C1(e).replace("function",""))}_t.getFnAbstract=k1;var T1=/function(.*?)\((.*?)\)/;function C1(e){let t=e.match(T1);return t?t[0]:e}function j1(e,t){e=Ml.default(e),t=Ml.default(t);let s=mv.default(e),r=mv.default(t);if(!isNaN(s)&&!isNaN(r))return s>r?1:s<r?-1:0;(Qn.default(e,"get ")||Qn.default(e,"set "))&&(e=e.slice(4)),(Qn.default(t,"get ")||Qn.default(t,"set "))&&(t=t.slice(4));let n=e.length,i=t.length,o=n>i?i:n;for(let a=0;a<o;a++){let l=e.charCodeAt(a),c=t.charCodeAt(a),p=M1(l,c);if(p!==0)return p}return n>i?1:n<i?-1:0}_t.sortObjName=j1;function M1(e,t){return e=fv(e),t=fv(t),e>t?1:e<t?-1:0}function fv(e){return e===95?123:e}});var Pl=v((Al,hv)=>{var U1=0;Al=function(e){var t=++U1+"";return e?e+t:t};hv.exports=Al});var Ol=v(Hs=>{"use strict";var gv=Hs&&Hs.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Hs,"__esModule",{value:!0});Hs.classPrefix=void 0;var A1=gv(Os()),P1=gv(os());function O1(e){let t=`luna-${e}-`;return function(s){return A1.default(P1.default(s).split(/\s+/),r=>`${t}${r}`).join(" ")}}Hs.classPrefix=O1});var wv=v(ds=>{"use strict";var He=ds&&ds.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ds,"__esModule",{value:!0});ds.getObjAbstract=void 0;var _v=He(br()),q1=He(is()),ql=He(Ie()),yv=He(Pl()),R1=He(ur()),I1=He(Rs()),H1=He(Tl()),Sr=He(Y()),B1=He(Ga()),D1=He(Bt()),N1=He(Ba()),$1=He(ie()),F1=He(Re()),z1=He(as()),W1=He(gr()),Bs=Ul(),G1=Ol(),ye=G1.classPrefix("object-viewer"),Rl=class extends W1.default{constructor(t){super(),this.onItemClick=s=>{let{map:r}=this,n=_v.default(s.curTarget),i=n.data("object-id"),o=n.find("span").eq(0);if(n.data("first-level")||(i&&(n.find("ul").html(this.objToHtml(r[i],!1)),n.rmAttr("data-object-id")),s.stopImmediatePropagation(),!o.hasClass(ye("expanded"))))return;let a=n.find("ul").eq(0);o.hasClass(ye("collapsed"))?(o.rmClass(ye("collapsed")),a.show()):(o.addClass(ye("collapsed")),a.hide()),this.emit("change")},this.$container=_v.default(t),this.$container.addClass("luna-object-viewer"),this.bindEvent()}set(t){$1.default(t)&&(t=JSON.parse(t)),this.data={id:yv.default("json"),enumerable:{0:t}},this.map={},vv(this.map,this.data),this.appendTpl()}destroy(){this.$container.off("click","li",this.onItemClick),this.$container.rmClass("luna-object-viewer"),this.$container.html("")}objToHtml(t,s){let r="";return Sr.default(["enumerable","unenumerable","symbol"],n=>{if(!t[n])return;let i=F1.default(t[n]);i.sort(Bs.sortObjName);for(let o=0,a=i.length;o<a;o++){let l=i[o];r+=this.createEl(l,t[n][l],n,s)}}),t.proto&&(r===""?r=this.objToHtml(t.proto):r+=this.createEl("__proto__",t.proto,"proto")),r}createEl(t,s,r,n=!1){let i=typeof s;if(s===null)return`<li>${o(t)}<span class="${ye("null")}">null</span></li>`;if(D1.default(s)||N1.default(s))return`<li>${o(t)}<span class="${ye(i)}">${Bs.encode(s)}</span></li>`;if(s.type==="RegExp"&&(i="regexp"),s.type==="Number"&&(i="number"),s.type==="Number"||s.type==="RegExp")return`<li>${o(t)}<span class="${ye(i)}">${Bs.encode(s.value)}</span></li>`;if(s.type==="Undefined"||s.type==="Symbol")return`<li>${o(t)}<span class="${ye("special")}">${z1.default(s.type)}</span></li>`;if(s==="(...)")return`<li>${o(t)}<span class="${ye("special")}">${s}</span></li>`;if(ql.default(s)){let a=s.id,l=s.reference,c=bv(s)||R1.default(i),p=n?"":`<span class="${ye("expanded collapsed")}"><span class="${ye("icon icon-caret-right")}"></span><span class="${ye("icon icon-caret-down")}"></span></span>`,m=`<li ${n?'data-first-level="true"':""} ${'data-object-id="'+(l||a)+'"'}>${p}${o(t)}<span class="${ye("open")}">${n?"":c}</span><ul class="${ye(i)}" ${n?"":'style="display:none"'}>`;return n&&(m+=this.objToHtml(this.map[a])),m+`</ul><span class="${ye("close")}"></span></li>`}function o(a){if(n||ql.default(s)&&s.jsonSplitArr)return"";let l=ye("key");return(r==="unenumerable"||r==="proto"||r==="symbol")&&(l=ye("key-lighter")),`<span class="${l}">${Bs.encode(a)}</span>: `}return`<li>${o(t)}<span class="${ye(typeof s)}">"${Bs.encode(s)}"</span></li>`}appendTpl(){let t=this.map[this.data.id];this.$container.html(this.objToHtml(t,!0))}bindEvent(){this.$container.on("click","li",this.onItemClick)}};ds.default=Rl;function vv(e,t){let s=t.id;if(!s&&s!==0)return;if(t.type&&q1.default(t.type,"Array")&&t.enumerable){let i=V1(t,s,t.type);i.length>100&&(t=J1(i))}e[s]=t;let n=[];Sr.default(["enumerable","unenumerable","symbol"],i=>{if(t[i])for(let o in t[i])n.push(t[i][o])}),t.proto&&n.push(t.proto);for(let i=0,o=n.length;i<o;i++){let a=n[i];ql.default(a)&&vv(e,a)}}function J1(e){let t=0,s={};Sr.default(H1.default(e,100),n=>{let i={},o=t;i.type="["+o,i.enumerable={},Sr.default(n,l=>{i.enumerable[t]=l,t+=1});let a=t-1;i.type+=(a-o>0?" \u2026 "+a:"")+"]",i.id=yv.default("json"),i.jsonSplitArr=!0,s[t]=i});let r={};return r.enumerable=s,r.id=e.id,r.type=e.type,e.unenumerable&&(r.unenumerable=e.unenumerable),e.symbol&&(r.symbol=e.symbol),e.proto&&(r.proto=e.proto),r}function V1(e,t,s){let r=[],n={};return Sr.default(e.enumerable,(i,o)=>{let a=I1.default(o);B1.default(a)?n[o]=i:r[a]=i}),r.enumerable=n,r.type=s,r.id=t,e.unenumerable&&(r.unenumerable=e.unenumerable),e.symbol&&(r.symbol=e.symbol),e.proto&&(r.proto=e.proto),r}function bv(e){let{type:t,value:s}=e;if(t)return t==="Function"?Bs.getFnAbstract(s):t==="Array"&&e.unenumerable?`Array(${e.unenumerable.length})`:e.type}ds.getObjAbstract=bv});var Cv=v((Bl,Tv)=>{"use strict";var ae=Bl&&Bl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},Il,K1=ae(gr()),X1=ae(Rn()),Y1=ae(Bt()),Q1=ae(Ba()),Z1=ae(as()),xv=ae(Ie()),eC=ae(Je()),tC=ae(ur()),Sv=ae(Re()),Hl=ae(Y()),sC=ae($a()),rC=ae(za()),nC=ae(Ka()),Lv=ae(br()),iC=ae(El()),Ev=ae(fr()),kv=ae(mr()),oC=ae(Tl()),aC=ae(ot()),lC=ae(Yn()),cC=ae(dv()),Ds=Ul(),pC=ae(wv()),uC=Ol(),ve=uC.classPrefix("object-viewer");function dC(e,t){if(t)return t==="Function"?Ds.getFnAbstract(sC.default(e)):t==="Array"?`Array(${e.length})`:t}Tv.exports=(Il=class extends K1.default{constructor(t,{unenumerable:s=!1,accessGetter:r=!1}={}){super(),this.onItemClick=n=>{let{map:i}=this,o=Lv.default(n.curTarget),a=o.data("object-id"),l=o.find("span").eq(0);if(o.data("first-level")||(a&&(o.find("ul").html(this.objToHtml(i[a],!1)),o.rmAttr("data-object-id")),n.stopImmediatePropagation(),!l.hasClass(ve("expanded"))))return;let c=o.find("ul").eq(0);l.hasClass(ve("collapsed"))?(l.rmClass(ve("collapsed")),c.show()):(l.addClass(ve("collapsed")),c.hide()),this.emit("change")},this.$container=Lv.default(t),this.$container.addClass("luna-object-viewer"),this.unenumerable=s,this.accessGetter=r,this.bindEvent()}set(t){this.data=[t],this.visitor=new cC.default,this.map={},this.appendTpl()}destroy(){this.$container.off("click","li",this.onItemClick),this.$container.rmClass("luna-object-viewer"),this.$container.html("")}objToHtml(t,s){let{visitor:r}=this,n=t,i=!1,o=r.get(t);o&&o.self&&(n=o.self);let a="",l=["enumerable"],c=Sv.default(t),p=[],m=[],g=[],y={};if(this.unenumerable&&!s&&(l.push("unenumerable"),l.push("symbol"),p=iC.default(Ev.default(t,{prototype:!1,unenumerable:!0}),c),m=kv.default(Ev.default(t,{prototype:!1,symbol:!0}),u=>typeof u=="symbol")),eC.default(t)&&t.length>100){l.unshift("virtual"),i=!0;let u=0,d={};Hl.default(oC.default(t,100),b=>{let x=Object.create(null),w=u,_="["+w;Hl.default(b,T=>{x[u]=T,d[u]=!0,u++});let f=u-1;_+=(f-w>0?" \u2026 "+f:"")+"]",y[_]=x}),g=Sv.default(y),c=kv.default(c,b=>!d[b])}Hl.default(l,u=>{let d=[];u==="symbol"?d=m:u==="unenumerable"?d=p:u==="virtual"?d=g:d=c,i||d.sort(Ds.sortObjName);for(let b=0,x=d.length;b<x;b++){let w=aC.default(d[b]),_="",f=Object.getOwnPropertyDescriptor(t,w),T=f&&f.get,L=f&&f.set;if(T&&!this.accessGetter)_="(...)";else try{u==="virtual"?_=y[w]:_=n[w],rC.default(_)&&_.catch(lC.default)}catch(U){_=U.message}a+=this.createEl(w,t,_,u,s),T&&(a+=this.createEl(`get ${w}`,t,f.get,u,s)),L&&(a+=this.createEl(`set ${w}`,t,f.set,u,s))}});let h=X1.default(t);if(!s&&h)if(a===""){let u=r.set(h,{self:t});this.map[u]=h,a=this.objToHtml(h)}else a+=this.createEl("__proto__",n||t,h,"proto");return a}createEl(t,s,r,n,i=!1){let{visitor:o}=this,a=typeof r,l=nC.default(r,!1);if(n==="virtual"&&(l=t),r===null)return`<li>${c(t)}<span class="${ve("null")}">null</span></li>`;if(Y1.default(r)||Q1.default(r))return`<li>${c(t)}<span class="${ve(a)}">${Ds.encode(r)}</span></li>`;if(l==="RegExp"&&(a="regexp"),l==="Number"&&(a="number"),l==="Number"||l==="RegExp")return`<li>${c(t)}<span class="${ve(a)}">${Ds.encode(r.value)}</span></li>`;if(l==="Undefined"||l==="Symbol")return`<li>${c(t)}<span class="${ve("special")}">${Z1.default(l)}</span></li>`;if(r==="(...)")return`<li>${c(t)}<span class="${ve("special")}">${r}</span></li>`;if(xv.default(r)){let p=o.get(r),m;if(p)m=p.id;else{let u={};n==="proto"&&(u.self=s),m=o.set(r,u),this.map[m]=r}let g=dC(r,l)||tC.default(a),y=i?"":`<span class="${ve("expanded collapsed")}"><span class="${ve("icon icon-caret-right")}"></span><span class="${ve("icon icon-caret-down")}"></span></span>`,h=`<li ${i?'data-first-level="true"':""} ${'data-object-id="'+m+'"'}>${y}${c(t)}<span class="${ve("open")}">${i?"":g}</span><ul class="${ve(a)}" ${i?"":'style="display:none"'}>`;return i&&(h+=this.objToHtml(r)),h+`</ul><span class="${ve("close")}"></span></li>`}function c(p){if(i||xv.default(r)&&n==="virtual")return"";let m=ve("key");return(n==="unenumerable"||n==="proto"||n==="symbol")&&(m=ve("key-lighter")),`<span class="${m}">${Ds.encode(p)}</span>: `}return`<li>${c(t)}<span class="${ve(typeof r)}">"${Ds.encode(r)}"</span></li>`}appendTpl(){this.$container.html(this.objToHtml(this.data,!0))}bindEvent(){this.$container.on("click","li",this.onItemClick)}},Il.Static=pC.default,Il)});var Mv=v((Dl,jv)=>{var mC=ft();Dl=function(e){return mC(e)==="[object Error]"};jv.exports=Dl});var Av=v((Nl,Uv)=>{Nl=function(e){var t=typeof e;return e==null||t!=="function"&&t!=="object"};Uv.exports=Nl});var Fl=v(($l,Pv)=>{var fC=Mn(),hC=fr();$l=fC(hC,!0);Pv.exports=$l});var Wl=v((zl,Ov)=>{zl=function(e){return!!(e&&e.nodeType===1)};Ov.exports=zl});var Rv=v((Gl,qv)=>{var gC=Rs();Gl=function(e){return e?(e=gC(e),e-e%1):e===0?e:0};qv.exports=Gl});var Hv=v((Jl,Iv)=>{Jl=function(e){return e===null};Iv.exports=Jl});var $v=v((Xl,Nv)=>{var Bv=Wl(),Vl=ie(),Kl=is(),_C=vl(),yC=cl(),Dv=Y(),vC=Ge();Xl=function(e,t){for(var s=arguments.length,r=new Array(s>2?s-2:0),n=2;n<s;n++)r[n-2]=arguments[n];(Bv(t)||Vl(t))&&(r.unshift(t),t=null),t||(t={});var i=bC(e),o=i.tagName,a=i.id,l=i.classes,c=document.createElement(o);return a&&c.setAttribute("id",a),_C.add(c,l),Dv(r,function(p){Vl(p)?c.appendChild(document.createTextNode(p)):Bv(p)&&c.appendChild(p)}),Dv(t,function(p,m){Vl(p)?c.setAttribute(m,p):vC(p)&&Kl(m,"on")?c.addEventListener(m.slice(2),p,!1):m==="style"&&yC(c,p)}),c};function bC(e){for(var t="div",s="",r=[],n=[],i="",o=0,a=e.length;o<a;o++){var l=e[o];l==="#"||l==="."?(n.push(i),i=l):i+=l}n.push(i);for(var c=0,p=n.length;c<p;c++)i=n[c],i&&(Kl(i,"#")?s=i.slice(1):Kl(i,".")?r.push(i.slice(1)):t=i);return{tagName:t,id:s,classes:r}}Nv.exports=Xl});var Lr=v((Zn,Fv)=>{Date.now?Zn=Date.now:Zn=function(){return new Date().getTime()};Fv.exports=Zn});var Wv=v((Yl,zv)=>{Yl=function(e){return typeof e=="symbol"};zv.exports=Yl});var Jv=v((Ql,Gv)=>{var wC=Un(),xC=Fe(),SC=ot(),LC=Wv(),EC=ie();Ql=function(e,t,s){t=wC(t,e);var r=t.pop(),n;for(n=t.shift();!xC(n);){if(!EC(n)&&!LC(n)&&(n=SC(n)),n==="__proto__"||n==="constructor"||n==="prototype")return;e[n]||(e[n]={}),e=e[n],n=t.shift()}e[r]=s};Gv.exports=Ql});var Xv=v((Zl,Kv)=>{var kC=Un(),TC=ie(),CC=Ie(),jC=Y();Zl=function(e,t,s){return TC(t)?Vv(e,t,s):CC(t)&&jC(t,function(r,n){Vv(e,n,r)}),e};function Vv(e,t,s){for(var r=kC(t,e),n=r.pop();t=r.shift();)e[t]||(e[t]={}),e=e[t];Object.defineProperty(e,n,s)}Kv.exports=Zl});var Qv=v((ec,Yv)=>{var MC=ie(),UC=Je(),AC=ht(),PC=Y();ec=function(e,t,s){if(MC(t)&&(t=[t]),UC(t)){var r=t;t=function(o,a){return AC(r,a)}}var n={},i=function(o,a){t(o,a)&&(n[a]=o)};return s&&(i=function(o,a){t(o,a)||(n[a]=o)}),PC(e,i),n};Yv.exports=ec});var cb=v(($t,lb)=>{var OC=qo(),qC=Ka(),$s=ot(),Zv=Io(),RC=$a(),nb=Re(),Er=Y(),IC=qs(),ib=Rn(),HC=El(),BC=ls(),DC=za(),NC=mr(),eb=Lr(),tb=fr(),ob=ht(),rc=Ie(),$C=wa(),sb=ya(),FC=is(),zC=Jv(),WC=Xv(),rb=Qv(),GC=Dt();$t=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.self,r=t.startTime,n=r===void 0?eb():r,i=t.timeout,o=i===void 0?0:i,a=t.depth,l=a===void 0?0:a,c=t.curDepth,p=c===void 0?1:c,m=t.visitor,g=m===void 0?new JC:m,y=t.unenumerable,h=y===void 0?!1:y,u=t.symbol,d=u===void 0?!1:u,b=t.accessGetter,x=b===void 0?!1:b,w=t.ignore,_=w===void 0?[]:w,f="",T={visitor:g,unenumerable:h,symbol:d,accessGetter:x,depth:l,curDepth:p+1,timeout:o,startTime:n,ignore:_},L=qC(e,!1);if(L==="String")f=Ns(e);else if(L==="Number")f=$s(e),Zv(f,"Infinity")&&(f='{"value":"'.concat(f,'","type":"Number"}'));else if(L==="NaN")f='{"value":"NaN","type":"Number"}';else if(L==="Boolean")f=e?"true":"false";else if(L==="Null")f="null";else if(L==="Undefined")f='{"type":"Undefined"}';else if(L==="Symbol"){var U="Symbol";try{U=$s(e)}catch{}f='{"value":'.concat(Ns(U),',"type":"Symbol"}')}else{if(o&&eb()-n>o)return Ns("Timeout");if(l&&p>l)return Ns("{...}");f="{";var I=[],Le=g.get(e),ge;if(Le?(ge=Le.id,I.push('"reference":'.concat(ge))):(ge=g.set(e),I.push('"id":'.concat(ge))),I.push('"type":"'.concat(L,'"')),Zv(L,"Function")?I.push('"value":'.concat(Ns(RC(e)))):L==="RegExp"&&I.push('"value":'.concat(Ns(e))),!Le){var pe=nb(e);if(pe.length&&I.push(tc("enumerable",pe,s||e,T)),h){var W=HC(tb(e,{prototype:!1,unenumerable:!0}),pe);W.length&&I.push(tc("unenumerable",W,s||e,T))}if(d){var me=NC(tb(e,{prototype:!1,symbol:!0}),function(K){return typeof K=="symbol"});me.length&&I.push(tc("symbol",me,s||e,T))}var P=ib(e);if(P&&!ob(_,P)){var $='"proto":'.concat($t(P,BC(T,{self:s||e})));I.push($)}}f+=I.join(",")+"}"}return f};function tc(e,t,s,r){var n=[];return Er(t,function(i){var o,a=Object.getOwnPropertyDescriptor(s,i),l=a&&a.get,c=a&&a.set;if(!r.accessGetter&&l)o="(...)";else try{if(o=s[i],ob(r.ignore,o))return;DC(o)&&o.catch(function(){})}catch(p){o=p.message}n.push("".concat(sc(i),":").concat($t(o,r))),l&&n.push("".concat(sc("get "+$s(i)),":").concat($t(a.get,r))),c&&n.push("".concat(sc("set "+$s(i)),":").concat($t(a.set,r)))}),'"'.concat(e,'":{')+n.join(",")+"}"}function sc(e){return'"'.concat(ab(e),'"')}function Ns(e){return'"'.concat(ab($s(e)),'"')}function ab(e){return OC(e).replace(/\\'/g,"'").replace(/\t/g,"\\t")}var JC=IC({initialize:function(){this.id=1,this.visited=[]},set:function(e){var t=this.visited,s=this.id,r={id:s,val:e};return t.push(r),this.id++,s},get:function(e){for(var t=this.visited,s=0,r=t.length;s<r;s++){var n=t[s];if(e===n.val)return n}return!1}});$t.parse=function(e){var t={},s=ms(JSON.parse(e),{map:t});return VC(t),s};function VC(e){Er(e,function(t){for(var s=nb(t),r=0,n=s.length;r<n;r++){var i=s[r];if(rc(t[i])){var o=t[i].reference;o&&e[o]&&(t[i]=e[o])}}var a=ib(t);a&&a.reference&&e[a.reference]&&Object.setPrototypeOf(t,e[a.reference])})}function ms(e,t){var s=t.map;if(!rc(e))return e;var r=e.id,n=e.type,i=e.value,o=e.proto,a=e.reference,l=e.enumerable,c=e.unenumerable;if(a)return e;if(n==="Number")return i==="Infinity"?Number.POSITIVE_INFINITY:i==="-Infinity"?Number.NEGATIVE_INFINITY:NaN;if(n==="Undefined")return;var p;if(n==="Function")p=function(){},p.toString=function(){return i},o&&Object.setPrototypeOf(p,ms(o,t));else if(n==="RegExp")p=XC(i);else if(n!=="Object"){var m;$C?m=function(){}:m=new Function(n,""),o&&(m.prototype=ms(o,t)),p=new m}else o?p=sb(ms(o,t)):p=sb(null);var g={};if(l){var y;GC(l)&&(y=l.length,delete l.length),l=rb(l,function(u,d){return!h(l,u,d)}),Er(l,function(u,d){var b=g[d]||{};b.get||(p[d]=ms(u,t))}),y&&(p.length=y)}c&&(c=rb(c,function(u,d){return!h(c,u,d)}),Er(c,function(u,d){var b=g[d]||{};if(!b.get)if(u=ms(u,t),rc(u)&&u.reference){var x=u.reference;u=function(){return s[x]},b.get=u}else b.value=u;b.enumerable=!1,g[d]=b})),WC(p,g);function h(u,d,b){b=$s(b);var x=!1;return Er(["get","set"],function(w){if(FC(b,w+" ")){var _=b.replace(w+" ","");u[_]&&(d=ms(d,t),d==="Timeout"&&(d=KC),zC(g,[_,w],d),x=!0)}}),x}return s[r]=p,p}function KC(){return"Timeout"}function XC(e){var t=e.lastIndexOf("/");return new RegExp(e.slice(1,t),e.slice(t+1))}lb.exports=$t});var db=v((kr,ub)=>{typeof process=="object"&&process.nextTick?kr=process.nextTick:typeof setImmediate=="function"?kr=function(e){setImmediate(pb(e))}:kr=function(e){setTimeout(pb(e),0)};function pb(e){if(typeof e!="function")throw new TypeError(e+" is not a function");return e}ub.exports=kr});var fb=v((nc,mb)=>{var YC=In(),QC=os(),ZC=Os(),ej=gt();nc=function(e){var t=ej(e.match(tj));return YC(ZC(t,function(s){return QC(s)}))};var tj=/((https?)|(ftp)):\/\/[\w.]+[^ \f\n\r\t\v"\\<>[\]\u2100-\uFFFF(),]*/gi;mb.exports=nc});var gb=v((ic,hb)=>{ic=function(e){return e.replace(/\W/g,"\\$&")};hb.exports=ic});var yb=v((oc,_b)=>{var sj=fb(),rj=Y(),nj=gb();oc=function(e,t){t=t||ij;var s=sj(e);return rj(s,function(r){e=e.replace(new RegExp(nj(r),"g"),t)}),e};function ij(e){return'<a href="'+e+'">'+e+"</a>"}_b.exports=oc});var bb=v((ti,vb)=>{var ei=Y(),oj=Fl();ti=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"js",s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};oj(s,aj),e=e.replace(/</g,"&lt;").replace(/>/g,"&gt;"),t=Ft[t];var r=0,n=[];ei(t,function(o){o.language&&(e=e.replace(o.re,function(a,l){return l?(n[r++]=ti(l,o.language,s),a.replace(l,"___subtmpl"+(r-1)+"___")):a}))}),ei(t,function(o,a){Ft[o.language]||(e=e.replace(o.re,"___"+a+"___$1___end"+a+"___"))});var i=[];return e=e.replace(/___(?!subtmpl)\w+?___/g,function(o){var a=o.substr(3,3)==="end",l=(a?o.substr(6):o.substr(3)).replace(/_/g,""),c=i.length>0?i[i.length-1]:null;return!a&&(c==null||l==c||c!=null&&t[c]&&t[c].embed!=null&&t[c].embed.indexOf(l)>-1)?(i.push(l),o):a&&l==c?(i.pop(),o):""}),ei(t,function(o,a){var l=s[o.style]?' style="'.concat(s[o.style],'"'):"";e=e.replace(new RegExp("___end"+a+"___","g"),"</span>").replace(new RegExp("___"+a+"___","g"),'<span class="'.concat(o.style,'"').concat(l,">"))}),ei(t,function(o){o.language&&(e=e.replace(/___subtmpl\d+___/g,function(a){var l=parseInt(a.replace(/___subtmpl(\d+)___/,"$1"),10);return n[l]}))}),e};var aj={comment:"color:#63a35c;",string:"color:#183691;",number:"color:#0086b3;",keyword:"color:#a71d5d;",operator:"color:#994500;"},Ft={};Ft.js={comment:{re:/(\/\/.*|\/\*([\s\S]*?)\*\/)/g,style:"comment"},string:{re:/(('.*?')|(".*?"))/g,style:"string"},numbers:{re:/(-?(\d+|\d+\.\d+|\.\d+))/g,style:"number"},keywords:{re:/(?:\b)(function|for|foreach|while|if|else|elseif|switch|break|as|return|this|class|self|default|var|const|let|false|true|null|undefined)(?:\b)/gi,style:"keyword"},operator:{re:/(\+|-|\/|\*|%|=|&lt;|&gt;|\||\?|\.)/g,style:"operator"}};Ft.html={comment:{re:/(&lt;!--([\s\S]*?)--&gt;)/g,style:"comment"},tag:{re:/(&lt;\/?\w(.|\n)*?\/?&gt;)/g,style:"keyword",embed:["string"]},string:Ft.js.string,css:{re:/(?:&lt;style.*?&gt;)([\s\S]*)?(?:&lt;\/style&gt;)/gi,language:"css"},script:{re:/(?:&lt;script.*?&gt;)([\s\S]*?)(?:&lt;\/script&gt;)/gi,language:"js"}};Ft.css={comment:Ft.js.comment,string:Ft.js.string,numbers:{re:/((-?(\d+|\d+\.\d+|\.\d+)(%|px|em|pt|in)?)|#[0-9a-fA-F]{3}[0-9a-fA-F]{3})/g,style:"number"},keywords:{re:/(@\w+|:?:\w+|[a-z-]+:)/g,style:"keyword"}};vb.exports=ti});var xb=v((ac,wb)=>{ac=function(){for(var e=arguments,t=e[0],s=1,r=e.length;s<r;s++)e[s]<t&&(t=e[s]);return t};wb.exports=ac});var cc=v((lc,Sb)=>{var lj=ie(),cj=gt(),pj=xb(),uj=Os(),dj=os();lc=function(e){lj(e)&&(e=cj(e));for(var t="",s=arguments.length,r=new Array(s>1?s-1:0),n=1;n<s;n++)r[n-1]=arguments[n];for(var i=0,o=e.length;i<o;i++)t+=e[i],r[i]&&(t+=r[i]);for(var a=t.split(`
`),l=[],c=0,p=a.length;c<p;c++){var m=a[c],g=m.match(mj);g&&l.push(g[1].length)}var y=l.length>0?pj.apply(null,l):0;return dj(uj(a,function(h){return h[0]===" "?h.slice(y):h}).join(`
`))};var mj=/^(\s+)\S+/;Sb.exports=lc});var si=v((r$,Lb)=>{"use strict";function be(e){this.__parent=e,this.__character_count=0,this.__indent_count=-1,this.__alignment_count=0,this.__wrap_point_index=0,this.__wrap_point_character_count=0,this.__wrap_point_indent_count=-1,this.__wrap_point_alignment_count=0,this.__items=[]}be.prototype.clone_empty=function(){var e=new be(this.__parent);return e.set_indent(this.__indent_count,this.__alignment_count),e};be.prototype.item=function(e){return e<0?this.__items[this.__items.length+e]:this.__items[e]};be.prototype.has_match=function(e){for(var t=this.__items.length-1;t>=0;t--)if(this.__items[t].match(e))return!0;return!1};be.prototype.set_indent=function(e,t){this.is_empty()&&(this.__indent_count=e||0,this.__alignment_count=t||0,this.__character_count=this.__parent.get_indent_size(this.__indent_count,this.__alignment_count))};be.prototype._set_wrap_point=function(){this.__parent.wrap_line_length&&(this.__wrap_point_index=this.__items.length,this.__wrap_point_character_count=this.__character_count,this.__wrap_point_indent_count=this.__parent.next_line.__indent_count,this.__wrap_point_alignment_count=this.__parent.next_line.__alignment_count)};be.prototype._should_wrap=function(){return this.__wrap_point_index&&this.__character_count>this.__parent.wrap_line_length&&this.__wrap_point_character_count>this.__parent.next_line.__character_count};be.prototype._allow_wrap=function(){if(this._should_wrap()){this.__parent.add_new_line();var e=this.__parent.current_line;return e.set_indent(this.__wrap_point_indent_count,this.__wrap_point_alignment_count),e.__items=this.__items.slice(this.__wrap_point_index),this.__items=this.__items.slice(0,this.__wrap_point_index),e.__character_count+=this.__character_count-this.__wrap_point_character_count,this.__character_count=this.__wrap_point_character_count,e.__items[0]===" "&&(e.__items.splice(0,1),e.__character_count-=1),!0}return!1};be.prototype.is_empty=function(){return this.__items.length===0};be.prototype.last=function(){return this.is_empty()?null:this.__items[this.__items.length-1]};be.prototype.push=function(e){this.__items.push(e);var t=e.lastIndexOf(`
`);t!==-1?this.__character_count=e.length-t:this.__character_count+=e.length};be.prototype.pop=function(){var e=null;return this.is_empty()||(e=this.__items.pop(),this.__character_count-=e.length),e};be.prototype._remove_indent=function(){this.__indent_count>0&&(this.__indent_count-=1,this.__character_count-=this.__parent.indent_size)};be.prototype._remove_wrap_indent=function(){this.__wrap_point_indent_count>0&&(this.__wrap_point_indent_count-=1)};be.prototype.trim=function(){for(;this.last()===" ";)this.__items.pop(),this.__character_count-=1};be.prototype.toString=function(){var e="";return this.is_empty()?this.__parent.indent_empty_lines&&(e=this.__parent.get_indent_string(this.__indent_count)):(e=this.__parent.get_indent_string(this.__indent_count,this.__alignment_count),e+=this.__items.join("")),e};function Tr(e,t){this.__cache=[""],this.__indent_size=e.indent_size,this.__indent_string=e.indent_char,e.indent_with_tabs||(this.__indent_string=new Array(e.indent_size+1).join(e.indent_char)),t=t||"",e.indent_level>0&&(t=new Array(e.indent_level+1).join(this.__indent_string)),this.__base_string=t,this.__base_string_length=t.length}Tr.prototype.get_indent_size=function(e,t){var s=this.__base_string_length;return t=t||0,e<0&&(s=0),s+=e*this.__indent_size,s+=t,s};Tr.prototype.get_indent_string=function(e,t){var s=this.__base_string;return t=t||0,e<0&&(e=0,s=""),t+=e*this.__indent_size,this.__ensure_cache(t),s+=this.__cache[t],s};Tr.prototype.__ensure_cache=function(e){for(;e>=this.__cache.length;)this.__add_column()};Tr.prototype.__add_column=function(){var e=this.__cache.length,t=0,s="";this.__indent_size&&e>=this.__indent_size&&(t=Math.floor(e/this.__indent_size),e-=t*this.__indent_size,s=new Array(t+1).join(this.__indent_string)),e&&(s+=new Array(e+1).join(" ")),this.__cache.push(s)};function we(e,t){this.__indent_cache=new Tr(e,t),this.raw=!1,this._end_with_newline=e.end_with_newline,this.indent_size=e.indent_size,this.wrap_line_length=e.wrap_line_length,this.indent_empty_lines=e.indent_empty_lines,this.__lines=[],this.previous_line=null,this.current_line=null,this.next_line=new be(this),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1,this.__add_outputline()}we.prototype.__add_outputline=function(){this.previous_line=this.current_line,this.current_line=this.next_line.clone_empty(),this.__lines.push(this.current_line)};we.prototype.get_line_number=function(){return this.__lines.length};we.prototype.get_indent_string=function(e,t){return this.__indent_cache.get_indent_string(e,t)};we.prototype.get_indent_size=function(e,t){return this.__indent_cache.get_indent_size(e,t)};we.prototype.is_empty=function(){return!this.previous_line&&this.current_line.is_empty()};we.prototype.add_new_line=function(e){return this.is_empty()||!e&&this.just_added_newline()?!1:(this.raw||this.__add_outputline(),!0)};we.prototype.get_code=function(e){this.trim(!0);var t=this.current_line.pop();t&&(t[t.length-1]===`
`&&(t=t.replace(/\n+$/g,"")),this.current_line.push(t)),this._end_with_newline&&this.__add_outputline();var s=this.__lines.join(`
`);return e!==`
`&&(s=s.replace(/[\n]/g,e)),s};we.prototype.set_wrap_point=function(){this.current_line._set_wrap_point()};we.prototype.set_indent=function(e,t){return e=e||0,t=t||0,this.next_line.set_indent(e,t),this.__lines.length>1?(this.current_line.set_indent(e,t),!0):(this.current_line.set_indent(),!1)};we.prototype.add_raw_token=function(e){for(var t=0;t<e.newlines;t++)this.__add_outputline();this.current_line.set_indent(-1),this.current_line.push(e.whitespace_before),this.current_line.push(e.text),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1};we.prototype.add_token=function(e){this.__add_space_before_token(),this.current_line.push(e),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=this.current_line._allow_wrap()};we.prototype.__add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&(this.non_breaking_space||this.set_wrap_point(),this.current_line.push(" "))};we.prototype.remove_indent=function(e){for(var t=this.__lines.length;e<t;)this.__lines[e]._remove_indent(),e++;this.current_line._remove_wrap_indent()};we.prototype.trim=function(e){for(e=e===void 0?!1:e,this.current_line.trim();e&&this.__lines.length>1&&this.current_line.is_empty();)this.__lines.pop(),this.current_line=this.__lines[this.__lines.length-1],this.current_line.trim();this.previous_line=this.__lines.length>1?this.__lines[this.__lines.length-2]:null};we.prototype.just_added_newline=function(){return this.current_line.is_empty()};we.prototype.just_added_blankline=function(){return this.is_empty()||this.current_line.is_empty()&&this.previous_line.is_empty()};we.prototype.ensure_empty_line_above=function(e,t){for(var s=this.__lines.length-2;s>=0;){var r=this.__lines[s];if(r.is_empty())break;if(r.item(0).indexOf(e)!==0&&r.item(-1)!==t){this.__lines.splice(s+1,0,new be(this)),this.previous_line=this.__lines[this.__lines.length-2];break}s--}};Lb.exports.Output=we});var pc=v((n$,Eb)=>{"use strict";function fj(e,t,s,r){this.type=e,this.text=t,this.comments_before=null,this.newlines=s||0,this.whitespace_before=r||"",this.parent=null,this.next=null,this.previous=null,this.opened=null,this.closed=null,this.directives=null}Eb.exports.Token=fj});var dc=v(kt=>{"use strict";var hj="\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a",kb="\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a",uc="\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc",Tb="\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f",Cb="(?:\\\\u[0-9a-fA-F]{4}|["+hj+uc+"])",gj="(?:\\\\u[0-9a-fA-F]{4}|["+kb+uc+Tb+"])*";kt.identifier=new RegExp(Cb+gj,"g");kt.identifierStart=new RegExp(Cb);kt.identifierMatch=new RegExp("(?:\\\\u[0-9a-fA-F]{4}|["+kb+uc+Tb+"])+");kt.newline=/[\n\r\u2028\u2029]/;kt.lineBreak=new RegExp(`\r
|`+kt.newline.source);kt.allLineBreaks=new RegExp(kt.lineBreak.source,"g")});var ni=v((o$,ri)=>{"use strict";function zt(e,t){this.raw_options=jb(e,t),this.disabled=this._get_boolean("disabled"),this.eol=this._get_characters("eol","auto"),this.end_with_newline=this._get_boolean("end_with_newline"),this.indent_size=this._get_number("indent_size",4),this.indent_char=this._get_characters("indent_char"," "),this.indent_level=this._get_number("indent_level"),this.preserve_newlines=this._get_boolean("preserve_newlines",!0),this.max_preserve_newlines=this._get_number("max_preserve_newlines",32786),this.preserve_newlines||(this.max_preserve_newlines=0),this.indent_with_tabs=this._get_boolean("indent_with_tabs",this.indent_char==="	"),this.indent_with_tabs&&(this.indent_char="	",this.indent_size===1&&(this.indent_size=4)),this.wrap_line_length=this._get_number("wrap_line_length",this._get_number("max_char")),this.indent_empty_lines=this._get_boolean("indent_empty_lines"),this.templating=this._get_selection_list("templating",["auto","none","django","erb","handlebars","php","smarty"],["auto"])}zt.prototype._get_array=function(e,t){var s=this.raw_options[e],r=t||[];return typeof s=="object"?s!==null&&typeof s.concat=="function"&&(r=s.concat()):typeof s=="string"&&(r=s.split(/[^a-zA-Z0-9_\/\-]+/)),r};zt.prototype._get_boolean=function(e,t){var s=this.raw_options[e],r=s===void 0?!!t:!!s;return r};zt.prototype._get_characters=function(e,t){var s=this.raw_options[e],r=t||"";return typeof s=="string"&&(r=s.replace(/\\r/,"\r").replace(/\\n/,`
`).replace(/\\t/,"	")),r};zt.prototype._get_number=function(e,t){var s=this.raw_options[e];t=parseInt(t,10),isNaN(t)&&(t=0);var r=parseInt(s,10);return isNaN(r)&&(r=t),r};zt.prototype._get_selection=function(e,t,s){var r=this._get_selection_list(e,t,s);if(r.length!==1)throw new Error("Invalid Option Value: The option '"+e+`' can only be one of the following values:
`+t+`
You passed in: '`+this.raw_options[e]+"'");return r[0]};zt.prototype._get_selection_list=function(e,t,s){if(!t||t.length===0)throw new Error("Selection list cannot be empty.");if(s=s||[t[0]],!this._is_valid_selection(s,t))throw new Error("Invalid Default Value!");var r=this._get_array(e,s);if(!this._is_valid_selection(r,t))throw new Error("Invalid Option Value: The option '"+e+`' can contain only the following values:
`+t+`
You passed in: '`+this.raw_options[e]+"'");return r};zt.prototype._is_valid_selection=function(e,t){return e.length&&t.length&&!e.some(function(s){return t.indexOf(s)===-1})};function jb(e,t){var s={};e=Mb(e);var r;for(r in e)r!==t&&(s[r]=e[r]);if(t&&e[t])for(r in e[t])s[r]=e[t][r];return s}function Mb(e){var t={},s;for(s in e){var r=s.replace(/-/g,"_");t[r]=e[s]}return t}ri.exports.Options=zt;ri.exports.normalizeOpts=Mb;ri.exports.mergeOpts=jb});var mc=v((a$,Pb)=>{"use strict";var Ub=ni().Options,_j=["before-newline","after-newline","preserve-newline"];function Ab(e){Ub.call(this,e,"js");var t=this.raw_options.brace_style||null;t==="expand-strict"?this.raw_options.brace_style="expand":t==="collapse-preserve-inline"?this.raw_options.brace_style="collapse,preserve-inline":this.raw_options.braces_on_own_line!==void 0&&(this.raw_options.brace_style=this.raw_options.braces_on_own_line?"expand":"collapse");var s=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_preserve_inline=!1,this.brace_style="collapse";for(var r=0;r<s.length;r++)s[r]==="preserve-inline"?this.brace_preserve_inline=!0:this.brace_style=s[r];this.unindent_chained_methods=this._get_boolean("unindent_chained_methods"),this.break_chained_methods=this._get_boolean("break_chained_methods"),this.space_in_paren=this._get_boolean("space_in_paren"),this.space_in_empty_paren=this._get_boolean("space_in_empty_paren"),this.jslint_happy=this._get_boolean("jslint_happy"),this.space_after_anon_function=this._get_boolean("space_after_anon_function"),this.space_after_named_function=this._get_boolean("space_after_named_function"),this.keep_array_indentation=this._get_boolean("keep_array_indentation"),this.space_before_conditional=this._get_boolean("space_before_conditional",!0),this.unescape_strings=this._get_boolean("unescape_strings"),this.e4x=this._get_boolean("e4x"),this.comma_first=this._get_boolean("comma_first"),this.operator_position=this._get_selection("operator_position",_j),this.test_output_raw=this._get_boolean("test_output_raw"),this.jslint_happy&&(this.space_after_anon_function=!0)}Ab.prototype=new Ub;Pb.exports.Options=Ab});var ii=v((l$,qb)=>{"use strict";var Ob=RegExp.prototype.hasOwnProperty("sticky");function Ce(e){this.__input=e||"",this.__input_length=this.__input.length,this.__position=0}Ce.prototype.restart=function(){this.__position=0};Ce.prototype.back=function(){this.__position>0&&(this.__position-=1)};Ce.prototype.hasNext=function(){return this.__position<this.__input_length};Ce.prototype.next=function(){var e=null;return this.hasNext()&&(e=this.__input.charAt(this.__position),this.__position+=1),e};Ce.prototype.peek=function(e){var t=null;return e=e||0,e+=this.__position,e>=0&&e<this.__input_length&&(t=this.__input.charAt(e)),t};Ce.prototype.__match=function(e,t){e.lastIndex=t;var s=e.exec(this.__input);return s&&!(Ob&&e.sticky)&&s.index!==t&&(s=null),s};Ce.prototype.test=function(e,t){return t=t||0,t+=this.__position,t>=0&&t<this.__input_length?!!this.__match(e,t):!1};Ce.prototype.testChar=function(e,t){var s=this.peek(t);return e.lastIndex=0,s!==null&&e.test(s)};Ce.prototype.match=function(e){var t=this.__match(e,this.__position);return t?this.__position+=t[0].length:t=null,t};Ce.prototype.read=function(e,t,s){var r="",n;return e&&(n=this.match(e),n&&(r+=n[0])),t&&(n||!e)&&(r+=this.readUntil(t,s)),r};Ce.prototype.readUntil=function(e,t){var s="",r=this.__position;e.lastIndex=this.__position;var n=e.exec(this.__input);return n?(r=n.index,t&&(r+=n[0].length)):r=this.__input_length,s=this.__input.substring(this.__position,r),this.__position=r,s};Ce.prototype.readUntilAfter=function(e){return this.readUntil(e,!0)};Ce.prototype.get_regexp=function(e,t){var s=null,r="g";return t&&Ob&&(r="y"),typeof e=="string"&&e!==""?s=new RegExp(e,r):e&&(s=new RegExp(e.source,r)),s};Ce.prototype.get_literal_regexp=function(e){return RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"))};Ce.prototype.peekUntilAfter=function(e){var t=this.__position,s=this.readUntilAfter(e);return this.__position=t,s};Ce.prototype.lookBack=function(e){var t=this.__position-1;return t>=e.length&&this.__input.substring(t-e.length,t).toLowerCase()===e};qb.exports.InputScanner=Ce});var Ib=v((c$,Rb)=>{"use strict";function fs(e){this.__tokens=[],this.__tokens_length=this.__tokens.length,this.__position=0,this.__parent_token=e}fs.prototype.restart=function(){this.__position=0};fs.prototype.isEmpty=function(){return this.__tokens_length===0};fs.prototype.hasNext=function(){return this.__position<this.__tokens_length};fs.prototype.next=function(){var e=null;return this.hasNext()&&(e=this.__tokens[this.__position],this.__position+=1),e};fs.prototype.peek=function(e){var t=null;return e=e||0,e+=this.__position,e>=0&&e<this.__tokens_length&&(t=this.__tokens[e]),t};fs.prototype.add=function(e){this.__parent_token&&(e.parent=this.__parent_token),this.__tokens.push(e),this.__tokens_length+=1};Rb.exports.TokenStream=fs});var Cr=v((p$,Hb)=>{"use strict";function yt(e,t){this._input=e,this._starting_pattern=null,this._match_pattern=null,this._until_pattern=null,this._until_after=!1,t&&(this._starting_pattern=this._input.get_regexp(t._starting_pattern,!0),this._match_pattern=this._input.get_regexp(t._match_pattern,!0),this._until_pattern=this._input.get_regexp(t._until_pattern),this._until_after=t._until_after)}yt.prototype.read=function(){var e=this._input.read(this._starting_pattern);return(!this._starting_pattern||e)&&(e+=this._input.read(this._match_pattern,this._until_pattern,this._until_after)),e};yt.prototype.read_match=function(){return this._input.match(this._match_pattern)};yt.prototype.until_after=function(e){var t=this._create();return t._until_after=!0,t._until_pattern=this._input.get_regexp(e),t._update(),t};yt.prototype.until=function(e){var t=this._create();return t._until_after=!1,t._until_pattern=this._input.get_regexp(e),t._update(),t};yt.prototype.starting_with=function(e){var t=this._create();return t._starting_pattern=this._input.get_regexp(e,!0),t._update(),t};yt.prototype.matching=function(e){var t=this._create();return t._match_pattern=this._input.get_regexp(e,!0),t._update(),t};yt.prototype._create=function(){return new yt(this._input,this)};yt.prototype._update=function(){};Hb.exports.Pattern=yt});var Nb=v((u$,Db)=>{"use strict";var Bb=Cr().Pattern;function Wt(e,t){Bb.call(this,e,t),t?this._line_regexp=this._input.get_regexp(t._line_regexp):this.__set_whitespace_patterns("",""),this.newline_count=0,this.whitespace_before_token=""}Wt.prototype=new Bb;Wt.prototype.__set_whitespace_patterns=function(e,t){e+="\\t ",t+="\\n\\r",this._match_pattern=this._input.get_regexp("["+e+t+"]+",!0),this._newline_regexp=this._input.get_regexp("\\r\\n|["+t+"]")};Wt.prototype.read=function(){this.newline_count=0,this.whitespace_before_token="";var e=this._input.read(this._match_pattern);if(e===" ")this.whitespace_before_token=" ";else if(e){var t=this.__split(this._newline_regexp,e);this.newline_count=t.length-1,this.whitespace_before_token=t[this.newline_count]}return e};Wt.prototype.matching=function(e,t){var s=this._create();return s.__set_whitespace_patterns(e,t),s._update(),s};Wt.prototype._create=function(){return new Wt(this._input,this)};Wt.prototype.__split=function(e,t){e.lastIndex=0;for(var s=0,r=[],n=e.exec(t);n;)r.push(t.substring(s,n.index)),s=n.index+n[0].length,n=e.exec(t);return s<t.length?r.push(t.substring(s,t.length)):r.push(""),r};Db.exports.WhitespacePattern=Wt});var Mr=v((d$,hc)=>{"use strict";var yj=ii().InputScanner,$b=pc().Token,fc=Ib().TokenStream,vj=Nb().WhitespacePattern,jr={START:"TK_START",RAW:"TK_RAW",EOF:"TK_EOF"},vt=function(e,t){this._input=new yj(e),this._options=t||{},this.__tokens=null,this._patterns={},this._patterns.whitespace=new vj(this._input)};vt.prototype.tokenize=function(){this._input.restart(),this.__tokens=new fc,this._reset();for(var e,t=new $b(jr.START,""),s=null,r=[],n=new fc;t.type!==jr.EOF;){for(e=this._get_next_token(t,s);this._is_comment(e);)n.add(e),e=this._get_next_token(t,s);n.isEmpty()||(e.comments_before=n,n=new fc),e.parent=s,this._is_opening(e)?(r.push(s),s=e):s&&this._is_closing(e,s)&&(e.opened=s,s.closed=e,s=r.pop(),e.parent=s),e.previous=t,t.next=e,this.__tokens.add(e),t=e}return this.__tokens};vt.prototype._is_first_token=function(){return this.__tokens.isEmpty()};vt.prototype._reset=function(){};vt.prototype._get_next_token=function(e,t){this._readWhitespace();var s=this._input.read(/.+/g);return s?this._create_token(jr.RAW,s):this._create_token(jr.EOF,"")};vt.prototype._is_comment=function(e){return!1};vt.prototype._is_opening=function(e){return!1};vt.prototype._is_closing=function(e,t){return!1};vt.prototype._create_token=function(e,t){var s=new $b(e,t,this._patterns.whitespace.newline_count,this._patterns.whitespace.whitespace_before_token);return s};vt.prototype._readWhitespace=function(){return this._patterns.whitespace.read()};hc.exports.Tokenizer=vt;hc.exports.TOKEN=jr});var oi=v((m$,Fb)=>{"use strict";function gc(e,t){e=typeof e=="string"?e:e.source,t=typeof t=="string"?t:t.source,this.__directives_block_pattern=new RegExp(e+/ beautify( \w+[:]\w+)+ /.source+t,"g"),this.__directive_pattern=/ (\w+)[:](\w+)/g,this.__directives_end_ignore_pattern=new RegExp(e+/\sbeautify\signore:end\s/.source+t,"g")}gc.prototype.get_directives=function(e){if(!e.match(this.__directives_block_pattern))return null;var t={};this.__directive_pattern.lastIndex=0;for(var s=this.__directive_pattern.exec(e);s;)t[s[1]]=s[2],s=this.__directive_pattern.exec(e);return t};gc.prototype.readIgnored=function(e){return e.readUntilAfter(this.__directives_end_ignore_pattern)};Fb.exports.Directives=gc});var vc=v((f$,zb)=>{"use strict";var _c=Cr().Pattern,yc={django:!1,erb:!1,handlebars:!1,php:!1,smarty:!1};function lt(e,t){_c.call(this,e,t),this.__template_pattern=null,this._disabled=Object.assign({},yc),this._excluded=Object.assign({},yc),t&&(this.__template_pattern=this._input.get_regexp(t.__template_pattern),this._excluded=Object.assign(this._excluded,t._excluded),this._disabled=Object.assign(this._disabled,t._disabled));var s=new _c(e);this.__patterns={handlebars_comment:s.starting_with(/{{!--/).until_after(/--}}/),handlebars_unescaped:s.starting_with(/{{{/).until_after(/}}}/),handlebars:s.starting_with(/{{/).until_after(/}}/),php:s.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),erb:s.starting_with(/<%[^%]/).until_after(/[^%]%>/),django:s.starting_with(/{%/).until_after(/%}/),django_value:s.starting_with(/{{/).until_after(/}}/),django_comment:s.starting_with(/{#/).until_after(/#}/),smarty:s.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),smarty_comment:s.starting_with(/{\*/).until_after(/\*}/),smarty_literal:s.starting_with(/{literal}/).until_after(/{\/literal}/)}}lt.prototype=new _c;lt.prototype._create=function(){return new lt(this._input,this)};lt.prototype._update=function(){this.__set_templated_pattern()};lt.prototype.disable=function(e){var t=this._create();return t._disabled[e]=!0,t._update(),t};lt.prototype.read_options=function(e){var t=this._create();for(var s in yc)t._disabled[s]=e.templating.indexOf(s)===-1;return t._update(),t};lt.prototype.exclude=function(e){var t=this._create();return t._excluded[e]=!0,t._update(),t};lt.prototype.read=function(){var e="";this._match_pattern?e=this._input.read(this._starting_pattern):e=this._input.read(this._starting_pattern,this.__template_pattern);for(var t=this._read_template();t;)this._match_pattern?t+=this._input.read(this._match_pattern):t+=this._input.readUntil(this.__template_pattern),e+=t,t=this._read_template();return this._until_after&&(e+=this._input.readUntilAfter(this._until_pattern)),e};lt.prototype.__set_templated_pattern=function(){var e=[];this._disabled.php||e.push(this.__patterns.php._starting_pattern.source),this._disabled.handlebars||e.push(this.__patterns.handlebars._starting_pattern.source),this._disabled.erb||e.push(this.__patterns.erb._starting_pattern.source),this._disabled.django||(e.push(this.__patterns.django._starting_pattern.source),e.push(this.__patterns.django_value._starting_pattern.source),e.push(this.__patterns.django_comment._starting_pattern.source)),this._disabled.smarty||e.push(this.__patterns.smarty._starting_pattern.source),this._until_pattern&&e.push(this._until_pattern.source),this.__template_pattern=this._input.get_regexp("(?:"+e.join("|")+")")};lt.prototype._read_template=function(){var e="",t=this._input.peek();if(t==="<"){var s=this._input.peek(1);!this._disabled.php&&!this._excluded.php&&s==="?"&&(e=e||this.__patterns.php.read()),!this._disabled.erb&&!this._excluded.erb&&s==="%"&&(e=e||this.__patterns.erb.read())}else t==="{"&&(!this._disabled.handlebars&&!this._excluded.handlebars&&(e=e||this.__patterns.handlebars_comment.read(),e=e||this.__patterns.handlebars_unescaped.read(),e=e||this.__patterns.handlebars.read()),this._disabled.django||(!this._excluded.django&&!this._excluded.handlebars&&(e=e||this.__patterns.django_value.read()),this._excluded.django||(e=e||this.__patterns.django_comment.read(),e=e||this.__patterns.django.read())),this._disabled.smarty||this._disabled.django&&this._disabled.handlebars&&(e=e||this.__patterns.smarty_comment.read(),e=e||this.__patterns.smarty_literal.read(),e=e||this.__patterns.smarty.read()));return e};zb.exports.TemplatablePattern=lt});var Ar=v((h$,Ur)=>{"use strict";var bj=ii().InputScanner,Gb=Mr().Tokenizer,bc=Mr().TOKEN,wj=oi().Directives,Ve=dc(),xj=Cr().Pattern,Sj=vc().TemplatablePattern;function wc(e,t){return t.indexOf(e)!==-1}var H={START_EXPR:"TK_START_EXPR",END_EXPR:"TK_END_EXPR",START_BLOCK:"TK_START_BLOCK",END_BLOCK:"TK_END_BLOCK",WORD:"TK_WORD",RESERVED:"TK_RESERVED",SEMICOLON:"TK_SEMICOLON",STRING:"TK_STRING",EQUALS:"TK_EQUALS",OPERATOR:"TK_OPERATOR",COMMA:"TK_COMMA",BLOCK_COMMENT:"TK_BLOCK_COMMENT",COMMENT:"TK_COMMENT",DOT:"TK_DOT",UNKNOWN:"TK_UNKNOWN",START:bc.START,RAW:bc.RAW,EOF:bc.EOF},Wb=new wj(/\/\*/,/\*\//),Lj=/0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/,Ej=/[0-9]/,kj=/[^\d\.]/,Tj=">>> === !== << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" "),hs=">>>= ... >>= <<= === >>> !== **= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";hs=hs.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&");hs="\\?\\.(?!\\d) "+hs;hs=hs.replace(/ /g,"|");var Cj=new RegExp(hs),Jb="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","),jj=Jb.concat(["do","in","of","else","get","set","new","catch","finally","typeof","yield","async","await","from","as"]),Mj=new RegExp("^(?:"+jj.join("|")+")$"),ai,je=function(e,t){Gb.call(this,e,t),this._patterns.whitespace=this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,/\u2028\u2029/.source);var s=new xj(this._input),r=new Sj(this._input).read_options(this._options);this.__patterns={template:r,identifier:r.starting_with(Ve.identifier).matching(Ve.identifierMatch),number:s.matching(Lj),punct:s.matching(Cj),comment:s.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),block_comment:s.starting_with(/\/\*/).until_after(/\*\//),html_comment_start:s.matching(/<!--/),html_comment_end:s.matching(/-->/),include:s.starting_with(/#include/).until_after(Ve.lineBreak),shebang:s.starting_with(/#!/).until_after(Ve.lineBreak),xml:s.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\]|)(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/),single_quote:r.until(/['\\\n\r\u2028\u2029]/),double_quote:r.until(/["\\\n\r\u2028\u2029]/),template_text:r.until(/[`\\$]/),template_expression:r.until(/[`}\\]/)}};je.prototype=new Gb;je.prototype._is_comment=function(e){return e.type===H.COMMENT||e.type===H.BLOCK_COMMENT||e.type===H.UNKNOWN};je.prototype._is_opening=function(e){return e.type===H.START_BLOCK||e.type===H.START_EXPR};je.prototype._is_closing=function(e,t){return(e.type===H.END_BLOCK||e.type===H.END_EXPR)&&t&&(e.text==="]"&&t.text==="["||e.text===")"&&t.text==="("||e.text==="}"&&t.text==="{")};je.prototype._reset=function(){ai=!1};je.prototype._get_next_token=function(e,t){var s=null;this._readWhitespace();var r=this._input.peek();return r===null?this._create_token(H.EOF,""):(s=s||this._read_non_javascript(r),s=s||this._read_string(r),s=s||this._read_word(e),s=s||this._read_singles(r),s=s||this._read_comment(r),s=s||this._read_regexp(r,e),s=s||this._read_xml(r,e),s=s||this._read_punctuation(),s=s||this._create_token(H.UNKNOWN,this._input.next()),s)};je.prototype._read_word=function(e){var t;if(t=this.__patterns.identifier.read(),t!=="")return t=t.replace(Ve.allLineBreaks,`
`),!(e.type===H.DOT||e.type===H.RESERVED&&(e.text==="set"||e.text==="get"))&&Mj.test(t)?t==="in"||t==="of"?this._create_token(H.OPERATOR,t):this._create_token(H.RESERVED,t):this._create_token(H.WORD,t);if(t=this.__patterns.number.read(),t!=="")return this._create_token(H.WORD,t)};je.prototype._read_singles=function(e){var t=null;return e==="("||e==="["?t=this._create_token(H.START_EXPR,e):e===")"||e==="]"?t=this._create_token(H.END_EXPR,e):e==="{"?t=this._create_token(H.START_BLOCK,e):e==="}"?t=this._create_token(H.END_BLOCK,e):e===";"?t=this._create_token(H.SEMICOLON,e):e==="."&&kj.test(this._input.peek(1))?t=this._create_token(H.DOT,e):e===","&&(t=this._create_token(H.COMMA,e)),t&&this._input.next(),t};je.prototype._read_punctuation=function(){var e=this.__patterns.punct.read();if(e!=="")return e==="="?this._create_token(H.EQUALS,e):e==="?."?this._create_token(H.DOT,e):this._create_token(H.OPERATOR,e)};je.prototype._read_non_javascript=function(e){var t="";if(e==="#"){if(this._is_first_token()&&(t=this.__patterns.shebang.read(),t))return this._create_token(H.UNKNOWN,t.trim()+`
`);if(t=this.__patterns.include.read(),t)return this._create_token(H.UNKNOWN,t.trim()+`
`);e=this._input.next();var s="#";if(this._input.hasNext()&&this._input.testChar(Ej)){do e=this._input.next(),s+=e;while(this._input.hasNext()&&e!=="#"&&e!=="=");return e==="#"||(this._input.peek()==="["&&this._input.peek(1)==="]"?(s+="[]",this._input.next(),this._input.next()):this._input.peek()==="{"&&this._input.peek(1)==="}"&&(s+="{}",this._input.next(),this._input.next())),this._create_token(H.WORD,s)}this._input.back()}else if(e==="<"&&this._is_first_token()){if(t=this.__patterns.html_comment_start.read(),t){for(;this._input.hasNext()&&!this._input.testChar(Ve.newline);)t+=this._input.next();return ai=!0,this._create_token(H.COMMENT,t)}}else if(ai&&e==="-"&&(t=this.__patterns.html_comment_end.read(),t))return ai=!1,this._create_token(H.COMMENT,t);return null};je.prototype._read_comment=function(e){var t=null;if(e==="/"){var s="";if(this._input.peek(1)==="*"){s=this.__patterns.block_comment.read();var r=Wb.get_directives(s);r&&r.ignore==="start"&&(s+=Wb.readIgnored(this._input)),s=s.replace(Ve.allLineBreaks,`
`),t=this._create_token(H.BLOCK_COMMENT,s),t.directives=r}else this._input.peek(1)==="/"&&(s=this.__patterns.comment.read(),t=this._create_token(H.COMMENT,s))}return t};je.prototype._read_string=function(e){if(e==="`"||e==="'"||e==='"'){var t=this._input.next();return this.has_char_escapes=!1,e==="`"?t+=this._read_string_recursive("`",!0,"${"):t+=this._read_string_recursive(e),this.has_char_escapes&&this._options.unescape_strings&&(t=Uj(t)),this._input.peek()===e&&(t+=this._input.next()),t=t.replace(Ve.allLineBreaks,`
`),this._create_token(H.STRING,t)}return null};je.prototype._allow_regexp_or_xml=function(e){return e.type===H.RESERVED&&wc(e.text,["return","case","throw","else","do","typeof","yield"])||e.type===H.END_EXPR&&e.text===")"&&e.opened.previous.type===H.RESERVED&&wc(e.opened.previous.text,["if","while","for"])||wc(e.type,[H.COMMENT,H.START_EXPR,H.START_BLOCK,H.START,H.END_BLOCK,H.OPERATOR,H.EQUALS,H.EOF,H.SEMICOLON,H.COMMA])};je.prototype._read_regexp=function(e,t){if(e==="/"&&this._allow_regexp_or_xml(t)){for(var s=this._input.next(),r=!1,n=!1;this._input.hasNext()&&(r||n||this._input.peek()!==e)&&!this._input.testChar(Ve.newline);)s+=this._input.peek(),r?r=!1:(r=this._input.peek()==="\\",this._input.peek()==="["?n=!0:this._input.peek()==="]"&&(n=!1)),this._input.next();return this._input.peek()===e&&(s+=this._input.next(),s+=this._input.read(Ve.identifier)),this._create_token(H.STRING,s)}return null};je.prototype._read_xml=function(e,t){if(this._options.e4x&&e==="<"&&this._allow_regexp_or_xml(t)){var s="",r=this.__patterns.xml.read_match();if(r){for(var n=r[2].replace(/^{\s+/,"{").replace(/\s+}$/,"}"),i=n.indexOf("{")===0,o=0;r;){var a=!!r[1],l=r[2],c=!!r[r.length-1]||l.slice(0,8)==="![CDATA[";if(!c&&(l===n||i&&l.replace(/^{\s+/,"{").replace(/\s+}$/,"}"))&&(a?--o:++o),s+=r[0],o<=0)break;r=this.__patterns.xml.read_match()}return r||(s+=this._input.match(/[\s\S]*/g)[0]),s=s.replace(Ve.allLineBreaks,`
`),this._create_token(H.STRING,s)}}return null};function Uj(e){for(var t="",s=0,r=new bj(e),n=null;r.hasNext();)if(n=r.match(/([\s]|[^\\]|\\\\)+/g),n&&(t+=n[0]),r.peek()==="\\"){if(r.next(),r.peek()==="x")n=r.match(/x([0-9A-Fa-f]{2})/g);else if(r.peek()==="u")n=r.match(/u([0-9A-Fa-f]{4})/g);else{t+="\\",r.hasNext()&&(t+=r.next());continue}if(!n||(s=parseInt(n[1],16),s>126&&s<=255&&n[0].indexOf("x")===0))return e;if(s>=0&&s<32){t+="\\"+n[0];continue}else s===34||s===39||s===92?t+="\\"+String.fromCharCode(s):t+=String.fromCharCode(s)}return t}je.prototype._read_string_recursive=function(e,t,s){var r,n;e==="'"?n=this.__patterns.single_quote:e==='"'?n=this.__patterns.double_quote:e==="`"?n=this.__patterns.template_text:e==="}"&&(n=this.__patterns.template_expression);for(var i=n.read(),o="";this._input.hasNext();){if(o=this._input.next(),o===e||!t&&Ve.newline.test(o)){this._input.back();break}else o==="\\"&&this._input.hasNext()?(r=this._input.peek(),r==="x"||r==="u"?this.has_char_escapes=!0:r==="\r"&&this._input.peek(1)===`
`&&this._input.next(),o+=this._input.next()):s&&(s==="${"&&o==="$"&&this._input.peek()==="{"&&(o+=this._input.next()),s===o&&(e==="`"?o+=this._read_string_recursive("}",t,"`"):o+=this._read_string_recursive("`",t,"${"),this._input.hasNext()&&(o+=this._input.next())));o+=n.read(),i+=o}return i};Ur.exports.Tokenizer=je;Ur.exports.TOKEN=H;Ur.exports.positionable_operators=Tj.slice();Ur.exports.line_starters=Jb.slice()});var Yb=v((g$,Xb)=>{"use strict";var Aj=si().Output,Pj=pc().Token,li=dc(),Oj=mc().Options,qj=Ar().Tokenizer,Rr=Ar().line_starters,Pr=Ar().positionable_operators,S=Ar().TOKEN;function z(e,t){return t.indexOf(e)!==-1}function Rj(e){return e.replace(/^\s+/g,"")}function Ij(e){for(var t={},s=0;s<e.length;s++)t[e[s].replace(/-/g,"_")]=e[s];return t}function Ke(e,t){return e&&e.type===S.RESERVED&&e.text===t}function te(e,t){return e&&e.type===S.RESERVED&&z(e.text,t)}var ci=["case","return","do","if","throw","else","await","break","continue","async"],Hj=["before-newline","after-newline","preserve-newline"],Or=Ij(Hj),Vb=[Or.before_newline,Or.preserve_newline],B={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"};function Kb(e,t){t.multiline_frame||t.mode===B.ForInitializer||t.mode===B.Conditional||e.remove_indent(t.start_line_index)}function Bj(e){e=e.replace(li.allLineBreaks,`
`);for(var t=[],s=e.indexOf(`
`);s!==-1;)t.push(e.substring(0,s)),e=e.substring(s+1),s=e.indexOf(`
`);return e.length&&t.push(e),t}function Gt(e){return e===B.ArrayLiteral}function qr(e){return z(e,[B.Expression,B.ForInitializer,B.Conditional])}function Dj(e,t){for(var s=0;s<e.length;s++){var r=e[s].trim();if(r.charAt(0)!==t)return!1}return!0}function Nj(e,t){for(var s=0,r=e.length,n;s<r;s++)if(n=e[s],n&&n.indexOf(t)!==0)return!1;return!0}function V(e,t){t=t||{},this._source_text=e||"",this._output=null,this._tokens=null,this._last_last_text=null,this._flags=null,this._previous_flags=null,this._flag_store=null,this._options=new Oj(t)}V.prototype.create_flags=function(e,t){var s=0;e&&(s=e.indentation_level,!this._output.just_added_newline()&&e.line_indent_level>s&&(s=e.line_indent_level));var r={mode:t,parent:e,last_token:e?e.last_token:new Pj(S.START_BLOCK,""),last_word:e?e.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,inline_frame:!1,if_block:!1,else_block:!1,do_block:!1,do_while:!1,import_block:!1,in_case_statement:!1,in_case:!1,case_body:!1,indentation_level:s,alignment:0,line_indent_level:e?e.line_indent_level:s,start_line_index:this._output.get_line_number(),ternary_depth:0};return r};V.prototype._reset=function(e){var t=e.match(/^[\t ]*/)[0];this._last_last_text="",this._output=new Aj(this._options,t),this._output.raw=this._options.test_output_raw,this._flag_store=[],this.set_mode(B.BlockStatement);var s=new qj(e,this._options);return this._tokens=s.tokenize(),e};V.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e,t=this._reset(this._source_text),s=this._options.eol;this._options.eol==="auto"&&(s=`
`,t&&li.lineBreak.test(t||"")&&(s=t.match(li.lineBreak)[0]));for(var r=this._tokens.next();r;)this.handle_token(r),this._last_last_text=this._flags.last_token.text,this._flags.last_token=r,r=this._tokens.next();return e=this._output.get_code(s),e};V.prototype.handle_token=function(e,t){e.type===S.START_EXPR?this.handle_start_expr(e):e.type===S.END_EXPR?this.handle_end_expr(e):e.type===S.START_BLOCK?this.handle_start_block(e):e.type===S.END_BLOCK?this.handle_end_block(e):e.type===S.WORD?this.handle_word(e):e.type===S.RESERVED?this.handle_word(e):e.type===S.SEMICOLON?this.handle_semicolon(e):e.type===S.STRING?this.handle_string(e):e.type===S.EQUALS?this.handle_equals(e):e.type===S.OPERATOR?this.handle_operator(e):e.type===S.COMMA?this.handle_comma(e):e.type===S.BLOCK_COMMENT?this.handle_block_comment(e,t):e.type===S.COMMENT?this.handle_comment(e,t):e.type===S.DOT?this.handle_dot(e):e.type===S.EOF?this.handle_eof(e):e.type===S.UNKNOWN?this.handle_unknown(e,t):this.handle_unknown(e,t)};V.prototype.handle_whitespace_and_comments=function(e,t){var s=e.newlines,r=this._options.keep_array_indentation&&Gt(this._flags.mode);if(e.comments_before)for(var n=e.comments_before.next();n;)this.handle_whitespace_and_comments(n,t),this.handle_token(n,t),n=e.comments_before.next();if(r)for(var i=0;i<s;i+=1)this.print_newline(i>0,t);else if(this._options.max_preserve_newlines&&s>this._options.max_preserve_newlines&&(s=this._options.max_preserve_newlines),this._options.preserve_newlines&&s>1){this.print_newline(!1,t);for(var o=1;o<s;o+=1)this.print_newline(!0,t)}};var xc=["async","break","continue","return","throw","yield"];V.prototype.allow_wrap_or_preserved_newline=function(e,t){if(t=t===void 0?!1:t,!this._output.just_added_newline()){var s=this._options.preserve_newlines&&e.newlines||t,r=z(this._flags.last_token.text,Pr)||z(e.text,Pr);if(r){var n=z(this._flags.last_token.text,Pr)&&z(this._options.operator_position,Vb)||z(e.text,Pr);s=s&&n}if(s)this.print_newline(!1,!0);else if(this._options.wrap_line_length){if(te(this._flags.last_token,xc))return;this._output.set_wrap_point()}}};V.prototype.print_newline=function(e,t){if(!t&&this._flags.last_token.text!==";"&&this._flags.last_token.text!==","&&this._flags.last_token.text!=="="&&(this._flags.last_token.type!==S.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++"))for(var s=this._tokens.peek();this._flags.mode===B.Statement&&!(this._flags.if_block&&Ke(s,"else"))&&!this._flags.do_block;)this.restore_mode();this._output.add_new_line(e)&&(this._flags.multiline_frame=!0)};V.prototype.print_token_line_indentation=function(e){this._output.just_added_newline()&&(this._options.keep_array_indentation&&e.newlines&&(e.text==="["||Gt(this._flags.mode))?(this._output.current_line.set_indent(-1),this._output.current_line.push(e.whitespace_before),this._output.space_before_token=!1):this._output.set_indent(this._flags.indentation_level,this._flags.alignment)&&(this._flags.line_indent_level=this._flags.indentation_level))};V.prototype.print_token=function(e){if(this._output.raw){this._output.add_raw_token(e);return}if(this._options.comma_first&&e.previous&&e.previous.type===S.COMMA&&this._output.just_added_newline()&&this._output.previous_line.last()===","){var t=this._output.previous_line.pop();this._output.previous_line.is_empty()&&(this._output.previous_line.push(t),this._output.trim(!0),this._output.current_line.pop(),this._output.trim()),this.print_token_line_indentation(e),this._output.add_token(","),this._output.space_before_token=!0}this.print_token_line_indentation(e),this._output.non_breaking_space=!0,this._output.add_token(e.text),this._output.previous_token_wrapped&&(this._flags.multiline_frame=!0)};V.prototype.indent=function(){this._flags.indentation_level+=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment)};V.prototype.deindent=function(){this._flags.indentation_level>0&&(!this._flags.parent||this._flags.indentation_level>this._flags.parent.indentation_level)&&(this._flags.indentation_level-=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment))};V.prototype.set_mode=function(e){this._flags?(this._flag_store.push(this._flags),this._previous_flags=this._flags):this._previous_flags=this.create_flags(null,e),this._flags=this.create_flags(this._previous_flags,e),this._output.set_indent(this._flags.indentation_level,this._flags.alignment)};V.prototype.restore_mode=function(){this._flag_store.length>0&&(this._previous_flags=this._flags,this._flags=this._flag_store.pop(),this._previous_flags.mode===B.Statement&&Kb(this._output,this._previous_flags),this._output.set_indent(this._flags.indentation_level,this._flags.alignment))};V.prototype.start_of_object_property=function(){return this._flags.parent.mode===B.ObjectLiteral&&this._flags.mode===B.Statement&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||te(this._flags.last_token,["get","set"]))};V.prototype.start_of_statement=function(e){var t=!1;return t=t||te(this._flags.last_token,["var","let","const"])&&e.type===S.WORD,t=t||Ke(this._flags.last_token,"do"),t=t||!(this._flags.parent.mode===B.ObjectLiteral&&this._flags.mode===B.Statement)&&te(this._flags.last_token,xc)&&!e.newlines,t=t||Ke(this._flags.last_token,"else")&&!(Ke(e,"if")&&!e.comments_before),t=t||this._flags.last_token.type===S.END_EXPR&&(this._previous_flags.mode===B.ForInitializer||this._previous_flags.mode===B.Conditional),t=t||this._flags.last_token.type===S.WORD&&this._flags.mode===B.BlockStatement&&!this._flags.in_case&&!(e.text==="--"||e.text==="++")&&this._last_last_text!=="function"&&e.type!==S.WORD&&e.type!==S.RESERVED,t=t||this._flags.mode===B.ObjectLiteral&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||te(this._flags.last_token,["get","set"])),t?(this.set_mode(B.Statement),this.indent(),this.handle_whitespace_and_comments(e,!0),this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e,te(e,["do","for","if","while"])),!0):!1};V.prototype.handle_start_expr=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e);var t=B.Expression;if(e.text==="["){if(this._flags.last_token.type===S.WORD||this._flags.last_token.text===")"){te(this._flags.last_token,Rr)&&(this._output.space_before_token=!0),this.print_token(e),this.set_mode(t),this.indent(),this._options.space_in_paren&&(this._output.space_before_token=!0);return}t=B.ArrayLiteral,Gt(this._flags.mode)&&(this._flags.last_token.text==="["||this._flags.last_token.text===","&&(this._last_last_text==="]"||this._last_last_text==="}"))&&(this._options.keep_array_indentation||this.print_newline()),z(this._flags.last_token.type,[S.START_EXPR,S.END_EXPR,S.WORD,S.OPERATOR,S.DOT])||(this._output.space_before_token=!0)}else{if(this._flags.last_token.type===S.RESERVED)this._flags.last_token.text==="for"?(this._output.space_before_token=this._options.space_before_conditional,t=B.ForInitializer):z(this._flags.last_token.text,["if","while","switch"])?(this._output.space_before_token=this._options.space_before_conditional,t=B.Conditional):z(this._flags.last_word,["await","async"])?this._output.space_before_token=!0:this._flags.last_token.text==="import"&&e.whitespace_before===""?this._output.space_before_token=!1:(z(this._flags.last_token.text,Rr)||this._flags.last_token.text==="catch")&&(this._output.space_before_token=!0);else if(this._flags.last_token.type===S.EQUALS||this._flags.last_token.type===S.OPERATOR)this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e);else if(this._flags.last_token.type===S.WORD){this._output.space_before_token=!1;var s=this._tokens.peek(-3);if(this._options.space_after_named_function&&s){var r=this._tokens.peek(-4);te(s,["async","function"])||s.text==="*"&&te(r,["async","function"])?this._output.space_before_token=!0:this._flags.mode===B.ObjectLiteral&&(s.text==="{"||s.text===","||s.text==="*"&&(r.text==="{"||r.text===","))&&(this._output.space_before_token=!0)}}else this.allow_wrap_or_preserved_newline(e);(this._flags.last_token.type===S.RESERVED&&(this._flags.last_word==="function"||this._flags.last_word==="typeof")||this._flags.last_token.text==="*"&&(z(this._last_last_text,["function","yield"])||this._flags.mode===B.ObjectLiteral&&z(this._last_last_text,["{",","])))&&(this._output.space_before_token=this._options.space_after_anon_function)}this._flags.last_token.text===";"||this._flags.last_token.type===S.START_BLOCK?this.print_newline():(this._flags.last_token.type===S.END_EXPR||this._flags.last_token.type===S.START_EXPR||this._flags.last_token.type===S.END_BLOCK||this._flags.last_token.text==="."||this._flags.last_token.type===S.COMMA)&&this.allow_wrap_or_preserved_newline(e,e.newlines),this.print_token(e),this.set_mode(t),this._options.space_in_paren&&(this._output.space_before_token=!0),this.indent()};V.prototype.handle_end_expr=function(e){for(;this._flags.mode===B.Statement;)this.restore_mode();this.handle_whitespace_and_comments(e),this._flags.multiline_frame&&this.allow_wrap_or_preserved_newline(e,e.text==="]"&&Gt(this._flags.mode)&&!this._options.keep_array_indentation),this._options.space_in_paren&&(this._flags.last_token.type===S.START_EXPR&&!this._options.space_in_empty_paren?(this._output.trim(),this._output.space_before_token=!1):this._output.space_before_token=!0),this.deindent(),this.print_token(e),this.restore_mode(),Kb(this._output,this._previous_flags),this._flags.do_while&&this._previous_flags.mode===B.Conditional&&(this._previous_flags.mode=B.Expression,this._flags.do_block=!1,this._flags.do_while=!1)};V.prototype.handle_start_block=function(e){this.handle_whitespace_and_comments(e);var t=this._tokens.peek(),s=this._tokens.peek(1);this._flags.last_word==="switch"&&this._flags.last_token.type===S.END_EXPR?(this.set_mode(B.BlockStatement),this._flags.in_case_statement=!0):this._flags.case_body?this.set_mode(B.BlockStatement):s&&(z(s.text,[":",","])&&z(t.type,[S.STRING,S.WORD,S.RESERVED])||z(t.text,["get","set","..."])&&z(s.type,[S.WORD,S.RESERVED]))?z(this._last_last_text,["class","interface"])?this.set_mode(B.BlockStatement):this.set_mode(B.ObjectLiteral):this._flags.last_token.type===S.OPERATOR&&this._flags.last_token.text==="=>"?this.set_mode(B.BlockStatement):z(this._flags.last_token.type,[S.EQUALS,S.START_EXPR,S.COMMA,S.OPERATOR])||te(this._flags.last_token,["return","throw","import","default"])?this.set_mode(B.ObjectLiteral):this.set_mode(B.BlockStatement);var r=!t.comments_before&&t.text==="}",n=r&&this._flags.last_word==="function"&&this._flags.last_token.type===S.END_EXPR;if(this._options.brace_preserve_inline){var i=0,o=null;this._flags.inline_frame=!0;do if(i+=1,o=this._tokens.peek(i-1),o.newlines){this._flags.inline_frame=!1;break}while(o.type!==S.EOF&&!(o.type===S.END_BLOCK&&o.opened===e))}(this._options.brace_style==="expand"||this._options.brace_style==="none"&&e.newlines)&&!this._flags.inline_frame?this._flags.last_token.type!==S.OPERATOR&&(n||this._flags.last_token.type===S.EQUALS||te(this._flags.last_token,ci)&&this._flags.last_token.text!=="else")?this._output.space_before_token=!0:this.print_newline(!1,!0):(Gt(this._previous_flags.mode)&&(this._flags.last_token.type===S.START_EXPR||this._flags.last_token.type===S.COMMA)&&((this._flags.last_token.type===S.COMMA||this._options.space_in_paren)&&(this._output.space_before_token=!0),(this._flags.last_token.type===S.COMMA||this._flags.last_token.type===S.START_EXPR&&this._flags.inline_frame)&&(this.allow_wrap_or_preserved_newline(e),this._previous_flags.multiline_frame=this._previous_flags.multiline_frame||this._flags.multiline_frame,this._flags.multiline_frame=!1)),this._flags.last_token.type!==S.OPERATOR&&this._flags.last_token.type!==S.START_EXPR&&(this._flags.last_token.type===S.START_BLOCK&&!this._flags.inline_frame?this.print_newline():this._output.space_before_token=!0)),this.print_token(e),this.indent(),!r&&!(this._options.brace_preserve_inline&&this._flags.inline_frame)&&this.print_newline()};V.prototype.handle_end_block=function(e){for(this.handle_whitespace_and_comments(e);this._flags.mode===B.Statement;)this.restore_mode();var t=this._flags.last_token.type===S.START_BLOCK;this._flags.inline_frame&&!t?this._output.space_before_token=!0:this._options.brace_style==="expand"?t||this.print_newline():t||(Gt(this._flags.mode)&&this._options.keep_array_indentation?(this._options.keep_array_indentation=!1,this.print_newline(),this._options.keep_array_indentation=!0):this.print_newline()),this.restore_mode(),this.print_token(e)};V.prototype.handle_word=function(e){if(e.type===S.RESERVED){if(z(e.text,["set","get"])&&this._flags.mode!==B.ObjectLiteral)e.type=S.WORD;else if(e.text==="import"&&this._tokens.peek().text==="(")e.type=S.WORD;else if(z(e.text,["as","from"])&&!this._flags.import_block)e.type=S.WORD;else if(this._flags.mode===B.ObjectLiteral){var t=this._tokens.peek();t.text===":"&&(e.type=S.WORD)}}if(this.start_of_statement(e)?te(this._flags.last_token,["var","let","const"])&&e.type===S.WORD&&(this._flags.declaration_statement=!0):e.newlines&&!qr(this._flags.mode)&&(this._flags.last_token.type!==S.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++")&&this._flags.last_token.type!==S.EQUALS&&(this._options.preserve_newlines||!te(this._flags.last_token,["var","let","const","set","get"]))?(this.handle_whitespace_and_comments(e),this.print_newline()):this.handle_whitespace_and_comments(e),this._flags.do_block&&!this._flags.do_while)if(Ke(e,"while")){this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0,this._flags.do_while=!0;return}else this.print_newline(),this._flags.do_block=!1;if(this._flags.if_block)if(!this._flags.else_block&&Ke(e,"else"))this._flags.else_block=!0;else{for(;this._flags.mode===B.Statement;)this.restore_mode();this._flags.if_block=!1,this._flags.else_block=!1}if(this._flags.in_case_statement&&te(e,["case","default"])){this.print_newline(),this._flags.last_token.type!==S.END_BLOCK&&(this._flags.case_body||this._options.jslint_happy)&&this.deindent(),this._flags.case_body=!1,this.print_token(e),this._flags.in_case=!0;return}if((this._flags.last_token.type===S.COMMA||this._flags.last_token.type===S.START_EXPR||this._flags.last_token.type===S.EQUALS||this._flags.last_token.type===S.OPERATOR)&&(this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e)),Ke(e,"function")){(z(this._flags.last_token.text,["}",";"])||this._output.just_added_newline()&&!(z(this._flags.last_token.text,["(","[","{",":","=",","])||this._flags.last_token.type===S.OPERATOR))&&!this._output.just_added_blankline()&&!e.comments_before&&(this.print_newline(),this.print_newline(!0)),this._flags.last_token.type===S.RESERVED||this._flags.last_token.type===S.WORD?te(this._flags.last_token,["get","set","new","export"])||te(this._flags.last_token,xc)?this._output.space_before_token=!0:Ke(this._flags.last_token,"default")&&this._last_last_text==="export"?this._output.space_before_token=!0:this._flags.last_token.text==="declare"?this._output.space_before_token=!0:this.print_newline():this._flags.last_token.type===S.OPERATOR||this._flags.last_token.text==="="?this._output.space_before_token=!0:!this._flags.multiline_frame&&(qr(this._flags.mode)||Gt(this._flags.mode))||this.print_newline(),this.print_token(e),this._flags.last_word=e.text;return}var s="NONE";if(this._flags.last_token.type===S.END_BLOCK?this._previous_flags.inline_frame?s="SPACE":te(e,["else","catch","finally","from"])?this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&e.newlines?s="NEWLINE":(s="SPACE",this._output.space_before_token=!0):s="NEWLINE":this._flags.last_token.type===S.SEMICOLON&&this._flags.mode===B.BlockStatement?s="NEWLINE":this._flags.last_token.type===S.SEMICOLON&&qr(this._flags.mode)?s="SPACE":this._flags.last_token.type===S.STRING?s="NEWLINE":this._flags.last_token.type===S.RESERVED||this._flags.last_token.type===S.WORD||this._flags.last_token.text==="*"&&(z(this._last_last_text,["function","yield"])||this._flags.mode===B.ObjectLiteral&&z(this._last_last_text,["{",","]))?s="SPACE":this._flags.last_token.type===S.START_BLOCK?this._flags.inline_frame?s="SPACE":s="NEWLINE":this._flags.last_token.type===S.END_EXPR&&(this._output.space_before_token=!0,s="NEWLINE"),te(e,Rr)&&this._flags.last_token.text!==")"&&(this._flags.inline_frame||this._flags.last_token.text==="else"||this._flags.last_token.text==="export"?s="SPACE":s="NEWLINE"),te(e,["else","catch","finally"]))if((!(this._flags.last_token.type===S.END_BLOCK&&this._previous_flags.mode===B.BlockStatement)||this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&e.newlines)&&!this._flags.inline_frame)this.print_newline();else{this._output.trim(!0);var r=this._output.current_line;r.last()!=="}"&&this.print_newline(),this._output.space_before_token=!0}else s==="NEWLINE"?te(this._flags.last_token,ci)?this._output.space_before_token=!0:this._flags.last_token.text==="declare"&&te(e,["var","let","const"])?this._output.space_before_token=!0:this._flags.last_token.type!==S.END_EXPR?(this._flags.last_token.type!==S.START_EXPR||!te(e,["var","let","const"]))&&this._flags.last_token.text!==":"&&(Ke(e,"if")&&Ke(e.previous,"else")?this._output.space_before_token=!0:this.print_newline()):te(e,Rr)&&this._flags.last_token.text!==")"&&this.print_newline():this._flags.multiline_frame&&Gt(this._flags.mode)&&this._flags.last_token.text===","&&this._last_last_text==="}"?this.print_newline():s==="SPACE"&&(this._output.space_before_token=!0);e.previous&&(e.previous.type===S.WORD||e.previous.type===S.RESERVED)&&(this._output.space_before_token=!0),this.print_token(e),this._flags.last_word=e.text,e.type===S.RESERVED&&(e.text==="do"?this._flags.do_block=!0:e.text==="if"?this._flags.if_block=!0:e.text==="import"?this._flags.import_block=!0:this._flags.import_block&&Ke(e,"from")&&(this._flags.import_block=!1))};V.prototype.handle_semicolon=function(e){this.start_of_statement(e)?this._output.space_before_token=!1:this.handle_whitespace_and_comments(e);for(var t=this._tokens.peek();this._flags.mode===B.Statement&&!(this._flags.if_block&&Ke(t,"else"))&&!this._flags.do_block;)this.restore_mode();this._flags.import_block&&(this._flags.import_block=!1),this.print_token(e)};V.prototype.handle_string=function(e){e.text.startsWith("`")&&e.newlines===0&&e.whitespace_before===""&&(e.previous.text===")"||this._flags.last_token.type===S.WORD)||(this.start_of_statement(e)?this._output.space_before_token=!0:(this.handle_whitespace_and_comments(e),this._flags.last_token.type===S.RESERVED||this._flags.last_token.type===S.WORD||this._flags.inline_frame?this._output.space_before_token=!0:this._flags.last_token.type===S.COMMA||this._flags.last_token.type===S.START_EXPR||this._flags.last_token.type===S.EQUALS||this._flags.last_token.type===S.OPERATOR?this.start_of_object_property()||this.allow_wrap_or_preserved_newline(e):e.text.startsWith("`")&&this._flags.last_token.type===S.END_EXPR&&(e.previous.text==="]"||e.previous.text===")")&&e.newlines===0?this._output.space_before_token=!0:this.print_newline())),this.print_token(e)};V.prototype.handle_equals=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e),this._flags.declaration_statement&&(this._flags.declaration_assignment=!0),this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0};V.prototype.handle_comma=function(e){this.handle_whitespace_and_comments(e,!0),this.print_token(e),this._output.space_before_token=!0,this._flags.declaration_statement?(qr(this._flags.parent.mode)&&(this._flags.declaration_assignment=!1),this._flags.declaration_assignment?(this._flags.declaration_assignment=!1,this.print_newline(!1,!0)):this._options.comma_first&&this.allow_wrap_or_preserved_newline(e)):this._flags.mode===B.ObjectLiteral||this._flags.mode===B.Statement&&this._flags.parent.mode===B.ObjectLiteral?(this._flags.mode===B.Statement&&this.restore_mode(),this._flags.inline_frame||this.print_newline()):this._options.comma_first&&this.allow_wrap_or_preserved_newline(e)};V.prototype.handle_operator=function(e){var t=e.text==="*"&&(te(this._flags.last_token,["function","yield"])||z(this._flags.last_token.type,[S.START_BLOCK,S.COMMA,S.END_BLOCK,S.SEMICOLON])),s=z(e.text,["-","+"])&&(z(this._flags.last_token.type,[S.START_BLOCK,S.START_EXPR,S.EQUALS,S.OPERATOR])||z(this._flags.last_token.text,Rr)||this._flags.last_token.text===",");if(!this.start_of_statement(e)){var r=!t;this.handle_whitespace_and_comments(e,r)}if(te(this._flags.last_token,ci)){this._output.space_before_token=!0,this.print_token(e);return}if(e.text==="*"&&this._flags.last_token.type===S.DOT){this.print_token(e);return}if(e.text==="::"){this.print_token(e);return}if(this._flags.last_token.type===S.OPERATOR&&z(this._options.operator_position,Vb)&&this.allow_wrap_or_preserved_newline(e),e.text===":"&&this._flags.in_case){this.print_token(e),this._flags.in_case=!1,this._flags.case_body=!0,this._tokens.peek().type!==S.START_BLOCK?(this.indent(),this.print_newline()):this._output.space_before_token=!0;return}var n=!0,i=!0,o=!1;if(e.text===":"?this._flags.ternary_depth===0?n=!1:(this._flags.ternary_depth-=1,o=!0):e.text==="?"&&(this._flags.ternary_depth+=1),!s&&!t&&this._options.preserve_newlines&&z(e.text,Pr)){var a=e.text===":",l=a&&o,c=a&&!o;switch(this._options.operator_position){case Or.before_newline:this._output.space_before_token=!c,this.print_token(e),(!a||l)&&this.allow_wrap_or_preserved_newline(e),this._output.space_before_token=!0;return;case Or.after_newline:this._output.space_before_token=!0,!a||l?this._tokens.peek().newlines?this.print_newline(!1,!0):this.allow_wrap_or_preserved_newline(e):this._output.space_before_token=!1,this.print_token(e),this._output.space_before_token=!0;return;case Or.preserve_newline:c||this.allow_wrap_or_preserved_newline(e),n=!(this._output.just_added_newline()||c),this._output.space_before_token=n,this.print_token(e),this._output.space_before_token=!0;return}}if(t){this.allow_wrap_or_preserved_newline(e),n=!1;var p=this._tokens.peek();i=p&&z(p.type,[S.WORD,S.RESERVED])}else e.text==="..."?(this.allow_wrap_or_preserved_newline(e),n=this._flags.last_token.type===S.START_BLOCK,i=!1):(z(e.text,["--","++","!","~"])||s)&&((this._flags.last_token.type===S.COMMA||this._flags.last_token.type===S.START_EXPR)&&this.allow_wrap_or_preserved_newline(e),n=!1,i=!1,e.newlines&&(e.text==="--"||e.text==="++")&&this.print_newline(!1,!0),this._flags.last_token.text===";"&&qr(this._flags.mode)&&(n=!0),this._flags.last_token.type===S.RESERVED?n=!0:this._flags.last_token.type===S.END_EXPR?n=!(this._flags.last_token.text==="]"&&(e.text==="--"||e.text==="++")):this._flags.last_token.type===S.OPERATOR&&(n=z(e.text,["--","-","++","+"])&&z(this._flags.last_token.text,["--","-","++","+"]),z(e.text,["+","-"])&&z(this._flags.last_token.text,["--","++"])&&(i=!0)),(this._flags.mode===B.BlockStatement&&!this._flags.inline_frame||this._flags.mode===B.Statement)&&(this._flags.last_token.text==="{"||this._flags.last_token.text===";")&&this.print_newline());this._output.space_before_token=this._output.space_before_token||n,this.print_token(e),this._output.space_before_token=i};V.prototype.handle_block_comment=function(e,t){if(this._output.raw){this._output.add_raw_token(e),e.directives&&e.directives.preserve==="end"&&(this._output.raw=this._options.test_output_raw);return}if(e.directives){this.print_newline(!1,t),this.print_token(e),e.directives.preserve==="start"&&(this._output.raw=!0),this.print_newline(!1,!0);return}if(!li.newline.test(e.text)&&!e.newlines){this._output.space_before_token=!0,this.print_token(e),this._output.space_before_token=!0;return}else this.print_block_commment(e,t)};V.prototype.print_block_commment=function(e,t){var s=Bj(e.text),r,n=!1,i=!1,o=e.whitespace_before,a=o.length;if(this.print_newline(!1,t),this.print_token_line_indentation(e),this._output.add_token(s[0]),this.print_newline(!1,t),s.length>1){for(s=s.slice(1),n=Dj(s,"*"),i=Nj(s,o),n&&(this._flags.alignment=1),r=0;r<s.length;r++)n?(this.print_token_line_indentation(e),this._output.add_token(Rj(s[r]))):i&&s[r]?(this.print_token_line_indentation(e),this._output.add_token(s[r].substring(a))):(this._output.current_line.set_indent(-1),this._output.add_token(s[r])),this.print_newline(!1,t);this._flags.alignment=0}};V.prototype.handle_comment=function(e,t){e.newlines?this.print_newline(!1,t):this._output.trim(!0),this._output.space_before_token=!0,this.print_token(e),this.print_newline(!1,t)};V.prototype.handle_dot=function(e){this.start_of_statement(e)||this.handle_whitespace_and_comments(e,!0),te(this._flags.last_token,ci)?this._output.space_before_token=!1:this.allow_wrap_or_preserved_newline(e,this._flags.last_token.text===")"&&this._options.break_chained_methods),this._options.unindent_chained_methods&&this._output.just_added_newline()&&this.deindent(),this.print_token(e)};V.prototype.handle_unknown=function(e,t){this.print_token(e),e.text[e.text.length-1]===`
`&&this.print_newline(!1,t)};V.prototype.handle_eof=function(e){for(;this._flags.mode===B.Statement;)this.restore_mode();this.handle_whitespace_and_comments(e)};Xb.exports.Beautifier=V});var Qb=v((_$,Sc)=>{"use strict";var $j=Yb().Beautifier,Fj=mc().Options;function zj(e,t){var s=new $j(e,t);return s.beautify()}Sc.exports=zj;Sc.exports.defaultOptions=function(){return new Fj}});var Lc=v((y$,tw)=>{"use strict";var Zb=ni().Options;function ew(e){Zb.call(this,e,"css"),this.selector_separator_newline=this._get_boolean("selector_separator_newline",!0),this.newline_between_rules=this._get_boolean("newline_between_rules",!0);var t=this._get_boolean("space_around_selector_separator");this.space_around_combinator=this._get_boolean("space_around_combinator")||t;var s=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_style="collapse";for(var r=0;r<s.length;r++)s[r]!=="expand"?this.brace_style="collapse":this.brace_style=s[r]}ew.prototype=new Zb;tw.exports.Options=ew});var iw=v((v$,nw)=>{"use strict";var Wj=Lc().Options,Gj=si().Output,Jj=ii().InputScanner,Vj=oi().Directives,sw=new Vj(/\/\*/,/\*\//),rw=/\r\n|[\r\n]/,Kj=/\r\n|[\r\n]/g,pi=/\s/,Xj=/(?:\s|\n)+/g,Yj=/\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,Qj=/\/\/(?:[^\n\r\u2028\u2029]*)/g;function Tt(e,t){this._source_text=e||"",this._options=new Wj(t),this._ch=null,this._input=null,this.NESTED_AT_RULE={"@page":!0,"@font-face":!0,"@keyframes":!0,"@media":!0,"@supports":!0,"@document":!0},this.CONDITIONAL_GROUP_RULE={"@media":!0,"@supports":!0,"@document":!0}}Tt.prototype.eatString=function(e){var t="";for(this._ch=this._input.next();this._ch;){if(t+=this._ch,this._ch==="\\")t+=this._input.next();else if(e.indexOf(this._ch)!==-1||this._ch===`
`)break;this._ch=this._input.next()}return t};Tt.prototype.eatWhitespace=function(e){for(var t=pi.test(this._input.peek()),s=0;pi.test(this._input.peek());)this._ch=this._input.next(),e&&this._ch===`
`&&(s===0||s<this._options.max_preserve_newlines)&&(s++,this._output.add_new_line(!0));return t};Tt.prototype.foundNestedPseudoClass=function(){for(var e=0,t=1,s=this._input.peek(t);s;){if(s==="{")return!0;if(s==="(")e+=1;else if(s===")"){if(e===0)return!1;e-=1}else if(s===";"||s==="}")return!1;t++,s=this._input.peek(t)}return!1};Tt.prototype.print_string=function(e){this._output.set_indent(this._indentLevel),this._output.non_breaking_space=!0,this._output.add_token(e)};Tt.prototype.preserveSingleSpace=function(e){e&&(this._output.space_before_token=!0)};Tt.prototype.indent=function(){this._indentLevel++};Tt.prototype.outdent=function(){this._indentLevel>0&&this._indentLevel--};Tt.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e=this._source_text,t=this._options.eol;t==="auto"&&(t=`
`,e&&rw.test(e||"")&&(t=e.match(rw)[0])),e=e.replace(Kj,`
`);var s=e.match(/^[\t ]*/)[0];this._output=new Gj(this._options,s),this._input=new Jj(e),this._indentLevel=0,this._nestedLevel=0,this._ch=null;for(var r=0,n=!1,i=!1,o=!1,a=!1,l=!1,c=this._ch,p,m,g;p=this._input.read(Xj),m=p!=="",g=c,this._ch=this._input.next(),this._ch==="\\"&&this._input.hasNext()&&(this._ch+=this._input.next()),c=this._ch,this._ch;)if(this._ch==="/"&&this._input.peek()==="*"){this._output.add_new_line(),this._input.back();var y=this._input.read(Yj),h=sw.get_directives(y);h&&h.ignore==="start"&&(y+=sw.readIgnored(this._input)),this.print_string(y),this.eatWhitespace(!0),this._output.add_new_line()}else if(this._ch==="/"&&this._input.peek()==="/")this._output.space_before_token=!0,this._input.back(),this.print_string(this._input.read(Qj)),this.eatWhitespace(!0);else if(this._ch==="@")if(this.preserveSingleSpace(m),this._input.peek()==="{")this.print_string(this._ch+this.eatString("}"));else{this.print_string(this._ch);var u=this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);u.match(/[ :]$/)&&(u=this.eatString(": ").replace(/\s$/,""),this.print_string(u),this._output.space_before_token=!0),u=u.replace(/\s$/,""),u==="extend"?a=!0:u==="import"&&(l=!0),u in this.NESTED_AT_RULE?(this._nestedLevel+=1,u in this.CONDITIONAL_GROUP_RULE&&(o=!0)):!n&&r===0&&u.indexOf(":")!==-1&&(i=!0,this.indent())}else this._ch==="#"&&this._input.peek()==="{"?(this.preserveSingleSpace(m),this.print_string(this._ch+this.eatString("}"))):this._ch==="{"?(i&&(i=!1,this.outdent()),o?(o=!1,n=this._indentLevel>=this._nestedLevel):n=this._indentLevel>=this._nestedLevel-1,this._options.newline_between_rules&&n&&this._output.previous_line&&this._output.previous_line.item(-1)!=="{"&&this._output.ensure_empty_line_above("/",","),this._output.space_before_token=!0,this._options.brace_style==="expand"?(this._output.add_new_line(),this.print_string(this._ch),this.indent(),this._output.set_indent(this._indentLevel)):(this.indent(),this.print_string(this._ch)),this.eatWhitespace(!0),this._output.add_new_line()):this._ch==="}"?(this.outdent(),this._output.add_new_line(),g==="{"&&this._output.trim(!0),l=!1,a=!1,i&&(this.outdent(),i=!1),this.print_string(this._ch),n=!1,this._nestedLevel&&this._nestedLevel--,this.eatWhitespace(!0),this._output.add_new_line(),this._options.newline_between_rules&&!this._output.just_added_blankline()&&this._input.peek()!=="}"&&this._output.add_new_line(!0)):this._ch===":"?(n||o)&&!(this._input.lookBack("&")||this.foundNestedPseudoClass())&&!this._input.lookBack("(")&&!a&&r===0?(this.print_string(":"),i||(i=!0,this._output.space_before_token=!0,this.eatWhitespace(!0),this.indent())):(this._input.lookBack(" ")&&(this._output.space_before_token=!0),this._input.peek()===":"?(this._ch=this._input.next(),this.print_string("::")):this.print_string(":")):this._ch==='"'||this._ch==="'"?(this.preserveSingleSpace(m),this.print_string(this._ch+this.eatString(this._ch)),this.eatWhitespace(!0)):this._ch===";"?r===0?(i&&(this.outdent(),i=!1),a=!1,l=!1,this.print_string(this._ch),this.eatWhitespace(!0),this._input.peek()!=="/"&&this._output.add_new_line()):(this.print_string(this._ch),this.eatWhitespace(!0),this._output.space_before_token=!0):this._ch==="("?this._input.lookBack("url")?(this.print_string(this._ch),this.eatWhitespace(),r++,this.indent(),this._ch=this._input.next(),this._ch===")"||this._ch==='"'||this._ch==="'"?this._input.back():this._ch&&(this.print_string(this._ch+this.eatString(")")),r&&(r--,this.outdent()))):(this.preserveSingleSpace(m),this.print_string(this._ch),this.eatWhitespace(),r++,this.indent()):this._ch===")"?(r&&(r--,this.outdent()),this.print_string(this._ch)):this._ch===","?(this.print_string(this._ch),this.eatWhitespace(!0),this._options.selector_separator_newline&&!i&&r===0&&!l&&!a?this._output.add_new_line():this._output.space_before_token=!0):(this._ch===">"||this._ch==="+"||this._ch==="~")&&!i&&r===0?this._options.space_around_combinator?(this._output.space_before_token=!0,this.print_string(this._ch),this._output.space_before_token=!0):(this.print_string(this._ch),this.eatWhitespace(),this._ch&&pi.test(this._ch)&&(this._ch="")):this._ch==="]"?this.print_string(this._ch):this._ch==="["?(this.preserveSingleSpace(m),this.print_string(this._ch)):this._ch==="="?(this.eatWhitespace(),this.print_string("="),pi.test(this._ch)&&(this._ch="")):this._ch==="!"&&!this._input.lookBack("\\")?(this.print_string(" "),this.print_string(this._ch)):(this.preserveSingleSpace(m),this.print_string(this._ch));var d=this._output.get_code(t);return d};nw.exports.Beautifier=Tt});var ow=v((b$,Ec)=>{"use strict";var Zj=iw().Beautifier,eM=Lc().Options;function tM(e,t){var s=new Zj(e,t);return s.beautify()}Ec.exports=tM;Ec.exports.defaultOptions=function(){return new eM}});var kc=v((w$,cw)=>{"use strict";var aw=ni().Options;function lw(e){aw.call(this,e,"html"),this.templating.length===1&&this.templating[0]==="auto"&&(this.templating=["django","erb","handlebars","php"]),this.indent_inner_html=this._get_boolean("indent_inner_html"),this.indent_body_inner_html=this._get_boolean("indent_body_inner_html",!0),this.indent_head_inner_html=this._get_boolean("indent_head_inner_html",!0),this.indent_handlebars=this._get_boolean("indent_handlebars",!0),this.wrap_attributes=this._get_selection("wrap_attributes",["auto","force","force-aligned","force-expand-multiline","aligned-multiple","preserve","preserve-aligned"]),this.wrap_attributes_indent_size=this._get_number("wrap_attributes_indent_size",this.indent_size),this.extra_liners=this._get_array("extra_liners",["head","body","/html"]),this.inline=this._get_array("inline",["a","abbr","area","audio","b","bdi","bdo","br","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","img","input","ins","kbd","keygen","label","map","mark","math","meter","noscript","object","output","progress","q","ruby","s","samp","select","small","span","strong","sub","sup","svg","template","textarea","time","u","var","video","wbr","text","acronym","big","strike","tt"]),this.void_elements=this._get_array("void_elements",["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr","!doctype","?xml","basefont","isindex"]),this.unformatted=this._get_array("unformatted",[]),this.content_unformatted=this._get_array("content_unformatted",["pre","textarea"]),this.unformatted_content_delimiter=this._get_characters("unformatted_content_delimiter"),this.indent_scripts=this._get_selection("indent_scripts",["normal","keep","separate"])}lw.prototype=new aw;cw.exports.Options=lw});var jc=v((x$,Cc)=>{"use strict";var uw=Mr().Tokenizer,Tc=Mr().TOKEN,sM=oi().Directives,rM=vc().TemplatablePattern,nM=Cr().Pattern,ce={TAG_OPEN:"TK_TAG_OPEN",TAG_CLOSE:"TK_TAG_CLOSE",ATTRIBUTE:"TK_ATTRIBUTE",EQUALS:"TK_EQUALS",VALUE:"TK_VALUE",COMMENT:"TK_COMMENT",TEXT:"TK_TEXT",UNKNOWN:"TK_UNKNOWN",START:Tc.START,RAW:Tc.RAW,EOF:Tc.EOF},pw=new sM(/<\!--/,/-->/),Ae=function(e,t){uw.call(this,e,t),this._current_tag_name="";var s=new rM(this._input).read_options(this._options),r=new nM(this._input);if(this.__patterns={word:s.until(/[\n\r\t <]/),single_quote:s.until_after(/'/),double_quote:s.until_after(/"/),attribute:s.until(/[\n\r\t =>]|\/>/),element_name:s.until(/[\n\r\t >\/]/),handlebars_comment:r.starting_with(/{{!--/).until_after(/--}}/),handlebars:r.starting_with(/{{/).until_after(/}}/),handlebars_open:r.until(/[\n\r\t }]/),handlebars_raw_close:r.until(/}}/),comment:r.starting_with(/<!--/).until_after(/-->/),cdata:r.starting_with(/<!\[CDATA\[/).until_after(/]]>/),conditional_comment:r.starting_with(/<!\[/).until_after(/]>/),processing:r.starting_with(/<\?/).until_after(/\?>/)},this._options.indent_handlebars&&(this.__patterns.word=this.__patterns.word.exclude("handlebars")),this._unformatted_content_delimiter=null,this._options.unformatted_content_delimiter){var n=this._input.get_literal_regexp(this._options.unformatted_content_delimiter);this.__patterns.unformatted_content_delimiter=r.matching(n).until_after(n)}};Ae.prototype=new uw;Ae.prototype._is_comment=function(e){return!1};Ae.prototype._is_opening=function(e){return e.type===ce.TAG_OPEN};Ae.prototype._is_closing=function(e,t){return e.type===ce.TAG_CLOSE&&t&&((e.text===">"||e.text==="/>")&&t.text[0]==="<"||e.text==="}}"&&t.text[0]==="{"&&t.text[1]==="{")};Ae.prototype._reset=function(){this._current_tag_name=""};Ae.prototype._get_next_token=function(e,t){var s=null;this._readWhitespace();var r=this._input.peek();return r===null?this._create_token(ce.EOF,""):(s=s||this._read_open_handlebars(r,t),s=s||this._read_attribute(r,e,t),s=s||this._read_close(r,t),s=s||this._read_raw_content(r,e,t),s=s||this._read_content_word(r),s=s||this._read_comment_or_cdata(r),s=s||this._read_processing(r),s=s||this._read_open(r,t),s=s||this._create_token(ce.UNKNOWN,this._input.next()),s)};Ae.prototype._read_comment_or_cdata=function(e){var t=null,s=null,r=null;if(e==="<"){var n=this._input.peek(1);n==="!"&&(s=this.__patterns.comment.read(),s?(r=pw.get_directives(s),r&&r.ignore==="start"&&(s+=pw.readIgnored(this._input))):s=this.__patterns.cdata.read()),s&&(t=this._create_token(ce.COMMENT,s),t.directives=r)}return t};Ae.prototype._read_processing=function(e){var t=null,s=null,r=null;if(e==="<"){var n=this._input.peek(1);(n==="!"||n==="?")&&(s=this.__patterns.conditional_comment.read(),s=s||this.__patterns.processing.read()),s&&(t=this._create_token(ce.COMMENT,s),t.directives=r)}return t};Ae.prototype._read_open=function(e,t){var s=null,r=null;return t||e==="<"&&(s=this._input.next(),this._input.peek()==="/"&&(s+=this._input.next()),s+=this.__patterns.element_name.read(),r=this._create_token(ce.TAG_OPEN,s)),r};Ae.prototype._read_open_handlebars=function(e,t){var s=null,r=null;return t||this._options.indent_handlebars&&e==="{"&&this._input.peek(1)==="{"&&(this._input.peek(2)==="!"?(s=this.__patterns.handlebars_comment.read(),s=s||this.__patterns.handlebars.read(),r=this._create_token(ce.COMMENT,s)):(s=this.__patterns.handlebars_open.read(),r=this._create_token(ce.TAG_OPEN,s))),r};Ae.prototype._read_close=function(e,t){var s=null,r=null;return t&&(t.text[0]==="<"&&(e===">"||e==="/"&&this._input.peek(1)===">")?(s=this._input.next(),e==="/"&&(s+=this._input.next()),r=this._create_token(ce.TAG_CLOSE,s)):t.text[0]==="{"&&e==="}"&&this._input.peek(1)==="}"&&(this._input.next(),this._input.next(),r=this._create_token(ce.TAG_CLOSE,"}}"))),r};Ae.prototype._read_attribute=function(e,t,s){var r=null,n="";if(s&&s.text[0]==="<")if(e==="=")r=this._create_token(ce.EQUALS,this._input.next());else if(e==='"'||e==="'"){var i=this._input.next();e==='"'?i+=this.__patterns.double_quote.read():i+=this.__patterns.single_quote.read(),r=this._create_token(ce.VALUE,i)}else n=this.__patterns.attribute.read(),n&&(t.type===ce.EQUALS?r=this._create_token(ce.VALUE,n):r=this._create_token(ce.ATTRIBUTE,n));return r};Ae.prototype._is_content_unformatted=function(e){return this._options.void_elements.indexOf(e)===-1&&(this._options.content_unformatted.indexOf(e)!==-1||this._options.unformatted.indexOf(e)!==-1)};Ae.prototype._read_raw_content=function(e,t,s){var r="";if(s&&s.text[0]==="{")r=this.__patterns.handlebars_raw_close.read();else if(t.type===ce.TAG_CLOSE&&t.opened.text[0]==="<"&&t.text[0]!=="/"){var n=t.opened.text.substr(1).toLowerCase();if(n==="script"||n==="style"){var i=this._read_comment_or_cdata(e);if(i)return i.type=ce.TEXT,i;r=this._input.readUntil(new RegExp("</"+n+"[\\n\\r\\t ]*?>","ig"))}else this._is_content_unformatted(n)&&(r=this._input.readUntil(new RegExp("</"+n+"[\\n\\r\\t ]*?>","ig")))}return r?this._create_token(ce.TEXT,r):null};Ae.prototype._read_content_word=function(e){var t="";if(this._options.unformatted_content_delimiter&&e===this._options.unformatted_content_delimiter[0]&&(t=this.__patterns.unformatted_content_delimiter.read()),t||(t=this.__patterns.word.read()),t)return this._create_token(ce.TEXT,t)};Cc.exports.Tokenizer=Ae;Cc.exports.TOKEN=ce});var hw=v((S$,fw)=>{"use strict";var iM=kc().Options,oM=si().Output,aM=jc().Tokenizer,ee=jc().TOKEN,dw=/\r\n|[\r\n]/,lM=/\r\n|[\r\n]/g,Ye=function(e,t){this.indent_level=0,this.alignment_size=0,this.max_preserve_newlines=e.max_preserve_newlines,this.preserve_newlines=e.preserve_newlines,this._output=new oM(e,t)};Ye.prototype.current_line_has_match=function(e){return this._output.current_line.has_match(e)};Ye.prototype.set_space_before_token=function(e,t){this._output.space_before_token=e,this._output.non_breaking_space=t};Ye.prototype.set_wrap_point=function(){this._output.set_indent(this.indent_level,this.alignment_size),this._output.set_wrap_point()};Ye.prototype.add_raw_token=function(e){this._output.add_raw_token(e)};Ye.prototype.print_preserved_newlines=function(e){var t=0;e.type!==ee.TEXT&&e.previous.type!==ee.TEXT&&(t=e.newlines?1:0),this.preserve_newlines&&(t=e.newlines<this.max_preserve_newlines+1?e.newlines:this.max_preserve_newlines+1);for(var s=0;s<t;s++)this.print_newline(s>0);return t!==0};Ye.prototype.traverse_whitespace=function(e){return e.whitespace_before||e.newlines?(this.print_preserved_newlines(e)||(this._output.space_before_token=!0),!0):!1};Ye.prototype.previous_token_wrapped=function(){return this._output.previous_token_wrapped};Ye.prototype.print_newline=function(e){this._output.add_new_line(e)};Ye.prototype.print_token=function(e){e.text&&(this._output.set_indent(this.indent_level,this.alignment_size),this._output.add_token(e.text))};Ye.prototype.indent=function(){this.indent_level++};Ye.prototype.get_full_indent=function(e){return e=this.indent_level+(e||0),e<1?"":this._output.get_indent_string(e)};var cM=function(e){for(var t=null,s=e.next;s.type!==ee.EOF&&e.closed!==s;){if(s.type===ee.ATTRIBUTE&&s.text==="type"){s.next&&s.next.type===ee.EQUALS&&s.next.next&&s.next.next.type===ee.VALUE&&(t=s.next.next.text);break}s=s.next}return t},pM=function(e,t){var s=null,r=null;return t.closed?(e==="script"?s="text/javascript":e==="style"&&(s="text/css"),s=cM(t)||s,s.search("text/css")>-1?r="css":s.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/)>-1?r="javascript":s.search(/(text|application|dojo)\/(x-)?(html)/)>-1?r="html":s.search(/test\/null/)>-1&&(r="null"),r):null};function Ir(e,t){return t.indexOf(e)!==-1}function uM(e,t,s){this.parent=e||null,this.tag=t?t.tag_name:"",this.indent_level=s||0,this.parser_token=t||null}function gs(e){this._printer=e,this._current_frame=null}gs.prototype.get_parser_token=function(){return this._current_frame?this._current_frame.parser_token:null};gs.prototype.record_tag=function(e){var t=new uM(this._current_frame,e,this._printer.indent_level);this._current_frame=t};gs.prototype._try_pop_frame=function(e){var t=null;return e&&(t=e.parser_token,this._printer.indent_level=e.indent_level,this._current_frame=e.parent),t};gs.prototype._get_frame=function(e,t){for(var s=this._current_frame;s&&e.indexOf(s.tag)===-1;){if(t&&t.indexOf(s.tag)!==-1){s=null;break}s=s.parent}return s};gs.prototype.try_pop=function(e,t){var s=this._get_frame([e],t);return this._try_pop_frame(s)};gs.prototype.indent_to_tag=function(e){var t=this._get_frame(e);t&&(this._printer.indent_level=t.indent_level)};function Xe(e,t,s,r){this._source_text=e||"",t=t||{},this._js_beautify=s,this._css_beautify=r,this._tag_stack=null;var n=new iM(t,"html");this._options=n,this._is_wrap_attributes_force=this._options.wrap_attributes.substr(0,5)==="force",this._is_wrap_attributes_force_expand_multiline=this._options.wrap_attributes==="force-expand-multiline",this._is_wrap_attributes_force_aligned=this._options.wrap_attributes==="force-aligned",this._is_wrap_attributes_aligned_multiple=this._options.wrap_attributes==="aligned-multiple",this._is_wrap_attributes_preserve=this._options.wrap_attributes.substr(0,8)==="preserve",this._is_wrap_attributes_preserve_aligned=this._options.wrap_attributes==="preserve-aligned"}Xe.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var e=this._source_text,t=this._options.eol;this._options.eol==="auto"&&(t=`
`,e&&dw.test(e)&&(t=e.match(dw)[0])),e=e.replace(lM,`
`);var s=e.match(/^[\t ]*/)[0],r={text:"",type:""},n=new mw,i=new Ye(this._options,s),o=new aM(e,this._options).tokenize();this._tag_stack=new gs(i);for(var a=null,l=o.next();l.type!==ee.EOF;)l.type===ee.TAG_OPEN||l.type===ee.COMMENT?(a=this._handle_tag_open(i,l,n,r),n=a):l.type===ee.ATTRIBUTE||l.type===ee.EQUALS||l.type===ee.VALUE||l.type===ee.TEXT&&!n.tag_complete?a=this._handle_inside_tag(i,l,n,o):l.type===ee.TAG_CLOSE?a=this._handle_tag_close(i,l,n):l.type===ee.TEXT?a=this._handle_text(i,l,n):i.add_raw_token(l),r=a,l=o.next();var c=i._output.get_code(t);return c};Xe.prototype._handle_tag_close=function(e,t,s){var r={text:t.text,type:t.type};return e.alignment_size=0,s.tag_complete=!0,e.set_space_before_token(t.newlines||t.whitespace_before!=="",!0),s.is_unformatted?e.add_raw_token(t):(s.tag_start_char==="<"&&(e.set_space_before_token(t.text[0]==="/",!0),this._is_wrap_attributes_force_expand_multiline&&s.has_wrapped_attrs&&e.print_newline(!1)),e.print_token(t)),s.indent_content&&!(s.is_unformatted||s.is_content_unformatted)&&(e.indent(),s.indent_content=!1),!s.is_inline_element&&!(s.is_unformatted||s.is_content_unformatted)&&e.set_wrap_point(),r};Xe.prototype._handle_inside_tag=function(e,t,s,r){var n=s.has_wrapped_attrs,i={text:t.text,type:t.type};if(e.set_space_before_token(t.newlines||t.whitespace_before!=="",!0),s.is_unformatted)e.add_raw_token(t);else if(s.tag_start_char==="{"&&t.type===ee.TEXT)e.print_preserved_newlines(t)?(t.newlines=0,e.add_raw_token(t)):e.print_token(t);else{if(t.type===ee.ATTRIBUTE?(e.set_space_before_token(!0),s.attr_count+=1):(t.type===ee.EQUALS||t.type===ee.VALUE&&t.previous.type===ee.EQUALS)&&e.set_space_before_token(!1),t.type===ee.ATTRIBUTE&&s.tag_start_char==="<"&&((this._is_wrap_attributes_preserve||this._is_wrap_attributes_preserve_aligned)&&(e.traverse_whitespace(t),n=n||t.newlines!==0),this._is_wrap_attributes_force)){var o=s.attr_count>1;if(this._is_wrap_attributes_force_expand_multiline&&s.attr_count===1){var a=!0,l=0,c;do{if(c=r.peek(l),c.type===ee.ATTRIBUTE){a=!1;break}l+=1}while(l<4&&c.type!==ee.EOF&&c.type!==ee.TAG_CLOSE);o=!a}o&&(e.print_newline(!1),n=!0)}e.print_token(t),n=n||e.previous_token_wrapped(),s.has_wrapped_attrs=n}return i};Xe.prototype._handle_text=function(e,t,s){var r={text:t.text,type:"TK_CONTENT"};return s.custom_beautifier_name?this._print_custom_beatifier_text(e,t,s):s.is_unformatted||s.is_content_unformatted?e.add_raw_token(t):(e.traverse_whitespace(t),e.print_token(t)),r};Xe.prototype._print_custom_beatifier_text=function(e,t,s){var r=this;if(t.text!==""){var n=t.text,i,o=1,a="",l="";s.custom_beautifier_name==="javascript"&&typeof this._js_beautify=="function"?i=this._js_beautify:s.custom_beautifier_name==="css"&&typeof this._css_beautify=="function"?i=this._css_beautify:s.custom_beautifier_name==="html"&&(i=function(h,u){var d=new Xe(h,u,r._js_beautify,r._css_beautify);return d.beautify()}),this._options.indent_scripts==="keep"?o=0:this._options.indent_scripts==="separate"&&(o=-e.indent_level);var c=e.get_full_indent(o);if(n=n.replace(/\n[ \t]*$/,""),s.custom_beautifier_name!=="html"&&n[0]==="<"&&n.match(/^(<!--|<!\[CDATA\[)/)){var p=/^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(n);if(!p){e.add_raw_token(t);return}a=c+p[1]+`
`,n=p[4],p[5]&&(l=c+p[5]),n=n.replace(/\n[ \t]*$/,""),(p[2]||p[3].indexOf(`
`)!==-1)&&(p=p[3].match(/[ \t]+$/),p&&(t.whitespace_before=p[0]))}if(n)if(i){var m=function(){this.eol=`
`};m.prototype=this._options.raw_options;var g=new m;n=i(c+n,g)}else{var y=t.whitespace_before;y&&(n=n.replace(new RegExp(`
(`+y+")?","g"),`
`)),n=c+n.replace(/\n/g,`
`+c)}a&&(n?n=a+n+`
`+l:n=a+l),e.print_newline(!1),n&&(t.text=n,t.whitespace_before="",t.newlines=0,e.add_raw_token(t),e.print_newline(!0))}};Xe.prototype._handle_tag_open=function(e,t,s,r){var n=this._get_tag_open_token(t);return(s.is_unformatted||s.is_content_unformatted)&&!s.is_empty_element&&t.type===ee.TAG_OPEN&&t.text.indexOf("</")===0?(e.add_raw_token(t),n.start_tag_token=this._tag_stack.try_pop(n.tag_name)):(e.traverse_whitespace(t),this._set_tag_position(e,t,n,s,r),n.is_inline_element||e.set_wrap_point(),e.print_token(t)),(this._is_wrap_attributes_force_aligned||this._is_wrap_attributes_aligned_multiple||this._is_wrap_attributes_preserve_aligned)&&(n.alignment_size=t.text.length+1),!n.tag_complete&&!n.is_unformatted&&(e.alignment_size=n.alignment_size),n};var mw=function(e,t){if(this.parent=e||null,this.text="",this.type="TK_TAG_OPEN",this.tag_name="",this.is_inline_element=!1,this.is_unformatted=!1,this.is_content_unformatted=!1,this.is_empty_element=!1,this.is_start_tag=!1,this.is_end_tag=!1,this.indent_content=!1,this.multiline_content=!1,this.custom_beautifier_name=null,this.start_tag_token=null,this.attr_count=0,this.has_wrapped_attrs=!1,this.alignment_size=0,this.tag_complete=!1,this.tag_start_char="",this.tag_check="",!t)this.tag_complete=!0;else{var s;this.tag_start_char=t.text[0],this.text=t.text,this.tag_start_char==="<"?(s=t.text.match(/^<([^\s>]*)/),this.tag_check=s?s[1]:""):(s=t.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/),this.tag_check=s?s[1]:"",t.text==="{{#>"&&this.tag_check===">"&&t.next!==null&&(this.tag_check=t.next.text)),this.tag_check=this.tag_check.toLowerCase(),t.type===ee.COMMENT&&(this.tag_complete=!0),this.is_start_tag=this.tag_check.charAt(0)!=="/",this.tag_name=this.is_start_tag?this.tag_check:this.tag_check.substr(1),this.is_end_tag=!this.is_start_tag||t.closed&&t.closed.text==="/>",this.is_end_tag=this.is_end_tag||this.tag_start_char==="{"&&(this.text.length<3||/[^#\^]/.test(this.text.charAt(2)))}};Xe.prototype._get_tag_open_token=function(e){var t=new mw(this._tag_stack.get_parser_token(),e);return t.alignment_size=this._options.wrap_attributes_indent_size,t.is_end_tag=t.is_end_tag||Ir(t.tag_check,this._options.void_elements),t.is_empty_element=t.tag_complete||t.is_start_tag&&t.is_end_tag,t.is_unformatted=!t.tag_complete&&Ir(t.tag_check,this._options.unformatted),t.is_content_unformatted=!t.is_empty_element&&Ir(t.tag_check,this._options.content_unformatted),t.is_inline_element=Ir(t.tag_name,this._options.inline)||t.tag_start_char==="{",t};Xe.prototype._set_tag_position=function(e,t,s,r,n){if(s.is_empty_element||(s.is_end_tag?s.start_tag_token=this._tag_stack.try_pop(s.tag_name):(this._do_optional_end_element(s)&&(s.is_inline_element||e.print_newline(!1)),this._tag_stack.record_tag(s),(s.tag_name==="script"||s.tag_name==="style")&&!(s.is_unformatted||s.is_content_unformatted)&&(s.custom_beautifier_name=pM(s.tag_check,t)))),Ir(s.tag_check,this._options.extra_liners)&&(e.print_newline(!1),e._output.just_added_blankline()||e.print_newline(!0)),s.is_empty_element){if(s.tag_start_char==="{"&&s.tag_check==="else"){this._tag_stack.indent_to_tag(["if","unless","each"]),s.indent_content=!0;var i=e.current_line_has_match(/{{#if/);i||e.print_newline(!1)}s.tag_name==="!--"&&n.type===ee.TAG_CLOSE&&r.is_end_tag&&s.text.indexOf(`
`)===-1||(s.is_inline_element||s.is_unformatted||e.print_newline(!1),this._calcluate_parent_multiline(e,s))}else if(s.is_end_tag){var o=!1;o=s.start_tag_token&&s.start_tag_token.multiline_content,o=o||!s.is_inline_element&&!(r.is_inline_element||r.is_unformatted)&&!(n.type===ee.TAG_CLOSE&&s.start_tag_token===r)&&n.type!=="TK_CONTENT",(s.is_content_unformatted||s.is_unformatted)&&(o=!1),o&&e.print_newline(!1)}else s.indent_content=!s.custom_beautifier_name,s.tag_start_char==="<"&&(s.tag_name==="html"?s.indent_content=this._options.indent_inner_html:s.tag_name==="head"?s.indent_content=this._options.indent_head_inner_html:s.tag_name==="body"&&(s.indent_content=this._options.indent_body_inner_html)),!(s.is_inline_element||s.is_unformatted)&&(n.type!=="TK_CONTENT"||s.is_content_unformatted)&&e.print_newline(!1),this._calcluate_parent_multiline(e,s)};Xe.prototype._calcluate_parent_multiline=function(e,t){t.parent&&e._output.just_added_newline()&&!((t.is_inline_element||t.is_unformatted)&&t.parent.is_inline_element)&&(t.parent.multiline_content=!0)};var dM=["address","article","aside","blockquote","details","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","main","nav","ol","p","pre","section","table","ul"],mM=["a","audio","del","ins","map","noscript","video"];Xe.prototype._do_optional_end_element=function(e){var t=null;if(!(e.is_empty_element||!e.is_start_tag||!e.parent)){if(e.tag_name==="body")t=t||this._tag_stack.try_pop("head");else if(e.tag_name==="li")t=t||this._tag_stack.try_pop("li",["ol","ul"]);else if(e.tag_name==="dd"||e.tag_name==="dt")t=t||this._tag_stack.try_pop("dt",["dl"]),t=t||this._tag_stack.try_pop("dd",["dl"]);else if(e.parent.tag_name==="p"&&dM.indexOf(e.tag_name)!==-1){var s=e.parent.parent;(!s||mM.indexOf(s.tag_name)===-1)&&(t=t||this._tag_stack.try_pop("p"))}else e.tag_name==="rp"||e.tag_name==="rt"?(t=t||this._tag_stack.try_pop("rt",["ruby","rtc"]),t=t||this._tag_stack.try_pop("rp",["ruby","rtc"])):e.tag_name==="optgroup"?t=t||this._tag_stack.try_pop("optgroup",["select"]):e.tag_name==="option"?t=t||this._tag_stack.try_pop("option",["select","datalist","optgroup"]):e.tag_name==="colgroup"?t=t||this._tag_stack.try_pop("caption",["table"]):e.tag_name==="thead"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"])):e.tag_name==="tbody"||e.tag_name==="tfoot"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"]),t=t||this._tag_stack.try_pop("thead",["table"]),t=t||this._tag_stack.try_pop("tbody",["table"])):e.tag_name==="tr"?(t=t||this._tag_stack.try_pop("caption",["table"]),t=t||this._tag_stack.try_pop("colgroup",["table"]),t=t||this._tag_stack.try_pop("tr",["table","thead","tbody","tfoot"])):(e.tag_name==="th"||e.tag_name==="td")&&(t=t||this._tag_stack.try_pop("td",["table","thead","tbody","tfoot","tr"]),t=t||this._tag_stack.try_pop("th",["table","thead","tbody","tfoot","tr"]));return e.parent=this._tag_stack.get_parser_token(),t}};fw.exports.Beautifier=Xe});var gw=v((L$,Mc)=>{"use strict";var fM=hw().Beautifier,hM=kc().Options;function gM(e,t,s,r){var n=new fM(e,t,s,r);return n.beautify()}Mc.exports=gM;Mc.exports.defaultOptions=function(){return new hM}});var ww=v((E$,ui)=>{"use strict";var _w=Qb(),yw=ow(),vw=gw();function bw(e,t,s,r){return s=s||_w,r=r||yw,vw(e,t,s,r)}bw.defaultOptions=vw.defaultOptions;ui.exports.js=_w;ui.exports.css=yw;ui.exports.html=bw});var Lw=v((k$,Sw)=>{"use strict";function xw(e,t,s){var r=function(n,i){return e.js_beautify(n,i)};return r.js=e.js_beautify,r.css=t.css_beautify,r.html=s.html_beautify,r.js_beautify=e.js_beautify,r.css_beautify=t.css_beautify,r.html_beautify=s.html_beautify,r}typeof define=="function"&&define.amd?define(["./lib/beautify","./lib/beautify-css","./lib/beautify-html"],function(e,t,s){return xw(e,t,s)}):function(e){var t=ww();t.js_beautify=t.js,t.css_beautify=t.css,t.html_beautify=t.html,e.exports=xw(t,t,t)}(Sw)});var Aw=v(Br=>{"use strict";var G=Br&&Br.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Br,"__esModule",{value:!0});var _M=G(F_()),Ew=G(Cv()),bt=G(Ie()),Uc=G(ie()),yM=G(Mv()),Ac=G(Av()),vM=G(Fl()),kw=G(Wl()),Hr=G(ot()),bM=G(Rs()),wM=G(Rv()),Pc=G(Tn()),xM=G(Hv()),SM=G(Fe()),LM=G(Ge()),EM=G(gt()),kM=G(Je()),TM=G(In()),Uw=G(ht()),CM=G(jn()),jM=G(Ia()),MM=G(Yn()),di=G(Y()),Tw=G(os()),UM=G(as()),AM=G(Re()),PM=G(br()),OM=G($v()),qM=G(gr()),RM=G(cb()),IM=G(db()),HM=G(yb()),Cw=G(bb()),BM=No(),DM=G(cc()),jw=G(Lw()),NM=/https?:\/\/([0-9.\-A-Za-z]+)(?::(\d+))?\/[A-Z.a-z0-9/]*\.js/g,Mw={comment:"",string:"",number:"",keyword:"",operator:""},Oc=class extends qM.default{constructor(t,{type:s="log",args:r=[],id:n,group:i,targetGroup:o,header:a,ignoreFilter:l=!1,accessGetter:c,unenumerable:p,lazyEvaluation:m}){super(),this.container=OM.default("div"),this.count=1,this.width=0,this.height=0,this.console=t,this.type=s,this.group=i,this.targetGroup=o,this.args=r,this.id=n,this.header=a,this.ignoreFilter=l,this.collapsed=!1,this.container.log=this,this.height=0,this.width=0,this.$container=PM.default(this.container),this.accessGetter=c,this.unenumerable=p,this.lazyEvaluation=m,this.formatMsg(),this.group&&this.checkGroup()}checkGroup(){let{group:t}=this,s=!1;for(;t;){if(t.collapsed){s=!0;break}t=t.parent}return s!==this.collapsed?(this.collapsed=s,!0):!1}updateIcon(t){let{c:s}=this.console;return this.$container.find(s(".icon")).rmAttr("class").addClass([s("icon"),s(`icon-${t}`)]),this}addCount(){this.count++;let{$container:t,count:s}=this,{c:r}=this.console,n=t.find(r(".count-container")),i=t.find(r(".icon-container")),o=n.find(r(".count"));return s===2&&n.rmClass(r("hidden")),o.text(Hr.default(s)),i.addClass(r("hidden")),this}groupEnd(){let{$container:t}=this,{c:s}=this.console;return t.find(`.${s("nesting-level")}:not(.${s("group-closed")})`).last().addClass(s("group-closed")),this}updateTime(t){let s=this.$container.find(this.console.c(".time-container"));return this.header&&(s.find("span").eq(0).text(t),this.header.time=t),this}isAttached(){return!!this.container.parentNode}updateSize(t=!0){let s=this.container.offsetHeight,r=this.container.offsetWidth;(this.height!==s||this.width!==r)&&(this.height=s,this.width=r,t||this.emit("updateSize"))}html(){return this.container.outerHTML}text(){return this.content.textContent||""}needSrc(){let{type:t,args:s}=this;if(t==="html")return!1;for(let r=0,n=s.length;r<n;r++)if(bt.default(s[r]))return!0;return!1}extractObj(t=MM.default){let{args:s,type:r}=this,n=i=>{this.src=i,t()};r==="table"?this._extractObj(s[0],{},n):this._extractObj(s.length===1&&bt.default(s[0])?s[0]:s,{},n)}_extractObj(t,s={},r){let{accessGetter:n,unenumerable:i}=this;vM.default(s,{accessGetter:n,unenumerable:i,symbol:i,timeout:1e3}),FM(t,s,o=>r(JSON.parse(o)))}click(){let{type:t,src:s,$container:r,console:n,unenumerable:i,accessGetter:o}=this,{c:a}=n,{args:l}=this;switch(t){case"log":case"warn":case"debug":case"output":case"table":case"dir":case"group":case"groupCollapsed":if(s||l){let c=r.find(a(".json"));if(c.hasClass(a("hidden"))){if(c.data("init")!=="true"){if(s){let p=new Ew.default.Static(c.get(0));p.set(s),p.on("change",()=>this.updateSize(!1))}else{(t==="table"||l.length===1)&&bt.default(l[0])&&(l=l[0]);let p=new Ew.default(c.get(0),{unenumerable:i,accessGetter:o});p.set(l),p.on("change",()=>this.updateSize(!1))}c.data("init","true")}c.rmClass(a("hidden"))}else c.addClass(a("hidden"))}else(t==="group"||t==="groupCollapsed")&&n.toggleGroup(this);break;case"error":r.find(a(".stack")).toggleClass(a("hidden"));break}this.updateSize(!1)}formatMsg(){let{args:t}=this,{type:s,id:r,header:n,group:i,lazyEvaluation:o}=this,{c:a}=this.console;t=jM.default(t),this.needSrc()&&!o&&this.extractObj();let l="",c,p;switch((s==="group"||s==="groupCollapsed")&&t.length===0&&(t=["console.group"]),s){case"log":l=this.formatCommon(t);break;case"debug":l=this.formatCommon(t);break;case"dir":l=this.formatDir(t);break;case"warn":c="warn",l=this.formatCommon(t);break;case"error":Uc.default(t[0])&&t.length!==1&&(t=this.substituteStr(t)),p=t[0],c="error",p=yM.default(p)?p:new Error(this.formatCommon(t)),this.src=p,l=this.formatErr(p);break;case"table":l=this.formatTable(t);break;case"html":l=t[0];break;case"input":l=this.formatJs(t[0]),c="input";break;case"output":l=this.formatCommon(t),c="output";break;case"groupCollapsed":l=this.formatCommon(t),c="caret-right";break;case"group":l=this.formatCommon(t),c="caret-down";break}(!this.needSrc()||!o)&&delete this.args,s!=="error"&&!this.args&&(l=HM.default(l,m=>`<a href="${m}" target="_blank">${m}</a>`)),l=this.render({msg:l,type:s,icon:c,id:r,header:n,group:i}),this.$container.addClass(`${a("log-container")}`).html(l),this.$content=this.$container.find(a(".log-content")),this.content=this.$content.get(0)}render(t){let{c:s}=this.console,r="",n="";if(t.group){let{indentLevel:o}=t.group;for(let a=0;a<o;a++)n+=`<div class="${s("nesting-level")}"></div>`}t.header&&(r+=DM.default`
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
    </div>`,r}formatTable(t){let s="__LunaConsoleValue",r=t[0],n="",i=t[1],o=[];return Uc.default(i)&&(i=EM.default(i)),kM.default(i)||(i=null),bt.default(r)?(di.default(r,a=>{Ac.default(a)?o.push(s):bt.default(a)&&(o=o.concat(AM.default(a)))}),o=TM.default(o),o.sort(),i&&(o=o.filter(a=>Uw.default(i,a))),o.length>20&&(o=o.slice(0,20)),CM.default(o)?this.formatCommon(t):(n+="<table><thead><tr><th>(index)</th>",o.forEach(a=>n+=`<th>${a===s?"Value":Hr.default(a)}</th>`),n+="</tr></thead><tbody>",di.default(r,(a,l)=>{n+=`<tr><td>${l}</td>`,o.forEach(c=>{bt.default(a)?n+=c===s?"<td></td>":`<td>${this.formatTableVal(a[c])}</td>`:Ac.default(a)&&(n+=c===s?`<td>${this.formatTableVal(a)}</td>`:"<td></td>")}),n+="</tr>"}),n+="</tbody></table>",n+=`<div class="${this.console.c("json hidden")}"></div>`,n)):this.formatCommon(t)}formatErr(t){let s=t.stack?t.stack.split(`
`):[],r=`${t.message||s[0]}<br/>`;s=s.map(i=>Pc.default(i));let n=`<div class="${this.console.c("stack hidden")}">${s.slice(1).join("<br/>")}</div>`;return r+n.replace(NM,i=>`<a href="${i}" target="_blank">${i}</a>`)}formatCommon(t,{htmlForEl:s=!0}={}){let r=Uc.default(t[0])&&t.length!==1;r&&(t=this.substituteStr(t));for(let n=0,i=t.length;n<i;n++){let o=t[n];kw.default(o)&&s?t[n]=this.formatEl(o):LM.default(o)?t[n]=this.formatJs(o):bt.default(o)?t[n]=this.formatObj(o):SM.default(o)?t[n]="undefined":xM.default(o)?t[n]="null":(o=Hr.default(o),(n!==0||!r)&&(o=Pc.default(o)),t[n]=o)}return t.join(" ")+`<div class="${this.console.c("json hidden")}"></div>`}formatDir(t){return this.formatCommon(t,{htmlForEl:!1})}formatTableVal(t){return bt.default(t)?t="{\u2026}":Ac.default(t)?this.getAbstract(t):Hr.default(t)}getAbstract(t){return`<span class="${this.console.c("abstract")}">`+_M.default(t,{getterVal:this.accessGetter,unenumerable:!1})+"</span>"}substituteStr(t){let s=Pc.default(t[0]),r=!1,n="";t.shift();for(let i=0,o=s.length;i<o;i++){let a=s[i];if(a==="%"&&t.length!==0){i++;let l=t.shift();switch(s[i]){case"i":case"d":n+=wM.default(l);break;case"f":n+=bM.default(l);break;case"s":n+=Hr.default(l);break;case"O":bt.default(l)&&(n+=this.getAbstract(l));break;case"o":kw.default(l)?n+=this.formatEl(l):bt.default(l)&&(n+=this.getAbstract(l));break;case"c":if(s.length<=i+1)break;r&&(n+="</span>"),r=!0,n+=`<span style="${$M(l)}">`;break;default:i--,t.unshift(l),n+=a}}else n+=a}return r&&(n+="</span>"),t.unshift(n),t}formatJs(t){return`<pre class="${this.console.c("code")}">${this.console.c(Cw.default(jw.default(t,{indent_size:2}),"js",Mw))}</pre>`}formatObj(t){let s=BM.getObjType(t);return s==="Array"&&t.length>1&&(s=`(${t.length})`),`${s} ${this.getAbstract(t)}`}formatEl(t){let{c:s}=this.console;return`<pre class="${s("code")}">${s(Cw.default(jw.default.html(t.outerHTML,{unformatted:[],indent_size:2}),"html",Mw))}</pre>`}};Br.default=Oc;function $M(e){e=UM.default(e);let t=e.split(";"),s={};di.default(t,n=>{if(!Uw.default(n,":"))return;let[i,o]=n.split(":");s[Tw.default(i)]=Tw.default(o)}),s.display="inline-block",s["max-width"]="100%",delete s.width,delete s.height;let r="";return di.default(s,(n,i)=>{r+=`${i}:${n};`}),r}function FM(e,t,s){let r=RM.default(e,t);IM.default(()=>s(r))}});var Rw=v((Dr,qw)=>{var Pw=Lr(),Ow=An(),qc=Ow.performance,mi=Ow.process,fi;qc&&qc.now?Dr=function(){return qc.now()}:mi&&mi.hrtime?(Rc=function(){var e=mi.hrtime();return e[0]*1e9+e[1]},fi=Rc()-mi.uptime()*1e9,Dr=function(){return(Rc()-fi)/1e6}):(fi=Pw(),Dr=function(){return Pw()-fi});var Rc;qw.exports=Dr});var Hw=v((Ic,Iw)=>{var zM=ft();Ic=function(e){return zM(e)==="[object RegExp]"};Iw.exports=Ic});var Dw=v((Hc,Bw)=>{var WM=ls(),GM=Yn();Hc=function(e,t){t=t||GM;var s=document.createElement("textarea"),r=document.body;WM(s.style,{fontSize:"12pt",border:"0",padding:"0",margin:"0",position:"absolute",left:"-9999px"}),s.value=e,r.appendChild(s),s.setAttribute("readonly",""),s.select(),s.setSelectionRange(0,e.length);try{document.execCommand("copy"),t()}catch(n){t(n)}finally{r.removeChild(s)}};Bw.exports=Hc});var $w=v((Bc,Nw)=>{Bc=function(e,t,s){var r;return function(){var n=this,i=arguments,o=function(){r=null,e.apply(n,i)};s||clearTimeout(r),(!s||!r)&&(r=setTimeout(o,t))}};Nw.exports=Bc});var zw=v((Dc,Fw)=>{var JM=$w();Dc=function(e,t){return JM(e,t,!0)};Fw.exports=Dc});var Gw=v((Nc,Ww)=>{Nc=function(e){for(var t=[],s=document.evaluate(e,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),r=0;r<s.snapshotLength;r++)t.push(s.snapshotItem(r));return t};Ww.exports=Nc});var Vw=v(($c,Jw)=>{var VM=ft();$c=function(e){return VM(e)==="[object Date]"};Jw.exports=$c});var Xw=v((Fc,Kw)=>{Fc=function(e,t){var s="";if(t<1)return"";for(;t>0;)t&1&&(s+=e),t>>=1,e+=e;return s};Kw.exports=Fc});var Qw=v((zc,Yw)=>{var KM=Xw(),XM=ot();zc=function(e,t,s){e=XM(e);var r=e.length;return s=s||" ",r<t&&(e=(KM(s,t-r)+e).slice(-t)),e};Yw.exports=zc});var ex=v((ct,Zw)=>{var YM=ie(),QM=Vw(),hi=ot(),ZM=Qw();ct=function(e,t,s,r){arguments.length===1&&YM(e)&&!sU.test(e)&&(t=e,e=void 0),e=e||new Date,QM(e)||(e=new Date(e)),t=hi(ct.masks[t]||t||ct.masks.default);var n=t.slice(0,4);(n==="UTC:"||n==="GMT:")&&(t=t.slice(4),s=!0,n==="GMT:"&&(r=!0));var i=s?"getUTC":"get",o=e[i+"Date"](),a=e[i+"Day"](),l=e[i+"Month"](),c=e[i+"FullYear"](),p=e[i+"Hours"](),m=e[i+"Minutes"](),g=e[i+"Seconds"](),y=e[i+"Milliseconds"](),h=s?0:e.getTimezoneOffset(),u={d:o,dd:Ct(o),ddd:ct.i18n.dayNames[a],dddd:ct.i18n.dayNames[a+7],m:l+1,mm:Ct(l+1),mmm:ct.i18n.monthNames[l],mmmm:ct.i18n.monthNames[l+12],yy:hi(c).slice(2),yyyy:c,h:p%12||12,hh:Ct(p%12||12),H:p,HH:Ct(p),M:m,MM:Ct(m),s:g,ss:Ct(g),l:Ct(y,3),L:Ct(Math.round(y/10)),t:p<12?"a":"p",tt:p<12?"am":"pm",T:p<12?"A":"P",TT:p<12?"AM":"PM",Z:r?"GMT":s?"UTC":(hi(e).match(tU)||[""]).pop().replace(rU,""),o:(h>0?"-":"+")+Ct(Math.floor(Math.abs(h)/60)*100+Math.abs(h)%60,4),S:["th","st","nd","rd"][o%10>3?0:(o%100-o%10!=10)*o%10]};return t.replace(eU,function(d){return d in u?u[d]:d.slice(1,d.length-1)})};var Ct=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;return ZM(hi(e),t,"0")},eU=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,tU=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,sU=/\d/,rU=/[^-+\dA-Z]/g;ct.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};ct.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Zw.exports=ct});var ix=v((Gc,nx)=>{var rx=An(),Wc=rx.getComputedStyle,tx=rx.document;Gc=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=t.display,r=s===void 0?!0:s,n=t.visibility,i=n===void 0?!1:n,o=t.opacity,a=o===void 0?!1:o,l=t.size,c=l===void 0?!1:l,p=t.viewport,m=p===void 0?!1:p,g=t.overflow,y=g===void 0?!1:g;if(r)return e.offsetParent===null;var h=Wc(e);if(i&&h.visibility==="hidden")return!0;if(a){if(h.opacity==="0")return!0;for(var u=e;u=u.parentElement;){var d=Wc(u);if(d.opacity==="0")return!0}}var b=e.getBoundingClientRect();if(c&&(b.width===0||b.height===0))return!0;if(m){var x={top:0,left:0,right:tx.documentElement.clientWidth,bottom:tx.documentElement.clientHeight};return sx(b,x)}if(y)for(var w=e;w=w.parentElement;){var _=Wc(w),f=_.overflow;if(f==="scroll"||f==="hidden"){var T=w.getBoundingClientRect();if(sx(b,T))return!0}}return!1};function sx(e,t){return e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom}nx.exports=Gc});var ox=v(Nr=>{"use strict";var Vc=Nr&&Nr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Nr,"__esModule",{value:!0});var nU=Vc(gr()),iU=Vc(br()),oU=Dn(),aU=Vc(Y()),Jc=class extends nU.default{constructor(t,{compName:s}){super(),this.compName=s,this.c=oU.classPrefix(s),this.options={},this.container=t,this.$container=iU.default(t),this.$container.addClass(`luna-${s}`)}destroy(){this.$container.rmClass(`luna-${this.compName}`),this.$container.html(""),this.emit("destroy"),this.removeAllListeners()}setOption(t,s){let r=this.options,n={};typeof t=="string"?n[t]=s:n=t,aU.default(n,(i,o)=>{let a=r[o];r[o]=i,this.emit("optionChange",o,i,a)})}find(t){return this.$container.find(this.c(t))}};Nr.default=Jc});var px=v((Kc,cx)=>{var lU=Lr(),cU=na(),_s,Fr,ax=0;if(cU)for(_s=window.requestAnimationFrame,Fr=window.cancelAnimationFrame,$r=["ms","moz","webkit","o"],Fs=0,lx=$r.length;Fs<lx&&!_s;Fs++)_s=window[$r[Fs]+"RequestAnimationFrame"],Fr=window[$r[Fs]+"CancelAnimationFrame"]||window[$r[Fs]+"CancelRequestAnimationFrame"];var $r,Fs,lx;_s=_s||function(e){var t=lU(),s=Math.max(0,16-(t-ax)),r=setTimeout(function(){e(t+s)},s);return ax=t+s,r};Fr=Fr||function(e){clearTimeout(e)};_s.cancel=Fr;Kc=_s;cx.exports=Kc});var _x=v((Wr,Xc)=>{"use strict";var re=Wr&&Wr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Wr,"__esModule",{value:!0});var pU=re(Aw()),ux=re(Fe()),dx=re(Rw()),uU=re(Lr()),mx=re(ie()),dU=re(ls()),mU=re(Pl()),fU=re(Hw()),hU=re(Ge()),fx=re(La()),ys=re(jn()),gU=re(ht()),_U=re(Dw()),hx=re(Y()),yU=re(gt()),vU=re(Re()),bU=re(Pn()),wU=re(zw()),xU=re(Gw()),SU=re(as()),LU=re(ex()),EU=re(ix()),kU=re(cc()),TU=Dn(),CU=re(ox()),jU=px(),gx=navigator.userAgent,MU=gx.indexOf("Android")>-1||gx.indexOf("Adr")>-1,UU=TU.classPrefix("console"),AU=0,zr=class extends CU.default{constructor(t,{maxNum:s=0,asyncRender:r=!0,showHeader:n=!1,filter:i="all",accessGetter:o=!1,unenumerable:a=!0,lazyEvaluation:l=!0}={}){super(t,{compName:"console"}),this.spaceHeight=0,this.topSpaceHeight=0,this.bottomSpaceHeight=0,this.lastScrollTop=0,this.lastTimestamp=0,this.speedToleranceFactor=100,this.maxSpeedTolerance=2e3,this.minSpeedTolerance=100,this.logs=[],this.displayLogs=[],this.timer={},this.counter={},this.asyncList=[],this.asyncTimer=null,this.isAtBottom=!0,this.groupStack=new fx.default,this.onScroll=()=>{let{scrollHeight:c,offsetHeight:p,scrollTop:m}=this.container;if(m<=0||p+m>c)return;let g=!1;(c===p||m===c-p)&&(g=!0),this.isAtBottom=g;let y=this.lastScrollTop,h=this.lastTimestamp,u=uU.default(),d=u-h,b=m-y,w=Math.abs(b/d)*this.speedToleranceFactor;d>1e3&&(w=1e3),w>this.maxSpeedTolerance&&(w=this.maxSpeedTolerance),w<this.minSpeedTolerance&&(w=this.minSpeedTolerance),this.lastScrollTop=m,this.lastTimestamp=u;let _=0,f=0;y<m?(_=this.minSpeedTolerance,f=w):(_=w,f=this.minSpeedTolerance),!(this.topSpaceHeight<m-_&&this.topSpaceHeight+this.el.offsetHeight>m+p+f)&&this.renderViewport({topTolerance:_*2,bottomTolerance:f*2})},this.initTpl(),this.options={maxNum:s,asyncRender:r,showHeader:n,filter:i,accessGetter:o,unenumerable:a,lazyEvaluation:l},this.$el=this.find(".logs"),this.el=this.$el.get(0),this.$fakeEl=this.find(".fake-logs"),this.fakeEl=this.$fakeEl.get(0),this.$space=this.find(".logs-space"),this.space=this.$space.get(0),MU&&(this.speedToleranceFactor=800,this.maxSpeedTolerance=3e3,this.minSpeedTolerance=800),this.renderViewport=wU.default(c=>{this._renderViewport(c)},16),this.global={copy(c){mx.default(c)||(c=JSON.stringify(c,null,2)),_U.default(c)},$(c){return document.querySelector(c)},$$(c){return yU.default(document.querySelectorAll(c))},$x(c){return xU.default(c)},clear:()=>{this.clear()},dir:c=>{this.dir(c)},table:(c,p)=>{this.table(c,p)},keys:vU.default},this.bindEvent()}setGlobal(t,s){this.global[t]=s}destroy(){super.destroy(),this.$container.off("scroll",this.onScroll)}count(t="default"){let{counter:s}=this;ux.default(s[t])?s[t]=1:s[t]++,this.info(`${t}: ${s[t]}`)}countReset(t="default"){this.counter[t]=0}assert(...t){if(ys.default(t))return;t.shift()||(t.length===0&&t.unshift("console.assert"),t.unshift("Assertion failed: "),this.insert("error",t))}log(...t){ys.default(t)||this.insert("log",t)}debug(...t){ys.default(t)||this.insert("debug",t)}dir(t){ux.default(t)||this.insert("dir",[t])}table(...t){ys.default(t)||this.insert("table",t)}time(t="default"){if(this.timer[t])return this.insert("warn",[`Timer '${t}' already exists`]);this.timer[t]=dx.default()}timeLog(t="default"){let s=this.timer[t];if(!s)return this.insert("warn",[`Timer '${t}' does not exist`]);this.info(`${t}: ${dx.default()-s}ms`)}timeEnd(t="default"){this.timeLog(t),delete this.timer[t]}clear(t=!1){this.logs=[],this.displayLogs=[],this.lastLog=void 0,this.counter={},this.timer={},this.groupStack=new fx.default,this.asyncList=[],this.asyncTimer&&(clearTimeout(this.asyncTimer),this.asyncTimer=null),t?this.render():this.insert("log",["%cConsole was cleared","color:#808080;font-style:italic;"])}info(...t){ys.default(t)||this.insert("log",t)}error(...t){ys.default(t)||this.insert("error",t)}warn(...t){ys.default(t)||this.insert("warn",t)}group(...t){this.insert({type:"group",args:t,ignoreFilter:!0})}groupCollapsed(...t){this.insert({type:"groupCollapsed",args:t,ignoreFilter:!0})}groupEnd(){this.insert("groupEnd")}evaluate(t){this.insert({type:"input",args:[t],ignoreFilter:!0});try{this.output(this.evalJs(t))}catch(s){this.insert({type:"error",ignoreFilter:!0,args:[s]})}}html(...t){this.insert("html",t)}toggleGroup(t){let{targetGroup:s}=t;s.collapsed?this.openGroup(t):this.collapseGroup(t)}output(t){this.insert({type:"output",args:[t],ignoreFilter:!0})}render(){let{logs:t}=this;this.$el.html(""),this.isAtBottom=!0,this.updateBottomSpace(0),this.updateTopSpace(0),this.displayLogs=[];for(let s=0,r=t.length;s<r;s++)this.attachLog(t[s])}insert(t,s){let{showHeader:r,asyncRender:n}=this.options,i;if(r&&(i={time:PU(),from:OU()}),n)return this.insertAsync(t,s,i);this.insertSync(t,s,i)}insertAsync(t,s,r){this.asyncList.push([t,s,r]),this.handleAsyncList()}insertSync(t,s,r){let{logs:n,groupStack:i}=this,{maxNum:o,accessGetter:a,unenumerable:l,lazyEvaluation:c}=this.options,p;if(mx.default(t)?p={type:t,args:s,header:r}:p=t,p.type==="groupEnd"){this.lastLog.groupEnd(),this.groupStack.pop();return}if(i.size>0&&(p.group=i.peek()),dU.default(p,{id:++AU,accessGetter:a,unenumerable:l,lazyEvaluation:c}),p.type==="group"||p.type==="groupCollapsed"){let y={id:mU.default("group"),collapsed:!1,parent:i.peek(),indentLevel:i.size+1};p.type==="groupCollapsed"&&(y.collapsed=!0),p.targetGroup=y,i.push(y)}let m=new pU.default(this,p);m.on("updateSize",()=>{this.isAtBottom=!1,this.renderViewport()});let g=this.lastLog;if(g&&!gU.default(["html","group","groupCollapsed"],m.type)&&g.type===m.type&&!m.src&&!m.args&&g.text()===m.text()?(g.addCount(),m.header&&g.updateTime(m.header.time),m=g,this.detachLog(g)):(n.push(m),this.lastLog=m),o!==0&&n.length>o){let y=n[0];this.detachLog(y),n.shift()}this.attachLog(m),this.emit("insert",m)}updateTopSpace(t){this.topSpaceHeight=t,this.el.style.top=t+"px"}updateBottomSpace(t){this.bottomSpaceHeight=t}updateSpace(t){this.spaceHeight!==t&&(this.spaceHeight=t,this.space.style.height=t+"px")}detachLog(t){let{displayLogs:s}=this,r=s.indexOf(t);r>-1&&(s.splice(r,1),this.renderViewport())}attachLog(t){if(!this.filterLog(t)||t.collapsed)return;let{displayLogs:s}=this;if(s.length===0){s.push(t),this.renderViewport();return}let r=bU.default(s);if(t.id>r.id){s.push(t),this.renderViewport();return}let n=0,i=s.length-1,o,a=0;for(;n<=i;){if(a=n+Math.floor((i-n)/2),o=s[a],o.id===t.id)return;o.id<t.id?n=a+1:i=a-1}o.id<t.id?s.splice(a+1,0,t):s.splice(a,0,t),this.renderViewport()}handleAsyncList(t=20){let s=this.asyncList;this.asyncTimer||(this.asyncTimer=setTimeout(()=>{this.asyncTimer=null;let r=!1,n=s.length,i,o;n<1e3?(o=200,i=400):n<5e3?(o=500,i=800):n<1e4?(o=800,i=1e3):n<25e3?(o=1e3,i=1200):n<5e4?(o=1500,i=1500):(o=2e3,i=2500),o>n&&(o=n,r=!0);for(let a=0;a<o;a++){let[l,c,p]=s.shift();this.insertSync(l,c,p)}r||jU(()=>this.handleAsyncList(i))},t))}injectGlobal(){hx.default(this.global,(t,s)=>{window[s]||(window[s]=t)})}clearGlobal(){hx.default(this.global,(t,s)=>{window[s]&&window[s]===t&&delete window[s]})}evalJs(t){let s;this.injectGlobal();try{s=eval.call(window,`(${t})`)}catch{s=eval.call(window,t)}return this.setGlobal("$_",s),this.clearGlobal(),s}filterLog(t){let{filter:s}=this.options;return s==="all"||t.ignoreFilter?!0:hU.default(s)?s(t):fU.default(s)?s.test(SU.default(t.text())):t.type===s}collapseGroup(t){let{targetGroup:s}=t;s.collapsed=!0,t.updateIcon("caret-right"),this.updateGroup(t)}openGroup(t){let{targetGroup:s}=t;s.collapsed=!1,t.updateIcon("caret-down"),this.updateGroup(t)}updateGroup(t){let{targetGroup:s}=t,{logs:r}=this,n=r.length,i=r.indexOf(t)+1;for(;i<n;){let o=r[i];if(!o.checkGroup()&&o.group===s)break;o.collapsed?this.detachLog(o):this.attachLog(o),i++}}bindEvent(){let{$el:t}=this;t.on("click",UU(".log-container"),function(){this.log.click()}),this.on("optionChange",(s,r)=>{let{logs:n}=this;switch(s){case"maxNum":r>0&&n.length>r&&(this.logs=n.slice(n.length-r),this.render());break;case"filter":this.render();break}}),this.$container.on("scroll",this.onScroll)}_renderViewport({topTolerance:t=500,bottomTolerance:s=500}={}){let{el:r,container:n}=this;if(EU.default(n))return;let{scrollTop:i,clientWidth:o,offsetHeight:a}=n,l=i-t,c=i+a+s,{displayLogs:p}=this,m=0,g=0,y=0,h=p.length,{fakeEl:u}=this,d=document.createDocumentFragment(),b=[];for(let _=0;_<h;_++){let f=p[_],{width:T,height:L}=f;(L===0||T!==o)&&(d.appendChild(f.container),b.push(f))}if(b.length>0){u.appendChild(d);for(let _=0,f=b.length;_<f;_++)b[_].updateSize();u.innerHTML=""}let x=document.createDocumentFragment();for(let _=0;_<h;_++){let f=p[_],{container:T,height:L}=f;y>c?g+=L:y+L>l?x.appendChild(T):y<l&&(m+=L),y+=L}for(this.updateSpace(y),this.updateTopSpace(m),this.updateBottomSpace(g);r.firstChild;)r.lastChild&&r.removeChild(r.lastChild);r.appendChild(x);let{scrollHeight:w}=n;this.isAtBottom&&i<=w-a&&(n.scrollTop=1e7)}initTpl(){this.$container.html(this.c(kU.default`
      <div class="logs-space">
        <div class="fake-logs"></div>
        <div class="logs"></div>
      </div>
    `))}};Wr.default=zr;Xc.exports=zr;Xc.exports.default=zr;var PU=()=>LU.default("HH:MM:ss ");function OU(){let e=new Error,t="",s=e.stack?e.stack.split(`
`):"";for(let r=0,n=s.length;r<n;r++)if(t=s[r],t.indexOf("winConsole")>-1&&r<n-1){t=s[r+1];break}return t}});var Ei=(e,t)=>{let s;return(...r)=>{s&&clearTimeout(s),s=setTimeout(()=>e.apply(null,r),typeof t=="function"?t():t)}},yp=e=>{let t=document.createElement("textarea");return t.innerHTML=e,t.value};var ki=e=>e.replace(/<\/script>/g,"<\\/script>"),Xt=(e,t=!0)=>e.replace(/\\/g,t?"\\\\":"\\").replace(/`/g,"\\`").replace(/<\/script>/g,"<\\/script>");var Ks=()=>{let e=!1,t=navigator.userAgent.toLowerCase();(function(r){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4)))&&(e=!0)})(t||navigator.vendor||window.opera);let s=t.indexOf("safari")>-1&&t.indexOf("chrome")===-1;return e||s},xs=e=>!e?.startsWith("http")&&!e?.startsWith("data:"),Ss=(e,t=document.baseURI)=>xs(e)?new URL(e,t).href:e,Mt=e=>JSON.parse(JSON.stringify(e)),Xs=(e,t)=>Object.fromEntries(Object.entries(e).map(([s,r],n)=>[s,t(r,s,n)])),vp=(e,t)=>Object.fromEntries(Object.entries(e).filter(([s,r],n)=>t(r,s,n))),Ti=e=>{if(document.queryCommandSupported&&document.queryCommandSupported("copy")){let t=document.createElement("textarea");t.textContent=e,t.style.position="fixed",document.body.appendChild(t),t.select();try{return document.execCommand("copy")}catch(s){return console.warn("Copy to clipboard failed.",s),!1}finally{document.body.removeChild(t)}}return!1};var tn=(e,t=!1)=>{try{return JSON.stringify(e,void 0,t?2:void 0)}catch{return""}},t0=()=>String(Math.random())+"-"+Date.now().toFixed();var sn=(e,t)=>new Promise((s,r)=>{if(t&&globalThis[t])return s(globalThis[t]);if(typeof globalThis.importScripts=="function")return globalThis.importScripts(e),t&&globalThis[t]?s(globalThis[t]):s(globalThis);let n=document.createElement("script");n.src=e,n.async=!0;let i=()=>{n.removeEventListener("load",o),n.removeEventListener("error",a)},o=()=>{if(i(),!t)return s("loaded: "+e);let l=setInterval(()=>{if(window[t])return clearInterval(l),s(window[t])},5)},a=()=>{i(),r("failed to load: "+e)};n.addEventListener("load",o),n.addEventListener("error",a),document.head.appendChild(n)}),Ls=(e,t,s)=>{if(t&&document.getElementById(t))return;let r=document.createElement("link");r.rel="stylesheet",r.href=e,r.id=t||"styles-"+t0(),document.head.insertBefore(r,s?document.querySelector(s):null)};var Ys=e=>e.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,"$1"),s0=e=>e.replace(/'[^\n']*'/gm,"''").replace(/"[^\n"]*"/gm,'""').replace(/`[^`]*`/gm,"``"),Ci=e=>s0(Ys(e)),D=(e,t)=>({...t.customSettings[e]}),ji=e=>{if(!e)return null;let t=null;if(e.startsWith("http")||e.startsWith("data:"))try{t=new URL(e).href}catch{try{t=new URL(decodeURIComponent(e)).href}catch{}}return t};var bp=e=>e.replace(/[-_.]+/g," ").trim().replace(/^([A-Z])|\s+(\w)/g,function(t,s,r){return r?r.toUpperCase():s.toLowerCase()}),Yt=e=>Array.from(new Set(e));function r0(e){return import(e)}var Mi=null;function wp(e){return Mi||(Mi=r0(e).catch(()=>{})),Mi}var Sp=["jspm","skypack"],Lp=["unpkg","jsdelivr"],Ep=["jsdelivr.gh","statically"],De={getModuleUrl:(e,{isModule:t=!0,defaultCDN:s="jspm"}={})=>{e=e.replace(/#nobundle/g,"");let r=xp(e,t,s);return r||(t?"https://jspm.dev/"+e:"https://cdn.jsdelivr.net/npm/"+e)},getUrl:(e,t)=>e.startsWith("http")?e:xp(e,!1,t||Qt())||e,cdnLists:{npm:Lp,module:Sp,gh:Ep},checkCDNs:async(e,t)=>{let s=[t,...De.cdnLists.npm].filter(Boolean);for(let r of s)try{if((await fetch(De.getUrl(e,r),{method:"HEAD"})).ok)return r}catch{}return De.cdnLists.npm[0]}},Qt=()=>{if(globalThis.appCDN)return globalThis.appCDN;try{return new URL(location.href).searchParams.get("appCDN")||De.cdnLists.npm[0]}catch{return De.cdnLists.npm[0]}},xp=(e,t,s)=>{let r=t&&e.startsWith("unpkg:")?"?module":"";e.startsWith("gh:")?e=e.replace("gh",Ep[0]):e.includes(":")||(e=(s||(t?Sp[0]:Lp[0]))+":"+e);for(let n of n0){let[i,o]=n;if(i.test(e))return e.replace(i,o)+r}return null},n0=[[/^(jspm:)(.+)/i,"https://jspm.dev/$2"],[/^(npm:)(.+)/i,"https://jspm.dev/$2"],[/^(node:)(.+)/i,"https://jspm.dev/$2"],[/^(skypack:)(.+)/i,"https://cdn.skypack.dev/$2"],[/^(jsdelivr:)(.+)/i,"https://cdn.jsdelivr.net/npm/$2"],[/^(jsdelivr.gh:)(.+)/i,"https://cdn.jsdelivr.net/gh/$2"],[/^(statically:)(.+)/i,"https://cdn.statically.io/gh/$2"],[/^(esm.run:)(.+)/i,"https://esm.run/$2"],[/^(esm.sh:)(.+)/i,"https://esm.sh/$2"],[/^(esbuild:)(.+)/i,"https://esbuild.vercel.app/$2"],[/^(bundle.run:)(.+)/i,"https://bundle.run/$2"],[/^(unpkg:)(.+)/i,"https://unpkg.com/$2"],[/^(bundlejs:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(bundle:)(.+)/i,"https://deno.bundlejs.com/?file&q=$2"],[/^(deno:)(.+)/i,"https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],[/^(https:\/\/deno\.land\/.+)/i,"https://deno.bundlejs.com/?file&q=$1"],[/^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,"https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"],[/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"],[/^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,"https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"],[/^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,"https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"],[/^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,"https://bb.githack.com/!api/2.0/snippets/$2/files/$3"],[/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i,"https://gist.githack.com/$2"],[/^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,"https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"]];var{getUrl:j,getModuleUrl:i0}=De,A=j("@live-codes/browser-compilers@0.7.4/dist/");var kp=j("art-template@4.13.2/lib/template-web.js"),Tp=j("@asciidoctor/core@2.2.6/dist/browser/asciidoctor.js"),Cp=j("@assemblyscript/loader@0.27.5/umd/index.js");var jp=j("@hatemhosny/astro-internal@0.0.4/");var Mp=j("@babel/standalone@7.22.4/babel.js"),Up=j("biwascheme@0.8.0/release/biwascheme.js");var Ui=j("brython@3.11.2/"),Ap=i0("chai@4.3.6");var rn=j("cherry-cljs@0.0.4/");var Ai=j("@live-codes/clio-browser-compiler@0.0.3/public/build/"),Pp=j("coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js");var Op=j("dot@1.1.3/doT.js"),qp=j("ejs@3.1.9/ejs.js");var Rp="es-module-shims@1.4.4/dist/es-module-shims.js",Ip=j("eta@2.2.0/dist/eta.umd.js");var Hp=j("@fontsource/anonymous-pro@4.5.9/index.css"),Bp=j("@fontsource/cascadia-code@4.2.1/index.css"),Dp=j("https://fonts.cdnfonts.com/css/code-new-roman-2"),Np=j("comic-mono@0.0.1/index.css"),$p=j("@fontsource/courier-prime@4.5.9/index.css"),Fp=j("https://fonts.cdnfonts.com/css/dec-terminal-modern"),zp=j("@fontsource/dejavu-mono@4.5.4/index.css"),Wp=j("@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono.css"),Gp=j("firacode@6.2.0/distr/fira_code.css"),Jp=j("https://fonts.cdnfonts.com/css/fixedsys-62"),Vp=j("hack-font@3.3.0/build/web/hack.css"),Kp=j("typeface-hermit@0.0.44/index.css"),Xp=j("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap"),Yp=j("https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"),Qp=j("@fontsource/iosevka@4.5.4/index.css"),Zp=j("@fontsource/jetbrains-mono@4.5.11/index.css"),eu=j("https://fonts.cdnfonts.com/css/menlo"),tu=j("https://fonts.cdnfonts.com/css/monofur"),su=j("@typopro/web-monoid@3.7.5/TypoPRO-Monoid.css"),ru=j("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap"),nu=j("https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap"),iu=j("@fontsource/opendyslexic@4.5.4/index.css"),ou=j("https://fonts.cdnfonts.com/css/profontwindows"),au=j("@fontsource/roboto-mono@4.5.8/index.css"),lu=j("https://fonts.cdnfonts.com/css/sf-mono"),cu=j("@fontsource/source-code-pro@4.5.12/index.css"),pu=j("@fontsource/space-mono@4.5.10/index.css"),uu=j("https://fonts.cdnfonts.com/css/sudo-var"),du=j("@fontsource/ubuntu-mono@4.5.11/index.css"),mu=j("victormono@1.5.4/dist/index.css"),fu=j("fscreen@1.2.0/dist/fscreen.esm.js");var nn=j("@live-codes/go2js@0.4.0/build/");var Pi=j("handlebars@4.7.7/dist/");var hu=j("hint.css@2.7.0/hint.css");var Oi=j("imba@2.0.0-alpha.229/dist/"),gu=j("jest-lite@1.0.0-alpha.4/dist/core.js");var _u=j("gh:jscl-project/jscl-project.github.io@efd3aecdba496d132ed650b7b5be976fd0ca278f/jscl.js");var yu=j("liquidjs@10.8.2/dist/liquid.browser.min.js"),vu=j("localforage@1.10.0/dist/localforage.js"),Ut=j("fengari-web@0.1.4/dist/fengari-web.js"),bu=j("luna-object-viewer@0.2.0/luna-object-viewer.css"),wu=j("luna-console@0.2.1/luna-console.css"),qi="0.6.64",DA=j(`malinajs@${qi}/malina.js`),xu=j("marked@5.0.4/marked.min.js");var Su=j("mjml-browser@4.14.1/lib/index.js");var Lu=j("mustache@4.2.0/mustache.js");var Eu=j("normalize.css@8.0.1/normalize.css"),Ri=j("nunjucks@3.2.4/browser/"),Qs=j("https://cdn.opalrb.com/opal/1.7.3/"),ku=j("parinfer@3.13.1/parinfer.js");var Tu=j("@live-codes/postcss-import-url@0.1.2/dist/postcss-import-url.js"),Zt=j("prettier@2.5.1/"),Cu=j("@prettier/plugin-php@0.18.0/standalone.js");var ju=j("requirejs@2.3.6/require.js");var Mu=j("reset-css@5.0.1/reset.css"),Ii=j("riot@7.1.0/"),Uu=j("@snackbar/core@1.7.0/dist/snackbar.css"),Au=j("spacingjs@1.0.7/dist/bundle.js"),Pu=j("sql-formatter@12.2.1/dist/sql-formatter.min.js"),Ou=j("sql.js@1.8.0/dist/"),qu=j("@stencil/core@3.2.2/compiler/stencil.js"),Ru=j("stylis@4.2.0/dist/umd/stylis.js");var Iu=j("@mhsdesign/jit-browser-tailwindcss@0.3.0/dist/cdn.min.js"),Ze=j("tau-prolog@0.3.4/modules/");var Hu=j("twig@1.16.0/twig.min.js"),Bu=j("typescript@5.1.3/lib/typescript.js"),Du=j("uniter@2.18.0/dist/uniter.js");var Hi=j("vue@3"),Bi=j("vue@2"),on=j("vue3-sfc-loader@0.8.4/dist/"),Nu=j("wabt@1.0.32/index.js");var $u={name:"lightningcss",title:"Lightning CSS",isPostcssPlugin:!1,compiler:{url:A+"lightningcss/lightningcss.js",factory:(e,t)=>(self.importScripts(t+"processor-lightningcss-compiler.c9a8575d1089c28538780ba5ba130cb2.js"),self.createLightningcssCompiler())},editor:"style"};var Fu={name:"postcss",title:"Processors:",isPostcssPlugin:!1,compiler:{url:A+"postcss/postcss.js",factory:(e,t)=>(self.importScripts(t+"processor-postcss-compiler.f8787bd5395ada95f6d40279daf71948.js"),self.createPostcssCompiler())},editor:"style",hidden:!0};var zu={name:"autoprefixer",title:"Autoprefixer",isPostcssPlugin:!0,compiler:{url:A+"autoprefixer/autoprefixer.js",factory:e=>self.autoprefixer.autoprefixer({...D("autoprefixer",e)})},editor:"style"},Wu={name:"cssnano",title:"cssnano",isPostcssPlugin:!0,compiler:{url:A+"cssnano/cssnano.js",factory:()=>{let e=self.cssnano.cssnanoPresetDefault().plugins,t=[];for(let s of e){let[r,n]=s;(typeof n>"u"||typeof n=="object"&&!n.exclude||typeof n=="boolean"&&n===!0)&&t.push(r(n))}return t}},editor:"style"},Gu={name:"postcssImportUrl",title:"Import Url",isPostcssPlugin:!0,compiler:{url:Tu,factory:e=>self.postcssImportUrl({...D("postcssImportUrl",e)})},editor:"style"},Ju={name:"postcssPresetEnv",title:"Preset Env",isPostcssPlugin:!0,compiler:{url:A+"postcss-preset-env/postcss-preset-env.js",factory:e=>self.postcssPresetEnv.postcssPresetEnv({autoprefixer:!1,...D("postcssPresetEnv",e)})},editor:"style"},Vu={name:"purgecss",title:"PurgeCSS",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:A+"purgecss/purgecss.js",factory:(e,t,s)=>self.purgecss.purgecss({...D("purgecss",e),content:[{raw:`<template>${s.html}
<script>${e.script.content}<\/script></template>`,extension:"html"}]})},editor:"style"},Ku={name:"tokencss",title:"Token CSS",isPostcssPlugin:!0,compiler:{url:A+"tokencss/tokencss.js",factory:e=>{let t=D("tokencss",e);Object.keys(t).length===0&&(t.$schema="https://tokencss.com/schema@0.0.1",t.extends="@tokencss/core/preset");let s=(n,i)=>{let o=JSON.parse(JSON.stringify(n));return Object.keys(i).forEach(a=>{o[a]=typeof i[a]!="object"||Array.isArray(i[a])?i[a]:{...o[a],...i[a]}}),o},r=t.extends?.includes("@tokencss/core/preset")?s(self.tokencss.preset,t):t;return self.tokencss.tokencss({config:r})}},editor:"style"},Xu={name:"cssmodules",title:"CSS Modules",isPostcssPlugin:!0,needsHTML:!0,compiler:{url:A+"postcss-modules/postcss-modules.js",factory:(e,t,s)=>{let r=D("cssmodules",e);return self.postcssModules.postcssModules({localsConvention:"camelCase",...r,getJSON(n,i,o){let a=r.addClassesToHTML!==!1,l=r.removeOriginalClasses===!0;a&&(s.html=self.postcssModules.addClassesToHtml(s.html,i,l)),s.compileInfo={...s.compileInfo,cssModules:i,...a?{modifiedHTML:s.html}:{}}}})}},editor:"style"};var Yu={name:"tailwindcss",title:"Tailwind CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:Iu,factory:(e,t)=>(self.importScripts(t+"processor-tailwindcss-compiler.4e4e1e62107a607ca6b8b776830640ee.js"),self.createTailwindcssCompiler())},editor:"style"};var Qu={name:"unocss",title:"UnoCSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:A+"unocss/unocss.js",factory:(e,t)=>(self.importScripts(t+"processor-unocss-compiler.aabd93b3d26601936d1f5a0f0c4f7c00.js"),self.createUnocssCompiler())},editor:"style"};var Zu={name:"windicss",title:"Windi CSS",isPostcssPlugin:!1,needsHTML:!0,compiler:{url:A+"windicss/windicss.js",factory:(e,t)=>(self.importScripts(t+"processor-windicss-compiler.2c60d8a9c198f1d4b94016ef99f81429.js"),self.createWindicssCompiler())},editor:"style"};var Ne=[Yu,Zu,Qu,Ku,Vu,Gu,zu,Ju,$u,Wu,Xu,Fu];var Q=(e="")=>{if(!e)return;let t=e?.toLowerCase();return Me.find(s=>s.name===t||s.title.toLowerCase()===t||s.extensions.map(r=>r.toLowerCase()).includes(t))?.name},ed=e=>{let t=Me.find(s=>s.name===e);return t?.longTitle||t?.title||e.toUpperCase()},oe=(e="")=>Me.find(t=>t.name===Q(e))?.editor,At=(e="")=>Me.find(t=>t.name===Q(e))?.extensions[0],Zs=(e="")=>Me.find(t=>t.name===Q(e)),et=(e="")=>{let s=Zs(e)?.compiler;return typeof s=="string"&&(s=et(s)),s},Pt=e=>Zs(e)?.editorLanguage||e,$e=(e,t)=>{let s=Q(e);return s?t.languages?t.languages?.map(Q).filter(Boolean).includes(s):!0:!1},es=(e,t)=>Ne.map(s=>s.name).includes(e)?t.languages?t.languages.includes(e):!0:!1,Di=(e,t)=>t.processors.includes(e),td=(e,t)=>{let s=oe(e);return s?Ne.filter(r=>r.editor===s).map(r=>r.name).filter(r=>es(r,t)).filter(r=>Di(r,t)).join("-"):""};var Ni=(e,t)=>{let s={...D(e,t)};return oe(e)==="markup"&&(s.template=t.customSettings.template),s};var sd={name:"asciidoc",title:"AsciiDoc",compiler:{url:Tp,factory:()=>{let e=window.Asciidoctor();return async(t,{config:s})=>e.convert(t,{...D("asciidoc",s)})}},extensions:["adoc","asciidoc","asc"],editor:"markup"};var M2=Zt+"standalone.js",k={babel:Zt+"parser-babel.js",glimmer:Zt+"parser-glimmer.js",html:Zt+"parser-html.js",markdown:Zt+"parser-markdown.js",postcss:Zt+"parser-postcss.js",php:Cu,pug:A+"prettier/parser-pug.js"};var rd={name:"babel",title:"Babel",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{url:Mp,factory:()=>async(e,{config:t})=>window.Babel.transform(e,{filename:"script.tsx",presets:[["env",{modules:!1}],"typescript","react"],...D("babel",t)}).code},extensions:["es","babel"],editor:"script",editorLanguage:"typescript"};var nd={name:"css",title:"CSS",info:!1,parser:{name:"css",pluginUrls:[k.postcss]},compiler:{factory:()=>async e=>e},extensions:["css"],editor:"style"};var id={name:"haml",title:"Haml",compiler:{url:A+"clientside-haml-js/haml.js",factory:(e,t)=>(self.importScripts(t+"lang-haml-compiler.8e0f4fea3a8fefc8259ca8d6f0768a72.js"),self.createHamlCompiler())},extensions:["haml"],editor:"markup"};var od={name:"html",title:"HTML",info:!1,parser:{name:"html",pluginUrls:[k.html]},compiler:{factory:()=>async e=>e},extensions:["html","htm"],editor:"markup"};var ad={name:"javascript",title:"JS",longTitle:"JavaScript",info:!1,parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{factory:()=>async e=>e},extensions:["js"],editor:"script"};var ld={name:"jsx",title:"JSX",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:"typescript",extensions:["jsx"],editor:"script",editorLanguage:"javascript"};var cd={name:"tsx",title:"TSX",parser:{name:"babel-ts",pluginUrls:[k.babel,k.html]},compiler:"typescript",extensions:["tsx"],editor:"script",editorLanguage:"typescript"};var pd={name:"less",title:"Less",parser:{name:"less",pluginUrls:[k.postcss]},compiler:{url:A+"less/less.js",factory:()=>async(e,{config:t})=>(await window.less.render(e,{...D("less",t)})).css},extensions:["less"],editor:"style"};var ud={name:"markdown",title:"Markdown",parser:{name:"markdown",pluginUrls:[k.markdown,k.html]},compiler:{url:xu,factory:()=>async(e,{config:t})=>window.marked.parse(e,{headerIds:!1,mangle:!1,...D("markdown",t)})},extensions:["md","markdown","mdown","mkdn"],editor:"markup"};var er=async(e,t,s,r={},n=self)=>new Promise(i=>{if(!e||!t||!s)return i(e||"");let o=async function(a){let l=a.data.payload;a.data.trigger==="compileInCompiler"&&l?.content===e&&l?.language===t&&(n.removeEventListener("message",o),i(l.compiled))};n.addEventListener("message",o),n.postMessage({type:"compileInCompiler",payload:{content:e,language:t,config:s,options:r}})});var o0=async(e,{config:t,worker:s})=>new Promise(async r=>{if(!e)return r("");let[n,{default:i}]=await Promise.all([import(A+"mdx/mdx.js"),import(A+"remark-gfm/remark-gfm.js")]),o=(await n.compile(e,{remarkPlugins:[i],...D("mdx",t)})).value,l=(m=>m.replace(/, {[^}]*} = _components/g,"").replace(/const {[^:]*} = props.components[^;]*;/g,""))(o),c=`import React from "react";
import { createRoot } from "react-dom/client";
${Xt(l,!1)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`,p=await er(c,"jsx",t,{},s);r(`<div id="__livecodes_mdx_root__"></div><script type="module">${p}<\/script>`)}),dd={name:"mdx",title:"MDX",parser:{name:"markdown",pluginUrls:[k.markdown,k.html]},compiler:{factory:()=>async e=>e,runOutsideWorker:o0,compiledCodeLanguage:"javascript"},extensions:["mdx"],editor:"markup",editorLanguage:"markdown"};var md={name:"pug",title:"Pug",parser:{name:"pug",pluginUrls:[k.pug]},compiler:{url:A+"pug/pug.min.js",factory:(e,t)=>(self.importScripts(t+"lang-pug-compiler.6b93c9c73ccadec5e38caa8ec77d3900.js"),self.createPugCompiler())},extensions:["pug","jade"],editor:"markup"};var fd={name:"scss",title:"SCSS",parser:{name:"scss",pluginUrls:[k.postcss]},compiler:{url:A+"sass/sass.js",factory:(e,t)=>(self.importScripts(t+"lang-scss-compiler.712bd4672051205ef090643fa8dd8b68.js"),self.createScssCompiler())},extensions:["scss"],editor:"style"};var hd={name:"sass",title:"Sass",compiler:"scss",extensions:["sass"],editor:"style"};var gd={name:"svelte",title:"Svelte",parser:{name:"html",pluginUrls:[k.html,k.babel]},compiler:{url:A+"svelte/svelte-compiler.min.js",factory:(e,t)=>(self.importScripts(t+"lang-svelte-compiler.069bfb65fda860a697774c930b5d091c.js"),self.createSvelteCompiler())},extensions:["svelte"],editor:"script",editorLanguage:"html"};var _d={name:"stylus",title:"Stylus",compiler:{url:A+"stylus/stylus.min.js",factory:()=>async e=>window.stylus.render(e)},extensions:["styl"],editor:"style"};var tr={target:"es2015",jsx:"react",allowUmdGlobalAccess:!0,esModuleInterop:!0},yd={name:"typescript",title:"TS",longTitle:"TypeScript",parser:{name:"babel-ts",pluginUrls:[k.babel,k.html]},compiler:{url:Bu,factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...tr,...D("typescript",t),...D(s,t)})},extensions:["ts","typescript"],editor:"script"};var a0=on+"vue3-sfc-loader.js",vd={name:"vue",title:"Vue 3",longTitle:"Vue 3 SFC",parser:{name:"html",pluginUrls:[k.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVueCompiler()),scripts:[Hi,a0],imports:{vue:Hi+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue","vue3"],editor:"script",editorLanguage:"html"};var l0=on+"vue2-sfc-loader.js",bd={name:"vue2",title:"Vue 2",longTitle:"Vue 2 SFC",parser:{name:"html",pluginUrls:[k.html]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-vue-compiler.ae464f78182b9d1542b3afcea1a2b206.js"),self.createVue2Compiler()),scripts:[Bi,l0],imports:{vue:Bi+"/dist/vue.runtime.esm-browser.prod.js"}},extensions:["vue2"],editor:"script",editorLanguage:"html"};var wd={name:"stencil",title:"Stencil",parser:{name:"babel-ts",pluginUrls:[k.babel,k.html]},compiler:{url:qu,factory:()=>async(e,{config:t})=>(await window.stencil.transpile(e,{sourceMap:!1,target:"es2019",...D("stencil",t)})).code,types:{"@stencil/core":{url:A+"types/stencil-core.d.ts",declareAsModule:!1}}},extensions:["stencil.tsx"],editor:"script",editorLanguage:"typescript"};var xd={name:"coffeescript",title:"Coffee",longTitle:"CoffeeScript",compiler:{url:Pp,factory:()=>async(e,{config:t})=>window.CoffeeScript.compile(e,{bare:!0,...D("coffeescript",t)})},extensions:["coffee"],editor:"script"};var Sd={name:"livescript",title:"LiveScript",compiler:{url:A+"livescript/livescript-min.js",factory:()=>async(e,{config:t})=>window.require("livescript").compile(e,{bare:!0,...D("livescript",t)}),scripts:[A+"livescript/prelude-browser-min.js"]},extensions:["ls"],editor:"script"};var c0=A+"assemblyscript/assemblyscript.js",Ld={name:"assemblyscript",title:"AS",longTitle:"AssemblyScript",parser:{name:"babel-ts",pluginUrls:[k.babel]},compiler:{url:c0,factory:(e,t)=>(self.importScripts(t+"lang-assemblyscript-compiler.8caa06a4a75b2f2d32150d1c4cd03b95.js"),self.createAssemblyscriptCompiler()),scripts:({baseUrl:e})=>[Cp,e+"lang-assemblyscript-script.a8afe51d73d1fa349c7874dce9f2108f.js"],scriptType:"application/wasm-uint8",compiledCodeLanguage:"wat",types:{assemblyscript:{url:A+"types/assemblyscript.d.ts",declareAsModule:!1,autoload:!0}}},extensions:["as","ts"],editor:"script",editorLanguage:"typescript"};var p0=Ui+"brython.min.js",u0=Ui+"brython_stdlib.js",Ed={name:"python",title:"Python",compiler:{factory:()=>async e=>e,scripts:({compiled:e,config:t})=>{let{autoloadStdlib:s,...r}=D("python",t),n=/^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm,i=s!==!1&&e.match(n)?[u0]:[],o=`window.addEventListener("load", () => {brython(${JSON.stringify(r)})})`,a="data:text/plain;base64,"+btoa(o);return[p0,...i,a]},scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py"],editor:"script"};var d0=(e,t={})=>Array.from(new Set([...e.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map(s=>s[1]).map(s=>s.split("/")[0]).filter(s=>t.hasOwnProperty(s)||s!=="opal").map(s=>t[s]||`${Qs+s}.min.js`))),kd={name:"ruby",title:"Ruby",compiler:{url:Qs+"opal.min.js",factory:()=>(importScripts(Qs+"opal-parser.min.js"),self.Opal.config.unsupported_features_severity="ignore",self.Opal.load("opal-parser"),async(e,{config:t})=>{let{autoloadStdlib:s,requireMap:r,...n}=D("ruby",t);return self.Opal.compile(e,n)}),scripts:({compiled:e,config:t})=>{let{autoloadStdlib:s,requireMap:r}=D("ruby",t),n=d0(e,r),i=s!==!1?n:[];return[Qs+"opal.min.js",...i]}},extensions:["rb"],editor:"script"};var Td={name:"php",title:"PHP",parser:{name:"php",pluginUrls:[k.php]},compiler:{factory:()=>async e=>(e=e.trim(),e.startsWith("<?php")&&(e=e.replace("<?php","/* <?php */"),e.endsWith("?>")&&(e=e.replace("?>","/* ?> */"))),e),scripts:[Du],deferScripts:!0,scriptType:"text/x-uniter-php",compiledCodeLanguage:"php"},extensions:["php"],editor:"script"};var Cd={name:"perl",title:"Perl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[A+"perlito/perlito5.min.js",e+"lang-perl-script.1f606d886aeb724510a595d45cbaf555.js"],scriptType:"text/perl"},extensions:["pl","pm"],editor:"script"};var m0=A+"lua-fmt/lua-fmt.js",$i={factory:()=>(self.importScripts(m0),async(e,t)=>({formatted:self.luaFmt.formatText(e),cursorOffset:t}))},jd={name:"lua",title:"Lua",formatter:$i,compiler:{factory:()=>async e=>e,scripts:[Ut],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["lua"],editor:"script"};var ts=()=>{let e=ku;return self.importScripts(e),async t=>({formatted:window.parinfer.parenMode(t).text,cursorOffset:0})},Md={name:"commonlisp",title:"Lisp",longTitle:"Common Lisp",formatter:{factory:ts},compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[_u,e+"lang-commonlisp-script.0c86dfce5f8509928ccf51ff666c7b4b.js"],scriptType:"text/commonlisp",compiledCodeLanguage:"commonlisp",inlineScript:`

    `},extensions:["lisp","common-lisp"],editor:"script",editorLanguage:"scheme"};var Ud={name:"scheme",title:"Scheme",formatter:{factory:ts},compiler:{factory:()=>async e=>e,scripts:[Up],scriptType:"text/biwascheme",compiledCodeLanguage:"scheme"},extensions:["scm"],editor:"script"};var Ad={name:"solid",title:"Solid",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{dependencies:["babel"],url:A+"babel-preset-solid/babel-preset-solid.js",factory:(e,t)=>(self.importScripts(t+"lang-solid-compiler.4edfa4ed39f071836693c79f40f0d9b6.js"),self.createSolidCompiler()),types:{"solid-js":{url:A+"types/solid-js.d.ts",declareAsModule:!1}}},extensions:["solid.jsx"],editor:"script",editorLanguage:"javascript"};var Pd={name:"solid.tsx",title:"Solid (TS)",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:"solid",extensions:["solid.tsx"],editor:"script",editorLanguage:"typescript"};var Od={name:"pyodide",title:"Pyodide",longTitle:"Python (Pyodide)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-python-pyodide-script.d8d4d32ed97521be2e4e35536f468333.js"],liveReload:!0,scriptType:"text/python",compiledCodeLanguage:"python"},extensions:["py3"],editor:"script",editorLanguage:"python",largeDownload:!0};var qd={name:"liquid",title:"Liquid",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:yu,factory:(e,t)=>(self.importScripts(t+"lang-liquid-compiler.a8cb47f76c1808bdc02fcae94ff8025f.js"),self.createLiquidCompiler())},extensions:["liquid","liquidjs"],editor:"markup",editorLanguage:"html"};var Rd={name:"ejs",title:"EJS",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:qp,factory:(e,t)=>(self.importScripts(t+"lang-ejs-compiler.1f9bfcb931f9f068dbdca2155fde7947.js"),self.createEjsCompiler())},extensions:["ejs"],editor:"markup",editorLanguage:"html"};var f0=Pi+"handlebars.min.js",Uq=Pi+"handlebars.runtime.min.js",Id={name:"handlebars",title:"Handlebars",parser:{name:"glimmer",pluginUrls:[k.glimmer]},compiler:{url:f0,factory:(e,t)=>(self.importScripts(t+"lang-handlebars-compiler.be7818c60da12a1729c425a770910e92.js"),self.createHandlebarsCompiler())},extensions:["hbs","handlebars"],editor:"markup",editorLanguage:"html"};var Hd={name:"dot",title:"doT",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Op,factory:(e,t)=>(self.importScripts(t+"lang-dot-compiler.557d6ca7c515de1e84f17c4842ec71cd.js"),self.createDotCompiler())},extensions:["dot"],editor:"markup",editorLanguage:"html"};var h0=Ri+"nunjucks.min.js",$q=Ri+"nunjucks-slim.min.js",Bd={name:"nunjucks",title:"Nunjucks",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:h0,factory:(e,t)=>(self.importScripts(t+"lang-nunjucks-compiler.055d011de44eb181acbea8b1a49a7ce2.js"),self.createNunjucksCompiler())},extensions:["njk","nunjucks"],editor:"markup",editorLanguage:"html"};var Dd={name:"go",title:"Go",formatter:{factory:()=>(importScripts(nn+"go2js-format.js"),async e=>{if(!e)return{formatted:"",cursorOffset:0};let[t,s]=globalThis.go2jsFormat(e);return s?(console.error(s),{formatted:e,cursorOffset:0}):{formatted:t,cursorOffset:0}})},compiler:{url:nn+"go2js-compile.js",factory:()=>e=>new Promise(t=>{if(!e){t("");return}globalThis.go2jsCompile(e,nn,(s,r)=>{s?(console.error(s),t("")):t(r)})})},extensions:["go","golang"],editor:"script"};var g0=async(e,{baseUrl:t,language:s})=>{let{rescriptCompiler:r}=await import(t+"lang-rescript-compiler-esm.2b9d0781c004e55c6bc74ba441a3e29e.js");return r(e,{baseUrl:t,language:s})},Fi=(e,t)=>(importScripts(e+"lang-rescript-formatter.187ba934d1c84704a2717e3cf411e618.js"),self.createRescriptFormatter(e,t)),Nd={name:"rescript",title:"ReScript",formatter:{factory:Fi},compiler:{factory:()=>async e=>e,runOutsideWorker:g0,scriptType:"module"},extensions:["res","resi"],editor:"script",editorLanguage:"javascript"};var $d={name:"reason",title:"Reason",formatter:{factory:Fi},compiler:"rescript",extensions:["re","rei"],editor:"script",editorLanguage:"javascript"};var Fd={name:"ocaml",title:"OCaml",compiler:"rescript",extensions:["ml","mli"],editor:"script",editorLanguage:"javascript"};var _0=A+"wast-refmt/wast-refmt.js",y0="application/wasm-uint8",zd={name:"wat",title:"WAT",longTitle:"WebAssembly Text",formatter:{factory:()=>(importScripts(_0),async e=>{let t=e;try{t=self.wastRefmt.format(e)}catch(s){console.warn("failed parsing WAT",s)}return{formatted:t,cursorOffset:0}})},compiler:{url:Nu,factory:(e,t)=>(self.importScripts(t+"lang-wat-compiler.eea1bd41c9dee36246a40e3aed8394fd.js"),self.createWatCompiler()),scripts:({baseUrl:e})=>[e+"lang-wat-script.29d1634ac55c93301ce5fe2a25906bd0.js"],scriptType:y0,compiledCodeLanguage:"Binary"},extensions:["wat","wast","webassembly","wasm"],editor:"script"};var v0=Ii+"riot+compiler.min.js",b0=Ii+"riot.min.js",Wd={name:"riot",title:"Riot.js",parser:{name:"html",pluginUrls:[k.html,k.babel]},compiler:{url:v0,factory:(e,t)=>(self.importScripts(t+"lang-riot-compiler.1f8f0884684f258ddc3c50c8094e7e2a.js"),self.createRiotCompiler()),scripts:[b0],scriptType:"module"},extensions:["riot","riotjs"],editor:"script",editorLanguage:"html"};var w0="application/json",Gd={name:"sql",title:"SQL",formatter:{factory:()=>(importScripts(Pu),async e=>({formatted:await self.sqlFormatter.format(e,{linesBetweenQueries:2}),cursorOffset:0}))},compiler:{url:Ou+"sql-wasm.js",factory:(e,t)=>(self.importScripts(t+"lang-sql-compiler.fa10aaaaf82d9d6a8cc8ebce5c63c3bc.js"),self.createSqlCompiler()),scripts:({baseUrl:e})=>[e+"lang-sql-script.0c35ad4ef2960bb91f816273b91f6c33.js"],scriptType:w0,compiledCodeLanguage:"json"},extensions:["sql","sqlite","sqlite3"],editor:"script"};var sr=A+"react-native-web/react-native-web.js",Jd={name:"react-native",title:"RN",longTitle:"React Native",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...tr,...D("typescript",t),...D(s,t)}),imports:{react:sr,"react-native":sr}},extensions:["react-native.jsx"],editor:"script",editorLanguage:"javascript"};var Vd={name:"react-native-tsx",title:"RN (TSX)",longTitle:"React Native (TSX)",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{dependencies:["typescript"],factory:()=>async(e,{config:t,language:s})=>window.ts.transpile(e,{...tr,...D("typescript",t),...D(s,t)}),imports:{react:sr,"react-native":sr}},extensions:["react-native.tsx"],editor:"script",editorLanguage:"typescript"};var Kd={name:"blockly",title:"Blockly",compiler:{factory:()=>async(e,{options:t})=>t?.blockly?.js||""},extensions:["blockly.xml","xml"],editor:"script",editorLanguage:"xml"};var Xd={name:"twig",title:"Twig",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Hu,factory:(e,t)=>(self.importScripts(t+"lang-twig-compiler.39e618d8e11e20b2f85ea15294864c17.js"),self.createTwigCompiler())},extensions:["twig"],editor:"markup",editorLanguage:"html"};var x0=jp+"compiler.min.js",Yd={name:"astro",title:"Astro",parser:{name:"html",pluginUrls:[k.html,k.babel]},compiler:{url:x0,factory:(e,t)=>(self.importScripts(t+"lang-astro-compiler.8407bb9d7fa8feeae708ab9b6cd12739.js"),self.createAstroCompiler())},extensions:["astro"],editor:"markup"};var Qd={name:"malina",title:"Malina.js",parser:{name:"html",pluginUrls:[k.html,k.babel]},compiler:{factory:(e,t)=>(self.importScripts(t+"lang-malina-compiler.a0adf0552670bef0d7989fd7b78dfbb3.js"),self.createMalinaCompiler()),imports:{"malinajs/runtime.js":`https://jspm.dev/malinajs@${qi}/runtime.js`}},extensions:["xht"],editor:"script",editorLanguage:"html"};var S0=A+"jscpp/JSCPP.es5.min.js",Zd={name:"cpp",title:"C++",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[S0,e+"lang-cpp-script.1baeb187434ba3ed6b23b718933338ad.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp"},extensions:["cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script"};var em={name:"julia",title:"Julia",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-julia-script.fe987901a797bc777c685f0daf4357d5.js"],liveReload:!0,scriptType:"text/julia",compiledCodeLanguage:"julia"},extensions:["jl"],editor:"script",largeDownload:!0};var tm={name:"clang",title:"Clang",longTitle:"C/C++ (Clang)",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-cpp-clang-script.4816be0f52e578d04c317645169dc4cb.js"],scriptType:"text/cpp",compiledCodeLanguage:"cpp",liveReload:!0},extensions:["clang.cpp","clang","cpp","c","C","cp","cxx","c++","cppm","ixx","ii","hpp","h"],editor:"script",editorLanguage:"cpp",largeDownload:!0};var sm={name:"tcl",title:"Tcl",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[ju,e+"lang-tcl-script.3f6a624f992c65a3fd69f999e53fcbd7.js"],scriptType:"text/tcl",compiledCodeLanguage:"tcl"},extensions:["tcl"],editor:"script"};var rm={name:"prolog",title:"Prolog",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[Ze+"core.js",Ze+"charsio.js",Ze+"dom.js",Ze+"format.js",Ze+"js.js",Ze+"lists.js",Ze+"os.js",Ze+"promises.js",Ze+"random.js",Ze+"statistics.js",e+"lang-prolog-script.2780539e5f2bc8edb4aedd5cf57143e7.js"],scriptType:"text/prolog",compiledCodeLanguage:"prolog"},extensions:["prolog.pl","prolog"],editor:"script"};var nm={name:"clio",title:"Clio",compiler:{url:Ai+"compile.js",factory:(e,t)=>(self.importScripts(t+"lang-clio-compiler.75c879c608b8073530c584f64896740a.js"),self.createClioCompiler()),scripts:[Ai+"exec.js"]},extensions:["clio"],editor:"script",editorLanguage:"coffeescript"};var im={name:"richtext",title:"Rich Text",longTitle:"Rich Text Editor",compiler:{factory:()=>async(e,{config:t})=>t.markup.content||"",styles:["quill.8e9d74c74d2c8aaa5d849678c215cf7e.css"]},extensions:["rte","rte.html","rich"],editor:"markup",editorLanguage:"html"};var L0=async(e,{baseUrl:t,config:s})=>{let{diagramsCompiler:r}=await import(t+"lang-diagrams-compiler-esm.468dd2b25c78af5f2902eb20a4571be5.js");return r(e,{config:s})},om={name:"diagrams",title:"Diagrams",parser:{name:"html",pluginUrls:[k.html]},compiler:{factory:()=>async e=>e||"",runOutsideWorker:L0},extensions:["diagrams","diagram","graph","plt"],editor:"markup",editorLanguage:"html"};var am={name:"imba",title:"Imba",compiler:{url:Oi+"compiler.js",factory:(e,t)=>(self.importScripts(t+"lang-imba-compiler.4f3b1e55a23cb0384355b5dca2ab42bf.js"),self.createImbaCompiler()),imports:{imba:Oi+"imba.mjs"}},extensions:["imba"],editor:"script"};var lm={name:"mustache",title:"Mustache",parser:{name:"glimmer",pluginUrls:[k.glimmer]},compiler:{url:Lu,factory:(e,t)=>(self.importScripts(t+"lang-mustache-compiler.93b843bf816add490577db24db6270c6.js"),self.createMustacheCompiler())},extensions:["mustache"],editor:"markup",editorLanguage:"html"};var cm={name:"art-template",title:"art",longTitle:"art-template",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:kp,factory:(e,t)=>(self.importScripts(t+"lang-art-template-compiler.4716dcf439c98cecc6d924d76392deb3.js"),self.createArtTemplateCompiler())},extensions:["art","art-template"],editor:"markup",editorLanguage:"html"};var pm={name:"r",title:"R",compiler:{factory:()=>async e=>e,scripts:({baseUrl:e})=>[e+"lang-r-script-esm.42cba088ad6175ae88305ac37d440eae.js"],inlineScript:`
    livecodes.r = livecodes.r || {config: {}};
    addEventListener('load', async () => {
      await livecodes.r.loaded;
      if (livecodes.r.config?.autoEvaluate !== false) {
        await livecodes.r.run();
      }
      // reset config before next load
      livecodes.r.config = {};
    });
    `,liveReload:!0,scriptType:"text/r",compiledCodeLanguage:"r"},extensions:["r","rlang","rstats"],editor:"script",largeDownload:!0};var E0=A+"civet/civet.js",um={name:"civet",title:"Civet",compiler:{url:E0,factory:()=>async e=>window.civet.compile(e,{js:!0})},extensions:["civet"],editor:"script",editorLanguage:"coffeescript"};var dm={name:"fennel",title:"Fennel",formatter:{factory:ts},compiler:{url:Ut,factory:(e,t)=>(self.importScripts(t+"lang-fennel-compiler.1f24a9823f590b00c793a67b29f61e83.js"),self.createFennelCompiler()),scripts:[Ut],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["fnl"],editor:"script",editorLanguage:"scheme"};var mm={name:"teal",title:"Teal",formatter:$i,compiler:{url:Ut,factory:(e,t)=>(self.importScripts(t+"lang-teal-compiler.1a0bb35b51557f740f6379336bc5a8e1.js"),self.createTealCompiler()),scripts:[Ut],scriptType:"application/lua",compiledCodeLanguage:"lua"},extensions:["tl"],editor:"script",editorLanguage:"lua"};var fm={name:"stylis",title:"Stylis",compiler:{url:Ru,factory:()=>async e=>{let{compile:t,serialize:s,stringify:r,middleware:n,prefixer:i}=window.stylis;return s(t(e),n([i,r]))}},extensions:["stylis"],editor:"style",editorLanguage:"scss"};var hm={name:"flow",title:"Flow",parser:{name:"babel-flow",pluginUrls:[k.babel,k.html]},compiler:{url:A+"flow-remove-types/flow-remove-types.js",factory:()=>async(e,{config:t})=>window.flowRemoveTypes.transpile(e,{all:!0,...D("flow",t)}).toString()},extensions:["flow"],editor:"script",editorLanguage:"typescript"};var gm={name:"mjml",title:"MJML",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Su,factory:()=>async(e,{config:t})=>{if(!e.trim())return"";let{html:s,errors:r}=self.mjml(e,D("mjml",t));return r?.forEach(n=>{console.warn(n.formattedMessage)}),s}},extensions:["mjml"],editor:"markup",editorLanguage:"xml"};var _m={name:"sucrase",title:"Sucrase",parser:{name:"babel",pluginUrls:[k.babel,k.html]},compiler:{url:A+"sucrase/sucrase.js",factory:()=>async(e,{config:t})=>window.sucrase.transform(e,{transforms:["jsx","typescript"],...D("sucrase",t)}).code},extensions:["sucrase"],editor:"script",editorLanguage:"typescript"};var ym={name:"eta",title:"Eta",parser:{name:"html",pluginUrls:[k.html]},compiler:{url:Ip,factory:(e,t)=>(self.importScripts(t+"lang-eta-compiler.ad84b8336e66949b7ecb9ad4f792e059.js"),self.createEtaCompiler())},extensions:["eta"],editor:"markup",editorLanguage:"html"};var an=(e,t,s)=>e.filter(r=>Ne.includes(r)||$e(r.name,t)).reduce((r,n)=>{if(n.compiler&&!r[n.name])if(typeof n.compiler=="string"){let i=e.find(o=>o.name===n.compiler)?.compiler;r[n.name]={...i,url:vm(i.url,s),aliasTo:n.compiler}}else r[n.name]={...n.compiler,url:vm(n.compiler.url,s)};return r},{}),vm=(e,t)=>e?xs(e)?t+e:e:"";var ss=(e=location.origin)=>!!(e&&(e.endsWith("livecodes.io")||e.endsWith("livecodes.pages.dev")||e.endsWith("localpen.io")||e.endsWith("localpen.pages.dev")||e.startsWith("http://127.0.0.1")||e.startsWith("http://localhost")));var bm=()=>{let e=[];return{addEventListener:(n,i,o,a)=>{n&&(n.addEventListener(i,o,a||!1),e.push({element:n,eventType:i,fn:o}))},removeEventListener:(n,i,o)=>{if(!n)return;n.removeEventListener(i,o);let a=e.find(l=>l.element===n&&l.eventType===i&&l.fn===o);a&&e.splice(e.indexOf(a))},removeEventListeners:()=>{e.forEach(n=>{n.element.removeEventListener(n.eventType,n.fn),e.splice(e.indexOf(n))})}}};var ze={getConfig:"livecodes-get-config",config:"livecodes-config",load:"livecodes-load",appLoaded:"livecodes-app-loaded",ready:"livecodes-ready",change:"livecodes-change",testResults:"livecodes-test-results",destroy:"livecodes-destroy",resizeEditor:"livecodes-resize-editor",apiResponse:"livecodes-api-response"};var ln=()=>{let e=[];return{subscribe:i=>(e.push(i),{unsubscribe:()=>{e.splice(e.indexOf(i),1)}}),notify:i=>{e.forEach(o=>{o(i)})},hasSubscribers:()=>e.length>0,unsubscribeAll:()=>{e.length=0}}};var zi={getList:async()=>[],getAllData:async()=>[],getItem:async()=>null,addItem:async()=>"",updateItem:async()=>"",deleteItem:async()=>{},bulkInsert:async()=>{},restore:async()=>{},clear:async()=>{},subscribe:()=>({unsubscribe:()=>{}}),unsubscribeAll:()=>{}},wm={getValue:()=>null,setValue:()=>{},clear:()=>{},subscribe:()=>({unsubscribe:()=>{}}),unsubscribeAll:()=>{}};var cn,xm="livecodes",Wi={},Gi=()=>(Date.now()+""+Math.floor(Math.floor(Math.random()*Date.now()))).substring(0,24),k0=async e=>{cn||(cn=await sn(vu,"localforage"),cn.config({name:xm})),Wi[e]||(Wi[e]=cn.createInstance({name:xm,storeName:e}))},St=async(e,t)=>{if(t)return zi;let s,r=ln(),n=b=>r.subscribe(b),i=()=>{r.unsubscribeAll()},o=()=>{r.hasSubscribers()&&c().then(b=>{r.notify(b)})},a=async()=>{await k0(e),s=Wi[e]},l=async()=>(await a(),s.keys()),c=async()=>{await a();let b=[];return await s.iterate(x=>{b.push(x)}),b.sort((x,w)=>w.lastModified&&x.lastModified?w.lastModified-x.lastModified:0)},p=async b=>(await a(),s.getItem(b)),m=async(b,x,w=!0)=>(await a(),await s.setItem(b,x),w&&o(),b),g=async(b,x=!0)=>{let w=Gi();return await m(w,b,x),w};return{getList:l,getAllData:c,getItem:p,addItem:b=>g(b),updateItem:(b,x)=>m(b,x),deleteItem:async b=>{await a(),await s.removeItem(b),o()},bulkInsert:async b=>{for(let x of b)await g(x,!1);o()},restore:async b=>{for(let x of b)x.id?await m(x.id,x,!1):await g(x,!1);o()},clear:async()=>{await a(),await s.clear(),o()},subscribe:n,unsubscribeAll:i}};var Ji=async(e,t)=>{let s=await St(e,t),r=async()=>(await s.getAllData()).map(a=>({id:a.id,title:a.config?.title||"",description:a.config?.description||"",tags:a.config?.tags||[],languages:a.config?[a.config.markup.language,a.config.style.language,a.config.script.language]:[],lastModified:a.lastModified})).sort((a,l)=>l.lastModified-a.lastModified),n=(a,l)=>{let c={id:a,config:l,lastModified:Date.now()};return s.updateItem(a,c)},i=async a=>{let l=Gi();return n(l,a)};return{...s,getList:r,addItem:i,updateItem:n,bulkInsert:async a=>{for(let l of a)await i(l)}}};var pn=(e,t)=>{if(t)return wm;let s=ln(),r=c=>s.subscribe(c),n=()=>{s.unsubscribeAll()},i=()=>{s.notify(a())},o=c=>{window.localStorage.setItem(e,JSON.stringify(c)),i()},a=()=>{let c=window.localStorage.getItem(e);if(!c)return null;try{return JSON.parse(c)}catch{return null}};return{getValue:a,setValue:o,clear:()=>{o(null),i()},subscribe:r,unsubscribeAll:n}};var Sm=()=>Mt({projects:null,templates:null,assets:null,snippets:null,recover:null,userConfig:null,userData:null,appData:null,sync:null}),Lm=async(e,t)=>{t||(e.projects=await Ji("__livecodes_data__",t),e.templates=await Ji("__livecodes_templates__",t),e.assets=await St("__livecodes_assets__",t),e.snippets=await St("__livecodes_snippets__",t),e.recover=pn("__livecodes_project_recover__",t),e.userConfig=pn("__livecodes_user_config__",t),e.userData=await St("__livecodes_user_data__",t),e.appData=pn("__livecodes_app_data__",t),e.sync=await St("__livecodes_sync_data__",t))};var Es=_p(km()),dn=Es.compressToEncodedURIComponent,Tm=(e,t=!0)=>{let s=(0,Es.decompressFromEncodedURIComponent)(e);if(s){if(!t)return s;try{if(JSON.parse(s))return s}catch{}}return(0,Es.decompressFromBase64)(e)};var mn,Cm=async()=>{mn=mn||await St("__livecodes_key__",!1)},T0=e=>new TextEncoder().encode(e),C0=e=>new TextDecoder().decode(e),j0=async e=>{await Cm(),await mn.updateItem("__livecodes_key_id__",dn(e))},M0=async()=>{await Cm();let e=await mn.getItem("__livecodes_key_id__");return e?Tm(e):null},U0=async()=>{let e=await window.crypto.subtle.generateKey({name:"RSA-OAEP",modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},!0,["encrypt","decrypt"]),t=await crypto.subtle.exportKey("jwk",e.publicKey),s=await crypto.subtle.exportKey("jwk",e.privateKey),r=JSON.stringify({public:t,private:s});return await j0(r),r},jm=async e=>crypto.subtle.importKey("jwk",JSON.parse(await M0()||await U0())[e],{name:"RSA-OAEP",hash:"SHA-256"},!0,e==="public"?["encrypt"]:["decrypt"]),Mm=async e=>{let t=T0(e),s=await jm("public"),r=await window.crypto.subtle.encrypt({name:"RSA-OAEP"},s,t);return JSON.stringify(Array.from(new Uint8Array(r)))},Um=async e=>{try{let t=await window.crypto.subtle.decrypt({name:"RSA-OAEP"},await jm("private"),new Uint8Array(JSON.parse(e)));return C0(t)}catch{return null}};var A0={load:async()=>{},getUser:async()=>{},signIn:async()=>{},signOut:async()=>{},isLoggedIn:()=>!1},Pm=e=>{if(e)return A0;let t,s,r,n,i,o,a,l,c,p;return{async load(){let m=await wp("./firebase.4625f0fe5950885c0804c63b33a7aad7.js");t=m.initializeApp,s=m.getApp,r=m.getAuth,n=m.signInWithPopup,i=m.signOut,o=m.GithubAuthProvider,a=m.firebaseConfig;try{l=s()}catch{l=t(a)}c=r(l),p=c.currentUser},async getUser(){return c||await this.load(),p?await Ki(p.uid)?Promise.resolve(await Vi(p)):void 0:new Promise(m=>{let g=c.onAuthStateChanged(async y=>{y?(p=y,g(),m(await Vi(p))):m(void 0)})})},async signIn(m=["gist","repo"]){c||await this.load();let g=new o;m.forEach(u=>g.addScope(u));let y=await n(c,g),h=o.credentialFromResult(y)?.accessToken;if(h)return p=y.user,await P0(p.uid,h),await Om(p),Vi(y.user)},async signOut(){c||await this.load(),await i(c),O0(p?.uid),p=null},isLoggedIn(){return p!=null}}},P0=async(e,t)=>{localStorage.setItem("token_"+e,await Mm(t))},Ki=async e=>{if(!e)return null;let t=localStorage.getItem("token_"+e);return t?Um(t):null},Am=(e,t)=>{localStorage.setItem("username_"+e,t)},O0=e=>{e&&(localStorage.removeItem("token_"+e),localStorage.removeItem("username_"+e))},Vi=async e=>({uid:e.uid,displayName:e.displayName,username:await Om(e),email:e.email,photoURL:e.photoURL,token:await Ki(e.uid)}),Om=async e=>{let t=e.uid,s=localStorage.getItem("username_"+t);if(s)return s;let r=e.reloadUserInfo?.screenName;if(r)return Am(t,r),r;let o=(await(await fetch("https://api.github.com/user",{headers:{Accept:"application/vnd.github.v3+json",Authorization:"token "+await Ki(t)}})).json()).login;return Am(t,o),o};var q0="https://livecodes-sandbox.pages.dev";var Xi=q0,qm="v6",Ot={getResultUrl:()=>`${Xi}/${qm}/result`,getCompilerUrl:()=>`${Xi}/${qm}/compiler`,getOrigin:()=>new URL(Xi).origin};var Rm="https://dpaste.com/",R0="https://dpaste.com/api/v2/",Im="https://api2.livecodes.io/share",Hm={getProject:async e=>{try{let t=await fetch(Rm+e+".txt");return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{try{let t=await fetch(R0,{method:"POST",mode:"cors",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":"LiveCodes / https://livecodes.io/"},body:`content=${encodeURIComponent(JSON.stringify(e))}&title=${encodeURIComponent(e.title||"")}&syntax=json&expiry_days=365`});return t.ok?(await t.text()).replace(Rm,""):""}catch{return""}}},I0={getProject:async e=>{if(e.length<11)return Hm.getProject(e);if(!ss())return{};try{let t=await fetch(Im+"?id="+e);return t.ok?JSON.parse(await t.text()):{}}catch{return{}}},shareProject:async e=>{if(!ss())return"";try{let t=await fetch(Im,{method:"POST",mode:"cors",body:JSON.stringify(e)});return t.ok?t.text():""}catch{return""}}},Bm=ss()?I0:Hm;var Dm={getTypeUrls:async e=>{let t={};if(e.length>0&&ss())try{t=await(await fetch("https://api.livecodes.io/types",{method:"POST",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({types:e})})).json()}catch{}return t}};var Nm=e=>new Promise(t=>{let s="compiler-frame";document.getElementById(s)?.remove();let n=document.createElement("iframe");n.name="compiler",n.id=s,n.style.width="0",n.style.height="0",n.style.visibility="hidden",n.style.position="absolute",n.setAttribute("sandbox","allow-same-origin allow-scripts"),n.src=e,document.body.appendChild(n),n.onload=()=>{t(n.contentWindow)}});var H0=/(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g,B0=/(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g,qt=e=>[...Ys(e).matchAll(new RegExp(H0)),...Ys(e).matchAll(new RegExp(B0))].map(t=>t[2].replace(/"/g,"").replace(/'/g,"")),D0=e=>!e.startsWith("https://deno.bundlejs.com/")&&!e.startsWith("https://edge.bundlejs.com/")&&!e.endsWith("#nobundle")&&(e.startsWith("https://deno.land/")||e.startsWith("https://github.com/")||e.startsWith("https://raw.githubusercontent.com/")||e.startsWith("https://gitlab.com/")||e.startsWith("https://bitbucket.org")||e.endsWith(".ts")||e.endsWith(".jsx")||e.endsWith(".tsx")),N0=e=>!e.startsWith("https://")&&!e.startsWith("http://")&&!e.startsWith(".")&&!e.startsWith("/")&&!e.startsWith("data:")&&!e.startsWith("blob:"),fn=(e,t)=>qt(e).map(s=>{if(!D0(s)&&!N0(s))return{};{let r=Object.keys(t.imports).find(n=>n===s||s.startsWith(n+"/"));return r?{[r]:t.imports[r]}:{[s]:De.getModuleUrl(s,{defaultCDN:t?.customSettings?.defaultCDN})}}}).reduce((s,r)=>({...s,...r}),{}),rr=e=>qt(e).length>0,$0=e=>new RegExp(/(^export\s)|([\s|;]export\s)/).test(Ci(e)),F0=e=>new RegExp(/(^await\s)|([\s|;]await\s)/).test(Ci(e)),$m=e=>rr(e)||$0(e)||F0(e);var z0=/(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g,Fm=e=>new RegExp(z0).test(e);var zm=e=>{let t=Ys(e);if(!/\b(require|module|exports)\b/.test(t))return e;let s=/(?:^|\s)require(?:\s*)\((?:\s*)('(.*?)'|"(.*?)")(?:\s*)\)/g,n=(l=>[...l.matchAll(new RegExp(s))].map(c=>c[1].replace(/"/g,"").replace(/'/g,"")))(t);if(n.length===0)return e;let i=n.map((l,c)=>[`import * as __requires_${c} from '${l}';`,`const __requires_${c}_default = __requires_${c}.default;`].join(`
`)).join(`
`),o=`const __requires_lookup = { ${n.map((l,c)=>`'${l}': __requires_${c}_default || __requires_${c}`).join(", ")} };`;return[i,o,"window.require = window.require || ((id) => {\n	if (id in __requires_lookup) return __requires_lookup[id];\n	throw new Error(`Cannot require modules dynamically (${id})`);\n});","const exports = {}; const module = { exports };",e,"export default module.exports;"].join(`

`)},Yi=(e,t,s={},r="css")=>{let n=qt(e),i=r==="css"?[r]:["css",r];return[...i.map(a=>"./style."+a),...i.map(a=>"./styles."+a),...i.map(a=>"./style.module."+a),...i.map(a=>"./styles.module."+a)].map(a=>{if(!n.includes(a))return{};if(!a.includes(".module."))return{[a]:"data:text/javascript;base64,"+btoa(`export default \`${Xt(t)}\`;`)};let l=`export default ${Xt(JSON.stringify(s))};
`+Object.keys(s).filter(c=>c===bp(c)).map(c=>`export const ${Xt(c)} = "${Xt(s[c])}";`).join(`
`);return{[a]:"data:text/javascript;base64,"+btoa(l)}}).reduce((a,l)=>({...a,...l}),{})};var Lt=e=>typeof e=="string"?{code:e,info:{}}:e;var Wm=async({config:e,baseUrl:t,eventsManager:s})=>{let r,n,i=Ot.getOrigin(),o=3,a=async()=>new Promise(async h=>{r=an([...Me,...Ne],e,t);let u=Ot.getCompilerUrl();n=await Nm(u+"?appCDN="+Qt()),s.addEventListener(window,"message",async b=>{b.origin===i&&b.data.type==="init-success"&&h("done")});let d={type:"init",payload:e,baseUrl:t,scriptUrl:t+"compiler-utils.d69d232f65ff2eafd6b24b03569ab205.js"};n.postMessage(d,i)}),l=h=>(u,{config:d,options:b})=>new Promise((x,w)=>{let _=T=>{let L=T.data;T.origin===i&&L.from==="compiler"&&(L.type==="compiled"||L.type==="compile-failed")&&L.payload.language===h&&L.payload.content===u&&(window.removeEventListener("message",_),L.type==="compiled"?x(L.payload.compiled):L.type==="compile-failed"&&w(h+` compile failed.
`+L.payload.error))};window.addEventListener("message",_);let f={type:"compile",payload:{content:u,language:h,config:d,options:b}};n.postMessage(f,i)}),c=(h,u)=>Promise.allSettled(h.map(d=>new Promise(async(b,x)=>{["jsx","tsx"].includes(d)&&(d="typescript");let w=r[d];if(w&&!w.fn){s.addEventListener(window,"message",async f=>{f.origin===i&&f.data.from==="compiler"&&f.data.type==="loaded"&&f.data.payload===d?(w.fn=l(d),b("done")):f.origin===i&&f.data.from==="compiler"&&f.data.type==="load-failed"&&f.data.payload===d&&(o===0?x(`Failed to load compiler for: ${d}.`):(o-=1,await a(),await c(Array.from(new Set([...h,u.markup.language,u.style.language,u.script.language])),u),b("done")))});let _={type:"load",payload:{language:d,config:u}};n.postMessage(_,i)}else b("done")}))),p={},m=async(h,u,d,b)=>{["jsx","tsx"].includes(u)&&(u="typescript");let x=td(u,d),w=tn(Ni(u,d));if(!b?.forceCompile&&p[u]?.content===h&&p[u]?.processors===x&&p[u]?.languageSettings===w&&p[u]?.compiled)return{code:p[u]?.compiled||"",info:JSON.parse(p[u]?.info||"{}")};r[u]&&!r[u].fn&&await c([u],d);let _=r[u]?.fn;if(typeof _!="function")return new Promise(U=>{u!=="html"&&u!=="css"&&u!=="javascript"&&console.error("Failed to load compiler for: "+u),U({code:"",info:{}})});let f=Lt(await _(h,{config:d,language:u,baseUrl:t,options:b}))||"",T=Lt(await g(f.code,{config:d,language:u,baseUrl:t,options:b}))||"",L={...f.info,...T.info};return p[u]={content:h,compiled:T.code,info:JSON.stringify(L),processors:x,languageSettings:tn(Ni(u,d))},{code:T.code,info:L}},g=async(h,{config:u,language:d,baseUrl:b,options:x})=>{let w=h,_={},f=!1,T=oe(d)||"markup";T==="style"&&Fm(w)&&(f=!0);for(let L of Ne)if(es(L.name,u)&&Di(L.name,u)&&L.editor===T||T==="style"&&L.name==="postcss")if(L.isPostcssPlugin)f=!0;else{if(L.name==="postcss"&&!f)continue;r[L.name]&&!r[L.name].fn&&await c([L.name],u);let U=r[L.name].fn||(async ge=>ge);if(typeof U!="function")return console.error("Failed to load processor: "+L.name),{code:w,info:_};let I=await U(w,{config:u,language:d,baseUrl:b,options:x}),Le=Lt(I);w=Le.code,_={..._,...Le.info}}return{code:w,info:_}},y=()=>{Object.keys(p).forEach(h=>delete p[h])};return await a(),{load:c,compile:m,clearCache:y}};var Gm=e=>{let t=e.config.mode;return t==="codeblock"||t==="editor"?W0():Wm(e)};async function W0(){return{load:(e,t)=>Promise.resolve(["do nothing"]),compile:(e,t,s)=>Promise.resolve(Lt(e)),clearCache:()=>{}}}var Jm={name:"clojurescript",title:"CLJS (cherry)",longTitle:"ClojureScript (cherry)",formatter:{factory:ts},compiler:{url:rn+"lib/cherry.umd.js",factory:()=>async(e,{config:t,options:s})=>{let r=self.CherryCljs.compileString(e);return e.includes("#jsx")?er(r,"jsx",t,s):r},imports:{"cherry-cljs":rn+"index.js","cherry-cljs/cljs.core.js":rn+"cljs.core.js"}},extensions:["cljs","clj","cljc","edn","clojure"],editor:"script",editorLanguage:"clojure"};var Me=[od,ud,dd,Yd,md,sd,id,lm,Id,Rd,ym,Bd,qd,Hd,Xd,cm,gm,om,im,nd,fd,hd,pd,_d,fm,ad,yd,hm,rd,_m,ld,cd,Jd,Vd,vd,bd,gd,wd,Ad,Pd,Wd,Qd,xd,Sd,um,nm,am,Nd,$d,Fd,Ed,Od,pm,kd,Dd,Td,Zd,tm,Cd,jd,mm,dm,em,Ud,Md,Jm,sm,Ld,zd,Gd,rm,Kd];var Vm=(e,t,s,r,n,i)=>{let o=["markup","style","script"],a=document.createElement("ul");document.querySelector("#select-editor")?.appendChild(a);let l=o.length;o.forEach(c=>{let p=document.createElement("li");p.id=c+"-selector",p.classList.add("editor-title","noselect"),p.dataset.editor=c,p.tabIndex=1,p.innerHTML=`
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
    `,a.appendChild(p);let m=document.createElement("div");m.classList.add("menu-scroller"),m.classList.add("menu-scroller-"+c),p.appendChild(m);let g=document.createElement("ul");g.classList.add("dropdown-menu"),g.classList.add("dropdown-menu-"+c),m.appendChild(g);let y=[...Me].filter(d=>d.editor===c).filter(d=>$e(d.name,e));if(y.length===0)p.classList.add("hidden"),l-=1;else if(y.length===1){let d=p.querySelector(".language-menu-button");d&&(d.style.display="none")}let u=Ne.filter(d=>d.editor===c&&es(d.name,e)).length>0?{name:c+"-processors",title:"Processors:",longTitle:"Processors:",editor:c}:void 0;u&&y.push(u),y.forEach(d=>{let b=document.createElement("li");b.classList.add("language-item"),g.appendChild(b);let x=document.createElement("a");if(x.href="#",x.dataset.editor=c,x.dataset.lang=d.name,x.title=d.longTitle||d.title,x.innerHTML=d.longTitle||d.title,"extensions"in d||x.classList.add("subtitle"),d.name==="style-processors"&&b.classList.add("column-break"),b.appendChild(x),d.info!==!1){let w=document.createElement("span");w.classList.add("tooltip","hint--bottom-left"),w.dataset.hint="Click for info...",w.innerHTML=J0,s.addEventListener(w,"mousedown",async()=>{let _=document.createElement("div");_.classList.add("language-info"),_.innerHTML=await G0(d.name,t),r(_);let f=_.querySelector("a[data-template]"),T=f?.dataset.template;f&&T&&s.addEventListener(f,"click",async I=>{I.preventDefault(),n(T)},!1);let L=_.querySelector("a[data-code]"),U=L?.dataset.code;L&&U&&s.addEventListener(L,"click",async I=>{I.preventDefault(),i({url:U})},!1)},!1),b.appendChild(w)}})}),l<3&&document.querySelectorAll(".editor-title").forEach(c=>{c.classList.add("half-width")})},Km=e=>{let t=document.createElement("li");return t.classList.add("language-item","processor-item"),t.innerHTML=`
        <label class="switch">
          <span>${e.title}</span>
          <div>
            <input id="${e.name}" type="checkbox" data-processor="${e.name}" />
            <span class="slider round"></span>
          </div>
        </label>
        `,t},G0=async(e,t)=>{let s=await import(t+"language-info.9e9ef85f4593622bc49aa47fa20b5061.js").then(o=>o.languageInfo);return new DOMParser().parseFromString(s,"text/html").querySelector(`[data-lang="${e}"]`)?.innerHTML||""},J0=`<?xml version="1.0" encoding="iso-8859-1"?>
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
</svg>`;var Xm=[{id:"normalize.css",name:"Normalize.css",url:Eu},{id:"reset-css",name:"CSS reset",url:Mu}];var Ym=e=>{let t=e.value,s=e.language;return{getValue:()=>t,setValue:(r="")=>{t=r},getLanguage:()=>s,setLanguage:(r,n)=>{s=r,n&&(t=n)},getEditorId:()=>oe(s)||"markup",focus:()=>{},getPosition:()=>({lineNumber:1,column:1}),setPosition:()=>{},onContentChanged:()=>{},addKeyBinding:()=>{},keyCodes:{CtrlEnter:"",ShiftEnter:"",Enter:"",UpArrow:"",DownArrow:"",ShiftAltF:""},changeSettings:()=>{},registerFormatter:()=>{},format:async()=>{},isReadonly:!0,setTheme:()=>{},undo:()=>{},redo:()=>{},destroy:()=>{},isFake:!0}};var Qi=[{id:"anonymous-pro",name:"Anonymous Pro",url:Hp},{id:"cascadia-code",name:"Cascadia Code",url:Bp},{id:"comic-mono",name:"Code New Roman",url:Dp},{id:"comic-mono",name:"Comic Mono",url:Np},{id:"courier-prime",name:"Courier Prime",url:$p},{id:"dec-terminal-modern",name:"DEC Terminal Modern",url:Fp},{id:"dejavu-mono",name:"DejaVu Mono",url:zp},{id:"fantasque-sans-mono",name:"TypoPRO Fantasque Sans Mono",label:"Fantasque Sans Mono",url:Wp},{id:"fira-code",name:"Fira Code",url:Gp},{id:"fixedsys",name:"Fixedsys 62",label:"Fixedsys",url:Jp},{id:"hack",name:"Hack",url:Vp},{id:"hermit",name:"Hermit",url:Kp},{id:"ibm-plex-mono",name:"IBM Plex Mono",url:Xp},{id:"inconsolata",name:"Inconsolata",url:Yp},{id:"iosevka",name:"Iosevka",url:Qp},{id:"jetbrains-mono",name:"JetBrains Mono",url:Zp},{id:"menlo",name:"Menlo",url:eu},{id:"monofur",name:"Monofur",url:tu},{id:"monoid",name:"TypoPRO Monoid",label:"Monoid",url:su},{id:"noto-sans-mono",name:"Noto Sans Mono",url:ru},{id:"nova-mono",name:"Nova Mono",url:nu},{id:"opendyslexic",name:"OpenDyslexic",url:iu},{id:"profontwindows",name:"ProFontWindows",label:"ProFont",url:ou},{id:"roboto-mono",name:"Roboto Mono",url:au},{id:"sf-mono",name:"SF Mono",url:lu},{id:"source-code-pro",name:"Source Code Pro",url:cu},{id:"space-mono",name:"Space Mono",url:pu},{id:"sudo-var",name:"Sudo Var",url:uu},{id:"ubuntu-mono",name:"Ubuntu Mono",url:du},{id:"victor-mono",name:"Victor Mono",url:mu}],ks=e=>{let t='Consolas, "Roboto Mono", "Ubuntu Mono", ui-monospace, monospace';if(!e)return t;let s=Qi.find(r=>[r.id,r.name,r.label].includes(e))?.name;return s?`"${s}", ${t}`:t};var V0=e=>e==="codemirror"?"codemirror.f07ed45d348e9ab10adffdb20b13c5f0.js":e==="codejar"?"codejar.82342f3f4543f632519e31bcde034d68.js":"monaco.40c520b263bbf75297f34bd9e5b7c64a.js",K0=async(e,t)=>{let{baseUrl:s}=t,r=V0(e),n=s+r,i=window[n];i||(i=await import(n),window[n]=i);let o=i.createEditor;return await o(t)},X0=e=>{let{editor:t,mode:s,editorId:r}=e;return(s==="result"&&r!=="console"&&r!=="compiled"?"fake":["codemirror","monaco","codejar"].includes(t||"")?t:s==="codeblock"?"codejar":Ks()?"codemirror":"monaco")||"monaco"},Y0=e=>{let t={...e,readOnly:!0},s={...e,readOnly:!0},r={...e,lineNumbers:!1},n={...e,lineNumbers:!1,readOnly:!0},i=e.editorId;return i==="console"?r:i==="compiled"?s:i==="embed"?n:e.mode==="codeblock"?t:e},Qm=e=>{if(!e)return;let t=Qi.find(s=>[s.id,s.name,s.label].includes(e));t&&Ls(t.url,"font-"+t.id)},Rt=async e=>{if(!e)throw new Error;let t=Y0(e),s=X0(t);if(s==="fake")return Ym(t);t.fontFamily&&Qm(t.fontFamily);let r=await K0(s,t),n=r.changeSettings;return r.changeSettings=i=>(i.fontFamily&&Qm(i.fontFamily),n(i)),r};var Zm=e=>{e.data.type==="customEditorCommand"&&(e.data.payload==="fork"&&window.dispatchEvent(new KeyboardEvent("keydown",{keyCode:83,shiftKey:!0,ctrlKey:!navigator.platform.match("Mac"),metaKey:!!navigator.platform.match("Mac")})),e.data.payload==="save"&&window.dispatchEvent(new KeyboardEvent("keydown",{keyCode:83,ctrlKey:!navigator.platform.match("Mac"),metaKey:!!navigator.platform.match("Mac")})))},hn=(e,t)=>{e?t.addEventListener(window,"message",Zm):t.removeEventListener(window,"message",Zm)};var ef=({baseUrl:e,eventsManager:t})=>{let s,r=async()=>{if(s)return;let n=document.querySelector("#script"),i=document.createElement("div");i.id="blockly",i.classList.add("custom-editor"),i.innerHTML='<span class="loading-custom-editor">Loading blockly editor...</span>',n.appendChild(i),s=await import(e+"blockly.f35daf5dcf76eed1e1dc620505f3a483.js")};return{language:"blockly",show:async(n,i)=>{!s&&n&&await r();let o=document.querySelector("#blockly");if(!n||i.editors.script.getLanguage()!=="blockly"){o&&(o.style.display="none");return}o&&(o.style.display="unset"),await s.showBlockly(i),hn(n,t)},getContent:async n=>(await r(),s.getBlocklyContent(n)),setTheme:n=>{s?.setBlocklyTheme(n)}}};var tf=({baseUrl:e,eventsManager:t})=>{let s,r=async()=>{if(s)return;let n=document.querySelector("#markup"),i=document.createElement("div");i.id="quillEditor",i.classList.add("custom-editor"),i.innerHTML='<span class="loading-custom-editor">Loading rich text editor...</span>',n.appendChild(i),s=await import(e+"quill.2468c2596d64cb46ee06d87d3b865bf6.js")};return{language:"richtext",show:async(n,i)=>{!s&&n&&await r();let o=document.querySelector("#quillEditor");if(!n||i.editors.markup.getLanguage()!=="richtext"){o&&(o.style.display="none");return}o&&(o.style.display="unset"),await s.showQuillEditor(i),hn(n,t)},getContent:async n=>(await r(),s.getQuillEditorContent(n)),setTheme:n=>{s?.setQuillEditorTheme(n)}}};var sf=e=>({blockly:ef(e),richtext:tf(e)});var rf=e=>{let t=new Worker(e+"format.worker.39bb6fcd4622534764f5b2f3be01eb6a.js?appCDN="+Qt()),s={type:"init",baseUrl:e};return t.postMessage(s),{load:async o=>new Promise((a,l)=>{let c=m=>{let g=m.data;(g.type==="loaded"||g.type==="load-failed")&&g.payload===o&&(t.removeEventListener("message",c),g.type==="loaded"?a("loaded formatter for: "+o.join(", ")):g.type==="load-failed"&&l("failed loading formatter for: "+o.join(", ")))};t.addEventListener("message",c);let p={type:"load",payload:o};t.postMessage(p)}),getFormatFn:async o=>(l,c,p={})=>new Promise((m,g)=>{let y=u=>{let d=u.data;(d.type==="formatted"||d.type==="format-failed")&&d.payload.language===o&&d.payload.value===l&&d.payload.cursorOffset===c&&(t.removeEventListener("message",y),d.type==="formatted"?m({formatted:d.payload.formatted,cursorOffset:d.payload.formattedCursorOffset}):d.type==="format-failed"&&g({language:o,formatted:l,cursorOffset:c}))};t.addEventListener("message",y);let h={type:"format",payload:{language:o,value:l,cursorOffset:c,formatterConfig:p}};t.postMessage(h)}),destroy:()=>{t.terminate()}}};var nf=(e,t,s)=>{let{readonly:r,mode:n}=e;return r||n==="codeblock"||n==="result"||s?Q0():rf(t)};function Q0(){return{load:e=>Promise.resolve("do nothing"),getFormatFn:e=>Promise.resolve((t,s)=>Promise.resolve({formatted:t,cursorOffset:s})),destroy:()=>{}}}function Z0(e,t,s){if(s)return t?t(e()):e();try{var r=Promise.resolve(e());return t?r.then(t):r}catch(n){return Promise.reject(n)}}function eS(e){var t=e();if(t&&t.then)return t.then(tS)}function tS(){}function sS(e,t,s){return s?t?t(e):e:((!e||!e.then)&&(e=Promise.resolve(e)),t?e.then(t):e)}var gn={left:[],center:[],right:[]},Zi={left:!0,center:!0,right:!0},rS={light:{backgroundColor:"#fff",textColor:"#000",actionColor:"#008000"},dark:{}},dt=function(t,s){var r=this;s===void 0&&(s={});var n=s.timeout;n===void 0&&(n=0);var i=s.actions;i===void 0&&(i=[{text:"dismiss",callback:function(){return r.destroy()}}]);var o=s.position;o===void 0&&(o="center");var a=s.theme;a===void 0&&(a="dark");var l=s.maxStack;l===void 0&&(l=3),this.message=t,this.options={timeout:n,actions:i,position:o,maxStack:l,theme:typeof a=="string"?rS[a]:a},this.wrapper=this.getWrapper(this.options.position),this.insert(),gn[this.options.position].push(this),this.stack()},of={theme:{configurable:!0}};of.theme.get=function(){return this.options.theme};dt.prototype.getWrapper=function(t){var s=document.querySelector(".snackbars-"+t);return s||(s=document.createElement("div"),s.className="snackbars snackbars-"+t,document.body.appendChild(s)),s};dt.prototype.insert=function(){var t=this,s=document.createElement("div");s.className="snackbar",s.setAttribute("aria-live","assertive"),s.setAttribute("aria-atomic","true"),s.setAttribute("aria-hidden","false");var r=this.theme,n=r.backgroundColor,i=r.textColor,o=r.boxShadow,a=r.actionColor,l=document.createElement("div");l.className="snackbar--container",n&&(l.style.backgroundColor=n),i&&(l.style.color=i),o&&(l.style.boxShadow=o),s.appendChild(l);var c=document.createElement("div");if(c.className="snackbar--text",typeof this.message=="string"?c.textContent=this.message:c.appendChild(this.message),l.appendChild(c),this.options.actions)for(var p=function(){var y=g[m],h=y.style,u=y.text,d=y.callback,b=document.createElement("button");b.className="snackbar--button",b.innerHTML=u,a&&(b.style.color=a),h&&Object.keys(h).forEach(function(x){b.style[x]=h[x]}),b.addEventListener("click",function(){t.stopTimer(),d?d(b,t):t.destroy()}),l.appendChild(b)},m=0,g=t.options.actions;m<g.length;m+=1)p();this.startTimer(),s.addEventListener("mouseenter",function(){t.expand()}),s.addEventListener("mouseleave",function(){t.stack()}),this.el=s,this.wrapper.appendChild(s)};dt.prototype.stack=function(){var t=this;Zi[this.options.position]=!0;var s=gn[this.options.position],r=s.length-1;s.forEach(function(n,i){n.startTimer();var o=n.el;if(o){o.style.transform="translate3d(0, -"+(r-i)*15+"px, -"+(r-i)+"px) scale("+(1-.05*(r-i))+")";var a=r-i>=t.options.maxStack;t.toggleVisibility(o,a)}})};dt.prototype.expand=function(){var t=this;Zi[this.options.position]=!1;var s=gn[this.options.position],r=s.length-1;s.forEach(function(n,i){n.stopTimer();var o=n.el;if(o){o.style.transform="translate3d(0, -"+(r-i)*o.clientHeight+"px, 0) scale(1)";var a=r-i>=t.options.maxStack;t.toggleVisibility(o,a)}})};dt.prototype.toggleVisibility=function(t,s){s?(this.visibilityTimeoutId=window.setTimeout(function(){t.style.visibility="hidden"},300),t.style.opacity="0"):(this.visibilityTimeoutId&&(clearTimeout(this.visibilityTimeoutId),this.visibilityTimeoutId=void 0),t.style.opacity="1",t.style.visibility="visible")};dt.prototype.destroy=function(){var t=this;return Z0(function(){var s=t.el,r=t.wrapper;return eS(function(){if(s)return s.setAttribute("aria-hidden","true"),sS(new Promise(function(n){var i=nS(s);i?s.addEventListener(i,function(){return n()}):n()}),function(){r.removeChild(s);for(var n=gn[t.options.position],i=void 0,o=0;o<n.length;o++)if(n[o].el===s){i=o;break}i!==void 0&&n.splice(i,1),Zi[t.options.position]?t.stack():t.expand()})})})};dt.prototype.startTimer=function(){var t=this;this.options.timeout&&!this.timeoutId&&(this.timeoutId=self.setTimeout(function(){return t.destroy()},this.options.timeout))};dt.prototype.stopTimer=function(){this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)};Object.defineProperties(dt.prototype,of);function nS(e){for(var t={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"Animationend",WebkitAnimation:"webkitAnimationEnd"},s=0,r=Object.keys(t);s<r.length;s+=1){var n=r[s];if(e.style[n]!==void 0)return t[n]}}function Ts(e,t){return new dt(e,t)}var af={minWidth:"2em",padding:"3px"};var lf={textColor:"#343A40",actionColor:"#343A40",backgroundColor:"#fff"},cf={textColor:"#055160",actionColor:"#055160",backgroundColor:"#CFF4FC"},pf={textColor:"#0F5132",actionColor:"#0F5132",backgroundColor:"#D1E7DD"},uf={textColor:"#664D16",actionColor:"#664D16",backgroundColor:"#FFF3CD"},df={textColor:"#842040",actionColor:"#842040",backgroundColor:"#F8D7DA"},Cs={text:'<span title="Dismiss">\u2716</span>',style:af,callback(e,t){t.destroy()}},mf={text:'<span title="Confirm">\u2713</span>',style:af,callback(e,t){t.destroy()}};var ff=()=>({info:(o,a=!0)=>Ts(o,{theme:cf,actions:a?[Cs]:[],timeout:2e3}),success:(o,a=!0)=>Ts("\u2713 "+o,{theme:pf,actions:a?[Cs]:[],timeout:2e3}),warning:(o,a=!0)=>Ts(o,{theme:uf,actions:a?[Cs]:[],timeout:2e3}),error:(o,a=!0)=>Ts("\u2716 "+o,{theme:df,actions:a?[Cs]:[],timeout:2e3}),confirm:(o,a,l)=>{let c={...mf,callback(m,g){a(),g.destroy()}},p={...Cs,callback(m,g){l?.(),g.destroy()}};return Ts(o,{theme:lf,actions:[c,p]})}});var hf=()=>{let e=document.querySelector("#overlay"),t=document.querySelector("#modal-container"),s=document.querySelector("#modal"),r,n=()=>{},i=(c,{size:p="large",closeButton:m=!1,isAsync:g=!1,onClose:y=()=>{},scrollToSelector:h=""}={})=>{if(s.innerHTML="",s.className=p,s.appendChild(c),n=y,h&&setTimeout(()=>{let d=c.querySelector(h);c.style.scrollBehavior="smooth",d&&d.scrollIntoView()},500),m){let d=document.createElement("div");d.className="close-container";let b=document.createElement("button");b.classList.add("button"),b.innerHTML="Close",b.onclick=o,d.appendChild(b),s.appendChild(d)}let u=document.createElement("div");u.classList.add("close-button"),u.title="Esc",u.onclick=o,s.appendChild(u),e.style.display="flex",t.style.display="flex",s.style.display="flex",e.classList.remove("hidden"),t.classList.remove("hidden"),r=!0,document.removeEventListener("click",a),document.removeEventListener("keydown",l),document.addEventListener("click",a,!1),document.addEventListener("keydown",l,!1),g&&c.click()},o=()=>{typeof n=="function"&&n(),document.removeEventListener("click",a),document.removeEventListener("keydown",l),s.innerHTML="",s.className="",e.classList.add("hidden"),t.classList.add("hidden"),s.style.display="none",setTimeout(()=>{e.style.display="none",t.style.display="none",r=!1},400)};function a(c){let p=document.querySelector(".snackbar");!s?.contains(c.target)&&!p?.contains(c.target)&&!r&&o(),r=!1}let l=c=>{c.key==="Escape"&&!window.watchingEscape&&(o(),c.preventDefault())};return{show:i,close:o}};var gf=`<!DOCTYPE html>
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
`;var _f=`<!DOCTYPE html>\r
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
`;var yf=`<ul id="settings-menu" class="dropdown-menu">\r
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
`;var vf=`<section data-lang="art-template">\r
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
`;var bf=`<div id="custom-settings-container" class="modal-container">
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
`;var wf=`<div id="test-editor-container" class="modal-container">
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
`;var xf=`<div id="import-container" class="modal-container">
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
`;var Sf=`<div id="deploy-container" class="modal-container">
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
`;var Lf=`<div id="sync-container" class="modal-container">
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
`;var Ef=`<div id="backup-container" class="modal-container">
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
`;var kf=`<div id="broadcast-container" class="modal-container">
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
`;var Tf=`<div id="welcome-container" class="modal-container">\r
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
`;var Cf=`<div id="about-container" class="modal-container">\r
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
`;var jf=`<div id="info-container" class="modal-container">
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
`;var Mf=`<div id="resources-container" class="modal-container">
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
`;var Uf=`<div id="login-screen" class="modal-container">\r
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
`;var Af=`<div id="prompt-screen">
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
`;var Pf=`<div id="prompt-recover-screen">
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
`;var Of=`<div id="templates-container" class="modal-container">
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
`;var qf=`<div id="list-container" class="list-container">
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
`;var Rf=`<div id="assets-list-container" class="list-container">
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
`;var If=`<div id="add-asset-container" class="modal-container">
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
`;var Hf=`<div id="snippets-list-container" class="list-container">
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
`;var Bf=`<div id="add-snippet-container" class="modal-container">
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
`;var Df=`<div id="share-screen" class="modal-container">\r
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
`;var Nf=`<div id="embed-container" class="modal-container">
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
`;var $f=`<div id="editor-settings-container" class="modal-container">
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
`;var Ff=`<!DOCTYPE html>
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
`;var Z=e=>e.replace(/{{APP_VERSION}}/g,"4").replace(/{{SDK_VERSION}}/g,"0.0.2").replace(/{{COMMIT_SHA}}/g,"fe430fb").replace(/{{REPO_URL}}/g,"https://github.com/live-codes/livecodes").replace(/{{DOCS_BASE_URL}}/g,"/livecodes/docs/"),zf=Z(gf),MN=Z(_f),PS=Z(yf),UN=Z(vf),OS=Z(bf),qS=Z(wf),AN=Z(xf),PN=Z(Sf),ON=Z(Lf),qN=Z(Ef),RN=Z(kf),RS=Z(Tf),IS=Z(Cf),HS=Z(jf),IN=Z(Mf),BS=Z(Uf),Wf=Z(Af),Gf=Z(Pf),DS=Z(Of),NS=Z(qf),HN=Z(Rf),BN=Z(If),DN=Z(Hf),NN=Z(Bf),$N=Z(Df),FN=Z(Nf),zN=Z($f),$S=Z(Ff);var mt=(e,t)=>{let s=r=>r.replace(/{{ __livecodes_baseUrl__ }}/g,Ss(t)).replace(/{{ __CDN_URL__ }}/g,De.getUrl("~").replace("~",""));return typeof e=="string"?s(e):{...e,url:s(e.url)}},zS=async e=>(await import(e+"templates.ba84017649b6a8db4e5f4844cb167368.js")).starterTemplates,eo=async(e,t)=>(await zS(t)).filter(s=>{let r=e.languages?.map(Q).filter(Boolean);if(!r||s.title==="Blank Project")return!0;let n=[s.markup?.language,s.style?.language,s.script?.language];for(let i of n){let o=Q(i);if(!o||!r.includes(o))return!1}return!0}).map(s=>({...s,markup:{...s.markup,language:s.markup?.language||"html",content:mt(s.markup?.content||"",t),...s.markup?.contentUrl?{contentUrl:mt(s.markup?.contentUrl||"",t)}:{}},style:{...s.style,language:s.style?.language||"css",content:mt(s.style?.content||"",t),...s.style?.contentUrl?{contentUrl:mt(s.style?.contentUrl||"",t)}:{}},script:{...s.script,language:s.script?.language||"javascript",content:mt(s.script?.content||"",t),...s.script?.contentUrl?{contentUrl:mt(s.script?.contentUrl||"",t)}:{}},imports:Xs(s.imports||{},r=>mt(r||"",t)),types:Xs(s.types||{},r=>mt(r||"",t)),stylesheets:s.stylesheets?.map(r=>mt(r||"",t)),scripts:s.scripts?.map(r=>mt(r||"",t))})),Jf=async(e,t,s)=>(await eo(t,s)).filter(r=>r.name.toLowerCase()===e.toLowerCase())[0];var J={title:"Untitled Project",description:"",tags:[],autoupdate:!0,autosave:!1,delay:1500,formatOnsave:!1,mode:"full",theme:"dark",recoverUnsaved:!0,showSpacing:!1,welcome:!0,readonly:!1,allowLangChange:!0,activeEditor:void 0,languages:void 0,markup:{language:"html",content:""},style:{language:"css",content:""},script:{language:"javascript",content:""},stylesheets:[],scripts:[],cssPreset:"",imports:{},types:{},tests:{language:"typescript",content:""},tools:{enabled:"all",active:"",status:""},zoom:1,processors:[],customSettings:{},editor:void 0,fontFamily:void 0,fontSize:void 0,useTabs:!1,tabSize:2,lineNumbers:!0,wordWrap:!1,closeBrackets:!0,semicolons:!0,singleQuote:!1,trailingComma:!0,emmet:!0,editorMode:void 0,version:"4"};var js=e=>{if(!e)return{...J};let t=rs(e),s={...J,...t,...t.mode==="result"&&t.tools==null?{tools:{enabled:[],active:"",status:"none"}}:{}},r=_n(),{version:n,...i}=rs(GS(s,r));s={...s,...i};let o=s.activeEditor||"markup";return s=WS({...s,activeEditor:o}),s},WS=e=>({...e,markup:{...e.markup,language:Q(e.markup.language)||J.markup.language},style:{...e.style,language:Q(e.style.language)||J.style.language},script:{...e.script,language:Q(e.script.language)||J.script.language},...e.tests?.language?{tests:{...e.tests,language:Q(e.tests.language)||J.tests?.language||"typescript"}}:{}}),_n=(e=parent.location.search)=>{let t=Object.fromEntries(new URLSearchParams(e));return Object.keys(t).forEach(s=>{try{t[s]=decodeURIComponent(t[s])}catch{}t[s]===""&&(t[s]=!0),t[s]==="true"&&(t[s]=!0),t[s]==="false"&&(t[s]=!1)}),t},GS=(e,t)=>{let s=[...Object.keys(J)].filter(m=>m!=="version").reduce((m,g)=>({...m,[g]:t[g]}),{});Object.keys(t).forEach(m=>{let g=Q(m);if(!g)return;let y=oe(g);if(y&&!s[y]){let h=t[m],u=typeof h=="string"?yp(decodeURIComponent(h)):"";s[y]={language:g,content:u},s.activeEditor||(s.activeEditor=y)}});let r=Q(t.language||t.lang),n=oe(r);n&&(s[n]?.language===r?s.activeEditor=n:!s[n]?.content&&e[n]?.language===r?(s[n]={...e[n]},s.activeEditor=n):e[n]?.content||(s[n]={language:r,content:""},s.activeEditor=n));let i=["markup","style","script"],o=t.activeEditor,a=t.active;s.activeEditor=i.includes(o)?o:o in i?i[o]:i.includes(a)?a:a in i?i[a]:s.activeEditor,typeof t.languages=="string"&&(s.languages=t.languages.split(",").map(m=>m.trim()).map(Q).filter(Boolean)),typeof t.processors=="string"&&(s.processors=t.processors.split(",").map(m=>m.trim()).filter(Boolean)),typeof t.tags=="string"&&(s.tags=t.tags.split(",").map(m=>m.trim()).filter(Boolean)),typeof t.stylesheets=="string"&&(s.stylesheets=t.stylesheets.split(",").map(m=>m.trim()).filter(Boolean)),typeof t.scripts=="string"&&(s.scripts=t.scripts.split(",").map(m=>m.trim()).filter(Boolean));let l=["console","compiled","tests"],c=!t.tools&&l.map(m=>t[m]).filter(Boolean).length===0;if(t.tools==="none"||t.tools===!1||t.mode==="editor"||t.mode==="codeblock"||t.mode==="result"&&c)s.tools={enabled:[],active:"",status:"none"};else if(!c){s.tools=Mt(J.tools);let m,[g,y]=t.tools?.split("|")||["",""],h=g.split(",").map(d=>d.trim()).filter(d=>l.includes(d));h.length>0&&(s.tools.enabled=h,s.tools.active=h[0]),Object.keys(t).filter(d=>l.includes(d)).forEach(d=>{s.tools&&(t[d]===!0&&(t[d]="open"),t[d]===!1&&(t[d]="none"),!m&&["open","full","closed"].includes(t[d])&&(s.tools.enabled!=="all"&&!s.tools.enabled.includes(d)&&s.tools.enabled.push(d),s.tools.active=d,s.tools.status=t[d],m=s.tools.status),t[d]==="none"&&(s.tools.enabled==="all"&&(s.tools.enabled=[...l]),s.tools.enabled=s.tools.enabled.filter(b=>b!==d),s.tools.active===d&&(s.tools.active=s.tools.enabled[0])))}),["open","full","closed"].includes(t.tools)?s.tools.status=t.tools:["open","full","closed"].includes(y)?s.tools.status=y:!s.tools?.status&&["editor","codeblock","result"].includes(s.mode||"")?s.tools={enabled:[],active:"",status:"none"}:s.tools.status||(s.tools.status="closed")}return s};var JS=[{to:"0.6.0",upgrade:(e,t)=>{let s=Ms(e);return s.processors&&"postcss"in s.processors&&(s.processors=Object.keys(s.processors.postcss).filter(r=>s.processors.postcss[r])),{...s,version:t}}},{to:"0.5.0",upgrade:(e,t)=>{let s=Ms(e);return"editor"in s&&s.editor==="prism"&&(s.editor="codejar"),"compiled"in s&&(s.tools=s.tools||Ms(J.tools),s.tools.active="compiled",s.tools.status=s.compiled,delete s.compiled),"console"in s&&(s.tools=s.tools||Ms(J.tools),s.tools.active="console",s.tools.status=s.console,delete s.console),s.script?.language==="graph"&&(s.script.language="diagrams"),s.languages?.includes("graph")&&(s.languages=s.languages.map(r=>r==="graph"?"diagrams":r)),"enableRestore"in s&&(s.recoverUnsaved=s.enableRestore,delete s.enableRestore),{...s,version:t}}},{to:"0.4.0",upgrade:(e,t)=>{let s=Ms(e);if(s=Vf(s,"update_delay","delay"),s=Vf(s,"allow_lang_change","allowLangChange"),"autoprefixer"in s&&(s.processors=Ms(J.processors),s.processors.postcss=s.processors.postcss||{},s.processors.postcss.autoprefixer=s.autoprefixer,delete s.autoprefixer),"baseUrl"in s&&delete s.baseUrl,"cssPreset"in s&&s.cssPreset===null&&(s.cssPreset=""),"editor"in s&&typeof s.editor!="string"&&(s.editor=void 0),"language"in s&&(s.activeEditor=oe(s.language),delete s.language),"modules"in s){let r={...s.modules.reduce((i,o)=>({...i,...o.url?{[o.name]:o.url}:{}}),{})};Object.keys(r).length>0&&(s.imports=r);let n={...s.modules.reduce((i,o)=>({...i,...o.typesUrl?{[o.name]:o.typesUrl}:{}}),{})};Object.keys(n).length>0&&(s.types=n),delete s.modules}return{...s,version:t}}}],Kf=e=>{let t=VS(e.version)?e.version:"0.0.0",s=J.version;return to({version:s,comparedTo:t})?(console.warn(`Unsupported config version '${t}'. Current LiveCodes version is '${s}'`),e):t===s?e:{...JS.sort((r,n)=>to({version:r.to,comparedTo:n.to})?-1:1).reduce((r,n)=>to({version:r.version,comparedTo:n.to})?n.upgrade(r,n.to):r,e),version:s}},VS=e=>{if(typeof e!="string")return!1;let t=e.split(".");return!(t.length!==3||t.map(s=>Number(s)).filter(isNaN).length!==0)},to=({version:e,comparedTo:t})=>{if(!e)return!0;let s=e.split(".").map(n=>Number(n)),r=t.split(".").map(n=>Number(n));for(let n in s)if(s[n]<r[n])return!0;return!1},Ms=e=>JSON.parse(JSON.stringify(e)),Vf=(e,t,s)=>{let{[t]:r,...n}={...e,...t in e?{[s]:e[t]}:{}};return n};var Xf=e=>{let t=(u,d,b)=>d==="array"?Array.isArray(u)?b?u.filter(x=>t(x,b)).length>0:!0:!1:d==="object"?u&&typeof u===d:d==="number"&&!isNaN(Number(u))?!0:typeof u===d,s=(u,d)=>d!=null&&u.includes(d),r=["full","editor","codeblock","result"],n=["light","dark"],i=["vim","emacs"],o=["console","compiled","tests"],a=["","full","closed","open","none"],l=["monaco","codemirror","codejar"],c=["markup","style","script"],p=[1,.5,.25],m=u=>t(u,"object")&&(t(u.language,"string")||t(u.content,"string")||t(u.contentUrl,"string")),g=(u,d)=>({language:oe(u.language)===d?Q(u.language)||J[d].language:J[d].language,...t(u.content,"string")?{content:u.content}:{},...t(u.contentUrl,"string")?{contentUrl:u.contentUrl}:{},...t(u.selector,"string")?{selector:u.selector}:{}}),y=u=>({...u&&t(u.language,"string")?{language:u.language}:{},...u&&t(u.content,"string")?{content:u.content}:{},...u&&t(u.contentUrl,"string")?{contentUrl:u.contentUrl}:{},...u&&t(u.selector,"string")?{selector:u.selector}:{}}),h=u=>({...J.tools,...u&&Array.isArray(u.enabled)?{enabled:u.enabled.filter(d=>o.includes(d))}:{...u&&u.enabled==null&&u.status==="none"?{enabled:[]}:{enabled:J.tools.enabled}},...u&&u.active!=null&&s(o,u.active)&&(typeof u.enabled=="string"||u.enabled==null||Array.isArray(u.enabled)&&s(u.enabled,u.active))?{active:u.active}:{active:J.tools.active},...u&&u.status!=null&&s(a,u.status)?{status:u.status}:{status:J.tools.status}});return{...t(e.title,"string")?{title:e.title}:{},...t(e.description,"string")?{description:e.description}:{},...t(e.tags,"array","string")?{tags:Yt(e.tags)}:{},...t(e.autoupdate,"boolean")?{autoupdate:e.autoupdate}:{},...t(e.autosave,"boolean")?{autosave:e.autosave}:{},...t(e.delay,"number")?{delay:Number(e.delay)}:{},...t(e.formatOnsave,"boolean")?{formatOnsave:e.formatOnsave}:{},...s(r,e.mode)?{mode:e.mode}:{},...s(n,e.theme)?{theme:e.theme}:{},...t(e.recoverUnsaved,"boolean")?{recoverUnsaved:e.recoverUnsaved}:{},...t(e.welcome,"boolean")?{welcome:e.welcome}:{},...t(e.showSpacing,"boolean")?{showSpacing:e.showSpacing}:{},...t(e.readonly,"boolean")?{readonly:e.readonly}:{},...t(e.allowLangChange,"boolean")?{allowLangChange:e.allowLangChange}:{},...s(c,e.activeEditor)?{activeEditor:e.activeEditor}:{},...t(e.languages,"array","string")?{languages:Yt(e.languages)}:{},...m(e.markup)?{markup:g(e.markup,"markup")}:{},...m(e.style)?{style:g(e.style,"style")}:{},...m(e.script)?{script:g(e.script,"script")}:{},...t(e.tools,"object")?{tools:h(e.tools)}:{},...t(e.tests,"object")?{tests:y(e.tests)}:{},...s(p,Number(e.zoom))?{zoom:Number(e.zoom)}:{},...t(e.stylesheets,"array","string")?{stylesheets:Yt(e.stylesheets)}:{},...t(e.scripts,"array","string")?{scripts:Yt(e.scripts)}:{},...t(e.cssPreset,"string")?{cssPreset:e.cssPreset}:{},...t(e.processors,"array","string")?{processors:Yt(e.processors)}:{},...t(e.customSettings,"object")?{customSettings:e.customSettings}:{},...s(l,e.editor)?{editor:e.editor}:{},...t(e.fontFamily,"string")?{fontFamily:e.fontFamily}:{},...t(e.fontSize,"number")?{fontSize:Number(e.fontSize)}:{},...t(e.useTabs,"boolean")?{useTabs:e.useTabs}:{},...t(e.tabSize,"number")?{tabSize:Number(e.tabSize)}:{},...t(e.lineNumbers,"boolean")?{lineNumbers:e.lineNumbers}:{},...t(e.wordWrap,"boolean")?{wordWrap:e.wordWrap}:{},...t(e.closeBrackets,"boolean")?{closeBrackets:e.closeBrackets}:{},...t(e.semicolons,"boolean")?{semicolons:e.semicolons}:{},...t(e.singleQuote,"boolean")?{singleQuote:e.singleQuote}:{},...t(e.trailingComma,"boolean")?{trailingComma:e.trailingComma}:{},...t(e.emmet,"boolean")?{emmet:e.emmet}:{},...s(i,e.editorMode)?{editorMode:e.editorMode}:{},...t(e.imports,"object")?{imports:e.imports}:{},...t(e.types,"object")?{types:e.types}:{},...t(e.version,"string")?{version:e.version}:{}}};var Yf=J,E=()=>Mt(Yf),qe=e=>{Yf=Mt(e)},tt=e=>Mt({title:e.title,description:e.description,tags:e.tags,activeEditor:e.activeEditor,languages:e.languages,markup:e.markup,style:e.style,script:e.script,stylesheets:e.stylesheets,scripts:e.scripts,cssPreset:e.cssPreset,processors:e.processors,customSettings:e.customSettings,imports:e.imports,types:e.types,tests:e.tests,version:e.version}),so=e=>({autoupdate:e.autoupdate,autosave:e.autosave,delay:e.delay,formatOnsave:e.formatOnsave,recoverUnsaved:e.recoverUnsaved,welcome:e.welcome,showSpacing:e.showSpacing,theme:e.theme,...It(e),...ro(e)}),It=e=>({editor:e.editor??(e.readonly===!0?"codejar":void 0),fontFamily:e.fontFamily,fontSize:e.fontSize,useTabs:e.useTabs,tabSize:e.tabSize,lineNumbers:e.lineNumbers,wordWrap:e.wordWrap,closeBrackets:e.closeBrackets,emmet:e.emmet,editorMode:e.editorMode}),ro=e=>({useTabs:e.useTabs,tabSize:e.tabSize,semicolons:e.semicolons,singleQuote:e.singleQuote,trailingComma:e.trailingComma}),rs=e=>Xf(Kf(e));var yn={github:/^(?:(?:http|https):\/\/)?github.com\/(?:.*)/g,githubGist:/^(?:(?:http|https):\/\/)?gist.github.com(?:\/\S*)?\/(\w+)/g,gitlab:/^(?:(?:http|https):\/\/)?gitlab.com\/(?:.*)/g,codepen:/^(?:(?:http|https):\/\/)?codepen.io\/(\w+)\/pen\/(\w+)/g,jsbin:/^(?:(?:(?:http|https):\/\/)?(?:\w+.)?)?jsbin.com\/((\w)+(\/\d)?)(?:.*)/g};var Qf=(e,t=new RegExp(yn.github))=>{if(t.test(e))try{let r=YS(e).pathname.split("/");return r[3]==="tree"||r.length===3}catch{return}},YS=e=>e.startsWith("https://")?new URL(e):new URL("https://"+e);var QS=(e,t=new RegExp(yn.github))=>{if(t.test(e))try{return ZS(e).pathname.split("/")[3]==="blob"}catch{return}},Zf=e=>Qf(e)||QS(e),ZS=e=>e.startsWith("https://")?new URL(e):new URL("https://"+e);var eh=()=>{let e={},t=async n=>{let i="",o=Object.keys(n)[0],a=Object.values(n)[0],l=typeof a=="string"?a:a.url,c=typeof a=="string"||a.declareAsModule===!0;if(l)try{let m=await(await fetch(l)).text();i=c?`declare module '${o}' {${m}}`:m}catch{i=`declare module '${o}': any`}return e={...e,...n},{filename:`file:///node_modules/${o}/index.d.ts`,content:i}},s=n=>Promise.all(Object.keys(n).map(i=>t({[i]:n[i]})));return{load:async(n,i,o=!1)=>{let l=qt(n).reduce((g,y)=>{let h,u=Object.keys(e).find(b=>y===b)||Object.keys(e).find(b=>y.startsWith(b+"/"))&&!Object.keys(i).find(b=>y===b),d=Object.keys(i).find(b=>y===b)||Object.keys(i).find(b=>y.startsWith(b+"/"));return u&&!o?h={}:d?h={[d]:i[d]}:h={[y]:""},{...g,...h}},{}),c=Object.keys(l).filter(g=>l[g]===""),p=await Dm.getTypeUrls(c),m=vp(i,(g,y)=>(!Object.keys(e).includes(y)||o)&&typeof g!="string"&&g.autoload===!0);return s({...l,...p,...m})}}};var th={"@testing-library/dom":A+"@testing-library/dom.js","@testing-library/jest-dom":A+"@testing-library/jest-dom.js","@testing-library/react":A+"@testing-library/react.js",chai:Ap};var sh=async({code:e,config:t,forExport:s,template:r,baseUrl:n,singleFile:i,runTests:o,compileInfo:a})=>{let l=Ss(n),p=new DOMParser().parseFromString(r,"text/html");if(s)p.querySelector("script")?.remove();else{let w=p.createElement("script");w.src=l+"result-utils.a838b33c947a1f0351fea5c7aafbba54.js",p.head.appendChild(w)}if(p.title=t.title,t.customSettings.htmlClasses&&p.documentElement.classList.add(...t.customSettings.htmlClasses.split(" ")),t.customSettings.head&&(p.head.innerHTML+=t.customSettings.head),t.cssPreset){let w=Xm.find(_=>_.id===t.cssPreset)?.url;if(w){let _=p.createElement("link");_.rel="stylesheet",_.id="__livecodes__css-preset",_.href=Ss(w,l),p.head.appendChild(_)}}if(t.stylesheets.forEach(w=>{let _=p.createElement("link");_.rel="stylesheet",_.href=w,p.head.appendChild(_)}),i){let w=e.style.compiled,_=p.createElement("style");_.id="__livecodes_styles__",_.innerHTML=w,p.head.appendChild(_)}else{let w=p.createElement("link");w.rel="stylesheet",w.href="./style.css",p.head.appendChild(w)}let m=e.markup.compiled;p.body.innerHTML+=m,e.script.language==="blockly"&&p.querySelectorAll('script[type="blockly/script"], script[data-type="blockly/script"], xml[type="blockly/xml"], xml[data-type="blockly/xml"]').forEach(_=>_.remove());let g=["markup","style","script"].map(w=>({language:e[w].language,compiled:e[w].compiled})),y=o&&e.tests?.compiled||"",h=qt(m).includes("./script")||o&&!s&&qt(y).includes("./script"),u={};for(let{language:w,compiled:_}of g){let f=et(w);if(!f)continue;if((typeof f.styles=="function"?f.styles({compiled:_,baseUrl:l,config:t}):f.styles||[]).forEach(U=>{let I=p.createElement("link");I.rel="stylesheet",I.href=xs(U)?l+U:U,p.head.appendChild(I)}),(typeof f.scripts=="function"?f.scripts({compiled:_,baseUrl:l,config:t}):f.scripts||[]).forEach(U=>{let I=p.createElement("script");I.src=xs(U)?l+U:U,f.deferScripts&&(I.defer=!0),U.includes("-script-esm.")&&(I.type="module"),p.head.appendChild(I)}),f.inlineScript){typeof f.inlineScript=="function"&&(f.inlineScript=await f.inlineScript({baseUrl:n}));let U=document.createElement("script");U.innerHTML=f.inlineScript,p.head.appendChild(U)}f.imports&&(u={...u,...Xs(f.imports,U=>Ss(U,n))})}let d=At(e.style.language),x={...t.customSettings.mapImports===!1?{}:{...rr(e.script.compiled)?fn(e.script.compiled,t):{},...rr(e.markup.compiled)?fn(e.markup.compiled,t):{},...o&&!s&&rr(y)?fn(y,t):{},...h?{"./script":"data:text/javascript;base64,"+btoa(e.script.compiled)}:{},...Yi(e.script.compiled,e.style.compiled,a.cssModules,d),...Yi(e.markup.compiled,e.style.compiled,a.cssModules,d)},...u,...o?th:{},...t.imports,...t.customSettings.imports};if(Object.keys(x).length>0){let w=p.createElement("script");w.src=De.getUrl(Rp,Qt()),w.async=!0,p.head.appendChild(w);let _=p.createElement("script");_.type="importmap",_.innerHTML=`{"imports": ${JSON.stringify(x,null,2)}}`,p.head.appendChild(_)}if(t.scripts.forEach(w=>{let _=p.createElement("script");_.src=w,p.head.appendChild(_)}),!h){let w=e.script.compiled,_=p.createElement("script");i?_.innerHTML=ki(w):_.src="./script.js",p.body.appendChild(_);let f=et(e.script.language)?.scriptType;f?_.type=f:t.customSettings.scriptType!=null?t.customSettings.scriptType&&(_.type=t.customSettings.scriptType):$m(w)&&(_.type="module")}if(t.showSpacing&&!s){let w=p.createElement("script");w.src=Au,p.body.appendChild(w)}if(o&&!s){let w=p.createElement("script");w.src=gu,p.body.appendChild(w);let _=p.createElement("script");_.type="module",_.innerHTML=`
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

${ki(y)}

window.jestLite.core.run().then(results => {
  parent.postMessage({type: 'testResults', payload: {results}}, '*');
}).catch((error) => {
  parent.postMessage({type: 'testResults', payload: {error: error.message || String(error)}}, '*');
});
    `,p.body.appendChild(_)}return`<!DOCTYPE html>
`+p.documentElement.outerHTML};var rh=()=>document.querySelector("#toolbar"),nr=()=>document.querySelector("#project-title"),nh=()=>document.querySelector("#editor-container"),ih=()=>document.querySelector("#editors"),oh=()=>document.querySelector("#markup"),ah=()=>document.querySelector("#style"),lh=()=>document.querySelector("#script"),ch=()=>document.querySelector("#output"),Ht=()=>document.querySelector("#result"),ns=()=>document.querySelector("#result > iframe"),no=()=>document.querySelector("#editor-container .gutter"),io=()=>document.querySelector("#logo a"),oo=()=>document.querySelector("#run-button"),ao=()=>document.querySelector("#code-run-button"),vn=()=>document.querySelector("#editor-tools"),ph=()=>document.querySelector("#editor-tools #copy-btn"),uh=()=>document.querySelector("#editor-tools #undo-btn"),dh=()=>document.querySelector("#editor-tools #redo-btn"),ir=()=>document.querySelector("#editor-tools #format-btn"),mh=()=>document.querySelector("#editor-mode"),fh=()=>document.querySelector("#editor-tools #editor-status"),lo=()=>document.querySelector("#editor-tools #external-resources-btn");var hh=()=>document.querySelector("#result-button"),gh=()=>document.querySelector("#fullscreen-button"),co=()=>document.querySelectorAll(".editor-title:not(.hidden)"),_h=()=>document.querySelectorAll("#editors > .editor"),Us=()=>document.querySelector("#output #tools-pane"),yh=()=>document.querySelector("#output #tools-pane-bar"),bn=()=>document.querySelector("#tools-pane-buttons"),vh=()=>document.querySelector("#tools-pane-titles"),bh=()=>document.querySelector("#tools-pane-loading"),wh=()=>document.querySelector("#zoom-button #zoom-value"),xh=()=>document.querySelector("#modal #prompt-save-btn"),Sh=()=>document.querySelector("#modal #prompt-donot-save-btn"),Lh=()=>document.querySelector("#modal #prompt-cancel-btn"),Eh=()=>document.querySelector("#modal #prompt-recover-btn"),kh=()=>document.querySelector("#modal #prompt-save-previous-btn"),Th=()=>document.querySelector("#modal #prompt-cancel-recover-btn"),po=()=>document.querySelector("#modal #unsaved-project-name"),Ch=()=>document.querySelector("#modal #unsaved-project-last-modified"),jh=()=>document.querySelector("#modal #disable-recover-checkbox"),Mh=()=>document.querySelectorAll("#select-editor .language-item a"),Uh=()=>document.querySelectorAll("#select-editor .language-menu-button"),Ah=()=>document.querySelector("#style-selector .dropdown-menu");var uo=()=>document.querySelector("#login-link"),mo=()=>document.querySelector("#logout-link");var Ph=()=>document.querySelector("#external-resources-link");var Oh=()=>document.querySelector("#settings-menu input#autoupdate"),qh=()=>document.querySelector("#settings-menu #delay-value"),Rh=()=>document.querySelector("#settings-menu input#delay-range"),Ih=()=>document.querySelector("#settings-menu input#autosave"),Hh=()=>document.querySelector("#settings-menu input#autosync"),Bh=()=>document.querySelector("#settings-menu input#formatOnsave"),Dh=()=>document.querySelectorAll("#style-selector input");var Nh=()=>document.querySelector("#settings-menu input#theme"),$h=()=>document.querySelector("#settings-menu input#welcome"),Fh=()=>document.querySelector("#settings-menu input#recover-unsaved"),zh=()=>document.querySelector("#settings-menu input#show-spacing"),Wh=()=>document.querySelectorAll("#css-preset-menu a");var Gh=()=>document.querySelector("#test-container #run-tests-btn"),wn=()=>document.querySelector("#test-container #watch-tests-btn");var Jh=(e=document)=>e.querySelector("#modal #welcome-recover");var or=tt(J),Vh={...or,markup:{...or.markup,compiled:"",modified:""},style:{...or.style,compiled:"",modified:""},script:{...or.script,compiled:"",modified:""},tests:{language:"javascript",...or.tests,compiled:""},result:"",styleOnlyUpdate:!1},ne=Vh,Te=()=>({...ne}),fo=(e=Vh)=>{ne={...e,markup:{modified:e.markup.compiled===ne.markup.compiled?ne.markup.modified:"",...e.markup},style:{modified:e.style.compiled===ne.style.compiled?ne.style.modified:"",...e.style},script:{modified:e.script.compiled===ne.script.compiled?ne.script.modified:"",...e.script},tests:{language:"javascript",compiled:"",...e.tests},result:e.result||""}},ar=(e,t,s)=>{ne[e].language===t&&(ne[e].modified=s)},ho=()=>({markup:{language:ne.markup.language,content:ne.markup.content||"",compiled:ne.markup.modified||ne.markup.compiled||""},style:{language:ne.style.language,content:ne.style.content||"",compiled:ne.style.modified||ne.style.compiled||""},script:{language:ne.script.language,content:ne.script.content||"",compiled:ne.script.modified||ne.script.compiled||""},result:ne.result||""});var lr=(e,t)=>{let s={...e};return t.forEach(r=>delete s[r]),s},Kh=(e,t)=>{let s=["activeEditor","title","description","tests"],r=["compiled","modified"],n={...lr(e,["result","styleOnlyUpdate",...s]),markup:lr(e.markup,r),style:lr(e.style,r),script:lr(e.script,r)},i=lr(t,s);return JSON.stringify(n)===JSON.stringify(i)};var Xh=(e="Loading...")=>{let t=document.createElement("div");return t.innerHTML=e,t.classList.add("modal-message"),t};var Yh=e=>{let t=uo();t&&(t.style.display="none");let s=mo();if(s){let r=e.displayName||e.username;s.innerHTML="Log out",s.classList.add("hint--bottom"),s.dataset.hint="Logged in as "+r,s.style.display="block"}};var We=typeof window<"u"?window:null,_o=We===null,pr=_o?void 0:We.document,st="addEventListener",rt="removeEventListener",go="getBoundingClientRect",cr="_a",nt="_b",Et="_c",xn="horizontal",it=function(){return!1},rL=_o?"calc":["","-webkit-","-moz-","-o-"].filter(function(e){var t=pr.createElement("div");return t.style.cssText="width:"+e+"calc(9px)",!!t.style.length}).shift()+"calc",Zh=function(e){return typeof e=="string"||e instanceof String},Qh=function(e){if(Zh(e)){var t=pr.querySelector(e);if(!t)throw new Error("Selector "+e+" did not match a DOM element");return t}return e},Ue=function(e,t,s){var r=e[t];return r!==void 0?r:s},Sn=function(e,t,s,r){if(t){if(r==="end")return 0;if(r==="center")return e/2}else if(s){if(r==="start")return 0;if(r==="center")return e/2}return e},nL=function(e,t){var s=pr.createElement("div");return s.className="gutter gutter-"+t,s},iL=function(e,t,s){var r={};return Zh(t)?r[e]=t:r[e]=rL+"("+t+"% - "+s+"px)",r},oL=function(e,t){var s;return s={},s[e]=t+"px",s},aL=function(e,t){if(t===void 0&&(t={}),_o)return{};var s=e,r,n,i,o,a,l;Array.from&&(s=Array.from(s));var c=Qh(s[0]),p=c.parentNode,m=getComputedStyle?getComputedStyle(p):null,g=m?m.flexDirection:null,y=Ue(t,"sizes")||s.map(function(){return 100/s.length}),h=Ue(t,"minSize",100),u=Array.isArray(h)?h:s.map(function(){return h}),d=Ue(t,"maxSize",1/0),b=Array.isArray(d)?d:s.map(function(){return d}),x=Ue(t,"expandToMin",!1),w=Ue(t,"gutterSize",10),_=Ue(t,"gutterAlign","center"),f=Ue(t,"snapOffset",30),T=Array.isArray(f)?f:s.map(function(){return f}),L=Ue(t,"dragInterval",1),U=Ue(t,"direction",xn),I=Ue(t,"cursor",U===xn?"col-resize":"row-resize"),Le=Ue(t,"gutter",nL),ge=Ue(t,"elementStyle",iL),pe=Ue(t,"gutterStyle",oL);U===xn?(r="width",n="clientX",i="left",o="right",a="clientWidth"):U==="vertical"&&(r="height",n="clientY",i="top",o="bottom",a="clientHeight");function W(O,C,M,q){var ke=ge(r,C,M,q);Object.keys(ke).forEach(function(ue){O.style[ue]=ke[ue]})}function me(O,C,M){var q=pe(r,C,M);Object.keys(q).forEach(function(ke){O.style[ke]=q[ke]})}function P(){return l.map(function(O){return O.size})}function $(O){return"touches"in O?O.touches[0][n]:O[n]}function K(O){var C=l[this.a],M=l[this.b],q=C.size+M.size;C.size=O/this.size*q,M.size=q-O/this.size*q,W(C.element,C.size,this[nt],C.i),W(M.element,M.size,this[Et],M.i)}function le(O){var C,M=l[this.a],q=l[this.b];this.dragging&&(C=$(O)-this.start+(this[nt]-this.dragOffset),L>1&&(C=Math.round(C/L)*L),C<=M.minSize+M.snapOffset+this[nt]?C=M.minSize+this[nt]:C>=this.size-(q.minSize+q.snapOffset+this[Et])&&(C=this.size-(q.minSize+this[Et])),C>=M.maxSize-M.snapOffset+this[nt]?C=M.maxSize+this[nt]:C<=this.size-(q.maxSize-q.snapOffset+this[Et])&&(C=this.size-(q.maxSize+this[Et])),K.call(this,C),Ue(t,"onDrag",it)(P()))}function Qe(){var O=l[this.a].element,C=l[this.b].element,M=O[go](),q=C[go]();this.size=M[r]+q[r]+this[nt]+this[Et],this.start=M[i],this.end=M[o]}function ut(O){if(!getComputedStyle)return null;var C=getComputedStyle(O);if(!C)return null;var M=O[a];return M===0?null:(U===xn?M-=parseFloat(C.paddingLeft)+parseFloat(C.paddingRight):M-=parseFloat(C.paddingTop)+parseFloat(C.paddingBottom),M)}function Oe(O){var C=ut(p);if(C===null||u.reduce(function(ue,Be){return ue+Be},0)>C)return O;var M=0,q=[],ke=O.map(function(ue,Be){var Kt=C*ue/100,Zr=Sn(w,Be===0,Be===O.length-1,_),en=u[Be]+Zr;return Kt<en?(M+=en-Kt,q.push(0),en):(q.push(Kt-en),Kt)});return M===0?O:ke.map(function(ue,Be){var Kt=ue;if(M>0&&q[Be]-M>0){var Zr=Math.min(M,q[Be]-M);M-=Zr,Kt=ue-Zr}return Kt/C*100})}function N(){var O=this,C=l[O.a].element,M=l[O.b].element;O.dragging&&Ue(t,"onDragEnd",it)(P()),O.dragging=!1,We[rt]("mouseup",O.stop),We[rt]("touchend",O.stop),We[rt]("touchcancel",O.stop),We[rt]("mousemove",O.move),We[rt]("touchmove",O.move),O.stop=null,O.move=null,C[rt]("selectstart",it),C[rt]("dragstart",it),M[rt]("selectstart",it),M[rt]("dragstart",it),C.style.userSelect="",C.style.webkitUserSelect="",C.style.MozUserSelect="",C.style.pointerEvents="",M.style.userSelect="",M.style.webkitUserSelect="",M.style.MozUserSelect="",M.style.pointerEvents="",O.gutter.style.cursor="",O.parent.style.cursor="",pr.body.style.cursor=""}function fe(O){if(!("button"in O&&O.button!==0)){var C=this,M=l[C.a].element,q=l[C.b].element;C.dragging||Ue(t,"onDragStart",it)(P()),O.preventDefault(),C.dragging=!0,C.move=le.bind(C),C.stop=N.bind(C),We[st]("mouseup",C.stop),We[st]("touchend",C.stop),We[st]("touchcancel",C.stop),We[st]("mousemove",C.move),We[st]("touchmove",C.move),M[st]("selectstart",it),M[st]("dragstart",it),q[st]("selectstart",it),q[st]("dragstart",it),M.style.userSelect="none",M.style.webkitUserSelect="none",M.style.MozUserSelect="none",M.style.pointerEvents="none",q.style.userSelect="none",q.style.webkitUserSelect="none",q.style.MozUserSelect="none",q.style.pointerEvents="none",C.gutter.style.cursor=I,C.parent.style.cursor=I,pr.body.style.cursor=I,Qe.call(C),C.dragOffset=$(O)-C.end}}y=Oe(y);var Ee=[];l=s.map(function(O,C){var M={element:Qh(O),size:y[C],minSize:u[C],maxSize:b[C],snapOffset:T[C],i:C},q;if(C>0&&(q={a:C-1,b:C,dragging:!1,direction:U,parent:p},q[nt]=Sn(w,C-1===0,!1,_),q[Et]=Sn(w,!1,C===s.length-1,_),g==="row-reverse"||g==="column-reverse")){var ke=q.a;q.a=q.b,q.b=ke}if(C>0){var ue=Le(C,U,M.element);me(ue,w,C),q[cr]=fe.bind(q),ue[st]("mousedown",q[cr]),ue[st]("touchstart",q[cr]),p.insertBefore(ue,M.element),q.gutter=ue}return W(M.element,M.size,Sn(w,C===0,C===s.length-1,_),C),C>0&&Ee.push(q),M});function Qr(O){var C=O.i===Ee.length,M=C?Ee[O.i-1]:Ee[O.i];Qe.call(M);var q=C?M.size-O.minSize-M[Et]:O.minSize+M[nt];K.call(M,q)}l.forEach(function(O){var C=O.element[go]()[r];C<O.minSize&&(x?Qr(O):O.minSize=C)});function Jx(O){var C=Oe(O);C.forEach(function(M,q){if(q>0){var ke=Ee[q-1],ue=l[ke.a],Be=l[ke.b];ue.size=C[q-1],Be.size=M,W(ue.element,ue.size,ke[nt],ue.i),W(Be.element,Be.size,ke[Et],Be.i)}})}function Vx(O,C){Ee.forEach(function(M){if(C!==!0?M.parent.removeChild(M.gutter):(M.gutter[rt]("mousedown",M[cr]),M.gutter[rt]("touchstart",M[cr])),O!==!0){var q=ge(r,M.a.size,M[nt]);Object.keys(q).forEach(function(ke){l[M.a].element.style[ke]="",l[M.b].element.style[ke]=""})}})}return{setSizes:Jx,getSizes:P,collapse:function(C){Qr(l[C])},destroy:Vx,parent:p,pairs:Ee}},Ln=aL;var yo=()=>{let t=!1,s=Ln(["#editors","#output"],{minSize:[0,0],gutterSize:10,elementStyle:(a,l,c)=>(window.dispatchEvent(new Event(ze.resizeEditor)),{"flex-basis":`calc(${l}% - ${c}px)`}),gutterStyle:(a,l)=>({"flex-basis":`${l}px`}),onDragStart(){n(!1)},onDragEnd(){n(!0)}}),r=document.querySelector(".gutter");if(r){let a=document.createElement("div");a.id="handle",r.appendChild(a)}let n=a=>{let l=document.querySelector("#editors"),c=document.querySelector("#output");!c||!l||(a?(l.style.transition="flex-basis 0.5s",c.style.transition="flex-basis 0.5s"):(l.style.transition="none",c.style.transition="none"))},i=(a,l=!1)=>{let c=window.innerWidth<800,p=c||l?[100,0]:[50,50],m=c||l?[0,100]:[50,50];a==="code"&&(s.getSizes()[0]<10||l)?s.setSizes(p):a==="output"&&(s.getSizes()[1]<10||l)&&(s.getSizes()[0]<10?s.setSizes(p):s.setSizes(m))},o=(a,l)=>{t||(s.destroy(a,l),t=!0)};return n(!0),{show:i,destroy:o}};var eg=(e,t,s,r,n,i)=>{let o,a,l,c=()=>{if(o)return;let u=Us(),d=document.createElement("div");d.id="compiled-code-container",u.appendChild(d),o=document.createElement("div"),o.id="compiled-code",d.appendChild(o);let b=bn();b&&(l=document.createElement("div"),l.id="compiled-code-language-label",l.style.display="none",b.prepend(l))},p=(u=!1)=>{if(a&&!u)return a;let d={baseUrl:t,container:o,language:"javascript",value:"",readonly:!0,mode:e.mode,editorId:"compiled",theme:e.theme,isEmbed:n,mapLanguage:Pt,getLanguageExtension:At,getFormatterConfig:()=>({}),getFontFamily:ks,...It(e)};return Rt(d)},m=(u,d)=>{if(u==="javascript"&&window.monaco&&a.monaco){a?.setValue(d+`
export {}`);let b=a.monaco,x=b.getModel()?.getLineCount()||1;b.setHiddenAreas([]),b.setHiddenAreas([new window.monaco.Range(x+1,0,x+2,0)])}},g=(u,d,b)=>{if(a&&(a.setLanguage(u,d),m(u,d),l)){let x=Me.find(_=>_.name===b),w=x?.longTitle||x?.title||b||"";l.innerHTML=w}},y=async()=>{c(),a=await p()};return{name:"compiled",title:"Compiled",load:y,onActivate:()=>{l&&(l.style.display="unset")},onDeactivate:()=>{l&&(l.style.display="none")},getEditor:()=>a,update:g,reloadEditor:async u=>{if(e=u,!o){await y();return}a?.destroy(),a=await p(!0)}}};var Yc=_p(_x());var yx=(e,t,s,r,n,i)=>{let o,a,l,c="#result > iframe",p,m=[],g=-1,y=()=>{document.activeElement instanceof HTMLElement&&document.activeElement.blur()},h=f=>{let T=f.substr(1,4);if(["html","head"].includes(T))return f;if(T==="body"){let U=document.createElement(T);return U.innerHTML=f,U}let L=document.createElement("template");return f=f.trim(),L.innerHTML=f,L.content.firstChild},u=f=>f.map(T=>T.type==="element"?h(T.content):T.content),d=()=>o?(o.destroy(),o=new Yc.default(l),o):(o=new Yc.default(l),r.addEventListener(window,"message",f=>{if(!l||f.origin!==Ot.getOrigin()||f.data.type!=="console")return;let T=f.data;["output","log","error","info","warn","dir","time","timeLog","timeEnd","clear","count","countReset","assert","table","group","groupCollapsed","groupEnd"].includes(T.method)&&o[T.method](...u(T.args))}),o),b=async(f=!1)=>{if(a&&!f)return a;let T=document.querySelector("#console-input");if(!T)throw new Error("Console input container not found");let L={baseUrl:t,container:T,language:"javascript",value:"",readonly:!1,mode:e.mode,editorId:"console",theme:e.theme,isEmbed:n,mapLanguage:Pt,getLanguageExtension:At,getFormatterConfig:()=>({}),getFontFamily:ks,...It(e)},U=await Rt(L);U.addKeyBinding("exec",U.keyCodes.Enter,()=>{let W=U.getValue(),me=document.querySelector(c);o.insert({type:"input",args:[W],ignoreFilter:!0}),me.contentWindow?.postMessage({console:W},"*"),m.push(W),U.setValue("",!1),g=-1}),U.addKeyBinding("prev",U.keyCodes.UpArrow,()=>{let W=g===-1?m.length:g;g=W===0?0:W-1,U.setValue(m[g])}),U.addKeyBinding("next",U.keyCodes.DownArrow,()=>{let W=g===-1?m.length-1:g;g=W===m.length-1?-1:W+1,U.setValue(m[g]||"")});let I=25;if(T.style.minHeight=I+"px",U.onContentChanged(()=>{if(!U.monaco)return;let W=U.monaco.getContentHeight()<I?I:U.monaco.getContentHeight()*2;T.style.height=W+"px"}),a)return U;new MutationObserver(()=>{let W=l.querySelectorAll(".luna-console-input pre.luna-console-code:not(.visible)");W.length!==0&&W.forEach(me=>{let P=/(luna-console-)(?!keyword|string|operator|number|json|hidden)/g;me.innerHTML=me.innerHTML.replace(P,""),me.classList.add("visible")})}).observe(l,{subtree:!0,childList:!0});let ge=U.monaco?".glyph-margin":".cm-gutters",pe=document.querySelector("#console-input "+ge);if(pe){let W=document.createElement("div");W.id="console-input-indicator",W.innerHTML='<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: top;"><g><path d="m16.6 10l10 10-10 10-2.3-2.3 7.7-7.7-7.7-7.7z"></path></g></svg>',pe.appendChild(W)}return U},x=()=>{if(l)return;let f=Us(),T=document.createElement("div");T.id="console-container",f.appendChild(T),l=document.createElement("div"),l.id="console",T.appendChild(l);let L=document.createElement("div");L.id="console-input",T.appendChild(L);let U=bn();if(U){let I=document.createElement("span");I.classList.add("hint--top-left"),I.dataset.hint="Clear console",p=document.createElement("button"),p.classList.add("clear-button"),p.style.display="none",r.addEventListener(p,"click",()=>{o.clear()},!1),r.addEventListener(p,"touchstart",()=>{o.clear()},!1),I.appendChild(p),U.prepend(I)}},w=async()=>{x(),o=d(),!(e.readonly||e.mode==="codeblock"||e.mode==="editor")&&(a=await b())};return{name:"console",title:"Console",load:w,onActivate:()=>{!Ks()&&!n&&a?.focus(),p&&(p.style.display="unset")},onDeactivate:()=>{y(),p&&(p.style.display="none")},getEditor:()=>a,reloadEditor:async f=>{if(e=f,!a){await w();return}a?.destroy(),a=await b(!0)},log:(...f)=>o?.log(...f),info:(...f)=>o?.info(...f),table:(...f)=>o?.table(...f),warn:(...f)=>o?.warn(...f),error:(...f)=>o?.error(...f),clear:()=>o?.clear(),evaluate:f=>o?.evaluate(f)}};var vx='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Play</title><path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>',bx='<svg xmlns="http://www.w3.org/2000/svg" class="checked" viewBox="0 0 512 512"><title>Checkbox</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 176L217.6 336 160 272"/><rect x="64" y="64" width="384" height="384" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>',xx='<svg xmlns="http://www.w3.org/2000/svg" class="unchecked" viewBox="0 0 512 512"><title>Square</title><path d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>',Sx='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Refresh</title><path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 58l80 80-80 80"/></svg>',Lx='<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';var Ex=(e,t,s,r,n,i)=>{let o,a='<div class="test-summary">Loading tests...</div>',l=()=>{if(o)return;let g=Us(),y=document.createElement("div");y.id="test-container",g.appendChild(y);let h=document.createElement("div");h.id="test-actions",h.classList.add("buttons"),h.innerHTML=`
    <a id="run-tests-btn" href="#" class="button hint--top" data-hint="Ctrl/Cmd + Alt + T">
      ${vx} Run
    </a>
    <a id="watch-tests-btn" href="#" class="button disabled hint--top" data-hint="Run tests when code changes">
      ${bx} ${xx} Watch
    </a>
    <a id="reset-tests-btn" href="#" class="button">${Sx} Reset</a>
    ${n?"":'<a id="edit-tests-btn" href="#" class="button">'+Lx+" Edit</a>"}
    `,y.appendChild(h),o=document.createElement("div"),o.id="test-results",o.classList.add("luna-console"),o.innerHTML=a,y.appendChild(o),r.addEventListener(document.querySelector("#reset-tests-btn"),"click",u=>{u.preventDefault(),c()})},c=()=>{o.querySelectorAll(".test-result").forEach(y=>{y.querySelectorAll(".test-error").forEach(h=>h.remove()),y.classList.contains("pass")&&y.classList.remove("pass"),y.classList.contains("fail")&&y.classList.remove("fail")});let g=o.querySelector(".test-summary");g&&(g.innerText="")};return{name:"tests",title:"Tests",load:async()=>{l()},onActivate:()=>{i()},onDeactivate:()=>{},showResults:({results:g,error:y})=>{if(o||l(),o.innerHTML="",y){o.innerHTML='<div class="no-tests"><span class="fail">Test error!</span></div>';return}if(g.length===0){o.innerHTML='<div class="no-tests">This project has no tests!</div>';return}g.forEach(w=>{let _=document.createElement("div");_.innerText=w.testPath.filter(f=>f!=="ROOT_DESCRIBE_BLOCK").join(" \u203A "),_.classList.add("test-result",w.status),w.errors.map(f=>f.split("at Object.<anonymous>")[0]?.trim()).map(f=>f.startsWith("AssertionError: ")?f.replace("AssertionError: ",""):f).forEach(f=>{let T=document.createElement("pre");T.classList.add("test-error"),T.innerText=f,_.appendChild(T)}),o.appendChild(_)});let h=g.filter(w=>w.status==="pass").length,u=g.filter(w=>w.status==="fail").length,d=g.length,b=g.reduce((w,_)=>w+_.duration,0)/1e3,x=document.createElement("div");x.classList.add("test-summary"),x.innerHTML=`
    Tests: ${u!==0?'<span class="fail">'+u+" failed</span>,":""}
           ${h!==0?'<span class="pass">'+h+" passed</span>,":""}
           ${d} total <br />
    Time: ${b}s
`,o.prepend(x)},resetTests:c,clearTests:()=>{o&&(o.innerHTML=a)}}};var kx=(e,t,s,r,n,i)=>{let o,a,l=0,c=[{name:"console",factory:yx},{name:"compiled",factory:eg},{name:"tests",factory:Ex}],p=P=>e.tools.enabled==="all"||e.tools.enabled.includes(P.name),m=c.filter(p),y=((P,$,K,le,Qe,ut)=>m.map(Oe=>Oe.factory(P,$,K,le,Qe,ut)))(e,t,s,r,n,i),h=[...y],u=Ht(),d=30,b={closed:[100,0],open:[60,40],full:[0,100],none:[100,0],"":[100,0]},x=P=>{P?u.style.transition="height 0.5s":u.style.transition="none"},w=P=>{P?(o.collapse(1),u.style.minHeight="100%"):u.style.minHeight="unset"},_=P=>{l=P,document.querySelectorAll("#tools-pane-bar .tools-pane-title").forEach(($,K)=>{P===K?$.classList.add("active"):$.classList.remove("active")}),document.querySelectorAll("#tools-pane > div").forEach(($,K)=>{P===K?$.classList.add("active"):$.classList.remove("active")}),h.forEach(($,K)=>{P===K?$.onActivate():$.onDeactivate()})},f=()=>{let P=document.querySelector("#tools-pane-bar #tools-pane-buttons");o.getSizes()[0]>90?P.style.visibility="hidden":P.style.visibility==="hidden"&&(P.style.visibility="visible",h[l]?.onActivate())},T=(P,$=!1)=>{$?(o.collapse(0),a="full"):(o.setSizes(b.open),a="open"),f(),_(P)},L=()=>{o.collapse(1),a="closed",f(),h.forEach(P=>P.onDeactivate())},U=()=>{if(o)return o;o=Ln(["#result","#tools-pane"],{sizes:b.closed,gutterSize:d,direction:"vertical",elementStyle:(Oe,N,fe)=>({height:`calc(${N}% - ${fe}px)`}),gutterStyle:(Oe,N)=>({height:`${N}px`}),onDragStart(){x(!1)},onDragEnd(){x(!0)},onDrag(){f()}});let P=document.querySelector("#output .gutter");P.id="tools-pane-bar";let $=document.createElement("div");$.id="tools-pane-titles",P.appendChild($),h.forEach((Oe,N)=>{let fe=document.createElement("div");fe.dataset.id=String(N),fe.classList.add("tools-pane-title",Oe.name),fe.innerHTML=Oe.title,$.appendChild(fe);let Ee;r.addEventListener(fe,"click",Qr=>{Qr.detail===1&&(Ee=setTimeout(()=>{o.getSizes()[0]>90?T(N):fe.classList.contains("active")?L():_(N)},200))},!1),r.addEventListener(fe,"dblclick",()=>{clearTimeout(Ee),o.getSizes()[0]<10?L():T(N,!0)},!1),r.addEventListener(fe,"touchstart",()=>{o.getSizes()[0]>90?T(N):fe.classList.contains("active")?L():_(N)},{capture:!1,passive:!0})}),r.addEventListener(window,"resize",()=>{let Oe=document.querySelector("#tools-pane");Oe&&(o.getSizes()[0]<10?(u.style.height="0",Oe.style.height=`calc(100% - ${d}px)`):o.getSizes()[0]>90&&(u.style.height=`calc(100% - ${d}px)`,Oe.style.height="0"))},!1);let K=document.createElement("div");K.id="tools-pane-loading",K.style.display="none",P.appendChild(K);let le=document.createElement("div");le.id="tools-pane-buttons",P.appendChild(le);let Qe=document.createElement("span");Qe.classList.add("hint--top-left"),Qe.dataset.hint="Close";let ut=document.createElement("button");return ut.classList.add("delete-button"),r.addEventListener(ut,"click",()=>{L()},!1),r.addEventListener(ut,"touchstart",()=>{L()},!1),Qe.appendChild(ut),le.appendChild(Qe),o},I=P=>{w(P==="none"),P==="closed"?L():P==="full"?T(l,!0):P==="open"&&T(l),a=P,f()},Le=async()=>{let P=a===void 0;l=ge(e.tools.active),a=e.tools.status||"closed",P&&(o=U(),o.setSizes(b[a]),f(),a==="none"&&(yh().style.pointerEvents="none"),h.forEach(async $=>{await $.load()})),_(l)},ge=P=>{let $=h.findIndex(K=>K?.name===P);return $>-1?$:0},me={load:Le,open:()=>I("open"),close:()=>I("closed"),maximize:()=>I("full"),hide:()=>I("none"),getStatus:()=>a,getActiveTool:()=>h[l]?.name,setActiveTool:P=>_(ge(P)),disableTool:P=>{let $=h.findIndex(le=>le?.name===P);if($===-1)return;delete h[$],l===$&&_(h.findIndex(le=>le)),P in me&&delete me[P];let K=document.querySelector("#tools-pane-titles ."+P);K&&(K.classList.remove("active"),K.style.display="none"),h.filter(le=>le).length===0&&I("none")},enableTool:P=>{let $=y.findIndex(le=>le.name===P);if($===-1||h.find(le=>le?.name===P))return;h.filter(le=>le).length===0&&(I("closed"),_($)),me[P]=y[$],h[$]=y[$];let K=document.querySelector(".tools-pane-title."+P);K&&(K.style.display="flex")},...m.reduce((P,$,K)=>({...P,[$.name]:h[K]}),{})};return me};var RU={esm:"livecodes.js",umd:"livecodes.umd.js",react:"react.js",vue:"vue.js",types:"index.d.ts"},gi={getAppUrl:()=>"https://v4.livecodes.io/",getSDKUrl:(e="esm")=>`https://cdn.jsdelivr.net/npm/livecodes@0.0.2/${RU[e]}`};var he=Sm(),R=bm(),wt=ff(),Pe=hf(),Se=yo(),IU=eh(),sp=[],xe=_n(),Jt={x:0,y:0},de,X,_i,vs,Kr,F,bs,se,zs,xt,Tx=[],Vt,rp=!0,Ws=!1,Qc,yi,vi=!1,jx=!1,Zc=!1,bi={isBroadcasting:!1,channel:"",channelUrl:"",channelToken:"",broadcastSource:!1},ep=null,np=(e="markup")=>xt?.[e],ip=()=>Object.values(xt||{}),jt=()=>F[E().activeEditor||"markup"],HU=async e=>Si(e.activeEditor),BU=()=>Promise.all([Uu,hu,bu,wu].map(e=>Ls(e,void 0,"#app-styles"))),Mx=(e,t="",s=Ot)=>new Promise((r,n)=>{if(!e){n("Result container not found");return}let i=ns();i||(i=document.createElement("iframe"),i.name="result",i.id="result-frame",i.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),i.setAttribute("allowtransparency","true"),i.setAttribute("allowpaymentrequest","true"),i.setAttribute("allowfullscreen","true"),i.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts")),["codeblock","editor"].includes(E().mode)&&(t="");let o=np("script")||"javascript",a=an(Me,E(),de),l=`${E().markup.content}
      ${E().style.content}
      ${E().script.content}
      `,c=i.parentElement===e,p=c&&Te().styleOnlyUpdate,m=c&&a[o]?.liveReload&&Tx.includes(o)&&!l.includes("__livecodes_reload__");if(p){let h=new DOMParser().parseFromString(t,"text/html").querySelector("#__livecodes_styles__");if(h){let u=h.innerHTML;i.contentWindow?.postMessage({styles:u},s.getOrigin())}else i.contentWindow?.postMessage({result:t},s.getOrigin());r("loaded")}else if(m)i.contentWindow?.postMessage({result:t},s.getOrigin()),r("loaded");else{let g=!1;R.addEventListener(i,"load",function x(){if(R.removeEventListener(i,"load",x),!t||g){r("loaded");return}i.contentWindow?.postMessage({result:t},s.getOrigin()),g=!0,r("loaded")}),i.remove();let{markup:y,style:h,script:u}=E(),d=`?markup=${y.language}&style=${h.language}&script=${u.language}&isEmbed=${X}&isLoggedIn=${!!zs?.isLoggedIn()}`,b=xe.scrollPosition===!1||Jt.x===0&&Jt.y===0?"":`#livecodes-scroll-position:${Jt.x},${Jt.y}`;i.src=s.getResultUrl()+d+b,e.appendChild(i)}Tx=ip()}),op=async(e,t)=>{let s=t.script.language;if(e.script&&["typescript","javascript"].includes(Pt(s))&&typeof e.script.addTypes=="function"){let r={...et(s)?.types,...t.types,...t.customSettings.types};(await IU.load(E().script.content||"",r)).forEach(i=>e.script.addTypes?.(i))}},DU=(e,t)=>{document.querySelectorAll(`.dropdown-menu-${e} .language-item a`).forEach(r=>{r.dataset.lang===t?r.parentElement?.classList.add("active"):r.parentElement?.classList.remove("active")})},wi=(e,t)=>{let s=document.querySelector(`#${e}-selector span`),r=Q(t);!s||!r||(s.innerHTML=Me.find(n=>n.name===r)?.title||"",DU(e,r))},NU=()=>{let e=["markup","style","script"],t=`<span><img src="${de}assets/images/copy.svg" alt="copy"></span>`;e.forEach(s=>{let r=document.createElement("div");r.innerHTML=t,r.classList.add("copy-button","tool-buttons"),r.title="Copy",document.getElementById(s)?.appendChild(r),R.addEventListener(r,"click",()=>{Ti(F?.[s]?.getValue())&&(r.innerHTML=`<span><img src="${de}assets/images/tick.svg" alt="copied"></span>`,r.classList.add("hint--left","visible"),r.dataset.hint="Copied!",r.title="",setTimeout(()=>{r.innerHTML=t,r.classList.remove("hint--left","visible"),r.dataset.hint="",r.title="Copy"},2e3))})})},$U=async e=>{F&&(Object.values(F).forEach(l=>l.destroy()),WU());let t={baseUrl:de,mode:e.mode,readonly:e.readonly,theme:e.theme,...It(e),isEmbed:X,mapLanguage:Pt,getLanguageExtension:At,getFormatterConfig:()=>ro(E()),getFontFamily:ks},s={...t,container:oh(),editorId:"markup",language:$e(e.markup.language,e)?e.markup.language:e.languages?.find(l=>oe(l)==="markup")||"html",value:$e(e.markup.language,e)&&e.markup.content||""},r={...t,container:ah(),editorId:"style",language:$e(e.style.language,e)?e.style.language:e.languages?.find(l=>oe(l)==="style")||"css",value:$e(e.style.language,e)&&e.style.content||""},n={...t,container:lh(),editorId:"script",language:$e(e.script.language,e)?e.script.language:e.languages?.find(l=>oe(l)==="script")||"javascript",value:$e(e.script.language,e)&&e.script.content||""},i=await Rt(s),o=await Rt(r),a=await Rt(n);wi("markup",s.language),wi("style",r.language),wi("script",n.language),xt={markup:s.language,style:r.language,script:n.language},F={markup:i,style:o,script:a},Object.keys(F).forEach(async l=>{let c=xt?.[l]||"html";Ox(c),F[l].registerFormatter(await Kr.getFormatFn(c)),GU(l,F)}),e.mode==="codeblock"&&NU()};var FU=async(e,t)=>{let s=Object.keys(e);for(let r of s){let n=Q(t[r].language);n&&await lp(n,t[r].content,!0)}},Ux=e=>{let s={full:"111",editor:"110",codeblock:"010",result:"001"}[e.mode]||"111",r=rh(),n=nh(),i=ih(),o=ch(),a=Ht(),l=no(),c=oo(),p=ao(),m=vn(),g=s[0]==="1",y=s[1]==="1",h=s[2]==="1";r.style.display="flex",i.style.display="flex",a.style.display="flex",o.style.display="block",l.style.display="block",c.style.visibility="visible",p.style.visibility="visible",g||(r.style.display="none",n.style.height="100%"),y||(o.style.flexBasis="100%",i.style.display="none",Se?.destroy(!0),Se=null),h||(i.style.flexBasis="100%",o.style.display="none",a.style.display="none",p.style.display="none",Se?.destroy(!0),Se=null),(e.mode==="editor"||e.mode==="codeblock")&&(c.style.visibility="hidden",p.style.visibility="hidden"),e.mode==="codeblock"&&(m.style.display="none"),e.mode==="result"&&(["full","open","closed"].includes(se?.getStatus()||"")||se?.hide()),e.mode==="full"&&!Se&&(Se=yo()),window.dispatchEvent(new Event(ze.resizeEditor))},Si=(e="markup",t=!1)=>{let s=co();(()=>Array.from(s).map(a=>a.dataset.editor).includes(e))()||(e=s[0].dataset.editor||"markup"),s.forEach(a=>a.classList.remove("active")),document.getElementById(e+"-selector")?.classList.add("active"),_h().forEach(a=>a.style.display="none");let o=document.getElementById(e);o.style.display="block",o.style.visibility="visible",!X&&!t&&F[e]?.focus(),t||qe({...E(),activeEditor:e}),Xr(),(jx||xe.view!=="result")&&Se?.show("code"),zU(e)},zU=e=>{document.querySelectorAll("#editor-status > span[data-status]").forEach(s=>{s.dataset.status===e?(s.style.position="unset",s.style.width="unset",s.style.overflow="unset"):(s.style.position="absolute",s.style.width="0",s.style.overflow="hidden")})},WU=()=>{let e=mh();e&&(e.textContent=""),document.querySelectorAll("#editor-status > span[data-status]").forEach(s=>{s.innerHTML=""})},Ax=()=>{Qc&&Qc.dispose(),xt?.script&&["javascript","typescript"].includes(Pt(xt.script))&&F.script&&typeof F.script.addTypes=="function"&&(Qc=F.script.addTypes({content:E().script.content+`
{}`,filename:"script.js"}))},Px=e=>{if(E().readonly||e==="blockly"||e==="richtext")return vn().classList.add("hidden"),!1;vn().classList.remove("hidden");let t=Zs(e);return t?.formatter||t?.parser?ir().classList.remove("disabled"):ir().classList.add("disabled"),!0},ap=({editor:e,code:t})=>{let s=r=>r.trim().startsWith("<?php")?r:`<?php
`+r;if(t)return s(t);e?.getLanguage()==="php"&&e.setValue(s(e.getValue()))},Ox=async e=>{!oe(e)||!e||!$e(e,E())||(Px(e),Object.keys(bs).forEach(async s=>{await bs[s]?.show(Object.values(xt||[]).includes(s),{baseUrl:de,editors:F,config:E(),html:Te().markup.compiled||E().markup.content||"",eventsManager:R})}))},lp=async(e,t,s=!1)=>{let r=oe(e);if(!r||!e||!$e(e,E()))return;Zs(e)?.largeDownload&&wt.info(`Loading ${ed(e)}. This may take a while!`);let n=F[r];n.setLanguage(e,t??(E()[r].content||"")),xt&&(xt[r]=e),wi(r,e),Si(r,s),ap({editor:F.script}),!X&&!s&&setTimeout(()=>n.focus()),await vs.load([e],E()),Kr.getFormatFn(e).then(i=>n.registerFormatter(i)),s||(qe({...E(),activeEditor:r}),E().autoupdate&&await pt()),await Vs(),dp(),Ax(),op(F,E()),await Ox(e)},GU=(e,t)=>{let s=t[e];s.addKeyBinding("run",s.keyCodes.ShiftEnter,async()=>{await pt()})},Xr=()=>{let e=s=>{let r={markup:"html",style:"css",script:"javascript"},n=et(E()[s].language)?.compiledCodeLanguage;return{language:n||r[s],label:n==="json"?"JSON":Q(n)||n||r[s]}},t={markup:e("markup"),style:e("style"),script:e("script")};if(se&&se.compiled){let s=Te();Object.keys(s).forEach(r=>{if(r!==E().activeEditor)return;let n=s[r].modified||s[r].compiled||"";r==="script"&&E().script.language==="php"&&(n=ap({code:n})||`<?php
`),se?.compiled?.update(t[r].language,n,t[r].label)})}},cp=async({sourceEditor:e=void 0,forExport:t=!1,template:s=zf,singleFile:r=!0,runTests:n=!1})=>{Gs();let i=E(),o=tt(i),a=i.markup.content||"",l=i.style.content||"",c=i.script.content||"",p=i.tests?.content||"",m=i.markup.language,g=i.style.language,y=i.script.language,h=i.tests?.language||"typescript",u=et(y)?.scriptType,d=i.processors.find(pe=>Ne.find(W=>pe===W.name&&W.needsHTML))&&(a!==Te().markup.content||c!==Te().script.content),b=i.tests?.language===Te().tests?.language&&i.tests?.content===Te().tests?.content&&Te().tests?.compiled,x=await vs.compile(a,m,i,{}),w=x.code,_=await Promise.all([vs.compile(l,g,i,{html:w,forceCompile:d}),vs.compile(c,y,i,{blockly:y==="blockly"?await bs.blockly?.getContent({baseUrl:de,editors:F,config:E(),html:w,eventsManager:R}):{}}),n?b?Promise.resolve(Te().tests?.compiled||""):vs.compile(p,h,i,{}):Promise.resolve(Lt(Te().tests?.compiled||""))]),f={...x.info},[T,L,U]=_.map(pe=>{let{code:W,info:me}=Lt(pe);return f={...f,...me},W});f.modifiedHTML&&(w=f.modifiedHTML);let I={...o,markup:{...o.markup,compiled:w},style:{...o.style,compiled:T},script:{...o.script,compiled:i.customSettings.convertCommonjs===!1||u&&u!=="module"?L:zm(L)},tests:{language:h,...o.tests,compiled:U}},Le=await sh({code:I,config:i,forExport:t,template:s,baseUrl:de,singleFile:r,runTests:n,compileInfo:f}),ge=e==="style"&&!f.cssModules;return fo({...Te(),...I,result:Le,styleOnlyUpdate:ge}),r&&(bi.isBroadcasting&&lA(),ep&&!ep.closed&&ep?.postMessage({result:Le},location.origin)),Le},Gr=e=>{let t=bh();t&&(e===!0?t.style.display="unset":t.style.display="none")},JU=()=>{let e=ns();if(!e?.contentWindow)return;Gr(!0),e.contentWindow.postMessage({flush:!0},"*");let t={markup:et(E().markup.language)?.compiledCodeLanguage||"html",style:et(E().style.language)?.compiledCodeLanguage||"css",script:et(E().script.language)?.compiledCodeLanguage||"javascript"},s={html:"<!-- loading -->",css:"/* loading */",javascript:"// loading",wat:";; loading"};ar("markup",t.markup,s[t.markup]||"html"),ar("style",t.style,s[t.style]||"css"),ar("script",t.script,s[t.script]||"javascript"),fo({...Te(),tests:{language:"javascript",content:"",compiled:""}}),Xr(),se?.tests?.clearTests()},VU=(e=!1)=>{let t=nr();if(!t)return;let s=J.title;e&&t.textContent?.trim()===""&&(t.textContent=s);let r=t.textContent||s;r!==E().title&&(qe({...E(),title:r}),E().autosave&&Yr(!Vt,!1),qx(),Vs(),dp())},qx=()=>{let e=E().title,t=location.hostname.startsWith("dev.livecodes.io")?"(dev) ":location.hostname.startsWith("127.0.0.1")||location.hostname.startsWith("localhost")?"(local) ":"";parent.document.title=t+(e&&e!=="Untitled Project"?e+" - ":"")+"LiveCodes"},Rx=()=>{let e=lo(),t=E();t.scripts.length>0||t.stylesheets.length>0||t.cssPreset?(e.classList.add("active"),e.style.display="unset"):(e.classList.remove("active"),X&&(e.style.display="none"))},pt=async(e,t=!1)=>{Gr(!0);let s=await cp({sourceEditor:e,runTests:t});await Mx(Ht(),s),se?.console?.clear(),Xr()},Jr=()=>pt(void 0,!0),Ix=(e,t=!1)=>{t&&!X?parent.history.pushState(null,"",e):parent.history.replaceState(null,"",e)},pp=async(e=!0)=>{if(e)await Promise.all([F.markup.format(),F.style.format(),F.script.format()]);else{let t=jt();await t.format(),t.focus()}Gs()},Yr=async(e=!1,t=!0)=>{t&&VU(!0),F&&E().formatOnsave&&await pp(!0);let s=js(E());Vt?await he.projects?.updateItem(Vt,s):Vt=await he.projects?.addItem(s)||"",await Vs(),e&&wt.success("Project locally saved to device!"),await up(!1)},KU=async()=>{Vt="",Js({...E(),title:E().title+" (fork)"}),await Yr(),wt.success("Forked as a new project")},up=async(e=!1,t=!0,s=!0,r=!1,n=!1)=>{let i=t?tt(E()):E(),o=e?"?x=id/"+await Bm.shareProject({...i,result:r?Te().result:void 0}):"?x=code/"+dn(JSON.stringify(i)),a=(location.origin+location.pathname).split("/").slice(0,-1).join("/")+"/",c=(n?gi.getAppUrl():a)+o;return s&&Ix(a+o,!0),{title:(i.title!==J.title?i.title+" - ":"")+"LiveCodes",url:c}},Gs=()=>{["markup","style","script"].forEach(t=>{qe({...E(),[t]:{...E()[t],language:np(t),content:F[t].getValue()}})})},Js=async(e,t,s=!0)=>{Ws=!0;let r=tt({...J,...rs(e)});qe({...E(),...r}),await xi({config:E()}),ws(),s&&JU();let n=nr();n.textContent=E().title,qx(),Ix(t||location.origin+location.pathname,!0),Jt.x=0,Jt.y=0,await zx(!0),Ws=!1},XU=(e,t=!0)=>{let s=so({...E(),...e??so(J)});qe({...E(),...s}),t&&he.userConfig?.setValue({...he.userConfig.getValue(),...e})},Cx=(e=!0)=>{if(X)return;let t=he.userConfig?.getValue();qe(js({...E(),...t})),e&&(fp(E()),$x(E().theme),Dx(!0))},YU=async e=>{let t=(await he.templates?.getItem(e))?.config;t&&await Js(t)},dp=()=>{let e=new Event(ze.change);document.dispatchEvent(e),parent.dispatchEvent(e)},Vs=async()=>{if(X)return;Gs();let e=Vt&&(await he.projects?.getItem(Vt||""))?.config;rp=Ws||!!(e&&JSON.stringify(tt(e))===JSON.stringify(tt(E())));let t=nr();rp?(t.classList.remove("unsaved"),ws(!0)):(t.classList.add("unsaved"),ws())},QU=(e=!1)=>rp||X?Promise.resolve(!0):new Promise(t=>{let s=document.createElement("div");s.innerHTML=Wf,Pe.show(s.firstChild,{size:"small"}),R.addEventListener(xh(),"click",async()=>{await Yr(!0),e||Pe.close(),t(!0)}),R.addEventListener(Sh(),"click",()=>{e||Pe.close(),t(!0)}),R.addEventListener(Lh(),"click",()=>{e||Pe.close(),t(!1)})}),ZU=(e,t)=>()=>QU(!0).then(s=>{setTimeout(s?e:typeof t=="function"?t:()=>{Pe.close()})}),ws=(e=!1)=>{X||(he.recover?.clear(),!(e||!E().recoverUnsaved)&&he.recover?.setValue({config:tt(E()),lastModified:Date.now()}))},eA=(e=!1)=>{if(!E().recoverUnsaved||X)return Promise.resolve("recover disabled");let t=he.recover?.getValue(),s=t?.config;if(!t||!s)return Promise.resolve("no unsaved project");let r=s.title;return new Promise(n=>{let i=Jh();if(e)i.style.display="unset";else{let a=document.createElement("div");a.innerHTML=Gf,Pe.show(a.firstChild,{size:"small",isAsync:!0})}po().textContent=r,po().title=r,Ch().textContent=new Date(t.lastModified).toLocaleString();let o=jh();R.addEventListener(Eh(),"click",async()=>{await Js(s),await Vs(),Pe.close(),n("recover")}),R.addEventListener(kh(),"click",async()=>{he.projects&&(await he.projects.addItem(s),wt.success(`Project "${r}" saved to device.`)),e?i.style.maxHeight="0":Pe.close(),ws(!0),n("save and continue")}),R.addEventListener(Th(),"click",()=>{e?i.style.maxHeight="0":Pe.close(),ws(!0),n("cancel recover")}),R.addEventListener(o,"change",()=>{XU({recoverUnsaved:!o.checked}),fp(E())})})},tA=async e=>{[F.markup,F.style].forEach((t,s)=>{t.monaco&&s>0||t.changeSettings(It(e))})},sA=async()=>yi||(yi=await eo(E(),de),yi),Hx=async()=>{if(zs)return;zs=Pm(X);let e=await zs.getUser();e&&Yh(e)};var Bx=async()=>{let e=await zs?.getUser();if(!e||!he.userData)return null;let t=e.username||e.uid;return(await he.userData.getItem(t))?.data||null};var Vr=()=>he.appData?.getValue()||null,Li=e=>{he.appData?.setValue({...he.appData.getValue(),...e})};var Dx=async(e=!1)=>{if(X)return;let t=(await Bx())?.sync?.lastSync;(t||e)&&(await import(de+"sync-ui.d0439fd0137e0c66038590b908e110df.js")).updateSyncStatus({lastSync:t})},rA=(e,t)=>{let s=sp.find(r=>r.screen.toLowerCase()===e.toLowerCase());s?s.show=t:sp.push({screen:e.toLowerCase(),show:t})},mp=async(e,t)=>{let s=sp.find(n=>n.screen.toLowerCase()===e.toLowerCase());if(!s)return;await s.show(t),document.querySelector("#modal").firstElementChild?.click()},nA=()=>{let e=Object.fromEntries(new URLSearchParams(parent.location.search)),t=e.new===""?"new":e.screen;t&&mp(t)},Nx=()=>[...Object.values(F),se?.console?.getEditor?.(),se?.compiled?.getEditor?.()],$x=e=>{let t=["light","dark"],s=document.querySelector(":root");s?.classList.remove(...t),s?.classList.add(e),Nx().forEach(r=>{r?.setTheme(e),bs[r?.getLanguage()]?.setTheme(e)})},fp=e=>{if(Dh().forEach(g=>{let y=g.dataset.processor;y&&(g.checked=e.processors.includes(y))}),X)return;let s=Oh();s.checked=e.autoupdate;let r=qh(),n=Rh();n.value=String(e.delay),r.textContent=String(e.delay/1e3);let i=Ih();i.checked=e.autosave;let o=Hh();Bx().then(g=>{o.checked=g?.sync?.autosync||!1});let a=Bh();a.checked=e.formatOnsave;let l=Nh();l.checked=e.theme==="dark";let c=Fh();c.checked=e.recoverUnsaved;let p=$h();p.checked=e.welcome;let m=zh();m.checked=e.showSpacing,Wh().forEach(g=>{g.classList.remove("active"),e.cssPreset===g.dataset.preset&&g.classList.add("active"),!e.cssPreset&&g.dataset.preset==="none"&&g.classList.add("active")})},iA=e=>{Pe.show(e,{size:"small"})},oA=async(e,t=!0)=>{let s=await sA(),{title:r,thumbnail:n,...i}=s.filter(o=>o.name===e)?.[0]||{};i?(Li({recentTemplates:[{name:e,title:r},...Vr()?.recentTemplates?.filter(a=>a.name!==e)||[]].slice(0,5)}),(t?ZU:a=>async()=>a())(()=>{Vt="",Js({...J,...i},"?template="+e)})().finally(()=>{Pe.close()})):wt.error("Failed loading template")},aA=()=>{let e=E(),t=ho();return{...e,...t,markup:{...e.markup,...t.markup,position:F.markup.getPosition()},style:{...e.style,...t.style,position:F.style.getPosition()},script:{...e.script,...t.script,position:F.script.getPosition()},tools:{enabled:e.tools.enabled,active:se?.getActiveTool()??"",status:se?.getStatus()??""}}},hp=(e=1)=>{let t=ns(),s=wh();!t||!s||(t.classList.remove("zoom25"),t.classList.remove("zoom50"),e===.5&&t.classList.add("zoom50"),e===.25&&t.classList.add("zoom25"),s.textContent=String(e))},lA=async({serverUrl:e,channel:t,channelToken:s,broadcastSource:r}={})=>{if(X)return;let n=Vr()?.broadcast;if(e||(e=n?.serverUrl),!e)return;r==null&&(r=bi.broadcastSource),t==null&&(t=bi.channel),s==null&&(s=bi.channelToken);let i=n?.userToken,{result:o,...a}=aA();try{let l=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({result:o,...r?{data:a}:{},...t?{channel:t}:{},...s?{channelToken:s}:{},...i?{userToken:i}:{}})});return l.ok?l.json():void 0}catch{return}};var cA=(e=!0)=>{let t="4",s="0.0.2",r="fe430fb",n="https://github.com/live-codes/livecodes",i=gi.getAppUrl(),o=gi.getSDKUrl();return e&&(console.log(`App Version: ${t} (${n}/releases/tag/v${t})`),console.log(`SDK Version: ${s} (https://www.npmjs.com/package/livecodes/v/${s})`),console.log(`Git commit: ${r} (${n}/commit/${r})`),console.log(`App Permanent URL: ${i}`),console.log(`SDK Permanent URL: ${o}`)),{appVersion:t,sdkVersion:s,commitSHA:r,appUrl:i,sdkUrl:o}},tp=()=>{Object.values(F).forEach(e=>{setTimeout(()=>{e.layout&&e.layout()})})};var pA=()=>{tp(),R.addEventListener(window,"resize",tp,!1),R.addEventListener(window,ze.resizeEditor,tp,!1)},uA=()=>{let e=no();if(!e)return;let t=document.createElement("div");t.id="size-label",e.appendChild(t);let s=Ei(()=>{setTimeout(()=>{t.classList.remove("visible"),setTimeout(()=>{t.style.display="none"},100)},1e3)},1e3);R.addEventListener(window,"message",r=>{let n=ns();if(!t||!n||r.source!==n.contentWindow||r.data.type!=="resize")return;let i=r.data.sizes;t.innerHTML=`${i.width} x ${i.height}`,t.style.display="block",t.classList.add("visible"),s()})},dA=()=>{R.addEventListener(window,"message",e=>{let t=ns();if(!t||e.source!==t.contentWindow||e.data.type!=="scroll")return;let s=e.data.position;Jt.x=Number(s.x)||0,Jt.y=Number(s.y)||0})},mA=()=>{co().forEach(e=>{R.addEventListener(e,"click",()=>{Si(e.dataset.editor),Li({language:np(e.dataset.editor)}),ws()},!1)})},fA=()=>{E().allowLangChange?Mh().forEach(e=>{R.addEventListener(e,"mousedown",async()=>{await lp(e.dataset.lang),Li({language:e.dataset.lang})},!1)}):Uh().forEach(e=>{e.style.display="none"})},hA=()=>{let e=async(s,r)=>{Gs(),Ax();let n=!!(vi&&E().tests?.content);(E().autoupdate||n)&&!r&&await pt(s,n),E().markup.content!==Te().markup.content&&await cp({sourceEditor:s});for(let i of Object.keys(bs))E()[s].language===i&&await bs[i]?.show(!0,{baseUrl:de,editors:F,config:E(),html:Te().markup.compiled||E().markup.content||"",eventsManager:R});E().autosave&&await Yr(),dp(),op(F,E())},t=s=>Ei(async()=>{await e(s,Ws)},()=>E().delay??J.delay);Object.keys(F).forEach(s=>{F[s].onContentChanged(t(s)),F[s].onContentChanged(Vs)})},gA=()=>{let e=s=>navigator.platform.match("Mac")?s.metaKey:s.ctrlKey,t=async s=>{if(!s)return;let r=jt();if(e(s)&&s.key.toLowerCase()==="p"&&r.monaco){s.preventDefault(),r.monaco.trigger("anyString","editor.action.quickCommand");return}if(e(s)&&s.key.toLowerCase()==="d"){s.preventDefault();return}if(!X){if(e(s)&&s.shiftKey&&s.key.toLowerCase()==="s"){s.preventDefault(),await KU();return}if(e(s)&&s.key.toLowerCase()==="s"){s.preventDefault(),await Yr(!0);return}if(e(s)&&s.altKey&&s.key.toLowerCase()==="t"){s.preventDefault(),Se?.show("output"),se?.setActiveTool("tests"),se?.getStatus()==="closed"&&se?.open(),await Jr();return}if(s.shiftKey&&s.key==="Enter"){s.preventDefault(),Se?.show("output"),await pt();return}}};R.addEventListener(window,"keydown",t,!0)},_A=()=>{if(X||E().mode==="result")return;let e=io();R.addEventListener(e,"click",async t=>{t.preventDefault(),parent.postMessage({args:"home"},location.origin)})},yA=()=>{let e=async()=>{Se?.show("output"),await pt()};R.addEventListener(oo(),"click",e),R.addEventListener(ao(),"click",e)},vA=()=>{R.addEventListener(hh(),"click",()=>Se?.show("output",!0))},bA=()=>{Px(jt().getLanguage())&&(R.addEventListener(ph(),"click",()=>{Ti(jt().getValue())?wt.success("Code copied to clipboard"):wt.error("Failed to copy code")}),R.addEventListener(uh(),"click",()=>{let e=jt();e.undo(),e.focus()}),R.addEventListener(dh(),"click",()=>{let e=jt();e.redo(),e.focus()}),R.addEventListener(ir(),"click",async()=>{await pp(!1)}),R.addEventListener(fh(),"click",()=>{mp("editor-settings",{scrollToSelector:'label[data-name="editorMode"]'})}))},wA=()=>{let e=Ah(),t=Ne.filter(s=>es(s.name,E())).filter(s=>!s.hidden).map(s=>({name:s.name,title:s.title}));!e||t.length===0||t.forEach(s=>{let r=Km(s);e.append(r),R.addEventListener(r,"mousedown",async n=>{n.preventDefault(),n.stopPropagation();let i=r.querySelector("input");if(!i)return;i.checked=!i.checked;let o=i.dataset.processor;!o||!t.find(a=>a.name===o)||(qe({...E(),processors:[...i.checked?[...E().processors,o]:E().processors.filter(a=>a!==o)]}),E().autoupdate&&await pt())},!1),R.addEventListener(r,"click",async n=>{n.preventDefault(),n.stopPropagation()})})};var xA=()=>{let e=async()=>{let t=async()=>{Rx(),await Vs(),Pe.close(),E().autoupdate&&await pt()};Pe.show(Xh()),(await import(de+"resources.879931acfbb97918dd80fcffe442a301.js")).createExternalResourcesUI({baseUrl:de,modal:Pe,eventsManager:R,deps:{getConfig:E,setConfig:qe,loadResources:t}})};R.addEventListener(Ph(),"click",e,!1),R.addEventListener(lo(),"click",e,!1),rA("resources",e)};var SA=()=>{R.addEventListener(window,"message",e=>{if(e.origin!==Ot.getOrigin()||e.data.type!=="testResults")return;se?.tests?.showResults(e.data.payload);let t=new CustomEvent(ze.testResults,{detail:JSON.parse(JSON.stringify(e.data.payload))});document.dispatchEvent(t)}),R.addEventListener(Gh(),"click",e=>{e.preventDefault(),Jr()},!1),R.addEventListener(wn(),"click",e=>{e.preventDefault(),vi=!vi,vi?(wn()?.classList.remove("disabled"),Jr()):wn()?.classList.add("disabled")},!1)};var LA=()=>{R.addEventListener(window,"message",e=>{let t=ns();if(!t||e.source!==t.contentWindow)return;e.data.type==="loading"&&Gr(e.data.payload);let s=e.data.payload?.language;if(e.data.type==="compiled"&&s&&ip().includes(s)){let r=oe(s);if(!r)return;ar(r,s,e.data.payload.content||""),Xr()}})};var EA=()=>{let e=document.createElement("div");e.id="zoom-button",e.classList.add("tool-buttons","hint--top"),e.dataset.hint="Zoom",e.style.pointerEvents="all",e.innerHTML=`
  <span class="text">
    <span id="zoom-value">${String(Number(E().zoom))}</span>
    &times;
  </span>`;let t=()=>{let s=E(),r=s.zoom,n=r===1?.5:r===.5?.25:1;qe({...s,zoom:n}),hp(n)};R.addEventListener(e,"click",t),R.addEventListener(e,"touchstart",t),vh()?.appendChild(e)};var kA=async()=>{if(!X)return;let e=gh(),t=e.querySelector("img"),s=(await import(fu)).default;if(!s.fullscreenEnabled){e.style.visibility="hidden";return}R.addEventListener(s,"fullscreenchange",async()=>{if(!s.fullscreenElement){t.src=t.src.replace("collapse.svg","expand.svg"),e.dataset.hint="Full Screen";return}t.src=t.src.replace("expand.svg","collapse.svg"),e.dataset.hint="Exit Full Screen"}),R.addEventListener(e,"click",async()=>{if(s.fullscreenElement){await s.exitFullscreen();return}await s.requestFullscreen(document.body)})};var Fx=async()=>{se=kx(E(),de,F,R,X,Jr),await se.load(),SA(),EA(),Ht().classList.remove("full")},TA=()=>{_A(),pA(),uA(),dA(),mA(),fA(),hA(),gA(),yA(),vA(),bA(),wA(),LA(),X&&(xA(),kA())};var CA=(e,t)=>{document.body.classList.add("embed"),e.mode==="result"&&document.body.classList.add("result"),(e.mode==="editor"||e.mode==="codeblock")&&document.body.classList.add("no-result");let s=io();s.classList.add("hint--bottom-left"),s.dataset.hint="Edit in LiveCodes \u{1F855}",s.title="",t.addEventListener(s,"click",async r=>{r.preventDefault(),window.open((await up(!1,!0,!1)).url,"_blank")})},jA=()=>{qe({...E(),editor:"codejar",emmet:!1,tools:{enabled:[],active:"",status:"none"}}),ir().style.display="none"},MA=({config:e,isEmbed:t,isLite:s})=>{e.mode==="full"&&(xe.view==="editor"&&Se?.show("code",!0),xe.view==="result"&&Se?.show("output",!0)),e.mode==="codeblock"&&qe({...e,readonly:!0}),(e.mode==="editor"||e.mode==="codeblock"||e.mode==="result")&&(Se?.destroy(),Se=null),s&&jA(),(t||e.mode==="result")&&CA(e,R)},xi=async e=>{let{config:t=J,configUrl:s,template:r,url:n}=e,i=["markup","style","script"],o=y=>i.filter(h=>y[h]?.contentUrl&&!y[h]?.content).length>0;if(!s&&!r&&!n&&!o(t))return!1;let a=document.createElement("div");a.classList.add("modal-message"),a.innerHTML="Loading Project...",Pe.show(a,{size:"small",isAsync:!0});let l={},c={},p={},m={};if(r){let y=await Jf(r,t,de);y?l=rs(y):wt.error("Could not load template: "+r)}if(n){let y=n;if(n.startsWith("http")||n.startsWith("data"))try{y=new URL(n).href}catch{y=decodeURIComponent(n)}let h;Zf(y)&&!X&&(await Hx(),h=await zs?.getUser()),c=await(await import(de+"import.8c13de90b03c9f9d79034358d3f2b924.js")).importCode(y,_n(),E(),h),Object.keys(c).length===0&&wt.error("Invalid import URL")}if(o(t)){let y=await Promise.all(i.map(h=>{let u=t[h].contentUrl;return u&&ji(u)&&!t[h].content?fetch(u).then(d=>d.text()).then(d=>({...t[h],content:d})):Promise.resolve(t[h])}));p={markup:y[0],style:y[1],script:y[2]}}let g=ji(s);return g&&(m=rs(await fetch(g).then(y=>y.json()).catch(()=>({}))),o(m))?xi({config:{...t,...m}}):(await Js(js({...t,...l,...c,...p,...m}),parent.location.href,!1),Pe.close(),!0)},UA=async()=>{if(X||xe["no-defaults"]||xe.languages||xe.template||xe.config||xe.active||xe.activeEditor||Q(xe.lang)||Q(xe.language))return;for(let s of Object.keys(xe))if(Q(s))return;if(E().welcome&&!xe.screen||xe.screen==="welcome"){mp("welcome");return}let e=Vr()?.defaultTemplate;if(e){wt.info("Loading default template"),await YU(e);return}let t=Vr()?.language;t&&(Ws=!0,await lp(t),Ws=!1),ws(!0)},zx=async(e=!1)=>{e&&await FU(F,E()),ap({editor:F.script}),Gr(!0),hp(E().zoom),await HU(E()),fp(E()),se?.console?.clear(),X||setTimeout(()=>jt().focus()),Rx(),Xr(),op(F,E()),vs.load(Object.values(xt||{}),E()).then(()=>{if(!E().autoupdate){Gr(!1);return}setTimeout(()=>{se?.getActiveTool()==="tests"&&["open","full"].includes(se?.getStatus())?pt(void 0,!0):pt()})}),Kr.load(ip()),X&&!E().tests?.content?.trim()&&se?.disableTool("tests")},Wx=async(e,t)=>{let s=e?.config??{};de=e?.baseUrl??"/livecodes/",_i=e?.isLite??!1,X=_i||(e?.isEmbed??!1),await Lm(he,X),Cx(!1),qe(js({...E(),...s})),MA({config:E(),isEmbed:X,isLite:_i}),vs=await Gm({config:E(),baseUrl:de,eventsManager:R}),Kr=nf(E(),de,_i),bs=sf({baseUrl:de,eventsManager:R}),Vm(E(),de,R,iA,oA,xi),await $U(E()),TA(),await t?.(),Cx(!0),BU(),await Mx(Ht()),Ux(E()),nA(),$x(E().theme),X||(Hx().then(()=>Dx()),eA()),xi({config:E(),configUrl:xe.config,template:xe.template,url:xe.x||parent.location.hash.substring(1)}).then(async r=>{r||(await zx(),await UA()),X&&parent.dispatchEvent(new Event(ze.ready)),jx=!0}),tA(E())},Gx=()=>{let e=async(h=!1)=>(await up(h,!0,!1)).url,t=async(h=!1)=>{Gs();let u=h?tt(E()):E();return JSON.parse(JSON.stringify(u))},s=async h=>{let u={...E(),...js(h)};return u.mode!==E().mode&&Ux(u),qe(u),await Js(u),u},r=async()=>(Gs(),Kh(Te(),tt(E()))||await cp({}),JSON.parse(JSON.stringify(ho()))),n=async(h,{full:u=!1,line:d,column:b,zoom:x}={})=>{if(h==="result")Se?.show("output",u),se?.close(),x&&hp(x);else if(h==="console"||h==="compiled"||h==="tests")Se?.show("output"),se?.setActiveTool(h),u?se?.maximize():se?.open();else if(Object.keys(F).includes(h)){if(Si(h),Se?.show("code",u),typeof d=="number"&&d>0){let w=typeof b=="number"&&b>-1?b:0;jt().setPosition({lineNumber:d,column:w}),jt().focus()}}else throw new Error("Invalid panel id")},i=()=>new Promise(h=>{R.addEventListener(document,ze.testResults,u=>{h({results:u.detail?.results||[]})},{once:!0}),Jr()}),o=h=>{let u=async function(){h({code:await r(),config:await t()})};return R.addEventListener(document,ze.change,u),{remove:()=>{R.removeEventListener(document,ze.change,u)}}},a=async(h,...u)=>{if(h==="setBroadcastToken"){if(X)return{error:"Command unavailable for embeds"};let d=Vr()?.broadcast;if(!d)return{error:"Command unavailable"};let b=u[0];return typeof b!="string"?{error:"Invalid token!"}:(Li({broadcast:{...d,userToken:b}}),{output:"Broadcast user token set successfully"})}return h==="showVersion"?{output:cA()}:{error:"Invalid command!"}},l=async()=>{Nx().forEach(h=>h?.destroy()),R.removeEventListeners(),Object.values(he).forEach(h=>h?.unsubscribeAll?.()),parent.dispatchEvent(new Event(ze.destroy)),Kr?.destroy(),document.body.innerHTML="",document.head.innerHTML="",Zc=!0},c="Cannot call API methods after calling `destroy()`.",p=()=>Promise.reject(c),m=()=>{throw new Error(c)},g=h=>Zc?p():h(),y=h=>Zc?m():h();return{run:()=>g(()=>pt()),format:h=>g(()=>pp(h)),getShareUrl:h=>g(()=>e(h)),getConfig:h=>g(()=>t(h)),setConfig:h=>g(()=>s(h)),getCode:()=>g(()=>r()),show:(h,u)=>g(()=>n(h,u)),runTests:()=>g(()=>i()),onChange:h=>y(()=>o(h)),exec:(h,...u)=>g(()=>a(h,...u)),destroy:()=>g(()=>l())}};var M9=async(e,t)=>(await Wx({config:e,baseUrl:t,isEmbed:!0},async()=>{await Fx()}),Gx());export{M9 as app};
//# sourceMappingURL=embed.js.map
