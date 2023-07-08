import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import NoFound from "../components/NoFound";
import Title from "../components/Title";
import {
  setFailure,
  setSuccess,
  removeFailure,
  removeSuccess,
} from "../store/actions/notify.actions";
import axios from "../api/axios";

const headers = ["S.No", "User ID", "Username", "Password", "Send"];

const MessageCenter = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  const navigator = useNavigate();
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/get/auth");
        setUsers(response.data.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSendMail = async (id) => {
    try {
      dispatch(removeFailure());
      const user = users.find((user) => user.id === id);

      const response = await axios.post("/send-welcome-mail", {
        refId: user.refId,
        email: user.email,
        password: user.password,
      });

      if (response.status === 200) {
        dispatch(setSuccess("Mail Sent"));
        setTimeout(() => dispatch(removeSuccess()), 3000);
      }
    } catch (err) {
      dispatch(setFailure(err.message));
    }
  };

  const filteredUser = (users) => {
    let regex = new RegExp(search?.trim(), "gi");
    return search.trim()
      ? users.filter((user) => regex.test(user.refId))
      : users;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (initialLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-auto">
      <Title title="Message Center" />
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
      {filteredUser(users)?.length === 0 ? (
        <NoFound message="No Messages" />
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
              {filteredUser(users)?.map((user, index) => (
                <tr key={user.id}>
                  <td className="hidden sm:flex sm:item-center sm:justify-center py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {user["refId"]}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {user["name"] || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {user["password"] || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    <button
                      type="button"
                      className="bg-yellow-400 rounded text-black px-4 py-2 text-xs sm:text-sm md:text-lg"
                      onClick={() => handleSendMail(user.id)}
                    >
                      Send
                    </button>
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

export default MessageCenter;
