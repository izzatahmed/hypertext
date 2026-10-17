/* الموسوعة القرآنية المترابطة | Quranic Hypertext Encyclopedia — الشيفرة المشتركة (update46)
   تعتمد على assets/topics.js (PILLARS وTOPICS وAXES وTLINKS) للبحث وروابط التذييل وخريطة الصفحة الرئيسية،
   وعلى assets/search.js (فهرس البحث الكامل) الذي يُحمَّل عند أول استعمال لصندوق البحث،
   وعلى assets/raghib.js (مفردات الراغب الأصفهاني) الذي يُحمَّل بعده عند البحث بكلمة عربية. */
function isAr(){return document.body.getAttribute('lang')==='ar'}
function setLang(l){var b=document.body,d=document.documentElement,btn=document.querySelector('.lang-btn'),ar=l==='ar';b.setAttribute('lang',l);b.setAttribute('dir',ar?'rtl':'ltr');d.setAttribute('lang',l);d.setAttribute('dir',ar?'rtl':'ltr');if(btn)btn.textContent=ar?'English':'العربية';if(window.netLabels)netLabels()}
function toggleLanguage(){var l=isAr()?'en':'ar';setLang(l);try{localStorage.setItem('hx-lang',l)}catch(e){}}
/* اللغة المختارة تبقى عند الانتقال بين الصفحات */
(function(){try{var l=localStorage.getItem('hx-lang');if(l==='en'&&isAr())setLang('en')}catch(e){}})();

/* التذييل: روابط المصادر، والمستودع، والإبلاغ عن خطأ */
(function(){var f=document.querySelector('footer');if(!f||f.querySelector('a[href*="tanzil.net"]'))return;var A=function(u,t){return '<a href="'+u+'" target="_blank" rel="noopener">'+t+'</a>'},h=f.innerHTML;
  h=h.replace(/\(tanzil\.net\)/g,'('+A('https://tanzil.net','tanzil.net')+')').replace('مدونة القرآن العربية (جامعة ليدز)',A('https://corpus.quran.com','مدونة القرآن العربية (جامعة ليدز)')).replace('Quranic Arabic Corpus (University of Leeds)',A('https://corpus.quran.com','Quranic Arabic Corpus (University of Leeds)'));
  h=h.replace(/(جامعة ليدز\)(<\/a>)?)(<\/span>|<\/p>)/,'$1 · '+A('https://github.com/izzatahmed/hypertext','المستودع')+' · '+A('https://github.com/izzatahmed/hypertext/issues','الإبلاغ عن خطأ')+'$3').replace(/(University of Leeds\)(<\/a>)?)(<\/span>|<\/p>)/,'$1 · '+A('https://github.com/izzatahmed/hypertext','Repository')+' · '+A('https://github.com/izzatahmed/hypertext/issues','Report an error')+'$3');f.innerHTML=h})();
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

/* روابط التذييل: كل عنصر .site-links يُملأ بروابط الصفحات من السجل، مجموعةً بحسب المحاور الأربعة في قوائم تنطوي */
function currentPage(){var p=location.pathname.split('/').pop();return p||'index.html'}
function fillSiteLinks(){var T=window.TOPICS,PL=window.PILLARS;if(!T)return;var here=currentPage();
  function pill(t,cls){var a=document.createElement('a');a.href=t.f;a.className='nav-pill-small'+(cls?' '+cls:'');a.innerHTML='<span class="lang-ar">'+t.ar+'</span><span class="lang-en">'+t.en+'</span>';return a}
  document.querySelectorAll('.site-links').forEach(function(box){if(box.childElementCount)return;
    if(!PL){[{f:'index.html',ar:'الرئيسية',en:'Home'}].concat(T).forEach(function(t){if(t.f!==here)box.appendChild(pill(t))});return}
    box.classList.add('grouped');
    if(here!=='index.html')box.appendChild(pill({f:'index.html',ar:'الرئيسية',en:'Home'},'home'));
    Object.keys(PL).forEach(function(k){var p=PL[k],list=T.filter(function(t){return t.p===k});if(!list.length)return;
      var d=document.createElement('details');d.className='nav-group';if(here===p.f||list.some(function(t){return t.f===here}))d.open=true;
      var sm=document.createElement('summary');sm.innerHTML='<span class="lang-ar">'+p.ar+'</span><span class="lang-en">'+p.en+'</span> <small>('+list.length+')</small>';d.appendChild(sm);
      var w=document.createElement('div');w.className='nav-links';
      if(p.f&&p.f!==here)w.appendChild(pill({f:p.f,ar:'صفحة المحور',en:'Section page'},'hub'));
      list.forEach(function(t){if(t.f!==here)w.appendChild(pill(t))});d.appendChild(w);box.appendChild(d)})})}
