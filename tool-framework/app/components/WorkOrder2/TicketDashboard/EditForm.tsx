import React, { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@nextui-org/react";
import { TicketDashboardProps } from "./types";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { items } from "./Data";

interface EditFormProps {
  id: number;
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<TicketDashboardProps[]>>;
}

const EditForm: React.FC<EditFormProps> = ({ id, onClose, setUsers }) => {
  const [user, setUser] = useState<TicketDashboardProps | undefined>(undefined);

  useEffect(() => {
    const foundUser = items.find((itemFromDb) => itemFromDb.id === id);
    if (foundUser) {
      setUser(foundUser);
    } else {
      console.error("User not found");
    }
  }, [id]);

  const priorityColorMapping: Record<number, string> = useMemo(
    () => ({
      100: "urgent",
      75: "high",
      50: "medium",
      25: "low",
    }),
    []
  );

  const statusColor: Record<string, string> = useMemo(
    () => ({
      Recent: "success",
      Remaining: "warning",
      Responded: "primary",
      Overdue: "danger",
      Closed: "default",
    }),
    []
  );

  const statusTextColor: Record<string, string> = useMemo(
    () => ({
      success: "green",
      warning: "orange",
      primary: "blue",
      danger: "red",
      default: "inherit",
    }),
    []
  );
  type Colors =
    | "success"
    | "warning"
    | "primary"
    | "danger"
    | "default"
    | "secondary";
  const priorityColor: Record<string, Colors> = useMemo(
    () => ({
      urgent: "danger",
      high: "warning",
      medium: "primary",
      low: "success",
    }),
    []
  );

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUser((prev) => (prev ? { ...prev, priority: value } : undefined));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUser((prev) => (prev ? { ...prev, status: value } : undefined));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => (prev ? { ...prev, [id]: value } : undefined));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updateditems = items.map((existingUser) =>
        existingUser.id === id ? { ...existingUser, ...user } : existingUser
      );

      setUsers(updateditems); // This will update the parent component's state
      console.log("Form data submitted:", user);
      onClose(); // Close the form
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X />
        </button>
        <form onSubmit={handleSubmit}>
          {["name", "email", "agent", "subject", "age", "team", "role"].map(
            (field) => (
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
                  value={user?.[field] || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            )
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <RadioGroup
              className="w-full"
              value={user?.status}
              onChange={handleStatusChange}
              orientation="horizontal"
            >
              {["Recent", "Responded", "Remaining", "Closed", "Overdue"].map(
                (value) => (
                  <Radio key={value} value={value} color={statusColor[value]}>
                    <p
                      style={{
                        color:
                          user.status === value
                            ? statusTextColor[statusColor[value]]
                            : "inherit",
                      }}
                    >
                      {value}
                    </p>
                  </Radio>
                )
              )}
            </RadioGroup>
          </div>

          <div className="mt-6">
            <Button type="submit" color="primary" className="w-full">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
