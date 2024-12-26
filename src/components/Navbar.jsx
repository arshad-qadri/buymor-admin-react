import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const path = useLocation();
  {
    console.log("path===", path);
  }
  const titles = {
    "/": "Dashboard",
    "/orders": "Orders",
    "/products": "Products",
    "/category": "Category"
  };
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between z-30">
      <button
        className="lg:hidden text-gray-500 hover:text-gray-700"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <h1 className="text-lg font-bold md:block hidden">{titles[path.pathname]}</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-lg px-3 py-1 "
        />
        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
          <span className="text-gray-500">U</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
