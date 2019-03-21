const router = require("express").Router();
const minerControl = require("../../controllers/minerControl");

router.route("/map/:query")
  .get(minerControl.getMiners);
  
router.route("/")
  .get(minerControl.retrieve)
  .post(minerControl.create)
  .put(minerControl.update);

router.route("/:query")
  .get(minerControl.find)
  .delete(minerControl.remove);


module.exports = router;
