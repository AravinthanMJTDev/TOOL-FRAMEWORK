"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
const ReasonForUnload: React.FC = () => {
  const [formData, setFormData] = useState({
    Part_No: 0,
    name: "",
    manufacturingDate: "",
    openingShots: 0,
    totalShots: 0,
    customerName: "",
    historyOfPart: "",
    avgMeantimeBWFailure: "",
    totalCount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    // <Main>
    <div className="flex flex-col space-y-3 p-5 rounded-lg shadow-lg mx-auto">
      <div className="bg-blue-600 text-white py-3 mt-5 text-center text-lg mb-4 font-semibold">
        ReasonForUnload
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="Part_No" className="w-1/3 text-right pr-4">
            Part No:<span className="text-red-500"> *</span>
          </label>
          <input
            id="Part_No"
            type="number"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.Part_No}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="name" className="w-1/3 text-right pr-4">
            Name:<span className="text-red-500"> *</span>
          </label>
          <input
            id="name"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="manufacturingDate" className="w-1/3 text-right pr-4">
            Manufacturing Date:<span className="text-red-500"> *</span>
          </label>
          <input
            id="manufacturingDate"
            type="date"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.manufacturingDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="openingShots" className="w-1/3 text-right pr-4">
            Opening Shots:<span className="text-red-500"> *</span>
          </label>
          <input
            id="openingShots"
            type="number"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.openingShots}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="totalShots" className="w-1/3 text-right pr-4">
            Total Shots:<span className="text-red-500"> *</span>
          </label>
          <input
            id="totalShots"
            type="number"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.totalShots}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="customerName" className="w-1/3 text-right pr-4">
            Customer Name:<span className="text-red-500"> *</span>
          </label>
          <input
            id="customerName"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="historyOfPart" className="w-1/3 text-right pr-4">
            History of Part:<span className="text-red-500"> *</span>
          </label>
          <input
            id="historyOfPart"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.historyOfPart}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="avgMeantimeBWFailure"
            className="w-1/3 text-right pr-4"
          >
            Avg Meantime B/W Failure:<span className="text-red-500"> *</span>
          </label>
          <input
            id="avgMeantimeBWFailure"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.avgMeantimeBWFailure}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="totalCount" className="w-1/3 text-right pr-4">
            Total Count:<span className="text-red-500"> *</span>
          </label>
          <input
            id="totalCount"
            type="number"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.totalCount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
    // </Main>
  );
};

export default ReasonForUnload;
