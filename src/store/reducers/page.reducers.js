import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const pageSlice = createSlice({
  name: "page",
  initialState: { pageName: "" },
  reducers: {
    CHANGE_PAGE_NAME: (state, action) => {
      return { ...state, pageName: action.payload };
    },
  },
});

export const { CHANGE_PAGE_NAME } = pageSlice.actions;

export default pageSlice.reducer;

// Selectors

const selectState = (state) => state;

export const selectPage = createSelector(selectState, (el) => el.page.pageName);
