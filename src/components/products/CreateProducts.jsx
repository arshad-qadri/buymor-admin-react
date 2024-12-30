import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { baseUrl } from "../../variable";
import api from "../../axios";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const CreateProduct = ({ setView }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get(`/category/all`);
      const formattedCategories =
        response.data.data &&
        response.data.data.length > 0 &&
        response.data.data.map((cat) => ({
          value: cat._id,
          label: cat.name,
        }));
      setCategories(formattedCategories || []);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Append selected files
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !title || !description || !price || !stock || !category) {
      toast.error("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category.value);
    images.forEach((image) => formData.append("images", image));

    try {
      await api.post(`/product/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product created successfully!");
      // Clear form
      setName("");
      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory(null);
      setImages([]);
      setView("table");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product.");
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "black" : base.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px black" : base.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "black" : base.borderColor,
      },
    }),
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Create Product</h1>
        <button onClick={() => {setView("table"); navigate("/products")}} className="cursor-pointer">
          <CgClose size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Stock Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description Field */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Category Field */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Select
              value={category}
              onChange={setCategory}
              options={categories}
              placeholder="Select a category"
              className="react-select-container"
              classNamePrefix="react-select"
              styles={customStyles}
            />
          </div>

          {/* Image Upload with Preview */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
            <div className="mt-4 flex justify-start items-center flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100"
                  >
                    <CgClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
