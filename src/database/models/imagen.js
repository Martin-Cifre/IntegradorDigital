function imagenData(sequelize, Datatypes) {
  let a = "imagen";

  let campos = {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    urlImagen: { type: Datatypes.STRING },
    juego_id: { type: Datatypes.INTEGER },
  };

  let config = { camelCase: false, timestamps: false };

  const imagen = sequelize.define(a, campos, config);

  return imagen;
}

module.exports = imagenData;
