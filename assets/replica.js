const LOGO='https://kendalbulur.id/storage/2025/11/Untitled-1-01.png';
const FOOTER_LOGO='https://kendalbulur.id/storage/2025/11/cropped-Untitled-1-01.png';

const nav=[
 {t:'BERANDA',u:'/'},
 {t:'PROFIL',c:[
   {t:'Sejarah',u:'/profil-desa/sejarah-desa/'},
   {t:'Wilayah',u:'/profil-desa/wilayah-desa/'},
   {t:'Peta Desa',u:'/profil-desa/peta-desa/'},
   {t:'Visi Misi',u:'/profil-desa/profil-umum/'},
   {t:'SOTK',u:'/profil-desa/sotk/'},
   {t:'Profil KADES',u:'/profil-desa/kepala-desa/'},
   {t:'IDM',u:'/profil-desa/idm/'}
 ]},
 {t:'LEMBAGA DESA',c:[
   {t:'BPD',u:'/lembaga-desa/bpd/'},
   {t:'LAD',u:'/lembaga-desa/lad/'},
   {t:'BUMDesa',u:'/lembaga-desa/bumdesa/'},
   {t:'KDMP',u:'/lembaga-desa/kdmp/'}
 ]},
 {t:'LEMBAGA KEMASYARAKATAN',c:[
   {t:'PKK',u:'/lembaga-kemasyarakatan/pkk/'},
   {t:'RT/RW',u:'/rt-rw/',c:[
     {t:'RT 001 RW 001',u:'/rt-rw/'}
   ]},
   {t:'Satlinmas',u:'/lembaga-kemasyarakatan/satlinmas/'},
   {t:'Posyandu',u:'/lembaga-kemasyarakatan/posyandu/'},
   {t:'Kartar',u:'/lembaga-kemasyarakatan/karang-taruna/'},
   {t:'FAD',u:'/lembaga-kemasyarakatan/fad/'}
 ]},
 {t:'REGULASI',c:[
   {t:'PERDES',u:'/regulasi/perdes/'},
   {t:'PERKADES',u:'/regulasi/perkades/'},
   {t:'SK',u:'/regulasi/sk/'}
 ]},
 {t:'PPID',c:[
   {t:'APBDesa',u:'/anggaran/'},
   {t:'Agenda',u:'/agenda/'},
   {t:'Realisasi',u:'/realisasi-apbdesa/'},
   {t:'Simpeldesa',u:'/simpeldesa/'}
 ]},
 {t:'WARTA DESA',u:'/warta-desa/'},
 {t:'POTENSI DESA',u:'/potensi-desa/'}
];

function active(u){
  return location.pathname===u || (u!=='/' && location.pathname.startsWith(u));
}
function itemActive(item){
  return (item.u && active(item.u)) || (item.c && item.c.some(itemActive));
}
function renderDropdownItem(item){
  if(item.c){
    return `<div class="kb-dropdown-item has-children ${itemActive(item)?'active':''}">
      <a href="${item.u||'#'}" class="${item.u&&active(item.u)?'active':''}">
        <span>${item.t}</span><span class="kb-side-caret" aria-hidden="true"></span>
      </a>
      <div class="kb-submenu">
        ${item.c.map(child=>`<a href="${child.u}" class="${active(child.u)?'active':''}">${child.t}</a>`).join('')}
      </div>
    </div>`;
  }
  return `<a href="${item.u}" class="${active(item.u)?'active':''}">${item.t}</a>`;
}

