const router = require("express").Router();
const userRoutes = require("./userRoutes");
const tankRoutes = require("./tankRoutes");
const volumeRoutes = require("./volumeRoutes");

router.use("/user", userRoutes);
router.use("/tanks", tankRoutes);
router.use("/volumes", volumeRoutes);

module.exports = router;
