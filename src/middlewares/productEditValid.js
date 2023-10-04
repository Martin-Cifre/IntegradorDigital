const { body } = require('express-validator');

const validationProductEdit = [
    body(nombre)
    .notEmpty().withMessage('Es obligatorio que este campo tenga nombre'),
    body(genero)
    .notEmpty().withMessage('Es obligatorio que tenga genero'),
    body(precio)
    .notEmpty().withMessage('Es obligatorio que tener un precio'),
    body(rating)
    .notEmpty().withMessage('Es obligatorio que tenga un rating'),
    body(descripcion)
    .notEmpty().withMessage('Es obligatorio que el juego tenga una descripcion'),
];

module.exports = validationProductEdit