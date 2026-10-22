(() => {
const EVENTS=[
 {date:'2026-08-09',title:'Pawai Kebudayaan Tahun 2026',time:'07.00',place:'Desa Kendalbulur',status:'done',demo:false},
 {date:'2026-09-16',title:'Night Traditional Games Volume 8',time:'18.30',place:'Kendalbulur',status:'done',demo:false},
 {date:'2026-09-17',title:'Gebyakan Sinden Anak Kendalbulur',time:'19.00',place:'Desa Kendalbulur',status:'done',demo:false},
 {date:'2026-09-25',title:'Musyawarah Desa Penyusunan RKP Desa Tahun 2027',time:'09.00',place:'Balai Desa Kendalbulur',status:'done',demo:false},
 {date:'2026-09-26',title:'Hari Tani Nasional - Panen Raya Tembakau',time:'08.00',place:'Wilayah pertanian Kendalbulur',status:'done',demo:false},
 {date:'2026-10-11',title:'Lelang Tanah Kas Desa',time:'09.00',place:'Balai Desa Kendalbulur',status:'done',demo:false},
 {date:'2026-10-15',title:'Tebar 6.000 Benih Ikan di Sungai Parit Agung',time:'08.30',place:'Sungai Parit Agung',status:'done',demo:false},
 {date:'2026-10-22',title:'Presentasi Prototype Website Desa',time:'10.00',place:'Balai Desa Kendalbulur',status:'upcoming',demo:true},
 {date:'2026-11-05',title:'Rapat Evaluasi Pelayanan Digital',time:'09.30',place:'Balai Desa Kendalbulur',status:'upcoming',demo:true},
 {date:'2026-11-20',title:'Pelatihan Pengelolaan Konten Website',time:'13.00',place:'Ruang Pelayanan Desa',status:'upcoming',demo:true}
];
const MONTHS=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
let cursor=new Date(2026,9,1);
function esc(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function renderCalendar(){
 const title=document.querySelector('[data-cal-title]'), grid=document.querySelector('[data-cal-grid]');
 if(!title||!grid)return;
 title.textContent=MONTHS[cursor.getMonth()]+' '+cursor.getFullYear();
 const y=cursor.getFullYear(),m=cursor.getMonth(),first=new Date(y,m,1),days=new Date(y,m+1,0).getDate();
 const start=(first.getDay()+6)%7; const headers=['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
 let html=headers.map(h=>'<div class="calendar-cell header">'+h+'</div>').join('');
 const prevDays=new Date(y,m,0).getDate();
 for(let i=0;i<42;i++){
   let day=i-start+1, yy=y, mm=m, muted=false;
   if(day<1){day=prevDays+day;mm=m-1;muted=true;if(mm<0){mm=11;yy--}}
   else if(day>days){day-=days;mm=m+1;muted=true;if(mm>11){mm=0;yy++}}
   const key=yy+'-'+String(mm+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
   const es=EVENTS.filter(e=>e.date===key);
   html+='<div class="calendar-cell '+(muted?'muted':'')+'"><div class="calendar-day">'+day+'</div>'+es.map(e=>'<button class="calendar-event '+(e.demo?'demo':'')+'" data-event-date="'+e.date+'">'+esc(e.title)+'</button>').join('')+'</div>';
 }
 grid.innerHTML=html;
 grid.querySelectorAll('[data-event-date]').forEach(b=>b.addEventListener('click',()=>showEvent(b.dataset.eventDate,b.textContent)));
}
function renderHistory(){
 const box=document.querySelector('[data-history]'); if(!box)return;
 const items=[...EVENTS].sort((a,b)=>b.date.localeCompare(a.date));
 box.innerHTML=items.map(e=>{
  const d=new Date(e.date+'T00:00:00'),mon=MONTHS[d.getMonth()].slice(0,3).toUpperCase();
  return '<article class="history-item"><div class="history-date"><b>'+String(d.getDate()).padStart(2,'0')+'</b>'+mon+' '+d.getFullYear()+'</div><div><h3>'+esc(e.title)+(e.demo?' <span class="demo-badge">DEMO</span>':'')+'</h3><p>'+e.time+' WIB · '+esc(e.place)+'</p></div><span class="status-pill '+e.status+'">'+(e.status==='done'?'Selesai':'Mendatang')+'</span></article>';
 }).join('');
}
function showEvent(date,title){const e=EVENTS.find(x=>x.date===date&&x.title===title)||EVENTS.find(x=>x.date===date);if(!e)return;alert(e.title+'\n'+e.date+' · '+e.time+' WIB\n'+e.place+(e.demo?'\n\nDATA DEMO PROTOTYPE':''));
}
document.addEventListener('DOMContentLoaded',()=>{
 renderCalendar();renderHistory();
 document.querySelector('[data-cal-prev]')?.addEventListener('click',()=>{cursor=new Date(cursor.getFullYear(),cursor.getMonth()-1,1);renderCalendar()});
 document.querySelector('[data-cal-next]')?.addEventListener('click',()=>{cursor=new Date(cursor.getFullYear(),cursor.getMonth()+1,1);renderCalendar()});
 document.querySelector('[data-cal-today]')?.addEventListener('click',()=>{cursor=new Date(2026,9,1);renderCalendar()});
 document.querySelectorAll('[data-agenda-view]').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('[data-agenda-view]').forEach(x=>x.classList.toggle('active',x===b));
  const isCal=b.dataset.agendaView==='calendar';
  document.querySelector('[data-calendar-section]').style.display=isCal?'block':'none';
  document.querySelector('[data-history-section]').style.display=isCal?'none':'block';
 }));
});
})();