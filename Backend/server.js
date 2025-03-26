require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI is not defined. Check your .env file.");
    process.exit(1);  // Exit the process to prevent further execution
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected Successfully");
}).catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);  // Exit if MongoDB fails to connect
});

// Basic Route
app.get('/', (req, res) => {
    res.send('OneHub Travel Assistance Backend is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
