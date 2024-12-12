const { DataTypes } = require("sequelize");
//contenidos
module.exports = (sequelize) => {
  sequelize.define(
    "MediosSlides",
    {
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
