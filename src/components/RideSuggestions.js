import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const RideSuggestions = () => {
  const location = useLocation();
  let { pickup, destination } = location.state || {
    pickup: { lat: 22.5833, lng: 88.3378 }, // Howrah Station, West Bengal
    destination: { lat: 22.4500, lng: 88.1103 }, // Calcutta Institute of Technology, Uluberia
  };

  const [driverAccepted, setDriverAccepted] = useState(false);
  const [price, setPrice] = useState(0);
  const [rideStarted, setRideStarted] = useState(false);

  useEffect(() => {
    if (pickup && destination) {
      setPrice(Math.floor(Math.random() * (500 - 100 + 1)) + 100);
      setTimeout(() => {
        setDriverAccepted(true);
        setTimeout(() => {
          setRideStarted(true);
        }, 5000); // Simulate ride start after 5 seconds
      }, 60000);
    }
  }, [pickup, destination]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🚖 Ride Details</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
        <p className="text-lg">Pickup: {pickup?.lat}, {pickup?.lng}</p>
        <p className="text-lg">Destination: {destination?.lat}, {destination?.lng}</p>
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
      <MapComponent pickup={pickup} destination={destination} showNearby={rideStarted} />
    </div>
  );
};

export default RideSuggestions;
