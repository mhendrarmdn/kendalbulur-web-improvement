document.addEventListener('DOMContentLoaded',()=>{
 const track=document.querySelector('[data-gov-track]');
 document.querySelector('[data-gov-prev]')?.addEventListener('click',()=>track?.scrollBy({left:-470,behavior:'smooth'}));
 document.querySelector('[data-gov-next]')?.addEventListener('click',()=>track?.scrollBy({left:470,behavior:'smooth'}));
});