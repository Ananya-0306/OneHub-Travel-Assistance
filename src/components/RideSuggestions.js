import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import MapComponent from "../components/MapComponent";

const RideSuggestions = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { pickup, destination } = location.state || { pickup: "", destination: "" };
  
  const [driverAccepted, setDriverAccepted] = useState(false);
  const [price, setPrice] = useState(0);
  const [rideStarted, setRideStarted] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (pickup && destination) {
      setPrice(Math.floor(Math.random() * (500 - 100 + 1)) + 100);
      setTimeout(() => {
        setDriverAccepted(true);
        setTimeout(() => {
          setRideStarted(true);
        }, 5000);
      }, 60000);
    }
  }, [pickup, destination]);

  useEffect(() => {
    if (rideStarted) {
      fetchNearbyPlaces();
    }
  }, [rideStarted]);

  const geocode = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
    );
    const data = await res.json();
    return data[0]; // return the first result
  };

  const fetchNearbyPlaces = async () => {
    setLoading(true); // Set loading state to true
    try {
      const pickupData = await geocode(pickup);
      const destData = await geocode(destination);
      if (!pickupData || !destData) return;

      const midLat = (parseFloat(pickupData.lat) + parseFloat(destData.lat)) / 2;
      const midLon = (parseFloat(pickupData.lon) + parseFloat(destData.lon)) / 2;

      const overpassQuery = `
        [out:json];
        (
          node(around:1000,${midLat},${midLon})["amenity"];
          way(around:1000,${midLat},${midLon})["amenity"];
          relation(around:1000,${midLat},${midLon})["amenity"];
        );
        out center;
      `;

      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
      });

      const data = await res.json();
      setNearbyPlaces(data.elements.slice(0, 10));
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    } finally {
      setLoading(false); // Set loading state to false once the data is fetched
    }
  };

  const handleEndRide = () => {
    const rideSummary = `
      Ride Summary:
      Pickup: ${pickup}
      Destination: ${destination}
      Price: ₹${price}
    `;
    const isConfirmed = window.confirm(`${rideSummary}\n\nDo you want to pay now?`);
    if (isConfirmed) {
      alert("Payment Successful!");
      navigate("/"); // Redirect to the main page (home page) after payment
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🚖 Ride Details</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
        <p className="text-lg">Pickup: {pickup}</p>
        <p className="text-lg">Destination: {destination}</p>
        <p className="text-lg">Price: ₹{price}</p>

        {driverAccepted ? (
          rideStarted ? (
            <>
              <p className="text-green-400 font-bold mt-4">🚗 Ride has started!</p>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">📍 Nearby Places:</h2>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full border-4 border-t-4 border-white h-8 w-8"></div>
                  </div>
                ) : nearbyPlaces.length > 0 ? (
                  <ul className="list-disc list-inside text-sm">
                    {nearbyPlaces.map((place, idx) => (
                      <li key={idx}>{place.tags.name || "Unnamed place"}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No nearby places found.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-green-400 font-bold mt-4">✅ Driver has accepted the ride!</p>
          )
        ) : (
          <p className="text-yellow-400 font-bold mt-4">⌛ Waiting for driver to accept...</p>
        )}
      </div>
      <MapComponent pickup={pickup} destination={destination} nearbyPlaces={nearbyPlaces} />

      {/* End Ride Button */}
      {rideStarted && (
        <button
          onClick={handleEndRide}
          className="mt-6 px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
        >
          End Ride
        </button>
      )}
    </div>
  );
};

export default RideSuggestions;