import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";

import axios from "../api/axios";
import Title from "../components/Title";
import NoFound from "../components/NoFound";
import AcceptORReject from "../components/AcceptORReject";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmationModal";

const headers = ["S.No", "User ID", "Requested At", "Amount", "View", "Action"];

const StackingRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [selectedId, setSelectedId] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/user/getTopupRequests");
        setRequests(response.data.data);
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
      const selectedRequest = requests.find((req) => req.id === selectedId);
      const response = await axios.put(
        "/user/acceptTopupRequest",
        selectedRequest
      );
      if (response.status === 200)
        setRequests(requests.filter((req) => req.id !== selectedId));
      handleAcceptModal();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      const selectedRequest = requests.find((req) => req.id === selectedId);
      const response = await axios.put(
        "/user/rejectTopupRequest",
        selectedRequest
      );
      if (response.status === 200)
        setRequests(requests.filter((req) => req.id !== selectedId));
      handleRejectModal();
      setLoading(false);
    } catch (error) {
      console.error(error);
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
    <div className="overflow-auto">
      {loading && (
        <>
          <div className="fixed top-0 left-0 bg-black bg-opacity-25 w-screen h-screen"></div>
          <p>Loading...</p>
        </>
      )}
      <Title title="Stacking Request" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      {requests.length === 0 ? (
        <NoFound message="No Requests" />
      ) : (
        <div className="sm:m-5">
          <table className="table-auto sm:p-5 w-full text-center">
            <thead className="bg-gray-800 text-white p-2">
              <tr>
                {headers.map((header) => (
                  <th
                    className={`py-2 sm:p-4 capitalize text-xs sm:text-sm md:text-lg ${
                      header === "S.No" ? "hidden sm:block" : ""
                    }`}
                    key={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests?.map((request, index) => (
                <tr key={request._id}>
                  <td className="hidden sm:flex sm:item-center sm:justify-center py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {request["refId"]}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {new Date(request["requestedAt"]).toDateString() || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    {request["amount"] || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg flex items-center justify-center h-20 transform hover:scale-105">
                    <Link to={`/view-image/${request.id}`}>
                      <FaEye />
                    </Link>
                  </td>
                  <td className="py-1 sm:p-2 text-xs sm:text-sm md:text-lg">
                    <AcceptORReject
                      handleAccept={() => handleAcceptModal(request.id)}
                      handleReject={() => handleRejectModal(request.id)}
                      loading={loading}
                    />
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
      />
      <ConfirmModal
        visible={isOpenRejectModal}
        yes={handleReject}
        no={handleRejectModal}
      />
    </div>
  );
};

export default StackingRequest;
