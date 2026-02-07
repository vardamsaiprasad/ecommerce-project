// Product fetching and rendering logic

const productGrid = document.getElementById('product-grid');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        showError();
    } finally {
        hideLoading();
    }
}

function displayProducts(products) {
    productGrid.innerHTML = ''; // Clear any existing content
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    img.loading = 'lazy'; // Lazy loading for performance

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `₹${(product.price * 83).toFixed(2)}`;

    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click
        addToCart(product);
    });

    // Make the entire card clickable except the button
    card.addEventListener('click', () => {
        window.location.href = `product.html?id=${product.id}`;
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Added ${product.title} to cart!`);
}



function hideLoading() {
    loading.style.display = 'none';
}

function showError() {
    error.style.display = 'block';
}

// Fetch products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);
