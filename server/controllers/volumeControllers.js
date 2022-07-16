const { Tank, Volume } = require("../models/index");
const asyncHandler = require("express-async-handler");

const getVolume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const volume = await Volume.findById(id);
  return res.status(200).json(volume);
});

const addVolume = asyncHandler(async (req, res) => {
  const { tankName } = req.params;
  console.log(tankName);
  const newVolume = await Volume.create(req.body);
  const tank = await Tank.findOneAndUpdate(
    { tankName },
    { $push: { volumes: newVolume._id } },
    { new: true }
  )
    .populate("volumes")
    .select("-__v");

  return res.status(200).json(tank);
});

const updateVolume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const volume = await Volume.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(200).json(volume);
});

const deleteVolume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const volume = await Volume.findByIdAndDelete(id);
  return res.status(200).json(volume);
});

module.exports = {
  getVolume,
  addVolume,
  updateVolume,
  deleteVolume,
};
