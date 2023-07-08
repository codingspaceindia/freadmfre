import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import image from "../assets/logo.png";
import Alerter from "../components/Alerter";
import { login } from "../store/actions/auth.actions";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    refId: "",
    password: "",
  });

  const { refId, password } = user;

  const dispatch = useDispatch();
  const { success, failure } = useSelector((state) => state.notify);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoading = (val) => setIsLoading(val);

  let LoginHandler = async (e) => {
    e.preventDefault();
    dispatch(login(user, handleLoading));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-indigo-900">
      <div className="w-96 h-auto bg-white p-5 rounded">
        <div className="w-full flex justify-center">
          <img src={image} alt="logo" className="w-20 h-20 object-contain" />
        </div>
        <form onSubmit={LoginHandler}>
          <h3 className="text-3xl text-center font-bold mb-3">Login</h3>
          <div className="flex flex-col mb-2">
            <label htmlFor="userId" className="text-gray-400 mb-1">
              Ref ID
            </label>
            <input
              type="text"
              placeholder="Ref ID"
              className="p-2 px-4 rounded shadow"
              onChange={handleChange}
              value={refId}
              name="refId"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="userId" className="text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="p-2 px-4 rounded shadow"
              onChange={handleChange}
              value={password}
              name="password"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-indigo-900 text-white p-2 px-4 w-full mt-3 rounded"
          >
            {isLoading ? "Loading" : "Login"}
          </button>
        </form>
      </div>
      <Alerter visible={failure} message={failure} type="error" />
      <Alerter visible={success} message={success} type="success" />
    </div>
  );
};

export default Login;
