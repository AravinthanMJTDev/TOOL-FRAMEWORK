import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@nextui-org/react";
import { items } from "./Data";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { User } from "./page";

type PopupProps = {
  onClose: () => void;
  priorityColor: Record<string, string>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>; // Added setUsers
};

const Popup: React.FC<PopupProps> = ({ onClose, priorityColor, setUsers }) => {
  const [formData, setFormData] = useState({
    id: items.length + 1,
    name: "",
    email: "",
    status: "",
    priority: "100", // Default value for priority
    agent: "",
    role: "",
    subject: "",
    team: "",
    age: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, priority: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers((prevUsers) => [...prevUsers, formData]); // Update the items list with form data
    console.log("Form data submitted:", formData);
    onClose(); // Close the popup on submit
  };

  const capitalize = (str: string) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const priorityColorMapping: Record<number, string> = {
    100: "urgent",
    75: "high",
    50: "medium",
    25: "low",
  };

  const textColorMap: Record<string, string> = {
    urgent: "red",
    high: "orange",
    medium: "blue",
    low: "green",
  };

  const statusColor: Record<string, string> = {
    Recent: "success",
    Remaining: "warning",
    Responded: "primary",
    Overdue: "danger",
    Closed: "default",
  };

  const statusTextColor: Record<string, string> = {
    success: "green",
    warning: "orange",
    primary: "blue",
    danger: "red",
    default: "inherit",
  };

  const [selectedPriorityValue, setSelectedPriorityValue] = useState("100");
  const [selectedStatusValue, setSelectedStatusValue] = useState("");

  const handleChangeForPriorityTextColor = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPriorityValue(e.target.value);
    handlePriorityChange(e.target.value); // Update formData with selected priority
  };

  const handleChangeForStatusTextColor = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedStatusValue(e.target.value);
    console.log(e.target.value);
    handleStatusChange(e.target.value); // Update formData with selected status
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className=" bg-white p-8 rounded shadow-lg relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X />
        </button>
        <form onSubmit={handleSubmit}>
          {["name", "email", "agent"].map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                Enter the {capitalize(field)}:
              </label>
              <input
                id={field}
                type={field === "email" ? "email" : "text"}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                placeholder={`Enter ${field}`}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <div className="mt-2 space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0 ">
              <RadioGroup
                className="w-full"
                value={selectedStatusValue}
                onChange={handleChangeForStatusTextColor}
                orientation="horizontal"
              >
                {["Recent", "Responded", "Remaining", "Closed", "Overdue"].map(
                  (value) => (
                    <Radio key={value} value={value} color={statusColor[value]}>
                      <p
                        style={{
                          color:
                            selectedStatusValue === value
                              ? statusTextColor[statusColor[value]]
                              : "inherit", // Default color if not selected
                        }}
                      >
                        {value}
                      </p>
                    </Radio>
                  )
                )}
              </RadioGroup>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Priority:
            </label>
            <div className="mt-2 space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0 ">
              <RadioGroup
                className="w-full"
                value={selectedPriorityValue}
                onChange={handleChangeForPriorityTextColor}
                orientation="horizontal"
              >
                {[100, 75, 50, 25].map((value) => (
                  <Radio
                    key={value}
                    value={priorityColorMapping[value]}
                    color={priorityColor[priorityColorMapping[value]]}
                  >
                    <p
                      style={{
                        color:
                          selectedPriorityValue === priorityColorMapping[value]
                            ? textColorMap[priorityColorMapping[value]]
                            : "inherit", // Default color if not selected
                      }}
                    >
                      {capitalize(priorityColorMapping[value])}
                    </p>
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="md:w-1/2 md:mx-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
