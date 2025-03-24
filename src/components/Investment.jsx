import React, { useState } from "react";
import { 
  TrendingUp, DollarSign, Calendar, Percent, Calculator, Award, 
  AlertCircle, PieChart, BarChart2, Briefcase, Home, CreditCard, 
  ArrowRight, Wallet, CheckCircle, Info, Star, Activity, 
  TrendingDown, RefreshCw, Zap, Droplet, Sun
} from "lucide-react";

const Investment = () => {
  const [formData, setFormData] = useState({
    initialInvestment: "",
    monthlyContribution: "",
    annualInterestRate: "",
    tenure: "",
  });

  const [results, setResults] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [theme, setTheme] = useState("blue"); // blue, purple, green, orange

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateInvestment = (e) => {
    e.preventDefault();

    const P = parseFloat(formData.initialInvestment) || 0;
    const M = parseFloat(formData.monthlyContribution) || 0;
    const r = (parseFloat(formData.annualInterestRate) || 0) / 100 / 12;
    const t = parseFloat(formData.tenure) || 0;

    // Compound Interest Calculation
    const totalMonths = t * 12;
    let finalAmount = P * Math.pow(1 + r, totalMonths);

    for (let i = 1; i <= totalMonths; i++) {
      finalAmount += M * Math.pow(1 + r, totalMonths - i);
    }

    const totalContributions = P + M * totalMonths;
    const totalInterest = finalAmount - totalContributions;
    
    // Calculate annual breakdown
    const annualBreakdown = [];
    let runningAmount = P;
    
    for (let year = 1; year <= t; year++) {
      const yearMonths = year * 12;
      let yearAmount = P * Math.pow(1 + r, yearMonths);
      
      for (let i = 1; i <= yearMonths; i++) {
        yearAmount += M * Math.pow(1 + r, yearMonths - i);
      }
      
      annualBreakdown.push({
        year,
        amount: yearAmount,
        growth: year > 1 ? ((yearAmount / runningAmount - 1) * 100) : ((yearAmount / P - 1) * 100)
      });
      
      runningAmount = yearAmount;
    }

    setResults({
      finalAmount: finalAmount.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      annualBreakdown,
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Format currency with commas
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value);
  };
  
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  
  // Calculate return progress
  const getProgressPercentage = (contributions, totalAmount) => {
    const parsedContributions = parseFloat(contributions) || 0;
    const parsedTotal = parseFloat(totalAmount) || 0;
    if (parsedTotal === 0) return 0;
    const interestPercentage = ((parsedTotal - parsedContributions) / parsedTotal) * 100;
    return Math.min(100, interestPercentage);
  };

  const changeTheme = () => {
    const themes = ["blue", "purple", "green", "orange"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeClasses = () => {
    switch(theme) {
      case "purple":
        return {
          primary: "from-purple-500 to-pink-600",
          secondary: "from-indigo-500 to-purple-600",
          tertiary: "from-pink-500 to-purple-600",
          button: "from-purple-600 to-pink-600",
          accent: "text-purple-600 bg-purple-100",
          highlight: "bg-purple-500"
        };
      case "green":
        return {
          primary: "from-emerald-500 to-teal-600",
          secondary: "from-green-500 to-emerald-600",
          tertiary: "from-teal-500 to-green-600",
          button: "from-emerald-600 to-teal-600",
          accent: "text-emerald-600 bg-emerald-100",
          highlight: "bg-emerald-500"
        };
      case "orange":
        return {
          primary: "from-orange-500 to-amber-600",
          secondary: "from-amber-500 to-orange-600",
          tertiary: "from-red-500 to-orange-600",
          button: "from-orange-600 to-amber-600",
          accent: "text-orange-600 bg-orange-100",
          highlight: "bg-orange-500"
        };
      default: // blue
        return {
          primary: "from-blue-500 to-indigo-600",
          secondary: "from-sky-500 to-blue-600",
          tertiary: "from-indigo-500 to-blue-600",
          button: "from-blue-600 to-indigo-600",
          accent: "text-blue-600 bg-blue-100",
          highlight: "bg-blue-500"
        };
    }
  };

  const theme_classes = getThemeClasses();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-2">
            Investment Calculator
          </h1>
          <p className="text-gray-600">Plan your financial future with confidence</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={changeTheme}
            className="flex items-center rounded-lg px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw size={18} className="mr-2" />
            Change Theme
          </button>
          <button 
            onClick={toggleForm} 
            className={`flex items-center rounded-lg px-4 py-2 text-white transition-colors bg-gradient-to-r ${theme_classes.button} shadow-md hover:shadow-lg`}
          >
            {isFormVisible ? "Hide Calculator" : (
              <>
                <Calculator size={18} className="mr-2" />
                Show Calculator
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary Cards - Only visible when results exist */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Final Amount */}
          <div className={`bg-gradient-to-r ${theme_classes.primary} rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white opacity-90">Final Amount</h3>
                <p className="text-3xl font-bold mt-1">
                  ₹{formatCurrency(results.finalAmount)}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Star size={32} className="text-white" />
              </div>
            </div>
            <div className="mt-4 text-sm text-white opacity-90">
              <p>After {formData.tenure} years</p>
            </div>
          </div>

          {/* Total Contributions */}
          <div className={`bg-gradient-to-r ${theme_classes.secondary} rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white opacity-90">Total Invested</h3>
                <p className="text-3xl font-bold mt-1">
                  ₹{formatCurrency(results.totalContributions)}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Wallet size={32} className="text-white" />
              </div>
            </div>
            <div className="mt-4 text-sm text-white opacity-90">
              <p>Principal + monthly contributions</p>
            </div>
          </div>

          {/* Interest Earned */}
          <div className={`bg-gradient-to-r ${theme_classes.tertiary} rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white opacity-90">Interest Earned</h3>
                <p className="text-3xl font-bold mt-1">
                  ₹{formatCurrency(results.totalInterest)}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <TrendingUp size={32} className="text-white" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full" 
                  style={{ width: `${getProgressPercentage(results.totalContributions, results.finalAmount)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Form */}
      {isFormVisible && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 border border-gray-200 hover:shadow-xl">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-6 flex items-center">
            <Calculator size={20} className={`mr-2 ${theme_classes.accent}`} />
            Calculate Investment Growth
          </h2>

          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center animate-pulse">
              <CheckCircle size={18} className="mr-2" />
              <span>Your investment calculation has been completed successfully!</span>
            </div>
          )}

          <form onSubmit={calculateInvestment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  <DollarSign size={16} className={`mr-2 ${theme_classes.accent} rounded-full p-1`} />
                  Initial Investment
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    id="initialInvestment"
                    name="initialInvestment"
                    placeholder="0.00"
                    value={formData.initialInvestment}
                    onChange={handleChange}
                    className="pl-7 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:shadow-md"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  <Calendar size={16} className={`mr-2 ${theme_classes.accent} rounded-full p-1`} />
                  Monthly Contribution
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    id="monthlyContribution"
                    name="monthlyContribution"
                    placeholder="0.00"
                    value={formData.monthlyContribution}
                    onChange={handleChange}
                    className="pl-7 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:shadow-md"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  <Percent size={16} className={`mr-2 ${theme_classes.accent} rounded-full p-1`} />
                  Annual Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="annualInterestRate"
                    name="annualInterestRate"
                    placeholder="0.0"
                    value={formData.annualInterestRate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 group-hover:shadow-md"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  <Calendar size={16} className={`mr-2 ${theme_classes.accent} rounded-full p-1`} />
                  Investment Tenure
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="tenure"
                    name="tenure"
                    placeholder="0"
                    value={formData.tenure}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-16 group-hover:shadow-md"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={toggleForm}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2 bg-gradient-to-r ${theme_classes.button} text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center transform hover:translate-y-px`}
              >
                <Calculator size={18} className="mr-2" />
                Calculate Growth
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8 hover:shadow-xl transition-shadow">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">Investment Growth</h3>
            <p className="text-gray-600 text-sm mt-1">Yearly breakdown of your investment returns</p>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 border border-gray-200 text-left text-gray-700">Year</th>
                    <th className="p-3 border border-gray-200 text-left text-gray-700">Amount</th>
                    <th className="p-3 border border-gray-200 text-left text-gray-700">Growth %</th>
                    <th className="p-3 border border-gray-200 text-left text-gray-700">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {results.annualBreakdown.map((year) => {
                    // Calculate vibrant colors based on year progress
                    const progressPercent = (year.year / formData.tenure) * 100;
                    let rowColorClass = '';
                    let progressColorClass = '';
                    
                    if (theme === "blue") {
                      progressColorClass = progressPercent < 25 ? 'bg-blue-500' : 
                        progressPercent < 50 ? 'bg-indigo-500' : 
                        progressPercent < 75 ? 'bg-violet-500' : 'bg-purple-500';
                      rowColorClass = year.year % 2 === 0 ? 'hover:bg-blue-50' : 'hover:bg-indigo-50';
                    } else if (theme === "purple") {
                      progressColorClass = progressPercent < 25 ? 'bg-purple-500' : 
                        progressPercent < 50 ? 'bg-fuchsia-500' : 
                        progressPercent < 75 ? 'bg-pink-500' : 'bg-rose-500';
                      rowColorClass = year.year % 2 === 0 ? 'hover:bg-purple-50' : 'hover:bg-pink-50';
                    } else if (theme === "green") {
                      progressColorClass = progressPercent < 25 ? 'bg-green-500' : 
                        progressPercent < 50 ? 'bg-emerald-500' : 
                        progressPercent < 75 ? 'bg-teal-500' : 'bg-cyan-500';
                      rowColorClass = year.year % 2 === 0 ? 'hover:bg-green-50' : 'hover:bg-emerald-50';
                    } else {
                      progressColorClass = progressPercent < 25 ? 'bg-amber-500' : 
                        progressPercent < 50 ? 'bg-orange-500' : 
                        progressPercent < 75 ? 'bg-red-500' : 'bg-rose-500';
                      rowColorClass = year.year % 2 === 0 ? 'hover:bg-orange-50' : 'hover:bg-amber-50';
                    }
                      
                    return (
                      <tr key={year.year} className={`${rowColorClass} transition-colors`}>
                        <td className="p-3 border border-gray-200 font-semibold">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-gray-500" />
                            Year {year.year}
                          </div>
                        </td>
                        <td className="p-3 border border-gray-200 font-medium">
                          <div className="flex items-center">
                            <DollarSign size={16} className="mr-2 text-gray-500" />
                            ₹{formatCurrency(year.amount)}
                          </div>
                        </td>
                        <td className="p-3 border border-gray-200 text-green-600 font-medium">
                          <div className="flex items-center">
                            <TrendingUp size={16} className="mr-2 text-green-500" />
                            +{year.growth.toFixed(2)}%
                          </div>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${progressColorClass}`}
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 bg-blue-50">
            <div className="flex items-start text-sm">
              <Info size={18} className="text-blue-500 flex-shrink-0 mr-2 mt-0.5" />
              <span className="text-gray-700">
                <strong>Investment Tip:</strong> The power of compound interest works best over long time periods. The longer you stay invested, the more your money grows.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Investment Options */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Investment Options</h3>
          <p className="text-gray-600 text-sm mt-1">Explore different ways to grow your wealth</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2"></div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <TrendingUp size={20} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Stocks</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">High returns, high risk. Best for long-term growth and capital appreciation.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Risk Level</span>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Avg. Return</span>
                <span className="font-medium text-green-600">10-12% p.a.</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2"></div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <PieChart size={20} className="text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Mutual Funds</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">Diversified investment with professional management, suitable for all risk profiles.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Risk Level</span>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Avg. Return</span>
                <span className="font-medium text-green-600">8-12% p.a.</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2"></div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Award size={20} className="text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Gold</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">A hedge against inflation, good for stability and portfolio diversification.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Risk Level</span>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Avg. Return</span>
                <span className="font-medium text-green-600">8-10% p.a.</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-2"></div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Home size={20} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Real Estate</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">Tangible asset with long-term value growth and potential rental income.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Risk Level</span>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Avg. Return</span>
                <span className="font-medium text-green-600">8-12% p.a.</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2"></div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <CreditCard size={20} className="text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Fixed Deposits</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">Low-risk, stable returns with guaranteed principal and interest.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Risk Level</span>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Avg. Return</span>
                <span className="font-medium text-green-600">5-7% p.a.</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-2"></div>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-pink-100 rounded-lg mr-3">
                  <BarChart2 size={20} className="text-pink-600" />
                </div>
                <h4 className="font-semibold text-gray-800">PPF & EPF</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">Government-backed schemes with tax benefits and guaranteed returns.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Risk Level</span>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Avg. Return</span>
                <span className="font-medium text-green-600">7-8% p.a.</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-amber-50">
          <div className="flex items-start text-sm">
            <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mr-2 mt-0.5" />
            <span className="text-gray-700">
              <strong>Financial Advice:</strong> Diversify your investments across multiple asset classes based on your risk tolerance, time horizon, and financial goals.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;