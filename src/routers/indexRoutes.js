const express = require("express")
const router = express.Router()
const indexController = require("../controllers/indexController") 
router.get('/', indexController.index); 
router.get('/hogwarts-legacy', indexController.hogwartsLegacy); 
router.get('/carrito', indexController.carrito); 

module.exports = router