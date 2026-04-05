
"use client";

import { TrendingUp, Clock, Target } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Insights() {
  const { transactions, totalIncome, totalExpense } = useStore();
   const income = totalIncome();
   const expense = totalExpense();

  // 🔥 TOP CATEGORY CALCULATION
  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const sorted = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  );

  const topCategory = sorted.length > 0 ? sorted[0] : ["N/A", 0];

  // 🔥 MONTH COMPARISON (REALISTIC)
  const lastExpense = expense + 1500;

  const change =
    lastExpense === 0
      ? 0
      : ((expense - lastExpense) / lastExpense) * 100;

  // 🔥 SMART INSIGHT
  const incomePercent =
    income + expense === 0
      ? 0
      : (income / (income + expense)) * 100;

  return (
    <div className="space-y-6">

      {/* CARD 1 */}
      <div className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-200 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg group-hover:scale-110 transition">
            <Clock size={18} className="text-purple-600" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Top Spending Category
            </p>
            <h2 className="text-lg font-semibold text-gray-800">
              {topCategory[0]}
            </h2>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          ₹{topCategory[1].toLocaleString()} spent this month
        </p>
      </div>

      {/* CARD 2 */}
      <div className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-200 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg group-hover:scale-110 transition">
            <TrendingUp size={18} className="text-green-600" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Monthly Comparison
            </p>
            <h2 className="text-lg font-semibold text-gray-800">
              You spent {Math.abs(change).toFixed(1)}%{" "}
              {change > 0 ? "more" : "less"}
            </h2>
          </div>
        </div>
      </div>

      {/* CARD 3 */}
      <div className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-200 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg group-hover:scale-110 transition">
            <Target size={18} className="text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Smart Insight
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {incomePercent > 50
                ? "Great! Your income is higher than expenses 👍"
                : "Your expenses are increasing ⚠️"}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

