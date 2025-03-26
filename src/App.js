import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import RideSuggestions from "./components/RideSuggestions";

const Home = () => {
  const navigate = useNavigate();

  const handleBook = (pickup, dropoff) => {
    navigate("/ride-suggestions", { state: { pickup, dropoff } });
  };

  return <BookingForm onBook={handleBook} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ride-suggestions" element={<RideSuggestions />} />
      </Routes>
    </Router>
  );
};

export default App;
