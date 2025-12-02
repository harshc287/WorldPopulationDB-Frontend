// src/components/layout/Topbar.jsx
import React from "react";
import { Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="h-6 w-6" />
      </button>

      <h1 className="text-xl font-semibold">World Population Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <div className="h-8 w-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
};

export default Topbar;
