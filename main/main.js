import addHandlers from '../interactions.js';
import { getTags } from '../utilities.js';
import renderAbout from './components/about.js';
import renderExperiences from './components/experiences.js';
import renderNavBar from '../navbar.js';
import renderProjects from './components/projects.js';
import renderTravels from './components/travels.js';

// Render nav bar and all sections of page
export default function renderMainPage(data) {
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
                <div id="experiences-container">
                    ${renderExperiences(data.body.experiences)}
                </div>
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
