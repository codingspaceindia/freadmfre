import React from "react";

const Table = ({ tableHeaders, data }) => {
  return (
    <div className="sm:m-5">
      <table className="table-auto sm:p-5 w-full text-center">
        <thead className="bg-gray-800 text-white p-2">
          <tr>
            {tableHeaders.map((headers) => (
              <th
                className={`py-2 sm:p-4 capitalize text-xs sm:text-sm md:text-lg ${
                  headers === "s.No" ? "hidden" : ""
                }`}
              >
                {headers}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr key={el.id}>
              {tableHeaders.map((headers) => (
                <td
                  className={`py-1 sm:p-2 text-xs sm:text-sm md:text-lg ${
                    headers === "s.No" ? "hidden" : ""
                  }`}
                >
                  {el[headers]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
