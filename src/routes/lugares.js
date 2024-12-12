const router = require("express").Router();
const {
  createLugar,
  // editLugar,
  // deleteLugar,
  getLugares,
} = require("../controllers/index.js");

//----------------------------- Create a new Lugar -----------------------------//
router.post("/", async (req, res) => {
  const response = await createLugar(req);
  res.status(response.status).json(response);
});

//----------------------------- Edit a Lugar -----------------------------//
// router.put("/:lugarId", async (req, res) => {
//   const response = await editLugar(req);
//   res.status(response.status).json(response);
// });

//-----------------------------  Delete a Lugar -----------------------------//
// router.delete("/:lugarId", async (req, res) => {
//   const response = await deleteLugar(req);
//   res.status(response.status).json(response);
// });

//----------------------------- Get all or a single Lugar -----------------------------//
router.get("/", async (req, res) => {
  const response = await getLugares(req);
  res.status(response.status).json(response);
});

module.exports = router;
