import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const TransactionHistory = () => {
  const { user: currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2 text-left">Transaction</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">{transaction.source || "N/A"}</td>
                  <td className="p-2">{transaction.date}</td>
                  <td className={`p-2 ${transaction.type === "Income" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type}
                  </td>
                  <td className="p-2 text-right font-medium">
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
  );
};

export default TransactionHistory;
