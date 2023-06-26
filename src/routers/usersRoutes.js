const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController") 
router.get('/', usersController.index); 
router.get('/login', usersController.login); 
router.get('/signIn', usersController.signIn);


module.exports = router