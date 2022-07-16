const router = require("express").Router();
const { getDashData } = require("../../controllers/dashboardControllers");

router.get("/", getDashData)

module.exports = router;