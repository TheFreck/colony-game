const router = require("express").Router();
const mapController = require("../../controllers/mapController");

const theRoute = () => {
  console.log("get map route");
}

router.route("/")
  .post(mapController.create)
  .put(mapController.update);

router.route("/:query")
  .get(mapController.find)
  .delete(mapController.remove);


module.exports = router;
