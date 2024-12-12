const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

//Start sequelize
let sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

const basename = path.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  ListaTipos,
  Regions,
  Departamentos,
  Lugares,
  Municipios,
  TiposLugares,
  TipologiasLugares,
  TipologiasGenerales,
  Exhibiciones,
  TipologiasEspecificas,
  Medios,
  Sliders,
  Slides, // INTERMEDIATE TABLE Sliders-Media
  MediosSlides,
} = sequelize.models;
Municipios.belongsTo(Departamentos);
Departamentos.belongsTo(Regions);
Lugares.belongsTo(TipologiasLugares);
Lugares.belongsTo(TipologiasEspecificas);
Lugares.belongsTo(TiposLugares, { foreignKey: "TipoLugarId" });
Lugares.belongsTo(Municipios);
Lugares.belongsTo(TipologiasGenerales);
//LUGARES
TipologiasLugares.hasMany(Lugares);
Municipios.hasMany(Lugares);
TipologiasGenerales.hasMany(Lugares);
Lugares.belongsTo(Medios, { foreignKey: "imagenMedioId", as: "Imagen" });
//
Exhibiciones.belongsTo(Lugares, { foreignKey: "lugarId" });
Exhibiciones.belongsTo(ListaTipos, { foreignKey: "tipoExhibicionId" });

Exhibiciones.belongsTo(Medios, { foreignKey: "portadaMedioId", as: "Portada" });
Exhibiciones.belongsTo(Medios, { foreignKey: "logoMedioId", as: "Logo" });

Exhibiciones.hasMany(Sliders, { foreignKey: "exhibicionId" });

Medios.belongsTo(ListaTipos, { foreignKey: "tipoMedioId" });

// Sliders.belongsTo(ListaTipos, { foreignKey: "tipoSliderId" });
// SLIDES
Slides.belongsTo(ListaTipos, { foreignKey: "tipoSlideId" });
Sliders.hasMany(Slides, { foreignKey: "sliderId" });
Sliders.belongsTo(Medios, { foreignKey: "portadaMedioId", as: "Portada" });

// MEDIOS-SLIDES
Slides.belongsToMany(Medios, { through: MediosSlides });
Medios.belongsToMany(Slides, { through: MediosSlides });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
