const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
  name: String,
  areaCoordinates: [[Number]], // polygon
  altitude: Number,
  status: String, // planned, in-progress, completed, aborted
  droneId: { type: mongoose.Schema.Types.ObjectId, ref: "Drone" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mission", missionSchema);
