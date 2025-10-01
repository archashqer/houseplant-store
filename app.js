// PlantParadise E-commerce Application
// A modern React-inspired vanilla JavaScript implementation

// Application State Management (Redux-inspired)
class Store {
    constructor(initialState = {}) {
        this.state = {
            cart: {
                items: [],
                totalQuantity: 0,
                totalCost: 0
            },
            currentPage: 'landing',
            ...initialState
        };
        this.listeners = [];
        this.loadCartFromStorage();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.saveCartToStorage();
        this.listeners.forEach(listener => listener(this.state));
    }

    getState() {
        return this.state;
    }

    reducer(state, action) {
        switch (action.type) {
            case 'ADD_TO_CART':
                return this.addToCart(state, action.payload);
            case 'REMOVE_FROM_CART':
                return this.removeFromCart(state, action.payload);
            case 'UPDATE_QUANTITY':
                return this.updateQuantity(state, action.payload);
            case 'SET_PAGE':
                return { ...state, currentPage: action.payload };
            default:
                return state;
        }
    }

    addToCart(state, plant) {
        const existingItem = state.cart.items.find(item => item.id === plant.id);
        let newItems;

        if (existingItem) {
            newItems = state.cart.items.map(item =>
                item.id === plant.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newItems = [...state.cart.items, { ...plant, quantity: 1 }];
        }

        const totalQuantity = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalCost = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return {
            ...state,
            cart: {
                items: newItems,
                totalQuantity,
                totalCost
            }
        };
    }

    removeFromCart(state, plantId) {
        const newItems = state.cart.items.filter(item => item.id !== plantId);
        const totalQuantity = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalCost = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return {
            ...state,
            cart: {
                items: newItems,
                totalQuantity,
                totalCost
            }
        };
    }

    updateQuantity(state, { plantId, quantity }) {
        if (quantity <= 0) {
            return this.removeFromCart(state, plantId);
        }

        const newItems = state.cart.items.map(item =>
            item.id === plantId ? { ...item, quantity } : item
        );

        const totalQuantity = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalCost = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return {
            ...state,
            cart: {
                items: newItems,
                totalQuantity,
                totalCost
            }
        };
    }

    saveCartToStorage() {
        try {
            localStorage.setItem('plantparadise_cart', JSON.stringify(this.state.cart));
        } catch (error) {
            console.warn('Could not save cart to localStorage:', error);
        }
    }

    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('plantparadise_cart');
            if (savedCart) {
                this.state.cart = JSON.parse(savedCart);
            }
        } catch (error) {
            console.warn('Could not load cart from localStorage:', error);
        }
    }
}

// Plant Data
const plantsData = [
    {
        id: 1,
        name: "Snake Plant",
        scientificName: "Sansevieria trifasciata",
        category: "Air Purifying",
        price: 29.99,
        image: "🐍🌿",
        description: "Perfect for beginners, this hardy plant purifies air naturally and thrives in low light conditions."
    },
    {
        id: 2,
        name: "Pothos",
        scientificName: "Epipremnum aureum",
        category: "Low Light",
        price: 19.99,
        image: "🌿",
        description: "A trailing vine that thrives in low light and is extremely easy to care for. Great for hanging baskets."
    },
    {
        id: 3,
        name: "Monstera Deliciosa",
        scientificName: "Monstera deliciosa",
        category: "Colorful Foliage",
        price: 39.99,
        image: "🌱",
        description: "Stunning split leaves make this Instagram-worthy plant a perfect statement piece for any room."
    },
    {
        id: 4,
        name: "Peace Lily",
        scientificName: "Spathiphyllum wallisii",
        category: "Air Purifying",
        price: 24.99,
        image: "🕊️🌸",
        description: "Beautiful white flowers and excellent air purification make this plant both decorative and functional."
    },
    {
        id: 5,
        name: "ZZ Plant",
        scientificName: "Zamioculcas zamiifolia",
        category: "Low Light",
        price: 34.99,
        image: "🌿",
        description: "Nearly indestructible and perfect for offices. This glossy-leafed plant tolerates neglect beautifully."
    },
    {
        id: 6,
        name: "Fiddle Leaf Fig",
        scientificName: "Ficus lyrata",
        category: "Colorful Foliage",
        price: 49.99,
        image: "🌳",
        description: "Large, dramatic violin-shaped leaves create a stunning focal point in any modern living space."
    }
];

// Initialize Store
const store = new Store();

// UI State Management
class UIManager {
    constructor(store) {
        this.store = store;
        this.currentPage = 'landing';
        this.addedToCartItems = new Set();

        // Subscribe to store changes
        store.subscribe((state) => {
            this.updateCartDisplay(state.cart);
            this.updateCartPage(state.cart);
        });
    }

