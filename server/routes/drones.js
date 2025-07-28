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

module.exports = router;
