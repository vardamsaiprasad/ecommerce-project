// Product detail page logic

let currentProduct = null;
let currentQuantity = 1;
let currentSize = 'Small';
let currentColor = 'Red';

async function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('Product ID not found');
        return;
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const product = await response.json();
        currentProduct = product;
        renderProduct(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        showError('Failed to load product. Please try again.');
    }
}

function renderProduct(product) {
    document.getElementById('product-img').src = product.image;
    document.getElementById('product-img').alt = product.title;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = `₹${(product.price * 83).toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    updatePrice();
}

function updatePrice() {
    const basePrice = currentProduct.price;
    const totalPrice = basePrice * currentQuantity;
    document.getElementById('product-price').textContent = `₹${totalPrice.toFixed(2)}`;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.fontSize = '1.2rem';
    document.getElementById('product-detail').appendChild(errorDiv);
}

// Quantity selector
document.getElementById('decrease-qty').addEventListener('click', () => {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantity').textContent = currentQuantity;
        updatePrice();
    }
});

document.getElementById('increase-qty').addEventListener('click', () => {
    currentQuantity++;
    document.getElementById('quantity').textContent = currentQuantity;
    updatePrice();
});

// Variations
document.getElementById('size-select').addEventListener('change', (e) => {
    currentSize = e.target.value;
});

document.getElementById('color-select').addEventListener('change', (e) => {
    currentColor = e.target.value;
});

// Image zoom
const productImg = document.getElementById('product-img');
let isZoomed = false;

productImg.addEventListener('click', () => {
    if (isZoomed) {
        productImg.style.transform = 'scale(1)';
        productImg.style.cursor = 'zoom-in';
        isZoomed = false;
    } else {
        productImg.style.transform = 'scale(1.5)';
        productImg.style.cursor = 'zoom-out';
        isZoomed = true;
    }
});

// Touch support for mobile zoom
productImg.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (isZoomed) {
        productImg.style.transform = 'scale(1)';
        productImg.style.cursor = 'zoom-in';
        isZoomed = false;
    } else {
        productImg.style.transform = 'scale(1.5)';
        productImg.style.cursor = 'zoom-out';
        isZoomed = true;
    }
});

// Add to cart
document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    if (!currentProduct) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = {
        id: currentProduct.id,
        title: currentProduct.title,
        price: currentProduct.price,
        image: currentProduct.image,
        quantity: currentQuantity,
        size: currentSize,
        color: currentColor
    };

    // Check if item with same variations exists
    const existingItemIndex = cart.findIndex(item =>
        item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += currentQuantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show feedback
    const feedback = document.getElementById('cart-feedback');
    feedback.style.display = 'block';
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
});

// Load product on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
});
