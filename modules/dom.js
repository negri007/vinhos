const elements = {
    wineName: document.getElementById('wineName'),
    wineDesc: document.getElementById('wineDesc'),
    winePrice: document.getElementById('winePrice'),
    wineGenre: document.getElementById('wineGenre'),
    winePhoto: document.getElementById('activeWinePhoto'),
    wineGrape: document.getElementById('wineGrape'),
    wineYear: document.getElementById('wineYear'),
    wineRegion: document.getElementById('wineRegion'),
    wineRegionLabel: document.getElementById('wineRegionLabel'),
    watermarkText: document.getElementById('watermarkText'),
    prevWineName: document.getElementById('prevWineName'),
    nextWineName: document.getElementById('nextWineName'),
    cartCount: document.getElementById('cartCount'),
    cartTotal: document.getElementById('cartTotal'),
    cartItemsContainer: document.getElementById('cartItems'),
    cartOverlay: document.getElementById('cartOverlay'),
    navItems: document.querySelectorAll('.nav-item'),
    featuredGrid: document.getElementById('featuredGrid')
};

function renderFocusWine(wine, prevWine, nextWine) {
    if (!wine) return;

    const activeInfo = document.getElementById('activeWineInfo');
    const activePhoto = document.getElementById('activeWinePhoto');
    
    activeInfo.style.opacity = '0';
    activePhoto.style.opacity = '0';

    // Preload image
    const img = new Image();
    img.src = wine.image;
    img.onload = () => {
        elements.wineName.innerHTML = wine.name.split(' ').join('<br/>');
        elements.wineDesc.textContent = wine.description;
        elements.winePrice.textContent = formatPrice(wine.price);
        elements.wineGenre.textContent = wine.category === 'espumante' ? 'Reserva Especial' : `Coleção ${wine.category}`;
        elements.winePhoto.src = wine.image;
        elements.wineGrape.textContent = wine.grape;
        elements.wineYear.textContent = wine.year;
        elements.wineRegion.textContent = wine.region.split(',')[0];
        elements.wineRegionLabel.textContent = wine.region;
        elements.watermarkText.textContent = wine.category;

        elements.prevWineName.textContent = prevWine.name;
        elements.nextWineName.textContent = nextWine.name;

        activeInfo.style.opacity = '1';
        activePhoto.style.opacity = '1';
    };
    
    // Safety timeout in case image fails to load
    setTimeout(() => {
        if (activePhoto.style.opacity === '0') {
             activeInfo.style.opacity = '1';
             activePhoto.style.opacity = '1';
        }
    }, 2000);
}

function updateCartUI(cart, onRemove) {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    elements.cartCount.textContent = totalItems;

    elements.cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        elements.cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p class="empty-cart-text">Adega Vazia</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-img-container">
                    <img src="${item.image}" class="cart-item-img">
                </div>
                <div class="cart-item-info">
                    <h5 class="cart-item-name font-serif italic">${item.name}</h5>
                    <p class="cart-item-price">${item.quantity}x ${formatPrice(item.price)}</p>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            `;
            elements.cartItemsContainer.appendChild(itemEl);
        });

        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                onRemove(parseInt(btn.getAttribute('data-id')));
            });
        });
    }

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    elements.cartTotal.textContent = formatPrice(total);
}

function renderTestimonials(testimonials) {
    const container = document.getElementById('testimonialsContainer');
    if (!container) return;
    
    container.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <p class="testimonial-text">"${t.text}"</p>
            <h6 class="testimonial-author">${t.name}</h6>
        </div>
    `).join('');
}

function renderFeaturedGrid(wines, onAddToCart) {
    if (!elements.featuredGrid) return;
    
    elements.featuredGrid.innerHTML = wines.map(wine => `
        <div class="product-card">
            <div class="product-image-wrap">
                <img src="${wine.image}" alt="${wine.name}" class="product-img">
                <button class="btn-quick-add" data-id="${wine.id}">+</button>
            </div>
            <div class="product-info">
                <span class="product-category">${wine.category}</span>
                <h4 class="product-name font-serif italic">${wine.name}</h4>
                <p class="product-price">${formatPrice(wine.price)}</p>
            </div>
        </div>
    `).join('');

    elements.featuredGrid.querySelectorAll('.btn-quick-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            onAddToCart(id);
        });
    });
}

function renderSearchResults(results, onSelect) {
    const container = document.getElementById('searchResults');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = '<div class="search-result-item"><span style="font-size: 10px; opacity: 0.5;">Nenhum vinho encontrado</span></div>';
    } else {
        container.innerHTML = results.map(wine => `
            <div class="search-result-item" data-id="${wine.id}">
                <img src="${wine.image}" class="search-result-img">
                <div class="search-result-info">
                    <p class="search-result-name">${wine.name}</p>
                    <p class="search-result-price">${formatPrice(wine.price)}</p>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                onSelect(parseInt(item.dataset.id));
                container.classList.remove('active');
            });
        });
    }
    
    container.classList.add('active');
}

