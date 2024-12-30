import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation(); // Get current location

  // Define the sidebar menu items in an array
  const menuItems = [
    { name: "Dashboard", to: "/" },
    { name: "Category", to: "/category" },
    { name: "Products", to: "/products" },
    { name: "Orders", to: "#" },
    { name: "Customers", to: "#" },
    { name: "Settings", to: "#" },
  ];

  return (
    <div
      className={`fixed lg:relative top-0 left-0 min-h-screen w-52 bg-gray-800 text-white z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-5 lg:hidden border-b border-gray-700">
        <h2 className="text-xl font-bold">Buymor</h2>
        <button
          className="text-gray-400 hover:text-white"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>
      <h2 className="hidden lg:block text-xl font-bold p-5 border-b border-gray-700">
        Buymor
      </h2>
      <ul className="space-y-4 p-5">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className={`hover:text-gray-300 ${
                location.pathname === item.to
                  ? "text-indigo-500 font-bold" // Active state
                  : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
