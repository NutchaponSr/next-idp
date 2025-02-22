import { create } from "zustand";

type ToolbarStore = {
  isOpen: boolean;
  onOpenToolbar: () => void;
  onCloseToolbar: () => void;
}

export const useToolbar = create<ToolbarStore>((set) => ({
  isOpen: false,
  onOpenToolbar: () => set({ isOpen: true }),
  onCloseToolbar: () => set({ isOpen: false }),
}));