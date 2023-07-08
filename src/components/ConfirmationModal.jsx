import React from "react";
import { MdDelete } from "react-icons/md";

const ConfirmModal = ({ yes, no, visible, loading }) => {
  if (!visible) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen" onClick={no}></div>
      <div className="w-72 bg-gray-300 shadow p-3 fixed top-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <MdDelete
          fontSize="1rem"
          className="flex items-center justify-center"
        />
        <h2>Are you sure?</h2>
        <p className="text-gray-500 text-sm">This action can't be undone.</p>
        <div className="flex gap-2 items-center justify-center mt-4">
          <button
            type="button"
            onClick={no}
            className="px-4 py-1 bg-white"
            disabled={loading}
          >
            No
          </button>
          <button
            onClick={yes}
            className="px-4 py-1 bg-blue-900 text-white"
            disabled={loading}
          >
            {loading ? "Loading" : "Yes"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
