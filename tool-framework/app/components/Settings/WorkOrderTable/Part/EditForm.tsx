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
  console.log(parts);
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
    console.log(namesArray);
    setSelectedCustomerNames(namesArray);
  };

  const handleSelectParts = (selectedKeys: Set<string>) => {
    const namesArray = Array.from(selectedKeys);
    console.log(namesArray);
    setSelectedParts(namesArray);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parts) {
      console.log("selectedCustomerNames", selectedCustomerNames);
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
      console.log("updatedPartsDB", updatedPartsDB);
      setParts(updatedPartsDB);
    }
    onClose();
  };
  console.log("Form data submitted:", parts);
  if (!parts) {
    return null; // Prevent rendering if parts is null (loading state)
  }

  return (
    <PopupForm onClose={onClose} title={"Edit Parts"}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Part No:</label>
          <input
            id="Part_No"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={parts["Part_No"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Name:</label>
          <input
            id="name"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={parts["name"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Manufacturing Date:</label>
          <input
            id="manufacturingDate"
            type="date"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={parts.manufacturingDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Opening Shots:</label>
          <input
            id="openingShots"
            type="number"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={parts["openingShots"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Total Shots:</label>
          <input
            id="totalShots"
            type="number"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={parts["totalShots"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Customer Names:</label>
          <div className="w-2/3 flex flex-col space-y-2">
            <Dropdown>
              <DropdownTrigger>
                <p className=" border border-gray-300 p-2 rounded">
                  Select Names
                </p>
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
            <div>
              <p className="font-semibold">Selected Customers:</p>{" "}
              {selectedCustomerNames.join(", ")}
            </div>
          </div>
        </div>
        {/* Historty  */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">History of Parts:</label>
          <div className="w-2/3 flex flex-col space-y-2">
            <Dropdown>
              <DropdownTrigger>
                <p className=" border border-gray-300 p-2 rounded">Parts</p>
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
            <div>
              <p className="font-semibold">Selected Parts:</p>{" "}
              {selectedParts.join(", ")}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" color="primary" className="w-full">
            Save Changes
          </Button>
        </div>
      </form>
    </PopupForm>
  );
};

export default EditForm;
