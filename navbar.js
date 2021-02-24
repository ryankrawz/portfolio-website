import { capitalize } from './utilities.js';

// Render nav bar for main or project-specific page
export default function renderNavBar(headings, project=null) {
    const whichPage = project ? project.id : 'home';
    return `
        <button class="nav-button open-nav">
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
                ${project ? `<a id="more-details-option" href="${project.link}" target="_blank"><button class="nav-button">More Details</button></a>` : ''}
            </nav>
        </div>
    `;
}
