import React, { useState } from "react";

const BookingForm = ({ onBook }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(pickup, dropoff);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animate-bgGradient"></div>

      {/* Booking Form */}
      <div className="z-10 bg-gray-800 p-8 rounded-lg shadow-lg text-white w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Book Your Ride 🚖</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
            className="p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Drop-off Location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
            className="p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded transition-all">
            Find a Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
