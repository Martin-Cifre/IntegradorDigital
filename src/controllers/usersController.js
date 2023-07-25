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
    }

    
};



module.exports = controlador;