/* الموسوعة القرآنية المترابطة | Quranic Hypertext Encyclopedia — الشيفرة المشتركة (update34)
   تعتمد على assets/topics.js (TOPICS وAXES وTLINKS) للبحث وروابط التذييل وخريطة الصفحة الرئيسية،
   وعلى assets/search.js (فهرس البحث الكامل) الذي يُحمَّل عند أول استعمال لصندوق البحث. */
function isAr(){return document.body.getAttribute('lang')==='ar'}
function toggleLanguage(){var b=document.body,btn=document.querySelector('.lang-btn');if(isAr()){b.setAttribute('lang','en');b.setAttribute('dir','ltr');btn.textContent='العربية'}else{b.setAttribute('lang','ar');b.setAttribute('dir','rtl');btn.textContent='English'}if(window.netLabels)netLabels()}
function goBackToPreviousReading(){if(window.history.length>1)window.history.back();else window.location.hash='#hero'}

/* الجداول: كل جدول غير ملفوف يُلف بغلاف قابل للتمرير حتى لا يتجاوز عرض الهاتف */
document.querySelectorAll('table').forEach(function(t){if(t.closest('.table-wrap,.table-scroll'))return;var w=document.createElement('div');w.className='table-scroll';t.parentNode.insertBefore(w,t);w.appendChild(t)});

/* تلميحات الآيات: فتح بالنقر، ووضع الصندوق داخل حدود الشاشة */
document.querySelectorAll('.verse-tooltip').forEach(function(t){t.addEventListener('click',function(e){document.querySelectorAll('.verse-tooltip.open').forEach(function(o){if(o!==t)o.classList.remove('open')});t.classList.toggle('open');e.stopPropagation()})});
document.addEventListener('click',function(){document.querySelectorAll('.verse-tooltip.open').forEach(function(o){o.classList.remove('open')})});
function placeTip(t){var b=t.querySelector('.tooltip-box');if(!b||getComputedStyle(b).display==='none')return;b.classList.add('tt-fixed');var de=document.documentElement,W=de.clientWidth,H=window.innerHeight,m=8,a=t.getBoundingClientRect(),bw=b.offsetWidth,bh=b.offsetHeight,hd=document.querySelector('header'),top0=(hd&&getComputedStyle(hd).position!=='static')?Math.max(0,hd.getBoundingClientRect().bottom):0,cx=a.left+a.width/2,x=Math.max(m,Math.min(cx-bw/2,W-m-bw)),y=a.top-bh-10,below=false;if(y<top0+m){if(a.bottom+10+bh<=H-m){y=a.bottom+10;below=true}else y=Math.max(m,y)}b.style.left=x+'px';b.style.top=y+'px';b.style.setProperty('--ax',Math.max(16,Math.min(bw-16,cx-x))+'px');b.classList.toggle('tt-below',below)}
function placeOpenTips(){document.querySelectorAll('.verse-tooltip').forEach(function(t){if(t.matches(':hover,:focus-within,.open'))placeTip(t)})}
document.querySelectorAll('.verse-tooltip').forEach(function(t){function go(){placeTip(t);requestAnimationFrame(function(){placeTip(t)})}t.addEventListener('mouseenter',go);t.addEventListener('focusin',go);t.addEventListener('click',go)});
(function(){var rq=0;function mv(){if(rq)return;rq=requestAnimationFrame(function(){rq=0;placeOpenTips()})}window.addEventListener('scroll',mv,{passive:true,capture:true});window.addEventListener('resize',mv)})();

/* روابط التذييل: كل عنصر .site-links يُملأ بروابط جميع الصفحات من السجل */
function currentPage(){var p=location.pathname.split('/').pop();return p||'index.html'}
function fillSiteLinks(){var T=window.TOPICS;if(!T)return;var here=currentPage();var list=[{f:'index.html',ar:'الرئيسية',en:'Home'}].concat(T);
  document.querySelectorAll('.site-links').forEach(function(box){if(box.childElementCount)return;list.forEach(function(t){if(t.f===here)return;var a=document.createElement('a');a.href=t.f;a.className='nav-pill-small';a.innerHTML='<span class="lang-ar">'+t.ar+'</span><span class="lang-en">'+t.en+'</span>';box.appendChild(a)})})}
try{fillSiteLinks()}catch(e){console.error(e)}

