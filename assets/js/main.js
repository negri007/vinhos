let cart = [];
let currentIndex = 0;
let filteredWines = getWinesByCategory('all');

function init() {
    refreshDisplay();
    renderTestimonials(testimonials);
    
    setupEventListeners({
        onNext: () => {
            currentIndex = (currentIndex + 1) % filteredWines.length;
            refreshDisplay();
        },
        onPrev: () => {
            currentIndex = (currentIndex - 1 + filteredWines.length) % filteredWines.length;
            refreshDisplay();
        },
        onAddToCart: () => {
            const wine = filteredWines[currentIndex];
            addToCart(wine.id);
        },
        onToggleCart: (isOpen) => {
            if (isOpen) elements.cartOverlay.classList.add('active');
            else elements.cartOverlay.classList.remove('active');
        },
        onFilter: (category) => {
            filteredWines = getWinesByCategory(category);
            currentIndex = 0;
            refreshDisplay();
        },
        onCheckout: () => {
            if (cart.length === 0) {
                showToast("Sua adega está vazia.");
                return;
            }
            elements.cartOverlay.classList.remove('active');
            document.getElementById('paymentModal').classList.add('active');
        },
        onConfirmPurchase: () => {
            showToast("Reserva confirmada com sucesso!");
            document.getElementById('paymentModal').classList.remove('active');
            cart = [];
            updateCartUI(cart, removeFromCart);
        }
    });

    updateCartUI(cart, removeFromCart);
}

function refreshDisplay() {
    if (filteredWines.length === 0) return;
    
    const wine = filteredWines[currentIndex];
    const prevWine = filteredWines[(currentIndex - 1 + filteredWines.length) % filteredWines.length];
    const nextWine = filteredWines[(currentIndex + 1) % filteredWines.length];
    
    renderFocusWine(wine, prevWine, nextWine);
}

function addToCart(id) {
    const wine = getWineById(id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...wine, quantity: 1 });
    }

    updateCartUI(cart, removeFromCart);
    showToast(`${wine.name} adicionado à sua adega!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI(cart, removeFromCart);
}

document.addEventListener('DOMContentLoaded', init);
