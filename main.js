function toggleVisibility(id) {
    let target = document.getElementById(id);
    if (target.style.display === 'block') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}

fetch('data.json').then(response => response.json()).then(data => {
    console.log(data);
	// render HTML here
});
