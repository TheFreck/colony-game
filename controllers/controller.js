const db = require("../models");
const miner = require("./assets/minerControl");
const moment = require("moment");

module.exports = {
  // get one
  find: (req, res) => {
    // console.log("find: ", req.params.query);
    db.Miner
      .find({ minerName: req.params.query })
      .then(dbModel => {
        // console.log("find dbModel: ", dbModel);
        miner.dig(dbModel, reply => {
          // console.log("controller reply: ", reply);
          let newModel = reply;
          return this.update(newModel);
        })
      })
      .catch(err => res.status(422).json(err));
  },
  // get em all
  retrieve: (req, res) => {
    console.log("controller retrieve: ", res._events);
    db.Miner
    .find()
    .then(miners => {
      let minersArray = [];
      for(let i=0; i<miners.length; i++) {
        let miner = miners[i];
        let miliDiff = (moment() - miner.updatedAt)/1000;
        console.log("theMiners: ", miners);
        console.log("miliDiff: ", miliDiff);
        for(let j=miner.iteration; j<miliDiff; j++) {
          let base = j/1000;
          let exp = -2 * (j/1000-1);
          let load = Math.pow(base, exp);
          miner.fillLevel += load * miner.purity;
          miner.iteration ++;
          console.log(`load ${i}: ${load * miner.purity}`);
        }
        // console.log("time passed: ", moment(moment() - miner.updatedAt).format("HH:mm:ss.SSS"));
        let query = { _id: miner._id};
        let update = {
          fillLevel: miner.fillLevel,
          iteration: miner.iteration
        };
        let options = { new: true }; 
        console.log("query: ", query);
        console.log("update: ", update);
        console.log("options: ", options);
        db.Miner
        .findOneAndUpdate(query, update, options, (err, reaction) => {
          console.log("dig update: ", reaction);
          minersArray.push(reaction);
          return minersArray;
        })
        .then(dbModel => {
          console.log("dig finale dbModel: ", dbModel);
          console.log("dig finale minersArray: ", minersArray);
          return minersArray;
        })
        .catch(err => res.status(422).json(err));
        console.log("minersArray after catch: ", minersArray);
      }
      console.log("minersArray just before sending it back: ", minersArray);
      return minersArray;
    })
    //   async function dig() {

    //     let anything = await miner.dig(dbModel);
    //     return anything;
    //   }
    //   dig(dbModel)
    //   .then(result => {
    //     console.log("result: ", result);
    //     res.json(result);
    //   })
    // })
    // let minersArray = [1];
    // for(i=0; i<dbModel.length; i++) {
    //   miner.dig(dbModel[i], reply => {
    //     console.log("controller reply: ", reply);
    //     minersArray.push(reply);
    //     console.log("minersArray loop: ", minersArray)
    //   })
    // }
    // console.log("hit this shit!!!: minersArray: ", minersArray)
    // res.json(minersArray);
    // })
    .catch(err => res.status(422).json(err));
  },
  // making miner babies
  create: (req, res) => {
    console.log("create: ", req.body);
    miner.createMiner(req.body, (msg, respond) => {
      console.log(msg, respond);
    });
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