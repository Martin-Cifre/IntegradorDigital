const path = require('path');

const controlador = {
    index: (req,res) => {
        res.render("home");
    },

    login: (req,res) => {
        res.render("users/login");
    },

    register: (req,res) => {
        res.render("users/register");
    },

    search: (req,res) => {
        let buscarJuego = req.query.search;
        res.send(buscarJuego);

        let resultadoJuegos = [];

        for (let i=0;i>resultadoJuegos.length;i++){
            if (ProductosJuegos[i].name.include(buscarJuego)){
                resultadoJuegos.push(ProductosJuegos[i]);
            }
        }

        res.render('resultadoJuego', {resultadoJuegos: resultadoJuegos});
    },

    create: (req,res) => {
        let usuario = {
            userName: req.body.userName,
            userPassword: req.body.userPassword,
            userPasswordConfirm: req.body.userPasswordConfirm,
            email: req.body.email,
        }

        let usuarioJSON = JSON.stringify(usuario);
        writeFileSync('usuarios.json', usuarioJSON);

        res.redirect("/");
    },

    edit: (req,res) => {
        let idProductoJuegos = req.params.idProductoJuegos;
        res.send(idProductoJuegos)

        let productoEdit = productosJuegos[idProductoJuegos];

        res.rendir("productosEditar", {productoEdit: productoEdit} );
    },


    productosDetalle: (req,res) => {
        res.render("users/productosDetalle");
    }
};



module.exports = controlador;