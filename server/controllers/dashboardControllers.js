const { User, Tank, Volume } = require("../models/index");
const asyncHandler = require("express-async-handler");

const getDashData = asyncHandler(async (req, res) => {
  const tanks = await Tank.find({}).select("-__v");
  return res.status(200).json(tanks);
});


module.exports = {
    getDashData
}