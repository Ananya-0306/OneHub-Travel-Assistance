import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const RideSuggestions = () => {
  const location = useLocation();
  const { pickup, dropoff } = location.state || { pickup: "", dropoff: "" };

  const [driverAccepted, setDriverAccepted] = useState(false);
  const [price, setPrice] = useState(0);
  const [rideStarted, setRideStarted] = useState(false);

  useEffect(() => {
    if (pickup && dropoff) {
      setPrice(Math.floor(Math.random() * (500 - 100 + 1)) + 100);
      setTimeout(() => {
        setDriverAccepted(true);
        setTimeout(() => setRideStarted(true), 5000);
      }, 60000);
    }
  }, [pickup, dropoff]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🚖 Ride Details</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
        <p className="text-lg">Pickup: {pickup}</p>
        <p className="text-lg">Dropoff: {dropoff}</p>
        <p className="text-lg">Price: ₹{price}</p>
        {driverAccepted ? (
          rideStarted ? (
            <p className="text-green-400 font-bold mt-4">🚗 Ride has started!</p>
          ) : (
            <p className="text-green-400 font-bold mt-4">✅ Driver has accepted the ride!</p>
          )
        ) : (
          <p className="text-yellow-400 font-bold mt-4">⌛ Waiting for driver to accept...</p>
        )}
      </div>
      <MapComponent pickup={pickup} destination={dropoff} />
    </div>
  );
};

export default RideSuggestions;
