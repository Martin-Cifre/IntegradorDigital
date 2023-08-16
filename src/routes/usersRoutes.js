const usersController = require('./../controllers/usersController.js');
 
 const express = require('express');
 const router = express.Router();
 const { body } = require('express-validator');
 const multer = require('multer');
 const path = require('path');


 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/avatar');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);

    }
 })

 const uploadFile = multer({ storage });

 const validateCreateForm = [
    body('userName').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('email')
        .notEmpty().withMessage('Debes completar con un email valido')
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña con 8 dígitos mínimo'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [ '.jpg', '.png'];
        

        if (!file) {
            throw new Error('Tienes que subir una imagen')
        } else {
            let fileExtensions = path.extname(file.originalname);
            if (acceptedExtensions.includes(fileExtensions)) {
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(',')}`)
            }
        }
        
        return true;
    })
];

 router.get('/', usersController.index);

 router.get('/login', usersController.login);

 router.get('/register', usersController.register);

 router.post('/register', uploadFile.single('avatar'), validateCreateForm, usersController.create);


 /* router.get('/detalleProducto/:id', productosController.productoDetalle);

 router.get('/carritoCompra', productosController.carritoCompra);

 router.post('/newGame')

 router.get('/:idProducto', );
 */

module.exports = router; 