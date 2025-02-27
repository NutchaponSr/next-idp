import { create } from "zustand";

type SelectStore = {
  selectedRows: Record<string, boolean>;
  selectRow: (id: string) => void;
  selectAll: (data: { id: string }[]) => void;
  clearSelection: () => void;
}

export const useTableStore = create<SelectStore>((set, get) => ({
  selectedRows: {},

  selectRow: (id) => {
    set((state) => ({
      selectedRows: {
        ...state.selectedRows,
        [id]: !state.selectedRows[id],
      },
    }));
  },

  selectAll: (data) => {
    const allSelected = data.every((item) => get().selectedRows[item.id]);

    if (allSelected) {
      set({ selectedRows: {} });
    } else {
      const newSelectedRow: Record<string, boolean> = {};
      data.forEach((item) => {
        newSelectedRow[item.id] = true;
      });
      set({ selectedRows: newSelectedRow });
    }
  },

  clearSelection: () => set({ selectedRows: {} }),
}));