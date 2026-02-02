<<<<<<< HEAD
console.log("E-Commerce Website Loaded");
=======
// Product data
const products = [
  { id: 1, name: "Wireless Headphones", price: 999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", description: "High-quality wireless headphones with noise cancellation." },
  { id: 2, name: "Smart Watch", price: 1499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop", description: "Feature-rich smart watch with health tracking." },
  { id: 3, name: "Sneakers", price: 2999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", description: "Comfortable and stylish sneakers for everyday wear." },
  { id: 4, name: "Laptop", price: 49999, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop", description: "Powerful laptop for work and entertainment." },
  { id: 5, name: "Bluetooth Speaker", price: 1999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", description: "Portable Bluetooth speaker with excellent sound quality." },
  { id: 6, name: "Fitness Tracker", price: 2499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop", description: "Advanced fitness tracker with heart rate monitoring." }
];

// Authentication
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load product details if on product-details.html
if (window.location.pathname.includes('product-details.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);
  if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `₹${product.price}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('add-to-cart-btn').addEventListener('click', () => addToCart(productId));
  }
}

// Load cart if on cart.html
if (window.location.pathname.includes('cart.html')) {
  loadCart();
}

function loadCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.innerHTML = '';
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" width="50">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  cartTotal.innerHTML = `<h3>Total: ₹${total}</h3>`;
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCart();
}

// Checkout
document.getElementById('checkout-btn')?.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Checkout functionality not implemented yet. This is a demo.');
});

// Add to cart function
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartLink = document.querySelector('nav a[href*="cart"]');
  if (cartLink) {
    cartLink.textContent = `Cart (${cartCount})`;
  }
}

// Add to cart from homepage
document.querySelectorAll('.card button').forEach(button => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.getAttribute('data-id'));
    addToCart(productId);
  });
});

// Search functionality
document.getElementById('search-btn')?.addEventListener('click', performSearch);
document.getElementById('search-input')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
});

function performSearch() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = name.includes(query) ? 'block' : 'none';
  });
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}

// Initialize
updateCartCount();
console.log("E-Commerce App Ready for Deployment");
>>>>>>> d987f4bf1f4930bbc47d1ec927059232532ce95b
