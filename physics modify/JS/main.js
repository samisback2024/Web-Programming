/**
 * main.js
 * Author: Sam
 * Date: April 18, 2025
 * Purpose: Handles page section switching and theme toggling
 * Changes made: 
 * - Unified page sections into a single-page structure (hiding/showing sections)
 * - Added dark theme toggle functionality
 * - Refactored navigation for better responsiveness
 */


function showSection(sectionId, event) {
    event.preventDefault();
    document.querySelectorAll('main section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('show');
    });
    const section = document.getElementById(sectionId);
    section.classList.remove('hidden');
    section.classList.add('show');
}

document.getElementById('theme-toggle').addEventListener('click', function() {
    const head = document.querySelector('head');
    const existingTheme = document.getElementById('dark-theme');
    if (existingTheme) {
        existingTheme.remove();
        this.textContent = 'Click for Dark Theme';
    } else {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/dark-theme.css';
        link.id = 'dark-theme';
        head.appendChild(link);
        this.textContent = 'Click for Light Theme';
    }
});