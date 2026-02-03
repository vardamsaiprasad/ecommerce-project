console.log("E-Commerce Website Loaded");

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.navbar nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});
