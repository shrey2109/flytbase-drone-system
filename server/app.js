const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Import routes
const droneRoutes = require("./routes/drones");
const missionRoutes = require("./routes/missions");

app.use("/api/drones", droneRoutes);
app.use("/api/missions", missionRoutes);

app.get("/", (req, res) => res.send("Drone Survey System Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
