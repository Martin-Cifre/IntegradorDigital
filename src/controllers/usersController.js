const express = require('express');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

cloudinary.config({
    cloud_name: 'ddczp5dbb',
    api_key: '745942551174111',
    api_secret: 'Isu49y1h_cdXGXrPx5WgJ1SxA5w',
    debug: true
});

const { Console, error } = require('console');
const { validationResult } = require('express-validator');

const controlador = {
    index: (req,res) => {
        const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
        res.render("home", {datosJuegos});
    },

    login: (req,res) => {
        res.render("users/login");
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const usersData = fs.readFileSync(usersFilePath, 'utf-8');
            let users = JSON.parse(usersData);
            let usuarioALoguearse;

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === req.body.email) {
                    if (bcryptjs.compareSync(req.body.userPassword, users[i].userPassword)) {
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }

            if (usuarioALoguearse === undefined) {
                return res.render('users/login', {
                    errors: [{ msg: 'Credenciales inválidas' }]
                });
            }

            req.session.usuarioLogeado = usuarioALoguearse;
            
            return res.send('Inicio de sesión exitoso') /* res.redirect('/'); */
        } else {
            return res.render('users/login', { errors: errors.array() });
        }
    },

    register: (req,res) => {
        res.render("users/register");
    },
    create: async (req, res) => {

    const imageBuffer = req.file.buffer;
    const customFileName =  'Pepe2';

    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFileName}, (error, result) => {
    });

    streamifier.createReadStream(imageBuffer).pipe(stream);

    res.send("lesto")

        let users = [];
        
            const usersData = fs.readFileSync(usersFilePath, 'utf-8');
                    users = JSON.parse(usersData);
           

        idNuevo=0;

        for (let s of users){
			if (idNuevo<s.id){
				idNuevo=s.id;
			}
		}

		idNuevo++;

        let user = {

        id: idNuevo,
        userName: req.body.userName,
        userPassword: bcryptjs.hashSync(req.body.userPassword, 10),
        email: req.body.email,
        avatar: req.file ? req.file.filename : 'vacio.jpg'
        };

         users.push(user)

         
         fs.writeFileSync(usersFilePath, JSON.stringify(users,null,' '));

        res.redirect('users/login')
    
    },
    perfil: (req,res) => {
        res.render('users/perfil')
    }
} 

module.exports = controlador;