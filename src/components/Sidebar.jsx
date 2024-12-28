import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
      <h2 className="hidden lg:block text-xl font-bold p-5 border-b border-gray-700">Buymor</h2>
      <ul className="space-y-4 p-5">
        <li>
          <Link to="/category" className="hover:text-gray-300">
            Category
          </Link>
        </li>
        <li>
          <Link to={"/products"} className="hover:text-gray-300">
            Products
          </Link>
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
