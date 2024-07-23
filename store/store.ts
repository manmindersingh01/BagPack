import { create } from "zustand";

interface AppState {
  isDeleteModelOpen: boolean;
  setIsDeleteModelOpen: (isOpen: boolean) => void;
  isRenameModelOpen: boolean;
  setIsRenameModelOpen: (isOpen: boolean) => void;
  fileId: string;
  setFileId: (fileId: string) => void;
  fileName: string;
  setFileName: (fileName: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDeleteModelOpen: false,
  setIsDeleteModelOpen: (isOpen) => set({ isDeleteModelOpen: isOpen }),
  isRenameModelOpen: false,
  setIsRenameModelOpen: (isOpen) => set({ isRenameModelOpen: isOpen }),
  fileId: "",
  setFileId: (fileId) => set({ fileId }),
  fileName: "",
  setFileName: (fileName) => set({ fileName }),
}));
