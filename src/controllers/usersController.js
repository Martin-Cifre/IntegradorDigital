const express = require('express');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { validationResult } = require('express-validator');
const userModels = require('../modelos/usersModel');
const db = require('../database/models');

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(cloudinaryConfig);

/* function findByField(fieldName, value) {
  for (const user of users) {
    if (user[fieldName] === value) {
      return user;
    }
  }
  return null;
} */

const controlador = {
  index: async (req, res) => {
    try {
      // Consulta los juegos desde la base de datos utilizando el modelo de juego
      const juegos = await db.Juego.findAll({
        include: [{ model: db.Imagen, as: 'imagenes' }], // Incluye las imágenes relacionadas
        attributes: ['id', 'nombre', 'precio'], // Puedes seleccionar las columnas que deseas recuperar
      });
  
      // Renderiza la vista 'home' con los juegos y sus imágenes obtenidos de la base de datos
      res.render('home', { datosJuegos: juegos });
    } catch (error) {
      console.error('Error al obtener juegos desde la base de datos:', error);
      res.status(500).json({ error: 'Hubo un error al obtener los juegos desde la base de datos.' });
    }
  },

  login: (req, res) => {
    res.render('users/login');
  },

  // Modifica tu controlador processLogin
processLogin: async (req, res) => {
  try {
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
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
          });
        }
      }
    }

    // Aquí debes obtener la lista de usuarios de tu base de datos
    const usuarios = await db.Usuario.findAll();

    return res.render('users/perfil', { usuarios, userLogged: req.session.userLogged });
  } catch (error) {
    console.error('Error al procesar el inicio de sesión:', error);
    return res.status(500).send('Error interno del servidor');
  }
},

  register: (req, res) => {
    res.render('users/register');
  },

  create: async (req, res) => {
    try {
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
    
        await db.Usuario.create({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          clave: bcryptjs.hashSync(req.body.userPassword, 10),
          dni: req.body.dni,
          avatar: req.file ? customFilename : imageBuffer,
        });
        return res.render('users/login');
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
      const usuarioId = req.session.userLogged.id; // ID del usuario almacenado en la sesión
      const usuario = await db.Usuario.findByPk(usuarioId);
  
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      // Pasa la variable 'usuario' a la vista 'perfil.ejs'
      res.render('users/perfil', { usuario: usuario });
    } catch (error) {
      console.error('Error al cargar el perfil del usuario:', error);
      return res.status(500).send('Error interno del servidor');
    }
  }
};

module.exports = controlador;
