/* =========================================================
   AgroConecta Sur - Lógica frontend Vanilla JavaScript
   Prototipo institucional con marketplace visual, filtros,
   carga de fotos, localStorage y analítica Canvas.
   ========================================================= */

const usuarios = [
  { id: 1, nombre: 'Administrador INFIHUILA', rol: 'INFIHUILA', permisos: ['crear', 'editar', 'consultar', 'validar'] },
  { id: 2, nombre: 'Analista USCO', rol: 'USCO', permisos: ['consultar'] },
  { id: 3, nombre: 'Gobernación del Huila', rol: 'Gobernación del Huila', permisos: ['consultar'] },
  { id: 4, nombre: 'Productor regional', rol: 'Productor', permisos: ['crearOferta'] },
  { id: 5, nombre: 'Comprador institucional', rol: 'Comprador', permisos: ['crearDemanda'] }
];

const ofertasBase = [
  { id: 101, tipo: 'Oferta', nombre: 'Queso campesino artesanal', departamento: 'Huila', municipio: 'Pitalito', categoria: 'Lácteos', cantidad: 1200, unidad: 'kg/mes', precio: 16800000, actor: 'Asociación Láctea del Sur' },
  { id: 102, tipo: 'Oferta', nombre: 'Leche cruda refrigerada', departamento: 'Caquetá', municipio: 'Florencia', categoria: 'Lácteos', cantidad: 18000, unidad: 'litros/mes', precio: 34200000, actor: 'Cooperativa Lechera Caqueteña' },
  { id: 103, tipo: 'Oferta', nombre: 'Café especial orgánico', departamento: 'Huila', municipio: 'La Plata', categoria: 'Orgánicos', cantidad: 800, unidad: 'kg/mes', precio: 24000000, actor: 'Red Cafetera del Occidente' },
  { id: 104, tipo: 'Oferta', nombre: 'Plátano hartón', departamento: 'Putumayo', municipio: 'Mocoa', categoria: 'Producción Agrícola', cantidad: 9000, unidad: 'kg/mes', precio: 13500000, actor: 'Asoproductores Putumayo' },
  { id: 105, tipo: 'Oferta', nombre: 'Yuca fresca seleccionada', departamento: 'Amazonas', municipio: 'Leticia', categoria: 'Producción Agrícola', cantidad: 4500, unidad: 'kg/mes', precio: 7200000, actor: 'Comunidad Agroamazónica' },
  { id: 106, tipo: 'Oferta', nombre: 'Yogur natural regional', departamento: 'Huila', municipio: 'Garzón', categoria: 'Lácteos', cantidad: 6000, unidad: 'unidades/mes', precio: 18000000, actor: 'Lácteos del Centro' },
  { id: 107, tipo: 'Oferta', nombre: 'Cacao orgánico fermentado', departamento: 'Caquetá', municipio: 'Belén de los Andaquíes', categoria: 'Orgánicos', cantidad: 1000, unidad: 'kg/mes', precio: 15000000, actor: 'Cacao Paz Caquetá' },
  { id: 108, tipo: 'Oferta', nombre: 'Piña oro miel', departamento: 'Putumayo', municipio: 'Puerto Asís', categoria: 'Producción Agrícola', cantidad: 7000, unidad: 'kg/mes', precio: 12600000, actor: 'Agroalianza Putumayo' }
];

