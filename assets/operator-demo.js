(() => {
const q=s=>document.querySelector(s), nf=new Intl.NumberFormat('id-ID');
let year=2026, section='income', selectedGroup='';
const api=()=>window.KBFinancial;

function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function money(v){return 'Rp '+nf.format(Number(v)||0);}
function groups(){return api().listGroups(year,section);}
function rerender(){
 const gs=groups();
 if(!gs.some(g=>g.code===selectedGroup)) selectedGroup=gs[0]?.code||'';
 q('[data-group-body]').innerHTML=gs.map(g=>'<tr><td><code>'+esc(g.code)+'</code></td><td>'+esc(g.name)+'</td><td>'+g.children.length+'</td><td><div class="operator-actions"><button class="button-secondary" data-edit-group="'+esc(g.code)+'">Edit</button><button class="button-danger" data-delete-group="'+esc(g.code)+'">Hapus</button></div></td></tr>').join('')||'<tr><td colspan="4">Belum ada akun.</td></tr>';
 const sel=q('[data-group-select]');
 sel.innerHTML=gs.map(g=>'<option value="'+esc(g.code)+'">'+esc(g.code)+' — '+esc(g.name)+'</option>').join('');
 sel.value=selectedGroup;
 const g=gs.find(x=>x.code===selectedGroup);
 q('[data-leaf-body]').innerHTML=(g?.children||[]).map(x=>'<tr><td><code>'+esc(x.code)+'</code></td><td>'+esc(x.name)+'</td><td class="num">'+money(x.b)+'</td><td class="num">'+money(x.r)+'</td><td><div class="operator-actions"><button class="button-secondary" data-edit-leaf="'+esc(x.code)+'">Edit</button><button class="button-danger" data-delete-leaf="'+esc(x.code)+'">Hapus</button></div></td></tr>').join('')||'<tr><td colspan="5">Pilih akun lalu tambahkan subakun.</td></tr>';
 const t=api().totals(year);
 q('[data-op-metrics]').innerHTML=[
  ['Total Pendapatan',t.pendapatan],['Total Belanja',t.belanja],['Pembiayaan Netto',t.pembiayaan],['SiLPA',t.silpa]
 ].map(([n,x])=>'<div class="dash-card"><small>'+n+'</small><b>'+money(x.b)+'</b><em>Realisasi '+money(x.r)+'</em></div>').join('');
 bindRows();
}
function fieldsHtml(values={},leaf=false){
 return '<div class="operator-field"><label>Kode '+(leaf?'subakun':'akun')+'</label><input name="code" required value="'+esc(values.code||'')+'" placeholder="'+(leaf?'5.2.9':'5.6')+'"></div>'+
 '<div class="operator-field"><label>Nama '+(leaf?'subakun':'akun')+'</label><input name="name" required value="'+esc(values.name||'')+'" placeholder="Nama '+(leaf?'subakun':'akun')+'"></div>'+
 (leaf?'<div class="operator-field"><label>Anggaran (Rp)</label><input name="b" inputmode="numeric" type="number" min="0" value="'+Number(values.b||0)+'"></div><div class="operator-field"><label>Realisasi (Rp)</label><input name="r" inputmode="numeric" type="number" min="0" value="'+Number(values.r||0)+'"></div>':'');
}
function modal(title,html,onSubmit){
 const m=q('[data-op-modal]');q('[data-modal-title]').textContent=title;q('[data-modal-fields]').innerHTML=html;m.hidden=false;
 q('[data-modal-form]').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);try{onSubmit(Object.fromEntries(fd.entries()));close();rerender();}catch(err){alert(err.message||err);}};
}
function close(){q('[data-op-modal]').hidden=true;}
function bindRows(){
 document.querySelectorAll('[data-edit-group]').forEach(b=>b.onclick=()=>{const g=groups().find(x=>x.code===b.dataset.editGroup);modal('Edit akun',fieldsHtml(g),v=>{api().updateGroup(year,section,g.code,v);selectedGroup=v.code;});});
 document.querySelectorAll('[data-delete-group]').forEach(b=>b.onclick=()=>{if(confirm('Hapus akun beserta seluruh subakunnya?')){api().deleteGroup(year,section,b.dataset.deleteGroup);rerender();}});
 document.querySelectorAll('[data-edit-leaf]').forEach(b=>b.onclick=()=>{const g=groups().find(x=>x.code===selectedGroup),x=g.children.find(v=>v.code===b.dataset.editLeaf);modal('Edit subakun',fieldsHtml(x,true),v=>api().updateLeaf(year,section,selectedGroup,x.code,v));});
 document.querySelectorAll('[data-delete-leaf]').forEach(b=>b.onclick=()=>{if(confirm('Hapus subakun ini?')){api().deleteLeaf(year,section,selectedGroup,b.dataset.deleteLeaf);rerender();}});
}
document.addEventListener('DOMContentLoaded',()=>{
 q('[data-op-year]').onchange=e=>{year=Number(e.target.value);rerender();};
 q('[data-op-section]').onchange=e=>{section=e.target.value;selectedGroup='';rerender();};
 q('[data-group-select]').onchange=e=>{selectedGroup=e.target.value;rerender();};
 q('[data-add-group]').onclick=()=>modal('Tambah akun',fieldsHtml(),v=>{api().addGroup(year,section,v);selectedGroup=v.code;});
 q('[data-add-leaf]').onclick=()=>{if(!selectedGroup)return alert('Tambahkan atau pilih akun terlebih dahulu.');modal('Tambah subakun',fieldsHtml({},true),v=>api().addLeaf(year,section,selectedGroup,v));};
 q('[data-reset-demo]').onclick=()=>{if(confirm('Kembalikan seluruh data demo ke kondisi awal?')){api().resetData();selectedGroup='';rerender();}};
 q('[data-modal-close]').onclick=close;q('[data-modal-cancel]').onclick=close;q('[data-op-modal]').onclick=e=>{if(e.target===e.currentTarget)close();};
 rerender();
});
})();