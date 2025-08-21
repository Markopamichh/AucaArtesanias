// Datos de productos de ejemplo
const products = [
    {
        id: 1,
        name: "Porta Sahumerios Artesanal",
        price: 1500,
        description: "Elegante porta sahumerios elaborado a mano con materiales naturales",
        images: ["assets/images/portasahumerio.jpg", "assets/images/portasahumerio2.jpg"]
    },
    {
        id: 2,
        name: "Porta Celular",
        price: 1800,
        description: "Porta sahumerios de cerámica con acabados rústicos",
        images: ["assets/images/portacelular.jpg", "assets/images/portacelular.webp"]
    },
    {
        id: 3,
        name: "Difusor",
        price: 2000,
        description: "Diseño único de porta sahumerios con detalles artesanales",
        images: ["assets/images/difusor.jpg", "assets/images/difusor3.jpg"]
    },
    {
        id: 4,
        name: "Lampara de Sal",
        price: 2200,
        description: "Porta sahumerios con diseño especial y acabados premium",
        images: ["assets/images/lamparadesal.jpg", "assets/images/lamparadesal2.jpg"]
    },
    {
        id: 5,
        name: "Abanico Artesanal",
        price: 2200,
        description: "Porta sahumerios con diseño especial y acabados premium",
        images: ["assets/images/abanicos.jpg", "assets/images/abanico2.jpg"]
    },
    {
        id: 6,
        name: "Caja de Te",
        price: 2200,
        description: "Porta sahumerios con diseño especial y acabados premium",
        images: ["assets/images/cajadete.jpg", "assets/images/cajdeteabierta.jpg"]
    },
    {
        id: 7,
        name: "Caja de Te Grande",
        price: 2200,
        description: "Porta sahumerios con diseño especial y acabados premium",
        images: ["assets/images/cajadetebrande.jpg", "assets/images/cajadetegrande.jpg"]
    },
    {
        id: 8,
        name: "Fanal para Velas",
        price: 2200,
        description: "Porta sahumerios con diseño especial y acabados premium",
        images: ["assets/images/fanal1.jpg", "assets/images/fanal2.webp"]
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
            <div class="product-carousel" data-product-id="${product.id}">
                <div class="carousel-container">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image active">
                    <img src="${product.images[1]}" alt="${product.name}" class="product-image">
                </div>
                <div class="carousel-dots">
                    <span class="dot active" data-index="0"></span>
                    <span class="dot" data-index="1"></span>
                </div>
            </div>
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
    
    return `¡Holaa! Me interesa comprar estos productos \n\n${items}\n\n*Total: $${total}*`;
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

// Carousel functionality
function initCarousels() {
    document.querySelectorAll('.product-carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('.product-image');
        const dots = carousel.querySelectorAll('.dot');
        let currentIndex = 0;

        // Handle dot clicks
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                showImage(index);
            });
        });

        // Handle image clicks
        carousel.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        });

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            images[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
    });
}

// Initialize
displayProducts();
initCarousels();
updateCart();
