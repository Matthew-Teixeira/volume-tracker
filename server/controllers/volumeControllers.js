const { Tank, Volume } = require("../models/index");
const asyncHandler = require("express-async-handler");

const addVolume = asyncHandler(async (req, res) => {
  const { tankName } = req.params;
  console.log(tankName)
  const newVolume = await Volume.create(req.body);
  const tank = await Tank.findOneAndUpdate(
    { tankName },
    { $push: { volumes: newVolume._id } },
    { new: true }
  ).populate("volumes").select("-__v");

  return res.status(200).json(tank)
});

module.exports = {
    addVolume
}