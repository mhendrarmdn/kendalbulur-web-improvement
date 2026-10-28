(() => {
const nf = new Intl.NumberFormat('id-ID');
const rp = n => n == null ? '—' : 'Rp ' + nf.format(Math.round(n));
const pct = (r,b) => b ? (r/b*100).toFixed(2).replace('.',',') : '0,00';
const esc = v => String(v ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const rpCompact = n => {
  const value=Number(n)||0, abs=Math.abs(value);
  if(abs>=1e9) return 'Rp '+(value/1e9).toFixed(abs>=10e9?1:2).replace(/\.00$/,'').replace('.',',')+' M';
  if(abs>=1e6) return 'Rp '+(value/1e6).toFixed(abs>=10e6?1:2).replace(/\.00$/,'').replace('.',',')+' Jt';
  return rp(value);
};

const SEED_DATA = {
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

const STORAGE_KEY='kb_financial_operator_demo_v1';
const clone=v=>JSON.parse(JSON.stringify(v));
function loadData(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed=JSON.parse(raw);
      if(parsed && typeof parsed==='object') return parsed;
    }
  }catch(e){}
  return clone(SEED_DATA);
}
let DATA=loadData();
function persistData(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(DATA));}catch(e){}
  window.dispatchEvent(new CustomEvent('kbfinancialchange',{detail:{data:DATA}}));
}
function resetData(){DATA=clone(SEED_DATA);persistData();return DATA;}
function getYearData(year){
  const d=DATA[String(year)];
  if(!d) throw new Error('Tahun '+year+' tidak tersedia.');
  return d;
}
function getGroups(year,section){
  if(section!=='income' && section!=='expense') throw new Error('Bagian akun tidak didukung.');
  return getYearData(year)[section];
}
function listGroups(year,section){return clone(getGroups(year,section));}
function addGroup(year,section,payload){
  const groups=getGroups(year,section), code=String(payload.code||'').trim(), name=String(payload.name||'').trim();
  if(!code||!name) throw new Error('Kode dan nama akun wajib diisi.');
  if(groups.some(g=>g.code===code)) throw new Error('Kode akun sudah digunakan.');
  groups.push({code,name,children:[]}); persistData(); return true;
}
function updateGroup(year,section,oldCode,payload){
  const groups=getGroups(year,section), g=groups.find(x=>x.code===oldCode);
  if(!g) throw new Error('Akun tidak ditemukan.');
  const code=String(payload.code||'').trim(), name=String(payload.name||'').trim();
  if(!code||!name) throw new Error('Kode dan nama akun wajib diisi.');
  if(code!==oldCode && groups.some(x=>x.code===code)) throw new Error('Kode akun sudah digunakan.');
  g.code=code; g.name=name; persistData(); return true;
}
function deleteGroup(year,section,code){
  const groups=getGroups(year,section), i=groups.findIndex(x=>x.code===code);
  if(i<0) throw new Error('Akun tidak ditemukan.');
  groups.splice(i,1); persistData(); return true;
}
function getGroup(year,section,groupCode){
  const g=getGroups(year,section).find(x=>x.code===groupCode);
  if(!g) throw new Error('Akun tidak ditemukan.');
  if(!Array.isArray(g.children)) g.children=[];
  return g;
}
function addLeaf(year,section,groupCode,payload){
  const g=getGroup(year,section,groupCode);
  const code=String(payload.code||'').trim(), name=String(payload.name||'').trim();
  if(!code||!name) throw new Error('Kode dan nama subakun wajib diisi.');
  if(g.children.some(x=>x.code===code)) throw new Error('Kode subakun sudah digunakan pada akun ini.');
  g.children.push({code,name,b:Number(payload.b)||0,r:Number(payload.r)||0}); persistData(); return true;
}
function updateLeaf(year,section,groupCode,oldCode,payload){
  const g=getGroup(year,section,groupCode), x=g.children.find(v=>v.code===oldCode);
  if(!x) throw new Error('Subakun tidak ditemukan.');
  const code=String(payload.code||'').trim(), name=String(payload.name||'').trim();
  if(!code||!name) throw new Error('Kode dan nama subakun wajib diisi.');
  if(code!==oldCode && g.children.some(v=>v.code===code)) throw new Error('Kode subakun sudah digunakan.');
  x.code=code; x.name=name; x.b=Number(payload.b)||0; x.r=Number(payload.r)||0; persistData(); return true;
}
function updateLeafAmounts(year,section,groupCode,leafCode,b,r){
  const g=getGroup(year,section,groupCode), x=g.children.find(v=>v.code===leafCode);
  if(!x) throw new Error('Subakun tidak ditemukan.');
  x.b=Number(b)||0; x.r=Number(r)||0; persistData(); return true;
}
function deleteLeaf(year,section,groupCode,leafCode){
  const g=getGroup(year,section,groupCode), i=g.children.findIndex(v=>v.code===leafCode);
  if(i<0) throw new Error('Subakun tidak ditemukan.');
  g.children.splice(i,1); persistData(); return true;
}

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

