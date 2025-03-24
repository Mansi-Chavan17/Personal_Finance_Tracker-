import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Income from './components/Income';
import Expense from './components/Expense';
import SavingGoals from './components/SavingGoals';
import Investment from './components/Investment';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import TransactionHistory from './components/TransactionHistory';
import { AmountProvider } from './context/AmountContext';

// Add these styles to your App.css file
// This will ensure proper layout and prevent overlap issues


const App = () => {
  return (
    <AuthProvider>
      <AmountProvider>
        {/* Move ToastContainer to top level */}
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="app-container relative min-h-screen">
          <Navbar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register />} />
              {/* Dashboard now properly separated from navbar */}
              <Route 
                path='/dashboard' 
                element={
                  <ProtectedRoute>
                    <div className="dashboard-page">
                      <Dashboard />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/savings" element={<SavingGoals />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/transaction" element={<TransactionHistory />} />
            </Routes>
          </div>
        </div>
      </AmountProvider>
    </AuthProvider>
  );
};

export default App;