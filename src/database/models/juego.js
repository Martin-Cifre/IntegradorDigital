function juegoData (sequelize, Datatypes){
    let a = "juego";

    let campos = {
        id:{type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.VARCHAR},
        fecha_alta: {type: Datatypes.DATE},
        fecha_baja: {type: Datatypes.DATE},
        descripcion: {type: Datatypes.VARCHAR},
        precio: {type: Datatypes.DECIMAL},
        descuento: {type: Datatypes.VARCHAR}

    }

    let config = {camelCase: false, timestamps: false};

    const juegos = sequelize.define(a,campos,config)

    return juegos
}

module.exports = juegoData