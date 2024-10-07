// "use client";
// import React, { useState } from "react";
// import {
//   Button,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@nextui-org/react";
// import PopupForm from "@/app/components/PopUpFormTemplate/page";
// import {
//   PartDataBase,
//   customerNames,
//   historyOfPart,
// } from "@/app/components/Data/SettingsWorkOrderData/page";
// import { partDB } from "../types";
// import { Dropdown } from "@nextui-org/react";

// const Part: React.FC = ({
//   onClose,
//   setparts,
// }: {
//   onClose: () => void;
//   setparts: React.Dispatch<React.SetStateAction<partDB[]>>;
// }) => {
//   const [formData, setFormData] = useState({
//     id: PartDataBase.length + 1,
//     Part_No: 0,
//     name: "",
//     manufacturingDate: "",
//     openingShots: 0,
//     totalShots: 0,
//     customerName: [], // This will hold the selected names
//     historyOfPart: "",
//     avgMeantimeBWFailure: "",
//     totalCost: 0,
//   });

//   const [selectedNames, setSelectedNames] = useState<string[]>([]);
//   const [selectedParts, setSelectedParts] = useState<string[]>([]);

//   const handleSelectName = (selectedKeys: Set<string>) => {
//     const namesArray = Array.from(selectedKeys); // Convert Set to Array
//     setSelectedNames(namesArray); // Update selected names
//     setFormData((prev) => ({ ...prev, customerName: namesArray })); // Update formData with selected names
//   };
//   const handleSelectPart = (selectedKeys: Set<string>) => {
//     const namesArray = Array.from(selectedKeys); // Convert Set to Array
//     setSelectedParts(namesArray); // Update selected names
//     setFormData((prev) => ({ ...prev, historyOfPart: namesArray })); // Update formData with selected names
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const updatedParts = [...PartDataBase, formData];
//     console.log(updatedParts);
//     setparts(updatedParts);
//     onClose();
//   };

//   return (
//     <PopupForm onClose={onClose} title={"New Part"}>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex items-center">
//           <label htmlFor="Part_No" className="w-1/3 text-right pr-4">
//             Part No:<span className="text-red-500"> *</span>
//           </label>
//           <input
//             id="Part_No"
//             type="number"
//             className="w-2/3 border border-gray-300 p-2 rounded"
//             value={formData.Part_No}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center">
//           <label htmlFor="name" className="w-1/3 text-right pr-4">
//             Name:<span className="text-red-500"> *</span>
//           </label>
//           <input
//             id="name"
//             type="text"
//             className="w-2/3 border border-gray-300 p-2 rounded"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center">
//           <label htmlFor="manufacturingDate" className="w-1/3 text-right pr-4">
//             Manufacturing Date:<span className="text-red-500"> *</span>
//           </label>
//           <input
//             id="manufacturingDate"
//             type="date"
//             className="w-2/3 border border-gray-300 p-2 rounded"
//             value={formData.manufacturingDate}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center">
//           <label htmlFor="openingShots" className="w-1/3 text-right pr-4">
//             Opening Shots:<span className="text-red-500"> *</span>
//           </label>
//           <input
//             id="openingShots"
//             type="number"
//             className="w-2/3 border border-gray-300 p-2 rounded"
//             value={formData.openingShots}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center">
//           <label htmlFor="totalShots" className="w-1/3 text-right pr-4">
//             Total Shots:<span className="text-red-500"> *</span>
//           </label>
//           <input
//             id="totalShots"
//             type="number"
//             className="w-2/3 border border-gray-300 p-2 rounded"
//             value={formData.totalShots}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center">
//           <label htmlFor="customerName" className="w-1/3 text-right pr-4">
//             Customer Names:
//           </label>
//           <Dropdown>
//             <DropdownTrigger>
//               <p className="w-2/3 border border-gray-300 p-2 rounded">
//                 Select Name
//               </p>
//             </DropdownTrigger>
//             <DropdownMenu
//               selectedKeys={selectedNames} //names as keys
//               selectionMode="multiple"
//               onSelectionChange={handleSelectName} // Handle selection change
//             >
//               {customerNames.map((name) => (
//                 <DropdownItem key={name} value={name}>
//                   {name}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//         </div>
//         <div className="flex items-center">
//           <label htmlFor="historyOfPart" className="w-1/3 text-right pr-4">
//             History of Part:<span className="text-red-500"> *</span>
//           </label>

//           <Dropdown>
//             <DropdownTrigger>
//               <p className="w-2/3 border border-gray-300 p-2 rounded">
//                 Select Part
//               </p>
//             </DropdownTrigger>
//             <DropdownMenu
//               selectedKeys={selectedParts} //names as keys
//               selectionMode="multiple"
//               onSelectionChange={handleSelectPart} // Handle selection change
//             >
//               {historyOfPart.map((name) => (
//                 <DropdownItem key={name} value={name}>
//                   {name}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//         </div>
//         <div className="flex items-center">
//           <label
//             htmlFor="avgMeantimeBWFailure"
//             className="w-1/3 text-right pr-4"
//           >
//             Avg Meantime B/W Failure:<span className="text-red-500"> *</span>
//           </label>
//           <input
//             id="avgMeantimeBWFailure"
//             type="text"
//             className="w-2/3 border border-gray-300 p-2 rounded"
//             value={formData.avgMeantimeBWFailure}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center">
//           <label htmlFor="totalCost" className="w-1/3 text-right pr-4">
//             Total Cost:<span className="text-red-500"> *</span>
//           </label>
//           <input
//             id="totalCost"
//             type="number"
//             className="w-2/3 border border-gray-300 p-2 rounded"
//             value={formData.totalCost}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex justify-center space-x-4">
//           <Button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded"
//           >
//             Add
//           </Button>
//         </div>
//       </form>
//     </PopupForm>
//   );
// };

// export default Part;
