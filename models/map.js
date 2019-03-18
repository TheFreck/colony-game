const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const miners = require("../models/miner");

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
  detail: {
    type: Number,
    required: true
  }
})

const Map = mongoose.model("Map", mapSchema);

module.exports = Map;
