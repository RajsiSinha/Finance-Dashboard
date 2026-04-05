"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Navbar() {
  const { role, setRole } = useStore();

  return (
    <div
      className="w-full px-6 py-4 flex justify-end items-center 
      bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="flex items-center gap-4">

        {/* 🔔 Notification */}
        <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* 🔄 Role Switch */}
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg text-sm cursor-pointer 
            hover:bg-gray-200 transition outline-none"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <ChevronDown
            size={16}
            className="absolute right-2 top-2.5 text-gray-500 pointer-events-none"
          />
        </div>

        {/* 👤 Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-sm">
            RS
          </div>
        </div>

      </div>
    </div>
  );
}