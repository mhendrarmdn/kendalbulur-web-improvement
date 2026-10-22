document.addEventListener('DOMContentLoaded',()=>{
  const tabs=[...document.querySelectorAll('[data-news-filter]')];
  const cards=[...document.querySelectorAll('[data-news-categories]')];
  const count=document.querySelector('[data-news-count]');
  function apply(filter){
    let shown=0;
    cards.forEach(card=>{
      const cats=(card.dataset.newsCategories||'').split(',');
      const ok=filter==='all'||cats.includes(filter);
      card.hidden=!ok;
      if(ok)shown++;
    });
    tabs.forEach(b=>b.classList.toggle('active',b.dataset.newsFilter===filter));
    if(count)count.textContent=shown+' artikel ditampilkan';
  }
  tabs.forEach(b=>b.addEventListener('click',()=>apply(b.dataset.newsFilter)));
  apply('all');
});