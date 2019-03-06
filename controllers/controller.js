const db = require("../models");
const miner = require("./assets/minerControl");
const moment = require("moment");

module.exports = {
  // get one
  find: function(req, res) {
    console.log("find: ", req.params.query);
    db.Miner
      .find({ minerName: req.params.query })
      .then(dbModel => {
        console.log("find dbModel: ", dbModel);
        miner.dig(dbModel, 1, reply => {
          console.log("controller reply: ", reply);
          let newModel = reply;
          return this.update(newModel);
        })
      })
      .catch(err => res.status(422).json(err));
  },
  // get em all
  retrieve: function(req, res) {
    console.log("controller retrieve");
    db.Miner
      .find()
      .then(dbModel => {
        // console.log("dbModel: ", dbModel);
        for(i=0; i<dbModel.length; i++) {
          console.log("dbModel[i].minerName: ", dbModel[i].minerName);
          let miliDiff = (moment() - dbModel[i].updatedAt);
          console.log("miliDiff: ", miliDiff);
          dbModel[i].fillLevel += Math.floor(miliDiff);
          console.log("dbModel fill level: ", dbModel[i].fillLevel);
        }
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("create: ", req.body);
    miner.createMiner(req.body, (msg, respond) => {
      console.log(msg, respond);
    });
    db.Miner
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("update: ", req.body);
    let query   = { minerName: req.body.minerName }; 
    let update  = req.body; 
    let options = { new: true }; 
    db.Miner
    .findOneAndUpdate(query, update, options, (err, doc) => {
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("delete: ", req.params.query);
    db.Miner
      .findOneAndDelete({ minerName: req.params.query })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};