try{fillSiteLinks()}catch(e){console.error(e)}

/* الخريطة العامة: window.NET='auto' تُبنى من السجل حلقةً مقسّمة بحسب المحاور */
function buildAutoNet(){var T=window.TOPICS,A=window.AXES,LK=window.TLINKS||[];if(!T||!A)return null;
  var PL=window.PILLARS,pk=PL?Object.keys(PL):[undefined],axes=Object.keys(A).filter(function(a){return T.some(function(t){return t.ax===a})}),nodes=[];
  pk.forEach(function(p){axes.forEach(function(a){T.forEach(function(t){if(t.ax===a&&(!PL||t.p===p))nodes.push(t)})})});
  /* فراغ صغير بين الأقسام، وأكبر بين المحاور الأربعة */
  var gA=0.6,gP=1.8,gaps=0,pv=null;nodes.forEach(function(t){if(pv){gaps+=t.p!==pv.p?gP:(t.ax!==pv.ax?gA:0)}pv=t});if(nodes.length)gaps+=PL?gP:gA;
  var cx=500,cy=380,r=228,step=2*Math.PI/(nodes.length+gaps),first=0;for(var i=0;i<nodes.length&&nodes[i].ax===nodes[0].ax&&nodes[i].p===nodes[0].p;i++)first++;
  var ang=-Math.PI/2-(first-1)*step/2,prev=null,N=[],byId={};
  nodes.forEach(function(t){if(prev)ang+=(t.p!==prev.p?gP:(t.ax!==prev.ax?gA:0))*step;prev=t;N.push({id:t.id,ar:t.ar,en:t.en,x:Math.round(cx+r*Math.cos(ang)),y:Math.round(cy+r*Math.sin(ang)),c:A[t.ax][0],dar:t.d?t.d[0]:'',den:t.d?t.d[1]:'',u:t.f,la:ang});byId[t.id]=t;ang+=step});
  var E=LK.filter(function(l){return byId[l[0]]&&byId[l[1]]}).map(function(l){return[l[0],l[1],A[byId[l[0]].ax][0],l[2],l[3]]});
  return{N:N,E:E,chord:true,radial:true,vb:'0 0 1000 760',cx:cx,cy:cy,fs:[15,13]}}

