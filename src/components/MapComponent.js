import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ pickup, destination, nearbyPlaces = [] }) => {
  useEffect(() => {
    const map = L.map("map").setView([22.5726, 88.3639], 12); // Default to Kolkata

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    if (pickup) {
      fetchCoordinates(pickup, (lat, lon) => {
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("Pickup Location")
          .openPopup();
        map.setView([lat, lon], 14);
      });
    }

    if (destination) {
      fetchCoordinates(destination, (lat, lon) => {
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("Destination");
      });
    }

    // Add nearby places as markers
    if (nearbyPlaces.length > 0) {
      nearbyPlaces.forEach((place) => {
        const lat = place.lat || place.center?.lat;
        const lon = place.lon || place.center?.lon;
        if (lat && lon) {
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(place.tags?.name || "Nearby Place");
        }
      });
    }

    return () => {
      map.remove();
    };
  }, [pickup, destination, nearbyPlaces]);

  const fetchCoordinates = (place, callback) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          callback(parseFloat(data[0].lat), parseFloat(data[0].lon));
        }
      })
      .catch((err) => console.error("Geocoding error:", err));
  };

  return <div id="map" className="w-full h-96 rounded-lg shadow-lg"></div>;
};

export default MapComponent;
