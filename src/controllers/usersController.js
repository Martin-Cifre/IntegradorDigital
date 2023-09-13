const express = require('express');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const userModels = require('../modelos/usersModel');
const db = require('../database/models');

const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { Console, error } = require('console');
const { validationResult } = require('express-validator');

cloudinary.config({
    cloud_name: 'ddczp5dbb',
    api_key: '745942551174111',
    api_secret: 'Isu49y1h_cdXGXrPx5WgJ1SxA5w',
    debug: true
});

function findByField(fieldName, value) {

    for (const user of users) {
      if (user[fieldName] === value) {
        return user; 
      }
    }
    
    return null;
  }



const controlador = {
    index: (req,res) => {
        const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, "utf-8"));
        res.render("home", {datosJuegos});
    },

    login: (req,res) => {
        res.render("users/login");
    },
    processLogin: (req, res) => {
        // Busca un usuario en función del campo "email" proporcionado en la solicitud POST (req.body.email)
        let userToLogin = findByField('email', req.body.email);
      
        if (userToLogin) {
          // Verifica la contraseña solo si se encontró un usuario
          let correctPassword = bcryptjs.compareSync(req.body.userPassword, userToLogin.userPassword);
      
          if (correctPassword) {
            delete userToLogin.userPassword;
            req.session.userLogged = userToLogin;
      
            if (req.body.remember) {
              res.cookie('email', req.body.email, { maxAge: (((1000 * 60) * 60) * 24) }); // cookie de 24 hs
            }
      
            return res.redirect('perfil');
          } else {
            return res.render('users/login', {
              errors: {
                password: {
                  msg: 'Contraseña incorrecta'
                }
              },
              old: req.body
            });
          }
        } else {
          // Maneja el caso en el que no se encontró un usuario con el correo electrónico proporcionado
          return res.render('users/login', {
            errors: {
              email: {
                msg: 'El email con el que intenta ingresar no existe'
              }
            },
            old: req.body
          });
        }
    
            

        /* let errors = validationResult(req); */

       /*  if (errors.isEmpty()) { */
            /* const usersData = fs.readFileSync(usersFilePath, 'utf-8');
            let users = JSON.parse(usersData);
            let usuarioALoguearse;
            

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === req.body.email) {
                   let usuarioALoguearse = users[i];
                    break;
                }
            }

            let passwordCorrecto =  bcryptjs.compareSync(req.body.userPassword, usuarioALoguearse.userPassword) 
            if  (passwordCorrecto){ 
                delete usuarioALoguearse.password
                req.session.usarioLogueado = usuarioALoguearse
                return res.send('pasaste') 
            } else {
                return res.send('Password Incorrecto')
            }  */
                    

             /* if (usuarioALoguearse === undefined) {
                return res.render('users/login', {
                    errors: [{ msg: 'Credenciales inválidas' }]
                });
            }

            req.session.usuarioLogeado = usuarioALoguearse;
            
            return res.send('Inicio de sesión exitoso') /* res.redirect('/'); 
        } else {
            return res.render('users/login', { errors: errors.array() });
        }  */
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

        res.redirect('login')
    
    },
    perfil: (req,res) => {
        fs.readFile('usuarios.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON:', err);
                return res.status(500).send('Error interno del servidor');
            }
    
            const usuario = JSON.parse(data);
    
            
            res.render('users/perfil', { usuario });
        });
    }
} 

module.exports = controlador;