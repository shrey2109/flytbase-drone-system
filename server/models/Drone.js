const mongoose = require("mongoose");

const droneSchema = new mongoose.Schema({
  name: String,
  battery: Number,
  status: String, // available, in-mission
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("Drone", droneSchema);
