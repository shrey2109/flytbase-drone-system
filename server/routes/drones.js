const express = require("express");
const Drone = require("../models/Drone");
const router = express.Router();

router.get("/", async (req, res) => {
  const drones = await Drone.find();
  res.json(drones);
});

router.post("/mock", async (req, res) => {
  const drone = new Drone({
    name: `Drone-${Math.floor(Math.random() * 1000)}`,
    battery: 100,
    status: "available",
    location: { lat: 18.5204, lng: 73.8567 },
  });
  await drone.save();
  res.json(drone);
});

// GET /api/drones/:id
router.get("/:id", async (req, res) => {
  try {
    const drone = await Drone.findById(req.params.id);
    if (!drone) return res.status(404).send("Drone not found");
    res.json(drone);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
