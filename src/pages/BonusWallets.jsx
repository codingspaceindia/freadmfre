import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../api/axios";
import NoFound from "../components/NoFound";
import Title from "../components/Title";

const headers = ["s.No", "User Id", "Name", "Bonus Wallet Amount", "send"];

const BonusWallets = () => {
  const [wallets, setWallets] = useState();

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await axios.get("/user/getUserAvailableBalance");
        setWallets(response.data.data);
      } catch (error) {
      } finally {
        setInitialLoading(false);
      }
    };
    fetchWallets();
  }, []);

  if (initialLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-auto">
      <Title title="Bonus Wallet" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      {wallets?.length === 0 ? (
        <NoFound message="No Wallets" />
      ) : (
        <div className="sm:m-5">
          <table className="table-auto sm:p-5 w-full text-center">
            <thead className="bg-gray-800 text-white p-2">
              <tr>
                {headers.map((header) => (
                  <th
                    className={`py-2 sm:p-4 capitalize text-xs sm:text-sm md:text-lg ${
                      header === "s.No" ? "hidden sm:block" : ""
                    }`}
                    key={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wallets?.map((wallet, index) => (
                <tr key={wallet._id}>
                  <td className="hidden sm:flex sm:item-center sm:justify-center py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {wallet["refId"]}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {wallet["name"] || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {wallet["availableBalance"]}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    <Link
                      to={`/bonus-wallet/${wallet.userId}`}
                      type="button"
                      className="bg-yellow-400 rounded text-black px-4 py-2 text-xs sm:text-sm md:text-lg"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BonusWallets;
