 function regvenData (sequelize, Datatypes) {
  let a = "RegistroVenta";

  let campos = {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    medio_pago: { type: Datatypes.ENUM("Debito", "Credito","Puntos") },
    numero_factura: { type: Datatypes.INTEGER },
    comprador_id: { type: Datatypes.INTEGER },
  };

  let config = { camelCase: false, timestamps: false, tablename: "RegistroVenta" };

  const registroVenta = sequelize.define(a, campos, config);

  return registroVenta;
}

module.exports = regvenData;
