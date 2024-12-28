import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios";
import Loader from "../components/Loader";
import { currency } from "../variable";
import { formatNumber } from "../utils/numberFormatter";
import { FaArrowTrendUp } from "react-icons/fa6";

const ProductInformation = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/product/${slug}`);
      const productData = response.data?.data;
      setProduct(productData);
      setMainImage(productData?.images[0]?.url || "/placeholder-image.png"); // Set the first image as the main image
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch product details.");
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/products/edit/${slug}`); // Navigate to an edit page if it exists.
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/product/${slug}`);
        toast.success("Product deleted successfully.");
        navigate("/products"); // Redirect to product list after deletion.
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete product."
        );
      }
    }
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl); // Update the main image display
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <p className="text-center text-gray-600">Product not found.</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Back to Product List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Image Section */}
        <div>
          {/* Main Image */}
          <div className="w-full h-64 bg-gray-100 p-1">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-contain rounded-md mb-4"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(image.url)}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                  mainImage === image.url
                    ? "border-2 border-gray-800"
                    : "ring-1 ring-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h2 className="text-xl font-medium">Product Details</h2>
          <p className="text-gray-600 mt-2">
            <strong>Title:</strong> {product.title}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Price:</strong> {currency} {formatNumber(product.price)}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Stock:</strong> {product.stock}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Category:</strong> {product?.category?.name || "N/A"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-6 space-x-4">
        <button
          onClick={handleEdit}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductInformation;
