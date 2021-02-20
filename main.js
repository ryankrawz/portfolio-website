function renderNavBar(sections) {
    // Render nav bar
}

// Render about section
function renderAbout(about) {
    document.querySelector('#about-flex-container').innerHTML = `
        <img id="about-image" src="${about.photo}" alt="${about.name}" width="18.75%">
        <span id="about-bio" class="item-desc">${about.desc}</span>
    `;
}

// Render experiences section
function renderExperiences(experiences) {
    document.querySelector('#experiences-container').innerHTML = experiences.map(e => `
        <div class="flex-container">
            <img id="${e.id}-img" src="${e.photo}" alt="${e.title}" width="11.7%">
            <span id="${e.id}-desc" class="item-desc">${e.desc}</span>
        </div>
    `).join('');
}

// Render projects section
function renderProjects(projects) {
    document.querySelector('#projects-container').innerHTML = projects.map(p => `
        <a id="${p.id}-link" href="?project=${p.id}">${p.title}</a>
        <p id="${p.id}-desc" class="item-desc project-desc">${p.desc}</p>
    `).join('');
}

// Render travels section
function renderTravels(travels) {
    document.querySelector('#home-page-travels-section .flex-slideshow').innerHTML = travels.map(t => `
        <div class="slideshow-${t.media.length}">
            <h3 id="${t.location.toLowerCase()}-title">${t.location}</h3>
            ${t.media.map(m => `<img src="${m.link}" alt="${t.location}" width="${m.width}">`).join('')}
        </div>
    `).join('');
}

// Render nav bar and all sections of page
function renderMainPage(data) {
    renderNavBar(Object.keys(data.body));
    renderAbout(data.body.about);
    renderExperiences(data.body.experiences);
    renderProjects(data.body.projects);
    renderTravels(data.body.travels);
}

// Hide or display element based on current state
function toggleVisibility(id) {
    const target = document.getElementById(id);
    if (target.style.display === 'block') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}

// Page loading process
const dataTarget = 'data.json';
fetch(dataTarget).then(response => {
    console.log(`'${dataTarget}' ${response.ok ? 'successfully' : 'NOT'} retrieved, status code ${response.status}`);
    return response.json();
}).then(data => {
    renderMainPage(data);
});