function budgetRows(year){
 return rowsForYear(year).filter(r=>!['SURPLUS / (DEFISIT)','SILPA/SiLPA TAHUN BERJALAN'].includes(r.name));
}
function renderBudgetSummary(year,target){
 const t=totals(year);
 const primary=[
  {name:'Total Pendapatan',value:t.pendapatan.b,note:'Rencana seluruh penerimaan desa pada tahun anggaran.'},
  {name:'Total Belanja',value:t.belanja.b,note:'Total rencana belanja yang dialokasikan ke bidang dan sub-bidang.'}
 ];
 const secondary=[
  {name:'Pembiayaan Netto',value:t.pembiayaan.b,tip:'Selisih antara penerimaan pembiayaan dan pengeluaran pembiayaan desa.',note:'Komponen pembiayaan, bukan pendapatan atau belanja rutin.'},
  {name:'SiLPA Rencana',value:t.silpa.b,tip:'Sisa Lebih Perhitungan Anggaran yang direncanakan pada akhir tahun anggaran.',note:'Nilai turunan setelah pendapatan, belanja, dan pembiayaan diperhitungkan.'}
 ];
 const card=(x,kind)=>'<article class="budget-summary-card '+kind+'"><small>'+esc(x.name)+(x.tip?' <span class="budget-info" tabindex="0" aria-label="Penjelasan '+esc(x.name)+'">i<span class="budget-info-tip">'+esc(x.tip)+'</span></span>':'')+'</small><b>'+rp(x.value)+'</b><em>'+esc(x.note)+'</em></article>';
 target.innerHTML='<div class="budget-summary-primary">'+primary.map(x=>card(x,'primary')).join('')+'</div><div class="budget-summary-secondary">'+secondary.map(x=>card(x,'secondary')).join('')+'</div>';
}
function renderBudgetTable(year,target){
 target.innerHTML=budgetRows(year).map(row=>{
  const cls=row.type==='chapter'?'level-0':row.type==='group'?'level-1':row.type==='total'?'total-row':row.type==='grand'?'grand-total':'';
  const indent=row.level===1?'indent-1':row.level===2?'indent-2':'';
  return '<tr class="'+cls+'"><td>'+row.code+'</td><td class="'+indent+'">'+row.name+'</td><td class="num">'+nf.format(row.b)+'</td></tr>';
 }).join('');
}
function renderBudgetBreakdown(year,pieTarget,legendTarget,options){
 if(!pieTarget&&!legendTarget)return;
 const section=options.section;
 const raw=(DATA[year]&&DATA[year][section])||[];
 const groups=raw.map(g=>({
   code:g.code,
   name:g.name,
   value:sumChildren(g,'b'),
   children:(g.children||[]).map(x=>({code:x.code,name:x.name,value:Number(x.b)||0}))
 })).filter(x=>x.value>0);
 const total=groups.reduce((s,x)=>s+x.value,0);
 const colors=options.colors||['#C62828','#F9A825','#1565C0','#2E7D32','#6A1B9A','#00838F','#EF6C00'];
 const root=(pieTarget||legendTarget).closest('.budget-allocation')||document;
 const tooltip=root.querySelector('[data-chart-tooltip]');
 const detail=root.querySelector('[data-chart-detail]');
 let selectedIndex=null, hoverIndex=null;

 const point=(r,a)=>{
   const rad=(a-90)*Math.PI/180;
   return {x:60+r*Math.cos(rad),y:60+r*Math.sin(rad)};
 };
 const segmentPath=(start,end)=>{
   const outer=54,inner=31.5,large=(end-start)>180?1:0;
   const os=point(outer,start),oe=point(outer,end),ie=point(inner,end),is=point(inner,start);
   return 'M '+os.x.toFixed(3)+' '+os.y.toFixed(3)+' A '+outer+' '+outer+' 0 '+large+' 1 '+oe.x.toFixed(3)+' '+oe.y.toFixed(3)+' L '+ie.x.toFixed(3)+' '+ie.y.toFixed(3)+' A '+inner+' '+inner+' 0 '+large+' 0 '+is.x.toFixed(3)+' '+is.y.toFixed(3)+' Z';
 };
 let cursor=0;
 const slices=groups.map((x,i)=>{
   const percent=total?x.value/total*100:0;
   const start=cursor*3.6,end=(cursor+percent)*3.6;
   cursor+=percent;
   return '<path class="budget-slice" data-chart-slice="'+i+'" tabindex="0" role="button" aria-label="'+esc(x.name)+', '+rp(x.value)+', '+percent.toFixed(2).replace('.',',')+' persen" d="'+segmentPath(start,end)+'" fill="'+colors[i%colors.length]+'" stroke="#fff" stroke-width="1.3"></path>';
 }).join('');

 if(pieTarget){
   pieTarget.innerHTML='<svg viewBox="0 0 120 120" role="img" aria-label="'+esc(options.chartAria)+' '+year+'">'+slices+'</svg><div class="budget-pie-center" data-chart-center><small>'+esc(options.totalLabel)+'</small><b>'+rpCompact(total)+'</b><span>100%</span></div>';
 }
 if(legendTarget){
   legendTarget.innerHTML=groups.map((x,i)=>{
     const p=total?x.value/total*100:0;
     const childRows=x.children.map(ch=>{
       const childPct=x.value?ch.value/x.value*100:0;
       return '<div class="budget-subitem"><div><b>'+esc(ch.name)+'</b><small>'+esc(ch.code)+' · '+childPct.toFixed(1).replace('.',',')+'% dari '+esc(options.childRelation)+'</small></div><strong>'+rp(ch.value)+'</strong></div>';
     }).join('');
     return '<article class="budget-allocation-row" data-chart-row="'+i+'"><button type="button" class="budget-allocation-head" data-chart-toggle="'+i+'" aria-expanded="false"><span class="budget-allocation-label"><span class="budget-legend-dot" style="background:'+colors[i%colors.length]+'"></span><span><b>'+esc(x.name)+'</b><small>'+esc(x.code)+'</small><span class="budget-expand-label">'+esc(options.expandLabel)+'</span></span></span><span class="budget-allocation-amount"><strong>'+rp(x.value)+'</strong><span>'+p.toFixed(2).replace('.',',')+'%</span></span></button><div class="budget-progress"><span style="width:'+Math.max(1,p).toFixed(2)+'%;background:'+colors[i%colors.length]+'"></span></div><div class="budget-subitems">'+childRows+'</div></article>';
   }).join('');
 }

 const center=root.querySelector('[data-chart-center]');
 const rows=[...root.querySelectorAll('[data-chart-row]')];
 const paths=[...root.querySelectorAll('[data-chart-slice]')];

 const infoFor=i=>{
   if(i==null||!groups[i]) return null;
   const x=groups[i],p=total?x.value/total*100:0;
   return {...x,p,color:colors[i%colors.length]};
 };
 const showState=i=>{
   const info=infoFor(i);
   paths.forEach((el,idx)=>{
     el.classList.toggle('is-active',idx===i);
     el.classList.toggle('is-dimmed',i!=null&&idx!==i);
   });
   rows.forEach((el,idx)=>{
     el.classList.toggle('is-active',idx===i);
     el.classList.toggle('is-dimmed',i!=null&&idx!==i);
   });
   if(center){
     center.innerHTML=info
       ? '<small>'+esc(info.name)+'</small><b>'+rpCompact(info.value)+'</b><span>'+info.p.toFixed(2).replace('.',',')+'%</span>'
       : '<small>'+esc(options.totalLabel)+'</small><b>'+rpCompact(total)+'</b><span>100%</span>';
   }
   if(detail){
     detail.innerHTML=info
       ? '<b>'+esc(info.name)+'</b><strong>'+rp(info.value)+'</strong><span>'+info.p.toFixed(2).replace('.',',')+'% dari '+esc(options.totalRelation)+' APBDesa '+year+'.</span>'
       : '<b>'+esc(options.detailTitle)+'</b><span>'+esc(options.detailEmpty)+'</span>';
   }
 };
 const current=()=>hoverIndex!=null?hoverIndex:selectedIndex;
 const setHover=i=>{hoverIndex=i;showState(current());};
 const clearHover=()=>{hoverIndex=null;showState(current());};
 const select=i=>{selectedIndex=selectedIndex===i?null:i;showState(current());};

 const showTooltip=(i,event)=>{
   if(!tooltip)return;
   const info=infoFor(i); if(!info)return;
   tooltip.innerHTML='<b>'+esc(info.name)+'</b><strong>'+rp(info.value)+'</strong><br><span>'+info.p.toFixed(2).replace('.',',')+'% dari '+esc(options.totalRelation)+'</span>';
   tooltip.hidden=false;
   const panel=tooltip.closest('.budget-chart-panel'),rect=panel?.getBoundingClientRect();
   if(rect&&event&&'clientX' in event){
     const maxX=Math.max(8,rect.width-238),maxY=Math.max(8,rect.height-90);
     tooltip.style.left=Math.min(maxX,Math.max(8,event.clientX-rect.left+12))+'px';
     tooltip.style.top=Math.min(maxY,Math.max(8,event.clientY-rect.top+12))+'px';
   }else{
     tooltip.style.left='50%';tooltip.style.top='12px';tooltip.style.transform='translateX(-50%)';
   }
 };
 const hideTooltip=()=>{if(tooltip){tooltip.hidden=true;tooltip.style.transform='';}};

 paths.forEach((el,i)=>{
   el.addEventListener('pointerenter',e=>{setHover(i);showTooltip(i,e);});
   el.addEventListener('pointermove',e=>showTooltip(i,e));
   el.addEventListener('pointerleave',()=>{clearHover();hideTooltip();});
   el.addEventListener('focus',()=>{setHover(i);showTooltip(i);});
   el.addEventListener('blur',()=>{clearHover();hideTooltip();});
   el.addEventListener('click',()=>select(i));
   el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i);}});
 });
 rows.forEach((row,i)=>{
   row.addEventListener('pointerenter',()=>setHover(i));
   row.addEventListener('pointerleave',clearHover);
 });
 root.querySelectorAll('[data-chart-toggle]').forEach((btn,i)=>{
   btn.addEventListener('focus',()=>setHover(i));
   btn.addEventListener('blur',clearHover);
   btn.addEventListener('click',()=>{
     const row=btn.closest('[data-chart-row]');
     const opening=!row.classList.contains('is-open');
     rows.forEach(r=>{
       if(r!==row){r.classList.remove('is-open');const b=r.querySelector('[data-chart-toggle]');if(b)b.setAttribute('aria-expanded','false');}
     });
     row.classList.toggle('is-open',opening);
     btn.setAttribute('aria-expanded',String(opening));
     selectedIndex=i;showState(current());
   });
 });
 showState(null);
}

