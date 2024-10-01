import React from "react";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";

interface CreateNewWorkOrderProps {
  onClose: () => void;
}

const CreateNewWorkOrder: React.FC<CreateNewWorkOrderProps> = ({ onClose }) => {
  function handleSubmit(): void {
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg relative w-full max-w-lg mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="w-full text-2xl font-bold text-gray-800 text-center mb-6">
          Total Room Work Order
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Work Order Stage */}
          <div className="mb-6 flex items-center justify-between">
            <label className="text-lg font-medium text-gray-700">
              WorkOrder Stage:
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <span className="text-lg">Online</span>
            </div>
          </div>

          {/* Date / Shift */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Date / Shift:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <select className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option value="Afternoon">Afternoon</option>
                <option value="Morning">Morning</option>
              </select>
            </div>
          </div>

          {/* Port Name */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Port Name:
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Port A</option>
              <option value="">Port B</option>
            </select>
          </div>

          {/* Reason for Unload */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Reason for Unload:
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Reason A</option>
              <option value="">Reason B</option>
            </select>
          </div>

          {/* Shot Count */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Shot Count:
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Description of Work Request:
            </label>
            <textarea
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-all"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewWorkOrder;
