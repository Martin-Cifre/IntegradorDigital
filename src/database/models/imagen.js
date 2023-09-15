function imagenData(sequelize, Datatypes) {
  let a = "Imagen";

  let campos = {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    urlImagen: { type: Datatypes.STRING },
    juego_id: { type: Datatypes.INTEGER },
  };

  let config = { camelCase: false, timestamps: false, tablename: "Imagen" };

  const Imagen = sequelize.define(a, campos, config);

  return Imagen;
}

module.exports = imagenData;
