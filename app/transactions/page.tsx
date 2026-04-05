"use client";

import { useState } from "react";
import TransactionTable from "@/components/transactions/TransactionTable";
import { useStore } from "@/store/useStore";
import AddTransactionModal from "@/components/ui/AddTransactionModal";

export default function TransactionsPage() {
  
  const [open, setOpen] = useState(false);
  const { transactions, role } = useStore();

  // 📊 STATS
  const totalTransactions = transactions.length;

const totalIncome = transactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpense = transactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your financial activity
          </p>
        </div>

        {/* ✅ ADD BUTTON (RBAC) */}
  {role === "admin" && (
  <button
    onClick={() => setOpen(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg 
    hover:bg-blue-700 transition text-sm font-medium"
  >
    + Add Transaction
  </button>
)}

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm 
          hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Total Transactions
          </p>

          <h2 className="text-xl font-semibold mt-2 text-gray-800">
            {totalTransactions}
          </h2>
        </div>

        {/* INCOME */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm 
          hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Total Income
          </p>

          <h2 className="text-xl font-semibold mt-2 text-green-600">
            ₹{totalIncome.toLocaleString()}
          </h2>
        </div>

        {/* EXPENSE */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm 
          hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Total Expenses
          </p>

          <h2 className="text-xl font-semibold mt-2 text-red-500">
            ₹{totalExpense.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 shadow-sm 
        hover:shadow-lg transition-all duration-300">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            All Transactions
          </h2>
        </div>

        <TransactionTable />
      </div>

      <AddTransactionModal 
  isOpen={open} 
  onClose={() => setOpen(false)} 
/>
 
    </div>
  );
}