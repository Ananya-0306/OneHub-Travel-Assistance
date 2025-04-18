import { useEffect, useState } from "react";

const RideHistory = ({ userId = "test-user-id" }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/rides/history?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setRides(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ride history:", err);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Ride History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : rides.length === 0 ? (
        <p>No ride history found.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <div
              key={ride._id}
              className="bg-gray-800 p-4 rounded shadow-md border border-gray-700"
            >
              <p><strong>Pickup:</strong> {ride.pickup}</p>
              <p><strong>Destination:</strong> {ride.destination}</p>
              <p><strong>Status:</strong> {ride.status}</p>
              <p className="text-sm text-gray-400">
                <strong>Booked:</strong> {new Date(ride.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistory;
