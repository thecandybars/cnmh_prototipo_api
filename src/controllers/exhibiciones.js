//Custom code
const {
  Exhibiciones,
  ListaTipos,
  Lugares,
  Sliders,
  Slides,
  Medios,
} = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");

////////////////////////////////// EXHIBICIONES //////////////////////////////////

//----------------------------- Create a new exhibicion -----------------------------//
async function createExhibicion(req) {
  const t = await conn.transaction();
  try {
    // //Validate if exhibicion name exists

    // VALIDATE LUGAR
    if (!(await Lugares.findByPk(req.body.lugarId)))
      throw {
        error: `Lugar de Memoria ${req.body.lugarId} doesnt exists`,
        status: 404,
      };
    // VALIDATE TIPO EXHIBICION
    if (!(await ListaTipos.findByPk(req.body.tipoExhibicionId)))
      throw {
        error: `Tipo Exhibicion ${req.body.tipoExhibicionId} doesnt exists`,
        status: 404,
      };

    //Create row in database
    const newExhibicion = await Exhibiciones.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      lugarId: req.body.lugarId,
      tipoExhibicionId: req.body.tipoExhibicionId,
      portadaMedioId: req.body.portadaMedioId,
    });

    if (newExhibicion === null)
      throw { error: "Error creating Exhibicion", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New exhibicion created",
        data: newExhibicion,
        status: 200,
      },
      "createExhibicion"
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
      "createExhibicion"
    );
  }
}
//----------------------------- End create a new exhibicion -----------------------------//

//----------------------------- Get all or a single exhibicion -----------------------------//
async function getExhibiciones(req) {
  try {
    let where = {};
    if (req.query.exhibicionId != null) where.id = req.query.exhibicionId;

    let order = [];
    order.push(["order", "asc"]);

    let exhibiciones = await Exhibiciones.findAll({
      where,
      include: [
        { model: Lugares, include: { model: Medios, as: "Imagen" } },
        { model: ListaTipos, required: false },
        { model: Medios, required: false, include: ListaTipos, as: "Portada" },
        { model: Medios, required: false, include: ListaTipos, as: "Logo" },
        {
          model: Sliders,
          required: false,
          include: [
            { model: Medios, required: false, as: "Portada" },
            {
              model: Slides,
              required: false,
              separate: true, // Force separate query. The issue with the order attribute within the nested include is likely due to Sequelize's complexity in handling deep nested orders. To solve this, you can try using a separate option in the include to force Sequelize to make a separate query for the nested Slides association.
              order: [["index", "ASC"]],
              include: [
                {
                  model: Medios,
                  include: ListaTipos,
                  attributes: [
                    "id",
                    "cid",
                    "url",
                    "titulo",
                    "descripcion",
                    "tipoMedioId",
                  ],
                },
                { model: ListaTipos, required: false },
              ],
            },
          ],
        },
      ],
    });

    const formattedExhibiciones =
      true &&
      exhibiciones.map((exhibicion) => {
        const rootData = {
          id: exhibicion.id,
          titulo: exhibicion.titulo,
          descripcion: exhibicion.descripcion,
          tipoExhibicion: exhibicion.ListaTipo.first,
        };
        const Lugar = exhibicion.Lugare;
        const Portada = {
          id: exhibicion.Portada.id,
          cid: exhibicion.Portada.cid,
          url: exhibicion.Portada.url,
          titulo: exhibicion.Portada.titulo,
          descripcion: exhibicion.Portada.descripcion,
          tipoMedio: exhibicion.Portada.ListaTipo.first,
        };
        const Logo = {
          id: exhibicion.Logo.id,
          cid: exhibicion.Logo.cid,
          url: exhibicion.Logo.url,
          titulo: exhibicion.Logo.titulo,
          descripcion: exhibicion.Logo.descripcion,
          tipoMedio: exhibicion.Logo.ListaTipo.first,
        };
        const Sliders = exhibicion.Sliders?.map((slider) => {
          const basicSliderData = {
            id: slider.id,
            titulo: slider.titulo,
            descripcion: slider.descripcion,
            index: slider.index,
            Portada: slider.Portada,
          };
          const Slides = slider.Slides?.map((slide) => {
            const basicSlideData = {
              id: slide.id,
              tipoSlide: slide.ListaTipo.first,
              titulo: slide.titulo,
              descripcion: slide.descripcion,
              index: slide.index,
            };
            const Medios = slide.Medios.map((medio) => ({
              id: medio.id,
              cid: medio.cid,
              url: medio.url,
              titulo: medio.cid,
              descripcion: medio.descripcion,
              tipoMedio: medio.ListaTipo.first,
            }));
            return { ...basicSlideData, Medios };
          });
          return {
            ...basicSliderData,
            Slides,
          };
        });
        return { ...rootData, Lugar, Portada, Logo, Sliders };
      });

    const data = where.id ? formattedExhibiciones[0] : formattedExhibiciones;
    // const data = where.id ? exhibiciones[0] : exhibiciones;

    return response(
      req.params,
      {
        title: "Exhibiciones",
        data,
        status: 200,
      },
      "getExhibiciones"
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
      "getExhibiciones"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  createExhibicion,
  getExhibiciones,
};
