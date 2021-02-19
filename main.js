function renderNavBar(sections) {
    // Render nav bar
}

function renderAbout(about) {
    // Render about section
}

function renderExperiences(experiences) {
    // Render experiences section
}

function renderProjects(projects) {
    // Render projects section
}

function renderTravels(travels) {
    // Render travels section
}

// Render nav bar and all sections of page
function renderMainPage(data) {
    document.querySelector('main').innerHTML = `
        ${renderNavBar(Object.keys(data.body))}
        ${renderAbout(data.body.about)}
        ${renderExperiences(data.body.experiences)}
        ${renderProjects(data.body.projects)}
        ${renderTravels(data.body.travels)}
    `;
}

// Hide or display element based on current state
function toggleVisibility(id) {
    let target = document.getElementById(id);
    if (target.style.display === 'block') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}

// Page loading process
fetch('data.json').then(response => response.json()).then(data => {
    renderMainPage();
});
