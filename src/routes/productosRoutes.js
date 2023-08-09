const productosController = require('../controllers/productosController.js');
 
 const express = require('express');
 const router = express.Router();

//  router.get('/prueba', productosController.producto);

 router.get('/search', productosController.search);

 router.get('/productosDetalle', productosController.productosDetalle);

 router.get('/edit/:idProductoJuegos', productosController.edit)
 
 router.put('/edit', productosController.edit)

 router.get('/alta', productosController.alta)

 router.post('/guardar', productosController.guardar)

 module.exports = router; 