(function(){try{var NET=window.NET==='auto'?buildAutoNet():window.NET;if(!NET||!NET.N)return;var N=NET.N,E=NET.E;var s=document.getElementById('netsvg');if(!s)return;if(NET.vb)s.setAttribute('viewBox',NET.vb);var ns='http://www.w3.org/2000/svg',Pm={},cur=null,ch=!!NET.chord;N.forEach(function(n){Pm[n.id]=n});
function curve(a,b,k){var mx=(a.x+b.x)/2,my=(a.y+b.y)/2;if(ch){var ccx=NET.cx||450,ccy=NET.cy||262;mx=ccx+(mx-ccx)*0.25;my=ccy+(my-ccy)*0.25}else my-=k;return 'M'+a.x+','+a.y+' Q'+mx+','+my+' '+b.x+','+b.y}
var L=E.map(function(e){var a=Pm[e[0]],b=Pm[e[1]],p=document.createElementNS(ns,'path');p.setAttribute('d',curve(a,b,e[5]||0));p.setAttribute('fill','none');p.setAttribute('stroke',e[2]);p.setAttribute('stroke-width',ch?'1.8':'2.5');p.setAttribute('opacity',ch?'.55':'.8');if(e[2]=='#8e44ad')p.setAttribute('stroke-dasharray','6 5');s.appendChild(p);return{el:p,e:e}});
function info(n){var ar=isAr(),x='<strong>'+(ar?n.ar:n.en)+'</strong>: '+(ar?n.dar:n.den)+(n.u?' &mdash; <a href="'+n.u+'">'+(ar?'افتح الصفحة':'Open page')+'</a>':'')+'<br>';L.forEach(function(o){if(o.e[0]==n.id||o.e[1]==n.id){var m=Pm[o.e[0]==n.id?o.e[1]:o.e[0]];x+=(ar?'&larr; ':'&rarr; ')+(ar?m.ar:m.en)+' ('+(ar?o.e[3]:o.e[4])+')<br>'}});document.getElementById('netinfo').innerHTML=x}
var G=N.map(function(n){var g=document.createElementNS(ns,'g');g.setAttribute('class','node');g.setAttribute('tabindex','0');g.setAttribute('role','button');var c=document.createElementNS(ns,'circle');c.setAttribute('cx',n.x);c.setAttribute('cy',n.y);c.setAttribute('r',ch?13:15);c.setAttribute('fill',n.c);var t=document.createElementNS(ns,'text');t.setAttribute('class','node-label');g.appendChild(c);g.appendChild(t);s.appendChild(g);
function pick(){if(cur===n&&n.u){location.href=n.u;return}cur=n;var nb={};nb[n.id]=1;L.forEach(function(o){var on=o.e[0]==n.id||o.e[1]==n.id;o.el.classList.toggle('dim',!on);if(on){nb[o.e[0]]=1;nb[o.e[1]]=1}});G.forEach(function(z){z.g.classList.toggle('dim',!nb[z.n.id])});info(n)}
g.addEventListener('click',pick);g.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();pick()}});return{g:g,n:n,t:t}});
window.netLabels=function(){var ar=isAr(),fs=NET.fs||[17,14];G.forEach(function(z){var n=z.n,t=z.t,size=ar?fs[0]:fs[1];t.textContent=ar?n.ar:n.en;z.g.setAttribute('aria-label',(ar?n.ar:n.en)+(n.u?(ar?' — انقر مرتين لفتح الصفحة':' — click twice to open the page'):''));t.setAttribute('direction',ar?'rtl':'ltr');t.style.fontFamily=ar?"'Noto Naskh Arabic','Amiri',serif":"'Inter',sans-serif";t.style.fontSize=size+'px';t.style.fontWeight='700';
  if(n.la===undefined){t.setAttribute('x',n.x);t.setAttribute('y',n.y-22);t.setAttribute('text-anchor','middle');return}
  var c=Math.cos(n.la),sn=Math.sin(n.la);
  if(NET.radial){var right=c>=0,deg=n.la*180/Math.PI+(right?0:180),lx=Math.round(n.x+c*20),ly=Math.round(n.y+sn*20);t.setAttribute('x',lx);t.setAttribute('y',ly);t.setAttribute('dy','0.35em');t.setAttribute('transform','rotate('+deg.toFixed(1)+' '+lx+' '+ly+')');t.setAttribute('text-anchor',right!==ar?'start':'end');return}
  var side=c>0.15?1:(c<-0.15?-1:0),x=n.x+c*22,y=n.y+sn*22;
  if(side===0)y+=sn>0?size*0.8:0;else y+=size*0.35;
  t.setAttribute('x',Math.round(x));t.setAttribute('y',Math.round(y));t.setAttribute('text-anchor',side===0?'middle':((side>0)!==ar?'start':'end'))});
  if(cur)info(cur);else document.getElementById('netinfo').textContent=ar?'اختر عقدة.':'Select a node.'};netLabels()}catch(err){console.error(err)}})();

/* البحث في الموسوعة: يبدأ بالبحث في عناوين الموضوعات وكلماتها المفتاحية من السجل، ثم يُحمَّل عند أول استعمال
   فهرس كامل (assets/search.js) يبحث في نصوص الأقسام، ويردّ الكلمة إلى جذرها القرآني (مدونة ليدز)
   فيجد الأقسام التي تستشهد بآيات من الجذر نفسه، على طريقة المعاجم المفهرسة لألفاظ القرآن الكريم.
   ويُحمَّل بعده assets/raghib.js (مفردات الراغب الأصفهاني) فيُعرض معنى الجذر عند الراغب، وتُعرض المداخل التي ترد فيها الكلمة. */
