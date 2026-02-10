import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    openPlanModal: (state) => {
      state.isModalOpen = true;
    },
    closePlanModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openPlanModal, closePlanModal } = planSlice.actions;
export default planSlice.reducer;
