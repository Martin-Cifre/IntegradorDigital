const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const usersController = require('../controllers/usersController');
const isAuthenticated = require('../middlewares/isAuthenticated'); 
const validateLoginForm = require('../middlewares/loginValidation');
const validateCreateForm = require('../middlewares/registerValidation')

// Configuración de Cloudinary y Multer
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar', 
    allowedFormats: ['jpg', 'png'], 
    transformation: [{ width: 150, height: 150, crop: 'limit' }], 
  },
});

const upload = multer();

// Rutas
router.get('/', usersController.index);

router.get('/login', usersController.login);

router.post('/login', validateLoginForm, usersController.processLogin);

router.get('/register', usersController.register);

router.post('/register', upload.single('avatar'), validateCreateForm, usersController.create);

router.get('/perfil', isAuthenticated, usersController.perfil);




 /*
 

 router.post('/newGame')

 router.get('/:idProducto', );
 */

 module.exports = router;