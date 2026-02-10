import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    openFolderModal: (state) => {
      state.isModalOpen = true;
    },
    closeFolderModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openFolderModal, closeFolderModal } = folderSlice.actions;
export default folderSlice.reducer;
