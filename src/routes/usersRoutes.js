 const express = require('express');
 const router = express.Router();
 const { body, check } = require('express-validator');
 const multer = require('multer');
 const path = require('path');
 const cloudinary = require('cloudinary').v2;
 const { CloudinaryStorage } = require('multer-storage-cloudinary');
 const registerValidation = require ('../middlewares/registerValidation')
 const usersController = require('./../controllers/usersController.js');
  

 const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

  cloudinary.config(cloudinaryConfig);
  

  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Asegúrate de que 'cloudinary' esté definido y configurado correctamente
    params: {
      folder: 'avatar',
      allowedFormats: ['.jpg', '.png'],
      filename: function (req, file, cb) {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename);
      },
    },
  });
  
  const upload = multer();

  const isAuthenticated = (req, res, next) => {
    if (req.session.userLogged) {
      // Si el usuario está autenticado, continúa con la solicitud
      next();
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      res.redirect('/login');
    }
  };

 router.get('/', usersController.index);

 router.get('/login', usersController.login);

 router.post('/login',  usersController.processLogin);

 router.get('/register', usersController.register);

 router.post('/register', upload.single('avatar'), usersController.create);

 router.get('/perfil', isAuthenticated, usersController.perfil);


 /*
 router.get('/carritoCompra', productosController.carritoCompra);

 router.post('/newGame')

 router.get('/:idProducto', );
 */

module.exports = router; 