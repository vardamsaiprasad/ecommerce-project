# TASK 4 Implementation TODO

## Subtask 1: Product Detail Page
- [x] Create product.html with same header, navbar, footer as index.html
- [x] Modify scripts/products.js: Make product cards clickable to redirect to product.html?id=${product.id}
- [x] Modify scripts/products.js: Implement cart functionality (add to localStorage, update cart count)
- [x] Create scripts/product-detail.js: Read URL param, fetch product data, render image, name, price, description
- [x] Update styles/main.css: Add styles for product detail layout (big image, details on side, responsive)
- [x] Update scripts/app.js: Add function to update cart count from localStorage on page load

## Subtask 2: Interactive Features
- [x] Implement image zoom on hover/tap in product-detail.js and styles
- [x] Add product variations (size/color) in product-detail.js and styles
- [x] Add quantity selector (+/- buttons, min 1) in product-detail.js and styles
- [x] Live price update when quantity changes
- [x] Better Add-to-Cart feedback (message/animation, save quantity/variation)
- [x] Ensure mobile usability (touch-friendly, zoom/selectors work on phone)
- [x] Final testing: All interactions work, no console errors, cart persists after refresh

# TASK 5 Implementation TODO

## Subtask 1: Cart Icon Navigation
- [x] Edit index.html: Make cart icon clickable to link to cart.html
- [x] Edit product.html: Make cart icon clickable to link to cart.html

## Subtask 2: Cart Page Creation
- [x] Create cart.html with same header, navbar, footer as other pages
- [x] Create scripts/cart.js: Load and display cart items from localStorage
- [x] Create scripts/cart.js: Allow quantity increase/decrease with live total update
- [x] Create scripts/cart.js: Add remove button for each item
- [x] Create scripts/cart.js: Display cart total price dynamically
- [x] Create scripts/cart.js: Add "Continue Shopping" and "Proceed to Checkout" buttons

## Subtask 3: Code Cleanup
- [x] Remove duplicate updateCartCount from scripts/products.js
- [x] Remove duplicate updateCartCount from scripts/product-detail.js

## Subtask 4: Testing
- [x] Test cart persistence after refresh and across pages
- [x] Test dynamic cart count updates
- [x] Test cart page functionality (quantity, remove, total)
- [x] Ensure no UI changes from Task 4
- [x] Add cart page styles to main.css
