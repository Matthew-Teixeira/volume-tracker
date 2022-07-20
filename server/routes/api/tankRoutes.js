const router = require("express").Router();
const {
  getAllTanks,
  getTank,
  addTank,
  updateTank,
  deleteTank,
} = require("../../controllers/tankControllers");
const protected = require("../../middleware/authMiddleware")

router.get("/", protected, getAllTanks);
router.get("/:id", protected, getTank);
router.post("/addTank", protected, addTank);
router.put("/updateTank/:id", protected, updateTank);
router.delete("/deleteTank/:id", protected, deleteTank);

module.exports = router;
