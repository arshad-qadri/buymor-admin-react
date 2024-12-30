import React, { useEffect, useState } from "react";
import CreateProduct from "../components/products/CreateProducts";
import ProductTable from "../components/products/ProductTable";
import { useLocation } from "react-router-dom";

const Product = () => {
  const location = useLocation();
  const [view, setView] = useState("table");


  // Use the useEffect hook to update the view state based on the query string
  useEffect(() => {
    // Extract query params
    const queryParams = new URLSearchParams(location.search);
    const viewParam = queryParams.get("view");

    // If the 'view' query param exists, update the view state
    if (viewParam) {
      setView(viewParam);
    } else {
      setView("table"); // Default to 'table' view if no query param is found
    }
  }, [location]);

  const renderContent = () => {
    switch (view) {
      case "table":
        return <ProductTable view={view} setView={setView} />;
      case "create":
        return <CreateProduct title="Create Product" setView={setView} />;
      case "update":
        return <CreateProduct title="Update Product" setView={setView} />;
      default:
        return <div className="text-center text-gray-500">Page not found</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      {/* Content Rendering */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default Product;
