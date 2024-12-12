const { DataTypes } = require("sequelize");
//Tipos de Lugares
module.exports = (sequelize) => {
  sequelize.define(
    "TiposLugares",
    {
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      imagenURL: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
