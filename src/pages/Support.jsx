import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import NoFound from "../components/NoFound";
import Title from "../components/Title";
import { TiTick } from "react-icons/ti";

const headers = ["S.no", "user Id", "phoneNumber", "Message", "Status"];

function Support() {
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [messages, setMessages] = useState([]);
  // const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const response = await axios.get("/user/getUnprocessedSupportRecords");
        setMessages(response.data.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSupportMessages();
  }, []);

  const handleaccept = async (id = "") => {
    setSelectedId(id);
    try {
      const updatedRequest = messages.find((req) => req.id === selectedId);
      const accept = await axios.put("/user/supportRecord/accept", {
        updatedRequest,
      });
      console.log(accept);

    } catch (err) {
      console.error(err);
    }

  };

  if (loading) return <p>Loading....</p>;

  return (
    <div className="overflow-auto">
      <Title title="Supports" />
      {messages?.length === 0 ? (
        <NoFound message="No Messages" />
      ) : (
        <div className="sm:m-5 overflow-auto">
          <table className="table-auto sm:p-5 w-full text-center">
            <thead className="bg-gray-800 text-white p-2">
              <tr>
                {headers.map((header) => (
                  <th
                    className={`py-2 sm:p-4 capitalize text-xs sm:text-sm md:text-lg ${header === "s.No" || header === "username"
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
              {messages?.map((request, index) => (
                <tr key={request.id}>
                  <td className="hidden sm:h-20 sm:flex sm:items-center sm:justify-center h-full w-full py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {request["userId"]}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {request["phoneNumber"]}
                  </td>
                  <td className=" py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {request["supportMessage"] || "-"}
                  </td>
                  <td className=" py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <TiTick
                      onClick={() => handleaccept(request.id)}
                    />
                  </td>
                  {/* <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <div className="p-2 flex items-center justify-center rounded">
                      <div className="shadow p-2 flex items-center justify-center">
                        <button
                          className="transform hover:scale-105 hover:text-yellow-500 mr-3 text-xs sm:text-sm md:text-md xl:text-xl"
                          onClick={() => handleAcceptModal(request.id)}
                        >
                          <TiTick color="bg-yellow-500" />
                        </button>
                        <button
                          className="transform hover:scale-105 hover:text-red-500 text-xs sm:text-sm md:text-md xl:text-xl"
                          onClick={() => handleRejectModal(request.id)}
                        >
                          <MdClear color="bg-red-500" />
                        </button>
                      </div>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Support;
