const regions = require("./regions");
const departamentos = require("./departamentos");
const municipios = require("./municipios");
const lugares = require("./lugares");
const tiposLugares = require("./tiposLugares");
const exhibiciones = require("./exhibiciones");
const contenidos = require("./contenidos");
const sliders = require("./sliders");
const medios = require("./medios");

module.exports = {
  ...regions,
  ...departamentos,
  ...municipios,
  ...lugares,
  ...tiposLugares,
  ...exhibiciones,
  ...contenidos,
  ...sliders,
  ...medios,
};
