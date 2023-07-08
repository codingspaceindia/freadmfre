import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import axios from "../api/axios";
import image from "../assets/logo.png";
import { constant } from "../api/ApiConstant";
import { useDispatch } from "react-redux";
import {
  REMOVE_FAILURE,
  REMOVE_SUCCESS,
  SET_FAILURE,
  SET_SUCCESS,
} from "../store/reducers/notify.reducer";

const ReferralLink = () => {
  const [currentType, setCurrentType] = useState("left");
  // const [idProof, setIdProof] = useState();
  const [refName, setRefName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    refId: "",
    parentRefId: "",
    name: "",
    // gender: "M",
    mailId: "",
    mobileNumber: "",
    // address: "",
    isLeft: currentType === "left",
    isRight: currentType === "right",
    // city: "",
    // country: "",
    // tokenAddress: "",
    // idProofNo: "",
  });
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCheck = async () => {
    setIsLoading(true);
    dispatch(REMOVE_FAILURE());
    if (!newUser.parentRefId) {
      setIsLoading(false);
      return dispatch(SET_FAILURE("Please enter something"));
    }

    try {
      const res = await axios.get(`${constant.refUser}/${newUser.parentRefId}`);
      if (res.data.data.name) {
        setIsLoading(false);
        setRefName(res.data.data.name);
      } else {
        setIsLoading(false);
        dispatch(SET_FAILURE("Unknown user"));
      }
    } catch (err) {
      dispatch(SET_FAILURE("Unknown user"));
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleFileChange = (e) => {
  //   setIdProof("");
  // };
  useEffect(() => {
    setNewUser({
      ...newUser,
      isLeft: currentType === "left",
      isRight: currentType === "right",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  const clearField = () => {
    setNewUser({
      refId: "",
      parentRefId: "",
      name: "",
      // gender: "M",
      mailId: "",
      mobileNumber: "",
      // address: "",
      isLeft: currentType === "left",
      isRight: currentType === "right",
      // city: "",
      // country: "",
      // tokenAddress: "",
      // idProofNo: "",
    });
  };

  const handleSubmit = async (e) => {
    try {
      setIsSubmitLoading(true);
      e.preventDefault();
      dispatch(REMOVE_FAILURE());

      if (currentType === "") return;
      // if (!newUser.mobile)
      //   return dispatch(SET_FAILURE("Please enter Mobile Number"));
      const response = await axios.post("/user/save", { ...newUser, refName });
      if (response.data.data.isUserCreated) {
        dispatch(SET_SUCCESS("User added"));
        setTimeout(() => {
          dispatch(REMOVE_SUCCESS(""));
        }, 2000);
        clearField();
      }
      setIsSubmitLoading(false);
    } catch (err) {
      dispatch(SET_FAILURE(err.message));
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-auto overflow-auto w-250 mb-5">
      <div className="bg-white p-2 sm:p-4 w-80 sm:w-96">
        <div className="flex justify-center">
          <img src={image} alt="logo" className="w-20 h-20 object-contain" />
        </div>
        <h4 className="text-xl font-bold">Registration</h4>
        <form className="form-referral" onSubmit={handleSubmit}>
          <div className="group-referral">
            <div className="flex flex-col mb-1">
              <label className="text-sm mb-1 text-gray-200">Referral ID</label>
              <div className="flex">
                <input
                  type="text"
                  className="px-4 py-1 bg-gray-200 w-full"
                  value={newUser.parentRefId}
                  onChange={handleChange}
                  name="parentRefId"
                  placeholder="Enter Parent Ref ID"
                />

                <button
                  type="button"
                  className="text-green-500 font-semibold ml-3"
                  disabled={isLoading}
                  onClick={handleCheck}
                >
                  {isLoading ? "Loading" : "Check"}
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-1">
              <label className="text-sm mb-1 text-gray-200">Team</label>
              <select
                value={currentType}
                onChange={(e) => setCurrentType(e.target.value)}
                className="px-4 py-1 bg-gray-200"
                required
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">
              Referral Username
            </label>
            <input
              type="text"
              className="px-4 py-1 bg-gray-200"
              value={refName}
              onChange={handleChange}
              name="refName"
              placeholder="Referral Username"
              required
              disabled
            />
          </div>
          <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">Username</label>
            <input
              type="text"
              className="px-4 py-1 bg-gray-200"
              value={newUser.name}
              onChange={handleChange}
              name="name"
              placeholder="Username as in Bank Passbook"
            />
          </div>
          <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">Email Address</label>
            <input
              type="email"
              className="px-4 py-1 bg-gray-200"
              value={newUser.mailId}
              onChange={handleChange}
              name="mailId"
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">Mobile Number</label>
            <PhoneInput
              type="text"
              country={"in"}
              enableAreaCodes={true}
              value={newUser.mobileNumber}
              onChange={(value) =>
                setNewUser({ ...newUser, mobileNumber: value })
              }
              containerStyle={{
                width: "100%",
              }}
              inputStyle={{
                background: "#E5E7EB",
                border: "none",
              }}
            />
          </div>
          {/* <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">Gender</label>
            <select
              className="bg-gray-200 px-4 py-1"
              name="gender"
              onChange={handleChange}
              value={newUser.gender}
              required
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div> */}
          {/* <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">Address</label>
            <input
              type="text"
              className="px-4 py-1 bg-gray-200"
              value={newUser.address}
              name="address"
              placeholder="Enter Address"
              onChange={handleChange}
            />
          </div> */}
          {/* <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">City</label>
            <input
              type="text"
              className="px-4 py-1 bg-gray-200"
              value={newUser.city}
              name="city"
              placeholder="Enter City"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">Country</label>
            <input
              type="text"
              className="px-4 py-1 bg-gray-200"
              value={newUser.country}
              name="country"
              placeholder="Enter Country"
              onChange={handleChange}
            />
          </div> */}
          {/* <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">Token Address</label>
            <input
              type="text"
              className="px-4 py-1 bg-gray-200"
              value={newUser.tokenAddress}
              name="tokenAddress"
              placeholder="Enter Token Address"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">
              Id Proof Number
            </label>
            <input
              type="text"
              className="px-4 py-1 bg-gray-200"
              value={newUser.idProofNo}
              name="idProofNo"
              placeholder="Enter Id Proof No"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-1">
            <label className="text-sm mb-1 text-gray-200">Id Proof</label>
            <input
              type="file"
              className="px-4 py-2 bg-gray-200"
              value={idProof}
              name="tokenAddress"
              placeholder="Enter Token Address"
              onChange={handleFileChange}
            />
          </div> */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white w-200 mt-4 rounded px-4 py-2"
              disabled={isSubmitLoading}
            >
              {isSubmitLoading ? "Loading" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralLink;
