import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: "grid",
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;
