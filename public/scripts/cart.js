// Variable global para almacenar los productos en el carrito
const cart = [];

// Función para agregar un producto al carrito
function addToCart(productName, price) {
    // Comprueba si el producto ya está en el carrito
    const existingProduct = cart.find(product => product.name === productName);

    if (existingProduct) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        existingProduct.quantity++;
    } else {
        // Si el producto no está en el carrito, agrégalo
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
        });
    }

    // Actualiza la vista del carrito
    updateCartView();
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    const index = cart.findIndex(product => product.name === productName);

    if (index !== -1) {
        const product = cart[index];

        if (product.quantity > 1) {
            // Si hay más de una unidad del producto, decrementa la cantidad
            product.quantity--;
        } else {
            // Si solo hay una unidad del producto, elimínalo del carrito
            cart.splice(index, 1);
        }

        // Actualiza la vista del carrito
        updateCartView();
    }
}

// Función para actualizar la vista del carrito
function updateCartView() {
    const cartContainer = document.getElementById('cart-container');

    // Limpia el contenido actual del carrito
    cartContainer.innerHTML = '';

    // Itera a través de los productos en el carrito y muestra la información
    for (const product of cart) {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <p>${product.name} - $${product.price} x ${product.quantity}</p>
            <button data-product-name="${product.name}" class="remove-from-cart">Eliminar</button>
        `;
        cartContainer.appendChild(productItem);
    }
}

// Escucha eventos de clic para agregar o eliminar productos del carrito
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart-button')) {
        const productName = event.target.getAttribute('data-product-name');
        const price = parseFloat(event.target.getAttribute('data-product-price'));
        addToCart(productName, price);
    }

    if (event.target.classList.contains('remove-from-cart')) {
        const productName = event.target.getAttribute('data-product-name');
        removeFromCart(productName);
    }
});

// Actualiza la vista del carrito al cargar la página
updateCartView();
