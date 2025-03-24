import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, Edit2, Trash2, DollarSign, Calendar, Tag, CreditCard, FileText } from "lucide-react";
import { useAmount } from "../context/AmountContext";

const Income = () => {
  const {setTotalIncome}=useAmount()
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
    paymentMethod: "",
  });
  const [incomeList, setIncomeList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  
  useEffect(() => {
    if (currentUser) {
      fetchIncome();
      setTotalIncome(totalIncome)
    }
  }, [currentUser,incomeList,setIncomeList]);

  const fetchIncome = async () => {
    if (!currentUser) return;
    const q = query(collection(db, "income"), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const incomeData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIncomeList(incomeData);
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

    const incomeData = {
      ...formData,
      userId: currentUser.uid,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "income", editingId), incomeData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "income"), incomeData);
      }
      setFormData({ source: "", amount: "", date: "", category: "", notes: "", paymentMethod: "" });
      fetchIncome();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error saving income:", error);
    }
  };

  const handleEdit = (income) => {
    setFormData(income);
    setEditingId(income.id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "income", id));
    fetchIncome();
  };

  const toggleForm = () => {
    if (isFormVisible && editingId) {
      setEditingId(null);
      setFormData({ source: "", amount: "", date: "", category: "", notes: "", paymentMethod: "" });
    }
    setIsFormVisible(!isFormVisible);
  };

  // Get total income amount
  const totalIncome = incomeList.reduce((sum, income) => sum + parseFloat(income.amount || 0), 0);

  // Get category colors
  const getCategoryColor = (category) => {
    const colors = {
      "Salary": "bg-blue-100 text-blue-800",
      "Freelance": "bg-purple-100 text-purple-800",
      "Investments": "bg-green-100 text-green-800",
      "Gifts": "bg-pink-100 text-pink-800",
      "Rental Income": "bg-yellow-100 text-yellow-800",
      "Side Business": "bg-indigo-100 text-indigo-800",
      "Other": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Income Manager</h1>
          <p className="text-gray-600">Track and manage all your income sources</p>
        </div>
        <button 
          onClick={toggleForm} 
          className={`flex items-center rounded-lg px-4 py-2 text-white transition-colors ${isFormVisible ? "bg-gray-600 hover:bg-gray-700" : "bg-green-600 hover:bg-green-700"}`}
        >
          {isFormVisible ? "Cancel" : (
            <>
              <PlusCircle size={18} className="mr-2" />
              Add Income
            </>
          )}
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-8 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-green-100">Total Income</h3>
            <p className="text-3xl font-bold mt-1">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalIncome)}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <DollarSign size={32} className="text-white" />
          </div>
        </div>
        <div className="mt-4 text-sm text-green-100">
          <p>{incomeList.length} income sources recorded</p>
        </div>
      </div>

      {/* Form Section */}
      {isFormVisible && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            {editingId ? <Edit2 size={20} className="mr-2 text-blue-600" /> : <PlusCircle size={20} className="mr-2 text-green-600" />}
            {editingId ? "Edit Income Entry" : "Add New Income"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <DollarSign size={16} className="mr-2 text-green-600" />
                  Income Source
                </label>
                <input 
                  type="text" 
                  name="source" 
                  value={formData.source} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
                  placeholder="E.g., Job Salary, Freelance Project"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <DollarSign size={16} className="mr-2 text-green-600" />
                  Amount
                </label>
                <input 
                  type="number" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
                  placeholder="Amount in INR"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar size={16} className="mr-2 text-green-600" />
                  Date Received
                </label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Tag size={16} className="mr-2 text-green-600" />
                  Category
                </label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investments">Investments</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Rental Income">Rental Income</option>
                  <option value="Side Business">Side Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <CreditCard size={16} className="mr-2 text-green-600" />
                  Payment Method
                </label>
                <select 
                  name="paymentMethod" 
                  value={formData.paymentMethod} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Check">Check</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FileText size={16} className="mr-2 text-green-600" />
                  Notes (Optional)
                </label>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  rows="3" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Additional details about this income"
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
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {editingId ? "Update Income" : "Save Income"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Income History Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Income History</h3>
          <p className="text-gray-600 text-sm mt-1">Showing all recorded income entries</p>
        </div>
        
        {incomeList.length === 0 ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <DollarSign size={32} />
            </div>
            <p className="text-gray-500 mb-2">No income records found.</p>
            <button 
              onClick={() => setIsFormVisible(true)} 
              className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
            >
              <PlusCircle size={16} className="mr-1" />
              Add your first income
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
                {incomeList.map((income) => (
                  <tr key={income.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{income.source}</div>
                      {income.notes && <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">{income.notes}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-green-600">
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(income.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {income.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {income.category && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(income.category)}`}>
                          {income.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {income.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(income)} 
                          className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(income.id)} 
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

export default Income;