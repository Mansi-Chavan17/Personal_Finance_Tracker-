import React, { createContext, useState, useContext } from "react";

// Create the context
const AmountContext = createContext();

// Create a provider component
export const AmountProvider = ({ children }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);

  return (
    <AmountContext.Provider value={{ totalIncome, setTotalIncome, totalExpense,setTotalExpense,totalSaving,setTotalSaving }}>
      {children}
    </AmountContext.Provider>
  );
};

// Create a hook to access the context easily
export const useAmount = () => useContext(AmountContext);
