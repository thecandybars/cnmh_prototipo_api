const { DataTypes } = require("sequelize");
//Exhibiciones
module.exports = (sequelize) => {
  sequelize.define(
    "Exhibiciones",
    {
      titulo: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      // portadaMedioId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
