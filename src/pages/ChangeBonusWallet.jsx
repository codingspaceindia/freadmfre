import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import Title from "../components/Title";
import axios from "../api/axios";
import {
  setFailure,
  setSuccess,
  removeSuccess,
} from "../store/actions/notify.actions";

const ChangeBonusWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const { id } = useParams();

  const [bonusWallet, setBonusWallet] = useState();
  const [wallet, setWallet] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await axios.get("/user/getUserAvailableBalance");
        setWallet(response.data.data.find((wallet) => wallet.userId === id));
      } catch (error) {
        console.error(error.message);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchWallets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!bonusWallet)
        return dispatch(setFailure("Please enter change amount"));

      const response = await axios.put(
        `user/setUserAvailableBalance/${id}/${bonusWallet}`,
        {}
      );
      if (response.data.data) {
        dispatch(setSuccess("Amount Changed"));
        setTimeout(() => {
          dispatch(removeSuccess());
          navigator("/bonus-wallet");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) return <p>Loading...</p>;

  return (
    <>
      <Title title="ChangeAmount" />
      <button
        className="py-1 px-3 mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      <form onSubmit={handleSubmit} className="bg-white m-5 p-5">
        <div className="flex flex-col mb-3">
          <label className="text-sm mb-2">Ref Id</label>
          <p className="bg-gray-200 px-4 py-2 rounded focus:border-black">
            {wallet?.refId}
          </p>
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-sm mb-2">Current Bonus Wallet Amount</label>
          <p className="bg-gray-200 px-4 py-2 rounded focus:border-black">
            {wallet?.availableBalance}
          </p>
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-sm mb-2">Change To</label>
          <input
            type="number"
            className="bg-gray-200 px-4 py-2 rounded focus:border-black"
            value={bonusWallet}
            onChange={(e) => setBonusWallet(e.target.value)}
          />
        </div>
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

export default ChangeBonusWallet;
