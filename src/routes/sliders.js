const router = require("express").Router();
const {
  createSlider,
  getSliders,
  createSlide,
  getSlide,
} = require("../controllers/index.js");

//----------------------------- Create a new Slider -----------------------------//
router.post("/", async (req, res) => {
  const response = await createSlider(req);
  res.status(response.status).json(response);
});

//----------------------------- Get all or a single Slider -----------------------------//
router.get("/", async (req, res) => {
  const response = await getSliders(req);
  res.status(response.status).json(response);
});

///////////////////////     S L I D E S     ///////////////////////////

//----------------------------- Create a new Slide -----------------------------//
router.post("/slide", async (req, res) => {
  const response = await createSlide(req);
  res.status(response.status).json(response);
});

//----------------------------- Get all or a single Slide -----------------------------//
router.get("/slide", async (req, res) => {
  const response = await getSlide(req);
  res.status(response.status).json(response);
});

module.exports = router;
