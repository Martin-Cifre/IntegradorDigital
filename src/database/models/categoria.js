function categoriaData(sequelize, Datatypes) {
    let a = "categoria";
  
    let camposCategoria = {
      id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
      urlImagen: { type: Datatypes.STRING },
      juego_id: { type: Datatypes.INTEGER },
    };
  
    let config = { camelCase: false, timestamps: false };
  
    const imagen = sequelize.define(a, camposCategoria, config);
  
    return imagen;
  }
  
  module.exports = categoriaData;