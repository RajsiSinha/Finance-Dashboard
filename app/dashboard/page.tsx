"use client";

import BalanceChart from "@/components/charts/LineChart";
import SpendingChart from "@/components/charts/PieChart";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function DashboardPage() {
  const { totalIncome, totalExpense, balance } = useStore();
  const income = totalIncome();
  const expense = totalExpense();
  const currentBalance = balance();

  const isPositive = currentBalance >= 0;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your income, expenses, and trends
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL BALANCE */}
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md 
          hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">

          <div className="flex items-center justify-between">
            <p className="text-xs uppercase opacity-80">Total Balance</p>

            <div className="bg-white/20 p-2 rounded-lg">
              <Wallet size={18} />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-4">
            ₹{currentBalance.toLocaleString()}
          </h2>

          <p className="text-xs mt-3 bg-white/20 px-3 py-1 rounded-full inline-block">
            {isPositive ? "You are saving money" : "Overspending ⚠️"}
          </p>
        </div>

        {/* INCOME */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 
          hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Total Income</p>

            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp size={18} className="text-green-600" />
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-4 text-green-600">
            ₹{income.toLocaleString()}
          </h2>
        </div>

        {/* EXPENSES */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 
          hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Total Expenses</p>

            <div className="bg-red-100 p-2 rounded-lg">
              <TrendingDown size={18} className="text-red-500" />
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-4 text-red-500">
            ₹{expense.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LINE CHART */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-200 
          hover:shadow-lg transition-all duration-300">
          
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Balance Trend
          </h3>

          <BalanceChart />
        </div>

        {/* PIE CHART */}
        <SpendingChart />
      </div>

    </div>
  );
}