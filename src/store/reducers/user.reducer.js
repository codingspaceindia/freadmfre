import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    FETCHED_USERS: (users, action) => {
      return action.payload;
    },
    UPDATE_USER: (users, action) => {
      console.log(action.payload);
      console.log(
        users.map((user) =>
          user.id === action.payload.userId
            ? { ...user, ...action.payload.values }
            : user
        )
      );
      return users.map((user) =>
        user.id === action.payload.userId
          ? { ...user, ...action.payload.values }
          : user
      );
    },
  },
});

export const { FETCHED_USERS, UPDATE_USER } = usersSlice.actions;

export default usersSlice.reducer;

// Selectors

const selectState = (state) => state;

export const selectUsers = createSelector(selectState, (el) => el.users);
