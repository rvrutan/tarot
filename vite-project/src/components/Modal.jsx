import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (

    <></>

    
    // <div
    //   className="fixed inset-0 flex items-center justify-center z-50 bg-green-600 bg-opacity-50 h-[500px] w-[200px]"
    //   onClick={onClose}
    // >
    //   <div
    //     className="relative modal modal-box border-8 h-[20px] bg-white p-6"
    //     onClick={(e) => e.stopPropagation()}
    //   >
    //     <button
    //       className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
    //       onClick={onClose}
    //     >
    //       &times;
    //     </button>
    //     {children}
    //   </div>
    // </div>
  );
}