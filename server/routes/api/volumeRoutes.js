const router = require("express").Router();
const { addVolume } = require("../../controllers/volumeControllers");

router.post("/addVolume/:tankName", addVolume);

module.exports = router;
