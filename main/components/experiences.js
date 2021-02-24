// Render experiences section
export default function renderExperiences(experiences) {
    return experiences.map(e => `
        <div class="flex-container">
            <img id="${e.id}-img" src="${e.photo}" alt="${e.title}" width="11.7%">
            <span id="${e.id}-desc" class="item-desc">${e.desc}</span>
        </div>
    `).join('');
}
