const { DataTypes } = require("sequelize");
//Slides
module.exports = (sequelize) => {
  sequelize.define(
    "Slides",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      index: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
