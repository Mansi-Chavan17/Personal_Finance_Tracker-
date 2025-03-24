import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, Edit2, Trash2, Calendar, Tag, CreditCard, FileText, DollarSign, MinusCircle } from "lucide-react";

const Expense = () => {
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
    paymentMethod: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchExpenses();
    }
  }, [currentUser]);

  const fetchExpenses = async () => {
    if (!currentUser) return;
    const q = query(collection(db, "expenses"), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const expensesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setExpenses(expensesData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User not logged in!");
      return;
    }

    const expenseData = {
      ...formData,
      userId: currentUser.uid,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "expenses", editingId), expenseData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "expenses"), expenseData);
      }
      setFormData({ source: "", amount: "", date: "", category: "", notes: "", paymentMethod: "" });
      fetchExpenses();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setEditingId(expense.id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
    fetchExpenses();
  };

  const toggleForm = () => {
    if (isFormVisible && editingId) {
      setEditingId(null);
      setFormData({ source: "", amount: "", date: "", category: "", notes: "", paymentMethod: "" });
    }
    setIsFormVisible(!isFormVisible);
  };

  // Get total expenses amount
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);

  // Get category colors
  const getCategoryColor = (category) => {
    const colors = {
      "Housing": "bg-blue-100 text-blue-800",
      "Transportation": "bg-purple-100 text-purple-800",
      "Food": "bg-orange-100 text-orange-800",
      "Utilities": "bg-yellow-100 text-yellow-800",
      "Healthcare": "bg-pink-100 text-pink-800",
      "Entertainment": "bg-indigo-100 text-indigo-800",
      "Other": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expense Manager</h1>
          <p className="text-gray-600">Track and manage all your expenses</p>
        </div>
        <button 
          onClick={toggleForm} 
          className={`flex items-center rounded-lg px-4 py-2 text-white transition-colors ${isFormVisible ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}
        >
          {isFormVisible ? "Cancel" : (
            <>
              <PlusCircle size={18} className="mr-2" />
              Add Expense
            </>
          )}
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl shadow-lg mb-8 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-red-100">Total Expenses</h3>
            <p className="text-3xl font-bold mt-1">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalExpenses)}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <MinusCircle size={32} className="text-white" />
          </div>
        </div>
        <div className="mt-4 text-sm text-red-100">
          <p>{expenses.length} expenses recorded</p>
        </div>
      </div>

      {/* Form Section */}
      {isFormVisible && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            {editingId ? <Edit2 size={20} className="mr-2 text-blue-600" /> : <PlusCircle size={20} className="mr-2 text-red-600" />}
            {editingId ? "Edit Expense Entry" : "Add New Expense"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <DollarSign size={16} className="mr-2 text-red-600" />
                  Expense Source
                </label>
                <input 
                  type="text" 
                  name="source" 
                  value={formData.source} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                  placeholder="E.g., Rent, Groceries, Utilities"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <DollarSign size={16} className="mr-2 text-red-600" />
                  Amount
                </label>
                <input 
                  type="number" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                  placeholder="Amount in INR"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar size={16} className="mr-2 text-red-600" />
                  Date Paid
                </label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Tag size={16} className="mr-2 text-red-600" />
                  Category
                </label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Housing">Housing</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Food">Food</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <CreditCard size={16} className="mr-2 text-red-600" />
                  Payment Method
                </label>
                <select 
                  name="paymentMethod" 
                  value={formData.paymentMethod} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Mobile Payment">Mobile Payment</option>
                  <option value="UPI">UPI</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FileText size={16} className="mr-2 text-red-600" />
                  Notes (Optional)
                </label>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  rows="3" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Additional details about this expense"
                ></textarea>
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
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {editingId ? "Update Expense" : "Save Expense"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expense History Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Expense History</h3>
          <p className="text-gray-600 text-sm mt-1">Showing all recorded expense entries</p>
        </div>
        
        {expenses.length === 0 ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <MinusCircle size={32} />
            </div>
            <p className="text-gray-500 mb-2">No expense records found.</p>
            <button 
              onClick={() => setIsFormVisible(true)} 
              className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
            >
              <PlusCircle size={16} className="mr-1" />
              Add your first expense
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{expense.source}</div>
                      {expense.notes && <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">{expense.notes}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-red-600">
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(expense.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {expense.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.category && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(expense.category)}`}>
                          {expense.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {expense.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(expense)} 
                          className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(expense.id)} 
                          className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;