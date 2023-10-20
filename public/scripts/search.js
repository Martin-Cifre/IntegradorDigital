$('#searchInput').keypress(function (e) {
    if (e.which === 13) { // 13 es el código de tecla "Enter"
        performSearch();
    }
});

// Escucha el evento click del botón de búsqueda
$('#searchButton').click(function (e) {
    e.preventDefault(); // Evita que el formulario se envíe por defecto
    performSearch();
});

function performSearch() {
    const searchTerm = $('#searchInput').val().toLowerCase();

    // Realiza una solicitud AJAX para buscar el juego en la base de datos
    $.ajax({
        url: '/usersRoutes/search',
        method: 'POST',
        data: { searchTerm: searchTerm },
        success: function (juegoEncontrado) {
            if (juegoEncontrado) {
                // Redirige al usuario a la vista de detalle del producto con el ID del juego encontrado
                window.location.href = `/product/detalle/${juegoEncontrado.id}`;
            } else {
                alert('Producto no encontrado');
            }
        },
        error: function () {
            console.error('Error en la solicitud AJAX');
        }
    });
}