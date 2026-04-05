"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useStore } from "@/store/useStore";
import { Pencil, Trash2 } from "lucide-react";
import AddTransactionModal from "@/components/ui/AddTransactionModal";

export default function TransactionTable() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [editData, setEditData] = useState<any>(null);

  const { transactions, deleteTransaction, role } = useStore();

  // 🔍 FILTER
  let filtered = transactions.filter((t) => {
    const matchSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      typeFilter === "all" ? true : t.type === typeFilter;

    return matchSearch && matchType;
  });

  // 🔥 SORTING
  let sorted = [...filtered];

  if (sortOrder === "latest") {
    sorted.sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (sortOrder === "oldest") {
    sorted.sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } else if (sortOrder === "asc") {
    sorted.sort((a, b) => a.amount - b.amount);
  } else if (sortOrder === "desc") {
    sorted.sort((a, b) => b.amount - a.amount);
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-lg"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-lg"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="asc">Amount ↑</option>
          <option value="desc">Amount ↓</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full text-sm">

          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-3">Date</th>
              <th className="text-left">Category</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Type</th>
              
              {/* ✅ Only show for admin */}
              {role === "admin" && (
                <th className="text-left">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {sorted.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition">

                <td className="py-3 text-gray-600">
                  {format(new Date(t.date), "dd MMM")}
                </td>

                <td className="font-medium text-gray-800">
                  {t.category}
                </td>

                <td className="font-semibold">
                  ₹{t.amount.toLocaleString()}
                </td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      t.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                {/* ✅ ACTIONS only for admin */}
                {role === "admin" && (
                  <td>
                    <div className="flex gap-2">

                      <button
                        onClick={() => setEditData(t)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>

                    </div>
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* EDIT MODAL */}
      <AddTransactionModal
        isOpen={!!editData}
        onClose={() => setEditData(null)}
        editData={editData}
      />

    </div>
  );
}

