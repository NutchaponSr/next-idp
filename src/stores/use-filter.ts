import { create } from "zustand";

import { groupColumns } from "@/constants/filters";
import { ColumnProps, FilterCondition } from "@/types/filter";

type FilterStore<T extends object> = {
  isOpen: boolean;
  isFilter: boolean;
  isAnyFilterActive: boolean;
  columns: ColumnProps<T>[];
  selectedColumns: ColumnProps<T>[];
  onOpen: () => void;
  onClose: () => void;
  addColumn: (filter: ColumnProps<T>) => void;
  deleteColumn: (label: string) => void;
  onSearchQuery: (label: string, searchQuery: string) => void;
  onCondition: (label: string, condition: FilterCondition) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFilter = create<FilterStore<any>>((set) => ({
  isOpen: false,
  isFilter: false,
  columns: groupColumns,
  selectedColumns: [],
  isAnyFilterActive: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  addColumn: (filter) => set((state) => {
    const updatedFilter = {...filter, searchQuery: "", isFilter: false };
    const newSelectedColumns = [...state.selectedColumns, updatedFilter];

    return {
      columns: state.columns.filter((item) => item.label !== filter.label),
      selectedColumns: [...state.selectedColumns, updatedFilter], 
      isFilter: [...state.selectedColumns, updatedFilter].length > 0,
      isAnyFilterActive: newSelectedColumns.some((item) => item.isFilter),
    }
  }),
  deleteColumn: (label) => set((state) => {
    const newColumns = state.selectedColumns.filter((item) => item.label !== label);
    const removedColumn = state.selectedColumns.find((item) => item.label === label);

    return {
      columns: removedColumn ? [...state.columns, { ...removedColumn, searchQuery: undefined }] : state.columns,
      selectedColumns: newColumns,
      isFilter: newColumns.length > 0,
      isAnyFilterActive: newColumns.some((col) => col.isFilter)
    };
  }),
  onSearchQuery: (label: string, query: string) => set((state) => {
    const newSelectedColumns = state.selectedColumns.map((item) =>
      item.label === label ? { ...item, searchQuery: query, isFilter: query.length > 0 } : item
    );

    return {
      selectedColumns: newSelectedColumns,
      isAnyFilterActive: newSelectedColumns.some((col) => col.isFilter), 
    };
  }),
  onCondition: (label: string, condition: FilterCondition) => set((state) => {
    const newSelectedColumns = state.selectedColumns.map((item) =>
      item.label === label ? { ...item, condition } : item
    );

    return {
      selectedColumns: newSelectedColumns,
      isAnyFilterActive: newSelectedColumns.some((col) => col.isFilter)
    }
  }),
}));