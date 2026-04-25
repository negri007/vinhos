function setupEventListeners(callbacks) {
    const { 
        onNext, 
        onPrev, 
        onAddToCart, 
        onToggleCart, 
        onFilter 
    } = callbacks;

    document.getElementById('nextWine').addEventListener('click', onNext);
    document.getElementById('prevWine').addEventListener('click', onPrev);
    document.getElementById('addToAdega').addEventListener('click', onAddToCart);
    
    document.getElementById('cartBtn').addEventListener('click', () => onToggleCart(true));
    document.getElementById('closeCart').addEventListener('click', () => onToggleCart(false));
    
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
