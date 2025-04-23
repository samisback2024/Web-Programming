// Page Switching and Theme
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function applyTheme() {
    // TODO: Applied theme from Project 4 
    document.body.style.backgroundColor = '#f4f4f4'; // Example
}

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(e.target.getAttribute('href').substring(1));
        });
    });
});