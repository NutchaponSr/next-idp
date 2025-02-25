import { create } from "zustand";

import { Layout } from "@/types/filter";

type LayoutStore = {
  mode: Layout;
  onChange: (mode: Layout) => void;
}

export const useLayout = create<LayoutStore>((set) => ({
  mode: Layout.TABLE,
  onChange: (mode) => set({ mode }),
}));