    init() {
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartDisplay(this.store.getState().cart);
        this.showPage('landing');
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('homeBtn').addEventListener('click', () => this.showPage('landing'));
        document.getElementById('productsBtn').addEventListener('click', () => this.showPage('products'));
        document.getElementById('cartBtn').addEventListener('click', () => this.showPage('cart'));
        document.getElementById('getStartedBtn').addEventListener('click', () => this.showPage('products'));

        // Cart page navigation
        document.getElementById('continueShopping').addEventListener('click', () => this.showPage('products'));
        document.getElementById('continueShoppingFromCart').addEventListener('click', () => this.showPage('products'));

        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => this.showCheckoutMessage());
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageName + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        if (pageName === 'landing') {
            document.getElementById('homeBtn').classList.add('active');
        } else if (pageName === 'products') {
            document.getElementById('productsBtn').classList.add('active');
        } else if (pageName === 'cart') {
            document.getElementById('cartBtn').classList.add('active');
        }

        this.currentPage = pageName;
        this.store.dispatch({ type: 'SET_PAGE', payload: pageName });
    }

    renderProducts() {
        // Group plants by category
        const categories = {
            'Air Purifying': document.getElementById('airPurifyingPlants'),
            'Low Light': document.getElementById('lowLightPlants'),
            'Colorful Foliage': document.getElementById('colorfulFoliagePlants')
        };

        plantsData.forEach(plant => {
            const plantCard = this.createProductCard(plant);
            const categoryContainer = categories[plant.category];
            if (categoryContainer) {
                categoryContainer.appendChild(plantCard);
            }
        });
    }

    createProductCard(plant) {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';

        const isInCart = this.addedToCartItems.has(plant.id);
        const buttonText = isInCart ? 'Added to Cart ✓' : 'Add to Cart';
        const buttonClass = isInCart ? 'add-to-cart-btn disabled' : 'add-to-cart-btn';

        card.innerHTML = `
            <div class="product-image">${plant.image}</div>
            <div class="product-info">
                <h3 class="product-name">${plant.name}</h3>
                <p class="product-scientific">${plant.scientificName}</p>
                <span class="product-category">${plant.category}</span>
                <p class="product-description">${plant.description}</p>
                <div class="product-price">$${plant.price.toFixed(2)}</div>
                <button class="${buttonClass}" data-plant-id="${plant.id}" ${isInCart ? 'disabled' : ''}>
                    <span>${buttonText}</span>
                    ${!isInCart ? '<span class="button-icon">🛒</span>' : ''}
                </button>
            </div>
        `;

        // Add event listener to the add-to-cart button
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', (e) => {
            if (!e.target.disabled) {
                this.addToCart(plant);
            }
        });

        return card;
    }

    addToCart(plant) {
        this.store.dispatch({ type: 'ADD_TO_CART', payload: plant });
        this.addedToCartItems.add(plant.id);

        // Update the specific button
        const button = document.querySelector(`[data-plant-id="${plant.id}"]`);
        if (button) {
            button.innerHTML = '<span>Added to Cart ✓</span>';
            button.disabled = true;
            button.classList.add('disabled');
        }

        this.showNotification(`${plant.name} added to cart successfully!`);
        this.animateCartIcon();
    }

    updateCartDisplay(cart) {
        const cartCountElement = document.getElementById('cartCount');
        cartCountElement.textContent = cart.totalQuantity;

        if (cart.totalQuantity > 0) {
            cartCountElement.style.display = 'flex';
        } else {
            cartCountElement.style.display = 'none';
        }
    }

    updateCartPage(cart) {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartEmptyElement = document.getElementById('cartEmpty');
        const cartSummaryElement = document.getElementById('cartSummary');

        if (cart.items.length === 0) {
            cartItemsContainer.innerHTML = '';
            cartEmptyElement.style.display = 'block';
            cartSummaryElement.style.display = 'none';
        } else {
            cartEmptyElement.style.display = 'none';
            cartSummaryElement.style.display = 'block';
            this.renderCartItems(cart.items);
            this.updateCartSummary(cart);
        }
    }

    renderCartItems(items) {
        const container = document.getElementById('cartItems');
        container.innerHTML = '';

        items.forEach(item => {
            const cartItem = this.createCartItem(item);
            container.appendChild(cartItem);
        });
    }

    createCartItem(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item fade-in';

        cartItem.innerHTML = `
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn decrease" data-plant-id="${item.id}">−</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn increase" data-plant-id="${item.id}">+</button>
            </div>
            <button class="delete-btn" data-plant-id="${item.id}">🗑️</button>
        `;

        // Add event listeners
        const decreaseBtn = cartItem.querySelector('.decrease');
        const increaseBtn = cartItem.querySelector('.increase');
        const deleteBtn = cartItem.querySelector('.delete-btn');

        decreaseBtn.addEventListener('click', () => {
            const newQuantity = item.quantity - 1;
            if (newQuantity <= 0) {
                this.removeFromCart(item.id);
            } else {
                this.updateQuantity(item.id, newQuantity);
            }
        });

        increaseBtn.addEventListener('click', () => {
            this.updateQuantity(item.id, item.quantity + 1);
        });

        deleteBtn.addEventListener('click', () => {
            this.removeFromCart(item.id);
        });

        return cartItem;
    }

    updateQuantity(plantId, quantity) {
        this.store.dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { plantId, quantity }
        });
    }

    removeFromCart(plantId) {
        this.store.dispatch({ type: 'REMOVE_FROM_CART', payload: plantId });
        this.addedToCartItems.delete(plantId);

        // Re-enable the add to cart button if we're on products page
        const button = document.querySelector(`[data-plant-id="${plantId}"]`);
        if (button && button.classList.contains('add-to-cart-btn')) {
            button.innerHTML = '<span>Add to Cart</span><span class="button-icon">🛒</span>';
            button.disabled = false;
            button.classList.remove('disabled');
        }

        const plant = plantsData.find(p => p.id === plantId);
        if (plant) {
            this.showNotification(`${plant.name} removed from cart.`);
        }
    }

    updateCartSummary(cart) {
        document.getElementById('totalItems').textContent = cart.totalQuantity;
        document.getElementById('totalCost').textContent = `$${cart.totalCost.toFixed(2)}`;
    }

    showCheckoutMessage() {
        this.showNotification('Checkout feature coming soon! Thank you for shopping with PlantParadise! 🌱');
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = notification.querySelector('.notification-text');
        const closeBtn = notification.querySelector('.notification-close');

        notificationText.textContent = message;
        notification.classList.add('show');

        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);

        // Close button functionality
        closeBtn.onclick = () => {
            notification.classList.remove('show');
        };
    }

    animateCartIcon() {
        const cartCount = document.getElementById('cartCount');
        cartCount.style.animation = 'none';
        setTimeout(() => {
            cartCount.style.animation = 'pulse 0.3s ease-in-out';
        }, 10);
    }
}

