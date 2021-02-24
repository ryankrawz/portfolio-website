// Render about section
export default function renderAbout(about) {
    return `
        <img id="about-image" src="${about.photo}" alt="${about.name}" width="18.75%">
        <span id="about-bio" class="item-desc">${about.desc}</span>
    `;
}
