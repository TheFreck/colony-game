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
  }
}