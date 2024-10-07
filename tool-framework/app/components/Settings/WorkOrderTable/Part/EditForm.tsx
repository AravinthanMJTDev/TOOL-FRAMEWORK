import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  customerNames,
  PartDataBase,
  historyOfPart,
} from "../../../Data/SettingsWorkOrderData/page";
import { partDB } from "../types";
import PopupForm from "../../../PopUpFormTemplate/page";
import { ChevronDown } from "lucide-react";

interface EditFormProps {
  id: number;
  onClose: () => void;
  setParts: React.Dispatch<React.SetStateAction<partDB[]>>;
}

const EditForm: React.FC<EditFormProps> = ({ id, onClose, setParts }) => {
  const [parts, setPartsState] = useState<partDB | null>(null);
  const [selectedCustomerNames, setSelectedCustomerNames] = useState<string[]>(
    []
  ); // State for selected customer names
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  useEffect(() => {
    const foundParts = PartDataBase.find(
      (partsFromDb) => partsFromDb.id === id
    );
    if (foundParts) {
      setPartsState(foundParts);
      setSelectedCustomerNames(foundParts.customerName || []); // Set initial selected names from found parts
      setSelectedParts(foundParts.historyOfPart);
    } else {
      console.error("Parts not found");
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPartsState((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSelectCustomerName = (selectedKeys: Set<string>) => {
    const namesArray = Array.from(selectedKeys);
    setSelectedCustomerNames(namesArray);
  };

  const handleSelectParts = (selectedKeys: Set<string>) => {
    const namesArray = Array.from(selectedKeys);
    setSelectedParts(namesArray);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parts) {
      const updatedPartsDB = PartDataBase.map((existingParts) =>
        existingParts.id === id
          ? {
              ...existingParts,
              ...parts,
              customerName: selectedCustomerNames,
              historyOfPart: selectedParts,
            }
          : existingParts
      );
      setParts(updatedPartsDB);
    }
    onClose();
  };

  if (!parts) {
    return null; // Prevent rendering if parts is null (loading state)
  }

  return (
    <PopupForm onClose={onClose} title={"Edit Parts"}>
      <div className="max-h-[700px] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Part Number */}
          <div className="flex flex-col ">
            <label className="block text-md font-medium text-black">
              Part No:
            </label>
            <input
              id="Part_No"
              type="text"
              className="w-full border border-gray-300 p-1 rounded focus:ring-2 focus:ring-primary text-gray-500 text-sm"
              value={parts["Part_No"]}
              onChange={handleChange}
              required
            />
          </div>

          {/* Name */}
          <div className="flex flex-col ">
            <label className="block text-md font-medium text-black">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="w-full border border-gray-300 p-1 rounded focus:ring-2 focus:ring-primary text-gray-500 text-sm"
              value={parts["name"]}
              onChange={handleChange}
              required
            />
          </div>

          {/* Manufacturing Date */}
          <div className="flex flex-col ">
            <label className="block text-md font-medium text-black">
              Manufacturing Date:
            </label>
            <input
              id="manufacturingDate"
              type="date"
              className="w-full border border-gray-300 p-1 rounded focus:ring-2 focus:ring-primary text-gray-500 text-sm"
              value={parts.manufacturingDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Opening Shots */}
          <div className="flex flex-col ">
            <label className="block text-md font-medium text-black">
              Opening Shots:
            </label>
            <input
              id="openingShots"
              type="number"
              className="w-full border border-gray-300 p-1 rounded focus:ring-2 focus:ring-primary text-gray-500 text-sm"
              value={parts["openingShots"]}
              onChange={handleChange}
              required
            />
          </div>

          {/* Total Shots */}
          <div className="flex flex-col ">
            <label className="block text-md font-medium text-black">
              Total Shots:
            </label>
            <input
              id="totalShots"
              type="number"
              className="w-full border border-gray-300 p-1 rounded focus:ring-2 focus:ring-primary text-gray-500 text-sm"
              value={parts["totalShots"]}
              onChange={handleChange}
              required
            />
          </div>

          {/* Customer Names */}
          <div className="flex flex-col ">
            <label className="block text-md font-medium text-black">
              Customer Names:
            </label>
            <Dropdown>
              <DropdownTrigger>
                <div className="w-full flex justify-between border border-gray-300 p-1 rounded cursor-pointer text-gray-500 text-sm">
                  {selectedCustomerNames
                    ? selectedCustomerNames.join(",")
                    : "Select Names"}
                  <ChevronDown />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={selectedCustomerNames}
                selectionMode="multiple"
                onSelectionChange={handleSelectCustomerName}
              >
                {customerNames.map((name, index) => (
                  <DropdownItem key={name} value={name}>
                    {name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <div>
              <p className="font-semibold text-xs">Selected Customers:</p>{" "}
              <p>{selectedCustomerNames.join(", ")}</p>
            </div> */}
          </div>

          {/* History of Parts */}
          <div className="flex flex-col ">
            <label className="block text-md font-medium text-black">
              History of Parts:
            </label>
            <Dropdown>
              <DropdownTrigger>
                <p className="w-full flex justify-between border border-gray-300 p-1 rounded cursor-pointer text-gray-500 text-sm">
                  {selectedParts ? selectedParts.join(",") : "Select Parts"}{" "}
                  <ChevronDown />
                </p>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={selectedParts}
                selectionMode="multiple"
                onSelectionChange={handleSelectParts}
              >
                {historyOfPart.map((name, index) => (
                  <DropdownItem key={name} value={name}>
                    {name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <div>
              <p className="font-semibold text-xs">Selected Parts:</p>{" "}
              <p>{selectedParts.join(", ")}</p>
            </div> */}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button type="submit" color="primary" className="w-full">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </PopupForm>
  );
};

export default EditForm;
