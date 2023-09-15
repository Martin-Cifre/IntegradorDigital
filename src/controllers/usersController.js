const express = require('express');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { validationResult } = require('express-validator');
const userModels = require('../modelos/usersModel');
const db = require('../database/models');


/* function findByField(fieldName, value) {
  for (const user of users) {
    if (user[fieldName] === value) {
      return user;
    }
  }
  return null;
} */

const controlador = {
  index: (req, res) => {
    const datosJuegos = JSON.parse(fs.readFileSync(juegosFilePath, 'utf-8'));
    res.render('home', { datosJuegos });
  },

  login: (req, res) => {
    res.render('users/login');
  },

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

      return res.render('users/perfil');
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
      const oldUser = await db.Usuario.findOne({ where: { email: req.body.email } });

      if (!oldUser) {
        let imageUrl = null; // Variable para almacenar la URL de la imagen en Cloudinary

        // Verifica si se cargó una imagen
        if (req.file) {
          // Carga la imagen en Cloudinary y obtén la URL
          const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'image',
          });
          imageUrl = result.secure_url;
        }

        await db.Usuario.create({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          clave: bcryptjs.hashSync(req.body.userPassword, 10),
          dni: req.body.dni,
          avatar: imageUrl,
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
  
      res.render('users/perfil', { usuario });
    } catch (error) {
      console.error('Error al cargar el perfil del usuario:', error);
      return res.status(500).send('Error interno del servidor');
    }
  }
};

module.exports = controlador;
