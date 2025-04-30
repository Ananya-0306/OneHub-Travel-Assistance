import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RideSuggestions from "./components/RideSuggestions";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ride-suggestion" element={<RideSuggestions />} />
      </Routes>
    </Router>
  );
};

export default App;
