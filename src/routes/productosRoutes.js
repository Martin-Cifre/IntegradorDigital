const productosController = require('../controllers/productosController.js');
 
 const express = require('express');
 const router = express.Router();
 const multer = require('multer');
 const path = require ("path");
 const cloudinary = require('cloudinary').v2;
 const { CloudinaryStorage } = require('multer-storage-cloudinary');

  const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  };

  cloudinary.config(cloudinaryConfig);
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Asegúrate de que 'cloudinary' esté definido y configurado correctamente
    params: {
      folder: 'productos',
      allowedFormats: ['.jpg', '.png'],
      filename: function (req, file, cb) {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename);
      },
    },
  });
  
  const upload = multer();
//  router.get('/prueba', productosController.producto);

router.get('/search', productosController.search);

 router.get('/detalle/:id', productosController.productosDetalle);

 router.get('/edit/:idProductoJuegos', productosController.edit)

router.put('/update/:idProductoJuegos', productosController.update)

 router.get('/create', productosController.getCreateForm);
 
 router.post('/create', upload.single('imagenJuego'), productosController.postCreateForm);

 module.exports = router; 