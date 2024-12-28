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

const ProductTable = ({ view, setView }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (view === "table") {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/product/all-products`);
      setProducts(response.data.products || []);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch products.");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  const handleVisit = (slug) => {
    navigate(`/products/${slug}`);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true); // Show loader while deleting
        await api.post(`/product/delete/${id}`); // API call to delete the product
        toast.success("Product deleted successfully.");

        // Update the product list by filtering out the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        setLoading(false); // Hide loader after success
      } catch (error) {
        setLoading(false); // Hide loader after failure
        toast.error(
          error.response?.data?.message || "Failed to delete the product."
        );
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Product List</h1>
        <button
          onClick={() => setView("create")}
          className={`px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500`}
        >
          Create Product
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">#</th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Image
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
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
                <td className="border border-gray-200 px-4 py-2 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {product.name}
                </td>
                <td className="border border-gray-200 px-4 py-2 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {product.title}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  {currency} {formatNumber(product.price)}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {product.stock}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button onClick={() => setView("update")}>
                    <BiEdit
                      size={20}
                      className="text-blue-500  text-sm rounded-md hover:text-blue-400"
                    />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="mx-2">
                    <RiDeleteBin4Fill
                      size={20}
                      className="text-red-500 text-sm rounded-md hover:text-red-400"
                    />
                  </button>
                  <button
                    onClick={() => handleVisit(product.slug)}
                   
                  >
                    <FaArrowTrendUp size={20}  className="text-yellow-600 font-medium rounded-md hover:text-yellow-500" />
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
  );
};

export default ProductTable;
