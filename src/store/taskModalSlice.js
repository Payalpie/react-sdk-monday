import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedTask: null,
};

const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    openTaskModal: (state, action) => {
      state.isOpen = true;
      state.selectedTask = action.payload;
    },
    closeTaskModal: (state) => {
      state.isOpen = false;
      state.selectedTask = null;
    },
    updateTask: (state, action) => {
      if (state.selectedTask) {
        state.selectedTask = { ...state.selectedTask, ...action.payload };
      }
    },
  },
});

export const { openTaskModal, closeTaskModal, updateTask } = taskModalSlice.actions;
export default taskModalSlice.reducer;