function renderBudgetAllocation(year,pieTarget,legendTarget){
 renderBudgetBreakdown(year,pieTarget,legendTarget,{
  section:'expense',
  totalLabel:'Total Belanja',
  totalRelation:'total belanja',
  childRelation:'bidang',
  chartAria:'Diagram interaktif alokasi belanja APBDesa',
  expandLabel:'Lihat sub-bidang',
  detailTitle:'Detail alokasi',
  detailEmpty:'Arahkan kursor atau klik bagian chart untuk melihat nama akun, nominal, dan persentase.',
  colors:['#C62828','#F9A825','#1565C0','#2E7D32','#6A1B9A','#00838F','#EF6C00']
 });
}

function renderIncomeAllocation(year,pieTarget,legendTarget){
 renderBudgetBreakdown(year,pieTarget,legendTarget,{
  section:'income',
  totalLabel:'Total Pendapatan',
  totalRelation:'total pendapatan',
  childRelation:'akun pendapatan',
  chartAria:'Diagram interaktif komposisi pendapatan APBDesa',
  expandLabel:'Lihat rincian sumber',
  detailTitle:'Detail pendapatan',
  detailEmpty:'Arahkan kursor atau klik bagian chart untuk melihat sumber pendapatan, nominal, dan persentase.',
  colors:['#1565C0','#2E7D32','#F9A825','#6A1B9A','#00838F','#EF6C00','#C62828']
 });
}
function renderBudgetView(year){
 const select=document.querySelector('[data-budget-view-select]');
 const pie=document.querySelector('[data-budget-view-pie]');
 const legend=document.querySelector('[data-budget-view-legend]');
 if(!pie&&!legend)return;
 const view=select?.value||'income';
 const kicker=document.querySelector('[data-budget-view-kicker]');
 const title=document.querySelector('[data-budget-view-title]');
 const description=document.querySelector('[data-budget-view-description]');
 const sideTitle=document.querySelector('[data-budget-side-title]');
 const sideDescription=document.querySelector('[data-budget-side-description]');
 if(view==='expense'){
   if(kicker)kicker.textContent='BELANJA';
   if(title)title.textContent='Alokasi Belanja';
   if(description)description.textContent='Ke mana anggaran desa dialokasikan dan berapa porsi setiap bidang belanja.';
   if(sideTitle)sideTitle.textContent='Bidang Belanja';
   if(sideDescription)sideDescription.textContent='Setiap bidang dibandingkan terhadap total belanja. Klik bidang untuk membuka rincian sub-bidangnya.';
   renderBudgetAllocation(year,pie,legend);
 }else{
   if(kicker)kicker.textContent='PENDAPATAN';
   if(title)title.textContent='Komposisi Pendapatan';
   if(description)description.textContent='Dari mana anggaran desa berasal dan berapa kontribusi tiap sumber pendapatan.';
   if(sideTitle)sideTitle.textContent='Sumber Pendapatan';
   if(sideDescription)sideDescription.textContent='Setiap akun dibandingkan terhadap total pendapatan. Klik akun untuk membuka rincian sumber di bawahnya.';
   renderIncomeAllocation(year,pie,legend);
 }
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
 target.innerHTML=`<div class="demo-poster"><div class="demo-poster-head"><b>DESA KENDALBULUR</b><span>APBDesa ${year}</span></div><div class="demo-poster-grid"><div><h4>PENDAPATAN</h4><strong>${rp(t.pendapatan.b)}</strong><p>Rencana pendapatan desa</p></div><div><h4>BELANJA</h4><strong>${rp(t.belanja.b)}</strong><p>Rencana alokasi belanja</p></div><div><h4>PEMBIAYAAN NETTO</h4><strong>${rp(t.pembiayaan.b)}</strong><p>Selisih penerimaan & pengeluaran pembiayaan</p></div></div><div class="demo-watermark">DATA DEMO UNTUK PROTOTYPE - BUKAN DATA RESMI</div></div>`;
}
function setYear(year){
 document.querySelectorAll('[data-year-btn]').forEach(b=>b.classList.toggle('active',Number(b.dataset.yearBtn)===year));
 document.querySelectorAll('[data-year-label]').forEach(x=>x.textContent=year);
 const tb=document.querySelector('[data-financial-body]'); if(tb) renderTable(year,tb);
 const pg=document.querySelector('[data-progress-grid]'); if(pg) renderProgress(year,pg);
 const mt=document.querySelector('[data-metrics]'); if(mt) renderMetrics(year,mt);
 const po=document.querySelector('[data-poster]'); if(po) poster(year,po);
 const bs=document.querySelector('[data-budget-summary]'); if(bs) renderBudgetSummary(year,bs);
 const bt=document.querySelector('[data-budget-table]'); if(bt) renderBudgetTable(year,bt);
 renderBudgetView(year);
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
 const viewSelect=document.querySelector('[data-budget-view-select]');
 if(viewSelect)viewSelect.addEventListener('change',()=>renderBudgetView(window.KB_FINANCIAL_YEAR||2026));
 setYear(2026);
}
window.KBFinancial={
 get DATA(){return DATA;},
 SEED_DATA,rowsForYear,totals,setYear,downloadPdf,persistData,resetData,listGroups,
 addGroup,updateGroup,deleteGroup,addLeaf,updateLeaf,updateLeafAmounts,deleteLeaf
};
document.addEventListener('DOMContentLoaded',init);
})();