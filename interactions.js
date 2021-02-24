import renderExperiences from './main/components/experiences.js';
import renderProjects from './main/components/projects.js';
import { toggleVisibility } from './utilities.js';

// Add event handlers to main page
export default function addHandlers(data, onProject=false) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentProjectId = urlParams.get('project');
    
    // Toggle visibility of nav menu on click
    document.querySelector('button[class="nav-button open-nav"]').addEventListener('click', function(event) {
        toggleVisibility('nav-menu');
    });

    if (!onProject) {
        // Search news by user input
        document.querySelector('input[id="experiences-search"]').addEventListener('input', function(event) {
            const searchExp = new RegExp(`${event.target.value}`, 'i');
            const matchingExperiences = data.body.experiences.filter(e => searchExp.test(e.title));
            document.querySelector('#experiences-container').innerHTML = renderExperiences(matchingExperiences);
        });

        // Filter projects by radio button
        const projectRadioButtons = document.querySelectorAll('input[name="project-filter-option"]');
        projectRadioButtons.forEach(b => b.addEventListener('change', function(event) {
            const projectsContainer = document.querySelector('#projects-container');
            if (event.target.value === 'All') {
                projectsContainer.innerHTML = renderProjects(data.body.projects);
            } else {
                const matchingProjects = data.body.projects.filter(p => p.tags.includes(event.target.value));
                projectsContainer.innerHTML = renderProjects(matchingProjects);
            }
        }));
    }
}
