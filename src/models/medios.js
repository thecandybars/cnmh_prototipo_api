const { DataTypes } = require("sequelize");
//contenidos
module.exports = (sequelize) => {
  sequelize.define(
    "Medios",
    {
      cid: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      titulo: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
