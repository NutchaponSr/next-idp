import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PageView } from "@/types/filter";

type SettingsStore = {
  view: PageView;
  showIcon: boolean;
  showVerticalLine: boolean;
  onSwitchIcon: () => void;
  onSwitchVerticalLine: () => void;
  onChangeView: (view: PageView) => void;
}

export const useSettings = create<SettingsStore>()(
  persist((set) => ({
    view: PageView.SIDE,
    showIcon: true,
    showVerticalLine: true,
    onSwitchIcon: () => set((state) => ({ showIcon: !state.showIcon })),
    onSwitchVerticalLine: () => set((state) => ({ showVerticalLine: !state.showVerticalLine })),
    onChangeView: (view) => set({ view }),
  }), {
    name: "settings",
  }),
);