function initSearch(){if(document.querySelector('.site-search'))return;var h=document.querySelector('header');if(!h)return;
var PK=[['index.html','الرئيسية','Home','صفحة البداية خريطة الموسوعة']].concat((window.TOPICS||[]).map(function(t){return[t.f,t.ar,t.en,(t.k||'')+' '+(t.d?t.d.join(' '):'')]}));
var w=document.createElement('div');w.className='site-search';w.style.cssText='order:3;flex:0 0 100%;width:100%;margin-top:.6rem';h.style.flexWrap='wrap';var box=document.createElement('div');box.style.cssText='position:relative;max-width:680px;margin:0 auto';
var i=document.createElement('input');i.type='search';i.setAttribute('aria-label','search');i.style.cssText='width:100%;box-sizing:border-box;padding:.55rem 1rem;font-size:1rem;border-radius:16px;border:1px solid #ccc;font:inherit';
var u=document.createElement('div');u.className='search-results';u.style.cssText='position:absolute;top:110%;inset-inline:0;background:#fff;color:#222;border:1px solid #ccc;border-radius:8px;z-index:999;display:none;max-height:70vh;overflow:auto;box-shadow:0 4px 12px rgba(0,0,0,.15);text-align:start';
box.appendChild(i);box.appendChild(u);w.appendChild(box);h.insertBefore(w,h.querySelector('.lang-btn'));
var st=document.createElement('style');st.textContent='.search-results a{display:block;padding:.5rem .8rem;text-decoration:none;color:inherit;border-bottom:1px solid #eee}.search-results a:hover,.search-results a:focus{background:#f3f6fa;outline:none}.search-results .sr-t{font-weight:700}.search-results .sr-s{color:#8a6d00;font-weight:600}.search-results .sr-x{display:block;font-size:.88rem;color:#555;line-height:1.7;margin-top:.15rem}.search-results mark{background:#fff0a8;color:inherit;padding:0 .1em;border-radius:3px}.search-results .sr-root{padding:.55rem .8rem;background:#f7f4ec;font-size:.92rem;border-bottom:1px solid #e6dfcc}.search-results .sr-none{padding:.6rem .8rem;color:#666}.search-results .sr-rg{padding:.5rem .8rem;border-bottom:1px solid #eee;background:#fbfaf5;font-size:.9rem;line-height:1.8}.search-results .sr-rg .sr-rgh{color:#6b5a2e;font-size:.85rem}.search-results .sr-rg .sr-rgx{display:block}.search-results .sr-rg button{font:inherit;font-size:.8rem;margin-top:.2rem;padding:.1rem .6rem;border:1px solid #d8cfb5;border-radius:10px;background:#fff;color:#6b5a2e;cursor:pointer}.search-results .sr-rg .sr-rgf{margin-top:.3rem;max-height:45vh;overflow:auto;padding:.4rem .6rem;background:#fff;border:1px solid #eee;border-radius:6px;font-family:Amiri,\'Noto Naskh Arabic\',serif;font-size:1rem;line-height:1.9}.search-results .sr-rg a{display:inline;padding:0;border:0;color:#1f5e8c;text-decoration:underline}.search-results .sr-hd{padding:.35rem .8rem;background:#f1ece0;color:#6b5a2e;font-weight:700;font-size:.85rem}.search-results .sr-cr{padding:.4rem .8rem;color:#777;font-size:.75rem;line-height:1.6}.search-results .sr-cr a{display:inline;padding:0;border:0;color:#777;text-decoration:underline}';document.head.appendChild(st);
function n(s){return(s||'').replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').toLowerCase()}
function num(k,one,two,pl){return k===1?(one+' واحدة'):k===2?two:(k<=10?k+' '+pl:k+' '+one)}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function ph(){i.placeholder=isAr()?'ابحث في الموسوعة: موضوع أو كلمة أو جذر...':'Search the encyclopedia: a topic or a word...'}ph();var b=document.querySelector('.lang-btn');if(b)b.addEventListener('click',function(){setTimeout(function(){ph();if(i.value.trim())show()},0)});
var IX=null,loading=false,RC={},RG=null,rgLoading=false;
function loadRG(){if(RG||rgLoading)return;rgLoading=true;var s=document.createElement('script');s.src='assets/raghib.js?v='+(window.SEARCH_V||'1');s.onload=function(){try{var D=window.RAGHIB;if(D){RG={H:D.H,P:D.P,T:D.T,R:D.R,N:D.N,NT:null};if(i.value.trim())show()}}catch(e){console.error(e)}};s.onerror=function(){rgLoading=false};document.head.appendChild(s)}
var STOP={'الله':1,'قال':1,'تعالي':1,'قوله':1,'ذلك':1,'الذي':1,'التي':1,'هذا':1,'كان':1,'علي':1,'الي':1,'وقد':1,'يقال':1,'قيل':1,'نحو':1,'وقوله':1,'وقال':1,'الشيء':1,'شيء':1,'منه':1,'فيه':1,'وهو':1,'ومنه':1};
function rgEx(t,len){var p=t.split('\n')[0];if(p.length<60)p=t.slice(0,len);if(p.length>len){p=p.slice(0,len);p=p.slice(0,p.lastIndexOf(' '))+'…'}return p}
function rgFull(t){return esc(t).replace(/(\[[^\]\n]{2,40}\/ ?\d[^\]\n]*\])/g,'<span style="color:#8a7d5a;font-size:.85em">$1</span>').replace(/\n/g,'<br>')}
function rgSecs(k){var rs=rverses(k),out=[];IX.S.forEach(function(s){if(!s.v.length)return;var c=0;s.v.forEach(function(v){if(rs[v])c++});if(c)out.push([c,s])});out.sort(function(a,b){return b[0]-a[0]});return out.slice(0,3)}
function rgBlock(e,html,withSecs){var ar=isAr(),d=document.createElement('div');d.className='sr-rg';d.setAttribute('dir','rtl');d.setAttribute('lang','ar');
  var h='<span class="sr-rgh">'+(ar?('الراغب الأصفهاني، المفردات: مادة «'+esc(RG.H[e])+'»، ص '+RG.P[e]):('Al-Raghib al-Isfahani, al-Mufradat: entry «'+esc(RG.H[e])+'», p. '+RG.P[e]+' (Arabic)'))+'</span><span class="sr-rgx">'+(html||esc(rgEx(RG.T[e],230)))+'</span>';
  if(withSecs){var ks=[];for(var r in RG.R){if(RG.R[r].indexOf(e)>-1&&(n(r) in IX.RK))ks.push(IX.RK[n(r)])}var ss=[];ks.forEach(function(k){rgSecs(k).forEach(function(x){if(ss.length<3&&ss.indexOf(x[1])<0)ss.push(x[1])})});
    if(ss.length)h+='<span class="sr-rgx" dir="'+(ar?'rtl':'ltr')+'">'+(ar?'أقسام تستشهد بآيات من جذره: ':'Sections citing verses with its root: ')+ss.map(function(s){var pg=IX.P[s.p];return'<a href="'+pg[0]+(s.id==='hero'?'':'#'+s.id)+'">'+esc(ar?pg[1]:pg[2])+(s.id==='hero'?'':(ar?' ‹ ':' › ')+esc(ar?s.tar:s.ten))+'</a>'}).join(ar?'، ':', ')+'</span>'}
  h+='<button type="button">'+(ar?'المدخل كاملاً':'Full entry')+'</button><div class="sr-rgf" hidden>'+rgFull(RG.T[e])+'</div>';d.innerHTML=h;
  var bt=d.querySelector('button'),f=d.querySelector('.sr-rgf');bt.addEventListener('click',function(ev){ev.stopPropagation();f.hidden=!f.hidden;bt.textContent=f.hidden?(isAr()?'المدخل كاملاً':'Full entry'):(isAr()?'إخفاء المدخل':'Hide entry')});u.appendChild(d)}
