const { Schema, model } = require("mongoose");

const tankSchema = new Schema({
    zone:{
        type: String,
        required: true,
    },
    tankName: {
        type: String,
        required: true,
        unique: true
    },
    volumes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Volume"
        }
    ]
})

const Tank = model('Tank', tankSchema);

module.exports = Tank;