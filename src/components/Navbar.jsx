import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    await logout();  // Perform logout
    navigate("/home"); // Redirect to home page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-start gap-6">
      <Link to="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
      <Link to="/about" className="text-white hover:text-gray-300 transition-colors">About</Link>
      <Link to="/services" className="text-white hover:text-gray-300 transition-colors">Services</Link>
      {user ? (
        <>
          <Link to="/dashboard" className="text-white hover:text-gray-300 transition-colors">Dashboard</Link>
          <button 
            onClick={handleLogout} 
            className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
