const router = require("express").Router();
const {
  createRegion,
  // editRegion,
  // deleteRegion,
  getRegions,
} = require("../controllers/index.js");

//----------------------------- Create a new Region -----------------------------//
router.post("/", async (req, res) => {
  const response = await createRegion(req);
  res.status(response.status).json(response);
});

//----------------------------- Edit a Region -----------------------------//
// router.put("/:regionId", async (req, res) => {
//   const response = await editRegion(req);
//   res.status(response.status).json(response);
// });

//-----------------------------  Delete a Region -----------------------------//
// router.delete("/:regionId", async (req, res) => {
//   const response = await deleteRegion(req);
//   res.status(response.status).json(response);
// });

//----------------------------- Get all or a single Region -----------------------------//
router.get("/", async (req, res) => {
  const response = await getRegions(req);
  res.status(response.status).json(response);
});

module.exports = router;
