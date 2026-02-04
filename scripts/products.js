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
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.addEventListener('click', () => {
        // Placeholder for add to cart functionality
        alert(`Added ${product.title} to cart!`);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError() {
    error.style.display = 'block';
}

// Fetch products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);
