// Capitalize first letter of string
export function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// Form list of tags from project data
export function getTags(projects) {
    const tagSet = new Set(['All']);
    for (let p of projects) {
        for (let t of p.tags) {
            tagSet.add(t);
        }
    }
    return Array.from(tagSet);
}

// Hide or display element based on current state
export function toggleVisibility(id) {
    const target = document.getElementById(id);
    if (target.style.display === 'block') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}
