import React, { useEffect, useState } from "react";
import api from "../../axios";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { currency } from "../../variable";
import { formatNumber } from "../../utils/numberFormatter";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

const ProductTable = ({ view, setView }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (view === "table") {
      fetchCategories(); // Fetch available categories on load
      fetchProducts();
    }
  }, [view, page, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await api.get(`/category/available`);
      setCategories(response.data.categories || []);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/product/all-products`, {
        params: {
          page,
          limit: 10, // Set the number of items per page
          category: selectedCategory || undefined,
        },
      });
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch products.");
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1); // Reset to the first page when filtering
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        await api.post(`/product/delete/${id}`);
        toast.success("Product deleted successfully.");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(
          error.response?.data?.message || "Failed to delete the product."
        );
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="lg:w-auto w-screen mx-auto mt-10 p-6 bg-white shadow-md rounded-md overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button
          onClick={() => {
            setView("create");
            navigate("/products?view=create");
          }}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
        >
          Create Product
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex items-center mb-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="lg:w-auto w-screen overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">#</th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Image
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Price
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Stock
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {product?.images && product.images?.length > 0 && (
                      <img
                        src={
                          product.images[0]?.url ||
                          "https://via.placeholder.com/50"
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {product.title}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {currency} {formatNumber(product.price)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {product.stock}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => {
                        setView("update");
                        navigate("/products?view=update");
                      }}
                    >
                      <BiEdit className="text-blue-500 hover:text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="mx-2"
                    >
                      <RiDeleteBin4Fill className="text-red-500 hover:text-red-400" />
                    </button>
                    <button onClick={() => navigate(`/products/${product.slug}`)}>
                      <FaArrowTrendUp className="text-yellow-600 hover:text-yellow-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="border border-gray-200 px-4 py-2 text-center"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {/* <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md mx-1"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md mx-1"
        >
          Next
        </button>
      </div> */}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}  />
      
    </div>
  );
};

export default ProductTable;
