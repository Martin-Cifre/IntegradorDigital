const fs = require('fs');
const path = require('path');

const checkout = {

    agregarCarrito: (req, res) => {
        const usuarioActual = req.session.userLogged; 

        console.log(req.body)
        res.render('home', { usuarioActual })
    },    

};

module.exports = checkout