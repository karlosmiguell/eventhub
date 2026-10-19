const API_URL = '/api/eventos';
const lista = document.getElementById('lista');
const statusEl = document.getElementById('status');
async function carregar(){
  try{const r=await fetch(API_URL); if(!r.ok) throw new Error(); const eventos=await r.json();
    statusEl.textContent = eventos.length ? '' : 'Nenhum evento cadastrado.';
    lista.innerHTML=eventos.map(e=>`<div class="event"><div><strong>${e.nome}</strong><div class="muted">${e.data} • ${e.local} • ${e.categoria}</div></div><button class="danger" onclick="excluir(${e.id})">Excluir</button></div>`).join('');
  }catch(e){statusEl.textContent='Não foi possível conectar à API. Verifique os containers e os logs.'; lista.innerHTML='';}
}
async function excluir(id){await fetch(`${API_URL}/${id}`,{method:'DELETE'}); carregar();}
document.getElementById('form').addEventListener('submit',async ev=>{
 ev.preventDefault(); const payload={nome:nome.value,data:data.value,local:local.value,categoria:categoria.value};
 const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
 if(r.ok){ev.target.reset(); carregar();}
});
carregar();
