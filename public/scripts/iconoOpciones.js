const Usuario = require('../../src/database/models/Usuario'); // Asegúrate de proporcionar la ruta correcta

    function obtenerRolUsuario(idUsuario) {
      return Usuario.findOne({
        where: { id: idUsuario }, // Debes proporcionar el ID del usuario que deseas consultar
        attributes: ['rol'] // Obtén solo el atributo 'rol'
      })
      .then(usuario => {
        if (usuario) {
          return usuario.rol;
        } else {
          return null; // Maneja el caso en que el usuario no exista
        }
      })
      .catch(error => {
        console.error('Error al obtener el rol del usuario:', error);
        return null; // Maneja el error de consulta
      });
    }

    // Ejemplo de cómo usar la función
    const idUsuario = 1; // Reemplaza con el ID del usuario que deseas consultar
    obtenerRolUsuario(idUsuario)
      .then(rol => {
        if (rol) {
          if (rol === 'Creador') {
            // Mostrar elementos para creadores
            document.getElementById('crearProducto').style.display = 'block';
            document.getElementById('dashboard').style.display = 'block';
          } else {
            // Ocultar elementos para otros roles
            document.getElementById('crearProducto').style.display = 'none';
            document.getElementById('dashboard').style.display = 'none';
          }
        } else {
          // Ocultar elementos para Usuarios u otros casos en los que el rol no esté definido
          document.getElementById('crearProducto').style.display = 'none';
          document.getElementById('dashboard').style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error al obtener el rol del usuario:', error);
      });