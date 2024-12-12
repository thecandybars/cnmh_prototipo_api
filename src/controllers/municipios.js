//Custom code
const { Municipios, Departamentos, Regions } = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");
const checkCommonErrors = require("../common/checkCommonErrors.js");

////////////////////////////////// MUNICIPIOS //////////////////////////////////

//----------------------------- Create a new municipio -----------------------------//
async function createMunicipio(req) {
  const t = await conn.transaction();
  try {
    //Validate if municipio name exists
    const municipioCodeExists = await Municipios.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (municipioCodeExists !== null) {
      throw { error: "Municipio already exists", status: 404 };
    }
    //Validate if municipio geoId exists
    const municipioGeoidExists = await Municipios.findOne({
      where: {
        name: req.body.geoId,
      },
    });
    if (municipioGeoidExists !== null) {
      throw { error: "Municipio GeoId already exists", status: 404 };
    }

    //Create row in database
    const newMunicipio = await Municipios.create({
      name: req.body.name,
      geoId: req.body.geoId,
      regionId: req.body.regionId,
    });

    if (newMunicipio === null)
      throw { error: "Error creating municipio", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New municipio created",
        data: newMunicipio,
        status: 200,
      },
      "createMunicipio"
    );
  } catch (err) {
    //Rollback transactions
    await t.rollback();
    // Drop files - Multiple files

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
      "createMunicipio"
    );
  }
}
//----------------------------- End create a new municipio -----------------------------//

//----------------------------- Get all or a single municipio -----------------------------//
async function getMunicipios(req) {
  try {
    let where = {};
    if (req.query.municipioCodigo != null)
      where.codigo = req.query.municipioCodigo;
    // where.type = req.params.type;

    let order = [];
    order.push(["order", "asc"]);

    let municipios = await Municipios.findAll({
      where,
      // order,
      attributes: ["codigo", "nombre"],
      include: [
        {
          model: Departamentos,
          required: false,
          attributes: ["id", "name", "geoId"],
          include: [
            {
              model: Regions,
              required: false,
              attributes: ["id", "name", "color"],
            },
          ],
        },
      ],
    });
    checkCommonErrors(municipios);

    const data = where.codigo ? municipios[0] : municipios;

    return response(
      req.params,
      {
        title: "Municipios",
        data,
        status: 200,
      },
      "getMunicipios"
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
      "getMunicipios"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  getMunicipios,
  createMunicipio,
};
