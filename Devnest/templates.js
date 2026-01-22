// templates.js - Handles template grid, search, and viewer modal
document.addEventListener('DOMContentLoaded', () => {
    renderTemplates(templates);
});

function renderTemplates(templates) {
    const grid = document.getElementById('template-grid');
    grid.innerHTML = '';
    const profile = JSON.parse(localStorage.getItem('devnest-profile')) || { saved: [] };
    templates.forEach(template => {
        const isSaved = profile.saved.includes(template.id);
        const card = document.createElement('div');
        card.className = 'template-card';
        card.innerHTML = `
            <h3>${template.name}</h3>
            <p>${template.description}</p>
            <div class="tags">${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <div class="card-actions">
                <button class="btn primary" onclick="viewTemplate(${template.id})">View Template</button>
                <button class="btn save-btn ${isSaved ? 'saved' : ''}" onclick="toggleSave(${template.id})">${isSaved ? 'Saved' : 'Save'}</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterTemplates() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filtered = templates.filter(t => 
        t.name.toLowerCase().includes(query) || t.tags.some(tag => tag.toLowerCase().includes(query))
    );
    renderTemplates(filtered);
}

function viewTemplate(id) {
    const template = templates.find(t => t.id === id);
    document.getElementById('viewer-title').textContent = template.name;
    document.getElementById('structure-list').innerHTML = template.structure.map(item => `<li>${item}</li>`).join('');
    document.getElementById('code-display').textContent = template.code.server; // Default to server.js
    document.getElementById('explanation').textContent = template.explanation;
    document.getElementById('template-viewer').classList.remove('hidden');
}

function closeViewer() {
    document.getElementById('template-viewer').classList.add('hidden');
}

function showTab(tab) {
    const code = document.getElementById('code-display');
    const template = templates.find(t => t.name === document.getElementById('viewer-title').textContent);
    code.textContent = template.code[tab];
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function copyCode() {
    const code = document.getElementById('code-display').textContent;
    navigator.clipboard.writeText(code).then(() => alert('Code copied!'));
}

function toggleSave(id) {
    let profile = JSON.parse(localStorage.getItem('devnest-profile')) || { saved: [] };
    if (profile.saved.includes(id)) {
        profile.saved = profile.saved.filter(savedId => savedId !== id);
    } else {
        profile.saved.push(id);
    }
    localStorage.setItem('devnest-profile', JSON.stringify(profile));
    renderTemplates(templates); // Re-render to update button states
}