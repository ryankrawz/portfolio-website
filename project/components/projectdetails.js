// Render project details for project-specific page
export default function renderProjectDetails(project) {
    return `
        <section id="description-section">
            <p id="${project.id}-desc" class="item-desc project-desc">${project.desc}</p>
        </section>
        <section id="media-section">
            ${project.media}
        </section>
    `;
}
