import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./viewSlice";
import folderReducer from "./folderSlice";
import planReducer from "./planSlice";
import projectModalReducer from "./projectModalSlice";
import taskModalReducer from "./taskModalSlice";

export const store = configureStore({
  reducer: {
    view: viewReducer,
    folder: folderReducer,
    plan: planReducer,
    projectModal: projectModalReducer,
    taskModal: taskModalReducer,
  },
});
