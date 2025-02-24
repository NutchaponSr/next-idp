import { create } from "zustand";

import { groupColumns } from "@/constants/filters";
import { ColumnProps, SortOrder, sorts } from "@/types/filter";

type SortStore<T extends object> = {
  isSort: boolean;
  isOpen: boolean;
  isAnySortActive: boolean;
  columns: ColumnProps<T>[];
  selectedColumns: ColumnProps<T>[];
  onOpen: () => void;
  onClose: () => void;
  addColumn: (column: ColumnProps<T>) => void;
  onSortOrder: (label: keyof T, key: SortOrder) => void;
  remove: (label: keyof T) => void;
  removeAll: () => void;
  onReorder: (newOrder: ColumnProps<T>[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSort = create<SortStore<any>>((set) => ({
  isSort: false,
  isOpen: false,
  isAnySortActive: false,
  columns: groupColumns,
  selectedColumns: [],
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  addColumn: (column) => set((state) => {
    const maxOrder = state.selectedColumns.length > 0
      ? Math.max(...state.selectedColumns.map((col) => col.order))
      : 0;

    const updatedSort = { ...column, sortOrder: sorts.asc, order: maxOrder + 100 };
    const newSelectedColumns = [...state.selectedColumns, updatedSort];

    return {
      columns: state.columns.filter((item) => item.label !== column.label),
      isSort: newSelectedColumns.length > 0,
      isAnySortActive: newSelectedColumns.some((col) => col.sortOrder !== null),
      selectedColumns: newSelectedColumns,
    };
  }),
  onSortOrder: (label, key) => set((state) => {
    const newSelectedColumns = state.selectedColumns.map((item) =>  item.label === label ? { ...item, sortOrder: sorts[key] } : item)

    return {
      selectedColumns: newSelectedColumns,
      isAnySortActive: newSelectedColumns.some((col) => col.sortOrder !== null),
    };
  }),
  remove: (label) => set((state) => {
    const newSelectedColumns = state.selectedColumns.filter((item) => item.label !== label);
    const removedColumn = state.selectedColumns.find((item) => item.label === label);

    return {
      selectedColumns: newSelectedColumns,
      isSort: newSelectedColumns.length > 0,
      isAnySortActive: newSelectedColumns.some(col => col.sortOrder !== null),
      columns: removedColumn ? [...state.columns, { ...removedColumn, sortOrder: null }] : state.columns,
    };
  }),
  removeAll: () => set({
    selectedColumns: [],
    isSort: false,
    isAnySortActive: false,
    columns: groupColumns.map((col) => ({ ...col, sortOrder: null })),
  }),
  onReorder: (newOrder) => set(() => {
    const updatedColumns = newOrder.map((col, index) => ({ ...col, order: (index + 1) * 100 }));

    return {
      selectedColumns: updatedColumns,
      isAnySortActive: updatedColumns.some((col) => col.sortOrder !== null),
    };
  }) 
}));