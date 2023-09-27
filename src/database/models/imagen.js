function imagenData(sequelize, Datatypes) {
  let a = "Imagen";

  let campos = {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    url_imagen: { type: Datatypes.STRING },
    juego_id: { type: Datatypes.INTEGER },
  };

  

  let config = { camelCase: false, timestamps: false, tablename: "Imagen" };

  const imagen = sequelize.define(a, campos, config);

  imagen.associate = function (modelos) {

    imagen.belongsTo(modelos.Juego, {
        as: "juegos",
        foreignKey: "juego_id"
    });
};

  return imagen;
}

module.exports = imagenData;
