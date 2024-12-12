const { DataTypes } = require("sequelize");
//Users
module.exports = (sequelize) => {
  sequelize.define(
    "Sliders",
    {
      titulo: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(300),
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