const demandasBase = [
  { id: 201, tipo: 'Demanda', nombre: 'Queso fresco para operador alimentario', departamento: 'Huila', municipio: 'Neiva', categoria: 'Lácteos', cantidad: 900, unidad: 'kg/mes', precio: 14400000, actor: 'Operador Alimentario Sur' },
  { id: 202, tipo: 'Demanda', nombre: 'Leche para programa institucional', departamento: 'Caquetá', municipio: 'Florencia', categoria: 'Lácteos', cantidad: 12000, unidad: 'litros/mes', precio: 24000000, actor: 'Comprador Institucional Caquetá' },
  { id: 203, tipo: 'Demanda', nombre: 'Café especial para tienda regional', departamento: 'Huila', municipio: 'Neiva', categoria: 'Orgánicos', cantidad: 350, unidad: 'kg/mes', precio: 12250000, actor: 'Comercializadora Huila Café' },
  { id: 204, tipo: 'Demanda', nombre: 'Frutas y tubérculos para abastecimiento', departamento: 'Amazonas', municipio: 'Leticia', categoria: 'Producción Agrícola', cantidad: 5000, unidad: 'kg/mes', precio: 10000000, actor: 'Operador Logístico Amazónico' },
  { id: 205, tipo: 'Demanda', nombre: 'Cacao orgánico para transformación', departamento: 'Caquetá', municipio: 'San Vicente del Caguán', categoria: 'Orgánicos', cantidad: 650, unidad: 'kg/mes', precio: 9750000, actor: 'Chocolatería Regional' },
  { id: 206, tipo: 'Demanda', nombre: 'Plátano para canal Horeca', departamento: 'Putumayo', municipio: 'Puerto Asís', categoria: 'Producción Agrícola', cantidad: 3500, unidad: 'kg/mes', precio: 6650000, actor: 'Distribuidora Surcolombiana' }
];

const oportunidades = [
  { producto: 'Queso campesino', oferta: 'Asociación Láctea del Sur', demanda: 'Operador Alimentario Sur', departamento: 'Huila', valor: 14400000, estado: 'Prioritaria' },
  { producto: 'Leche cruda', oferta: 'Cooperativa Lechera Caqueteña', demanda: 'Comprador Institucional Caquetá', departamento: 'Caquetá', valor: 24000000, estado: 'En análisis' },
  { producto: 'Cacao orgánico', oferta: 'Cacao Paz Caquetá', demanda: 'Chocolatería Regional', departamento: 'Caquetá', valor: 9750000, estado: 'Validación técnica' },
  { producto: 'Plátano hartón', oferta: 'Asoproductores Putumayo', demanda: 'Distribuidora Surcolombiana', departamento: 'Putumayo', valor: 6650000, estado: 'Potencial' }
];

const departments = ['Huila', 'Caquetá', 'Putumayo', 'Amazonas'];
const categories = ['Lácteos', 'Producción Agrícola', 'Orgánicos'];
const chartPalette = ['#006C72', '#CCD400', '#004651', '#6BA5A8', '#A4AD00', '#1F2937'];

const formatCurrency = value => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value || 0);
const shortCurrency = value => value >= 1000000000 ? `$${(value / 1000000000).toFixed(1)} MM` : value >= 1000000 ? `$${(value / 1000000).toFixed(1)} M` : `$${Math.round((value || 0) / 1000)} K`;
const normalizeText = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

function getCategoryImage(category, type = 'Oferta') {
  const palette = {
    'Lácteos': ['#006C72', '#CCD400', 'LÁCTEOS'],
    'Producción Agrícola': ['#004651', '#CCD400', 'AGRO'],
    'Orgánicos': ['#6BA5A8', '#004651', 'ORGÁNICOS']
  };
  const [primary, accent, label] = palette[category] || ['#006C72', '#CCD400', 'AGRO'];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="540" viewBox="0 0 900 540"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="${primary}"/><stop offset="100%" stop-color="${accent}"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-opacity="0.18"/></filter></defs><rect width="900" height="540" rx="40" fill="#F5F7F8"/><circle cx="760" cy="90" r="160" fill="${accent}" opacity=".35"/><circle cx="120" cy="450" r="180" fill="${primary}" opacity=".16"/><rect x="90" y="94" width="720" height="352" rx="38" fill="url(#g)" filter="url(#s)"/><path d="M200 330c70-115 155-172 255-172 82 0 157 38 245 114" fill="none" stroke="#fff" stroke-width="34" stroke-linecap="round" opacity=".82"/><circle cx="298" cy="230" r="54" fill="#fff" opacity=".92"/><text x="450" y="318" text-anchor="middle" font-family="Trebuchet MS, Arial" font-size="56" font-weight="900" fill="#fff">${label}</text><text x="450" y="376" text-anchor="middle" font-family="Trebuchet MS, Arial" font-size="27" font-weight="700" fill="#fff" opacity=".92">${type.toUpperCase()} REGIONAL</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function enrichPublication(item) {
  return { ...item, foto: item.foto || getCategoryImage(item.categoria, item.tipo) };
}

function getStoredPublications() {
  const stored = JSON.parse(localStorage.getItem('agroPublicaciones') || '[]');
  return [...ofertasBase, ...demandasBase, ...stored].map(enrichPublication);
}

function savePublication(publication) {
  const stored = JSON.parse(localStorage.getItem('agroPublicaciones') || '[]');
  stored.push(publication);
  localStorage.setItem('agroPublicaciones', JSON.stringify(stored));
}

function handleLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const role = document.getElementById('roleSelect').value;
    const userName = document.getElementById('userName').value.trim();
    const message = document.getElementById('loginMessage');
    if (!role || !userName) {
      message.textContent = 'Completa el rol y el nombre de usuario.';
      return;
    }
    const user = usuarios.find(item => item.rol === role) || { rol: role, permisos: [] };
    localStorage.setItem('agroSession', JSON.stringify({ nombre: userName, rol: role, permisos: user.permisos }));
    message.textContent = `Acceso simulado autorizado como ${role}.`;
    window.location.href = ['INFIHUILA', 'USCO', 'Gobernación del Huila'].includes(role) ? 'dashboard_infihuila.html' : 'marketplace.html';
  });
}

