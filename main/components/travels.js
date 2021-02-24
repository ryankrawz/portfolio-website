// Render travels section
export default function renderTravels(travels) {
    return travels.map(t => `
        <div class="slideshow-${t.media.length}">
            <h3 id="${t.location.toLowerCase()}-title">${t.location}</h3>
            ${t.media.map(m => `<img src="${m.link}" alt="${t.location}" width="${m.width}">`).join('')}
        </div>
    `).join('');
}
