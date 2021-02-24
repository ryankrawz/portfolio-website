// Render projects section
export default function renderProjects(projects) {
    return projects.map(p => `
        <a id="${p.id}-link" href="?project=${p.id}">${p.title}</a>
        <p id="${p.id}-desc" class="item-desc project-desc">
            ${p.tags.map(t => `<span id="${t[0].toLowerCase()}-tag">${t}</span>`).join('')}
        </p>
    `).join('');
}
