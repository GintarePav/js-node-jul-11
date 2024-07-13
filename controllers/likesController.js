const Likes = require("../models/likesModel");

exports.addLike = async (req, res) => {
  try {
    if (!req.body.repairman) req.body.repairman = req.params.repairmanId;
    if (!req.body.user) req.body.user = req.user.id;

    const newLike = await Likes.create(req.body);
    res.status(201).json({
      status: "success",
      message: "like added",
      data: { newLike },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getLikes = async (req, res) => {
  try {
    let filter = {};
    if (req.params.repairmanId) {
      filter = { repairman: req.params.repairmanId };
    }
    const likes = await Likes.find(filter);
    res.status(200).json({
      status: "success",
      result: likes.length,
      data: { likes },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