function rgHits(info,shown){if(!RG)return[];if(!RG.NT){RG.D=RG.T.map(function(t){return t.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'')});RG.NT=RG.D.map(function(t){return n(t.replace(/\[[^\]\n]{1,40}\]/g,function(m){return new Array(m.length+1).join(' ')}))})}var sc={};
  info.forEach(function(o){if(!o.ar||o.core.length<3||STOP[o.core])return;var hits=0,loc={};RG.NT.forEach(function(t,e){var p=t.indexOf(o.core);if(p<0)return;hits++;var c=count(t,o.core,20);loc[e]=c+(p<160?4:0)+(n(RG.H[e])===o.core?10:0)});if(hits>200)return;for(var e in loc)sc[e]=(sc[e]||0)+loc[e]});
  return Object.keys(sc).filter(function(e){return shown.indexOf(+e)<0}).sort(function(a,b){return sc[b]-sc[a]}).slice(0,3).map(Number)}
function rgSnip(e,info){var t=RG.D[e],nt=RG.NT[e],best=-1,len=0;info.forEach(function(o){if(best>-1||!o.ar)return;var p=nt.indexOf(o.core);if(p>-1){best=p;len=o.core.length}});if(best<0)return null;var a=Math.max(0,best-70),z=Math.min(t.length,best+len+110);return(a>0?'…':'')+esc(t.slice(a,best))+'<mark>'+esc(t.slice(best,best+len))+'</mark>'+esc(t.slice(best+len,z)).replace(/\n/g,' ')+(z<t.length?'…':'')}
function load(){if(IX||loading)return;loading=true;var s=document.createElement('script');s.src='assets/search.js?v='+(window.SEARCH_V||'1');s.onload=function(){try{prep();if(i.value.trim())show()}catch(e){console.error(e)}};s.onerror=function(){loading=false};document.head.appendChild(s)}
function prep(){var D=window.SEARCH;if(!D)return;var X={P:D.P,R:D.R,RI:D.RI,RV:D.RV,F:{},RK:{},S:D.S.map(function(x){return{p:x[0],id:x[1],tar:x[2],ten:x[3],ar:x[4],en:x[5],nar:n(x[4]),nen:x[5].toLowerCase(),ntar:n(x[2]),nten:x[3].toLowerCase(),v:x[6]?x[6].split('.').map(function(z){return parseInt(z,16)}):[]}})};
  D.F.forEach(function(s,k){if(s)s.split(' ').forEach(function(f){if(!(f in X.F))X.F[f]=k})});D.R.forEach(function(r,k){X.RK[n(r)]=k});IX=X}
