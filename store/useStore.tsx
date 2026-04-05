"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { transactions as initialData } from "@/data/mockData";

type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

type Store = {
  transactions: Transaction[];

  // 🔥 UI STATE
  role: "viewer" | "admin";

  // 🔥 ACTIONS
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (t: Transaction) => void;

  setRole: (role: "viewer" | "admin") => void;

  // 📊 DERIVED (FUNCTION STYLE)
  totalIncome: () => number;
  totalExpense: () => number;
  balance: () => number;

  // 🔄 RESET
  reset: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      transactions: initialData as Transaction[],

      // UI
      role: "viewer",

      // ➕ ADD
      addTransaction: (t) =>
        set((state) => ({
          transactions: [{ ...t }, ...state.transactions],
        })),

      // 🗑 DELETE
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // ✏️ UPDATE
      updateTransaction: (updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === updated.id ? { ...updated } : t
          ),
        })),

      // 🔄 ROLE
      setRole: (role) => set({ role }),

      // 📊 DERIVED VALUES
      totalIncome: () =>
        get().transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0),

      totalExpense: () =>
        get().transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0),

      balance: () =>
        get().totalIncome() - get().totalExpense(),

      // 🔄 RESET
      reset: () =>
        set({ transactions: initialData as Transaction[] }),
    }),
    {
      name: "finance-store",

      // ✅ Persist only required fields
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
      }),
    }
  )
);