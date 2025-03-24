import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { ArrowDownCircle, ArrowUpCircle, Calendar, Clock, Search, Filter, Download, Trash2 } from "lucide-react";

const TransactionHistory = () => {
  const { user: currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    if (currentUser) {
      fetchTransactions();
    }
  }, [currentUser]);

  const fetchTransactions = async () => {
    if (!currentUser) return;

    const incomeQuery = query(collection(db, "income"), where("userId", "==", currentUser.uid));
    const expenseQuery = query(collection(db, "expenses"), where("userId", "==", currentUser.uid));

    const [incomeSnapshot, expenseSnapshot] = await Promise.all([getDocs(incomeQuery), getDocs(expenseQuery)]);

    const incomeData = incomeSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      type: "Income",
    }));

    const expenseData = expenseSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      type: "Expense",
    }));

    // Combine and sort by date (most recent first)
    const allTransactions = [...incomeData, ...expenseData].sort((a, b) => new Date(b.date) - new Date(a.date));

    setTransactions(allTransactions);
  };

  // Format amount in Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
  };

  // Format date in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  // Filter transactions based on search term and type filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.source?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         transaction.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || transaction.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 mb-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">Transaction History</h2>
        <p className="text-indigo-100">View and manage all your financial activities</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-4 md:p-6 bg-gray-50 border-b">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-1 text-gray-600">
                <Filter size={16} />
                <span className="hidden sm:inline">Filter:</span>
              </div>
              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <button
                  className={`px-3 py-1.5 text-sm ${filterType === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setFilterType("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1.5 text-sm ${filterType === "income" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setFilterType("income")}
                >
                  Income
                </button>
                <button
                  className={`px-3 py-1.5 text-sm ${filterType === "expense" ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setFilterType("expense")}
                >
                  Expense
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Clock size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No transactions found</h3>
            <p className="text-gray-500 text-center max-w-md">
              {transactions.length === 0
                ? "You haven't recorded any transactions yet. Start tracking your finances now!"
                : "No results match your current search and filter settings."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-700">
                  <th className="p-4 font-medium">Transaction</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className={`p-2 mr-3 rounded-full ${
                          transaction.type === "Income" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {transaction.type === "Income" ? (
                            <ArrowUpCircle size={20} className="text-green-600" />
                          ) : (
                            <ArrowDownCircle size={20} className="text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{transaction.source || "N/A"}</p>
                          <p className="text-sm text-gray-500">{transaction.description || "No description"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span className="text-gray-700">{formatDate(transaction.date)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        transaction.type === "Income" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium">
                      {transaction.type === "Income" ? (
                        <span className="text-green-600">+ {formatCurrency(transaction.amount)}</span>
                      ) : (
                        <span className="text-red-600">- {formatCurrency(transaction.amount)}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-end gap-3">
        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Download size={16} className="mr-2" />
          Export
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Trash2 size={16} className="mr-2" />
          Clear All
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;