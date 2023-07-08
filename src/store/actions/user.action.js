import axios from "../../api/axios";
import { FETCHED_USERS, UPDATE_USER } from "../reducers/user.reducer";

import { constant } from "../../api/ApiConstant";
import {
  removeFailure,
  removeSuccess,
  setFailure,
  setSuccess,
} from "./notify.actions";

export const fetchUsers = (handleLoading) => async (dispatch) => {
  try {
    dispatch(removeFailure());
    handleLoading(true);
    const res = await axios.get(constant.user.getUsers);
    dispatch(FETCHED_USERS(res.data.userDocs));
  } catch (error) {
    console.log(error);
    if (error.response)
      return dispatch(setFailure(error.response.data.message));
    dispatch(setFailure(error.message));
  } finally {
    handleLoading(false);
  }
};
export const updateUser =
  (handleLoading, handleEdit, values, id) => async (dispatch) => {
    try {
      dispatch(removeFailure());
      handleLoading();
      const response = await axios.post(constant.user.userUpdate, {
        ...values,
        userId: id,
      });
      if (response.data.data) {
        handleEdit();
        dispatch(
          UPDATE_USER({
            userId: id,
            values: values,
          })
        );
        dispatch(setSuccess("User Updated"));
        setTimeout(() => {
          dispatch(removeSuccess());
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response)
        return dispatch(setFailure(error.response.data.message));
      dispatch(setFailure(error.message));
    } finally {
    }
  };
