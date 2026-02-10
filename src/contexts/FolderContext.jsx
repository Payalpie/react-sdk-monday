import { createContext, useContext } from "react";

export const FolderContext = createContext({
  onNewFolder: () => {},
});

export const useFolderContext = () => useContext(FolderContext);
