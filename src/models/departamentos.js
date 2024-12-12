const { DataTypes } = require("sequelize");
//Users
module.exports = (sequelize) => {
  sequelize.define(
    "Departamentos",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      geoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
