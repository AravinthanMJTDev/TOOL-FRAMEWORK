import { X } from "lucide-react";
import { ReactNode } from "react";

const PopupForm = ({
  onClose,
  children,
  title,
}: {
  onClose?: () => void;
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
      <div className=" bg-white p-8 rounded shadow-lg   ">
        <div className="relative bg-blue-600 text-white py-3 mt-5 text-center text-lg mb-4 font-semibold">
          {" "}
          {title}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
export default PopupForm;
