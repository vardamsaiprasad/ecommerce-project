console.log("E-Commerce Website Loaded");

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.navbar nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Cart functionality
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
