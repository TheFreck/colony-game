const db = require("../models");
// const miner = require("./assets/minerControl");
const moment = require("moment");

module.exports = {
  // get one
  find: (req, res) => {
    res.send("get it yourself!: ", req.body);
    // db.Miner
    //   .find({ minerName: req.params.query })
    //   .then(dbModel => {
    //     miner.dig(dbModel, reply => {
    //       let newModel = reply;
    //       return this.update(newModel);
    //     })
    //   })
    //   .catch(err => res.status(422).json(err));
  },
  // get the miners for the map
  getMiners: (req, res) => {
    console.log("get Miners");
    // console.log("getMiners req.params.query: ", req.params.query);
    let mapId = req.params.query;
    let minersArray = [];
    const addMiner = newMiner => {
      minersArray.push(newMiner);
      return minersArray;
    }
    db.Miner
    .find({ map: mapId })
    .then(miners => {
      async function processArray(miners) {
        for(let miner of miners) {
          console.log("miner name, iteration: ", miner.minerName + miner.iteration);
          let miliDiff = (moment() - miner.updatedAt)/10;
          let priorDig;
          let depletion = "";
          for(let j=0; j<miliDiff; j++) {
            let base = j/1000;
            let exp = -2 * (base-1);
            let load = Math.pow(base, exp);
            miner.fillLevel += load * miner.purity;
            // console.log("load: ", load);
            // console.log("priorDig: ", priorDig);
            if(load < priorDig) {
              depletion = 1 - load;
              console.log("depletion: ", depletion);
            }
            miner.iteration ++;
            priorDig = load;
          }
          let query = { _id: miner._id};
          let update = {
            fillLevel: miner.fillLevel,
            iteration: miner.iteration,
            depletion: depletion
          };
          let options = { new: true }; 
          // console.log("query: ", query);
          // console.log("update: ", update);
          // console.log("options: ", options);
          console.log("right before updating miner: name, iteration: ", miner.minerName + miner.iteration);
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
        res.json(minersArray);
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
        for(let miner of miners) {
          console.log("miner name, iteration: ", miner.minerName + miner.iteration);
          let miliDiff = (moment() - miner.updatedAt)/1000;
          let priorDig;
          for(let j=0; j<miliDiff; j++) {
            let base = j/1000;
            let exp = -2 * (base-1);
            let load = Math.pow(base, exp);
            let depletion;
            miner.fillLevel += load * miner.purity;
            if(load < priorDig) {
              depletion = 1 - load;
              console.log("depletion: ", depletion);
            }
            miner.iteration ++;
            priorDig = load;
          }
          let query = { _id: miner._id};
          let update = {
            fillLevel: miner.fillLevel,
            iteration: miner.iteration,
            depletion
          };
          let options = { new: true }; 
          // console.log("query: ", query);
          // console.log("update: ", update);
          // console.log("options: ", options);
          console.log("right before updating miner: name, iteration: ", miner.minerName + miner.iteration);
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
        for(let mine of minersArray) {
          console.log(mine.minerName, mine.iteration);
        }
        res.json(minersArray);
      })
    })
    .catch(err => res.status(422).json(err));
  },
  // making miner babies
  create: (req, res) => {
    console.log("create: ", req.body);
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