document.addEventListener('DOMContentLoaded',()=>{
  const track=document.querySelector('[data-gov-track]');
  document.querySelector('[data-gov-prev]')?.addEventListener('click',()=>track?.scrollBy({left:-470,behavior:'smooth'}));
  document.querySelector('[data-gov-next]')?.addEventListener('click',()=>track?.scrollBy({left:470,behavior:'smooth'}));

  /* Data warga: final value remains visible even if animation is unavailable. */
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease=t=>1-Math.pow(1-t,3);
  const idNumber=new Intl.NumberFormat('id-ID');

  function animateNumber(el,target,duration=1100,pad=0){
    if(prefersReduced){
      el.textContent=pad?String(target).padStart(pad,'0'):idNumber.format(target);
      return;
    }
    const start=performance.now();
    el.textContent=pad?'0'.padStart(pad,'0'):'0';
    function frame(now){
      const p=Math.min(1,(now-start)/duration);
      const value=Math.round(target*ease(p));
      el.textContent=pad?String(value).padStart(pad,'0'):idNumber.format(value);
      if(p<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function animatePair(el,a,b,duration=1100){
    if(prefersReduced){
      el.textContent=String(a).padStart(2,'0')+'/'+String(b).padStart(2,'0');
      return;
    }
    const start=performance.now();
    el.textContent='00/00';
    function frame(now){
      const p=Math.min(1,(now-start)/duration),e=ease(p);
      el.textContent=String(Math.round(a*e)).padStart(2,'0')+'/'+String(Math.round(b*e)).padStart(2,'0');
      if(p<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const stats=document.querySelector('.stats-grid');
  if(stats){
    let ran=false;
    const run=()=>{
      if(ran)return;
      ran=true;
      stats.querySelectorAll('[data-count]').forEach(el=>animateNumber(el,Number(el.dataset.count),1100,Number(el.dataset.pad||0)));
      stats.querySelectorAll('[data-count-pair]').forEach(el=>{
        const [a,b]=el.dataset.countPair.split('/').map(Number);
        animatePair(el,a,b,1100);
      });
    };
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>{
        if(entries.some(e=>e.isIntersecting)){
          run();
          io.disconnect();
        }
      },{threshold:.2});
      io.observe(stats);
      /* Safety fallback: never leave final values at zero if observer behaves oddly. */
      setTimeout(()=>{if(!ran)run()},1600);
    } else {
      run();
    }
  }

  /* Beranda agenda automatically follows the visitor's current month/year. */
  const MONTHS=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const SHORT=['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGU','SEP','OKT','NOV','DES'];
  const EVENTS=[
    {date:'2026-08-09',title:'Pawai Kebudayaan Tahun 2026'},
    {date:'2026-09-15',title:'Gebyakan Sinden Anak Kendalbulur'},
    {date:'2026-09-22',title:'Musyawarah Desa Penyusunan RKP Desa Tahun 2027'},
    {date:'2026-09-25',title:'Panen Raya Tembakau - Hari Tani Nasional'},
    {date:'2026-10-11',title:'Lelang Tanah Kas Desa'},
    {date:'2026-10-14',title:'Tebar 6.000 Benih Ikan di Sungai Parit Agung'},
    {date:'2026-10-18',title:'Genduri Pendirian Omah Joglo di Punden Beji'},
    {date:'2026-11-05',title:'Rapat Evaluasi Pelayanan Digital',demo:true},
    {date:'2026-11-20',title:'Pelatihan Pengelolaan Konten Website',demo:true}
  ];

  const agendaBox=document.querySelector('[data-home-agenda]');
  if(agendaBox){
    const now=new Date();
    const year=now.getFullYear(),month=now.getMonth();
    const items=EVENTS.filter(e=>{
      const d=new Date(e.date+'T00:00:00');
      return d.getFullYear()===year&&d.getMonth()===month;
    }).sort((a,b)=>a.date.localeCompare(b.date));
    const label=document.querySelector('[data-home-agenda-month]');
    if(label) label.textContent=MONTHS[month]+' '+year;

    if(!items.length){
      agendaBox.innerHTML='<div class="home-agenda-empty">Belum ada agenda yang tercatat untuk '+MONTHS[month]+' '+year+'.</div>';
    }else{
      agendaBox.innerHTML=items.map(e=>{
        const d=new Date(e.date+'T00:00:00');
        return '<div class="agenda-item"><div class="agenda-date"><b>'+String(d.getDate()).padStart(2,'0')+'</b><small>'+SHORT[d.getMonth()]+'</small></div><div><strong>'+e.title+'</strong>'+(e.demo?'<div><span class="demo-badge" style="margin-top:5px">DEMO</span></div>':'')+'</div></div>';
      }).join('');
    }
  }
});