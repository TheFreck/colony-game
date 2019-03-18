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
    console.log("map find req.body: ", req.params);
    db.Map.find({ mapName: req.params.query })
    .then(response => {
      console.log("map find response: ");
      console.log(response);
      res.send(response);
    })
  },
  remove: (req, res) => {
    console.log("map remove req.body: ", req.body);
    res.send("map remove");
  }
}