import React from "react";
import { MdClear } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const AcceptORReject = ({ handleAccept, handleReject, loading }) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex items-center justify-center p-2">
        <button
          type="button"
          onClick={handleAccept}
          className="text-xl  mr-4 text-green-500 rounded border-2 sm:border-gray-300 sm:p-2"
          disabled={loading}
        >
          <TiTick size="24" />
        </button>
        <button
          type="button"
          onClick={handleReject}
          className="text-red-500 border-2 sm:border-gray-300 sm:p-2 rounded"
          disabled={loading}
        >
          <MdClear size="24" />
        </button>
      </div>
    </div>
  );
};

export default AcceptORReject;
