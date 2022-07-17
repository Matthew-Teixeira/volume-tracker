const router = require("express").Router();
const { getVolume, addVolume, updateVolume, deleteVolume } = require("../../controllers/volumeControllers");
const protected = require("../../middleware/authMiddleware")

router.get("/:id", getVolume);
router.post("/addVolume/:id", addVolume);
router.put("/:id", updateVolume);
router.delete("/:id", deleteVolume);

module.exports = router;
