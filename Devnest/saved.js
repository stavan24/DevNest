// saved.js - Handles saved templates grid, search, and viewer modal
document.addEventListener('DOMContentLoaded', () => {
    renderSavedTemplates();
});

function renderSavedTemplates(filtered = null) {
    const grid = document.getElementById('saved-grid');
    const profile = JSON.parse(localStorage.getItem('devnest-profile')) || { saved: [] };
    const savedTemplates = filtered || profile.saved.map(id => templates.find(t => t.id === id)).filter(t => t);

    grid.innerHTML = '';
    if (savedTemplates.length === 0) {
        grid.innerHTML = '<p class="no-saved">No saved templates yet. Go to <a href="templates.html">Templates</a> to save some!</p>';
        return;
    }

    savedTemplates.forEach(template => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.innerHTML = `
            <h3>${template.name}</h3>
            <p>${template.description}</p>
            <div class="tags">${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <div class="card-actions">
                <button class="btn primary" onclick="viewTemplate(${template.id})">View Template</button>
                <button class="btn unsave-btn" onclick="unsaveTemplate(${template.id})">Unsave</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterSavedTemplates() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const profile = JSON.parse(localStorage.getItem('devnest-profile')) || { saved: [] };
    const savedTemplates = profile.saved.map(id => templates.find(t => t.id === id)).filter(t => t);
    const filtered = savedTemplates.filter(t => 
        t.name.toLowerCase().includes(query) || t.tags.some(tag => tag.toLowerCase().includes(query))
    );
    renderSavedTemplates(filtered);
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