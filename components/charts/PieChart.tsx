"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useStore } from "@/store/useStore";

export default function SpendingChart() {
  const { transactions } = useStore();

  // CATEGORY AGGREGATION (INSIDE COMPONENT)
  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = [
    "#6366f1",
    "#10b981",
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
    "#0ea5e9",
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 
      hover:shadow-lg transition-all duration-300">

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Spending Breakdown
      </h3>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            innerRadius={50}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* DIVIDER */}
      <div className="my-4 border-t border-gray-200" />

      {/* LEGEND */}
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-start gap-3">

            <div
              className="w-3 h-3 rounded-full mt-1"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />

            <div>
              <p className="text-sm font-medium text-gray-700">
                {item.name}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                ₹{item.value.toLocaleString()}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}