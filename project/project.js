import addHandlers from '../interactions.js';
import renderProjectDetails from './components/projectdetails.js';
import renderNavBar from '../navbar.js';

// Render project-specific nav bar and project details
export default function renderProjectPage(data, project) {
    document.querySelector('body').innerHTML = `
        ${renderNavBar(['description', 'media'], project)}
        <main id="${project.id}-page">
            ${renderProjectDetails(project)}
        </main>
    `;
    addHandlers(data, true);
}
