// Add event handlers to main page
function addHandlers(data) {
    // Search news by user input

    // Filter projects by radio button
    const projectRadioButtons = document.querySelectorAll('input[name="project-filter-option"]');
    projectRadioButtons.forEach(b => b.addEventListener('change', function(event) {
        if (event.target.value === 'All') {
            document.querySelector('#projects-container').innerHTML = renderProjects(data.body.projects);
        } else {
            const matchingProjects = data.body.projects.filter(p => p.tags.includes(event.target.value));
            document.querySelector('#projects-container').innerHTML = renderProjects(matchingProjects);
        }
    }));
}

// Capitalize first letter of string
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// Form list of tags from project data
function getTags(projects) {
    const tagSet = new Set(['All']);
    for (let p of projects) {
        for (let t of p.tags) {
            tagSet.add(t);
        }
    }
    return Array.from(tagSet);
}

// Render nav bar for main or project-specific page
function renderNavBar(headings, project=null) {
    const whichPage = project ? project.id : 'home';
    return `
        <button class="nav-button open-nav" onclick="toggleVisibility('nav-menu');">
            <div class="nav-icon-bar"></div>
            <div class="nav-icon-bar"></div>
            <div class="nav-icon-bar"></div>
        </button>
        <div id="nav-menu">
            ${project ? '<a id="back-option" href="."><button class="nav-button">< Back</button></a>' : ''}
            ${headings.map(h => `<a id="${h}-nav-option" href="#${h}-section"><button class="nav-button">${capitalize(h)}</button></a>`).join('')}
        </div>
        <div class="header-nav-bar">
            <header id="${whichPage}-page-header">
                <h1 id="${whichPage}-page-header-text">${project ? project.title : 'Ryan Krawczyk'}</h1>
            </header>
            <nav id="${whichPage}-page-nav-bar">
                ${project ? '<a id="back-option" href="."><button class="nav-button">< Back</button></a>' : ''}
                ${headings.map(h => `<a id="${h}-section-link" href="#${h}-section"><button class="nav-button">${capitalize(h)}</button></a>`).join('')}
            </nav>
        </div>
    `;
}

// Render about section
function renderAbout(about) {
    return `
        <img id="about-image" src="${about.photo}" alt="${about.name}" width="18.75%">
        <span id="about-bio" class="item-desc">${about.desc}</span>
    `;
}

// Render experiences section
function renderExperiences(experiences) {
    return experiences.map(e => `
        <div class="flex-container">
            <img id="${e.id}-img" src="${e.photo}" alt="${e.title}" width="11.7%">
            <span id="${e.id}-desc" class="item-desc">${e.desc}</span>
        </div>
    `).join('');
}

// Render projects section
function renderProjects(projects) {
    return projects.map(p => `
        <a id="${p.id}-link" href="?project=${p.id}">${p.title}</a>
        <p id="${p.id}-desc" class="item-desc project-desc">
            ${p.tags.map(t => `<span id="${t[0].toLowerCase()}-tag">${t}</span>`).join('')}
        </p>
    `).join('');
}

// Render project details for project-specific page
function renderProjectDetails(project) {
    return `
        <section id="description-section">
            <p id="${project.id}-desc" class="item-desc project-desc">${project.desc}</p>
        </section>
        <section id="media-section">
            ${project.media}
        </section>
    `;
}

// Render travels section
function renderTravels(travels) {
    return travels.map(t => `
        <div class="slideshow-${t.media.length}">
            <h3 id="${t.location.toLowerCase()}-title">${t.location}</h3>
            ${t.media.map(m => `<img src="${m.link}" alt="${t.location}" width="${m.width}">`).join('')}
        </div>
    `).join('');
}

// Render nav bar and all sections of page
function renderMainPage(data) {
    document.querySelector('body').innerHTML = `
        ${renderNavBar(Object.keys(data.body))}
        <main id="home-page-main">
            <section id="about-section">
                <h3 id="about-header" class="section-header">About</h3>
                <div id="about-flex-container" class="flex-container">${renderAbout(data.body.about)}</div>
            </section>
            <section id="experiences-section">
                <h3 id="experiences-header" class="section-header">Academic & Professional Experiences</h3>
                <input id="experiences-search" placeholder="Search ${data.body.about.name}'s experiences...">
                ${renderExperiences(data.body.experiences)}
            </section>
            <section id="projects-section">
                <h3 id="projects-header" class="section-header">Class Projects</h3>
                <div id="flex-project-filter">
                    ${getTags(data.body.projects).map(t => `
                        <label>
                            <input type="radio" name="project-filter-option" value="${t}" ${t === 'All' ? 'checked' : ''}>
                            ${t}
                        </label>
                    `).join('')}
                </div>
                <div id="projects-container">
                    ${renderProjects(data.body.projects)}
                </div>
            </section>
            <section id="travels-section">
                <h3 id="travels-header" class="section-header">Travels</h3>
                <div class="flex-slideshow">${renderTravels(data.body.travels)}</div>
            </section>
        </main>
    `;
    addHandlers(data);
}

// Render project-specific nav bar and project details
function renderProjectPage(project) {
    document.querySelector('body').innerHTML = `
        ${renderNavBar(['description', 'media'], project)}
        <main id="${project.id}-page">
            ${renderProjectDetails(project)}
        </main>
    `;
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
    if (!response.ok) {
        console.error(`Failed to retrieve '${dataTarget}' with status code ${response.status}`);
    }
    return response.json();
}).then(data => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentProjectId = urlParams.get('project');
    if (currentProjectId) {
        const matchingProjects = data.body.projects.filter(p => p.id === currentProjectId);
        if (matchingProjects.length === 1) {
            renderProjectPage(matchingProjects[0]);
        } else {
            console.error(`Zero or multiple projects found for id '${currentProjectId}'`);
            renderMainPage(data);
        }
    } else {
        renderMainPage(data);
    }
});