/* الخريطة العامة: window.NET='auto' تُبنى من السجل حلقةً مقسّمة بحسب المحاور */
function buildAutoNet(){var T=window.TOPICS,A=window.AXES,LK=window.TLINKS||[];if(!T||!A)return null;
  var axes=Object.keys(A).filter(function(a){return T.some(function(t){return t.ax===a})}),nodes=[];
  axes.forEach(function(a){T.forEach(function(t){if(t.ax===a)nodes.push(t)})});
  var cx=500,cy=380,r=228,gap=0.8,step=2*Math.PI/(nodes.length+gap*axes.length),first=nodes.filter(function(t){return t.ax===axes[0]}).length,ang=-Math.PI/2-(first-1)*step/2,prev=null,N=[],byId={};
  nodes.forEach(function(t){if(prev!==null&&t.ax!==prev)ang+=gap*step;prev=t.ax;N.push({id:t.id,ar:t.ar,en:t.en,x:Math.round(cx+r*Math.cos(ang)),y:Math.round(cy+r*Math.sin(ang)),c:A[t.ax][0],dar:t.d?t.d[0]:'',den:t.d?t.d[1]:'',u:t.f,la:ang});byId[t.id]=t;ang+=step});
  var E=LK.filter(function(l){return byId[l[0]]&&byId[l[1]]}).map(function(l){return[l[0],l[1],A[byId[l[0]].ax][0],l[2],l[3]]});
  return{N:N,E:E,chord:true,radial:true,vb:'0 0 1000 760',cx:cx,cy:cy,fs:[15,13]}}

(function(){try{var NET=window.NET==='auto'?buildAutoNet():window.NET;if(!NET||!NET.N)return;var N=NET.N,E=NET.E;var s=document.getElementById('netsvg');if(!s)return;if(NET.vb)s.setAttribute('viewBox',NET.vb);var ns='http://www.w3.org/2000/svg',Pm={},cur=null,ch=!!NET.chord;N.forEach(function(n){Pm[n.id]=n});
function curve(a,b,k){var mx=(a.x+b.x)/2,my=(a.y+b.y)/2;if(ch){var ccx=NET.cx||450,ccy=NET.cy||262;mx=ccx+(mx-ccx)*0.25;my=ccy+(my-ccy)*0.25}else my-=k;return 'M'+a.x+','+a.y+' Q'+mx+','+my+' '+b.x+','+b.y}
var L=E.map(function(e){var a=Pm[e[0]],b=Pm[e[1]],p=document.createElementNS(ns,'path');p.setAttribute('d',curve(a,b,e[5]||0));p.setAttribute('fill','none');p.setAttribute('stroke',e[2]);p.setAttribute('stroke-width',ch?'1.8':'2.5');p.setAttribute('opacity',ch?'.55':'.8');if(e[2]=='#8e44ad')p.setAttribute('stroke-dasharray','6 5');s.appendChild(p);return{el:p,e:e}});
function info(n){var ar=isAr(),x='<strong>'+(ar?n.ar:n.en)+'</strong>: '+(ar?n.dar:n.den)+(n.u?' &mdash; <a href="'+n.u+'">'+(ar?'افتح الصفحة':'Open page')+'</a>':'')+'<br>';L.forEach(function(o){if(o.e[0]==n.id||o.e[1]==n.id){var m=Pm[o.e[0]==n.id?o.e[1]:o.e[0]];x+=(ar?'&larr; ':'&rarr; ')+(ar?m.ar:m.en)+' ('+(ar?o.e[3]:o.e[4])+')<br>'}});document.getElementById('netinfo').innerHTML=x}
var G=N.map(function(n){var g=document.createElementNS(ns,'g');g.setAttribute('class','node');g.setAttribute('tabindex','0');var c=document.createElementNS(ns,'circle');c.setAttribute('cx',n.x);c.setAttribute('cy',n.y);c.setAttribute('r',ch?13:15);c.setAttribute('fill',n.c);var t=document.createElementNS(ns,'text');t.setAttribute('class','node-label');g.appendChild(c);g.appendChild(t);s.appendChild(g);
function pick(){cur=n;var nb={};nb[n.id]=1;L.forEach(function(o){var on=o.e[0]==n.id||o.e[1]==n.id;o.el.classList.toggle('dim',!on);if(on){nb[o.e[0]]=1;nb[o.e[1]]=1}});G.forEach(function(z){z.g.classList.toggle('dim',!nb[z.n.id])});info(n)}
g.addEventListener('click',pick);g.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();pick()}});return{g:g,n:n,t:t}});
window.netLabels=function(){var ar=isAr(),fs=NET.fs||[17,14];G.forEach(function(z){var n=z.n,t=z.t,size=ar?fs[0]:fs[1];t.textContent=ar?n.ar:n.en;t.setAttribute('direction',ar?'rtl':'ltr');t.style.fontFamily=ar?"'Noto Naskh Arabic','Amiri',serif":"'Inter',sans-serif";t.style.fontSize=size+'px';t.style.fontWeight='700';
  if(n.la===undefined){t.setAttribute('x',n.x);t.setAttribute('y',n.y-22);t.setAttribute('text-anchor','middle');return}
  var c=Math.cos(n.la),sn=Math.sin(n.la);
  if(NET.radial){var right=c>=0,deg=n.la*180/Math.PI+(right?0:180),lx=Math.round(n.x+c*20),ly=Math.round(n.y+sn*20);t.setAttribute('x',lx);t.setAttribute('y',ly);t.setAttribute('dy','0.35em');t.setAttribute('transform','rotate('+deg.toFixed(1)+' '+lx+' '+ly+')');t.setAttribute('text-anchor',right!==ar?'start':'end');return}
  var side=c>0.15?1:(c<-0.15?-1:0),x=n.x+c*22,y=n.y+sn*22;
  if(side===0)y+=sn>0?size*0.8:0;else y+=size*0.35;
  t.setAttribute('x',Math.round(x));t.setAttribute('y',Math.round(y));t.setAttribute('text-anchor',side===0?'middle':((side>0)!==ar?'start':'end'))});
  if(cur)info(cur);else document.getElementById('netinfo').textContent=ar?'اختر عقدة.':'Select a node.'};netLabels()}catch(err){console.error(err)}})();

