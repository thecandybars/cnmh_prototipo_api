//Custom code
const {
  Sliders,
  Exhibiciones,
  Slides,
  Medios,
  MediosSlides,
} = require("../db.js");
const response = require("../common/response");
const { conn } = require("../db.js");
const checkCommonErrors = require("../common/checkCommonErrors.js");

////////////////////////////////// SLIDERS //////////////////////////////////

//----------------------------- Create a slider -----------------------------//
async function createSlider(req) {
  const t = await conn.transaction();
  try {
    // // VALIDATE  EXHIBICION
    if (!(await Exhibiciones.findByPk(req.body.exhibicionId)))
      throw {
        error: `Exhibicion ${req.body.exhibicionId} doesnt exists`,
        status: 404,
      };

    //Create row in database
    const newSlider = await Sliders.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      index: req.body.index,
      exhibicionId: req.body.exhibicionId,
      portadaMedioId: req.body.portadaMedioId,
    });

    if (newSlider === null)
      throw { error: "Error creating Slider", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New Slider created",
        data: newSlider,
        status: 200,
      },
      "createSlider"
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
      "createSlider"
    );
  }
}
//----------------------------- End create a new Slider -----------------------------//

//----------------------------- Get all or a single Slider -----------------------------//
async function getSliders(req) {
  try {
    let where = {};
    if (req.query.sliderId != null) where.id = req.query.sliderId;

    let order = [];
    order.push(["order", "asc"]);

    let sliders = await Sliders.findAll({
      where,
      // order,
      // include: [{ model: ListaTipos, required: false }],
    });
    checkCommonErrors(sliders);

    const data = where.id ? sliders[0] : sliders;

    return response(
      req.params,
      {
        title: "Sliders",
        data,
        status: 200,
      },
      "getSliders"
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
      "getSliders"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

////////////////////////////////// SLIDES //////////////////////////////////

//----------------------------- Create a new slide -----------------------------//
async function createSlide(req) {
  const t = await conn.transaction();
  try {
    // VALIDATE SLIDER
    if (!(await Sliders.findByPk(req.body.sliderId)))
      throw {
        error: `Slider ${req.body.exhibicionId} doesnt exists`,
        status: 404,
      };

    //Create slide
    const newSlide = await Slides.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      index: req.body.index,
      contenidoId: req.body.contenidoId,
      sliderId: req.body.sliderId,
      tipoSlideId: req.body.tipoSlideId,
    });

    if (newSlide === null) throw { error: "Error creating Slide", status: 400 };

    const newContents = await Promise.all(
      req.body.contents.map(async (content) => {
        await MediosSlides.create({
          SlideId: newSlide.id,
          MedioId: content.medioId,
          index: content.index,
        });
      })
    );

    if (newContents === null)
      throw { error: "Error creating contents for Slide", status: 400 };

    await t.commit();
    return response(
      req.body,
      {
        title: "New Slide created",
        data: newSlide,
        status: 200,
      },
      "createSlide"
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
      "createSlide"
    );
  }
}
//----------------------------- End create a new Slide -----------------------------//

//----------------------------- Get all or a single Slide -----------------------------//
async function getSlide(req) {
  try {
    let where = {};
    if (req.query.sliderId != null) where.sliderId = req.query.sliderId;

    let order = [];
    order.push(["order", "asc"]);

    let slides = await Slides.findAll({
      where,
      // order,
      // include: [{ model: ListaTipos, required: false }],
    });
    checkCommonErrors(slides);

    const data = where.id ? slides[0] : slides;

    return response(
      req.params,
      {
        title: "Slides",
        data,
        status: 200,
      },
      "getSlides"
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
      "getSlides"
    );
  }
}
//----------------------------- End get all or a single ad -----------------------------//

module.exports = {
  createSlider,
  getSliders,
  createSlide,
  getSlide,
};
