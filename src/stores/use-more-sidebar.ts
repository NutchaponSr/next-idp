import { create } from "zustand"; 

// TODO: MoreSide interface
export type MoreType = "layout" | "property" | "filter" | "sort" | "grouping" | "automations";

type MoreStore = {
  type: MoreType | null;
  isOpenItem: boolean;
  isOpenSidebar: boolean;
  onBack: () => void;
  onCloseSidebar: () => void;
  onOpenSidebar: () => void;
  onOpenItem: (type: MoreType) => void;
}

export const useMoreSidebar = create<MoreStore>((set) => ({
  type: null,
  isOpenItem: false,
  isOpenSidebar: false,
  onBack: () => set({ type: null }),
  onCloseSidebar: () => set({ type: null, isOpenSidebar: false }),
  onOpenSidebar: () => set((state) => ({ isOpenSidebar: !state.isOpenSidebar, type: null })),
  onOpenItem: (type) => set({ isOpenItem: true, type }),
}));