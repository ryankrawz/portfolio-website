import renderMainPage from './main/main.js';
import renderProjectPage from './project/project.js';

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
            renderProjectPage(data, matchingProjects[0]);
        } else {
            console.error(`Zero or multiple projects found for id '${currentProjectId}'`);
            renderMainPage(data);
        }
    } else {
        renderMainPage(data);
    }
});
