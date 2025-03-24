import { useState } from "react";

const Investment = () => {
  const [formData, setFormData] = useState({
    initialInvestment: "",
    monthlyContribution: "",
    annualInterestRate: "",
    tenure: "",
  });

  const [results, setResults] = useState(null);

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

    setResults({
      finalAmount: finalAmount.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center justify-center">
          <span className="mr-2">📈</span> Investment Growth Calculator
        </h2>
      </div>
      
      <div className="p-6">
        <form onSubmit={calculateInvestment} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="initialInvestment" className="block text-sm font-medium text-gray-700">
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
                required
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border px-4 py-2"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700">
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
                required
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border px-4 py-2"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="annualInterestRate" className="block text-sm font-medium text-gray-700">
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
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border px-4 py-2"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="tenure" className="block text-sm font-medium text-gray-700">
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
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border px-4 py-2"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">years</span>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Calculate Growth
          </button>
        </form>

        {results && (
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">📊</span> Investment Details
            </h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <div>
                  <p className="text-gray-600 text-sm">Final Amount after {formData.tenure} years:</p>
                  <p className="font-bold text-indigo-700">₹ {results.finalAmount}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-indigo-500 mr-2">💰</span>
                <div>
                  <p className="text-gray-600 text-sm">Total Contributions:</p>
                  <p className="font-bold text-indigo-700">₹ {results.totalContributions}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-purple-500 mr-2">📈</span>
                <div>
                  <p className="text-gray-600 text-sm">Total Interest Earned:</p>
                  <p className="font-bold text-indigo-700">₹ {results.totalInterest}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <span className="mr-2">💡</span> Where Can You Invest?
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <span className="text-blue-500 flex-shrink-0 mr-2">📈</span>
              <div>
                <p className="font-semibold">Stocks</p>
                <p className="text-gray-600">High returns, high risk. Best for long-term growth.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-indigo-500 flex-shrink-0 mr-2">📊</span>
              <div>
                <p className="font-semibold">Mutual Funds</p>
                <p className="text-gray-600">Diversified investment with professional management.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-yellow-500 flex-shrink-0 mr-2">🏆</span>
              <div>
                <p className="font-semibold">Gold</p>
                <p className="text-gray-600">A hedge against inflation, good for stability.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-green-500 flex-shrink-0 mr-2">🏡</span>
              <div>
                <p className="font-semibold">Real Estate</p>
                <p className="text-gray-600">Tangible asset with long-term value growth.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-purple-500 flex-shrink-0 mr-2">💰</span>
              <div>
                <p className="font-semibold">Fixed Deposits</p>
                <p className="text-gray-600">Low-risk, stable returns.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
            <p className="flex items-start text-sm">
              <span className="text-yellow-500 flex-shrink-0 mr-2">💡</span>
              <span className="text-gray-700">
                <strong>Tip:</strong> Diversify your investments to minimize risk and maximize returns!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;