import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Image, UploadCloud } from "lucide-react"; // Icon from lucide-react
import { usersDB } from "../../../Data/SettingsWorkOrderData/page";
import { User } from "../Table/page";
import PopUpForm from "../../../PopUpFormTemplate/page";

type PopupProps = {
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const Popup: React.FC<PopupProps> = ({ onClose, setUsers }) => {
  const [formData, setFormData] = useState({
    id: usersDB.length + 1,
    employeeid: "",
    name: "",
    email: "",
    mobilenumber: "",
    sign: "",
    department: "",
    age: "",
    avatar: "",
    password: "",
    rePassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true); // State to track if passwords match
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [signImage, setSignImage] = useState<File | null>(null);
  const [signImagePreview, setSignImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(imageURL);
      setFormData((prev) => ({ ...prev, avatar: imageURL }));
    }
  };

  const handleSignImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSignImage(file);
      setSignImagePreview(imageURL);
      setFormData((prev) => ({ ...prev, sign: imageURL }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Check if passwords match in real-time
    if (id === "password" || id === "rePassword") {
      setPasswordMatch(
        id === "password"
          ? value === formData.rePassword
          : value === formData.password
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }
    setUsers((prevUsers) => [...prevUsers, formData]);
    usersDB.push(formData);
    onClose();
  };

  const handleCancelImage = () => {
    setImage(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, avatar: "" }));
  };

  const handleCancelSignImage = () => {
    setSignImage(null);
    setSignImagePreview(null);
    setFormData((prev) => ({ ...prev, sign: "" }));
  };

  return (
    <PopUpForm onClose={onClose} title={"Add User"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
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
        {/* Employee ID */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Employee ID:<span className="text-red-500"> *</span>
          </label>
          <input
            id="employeeid"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.employeeid}
            onChange={handleChange}
            required
          />
        </div>{" "}
        {/* Department No */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Department:<span className="text-red-500"> *</span>
          </label>

          <select
            id="department"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.department}
            onChange={handleChange} // Now the handleChange will work properly
            required
          >
            <option value="">Select Department</option>
            <option value="Admin">Admin</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </div>
        {/* Mobile No */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Mobile No:<span className="text-red-500"> *</span>
          </label>
          <input
            id="mobilenumber"
            type="text"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.mobilenumber}
            onChange={handleChange}
            required
          />
        </div>
        {/* Email */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Email:<span className="text-red-500"> *</span>
          </label>
          <input
            id="email"
            type="email"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password Field */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Password:<span className="text-red-500"> *</span>
          </label>
          <input
            id="password"
            type="password"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Re-enter Password */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Re-enter Password:<span className="text-red-500"> *</span>
          </label>
          <input
            id="rePassword"
            type="password"
            className="w-2/3 border border-gray-300 p-2 rounded"
            value={formData.rePassword}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password Match Warning */}
        {!passwordMatch && (
          <div className="text-red-500 text-center">
            Passwords do not match!
          </div>
        )}
        {/* Image Upload */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Photo:<span className="text-red-500"> *</span>
          </label>
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
          <label className="w-1/3 text-right pr-4">
            Signature:<span className="text-red-500"> *</span>
          </label>
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
        {/* Submit and Close */}
        <div className="flex justify-center space-x-4">
          <Button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit
          </Button>
          <Button
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-2 rounded"
          >
            Close
          </Button>
        </div>
      </form>
    </PopUpForm>
  );
};

export default Popup;
