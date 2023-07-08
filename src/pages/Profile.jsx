import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";

import Title from "../components/Title";
import { selectUsers } from "../store/reducers/user.reducer";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/actions/user.action";

const contents = [
  { label: "Reference Id", type: "text", content: "refId" },
  { label: "Username", type: "text", content: "name", isEditable: true },
  {
    label: "Email Address",
    type: "email",
    content: "mailId",
    isEditable: true,
  },
  {
    label: "Mobile Number",
    type: "text",
    content: "mobileNumber",
    isEditable: true,
  },
  {
    label: "Parent Reference Id",
    type: "text",
    content: "parentRefId",
  },
  {
    label: "Team",
    content: "side",
    select: true,
    options: ["left", "right"],
    isEditable: true,
  },
  { label: "Placement Ref Id", content: "placementRefId" },
  { label: "Placement User Id", content: "placementUserId" },
];

const Profile = () => {
  const users = useSelector((state) => selectUsers(state));

  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();

  const user = users.find((user) => user.id === id);

  const dispatch = useDispatch();

  const initialState = {
    refId: user?.refId,
    name: user?.name,
    mailId: user?.mailId,
    mobileNumber: user?.mobileNumber,
    parentRefId: user?.parentRefId,
    team: user?.side,
    placementRefId: user?.placementRefId,
    placementUserId: user?.placementUserId,
  };

  const [profile, setProfile] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (val) => setIsLoading(val);
  const handleEdit = () => setIsEdit(!isEdit);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateUser(
        handleLoading,
        handleEdit,
        { ...profile, id: user.id },
        user.id
      )
    );
  };

  return (
    <div className="overflow-y-auto">
      <Title title="User Profile" />
      <button
        className="py-1 px-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigate(-1)}
      >
        back
      </button>
      <form onSubmit={handleSubmit} className="p-5 m-5 bg-white shadow">
        <div className="flex justify-end mb-4">
          {isEdit ? (
            <button
              type="button"
              className="bg-red-500   px-4 py-2 rounded text-white"
              onClick={() => setIsEdit(!isEdit)}
              disabled={isLoading}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="bg-yellow-300 px-4 py-2 rounded"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </button>
          )}
          {isEdit && (
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded ml-2"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Submit"}
            </button>
          )}
        </div>
        {contents.map(
          ({ label, content, type, select, options, isEditable }) => (
            <div className="flex flex-col mb-3">
              <label
                className={`text-sm mb-1 ${
                  isEditable && isEdit ? "text-blue-500" : ""
                }`}
              >
                {label}
              </label>
              {select ? (
                <select
                  className="bg-gray-100 p-2 capitalize"
                  value={profile[content]}
                  disabled={!isEdit}
                  onChange={handleChange}
                  name={content}
                >
                  {options.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              ) : isEditable ? (
                <input
                  type={type}
                  className="bg-gray-100 p-2"
                  value={profile[content]}
                  placeholder="-"
                  disabled={!isEdit}
                  name={content}
                  onChange={handleChange}
                />
              ) : (
                <p className="bg-gray-100 p-2">{profile[content] || "-"}</p>
              )}
            </div>
          )
        )}
      </form>
    </div>
  );
};

export default Profile;
