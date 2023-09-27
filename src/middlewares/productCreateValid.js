const { body } = require('express-validator');

const validateProductCreateForm = [
  body('nombre')
    .notEmpty().withMessage('Debes completar con un nombre valido'),
  body('precio')
    .notEmpty().withMessage('El producto debe tener un precio'),
  body('descripcion')
    .notEmpty().withMessage('El juego debe tener una descripcion')
];

module.exports = validateProductCreateForm;