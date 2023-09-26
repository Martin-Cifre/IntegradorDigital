const productosController = require('../controllers/productosController.js');
 
 const express = require('express');
 const router = express.Router();
 const multer = require('multer');
 const path = require ("path");
 const cloudinary = require('cloudinary').v2;
 const { CloudinaryStorage } = require('multer-storage-cloudinary');
  
  const upload = multer();
//  router.get('/prueba', productosController.producto);

router.get('/search', productosController.search);

router.get('/edit/:idProductoJuegos', productosController.edit)

router.put('/update/:idProductoJuegos', productosController.update)

router.get('/create', productosController.getCreateForm);
 
router.post('/create', upload.single('imagenJuego'), productosController.postCreateForm);

router.get('/detalle/:id', productosController.productosDetalle);

module.exports = router; 