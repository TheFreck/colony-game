const router = require("express").Router();
const controller = require("../../controllers/controller");

router.route("/map/:query")
  .get(controller.getMiners);
  
router.route("/")
  .get(controller.retrieve)
  .post(controller.create)
  .put(controller.update);

router.route("/:query")
  .get(controller.find)
  .delete(controller.remove);


module.exports = router;
