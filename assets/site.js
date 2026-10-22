const ROOT = location.pathname.split('/').filter(Boolean).length ? '../' : './';
const path = location.pathname;
const navItems = [
  ['Beranda','/'],['APBDes','/apbdes/'],['Simpeldesa','/simpeldesa/'],['RT/RW','/rt-rw/'],['Potensi Desa','/potensi-desa/'],['Regulasi','/regulasi/'],['Audit','/audit/']
];
function hrefFor(route){ return route==='/' ? (path==='/'?'./':'../') : (path==='/'?'.'+route:'../'+route.replace(/^\//,'')); }
function renderShell(){
  const h=document.getElementById('site-header');
  if(h) h.innerHTML=`<div class="topline"></div><header class="site-header"><div class="container head"><a class="brand" href="${hrefFor('/')}"><div class="brand-mark">KB</div><div><strong>PEMERINTAH DESA KENDALBULUR</strong><small>Kec. Boyolangu, Kab. Tulungagung</small></div></a><button class="menu-toggle" aria-label="Buka menu" onclick="document.querySelector('.nav').classList.toggle('open')">☰</button><nav class="nav">${navItems.map(([label,route])=>`<a class="${route!=='/'&&path.startsWith(route)?'active':route==='/'&&path==='/'?'active':''}" href="${hrefFor(route)}">${label}</a>`).join('')}</nav></div></header>`;
  const f=document.getElementById('site-footer');
  if(f) f.innerHTML=`<footer class="footer"><div class="container"><div class="footer-grid"><div><h3>Pemerintah Desa Kendalbulur</h3><p>Prototype perbaikan website untuk KKM. Konten publik final harus diverifikasi bersama operator dan pemerintah desa.</p></div><div><h3>Menu Prioritas</h3><div class="footer-links"><a href="${hrefFor('/apbdes/')}">APBDes & Realisasi</a><a href="${hrefFor('/simpeldesa/')}">Akses Simpeldesa</a><a href="${hrefFor('/rt-rw/')}">Direktori RT/RW</a><a href="${hrefFor('/potensi-desa/')}">Potensi Desa</a></div></div><div><h3>Website Resmi</h3><div class="footer-links"><a href="https://kendalbulur.id" target="_blank" rel="noopener">kendalbulur.id ↗</a><a href="${hrefFor('/audit/')}">Daftar kekurangan & status</a></div></div></div><div class="copyright">Prototype KKM • Poppins / sans-serif • Tema marun-putih-emas • Tidak menggantikan data resmi desa.</div></div></footer>`;
}
function toggleFlip(el){el.classList.toggle('flipped')}
function filterTable(input,tableId){const q=input.value.toLowerCase();document.querySelectorAll(`#${tableId} tbody tr`).forEach(r=>r.classList.toggle('hidden',!r.innerText.toLowerCase().includes(q)))}
document.addEventListener('DOMContentLoaded',renderShell);