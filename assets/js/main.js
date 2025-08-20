// Datos de productos de ejemplo
const products = [
    {
        id: 1,
        name: "Porta Sahumerios Artesanal",
        price: 1500,
        description: "Elegante porta sahumerios elaborado a mano con materiales naturales",
        image: "assets/images/portasahumerio.jpg"
    },
    {
        id: 2,
        name: "Porta Celular",
        price: 1800,
        description: "Porta sahumerios de cerámica con acabados rústicos",
        image: "assets/images/portacelular.jpg"
    },
    {
        id: 3,
        name: "Difusor",
        price: 2000,
        description: "Diseño único de porta sahumerios con detalles artesanales",
        image: "assets/images/difusor.jpg"
    },
    {
        id: 4,
        name: "Lampara de Sal",
        price: 2200,
        description: "Porta sahumerios con diseño especial y acabados premium",
        image: "assets/images/lamparadesal.jpg"
    },
    {
        id: 5,
        name: "Abanico Artesanal",
        price: 2200,
        description: "Porta sahumerios con diseño especial y acabados premium",
        image: "assets/images/abanicos.jpg"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const whatsappOrderBtn = document.getElementById('whatsapp-order');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const closeCartBtn = document.getElementById('close-cart');

// Display products
function displayProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="cta-button" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showCartNotification();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show cart notification
function showCartNotification() {
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
}

// Toggle cart modal
cartIcon.addEventListener('click', () => {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
});

// WhatsApp integration
whatsappOrderBtn.addEventListener('click', () => {
    const phoneNumber = '2996120756'; // Replace with actual WhatsApp number
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Generate WhatsApp message
function generateWhatsAppMessage() {
    const items = cart.map(item => 
        `${item.name} x${item.quantity} - $${item.price * item.quantity}`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return `Hola que tal? Me gustaria encargar estos productos \n\n${items}\n\n*Total: $${total}*`;
}

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close cart when clicking the close button
closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
        cartModal.style.display = 'none';
    }
});

// Send Email function
function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validación básica
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Por favor completa todos los campos');
        return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor ingresa un email válido');
        return;
    }

    // Crear el contenido del correo
    const subject = `Consulta de ${name}`;
    const body = `Nombre: ${name}
Email: ${email}

Mensaje:
${message}`;

    // Abrir el cliente de correo del usuario
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=artesaniasauca@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    
    // Limpiar el formulario
    document.getElementById('contactForm').reset();
    alert('¡Gracias por tu mensaje! Se abrirá tu cliente de correo para enviar la consulta.');
}

// Initialize
displayProducts();
updateCart();
