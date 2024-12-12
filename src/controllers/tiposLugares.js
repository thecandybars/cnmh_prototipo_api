//Custom code
const { TiposLugares } = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");
const checkCommonErrors = require("../common/checkCommonErrors.js");

////////////////////////////////// LUGARES //////////////////////////////////

//----------------------------- Get all or a single lugar -----------------------------//
async function getTiposLugares(req) {
  try {
    let where = {};
    if (req.query.id != null) where.id = req.query.id;

    let order = [];
    order.push(["order", "asc"]);

    let tiposLugares = await TiposLugares.findAll({
      where,
      // order,
      // attributes: ["id", "nombre", "latitud", "longitud", "descripcion"],
      // include: [
      //   {
      //     model: Municipios,
      //     required: false,
      //     attributes: ["nombre"],
      //     include: [
      //       {
      //         model: Departamentos,
      //         required: false,
      //         attributes: ["name", "geoId"],
      //         include: [
      //           {
      //             model: Regions,
      //             required: false,
      //             attributes: ["id", "name", "fullName"],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   { model: TipologiasGenerales },
      //   { model: TipologiasLugares },
      // ],
    });
    checkCommonErrors(tiposLugares);

    const data = where.id ? tiposLugares[0] : tiposLugares;
    // const data = tiposLugares;

    return response(
      req.params,
      {
        title: "Tipos de lugares de memoria",
        data,
        status: 200,
      },
      "getTiposLugares"
    );
  } catch (err) {
    return response(
      req.body,
      {
        title: "API Catched error",
        data: String(err),
        status: 500,
        success: false,
      },
      "getTiposLugares"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  getTiposLugares,
};
