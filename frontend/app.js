const API_URL = '/api/eventos';
const lista = document.getElementById('lista');
const statusEl = document.getElementById('status');
const contadorEl = document.getElementById('contador');
const apiPill = document.getElementById('api-pill');
const apiPillText = document.getElementById('api-pill-text');

async function carregar() {
  try {
    const r = await fetch(API_URL);
    if (!r.ok) throw new Error();
    const eventos = await r.json();

    if (contadorEl) contadorEl.textContent = eventos.length;
    if (apiPill && apiPillText) {
      apiPill.className = 'status-pill online';
      apiPillText.textContent = 'API & MySQL Online';
    }

    statusEl.className = 'muted';
    statusEl.style.display = eventos.length ? 'none' : 'block';
    statusEl.textContent = eventos.length ? '' : 'Nenhum evento cadastrado ainda. Cadastre o primeiro acima!';

    lista.innerHTML = eventos.map(e => `
      <div class="event">
        <div class="event-left">
          <div class="event-badge">${(e.nome || 'E').substring(0, 1).toUpperCase()}</div>
          <div>
            <strong>${e.nome}</strong>
            <div class="meta-tags">
              <span class="tag">📅 ${e.data}</span>
              <span class="tag">📍 ${e.local}</span>
              <span class="tag cat">${e.categoria}</span>
            </div>
          </div>
        </div>
        <button class="danger" onclick="excluir(${e.id})">Excluir</button>
      </div>
    `).join('');
  } catch (e) {
    if (contadorEl) contadorEl.textContent = '—';
    if (apiPill && apiPillText) {
      apiPill.className = 'status-pill offline';
      apiPillText.textContent = 'API Offline';
    }
    statusEl.style.display = 'block';
    statusEl.className = 'error-box';
    statusEl.innerHTML = '<strong>⚠️ Não foi possível conectar à API Spring Boot.</strong><br>Verifique os containers, a rede do Docker Compose, o proxy Nginx (<code>backend:8080</code>) e os logs.';
    lista.innerHTML = '';
  }
}

async function excluir(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  carregar();
}

document.getElementById('form').addEventListener('submit', async ev => {
  ev.preventDefault();
  const payload = {
    nome: nome.value,
    data: data.value,
    local: local.value,
    categoria: categoria.value
  };
  const r = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (r.ok) {
    ev.target.reset();
    carregar();
  }
});

carregar();
