function setupEventListeners(callbacks) {
    const { 
        onNext, 
        onPrev, 
        onAddToCart, 
        onToggleCart, 
        onFilter,
        onCheckout,
        onConfirmPurchase
    } = callbacks;

    document.getElementById('nextWine').addEventListener('click', onNext);
    document.getElementById('prevWine').addEventListener('click', onPrev);
    document.getElementById('addToAdega').addEventListener('click', onAddToCart);
    
    document.getElementById('cartBtn').addEventListener('click', () => onToggleCart(true));
    document.getElementById('closeCart').addEventListener('click', () => onToggleCart(false));
    
    document.getElementById('checkoutBtn').addEventListener('click', onCheckout);
    document.getElementById('closePayment').addEventListener('click', () => {
        document.getElementById('paymentModal').classList.remove('active');
    });

    document.getElementById('confirmPurchase').addEventListener('click', onConfirmPurchase);

    document.querySelectorAll('.payment-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.payment-tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${target}Payment`).classList.add('active');
        });
    });
    
    elements.cartOverlay.addEventListener('click', (e) => {
        if (e.target === elements.cartOverlay) onToggleCart(false);
    });

    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            elements.navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            onFilter(category);
        });
    });
}
