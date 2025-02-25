import { create } from "zustand"; 

export type MoreType = "layout" | "property" | "filter" | "sort" | "grouping" | "automations";

type MoreStore = {
  type: MoreType | null;
  isOpen: boolean;
  onBack: () => void;
  onOpen: (type: MoreType) => void;
}

export const useMore = create<MoreStore>((set) => ({
  type: null,
  isOpen: false,
  onBack: () => set({ isOpen: false, type: null }),
  onOpen: (type) => set({ isOpen: true, type }),
}));