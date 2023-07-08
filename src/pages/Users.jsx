import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import ButtonGroup from "../components/ButtonGroup";
import NoFound from "../components/NoFound";
import Title from "../components/Title";
import { removeFailure, setFailure } from "../store/actions/notify.actions";
import { FETCHED_USERS, selectUsers } from "../store/reducers/user.reducer";
import axios from "../api/axios";
// import { fetchUsers } from "../store/actions/user.action";

const headers = [
  "s.No",
  "user ID",
  "username",
  "Ref Name",
  "Ref Id",
  // "Placement Id",
  "actions",
];

const Users = () => {
  const [search, setSearch] = useState("");

  const users = useSelector((state) => selectUsers(state));
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      dispatch(removeFailure());
      setLoading(true);
      const response = await axios.get("/user/get");
      dispatch(FETCHED_USERS(response.data.data));
    } catch (err) {
      dispatch(setFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!users || users.length === 0) fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const filteredUser = (users) => {
    let regex = new RegExp(search?.trim(), "gi");
    return search.trim()
      ? users.filter((user) => regex.test(user.refId))
      : users;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-auto">
      <Title title="Active Users" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigate(-1)}
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
      <p className="px-3 sm:px-5 mb-4">Results: {filteredUser(users).length}</p>
      {filteredUser(users).length === 0 ? (
        <NoFound />
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
              {filteredUser(users).map((user, index) => (
                <tr key={user.id}>
                  <td className="hidden sm:h-20 sm:flex sm:items-center sm:justify-center h-full w-full py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user["refId"]}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user["name"] || "-"}
                  </td>
                  <td className="hidden sm:flex sm:item-center sm:justify-center py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user["nameOfParent"] || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user["parentRefId"] || "-"}
                  </td>
                  {/* <td className="hidden sm:flex sm:item-center sm:justify-center py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user["placementRefId"] || "-"}
                  </td> */}
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <ButtonGroup id={user.id} />
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

export default Users;
