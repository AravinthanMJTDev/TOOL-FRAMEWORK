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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className=" relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6  ">
        <div className="relative w-full text-2xl font-bold text-gray-800 text-center mb-6">
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
