const ventaData = (sequelize, DataTypes) => {
  const Venta = sequelize.define('Venta', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      cantidad: { type: DataTypes.STRING },
      monto_unidad: { type: DataTypes.DECIMAL },
      juego_id: { type: DataTypes.INTEGER },
      registro_venta_id: { type: DataTypes.INTEGER },
  }, {
      camelCase: false,
      timestamps: false,
      tableName: 'Venta',
  });

  Venta.associate = function (models) {
      // Configuración de la relación con el modelo Juego
      Venta.belongsTo(models.Juego, {
          as: 'Juego',
          foreignKey: 'juego_id',
      });

      // Configuración de la relación con el modelo RegistroVenta
      Venta.belongsTo(models.RegistroVenta, {
          as: 'Registro_Venta',
          foreignKey: 'registro_venta_id',
      });
  };

  return Venta;
};

module.exports = ventaData;
