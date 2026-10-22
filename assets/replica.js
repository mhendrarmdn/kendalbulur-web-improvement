const LOGO='https://kendalbulur.id/storage/2025/11/cropped-Untitled-1-01.png';
const nav=[
 {t:'Beranda',u:'/'},
 {t:'Profil',c:[['Profil Umum','/profil-desa/profil-umum/'],['Sejarah Desa','/profil-desa/sejarah-desa/'],['Wilayah Desa','/profil-desa/wilayah-desa/'],['Peta Desa','/profil-desa/peta-desa/'],['SOTK','/profil-desa/sotk/'],['Profil Kepala Desa','/profil-desa/kepala-desa/'],['IDM','/profil-desa/idm/']]},
 {t:'Lembaga Desa',c:[['BPD','/lembaga-desa/bpd/'],['Lembaga Adat Desa','/lembaga-desa/lad/'],['BUMDesa','/lembaga-desa/bumdesa/'],['KDMP','/lembaga-desa/kdmp/']]},
 {t:'Lembaga Kemasyarakatan',c:[['PKK','/lembaga-kemasyarakatan/pkk/'],['RT / RW','/rt-rw/'],['Satlinmas','/lembaga-kemasyarakatan/satlinmas/'],['Posyandu','/lembaga-kemasyarakatan/posyandu/'],['Karang Taruna','/lembaga-kemasyarakatan/karang-taruna/'],['Forum Anak Desa','/lembaga-kemasyarakatan/fad/']]},
 {t:'Regulasi',c:[['Peraturan Desa','/regulasi/perdes/'],['Peraturan Kepala Desa','/regulasi/perkades/'],['Surat Keputusan','/regulasi/sk/']]},
 {t:'PPID',c:[['APBDesa','/anggaran/'],['Agenda','/agenda/'],['Realisasi','/realisasi-apbdesa/'],['Simpeldesa','/simpeldesa/']]},
 {t:'Warta Desa',u:'/warta-desa/'},{t:'Potensi Desa',u:'/potensi-desa/'}
];
function active(u){return location.pathname===u|| (u!=='/'&&location.pathname.startsWith(u))}
function renderHeader(){
 const el=document.querySelector('[data-header]'); if(!el)return;
 const menu=nav.map(n=>n.c?`<div class="kb-nav-item"><a class="${n.c.some(x=>active(x[1]))?'active':''}" href="#">${n.t}<span class="kb-caret">▼</span></a><div class="kb-dropdown">${n.c.map(x=>`<a href="${x[1]}" class="${active(x[1])?'active':''}">${x[0]}</a>`).join('')}</div></div>`:`<a href="${n.u}" class="${active(n.u)?'active':''}">${n.t}</a>`).join('');
 el.innerHTML=`<div class="proto-bar"><div class="kb-container"><span>PROTOTYPE KKM — replika front-end kendalbulur.id untuk bahan presentasi operator</span><span>Fitur baru diberi label <b>FITUR USULAN</b></span></div></div><header class="kb-header"><div class="kb-container kb-head-inner"><a class="kb-brand" href="/"><img src="${LOGO}" alt="Logo Desa Kendalbulur"><div class="kb-brand-copy"><div class="small">Pemerintah Desa</div><div class="big">KENDALBULUR</div><div class="sub">Kec. Boyolangu, Kab. Tulungagung</div></div></a><button class="kb-menu-btn" aria-label="Menu">☰</button><nav class="kb-nav">${menu}</nav></div></header>`;
 const btn=el.querySelector('.kb-menu-btn'), n=el.querySelector('.kb-nav'); btn?.addEventListener('click',()=>n.classList.toggle('open'));
 el.querySelectorAll('.kb-nav-item>a').forEach(a=>a.addEventListener('click',e=>{if(innerWidth<981){e.preventDefault();a.parentElement.classList.toggle('open')}}));
}
function renderFooter(){
 const el=document.querySelector('[data-footer]'); if(!el)return;
 el.innerHTML=`<footer class="footer"><div class="kb-container"><div class="footer-grid"><div><div class="footer-brand"><img src="${LOGO}" alt=""><div><h4>Pemerintah Desa Kendalbulur</h4><p>Terimakasih telah mengunjungi website resmi Pemerintah Desa Kendalbulur. Ikuti akun resmi sosial media kami untuk mendapatkan informasi perkembangan dan pembangunan Desa.</p><div class="socials"><span>f</span><span>◎</span><span>♪</span><span>▶</span></div></div></div></div><div><h4>Menu</h4><div class="footer-links"><a href="/">Beranda</a><a href="/profil-desa/sejarah-desa/">Sejarah Desa</a><a href="/profil-desa/sotk/">SOTK</a><a href="/anggaran/">APBDesa</a><a href="/potensi-desa/">Potensi Desa</a></div></div><div><h4>Kategori Warta Desa</h4><div class="footer-links"><a href="/warta-desa/">Kearifan dan Budaya Desa</a><a href="/warta-desa/">Kegiatan</a><a href="/potensi-desa/">Potensi dan Produk Unggulan</a><a href="/warta-desa/">Sejarah Desa</a><a href="/warta-desa/">Warta Desa</a></div></div><div><h4>Kontak</h4><div class="footer-links"><a href="tel:082232647069">☎ 0822-3264-7069</a><a href="mailto:pemdeskendalbulur@gmail.com">✉ pemdeskendalbulur@gmail.com</a><p>Dsn. Genting, Ds. Kendalbulur, Kec. Boyolangu, Kabupaten Tulungagung, Jawa Timur 66235</p><a href="https://kendalbulur.id">◉ www.kendalbulur.id</a></div></div></div><div class="copyright">© Pemerintah Desa Kendalbulur • Prototype presentasi KKM • Hak cipta konten tetap pada pemilik masing-masing.</div></div></footer>`;
}
document.addEventListener('DOMContentLoaded',()=>{renderHeader();renderFooter();document.querySelectorAll('.flip-card').forEach(x=>x.addEventListener('click',()=>x.classList.toggle('flipped')));});
