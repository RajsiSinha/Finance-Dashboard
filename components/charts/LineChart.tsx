"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

import { useStore } from "@/store/useStore";
import { format } from "date-fns";

export default function BalanceChart() {
  const { transactions } = useStore();

  // 🔥 STEP 1: SORT BY DATE
  const sorted = [...transactions].sort(
    (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 🔥 STEP 2: RUNNING BALANCE
  let balance = 0;

  const data = sorted.map((t) => {
    if (t.type === "income") {
      balance += t.amount;
    } else {
      balance -= t.amount;
    }

    return {
      date: format(new Date(t.date), "MMM dd"),
      balance,
    };
  });

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 
      hover:shadow-lg transition-all duration-300">

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>

          {/* GRID */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* AXIS */}
          <XAxis dataKey="date" />
          <YAxis />

          {/* TOOLTIP */}
          <Tooltip />

          {/* AREA (background fill) */}
          <Area
            type="monotone"
            dataKey="balance"
            stroke="none"
            fill="#6366f1"
            fillOpacity={0.15}
          />

          {/* MAIN LINE */}
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}