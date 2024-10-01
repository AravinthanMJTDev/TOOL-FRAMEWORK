import React, { useEffect, useState, useMemo } from "react";
import { UploadCloud, X, Image } from "lucide-react";
import { Button } from "@nextui-org/react";
import { usersDB } from "../../../Data/SettingsWorkOrderData/page";
import { UserDB } from "../types";
import PopupForm from "../../../PopUpFormTemplate/page";

interface EditFormProps {
  id: number;
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<UserDB[]>>;
}

const EditForm: React.FC<EditFormProps> = ({ id, onClose, setUsers }) => {
  const [user, setUser] = useState<UserDB | null>(null); // Initialize as null to avoid uncontrolled behavior
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
    <PopupForm onClose={onClose} title={"Edit User"}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Name:</label>
          <input
            id="name"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={user["name"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Employee ID:</label>
          <input
            id="employeeid"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={user["employeeid"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Department:</label>
          <select
            id="department"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={user.department}
            onChange={handleChange} // Now the handleChange will work properly
          >
            <option value="">Select Department</option>
            <option value="Admin">Admin</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Mobile No:</label>
          <input
            id="mobilenumber"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={user["mobilenumber"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Email:</label>
          <input
            id="email"
            type="email"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={user["email"]}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Photo:</label>
          <div className="w-2/3 flex flex-col space-y-2">
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
              <span className="text-blue-500">Upload Photo</span>
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

        {/* Signature Upload */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Signature:</label>
          <div className="w-2/3 flex flex-col space-y-2">
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
              <span className="text-blue-500">Upload Signature</span>
            </label>
            {signImagePreview && (
              <div className="relative">
                <img
                  src={signImagePreview}
                  alt="Preview"
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
