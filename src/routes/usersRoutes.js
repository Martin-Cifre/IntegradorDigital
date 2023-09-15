 const express = require('express');
 const router = express.Router();
 const { body, check } = require('express-validator');
 const multer = require('multer');
 const path = require('path');
 const cloudinary = require('cloudinary').v2;
 const { CloudinaryStorage } = require('multer-storage-cloudinary');

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

 const validateCreateForm = [
    body('userName').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('apellido').notEmpty().withMessage('Debes completar el campo de apellido'),
    body('dni').notEmpty().isLength({min: 8}).withMessage('Debes completar el campo de apellido'),
    body('email')
        .notEmpty().withMessage('Debes completar con un email valido')
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').isLength({min: 8}).notEmpty().withMessage('Debes ingresar una contraseña con 8 dígitos mínimo')
];

const validateLogin = [
    check('email')
        .notEmpty().withMessage('Debes completar con un email valido')
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    check('password').isLength({min: 8}).notEmpty().withMessage('La contraseña que ingresaste es incorrecta')
];

 router.get('/', usersController.index);

 router.get('/login', usersController.login);

 router.post('/login',  validateLogin,  usersController.processLogin);

 router.get('/register', usersController.register);

 router.post('/register', upload.single('avatar'), validateCreateForm, usersController.create);

 router.get('/perfil', usersController.perfil);


 /*
 router.get('/carritoCompra', productosController.carritoCompra);

 router.post('/newGame')

 router.get('/:idProducto', );
 */

module.exports = router; 