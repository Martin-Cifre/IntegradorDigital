const usersController = require('./../controllers/usersController.js');
 
 const express = require('express');
 const router = express.Router();
 const { body } = require('express-validator');


    const validateCreateForm = [
        body('first_name').notEmpty().withMessage('Debes completar el campo de nombre'),
        body('password').notEmpty().withMessage('Debes ingresar una contraseña con 8 digitos minimo'),
        body('confirmPassword').notEmpty().withMessage('La contraseña deben coincidir'),
        body('email').isEmail().withMessage('Debes completar con un email valido')

    ]

 router.get('/', usersController.index);

 router.get('/login', usersController.login);

 router.get('/register', usersController.register);

 router.post('/register', validateCreateForm, usersController.create);


 /* router.get('/detalleProducto/:id', productosController.productoDetalle);

 router.get('/carritoCompra', productosController.carritoCompra);

 router.post('/newGame')

 router.get('/:idProducto', );
 */

module.exports = router; 