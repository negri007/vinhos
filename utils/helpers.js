let toastTimeout;

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('active');
    
    if (toastTimeout) clearTimeout(toastTimeout);
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

function formatPrice(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}
