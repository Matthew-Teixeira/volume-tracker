const router = require("express").Router();
const userRoutes = require("./userRoutes");
const tankRoutes = require("./tankRoutes");
const volumeRoutes = require("./volumeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/user", userRoutes);
router.use("/tanks", tankRoutes);
router.use("/volumes", volumeRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
