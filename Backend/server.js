const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/rideApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Wallet Schema
const WalletSchema = new mongoose.Schema({
  balance: { type: Number, default: 0 },
});
const Wallet = mongoose.model("Wallet", WalletSchema);

// Ride Schema
const RideSchema = new mongoose.Schema({
  pickup: String,
  destination: String,
  driver: String,
  user: String, // In future, this can be ObjectId and ref to a User model
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
const Ride = mongoose.model("Ride", RideSchema);

// ✅ WALLET ROUTES

// Get Wallet Balance
app.get("/api/wallet/balance", async (req, res) => {
  try {
    let wallet = await Wallet.findOne();
    if (!wallet) {
      wallet = new Wallet();
      await wallet.save();
    }
    res.json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add Money to Wallet
app.post("/api/wallet/add", async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    let wallet = await Wallet.findOne();
    if (!wallet) {
      wallet = new Wallet({ balance: 0 });
    }

    wallet.balance += amount;
    await wallet.save();

    res.json({ message: "Money added successfully", balance: wallet.balance });
  } catch (error) {
    console.error("Error updating wallet:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Deduct Money from Wallet
app.post("/api/wallet/deduct", async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    let wallet = await Wallet.findOne();
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    wallet.balance -= amount;
    await wallet.save();

    res.json({ message: "Payment successful", balance: wallet.balance });
  } catch (error) {
    console.error("Error deducting balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ RIDE ROUTES

// Book a Ride
app.post("/api/rides/book", async (req, res) => {
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

// Accept a Ride (simulated auto-accept)
app.post("/api/rides/accept", async (req, res) => {
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

// Get Ride History for a User
app.get("/api/rides/history", async (req, res) => {
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

// ✅ Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
