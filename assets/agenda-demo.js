(() => {
const EVENTS=[
 {id:'pawai-2026',start:'2026-08-09T07:00:00+07:00',end:'2026-08-09T10:00:00+07:00',title:'Pawai Kebudayaan Tahun 2026',place:'Desa Kendalbulur',category:'Kebudayaan',description:'Pawai kebudayaan desa yang menampilkan partisipasi warga dan unsur seni budaya Kendalbulur.',demo:false},
 {id:'ntg-8',start:'2026-09-16T18:30:00+07:00',end:'2026-09-16T21:30:00+07:00',title:'Night Traditional Games Volume 8',place:'Kendalbulur',category:'Forum Anak / Budaya',description:'Kegiatan permainan tradisional untuk menghidupkan kembali interaksi anak dan budaya lokal.',demo:false},
 {id:'sinden-anak',start:'2026-09-17T19:00:00+07:00',end:'2026-09-17T22:00:00+07:00',title:'Gebyakan Sinden Anak Kendalbulur',place:'Desa Kendalbulur',category:'Kebudayaan',description:'Pentas dan ruang regenerasi seni sinden anak sebagai bagian dari pelestarian budaya desa.',demo:false},
 {id:'musdes-rkp',start:'2026-09-25T09:00:00+07:00',end:'2026-09-25T12:00:00+07:00',title:'Musyawarah Desa Penyusunan RKP Desa Tahun 2027',place:'Balai Desa Kendalbulur',category:'Pemerintahan',description:'Musyawarah desa untuk membahas arah dan prioritas rencana kerja Pemerintah Desa tahun berikutnya.',demo:false},
 {id:'panen-tembakau',start:'2026-09-26T08:00:00+07:00',end:'2026-09-26T11:00:00+07:00',title:'Hari Tani Nasional - Panen Raya Tembakau',place:'Wilayah pertanian Kendalbulur',category:'Pertanian',description:'Panen raya tembakau sekaligus momentum apresiasi petani dan potensi komoditas lokal Kendalbulur.',demo:false},
 {id:'lelang-tkd',start:'2026-10-11T09:00:00+07:00',end:'2026-10-11T12:00:00+07:00',title:'Lelang Tanah Kas Desa',place:'Balai Desa Kendalbulur',category:'Pemerintahan',description:'Agenda lelang pengelolaan Tanah Kas Desa sesuai mekanisme dan ketentuan Pemerintah Desa.',demo:false},
 {id:'tebar-ikan',start:'2026-10-15T08:30:00+07:00',end:'2026-10-15T10:30:00+07:00',title:'Tebar 6.000 Benih Ikan di Sungai Parit Agung',place:'Sungai Parit Agung',category:'Lingkungan / Perikanan',description:'Kegiatan pelestarian ekosistem sungai melalui penebaran 6.000 benih ikan di Sungai Parit Agung.',demo:false},
 {id:'prototype-web',start:'2026-10-22T10:00:00+07:00',end:'2026-10-22T12:00:00+07:00',title:'Presentasi Prototype Website Desa',place:'Balai Desa Kendalbulur',category:'Digitalisasi Desa',description:'Presentasi prototype pengembangan website desa kepada operator untuk memperoleh masukan sebelum implementasi lebih lanjut.',demo:true},
 {id:'evaluasi-digital',start:'2026-11-05T09:30:00+07:00',end:'2026-11-05T11:30:00+07:00',title:'Rapat Evaluasi Pelayanan Digital',place:'Balai Desa Kendalbulur',category:'Digitalisasi Desa',description:'Agenda demo untuk menunjukkan bagaimana kegiatan mendatang ditampilkan dan difilter di kalender.',demo:true},
 {id:'pelatihan-konten',start:'2026-11-20T13:00:00+07:00',end:'2026-11-20T16:00:00+07:00',title:'Pelatihan Pengelolaan Konten Website',place:'Ruang Pelayanan Desa',category:'Pelatihan',description:'Agenda demo pelatihan operator terkait pengelolaan berita, agenda, regulasi, dan konten layanan pada website desa.',demo:true}
];

const MONTHS=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const SHORT=['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGU','SEP','OKT','NOV','DES'];
const DAYS=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sab'];
const now=()=>new Date();
let cursor=new Date();
let statusFilter='all';

function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function eventStatus(e){
 const n=now().getTime(),s=new Date(e.start).getTime(),end=new Date(e.end).getTime();
 if(n<s)return 'upcoming';
 if(n>end)return 'done';
 return 'active';
}
function statusLabel(s){return s==='done'?'Selesai':s==='active'?'Sedang berlangsung':'Mendatang'}
function fmtDateTime(iso){
 const d=new Date(iso);
 return DAYS[d.getDay()]+', '+String(d.getDate()).padStart(2,'0')+' '+MONTHS[d.getMonth()]+' '+d.getFullYear()+' · '+String(d.getHours()).padStart(2,'0')+'.'+String(d.getMinutes()).padStart(2,'0')+' WIB';
}
function eventsForMonth(){
 return EVENTS.filter(e=>{
   const d=new Date(e.start);
   return d.getFullYear()===cursor.getFullYear()&&d.getMonth()===cursor.getMonth()&&(statusFilter==='all'||eventStatus(e)===statusFilter);
 });
}
function syncPicker(){
 const m=document.querySelector('[data-agenda-month]'),y=document.querySelector('[data-agenda-year]');
 if(m)m.value=String(cursor.getMonth());
 if(y)y.value=String(cursor.getFullYear());
 const title=document.querySelector('[data-cal-title]');
 if(title)title.textContent=MONTHS[cursor.getMonth()]+' '+cursor.getFullYear();
}
function setupPickers(){
 const month=document.querySelector('[data-agenda-month]');
 const year=document.querySelector('[data-agenda-year]');
 if(month){
   month.innerHTML=MONTHS.map((m,i)=>'<option value="'+i+'">'+m+'</option>').join('');
 }
 if(year){
   const eventYears=EVENTS.map(e=>new Date(e.start).getFullYear());
   const currentYear=now().getFullYear();
   const min=Math.min(currentYear-1,...eventYears),max=Math.max(currentYear+2,...eventYears);
   year.innerHTML=Array.from({length:max-min+1},(_,i)=>min+i).map(y=>'<option value="'+y+'">'+y+'</option>').join('');
 }
 syncPicker();
}
function renderCalendar(){
 const grid=document.querySelector('[data-cal-grid]');
 if(!grid)return;
 syncPicker();
 const y=cursor.getFullYear(),m=cursor.getMonth(),first=new Date(y,m,1),days=new Date(y,m+1,0).getDate();
 const start=(first.getDay()+6)%7;
 const headers=['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
 const selectedEvents=eventsForMonth();
 let html=headers.map(h=>'<div class="calendar-cell header">'+h+'</div>').join('');
 const prevDays=new Date(y,m,0).getDate();
 for(let i=0;i<42;i++){
   let day=i-start+1,yy=y,mm=m,muted=false;
   if(day<1){day=prevDays+day;mm=m-1;muted=true;if(mm<0){mm=11;yy--}}
   else if(day>days){day-=days;mm=m+1;muted=true;if(mm>11){mm=0;yy++}}
   const key=yy+'-'+String(mm+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
   const es=selectedEvents.filter(e=>e.start.slice(0,10)===key);
   html+='<div class="calendar-cell '+(muted?'muted':'')+'"><div class="calendar-day">'+day+'</div>'+es.map(e=>{
     const st=eventStatus(e);
     return '<button class="calendar-event status-'+st+(e.demo?' demo':'')+'" data-event-id="'+e.id+'">'+esc(e.title)+'</button>';
   }).join('')+'</div>';
 }
 grid.innerHTML=html;
 grid.querySelectorAll('[data-event-id]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.eventId)));
}
function renderHistory(){
 const box=document.querySelector('[data-history]');
 if(!box)return;
 const items=eventsForMonth().sort((a,b)=>b.start.localeCompare(a.start));
 if(!items.length){
   box.innerHTML='<div class="directory-empty">Tidak ada agenda yang cocok dengan bulan/tahun/status yang dipilih.</div>';
   return;
 }
 box.innerHTML=items.map(e=>{
   const d=new Date(e.start),st=eventStatus(e);
   return '<article class="history-item" data-event-id="'+e.id+'" tabindex="0" role="button"><div class="history-date"><b>'+String(d.getDate()).padStart(2,'0')+'</b>'+SHORT[d.getMonth()]+' '+d.getFullYear()+'</div><div><h3>'+esc(e.title)+(e.demo?' <span class="demo-badge">DEMO</span>':'')+'</h3><p>'+String(d.getHours()).padStart(2,'0')+'.'+String(d.getMinutes()).padStart(2,'0')+' WIB · '+esc(e.place)+'</p></div><span class="status-pill '+st+'">'+statusLabel(st)+'</span></article>';
 }).join('');
 box.querySelectorAll('[data-event-id]').forEach(el=>{
   const open=()=>openModal(el.dataset.eventId);
   el.addEventListener('click',open);
   el.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();open()}});
 });
}
function renderAll(){renderCalendar();renderHistory()}
function openModal(id){
 const e=EVENTS.find(x=>x.id===id);
 const modal=document.querySelector('[data-agenda-modal]');
 if(!e||!modal)return;
 const st=eventStatus(e);
 modal.querySelector('[data-modal-status]').textContent=statusLabel(st);
 modal.querySelector('[data-modal-status]').className='agenda-modal-status '+st;
 modal.querySelector('[data-modal-title]').textContent=e.title;
 modal.querySelector('[data-modal-start]').textContent=fmtDateTime(e.start);
 modal.querySelector('[data-modal-end]').textContent=fmtDateTime(e.end);
 modal.querySelector('[data-modal-place]').textContent=e.place;
 modal.querySelector('[data-modal-category]').textContent=e.category+(e.demo?' · DEMO':'');
 modal.querySelector('[data-modal-description]').textContent=e.description;
 modal.classList.add('open');
 modal.setAttribute('aria-hidden','false');
 document.body.style.overflow='hidden';
 modal.querySelector('[data-agenda-close]')?.focus();
}
function closeModal(){
 const modal=document.querySelector('[data-agenda-modal]');
 if(!modal)return;
 modal.classList.remove('open');
 modal.setAttribute('aria-hidden','true');
 document.body.style.overflow='';
}

document.addEventListener('DOMContentLoaded',()=>{
 cursor=new Date(now().getFullYear(),now().getMonth(),1);
 setupPickers();
 renderAll();

 document.querySelector('[data-cal-prev]')?.addEventListener('click',()=>{cursor=new Date(cursor.getFullYear(),cursor.getMonth()-1,1);renderAll()});
 document.querySelector('[data-cal-next]')?.addEventListener('click',()=>{cursor=new Date(cursor.getFullYear(),cursor.getMonth()+1,1);renderAll()});
 document.querySelector('[data-cal-today]')?.addEventListener('click',()=>{const d=now();cursor=new Date(d.getFullYear(),d.getMonth(),1);renderAll()});
 document.querySelector('[data-agenda-month]')?.addEventListener('change',e=>{cursor=new Date(cursor.getFullYear(),Number(e.target.value),1);renderAll()});
 document.querySelector('[data-agenda-year]')?.addEventListener('change',e=>{cursor=new Date(Number(e.target.value),cursor.getMonth(),1);renderAll()});
 document.querySelector('[data-agenda-status]')?.addEventListener('change',e=>{statusFilter=e.target.value;renderAll()});

 document.querySelectorAll('[data-agenda-view]').forEach(b=>b.addEventListener('click',()=>{
   document.querySelectorAll('[data-agenda-view]').forEach(x=>x.classList.toggle('active',x===b));
   const isCal=b.dataset.agendaView==='calendar';
   document.querySelector('[data-calendar-section]').style.display=isCal?'block':'none';
   document.querySelector('[data-history-section]').style.display=isCal?'none':'block';
 }));

 document.querySelectorAll('[data-agenda-close]').forEach(b=>b.addEventListener('click',closeModal));
 document.querySelector('[data-agenda-modal]')?.addEventListener('click',e=>{if(e.target.matches('[data-agenda-modal]'))closeModal()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
});
})();