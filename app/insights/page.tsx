
"use client";

import { Clock, TrendingDown, Target } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Insights() {
  const { transactions, totalIncome, totalExpense } = useStore();
  const income = totalIncome();
  const expense = totalExpense();

 
  const lastExpense = expense + 1500;

  const change =
    lastExpense === 0
      ? 0
      : ((expense - lastExpense) / lastExpense) * 100;

  //  CATEGORY CALCULATION
  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  //  TOP CATEGORY
  const sorted = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  );

  const topCategory = sorted.length > 0 ? sorted[0] : ["N/A", 0];

  //  RATIO
  const incomePercent =
    income + expense === 0
      ? 0
      : (income / (income + expense)) * 100;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">

    {/*  HEADER */}
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Insights
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Analyze your financial patterns and trends
      </p>
    </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* TOP CATEGORY */}
        <div className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-200
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]
        hover:border-purple-300 cursor-pointer">

          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg group-hover:scale-110 transition">
              <Clock size={18} className="text-purple-600" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                Top Spending Category
              </p>
              <p className="text-xs text-gray-500">
                Based on your transactions
              </p>
            </div>
          </div>

         <hr className="my-4 border-gray-200" />

          <h2 className="text-2xl font-bold text-gray-900">
            {topCategory[0]}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            ₹{topCategory[1].toLocaleString()} spent
          </p>
        </div>

        {/* MONTH COMPARISON */}
        <div className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-200
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]
        hover:border-green-300 cursor-pointer">

          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg group-hover:scale-110 transition">
              <TrendingDown size={18} className="text-green-600" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                Month over Month
              </p>
              <p className="text-xs text-gray-500">
                Expense comparison
              </p>
            </div>
          </div>

           <hr className="my-4 border-gray-200" />

          <h2 className="text-lg font-semibold text-gray-900">
            You spent {Math.abs(change).toFixed(1)}%{" "}
            {change > 0 ? "more" : "less"} than last month
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            This month: ₹{expense.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Last month: ₹{Math.round(lastExpense).toLocaleString()}
          </p>
        </div>
      </div>

      {/* RATIO */}
      <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]
      hover:border-blue-300 cursor-pointer">

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg group-hover:scale-110 transition">
            <Target size={18} className="text-blue-600" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              Income to Expense Ratio
            </p>
            <p className="text-xs text-gray-500">
              Based on your data
            </p>
          </div>
        </div>

        <div className="flex justify-between text-sm mb-3">
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
            INCOME (₹{income.toLocaleString()})
          </span>

          <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full">
            EXPENSE (₹{expense.toLocaleString()})
          </span>
        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${incomePercent}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Income makes up {incomePercent.toFixed(1)}% of total flow.
        </p>
      </div>

    </div>
  );
}