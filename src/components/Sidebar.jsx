import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed lg:relative top-0 left-0 min-h-screen w-64 bg-gray-800 text-white z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-5 lg:hidden">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          className="text-gray-400 hover:text-white"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>
      <h2 className="hidden lg:block text-xl font-bold p-5">Buymor</h2>
      <ul className="space-y-4 p-5">
        <li>
          <a href="/category" className="hover:text-gray-300">
            Category
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Customers
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
