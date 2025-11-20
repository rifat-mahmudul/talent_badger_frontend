import { X } from "lucide-react";
import React from "react";

interface PropsTypes {
  onClose: (value: boolean) => void;
}

const DetailsProjectModal = ({ onClose }: PropsTypes) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div
        onClick={() => onClose(false)}
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      ></div>

      {/* Modal container */}
      <div className="relative bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto p-8">
        <div className="text-end">
          <button onClick={() => onClose(false)}>
            <X />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-medium">Project Name</h2>
            <p className="text-gray-600 mt-2">E-commerce API Integration</p>
          </div>

          <div>
            <h2 className="text-xl font-medium">Client/Team</h2>
            <p className="text-gray-600 mt-2">Global Retail Inc.</p>
          </div>

          <div>
            <h2 className="text-xl font-medium">Range</h2>
            <p className="text-gray-600 mt-2">$1,200</p>
          </div>

          <div className="flex items-start justify-between lg:w-[80%]">
            <div>
              <h2 className="text-xl font-medium">Start Date</h2>
              <p className="text-gray-600 mt-2">Aug 15, 2023</p>
            </div>

            <div>
              <h2 className="text-xl font-medium">Delivery Date</h2>
              <p className="text-gray-600 mt-2">Oct 30, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProjectModal;
