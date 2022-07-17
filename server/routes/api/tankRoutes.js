const router = require("express").Router();
const {
  getAllTanks,
  getTank,
  addTank,
  updateTank,
  deleteTank,
} = require("../../controllers/tankControllers");
const protected = require("../../middleware/authMiddleware")

router.get("/", getAllTanks);
router.get("/:id", getTank);
router.post("/addTank", addTank);
router.put("/updateTank/:id", updateTank);
router.delete("/deleteTank/:id", deleteTank);

module.exports = router;
