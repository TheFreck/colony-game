const router = require("express").Router();
const minerRoutes = require("./minerRoutes");
const mapRoutes = require("./mapRoutes");

router.use("/minerRoutes", minerRoutes);
router.use("/mapRoutes", mapRoutes);

module.exports = router;
