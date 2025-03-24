import React, { useState } from "react";

const BookingForm = ({ onBook }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(pickup, dropoff);
  };

  return (
    <div className="booking-form">
      <h2>Book Your Ride 🚖</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter Pickup Location" 
          value={pickup} 
          onChange={(e) => setPickup(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Enter Drop-off Location" 
          value={dropoff} 
          onChange={(e) => setDropoff(e.target.value)} 
          required 
        />
        <button type="submit">Find a Ride</button>
      </form>
    </div>
  );
};

export default BookingForm;
