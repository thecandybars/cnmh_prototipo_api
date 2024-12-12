const router = require("express").Router();
const {
  // createMunicipio,
  // editMunicipio,
  // deleteMunicipio,
  getMunicipios,
} = require("../controllers/index.js");

//----------------------------- Create a new Municipio -----------------------------//
// router.post("/", async (req, res) => {
//   const response = await createMunicipio(req);
//   res.status(response.status).json(response);
// });

//----------------------------- Edit a Municipio -----------------------------//
// router.put("/:municipioId", async (req, res) => {
//   const response = await editMunicipio(req);
//   res.status(response.status).json(response);
// });

//-----------------------------  Delete a Municipio -----------------------------//
// router.delete("/:municipioId", async (req, res) => {
//   const response = await deleteMunicipio(req);
//   res.status(response.status).json(response);
// });

//----------------------------- Get all or a single Municipio -----------------------------//
router.get("/", async (req, res) => {
  const response = await getMunicipios(req);
  res.status(response.status).json(response);
});

module.exports = router;
