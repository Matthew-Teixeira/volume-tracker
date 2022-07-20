const router = require("express").Router();
const { getVolume, addVolume, updateVolume, deleteVolume } = require("../../controllers/volumeControllers");
const protected = require("../../middleware/authMiddleware")

router.get("/:id", protected, getVolume);
router.post("/addVolume/:id", protected, addVolume);
router.put("/:id", protected, updateVolume);
router.delete("/:id", protected, deleteVolume);

module.exports = router;
