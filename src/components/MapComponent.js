import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ pickup, destination, showNearby }) => {
  useEffect(() => {
    const map = L.map("map").setView([22.5726, 88.3639], 12); // Default to Kolkata

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    if (pickup) {
      fetchCoordinates(pickup, (lat, lon) => {
        L.marker([lat, lon]).addTo(map).bindPopup("Pickup Location").openPopup();
        map.setView([lat, lon], 14);
      });
    }

    if (destination) {
      fetchCoordinates(destination, (lat, lon) => {
        L.marker([lat, lon]).addTo(map).bindPopup("Destination");
      });
    }

    if (showNearby) {
      showNearbyPlaces(map);
    }

    return () => {
      map.remove();
    };
  }, [pickup, destination, showNearby]);

  const fetchCoordinates = (place, callback) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          callback(data[0].lat, data[0].lon);
        }
      })
      .catch((error) => console.error("Error fetching location:", error));
  };

  const showNearbyPlaces = (map) => {
    const places = [
      { name: "Medical Store", lat: 22.575, lon: 88.37 },
      { name: "Grocery Store", lat: 22.574, lon: 88.365 },
      { name: "Cafe", lat: 22.573, lon: 88.36 },
    ];

    places.forEach((place) => {
      L.marker([place.lat, place.lon])
        .addTo(map)
        .bindPopup(place.name);
    });
  };

  return <div id="map" className="w-full h-96 rounded-lg shadow-lg"></div>;
};

export default MapComponent;
