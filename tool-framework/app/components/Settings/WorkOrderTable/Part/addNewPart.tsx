"use client";
import React, { useState } from "react";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import PopupForm from "@/app/components/PopUpFormTemplate/page";
import {
  PartDataBase,
  customerNames,
  historyOfPart,
} from "@/app/components/Data/SettingsWorkOrderData/page";
import { partDB } from "../types";
import { Dropdown } from "@nextui-org/react";
import { ChevronDown } from "lucide-react";

const Part: React.FC = ({
  onClose,
  setparts,
}: {
  onClose: () => void;
  setparts: React.Dispatch<React.SetStateAction<partDB[]>>;
}) => {
  const [formData, setFormData] = useState({
    id: PartDataBase.length + 1,
    Part_No: 0,
    name: "",
    manufacturingDate: "",
    openingShots: 0,
    totalShots: 0,
    customerName: [], // This will hold the selected names
    historyOfPart: "",
    avgMeantimeBWFailure: "",
    totalCost: 0,
  });

  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const handleSelectName = (selectedKeys: Set<string>) => {
    const namesArray = Array.from(selectedKeys); // Convert Set to Array
    setSelectedNames(namesArray); // Update selected names
    setFormData((prev) => ({ ...prev, customerName: namesArray })); // Update formData with selected names
  };
  const handleSelectPart = (selectedKeys: Set<string>) => {
    const namesArray = Array.from(selectedKeys); // Convert Set to Array
    setSelectedParts(namesArray); // Update selected names
    setFormData((prev) => ({ ...prev, historyOfPart: namesArray })); // Update formData with selected names
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedParts = [...PartDataBase, formData];
    console.log(updatedParts);
    setparts(updatedParts);
    onClose();
  };

  return (
    <PopupForm title={"Create User"} onClose={onClose}>
      <div className="max-h-[700px] overflow-y-auto">
        {" "}
        {/* Popup max height */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="Part_No"
              className="block text-md font-medium text-black"
            >
              Part No:<span className="text-red-500"> *</span>
            </label>
            <input
              id="Part_No"
              type="number"
              className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500 "
              value={formData.Part_No}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium text-black"
            >
              Name:<span className="text-red-500"> *</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="manufacturingDate"
              className="block text-md font-medium text-black"
            >
              Manufacturing Date:<span className="text-red-500"> *</span>
            </label>
            <input
              id="manufacturingDate"
              type="date"
              className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500"
              value={formData.manufacturingDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="openingShots"
              className="block text-md font-medium text-black"
            >
              Opening Shots:<span className="text-red-500"> *</span>
            </label>
            <input
              id="openingShots"
              type="number"
              className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500"
              value={formData.openingShots}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="totalShots"
              className="block text-md font-medium text-black"
            >
              Total Shots:<span className="text-red-500"> *</span>
            </label>
            <input
              id="totalShots"
              type="number"
              className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500"
              value={formData.totalShots}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="customerName"
              className="block text-md font-medium text-black"
            >
              Customer Names:
            </label>
            <Dropdown>
              <DropdownTrigger>
                <div className="w-full flex p-1 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md justify-between text-gray-500">
                  {selectedNames.length
                    ? selectedNames.join(",")
                    : "Select Names"}{" "}
                  <ChevronDown />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={selectedNames} //names as keys
                selectionMode="multiple"
                onSelectionChange={handleSelectName} // Handle selection change
              >
                {customerNames.map((name) => (
                  <DropdownItem key={name} value={name}>
                    {name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="mb-4">
            <label
              htmlFor="historyOfPart"
              className="block text-md font-medium text-black"
            >
              History of Part:<span className="text-red-500"> *</span>
            </label>
            <Dropdown>
              <DropdownTrigger>
                <div className="w-full flex justify-between p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500">
                  {selectedParts.length
                    ? selectedParts.join(",")
                    : "Select Parts"}
                  <ChevronDown />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={selectedParts} //names as keys
                selectionMode="multiple"
                onSelectionChange={handleSelectPart} // Handle selection change
              >
                {historyOfPart.map((name) => (
                  <DropdownItem key={name} value={name}>
                    {name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="mb-4">
            <label
              htmlFor="avgMeantimBWFailure"
              className="block text-md font-medium text-black"
            >
              Avg Meantime B/W Failure:<span className="text-red-500"> *</span>
            </label>
            <input
              id="avgMeantimeBWFailure"
              type="text"
              className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500"
              value={formData.avgMeantimeBWFailure}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="totalCost"
              className="block text-md font-medium text-black"
            >
              Total Cost:<span className="text-red-500"> *</span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="totalCost"
                type="number"
                className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-500"
                value={formData.totalCost}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <Button
              className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </PopupForm>
  );
};

export default Part;
