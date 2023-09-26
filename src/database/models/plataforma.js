function plataformaData(sequelize, Datatypes) {
  let a = "Plataforma";

  let campos = {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: Datatypes.STRING },
    imagen: { type: Datatypes.STRING },
  };

  let config = { camelCase: false, timestamps: false, tablename: "Plataforma" };

  const plataforma = sequelize.define(a, campos, config);

  return plataforma;
}

module.exports = plataformaData;
