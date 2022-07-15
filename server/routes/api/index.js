const router = require("express").Router();
const userRoutes = require("./userRoutes");
const volumeRoutes = require("./tankRoutes");

router.use("/user", userRoutes);
router.use("/tanks", volumeRoutes);

module.exports = router;
