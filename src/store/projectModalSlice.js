import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  isNewModalOpen: false,
  selectedProject: null,
};

const projectModalSlice = createSlice({
  name: "projectModal",
  initialState,
  reducers: {
    openNewModal: (state) => {
      state.isNewModalOpen = true;
    },
    closeNewModal: (state) => {
      state.isNewModalOpen = false;
    },
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
      state.selectedProject = action.payload;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.selectedProject = null;
    },
    openDeleteModal: (state, action) => {
      state.isDeleteModalOpen = true;
      state.selectedProject = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.selectedProject = null;
    },
  },
});

export const { openNewModal, closeNewModal, openEditModal, closeEditModal, openDeleteModal, closeDeleteModal } = projectModalSlice.actions;
export default projectModalSlice.reducer;
