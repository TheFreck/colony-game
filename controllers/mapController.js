const db = require("../models");

module.exports = {
  create: (req, res) => {
    // console.log("map create req.body: ", req.body);
    db.Map
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    console.log("map update req.body: ", req.body);
    res.send("map update");
  },
  find: (req, res) => {
    console.log("map find req.body: ", req.body);
    res.send("map find");
  },
  remove: (req, res) => {
    console.log("map remove req.body: ", req.body);
    res.send("map remove");
  }
}