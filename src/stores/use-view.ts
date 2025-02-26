import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PageView } from "@/types/filter";

type ViewStore = {
  view: PageView;
  onChangeView: (view: PageView) => void;
}

export const useView = create<ViewStore>()(
  persist((set) => ({
    view: PageView.SIDE,
    onChangeView: (view) => set({ view }),
  }), {
    name: "view",
  }),
);