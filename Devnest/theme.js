// theme.js - Handles dark/light mode toggle with localStorage
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-switch');
    const savedTheme = localStorage.getItem('devnest-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        toggle.checked = true;
    }
    toggle.addEventListener('change', () => {
        document.body.classList.toggle('light');
        localStorage.setItem('devnest-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    });
});

function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('active');
}