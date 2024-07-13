const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is mandatory"],
  },
  address: {
    type: String,
    required: [true, "address is mandatory"],
  },
  manager: {
    type: String,
    required: [true, "manager's full name is mandatory"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
