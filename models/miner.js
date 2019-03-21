const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const map = require("../models/map")

const minerSchema = new Schema({
  minerName: {
    type: String,
    required: true
  },
  minerLocation: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  purity: {
    type: Number,
    min: 0,
    max: 1,
    required: true,
    default: 0
  },
  fillLevel: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: 0
  },
  iteration: {
    type: Number,
    required: true,
    default: 0
  },
  depletion: {
    type: Number,
    min: 0,
    max: 1,
    required: true,
    default: 0
  },
  map: {
    type: Schema.Types.ObjectId,
    ref: map
  }
},
{
  timestamps: true
})


const Miner = mongoose.model("Miner", minerSchema);

module.exports = Miner;
