const productosController = require('../controllers/productosController.js');
 
 const express = require('express');
 const router = express.Router();
 const multer = require('multer');
 const path = require ("path");
 const cloudinary = require('cloudinary').v2;
 const { CloudinaryStorage } = require('multer-storage-cloudinary');
 const isAuthenticated = require('../middlewares/isAuthenticated'); 
  
  const upload = multer();

router.get('/search', productosController.search);

router.get('/edit/:idProductoJuegos', productosController.edit)

router.put('/update/:idProductoJuegos', productosController.update)

router.get('/create', productosController.getCreateForm);
 
router.post('/create', upload.single('imagenJuego'), productosController.postCreateForm);

router.get('/detalle/:id', productosController.productosDetalle);

router.get('/carrito',  isAuthenticated,  productosController.carritoCompra);

router.post('/carrito/agregar/:idProductoJuegos', isAuthenticated, productosController.agregarAlCarrito);

/* router.post('/carrito',  isAuthenticated, productosController.carritoMuestraDeProducto); */ 


module.exports = router; 