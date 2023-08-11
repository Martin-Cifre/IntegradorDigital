const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
            idNuevo=0;

		for (let s of users){
			if (idNuevo<s.id){
				idNuevo=s.id;
			}
        }
            idNuevo++;

        let usuarioNuevo = {
            id: idNuevo,
            userName: req.body.userName,
            userPassword: req.body.userPassword,
            userPasswordConfirm: req.body.userPasswordConfirm,
            email: req.body.email,
            /* image: 'vacio.jpg' */
        };

        users.push(usuarioNuevo);

		fs.writeFileSync(usersFilePath, JSON.stringify(users,null,' '));

		res.redirect('/');
        
        }
        else {
           res.render('users/register', {errors: errors.array(), old: req.body } ); 
		}
    }

    
};



module.exports = controlador;