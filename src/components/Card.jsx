import React from "react";

const Card = ({ title, value, className }) => {
  return (
    <div className={`${className} shadow rounded-lg p-6 h-full`}>
      <h3 className=" font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
