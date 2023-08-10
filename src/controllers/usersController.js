const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');

const controlador = {
    index: (req,res) => {
        const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
        res.render("home", {datosJuegos});
    },

    login: (req,res) => {
        res.render("users/login");
    },

    register: (req,res) => {
        res.render("users/register");
    },
    create: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = req.body;

            userId = usersModel.create(user);

            res.redirect('/users/' + userId);
        } else {
             res.render('users/register', { 
                errors: errors.array(), 
                old: req.body
            });
        }

      /*   let usuario = {
            userName: req.body.userName,
            userPassword: req.body.userPassword,
            userPasswordConfirm: req.body.userPasswordConfirm,
            email: req.body.email,
        }

        let usuarioJSON = JSON.stringify(usuario);
        writeFileSync('usuarios.json', usuarioJSON);

        res.redirect("/"); */
    }

    
};



module.exports = controlador;