// Performance and Accessibility Enhancements
class EnhancementManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
    }

    setupKeyboardNavigation() {
        // Enable keyboard navigation for buttons
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const activeElement = document.activeElement;
                if (activeElement.tagName === 'BUTTON') {
                    e.preventDefault();
                    activeElement.click();
                }
            }
        });
    }

    setupIntersectionObserver() {
        // Animate elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe product cards and other elements
        document.querySelectorAll('.product-card, .cart-item, .category-group').forEach(el => {
            observer.observe(el);
        });
    }

    setupPerformanceOptimizations() {
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        // Handle responsive layout adjustments
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile-layout', isMobile);
    }
}

// Error Handling and Logging
class ErrorHandler {
    constructor() {
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Application Error:', e.error);
            this.showErrorMessage('Something went wrong. Please refresh the page.');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            this.showErrorMessage('Something went wrong. Please try again.');
        });
    }

    showErrorMessage(message) {
        // Show user-friendly error message
        const notification = document.getElementById('notification');
        if (notification) {
            const notificationText = notification.querySelector('.notification-text');
            notificationText.textContent = message;
            notification.style.borderLeftColor = '#dc3545';
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
                notification.style.borderLeftColor = '#28a745';
            }, 4000);
        }
    }
}

// Application Initialization
class PlantParadiseApp {
    constructor() {
        this.store = store;
        this.uiManager = new UIManager(this.store);
        this.enhancementManager = new EnhancementManager();
        this.errorHandler = new ErrorHandler();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.startApp();
            });
        } else {
            this.startApp();
        }
    }

    startApp() {
        try {
            this.uiManager.init();
            console.log('🌱 PlantParadise application initialized successfully!');

            // Add some fun console art
            console.log(`
            🌱 Welcome to PlantParadise! 🌱
            ================================
            A modern e-commerce experience for plant lovers
            Built with vanilla JavaScript and modern web standards

            Features:
            ✅ Responsive design
            ✅ Shopping cart functionality  
            ✅ State management
            ✅ Accessibility support
            ✅ Performance optimizations

            Happy plant shopping! 🛒🌿
            `);
        } catch (error) {
            console.error('Failed to initialize PlantParadise:', error);
            this.errorHandler.showErrorMessage('Failed to load the application. Please refresh the page.');
        }
    }
}

// Initialize the application
const app = new PlantParadiseApp();
app.init();

// Export for potential testing or external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PlantParadiseApp, Store, plantsData };
}