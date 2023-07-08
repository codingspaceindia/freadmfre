import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import NoFound from "../components/NoFound";
import Table from "../components/Table";
import Title from "../components/Title";

const headers = [
  "s.No",
  "refId",
  "userName",
  "token id",
  "requested date",
  "approved date",
];

const FreeCoinReport = () => {
  const navigator = useNavigate();

  const [reports, setReports] = useState([]);

  useEffect(() => setReports([]), []);

  return (
    <>
      <Title title="Free Coin Report" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      {reports.length === 0 ? (
        <NoFound name="No Reports" />
      ) : (
        <Table tableHeaders={headers} data={reports} />
      )}
    </>
  );
};

export default FreeCoinReport;
