import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: "" },
  reducers: {
    FETCHED_USER: (state, action) => {
      return { ...state, user: action.payload };
    },
    REMOVED_USER: (state, action) => {
      return { ...state, user: "" };
    },
  },
});

export const { FETCHED_USER, REMOVED_USER } = authSlice.actions;

export default authSlice.reducer;

// Selectors

const selectState = (state) => state;

export const selectUser = createSelector(selectState, (el) => el.auth.user.id);
