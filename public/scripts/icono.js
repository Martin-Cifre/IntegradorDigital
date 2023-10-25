const userIcon = document.getElementById("user-icon");
const menu = document.getElementById("menu");

userIcon.addEventListener("click", function() {
    // Alternar la visibilidad del menú al hacer clic en el icono
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
});

// Agregar un evento para cerrar el menú cuando se hace clic en cualquier lugar fuera del menú
document.addEventListener("click", function(event) {
    if (event.target !== userIcon && event.target !== menu) {
        menu.style.display = "none";
    }
});

// Detener la propagación de clics dentro del menú para que no se cierre al hacer clic en el menú mismo
menu.addEventListener("click", function(event) {
    event.stopPropagation();
});