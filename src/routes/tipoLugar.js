const router = require("express").Router();
const { getTiposLugares } = require("../controllers/index.js");

//----------------------------- Get all or a single tipo Lugar -----------------------------//
router.get("/", async (req, res) => {
  const response = await getTiposLugares(req);
  res.status(response.status).json(response);
});

module.exports = router;
