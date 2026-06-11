const cards = [{"label": "Albums", "value": "18", "delta": "+4"}, {"label": "Assets", "value": "1,240", "delta": "+112"}, {"label": "Tags", "value": "64", "delta": "+9"}, {"label": "Views", "value": "12.8K", "delta": "+21%"}];
const rows = [{"title": "Brand photography", "status": "Curated", "detail": "Hero images selected for campaign pages."}, {"title": "Product renders", "status": "Ready", "detail": "Transparent and lifestyle variants organized."}, {"title": "Event archive", "status": "Tagged", "detail": "Photos grouped by session and speaker."}, {"title": "Social assets", "status": "Exported", "detail": "Square and story formats prepared."}];
const insights = ["Hero images are reused most often in campaigns.", "Tagging reduced duplicate uploads.", "Album views increased after adding featured sets."];
const storageKey = 'vizvasanlya-image-gallery-items';
let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
let filter = 'all';

const statsEl = document.querySelector('#stats');
const listEl = document.querySelector('#list');
const insightsEl = document.querySelector('#insights');
const form = document.querySelector('#add-item');
const input = document.querySelector('#itemInput');

function renderStats() {
  statsEl.innerHTML = cards.map((item) => `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <em>${item.delta}</em>
    </article>
  `).join('');
}

function renderList() {
  const visible = rows.filter((row) => filter === 'all' || row.status.includes(filter));
  if (!visible.length) {
    listEl.innerHTML = '<p class="empty">No items match this filter yet.</p>';
    return;
  }
  listEl.innerHTML = visible.map((row) => `
    <article class="row">
      <div>
        <h3>${row.title}</h3>
        <p>${row.detail}</p>
      </div>
      <span class="badge">${row.status}</span>
    </article>
  `).join('');
}

function renderInsights() {
  insightsEl.innerHTML = insights.map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  saved.unshift({ title: value, status: 'Active', detail: 'Added from the quick capture form.' });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 10)));
  input.value = '';
  renderList();
});

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderList();
  });
});

renderStats();
renderList();
renderInsights();
