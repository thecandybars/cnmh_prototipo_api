const router = require("express").Router();
const {
  createDepartamento,
  // editDepartamento,
  // deleteDepartamento,
  getDepartamentos,
} = require("../controllers/index.js");

//----------------------------- Create a new Departamento -----------------------------//
router.post("/", async (req, res) => {
  const response = await createDepartamento(req);
  res.status(response.status).json(response);
});

//----------------------------- Edit a Departamento -----------------------------//
// router.put("/:departamentoId", async (req, res) => {
//   const response = await editDepartamento(req);
//   res.status(response.status).json(response);
// });

//-----------------------------  Delete a Departamento -----------------------------//
// router.delete("/:departamentoId", async (req, res) => {
//   const response = await deleteDepartamento(req);
//   res.status(response.status).json(response);
// });

//----------------------------- Get all or a single Departamento -----------------------------//
router.get("/", async (req, res) => {
  const response = await getDepartamentos(req);
  res.status(response.status).json(response);
});

module.exports = router;
