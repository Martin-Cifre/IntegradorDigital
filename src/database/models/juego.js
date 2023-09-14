 function juegoData (sequelize, Datatypes){
    let a = "juego";

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

    let config = {camelCase: false, timestamps: false};

    const juegos = sequelize.define(a,campos,config)

    return juegos
}

module.exports = juegoData;