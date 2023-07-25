const usersController = require('./../controllers/usersController.js');
 
 const express = require('express');
 const router = express.Router();

 router.get('/', usersController.index);

 router.get('/login', usersController.login);

 router.get('/register', usersController.register);

 router.post('/register', usersController.create);


 /* router.get('/detalleProducto/:id', productosController.productoDetalle);

 router.get('/carritoCompra', productosController.carritoCompra);

 router.post('/newGame')

 router.get('/:idProducto', );
 */
module.exports = router; 