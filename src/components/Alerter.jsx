import React from "react";
import { MdClear } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeFailure, removeSuccess } from "../store/actions/notify.actions";

const Alerter = ({ message, visible, type }) => {
  const dispatch = useDispatch();

  if (!visible) return null;

  const handleClose = () => {
    if (type === "error") dispatch(removeFailure());
    else if (type === "success") dispatch(removeSuccess());
  };

  return (
    <div className="message-container">
      <div className="wrapper">
        <p
          className={`message ${
            type === "success"
              ? "message-success"
              : type === "error"
              ? "message-error"
              : ""
          }`}
        >
          <span>{message}</span>
        </p>
        <p className="close" onClick={handleClose}>
          <MdClear />
        </p>
      </div>
    </div>
  );
};

export default Alerter;
