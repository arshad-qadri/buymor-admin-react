import React from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import TotalSale from "../graph/TotalSale";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className=" md:col-span-2 row-span-2 bg-white shadow rounded-lg py-2 pr-2">
          <h3 className=" font-bold px-6 py-4">Total Sale</h3>
          <TotalSale />
        </div>
        <Card
          title="Cancelled Orders"
          value="120"
          className="bg-white text-red-600 "
        />
        <Card title="Orders" value="230" className="bg-white text-green-600 " />
        <div className="md:col-span-2">
          <Card title="Revenue" value="$25,000" className={"bg-white"} />
          {/* <YearlyRevenue/> */}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Products</h2>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
