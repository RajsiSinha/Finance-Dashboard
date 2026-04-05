"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useStore } from "@/store/useStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editData?: any;
};

export default function AddTransactionModal({
  isOpen,
  onClose,
  editData,
}: Props) {
  const { addTransaction, updateTransaction, role } = useStore();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editData) {
      setForm({
        amount: String(editData.amount),
        category: editData.category,
        type: editData.type,
        date: editData.date.split("T")[0],
      });
    }
  }, [editData]);

  if (!isOpen || role !== "admin") return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.amount || !form.category) return;

    if (editData) {
      updateTransaction({
        ...editData,
        amount: Number(form.amount),
        category: form.category,
        type: form.type as "income" | "expense",
        date: new Date(form.date).toISOString(),
      });
    } else {
      addTransaction({
        id: Date.now().toString(),
        amount: Number(form.amount),
        category: form.category,
        type: form.type as "income" | "expense",
        date: new Date(form.date).toISOString(),
      });
    }

    setForm({
      amount: "",
      category: "",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {editData ? "Edit Transaction" : "Add New Transaction"}
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">Type</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
                className="w-full mt-1 border px-3 py-2 rounded-lg"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="w-full mt-1 border px-3 py-2 rounded-lg"
              />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-600">
                Category
              </label>
              <input
                type="text"
                value={form.category}
                placeholder="E.g. Food"
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full mt-1 border px-3 py-2 rounded-lg 
                placeholder:text-gray-400"
              />
            </div>

            {/* AMOUNT */}
            <div>
              <label className="text-sm text-gray-600">
                Amount
              </label>
              <input
                type="number"
                value={form.amount}
                placeholder="₹ 0.00"
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
                className="w-full mt-1 border px-3 py-2 rounded-lg 
                placeholder:text-gray-400"
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg 
              hover:bg-indigo-700 transition"
            >
              {editData ? "Update" : "Add"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}