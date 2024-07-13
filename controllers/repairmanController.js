const Repairman = require("../models/repairmanModel");

exports.createRepairman = async (req, res) => {
  try {
    const newRepairman = await Repairman.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        repairman: newRepairman,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getRepairmen = async (req, res) => {
  try {
    const queryObject = { ...req.query };
    const excludedFields = ["sort", "limit", "fields"];
    excludedFields.forEach((element) => delete queryObject[element]);

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Repairman.find(JSON.parse(queryString));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    const repairmen = await query;
    res.status(200).json({
      status: "success",
      results: repairmen.length,
      data: {
        repairmen,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getRepairmanById = async (req, res) => {
  try {
    const repairman = await Repairman.findById(req.params.id).populate("likes");
    if (!repairman) {
      res.status(404).json({
        status: "failed",
        message: "invalid ID",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          repairman,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateRepairman = async (req, res) => {
  try {
    const repairman = await Repairman.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        repairman,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteRepairman = async (req, res) => {
  try {
    await Repairman.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "repairman deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
