import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../variable";
import api from "../../axios";

const CreateCategory = ({ onClose, onCategoryCreated }) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      await api.post(`/category/create`, { name: newCategoryName });
      toast.success("Category created successfully!");
      setNewCategoryName("");
      onClose();
      onCategoryCreated();
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md  w-96">
        <h2 className="text-2xl font-bold mb-6">Create Category</h2>
        <form onSubmit={handleCreateCategory}>
          <div className="mb-6">
            <label
              htmlFor="newCategoryName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="newCategoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;