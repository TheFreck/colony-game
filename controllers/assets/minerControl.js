const db = require("../../models");
const moment = require("moment");

module.exports = {
  createMiner: (sumpin, respond) => {
    // console.log("minerControl: ", sumpin);
    let miner = {
      minerName: sumpin.minerName,
      minerLocation: {
        x: sumpin.minerLocation.x,
        y: sumpin.minerLocation.y
      },
      purity: sumpin.purity,
      fillLevel: 0
    }
    // console.log("minerControl miner: ", miner);
    respond(`minerControl has been hit. send reinforcements: `, miner);
  },
  dig: miners => {
    console.log("miners: ", miners);
    let minersArray = [];
    for(let i=0; i<miners.length; i++) {
      let miner = miners[i];
      let miliDiff = (moment() - miner.updatedAt)/1000;
      console.log("miliDiff: ", miliDiff);
      for(let j=miner.iteration; j<miliDiff; j++) {
        let base = j/1000;
        let exp = -2 * (j/1000-1);
        let load = Math.pow(base, exp);
        miner.fillLevel += load * miner.purity;
        miner.iteration ++;
        // console.log(`load ${i}: ${load * miner.purity}`);
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
  }
}