// Product data with descriptions, variants, PDFs, and image galleries
const products = [
    {
        id: 'p1',
        name: 'tolle Kopfhörer',
        price: 49.99,
        soldOut: false,
        variantPrices: {
            'Schwarz': 49.99,
            'Weiß': 54.99,
            'Blau': 59.99
        },
        img: 'img/AlsterTech.jpeg',
        images: ['img/AlsterTech.jpeg', 'img/AlsterTech_side.jpeg', 'img/AlsterTech_top.jpeg'],
        variantImages: {
            'Schwarz': ['img/AlsterTech.jpeg', 'img/AlsterTech_side.jpeg'],
            'Weiß': ['img/AlsterTech_white.jpeg', 'img/AlsterTech_white_side.jpeg'],
            'Blau': ['img/AlsterTech_blue.jpeg', 'img/AlsterTech_blue_side.jpeg']
        },
        description: 'Hochwertige Kopfhörer mit sattem Klang und komfortablem Sitz.',
        variants: ['Schwarz', 'Weiß', 'Blau'],
        pdf: 'pdfs/Kopfhoerer.pdf'
    },
    {
        id: 'p2',
        name: 'AlsterTech Optik irgendwas',
        price: 9.99,
        soldOut: false,
        variantPrices: {
            'Lightning': 9.99,
            'USB-C': 11.99,
            'Micro-USB': 8.99
        },
        img: 'img/AlsterTech2.jpeg',
        images: ['img/AlsterTech2.jpeg', 'img/AlsterTech2_blue.jpeg'],
        variantImages: {
            'Lightning': ['img/AlsterTech2.jpeg'],
            'USB-C': ['img/AlsterTech2_usbC.jpeg'],
            'Micro-USB': ['img/AlsterTech2_micro.jpeg']
        },
        description: 'Robustes Ladekabel für alle Geräte mit schneller Ladefunktion.',
        variants: ['Lightning', 'USB-C', 'Micro-USB'],
        pdf: 'pdfs/Ladekabel.pdf'
    },
    {
        id: 'p3',
        name: 'AlsterTech Rucksack',
        price: 69.99,
        soldOut: true,
        variantPrices: {
            'Normal': 69.99,
            'XXL': 89.99
        },
        img: 'img/AlsterTech3.jpeg',
        images: ['img/AlsterTech3.jpeg', 'img/AlsterTech3_side.jpeg'],
        variantImages: {
            'Normal': ['img/AlsterTech3.jpeg', 'img/AlsterTech3_side.jpeg'],
            'XXL': ['img/AlsterTech3_xxl.jpeg', 'img/AlsterTech3_xxl_side.jpeg']
        },
        description: 'Geräumiger Rucksack mit mehreren Fächern und stylischem Design.',
        variants: ['Normal', 'XXL'],
        pdf: 'pdfs/Rucksack.pdf'
    },
    {
        id: 'p4',
        name: 'AlsterTech Tasse',
        price: 7.50,
        soldOut: true,
        variantPrices: {
            '300ml': 7.50,
            '500ml': 9.50
        },
        img: 'img/AlsterTech Background Removed.png',
        images: ['img/AlsterTech Background Removed.png', 'img/AlsterTech Tasse_alt.jpeg'],
        variantImages: {
            '300ml': ['img/AlsterTech Tasse_300.jpeg'],
            '500ml': ['img/AlsterTech Tasse_500.jpeg']
        },
        description: 'Keramiktasse mit hochwertigem Druck und verschiedenen Farben.',
        variants: ['300ml', '500ml'],
        pdf: 'pdfs/Tasse.pdf'
    },
    {
        id: 'p5',
        name: 'AlsterTech Notizbuch',
        price: 12.00,
        soldOut: true,
        variantPrices: {
            'Liniert': 12.00,
            'Blanko': 13.00,
            'Punktiert': 14.00
        },
        img: 'img/AlsterTech3.jpeg',
        images: ['img/AlsterTech3.jpeg', 'img/AlsterTech3_alt.jpeg'],
        variantImages: {
            'Liniert': ['img/AlsterTech3.jpeg'],
            'Blanko': ['img/AlsterTech3_blank.jpeg'],
            'Punktiert': ['img/AlsterTech3_punkt.jpeg']
        },
        description: 'Notizbuch mit stabilem Einband und hochwertigem Papier.',
        variants: ['Liniert', 'Blanko', 'Punktiert'],
        pdf: 'pdfs/Notizbuch.pdf'
    }
];

// Render products
const productsEl = document.getElementById('products');
products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        ${p.soldOut ? '<div class="sold-out-overlay">Ausverkauft</div>' : ''}
        <a href="product.html?id=${p.id}">
            <img src="${p.img}" alt="${p.name}">
        </a>
        <h4>${p.name}</h4>
        <div class="price">${p.price.toFixed(2)} €</div>
        ${p.soldOut ? '' : `<button class="btn add" data-id="${p.id}" data-variant="">In den Warenkorb</button>`}
        ${p.pdf ? `<a href="${p.pdf}" target="_blank" class="btn pdf-btn">PDF herunterladen</a>` : ''}
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
    let total = 0;
    let count = 0;

    for(const key in cart){
        const [id, variant] = key.split('|');
        const qty = cart[key];
        const p = products.find(x => x.id === id);
        if(!p) continue;
        const price = (p.variantPrices && variant && p.variantPrices[variant]) || p.price;
        const li = document.createElement('li');
        li.innerHTML = `
            ${p.name} ${variant ? '('+variant+')' : ''} — ${(price*qty).toFixed(2)} €
            <button class="cart-btn minus" data-id="${key}">−</button>
            <span>${qty}</span>
            <button class="cart-btn plus" data-id="${key}">+</button>
            <button class="cart-btn remove" data-id="${key}">x</button>
        `;
        itemsEl.appendChild(li);
        total += price*qty;
        count += qty;
    }

    document.getElementById('cartTotal').textContent = total.toFixed(2) + ' €';
    document.getElementById('cartCount').textContent = `(${count})`;
}

// Handle add, plus, minus, remove buttons
document.addEventListener('click', e => {
    const cart = getCart();
    const key = e.target.dataset.id;

    if(e.target.matches('.add')){
        const id = key;
        const variant = e.target.dataset.variant || '';
        const cartKey = variant ? `${id}|${variant}` : id;
        cart[cartKey] = (cart[cartKey]||0)+1;
    }
    else if(e.target.matches('.plus')){
        cart[key] = (cart[key]||0)+1;
    }
    else if(e.target.matches('.minus')){
        if(cart[key] > 1){
            cart[key]--;
        } else {
            delete cart[key];
        }
    }
    else if(e.target.matches('.remove')){
        delete cart[key];
    }

    saveCart(cart);
    updateCartUI();
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
