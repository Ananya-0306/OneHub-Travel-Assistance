import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const RideSuggestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");

  const { pickup, destination } = location.state || { pickup: "", destination: "" };
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
          deductPayment();
        }, 5000);
                }, 60000);
    }
  }, [pickup, destination]);

  const deductPayment = async () => {
    const res = await fetch("http://localhost:5000/api/wallet/deduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, amount: price }),
    });

    const data = await res.json();
    if (data.message === "Insufficient balance") {
      alert("❌ Insufficient balance! Please add money to your wallet.");
      navigate("/wallet");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🚖 Ride Details</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
        <p className="text-lg">Pickup: {pickup}</p>
        <p className="text-lg">Destination: {destination}</p>
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
      <MapComponent pickup={pickup} destination={destination} />
    </div>
  );
};

export default RideSuggestions;