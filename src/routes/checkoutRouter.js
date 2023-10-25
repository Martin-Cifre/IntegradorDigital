const checkoutController = require('../controllers/checkoutController.js');
 
const express = require('express');
const router = express.Router();
const path = require ("path");
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/agregarCarrito', isAuthenticated, checkoutController.agregarCarrito);

router.post('/agregarCarrito', isAuthenticated, checkoutController.agregarCarrito);

module.exports = router;