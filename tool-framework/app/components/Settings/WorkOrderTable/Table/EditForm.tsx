import React, { useEffect, useState, useMemo } from "react";
import { UploadCloud, X, Image, ChevronDown } from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usersDB, Departments } from "../../../Data/SettingsWorkOrderData/page";
import { UserDB } from "../types";
import PopupForm from "../../../PopUpFormTemplate/page";

interface EditFormProps {
  id: number;
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<UserDB[]>>;
}

const EditForm: React.FC<EditFormProps> = ({ id, onClose, setUsers }) => {
  const [user, setUser] = useState<UserDB | null>(null); // Initialize as null to avoid uncontrolled behavior
  const [departments, setDepartments] = useState([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user?.avatar);
  const [signImage, setSignImage] = useState<File | null>(null);
  const [signImagePreview, setSignImagePreview] = useState<string | null>(
    user?.sign
  );

  useEffect(() => {
    const foundUser = usersDB.find((userFromDb) => userFromDb.id === id);
    if (foundUser) {
      setUser(foundUser);
      setDepartments(Departments);
    } else {
      console.error("User not found");
    }
  }, [id]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updatedUsersDB = usersDB.map((existingUser) =>
        existingUser.id === id ? { ...existingUser, ...user } : existingUser
      );

      setUsers(updatedUsersDB); // This will update the parent component's state
      console.log("Form data submitted:", user);
      onClose(); // Close the form
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(imageURL);
      setUser((prev) => ({ ...prev, avatar: imageURL }));
    }
  };

  const handleSignImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSignImage(file);
      setSignImagePreview(imageURL);
      setUser((prev) => ({ ...prev, sign: imageURL }));
    }
  };
  const handleCancelImage = () => {
    setImage(null);
    setImagePreview(null);
    setUser((prev) => ({ ...prev, avatar: "" }));
  };

  const handleCancelSignImage = () => {
    setSignImage(null);
    setSignImagePreview(null);
    setUser((prev) => ({ ...prev, sign: "" }));
  };

  if (!user) {
    return null; // Prevent rendering if user is null (loading state)
  }

  return (
    <PopupForm title={"Edit User"} onClose={onClose}>
      <div className="max-h-[700px] overflow-y-auto">
        {" "}
        {/* Popup max height */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee ID */}
          <div className="mb-4">
            <label
              htmlFor="employeeid"
              className="block text-md font-medium text-gray-700"
            >
              Employee ID<span className="text-red-500"> *</span>
            </label>
            <input
              id="employeeid"
              type="text"
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500 text-sm"
              value={user["employeeid"]}
              onChange={handleChange}
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700"
            >
              Name<span className="text-red-500"> *</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500 text-sm"
              value={user["name"]}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email<span className="text-red-500"> *</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500 text-sm"
              value={user["email"]}
              onChange={handleChange}
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label
              htmlFor="mobilenumber"
              className="block text-md font-medium text-gray-700"
            >
              Mobile Number<span className="text-red-500"> *</span>
            </label>
            <input
              id="mobilenumber"
              type="text"
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500 text-sm"
              value={user["mobilenumber"]}
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-md font-medium text-gray-700"
            >
              Department<span className="text-red-500"> *</span>
            </label>
            <Dropdown>
              <DropdownTrigger>
                <div className="w-full flex p-1 border border-gray-300 rounded-md justify-between text-gray-500 text-sm">
                  {user["department"]} <ChevronDown />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) =>
                  setUser((prev) => ({
                    ...prev,
                    department: key.toString(),
                  }))
                }
              >
                {departments && departments.length > 0 ? (
                  departments.map((department) => (
                    <DropdownItem key={department} value={department}>
                      {department}
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem disabled>No departments available</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
          {/* Age */}
          {/* <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-md font-medium text-gray-700"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500 text-sm"
              value={user["age"]}
              onChange={handleChange}
            />
          </div> */}

          {/* Password */}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password<span className="text-red-500"> *</span>
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500 text-sm"
              value={user["password"]}
              onChange={handleChange}
            />
          </div>

          {/* Avatar */}
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-md font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex items-center space-x-2"
              >
                <UploadCloud size={24} className="text-blue-500" />
                <span className="text-blue-500 text-sm">Upload Photo</span>
              </label>
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={handleCancelImage}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Signature */}
          <div className="mb-4">
            <label
              htmlFor="sign"
              className="block text-md font-medium text-gray-700"
            >
              Signature
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="signUpload"
                type="file"
                accept="image/*"
                onChange={handleSignImageChange}
                className="hidden"
              />
              <label
                htmlFor="signUpload"
                className="cursor-pointer flex items-center space-x-2"
              >
                <Image size={24} className="text-blue-500" />
                <span className="text-blue-500 text-sm">Upload Signature</span>
              </label>
              {signImagePreview && (
                <div className="relative">
                  <img
                    src={signImagePreview}
                    alt="Signature Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={handleCancelSignImage}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <Button
              className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Edit
            </Button>
          </div>
        </form>
      </div>
    </PopupForm>
  );
};

export default EditForm;
