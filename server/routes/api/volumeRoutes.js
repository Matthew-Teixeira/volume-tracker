const router = require("express").Router();
const { getVolume, addVolume, updateVolume, deleteVolume } = require("../../controllers/volumeControllers");

router.get("/:id", getVolume);
router.post("/addVolume/:tankName", addVolume);
router.put("/:id", updateVolume);
router.delete("/:id", deleteVolume);

module.exports = router;
