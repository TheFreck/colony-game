const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  }
},
{
  timestamps: true
})


const Miner = mongoose.model("Miner", minerSchema);

module.exports = Miner;
