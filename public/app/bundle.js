(()=>{var n={887:(n,t,e)=>{var r;!function(){var o;function i(n){var t,e,r,o="",i=-1;if(n&&n.length)for(r=n.length;(i+=1)<r;)t=n.charCodeAt(i),e=i+1<r?n.charCodeAt(i+1):0,55296<=t&&t<=56319&&56320<=e&&e<=57343&&(t=65536+((1023&t)<<10)+(1023&e),i+=1),t<=127?o+=String.fromCharCode(t):t<=2047?o+=String.fromCharCode(192|t>>>6&31,128|63&t):t<=65535?o+=String.fromCharCode(224|t>>>12&15,128|t>>>6&63,128|63&t):t<=2097151&&(o+=String.fromCharCode(240|t>>>18&7,128|t>>>12&63,128|t>>>6&63,128|63&t));return o}function u(n,t){var e=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(e>>16)<<16|65535&e}function h(n,t){return n<<t|n>>>32-t}function c(n,t){for(var e,r=t?"0123456789ABCDEF":"0123456789abcdef",o="",i=0,u=n.length;i<u;i+=1)e=n.charCodeAt(i),o+=r.charAt(e>>>4&15)+r.charAt(15&e);return o}function a(n){var t,e=32*n.length,r="";for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>24-t%32&255);return r}function s(n){var t,e=32*n.length,r="";for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function f(n){var t,e=8*n.length,r=Array(n.length>>2),o=r.length;for(t=0;t<o;t+=1)r[t]=0;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function l(n){var t,e=8*n.length,r=Array(n.length>>2),o=r.length;for(t=0;t<o;t+=1)r[t]=0;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<24-t%32;return r}function d(n,t){var e,r,o,i,u,h,c,a,s=t.length,f=Array();for(i=(h=Array(Math.ceil(n.length/2))).length,e=0;e<i;e+=1)h[e]=n.charCodeAt(2*e)<<8|n.charCodeAt(2*e+1);for(;h.length>0;){for(u=Array(),o=0,e=0;e<h.length;e+=1)o=(o<<16)+h[e],o-=(r=Math.floor(o/s))*s,(u.length>0||r>0)&&(u[u.length]=r);f[f.length]=o,h=u}for(c="",e=f.length-1;e>=0;e--)c+=t.charAt(f[e]);for(a=Math.ceil(8*n.length/(Math.log(t.length)/Math.log(2))),e=c.length;e<a;e+=1)c=t[0]+c;return c}function B(n,t){var e,r,o,i="",u=n.length;for(t=t||"=",e=0;e<u;e+=3)for(o=n.charCodeAt(e)<<16|(e+1<u?n.charCodeAt(e+1)<<8:0)|(e+2<u?n.charCodeAt(e+2):0),r=0;r<4;r+=1)8*e+6*r>8*n.length?i+=t:i+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o>>>6*(3-r)&63);return i}o={VERSION:"1.0.6",Base64:function(){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t="=",e=!0;this.encode=function(r){var o,u,h,c="",a=r.length;for(t=t||"=",r=e?i(r):r,o=0;o<a;o+=3)for(h=r.charCodeAt(o)<<16|(o+1<a?r.charCodeAt(o+1)<<8:0)|(o+2<a?r.charCodeAt(o+2):0),u=0;u<4;u+=1)c+=8*o+6*u>8*a?t:n.charAt(h>>>6*(3-u)&63);return c},this.decode=function(r){var o,i,u,h,c,a,s,f,l="",d=[];if(!r)return r;o=f=0,r=r.replace(new RegExp("\\"+t,"gi"),"");do{i=(s=n.indexOf(r.charAt(o+=1))<<18|n.indexOf(r.charAt(o+=1))<<12|(c=n.indexOf(r.charAt(o+=1)))<<6|(a=n.indexOf(r.charAt(o+=1))))>>16&255,u=s>>8&255,h=255&s,d[f+=1]=64===c?String.fromCharCode(i):64===a?String.fromCharCode(i,u):String.fromCharCode(i,u,h)}while(o<r.length);return l=d.join(""),e?function(n){var t,e,r,o,i,u,h=[];if(t=e=r=o=i=0,n&&n.length)for(u=n.length,n+="";t<u;)e+=1,(r=n.charCodeAt(t))<128?(h[e]=String.fromCharCode(r),t+=1):r>191&&r<224?(o=n.charCodeAt(t+1),h[e]=String.fromCharCode((31&r)<<6|63&o),t+=2):(o=n.charCodeAt(t+1),i=n.charCodeAt(t+2),h[e]=String.fromCharCode((15&r)<<12|(63&o)<<6|63&i),t+=3);return h.join("")}(l):l},this.setPad=function(n){return t=n||t,this},this.setTab=function(t){return n=t||n,this},this.setUTF8=function(n){return"boolean"==typeof n&&(e=n),this}},CRC32:function(n){var t,e,r,o=0,u=0;for(n=i(n),t=["00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 ","79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 ","84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F ","63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD ","A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC ","51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 ","B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 ","06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 ","E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 ","12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 ","D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 ","33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 ","CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 ","9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E ","7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D ","806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 ","60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA ","AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 ","5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 ","B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 ","05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 ","F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA ","11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 ","D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F ","30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E ","C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D"].join(""),o^=-1,e=0,r=n.length;e<r;e+=1)u=255&(o^n.charCodeAt(e)),o=o>>>8^"0x"+t.substr(9*u,8);return(-1^o)>>>0},MD5:function(n){var t=!(!n||"boolean"!=typeof n.uppercase)&&n.uppercase,e=n&&"string"==typeof n.pad?n.pad:"=",r=!n||"boolean"!=typeof n.utf8||n.utf8;function o(n){return s(l(f(n=r?i(n):n),8*n.length))}function a(n,t){var e,o,u,h,c;for(n=r?i(n):n,t=r?i(t):t,(e=f(n)).length>16&&(e=l(e,8*n.length)),o=Array(16),u=Array(16),c=0;c<16;c+=1)o[c]=909522486^e[c],u[c]=1549556828^e[c];return h=l(o.concat(f(t)),512+8*t.length),s(l(u.concat(h),640))}function l(n,t){var e,r,o,i,h,c=1732584193,a=-271733879,s=-1732584194,f=271733878;for(n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t,e=0;e<n.length;e+=16)r=c,o=a,i=s,h=f,c=D(c,a,s,f,n[e+0],7,-680876936),f=D(f,c,a,s,n[e+1],12,-389564586),s=D(s,f,c,a,n[e+2],17,606105819),a=D(a,s,f,c,n[e+3],22,-1044525330),c=D(c,a,s,f,n[e+4],7,-176418897),f=D(f,c,a,s,n[e+5],12,1200080426),s=D(s,f,c,a,n[e+6],17,-1473231341),a=D(a,s,f,c,n[e+7],22,-45705983),c=D(c,a,s,f,n[e+8],7,1770035416),f=D(f,c,a,s,n[e+9],12,-1958414417),s=D(s,f,c,a,n[e+10],17,-42063),a=D(a,s,f,c,n[e+11],22,-1990404162),c=D(c,a,s,f,n[e+12],7,1804603682),f=D(f,c,a,s,n[e+13],12,-40341101),s=D(s,f,c,a,n[e+14],17,-1502002290),c=A(c,a=D(a,s,f,c,n[e+15],22,1236535329),s,f,n[e+1],5,-165796510),f=A(f,c,a,s,n[e+6],9,-1069501632),s=A(s,f,c,a,n[e+11],14,643717713),a=A(a,s,f,c,n[e+0],20,-373897302),c=A(c,a,s,f,n[e+5],5,-701558691),f=A(f,c,a,s,n[e+10],9,38016083),s=A(s,f,c,a,n[e+15],14,-660478335),a=A(a,s,f,c,n[e+4],20,-405537848),c=A(c,a,s,f,n[e+9],5,568446438),f=A(f,c,a,s,n[e+14],9,-1019803690),s=A(s,f,c,a,n[e+3],14,-187363961),a=A(a,s,f,c,n[e+8],20,1163531501),c=A(c,a,s,f,n[e+13],5,-1444681467),f=A(f,c,a,s,n[e+2],9,-51403784),s=A(s,f,c,a,n[e+7],14,1735328473),c=w(c,a=A(a,s,f,c,n[e+12],20,-1926607734),s,f,n[e+5],4,-378558),f=w(f,c,a,s,n[e+8],11,-2022574463),s=w(s,f,c,a,n[e+11],16,1839030562),a=w(a,s,f,c,n[e+14],23,-35309556),c=w(c,a,s,f,n[e+1],4,-1530992060),f=w(f,c,a,s,n[e+4],11,1272893353),s=w(s,f,c,a,n[e+7],16,-155497632),a=w(a,s,f,c,n[e+10],23,-1094730640),c=w(c,a,s,f,n[e+13],4,681279174),f=w(f,c,a,s,n[e+0],11,-358537222),s=w(s,f,c,a,n[e+3],16,-722521979),a=w(a,s,f,c,n[e+6],23,76029189),c=w(c,a,s,f,n[e+9],4,-640364487),f=w(f,c,a,s,n[e+12],11,-421815835),s=w(s,f,c,a,n[e+15],16,530742520),c=E(c,a=w(a,s,f,c,n[e+2],23,-995338651),s,f,n[e+0],6,-198630844),f=E(f,c,a,s,n[e+7],10,1126891415),s=E(s,f,c,a,n[e+14],15,-1416354905),a=E(a,s,f,c,n[e+5],21,-57434055),c=E(c,a,s,f,n[e+12],6,1700485571),f=E(f,c,a,s,n[e+3],10,-1894986606),s=E(s,f,c,a,n[e+10],15,-1051523),a=E(a,s,f,c,n[e+1],21,-2054922799),c=E(c,a,s,f,n[e+8],6,1873313359),f=E(f,c,a,s,n[e+15],10,-30611744),s=E(s,f,c,a,n[e+6],15,-1560198380),a=E(a,s,f,c,n[e+13],21,1309151649),c=E(c,a,s,f,n[e+4],6,-145523070),f=E(f,c,a,s,n[e+11],10,-1120210379),s=E(s,f,c,a,n[e+2],15,718787259),a=E(a,s,f,c,n[e+9],21,-343485551),c=u(c,r),a=u(a,o),s=u(s,i),f=u(f,h);return Array(c,a,s,f)}function C(n,t,e,r,o,i){return u(h(u(u(t,n),u(r,i)),o),e)}function D(n,t,e,r,o,i,u){return C(t&e|~t&r,n,t,o,i,u)}function A(n,t,e,r,o,i,u){return C(t&r|e&~r,n,t,o,i,u)}function w(n,t,e,r,o,i,u){return C(t^e^r,n,t,o,i,u)}function E(n,t,e,r,o,i,u){return C(e^(t|~r),n,t,o,i,u)}this.hex=function(n){return c(o(n),t)},this.b64=function(n){return B(o(n),e)},this.any=function(n,t){return d(o(n),t)},this.raw=function(n){return o(n)},this.hex_hmac=function(n,e){return c(a(n,e),t)},this.b64_hmac=function(n,t){return B(a(n,t),e)},this.any_hmac=function(n,t,e){return d(a(n,t),e)},this.vm_test=function(){return"900150983cd24fb0d6963f7d28e17f72"===hex("abc").toLowerCase()},this.setUpperCase=function(n){return"boolean"==typeof n&&(t=n),this},this.setPad=function(n){return e=n||e,this},this.setUTF8=function(n){return"boolean"==typeof n&&(r=n),this}},SHA1:function(n){var t=!(!n||"boolean"!=typeof n.uppercase)&&n.uppercase,e=n&&"string"==typeof n.pad?n.pad:"=",r=!n||"boolean"!=typeof n.utf8||n.utf8;function o(n){return a(f(l(n=r?i(n):n),8*n.length))}function s(n,t){var e,o,u,h,c;for(n=r?i(n):n,t=r?i(t):t,(e=l(n)).length>16&&(e=f(e,8*n.length)),o=Array(16),u=Array(16),h=0;h<16;h+=1)o[h]=909522486^e[h],u[h]=1549556828^e[h];return c=f(o.concat(l(t)),512+8*t.length),a(f(u.concat(c),672))}function f(n,t){var e,r,o,i,c,a,s,f,l=Array(80),d=1732584193,B=-271733879,A=-1732584194,w=271733878,E=-1009589776;for(n[t>>5]|=128<<24-t%32,n[15+(t+64>>9<<4)]=t,e=0;e<n.length;e+=16){for(i=d,c=B,a=A,s=w,f=E,r=0;r<80;r+=1)l[r]=r<16?n[e+r]:h(l[r-3]^l[r-8]^l[r-14]^l[r-16],1),o=u(u(h(d,5),C(r,B,A,w)),u(u(E,l[r]),D(r))),E=w,w=A,A=h(B,30),B=d,d=o;d=u(d,i),B=u(B,c),A=u(A,a),w=u(w,s),E=u(E,f)}return Array(d,B,A,w,E)}function C(n,t,e,r){return n<20?t&e|~t&r:n<40?t^e^r:n<60?t&e|t&r|e&r:t^e^r}function D(n){return n<20?1518500249:n<40?1859775393:n<60?-1894007588:-899497514}this.hex=function(n){return c(o(n),t)},this.b64=function(n){return B(o(n),e)},this.any=function(n,t){return d(o(n),t)},this.raw=function(n){return o(n)},this.hex_hmac=function(n,t){return c(s(n,t))},this.b64_hmac=function(n,t){return B(s(n,t),e)},this.any_hmac=function(n,t,e){return d(s(n,t),e)},this.vm_test=function(){return"900150983cd24fb0d6963f7d28e17f72"===hex("abc").toLowerCase()},this.setUpperCase=function(n){return"boolean"==typeof n&&(t=n),this},this.setPad=function(n){return e=n||e,this},this.setUTF8=function(n){return"boolean"==typeof n&&(r=n),this}},SHA256:function(n){n&&"boolean"==typeof n.uppercase&&n.uppercase;var t,e=n&&"string"==typeof n.pad?n.pad:"=",r=!n||"boolean"!=typeof n.utf8||n.utf8;function o(n,t){return a(F(l(n=t?i(n):n),8*n.length))}function h(n,t){n=r?i(n):n,t=r?i(t):t;var e,o=0,u=l(n),h=Array(16),c=Array(16);for(u.length>16&&(u=F(u,8*n.length));o<16;o+=1)h[o]=909522486^u[o],c[o]=1549556828^u[o];return e=F(h.concat(l(t)),512+8*t.length),a(F(c.concat(e),768))}function s(n,t){return n>>>t|n<<32-t}function f(n,t){return n>>>t}function C(n,t,e){return n&t^~n&e}function D(n,t,e){return n&t^n&e^t&e}function A(n){return s(n,2)^s(n,13)^s(n,22)}function w(n){return s(n,6)^s(n,11)^s(n,25)}function E(n){return s(n,7)^s(n,18)^f(n,3)}function F(n,e){var r,o,i,h,c,a,l,d,B,F,g,p,v,y=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],_=new Array(64);for(n[e>>5]|=128<<24-e%32,n[15+(e+64>>9<<4)]=e,B=0;B<n.length;B+=16){for(r=y[0],o=y[1],i=y[2],h=y[3],c=y[4],a=y[5],l=y[6],d=y[7],F=0;F<64;F+=1)_[F]=F<16?n[F+B]:u(u(u(s(v=_[F-2],17)^s(v,19)^f(v,10),_[F-7]),E(_[F-15])),_[F-16]),g=u(u(u(u(d,w(c)),C(c,a,l)),t[F]),_[F]),p=u(A(r),D(r,o,i)),d=l,l=a,a=c,c=u(h,g),h=i,i=o,o=r,r=u(g,p);y[0]=u(r,y[0]),y[1]=u(o,y[1]),y[2]=u(i,y[2]),y[3]=u(h,y[3]),y[4]=u(c,y[4]),y[5]=u(a,y[5]),y[6]=u(l,y[6]),y[7]=u(d,y[7])}return y}this.hex=function(n){return c(o(n,r))},this.b64=function(n){return B(o(n,r),e)},this.any=function(n,t){return d(o(n,r),t)},this.raw=function(n){return o(n,r)},this.hex_hmac=function(n,t){return c(h(n,t))},this.b64_hmac=function(n,t){return B(h(n,t),e)},this.any_hmac=function(n,t,e){return d(h(n,t),e)},this.vm_test=function(){return"900150983cd24fb0d6963f7d28e17f72"===hex("abc").toLowerCase()},this.setUpperCase=function(n){return this},this.setPad=function(n){return e=n||e,this},this.setUTF8=function(n){return"boolean"==typeof n&&(r=n),this},t=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998]},SHA512:function(n){n&&"boolean"==typeof n.uppercase&&n.uppercase;var t,e=n&&"string"==typeof n.pad?n.pad:"=",r=!n||"boolean"!=typeof n.utf8||n.utf8;function o(n){return a(h(l(n=r?i(n):n),8*n.length))}function u(n,t){n=r?i(n):n,t=r?i(t):t;var e,o=0,u=l(n),c=Array(32),s=Array(32);for(u.length>32&&(u=h(u,8*n.length));o<32;o+=1)c[o]=909522486^u[o],s[o]=1549556828^u[o];return e=h(c.concat(l(t)),1024+8*t.length),a(h(s.concat(e),1536))}function h(n,e){var r,o,i,u=new Array(80),h=new Array(16),c=[new s(1779033703,-205731576),new s(-1150833019,-2067093701),new s(1013904242,-23791573),new s(-1521486534,1595750129),new s(1359893119,-1377402159),new s(-1694144372,725511199),new s(528734635,-79577749),new s(1541459225,327033209)],a=new s(0,0),l=new s(0,0),d=new s(0,0),B=new s(0,0),g=new s(0,0),p=new s(0,0),v=new s(0,0),y=new s(0,0),_=new s(0,0),m=new s(0,0),b=new s(0,0),x=new s(0,0),S=new s(0,0),O=new s(0,0),L=new s(0,0),P=new s(0,0),T=new s(0,0);for(void 0===t&&(t=[new s(1116352408,-685199838),new s(1899447441,602891725),new s(-1245643825,-330482897),new s(-373957723,-2121671748),new s(961987163,-213338824),new s(1508970993,-1241133031),new s(-1841331548,-1357295717),new s(-1424204075,-630357736),new s(-670586216,-1560083902),new s(310598401,1164996542),new s(607225278,1323610764),new s(1426881987,-704662302),new s(1925078388,-226784913),new s(-2132889090,991336113),new s(-1680079193,633803317),new s(-1046744716,-815192428),new s(-459576895,-1628353838),new s(-272742522,944711139),new s(264347078,-1953704523),new s(604807628,2007800933),new s(770255983,1495990901),new s(1249150122,1856431235),new s(1555081692,-1119749164),new s(1996064986,-2096016459),new s(-1740746414,-295247957),new s(-1473132947,766784016),new s(-1341970488,-1728372417),new s(-1084653625,-1091629340),new s(-958395405,1034457026),new s(-710438585,-1828018395),new s(113926993,-536640913),new s(338241895,168717936),new s(666307205,1188179964),new s(773529912,1546045734),new s(1294757372,1522805485),new s(1396182291,-1651133473),new s(1695183700,-1951439906),new s(1986661051,1014477480),new s(-2117940946,1206759142),new s(-1838011259,344077627),new s(-1564481375,1290863460),new s(-1474664885,-1136513023),new s(-1035236496,-789014639),new s(-949202525,106217008),new s(-778901479,-688958952),new s(-694614492,1432725776),new s(-200395387,1467031594),new s(275423344,851169720),new s(430227734,-1194143544),new s(506948616,1363258195),new s(659060556,-544281703),new s(883997877,-509917016),new s(958139571,-976659869),new s(1322822218,-482243893),new s(1537002063,2003034995),new s(1747873779,-692930397),new s(1955562222,1575990012),new s(2024104815,1125592928),new s(-2067236844,-1578062990),new s(-1933114872,442776044),new s(-1866530822,593698344),new s(-1538233109,-561857047),new s(-1090935817,-1295615723),new s(-965641998,-479046869),new s(-903397682,-366583396),new s(-779700025,566280711),new s(-354779690,-840897762),new s(-176337025,-294727304),new s(116418474,1914138554),new s(174292421,-1563912026),new s(289380356,-1090974290),new s(460393269,320620315),new s(685471733,587496836),new s(852142971,1086792851),new s(1017036298,365543100),new s(1126000580,-1676669620),new s(1288033470,-885112138),new s(1501505948,-60457430),new s(1607167915,987167468),new s(1816402316,1246189591)]),o=0;o<80;o+=1)u[o]=new s(0,0);for(n[e>>5]|=128<<24-(31&e),n[31+(e+128>>10<<5)]=e,i=n.length,o=0;o<i;o+=32){for(f(d,c[0]),f(B,c[1]),f(g,c[2]),f(p,c[3]),f(v,c[4]),f(y,c[5]),f(_,c[6]),f(m,c[7]),r=0;r<16;r+=1)u[r].h=n[o+2*r],u[r].l=n[o+2*r+1];for(r=16;r<80;r+=1)C(L,u[r-2],19),D(P,u[r-2],29),A(T,u[r-2],6),x.l=L.l^P.l^T.l,x.h=L.h^P.h^T.h,C(L,u[r-15],1),C(P,u[r-15],8),A(T,u[r-15],7),b.l=L.l^P.l^T.l,b.h=L.h^P.h^T.h,E(u[r],x,u[r-7],b,u[r-16]);for(r=0;r<80;r+=1)S.l=v.l&y.l^~v.l&_.l,S.h=v.h&y.h^~v.h&_.h,C(L,v,14),C(P,v,18),D(T,v,9),x.l=L.l^P.l^T.l,x.h=L.h^P.h^T.h,C(L,d,28),D(P,d,2),D(T,d,7),b.l=L.l^P.l^T.l,b.h=L.h^P.h^T.h,O.l=d.l&B.l^d.l&g.l^B.l&g.l,O.h=d.h&B.h^d.h&g.h^B.h&g.h,F(a,m,x,S,t[r],u[r]),w(l,b,O),f(m,_),f(_,y),f(y,v),w(v,p,a),f(p,g),f(g,B),f(B,d),w(d,a,l);w(c[0],c[0],d),w(c[1],c[1],B),w(c[2],c[2],g),w(c[3],c[3],p),w(c[4],c[4],v),w(c[5],c[5],y),w(c[6],c[6],_),w(c[7],c[7],m)}for(o=0;o<8;o+=1)h[2*o]=c[o].h,h[2*o+1]=c[o].l;return h}function s(n,t){this.h=n,this.l=t}function f(n,t){n.h=t.h,n.l=t.l}function C(n,t,e){n.l=t.l>>>e|t.h<<32-e,n.h=t.h>>>e|t.l<<32-e}function D(n,t,e){n.l=t.h>>>e|t.l<<32-e,n.h=t.l>>>e|t.h<<32-e}function A(n,t,e){n.l=t.l>>>e|t.h<<32-e,n.h=t.h>>>e}function w(n,t,e){var r=(65535&t.l)+(65535&e.l),o=(t.l>>>16)+(e.l>>>16)+(r>>>16),i=(65535&t.h)+(65535&e.h)+(o>>>16),u=(t.h>>>16)+(e.h>>>16)+(i>>>16);n.l=65535&r|o<<16,n.h=65535&i|u<<16}function E(n,t,e,r,o){var i=(65535&t.l)+(65535&e.l)+(65535&r.l)+(65535&o.l),u=(t.l>>>16)+(e.l>>>16)+(r.l>>>16)+(o.l>>>16)+(i>>>16),h=(65535&t.h)+(65535&e.h)+(65535&r.h)+(65535&o.h)+(u>>>16),c=(t.h>>>16)+(e.h>>>16)+(r.h>>>16)+(o.h>>>16)+(h>>>16);n.l=65535&i|u<<16,n.h=65535&h|c<<16}function F(n,t,e,r,o,i){var u=(65535&t.l)+(65535&e.l)+(65535&r.l)+(65535&o.l)+(65535&i.l),h=(t.l>>>16)+(e.l>>>16)+(r.l>>>16)+(o.l>>>16)+(i.l>>>16)+(u>>>16),c=(65535&t.h)+(65535&e.h)+(65535&r.h)+(65535&o.h)+(65535&i.h)+(h>>>16),a=(t.h>>>16)+(e.h>>>16)+(r.h>>>16)+(o.h>>>16)+(i.h>>>16)+(c>>>16);n.l=65535&u|h<<16,n.h=65535&c|a<<16}this.hex=function(n){return c(o(n))},this.b64=function(n){return B(o(n),e)},this.any=function(n,t){return d(o(n),t)},this.raw=function(n){return o(n)},this.hex_hmac=function(n,t){return c(u(n,t))},this.b64_hmac=function(n,t){return B(u(n,t),e)},this.any_hmac=function(n,t,e){return d(u(n,t),e)},this.vm_test=function(){return"900150983cd24fb0d6963f7d28e17f72"===hex("abc").toLowerCase()},this.setUpperCase=function(n){return this},this.setPad=function(n){return e=n||e,this},this.setUTF8=function(n){return"boolean"==typeof n&&(r=n),this}},RMD160:function(n){n&&"boolean"==typeof n.uppercase&&n.uppercase;var t=n&&"string"==typeof n.pad?n.pa:"=",e=!n||"boolean"!=typeof n.utf8||n.utf8,r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],o=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],a=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],s=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];function l(n){return D(A(f(n=e?i(n):n),8*n.length))}function C(n,t){n=e?i(n):n,t=e?i(t):t;var r,o,u=f(n),h=Array(16),c=Array(16);for(u.length>16&&(u=A(u,8*n.length)),r=0;r<16;r+=1)h[r]=909522486^u[r],c[r]=1549556828^u[r];return o=A(h.concat(f(t)),512+8*t.length),D(A(c.concat(o),672))}function D(n){var t,e="",r=32*n.length;for(t=0;t<r;t+=8)e+=String.fromCharCode(n[t>>5]>>>t%32&255);return e}function A(n,t){var e,i,c,f,l,d,B,C,D,A,g,p,v,y,_=1732584193,m=4023233417,b=2562383102,x=271733878,S=3285377520;for(n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t,f=n.length,c=0;c<f;c+=16){for(l=A=_,d=g=m,B=p=b,C=v=x,D=y=S,i=0;i<=79;i+=1)e=u(l,w(i,d,B,C)),e=u(e,n[c+r[i]]),e=u(e,E(i)),e=u(h(e,a[i]),D),l=D,D=C,C=h(B,10),B=d,d=e,e=u(A,w(79-i,g,p,v)),e=u(e,n[c+o[i]]),e=u(e,F(i)),e=u(h(e,s[i]),y),A=y,y=v,v=h(p,10),p=g,g=e;e=u(m,u(B,v)),m=u(b,u(C,y)),b=u(x,u(D,A)),x=u(S,u(l,g)),S=u(_,u(d,p)),_=e}return[_,m,b,x,S]}function w(n,t,e,r){return 0<=n&&n<=15?t^e^r:16<=n&&n<=31?t&e|~t&r:32<=n&&n<=47?(t|~e)^r:48<=n&&n<=63?t&r|e&~r:64<=n&&n<=79?t^(e|~r):"rmd160_f: j out of range"}function E(n){return 0<=n&&n<=15?0:16<=n&&n<=31?1518500249:32<=n&&n<=47?1859775393:48<=n&&n<=63?2400959708:64<=n&&n<=79?2840853838:"rmd160_K1: j out of range"}function F(n){return 0<=n&&n<=15?1352829926:16<=n&&n<=31?1548603684:32<=n&&n<=47?1836072691:48<=n&&n<=63?2053994217:64<=n&&n<=79?0:"rmd160_K2: j out of range"}this.hex=function(n){return c(l(n))},this.b64=function(n){return B(l(n),t)},this.any=function(n,t){return d(l(n),t)},this.raw=function(n){return l(n)},this.hex_hmac=function(n,t){return c(C(n,t))},this.b64_hmac=function(n,e){return B(C(n,e),t)},this.any_hmac=function(n,t,e){return d(C(n,t),e)},this.vm_test=function(){return"900150983cd24fb0d6963f7d28e17f72"===hex("abc").toLowerCase()},this.setUpperCase=function(n){return this},this.setPad=function(n){return void 0!==n&&(t=n),this},this.setUTF8=function(n){return"boolean"==typeof n&&(e=n),this}}},t&&"object"==typeof e.g&&e.g&&e.g===e.g.global&&e.g,void 0===(r=function(){return o}.call(t,e,t,n))||(n.exports=r)}()}},t={};function e(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return n[r](i,i.exports,e),i.exports}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),(()=>{"use strict";class n{has(n){return Boolean(this[n])}add(n){this[n["message-id"]]=n}get(n){return this[n]}pop(n){let t=this[n];return delete this[n],t}}var t=function(n,t,e,r){return new(e||(e=Promise))((function(o,i){function u(n){try{c(r.next(n))}catch(n){i(n)}}function h(n){try{c(r.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?o(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(u,h)}c((r=r.apply(n,t||[])).next())}))},r=new(e(887).SHA256);function o(n,e=7,r=50){return t(this,void 0,void 0,(function*(){return function o(i=0){return t(this,void 0,void 0,(function*(){return i&&(yield u(Math.pow(2,i)*r)),n()?Promise.resolve():i>e?Promise.reject("Max retries reached"):o(i+1)}))}()}))}function i(n,t,e){let o=r.b64(n+t);return r.b64(o+e)}function u(n){return t(this,void 0,void 0,(function*(){return new Promise((t=>setTimeout(t,n)))}))}var h=function(n,t,e,r){return new(e||(e=Promise))((function(o,i){function u(n){try{c(r.next(n))}catch(n){i(n)}}function h(n){try{c(r.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?o(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(u,h)}c((r=r.apply(n,t||[])).next())}))};class c extends WebSocket{constructor(t="ws://localhost:4444",e="",r=!1){super(t),this.__uuid=1,this.__connected=!1,this.__password=e,this.__buffer=new n,this.__callbacks=new Map,this.LOG_IO=r,super.onopen=this.connection_handler,super.onmessage=this.message_handler}get isconnected(){return this.__connected}get password(){return this.__password}next_uuid(){return String(this.__uuid++)}send(n,t){const e=Object.create(null,{send:{get:()=>super.send}});return h(this,void 0,void 0,(function*(){let r=t||{};return r["message-id"]=this.next_uuid(),r["request-type"]=n,e.send.call(this,JSON.stringify(r)),this.LOG_IO&&console.log("<",r),r["message-id"]}))}call(n,t){return h(this,void 0,void 0,(function*(){let e=yield this.send(n,t);return yield o((()=>this.__buffer.has(e))),this.__buffer.pop(e)}))}message_handler(n){return h(this,void 0,void 0,(function*(){let t=JSON.parse(n.data),e=t["update-type"];t["message-id"]&&this.__buffer.add(t),this.__callbacks.has(e)&&this.emit_event(e),this.LOG_IO&&console.log(">",t)}))}connection_handler(){return h(this,void 0,void 0,(function*(){let n=yield this.call("GetAuthRequired");if(n.authRequired&&(n=yield this.call("Authenticate",{auth:i(this.password,n.salt,n.challenge)})),n.error)throw n.error;this.__connected=!0}))}add_event_listener(n,t){this.__callbacks.has(n)||this.__callbacks.set(n,new Array),this.__callbacks.get(n).push(t)}emit_event(n){return h(this,void 0,void 0,(function*(){this.__callbacks.get(n).forEach((n=>h(this,void 0,void 0,(function*(){return yield n()}))))}))}get_scene_list(n="."){return h(this,void 0,void 0,(function*(){let t,e=[],r=yield this.call("GetSceneList");for(let t of r.scenes)t.name.startsWith(n)||e.push(t.name);return t=e.indexOf(r["current-scene"]),{scenes:e,active:t}}))}switch_to_scene(n){return h(this,void 0,void 0,(function*(){yield this.call("SetCurrentScene",{"scene-name":n})}))}}var a=function(n,t,e,r){return new(e||(e=Promise))((function(o,i){function u(n){try{c(r.next(n))}catch(n){i(n)}}function h(n){try{c(r.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?o(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(u,h)}c((r=r.apply(n,t||[])).next())}))};const s=document,f=s.getElementById("auth-div"),l=s.getElementById("scene-list"),d={};function B(){return a(this,void 0,void 0,(function*(){f.className="fade-out-mid";let n=d.host.value||"ws://localhost:4444",t=d.pass.value;var e=new c(n,t);if(yield o((()=>e.isconnected)),e.isconnected){f.className="fade-out-end",yield u(900),f.remove();const n=function(){return a(this,void 0,void 0,(function*(){let n=yield e.get_scene_list();l.innerHTML="",n.scenes.forEach(((t,r)=>{let o=s.createElement("button");o.textContent=t,r==n.active&&(o.className="selected"),o.addEventListener("click",(()=>{l.getElementsByClassName("selected")[0].className="",o.className="selected",e.switch_to_scene(o.textContent)})),l.appendChild(o)}))}))};yield n(),e.add_event_listener("TransitionBegin",(()=>a(this,void 0,void 0,(function*(){return yield n()})))),e.add_event_listener("SwitchScenes",(()=>a(this,void 0,void 0,(function*(){return yield n()})))),l.className="fade-in-image"}}))}[{name:"host",tag:"input",id:"host",type:"text",placeholder:"host",textContent:""},{name:"pass",tag:"input",id:"pass",type:"password",placeholder:"password",textContent:""},{name:"button",tag:"button",id:"connect-btn",textContent:"connect"}].forEach((n=>{d[n.name]=function(n){let t=s.createElement(n.tag);for(const e in n)t.setAttribute(e,n[e]);return t.textContent=n.textContent,t}(n),f.appendChild(d[n.name])})),d.button.addEventListener("click",B),s.addEventListener("keydown",(function(n){switch(n.key){case"Enter":B()}}))})()})();