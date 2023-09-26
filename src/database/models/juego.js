 function juegoData (sequelize, Datatypes){
    let a = "Juego";

    let campos = {
        id:{type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING},
        fecha_alta: {type: Datatypes.DATE},
        fecha_baja: {type: Datatypes.DATE},
        descripcion: {type: Datatypes.STRING},
        precio: {type: Datatypes.DECIMAL},
        descuento: {type: Datatypes.STRING},
        administrador_id: {type: Datatypes.INTEGER},
        categoria_id: {type: Datatypes.INTEGER},
        plataforma_id: {type: Datatypes.INTEGER}

    }


    let config = { camelCase: false, timestamps: false, tablename: "Juego" };

    const Juego = sequelize.define(a,campos,config)

    Juego.associate = function (modelos) {
      Juego.hasMany(modelos.Imagen, {
        as: 'Imagen',
        foreignKey: 'juego_id',
      });

      Juego.belongsTo(modelos.Categoria, {
        as: "categoria",
        foreignKey: "categoria_id"
    });
    }

    return Juego
}

module.exports = juegoData;