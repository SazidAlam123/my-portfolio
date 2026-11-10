(function(){
var car=document.querySelector('.rcar');if(!car)return;
var sl=[].slice.call(car.querySelectorAll('.rs')),bar=car.querySelector('.rbar i'),cnt=car.querySelector('.rcount'),pp=car.querySelector('.rpp'),rz=document.getElementById('rz'),i=0,t=null,paused=false,hover=false,vis=false,zoom=false;
function active(){return !paused&&!hover&&vis&&!zoom&&!document.hidden}
function arm(){clearTimeout(t);bar.style.animation='none';void bar.offsetWidth;bar.style.animation='';bar.style.animationPlayState=active()?'running':'paused';if(active())t=setTimeout(function(){go(i+1)},5000)}
function go(n){var o=sl[i];o.classList.remove('on');o.classList.add('out');setTimeout(function(){o.classList.remove('out')},800);i=(n+sl.length)%sl.length;sl[i].classList.add('on');cnt.textContent=(i+1)+' / '+sl.length;arm()}
car.querySelector('.rprev').onclick=function(){go(i-1)};car.querySelector('.rnext').onclick=function(){go(i+1)};
pp.onclick=function(){paused=!paused;pp.classList.toggle('paused',paused);pp.setAttribute('aria-label',paused?'Play reviews':'Pause reviews');arm()};
var tr=car.querySelector('.rtrack');
tr.addEventListener('mouseenter',function(){hover=true;arm()});tr.addEventListener('mouseleave',function(){hover=false;arm()});
var x0=null;tr.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});tr.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(i+(d<0?1:-1));x0=null});
car.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(i-1);if(e.key==='ArrowRight')go(i+1)});
document.addEventListener('visibilitychange',arm);
if('IntersectionObserver' in window){new IntersectionObserver(function(es){vis=es[0].isIntersecting;arm()},{threshold:.35}).observe(car)}else{vis=true;arm()}
tr.addEventListener('click',function(){var im=sl[i].querySelector('img');rz.querySelector('img').src=im.src;rz.querySelector('img').alt=im.alt;rz.classList.add('on');document.body.style.overflow='hidden';zoom=true;arm();rz.querySelector('button').focus()});
function cl(){rz.classList.remove('on');document.body.style.overflow='';zoom=false;arm()}
rz.querySelector('button').onclick=cl;rz.addEventListener('click',function(e){if(e.target===rz)cl()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&rz.classList.contains('on'))cl()});
})();
document.querySelectorAll('.card,.edu,.job,.ct').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
