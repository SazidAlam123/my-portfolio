(function(){
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){if(e.target.classList.contains('skills'))[].forEach.call(e.target.children,function(c,k){c.style.animationDelay=(k*70)+'ms'});e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
document.querySelectorAll('.rv').forEach(function(el,i){if(io){el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)}else el.classList.add('in')});
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var prog=document.querySelector('.prog i'),up=document.querySelector('.up'),tk=false;
function onS(){tk=false;var d=document.documentElement,m=d.scrollHeight-innerHeight;prog.style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')';up.classList.toggle('on',scrollY>700)}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
up.onclick=function(){scrollTo({top:0,behavior:rm?'auto':'smooth'})};
document.querySelectorAll('.pc,.offer div').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
var tp=document.getElementById('typed');
if(tp&&!rm&&'IntersectionObserver' in window){var tx=tp.querySelector('.tx'),full=tx.textContent;tp.style.minHeight=tp.offsetHeight+'px';tx.textContent='';var cr=document.createElement('i');cr.className='caret';tx.appendChild(cr);
var to=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;to.disconnect();var n=0;(function step(){n+=2;tx.firstChild===cr?0:0;tx.textContent=full.slice(0,n);tx.appendChild(cr);if(n<full.length)setTimeout(step,28);else setTimeout(function(){cr.remove()},2500)})()},{threshold:.7});to.observe(tp)}
var lb=document.getElementById('lb'),im=lb.querySelector('img'),cap=lb.querySelector('p'),list=[],idx=0,last=null;
var all=[].slice.call(document.querySelectorAll('.zoom'));
function show(i){idx=(i+list.length)%list.length;var b=list[idx],s=b.querySelector('img');im.src=s.currentSrc||s.src;im.alt=s.alt;cap.textContent=b.getAttribute('data-cap')||''}
function open(b){last=b;var g=b.getAttribute('data-g');list=all.filter(function(x){return x.getAttribute('data-g')===g});lb.classList.add('on');document.body.style.overflow='hidden';show(list.indexOf(b));lb.querySelector('.lbx').focus()}
function close(){lb.classList.remove('on');document.body.style.overflow='';if(last)last.focus()}
all.forEach(function(b){b.addEventListener('click',function(){open(b)})});
lb.querySelector('.lbx').onclick=close;lb.querySelector('.lbp').onclick=function(){show(idx-1)};lb.querySelector('.lbn').onclick=function(){show(idx+1)};
lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
})();
