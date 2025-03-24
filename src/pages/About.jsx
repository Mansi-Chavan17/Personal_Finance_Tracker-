import React from 'react';
import { 
  DollarSign, 
  CreditCard, 
  PiggyBank, 
  BarChart4, 
  Users,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-12 mb-16 shadow-xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-20">
            <TrendingUp size={240} color="white" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About Us</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl">
              Welcome to Personal Finance Tracker – your ultimate solution for managing income, expenses, and savings with ease.
            </p>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="h-0.5 w-12 bg-blue-400"></div>
            <h2 className="mx-4 text-3xl font-bold text-blue-800">Our Mission</h2>
            <div className="h-0.5 w-12 bg-blue-400"></div>
          </div>
          
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Our goal is to empower individuals to take control of their finances by providing an intuitive and 
            effective tracking tool that transforms the way you manage your money.
          </p>
        </div>
        
        {/* Features Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative rounded-xl overflow-hidden bg-white hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-500 transition-all duration-300"></div>
              <div className="p-8 relative z-10">
                <DollarSign className="text-blue-500 group-hover:text-white mb-4 h-10 w-10 transition-colors duration-300" />
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 transition-colors duration-300">Easy Income Tracking</h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">Record and analyze your earnings effortlessly.</p>
              </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden bg-white hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-500 transition-all duration-300"></div>
              <div className="p-8 relative z-10">
                <CreditCard className="text-blue-500 group-hover:text-white mb-4 h-10 w-10 transition-colors duration-300" />
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 transition-colors duration-300">Smart Expense Management</h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">Understand and control your spending habits.</p>
              </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden bg-white hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-500 transition-all duration-300"></div>
              <div className="p-8 relative z-10">
                <PiggyBank className="text-blue-500 group-hover:text-white mb-4 h-10 w-10 transition-colors duration-300" />
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 transition-colors duration-300">Savings Goals</h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">Set targets and track your progress easily.</p>
              </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden bg-white hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-500 transition-all duration-300"></div>
              <div className="p-8 relative z-10">
                <BarChart4 className="text-blue-500 group-hover:text-white mb-4 h-10 w-10 transition-colors duration-300" />
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-3 transition-colors duration-300">Insightful Reports</h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">Gain deep insights into your financial health.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 md:p-12 flex items-center">
              <div>
                <div className="inline-block p-3 bg-white/10 rounded-2xl mb-6">
                  <Users className="text-white h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us?</h2>
                <p className="text-blue-100 text-lg">
                  Join thousands of users who have transformed their financial lives with our platform.
                </p>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">User-friendly interface designed for simplicity and efficiency</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Smart analytics that provide actionable financial insights</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Bank-level security to keep your financial data protected</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Regular updates with new features based on user feedback</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}