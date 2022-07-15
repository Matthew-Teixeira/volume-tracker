const { Schema, model } = require("mongoose");

const volumeSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  totalVol: {
    type: Number,
    required: true,
    min: 0,
    max: 17000,
  },
  waterVol: {
    type: Number,
    required: true,
    min: 0,
    max: 17000,
  },
  productVol: {
    type: Number,
    required: true,
    min: 0,
    max: 17000,
  },
});

const Volume = model("Volume", volumeSchema);

module.exports = Volume;