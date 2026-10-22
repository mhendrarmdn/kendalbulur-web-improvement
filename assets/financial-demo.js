(() => {
const nf = new Intl.NumberFormat('id-ID');
const rp = n => n == null ? '—' : 'Rp ' + nf.format(Math.round(n));
const pct = (r,b) => b ? (r/b*100).toFixed(2).replace('.',',') : '0,00';

const DATA = {
  2026: {
    label:'DEMO 2026',
    income:[
      {code:'4.1',name:'Pendapatan Asli Desa',children:[
        {code:'4.1.1',name:'Hasil Usaha',b:300000000,r:264600000},
        {code:'4.1.2',name:'Hasil Aset',b:100000000,r:85500000},
        {code:'4.1.3',name:'Swadaya, Partisipasi dan Gotong Royong',b:20000000,r:17100000},
        {code:'4.1.4',name:'Lain-lain Pendapatan Asli Desa',b:25950000,r:21697000}
      ]},
      {code:'4.2',name:'Transfer Desa',children:[
        {code:'4.2.1',name:'Dana Desa',b:373456000,r:345447000},
        {code:'4.2.2',name:'Bagian dari Hasil Pajak dan Retribusi Daerah Kabupaten/Kota',b:83419273,r:75572000},
        {code:'4.2.3',name:'Alokasi Dana Desa',b:548025814,r:492677000},
        {code:'4.2.4',name:'Bantuan Keuangan Provinsi',b:300000000,r:242400000},
        {code:'4.2.5',name:'Bantuan Keuangan APBD Kabupaten/Kota',b:250000000,r:181742417}
      ]},
      {code:'4.3',name:'Pendapatan Lain-Lain Desa',children:[
        {code:'4.3.1',name:'Penerimaan dari Hasil Kerjasama antar Desa',b:0,r:0},
        {code:'4.3.2',name:'Penerimaan dari Hasil Kerjasama Desa dengan Pihak Ketiga',b:0,r:0},
        {code:'4.3.3',name:'Penerimaan dari Bantuan Perusahaan yang Berlokasi di Desa',b:0,r:0},
        {code:'4.3.4',name:'Hibah dan Sumbangan dari Pihak Ketiga',b:0,r:0},
        {code:'4.3.5',name:'Koreksi Kesalahan Belanja Tahun-Tahun Anggaran Sebelumnya yang Mengakibatkan Penerimaan di Kas Desa pada Tahun Anggaran Berjalan',b:0,r:0},
        {code:'4.3.6',name:'Bunga Bank',b:0,r:0},
        {code:'4.3.9',name:'Lain-lain Pendapatan Desa yang Sah',b:0,r:0}
      ]}
    ],
    expense:[
      {code:'5.1',name:'Bidang Penyelenggaraan Pemerintahan Desa',children:[
        {code:'5.1.1',name:'Penyelenggaraan Belanja Siltap, Tunjangan dan Operasional Pemerintah Desa',b:650000000,r:533000000},
        {code:'5.1.2',name:'Sarana dan Prasarana Pemerintah Desa',b:140000000,r:121800000},
        {code:'5.1.3',name:'Administrasi Kependudukan, Pencatatan Sipil, Statistik dan Kearsipan',b:70000000,r:56700000},
        {code:'5.1.4',name:'Tata Praja Pemerintahan, Perencanaan, Keuangan',b:100000000,r:84700000},
        {code:'5.1.5',name:'Sub Bidang Pertanahan',b:33805814,r:26368514}
      ]},
      {code:'5.2',name:'Bidang Pelaksanaan Pembangunan Desa',children:[
        {code:'5.2.1',name:'Sub Bidang Pendidikan',b:70000000,r:60200000},
        {code:'5.2.2',name:'Sub Bidang Kesehatan',b:60000000,r:51600000},
        {code:'5.2.3',name:'Sub Bidang Pekerjaan Umum dan Penataan Ruang',b:250000000,r:218750000},
        {code:'5.2.4',name:'Sub Bidang Kawasan Permukiman',b:60000000,r:50700000},
        {code:'5.2.5',name:'Sub Bidang Kehutanan dan Lingkungan Hidup',b:35000000,r:29050000},
        {code:'5.2.6',name:'Sub Bidang Perhubungan, Komunikasi dan Informatika',b:30000000,r:24600000},
        {code:'5.2.7',name:'Sub Bidang Energi dan Sumber Daya Mineral',b:20000000,r:15400000},
        {code:'5.2.8',name:'Sub Bidang Pariwisata',b:26467000,r:21967600}
      ]},
      {code:'5.3',name:'Bidang Pembinaan Kemasyarakatan Desa',children:[
        {code:'5.3.1',name:'Ketenteraman, Ketertiban Umum, dan Perlindungan Masyarakat',b:45000000,r:36900000},
        {code:'5.3.2',name:'Kebudayaan dan Keagamaan',b:50000000,r:42750000},
        {code:'5.3.3',name:'Kepemudaan dan Olah Raga',b:39900000,r:32319000},
        {code:'5.3.4',name:'Kelembagaan Masyarakat',b:30000000,r:24600000}
      ]},
      {code:'5.4',name:'Bidang Pemberdayaan Masyarakat Desa',children:[
        {code:'5.4.1',name:'Sub Bidang Kelautan dan Perikanan',b:50000000,r:42000000},
        {code:'5.4.2',name:'Sub Bidang Pertanian dan Peternakan',b:80000000,r:68800000},
        {code:'5.4.3',name:'Sub Bidang Peningkatan Kapasitas Aparatur Desa',b:40000000,r:32400000},
        {code:'5.4.4',name:'Pemberdayaan Perempuan, Perlindungan Anak dan Keluarga',b:45000000,r:37350000},
        {code:'5.4.5',name:'Koperasi, Usaha Mikro Kecil dan Menengah (UMKM)',b:30000000,r:23700000},
        {code:'5.4.6',name:'Dukungan Penanaman Modal',b:20000000,r:15800000},
        {code:'5.4.7',name:'Perdagangan dan Perindustrian',b:24589000,r:19179473}
      ]},
      {code:'5.5',name:'Penanggulangan Bencana, Keadaan Darurat dan Mendesak Desa',children:[
        {code:'5.5.1',name:'Penanggulangan Bencana',b:15000000,r:11700000},
        {code:'5.5.2',name:'Keadaan Darurat',b:10000000,r:7400000},
        {code:'5.5.3',name:'Mendesak',b:15379799,r:11883100}
      ]}
    ],
    financing:{
      receipt:{code:'6.1',name:'Penerimaan Pembiayaan Desa',children:[
        {code:'6.1.1',name:'SILPA Tahun Sebelumnya',b:50000000,r:48000000},
        {code:'6.1.2',name:'Pencairan Dana Cadangan',b:0,r:0},
        {code:'6.1.3',name:'Hasil Penjualan Kekayaan Desa yang Dipisahkan',b:0,r:0},
        {code:'6.1.9',name:'Penerimaan Pembiayaan Lainnya',b:10000000,r:7000000}
      ]},
      spend:{code:'6.2',name:'Pengeluaran Pembiayaan Desa',children:[
        {code:'6.2.1',name:'Pembentukan Dana Cadangan',b:0,r:0},
        {code:'6.2.2',name:'Penyertaan Modal Desa',b:30000000,r:28000000},
        {code:'6.2.9',name:'Pengeluaran Pembiayaan Lainnya',b:15000000,r:13000000}
      ]}
    }
  },
  2025:{
    label:'DEMO 2025',
    income:[
      {code:'4.1',name:'Pendapatan Asli Desa',children:[
        {code:'4.1.1',name:'Hasil Usaha',b:760000000,r:748600000},
        {code:'4.1.2',name:'Hasil Aset',b:200000000,r:190000000},
        {code:'4.1.3',name:'Swadaya, Partisipasi dan Gotong Royong',b:20000000,r:18000000},
        {code:'4.1.4',name:'Lain-lain Pendapatan Asli Desa',b:20000000,r:18000000}
      ]},
      {code:'4.2',name:'Transfer Desa',children:[
        {code:'4.2.1',name:'Dana Desa',b:10000000,r:9700000},
        {code:'4.2.2',name:'Bagian dari Hasil Pajak dan Retribusi Daerah Kabupaten/Kota',b:0,r:0},
        {code:'4.2.3',name:'Alokasi Dana Desa',b:2000000,r:1900000},
        {code:'4.2.4',name:'Bantuan Keuangan Provinsi',b:0,r:0},
        {code:'4.2.5',name:'Bantuan Keuangan APBD Kabupaten/Kota',b:0,r:0}
      ]},
      {code:'4.3',name:'Pendapatan Lain-Lain Desa',children:[
        {code:'4.3.1',name:'Penerimaan dari Hasil Kerjasama antar Desa',b:0,r:0},
        {code:'4.3.2',name:'Penerimaan dari Hasil Kerjasama Desa dengan Pihak Ketiga',b:0,r:0},
        {code:'4.3.3',name:'Penerimaan dari Bantuan Perusahaan yang Berlokasi di Desa',b:0,r:0},
        {code:'4.3.4',name:'Hibah dan Sumbangan dari Pihak Ketiga',b:0,r:0},
        {code:'4.3.5',name:'Koreksi Kesalahan Belanja Tahun-Tahun Anggaran Sebelumnya yang Mengakibatkan Penerimaan di Kas Desa pada Tahun Anggaran Berjalan',b:0,r:0},
        {code:'4.3.6',name:'Bunga Bank',b:0,r:0},
        {code:'4.3.9',name:'Lain-lain Pendapatan Desa yang Sah',b:0,r:0}
      ]}
    ],
    expense:[
      {code:'5.1',name:'Bidang Penyelenggaraan Pemerintahan Desa',children:[
        {code:'5.1.1',name:'Penyelenggaraan Belanja Siltap, Tunjangan dan Operasional Pemerintah Desa',b:760000000,r:712500000},
        {code:'5.1.2',name:'Sarana dan Prasarana Pemerintah Desa',b:120000000,r:112800000},
        {code:'5.1.3',name:'Administrasi Kependudukan, Pencatatan Sipil, Statistik dan Kearsipan',b:40000000,r:37000000},
        {code:'5.1.4',name:'Tata Praja Pemerintahan, Perencanaan, Keuangan',b:60000000,r:55200000},
        {code:'5.1.5',name:'Sub Bidang Pertanahan',b:20000000,r:17500000}
      ]},
      {code:'5.2',name:'Bidang Pelaksanaan Pembangunan Desa',children:[
        {code:'5.2.1',name:'Sub Bidang Pendidikan',b:2000000,r:1900000},
        {code:'5.2.2',name:'Sub Bidang Kesehatan',b:1000000,r:950000},
        {code:'5.2.3',name:'Sub Bidang Pekerjaan Umum dan Penataan Ruang',b:3000000,r:2850000},
        {code:'5.2.4',name:'Sub Bidang Kawasan Permukiman',b:1000000,r:950000},
        {code:'5.2.5',name:'Sub Bidang Kehutanan dan Lingkungan Hidup',b:500000,r:450000},
        {code:'5.2.6',name:'Sub Bidang Perhubungan, Komunikasi dan Informatika',b:1000000,r:900000},
        {code:'5.2.7',name:'Sub Bidang Energi dan Sumber Daya Mineral',b:500000,r:450000},
        {code:'5.2.8',name:'Sub Bidang Pariwisata',b:1000000,r:950000}
      ]},
      {code:'5.3',name:'Bidang Pembinaan Kemasyarakatan Desa',children:[
        {code:'5.3.1',name:'Ketenteraman, Ketertiban Umum, dan Perlindungan Masyarakat',b:500000,r:450000},
        {code:'5.3.2',name:'Kebudayaan dan Keagamaan',b:500000,r:480000},
        {code:'5.3.3',name:'Kepemudaan dan Olah Raga',b:500000,r:460000},
        {code:'5.3.4',name:'Kelembagaan Masyarakat',b:500000,r:460000}
      ]},
      {code:'5.4',name:'Bidang Pemberdayaan Masyarakat Desa',children:[
        {code:'5.4.1',name:'Sub Bidang Kelautan dan Perikanan',b:0,r:0},
        {code:'5.4.2',name:'Sub Bidang Pertanian dan Peternakan',b:0,r:0},
        {code:'5.4.3',name:'Sub Bidang Peningkatan Kapasitas Aparatur Desa',b:0,r:0},
        {code:'5.4.4',name:'Pemberdayaan Perempuan, Perlindungan Anak dan Keluarga',b:0,r:0},
        {code:'5.4.5',name:'Koperasi, Usaha Mikro Kecil dan Menengah (UMKM)',b:0,r:0},
        {code:'5.4.6',name:'Dukungan Penanaman Modal',b:0,r:0},
        {code:'5.4.7',name:'Perdagangan dan Perindustrian',b:0,r:0}
      ]},
      {code:'5.5',name:'Penanggulangan Bencana, Keadaan Darurat dan Mendesak Desa',children:[
        {code:'5.5.1',name:'Penanggulangan Bencana',b:0,r:0},
        {code:'5.5.2',name:'Keadaan Darurat',b:0,r:0},
        {code:'5.5.3',name:'Mendesak',b:0,r:0}
      ]}
    ],
    financing:{
      receipt:{code:'6.1',name:'Penerimaan Pembiayaan Desa',children:[
        {code:'6.1.1',name:'SILPA Tahun Sebelumnya',b:0,r:0},
        {code:'6.1.2',name:'Pencairan Dana Cadangan',b:0,r:0},
        {code:'6.1.3',name:'Hasil Penjualan Kekayaan Desa yang Dipisahkan',b:0,r:0},
        {code:'6.1.9',name:'Penerimaan Pembiayaan Lainnya',b:0,r:0}
      ]},
      spend:{code:'6.2',name:'Pengeluaran Pembiayaan Desa',children:[
        {code:'6.2.1',name:'Pembentukan Dana Cadangan',b:0,r:0},
        {code:'6.2.2',name:'Penyertaan Modal Desa',b:0,r:0},
        {code:'6.2.9',name:'Pengeluaran Pembiayaan Lainnya',b:0,r:0}
      ]}
    }
  }
};

function sumChildren(g,k){return g.children.reduce((s,x)=>s+(x[k]||0),0)}
function totalGroups(groups,k){return groups.reduce((s,g)=>s+sumChildren(g,k),0)}
function rowsForYear(year){
 const d=DATA[year], rows=[];
 const addSection=(code,name,groups)=>{
   const b=totalGroups(groups,'b'),r=totalGroups(groups,'r');
   rows.push({code,name,b,r,level:0,type:'chapter'});
   groups.forEach(g=>{
     const gb=sumChildren(g,'b'),gr=sumChildren(g,'r');
     rows.push({code:g.code,name:g.name,b:gb,r:gr,level:1,type:'group'});
     g.children.forEach(x=>rows.push({...x,level:2,type:'leaf'}));
   });
   rows.push({code:'',name:'JUMLAH '+name,b,r,level:0,type:'total'});
   return {b,r};
 };
 const inc=addSection('4','PENDAPATAN',d.income);
 const exp=addSection('5','BELANJA',d.expense);
 rows.push({code:'',name:'SURPLUS / (DEFISIT)',b:inc.b-exp.b,r:inc.r-exp.r,level:0,type:'total'});
 const rb=sumChildren(d.financing.receipt,'b'), rr=sumChildren(d.financing.receipt,'r');
 const sb=sumChildren(d.financing.spend,'b'), sr=sumChildren(d.financing.spend,'r');
 rows.push({code:'6',name:'PEMBIAYAAN',b:rb+sb,r:rr+sr,level:0,type:'chapter'});
 [d.financing.receipt,d.financing.spend].forEach(g=>{
   rows.push({code:g.code,name:g.name,b:sumChildren(g,'b'),r:sumChildren(g,'r'),level:1,type:'group'});
   g.children.forEach(x=>rows.push({...x,level:2,type:'leaf'}));
 });
 rows.push({code:'',name:'PEMBIAYAAN NETTO',b:rb-sb,r:rr-sr,level:0,type:'grand'});
 rows.push({code:'',name:'SILPA/SiLPA TAHUN BERJALAN',b:inc.b-exp.b+rb-sb,r:inc.r-exp.r+rr-sr,level:0,type:'grand'});
 return rows;
}
function totals(year){
 const rows=rowsForYear(year);
 const get=n=>rows.find(r=>r.name===n);
 return {
  pendapatan:get('JUMLAH PENDAPATAN'),
  belanja:get('JUMLAH BELANJA'),
  pembiayaan:get('PEMBIAYAAN NETTO'),
  silpa:get('SILPA/SiLPA TAHUN BERJALAN')
 };
}
function rowHtml(row){
 const diff=row.b-row.r, p=pct(row.r,row.b);
 const cls=row.type==='chapter'?'level-0':row.type==='group'?'level-1':row.type==='total'?'total-row':row.type==='grand'?'grand-total':'';
 const indent=row.level===1?'indent-1':row.level===2?'indent-2':'';
 return `<tr class="${cls}"><td>${row.code}</td><td class="${indent}">${row.name}</td><td class="num">${nf.format(row.b)}</td><td class="num demo-number">${nf.format(row.r)}</td><td class="num">${nf.format(diff)}</td><td class="num">${p}</td></tr>`;
}
function summaryProgress(name,item){
 const width=Math.min(100,item.b?item.r/item.b*100:0);
 const label=pct(item.r,item.b)+'%';
 return `<div class="ref-progress-group"><div class="name">${name}</div><div class="amounts">${rp(item.r)} | ${rp(item.b)}</div><div class="ref-progress" aria-label="${name}: ${label}"><div class="fill" style="--progress:${width}%"><span class="pct">${label}</span></div></div></div>`;
}
function renderTable(year, target){
 target.innerHTML=rowsForYear(year).map(rowHtml).join('');
}
function renderProgress(year,target){
 const d=DATA[year],t=totals(year);
 const incGroups=d.income.map(g=>({name:g.name,b:sumChildren(g,'b'),r:sumChildren(g,'r')}));
 const expGroups=d.expense.map(g=>({name:g.name,b:sumChildren(g,'b'),r:sumChildren(g,'r')}));
 target.innerHTML=`
 <section class="realization-panel"><h3>APBDes ${year} Pelaksanaan</h3><div class="subhead">Realisasi | Anggaran</div>
   ${summaryProgress('Pendapatan Desa',t.pendapatan)}
   ${summaryProgress('Belanja Desa',t.belanja)}
   ${summaryProgress('Pembiayaan Netto',t.pembiayaan)}
 </section>
 <section class="realization-panel"><h3>APBDes ${year} Pendapatan</h3><div class="subhead">Realisasi | Anggaran</div>
   ${incGroups.map(x=>summaryProgress(x.name,x)).join('')}
 </section>
 <section class="realization-panel"><h3>APBDes ${year} Pembelanjaan</h3><div class="subhead">Realisasi | Anggaran</div>
   ${expGroups.map(x=>summaryProgress(x.name,x)).join('')}
 </section>`;
}
function renderMetrics(year,target){
 const t=totals(year);
 target.innerHTML=[
  ['Total Pendapatan',t.pendapatan],
  ['Total Belanja',t.belanja],
  ['Pembiayaan Netto',t.pembiayaan],
  ['SiLPA Tahun Berjalan',t.silpa]
 ].map(([n,x])=>`<div class="dash-card"><small>${n}</small><b>${rp(x.r)}</b><em>Realisasi demo dari ${rp(x.b)}</em></div>`).join('');
}
function poster(year,target){
 const t=totals(year);
 target.innerHTML=`<div class="demo-poster"><div class="demo-poster-head"><b>DESA KENDALBULUR</b><span>APBDesa ${year}</span></div><div class="demo-poster-grid"><div><h4>PENDAPATAN</h4><strong>${rp(t.pendapatan.b)}</strong><p>Realisasi demo: ${rp(t.pendapatan.r)}</p></div><div><h4>BELANJA</h4><strong>${rp(t.belanja.b)}</strong><p>Realisasi demo: ${rp(t.belanja.r)}</p></div><div><h4>PEMBIAYAAN NETTO</h4><strong>${rp(t.pembiayaan.b)}</strong><p>Realisasi demo: ${rp(t.pembiayaan.r)}</p></div></div><div class="demo-watermark">DATA DEMO UNTUK PROTOTYPE - BUKAN DATA RESMI</div></div>`;
}
function setYear(year){
 document.querySelectorAll('[data-year-btn]').forEach(b=>b.classList.toggle('active',Number(b.dataset.yearBtn)===year));
 document.querySelectorAll('[data-year-label]').forEach(x=>x.textContent=year);
 const tb=document.querySelector('[data-financial-body]'); if(tb) renderTable(year,tb);
 const pg=document.querySelector('[data-progress-grid]'); if(pg) renderProgress(year,pg);
 const mt=document.querySelector('[data-metrics]'); if(mt) renderMetrics(year,mt);
 const po=document.querySelector('[data-poster]'); if(po) poster(year,po);
 window.KB_FINANCIAL_YEAR=year;
}
function downloadPdf(kind,year){
 const {jsPDF}=window.jspdf||{}; if(!jsPDF){alert('Generator PDF belum termuat. Coba refresh halaman.');return;}
 const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
 doc.setFont('helvetica','bold');doc.setFontSize(16);doc.text(kind==='budget'?'APBDesa - Anggaran':'Laporan Realisasi APBDesa',14,16);
 doc.setFontSize(11);doc.text('Pemerintah Desa Kendalbulur - Tahun '+year,14,23);
 doc.setTextColor(127,17,16);doc.text('DATA DEMO UNTUK PROTOTYPE - BUKAN DATA RESMI',14,30);doc.setTextColor(0,0,0);
 const body=rowsForYear(year).map(r=>[
   r.code,r.name,nf.format(r.b),kind==='budget'?'—':nf.format(r.r),kind==='budget'?'—':nf.format(r.b-r.r),kind==='budget'?'—':pct(r.r,r.b)+'%'
 ]);
 if(doc.autoTable){
  doc.autoTable({startY:35,head:[['Kode','Uraian','Anggaran (Rp)','Realisasi (Rp)','Lebih/(Kurang)','%']],body,styles:{fontSize:7,cellPadding:1.7},headStyles:{fillColor:[127,17,16]},columnStyles:{1:{cellWidth:100}}});
 }
 doc.save((kind==='budget'?'APBDes_':'Realisasi_APBDes_')+year+'_DEMO.pdf');
}
function init(){
 document.querySelectorAll('[data-year-btn]').forEach(b=>b.addEventListener('click',()=>setYear(Number(b.dataset.yearBtn))));
 document.querySelectorAll('[data-download]').forEach(b=>b.addEventListener('click',()=>downloadPdf(b.dataset.download,window.KB_FINANCIAL_YEAR||2026)));
 setYear(2026);
}
window.KBFinancial={DATA,rowsForYear,totals,setYear,downloadPdf};
document.addEventListener('DOMContentLoaded',init);
})();