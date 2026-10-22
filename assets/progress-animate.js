document.addEventListener('DOMContentLoaded',()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observed=new WeakSet();
  let io=null;

  const activate=el=>{
    if(el.classList.contains('in-view'))return;
    requestAnimationFrame(()=>el.classList.add('in-view'));
  };

  if(!reduced && 'IntersectionObserver' in window){
    io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          activate(e.target);
          io.unobserve(e.target);
        }
      });
    },{threshold:.18,rootMargin:'0px 0px -5% 0px'});
  }

  function scan(root=document){
    root.querySelectorAll?.('.idm-fill,.ref-progress .fill').forEach(el=>{
      if(observed.has(el))return;
      observed.add(el);
      if(reduced||!io)activate(el);else io.observe(el);
    });
  }

  scan();
  const mo=new MutationObserver(muts=>muts.forEach(m=>m.addedNodes.forEach(n=>{
    if(n.nodeType===1)scan(n);
  })));
  mo.observe(document.body,{childList:true,subtree:true});
});