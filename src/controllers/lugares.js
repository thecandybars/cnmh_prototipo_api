//Custom code
const {
  Lugares,
  Departamentos,
  Regions,
  Municipios,
  TipologiasLugares,
  TipologiasGenerales,
  TiposLugares,
  Medios,
} = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");
const checkCommonErrors = require("../common/checkCommonErrors.js");

////////////////////////////////// LUGARES //////////////////////////////////

//----------------------------- Create a new lugar -----------------------------//
async function createLugar(req) {
  const t = await conn.transaction();
  try {
    //Validate if lugar name exists
    const lugarExists = await Lugares.findOne({
      where: {
        nombre: req.body.nombre,
      },
    });
    if (lugarExists !== null) {
      throw { error: "Ya existe un lugar con ese NOMBRE", status: 404 };
    }
    //Validate coordinates
    if (
      !req.body.latitud ||
      isNaN(Number(req.body.latitud)) ||
      req.body.latitud < -180 ||
      req.body.latitud > 180
    ) {
      throw { error: "Latitud inválida", status: 404 };
    }
    if (
      !req.body.longitud ||
      isNaN(Number(req.body.longitud)) ||
      req.body.longitud < -90 ||
      req.body.longitud > 90
    ) {
      throw { error: "Longitud inválida", status: 404 };
    }
    //Validate if lugar coordinates exists
    const lugarCoordinates = await Lugares.findOne({
      where: {
        latitud: req.body.latitud,
        longitud: req.body.longitud,
      },
    });
    if (lugarCoordinates !== null) {
      throw { error: "Ya existe un lugar con esas COORDENADAS", status: 404 };
    }

    // create method is throwing error "SequelizeUniqueConstraintError: Validation error"
    // because is trying to create a new record with an id already in use (id=16?)
    // Thus I'm retrieving the last id manually
    const ids = await Lugares.findAll({
      order: [["id", "asc"]],
      attributes: ["id"],
    });
    const lastId = ids[ids.length - 1].id + 1;

    //Create row in database
    const newLugar = await Lugares.create({
      id: lastId,
      nombre: req.body.nombre,
      latitud: req.body.latitud,
      longitud: req.body.longitud,
      MunicipioCodigo: req.body.codMunicipio,
      descripcion: req.body.descripcion,
      TipologiasGeneraleId: req.body.tipologiaGeneral,
      TipologiasLugareId: req.body.tipologiaLugar,
    });

    if (newLugar === null) throw { error: "Error creating lugar", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New lugar created",
        data: newLugar,
        status: 200,
      },
      "createLugar"
    );
  } catch (err) {
    //Rollback transactions
    await t.rollback();
    let error = err.error ? err.error : err;
    let status = err.error ? err.status : 500;
    return response(
      req.body,
      {
        title: "API Catched error",
        data: String(error),
        status: status,
        success: false,
      },
      "createLugar"
    );
  }
}
//----------------------------- End create a new lugar -----------------------------//

//----------------------------- Get all or a single lugar -----------------------------//
async function getLugares(req) {
  try {
    let where = {};
    if (req.query.lugarId != null) where.id = req.query.lugarId;
    // where.type = req.params.type;

    let order = [];
    order.push(["order", "asc"]);

    let lugares = await Lugares.findAll({
      where,
      // order,
      attributes: [
        "id",
        "nombre",
        "nombreCorto",
        "latitud",
        "longitud",
        "descripcion",
      ],
      include: [
        {
          model: Municipios,
          required: false,
          attributes: ["nombre"],
          include: [
            {
              model: Departamentos,
              required: false,
              attributes: ["name", "geoId"],
              include: [
                {
                  model: Regions,
                  required: false,
                  attributes: ["id", "name", "fullName"],
                },
              ],
            },
          ],
        },
        { model: TipologiasGenerales },
        { model: TipologiasLugares },
        { model: TiposLugares },
        { model: Medios, as: "Imagen" },
      ],
    });
    checkCommonErrors(lugares);

    const data = where.codigo ? lugares[0] : lugares;

    return response(
      req.params,
      {
        title: "Lugares",
        data,
        status: 200,
      },
      "getLugares"
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
      "getLugares"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  getLugares,
  createLugar,
};
