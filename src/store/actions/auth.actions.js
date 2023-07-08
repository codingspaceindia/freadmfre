import axios from "../../api/axios";
import { FETCHED_USER, REMOVED_USER } from "../reducers/auth.reducers";

import { constant } from "../../api/ApiConstant";
import { removeFailure, setFailure } from "./notify.actions";

export const login = (credentials, handleLoading) => async (dispatch) => {
  try {
    dispatch(removeFailure());
    handleLoading(true);
    const res = await axios.post(constant.auth.login, credentials);
    if (!res.data.data.isAuth)
      return dispatch(setFailure("RefId or Password not match"));
    dispatch(FETCHED_USER(res.data.data.token));
    localStorage.setItem("user", JSON.stringify(res.data.data.token));
  } catch (error) {
    console.log(error);
    if (error.response)
      return dispatch(setFailure(error.response.data.message));
    dispatch(setFailure(error.message));
  } finally {
    handleLoading(false);
  }
};

export const logout = () => (dispatch) => {
  dispatch(REMOVED_USER());
};
