document.addEventListener('DOMContentLoaded', function () {
    const agregarAlCarritoBtn = document.getElementById('agregarAlCarrito');

    agregarAlCarritoBtn.addEventListener('click', async function () {
        const productoId = agregarAlCarritoBtn.getAttribute('data-product-id');
        const cantidad = 1; // Puedes ajustar la cantidad según tus necesidades

        try {
            const response = await fetch(`/agregar-al-carrito/${productoId}/${cantidad}`, {
                method: 'POST',
            });

            if (response.ok) {
                console.log('Producto agregado al carrito con éxito.');
                // Puedes realizar acciones adicionales, como actualizar la vista del carrito aquí
            } else {
                console.error('Error al agregar producto al carrito.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });
});
