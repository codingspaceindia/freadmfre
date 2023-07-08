import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import Title from "../components/Title";
import { constant } from "../api/ApiConstant";

const contents = [
  { label: "Account Number", content: "accountNumber" },
  { label: "IFSC Code", content: "ifscCode" },
  { label: "Branch", content: "branch" },
  { label: "City", content: "city" },
];

const BankDetails = () => {
  const { id } = useParams();

  const [bankDetails, setBankDetails] = useState("");
  const [freeCoinAddress, setFreeCoinAddress] = useState("");
  const [panDetails, setPanDetails] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(`${constant.bank.fetch}/${id}`);
        setBankDetails(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };
    const fetchFreeCoinAddress = async () => {
      try {
        const response = await axios.get(`/user/getFreeCoinAddress/${id}`);
        setFreeCoinAddress(response.data.data.freeCoinAddress);
      } catch (err) {
        console.error(err.message);
      }
    };

    const fetchPanDetails = async () => {
      try {
        const response = await axios.get(`user/getPanRecord/for/${id}`);
        setPanDetails(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBankDetails();
    fetchFreeCoinAddress();
    fetchPanDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Title title="Bank Details and Pan Details" />
      <button
        className="py-1 px-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigate(-1)}
      >
        back
      </button>
      <div className="p-5 m-5 bg-white shadow">
        {contents.map(({ label, content }) => (
          <div className="flex flex-col mb-3">
            <label className="text-sm mb-1">{label}</label>
            <p className="bg-gray-100 p-2">{bankDetails[content] || "-"}</p>
          </div>
        ))}
        <div className="flex flex-col mb-3">
          <label className="text-sm mb-1">Free Coin Address</label>
          <p className="bg-gray-100 p-2">{freeCoinAddress || "-"}</p>
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-sm mb-1">Name as In the PAN Card</label>
          <p className="bg-gray-100 p-2">{panDetails.nameInPan || "-"}</p>
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-sm mb-1">PAN Number</label>
          <p className="bg-gray-100 p-2">{panDetails.panNumber || "-"}</p>
        </div>
        {panDetails.panImageUrl && (
          <div className="flex flex-col">
            <label className="text-sm mb-1">PAN Proof Image</label>
            <img
              src={panDetails?.panImageUrl}
              alt="Verification Proof"
              className="w-full md:w-96 md:h-64 h-auto md:object-cover object-contain "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(BankDetails);
