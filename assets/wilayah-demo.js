(() => {
const D={
 rongganan:{
  title:'Dusun Rongganan',
  admin:'Sumber publik menempatkan Nangkula Park di Dusun Rongganan RT 01/RW 04 dan Mushola Baitul Musthofa di sekitar RT 003/RW 004. Pemetaan RT/RW lengkap masih perlu divalidasi operator.',
  facilities:['Masjid Jami’ Baitul Ghofur','Mushola Baitul Musthofa','BUMDesa LASARASTI / unit usaha desa'],
  popular:['Nangkula Park - destinasi wisata keluarga dan unit wisata desa'],
  note:'Lokasi Nangkula Park dan contoh RT/RW bersumber dari registri/pariwisata publik; struktur administratif lengkap belum tersedia secara publik.'
 },
 genting:{
  title:'Dusun Genting',
  admin:'Dusun Genting merupakan salah satu dari tiga dusun Kendalbulur. Pembagian RT/RW rinci ditampilkan sebagai data yang perlu dikonfirmasi operator.',
  facilities:['Balai Desa Kendalbulur','Lapangan Kendalbulur','Masjid Baitul Mu’min','Mushola Baitut Thohir','SDN Kendalbulur 1 / SDN Kendalbulur II'],
  popular:['Jembatan Gantung Kendalbulur','Pusat pelayanan Pemerintah Desa Kendalbulur'],
  note:'Nama fasilitas berasal dari sumber publik/lokasi daring; batas internal dusun pada prototype bersifat ilustratif.'
 },
 kendalbulur:{
  title:'Dusun Kendalbulur',
  admin:'Dusun Kendalbulur merupakan salah satu dari tiga dusun. Nomor RT/RW di dalam dusun belum dipetakan secara lengkap dalam sumber publik yang ditemukan.',
  facilities:['Masjid Ar Ridho','Masjid Al Hidayah','Mushola Thoriqul Huda'],
  popular:['Kawasan permukiman dan fasilitas masyarakat Desa Kendalbulur'],
  note:'Fasilitas merupakan hasil penelusuran publik. Alamat administratif rinci dan pembagian RT/RW perlu validasi operator.'
 }
};
function render(key){
 document.querySelectorAll('[data-dusun]').forEach(x=>x.classList.toggle('active',x.dataset.dusun===key));
 const x=D[key], box=document.querySelector('[data-dusun-detail]'); if(!box)return;
 box.innerHTML='<span class="demo-badge">PETA INTERAKTIF PROTOTYPE</span><h3>'+x.title+'</h3><p><b>Wilayah Administratif:</b> '+x.admin+'</p><h4>Fasilitas Umum</h4><ul>'+x.facilities.map(v=>'<li>'+v+'</li>').join('')+'</ul><h4>Destinasi / Titik Populer</h4><ul>'+x.popular.map(v=>'<li>'+v+'</li>').join('')+'</ul><div class="source-links">'+x.note+'</div>';
}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('[data-dusun]').forEach(x=>x.addEventListener('click',()=>render(x.dataset.dusun)));
 render('rongganan');
});
})();