const productosController = require('../controllers/productosController.js');
 
 const express = require('express');
 const router = express.Router();

 router.get('/prueba', productosController.producto);

 module.exports = router; 