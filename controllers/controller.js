const db = require("../models");
const miner = require("./assets/minerControl");
const moment = require("moment");

module.exports = {
  // get one
  find: (req, res) => {
    db.Miner
      .find({ minerName: req.params.query })
      .then(dbModel => {
        miner.dig(dbModel, reply => {
          let newModel = reply;
          return this.update(newModel);
        })
      })
      .catch(err => res.status(422).json(err));
  },
  // get em all
  retrieve: (req, res) => {
    let minersArray = [];
    const addMiner = newMiner => {
      minersArray.push(newMiner);
      return minersArray;
    }
    db.Miner
    .find()
    .then(miners => {
      async function processArray(miners) {
        for(const miner of miners) {
          let miliDiff = (moment() - miner.updatedAt)/1000;
          for(let j=miner.iteration; j<miliDiff; j++) {
            let base = j/1000;
            let exp = -2 * (base-1);
            let load = Math.pow(base, exp);
            miner.fillLevel += load * miner.purity;
            miner.iteration ++;
          }
          let query = { _id: miner._id};
          let update = {
            fillLevel: miner.fillLevel,
            iteration: miner.iteration
          };
          let options = { new: true }; 
          // console.log("query: ", query);
          // console.log("update: ", update);
          // console.log("options: ", options);
          await db.Miner
          .findOneAndUpdate(query, update, options, (err, reaction) => {
            if(err) throw err;
          })
          .then(reaction => {
            addMiner(reaction)
          })
        }
        return minersArray;
      }
      processArray(miners)
      .then(minersArray => {
        console.log("minersArray just before sending it back: ", minersArray);
        res.json(minersArray);
      })
    })
    .catch(err => res.status(422).json(err));
  },
  // making miner babies
  create: (req, res) => {
    console.log("create: ", req.body);
    // miner.createMiner(req.body, (msg, respond) => {
    //   console.log(msg, respond);
    // });
    db.Miner
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // updating miner vitals
  update: (req, res) => {
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
  // the end of days for the miner
  remove: (req, res) => {
    console.log("delete: ", req.params.query);
    db.Miner
      .findOneAndDelete({ minerName: req.params.query })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};