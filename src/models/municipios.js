const { DataTypes } = require("sequelize");
//Users
module.exports = (sequelize) => {
  sequelize.define(
    "Municipios",
    {
      codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
