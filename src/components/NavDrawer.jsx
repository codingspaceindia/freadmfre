import React from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import links from "../data/links";

const NavDrawer = ({ visible, onClose }) => {
  const navigate = useNavigate();

  if (!visible) return null;

  const handlePush = (link) => {
    navigate(link);
    onClose();
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen z-10"
        onClick={onClose}
      ></div>
      <nav
        className={`fixed top-0 left-0 w-64 p-5 shadow-md z-20 ${visible ? "block" : "hidden"
          } bg-white h-screen lg:hidden`}
        style={{ overflowY: "scroll" }}
      >
        <div className="flex justify-end">
          <MdClose size="24" onClick={onClose} />
        </div>
        <div className="w-full my-5">
          <div className="w-10 h-10 xl:w-20 xl:h-20 object-contain">
            <img src={logo} alt="logo" className="w-full" />
          </div>
        </div>
        <div className="flex flex-col">
          {links.map(({ link, title, Icon }) => (
            <div
              onClick={() => handlePush(link)}
              className="font-semibold p-2 flex items-center"
              key={link}
            >
              <Icon size="20" />
              <span className="ml-4 text-sm">{title}</span>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavDrawer;
