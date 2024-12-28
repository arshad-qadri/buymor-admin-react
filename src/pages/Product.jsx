import React, { useState } from "react";
import CreateProduct from "../components/products/CreateProducts";
import ProductTable from "../components/products/ProductTable";

const Product = () => {
  const [view, setView] = useState("table");

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
