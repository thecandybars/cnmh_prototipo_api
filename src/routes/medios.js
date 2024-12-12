const router = require("express").Router();
const { createMedio, getMedios } = require("../controllers/index.js");
const fileUpload = require("../common/fileUpload.js");

const upload = fileUpload();

//----------------------------- Create a new Medio -----------------------------//
router.post("/", upload.single("medios"), async (req, res) => {
  const response = await createMedio(req);
  res.status(response.status).json(response);
});

//----------------------------- Get all or a single Medio -----------------------------//
router.get("/", async (req, res) => {
  const response = await getMedios(req);
  res.status(response.status).json(response);
});

module.exports = router;
