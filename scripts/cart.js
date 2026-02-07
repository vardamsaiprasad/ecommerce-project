// Cart page logic

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        updateTotal();
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = createCartItem(item, index);
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotal();
}

function createCartItem(item, index) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;

    const details = document.createElement('div');
    details.className = 'cart-item-details';

    const title = document.createElement('h3');
    title.textContent = item.title;

    const price = document.createElement('p');
    price.textContent = `₹${(item.price * 83).toFixed(2)}`;

    details.appendChild(title);
    details.appendChild(price);

    if (item.size && item.color) {
        const variations = document.createElement('p');
        variations.textContent = `Size: ${item.size}, Color: ${item.color}`;
        details.appendChild(variations);
    }

    const quantityDiv = document.createElement('div');
    quantityDiv.className = 'cart-item-quantity';

    const decreaseBtn = document.createElement('button');
    decreaseBtn.textContent = '-';
    decreaseBtn.addEventListener('click', () => updateQuantity(index, -1));

    const quantitySpan = document.createElement('span');
    quantitySpan.textContent = item.quantity;

    const increaseBtn = document.createElement('button');
    increaseBtn.textContent = '+';
    increaseBtn.addEventListener('click', () => updateQuantity(index, 1));

    quantityDiv.appendChild(decreaseBtn);
    quantityDiv.appendChild(quantitySpan);
    quantityDiv.appendChild(increaseBtn);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => removeItem(index));

    itemDiv.appendChild(img);
    itemDiv.appendChild(details);
    itemDiv.appendChild(quantityDiv);
    itemDiv.appendChild(removeBtn);

    return itemDiv;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadCart();
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity * 83), 0);
    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Event listeners
document.getElementById('continue-shopping').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('proceed-checkout').addEventListener('click', () => {
    alert('Checkout functionality not implemented yet.');
});

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
});
