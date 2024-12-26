import React from "react";

const Table = () => {
  const data = [
    { id: 1, name: "Product 1", price: "$20", stock: "In Stock" },
    { id: 2, name: "Product 2", price: "$30", stock: "Out of Stock" },
    { id: 3, name: "Product 3", price: "$15", stock: "In Stock" },
  ];

  return (
    <table className="min-w-full bg-white border rounded-lg">
      <thead>
        <tr>
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Price</th>
          <th className="border px-4 py-2 text-left">Stock</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{item.name}</td>
            <td className="border px-4 py-2">{item.price}</td>
            <td className="border px-4 py-2">{item.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
