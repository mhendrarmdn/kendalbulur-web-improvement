document.addEventListener('DOMContentLoaded',()=>{
 const DATA=[{"type":"RW","no":"01","name":"Lamine Yamal","dusun":"Kendalbulur","rw":"01"},{"type":"RW","no":"02","name":"Pedri","dusun":"Kendalbulur","rw":"02"},{"type":"RW","no":"03","name":"Gavi","dusun":"Genting","rw":"03"},{"type":"RW","no":"04","name":"Raphinha","dusun":"Rongganan","rw":"04"},{"type":"RW","no":"05","name":"Frenkie de Jong","dusun":"Genting","rw":"05"},{"type":"RW","no":"06","name":"Robert Lewandowski","dusun":"Rongganan","rw":"06"},{"type":"RW","no":"07","name":"Marc-André ter Stegen","dusun":"Kendalbulur","rw":"07"},{"type":"RT","no":"01","name":"Ronald Araújo","dusun":"Kendalbulur","rw":"01"},{"type":"RT","no":"02","name":"Jules Koundé","dusun":"Kendalbulur","rw":"01"},{"type":"RT","no":"03","name":"Pau Cubarsí","dusun":"Kendalbulur","rw":"01"},{"type":"RT","no":"04","name":"Dani Olmo","dusun":"Kendalbulur","rw":"02"},{"type":"RT","no":"05","name":"Fermín López","dusun":"Kendalbulur","rw":"02"},{"type":"RT","no":"06","name":"Ferran Torres","dusun":"Kendalbulur","rw":"02"},{"type":"RT","no":"07","name":"Alejandro Balde","dusun":"Genting","rw":"03"},{"type":"RT","no":"08","name":"Gerard Piqué","dusun":"Genting","rw":"03"},{"type":"RT","no":"09","name":"Sergio Busquets","dusun":"Genting","rw":"03"},{"type":"RT","no":"10","name":"Jordi Alba","dusun":"Rongganan","rw":"04"},{"type":"RT","no":"11","name":"Xavi Hernández","dusun":"Rongganan","rw":"04"},{"type":"RT","no":"12","name":"Andrés Iniesta","dusun":"Rongganan","rw":"04"},{"type":"RT","no":"13","name":"Lionel Messi","dusun":"Genting","rw":"05"},{"type":"RT","no":"14","name":"Neymar Jr.","dusun":"Genting","rw":"05"},{"type":"RT","no":"15","name":"Luis Suárez","dusun":"Genting","rw":"05"},{"type":"RT","no":"16","name":"Dani Alves","dusun":"Rongganan","rw":"06"},{"type":"RT","no":"17","name":"Ronaldinho","dusun":"Rongganan","rw":"06"},{"type":"RT","no":"18","name":"Carles Puyol","dusun":"Rongganan","rw":"06"},{"type":"RT","no":"19","name":"Deco","dusun":"Kendalbulur","rw":"07"},{"type":"RT","no":"20","name":"Samuel Eto'o","dusun":"Kendalbulur","rw":"07"},{"type":"RT","no":"21","name":"Thierry Henry","dusun":"Kendalbulur","rw":"07"},{"type":"RT","no":"22","name":"Sergi Roberto","dusun":"Kendalbulur","rw":"07"}];
 const gridRW=document.querySelector('[data-rw-grid]');
 const gridRT=document.querySelector('[data-rt-grid]');
 const sectionRW=document.querySelector('[data-rw-section]');
 const sectionRT=document.querySelector('[data-rt-section]');
 const input=document.querySelector('[data-directory-search]');
 const dusun=document.querySelector('[data-directory-dusun]');
 const rw=document.querySelector('[data-directory-rw]');
 const type=document.querySelector('[data-directory-type]');
 const count=document.querySelector('[data-directory-count]');

 function phone(i){return '0812-'+String(4100+i).padStart(4,'0')+'-'+String(7200+i*7).padStart(4,'0')}
 function card(p,i){
   const code=p.type+' '+p.no;
   const role=p.type==='RW'?'Ketua RW '+p.no:'Ketua RT '+p.no+' / RW '+p.rw;
   const address='Dusun '+p.dusun+', '+(p.type==='RT'?'RT '+p.no+', RW '+p.rw:'RW '+p.rw)+', Desa Kendalbulur';
   const img='https://api.dicebear.com/9.x/personas/svg?seed='+encodeURIComponent(p.name);
   return '<article class="demo-person-card flip-card" data-type="'+p.type+'" data-dusun="'+p.dusun+'" data-rw="'+p.rw+'" data-search="'+(p.name+' '+code+' '+address).toLowerCase()+'"><div class="flip-inner"><div class="flip-face"><img class="demo-person-photo" src="'+img+'" alt="Avatar demo '+p.name+'"><div class="demo-person-role">'+code+(p.type==='RT'?' · RW '+p.rw:'')+'</div><div class="demo-person-name">'+p.name+'</div><div class="demo-person-meta">Dusun '+p.dusun+'<br>Klik / sentuh untuk detail</div></div><div class="flip-face flip-back"><h3>'+p.name+'</h3><p><b>Jabatan:</b> '+role+'</p><p><b>Alamat demo:</b> '+address+'</p><p><b>Kontak demo:</b> '+phone(i)+'</p><p><b>Status:</b> DATA DEMO - ganti dengan data operator sebelum publikasi.</p></div></div></article>';
 }

 function render(){
   const q=(input.value||'').trim().toLowerCase();
   const d=dusun.value,r=rw.value,t=type.value;
   const filtered=DATA.filter(p=>
     (!q||(p.name+' '+p.type+' '+p.no+' '+p.dusun+' '+p.rw).toLowerCase().includes(q)) &&
     (d==='all'||p.dusun===d) &&
     (r==='all'||p.rw===r) &&
     (t==='all'||p.type===t)
   );
   const a=filtered.filter(p=>p.type==='RW'),b=filtered.filter(p=>p.type==='RT');
   gridRW.innerHTML=a.length?a.map((p,i)=>card(p,DATA.indexOf(p))).join(''):'<div class="directory-empty">Tidak ada RW yang cocok dengan filter.</div>';
   gridRT.innerHTML=b.length?b.map((p,i)=>card(p,DATA.indexOf(p))).join(''):'<div class="directory-empty">Tidak ada RT yang cocok dengan filter.</div>';
   sectionRW.hidden=t==='RT';
   sectionRT.hidden=t==='RW';
   count.textContent=filtered.length+' profil ditampilkan';
   document.querySelectorAll('.demo-person-card').forEach(x=>x.addEventListener('click',()=>x.classList.toggle('flipped')));
 }
 [input,dusun,rw,type].forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',render));
 render();
});