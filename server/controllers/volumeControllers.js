const { Tank, Volume } = require("../models/index");
const asyncHandler = require("express-async-handler");

const getVolume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const volume = await Volume.findById(id);
  return res.status(200).json(volume);
});

const addVolume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newVolume = await Volume.create(req.body);
  const tank = await Tank.findOneAndUpdate(
    { _id: id },
    { $push: { volumes: newVolume._id } },
    { new: true }
  )
    .populate("volumes")
    .select("-__v");

  // Add a bunch of volume data
  // const addVs = async  () => {
  //   let total = (Math.random() * (7000 - 3000) + 3000).toFixed(2);
  //   let water = (Math.random() * (total - 2600) + 2600).toFixed(2);
  //   let prod = (total-water).toFixed(2)
  //   const newVolume = await Volume.create({
  //     "totalVol": total,
  //     "waterVol": water,
  //     "productVol": prod
  // })

  // const tank = await Tank.findOneAndUpdate(
  //   { _id: id },
  //   { $push: { volumes: newVolume._id } },
  //   { new: true }
  // )
  // }

  // for (let i = 0; i < 200; i++) {
  //   addVs()
  // }

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
