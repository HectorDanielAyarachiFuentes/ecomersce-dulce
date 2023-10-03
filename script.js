const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const checkoutButton = document.querySelector('.checkout');

let cart = [];
let total = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        // Buscar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        total += productPrice;
        updateCartUI();
    });
});

cartItemsList.addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
        const productName = event.target.getAttribute('data-product');
        const productPrice = parseFloat(event.target.getAttribute('data-price'));
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                existingProduct.quantity--;
            } else {
                cart = cart.filter(item => item.name !== productName);
            }
            total -= productPrice;
            updateCartUI();
        }
    }
});

checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Total amount to pay: $${total.toFixed(2)}`);
        cart = [];
        total = 0;
        updateCartUI();
    } else {
        alert('Your cart is empty.');
    }
});

function updateCartUI() {
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span class="remove-item" data-product="${item.name}" data-price="${item.price}">Remove</span>
        `;
        cartItemsList.appendChild(cartItem);
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
}