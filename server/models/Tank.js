const { Schema, model } = require("mongoose");

const tankSchema = new Schema(
  {
    zone: {
      type: String,
      required: true,
    },
    tankName: {
      type: String,
      required: true,
      unique: true,
    },
    volumes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Volume",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

tankSchema.virtual("volumeCount").get(function () {
  return this.volumes.length;
});

const Tank = model("Tank", tankSchema);

module.exports = Tank;
