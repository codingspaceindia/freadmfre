import React from "react";
import { FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ButtonGroup = ({ id }) => {
  return (
    <div className="p-2 flex items-center justify-center rounded">
      <div className="shadow p-2 flex items-center justify-center">
        <Link
          to={`/user-profile/${id}`}
          className="transform hover:scale-105 hover:text-yellow-500 mr-3 text-xs sm:text-sm md:text-md xl:text-xl"
        >
          <FiEye color="bg-yellow-500" />
        </Link>
        <Link
          to={`/bank-details/${id}`}
          className="transform hover:scale-105 hover:text-red-500 mr-3 text-xs sm:text-sm md:text-md xl:text-xl"
        >
          <RiBankLine color="bg-red-500" />
        </Link>
        <button className="transform hover:scale-105 hover:text-red-500 text-xs sm:text-sm md:text-md xl:text-xl">
          <MdDelete color="bg-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ButtonGroup;
