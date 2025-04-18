import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-2xl font-bold">🚖 Ride Booking</h1>
      <Link to="/wallet" className="px-4 py-2 bg-blue-500 rounded">💰 Wallet</Link> {/* ✅ Wallet Button */}
    </nav>
  );
};

export default Navbar;
