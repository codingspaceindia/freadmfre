import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import NoFound from "../components/NoFound";
import Title from "../components/Title";
import { selectUsers } from "../store/reducers/user.reducer";
import axios from "../api/axios";

const headers = ["s.No", "User ID", "Username", "Ref Id", "investment"];

const TotalInvestment = () => {
  const users = useSelector((state) => selectUsers(state));

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredUser = (users) => {
    let regex = new RegExp(search?.trim(), "gi");
    return search.trim()
      ? users.filter((user) => regex.test(user.refId))
      : users;
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchTotalInvestment = async () => {
      try {
        const response = await axios.get("/user/getBusinessRecords");
        if (response.data) {
          let values = [];
          for (let user of users) {
            const investment = response.data.data.find(
              (investment) => investment.userId === user.id
            );
            values.push({
              refId: user.refId,
              name: user.name,
              parentRefId: user.parentRefId,
              totalTopupAmount: investment?.totalStacking,
            });
          }
          setInvestments(values);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalInvestment();
  });

  const [investments, setInvestments] = useState([]);

  const navigator = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-auto">
      <Title title="Total Investment" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      <form onSubmit={handleSubmit} className="sm:m-10 m-2">
        <input
          type="text"
          placeholder="Search with UserId"
          className="p-2 px-4 border-2 border-gray-400 outline-none w-48 sm:w-96 bg-white shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
      {filteredUser(investments)?.length === 0 ? (
        <NoFound message="No Investment Histories" />
      ) : (
        <div className="sm:m-5 overflow-auto">
          <table className="table-auto sm:p-5 w-full text-center">
            <thead className="bg-gray-800 text-white p-2">
              <tr>
                {headers.map((header) => (
                  <th
                    className={`py-2 sm:p-4 capitalize text-xs sm:text-sm md:text-lg ${
                      header === "s.No" || header === "PlacementId"
                        ? "hidden sm:block"
                        : ""
                    } ${header === "RefName" ? "hidden sm:block" : ""}`}
                    key={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUser(investments)?.map((investment, index) => (
                <tr key={index}>
                  <td className="hidden sm:h-20 sm:flex sm:items-center sm:justify-center h-full w-full py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {investment["refId"]}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {investment["name"] || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {investment["parentRefId"] || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {investment["totalTopupAmount"]}
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

export default TotalInvestment;
