module.exports = {
  createMiner: function(sumpin, respond) {
    // console.log("minerControl: ", sumpin);
    let miner = {
      minerName: sumpin.minerName,
      minerLocation: {
        x: sumpin.minerLocation.x,
        y: sumpin.minerLocation.y
      },
      fillLevel: 0
    }
    // console.log("minerControl miner: ", miner);
    respond(`minerControl has been hit. send reinforcements: `, miner);
  },
  dig: function(miner, purity, reply) {
    // console.log("miner: ", miner);
    let miliDiff = (moment() - miner.updatedAt)/1000;
    console.log("miliDiff: ", miliDiff);
    
    reply(miner);
  }

}