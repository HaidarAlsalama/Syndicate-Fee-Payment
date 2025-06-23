import { configureStore } from "@reduxjs/toolkit";
import pages from "./reducers/pages";

const store = configureStore({
  reducer: {
    pages: pages,
  },
});

export default store;
