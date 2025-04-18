const express = require("express");
const router = express.Router();
const Ride = require("../models/Ride");

// ✅ Book a Ride
router.post("/book", async (req, res) => {
  const { pickup, destination, userId } = req.body;

  try {
    const ride = new Ride({ pickup, destination, user: userId });
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ error: "Ride booking failed" });
  }
});

// ✅ Accept a Ride (e.g., simulated auto-accept)
router.post("/accept", async (req, res) => {
  const { rideId, driverId } = req.body;

  try {
    const updatedRide = await Ride.findByIdAndUpdate(
      rideId,
      { status: "accepted", driver: driverId },
      { new: true }
    );
    res.json(updatedRide);
  } catch (error) {
    console.error("Accepting failed:", error);
    res.status(500).json({ error: "Ride acceptance failed" });
  }
});

// ✅ Get Ride History for a User
router.get("/history", async (req, res) => {
  const { userId } = req.query;

  try {
    const rides = await Ride.find({
      user: userId,
      status: { $in: ["accepted", "completed"] }
    }).sort({ createdAt: -1 });

    res.json(rides);
  } catch (error) {
    console.error("History fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch ride history" });
  }
});

module.exports = router;
