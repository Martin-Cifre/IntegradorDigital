const express = require('express');
const path = require('path');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const userModels = require('../modelos/usersModel');
const db = require('../database/models');
const { validationResult } = require('express-validator');



const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(cloudinaryConfig);


const controlador = {
  index: async (req, res) => {
    try {
        const juegos = await db.Juego.findAll({
            include: [{ model: db.Imagen, as: 'Imagen' }],
            attributes: ['id', 'nombre', 'precio'],
        });
        const usuarioActual = req.session.userLogged
        res.render('home', { juegos, usuarioActual: usuarioActual });
    } catch (error) {
        console.error('Error al obtener juegos desde la base de datos:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los juegos desde la base de datos.' });
    }
},
  login: (req, res) => {
    res.locals.errors = null;
    const usuarioActual = req.session.userLogged
    res.render('users/login', {usuarioActual});
  },
  processLogin: async (req, res) => {
    try {
      const validacion = validationResult(req);
  
      if (validacion.errors.length > 0) {
        const usuarioActual = req.session.userLogged
        return res.render('users/login', { errors: validacion.mapped(), usuarioActual });
      }
  
      const userToLogin = await db.Usuario.findOne({
        where: { email: req.body.email },
      });
  
      if (userToLogin) {
        const correctPassword = bcryptjs.compareSync(
          req.body.userPassword,
          userToLogin.clave
        );
  
        if (correctPassword) {
          delete userToLogin.dataValues.clave;
          req.session.userLogged = userToLogin;
  
          if (req.body.remember) {
            res.cookie('email', req.body.email, {
              maxAge: 10 * 24 * 60 * 60 * 1000,
            });
          }
  
          const usuarios = await db.Usuario.findAll();
          console.log(req.session)
          const usuarioActual = req.session.userLogged
          return res.render('users/perfil', {usuarioActual});
        } else {
          // Aquí podrías agregar un mensaje de contraseña incorrecta si lo deseas
          res.render('users/login',  { errors: { userPassword: { msg: 'Contraseña incorrecta' } }});
        }
      } else {
        
        res.render('users/login',  { errors: { email: {  msg: 'Usuario no encontrado' } } });

      }
    } catch (error) {
      console.error("Ocurrió un error:", error);
      res.status(500).send("Error interno en el servidor");
    }
  },  
  register: (req, res) => {
    const usuarioActual = req.session.userLogged
    res.render('users/register', {usuarioActual: usuarioActual});
},
  create: async (req, res) => {
    try {      
      const validRegister = validationResult(req);
  
      if (validRegister.errors.length>0) {
          const usuarioActual = req.session.userLogged
        return res.render('users/register', { errors: validRegister.mapped(), usuarioActual: usuarioActual });
      }

      let imageBuffer;
      let customFilename = "";
    
      if (!req.file) {
        imageBuffer = "DefectAvatar.jpg";
      } else {
        imageBuffer = req.file.buffer;
        customFilename = Date.now() + '-avatarUser';
      }
    
      const folderName = 'avatar';
      const uploadPromise = new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({ folder: folderName, resource_type: 'image', public_id: customFilename }, (error, result) => {
          if (error) {
            console.error('Error upload:', error);
            reject(error);
          } else {
            console.log('Upload ok:', result);
            resolve(result);
          }
        });
    
        streamifier.createReadStream(imageBuffer).pipe(stream);
      });
    
      const uploadedImage = await uploadPromise;
    
      const oldUser = await db.Usuario.findOne({ where: { email: req.body.email } });
    
      if (!oldUser) {
    
        const newUser = await db.Usuario.create({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          clave: bcryptjs.hashSync(req.body.userPassword, 10),
          dni: req.body.dni,
          avatar: req.file ? uploadedImage.secure_url : imageBuffer,
          rol: 'Usuario',
        });

        const usuarioActual = req.session.userLogged

        return res.render('users/login', {usuarioActual: usuarioActual});
      } else {
        return res.status(400).send('El usuario ya existe.');
      }
    } catch (error) {
      console.error('Error al crear un nuevo usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  perfil: async (req, res) => {
     try {
      const usuarioActual = req.session.userLogged
      return res.render('users/perfil', { usuario: req.session.userLogged, usuarioActual: usuarioActual });
     } catch (error) {
      console.error('Error al cargar el perfil del usuario:', error);
      return res.status(500).send('Error interno del servidor');
    } 
  }
};

module.exports = controlador;
