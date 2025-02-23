import { create } from "zustand";

import { groupColumns } from "@/constants/filters";
import { ColumnProps, SortOrder, sorts } from "@/types/filter";

type SortStore<T extends object> = {
  isSort: boolean;
  isOpen: boolean;
  columns: ColumnProps<T>[];
  selectedColumns: ColumnProps<T>[];
  onOpen: () => void;
  onClose: () => void;
  addColumn: (column: ColumnProps<T>) => void;
  onSortOrder: (label: string, key: SortOrder) => void;
  onRemove: (label: string) => void;
  onRemoveAll: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSort = create<SortStore<any>>((set) => ({
  isSort: false,
  isOpen: false,
  columns: groupColumns,
  selectedColumns: [],
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  addColumn: (column) => set((state) => {
    const updatedSort = { ...column, sortOrder: sorts.asc }
    const newSelectedColumns = [...state.selectedColumns, updatedSort];

    return {
      columns: state.columns.filter((item) => item.label !== column.label),
      isSort: newSelectedColumns.length > 0,
      selectedColumns: newSelectedColumns,
    };
  }),
  onSortOrder: (label, key) => set((state) => ({
    selectedColumns: state.selectedColumns.map((item) => 
      item.label === label ? { ...item, sortOrder: sorts[key] } : item
    )
  })),
  onRemove: (label) => set((staet) => )
}));