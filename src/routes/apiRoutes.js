const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/usuarios', apiController.obtenerUsuarios);
router.get('/usuarios/:id', apiController.obtenerUsuarioPorId);
router.get('/productos', apiController.obtenerProductos);
router.get('/categorias', apiController.obtenerCategorias);


module.exports = router;