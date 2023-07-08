import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShrink, AiOutlineExpandAlt } from "react-icons/ai";

import logo from "../assets/logo.png";
import links from "../data/links";

const SideBar = ({ isShrink, handleShrink }) => {
  return (
    <nav className="col-span-1 p-5 shadow-md hidden lg:block relative" style={{ overflowY: "scroll" }}>
      <div className="w-full my-5">
        <div className="w-10 h-10 xl:w-20 xl:h-20 object-contain">
          <img src={logo} alt="logo" className="w-full" />
        </div>
      </div>
      <div className="flex flex-col">
        {links?.map(({ link, title, Icon }) => (
          <Link
            key={title}
            to={link}
            className={`font-semibold p-2 flex items-center justify-center lg:justify-start ${isShrink && "lg:justify-center"
              }`}
          >
            <Icon size="24" />
            <span
              className={`ml-4 text-sm hidden lg:block ${isShrink ? "lg:hidden" : "block"
                }`}
            >
              {title}
            </span>
          </Link>
        ))}
      </div>
      <button className="absolute bottom-15 right-3" onClick={handleShrink}>
        {!isShrink ? (
          <p className="bg-blue-900 text-white p-2 rounded transform hover:scale-95">
            <AiOutlineShrink size="32" />
          </p>
        ) : (
          <p className="bg-blue-900 text-white p-2 rounded transform hover:scale-95">
            <AiOutlineExpandAlt size="32" />
          </p>
        )}
      </button>
    </nav>
  );
};

export default SideBar;
