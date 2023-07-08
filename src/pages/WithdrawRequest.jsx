import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import NoFound from "../components/NoFound";
import Title from "../components/Title";
import { constant } from "../api/ApiConstant";
import ConfirmModal from "../components/ConfirmationModal";

const headers = [
  "s.No",
  "user Id",
  // "Wallet Type",
  "currency Type",
  "amount",
  "actions",
];

const filtered = (values) => {
  return values.filter((val) => val.status === "P");
};

const WithdrawRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await axios.get(`${constant.withdraw}`);
        setRequests(result.data.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async () => {
    try {
      setLoading(true);
      const updatedRequest = requests.find((req) => req.id === selectedId);
      const response = await axios.put("/user/acceptWithdrawRequest", {
        ...updatedRequest,
        status: "A",
      });
      if (response.status === 200) {
        setRequests(
          requests.map((request) =>
            request.id === selectedId
              ? {
                  ...updatedRequest,
                  status: "A",
                }
              : request
          )
        );
      }
      handleAcceptModal();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const handleReject = async () => {
    try {
      setLoading(true);
      const updatedRequest = requests.find((req) => req.id === selectedId);
      setRequests(
        requests.map((request) =>
          request.id === selectedId
            ? {
                ...updatedRequest,
                status: "R",
              }
            : request
        )
      );
      const response = await axios.put("user/rejectWithdrawRequest", {
        ...updatedRequest,
        status: "R",
      });
      if (response.status === 200) {
        setRequests(
          requests.map((request) =>
            request.id === selectedId
              ? {
                  ...updatedRequest,
                  status: "R",
                }
              : request
          )
        );
      }
      handleRejectModal();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAcceptModal = (id = "") => {
    setSelectedId(id);
    setIsOpenAcceptModal(!isOpenAcceptModal);
  };
  const handleRejectModal = (id = "") => {
    setSelectedId(id);
    setIsOpenRejectModal(!isOpenRejectModal);
  };

  if (initialLoading) return <p>Loading...</p>;

  return (
    <>
      <Title title="Withdraw Request" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigate(-1)}
      >
        back
      </button>
      {filtered(requests)?.length === 0 ? (
        <NoFound message="No Withdraw Requests" />
      ) : (
        <div className="sm:m-5 overflow-auto">
          <table className="table-auto sm:p-5 w-full text-center">
            <thead className="bg-gray-800 text-white p-2">
              <tr>
                {headers.map((header) => (
                  <th
                    className={`py-2 sm:p-4 capitalize text-xs sm:text-sm md:text-lg ${
                      header === "s.No" || header === "username"
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
              {filtered(requests)?.map((request, index) => (
                <tr key={request.id}>
                  <td className="hidden sm:h-20 sm:flex sm:items-center sm:justify-center h-full w-full py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {request["refId"]}
                  </td>
                  <td className=" py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {request["currencyType"] || "-"}
                  </td>
                  <td className=" py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {request["amount"] || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmModal
        visible={isOpenAcceptModal}
        yes={handleAccept}
        no={handleAcceptModal}
        loading={loading}
      />
      <ConfirmModal
        visible={isOpenRejectModal}
        yes={handleReject}
        no={handleRejectModal}
        loading={loading}
      />
    </>
  );
};

export default WithdrawRequest;
