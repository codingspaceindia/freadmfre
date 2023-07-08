import React from "react";
import { FiMenu, FiPower } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { logout } from "../store/actions/auth.actions";

const TopBar = ({ handleModal }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  return (
    <div className="flex items-center justify-between lg:justify-end p-5">
      <button
        type="button"
        onClick={handleModal}
        className="bg-blue-900 text-white p-2 rounded block lg:hidden"
      >
        <FiMenu size="24" />
      </button>
      <button
        type="button"
        className="bg-red-500 text-white rounded-full p-2"
        onClick={handleLogout}
      >
        <FiPower size="24" />
      </button>
    </div>
  );
};

export default TopBar;
