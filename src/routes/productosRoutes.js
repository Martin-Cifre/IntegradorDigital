const productosController = require('../controllers/productosController.js');
const multer = require("multer");
const path = require("path");
const express = require('express');
const router = express.Router();

//  router.get('/prueba', productosController.producto);

// Configuracion del Multer en memoria
const upload = multer({ storage: multer.memoryStorage() });
router.get('/search', productosController.search);

router.get('/productosDetalle', productosController.productosDetalle);

router.get('/edit/:idProductoJuegos', productosController.edit)

router.put('/edit', productosController.edit)

router.get('/alta', productosController.alta)

router.post('/guardar',upload.single("image"), productosController.guardar)

module.exports = router;