function applySessionLabel() {
  const label = document.getElementById('sessionLabel');
  const session = JSON.parse(localStorage.getItem('agroSession') || 'null');
  if (label && session) label.textContent = session.rol === 'INFIHUILA' ? `Panel administrativo · ${session.nombre}` : `Modo consulta · ${session.rol}`;
  document.querySelectorAll('#logoutBtn').forEach(button => button.addEventListener('click', () => {
    localStorage.removeItem('agroSession');
    window.location.href = 'index.html';
  }));
}

function calculateMatchScore(item) {
  const base = item.tipo === 'Oferta' ? 78 : 74;
  const categoryBoost = item.categoria === 'Lácteos' ? 9 : item.categoria === 'Orgánicos' ? 7 : 6;
  const valueBoost = Math.min(8, Math.round(Number(item.precio || 0) / 5000000));
  return Math.min(98, base + categoryBoost + valueBoost);
}

function renderMarketplaceKpis(publications) {
  const kpiResults = document.getElementById('marketKpiResults');
  if (!kpiResults) return;
  document.getElementById('marketKpiResults').textContent = publications.length;
  document.getElementById('marketKpiOffers').textContent = publications.filter(item => item.tipo === 'Oferta').length;
  document.getElementById('marketKpiDemands').textContent = publications.filter(item => item.tipo === 'Demanda').length;
  document.getElementById('marketKpiValue').textContent = shortCurrency(publications.reduce((sum, item) => sum + Number(item.precio || 0), 0));
  document.getElementById('marketKpiTerritories').textContent = new Set(publications.map(item => item.departamento)).size;
}

