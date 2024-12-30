import React from "react";

const Loader = ({size = "h-16 w-16"}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className={`animate-spin rounded-full ${size} border-t-4 border-b-4 border-indigo-600`}></div>
    </div>
  );
};

export default Loader;
