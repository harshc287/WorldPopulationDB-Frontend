// src/components/layout/Sidebar.jsx
import React from "react";
import { LayoutDashboard, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Sidebar = ({ open }) => {
  return (
    <aside
      className={clsx(
        "bg-white shadow-lg h-screen fixed top-0 left-0 z-50 transition-all",
        open ? "w-64" : "w-0 overflow-hidden",
        "lg:w-64 lg:static"
      )}
    >
      <div className="p-6 font-bold text-xl border-b">Dashboard</div>

      <nav className="p-4 space-y-2">
        <SidebarItem icon={<LayoutDashboard />} label="Dashboard" to="/" />
        <SidebarItem icon={<Globe />} label="Continents" to="/continents" />
        <SidebarItem icon={<Users />} label="Countries" to="/countries" />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-gray-700 text-sm"
  >
    {icon} <span>{label}</span>
  </Link>
);

export default Sidebar;
