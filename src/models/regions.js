const { DataTypes } = require("sequelize");
//Users
module.exports = (sequelize) => {
  sequelize.define(
    "Regions",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