/* البحث في الموسوعة: يبدأ بالبحث في عناوين الموضوعات وكلماتها المفتاحية من السجل، ثم يُحمَّل عند أول استعمال
   فهرس كامل (assets/search.js) يبحث في نصوص الأقسام، ويردّ الكلمة إلى جذرها القرآني (مدونة ليدز)
   فيجد الأقسام التي تستشهد بآيات من الجذر نفسه، على طريقة المعاجم المفهرسة لألفاظ القرآن الكريم. */
function initSearch(){if(document.querySelector('.site-search'))return;var h=document.querySelector('header');if(!h)return;
var PK=[['index.html','الرئيسية','Home','صفحة البداية خريطة الموسوعة']].concat((window.TOPICS||[]).map(function(t){return[t.f,t.ar,t.en,(t.k||'')+' '+(t.d?t.d.join(' '):'')]}));
var w=document.createElement('div');w.className='site-search';w.style.cssText='order:3;flex:0 0 100%;width:100%;margin-top:.6rem';h.style.flexWrap='wrap';var box=document.createElement('div');box.style.cssText='position:relative;max-width:680px;margin:0 auto';
var i=document.createElement('input');i.type='search';i.setAttribute('aria-label','search');i.style.cssText='width:100%;box-sizing:border-box;padding:.55rem 1rem;font-size:1rem;border-radius:16px;border:1px solid #ccc;font:inherit';
var u=document.createElement('div');u.className='search-results';u.style.cssText='position:absolute;top:110%;inset-inline:0;background:#fff;color:#222;border:1px solid #ccc;border-radius:8px;z-index:999;display:none;max-height:70vh;overflow:auto;box-shadow:0 4px 12px rgba(0,0,0,.15);text-align:start';
box.appendChild(i);box.appendChild(u);w.appendChild(box);h.insertBefore(w,h.querySelector('.lang-btn'));
var st=document.createElement('style');st.textContent='.search-results a{display:block;padding:.5rem .8rem;text-decoration:none;color:inherit;border-bottom:1px solid #eee}.search-results a:hover,.search-results a:focus{background:#f3f6fa;outline:none}.search-results .sr-t{font-weight:700}.search-results .sr-s{color:#8a6d00;font-weight:600}.search-results .sr-x{display:block;font-size:.88rem;color:#555;line-height:1.7;margin-top:.15rem}.search-results mark{background:#fff0a8;color:inherit;padding:0 .1em;border-radius:3px}.search-results .sr-root{padding:.55rem .8rem;background:#f7f4ec;font-size:.92rem;border-bottom:1px solid #e6dfcc}.search-results .sr-none{padding:.6rem .8rem;color:#666}';document.head.appendChild(st);
function n(s){return(s||'').replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').toLowerCase()}
function num(k,one,two,pl){return k===1?(one+' واحدة'):k===2?two:(k<=10?k+' '+pl:k+' '+one)}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function ph(){i.placeholder=isAr()?'ابحث في الموسوعة: موضوع أو كلمة أو جذر...':'Search the encyclopedia: a topic or a word...'}ph();var b=document.querySelector('.lang-btn');if(b)b.addEventListener('click',function(){setTimeout(function(){ph();if(i.value.trim())show()},0)});
var IX=null,loading=false,RC={};
function load(){if(IX||loading)return;loading=true;var s=document.createElement('script');s.src='assets/search.js?v='+(window.SEARCH_V||'1');s.onload=function(){try{prep();if(i.value.trim())show()}catch(e){console.error(e)}};s.onerror=function(){loading=false};document.head.appendChild(s)}
function prep(){var D=window.SEARCH;if(!D)return;var X={P:D.P,R:D.R,RI:D.RI,RV:D.RV,F:{},RK:{},S:D.S.map(function(x){return{p:x[0],id:x[1],tar:x[2],ten:x[3],ar:x[4],en:x[5],nar:n(x[4]),nen:x[5].toLowerCase(),ntar:n(x[2]),nten:x[3].toLowerCase(),v:x[6]?x[6].split('.').map(function(z){return parseInt(z,16)}):[]}})};
  D.F.forEach(function(s,k){if(s)s.split(' ').forEach(function(f){if(!(f in X.F))X.F[f]=k})});D.R.forEach(function(r,k){X.RK[n(r)]=k});IX=X}
function rverses(k){if(!RC[k]){var s={},v=0;IX.RV[k].split('.').forEach(function(d){v+=parseInt(d,16);s[v]=1});RC[k]=s}return RC[k]}
var PRE=['وال','فال','بال','كال','لل','و','ف','ب','ل','ك'];
function variants(t){var v=[t];if(t.length>4&&t.indexOf('ال')===0)v.push(t.slice(2));PRE.forEach(function(p){if(t.indexOf(p)===0&&t.length-p.length>=3){var r=t.slice(p.length);v.push(r);if(r.length>4&&r.indexOf('ال')===0)v.push(r.slice(2))}});if(t.indexOf('ال')!==0)v.push('ال'+t);return v}
function rootOf(t){var v=variants(t);for(var k=0;k<v.length;k++)if(v[k] in IX.F)return[IX.F[v[k]],v[k]];return(t in IX.RK)?[IX.RK[t],t]:[-1,'']}
function count(hay,nd,cap){var c=0,p=hay.indexOf(nd);while(p>-1&&c<cap){c++;p=hay.indexOf(nd,p+nd.length)}return c}
function run(q){var raws=q.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').split(/\s+/).filter(function(x){return x.length>1}).slice(0,5),terms=raws.map(n);if(!terms.length)return null;
  var info=terms.map(function(t,ti){var raw=raws[ti];var ar=/[؀-ۿ]/.test(t),core=t;if(ar){var v=variants(t);core=(t.length>4&&t.indexOf('ال')===0)?t.slice(2):t;for(var k=0;k<PRE.length;k++){var p=PRE[k];if(t.indexOf(p)===0&&t.length-p.length>=3&&p.length>1){core=t.slice(p.length);break}}}var ro=ar?rootOf(t):[-1,''],fm=ro[1];if(fm===t)fm=raw;else if(fm){if(t.slice(t.length-fm.length)===fm)fm=raw.slice(raw.length-fm.length);else if(fm==='ال'+t)fm='ال'+raw}return{t:t,raw:raw,ar:ar,core:core,root:ro[0],form:fm}});
  var res=[];IX.S.forEach(function(s){var tot=0,all=true,hit=-1,len=0,lang='',rk=0;
    info.forEach(function(o){var sc=0,hay=o.ar?s.nar:s.nen,ttl=o.ar?s.ntar:s.nten,pg=IX.P[s.p],pt=o.ar?n(pg[1]):pg[2].toLowerCase();
      var c=count(hay,o.core,8);if(c){sc+=c;if(o.core!==o.t)sc+=count(hay,o.t,8);var at=hay.indexOf(o.t),use=at>-1?o.t:o.core;if(hit<0){hit=at>-1?at:hay.indexOf(o.core);len=use.length;lang=o.ar?'ar':'en'}}
      if(ttl.indexOf(o.core)>-1)sc+=6;if(s.id==='hero'&&pt.indexOf(o.core)>-1)sc+=12+8*o.core.length/Math.max(pt.length,1);
      if(o.root>-1&&s.v.length){var rs=rverses(o.root),k=0;s.v.forEach(function(v){if(rs[v])k++});if(k){sc+=Math.min(k,10)*1.5;rk+=k}}
      if(!sc)all=false;tot+=sc});
    if(tot>0)res.push({s:s,sc:all?tot:tot/4,hit:hit,len:len,lang:lang,rk:rk})});
  res.sort(function(a,b){return b.sc-a.sc});return{info:info,res:res.slice(0,15)}}
function snip(r){var ar=isAr(),s=r.s,txt=r.lang==='en'?s.en:(r.lang==='ar'?s.ar:(ar?s.ar:s.en));if(r.hit<0)return esc(txt.slice(0,120))+(txt.length>120?'…':'');var a=Math.max(0,r.hit-50),z=Math.min(txt.length,r.hit+r.len+70);return(a>0?'…':'')+esc(txt.slice(a,r.hit))+'<mark>'+esc(txt.slice(r.hit,r.hit+r.len))+'</mark>'+esc(txt.slice(r.hit+r.len,z))+(z<txt.length?'…':'')}
function link(href,html){var a=document.createElement('a');a.href=href;a.innerHTML=html;u.appendChild(a)}
function quick(q){var qq=n(q);return PK.filter(function(x){return n(x[1]+' '+x[2]+' '+x[3]).indexOf(qq)>-1})}
function show(){var q=i.value.trim(),ar=isAr();u.innerHTML='';if(!q){u.style.display='none';return}
  if(!IX){load();var r0=quick(q);if(!r0.length)u.innerHTML='<div class="sr-none">'+(ar?'جارٍ تحميل الفهرس...':'Loading the index...')+'</div>';r0.forEach(function(x){link(x[0],'<span class="sr-t">'+esc(ar?x[1]:x[2])+'</span>')});u.style.display='block';return}
  var R=run(q);if(!R){u.style.display='none';return}
  R.info.forEach(function(o){if(o.root<0)return;var rt=IX.R[o.root],ri=IX.RI[o.root];var d=document.createElement('div');d.className='sr-root';
    var fm=(o.form&&o.form!==o.raw)?(ar?(' (أقرب صيغة قرآنية: «'+esc(o.form)+'»)'):(' (nearest Qur\'anic form: "'+esc(o.form)+'")')):'';d.innerHTML=ar?('«'+esc(o.raw)+'»'+fm+' من الجذر <b>'+esc(rt.split('').join(' '))+'</b>: '+num(ri[0],'كلمة','كلمتان','كلمات')+' في '+num(ri[1],'آية','آيتان','آيات')+' في القرآن الكريم. النتائج تشمل الأقسام التي تستشهد بآيات من هذا الجذر.'):('"'+esc(o.raw)+'"'+fm+' is from the root <b>'+esc(rt.split('').join(' '))+'</b>: '+ri[0]+' words in '+ri[1]+' verses of the Qur\'an. Results include sections citing verses with this root.');u.appendChild(d)});
  if(!R.res.length){var d=document.createElement('div');d.className='sr-none';d.textContent=ar?'لا نتائج':'No results';u.appendChild(d)}
  R.res.forEach(function(r){var s=r.s,pg=IX.P[s.p],t=ar?pg[1]:pg[2],sec=s.id==='hero'?'':(ar?s.tar:s.ten),extra=r.rk?('<span class="sr-x">'+(ar?('آيات من الجذر في هذا القسم: '+r.rk):('Verses with the root in this section: '+r.rk))+'</span>'):'';
    link(pg[0]+(s.id==='hero'?'':'#'+s.id),'<span class="sr-t">'+esc(t)+'</span>'+(sec?' <span class="sr-s">'+(ar?'‹ ':'› ')+esc(sec)+'</span>':'')+'<span class="sr-x">'+snip(r)+'</span>'+extra)});
  u.style.display='block'}
var tm=0;i.addEventListener('focus',load);i.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(show,120)});
i.addEventListener('keydown',function(e){if(e.key==='Enter'){var a=u.querySelector('a');if(a)location.href=a.getAttribute('href')}if(e.key==='Escape'){i.value='';show()}if(e.key==='ArrowDown'){var f=u.querySelector('a');if(f){e.preventDefault();f.focus()}}});
u.addEventListener('keydown',function(e){var a=document.activeElement;if(!a||a.parentNode!==u)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();var nx=e.key==='ArrowDown'?a.nextElementSibling:a.previousElementSibling;while(nx&&nx.tagName!=='A')nx=e.key==='ArrowDown'?nx.nextElementSibling:nx.previousElementSibling;if(nx)nx.focus();else if(e.key==='ArrowUp')i.focus()}if(e.key==='Escape'){i.focus()}});
document.addEventListener('click',function(e){if(!w.contains(e.target))u.style.display='none'})}
try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){try{initSearch()}catch(e){console.error(e)}});else initSearch()}catch(e){console.error(e)}
