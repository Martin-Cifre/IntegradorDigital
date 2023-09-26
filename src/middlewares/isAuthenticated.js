module.exports = (req, res, next) => {
    if (req.session && req.session.userLogged) {
      // Si el usuario está autenticado, continúa con la solicitud
      next();
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      res.redirect('/login'); // Puedes cambiar la ruta de redirección según tus necesidades
    }
  };