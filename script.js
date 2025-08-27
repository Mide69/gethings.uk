let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    
    document.getElementById('searchInput').addEventListener('input', filterProducts);
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('locationFilter').addEventListener('change', filterProducts);
});

async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Failed to load products');
    }
}

async function filterProducts() {
    const search = document.getElementById('searchInput').value;
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;
    
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category !== 'all') params.append('category', category);
    if (location !== 'all') params.append('location', location);
    
    try {
        const response = await fetch(`/api/products?${params}`);
        const filtered = await response.json();
        displayProducts(filtered);
    } catch (error) {
        console.error('Failed to filter products');
    }
}

function displayProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    const count = document.getElementById('productCount');
    
    count.textContent = `${productsToShow.length} products`;
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-seller">by ${product.seller}</div>
                <div class="product-location">📍 ${product.location}, ${product.country}</div>
                <div class="product-rating">⭐ ${product.rating} rating</div>
                <div class="product-price">£${product.price}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    displayCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    displayCart();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    const isVisible = modal.style.display === 'block';
    
    if (isVisible) {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        displayCart();
    }
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">£${item.price} each</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                <button class="qty-btn" onclick="removeFromCart('${item.id}')" style="margin-left: 0.5rem; color: red;">×</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: £${total.toFixed(2)}\n\nThis is a demo - no payment processed.`);
    
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    toggleCart();
}