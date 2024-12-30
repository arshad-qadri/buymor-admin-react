import React, { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import useAuth from "../hooks/useAuth";

const AdminProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const { logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md my-5">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Profile</h1>
      <div className="flex flex-col items-center">
        {/* Profile Avatar */}
        {user?.name && (
          <span className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center text-2xl my-3">
            {user.name[0]}
          </span>
        )}
        <h2 className="text-xl font-medium">{user?.name || "Admin Name"}</h2>
        <p className="text-gray-600">{user?.email || "admin@example.com"}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium">Profile Settings</h3>
        <div className="mt-4">
          <div className="flex justify-between items-center border-b py-2">
            <span className="font-medium">Name</span>
            <span>{user?.name || "Admin Name"}</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="font-medium">Email</span>
            <span>{user?.email || "admin@example.com"}</span>
          </div>
          {console.log("user---",user)
          }
          <div className="flex justify-between items-center border-b py-2">
            <span className="font-medium">Mobile Number</span>
            <span>{user?.mobileNumber || "Not Available"}</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span className="font-medium">Role</span>
            <span>Admin</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
