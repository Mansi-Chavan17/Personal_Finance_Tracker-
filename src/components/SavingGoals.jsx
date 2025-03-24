import { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

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
        } catch (error) {
            console.error("Error saving goal:", error);
        }
    };

    const handleEdit = (goal) => {
        setFormData(goal);
        setEditingId(goal.id);
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "savingGoals", id));
        fetchGoals();
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-blue-50 rounded-t-lg p-6 border-b border-blue-100">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                    <span className="mr-2">🎯</span> {editingId ? "Edit Saving Goal" : "Create Saving Goal"}
                </h2>
                <p className="text-blue-600 mt-2 text-sm">Plan and track your financial targets</p>
            </div>

            <div className="bg-white rounded-b-lg shadow-md p-6">
                {showSuccess && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">Your saving goal has been successfully saved!</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                            Goal Name
                        </label>
                        <input
                            type="text"
                            id="goal"
                            name="goal"
                            placeholder="e.g. New Car, Vacation, Emergency Fund"
                            value={formData.goal}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 border"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
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
                                className="pl-7 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 border"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="savings" className="block text-sm font-medium text-gray-700">
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
                                className="pl-7 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 border"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                            Target Date
                        </label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 border"
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {editingId ? "Update Goal" : "Create Saving Goal"}
                        </button>
                    </div>
                </form>

                <h3 className="text-xl font-bold text-blue-800 mt-6">Your Saving Goals</h3>
                {goalsList.length === 0 ? (
                    <p className="text-gray-500">No saving goals found.</p>
                ) : (
                    <ul className="mt-4">
                        {goalsList.map((goal) => (
                            <li key={goal.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-2">
                                <div>
                                    {goal.goal} - ₹{goal.amount} | {goal.deadline}
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => handleEdit(goal)} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(goal.id)} className="px-3 py-1 bg-red-500 text-white rounded-md">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-start text-sm">
                        <span className="text-blue-500 flex-shrink-0 mr-2">💡</span>
                        <span className="text-gray-600">
                            <strong>Pro Tip:</strong> Break down large savings goals into smaller monthly targets to make them more achievable.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavingGoals;
