const { DataTypes } = require("sequelize");
//Users
module.exports = (sequelize) => {
  sequelize.define(
    "ListaTipos",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      first: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      second: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      third: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
