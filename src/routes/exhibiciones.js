const router = require("express").Router();
const {
  createExhibicion,
  getExhibiciones,
} = require("../controllers/index.js");

//----------------------------- Create a new Exhibicion -----------------------------//
router.post("/", async (req, res) => {
  const response = await createExhibicion(req);
  res.status(response.status).json(response);
});

//----------------------------- Get all or a single Exhibicion -----------------------------//
router.get("/", async (req, res) => {
  const response = await getExhibiciones(req);
  res.status(response.status).json(response);
});

module.exports = router;
