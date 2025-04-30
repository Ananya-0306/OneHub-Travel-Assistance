import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const navigate = useNavigate();

    const handleFindRide = () => {
        if (pickup && destination) {
            navigate("/ride-suggestion", { state: { pickup, destination } });
        } else {
            alert("Please enter both pickup and destination.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
            {/* Header Section with Ride History Button Only */}
            <div className="flex justify-end w-full mb-6">
                <button
                    onClick={() => navigate("/ride-history")}
                    className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                >
                    Ride History
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-6">🚖 Book Your Ride</h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
                <label className="block mb-2 text-lg">Pickup Location:</label>
                <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white mb-4"
                />
                <label className="block mb-2 text-lg">Destination:</label>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white mb-4"
                />
                <button
                    onClick={handleFindRide}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
                >
                    Find a Ride
                </button>
            </div>
        </div>
    );
};

export default Home;
