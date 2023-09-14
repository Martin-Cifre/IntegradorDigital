function ventaData (sequelize, Datatypes) {
    let a = 'venta'

    let campoVenta = {
        id:{type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        cantidad: {type: Datatypes.STRING},
        monto_unidad: {type: Datatypes.DECIMAL},
        juego_id: {type: Datatypes.INTEGER},
        registro_venta_id: {type: Datatypes.INTEGER}
    }
    
    let config = {camelCase: false, timestamps: false};

    const juegos = sequelize.define(a,campoVenta,config)

    return juegos

}

module.exports = ventaData