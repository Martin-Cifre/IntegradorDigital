const { body } = require("express-validator");

const RegisterValidationCheck = () => {
  return [
    body("email")
      .trim()
      .not()
      .isEmpty()
      .whitMessage("Este campo es necesario")
      .isEmail()
      .WhitMessage("Por favor ingresa un Email valido"),
    body("nombre")
      .trim()
      .not()
      .isEmpty()
      .isString()
      .whitMessage("por favor solamente letras"),
    body("apellido")
      .not()
      .isEmpty()
      .isString()
      .whitMessage("por favor solamente letras"),
    body("dni")
      .trim()
      .isInt()
      .whitMessage("por favor solamente numeros")
      .isLength({ min: 8, max: 8 })
      .whitMessage("solamente numeros no incluyas los puntos"),
    body("userPassword")
        .trim()
        .isLength({ min: 8 })
        .isEmpty(),
    body("imagen")
        .custom((value, { req }) => {
        if (typeof value === "string" && (value.endsWith(".jpg") || value.endsWith(".png"))) {
          return true;
        } 
        throw new Error("La imagen de perfil debe ser un archivo JPG o PNG.");
      })
      .optional(),
  ];
};

module.export = {
  RegisterValidationCheck 
};
