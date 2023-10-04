const { body } = require("express-validator");

const validateCreateForm = [
  body('nombre')
    .notEmpty().withMessage('Debes completar el campo de nombre'),
  body('apellido')
    .notEmpty().withMessage('Debes completar el campo de apellido'),
  body('dni')
    .notEmpty().isLength({min: 8}).withMessage('Debes completar el campo sin los "."'),
  body('userPassword')
    .notEmpty().withMessage('Debes ingresar una contraseña')
    .isLength({min: 8}).withMessage('Debes ingresar una contraseña con 8 dígitos mínimo'),
  body('email')
      .notEmpty().withMessage('Debes completar con un email valido')
      .isEmail().withMessage('Debes escribir un formato de correo válido'),
  
];

module.exports =  validateCreateForm ;
