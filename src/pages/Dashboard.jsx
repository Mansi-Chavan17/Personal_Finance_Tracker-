import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Target, 
  TrendingUp,
  Home,
  Menu,
  X,
  CreditCard,
  PieChart,
  Bell,
  User,
  Search
} from "lucide-react";
import { useAmount } from "../context/AmountContext";

const Dashboard = () => {
  const { totalIncome } = useAmount();
  const { totalExpense } = useAmount();
  const { totalSaving } = useAmount();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and update state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentBalance = totalIncome - totalExpense + totalSaving;
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed md:relative h-full z-20 transition-all duration-300 ease-in-out bg-gradient-to-b from-blue-600 to-indigo-800 text-white shadow-xl ${
        sidebarOpen ? 'left-0 w-64' : 'left-0 md:left-0 -left-64 md:w-20 w-0'
      }`}>
        <div className="p-4 flex justify-between items-center">
          {sidebarOpen && (
            <div className="flex items-center">
              <div className="bg-white p-1 rounded-md mr-2">
                <PieChart size={20} className="text-indigo-600" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">FinTracker</h1>
            </div>
          )}
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="mt-8">
          <div className="px-4 mb-6">
            {sidebarOpen ? (
              <div className="flex items-center py-3 px-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <Home size={20} className="mr-3 text-white" />
                <span className="font-medium">Dashboard</span>
              </div>
            ) : (
              <div className="flex justify-center py-3 bg-white/20 backdrop-blur-sm rounded-lg mx-2">
                <Home size={20} className="text-white" />
              </div>
            )}
          </div>

          <div className="space-y-1 px-2">
            <Link 
              to="/income" 
              className="flex items-center px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowUpCircle size={20} className={`text-green-300 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-medium">Income</span>}
            </Link>
            
            <Link 
              to="/expense" 
              className="flex items-center px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowDownCircle size={20} className={`text-red-300 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-medium">Expense</span>}
            </Link>
            
            <Link 
              to="/savings" 
              className="flex items-center px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Target size={20} className={`text-blue-300 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-medium">Saving Goals</span>}
            </Link>
            
            <Link 
              to="/investment" 
              className="flex items-center px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <TrendingUp size={20} className={`text-purple-300 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-medium">Investments</span>}
            </Link>

            <Link 
              to="/transaction" 
              className="flex items-center px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <CreditCard size={20} className={`text-yellow-300 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-medium">Transactions</span>}
            </Link>
          </div>
          
          {sidebarOpen && (
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
                <div className="bg-indigo-500 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-indigo-200">Premium Plan</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle Button - Fixed at the bottom for easy access */}
      {isMobile && !sidebarOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed bottom-4 left-4 z-30 p-3 rounded-full bg-indigo-600 text-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out w-full ${
        isMobile ? 'ml-0' : (sidebarOpen ? 'md:ml-0' : 'md:ml-0')
      }`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">3</span>
              </button>
              <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Current Balance</p>
                <p className="text-lg font-bold text-blue-600">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(currentBalance)}</p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4 md:p-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200 p-4 md:p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-green-700">Total Income</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalIncome)}</h3>
                </div>
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <ArrowUpCircle size={24} className="text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm border border-red-200 p-4 md:p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-red-700">Total Expenses</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalExpense)}</h3>
                </div>
                <div className="bg-red-500/10 p-2 rounded-lg">
                  <ArrowDownCircle size={24} className="text-red-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-4 md:p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-blue-700">Current Balance</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(currentBalance)}</h3>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <Target size={24} className="text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Your Financial Dashboard</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 rounded-xl p-4 md:p-6 transition-all duration-300 border border-indigo-200 hover:shadow-md">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
                  <div className="bg-indigo-500/10 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4 group-hover:bg-indigo-500/20 transition-colors">
                    <ArrowUpCircle size={24} className="text-indigo-600" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-gray-800 mb-1">Track Your Income</h4>
                    <p className="text-gray-600 text-sm md:text-base">Record all sources of income to keep track of your earnings.</p>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <Link to="/income" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                    Go to Income →
                  </Link>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl p-4 md:p-6 transition-all duration-300 border border-blue-200 hover:shadow-md">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4 group-hover:bg-blue-500/20 transition-colors">
                    <ArrowDownCircle size={24} className="text-blue-600" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-gray-800 mb-1">Manage Expenses</h4>
                    <p className="text-gray-600 text-sm md:text-base">Keep track of where your money is going to improve budgeting.</p>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <Link to="/expense" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Go to Expenses →
                  </Link>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl p-4 md:p-6 transition-all duration-300 border border-purple-200 hover:shadow-md">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4 group-hover:bg-purple-500/20 transition-colors">
                    <Target size={24} className="text-purple-600" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-gray-800 mb-1">Set Saving Goals</h4>
                    <p className="text-gray-600 text-sm md:text-base">Define and track progress toward your financial objectives.</p>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <Link to="/savings" className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">
                    Go to Savings →
                  </Link>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl p-4 md:p-6 transition-all duration-300 border border-green-200 hover:shadow-md">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
                  <div className="bg-green-500/10 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4 group-hover:bg-green-500/20 transition-colors">
                    <TrendingUp size={24} className="text-green-600" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-gray-800 mb-1">Plan Investments</h4>
                    <p className="text-gray-600 text-sm md:text-base">Calculate and manage your investment strategy for the future.</p>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <Link to="/investment" className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors">
                    Go to Investments →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center transition-colors">
                <CreditCard size={20} className="mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Add Transaction</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center transition-colors">
                <PieChart size={20} className="mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">View Reports</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center transition-colors">
                <Target size={20} className="mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">Add Goal</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center transition-colors">
                <TrendingUp size={20} className="mx-auto mb-2" />
                <span className="text-xs sm:text-sm font-medium">New Investment</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;