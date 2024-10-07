import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronDown, Image, UploadCloud, X } from "lucide-react";
// Importing Icons
import React, { useEffect, useState } from "react";
import { usersDB, Departments } from "../../../Data/SettingsWorkOrderData/page";
import { User } from "../Table/page";
import PopUpForm from "../../../PopUpFormTemplate/page";

interface AddUserProps {
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddUser: React.FC<AddUserProps> = ({ onClose, setUsers }) => {
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
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [signImage, setSignImage] = useState<File | null>(null);
  const [signImagePreview, setSignImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setDepartments(Departments);
  }, []);
  console.log(departments);
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
    // if (id === "password" || id === "rePassword") {
    //   setPasswordMatch(
    //     id === "password"
    //       ? value === formData.rePassword
    //       : value === formData.password
    //   );
    // }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.employeeid) newErrors.employeeid = "Employee ID is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.mobilenumber)
      newErrors.mobilenumber = "Mobile number is required.";
    if (!formData.email) newErrors.email = "Email is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
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
    <PopUpForm title={"Create User"} onClose={onClose}>
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
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500"
              value={formData.employeeid}
              onChange={handleChange}
            />
            {errors.employeeid && (
              <p className="text-red-500 text-md">{errors.employeeid}</p>
            )}
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
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-md">{errors.name}</p>
            )}
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
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-md">{errors.email}</p>
            )}
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
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500"
              value={formData.mobilenumber}
              onChange={handleChange}
            />
            {errors.mobilenumber && (
              <p className="text-red-500 text-md">{errors.mobilenumber}</p>
            )}
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
                <div className="w-full flex p-1 border border-gray-300 rounded-md justify-between text-gray-500">
                  {formData.department} <ChevronDown />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) =>
                  setFormData((prev) => ({
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
              className="w-full p-1 border border-gray-300 rounded-md"
              value={formData.age}
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
              className="w-full p-1 border border-gray-300 rounded-md text-gray-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Re-Enter Password */}
          {/* <div className="mb-4">
            <label
              htmlFor="rePassword"
              className="block text-md font-medium text-gray-700"
            >
              Re-Enter Password<span className="text-red-500"> *</span>
            </label>
            <input
              id="rePassword"
              type="password"
              className="w-full p-1 border border-gray-300 rounded-md"
              value={formData.rePassword}
              onChange={handleChange}
            />
            {errors.rePassword && (
              <p className="text-red-500 text-md">{errors.rePassword}</p>
            )}
          </div> */}

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
      {/* </div> */}
      {/* </div> */}
    </PopUpForm>
  );
};

export default AddUser;
