function categoriaData(sequelize, Datatypes) {
    let a = "Categoria";
  
    let camposCategoria = {
      id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Datatypes.INTEGER },
    };
  
    let config = { camelCase: false, timestamps: false, tablename: "Categoria" };
  
    const Categoria = sequelize.define(a, camposCategoria, config);
  
    Categoria.associate = function (modelos) {
      Categoria.hasMany(modelos.Juego, {
        as: 'juego',
        foreignKey: 'categoria_id',
      });
    }

    return Categoria;
  }
  
  module.exports = categoriaData;