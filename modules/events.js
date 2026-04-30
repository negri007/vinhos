function setupEventListeners(callbacks) {
    const { 
        onNext, 
        onPrev, 
        onAddToCart, 
        onToggleCart, 
        onFilter,
        onCheckout,
        onConfirmPurchase,
        onSearch
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

    const newsletterBtn = document.getElementById('newsletterBtn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', () => {
            const input = document.querySelector('.footer-input');
            if (input && input.value.includes('@')) {
                showToast("Inscrição realizada com sucesso!");
                input.value = '';
            } else {
                showToast("Por favor, insira um e-mail válido.");
            }
        });
    }

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                onSearch(query);
            } else {
                searchResults.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }
}
