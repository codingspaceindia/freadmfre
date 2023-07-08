import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import NoFound from "../components/NoFound";
import Title from "../components/Title";
import axios from "../api/axios";

const headers = ["s.No", "refId", "Date", "amount", "message"];

const WithdrawReport = () => {
  const navigator = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("/user/getAcceptedWithdrawRequests");
        setReports(response.data.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [reports, setReports] = useState();

  if (initialLoading) return <p>Loading....</p>;

  return (
    <div className="h-screen overflow-auto">
      <Title title="Withdraw Report" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      {reports?.length === 0 ? (
        <NoFound />
      ) : (
        <div className="sm:m-5 overflow-auto">
          <table className="table-auto sm:p-5 w-full text-center">
            <thead className="bg-gray-800 text-white p-2">
              <tr>
                {headers?.map((header) => (
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
              {reports?.map((report, index) => (
                <tr key={report.id}>
                  <td className="hidden sm:h-20 sm:flex sm:items-center sm:justify-center h-full w-full py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {report["refId"]}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {report["requestedAt"]
                      ? new Date(report["requestedAt"]).toDateString()
                      : "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {Math.round(report["amount"]) || "-"}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {report["status"]}
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

export default WithdrawReport;