function rverses(k){if(!RC[k]){var s={},v=0;IX.RV[k].split('.').forEach(function(d){v+=parseInt(d,16);s[v]=1});RC[k]=s}return RC[k]}
var PRE=['وال','فال','بال','كال','لل','و','ف','ب','ل','ك'];
function variants(t){var v=[t];if(t.length>4&&t.indexOf('ال')===0)v.push(t.slice(2));PRE.forEach(function(p){if(t.indexOf(p)===0&&t.length-p.length>=3){var r=t.slice(p.length);v.push(r);if(r.length>4&&r.indexOf('ال')===0)v.push(r.slice(2))}});if(t.indexOf('ال')!==0)v.push('ال'+t);return v}
function rootOf(t){var v=variants(t);for(var k=0;k<v.length;k++)if(v[k] in IX.F)return[IX.F[v[k]],v[k]];return(t in IX.RK)?[IX.RK[t],t]:[-1,'']}
function count(hay,nd,cap){var c=0,p=hay.indexOf(nd);while(p>-1&&c<cap){c++;p=hay.indexOf(nd,p+nd.length)}return c}
var AL=/[a-z\u0621-\u064A]/,WP=['','\u0648','\u0641','\u0628','\u0644','\u0643','\u0627\u0644','\u0648\u0627\u0644','\u0641\u0627\u0644','\u0628\u0627\u0644','\u0643\u0627\u0644','\u0644\u0644','\u0648\u0644','\u0641\u0644'];
function wpos(hay,nd){var p=hay.indexOf(nd);while(p>-1){var e=p+nd.length;if(e>=hay.length||!AL.test(hay.charAt(e))){for(var j=0;j<WP.length;j++){var q=p-WP[j].length;if(q>=0&&hay.substr(q,WP[j].length)===WP[j]&&(q===0||!AL.test(hay.charAt(q-1))))return p}}p=hay.indexOf(nd,p+1)}return -1}
function wcount(hay,nd,cap){var c=0,p=wpos(hay,nd),h=hay;while(p>-1&&c<cap){c++;h=h.slice(p+nd.length);p=wpos(h,nd)}return c}
function run(q){var raws=q.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').split(/\s+/).filter(function(x){return x.length>1}).slice(0,5),terms=raws.map(n);if(!terms.length)return null;
  var info=terms.map(function(t,ti){var raw=raws[ti];var ar=/[؀-ۿ]/.test(t),core=t;if(ar){var v=variants(t);core=(t.length>4&&t.indexOf('ال')===0)?t.slice(2):t;for(var k=0;k<PRE.length;k++){var p=PRE[k];if(t.indexOf(p)===0&&t.length-p.length>=3&&p.length>1){core=t.slice(p.length);break}}}var ro=ar?rootOf(t):[-1,''],fm=ro[1];if(fm===t)fm=raw;else if(fm){if(t.slice(t.length-fm.length)===fm)fm=raw.slice(raw.length-fm.length);else if(fm==='ال'+t)fm='ال'+raw}return{t:t,raw:raw,ar:ar,core:core,root:ro[0],form:fm}});
  var res=[];IX.S.forEach(function(s){var tot=0,all=true,hit=-1,len=0,lang='',rk=0;
    info.forEach(function(o){var sc=0,ts=0,rsc=0,hay=o.ar?s.nar:s.nen,ttl=o.ar?s.ntar:s.nten,pg=IX.P[s.p],pt=o.ar?n(pg[1]):pg[2].toLowerCase();
      var c=count(hay,o.core,8);if(c){ts+=c;if(o.core!==o.t)ts+=count(hay,o.t,8);var w=wcount(hay,o.t,5);if(o.core!==o.t)w=Math.max(w,wcount(hay,o.core,5));ts+=w*4;
        var wa=wpos(hay,o.t),wb=o.core!==o.t?wpos(hay,o.core):-1,at=hay.indexOf(o.t);if(hit<0){if(wa>-1){hit=wa;len=o.t.length}else if(wb>-1){hit=wb;len=o.core.length}else if(at>-1){hit=at;len=o.t.length}else{hit=hay.indexOf(o.core);len=o.core.length}lang=o.ar?'ar':'en'}}
      if(ttl.indexOf(o.core)>-1)ts+=6;if(s.id==='hero'&&pt.indexOf(o.core)>-1)ts+=12+8*o.core.length/Math.max(pt.length,1);
      if(o.root>-1&&s.v.length){var rs=rverses(o.root),k=0;s.v.forEach(function(v){if(rs[v])k++});if(k){rsc=Math.min(k,10)*1.5;rk+=k}}
      sc=ts>0?ts+20+rsc/3:rsc;
      if(!sc)all=false;tot+=sc});
    if(tot>0)res.push({s:s,sc:all?tot:tot/4,hit:hit,len:len,lang:lang,rk:rk})});
  res.sort(function(a,b){return b.sc-a.sc});return{info:info,res:res.slice(0,15)}}
