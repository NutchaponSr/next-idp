import { create } from "zustand";

import { groupColumns } from "@/constants/filters";
import { FilterColumnProps, FilterCondition } from "@/types/filter";

type FilterTableStore<T extends object> = {
  isFilter: boolean;
  columns: FilterColumnProps<T>[];
  selectedColumns: FilterColumnProps<T>[];
  addColumn: (filter: FilterColumnProps<T>) => void;
  deleteColumn: (label: string) => void;
  onSearchQuery: (label: string, searchQuery: string) => void;
  onCondition: (label: string, condition: FilterCondition) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFilterTable = create<FilterTableStore<any>>((set) => ({
  isFilter: false,
  columns: groupColumns,
  selectedColumns: [],
  addColumn: (filter) => set((state) => {
    const updatedFilter = {...filter, searchQuery: "" };
    return {
      columns: state.columns.filter((item) => item.label !== filter.label),
      selectedColumns: [...state.selectedColumns, updatedFilter], 
      isFilter: [...state.selectedColumns, updatedFilter].length > 0,
    }
  }),
  deleteColumn: (label) => set((state) => {
    const newColumns = state.selectedColumns.filter((item) => item.label !== label);
    const removedColumn = state.selectedColumns.find((item) => item.label === label);

    return {
      columns: removedColumn ? [...state.columns, { ...removedColumn, searchQuery: undefined }] : state.columns,
      selectedColumns: newColumns,
      isFilter: newColumns.length > 0,
    };
  }),
  onSearchQuery: (label: string, query: string) => set((state) => ({
    selectedColumns: state.selectedColumns.map((item) =>
      item.label === label ? { ...item, searchQuery: query } : item
    ),
  })),
  onCondition: (label: string, condition: FilterCondition) => set((state) => ({
    selectedColumns: state.selectedColumns.map((item) =>
      item.label === label ? { ...item, condition } : item
    ),
  }))
}));