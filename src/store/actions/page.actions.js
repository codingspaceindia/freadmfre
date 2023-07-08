import { CHANGE_PAGE_NAME } from "../reducers/page.reducers";

export const changePageName = (name) => (dispatch) =>
  dispatch(CHANGE_PAGE_NAME(name));
