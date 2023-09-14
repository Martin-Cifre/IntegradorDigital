function calificacionData(sequelize, Datatypes) {
  let a = "calificacion";

  let campos = {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    puntuacion: { type: Datatypes.STRING },
    comentario: { type: Datatypes.STRING },
    usuario_id: { type: Datatypes.INTEGER },
    juego_id: { type: Datatypes.INTEGER },
  };

  let config = { camelCase: false, timestamps: false };

  const calificacion = sequelize.define(a, campos, config);

  return calificacion;
}

module.exports = calificacionData;