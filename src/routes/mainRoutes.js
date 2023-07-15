const mainController = require('./../controllers/mainController');
 
 const express = require("express");
 const router = express.Router();

 router.get('/', mainController.index);

 module.exports = router; 