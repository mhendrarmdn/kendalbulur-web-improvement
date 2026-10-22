document.addEventListener('DOMContentLoaded',()=>{
  const track=document.querySelector('[data-gov-track]');
  document.querySelector('[data-gov-prev]')?.addEventListener('click',()=>track?.scrollBy({left:-470,behavior:'smooth'}));
  document.querySelector('[data-gov-next]')?.addEventListener('click',()=>track?.scrollBy({left:470,behavior:'smooth'}));

  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease=t=>1-Math.pow(1-t,3);
  function animateNumber(el,target,duration=1200,pad=0){
    if(prefersReduced){el.textContent=String(target).padStart(pad,'0');return;}
    const start=performance.now();
    function frame(now){
      const p=Math.min(1,(now-start)/duration);
      const value=Math.round(target*ease(p));
      el.textContent=String(value).padStart(pad,'0');
      if(p<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function animatePair(el,a,b,duration=1200){
    if(prefersReduced){el.textContent=String(a).padStart(2,'0')+'/'+String(b).padStart(2,'0');return;}
    const start=performance.now();
    function frame(now){
      const p=Math.min(1,(now-start)/duration),e=ease(p);
      el.textContent=String(Math.round(a*e)).padStart(2,'0')+'/'+String(Math.round(b*e)).padStart(2,'0');
      if(p<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const stats=document.querySelector('.stats-grid');
  if(stats){
    let ran=false;
    const run=()=>{
      if(ran)return;ran=true;
      stats.querySelectorAll('[data-count]').forEach(el=>animateNumber(el,Number(el.dataset.count),1250,Number(el.dataset.pad||0)));
      stats.querySelectorAll('[data-count-pair]').forEach(el=>{const [a,b]=el.dataset.countPair.split('/').map(Number);animatePair(el,a,b,1250)});
    };
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){run();io.disconnect()}},{threshold:.35});
      io.observe(stats);
    }else run();
  }
});