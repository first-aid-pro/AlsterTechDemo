// Simple product data (could come from a server)
const products = [
    { id: 'p1', name: 'AlsterTech Kopfhörer', price: 49.99, img: 'img/AlsterTech.jpeg' },
    { id: 'p2', name: 'AlsterTech Ladekabel', price: 9.99, img: 'img/AlsterTech2.jpeg' },
    { id: 'p3', name: 'AlsterTech Rucksack', price: 69.99, img: 'img/AlsterTech3.jpeg' },
    { id: 'p4', name: 'AlsterTech Tasse', price: 7.50, img: 'img/AlsterTech Background Removed.png' },
    { id: 'p5', name: 'AlsterTech Notizbuch', price: 12.00, img: 'img/AlsterTech3.jpeg' }
];

// Render products
const productsEl = document.getElementById('products');
products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <div class="price">${p.price.toFixed(2)} €</div>
        <button class="btn add" data-id="${p.id}">In den Warenkorb</button>
    `;
    productsEl.appendChild(card);
});

// Cart management (localStorage)
function getCart(){ return JSON.parse(localStorage.getItem('cart')||'{}'); }
function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }

function updateCartUI(){
    const cart = getCart();
    const itemsEl = document.getElementById('cartItems');
    itemsEl.innerHTML = '';
    let total = 0; let count = 0;
    for(const id in cart){
        const qty = cart[id];
        const p = products.find(x=>x.id===id);
        if(!p) continue;
        const li = document.createElement('li');
        li.textContent = `${p.name} × ${qty} — ${(p.price*qty).toFixed(2)} €`;
        itemsEl.appendChild(li);
        total += p.price*qty; count += qty;
    }
    document.getElementById('cartTotal').textContent = total.toFixed(2) + ' €';
    document.getElementById('cartCount').textContent = `(${count})`;
}

document.addEventListener('click', e => {
    if(e.target.matches('.add')){
        const id = e.target.dataset.id;
        const cart = getCart();
        cart[id] = (cart[id]||0)+1;
        saveCart(cart);
        updateCartUI();
    }
});

document.getElementById('checkoutBtn').addEventListener('click', ()=>{
    const cart = getCart();
    if(Object.keys(cart).length===0){ alert('Ihr Warenkorb ist leer.'); return; }
    // Very simple checkout simulation
    alert('Vielen Dank für Ihre Bestellung! (Simuliert)');
    localStorage.removeItem('cart');
    updateCartUI();
});

// Initial UI
updateCartUI();
