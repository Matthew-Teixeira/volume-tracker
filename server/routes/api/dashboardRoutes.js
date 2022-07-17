const router = require("express").Router();
const { getDashData } = require("../../controllers/dashboardControllers");
const protected = require("../../middleware/authMiddleware")

router.get("/", getDashData)

module.exports = router;