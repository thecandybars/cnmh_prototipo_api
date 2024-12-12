//Custom code
const { Contenidos, ListaTipos, Exhibiciones } = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");

////////////////////////////////// DEPARTAMENTOS //////////////////////////////////

//----------------------------- Create a new exhibicion -----------------------------//
async function createContenido(req) {
  const t = await conn.transaction();
  try {
    // VALIDATE TIPO CONTENIDO
    if (!(await ListaTipos.findByPk(req.body.tipoContenidoId)))
      throw {
        error: `Tipo Contenido ${req.body.tipoContenidoId} doesnt exists`,
        status: 404,
      };
    // VALIDATE  EXHIBICION
    if (!(await Exhibiciones.findByPk(req.body.exhibicionId)))
      throw {
        error: `Exhibicion ${req.body.exhibicionId} doesnt exists`,
        status: 404,
      };

    //Create row in database
    const newContenido = await Contenidos.create({
      tipoContenido: req.body.tipoContenido,
      cid: req.body.cid,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      index: req.body.index,
      tipoContenidoId: req.body.tipoContenidoId,
      exhibicionId: req.body.exhibicionId,
    });

    if (newContenido === null)
      throw { error: "Error creating Contenido", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New Contenido created",
        data: newContenido,
        status: 200,
      },
      "createContenido"
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
      "createContenido"
    );
  }
}
//----------------------------- End create a new exhibicion -----------------------------//

//----------------------------- Get all or a single exhibicion -----------------------------//
async function getContenidos(req) {
  try {
    let where = {};
    if (req.query.exhibicionId != null)
      where.exhibicionId = req.query.exhibicionId;

    let order = [];
    order.push(["order", "asc"]);

    let contenidos = await Contenidos.findAll({
      where,
      // order,
      include: [{ model: ListaTipos, required: false }],
    });

    const data = where.id ? contenidos[0] : contenidos;

    return response(
      req.params,
      {
        title: "Contenidos",
        data,
        status: 200,
      },
      "getContenidos"
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
      "getContenidos"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  createContenido,

  getContenidos,
};
