function ventaData (sequelize, Datatypes) {
    let a = 'Venta'

    let campoVenta = {
        id:{type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        cantidad: {type: Datatypes.STRING},
        monto_unidad: {type: Datatypes.DECIMAL},
        juego_id: {type: Datatypes.INTEGER},
        registro_venta_id: {type: Datatypes.INTEGER}
    }
    
    let config = { camelCase: false, timestamps: false, tableName: "Venta" };

    const venta = sequelize.define(a,campoVenta,config)

    return venta

}

module.exports = ventaData;