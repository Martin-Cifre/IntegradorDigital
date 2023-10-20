const { body } = require('express-validator');

const validateLoginForm = [
  body('email')
    .notEmpty().withMessage('Debes completar con un email valido')
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
  body('userPassword')
    .notEmpty().withMessage('Debes ingresar una contraseña'),
];

module.exports = validateLoginForm;