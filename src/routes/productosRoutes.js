const productosController = require('../controllers/productosController.js');
 
 const express = require('express');
 const router = express.Router();

 router.get('/productosDetalle/:id', productosController.productosDetalle);

 router.get('/detalleProducto', productosController.detalleProducto)



 module.exports = router; 