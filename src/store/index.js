import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducers";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
