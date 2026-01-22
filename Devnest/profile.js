// profile.js - Manages profile data using localStorage
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
});

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('devnest-profile')) || {
        username: 'DevUser',
        bio: 'Passionate developer learning backend with DevNest.',
        skills: ['HTML', 'CSS', 'JS', 'Node'],
        saved: [], // Template IDs
        favorites: [2]
    };

    document.getElementById('username').textContent = profile.username;
    document.getElementById('bio').textContent = profile.bio;
    document.getElementById('skills-tags').innerHTML = profile.skills.map(skill => `<span class="tag">${skill}</span>`).join('');

    const savedList = document.getElementById('saved-list');
    savedList.innerHTML = profile.saved.map(id => {
        const template = templates.find(t => t.id === id);
        return `<li>${template ? template.name : 'Unknown'}</li>`;
    }).join('');

    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = profile.favorites.map(id => {
        const template = templates.find(t => t.id === id);
        return `<li>${template ? template.name : 'Unknown'}</li>`;
    }).join('');
}

function openEditModal() {
    const profile = JSON.parse(localStorage.getItem('devnest-profile')) || {};
    document.getElementById('edit-username').value = profile.username || '';
    document.getElementById('edit-bio').value = profile.bio || '';
    document.getElementById('edit-skills').value = (profile.skills || []).join(', ');
    document.getElementById('edit-modal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

function saveProfile() {
    const profile = {
        username: document.getElementById('edit-username').value,
        bio: document.getElementById('edit-bio').value,
        skills: document.getElementById('edit-skills').value.split(',').map(s => s.trim()),
        saved: JSON.parse(localStorage.getItem('devnest-profile'))?.saved || [],
        favorites: JSON.parse(localStorage.getItem('devnest-profile'))?.favorites || [2]
    };
    localStorage.setItem('devnest-profile', JSON.stringify(profile));
    loadProfile();
    closeEditModal();
}