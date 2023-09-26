const { body } = require('express-validator');

const validateLoginForm = [
    body('email')
      .notEmpty().withMessage('Debes completar con un email valido')
      .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('userPassword')
      .isLength({ min: 8 }).notEmpty().withMessage('La contraseña que ingresaste es incorrecta'),
  ];

module.exports = validateLoginForm;