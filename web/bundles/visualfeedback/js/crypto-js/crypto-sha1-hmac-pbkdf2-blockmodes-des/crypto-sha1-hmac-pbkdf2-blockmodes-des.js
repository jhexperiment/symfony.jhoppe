/*
 * Crypto-JS v2.5.3
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(typeof Crypto=="undefined"||!Crypto.util)&&function(){var f=window.Crypto={},k=f.util={rotl:function(b,c){return b<<c|b>>>32-c},rotr:function(b,c){return b<<32-c|b>>>c},endian:function(b){if(b.constructor==Number)return k.rotl(b,8)&16711935|k.rotl(b,24)&4278255360;for(var c=0;c<b.length;c++)b[c]=k.endian(b[c]);return b},randomBytes:function(b){for(var c=[];b>0;b--)c.push(Math.floor(Math.random()*256));return c},bytesToWords:function(b){for(var c=[],a=0,j=0;a<b.length;a++,j+=8)c[j>>>5]|=(b[a]&255)<<
24-j%32;return c},wordsToBytes:function(b){for(var c=[],a=0;a<b.length*32;a+=8)c.push(b[a>>>5]>>>24-a%32&255);return c},bytesToHex:function(b){for(var c=[],a=0;a<b.length;a++)c.push((b[a]>>>4).toString(16)),c.push((b[a]&15).toString(16));return c.join("")},hexToBytes:function(b){for(var c=[],a=0;a<b.length;a+=2)c.push(parseInt(b.substr(a,2),16));return c},bytesToBase64:function(b){if(typeof btoa=="function")return btoa(h.bytesToString(b));for(var c=[],a=0;a<b.length;a+=3)for(var j=b[a]<<16|b[a+1]<<
8|b[a+2],d=0;d<4;d++)a*8+d*6<=b.length*8?c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(j>>>6*(3-d)&63)):c.push("=");return c.join("")},base64ToBytes:function(b){if(typeof atob=="function")return h.stringToBytes(atob(b));for(var b=b.replace(/[^A-Z0-9+\/]/ig,""),c=[],a=0,j=0;a<b.length;j=++a%4)j!=0&&c.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(a-1))&Math.pow(2,-2*j+8)-1)<<j*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(a))>>>
6-j*2);return c}},f=f.charenc={};f.UTF8={stringToBytes:function(b){return h.stringToBytes(unescape(encodeURIComponent(b)))},bytesToString:function(b){return decodeURIComponent(escape(h.bytesToString(b)))}};var h=f.Binary={stringToBytes:function(b){for(var c=[],a=0;a<b.length;a++)c.push(b.charCodeAt(a)&255);return c},bytesToString:function(b){for(var c=[],a=0;a<b.length;a++)c.push(String.fromCharCode(b[a]));return c.join("")}}}();
(function(){var f=Crypto,k=f.util,h=f.charenc,b=h.UTF8,c=h.Binary,a=f.SHA1=function(b,d){var e=k.wordsToBytes(a._sha1(b));return d&&d.asBytes?e:d&&d.asString?c.bytesToString(e):k.bytesToHex(e)};a._sha1=function(a){a.constructor==String&&(a=b.stringToBytes(a));var d=k.bytesToWords(a),e=a.length*8,a=[],g=1732584193,c=-271733879,f=-1732584194,i=271733878,h=-1009589776;d[e>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+15]=e;for(e=0;e<d.length;e+=16){for(var o=g,q=c,r=f,p=i,u=h,l=0;l<80;l++){if(l<16)a[l]=d[e+l];else{var s=
a[l-3]^a[l-8]^a[l-14]^a[l-16];a[l]=s<<1|s>>>31}s=(g<<5|g>>>27)+h+(a[l]>>>0)+(l<20?(c&f|~c&i)+1518500249:l<40?(c^f^i)+1859775393:l<60?(c&f|c&i|f&i)-1894007588:(c^f^i)-899497514);h=i;i=f;f=c<<30|c>>>2;c=g;g=s}g+=o;c+=q;f+=r;i+=p;h+=u}return[g,c,f,i,h]};a._blocksize=16;a._digestsize=20})();
(function(){var f=Crypto,k=f.util,h=f.charenc,b=h.UTF8,c=h.Binary;f.HMAC=function(a,j,d,e){j.constructor==String&&(j=b.stringToBytes(j));d.constructor==String&&(d=b.stringToBytes(d));d.length>a._blocksize*4&&(d=a(d,{asBytes:!0}));for(var g=d.slice(0),d=d.slice(0),f=0;f<a._blocksize*4;f++)g[f]^=92,d[f]^=54;a=a(g.concat(a(d.concat(j),{asBytes:!0})),{asBytes:!0});return e&&e.asBytes?a:e&&e.asString?c.bytesToString(a):k.bytesToHex(a)}})();
(function(){var f=Crypto,k=f.util,h=f.charenc,b=h.UTF8,c=h.Binary;f.PBKDF2=function(a,j,d,e){function g(a,d){return f.HMAC(m,d,a,{asBytes:!0})}a.constructor==String&&(a=b.stringToBytes(a));j.constructor==String&&(j=b.stringToBytes(j));for(var m=e&&e.hasher||f.SHA1,h=e&&e.iterations||1,i=[],t=1;i.length<d;){for(var o=g(a,j.concat(k.wordsToBytes([t]))),q=o,r=1;r<h;r++)for(var q=g(a,q),p=0;p<o.length;p++)o[p]^=q[p];i=i.concat(o);t++}i.length=d;return e&&e.asBytes?i:e&&e.asString?c.bytesToString(i):k.bytesToHex(i)}})();
(function(f){function k(a,b){var d=a._blocksize*4;return d-b.length%d}var h=f.pad={},b=function(a){for(var b=a.pop(),d=1;d<b;d++)a.pop()};h.NoPadding={pad:function(){},unpad:function(){}};h.ZeroPadding={pad:function(a,b){var d=a._blocksize*4,e=b.length%d;if(e!=0)for(e=d-e;e>0;e--)b.push(0)},unpad:function(){}};h.iso7816={pad:function(a,b){var d=k(a,b);for(b.push(128);d>1;d--)b.push(0)},unpad:function(a){for(;a.pop()!=128;);}};h.ansix923={pad:function(a,b){for(var d=k(a,b),e=1;e<d;e++)b.push(0);b.push(d)},
unpad:b};h.iso10126={pad:function(a,b){for(var d=k(a,b),e=1;e<d;e++)b.push(Math.floor(Math.random()*256));b.push(d)},unpad:b};h.pkcs7={pad:function(a,b){for(var d=k(a,b),e=0;e<d;e++)b.push(d)},unpad:b};var f=f.mode={},c=f.Mode=function(a){if(a)this._padding=a};c.prototype={encrypt:function(a,b,d){this._padding.pad(a,b);this._doEncrypt(a,b,d)},decrypt:function(a,b,d){this._doDecrypt(a,b,d);this._padding.unpad(b)},_padding:h.iso7816};b=(f.ECB=function(){c.apply(this,arguments)}).prototype=new c;b._doEncrypt=
function(a,b){for(var d=a._blocksize*4,e=0;e<b.length;e+=d)a._encryptblock(b,e)};b._doDecrypt=function(a,b){for(var d=a._blocksize*4,e=0;e<b.length;e+=d)a._decryptblock(b,e)};b.fixOptions=function(a){a.iv=[]};b=(f.CBC=function(){c.apply(this,arguments)}).prototype=new c;b._doEncrypt=function(a,b,d){for(var e=a._blocksize*4,g=0;g<b.length;g+=e){if(g==0)for(var c=0;c<e;c++)b[c]^=d[c];else for(c=0;c<e;c++)b[g+c]^=b[g+c-e];a._encryptblock(b,g)}};b._doDecrypt=function(a,b,d){for(var e=a._blocksize*4,g=
0;g<b.length;g+=e){var c=b.slice(g,g+e);a._decryptblock(b,g);for(var f=0;f<e;f++)b[g+f]^=d[f];d=c}};b=(f.CFB=function(){c.apply(this,arguments)}).prototype=new c;b._padding=h.NoPadding;b._doEncrypt=function(a,b,d){for(var e=a._blocksize*4,d=d.slice(0),g=0;g<b.length;g++){var c=g%e;c==0&&a._encryptblock(d,0);b[g]^=d[c];d[c]=b[g]}};b._doDecrypt=function(a,b,d){for(var e=a._blocksize*4,d=d.slice(0),g=0;g<b.length;g++){var c=g%e;c==0&&a._encryptblock(d,0);var f=b[g];b[g]^=d[c];d[c]=f}};b=(f.OFB=function(){c.apply(this,
arguments)}).prototype=new c;b._padding=h.NoPadding;b._doEncrypt=function(a,b,d){for(var e=a._blocksize*4,d=d.slice(0),c=0;c<b.length;c++)c%e==0&&a._encryptblock(d,0),b[c]^=d[c%e]};b._doDecrypt=b._doEncrypt;f=(f.CTR=function(){c.apply(this,arguments)}).prototype=new c;f._padding=h.NoPadding;f._doEncrypt=function(a,b,d){for(var e=a._blocksize*4,d=d.slice(0),c=0;c<b.length;){var f=d.slice(0);a._encryptblock(f,0);for(var h=0;c<b.length&&h<e;h++,c++)b[c]^=f[h];++d[e-1]==256&&(d[e-1]=0,++d[e-2]==256&&
(d[e-2]=0,++d[e-3]==256&&(d[e-3]=0,++d[e-4])))}};f._doDecrypt=f._doEncrypt})(Crypto);
(function(){var f=Crypto,k=f.util,h=f.charenc.UTF8,b;b=function(a){this.keys=Array(16);this._initialiseKeys(a)};b.PC1_offsets=[7,6,5,4,3,2,1,0,7,6,5,4,3,2,1,0,7,6,5,4,3,2,1,0,7,6,5,4,7,6,5,4,3,2,1,0,7,6,5,4,3,2,1,0,7,6,5,4,3,2,1,0,3,2,1,0];b.PC1_masks=[128,128,128,128,128,128,128,128,64,64,64,64,64,64,64,64,32,32,32,32,32,32,32,32,16,16,16,16,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,8,8,8,8,8,8,8,8,16,16,16,16];b.PC2_offsets1=[0,3,1,2,0,1,3,2,0,1,0,2,3,0,1,3,0,0,2,3,1,0,2,0,0,2,3,1];b.PC2_offsets2=[7,5,4,
7,5,6,0,7,4,0,6,5,4,7,0,6,5,7,4,5,6,7,5,4,6,0,4,6];b.PC2_masks1=[2,1,32,4,1,4,16,1,0,1,8,8,2,32,8,32,16,0,16,4,2,0,32,4,0,2,8,16];b.PC2_masks2=[2,32,8,1,2,2,0,4,4,0,8,16,32,16,0,32,4,32,2,1,16,8,8,16,1,0,1,4];b.keyShifts=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28];b.prototype._initialiseKeys=function(a){var e,c=Array(56);for(e=0;e<56;e++)c[e]=(a[b.PC1_offsets[e]]&b.PC1_masks[e])!=0;a=c.slice(0,28);c=c.slice(28,56);a=a.concat(a);c=c.concat(c);for(e=0;e<16;e++){for(var f=[0,0,0,0,0,0,0,0],h=b.keyShifts[e],
i=0;i<28;i++)a[i+h]&&(f[b.PC2_offsets1[i]]+=b.PC2_masks1[i]),c[i+h]&&(f[b.PC2_offsets2[i]]+=b.PC2_masks2[i]);f[0]=((f[0]&31)<<27)+((f[0]&32)>>5);for(i=1;i<=6;i++)f[i]<<=27-4*i;f[7]=((f[7]&62)>>1)+((f[7]&1)<<31);this.keys[e]=f}};b.prototype.getKey=function(a){return this.keys[a]};var c;c=function(){this.rhs=this.lhs=0};c.SBOX_MASK=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679];c.SBOX=Array(8);var a=c.SBOX;a[0]=[];a[0][0]=8421888;a[0][268435456]=32768;a[0][536870912]=8421378;a[0][805306368]=
2;a[0][1073741824]=512;a[0][1342177280]=8421890;a[0][1610612736]=8389122;a[0][1879048192]=8388608;a[0][-2147483648]=514;a[0][-1879048192]=8389120;a[0][-1610612736]=33280;a[0][-1342177280]=8421376;a[0][-1073741824]=32770;a[0][-805306368]=8388610;a[0][-536870912]=0;a[0][-268435456]=33282;a[0][134217728]=0;a[0][402653184]=8421890;a[0][671088640]=33282;a[0][939524096]=32768;a[0][1207959552]=8421888;a[0][1476395008]=512;a[0][1744830464]=8421378;a[0][2013265920]=2;a[0][-2013265920]=8389120;a[0][-1744830464]=
33280;a[0][-1476395008]=8421376;a[0][-1207959552]=8389122;a[0][-939524096]=8388610;a[0][-671088640]=32770;a[0][-402653184]=514;a[0][-134217728]=8388608;a[0][1]=32768;a[0][268435457]=2;a[0][536870913]=8421888;a[0][805306369]=8388608;a[0][1073741825]=8421378;a[0][1342177281]=33280;a[0][1610612737]=512;a[0][1879048193]=8389122;a[0][-2147483647]=8421890;a[0][-1879048191]=8421376;a[0][-1610612735]=8388610;a[0][-1342177279]=33282;a[0][-1073741823]=514;a[0][-805306367]=8389120;a[0][-536870911]=32770;a[0][-268435455]=
0;a[0][134217729]=8421890;a[0][402653185]=8421376;a[0][671088641]=8388608;a[0][939524097]=512;a[0][1207959553]=32768;a[0][1476395009]=8388610;a[0][1744830465]=2;a[0][2013265921]=33282;a[0][-2013265919]=32770;a[0][-1744830463]=8389122;a[0][-1476395007]=514;a[0][-1207959551]=8421888;a[0][-939524095]=8389120;a[0][-671088639]=0;a[0][-402653183]=33280;a[0][-134217727]=8421378;a[1]=[];a[1][0]=1074282512;a[1][16777216]=16384;a[1][33554432]=524288;a[1][50331648]=1074266128;a[1][67108864]=1073741840;a[1][83886080]=
1074282496;a[1][100663296]=1073758208;a[1][117440512]=16;a[1][134217728]=540672;a[1][150994944]=1073758224;a[1][167772160]=1073741824;a[1][184549376]=540688;a[1][201326592]=524304;a[1][218103808]=0;a[1][234881024]=16400;a[1][251658240]=1074266112;a[1][8388608]=1073758208;a[1][25165824]=540688;a[1][41943040]=16;a[1][58720256]=1073758224;a[1][75497472]=1074282512;a[1][92274688]=1073741824;a[1][109051904]=524288;a[1][125829120]=1074266128;a[1][142606336]=524304;a[1][159383552]=0;a[1][176160768]=16384;
a[1][192937984]=1074266112;a[1][209715200]=1073741840;a[1][226492416]=540672;a[1][243269632]=1074282496;a[1][260046848]=16400;a[1][268435456]=0;a[1][285212672]=1074266128;a[1][301989888]=1073758224;a[1][318767104]=1074282496;a[1][335544320]=1074266112;a[1][352321536]=16;a[1][369098752]=540688;a[1][385875968]=16384;a[1][402653184]=16400;a[1][419430400]=524288;a[1][436207616]=524304;a[1][452984832]=1073741840;a[1][469762048]=540672;a[1][486539264]=1073758208;a[1][503316480]=1073741824;a[1][520093696]=
1074282512;a[1][276824064]=540688;a[1][293601280]=524288;a[1][310378496]=1074266112;a[1][327155712]=16384;a[1][343932928]=1073758208;a[1][360710144]=1074282512;a[1][377487360]=16;a[1][394264576]=1073741824;a[1][411041792]=1074282496;a[1][427819008]=1073741840;a[1][444596224]=1073758224;a[1][461373440]=524304;a[1][478150656]=0;a[1][494927872]=16400;a[1][511705088]=1074266128;a[1][528482304]=540672;a[2]=[];a[2][0]=260;a[2][1048576]=0;a[2][2097152]=67109120;a[2][3145728]=65796;a[2][4194304]=65540;a[2][5242880]=
67108868;a[2][6291456]=67174660;a[2][7340032]=67174400;a[2][8388608]=67108864;a[2][9437184]=67174656;a[2][10485760]=65792;a[2][11534336]=67174404;a[2][12582912]=67109124;a[2][13631488]=65536;a[2][14680064]=4;a[2][15728640]=256;a[2][524288]=67174656;a[2][1572864]=67174404;a[2][2621440]=0;a[2][3670016]=67109120;a[2][4718592]=67108868;a[2][5767168]=65536;a[2][6815744]=65540;a[2][7864320]=260;a[2][8912896]=4;a[2][9961472]=256;a[2][11010048]=67174400;a[2][12058624]=65796;a[2][13107200]=65792;a[2][14155776]=
67109124;a[2][15204352]=67174660;a[2][16252928]=67108864;a[2][16777216]=67174656;a[2][17825792]=65540;a[2][18874368]=65536;a[2][19922944]=67109120;a[2][20971520]=256;a[2][22020096]=67174660;a[2][23068672]=67108868;a[2][24117248]=0;a[2][25165824]=67109124;a[2][26214400]=67108864;a[2][27262976]=4;a[2][28311552]=65792;a[2][29360128]=67174400;a[2][30408704]=260;a[2][31457280]=65796;a[2][32505856]=67174404;a[2][17301504]=67108864;a[2][18350080]=260;a[2][19398656]=67174656;a[2][20447232]=0;a[2][21495808]=
65540;a[2][22544384]=67109120;a[2][23592960]=256;a[2][24641536]=67174404;a[2][25690112]=65536;a[2][26738688]=67174660;a[2][27787264]=65796;a[2][28835840]=67108868;a[2][29884416]=67109124;a[2][30932992]=67174400;a[2][31981568]=4;a[2][33030144]=65792;a[3]=[];a[3][0]=2151682048;a[3][65536]=2147487808;a[3][131072]=4198464;a[3][196608]=2151677952;a[3][262144]=0;a[3][327680]=4198400;a[3][393216]=2147483712;a[3][458752]=4194368;a[3][524288]=2147483648;a[3][589824]=4194304;a[3][655360]=64;a[3][720896]=2147487744;
a[3][786432]=2151678016;a[3][851968]=4160;a[3][917504]=4096;a[3][983040]=2151682112;a[3][32768]=2147487808;a[3][98304]=64;a[3][163840]=2151678016;a[3][229376]=2147487744;a[3][294912]=4198400;a[3][360448]=2151682112;a[3][425984]=0;a[3][491520]=2151677952;a[3][557056]=4096;a[3][622592]=2151682048;a[3][688128]=4194304;a[3][753664]=4160;a[3][819200]=2147483648;a[3][884736]=4194368;a[3][950272]=4198464;a[3][1015808]=2147483712;a[3][1048576]=4194368;a[3][1114112]=4198400;a[3][1179648]=2147483712;a[3][1245184]=
0;a[3][1310720]=4160;a[3][1376256]=2151678016;a[3][1441792]=2151682048;a[3][1507328]=2147487808;a[3][1572864]=2151682112;a[3][1638400]=2147483648;a[3][1703936]=2151677952;a[3][1769472]=4198464;a[3][1835008]=2147487744;a[3][1900544]=4194304;a[3][1966080]=64;a[3][2031616]=4096;a[3][1081344]=2151677952;a[3][1146880]=2151682112;a[3][1212416]=0;a[3][1277952]=4198400;a[3][1343488]=4194368;a[3][1409024]=2147483648;a[3][1474560]=2147487808;a[3][1540096]=64;a[3][1605632]=2147483712;a[3][1671168]=4096;a[3][1736704]=
2147487744;a[3][1802240]=2151678016;a[3][1867776]=4160;a[3][1933312]=2151682048;a[3][1998848]=4194304;a[3][2064384]=4198464;a[4]=[];a[4][0]=128;a[4][4096]=17039360;a[4][8192]=262144;a[4][12288]=536870912;a[4][16384]=537133184;a[4][20480]=16777344;a[4][24576]=553648256;a[4][28672]=262272;a[4][32768]=16777216;a[4][36864]=537133056;a[4][40960]=536871040;a[4][45056]=553910400;a[4][49152]=553910272;a[4][53248]=0;a[4][57344]=17039488;a[4][61440]=553648128;a[4][2048]=17039488;a[4][6144]=553648256;a[4][10240]=
128;a[4][14336]=17039360;a[4][18432]=262144;a[4][22528]=537133184;a[4][26624]=553910272;a[4][30720]=536870912;a[4][34816]=537133056;a[4][38912]=0;a[4][43008]=553910400;a[4][47104]=16777344;a[4][51200]=536871040;a[4][55296]=553648128;a[4][59392]=16777216;a[4][63488]=262272;a[4][65536]=262144;a[4][69632]=128;a[4][73728]=536870912;a[4][77824]=553648256;a[4][81920]=16777344;a[4][86016]=553910272;a[4][90112]=537133184;a[4][94208]=16777216;a[4][98304]=553910400;a[4][102400]=553648128;a[4][106496]=17039360;
a[4][110592]=537133056;a[4][114688]=262272;a[4][118784]=536871040;a[4][122880]=0;a[4][126976]=17039488;a[4][67584]=553648256;a[4][71680]=16777216;a[4][75776]=17039360;a[4][79872]=537133184;a[4][83968]=536870912;a[4][88064]=17039488;a[4][92160]=128;a[4][96256]=553910272;a[4][100352]=262272;a[4][104448]=553910400;a[4][108544]=0;a[4][112640]=553648128;a[4][116736]=16777344;a[4][120832]=262144;a[4][124928]=537133056;a[4][129024]=536871040;a[5]=[];a[5][0]=268435464;a[5][256]=8192;a[5][512]=270532608;a[5][768]=
270540808;a[5][1024]=268443648;a[5][1280]=2097152;a[5][1536]=2097160;a[5][1792]=268435456;a[5][2048]=0;a[5][2304]=268443656;a[5][2560]=2105344;a[5][2816]=8;a[5][3072]=270532616;a[5][3328]=2105352;a[5][3584]=8200;a[5][3840]=270540800;a[5][128]=270532608;a[5][384]=270540808;a[5][640]=8;a[5][896]=2097152;a[5][1152]=2105352;a[5][1408]=268435464;a[5][1664]=268443648;a[5][1920]=8200;a[5][2176]=2097160;a[5][2432]=8192;a[5][2688]=268443656;a[5][2944]=270532616;a[5][3200]=0;a[5][3456]=270540800;a[5][3712]=
2105344;a[5][3968]=268435456;a[5][4096]=268443648;a[5][4352]=270532616;a[5][4608]=270540808;a[5][4864]=8200;a[5][5120]=2097152;a[5][5376]=268435456;a[5][5632]=268435464;a[5][5888]=2105344;a[5][6144]=2105352;a[5][6400]=0;a[5][6656]=8;a[5][6912]=270532608;a[5][7168]=8192;a[5][7424]=268443656;a[5][7680]=270540800;a[5][7936]=2097160;a[5][4224]=8;a[5][4480]=2105344;a[5][4736]=2097152;a[5][4992]=268435464;a[5][5248]=268443648;a[5][5504]=8200;a[5][5760]=270540808;a[5][6016]=270532608;a[5][6272]=270540800;
a[5][6528]=270532616;a[5][6784]=8192;a[5][7040]=2105352;a[5][7296]=2097160;a[5][7552]=0;a[5][7808]=268435456;a[5][8064]=268443656;a[6]=[];a[6][0]=1048576;a[6][16]=33555457;a[6][32]=1024;a[6][48]=1049601;a[6][64]=34604033;a[6][80]=0;a[6][96]=1;a[6][112]=34603009;a[6][128]=33555456;a[6][144]=1048577;a[6][160]=33554433;a[6][176]=34604032;a[6][192]=34603008;a[6][208]=1025;a[6][224]=1049600;a[6][240]=33554432;a[6][8]=34603009;a[6][24]=0;a[6][40]=33555457;a[6][56]=34604032;a[6][72]=1048576;a[6][88]=33554433;
a[6][104]=33554432;a[6][120]=1025;a[6][136]=1049601;a[6][152]=33555456;a[6][168]=34603008;a[6][184]=1048577;a[6][200]=1024;a[6][216]=34604033;a[6][232]=1;a[6][248]=1049600;a[6][256]=33554432;a[6][272]=1048576;a[6][288]=33555457;a[6][304]=34603009;a[6][320]=1048577;a[6][336]=33555456;a[6][352]=34604032;a[6][368]=1049601;a[6][384]=1025;a[6][400]=34604033;a[6][416]=1049600;a[6][432]=1;a[6][448]=0;a[6][464]=34603008;a[6][480]=33554433;a[6][496]=1024;a[6][264]=1049600;a[6][280]=33555457;a[6][296]=34603009;
a[6][312]=1;a[6][328]=33554432;a[6][344]=1048576;a[6][360]=1025;a[6][376]=34604032;a[6][392]=33554433;a[6][408]=34603008;a[6][424]=0;a[6][440]=34604033;a[6][456]=1049601;a[6][472]=1024;a[6][488]=33555456;a[6][504]=1048577;a[7]=[];a[7][0]=134219808;a[7][1]=131072;a[7][2]=134217728;a[7][3]=32;a[7][4]=131104;a[7][5]=134350880;a[7][6]=134350848;a[7][7]=2048;a[7][8]=134348800;a[7][9]=134219776;a[7][10]=133120;a[7][11]=134348832;a[7][12]=2080;a[7][13]=0;a[7][14]=134217760;a[7][15]=133152;a[7][-2147483648]=
2048;a[7][-2147483647]=134350880;a[7][-2147483646]=134219808;a[7][-2147483645]=134217728;a[7][-2147483644]=134348800;a[7][-2147483643]=133120;a[7][-2147483642]=133152;a[7][-2147483641]=32;a[7][-2147483640]=134217760;a[7][-2147483639]=2080;a[7][-2147483638]=131104;a[7][-2147483637]=134350848;a[7][-2147483636]=0;a[7][-2147483635]=134348832;a[7][-2147483634]=134219776;a[7][-2147483633]=131072;a[7][16]=133152;a[7][17]=134350848;a[7][18]=32;a[7][19]=2048;a[7][20]=134219776;a[7][21]=134217760;a[7][22]=
134348832;a[7][23]=131072;a[7][24]=0;a[7][25]=131104;a[7][26]=134348800;a[7][27]=134219808;a[7][28]=134350880;a[7][29]=133120;a[7][30]=2080;a[7][31]=134217728;a[7][-2147483632]=131072;a[7][-2147483631]=2048;a[7][-2147483630]=134348832;a[7][-2147483629]=133152;a[7][-2147483628]=32;a[7][-2147483627]=134348800;a[7][-2147483626]=134217728;a[7][-2147483625]=134219808;a[7][-2147483624]=134350880;a[7][-2147483623]=134217760;a[7][-2147483622]=134219776;a[7][-2147483621]=0;a[7][-2147483620]=133120;a[7][-2147483619]=
2080;a[7][-2147483618]=131104;a[7][-2147483617]=134350848;c.prototype._exchangeLR=function(a,b){var c=(this.lhs>>a^this.rhs)&b;this.rhs^=c;this.lhs^=c<<a};c.prototype._exchangeRL=function(a,b){var c=(this.rhs>>a^this.lhs)&b;this.lhs^=c;this.rhs^=c<<a};c.prototype.initialPerm=function(a,b){var c=a.slice(b,b+8);this.lhs=(c[0]<<24)+(c[1]<<16)+(c[2]<<8)+c[3];this.rhs=(c[4]<<24)+(c[5]<<16)+(c[6]<<8)+c[7];this._exchangeLR(4,252645135);this._exchangeLR(16,65535);this._exchangeRL(2,858993459);this._exchangeRL(8,
16711935);this._exchangeLR(1,1431655765)};c.prototype.round=function(a){for(var b=this.rhs,f=this.lhs,h=0,j=0;j<8;j++)h+=c.SBOX[j][(b^a[j])&c.SBOX_MASK[j]];this.lhs=b;this.rhs=f^h};c.prototype.finalPerm=function(a,b){var c=this.lhs;this.lhs=this.rhs;this.rhs=c;this._exchangeLR(1,1431655765);this._exchangeRL(8,16711935);this._exchangeRL(2,858993459);this._exchangeLR(16,65535);this._exchangeLR(4,252645135);a[b]=this.lhs>>24&255;a[b+1]=this.lhs>>16&255;a[b+2]=this.lhs>>8&255;a[b+3]=this.lhs&255;a[b+
4]=this.rhs>>24&255;a[b+5]=this.rhs>>16&255;a[b+6]=this.rhs>>8&255;a[b+7]=this.rhs&255};var j=f.DES={_blocksize:2,_keyschedule:null,_state:new c,_init:function(a){this._keyschedule=new b(a)},encrypt:function(a,c,g){var g=g||{},m=g.mode||new f.mode.OFB;m.fixOptions&&m.fixOptions(g);var a=a.constructor==String?h.stringToBytes(a):a,n=g.iv||k.randomBytes(8),c=c.constructor==String?f.PBKDF2(c,n,8,{asBytes:!0}):c;this._keyschedule=new b(c);m.encrypt(j,a,n);a=g.iv?a:n.concat(a);return g&&g.asBytes?a:k.bytesToBase64(a)},
_encryptblock:function(a,b){this._state.initialPerm(a,b);for(var c=0;c<=15;c++)this._state.round(this._keyschedule.getKey(c));this._state.finalPerm(a,b)},decrypt:function(a,c,g){var g=g||{},m=g.mode||new f.mode.OFB;m.fixOptions&&m.fixOptions(g);var a=a.constructor==String?k.base64ToBytes(a):a,n=g.iv||a.splice(0,8),c=c.constructor==String?f.PBKDF2(c,n,32,{asBytes:!0}):c;this._keyschedule=new b(c);m.decrypt(j,a,n);return g&&g.asBytes?a:h.bytesToString(a)},_decryptblock:function(a,b){this._state.initialPerm(a,
b);for(var c=15;c>=0;c--)this._state.round(this._keyschedule.getKey(c));this._state.finalPerm(a,b)}}})();
