import { combineReducers } from "redux";

import authReducers from "./auth.reducers";
import notifyReducer from "./notify.reducer";
import pageReducers from "./page.reducers";
import userReducer from "./user.reducer";

const reducer = combineReducers({
  auth: authReducers,
  page: pageReducers,
  users: userReducer,
  notify: notifyReducer,
});

export default reducer;
