import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../api/axios";

const ViewImage = () => {
  const [request, setRequest] = useState();
  const [initialLoading, setInitialLoading] = useState(true);

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/user/getTopupRequests");
        setRequest(response.data.data.find((req) => req.id === id));
      } catch (error) {
        console.error(error.message);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initialLoading) return <p>Loading...</p>;

  return (
    <div>
      <button
        className="py-2 px-4 mb-3 mx-5 text-lg rounded text-white bg-blue-900"
        onClick={() => navigator(-1)}
      >
        back
      </button>
      <div className="flex items-center justify-center">
        <img
          src={request?.proofImageUrl}
          alt="Verification Proof"
          className="w-96 h-96 object-cover"
        />
      </div>
    </div>
  );
};

export default ViewImage;
