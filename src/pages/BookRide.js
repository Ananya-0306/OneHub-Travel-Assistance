import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import for navigation

const BookRide = () => { 
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [balance, setBalance] = useState(0); // To store wallet balance
  const navigate = useNavigate(); // ✅ Use navigate for redirection

  // Fetch user's wallet balance when the component mounts
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("/api/wallet/balance"); // Adjust the URL based on your backend
        const data = await response.json();
        setBalance(data.balance); // Assume the balance is returned as 'data.balance'
      } catch (error) {
        console.error("Failed to fetch wallet balance", error);
      }
    };

    fetchBalance();
  }, []);

  const handleFindRide = () => {
    console.log("Pickup:", pickup, "Destination:", destination);

    if (!pickup.trim() || !destination.trim()) {
      alert("Please enter both pickup and destination");
      return;
    }

    // Check if the user has a minimum of ₹100 in their wallet
    if (balance < 100) {
      alert("You need at least ₹100 in your wallet to book a ride.");
      return;
    }

    // ✅ Navigate to RideSuggesting.js with state
    navigate("/ride-suggesting", { state: { pickup, destination } });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">🚖 Book Your Ride</h1>

      <div className="flex gap-4">
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Enter Pickup Location"
          className="p-2 border rounded-md bg-gray-800 text-white placeholder-gray-400"
        />

        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter Destination"
          className="p-2 border rounded-md bg-gray-800 text-white placeholder-gray-400"
        />

        <button 
          onClick={handleFindRide} 
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Find a Ride
        </button>
      </div>
    </div>
  );
};

export default BookRide;