function renderHeader(){
 const el=document.querySelector('[data-header]');
 if(!el)return;
 const menu=nav.map(n=>n.c
  ? `<div class="kb-nav-item">
       <a class="${itemActive(n)?'active':''}" href="#">
         <span>${n.t}</span><span class="kb-caret" aria-hidden="true"></span>
       </a>
       <div class="kb-dropdown">
         ${n.c.map(renderDropdownItem).join('')}
       </div>
     </div>`
  : `<a href="${n.u}" class="${active(n.u)?'active':''}">${n.t}</a>`
 ).join('');

 el.innerHTML=`
 <header class="kb-header">
   <div class="kb-container kb-head-inner">
     <a class="kb-brand" href="/">
       <img src="${LOGO}" alt="Logo Desa Kendalbulur">
       <div class="kb-brand-copy">
         <div class="small">Pemerintah Desa</div>
         <div class="big">KENDALBULUR</div>
         <div class="sub">Kec. Boyolangu, Kab. Tulungagung</div>
       </div>
     </a>
     <button class="kb-menu-btn" aria-label="Buka menu">☰</button>
     <nav class="kb-nav">${menu}</nav>
   </div>
 </header>`;

 const btn=el.querySelector('.kb-menu-btn');
 const n=el.querySelector('.kb-nav');
 btn?.addEventListener('click',()=>n.classList.toggle('open'));

 el.querySelectorAll('.kb-nav-item>a').forEach(a=>a.addEventListener('click',e=>{
   if(innerWidth<1025){e.preventDefault();a.parentElement.classList.toggle('open')}
 }));
 el.querySelectorAll('.kb-dropdown-item.has-children>a').forEach(a=>a.addEventListener('click',e=>{
   if(innerWidth<1025){e.preventDefault();a.parentElement.classList.toggle('open')}
 }));
}

function renderFooter(){
 const el=document.querySelector('[data-footer]');
 if(!el)return;
 el.innerHTML=`
 <footer class="footer">
   <div class="kb-container">
     <div class="footer-grid">
       <div>
         <div class="footer-brand">
           <img src="${FOOTER_LOGO}" alt="Logo Desa Kendalbulur">
           <div>
             <p>Terimakasih telah mengunjungi website resmi Pemerintah Desa Kendalbulur. Ikuti akun resmi sosial media kami untuk mendapatkan informasi perkembangan dan pembangunan Desa.</p>
             <div class="socials"><span>f</span><span>◎</span><span>♪</span><span>▶</span></div>
           </div>
         </div>
       </div>
       <div>
         <h4>Menu</h4>
         <div class="footer-links">
           <a href="/">Beranda</a>
           <a href="/profil-desa/sejarah-desa/">Sejarah Desa</a>
           <a href="/profil-desa/sotk/">SOTK</a>
           <a href="/anggaran/">APBDes</a>
           <a href="/potensi-desa/">Potensi Desa</a>
         </div>
       </div>
       <div>
         <h4>Kategori Warta Desa</h4>
         <div class="footer-links">
           <a href="/warta-desa/">Kearifan dan Budaya Desa</a>
           <a href="/warta-desa/">Kegiatan</a>
           <a href="/potensi-desa/">Potensi dan Produk Unggulan</a>
           <a href="/profil-desa/sejarah-desa/">Sejarah Desa</a>
           <a href="/warta-desa/">Warta Desa</a>
         </div>
       </div>
       <div>
         <h4>Kontak</h4>
         <div class="footer-links">
           <a href="tel:082232647069">☎ 0822-3264-7069</a>
           <a href="mailto:pemdeskendalbulur@gmail.com">✉ pemdeskendalbulur@gmail.com</a>
           <p>Dsn. Genting, Ds. Kendalbulur, Kec. Boyolangu, Kabupaten Tulungagung, Jawa Timur 66235</p>
           <a href="https://kendalbulur.id">◉ www.kendalbulur.id</a>
         </div>
       </div>
     </div>
     <div class="copyright">© Pemerintah Desa Kendalbulur. &nbsp; Hak cipta dilindungi undang-undang</div>
   </div>
 </footer>`;
}

document.addEventListener('DOMContentLoaded',()=>{
 renderHeader();
 renderFooter();
 document.querySelectorAll('.flip-card').forEach(x=>x.addEventListener('click',()=>x.classList.toggle('flipped')));
});
