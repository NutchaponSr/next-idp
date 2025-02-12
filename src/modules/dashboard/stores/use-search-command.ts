import { create } from "zustand";

type SearchCommandStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSearchCommand = create<SearchCommandStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));