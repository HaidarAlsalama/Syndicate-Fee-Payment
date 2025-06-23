import { createSlice } from "@reduxjs/toolkit";

export const pages = createSlice({
  name: "pages",
  // initialState: {pageName: "nakaba-pay/home" ,param : null},
  initialState: {pageName: "/" ,param : null},
  reducers: {
    redirectPage: (state, action) => {
      console.log(action);
      state.pageName = action.payload.pageName;
    },
  },
});

// Action creators are generated for each case reducer function
export const { redirectPage } = pages.actions;

export default pages.reducer;
