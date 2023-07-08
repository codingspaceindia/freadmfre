import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Title from "../components/Title";
import axios from "../api/axios";
import {
  setFailure,
  setSuccess,
  removeSuccess,
  removeFailure,
} from "../store/actions/notify.actions";

const ChangeAmount = () => {
  const [entry, setEntry] = useState({
    perDollar: "",
    freeCoin: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigator = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      dispatch(removeFailure());
      e.preventDefault();
      const response = await axios.post("/user/dailyprice/change", {
        perDollar: entry.perDollar,
        cost: Number(entry.freeCoin),
      });
      if (response.data.data) {
        dispatch(setSuccess("Free coin Amount Changed"));
        setTimeout(() => {
          dispatch(removeSuccess());
        });
      }
    } catch (err) {
      dispatch(setFailure(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Title title="ChangeAmount" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      <form onSubmit={handleSubmit} className="bg-white m-5 p-5">
        <div className="flex flex-col mb-3">
          <label className="text-sm mb-2">Free Coin Price</label>
          <input
            type="number"
            className="bg-gray-200 px-4 py-2 rounded focus:border-black"
            name="freeCoin"
            value={entry.freeCoin}
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex flex-col mb-3">
          <label className="text-sm mb-2">Per Dollar Price</label>
          <input
            type="number"
            className="bg-gray-200 px-4 py-2 rounded focus:border-black"
            value={entry.perDollar}
            name="perDollar"
            onChange={handleChange}
          />
        </div> */}
        <button
          type="submit"
          className="text-white bg-blue-600 px-4 py-2 mt-5 rounded"
        >
          {isLoading ? "Loading" : "Change"}
        </button>
      </form>
    </>
  );
};

export default ChangeAmount;
