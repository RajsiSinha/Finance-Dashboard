"use client";

import { LayoutDashboard, Receipt, Lightbulb } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: Receipt,
    },
    {
      name: "Insights",
      href: "/insights",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 
      border-r border-gray-200 
      p-6 flex flex-col justify-between">

      {/* TOP SECTION */}
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-8">

  {/* Logo Icon */}
  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
    <span className="text-white font-bold text-sm">Z</span>
  </div>

  {/* Brand Name */}
  <h2 className="text-xl font-bold text-gray-900 tracking-wide">
    Zorvyn
  </h2>

</div>

        {/* NAV */}
        <ul className="space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.name} href={item.href}>
                <li
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                  
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-200"
                  }
                  
                  `}
                >
                  <Icon size={18} />
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

    </div>
  );
}

