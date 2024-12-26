import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../variable";
import api from "../axios";
import CreateCategory from "../components/modals/CreateCategory";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Pagination from "../components/modals/Pagination";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    if (searchTerm) {
      fetchCategories();
    } else {
      fetchCategories();
    }
  }, [currentPage, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        searchTerm
          ? `/category/all?search=${searchTerm}&page=${currentPage}&mimit=${limit}`
          : `/category/all?page=${currentPage}&limit=${limit}`
      );
      setCategories(response.data);
      const totalPage = Math.ceil(response.data?.total / limit);
      setTotalPage(totalPage);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirm) {
      try {
        const response = await api.post(`/category/delete/${id}`);
        fetchCategories();
        toast.success(response.data?.message);
      } catch (error) {
        toast.error(error.message || "Failed to fetch categories.");
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-end items-center mb-6">
        {/* <h1 className="text-2xl font-bold">Categories</h1> */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Category
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium text-gray-700">
                #
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories?.data?.length > 0 &&
              categories?.data.map((category, index) => (
                <tr
                  key={category._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                    {category.name}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <BiEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <RiDeleteBin4Fill size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {categories && categories?.data?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {isModalOpen && (
        <CreateCategory
          onClose={() => setIsModalOpen(false)}
          onCategoryCreated={fetchCategories}
        />
      )}
    </div>
  );
};

export default CategoryPage;
