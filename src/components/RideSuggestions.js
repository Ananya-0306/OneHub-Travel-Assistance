import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });

const RideSuggestions = () => {
  const location = useLocation();
  let { pickup, destination } = location.state || {
    pickup: { lat: 22.5833, lng: 88.3378 }, // Howrah Station, West Bengal
    destination: { lat: 22.4500, lng: 88.1103 }, // Calcutta Institute of Technology, Uluberia
  };

  const [driverAccepted, setDriverAccepted] = useState(false);
  const [price, setPrice] = useState(0);
  const [rideStarted, setRideStarted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // ✅ Use useCallback to memoize the function
  const fetchRecommendations = useCallback(async () => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Provide three recommendations for restaurants, grocery stores, and medical shops near the given location.",
          },
          {
            role: "user",
            content: `Find nearby places for location: (${pickup.lat}, ${pickup.lng})`,
          },
        ],
      });
      setRecommendations(response.choices[0]?.message?.content?.split("\n"));
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
    }
  }, [pickup.lat, pickup.lng]);

  useEffect(() => {
    if (pickup && destination) {
      setPrice(Math.floor(Math.random() * (500 - 100 + 1)) + 100);
      setTimeout(() => {
        setDriverAccepted(true);
        setTimeout(() => {
          setRideStarted(true);
          fetchRecommendations(); // ✅ Now it's safe to call fetchRecommendations
        }, 5000); // Simulate ride start after 5 seconds
      }, 60000);
    }
  }, [pickup, destination, fetchRecommendations]); // ✅ Include fetchRecommendations in dependency array

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
      {rideStarted && recommendations.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4 w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">Nearby Recommendations</h2>
          <ul className="list-disc pl-5">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RideSuggestions;
