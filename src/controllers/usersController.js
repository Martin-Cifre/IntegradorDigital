const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const juegosFilePath = path.join(__dirname, '../data/datosJuegos.json');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs');
const { Console } = require('console');

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
    create: async (req, res) => {

        for (let s of users){
			if (idNuevo<s.id){
				idNuevo=s.id;
			}
		}

		idNuevo++;

        let user = {

        id: idNuevo,
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        email: req.body.email,
        avatar: req.body.avatar
        };

        users = users.push(user)

         
         fs.writeFileSync(usersFilePath, JSON.stringify(users, null, '')); 

         return res.send('Usuario creado')
    
    }
      /*   try {
          const resultValidation = validationResult(req); 
      
          if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
          }
          
          const userToCreate = {
            ...req.body,
            userPassword: bcryptjs.hashSync(req.body.userPassword, 10),
            avatar: 'be', 
          };
      
          await usuario.usuario(userToCreate);
      
          res.render("login");
        } catch (error) {
          console.error('Error:', error);
          
        }
    }


        let usuarioNuevo = {
            id: idNuevo,
            userName: req.body.userName,
            userPassword: req.body.userPassword,
            email: req.body.email,
            image: 'vacio.jpg'
        };

        users.push(usuarioNuevo);

		fs.writeFileSync(usersFilePath, JSON.stringify(users,null,' '));

		res.redirect('/');
        
        }
        else {
           res.render('users/register', {errors: errors.array(), old: req.body } ); 
		}
   */
} 

module.exports = controlador;