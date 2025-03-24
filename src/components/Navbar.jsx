import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/AuthContext";
import { Home, Info, Briefcase, BarChart2, LogOut, LogIn, Menu, X, DollarSign } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout(); // Perform logout
    navigate("/home"); // Redirect to home page after logout
  };

  const handleLogin = () => {
    // Simulate login logic, or use your actual login handler here
    console.log("Logged in");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-400" />
                <span className="ml-2 text-xl font-bold text-white">FinTrack</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link to="/about" className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                  <Info className="w-4 h-4 mr-2" />
                  About
                </Link>
                <Link to="/services" className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Services
                </Link>
                {user && (
                  <Link to="/dashboard" className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800">
            <Link to="/" className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link to="/about" className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              <Info className="w-4 h-4 mr-2" />
              About
            </Link>
            <Link to="/services" className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              <Briefcase className="w-4 h-4 mr-2" />
              Services
            </Link>
            {user && (
              <Link to="/dashboard" className="flex items-center text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                <BarChart2 className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium mt-4"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center w-full text-left bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-base font-medium mt-4">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
