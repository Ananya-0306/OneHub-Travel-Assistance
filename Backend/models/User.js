const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  pickup: String,
  destination: String,
  driver: String, // You can reference a Driver model later if needed
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ✅ Link to user
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ride", RideSchema);
