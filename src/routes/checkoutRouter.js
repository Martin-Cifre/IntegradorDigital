const express = require('express');
const router = express.Router();
const Swal = require('sweetalert2');
const checkoutController = require('../controllers/checkoutController.js');
const isAuthenticated = require('../middlewares/isAuthenticated'); 


router.get('/agregarcarrito', isAuthenticated,checkoutController.agregarCarrito);

router.post('/agregarcarrito',isAuthenticated,checkoutController.agregarCarrito);

router.get('/vaciarcarrito', isAuthenticated,checkoutController.vaciarCarro);

router.post('/vaciarcarrito',isAuthenticated,checkoutController.vaciarCarro);

module.exports = router;