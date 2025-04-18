import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RideSuggestions from "./components/RideSuggestions";
import Wallet from "./pages/Wallet";
import RideHistory from "./pages/RideHistory";

<Route path="/ride-history" element={<RideHistory />} />


const App = () => {
  const [walletBalance, setWalletBalance] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home walletBalance={walletBalance} />} />
        <Route path="/ride-suggestion" element={<RideSuggestions />} />
        <Route path="/wallet" element={<Wallet onBalanceUpdate={setWalletBalance} />} />
      </Routes>
    </Router>
  );
};

export default App;
