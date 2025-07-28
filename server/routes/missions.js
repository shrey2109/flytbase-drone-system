const express = require("express");
const Mission = require("../models/Mission");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, areaCoordinates, altitude, droneId } = req.body;
  const mission = new Mission({
    name,
    areaCoordinates,
    altitude,
    droneId,
    status: "planned",
  });
  await mission.save();
  res.json(mission);
});

router.get("/", async (req, res) => {
  const missions = await Mission.find().populate("droneId");
  res.json(missions);
});

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const mission = await Mission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(mission);
  } catch (err) {
    res.status(500).json({ message: "Failed to update mission status" });
  }
});

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const mission = await Mission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(mission);
  } catch (err) {
    res.status(500).json({ message: "Failed to update mission status" });
  }
});

module.exports = router;
