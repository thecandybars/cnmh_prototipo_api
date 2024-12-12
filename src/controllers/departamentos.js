//Custom code
const { Departamentos, Regions } = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");

////////////////////////////////// DEPARTAMENTOS //////////////////////////////////

//----------------------------- Create a new departamento -----------------------------//
async function createDepartamento(req) {
  const t = await conn.transaction();
  try {
    //Validate if departamento name exists
    const departamentoCodeExists = await Departamentos.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (departamentoCodeExists !== null) {
      throw { error: "Departamento already exists", status: 404 };
    }
    //Validate if departamento geoId exists
    const departamentoGeoidExists = await Departamentos.findOne({
      where: {
        name: req.body.geoId,
      },
    });
    if (departamentoGeoidExists !== null) {
      throw { error: "Departamento GeoId already exists", status: 404 };
    }

    //Create row in database
    const newDepartamento = await Departamentos.create({
      name: req.body.name,
      geoId: req.body.geoId,
      regionId: req.body.regionId,
    });

    if (newDepartamento === null)
      throw { error: "Error creating departamento", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New departamento created",
        data: newDepartamento,
        status: 200,
      },
      "createDepartamento"
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
      "createDepartamento"
    );
  }
}
//----------------------------- End create a new departamento -----------------------------//

//----------------------------- Get all or a single departamento -----------------------------//
async function getDepartamentos(req) {
  try {
    let where = {};
    if (req.query.departamentoId != null) where.id = req.query.departamentoId;
    // where.type = req.params.type;

    let order = [];
    order.push(["order", "asc"]);

    let departamentos = await Departamentos.findAll({
      where,
      // order,
      include: [{ model: Regions, required: false }],
    });

    const data = where.id ? departamentos[0] : departamentos;

    return response(
      req.params,
      {
        title: "Departamentos",
        data,
        status: 200,
      },
      "getDepartamentos"
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
      "getDepartamentos"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  getDepartamentos,
  createDepartamento,
};
