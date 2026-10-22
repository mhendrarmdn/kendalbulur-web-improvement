document.addEventListener('DOMContentLoaded',()=>{
 const search=document.querySelector('[data-reg-search]');
 const year=document.querySelector('[data-reg-year]');
 const status=document.querySelector('[data-reg-status]');
 const rows=[...document.querySelectorAll('[data-reg-row]')];
 const count=document.querySelector('[data-reg-count]');
 function apply(){
   const q=(search.value||'').trim().toLowerCase(),y=year.value,s=status.value;
   let n=0;
   rows.forEach(row=>{
     const ok=(!q||row.dataset.search.includes(q))&&(y==='all'||row.dataset.year===y)&&(s==='all'||row.dataset.status===s);
     row.hidden=!ok;if(ok)n++;
   });
   count.textContent=n+' dokumen ditampilkan';
 }
 [search,year,status].forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',apply));
 document.querySelectorAll('[data-pdf-source]').forEach(btn=>btn.addEventListener('click',e=>{
   if(btn.getAttribute('href')==='#'){
     e.preventDefault();
     alert('File scan sumber sudah diterima untuk prototype. Binary PDF perlu dipublikasikan ke GitHub/WordPress Media Library agar tombol ini dapat dibuka dari Vercel.');
   }
 }));
 apply();
});