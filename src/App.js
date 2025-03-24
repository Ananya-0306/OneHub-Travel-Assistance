import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RideSuggestion from "./components/RideSuggestions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ride-suggestion" element={<RideSuggestion />} />
      </Routes>
    </Router>
  );
}

export default App;
