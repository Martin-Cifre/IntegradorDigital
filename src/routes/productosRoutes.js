const productosController = require('../controllers/productosController.js');
 
 const express = require('express');
 const router = express.Router();
 const multer = require('multer');
 const path = require ("path");

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join, '../../public/img')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, "games-" + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })
//  router.get('/prueba', productosController.producto);

 router.get('/search', productosController.search);

 router.get('/detalle/:id', productosController.productosDetalle);

 router.get('/edit/:idProductoJuegos', productosController.edit)
 
 router.put('/edit', productosController.edit)

 router.get('/alta', productosController.alta)

 router.post('/guardar', productosController.guardar)

 router.get('/create', productosController.getCreateForm)

 router.get('/create', upload.single('imagenJuego'), productosController.postCreateForm)

 module.exports = router; 