function renderMarketplace() {
  const grid = document.getElementById('marketplaceGrid');
  if (!grid) return;
  const department = document.getElementById('departmentFilter').value;
  const category = document.getElementById('categoryFilter').value;
  const type = document.getElementById('typeFilter').value;
  const search = normalizeText(document.getElementById('searchFilter')?.value || '');
  const sort = document.getElementById('sortFilter')?.value || 'recientes';
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');

  let publications = getStoredPublications().filter(item => {
    const searchable = normalizeText(`${item.nombre} ${item.actor} ${item.departamento} ${item.municipio} ${item.categoria}`);
    return (department === 'Todos' || item.departamento === department)
      && (category === 'Todas' || item.categoria === category)
      && (type === 'Todos' || item.tipo === type)
      && (!search || searchable.includes(search));
  });

  const sorters = {
    recientes: (a, b) => Number(b.id) - Number(a.id),
    valor_desc: (a, b) => Number(b.precio || 0) - Number(a.precio || 0),
    valor_asc: (a, b) => Number(a.precio || 0) - Number(b.precio || 0),
    cantidad_desc: (a, b) => Number(b.cantidad || 0) - Number(a.cantidad || 0),
    nombre: (a, b) => a.nombre.localeCompare(b.nombre, 'es')
  };
  publications = publications.sort(sorters[sort] || sorters.recientes);
  grid.innerHTML = '';

  publications.forEach(item => {
    const card = document.createElement('article');
    card.className = 'publication-card interactive-card';
    card.innerHTML = `
      <div class="publication-image-wrap">
        <img class="publication-image" src="${item.foto}" alt="Foto de ${escapeHtml(item.nombre)}" loading="lazy" />
        <span class="floating-badge ${item.tipo === 'Oferta' ? 'badge-offer' : 'badge-demand'}">${item.tipo}</span>
      </div>
      <div class="publication-body">
        <div class="card-footer compact"><span class="badge badge-neutral">${item.categoria}</span><span class="match-score">${calculateMatchScore(item)}% match</span></div>
        <h3>${escapeHtml(item.nombre)}</h3>
        <div class="card-meta">
          <span><strong>Territorio:</strong> ${escapeHtml(item.departamento)} · ${escapeHtml(item.municipio)}</span>
          <span><strong>Cantidad:</strong> ${Number(item.cantidad).toLocaleString('es-CO')} ${escapeHtml(item.unidad)}</span>
          <span><strong>Valor:</strong> ${formatCurrency(Number(item.precio || 0))}</span>
          <span><strong>Actor:</strong> ${escapeHtml(item.actor)}</span>
        </div>
        <div class="card-actions"><button class="btn btn-primary small" type="button" data-detail-id="${item.id}">Ver detalle</button><button class="btn btn-outline small" type="button" data-contact-id="${item.id}">Contactar</button></div>
      </div>`;
    grid.appendChild(card);
  });

  resultsCount.textContent = `${publications.length} resultado${publications.length === 1 ? '' : 's'}`;
  emptyState.classList.toggle('hidden', publications.length > 0);
  renderMarketplaceKpis(publications);
}

function openPublicationDetail(id, mode = 'detail') {
  const item = getStoredPublications().find(pub => String(pub.id) === String(id));
  const modal = document.getElementById('publicationModal');
  const body = document.getElementById('modalBody');
  if (!item || !modal || !body) return;
  const isContact = mode === 'contact';
  body.innerHTML = `
    <button class="modal-close" type="button" aria-label="Cerrar detalle">×</button>
    <div class="modal-grid">
      <img class="modal-image" src="${item.foto}" alt="Foto de ${escapeHtml(item.nombre)}" />
      <div><span class="badge ${item.tipo === 'Oferta' ? 'badge-offer' : 'badge-demand'}">${item.tipo}</span><h2>${escapeHtml(item.nombre)}</h2><p class="modal-lead">${isContact ? 'Solicitud de contacto comercial simulada.' : 'Ficha comercial de oferta/demanda para análisis institucional.'}</p>
        <div class="detail-list"><span><strong>Actor:</strong> ${escapeHtml(item.actor)}</span><span><strong>Departamento:</strong> ${escapeHtml(item.departamento)}</span><span><strong>Municipio:</strong> ${escapeHtml(item.municipio)}</span><span><strong>Categoría:</strong> ${escapeHtml(item.categoria)}</span><span><strong>Cantidad:</strong> ${Number(item.cantidad).toLocaleString('es-CO')} ${escapeHtml(item.unidad)}</span><span><strong>Valor estimado:</strong> ${formatCurrency(Number(item.precio || 0))}</span><span><strong>Índice de coincidencia:</strong> ${calculateMatchScore(item)}%</span></div>
        <div class="modal-actions"><button class="btn btn-primary" type="button">${isContact ? 'Enviar solicitud simulada' : 'Priorizar oportunidad'}</button><button class="btn btn-outline modal-close-secondary" type="button">Cerrar</button></div>
      </div>
    </div>`;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closePublicationModal() {
  const modal = document.getElementById('publicationModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve('');
    if (!file.type.startsWith('image/')) return reject(new Error('El archivo debe ser una imagen.'));
    if (file.size > 2.5 * 1024 * 1024) return reject(new Error('La imagen no debe superar 2.5 MB.'));
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No fue posible leer la imagen.'));
    reader.readAsDataURL(file);
  });
}

