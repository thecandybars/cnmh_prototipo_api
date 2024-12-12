//Custom code
const { Regions } = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");

////////////////////////////////// REGIONS //////////////////////////////////

//----------------------------- Create a new region -----------------------------//
async function createRegion(req) {
  const t = await conn.transaction();
  try {
    //Validate if region exists
    const regionExists = await Regions.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (regionExists !== null) {
      throw { error: "Region already exists", status: 404 };
    }

    //Create row in database
    const newRegion = await Regions.create({
      name: req.body.name,
      fullName: req.body.fullName,
    });

    if (newRegion === null)
      throw { error: "Error creating region", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New region created",
        // data: { carId: newCar.id },
        data: newRegion,
        status: 200,
      },
      "createRegion"
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
      "createRegion"
    );
  }
}
//----------------------------- End create a new region -----------------------------//

//----------------------------- Get all or a single region -----------------------------//
async function getRegions(req) {
  try {
    let where = {};
    if (req.query.regionId != null) where.id = req.query.regionId;
    // where.type = req.params.type;

    let order = [];
    order.push(["order", "asc"]);

    let regions = await Regions.findAll({
      where,
      // order,
    });

    const data = where.id ? regions[0] : regions;

    return response(
      req.params,
      {
        title: "Regions",
        data,
        status: 200,
      },
      "getRegions"
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
      "getRegions"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  getRegions,
  createRegion,
};
