function categoriaData(sequelize, Datatypes) {
    let a = "Categoria";
  
    let camposCategoria = {
      id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
      urlImagen: { type: Datatypes.STRING },
      juego_id: { type: Datatypes.INTEGER },
    };
  
    let config = { camelCase: false, timestamps: false, tablename: "Categoria" };
  
    const Categoria = sequelize.define(a, camposCategoria, config);
  
    return Categoria;
  }
  
  module.exports = categoriaData;