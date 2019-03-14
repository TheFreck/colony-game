const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = require("../models");

const mapSchema = new Schema({
  mapName: {
    type: String,
    required: true
  },
  x: {
    type: Array,
    required: true
  },
  y: {
    type: Array,
    required: true
  },
  // miners: {
  //   type: Schema.Types.ObjectId,
  //   ref: models.Miner
  // }
})

const Map = mongoose.model("Map", mapSchema);

module.exports = Map;
