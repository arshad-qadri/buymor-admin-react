import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AuthLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