function snip(r){var ar=isAr(),s=r.s,txt=r.lang==='en'?s.en:(r.lang==='ar'?s.ar:(ar?s.ar:s.en));if(r.hit<0)return esc(txt.slice(0,120))+(txt.length>120?'…':'');var a=Math.max(0,r.hit-50),z=Math.min(txt.length,r.hit+r.len+70);return(a>0?'…':'')+esc(txt.slice(a,r.hit))+'<mark>'+esc(txt.slice(r.hit,r.hit+r.len))+'</mark>'+esc(txt.slice(r.hit+r.len,z))+(z<txt.length?'…':'')}
function link(href,html){var a=document.createElement('a');a.href=href;a.innerHTML=html;u.appendChild(a)}
function quick(q){var qq=n(q);return PK.filter(function(x){return n(x[1]+' '+x[2]+' '+x[3]).indexOf(qq)>-1})}
function show(){var q=i.value.trim(),ar=isAr();u.innerHTML='';if(!q){u.style.display='none';return}
  if(!IX){load();var r0=quick(q);if(!r0.length)u.innerHTML='<div class="sr-none">'+(ar?'جارٍ تحميل الفهرس...':'Loading the index...')+'</div>';r0.forEach(function(x){link(x[0],'<span class="sr-t">'+esc(ar?x[1]:x[2])+'</span>')});u.style.display='block';return}
  var R=run(q);if(!R){u.style.display='none';return}
  if(R.info.some(function(o){return o.ar}))loadRG();var shown=[];
  R.info.forEach(function(o){if(o.root<0)return;var rt=IX.R[o.root],ri=IX.RI[o.root];var d=document.createElement('div');d.className='sr-root';
    var fm=(o.form&&o.form!==o.raw)?(ar?(' (أقرب صيغة قرآنية: «'+esc(o.form)+'»)'):(' (nearest Qur\'anic form: "'+esc(o.form)+'")')):'';d.innerHTML=ar?('«'+esc(o.raw)+'»'+fm+' من الجذر <b>'+esc(rt.split('').join(' '))+'</b>: '+num(ri[0],'كلمة','كلمتان','كلمات')+' في '+num(ri[1],'آية','آيتان','آيات')+' في القرآن الكريم. النتائج تشمل الأقسام التي تستشهد بآيات من هذا الجذر.'):('"'+esc(o.raw)+'"'+fm+' is from the root <b>'+esc(rt.split('').join(' '))+'</b>: '+ri[0]+' words in '+ri[1]+' verses of the Qur\'an. Results include sections citing verses with this root.');u.appendChild(d);
    if(RG&&RG.R[rt])RG.R[rt].slice(0,2).forEach(function(e){if(shown.indexOf(e)<0){shown.push(e);rgBlock(e)}})});
  if(RG)R.info.forEach(function(o){if(!o.ar||o.root>-1)return;var v=variants(o.t);for(var k=0;k<v.length;k++){var es=RG.N[v[k]];if(es){es.forEach(function(e){if(shown.indexOf(e)<0){shown.push(e);rgBlock(e)}});break}}});
  if(!R.res.length){var d=document.createElement('div');d.className='sr-none';d.textContent=ar?'لا نتائج':'No results';u.appendChild(d)}
  R.res.forEach(function(r){var s=r.s,pg=IX.P[s.p],t=ar?pg[1]:pg[2],sec=s.id==='hero'?'':(ar?s.tar:s.ten),extra=r.rk?('<span class="sr-x">'+(ar?('آيات من الجذر في هذا القسم: '+r.rk):('Verses with the root in this section: '+r.rk))+'</span>'):'';
    link(pg[0]+(s.id==='hero'?'':'#'+s.id),'<span class="sr-t">'+esc(t)+'</span>'+(sec?' <span class="sr-s">'+(ar?'‹ ':'› ')+esc(sec)+'</span>':'')+'<span class="sr-x">'+snip(r)+'</span>'+extra)});
  var hs=rgHits(R.info,shown);if(hs.length){var hd=document.createElement('div');hd.className='sr-hd';hd.textContent=ar?'وترد الكلمة في مفردات الراغب في هذه المداخل':'The word also occurs in these entries of al-Raghib\'s Mufradat';u.appendChild(hd);hs.forEach(function(e){shown.push(e);rgBlock(e,rgSnip(e,R.info),true)})}
  if(shown.length){var cr=document.createElement('div');cr.className='sr-cr';cr.innerHTML=ar?'المفردات في غريب القرآن للراغب الأصفهاني (ت 502هـ)، تحقيق صفوان عدنان داودي (دار القلم، 1412هـ). النص من مدونة <a href="https://openiti.org" target="_blank" rel="noopener">OpenITI</a> عن <a href="https://shamela.ws/book/23636" target="_blank" rel="noopener">المكتبة الشاملة</a>، بترخيص <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>، وربط المداخل بالجذور آلي.':'Al-Raghib al-Isfahani (d. 502 AH), al-Mufradat fi Gharib al-Qur\'an, ed. Safwan Adnan Dawudi (Dar al-Qalam, 1412 AH). Text from the <a href="https://openiti.org" target="_blank" rel="noopener">OpenITI</a> corpus via <a href="https://shamela.ws/book/23636" target="_blank" rel="noopener">al-Maktaba al-Shamila</a>, licensed <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>; entries are linked to roots automatically.';u.appendChild(cr)}
  u.style.display='block'}
var tm=0;i.addEventListener('focus',load);i.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(show,120)});
i.addEventListener('keydown',function(e){if(e.key==='Enter'){var a=u.querySelector('a');if(a)location.href=a.getAttribute('href')}if(e.key==='Escape'){i.value='';show()}if(e.key==='ArrowDown'){var f=u.querySelector('a');if(f){e.preventDefault();f.focus()}}});
u.addEventListener('keydown',function(e){var a=document.activeElement;if(!a||a.parentNode!==u)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();var nx=e.key==='ArrowDown'?a.nextElementSibling:a.previousElementSibling;while(nx&&nx.tagName!=='A')nx=e.key==='ArrowDown'?nx.nextElementSibling:nx.previousElementSibling;if(nx)nx.focus();else if(e.key==='ArrowUp')i.focus()}if(e.key==='Escape'){i.focus()}});
document.addEventListener('click',function(e){if(!w.contains(e.target))u.style.display='none'})}
try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){try{initSearch()}catch(e){console.error(e)}});else initSearch()}catch(e){console.error(e)}
