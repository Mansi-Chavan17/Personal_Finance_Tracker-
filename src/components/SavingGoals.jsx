import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Target, PlusCircle, Edit2, Trash2, DollarSign, Calendar, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";


const SavingGoals = () => {
    const { user: currentUser } = useAuth();
    const [formData, setFormData] = useState({
        goal: "",
        amount: "",
        savings: "",
        deadline: ""
    });

    const [goalsList, setGoalsList] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true);

    useEffect(() => {
        if (currentUser) {
            fetchGoals();
        }
    }, [currentUser]);

    const fetchGoals = async () => {
        if (!currentUser) return;
        const q = query(collection(db, "savingGoals"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const goalsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setGoalsList(goalsData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            console.error("User not logged in!");
            return;
        }

        const goalData = {
            ...formData,
            userId: currentUser.uid,
        };

        try {
            if (editingId) {
                await updateDoc(doc(db, "savingGoals", editingId), goalData);
                setEditingId(null);
            } else {
                await addDoc(collection(db, "savingGoals"), goalData);
            }
            setFormData({ goal: "", amount: "", savings: "", deadline: "" });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            fetchGoals();
            if (editingId) {
                setIsFormVisible(true);
            }
        } catch (error) {
            console.error("Error saving goal:", error);
        }
    };

    const handleEdit = (goal) => {
        setFormData(goal);
        setEditingId(goal.id);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "savingGoals", id));
        fetchGoals();
    };

    const toggleForm = () => {
        if (isFormVisible && editingId) {
            setEditingId(null);
            setFormData({ goal: "", amount: "", savings: "", deadline: "" });
        }
        setIsFormVisible(!isFormVisible);
    };

    // Calculate total target amount and savings
    const totalTargetAmount = goalsList.reduce((sum, goal) => sum + parseFloat(goal.amount || 0), 0);
    const totalCurrentSavings = goalsList.reduce((sum, goal) => sum + parseFloat(goal.savings || 0), 0);
    const savingsPercentage = totalTargetAmount > 0 ? (totalCurrentSavings / totalTargetAmount) * 100 : 0;

    // Calculate progress for each goal
    const getProgressPercentage = (saved, target) => {
        const savedAmount = parseFloat(saved) || 0;
        const targetAmount = parseFloat(target) || 0;
        if (targetAmount === 0) return 0;
        return Math.min(100, (savedAmount / targetAmount) * 100);
    };

    // Get days remaining until deadline
    const getDaysRemaining = (deadline) => {
        if (!deadline) return null;
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff;
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Saving Goals</h1>
                    <p className="text-gray-600">Plan and track your financial targets</p>
                </div>
                <button 
                    onClick={toggleForm} 
                    className={`flex items-center rounded-lg px-4 py-2 text-white transition-colors ${isFormVisible ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {isFormVisible ? "Hide Form" : (
                        <>
                            <PlusCircle size={18} className="mr-2" />
                            Add Goal
                        </>
                    )}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Target Amount */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-blue-100">Total Target</h3>
                            <p className="text-3xl font-bold mt-1">
                                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalTargetAmount)}
                            </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                            <Target size={32} className="text-white" />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-blue-100">
                        <p>{goalsList.length} saving goals set</p>
                    </div>
                </div>

                {/* Total Current Savings */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-green-100">Current Savings</h3>
                            <p className="text-3xl font-bold mt-1">
                                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalCurrentSavings)}
                            </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                            <DollarSign size={32} className="text-white" />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-green-100">
                        <p>{savingsPercentage.toFixed(1)}% of total target</p>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-purple-100">Average Progress</h3>
                            <p className="text-3xl font-bold mt-1">
                                {savingsPercentage.toFixed(1)}%
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
                                style={{ width: `${savingsPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            {isFormVisible && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        {editingId ? <Edit2 size={20} className="mr-2 text-blue-600" /> : <PlusCircle size={20} className="mr-2 text-blue-600" />}
                        {editingId ? "Edit Saving Goal" : "Create New Saving Goal"}
                    </h2>

                    {showSuccess && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                            <CheckCircle size={18} className="mr-2" />
                            <span>Your saving goal has been successfully saved!</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <Target size={16} className="mr-2 text-blue-600" />
                                    Goal Name
                                </label>
                                <input
                                    type="text"
                                    id="goal"
                                    name="goal"
                                    placeholder="e.g. New Car, Vacation, Emergency Fund"
                                    value={formData.goal}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <DollarSign size={16} className="mr-2 text-blue-600" />
                                    Target Amount
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">₹</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className="pl-7 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <DollarSign size={16} className="mr-2 text-blue-600" />
                                    Current Savings
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">₹</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="savings"
                                        name="savings"
                                        placeholder="0.00"
                                        value={formData.savings}
                                        onChange={handleChange}
                                        className="pl-7 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <Calendar size={16} className="mr-2 text-blue-600" />
                                    Target Date
                                </label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
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
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                                {editingId ? "Update Goal" : "Create Saving Goal"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Saving Goals List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800">Your Saving Goals</h3>
                    <p className="text-gray-600 text-sm mt-1">Track your progress toward financial targets</p>
                </div>

                {goalsList.length === 0 ? (
                    <div className="p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                            <Target size={32} />
                        </div>
                        <p className="text-gray-500 mb-2">No saving goals found.</p>
                        <button
                            onClick={() => setIsFormVisible(true)}
                            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                        >
                            <PlusCircle size={16} className="mr-1" />
                            Create your first goal
                        </button>
                    </div>
                ) : (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {goalsList.map((goal) => {
                            const progress = getProgressPercentage(goal.savings, goal.amount);
                            const daysRemaining = getDaysRemaining(goal.deadline);
                            
                            return (
                                <div key={goal.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-semibold text-gray-800">{goal.goal}</h4>
                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={() => handleEdit(goal)}
                                                    className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(goal.id)}
                                                    className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Target</p>
                                                <p className="text-lg font-bold text-gray-800">
                                                    ₹{parseInt(goal.amount).toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Saved</p>
                                                <p className="text-lg font-bold text-green-600">
                                                    ₹{parseInt(goal.savings).toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Remaining</p>
                                                <p className="text-lg font-bold text-gray-800">
                                                    ₹{(parseInt(goal.amount) - parseInt(goal.savings)).toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Target Date</p>
                                                <p className="text-lg font-bold text-gray-800">
                                                    {goal.deadline}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-2">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium">{progress.toFixed(0)}% Complete</span>
                                                {daysRemaining !== null && (
                                                    <span className={`font-medium ${daysRemaining < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                                        {daysRemaining < 0 ? 'Overdue' : `${daysRemaining} days left`}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${
                                                        progress < 25 ? 'bg-red-500' : 
                                                        progress < 50 ? 'bg-orange-500' : 
                                                        progress < 75 ? 'bg-yellow-500' : 
                                                        'bg-green-500'
                                                    }`}
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                
                <div className="p-6 border-t border-gray-200 bg-blue-50">
                    <div className="flex items-start text-sm">
                        <AlertCircle size={18} className="text-blue-500 flex-shrink-0 mr-2 mt-0.5" />
                        <span className="text-gray-700">
                            <strong>Pro Tip:</strong> Break down large savings goals into smaller monthly targets to make them more achievable.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavingGoals;