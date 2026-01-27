import React from "react";

function ConfirmModal({ open, title, message, onConfirm ,onClose}) {
  if (!open) return null;


  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="overlay">
            <div className="p-6 rounded-lg shadow-lg bg-bg-light dark:bg-bg-dark w-96">
              <h2 className="mb-4 text-xl font-semibold">{title}</h2>
              <p className="mb-6">{message}</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default ConfirmModal;
