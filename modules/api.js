function getWinesByCategory(category) {
    if (category === 'all') return [...wines];
    return wines.filter(w => w.category === category);
}

function getWineById(id) {
    return wines.find(w => w.id === id);
}