function initMarketplaceEvents() {
  if (!document.getElementById('marketplaceGrid')) return;
  ['departmentFilter', 'categoryFilter', 'typeFilter', 'sortFilter'].forEach(id => document.getElementById(id)?.addEventListener('change', renderMarketplace));
  document.getElementById('searchFilter')?.addEventListener('input', renderMarketplace);
  document.getElementById('clearFiltersBtn').addEventListener('click', () => {
    document.getElementById('departmentFilter').value = 'Todos';
    document.getElementById('categoryFilter').value = 'Todas';
    document.getElementById('typeFilter').value = 'Todos';
    document.getElementById('sortFilter').value = 'recientes';
    document.getElementById('searchFilter').value = '';
    renderMarketplace();
  });
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach(btn => btn.classList.remove('is-active'));
    button.classList.add('is-active');
    document.getElementById('marketplaceGrid').classList.toggle('list-view', button.dataset.view === 'list');
  }));
  document.getElementById('marketplaceGrid').addEventListener('click', event => {
    const detailBtn = event.target.closest('[data-detail-id]');
    const contactBtn = event.target.closest('[data-contact-id]');
    if (detailBtn) openPublicationDetail(detailBtn.dataset.detailId, 'detail');
    if (contactBtn) openPublicationDetail(contactBtn.dataset.contactId, 'contact');
  });
  document.getElementById('publicationModal')?.addEventListener('click', event => {
    if (event.target.id === 'publicationModal' || event.target.closest('.modal-close') || event.target.closest('.modal-close-secondary')) closePublicationModal();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closePublicationModal(); });
  const fileInput = document.getElementById('pubPhoto');
  const preview = document.getElementById('photoPreview');
  const previewText = document.getElementById('photoPreviewText');
  fileInput?.addEventListener('change', async () => {
    try {
      const dataUrl = await readImageFile(fileInput.files[0]);
      if (dataUrl) {
        preview.style.backgroundImage = `url('${dataUrl}')`;
        preview.classList.add('has-image');
        previewText.textContent = 'Foto cargada correctamente';
      }
    } catch (error) {
      preview.style.backgroundImage = '';
      preview.classList.remove('has-image');
      previewText.textContent = error.message;
      fileInput.value = '';
    }
  });
  const form = document.getElementById('publicationForm');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const msg = document.getElementById('publicationMessage');
    let foto = '';
    try { foto = await readImageFile(document.getElementById('pubPhoto')?.files?.[0]); }
    catch (error) { msg.textContent = error.message; return; }
    const publication = {
      id: Date.now(),
      tipo: document.getElementById('pubType').value,
      nombre: document.getElementById('pubName').value.trim(),
      departamento: document.getElementById('pubDepartment').value,
      municipio: document.getElementById('pubMunicipality').value.trim(),
      categoria: document.getElementById('pubCategory').value,
      cantidad: Number(document.getElementById('pubQuantity').value),
      unidad: document.getElementById('pubUnit').value.trim(),
      precio: Number(document.getElementById('pubPrice').value),
      actor: document.getElementById('pubActor').value.trim(),
      foto: foto || getCategoryImage(document.getElementById('pubCategory').value, document.getElementById('pubType').value)
    };
    savePublication(publication);
    form.reset();
    if (preview) { preview.style.backgroundImage = ''; preview.classList.remove('has-image'); }
    if (previewText) previewText.textContent = 'Arrastra o selecciona una foto del producto';
    msg.textContent = 'Publicación agregada correctamente con ficha visual en localStorage.';
    renderMarketplace();
  });
  renderMarketplace();
}

function calculateDashboardKpis() {
  if (!document.getElementById('kpiProductores')) return;
  const publications = getStoredPublications();
  const ofertas = publications.filter(item => item.tipo === 'Oferta');
  const demandas = publications.filter(item => item.tipo === 'Demanda');
  const productores = new Set(ofertas.map(item => item.actor));
  const compradores = new Set(demandas.map(item => item.actor));
  const territory = new Set(publications.map(item => item.departamento));
  const totalValue = publications.reduce((sum, item) => sum + Number(item.precio || 0), 0);
  document.getElementById('kpiProductores').textContent = productores.size;
  document.getElementById('kpiCompradores').textContent = compradores.size;
  document.getElementById('kpiOfertas').textContent = ofertas.length;
  document.getElementById('kpiDemandas').textContent = demandas.length;
  document.getElementById('kpiValor').textContent = formatCurrency(totalValue);
  document.getElementById('kpiDepartamentos').textContent = territory.size;
  const totalValueBadge = document.getElementById('totalValueBadge');
  if (totalValueBadge) totalValueBadge.textContent = formatCurrency(totalValue);
}

