const router = require("express").Router();
const mapController = require("../../controllers/mapController");

router.route("/")
  .post(mapController.create)
  .put(mapController.update);

router.route("/:query")
  .get(mapController.find)
  .delete(mapController.remove);


module.exports = router;
