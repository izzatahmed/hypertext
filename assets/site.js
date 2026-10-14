/* الموسوعة القرآنية المترابطة | Quranic Hypertext Encyclopedia — الشيفرة المشتركة (update18)
   تعتمد على assets/topics.js (TOPICS وAXES وTLINKS) للبحث وروابط التذييل وخريطة الصفحة الرئيسية. */
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

/* البحث في الموضوعات */
function initSearch(){if(document.querySelector(".site-search"))return;var P=[['index.html','الرئيسية','Home','صفحة البداية خريطة الموسوعة']].concat((window.TOPICS||[]).map(function(t){return[t.f,t.ar,t.en,t.k||'']}));
var h=document.querySelector('header');if(!h)return;var w=document.createElement('div');w.className='site-search';w.style.cssText='order:3;flex:0 0 100%;width:100%;margin-top:.6rem';h.style.flexWrap='wrap';var box=document.createElement('div');box.style.cssText='position:relative;max-width:640px;margin:0 auto';
var i=document.createElement('input');i.type='search';i.style.cssText='width:100%;box-sizing:border-box;padding:.55rem 1rem;font-size:1rem;border-radius:16px;border:1px solid #ccc;font:inherit';var u=document.createElement('div');u.style.cssText='position:absolute;top:110%;inset-inline:0;background:#fff;color:#222;border:1px solid #ccc;border-radius:8px;z-index:999;display:none;max-height:300px;overflow:auto;box-shadow:0 4px 12px rgba(0,0,0,.15)';
box.appendChild(i);box.appendChild(u);w.appendChild(box);h.insertBefore(w,h.querySelector('.lang-btn'));
function n(s){return(s||'').toLowerCase().replace(/[ً-ْٰ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي')}
function ph(){i.placeholder=isAr()?'ابحث عن موضوع...':'Search topics...'}ph();var b=document.querySelector('.lang-btn');if(b)b.addEventListener('click',function(){setTimeout(ph,0)});
function show(){var q=n(i.value.trim());u.innerHTML='';if(!q){u.style.display='none';return}var r=P.filter(function(x){return n(x[1]+' '+x[2]+' '+x[3]).indexOf(q)>-1});
if(!r.length){u.innerHTML='<div style="padding:.5rem">'+(isAr()?'لا نتائج':'No results')+'</div>'}r.forEach(function(x){var a=document.createElement('a');a.href=x[0];a.textContent=isAr()?x[1]:x[2];a.style.cssText='display:block;padding:.45rem .8rem;text-decoration:none;color:inherit';u.appendChild(a)});u.style.display='block'}
i.addEventListener('input',show);i.addEventListener('keydown',function(e){if(e.key==='Enter'){var a=u.querySelector('a');if(a)location.href=a.getAttribute('href')}if(e.key==='Escape'){i.value='';show()}});document.addEventListener('click',function(e){if(!w.contains(e.target))u.style.display='none'})}
try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){try{initSearch()}catch(e){console.error(e)}});else initSearch()}catch(e){console.error(e)}