function renderOpportunities() {
  const tbody = document.getElementById('opportunitiesTable');
  if (!tbody) return;
  tbody.innerHTML = oportunidades.map(item => `<tr><td>${item.producto}</td><td>${item.oferta}</td><td>${item.demanda}</td><td>${item.departamento}</td><td>${formatCurrency(item.valor)}</td><td><span class="badge badge-neutral">${item.estado}</span></td></tr>`).join('');
}

function renderTerritoryAnalysis() {
  const wrapper = document.getElementById('territoryAnalysis');
  if (!wrapper) return;
  const publications = getStoredPublications();
  wrapper.innerHTML = departments.map(department => {
    const items = publications.filter(item => item.departamento === department);
    const value = items.reduce((sum, item) => sum + Number(item.precio || 0), 0);
    const offers = items.filter(item => item.tipo === 'Oferta').length;
    const demands = items.filter(item => item.tipo === 'Demanda').length;
    return `<article class="territory-card"><strong>${department}</strong><span>${items.length} publicaciones · ${offers} ofertas · ${demands} demandas</span><span>${formatCurrency(value)}</span></article>`;
  }).join('');
}

/* Motor simple de gráficas Canvas. Sin librerías externas. */
function setupCanvas(canvas) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;
  const width = Number(canvas.getAttribute('width'));
  const height = Number(canvas.getAttribute('height'));
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.scale(ratio, ratio);
  return { ctx, width, height };
}
function drawBase(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#DCE3E6'; ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) { const y = 42 + i * ((height - 92) / 4); ctx.beginPath(); ctx.moveTo(56, y); ctx.lineTo(width - 22, y); ctx.stroke(); }
}
function drawBarChart(canvasId, labels, values, titleFormatter = shortCurrency) {
  const setup = setupCanvas(document.getElementById(canvasId)); if (!setup) return;
  const { ctx, width, height } = setup; drawBase(ctx, width, height);
  const max = Math.max(...values, 1), plotW = width - 96, plotH = height - 110, barGap = 22, barW = Math.max(34, (plotW - barGap * (values.length - 1)) / values.length);
  values.forEach((value, i) => { const x = 58 + i * (barW + barGap), h = (value / max) * plotH, y = height - 50 - h; ctx.fillStyle = chartPalette[i % chartPalette.length]; ctx.beginPath(); ctx.roundRect(x, y, barW, h, 10); ctx.fill(); ctx.fillStyle = '#1F2937'; ctx.font = '700 13px Trebuchet MS'; ctx.textAlign = 'center'; ctx.fillText(titleFormatter(value), x + barW / 2, y - 10); ctx.fillStyle = '#64748B'; ctx.font = '700 12px Trebuchet MS'; ctx.fillText(labels[i], x + barW / 2, height - 24); });
}
function drawGroupedColumnChart(canvasId, labels, offers, demands) {
  const setup = setupCanvas(document.getElementById(canvasId)); if (!setup) return;
  const { ctx, width, height } = setup; drawBase(ctx, width, height);
  const max = Math.max(...offers, ...demands, 1), plotW = width - 110, plotH = height - 110, groupW = plotW / labels.length, barW = Math.min(42, groupW / 4);
  labels.forEach((label, i) => { const center = 68 + groupW * i + groupW / 2; [offers[i], demands[i]].forEach((value, j) => { const h = (value / max) * plotH, x = center + (j === 0 ? -barW - 4 : 4), y = height - 50 - h; ctx.fillStyle = j === 0 ? '#006C72' : '#CCD400'; ctx.beginPath(); ctx.roundRect(x, y, barW, h, 8); ctx.fill(); ctx.fillStyle = '#1F2937'; ctx.font = '800 12px Trebuchet MS'; ctx.textAlign = 'center'; ctx.fillText(value, x + barW / 2, y - 8); }); ctx.fillStyle = '#64748B'; ctx.font = '700 12px Trebuchet MS'; ctx.fillText(label, center, height - 24); });
  ctx.fillStyle = '#006C72'; ctx.fillRect(width - 180, 22, 12, 12); ctx.fillStyle = '#1F2937'; ctx.fillText('Ofertas', width - 135, 32); ctx.fillStyle = '#CCD400'; ctx.fillRect(width - 92, 22, 12, 12); ctx.fillStyle = '#1F2937'; ctx.fillText('Demandas', width - 35, 32);
}
function drawPieChart(canvasId, labels, values) {
  const setup = setupCanvas(document.getElementById(canvasId)); if (!setup) return;
  const { ctx, width, height } = setup; ctx.clearRect(0, 0, width, height); ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height);
  const total = values.reduce((a, b) => a + b, 0) || 1, cx = width / 2, cy = height / 2, radius = Math.min(width, height) * 0.34; let start = -Math.PI / 2;
  values.forEach((value, i) => { const angle = (value / total) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, radius, start, start + angle); ctx.closePath(); ctx.fillStyle = chartPalette[i % chartPalette.length]; ctx.fill(); start += angle; });
  ctx.beginPath(); ctx.arc(cx, cy, radius * 0.58, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.fillStyle = '#004651'; ctx.font = '900 28px Trebuchet MS'; ctx.textAlign = 'center'; ctx.fillText(total, cx, cy - 4); ctx.font = '700 13px Trebuchet MS'; ctx.fillStyle = '#64748B'; ctx.fillText('publicaciones', cx, cy + 20);
  const legend = document.getElementById('categoryLegend'); if (legend) legend.innerHTML = labels.map((label, i) => `<span class="legend-item"><i class="legend-dot" style="--dot-color:${chartPalette[i % chartPalette.length]}"></i>${label}: ${Math.round((values[i] / total) * 100)}%</span>`).join('');
}
function drawTrendChart(canvasId, labels, values) {
  const setup = setupCanvas(document.getElementById(canvasId)); if (!setup) return;
  const { ctx, width, height } = setup; drawBase(ctx, width, height);
  const max = Math.max(...values, 1), min = Math.min(...values, 0), plotW = width - 100, plotH = height - 112;
  const points = values.map((value, i) => ({ x: 60 + (plotW / (values.length - 1)) * i, y: height - 52 - ((value - min) / (max - min || 1)) * plotH, value }));
  ctx.beginPath(); points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)); ctx.strokeStyle = '#006C72'; ctx.lineWidth = 4; ctx.stroke();
  points.forEach((p, i) => { ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); ctx.fillStyle = i === points.length - 1 ? '#CCD400' : '#006C72'; ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#64748B'; ctx.font = '700 12px Trebuchet MS'; ctx.textAlign = 'center'; ctx.fillText(labels[i], p.x, height - 24); });
  const last = points[points.length - 1]; ctx.fillStyle = '#004651'; ctx.font = '900 14px Trebuchet MS'; ctx.fillText(shortCurrency(last.value), last.x, last.y - 16);
}
function renderDashboardCharts() {
  if (!document.getElementById('chartDepartmentValue')) return;
  const publications = getStoredPublications();
  const valueByDepartment = departments.map(dep => publications.filter(item => item.departamento === dep).reduce((sum, item) => sum + Number(item.precio || 0), 0));
  const categoryCounts = categories.map(cat => publications.filter(item => item.categoria === cat).length);
  const offersByDepartment = departments.map(dep => publications.filter(item => item.departamento === dep && item.tipo === 'Oferta').length);
  const demandsByDepartment = departments.map(dep => publications.filter(item => item.departamento === dep && item.tipo === 'Demanda').length);
  const totalValue = publications.reduce((sum, item) => sum + Number(item.precio || 0), 0);
  drawBarChart('chartDepartmentValue', departments, valueByDepartment);
  drawPieChart('chartCategoryPie', categories, categoryCounts);
  drawGroupedColumnChart('chartOfferDemand', departments, offersByDepartment, demandsByDepartment);
  drawTrendChart('chartTrend', ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'], [0.52, 0.61, 0.68, 0.78, 0.86, 1].map(factor => Math.round(totalValue * factor)));
}

function initApp() {
  handleLogin(); applySessionLabel(); initMarketplaceEvents(); calculateDashboardKpis(); renderDashboardCharts(); renderOpportunities(); renderTerritoryAnalysis();
}
document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('resize', () => { window.clearTimeout(window.__agroResizeTimer); window.__agroResizeTimer = window.setTimeout(renderDashboardCharts, 160); });
